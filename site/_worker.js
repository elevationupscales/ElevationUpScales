import coreWorker from "./worker-core.js";
import { handleStoreCheckoutApi } from "./store-checkout-server.js";

// Protected production invariants continue to execute inside worker-core.js.
// 3.11.30-store-navigation-repair
// /api/admin/inventory
// eus_inventory_items

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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/store-checkout/orders" &&
        (!env?.MARKETPLACE_DB || typeof env.MARKETPLACE_DB.prepare !== "function")) {
      return checkoutJson({ error: "Store order storage is not configured" }, 503);
    }

    if (url.pathname === "/api/store-checkout/config" ||
        url.pathname === "/api/store-checkout/quote" ||
        url.pathname === "/api/store-checkout/orders" ||
        /^\/api\/store-checkout\/orders\/[A-Z0-9]{8,40}\/capture$/i.test(url.pathname)) {
      return handleStoreCheckoutApi(request, env, url.pathname);
    }

    if (url.pathname === "/store-config.js") {
      return appendRuntimeLoader(await coreWorker.fetch(request, env, ctx), APPAREL_ROUTING_LOADER);
    }

    if (url.pathname === "/rv-store.js") {
      return appendRuntimeLoader(await coreWorker.fetch(request, env, ctx), RV_ROUTING_LOADER);
    }

    const response = await coreWorker.fetch(request, env, ctx);
    if (url.pathname === "/checkout" || url.pathname === "/checkout/") return checkoutResponse(response);
    return response;
  },
};
