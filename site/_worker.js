import coreWorker from "./worker-core.js";
import { handleStoreCheckoutApi } from "./store-checkout-server.js";
import { handleStoreOrdersAdminApi } from "./store-orders-admin-server.js";
import { handleCatalogAdminApi, handleCatalogPublicApi } from "./catalog-admin-runtime.js";
import { handleHawaiiLithiumAdminApi, handleHawaiiLithiumPublicApi } from "./hawaii-lithium-runtime.js";
import { handleSyncAdminApi, handleSyncScheduledApi } from "./sync-admin-runtime.js";

// Protected production invariants continue to execute inside worker-core.js.
// 3.11.30-store-navigation-repair
// /api/admin/inventory
// eus_inventory_items
// 4.3.1-store-catalog-manager

const APPAREL_ROUTING_LOADER = `
;(() => {
  if (document.querySelector('script[data-eus-store-checkout-routing="true"]')) return;
  const script = document.createElement("script");
  script.src = "/store-checkout-routing.js?v=3.11.42";
  script.async = false;
  script.dataset.eusStoreCheckoutRouting = "true";
  document.head.appendChild(script);
})();
`;

const RV_ROUTING_LOADER = `
;(() => {
  if (document.querySelector('script[data-eus-rv-checkout-routing="true"]')) return;
  const script = document.createElement("script");
  script.src = "/rv-checkout-routing.js?v=3.11.42";
  script.async = false;
  script.dataset.eusRvCheckoutRouting = "true";
  document.head.appendChild(script);
})();
`;

const ADMIN_ORDERS_LOADER = `
;(() => {
  if (document.querySelector('script[data-eus-admin-orders-link="true"]')) return;
  const script = document.createElement("script");
  script.src = "/admin-store-orders-link.js?v=3.11.42";
  script.async = false;
  script.dataset.eusAdminOrdersLink = "true";
  document.head.appendChild(script);
})();
`;

const ADMIN_COMMAND_CENTER_LOADER = `
<script src="/admin-command-center.js?v=4.3.7"></script>
`;

const CHECKOUT_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.paypalobjects.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.paypal.com https://*.paypal.com https://cloudflareinsights.com",
  "frame-src https://www.paypal.com https://*.paypal.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "form-action 'self' https://www.paypal.com https://*.paypal.com",
  "upgrade-insecure-requests",
].join("; ");

async function appendRuntimeLoader(response, loader) {
  if (!response || !response.ok) return response;
  const type = String(response.headers.get("Content-Type") || "");
  if (!/javascript|text\/plain/i.test(type)) return response;
  const headers = new Headers(response.headers);
  headers.delete("Content-Length");
  headers.set("Cache-Control", "no-store");
  return new Response(`${await response.text()}\n${loader}`, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}


async function appendHtmlLoader(response, loader) {
  if (!response || !response.ok) return response;
  const type = String(response.headers.get("Content-Type") || "");
  if (!/text\/html/i.test(type)) return response;
  const headers = new Headers(response.headers);
  headers.delete("Content-Length"); headers.set("Cache-Control", "no-store");
  return new Response(`${await response.text()}\n${loader}`, { status: response.status, statusText: response.statusText, headers });
}

function checkoutResponse(response) {
  if (!response) return response;
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", CHECKOUT_CSP);
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function checkoutJson(data, status) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function validEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean(value, 180));
}

function validQuantity(value) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 10;
}

function validUsAddress(raw = {}) {
  const state = clean(raw.state, 2).toUpperCase();
  const postalCode = clean(raw.postalCode, 10);
  const countryCode = (clean(raw.countryCode, 2).toUpperCase() || "US");
  return Boolean(
    clean(raw.fullName, 120) &&
    clean(raw.address1, 180) &&
    clean(raw.city, 120) &&
    /^[A-Z]{2}$/.test(state) &&
    /^\d{5}(?:-\d{4})?$/.test(postalCode) &&
    countryCode === "US"
  );
}

function sameOriginPost(request) {
  if (request.method !== "POST") return true;
  const origin = clean(request.headers.get("Origin"), 500);
  if (!origin) return false;
  try { return origin === new URL(request.url).origin; }
  catch (_) { return false; }
}

