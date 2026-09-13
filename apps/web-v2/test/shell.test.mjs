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

test('homepage reproduces the production presentation section-for-section', async () => {
  const res = await request('/');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type') || '', /text\/html/);
  assert.match(res.headers.get('content-security-policy') || '', /default-src 'self'/);
  assert.match(res.headers.get('content-security-policy') || '', /img-src 'self' https:\/\/elevationupscales\.com/);
  const body = await res.text();

  const sections = ['AUTHORIZED SOK ENERGY DEALER', 'Lithium Power', 'AUTHORIZED BATTERY SUPPLY', 'SHOP BY SOLUTION', 'Featured SOK Systems', 'FREIGHT &amp; SHIPPING LOGISTICS', 'Power &amp; Outdoor <span>Products</span>', 'Shop the Store.', 'Build Your Power System.', 'Project &amp; Field Support.'];
  let lastIndex = -1;
  for (const marker of sections) {
    const index = body.indexOf(marker);
    assert.ok(index > lastIndex, `${marker} should appear in production order`);
    lastIndex = index;
  }

  for (const label of ['Power', 'Shop', 'Projects', 'Services', 'Company']) assert.match(body, new RegExp(`<summary>${label}`));
  for (const copy of ['Lithium Batteries', 'SOK Battery Systems', 'Solar System Builder', 'Freight &amp; Logistics', 'Work With Us', 'Marketplace', 'OFF-GRID POWER • SUPPLY • LOGISTICS', 'HAWAII &amp; ALASKA LOGISTICS REVIEW', 'RV • SOLAR • BACKUP • COMMERCIAL', 'Explore Power Solutions', 'Shop Solar', 'View Battery', 'Purchase Options', 'Lithium Battery Freight', 'Hawaii Logistics', 'Alaska Logistics', 'Commercial Supply', 'Home &amp; RV Services', 'Power System Services', 'Shipping &amp; Logistics', 'Terms &amp; Business Disclosures', 'Report an Issue']) assert.match(body, new RegExp(copy));

  for (const href of ['/store?department=lithium-batteries', '/shop/sok', '/store?department=rv-outdoor', '/start-a-project', '/shipping-logistics-services', '/hawaii-lithium-batteries', '/solar-project', '/what-we-do', '/work-with-us', '/marketplace', '/privacy', '/terms', '/report-an-issue']) assert.match(body, new RegExp(`href="${href.replace(/[?]/g, '\\?')}`));

  assert.match(body, /rel="canonical" href="https:\/\/elevationupscales\.com\/"/);
  assert.match(body, /property="og:title"/);
  assert.match(body, /storefront-tropical-logistics-v3\.webp/);
  assert.match(body, /sok-wordmark-home-transparent\.webp/);
  assert.match(body, /sk12v100pc\/home-hero\.webp/);
  assert.match(body, /48v-battery-cabinet\/hero\.webp/);
  assert.match(body, /assets\/logo\.webp/);
  assert.doesNotMatch(body, /Elevation_UpScales_Inc_Blue_LithiumShop_FINAL_FONT\.webp/);
  assert.match(body, /href="\/sok\/sk12v100pc\/"/);
  assert.match(body, /href="\/sok\/sk48v100n\/"/);
  assert.doesNotMatch(body, /href="\/checkout|paypal\.com|\/api\/checkout|\/api\/paypal|CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID/i);
  assert.doesNotMatch(body, />\s*\$[0-9]/);
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

test('owned assets include the scoped production-fidelity layer', async () => {
  const css = await (await request('/assets/app.css')).text();
  assert.match(css, /@media \(max-width:680px\)/);
  assert.match(css, /\.reference-storefront-home \.utility-bar/);
  assert.match(css, /\.homepage-product-grid/);
  assert.match(css, /\.solar-feature-band/);
  assert.match(css, /\.fidelity-footer-grid/);
  assert.match(css, /\.catalog-grid/);
  const js = await (await request('/assets/app.js')).text();
  assert.match(js, /aria-expanded/);
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
