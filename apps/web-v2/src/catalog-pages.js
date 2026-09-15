import { FOOTER_NAV, PRIMARY_NAV, canonicalUrl } from './routes.js';
import { semanticIcon } from './semantic-icons.js';
import { CATALOG_PRODUCTS, UNVERIFIED, VENDORS, getProductById, getProductsByVendor, getVendor, searchCatalog } from './catalog.js';

const SUPPORT_EMAIL = 'casey@elevationupscales.com';

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
  if (!price || price === UNVERIFIED || typeof price.amount !== 'number') return null;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: price.currency || 'USD' }).format(price.amount);
}

function productPrice(product) {
  return formatPrice(product.sellPrice) || 'Contact us for current price';
}

function customerAvailability(product) {
  if (product.orderable) return 'Available to order';
  if (product.stockState === 'PREORDER_AUTHORIZED' || product.backorderState === 'PREORDER_AUTHORIZED') return 'Preorder available';
  if (product.stockState === 'BACKORDER_AUTHORIZED' || product.backorderState === 'BACKORDER_AUTHORIZED') return 'Backorder available';
  return 'Contact us for availability';
}

function customerShipping(product) {
  const value = String(product.shippingDisposition || '');
  if (!value || value === UNVERIFIED) return 'Shipping confirmed before payment';
  if (/HAWAII/i.test(value)) return 'Hawaii shipping available for this item';
  if (/LOWER_48/i.test(value)) return 'Ships within the contiguous U.S.';
  if (/US_WAREHOUSE|DROPSHIP|VERIFIED_ROUTE/i.test(value)) return 'Supplier-direct shipping available';
  return 'Shipping confirmed before payment';
}

function customerWarranty(product) {
  const value = String(product.warrantyReturnsOwnership || '');
  if (!value || value === UNVERIFIED) return 'Elevation support available';
  if (/RENOGY/i.test(value)) return 'Elevation support with Renogy warranty routing';
  if (/SOK/i.test(value)) return 'Elevation support with SOK warranty routing';
  return 'Elevation support available';
}

