import { ensureCommerceSchema } from "./commerce-schema-migrations.js";

const DEFAULT_ADMIN_EMAIL = "elevationupscales@gmail.com";
const MAX_CSV_BYTES = 2_000_000;
const MAX_IMPORT_ROWS = 1_000;
const JSON_HEADERS = Object.freeze({
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
});

export const COMMERCE_INTAKE_PLATFORMS = Object.freeze([
  {
    id: "doba",
    name: "Doba",
    role: "supplier_source",
    roleLabel: "Primary Supplier Source",
    operatingMode: "CSV source-of-truth + review-only URL intake",
    priority: "Primary inventory source for TikTok Shop and eBay",
    csvRoute: "/admin-channels#doba-csv-sync",
    csvManagedElsewhere: true,
    urlHints: ["doba.com"],
  },
  {
    id: "cj",
    name: "CJ Dropshipping",
    role: "supplier_source",
    roleLabel: "Dropshipping Supplier",
    operatingMode: "CSV or product URL intake — review only",
    priority: "Secondary supplier source; never overwrites Doba truth",
    urlHints: ["cjdropshipping.com", "cjdropshipping.cn"],
  },
  {
    id: "sok",
    name: "SOK Energy",
    role: "supplier_source",
    roleLabel: "Authorized Battery Supplier",
    operatingMode: "CSV or product URL intake — SOK review gates apply",
    priority: "Lithium/SOK SOP, MAP, availability, and freight controls remain authoritative",
    urlHints: ["sokbattery.com"],
  },
  {
    id: "fourthwall",
    name: "Fourthwall",
    role: "hybrid_store_provider",
    roleLabel: "Storefront + Fulfillment Provider",
    operatingMode: "Existing monitor where configured; CSV/URL intake for reconciliation",
    priority: "Provider-managed apparel and merchandise",
    urlHints: ["fourthwall.com"],
  },
  {
    id: "printful",
    name: "Printful",
    role: "fulfillment_provider",
    roleLabel: "Print-on-Demand Provider",
    operatingMode: "CSV or product URL intake — review only",
    priority: "Production and fulfillment mapping; not a sales channel",
    urlHints: ["printful.com"],
  },
  {
    id: "spreadconnect",
    name: "SpreadConnect",
    role: "fulfillment_provider",
    roleLabel: "Print-on-Demand Provider",
    operatingMode: "CSV or product URL intake — review only",
    priority: "Production and fulfillment mapping; not a sales channel",
    urlHints: ["spreadconnect.app", "spreadshirt.com", "spreadshop.com"],
  },
  {
    id: "shopify",
    name: "Shopify",
    role: "sales_channel",
    roleLabel: "Storefront / Sales Channel",
    operatingMode: "CSV or product URL intake — draft/reconciliation only",
    priority: "Dropship-first storefront; current Shopify manager controls still apply",
    urlHints: ["shopify.com", "myshopify.com"],
  },
  {
    id: "ebay",
    name: "eBay",
    role: "sales_channel",
    roleLabel: "Marketplace Sales Channel",
    operatingMode: "CSV or listing URL intake — external listing review",
    priority: "Doba is the primary supplier source for current eBay inventory",
    urlHints: ["ebay.com"],
  },
  {
    id: "tiktok",
    name: "TikTok Shop",
    role: "sales_channel",
    roleLabel: "Marketplace Sales Channel",
    operatingMode: "CSV or product URL intake — external listing review",
    priority: "Doba is the primary supplier source for current TikTok inventory",
    urlHints: ["tiktok.com", "seller-us.tiktok.com"],
  },
]);

const CANONICAL_HEADERS = Object.freeze([
  "external_id",
  "sku",
  "title",
  "product_url",
  "price",
  "cost",
  "quantity",
  "status",
  "image_url",
  "fulfillment_provider",
  "sales_channel",
  "destination_support",
  "notes",
]);

