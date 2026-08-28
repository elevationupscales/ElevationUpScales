const DEFAULT_ADMIN_EMAIL = "elevationupscales@gmail.com";
const REQUEST_STATES = new Set(["NEW","REVIEWING","PRODUCT MATCHED","SHIPPING RESEARCH","QUOTE READY","CUSTOMER CONTACTED","CLOSED","HOLD","CANCELLED"]);
const DOC_STATES = new Set(["UNKNOWN","REQUESTED","RECEIVED","VERIFIED","EXPIRED / RECHECK","NOT APPLICABLE"]);
const ELIGIBILITY_STATES = new Set(["NOT CHECKED","RESEARCHING","DOCS NEEDED","CARRIER QUOTE NEEDED","QUOTE RECEIVED","APPROVED","QUOTE REQUIRED","NOT ELIGIBLE","HOLD"]);
const WORKFLOW_STAGES = new Set(["PRODUCT IDENTIFIED","DOCUMENTS NEEDED","DOCUMENTS RECEIVED","FREIGHT QUOTE NEEDED","ROUTE REVIEW","APPROVED","LIVE","RECHECK / HOLD"]);
const BATCH_STATES = new Set(["BUILDING","NEEDS VOLUME","QUOTE NEEDED","QUOTE RECEIVED","DOCS REVIEW","READY TO COMMIT","CUSTOMER CONFIRMATION","BOOKED","IN TRANSIT","ARRIVED","DELIVERING","COMPLETE","HOLD","CANCELLED"]);
const PAYMENT_STATES = new Set(["UNPAID","PENDING","PAID","REFUND NEEDED","REFUNDED","CANCELLED"]);
const FULFILLMENT_STATES = new Set(["RESERVED","BATCHED","READY","SHIPPED","DELIVERING","COMPLETE","HOLD","CANCELLED"]);
const CUSTOMER_APPROVAL_STATES = new Set(["NOT REQUESTED","PENDING","APPROVED","DECLINED","ACCEPT DELAY","CANCEL / REFUND"]);
const ALLOCATION_METHODS = new Set(["equal","per-unit","weight","volume","manual"]);
const ISLANDS = new Set(["Oahu","Maui","Kauai","Hawaii Island / Big Island","Hawaii — General","Other / Confirm"]);
const USES = new Set(["RV","Solar / Off-Grid","Home Backup","Marine","Van / Mobile Power","Other"]);
const JSON_HEADERS = Object.freeze({"Cache-Control":"no-store","Content-Type":"application/json; charset=utf-8","X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","Referrer-Policy":"no-referrer"});

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const upper = (value, max = 100) => clean(value, max).toUpperCase();
const int = (value, fallback = 0) => { const n = Number.parseInt(String(value ?? ""), 10); return Number.isFinite(n) ? Math.max(0, n) : fallback; };
const nullableInt = (value) => { if (value === "" || value === null || value === undefined) return null; const n = Number.parseInt(String(value), 10); return Number.isFinite(n) && n >= 0 ? n : null; };
const num = (value) => { if (value === "" || value === null || value === undefined) return null; const n = Number(value); return Number.isFinite(n) && n >= 0 ? n : null; };
const boolInt = (value) => value === true || ["true","1","yes","y","on"].includes(clean(value, 12).toLowerCase()) ? 1 : 0;
const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...headers } });
const now = () => new Date().toISOString();
const id = (prefix) => `${prefix}-${crypto.randomUUID()}`;
const enumValue = (value, allowed, fallback) => { const v = clean(value, 80); return allowed.has(v) ? v : fallback; };

function sameOrigin(request) {
  const origin = clean(request.headers.get("Origin"), 500);
  if (!origin) return true;
  try { return origin === new URL(request.url).origin; } catch (_) { return false; }
}
function cookie(request, name) {
  const raw = request.headers.get("Cookie") || "";
  for (const part of raw.split(";")) { const [key, ...value] = part.trim().split("="); if (key === name) return decodeURIComponent(value.join("=")); }
  return "";
}
function base64UrlToString(value) {
  const normalized = String(value || "").replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - (String(value || "").length % 4)) % 4);
  const binary = atob(normalized);
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}
function bytesToBase64Url(bytes) { let binary = ""; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""); }
async function hmac(secret, payload) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return bytesToBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))));
}
function timingSafe(a, b) {
  const left = new TextEncoder().encode(String(a ?? "")); const right = new TextEncoder().encode(String(b ?? ""));
  if (left.byteLength !== right.byteLength) return false; let diff = 0; for (let i=0;i<left.byteLength;i+=1) diff |= left[i]^right[i]; return diff===0;
}
async function requireAdmin(request, env) {
  const token = cookie(request, "eus_admin_session"); const secret = clean(env?.ADMIN_SESSION_SECRET, 500); const adminEmail = clean(env?.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL, 180).toLowerCase();
  if (!token || !secret) return { response: json({ error: "Admin login required" }, 401) };
  const [payload, signature, extra] = token.split("."); if (!payload || !signature || extra) return { response: json({ error: "Admin login required" }, 401) };
  const expected = await hmac(secret, payload); if (!timingSafe(signature, expected)) return { response: json({ error: "Admin login required" }, 401) };
  try { const data = JSON.parse(base64UrlToString(payload)); if (!data?.email || Number(data.exp) < Date.now() || String(data.email).toLowerCase() !== adminEmail) throw new Error("expired"); return { session: { email: adminEmail } }; }
  catch (_) { return { response: json({ error: "Admin login required" }, 401) }; }
}

