from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

shell_path = ROOT / 'apps/web-v2/src/shell.js'
shell = shell_path.read_text()
old_cards = """const solutionCards = [
  ['Lithium Batteries', '12V lithium energy for RV and mobile systems.', '/store?department=lithium-batteries', 'Shop Batteries'],
  ['SOK Battery Systems', '12V, 24V & 48V systems.', '/shop/sok', 'Shop SOK'],
  ['Solar & Off-Grid', 'Build your energy independence.', '/solar-project', 'Shop Solar'],
  ['Hawaii Power & Logistics', 'Battery freight matched to product and destination.', '/hawaii-lithium-batteries', 'Learn More'],
  ['RV & Outdoor', 'Current batteries and gear for the journey.', '/store?department=rv-outdoor', 'Shop RV & Outdoor'],
  ['Backup Power', 'Keep what matters running.', '/shop/sok', 'Shop Backup Power'],
  ['Commercial Power', 'Scalable power solutions.', '/shop/sok', 'Shop Commercial']
];"""
new_cards = """const solutionCards = [
  ['Lithium Batteries', '12V lithium energy for RV and mobile systems.', '/store?department=lithium-batteries', 'Shop Batteries', '/assets/brands/sok/sk12v100pc/official-clean.png'],
  ['SOK Battery Systems', '12V, 24V & 48V systems.', '/shop/sok', 'Shop SOK', '/assets/brands/sok/sk48v100n/official-clean.png'],
  ['Solar & Off-Grid', 'Build your energy independence.', '/solar-project', 'Shop Solar', '/assets/hero/power-social.webp'],
  ['Hawaii Power & Logistics', 'Battery freight matched to product and destination.', '/hawaii-lithium-batteries', 'Learn More', '/assets/hero/hawaii-ocean-freight.webp'],
  ['RV & Outdoor', 'Current batteries and gear for the journey.', '/store?department=rv-outdoor', 'Shop RV & Outdoor', '/assets/hero/store-rv-mountains.webp'],
  ['Backup Power', 'Keep what matters running.', '/shop/sok', 'Shop Backup Power', '/assets/hero/project-support.webp'],
  ['Commercial Power', 'Scalable power solutions.', '/shop/sok', 'Shop Commercial', '/assets/hero/home-tropical.webp']
];"""
old_markup = """function solutionMarkup() {
  return solutionCards.map(([title, copy, href, label]) => `
    <article class=\"solution-card\">
      <h3>${title}</h3>
      <p>${copy}</p>
      <a href=\"${href}\" class=\"text-link\">${label} <span aria-hidden=\"true\">→</span></a>
    </article>`).join('');
}"""
new_markup = """function solutionMarkup() {
  return solutionCards.map(([title, copy, href, label, image]) => `
    <article class=\"solution-card solution-card--visual\">
      <img class=\"solution-card__image\" src=\"${image}\" alt=\"\" loading=\"lazy\" decoding=\"async\">
      <div class=\"solution-card__shade\" aria-hidden=\"true\"></div>
      <div class=\"solution-card__content\"><h3>${title}</h3><p>${copy}</p><a href=\"${href}\" class=\"text-link\">${label} <span aria-hidden=\"true\">→</span></a></div>
    </article>`).join('');
}"""
if shell.count(old_cards) != 1:
    raise SystemExit('homepage solution-card source anchor mismatch')
if shell.count(old_markup) != 1:
    raise SystemExit('homepage solution markup anchor mismatch')
shell = shell.replace(old_cards, new_cards, 1).replace(old_markup, new_markup, 1)
shell_path.write_text(shell)

catalog_path = ROOT / 'apps/web-v2/src/catalog-pages.js'
catalog = catalog_path.read_text()
semantic_import = "import { semanticIcon } from './semantic-icons.js';\n"
if catalog.count(semantic_import) != 1:
    raise SystemExit('catalog semantic-icon import anchor mismatch')