const FIELD_ALIASES = Object.freeze({
  externalId: ["external_id", "external id", "item id", "item number", "item no", "product id", "listing id", "variant id", "spu no"],
  sku: ["sku", "sku code", "seller sku", "supplier sku", "variant sku", "merchant sku"],
  title: ["title", "product title", "product name", "name", "item title"],
  productUrl: ["product_url", "product url", "source url", "listing url", "item url", "url", "product link"],
  price: ["price", "retail price", "selling price", "sale price", "dropshipping price (us$)", "variant price"],
  cost: ["cost", "supplier cost", "base cost", "unit cost", "product cost"],
  quantity: ["quantity", "qty", "inventory", "inventory qty", "stock", "available quantity"],
  status: ["status", "listing status", "product status", "availability"],
  imageUrl: ["image_url", "image url", "image", "main image", "primary image", "picture url"],
  fulfillmentProvider: ["fulfillment_provider", "fulfillment provider", "provider", "vendor", "supplier"],
  salesChannel: ["sales_channel", "sales channel", "channel", "marketplace", "store"],
  destinationSupport: ["destination_support", "destination support", "ship to", "shipping regions", "markets"],
  notes: ["notes", "note", "review notes", "description"],
});

const clean = (value, max = 1_000) => String(value ?? "").trim().slice(0, max);
const now = () => new Date().toISOString();
const uid = (prefix) => `${prefix}-${crypto.randomUUID()}`;
const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...headers } });

function cookie(request, name) {
  for (const part of String(request.headers.get("Cookie") || "").split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return "";
}

function base64UrlToString(value) {
  const normalized = String(value || "").replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - (String(value || "").length % 4)) % 4);
  const binary = atob(normalized);
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function hmac(secret, payload) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return bytesToBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))));
}

function timingSafe(a, b) {
  const left = new TextEncoder().encode(String(a ?? ""));
  const right = new TextEncoder().encode(String(b ?? ""));
  if (left.byteLength !== right.byteLength) return false;
  let diff = 0;
  for (let index = 0; index < left.byteLength; index += 1) diff |= left[index] ^ right[index];
  return diff === 0;
}

async function requireAdmin(request, env) {
  const token = cookie(request, "eus_admin_session");
  const secret = clean(env?.ADMIN_SESSION_SECRET, 500);
  const adminEmail = clean(env?.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL, 180).toLowerCase();
  if (!token || !secret) return { response: json({ error: "Admin login required" }, 401) };
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra || !timingSafe(signature, await hmac(secret, payload))) return { response: json({ error: "Admin login required" }, 401) };
  try {
    const data = JSON.parse(base64UrlToString(payload));
    if (!data?.email || Number(data.exp) < Date.now() || String(data.email).toLowerCase() !== adminEmail) throw new Error("expired");
    return { session: { email: adminEmail } };
  } catch (_) {
    return { response: json({ error: "Admin login required" }, 401) };
  }
}

function sameOrigin(request) {
  const origin = clean(request.headers.get("Origin"), 500);
  if (!origin) return true;
  try { return origin === new URL(request.url).origin; } catch (_) { return false; }
}

function headerKey(value) {
  return clean(value, 240).replace(/^\uFEFF/, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
}

function parseCsv(text) {
  const input = String(text ?? "").replace(/^\uFEFF/, "");
  if (!input.trim()) throw new Error("CSV file is empty");
  if (new TextEncoder().encode(input).byteLength > MAX_CSV_BYTES) throw new Error("CSV exceeds the 2 MB intake limit");
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (quoted) {
      if (char === '"') {
        if (input[index + 1] === '"') { cell += '"'; index += 1; } else quoted = false;
      } else cell += char;
      continue;
    }
    if (char === '"') { quoted = true; continue; }
    if (char === ",") { row.push(cell); cell = ""; continue; }
    if (char === "\n" || char === "\r") {
      if (char === "\r" && input[index + 1] === "\n") index += 1;
      row.push(cell); cell = "";
      if (row.some((value) => clean(value))) rows.push(row);
      row = [];
      if (rows.length > MAX_IMPORT_ROWS + 1) throw new Error(`CSV exceeds the ${MAX_IMPORT_ROWS}-row intake limit`);
      continue;
    }
    cell += char;
  }
  row.push(cell);
  if (row.some((value) => clean(value))) rows.push(row);
  if (rows.length < 2) throw new Error("CSV must contain a header row and at least one product row");
  return { headers: rows.shift().map((value) => clean(value, 240)), rows };
}

function indexHeaders(headers) {
  const map = new Map();
  headers.forEach((header, index) => {
    const key = headerKey(header);
    if (key && !map.has(key)) map.set(key, index);
  });
  return map;
}

