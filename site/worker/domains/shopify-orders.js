import { ensureCommerceSchema } from "../../commerce-schema-migrations.js";
import { SOK_FULL_LINE_PUBLIC } from "../../sok-full-line-data.js";
import { jsonResponse, readAdminSession, sameOriginRequest } from "../core-context.js";

export const SHOPIFY_PAID_WEBHOOK_PATH = "/api/shopify/webhooks/orders-paid";
export const SHOPIFY_RECONCILE_PATH = "/api/admin/shopify-orders/reconcile";
const MAX_WEBHOOK_BYTES = 2_000_000;
const SOK_BY_SKU = new Map(SOK_FULL_LINE_PUBLIC.map((product) => [String(product?.sku || "").trim().toUpperCase(), product]).filter(([sku]) => sku));

function clean(value, max = 500) { return String(value ?? "").trim().slice(0, max); }
function upper(value, max = 180) { return clean(value, max).toUpperCase(); }
function moneyToCents(value) {
  const raw = typeof value === "object" && value !== null ? (value.amount ?? value.value ?? "") : value;
  const parsed = Number.parseFloat(String(raw ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed * 100)) : 0;
}
function quantity(value) { const parsed = Number.parseInt(String(value ?? "1"), 10); return Number.isInteger(parsed) && parsed > 0 ? parsed : 1; }
function safeIso(value, fallback = "") { const raw = clean(value, 80); if (!raw) return fallback; const date = new Date(raw); return Number.isNaN(date.valueOf()) ? fallback : date.toISOString(); }
function normalizeShopDomain(value) { return clean(value, 255).toLowerCase().replace(/^https?:\/\//, "").replace(/\/$/, ""); }
function bytesToHex(bytes) { return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(""); }
function base64ToBytes(value) {
  const normalized = clean(value, 512).replace(/\s+/g, "");
  if (!normalized) return new Uint8Array();
  const binary = atob(normalized);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
function constantTimeEqualBytes(left, right) {
  const a = left instanceof Uint8Array ? left : new Uint8Array(left || []);
  const b = right instanceof Uint8Array ? right : new Uint8Array(right || []);
  if (a.byteLength !== b.byteLength) return false;
  let diff = 0;
  for (let index = 0; index < a.byteLength; index += 1) diff |= a[index] ^ b[index];
  return diff === 0;
}
async function verifyShopifyHmac(rawBytes, suppliedHmac, secret) {
  if (!secret || !suppliedHmac) return false;
  let supplied;
  try { supplied = base64ToBytes(suppliedHmac); } catch (_) { return false; }
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = new Uint8Array(await crypto.subtle.sign("HMAC", key, rawBytes));
  return constantTimeEqualBytes(expected, supplied);
}
async function payloadSha256(rawBytes) { return bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", rawBytes))); }
async function deterministicOrderReference(shopDomain, externalOrderId, timestamp) {
  const source = new TextEncoder().encode(`${normalizeShopDomain(shopDomain)}:${clean(externalOrderId, 120)}`);
  const digest = bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", source))).slice(0, 8).toUpperCase();
  const day = (safeIso(timestamp, new Date().toISOString()) || new Date().toISOString()).slice(0, 10).replaceAll("-", "");
  return `EUS-STORE-${day}-${digest}`;
}
function lineDiscountCents(line) {
  const allocations = Array.isArray(line?.discount_allocations) ? line.discount_allocations : [];
  return allocations.reduce((sum, allocation) => sum + moneyToCents(allocation?.amount ?? allocation?.amount_set?.shop_money?.amount), 0);
}
function resolveSokLine(line) {
  const sku = upper(line?.sku, 180);
  const product = SOK_BY_SKU.get(sku) || null;
  if (!product) return { isSok: false, sku, supplier: "", supplierDisplay: "", supplierSku: "", catalogProductId: "" };
  return { isSok: true, sku, supplier: "sok", supplierDisplay: "SOK Energy", supplierSku: sku, catalogProductId: clean(product.id, 180) };
}
function normalizeLineItem(line, orderReference, lineIndex, createdAt) {
  const qty = quantity(line?.quantity);
  const unitPriceCents = moneyToCents(line?.price ?? line?.price_set?.shop_money?.amount ?? line?.original_price);
  const lineTotalCents = Math.max(0, (unitPriceCents * qty) - lineDiscountCents(line));
  const mapping = resolveSokLine(line);
  return {
    id: `${orderReference}:L${lineIndex + 1}`,
    orderId: orderReference,
    lineIndex,
    externalLineItemId: clean(line?.id, 120),
    externalProductId: clean(line?.product_id, 120),
    externalVariantId: clean(line?.variant_id, 120),
    elevationSku: mapping.isSok ? mapping.sku : upper(line?.sku, 180),
    supplier: mapping.supplier,
    supplierDisplay: mapping.supplierDisplay,
    supplierSku: mapping.supplierSku,
    catalogProductId: mapping.catalogProductId,
    productTitle: clean(line?.title || line?.name || "Shopify item", 300),
    variantTitle: clean(line?.variant_title, 220),
    quantity: qty,
    unitPriceCents,
    lineTotalCents,
    source: "shopify",
    fulfillmentContext: {
      shopifyFulfillmentStatus: clean(line?.fulfillment_status, 80),
      supplierStockReserved: mapping.isSok ? false : null,
      supplierReservationRule: mapping.isSok ? "SOK stock is reserved only after supplier payment is confirmed" : "",
      catalogProductId: mapping.catalogProductId,
    },
    createdAt,
  };
}
function normalizeCustomer(order) {
  return {
    email: clean(order?.contact_email || order?.email || order?.customer?.email, 180).toLowerCase(),
    phone: clean(order?.phone || order?.customer?.phone || order?.shipping_address?.phone, 60),
  };
}
function normalizeShipping(order) {
  const raw = order?.shipping_address || {};
  return {
    fullName: clean(raw?.name || [raw?.first_name, raw?.last_name].filter(Boolean).join(" "), 160),
    address1: clean(raw?.address1, 180),
    address2: clean(raw?.address2, 180),
    city: clean(raw?.city, 120),
    state: upper(raw?.province_code || raw?.province, 80),
    postalCode: upper(raw?.zip, 30),
    countryCode: upper(raw?.country_code || raw?.country_code_v2 || raw?.country, 2),
  };
}
function headerSupplier(items) {
  const sokItems = items.filter((item) => item.supplier === "sok");
  if (sokItems.length === items.length && items.length) {
    const uniqueSkus = [...new Set(sokItems.map((item) => item.supplierSku).filter(Boolean))];
    return {
      supplier: "sok",
      supplierName: "SOK Energy",
      supplierSku: uniqueSkus.length === 1 ? uniqueSkus[0] : "MULTI-SKU",
      supplierStockReserved: false,
      supplierReservationState: "not_reserved_until_supplier_payment",
      fulfillmentSequence: ["fulfillment_pending", "supplier_ordered", "supplier_released", "shipped", "completed"],
    };
  }
  if (sokItems.length) return { supplier: "mixed", supplierName: "Multiple suppliers", supplierStockReserved: false, containsSok: true };
  return { supplier: "", supplierName: "", salesChannel: "shopify" };
}
function orderTotals(order) {
  return {
    merchandiseCents: moneyToCents(order?.current_subtotal_price ?? order?.subtotal_price),
    shippingCents: moneyToCents(order?.current_shipping_price_set?.shop_money?.amount ?? order?.total_shipping_price_set?.shop_money?.amount),
    taxCents: moneyToCents(order?.current_total_tax ?? order?.total_tax),
    discountCents: moneyToCents(order?.current_total_discounts ?? order?.total_discounts),
    totalPaidCents: moneyToCents(order?.current_total_price ?? order?.total_price),
  };
}
async function prepareShopifyOrder(order, context) {
  const externalOrderId = clean(order?.id, 120);
  if (!externalOrderId) throw new Error("Shopify order ID is required");
  const createdAt = safeIso(order?.created_at, context.receivedAt) || context.receivedAt;
  const paidAt = safeIso(order?.processed_at || order?.updated_at || order?.created_at, context.receivedAt) || context.receivedAt;
  const orderReference = await deterministicOrderReference(context.shopDomain, externalOrderId, paidAt);
  const rawItems = Array.isArray(order?.line_items) ? order.line_items : [];
  if (!rawItems.length) throw new Error("Shopify paid order has no line items");
  const items = rawItems.map((line, index) => normalizeLineItem(line, orderReference, index, createdAt));
  const totals = orderTotals(order);
  const allSok = items.every((item) => item.supplier === "sok");
  const containsSok = items.some((item) => item.supplier === "sok");
  const single = items.length === 1 ? items[0] : null;
  const quantityTotal = items.reduce((sum, item) => sum + item.quantity, 0);
  const externalOrderNumber = clean(order?.name || order?.order_number || order?.confirmation_number, 120);
  const supplier = headerSupplier(items);
  supplier.salesChannel = "shopify";
  supplier.shopifyOrderId = externalOrderId;
  supplier.shopifyOrderReference = externalOrderNumber;
  supplier.items = items.map((item) => ({
    sku: item.elevationSku, supplier: item.supplier, supplierName: item.supplierDisplay, supplierSku: item.supplierSku,
    title: item.productTitle, variant: item.variantTitle, quantity: item.quantity, lineTotalCents: item.lineTotalCents, externalVariantId: item.externalVariantId,
  }));
  return {
    orderReference,
    externalOrderId,
    externalOrderNumber,
    createdAt,
    paidAt,
    customer: normalizeCustomer(order),
    shipping: normalizeShipping(order),
    items,
    totals,
    header: {
      source: "shopify",
      productId: single ? (single.catalogProductId || `shopify:${single.externalVariantId || single.externalProductId || single.externalLineItemId}`) : "shopify-multi",
      productName: single ? single.productTitle : `Shopify order ${externalOrderNumber || externalOrderId} — ${items.length} items`,
      variantId: single?.externalVariantId || "",
      variantName: single?.variantTitle || "",
      quantity: quantityTotal,
      unitPriceCents: single?.unitPriceCents || 0,
      supplier,
      fulfillmentStatus: "fulfillment_pending",
      fulfillmentNotes: containsSok
        ? "Paid Shopify order received. SOK stock is not reserved until Elevation supplier payment is confirmed. Advance to PO Submitted when the supplier order is placed, then Supplier Paid / Released when stock is locked or released for fulfillment."
        : "Paid Shopify order received and ready for fulfillment review.",
      allSok,
      containsSok,
    },
  };
}
async function addColumn(db, sql) {
  try { await db.prepare(sql).run(); }
  catch (error) { if (!/duplicate column name/i.test(String(error?.message || error))) throw error; }
}
async function ensureShopifySchema(env) {
  const db = await ensureCommerceSchema(env);
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN fulfillment_status TEXT DEFAULT 'pending'");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN supplier_order_id TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN tracking_number TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN carrier TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN fulfillment_notes TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN updated_at TEXT");
  await addColumn(db, "ALTER TABLE eus_store_orders ADD COLUMN refunded_at TEXT");
  return db;
}
async function existingExternalOrder(db, shopDomain, externalOrderId) {
  return db.prepare("SELECT order_id FROM eus_store_order_external WHERE sales_channel='shopify' AND lower(shop_domain)=lower(?) AND external_order_id=? LIMIT 1")
    .bind(shopDomain, externalOrderId).first();
}
async function processPaidOrder(env, order, context) {
  const db = await ensureShopifySchema(env);
  const prepared = await prepareShopifyOrder(order, context);
  const existing = await existingExternalOrder(db, context.shopDomain, prepared.externalOrderId);
  if (existing?.order_id) return { duplicateOrder: true, orderReference: clean(existing.order_id, 120), prepared };

  const { header, totals, items } = prepared;
  const statements = [
    db.prepare(`INSERT INTO eus_store_orders
      (id,source,product_id,product_name,variant_id,variant_name,quantity,unit_price_cents,merchandise_cents,shipping_cents,total_cents,customer_json,shipping_json,supplier_json,paypal_order_id,paypal_capture_id,payment_status,created_at,paid_at,fulfillment_status,fulfillment_notes,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(prepared.orderReference, header.source, header.productId, header.productName, header.variantId, header.variantName, header.quantity, header.unitPriceCents,
        totals.merchandiseCents, totals.shippingCents, totals.totalPaidCents, JSON.stringify(prepared.customer), JSON.stringify(prepared.shipping), JSON.stringify(header.supplier),
        null, null, "completed", prepared.createdAt, prepared.paidAt, header.fulfillmentStatus, header.fulfillmentNotes, context.receivedAt),
    db.prepare(`INSERT INTO eus_store_order_external
      (order_id,sales_channel,external_order_id,external_order_number,shop_domain,financial_status,currency,subtotal_cents,shipping_cents,tax_cents,discount_cents,total_paid_cents,external_created_at,external_paid_at,webhook_id,event_id,source_reference,metadata_json,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(prepared.orderReference, "shopify", prepared.externalOrderId, prepared.externalOrderNumber, context.shopDomain,
        clean(order?.financial_status || "paid", 80).toLowerCase(), upper(order?.currency || "USD", 10), totals.merchandiseCents, totals.shippingCents, totals.taxCents, totals.discountCents, totals.totalPaidCents,
        prepared.createdAt, prepared.paidAt, context.webhookId, context.eventId, `sha256:${context.payloadHash}`,
        JSON.stringify({ adminGraphqlApiId: clean(order?.admin_graphql_api_id, 180), checkoutId: clean(order?.checkout_id, 120), containsSok: header.containsSok, allSok: header.allSok }),
        context.receivedAt, context.receivedAt),
  ];
  for (const item of items) {
    statements.push(db.prepare(`INSERT INTO eus_store_order_items
      (id,order_id,line_index,external_line_item_id,external_product_id,external_variant_id,elevation_sku,supplier,supplier_display,supplier_sku,product_title,variant_title,quantity,unit_price_cents,line_total_cents,source,fulfillment_context_json,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(item.id, item.orderId, item.lineIndex, item.externalLineItemId, item.externalProductId, item.externalVariantId, item.elevationSku,
        item.supplier, item.supplierDisplay, item.supplierSku, item.productTitle, item.variantTitle, item.quantity, item.unitPriceCents, item.lineTotalCents,
        item.source, JSON.stringify(item.fulfillmentContext), item.createdAt));
  }
  await db.batch(statements);
  return { duplicateOrder: false, orderReference: prepared.orderReference, prepared };
}
async function handlePaidWebhook(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  const expectedShop = normalizeShopDomain(env?.SHOPIFY_SHOP_DOMAIN);
  const secret = String(env?.SHOPIFY_WEBHOOK_SECRET || "");
  if (!expectedShop || !secret) return jsonResponse({ error: "Shopify webhook is not configured" }, 503);
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_WEBHOOK_BYTES) return jsonResponse({ error: "Webhook payload too large" }, 413);
  const shopDomain = normalizeShopDomain(request.headers.get("X-Shopify-Shop-Domain"));
  if (!shopDomain || shopDomain !== expectedShop) return jsonResponse({ error: "Shopify shop not authorized" }, 403);
  const topic = clean(request.headers.get("X-Shopify-Topic"), 100).toLowerCase();
  if (topic && topic !== "orders/paid") return jsonResponse({ error: "Unexpected Shopify webhook topic" }, 400);
  const webhookId = clean(request.headers.get("X-Shopify-Webhook-Id"), 120);
  const eventId = clean(request.headers.get("X-Shopify-Event-Id"), 120);
  if (!webhookId) return jsonResponse({ error: "Shopify webhook delivery ID is required" }, 400);

  const rawBuffer = await request.arrayBuffer();
  if (rawBuffer.byteLength > MAX_WEBHOOK_BYTES) return jsonResponse({ error: "Webhook payload too large" }, 413);
  const rawBytes = new Uint8Array(rawBuffer);
  const validHmac = await verifyShopifyHmac(rawBytes, request.headers.get("X-Shopify-Hmac-Sha256"), secret);
  if (!validHmac) return jsonResponse({ error: "Invalid Shopify webhook signature" }, 401);

  let order;
  try { order = JSON.parse(new TextDecoder().decode(rawBytes)); }
  catch (_) { return jsonResponse({ error: "Malformed Shopify webhook payload" }, 400); }
  if (!order || typeof order !== "object" || Array.isArray(order)) return jsonResponse({ error: "Malformed Shopify webhook payload" }, 400);

  const receivedAt = new Date().toISOString();
  const payloadHash = await payloadSha256(rawBytes);
  let db;
  try { db = await ensureShopifySchema(env); }
  catch (error) {
    console.error(JSON.stringify({ event: "shopify_paid_schema_error", message: clean(error?.message, 240) }));
    return jsonResponse({ error: "Shopify order storage is not configured" }, 503);
  }

  const receipt = await db.prepare("SELECT webhook_id,status,order_id FROM eus_shopify_webhook_receipts WHERE webhook_id=? LIMIT 1").bind(webhookId).first();
  if (receipt?.status === "processed") return jsonResponse({ ok: true, accepted: true, duplicate: true, orderReference: clean(receipt.order_id, 120) }, 200);
  if (receipt?.status === "processing") return jsonResponse({ ok: true, accepted: true, duplicate: true, processing: true }, 202);

  if (!receipt) {
    await db.prepare(`INSERT INTO eus_shopify_webhook_receipts
      (webhook_id,event_id,topic,shop_domain,external_order_id,order_id,status,attempt_count,last_error,received_at,processed_at,updated_at)
      VALUES (?,?,?,?,?,'','received',1,'',?,NULL,?)`)
      .bind(webhookId, eventId, "orders/paid", shopDomain, clean(order?.id, 120), receivedAt, receivedAt).run();
  } else {
    await db.prepare("UPDATE eus_shopify_webhook_receipts SET status='received',attempt_count=attempt_count+1,last_error='',updated_at=? WHERE webhook_id=?")
      .bind(receivedAt, webhookId).run();
  }
  await db.prepare("UPDATE eus_shopify_webhook_receipts SET status='processing',updated_at=? WHERE webhook_id=?").bind(receivedAt, webhookId).run();

  try {
    const result = await processPaidOrder(env, order, { shopDomain, webhookId, eventId, receivedAt, payloadHash });
    await db.prepare("UPDATE eus_shopify_webhook_receipts SET status='processed',order_id=?,processed_at=?,updated_at=? WHERE webhook_id=?")
      .bind(result.orderReference, new Date().toISOString(), new Date().toISOString(), webhookId).run();
    return jsonResponse({ ok: true, accepted: true, duplicate: result.duplicateOrder, orderReference: result.orderReference }, 200);
  } catch (error) {
    const message = clean(error?.message || error, 240);
    await db.prepare("UPDATE eus_shopify_webhook_receipts SET status='failed',last_error=?,updated_at=? WHERE webhook_id=?").bind(message, new Date().toISOString(), webhookId).run().catch(() => {});
    console.error(JSON.stringify({ event: "shopify_paid_processing_error", webhookId, externalOrderId: clean(order?.id, 120), message }));
    return jsonResponse({ error: "Shopify paid order could not be recorded" }, 500);
  }
}
async function handleReconcile(request, env) {
  const session = await readAdminSession(request, env);
  if (!session) return jsonResponse({ error: "Admin login required" }, 401);
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const url = new URL(request.url);
  const reference = clean(url.searchParams.get("reference") || url.searchParams.get("externalOrderId"), 120);
  if (!reference) return jsonResponse({ error: "Shopify order reference is required" }, 400);
  let db;
  try { db = await ensureShopifySchema(env); }
  catch (_) { return jsonResponse({ error: "Shopify order storage is not configured" }, 503); }
  const shopDomain = normalizeShopDomain(url.searchParams.get("shop") || env?.SHOPIFY_SHOP_DOMAIN);
  const external = await db.prepare(`SELECT * FROM eus_store_order_external
    WHERE sales_channel='shopify' AND lower(shop_domain)=lower(?) AND (external_order_id=? OR external_order_number=?) LIMIT 1`)
    .bind(shopDomain, reference, reference).first();
  if (!external) {
    const payload = { ok: true, found: false, shopDomain, reference, recovery: "Redeliver the Shopify orders/paid webhook for this order, then run reconciliation again." };
    return request.method === "HEAD" ? new Response(null, { status: 200 }) : jsonResponse(payload);
  }
  const order = await db.prepare("SELECT * FROM eus_store_orders WHERE id=? LIMIT 1").bind(external.order_id).first();
  const items = await db.prepare("SELECT * FROM eus_store_order_items WHERE order_id=? ORDER BY line_index").bind(external.order_id).all();
  const receipts = await db.prepare("SELECT webhook_id,event_id,status,attempt_count,received_at,processed_at FROM eus_shopify_webhook_receipts WHERE order_id=? ORDER BY received_at DESC LIMIT 20").bind(external.order_id).all();
  const payload = { ok: true, found: true, order, external, items: items.results || [], webhookReceipts: receipts.results || [], admin: session.email };
  return request.method === "HEAD" ? new Response(null, { status: 200 }) : jsonResponse(payload);
}
export async function handleShopifyOrderBridge(request, env, pathname) {
  if (pathname === SHOPIFY_PAID_WEBHOOK_PATH) return handlePaidWebhook(request, env);
  if (pathname === SHOPIFY_RECONCILE_PATH) return handleReconcile(request, env);
  return jsonResponse({ error: "Shopify order endpoint not found" }, 404);
}

export const __shopifyOrderTest = {
  normalizeShopDomain,
  moneyToCents,
  constantTimeEqualBytes,
  verifyShopifyHmac,
  deterministicOrderReference,
  resolveSokLine,
  normalizeLineItem,
  normalizeCustomer,
  normalizeShipping,
  orderTotals,
  prepareShopifyOrder,
};
