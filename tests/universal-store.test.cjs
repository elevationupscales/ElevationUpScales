const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (path) => fs.readFileSync(path, 'utf8');

test('release 66 universal store architecture is wired', () => {
  const store = read('site/store.html');
  const runtime = read('site/universal-store.js');
  const redirects = read('site/_redirects');
  assert.match(store, /ONE STORE • ONE CATALOG • ONE CHECKOUT/);
  assert.match(store, /\/sok-batteries/);
  assert.match(store, /\/kingboss-batteries/);
  assert.match(runtime, /\/api\/store\/catalog\?section=lithium-batteries/);
  assert.match(runtime, /\/api\/store-catalog\?section=rv-outdoor/);
  assert.match(runtime, /\/api\/sok\/catalog/);
  assert.match(runtime, /supplier-managed, not Elevation on-hand stock/i);
  assert.match(redirects, /\/lithium-batteries \/store\?department=lithium-batteries 301/);
  assert.match(redirects, /\/rv-store \/store\?department=rv-outdoor 301/);
});

test('Kingboss is a branded view over the universal system', () => {
  const page = read('site/kingboss-batteries.html');
  assert.match(page, /data-store-brand="kingboss"/);
  assert.match(page, /same Elevation catalog, product-detail and checkout system/i);
  assert.doesNotMatch(page, /authorized kingboss/i);
});

test('full locked mission is installed on homepage runtime', () => {
  const home = read('site/home-commerce.js');
  assert.match(home, /Elevation UpScales, Inc\. is a lithium battery and energy retailer expanding a qualified vendor network for commercial freight and dropshipping\./);
  assert.match(home, /streamlined fulfillment to Hawaii, Alaska, and select international markets/);
  assert.doesNotMatch(home, /Battery supply and hard-to-serve freight are a core Elevation focus/);
});

test('email integration remains present in the same release tree', () => {
  for (const path of [
    'site/admin-email.html',
    'site/admin-email.js',
    'site/worker/shared/gmail-mail-provider.js',
    'site/worker/shared/email-role-routing.js',
    'site/worker/shared/email-workflows.js',
    'site/store-checkout-email-workflow.js'
  ]) assert.equal(fs.existsSync(path), true, `${path} missing`);
});
