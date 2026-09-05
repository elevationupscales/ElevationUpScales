import assert from "node:assert/strict";
import fs from "node:fs";

const shell = fs.readFileSync("site/site-shell.js", "utf8");
const home = fs.readFileSync("site/index.html", "utf8");

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

assert.ok(home.includes("eus-menu--marketplace"), "homepage must expose the separate Marketplace menu");
assert.ok(home.includes('href="/marketplace#all"'), "homepage Marketplace menu must route to the existing marketplace");
assert.ok(home.includes("eus-menu--services"), "homepage must expose Services navigation");
assert.ok(home.includes('href="/solar-services"'), "Solar & Off-Grid must route through the existing Services route");
assert.ok(home.includes("eus-menu--shop"), "homepage must expose the shared Shop menu");
assert.ok(home.includes('href="/start-a-project"'), "primary Start a Project route must remain present");

const redirects = fs.readFileSync("site/_redirects", "utf8");
assert.ok(redirects.includes("/solar-services.html /solar-services 301"), "canonical Solar Services redirect must remain intact");
assert.ok(redirects.includes("/marketplace.html /marketplace 301"), "canonical Marketplace redirect must remain intact");

console.log("WEB-COM-0905-01 shared shopping navigation contract: PASS");
