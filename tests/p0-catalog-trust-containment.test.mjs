import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const routes = JSON.parse(readFileSync(new URL("../site/_routes.json", import.meta.url), "utf8"));
const storeJs = readFileSync(new URL("../site/universal-store.js", import.meta.url), "utf8");
const homeJs = readFileSync(new URL("../site/home-commerce.js", import.meta.url), "utf8");
const storeHtml = readFileSync(new URL("../site/store.html", import.meta.url), "utf8");

const requiredQuarantine = [
  "/api/store-catalog",
  "/api/store/catalog",
  "/api/store/featured",
];

const blockedMediaMarkers = [
  "walmartimages.com",
  "walmart.com",
  "lowes.com",
  "alicdn.com",
  "alibaba.com",
  "utedusjer.no",
];

test("P0 legacy catalog APIs fail closed at the Pages route boundary", () => {
  assert.ok(routes.include.includes("/api/*"), "API worker routing must remain enabled for trusted APIs");
  for (const path of requiredQuarantine) {
    assert.ok(routes.exclude.includes(path), `${path} must stay quarantined during coding stabilization`);
  }
});

test("customer-facing product renderers retain blocked-media defense in depth", () => {
  for (const marker of blockedMediaMarkers) {
    assert.match(storeJs, new RegExp(marker.replaceAll(".", "\\.")), `store renderer must block ${marker}`);
    assert.match(homeJs, new RegExp(marker.replaceAll(".", "\\.")), `homepage renderer must block ${marker}`);
  }
});

test("trusted SOK cards use dedicated detail and purchase routes", () => {
  assert.match(storeJs, /providedDetail\.startsWith\("\/sok\/"\)/);
  assert.match(storeJs, /p\.sokProduct&&purchase\?purchase/);
  assert.match(storeJs, /Availability is confirmed as part of your order\./);
  assert.doesNotMatch(storeJs, /Supplier availability is validated before fulfillment\./);
});

test("store containment script is cache-busted", () => {
  assert.match(storeHtml, /universal-store\.js\?v=1\.0\.2-p0/);
});
