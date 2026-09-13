import { handleStoreCheckoutApi as handleLegacyStoreCheckoutApi } from "./store-checkout-server-legacy.js";

// Quote/create/config remain delegated to the verified legacy checkout module.
// That delegated contract retains ensureCommerceSchema, shippingVerified,
// evaluateSokHawaiiOrder and applyCoupon; this wrapper owns only the hardened
// PayPal capture path so the repair stays bounded.
const DEFAULT_CURRENCY = "USD";
const PAYPAL_SANDBOX_ORIGIN = "https://api-m.sandbox.paypal.com";
const PAYPAL_LIVE_ORIGIN = "https://api-m.paypal.com";

const JSON_HEADERS = Object.freeze({
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
});

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...extraHeaders } });
}

function clean(value, max = 300) {
  return String(value ?? "").trim().slice(0, max);
}

function envFlag(value) {
  return ["1", "true", "yes", "on"].includes(clean(value, 20).toLowerCase());
}

function paypalMode(env) {
  return clean(env?.PAYPAL_ENV, 20).toLowerCase() === "live" ? "live" : "sandbox";
}

function paypalOrigin(env) {
  return paypalMode(env) === "live" ? PAYPAL_LIVE_ORIGIN : PAYPAL_SANDBOX_ORIGIN;
}

function paypalConfigured(env) {
  return Boolean(clean(env?.PAYPAL_CLIENT_ID, 300) && clean(env?.PAYPAL_CLIENT_SECRET, 300));
}

function liveCheckoutAllowed(env) {
  return paypalMode(env) !== "live" || envFlag(env?.STORE_LIVE_CHECKOUT_ENABLED);
}

function validOrderId(value) {
  const id = clean(value, 80);
  return /^[A-Z0-9]{8,40}$/i.test(id) ? id : "";
}

function centsToValue(cents) {
  const value = Number(cents);
  return `${Math.floor(value / 100)}.${String(value % 100).padStart(2, "0")}`;
}

function paypalMoneyToCents(value) {
  const raw = clean(value, 40);
  if (!/^\d+(?:\.\d{1,2})?$/.test(raw)) return null;
  const [whole, fraction = ""] = raw.split(".");
  const cents = (Number.parseInt(whole, 10) * 100) + Number.parseInt((fraction + "00").slice(0, 2), 10);
  return Number.isSafeInteger(cents) && cents >= 0 ? cents : null;
}

function captureRequestId(order) {
  const reference = clean(order?.id, 72).replace(/[^A-Za-z0-9._:-]/g, "-");
  return `EUS-CAPTURE-${reference}`.slice(0, 108);
}

async function paypalAccessToken(env, forceRefresh = false) {
  if (!paypalConfigured(env)) throw new Error("PayPal credentials are not configured");
  const clientId = clean(env.PAYPAL_CLIENT_ID, 300);
  const basic = btoa(`${clientId}:${clean(env.PAYPAL_CLIENT_SECRET, 300)}`);
  const response = await fetch(`${paypalOrigin(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "Accept-Language": "en_US",
      ...(forceRefresh ? { "Cache-Control": "no-cache" } : {}),
    },
    body: "grant_type=client_credentials",
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body?.access_token) throw new Error("Unable to authorize PayPal checkout");
  return clean(body.access_token, 4000);
}

async function paypalCaptureRequest(env, orderId, requestId) {
  const send = async (forceRefresh = false) => {
    const token = await paypalAccessToken(env, forceRefresh);
    return fetch(`${paypalOrigin(env)}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "PayPal-Request-Id": requestId,
      },
      body: "{}",
    });
  };

  let response = await send(false);
  if (response.status === 401) response = await send(true);
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

async function loadStoreOrder(db, paypalOrderId) {
  return db.prepare(`
    SELECT id,paypal_order_id,paypal_capture_id,payment_status,total_cents,paid_at
    FROM eus_store_orders
    WHERE paypal_order_id=?
    LIMIT 1
  `).bind(paypalOrderId).first();
}

function alreadyCapturedResponse(order) {
  return json({
    ok: true,
    alreadyCaptured: true,
    id: clean(order.paypal_order_id, 80),
    status: "COMPLETED",
    captureId: clean(order.paypal_capture_id, 80),
    captureStatus: "COMPLETED",
    amount: centsToValue(Number(order.total_cents)),
    currency: DEFAULT_CURRENCY,
  });
}

