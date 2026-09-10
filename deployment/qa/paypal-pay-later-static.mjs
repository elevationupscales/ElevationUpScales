import assert from "node:assert/strict";
import fs from "node:fs";

const checkoutClient = fs.readFileSync("site/store-checkout.js", "utf8");
const checkoutServer = fs.readFileSync("site/store-checkout-server.js", "utf8");
const checkoutHtml = fs.readFileSync("site/checkout/index.html", "utf8");

// Elevation uses PayPal JavaScript SDK Smart Buttons. The default Buttons
// integration delegates funding eligibility to PayPal and renders the eligible
// funding sources PayPal returns for the current buyer/merchant/transaction.
assert.match(checkoutClient, /https:\/\/www\.paypal\.com\/sdk\/js\?/);
assert.match(checkoutClient, /components=buttons/);
assert.match(checkoutClient, /paypalButtons\s*=\s*window\.paypal\.Buttons\(\{/);
assert.match(checkoutClient, /layout:\s*"vertical"/);

// The existing default Smart Buttons instance must remain unrestricted so it
// can render Pay Later whenever PayPal reports that funding source eligible.
const buttonsStart = checkoutClient.indexOf("paypalButtons = window.paypal.Buttons({");
const buttonsEnd = checkoutClient.indexOf("paypalEl.hidden = false", buttonsStart);
assert.ok(buttonsStart >= 0 && buttonsEnd > buttonsStart, "default PayPal Smart Buttons block must be discoverable");
const defaultButtonsBlock = checkoutClient.slice(buttonsStart, buttonsEnd);
assert.equal(/fundingSource\s*:/.test(defaultButtonsBlock), false, "default Smart Buttons must not be narrowed to one funding source");
assert.equal(/disable-funding=[^\s"'`]*paylater/i.test(checkoutClient), false, "Pay Later must not be disabled in the SDK request");

// Pay Later is a funding option only. It must use the same create/capture path
// and must not introduce a separate order or fulfillment workflow.
assert.match(defaultButtonsBlock, /fetch\("\/api\/store-checkout\/orders"/);
assert.match(defaultButtonsBlock, /\/api\/store-checkout\/orders\/\$\{encodeURIComponent\(data\.orderID\)\}\/capture/);
assert.match(checkoutServer, /PAYPAL_SANDBOX_ORIGIN/);
assert.match(checkoutServer, /PAYPAL_LIVE_ORIGIN/);
assert.match(checkoutServer, /STORE_LIVE_CHECKOUT_ENABLED/);
assert.match(checkoutServer, /paypal_order_id/);
assert.match(checkoutServer, /paypal_capture_id/);
assert.equal(/paylater_order|pay_later_order|paylater_fulfillment|pay_later_fulfillment/i.test(`${checkoutClient}\n${checkoutServer}`), false, "Pay Later must not become a separate order or fulfillment type");

// Existing product, amount, geography, and SOK gates remain authoritative.
for (const token of [
  "applyCoupon",
  "getSokCheckoutEntry",
  "evaluateSokHawaiiOrder",
  "resolveShippingRule",
  "ensureCommerceSchema",
]) {
  assert.ok(checkoutServer.includes(token), `checkout safety contract missing ${token}`);
}

// Customer-facing checkout must not make financing approval or term promises.
for (const prohibited of [
  /everyone qualifies/i,
  /guaranteed financing/i,
  /guaranteed approval/i,
  /guaranteed installment/i,
]) {
  assert.equal(prohibited.test(checkoutHtml), false, `unsupported financing promise found: ${prohibited}`);
}

console.log("PAYPAL-PAY-LATER-0910 static eligibility/fallback contract: PASS");
console.log("Runtime Pay Later presentation remains PayPal-controlled and must be verified with an eligible PayPal sandbox/production context; no transaction is simulated by this gate.");
