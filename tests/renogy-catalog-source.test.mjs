import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const html = fs.readFileSync(new URL("../site/admin-catalog.html", import.meta.url), "utf8");
const js = fs.readFileSync(new URL("../site/admin-catalog.js", import.meta.url), "utf8");

test("Renogy is available as a first-class catalog source without marketplace expansion", () => {
  assert.match(html, /data-source-open="renogy"/);
  assert.match(html, /<select id="bulk-source">[\s\S]*?<option value="renogy">Renogy<\/option>/);
  assert.match(html, /<select id="single-source">[\s\S]*?<option value="renogy">Renogy<\/option>/);
  assert.match(html, /<select id="single-supplier">[\s\S]*?<option value="renogy">Renogy<\/option>/);
  assert.match(html, /<select id="catalog-source-filter">[\s\S]*?<option value="renogy">Renogy<\/option>/);

  // Generic supplier imports default to Elevation's own website only. Renogy uses
  // this path until a supplier-provided source package is normalized.
  assert.match(js, /source==="fourthwall"\?\["website","fourthwall"\]:\["website"\]/);
  assert.doesNotMatch(html, /data-source-open="renogy"[^>]*>[^<]*<(?:strong|span)[^>]*>[^<]*(?:eBay|TikTok|Amazon|Walmart)/i);
});
