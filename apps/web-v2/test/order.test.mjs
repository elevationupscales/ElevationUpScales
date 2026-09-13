import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveOrderHandoff } from '../src/order.js';
import { createOrderFromCheckout, captureOrderPayment } from '../src/order-service.js';
import { createPaypalOrder, paymentGate } from '../src/paypal.js';

const cleanProduct = {
  id: 'clean-product',
  vendorId: 'verified-vendor',
  vendorName: 'Verified Vendor',
  sku: 'SKU-1',
  supplierSku: 'SUP-1',
  title: 'Verified Product',
  sellPrice: { currency: 'USD', amount: 125.50 },
  orderable: true,
  shippingDisposition: 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED',
  fulfillmentSource: 'VERIFIED_DIRECT_DROPSHIP'
};

const lookup = (id) => id === cleanProduct.id ? cleanProduct : null;
const customer = { email: 'buyer@example.com' };
const shipping = {
  fullName: 'Test Buyer', address1: '123 Main St', city: 'Colorado Springs', state: 'CO', postalCode: '80903', countryCode: 'US'
};
const charges = () => ({
  currency: 'USD',
  merchandiseSubtotal: { currency: 'USD', amount: 251 },
  shipping: { currency: 'USD', amount: 20 },
  tax: { currency: 'USD', amount: 10 },
  amountDue: { currency: 'USD', amount: 281 }
});

test('current canonical holds cannot reach order or payment readiness', () => {
  const result = resolveOrderHandoff(
    [{ productId: 'vevor-xxkljt124incljf0qv0', quantity: 1, unitPrice: { amount: 0.01 } }],
    customer,
    shipping
  );
  assert.equal(result.orderReady, false);
  assert.equal(result.paymentReady, false);
  assert.ok(result.holds.includes('CHECKOUT_REVALIDATION_FAILED'));
  assert.equal(result.lines.length, 0);
});

test('clean canonical order ignores client price and preserves exact fulfillment identity', () => {
  const result = resolveOrderHandoff(
    [{ productId: 'CLEAN-PRODUCT', quantity: 2, unitPrice: { currency: 'USD', amount: 0.01 }, title: 'Tampered' }],
    customer,
    shipping,
    { productLookup: lookup, chargeResolver: charges }
  );
  assert.equal(result.orderReady, true);
  assert.equal(result.paymentReady, true);
  assert.equal(result.lines[0].unitPrice.amount, 125.50);
  assert.equal(result.totals.amountDue.amount, 281);
  assert.deepEqual(result.fulfillment.routes[0], {
    productId: 'clean-product',
    vendorId: 'verified-vendor',
    vendorName: 'Verified Vendor',
    sku: 'SKU-1',
    supplierSku: 'SUP-1',
    fulfillmentSource: 'VERIFIED_DIRECT_DROPSHIP',
    quantity: 2
  });
});

test('default production charge state fails closed when shipping and tax are not authoritative', () => {
  const result = resolveOrderHandoff(
    [{ productId: 'clean-product', quantity: 1 }],
    customer,
    shipping,
    { productLookup: lookup }
  );
  assert.equal(result.orderReady, false);
  assert.equal(result.paymentReady, false);
  assert.ok(result.holds.includes('SHIPPING_AMOUNT_UNVERIFIED'));
  assert.ok(result.holds.includes('TAX_AMOUNT_UNVERIFIED'));
  assert.equal(result.totals.amountDue, null);
});

