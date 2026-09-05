import {
  jsonResponse,
  cleanString,
  DEFAULT_ADMIN_EMAIL,
  ADMIN_LOGIN_MAX_BYTES,
  ADMIN_LOGIN_WINDOW_SECONDS,
  sameOriginRequest,
  timingSafeEqualStrings,
  createAdminSession,
  readAdminSession,
  cleanupExpiredSecurityLimits,
  clearDurableRateLimit,
  adminLoginAttempt,
  marketplaceSchemaStatus,
  readLimitedJson,
} from "../core-context.js";


async function handleAdminLogin(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const adminEmail = cleanString(env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL, 180).toLowerCase();
  const adminPassword = String(env.ADMIN_PASSWORD || "");
  if (!adminPassword || !env.ADMIN_SESSION_SECRET) return jsonResponse({ error: "Admin login has not been configured" }, 503);
  const loginAttempt = await adminLoginAttempt(request, env);
  if (!loginAttempt.allowed) return jsonResponse({ error: "Too many login attempts. Please wait 15 minutes and try again." }, 429, { "Retry-After": String(loginAttempt.retryAfter || ADMIN_LOGIN_WINDOW_SECONDS) });
  const parsed = await readLimitedJson(request, ADMIN_LOGIN_MAX_BYTES);
  if (parsed.error === "too_large") return jsonResponse({ error: "Login request is too large" }, 413);
  if (parsed.error) return jsonResponse({ error: "Invalid login request" }, 400);
  const body = parsed.value || {};
  const email = cleanString(body.email, 180).toLowerCase();
  const password = String(body.password || "");
  if (email !== adminEmail || !timingSafeEqualStrings(password, adminPassword)) return jsonResponse({ error: "Incorrect email or password" }, 401);
  if (typeof loginAttempt.cache.delete === "function") await loginAttempt.cache.delete(loginAttempt.key);
  if (loginAttempt.durableScope) await clearDurableRateLimit(env.MARKETPLACE_DB, request, env, loginAttempt.durableScope).catch(() => {});
  await Promise.allSettled([
    cleanupExpiredSecurityLimits(env.MARKETPLACE_DB),
    cleanupExpiredSecurityLimits(env.LEADS_DB),
  ]);
  const token = await createAdminSession(env, adminEmail);
  return jsonResponse({ ok: true, email: adminEmail }, 200, {
    "Set-Cookie": `eus_admin_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`,
  });
}

async function handleAdminLogout(request) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  return jsonResponse({ ok: true }, 200, { "Set-Cookie": "eus_admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0" });
}

async function handleAdminSession(request, env) {
  if (request.method !== "GET") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET" });
  const session = await readAdminSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401);
  let schemaMigration = { migrated: false, needed: false, manual: true };
  if (env.MARKETPLACE_DB) {
    try {
      const status = await marketplaceSchemaStatus(env.MARKETPLACE_DB);
      schemaMigration = { migrated: false, needed: status.needed, manual: true, reason: status.reason || "" };
    } catch (error) {
      console.error(JSON.stringify({ event: "marketplace_schema_status_error", message: error instanceof Error ? error.message : String(error) }));
      schemaMigration = { migrated: false, needed: true, manual: true, blocked: true, reason: "schema_check_failed" };
    }
  }
  return jsonResponse({ authenticated: true, ...session, schemaMigration });
}

export {
  handleAdminLogin,
  handleAdminLogout,
  handleAdminSession
};
