import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';
import { evaluateDestination, resolveCheckout } from '../src/checkout.js';

async function request(path, init = {}) {
  return worker.fetch(new Request(`https://elevation-web-v2.test${path}`, init), {});
}

const cleanProduct = {
  id: 'clean-product',
  vendorName: 'Verified Vendor',
  sku: 'SKU-1',
  title: 'Verified Product',
  sellPrice: { currency: 'USD', amount: 125.50 },
  orderable: true,
  shippingDisposition: 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED'
};

const lookup = (id) => id === cleanProduct.id ? cleanProduct : null;

test('checkout re-resolves current server cart state and unavailable products stay out of payment', () => {
  const result = resolveCheckout(
    [{ productId: 'vevor-xxkljt124incljf0qv0', quantity: 1 }],
    { country: 'US', state: 'CO', postalCode: '80903' }
  );
  assert.deepEqual(result.lines, []);
  assert.equal(result.blocked[0].reason, 'PRODUCT_NOT_ORDERABLE');
  assert.equal(result.checkoutReady, false);
  assert.equal(result.paymentReady, false);
  assert.equal(result.totals.amountDue, null);
});

test('clean lower-48 product passes destination review while final charges remain server-side', () => {
  const result = resolveCheckout(
    [{ productId: 'clean-product', quantity: 2, unitPrice: { amount: 0.01 } }],
    { country: 'US', state: 'co', postalCode: '80903' },
    lookup
  );
  assert.equal(result.checkoutReady, true);
  assert.equal(result.paymentReady, false);
  assert.equal(result.lines[0].unitPrice.amount, 125.50);
  assert.equal(result.totals.merchandiseSubtotal.amount, 251);
  assert.equal(result.totals.shipping, null);
  assert.equal(result.totals.tax, null);
  assert.equal(result.totals.amountDue, null);
});

test('Hawaii and Alaska eligibility are product-specific instead of blanket blocked', () => {
  assert.equal(
    evaluateDestination(cleanProduct, { country: 'US', state: 'HI', postalCode: '96815' }).reason,
    'HAWAII_CONTACT_REQUIRED'
  );
  assert.equal(
    evaluateDestination(cleanProduct, { country: 'US', state: 'AK', postalCode: '99501' }).reason,
    'ALASKA_CONTACT_REQUIRED'
  );
  const hawaiiReady = { ...cleanProduct, shippingDisposition: 'HAWAII_SUPPLIER_SHIPPING_VERIFIED' };
  assert.equal(
    evaluateDestination(hawaiiReady, { country: 'US', state: 'HI', postalCode: '96815' }).eligible,
    true
  );
  const allStates = { ...cleanProduct, shippingDisposition: 'US_ALL_50_STATES_VERIFIED' };
  assert.equal(evaluateDestination(allStates, { country: 'US', state: 'HI', postalCode: '96815' }).eligible, true);
  assert.equal(evaluateDestination(allStates, { country: 'US', state: 'AK', postalCode: '99501' }).eligible, true);
  const warehouse = { ...cleanProduct, shippingDisposition: 'US_WAREHOUSE_DROPSHIP_ROUTE_VERIFIED' };
  assert.equal(evaluateDestination(warehouse, { country: 'US', state: 'CO', postalCode: '80903' }).eligible, true);
});

test('checkout route is customer-safe, noindex, and loads no third-party payment script or Shopify fallback', async () => {
  const res = await request('/checkout');
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.match(body, /Secure Checkout/i);
  assert.match(body, /Continue to PayPal/);
  assert.match(body, /data-checkout-form/);
  assert.match(body, /name="robots" content="noindex,nofollow"/);
  assert.match(body, /\/assets\/checkout\.js/);
  assert.doesNotMatch(body, /authoritative|product truth|revalidat|orderability|source snapshot/i);
  assert.doesNotMatch(body, /https:\/\/.*paypal\.com|Shopify|\/api\/paypal/i);
});

test('checkout resolver accepts POST only for server review and rejects malformed payloads', async () => {
  const payload = {
    items: [{ productId: 'vevor-xxkljt124incljf0qv0', quantity: 1 }],
    destination: { country: 'US', state: 'CO', postalCode: '80903' }
  };
  const res = await request('/api/checkout/resolve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  assert.equal(res.status, 200);
  const result = await res.json();
  assert.equal(result.checkoutReady, false);
  assert.equal(result.paymentReady, false);
  assert.equal(result.blocked[0].reason, 'PRODUCT_NOT_ORDERABLE');

  const malformed = await request('/api/checkout/resolve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{not-json'
  });
  assert.equal(malformed.status, 400);
  assert.deepEqual(await malformed.json(), { error: 'INVALID_CHECKOUT_PAYLOAD' });
});

test('checkout client goes from address review directly toward PayPal and retains payment safety guards', async () => {
  const res = await request('/assets/checkout.js');
  assert.equal(res.status, 200);
  const script = await res.text();
  assert.match(script, /elevation-cart-v1/);
  assert.match(script, /productId/);
  assert.match(script, /quantity/);
  assert.match(script, /\/api\/checkout\/resolve/);
  assert.match(script, /\/api\/order\/create/);
  assert.match(script, /\/api\/order\/paypal\//);
  assert.match(script, /elevation-checkout-idempotency-v1/);
  assert.match(script, /endsWith\('paypal\.com'\)/);
  assert.match(script, /HAWAII_CONTACT_REQUIRED/);
  assert.match(script, /await prepareOrder\(orderPayload\)/);
  assert.doesNotMatch(script, /authoritative totals|fulfillment controls|canonical orderability|Shopify|unitPrice:\s*line|cardNumber|card_number|cvv|cvc/i);
});