test('order creation persists first and reuses an existing provider order for the same idempotency key', async () => {
  let paymentCalls = 0;
  let storedOrder = null;
  const storage = {
    async createDirectOrder(_env, draft, key) {
      if (storedOrder) return { order: storedOrder, reused: true };
      storedOrder = {
        id: 'EUS-LOCAL-1', idempotencyKey: key, paymentProvider: 'paypal', paymentStatus: 'PENDING',
        providerOrderId: null, totals: draft.totals
      };
      return { order: storedOrder, reused: false };
    },
    async attachProviderOrder(_env, id, providerOrderId) {
      storedOrder = { ...storedOrder, id, providerOrderId, paymentStatus: 'CREATED' };
      return storedOrder;
    }
  };
  const payment = {
    async createPaypalOrder() {
      paymentCalls += 1;
      return { orderId: 'PAYPAL-ORDER-1', approveUrl: 'https://www.paypal.com/checkoutnow?token=PAYPAL-ORDER-1' };
    }
  };
  const env = { PAYPAL_CLIENT_ID: 'configured', PAYPAL_CLIENT_SECRET: 'configured', PAYPAL_ENV: 'sandbox' };
  const payload = {
    items: [{ productId: 'clean-product', quantity: 2 }], customer, shipping,
    idempotencyKey: 'checkout-session-0001'
  };

  const first = await createOrderFromCheckout(payload, env, { productLookup: lookup, chargeResolver: charges, storage, payment });
  const second = await createOrderFromCheckout(payload, env, { productLookup: lookup, chargeResolver: charges, storage, payment });
  assert.equal(first.status, 201);
  assert.equal(second.status, 200);
  assert.equal(second.body.reused, true);
  assert.equal(second.body.providerOrderId, 'PAYPAL-ORDER-1');
  assert.equal(paymentCalls, 1);
});

test('capture is idempotent and does not call provider again when capture already exists', async () => {
  let captureCalls = 0;
  const stored = {
    id: 'EUS-LOCAL-1', providerOrderId: 'PAYPAL-ORDER-1', providerCaptureId: 'CAPTURE-1', paymentStatus: 'COMPLETED',
    fulfillmentStatus: 'NEEDS_FULFILLMENT', customer, shippingAddress: shipping, totals: charges(),
    items: [{ productId: 'clean-product', quantity: 1 }]
  };
  const result = await captureOrderPayment('PAYPAL-ORDER-1', {}, {
    productLookup: lookup,
    chargeResolver: charges,
    storage: { async loadDirectOrder() { return stored; }, async markOrderCaptured() { throw new Error('should not run'); } },
    payment: { async capturePaypalOrder() { captureCalls += 1; } }
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.reused, true);
  assert.equal(result.body.providerCaptureId, 'CAPTURE-1');
  assert.equal(captureCalls, 0);
});

test('live PayPal remains locked without explicit launch flag', () => {
  assert.deepEqual(
    paymentGate({ PAYPAL_CLIENT_ID: 'id', PAYPAL_CLIENT_SECRET: 'secret', PAYPAL_ENV: 'live' }),
    { ready: false, reason: 'LIVE_CHECKOUT_LOCKED', mode: 'live' }
  );
});

test('PayPal create uses server amount and deterministic request id without exposing credentials', async () => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    if (url.endsWith('/v1/oauth2/token')) return new Response(JSON.stringify({ access_token: 'TOKEN' }), { status: 200 });
    return new Response(JSON.stringify({
      id: 'PAYPAL-ORDER-9', status: 'CREATED',
      links: [{ rel: 'approve', href: 'https://www.paypal.com/checkoutnow?token=PAYPAL-ORDER-9' }]
    }), { status: 201 });
  };
  const env = { PAYPAL_CLIENT_ID: 'client', PAYPAL_CLIENT_SECRET: 'secret', PAYPAL_ENV: 'sandbox' };
  const result = await createPaypalOrder(env, {
    id: 'EUS-LOCAL-9',
    totals: {
      merchandiseSubtotal: { currency: 'USD', amount: 100 },
      shipping: { currency: 'USD', amount: 20 },
      tax: { currency: 'USD', amount: 5 },
      amountDue: { currency: 'USD', amount: 125 }
    }
  }, { fetchImpl });
  assert.equal(result.orderId, 'PAYPAL-ORDER-9');
  assert.equal(calls[1].init.headers['PayPal-Request-Id'], 'eus-create-EUS-LOCAL-9');
  const requestBody = JSON.parse(calls[1].init.body);
  assert.equal(requestBody.purchase_units[0].amount.value, '125.00');
  assert.equal(requestBody.purchase_units[0].amount.breakdown.item_total.value, '100.00');
  assert.doesNotMatch(JSON.stringify(requestBody), /client|secret|TOKEN/);
});
