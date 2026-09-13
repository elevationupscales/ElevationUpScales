from pathlib import Path


def replace_or_verify(text, old, new, label):
    if old in text:
        return text.replace(old, new)
    if new in text:
        return text
    raise SystemExit(f'{label}: neither old nor new form found')


# Promo override must already be gone before the merchandising cleanup runs.
client = Path('apps/web-v2/src/client.js').read_text()
for forbidden in ('48v-battery-cabinet/hero.webp', 'home-crop.webp'):
    if forbidden in client:
        raise SystemExit(f'client.js still contains promotional/legacy SOK override: {forbidden}')

# Use the exact localized owner-approved clean SOK images in every homepage/storefront SOK slot.
shell_path = Path('apps/web-v2/src/shell.js')
shell = shell_path.read_text()
for old, new in [
    ("asset('/assets/brands/sok/sk12v100pc/hero.png')", "'/assets/brands/sok/sk12v100pc/official-clean.png'"),
    ("asset('/assets/brands/sok/sk48v100n/hero.jpg')", "'/assets/brands/sok/sk48v100n/official-clean.png'"),
    ("asset('/assets/brands/sok/sk12v100pc/home-hero.webp?v=20260910-1')", "'/assets/brands/sok/sk12v100pc/official-clean.png'"),
    ("asset('/assets/brands/sok/sk48v100n/home-crop.webp?v=20260910-1')", "'/assets/brands/sok/sk48v100n/official-clean.png'"),
]:
    shell = replace_or_verify(shell, old, new, 'shell.js SOK media')
for forbidden in ('/assets/brands/sok/sk48v100n/hero.jpg', '/assets/brands/sok/sk48v100n/home-crop.webp', '48v-battery-cabinet/hero.webp'):
    if forbidden in shell:
        raise SystemExit(f'shell.js still contains forbidden SK48 promotional media: {forbidden}')
shell_path.write_text(shell)

# Narrow, merchandising-only presentation layer: same clean family, neutral containers, same scale rules.
Path('apps/web-v2/src/sok-product-merchandising-styles.js').write_text(r'''export const sokProductMerchandisingStyles = `
/* Issue #185 — clean official SOK product photography only. No commerce authority lives here. */
.reference-storefront-home .hero-product-12 img,
.reference-storefront-home .hero-product-48 img{
  width:calc(100% - 12px);
  height:220px;
  max-height:none;
  margin:0 0 50px;
  padding:14px;
  box-sizing:border-box;
  object-fit:contain;
  object-position:center;
  border:1px solid rgba(33,204,239,.22);
  border-radius:8px;
  background:#f3f5f5;
  filter:drop-shadow(0 18px 24px rgba(0,0,0,.38));
}
.reference-storefront-home .product-card-horizontal .product-image{
  background:#f3f5f5;
}
.reference-storefront-home .product-card-horizontal .product-image img,
.reference-storefront-home .product-card-horizontal:nth-child(2) .product-image img{
  width:100%;
  height:220px;
  max-height:none;
  padding:18px;
  box-sizing:border-box;
  object-fit:contain;
  object-position:center;
}
.reference-storefront-home .home-product-card__image img[src*="/assets/brands/sok/"]{
  padding:14px;
  box-sizing:border-box;
  object-fit:contain;
  object-position:center;
}
@media(max-width:920px){
  .reference-storefront-home .hero-product-12 img,
  .reference-storefront-home .hero-product-48 img{
    height:150px;
    margin-bottom:34px;
    padding:10px;
  }
}
@media(max-width:680px){
  .reference-storefront-home .hero-product-12 img,
  .reference-storefront-home .hero-product-48 img{
    height:140px;
    margin-bottom:42px;
    padding:9px;
  }
  .reference-storefront-home .product-card-horizontal .product-image img,
  .reference-storefront-home .product-card-horizontal:nth-child(2) .product-image img{
    height:205px;
    padding:16px;
  }
}
`;
''')

