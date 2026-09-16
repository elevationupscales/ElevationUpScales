import { getProductById } from './catalog.js';

const NO_GENERAL_SALES_TAX_STATES = new Set(['DE', 'MT', 'NH', 'OR']);
const LOWER48_EXCLUDED_STATES = new Set(['AK', 'HI']);
const SOK_LOWER48_SHIPPING_CENTS_PER_BATTERY = 2799;

function money(cents) {
  return { currency: 'USD', amount: Math.round(cents) / 100 };
}

function parseTaxRates(env) {
  const raw = String(env?.STORE_SALES_TAX_BPS_JSON || '').trim();
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function configuredTaxBps(env, shippingAddress) {
  const state = String(shippingAddress?.state || '').trim().toUpperCase();
  const postalCode = String(shippingAddress?.postalCode || '').trim().slice(0, 5);
  if (NO_GENERAL_SALES_TAX_STATES.has(state)) return 0;

  const rates = parseTaxRates(env);
  const candidates = [postalCode, state];
  for (const key of candidates) {
    const value = Number(rates[key]);
    if (Number.isFinite(value) && value >= 0 && value <= 10000) return Math.round(value);
  }
  return null;
}

export function createLower48ChargeResolver(env, productLookup = getProductById) {
  return ({ checkout, shippingAddress }) => {
    const state = String(shippingAddress?.state || '').trim().toUpperCase();
    const countryCode = String(shippingAddress?.countryCode || '').trim().toUpperCase();
    if (countryCode !== 'US' || LOWER48_EXCLUDED_STATES.has(state)) {
      return { ready: false, reason: 'LOWER48_DESTINATION_REQUIRED', holds: ['LOWER48_DESTINATION_REQUIRED'] };
    }

    let shippingCents = 0;
    for (const line of checkout?.lines || []) {
      const product = productLookup(line.productId);
      if (!product || product.vendorId !== 'sok' || product.shippingDisposition !== 'LOWER_48_SUPPLIER_SHIPPING_VERIFIED') {
        return { ready: false, reason: 'SHIPPING_AMOUNT_UNVERIFIED', holds: ['SHIPPING_AMOUNT_UNVERIFIED'] };
      }
      shippingCents += SOK_LOWER48_SHIPPING_CENTS_PER_BATTERY * Number(line.quantity || 0);
    }

    const taxBps = configuredTaxBps(env, shippingAddress);
    if (taxBps === null) {
      return { ready: false, reason: 'TAX_AMOUNT_UNVERIFIED', holds: ['TAX_AMOUNT_UNVERIFIED'] };
    }

    const merchandiseCents = Math.round(Number(checkout?.totals?.merchandiseSubtotal?.amount || 0) * 100);
    const taxableCents = merchandiseCents + shippingCents;
    const taxCents = Math.round((taxableCents * taxBps) / 10000);
    const amountDueCents = merchandiseCents + shippingCents + taxCents;

    return {
      currency: 'USD',
      merchandiseSubtotal: money(merchandiseCents),
      shipping: money(shippingCents),
      tax: money(taxCents),
      amountDue: money(amountDueCents),
      ready: true,
      holds: []
    };
  };
}
