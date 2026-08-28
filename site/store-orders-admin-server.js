const DEFAULT_ADMIN_EMAIL = "elevationupscales@gmail.com";
const ORDER_STATUSES = new Set(["pending", "paid", "fulfillment_pending", "supplier_ordered", "shipped", "completed", "hold_issue", "refund_needed", "refunded", "cancelled"]);

const JSON_HEADERS = Object.freeze({
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
});

function json(data, status = 200, extraHeaders = {}) { return new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...extraHeaders } }); }
function clean(value, max = 500) { return String(value ?? "").trim().slice(0, max); }
function sameOriginRequest(request) { const origin = clean(request.headers.get("Origin"), 500); if (!origin) return true; try { return origin === new URL(request.url).origin; } catch (_) { return false; } }
function cookie(request, name) { const raw = request.headers.get("Cookie") || ""; for (const part of raw.split(";")) { const [key, ...value] = part.trim().split("="); if (key === name) return decodeURIComponent(value.join("=")); } return ""; }
function base64UrlToString(value) { const normalized = String(value || "").replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - (String(value || "").length % 4)) % 4); const binary = atob(normalized); return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0))); }
function bytesToBase64Url(bytes) { let binary = ""; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""); }
async function hmacSignature(secret, payload) { const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)); return bytesToBase64Url(new Uint8Array(signature)); }
function timingSafeEqualStrings(a, b) { const left = new TextEncoder().encode(String(a ?? "")); const right = new TextEncoder().encode(String(b ?? "")); if (left.byteLength !== right.byteLength) return false; let diff = 0; for (let i = 0; i < left.byteLength; i += 1) diff |= left[i] ^ right[i]; return diff === 0; }
async function readAdminSession(request, env) { const token = cookie(request, "eus_admin_session"); const secret = clean(env?.ADMIN_SESSION_SECRET, 500); const adminEmail = clean(env?.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL, 180).toLowerCase(); if (!token || !secret) return null; const [payload, signature, extra] = token.split("."); if (!payload || !signature || extra) return null; const expected = await hmacSignature(secret, payload); if (!timingSafeEqualStrings(signature, expected)) return null; try { const data = JSON.parse(base64UrlToString(payload)); if (!data?.email || Number(data.exp) < Date.now() || String(data.email).toLowerCase() !== adminEmail) return null; return { email: String(data.email).toLowerCase() }; } catch (_) { return null; } }
async function requireAdmin(request, env) { const session = await readAdminSession(request, env); if (!session) return { response: json({ error: "Admin login required" }, 401) }; return { session }; }
async function addColumn(db, sql) { try { await db.prepare(sql).run(); } catch (error) { if (!/duplicate column name/i.test(String(error?.message || error))) throw error; } }

