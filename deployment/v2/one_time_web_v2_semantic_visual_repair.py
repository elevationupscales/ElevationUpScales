from pathlib import Path

ROOT = Path('.')


def must_replace(path, old, new, expected=1):
    p = ROOT / path
    text = p.read_text()
    count = text.count(old)
    if count != expected:
        raise SystemExit(f'{path}: expected {expected} occurrences, found {count} for {old[:100]!r}')
    p.write_text(text.replace(old, new))


semantic_icons = r'''const ICONS = {
  lithium: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="14" width="36" height="24" rx="3"/><path d="M15 14v-4h7v4m11 0v-4h-7v4M26 19l-7 10h7l-4 9 9-12h-7l2-7Z"/></svg>',
  solar: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="37" cy="10" r="4"/><path d="M37 2v3m0 10v3m-8-8h3m10 0h3M9 20h28l5 20H4l5-20Zm5 0 2-7h14l2 7M9 27h30M7 34h34M17 20l-2 20M29 20l2 20"/></svg>',
  rv: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 15h27l9 9v12H5V15Zm27 4v9h9M12 36a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm23 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM10 21h9m4 0h5"/></svg>',
  backup: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m5 23 19-15 19 15M10 20v22h28V20M18 42V29h12v13M27 15l-7 10h6l-3 8 9-11h-6l1-7Z"/></svg>',
  commercial: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 43h38M8 43V20l12-7v30M20 43V8l20-4v39M26 15h7m-7 8h7m-7 8h7M12 27h4m-4 8h4"/></svg>',
  hawaii: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 30h25v10H4V30Zm25 3h7l7 7H29V33ZM10 40a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm27 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM15 29V15m0 0c-5-5-9-3-11-1m11 1c5-5 9-3 11-1m-11 1c-3-7 0-11 3-13m-3 13c3-7 0-11-3-13"/></svg>',
  trusted: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4 39 10v12c0 10-6 18-15 22C15 40 9 32 9 22V10l15-6Z"/><path d="m16 24 6 6 11-13"/></svg>',
  freight: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 13h26v25H4V13Zm26 9h7l7 8v8H30V22ZM11 38a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm25 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM10 19h14m-14 7h14"/></svg>',
  support: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 25a16 16 0 0 1 32 0v10M8 26H4v9a5 5 0 0 0 5 5h4V26H8Zm32 0h4v9a5 5 0 0 1-5 5h-4V26h5ZM35 40c0 3-4 4-9 4h-3"/></svg>',
  inverter: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="8" width="38" height="30" rx="4"/><path d="M11 23c3-7 6 7 10 0s7 7 11 0 5 0 6 0M14 14h6m-6 18h7M34 30v10m-5 0h10"/></svg>',
  accessories: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 8v11m-5-6h10M35 29v11m-5-6h10M13 19c0 9 4 12 11 12h6m5-7v6m-4-6h8v6h-8v-6ZM8 4h10v8H8V4Z"/></svg>'
};

export function semanticIcon(kind) {
  const svg = ICONS[kind];
  if (!svg) return '';
  return `<span class="shortcut-icon semantic-icon semantic-icon--${kind}">${svg}</span>`;
}
'''
(ROOT / 'apps/web-v2/src/semantic-icons.js').write_text(semantic_icons)

# Homepage: preserve layout/copy, change only semantic icon/media assignments.
shell_path = ROOT / 'apps/web-v2/src/shell.js'
shell = shell_path.read_text()
import_anchor = "import { CANONICAL_ORIGIN, PRIMARY_NAV, canonicalUrl } from './routes.js';\n"
if import_anchor not in shell:
    raise SystemExit('shell.js import anchor missing')
shell = shell.replace(import_anchor, import_anchor + "import { semanticIcon } from './semantic-icons.js';\n", 1)

