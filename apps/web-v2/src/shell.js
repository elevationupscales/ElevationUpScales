import { CANONICAL_ORIGIN, PRIMARY_NAV, canonicalUrl } from './routes.js';

const LEGACY_ASSET_ORIGIN = 'https://elevationupscales.com';
const asset = (path) => `${LEGACY_ASSET_ORIGIN}${path}`;

const solutionCards = [
  ['Lithium Batteries', 'LiFePO4 systems for RV, solar, backup and off-grid use.', '/store?department=lithium-batteries', 'Shop Lithium'],
  ['SOK Battery Systems', '12V, 24V and 48V systems from Elevation’s primary authorized battery partner.', '/shop/sok', 'Shop SOK'],
  ['Solar & Off-Grid', 'Build around batteries, charging and real power needs.', '/solar-project', 'Shop Solar'],
  ['Hawaii Power & Logistics', 'Battery supply and destination review for Hawaii.', '/hawaii-lithium-batteries', 'Explore Hawaii'],
  ['RV & Outdoor', 'Travel, camping, RV and practical outdoor equipment.', '/store?department=rv-outdoor', 'Shop RV & Outdoor'],
  ['Backup Power', 'Battery storage and power systems for backup applications.', '/shop/sok', 'Shop Backup Power'],
  ['Commercial Power', 'Rack storage and larger product-supply quantities.', '/shop/sok', 'Commercial Supply']
];

const productGrid = [
  {
    group: 'LITHIUM', title: '100Ah LiFePO4 Battery', image: asset('/assets/brands/sok/sk12v100pc/hero.png'),
    href: '/shop/sok', alt: 'SOK SK12V100PC 100Ah LiFePO4 battery'
  },
  {
    group: 'LITHIUM', title: '100Ah LiFePO4 Rack Battery', image: asset('/assets/brands/sok/sk48v100n/hero.jpg'),
    href: '/shop/sok', alt: 'SOK SK48V100N 100Ah rack battery'
  },
  {
    group: 'LITHIUM', title: '12V 100Ah LiFePO4 Battery', image: 'https://image.doba.com/dg-PAqmVRKWNJYH/d0102x39tjv.jpg',
    href: '/store?q=12V%20100Ah%20LiFePO4%20Battery', alt: '12V 100Ah LiFePO4 battery'
  },
  {
    group: 'LITHIUM', title: 'Portable Solar Power Bank — 10000mAh', image: 'https://image.doba.com/dg-atDvVcHCbYoq/d01027h729u.jpg',
    href: '/store?q=Portable%20Solar%20Power%20Bank', alt: 'Portable solar power bank'
  },
  {
    group: 'RV & OUTDOOR', title: 'Rechargeable 200,000 Lumens LED Spotlight', image: 'https://img.vevorstatic.com/us/DGYWSJGDXDTKA7G1TV9/goods_img_big-v1/rechargeable-spotlight-m100-1.2.jpg?format=webp&timestamp=1731314531000',
    href: '/store?q=Rechargeable%20Spotlight', alt: 'Rechargeable LED spotlight'
  },
  {
    group: 'RV & OUTDOOR', title: '8L Hot Water Heater Tankless Instant Boiler Outdoor', image: 'https://utedusjer.no/cdn/shop/products/8liter-min.jpg?v=1654023433&width=1024',
    href: '/store?q=8L%20Hot%20Water%20Heater', alt: '8L outdoor tankless hot water heater'
  },
  {
    group: 'RV & OUTDOOR', title: "Portable Walk-In Greenhouse 20' x 10'", image: 'https://image.vevor.com/us/YDSDWS20107FTYBYXV0/original_img-v3/tunnel-greenhouse-m100-1.1.jpg?timestamp=1670940797747',
    href: '/store?q=Portable%20Walk-In%20Greenhouse', alt: 'Portable walk-in greenhouse'
  },
  {
    group: 'RV & OUTDOOR', title: '12V Electric Scissor Car Jack & Impact Wrench', image: 'https://s.alicdn.com/@sc04/kf/H90a98af76a91418698eb173453b5254e8/Factory-Price-Tool-Car-12-Volt-2T-35CM-Scissor-Jack-Electric-Wrench-Suit-with-Hydraulic-Repair-Kit-for-Suv.jpg',
    href: '/store?q=12V%20Electric%20Scissor%20Car%20Jack', alt: '12V electric scissor car jack and impact wrench kit'
  },
  {
    group: 'RV & OUTDOOR', title: '12V Water Diaphragm Pump — 5.5 GPM', image: 'https://i5.walmartimages.com/seo/12V-DC-Water-Diaphragm-Pump-5-5-GPM-Flow-70-PSI-Adjustable-Pressure-1-2-Inch-MNPT-Self-Priming-Sprayer-Pump-Pressure-Switch-RV-Camper-Marine-Boat-Law_40f43dd1-549d-4fdc-8f7d-09eb9ce7335e.284e7e762ebd053ff57d3a6a81651e3b.jpeg',
    href: '/store?q=12V%20Water%20Diaphragm%20Pump', alt: '12V water diaphragm pump'
  },
  {
    group: 'RV & OUTDOOR', title: 'Heavy-Duty 5.3 Gallon Metal Fuel Can', image: 'https://mobileimages.lowes.com/productimages/a4c0c39c-7115-4e98-9513-904d908abebf/63612904.jpg',
    href: '/store?q=Heavy-Duty%20Metal%20Fuel%20Can', alt: 'Heavy-duty metal fuel can'
  }
];

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

