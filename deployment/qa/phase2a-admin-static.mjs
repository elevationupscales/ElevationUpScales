import fs from "node:fs";
import assert from "node:assert/strict";

const command = fs.readFileSync("site/admin-command-center.js", "utf8");
const overview = fs.readFileSync("site/admin-overview.js", "utf8");

assert.ok(command.includes("buildOverviewModel"), "Command Center must expose one shared overview model");
assert.ok(command.includes("window.EUSAdminData"), "Compatibility object must remain");

for (const endpoint of [
  "/api/admin/store-orders",
  "/api/admin/catalog",
  "/api/admin/inventory",
  "/api/admin/opportunities",
  "/api/admin/operations",
  "/api/admin/market-analytics",
  "/api/admin/lithium-shipping",
  "/api/admin/sync",
  "/api/admin/doba-csv-sync",
  "/api/admin/promotion",
]) assert.ok(command.includes(endpoint), `missing endpoint ${endpoint}`);

assert.ok(overview.includes("D().buildOverviewModel(snapshot)"), "Overview must consume shared model");
for (const duplicatedRule of [
  "supplierStockState",
  "pendingCustomerConfirmations",
  "portalHandoffReady",
  "syncCounts.outOfSync",
  "grossContribution: revenue - supplierCost",
]) assert.equal(overview.includes(duplicatedRule), false, `overview still owns duplicated business rule: ${duplicatedRule}`);

for (const requiredUiContract of [
  "eus-situation-grid",
  "eus-priority-summary",
  "eus-action-board",
  "eus-program-status",
  "eus-overview-metrics",
  "eus-lead-health",
  "eus-recent-orders",
  "/api/admin/session",
  "/api/admin/login",
  "/api/admin/logout",
]) assert.ok(overview.includes(requiredUiContract), `overview missing UI/auth contract ${requiredUiContract}`);

console.log("phase2a-admin-static.mjs: PASS");
