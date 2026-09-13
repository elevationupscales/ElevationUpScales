import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';
import { CART_QUANTITY_LIMIT, parseCartItems, resolveCartLines } from '../src/cart.js';

async function request(path) {
  return worker.fetch(new Request(`https://elevation-web-v2.test${path}`), {});
}

test('cart parser accepts arrays only and rejects malformed client payloads', () => {
  assert.deepEqual(parseCartItems(''), []);
  assert.deepEqual(parseCartItems('[{"productId":"x","quantity":1}]'), [{ productId: 'x', quantity: 1 }]);
  assert.equal(parseCartItems('{"productId":"x"}'), null);
  assert.equal(parseCartItems('not-json'), null);
});

test('current held canonical products cannot become purchasable through cart state', () => {
  const result = resolveCartLines([
    { productId: 'vevor-xxkljt124incljf0qv0', quantity: 1, unitPrice: { currency: 'USD', amount: 0.01 } },
    { productId: 'renogy-rsp100dct-us', quantity: 2 }
  ]);
  assert.deepEqual(result.lines, []);
  assert.equal(result.itemCount, 0);
  assert.equal(result.subtotal.amount, 0);
  assert.equal(result.checkoutReady, false);
  assert.deepEqual(result.blocked.map(({ reason }) => reason), ['PRODUCT_NOT_ORDERABLE', 'PRODUCT_NOT_ORDERABLE']);
});

test('cart derives price and identity from canonical product truth, never client price state', () => {
  const canonical = {
    id: 'clean-product',
    vendorName: 'Verified Vendor',
    sku: 'SKU-1',
    title: 'Verified Product',
    sellPrice: { currency: 'USD', amount: 12.34 },
    orderable: true
  };
  const result = resolveCartLines([
    { productId: 'CLEAN-PRODUCT', quantity: 2, unitPrice: { currency: 'USD', amount: 0.01 }, title: 'Tampered title' }
  ], (id) => id === canonical.id ? canonical : null);

  assert.equal(result.checkoutReady, true);
  assert.equal(result.itemCount, 2);
  assert.equal(result.lines[0].title, 'Verified Product');
  assert.equal(result.lines[0].unitPrice.amount, 12.34);
  assert.equal(result.lines[0].lineTotal.amount, 24.68);
  assert.equal(result.subtotal.amount, 24.68);
});

test('unknown products and invalid quantities fail closed', () => {
  const result = resolveCartLines([
    { productId: 'unknown', quantity: 1 },
    { productId: 'vevor-xxkljt124incljf0qv0', quantity: 0 },
    { productId: 'renogy-rsp100dct-us', quantity: CART_QUANTITY_LIMIT + 1 }
  ]);
  assert.deepEqual(result.lines, []);
  assert.equal(result.checkoutReady, false);
  assert.deepEqual(result.blocked.map(({ reason }) => reason), ['INVALID_QUANTITY', 'INVALID_QUANTITY', 'UNKNOWN_PRODUCT']);
});

test('cart route and same-origin resolver are live without checkout or payment fallback', async () => {
  const cart = await request('/cart');
  assert.equal(cart.status, 200);
  const body = await cart.text();
  assert.match(body, /Your Cart/);
  assert.match(body, /data-cart-root/);
  assert.match(body, /\/assets\/cart\.js/);
  assert.doesNotMatch(body, /Shopify|paypal\.com|\/api\/paypal/i);

  const items = encodeURIComponent(JSON.stringify([{ productId: 'vevor-xxkljt124incljf0qv0', quantity: 1 }]));
  const resolved = await request(`/api/cart/resolve?items=${items}`);
  assert.equal(resolved.status, 200);
  const payload = await resolved.json();
  assert.deepEqual(payload.lines, []);
  assert.equal(payload.blocked[0].reason, 'PRODUCT_NOT_ORDERABLE');
  assert.equal(payload.checkoutReady, false);

  const malformed = await request('/api/cart/resolve?items=not-json');
  assert.equal(malformed.status, 400);
  assert.deepEqual(await malformed.json(), { error: 'INVALID_CART_PAYLOAD' });
});

test('cart client stores only product IDs and quantities and uses the server resolver', async () => {
  const res = await request('/assets/cart.js');
  assert.equal(res.status, 200);
  const script = await res.text();
  assert.match(script, /localStorage/);
  assert.match(script, /productId, quantity/);
  assert.match(script, /\/api\/cart\/resolve/);
  assert.match(script, /Continue to checkout/);
  assert.doesNotMatch(script, /paypal\.com|Shopify|unitPrice:\s*line/i);
});
