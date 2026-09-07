import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  EXPECTED_TREE_COUNTS,
  SOURCE_FIELDS,
  SUPPLIER_OPERATIONAL_STAGES,
  SUPPLIER_TREE_STATES,
  supplierOutreachBlock,
  validateSupplierDataset,
} from "../../site/worker/domains/supplier-leads.js";

assert.equal(SUPPLIER_TREE_STATES.length, 10);
assert.equal(new Set(SUPPLIER_TREE_STATES).size, 10);
assert.equal(SUPPLIER_OPERATIONAL_STAGES.length, 6);
assert.deepEqual(SUPPLIER_OPERATIONAL_STAGES, ["research", "ready_to_contact", "waiting", "qualification_integration", "active", "closed_hold"]);
assert.equal(SOURCE_FIELDS.length, 41);
assert.equal(new Set(SOURCE_FIELDS).size, 41);
assert.match(supplierOutreachBlock({ source: { primaryBranch: "03 CONTACTED / WAITING", outboundBlocked: false, communicationStatus: "WAITING" } }), /waiting/i);
assert.match(supplierOutreachBlock({ source: { primaryBranch: "02 EXISTING RELATIONSHIP / DO NOT PROSPECT", outboundBlocked: false } }), /existing relationship/i);
assert.match(supplierOutreachBlock({ source: { primaryBranch: "09 RESEARCH / CHANNEL VERIFY", dedupeState: "EXISTING COMPANY / DIFFERENT BRANCH", outboundBlocked: false } }), /dedupe|outbound blocked/i);
assert.equal(supplierOutreachBlock({ source: { primaryBranch: "09 RESEARCH / CHANNEL VERIFY", dedupeState: "CLEAN NEW LEAD", communicationStatus: "NOT CONTACTED", accountStatus: "PROSPECT", outboundBlocked: false } }), "");

function blankRecord(id, branch, blocked) {
  const record = Object.fromEntries(SOURCE_FIELDS.map((field) => [field, null]));
  Object.assign(record, {
    supplierLeadId: id,
    companyName: `Fixture ${id}`,
    leadType: "supplier_commercial",
    priority: "A- Strategic",
    primaryBranch: branch,
    strategicLane: "Fixture Lane / Preserve Exact Source Value",
    pipelineStage: "QUALIFIED / CLEAN NEW LEAD",
    communicationStatus: blocked ? "WAITING" : "NOT CONTACTED",
    accountStatus: blocked ? "PROSPECT - AWAITING REPLY" : "PROSPECT",
    dedupeState: blocked ? "ALREADY SENT / WAITING" : "CLEAN NEW LEAD",
    outboundBlocked: blocked,
    outboundBlockReason: blocked ? "Fixture control block" : null,
    owner: "Fixture Owner",
    nextAction: "Fixture next action",
    dropshipSummary: "Unknown - preserve exact source state",
    dropshipAuthorization: "UNKNOWN - RETAILER PROGRAM",
    hawaiiFulfillmentGap: "RESEARCH",
    supplierReferralOpportunity: "POSSIBLE",
    website: `https://fixture-${id.toLowerCase()}.example`,
    snapshotDate: "2026-09-07",
  });
  return record;
}

const branchPool = [];
for (const [branch, count] of Object.entries(EXPECTED_TREE_COUNTS)) for (let index = 0; index < count; index += 1) branchPool.push(branch);
const fixture = branchPool.map((branch, index) => blankRecord(`SUP-${String(index + 1).padStart(3, "0")}`, branch, Number(branch.slice(0, 2)) <= 6));
function moveControl(id, company, branch, communicationStatus) {
  const target = fixture.find((record) => record.supplierLeadId === id);
  const current = fixture.find((record) => record.primaryBranch === branch && record.supplierLeadId !== id);
  const oldBranch = target.primaryBranch;
  if (oldBranch !== branch) {
    current.primaryBranch = oldBranch;
    current.outboundBlocked = Number(oldBranch.slice(0, 2)) <= 6;
    current.communicationStatus = current.outboundBlocked ? "WAITING" : "NOT CONTACTED";
    current.dedupeState = current.outboundBlocked ? "ALREADY SENT / WAITING" : "CLEAN NEW LEAD";
    current.accountStatus = current.outboundBlocked ? "PROSPECT - AWAITING REPLY" : "PROSPECT";
  }
  target.primaryBranch = branch;
  target.companyName = company;
  target.outboundBlocked = true;
  target.outboundBlockReason = "Control block";
  target.communicationStatus = communicationStatus;
}
moveControl("SUP-001", "SOK Energy", "01 ACTIVE / WON", "RESPONDED");
moveControl("SUP-054", "R&R Solar", "02 EXISTING RELATIONSHIP / DO NOT PROSPECT", "RESPONDED");
moveControl("SUP-008", "Soligent", "06 ROUTING FAILED / BLOCKED", "BOUNCED");

