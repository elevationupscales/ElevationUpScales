import {
  OPERATIONS_BUILD,
  DEFAULT_SOLAR_EMAIL_TO,
  jsonResponse,
  cleanString,
  isValidEmail,
  DEFAULT_MARKETPLACE_EMAIL_TO,
  sameOriginRequest,
  requireAdmin,
  createMarketplaceQaToken,
} from "../core-context.js";
import { gmailMailProviderConfigured } from "../shared/gmail-mail-provider.js";
import {
  GMAIL_PROVIDER_QA_RATE_LIMIT_SECONDS,
  GMAIL_PROVIDER_QA_SUBJECT,
  buildGmailProviderQaMessage,
  gmailProviderQaErrorCategory,
  githubActionsGmailQaAuthorized,
} from "../shared/gmail-provider-qa.js";


async function handleAdminQaToken(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  return jsonResponse({ ok: true, ...(await createMarketplaceQaToken(env)) });
}

async function gmailQaAuthorization(request, env) {
  const auth = await requireAdmin(request, env);
  if (!auth.response) return { ok: true, mode: "admin", commitSha: "" };

  const authorization = cleanString(request.headers.get("Authorization"), 12000);
  const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1] || "";
  if (bearer) {
    const oidc = await githubActionsGmailQaAuthorized(bearer);
    if (oidc.ok) return { ok: true, mode: "github-actions-oidc", commitSha: oidc.sha || "" };
  }
  return { ok: false, response: auth.response };
}

async function handleAdminGmailProviderQa(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);

  const authorization = await gmailQaAuthorization(request, env);
  if (!authorization.ok) return authorization.response;

  if (!gmailMailProviderConfigured(env) || !env.EMAIL || typeof env.EMAIL.send !== "function") {
    return jsonResponse({ ok: false, error: "Gmail provider QA is not configured", category: "provider_unconfigured" }, 503);
  }
  if (!isValidEmail(cleanString(env.MAIL_FROM, 320))) {
    return jsonResponse({ ok: false, error: "Gmail provider QA sender is not configured", category: "provider_unconfigured" }, 503);
  }

  const cache = caches.default;
  const rateKey = new Request("https://rate-limit.invalid/admin/gmail-provider-qa/global", { method: "GET" });
  if (await cache.match(rateKey)) {
    return jsonResponse({ ok: false, error: "Gmail provider QA rate limit reached", category: "provider_limited" }, 429, {
      "Retry-After": String(GMAIL_PROVIDER_QA_RATE_LIMIT_SECONDS),
    });
  }

  const timestamp = new Date().toISOString();
  const message = buildGmailProviderQaMessage(env, { timestamp, commit: authorization.commitSha });
  try {
    const providerResult = await env.EMAIL.send(message);
    const messageId = cleanString(providerResult?.messageId, 240);
    if (!messageId) {
      return jsonResponse({ ok: false, error: "Gmail provider QA did not return a message ID", category: "provider_error" }, 502);
    }
    await cache.put(rateKey, new Response("sent", { headers: { "Cache-Control": `max-age=${GMAIL_PROVIDER_QA_RATE_LIMIT_SECONDS}` } }));
    return jsonResponse({
      ok: true,
      provider: "gmail-api",
      messageId,
      threadId: cleanString(providerResult?.threadId, 240) || null,
      subject: GMAIL_PROVIDER_QA_SUBJECT,
      timestamp,
      recipient: "MAIL_FROM",
    }, 200);
  } catch (error) {
    const category = gmailProviderQaErrorCategory(error);
    const status = category === "provider_limited" ? 429 : category === "template_error" ? 500 : 502;
    return jsonResponse({ ok: false, error: "Gmail provider QA failed", category }, status);
  }
}

async function handleHealth(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  let marketplaceDb = "unconfigured";
  if (env.MARKETPLACE_DB) {
    try {
      await env.MARKETPLACE_DB.prepare("SELECT 1 AS ok").first();
      marketplaceDb = "ok";
    } catch (_) {
      marketplaceDb = "error";
    }
  }
  const marketplaceEmailConfigured = Boolean(
    isValidEmail(cleanString(env.MARKETPLACE_EMAIL_TO || DEFAULT_MARKETPLACE_EMAIL_TO, 180)) &&
    isValidEmail(cleanString(env.MARKETPLACE_EMAIL_FROM || env.SOLAR_EMAIL_FROM, 180)) &&
    ((env.EMAIL && typeof env.EMAIL.send === "function") || (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_EMAIL_API_TOKEN))
  );
  const solarEmailConfigured = Boolean(
    isValidEmail(cleanString(env.SOLAR_EMAIL_TO || DEFAULT_SOLAR_EMAIL_TO, 180)) &&
    isValidEmail(cleanString(env.SOLAR_EMAIL_FROM, 180)) &&
    ((env.EMAIL && typeof env.EMAIL.send === "function") || (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_EMAIL_API_TOKEN))
  );
  let leadsDb = "unconfigured";
  if (env.LEADS_DB) {
    try {
      await env.LEADS_DB.prepare("SELECT 1 AS ok").first();
      leadsDb = "ok";
    } catch (_) {
      leadsDb = "error";
    }
  }
  let siteAnalyticsD1 = "unconfigured";
  if (env.MARKETPLACE_DB) {
    try {
      await env.MARKETPLACE_DB.prepare("SELECT 1 AS ok FROM eus_site_events LIMIT 1").first();
      siteAnalyticsD1 = "ok";
    } catch (_) {
      siteAnalyticsD1 = "error";
    }
  }
  const siteAnalyticsEngine = env.SITE_ANALYTICS && typeof env.SITE_ANALYTICS.writeDataPoint === "function" ? "configured" : "disabled_deferred";
  const legacyAnalyticsEngine = env.ANALYTICS && typeof env.ANALYTICS.writeDataPoint === "function" ? "configured" : "unconfigured";
  const healthy = marketplaceDb === "ok" && leadsDb === "ok" && siteAnalyticsD1 === "ok" && Boolean(env.ASSETS) && Boolean(env.LISTING_IMAGES) && marketplaceEmailConfigured && solarEmailConfigured;
  const payload = {
    status: healthy ? "ok" : "degraded",
    build: OPERATIONS_BUILD,
    checkedAt: new Date().toISOString(),
    services: {
      siteAssets: env.ASSETS ? "configured" : "unconfigured",
      marketplaceDatabase: marketplaceDb,
      leadsDatabase: leadsDb,
      marketplaceImages: env.LISTING_IMAGES ? "configured" : "unconfigured",
      siteAnalyticsD1,
      siteAnalyticsEngine,
      legacyAnalyticsEngine,
      marketplaceNotifications: marketplaceEmailConfigured ? "configured" : "unconfigured",
      solarNotifications: solarEmailConfigured ? "configured" : "unconfigured",
    },
    note: "D1 eus_site_events is the active first-party analytics store. Analytics Engine is intentionally deferred; notification status confirms configuration only, not inbox delivery.",
  };
  const response = jsonResponse(payload, healthy ? 200 : 503, {
    "X-EUS-Operations-Build": OPERATIONS_BUILD,
    "X-EUS-Monitoring": "health",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

export {
  handleAdminGmailProviderQa,
  handleAdminQaToken,
  handleHealth
};
