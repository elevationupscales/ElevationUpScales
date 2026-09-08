import assert from "node:assert/strict";
import fs from "node:fs";

const server = fs.readFileSync("site/store-orders-admin-server.js", "utf8");
const client = fs.readFileSync("site/admin-store-orders.js", "utf8");
const html = fs.readFileSync("site/admin-store-orders.html", "utf8");
const checkout = fs.readFileSync("site/store-checkout-server.js", "utf8");

for (const token of [
  '"supplier_released"',
  "sokSkuFromProductId",
  '"SOK Energy"',
  "supplierSku",
  "COALESCE(json_extract(o.supplier_json,'$.supplierSku'),json_extract(o.supplier_json,'$.skuId'))",
]) assert.ok(server.includes(token), `SOK order server contract missing ${token}`);

for (const token of [
  "Prepare Supplier Order",
  "PO Submitted",
  "Supplier Paid / Released",
  "supplierSku",
  "Supplier SKU / model",
]) assert.ok(client.includes(token), `SOK order client contract missing ${token}`);

for (const token of [
  'value="supplier_released"',
  "Prepare Supplier Order",
  "PO Submitted",
  "Supplier Paid / Released",
  "Supplier Order / PO Reference",
]) assert.ok(html.includes(token), `SOK order UI contract missing ${token}`);

assert.ok(server.includes("supplier.skuId"), "legacy Doba skuId compatibility must remain");
assert.ok(client.includes("order?.supplier?.skuId"), "legacy Doba client compatibility must remain");

for (const privateTerm of ["kam@sokbattery.com", "3% handling fee", "bank wire", "100% prepay"]) {
  assert.equal(server.includes(privateTerm), false, `private supplier term leaked into server source: ${privateTerm}`);
  assert.equal(client.includes(privateTerm), false, `private supplier term leaked into client source: ${privateTerm}`);
  assert.equal(html.includes(privateTerm), false, `private supplier term leaked into admin HTML: ${privateTerm}`);
  assert.equal(checkout.includes(privateTerm), false, `private supplier term leaked into checkout: ${privateTerm}`);
}

assert.ok(checkout.includes("paypal_capture_id"), "live checkout capture storage contract must remain");
assert.ok(checkout.includes("eus_store_orders"), "store order source-of-truth contract must remain");

console.log("SOK dropship order foundation static QA: PASS");