function navMarkup(currentPath) {
  return PRIMARY_NAV.map((item) => {
    const active = Array.isArray(item.children) && item.children.some(({ href }) => href.split(/[?#]/)[0] === currentPath) ? ' data-active="true"' : '';
    const childLinks = (item.children || []).map(({ label, href, description }) => `
      <a href="${href}"><span><strong>${label}</strong>${description ? `<small>${description}</small>` : ''}</span></a>`).join('');
    return `<details class="nav-menu"${active}>
      <summary>${item.label}<span class="nav-caret" aria-hidden="true"></span></summary>
      <div class="nav-dropdown">${childLinks}</div>
    </details>`;
  }).join('');
}

function solutionMarkup() {
  return solutionCards.map(([title, copy, href, label]) => `
    <article class="solution-card">
      <h3>${title}</h3>
      <p>${copy}</p>
      <a href="${href}" class="text-link">${label} <span aria-hidden="true">→</span></a>
    </article>`).join('');
}

function productGridMarkup() {
  return productGrid.map(({ group, title, image, href, alt }) => `
    <article class="homepage-product-card">
      <a class="homepage-product-card__media" href="${href}" aria-label="View ${escapeHtml(title)} in the Elevation catalog">
        <img src="${image}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
      </a>
      <div class="homepage-product-card__body">
        <p class="product-kicker">${group}</p>
        <h3><a href="${href}">${escapeHtml(title)}</a></h3>
        <a class="text-link" href="${href}">View Details <span aria-hidden="true">→</span></a>
      </div>
    </article>`).join('');
}

function documentHead(routeInfo, { notFound = false } = {}) {
  const title = notFound ? 'Page Not Found | Elevation UpScales' : routeInfo.title;
  const description = notFound
    ? 'The requested page could not be found. Continue to Elevation UpScales home or contact the team for help.'
    : routeInfo.description;
  const canonical = notFound ? '' : `\n  <link rel="canonical" href="${canonicalUrl(routeInfo)}">`;
  const robots = notFound ? '\n  <meta name="robots" content="noindex,follow">' : '';
  const pageUrl = notFound ? CANONICAL_ORIGIN : canonicalUrl(routeInfo);
  const socialImage = asset('/assets/elevation-lithium-social-card.webp');

  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#02080b">
  <meta name="description" content="${escapeHtml(description)}">${robots}${canonical}
  <meta property="og:site_name" content="Elevation UpScales">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
  <meta property="og:image" content="${socialImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${socialImage}">
  <title>${escapeHtml(title)}</title>
  <link rel="preload" as="image" href="${asset('/assets/hero/storefront-tropical-logistics-v3.webp')}">
  <link rel="preload" as="image" href="${asset('/assets/brands/sok/sk12v100pc/home-hero.webp?v=20260910-1')}">
  <link rel="stylesheet" href="/assets/app.css">
  <script defer src="/assets/app.js"></script>`;
}

function headerMarkup(currentPath) {
  return `
  <a class="skip-link" href="#main">Skip to shopping</a>
  <div class="utility-bar" aria-label="Store information">
    <div class="utility-inner shell-width">
      <span class="utility-signal">OFF-GRID POWER • SUPPLY • LOGISTICS</span>
      <a href="/shipping-logistics-services">HAWAII &amp; ALASKA LOGISTICS REVIEW</a>
      <span>RV • SOLAR • BACKUP • COMMERCIAL</span>
      <span class="utility-contact"><a href="tel:+12088134998">208-813-4998</a><a href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a></span>
    </div>
  </div>
  <header class="site-header">
    <div class="shell-width nav-row">
      <a class="brand" href="/" aria-label="Elevation UpScales, Inc. home">
        <img src="${asset('/assets/logo.webp')}" alt="Elevation UpScales, Inc." width="900" height="900">
        <span class="brand-copy"><strong>Elevation UpScales</strong><small>Off-Grid Power • Supply • Logistics</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span><span class="sr-only">Open navigation</span></button>
      <nav id="primary-nav" class="primary-nav" aria-label="Primary shopping navigation">${navMarkup(currentPath)}</nav>
      <form class="header-search" role="search" action="/store" method="get">
        <label class="sr-only" for="site-search">Search products, systems, or solutions</label>
        <input id="site-search" name="q" type="search" autocomplete="off" placeholder="Search products, systems, or solutions…">
        <button type="submit" aria-label="Search">⌕</button>
      </form>
      <a class="button button-primary header-cta" href="/start-a-project">Start a Project</a>
    </div>
  </header>`;
}

function footerMarkup() {
  return `
  <footer class="site-footer reference-footer">
    <div class="shell-width footer-grid fidelity-footer-grid">
      <div class="footer-brand-block fidelity-footer-brand">
        <img src="${asset('/assets/logo.webp')}" alt="Elevation UpScales, Inc." width="900" height="900">
        <div><strong>Elevation UpScales, Inc.</strong><p>RV Batteries • Lithium Energy • Supply • Logistics</p><span>Colorado corporation • Colorado sales-tax licensed</span></div>
      </div>
      <nav class="footer-link-group" aria-label="Power and shopping"><strong>Power &amp; Shop</strong>
        <a href="/store?department=lithium-batteries">Lithium Batteries</a>
        <a href="/shop/sok">SOK Battery Systems</a>
        <a href="/store?department=rv-outdoor">RV &amp; Outdoor</a>
        <a href="/shipping-logistics-services">Freight &amp; Logistics</a>
        <a href="/marketplace">Marketplace</a>
      </nav>
      <nav class="footer-link-group" aria-label="Company and legal"><strong>Company &amp; Legal</strong>
        <a href="/what-we-do">What We Do</a>
        <a href="/work-with-us">Work With Us</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms &amp; Business Disclosures</a>
        <a href="/report-an-issue">Report an Issue</a>
      </nav>
      <div class="footer-contact"><strong>Contact</strong><a href="tel:+12088134998">208-813-4998</a><a href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a><a class="button button-outline" href="/start-a-project">Start a Project</a></div>
      <p class="copyright">© <span data-current-year>2026</span> Elevation UpScales, Inc. · Colorado Springs, Colorado.</p>
    </div>
  </footer>`;
}

function homeMain() {
  return `
    <section class="storefront-hero" aria-labelledby="storefront-title">
      <div class="storefront-scene" aria-hidden="true"></div>
      <div class="shell-width storefront-grid">
        <div class="storefront-copy">
          <p class="eyebrow">AUTHORIZED SOK ENERGY DEALER</p>
          <h1 id="storefront-title">Lithium Power<br><span>for RV, Solar &amp; Backup</span></h1>
          <p class="storefront-lead">Shop SOK lithium batteries and power systems for RV, solar, backup and off-grid use.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="/store?department=lithium-batteries">Explore Power Solutions <span aria-hidden="true">→</span></a>
            <a class="button button-outline" href="/start-a-project">Start a Project</a>
          </div>
          <nav class="usecase-grid" aria-label="Power solution shortcuts">
            <a href="/store?department=lithium-batteries">Lithium Batteries</a>
            <a href="/shop/sok">SOK Battery Systems</a>
            <a href="/store?department=rv-outdoor">RV &amp; Outdoor</a>
            <a href="/solar-project">Solar &amp; Off-Grid</a>
            <a href="/shop/sok">Backup Power</a>
          </nav>
        </div>
        <div class="storefront-visual" aria-label="SOK lithium battery systems">
          <img class="sok-wordmark" src="${asset('/assets/brands/sok/sok-wordmark-home-transparent.webp?v=20260910-1')}" alt="SOK Battery" width="620" height="190">
          <a class="hero-product hero-product-12" href="/sok/sk12v100pc/" aria-label="View SOK SK12V100PC">
            <img src="${asset('/assets/brands/sok/sk12v100pc/home-hero.webp?v=20260910-1')}" alt="SOK SK12V100PC 12.8V 100Ah LiFePO4 battery" width="900" height="900">
            <span><b>SK12V100PC</b><small>12.8V 100Ah</small></span>
          </a>
          <a class="hero-product hero-product-48" href="/sok/sk48v100n/" aria-label="View SOK SK48V100N">
            <img src="${asset('/assets/brands/sok/48v-battery-cabinet/hero.webp?v=20260910-1')}" alt="SOK 48V rack storage cabinet" width="500" height="500">
            <span><b>SK48V100N</b><small>51.2V 100Ah rack platform</small></span>
          </a>
        </div>
      </div>
    </section>

    <section class="trust-strip" aria-label="Elevation customer support highlights">
      <div class="trust-item"><strong>AUTHORIZED BATTERY SUPPLY</strong><span>SOK systems for RV, solar and storage.</span></div>
      <a class="trust-item" href="/shipping-logistics-services"><strong>HAWAII &amp; ALASKA</strong><span>Destination review for harder-to-serve markets.</span></a>
      <a class="trust-item" href="tel:+12088134998"><strong>SUPPORT</strong><span>Call Elevation: 208-813-4998</span></a>
    </section>

    <section class="section shell-width solutions-section" id="solutions">
      <div class="section-heading"><div><p class="eyebrow">SHOP BY SOLUTION</p><h2>Lithium Power <span>Solutions</span></h2></div><a class="text-link section-link" href="/store">View All Products <span aria-hidden="true">→</span></a></div>
      <div class="solution-grid">${solutionMarkup()}</div>
    </section>

    <section class="sok-feature">
      <div class="shell-width sok-feature-grid">
        <div class="sok-feature-copy"><p class="eyebrow">AUTHORIZED SOK ENERGY DEALER</p><h2>Featured SOK Systems</h2><p>SOK is Elevation’s primary authorized battery partner for mobile power, solar, backup and larger off-grid storage.</p><a class="button button-outline" href="/shop/sok">View SOK Catalog</a></div>
        <article class="product-card">
          <a href="/sok/sk12v100pc/" class="product-image" aria-label="View SOK SK12V100PC"><img src="${asset('/assets/brands/sok/sk12v100pc/home-hero.webp')}" alt="SOK SK12V100PC 12.8V 100Ah LiFePO4 battery" width="900" height="900"></a>
          <p class="product-kicker">12V • RV • MOBILE POWER</p><h3>SOK SK12V100PC</h3><p>12.8V · 100Ah · 1280Wh.</p>
          <div class="product-actions"><a class="button button-primary" href="/sok/sk12v100pc/">View Battery</a><a class="button button-outline" href="/shop/sok">Purchase Options</a></div>
        </article>
        <article class="product-card">
          <a href="/sok/sk48v100n/" class="product-image" aria-label="View SOK SK48V100N"><img src="${asset('/assets/brands/sok/48v-battery-cabinet/hero.webp')}" alt="SOK 48V rack storage cabinet" width="500" height="500"></a>
          <p class="product-kicker">48V • SOLAR • RACK STORAGE</p><h3>SOK SK48V100N</h3><p>51.2V · 100Ah · 5.12kWh.</p>
          <div class="product-actions"><a class="button button-primary" href="/sok/sk48v100n/">View Battery</a><a class="button button-outline" href="/shop/sok">Purchase Options</a></div>
        </article>
      </div>
    </section>

    <section class="logistics-section" id="logistics">
      <div class="shell-width logistics-grid">
        <div class="logistics-copy"><p class="eyebrow">FREIGHT &amp; SHIPPING LOGISTICS</p><h2>Battery Freight for Hawaii &amp; Alaska.</h2><p>Elevation coordinates the product, quantity, destination and supplier documentation needed to review the right path for lithium batteries and other harder-to-move power equipment.</p>
          <div class="logistics-path-inline" aria-label="Controlled logistics review path"><span><b>01</b> Product</span><span><b>02</b> Quantity</span><span><b>03</b> Destination</span><span><b>04</b> Tracking Info</span></div>
          <div class="logistics-actions"><a class="button button-primary" href="/hawaii-lithium-batteries">Hawaii Purchase Options</a><a class="button button-outline" href="/shipping-logistics-services#alaska">Alaska Logistics Review</a><a class="button button-outline" href="/shop/sok">Commercial &amp; Multi-Battery</a></div>
        </div>
        <div class="logistics-lanes">
          <article><small>01</small><h3>Lithium Battery Freight</h3><p>Freight support when a battery order does not fit ordinary parcel fulfillment.</p></article>
          <article><small>02</small><h3>Hawaii Logistics</h3><p>Exact-product, destination and quantity review through the current purchase-options path.</p></article>
          <article><small>03</small><h3>Alaska Logistics</h3><p>Product and destination confirmation before a shipping path is represented.</p></article>
          <article><small>04</small><h3>Commercial Supply</h3><p>Controlled review for multi-battery, rack storage and larger product-supply quantities.</p></article>
        </div>
      </div>
    </section>

    <section class="homepage-products section shell-width" aria-labelledby="current-products-title">
      <div class="section-heading"><div><p class="eyebrow">CURRENT PRODUCTS</p><h2 id="current-products-title">Power &amp; Outdoor <span>Products</span></h2></div><a class="text-link section-link" href="/store">Shop All <span aria-hidden="true">→</span></a></div>
      <div class="homepage-product-grid">${productGridMarkup()}</div>
    </section>

    <section class="home-commerce" aria-labelledby="home-commerce-title">
      <div class="shell-width">
        <div class="home-commerce-head"><p class="eyebrow">CURRENT PRODUCTS</p><h2 id="home-commerce-title">Shop the Store.</h2><p>Current lithium and RV &amp; Outdoor paths from the Elevation catalog.</p></div>
        <div class="home-commerce-group"><div class="home-commerce-group-head"><h3>Lithium Batteries</h3><div class="product-actions"><a class="button button-outline" href="/shop/sok">SOK Energy</a><a class="button button-outline" href="/store?department=lithium-batteries">Shop All Lithium</a></div></div><div class="store-category-row"><a href="/shop/sok" class="store-category-card store-category-sok"><span><small>AUTHORIZED SOK ENERGY DEALER</small><strong>SOK Battery Systems</strong><em>12V, 24V and 48V storage</em></span></a><a href="/store?department=lithium-batteries" class="store-category-card store-category-lithium"><span><small>LITHIUM ENERGY</small><strong>Lithium Batteries</strong><em>RV, solar, backup and off-grid</em></span></a></div></div>
        <div class="home-commerce-group"><div class="home-commerce-group-head"><h3>RV &amp; Outdoor</h3><a class="button button-outline" href="/store?department=rv-outdoor">Shop All RV &amp; Outdoor</a></div><div class="store-category-row"><a href="/store?department=rv-outdoor" class="store-category-card store-category-rv"><span><small>MOBILE &amp; OUTDOOR</small><strong>RV &amp; Outdoor</strong><em>Travel, camping and practical equipment</em></span></a><a href="/store" class="store-category-card store-category-gear"><span><small>FULL CATALOG</small><strong>Shop Elevation</strong><em>Browse current verified-source records</em></span></a></div></div>
      </div>
    </section>

    <section class="solar-builder-section section">
      <div class="shell-width solar-feature-band"><div class="solar-feature-media" role="img" aria-label="RV and off-grid solar power system"></div><div class="solar-feature-copy"><p class="eyebrow">SOLAR SYSTEM BUILDER</p><h2>Build Your Power System.</h2><p>Plan battery, solar and inverter needs in one place, then match the system to available Elevation products.</p><div class="hero-actions"><a class="button button-primary" href="/solar-project">Use Solar System Builder</a><a class="button button-outline" href="/shop/sok">Shop Battery Systems</a></div></div></div>
    </section>

    <section class="services-section section" aria-labelledby="services-title">
      <div class="shell-width"><div class="services-head"><p class="eyebrow">FIELD SERVICES</p><h2 id="services-title">Project &amp; Field Support.</h2><p>Repairs, power-system support and logistics when you need more than a product.</p></div><div class="support-grid">
        <article class="support-card"><small>HOME + RV</small><h3>Home &amp; RV Services</h3><p>Home repairs, restoration, RV repair, inspections and upgrades.</p><a href="/what-we-do#home-rv-services">Home &amp; RV Services →</a></article>
        <article class="support-card"><small>SOLAR + OFF-GRID</small><h3>Power System Services</h3><p>System planning, battery upgrades and troubleshooting.</p><a href="/solar-services">View Power Services →</a></article>
        <article class="support-card"><small>FREIGHT + SUPPLY</small><h3>Shipping &amp; Logistics</h3><p>Lithium freight, destination review and commercial product-supply coordination.</p><a href="/shipping-logistics-services">View Logistics Services →</a></article>
      </div><div class="marketplace-note"><span>Looking for local/community listings instead of Elevation catalog products?</span><a href="/marketplace">Visit Marketplace →</a></div></div>
    </section>`;
}

function startProjectMain() {
  return `<section class="simple-page shell-width"><p class="eyebrow">START A PROJECT</p><h1>Tell Elevation what you need to solve.</h1><p>For a new power, property, RV, solar, off-grid or logistics project, start with a direct conversation. Call or email Elevation with the goal, location and the best way to reach you.</p><div class="hero-actions"><a class="button button-primary" href="tel:+12088134998">Call 208-813-4998</a><a class="button button-outline" href="mailto:casey@elevationupscales.com?subject=Start%20a%20Project">Email Elevation</a></div></section>`;
}

function notFoundMain() {
  return `<section class="simple-page shell-width"><p class="eyebrow">404 • PAGE NOT FOUND</p><h1>We couldn’t find that page.</h1><p>The address may have changed or the page may no longer be available. Return home, start a project, or call Elevation for help finding the right path.</p><div class="hero-actions"><a class="button button-primary" href="/">Return Home</a><a class="button button-outline" href="/start-a-project">Start a Project</a><a class="text-link" href="tel:+12088134998">Call 208-813-4998 <span aria-hidden="true">→</span></a></div></section>`;
}

function document({ routeInfo, main, notFound = false }) {
  const currentPath = notFound ? '' : routeInfo.path;
  const bodyClass = routeInfo?.page === 'home' ? 'reference-storefront-home retail-home' : '';
  return `<!doctype html><html lang="en"><head>${documentHead(routeInfo, { notFound })}</head><body class="${bodyClass}">${headerMarkup(currentPath)}<main id="main">${main}</main>${footerMarkup()}</body></html>`;
}

export function renderPublicPage(routeInfo) {
  if (routeInfo.page === 'start-project') return document({ routeInfo, main: startProjectMain() });
  return document({ routeInfo, main: homeMain() });
}

export function renderNotFound() {
  return document({ routeInfo: { path: '/', title: 'Page Not Found | Elevation UpScales', description: 'The requested page could not be found.' }, main: notFoundMain(), notFound: true });
}
