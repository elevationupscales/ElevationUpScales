import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

async function request(path = '/', init = {}) {
  return worker.fetch(new Request(`https://elevation-web-v2.test${path}`, init));
}

test('homepage shell renders the Elevation customer hierarchy', async () => {
  const res = await request('/');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type') || '', /text\/html/);
  assert.match(res.headers.get('content-security-policy') || '', /default-src 'self'/);

  const body = await res.text();
  assert.match(body, /Power Beyond/);
  assert.match(body, /Start a Project/);
  assert.match(body, /Shop by/);
  assert.match(body, /Hawaii Logistics/);
  assert.match(body, /ChatGPT Image Sep 6, 2026, 11_44_56 AM\.png/);
  assert.match(body, /ChatGPT Image Sep 5, 2026, 04_15_53 PM\.png/);
  assert.doesNotMatch(body, /PayPal|checkout|CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID/i);
});

test('canonical start-a-project route stays present in the shell', async () => {
  const res = await request('/start-a-project');
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.match(body, /START A PROJECT/);
  assert.match(body, /Call 208-813-4998/);
});

test('health endpoint exposes separation state without secrets', async () => {
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

test('shell-owned CSS and JS assets are served locally', async () => {
  const css = await request('/assets/app.css');
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type') || '', /text\/css/);
  assert.match(await css.text(), /@media \(max-width: 680px\)/);

  const js = await request('/assets/app.js');
  assert.equal(js.status, 200);
  assert.match(js.headers.get('content-type') || '', /text\/javascript/);
  assert.match(await js.text(), /aria-expanded/);
});

test('unknown routes fail closed', async () => {
  const res = await request('/not-a-real-route');
  assert.equal(res.status, 404);
  assert.match(await res.text(), /not part of the current shell/i);
});

test('mutation methods are not accepted by the public shell', async () => {
  const res = await request('/', { method: 'POST' });
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('allow'), 'GET, HEAD');
});
