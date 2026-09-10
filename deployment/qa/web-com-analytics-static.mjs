import assert from "node:assert/strict";
import fs from "node:fs";
import {
  SITE_INTENT_CLIENT_EVENT_TYPES,
  SITE_INTENT_SERVER_ONLY_EVENT_TYPES,
  sanitizeSiteEventDetails,
} from "../../site/worker/core-context.js";

const requiredClientEvents = [
  "homepage_sok_open",
  "homepage_logistics_capability_view",
  "homepage_logistics_route",
  "homepage_product_buy_open",
  "homepage_product_detail_open",
  "sok_catalog_view",
  "sok_catalog_filter",
  "sok_catalog_search",
  "sok_product_open",
  "sok_product_view",
  "sok_related_product_open",
  "sok_media_view",
  "purchase_options_open",
  "purchase_inquiry_start",
  "purchase_inquiry_submit",
  "hawaii_options_open",
  "commercial_review_route",
  "checkout_start",
  "start_project_open",
];
for (const event of requiredClientEvents) {
  assert.equal(SITE_INTENT_CLIENT_EVENT_TYPES.has(event), true, `client analytics allowlist missing ${event}`);
  assert.equal(SITE_INTENT_SERVER_ONLY_EVENT_TYPES.has(event), false, `${event} must remain client-safe, not server-only`);
}

const details = sanitizeSiteEventDetails({
  source: "sok-batteries",
  sourceControl: "use-case-card",
  stage: "product-page",
  intent: "purchase-options",
  mediaIndex: "2",
  relatedSku: "SK12V100PC",
  characters: 7,
  destination: "/sok-batteries",
  email: "must-not-store@example.com",
  phone: "2085551212",
  notes: "private",
  supplierCost: "100.00",
});
assert.equal(details.source, "sok-batteries");
assert.equal(details.sourceControl, "use-case-card");
assert.equal(details.stage, "product-page");
assert.equal(details.intent, "purchase-options");
assert.equal(details.mediaIndex, "2");
assert.equal(details.relatedSku, "SK12V100PC");
assert.equal(details.characters, 7);
assert.equal(details.destination, "/sok-batteries");
for (const forbidden of ["email", "phone", "notes", "supplierCost"]) assert.equal(Object.hasOwn(details, forbidden), false, `analytics details leaked ${forbidden}`);

const collection = fs.readFileSync("site/sok-batteries.js", "utf8");
for (const event of ["sok_catalog_view", "sok_catalog_filter", "sok_catalog_search", "sok_product_open"]) assert.ok(collection.includes(event));
assert.equal(collection.includes('track("sok_catalog_search",query||'), false, "SOK search analytics must not store raw customer search text as event value");

const product = fs.readFileSync("site/sok-static-product.js", "utf8");
for (const event of ["sok_product_view", "sok_related_product_open", "sok_media_view", "purchase_options_open"]) assert.ok(product.includes(event));

const homeRuntime = fs.readFileSync("site/home-commerce.js", "utf8");
for (const event of ["homepage_logistics_capability_view", "homepage_logistics_route", "homepage_product_buy_open", "homepage_product_detail_open"]) assert.ok(homeRuntime.includes(event));
assert.ok(homeRuntime.includes('sourceControl:"static-logistics"'), "static redesigned logistics block must record a capability view");

const home = fs.readFileSync("site/index.html", "utf8");
assert.ok(home.includes("AUTHORIZED SOK ENERGY DEALER"));
assert.ok(home.includes("Lithium Power"));
assert.ok(home.includes("for RV, Solar &amp; Backup"));
assert.equal(home.includes("Supply Logistics &amp; Ocean Freight"), false, "superseded freight mission returned to homepage flagship");
assert.ok(home.includes("Battery Freight for Hawaii &amp; Alaska."));
assert.ok(home.includes('data-eus-event="start_project_open"'), "homepage Start a Project CTAs must use start_project_open");
assert.ok(home.includes('data-eus-event="homepage_sok_open" data-eus-value="SK12V100PC"'), "homepage SK12V100PC analytics missing");
assert.ok(home.includes('data-eus-event="homepage_sok_open" data-eus-value="SK48V100N"'), "homepage SK48V100N analytics missing");
assert.ok(home.includes('data-eus-value="alaska"'), "homepage Alaska logistics route analytics missing");
assert.equal(home.toLowerCase().includes("start with what you need"), false, "removed owner copy returned to homepage");
assert.equal(home.includes("for RV Life."), false, "superseded RV-life hero copy returned to homepage");

console.log("WEB-COM-0906 storefront analytics redesign reconciliation: PASS");