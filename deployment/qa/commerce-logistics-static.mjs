import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  COMMERCE_INTAKE_PLATFORMS,
  previewCommerceIntake,
} from "../../site/commerce-intake-runtime.js";

const byId = Object.fromEntries(COMMERCE_INTAKE_PLATFORMS.map((platform) => [platform.id, platform]));

assert.equal(byId.doba.role, "supplier_source");
assert.match(byId.doba.priority, /TikTok Shop and eBay/);
assert.equal(byId.cj.role, "supplier_source");
assert.equal(byId.printful.role, "fulfillment_provider");
assert.equal(byId.spreadconnect.role, "fulfillment_provider");
assert.equal(byId.ebay.role, "sales_channel");
assert.equal(byId.tiktok.role, "sales_channel");
assert.equal(byId.fourthwall.role, "hybrid_store_provider");

const doba = previewCommerceIntake({ platform: "doba", inputMode: "csv", csvText: "SKU,Title\nD-1,Demo" });
assert.equal(doba.redirect, "/admin-channels#doba-csv-sync");
assert.equal(doba.validCount, 0);

const cj = previewCommerceIntake({
  platform: "cj",
  inputMode: "csv",
  fileName: "cj-export.csv",
  csvText: "Product ID,SKU,Product Name,Product URL,Cost,Inventory Qty\nCJ-100,CJ-SKU-100,Portable Power,https://cjdropshipping.com/product/100,19.95,8",
});
assert.equal(cj.validCount, 1);
assert.equal(cj.rows[0].externalId, "CJ-100");
assert.equal(cj.rows[0].sku, "CJ-SKU-100");
assert.equal(cj.rows[0].costCents, 1995);
assert.equal(cj.rows[0].quantity, 8);

const ebay = previewCommerceIntake({
  platform: "ebay",
  inputMode: "url",
  productUrl: "https://www.ebay.com/itm/123456789",
  sku: "EBAY-SKU-1",
  title: "Existing eBay listing",
});
assert.equal(ebay.validCount, 1);
assert.equal(ebay.rows[0].salesChannel, "");

assert.throws(
  () => previewCommerceIntake({ platform: "tiktok", inputMode: "url", productUrl: "javascript:alert(1)" }),
  /valid http\(s\)/,
);

const [html, client, worker, commandCenter] = await Promise.all([
  readFile(new URL("../../site/admin-commerce-logistics.html", import.meta.url), "utf8"),
  readFile(new URL("../../site/admin-commerce-logistics.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/_worker.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/admin-command-center.js", import.meta.url), "utf8"),
]);

for (const id of ["commerce-platform-grid", "commerce-platform", "commerce-input-mode", "commerce-preview", "commerce-stage", "commerce-candidates"]) {
  assert.match(html, new RegExp(`id=["']${id}["']`));
}
assert.match(html, /Doba is the primary inventory source for TikTok Shop and eBay/);
assert.match(html, /No automatic publishing/);
assert.match(client, /elevation-\$\{item\.id\}-intake-template\.csv/);
assert.match(client, /will not publish products/);
assert.match(worker, /\/api\/admin\/commerce-intake/);
assert.match(worker, /handleCommerceIntakeAdminApi/);

// Commerce Logistics remains available as the Products / Imports contextual tool,
// not as a competing top-level Admin destination.
assert.match(commandCenter, /Channels & Sync/);
assert.match(commandCenter, /admin-commerce-logistics/);
assert.match(commandCenter, /admin-commerce-logistics[^\n]*return "products"/);
assert.doesNotMatch(commandCenter, /\["Commerce Logistics",\s*"\/admin-commerce-logistics"/);

console.log("Commerce logistics static QA passed.");
