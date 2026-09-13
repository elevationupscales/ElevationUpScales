import { CANONICAL_ORIGIN, FOOTER_NAV, PRIMARY_NAV, canonicalUrl } from './routes.js';

const LEGACY_ASSET_ORIGIN = 'https://elevationupscales.com';
const asset = (path) => `${LEGACY_ASSET_ORIGIN}${path}`;

const solutionCards = [
  ['Lithium Batteries', '12V lithium energy for RV and mobile systems.', '/store?department=lithium-batteries', 'Shop Batteries'],
  ['SOK Battery Systems', '12V, 24V and 48V systems from Elevation’s primary authorized battery partner.', '/shop/sok', 'Shop SOK'],
  ['Solar & Off-Grid', 'Build your energy independence around real power needs.', '/solar-project', 'Explore Solar'],
  ['Hawaii Power & Logistics', 'Battery freight matched to product and destination.', '/hawaii-lithium-batteries', 'Learn More'],
  ['RV & Outdoor', 'Current batteries and gear for the journey.', '/store?department=rv-outdoor', 'Shop RV & Outdoor'],
  ['Backup Power', 'Keep what matters running with dependable storage.', '/shop/sok', 'Shop Backup Power'],
  ['Commercial Power', 'Scalable supply, rack storage and larger-system support.', '/shop/sok', 'Shop Commercial']
];

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

function navMarkup(currentPath) {
  return PRIMARY_NAV.map((item) => {
    if (Array.isArray(item.children) && item.children.length) {
      const active = item.children.some(({ href }) => href === currentPath) ? ' data-active="true"' : '';
      const childLinks = item.children.map(({ label, href, description }) => `
        <a href="${href}">
          <strong>${label}</strong>
          ${description ? `<small>${description}</small>` : ''}
        </a>`).join('');
      return `
        <details class="nav-menu"${active}>
          <summary>${item.label}<span class="nav-caret" aria-hidden="true">⌄</span></summary>
          <div class="nav-dropdown">${childLinks}</div>
        </details>`;
    }

    const active = item.href === currentPath ? ' aria-current="page"' : '';
    return `<a class="nav-link" href="${item.href}"${active}>${item.label}</a>`;
  }).join('');
}

