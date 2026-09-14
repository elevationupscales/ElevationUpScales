from pathlib import Path
import re


def replace_once(text, old, new, label):
    if old not in text:
        raise SystemExit(f'{label}: anchor missing')
    return text.replace(old, new, 1)


def regex_once(text, pattern, replacement, label, flags=0):
    updated, count = re.subn(pattern, replacement, text, count=1, flags=flags)
    if count != 1:
        raise SystemExit(f'{label}: expected one match, found {count}')
    return updated

# ---------------- HOME ----------------
shell_path = Path('apps/web-v2/src/shell.js')
shell = shell_path.read_text()
shell = replace_once(shell,
"const BRAND_WORDMARK = asset('/assets/brand/Elevation_UpScales_Inc_Blue_LithiumShop_FINAL_FONT.webp?v=20260910-1');",
"const BRAND_WORDMARK = '/assets/brand/elevation-wordmark.webp';", 'local wordmark')

solution_cards = """const solutionCards = [
  { title: 'Lithium Batteries', copy: 'Reliable lithium power for RV, mobile and backup systems.', href: '/store?department=lithium-batteries', label: 'Shop Batteries', image: '/assets/brands/sok/sk12v100pc/official-clean.png' },
  { title: 'SOK Battery Systems', copy: '12V, 24V & 48V systems from Elevation’s authorized battery partner.', href: '/shop/sok', label: 'Shop SOK', image: '/assets/brands/sok/sk48v100n/official-clean.png' },
  { title: 'Solar & Off-Grid', copy: 'Build your energy independence with solar and storage.', href: '/solar-project', label: 'Shop Solar', image: '/assets/hero/power-social.webp' },
  { title: 'Hawaii Power & Logistics', copy: 'Battery freight matched to product, quantity and destination.', href: '/hawaii-lithium-batteries', label: 'Learn More', image: '/assets/hero/hawaii-ocean-freight.webp' },
  { title: 'RV & Outdoor', copy: 'Power, repair and gear for life on the road.', href: '/store?department=rv-outdoor', label: 'Shop RV & Outdoor', image: '/assets/hero/store-rv-mountains.webp' },
  { title: 'Backup Power', copy: 'Keep critical systems running with resilient stored energy.', href: '/shop/sok', label: 'Shop Backup Power', image: '/assets/hero/project-support.webp' },
  { title: 'Commercial Power', copy: 'Scalable power and supply support for larger applications.', href: '/shop/sok', label: 'Shop Commercial', image: '/assets/hero/home-tropical.webp' }
];"""
shell = regex_once(shell, r"const solutionCards = \[.*?\n\];", solution_cards, 'solution cards', re.S)

solution_markup = """function solutionMarkup() {
  return solutionCards.map(({ title, copy, href, label, image }) => `
    <article class="solution-card solution-card--visual">
      <div class="solution-card__media" style="background-image:linear-gradient(180deg,rgba(2,8,11,.06),rgba(2,8,11,.88)),url('${image}')" role="img" aria-label="${escapeHtml(title)}"></div>
      <div class="solution-card__content"><h3>${title}</h3><p>${copy}</p><a href="${href}" class="text-link">${label} <span aria-hidden="true">→</span></a></div>
    </article>`).join('');
}"""
shell = regex_once(shell, r"function solutionMarkup\(\) \{.*?\n\}", solution_markup, 'solution markup', re.S)

