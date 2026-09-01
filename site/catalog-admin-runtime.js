import { getPromotionConfig, pricingForProduct } from "./promotion-runtime.js";
const DEFAULT_ADMIN_EMAIL = "elevationupscales@gmail.com";
const PUBLISH_STATES = new Set(["draft", "published", "paused", "archived", "hold"]);
const SHIPPING_STATES = new Set(["unverified", "verified", "quote_required", "hold"]);
const SOURCES = new Set(["doba", "ebay", "tiktok", "fourthwall", "other"]);
const FULFILLMENT = new Set(["tracked", "supplier_managed", "dropship", "pod"]);
const STORE_SECTIONS = new Set(["rv-outdoor", "lithium-batteries", "apparel", "other"]);
const JSON_HEADERS = Object.freeze({"Cache-Control":"no-store","Content-Type":"application/json; charset=utf-8","X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","Referrer-Policy":"no-referrer"});

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const int = (value, fallback = 0) => { const n = Number.parseInt(String(value ?? ""), 10); return Number.isFinite(n) ? Math.max(0, n) : fallback; };
const nullableInt = (value) => { if (value === null || value === undefined || value === "") return null; const n = Number.parseInt(String(value), 10); return Number.isFinite(n) && n >= 0 ? n : null; };
const bool = (value) => value === true || ["true","1","yes","y"].includes(clean(value, 12).toLowerCase());
const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...headers } });
const safeJson = (value, fallback) => { try { const parsed = JSON.parse(value || ""); return parsed ?? fallback; } catch (_) { return fallback; } };
const list = (value, maxItems = 20, maxLen = 500) => {
  const values = Array.isArray(value) ? value : clean(value, 3000).split(/[\n,|]+/);
  return [...new Set(values.map((item) => clean(item, maxLen)).filter(Boolean))].slice(0, maxItems);
};

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
async function addColumn(db, sql) { try { await db.prepare(sql).run(); } catch (error) { if (!/duplicate column name/i.test(String(error?.message || error))) throw error; } }

