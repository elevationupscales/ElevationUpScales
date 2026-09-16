import { getProductById } from './catalog.js';
import { resolveOrderHandoff } from './order.js';
import { createLower48ChargeResolver } from './lower48-charges.js';
import { createPaypalOrder, capturePaypalOrder, paymentGate, paypalMode } from './paypal.js';
import { attachProviderOrder, createDirectOrder, loadDirectOrder, markOrderCaptured } from './order-storage.js';

function clean(value, max = 300) {
  return String(value ?? '').trim().slice(0, max);
}

function safeDraft(draft) {
  return {
    lines: draft.lines,
    blocked: draft.blocked,
    destinationBlocked: draft.destinationBlocked,
    fulfillment: draft.fulfillment,
    totals: draft.totals,
    holds: draft.holds,
    orderReady: draft.orderReady,
    paymentReady: draft.paymentReady
  };
}

function sameMoney(left, right) {
  const a = Number(left?.amount);
  const b = Number(right?.amount);
  return Number.isFinite(a) && Number.isFinite(b) && Math.round(a * 100) === Math.round(b * 100) && (left?.currency || 'USD') === (right?.currency || 'USD');
}

export async function createOrderFromCheckout(payload, env, {
  productLookup = getProductById,
  chargeResolver = null,
  storage = { createDirectOrder, attachProviderOrder },
  payment = { createPaypalOrder }
} = {}) {
  if (!payload || !Array.isArray(payload.items)) return { status: 400, body: { error: 'INVALID_ORDER_PAYLOAD' } };

  const resolver = chargeResolver || createLower48ChargeResolver(env, productLookup);
  const draft = resolveOrderHandoff(payload.items, payload.customer, payload.shipping, { productLookup, chargeResolver: resolver });
  if (!draft.orderReady || !draft.paymentReady) {
    return { status: 409, body: { error: 'ORDER_NOT_PAYMENT_READY', ...safeDraft(draft) } };
  }

  const gate = paymentGate(env);
  if (!gate.ready) return { status: 503, body: { error: gate.reason, mode: gate.mode } };

  const key = clean(payload.idempotencyKey, 120);
  if (!/^[A-Za-z0-9._:-]{12,120}$/.test(key)) return { status: 400, body: { error: 'INVALID_IDEMPOTENCY_KEY' } };

  let stored;
  try {
    stored = await storage.createDirectOrder(env, draft, key, paypalMode(env));
  } catch (error) {
    return { status: 503, body: { error: clean(error?.message, 120) || 'ORDER_STORAGE_UNAVAILABLE' } };
  }

  if (stored.order.providerOrderId) {
    return {
      status: 200,
      body: {
        ok: true,
        reused: true,
        orderReference: stored.order.id,
        provider: stored.order.paymentProvider,
        providerOrderId: stored.order.providerOrderId,
        paymentStatus: stored.order.paymentStatus
      }
    };
  }

  let providerOrder;
  try {
    providerOrder = await payment.createPaypalOrder(env, {
      id: stored.order.id,
      totals: draft.totals,
      shippingAddress: draft.shippingAddress,
      returnOrigin: payload.returnOrigin
    });
  } catch (error) {
    return { status: 502, body: { error: clean(error?.message, 120) || 'PAYMENT_PROVIDER_UNAVAILABLE', orderReference: stored.order.id } };
  }

  const order = await storage.attachProviderOrder(env, stored.order.id, providerOrder.orderId);
  return {
    status: stored.reused ? 200 : 201,
    body: {
      ok: true,
      reused: stored.reused,
      orderReference: order?.id || stored.order.id,
      provider: 'paypal',
      providerOrderId: providerOrder.orderId,
      approveUrl: providerOrder.approveUrl,
      paymentStatus: order?.paymentStatus || 'CREATED'
    }
  };
}

export async function captureOrderPayment(providerOrderId, env, {
  productLookup = getProductById,
  chargeResolver = null,
  storage = { loadDirectOrder, markOrderCaptured },
  payment = { capturePaypalOrder }
} = {}) {
  let order;
  try {
    order = await storage.loadDirectOrder(env, { providerOrderId: clean(providerOrderId, 100) });
  } catch (error) {
    return { status: 503, body: { error: clean(error?.message, 120) || 'ORDER_STORAGE_UNAVAILABLE' } };
  }
  if (!order) return { status: 404, body: { error: 'ORDER_NOT_FOUND' } };
  if (order.providerCaptureId || ['COMPLETED', 'CAPTURED'].includes(clean(order.paymentStatus, 40).toUpperCase())) {
    return {
      status: 200,
      body: {
        ok: true,
        reused: true,
        orderReference: order.id,
        providerOrderId: order.providerOrderId,
        providerCaptureId: order.providerCaptureId,
        paymentStatus: order.paymentStatus,
        fulfillmentStatus: order.fulfillmentStatus
      }
    };
  }

  const requestedLines = order.items.map((item) => ({ productId: item.productId, quantity: item.quantity }));
  const resolver = chargeResolver || createLower48ChargeResolver(env, productLookup);
  const draft = resolveOrderHandoff(requestedLines, order.customer, order.shippingAddress, { productLookup, chargeResolver: resolver });
  if (!draft.orderReady || !draft.paymentReady) {
    return { status: 409, body: { error: 'ORDER_REVALIDATION_FAILED', ...safeDraft(draft) } };
  }

  if (!sameMoney(order.totals.merchandiseSubtotal, draft.totals.merchandiseSubtotal) ||
      !sameMoney(order.totals.shipping, draft.totals.shipping) ||
      !sameMoney(order.totals.tax, draft.totals.tax) ||
      !sameMoney(order.totals.amountDue, draft.totals.amountDue)) {
    return { status: 409, body: { error: 'ORDER_TOTAL_CHANGED' } };
  }

  const gate = paymentGate(env);
  if (!gate.ready) return { status: 503, body: { error: gate.reason, mode: gate.mode } };

  let captured;
  try {
    captured = await payment.capturePaypalOrder(env, order.providerOrderId, order.id);
  } catch (error) {
    return { status: 502, body: { error: clean(error?.message, 120) || 'PAYMENT_CAPTURE_FAILED' } };
  }

  const updated = await storage.markOrderCaptured(env, order.id, captured);
  return {
    status: 200,
    body: {
      ok: true,
      reused: false,
      orderReference: updated?.id || order.id,
      providerOrderId: order.providerOrderId,
      providerCaptureId: updated?.providerCaptureId || captured.captureId,
      paymentStatus: updated?.paymentStatus || captured.status,
      fulfillmentStatus: updated?.fulfillmentStatus || order.fulfillmentStatus,
      fulfillmentRoutes: draft.fulfillment.routes
    }
  };
}
