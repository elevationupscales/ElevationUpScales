const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (path) => fs.readFileSync(path, 'utf8');

test('public Doba availability is projected from current source-state without exposing supplier economics', () => {
  const runtime = read('site/catalog-admin-runtime.js');
  assert.match(runtime, /LEFT JOIN eus_doba_source_state s ON/);
  assert.match(runtime, /doba_source_stock/);
  assert.match(runtime, /doba_source_state/);
  assert.match(runtime, /dobaSourceState === "CURRENT"/);
  assert.match(runtime, /availabilityStatus==="available"/);
  assert.doesNotMatch(runtime, /supplierCostCents:\s*p\.supplierCostCents/);
});

test('universal store holds unknown Doba state and buys only normalized available state', () => {
  const runtime = read('site/universal-store.js');
  assert.match(runtime, /if\(mode==="check"\)return\{code:"hold",label:"Confirm Availability",buy:false\}/);
  assert.match(runtime, /if\(\/doba\/\.test\(supplier\)\)\{if\(mode!=="available"\)/);
  assert.doesNotMatch(runtime, /if\(!has\|\|!Number\.isFinite\(stock\)\)return\{code:"hold"/);
});
