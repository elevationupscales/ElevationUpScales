const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

test('master catalog migration workspace is additive and preview-first', () => {
  const html = read('site/admin-catalog-migration.html');
  assert.match(html, /Master Catalog Migration/);
  assert.match(html, /Download CSV Template/);
  assert.match(html, /Preview Migration/);
  assert.match(html, /Import Approved Rows/);
  assert.match(html, /Default Publish[\s\S]*Draft/);
  assert.match(html, /Default Shipping[\s\S]*Unverified/);
  assert.match(html, /Existing stores remain unchanged|without shutting down current stores/i);
});

test('migration parser preserves mixed-provider identity and hierarchy', () => {
  const js = read('site/catalog-migration.js');
  for (const provider of ['doba','fourthwall','sok','kingboss','printful','spreadconnect','self-stock']) {
    assert.match(js, new RegExp(`\\b${provider.replace('-', '\\-')}\\b`));
  }
  assert.match(js, /Canonical SKU/);
  assert.match(js, /Department/);
  assert.match(js, /Subcategory/);
  assert.match(js, /sourceType:source/);
  assert.match(js, /supplier,/);
  assert.match(js, /source:"other",rows/);
});

test('catalog runtime accepts normalized strategic and POD vendor sources', () => {
  const runtime = read('site/catalog-admin-runtime.js');
  assert.match(runtime, /"sok", "kingboss", "printful", "spreadconnect", "self-stock"/);
  assert.match(runtime, /\["fourthwall","printful","spreadconnect"\]\.includes\(sourceType\) \? "pod"/);
  assert.match(runtime, /sourceType === "sok" \? "lithium-batteries"/);
});

test('migration template contains required source-file columns', () => {
  const header = read('site/catalog-migration-template.csv').trim().split(',');
  for (const required of ['Canonical SKU','Product Title','Department','Subcategory','Source','Supplier','Supplier SKU','Price','Store Section','Publish Status','Primary Image','Source URL']) {
    assert.ok(header.includes(required), `missing template column: ${required}`);
  }
});
