import { FOOTER_NAV, PRIMARY_NAV, canonicalUrl } from './routes.js';
import { CATALOG_PRODUCTS, UNVERIFIED, VENDORS, getProductById, getProductsByVendor, getVendor, searchCatalog } from './catalog.js';

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

function flattenNav() {
  return PRIMARY_NAV.flatMap((item) => item.children || [item]);
}

function header(currentPath) {
  const links = flattenNav().map(({ label, href }) => {
    const active = href === currentPath ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${escapeHtml(label)}</a>`;
  }).join('');
  return `<div class="catalog-utility"><div class="catalog-shell">OFF-GRID POWER • SUPPLY • LOGISTICS <span>HAWAII LOGISTICS AVAILABLE</span><a href="tel:+12088134998">208-813-4998</a></div></div><header class="catalog-topnav"><div class="catalog-nav-inner"><a class="catalog-brand" href="/" aria-label="Elevation UpScales home"><img src="/assets/brand/elevation-wordmark.webp" alt="Elevation UpScales, Inc. — Off-Grid Power, Supply, Logistics"></a><nav aria-label="Primary retail navigation">${links}</nav><form class="catalog-search" action="/store" method="get"><label class="sr-only" for="catalog-search">Search catalog</label><input id="catalog-search" name="q" type="search" placeholder="Search products, systems, or solutions…"><button type="submit" aria-label="Search">⌕</button></form><a class="catalog-cart-link" href="/cart">Cart</a><a class="catalog-project-link" href="/start-a-project">Start a Project</a></div></header>`;
}

function footer() {
  const links = FOOTER_NAV.map(({ label, href }) => `<a href="${href}">${escapeHtml(label)}</a>`).join('');
  return `<footer class="catalog-footer"><div class="catalog-footer-brand"><img src="/assets/brand/elevation-wordmark.webp" alt="Elevation UpScales, Inc."><p>OFF-GRID POWER • SUPPLY • LOGISTICS</p></div><div class="catalog-nav-inner">${links}<span>© 2026 Elevation UpScales, Inc.</span></div></footer>`;
}

function head(routeInfo) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#07161c">
<meta name="description" content="${escapeHtml(routeInfo.description)}">
<link rel="canonical" href="${escapeHtml(canonicalUrl(routeInfo))}">
<title>${escapeHtml(routeInfo.title)}</title>
<link rel="stylesheet" href="/assets/app.css">
<script defer src="/assets/cart.js"></script>`;
}

function formatPrice(price) {
  if (!price || price === UNVERIFIED || typeof price.amount !== 'number') return 'Price verification pending';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: price.currency || 'USD' }).format(price.amount);
}

function missingLabel(field) {
  return ({
    specs: 'approved product specifications',
    media: 'approved product media',
    sellPrice: 'current sell price',
    priceFloor: 'current MAP / advertised-price floor',
    stockState: 'current supplier sellability',
    backorderState: 'authorized delayed-order state',
    shippingDisposition: 'shipping / freight disposition',
    warrantyReturnsOwnership: 'warranty / returns ownership',
    fulfillmentSource: 'fulfillment source',
    channelAuthorization: 'channel authorization'
  })[field] || field;
}

function card(product) {
  const state = product.orderable ? 'Orderable' : 'Verification hold — not currently orderable';
  const media = product.media && product.media !== UNVERIFIED
    ? `<img src="${escapeHtml(product.media)}" alt="${escapeHtml(product.title)}">`
    : '<div class="catalog-media-pending" role="img" aria-label="Product image pending verification"><span>PRODUCT IMAGE</span><strong>VERIFICATION PENDING</strong></div>';
  return `<article class="catalog-card" data-product-id="${escapeHtml(product.id)}">
    <a class="catalog-card-media" href="/product/${encodeURIComponent(product.id)}">${media}</a>
    <div class="catalog-card-body"><span class="vendor">${escapeHtml(product.vendorName)}</span><span class="sku">${escapeHtml(product.sku)}</span><h2>${escapeHtml(product.title)}</h2><div class="price">${escapeHtml(formatPrice(product.sellPrice))}</div><div class="status">${state}</div><a href="/product/${encodeURIComponent(product.id)}">View product details →</a></div>
  </article>`;
}

function vendorFilters(activeVendor = '') {
  const vendorLinks = VENDORS.map((vendor) => {
    const active = vendor.id === activeVendor ? ' aria-current="page"' : '';
    return `<a href="/shop/${vendor.id}"${active}>${escapeHtml(vendor.name)}</a>`;
  }).join('');
  return `<nav class="catalog-filter" aria-label="Vendor filters"><a href="/store"${activeVendor ? '' : ' aria-current="page"'}>All products</a>${vendorLinks}</nav>`;
}

