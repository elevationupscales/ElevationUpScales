import { resolveShippingRule } from "./shipping-rules-runtime.js";
import { resolveSokHawaiiCustomerStatus, HAWAII_OPERATIONAL_MAX_QTY } from "./sok-operations-runtime.js";
const DEFAULT_ADMIN_EMAIL = "elevationupscales@gmail.com";
const REQUEST_STATES = new Set(["NEW","REVIEWING","PRODUCT MATCHED","SHIPPING RESEARCH","QUOTE READY","CUSTOMER CONTACTED","CLOSED","HOLD","CANCELLED"]);
const DOC_STATES = new Set(["UNKNOWN","REQUESTED","RECEIVED","VERIFIED","EXPIRED / RECHECK","RECHECK REQUIRED","NOT APPLICABLE"]);
const ELIGIBILITY_STATES = new Set(["NOT CHECKED","RESEARCHING","DOCS NEEDED","CARRIER QUOTE NEEDED","QUOTE RECEIVED","APPROVED","QUOTE REQUIRED","NOT ELIGIBLE","HOLD"]);
const WORKFLOW_STAGES = new Set(["PRODUCT IDENTIFIED","DOCUMENTS NEEDED","DOCUMENTS RECEIVED","FREIGHT QUOTE NEEDED","ROUTE REVIEW","APPROVED","LIVE","RECHECK / HOLD"]);
const REVIEW_STATES = new Set(["FULL REVIEW REQUIRED","DOCUMENT REVIEW","ROUTE REVIEW","CARRIER REVIEW","INTERNAL REQUIREMENTS SATISFIED","HOLD"]);
const STOCK_STATES = new Set(["UNKNOWN","AVAILABLE","LOW","OUT OF STOCK","SUPPLIER ERROR","RECHECK REQUIRED"]);
const CHECK_STATES = new Set(["NOT CHECKED","PASS","NEEDS REVIEW","BLOCKED","NOT APPLICABLE"]);
const BATCH_STATES = new Set(["BUILDING","NEEDS VOLUME","QUOTE NEEDED","QUOTE RECEIVED","DOCS REVIEW","READY TO COMMIT","CUSTOMER CONFIRMATION","BOOKED","IN TRANSIT","ARRIVED","DELIVERING","COMPLETE","HOLD","CANCELLED"]);
const PAYMENT_STATES = new Set(["UNPAID","PENDING","PAID","REFUND NEEDED","REFUNDED","CANCELLED"]);
const FULFILLMENT_STATES = new Set(["RESERVED","BATCHED","READY","ORDERED / CONSOLIDATING","BOOKED","SHIPPED","IN TRANSIT","DELIVERING","DELIVERED","COMPLETE","HOLD","CANCELLED"]);
const CUSTOMER_APPROVAL_STATES = new Set(["NOT REQUESTED","PENDING","APPROVED","DECLINED","ACCEPT DELAY","CANCEL / REFUND"]);
const ALLOCATION_METHODS = new Set(["equal","per-unit","weight","volume","manual"]);
const ISLANDS = new Set(["Oahu","Maui","Kauai","Hawaii Island / Big Island","Hawaii — General","Other / Confirm"]);
const USES = new Set(["RV","Solar / Off-Grid","Home Backup","Marine","Van / Mobile Power","Other"]);
const HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY = 9900;
const HAWAII_PREFERRED_CONSOLIDATION_UNITS = 3;
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
const dateOnly = (value) => { const d = Date.parse(clean(value, 40)); return Number.isFinite(d) ? d : null; };

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

