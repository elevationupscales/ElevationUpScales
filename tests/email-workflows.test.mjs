import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildOrderWorkflowMessage,
  emailWorkflowStatus,
  sendManualRoleMessage,
} from "../site/worker/shared/email-workflows.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const env = {
  MAIL_FROM: "elevationupscales@gmail.com",
  EMAIL_OWNER: "casey@elevationupscales.com",
  EMAIL_SALES: "sales@elevationupscales.com",
  EMAIL_ORDERS: "orders@elevationupscales.com",
  EMAIL_LOGISTICS: "logistics@elevationupscales.com",
  EMAIL_SUPPORT: "support@elevationupscales.com",
};
const order = {
  id: "EUS-STORE-20260909-ABCDEF12",
  productName: "SOK 12V 100Ah Battery",
  quantity: 1,
  totalCents: 89900,
  customer: { email: "buyer@example.com" },
  shipping: { fullName: "Test Buyer" },
  fulfillmentStatus: "shipped",
  trackingNumber: "1ZTEST123",
  carrier: "UPS",
};

const confirmation = buildOrderWorkflowMessage(env, "order_confirmation", order);
assert.equal(confirmation.from.email, "elevationupscales@gmail.com");
assert.equal(confirmation.replyTo, "orders@elevationupscales.com");
assert.equal(confirmation.to.email, "buyer@example.com");
assert.match(confirmation.subject, /EUS-STORE-20260909-ABCDEF12/);
assert.match(confirmation.text, /payment was received/i);
assert.doesNotMatch(confirmation.text, /guaranteed delivery/i);

const shipping = buildOrderWorkflowMessage(env, "shipping_update", order);
assert.equal(shipping.replyTo, "logistics@elevationupscales.com");
assert.match(shipping.text, /1ZTEST123/);
assert.match(shipping.text, /carrier/i);

let sentMessage = null;
const manual = await sendManualRoleMessage({
  ...env,
  EMAIL: { send: async (message) => { sentMessage = message; return { messageId: "msg-test", threadId: "thread-test" }; } },
}, "support", {
  recipientEmail: "customer@example.com",
  recipientName: "Customer",
  reference: "SUP-TEST",
  subject: "Support follow-up",
  body: "Thanks for contacting Elevation.",
});
assert.equal(manual.status, "sent");
assert.equal(manual.messageId, "msg-test");
assert.equal(sentMessage.replyTo, "support@elevationupscales.com");

const status = emailWorkflowStatus({ ...env, EMAIL: { send: async () => ({ messageId: "x" }) } });
assert.equal(status.provider, "configured");
assert.equal(status.roles.orders, "orders@elevationupscales.com");
assert.equal(status.futureCapabilities.gmailDrafts, false);
assert.ok(status.workflows.some((row) => row.key === "order_confirmation" && row.mode === "automatic"));
assert.ok(status.workflows.some((row) => row.key === "sales_follow_up" && row.mode === "admin"));

const operations = read("site/worker/domains/email-operations.js");
assert.match(operations, /requireAdmin\(request, env\)/);
assert.match(operations, /sameOriginRequest\(request\)/);
assert.match(operations, /order\.paymentStatus !== "completed"/);
assert.match(operations, /getOrder\(env, reference\)/);
assert.doesNotMatch(operations, /parsed\.value\.recipientEmail[\s\S]*handleOrderConfirmation/);
assert.match(operations, /confirmationCache\(reference\)/);

const orderAdmin = read("site/store-orders-admin-server.js");
assert.match(orderAdmin, /UPDATE eus_store_orders SET fulfillment_status=/);
assert.match(orderAdmin, /const emailWorkflow = await runEmailWorkflow\(env, previous, order\)/);
assert.ok(orderAdmin.indexOf("UPDATE eus_store_orders SET fulfillment_status=") < orderAdmin.indexOf("const emailWorkflow = await runEmailWorkflow"));
assert.match(orderAdmin, /sendOrderWorkflowMessage\(mailEnv, "shipping_update", order\)/);
assert.match(orderAdmin, /sendOrderWorkflowMessage\(mailEnv, "order_attention", order\)/);
assert.match(orderAdmin, /sendOrderWorkflowMessage\(mailEnv, "refund_update", order\)/);
assert.match(orderAdmin, /sendInternalRoleAlert\(mailEnv, "logistics"/);

const checkoutHook = read("site/store-checkout-email-workflow.js");
assert.match(checkoutHook, /#checkout-success/);
assert.match(checkoutHook, /window\.__EUS_STORE_REFERENCE__/);
assert.match(checkoutHook, /\/api\/email-workflows\/order-confirmation/);
assert.doesNotMatch(checkoutHook, /customer\(\)|checkout-email|recipientEmail/);

const checkoutHtml = read("site/checkout/index.html");
assert.match(checkoutHtml, /store-checkout-email-workflow\.js/);

const workerCore = read("site/worker-core.js");
assert.match(workerCore, /handleAdminEmailOperations/);
assert.match(workerCore, /handleOrderConfirmation/);
assert.match(workerCore, /EMAIL_ORDER_CONFIRMATION_PATH/);
assert.match(workerCore, /ADMIN_EMAIL_OPERATIONS_PATH/);

const adminHtml = read("site/admin-email.html");
assert.match(adminHtml, /Email Operations/);
assert.doesNotMatch(adminHtml, /GOOGLE_CLIENT_SECRET|GOOGLE_REFRESH_TOKEN|PAYPAL_CLIENT_SECRET/);

console.log("email-workflows.test.mjs: PASS");