# Serve the exact localized PNG bytes from the immutable Worker candidate itself.
index_path = Path('apps/web-v2/src/index.js')
index = index_path.read_text()
imports = "import { homeFidelityStyles } from './home-fidelity-styles.js';\nimport { sokProductMerchandisingStyles } from './sok-product-merchandising-styles.js';\nimport { SOK_SK12V100PC_PNG_BASE64, SOK_SK48V100N_PNG_BASE64 } from './sok-product-assets.js';\n"
index = replace_or_verify(index, "import { homeFidelityStyles } from './home-fidelity-styles.js';\n", imports, 'index.js imports')
asset_helper = """const SOK_PRODUCT_IMAGE_ASSETS = new Map([
  ['/assets/brands/sok/sk12v100pc/official-clean.png', SOK_SK12V100PC_PNG_BASE64],
  ['/assets/brands/sok/sk48v100n/official-clean.png', SOK_SK48V100N_PNG_BASE64]
]);

function decodeBase64(encoded) {
  const raw = atob(encoded);
  const bytes = new Uint8Array(raw.length);
  for (let index = 0; index < raw.length; index += 1) bytes[index] = raw.charCodeAt(index);
  return bytes;
}

"""
if asset_helper not in index:
    marker = "function response(body, init = {}) {"
    if marker not in index:
        raise SystemExit('index.js response marker missing')
    index = index.replace(marker, asset_helper + marker, 1)
old_css = "return response(`${styles}\\n${navStyles}\\n${catalogStyles}\\n${cartStyles}\\n${checkoutStyles}\\n${homeFidelityStyles}`, { headers: { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });"
new_css = "return response(`${styles}\\n${navStyles}\\n${catalogStyles}\\n${cartStyles}\\n${checkoutStyles}\\n${homeFidelityStyles}\\n${sokProductMerchandisingStyles}`, { headers: { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });"
index = replace_or_verify(index, old_css, new_css, 'index.js CSS bundle')
asset_route = """    const sokProductImage = SOK_PRODUCT_IMAGE_ASSETS.get(url.pathname);
    if (sokProductImage) {
      return response(decodeBase64(sokProductImage), {
        headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' }
      });
    }

"""
if asset_route not in index:
    marker = "    if (url.pathname === '/assets/app.css') {\n"
    if marker not in index:
        raise SystemExit('index.js app.css marker missing')
    index = index.replace(marker, asset_route + marker, 1)
index_path.write_text(index)

# Preserve the exact localized-byte module; no permanent vendor hotlinking.
asset_module = Path('apps/web-v2/src/sok-product-assets.js')
asset_text = asset_module.read_text()
asset_text = asset_text.replace(
    'operations/vendor-project-sources/SOK_PROJECT_SOURCE.md',
    'operations/vendor-project-sources/SOK_PRODUCT_IMAGE_PROVENANCE_2026-09-13.md'
)
asset_module.write_text(asset_text)

