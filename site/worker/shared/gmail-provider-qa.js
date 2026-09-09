export const GMAIL_PROVIDER_QA_SUBJECT = "Elevation Gmail Production Provider QA";
export const GMAIL_PROVIDER_QA_RATE_LIMIT_SECONDS = 24 * 60 * 60;
export const GMAIL_PROVIDER_QA_OIDC_AUDIENCE = "elevation-gmail-provider-qa";
export const GMAIL_PROVIDER_QA_OIDC_ISSUER = "https://token.actions.githubusercontent.com";
export const GMAIL_PROVIDER_QA_REPOSITORY = "elevationupscales/ElevationUpScales";
export const GMAIL_PROVIDER_QA_REF = "refs/heads/qa/gmail-provider-live-20260908";
export const GMAIL_PROVIDER_QA_WORKFLOW_PATH = ".github/workflows/gmail-provider-live-qa.yml";

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);

function decodeBase64UrlBytes(segment) {
  const normalized = String(segment ?? "").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function decodeJwtJson(segment) {
  const bytes = decodeBase64UrlBytes(segment);
  return JSON.parse(new TextDecoder().decode(bytes));
}

function audienceIncludes(aud, expected) {
  if (Array.isArray(aud)) return aud.includes(expected);
  return aud === expected;
}

export function validateGithubActionsQaClaims(claims, nowMs = Date.now()) {
  const nowSeconds = Math.floor(Number(nowMs) / 1000);
  if (!claims || typeof claims !== "object" || !Number.isFinite(nowSeconds)) return { ok: false, reason: "claims" };
  if (claims.iss !== GMAIL_PROVIDER_QA_OIDC_ISSUER) return { ok: false, reason: "issuer" };
  if (!audienceIncludes(claims.aud, GMAIL_PROVIDER_QA_OIDC_AUDIENCE)) return { ok: false, reason: "audience" };
  if (claims.repository !== GMAIL_PROVIDER_QA_REPOSITORY) return { ok: false, reason: "repository" };
  if (claims.ref !== GMAIL_PROVIDER_QA_REF) return { ok: false, reason: "ref" };
  if (claims.event_name !== "push") return { ok: false, reason: "event" };
  if (claims.environment !== "production") return { ok: false, reason: "environment" };
  const expectedWorkflow = `${GMAIL_PROVIDER_QA_REPOSITORY}/${GMAIL_PROVIDER_QA_WORKFLOW_PATH}@${GMAIL_PROVIDER_QA_REF}`;
  if (claims.workflow_ref !== expectedWorkflow) return { ok: false, reason: "workflow" };
  if (!/^[a-f0-9]{40}$/i.test(clean(claims.sha, 80))) return { ok: false, reason: "sha" };

  const exp = Number(claims.exp);
  const nbf = Number(claims.nbf);
  const iat = Number(claims.iat);
  if (!Number.isFinite(exp) || exp < nowSeconds - 30) return { ok: false, reason: "expired" };
  if (Number.isFinite(nbf) && nbf > nowSeconds + 30) return { ok: false, reason: "not_yet_valid" };
  if (!Number.isFinite(iat) || iat < nowSeconds - 15 * 60 || iat > nowSeconds + 30) return { ok: false, reason: "issued_at" };
  return { ok: true, sha: clean(claims.sha, 80).toLowerCase() };
}

export async function githubActionsGmailQaAuthorized(token, { fetchImpl = fetch, nowMs = Date.now() } = {}) {
  try {
    const parts = String(token ?? "").split(".");
    if (parts.length !== 3 || parts.some((part) => !part)) return { ok: false, reason: "token" };
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = decodeJwtJson(encodedHeader);
    const claims = decodeJwtJson(encodedPayload);
    if (header?.alg !== "RS256" || !clean(header?.kid, 240)) return { ok: false, reason: "header" };

    const claimCheck = validateGithubActionsQaClaims(claims, nowMs);
    if (!claimCheck.ok) return claimCheck;

    const discoveryResponse = await fetchImpl(`${GMAIL_PROVIDER_QA_OIDC_ISSUER}/.well-known/openid-configuration`, {
      headers: { Accept: "application/json" },
    });
    if (!discoveryResponse?.ok) return { ok: false, reason: "discovery" };
    const discovery = await discoveryResponse.json().catch(() => ({}));
    if (discovery?.issuer !== GMAIL_PROVIDER_QA_OIDC_ISSUER || !discovery?.jwks_uri) return { ok: false, reason: "discovery" };
    const jwksUrl = new URL(discovery.jwks_uri);
    if (jwksUrl.origin !== GMAIL_PROVIDER_QA_OIDC_ISSUER) return { ok: false, reason: "jwks_origin" };

    const jwksResponse = await fetchImpl(jwksUrl.toString(), { headers: { Accept: "application/json" } });
    if (!jwksResponse?.ok) return { ok: false, reason: "jwks" };
    const jwks = await jwksResponse.json().catch(() => ({}));
    const jwk = Array.isArray(jwks?.keys) ? jwks.keys.find((candidate) => candidate?.kid === header.kid && candidate?.kty === "RSA") : null;
    if (!jwk) return { ok: false, reason: "key" };

    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const verified = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      decodeBase64UrlBytes(encodedSignature),
      new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`),
    );
    return verified ? claimCheck : { ok: false, reason: "signature" };
  } catch (_) {
    return { ok: false, reason: "invalid" };
  }
}

export function buildGmailProviderQaMessage(env, { timestamp = new Date().toISOString(), commit = "" } = {}) {
  const recipient = clean(env?.MAIL_FROM, 320);
  const productionCommit = clean(commit || env?.CF_PAGES_COMMIT_SHA || env?.COMMIT_SHA, 120) || "unavailable";
  return {
    from: { email: recipient, name: "Elevation UpScales" },
    to: { email: recipient, name: "Elevation UpScales Internal QA" },
    subject: GMAIL_PROVIDER_QA_SUBJECT,
    text: [
      "Elevation UpScales internal production Gmail-provider QA test.",
      "",
      "This is automated internal non-customer traffic.",
      `Production commit: ${productionCommit}`,
      `Timestamp: ${timestamp}`,
      "",
      "No reply or action is required.",
    ].join("\n"),
  };
}

export function gmailProviderQaErrorCategory(error) {
  const code = clean(error?.code, 80);
  if (["provider_auth", "provider_limited", "provider_error", "template_error"].includes(code)) return code;
  return "application_error";
}
