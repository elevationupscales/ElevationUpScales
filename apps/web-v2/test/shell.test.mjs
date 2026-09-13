import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

const TEST_VERSION = { id: '12345678-1234-4abc-8def-1234567890ab', tag: 'git-0123456789ab', timestamp: '2026-09-12T22:00:00.000Z' };

async function request(path = '/', init = {}, origin = 'https://elevation-web-v2.test') {
  return worker.fetch(new Request(`${origin}${path}`, init), { CF_VERSION_METADATA: TEST_VERSION });
}

function assertCustomerSafe(body) {
  assert.doesNotMatch(body, /\bWeb V2\b|\bCommerce V2\b|\bOps V2\b|\bStep 4\b|\bPhase 1\b|current shell|not connected|will connect later|migration status|architecture explanation/i);
}

test('homepage reproduces the owner-approved production presentation and visible copy', async () => {
  const res = await request('/');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type') || '', /text\/html/);
  assert.match(res.headers.get('content-security-policy') || '', /default-src 'self'/);
  assert.match(res.headers.get('content-security-policy') || '', /img-src 'self' https:\/\/elevationupscales\.com/);
  const body = await res.text();

  const sections = [
    'AUTHORIZED SOK ENERGY DEALER',
    'Lithium Power',
    'AUTHORIZED BATTERY SUPPLY',
    'SHOP BY SOLUTION',
    'FEATURED SOK SYSTEMS',
    'FREIGHT &amp; SHIPPING LOGISTICS',
    'SHOP THE STORE.',
    'BUILD YOUR POWER SYSTEM.',
    'PROJECT &amp; FIELD SUPPORT.'
  ];
  let lastIndex = -1;
  for (const marker of sections) {
    const index = body.indexOf(marker);
    assert.ok(index > lastIndex, `${marker} should appear in production order`);
    lastIndex = index;
  }

  for (const label of ['Power', 'Shop', 'Projects', 'Services', 'Company']) assert.match(body, new RegExp(`<summary>${label}`));
  for (const copy of [
    'OFF-GRID POWER • SUPPLY • LOGISTICS',
    'HAWAII &amp; ALASKA LOGISTICS REVIEW',
    'RV • SOLAR • BACKUP • COMMERCIAL',
    'Elevation UpScales, Inc. is a lithium battery and energy retailer expanding a qualified vendor network for commercial freight and dropshipping.',
    'SHOP POWER &amp; ENERGY',
    '12V lithium energy for RV and mobile systems.',
    'Shop Batteries',
    '12V, 24V & 48V systems.',
    'Build your energy independence.',
    'Battery freight matched to product and destination.',
    'Learn More',
    'Current batteries and gear for the journey.',
    'Keep what matters running.',
    'Scalable power solutions.',
    'Shop Commercial',
    'View All SOK Products',
    'View Battery',
    'Purchase Options',
    'Lithium Battery Freight',
    'Hawaii Logistics',
    'Alaska Logistics',
    'Commercial Supply',
    'Controlled review for 4+ batteries, rack storage and larger product-supply quantities.',
    'Current lithium and RV &amp; Outdoor products from the live Elevation catalog.',
    'Home &amp; RV Services',
    'Power System Services',
    'Shipping &amp; Logistics',
    'Terms &amp; Business Disclosures',
    'Report an Issue'
  ]) assert.match(body, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));

  for (const href of ['/store', '/store?department=lithium-batteries', '/shop/sok', '/store?department=rv-outdoor', '/start-a-project', '/shipping-logistics-services', '/hawaii-lithium-batteries', '/solar-project', '/what-we-do', '/work-with-us', '/marketplace', '/privacy', '/terms', '/report-an-issue']) assert.match(body, new RegExp(`href="${href.replace(/[?]/g, '\\?')}`));

  assert.match(body, /rel="canonical" href="https:\/\/elevationupscales\.com\/"/);
  assert.match(body, /property="og:title"/);
  assert.match(body, /storefront-tropical-logistics-v3\.webp/);
  assert.match(body, /sok-wordmark-home-transparent\.webp/);
  assert.match(body, /sk12v100pc\/official-clean\.png/);
  assert.match(body, /sk48v100n\/official-clean\.png/);
  assert.doesNotMatch(body, /sk48v100n\/(?:hero\.jpg|home-crop\.webp)|48v-battery-cabinet\/hero\.webp|Buy More,? Save More/i);
  assert.match(body, /Elevation_UpScales_Inc_Blue_LithiumShop_FINAL_FONT\.webp/);
  assert.doesNotMatch(body, /assets\/logo\.webp/);
  assert.match(body, /href="\/sok\/sk12v100pc\/"/);
  assert.match(body, /href="\/sok\/sk48v100n\/"/);

  for (const product of [
    '100Ah LiFePO4 Battery',
    '12V 100Ah LiFePO4 Battery',
    '12V 100Ah Battery',
    'Portable Solar Power Bank — 10000mAh',
    '12V 100AH LiFePO4 Battery',
    'Rechargeable 200,000 Lumens LED Spotlight',
    '8L Hot Water Heater Tankless Instant Boiler Outdoor',
    'Portable Walk-In Greenhouse 20&#39; x 10&#39; Hot House with Steel Hoops &amp; Windows',
    '12V Electric Scissor Car Jack &amp; Impact Wrench',
    '12V Water Diaphragm Pump - 5.5 GPM &amp; 70 PSI Adjustable',
    'Heavy-Duty 5.3 Gallon Metal Fuel Can with Spout &amp; Comfort Handle'
  ]) assert.match(body, new RegExp(product.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

  assert.doesNotMatch(body, /Power &amp; Outdoor <span>Products<\/span>|Power & Outdoor Products/i);
  assert.doesNotMatch(body, /Explore Power Solutions|Explore Hawaii|Commercial Supply <span aria-hidden="true">→<\/span>/i);
  assert.doesNotMatch(body, /href="\/checkout|paypal\.com|\/api\/checkout|\/api\/paypal|CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID/i);
  assert.doesNotMatch(body, />\s*\$[0-9]/);
  assert.doesNotMatch(body, />\s*Buy Now\s*</i);
  assert.match(body, /Catalog Options/);
  assertCustomerSafe(body);
});

test('runtime version and health retain internal proof outside customer HTML', async () => {
  const version = await request('/__version');
  assert.equal(version.status, 200);
  assert.deepEqual(await version.json(), { service: 'elevation-web-v2', ...TEST_VERSION });
  const health = await request('/healthz');
  assert.deepEqual(await health.json(), { status: 'ok', service: 'elevation-web-v2', phase: 'commercial-retail-rebuild', commerceConnected: false, opsConnected: false, version: { service: 'elevation-web-v2', ...TEST_VERSION } });
});

test('robots and sitemap reflect only implemented Web V2 routes', async () => {
  const previewRobots = await request('/robots.txt');
  assert.equal(await previewRobots.text(), 'User-agent: *\nDisallow: /\n');
  const canonicalRobots = await request('/robots.txt', {}, 'https://elevationupscales.com');
  const robots = await canonicalRobots.text();
  assert.match(robots, /Disallow: \/healthz/);
  assert.match(robots, /Disallow: \/__version/);
  assert.match(robots, /Sitemap: https:\/\/elevationupscales\.com\/sitemap\.xml/);
  const sitemap = await (await request('/sitemap.xml')).text();
  for (const route of ['/', '/store', '/shop/sok', '/shop/renogy', '/shop/vevor', '/shop/kingboss']) assert.match(sitemap, new RegExp(`<loc>https://elevationupscales.com${route.replace('/', '\\/')}`));
  assert.doesNotMatch(sitemap, /\/start-a-project<\/loc>|\/cart<\/loc>|\/checkout<\/loc>|\/solar-project<\/loc>/);
});

test('owned assets include the scoped production-fidelity and mobile layers', async () => {
  const css = await (await request('/assets/app.css')).text();
  assert.match(css, /@media\(max-width:680px\)/);
  assert.match(css, /\.reference-storefront-home \.utility-bar/);
  assert.match(css, /\.reference-storefront-home \.brand>img/);
  assert.match(css, /\.sok-products-grid/);
  assert.match(css, /\.home-product-grid/);
  assert.match(css, /grid-template-columns:repeat\(6,minmax\(0,1fr\)\)/);
  assert.match(css, /\.solar-feature-band/);
  assert.match(css, /\.fidelity-footer-grid/);
  assert.match(css, /\.catalog-grid/);
  const js = await (await request('/assets/app.js')).text();
  assert.match(js, /aria-expanded/);
});

test('SOK product showcase serves only the localized official clean photography', async () => {
  const expected = [
    ['/assets/brands/sok/sk12v100pc/official-clean.png', 'SK12V100PC'],
    ['/assets/brands/sok/sk48v100n/official-clean.png', 'SK48V100N']
  ];
  for (const [path] of expected) {
    const res = await request(path);
    assert.equal(res.status, 200, path);
    assert.match(res.headers.get('content-type') || '', /^image\/png/i, path);
    assert.match(res.headers.get('cache-control') || '', /immutable/, path);
    assert.ok((await res.arrayBuffer()).byteLength > 250000, `${path} should contain the localized official PNG bytes`);
  }

  const home = await (await request('/')).text();
  for (const [path, sku] of expected) {
    assert.match(home, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(home, new RegExp(`alt="[^"]*${sku}[^"]*"`, 'i'));
  }
  assert.doesNotMatch(home, /sk48v100n\/(?:hero\.jpg|home-crop\.webp)|48v-battery-cabinet\/hero\.webp|Buy More,? Save More/i);

  const js = await (await request('/assets/app.js')).text();
  assert.doesNotMatch(js, /48v-battery-cabinet|home-crop\.webp|Buy More,? Save More/i);

  const css = await (await request('/assets/app.css')).text();
  assert.match(css, /hero-product-12 img/);
  assert.match(css, /hero-product-48 img/);
  assert.match(css, /background:#f3f5f5/);
});

test('canonical catalog routes remain customer-safe', async () => {
  for (const path of ['/store', '/shop/sok', '/shop/renogy', '/shop/vevor', '/shop/kingboss', '/product/vevor-xxkljt124incljf0qv0']) {
    const res = await request(path);
    assert.equal(res.status, 200, path);
    const body = await res.text();
    assert.doesNotMatch(body, /Shopify|paypal\.com/i, path);
    assertCustomerSafe(body);
  }
});

test('working Legacy routes bridge until their complete Web V2 slice exists', async () => {
  const cases = [
    ['/shipping-logistics-services', 'https://elevationupscales.com/shipping-logistics-services'],
    ['/hawaii-lithium-batteries', 'https://elevationupscales.com/hawaii-lithium-batteries'],
    ['/privacy', 'https://elevationupscales.com/privacy'],
    ['/product?id=test', 'https://elevationupscales.com/product?id=test'],
    ['/start-a-project?type=home', 'https://elevationupscales.com/start-a-project?type=home'],
    ['/start-a-project?solution=solar', 'https://elevationupscales.com/start-a-project?solution=solar'],
    ['/sok/sk12v100pc/', 'https://elevationupscales.com/sok/sk12v100pc'],
    ['/sok/sk48v100n/', 'https://elevationupscales.com/sok/sk48v100n']
  ];
  for (const [path, location] of cases) {
    const res = await request(path);
    assert.equal(res.status, 307, path);
    assert.equal(res.headers.get('location'), location, path);
  }
});

test('404, compatibility redirects, and mutation guard remain intact', async () => {
  const notFound = await request('/not-a-real-route');
  assert.equal(notFound.status, 404);
  const missingBody = await notFound.text();
  assert.match(missingBody, /404 • PAGE NOT FOUND/);
  assert.match(missingBody, /name="robots" content="noindex,follow"/);
  assertCustomerSafe(missingBody);

  const cases = [
    ['/index.html', 301, '/'], ['/start-a-project.html', 301, '/start-a-project'],
    ['/home-project', 302, '/start-a-project?type=home&source=legacy-route'], ['/rv-project.html', 302, '/start-a-project?type=rv&source=legacy-route'],
    ['/marketplace', 301, '/store'], ['/lithium-batteries', 301, '/store?department=lithium-batteries'],
    ['/rv-store', 301, '/store?department=rv-outdoor'], ['/kingboss-batteries', 301, '/shop/kingboss']
  ];
  for (const [path, status, location] of cases) {
    const res = await request(path);
    assert.equal(res.status, status, path);
    assert.equal(res.headers.get('location'), location, path);
  }

  const mutation = await request('/', { method: 'POST' });
  assert.equal(mutation.status, 405);
  assert.equal(mutation.headers.get('allow'), 'GET, HEAD');
});
