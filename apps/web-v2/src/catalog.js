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
    catalogState: 'SOURCE_TRUTH_PENDING',
    unresolvedFacts: Object.freeze(['exactSkuIdentity'])
  },
  {
    id: 'renogy',
    name: 'Renogy',
    sourcePath: 'operations/vendor-project-sources/RENOGY_PROJECT_SOURCE.md',
    sourceState: 'APPROVED_DEALER_PARTNER',
    catalogState: 'VERIFIED_SUBSET_HELD',
    unresolvedFacts: Object.freeze([])
  },
  {
    id: 'vevor',
    name: 'VEVOR',
    sourcePath: 'operations/vendor-project-sources/VEVOR_PROJECT_SOURCE.md',
    sourceState: 'ACTIVE_DIRECT_RELATIONSHIP',
    catalogState: 'VERIFIED_SUBSET_HELD',
    unresolvedFacts: Object.freeze([])
  },
  {
    id: 'kingboss',
    name: 'Kingboss',
    sourcePath: 'operations/vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md',
    sourceState: 'B2B_WHOLESALE_APPROVED',
    catalogState: 'VERIFIED_SUBSET_HELD',
    unresolvedFacts: Object.freeze([])
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

const SOURCE_SNAPSHOT = 'be9375b207ae1253902b6fe1786682c6fd6e8ada';

export const CATALOG_PRODUCTS = Object.freeze([
  finalize({
    id: 'renogy-rsp100dct-us',
    vendorId: 'renogy',
    vendorName: 'Renogy',
    sku: 'RSP100DCT-US',
    supplierSku: 'RSP100DCT-G1-US',
    title: '100W N-Type Bifacial Solar Panel',
    specs: Object.freeze({ summary: '100W N-Type bifacial panel' }),
    media: UNVERIFIED,
    sellPrice: UNVERIFIED,
    priceFloor: UNVERIFIED,
    stockState: UNVERIFIED,
    backorderState: 'BACKORDER_AUTHORIZED',
    shippingDisposition: 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED',
    warrantyReturnsOwnership: 'RENOGY_AUTHORIZATION_ELEVATION_SUPPORT',
    fulfillmentSource: 'RENOGY_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/RENOGY_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT
  }),
  finalize({
    id: 'renogy-rbm500-us',
    vendorId: 'renogy',
    vendorName: 'Renogy',
    sku: 'RBM500-US',
    supplierSku: 'RBM500-G3-US',
    title: '500A Battery Monitor',
    specs: Object.freeze({ summary: '500A battery monitor' }),
    media: UNVERIFIED,
    sellPrice: UNVERIFIED,
    priceFloor: UNVERIFIED,
    stockState: UNVERIFIED,
    backorderState: 'BACKORDER_AUTHORIZED',
    shippingDisposition: 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED',
    warrantyReturnsOwnership: 'RENOGY_AUTHORIZATION_ELEVATION_SUPPORT',
    fulfillmentSource: 'RENOGY_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/RENOGY_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT
  }),
  finalize({
    id: 'renogy-rbc2125ds-21w-us',
    vendorId: 'renogy',
    vendorName: 'Renogy',
    sku: 'RBC2125DS-21W-US',
    supplierSku: 'RBC2125DS-21W-G3-US',
    title: '50A IP67 DC-DC Charger with MPPT',
    specs: Object.freeze({ summary: '50A IP67 DC-DC charger with MPPT' }),
    media: UNVERIFIED,
    sellPrice: UNVERIFIED,
    priceFloor: UNVERIFIED,
    stockState: UNVERIFIED,
    backorderState: UNVERIFIED,
    shippingDisposition: 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED',
    warrantyReturnsOwnership: 'RENOGY_AUTHORIZATION_ELEVATION_SUPPORT',
    fulfillmentSource: 'RENOGY_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/RENOGY_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT
  }),
  finalize({
    id: 'vevor-xxkljt124incljf0qv0',
    vendorId: 'vevor',
    vendorName: 'VEVOR',
    sku: 'XXKLJT124INCLJF0QV0',
    title: 'Camper Levelers',
    specs: UNVERIFIED,
    media: UNVERIFIED,
    sellPrice: Object.freeze({ currency: 'USD', amount: 39.90 }),
    priceFloor: Object.freeze({
      policy: 'HIGHER_OF_FEED_MAP_AND_LIVE_VEVOR_PUBLIC_PRICE',
      amount: UNVERIFIED
    }),
    stockState: 'SUPPLIER_SELLABILITY_VERIFIED_AT_SOURCE_SNAPSHOT',
    backorderState: UNVERIFIED,
    shippingDisposition: 'US_WAREHOUSE_DROPSHIP_ROUTE_VERIFIED',
    warrantyReturnsOwnership: 'ELEVATION_FIRST_VEVOR_SUPPLIER_ROUTE',
    fulfillmentSource: 'VEVOR_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/VEVOR_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT,
    sourceFreshnessNote: 'Supplier sellability and price/MAP require live revalidation before purchase.'
  }),
  finalize({
    id: 'vevor-axlstcqjdsykaz99c001v0',
    vendorId: 'vevor',
    vendorName: 'VEVOR',
    sku: 'AXLSTCQJDSYKAZ99C001V0',
    title: '5000 lb A-Frame Trailer Jack',
    specs: UNVERIFIED,
    media: UNVERIFIED,
    sellPrice: Object.freeze({ currency: 'USD', amount: 54.90 }),
    priceFloor: Object.freeze({
      policy: 'HIGHER_OF_FEED_MAP_AND_LIVE_VEVOR_PUBLIC_PRICE',
      amount: UNVERIFIED
    }),
    stockState: 'SUPPLIER_SELLABILITY_VERIFIED_AT_SOURCE_SNAPSHOT',
    backorderState: UNVERIFIED,
    shippingDisposition: 'US_WAREHOUSE_DROPSHIP_ROUTE_VERIFIED',
    warrantyReturnsOwnership: 'ELEVATION_FIRST_VEVOR_SUPPLIER_ROUTE',
    fulfillmentSource: 'VEVOR_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/VEVOR_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT,
    sourceFreshnessNote: 'Supplier sellability and price/MAP require live revalidation before purchase.'
  }),
  finalize({
    id: 'vevor-d25ft14in20ahoglov1',
    vendorId: 'vevor',
    vendorName: 'VEVOR',
    sku: 'D25FT14IN20AHOGLOV1',
    title: '12V 25-ft Electric Drain Auger',
    specs: UNVERIFIED,
    media: UNVERIFIED,
    sellPrice: Object.freeze({ currency: 'USD', amount: 66.90 }),
    priceFloor: Object.freeze({
      policy: 'HIGHER_OF_FEED_MAP_AND_LIVE_VEVOR_PUBLIC_PRICE',
      amount: UNVERIFIED
    }),
    stockState: 'SUPPLIER_SELLABILITY_VERIFIED_AT_SOURCE_SNAPSHOT',
    backorderState: UNVERIFIED,
    shippingDisposition: 'US_WAREHOUSE_DROPSHIP_ROUTE_VERIFIED',
    warrantyReturnsOwnership: 'ELEVATION_FIRST_VEVOR_SUPPLIER_ROUTE',
    fulfillmentSource: 'VEVOR_DIRECT_DROPSHIP',
    channelAuthorization: 'ELEVATION_DIRECT_WEBSITE',
    sourcePath: 'operations/vendor-project-sources/VEVOR_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT,
    sourceFreshnessNote: 'Supplier sellability and price/MAP require live revalidation before purchase.'
  }),
  finalize({
    id: 'kingboss-d01027hh7bv',
    vendorId: 'kingboss',
    vendorName: 'Kingboss',
    sku: 'D01027HH7BV',
    supplierSku: 'Model 133',
    title: 'Kingboss Model 133 — 12V 100Ah Battery',
    specs: Object.freeze({ summary: '12V 100Ah battery' }),
    media: UNVERIFIED,
    sellPrice: UNVERIFIED,
    priceFloor: UNVERIFIED,
    stockState: 'SUPPLIER_STOCK_GUIDANCE_REVERIFY',
    backorderState: UNVERIFIED,
    shippingDisposition: UNVERIFIED,
    warrantyReturnsOwnership: UNVERIFIED,
    fulfillmentSource: UNVERIFIED,
    channelAuthorization: UNVERIFIED,
    sourcePath: 'operations/vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md',
    sourceSnapshot: SOURCE_SNAPSHOT
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