function footerLinksMarkup(currentPath) {
  return FOOTER_NAV.map(({ label, href }) => {
    const active = href === currentPath ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');
}

function solutionMarkup() {
  return solutionCards.map(([title, copy, href, label]) => `
    <article class="solution-card">
      <h3>${title}</h3>
      <p>${copy}</p>
      <a href="${href}" class="text-link">${label} <span aria-hidden="true">→</span></a>
    </article>
  `).join('');
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
      <span>OFF-GRID POWER • SUPPLY • LOGISTICS</span>
      <a href="/shipping-logistics-services">HAWAII &amp; ALASKA LOGISTICS REVIEW</a>
      <span>RV • SOLAR • BACKUP • COMMERCIAL</span>
      <span class="utility-contact"><a href="tel:+12088134998">208-813-4998</a><a href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a></span>
    </div>
  </div>
  <header class="site-header">
    <div class="shell-width nav-row">
      <a class="brand" href="/" aria-label="Elevation UpScales, Inc. home">
        <img src="${asset('/assets/brand/Elevation_UpScales_Inc_Blue_LithiumShop_FINAL_FONT.webp?v=20260910-1')}" alt="Elevation UpScales, Inc. — Off-Grid Power, Supply, Logistics" width="1024" height="341">
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
      <nav id="primary-nav" class="primary-nav" aria-label="Primary shopping navigation">
        ${navMarkup(currentPath)}
      </nav>
      <form class="header-search" role="search" action="/store" method="get">
        <label class="sr-only" for="site-search">Search products, systems, or solutions</label>
        <input id="site-search" name="q" type="search" autocomplete="off" placeholder="Search products, systems, or solutions…">
        <button type="submit" aria-label="Search">⌕</button>
      </form>
      <a class="button button-primary header-cta" href="/start-a-project">Start a Project</a>
    </div>
  </header>`;
}

function footerMarkup(currentPath) {
  return `
  <footer class="site-footer">
    <div class="shell-width footer-grid">
      <div class="footer-brand-block">
        <a class="brand footer-brand" href="/" aria-label="Elevation UpScales home">
          <img src="${asset('/assets/brand/Elevation_UpScales_Inc_Blue_LithiumShop_FINAL_FONT.webp?v=20260910-1')}" alt="Elevation UpScales, Inc." width="1024" height="341">
        </a>
        <p>RV Batteries • Lithium Energy • Supply • Logistics</p>
      </div>
      <nav class="footer-meta" aria-label="Footer navigation">
        ${footerLinksMarkup(currentPath)}
        <a href="tel:+12088134998">208-813-4998</a>
        <a href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a>
        <span>© <span data-current-year>2026</span> Elevation UpScales, Inc. · Colorado Springs, Colorado.</span>
      </nav>
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
          <h1 id="storefront-title">Lithium Power <span>for RV, Solar &amp; Backup</span></h1>
          <p class="storefront-lead">Elevation UpScales, Inc. is a lithium battery and energy retailer expanding a qualified vendor network for commercial freight and dropshipping. We aim to make dependable power products easier to buy and move, including streamlined fulfillment to Hawaii, Alaska, and select international markets where supplier, carrier, and compliance requirements support it.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="/store">Shop Power &amp; Energy <span aria-hidden="true">→</span></a>
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
            <img src="${asset('/assets/brands/sok/sk48v100n/home-crop.webp')}" alt="SOK SK48V100N rack battery" width="500" height="500">
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
      <div class="section-heading">
        <div>
          <p class="eyebrow">SHOP BY SOLUTION</p>
          <h2>Lithium Power <span>Solutions</span></h2>
        </div>
        <a class="text-link section-link" href="/store">View All Products <span aria-hidden="true">→</span></a>
      </div>
      <div class="solution-grid">${solutionMarkup()}</div>
    </section>

    <section class="sok-feature">
      <div class="shell-width sok-feature-grid">
        <div class="sok-feature-copy">
          <p class="eyebrow">AUTHORIZED SOK ENERGY DEALER</p>
          <h2>Featured SOK Systems</h2>
          <p>SOK is Elevation’s primary authorized battery partner for mobile power, solar, backup and larger off-grid storage.</p>
          <a class="button button-outline" href="/shop/sok">View All SOK Products <span aria-hidden="true">→</span></a>
        </div>
        <article class="product-card">
          <a href="/sok/sk12v100pc/" class="product-image"><img src="${asset('/assets/brands/sok/sk12v100pc/home-hero.webp')}" alt="SOK SK12V100PC 12.8V 100Ah LiFePO4 battery" width="900" height="900"></a>
          <p class="product-kicker">12V • RV • MOBILE POWER</p>
          <h3>SOK SK12V100PC</h3>
          <p>12.8V · 100Ah · 1280Wh.</p>
          <a class="text-link" href="/sok/sk12v100pc/">View Battery <span aria-hidden="true">→</span></a>
        </article>
        <article class="product-card">
          <a href="/sok/sk48v100n/" class="product-image"><img src="${asset('/assets/brands/sok/sk48v100n/home-crop.webp')}" alt="SOK SK48V100N rack battery" width="500" height="500"></a>
          <p class="product-kicker">48V • SOLAR • RACK STORAGE</p>
          <h3>SOK SK48V100N</h3>
          <p>51.2V · 100Ah · 5.12kWh.</p>
          <a class="text-link" href="/sok/sk48v100n/">View Battery <span aria-hidden="true">→</span></a>
        </article>
      </div>
    </section>

    <section class="logistics-section" id="logistics">
      <div class="shell-width logistics-grid">
        <div class="logistics-copy">
          <p class="eyebrow">FREIGHT &amp; SHIPPING LOGISTICS</p>
          <h2>Battery Freight for Hawaii &amp; Alaska.</h2>
          <p>Elevation coordinates the product, quantity, destination and supplier documentation needed to review the right path for lithium batteries and other harder-to-move power equipment.</p>
          <div class="logistics-actions">
            <a class="button button-primary" href="/hawaii-lithium-batteries">Hawaii Purchase Options</a>
            <a class="button button-outline" href="/shipping-logistics-services#alaska">Alaska Logistics Review</a>
          </div>
        </div>
        <div class="logistics-path" aria-label="Controlled logistics review path">
          <div><span>01</span><strong>Product</strong><small>Exact battery or power equipment.</small></div>
          <div><span>02</span><strong>Quantity</strong><small>Single, multi-battery or commercial.</small></div>
          <div><span>03</span><strong>Destination</strong><small>Hawaii, Alaska or other supported market.</small></div>
          <div><span>04</span><strong>Freight Review</strong><small>Carrier, documentation and route confirmation.</small></div>
        </div>
      </div>
    </section>

    <section class="project-section">
      <div class="shell-width project-grid">
        <div>
          <p class="eyebrow">PROJECT &amp; FIELD SUPPORT</p>
          <h2>Need more than a product?</h2>
          <p>Repairs, power-system support and logistics are available when the job needs planning, field work or a controlled shipping path.</p>
        </div>
        <div class="contact-card">
          <a class="button button-primary" href="/start-a-project">Start a Project</a>
          <a class="button button-outline" href="tel:+12088134998">Call 208-813-4998</a>
        </div>
      </div>
    </section>`;
}

function startProjectMain() {
  return `
    <section class="simple-page shell-width">
      <p class="eyebrow">START A PROJECT</p>
      <h1>Tell Elevation what you need to solve.</h1>
      <p>For a new power, property, RV, solar, off-grid or logistics project, start with a direct conversation. Call or email Elevation with the goal, location and the best way to reach you.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="tel:+12088134998">Call 208-813-4998</a>
        <a class="button button-outline" href="mailto:casey@elevationupscales.com?subject=Start%20a%20Project">Email Elevation</a>
      </div>
    </section>`;
}

function notFoundMain() {
  return `
    <section class="simple-page shell-width">
      <p class="eyebrow">404 • PAGE NOT FOUND</p>
      <h1>We couldn’t find that page.</h1>
      <p>The address may have changed or the page may no longer be available. Return home, start a project, or call Elevation for help finding the right path.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="/">Return Home</a>
        <a class="button button-outline" href="/start-a-project">Start a Project</a>
        <a class="text-link" href="tel:+12088134998">Call 208-813-4998 <span aria-hidden="true">→</span></a>
      </div>
    </section>`;
}

function document({ routeInfo, main, notFound = false }) {
  const currentPath = notFound ? '' : routeInfo.path;
  return `<!doctype html>
<html lang="en">
<head>${documentHead(routeInfo, { notFound })}
</head>
<body>
${headerMarkup(currentPath)}
<main id="main">${main}</main>
${footerMarkup(currentPath)}
</body>
</html>`;
}

export function renderPublicPage(routeInfo) {
  if (routeInfo.page === 'start-project') return document({ routeInfo, main: startProjectMain() });
  return document({ routeInfo, main: homeMain() });
}

export function renderNotFound() {
  return document({
    routeInfo: { path: '/', title: 'Page Not Found | Elevation UpScales', description: 'The requested page could not be found.' },
    main: notFoundMain(),
    notFound: true
  });
}