async function ensureSchema(env) {
  const db = env?.MARKETPLACE_DB;
  if (!db || typeof db.prepare !== "function") throw new Error("Hawaii Lithium Program storage is not configured");
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_hawaii_lithium_requests (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '', hawaii_zip TEXT NOT NULL,
    island TEXT NOT NULL DEFAULT 'Hawaii — General', product_interest TEXT NOT NULL DEFAULT '', quantity INTEGER NOT NULL DEFAULT 1,
    intended_use TEXT NOT NULL DEFAULT 'Other', notes TEXT NOT NULL DEFAULT '', consent INTEGER NOT NULL DEFAULT 0,
    state TEXT NOT NULL DEFAULT 'NEW', assigned_product_id TEXT NOT NULL DEFAULT '', assigned_sku TEXT NOT NULL DEFAULT '', assigned_batch_id TEXT NOT NULL DEFAULT '',
    customer_approval_state TEXT NOT NULL DEFAULT 'NOT REQUESTED', payment_state TEXT NOT NULL DEFAULT 'UNPAID', fulfillment_state TEXT NOT NULL DEFAULT 'RESERVED',
    reservation_date TEXT NOT NULL, product_subtotal_cents INTEGER NOT NULL DEFAULT 0, estimated_shipping_share_cents INTEGER, final_shipping_share_cents INTEGER,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT ''
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_hawaii_requests_state ON eus_hawaii_lithium_requests(state, created_at DESC)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_hawaii_requests_sku ON eus_hawaii_lithium_requests(assigned_sku, created_at DESC)").run();

  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_lithium_shipping_records (
    id TEXT PRIMARY KEY, catalog_product_id TEXT NOT NULL, sku TEXT NOT NULL COLLATE NOCASE, active INTEGER NOT NULL DEFAULT 1,
    supplier TEXT NOT NULL DEFAULT '', supplier_product_id TEXT NOT NULL DEFAULT '', supplier_sku TEXT NOT NULL DEFAULT '', product_title TEXT NOT NULL DEFAULT '', product_url TEXT NOT NULL DEFAULT '', store_section TEXT NOT NULL DEFAULT 'lithium-batteries',
    chemistry TEXT NOT NULL DEFAULT '', voltage TEXT NOT NULL DEFAULT '', amp_hours TEXT NOT NULL DEFAULT '', watt_hours REAL,
    battery_count_per_package INTEGER, net_battery_weight_lb REAL, gross_package_weight_lb REAL, length_in REAL, width_in REAL, height_in REAL,
    series_capability TEXT NOT NULL DEFAULT '', parallel_capability TEXT NOT NULL DEFAULT '', bms_notes TEXT NOT NULL DEFAULT '', un_number TEXT NOT NULL DEFAULT '',
    un38_status TEXT NOT NULL DEFAULT 'UNKNOWN', un38_test_summary_status TEXT NOT NULL DEFAULT 'UNKNOWN', un38_document_ref TEXT NOT NULL DEFAULT '',
    sds_status TEXT NOT NULL DEFAULT 'UNKNOWN', sds_document_ref TEXT NOT NULL DEFAULT '', manufacturer_compliance_status TEXT NOT NULL DEFAULT 'UNKNOWN', manufacturer_document_ref TEXT NOT NULL DEFAULT '',
    packaging_status TEXT NOT NULL DEFAULT 'UNKNOWN', terminal_protection_status TEXT NOT NULL DEFAULT 'UNKNOWN', damage_recall_notes TEXT NOT NULL DEFAULT '', dg_notes TEXT NOT NULL DEFAULT '',
    workflow_stage TEXT NOT NULL DEFAULT 'PRODUCT IDENTIFIED', hold INTEGER NOT NULL DEFAULT 0, next_action TEXT NOT NULL DEFAULT '', internal_notes TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT '', UNIQUE(catalog_product_id), UNIQUE(sku)
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_lithium_shipping_stage ON eus_lithium_shipping_records(workflow_stage, updated_at DESC)").run();

  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_lithium_destination_records (
    id TEXT PRIMARY KEY, shipping_record_id TEXT NOT NULL, destination TEXT NOT NULL, eligibility_state TEXT NOT NULL DEFAULT 'NOT CHECKED',
    carrier TEXT NOT NULL DEFAULT '', service_method TEXT NOT NULL DEFAULT '', origin_location TEXT NOT NULL DEFAULT '', carrier_contact_ref TEXT NOT NULL DEFAULT '', quote_number TEXT NOT NULL DEFAULT '',
    quote_amount_cents INTEGER, quote_date TEXT NOT NULL DEFAULT '', quote_expiration TEXT NOT NULL DEFAULT '', required_documents TEXT NOT NULL DEFAULT '', required_labels TEXT NOT NULL DEFAULT '',
    packaging_notes TEXT NOT NULL DEFAULT '', terminal_requirements TEXT NOT NULL DEFAULT '', pickup_delivery_limits TEXT NOT NULL DEFAULT '', last_verified_date TEXT NOT NULL DEFAULT '', verified_by TEXT NOT NULL DEFAULT '',
    supplier_product_cost_cents INTEGER, supplier_domestic_shipping_cents INTEGER, dg_hazmat_charge_cents INTEGER, packaging_surcharge_cents INTEGER,
    mainland_inland_freight_cents INTEGER, ocean_hawaii_freight_cents INTEGER, terminal_accessorial_cents INTEGER, last_mile_cents INTEGER, other_shipping_cents INTEGER,
    total_landed_cost_cents INTEGER, retail_price_cents INTEGER, customer_shipping_charge_cents INTEGER, estimated_gross_margin_cents INTEGER,
    internal_notes TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT '',
    UNIQUE(shipping_record_id, destination)
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_lithium_destination_state ON eus_lithium_destination_records(destination, eligibility_state, updated_at DESC)").run();

  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_hawaii_shipping_batches (
    batch_id TEXT PRIMARY KEY, status TEXT NOT NULL DEFAULT 'BUILDING', destination_island TEXT NOT NULL DEFAULT 'Hawaii — General', terminal TEXT NOT NULL DEFAULT '',
    freight_provider TEXT NOT NULL DEFAULT '', service_container_type TEXT NOT NULL DEFAULT '', quote_reference TEXT NOT NULL DEFAULT '', quote_amount_cents INTEGER,
    quote_date TEXT NOT NULL DEFAULT '', quote_expiration TEXT NOT NULL DEFAULT '', estimated_departure_window TEXT NOT NULL DEFAULT '', estimated_arrival_window TEXT NOT NULL DEFAULT '',
    target_units INTEGER, target_weight_lb REAL, target_volume_cuft REAL, customer_shipping_expected_cents INTEGER, freight_accessorial_cost_cents INTEGER,
    required_documents_status TEXT NOT NULL DEFAULT 'UNKNOWN', carrier_review_state TEXT NOT NULL DEFAULT 'RESEARCHING', notes TEXT NOT NULL DEFAULT '', next_action TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT ''
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_hawaii_batches_status ON eus_hawaii_shipping_batches(status, updated_at DESC)").run();

  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_hawaii_batch_orders (
    id TEXT PRIMARY KEY, batch_id TEXT NOT NULL, request_id TEXT NOT NULL, batch_sequence INTEGER, sku TEXT NOT NULL DEFAULT '', quantity INTEGER NOT NULL DEFAULT 1,
    destination TEXT NOT NULL DEFAULT '', product_subtotal_cents INTEGER NOT NULL DEFAULT 0, estimated_shipping_share_cents INTEGER, final_shipping_share_cents INTEGER,
    customer_approval_state TEXT NOT NULL DEFAULT 'NOT REQUESTED', payment_state TEXT NOT NULL DEFAULT 'UNPAID', fulfillment_state TEXT NOT NULL DEFAULT 'BATCHED',
    allocation_method TEXT NOT NULL DEFAULT 'manual', allocated_freight_cents INTEGER, allocation_approved_by TEXT NOT NULL DEFAULT '', allocation_approved_at TEXT NOT NULL DEFAULT '',
    hold INTEGER NOT NULL DEFAULT 0, notes TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT '', UNIQUE(request_id)
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_hawaii_batch_orders_batch ON eus_hawaii_batch_orders(batch_id, batch_sequence, created_at)").run();

  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_hawaii_lithium_events (
    id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, action TEXT NOT NULL, details_json TEXT NOT NULL DEFAULT '{}', actor TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_hawaii_events_created ON eus_hawaii_lithium_events(created_at DESC)").run();
  return db;
}

async function audit(db, entityType, entityId, action, actor, details = {}) {
  await db.prepare("INSERT INTO eus_hawaii_lithium_events (id,entity_type,entity_id,action,details_json,actor,created_at) VALUES (?,?,?,?,?,?,?)")
    .bind(id("HLE"), clean(entityType,40), clean(entityId,120), clean(action,80), JSON.stringify(details).slice(0,8000), clean(actor,180), now()).run();
}

async function readBody(request) { try { return await request.json(); } catch (_) { return {}; } }
async function catalogProducts(db) {
  try {
    const result = await db.prepare(`SELECT i.id,i.sku,i.name,i.category,i.supplier,i.supplier_product_id,i.source_url,i.cost_cents,i.price_cents,i.status,
      m.supplier_sku,m.store_section,m.publish_status,m.primary_image,m.review_state
      FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id
      WHERE i.status!='archived' ORDER BY CASE WHEN m.store_section='lithium-batteries' THEN 0 ELSE 1 END, i.name COLLATE NOCASE LIMIT 500`).all();
    return result.results || [];
  } catch (_) { return []; }
}
async function getCatalogProduct(db, productId, sku) {
  try {
    if (productId) return await db.prepare(`SELECT i.id,i.sku,i.name,i.category,i.supplier,i.supplier_product_id,i.source_url,i.cost_cents,i.price_cents,i.status,m.supplier_sku,m.store_section,m.publish_status FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id WHERE i.id=? LIMIT 1`).bind(productId).first();
    if (sku) return await db.prepare(`SELECT i.id,i.sku,i.name,i.category,i.supplier,i.supplier_product_id,i.source_url,i.cost_cents,i.price_cents,i.status,m.supplier_sku,m.store_section,m.publish_status FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id WHERE i.sku=? COLLATE NOCASE LIMIT 1`).bind(sku).first();
  } catch (_) {}
  return null;
}

function shippingRecord(row) {
  if (!row) return null;
  return {
    id: row.id, catalogProductId: row.catalog_product_id, sku: row.sku, active: Boolean(row.active), supplier: row.supplier, supplierProductId: row.supplier_product_id,
    supplierSku: row.supplier_sku, productTitle: row.product_title, productUrl: row.product_url, storeSection: row.store_section, chemistry: row.chemistry, voltage: row.voltage,
    ampHours: row.amp_hours, wattHours: row.watt_hours, batteryCountPerPackage: row.battery_count_per_package, netBatteryWeightLb: row.net_battery_weight_lb,
    grossPackageWeightLb: row.gross_package_weight_lb, lengthIn: row.length_in, widthIn: row.width_in, heightIn: row.height_in, seriesCapability: row.series_capability,
    parallelCapability: row.parallel_capability, bmsNotes: row.bms_notes, unNumber: row.un_number, un38Status: row.un38_status, un38TestSummaryStatus: row.un38_test_summary_status,
    un38DocumentRef: row.un38_document_ref, sdsStatus: row.sds_status, sdsDocumentRef: row.sds_document_ref, manufacturerComplianceStatus: row.manufacturer_compliance_status,
    manufacturerDocumentRef: row.manufacturer_document_ref, packagingStatus: row.packaging_status, terminalProtectionStatus: row.terminal_protection_status,
    damageRecallNotes: row.damage_recall_notes, dgNotes: row.dg_notes, workflowStage: row.workflow_stage, hold: Boolean(row.hold), nextAction: row.next_action,
    internalNotes: row.internal_notes, createdAt: row.created_at, updatedAt: row.updated_at, updatedBy: row.updated_by
  };
}
function destinationRecord(row) {
  if (!row) return null;
  return {
    id: row.id, shippingRecordId: row.shipping_record_id, destination: row.destination, eligibilityState: row.eligibility_state, carrier: row.carrier,
    serviceMethod: row.service_method, originLocation: row.origin_location, carrierContactRef: row.carrier_contact_ref, quoteNumber: row.quote_number,
    quoteAmountCents: row.quote_amount_cents, quoteDate: row.quote_date, quoteExpiration: row.quote_expiration, requiredDocuments: row.required_documents,
    requiredLabels: row.required_labels, packagingNotes: row.packaging_notes, terminalRequirements: row.terminal_requirements, pickupDeliveryLimits: row.pickup_delivery_limits,
    lastVerifiedDate: row.last_verified_date, verifiedBy: row.verified_by, supplierProductCostCents: row.supplier_product_cost_cents,
    supplierDomesticShippingCents: row.supplier_domestic_shipping_cents, dgHazmatChargeCents: row.dg_hazmat_charge_cents, packagingSurchargeCents: row.packaging_surcharge_cents,
    mainlandInlandFreightCents: row.mainland_inland_freight_cents, oceanHawaiiFreightCents: row.ocean_hawaii_freight_cents, terminalAccessorialCents: row.terminal_accessorial_cents,
    lastMileCents: row.last_mile_cents, otherShippingCents: row.other_shipping_cents, totalLandedCostCents: row.total_landed_cost_cents, retailPriceCents: row.retail_price_cents,
    customerShippingChargeCents: row.customer_shipping_charge_cents, estimatedGrossMarginCents: row.estimated_gross_margin_cents, internalNotes: row.internal_notes,
    createdAt: row.created_at, updatedAt: row.updated_at, updatedBy: row.updated_by
  };
}
function requestRecord(row) {
  if (!row) return null;
  return {
    id: row.id, name: row.name, email: row.email, phone: row.phone, hawaiiZip: row.hawaii_zip, island: row.island, productInterest: row.product_interest,
    quantity: row.quantity, intendedUse: row.intended_use, notes: row.notes, state: row.state, assignedProductId: row.assigned_product_id, assignedSku: row.assigned_sku,
    assignedBatchId: row.assigned_batch_id, customerApprovalState: row.customer_approval_state, paymentState: row.payment_state, fulfillmentState: row.fulfillment_state,
    reservationDate: row.reservation_date, productSubtotalCents: row.product_subtotal_cents, estimatedShippingShareCents: row.estimated_shipping_share_cents,
    finalShippingShareCents: row.final_shipping_share_cents, createdAt: row.created_at, updatedAt: row.updated_at, updatedBy: row.updated_by
  };
}
function batchRecord(row) {
  if (!row) return null;
  return { batchId: row.batch_id, status: row.status, destinationIsland: row.destination_island, terminal: row.terminal, freightProvider: row.freight_provider,
    serviceContainerType: row.service_container_type, quoteReference: row.quote_reference, quoteAmountCents: row.quote_amount_cents, quoteDate: row.quote_date,
    quoteExpiration: row.quote_expiration, estimatedDepartureWindow: row.estimated_departure_window, estimatedArrivalWindow: row.estimated_arrival_window,
    targetUnits: row.target_units, targetWeightLb: row.target_weight_lb, targetVolumeCuft: row.target_volume_cuft, customerShippingExpectedCents: row.customer_shipping_expected_cents,
    freightAccessorialCostCents: row.freight_accessorial_cost_cents, requiredDocumentsStatus: row.required_documents_status, carrierReviewState: row.carrier_review_state,
    notes: row.notes, nextAction: row.next_action, createdAt: row.created_at, updatedAt: row.updated_at, updatedBy: row.updated_by };
}
function batchOrderRecord(row) {
  if (!row) return null;
  return { id: row.id, batchId: row.batch_id, requestId: row.request_id, batchSequence: row.batch_sequence, sku: row.sku, quantity: row.quantity, destination: row.destination,
    productSubtotalCents: row.product_subtotal_cents, estimatedShippingShareCents: row.estimated_shipping_share_cents, finalShippingShareCents: row.final_shipping_share_cents,
    customerApprovalState: row.customer_approval_state, paymentState: row.payment_state, fulfillmentState: row.fulfillment_state, allocationMethod: row.allocation_method,
    allocatedFreightCents: row.allocated_freight_cents, allocationApprovedBy: row.allocation_approved_by, allocationApprovedAt: row.allocation_approved_at,
    hold: Boolean(row.hold), notes: row.notes, createdAt: row.created_at, updatedAt: row.updated_at, updatedBy: row.updated_by };
}

async function publicRequest(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOrigin(request)) return json({ error: "Cross-origin request denied" }, 403);
  const raw = await readBody(request);
  const name = clean(raw.name, 120), email = clean(raw.email, 180).toLowerCase(), phone = clean(raw.phone, 40), zip = clean(raw.hawaiiZip || raw.zip, 10);
  const island = ISLANDS.has(clean(raw.island, 80)) ? clean(raw.island, 80) : "Hawaii — General";
  const intendedUse = USES.has(clean(raw.intendedUse, 80)) ? clean(raw.intendedUse, 80) : "Other";
  const quantity = Math.min(100, Math.max(1, int(raw.quantity, 1)));
  const consent = boolInt(raw.consent);
  if (!name) return json({ error: "Name is required" }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "A valid email is required" }, 400);
  if (!/^\d{5}(?:-\d{4})?$/.test(zip)) return json({ error: "A valid Hawaii ZIP code is required" }, 400);
  if (!consent) return json({ error: "Contact consent is required" }, 400);
  const db = await ensureSchema(env); const created = now(); const requestId = id("HI-REQ");
  await db.prepare(`INSERT INTO eus_hawaii_lithium_requests
    (id,name,email,phone,hawaii_zip,island,product_interest,quantity,intended_use,notes,consent,state,reservation_date,created_at,updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,'NEW',?,?,?)`)
    .bind(requestId,name,email,phone,zip,island,clean(raw.productInterest,240),quantity,intendedUse,clean(raw.notes,3000),consent,created,created,created).run();
  await audit(db,"request",requestId,"created","customer",{island,quantity,intendedUse});
  return json({ ok:true, requestId, state:"NEW", message:"Your Hawaii lithium availability request is reserved for review. No payment has been collected." }, 201);
}

async function publicStatus(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow:"GET, HEAD" });
  const db = await ensureSchema(env); const url = new URL(request.url); const sku = clean(url.searchParams.get("sku"), 180); const productId = clean(url.searchParams.get("productId"), 120);
  if (!sku && !productId) return json({ status:"QUALIFICATION IN PROGRESS", badge:"HAWAII QUALIFICATION IN PROGRESS", eligible:false });
  const record = productId ? await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE catalog_product_id=? LIMIT 1").bind(productId).first() : await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE sku=? COLLATE NOCASE LIMIT 1").bind(sku).first();
  if (!record || record.hold) return json({ status:"QUALIFICATION IN PROGRESS", badge:"HAWAII QUALIFICATION IN PROGRESS", eligible:false });
  const dest = await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE shipping_record_id=? AND destination IN ('Hawaii — General','Oahu','Maui','Kauai','Hawaii Island / Big Island') ORDER BY CASE WHEN eligibility_state='APPROVED' THEN 0 WHEN eligibility_state='QUOTE REQUIRED' THEN 1 ELSE 2 END, updated_at DESC LIMIT 1").bind(record.id).first();
  const state = dest?.eligibility_state || "NOT CHECKED";
  if (state === "APPROVED") return json({ status:"HAWAII ELIGIBLE", badge:"HAWAII ELIGIBLE", eligible:true, destination:dest.destination });
  if (["QUOTE REQUIRED","CARRIER QUOTE NEEDED","QUOTE RECEIVED"].includes(state)) return json({ status:"QUOTE REQUIRED", badge:"HAWAII QUOTE REQUIRED", eligible:false, destination:dest?.destination || "Hawaii — General" });
  return json({ status:"QUALIFICATION IN PROGRESS", badge:"HAWAII QUALIFICATION IN PROGRESS", eligible:false, destination:dest?.destination || "Hawaii — General" });
}

async function adminSnapshot(db, adminEmail) {
  const products = await catalogProducts(db);
  const records = (await db.prepare("SELECT * FROM eus_lithium_shipping_records ORDER BY updated_at DESC").all()).results || [];
  const destinations = (await db.prepare("SELECT * FROM eus_lithium_destination_records ORDER BY updated_at DESC").all()).results || [];
  const requests = (await db.prepare("SELECT * FROM eus_hawaii_lithium_requests ORDER BY created_at DESC LIMIT 500").all()).results || [];
  const batches = (await db.prepare("SELECT * FROM eus_hawaii_shipping_batches ORDER BY created_at DESC LIMIT 200").all()).results || [];
  const orders = (await db.prepare("SELECT * FROM eus_hawaii_batch_orders ORDER BY created_at DESC LIMIT 1000").all()).results || [];
  const events = (await db.prepare("SELECT * FROM eus_hawaii_lithium_events ORDER BY created_at DESC LIMIT 80").all()).results || [];
  const recordBySku = new Map(records.map((r)=>[String(r.sku||'').toLowerCase(),r]));
  const productBySku = new Map(products.map((p)=>[String(p.sku||'').toLowerCase(),p]));
  const destinationByRecord = new Map(); for (const d of destinations) { if (!destinationByRecord.has(d.shipping_record_id)) destinationByRecord.set(d.shipping_record_id, []); destinationByRecord.get(d.shipping_record_id).push(d); }
  const demandBySku = new Map(), demandByIsland = new Map(); let paid = 0, totalAgeMs = 0, ageCount = 0, oldest = "";
  const nowMs = Date.now();
  for (const r of requests) {
    const sku = r.assigned_sku || r.product_interest || "Unmatched"; const key = String(sku);
    const metric = demandBySku.get(key) || { sku:key, reservations:0, units:0, estimatedRevenueCents:0, estimatedSupplierCostCents:0 };
    metric.reservations += 1; metric.units += Number(r.quantity||0); metric.estimatedRevenueCents += Number(r.product_subtotal_cents||0);
    const product = productBySku.get(String(r.assigned_sku||'').toLowerCase()); if (product) metric.estimatedSupplierCostCents += Number(product.cost_cents||0)*Number(r.quantity||0);
    demandBySku.set(key, metric);
    const island = r.island || "Hawaii — General"; demandByIsland.set(island,(demandByIsland.get(island)||0)+Number(r.quantity||0));
    if (r.payment_state === "PAID") paid += 1;
    const t = Date.parse(r.reservation_date || r.created_at); if (Number.isFinite(t)) { totalAgeMs += Math.max(0, nowMs-t); ageCount += 1; if (!oldest || t < Date.parse(oldest)) oldest = new Date(t).toISOString(); }
  }
  const batchMetrics = batches.map((b)=>{
    const rows = orders.filter((o)=>o.batch_id===b.batch_id); let units=0, merchandise=0, supplier=0, weight=0, volume=0, blocked=0, pendingConfirm=0, allocated=0;
    for (const o of rows) {
      const q = Number(o.quantity||0); units += q; merchandise += Number(o.product_subtotal_cents||0); allocated += Number(o.allocated_freight_cents||0);
      const product = productBySku.get(String(o.sku||'').toLowerCase()); if (product) supplier += Number(product.cost_cents||0)*q;
      const sr = recordBySku.get(String(o.sku||'').toLowerCase()); if (sr) { weight += Number(sr.gross_package_weight_lb||0)*q; const cubicIn = Number(sr.length_in||0)*Number(sr.width_in||0)*Number(sr.height_in||0); if (cubicIn>0) volume += (cubicIn/1728)*q; const destRows=destinationByRecord.get(sr.id)||[]; const eligible=destRows.some((d)=>["APPROVED","QUOTE REQUIRED","QUOTE RECEIVED"].includes(d.eligibility_state)); if (sr.hold || !eligible) blocked += 1; } else blocked += 1;
      if (!["APPROVED","ACCEPT DELAY"].includes(o.customer_approval_state)) pendingConfirm += 1;
    }
    const target = Number(b.target_units||0); const fill = target>0 ? Math.min(999, Math.round((units/target)*1000)/10) : null;
    const freight = b.freight_accessorial_cost_cents ?? b.quote_amount_cents ?? allocated ?? 0; const margin = merchandise - supplier - Number(freight||0);
    return { batchId:b.batch_id,reservations:rows.length,units,estimatedGrossWeightLb:Math.round(weight*100)/100,estimatedVolumeCuft:Math.round(volume*100)/100,customerMerchandiseValueCents:merchandise,currentFreightQuoteCents:b.quote_amount_cents,estimatedFreightPerOrderCents:rows.length?Math.round(Number(freight||0)/rows.length):null,estimatedLandedCostCents:supplier+Number(freight||0),estimatedGrossMarginCents:margin,targetUnits:b.target_units,batchFillPercent:fill,remainingTargetUnits:target>0?Math.max(0,target-units):null,pendingCustomerConfirmations:pendingConfirm,blockedOrders:blocked};
  });
  const metrics = { totalReservations: requests.length, unitsRequested: requests.reduce((s,r)=>s+Number(r.quantity||0),0), paidOrders:paid, reservationToPaidRate:requests.length?Math.round((paid/requests.length)*1000)/10:0, oldestReservation:oldest||null, averageReservationAgeDays:ageCount?Math.round((totalAgeMs/ageCount/86400000)*10)/10:0, demandBySku:[...demandBySku.values()].sort((a,b)=>b.units-a.units), demandByIsland:[...demandByIsland.entries()].map(([island,units])=>({island,units})).sort((a,b)=>b.units-a.units), batchMetrics };
  return { admin:adminEmail, products, records:records.map(shippingRecord), destinations:destinations.map(destinationRecord), requests:requests.map(requestRecord), batches:batches.map(batchRecord), batchOrders:orders.map(batchOrderRecord), metrics, recentEvents:events, syncedAt:now() };
}

function doc(value) { return enumValue(upper(value), DOC_STATES, "UNKNOWN"); }
async function upsertShippingRecord(request, db, adminEmail) {
  const raw = await readBody(request); const catalog = await getCatalogProduct(db, clean(raw.catalogProductId,120), clean(raw.sku,180));
  if (!catalog) return json({ error:"Select an existing Catalog Manager product/SKU before creating a shipping record" }, 400);
  const existing = await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE catalog_product_id=? OR sku=? COLLATE NOCASE LIMIT 1").bind(catalog.id,catalog.sku).first();
  const recordId = existing?.id || id("LITH"); const createdAt = existing?.created_at || now(); const updatedAt=now();
  const stage = enumValue(upper(raw.workflowStage), WORKFLOW_STAGES, existing?.workflow_stage || "PRODUCT IDENTIFIED");
  const values = [recordId,catalog.id,catalog.sku,boolInt(raw.active ?? true),clean(catalog.supplier,80),clean(catalog.supplier_product_id,180),clean(catalog.supplier_sku||catalog.sku,180),clean(catalog.name,240),clean(catalog.source_url,700),clean(catalog.store_section||"lithium-batteries",80),clean(raw.chemistry,80),clean(raw.voltage,80),clean(raw.ampHours,80),num(raw.wattHours),nullableInt(raw.batteryCountPerPackage),num(raw.netBatteryWeightLb),num(raw.grossPackageWeightLb),num(raw.lengthIn),num(raw.widthIn),num(raw.heightIn),clean(raw.seriesCapability,500),clean(raw.parallelCapability,500),clean(raw.bmsNotes,1500),clean(raw.unNumber,80),doc(raw.un38Status),doc(raw.un38TestSummaryStatus),clean(raw.un38DocumentRef,1000),doc(raw.sdsStatus),clean(raw.sdsDocumentRef,1000),doc(raw.manufacturerComplianceStatus),clean(raw.manufacturerDocumentRef,1000),doc(raw.packagingStatus),doc(raw.terminalProtectionStatus),clean(raw.damageRecallNotes,2000),clean(raw.dgNotes,3000),stage,boolInt(raw.hold),clean(raw.nextAction,500),clean(raw.internalNotes,4000),createdAt,updatedAt,adminEmail];
  await db.prepare(`INSERT INTO eus_lithium_shipping_records
    (id,catalog_product_id,sku,active,supplier,supplier_product_id,supplier_sku,product_title,product_url,store_section,chemistry,voltage,amp_hours,watt_hours,battery_count_per_package,net_battery_weight_lb,gross_package_weight_lb,length_in,width_in,height_in,series_capability,parallel_capability,bms_notes,un_number,un38_status,un38_test_summary_status,un38_document_ref,sds_status,sds_document_ref,manufacturer_compliance_status,manufacturer_document_ref,packaging_status,terminal_protection_status,damage_recall_notes,dg_notes,workflow_stage,hold,next_action,internal_notes,created_at,updated_at,updated_by)
    VALUES (${Array(42).fill('?').join(',')})
    ON CONFLICT(catalog_product_id) DO UPDATE SET sku=excluded.sku,active=excluded.active,supplier=excluded.supplier,supplier_product_id=excluded.supplier_product_id,supplier_sku=excluded.supplier_sku,product_title=excluded.product_title,product_url=excluded.product_url,store_section=excluded.store_section,chemistry=excluded.chemistry,voltage=excluded.voltage,amp_hours=excluded.amp_hours,watt_hours=excluded.watt_hours,battery_count_per_package=excluded.battery_count_per_package,net_battery_weight_lb=excluded.net_battery_weight_lb,gross_package_weight_lb=excluded.gross_package_weight_lb,length_in=excluded.length_in,width_in=excluded.width_in,height_in=excluded.height_in,series_capability=excluded.series_capability,parallel_capability=excluded.parallel_capability,bms_notes=excluded.bms_notes,un_number=excluded.un_number,un38_status=excluded.un38_status,un38_test_summary_status=excluded.un38_test_summary_status,un38_document_ref=excluded.un38_document_ref,sds_status=excluded.sds_status,sds_document_ref=excluded.sds_document_ref,manufacturer_compliance_status=excluded.manufacturer_compliance_status,manufacturer_document_ref=excluded.manufacturer_document_ref,packaging_status=excluded.packaging_status,terminal_protection_status=excluded.terminal_protection_status,damage_recall_notes=excluded.damage_recall_notes,dg_notes=excluded.dg_notes,workflow_stage=excluded.workflow_stage,hold=excluded.hold,next_action=excluded.next_action,internal_notes=excluded.internal_notes,updated_at=excluded.updated_at,updated_by=excluded.updated_by`)
    .bind(...values).run();
  await audit(db,"shipping_record",recordId,existing?"updated":"created",adminEmail,{sku:catalog.sku,stage,hold:boolInt(raw.hold)});
  return json(await adminSnapshot(db,adminEmail));
}

async function upsertDestination(request, db, adminEmail) {
  const raw=await readBody(request); const recordId=clean(raw.shippingRecordId,120); const record=await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE id=? LIMIT 1").bind(recordId).first();
  if(!record) return json({error:"Shipping record not found"},404);
  const destination=clean(raw.destination,80) || "Hawaii — General"; const existing=await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE shipping_record_id=? AND destination=? LIMIT 1").bind(recordId,destination).first();
  const destinationId=existing?.id||id("LDEST"); const eligibility=enumValue(upper(raw.eligibilityState),ELIGIBILITY_STATES,existing?.eligibility_state||"NOT CHECKED");
  const costs=["supplierProductCostCents","supplierDomesticShippingCents","dgHazmatChargeCents","packagingSurchargeCents","mainlandInlandFreightCents","oceanHawaiiFreightCents","terminalAccessorialCents","lastMileCents","otherShippingCents"].map((k)=>nullableInt(raw[k]));
  const sum=costs.reduce((s,v)=>s+Number(v||0),0); const landed=nullableInt(raw.totalLandedCostCents) ?? sum; const retail=nullableInt(raw.retailPriceCents); const customerShip=nullableInt(raw.customerShippingChargeCents); const margin=nullableInt(raw.estimatedGrossMarginCents) ?? (retail===null?null:retail-landed);
  await db.prepare(`INSERT INTO eus_lithium_destination_records
    (id,shipping_record_id,destination,eligibility_state,carrier,service_method,origin_location,carrier_contact_ref,quote_number,quote_amount_cents,quote_date,quote_expiration,required_documents,required_labels,packaging_notes,terminal_requirements,pickup_delivery_limits,last_verified_date,verified_by,supplier_product_cost_cents,supplier_domestic_shipping_cents,dg_hazmat_charge_cents,packaging_surcharge_cents,mainland_inland_freight_cents,ocean_hawaii_freight_cents,terminal_accessorial_cents,last_mile_cents,other_shipping_cents,total_landed_cost_cents,retail_price_cents,customer_shipping_charge_cents,estimated_gross_margin_cents,internal_notes,created_at,updated_at,updated_by)
    VALUES (${Array(36).fill('?').join(',')})
    ON CONFLICT(shipping_record_id,destination) DO UPDATE SET eligibility_state=excluded.eligibility_state,carrier=excluded.carrier,service_method=excluded.service_method,origin_location=excluded.origin_location,carrier_contact_ref=excluded.carrier_contact_ref,quote_number=excluded.quote_number,quote_amount_cents=excluded.quote_amount_cents,quote_date=excluded.quote_date,quote_expiration=excluded.quote_expiration,required_documents=excluded.required_documents,required_labels=excluded.required_labels,packaging_notes=excluded.packaging_notes,terminal_requirements=excluded.terminal_requirements,pickup_delivery_limits=excluded.pickup_delivery_limits,last_verified_date=excluded.last_verified_date,verified_by=excluded.verified_by,supplier_product_cost_cents=excluded.supplier_product_cost_cents,supplier_domestic_shipping_cents=excluded.supplier_domestic_shipping_cents,dg_hazmat_charge_cents=excluded.dg_hazmat_charge_cents,packaging_surcharge_cents=excluded.packaging_surcharge_cents,mainland_inland_freight_cents=excluded.mainland_inland_freight_cents,ocean_hawaii_freight_cents=excluded.ocean_hawaii_freight_cents,terminal_accessorial_cents=excluded.terminal_accessorial_cents,last_mile_cents=excluded.last_mile_cents,other_shipping_cents=excluded.other_shipping_cents,total_landed_cost_cents=excluded.total_landed_cost_cents,retail_price_cents=excluded.retail_price_cents,customer_shipping_charge_cents=excluded.customer_shipping_charge_cents,estimated_gross_margin_cents=excluded.estimated_gross_margin_cents,internal_notes=excluded.internal_notes,updated_at=excluded.updated_at,updated_by=excluded.updated_by`)
    .bind(destinationId,recordId,destination,eligibility,clean(raw.carrier,180),clean(raw.serviceMethod,180),clean(raw.originLocation,180),clean(raw.carrierContactRef,500),clean(raw.quoteNumber,120),nullableInt(raw.quoteAmountCents),clean(raw.quoteDate,40),clean(raw.quoteExpiration,40),clean(raw.requiredDocuments,3000),clean(raw.requiredLabels,2000),clean(raw.packagingNotes,3000),clean(raw.terminalRequirements,2000),clean(raw.pickupDeliveryLimits,2000),clean(raw.lastVerifiedDate,40),clean(raw.verifiedBy,180),...costs,landed,retail,customerShip,margin,clean(raw.internalNotes,4000),existing?.created_at||now(),now(),adminEmail).run();
  await audit(db,"destination",destinationId,existing?"updated":"created",adminEmail,{sku:record.sku,destination,eligibility});
  return json(await adminSnapshot(db,adminEmail));
}

async function updateRequest(request, db, adminEmail, requestId) {
  const raw=await readBody(request); const existing=await db.prepare("SELECT * FROM eus_hawaii_lithium_requests WHERE id=? LIMIT 1").bind(requestId).first(); if(!existing)return json({error:"Request not found"},404);
  let productId=clean(raw.assignedProductId ?? existing.assigned_product_id,120), sku=clean(raw.assignedSku ?? existing.assigned_sku,180);
  if(productId||sku){const p=await getCatalogProduct(db,productId,sku); if(!p)return json({error:"Assigned product must exist in Catalog Manager"},400); productId=p.id;sku=p.sku;}
  const state=enumValue(upper(raw.state??existing.state),REQUEST_STATES,existing.state); const approval=enumValue(upper(raw.customerApprovalState??existing.customer_approval_state),CUSTOMER_APPROVAL_STATES,existing.customer_approval_state); const payment=enumValue(upper(raw.paymentState??existing.payment_state),PAYMENT_STATES,existing.payment_state); const fulfillment=enumValue(upper(raw.fulfillmentState??existing.fulfillment_state),FULFILLMENT_STATES,existing.fulfillment_state);
  if(fulfillment==="SHIPPED" && existing.assigned_batch_id){const batch=await db.prepare("SELECT status FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(existing.assigned_batch_id).first(); if(!batch || !["IN TRANSIT","ARRIVED","DELIVERING","COMPLETE"].includes(batch.status)) return json({error:"An order cannot be marked SHIPPED merely because a batch is booked"},409);}
  await db.prepare(`UPDATE eus_hawaii_lithium_requests SET state=?,assigned_product_id=?,assigned_sku=?,customer_approval_state=?,payment_state=?,fulfillment_state=?,product_subtotal_cents=?,estimated_shipping_share_cents=?,final_shipping_share_cents=?,updated_at=?,updated_by=? WHERE id=?`)
    .bind(state,productId,sku,approval,payment,fulfillment,nullableInt(raw.productSubtotalCents)??existing.product_subtotal_cents,nullableInt(raw.estimatedShippingShareCents),nullableInt(raw.finalShippingShareCents),now(),adminEmail,requestId).run();
  await audit(db,"request",requestId,"updated",adminEmail,{state,sku,approval,payment,fulfillment}); return json(await adminSnapshot(db,adminEmail));
}

async function createBatch(request, db, adminEmail) {
  const raw=await readBody(request); const batchId=clean(raw.batchId,80)||`HI-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomUUID().slice(0,6).toUpperCase()}`; if(await db.prepare("SELECT batch_id FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first())return json({error:"Batch ID already exists"},409);
  const status=enumValue(upper(raw.status),BATCH_STATES,"BUILDING"); await db.prepare(`INSERT INTO eus_hawaii_shipping_batches (batch_id,status,destination_island,terminal,freight_provider,service_container_type,quote_reference,quote_amount_cents,quote_date,quote_expiration,estimated_departure_window,estimated_arrival_window,target_units,target_weight_lb,target_volume_cuft,customer_shipping_expected_cents,freight_accessorial_cost_cents,required_documents_status,carrier_review_state,notes,next_action,created_at,updated_at,updated_by) VALUES (${Array(24).fill('?').join(',')})`)
    .bind(batchId,status,clean(raw.destinationIsland,80)||"Hawaii — General",clean(raw.terminal,180),clean(raw.freightProvider,180),clean(raw.serviceContainerType,180),clean(raw.quoteReference,120),nullableInt(raw.quoteAmountCents),clean(raw.quoteDate,40),clean(raw.quoteExpiration,40),clean(raw.estimatedDepartureWindow,120),clean(raw.estimatedArrivalWindow,120),nullableInt(raw.targetUnits),num(raw.targetWeightLb),num(raw.targetVolumeCuft),nullableInt(raw.customerShippingExpectedCents),nullableInt(raw.freightAccessorialCostCents),doc(raw.requiredDocumentsStatus),enumValue(upper(raw.carrierReviewState),ELIGIBILITY_STATES,"RESEARCHING"),clean(raw.notes,4000),clean(raw.nextAction,500),now(),now(),adminEmail).run();
  await audit(db,"batch",batchId,"created",adminEmail,{status}); return json(await adminSnapshot(db,adminEmail));
}

async function updateBatch(request, db, adminEmail, batchId) {
  const raw=await readBody(request); const e=await db.prepare("SELECT * FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first(); if(!e)return json({error:"Batch not found"},404);
  const status=enumValue(upper(raw.status??e.status),BATCH_STATES,e.status); await db.prepare(`UPDATE eus_hawaii_shipping_batches SET status=?,destination_island=?,terminal=?,freight_provider=?,service_container_type=?,quote_reference=?,quote_amount_cents=?,quote_date=?,quote_expiration=?,estimated_departure_window=?,estimated_arrival_window=?,target_units=?,target_weight_lb=?,target_volume_cuft=?,customer_shipping_expected_cents=?,freight_accessorial_cost_cents=?,required_documents_status=?,carrier_review_state=?,notes=?,next_action=?,updated_at=?,updated_by=? WHERE batch_id=?`)
    .bind(status,clean(raw.destinationIsland??e.destination_island,80),clean(raw.terminal??e.terminal,180),clean(raw.freightProvider??e.freight_provider,180),clean(raw.serviceContainerType??e.service_container_type,180),clean(raw.quoteReference??e.quote_reference,120),raw.quoteAmountCents===undefined?e.quote_amount_cents:nullableInt(raw.quoteAmountCents),clean(raw.quoteDate??e.quote_date,40),clean(raw.quoteExpiration??e.quote_expiration,40),clean(raw.estimatedDepartureWindow??e.estimated_departure_window,120),clean(raw.estimatedArrivalWindow??e.estimated_arrival_window,120),raw.targetUnits===undefined?e.target_units:nullableInt(raw.targetUnits),raw.targetWeightLb===undefined?e.target_weight_lb:num(raw.targetWeightLb),raw.targetVolumeCuft===undefined?e.target_volume_cuft:num(raw.targetVolumeCuft),raw.customerShippingExpectedCents===undefined?e.customer_shipping_expected_cents:nullableInt(raw.customerShippingExpectedCents),raw.freightAccessorialCostCents===undefined?e.freight_accessorial_cost_cents:nullableInt(raw.freightAccessorialCostCents),raw.requiredDocumentsStatus===undefined?e.required_documents_status:doc(raw.requiredDocumentsStatus),raw.carrierReviewState===undefined?e.carrier_review_state:enumValue(upper(raw.carrierReviewState),ELIGIBILITY_STATES,e.carrier_review_state),clean(raw.notes??e.notes,4000),clean(raw.nextAction??e.next_action,500),now(),adminEmail,batchId).run(); await audit(db,"batch",batchId,"updated",adminEmail,{status}); return json(await adminSnapshot(db,adminEmail));
}

async function assignToBatch(request, db, adminEmail, batchId) {
  const raw=await readBody(request); const requestId=clean(raw.requestId,120); const req=await db.prepare("SELECT * FROM eus_hawaii_lithium_requests WHERE id=?").bind(requestId).first(); if(!req)return json({error:"Reservation not found"},404); const batch=await db.prepare("SELECT * FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first(); if(!batch)return json({error:"Batch not found"},404); if(["COMPLETE","CANCELLED"].includes(batch.status))return json({error:"Cannot assign to a closed batch"},409);
  const sku=clean(raw.sku||req.assigned_sku,180); if(!sku)return json({error:"Assign an exact catalog SKU before batching this reservation"},400); const p=await getCatalogProduct(db,"",sku); if(!p)return json({error:"Batch SKU must exist in Catalog Manager"},400);
  const existing=await db.prepare("SELECT * FROM eus_hawaii_batch_orders WHERE request_id=?").bind(requestId).first(); const orderId=existing?.id||id("HI-BO"); const quantity=Math.max(1,int(raw.quantity??req.quantity,req.quantity||1)); const sequence=nullableInt(raw.batchSequence);
  await db.prepare(`INSERT INTO eus_hawaii_batch_orders (id,batch_id,request_id,batch_sequence,sku,quantity,destination,product_subtotal_cents,estimated_shipping_share_cents,final_shipping_share_cents,customer_approval_state,payment_state,fulfillment_state,allocation_method,allocated_freight_cents,allocation_approved_by,allocation_approved_at,hold,notes,created_at,updated_at,updated_by) VALUES (${Array(22).fill('?').join(',')})
    ON CONFLICT(request_id) DO UPDATE SET batch_id=excluded.batch_id,batch_sequence=excluded.batch_sequence,sku=excluded.sku,quantity=excluded.quantity,destination=excluded.destination,product_subtotal_cents=excluded.product_subtotal_cents,estimated_shipping_share_cents=excluded.estimated_shipping_share_cents,final_shipping_share_cents=excluded.final_shipping_share_cents,customer_approval_state=excluded.customer_approval_state,payment_state=excluded.payment_state,fulfillment_state=excluded.fulfillment_state,allocation_method=excluded.allocation_method,allocated_freight_cents=excluded.allocated_freight_cents,hold=excluded.hold,notes=excluded.notes,updated_at=excluded.updated_at,updated_by=excluded.updated_by`)
    .bind(orderId,batchId,requestId,sequence,p.sku,quantity,clean(raw.destination||req.island,120),nullableInt(raw.productSubtotalCents)??req.product_subtotal_cents,nullableInt(raw.estimatedShippingShareCents)??req.estimated_shipping_share_cents,nullableInt(raw.finalShippingShareCents)??req.final_shipping_share_cents,enumValue(upper(raw.customerApprovalState||req.customer_approval_state),CUSTOMER_APPROVAL_STATES,req.customer_approval_state),enumValue(upper(raw.paymentState||req.payment_state),PAYMENT_STATES,req.payment_state),enumValue(upper(raw.fulfillmentState||"BATCHED"),FULFILLMENT_STATES,"BATCHED"),enumValue(clean(raw.allocationMethod,20).toLowerCase(),ALLOCATION_METHODS,"manual"),nullableInt(raw.allocatedFreightCents),"","",boolInt(raw.hold),clean(raw.notes,3000),existing?.created_at||now(),now(),adminEmail).run();
  await db.prepare("UPDATE eus_hawaii_lithium_requests SET assigned_batch_id=?,assigned_product_id=?,assigned_sku=?,fulfillment_state='BATCHED',updated_at=?,updated_by=? WHERE id=?").bind(batchId,p.id,p.sku,now(),adminEmail,requestId).run(); await audit(db,"batch_order",orderId,existing?"moved_or_updated":"assigned",adminEmail,{batchId,requestId,sku:p.sku,quantity}); return json(await adminSnapshot(db,adminEmail));
}

async function updateBatchOrder(request, db, adminEmail, orderId) {
  const raw=await readBody(request); const e=await db.prepare("SELECT * FROM eus_hawaii_batch_orders WHERE id=?").bind(orderId).first(); if(!e)return json({error:"Batch order not found"},404);
  let batchId=clean(raw.batchId??e.batch_id,80); if(!(await db.prepare("SELECT batch_id FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first()))return json({error:"Target batch not found"},404);
  const fulfillment=enumValue(upper(raw.fulfillmentState??e.fulfillment_state),FULFILLMENT_STATES,e.fulfillment_state); if(fulfillment==="SHIPPED"){const b=await db.prepare("SELECT status FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first(); if(!["IN TRANSIT","ARRIVED","DELIVERING","COMPLETE"].includes(b?.status))return json({error:"Batch status does not justify SHIPPED; booked is not shipped"},409);}
  const method=enumValue(clean(raw.allocationMethod??e.allocation_method,20).toLowerCase(),ALLOCATION_METHODS,e.allocation_method); const allocated=raw.allocatedFreightCents===undefined?e.allocated_freight_cents:nullableInt(raw.allocatedFreightCents); const approved=allocated!==null&&(allocated!==e.allocated_freight_cents||method!==e.allocation_method);
  await db.prepare(`UPDATE eus_hawaii_batch_orders SET batch_id=?,batch_sequence=?,quantity=?,destination=?,estimated_shipping_share_cents=?,final_shipping_share_cents=?,customer_approval_state=?,payment_state=?,fulfillment_state=?,allocation_method=?,allocated_freight_cents=?,allocation_approved_by=?,allocation_approved_at=?,hold=?,notes=?,updated_at=?,updated_by=? WHERE id=?`)
    .bind(batchId,raw.batchSequence===undefined?e.batch_sequence:nullableInt(raw.batchSequence),raw.quantity===undefined?e.quantity:Math.max(1,int(raw.quantity,e.quantity)),clean(raw.destination??e.destination,120),raw.estimatedShippingShareCents===undefined?e.estimated_shipping_share_cents:nullableInt(raw.estimatedShippingShareCents),raw.finalShippingShareCents===undefined?e.final_shipping_share_cents:nullableInt(raw.finalShippingShareCents),enumValue(upper(raw.customerApprovalState??e.customer_approval_state),CUSTOMER_APPROVAL_STATES,e.customer_approval_state),enumValue(upper(raw.paymentState??e.payment_state),PAYMENT_STATES,e.payment_state),fulfillment,method,allocated,approved?adminEmail:e.allocation_approved_by,approved?now():e.allocation_approved_at,raw.hold===undefined?e.hold:boolInt(raw.hold),clean(raw.notes??e.notes,3000),now(),adminEmail,orderId).run();
  await db.prepare("UPDATE eus_hawaii_lithium_requests SET assigned_batch_id=?,estimated_shipping_share_cents=?,final_shipping_share_cents=?,customer_approval_state=?,payment_state=?,fulfillment_state=?,updated_at=?,updated_by=? WHERE id=?").bind(batchId,raw.estimatedShippingShareCents===undefined?e.estimated_shipping_share_cents:nullableInt(raw.estimatedShippingShareCents),raw.finalShippingShareCents===undefined?e.final_shipping_share_cents:nullableInt(raw.finalShippingShareCents),enumValue(upper(raw.customerApprovalState??e.customer_approval_state),CUSTOMER_APPROVAL_STATES,e.customer_approval_state),enumValue(upper(raw.paymentState??e.payment_state),PAYMENT_STATES,e.payment_state),fulfillment,now(),adminEmail,e.request_id).run(); await audit(db,"batch_order",orderId,"updated",adminEmail,{batchId,method,allocated,fulfillment}); return json(await adminSnapshot(db,adminEmail));
}

export async function handleHawaiiLithiumPublicApi(request, env, pathname) {
  try {
    if (pathname === "/api/hawaii-lithium/requests") return publicRequest(request,env);
    if (pathname === "/api/hawaii-lithium/status") return publicStatus(request,env);
    return json({error:"Not found"},404);
  } catch(error) { console.error(JSON.stringify({event:"hawaii_lithium_public_error",path:pathname,message:clean(error?.message,300)})); return json({error:"Hawaii Lithium Program is temporarily unavailable"},503); }
}

export async function handleHawaiiLithiumAdminApi(request, env, pathname) {
  try {
    const auth=await requireAdmin(request,env); if(auth.response)return auth.response; if(!sameOrigin(request))return json({error:"Cross-origin request denied"},403); const db=await ensureSchema(env); const admin=auth.session.email;
    if(pathname==="/api/admin/lithium-shipping" && request.method==="GET") return json(await adminSnapshot(db,admin));
    if(pathname==="/api/admin/lithium-shipping/records" && request.method==="POST") return upsertShippingRecord(request,db,admin);
    if(pathname==="/api/admin/lithium-shipping/destinations" && request.method==="POST") return upsertDestination(request,db,admin);
    let m=pathname.match(/^\/api\/admin\/lithium-shipping\/requests\/([^/]+)$/); if(m && request.method==="PATCH") return updateRequest(request,db,admin,decodeURIComponent(m[1]));
    if(pathname==="/api/admin/lithium-shipping/batches" && request.method==="POST") return createBatch(request,db,admin);
    m=pathname.match(/^\/api\/admin\/lithium-shipping\/batches\/([^/]+)$/); if(m && request.method==="PATCH") return updateBatch(request,db,admin,decodeURIComponent(m[1]));
    m=pathname.match(/^\/api\/admin\/lithium-shipping\/batches\/([^/]+)\/orders$/); if(m && request.method==="POST") return assignToBatch(request,db,admin,decodeURIComponent(m[1]));
    m=pathname.match(/^\/api\/admin\/lithium-shipping\/batch-orders\/([^/]+)$/); if(m && request.method==="PATCH") return updateBatchOrder(request,db,admin,decodeURIComponent(m[1]));
    return json({error:"Not found"},404);
  } catch(error) { console.error(JSON.stringify({event:"hawaii_lithium_admin_error",path:pathname,message:clean(error?.message,300)})); return json({error:clean(error?.message,240)||"Hawaii Lithium admin request failed"},500); }
}