# Update the existing homepage regression expectations and add image-route/anti-promo checks.
tests_path = Path('apps/web-v2/test/shell.test.mjs')
tests = tests_path.read_text()
old_assertions = "  assert.match(body, /sk12v100pc\\/home-hero\\.webp/);\n  assert.match(body, /sk48v100n\\/home-crop\\.webp/);"
new_assertions = "  assert.match(body, /sk12v100pc\\/official-clean\\.png/);\n  assert.match(body, /sk48v100n\\/official-clean\\.png/);\n  assert.doesNotMatch(body, /sk48v100n\\/(?:hero\\.jpg|home-crop\\.webp)|48v-battery-cabinet\\/hero\\.webp|Buy More,? Save More/i);"
tests = replace_or_verify(tests, old_assertions, new_assertions, 'shell.test.mjs image assertions')
regression_name = "test('SOK product showcase serves only the localized official clean photography'"
if regression_name not in tests:
    insertion = "test('canonical catalog routes remain customer-safe', async () => {"
    if insertion not in tests:
        raise SystemExit('shell.test.mjs insertion marker missing')
    regression = r'''test('SOK product showcase serves only the localized official clean photography', async () => {
  const expected = [
    ['/assets/brands/sok/sk12v100pc/official-clean.png', 'SK12V100PC'],
    ['/assets/brands/sok/sk48v100n/official-clean.png', 'SK48V100N']
  ];
  for (const [path] of expected) {
    const res = await request(path);
    assert.equal(res.status, 200, path);
    assert.match(res.headers.get('content-type') || '', /^image\/png/i, path);
    assert.match(res.headers.get('cache-control') || '', /immutable/, path);
    assert.ok((await res.arrayBuffer()).byteLength > 250000, `${path} should contain the localized official PNG bytes`);
  }

  const home = await (await request('/')).text();
  for (const [path, sku] of expected) {
    assert.match(home, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(home, new RegExp(`alt="[^"]*${sku}[^"]*"`, 'i'));
  }
  assert.doesNotMatch(home, /sk48v100n\/(?:hero\.jpg|home-crop\.webp)|48v-battery-cabinet\/hero\.webp|Buy More,? Save More/i);

  const js = await (await request('/assets/app.js')).text();
  assert.doesNotMatch(js, /48v-battery-cabinet|home-crop\.webp|Buy More,? Save More/i);

  const css = await (await request('/assets/app.css')).text();
  assert.match(css, /hero-product-12 img/);
  assert.match(css, /hero-product-48 img/);
  assert.match(css, /background:#f3f5f5/);
});

'''
    tests = tests.replace(insertion, regression + insertion, 1)
tests_path.write_text(tests)

# Exact SOK vendor/source provenance for the localized bytes.
Path('operations/vendor-project-sources/SOK_PRODUCT_IMAGE_PROVENANCE_2026-09-13.md').write_text('''# SOK Product Image Provenance — 2026-09-13

**Tracking:** Issue #185 — NEXT RELEASE: replace SOK promo art with clean product showcase  
**Scope:** Web V2 product merchandising imagery only. No pricing, MAP, inventory, shipping, orderability, payment, supplier-authority, catalog-truth, or checkout changes.

## SK12V100PC — clear-case battery

- Official source supplied/approved by owner: `https://static.wixstatic.com/media/0fa809_0c4fccf4c42a4aa284c892d758ac3de7~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/0fa809_0c4fccf4c42a4aa284c892d758ac3de7~mv2.png`
- Localized repository asset: `site/assets/brands/sok/sk12v100pc/official-clean.png`
- Web V2 same-origin path: `/assets/brands/sok/sk12v100pc/official-clean.png`
- Retrieved: 2026-09-13
- Format/dimensions: PNG RGBA, 960 × 960
- SHA-256: `116bdccae768a163e90a9a1e6ffee45ae2a4efca77caeb47b14f68b4f73b0646`

## SK48V100N — 48V 100Ah server-rack LiFePO4 battery

- Official source supplied/approved by owner: `https://static.wixstatic.com/media/0fa809_a15f5f76c4b94fb1bf5e0c01daee4086~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/0fa809_a15f5f76c4b94fb1bf5e0c01daee4086~mv2.png`
- Localized repository asset: `site/assets/brands/sok/sk48v100n/official-clean.png`
- Web V2 same-origin path: `/assets/brands/sok/sk48v100n/official-clean.png`
- Retrieved: 2026-09-13
- Format/dimensions: PNG RGBA, 960 × 960
- SHA-256: `74c9e5dc78a949821ee4d674f2713da5310baa16b558b52fc4d265896007cc0a`

## Merchandising control

These are exact localized bytes from the owner-approved official SOK product-material URLs. No AI redraw, generated battery render, SKU substitution, embedded promotional pricing, or supplier sale-banner artwork is authorized. Web V2 presents the two SKUs as one clean product family using consistent neutral image containers, contain-fit, whitespace, padding, and card proportions.

The prior SK48V100N supplier promotional artwork (house/night scene and volume-pricing message) is not used by the Web V2 homepage/storefront presentation after this change. Existing commerce and supplier authority remain unchanged.
''')
