import assert from "node:assert/strict";
import fs from "node:fs";

const shell = fs.readFileSync("site/site-shell.js", "utf8");
const home = fs.readFileSync("site/index.html", "utf8");
const solarServices = fs.readFileSync("site/solar-services.html", "utf8");

const shopStart = shell.indexOf("const SHOP_LINKS");
const shopEnd = shell.indexOf("function randomId", shopStart);
assert.ok(shopStart >= 0 && shopEnd > shopStart, "shared SHOP_LINKS block must exist");
const shopBlock = shell.slice(shopStart, shopEnd);

for (const route of [
  "/store",
  "/rv-store",
  "/lithium-batteries",
  "/sok-batteries",
  "/hawaii-lithium-batteries",
  "/collector",
]) {
  assert.ok(shopBlock.includes(`\"${route}\"`), `shared Shop menu missing ${route}`);
}

assert.equal(shopBlock.includes('"/marketplace"'), false, "Marketplace must remain separate from Elevation Catalog/Shop ownership");
assert.equal(shopBlock.includes('"/solar-services"'), false, "Solar services must remain under Services, not be duplicated into shared Shop ownership");

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
assert.ok(home.includes('href="#logistics"'), "homepage must expose Freight & Logistics from primary retail navigation");
assert.ok(home.includes("retail-shop-menu"), "homepage must use the retail-first Shop menu");
assert.ok(home.includes("retail-more-menu"), "homepage must retain a quieter More menu for non-shopping destinations");
assert.ok(home.includes('href="/start-a-project"'), "Start a Project must remain available as a secondary support path");
assert.ok(home.includes('href="/marketplace"'), "Marketplace route must remain available at the last layer");

const navStart = home.indexOf('<nav class="eus-nav"');
const navEnd = home.indexOf('</nav>', navStart);
const navBlock = home.slice(navStart, navEnd);
const marketplaceIndex = navBlock.indexOf('href="/marketplace"');
const moreIndex = navBlock.indexOf("retail-more-menu");
assert.ok(moreIndex >= 0 && marketplaceIndex > moreIndex, "Marketplace must live inside the secondary More menu, not as a primary retail destination");
assert.equal(/<a class="eus-nav-link" href="\/marketplace/.test(navBlock), false, "Marketplace must not be a top-level homepage nav link");

// Service pages keep their established route ownership; this visual pass does not rewrite backend or canonical routing.
assert.ok(solarServices.includes("eus-menu--services"), "full service navigation must retain Services ownership");
assert.ok(solarServices.includes('href="/solar-services"'), "Solar & Off-Grid services route must remain intact");
assert.ok(solarServices.includes("eus-menu--marketplace"), "service-page legacy navigation must retain separate Marketplace ownership until the shared-shell retail pass");
assert.ok(solarServices.includes('href="/marketplace#all"'), "service-page Marketplace route must remain intact");
assert.ok(solarServices.includes("eus-menu--shop"), "service pages must retain the shared Shop menu owner");

const redirects = fs.readFileSync("site/_redirects", "utf8");
assert.ok(redirects.includes("/solar-services.html /solar-services 301"), "canonical Solar Services redirect must remain intact");
assert.ok(redirects.includes("/marketplace.html /marketplace 301"), "canonical Marketplace redirect must remain intact");

console.log("WEB-VISUAL-0905-01 retail-first shopping navigation contract: PASS");