function storeCategoryCards() {
  const cards = [
    ['SOK Batteries', '/shop/sok', '/assets/brands/sok/sk12v100pc/official-clean.png'],
    ['Solar Panels', '/shop/renogy', '/assets/hero/store-rv-solar-technician-clean.webp'],
    ['Inverters & Charging', '/shop/renogy', '/assets/hero/project-support.webp'],
    ['RV & Outdoor', '/store?department=rv-outdoor', '/assets/hero/store-rv-mountains.webp'],
    ['Accessories', '/store?q=accessories', '/assets/hero/hawaii-ocean-freight.webp'],
    ['Commercial', '/store?q=commercial', '/assets/hero/home-tropical.webp']
  ];
  return cards.map(([title, href, image]) => `<a class="store-category-card" href="${href}"><img class="store-category-image" src="${image}" alt="" loading="lazy" decoding="async"><span class="store-category-shade" aria-hidden="true"></span><strong>${title}</strong></a>`).join('');
}

function featuredProducts() {
  return CATALOG_PRODUCTS.slice(0, 6).map(card).join('');
}

function storeMain(url) {
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
}

function vendorMain(vendorId) {
  const vendor = getVendor(vendorId);
  if (!vendor) return null;
  const products = getProductsByVendor(vendor.id);
  const emptyCopy = vendor.id === 'sok'
    ? 'The selected SOK project source confirms the supplier relationship and operating controls, but it does not contain an exact SKU publication record for this catalog snapshot. No SOK checkout is enabled from incomplete source truth.'
    : 'No exact product records are cleared from the selected vendor source snapshot.';

  return `<main id="main" class="catalog-main"><div class="catalog-shell">
    <section class="catalog-hero">
      <p>VENDOR CATALOG</p>
      <h1>${escapeHtml(vendor.name)}</h1>
      <p>Only exact product records supported by the selected vendor-project source snapshot appear here. Missing required facts remain on hold rather than being inferred.</p>
    </section>
    ${vendorFilters(vendor.id)}
    <section class="catalog-grid" aria-label="${escapeHtml(vendor.name)} products">
      ${products.length ? products.map(card).join('') : `<div class="catalog-empty">${escapeHtml(emptyCopy)}</div>`}
    </section>
  </div></main>`;
}

function valueText(value) {
  if (value === UNVERIFIED || value === null || value === undefined) return 'Verification pending';
  if (typeof value === 'object') {
    if (value.summary) return value.summary;
    if (typeof value.amount === 'number') return formatPrice(value);
    if (value.policy) return `${value.policy.replaceAll('_', ' ')} — ${value.amount === UNVERIFIED ? 'amount verification pending' : value.amount}`;
    return Object.values(value).join(' · ');
  }
  return String(value).replaceAll('_', ' ');
}

function productMain(productId) {
  const product = getProductById(productId);
  if (!product) return null;
  const facts = [
    ['Vendor', product.vendorName],
    ['SKU', product.sku],
    ['Supplier identity', product.supplierSku || product.sku],
    ['Specifications', product.specs],
    ['Price', product.sellPrice],
    ['MAP / floor', product.priceFloor],
    ['Supplier sellability', product.stockState],
    ['Delayed-order state', product.backorderState],
    ['Shipping', product.shippingDisposition],
    ['Warranty / returns', product.warrantyReturnsOwnership],
    ['Fulfillment', product.fulfillmentSource],
    ['Authorized channel', product.channelAuthorization]
  ];

  return `<main id="main" class="catalog-main"><div class="catalog-shell">
    <a href="/shop/${product.vendorId}">← Back to ${escapeHtml(product.vendorName)}</a>
    <section class="catalog-detail">
      <article class="catalog-detail-card">
        <p class="vendor">${escapeHtml(product.vendorName)}</p>
        <p class="sku">${escapeHtml(product.sku)}</p>
        <h1>${escapeHtml(product.title)}</h1>
        <p class="catalog-price">${escapeHtml(formatPrice(product.sellPrice))}</p>
        ${product.orderable
          ? `<div><p class="status">Orderable through Elevation direct commerce.</p><button class="button button-primary" type="button" data-add-to-cart="${escapeHtml(product.id)}">Add to Cart</button></div>`
          : `<div class="catalog-hold"><strong>Verification hold — checkout disabled.</strong><p>This product remains non-orderable until all required source facts are verified.</p><ul>${product.missingFacts.map((field) => `<li>${escapeHtml(missingLabel(field))}</li>`).join('')}</ul></div>`}
      </article>
      <aside class="catalog-facts"><h2>Product verification</h2><dl>
        ${facts.map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(valueText(value))}</dd>`).join('')}
      </dl></aside>
    </section>
  </div></main>`;
}

export function renderCatalogPage(routeInfo, url) {
  let main = null;
  if (routeInfo.page === 'store') main = storeMain(url);
  if (routeInfo.page === 'vendor') main = vendorMain(routeInfo.vendor);
  if (routeInfo.page === 'product') main = productMain(routeInfo.productId);
  if (!main) return null;

  const currentPath = routeInfo.page === 'vendor' ? `/shop/${routeInfo.vendor}` : routeInfo.path;
  return `<!doctype html><html lang="en"><head>${head(routeInfo)}</head><body>${header(currentPath)}${main}${footer()}</body></html>`;
}
