const SHOPIFY_ORIGIN = 'https://ggwt0c-41.myshopify.com';

export const SOK_PRODUCTS = Object.freeze([
  { slug: 'sk12v100pc', sku: 'SK12V100PC', title: 'Premium 12V 100Ah Bluetooth LiFePO4 Battery', price: 319, variantId: '64543156371825', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v100pc-main.png?v=1788791577', summary: '12V 100Ah LiFePO4 battery with Bluetooth monitoring in a clear sealed enclosure.' },
  { slug: 'sk12v100h', sku: 'SK12V100H', title: 'Premium 12V 100Ah Heated LiFePO4 Battery', price: 369, variantId: '64555695473009', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v100h-official_df4e4635-3946-44d1-aefd-fec9d609580b.jpg?v=1788889904', summary: '12V 100Ah LiFePO4 battery with Bluetooth monitoring and a built-in heater.' },
  { slug: 'sk12v206h', sku: 'SK12V206H', title: 'Premium 12V 206Ah Heated LiFePO4 Battery', price: 749, variantId: '64555696030065', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v206h-official_c401f431-a8c1-4cd1-96e9-435d596df14f.jpg?v=1788889910', summary: '12V 206Ah LiFePO4 deep-cycle battery with Bluetooth monitoring and a built-in heater.' },
  { slug: 'sk12v206ph', sku: 'SK12V206PH', title: 'Premium Marine Grade 12V 206Ah Heated LiFePO4 Battery', price: 750, variantId: '64555696062833', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v206ph-official_890bb4cd-8888-40f2-9d1a-7d76aa2d73f3.jpg?v=1788889917', summary: 'Marine-grade 12V 206Ah LiFePO4 battery with sealed enclosure and built-in heater.' },
  { slug: 'sk24v100', sku: 'SK24V100', title: 'Premium 24V 100Ah LiFePO4 Battery', price: 751, variantId: '64555696161137', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk24v100-official_ada9d795-175f-4f60-b6e7-720be9a4f84a.jpg?v=1788889926', summary: '24V 100Ah LiFePO4 battery with smart BMS protections and serviceable design.' },
  { slug: 'sk12v280h', sku: 'SK12V280H', title: 'Premium 12V 280Ah Heated LiFePO4 Battery', price: 999, variantId: '64555697078641', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v280h-official_7e442177-cf94-4baf-ab3c-4052649963f6.png?v=1788889935', summary: '12V 280Ah LiFePO4 battery with Bluetooth monitoring and a built-in heater.' },
  { slug: 'sk12v314ph', sku: 'SK12V314PH', title: 'Premium 12V 314Ah Heated LiFePO4 Battery with Victron CAN', price: 1099, variantId: '64555697176945', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v314ph-official_2f1f0524-9d34-4b16-b024-d9e8c7a60de1.png?v=1788889945', summary: '12V 314Ah heated LiFePO4 battery with Bluetooth and Victron CAN communication.', preorder: true },
  { slug: 'sk24v150ph', sku: 'SK24V150PH', title: 'Premium 24V 150Ah Heated LiFePO4 Battery with Victron CAN', price: 1149, variantId: '64555697570161', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk24v150ph-official_9557cb8c-e11e-4339-aeb0-7851cadc3c8e.png?v=1788889952', summary: '24V 150Ah heated LiFePO4 battery with Bluetooth and Victron CAN communication.' },
  { slug: 'sk48v100n', sku: 'SK48V100N', title: 'Premium 51.2V 100Ah 5.12kWh Rack LiFePO4 Battery', price: 1199, variantId: '64543156470129', image: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk48v100n-main.jpg?v=1788791588', summary: '51.2V 100Ah 5.12kWh rack battery with Bluetooth OTA, heater pad and selectable protocol.' }
]);

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function money(value) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value); }
function buyUrl(product, qty = 1) { return `${SHOPIFY_ORIGIN}/cart/${product.variantId}:${Math.max(1, Number(qty) || 1)}`; }

function head(title, description) {
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#061015"><meta name="description" content="${esc(description)}"><title>${esc(title)}</title><link rel="stylesheet" href="/assets/app.css"><link rel="stylesheet" href="/assets/sok-store.css">`;
}

function chrome(main) {
  return `<!doctype html><html lang="en"><head>${head('SOK Battery Store | Elevation UpScales', 'Shop nine SOK lithium battery models from Elevation UpScales.')}</head><body class="sok-store-body"><header class="sok-store-header"><div class="sok-store-shell"><a class="sok-store-brand" href="/">Elevation UpScales</a><nav><a href="/">Home</a><a aria-current="page" href="/shop/sok">SOK Store</a><a href="mailto:casey@elevationupscales.com">Questions</a></nav></div></header><main>${main}</main><footer class="sok-store-footer"><div class="sok-store-shell"><strong>Elevation UpScales, Inc.</strong><span>Authorized SOK dealer • Direct supplier fulfillment</span><span>208-813-4998 • casey@elevationupscales.com</span></div></footer></body></html>`;
}

function card(product) {
  return `<article class="sok-card"><a class="sok-card-image" href="/sok/${product.slug}"><img src="${esc(product.image)}" alt="${esc(product.title)}" loading="lazy"></a><div class="sok-card-body"><div class="sok-card-kicker">${esc(product.sku)}${product.preorder ? ' • PRE-ORDER' : ''}</div><h2><a href="/sok/${product.slug}">${esc(product.title)}</a></h2><p>${esc(product.summary)}</p><div class="sok-card-bottom"><strong>${money(product.price)}</strong><div class="sok-card-actions"><a class="sok-btn sok-btn-secondary" href="/sok/${product.slug}">Details</a><a class="sok-btn sok-btn-primary" href="${buyUrl(product)}">Buy now</a></div></div></div></article>`;
}

export function renderSokStore() {
  const cards = SOK_PRODUCTS.map(card).join('');
  return chrome(`<section class="sok-hero"><div class="sok-store-shell"><p class="sok-eyebrow">SOK BATTERY SYSTEMS</p><h1>Nine batteries. One clean store.</h1><p>Choose the SOK battery that fits your system, then continue to secure checkout. No marketplace routing. No Hawaii freight logic in the purchase path.</p><div class="sok-trust-row"><span>Direct SOK dealer relationship</span><span>Supplier-direct fulfillment</span><span>Continental U.S. store</span></div></div></section><section class="sok-products-section"><div class="sok-store-shell"><div class="sok-section-head"><div><p class="sok-eyebrow">AVAILABLE MODELS</p><h2>Shop all nine SOK batteries</h2></div><p>Product pricing shown here matches the current active Shopify product records.</p></div><div class="sok-grid">${cards}</div></div></section>`);
}

export function getSokProduct(slug) { return SOK_PRODUCTS.find((product) => product.slug === String(slug || '').toLowerCase()) || null; }

export function renderSokProduct(product) {
  if (!product) return null;
  return chrome(`<section class="sok-product-detail"><div class="sok-store-shell sok-product-layout"><div class="sok-product-media"><img src="${esc(product.image)}" alt="${esc(product.title)}"></div><div class="sok-product-copy"><a class="sok-back" href="/shop/sok">← Back to all SOK batteries</a><p class="sok-eyebrow">${esc(product.sku)}${product.preorder ? ' • PRE-ORDER' : ''}</p><h1>${esc(product.title)}</h1><p class="sok-product-summary">${esc(product.summary)}</p><div class="sok-product-price">${money(product.price)}</div><ul class="sok-facts"><li>Sold by Elevation UpScales through our SOK dealer relationship.</li><li>Supplier-direct fulfillment for eligible continental U.S. addresses.</li><li>Secure checkout and tax calculation are handled by Shopify.</li></ul><a class="sok-btn sok-btn-primary sok-buy-large" href="${buyUrl(product)}">Buy ${esc(product.sku)}</a><p class="sok-checkout-note">You will continue to Elevation UpScales secure Shopify checkout.</p></div></div></section>`);
}
