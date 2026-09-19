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
  missingRequiredFacts,
  searchCatalog
} from '../src/catalog.js';
import { renderCatalogPage } from '../src/catalog-pages.js';
import { catalogStyles } from '../src/catalog-styles.js';
import { getPublicRoute } from '../src/routes.js';

const SOK_ACTIVE_SKUS = [
  'SK12V100PC',
  'SK12V100H',
  'SK12V206H',
  'SK12V206PH',
  'SK24V100',
  'SK12V280H',
  'SK12V314PH',
  'SK24V150PH',
  'SK48V100N'
];

const SOK_SUPPORT_SKUS = [
  'SK12V40A',
  'SK12V20A',
  'SK24V10A',
  'SK48V18A',
  'SKTC30',
  'SK4S100',
  'SK48V100NBR',
  'SK-L250-8',
  'SK12V314PHBTI',
  'SK12V314PHBTB',
  'SOK-48V-CABINET'
];

test('universal catalog includes active SOK, verified SOK support identities, Renogy, VEVOR, SunGoldPower and held Kingboss cohorts', () => {
  assert.equal(CATALOG_PRODUCTS.length, 31);
  assert.deepEqual(getProductsByVendor('sok').map(({ sku }) => sku), [...SOK_ACTIVE_SKUS, ...SOK_SUPPORT_SKUS]);
  assert.deepEqual(getVendor('sok').unresolvedFacts, []);
  assert.deepEqual(getProductsByVendor('renogy').map(({ sku }) => sku), ['RNG-INVT-3000-12V-P2-G3-US']);
  assert.deepEqual(getProductsByVendor('vevor').map(({ sku }) => sku), ['XXKLJT124INCLJF0QV0']);
  assert.deepEqual(getProductsByVendor('sungoldpower').map(({ sku }) => sku), [
    'LFP12-100A',
    'SG48100P',
    'SPH8048P',
    'SPH10048P',
    'SGS-12K18MAX',
    'SG560WBGx2',
    'SGH-11N2E',
    'SGR-10K25S'
  ]);
  assert.deepEqual(getProductsByVendor('kingboss').map(({ sku }) => sku), ['D01027HH7BV']);
  assert.equal(getProductById('kingboss-d01027hh7bv').supplierSku, UNVERIFIED);
});

test('existing launch-ready products remain orderable while support identities, SunGoldPower and Kingboss stay transaction-held', () => {
  const orderable = CATALOG_PRODUCTS.filter(({ orderable }) => orderable);
  assert.equal(orderable.length, 11);

  const sokProducts = getProductsByVendor('sok');
  assert.equal(sokProducts.filter(({ orderable: ready }) => ready).length, 9);
  assert.deepEqual(sokProducts.filter(({ orderable: ready }) => !ready).map(({ sku }) => sku), SOK_SUPPORT_SKUS);
  for (const sku of SOK_SUPPORT_SKUS) {
    const product = sokProducts.find((candidate) => candidate.sku === sku);
    assert.equal(product.orderable, false, sku);
    assert.ok(product.missingFacts.includes('media'), sku);
    assert.ok(product.missingFacts.includes('sellPrice'), sku);
    assert.ok(product.missingFacts.includes('fulfillmentSource'), sku);
  }

  assert.equal(getProductById('renogy-rng-invt-3000-12v-p2-g3-us').orderable, true);
  assert.equal(getProductById('vevor-xxkljt124incljf0qv0').orderable, true);

  for (const product of getProductsByVendor('sungoldpower')) {
    assert.equal(product.orderable, false, product.sku);
    assert.equal(product.channelAuthorization, 'ELEVATION_DIRECT_WEBSITE');
    assert.equal(product.stockState, 'IN_STOCK_VERIFIED');
    assert.equal(product.sellPrice.amount, product.priceFloor.amount);
    assert.equal(product.priceFloor.policy, 'SUNGOLDPOWER_MAP_2026_09_15');
    assert.ok(product.missingFacts.includes('media'));
    assert.ok(product.missingFacts.includes('shippingDisposition'));
    assert.ok(product.missingFacts.includes('fulfillmentSource'));
  }

  const kingboss = getProductById('kingboss-d01027hh7bv');
  assert.equal(kingboss.orderable, false);
  assert.ok(kingboss.missingFacts.length > 0);
  assert.ok(kingboss.missingFacts.includes('media'));
  assert.ok(kingboss.missingFacts.includes('channelAuthorization'));
  for (const field of kingboss.missingFacts) assert.ok(REQUIRED_ORDERABILITY_FIELDS.includes(field));
});

