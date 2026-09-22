import assert from "node:assert/strict";
import fs from "node:fs";

const shell = fs.readFileSync("site/site-shell.js", "utf8");
const home = fs.readFileSync("site/index.html", "utf8");
const solarServices = fs.readFileSync("site/solar-services.html", "utf8");
const product = fs.readFileSync("site/product.html", "utf8");
const productDetail = fs.readFileSync("site/product-detail.js", "utf8");
const terms = fs.readFileSync("site/terms.html", "utf8");

const shopStart = shell.indexOf("const SHOP_LINKS");
const shopEnd = shell.indexOf("function randomId", shopStart);
assert.ok(shopStart >= 0 && shopEnd > shopStart, "shared SHOP_LINKS block must exist");
const shopBlock = shell.slice(shopStart, shopEnd);

for (const route of [
  "https://shop.elevationupscales.com/collections/all",
  "https://shop.elevationupscales.com/collections/complete-power-systems",
  "https://shop.elevationupscales.com/collections/sok-battery",
  "https://shop.elevationupscales.com/collections/renogy",
  "https://shop.elevationupscales.com/collections/sungoldpower",
]) {
  assert.ok(shopBlock.includes(`"${route}"`), `shared Shop menu missing ${route}`);
}

assert.equal(shopBlock.includes('"/marketplace"'), false, "retired Marketplace must not be owned by the active Shop menu");
assert.equal(shopBlock.includes('"/solar-services"'), false, "Solar services must remain under Services, not be duplicated into shared Shop ownership");
assert.equal(shopBlock.includes('"/collector"'), false, "Collector Series must not remain in the primary Shop menu");
assert.equal(shell.includes('<summary class="eus-nav-trigger">Power'), false, "retired duplicate Power menu must stay removed from the simplified shell");
assert.ok(shell.includes('href="/vendors"'), "shared shell must expose the Brands hub");
assert.ok(shell.includes('href="/commercial"'), "shared shell must expose the Commercial hub");
assert.ok(shell.includes('<summary class="eus-nav-trigger">Projects'), "shared shell must expose the grouped Projects menu");
assert.ok(shell.includes('<summary class="eus-nav-trigger">Services'), "shared shell must expose the grouped Services menu");
assert.ok(shell.includes('<summary class="eus-nav-trigger">Company'), "shared shell must retain the quieter Company menu");
assert.equal(shell.includes('href="/marketplace"'), false, "retired Marketplace must not remain in the shared public shell");

// Main-site contract: Shopify owns product shopping; projects, planning and logistics stay on ElevationUpScales.com.
for (const route of [
  "https://shop.elevationupscales.com/collections/all",
  "https://shop.elevationupscales.com/collections/complete-power-systems",
  "https://shop.elevationupscales.com/collections/sok-battery",
  "/solar-project",
  "/hawaii-lithium-batteries",
  "/vendors",
  "/commercial",
  "/vendor/olight",
]) {
  assert.ok(home.includes(`href="${route}"`) || home.includes(`href="${route}?`), `homepage missing ${route}`);
}
assert.ok(home.includes('href="#logistics"') || home.includes('href="/shipping-logistics-services"'), "homepage must expose Freight & Logistics from primary retail navigation");
assert.ok(home.includes("retail-shop-menu") || /reference-nav-menu[^>]*><summary[^>]*>Shop/.test(home), "homepage must use the retail-first Shop menu");
assert.ok(home.includes("retail-more-menu") || home.includes("reference-nav-menu--company"), "homepage must retain a quieter company/menu layer for non-shopping destinations");
assert.ok(home.includes('href="/start-a-project"'), "Start a Project must remain the main-site project path");

assert.ok(home.includes('href="/vendor/sok-energy"'), "homepage must expose the SOK vendor page");
assert.ok(home.includes('href="/vendor/renogy"'), "homepage must expose the Renogy vendor page");
assert.ok(home.includes('href="/vendor/sungoldpower"'), "homepage must expose the SunGoldPower vendor page");