async function ensureColumn(db, table, column, definition) {
  const info = await db.prepare(`PRAGMA table_info(${table})`).all();
  const exists = (info.results || []).some((row) => row.name === column);
  if (!exists) await db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
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

  const columns = [
    ["eus_lithium_shipping_records","manufacturer","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","manufacturer_model","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","packaging_configuration","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","ship_from_origin","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","source_product_url","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","review_state","TEXT NOT NULL DEFAULT 'FULL REVIEW REQUIRED'"],
    ["eus_lithium_shipping_records","supplier_stock_state","TEXT NOT NULL DEFAULT 'UNKNOWN'"],
    ["eus_lithium_shipping_records","supplier_quantity","INTEGER"],
    ["eus_lithium_shipping_records","inventory_last_confirmed","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","inventory_confirmation_source","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","inventory_recheck_required","INTEGER NOT NULL DEFAULT 1"],
    ["eus_lithium_shipping_records","supplier_lead_time","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","supplier_price_cents","INTEGER"],
    ["eus_lithium_shipping_records","supplier_price_quote_date","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_shipping_records","supplier_price_expiration","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_lithium_requests","staff_owner","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_lithium_requests","last_customer_contact","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_lithium_requests","next_customer_contact","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_lithium_requests","waiting_reason","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_lithium_requests","latest_expectation","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_lithium_requests","customer_confirmation_at","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_lithium_requests","last_material_change_at","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_destination_records","route_documents_status","TEXT NOT NULL DEFAULT 'UNKNOWN'"],
    ["eus_lithium_destination_records","carrier_acceptance_state","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_lithium_destination_records","provider_reference","TEXT NOT NULL DEFAULT ''"],
    ["eus_lithium_destination_records","consolidation_handling_cents","INTEGER"],
    ["eus_lithium_destination_records","destination_handling_cents","INTEGER"],
    ["eus_lithium_destination_records","payment_processing_cents","INTEGER"],
    ["eus_lithium_destination_records","other_direct_fulfillment_cents","INTEGER"],
    ["eus_lithium_destination_records","estimated_gross_contribution_cents","INTEGER"],
    ["eus_hawaii_batch_orders","exact_sku_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","packaging_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","quantity_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","origin_leg_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","consolidation_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","freight_leg_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","terminal_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","last_mile_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","documents_ready_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","supplier_stock_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","customer_confirmation_check","TEXT NOT NULL DEFAULT 'NOT CHECKED'"],
    ["eus_hawaii_batch_orders","provider_reference","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_batch_orders","review_recheck_at","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_batch_orders","reviewer","TEXT NOT NULL DEFAULT ''"],
    ["eus_hawaii_batch_orders","blocker_notes","TEXT NOT NULL DEFAULT ''"]
  ];
  for (const [table,column,definition] of columns) await ensureColumn(db,table,column,definition);
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
    id:row.id,catalogProductId:row.catalog_product_id,sku:row.sku,active:Boolean(row.active),supplier:row.supplier,supplierProductId:row.supplier_product_id,supplierSku:row.supplier_sku,
    productTitle:row.product_title,productUrl:row.product_url,storeSection:row.store_section,manufacturer:row.manufacturer,manufacturerModel:row.manufacturer_model,
    packagingConfiguration:row.packaging_configuration,shipFromOrigin:row.ship_from_origin,sourceProductUrl:row.source_product_url,reviewState:row.review_state,
    supplierStockState:row.supplier_stock_state,supplierQuantity:row.supplier_quantity,inventoryLastConfirmed:row.inventory_last_confirmed,
    inventoryConfirmationSource:row.inventory_confirmation_source,inventoryRecheckRequired:Boolean(row.inventory_recheck_required),supplierLeadTime:row.supplier_lead_time,
    supplierPriceCents:row.supplier_price_cents,supplierPriceQuoteDate:row.supplier_price_quote_date,supplierPriceExpiration:row.supplier_price_expiration,
    chemistry:row.chemistry,voltage:row.voltage,ampHours:row.amp_hours,wattHours:row.watt_hours,batteryCountPerPackage:row.battery_count_per_package,
    netBatteryWeightLb:row.net_battery_weight_lb,grossPackageWeightLb:row.gross_package_weight_lb,lengthIn:row.length_in,widthIn:row.width_in,heightIn:row.height_in,
    seriesCapability:row.series_capability,parallelCapability:row.parallel_capability,bmsNotes:row.bms_notes,unNumber:row.un_number,un38Status:row.un38_status,
    un38TestSummaryStatus:row.un38_test_summary_status,un38DocumentRef:row.un38_document_ref,sdsStatus:row.sds_status,sdsDocumentRef:row.sds_document_ref,
    manufacturerComplianceStatus:row.manufacturer_compliance_status,manufacturerDocumentRef:row.manufacturer_document_ref,packagingStatus:row.packaging_status,
    terminalProtectionStatus:row.terminal_protection_status,damageRecallNotes:row.damage_recall_notes,dgNotes:row.dg_notes,workflowStage:row.workflow_stage,
    hold:Boolean(row.hold),nextAction:row.next_action,internalNotes:row.internal_notes,createdAt:row.created_at,updatedAt:row.updated_at,updatedBy:row.updated_by
  };
}
function destinationRecord(row) {
  if (!row) return null;
  return {
    id:row.id,shippingRecordId:row.shipping_record_id,destination:row.destination,eligibilityState:row.eligibility_state,carrier:row.carrier,serviceMethod:row.service_method,
    originLocation:row.origin_location,carrierContactRef:row.carrier_contact_ref,providerReference:row.provider_reference,carrierAcceptanceState:row.carrier_acceptance_state,
    routeDocumentsStatus:row.route_documents_status,quoteNumber:row.quote_number,quoteAmountCents:row.quote_amount_cents,quoteDate:row.quote_date,quoteExpiration:row.quote_expiration,
    requiredDocuments:row.required_documents,requiredLabels:row.required_labels,packagingNotes:row.packaging_notes,terminalRequirements:row.terminal_requirements,
    pickupDeliveryLimits:row.pickup_delivery_limits,lastVerifiedDate:row.last_verified_date,verifiedBy:row.verified_by,supplierProductCostCents:row.supplier_product_cost_cents,
    supplierDomesticShippingCents:row.supplier_domestic_shipping_cents,dgHazmatChargeCents:row.dg_hazmat_charge_cents,packagingSurchargeCents:row.packaging_surcharge_cents,
    mainlandInlandFreightCents:row.mainland_inland_freight_cents,consolidationHandlingCents:row.consolidation_handling_cents,oceanHawaiiFreightCents:row.ocean_hawaii_freight_cents,
    terminalAccessorialCents:row.terminal_accessorial_cents,destinationHandlingCents:row.destination_handling_cents,lastMileCents:row.last_mile_cents,
    paymentProcessingCents:row.payment_processing_cents,otherDirectFulfillmentCents:row.other_direct_fulfillment_cents,otherShippingCents:row.other_shipping_cents,
    totalLandedCostCents:row.total_landed_cost_cents,retailPriceCents:row.retail_price_cents,customerShippingChargeCents:row.customer_shipping_charge_cents,
    estimatedGrossContributionCents:row.estimated_gross_contribution_cents ?? row.estimated_gross_margin_cents,estimatedGrossMarginCents:row.estimated_gross_margin_cents,
    internalNotes:row.internal_notes,createdAt:row.created_at,updatedAt:row.updated_at,updatedBy:row.updated_by
  };
}
function derivedLifecycle(row) {
  if (["CANCELLED","REFUNDED"].includes(row.payment_state) || row.fulfillment_state === "CANCELLED") return row.payment_state === "REFUNDED" ? "REFUNDED" : "CANCELLED";
  if (row.payment_state === "REFUND NEEDED") return "REFUND REQUIRED";
  if (row.state === "HOLD" || row.fulfillment_state === "HOLD") return "HOLD";
  if (row.customer_approval_state === "DECLINED") return "CUSTOMER DECLINED";
  if (row.customer_approval_state === "PENDING" && row.last_material_change_at) return "NEEDS RECONFIRMATION";
  if (["DELIVERED","COMPLETE"].includes(row.fulfillment_state)) return "DELIVERED";
  if (["IN TRANSIT","SHIPPED","DELIVERING"].includes(row.fulfillment_state)) return "IN TRANSIT";
  if (row.fulfillment_state === "BOOKED") return "BOOKED";
  if (row.fulfillment_state === "ORDERED / CONSOLIDATING") return "ORDERED / CONSOLIDATING";
  if (row.payment_state === "PAID") return "PAID";
  if (["APPROVED","ACCEPT DELAY"].includes(row.customer_approval_state)) return "CUSTOMER CONFIRMED";
  if (row.assigned_batch_id) return "BATCH ASSIGNED";
  return "RESERVED";
}
function requestRecord(row) {
  if (!row) return null;
  const base = {
    id:row.id,name:row.name,email:row.email,phone:row.phone,hawaiiZip:row.hawaii_zip,island:row.island,productInterest:row.product_interest,quantity:row.quantity,
    intendedUse:row.intended_use,notes:row.notes,state:row.state,assignedProductId:row.assigned_product_id,assignedSku:row.assigned_sku,assignedBatchId:row.assigned_batch_id,
    customerApprovalState:row.customer_approval_state,paymentState:row.payment_state,fulfillmentState:row.fulfillment_state,reservationDate:row.reservation_date,
    productSubtotalCents:row.product_subtotal_cents,estimatedShippingShareCents:row.estimated_shipping_share_cents,finalShippingShareCents:row.final_shipping_share_cents,
    staffOwner:row.staff_owner,lastCustomerContact:row.last_customer_contact,nextCustomerContact:row.next_customer_contact,waitingReason:row.waiting_reason,
    latestExpectation:row.latest_expectation,customerConfirmationAt:row.customer_confirmation_at,lastMaterialChangeAt:row.last_material_change_at,
    createdAt:row.created_at,updatedAt:row.updated_at,updatedBy:row.updated_by
  };
  base.lifecycle = derivedLifecycle(row);
  const ageDays = Math.floor(Math.max(0,Date.now()-Date.parse(row.reservation_date||row.created_at||now()))/86400000);
  base.ageDays = Number.isFinite(ageDays) ? ageDays : 0;
  base.agingFlag = base.ageDays >= 30 ? "RECONFIRM" : base.ageDays >= 14 ? "MANAGEMENT" : base.ageDays >= 7 ? "FOLLOW-UP" : "CURRENT";
  return base;
}
function batchRecord(row) {
  if (!row) return null;
  return {batchId:row.batch_id,status:row.status,destinationIsland:row.destination_island,terminal:row.terminal,freightProvider:row.freight_provider,
    serviceContainerType:row.service_container_type,quoteReference:row.quote_reference,quoteAmountCents:row.quote_amount_cents,quoteDate:row.quote_date,quoteExpiration:row.quote_expiration,
    estimatedDepartureWindow:row.estimated_departure_window,estimatedArrivalWindow:row.estimated_arrival_window,targetUnits:row.target_units,targetWeightLb:row.target_weight_lb,
    targetVolumeCuft:row.target_volume_cuft,customerShippingExpectedCents:row.customer_shipping_expected_cents,freightAccessorialCostCents:row.freight_accessorial_cost_cents,
    requiredDocumentsStatus:row.required_documents_status,carrierReviewState:row.carrier_review_state,notes:row.notes,nextAction:row.next_action,createdAt:row.created_at,updatedAt:row.updated_at,updatedBy:row.updated_by};
}
function batchOrderRecord(row) {
  if (!row) return null;
  const checks = {
    exactSku:row.exact_sku_check,packaging:row.packaging_check,quantity:row.quantity_check,originLeg:row.origin_leg_check,consolidation:row.consolidation_check,
    freightLeg:row.freight_leg_check,terminal:row.terminal_check,lastMile:row.last_mile_check,documentsReady:row.documents_ready_check,supplierStock:row.supplier_stock_check,
    customerConfirmation:row.customer_confirmation_check
  };
  const blocked = Boolean(row.hold) || Object.values(checks).some((v)=>v === "BLOCKED") || Object.values(checks).some((v)=>!['PASS','NOT APPLICABLE'].includes(v));
  return {id:row.id,batchId:row.batch_id,requestId:row.request_id,batchSequence:row.batch_sequence,sku:row.sku,quantity:row.quantity,destination:row.destination,
    productSubtotalCents:row.product_subtotal_cents,estimatedShippingShareCents:row.estimated_shipping_share_cents,finalShippingShareCents:row.final_shipping_share_cents,
    customerApprovalState:row.customer_approval_state,paymentState:row.payment_state,fulfillmentState:row.fulfillment_state,allocationMethod:row.allocation_method,
    allocatedFreightCents:row.allocated_freight_cents,allocationApprovedBy:row.allocation_approved_by,allocationApprovedAt:row.allocation_approved_at,hold:Boolean(row.hold),
    compatibilityChecks:checks,providerReference:row.provider_reference,reviewRecheckAt:row.review_recheck_at,reviewer:row.reviewer,blockerNotes:row.blocker_notes,
    batchReady:!blocked,notes:row.notes,createdAt:row.created_at,updatedAt:row.updated_at,updatedBy:row.updated_by};
}

async function publicRequest(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOrigin(request)) return json({ error: "Cross-origin request denied" }, 403);
  const raw = await readBody(request);
  const name = clean(raw.name,120), email=clean(raw.email,180).toLowerCase(), phone=clean(raw.phone,40), zip=clean(raw.hawaiiZip||raw.zip,10);
  const island=ISLANDS.has(clean(raw.island,80))?clean(raw.island,80):"Hawaii — General"; const intendedUse=USES.has(clean(raw.intendedUse,80))?clean(raw.intendedUse,80):"Other";
  const quantity=Math.min(100,Math.max(1,int(raw.quantity,1))); const commercialQuantity=quantity>HAWAII_OPERATIONAL_MAX_QTY; const consent=boolInt(raw.consent);
  if(!name)return json({error:"Name is required"},400); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return json({error:"A valid email is required"},400);
  if(!/^\d{5}(?:-\d{4})?$/.test(zip))return json({error:"A valid Hawaii ZIP code is required"},400); if(!consent)return json({error:"Contact consent is required"},400);
  const db=await ensureSchema(env); const created=now(); const requestId=id("HI-REQ");
  await db.prepare(`INSERT INTO eus_hawaii_lithium_requests (id,name,email,phone,hawaii_zip,island,product_interest,quantity,intended_use,notes,consent,state,reservation_date,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,'NEW',?,?,?)`)
    .bind(requestId,name,email,phone,zip,island,clean(raw.productInterest,240),quantity,intendedUse,clean(raw.notes,3000),consent,created,created,created).run();
  if(commercialQuantity){
    await db.prepare("UPDATE eus_hawaii_lithium_requests SET state='REVIEWING',fulfillment_state='HOLD',updated_at=? WHERE id=?").bind(now(),requestId).run();
    return json({ok:true,requestId,customerState:"commercial_review_required",label:"Commercial Quantity — Freight Review Required",quoteRequired:true,paymentAllowed:false,maxStandardQuantity:HAWAII_OPERATIONAL_MAX_QTY},202);
  }
  await audit(db,"request",requestId,"created","customer",{island,quantity,intendedUse});
  return json({ok:true,requestId,state:"NEW",message:"Your Hawaii lithium availability request is reserved for review. No payment has been collected."},201);
}

