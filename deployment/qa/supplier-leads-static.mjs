import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { SUPPLIER_TREE_STATES, supplierOutreachBlock } from "../../site/worker/domains/supplier-leads.js";

assert.equal(SUPPLIER_TREE_STATES.length, 10);
assert.equal(new Set(SUPPLIER_TREE_STATES).size, 10);
assert.match(supplierOutreachBlock({ treeState: "contacted_waiting" }), /waiting/i);
assert.match(supplierOutreachBlock({ treeState: "existing_relationship" }), /existing relationship/i);
assert.match(supplierOutreachBlock({ treeState: "research_channel_verify", duplicateOfId: "sup_duplicate" }), /duplicate/i);
assert.equal(supplierOutreachBlock({ treeState: "research_channel_verify" }), "");

const [html, client, domain, routes, worker, workspace, packageJson] = await Promise.all([
  readFile(new URL("../../site/admin-listings.html", import.meta.url), "utf8"),
  readFile(new URL("../../site/admin-supplier-leads.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/worker/domains/supplier-leads.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/worker/routes.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/worker-core.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/admin-workspace.js", import.meta.url), "utf8"),
  readFile(new URL("../../package.json", import.meta.url), "utf8"),
]);

for (const id of ["supplier-leads-workspace", "supplier-lead-kpis", "supplier-lead-table-body", "supplier-lead-editor"]) {
  assert.match(html, new RegExp(`id=["']${id}["']`));
}
assert.match(html, /separate from customer and Solar leads/i);
assert.match(html, /no outreach is sent automatically/i);
assert.match(client, /\/api\/admin\/supplier-leads/);
assert.match(client, /Protected contact and commercial details/);
assert.doesNotMatch(client, /mailto:|gmail/i);
assert.match(domain, /requireAdmin\(request, env\)/);
assert.match(domain, /sameOriginRequest\(request\)/);
assert.match(domain, /CREATE TABLE IF NOT EXISTS supplier_leads/);
assert.match(domain, /CREATE TABLE IF NOT EXISTS supplier_lead_activity/);
assert.doesNotMatch(domain, /solar_leads|project_opportunities/);
assert.match(routes, /ADMIN_SUPPLIER_LEADS_PATH/);
assert.match(worker, /handleAdminSupplierLeads/);
assert.match(workspace, /supplier-leads/);
assert.match(packageJson, /qa:supplier-leads/);

console.log("Supplier leads static QA passed.");
