import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = String(process.env.PREVIEW_BASE || '').replace(/\/$/, '');
assert.ok(base, 'PREVIEW_BASE required');
const headers = { Accept: 'application/json' };

const catalogResponse = await fetch(base + '/api/store/catalog?section=lithium-batteries', { headers });
assert.equal(catalogResponse.ok, true, 'Lithium Catalog unavailable');
const catalog = await catalogResponse.json();
assert.ok(Array.isArray(catalog.products) && catalog.products.length > 0, 'No live lithium Catalog products');

let chosen = null;
let lower = null;
for (const product of catalog.products) {
  const response = await fetch(base + '/api/store-checkout/quote', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', Origin: base },
    body: JSON.stringify({ source: 'lithium', id: product.id, quantity: 1, shipping: { state: 'CO' } }),
  });
  const quote = await response.json().catch(() => ({}));
  if (response.ok && quote?.battery?.actualBattery === true && quote?.battery?.batteryUnitsPerItem === 1) {
    chosen = product;
    lower = quote;
    break;
  }
}
assert.ok(chosen, 'No one-battery live lithium SKU available for targeted verification');
assert.equal(lower.battery.shippingPerBatteryCents, 2799, 'Lower-48 per-battery shipping changed');
assert.equal(lower.shippingCents, 2799, 'Lower-48 one-battery shipping changed');

for (const [qty, expected] of [[1, 9900], [2, 19800], [3, 29700]]) {
  const response = await fetch(base + '/api/store-checkout/quote', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', Origin: base },
    body: JSON.stringify({ source: 'lithium', id: chosen.id, quantity: qty, shipping: { state: 'HI' } }),
  });
  const quote = await response.json().catch(() => ({}));
  assert.equal(response.ok, true, `Hawaii quote ${qty} failed: ${quote.error || ''}`);
  assert.equal(quote.shippingCents, expected, `Hawaii freight math qty ${qty}`);
  assert.equal(quote.hawaii.customerFreightPerBatteryCents, 9900);
  assert.equal(quote.hawaii.preferredConsolidationUnits, 3);
  assert.equal(quote.hawaii.warehousePickupOnly, true);
  assert.equal(quote.hawaii.requiresReservation, true);
  assert.equal(quote.totalCents, quote.merchandiseCents + expected);
}

const createResponse = await fetch(base + '/api/store-checkout/orders', {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json', Origin: base },
  body: JSON.stringify({
    source: 'lithium', id: chosen.id, quantity: 1,
    customer: { email: 'targeted-check@example.com' },
    shipping: { fullName: 'Targeted Check', address1: '1 Aloha St', city: 'Honolulu', state: 'HI', postalCode: '96815', countryCode: 'US' },
  }),
});
const createBody = await createResponse.json().catch(() => ({}));
if (createResponse.status !== 503) {
  assert.equal(createResponse.status, 409, 'Hawaii freight should reserve before PayPal capture');
  assert.equal(createBody.hawaiiFreight, true);
  assert.ok(String(createBody.requestUrl || '').includes('/hawaii-lithium-batteries'));
}

const termsResponse = await fetch(base + '/terms');
assert.equal(termsResponse.ok, true, 'Terms page unavailable');
const terms = await termsResponse.text();
for (const text of ['Licensed Lithium Battery Retailer', 'Colorado sales-tax license', '$99 per actual battery', '$27.99 per actual battery']) {
  assert.ok(terms.includes(text), `Terms missing ${text}`);
}

const chrome = process.env.CHROME;
assert.ok(chrome, 'Chrome executable required');
const browser = await chromium.launch({ headless: true, executablePath: chrome, args: ['--no-sandbox'] });
for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));

  await page.goto(base + '/lithium-batteries', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1600);
  assert.equal(errors.length, 0, errors.join('; '));
  assert.ok((await page.locator('body').innerText()).includes('LICENSED LITHIUM BATTERY RETAILER'));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2), false, 'Lithium horizontal overflow');

  await page.goto(base + '/hawaii-lithium-batteries', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2200);
  const hiText = await page.locator('body').innerText();
  for (const text of ['Hawaii Lithium Shipping & Freight', '$99 per actual battery', 'Warehouse / Freight-Terminal Pickup Only', 'Estimated Shipment / Pickup Timing — Not Guaranteed', 'Three compatible batteries']) {
    assert.ok(hiText.includes(text), `Hawaii page missing ${text}`);
  }
  assert.ok(await page.locator('[data-lithium-grid] .lithium-card').count() > 0, 'Hawaii Catalog cards missing');
  assert.ok((await page.locator('[data-lithium-grid] .lithium-card').first().innerText()).includes('Hawaii Freight'));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2), false, 'Hawaii horizontal overflow');

  await page.goto(base + `/product?id=${encodeURIComponent(chosen.id)}&store=lithium`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1600);
  assert.equal(await page.locator('[data-lithium-retailer]').isVisible(), true, 'Lithium retailer trust missing on product detail');
  assert.equal(await page.locator('[data-lithium-freight-link]').isVisible(), true, 'Lithium freight link missing on product detail');

  await page.goto(base + `/checkout/?source=lithium&id=${encodeURIComponent(chosen.id)}&name=${encodeURIComponent(chosen.title || chosen.name || 'Lithium Battery')}&state=HI`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2200);
  assert.equal(await page.locator('#checkout-hawaii-freight').isVisible(), true, 'Hawaii checkout freight panel missing');
  const checkoutText = await page.locator('.eus-checkout-card').innerText();
  assert.ok(checkoutText.includes('Hawaii Consolidated Freight'));
  assert.ok(checkoutText.includes('$99.00'));
  assert.ok(checkoutText.includes('Warehouse Pickup Only'));
  assert.equal(await page.locator('#checkout-paypal').isVisible(), false, 'PayPal should not bypass Hawaii freight reservation');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2), false, 'Checkout horizontal overflow');
  await page.close();
}
await browser.close();
console.log('LITHIUM_HAWAII_TARGETED_VERIFICATION_PASS', chosen.id, catalog.products.length);
