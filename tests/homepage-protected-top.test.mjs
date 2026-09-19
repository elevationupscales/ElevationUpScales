import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const index = fs.readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
const homeCommerce = fs.readFileSync(new URL("../site/home-commerce.js", import.meta.url), "utf8");

test("protected homepage top stays authored in index.html and is not rewritten by commerce runtime", () => {
  assert.match(index, /class="reference-storefront-hero__lead">Shop authorized power products through the Elevation online store, start a project, or get help planning systems and moving lithium into harder-to-serve destinations\.<\/p>/);
  assert.match(index, /class="button retail-primary reference-storefront-hero__primary"[^>]*href="\/start-a-project"[^>]*>Start a Project/);

  assert.doesNotMatch(homeCommerce, /reference-storefront-hero__lead/);
  assert.doesNotMatch(homeCommerce, /reference-storefront-hero__primary/);
  assert.doesNotMatch(homeCommerce, /\bMISSION\b/);
});