test('SunGoldPower initial MAP pricing is encoded without supplier cost exposure', () => {
  assert.equal(getProductById('sungoldpower-lfp12-100a').sellPrice.amount, 295);
  assert.equal(getProductById('sungoldpower-sg48100p').sellPrice.amount, 1090);
  assert.equal(getProductById('sungoldpower-sph8048p').sellPrice.amount, 1450);
  assert.equal(getProductById('sungoldpower-sph10048p').sellPrice.amount, 1580);
  assert.equal(getProductById('sungoldpower-sgs-12k18max').sellPrice.amount, 2990);
  assert.equal(getProductById('sungoldpower-sg560wbgx2').sellPrice.amount, 980);
  assert.equal(getProductById('sungoldpower-sgh-11n2e').sellPrice.amount, 11950);
  assert.equal(getProductById('sungoldpower-sgr-10k25s').sellPrice.amount, 10350);
  for (const product of getProductsByVendor('sungoldpower')) {
    assert.equal(Object.hasOwn(product, 'dealerCost'), false);
    assert.equal(Object.hasOwn(product, 'supplierCost'), false);
  }
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

test('store and vendor views derive from the expanded universal catalog', () => {
  const storeRoute = getPublicRoute('/store');
  const storeHtml = renderCatalogPage(storeRoute, new URL('https://test.example/store'));
  assert.match(storeHtml, /Power Your RV/);
  assert.match(storeHtml, /Ready to Shop/);
  assert.match(storeHtml, /SK12V100PC/);
  assert.match(storeHtml, /SK12V40A/);
  assert.match(storeHtml, /RNG-INVT-3000-12V-P2-G3-US/);
  assert.match(storeHtml, /XXKLJT124INCLJF0QV0/);
  assert.match(storeHtml, /LFP12-100A/);
  assert.match(storeHtml, /SUNGOLDPOWER/);
  assert.match(storeHtml, /D01027HH7BV/);
  assert.match(storeHtml, /Buy Now/);
  assert.match(storeHtml, /Hawaii Shipping Available/);

  const sungoldRoute = getPublicRoute('/shop/sungoldpower');
  assert.equal(sungoldRoute.implemented, true);
  const sungoldHtml = renderCatalogPage(sungoldRoute, new URL('https://test.example/shop/sungoldpower'));
  assert.match(sungoldHtml, /SunGoldPower/);
  assert.match(sungoldHtml, /LFP12-100A/);
  assert.match(sungoldHtml, /SGH-11N2E/);
  assert.match(sungoldHtml, /\$295\.00/);
  assert.doesNotMatch(sungoldHtml, /data-buy-now="sungoldpower-/);

  const vevorHtml = renderCatalogPage(getPublicRoute('/shop/vevor'), new URL('https://test.example/shop/vevor'));
  assert.match(vevorHtml, /Camper Levelers/);
  assert.doesNotMatch(vevorHtml, /RNG-INVT-3000-12V-P2-G3-US/);

  const sokHtml = renderCatalogPage(getPublicRoute('/shop/sok'), new URL('https://test.example/shop/sok'));
  assert.match(sokHtml, /SK12V100PC/);
  assert.match(sokHtml, /SK48V100N/);
  assert.match(sokHtml, /SK12V40A/);
  assert.match(sokHtml, /SKTC30/);
  assert.match(sokHtml, /SOK-48V-CABINET/);
  assert.doesNotMatch(sokHtml, /source snapshot|No SOK checkout is enabled/i);
});

test('department and category links filter the universal store to customer-readable groups', () => {
  const storeRoute = getPublicRoute('/store');
  const rvHtml = renderCatalogPage(storeRoute, new URL('https://test.example/store?department=rv-outdoor'));
  const rvCatalog = rvHtml.split('<section class="full-catalog"')[1] || '';
  assert.match(rvCatalog, /Camper Levelers/);
  assert.doesNotMatch(rvCatalog, /SK48V100N/);

  const batteryHtml = renderCatalogPage(storeRoute, new URL('https://test.example/store?department=lithium-batteries'));
  const batteryCatalog = batteryHtml.split('<section class="full-catalog"')[1] || '';
  assert.match(batteryCatalog, /SK12V100PC/);
  assert.match(batteryCatalog, /LFP12-100A/);
  assert.doesNotMatch(batteryCatalog, /Camper Levelers/);

  const accessorySkus = searchCatalog('accessories').map(({ sku }) => sku);
  assert.ok(accessorySkus.includes('SK12V40A'));
  assert.ok(accessorySkus.includes('SK48V100NBR'));
  assert.ok(accessorySkus.includes('SK-L250-8'));
  assert.equal(accessorySkus.includes('SK12V100PC'), false);

  const commercialSkus = searchCatalog('commercial').map(({ sku }) => sku);
  assert.deepEqual(commercialSkus, ['SOK-48V-CABINET']);
});

test('orderable product details expose retail actions while held products and SOK support identities stay disabled', () => {
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

  const accessoryRoute = getPublicRoute('/product/sok-sk12v40a');
  const accessoryPage = renderCatalogPage(accessoryRoute, new URL('https://test.example/product/sok-sk12v40a'));
  assert.match(accessoryPage, /SK12V40A/);
  assert.match(accessoryPage, /Battery Charger for 12V LiFePO4 Batteries/);
  assert.match(accessoryPage, /Currently unavailable online/);
  assert.doesNotMatch(accessoryPage, /data-add-to-cart|data-buy-now/);

  const sungoldRoute = getPublicRoute('/product/sungoldpower-lfp12-100a');
  const sungoldPage = renderCatalogPage(sungoldRoute, new URL('https://test.example/product/sungoldpower-lfp12-100a'));
  assert.match(sungoldPage, /LFP12-100A/);
  assert.match(sungoldPage, /\$295\.00/);
  assert.match(sungoldPage, /Currently unavailable online/);
  assert.doesNotMatch(sungoldPage, /data-add-to-cart|data-buy-now/);

  const heldRoute = getPublicRoute('/product/kingboss-d01027hh7bv');
  const heldPage = renderCatalogPage(heldRoute, new URL('https://test.example/product/kingboss-d01027hh7bv'));
  assert.match(heldPage, /Currently unavailable online/);
  assert.doesNotMatch(heldPage, /data-add-to-cart|data-buy-now/);
});

test('catalog contrast rules keep dark cards readable and white detail cards explicit', () => {
  assert.match(catalogStyles, /\.catalog-card \.sku\{[^}]*color:#c7dbe2/);
  assert.match(catalogStyles, /\.catalog-card \.vendor\{[^}]*color:#7fe8ff/);
  assert.match(catalogStyles, /\.catalog-detail-card,\.catalog-facts\{[^}]*color:#0b1b22/);
  assert.match(catalogStyles, /\.catalog-main>\.catalog-shell>a\{[^}]*color:#7fe8ff/);
});