async function publicStatus(request, env) {
  if(request.method!=="GET"&&request.method!=="HEAD")return json({error:"Method not allowed"},405,{Allow:"GET, HEAD"});
  const db=await ensureSchema(env); const url=new URL(request.url); const sku=clean(url.searchParams.get("sku"),180); const productId=clean(url.searchParams.get("productId"),120);
  const destination=clean(url.searchParams.get("island")||url.searchParams.get("destination"),80);
  const commonBase={customerFreightPerBatteryCents:HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY,preferredConsolidationUnits:HAWAII_PREFERRED_CONSOLIDATION_UNITS,warehousePickupOnly:true,consolidationDisclosure:"Orders of fewer than three compatible batteries may wait while Elevation combines compatible Hawaii orders. Three compatible batteries is the current preferred shipment target.",timingDisclosure:"Estimated shipment and pickup timing is not guaranteed."};
  const unresolved={status:"SHIPPING OPTIONS BEING CONFIRMED",badge:"CHECKING HAWAII SHIPPING",eligible:false,...commonBase,consolidationStatus:"Awaiting consolidation / route review",estimatedPickupTiming:"Confirmed after consolidation and carrier scheduling"};
  if(!sku&&!productId)return json(unresolved);
  const record=productId?await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE catalog_product_id=? LIMIT 1").bind(productId).first():await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE sku=? COLLATE NOCASE LIMIT 1").bind(sku).first();
  if(!record||record.hold||record.review_state!=="INTERNAL REQUIREMENTS SATISFIED")return json(unresolved);
  let dest=null;
  if(destination && ISLANDS.has(destination) && destination!=="Other / Confirm") dest=await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE shipping_record_id=? AND destination IN (?, 'Hawaii — General') ORDER BY CASE WHEN destination=? THEN 0 ELSE 1 END LIMIT 1").bind(record.id,destination,destination).first();
  else dest=await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE shipping_record_id=? AND destination='Hawaii — General' LIMIT 1").bind(record.id).first();
  let batch=null;
  try { batch=await db.prepare(`SELECT b.status,b.terminal,b.estimated_departure_window,b.estimated_arrival_window FROM eus_hawaii_batch_orders bo JOIN eus_hawaii_shipping_batches b ON b.batch_id=bo.batch_id WHERE bo.sku=? COLLATE NOCASE AND bo.hold=0 AND b.status NOT IN ('COMPLETE','CANCELLED','HOLD') ORDER BY b.updated_at DESC LIMIT 1`).bind(record.sku).first(); } catch (_) {}
  const batchState=upper(batch?.status||"");
  const consolidationStatus=({"BUILDING":"Awaiting Consolidation","NEEDS VOLUME":"Awaiting Consolidation","QUOTE NEEDED":"Awaiting Consolidation","QUOTE RECEIVED":"Awaiting Consolidation","DOCS REVIEW":"Awaiting Consolidation","READY TO COMMIT":"Batch Ready","CUSTOMER CONFIRMATION":"Batch Ready","BOOKED":"Freight Scheduled","IN TRANSIT":"In Transit","ARRIVED":"Ready for Hawaii Pickup","DELIVERING":"Ready for Hawaii Pickup"})[batchState]||"Awaiting Consolidation";
  const estimatedPickupTiming=clean(batch?.estimated_arrival_window,180)||"Confirmed after consolidation, carrier scheduling and Hawaii terminal availability";
  const origin=clean(dest?.origin_location,180); const terminal=clean(batch?.terminal,180); const route=(origin&&terminal)?`${origin} → ${terminal}`:"";
  const common={...commonBase,consolidationStatus,estimatedPickupTiming,...(route?{route}:{})};
  const state=dest?.eligibility_state||"NOT CHECKED";
  if(state==="APPROVED")return json({status:"HAWAII SHIPPING AVAILABLE",badge:"HAWAII SHIPPING AVAILABLE",eligible:true,destination:dest.destination,...common});
  if(["QUOTE REQUIRED","CARRIER QUOTE NEEDED","QUOTE RECEIVED"].includes(state))return json({status:"HAWAII SHIPPING QUOTE REQUIRED",badge:"HAWAII SHIPPING QUOTE REQUIRED",eligible:false,destination:dest?.destination||destination||"Hawaii — General",...common});
  if(state==="NOT ELIGIBLE"||state==="HOLD")return json({status:"CURRENTLY UNAVAILABLE FOR HAWAII",badge:"CURRENTLY UNAVAILABLE FOR HAWAII",eligible:false,destination:dest?.destination||destination||"Hawaii — General",...common});
  return json({...unresolved,destination:dest?.destination||destination||"Hawaii — General",...common});
}


function customerState(record, destinations = []) {
  if (!record) return { customerState: "review_required", label: "Freight Review Required", eligible: false };
  if (Number(record.hold)) return { customerState: "unavailable", label: "Currently Unavailable", eligible: false };
  if (record.review_state !== "INTERNAL REQUIREMENTS SATISFIED") return { customerState: "review_required", label: "Freight Review Required", eligible: false };
  const states = destinations.map((row) => upper(row.eligibility_state || ""));
  if (states.includes("APPROVED")) return { customerState: "shipping_available", label: "Shipping Available", eligible: true };
  if (states.some((value) => ["NOT ELIGIBLE", "HOLD"].includes(value))) return { customerState: "unavailable", label: "Currently Unavailable", eligible: false };
  return { customerState: "review_required", label: "Freight Review Required", eligible: false };
}

export async function resolveHawaiiCustomerStatus(env, { sku = "", productId = "", destination = "Hawaii — General" } = {}) {
  const sokState = await resolveSokHawaiiCustomerStatus(env,{sku,productId,destination});
  if(sokState) return sokState;
  const db = await ensureSchema(env);
  const exactSku = clean(sku, 180);
  const exactProductId = clean(productId, 120);
  const record = exactProductId
    ? await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE catalog_product_id=? LIMIT 1").bind(exactProductId).first()
    : exactSku
      ? await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE sku=? COLLATE NOCASE LIMIT 1").bind(exactSku).first()
      : null;
  if (!record) return { ...customerState(null), sku: exactSku, productId: exactProductId };
  const target = clean(destination, 80) || "Hawaii — General";
  const rows = (await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE shipping_record_id=? AND destination IN (?, 'Hawaii — General') ORDER BY CASE WHEN destination=? THEN 0 ELSE 1 END")
    .bind(record.id, target, target).all()).results || [];
  return { ...customerState(record, rows), sku: record.sku, productId: record.catalog_product_id };
}

