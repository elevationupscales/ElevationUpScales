import assert from "node:assert/strict";
import fs from "node:fs";
import { SOK_FULL_LINE_PUBLIC } from "../../site/sok-full-line-data.js";
import { __sokOperationsTest } from "../../site/sok-operations-runtime.js";

const { OPERATIONAL_ROSTER, STOCK_FRESH_DAYS, previewStockUpdate, stockState } = __sokOperationsTest;
const catalogSkus = SOK_FULL_LINE_PUBLIC.map((product) => product.sku).sort();
const rosterSkus = OPERATIONAL_ROSTER.map((product) => product.sku).sort();

assert.equal(OPERATIONAL_ROSTER.length, 20);
assert.deepEqual(rosterSkus, catalogSkus, "protected SOK stock roster must match the exact public catalog");
assert.equal(STOCK_FRESH_DAYS, 7);

for (const product of OPERATIONAL_ROSTER.filter((item) => !["SK12V100PC", "SK48V100N"].includes(item.sku))) {
  assert.equal(product.supplierInventory, null, `${product.sku} must start with unknown supplier stock`);
  assert.equal(product.lastSupplierVerified, "", `${product.sku} must require a stock verification date`);
  assert.equal(product.lower48Eligible, 0, `${product.sku} must not gain shipping eligibility from catalog presence`);
}

const valid = previewStockUpdate({ rows: [
  { sku: "SK12V100H", supplierInventory: "24", lastSupplierVerified: "2026-09-08" },
  { sku: "SK24V100", supplierInventory: "0", lastSupplierVerified: "2026-09-08" },
] });
assert.equal(valid.canApply, true);
assert.equal(valid.publicationChanged, false);
assert.equal(valid.writeScope, "supplier_inventory + last_supplier_verified only");

assert.equal(previewStockUpdate({ rows: [{ sku: "NOT-SOK", supplierInventory: 1, lastSupplierVerified: "2026-09-08" }] }).canApply, false);
assert.equal(previewStockUpdate({ rows: [
  { sku: "SK12V100H", supplierInventory: 1, lastSupplierVerified: "2026-09-08" },
  { sku: "SK12V100H", supplierInventory: 2, lastSupplierVerified: "2026-09-08" },
] }).canApply, false);
assert.equal(previewStockUpdate({ rows: [{ sku: "SK12V100H", supplierInventory: 1, lastSupplierVerified: "" }] }).canApply, false);
assert.equal(previewStockUpdate({ rows: [{ sku: "SK12V100H", supplierInventory: "1.5", lastSupplierVerified: "2026-09-08" }] }).canApply, false);
assert.equal(previewStockUpdate({ rows: [{ sku: "SK12V100H", supplierInventory: "", lastSupplierVerified: "" }] }).canApply, false);

const reference = Date.parse("2026-09-08T12:00:00Z");
assert.equal(stockState({ supplier_inventory: null, last_supplier_verified: "" }, reference).key, "unverified");
assert.equal(stockState({ supplier_inventory: 4, last_supplier_verified: "2026-08-20" }, reference).key, "stale");
assert.equal(stockState({ supplier_inventory: 0, last_supplier_verified: "2026-09-08" }, reference).key, "out_of_stock");
assert.equal(stockState({ supplier_inventory: 4, last_supplier_verified: "2026-09-08" }, reference).key, "in_stock");

const runtime = fs.readFileSync("site/sok-operations-runtime.js", "utf8");
for (const token of ["/stock-preview", "/stock-apply", "publicationChanged:false", "supplier_stock_verified"]) assert.match(runtime, new RegExp(token.replace("/", "\\/")));
const admin = fs.readFileSync("site/admin-sok.html", "utf8") + fs.readFileSync("site/admin-sok.js", "utf8");
for (const token of ["Supplier Stock Review", "Preview Stock Update", "Apply Verified Stock", "Download CSV Template", "No prices, public availability, checkout, or freight rules will change"]) assert.ok(admin.includes(token), `SOK stock admin missing ${token}`);
const commandCenter = fs.readFileSync("site/admin-command-center.js", "utf8");
assert.match(commandCenter, /admin-inventory.*admin-sok.*inventory/);

console.log("SOK stock workflow static gate: PASS");
