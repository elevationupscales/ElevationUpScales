import { CANONICAL_ORIGIN, PRIMARY_NAV, canonicalUrl } from './routes.js';

const LEGACY_ASSET_ORIGIN = 'https://elevationupscales.com';
const asset = (path) => `${LEGACY_ASSET_ORIGIN}${path}`;
const BRAND_WORDMARK = asset('/assets/brand/Elevation_UpScales_Inc_Blue_LithiumShop_FINAL_FONT.webp?v=20260910-1');

const solutionCards = [
  ['Lithium Batteries', '12V lithium energy for RV and mobile systems.', '/store?department=lithium-batteries', 'Shop Batteries'],
  ['SOK Battery Systems', '12V, 24V & 48V systems.', '/shop/sok', 'Shop SOK'],
  ['Solar & Off-Grid', 'Build your energy independence.', '/solar-project', 'Shop Solar'],
  ['Hawaii Power & Logistics', 'Battery freight matched to product and destination.', '/hawaii-lithium-batteries', 'Learn More'],
  ['RV & Outdoor', 'Current batteries and gear for the journey.', '/store?department=rv-outdoor', 'Shop RV & Outdoor'],
  ['Backup Power', 'Keep what matters running.', '/shop/sok', 'Shop Backup Power'],
  ['Commercial Power', 'Scalable power solutions.', '/shop/sok', 'Shop Commercial']
];

const lithiumProducts = [
  {
    title: '100Ah LiFePO4 Battery', spec: '1280Wh', image: asset('/assets/brands/sok/sk12v100pc/hero.png'),
    detailHref: '/sok/sk12v100pc/', catalogHref: '/shop/sok', alt: 'SOK SK12V100PC 100Ah LiFePO4 battery'
  },
  {
    title: '100Ah LiFePO4 Battery', spec: '5120Wh', image: asset('/assets/brands/sok/sk48v100n/hero.jpg'),
    detailHref: '/sok/sk48v100n/', catalogHref: '/shop/sok', alt: 'SOK SK48V100N 100Ah LiFePO4 battery'
  },
  {
    title: '12V 100Ah LiFePO4 Battery', spec: '1280Wh · 100A BMS', image: 'https://image.doba.com/dg-PAqmVRKWNJYH/d0102x39tjv.jpg',
    detailHref: '/store?q=12V%20100Ah%20LiFePO4%20Battery', catalogHref: '/store?q=12V%20100Ah%20LiFePO4%20Battery', alt: '12V 100Ah LiFePO4 battery'
  },
  {
    title: '12V 100Ah Battery', spec: 'For solar & off-grid storage', image: 'https://image.doba.com/dg-IiqrDjeSMcJQ/d0102x33ppw.jpg',
    detailHref: '/store?q=12V%20100Ah%20Battery', catalogHref: '/store?q=12V%20100Ah%20Battery', alt: '12V 100Ah battery for solar and off-grid storage'
  },
  {
    title: 'Portable Solar Power Bank — 10000mAh', spec: 'For solar & off-grid storage', image: 'https://image.doba.com/dg-atDvVcHCbYoq/d01027h729u.jpg',
    detailHref: '/store?q=Portable%20Solar%20Power%20Bank', catalogHref: '/store?q=Portable%20Solar%20Power%20Bank', alt: 'Portable solar power bank'
  },
  {
    title: '12V 100AH LiFePO4 Battery', spec: 'For RV & mobile power', image: 'https://image.doba.com/dg-NcbPvsCQYJok/d01027hh5xy.jpg',
    detailHref: '/store?q=12V%20100AH%20LiFePO4%20Battery', catalogHref: '/store?q=12V%20100AH%20LiFePO4%20Battery', alt: '12V 100Ah LiFePO4 battery for RV and mobile power'
  }
];

