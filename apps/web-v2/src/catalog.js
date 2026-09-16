export const UNVERIFIED = 'UNVERIFIED';

export const REQUIRED_ORDERABILITY_FIELDS = Object.freeze([
  'vendorId',
  'sku',
  'title',
  'specs',
  'media',
  'sellPrice',
  'priceFloor',
  'stockState',
  'backorderState',
  'shippingDisposition',
  'warrantyReturnsOwnership',
  'fulfillmentSource',
  'channelAuthorization'
]);

export const VENDORS = Object.freeze([
  {
    id: 'sok',
    name: 'SOK Energy',
    sourcePath: 'operations/vendor-project-sources/SOK_PROJECT_SOURCE.md',
    sourceState: 'ACTIVE_PRIMARY_AUTHORIZED_SUPPLIER',
    catalogState: 'FULL_INITIAL_LAUNCH',
    unresolvedFacts: Object.freeze([])
  },
  {
    id: 'renogy',
    name: 'Renogy',
    sourcePath: 'operations/vendor-project-sources/RENOGY_PROJECT_SOURCE.md',
    sourceState: 'APPROVED_DEALER_PARTNER',
    catalogState: 'ONE_SKU_INITIAL_LAUNCH',
    unresolvedFacts: Object.freeze([])
  },
  {
    id: 'vevor',
    name: 'VEVOR',
    sourcePath: 'operations/vendor-project-sources/VEVOR_PROJECT_SOURCE.md',
    sourceState: 'ACTIVE_DIRECT_RELATIONSHIP',
    catalogState: 'ONE_SKU_INITIAL_LAUNCH',
    unresolvedFacts: Object.freeze([])
  },
  {
    id: 'kingboss',
    name: 'Kingboss',
    sourcePath: 'operations/vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md',
    sourceState: 'B2B_WHOLESALE_APPROVED',
    catalogState: 'ONE_SKU_VERIFICATION_HOLD',
    unresolvedFacts: Object.freeze(['exactManufacturerModel', 'commercialActivationFacts'])
  }
]);

