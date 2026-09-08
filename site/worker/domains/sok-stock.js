import {
  SOK_STOCK_MAX_BYTES, SOK_STOCK_TEMPLATE, buildStockPreview, digestPreview,
  parseStockText, planStockApply, executeStockMutations, stockAccessDecision, stockFreshness, validateStockRows
} from "../../sok-stock-intake-core.js";
import { cleanString, jsonResponse, readAdminSession, readLimitedJson, sameOriginRequest } from "../core-context.js";

const MAX_BODY_BYTES = SOK_STOCK_MAX_BYTES + 64 * 1024;
const clean = (value, max = 500) => cleanString(value, max);
const upper = (value, max = 120) => clean(value, max).toUpperCase();
const now = () => new Date().toISOString();

function dbFor(env) {
  const db = env?.MARKETPLACE_DB;
  if (!db || typeof db.prepare !== "function") throw new Error("SOK stock storage is not configured");
  return db;
}

async function currentRoster(db) {
  const result = await db.prepare(`SELECT sku,supplier_sku,model,public_name,catalog_product_id,exact_sku_check,supplier_inventory,last_supplier_verified,updated_at,updated_by
    FROM eus_sok_product_ops
    WHERE upper(exact_sku_check)='PASS'
    ORDER BY public_name COLLATE NOCASE, sku COLLATE NOCASE`).all();
  return (result.results || []).filter((row) => {
    const sku = upper(row.sku);
    return sku && upper(row.supplier_sku) === sku && upper(row.model) === sku;
  });
}

function privateView(row, today) {
  const freshness = stockFreshness(row, { today });
  return {
    sku: upper(row.sku),
    model: upper(row.model),
    name: clean(row.public_name, 240),
    supplierQuantity: row.supplier_inventory === null || row.supplier_inventory === undefined ? null : Number(row.supplier_inventory),
    verificationDate: clean(row.last_supplier_verified, 80).slice(0, 10) || null,
    freshness,
    updatedAt: clean(row.updated_at, 80) || null,
  };
}

function templateFor(roster) {
  return `${SOK_STOCK_TEMPLATE}${roster.map((row) => `${upper(row.sku)},,`).join("\n")}${roster.length ? "\n" : ""}`;
}

async function priorReceipt(db, previewId) {
  if (!previewId) return null;
  const row = await db.prepare(`SELECT details_json,created_at FROM eus_sok_events
    WHERE entity_type='stock_import' AND entity_id=? AND action='stock_import_applied'
    ORDER BY created_at DESC LIMIT 1`).bind(previewId).first();
  if (!row) return null;
  try { return { ...JSON.parse(row.details_json || "{}"), duplicate: true, originalCreatedAt: row.created_at }; }
  catch (_) { return { previewId, duplicate: true, status: "APPLIED", originalCreatedAt: row.created_at }; }
}

async function stockSnapshot(db) {
  const roster = await currentRoster(db);
  const today = new Date().toISOString().slice(0, 10);
  const products = roster.map((row) => privateView(row, today));
  const counts = products.reduce((acc, product) => { acc.total += 1; acc[product.freshness.key] = (acc[product.freshness.key] || 0) + 1; return acc; }, { total: 0 });
  return {
    products,
    counts,
    policy: {
      supplierStockOnly: true,
      physicalOnHandUntouched: true,
      checkoutUntouched: true,
      publicAvailabilityUntouched: true,
      freshnessDays: 7,
    },
  };
}

async function previewImport(request, db) {
  const parsed = await readLimitedJson(request, MAX_BODY_BYTES);
  if (parsed.error === "too_large") return jsonResponse({ error: "Stock import request is too large" }, 413);
  if (parsed.error) return jsonResponse({ error: "Invalid stock import request" }, 400);
  const text = String(parsed.value?.text ?? "");
  const input = parseStockText(text);
  if (input.errors.length) return jsonResponse({ error: input.errors[0], rowErrors: input.errors }, 400);
  const roster = await currentRoster(db);
  const validated = validateStockRows(input.rows, roster);
  const preview = buildStockPreview(validated, roster);
  const previewId = await digestPreview(preview, roster);
  const errorCount = preview.filter((row) => row.errors.length).length;
  return jsonResponse({
    previewId,
    canApply: preview.length > 0 && errorCount === 0,
    summary: { rows: preview.length, ready: preview.filter((row) => row.state === "READY").length, unchanged: preview.filter((row) => row.state === "UNCHANGED").length, errors: errorCount },
    rows: preview,
    note: "Preview only. No SOK stock fields were written.",
  });
}

