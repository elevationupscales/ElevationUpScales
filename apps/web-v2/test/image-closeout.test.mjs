import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import worker from '../src/index.js';

const VERSION = { id: '11111111-2222-4333-8444-555555555555', tag: 'visual-closeout', timestamp: '2026-09-14T04:20:00.000Z' };

async function request(path = '/') {
  return worker.fetch(new Request(`https://elevation-web-v2.test${path}`), { CF_VERSION_METADATA: VERSION });
}

test('accepted e9cbaacc homepage copy and composition markers remain locked', async () => {
  const body = await (await request('/')).text();
  assert.match(body, /Lithium Power<br><span>for RV, Solar &amp; Backup<\/span>/);
  assert.match(body, /Elevation UpScales, Inc\. is a lithium battery and energy retailer expanding a qualified vendor network for commercial freight and dropshipping\./);
  assert.match(body, /AUTHORIZED BATTERY SUPPLY/);
  assert.match(body, /HAWAII &amp; ALASKA/);
  assert.match(body, /<a href="\/shop\/sok">SOK Battery Systems<\/a>/);
  assert.doesNotMatch(body, /Power Beyond|TRUSTED BRANDS|HAWAII READY|REAL SUPPORT|Commercial Solutions|shortcut-icon|solution-card--visual/i);
  const usecase = body.match(/<nav class="usecase-grid"[\s\S]*?<\/nav>/)?.[0] || '';
  assert.equal((usecase.match(/<a /g) || []).length, 5);
});

test('existing homepage image slots use clean or localized media without changing layout rules', async () => {
  const body = await (await request('/')).text();
  const css = await (await request('/assets/app.css')).text();
  for (const path of [
    '/assets/brands/sok/sk12v100pc/official-clean.png',
    '/assets/brands/sok/sk48v100n/official-clean.png'
  ]) assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  for (const path of [
    '/assets/hero/home-tropical.webp',
    '/assets/hero/hawaii-ocean-freight.webp',
    '/assets/hero/store-rv-mountains.webp'
  ]) assert.match(css, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(css, /center 44%\/cover no-repeat/);
  assert.match(css, /@media\(max-width:680px\)/);
  assert.match(css, /height:140px/);
  assert.doesNotMatch(css, /grid-template-columns:repeat\(7,minmax\(0,1fr\)\)|font-size:clamp\(3\.2rem,6\.2vw,6\.9rem\)/);
});

test('localized closeout assets are present as non-empty repository files', async () => {
  for (const relative of [
    '../public/assets/brands/sok/sk12v100pc/official-clean.png',
    '../public/assets/brands/sok/sk48v100n/official-clean.png',
    '../public/assets/hero/home-tropical.webp',
    '../public/assets/hero/hawaii-ocean-freight.webp',
    '../public/assets/hero/store-rv-mountains.webp'
  ]) {
    const bytes = await readFile(new URL(relative, import.meta.url));
    assert.ok(bytes.byteLength > 10000, `${relative} should contain real image bytes`);
  }
});
