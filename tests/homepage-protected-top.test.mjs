import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const index = fs.readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
const homeCommerce = fs.readFileSync(new URL("../site/home-commerce.js", import.meta.url), "utf8");

test("protected homepage top stays authored in index.html and is not rewritten by commerce runtime", () => {
  assert.match(index, /class="campaign-hero__lead">Shop the products Elevation is actively building around: SOK lithium, Renogy solar, Olight professional lighting and complete off-grid power systems\.<\/p>/);
  assert.match(index, /class="campaign-btn campaign-btn--primary"[^>]*href="https:\/\/shop\.elevationupscales\.com\/collections\/all"[^>]*>Shop Products/);
  assert.match(index, /class="campaign-btn campaign-btn--secondary"[^>]*href="\/start-a-project"[^>]*>Start a Project/);

  assert.doesNotMatch(homeCommerce, /reference-storefront-hero__lead/);
  assert.doesNotMatch(homeCommerce, /reference-storefront-hero__primary/);
  assert.doesNotMatch(homeCommerce, /\bMISSION\b/);
});
