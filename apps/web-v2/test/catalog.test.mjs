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

test('initial vendor pilot is 9 SOK plus one record per remaining launch vendor', () => {
  assert.equal(CATALOG_PRODUCTS.length, 12);
  assert.deepEqual(getProductsByVendor('sok').map(({ sku }) => sku), [
    'SK12V100PC',
    'SK12V100H',
    'SK12V206H',
    'SK12V206PH',
    'SK24V100',
    'SK12V280H',
    'SK12V314PH',
    'SK24V150PH',
    'SK48V100N'
  ]);
  assert.deepEqual(getVendor('sok').unresolvedFacts, []);
  assert.deepEqual(getProductsByVendor('renogy').map(({ sku }) => sku), ['RNG-INVT-3000-12V-P2-G3-US']);
  assert.deepEqual(getProductsByVendor('vevor').map(({ sku }) => sku), ['XXKLJT124INCLJF0QV0']);
  assert.deepEqual(getProductsByVendor('kingboss').map(({ sku }) => sku), ['D01027HH7BV']);
  assert.equal(getProductById('kingboss-d01027hh7bv').supplierSku, UNVERIFIED);
});

test('launch-ready pilot records are orderable while Kingboss remains fail-closed', () => {
  const orderable = CATALOG_PRODUCTS.filter(({ orderable }) => orderable);
  assert.equal(orderable.length, 11);
  assert.equal(getProductsByVendor('sok').every(({ orderable }) => orderable), true);
  assert.equal(getProductById('renogy-rng-invt-3000-12v-p2-g3-us').orderable, true);
  assert.equal(getProductById('vevor-xxkljt124incljf0qv0').orderable, true);

  const kingboss = getProductById('kingboss-d01027hh7bv');
  assert.equal(kingboss.orderable, false);
  assert.ok(kingboss.missingFacts.length > 0);
  assert.ok(kingboss.missingFacts.includes('media'));
  assert.ok(kingboss.missingFacts.includes('channelAuthorization'));
  for (const field of kingboss.missingFacts) assert.ok(REQUIRED_ORDERABILITY_FIELDS.includes(field));
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

test('store and vendor views derive from the bounded initial pilot catalog', () => {
  const storeRoute = getPublicRoute('/store');
  const storeHtml = renderCatalogPage(storeRoute, new URL('https://test.example/store'));
  assert.match(storeHtml, /Power Your RV/);
  assert.match(storeHtml, /Ready to Shop/);
  assert.match(storeHtml, /SK12V100PC/);
  assert.match(storeHtml, /RNG-INVT-3000-12V-P2-G3-US/);
  assert.match(storeHtml, /XXKLJT124INCLJF0QV0/);
  assert.match(storeHtml, /D01027HH7BV/);
  assert.match(storeHtml, /Buy Now/);
  assert.match(storeHtml, /Hawaii Shipping Available/);

  const vevorHtml = renderCatalogPage(getPublicRoute('/shop/vevor'), new URL('https://test.example/shop/vevor'));
  assert.match(vevorHtml, /Camper Levelers/);
  assert.doesNotMatch(vevorHtml, /RNG-INVT-3000-12V-P2-G3-US/);

  const sokHtml = renderCatalogPage(getPublicRoute('/shop/sok'), new URL('https://test.example/shop/sok'));
  assert.match(sokHtml, /SK12V100PC/);
  assert.match(sokHtml, /SK48V100N/);
  assert.doesNotMatch(sokHtml, /source snapshot|No SOK checkout is enabled/i);
});

test('department links actually filter the universal store', () => {
  const storeRoute = getPublicRoute('/store');
  const rvHtml = renderCatalogPage(storeRoute, new URL('https://test.example/store?department=rv-outdoor'));
  const rvCatalog = rvHtml.split('<section class="full-catalog"')[1] || '';
  assert.match(rvCatalog, /Camper Levelers/);
  assert.doesNotMatch(rvCatalog, /SK48V100N/);

  const batteryHtml = renderCatalogPage(storeRoute, new URL('https://test.example/store?department=lithium-batteries'));
  const batteryCatalog = batteryHtml.split('<section class="full-catalog"')[1] || '';
  assert.match(batteryCatalog, /SK12V100PC/);
  assert.doesNotMatch(batteryCatalog, /Camper Levelers/);
});

test('orderable product details expose retail actions while held Kingboss stays disabled', () => {
  const vevorRoute = getPublicRoute('/product/vevor-xxkljt124incljf0qv0');
  assert.equal(vevorRoute.implemented, true);
  const vevorPage = renderCatalogPage(vevorRoute, new URL('https://test.example/product/vevor-xxkljt124incljf0qv0'));
  assert.match(vevorPage, /XXKLJT124INCLJF0QV0/);
  assert.match(vevorPage, /\$39\.90/);
  assert.match(vevorPage, /Available to order/);
  assert.match(vevorPage, /Buy Now/);
  assert.match(vevorPage, /Add to Cart/);
  assert.match(vevorPage, /Hawaii Shipping Available/);
  assert.match(vevorPage, /Product Details/);
  assert.doesNotMatch(vevorPage, /MAP \/ floor|Supplier sellability|Authorized channel|Fulfillment/);

  const heldRoute = getPublicRoute('/product/kingboss-d01027hh7bv');
  const heldPage = renderCatalogPage(heldRoute, new URL('https://test.example/product/kingboss-d01027hh7bv'));
  assert.match(heldPage, /Currently unavailable online/);
  assert.doesNotMatch(heldPage, /data-add-to-cart|data-buy-now/);
});