const validation = validateSupplierDataset({
  schemaVersion: "1.0.0",
  dataset: "Elevation UpScales Supplier / Commercial Leads",
  snapshotDate: "2026-09-07",
  recordCount: 56,
  treeCounts: EXPECTED_TREE_COUNTS,
  leads: fixture,
});
assert.equal(validation.valid, true, validation.errors.join("\n"));
assert.equal(validation.validRecords, 56);
assert.equal(validation.invalidRecords, 0);
assert.equal(validation.fieldCount, 41);
assert.equal(validation.blockedCount, 25);
assert.equal(validation.cleanCount, 31);
assert.deepEqual(validation.treeCounts, EXPECTED_TREE_COUNTS);

const [html, client, domain, routes, worker, workspace, packageJson] = await Promise.all([
  readFile(new URL("../../site/admin-listings.html", import.meta.url), "utf8"),
  readFile(new URL("../../site/admin-supplier-leads.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/worker/domains/supplier-leads.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/worker/routes.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/worker-core.js", import.meta.url), "utf8"),
  readFile(new URL("../../site/admin-workspace.js", import.meta.url), "utf8"),
  readFile(new URL("../../package.json", import.meta.url), "utf8"),
]);

for (const id of ["supplier-leads-workspace", "supplier-lead-kpis", "supplier-lead-table-body", "supplier-lead-editor"]) assert.match(html, new RegExp(`id=["']${id}["']`));
assert.match(html, /separate from customer and Solar leads/i);
assert.match(html, /no outreach is sent automatically/i);
assert.match(client, /Select JSON/);
assert.match(client, />Preview</);
assert.match(client, />Validate</);
assert.match(client, />Apply</);
assert.match(client, /Operational Stage/);
assert.match(client, /Ready to Contact/);
assert.match(client, /Needs Qualification/);
assert.match(client, /Blocked \/ Hold/);
assert.match(client, /Source branch filter/);
assert.match(client, /Dropship Status/);
assert.match(client, /Protected contact, evidence & notes/);
assert.doesNotMatch(client, /mailto:|gmail\.com\/mail/);
assert.doesNotMatch(client, /kam@sokbattery|rolf@randrsolar|sales@soligent/i);
assert.match(domain, /SOURCE_FIELDS/);
assert.match(domain, /source_json/);
assert.match(domain, /operational_stage/);
assert.match(domain, /datasetDigest/);
assert.match(domain, /action === "preview"/);
assert.match(domain, /action === "validate"/);
assert.match(domain, /action === "apply"/);
assert.match(domain, /unchanged \+= 1; continue;/);
assert.match(domain, /SUP-\\d\{3\}/);
assert.match(domain, /requireAdmin\(request, env\)/);
assert.match(domain, /sameOriginRequest\(request\)/);
assert.match(domain, /CREATE TABLE IF NOT EXISTS supplier_leads/);
assert.match(domain, /CREATE TABLE IF NOT EXISTS supplier_lead_activity/);
assert.doesNotMatch(domain, /solar_leads|project_opportunities/);
assert.doesNotMatch(domain, /new Set\(\["low", "normal", "high", "urgent"\]\)/);
assert.doesNotMatch(domain, /hawaiiGap:\s*pickBool|alaskaGap:\s*pickBool|dropship:\s*pickBool/);
assert.match(routes, /ADMIN_SUPPLIER_LEADS_PATH/);
assert.match(worker, /handleAdminSupplierLeads/);
assert.match(workspace, /supplier-leads/);
assert.match(packageJson, /qa:supplier-leads/);

console.log("Supplier leads correction static QA passed: 56 records / 41 fields / 25 blocked / 31 clean fixture.");