icon_helper = r'''function shortcutIcon(kind) {
  const icons = {
    lithium: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 4 10 25h10l-3 19 21-27H27l5-13Z"/></svg>',
    solar: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 18h30l4 20H5l4-20Zm5 0 2-8h16l2 8M11 25h30M8 32h34M18 18l-2 20M30 18l2 20"/></svg>',
    rv: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 14h28l8 9v12H5V14Zm28 4v9h8M13 35a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm22 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/></svg>',
    backup: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m5 24 19-16 19 16M10 21v22h28V21M18 43V29h12v14"/></svg>',
    commercial: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 43V24l12-7v26M19 43V11l22-6v38M26 17h7M26 25h7M26 33h7"/></svg>',
    hawaii: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="25" r="18"/><path d="M24 43V25m0 0c-7-8-13-5-16-2m16 2c7-8 13-5 16-2m-16 2c-4-11 0-17 4-20m-4 20c4-11 0-17-4-20"/></svg>'
  };
  return `<span class="shortcut-icon shortcut-icon--${kind}">${icons[kind] || ''}</span>`;
}
'''
shell = replace_once(shell, 'function documentHead(routeInfo, { notFound = false } = {}) {', icon_helper + '\nfunction documentHead(routeInfo, { notFound = false } = {}) {', 'shortcut helper')

shell = shell.replace("const socialImage = asset('/assets/elevation-lithium-social-card.webp');", "const socialImage = `${CANONICAL_ORIGIN}/assets/hero/power-social.webp`;", 1)
shell = shell.replace("${asset('/assets/hero/storefront-tropical-logistics-v3.webp')}", "${'/assets/hero/home-tropical.webp'}")
shell = shell.replace("${asset('/assets/brands/sok/sok-wordmark-home-transparent.webp?v=20260910-1')}", "${'/assets/brands/sok/sok-wordmark.webp'}")
shell = shell.replace("${asset('/assets/brands/sok/sk12v100pc/home-hero.webp')}", "${'/assets/brands/sok/sk12v100pc/official-clean.png'}")

shell = replace_once(shell,
'<h1 id="storefront-title">Lithium Power<br><span>for RV, Solar &amp; Backup</span></h1>',
'<h1 id="storefront-title">Power Beyond<br><span>the Grid.</span></h1>', 'homepage h1')
shell = regex_once(shell, r'<p class="storefront-lead">.*?</p>', '<p class="storefront-lead">Off-grid power, supply and logistics for RV, solar, backup power and harder-to-serve markets — backed by real product and project support from Elevation UpScales.</p>', 'homepage lead', re.S)

shortcut_nav = '''<nav class="usecase-grid" aria-label="Power solution shortcuts">
            <a href="/store?department=lithium-batteries">${shortcutIcon('lithium')}<span>Lithium Batteries</span></a>
            <a href="/solar-project">${shortcutIcon('solar')}<span>Solar &amp; Off-Grid</span></a>
            <a href="/store?department=rv-outdoor">${shortcutIcon('rv')}<span>RV &amp; Outdoor</span></a>
            <a href="/shop/sok">${shortcutIcon('backup')}<span>Backup Power</span></a>
            <a href="/shop/sok">${shortcutIcon('commercial')}<span>Commercial Solutions</span></a>
            <a href="/hawaii-lithium-batteries">${shortcutIcon('hawaii')}<span>Hawaii Logistics</span></a>
          </nav>'''
shell = regex_once(shell, r'<nav class="usecase-grid" aria-label="Power solution shortcuts">.*?</nav>', shortcut_nav, 'shortcut nav', re.S)

trust = '''<section class="trust-strip" aria-label="Elevation customer support highlights">
      <div class="trust-item"><span class="trust-icon">${shortcutIcon('backup')}</span><div><strong>TRUSTED BRANDS</strong><span>Premium power solutions from approved suppliers.</span></div></div>
      <a class="trust-item" href="/shipping-logistics-services"><span class="trust-icon">${shortcutIcon('rv')}</span><div><strong>HAWAII READY</strong><span>Logistics support for harder-to-serve markets.</span></div></a>
      <a class="trust-item" href="tel:+12088134998"><span class="trust-icon">${shortcutIcon('hawaii')}</span><div><strong>REAL SUPPORT</strong><span>208-813-4998</span></div></a>
    </section>'''
shell = regex_once(shell, r'<section class="trust-strip" aria-label="Elevation customer support highlights">.*?</section>', trust, 'trust strip', re.S)
shell_path.write_text(shell)

