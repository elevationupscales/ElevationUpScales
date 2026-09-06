import assert from "node:assert/strict";
import fs from "node:fs";

const shell = fs.readFileSync("site/site-shell.js", "utf8");
const home = fs.readFileSync("site/index.html", "utf8");
const solarServices = fs.readFileSync("site/solar-services.html", "utf8");
const product = fs.readFileSync("site/product.html", "utf8");
const productDetail = fs.readFileSync("site/product-detail.js", "utf8");
const terms = fs.readFileSync("site/terms.html", "utf8");
const marketplace = fs.readFileSync("site/marketplace.html", "utf8");

const shopStart = shell.indexOf("const SHOP_LINKS");
const shopEnd = shell.indexOf("function randomId", shopStart);
assert.ok(shopStart >= 0 && shopEnd > shopStart, "shared SHOP_LINKS block must exist");
const shopBlock = shell.slice(shopStart, shopEnd);

for (const route of [
  "/store",
  "/rv-store",
  "/lithium-batteries",
  "/sok-batteries",
]) {
  assert.ok(shopBlock.includes(`\"${route}\"`), `shared Shop menu missing ${route}`);
}

assert.equal(shopBlock.includes('"/marketplace"'), false, "Marketplace must remain separate from Elevation Catalog/Shop ownership");
assert.equal(shopBlock.includes('"/solar-services"'), false, "Solar services must remain under Services, not be duplicated into shared Shop ownership");
assert.equal(shopBlock.includes('"/collector"'), false, "Collector Series must not remain in the primary Shop menu");
assert.ok(shell.includes('<summary class="eus-nav-trigger">Power'), "shared shell must expose the grouped Power menu");
assert.ok(shell.includes('href="/hawaii-lithium-batteries"'), "Hawaii Power must remain available under Power");
assert.ok(shell.includes('<summary class="eus-nav-trigger">Projects'), "shared shell must expose the grouped Projects menu");
assert.ok(shell.includes('<summary class="eus-nav-trigger">Services'), "shared shell must expose the grouped Services menu");
assert.ok(shell.includes('<summary class="eus-nav-trigger">Company'), "shared shell must expose the grouped Company menu");

// Retail-first homepage contract: shopping and logistics lead; Marketplace is deliberately last-layer.
for (const route of [
  "/lithium-batteries",
  "/sok-batteries",
  "/rv-store",
  "/solar-project",
  "/hawaii-lithium-batteries",
]) {
  assert.ok(home.includes(`href=\"${route}\"`) || home.includes(`href=\"${route}?`), `retail homepage missing ${route}`);
}
assert.ok(home.includes('href="#logistics"') || home.includes('href="/shipping-logistics-services"'), "homepage must expose Freight & Logistics from primary retail navigation");
assert.ok(home.includes("retail-shop-menu") || /reference-nav-menu[^>]*><summary[^>]*>Shop/.test(home), "homepage must use the retail-first Shop menu");
assert.ok(home.includes("retail-more-menu") || home.includes("reference-nav-menu--company"), "homepage must retain a quieter company/menu layer for non-shopping destinations");
assert.ok(home.includes('href="/start-a-project"'), "Start a Project must remain available as a secondary support path");
assert.ok(home.includes('href="/marketplace"'), "Marketplace route must remain available at the last layer");

const navStart = home.indexOf('<nav class="eus-nav"');
const navEnd = home.indexOf('</nav>', navStart);
const navBlock = home.slice(navStart, navEnd);
const marketplaceIndex = navBlock.indexOf('href="/marketplace"');
const moreIndex = Math.max(navBlock.indexOf("retail-more-menu"), navBlock.indexOf("reference-nav-menu--company"));
assert.ok(moreIndex >= 0 && marketplaceIndex > moreIndex, "Marketplace must live inside the secondary More menu, not as a primary retail destination");
assert.equal(/<a class="eus-nav-link" href="\/marketplace/.test(navBlock), false, "Marketplace must not be a top-level homepage nav link");

// Service-page source retains semantic ownership while the shared runtime supplies one public shell.
assert.ok(solarServices.includes("eus-menu--services"), "full service navigation must retain Services ownership");
assert.ok(solarServices.includes('href="/solar-services"'), "Solar & Off-Grid services route must remain intact");
assert.ok(solarServices.includes('site-shell.js?v=5.2.0'), "service pages must load the consolidated public shell");
assert.ok(solarServices.includes('href="/marketplace#all"'), "service-page Marketplace route must remain intact");
assert.ok(solarServices.includes("eus-menu--shop"), "service pages must retain the shared Shop menu owner");

assert.equal(product.includes("data-lithium-retailer"), false, "generic product HTML must not expose lithium-only retailer copy");
assert.equal(product.includes("data-lithium-freight-link"), false, "generic product HTML must not expose lithium-only Hawaii copy");
assert.ok(productDetail.includes("ensureLithiumContext"), "confirmed lithium products must receive category-specific runtime context");
assert.equal(terms.includes("Licensed Lithium Battery Retailer"), false, "Terms must not imply a special lithium-retailer license");
assert.ok(terms.includes("Authorized SOK Energy Dealer"), "verified SOK dealer wording must remain in Terms");
assert.ok(marketplace.includes("Marketplace listings are independent from Elevation-owned catalog inventory"), "Marketplace separation disclosure missing");
assert.ok(marketplace.includes("Shop Current Products"), "empty Marketplace must provide a current catalog route");

const redirects = fs.readFileSync("site/_redirects", "utf8");
assert.ok(redirects.includes("/solar-services.html /solar-services 301"), "canonical Solar Services redirect must remain intact");
assert.ok(redirects.includes("/marketplace.html /marketplace 301"), "canonical Marketplace redirect must remain intact");

console.log("WEB-VISUAL-0905-01 retail-first shopping navigation contract: PASS");