function hasUnverified(value) {
  if (value === UNVERIFIED || value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0 || value.some(hasUnverified);
  if (typeof value === 'object') return Object.values(value).some(hasUnverified);
  if (typeof value === 'string') return value.trim() === '';
  return false;
}

export function missingRequiredFacts(product) {
  return REQUIRED_ORDERABILITY_FIELDS.filter((field) => hasUnverified(product?.[field]));
}

const ORDERABLE_STOCK_STATES = new Set([
  'IN_STOCK_VERIFIED',
  'PREORDER_AUTHORIZED',
  'BACKORDER_AUTHORIZED'
]);

export function evaluateOrderability(product) {
  if (!product || missingRequiredFacts(product).length) return false;
  if (product.channelAuthorization !== 'ELEVATION_DIRECT_WEBSITE') return false;
  return ORDERABLE_STOCK_STATES.has(product.stockState);
}

function finalize(product) {
  const missingFacts = Object.freeze(missingRequiredFacts(product));
  return Object.freeze({
    ...product,
    missingFacts,
    orderable: evaluateOrderability(product)
  });
}

const SOURCE_SNAPSHOT = '2ee4c8ba2b41eec940f0280e523e827c1efea8d4';
const SHOPIFY_BASELINE = 'SHOPIFY_LIVE_2026-09-15';

function sokProduct({ id, sku, title, summary, media, price, stockState = 'BACKORDER_AUTHORIZED', backorderState = 'BACKORDER_AUTHORIZED', shopifyProductId, shopifyHandle }) {
  return finalize({
    id,
    vendorId: 'sok',
    vendorName: 'SOK Energy',
    sku,
    supplierSku: sku,
    title,
    specs: Object.freeze({ summary }),
    media,
    sellPrice: Object.freeze({ currency: 'USD', amount: price }),
    priceFloor: Object.freeze({ policy: 'SOK_MAP_VERIFIED_2026_09_09', amount: price }),
    stockState,
    backorderState,
    shippingDisposition: 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED',
    warrantyReturnsOwnership: 'ELEVATION_COORDINATES_SOK_AUTHORIZES',
    fulfillmentSource: 'SOK_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/SOK_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT,
    shopifyBaseline: SHOPIFY_BASELINE,
    shopifyProductId,
    shopifyHandle
  });
}

export const CATALOG_PRODUCTS = Object.freeze([
  sokProduct({
    id: 'sok-sk12v100pc',
    sku: 'SK12V100PC',
    title: 'Premium 12V 100Ah Bluetooth LiFePO4 Battery — SK12V100PC',
    summary: '12V 100Ah LiFePO4 battery, transparent Group 24 case, Bluetooth monitoring.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v100pc-main.png?v=1788791577',
    price: 319,
    shopifyProductId: 'gid://shopify/Product/15995497906545',
    shopifyHandle: 'sok-sk12v100pc-12v-100ah-lifepo4-battery-group-24'
  }),
  sokProduct({
    id: 'sok-sk12v100h',
    sku: 'SK12V100H',
    title: 'Premium 12V 100Ah Heated LiFePO4 Battery — SK12V100H',
    summary: '12V 100Ah LiFePO4 battery, metal enclosure, Bluetooth monitoring and heater pad.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v100h-official_df4e4635-3946-44d1-aefd-fec9d609580b.jpg?v=1788889904',
    price: 369,
    shopifyProductId: 'gid://shopify/Product/15997524935025',
    shopifyHandle: 'sok-sk12v100h-12v-100ah-heated-lifepo4-battery'
  }),
  sokProduct({
    id: 'sok-sk12v206h',
    sku: 'SK12V206H',
    title: 'Premium 12V 206Ah Heated LiFePO4 Battery — SK12V206H',
    summary: '12V 206Ah LiFePO4 battery, metal enclosure, Bluetooth monitoring and heater pad.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v206h-official_c401f431-a8c1-4cd1-96e9-435d596df14f.jpg?v=1788889910',
    price: 749,
    shopifyProductId: 'gid://shopify/Product/15997525164401',
    shopifyHandle: 'sok-sk12v206h-12v-206ah-heated-lifepo4-battery'
  }),
  sokProduct({
    id: 'sok-sk12v206ph',
    sku: 'SK12V206PH',
    title: 'Premium Marine Grade 12V 206Ah Heated LiFePO4 Battery — SK12V206PH',
    summary: '12V 206Ah LiFePO4 battery, sealed plastic enclosure, Bluetooth monitoring and heater pad.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v206ph-official_890bb4cd-8888-40f2-9d1a-7d76aa2d73f3.jpg?v=1788889917',
    price: 750,
    shopifyProductId: 'gid://shopify/Product/15997525197169',
    shopifyHandle: 'sok-sk12v206ph-12v-206ah-heated-lifepo4-battery'
  }),
  sokProduct({
    id: 'sok-sk24v100',
    sku: 'SK24V100',
    title: 'Premium 24V 100Ah LiFePO4 Battery — SK24V100',
    summary: '24V 100Ah LiFePO4 battery, metal enclosure with Bluetooth monitoring.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk24v100-official_ada9d795-175f-4f60-b6e7-720be9a4f84a.jpg?v=1788889926',
    price: 751,
    shopifyProductId: 'gid://shopify/Product/15997525262705',
    shopifyHandle: 'sok-sk24v100-24v-100ah-lifepo4-battery'
  }),
  sokProduct({
    id: 'sok-sk12v280h',
    sku: 'SK12V280H',
    title: 'Premium 12V 280Ah Heated LiFePO4 Battery — SK12V280H',
    summary: '12V 280Ah LiFePO4 battery, aluminum enclosure, Bluetooth monitoring and heater pad.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v280h-official_7e442177-cf94-4baf-ab3c-4052649963f6.png?v=1788889935',
    price: 999,
    shopifyProductId: 'gid://shopify/Product/15997525393777',
    shopifyHandle: 'sok-sk12v280h-12v-280ah-heated-lifepo4-battery'
  }),
  sokProduct({
    id: 'sok-sk12v314ph',
    sku: 'SK12V314PH',
    title: 'Premium 12V 314Ah Heated LiFePO4 Battery with Victron CAN — SK12V314PH',
    summary: '12V 314Ah LiFePO4 battery, plastic enclosure, Bluetooth, heating pad and Victron communication.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk12v314ph-official_2f1f0524-9d34-4b16-b024-d9e8c7a60de1.png?v=1788889945',
    price: 1099,
    stockState: 'PREORDER_AUTHORIZED',
    backorderState: 'PREORDER_AUTHORIZED',
    shopifyProductId: 'gid://shopify/Product/15997525492081',
    shopifyHandle: 'sok-sk12v314ph-12v-314ah-heated-lifepo4-battery'
  }),
  sokProduct({
    id: 'sok-sk24v150ph',
    sku: 'SK24V150PH',
    title: 'Premium 24V 150Ah Heated LiFePO4 Battery with Victron CAN — SK24V150PH',
    summary: '24V 150Ah LiFePO4 battery, plastic enclosure, Bluetooth, heating pads and Victron communication.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk24v150ph-official_9557cb8c-e11e-4339-aeb0-7851cadc3c8e.png?v=1788889952',
    price: 1149,
    shopifyProductId: 'gid://shopify/Product/15997525623153',
    shopifyHandle: 'sok-sk24v150ph-24v-150ah-heated-lifepo4-battery'
  }),
  sokProduct({
    id: 'sok-sk48v100n',
    sku: 'SK48V100N',
    title: 'Premium 51.2V 100Ah 5.12kWh Rack LiFePO4 Battery — SK48V100N',
    summary: '48V-class 100Ah 3U rack LiFePO4 battery with Bluetooth OTA, heater pad and app-selectable protocol.',
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/sok-sk48v100n-main.jpg?v=1788791588',
    price: 1199,
    shopifyProductId: 'gid://shopify/Product/15995497972081',
    shopifyHandle: 'sok-sk48v100n-51-2v-100ah-5-12kwh-lifepo4-rack-battery'
  }),
  finalize({
    id: 'renogy-rng-invt-3000-12v-p2-g3-us',
    vendorId: 'renogy',
    vendorName: 'Renogy',
    sku: 'RNG-INVT-3000-12V-P2-G3-US',
    supplierSku: 'RNG-INVT-3000-12V-P2-G3-US',
    publicAliasSku: 'RNG-INVT-3000-12V-P2-US',
    title: 'Renogy 3000W 12V Pure Sine Wave Inverter',
    specs: Object.freeze({ summary: '3000W 12V pure sine wave inverter with 6000W peak surge and remote control.' }),
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/RNG-260901-M9-_1-44.jpg?v=1789369602',
    sellPrice: Object.freeze({ currency: 'USD', amount: 414.99 }),
    priceFloor: Object.freeze({ policy: 'CURRENT_RENOGY_PUBLIC_PRICE_REFERENCE', amount: 414.99 }),
    stockState: 'BACKORDER_AUTHORIZED',
    backorderState: 'BACKORDER_AUTHORIZED',
    shippingDisposition: 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED',
    warrantyReturnsOwnership: 'ELEVATION_COORDINATES_RENOGY_SUPPORT',
    fulfillmentSource: 'RENOGY_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/RENOGY_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT,
    shopifyBaseline: SHOPIFY_BASELINE,
    shopifyProductId: 'gid://shopify/Product/16002364408177',
    shopifyHandle: 'renogy-rng-invt-3000-12v-p2-g3-us'
  }),
  finalize({
    id: 'vevor-xxkljt124incljf0qv0',
    vendorId: 'vevor',
    vendorName: 'VEVOR',
    sku: 'XXKLJT124INCLJF0QV0',
    title: 'VEVOR Camper Levelers — 2-Pack, Up to 4 in',
    specs: Object.freeze({ summary: 'Two curved RV leveling blocks, up to 4 in leveling height, rated up to 8,818.5 lb.' }),
    media: 'https://cdn.shopify.com/s/files/1/1035/5353/2273/files/vevor-xxkljt124incljf0qv0.jpg?v=1789106224',
    sellPrice: Object.freeze({ currency: 'USD', amount: 39.90 }),
    priceFloor: Object.freeze({ policy: 'ELEVATION_TEST_PRICE_ABOVE_CURRENT_VEVOR_REFERENCE', amount: 39.90 }),
    stockState: 'IN_STOCK_VERIFIED',
    backorderState: 'NOT_REQUIRED_IN_STOCK',
    shippingDisposition: 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED',
    warrantyReturnsOwnership: 'ELEVATION_FIRST_VEVOR_SUPPORT_ROUTE',
    fulfillmentSource: 'VEVOR_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/VEVOR_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT,
    shopifyBaseline: SHOPIFY_BASELINE,
    shopifyProductId: 'gid://shopify/Product/16001185743217',
    shopifyHandle: 'vevor-camper-levelers-2-pack-up-to-4-in',
    sourceFreshnessNote: 'VEVOR sellability and public reference price require revalidation before supplier purchase.'
  }),
  finalize({
    id: 'kingboss-d01027hh7bv',
    vendorId: 'kingboss',
    vendorName: 'Kingboss',
    sku: 'D01027HH7BV',
    supplierSku: UNVERIFIED,
    title: 'Kingboss 12V 100Ah LiFePO4 Battery — Verification Pilot',
    specs: Object.freeze({ summary: '12V 100Ah LiFePO4 battery; exact manufacturer model mapping remains under verification.' }),
    media: UNVERIFIED,
    sellPrice: UNVERIFIED,
    priceFloor: UNVERIFIED,
    stockState: UNVERIFIED,
    backorderState: UNVERIFIED,
    shippingDisposition: UNVERIFIED,
    warrantyReturnsOwnership: UNVERIFIED,
    fulfillmentSource: UNVERIFIED,
    channelAuthorization: UNVERIFIED,
    sourcePath: 'operations/vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT,
    sourceNote: 'Doba SKU attribution to Kingboss is supported; exact manufacturer SKU/model is not yet locked.'
  })
]);

export function getVendor(vendorId) {
  return VENDORS.find(({ id }) => id === String(vendorId || '').toLowerCase()) || null;
}

export function getProductsByVendor(vendorId) {
  const normalized = String(vendorId || '').toLowerCase();
  return CATALOG_PRODUCTS.filter(({ vendorId: productVendor }) => productVendor === normalized);
}

export function getProductById(productId) {
  const normalized = String(productId || '').toLowerCase();
  return CATALOG_PRODUCTS.find(({ id }) => id === normalized) || null;
}

export function searchCatalog(query = '') {
  const needle = String(query).trim().toLowerCase();
  if (!needle) return CATALOG_PRODUCTS;
  return CATALOG_PRODUCTS.filter((product) =>
    [product.vendorName, product.vendorId, product.sku, product.supplierSku, product.title]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(needle))
  );
}
