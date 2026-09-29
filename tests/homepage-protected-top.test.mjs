import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const index = fs.readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
const homeCommerce = fs.readFileSync(new URL("../site/home-commerce.js", import.meta.url), "utf8");

test("homepage top stays store-first and Hawaii-focused without project intake", () => {
  assert.match(index, /class="retail-home-hero"/);
  assert.match(index, /href="https:\/\/shop\.elevationupscales\.com\/"[^>]*>Shop the Store<\/a>/);
  assert.match(index, /href="\/hawaii-lithium-batteries"[^>]*>Hawaii Lithium Freight<\/a>/);
  assert.doesNotMatch(index, /href="\/start-a-project"[^>]*>Start a Project<\/a>/);

  assert.doesNotMatch(homeCommerce, /reference-storefront-hero__lead/);
  assert.doesNotMatch(homeCommerce, /reference-storefront-hero__primary/);
  assert.doesNotMatch(homeCommerce, /\bMISSION\b/);
});
