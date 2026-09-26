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
assert.equal(globalHeaderBlock.includes("X-Robots-Tag"), false, "global noindex must never be applied to production");
assert.ok(robots.includes("Sitemap: https://elevationupscales.com/sitemap.xml"), "production sitemap declaration missing");
for (const route of ["/vendors", "/vendor/*", "/commercial", "/custom-order", "/launch/osight-r"]) assert.ok(routes.includes(`"${route}"`), `public route ${route} must pass through preview SEO guard`);
for (const canonical of ["https://elevationupscales.com/lithium-batteries","https://elevationupscales.com/rv-store","https://elevationupscales.com/vendors","https://elevationupscales.com/vendor/olight","https://elevationupscales.com/commercial","https://elevationupscales.com/custom-order","https://elevationupscales.com/launch/osight-r"]) {
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap entry missing: ${canonical}`);
}
for (const file of ["site/product.html", "site/sok-order.html", "site/checkout/index.html"]) {
  const html = fs.readFileSync(file, "utf8");
  assert.ok(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html), `${file}: utility noindex missing`);
}
console.log("SEO static checks passed");
