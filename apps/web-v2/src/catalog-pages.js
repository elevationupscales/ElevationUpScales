import { FOOTER_NAV, canonicalUrl } from './routes.js';
import { semanticIcon } from './semantic-icons.js';
import { CATALOG_PRODUCTS, UNVERIFIED, VENDORS, getProductById, getProductsByVendor, getVendor, searchCatalog } from './catalog.js';

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const RETAIL_NAV = Object.freeze([
  { label: 'Shop', href: '/store' },
  { label: 'SOK', href: '/shop/sok' },
  { label: 'Renogy', href: '/shop/renogy' },
  { label: 'VEVOR', href: '/shop/vevor' },
  { label: 'SunGoldPower', href: '/shop/sungoldpower' }
]);

function header(currentPath) {
  const links = RETAIL_NAV.map(({ label, href }) => {
    const active = href === currentPath ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${escapeHtml(label)}</a>`;
  }).join('');
  return `<div class="catalog-utility"><div class="catalog-shell">OFF-GRID POWER • SUPPLY • LOGISTICS <a href="tel:+12088134998">208-813-4998</a></div></div><header class="catalog-topnav"><div class="catalog-nav-inner"><a class="catalog-brand" href="/" aria-label="Elevation UpScales home"><img src="/assets/brand/elevation-wordmark.webp" alt="Elevation UpScales, Inc. — Off-Grid Power, Supply, Logistics"></a><nav aria-label="Primary retail navigation">${links}</nav><form class="catalog-search" action="/store" method="get"><label class="sr-only" for="catalog-search">Search catalog</label><input id="catalog-search" name="q" type="search" placeholder="Search products…"><button type="submit" aria-label="Search">⌕</button></form><a class="catalog-cart-link" href="/cart">Cart</a><a class="catalog-project-link" href="/start-a-project">Start a Project</a></div></header>`;
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
  if (!price || price === UNVERIFIED || typeof price.amount !== 'number') return 'Contact us for pricing';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: price.currency || 'USD' }).format(price.amount);
}

function productSummary(product) {
  if (product?.specs && product.specs !== UNVERIFIED && typeof product.specs === 'object' && product.specs.summary) return product.specs.summary;
  if (typeof product?.specs === 'string' && product.specs !== UNVERIFIED) return product.specs;
  return 'Product details available from Elevation UpScales.';
}

function lower48Shipping(product) {
  return ['LOWER_48_SUPPLIER_SHIPPING_VERIFIED', 'LOWER_48_VERIFIED', 'CONTIGUOUS_US_VERIFIED'].includes(product?.shippingDisposition);
}

function hawaiiMailto(product) {
  const subject = encodeURIComponent(`Hawaii shipping request — ${product.vendorName} ${product.sku}`);
  const body = encodeURIComponent(`I'm interested in Hawaii shipping for:\n\n${product.title}\nSKU: ${product.sku}\nQuantity: 1\n\nPlease contact me with shipping options.`);
  return `mailto:casey@elevationupscales.com?subject=${subject}&body=${body}`;
}

function card(product) {
  const media = product.media && product.media !== UNVERIFIED
    ? `<img src="${escapeHtml(product.media)}" alt="${escapeHtml(product.title)}">`
    : '<div class="catalog-media-pending" role="img" aria-label="Product image coming soon"><span>PRODUCT IMAGE</span><strong>COMING SOON</strong></div>';
  const actions = product.orderable
    ? `<div class="catalog-card-actions"><button class="button button-primary" type="button" data-buy-now="${escapeHtml(product.id)}">Buy Now</button><a href="/product/${encodeURIComponent(product.id)}">View Details</a><a href="${escapeHtml(hawaiiMailto(product))}">Hawaii Shipping Available</a></div>`
    : `<div class="status">Currently unavailable online</div><a href="/product/${encodeURIComponent(product.id)}">View Details</a>`;
  return `<article class="catalog-card" data-product-id="${escapeHtml(product.id)}">
    <a class="catalog-card-media" href="/product/${encodeURIComponent(product.id)}">${media}</a>
    <div class="catalog-card-body"><span class="vendor">${escapeHtml(product.vendorName)}</span><span class="sku">${escapeHtml(product.sku)}</span><h2>${escapeHtml(product.title)}</h2><div class="price">${escapeHtml(formatPrice(product.sellPrice))}</div>${actions}</div>
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
    { title: 'Solar & Charging', href: '/shop/sungoldpower', image: '/assets/hero/store-rv-solar-technician-clean.webp' },
    { title: 'Inverters & Charging', href: '/shop/sungoldpower', icon: 'inverter' },
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
  const ids = [
    'sok-sk12v100pc',
    'sok-sk48v100n',
    'renogy-rng-invt-3000-12v-p2-g3-us',
    'vevor-xxkljt124incljf0qv0'
  ];
  return ids.map(getProductById).filter(Boolean).map(card).join('');
}

function matchesDepartment(product, department) {
  if (!department) return true;
  const text = `${product.vendorName} ${product.title} ${productSummary(product)}`.toLowerCase();
  if (department === 'lithium-batteries') return /battery|lifepo4|lithium/.test(text);
  if (department === 'rv-outdoor') return /rv|camper|outdoor|leveler|travel/.test(text);
  return true;
}

function storeMain(url) {
  const query = url.searchParams.get('q') || '';
  const vendorParam = url.searchParams.get('vendor') || '';
  const department = url.searchParams.get('department') || '';
  let products = searchCatalog(query);
  if (vendorParam && getVendor(vendorParam)) products = products.filter(({ vendorId }) => vendorId === vendorParam.toLowerCase());
  if (department) products = products.filter((product) => matchesDepartment(product, department));

  return `<main id="main" class="catalog-main store-main">
    <section class="store-hero" aria-labelledby="store-title"><div class="store-hero-overlay"></div><div class="catalog-shell store-hero-content"><p class="store-eyebrow">AUTHORIZED OFF-GRID POWER &amp; RV SUPPLY</p><h1 id="store-title">Power Your RV.<br>Build Your Off-Grid System.<br><span>Buy With Confidence.</span></h1><p>Lithium batteries, solar, charging and RV equipment from trusted manufacturers — backed by real product and project support from Elevation UpScales.</p><div class="store-hero-actions"><a class="store-primary" href="/store">SHOP THE STORE →</a><a class="store-secondary" href="/start-a-project">Start a Project</a></div></div></section>
    <section class="store-trust" aria-label="Store trust highlights"><div><strong>✓</strong><span><b>Authorized Dealer</b><small>Approved supplier relationships</small></span></div><div><strong>▤</strong><span><b>Lower 48 Shipping</b><small>Shipping covered on eligible listings</small></span></div><div><strong>◉</strong><span><b>Real Support</b><small>208-813-4998</small></span></div><div><strong>★</strong><span><b>Trusted Products</b><small>Curated supplier catalog</small></span></div></section>
    <div class="catalog-shell store-content">
      <section class="store-shopby" aria-labelledby="store-shop-title"><div class="store-section-heading"><h2 id="store-shop-title">Shop the <span>Store</span></h2><a href="/store">View All Products →</a></div><div class="store-category-grid">${storeCategoryCards()}</div></section>
      <section class="store-featured" aria-labelledby="featured-title"><div class="store-section-heading"><div><p>FEATURED PRODUCTS</p><h2 id="featured-title">Ready to Shop</h2></div></div><div class="catalog-grid catalog-featured-grid">${featuredProducts()}</div></section>
      <section class="dealer-trust" aria-label="Approved dealer relationships"><p>AUTHORIZED &amp; APPROVED BRAND RELATIONSHIPS</p><div><strong>SOK BATTERY</strong><strong>RENOGY</strong><strong>SUNGOLDPOWER</strong><strong>VEVOR</strong><strong>WINEGARD</strong></div></section>
      <section class="full-catalog" aria-labelledby="catalog-title"><div class="store-section-heading"><div><p>ALL PRODUCTS</p><h2 id="catalog-title">Find the right product.</h2></div></div>${vendorFilters(vendorParam)}${query ? `<p>Search results for <strong>${escapeHtml(query)}</strong></p>` : ''}<section class="catalog-grid" aria-label="Product catalog">${products.length ? products.map(card).join('') : '<div class="catalog-empty">No products match this view right now.</div>'}</section></section>
    </div>
  </main>`;
}

function vendorMain(vendorId) {
  const vendor = getVendor(vendorId);
  if (!vendor) return null;
  const products = getProductsByVendor(vendor.id);

  return `<main id="main" class="catalog-main"><div class="catalog-shell">
    <section class="catalog-hero">
      <p>SHOP BY VENDOR</p>
      <h1>${escapeHtml(vendor.name)}</h1>
      <p>Shop current ${escapeHtml(vendor.name)} products available through Elevation UpScales.</p>
    </section>
    ${vendorFilters(vendor.id)}
    <section class="catalog-grid" aria-label="${escapeHtml(vendor.name)} products">
      ${products.length ? products.map(card).join('') : '<div class="catalog-empty">No products are available online from this vendor right now.</div>'}
    </section>
  </div></main>`;
}

function productMain(productId) {
  const product = getProductById(productId);
  if (!product) return null;
  const media = product.media && product.media !== UNVERIFIED
    ? `<img src="${escapeHtml(product.media)}" alt="${escapeHtml(product.title)}">`
    : '<div class="catalog-media-pending" role="img" aria-label="Product image coming soon"><span>PRODUCT IMAGE</span><strong>COMING SOON</strong></div>';
  const shippingCopy = lower48Shipping(product) ? 'Shipping covered to the Lower 48.' : 'Contact Elevation for shipping options.';

  return `<main id="main" class="catalog-main"><div class="catalog-shell">
    <a href="/shop/${product.vendorId}">← Back to ${escapeHtml(product.vendorName)}</a>
    <section class="catalog-detail">
      <article class="catalog-detail-card">
        <div class="catalog-detail-media">${media}</div>
        <p class="vendor">${escapeHtml(product.vendorName)}</p>
        <p class="sku">${escapeHtml(product.sku)}</p>
        <h1>${escapeHtml(product.title)}</h1>
        <p>${escapeHtml(productSummary(product))}</p>
        <p class="catalog-price">${escapeHtml(formatPrice(product.sellPrice))}</p>
        ${product.orderable
          ? `<div><p class="status">Available to order</p><p>${escapeHtml(shippingCopy)}</p><div class="catalog-card-actions"><button class="button button-primary" type="button" data-buy-now="${escapeHtml(product.id)}">Buy Now</button><button class="button" type="button" data-add-to-cart="${escapeHtml(product.id)}">Add to Cart</button><a class="button" href="${escapeHtml(hawaiiMailto(product))}">Hawaii Shipping Available</a></div></div>`
          : `<div class="catalog-hold"><strong>Currently unavailable online.</strong><p>Contact Elevation UpScales for availability.</p></div>`}
      </article>
      <aside class="catalog-facts"><h2>Product Details</h2><dl>
        <dt>Brand</dt><dd>${escapeHtml(product.vendorName)}</dd>
        <dt>SKU</dt><dd>${escapeHtml(product.sku)}</dd>
        <dt>Specifications</dt><dd>${escapeHtml(productSummary(product))}</dd>
        <dt>Shipping</dt><dd>${escapeHtml(shippingCopy)}</dd>
        <dt>Support</dt><dd>Elevation UpScales product support</dd>
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
