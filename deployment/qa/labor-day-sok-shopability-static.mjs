import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${message}`);
  }
};

const staticProduct = read("site/sok-static-product.js");
const collection = read("site/sok-batteries.js");
const shopabilityCss = read("site/sok-shopability.css");
const checkout = read("site/store-checkout-server.js");
const promotion = read("site/promotion-runtime.js");
const fullLine = read("site/sok-full-line-data.js");

assert(staticProduct.includes("/api/sok/catalog"), "SOK product pages load the public catalog for related-product navigation");
assert(staticProduct.includes("sok-category-links"), "SOK product pages add category navigation");
assert(staticProduct.includes("sok-related-grid"), "SOK product pages add related-product merchandising");
assert(staticProduct.includes("Verify final system compatibility before ordering"), "related products carry a compatibility disclaimer");
assert(staticProduct.includes('cache:"no-store"'), "SOK product shopability reads current catalog state");
assert(!/supplierCost|wholesale|sourceType|sourceUrl|supplierStock/i.test(staticProduct), "SOK product enhancement does not expose internal supplier fields");

assert(collection.includes("URLSearchParams(location.search)"), "SOK collection supports deep-linked shopping filters");
assert(collection.includes("sok-card__uses"), "SOK collection exposes best-for merchandising");
assert(collection.includes("sok-card__media-strip"), "SOK collection displays additional approved media when available");
assert(collection.includes("history.replaceState"), "SOK filter navigation remains shareable without page reload");

assert(shopabilityCss.includes(".sok-related-grid"), "SOK related-product layout is styled");
assert(shopabilityCss.includes("@media(max-width:700px)"), "SOK shopability has mobile layout rules");

assert(checkout.includes("PAYPAL_SANDBOX_ORIGIN"), "PayPal sandbox origin remains present");
assert(checkout.includes("PAYPAL_LIVE_ORIGIN"), "PayPal live origin remains present");
assert(checkout.includes("STORE_LIVE_CHECKOUT_ENABLED"), "real-money checkout retains the explicit live gate");
assert(checkout.includes("getSokCheckoutEntry"), "checkout retains SOK eligibility lookup");
assert(checkout.includes("evaluateSokHawaiiOrder"), "checkout retains Hawaii SOK routing evaluation");
assert(checkout.includes("applyCoupon"), "checkout applies server-side promotion validation");

assert(promotion.includes('couponCode:"LABORDAY25"'), "Labor Day coupon remains LABORDAY25");
assert(promotion.includes("couponPercent:25"), "Labor Day merchandise discount remains 25 percent");
assert(promotion.includes('PROMOTION_END_AT="2026-09-08T06:00:00.000Z"'), "Labor Day window still ends September 8 at midnight America/Denver");
assert(promotion.includes("Discount stacking is not allowed"), "coupon stacking remains rejected");
assert(promotion.includes("protectedLithiumPricing"), "protected lithium pricing floor remains enforced");

assert(fullLine.includes('publicPurchaseMode:"PURCHASE_OPTIONS"'), "SOK catalog retains assisted purchase modes");
assert(fullLine.includes("paymentEligible:false"), "SOK full-line default remains payment-ineligible until explicitly qualified");
assert(fullLine.includes("hawaiiStatus"), "SOK full-line data retains Hawaii status routing");

if (process.exitCode) {
  console.error("Labor Day SOK shopability / PayPal static gate FAILED");
} else {
  console.log("Labor Day SOK shopability / PayPal static gate PASS");
}
