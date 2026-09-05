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
assert.equal(shopBlock.includes('"/solar-services"'), false, "Solar services must remain under Services, not be duplicated into Shop ownership");

assert.ok(home.includes('href="#shop"'), "homepage must retain its direct Shop section route");
assert.ok(home.includes('href="/marketplace"'), "homepage must expose Marketplace as a separate top-level destination");
assert.ok(home.includes('href="/solar-project?source=home-elevation-funnel"'), "homepage Solar route must continue to the existing Solar Builder entry point");
assert.ok(home.includes('href="/start-a-project"'), "primary Start a Project route must remain present");

assert.ok(solarServices.includes("eus-menu--services"), "full service navigation must retain Services ownership");
assert.ok(solarServices.includes('href="/solar-services"'), "Solar & Off-Grid must remain under the existing Services route");
assert.ok(solarServices.includes("eus-menu--marketplace"), "full service navigation must retain separate Marketplace ownership");
assert.ok(solarServices.includes('href="/marketplace#all"'), "full service navigation must route Marketplace to the existing marketplace");
assert.ok(solarServices.includes("eus-menu--shop"), "full service navigation must retain the Shop menu owner");

const redirects = fs.readFileSync("site/_redirects", "utf8");
assert.ok(redirects.includes("/solar-services.html /solar-services 301"), "canonical Solar Services redirect must remain intact");
assert.ok(redirects.includes("/marketplace.html /marketplace 301"), "canonical Marketplace redirect must remain intact");

console.log("WEB-COM-0905-01 shared shopping navigation contract: PASS");