# ---------------- STORE/CATALOG ----------------
catalog_path = Path('apps/web-v2/src/catalog-pages.js')
catalog = catalog_path.read_text()
catalog = catalog.replace("import { UNVERIFIED, VENDORS, getProductById, getProductsByVendor, getVendor, searchCatalog } from './catalog.js';", "import { CATALOG_PRODUCTS, UNVERIFIED, VENDORS, getProductById, getProductsByVendor, getVendor, searchCatalog } from './catalog.js';")

new_header = r'''function header(currentPath) {
  const links = flattenNav().map(({ label, href }) => {
    const active = href === currentPath ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${escapeHtml(label)}</a>`;
  }).join('');
  return `<div class="catalog-utility"><div class="catalog-shell">OFF-GRID POWER • SUPPLY • LOGISTICS <span>HAWAII LOGISTICS AVAILABLE</span><a href="tel:+12088134998">208-813-4998</a></div></div><header class="catalog-topnav"><div class="catalog-nav-inner"><a class="catalog-brand" href="/" aria-label="Elevation UpScales home"><img src="/assets/brand/elevation-wordmark.webp" alt="Elevation UpScales, Inc. — Off-Grid Power, Supply, Logistics"></a><nav aria-label="Primary retail navigation">${links}</nav><form class="catalog-search" action="/store" method="get"><label class="sr-only" for="catalog-search">Search catalog</label><input id="catalog-search" name="q" type="search" placeholder="Search products, systems, or solutions…"><button type="submit" aria-label="Search">⌕</button></form><a class="catalog-cart-link" href="/cart">Cart</a><a class="catalog-project-link" href="/start-a-project">Start a Project</a></div></header>`;
}'''
catalog = regex_once(catalog, r'function header\(currentPath\) \{.*?\n\}', new_header, 'catalog header', re.S)

new_footer = r'''function footer() {
  const links = FOOTER_NAV.map(({ label, href }) => `<a href="${href}">${escapeHtml(label)}</a>`).join('');
  return `<footer class="catalog-footer"><div class="catalog-footer-brand"><img src="/assets/brand/elevation-wordmark.webp" alt="Elevation UpScales, Inc."><p>OFF-GRID POWER • SUPPLY • LOGISTICS</p></div><div class="catalog-nav-inner">${links}<span>© 2026 Elevation UpScales, Inc.</span></div></footer>`;
}'''
catalog = regex_once(catalog, r'function footer\(\) \{.*?\n\}', new_footer, 'catalog footer', re.S)

new_card = r'''function card(product) {
  const state = product.orderable ? 'Orderable' : 'Verification hold — not currently orderable';
  const media = product.media && product.media !== UNVERIFIED
    ? `<img src="${escapeHtml(product.media)}" alt="${escapeHtml(product.title)}">`
    : '<div class="catalog-media-pending" role="img" aria-label="Product image pending verification"><span>PRODUCT IMAGE</span><strong>VERIFICATION PENDING</strong></div>';
  return `<article class="catalog-card" data-product-id="${escapeHtml(product.id)}">
    <a class="catalog-card-media" href="/product/${encodeURIComponent(product.id)}">${media}</a>
    <div class="catalog-card-body"><span class="vendor">${escapeHtml(product.vendorName)}</span><span class="sku">${escapeHtml(product.sku)}</span><h2>${escapeHtml(product.title)}</h2><div class="price">${escapeHtml(formatPrice(product.sellPrice))}</div><div class="status">${state}</div><a href="/product/${encodeURIComponent(product.id)}">View product details →</a></div>
  </article>`;
}'''
catalog = regex_once(catalog, r'function card\(product\) \{.*?\n\}', new_card, 'catalog card', re.S)