function readDobaMap(env) {
  try {
    const parsed = JSON.parse(clean(env?.DOBA_PRODUCT_MAP_JSON, 50_000) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_) {
    return {};
  }
}

function verifiedRvEntry(env, raw = {}) {
  const id = clean(raw.id, 20);
  const entry = readDobaMap(env)[id];
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
  const priceCents = Number.parseInt(String(entry.priceCents ?? ""), 10);
  const shippingCents = Number.parseInt(String(entry.shippingCents ?? ""), 10);
  if (entry.shippingVerified !== true || !Number.isInteger(priceCents) || priceCents < 1 || !Number.isInteger(shippingCents) || shippingCents < 0) return null;
  return entry;
}

function validEbayItemUrl(value) {
  const url = clean(value, 300);
  return /^https:\/\/www\.ebay\.com\/itm\/\d{12}$/i.test(url) ? url : "";
}

function rvFallback(raw = {}, entry = null, message = "Doba shipping is not verified for this item") {
  return checkoutJson({
    ok: false,
    fallback: "ebay",
    error: message,
    ebayUrl: validEbayItemUrl(entry?.ebayUrl) || validEbayItemUrl(raw.ebayUrl),
  }, 409);
}

function rvDestinationAllowed(entry, raw = {}) {
  const state = clean(raw?.shipping?.state, 2).toUpperCase();
  if (!state) return true;
  const blocked = Array.isArray(entry?.blockedStates) ? entry.blockedStates.map((value) => clean(value, 2).toUpperCase()) : [];
  if (blocked.includes(state)) return false;
  const allowed = Array.isArray(entry?.allowedStates) ? entry.allowedStates.map((value) => clean(value, 2).toUpperCase()).filter(Boolean) : [];
  return !allowed.length || allowed.includes(state);
}

async function ensureStoreOrderTable(env) {
  if (!env?.MARKETPLACE_DB || typeof env.MARKETPLACE_DB.prepare !== "function") return false;
  try {
    await env.MARKETPLACE_DB.prepare(`
      CREATE TABLE IF NOT EXISTS eus_store_orders (
        id TEXT PRIMARY KEY,
        source TEXT NOT NULL,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        variant_id TEXT,
        variant_name TEXT,
        quantity INTEGER NOT NULL,
        unit_price_cents INTEGER NOT NULL,
        merchandise_cents INTEGER NOT NULL,
        shipping_cents INTEGER NOT NULL,
        total_cents INTEGER NOT NULL,
        customer_json TEXT NOT NULL,
        shipping_json TEXT NOT NULL,
        supplier_json TEXT NOT NULL,
        paypal_order_id TEXT UNIQUE,
        paypal_capture_id TEXT,
        payment_status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        paid_at TEXT
      )
    `).run();
    return true;
  } catch (error) {
    console.error(JSON.stringify({ event: "store_order_schema_preflight_error", message: clean(error?.message, 240) }));
    return false;
  }
}

async function checkoutRequestBody(request) {
  try { return await request.clone().json(); }
  catch (_) { return {}; }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (["/worker-core.js", "/store-checkout-server.js", "/store-orders-admin-server.js", "/catalog-admin-server.js", "/catalog-admin-runtime.js", "/hawaii-lithium-runtime.js", "/sync-admin-runtime.js"].includes(url.pathname)) {
      return new Response("Not found", {
        status: 404,
        headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
      });
    }

    const isQuote = url.pathname === "/api/store-checkout/quote";
    const isCreate = url.pathname === "/api/store-checkout/orders";

    if ((isQuote || isCreate) && request.method === "POST") {
      if (!sameOriginPost(request)) return checkoutJson({ error: "Cross-origin request denied" }, 403);
      const raw = await checkoutRequestBody(request);
      const source = clean(raw.source, 20).toLowerCase();
      if (!["apparel", "rv"].includes(source)) return checkoutJson({ error: "Invalid store source" }, 400);
      if (!validQuantity(raw.quantity)) return checkoutJson({ error: "Quantity must be from 1 to 10" }, 400);

      if (source === "rv") {
        const entry = verifiedRvEntry(env, raw);
        if (!entry) return rvFallback(raw);
        if (!rvDestinationAllowed(entry, raw)) return rvFallback(raw, entry, "This Doba item is not available for the selected shipping state");
      }

      if (isCreate) {
        if (!validEmail(raw?.customer?.email)) return checkoutJson({ error: "A valid customer email is required" }, 400);
        if (!validUsAddress(raw?.shipping)) return checkoutJson({ error: "A valid U.S. shipping address is required" }, 400);
        if (!await ensureStoreOrderTable(env)) return checkoutJson({ error: "Store order storage is not configured" }, 503);
      }
    }

    if (url.pathname === "/api/store-checkout/config" ||
        isQuote ||
        isCreate ||
        /^\/api\/store-checkout\/orders\/[A-Z0-9]{8,40}\/capture$/i.test(url.pathname)) {
      return handleStoreCheckoutApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/admin/store-orders" || url.pathname.startsWith("/api/admin/store-orders/")) {
      return handleStoreOrdersAdminApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/store-catalog") {
      return handleCatalogPublicApi(request, env, url.pathname);
    }

    if (url.pathname.startsWith("/api/hawaii-lithium/")) {
      return handleHawaiiLithiumPublicApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/admin/catalog" || url.pathname.startsWith("/api/admin/catalog/")) {
      return handleCatalogAdminApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/admin/lithium-shipping" || url.pathname.startsWith("/api/admin/lithium-shipping/")) {
      return handleHawaiiLithiumAdminApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/admin/sync" || url.pathname.startsWith("/api/admin/sync/")) {
      return handleSyncAdminApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/sync/run") {
      return handleSyncScheduledApi(request, env, url.pathname);
    }

    if (url.pathname === "/store-config.js") {
      return appendRuntimeLoader(await coreWorker.fetch(request, env, ctx), APPAREL_ROUTING_LOADER);
    }

    if (url.pathname === "/rv-store.js") {
      return appendRuntimeLoader(await coreWorker.fetch(request, env, ctx), RV_ROUTING_LOADER);
    }

    if (url.pathname === "/admin-listings.js") {
      return appendRuntimeLoader(await coreWorker.fetch(request, env, ctx), ADMIN_ORDERS_LOADER);
    }

    const response = await coreWorker.fetch(request, env, ctx);
    if (url.pathname === "/checkout" || url.pathname === "/checkout/") return checkoutResponse(response);
    const adminHtml = url.pathname === "/admin" || url.pathname === "/admin/" || url.pathname.startsWith("/admin-") || url.pathname === "/admin.html";
    if (adminHtml) return appendHtmlLoader(response, ADMIN_COMMAND_CENTER_LOADER);
    return response;
  },
};
