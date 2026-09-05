import assert from "node:assert/strict";
import fs from "node:fs";
import {
  PROMOTION_APPROVED_DEFAULTS,
  protectedLithiumPricing,
  applyCoupon,
  pricingForProduct,
  isActualLithiumBattery,
  batteryUnitsPerCatalogUnit,
} from "../../site/promotion-runtime.js";
import { classifySokHawaiiQuantity, HAWAII_OPERATIONAL_MAX_QTY } from "../../site/sok-operations-runtime.js";
import { SOK_FULL_LINE_PUBLIC } from "../../site/sok-full-line-data.js";

const activeConfig = Object.freeze({
  available: true,
  active: true,
  manualActive: true,
  couponCode: "LABORDAY25",
  couponPercent: 25,
  everydayMarkupPercent: 35,
  promoMarkupPercent: 60,
  batteryShippingCents: 2799,
  eligibleSections: ["lithium-batteries", "rv-outdoor"],
  exclusions: PROMOTION_APPROVED_DEFAULTS.exclusions,
});

assert.equal(PROMOTION_APPROVED_DEFAULTS.couponCode, "LABORDAY25");
assert.equal(PROMOTION_APPROVED_DEFAULTS.couponPercent, 25);
assert.deepEqual(PROMOTION_APPROVED_DEFAULTS.eligibleSections, ["lithium-batteries", "rv-outdoor"]);
assert.ok(PROMOTION_APPROVED_DEFAULTS.exclusions.includes("Hawaii freight quotes"));
assert.ok(PROMOTION_APPROVED_DEFAULTS.exclusions.includes("Marketplace/community listings"));
assert.ok(PROMOTION_APPROVED_DEFAULTS.exclusions.includes("Apparel/provider-controlled products"));

const floor = protectedLithiumPricing(10_000, 25);
assert.deepEqual(floor, { listCents: 16_000, promoFloorCents: 12_000 });

const coupon = applyCoupon({ couponCode: "LABORDAY25", listMerchandiseCents: 16_000, eligible: true, config: activeConfig });
assert.equal(coupon.ok, true);
assert.equal(coupon.discountCents, 4_000);
assert.equal(coupon.merchandiseCents, 12_000);
assert.equal(coupon.couponPercent, 25);

const stacked = applyCoupon({ couponCode: "LABORDAY25,OTHER", listMerchandiseCents: 16_000, eligible: true, config: activeConfig });
assert.equal(stacked.ok, false);
assert.equal(stacked.status, 400);
assert.match(stacked.error, /stacking/i);

const ineligible = applyCoupon({ couponCode: "LABORDAY25", listMerchandiseCents: 16_000, eligible: false, config: activeConfig });
assert.equal(ineligible.ok, false);
assert.equal(ineligible.status, 409);

const inactive = applyCoupon({ couponCode: "LABORDAY25", listMerchandiseCents: 16_000, eligible: true, config: { ...activeConfig, active: false } });
assert.equal(inactive.ok, false);
assert.equal(inactive.status, 409);

const protectedLithium = pricingForProduct({
  title: "12V 100Ah LiFePO4 Battery",
  supplier: "doba",
  supplierCostCents: 10_000,
  priceCents: 13_500,
  storeSection: "lithium-batteries",
}, activeConfig);
assert.equal(protectedLithium.priceCents, 16_000);
assert.equal(protectedLithium.promotion.eligible, true);
assert.equal(protectedLithium.promotion.couponEligible, true);
assert.equal(protectedLithium.promotion.couponPriceCents, 12_000);
assert.equal(protectedLithium.promotion.protectedFloorApplied, true);

const apparel = pricingForProduct({
  title: "Elevation Shirt",
  supplier: "fourthwall",
  supplierCostCents: 1_000,
  priceCents: 2_500,
  storeSection: "apparel",
}, activeConfig);
assert.equal(apparel.priceCents, 2_500);
assert.equal(apparel.promotion.eligible, false);
assert.equal(apparel.promotion.couponEligible, false);

