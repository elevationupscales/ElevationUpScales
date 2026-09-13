import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

const TEST_VERSION = {
  id: '12345678-1234-4abc-8def-1234567890ab',
  tag: 'git-0123456789ab',
  timestamp: '2026-09-12T22:00:00.000Z'
};

async function request(path = '/', init = {}, origin = 'https://elevation-web-v2.test') {
  return worker.fetch(new Request(`${origin}${path}`, init), { CF_VERSION_METADATA: TEST_VERSION });
}

function assertCustomerSafe(body) {
  assert.doesNotMatch(body, /\bWeb V2\b|\bCommerce V2\b|\bOps V2\b|\bStep 4\b|\bPhase 1\b|current shell|not connected|will connect later|migration status|architecture explanation/i);
}

test('homepage renders customer-safe public navigation and SEO', async () => {
  const res = await request('/');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type') || '', /text\/html/);
  assert.match(res.headers.get('content-security-policy') || '', /default-src 'self'/);

  const body = await res.text();
  assert.match(body, /Power Beyond/);
  assert.match(body, /Start a Project/);
  assert.match(body, /Explore by/);
  assert.match(body, /Hawaii Logistics/);
  assert.match(body, /href="\/solar-services"/);
  assert.match(body, /href="\/store"/);
  assert.match(body, /href="\/start-a-project"/);
  assert.match(body, /href="\/what-we-do"/);
  assert.match(body, /href="\/work-with-us"/);
  assert.match(body, /href="\/privacy"/);
  assert.match(body, /href="\/terms"/);
  assert.match(body, /rel="canonical" href="https:\/\/elevationupscales\.com\/"/);
  assert.match(body, /property="og:title"/);
  assert.match(body, /ChatGPT Image Sep 6, 2026, 11_44_56 AM\.png/);
  assert.match(body, /ChatGPT Image Sep 5, 2026, 04_15_53 PM\.png/);
  assert.doesNotMatch(body, /paypal\.com|\/api\/checkout|\/api\/paypal|CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID/i);
  assertCustomerSafe(body);
});

test('runtime version endpoint proves the exact Cloudflare Worker version', async () => {
  const res = await request('/__version');
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {
    service: 'elevation-web-v2',
    ...TEST_VERSION
  });
});

test('health endpoint includes runtime version proof without exposing it in customer HTML', async () => {
  const res = await request('/healthz');
  assert.equal(res.status, 200);
  const payload = await res.json();
  assert.deepEqual(payload, {
    status: 'ok',
    service: 'elevation-web-v2',
    phase: 'commercial-retail-rebuild',
    commerceConnected: false,
    opsConnected: false,
    version: {
      service: 'elevation-web-v2',
      ...TEST_VERSION
    }
  });
});

test('robots and sitemap reflect the current implemented Web V2 route state', async () => {
  const previewRobots = await request('/robots.txt');
  assert.equal(previewRobots.status, 200);
  assert.match(previewRobots.headers.get('content-type') || '', /text\/plain/);
  assert.equal(await previewRobots.text(), 'User-agent: *\nDisallow: /\n');

  const canonicalRobots = await request('/robots.txt', {}, 'https://elevationupscales.com');
  assert.equal(canonicalRobots.status, 200);
  const canonicalRobotsBody = await canonicalRobots.text();
  assert.match(canonicalRobotsBody, /User-agent: \*/);
  assert.match(canonicalRobotsBody, /Allow: \//);
  assert.match(canonicalRobotsBody, /Disallow: \/healthz/);
  assert.match(canonicalRobotsBody, /Disallow: \/__version/);
  assert.match(canonicalRobotsBody, /Sitemap: https:\/\/elevationupscales\.com\/sitemap\.xml/);
  assertCustomerSafe(canonicalRobotsBody);

  const sitemap = await request('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get('content-type') || '', /application\/xml/);
  const sitemapBody = await sitemap.text();
  assert.match(sitemapBody, /<loc>https:\/\/elevationupscales\.com\/<\/loc>/);
  assert.doesNotMatch(sitemapBody, /\/start-a-project<\/loc>|\/store<\/loc>|\/cart<\/loc>|\/checkout<\/loc>|\/solar-project<\/loc>/);
  assertCustomerSafe(sitemapBody);
});

test('owned CSS and JS assets are served locally', async () => {
  const css = await request('/assets/app.css');
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type') || '', /text\/css/);
  assert.match(await css.text(), /@media \(max-width: 680px\)/);

  const js = await request('/assets/app.js');
  assert.equal(js.status, 200);
  assert.match(js.headers.get('content-type') || '', /text\/javascript/);
  assert.match(await js.text(), /aria-expanded/);
});

test('registered-but-unbuilt routes hand off to the current live customer route', async () => {
  const cases = [
    ['/store', 'https://elevationupscales.com/store'],
    ['/solar-services', 'https://elevationupscales.com/solar-services'],
    ['/privacy', 'https://elevationupscales.com/privacy'],
    ['/product?id=test', 'https://elevationupscales.com/product?id=test'],
    ['/start-a-project', 'https://elevationupscales.com/start-a-project'],
    ['/start-a-project?type=home', 'https://elevationupscales.com/start-a-project?type=home'],
    ['/start-a-project?type=rv', 'https://elevationupscales.com/start-a-project?type=rv'],
    ['/start-a-project?solution=solar', 'https://elevationupscales.com/start-a-project?solution=solar'],
    ['/start-a-project?type=home&source=legacy-route', 'https://elevationupscales.com/start-a-project?type=home&source=legacy-route']
  ];

  for (const [path, location] of cases) {
    const res = await request(path);
    assert.equal(res.status, 307, path);
    assert.equal(res.headers.get('location'), location, path);
  }
});

test('unknown routes and canonical-host loop protection use the branded customer-safe 404', async () => {
  const cases = [
    await request('/not-a-real-route'),
    await request('/store', {}, 'https://elevationupscales.com'),
    await request('/start-a-project?type=home', {}, 'https://elevationupscales.com')
  ];

  for (const res of cases) {
    assert.equal(res.status, 404);
    const body = await res.text();
    assert.match(body, /404 • PAGE NOT FOUND/);
    assert.match(body, /We couldn’t find that page/);
    assert.match(body, /name="robots" content="noindex,follow"/);
    assert.doesNotMatch(body, /rel="canonical"/);
    assertCustomerSafe(body);
  }
});

test('compatibility redirects preserve established public route contracts', async () => {
  const cases = [
    ['/index.html', 301, '/'],
    ['/start-a-project.html', 301, '/start-a-project'],
    ['/home-project', 302, '/start-a-project?type=home&source=legacy-route'],
    ['/rv-project.html', 302, '/start-a-project?type=rv&source=legacy-route'],
    ['/marketplace', 301, '/store'],
    ['/lithium-batteries', 301, '/store?department=lithium-batteries'],
    ['/rv-store', 301, '/store?department=rv-outdoor'],
    ['/kingboss-batteries', 301, '/shop/kingboss'],
    ['/product/', 308, '/product']
  ];

  for (const [path, status, location] of cases) {
    const res = await request(path);
    assert.equal(res.status, status, path);
    assert.equal(res.headers.get('location'), location, path);
  }
});

test('mutation methods are not accepted by the public application', async () => {
  const res = await request('/', { method: 'POST' });
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('allow'), 'GET, HEAD');
  const body = await res.text();
  assert.match(body, /Method Not Allowed/);
  assertCustomerSafe(body);
});
