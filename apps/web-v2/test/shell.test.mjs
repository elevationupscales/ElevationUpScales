import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

async function request(path = '/', init = {}) {
  return worker.fetch(new Request(`https://elevation-web-v2.test${path}`, init));
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

test('start-a-project is an honest customer action without a fabricated form', async () => {
  const res = await request('/start-a-project');
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.match(body, /START A PROJECT/);
  assert.match(body, /Call 208-813-4998/);
  assert.match(body, /mailto:casey@elevationupscales\.com\?subject=Start%20a%20Project/);
  assert.match(body, /rel="canonical" href="https:\/\/elevationupscales\.com\/start-a-project"/);
  assert.doesNotMatch(body, /<form\b/i);
  assertCustomerSafe(body);
});

test('health endpoint keeps internal implementation state out of customer HTML', async () => {
  const res = await request('/healthz');
  assert.equal(res.status, 200);
  const payload = await res.json();
  assert.deepEqual(payload, {
    status: 'ok',
    service: 'elevation-web-v2',
    phase: 'phase-1-step-4-shell',
    commerceConnected: false,
    opsConnected: false
  });
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

test('unknown and registered-but-unbuilt routes use the branded customer-safe 404', async () => {
  for (const path of ['/not-a-real-route', '/store', '/solar-services', '/privacy']) {
    const res = await request(path);
    assert.equal(res.status, 404, path);
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
});
