function clean(value, max = 3000) {
  return String(value ?? '').trim().slice(0, max);
}

function toCents(money) {
  const amount = Number(money?.amount);
  if (!Number.isFinite(amount) || amount < 0) throw new Error('INVALID_ORDER_TOTAL');
  return Math.round(amount * 100);
}

function parseJson(value, fallback) {
  try { return JSON.parse(value || ''); } catch { return fallback; }
}

function dbFromEnv(env) {
  const db = env?.MARKETPLACE_DB;
  if (!db || typeof db.prepare !== 'function') throw new Error('ORDER_STORAGE_NOT_CONFIGURED');
  return db;
}

export async function ensureDirectOrderSchema(env) {
  const db = dbFromEnv(env);
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_store_order_direct (
    id TEXT PRIMARY KEY,
    idempotency_key TEXT NOT NULL UNIQUE,
    payment_provider TEXT NOT NULL DEFAULT 'paypal',
    payment_mode TEXT NOT NULL DEFAULT 'sandbox',
    payment_status TEXT NOT NULL DEFAULT 'PENDING',
    fulfillment_status TEXT NOT NULL DEFAULT 'NEEDS_FULFILLMENT',
    currency TEXT NOT NULL DEFAULT 'USD',
    merchandise_cents INTEGER NOT NULL,
    shipping_cents INTEGER NOT NULL,
    tax_cents INTEGER NOT NULL,
    total_cents INTEGER NOT NULL,
    customer_json TEXT NOT NULL,
    shipping_json TEXT NOT NULL,
    provider_order_id TEXT UNIQUE,
    provider_capture_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    paid_at TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_store_order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    line_index INTEGER NOT NULL,
    external_line_item_id TEXT NOT NULL DEFAULT '',
    external_product_id TEXT NOT NULL DEFAULT '',
    external_variant_id TEXT NOT NULL DEFAULT '',
    elevation_sku TEXT NOT NULL DEFAULT '',
    supplier TEXT NOT NULL DEFAULT '',
    supplier_display TEXT NOT NULL DEFAULT '',
    supplier_sku TEXT NOT NULL DEFAULT '',
    product_title TEXT NOT NULL,
    variant_title TEXT NOT NULL DEFAULT '',
    quantity INTEGER NOT NULL,
    unit_price_cents INTEGER NOT NULL,
    line_total_cents INTEGER NOT NULL,
    source TEXT NOT NULL DEFAULT '',
    fulfillment_context_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    UNIQUE(order_id,line_index)
  )`).run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_eus_store_order_direct_provider ON eus_store_order_direct(provider_order_id)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_eus_store_order_direct_status ON eus_store_order_direct(payment_status,fulfillment_status,updated_at DESC)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_eus_store_order_items_order ON eus_store_order_items(order_id,line_index)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_eus_store_order_items_supplier ON eus_store_order_items(supplier,supplier_sku)').run();
  return db;
}

function viewHeader(row) {
  if (!row) return null;
  return {
    id: row.id,
    idempotencyKey: row.idempotency_key,
    paymentProvider: row.payment_provider,
    paymentMode: row.payment_mode,
    paymentStatus: row.payment_status,
    fulfillmentStatus: row.fulfillment_status,
    currency: row.currency,
    totals: {
      merchandiseSubtotal: { currency: row.currency, amount: Number(row.merchandise_cents || 0) / 100 },
      shipping: { currency: row.currency, amount: Number(row.shipping_cents || 0) / 100 },
      tax: { currency: row.currency, amount: Number(row.tax_cents || 0) / 100 },
      amountDue: { currency: row.currency, amount: Number(row.total_cents || 0) / 100 }
    },
    customer: parseJson(row.customer_json, {}),
    shippingAddress: parseJson(row.shipping_json, {}),
    providerOrderId: row.provider_order_id || null,
    providerCaptureId: row.provider_capture_id || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paidAt: row.paid_at || null
  };
}

function viewItem(row) {
  return {
    productId: row.external_product_id,
    sku: row.elevation_sku,
    supplier: row.supplier,
    vendorName: row.supplier_display,
    supplierSku: row.supplier_sku,
    title: row.product_title,
    quantity: Number(row.quantity || 0),
    unitPrice: { currency: 'USD', amount: Number(row.unit_price_cents || 0) / 100 },
    lineTotal: { currency: 'USD', amount: Number(row.line_total_cents || 0) / 100 },
    fulfillment: parseJson(row.fulfillment_context_json, {})
  };
}

export async function loadDirectOrder(env, { id = '', idempotencyKey = '', providerOrderId = '' } = {}) {
  const db = await ensureDirectOrderSchema(env);
  let row = null;
  if (id) row = await db.prepare('SELECT * FROM eus_store_order_direct WHERE id=? LIMIT 1').bind(clean(id, 100)).first();
  else if (idempotencyKey) row = await db.prepare('SELECT * FROM eus_store_order_direct WHERE idempotency_key=? LIMIT 1').bind(clean(idempotencyKey, 120)).first();
  else if (providerOrderId) row = await db.prepare('SELECT * FROM eus_store_order_direct WHERE provider_order_id=? LIMIT 1').bind(clean(providerOrderId, 100)).first();
  if (!row) return null;
  const itemsResult = await db.prepare('SELECT * FROM eus_store_order_items WHERE order_id=? ORDER BY line_index').bind(row.id).all();
  return { ...viewHeader(row), items: (itemsResult?.results || []).map(viewItem) };
}

export async function createDirectOrder(env, draft, idempotencyKey, paymentMode = 'sandbox') {
  const key = clean(idempotencyKey, 120);
  if (!/^[A-Za-z0-9._:-]{12,120}$/.test(key)) throw new Error('INVALID_IDEMPOTENCY_KEY');
  const existing = await loadDirectOrder(env, { idempotencyKey: key });
  if (existing) return { order: existing, reused: true };

  const db = await ensureDirectOrderSchema(env);
  const id = `EUS-${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  const header = db.prepare(`INSERT OR IGNORE INTO eus_store_order_direct
    (id,idempotency_key,payment_provider,payment_mode,payment_status,fulfillment_status,currency,merchandise_cents,shipping_cents,tax_cents,total_cents,customer_json,shipping_json,provider_order_id,provider_capture_id,created_at,updated_at,paid_at)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(
      id, key, 'paypal', clean(paymentMode, 20) || 'sandbox', 'PENDING', 'NEEDS_FULFILLMENT',
      draft.totals.amountDue.currency || 'USD',
      toCents(draft.totals.merchandiseSubtotal), toCents(draft.totals.shipping), toCents(draft.totals.tax), toCents(draft.totals.amountDue),
      JSON.stringify(draft.customer), JSON.stringify(draft.shippingAddress), null, null, now, now, null
    );

  const items = draft.lines.map((line, index) => {
    const route = draft.fulfillment.routes.find((candidate) => candidate.productId === line.productId) || {};
    return db.prepare(`INSERT OR IGNORE INTO eus_store_order_items
      (id,order_id,line_index,external_line_item_id,external_product_id,external_variant_id,elevation_sku,supplier,supplier_display,supplier_sku,product_title,variant_title,quantity,unit_price_cents,line_total_cents,source,fulfillment_context_json,created_at)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(
        `EUS-ITEM-${crypto.randomUUID()}`, id, index, '', line.productId, '', line.sku,
        route.vendorId || '', route.vendorName || line.vendorName || '', route.supplierSku || line.sku,
        line.title, '', line.quantity, toCents(line.unitPrice), toCents(line.lineTotal), 'web-v2-direct',
        JSON.stringify({ fulfillmentSource: route.fulfillmentSource || '', vendorId: route.vendorId || '', supplierSku: route.supplierSku || line.sku }), now
      );
  });

  if (typeof db.batch === 'function') await db.batch([header, ...items]);
  else {
    await header.run();
    for (const statement of items) await statement.run();
  }

  const order = await loadDirectOrder(env, { idempotencyKey: key });
  if (!order) throw new Error('ORDER_STORAGE_WRITE_FAILED');
  return { order, reused: order.id !== id };
}

export async function attachProviderOrder(env, localOrderId, providerOrderId) {
  const db = await ensureDirectOrderSchema(env);
  const now = new Date().toISOString();
  await db.prepare(`UPDATE eus_store_order_direct SET provider_order_id=?,payment_status='CREATED',updated_at=? WHERE id=? AND (provider_order_id IS NULL OR provider_order_id=?)`)
    .bind(clean(providerOrderId, 100), now, clean(localOrderId, 100), clean(providerOrderId, 100)).run();
  return loadDirectOrder(env, { id: localOrderId });
}

export async function markOrderCaptured(env, localOrderId, capture) {
  const db = await ensureDirectOrderSchema(env);
  const now = new Date().toISOString();
  const status = clean(capture?.status, 40).toUpperCase() || 'COMPLETED';
  await db.prepare(`UPDATE eus_store_order_direct SET provider_capture_id=?,payment_status=?,updated_at=?,paid_at=COALESCE(paid_at,?) WHERE id=? AND provider_capture_id IS NULL`)
    .bind(clean(capture?.captureId, 100), status, now, now, clean(localOrderId, 100)).run();
  return loadDirectOrder(env, { id: localOrderId });
}
