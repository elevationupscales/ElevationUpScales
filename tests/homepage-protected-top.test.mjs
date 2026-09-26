import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const index = fs.readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
const homeCommerce = fs.readFileSync(new URL("../site/home-commerce.js", import.meta.url), "utf8");

test("protected homepage top stays authored in index.html and is not rewritten by commerce runtime", () => {
  assert.match(index, /class="campaign-hero__lead">Shop SOK lithium batteries, Renogy solar, Olight professional lighting and complete off-grid power systems from Elevation UpScales\.<\/p>/);
  assert.match(index, /class="campaign-btn campaign-btn--primary"[^>]*href="https:\/\/shop\.elevationupscales\.com\/collections\/all"[^>]*>Shop Products/);
  assert.match(index, /class="campaign-btn campaign-btn--secondary"[^>]*href="https:\/\/shop\.elevationupscales\.com\/collections\/sok-battery"[^>]*>Shop Lithium/);
  assert.match(index, /href="\/start-a-project"[^>]*data-eus-event="start_project_open"/);

  assert.doesNotMatch(homeCommerce, /reference-storefront-hero__lead/);
  assert.doesNotMatch(homeCommerce, /reference-storefront-hero__primary/);
  assert.doesNotMatch(homeCommerce, /\bMISSION\b/);
});