shell = shell.replace(
    "  { title: 'Backup Power', copy: 'Keep critical systems running with resilient stored energy.', href: '/shop/sok', label: 'Shop Backup Power', image: '/assets/hero/project-support.webp' },\n  { title: 'Commercial Power', copy: 'Scalable power and supply support for larger applications.', href: '/shop/sok', label: 'Shop Commercial', image: '/assets/hero/home-tropical.webp' }",
    "  { title: 'Backup Power', copy: 'Keep critical systems running with resilient stored energy.', href: '/shop/sok', label: 'Shop Backup Power', icon: 'backup' },\n  { title: 'Commercial Power', copy: 'Scalable power and supply support for larger applications.', href: '/shop/sok', label: 'Shop Commercial', icon: 'commercial' }"
)

old_solution = '''function solutionMarkup() {
  return solutionCards.map(({ title, copy, href, label, image }) => `
    <article class="solution-card solution-card--visual">
      <img class="solution-card__image" src="${image}" alt="" loading="lazy" decoding="async">
      <div class="solution-card__shade" aria-hidden="true"></div>
      <div class="solution-card__content"><h3>${title}</h3><p>${copy}</p><a href="${href}" class="text-link">${label} <span aria-hidden="true">→</span></a></div>
    </article>`).join('');
}
'''
new_solution = '''function solutionMarkup() {
  return solutionCards.map(({ title, copy, href, label, image, icon }) => {
    const visual = image
      ? `<img class="solution-card__image" src="${image}" alt="" loading="lazy" decoding="async">`
      : `<div class="solution-card__icon-visual" aria-hidden="true">${semanticIcon(icon)}</div>`;
    return `
    <article class="solution-card solution-card--visual">
      ${visual}
      <div class="solution-card__shade" aria-hidden="true"></div>
      <div class="solution-card__content"><h3>${title}</h3><p>${copy}</p><a href="${href}" class="text-link">${label} <span aria-hidden="true">→</span></a></div>
    </article>`;
  }).join('');
}
'''
if old_solution not in shell:
    raise SystemExit('shell.js solutionMarkup anchor missing')
shell = shell.replace(old_solution, new_solution, 1)

start = shell.find('function shortcutIcon(kind) {')
end = shell.find('\n}\n\nfunction documentHead', start)
if start < 0 or end < 0:
    raise SystemExit('shell.js shortcutIcon bounds missing')
shell = shell[:start] + "function shortcutIcon(kind) {\n  return semanticIcon(kind);\n}" + shell[end+2:]

old_trust = '''    <section class="trust-strip" aria-label="Elevation customer support highlights">
      <div class="trust-item"><span class="trust-icon">${shortcutIcon('backup')}</span><div><strong>TRUSTED BRANDS</strong><span>Premium power solutions from approved suppliers.</span></div></div>
      <a class="trust-item" href="/shipping-logistics-services"><span class="trust-icon">${shortcutIcon('rv')}</span><div><strong>HAWAII READY</strong><span>Logistics support for harder-to-serve markets.</span></div></a>
      <a class="trust-item" href="tel:+12088134998"><span class="trust-icon">${shortcutIcon('hawaii')}</span><div><strong>REAL SUPPORT</strong><span>208-813-4998</span></div></a>
    </section>'''
new_trust = '''    <section class="trust-strip" aria-label="Elevation customer support highlights">
      <div class="trust-item"><span class="trust-icon">${shortcutIcon('trusted')}</span><div><strong>TRUSTED BRANDS</strong><span>Premium power solutions from approved suppliers.</span></div></div>
      <a class="trust-item" href="/shipping-logistics-services"><span class="trust-icon">${shortcutIcon('freight')}</span><div><strong>HAWAII READY</strong><span>Logistics support for harder-to-serve markets.</span></div></a>
      <a class="trust-item" href="tel:+12088134998"><span class="trust-icon">${shortcutIcon('support')}</span><div><strong>REAL SUPPORT</strong><span>208-813-4998</span></div></a>
    </section>'''
if old_trust not in shell:
    raise SystemExit('shell.js trust strip anchor missing')
shell = shell.replace(old_trust, new_trust, 1)
shell_path.write_text(shell)

