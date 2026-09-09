const ROLE_DEFAULTS = Object.freeze({
  owner: "casey@elevationupscales.com",
  sales: "sales@elevationupscales.com",
  orders: "orders@elevationupscales.com",
  logistics: "logistics@elevationupscales.com",
  support: "support@elevationupscales.com",
});

const ROLE_ENV_KEYS = Object.freeze({
  owner: "EMAIL_OWNER",
  sales: "EMAIL_SALES",
  orders: "EMAIL_ORDERS",
  logistics: "EMAIL_LOGISTICS",
  support: "EMAIL_SUPPORT",
});

const ROLE_LABELS = Object.freeze({
  owner: "Owner / Strategic",
  sales: "Sales",
  orders: "Orders",
  logistics: "Logistics",
  support: "Support",
});

const NOTIFICATION_OVERRIDE_KEYS = new Set([
  "OWNER_LEAD_EMAIL_TO",
  "SOLAR_EMAIL_TO",
  "MARKETPLACE_EMAIL_TO",
]);

function clean(value, max = 320) {
  return String(value ?? "").trim().slice(0, max);
}

function validEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean(value, 320));
}

export function normalizeEmailRole(role) {
  const key = clean(role, 40).toLowerCase();
  return Object.hasOwn(ROLE_DEFAULTS, key) ? key : "support";
}

export function resolveEmailRole(env, role) {
  const key = normalizeEmailRole(role);
  const configured = clean(env?.[ROLE_ENV_KEYS[key]], 320).toLowerCase();
  return validEmail(configured) ? configured : ROLE_DEFAULTS[key];
}

export function withEmailRole(env, role) {
  const address = resolveEmailRole(env, role);
  return new Proxy(env || {}, {
    get(target, property, receiver) {
      if (NOTIFICATION_OVERRIDE_KEYS.has(property)) return address;
      return Reflect.get(target, property, receiver);
    },
  });
}

export function roleForNotificationPath(pathname) {
  const path = clean(pathname, 260);
  if (path === "/api/solar-build-notify") return "sales";
  if (path.startsWith("/api/project/")) return "sales";
  if (path === "/api/work-with-us/submit") return "owner";
  return "support";
}

export function buildCustomerAcknowledgement(env, role, input = {}) {
  const roleKey = normalizeEmailRole(role);
  const recipientEmail = clean(input.recipientEmail, 320).toLowerCase();
  const fromEmail = clean(env?.MAIL_FROM, 320).toLowerCase();
  const reference = clean(input.reference, 120);
  const subject = clean(input.subject, 300);
  const nextStep = clean(input.nextStep, 800);
  if (!validEmail(recipientEmail) || !validEmail(fromEmail) || !reference || !subject || !nextStep) return null;
  const replyTo = resolveEmailRole(env, roleKey);
  return {
    from: { email: fromEmail, name: "Elevation UpScales" },
    to: { email: recipientEmail, name: clean(input.recipientName, 160) || recipientEmail },
    replyTo,
    subject,
    text: [
      "We received your request.",
      "",
      `Reference: ${reference}`,
      nextStep,
      "",
      `Questions can be sent to ${replyTo}.`,
      "",
      "This confirmation does not promise inventory, freight acceptance, compatibility, pricing, availability, or a delivery date. Those items require separate review when applicable.",
    ].join("\n"),
  };
}

export async function sendCustomerAcknowledgement(env, role, input = {}) {
  const message = buildCustomerAcknowledgement(env, role, input);
  if (!message || !env?.EMAIL || typeof env.EMAIL.send !== "function") return { status: "not_configured", messageId: "" };
  try {
    const result = await env.EMAIL.send(message);
    return { status: "sent", messageId: clean(result?.messageId, 240), replyTo: message.replyTo };
  } catch (error) {
    return { status: "failed", messageId: "", errorCode: clean(error?.code, 80) || "provider_error" };
  }
}

export function buildEmailRoleQaMessage(env, role, { timestamp = new Date().toISOString(), commit = "" } = {}) {
  const roleKey = normalizeEmailRole(role);
  const fromEmail = clean(env?.MAIL_FROM, 320).toLowerCase();
  const roleAddress = resolveEmailRole(env, roleKey);
  if (!validEmail(fromEmail) || !validEmail(roleAddress)) return null;
  return {
    from: { email: fromEmail, name: "Elevation UpScales" },
    to: { email: roleAddress, name: `Elevation ${ROLE_LABELS[roleKey]}` },
    replyTo: roleAddress,
    subject: `Elevation Email Role QA — ${roleKey.toUpperCase()}`,
    text: [
      "Elevation UpScales internal email-role routing QA.",
      "",
      `Role: ${roleKey}`,
      `Role address: ${roleAddress}`,
      `Production commit: ${clean(commit, 120) || "unavailable"}`,
      `Timestamp: ${clean(timestamp, 80)}`,
      "",
      "This is synthetic internal QA traffic. No reply or action is required.",
    ].join("\n"),
  };
}

export const EMAIL_ROLE_DEFAULTS = ROLE_DEFAULTS;
export const EMAIL_ROLE_ENV_KEYS = ROLE_ENV_KEYS;
export const EMAIL_ROLE_LABELS = ROLE_LABELS;