old_store = """function storeCategoryCards() {
  const cards = [
    { title: 'SOK Batteries', href: '/shop/sok', image: '/assets/brands/sok/sk12v100pc/official-clean.png' },
    { title: 'Solar Panels', href: '/shop/renogy', image: '/assets/hero/store-rv-solar-technician-clean.webp' },
    { title: 'Inverters & Charging', href: '/shop/renogy', icon: 'inverter' },
    { title: 'RV & Outdoor', href: '/store?department=rv-outdoor', image: '/assets/hero/store-rv-mountains.webp' },
    { title: 'Accessories', href: '/store?q=accessories', icon: 'accessories' },
    { title: 'Commercial', href: '/store?q=commercial', icon: 'commercial' }
  ];
  return cards.map(({ title, href, image, icon }) => {
    const visual = image
      ? `<img class=\"store-category-image\" src=\"${image}\" alt=\"\" loading=\"lazy\" decoding=\"async\">`
      : `<span class=\"store-category-icon-visual\" aria-hidden=\"true\">${semanticIcon(icon)}</span>`;
    return `<a class=\"store-category-card\" href=\"${href}\">${visual}<span class=\"store-category-shade\" aria-hidden=\"true\"></span><strong>${title}</strong></a>`;
  }).join('');
}"""
new_store = """function storeCategoryCards() {
  const cards = [
    ['SOK Batteries', '/shop/sok', '/assets/brands/sok/sk12v100pc/official-clean.png'],
    ['Solar Panels', '/shop/renogy', '/assets/hero/store-rv-solar-technician-clean.webp'],
    ['Inverters & Charging', '/shop/renogy', '/assets/hero/project-support.webp'],
    ['RV & Outdoor', '/store?department=rv-outdoor', '/assets/hero/store-rv-mountains.webp'],
    ['Accessories', '/store?q=accessories', '/assets/hero/hawaii-ocean-freight.webp'],
    ['Commercial', '/store?q=commercial', '/assets/hero/home-tropical.webp']
  ];
  return cards.map(([title, href, image]) => `<a class=\"store-category-card\" href=\"${href}\"><img class=\"store-category-image\" src=\"${image}\" alt=\"\" loading=\"lazy\" decoding=\"async\"><span class=\"store-category-shade\" aria-hidden=\"true\"></span><strong>${title}</strong></a>`).join('');
}"""
if catalog.count(old_store) != 1:
    raise SystemExit('store category-card source anchor mismatch')
catalog = catalog.replace(semantic_import, '', 1).replace(old_store, new_store, 1)
catalog_path.write_text(catalog)

required_assets = [
    'apps/web-v2/public/assets/brands/sok/sk12v100pc/official-clean.png',
    'apps/web-v2/public/assets/brands/sok/sk48v100n/official-clean.png',
    'apps/web-v2/public/assets/hero/power-social.webp',
    'apps/web-v2/public/assets/hero/hawaii-ocean-freight.webp',
    'apps/web-v2/public/assets/hero/store-rv-mountains.webp',
    'apps/web-v2/public/assets/hero/project-support.webp',
    'apps/web-v2/public/assets/hero/home-tropical.webp',
    'apps/web-v2/public/assets/hero/store-rv-solar-technician-clean.webp',
]
missing = [path for path in required_assets if not (ROOT / path).is_file()]
if missing:
    raise SystemExit(f'missing required media assets: {missing}')

home_expected = [
    '/assets/brands/sok/sk12v100pc/official-clean.png',
    '/assets/brands/sok/sk48v100n/official-clean.png',
    '/assets/hero/power-social.webp',
    '/assets/hero/hawaii-ocean-freight.webp',
    '/assets/hero/store-rv-mountains.webp',
    '/assets/hero/project-support.webp',
    '/assets/hero/home-tropical.webp',
]
for media in home_expected:
    if media not in shell:
        raise SystemExit(f'homepage media binding missing after repair: {media}')

store_expected = [
    '/assets/hero/project-support.webp',
    '/assets/hero/hawaii-ocean-freight.webp',
    '/assets/hero/home-tropical.webp',
]
for media in store_expected:
    if media not in catalog:
        raise SystemExit(f'store media binding missing after repair: {media}')

print('Web V2 media transfer repair applied: 7 homepage solution images + 3 store category images.')