for (const requiredFile of [
  "site/vendors/index.html",
  "site/vendor/olight/index.html",
  "site/vendor/sok-energy/index.html",
  "site/vendor/renogy/index.html",
  "site/vendor/sungoldpower/index.html",
  "site/commercial/index.html",
  "site/clean-commerce-v1.css",
]) {
  assert.equal(fs.existsSync(requiredFile), true, `clean commerce route missing: ${requiredFile}`);
}


// Service-page source retains semantic ownership while the shared runtime supplies one public shell.
assert.ok(solarServices.includes("eus-menu--services"), "full service navigation must retain Services ownership");
assert.ok(solarServices.includes('href="/solar-services"'), "Solar & Off-Grid services route must remain intact");
assert.ok(solarServices.includes('site-shell.js?v=5.2.0'), "service pages must load the consolidated public shell");
assert.ok(solarServices.includes("eus-menu--shop"), "service pages must retain the shared Shop menu owner");

assert.equal(product.includes("data-lithium-retailer"), false, "generic product HTML must not expose lithium-only retailer copy");
assert.equal(product.includes("data-lithium-freight-link"), false, "generic product HTML must not expose lithium-only Hawaii copy");
assert.ok(productDetail.includes("ensureLithiumContext"), "confirmed lithium products must receive category-specific runtime context");
assert.equal(terms.includes("Licensed Lithium Battery Retailer"), false, "Terms must not imply a special lithium-retailer license");
assert.ok(terms.includes("Authorized SOK Energy Dealer"), "verified SOK dealer wording must remain in Terms");

const redirects = fs.readFileSync("site/_redirects", "utf8");
assert.ok(redirects.includes("/solar-services.html /solar-services 301"), "canonical Solar Services redirect must remain intact");
assert.ok(redirects.includes("/marketplace /store 301"), "retired Marketplace must redirect to the active Store");
assert.ok(redirects.includes("/make-a-listing /store 301"), "retired seller intake must redirect to the active Store");
assert.ok(redirects.includes("/report-an-issue /other-ways-we-can-help 301"), "retired Marketplace issue report must redirect to the active help/contact surface");
assert.ok(redirects.includes("/list-an-rv /rv-store 301"), "retired RV seller intake must redirect to the RV Store");

// Release C: retired public routes stay out of discovery while server redirects remain authoritative.
const sitemap = fs.readFileSync("site/sitemap.xml", "utf8");
for (const retiredRoute of ["/marketplace", "/make-a-listing"]) {
  assert.equal(sitemap.includes(`elevationupscales.com${retiredRoute}`), false, `retired route remains in sitemap: ${retiredRoute}`);
}

// Release D: remove only retired Marketplace public front-end assets. Historical D1/R2 data and Worker compatibility remain untouched.
for (const retiredFile of [
  "site/marketplace.html",
  "site/make-a-listing.html",
  "site/marketplace-feed.js",
  "site/marketplace-listing.js",
  "site/marketplace-listing.css",
  "site/marketplace-reform.css",
  "site/marketplace-analytics.js",
  "site/list-a-bicycle.html",
  "site/list-a-boat.html",
  "site/list-a-motorcycle.html",
  "site/list-a-vehicle.html",
  "site/list-an-rv.html",
  "site/list-used-gear.html",
  "site/list-a-bicycle/index.html",
  "site/list-a-boat/index.html",
  "site/list-a-motorcycle/index.html",
  "site/list-a-vehicle/index.html",
  "site/list-an-rv/index.html",
  "site/list-used-gear/index.html",
  "site/report-an-issue.html",
  "site/report-an-issue/index.html",
]) {
  assert.equal(fs.existsSync(retiredFile), false, `deprecated Marketplace front-end asset still present: ${retiredFile}`);
}

console.log("WEB-VISUAL-0907-RETIRE-MARKETPLACE C+D navigation contract: PASS");