function supportHref(product, prefix = 'Product question') {
  const subject = encodeURIComponent(`${prefix}: ${product.vendorName} ${product.sku}`);
  const body = encodeURIComponent(`Hi Elevation UpScales,\n\nI'm interested in this item:\n${product.vendorName} ${product.sku}\n${product.title}\n\nPlease send current availability and purchasing options.\n`);
  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

function card(product) {
  const price = productPrice(product);
  const state = customerAvailability(product);
  const media = product.media && product.media !== UNVERIFIED
    ? `<img src="${escapeHtml(product.media)}" alt="${escapeHtml(product.title)}">`
    : '<div class="catalog-media-pending" role="img" aria-label="Product image coming soon"><span>PRODUCT IMAGE</span><strong>COMING SOON</strong></div>';
  return `<article class="catalog-card" data-product-id="${escapeHtml(product.id)}">
    <a class="catalog-card-media" href="/product/${encodeURIComponent(product.id)}">${media}</a>
    <div class="catalog-card-body"><span class="vendor">${escapeHtml(product.vendorName)}</span><span class="sku">${escapeHtml(product.sku)}</span><h2>${escapeHtml(product.title)}</h2><div class="price">${escapeHtml(price)}</div><div class="status">${escapeHtml(state)}</div><a href="/product/${encodeURIComponent(product.id)}">View product →</a></div>
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
    { title: 'SOK Batteries', href: '/shop/sok', image: '/assets/brands/sok/sk12v100pc/official-clean.png' },
    { title: 'Solar Panels', href: '/shop/renogy', image: '/assets/hero/store-rv-solar-technician-clean.webp' },
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

function featuredProducts() {
  const prioritized = [...CATALOG_PRODUCTS].sort((left, right) => Number(right.orderable) - Number(left.orderable));
  return prioritized.slice(0, 6).map(card).join('');
}

function vendorCatalogSections(products) {
  return VENDORS.map((vendor) => {
    const vendorProducts = products.filter((product) => product.vendorId === vendor.id);
    if (!vendorProducts.length) return '';
    return `<section class="vendor-catalog-section" aria-labelledby="vendor-${vendor.id}-title">
      <div class="store-section-heading"><div><p>SHOP BY VENDOR</p><h2 id="vendor-${vendor.id}-title">${escapeHtml(vendor.name)}</h2></div><a href="/shop/${vendor.id}">View ${escapeHtml(vendor.name)} →</a></div>
      <div class="catalog-grid">${vendorProducts.map(card).join('')}</div>
    </section>`;
  }).join('');
}

function storeMain(url) {
  const query = url.searchParams.get('q') || '';
  const vendorParam = url.searchParams.get('vendor') || '';
  let products = searchCatalog(query);
  if (vendorParam && getVendor(vendorParam)) products = products.filter(({ vendorId }) => vendorId === vendorParam.toLowerCase());

  return `<main id="main" class="catalog-main store-main">
    <section class="store-hero" aria-labelledby="store-title"><div class="store-hero-overlay"></div><div class="catalog-shell store-hero-content"><p class="store-eyebrow">AUTHORIZED OFF-GRID POWER &amp; RV SUPPLY</p><h1 id="store-title">Power Your RV.<br>Build Your Off-Grid System.<br><span>Buy With Confidence.</span></h1><p>Lithium batteries, solar, charging and RV equipment from trusted manufacturers — backed by real product and project support from Elevation UpScales.</p><div class="store-hero-actions"><a class="store-primary" href="/shop/sok">SHOP POWER &amp; ENERGY →</a><a class="store-secondary" href="/start-a-project">Start a Project</a></div></div></section>
    <section class="store-trust" aria-label="Store trust highlights"><div><strong>✓</strong><span><b>Authorized Dealer</b><small>Approved supplier relationships</small></span></div><div><strong>▤</strong><span><b>Shipping Support</b><small>Simple help when a special route is needed</small></span></div><div><strong>◉</strong><span><b>Real Support</b><small>208-813-4998</small></span></div><div><strong>★</strong><span><b>Vendor Catalog</b><small>Current products organized by supplier</small></span></div></section>
    <div class="catalog-shell store-content">
      <section class="store-shopby" aria-labelledby="store-shop-title"><div class="store-section-heading"><h2 id="store-shop-title">Shop the <span>Store</span></h2><a href="/store">View All Products →</a></div><div class="store-category-grid">${storeCategoryCards()}</div></section>
      <section class="store-featured" aria-labelledby="featured-title"><div class="store-section-heading"><div><p>CURRENT VENDOR CATALOG</p><h2 id="featured-title">Featured Products</h2></div></div><div class="catalog-grid catalog-featured-grid">${featuredProducts()}</div></section>
      <section class="dealer-trust" aria-label="Approved dealer relationships"><p>AUTHORIZED &amp; APPROVED BRAND RELATIONSHIPS</p><div><strong>SOK BATTERY</strong><strong>RENOGY</strong><strong>VEVOR</strong><strong>WINEGARD</strong></div></section>
      <section class="full-catalog" aria-labelledby="catalog-title"><div class="store-section-heading"><div><p>ONE CATALOG • ORGANIZED BY VENDOR</p><h2 id="catalog-title">Find the right product.</h2></div></div>${vendorFilters(vendorParam)}${query ? `<p>Search results for <strong>${escapeHtml(query)}</strong></p>` : ''}${products.length ? vendorCatalogSections(products) : '<div class="catalog-empty">No products match this search. <a href="mailto:casey@elevationupscales.com">Email us and we’ll help find the right item.</a></div>'}</section>
    </div>
  </main>`;
}

function vendorMain(vendorId) {
  const vendor = getVendor(vendorId);
  if (!vendor) return null;
  const products = getProductsByVendor(vendor.id);
  const emptyCopy = `We're adding current ${vendor.name} products from our approved vendor catalog. Email us for current availability or a specific model.`;

  return `<main id="main" class="catalog-main"><div class="catalog-shell">
    <section class="catalog-hero">
      <p>SHOP BY VENDOR</p>
      <h1>${escapeHtml(vendor.name)}</h1>
      <p>Shop current ${escapeHtml(vendor.name)} products available through Elevation UpScales. Need a model you don't see yet? Contact us and we'll check the current vendor catalog.</p>
    </section>
    ${vendorFilters(vendor.id)}
    <section class="catalog-grid" aria-label="${escapeHtml(vendor.name)} products">
      ${products.length ? products.map(card).join('') : `<div class="catalog-empty"><p>${escapeHtml(emptyCopy)}</p><a href="mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`${vendor.name} product request`)}">Email us about a ${escapeHtml(vendor.name)} item →</a></div>`}
    </section>
  </div></main>`;
}

function specsText(value) {
  if (!value || value === UNVERIFIED) return 'Details available on request';
  if (typeof value === 'object' && value.summary) return value.summary;
  if (typeof value === 'string') return value.replaceAll('_', ' ');
  return 'Details available on request';
}

function productMain(productId) {
  const product = getProductById(productId);
  if (!product) return null;
  const price = productPrice(product);
  const availability = customerAvailability(product);
  const shipping = customerShipping(product);
  const warranty = customerWarranty(product);

  return `<main id="main" class="catalog-main"><div class="catalog-shell">
    <a href="/shop/${product.vendorId}">← Back to ${escapeHtml(product.vendorName)}</a>
    <section class="catalog-detail">
      <article class="catalog-detail-card">
        <p class="vendor">${escapeHtml(product.vendorName)}</p>
        <p class="sku">${escapeHtml(product.sku)}</p>
        <h1>${escapeHtml(product.title)}</h1>
        <p class="catalog-price">${escapeHtml(price)}</p>
        <p class="status">${escapeHtml(availability)}</p>
        ${product.orderable
          ? `<div><button class="button button-primary" type="button" data-add-to-cart="${escapeHtml(product.id)}">Add to Cart</button></div>`
          : `<div class="catalog-hold"><strong>Need this item?</strong><p>Contact Elevation for current availability and purchasing options.</p><a class="button button-primary" href="${supportHref(product)}">Email us about this item</a></div>`}
        <p><a href="${supportHref(product, 'Hawaii shipping question')}">Hawaii or special shipping? Email us about this item →</a></p>
      </article>
      <aside class="catalog-facts"><h2>Product details</h2><dl>
        <dt>Brand</dt><dd>${escapeHtml(product.vendorName)}</dd>
        <dt>Model / SKU</dt><dd>${escapeHtml(product.sku)}</dd>
        <dt>Key details</dt><dd>${escapeHtml(specsText(product.specs))}</dd>
        <dt>Availability</dt><dd>${escapeHtml(availability)}</dd>
        <dt>Shipping</dt><dd>${escapeHtml(shipping)}</dd>
        <dt>Support</dt><dd>${escapeHtml(warranty)}</dd>
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
