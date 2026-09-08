export const SOK_STOCK_MAX_BYTES = 256 * 1024;
export const SOK_STOCK_MAX_ROWS = 250;
export const SOK_STOCK_FRESH_DAYS = 7;
export const SOK_STOCK_TEMPLATE = "sku,supplier_quantity,verified_date\n";

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const upper = (value, max = 120) => clean(value, max).toUpperCase();
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export function stockAccessDecision({ authenticated, sameOrigin = true, mutation = false } = {}) {
  if (!authenticated) return { ok: false, status: 401, error: "Admin login required" };
  if (mutation && !sameOrigin) return { ok: false, status: 403, error: "Cross-origin request denied" };
  return { ok: true, status: 200 };
}

export function parseCsv(text, { maxRows = SOK_STOCK_MAX_ROWS } = {}) {
  const input = String(text ?? "").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quoted) {
      if (char === '"' && input[i + 1] === '"') { field += '"'; i += 1; continue; }
      if (char === '"') { quoted = false; continue; }
      field += char; continue;
    }
    if (char === '"') { quoted = true; continue; }
    if (char === ',') { row.push(field); field = ""; continue; }
    if (char === '\n') { row.push(field); rows.push(row); row = []; field = ""; if (rows.length > maxRows + 1) break; continue; }
    if (char !== '\r') field += char;
  }
  if (quoted) return { rows: [], errors: ["CSV contains an unterminated quoted value"] };
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return { rows, errors: [] };
}

export function parseStockText(text, options = {}) {
  const byteLength = new TextEncoder().encode(String(text ?? "")).byteLength;
  if (byteLength > (options.maxBytes ?? SOK_STOCK_MAX_BYTES)) return { rows: [], errors: [`Input exceeds ${options.maxBytes ?? SOK_STOCK_MAX_BYTES} bytes`] };
  const parsed = parseCsv(text, options);
  if (parsed.errors.length) return parsed;
  const [header = [], ...data] = parsed.rows.filter((row) => row.some((cell) => clean(cell)));
  const normalizedHeader = header.map((cell) => clean(cell, 80).toLowerCase());
  const required = ["sku", "supplier_quantity", "verified_date"];
  if (normalizedHeader.length !== required.length || required.some((name, index) => normalizedHeader[index] !== name)) {
    return { rows: [], errors: [`Expected CSV header: ${required.join(",")}`] };
  }
  if (data.length > (options.maxRows ?? SOK_STOCK_MAX_ROWS)) return { rows: [], errors: [`Input exceeds ${options.maxRows ?? SOK_STOCK_MAX_ROWS} data rows`] };
  return { rows: data.map((cells, index) => ({ line: index + 2, sku: cells[0] ?? "", supplierQuantity: cells[1] ?? "", verifiedDate: cells[2] ?? "", extra: cells.slice(3) })), errors: [] };
}