function valueFor(row, headerMap, aliases) {
  for (const alias of aliases) {
    const index = headerMap.get(headerKey(alias));
    if (index !== undefined) return clean(row[index], 12_000);
  }
  return "";
}

function cents(value) {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number.parseFloat(String(value).replace(/[$,\s]/g, ""));
  return Number.isFinite(number) && number >= 0 ? Math.round(number * 100) : null;
}

function integer(value) {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number.parseInt(String(value).replace(/[^0-9-]/g, ""), 10);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function validUrl(value) {
  try {
    const parsed = new URL(clean(value, 2_000));
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.toString() : "";
  } catch (_) {
    return "";
  }
}

function platformById(id) {
  return COMMERCE_INTAKE_PLATFORMS.find((platform) => platform.id === clean(id, 40).toLowerCase()) || null;
}

function urlDomainWarning(platform, url) {
  if (!url || !platform.urlHints?.length) return "";
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return platform.urlHints.some((hint) => hostname === hint || hostname.endsWith(`.${hint}`)) ? "" : `URL domain does not match the usual ${platform.name} domain; verify before mapping.`;
  } catch (_) {
    return "Invalid product URL";
  }
}

function normalizeCsvRows(platform, csvText) {
  const parsed = parseCsv(csvText);
  const headerMap = indexHeaders(parsed.headers);
  const recognized = Object.entries(FIELD_ALIASES).filter(([, aliases]) => aliases.some((alias) => headerMap.has(headerKey(alias)))).map(([field]) => field);
  if (!recognized.some((field) => ["externalId", "sku", "productUrl"].includes(field))) throw new Error("CSV needs at least one identifier column: external_id, SKU, or product URL");
  const rows = parsed.rows.slice(0, MAX_IMPORT_ROWS).map((record, index) => {
    const rawUrl = valueFor(record, headerMap, FIELD_ALIASES.productUrl);
    const productUrl = validUrl(rawUrl);
    const sku = valueFor(record, headerMap, FIELD_ALIASES.sku);
    const externalId = valueFor(record, headerMap, FIELD_ALIASES.externalId) || sku || productUrl;
    const title = valueFor(record, headerMap, FIELD_ALIASES.title) || `${platform.name} product requiring review`;
    const warnings = [];
    if (rawUrl && !productUrl) warnings.push("Product URL is invalid");
    const domainWarning = urlDomainWarning(platform, productUrl);
    if (domainWarning) warnings.push(domainWarning);
    if (!externalId) warnings.push("Missing external ID, SKU, and product URL");
    return {
      rowIndex: index + 2,
      externalId: clean(externalId, 300),
      sku: clean(sku, 180),
      title: clean(title, 300),
      productUrl,
      priceCents: cents(valueFor(record, headerMap, FIELD_ALIASES.price)),
      costCents: cents(valueFor(record, headerMap, FIELD_ALIASES.cost)),
      quantity: integer(valueFor(record, headerMap, FIELD_ALIASES.quantity)),
      status: clean(valueFor(record, headerMap, FIELD_ALIASES.status), 80),
      imageUrl: validUrl(valueFor(record, headerMap, FIELD_ALIASES.imageUrl)),
      fulfillmentProvider: clean(valueFor(record, headerMap, FIELD_ALIASES.fulfillmentProvider), 100),
      salesChannel: clean(valueFor(record, headerMap, FIELD_ALIASES.salesChannel), 100),
      destinationSupport: clean(valueFor(record, headerMap, FIELD_ALIASES.destinationSupport), 300),
      notes: clean(valueFor(record, headerMap, FIELD_ALIASES.notes), 2_000),
      warnings,
      valid: Boolean(externalId) && !warnings.includes("Product URL is invalid"),
    };
  });
  return { headers: parsed.headers, recognized, rows };
}

