from pathlib import Path

# Use a repository-approved, browser-valid wordmark instead of the legacy malformed image.
src = Path('site/assets/brand/storefront-wordmark.webp')
dst = Path('apps/web-v2/public/assets/brand/elevation-wordmark.webp')
dst.write_bytes(src.read_bytes())

shell_path = Path('apps/web-v2/src/shell.js')
shell = shell_path.read_text()
old = '''    <article class="solution-card solution-card--visual">
      <div class="solution-card__media" style="background-image:linear-gradient(180deg,rgba(2,8,11,.06),rgba(2,8,11,.88)),url('${image}')" role="img" aria-label="${escapeHtml(title)}"></div>
      <div class="solution-card__content"><h3>${title}</h3><p>${copy}</p><a href="${href}" class="text-link">${label} <span aria-hidden="true">→</span></a></div>
    </article>'''
new = '''    <article class="solution-card solution-card--visual">
      <img class="solution-card__image" src="${image}" alt="" loading="lazy" decoding="async">
      <div class="solution-card__shade" aria-hidden="true"></div>
      <div class="solution-card__content"><h3>${title}</h3><p>${copy}</p><a href="${href}" class="text-link">${label} <span aria-hidden="true">→</span></a></div>
    </article>'''
if old not in shell: raise SystemExit('solution visual anchor missing')
shell_path.write_text(shell.replace(old, new, 1))

catalog_path = Path('apps/web-v2/src/catalog-pages.js')
catalog = catalog_path.read_text()
old = '''  return cards.map(([title, href, image]) => `<a class="store-category-card" href="${href}"><span class="store-category-media" style="background-image:linear-gradient(180deg,rgba(2,8,11,.02),rgba(2,8,11,.72)),url('${image}')"></span><strong>${title}</strong></a>`).join('');'''
new = '''  return cards.map(([title, href, image]) => `<a class="store-category-card" href="${href}"><img class="store-category-image" src="${image}" alt="" loading="lazy" decoding="async"><span class="store-category-shade" aria-hidden="true"></span><strong>${title}</strong></a>`).join('');'''
if old not in catalog: raise SystemExit('store category visual anchor missing')
catalog_path.write_text(catalog.replace(old, new, 1))

css_path = Path('apps/web-v2/src/final-visual-styles.js')
css = css_path.read_text()
css = css.replace('.solution-card__media{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .25s ease}.solution-card--visual:hover .solution-card__media{transform:scale(1.025)}', '.solution-card__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;transition:transform .25s ease}.solution-card__shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,8,11,.04) 20%,rgba(2,8,11,.9) 88%)}.solution-card--visual:hover .solution-card__image{transform:scale(1.025)}')
css = css.replace('.store-category-media{position:absolute;inset:0;background-size:cover;background-position:center}.store-category-card strong{', '.store-category-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}.store-category-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,8,11,.02) 25%,rgba(2,8,11,.8) 90%)}.store-category-card strong{')
css_path.write_text(css)

test_path = Path('apps/web-v2/test/shell.test.mjs')
tests = test_path.read_text()
tests = tests.replace("  assert.match(home, /solution-card__media/);", "  assert.match(home, /solution-card__image/);\n  assert.doesNotMatch(home, /solution-card__media[^>]*style=/);")
tests = tests.replace("  assert.match(css, /store-category-grid/);", "  assert.match(css, /store-category-grid/);\n  assert.match(css, /store-category-image/);")
test_path.write_text(tests)
