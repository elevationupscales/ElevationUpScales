import core from "./_worker_core.js";
import { handleStoreInventory } from "./ebay-inventory-sync.js";
import { manualRvCatalog } from "./rv-manual-catalog.js";
import { fourthwallCatalogResponse } from "./fourthwall-catalog.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (
      url.pathname === "/_worker_core.js" ||
      url.pathname === "/ebay-inventory-sync.js" ||
      url.pathname === "/rv-manual-catalog.js" ||
      url.pathname === "/fourthwall-catalog.js"
    ) {
      return new Response("Not found", { status: 404 });
    }

    if (url.pathname === "/api/store-products") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "GET, HEAD" } });
      }
      const response = fourthwallCatalogResponse();
      return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
    }

    if (url.pathname === "/api/store-inventory") {
      const response = await handleStoreInventory(request, env);
      if (request.method === "HEAD") return response;
      try {
        const data = await response.clone().json();
        const liveItems = Array.isArray(data.items) ? data.items : [];
        if (liveItems.length > 0) return response;
        const fallback = manualRvCatalog();
        return Response.json({
          ...data,
          items: fallback,
          count: fallback.length,
          catalogMode: "manual-fallback",
          supplierSync: {
            ...(data.supplierSync || {}),
            liveFeedAvailable: false,
            fallbackActive: true,
          },
        }, {
          status: 200,
          headers: {
            "Cache-Control": "public, max-age=30, s-maxage=30",
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "no-referrer",
          },
        });
      } catch (_) {
        const fallback = manualRvCatalog();
        return Response.json({
          items: fallback,
          count: fallback.length,
          storageConfigured: Boolean(env.MARKETPLACE_DB?.prepare),
          catalogMode: "manual-fallback",
          supplierSync: { status: "error", source: "ebay", liveFeedAvailable: false, fallbackActive: true },
        }, { status: 200, headers: { "Cache-Control": "public, max-age=30, s-maxage=30", "X-Content-Type-Options": "nosniff" } });
      }
    }
    return core.fetch(request, env, ctx);
  },
};