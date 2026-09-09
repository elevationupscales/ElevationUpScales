import assert from "node:assert/strict";
import test from "node:test";
import { publicEmailRoleForPath, rewriteRoleEmailText } from "../site/worker/shared/email-role-surfaces.js";

test("public intent paths select the approved role without adding new aliases", () => {
  assert.equal(publicEmailRoleForPath("/"), "support");
  assert.equal(publicEmailRoleForPath("/store"), "sales");
  assert.equal(publicEmailRoleForPath("/checkout"), "orders");
  assert.equal(publicEmailRoleForPath("/hawaii-lithium-batteries"), "logistics");
  assert.equal(publicEmailRoleForPath("/shipping-logistics-services"), "logistics");
  assert.equal(publicEmailRoleForPath("/work-with-us"), "owner");
});

test("existing owner contact token is replaced only with the intent role", () => {
  assert.equal(rewriteRoleEmailText("mailto:casey@elevationupscales.com", "/", {}), "mailto:support@elevationupscales.com");
  assert.equal(rewriteRoleEmailText("mailto:casey@elevationupscales.com", "/store", {}), "mailto:sales@elevationupscales.com");
  assert.equal(rewriteRoleEmailText("mailto:casey@elevationupscales.com", "/checkout", {}), "mailto:orders@elevationupscales.com");
  assert.equal(rewriteRoleEmailText("mailto:casey@elevationupscales.com", "/hawaii-lithium-batteries", {}), "mailto:logistics@elevationupscales.com");
  assert.equal(rewriteRoleEmailText("mailto:casey@elevationupscales.com", "/work-with-us", {}), "mailto:casey@elevationupscales.com");
});

test("site shell generic contact resolves to support rather than owner", () => {
  const source = 'email: "casey@elevationupscales.com", emailHref: "mailto:casey@elevationupscales.com"';
  const result = rewriteRoleEmailText(source, "/", {});
  assert.equal(result.includes("casey@elevationupscales.com"), false);
  assert.match(result, /support@elevationupscales\.com/);
});
