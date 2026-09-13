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

test('checkout re-resolves current canonical cart state and held products fail closed', () => {
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

test('clean lower-48 product passes destination review but payment remains server-gated', () => {
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

test('Hawaii, Alaska and non-explicit shipping dispositions remain held', () => {
  assert.equal(
    evaluateDestination(cleanProduct, { country: 'US', state: 'HI', postalCode: '96815' }).reason,
    'SPECIAL_ROUTE_UNVERIFIED'
  );
  assert.equal(
    evaluateDestination(cleanProduct, { country: 'US', state: 'AK', postalCode: '99501' }).reason,
    'SPECIAL_ROUTE_UNVERIFIED'
  );
  const warehouseOnly = { ...cleanProduct, shippingDisposition: 'US_WAREHOUSE_DROPSHIP_ROUTE_VERIFIED' };
  assert.equal(
    evaluateDestination(warehouseOnly, { country: 'US', state: 'CO', postalCode: '80903' }).reason,
    'DESTINATION_ROUTE_UNVERIFIED'
  );
});

test('checkout route is live, noindex, and loads no third-party payment script or Shopify fallback', async () => {
  const res = await request('/checkout');
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.match(body, /Checkout Review/);
  assert.match(body, /data-checkout-form/);
  assert.match(body, /name="robots" content="noindex,nofollow"/);
  assert.match(body, /\/assets\/checkout\.js/);
  assert.match(body, /Payment cannot begin until shipping, tax and final amount due are authoritative/);
  assert.doesNotMatch(body, /https:\/\/.*paypal\.com|Shopify|\/api\/paypal/i);
});

test('checkout resolver accepts POST only for stateless review and rejects malformed payloads', async () => {
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

test('checkout client uses server order APIs and retains provider and card-data guards', async () => {
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
  assert.doesNotMatch(script, /Shopify|unitPrice:\s*line|cardNumber|card_number|cvv|cvc/i);
});
