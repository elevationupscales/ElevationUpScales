function clean(value, max = 3000) {
  return String(value ?? '').trim().slice(0, max);
}

function dbFromEnv(env) {
  const db = env?.ELEVATION_COMMERCE_DB || env?.MARKETPLACE_DB;
  if (!db || typeof db.prepare !== 'function') throw new Error('CHECKOUT_RECOVERY_STORAGE_NOT_CONFIGURED');
  return db;
}

const ALLOWED_STATES = new Set([
  'CHECKOUT_STARTED',
  'CHECKOUT_RESOLVE_FAILED',
  'PAYMENT_START_FAILED',
  'PAYMENT_ORDER_CREATED',
  'PAYMENT_CANCELLED',
  'ABANDONED',
  'RECOVERED',
  'PAYMENT_COMPLETED'
]);

export async function ensureCheckoutRecoverySchema(env) {
  const db = dbFromEnv(env);
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_store_checkout_recovery (
    id TEXT PRIMARY KEY,
    recovery_key TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    customer_json TEXT NOT NULL,
    shipping_json TEXT NOT NULL,
    cart_json TEXT NOT NULL,
    subtotal_cents INTEGER NOT NULL DEFAULT 0,
    failure_reason TEXT NOT NULL DEFAULT '',
    provider_order_id TEXT,
    local_order_id TEXT,
    notification_sent_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    paid_at TEXT
  )`).run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_eus_checkout_recovery_status ON eus_store_checkout_recovery(status,updated_at DESC)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_eus_checkout_recovery_provider ON eus_store_checkout_recovery(provider_order_id)').run();
  return db;
}

export async function saveCheckoutRecovery(env, payload) {
  const recoveryKey = clean(payload?.recoveryKey, 120);
  if (!/^[A-Za-z0-9._:-]{12,120}$/.test(recoveryKey)) throw new Error('INVALID_CHECKOUT_RECOVERY_KEY');

  const status = clean(payload?.status, 40).toUpperCase();
  if (!ALLOWED_STATES.has(status)) throw new Error('INVALID_CHECKOUT_RECOVERY_STATUS');

  const customer = payload?.customer || {};
  const shipping = payload?.shipping || {};
  const email = clean(customer.email, 320);
  const fullName = clean(shipping.fullName, 200);
  const address1 = clean(shipping.address1, 300);
  const city = clean(shipping.city, 120);
  const state = clean(shipping.state, 2).toUpperCase();
  const postalCode = clean(shipping.postalCode, 20);
  if (!email || !fullName || !address1 || !city || !state || !postalCode) throw new Error('INCOMPLETE_CHECKOUT_RECOVERY_PROFILE');

  const canonicalLines = Array.isArray(payload?.lines) ? payload.lines : [];
  if (!canonicalLines.length) throw new Error('EMPTY_CHECKOUT_RECOVERY_CART');

  const subtotalCents = Math.round(Number(payload?.subtotal?.amount || 0) * 100);
  if (!Number.isFinite(subtotalCents) || subtotalCents < 0) throw new Error('INVALID_CHECKOUT_RECOVERY_SUBTOTAL');

  const db = await ensureCheckoutRecoverySchema(env);
  const now = new Date().toISOString();
  const existing = await db.prepare('SELECT id,created_at,notification_sent_at,paid_at FROM eus_store_checkout_recovery WHERE recovery_key=? LIMIT 1')
    .bind(recoveryKey).first();
  const id = existing?.id || `EUS-RECOVERY-${crypto.randomUUID()}`;
  const createdAt = existing?.created_at || now;
  const paidAt = status === 'PAYMENT_COMPLETED' ? (existing?.paid_at || now) : (existing?.paid_at || null);

  await db.prepare(`INSERT INTO eus_store_checkout_recovery
    (id,recovery_key,status,customer_json,shipping_json,cart_json,subtotal_cents,failure_reason,provider_order_id,local_order_id,notification_sent_at,created_at,updated_at,paid_at)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ON CONFLICT(recovery_key) DO UPDATE SET
      status=excluded.status,
      customer_json=excluded.customer_json,
      shipping_json=excluded.shipping_json,
      cart_json=excluded.cart_json,
      subtotal_cents=excluded.subtotal_cents,
      failure_reason=excluded.failure_reason,
      provider_order_id=COALESCE(excluded.provider_order_id,eus_store_checkout_recovery.provider_order_id),
      local_order_id=COALESCE(excluded.local_order_id,eus_store_checkout_recovery.local_order_id),
      updated_at=excluded.updated_at,
      paid_at=COALESCE(excluded.paid_at,eus_store_checkout_recovery.paid_at)`)
    .bind(
      id,
      recoveryKey,
      status,
      JSON.stringify({ email, phone: clean(customer.phone, 80) }),
      JSON.stringify({
        fullName,
        address1,
        address2: clean(shipping.address2, 300),
        city,
        state,
        postalCode,
        countryCode: 'US'
      }),
      JSON.stringify(canonicalLines),
      subtotalCents,
      clean(payload?.failureReason, 300),
      clean(payload?.providerOrderId, 120) || null,
      clean(payload?.localOrderId, 120) || null,
      existing?.notification_sent_at || null,
      createdAt,
      now,
      paidAt
    ).run();

  return {
    id,
    recoveryKey,
    status,
    notificationSent: Boolean(existing?.notification_sent_at),
    createdAt,
    updatedAt: now,
    paidAt
  };
}
