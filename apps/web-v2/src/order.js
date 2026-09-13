import { UNVERIFIED, getProductById } from './catalog.js';
import { resolveCheckout } from './checkout.js';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function clean(value, max = 300) {
  return String(value ?? '').trim().slice(0, max);
}

function cents(value) {
  if (!value || value === UNVERIFIED || typeof value.amount !== 'number' || !Number.isFinite(value.amount)) return null;
  return Math.round(value.amount * 100);
}

export function normalizeCustomer(raw = {}) {
  return {
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 60)
  };
}

export function normalizeShippingAddress(raw = {}) {
  return {
    fullName: clean(raw.fullName, 120),
    address1: clean(raw.address1, 180),
    address2: clean(raw.address2, 180),
    city: clean(raw.city, 120),
    state: clean(raw.state, 2).toUpperCase(),
    postalCode: clean(raw.postalCode, 30).toUpperCase(),
    countryCode: (clean(raw.countryCode || raw.country || 'US', 2).toUpperCase() || 'US').slice(0, 2)
  };
}

export function validCustomer(customer) {
  return EMAIL_RE.test(customer?.email || '');
}

export function validShippingAddress(address) {
  return Boolean(
    address?.fullName && address?.address1 && address?.city &&
    /^[A-Z]{2}$/.test(address.state || '') &&
    /^\d{5}(?:-\d{4})?$/.test(address.postalCode || '') &&
    address.countryCode === 'US'
  );
}

export function resolveFulfillmentRoutes(lines, productLookup = getProductById) {
  const routes = [];
  const blocked = [];

  for (const line of Array.isArray(lines) ? lines : []) {
    const product = productLookup(line.productId);
    if (!product || !product.orderable) {
      blocked.push({ productId: line.productId || null, reason: 'PRODUCT_NOT_ORDERABLE' });
      continue;
    }
    const supplierSku = clean(product.supplierSku || product.sku, 180);
    const fulfillmentSource = clean(product.fulfillmentSource, 180);
    const vendorId = clean(product.vendorId, 80);
    if (!vendorId || !supplierSku || !fulfillmentSource || [vendorId, supplierSku, fulfillmentSource].includes(UNVERIFIED)) {
      blocked.push({ productId: product.id, reason: 'FULFILLMENT_IDENTITY_UNVERIFIED' });
      continue;
    }
    routes.push({
      productId: product.id,
      vendorId,
      vendorName: product.vendorName,
      sku: product.sku,
      supplierSku,
      fulfillmentSource,
      quantity: line.quantity
    });
  }

  return { routes, blocked };
}

export function unresolvedChargeState(checkout) {
  return {
    currency: checkout?.totals?.merchandiseSubtotal?.currency || 'USD',
    merchandiseSubtotal: checkout?.totals?.merchandiseSubtotal || { currency: 'USD', amount: 0 },
    shipping: null,
    tax: null,
    amountDue: null,
    ready: false,
    holds: ['SHIPPING_AMOUNT_UNVERIFIED', 'TAX_AMOUNT_UNVERIFIED']
  };
}

function normalizeCharges(charges, merchandiseSubtotal) {
  const merchandiseCents = cents(merchandiseSubtotal);
  const shippingCents = cents(charges?.shipping);
  const taxCents = cents(charges?.tax);
  const amountDueCents = cents(charges?.amountDue);
  const currency = clean(charges?.currency || merchandiseSubtotal?.currency || 'USD', 3).toUpperCase();

  if (merchandiseCents === null || shippingCents === null || taxCents === null || amountDueCents === null || currency !== 'USD') {
    return { ready: false, reason: 'ORDER_TOTAL_UNVERIFIED' };
  }
  if (amountDueCents !== merchandiseCents + shippingCents + taxCents) {
    return { ready: false, reason: 'ORDER_TOTAL_MISMATCH' };
  }

  return {
    ready: true,
    currency,
    merchandiseSubtotal: { currency, amount: merchandiseCents / 100 },
    shipping: { currency, amount: shippingCents / 100 },
    tax: { currency, amount: taxCents / 100 },
    amountDue: { currency, amount: amountDueCents / 100 },
    holds: []
  };
}

export function resolveOrderHandoff(
  requestedLines,
  rawCustomer,
  rawShipping,
  {
    productLookup = getProductById,
    chargeResolver = unresolvedChargeState
  } = {}
) {
  const customer = normalizeCustomer(rawCustomer);
  const shippingAddress = normalizeShippingAddress(rawShipping);
  const checkout = resolveCheckout(
    requestedLines,
    { country: shippingAddress.countryCode, state: shippingAddress.state, postalCode: shippingAddress.postalCode },
    productLookup
  );
  const fulfillment = resolveFulfillmentRoutes(checkout.lines, productLookup);
  const holds = [];

  if (!validCustomer(customer)) holds.push('INVALID_CUSTOMER');
  if (!validShippingAddress(shippingAddress)) holds.push('INVALID_SHIPPING_ADDRESS');
  if (!checkout.checkoutReady) holds.push('CHECKOUT_REVALIDATION_FAILED');
  if (fulfillment.blocked.length) holds.push('FULFILLMENT_ROUTE_UNVERIFIED');

  let charges = unresolvedChargeState(checkout);
  if (!holds.length) {
    const proposed = chargeResolver({ checkout, customer, shippingAddress, fulfillment });
    charges = proposed?.ready === false
      ? { ...unresolvedChargeState(checkout), ...proposed }
      : normalizeCharges(proposed, checkout.totals.merchandiseSubtotal);
    if (!charges.ready) holds.push(charges.reason || 'ORDER_TOTAL_UNVERIFIED');
  }

  return {
    lines: checkout.lines,
    blocked: checkout.blocked,
    destinationBlocked: checkout.destinationBlocked,
    customer,
    shippingAddress,
    fulfillment,
    totals: {
      merchandiseSubtotal: checkout.totals.merchandiseSubtotal,
      shipping: charges.shipping ?? null,
      tax: charges.tax ?? null,
      amountDue: charges.amountDue ?? null
    },
    holds: [...new Set([...(charges.holds || []), ...holds])],
    orderReady: holds.length === 0 && charges.ready === true,
    paymentReady: holds.length === 0 && charges.ready === true
  };
}