function normalizeUrlRow(platform, raw) {
  const productUrl = validUrl(raw.productUrl);
  if (!productUrl) throw new Error("Enter a valid http(s) product or listing URL");
  const externalId = clean(raw.externalId, 300) || clean(raw.sku, 180) || productUrl;
  const warning = urlDomainWarning(platform, productUrl);
  return {
    rowIndex: 1,
    externalId,
    sku: clean(raw.sku, 180),
    title: clean(raw.title, 300) || `${platform.name} product requiring review`,
    productUrl,
    priceCents: cents(raw.price),
    costCents: cents(raw.cost),
    quantity: integer(raw.quantity),
    status: clean(raw.status, 80),
    imageUrl: validUrl(raw.imageUrl),
    fulfillmentProvider: clean(raw.fulfillmentProvider, 100),
    salesChannel: clean(raw.salesChannel, 100),
    destinationSupport: clean(raw.destinationSupport, 300),
    notes: clean(raw.notes, 2_000),
    warnings: warning ? [warning] : [],
    valid: true,
  };
}

export function previewCommerceIntake(raw = {}) {
  const platform = platformById(raw.platform);
  if (!platform) throw new Error("Choose a supported commerce platform");
  const inputMode = clean(raw.inputMode, 20).toLowerCase() === "url" ? "url" : "csv";
  if (platform.id === "doba" && inputMode === "csv") {
    return {
      platform,
      inputMode,
      redirect: platform.csvRoute,
      rows: [],
      validCount: 0,
      reviewCount: 0,
      errorCount: 0,
      message: "Use the existing Doba CSV Sync for supplier source-of-truth files. It has the required cost, SKU, stock, and safe preview/apply controls.",
    };
  }
  const normalized = inputMode === "csv" ? normalizeCsvRows(platform, raw.csvText) : { headers: [], recognized: [], rows: [normalizeUrlRow(platform, raw)] };
  const validCount = normalized.rows.filter((row) => row.valid).length;
  return {
    platform,
    inputMode,
    fileName: clean(raw.fileName, 240),
    headers: normalized.headers,
    recognized: normalized.recognized,
    rows: normalized.rows,
    validCount,
    reviewCount: normalized.rows.filter((row) => row.warnings.length).length,
    errorCount: normalized.rows.length - validCount,
    message: "Preview only. No Catalog, supplier source, listing, inventory, price, order, or channel record has changed.",
  };
}

function candidateView(row) {
  let metadata = {};
  try { metadata = JSON.parse(row.metadata_json || "{}"); } catch (_) {}
  return {
    id: row.id,
    platform: row.source_type,
    externalId: row.external_id,
    sku: row.sku,
    title: row.title,
    priceCents: row.price_cents,
    imageUrl: row.image_url,
    productUrl: row.source_url,
    classification: row.classification,
    blocker: row.blocker,
    matchedCatalogProductId: row.matched_catalog_product_id,
    updatedAt: row.updated_at,
    metadata,
  };
}

async function snapshot(db) {
  const candidates = await db.prepare("SELECT * FROM eus_recovery_candidates WHERE metadata_json LIKE '%\"intakeVersion\":\"1\"%' AND ignored=0 ORDER BY updated_at DESC LIMIT 250").all();
  const runs = await db.prepare("SELECT * FROM eus_sync_runs WHERE mode IN ('commerce_csv_intake','commerce_url_intake') ORDER BY started_at DESC LIMIT 50").all();
  return {
    platforms: COMMERCE_INTAKE_PLATFORMS.map((platform) => ({ ...platform, templateHeaders: CANONICAL_HEADERS })),
    candidates: (candidates.results || []).map(candidateView),
    runs: runs.results || [],
    controls: {
      autoPublish: false,
      autoInventoryWrite: false,
      autoPriceWrite: false,
      dobaPrimaryFor: ["ebay", "tiktok"],
      databaseMigrationRequired: false,
    },
    generatedAt: now(),
  };
}

