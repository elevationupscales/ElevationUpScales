import test from 'node:test';
import assert from 'node:assert/strict';
import { getPublicRoute, resolveCompatibilityRedirect } from '../src/routes.js';
import { renderCatalogPage } from '../src/catalog-pages.js';

test('legacy product query links redirect to canonical product detail routes', () => {
  const legacy = new URL('https://elevationupscales.com/product?id=sok-sk12v40a&store=universal');
  assert.deepEqual(resolveCompatibilityRedirect(legacy), {
    location: '/product/sok-sk12v40a',
    status: 302
  });

  const canonicalRoute = getPublicRoute('/product/sok-sk12v40a');
  assert.equal(canonicalRoute?.implemented, true);
  assert.equal(canonicalRoute?.page, 'product');
  assert.equal(canonicalRoute?.productId, 'sok-sk12v40a');

  const html = renderCatalogPage(canonicalRoute, new URL('https://elevationupscales.com/product/sok-sk12v40a'));
  assert.match(html, /SK12V40A/);
  assert.match(html, /Battery Charger for 12V LiFePO4 Batteries/);
  assert.doesNotMatch(html, /data-add-to-cart|data-buy-now/);
});

test('product compatibility redirect normalizes valid ids and rejects malformed ids', () => {
  assert.deepEqual(
    resolveCompatibilityRedirect(new URL('https://elevationupscales.com/product?id=SOK-SK48V100NBR')),
    { location: '/product/sok-sk48v100nbr', status: 302 }
  );
  assert.equal(
    resolveCompatibilityRedirect(new URL('https://elevationupscales.com/product?id=../../checkout')),
    null
  );
});