const rvProducts = [
  {
    title: 'Rechargeable 200,000 Lumens LED Spotlight', spec: 'For Outdoor Use', image: 'https://img.vevorstatic.com/us/DGYWSJGDXDTKA7G1TV9/goods_img_big-v1/rechargeable-spotlight-m100-1.2.jpg?format=webp&timestamp=1731314531000',
    detailHref: '/store?q=Rechargeable%20200%2C000%20Lumens%20LED%20Spotlight', catalogHref: '/store?department=rv-outdoor', alt: 'Rechargeable LED spotlight'
  },
  {
    title: '8L Hot Water Heater Tankless Instant Boiler Outdoor', spec: 'RV Essentials & Water', image: 'https://utedusjer.no/cdn/shop/products/8liter-min.jpg?v=1654023433&width=1024',
    detailHref: '/store?q=8L%20Hot%20Water%20Heater%20Tankless%20Instant%20Boiler%20Outdoor', catalogHref: '/store?department=rv-outdoor', alt: '8L outdoor tankless hot water heater'
  },
  {
    title: "Portable Walk-In Greenhouse 20' x 10' Hot House with Steel Hoops & Windows", spec: 'Camping & Shelter', image: 'https://image.vevor.com/us/YDSDWS20107FTYBYXV0/original_img-v3/tunnel-greenhouse-m100-1.1.jpg?timestamp=1670940797747',
    detailHref: '/store?q=Portable%20Walk-In%20Greenhouse', catalogHref: '/store?department=rv-outdoor', alt: 'Portable walk-in greenhouse'
  },
  {
    title: '12V Electric Scissor Car Jack & Impact Wrench', spec: 'For Easy Tire Changes', image: 'https://s.alicdn.com/@sc04/kf/H90a98af76a91418698eb173453b5254e8/Factory-Price-Tool-Car-12-Volt-2T-35CM-Scissor-Jack-Electric-Wrench-Suit-with-Hydraulic-Repair-Kit-for-Suv.jpg',
    detailHref: '/store?q=12V%20Electric%20Scissor%20Car%20Jack', catalogHref: '/store?department=rv-outdoor', alt: '12V electric scissor car jack and impact wrench kit'
  },
  {
    title: '12V Water Diaphragm Pump - 5.5 GPM & 70 PSI Adjustable', spec: 'Solar & Off-Grid', image: 'https://i5.walmartimages.com/seo/12V-DC-Water-Diaphragm-Pump-5-5-GPM-Flow-70-PSI-Adjustable-Pressure-1-2-Inch-MNPT-Self-Priming-Sprayer-Pump-Pressure-Switch-RV-Camper-Marine-Boat-Law_40f43dd1-549d-4fdc-8f7d-09eb9ce7335e.284e7e762ebd053ff57d3a6a81651e3b.jpeg',
    detailHref: '/store?q=12V%20Water%20Diaphragm%20Pump', catalogHref: '/store?department=rv-outdoor', alt: '12V water diaphragm pump'
  },
  {
    title: 'Heavy-Duty 5.3 Gallon Metal Fuel Can with Spout & Comfort Handle', spec: 'Automotive, ATV & Towing', image: 'https://mobileimages.lowes.com/productimages/a4c0c39c-7115-4e98-9513-904d908abebf/63612904.jpg',
    detailHref: '/store?q=Heavy-Duty%205.3%20Gallon%20Metal%20Fuel%20Can', catalogHref: '/store?department=rv-outdoor', alt: 'Heavy-duty metal fuel can'
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

function commerceProductMarkup(products) {
  return products.map(({ title, spec, image, detailHref, catalogHref, alt }) => `
    <article class="home-product-card">
      <a class="home-product-card__image" href="${detailHref}" aria-label="View ${escapeHtml(title)}">
        <img src="${image}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      </a>
      <div class="home-product-card__body">
        <h4><a href="${detailHref}">${escapeHtml(title)}</a></h4>
        <p>${escapeHtml(spec)}</p>
        <div class="home-product-card__authority-slot" aria-hidden="true"></div>
        <div class="home-product-card__actions">
          <a class="button button-primary" href="${catalogHref}">Catalog Options</a>
          <a class="button button-outline" href="${detailHref}">View Details</a>
        </div>
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
  <link rel="preload" as="image" href="${BRAND_WORDMARK}">
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
      <span class="utility-applications">RV • SOLAR • BACKUP • COMMERCIAL</span>
      <span class="utility-contact"><a href="tel:+12088134998">208-813-4998</a><a href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a></span>
    </div>
  </div>
  <header class="site-header">
    <div class="shell-width nav-row">
      <a class="brand" href="/" aria-label="Elevation UpScales, Inc. home">
        <img src="${BRAND_WORDMARK}" alt="Elevation UpScales, Inc. — Off-Grid Power, Supply, Logistics" width="1024" height="341">
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
        <img src="${BRAND_WORDMARK}" alt="Elevation UpScales, Inc." width="1024" height="341">
        <div><strong>ELEVATION UPSCALES, INC.</strong><p>RV Batteries • Lithium Energy • Supply • Logistics</p><span>Colorado corporation • Colorado sales-tax licensed</span></div>
      </div>
      <nav class="footer-link-group" aria-label="Power and shopping"><strong>POWER &amp; SHOP</strong>
        <a href="/store?department=lithium-batteries">Lithium Batteries</a>
        <a href="/shop/sok">SOK Battery Systems</a>
        <a href="/store?department=rv-outdoor">RV &amp; Outdoor</a>
        <a href="/shipping-logistics-services">Freight &amp; Logistics</a>
        <a href="/marketplace">Marketplace</a>
      </nav>
      <nav class="footer-link-group" aria-label="Company and legal"><strong>COMPANY &amp; LEGAL</strong>
        <a href="/what-we-do">What We Do</a>
        <a href="/work-with-us">Work With Us</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms &amp; Business Disclosures</a>
        <a href="/report-an-issue">Report an Issue</a>
      </nav>
      <div class="footer-contact"><strong>CONTACT</strong><a href="tel:+12088134998">208-813-4998</a><a href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a><a class="button button-outline" href="/start-a-project">Start a Project</a></div>
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
            <img src="${asset('/assets/brands/sok/sk48v100n/home-crop.webp')}" alt="SOK SK48V100N rack battery" width="1000" height="265">
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

    <section class="section shell-width solutions-section" id="solutions" aria-labelledby="solutions-title">
      <div class="section-heading"><div><p class="eyebrow">SHOP BY SOLUTION</p><h2 id="solutions-title">Lithium Power <span>Solutions</span></h2></div><a class="text-link section-link" href="/store">View All Products <span aria-hidden="true">→</span></a></div>
      <div class="solution-grid">${solutionMarkup()}</div>
    </section>

    <section class="sok-feature" aria-labelledby="sok-feature-title">
      <div class="shell-width">
        <div class="sok-feature-head"><div><h2 id="sok-feature-title">FEATURED SOK SYSTEMS</h2><p class="eyebrow">AUTHORIZED SOK ENERGY DEALER</p><p>SOK is Elevation’s primary authorized battery partner for mobile power, solar, backup and larger off-grid storage.</p></div><a class="button button-outline" href="/shop/sok">View All SOK Products <span aria-hidden="true">→</span></a></div>
        <div class="sok-products-grid">
          <article class="product-card product-card-horizontal">
            <a href="/sok/sk12v100pc/" class="product-image" aria-label="View SOK SK12V100PC"><img src="${asset('/assets/brands/sok/sk12v100pc/home-hero.webp')}" alt="SOK SK12V100PC 12.8V 100Ah LiFePO4 battery" width="900" height="900"></a>
            <div class="product-card-copy"><p class="product-kicker">12V • RV • MOBILE POWER</p><h3>SOK SK12V100PC</h3><p>12.8V · 100Ah · 1280Wh.</p>
              <div class="product-actions"><a class="button button-primary" href="/sok/sk12v100pc/">View Battery</a><a class="button button-outline" href="/shop/sok">Purchase Options</a></div>
            </div>
          </article>
          <article class="product-card product-card-horizontal">
            <a href="/sok/sk48v100n/" class="product-image" aria-label="View SOK SK48V100N"><img src="${asset('/assets/brands/sok/sk48v100n/home-crop.webp')}" alt="SOK SK48V100N rack battery" width="1000" height="265"></a>
            <div class="product-card-copy"><p class="product-kicker">48V • SOLAR • RACK STORAGE</p><h3>SOK SK48V100N</h3><p>51.2V · 100Ah · 5.12kWh.</p>
              <div class="product-actions"><a class="button button-primary" href="/sok/sk48v100n/">View Battery</a><a class="button button-outline" href="/shop/sok">Purchase Options</a></div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="logistics-section" id="logistics" aria-labelledby="logistics-title">
      <div class="shell-width logistics-grid">
        <div class="logistics-copy"><p class="eyebrow">FREIGHT &amp; SHIPPING LOGISTICS</p><h2 id="logistics-title">BATTERY FREIGHT FOR HAWAII &amp; ALASKA.</h2><p>Elevation coordinates the product, quantity, destination and supplier documentation needed to review the right path for lithium batteries and other harder-to-move power equipment.</p>
          <div class="logistics-path-inline" aria-label="Controlled logistics review path"><span><b>01</b> Product</span><span><b>02</b> Quantity</span><span><b>03</b> Destination</span><span><b>04</b> Freight Review<small>Tracking Info</small></span></div>
          <div class="logistics-actions"><a class="button button-primary" href="/hawaii-lithium-batteries">Hawaii Purchase Options</a><a class="button button-outline" href="/shipping-logistics-services#alaska">Alaska Logistics Review</a><a class="button button-outline" href="/shop/sok">Commercial &amp; Multi-Battery</a></div>
        </div>
        <div class="logistics-lanes">
          <article><small>01</small><h3>LITHIUM BATTERY FREIGHT</h3><p>Freight support when a battery order does not fit ordinary parcel fulfillment.</p></article>
          <article><small>02</small><h3>HAWAII LOGISTICS</h3><p>Exact-product, destination and quantity review through the current Purchase Options path.</p></article>
          <article><small>03</small><h3>ALASKA LOGISTICS</h3><p>Product and destination confirmation before a shipping path is represented.</p></article>
          <article><small>04</small><h3>COMMERCIAL SUPPLY</h3><p>Controlled review for 4+ batteries, rack storage and larger product-supply quantities.</p></article>
        </div>
      </div>
    </section>

    <section class="home-commerce" aria-labelledby="home-commerce-title">
      <div class="shell-width">
        <div class="home-commerce-head"><p class="eyebrow">CURRENT PRODUCTS</p><h2 id="home-commerce-title">SHOP THE STORE.</h2><p>Current lithium and RV &amp; Outdoor products from the live Elevation catalog.</p></div>
        <div class="home-commerce-group">
          <div class="home-commerce-group-head"><h3>LITHIUM BATTERIES</h3><div class="product-actions"><a class="button button-outline" href="/shop/sok">SOK ENERGY</a><a class="button button-outline" href="/store?department=lithium-batteries">SHOP ALL LITHIUM</a></div></div>
          <div class="home-product-grid">${commerceProductMarkup(lithiumProducts)}</div>
        </div>
        <div class="home-commerce-group">
          <div class="home-commerce-group-head"><h3>RV &amp; OUTDOOR</h3><a class="button button-outline" href="/store?department=rv-outdoor">SHOP ALL RV &amp; OUTDOOR</a></div>
          <div class="home-product-grid">${commerceProductMarkup(rvProducts)}</div>
        </div>
      </div>
    </section>

    <section class="solar-builder-section section" aria-labelledby="solar-builder-title">
      <div class="shell-width solar-feature-band"><div class="solar-feature-media" role="img" aria-label="RV and off-grid solar power system"></div><div class="solar-feature-copy"><p class="eyebrow">SOLAR SYSTEM BUILDER</p><h2 id="solar-builder-title">BUILD YOUR POWER SYSTEM.</h2><p>Plan battery, solar and inverter needs in one place, then match the system to available Elevation products.</p><div class="hero-actions"><a class="button button-primary" href="/solar-project">USE SOLAR SYSTEM BUILDER</a><a class="button button-outline" href="/shop/sok">SHOP BATTERY SYSTEMS</a></div></div></div>
    </section>

    <section class="services-section section" aria-labelledby="services-title">
      <div class="shell-width"><div class="services-head"><p class="eyebrow">FIELD SERVICES</p><h2 id="services-title">PROJECT &amp; FIELD SUPPORT.</h2><p>Repairs, power-system support and logistics when you need more than a product.</p></div><div class="support-grid">
        <article class="support-card"><small>HOME + RV</small><h3>HOME &amp; RV SERVICES</h3><p>Home repairs, restoration, RV repair, inspections and upgrades.</p><a href="/what-we-do#home-rv-services">Home &amp; RV Services →</a></article>
        <article class="support-card"><small>SOLAR + OFF-GRID</small><h3>POWER SYSTEM SERVICES</h3><p>System planning, battery upgrades and troubleshooting.</p><a href="/solar-services">View Power Services →</a></article>
        <article class="support-card"><small>FREIGHT + SUPPLY</small><h3>SHIPPING &amp; LOGISTICS</h3><p>Lithium freight, destination review and commercial product-supply coordination.</p><a href="/shipping-logistics-services">View Logistics Services →</a></article>
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