# Store categories: preserve card layout; replace only misleading media with neutral semantic icon visuals.
catalog_path = ROOT / 'apps/web-v2/src/catalog-pages.js'
catalog = catalog_path.read_text()
catalog_import = "import { FOOTER_NAV, PRIMARY_NAV, canonicalUrl } from './routes.js';\n"
if catalog_import not in catalog:
    raise SystemExit('catalog-pages.js import anchor missing')
catalog = catalog.replace(catalog_import, catalog_import + "import { semanticIcon } from './semantic-icons.js';\n", 1)

old_store_categories = '''function storeCategoryCards() {
  const cards = [
    ['SOK Batteries', '/shop/sok', '/assets/brands/sok/sk12v100pc/official-clean.png'],
    ['Solar Panels', '/shop/renogy', '/assets/hero/power-social.webp'],
    ['Inverters & Charging', '/shop/renogy', '/assets/hero/project-support.webp'],
    ['RV & Outdoor', '/store?department=rv-outdoor', '/assets/hero/store-rv-mountains.webp'],
    ['Accessories', '/store?q=accessories', '/assets/hero/hawaii-ocean-freight.webp'],
    ['Commercial', '/store?q=commercial', '/assets/hero/home-tropical.webp']
  ];
  return cards.map(([title, href, image]) => `<a class="store-category-card" href="${href}"><img class="store-category-image" src="${image}" alt="" loading="lazy" decoding="async"><span class="store-category-shade" aria-hidden="true"></span><strong>${title}</strong></a>`).join('');
}
'''
new_store_categories = '''function storeCategoryCards() {
  const cards = [
    { title: 'SOK Batteries', href: '/shop/sok', image: '/assets/brands/sok/sk12v100pc/official-clean.png' },
    { title: 'Solar Panels', href: '/shop/renogy', image: '/assets/hero/power-social.webp' },
    { title: 'Inverters & Charging', href: '/shop/renogy', icon: 'inverter' },
    { title: 'RV & Outdoor', href: '/store?department=rv-outdoor', image: '/assets/hero/store-rv-mountains.webp' },
    { title: 'Accessories', href: '/store?q=accessories', icon: 'accessories' },
    { title: 'Commercial', href: '/store?q=commercial', icon: 'commercial' }
  ];
  return cards.map(({ title, href, image, icon }) => {
    const visual = image
      ? `<img class="store-category-image" src="${image}" alt="" loading="lazy" decoding="async">`
      : `<span class="store-category-icon-visual" aria-hidden="true">${semanticIcon(icon)}</span>`;
    return `<a class="store-category-card" href="${href}">${visual}<span class="store-category-shade" aria-hidden="true"></span><strong>${title}</strong></a>`;
  }).join('');
}
'''
if old_store_categories not in catalog:
    raise SystemExit('catalog-pages.js storeCategoryCards anchor missing')
catalog = catalog.replace(old_store_categories, new_store_categories, 1)
catalog_path.write_text(catalog)

# Add presentation-only rules for neutral semantic icon states. No layout architecture changes.
styles_path = ROOT / 'apps/web-v2/src/final-visual-styles.js'
styles = styles_path.read_text()
insert = r'''
/* Semantic media repair: neutral icon states are used only where verified matching photography is unavailable. */
.solution-card__icon-visual{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(circle at 50% 42%,rgba(0,191,243,.18),rgba(3,20,28,.94) 58%,#06141a)}
.solution-card__icon-visual .semantic-icon{width:92px;height:92px;color:#21d4ff;filter:drop-shadow(0 0 18px rgba(0,191,243,.18))}
.store-category-icon-visual{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,rgba(0,191,243,.17),rgba(3,20,28,.96) 62%,#06141a)}
.store-category-icon-visual .semantic-icon{width:78px;height:78px;color:#21d4ff;filter:drop-shadow(0 0 16px rgba(0,191,243,.16))}
'''
if insert.strip() not in styles:
    marker = '\n`;'
    if styles.count(marker) != 1:
        raise SystemExit('final-visual-styles.js closing marker mismatch')
    styles = styles.replace(marker, insert + marker, 1)
