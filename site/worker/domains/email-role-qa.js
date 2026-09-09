import { jsonResponse, cleanString, sameOriginRequest } from "../core-context.js";
import { gmailMailProviderConfigured } from "../shared/gmail-mail-provider.js";
import { buildEmailRoleQaMessage, normalizeEmailRole, resolveEmailRole } from "../shared/email-role-routing.js";
import { gmailProviderQaErrorCategory } from "../shared/gmail-provider-qa.js";
import { gmailQaAuthorization } from "./system.js";

const EMAIL_ROLE_QA_ROLES = new Set(["owner", "sales", "orders", "logistics", "support"]);
const EMAIL_ROLE_QA_RATE_LIMIT_SECONDS = 86400;

async function handleAdminEmailRoleQa(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const authorization = await gmailQaAuthorization(request, env);
  if (!authorization.ok) return authorization.response;
  if (!gmailMailProviderConfigured(env) || !env.EMAIL || typeof env.EMAIL.send !== "function") {
    return jsonResponse({ ok: false, error: "Email role QA is not configured", category: "provider_unconfigured" }, 503);
  }

  let body = {};
  try { body = await request.json(); }
  catch (_) { return jsonResponse({ ok: false, error: "Invalid email role QA request" }, 400); }

  const requestedRole = cleanString(body?.role, 40).toLowerCase();
  if (!EMAIL_ROLE_QA_ROLES.has(requestedRole)) return jsonResponse({ ok: false, error: "Invalid email role" }, 400);
  const role = normalizeEmailRole(requestedRole);

  const cache = caches.default;
  const rateKey = new Request(`https://rate-limit.invalid/admin/email-role-qa/${role}`, { method: "GET" });
  if (await cache.match(rateKey)) {
    return jsonResponse({ ok: false, error: "Email role QA rate limit reached", category: "provider_limited" }, 429, { "Retry-After": String(EMAIL_ROLE_QA_RATE_LIMIT_SECONDS) });
  }

  const timestamp = new Date().toISOString();
  const message = buildEmailRoleQaMessage(env, role, { timestamp, commit: authorization.commitSha });
  if (!message) return jsonResponse({ ok: false, error: "Email role QA message is not configured", category: "provider_unconfigured" }, 503);

  try {
    const providerResult = await env.EMAIL.send(message);
    const messageId = cleanString(providerResult?.messageId, 240);
    if (!messageId) return jsonResponse({ ok: false, error: "Email role QA did not return a message ID", category: "provider_error" }, 502);
    await cache.put(rateKey, new Response("sent", { headers: { "Cache-Control": `max-age=${EMAIL_ROLE_QA_RATE_LIMIT_SECONDS}` } }));
    return jsonResponse({ ok: true, provider: "gmail-api", role, messageId, threadId: cleanString(providerResult?.threadId, 240) || null, timestamp, recipient: resolveEmailRole(env, role), replyTo: resolveEmailRole(env, role) }, 200);
  } catch (error) {
    const category = gmailProviderQaErrorCategory(error);
    return jsonResponse({ ok: false, error: "Email role QA failed", category }, category === "provider_limited" ? 429 : 502);
  }
}

export { handleAdminEmailRoleQa };