async function captureStoreOrderSafely(request, env, paypalOrderId) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!paypalConfigured(env)) return json({ error: "PayPal checkout is not configured" }, 503);
  if (!liveCheckoutAllowed(env)) return json({ error: "Live checkout is locked pending launch approval" }, 503);

  const id = validOrderId(paypalOrderId);
  if (!id) return json({ error: "Invalid PayPal order ID" }, 400);

  const db = env?.MARKETPLACE_DB;
  if (!db || typeof db.prepare !== "function") return json({ error: "Store order storage is not configured" }, 503);

  const order = await loadStoreOrder(db, id).catch(() => null);
  if (!order) {
    return json({ error: "No matching Elevation order exists for this PayPal order" }, 404);
  }

  const localStatus = clean(order.payment_status, 40).toUpperCase();
  const existingCaptureId = clean(order.paypal_capture_id, 80);

  if (existingCaptureId && localStatus === "COMPLETED") return alreadyCapturedResponse(order);

  if (existingCaptureId || localStatus !== "CREATED") {
    return json({
      error: "This order is not eligible for another capture attempt",
      reference: clean(order.id, 80),
      paymentStatus: clean(order.payment_status, 40),
    }, 409);
  }

  const expectedCents = Number(order.total_cents);
  if (!Number.isInteger(expectedCents) || expectedCents < 1) {
    return json({ error: "Stored order total is invalid; payment was not captured" }, 409);
  }

  let response, body;
  try {
    ({ response, body } = await paypalCaptureRequest(env, id, captureRequestId(order)));
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_capture_error", message: clean(error?.message, 240) }));
    return json({ error: "PayPal could not capture the payment" }, 502);
  }

  if (!response.ok) {
    const issue = clean(body?.details?.[0]?.issue, 100);
    return json(
      { error: issue === "INSTRUMENT_DECLINED" ? "INSTRUMENT_DECLINED" : "PayPal could not capture the payment" },
      response.status === 422 ? 422 : 502,
    );
  }

  const capture = body?.purchase_units?.[0]?.payments?.captures?.[0] || {};
  const returnedOrderId = clean(body?.id, 80);
  const captureId = clean(capture?.id, 80);
  const orderStatus = clean(body?.status, 40).toUpperCase();
  const captureStatus = clean(capture?.status, 40).toUpperCase();
  const capturedCents = paypalMoneyToCents(capture?.amount?.value);
  const currency = clean(capture?.amount?.currency_code, 10).toUpperCase();

  const reconciled = (
    returnedOrderId === id &&
    Boolean(captureId) &&
    orderStatus === "COMPLETED" &&
    captureStatus === "COMPLETED" &&
    capturedCents === expectedCents &&
    currency === DEFAULT_CURRENCY
  );

  if (!reconciled) {
    await db.prepare(`
      UPDATE eus_store_orders
      SET paypal_capture_id=?,payment_status=?,paid_at=NULL
      WHERE paypal_order_id=? AND payment_status='created'
    `).bind(captureId, "RECONCILIATION_HOLD", id).run().catch(() => {});

    console.error(JSON.stringify({
      event: "paypal_capture_reconciliation_hold",
      reference: clean(order.id, 80),
      paypalOrderId: id,
      captureId,
      orderStatus,
      captureStatus,
      expectedCents,
      capturedCents,
      currency,
    }));

    return json({
      error: "Payment response requires reconciliation before this order can be marked paid",
      reference: clean(order.id, 80),
    }, 409);
  }

  const paidAt = new Date().toISOString();
  await db.prepare(`
    UPDATE eus_store_orders
    SET paypal_capture_id=?,payment_status='COMPLETED',paid_at=?
    WHERE paypal_order_id=? AND payment_status='created' AND (paypal_capture_id IS NULL OR paypal_capture_id='')
  `).bind(captureId, paidAt, id).run();

  return json({
    ok: true,
    id,
    status: orderStatus,
    captureId,
    captureStatus,
    amount: centsToValue(expectedCents),
    currency: DEFAULT_CURRENCY,
    reference: clean(order.id, 80),
  });
}

export async function handleStoreCheckoutApi(request, env, pathname) {
  const path = clean(pathname, 240);
  const capture = path.match(/^\/api\/store-checkout\/orders\/([A-Z0-9]{8,40})\/capture$/i);
  if (capture) return captureStoreOrderSafely(request, env, capture[1]);
  return handleLegacyStoreCheckoutApi(request, env, pathname);
}

export const __storeCheckoutCaptureRepairTest = Object.freeze({
  paypalMoneyToCents,
  captureRequestId,
});
