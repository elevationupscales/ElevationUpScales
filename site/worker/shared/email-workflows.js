import { normalizeEmailRole, resolveEmailRole } from "./email-role-routing.js";

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function validEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean(value, 320));
}

function money(cents) {
  const value = Number(cents || 0) / 100;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function orderCustomerName(order = {}) {
  return clean(order?.shipping?.fullName || order?.customer?.name || "Customer", 160);
}

function orderCustomerEmail(order = {}) {
  return clean(order?.customer?.email, 320).toLowerCase();
}

function orderReference(order = {}) {
  return clean(order?.id || order?.reference, 120);
}

function baseMessage(env, role, input = {}) {
  const roleKey = normalizeEmailRole(role);
  const fromEmail = clean(env?.MAIL_FROM, 320).toLowerCase();
  const toEmail = clean(input.toEmail, 320).toLowerCase();
  const subject = clean(input.subject, 300).replace(/[\r\n]+/g, " ");
  const text = clean(input.text, 7000);
  if (!validEmail(fromEmail) || !validEmail(toEmail) || !subject || !text) return null;
  return {
    from: { email: fromEmail, name: "Elevation UpScales" },
    to: { email: toEmail, name: clean(input.toName, 180) || toEmail },
    replyTo: resolveEmailRole(env, roleKey),
    subject,
    text,
  };
}

async function sendMessage(env, message) {
  if (!message || !env?.EMAIL || typeof env.EMAIL.send !== "function") {
    return { status: "not_configured", messageId: "", threadId: "" };
  }
  try {
    const result = await env.EMAIL.send(message);
    return {
      status: "sent",
      messageId: clean(result?.messageId, 240),
      threadId: clean(result?.threadId, 240),
      replyTo: clean(message.replyTo, 320),
    };
  } catch (error) {
    return {
      status: "failed",
      messageId: "",
      threadId: "",
      errorCode: clean(error?.code, 80) || "provider_error",
    };
  }
}

export function buildOrderWorkflowMessage(env, workflow, order = {}) {
  const reference = orderReference(order);
  const recipientEmail = orderCustomerEmail(order);
  const recipientName = orderCustomerName(order);
  if (!reference || !validEmail(recipientEmail)) return null;

  const productName = clean(order?.productName || "your Elevation order", 260);
  const quantity = Math.max(1, Number(order?.quantity || 1));
  const total = money(order?.totalCents);
  const tracking = clean(order?.trackingNumber, 180);
  const carrier = clean(order?.carrier, 120);

  if (workflow === "order_confirmation") {
    return baseMessage(env, "orders", {
      toEmail: recipientEmail,
      toName: recipientName,
      subject: `Elevation Order Confirmed — ${reference}`,
      text: [
        `Hi ${recipientName},`,
        "",
        "Your payment was received and your Elevation UpScales order is now in our fulfillment workflow.",
        "",
        `Order: ${reference}`,
        `Item: ${productName}`,
        `Quantity: ${quantity}`,
        `Order total: ${total}`,
        "",
        "We will verify fulfillment and send another update when shipment or pickup information is confirmed.",
        "Availability, supplier timing, freight acceptance, and delivery dates remain subject to the applicable order and shipping terms.",
        "",
        `Questions: ${resolveEmailRole(env, "orders")}`,
      ].join("\n"),
    });
  }

  if (workflow === "shipping_update") {
    const trackingLine = tracking ? `Tracking: ${tracking}` : "Tracking: pending carrier confirmation";
    const carrierLine = carrier ? `Carrier: ${carrier}` : "Carrier: pending confirmation";
    return baseMessage(env, "logistics", {
      toEmail: recipientEmail,
      toName: recipientName,
      subject: `Elevation Shipping Update — ${reference}`,
      text: [
        `Hi ${recipientName},`,
        "",
        "Your Elevation UpScales order has a new shipping update.",
        "",
        `Order: ${reference}`,
        `Item: ${productName}`,
        carrierLine,
        trackingLine,
        "",
        "Carrier scans and delivery timing are controlled by the carrier after handoff. Hawaii or other controlled-freight orders may use terminal or pickup milestones instead of ordinary parcel delivery milestones.",
        "",
        `Shipping questions: ${resolveEmailRole(env, "logistics")}`,
      ].join("\n"),
    });
  }

  if (workflow === "order_attention") {
    return baseMessage(env, "orders", {
      toEmail: recipientEmail,
      toName: recipientName,
      subject: `Elevation Order Review Update — ${reference}`,
      text: [
        `Hi ${recipientName},`,
        "",
        "Your order is currently under review by Elevation UpScales.",
        "",
        `Order: ${reference}`,
        `Item: ${productName}`,
        "",
        "No additional action is required unless our team contacts you with a specific request. We will provide the next confirmed order update as soon as it is available.",
        "",
        `Order support: ${resolveEmailRole(env, "orders")}`,
      ].join("\n"),
    });
  }

  if (workflow === "refund_update") {
    return baseMessage(env, "orders", {
      toEmail: recipientEmail,
      toName: recipientName,
      subject: `Elevation Refund Update — ${reference}`,
      text: [
        `Hi ${recipientName},`,
        "",
        `A refund status has been recorded for order ${reference}.`,
        "",
        "The time for funds to appear is controlled by the payment provider and the customer's financial institution after the refund is processed.",
        "",
        `Questions: ${resolveEmailRole(env, "orders")}`,
      ].join("\n"),
    });
  }

  return null;
}

export async function sendOrderWorkflowMessage(env, workflow, order = {}) {
  return sendMessage(env, buildOrderWorkflowMessage(env, workflow, order));
}

export async function sendManualRoleMessage(env, role, input = {}) {
  const reference = clean(input.reference, 120);
  const body = clean(input.body, 6000);
  const footer = `Reply to this email or contact ${resolveEmailRole(env, role)}.`;
  const text = [body, reference ? `Reference: ${reference}` : "", footer].filter(Boolean).join("\n\n");
  return sendMessage(env, baseMessage(env, role, {
    toEmail: input.recipientEmail,
    toName: input.recipientName,
    subject: input.subject,
    text,
  }));
}

export async function sendInternalRoleAlert(env, role, input = {}) {
  const roleKey = normalizeEmailRole(role);
  const address = resolveEmailRole(env, roleKey);
  const reference = clean(input.reference, 120);
  const text = [
    clean(input.body, 5000),
    reference ? `Reference: ${reference}` : "",
    "Internal Elevation UpScales operations notice.",
  ].filter(Boolean).join("\n\n");
  return sendMessage(env, baseMessage(env, roleKey, {
    toEmail: address,
    toName: `Elevation ${roleKey}`,
    subject: input.subject,
    text,
  }));
}

export function emailWorkflowStatus(env) {
  const roles = Object.fromEntries(["owner", "sales", "orders", "logistics", "support"].map((role) => [role, resolveEmailRole(env, role)]));
  return {
    provider: env?.EMAIL && typeof env.EMAIL.send === "function" ? "configured" : "not_configured",
    from: validEmail(env?.MAIL_FROM) ? clean(env.MAIL_FROM, 320).toLowerCase() : "",
    roles,
    workflows: [
      { key: "order_confirmation", label: "Order confirmations", mode: "automatic", role: "orders", trigger: "Successful paid-order confirmation request" },
      { key: "shipping_update", label: "Shipping updates", mode: "automatic", role: "logistics", trigger: "Order status changes to shipped" },
      { key: "order_attention", label: "Payment / order problem notices", mode: "automatic", role: "orders", trigger: "Order status changes to hold or refund review" },
      { key: "refund_update", label: "Refund updates", mode: "automatic", role: "orders", trigger: "Order status changes to refunded" },
      { key: "solar_ack", label: "Solar Builder acknowledgement", mode: "automatic", role: "sales", trigger: "Solar lead submitted" },
      { key: "work_with_us_ack", label: "Work With Us acknowledgement", mode: "automatic", role: "owner", trigger: "Opportunity submitted" },
      { key: "support_ack", label: "Support acknowledgement", mode: "admin", role: "support", trigger: "Admin send" },
      { key: "sales_follow_up", label: "Sales lead follow-up", mode: "admin", role: "sales", trigger: "Admin send" },
      { key: "vendor_notice", label: "Fulfillment / vendor notification", mode: "admin", role: "logistics", trigger: "Admin send or order status transition" },
      { key: "internal_alert", label: "Internal role alerts", mode: "automatic+admin", role: "role-based", trigger: "Operational status transition or Admin send" },
    ],
    futureCapabilities: {
      gmailDrafts: false,
      inboxCategorization: false,
      crmThreadSync: false,
      note: "Draft, inbox-label, and thread-history automation require Gmail read/draft scopes and are intentionally not implied by the current send-only production provider.",
    },
  };
}

export const __emailWorkflowTest = { baseMessage, validEmail };
