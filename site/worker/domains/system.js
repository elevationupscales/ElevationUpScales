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


async function handleAdminQaToken(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  return jsonResponse({ ok: true, ...(await createMarketplaceQaToken(env)) });
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
  handleAdminQaToken,
  handleHealth
};
