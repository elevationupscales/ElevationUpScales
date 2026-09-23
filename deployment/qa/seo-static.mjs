import fs from "node:fs";
import assert from "node:assert/strict";

const worker = fs.readFileSync("site/_worker.js", "utf8");
const headers = fs.readFileSync("site/_headers", "utf8");
const robots = fs.readFileSync("site/robots.txt", "utf8");

assert.ok(worker.includes('hostname.endsWith(".pages.dev")'), "Pages preview hostname SEO gate missing");
assert.ok(worker.includes('headers.set("X-Robots-Tag","noindex, nofollow, noarchive")'), "Pages preview noindex header missing");
assert.ok(worker.includes("return previewSeoResponse(request,response);"), "final static response must pass through preview SEO guard");
assert.ok(worker.includes("return previewSeoResponse(request,page);"), "dynamic SOK page must pass through preview SEO guard");
assert.equal(headers.includes("X-Robots-Tag: noindex, nofollow, noarchive\n\n/"), false, "global noindex must never be applied to the production site");
assert.ok(robots.includes("Sitemap: https://elevationupscales.com/sitemap.xml"), "production sitemap declaration missing");

console.log("SEO static checks passed");