async function applyImport(request, db, adminEmail) {
  const parsed = await readLimitedJson(request, MAX_BODY_BYTES);
  if (parsed.error === "too_large") return jsonResponse({ error: "Stock apply request is too large" }, 413);
  if (parsed.error) return jsonResponse({ error: "Invalid stock apply request" }, 400);
  const raw = parsed.value || {};
  if (raw.confirm !== true) return jsonResponse({ error: "Explicit confirmation is required" }, 400);
  const previewId = clean(raw.previewId, 128);
  if (!/^[a-f0-9]{64}$/.test(previewId)) return jsonResponse({ error: "Invalid preview receipt" }, 400);

  const duplicate = await priorReceipt(db, previewId);
  if (duplicate) return jsonResponse({ receipt: duplicate, snapshot: await stockSnapshot(db) });

  const roster = await currentRoster(db);
  const submitted = Array.isArray(raw.rows) ? raw.rows.map((row, index) => ({
    line: Number(row?.line) || index + 2,
    sku: row?.sku,
    supplierQuantity: row?.supplierQuantity === null ? "" : row?.supplierQuantity,
    verifiedDate: row?.verifiedDate,
  })) : [];
  const validated = validateStockRows(submitted, roster);
  const preview = buildStockPreview(validated, roster);
  const rowErrors = preview.filter((row) => row.errors.length);
  if (!preview.length) return jsonResponse({ error: "No stock rows were supplied" }, 400);
  if (rowErrors.length) return jsonResponse({ error: "Stock rows must be corrected and previewed again", rows: preview }, 409);

  const currentPreviewId = await digestPreview(preview, roster);
  if (currentPreviewId !== previewId) return jsonResponse({ error: "Preview is stale. Refresh and preview the stock changes again.", code: "STALE_PREVIEW" }, 409);

  const plan = planStockApply(preview, roster, { previewId });
  if (plan.rejected.length) return jsonResponse({ error: "Stock evidence changed. Preview again before applying.", code: "REVALIDATION_FAILED", rejected: plan.rejected }, 409);

  const stamp = now();
  const execution = await executeStockMutations(plan, async (mutation) => {
    const eventId = `SOK-EVT-${crypto.randomUUID()}`;
    const details = JSON.stringify({ previewId, supplierQuantity: mutation.supplierQuantity, verifiedDate: mutation.verifiedDate, fields: ["supplier_inventory", "last_supplier_verified"] });
    const statements = [
      db.prepare(`UPDATE eus_sok_product_ops
        SET supplier_inventory=?,last_supplier_verified=?,updated_at=?,updated_by=?
        WHERE upper(sku)=? AND updated_at=?
          AND (last_supplier_verified='' OR substr(last_supplier_verified,1,10)<=?)`)
        .bind(mutation.supplierQuantity, mutation.verifiedDate, stamp, adminEmail, mutation.sku, mutation.expectedUpdatedAt, mutation.verifiedDate),
      db.prepare(`INSERT INTO eus_sok_events (id,entity_type,entity_id,action,details_json,actor,created_at)
        SELECT ?,?,?,?,?,?,? WHERE changes()=1`)
        .bind(eventId, "product", mutation.sku, "supplier_stock_verified", details, adminEmail, stamp),
    ];
    const [result] = await db.batch(statements);
    return result;
  });

  const applied = execution.applied.map(({ sku, supplierQuantity, verifiedDate }) => ({ sku, supplierQuantity, verifiedDate }));
  const rejected = execution.rejected;
  const unchanged = preview.filter((row) => row.state === "UNCHANGED").map((row) => row.sku);
  const status = execution.status;
  const receipt = { previewId, status, applied, rejected, unchanged, createdAt: stamp, actor: adminEmail };
  await db.prepare(`INSERT INTO eus_sok_events (id,entity_type,entity_id,action,details_json,actor,created_at)
    VALUES (?,?,?,?,?,?,?)`).bind(`SOK-EVT-${crypto.randomUUID()}`, "stock_import", previewId, "stock_import_applied", JSON.stringify(receipt), adminEmail, stamp).run();

  return jsonResponse({ receipt, snapshot: await stockSnapshot(db) }, rejected.length ? 207 : 200);
}

export async function handleSokStockAdminApi(request, env, pathname) {
  try {
    const session = await readAdminSession(request, env);
    const access = stockAccessDecision({ authenticated: Boolean(session), sameOrigin: sameOriginRequest(request), mutation: request.method !== "GET" });
    if (!access.ok) return jsonResponse({ error: access.error }, access.status);
    const db = dbFor(env);

    if (pathname === "/api/admin/sok-stock" && request.method === "GET") return jsonResponse(await stockSnapshot(db));
    if (pathname === "/api/admin/sok-stock/template" && request.method === "GET") {
      const roster = await currentRoster(db);
      return new Response(templateFor(roster), { status: 200, headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=Elevation-SOK-stock-template.csv", "Cache-Control": "no-store", "X-Content-Type-Options":"nosniff" } });
    }
    if (pathname === "/api/admin/sok-stock/preview" && request.method === "POST") return previewImport(request, db);
    if (pathname === "/api/admin/sok-stock/apply" && request.method === "POST") return applyImport(request, db, session.email);
    return jsonResponse({ error: "Not found" }, 404);
  } catch (error) {
    console.error(JSON.stringify({ event: "sok_stock_admin_error", path: pathname, message: clean(error?.message, 300) }));
    return jsonResponse({ error: "SOK stock request failed" }, 500);
  }
}

export const __sokStockRuntimeTest = { currentRoster, privateView, templateFor };
