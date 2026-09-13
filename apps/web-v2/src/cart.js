import { getProductById } from './catalog.js';

export const CART_QUANTITY_LIMIT = 20;

function normalizeProductId(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeQuantity(value) {
  const quantity = Number(value);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > CART_QUANTITY_LIMIT) return null;
  return quantity;
}

function moneyAmount(price) {
  if (!price || typeof price.amount !== 'number' || !Number.isFinite(price.amount)) return null;
  return Math.round(price.amount * 100) / 100;
}

function blocked(productId, reason) {
  return { productId: productId || null, reason };
}

export function parseCartItems(raw) {
  if (raw === null || raw === undefined || raw === '') return [];
  let parsed;
  try {
    parsed = JSON.parse(String(raw));
  } catch {
    return null;
  }
  return Array.isArray(parsed) ? parsed : null;
}

export function resolveCartLines(requestedLines, productLookup = getProductById) {
  const input = Array.isArray(requestedLines) ? requestedLines : [];
  const requestedById = new Map();
  const blockedLines = [];

  for (const requested of input) {
    const productId = normalizeProductId(requested?.productId || requested?.id);
    const quantity = normalizeQuantity(requested?.quantity);

    if (!productId) {
      blockedLines.push(blocked(null, 'INVALID_PRODUCT_ID'));
      continue;
    }
    if (!quantity) {
      blockedLines.push(blocked(productId, 'INVALID_QUANTITY'));
      continue;
    }

    const nextQuantity = (requestedById.get(productId) || 0) + quantity;
    if (nextQuantity > CART_QUANTITY_LIMIT) {
      blockedLines.push(blocked(productId, 'QUANTITY_LIMIT'));
      requestedById.delete(productId);
      continue;
    }
    requestedById.set(productId, nextQuantity);
  }

  const lines = [];
  let subtotalCents = 0;

  for (const [productId, quantity] of requestedById) {
    const product = productLookup(productId);
    if (!product) {
      blockedLines.push(blocked(productId, 'UNKNOWN_PRODUCT'));
      continue;
    }
    if (!product.orderable) {
      blockedLines.push(blocked(productId, 'PRODUCT_NOT_ORDERABLE'));
      continue;
    }

    const canonicalAmount = moneyAmount(product.sellPrice);
    if (canonicalAmount === null) {
      blockedLines.push(blocked(productId, 'CANONICAL_PRICE_UNAVAILABLE'));
      continue;
    }

    const unitCents = Math.round(canonicalAmount * 100);
    const lineCents = unitCents * quantity;
    subtotalCents += lineCents;
    lines.push({
      productId: product.id,
      vendorName: product.vendorName,
      sku: product.sku,
      title: product.title,
      quantity,
      unitPrice: { currency: product.sellPrice.currency || 'USD', amount: unitCents / 100 },
      lineTotal: { currency: product.sellPrice.currency || 'USD', amount: lineCents / 100 }
    });
  }

  return {
    lines,
    blocked: blockedLines,
    itemCount: lines.reduce((total, line) => total + line.quantity, 0),
    subtotal: { currency: 'USD', amount: subtotalCents / 100 },
    checkoutReady: lines.length > 0 && blockedLines.length === 0
  };
}
