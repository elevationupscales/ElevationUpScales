import assert from "node:assert/strict";
import test from "node:test";
import {
  SOK_STOCK_TEMPLATE, buildStockPreview, digestPreview, executeStockMutations, parseStockText, planStockApply,
  stockAccessDecision, stockFreshness, validateStockRows
} from "../site/sok-stock-intake-core.js";

const roster = [
  { sku:"SKU-A", supplier_sku:"SKU-A", model:"SKU-A", supplier_inventory:null, last_supplier_verified:"", updated_at:"2026-09-01T00:00:00Z" },
  { sku:"SKU-B", supplier_sku:"SKU-B", model:"SKU-B", supplier_inventory:4, last_supplier_verified:"2026-09-07", updated_at:"2026-09-07T12:00:00Z" },
];

test("unauthorized preview/apply policy rejects and cross-origin mutation rejects", () => {
  assert.equal(stockAccessDecision({authenticated:false}).status, 401);
  assert.equal(stockAccessDecision({authenticated:true, mutation:true, sameOrigin:false}).status, 403);
  assert.equal(stockAccessDecision({authenticated:true, mutation:true, sameOrigin:true}).ok, true);
});

test("template and parser preserve blank quantity as unknown and zero as zero", () => {
  const parsed = parseStockText(`${SOK_STOCK_TEMPLATE}SKU-A,,2026-09-08\nSKU-B,0,2026-09-08\n`);
  const valid = validateStockRows(parsed.rows, roster, {today:"2026-09-08"});
  assert.equal(valid[0].supplierQuantity, null);
  assert.equal(valid[1].supplierQuantity, 0);
  assert.deepEqual(valid.flatMap(r=>r.errors), []);
});

test("bounded input rejects oversized payloads", () => {
  const parsed = parseStockText(`${SOK_STOCK_TEMPLATE}${"X".repeat(64)}`, {maxBytes:32});
  assert.equal(parsed.rows.length, 0);
  assert.match(parsed.errors[0], /exceeds 32 bytes/);
});

test("unknown, duplicate, negative, fractional and future evidence are rejected", () => {
  const parsed = parseStockText(`${SOK_STOCK_TEMPLATE}NOPE,1,2026-09-08\nSKU-A,1,2026-09-08\nSKU-A,-1,2026-09-08\nSKU-B,1.5,2026-09-09\n`);
  const rows = validateStockRows(parsed.rows, roster, {today:"2026-09-08"});
  assert.match(rows[0].errors.join(" "), /current approved SOK roster/);
  assert.match(rows[2].errors.join(" "), /Duplicate|nonnegative/);
  assert.match(rows[3].errors.join(" "), /whole number|future/);
});

test("preview is pure and partial omissions do not synthesize mutations", async () => {
  const original = structuredClone(roster);
  const parsed = parseStockText(`${SOK_STOCK_TEMPLATE}SKU-A,3,2026-09-08\n`);
  const valid = validateStockRows(parsed.rows, roster, {today:"2026-09-08"});
  const preview = buildStockPreview(valid, roster);
  assert.deepEqual(roster, original);
  assert.equal(preview.length, 1);
  const id = await digestPreview(preview, roster);
  const plan = planStockApply(preview, roster, {previewId:id});
  assert.deepEqual(plan.mutations.map(x=>x.sku), ["SKU-A"]);
  assert.equal(plan.mutations.some(x=>x.sku==="SKU-B"), false);
});

test("same-date conflict and older evidence cannot overwrite newer data", () => {
  const conflicting = buildStockPreview(validateStockRows([{sku:"SKU-B",supplierQuantity:"5",verifiedDate:"2026-09-07"}], roster, {today:"2026-09-08"}), roster);
  assert.match(conflicting[0].errors.join(" "), /Conflicting/);
  const older = buildStockPreview(validateStockRows([{sku:"SKU-B",supplierQuantity:"5",verifiedDate:"2026-09-06"}], roster, {today:"2026-09-08"}), roster);
  assert.match(older[0].errors.join(" "), /Older evidence/);
});

test("repeated apply is idempotent and stale state changes alter preview digest", async () => {
  const rows = buildStockPreview(validateStockRows([{sku:"SKU-A",supplierQuantity:"2",verifiedDate:"2026-09-08"}], roster, {today:"2026-09-08"}), roster);
  const id = await digestPreview(rows, roster);
  assert.equal(planStockApply(rows, roster, {previewId:id,seenImportIds:new Set([id])}).duplicate, true);
  const newer = structuredClone(roster); newer[0].updated_at = "2026-09-08T01:00:00Z";
  assert.notEqual(await digestPreview(rows, newer), id);
});

test("freshness distinguishes unknown, verified zero, current and stale", () => {
  assert.equal(stockFreshness({supplier_inventory:null,last_supplier_verified:"2026-09-08"},{today:"2026-09-08"}).key,"UNVERIFIED");
  assert.equal(stockFreshness({supplier_inventory:0,last_supplier_verified:"2026-09-08"},{today:"2026-09-08"}).key,"CURRENT_ZERO");
  assert.equal(stockFreshness({supplier_inventory:2,last_supplier_verified:"2026-09-08"},{today:"2026-09-08"}).key,"CURRENT");
  assert.equal(stockFreshness({supplier_inventory:2,last_supplier_verified:"2026-08-30"},{today:"2026-09-08"}).key,"STALE");
});

test("partial write failure yields an accurate retry-safe result", async () => {
  const rows = buildStockPreview(validateStockRows([
    {sku:"SKU-A",supplierQuantity:"2",verifiedDate:"2026-09-08"},
    {sku:"SKU-B",supplierQuantity:"5",verifiedDate:"2026-09-08"}
  ], roster, {today:"2026-09-08"}), roster);
  const plan = planStockApply(rows, roster);
  const result = await executeStockMutations(plan, async (mutation) => mutation.sku === "SKU-A" ? {changes:1} : {changes:0});
  assert.equal(result.status, "PARTIAL");
  assert.deepEqual(result.applied.map(x=>x.sku), ["SKU-A"]);
  assert.deepEqual(result.rejected, [{sku:"SKU-B",reason:"STALE_ROW"}]);
});