async function publicStatuses(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  const db = await ensureSchema(env);
  const ruleResult = await resolveShippingRule(env, { destinationState: "HI", quantity: 1, batteryUnitsPerItem: 1 });
  const records = (await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE active=1").all()).results || [];
  const destinations = (await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE destination IN ('Hawaii — General','Oahu','Maui','Kauai','Hawaii Island / Big Island')").all()).results || [];
  const byRecord = new Map();
  for (const row of destinations) {
    if (!byRecord.has(row.shipping_record_id)) byRecord.set(row.shipping_record_id, []);
    byRecord.get(row.shipping_record_id).push(row);
  }
  const statuses = {};
  for (const record of records) {
    const value = { ...customerState(record, byRecord.get(record.id) || []), sku: record.sku, productId: record.catalog_product_id };
    if (record.sku) statuses[String(record.sku).toLowerCase()] = value;
    if (record.catalog_product_id) statuses[record.catalog_product_id] = value;
  }
  const rule = ruleResult?.rule || null;
  return json({
    statuses,
    customerFreightPerBatteryCents: Number(rule?.rateCents || HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY),
    preferredConsolidationUnits: Number(rule?.preferredConsolidationQuantity || HAWAII_PREFERRED_CONSOLIDATION_UNITS),
    pickupOnly: Boolean(rule?.pickupOnly ?? true),
    shippingRule: rule ? { id: rule.id, version: rule.version, method: rule.method, rateCents: rule.rateCents, customerLabel: rule.customerLabel, timingMessage: rule.timingMessage } : null,
  });
}

function quoteExpired(value) { const t=dateOnly(value); return t!==null && t < Date.now()-86400000; }
function routeApprovalBlockers(record, raw, eligibility) {
  if(eligibility!=="APPROVED")return [];
  const blockers=[];
  if(!record.catalog_product_id)blockers.push("Catalog Product ID is required");
  if(!record.sku)blockers.push("Exact Elevation SKU is required");
  if(!record.supplier_sku)blockers.push("Exact supplier SKU / variant is required");
  const supplierCost = nullableInt(raw.supplierProductCostCents ?? record.supplier_price_cents);
  if(supplierCost===null||supplierCost<=0)blockers.push("Supplier product cost must be greater than $0 before route approval");
  const freightQuote = nullableInt(raw.quoteAmountCents);
  const oceanFreight = nullableInt(raw.oceanHawaiiFreightCents);
  if((freightQuote===null||freightQuote<=0)&&(oceanFreight===null||oceanFreight<=0))blockers.push("A non-zero Hawaii freight quote or ocean freight cost is required");
  if(record.hold)blockers.push("Product is on HOLD");
  if(record.review_state!=="INTERNAL REQUIREMENTS SATISFIED")blockers.push("Internal review state must be INTERNAL REQUIREMENTS SATISFIED");
  if(!record.manufacturer||!record.manufacturer_model)blockers.push("Manufacturer and exact model are required");
  if(!["RECEIVED","VERIFIED"].includes(record.un38_test_summary_status)||!record.un38_document_ref)blockers.push("UN 38.3 test-summary evidence/reference is required");
  if(record.packaging_status!=="VERIFIED")blockers.push("Packaging review must be VERIFIED");
  if(!["VERIFIED","NOT APPLICABLE"].includes(record.terminal_protection_status))blockers.push("Terminal / short-circuit protection review is incomplete");
  const origin=clean(raw.originLocation||record.ship_from_origin,180); if(!origin)blockers.push("Ship-from origin is required");
  if(!clean(raw.carrier,180))blockers.push("Freight provider is required");
  if(!clean(raw.serviceMethod,180))blockers.push("Service / route is required");
  if(!clean(raw.destination,80))blockers.push("Destination is required");
  if(doc(raw.routeDocumentsStatus)!=="VERIFIED")blockers.push("Route documentation must be VERIFIED");
  if(enumValue(upper(raw.carrierAcceptanceState),CHECK_STATES,"NOT CHECKED")!=="PASS")blockers.push("Provider/carrier acceptance must be PASS");
  if(nullableInt(raw.quoteAmountCents)===null)blockers.push("Current freight quote/economics are required");
  if(quoteExpired(raw.quoteExpiration))blockers.push("Freight quote is expired");
  if(nullableInt(raw.retailPriceCents)===null)blockers.push("Retail price is required for route economics");
  return blockers;
}


async function hawaiiTaxSnapshot(db) {
  const zero = {
    directGrossReceiptsCents: 0,
    directTransactionCount: 0,
    currentYearGrossReceiptsCents: 0,
    currentYearTransactionCount: 0,
    precedingYearGrossReceiptsCents: 0,
    precedingYearTransactionCount: 0,
    sourceBreakdown: [],
    taxHandlingMethod: "MANUAL ACCOUNTING REVIEW",
    taxReviewRequired: false,
    lastAccountingReviewDate: null,
    notes: "Informational tracking only; no custom Hawaii GET calculation, registration, collection, or filing is performed by this module."
  };
  try {
    const rows = (await db.prepare(`SELECT source,total_cents,COALESCE(paid_at,created_at) AS order_date
      FROM eus_store_orders
      WHERE lower(COALESCE(json_extract(shipping_json,'$.state'),''))='hi'
        AND lower(COALESCE(payment_status,''))='completed'
      ORDER BY COALESCE(paid_at,created_at) DESC LIMIT 5000`).all()).results || [];
    const year = new Date().getUTCFullYear(), preceding = year - 1;
    const bySource = new Map();
    for (const row of rows) {
      const amount = Number(row.total_cents || 0);
      const source = clean(row.source || "direct", 40) || "direct";
      const current = bySource.get(source) || { source, transactions:0, grossReceiptsCents:0 };
      current.transactions += 1; current.grossReceiptsCents += amount; bySource.set(source,current);
      const y = new Date(row.order_date || 0).getUTCFullYear();
      if (y === year) { zero.currentYearGrossReceiptsCents += amount; zero.currentYearTransactionCount += 1; }
      if (y === preceding) { zero.precedingYearGrossReceiptsCents += amount; zero.precedingYearTransactionCount += 1; }
      zero.directGrossReceiptsCents += amount; zero.directTransactionCount += 1;
    }
    zero.sourceBreakdown = [...bySource.values()];
    zero.taxReviewRequired = zero.directTransactionCount > 0;
    return zero;
  } catch (_) {
    return zero;
  }
}

async function adminSnapshot(db, adminEmail) {
  const products=await catalogProducts(db);
  const records=(await db.prepare("SELECT * FROM eus_lithium_shipping_records ORDER BY updated_at DESC").all()).results||[];
  const destinations=(await db.prepare("SELECT * FROM eus_lithium_destination_records ORDER BY updated_at DESC").all()).results||[];
  const requests=(await db.prepare("SELECT * FROM eus_hawaii_lithium_requests ORDER BY created_at DESC LIMIT 500").all()).results||[];
  const batches=(await db.prepare("SELECT * FROM eus_hawaii_shipping_batches ORDER BY created_at DESC LIMIT 200").all()).results||[];
  const orders=(await db.prepare("SELECT * FROM eus_hawaii_batch_orders ORDER BY created_at DESC LIMIT 1000").all()).results||[];
  const events=(await db.prepare("SELECT * FROM eus_hawaii_lithium_events ORDER BY created_at DESC LIMIT 80").all()).results||[];
  const taxReview=await hawaiiTaxSnapshot(db);
  const recordBySku=new Map(records.map(r=>[String(r.sku||"").toLowerCase(),r])); const productBySku=new Map(products.map(p=>[String(p.sku||"").toLowerCase(),p]));
  const destinationByRecord=new Map(); for(const d of destinations){if(!destinationByRecord.has(d.shipping_record_id))destinationByRecord.set(d.shipping_record_id,[]);destinationByRecord.get(d.shipping_record_id).push(d);}
  const demandBySku=new Map(),demandByIsland=new Map(); let paid=0,confirmed=0,batchReady=0,totalAgeMs=0,ageCount=0,oldest="",followupDue=0,managementFlag=0,reconfirmRequired=0,inventoryRecheckDue=0,blockedReservations=0;
  const nowMs=Date.now();
  for(const r of requests){
    const sku=r.assigned_sku||r.product_interest||"Unmatched"; const key=String(sku); const metric=demandBySku.get(key)||{sku:key,reservations:0,confirmed:0,paid:0,batchReady:0,units:0,estimatedRevenueCents:0,estimatedSupplierCostCents:0};
    metric.reservations+=1;metric.units+=Number(r.quantity||0);metric.estimatedRevenueCents+=Number(r.product_subtotal_cents||0);
    if(["APPROVED","ACCEPT DELAY"].includes(r.customer_approval_state)){metric.confirmed+=1;confirmed+=1;} if(r.payment_state==="PAID"){metric.paid+=1;paid+=1;}
    const product=productBySku.get(String(r.assigned_sku||"").toLowerCase()); if(product)metric.estimatedSupplierCostCents+=Number(product.cost_cents||0)*Number(r.quantity||0);
    const bo=orders.find(o=>o.request_id===r.id); if(bo){const bor=batchOrderRecord(bo); if(bor.batchReady&&["APPROVED","ACCEPT DELAY"].includes(r.customer_approval_state)){metric.batchReady+=1;batchReady+=1;} if(!bor.batchReady)blockedReservations+=1;}
    demandBySku.set(key,metric); const island=r.island||"Hawaii — General"; demandByIsland.set(island,(demandByIsland.get(island)||0)+Number(r.quantity||0));
    const t=Date.parse(r.reservation_date||r.created_at); if(Number.isFinite(t)){const age=Math.max(0,nowMs-t);totalAgeMs+=age;ageCount+=1;if(!oldest||t<Date.parse(oldest))oldest=new Date(t).toISOString();const days=Math.floor(age/86400000);if(days>=30)reconfirmRequired+=1;else if(days>=14)managementFlag+=1;else if(days>=7)followupDue+=1;}
    const sr=recordBySku.get(String(r.assigned_sku||"").toLowerCase()); if(sr && (sr.inventory_recheck_required || !sr.inventory_last_confirmed || ["UNKNOWN","RECHECK REQUIRED","OUT OF STOCK","SUPPLIER ERROR"].includes(sr.supplier_stock_state))) inventoryRecheckDue+=1;
  }
  const batchMetrics=batches.map(b=>{
    const rows=orders.filter(o=>o.batch_id===b.batch_id);let units=0,merchandise=0,supplier=0,weight=0,volume=0,blocked=0,pendingConfirm=0,allocated=0,ready=0,missingCost=0;
    for(const o of rows){const q=Number(o.quantity||0);units+=q;merchandise+=Number(o.product_subtotal_cents||0);allocated+=Number(o.allocated_freight_cents||0);const p=productBySku.get(String(o.sku||"").toLowerCase());if(p&&Number(p.cost_cents||0)>0)supplier+=Number(p.cost_cents||0)*q;else missingCost+=1;
      const sr=recordBySku.get(String(o.sku||"").toLowerCase());if(sr){weight+=Number(sr.gross_package_weight_lb||0)*q;const cubic=Number(sr.length_in||0)*Number(sr.width_in||0)*Number(sr.height_in||0);if(cubic>0)volume+=(cubic/1728)*q;} const bor=batchOrderRecord(o);if(bor.batchReady)ready+=1;else blocked+=1;if(!["APPROVED","ACCEPT DELAY"].includes(o.customer_approval_state))pendingConfirm+=1;}
    const target=Number(b.target_units||0);const fill=target>0?Math.min(999,Math.round((units/target)*1000)/10):null;const freight=b.freight_accessorial_cost_cents??b.quote_amount_cents??allocated??0;const costDataComplete=missingCost===0&&Number(freight||0)>0;const contribution=costDataComplete?merchandise-supplier-Number(freight||0):null;
    return{batchId:b.batch_id,reservations:rows.length,units,batchReadyLines:ready,costDataComplete,missingCostLines:missingCost,estimatedGrossWeightLb:Math.round(weight*100)/100,estimatedVolumeCuft:Math.round(volume*100)/100,customerMerchandiseValueCents:merchandise,currentFreightQuoteCents:b.quote_amount_cents,estimatedFreightPerOrderCents:rows.length&&Number(freight||0)>0?Math.round(Number(freight||0)/rows.length):null,estimatedLandedCostCents:costDataComplete?supplier+Number(freight||0):null,estimatedGrossContributionCents:contribution,targetUnits:b.target_units,batchFillPercent:fill,remainingTargetUnits:target>0?Math.max(0,target-units):null,pendingCustomerConfirmations:pendingConfirm,blockedOrders:blocked};
  });
  const quoteExpiring=destinations.filter(d=>d.quote_expiration&&dateOnly(d.quote_expiration)!==null&&dateOnly(d.quote_expiration)>=Date.now()&&dateOnly(d.quote_expiration)<=Date.now()+7*86400000).length;
  const routeBlockers=destinations.filter(d=>!["APPROVED","QUOTE REQUIRED","NOT ELIGIBLE"].includes(d.eligibility_state)).length;
  const metrics={totalReservations:requests.length,unitsRequested:requests.reduce((s,r)=>s+Number(r.quantity||0),0),confirmedDemand:confirmed,paidOrders:paid,batchReadyDemand:batchReady,reservationToPaidRate:requests.length?Math.round((paid/requests.length)*1000)/10:0,oldestReservation:oldest||null,averageReservationAgeDays:ageCount?Math.round((totalAgeMs/ageCount/86400000)*10)/10:0,followupDue,managementFlag,reconfirmRequired,inventoryRecheckDue,quoteExpiring,routeBlockers,blockedReservations,demandBySku:[...demandBySku.values()].sort((a,b)=>b.units-a.units),demandByIsland:[...demandByIsland.entries()].map(([island,units])=>({island,units})).sort((a,b)=>b.units-a.units),batchMetrics};
  return{admin:adminEmail,products,records:records.map(shippingRecord),destinations:destinations.map(destinationRecord),requests:requests.map(requestRecord),batches:batches.map(batchRecord),batchOrders:orders.map(batchOrderRecord),metrics,taxReview,recentEvents:events,syncedAt:now()};
}

function doc(value){return enumValue(upper(value),DOC_STATES,"UNKNOWN");}
function check(value,fallback="NOT CHECKED"){return enumValue(upper(value),CHECK_STATES,fallback);}

async function upsertShippingRecord(request,db,adminEmail){
  const raw=await readBody(request);const catalog=await getCatalogProduct(db,clean(raw.catalogProductId,120),clean(raw.sku,180));if(!catalog)return json({error:"Select an existing Catalog Manager product/SKU before creating a shipping record"},400);
  const existing=await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE catalog_product_id=? OR sku=? COLLATE NOCASE LIMIT 1").bind(catalog.id,catalog.sku).first();const recordId=existing?.id||id("LITH");const createdAt=existing?.created_at||now();const updatedAt=now();
  const stage=enumValue(upper(raw.workflowStage),WORKFLOW_STAGES,existing?.workflow_stage||"PRODUCT IDENTIFIED");const reviewState=enumValue(upper(raw.reviewState),REVIEW_STATES,existing?.review_state||"FULL REVIEW REQUIRED");const stockState=enumValue(upper(raw.supplierStockState),STOCK_STATES,existing?.supplier_stock_state||"UNKNOWN");
  await db.prepare(`INSERT INTO eus_lithium_shipping_records (id,catalog_product_id,sku,active,supplier,supplier_product_id,supplier_sku,product_title,product_url,store_section,chemistry,voltage,amp_hours,watt_hours,battery_count_per_package,net_battery_weight_lb,gross_package_weight_lb,length_in,width_in,height_in,series_capability,parallel_capability,bms_notes,un_number,un38_status,un38_test_summary_status,un38_document_ref,sds_status,sds_document_ref,manufacturer_compliance_status,manufacturer_document_ref,packaging_status,terminal_protection_status,damage_recall_notes,dg_notes,workflow_stage,hold,next_action,internal_notes,created_at,updated_at,updated_by,manufacturer,manufacturer_model,packaging_configuration,ship_from_origin,source_product_url,review_state,supplier_stock_state,supplier_quantity,inventory_last_confirmed,inventory_confirmation_source,inventory_recheck_required,supplier_lead_time,supplier_price_cents,supplier_price_quote_date,supplier_price_expiration)
    VALUES (${Array(57).fill('?').join(',')}) ON CONFLICT(catalog_product_id) DO UPDATE SET sku=excluded.sku,active=excluded.active,supplier=excluded.supplier,supplier_product_id=excluded.supplier_product_id,supplier_sku=excluded.supplier_sku,product_title=excluded.product_title,product_url=excluded.product_url,store_section=excluded.store_section,chemistry=excluded.chemistry,voltage=excluded.voltage,amp_hours=excluded.amp_hours,watt_hours=excluded.watt_hours,battery_count_per_package=excluded.battery_count_per_package,net_battery_weight_lb=excluded.net_battery_weight_lb,gross_package_weight_lb=excluded.gross_package_weight_lb,length_in=excluded.length_in,width_in=excluded.width_in,height_in=excluded.height_in,series_capability=excluded.series_capability,parallel_capability=excluded.parallel_capability,bms_notes=excluded.bms_notes,un_number=excluded.un_number,un38_status=excluded.un38_status,un38_test_summary_status=excluded.un38_test_summary_status,un38_document_ref=excluded.un38_document_ref,sds_status=excluded.sds_status,sds_document_ref=excluded.sds_document_ref,manufacturer_compliance_status=excluded.manufacturer_compliance_status,manufacturer_document_ref=excluded.manufacturer_document_ref,packaging_status=excluded.packaging_status,terminal_protection_status=excluded.terminal_protection_status,damage_recall_notes=excluded.damage_recall_notes,dg_notes=excluded.dg_notes,workflow_stage=excluded.workflow_stage,hold=excluded.hold,next_action=excluded.next_action,internal_notes=excluded.internal_notes,manufacturer=excluded.manufacturer,manufacturer_model=excluded.manufacturer_model,packaging_configuration=excluded.packaging_configuration,ship_from_origin=excluded.ship_from_origin,source_product_url=excluded.source_product_url,review_state=excluded.review_state,supplier_stock_state=excluded.supplier_stock_state,supplier_quantity=excluded.supplier_quantity,inventory_last_confirmed=excluded.inventory_last_confirmed,inventory_confirmation_source=excluded.inventory_confirmation_source,inventory_recheck_required=excluded.inventory_recheck_required,supplier_lead_time=excluded.supplier_lead_time,supplier_price_cents=excluded.supplier_price_cents,supplier_price_quote_date=excluded.supplier_price_quote_date,supplier_price_expiration=excluded.supplier_price_expiration,updated_at=excluded.updated_at,updated_by=excluded.updated_by`)
    .bind(recordId,catalog.id,catalog.sku,boolInt(raw.active??true),clean(catalog.supplier,80),clean(catalog.supplier_product_id,180),clean(catalog.supplier_sku||catalog.sku,180),clean(catalog.name,240),clean(catalog.source_url,700),clean(catalog.store_section||"lithium-batteries",80),clean(raw.chemistry,80),clean(raw.voltage,80),clean(raw.ampHours,80),num(raw.wattHours),nullableInt(raw.batteryCountPerPackage),num(raw.netBatteryWeightLb),num(raw.grossPackageWeightLb),num(raw.lengthIn),num(raw.widthIn),num(raw.heightIn),clean(raw.seriesCapability,500),clean(raw.parallelCapability,500),clean(raw.bmsNotes,1500),clean(raw.unNumber,80),doc(raw.un38Status),doc(raw.un38TestSummaryStatus),clean(raw.un38DocumentRef,1000),doc(raw.sdsStatus),clean(raw.sdsDocumentRef,1000),doc(raw.manufacturerComplianceStatus),clean(raw.manufacturerDocumentRef,1000),doc(raw.packagingStatus),doc(raw.terminalProtectionStatus),clean(raw.damageRecallNotes,2000),clean(raw.dgNotes,3000),stage,boolInt(raw.hold),clean(raw.nextAction,500),clean(raw.internalNotes,4000),createdAt,updatedAt,adminEmail,clean(raw.manufacturer,180),clean(raw.manufacturerModel,180),clean(raw.packagingConfiguration,500),clean(raw.shipFromOrigin,240),clean(raw.sourceProductUrl||catalog.source_url,700),reviewState,stockState,nullableInt(raw.supplierQuantity),clean(raw.inventoryLastConfirmed,40),clean(raw.inventoryConfirmationSource,240),boolInt(raw.inventoryRecheckRequired ?? true),clean(raw.supplierLeadTime,180),nullableInt(raw.supplierPriceCents),clean(raw.supplierPriceQuoteDate,40),clean(raw.supplierPriceExpiration,40)).run();
  await audit(db,"shipping_record",recordId,existing?"updated":"created",adminEmail,{sku:catalog.sku,stage,reviewState,stockState,hold:boolInt(raw.hold)});return json(await adminSnapshot(db,adminEmail));
}

async function upsertDestination(request,db,adminEmail){
  const raw=await readBody(request);const recordId=clean(raw.shippingRecordId,120);const record=await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE id=? LIMIT 1").bind(recordId).first();if(!record)return json({error:"Shipping record not found"},404);
  const destination=clean(raw.destination,80)||"Hawaii — General";const existing=await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE shipping_record_id=? AND destination=? LIMIT 1").bind(recordId,destination).first();const destinationId=existing?.id||id("LDEST");const eligibility=enumValue(upper(raw.eligibilityState),ELIGIBILITY_STATES,existing?.eligibility_state||"NOT CHECKED");
  const effectiveSupplierCost=nullableInt(raw.supplierProductCostCents)??nullableInt(record.supplier_price_cents);
  const blockers=routeApprovalBlockers(record,{...raw,supplierProductCostCents:effectiveSupplierCost,destination},eligibility);if(blockers.length)return json({error:"Route approval blocked",blockers},409);
  const costKeys=["supplierProductCostCents","supplierDomesticShippingCents","dgHazmatChargeCents","packagingSurchargeCents","mainlandInlandFreightCents","consolidationHandlingCents","oceanHawaiiFreightCents","terminalAccessorialCents","destinationHandlingCents","lastMileCents","paymentProcessingCents","otherDirectFulfillmentCents","otherShippingCents"];
  const costs=costKeys.map(k=>k==="supplierProductCostCents"?effectiveSupplierCost:nullableInt(raw[k]));const sum=costs.reduce((s,v)=>s+Number(v||0),0);const landed=nullableInt(raw.totalLandedCostCents)??sum;const retail=nullableInt(raw.retailPriceCents);const customerShip=nullableInt(raw.customerShippingChargeCents);const contribution=nullableInt(raw.estimatedGrossContributionCents)??(retail===null?null:retail+Number(customerShip||0)-landed);
  await db.prepare(`INSERT INTO eus_lithium_destination_records (id,shipping_record_id,destination,eligibility_state,carrier,service_method,origin_location,carrier_contact_ref,quote_number,quote_amount_cents,quote_date,quote_expiration,required_documents,required_labels,packaging_notes,terminal_requirements,pickup_delivery_limits,last_verified_date,verified_by,supplier_product_cost_cents,supplier_domestic_shipping_cents,dg_hazmat_charge_cents,packaging_surcharge_cents,mainland_inland_freight_cents,ocean_hawaii_freight_cents,terminal_accessorial_cents,last_mile_cents,other_shipping_cents,total_landed_cost_cents,retail_price_cents,customer_shipping_charge_cents,estimated_gross_margin_cents,internal_notes,created_at,updated_at,updated_by,route_documents_status,carrier_acceptance_state,provider_reference,consolidation_handling_cents,destination_handling_cents,payment_processing_cents,other_direct_fulfillment_cents,estimated_gross_contribution_cents)
    VALUES (${Array(44).fill('?').join(',')}) ON CONFLICT(shipping_record_id,destination) DO UPDATE SET eligibility_state=excluded.eligibility_state,carrier=excluded.carrier,service_method=excluded.service_method,origin_location=excluded.origin_location,carrier_contact_ref=excluded.carrier_contact_ref,quote_number=excluded.quote_number,quote_amount_cents=excluded.quote_amount_cents,quote_date=excluded.quote_date,quote_expiration=excluded.quote_expiration,required_documents=excluded.required_documents,required_labels=excluded.required_labels,packaging_notes=excluded.packaging_notes,terminal_requirements=excluded.terminal_requirements,pickup_delivery_limits=excluded.pickup_delivery_limits,last_verified_date=excluded.last_verified_date,verified_by=excluded.verified_by,supplier_product_cost_cents=excluded.supplier_product_cost_cents,supplier_domestic_shipping_cents=excluded.supplier_domestic_shipping_cents,dg_hazmat_charge_cents=excluded.dg_hazmat_charge_cents,packaging_surcharge_cents=excluded.packaging_surcharge_cents,mainland_inland_freight_cents=excluded.mainland_inland_freight_cents,ocean_hawaii_freight_cents=excluded.ocean_hawaii_freight_cents,terminal_accessorial_cents=excluded.terminal_accessorial_cents,last_mile_cents=excluded.last_mile_cents,other_shipping_cents=excluded.other_shipping_cents,total_landed_cost_cents=excluded.total_landed_cost_cents,retail_price_cents=excluded.retail_price_cents,customer_shipping_charge_cents=excluded.customer_shipping_charge_cents,estimated_gross_margin_cents=excluded.estimated_gross_margin_cents,internal_notes=excluded.internal_notes,route_documents_status=excluded.route_documents_status,carrier_acceptance_state=excluded.carrier_acceptance_state,provider_reference=excluded.provider_reference,consolidation_handling_cents=excluded.consolidation_handling_cents,destination_handling_cents=excluded.destination_handling_cents,payment_processing_cents=excluded.payment_processing_cents,other_direct_fulfillment_cents=excluded.other_direct_fulfillment_cents,estimated_gross_contribution_cents=excluded.estimated_gross_contribution_cents,updated_at=excluded.updated_at,updated_by=excluded.updated_by`)
    .bind(destinationId,recordId,destination,eligibility,clean(raw.carrier,180),clean(raw.serviceMethod,180),clean(raw.originLocation||record.ship_from_origin,180),clean(raw.carrierContactRef,500),clean(raw.quoteNumber,120),nullableInt(raw.quoteAmountCents),clean(raw.quoteDate,40),clean(raw.quoteExpiration,40),clean(raw.requiredDocuments,3000),clean(raw.requiredLabels,2000),clean(raw.packagingNotes,3000),clean(raw.terminalRequirements,2000),clean(raw.pickupDeliveryLimits,2000),clean(raw.lastVerifiedDate,40),clean(raw.verifiedBy,180),effectiveSupplierCost,nullableInt(raw.supplierDomesticShippingCents),nullableInt(raw.dgHazmatChargeCents),nullableInt(raw.packagingSurchargeCents),nullableInt(raw.mainlandInlandFreightCents),nullableInt(raw.oceanHawaiiFreightCents),nullableInt(raw.terminalAccessorialCents),nullableInt(raw.lastMileCents),nullableInt(raw.otherShippingCents),landed,retail,customerShip,contribution,clean(raw.internalNotes,4000),existing?.created_at||now(),now(),adminEmail,doc(raw.routeDocumentsStatus),check(raw.carrierAcceptanceState),clean(raw.providerReference,500),nullableInt(raw.consolidationHandlingCents),nullableInt(raw.destinationHandlingCents),nullableInt(raw.paymentProcessingCents),nullableInt(raw.otherDirectFulfillmentCents),contribution).run();
  await audit(db,"destination",destinationId,existing?"updated":"created",adminEmail,{sku:record.sku,destination,eligibility,carrierAcceptanceState:check(raw.carrierAcceptanceState)});return json(await adminSnapshot(db,adminEmail));
}

async function updateRequest(request,db,adminEmail,requestId){
  const raw=await readBody(request);const existing=await db.prepare("SELECT * FROM eus_hawaii_lithium_requests WHERE id=? LIMIT 1").bind(requestId).first();if(!existing)return json({error:"Request not found"},404);let productId=clean(raw.assignedProductId??existing.assigned_product_id,120),sku=clean(raw.assignedSku??existing.assigned_sku,180);
  if(productId||sku){const p=await getCatalogProduct(db,productId,sku);if(!p)return json({error:"Assigned product must exist in Catalog Manager"},400);productId=p.id;sku=p.sku;}
  const state=enumValue(upper(raw.state??existing.state),REQUEST_STATES,existing.state),approval=enumValue(upper(raw.customerApprovalState??existing.customer_approval_state),CUSTOMER_APPROVAL_STATES,existing.customer_approval_state),payment=enumValue(upper(raw.paymentState??existing.payment_state),PAYMENT_STATES,existing.payment_state),fulfillment=enumValue(upper(raw.fulfillmentState??existing.fulfillment_state),FULFILLMENT_STATES,existing.fulfillment_state);
  if(fulfillment==="SHIPPED"&&existing.assigned_batch_id){const batch=await db.prepare("SELECT status FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(existing.assigned_batch_id).first();if(!batch||!["IN TRANSIT","ARRIVED","DELIVERING","COMPLETE"].includes(batch.status))return json({error:"An order cannot be marked SHIPPED merely because a batch is booked"},409);}
  const previousApproval=existing.customer_approval_state;const confirmationAt=["APPROVED","ACCEPT DELAY"].includes(approval)&&approval!==previousApproval?now():clean(raw.customerConfirmationAt??existing.customer_confirmation_at,40);const materialChange=boolInt(raw.materialChange);const materialAt=materialChange?now():clean(raw.lastMaterialChangeAt??existing.last_material_change_at,40);const effectiveApproval=materialChange&&["APPROVED","ACCEPT DELAY"].includes(approval)?"PENDING":approval;
  await db.prepare(`UPDATE eus_hawaii_lithium_requests SET state=?,assigned_product_id=?,assigned_sku=?,customer_approval_state=?,payment_state=?,fulfillment_state=?,product_subtotal_cents=?,estimated_shipping_share_cents=?,final_shipping_share_cents=?,staff_owner=?,last_customer_contact=?,next_customer_contact=?,waiting_reason=?,latest_expectation=?,customer_confirmation_at=?,last_material_change_at=?,updated_at=?,updated_by=? WHERE id=?`)
    .bind(state,productId,sku,effectiveApproval,payment,fulfillment,nullableInt(raw.productSubtotalCents)??existing.product_subtotal_cents,raw.estimatedShippingShareCents===undefined?existing.estimated_shipping_share_cents:nullableInt(raw.estimatedShippingShareCents),raw.finalShippingShareCents===undefined?existing.final_shipping_share_cents:nullableInt(raw.finalShippingShareCents),clean(raw.staffOwner??existing.staff_owner,180),clean(raw.lastCustomerContact??existing.last_customer_contact,40),clean(raw.nextCustomerContact??existing.next_customer_contact,40),clean(raw.waitingReason??existing.waiting_reason,500),clean(raw.latestExpectation??existing.latest_expectation,1000),confirmationAt,materialAt,now(),adminEmail,requestId).run();
  await audit(db,"request",requestId,"updated",adminEmail,{state,sku,approval:effectiveApproval,payment,fulfillment,materialChange:Boolean(materialChange)});return json(await adminSnapshot(db,adminEmail));
}

async function batchBlockers(db,batchId){
  const batch=await db.prepare("SELECT * FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first();if(!batch)return["Batch not found"];const rows=(await db.prepare("SELECT * FROM eus_hawaii_batch_orders WHERE batch_id=? ORDER BY batch_sequence,created_at").bind(batchId).all()).results||[];const blockers=[];if(!rows.length)blockers.push("Batch has no reservations assigned");
  if(!batch.freight_provider)blockers.push("Batch freight provider is missing");if(!batch.quote_amount_cents)blockers.push("Batch freight quote is missing");if(quoteExpired(batch.quote_expiration))blockers.push("Batch freight quote is expired");if(!["RECEIVED","VERIFIED"].includes(batch.required_documents_status))blockers.push("Batch required documents are not ready");
  for(const o of rows){const prefix=`${o.sku||o.request_id}: `;if(o.hold){blockers.push(prefix+"line is on HOLD");continue;}const sr=await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE sku=? COLLATE NOCASE LIMIT 1").bind(o.sku).first();if(!sr){blockers.push(prefix+"exact shipping SKU record is missing");continue;}if(!sr.catalog_product_id||!sr.supplier_sku)blockers.push(prefix+"exact Catalog/supplier identity is incomplete");const catalogProduct=await getCatalogProduct(db,sr.catalog_product_id,o.sku);if(!catalogProduct||Number(catalogProduct.cost_cents||0)<=0)blockers.push(prefix+"catalog supplier cost is missing or zero");if(sr.hold)blockers.push(prefix+"product is on HOLD");if(!["AVAILABLE","LOW"].includes(sr.supplier_stock_state)||!sr.inventory_last_confirmed||sr.inventory_recheck_required)blockers.push(prefix+"supplier inventory requires current confirmation");if(sr.damage_recall_notes)blockers.push(prefix+"damage/recall note requires review");
    const dest=await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE shipping_record_id=? AND destination IN (?, 'Hawaii — General') ORDER BY CASE WHEN destination=? THEN 0 ELSE 1 END LIMIT 1").bind(sr.id,o.destination,o.destination).first();if(!dest||dest.eligibility_state!=="APPROVED")blockers.push(prefix+"supported route is not approved");else{if(dest.carrier_acceptance_state!=="PASS")blockers.push(prefix+"provider compatibility is not accepted");if(dest.route_documents_status!=="VERIFIED")blockers.push(prefix+"route documents are incomplete");if(quoteExpired(dest.quote_expiration))blockers.push(prefix+"route quote is expired");if(Number(dest.supplier_product_cost_cents||0)<=0||Number(dest.total_landed_cost_cents||0)<=0||dest.retail_price_cents===null)blockers.push(prefix+"route economics are incomplete or supplier cost is missing");}
    const checks=[o.exact_sku_check,o.packaging_check,o.quantity_check,o.origin_leg_check,o.consolidation_check,o.freight_leg_check,o.terminal_check,o.last_mile_check,o.documents_ready_check,o.supplier_stock_check,o.customer_confirmation_check];if(checks.some(v=>!["PASS","NOT APPLICABLE"].includes(v)))blockers.push(prefix+"batch-line compatibility checks are incomplete");if(!["APPROVED","ACCEPT DELAY"].includes(o.customer_approval_state))blockers.push(prefix+"customer confirmation is not current");const req=await db.prepare("SELECT customer_confirmation_at,last_material_change_at FROM eus_hawaii_lithium_requests WHERE id=?").bind(o.request_id).first();if(req?.last_material_change_at&&(!req.customer_confirmation_at||Date.parse(req.customer_confirmation_at)<Date.parse(req.last_material_change_at)))blockers.push(prefix+"customer must reconfirm after a material change");}
  return [...new Set(blockers)];
}

async function createBatch(request,db,adminEmail){const raw=await readBody(request);const batchId=clean(raw.batchId,80)||`HI-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomUUID().slice(0,6).toUpperCase()}`;if(await db.prepare("SELECT batch_id FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first())return json({error:"Batch ID already exists"},409);const status=enumValue(upper(raw.status),BATCH_STATES,"BUILDING");await db.prepare(`INSERT INTO eus_hawaii_shipping_batches (batch_id,status,destination_island,terminal,freight_provider,service_container_type,quote_reference,quote_amount_cents,quote_date,quote_expiration,estimated_departure_window,estimated_arrival_window,target_units,target_weight_lb,target_volume_cuft,customer_shipping_expected_cents,freight_accessorial_cost_cents,required_documents_status,carrier_review_state,notes,next_action,created_at,updated_at,updated_by) VALUES (${Array(24).fill('?').join(',')})`).bind(batchId,status,clean(raw.destinationIsland,80)||"Hawaii — General",clean(raw.terminal,180),clean(raw.freightProvider,180),clean(raw.serviceContainerType,180),clean(raw.quoteReference,120),nullableInt(raw.quoteAmountCents),clean(raw.quoteDate,40),clean(raw.quoteExpiration,40),clean(raw.estimatedDepartureWindow,120),clean(raw.estimatedArrivalWindow,120),nullableInt(raw.targetUnits),num(raw.targetWeightLb),num(raw.targetVolumeCuft),nullableInt(raw.customerShippingExpectedCents),nullableInt(raw.freightAccessorialCostCents),doc(raw.requiredDocumentsStatus),enumValue(upper(raw.carrierReviewState),ELIGIBILITY_STATES,"RESEARCHING"),clean(raw.notes,4000),clean(raw.nextAction,500),now(),now(),adminEmail).run();await audit(db,"batch",batchId,"created",adminEmail,{status});return json(await adminSnapshot(db,adminEmail));}

async function updateBatch(request,db,adminEmail,batchId){const raw=await readBody(request);const e=await db.prepare("SELECT * FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first();if(!e)return json({error:"Batch not found"},404);const status=enumValue(upper(raw.status??e.status),BATCH_STATES,e.status);if(["READY TO COMMIT","BOOKED"].includes(status)){const blockers=await batchBlockers(db,batchId);if(blockers.length)return json({error:`${status} blocked`,blockers},409);}await db.prepare(`UPDATE eus_hawaii_shipping_batches SET status=?,destination_island=?,terminal=?,freight_provider=?,service_container_type=?,quote_reference=?,quote_amount_cents=?,quote_date=?,quote_expiration=?,estimated_departure_window=?,estimated_arrival_window=?,target_units=?,target_weight_lb=?,target_volume_cuft=?,customer_shipping_expected_cents=?,freight_accessorial_cost_cents=?,required_documents_status=?,carrier_review_state=?,notes=?,next_action=?,updated_at=?,updated_by=? WHERE batch_id=?`).bind(status,clean(raw.destinationIsland??e.destination_island,80),clean(raw.terminal??e.terminal,180),clean(raw.freightProvider??e.freight_provider,180),clean(raw.serviceContainerType??e.service_container_type,180),clean(raw.quoteReference??e.quote_reference,120),raw.quoteAmountCents===undefined?e.quote_amount_cents:nullableInt(raw.quoteAmountCents),clean(raw.quoteDate??e.quote_date,40),clean(raw.quoteExpiration??e.quote_expiration,40),clean(raw.estimatedDepartureWindow??e.estimated_departure_window,120),clean(raw.estimatedArrivalWindow??e.estimated_arrival_window,120),raw.targetUnits===undefined?e.target_units:nullableInt(raw.targetUnits),raw.targetWeightLb===undefined?e.target_weight_lb:num(raw.targetWeightLb),raw.targetVolumeCuft===undefined?e.target_volume_cuft:num(raw.targetVolumeCuft),raw.customerShippingExpectedCents===undefined?e.customer_shipping_expected_cents:nullableInt(raw.customerShippingExpectedCents),raw.freightAccessorialCostCents===undefined?e.freight_accessorial_cost_cents:nullableInt(raw.freightAccessorialCostCents),raw.requiredDocumentsStatus===undefined?e.required_documents_status:doc(raw.requiredDocumentsStatus),raw.carrierReviewState===undefined?e.carrier_review_state:enumValue(upper(raw.carrierReviewState),ELIGIBILITY_STATES,e.carrier_review_state),clean(raw.notes??e.notes,4000),clean(raw.nextAction??e.next_action,500),now(),adminEmail,batchId).run();await audit(db,"batch",batchId,"updated",adminEmail,{status});return json(await adminSnapshot(db,adminEmail));}

async function assignToBatch(request,db,adminEmail,batchId){const raw=await readBody(request);const requestId=clean(raw.requestId,120);const req=await db.prepare("SELECT * FROM eus_hawaii_lithium_requests WHERE id=?").bind(requestId).first();if(!req)return json({error:"Reservation not found"},404);const batch=await db.prepare("SELECT * FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first();if(!batch)return json({error:"Batch not found"},404);if(["COMPLETE","CANCELLED"].includes(batch.status))return json({error:"Cannot assign to a closed batch"},409);const sku=clean(raw.sku||req.assigned_sku,180);if(!sku)return json({error:"Assign an exact catalog SKU before batching this reservation"},400);const p=await getCatalogProduct(db,"",sku);if(!p)return json({error:"Batch SKU must exist in Catalog Manager"},400);const existing=await db.prepare("SELECT * FROM eus_hawaii_batch_orders WHERE request_id=?").bind(requestId).first();const orderId=existing?.id||id("HI-BO");const quantity=Math.max(1,int(raw.quantity??req.quantity,req.quantity||1));
  await db.prepare(`INSERT INTO eus_hawaii_batch_orders (id,batch_id,request_id,batch_sequence,sku,quantity,destination,product_subtotal_cents,estimated_shipping_share_cents,final_shipping_share_cents,customer_approval_state,payment_state,fulfillment_state,allocation_method,allocated_freight_cents,allocation_approved_by,allocation_approved_at,hold,notes,created_at,updated_at,updated_by) VALUES (${Array(22).fill('?').join(',')}) ON CONFLICT(request_id) DO UPDATE SET batch_id=excluded.batch_id,batch_sequence=excluded.batch_sequence,sku=excluded.sku,quantity=excluded.quantity,destination=excluded.destination,product_subtotal_cents=excluded.product_subtotal_cents,estimated_shipping_share_cents=excluded.estimated_shipping_share_cents,final_shipping_share_cents=excluded.final_shipping_share_cents,customer_approval_state=excluded.customer_approval_state,payment_state=excluded.payment_state,fulfillment_state=excluded.fulfillment_state,allocation_method=excluded.allocation_method,allocated_freight_cents=excluded.allocated_freight_cents,hold=excluded.hold,notes=excluded.notes,updated_at=excluded.updated_at,updated_by=excluded.updated_by`).bind(orderId,batchId,requestId,nullableInt(raw.batchSequence),p.sku,quantity,clean(raw.destination||req.island,120),nullableInt(raw.productSubtotalCents)??req.product_subtotal_cents,nullableInt(raw.estimatedShippingShareCents)??req.estimated_shipping_share_cents,nullableInt(raw.finalShippingShareCents)??req.final_shipping_share_cents,enumValue(upper(raw.customerApprovalState||req.customer_approval_state),CUSTOMER_APPROVAL_STATES,req.customer_approval_state),enumValue(upper(raw.paymentState||req.payment_state),PAYMENT_STATES,req.payment_state),enumValue(upper(raw.fulfillmentState||"BATCHED"),FULFILLMENT_STATES,"BATCHED"),enumValue(clean(raw.allocationMethod,20).toLowerCase(),ALLOCATION_METHODS,"manual"),nullableInt(raw.allocatedFreightCents),"","",boolInt(raw.hold),clean(raw.notes,3000),existing?.created_at||now(),now(),adminEmail).run();
  await db.prepare("UPDATE eus_hawaii_lithium_requests SET assigned_batch_id=?,assigned_product_id=?,assigned_sku=?,fulfillment_state='BATCHED',updated_at=?,updated_by=? WHERE id=?").bind(batchId,p.id,p.sku,now(),adminEmail,requestId).run();await audit(db,"batch_order",orderId,existing?"moved_or_updated":"assigned",adminEmail,{batchId,requestId,sku:p.sku,quantity});return json(await adminSnapshot(db,adminEmail));}

async function updateBatchOrder(request,db,adminEmail,orderId){const raw=await readBody(request);const e=await db.prepare("SELECT * FROM eus_hawaii_batch_orders WHERE id=?").bind(orderId).first();if(!e)return json({error:"Batch order not found"},404);const batchId=clean(raw.batchId??e.batch_id,80);if(!(await db.prepare("SELECT batch_id FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first()))return json({error:"Target batch not found"},404);const fulfillment=enumValue(upper(raw.fulfillmentState??e.fulfillment_state),FULFILLMENT_STATES,e.fulfillment_state);if(fulfillment==="SHIPPED"){const b=await db.prepare("SELECT status FROM eus_hawaii_shipping_batches WHERE batch_id=?").bind(batchId).first();if(!["IN TRANSIT","ARRIVED","DELIVERING","COMPLETE"].includes(b?.status))return json({error:"Batch status does not justify SHIPPED; booked is not shipped"},409);}const method=enumValue(clean(raw.allocationMethod??e.allocation_method,20).toLowerCase(),ALLOCATION_METHODS,e.allocation_method);const allocated=raw.allocatedFreightCents===undefined?e.allocated_freight_cents:nullableInt(raw.allocatedFreightCents);const approved=allocated!==null&&(allocated!==e.allocated_freight_cents||method!==e.allocation_method);
  const approval=enumValue(upper(raw.customerApprovalState??e.customer_approval_state),CUSTOMER_APPROVAL_STATES,e.customer_approval_state);const payment=enumValue(upper(raw.paymentState??e.payment_state),PAYMENT_STATES,e.payment_state);
  const fields=["exactSkuCheck","packagingCheck","quantityCheck","originLegCheck","consolidationCheck","freightLegCheck","terminalCheck","lastMileCheck","documentsReadyCheck","supplierStockCheck","customerConfirmationCheck"];const cols=["exact_sku_check","packaging_check","quantity_check","origin_leg_check","consolidation_check","freight_leg_check","terminal_check","last_mile_check","documents_ready_check","supplier_stock_check","customer_confirmation_check"];const values=fields.map((f,i)=>raw[f]===undefined?e[cols[i]]:check(raw[f],e[cols[i]]));
  await db.prepare(`UPDATE eus_hawaii_batch_orders SET batch_id=?,batch_sequence=?,quantity=?,destination=?,estimated_shipping_share_cents=?,final_shipping_share_cents=?,customer_approval_state=?,payment_state=?,fulfillment_state=?,allocation_method=?,allocated_freight_cents=?,allocation_approved_by=?,allocation_approved_at=?,hold=?,notes=?,exact_sku_check=?,packaging_check=?,quantity_check=?,origin_leg_check=?,consolidation_check=?,freight_leg_check=?,terminal_check=?,last_mile_check=?,documents_ready_check=?,supplier_stock_check=?,customer_confirmation_check=?,provider_reference=?,review_recheck_at=?,reviewer=?,blocker_notes=?,updated_at=?,updated_by=? WHERE id=?`)
    .bind(batchId,raw.batchSequence===undefined?e.batch_sequence:nullableInt(raw.batchSequence),raw.quantity===undefined?e.quantity:Math.max(1,int(raw.quantity,e.quantity)),clean(raw.destination??e.destination,120),raw.estimatedShippingShareCents===undefined?e.estimated_shipping_share_cents:nullableInt(raw.estimatedShippingShareCents),raw.finalShippingShareCents===undefined?e.final_shipping_share_cents:nullableInt(raw.finalShippingShareCents),approval,payment,fulfillment,method,allocated,approved?adminEmail:e.allocation_approved_by,approved?now():e.allocation_approved_at,raw.hold===undefined?e.hold:boolInt(raw.hold),clean(raw.notes??e.notes,3000),...values,clean(raw.providerReference??e.provider_reference,500),clean(raw.reviewRecheckAt??e.review_recheck_at,40),clean(raw.reviewer??adminEmail,180),clean(raw.blockerNotes??e.blocker_notes,2000),now(),adminEmail,orderId).run();
  const customerConfirmationAt=["APPROVED","ACCEPT DELAY"].includes(approval)?now():"";await db.prepare("UPDATE eus_hawaii_lithium_requests SET assigned_batch_id=?,estimated_shipping_share_cents=?,final_shipping_share_cents=?,customer_approval_state=?,payment_state=?,fulfillment_state=?,customer_confirmation_at=CASE WHEN ?!='' THEN ? ELSE customer_confirmation_at END,updated_at=?,updated_by=? WHERE id=?").bind(batchId,raw.estimatedShippingShareCents===undefined?e.estimated_shipping_share_cents:nullableInt(raw.estimatedShippingShareCents),raw.finalShippingShareCents===undefined?e.final_shipping_share_cents:nullableInt(raw.finalShippingShareCents),approval,payment,fulfillment,customerConfirmationAt,customerConfirmationAt,now(),adminEmail,e.request_id).run();await audit(db,"batch_order",orderId,"updated",adminEmail,{batchId,method,allocated,fulfillment,approval,compatibility:values});return json(await adminSnapshot(db,adminEmail));}

export async function handleHawaiiLithiumPublicApi(request,env,pathname){try{if(pathname==="/api/hawaii-lithium/requests")return publicRequest(request,env);if(pathname==="/api/hawaii-lithium/statuses")return publicStatuses(request,env);if(pathname==="/api/hawaii-lithium/status")return publicStatus(request,env);return json({error:"Not found"},404);}catch(error){console.error(JSON.stringify({event:"hawaii_lithium_public_error",path:pathname,message:clean(error?.message,300)}));return json({error:"Hawaii Lithium Program is temporarily unavailable"},503);}}
export async function handleHawaiiLithiumAdminApi(request,env,pathname){try{const auth=await requireAdmin(request,env);if(auth.response)return auth.response;if(!sameOrigin(request))return json({error:"Cross-origin request denied"},403);const db=await ensureSchema(env);const admin=auth.session.email;if(pathname==="/api/admin/lithium-shipping"&&request.method==="GET")return json(await adminSnapshot(db,admin));if(pathname==="/api/admin/lithium-shipping/records"&&request.method==="POST")return upsertShippingRecord(request,db,admin);if(pathname==="/api/admin/lithium-shipping/destinations"&&request.method==="POST")return upsertDestination(request,db,admin);let m=pathname.match(/^\/api\/admin\/lithium-shipping\/requests\/([^/]+)$/);if(m&&request.method==="PATCH")return updateRequest(request,db,admin,decodeURIComponent(m[1]));if(pathname==="/api/admin/lithium-shipping/batches"&&request.method==="POST")return createBatch(request,db,admin);m=pathname.match(/^\/api\/admin\/lithium-shipping\/batches\/([^/]+)$/);if(m&&request.method==="PATCH")return updateBatch(request,db,admin,decodeURIComponent(m[1]));m=pathname.match(/^\/api\/admin\/lithium-shipping\/batches\/([^/]+)\/orders$/);if(m&&request.method==="POST")return assignToBatch(request,db,admin,decodeURIComponent(m[1]));m=pathname.match(/^\/api\/admin\/lithium-shipping\/batch-orders\/([^/]+)$/);if(m&&request.method==="PATCH")return updateBatchOrder(request,db,admin,decodeURIComponent(m[1]));return json({error:"Not found"},404);}catch(error){console.error(JSON.stringify({event:"hawaii_lithium_admin_error",path:pathname,message:clean(error?.message,300)}));return json({error:clean(error?.message,240)||"Hawaii Lithium admin request failed"},500);}}