styles_path.write_text(styles)

# Regression coverage for semantic destination matching and prohibited reuse.
tests_path = ROOT / 'apps/web-v2/test/shell.test.mjs'
tests = tests_path.read_text()
marker = "test('canonical catalog routes remain customer-safe', async () => {"
if marker not in tests:
    raise SystemExit('shell.test.mjs insertion marker missing')
if "test('semantic visuals match their destinations without misleading reuse'" not in tests:
    regression = r'''test('semantic visuals match their destinations without misleading reuse', async () => {
  const { readFile } = await import('node:fs/promises');
  const home = await (await request('/')).text();
  const store = await (await request('/store')).text();

  for (const kind of ['lithium', 'solar', 'rv', 'backup', 'commercial', 'hawaii', 'trusted', 'freight', 'support']) {
    assert.match(home, new RegExp(`semantic-icon--${kind}`), `homepage should render ${kind} semantic icon`);
  }
  for (const destination of [
    '/store?department=lithium-batteries', '/solar-project', '/store?department=rv-outdoor',
    '/shop/sok', '/hawaii-lithium-batteries'
  ]) assert.match(home, new RegExp(`href="${destination.replace(/[?]/g, '\\?')}`));

  assert.match(home, /Lithium Batteries[\s\S]*\/assets\/brands\/sok\/sk12v100pc\/official-clean\.png/);
  assert.match(home, /SOK Battery Systems[\s\S]*\/assets\/brands\/sok\/sk48v100n\/official-clean\.png/);
  assert.match(home, /Solar &amp; Off-Grid[\s\S]*\/assets\/hero\/power-social\.webp/);
  assert.match(home, /Hawaii Power &amp; Logistics[\s\S]*\/assets\/hero\/hawaii-ocean-freight\.webp/);
  assert.match(home, /RV &amp; Outdoor[\s\S]*\/assets\/hero\/store-rv-mountains\.webp/);
  assert.match(home, /Backup Power[\s\S]*semantic-icon--backup/);
  assert.match(home, /Commercial Power[\s\S]*semantic-icon--commercial/);

  assert.match(store, /Inverters &amp; Charging[\s\S]*semantic-icon--inverter|semantic-icon--inverter[\s\S]*Inverters &amp; Charging/);
  assert.match(store, /Accessories[\s\S]*semantic-icon--accessories|semantic-icon--accessories[\s\S]*Accessories/);
  assert.match(store, /Commercial[\s\S]*semantic-icon--commercial|semantic-icon--commercial[\s\S]*Commercial/);

  const shellSource = await readFile(new URL('../src/shell.js', import.meta.url), 'utf8');
  const catalogSource = await readFile(new URL('../src/catalog-pages.js', import.meta.url), 'utf8');
  assert.match(shellSource, /title: 'Backup Power'[\s\S]{0,220}icon: 'backup'/);
  assert.match(shellSource, /title: 'Commercial Power'[\s\S]{0,220}icon: 'commercial'/);
  assert.doesNotMatch(shellSource, /title: 'Commercial Power'[\s\S]{0,220}home-tropical\.webp/);
  assert.doesNotMatch(catalogSource, /title: 'Accessories'[\s\S]{0,180}hawaii-ocean-freight\.webp/);
  assert.doesNotMatch(catalogSource, /title: 'Commercial'[\s\S]{0,180}(?:home-tropical|project-support)\.webp/);
  assert.match(catalogSource, /title: 'Inverters & Charging'[\s\S]{0,160}icon: 'inverter'/);
  assert.match(catalogSource, /title: 'Accessories'[\s\S]{0,160}icon: 'accessories'/);
  assert.match(catalogSource, /title: 'Commercial'[\s\S]{0,160}icon: 'commercial'/);
  assert.doesNotMatch(`${home}\n${store}`, /Buy More,? Save More|sk48v100n\/home-crop|sk48v100n\/hero\.jpg|Victron/i);
});

'''
    tests = tests.replace(marker, regression + marker, 1)
tests_path.write_text(tests)
