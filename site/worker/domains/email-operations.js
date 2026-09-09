import {
  jsonResponse,
  cleanString,
  isValidEmail,
  sameOriginRequest,
  requireAdmin,
} from "../core-context.js";
import {
  emailWorkflowStatus,
  sendInternalRoleAlert,
  sendManualRoleMessage,
  sendOrderWorkflowMessage,
} from "../shared/email-workflows.js";

const ADMIN_EMAIL_OPERATIONS_PATH = "/api/admin/email-operations";
const ORDER_CONFIRMATION_PATH = "/api/email-workflows/order-confirmation";
const ROLE_KEYS = new Set(["owner", "sales", "orders", "logistics", "support"]);
const ORDER_TEMPLATES = new Set(["order_confirmation", "shipping_update", "order_attention", "refund_update"]);

function parseObject(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_) {
    return {};
  }
}

async function readJson(request, maxBytes = 12_000) {
  const text = await request.text();
  if (text.length > maxBytes) return { error: "Payload too large" };
  try {
    const value = JSON.parse(text || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? { value } : { error: "Invalid request" };
  } catch (_) {
    return { error: "Invalid JSON" };
  }
}

function orderFromRow(row) {
  if (!row) return null;
  return {
    id: cleanString(row.id, 120),
    productName: cleanString(row.product_name, 260),
    quantity: Number(row.quantity || 0),
    totalCents: Number(row.total_cents || 0),
    customer: parseObject(row.customer_json),
    shipping: parseObject(row.shipping_json),
    paymentStatus: cleanString(row.payment_status, 40).toLowerCase(),
    fulfillmentStatus: cleanString(row.fulfillment_status, 40).toLowerCase(),
    trackingNumber: cleanString(row.tracking_number, 180),
    carrier: cleanString(row.carrier, 120),
  };
}

async function getOrder(env, reference) {
  if (!env?.MARKETPLACE_DB || typeof env.MARKETPLACE_DB.prepare !== "function") return null;
  return env.MARKETPLACE_DB.prepare(`SELECT id,product_name,quantity,total_cents,customer_json,shipping_json,payment_status,fulfillment_status,tracking_number,carrier FROM eus_store_orders WHERE id=? LIMIT 1`)
    .bind(reference)
    .first()
    .then(orderFromRow)
    .catch(() => null);
}

async function confirmationCache(reference) {
  const cache = globalThis.caches?.default;
  if (!cache) return { matched: false, remember: async () => {} };
  const key = new Request(`https://email-workflow.elevation.internal/order-confirmation/${encodeURIComponent(reference)}`);
  const matched = Boolean(await cache.match(key));
  return {
    matched,
    remember: async () => cache.put(key, new Response("sent", { headers: { "Cache-Control": "public, max-age=604800" } })).catch(() => {}),
  };
}

export async function handleOrderConfirmation(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const parsed = await readJson(request, 4_000);
  if (parsed.error) return jsonResponse({ error: parsed.error }, parsed.error === "Payload too large" ? 413 : 400);
  const reference = cleanString(parsed.value.reference, 120).toUpperCase();
  if (!/^EUS-STORE-\d{8}-[A-F0-9]{8}$/.test(reference)) return jsonResponse({ error: "Invalid store order reference" }, 400);

  const order = await getOrder(env, reference);
  if (!order) return jsonResponse({ error: "Store order not found" }, 404);
  if (order.paymentStatus !== "completed") return jsonResponse({ error: "Order payment is not complete" }, 409);
  if (!isValidEmail(order.customer?.email)) return jsonResponse({ error: "Order does not have a usable customer email" }, 409);

  const cache = await confirmationCache(reference);
  if (cache.matched) return jsonResponse({ ok: true, reference, emailStatus: "deduped" }, 200);

  const delivery = await sendOrderWorkflowMessage(env, "order_confirmation", order);
  if (delivery.status === "sent") await cache.remember();
  return jsonResponse({ ok: true, reference, emailStatus: delivery.status, messageId: delivery.messageId || "" }, 200);
}

export async function handleAdminEmailOperations(request, env, pathname) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  const path = cleanString(pathname, 260);

  if (path === ADMIN_EMAIL_OPERATIONS_PATH && (request.method === "GET" || request.method === "HEAD")) {
    const payload = { ok: true, ...emailWorkflowStatus(env), admin: auth.session.email };
    const response = jsonResponse(payload, 200);
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }

  if (path !== `${ADMIN_EMAIL_OPERATIONS_PATH}/send` || request.method !== "POST") {
    return jsonResponse({ error: "Email Operations endpoint not found" }, 404);
  }
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);

  const parsed = await readJson(request);
  if (parsed.error) return jsonResponse({ error: parsed.error }, parsed.error === "Payload too large" ? 413 : 400);
  const body = parsed.value;
  const action = cleanString(body.action, 40).toLowerCase();

  let delivery;
  if (action === "customer_message") {
    const role = cleanString(body.role, 40).toLowerCase();
    const recipientEmail = cleanString(body.recipientEmail, 320).toLowerCase();
    const subject = cleanString(body.subject, 300);
    const message = cleanString(body.message, 6000);
    if (!ROLE_KEYS.has(role)) return jsonResponse({ error: "Invalid email role" }, 400);
    if (!isValidEmail(recipientEmail)) return jsonResponse({ error: "A valid recipient email is required" }, 400);
    if (!subject || !message) return jsonResponse({ error: "Subject and message are required" }, 400);
    delivery = await sendManualRoleMessage(env, role, {
      recipientEmail,
      recipientName: cleanString(body.recipientName, 180),
      reference: cleanString(body.reference, 120),
      subject,
      body: message,
    });
  } else if (action === "internal_alert") {
    const role = cleanString(body.role, 40).toLowerCase();
    const subject = cleanString(body.subject, 300);
    const message = cleanString(body.message, 5000);
    if (!ROLE_KEYS.has(role)) return jsonResponse({ error: "Invalid email role" }, 400);
    if (!subject || !message) return jsonResponse({ error: "Subject and message are required" }, 400);
    delivery = await sendInternalRoleAlert(env, role, {
      reference: cleanString(body.reference, 120),
      subject,
      body: message,
    });
  } else if (action === "order_message") {
    const reference = cleanString(body.reference, 120).toUpperCase();
    const template = cleanString(body.template, 60).toLowerCase();
    if (!/^EUS-STORE-\d{8}-[A-F0-9]{8}$/.test(reference) || !ORDER_TEMPLATES.has(template)) return jsonResponse({ error: "Invalid order email request" }, 400);
    const order = await getOrder(env, reference);
    if (!order) return jsonResponse({ error: "Store order not found" }, 404);
    if (template === "order_confirmation" && order.paymentStatus !== "completed") return jsonResponse({ error: "Order payment is not complete" }, 409);
    if (template === "shipping_update" && order.fulfillmentStatus !== "shipped") return jsonResponse({ error: "Order is not marked shipped" }, 409);
    delivery = await sendOrderWorkflowMessage(env, template, order);
  } else {
    return jsonResponse({ error: "Unsupported email action" }, 400);
  }

  const ok = delivery.status === "sent";
  return jsonResponse({ ok, delivery, sentBy: auth.session.email }, ok ? 200 : (delivery.status === "not_configured" ? 503 : 502));
}

export const EMAIL_OPERATIONS_PATH = ADMIN_EMAIL_OPERATIONS_PATH;
export const EMAIL_ORDER_CONFIRMATION_PATH = ORDER_CONFIRMATION_PATH;
