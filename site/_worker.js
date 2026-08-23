import core from "./_worker_core.js";
import { handleStoreInventory } from "./ebay-inventory-sync.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/_worker_core.js" || url.pathname === "/ebay-inventory-sync.js") {
      return new Response("Not found", { status: 404 });
    }
    if (url.pathname === "/api/store-inventory") {
      return handleStoreInventory(request, env);
    }
    return core.fetch(request, env, ctx);
  },
};