helpers = r'''function storeCategoryCards() {
  const cards = [
    ['SOK Batteries', '/shop/sok', '/assets/brands/sok/sk12v100pc/official-clean.png'],
    ['Solar Panels', '/shop/renogy', '/assets/hero/power-social.webp'],
    ['Inverters & Charging', '/shop/renogy', '/assets/hero/project-support.webp'],
    ['RV & Outdoor', '/store?department=rv-outdoor', '/assets/hero/store-rv-mountains.webp'],
    ['Accessories', '/store?q=accessories', '/assets/hero/hawaii-ocean-freight.webp'],
    ['Commercial', '/store?q=commercial', '/assets/hero/home-tropical.webp']
  ];
  return cards.map(([title, href, image]) => `<a class="store-category-card" href="${href}"><span class="store-category-media" style="background-image:linear-gradient(180deg,rgba(2,8,11,.02),rgba(2,8,11,.72)),url('${image}')"></span><strong>${title}</strong></a>`).join('');
}

function featuredProducts() {
  return CATALOG_PRODUCTS.slice(0, 6).map(card).join('');
}

'''
catalog = replace_once(catalog, 'function storeMain(url) {', helpers + 'function storeMain(url) {', 'store helpers')

new_store = r'''function storeMain(url) {
  const query = url.searchParams.get('q') || '';
  const vendorParam = url.searchParams.get('vendor') || '';
  let products = searchCatalog(query);
  if (vendorParam && getVendor(vendorParam)) products = products.filter(({ vendorId }) => vendorId === vendorParam.toLowerCase());

  return `<main id="main" class="catalog-main store-main">
    <section class="store-hero" aria-labelledby="store-title"><div class="store-hero-overlay"></div><div class="catalog-shell store-hero-content"><p class="store-eyebrow">AUTHORIZED OFF-GRID POWER &amp; RV SUPPLY</p><h1 id="store-title">Power Your RV.<br>Build Your Off-Grid System.<br><span>Buy With Confidence.</span></h1><p>Lithium batteries, solar, charging and RV equipment from trusted manufacturers — backed by real product and project support from Elevation UpScales.</p><div class="store-hero-actions"><a class="store-primary" href="/shop/sok">SHOP POWER &amp; ENERGY →</a><a class="store-secondary" href="/start-a-project">Start a Project</a></div></div></section>
    <section class="store-trust" aria-label="Store trust highlights"><div><strong>✓</strong><span><b>Authorized Dealer</b><small>Approved supplier relationships</small></span></div><div><strong>▤</strong><span><b>Shipping Support</b><small>Route review for available products</small></span></div><div><strong>◉</strong><span><b>Real Support</b><small>208-813-4998</small></span></div><div><strong>★</strong><span><b>Trusted Products</b><small>Curated supplier catalog</small></span></div></section>
    <div class="catalog-shell store-content">
      <section class="store-shopby" aria-labelledby="store-shop-title"><div class="store-section-heading"><h2 id="store-shop-title">Shop the <span>Store</span></h2><a href="/store">View All Products →</a></div><div class="store-category-grid">${storeCategoryCards()}</div></section>
      <section class="store-featured" aria-labelledby="featured-title"><div class="store-section-heading"><div><p>CURATED CATALOG</p><h2 id="featured-title">Featured Products</h2></div></div><div class="catalog-grid catalog-featured-grid">${featuredProducts()}</div></section>
      <section class="dealer-trust" aria-label="Approved dealer relationships"><p>AUTHORIZED &amp; APPROVED BRAND RELATIONSHIPS</p><div><strong>SOK BATTERY</strong><strong>RENOGY</strong><strong>VEVOR</strong><strong>WINEGARD</strong></div></section>
      <section class="full-catalog" aria-labelledby="catalog-title"><div class="store-section-heading"><div><p>FULL CATALOG</p><h2 id="catalog-title">Find the right product.</h2></div></div>${vendorFilters(vendorParam)}${query ? `<p>Search results for <strong>${escapeHtml(query)}</strong></p>` : ''}<section class="catalog-grid" aria-label="Product catalog">${products.length ? products.map(card).join('') : '<div class="catalog-empty">No verified-source product records match this view.</div>'}</section></section>
    </div>
  </main>`;
}'''
catalog = regex_once(catalog, r'function storeMain\(url\) \{.*?\n\}', new_store, 'store main', re.S)
catalog_path.write_text(catalog)