function dateOnly(value) {
  const raw = clean(value, 20);
  if (!isoDate.test(raw)) return null;
  const parsed = new Date(`${raw}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === raw ? raw : null;
}

export function normalizedRoster(records = []) {
  const map = new Map();
  for (const record of records) {
    const sku = upper(record?.sku);
    if (!sku || upper(record?.supplier_sku) !== sku || upper(record?.model) !== sku) continue;
    map.set(sku, { ...record, sku });
  }
  return map;
}

export function validateStockRows(rows = [], rosterRecords = [], { today = new Date().toISOString().slice(0, 10) } = {}) {
  const roster = normalizedRoster(rosterRecords);
  const seen = new Set();
  const validated = [];
  for (const raw of rows) {
    const sku = upper(raw?.sku);
    const errors = [];
    if (!sku) errors.push("SKU is required");
    else if (!roster.has(sku)) errors.push("SKU is not in the current approved SOK roster");
    if (seen.has(sku) && sku) errors.push("Duplicate SKU in import");
    if (sku) seen.add(sku);

    const quantityRaw = clean(raw?.supplierQuantity, 40);
    let supplierQuantity = null;
    if (quantityRaw !== "") {
      if (!/^\d+$/.test(quantityRaw)) errors.push("Supplier quantity must be a nonnegative whole number or blank");
      else {
        supplierQuantity = Number(quantityRaw);
        if (!Number.isSafeInteger(supplierQuantity)) errors.push("Supplier quantity is too large");
      }
    }

    const verifiedDate = dateOnly(raw?.verifiedDate);
    if (!verifiedDate) errors.push("Verification date must use YYYY-MM-DD");
    else if (verifiedDate > today) errors.push("Verification date cannot be in the future");
    if (Array.isArray(raw?.extra) && raw.extra.some((value) => clean(value))) errors.push("Unexpected extra column value");

    validated.push({ line: Number(raw?.line) || 0, sku, supplierQuantity, verifiedDate: verifiedDate || clean(raw?.verifiedDate, 20), errors });
  }
  return validated;
}

export function stockFreshness(record, { today = new Date().toISOString().slice(0, 10), freshDays = SOK_STOCK_FRESH_DAYS } = {}) {
  const qty = record?.supplier_inventory;
  const date = dateOnly(record?.last_supplier_verified);
  if (qty === null || qty === undefined || qty === "" || !date) return { key: "UNVERIFIED", label: "Unverified", nextAction: "Verify supplier quantity" };
  const ageDays = Math.floor((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) / 86400000);
  if (!Number.isFinite(ageDays) || ageDays < 0) return { key: "UNVERIFIED", label: "Unverified", nextAction: "Verify supplier quantity" };
  if (ageDays > freshDays) return { key: "STALE", label: "Stale", ageDays, nextAction: "Reverify with SOK" };
  if (Number(qty) === 0) return { key: "CURRENT_ZERO", label: "Current · zero verified", ageDays, nextAction: "Keep purchase mode separate; recheck before fulfillment" };
  return { key: "CURRENT", label: "Current", ageDays, nextAction: "No stock update needed" };
}

const sameQuantity = (a, b) => (a === null || a === undefined || a === "") ? (b === null || b === undefined || b === "") : Number(a) === Number(b);

export function buildStockPreview(validatedRows = [], currentRecords = [], options = {}) {
  const current = new Map(currentRecords.map((record) => [upper(record?.sku), record]));
  return validatedRows.map((row) => {
    const before = current.get(row.sku) || null;
    const errors = [...row.errors];
    if (before && row.verifiedDate && before.last_supplier_verified) {
      const existingDate = dateOnly(before.last_supplier_verified);
      if (existingDate && row.verifiedDate < existingDate) errors.push("Older evidence cannot overwrite a newer verification");
      if (existingDate && row.verifiedDate === existingDate && !sameQuantity(row.supplierQuantity, before.supplier_inventory)) errors.push("Conflicting quantity for the same verification date");
    }
    const unchanged = before && row.verifiedDate === dateOnly(before.last_supplier_verified) && sameQuantity(row.supplierQuantity, before.supplier_inventory);
    return {
      ...row,
      errors,
      state: errors.length ? "ERROR" : unchanged ? "UNCHANGED" : "READY",
      before: before ? { supplierQuantity: before.supplier_inventory ?? null, verifiedDate: dateOnly(before.last_supplier_verified) || null, updatedAt: clean(before.updated_at, 80) || null } : null,
      after: { supplierQuantity: row.supplierQuantity, verifiedDate: row.verifiedDate || null },
    };
  });
}

export function snapshotForPreview(previewRows = [], currentRecords = []) {
  const current = new Map(currentRecords.map((record) => [upper(record?.sku), record]));
  return previewRows.map((row) => {
    const record = current.get(row.sku) || {};
    return { sku: row.sku, supplierQuantity: record.supplier_inventory ?? null, verifiedDate: dateOnly(record.last_supplier_verified) || null, updatedAt: clean(record.updated_at, 80) || "" };
  });
}

export function canonicalImportRows(previewRows = []) {
  return previewRows.map((row) => ({ sku: row.sku, supplierQuantity: row.supplierQuantity, verifiedDate: row.verifiedDate }));
}

export async function digestPreview(previewRows = [], currentRecords = []) {
  const payload = JSON.stringify({ rows: canonicalImportRows(previewRows), snapshot: snapshotForPreview(previewRows, currentRecords) });
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function executeStockMutations(plan, mutate) {
  const applied = [], rejected = [...(plan?.rejected || [])];
  for (const mutation of plan?.mutations || []) {
    try {
      const result = await mutate(mutation);
      if (result === true || Number(result?.changes || result?.meta?.changes || 0) === 1) applied.push(mutation);
      else rejected.push({ sku: mutation.sku, reason: "STALE_ROW" });
    } catch (error) {
      rejected.push({ sku: mutation.sku, reason: "WRITE_FAILED", message: String(error?.message || error || "write failed").slice(0, 160) });
    }
  }
  return { applied, rejected, status: rejected.length ? (applied.length ? "PARTIAL" : "REJECTED") : "APPLIED" };
}

export function planStockApply(previewRows = [], currentRecords = [], { seenImportIds = new Set(), previewId = "" } = {}) {
  if (previewId && seenImportIds.has(previewId)) return { duplicate: true, mutations: [], rejected: [] };
  const current = new Map(currentRecords.map((record) => [upper(record?.sku), record]));
  const mutations = [], rejected = [];
  for (const row of previewRows) {
    if (row.errors?.length) { rejected.push({ sku: row.sku, reason: "VALIDATION" }); continue; }
    const record = current.get(row.sku);
    if (!record) { rejected.push({ sku: row.sku, reason: "UNKNOWN_SKU" }); continue; }
    const existingDate = dateOnly(record.last_supplier_verified);
    if (existingDate && row.verifiedDate < existingDate) { rejected.push({ sku: row.sku, reason: "OLDER_EVIDENCE" }); continue; }
    if (existingDate && row.verifiedDate === existingDate && !sameQuantity(row.supplierQuantity, record.supplier_inventory)) { rejected.push({ sku: row.sku, reason: "CONFLICTING_EVIDENCE" }); continue; }
    if (existingDate === row.verifiedDate && sameQuantity(row.supplierQuantity, record.supplier_inventory)) continue;
    mutations.push({ sku: row.sku, supplierQuantity: row.supplierQuantity, verifiedDate: row.verifiedDate, expectedUpdatedAt: clean(record.updated_at, 80) });
  }
  return { duplicate: false, mutations, rejected };
}
