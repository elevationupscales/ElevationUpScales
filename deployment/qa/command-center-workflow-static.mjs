import assert from "node:assert/strict";
import fs from "node:fs";

const shell = fs.readFileSync("site/admin-command-center.js", "utf8");
const workspace = fs.readFileSync("site/admin-workspace.js", "utf8");

for (const [label, route] of [
  ["Today", "/admin"],
  ["Orders", "/admin-store-orders"],
  ["Products", "/admin-catalog"],
  ["Leads", "/admin-listings#leads"],
  ["Logistics", "/admin-lithium-shipping"],
  ["System", "/admin-system"],
]) {
  assert.ok(shell.includes(`["${label}", "${route}"`), `primary admin navigation missing ${label}`);
}

for (const route of [
  "/admin-inventory",
  "/admin-channels",
  "/admin-commerce-logistics",
  "/admin-commerce-pricing",
  "/admin-promotion",
]) {
  assert.ok(shell.includes(`"${route}"`), `Products contextual navigation missing ${route}`);
}

for (const hash of ["leads", "supplier-leads", "solar", "work-with-us", "portal-ready"]) {
  assert.ok(shell.includes(`/admin-listings#${hash}`), `Leads contextual navigation missing #${hash}`);
  assert.ok(workspace.includes(`\"${hash}\"`), `Leads workspace missing #${hash}`);
}

assert.match(workspace, /view === "projects" \|\| view === "portal"/);
assert.match(workspace, /"handoff_ready"/);
assert.doesNotMatch(workspace, /marketplace: "Listings"|followup: "Marketplace Follow-Up"/);

for (const page of [
  "admin.html",
  "admin-store-orders.html",
  "admin-catalog.html",
  "admin-inventory.html",
  "admin-channels.html",
  "admin-commerce-logistics.html",
  "admin-commerce-pricing.html",
  "admin-promotion.html",
  "admin-listings.html",
  "admin-lithium-shipping.html",
  "admin-sok.html",
  "admin-system.html",
  "admin-analytics.html",
]) {
  const html = fs.readFileSync(`site/${page}`, "utf8");
  assert.ok(html.includes("/admin-command-center.js?v=5.2.0"), `${page} does not load the canonical admin shell`);
}

console.log("Command Center ecommerce workflow static QA: PASS");
