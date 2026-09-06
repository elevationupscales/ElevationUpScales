import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const home = read("site/index.html");
const logistics = read("site/shipping-logistics-services.html");
const hawaii = read("site/hawaii-lithium-batteries.html");
const sok = read("site/sok-batteries.html");
const order = read("site/sok-order.html");
const orderJs = read("site/sok-order.js");
const analytics = read("site/home-commerce.js");

assert.ok(home.includes("Lithium Energy<br><span>for RV Life.</span>"), "final hero copy missing");
for (const source of [home, logistics, hawaii, sok]) {
  assert.equal(source.toLowerCase().includes("start with what you need"), false, "removed owner copy returned");
}
assert.ok(home.includes("Elevated Logistics for Product Supply Lines"), "approved logistics headline missing from homepage");
assert.ok(logistics.includes("Elevated Logistics for Product Supply Lines"), "approved logistics headline missing from logistics page");
assert.equal(logistics.includes("Coming Soon"), false, "thin Coming Soon logistics page returned");

for (const token of ["Hawaii", "Alaska"]) {
  assert.ok(home.includes(token), `homepage must expose ${token}`);
  assert.ok(logistics.includes(token), `logistics page must expose ${token}`);
}
assert.ok(logistics.includes('id="alaska"'), "Alaska destination anchor missing");
assert.ok(logistics.includes("does not override Catalog, supplier, inventory, MAP, carrier, dangerous-goods or Hawaii route controls"), "logistics protection disclosure missing");

for (const sku of ["SK12V100PC", "SK48V100N"]) {
  assert.ok(hawaii.includes(sku), `Hawaii page missing ${sku}`);
  assert.ok(hawaii.includes(`sku=${sku}&amp;intent=hawaii&amp;state=HI`), `Hawaii Purchase Options link missing for ${sku}`);
}
assert.ok(hawaii.includes("1–3"), "Hawaii 1–3 standard quantity rule missing");
assert.ok(hawaii.includes("Quantity 4+"), "Hawaii 4+ commercial rule missing");
assert.equal(hawaii.includes("data-hawaii-request-form"), false, "legacy parallel Hawaii request form returned");
assert.equal(hawaii.includes("hawaii-lithium-program.js"), false, "legacy Hawaii parallel storefront runtime returned");
assert.ok(hawaii.includes("/sok-batteries"), "Hawaii page must route back to current SOK catalog");
assert.ok(order.includes("quantity 4+ routes automatically to commercial review"), "SOK Purchase Options quantity rule changed unexpectedly");
assert.ok(orderJs.includes('intent === "hawaii"'), "SOK Hawaii Purchase Options controller missing");

assert.ok(sok.includes("Hawaii, Alaska and commercial support"), "SOK catalog destination exposure missing");
assert.ok(sok.includes("/shipping-logistics-services#alaska"), "SOK Alaska route missing");
assert.ok(analytics.includes('sourceControl:"static-logistics"'), "redesign analytics static logistics reconciliation missing");
assert.ok(home.includes('data-eus-event="start_project_open"'), "homepage project analytics remains misclassified");
assert.ok(home.includes('data-eus-value="alaska"'), "homepage Alaska route analytics missing");

console.log("FINAL-CLOSEOUT-0906 owner copy/logistics/Hawaii/Alaska/analytics contract: PASS");
