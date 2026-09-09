export const GMAIL_PROVIDER_QA_SUBJECT = "Elevation Gmail Production Provider QA";
export const GMAIL_PROVIDER_QA_TOKEN_HEADER = "X-EUS-Gmail-QA-Token";
export const GMAIL_PROVIDER_QA_TOKEN_SHA256 = "9104c2f85a1232c54c6c7f704fb4e35649f57bd21ed63d01055c3ca388e20c6f";
export const GMAIL_PROVIDER_QA_TOKEN_EXPIRES_AT = "2026-09-09T06:30:00Z";
export const GMAIL_PROVIDER_QA_RATE_LIMIT_SECONDS = 24 * 60 * 60;

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value ?? "")));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function temporaryGmailQaTokenAuthorized(token, nowMs = Date.now()) {
  if (!token || !Number.isFinite(nowMs) || nowMs > Date.parse(GMAIL_PROVIDER_QA_TOKEN_EXPIRES_AT)) return false;
  return (await sha256Hex(token)) === GMAIL_PROVIDER_QA_TOKEN_SHA256;
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