# ---------------- CSS ----------------
final_css = r'''export const finalVisualStyles = `
:root{--ev-cyan:#00bff3;--ev-cyan2:#21d4ff;--ev-ink:#02080b;--ev-navy:#03141c;--ev-line:rgba(33,212,255,.3)}
/* Release-critical home imagery is same-origin. */
.reference-storefront-home .storefront-scene{background-image:linear-gradient(90deg,rgba(2,8,11,.93) 0%,rgba(2,8,11,.55) 45%,rgba(2,8,11,.15) 72%),url('/assets/hero/home-tropical.webp')!important;background-position:center;background-size:cover}
.reference-storefront-home .brand img,.reference-footer .footer-brand-block img{object-fit:contain}
.reference-storefront-home .storefront-copy h1{font-size:clamp(3.2rem,6.2vw,6.9rem);letter-spacing:-.055em;line-height:.84}.reference-storefront-home .storefront-copy h1 span{color:var(--ev-cyan)}
.reference-storefront-home .storefront-lead{max-width:690px;font-size:clamp(1.05rem,1.4vw,1.35rem)}
.reference-storefront-home .usecase-grid{grid-template-columns:repeat(6,minmax(0,1fr));gap:0;border-top:0}.reference-storefront-home .usecase-grid a{display:flex;min-height:112px;flex-direction:column;justify-content:center;align-items:flex-start;gap:8px;border-right:1px solid rgba(33,212,255,.45);padding:12px 16px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}.reference-storefront-home .usecase-grid a:last-child{border-right:0}.shortcut-icon{display:inline-flex;width:42px;height:42px;color:var(--ev-cyan2)}.shortcut-icon svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.reference-storefront-home .trust-strip{display:grid;grid-template-columns:repeat(3,1fr);background:#03131a;border-block:1px solid var(--ev-line)}.reference-storefront-home .trust-item{display:flex;align-items:center;justify-content:center;gap:15px;min-height:98px;border-right:1px solid var(--ev-line)}.reference-storefront-home .trust-item:last-child{border-right:0}.reference-storefront-home .trust-item>div{display:flex;flex-direction:column}.reference-storefront-home .trust-icon .shortcut-icon{width:34px;height:34px}
.reference-storefront-home .solution-grid{grid-template-columns:repeat(7,minmax(0,1fr));gap:10px}.reference-storefront-home .solution-card--visual{min-height:292px;padding:0;overflow:hidden;position:relative;border:1px solid var(--ev-line);background:#06141a}.solution-card__media{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .25s ease}.solution-card--visual:hover .solution-card__media{transform:scale(1.025)}.solution-card__content{position:absolute;inset:auto 0 0;padding:20px 14px 15px;z-index:2}.solution-card__content h3{font-size:1rem;margin:0 0 6px}.solution-card__content p{font-size:.82rem;margin:0 0 12px;line-height:1.35}.solution-card__content .text-link{display:inline-flex;border:1px solid var(--ev-cyan);border-radius:7px;padding:7px 9px;background:rgba(2,8,11,.76)}
.reference-storefront-home .sok-feature{background-image:linear-gradient(90deg,rgba(2,8,11,.92),rgba(2,8,11,.7)),url('/assets/hero/home-tropical.webp');background-size:cover;background-position:center}.reference-storefront-home .product-card-horizontal .product-image{background:#f4f6f7}.reference-storefront-home .solar-feature-media{background-image:linear-gradient(rgba(2,8,11,.08),rgba(2,8,11,.2)),url('/assets/hero/power-social.webp')!important;background-size:cover;background-position:center}.reference-storefront-home .support-card{background:linear-gradient(145deg,rgba(5,26,35,.98),rgba(2,8,11,.98));border:1px solid var(--ev-line)}
/* Premium functional catalog/store. */
.catalog-main{background:#02080b!important;color:#edf8fb!important;padding:0!important}.catalog-shell{width:min(1440px,calc(100% - 48px))!important}.catalog-utility{background:#04364c;color:#eefcff;font-size:.73rem;letter-spacing:.1em;text-transform:uppercase}.catalog-utility .catalog-shell{min-height:38px;display:flex;align-items:center;justify-content:space-between;gap:18px}.catalog-utility a{color:#fff}.catalog-topnav{background:rgba(2,8,11,.98)!important;border-bottom:1px solid rgba(33,212,255,.2);position:relative;z-index:10}.catalog-topnav .catalog-nav-inner{width:min(1440px,calc(100% - 48px))!important;min-height:82px!important}.catalog-brand{width:245px;display:block!important;margin-right:8px!important}.catalog-brand img{width:100%;height:62px;object-fit:contain}.catalog-topnav nav{gap:12px!important}.catalog-topnav nav a{font-size:.79rem!important}.catalog-search{margin-left:auto;display:flex;align-items:center;width:min(320px,22vw);border:1px solid #0ebee8;border-radius:28px;overflow:hidden;background:#04131a}.catalog-search input{min-width:0;width:100%;padding:11px 14px;background:none;border:0;color:white;outline:0}.catalog-search button{border:0;background:none;color:#21d4ff;font-size:1.35rem;padding:6px 12px}.catalog-cart-link,.catalog-project-link{color:#fff;text-decoration:none;font-weight:800}.catalog-project-link{border:2px solid #0fd1ff;border-radius:9px;padding:12px 17px;color:#15d8ff!important}
.store-hero{position:relative;min-height:570px;display:flex;align-items:center;background:url('/assets/hero/store-rv-mountains.webp') center 48%/cover no-repeat}.store-hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,8,11,.9) 0%,rgba(2,8,11,.67) 44%,rgba(2,8,11,.12) 75%)}.store-hero-content{position:relative;z-index:2;padding:70px 0}.store-eyebrow{color:#bdeeff!important;font-weight:850;letter-spacing:.2em;text-transform:uppercase}.store-hero h1{max-width:820px;margin:12px 0 20px;font-size:clamp(3.1rem,6vw,6rem);line-height:.91;letter-spacing:-.05em;color:white}.store-hero h1 span{color:#13cfff}.store-hero-content>p:last-of-type{max-width:760px;color:#e6f2f5!important;font-size:1.2rem;line-height:1.55}.store-hero-actions{display:flex;gap:14px;margin-top:25px}.store-primary,.store-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:8px;font-weight:850;text-decoration:none}.store-primary{background:#09bff4;color:white}.store-secondary{border:2px solid #09bff4;color:white}.store-trust{display:grid;grid-template-columns:repeat(4,1fr);background:#03141c;border-block:1px solid var(--ev-line)}.store-trust>div{display:flex;gap:12px;align-items:center;justify-content:center;padding:21px;border-right:1px solid var(--ev-line)}.store-trust>div:last-child{border-right:0}.store-trust strong{font-size:1.4rem;color:#fff}.store-trust span{display:flex;flex-direction:column}.store-trust b{font-size:.92rem}.store-trust small{color:#a9c5cf}.store-content{padding:46px 0 70px}.store-section-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:18px}.store-section-heading h2{margin:0;color:white;font-size:clamp(2rem,4vw,3.2rem)}.store-section-heading h2 span{color:#15d8ff}.store-section-heading p{color:#5fdfff;letter-spacing:.14em;font-weight:800}.store-section-heading a{color:#15d8ff}.store-category-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.store-category-card{min-height:210px;position:relative;overflow:hidden;border:1px solid var(--ev-line);border-radius:10px;color:white;text-decoration:none;background:#07171d}.store-category-media{position:absolute;inset:0;background-size:cover;background-position:center}.store-category-card strong{position:absolute;left:14px;bottom:14px;z-index:2;font-size:.96rem}.store-featured,.dealer-trust,.full-catalog{margin-top:56px}.catalog-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}.catalog-featured-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}.catalog-card{padding:0!important;overflow:hidden;background:#07171d!important;border-color:var(--ev-line)!important;color:white}.catalog-card-media{display:block;height:190px;background:#eef3f5;margin:0!important}.catalog-card-media img{width:100%;height:100%;object-fit:contain;padding:18px;box-sizing:border-box}.catalog-media-pending{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#4b6570;letter-spacing:.09em}.catalog-media-pending span{font-size:.7rem}.catalog-media-pending strong{font-size:.86rem}.catalog-card-body{padding:18px;display:flex;flex-direction:column;gap:8px;min-height:230px}.catalog-card h2{color:white!important;font-size:1.06rem}.catalog-card .price{color:white!important}.catalog-card .status{background:#283139!important;color:#dbe9ee!important}.catalog-card a{color:#22d8ff!important}.dealer-trust{padding:28px;border:1px solid var(--ev-line);background:#f1f4f4;color:#06141a;text-align:center;border-radius:10px}.dealer-trust>p{font-size:.72rem;letter-spacing:.18em;font-weight:900}.dealer-trust>div{display:flex;justify-content:center;gap:60px;flex-wrap:wrap;font-size:1.45rem}.catalog-filter a{background:#07171d!important;border-color:#244854!important;color:#d7edf3!important}.catalog-filter a[aria-current="page"]{border-color:#11cdf8!important;color:white!important}.catalog-empty{background:#07171d!important;border-color:#35505a!important;color:#b9cbd1!important}.catalog-footer{background:#010608!important;border-top:1px solid var(--ev-line);padding:35px 0!important}.catalog-footer-brand{text-align:center;margin-bottom:22px}.catalog-footer-brand img{width:280px;max-width:70vw}.catalog-footer-brand p{letter-spacing:.18em;font-size:.72rem}.catalog-footer .catalog-nav-inner{width:min(1180px,calc(100% - 2rem))!important;justify-content:center}
@media(max-width:1100px){.reference-storefront-home .solution-grid{grid-template-columns:repeat(4,1fr)}.reference-storefront-home .usecase-grid{grid-template-columns:repeat(3,1fr)}.store-category-grid{grid-template-columns:repeat(3,1fr)}.catalog-topnav nav{display:none}.catalog-search{width:auto;flex:1}.catalog-featured-grid,.catalog-grid{grid-template-columns:repeat(2,1fr)!important}}
@media(max-width:680px){.catalog-shell{width:min(100% - 28px,1440px)!important}.reference-storefront-home .storefront-copy h1{font-size:3.25rem}.reference-storefront-home .usecase-grid{grid-template-columns:repeat(2,1fr)}.reference-storefront-home .usecase-grid a{min-height:96px}.reference-storefront-home .trust-strip{grid-template-columns:1fr}.reference-storefront-home .trust-item{justify-content:flex-start;padding:14px 18px;border-right:0;border-bottom:1px solid var(--ev-line)}.reference-storefront-home .solution-grid{grid-template-columns:1fr 1fr}.reference-storefront-home .solution-card--visual{min-height:235px}.catalog-utility .catalog-shell{font-size:.62rem;justify-content:center}.catalog-utility span,.catalog-utility a{display:none}.catalog-topnav .catalog-nav-inner{width:calc(100% - 28px)!important;min-height:72px!important;display:grid!important;grid-template-columns:1fr auto auto;gap:10px!important;padding:8px 0!important}.catalog-brand{width:160px}.catalog-brand img{height:52px}.catalog-search{grid-column:1/-1;grid-row:2;width:100%}.catalog-project-link{display:none}.store-hero{min-height:600px;background-position:62% center}.store-hero-overlay{background:linear-gradient(180deg,rgba(2,8,11,.75),rgba(2,8,11,.9))}.store-hero-content{padding:46px 0}.store-hero h1{font-size:3rem}.store-hero-content>p:last-of-type{font-size:1rem}.store-hero-actions{flex-direction:column;align-items:stretch}.store-trust{grid-template-columns:1fr 1fr}.store-trust>div{justify-content:flex-start;padding:14px}.store-category-grid{grid-template-columns:1fr 1fr}.store-category-card{min-height:180px}.catalog-featured-grid,.catalog-grid{grid-template-columns:1fr!important}.dealer-trust>div{gap:18px;font-size:1rem}.store-section-heading{align-items:flex-start;flex-direction:column}.catalog-card-media{height:210px}}
@media(max-width:420px){.reference-storefront-home .solution-grid,.store-category-grid{grid-template-columns:1fr}.reference-storefront-home .storefront-copy h1{font-size:2.9rem}.store-hero h1{font-size:2.65rem}}
`;'''
Path('apps/web-v2/src/final-visual-styles.js').write_text(final_css)