assert.equal(isActualLithiumBattery({ storeSection: "lithium-batteries", title: "12V 100Ah LiFePO4 Battery" }), true);
assert.equal(isActualLithiumBattery({ storeSection: "lithium-batteries", title: "12V Battery Box Case" }), false);
assert.equal(isActualLithiumBattery({ storeSection: "lithium-batteries", title: "Portable Power Bank 20000mAh" }), false);
assert.equal(batteryUnitsPerCatalogUnit({ storeSection: "lithium-batteries", title: "2-Pack 12V 100Ah LiFePO4 Battery" }), 2);

assert.equal(HAWAII_OPERATIONAL_MAX_QTY, 3);
for (const quantity of [1, 2, 3]) {
  const result = classifySokHawaiiQuantity(quantity);
  assert.equal(result.standard, true);
  assert.equal(result.commercial, false);
}
const commercial = classifySokHawaiiQuantity(4);
assert.equal(commercial.standard, false);
assert.equal(commercial.commercial, true);
assert.equal(commercial.maxStandardQuantity, 3);

for (const product of SOK_FULL_LINE_PUBLIC) {
  if (product.batteryRelevant) {
    assert.match(product.hawaiiUrl, /intent=hawaii/);
  } else {
    assert.equal(product.hawaiiUrl, "");
  }
  if (product.publicPurchaseMode === "COMMERCIAL_ONLY") {
    assert.match(product.commercialUrl, /intent=commercial/);
  }
}

const promotionSource = fs.readFileSync("site/promotion-runtime.js", "utf8");
assert.match(promotionSource, /PROMOTION_START_AT="2026-09-03T06:00:00\.000Z"/);
assert.match(promotionSource, /PROMOTION_END_AT="2026-09-08T06:00:00\.000Z"/);
assert.match(promotionSource, /shippingDiscounted:false/);

const checkoutSource = fs.readFileSync("site/store-checkout-server.js", "utf8");
for (const token of [
  "https://api-m.sandbox.paypal.com",
  "https://api-m.paypal.com",
  "PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_SECRET",
  "STORE_LIVE_CHECKOUT_ENABLED",
  '"PayPal-Request-Id"',
  "ensureCommerceSchema",
  "eus_store_orders",
  "shippingVerified",
  "evaluateSokHawaiiOrder",
  "applyCoupon",
  "paypal_order_id",
  "paypal_capture_id",
]) assert.ok(checkoutSource.includes(token), `checkout contract missing ${token}`);
assert.match(checkoutSource, /PAYPAL_ENV[^\n]{0,120}live[^\n]{0,120}sandbox/);
assert.match(checkoutSource, /WHERE paypal_order_id=\?/);
assert.equal(checkoutSource.includes("HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY"), false, "retired fixed Hawaii freight constant must not return");
assert.equal(checkoutSource.includes("HAWAII_PREFERRED_CONSOLIDATION_UNITS"), false, "unused checkout-local Hawaii consolidation constant must not return");
assert.equal(checkoutSource.includes("9900"), false, "retired $99 Hawaii freight fallback must not return to checkout source");

const customerSafeFiles = [
  "site/store-checkout-server.js",
  "site/store-checkout.js",
  "site/sok-order.js",
  "site/sok-order.html",
  "site/sok-full-line-runtime.js",
  "site/hawaii-lithium-runtime.js",
].map((file) => fs.readFileSync(file, "utf8")).join("\n");
for (const retired of ["$99/battery", "$99 per battery", "Included Freight", "Included Honolulu freight"]) {
  assert.equal(customerSafeFiles.includes(retired), false, `retired Hawaii freight claim found: ${retired}`);
}

console.log("WEB-COM-0905-01 non-destructive commerce regression: PASS");
console.log("PayPal sandbox create/capture: NOT VERIFIED by this static gate; requires credentialed isolated preview.");
