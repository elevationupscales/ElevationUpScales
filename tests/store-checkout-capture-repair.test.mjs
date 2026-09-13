import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const repairSource = fs.readFileSync("site/store-checkout-server.js", "utf8");
const clientGuardSource = fs.readFileSync("site/store-direct-buy-payment-hotfix.js", "utf8");

test("capture repair requires a matching local order before PayPal capture", () => {
  const lookup = repairSource.indexOf("loadStoreOrder(db, id)");
  const capture = repairSource.indexOf("paypalCaptureRequest(env, id");
  assert.ok(lookup > -1, "local order lookup missing");
  assert.ok(capture > lookup, "PayPal capture must happen after local order lookup");
  assert.match(repairSource, /No matching Elevation order exists for this PayPal order/);
  assert.match(repairSource, /localStatus !== "CREATED"/);
});

test("capture repair uses a stable PayPal request id and prevents duplicate capture", async () => {
  const module = await import("../site/store-checkout-server.js");
  const helpers = module.__storeCheckoutCaptureRepairTest;
  const order = { id: "EUS-STORE-20260912-ABC12345" };
  assert.equal(helpers.captureRequestId(order), helpers.captureRequestId(order));
  assert.equal(helpers.captureRequestId(order), "EUS-CAPTURE-EUS-STORE-20260912-ABC12345");
  assert.match(repairSource, /alreadyCaptured: true/);
  assert.match(repairSource, /PayPal-Request-Id/);
});

test("capture repair reconciles amount, currency and completed status before paid state", async () => {
  const module = await import("../site/store-checkout-server.js");
  const helpers = module.__storeCheckoutCaptureRepairTest;
  assert.equal(helpers.paypalMoneyToCents("319.00"), 31900);
  assert.equal(helpers.paypalMoneyToCents("319.9"), 31990);
  assert.equal(helpers.paypalMoneyToCents("319.999"), null);
  assert.match(repairSource, /capturedCents === expectedCents/);
  assert.match(repairSource, /currency === DEFAULT_CURRENCY/);
  assert.match(repairSource, /orderStatus === "COMPLETED"/);
  assert.match(repairSource, /captureStatus === "COMPLETED"/);
  assert.match(repairSource, /RECONCILIATION_HOLD/);
});

test("direct-site payment guard does not expose the old Shopify card fallback", () => {
  assert.doesNotMatch(clientGuardSource, /myshopify\.com/);
  assert.doesNotMatch(clientGuardSource, /SHOPIFY_VARIANT_ID/);
  assert.match(clientGuardSource, /former SOK -> Shopify card fallback is intentionally disabled/);
  assert.match(clientGuardSource, /Review full product details/);
});
