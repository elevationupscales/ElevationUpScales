import fs from "node:fs";
import assert from "node:assert/strict";

const worker = fs.readFileSync("site/_worker.js", "utf8");
const headers = fs.readFileSync("site/_headers", "utf8");
const robots = fs.readFileSync("site/robots.txt", "utf8");
const sitemap = fs.readFileSync("site/sitemap.xml", "utf8");
const routes = fs.readFileSync("site/_routes.json", "utf8");
const home = fs.readFileSync("site/index.html", "utf8");
const manifest = fs.readFileSync("site/site.webmanifest", "utf8");

assert.ok(worker.includes('hostname.endsWith(".pages.dev")'), "Pages preview hostname SEO gate missing");
assert.ok(worker.includes('headers.set("X-Robots-Tag","noindex, nofollow, noarchive")'), "Pages preview noindex header missing");
assert.ok(worker.includes("return previewSeoResponse(request,response);"), "final static response must pass through preview SEO guard");
assert.ok(worker.includes("return previewSeoResponse(request,page);"), "dynamic SOK page must pass through preview SEO guard");

const globalHeaderBlock = headers.split(/\n\s*\n/)[0];
assert.equal(globalHeaderBlock.includes("X-Robots-Tag"), false, "global noindex must never be applied to production");
assert.ok(globalHeaderBlock.includes("media-src 'self' https://cdn.shopify.com https://shop.elevationupscales.com"), "CSP must allow Shopify-hosted campaign video");
assert.ok(robots.includes("Sitemap: https://elevationupscales.com/sitemap.xml"), "production sitemap declaration missing");
for (const route of ["/vendors", "/vendor/*", "/commercial", "/custom-order", "/launch/osight-r"]) assert.ok(routes.includes(`"${route}"`), `public route ${route} must pass through preview SEO guard`);
for (const canonical of ["https://elevationupscales.com/vendors","https://elevationupscales.com/vendor/olight","https://elevationupscales.com/commercial","https://elevationupscales.com/custom-order","https://elevationupscales.com/launch/osight-r"]) {
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap entry missing: ${canonical}`);
}
for (const retiredRetailCanonical of ["https://elevationupscales.com/store","https://elevationupscales.com/rv-store","https://elevationupscales.com/lithium-batteries"]) {
  assert.equal(sitemap.includes(`<loc>${retiredRetailCanonical}</loc>`), false, `legacy/redirecting retail URL must stay out of sitemap: ${retiredRetailCanonical}`);
}
const legacyStore = fs.readFileSync("site/store.html", "utf8");
assert.ok(/<meta[^>]+name=["']robots["'][^>]+content=["']noindex,follow["']/i.test(legacyStore), "legacy main-domain store must remain noindex,follow");
assert.ok(headers.includes("/store\n  Cache-Control: no-cache, no-store, must-revalidate\n  X-Robots-Tag: noindex, follow"), "legacy /store X-Robots-Tag missing");
assert.ok(fs.readFileSync("site/_redirects","utf8").includes("/favicon.ico /assets/favicon.png 301"), "root favicon fallback redirect missing");

for (const file of ["site/product.html", "site/sok-order.html", "site/checkout/index.html"]) {
  const html = fs.readFileSync(file, "utf8");
  assert.ok(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html), `${file}: utility noindex missing`);
}
assert.ok(home.includes("<title>Lithium Batteries, Solar & Olight Gear | Elevation UpScales</title>"), "homepage SEO title missing");
assert.ok(home.includes('name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"'), "homepage robots directive missing");
assert.ok(home.includes('property="og:image:alt"'), "homepage Open Graph image alt missing");
assert.ok(home.includes('name="twitter:image:alt"'), "homepage Twitter image alt missing");
assert.ok(home.includes('"@type":"WebSite"'), "homepage WebSite schema missing");
assert.ok(home.includes('"@type":"WebPage"'), "homepage WebPage schema missing");
assert.ok(home.includes('"@type":"ItemList"'), "homepage featured-product ItemList schema missing");
assert.ok(home.includes('https://shop.elevationupscales.com/collections/olight'), "homepage Olight store route missing");
assert.ok(home.includes('href="/vendor/olight"'), "homepage Olight dealer authority link missing");
assert.ok(home.includes('rel="icon" href="/assets/favicon.png" type="image/png" sizes="96x96"'), "explicit 96x96 favicon declaration missing");
assert.ok(home.includes('rel="apple-touch-icon" href="/assets/apple-touch-icon.png" sizes="180x180"'), "explicit Apple touch icon declaration missing");
assert.ok(home.includes('rel="manifest" href="/site.webmanifest"'), "web manifest link missing");
assert.ok(manifest.includes('"src": "/assets/favicon.png"'), "manifest favicon entry missing");
assert.ok(manifest.includes('"sizes": "96x96"'), "manifest favicon size missing");
assert.ok(manifest.includes('"src": "/assets/apple-touch-icon.png"'), "manifest Apple icon entry missing");
console.log("SEO static checks passed");
