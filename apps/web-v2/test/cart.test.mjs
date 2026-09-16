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

test('Kingboss verification pilot cannot become purchasable through cart state', () => {
  const result = resolveCartLines([
    { productId: 'kingboss-d01027hh7bv', quantity: 1, unitPrice: { currency: 'USD', amount: 0.01 } }
  ]);
  assert.deepEqual(result.lines, []);
  assert.equal(result.itemCount, 0);
  assert.equal(result.subtotal.amount, 0);
  assert.equal(result.checkoutReady, false);
  assert.deepEqual(result.blocked.map(({ reason }) => reason), ['PRODUCT_NOT_ORDERABLE']);
});

test('pilot catalog derives price and identity from canonical product truth, never client price state', () => {
  const result = resolveCartLines([
    { productId: 'sok-sk12v100pc', quantity: 2, unitPrice: { currency: 'USD', amount: 0.01 }, title: 'Tampered title' },
    { productId: 'vevor-xxkljt124incljf0qv0', quantity: 1, unitPrice: { currency: 'USD', amount: 0.01 } }
  ]);

  assert.equal(result.checkoutReady, true);
  assert.equal(result.itemCount, 3);
  assert.equal(result.lines[0].title, 'Premium 12V 100Ah Bluetooth LiFePO4 Battery — SK12V100PC');
  assert.equal(result.lines[0].unitPrice.amount, 319);
  assert.equal(result.lines[0].lineTotal.amount, 638);
  assert.equal(result.lines[1].unitPrice.amount, 39.90);
  assert.equal(result.subtotal.amount, 677.90);
});

test('unknown products and invalid quantities fail closed', () => {
  const result = resolveCartLines([
    { productId: 'unknown', quantity: 1 },
    { productId: 'vevor-xxkljt124incljf0qv0', quantity: 0 },
    { productId: 'renogy-rng-invt-3000-12v-p2-g3-us', quantity: CART_QUANTITY_LIMIT + 1 }
  ]);
  assert.deepEqual(result.lines, []);
  assert.equal(result.checkoutReady, false);
  assert.deepEqual(result.blocked.map(({ reason }) => reason), ['INVALID_QUANTITY', 'INVALID_QUANTITY', 'UNKNOWN_PRODUCT']);
});

test('cart route resolves the bounded pilot catalog without third-party fallback', async () => {
  const cart = await request('/cart');
  assert.equal(cart.status, 200);
  const body = await cart.text();
  assert.match(body, /Your Cart/);
  assert.match(body, /data-cart-root/);
  assert.match(body, /\/assets\/cart\.js/);
  assert.doesNotMatch(body, /Shopify|paypal\.com|\/api\/paypal/i);

  const items = encodeURIComponent(JSON.stringify([{ productId: 'sok-sk12v100pc', quantity: 1 }]));
  const resolved = await request(`/api/cart/resolve?items=${items}`);
  assert.equal(resolved.status, 200);
  const payload = await resolved.json();
  assert.equal(payload.lines.length, 1);
  assert.equal(payload.lines[0].sku, 'SK12V100PC');
  assert.equal(payload.lines[0].unitPrice.amount, 319);
  assert.equal(payload.checkoutReady, true);

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