# ---------------- INDEX ----------------
index_path = Path('apps/web-v2/src/index.js')
index = index_path.read_text()
index = replace_once(index, "import { homeFidelityStyles } from './home-fidelity-styles.js';\n", "import { homeFidelityStyles } from './home-fidelity-styles.js';\nimport { finalVisualStyles } from './final-visual-styles.js';\n", 'final styles import')
index = replace_once(index, '${homeFidelityStyles}\\n${sokProductMerchandisingStyles}', '${homeFidelityStyles}\\n${sokProductMerchandisingStyles}\\n${finalVisualStyles}', 'final CSS bundle')
index_path.write_text(index)

# ---------------- TESTS ----------------
test_path = Path('apps/web-v2/test/shell.test.mjs')
tests = test_path.read_text()
anchor = "test('canonical catalog routes remain customer-safe', async () => {"
visual_test = r'''test('final visual implementation owns release-critical imagery and functional store UI', async () => {
  const { readFile } = await import('node:fs/promises');
  for (const rel of [
    '../public/assets/brand/elevation-wordmark.webp',
    '../public/assets/hero/home-tropical.webp',
    '../public/assets/hero/store-rv-mountains.webp',
    '../public/assets/brands/sok/sok-wordmark.webp',
    '../public/assets/brands/sok/sk12v100pc/official-clean.png',
    '../public/assets/brands/sok/sk48v100n/official-clean.png'
  ]) assert.ok((await readFile(new URL(rel, import.meta.url))).byteLength > 10000, rel);

  const home = await (await request('/')).text();
  assert.match(home, /Power Beyond/);
  assert.match(home, /shortcut-icon/);
  assert.match(home, /solution-card__media/);
  assert.match(home, /\/assets\/brand\/elevation-wordmark\.webp/);
  assert.match(home, /\/assets\/brands\/sok\/sok-wordmark\.webp/);
  assert.doesNotMatch(home, /Buy More,? Save More|sk48v100n\/home-crop|sk48v100n\/hero\.jpg/i);

  const store = await (await request('/store')).text();
  assert.match(store, /AUTHORIZED OFF-GRID POWER &amp; RV SUPPLY/);
  assert.match(store, /Power Your RV/);
  assert.match(store, /Featured Products/);
  assert.match(store, /Product image pending verification/);
  assert.match(store, /renogy-rsp100dct-us/);
  assert.match(store, /VEVOR/);
  assert.match(store, /WINEGARD/);
  assert.doesNotMatch(store, /Victron/i);
  assert.match(store, /href="\/shop\/sok"/);
  assert.match(store, /href="\/start-a-project"/);

  const css = await (await request('/assets/app.css')).text();
  assert.match(css, /\/assets\/hero\/home-tropical\.webp/);
  assert.match(css, /\/assets\/hero\/store-rv-mountains\.webp/);
  assert.match(css, /store-category-grid/);
  assert.match(css, /@media\(max-width:680px\)/);
});

'''
if visual_test not in tests:
    tests = replace_once(tests, anchor, visual_test + anchor, 'visual test insertion')
test_path.write_text(tests)