async function ensureSchema(env) {
  const db = env?.MARKETPLACE_DB;
  if (!db || typeof db.prepare !== "function") throw new Error("Catalog storage is not configured");
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_inventory_items (
    id TEXT PRIMARY KEY, sku TEXT NOT NULL COLLATE NOCASE UNIQUE, name TEXT NOT NULL, category TEXT NOT NULL DEFAULT '', supplier TEXT NOT NULL DEFAULT 'other',
    fulfillment_mode TEXT NOT NULL DEFAULT 'tracked', supplier_product_id TEXT NOT NULL DEFAULT '', source_url TEXT NOT NULL DEFAULT '', sales_channels_json TEXT NOT NULL DEFAULT '[]',
    cost_cents INTEGER NOT NULL DEFAULT 0, price_cents INTEGER NOT NULL DEFAULT 0, quantity_on_hand INTEGER NOT NULL DEFAULT 0, quantity_reserved INTEGER NOT NULL DEFAULT 0,
    reorder_point INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'active', notes TEXT NOT NULL DEFAULT '', version INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT ''
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_catalog_meta (
    inventory_item_id TEXT PRIMARY KEY, source_type TEXT NOT NULL DEFAULT 'other', description TEXT NOT NULL DEFAULT '', supplier_sku TEXT NOT NULL DEFAULT '', supplier_stock INTEGER,
    shipping_status TEXT NOT NULL DEFAULT 'unverified', shipping_cents INTEGER, primary_image TEXT NOT NULL DEFAULT '', images_json TEXT NOT NULL DEFAULT '[]', ebay_item_id TEXT NOT NULL DEFAULT '',
    fourthwall_product_id TEXT NOT NULL DEFAULT '', store_section TEXT NOT NULL DEFAULT 'other', publish_status TEXT NOT NULL DEFAULT 'draft', review_state TEXT NOT NULL DEFAULT '',
    created_by TEXT NOT NULL DEFAULT '', updated_by TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
    FOREIGN KEY(inventory_item_id) REFERENCES eus_inventory_items(id)
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_eus_catalog_publish ON eus_catalog_meta(publish_status, updated_at DESC)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_eus_catalog_source ON eus_catalog_meta(source_type, updated_at DESC)").run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_catalog_events (
    id TEXT PRIMARY KEY, inventory_item_id TEXT NOT NULL, sku TEXT NOT NULL DEFAULT '', action TEXT NOT NULL, details_json TEXT NOT NULL DEFAULT '{}', admin_email TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_eus_catalog_events_created ON eus_catalog_events(created_at DESC)").run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_catalog_seed_state (seed_key TEXT PRIMARY KEY, created_at TEXT NOT NULL)`).run();
  return db;
}

const KNOWN_SEED = [
  ["D0102HQ4KJV-861319","Inflatable Movie Screen 20FT Inflatable Projector Screen for outside with 350W","Camping & Outdoor",13500,"D0102HQ4KJV","168646573395","https://image.doba.com/dg7-aBOYSNRpqCJH/dspic.jpg","published",""],
  ["D010277TCB2-470279","VEVOR Super Bright Rechargeable 200,000 Lumens LED Spotlight for Outdoor Use","Camping & Outdoor",3498,"D010277TCB2","168631043193","https://img.vevorstatic.com/us/DGYWSJGDXDTKA7G1TV9/goods_img_big-v1/rechargeable-spotlight-m100-1.2.jpg?format=webp&timestamp=1731314531000","published",""],
  ["D01027HXHHA-472564","8L Hot Water Heater Tankless Instant Boiler Outdoor","RV Parts & Accessories",19433,"D01027HXHHA","168631039073","https://utedusjer.no/cdn/shop/products/8liter-min.jpg?v=1654023433&width=1024","published",""],
  ["D0102HRMZW6-224407","VEVOR Portable Walk-In Greenhouse 20' x 10' Hot House with Steel Hoops & Windows","Camping & Outdoor",13455,"D0102HRMZW6","168631036536","https://image.vevor.com/us/YDSDWS20107FTYBYXV0/original_img-v3/tunnel-greenhouse-m100-1.1.jpg?timestamp=1670940797747","published",""],
  ["D0102HGWKXG-682100","12V Electric Scissor Car Jack & Impact Wrench for Easy Tire Changes","RV Parts & Accessories",5712,"D0102HGWKXG","168631025949","https://s.alicdn.com/@sc04/kf/H90a98af76a91418698eb173453b5254e8/Factory-Price-Tool-Car-12-Volt-2T-35CM-Scissor-Jack-Electric-Wrench-Suit-with-Hydraulic-Repair-Kit-for-Suv.jpg","published",""],
  ["D0102H2V6BY-183069","VEVOR High-Performance 12V Water Diaphragm Pump - 5.5 GPM & 70 PSI Adjustable","Solar & Off-Grid",7999,"D0102H2V6BY","168631017090","https://i5.walmartimages.com/seo/12V-DC-Water-Diaphragm-Pump-5-5-GPM-Flow-70-PSI-Adjustable-Pressure-1-2-Inch-MNPT-Self-Priming-Sprayer-Pump-Pressure-Switch-RV-Camper-Marine-Boat-Law_40f43dd1-549d-4fdc-8f7d-09eb9ce7335e.284e7e762ebd053ff57d3a6a81651e3b.jpeg","published",""],
  ["D01027HX25W-351940","VEVOR Heavy-Duty 5.3 Gallon Metal Fuel Can with Spout & Comfort Handle","RV Parts & Accessories",3676,"D01027HX25W","168631006501","https://mobileimages.lowes.com/productimages/a4c0c39c-7115-4e98-9513-904d908abebf/63612904.jpg","published",""],
  ["D01027HHGCG-645458","Vevor Portable 5 Gallon Fuel Container with Spout for Cars and Motorcycles, Red","RV Parts & Accessories",6500,"D01027HHGCG","168631001484","https://img.vevorstatic.com/fr%2FSLBXSYXJYK1JNR1TZ001V0%2Fgoods_img-v1%2Ffuel-container-m100-11.jpg?format=webp&timestamp=1761184923000","published",""],
  ["D0102HHVH7A-285520","3 x 3m Waterproof Tent with Spiral Tubes White","Camping & Outdoor",4987,"D0102HHVH7A","168631041650","https://image.doba.com/dg7-KCrDnYPBiFov/3-x-3m-three-sides-waterproof-tent-with-spiral-tubes-white.webp","hold","PRICE MISMATCH: Doba website $49.87 vs eBay export $35.98"],
  ["D0102HGKRVV-521042","VEVOR 21-Inch Heavy Duty Lawn Sweeper with Durable Mesh Collection Bag","Camping & Outdoor",6999,"D0102HGKRVV","168637439895","https://mobileimages.lowes.com/productimages/34ac52e8-4fd6-48f9-97fa-4b2f8bcf34f7/66274568.jpeg?size=pdhism","hold","SKU MISMATCH + prior inventory sync failure"],
  ["D0102HPBE86-428316","Quick Set Brown Pop-Up Gazebo Tent with Removable Wind Cloths","Camping & Outdoor",21500,"D0102HPBE86","168631058246","https://www.mathishome.com/on/demandware.static/-/Sites-mathisbrothers-master/default/dwa79f59f4/hires/9a1a70ce445543358d7c4f5c6d9ae114.jpg","hold","Conflicting prior inventory snapshots; recheck current Doba state"]
];

const KNOWN_DOBA_COST_REFERENCE = new Map([
  ["D0102HQ4KJV-861319",10392],
  ["D010277TCB2-470279",2872],
  ["D01027HXHHA-472564",15789],
  ["D0102HRMZW6-224407",11759],
  ["D0102HGWKXG-682100",4712],
  ["D0102H2V6BY-183069",5192],
  ["D01027HX25W-351940",2312],
  ["D01027HHGCG-645458",5439],
  ["D0102HHVH7A-285520",3519],
  ["D0102HGKRVV-521042",6152],
  ["D0102HPBE86-428316",15992],
]);

async function backfillKnownDobaCosts(db) {
  const actor = "system-cost-reconcile";
  const createdAt = new Date().toISOString();
  for (const [sku,costCents] of KNOWN_DOBA_COST_REFERENCE) {
    const row = await db.prepare("SELECT id,sku,cost_cents,quantity_on_hand,quantity_reserved FROM eus_inventory_items WHERE sku=? COLLATE NOCASE LIMIT 1").bind(sku).first();
    if (!row || Number(row.cost_cents || 0) > 0) continue;
    const result = await db.prepare("UPDATE eus_inventory_items SET cost_cents=?,version=version+1,updated_at=?,updated_by=? WHERE id=? AND (cost_cents IS NULL OR cost_cents<=0)")
      .bind(costCents,createdAt,actor,row.id).run();
    if (!result?.meta?.changes) continue;
    const details = JSON.stringify({ changed:["costCents"], source:"2026-08-28 Doba supplier snapshot", note:"Last-known supplier cost backfill; recheck before supplier purchase" });
    await db.prepare("INSERT INTO eus_catalog_events (id,inventory_item_id,sku,action,details_json,admin_email,created_at) VALUES (?,?,?,?,?,?,?)")
      .bind(`cat_evt_${crypto.randomUUID()}`,row.id,sku,"supplier_cost_backfilled",details,actor,createdAt).run().catch(()=>{});
    await db.prepare("INSERT INTO eus_inventory_events (id,item_id,sku,action,quantity_before,quantity_after,reserved_before,reserved_after,details_json,admin_email,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
      .bind(`inv_evt_${crypto.randomUUID()}`,row.id,sku,"supplier_cost_backfilled",Number(row.quantity_on_hand||0),Number(row.quantity_on_hand||0),Number(row.quantity_reserved||0),Number(row.quantity_reserved||0),details,actor,createdAt).run().catch(()=>{});
  }
}

function baseStatus(publishStatus) { return publishStatus === "published" ? "active" : publishStatus === "archived" ? "archived" : "paused"; }
function normalizeSource(value) { const source = clean(value, 30).toLowerCase(); return SOURCES.has(source) ? source : "other"; }
function baseSupplier(source, value) {
  const supplied = clean(value, 30).toLowerCase();
  if (["doba","fourthwall","printful","spreadconnect","self-stock","other"].includes(supplied)) return supplied;
  if (source === "doba" || source === "fourthwall") return source;
  return "other";
}
function normalizeRecord(raw = {}, sourceHint = "other") {
  const sourceType = normalizeSource(raw.sourceType || raw.source || sourceHint);
  const sku = clean(raw.sku || raw.supplierSku || raw.storeSku || raw.customLabel, 80);
  const title = clean(raw.title || raw.name || raw.productTitle, 180);
  const publishStatusRaw = clean(raw.publishStatus || raw.status, 30).toLowerCase();
  const publishStatus = PUBLISH_STATES.has(publishStatusRaw) ? publishStatusRaw : "draft";
  const shippingRaw = clean(raw.shippingStatus, 30).toLowerCase();
  const shippingStatus = SHIPPING_STATES.has(shippingRaw) ? shippingRaw : "unverified";
  const modeRaw = clean(raw.fulfillmentMode, 40).toLowerCase();
  const fulfillmentMode = FULFILLMENT.has(modeRaw) ? modeRaw : (sourceType === "fourthwall" ? "pod" : sourceType === "doba" ? "dropship" : "supplier_managed");
  const sectionRaw = clean(raw.storeSection, 50).toLowerCase();
  const storeSection = STORE_SECTIONS.has(sectionRaw) ? sectionRaw : (sourceType === "fourthwall" ? "apparel" : "rv-outdoor");
  const images = list(raw.images || raw.additionalImages, 10, 700);
  const primaryImage = clean(raw.primaryImage || raw.image || raw.imageUrl, 700);
  if (primaryImage && !images.includes(primaryImage)) images.unshift(primaryImage);
  return {
    id: clean(raw.id || raw.elevationProductId, 100), sku, title, description: clean(raw.description, 5000), category: clean(raw.category, 120), sourceType,
    supplier: baseSupplier(sourceType, raw.supplier), supplierProductId: clean(raw.supplierProductId || raw.itemNo || raw.productId, 180), supplierSku: clean(raw.supplierSku || sku, 180),
    supplierCostCents: int(raw.supplierCostCents ?? raw.costCents, 0), priceCents: int(raw.priceCents, 0), supplierStock: nullableInt(raw.supplierStock ?? raw.inventory),
    fulfillmentMode, shippingStatus, shippingCents: shippingStatus === "verified" ? nullableInt(raw.shippingCents) : null, primaryImage, images: images.slice(0,10),
    sourceUrl: clean(raw.sourceUrl || raw.url, 700), ebayItemId: clean(raw.ebayItemId, 30), fourthwallProductId: clean(raw.fourthwallProductId, 180),
    salesChannels: list(raw.salesChannels?.length ? raw.salesChannels : (sourceType === "ebay" ? ["ebay"] : sourceType === "tiktok" ? ["tiktok"] : ["website"]), 12, 80), storeSection, publishStatus,
    status: publishStatus === "archived" ? "archived" : publishStatus === "published" ? "active" : "paused", internalNotes: clean(raw.internalNotes || raw.notes, 4000),
    reviewState: clean(raw.reviewState, 160), quantityOnHand: fulfillmentMode === "tracked" ? int(raw.quantityOnHand,0) : 0, quantityReserved: fulfillmentMode === "tracked" ? int(raw.quantityReserved,0) : 0,
    reorderPoint: fulfillmentMode === "tracked" ? int(raw.reorderPoint,0) : 0,
  };
}

function catalogRow(row) {
  return {
    id: clean(row.id,100), sku: clean(row.sku,80), title: clean(row.name,180), description: clean(row.description,5000), category: clean(row.category,120),
    supplier: clean(row.supplier,30), sourceType: clean(row.source_type,30) || "other", fulfillmentMode: clean(row.fulfillment_mode,40), supplierProductId: clean(row.supplier_product_id,180),
    supplierSku: clean(row.supplier_sku,180), supplierCostCents: int(row.cost_cents,0), priceCents: int(row.price_cents,0), supplierStock: row.supplier_stock === null || row.supplier_stock === undefined ? null : int(row.supplier_stock,0),
    shippingStatus: clean(row.shipping_status,30) || "unverified", shippingCents: row.shipping_cents === null || row.shipping_cents === undefined ? null : int(row.shipping_cents,0),
    primaryImage: clean(row.primary_image,700), images: list(safeJson(row.images_json,[]),10,700), sourceUrl: clean(row.source_url,700), ebayItemId: clean(row.ebay_item_id,30),
    fourthwallProductId: clean(row.fourthwall_product_id,180), salesChannels: list(safeJson(row.sales_channels_json,[]),12,80), storeSection: clean(row.store_section,50) || "other",
    publishStatus: clean(row.publish_status,30) || (row.status === "active" ? "published" : "draft"), status: clean(row.status,30), reviewState: clean(row.review_state,160),
    internalNotes: clean(row.notes,4000), quantityOnHand: int(row.quantity_on_hand,0), quantityReserved: int(row.quantity_reserved,0), reorderPoint: int(row.reorder_point,0), version: int(row.version,1),
    createdBy: clean(row.created_by,180), updatedBy: clean(row.catalog_updated_by || row.updated_by,180), createdAt: clean(row.catalog_created_at || row.created_at,80), updatedAt: clean(row.catalog_updated_at || row.updated_at,80)
  };
}

async function logEvent(db, record, action, email, details = {}) {
  await db.prepare("INSERT INTO eus_catalog_events (id,inventory_item_id,sku,action,details_json,admin_email,created_at) VALUES (?,?,?,?,?,?,?)")
    .bind(crypto.randomUUID(), record.id, record.sku, action, JSON.stringify(details), clean(email,180), new Date().toISOString()).run();
}
async function getBySku(db, sku) {
  return db.prepare(`SELECT i.*,m.source_type,m.description,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.images_json,m.ebay_item_id,m.fourthwall_product_id,m.store_section,m.publish_status,m.review_state,m.created_by,m.updated_by AS catalog_updated_by,m.created_at AS catalog_created_at,m.updated_at AS catalog_updated_at
    FROM eus_inventory_items i LEFT JOIN eus_catalog_meta m ON m.inventory_item_id=i.id WHERE i.sku=? COLLATE NOCASE LIMIT 1`).bind(sku).first();
}
async function getById(db, id) {
  return db.prepare(`SELECT i.*,m.source_type,m.description,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.images_json,m.ebay_item_id,m.fourthwall_product_id,m.store_section,m.publish_status,m.review_state,m.created_by,m.updated_by AS catalog_updated_by,m.created_at AS catalog_created_at,m.updated_at AS catalog_updated_at
    FROM eus_inventory_items i LEFT JOIN eus_catalog_meta m ON m.inventory_item_id=i.id WHERE i.id=? LIMIT 1`).bind(id).first();
}

async function upsert(db, raw, sourceHint, adminEmail, action = "upsert") {
  const item = normalizeRecord(raw, sourceHint);
  if (!item.sku) throw new Error("SKU is required");
  if (!item.title) throw new Error(`Product title is required for ${item.sku}`);
  let existing = item.id ? await getById(db,item.id) : null;
  if (!existing) existing = await getBySku(db,item.sku);
  if (existing && raw.supplierCostCents === undefined && raw.costCents === undefined) item.supplierCostCents = Number(existing.cost_cents || 0);
  if (item.sourceType === "doba" && item.publishStatus === "published" && Number(item.supplierCostCents || 0) <= 0) {
    item.publishStatus = "hold";
    item.reviewState = [item.reviewState, "COST MISSING"].filter(Boolean).join(" · ");
    item.internalNotes = [item.internalNotes, "Doba product cannot publish with a missing/zero supplier cost."].filter(Boolean).join("\n");
  }
  const now = new Date().toISOString();
  const id = existing?.id || item.id || `EUS-CAT-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  const createdAt = existing?.created_at || now;
  if (existing) {
    await db.prepare(`UPDATE eus_inventory_items SET sku=?,name=?,category=?,supplier=?,fulfillment_mode=?,supplier_product_id=?,source_url=?,sales_channels_json=?,cost_cents=?,price_cents=?,quantity_on_hand=?,quantity_reserved=?,reorder_point=?,status=?,notes=?,version=version+1,updated_at=?,updated_by=? WHERE id=?`)
      .bind(item.sku,item.title,item.category,item.supplier,item.fulfillmentMode,item.supplierProductId,item.sourceUrl,JSON.stringify(item.salesChannels),item.supplierCostCents,item.priceCents,item.quantityOnHand,item.quantityReserved,item.reorderPoint,baseStatus(item.publishStatus),item.internalNotes,now,adminEmail,id).run();
  } else {
    await db.prepare(`INSERT INTO eus_inventory_items (id,sku,name,category,supplier,fulfillment_mode,supplier_product_id,source_url,sales_channels_json,cost_cents,price_cents,quantity_on_hand,quantity_reserved,reorder_point,status,notes,version,created_at,updated_at,updated_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?,?,?)`)
      .bind(id,item.sku,item.title,item.category,item.supplier,item.fulfillmentMode,item.supplierProductId,item.sourceUrl,JSON.stringify(item.salesChannels),item.supplierCostCents,item.priceCents,item.quantityOnHand,item.quantityReserved,item.reorderPoint,baseStatus(item.publishStatus),item.internalNotes,now,now,adminEmail).run();
  }
  const meta = await db.prepare("SELECT inventory_item_id,created_at,created_by FROM eus_catalog_meta WHERE inventory_item_id=? LIMIT 1").bind(id).first();
  if (meta) {
    await db.prepare(`UPDATE eus_catalog_meta SET source_type=?,description=?,supplier_sku=?,supplier_stock=?,shipping_status=?,shipping_cents=?,primary_image=?,images_json=?,ebay_item_id=?,fourthwall_product_id=?,store_section=?,publish_status=?,review_state=?,updated_by=?,updated_at=? WHERE inventory_item_id=?`)
      .bind(item.sourceType,item.description,item.supplierSku,item.supplierStock,item.shippingStatus,item.shippingCents,item.primaryImage,JSON.stringify(item.images),item.ebayItemId,item.fourthwallProductId,item.storeSection,item.publishStatus,item.reviewState,adminEmail,now,id).run();
  } else {
    await db.prepare(`INSERT INTO eus_catalog_meta (inventory_item_id,source_type,description,supplier_sku,supplier_stock,shipping_status,shipping_cents,primary_image,images_json,ebay_item_id,fourthwall_product_id,store_section,publish_status,review_state,created_by,updated_by,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(id,item.sourceType,item.description,item.supplierSku,item.supplierStock,item.shippingStatus,item.shippingCents,item.primaryImage,JSON.stringify(item.images),item.ebayItemId,item.fourthwallProductId,item.storeSection,item.publishStatus,item.reviewState,adminEmail,adminEmail,createdAt,now).run();
  }
  const record = catalogRow(await getById(db,id));
  await logEvent(db, record, existing ? `${action}_updated` : `${action}_created`, adminEmail, { publishStatus: record.publishStatus, sourceType: record.sourceType }).catch(()=>{});
  return { record, operation: existing ? "UPDATE" : "NEW" };
}

async function seedKnown(db) {
  await backfillKnownDobaCosts(db);
  const key = "catalog-manager-v1-known-mappings";
  if (await db.prepare("SELECT seed_key FROM eus_catalog_seed_state WHERE seed_key=? LIMIT 1").bind(key).first()) return;
  for (const [sku,title,category,priceCents,itemNo,ebayItemId,image,publishStatus,reviewState] of KNOWN_SEED) {
    if (await getBySku(db,sku)) continue;
    await upsert(db, { sku,title,category,sourceType:"doba",supplier:"doba",supplierProductId:itemNo,supplierSku:sku,priceCents,supplierStock:null,fulfillmentMode:"dropship",shippingStatus:"unverified",primaryImage:image,images:[image],sourceUrl:`https://www.ebay.com/itm/${ebayItemId}`,ebayItemId,salesChannels:["website","ebay"],storeSection:"rv-outdoor",publishStatus,reviewState,internalNotes:reviewState }, "doba", "system-seed", "seed");
  }
  await db.prepare("INSERT OR REPLACE INTO eus_catalog_seed_state (seed_key,created_at) VALUES (?,?)").bind(key,new Date().toISOString()).run();
}

async function listCatalog(db) {
  await seedKnown(db);
  const rows = await db.prepare(`SELECT i.*,m.source_type,m.description,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.images_json,m.ebay_item_id,m.fourthwall_product_id,m.store_section,m.publish_status,m.review_state,m.created_by,m.updated_by AS catalog_updated_by,m.created_at AS catalog_created_at,m.updated_at AS catalog_updated_at
    FROM eus_inventory_items i LEFT JOIN eus_catalog_meta m ON m.inventory_item_id=i.id ORDER BY COALESCE(m.updated_at,i.updated_at) DESC, i.name COLLATE NOCASE ASC LIMIT 2500`).all();
  const products = (rows.results || []).map(catalogRow);
  const counts = { total: products.length, published:0, draft:0, paused:0, archived:0, hold:0, needsReview:0 };
  for (const product of products) { if (Object.hasOwn(counts,product.publishStatus)) counts[product.publishStatus] += 1; if (product.publishStatus === "hold" || product.shippingStatus !== "verified" || product.reviewState) counts.needsReview += 1; }
  const eventRows = await db.prepare("SELECT * FROM eus_catalog_events ORDER BY created_at DESC LIMIT 40").all();
  return { products, counts, recentEvents: eventRows.results || [], syncedAt:new Date().toISOString() };
}

async function digest(value) {
  const bytes = new TextEncoder().encode(value); const hash = new Uint8Array(await crypto.subtle.digest("SHA-256",bytes)); return [...hash].map((b)=>b.toString(16).padStart(2,"0")).join("");
}
async function classifyRows(db, rows, source) {
  const normalizedRows = []; const states = [];
  for (const raw of rows.slice(0,1000)) {
    const record = normalizeRecord(raw,source); let state = "NEW"; const reasons = [];
    if (!record.sku || !record.title) { state="ERROR"; reasons.push(!record.sku?"Missing SKU":"Missing title"); }
    else {
      const existing = await getBySku(db,record.sku);
      if (existing) {
        const current = catalogRow(existing); state="MATCHED";
        if (record.supplierSku && current.supplierSku && record.supplierSku.toLowerCase() !== current.supplierSku.toLowerCase()) { state="SKU MISMATCH"; reasons.push("Supplier SKU differs"); }
        else if (record.priceCents && current.priceCents && record.priceCents !== current.priceCents) { state="PRICE MISMATCH"; reasons.push(`Current ${current.priceCents}; import ${record.priceCents}`); }
        else if (record.supplierStock !== null && current.supplierStock !== null && record.supplierStock !== current.supplierStock) { state="INVENTORY MISMATCH"; reasons.push(`Current ${current.supplierStock}; import ${record.supplierStock}`); }
        else state="UPDATE";
      }
      if (record.shippingStatus !== "verified" && !["ERROR","SKU MISMATCH","PRICE MISMATCH","INVENTORY MISMATCH"].includes(state)) { state="SHIPPING UNVERIFIED"; reasons.push("Shipping requires verification before direct checkout"); }
      if (record.publishStatus === "hold") { state="HOLD"; reasons.push(record.reviewState || "Record on hold"); }
    }
    normalizedRows.push(record); states.push({ sku:record.sku, title:record.title, state, reasons });
  }
  const previewToken = await digest(JSON.stringify({source,normalizedRows}));
  return { normalizedRows, states, previewToken };
}

function urlDraft(urlValue) {
  const raw = clean(urlValue,700); let url;
  try { url = new URL(raw); if (!["http:","https:"].includes(url.protocol)) throw new Error("scheme"); } catch (_) { throw new Error("Enter a valid public http(s) product URL"); }
  const host = url.hostname.toLowerCase(); let sourceType="other", supplier="other", ebayItemId="", fourthwallProductId="", supplierProductId="";
  if (host.includes("ebay.")) { sourceType="ebay"; const match=url.pathname.match(/\/itm\/(?:[^/]+\/)?(\d{12})/); ebayItemId=match?.[1]||""; }
  else if (host.includes("fourthwall")) { sourceType="fourthwall"; supplier="fourthwall"; fourthwallProductId=decodeURIComponent(url.pathname.split("/").filter(Boolean).pop()||""); }
  else if (host.includes("doba.")) { sourceType="doba"; supplier="doba"; supplierProductId=clean(url.searchParams.get("itemNo")||url.searchParams.get("id"),180); }
  const slug = decodeURIComponent(url.pathname.split("/").filter(Boolean).pop()||"").replace(/[-_]+/g," ").replace(/\b\w/g,(m)=>m.toUpperCase()).slice(0,180);
  return normalizeRecord({ sourceType,supplier,title:slug,sourceUrl:url.toString(),ebayItemId,fourthwallProductId,supplierProductId,publishStatus:"draft",shippingStatus:"unverified",storeSection:sourceType==="fourthwall"?"apparel":"rv-outdoor",reviewState:"URL import draft — verify product data before publishing" },sourceType);
}

async function readBody(request) { try { return await request.json(); } catch (_) { return {}; } }

export async function handleCatalogAdminApi(request, env, pathname) {
  const auth = await requireAdmin(request, env); if (auth.response) return auth.response;
  if (!sameOrigin(request) && request.method !== "GET" && request.method !== "HEAD") return json({error:"Cross-origin request denied"},403);
  let db; try { db = await ensureSchema(env); } catch (error) { return json({error:clean(error?.message,300)||"Catalog storage unavailable"},503); }
  const path = clean(pathname,300);

  if (path === "/api/admin/catalog" && ["GET","HEAD"].includes(request.method)) {
    const snapshot = await listCatalog(db); const payload={ok:true,...snapshot,admin:auth.session.email}; return request.method==="HEAD"?new Response(null,{status:200,headers:JSON_HEADERS}):json(payload);
  }
  if (path === "/api/admin/catalog" && request.method === "POST") {
    const body=await readBody(request); try { const result=await upsert(db,body.product||body,body.sourceType||body.source,auth.session.email,"single"); return json({ok:true,...result,...await listCatalog(db)},result.operation==="NEW"?201:200); }
    catch(error){ return json({error:clean(error?.message,300)||"Product could not be saved"},400); }
  }
  if (path === "/api/admin/catalog/preview" && request.method === "POST") {
    const body=await readBody(request); const source=normalizeSource(body.source); if(!Array.isArray(body.rows)||!body.rows.length)return json({error:"Paste or upload at least one product row"},400);
    const preview=await classifyRows(db,body.rows,source); return json({ok:true,source,...preview});
  }
  if (path === "/api/admin/catalog/import" && request.method === "POST") {
    const body=await readBody(request); const source=normalizeSource(body.source); if(!Array.isArray(body.rows)||!body.rows.length)return json({error:"No previewed rows supplied"},400);
    const preview=await classifyRows(db,body.rows,source); if(!body.previewToken||body.previewToken!==preview.previewToken)return json({error:"Import preview changed. Preview the rows again before importing."},409);
    const allowed=new Set(["NEW","UPDATE","MATCHED","SHIPPING UNVERIFIED"]); const results=[];
    for(let i=0;i<preview.normalizedRows.length;i+=1){ const state=preview.states[i]?.state; if(!allowed.has(state)){results.push({sku:preview.normalizedRows[i].sku,state,imported:false});continue;} try{const saved=await upsert(db,preview.normalizedRows[i],source,auth.session.email,"bulk");results.push({sku:saved.record.sku,state:saved.operation,imported:true});}catch(error){results.push({sku:preview.normalizedRows[i].sku,state:"ERROR",error:clean(error?.message,200),imported:false});} }
    return json({ok:true,results,...await listCatalog(db)});
  }
  if (path === "/api/admin/catalog/url-draft" && request.method === "POST") {
    const body=await readBody(request); try { return json({ok:true,draft:urlDraft(body.url),metadataStatus:"manual_review_required",message:"Draft created from public URL identifiers. Verify all product fields before publishing."}); }
    catch(error){return json({error:clean(error?.message,300)||"URL draft could not be created"},400);}
  }
  const statusMatch=path.match(/^\/api\/admin\/catalog\/([^/]+)\/status$/);
  if(statusMatch&&request.method==="PATCH"){
    const id=decodeURIComponent(statusMatch[1]); const body=await readBody(request); const publishStatus=clean(body.publishStatus,30).toLowerCase(); if(!PUBLISH_STATES.has(publishStatus))return json({error:"Invalid publish status"},400);
    const existing=await getById(db,id); if(!existing)return json({error:"Catalog product not found"},404); const current=catalogRow(existing);
    try{const saved=await upsert(db,{...current,publishStatus,reviewState:clean(body.reviewState??current.reviewState,160)},current.sourceType,auth.session.email,"status");return json({ok:true,record:saved.record,...await listCatalog(db)});}catch(error){return json({error:clean(error?.message,300)},400);}
  }
  return json({error:"Catalog admin endpoint not found"},404);
}


export async function handleCatalogPublicApi(request, env, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  let db;
  try { db = await ensureSchema(env); await seedKnown(db); }
  catch (error) { return json({ products: [], count: 0, error: clean(error?.message, 240) || "Catalog unavailable" }, 503); }
  const url = new URL(request.url);
  const requestedSection = clean(url.searchParams.get("section") || "", 50).toLowerCase();
  const allowedSection = STORE_SECTIONS.has(requestedSection) ? requestedSection : "";
  const where = allowedSection ? "WHERE m.publish_status='published' AND m.store_section=?" : "WHERE m.publish_status='published'";
  const query = `SELECT i.*,m.source_type,m.description,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.images_json,m.ebay_item_id,m.fourthwall_product_id,m.store_section,m.publish_status,m.review_state,m.created_by,m.updated_by AS catalog_updated_by,m.created_at AS catalog_created_at,m.updated_at AS catalog_updated_at FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id ${where} ORDER BY m.updated_at DESC LIMIT 200`;
  const result = allowedSection ? await db.prepare(query).bind(allowedSection).all() : await db.prepare(query).all();
  const promotionConfig = await getPromotionConfig(env);
  const products = (result.results || []).map(catalogRow).map((p) => {
    const priced = pricingForProduct(p, promotionConfig);
    return {
      id: p.id, sku: p.sku, title: p.title, description: p.description, category: p.category,
      supplier: p.supplier, sourceType: p.sourceType, fulfillmentMode: p.fulfillmentMode,
      priceCents: priced.priceCents, supplierStock: p.supplierStock, shippingStatus: p.shippingStatus,
      shippingCents: p.shippingCents, primaryImage: p.primaryImage, images: p.images,
      sourceUrl: p.sourceUrl, ebayItemId: p.ebayItemId, salesChannels: p.salesChannels,
      storeSection: p.storeSection, publishStatus: p.publishStatus, updatedAt: p.updatedAt, promotion: priced.promotion
    };
  });
  return json({ products, count: products.length, section: allowedSection || "all" }, 200, { "Cache-Control": "public, max-age=30, s-maxage=60" });
}
