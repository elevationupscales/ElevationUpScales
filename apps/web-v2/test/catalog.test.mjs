import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATALOG_PRODUCTS,
  REQUIRED_ORDERABILITY_FIELDS,
  UNVERIFIED,
  evaluateOrderability,
  getProductById,
  getProductsByVendor,
  getVendor,
  missingRequiredFacts
} from '../src/catalog.js';
import { renderCatalogPage } from '../src/catalog-pages.js';
import { getPublicRoute } from '../src/routes.js';

test('canonical catalog preserves exact verified subset identities without inventing SOK SKUs', () => {
  assert.equal(CATALOG_PRODUCTS.length, 7);
  assert.deepEqual(getProductsByVendor('sok'), []);
  assert.equal(getVendor('sok').unresolvedFacts[0], 'exactSkuIdentity');
  assert.equal(getProductById('renogy-rsp100dct-us').sku, 'RSP100DCT-US');
  assert.equal(getProductById('renogy-rsp100dct-us').supplierSku, 'RSP100DCT-G1-US');
  assert.equal(getProductById('renogy-rbm500-us').supplierSku, 'RBM500-G3-US');
  assert.equal(getProductById('renogy-rbc2125ds-21w-us').supplierSku, 'RBC2125DS-21W-G3-US');
  assert.equal(getProductById('kingboss-d01027hh7bv').supplierSku, 'Model 133');
  assert.deepEqual(getProductsByVendor('vevor').map(({ sku }) => sku), ['XXKLJT124INCLJF0QV0', 'AXLSTCQJDSYKAZ99C001V0', 'D25FT14IN20AHOGLOV1']);
});

test('all source gaps fail closed and cannot become orderable', () => {
  for (const product of CATALOG_PRODUCTS) {
    assert.equal(product.orderable, false, product.id);
    assert.ok(product.missingFacts.length > 0, product.id);
    for (const field of product.missingFacts) assert.ok(REQUIRED_ORDERABILITY_FIELDS.includes(field));
  }
  assert.ok(getProductById('vevor-xxkljt124incljf0qv0').missingFacts.includes('specs'));
  assert.ok(getProductById('renogy-rsp100dct-us').missingFacts.includes('sellPrice'));
  assert.ok(getProductById('kingboss-d01027hh7bv').missingFacts.includes('channelAuthorization'));
});

test('orderability is derived and recursive UNVERIFIED values fail closed', () => {
  const clean = Object.fromEntries(REQUIRED_ORDERABILITY_FIELDS.map((field) => [field, 'VERIFIED']));
  Object.assign(clean, {
    vendorId: 'test', sku: 'TEST-1', title: 'Test product', specs: { summary: 'Verified spec' }, media: ['verified.jpg'],
    sellPrice: { currency: 'USD', amount: 10 }, priceFloor: { policy: 'VERIFIED', amount: 9 }, stockState: 'IN_STOCK_VERIFIED',
    backorderState: 'NOT_AUTHORIZED', shippingDisposition: 'VERIFIED_ROUTE', warrantyReturnsOwnership: 'VERIFIED_OWNER',
    fulfillmentSource: 'VERIFIED_SOURCE', channelAuthorization: 'ELEVATION_DIRECT_WEBSITE'
  });
  assert.equal(evaluateOrderability(clean), true);
  const missingFloor = { ...clean, priceFloor: { policy: 'VERIFIED', amount: UNVERIFIED } };
  assert.equal(evaluateOrderability(missingFloor), false);
  assert.deepEqual(missingRequiredFacts(missingFloor), ['priceFloor']);
});

test('store and vendor views derive from the canonical catalog without Shopify fallback', () => {
  const storeRoute = getPublicRoute('/store');
  const storeHtml = renderCatalogPage(storeRoute, new URL('https://test.example/store'));
  assert.match(storeHtml, /Elevation Product Catalog/);
  assert.match(storeHtml, /RSP100DCT-US/);
  assert.match(storeHtml, /XXKLJT124INCLJF0QV0/);
  assert.match(storeHtml, /D01027HH7BV/);
  assert.doesNotMatch(storeHtml, /Add to Cart|Shopify/i);
  const vevorHtml = renderCatalogPage(getPublicRoute('/shop/vevor'), new URL('https://test.example/shop/vevor'));
  assert.match(vevorHtml, /Camper Levelers/);
  assert.doesNotMatch(vevorHtml, /RSP100DCT-US/);
  const sokHtml = renderCatalogPage(getPublicRoute('/shop/sok'), new URL('https://test.example/shop/sok'));
  assert.match(sokHtml, /No SOK checkout is enabled/);
  assert.doesNotMatch(sokHtml, /SK12V100PC|SK48V100N/);
});

test('product detail renders verified facts and holds missing facts without checkout', () => {
  const route = getPublicRoute('/product/vevor-xxkljt124incljf0qv0');
  assert.equal(route.implemented, true);
  const page = renderCatalogPage(route, new URL('https://test.example/product/vevor-xxkljt124incljf0qv0'));
  assert.match(page, /XXKLJT124INCLJF0QV0/);
  assert.match(page, /\$39\.90/);
  assert.match(page, /Verification hold — checkout disabled/);
  assert.match(page, /approved product specifications/);
  assert.match(page, /current MAP \/ advertised-price floor/);
  assert.doesNotMatch(page, /Add to Cart|Shopify|paypal\.com/i);
});
