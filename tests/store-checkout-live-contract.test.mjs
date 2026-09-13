import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const checkoutHtml = fs.readFileSync("site/checkout/index.html", "utf8");
const clientGuardSource = fs.readFileSync("site/store-direct-buy-payment-hotfix.js", "utf8");

test("direct Elevation checkout cannot expose the retired Shopify card cross-route", () => {
  assert.doesNotMatch(checkoutHtml, /checkout-shopify-direct/i);
  assert.doesNotMatch(checkoutHtml, /Pay by Card/i);
  assert.doesNotMatch(checkoutHtml, /myshopify\.com/i);
  assert.doesNotMatch(clientGuardSource, /myshopify\.com/i);
  assert.doesNotMatch(clientGuardSource, /SHOPIFY_VARIANT_ID/);
});

test("checkout loads the cache-busted verification guard", () => {
  assert.match(checkoutHtml, /store-direct-buy-payment-hotfix\.js\?v=20260912-3/);
  assert.match(clientGuardSource, /Verify before payment/);
  assert.match(clientGuardSource, /Review full product details/);
  assert.match(clientGuardSource, /Product \/ model/);
  assert.match(clientGuardSource, /Brand \/ supplier/);
});

test("SOK review links resolve to canonical SOK product pages instead of retired generic product routes", () => {
  assert.match(clientGuardSource, /isSok/);
  assert.match(clientGuardSource, /`\/sok\/\$\{encodeURIComponent\(normalizedId\.slice\(4\)\)\}\/`/);
  assert.doesNotMatch(clientGuardSource, /`\/product\?id=/);
});

test("generic standard-item label is replaced with a model-aware checkout label", () => {
  assert.match(clientGuardSource, /Standard configuration/);
  assert.match(clientGuardSource, /productReference/);
});
