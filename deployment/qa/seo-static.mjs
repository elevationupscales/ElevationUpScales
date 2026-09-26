import fs from "node:fs";
import assert from "node:assert/strict";

const worker = fs.readFileSync("site/_worker.js", "utf8");
const headers = fs.readFileSync("site/_headers", "utf8");
const robots = fs.readFileSync("site/robots.txt", "utf8");
const sitemap = fs.readFileSync("site/sitemap.xml", "utf8");
const routes = fs.readFileSync("site/_routes.json", "utf8");

assert.ok(worker.includes('hostname.endsWith(".pages.dev")'), "Pages preview hostname SEO gate missing");
assert.ok(worker.includes('headers.set("X-Robots-Tag","noindex, nofollow, noarchive")'), "Pages preview noindex header missing");
assert.ok(worker.includes("return previewSeoResponse(request,response);"), "final static response must pass through preview SEO guard");
assert.ok(worker.includes("return previewSeoResponse(request,page);"), "dynamic SOK page must pass through preview SEO guard");

const globalHeaderBlock = headers.split(/\n\s*\n/)[0];
assert.equal(globalHeaderBlock.includes("X-Robots-Tag"), false, "global noindex must never be applied to the production site");
assert.ok(robots.includes("Sitemap: https://elevationupscales.com/sitemap.xml"), "production sitemap declaration missing");
for (const route of ["/vendors", "/vendor/*", "/commercial"]) assert.ok(routes.includes(`"${route}"`), `directory-index route ${route} must pass through preview SEO guard`);
assert.ok(sitemap.includes("<loc>https://elevationupscales.com/lithium-batteries</loc>"), "lithium storefront sitemap entry missing");
assert.ok(sitemap.includes("<loc>https://elevationupscales.com/rv-store</loc>"), "RV storefront sitemap entry missing");

for (const file of ["site/product.html", "site/sok-order.html", "site/checkout/index.html"]) {
  const html = fs.readFileSync(file, "utf8");
  assert.ok(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html), `${file}: utility noindex missing`);
}

const keyPages = [
  ["site/sok-batteries.html", "https://elevationupscales.com/sok-batteries"],
  ["site/hawaii-lithium-batteries.html", "https://elevationupscales.com/hawaii-lithium-batteries"],
  ["site/shipping-logistics-services.html", "https://elevationupscales.com/shipping-logistics-services"],
  ["site/vendors/index.html", "https://elevationupscales.com/vendors"],
  ["site/vendor/olight/index.html", "https://elevationupscales.com/vendor/olight"],
  ["site/vendor/sok-energy/index.html", "https://elevationupscales.com/vendor/sok-energy"],
  ["site/vendor/renogy/index.html", "https://elevationupscales.com/vendor/renogy"],
  ["site/vendor/sungoldpower/index.html", "https://elevationupscales.com/vendor/sungoldpower"],
  ["site/commercial/index.html", "https://elevationupscales.com/commercial"],
];

for (const [file, canonical] of keyPages) {
  const html = fs.readFileSync(file, "utf8");
  assert.ok(/<title>[^<]{8,}<\/title>/i.test(html), `${file}: meaningful title missing`);
  assert.ok(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{50,}/i.test(html) || /<meta[^>]+content=["'][^"']{50,}["'][^>]+name=["']description["']/i.test(html), `${file}: meta description missing or too short`);
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`) || html.includes(`<link href="${canonical}" rel="canonical">`), `${file}: canonical mismatch`);
  assert.ok(/<h1\b/i.test(html), `${file}: h1 missing`);
  assert.ok(html.includes('property="og:title"'), `${file}: Open Graph title missing`);
  assert.ok(html.includes('property="og:description"'), `${file}: Open Graph description missing`);
  assert.ok(html.includes('property="og:image"'), `${file}: Open Graph image missing`);
  assert.ok(html.includes('name="twitter:card"'), `${file}: Twitter card metadata missing`);
  assert.ok(html.includes('application/ld+json'), `${file}: structured data missing`);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${file}: sitemap entry missing`);
}

const productRuntime = fs.readFileSync("site/sok-full-line-runtime.js", "utf8");
assert.ok(productRuntime.includes('"@type":"Product"'), "SOK product Product schema missing");
assert.ok(productRuntime.includes('property="og:type" content="product"'), "SOK product Open Graph product metadata missing");
assert.ok(productRuntime.includes("const canonical="), "SOK product canonical construction missing");

console.log("SEO static checks passed");
