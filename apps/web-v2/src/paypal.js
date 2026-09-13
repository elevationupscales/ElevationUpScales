const PAYPAL_SANDBOX_ORIGIN = 'https://api-m.sandbox.paypal.com';
const PAYPAL_LIVE_ORIGIN = 'https://api-m.paypal.com';

function clean(value, max = 4000) {
  return String(value ?? '').trim().slice(0, max);
}

function envFlag(value) {
  return ['1', 'true', 'yes', 'on'].includes(clean(value, 20).toLowerCase());
}

export function paypalMode(env) {
  return clean(env?.PAYPAL_ENV, 20).toLowerCase() === 'live' ? 'live' : 'sandbox';
}

export function paypalConfigured(env) {
  return Boolean(clean(env?.PAYPAL_CLIENT_ID, 300) && clean(env?.PAYPAL_CLIENT_SECRET, 300));
}

export function liveCheckoutAllowed(env) {
  return paypalMode(env) !== 'live' || envFlag(env?.STORE_LIVE_CHECKOUT_ENABLED);
}

export function paypalOrigin(env) {
  return paypalMode(env) === 'live' ? PAYPAL_LIVE_ORIGIN : PAYPAL_SANDBOX_ORIGIN;
}

export function paymentGate(env) {
  if (!paypalConfigured(env)) return { ready: false, reason: 'PAYPAL_NOT_CONFIGURED', mode: paypalMode(env) };
  if (!liveCheckoutAllowed(env)) return { ready: false, reason: 'LIVE_CHECKOUT_LOCKED', mode: paypalMode(env) };
  return { ready: true, reason: null, mode: paypalMode(env) };
}

function amountValue(amount) {
  const value = Number(amount?.amount);
  if (!Number.isFinite(value) || value < 0) throw new Error('INVALID_PAYMENT_AMOUNT');
  return value.toFixed(2);
}

async function accessToken(env, fetchImpl) {
  if (!paypalConfigured(env)) throw new Error('PAYPAL_NOT_CONFIGURED');
  const clientId = clean(env.PAYPAL_CLIENT_ID, 300);
  const secret = clean(env.PAYPAL_CLIENT_SECRET, 300);
  const basic = btoa(`${clientId}:${secret}`);
  const response = await fetchImpl(`${paypalOrigin(env)}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    },
    body: 'grant_type=client_credentials'
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body?.access_token) throw new Error('PAYPAL_AUTHORIZATION_FAILED');
  return clean(body.access_token, 4000);
}

async function paypalRequest(env, path, options, requestId, fetchImpl) {
  const token = await accessToken(env, fetchImpl);
  const response = await fetchImpl(`${paypalOrigin(env)}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'PayPal-Request-Id': clean(requestId, 120),
      ...(options?.headers || {})
    }
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

export async function createPaypalOrder(env, order, { fetchImpl = fetch } = {}) {
  const gate = paymentGate(env);
  if (!gate.ready) throw new Error(gate.reason);
  if (!order?.id || !order?.totals?.amountDue) throw new Error('INVALID_ORDER_DRAFT');

  const requestBody = {
    intent: 'CAPTURE',
    purchase_units: [{
      reference_id: clean(order.id, 80),
      custom_id: clean(order.id, 80),
      amount: {
        currency_code: clean(order.totals.amountDue.currency || 'USD', 3).toUpperCase(),
        value: amountValue(order.totals.amountDue),
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: amountValue(order.totals.merchandiseSubtotal)
          },
          shipping: {
            currency_code: 'USD',
            value: amountValue(order.totals.shipping)
          },
          tax_total: {
            currency_code: 'USD',
            value: amountValue(order.totals.tax)
          }
        }
      }
    }]
  };

  const { response, body } = await paypalRequest(
    env,
    '/v2/checkout/orders',
    { method: 'POST', body: JSON.stringify(requestBody) },
    `eus-create-${order.id}`,
    fetchImpl
  );
  if (!response.ok || !body?.id) throw new Error('PAYPAL_ORDER_CREATE_FAILED');

  return {
    provider: 'paypal',
    mode: gate.mode,
    orderId: clean(body.id, 80),
    status: clean(body.status, 40),
    approveUrl: clean((body.links || []).find((link) => link?.rel === 'approve' || link?.rel === 'payer-action')?.href, 1200) || null
  };
}

export async function capturePaypalOrder(env, providerOrderId, localOrderId, { fetchImpl = fetch } = {}) {
  const gate = paymentGate(env);
  if (!gate.ready) throw new Error(gate.reason);
  const id = clean(providerOrderId, 80);
  if (!/^[A-Z0-9-]{8,80}$/i.test(id)) throw new Error('INVALID_PAYPAL_ORDER_ID');

  const { response, body } = await paypalRequest(
    env,
    `/v2/checkout/orders/${encodeURIComponent(id)}/capture`,
    { method: 'POST', body: '{}' },
    `eus-capture-${clean(localOrderId, 80)}`,
    fetchImpl
  );
  if (!response.ok) throw new Error('PAYPAL_CAPTURE_FAILED');

  const capture = body?.purchase_units?.[0]?.payments?.captures?.[0] || {};
  return {
    provider: 'paypal',
    orderId: clean(body?.id || id, 80),
    captureId: clean(capture?.id, 80) || null,
    status: clean(capture?.status || body?.status, 40) || 'UNKNOWN'
  };
}
