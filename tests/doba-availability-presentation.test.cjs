const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (path) => fs.readFileSync(path, 'utf8');

test('Doba unknown stock remains visible but cannot expose direct checkout', () => {
  const worker = read('site/_worker.js');
  const catalog = read('site/catalog-admin-runtime.js');

  assert.match(worker, /const rawStock=p\.supplierStock,hasStock=rawStock!==null&&rawStock!==undefined&&String\(rawStock\)\.trim\(\)!=="";/);
  assert.match(worker, /hasStock&&Number\.isFinite\(supplierStock\)&&supplierStock>0/);
  assert.match(worker, /supplier==="doba"\?"":/);

  assert.match(catalog, /const hasSupplierStock=p\.supplierStock!==null&&p\.supplierStock!==undefined&&String\(p\.supplierStock\)\.trim\(\)!=="";/);
  assert.match(catalog, /source==="doba".*hasSupplierStock.*supplierStock>0/);
});
