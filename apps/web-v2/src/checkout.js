import { getProductById } from './catalog.js';
import { resolveCartLines } from './cart.js';

const CONTIGUOUS_US_STATES = new Set([
  'AL','AZ','AR','CA','CO','CT','DE','FL','GA','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
]);

const LOWER_48_DISPOSITIONS = new Set([
  'LOWER_48_SUPPLIER_SHIPPING_VERIFIED',
  'LOWER_48_VERIFIED',
  'CONTIGUOUS_US_VERIFIED',
  'US_WAREHOUSE_DROPSHIP_ROUTE_VERIFIED',
  'US_ALL_50_STATES_VERIFIED'
]);

const HAWAII_DISPOSITIONS = new Set([
  'HAWAII_SUPPLIER_SHIPPING_VERIFIED',
  'HAWAII_DIRECT_VERIFIED',
  'US_ALL_50_STATES_VERIFIED'
]);

const ALASKA_DISPOSITIONS = new Set([
  'ALASKA_SUPPLIER_SHIPPING_VERIFIED',
  'ALASKA_DIRECT_VERIFIED',
  'US_ALL_50_STATES_VERIFIED'
]);

function normalizeDestination(destination = {}) {
  const country = String(destination.country || 'US').trim().toUpperCase();
  const state = String(destination.state || '').trim().toUpperCase();
  const postalCode = String(destination.postalCode || '').trim();

  if (country !== 'US') return null;
  if (!/^[A-Z]{2}$/.test(state)) return null;
  if (!/^\d{5}(?:-\d{4})?$/.test(postalCode)) return null;

  return { country, state, postalCode };
}

function destinationBlock(productId, reason) {
  return { productId, reason };
}

export function evaluateDestination(product, destination) {
  const normalized = normalizeDestination(destination);
  if (!normalized) return { eligible: false, reason: 'INVALID_DESTINATION', destination: null };

  const disposition = product?.shippingDisposition;

  if (normalized.state === 'HI') {
    return HAWAII_DISPOSITIONS.has(disposition)
      ? { eligible: true, reason: null, destination: normalized }
      : { eligible: false, reason: 'HAWAII_CONTACT_REQUIRED', destination: normalized };
  }

  if (normalized.state === 'AK') {
    return ALASKA_DISPOSITIONS.has(disposition)
      ? { eligible: true, reason: null, destination: normalized }
      : { eligible: false, reason: 'ALASKA_CONTACT_REQUIRED', destination: normalized };
  }

  if (!CONTIGUOUS_US_STATES.has(normalized.state)) {
    return { eligible: false, reason: 'DESTINATION_UNVERIFIED', destination: normalized };
  }

  if (!LOWER_48_DISPOSITIONS.has(disposition)) {
    return { eligible: false, reason: 'DESTINATION_ROUTE_UNVERIFIED', destination: normalized };
  }

  return { eligible: true, reason: null, destination: normalized };
}

export function resolveCheckout(requestedLines, destination, productLookup = getProductById) {
  const cart = resolveCartLines(requestedLines, productLookup);
  const normalizedDestination = normalizeDestination(destination);
  const destinationBlocked = [];

  if (!normalizedDestination) {
    return {
      lines: cart.lines,
      blocked: cart.blocked,
      destinationBlocked: [destinationBlock(null, 'INVALID_DESTINATION')],
      destination: null,
      totals: {
        merchandiseSubtotal: cart.subtotal,
        shipping: null,
        tax: null,
        amountDue: null
      },
      checkoutReady: false,
      paymentReady: false
    };
  }

  for (const line of cart.lines) {
    const product = productLookup(line.productId);
    const decision = evaluateDestination(product, normalizedDestination);
    if (!decision.eligible) destinationBlocked.push(destinationBlock(line.productId, decision.reason));
  }

  const checkoutReady = cart.checkoutReady && destinationBlocked.length === 0;

  return {
    lines: cart.lines,
    blocked: cart.blocked,
    destinationBlocked,
    destination: normalizedDestination,
    totals: {
      merchandiseSubtotal: cart.subtotal,
      shipping: null,
      tax: null,
      amountDue: null
    },
    checkoutReady,
    paymentReady: false
  };
}
