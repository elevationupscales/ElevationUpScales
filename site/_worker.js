import coreWorker from "./worker-core.js";
import { handleStoreCheckoutApi } from "./store-checkout-server.js";
import { handleStoreOrdersAdminApi } from "./store-orders-admin-server.js";
import { handleCatalogAdminApi, handleCatalogPublicApi } from "./catalog-admin-runtime.js";
import { handleHawaiiLithiumAdminApi, handleHawaiiLithiumPublicApi } from "./hawaii-lithium-runtime.js";
import { handleSyncAdminApi, handleSyncScheduledApi } from "./sync-admin-runtime.js";
import { handleDobaCsvSyncAdminApi } from "./doba-csv-sync-runtime.js";
import { handleApparelProviderAdminApi } from "./apparel-provider-runtime.js";

// Protected production invariants continue to execute inside worker-core.js.
// 3.11.30-store-navigation-repair
// /api/admin/inventory
// eus_inventory_items
// 4.3.1-store-catalog-manager

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




function sameOriginPost(request) {
  if (request.method !== "POST") return true;
  const origin = clean(request.headers.get("Origin"), 500);
  if (!origin) return false;
  try { return origin === new URL(request.url).origin; }
  catch (_) { return false; }
}








export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (["/worker-core.js", "/store-checkout-server.js", "/store-orders-admin-server.js", "/catalog-admin-server.js", "/catalog-admin-runtime.js", "/hawaii-lithium-runtime.js", "/sync-admin-runtime.js", "/doba-csv-sync-runtime.js", "/apparel-provider-runtime.js", "/commerce-schema-migrations.js"].includes(url.pathname)) {
      return new Response("Not found", {
        status: 404,
        headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
      });
    }

    const isQuote = url.pathname === "/api/store-checkout/quote";
    const isCreate = url.pathname === "/api/store-checkout/orders";
    const isCapture = /^\/api\/store-checkout\/orders\/[A-Z0-9]{8,40}\/capture$/i.test(url.pathname);

    if ((isQuote || isCreate || isCapture) && request.method === "POST" && !sameOriginPost(request)) {
      return checkoutJson({ error: "Cross-origin request denied" }, 403);
    }

    if (url.pathname === "/api/store-checkout/config" || isQuote || isCreate || isCapture) {
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

    if (url.pathname === "/api/admin/doba-csv-sync") {
      return handleDobaCsvSyncAdminApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/admin/apparel-providers") {
      return handleApparelProviderAdminApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/sync/run") {
      return handleSyncScheduledApi(request, env, url.pathname);
    }


    const response = await coreWorker.fetch(request, env, ctx);
    if (url.pathname === "/checkout" || url.pathname === "/checkout/") return checkoutResponse(response);
    return response;
  },
};