async function ensureOrderOpsSchema(env) {
  const db = env?.MARKETPLACE_DB;
  if (!db || typeof db.prepare !== "function") return false;
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_store_orders (
      id TEXT PRIMARY KEY, source TEXT NOT NULL, product_id TEXT NOT NULL, product_name TEXT NOT NULL, variant_id TEXT, variant_name TEXT, quantity INTEGER NOT NULL,
      unit_price_cents INTEGER NOT NULL, merchandise_cents INTEGER NOT NULL, shipping_cents INTEGER NOT NULL, total_cents INTEGER NOT NULL, customer_json TEXT NOT NULL,
      shipping_json TEXT NOT NULL, supplier_json TEXT NOT NULL, paypal_order_id TEXT UNIQUE, paypal_capture_id TEXT, payment_status TEXT NOT NULL, created_at TEXT NOT NULL, paid_at TEXT
    )`).run();
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN fulfillment_status TEXT DEFAULT 'pending'");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN supplier_order_id TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN tracking_number TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN carrier TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN fulfillment_notes TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN updated_at TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN refunded_at TEXT");
  return true;
}
function parseJson(value) { try { const parsed = JSON.parse(value || "{}"); return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}; } catch (_) { return {}; } }
function normalizedStatus(row) { const stored = clean(row?.fulfillment_status, 40).toLowerCase(); if (ORDER_STATUSES.has(stored) && stored !== "pending") return stored; return clean(row?.payment_status, 40).toLowerCase() === "completed" ? "fulfillment_pending" : (ORDER_STATUSES.has(stored) ? stored : "pending"); }
function orderRecord(row) {
  const customer = parseJson(row.customer_json); const shipping = parseJson(row.shipping_json); const supplier = parseJson(row.supplier_json);
  return {
    id: clean(row.id, 120), source: clean(row.source, 30), productId: clean(row.product_id, 180), productName: clean(row.product_name, 260), variantId: clean(row.variant_id, 180), variantName: clean(row.variant_name, 220),
    quantity: Number(row.quantity || 0), unitPriceCents: Number(row.unit_price_cents || 0), merchandiseCents: Number(row.merchandise_cents || 0), shippingCents: Number(row.shipping_cents || 0), totalCents: Number(row.total_cents || 0),
    customer, shipping, supplier, paypalOrderId: clean(row.paypal_order_id, 100), paypalCaptureId: clean(row.paypal_capture_id, 100), paymentStatus: clean(row.payment_status, 40).toLowerCase(), fulfillmentStatus: normalizedStatus(row),
    supplierOrderId: clean(row.supplier_order_id, 160), trackingNumber: clean(row.tracking_number, 180), carrier: clean(row.carrier, 120), fulfillmentNotes: clean(row.fulfillment_notes, 2000),
    elevationSku: clean(row.elevation_sku || supplier.skuId, 180), supplierCostCents: Number(row.supplier_cost_cents || 0), sourceUrl: clean(row.catalog_source_url, 700),
    createdAt: clean(row.created_at, 50), paidAt: clean(row.paid_at, 50), updatedAt: clean(row.updated_at, 50), refundedAt: clean(row.refunded_at, 50),
  };
}
function counts(orders) { const result = { total: orders.length, paid: 0, fulfillment_pending: 0, supplier_ordered: 0, shipped: 0, completed: 0, hold_issue: 0, refund_needed: 0, refunded: 0 }; for (const order of orders) { if (order.paymentStatus === "completed") result.paid += 1; if (Object.hasOwn(result, order.fulfillmentStatus)) result[order.fulfillmentStatus] += 1; } return result; }

async function listOrders(request, env) {
  const auth = await requireAdmin(request, env); if (auth.response) return auth.response;
  if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  if (!await ensureOrderOpsSchema(env)) return json({ error: "Store order storage is not configured" }, 503);
  const rows = await env.MARKETPLACE_DB.prepare(`SELECT o.*, i.sku AS elevation_sku, i.cost_cents AS supplier_cost_cents, i.source_url AS catalog_source_url
      FROM eus_store_orders o
      LEFT JOIN eus_inventory_items i ON lower(i.sku)=lower(json_extract(o.supplier_json,'$.skuId'))
      ORDER BY COALESCE(o.paid_at, o.created_at) DESC LIMIT 500`).all().catch(async () => env.MARKETPLACE_DB.prepare("SELECT * FROM eus_store_orders ORDER BY COALESCE(paid_at, created_at) DESC LIMIT 500").all());
  const orders = (rows.results || []).map(orderRecord); const payload = { ok: true, orders, counts: counts(orders), admin: auth.session.email };
  return request.method === "HEAD" ? new Response(null, { status: 200, headers: JSON_HEADERS }) : json(payload);
}

async function updateOrder(request, env, id) {
  const auth = await requireAdmin(request, env); if (auth.response) return auth.response;
  if (request.method !== "PATCH") return json({ error: "Method not allowed" }, 405, { Allow: "PATCH" });
  if (!sameOriginRequest(request)) return json({ error: "Cross-origin request denied" }, 403);
  if (!await ensureOrderOpsSchema(env)) return json({ error: "Store order storage is not configured" }, 503);
  const orderId = clean(id, 120); if (!/^EUS-STORE-\d{8}-[A-F0-9]{8}$/.test(orderId)) return json({ error: "Invalid store order reference" }, 400);
  const body = await request.json().catch(() => ({})); const status = clean(body.fulfillmentStatus, 40).toLowerCase(); if (!ORDER_STATUSES.has(status)) return json({ error: "Invalid fulfillment status" }, 400);
  const supplierOrderId = clean(body.supplierOrderId, 160); const trackingNumber = clean(body.trackingNumber, 180); const carrier = clean(body.carrier, 120); const fulfillmentNotes = clean(body.fulfillmentNotes, 2000); const now = new Date().toISOString(); const refundedAt = status === "refunded" ? now : null;
  const result = await env.MARKETPLACE_DB.prepare(`UPDATE eus_store_orders SET fulfillment_status=?, supplier_order_id=?, tracking_number=?, carrier=?, fulfillment_notes=?, updated_at=?, refunded_at=COALESCE(?, refunded_at) WHERE id=?`)
    .bind(status, supplierOrderId, trackingNumber, carrier, fulfillmentNotes, now, refundedAt, orderId).run();
  if (!Number(result?.meta?.changes || 0)) return json({ error: "Store order not found" }, 404);
  const row = await env.MARKETPLACE_DB.prepare(`SELECT o.*, i.sku AS elevation_sku, i.cost_cents AS supplier_cost_cents, i.source_url AS catalog_source_url FROM eus_store_orders o LEFT JOIN eus_inventory_items i ON lower(i.sku)=lower(json_extract(o.supplier_json,'$.skuId')) WHERE o.id=? LIMIT 1`).bind(orderId).first().catch(() => env.MARKETPLACE_DB.prepare("SELECT * FROM eus_store_orders WHERE id=? LIMIT 1").bind(orderId).first());
  return json({ ok: true, order: orderRecord(row), updatedBy: auth.session.email });
}

export async function handleStoreOrdersAdminApi(request, env, pathname) {
  const path = clean(pathname, 260); if (path === "/api/admin/store-orders") return listOrders(request, env);
  const match = path.match(/^\/api\/admin\/store-orders\/(EUS-STORE-\d{8}-[A-F0-9]{8})$/i); if (match) return updateOrder(request, env, match[1].toUpperCase());
  return json({ error: "Store order admin endpoint not found" }, 404);
}