async function applyIntake(db, raw, adminEmail) {
  const preview = previewCommerceIntake(raw);
  if (preview.redirect) return { ...preview, applied: false };
  if (!preview.rows.length || preview.validCount === 0) throw new Error("No valid intake rows are available to stage");
  const stamp = now();
  const runId = uid("commerce-intake");
  const mode = preview.inputMode === "url" ? "commerce_url_intake" : "commerce_csv_intake";
  await db.prepare(`INSERT INTO eus_sync_runs(id,target,trigger,mode,started_at,completed_at,status,discovered_count,matched_count,changed_count,updated_count,review_count,error_count,cursor_reference,error_summary)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(runId, preview.platform.id, "manual", mode, stamp, null, "INTAKE APPLYING", preview.rows.length, 0, 0, 0, preview.rows.length, preview.errorCount, clean(preview.fileName || preview.inputMode, 240), "").run();
  let statements = [];
  let staged = 0;
  try {
    for (const row of preview.rows.filter((item) => item.valid)) {
      const id = `intake-${preview.platform.id}-${await shortHash(row.externalId)}`;
      const metadata = {
        intakeVersion: "1",
        platformRole: preview.platform.role,
        roleLabel: preview.platform.roleLabel,
        inputMode: preview.inputMode,
        sourceFile: preview.fileName,
        costCents: row.costCents,
        quantity: row.quantity,
        status: row.status,
        fulfillmentProvider: row.fulfillmentProvider,
        salesChannel: row.salesChannel,
        destinationSupport: row.destinationSupport,
        notes: row.notes,
        warnings: row.warnings,
        runId,
        stagedBy: adminEmail,
        stagedAt: stamp,
      };
      const blocker = row.warnings.length ? `INTAKE REVIEW: ${row.warnings.join("; ")}` : "INTAKE REVIEW: map to the existing Catalog product or create a controlled draft. No automatic publication.";
      statements.push(db.prepare(`INSERT INTO eus_recovery_candidates(id,source_type,external_id,sku,title,price_cents,image_url,source_url,classification,matched_catalog_product_id,blocker,ignored,metadata_json,created_at,updated_at)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(source_type,external_id) DO UPDATE SET sku=excluded.sku,title=excluded.title,price_cents=excluded.price_cents,image_url=excluded.image_url,source_url=excluded.source_url,classification=excluded.classification,blocker=excluded.blocker,ignored=0,metadata_json=excluded.metadata_json,updated_at=excluded.updated_at`)
        .bind(id, preview.platform.id, row.externalId, row.sku, row.title, row.priceCents, row.imageUrl, row.productUrl, "INTAKE / REVIEW", "", blocker, 0, JSON.stringify(metadata), stamp, stamp));
      statements.push(db.prepare("INSERT INTO eus_sync_item_events(id,run_id,catalog_product_id,sku,channel,event_type,status,details_json,created_at) VALUES(?,?,?,?,?,?,?,?,?)")
        .bind(uid("intake-event"), runId, "", row.sku, preview.platform.id, "commerce_intake_staged", "REVIEW", JSON.stringify({ candidateId: id, externalId: row.externalId, platformRole: preview.platform.role }), stamp));
      staged += 1;
      if (statements.length >= 80) {
        await db.batch(statements);
        statements = [];
      }
    }
    if (statements.length) await db.batch(statements);
    await db.prepare("UPDATE eus_sync_runs SET completed_at=?,status='INTAKE STAGED',updated_count=?,error_summary=? WHERE id=?")
      .bind(now(), staged, preview.errorCount ? `${preview.errorCount} row(s) require correction` : "", runId).run();
  } catch (error) {
    await db.prepare("UPDATE eus_sync_runs SET completed_at=?,status='INTAKE FAILED',updated_count=?,error_count=error_count+1,error_summary=? WHERE id=?")
      .bind(now(), staged, clean(error?.message, 500) || "Commerce intake failed", runId).run().catch(() => null);
    throw error;
  }
  return { applied: true, staged, runId, preview };
}

async function shortHash(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value)));
  return [...new Uint8Array(digest)].slice(0, 10).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function handleCommerceIntakeAdminApi(request, env, pathname) {
  if (pathname !== "/api/admin/commerce-intake") return json({ error: "Commerce intake endpoint not found" }, 404);
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  let db;
  try { db = await ensureCommerceSchema(env); } catch (error) { return json({ error: clean(error?.message, 300) || "Commerce storage is not configured" }, 503); }
  if (request.method === "GET") return json(await snapshot(db));
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "GET, POST" });
  if (!sameOrigin(request)) return json({ error: "Cross-origin request denied" }, 403);
  const raw = await request.json().catch(() => ({}));
  const action = clean(raw.action, 30).toLowerCase();
  try {
    if (action === "preview") return json(previewCommerceIntake(raw));
    if (action === "apply") return json({ ok: true, ...(await applyIntake(db, raw, auth.session.email)), snapshot: await snapshot(db) });
    return json({ error: "Unknown commerce intake action" }, 400);
  } catch (error) {
    return json({ error: clean(error?.message, 700) || "Commerce intake failed" }, 400);
  }
}
