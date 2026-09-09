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

export const EMAIL_ROLE_DEFAULTS = ROLE_DEFAULTS;
export const EMAIL_ROLE_ENV_KEYS = ROLE_ENV_KEYS;
