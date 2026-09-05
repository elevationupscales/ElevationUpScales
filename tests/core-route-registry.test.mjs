import assert from "node:assert/strict";
import {
  CORE_ROUTE_REGISTRY,
  CORE_DOMAINS,
  matchCoreRoute,
} from "../src/core-route-registry.js";

assert.equal(CORE_ROUTE_REGISTRY.length, 37);

assert.equal(matchCoreRoute("/api/health")?.handler, "handleHealth");
assert.equal(
  matchCoreRoute("/api/site/event")?.domain,
  "analytics",
);
assert.equal(
  matchCoreRoute("/api/project/submit")?.domain,
  "leads",
);
assert.equal(
  matchCoreRoute("/api/marketplace/image/abc/0")?.handler,
  "handleMarketplaceImage",
);
assert.equal(
  matchCoreRoute("/api/admin/inventory/item-1")?.handler,
  "handleAdminInventory",
);
assert.equal(
  matchCoreRoute("/api/admin/listings/abc")?.handler,
  "handleAdminListings",
);
assert.deepEqual(
  {
    domain: matchCoreRoute("/api/store-products")?.domain,
    handler: matchCoreRoute("/api/store-products")?.handler,
  },
  {
    domain: "compatibility",
    handler: "handleStoreProductsCompatibility",
  },
);
assert.equal(matchCoreRoute("/not-a-core-route"), null);

for (const required of [
  "system",
  "admin-auth",
  "analytics",
  "leads",
  "marketplace",
  "inventory",
  "solar",
  "compatibility",
]) {
  assert.ok(CORE_DOMAINS.includes(required), `missing domain ${required}`);
}

console.log("core-route-registry.test.mjs: PASS");
