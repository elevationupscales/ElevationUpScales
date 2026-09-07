import {
  jsonResponse,
  cleanString,
  parseJsonObject,
  sameOriginRequest,
  requireAdmin,
  readLimitedJson,
} from "../core-context.js";
import { ADMIN_SUPPLIER_LEADS_PATH } from "../routes.js";

export const SUPPLIER_TREE_STATES = Object.freeze([
  "01 ACTIVE / WON",
  "02 EXISTING RELATIONSHIP / DO NOT PROSPECT",
  "03 CONTACTED / WAITING",
  "04 ACKNOWLEDGED / CASE OPEN",
  "05 DRAFT ONLY / MANAGER REVIEW",
  "06 ROUTING FAILED / BLOCKED",
  "07 QUALIFIED / SOLAR + INVERTER",
  "08 QUALIFIED / COMPLEMENTARY + DROPSHIP",
  "09 RESEARCH / CHANNEL VERIFY",
  "10 BACKUP / DIVERSIFICATION / HOLD",
]);

export const SUPPLIER_OPERATIONAL_STAGES = Object.freeze([
  "research",
  "ready_to_contact",
  "waiting",
  "qualification_integration",
  "active",
  "closed_hold",
]);

export const SOURCE_FIELDS = Object.freeze([
  "supplierLeadId", "companyName", "leadType", "priority", "primaryBranch", "strategicLane", "pipelineStage",
  "communicationStatus", "accountStatus", "dedupeState", "outboundBlocked", "outboundBlockReason", "owner",
  "lastContactAt", "nextAction", "nextActionDueAt", "bestOpportunity", "productsGap", "mapStatus", "marginStatus",
  "dealerWholesaleStatus", "dropshipSummary", "dropshipAuthorization", "directCustomerFulfillment", "blindNeutralShipping",
  "inventoryTrackingFeed", "documentationStatus", "hawaiiAlaskaStatus", "hawaiiFulfillmentGap", "alaskaFulfillmentGap",
  "supplierReferralOpportunity", "thirdPartyLogisticsOpportunity", "bestCommercialLane", "commercialContact", "contactEmail",
  "contactPhone", "website", "externalEmailEvidence", "notes", "managementSource", "snapshotDate",
]);

export const SUPPLIER_DATASET_IDENTITY = Object.freeze({
  schemaVersion: "1.0.0",
  dataset: "Elevation UpScales Supplier / Commercial Leads",
  recordCount: 56,
});

export const EXPECTED_TREE_COUNTS = Object.freeze({
  "01 ACTIVE / WON": 1,
  "02 EXISTING RELATIONSHIP / DO NOT PROSPECT": 1,
  "03 CONTACTED / WAITING": 17,
  "04 ACKNOWLEDGED / CASE OPEN": 1,
  "05 DRAFT ONLY / MANAGER REVIEW": 4,
  "06 ROUTING FAILED / BLOCKED": 1,
  "07 QUALIFIED / SOLAR + INVERTER": 9,
  "08 QUALIFIED / COMPLEMENTARY + DROPSHIP": 10,
  "09 RESEARCH / CHANNEL VERIFY": 9,
  "10 BACKUP / DIVERSIFICATION / HOLD": 3,
});

const TREE_STATE_SET = new Set(SUPPLIER_TREE_STATES);
const OPERATIONAL_STAGE_SET = new Set(SUPPLIER_OPERATIONAL_STAGES);
const MAX_BODY_BYTES = 1024 * 1024;

function stringValue(value, max = 240) { return cleanString(value, max); }
function booleanValue(value) {
  if (value === true || value === 1 || value === "1") return true;
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "true" || normalized === "yes";
}
function sourceText(value, max = 6000) { return value == null ? null : stringValue(value, max); }
function normalizeCompany(value) { return stringValue(value, 300).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
function domainKey(value) {
  const raw = stringValue(value, 700).toLowerCase();
  if (!raw) return "";
  try { return new URL(raw.includes("://") ? raw : `https://${raw}`).hostname.replace(/^www\./, ""); }
  catch (_) { return raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0]; }
}
function parseSourceJson(value) {
  const parsed = parseJsonObject(value);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
}
function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
}
function canonicalStringify(value) { return JSON.stringify(canonicalize(value)); }
function compactText(value) { return String(value ?? "").trim().toLowerCase(); }
function sourceFieldMap(source = {}) {
  return Object.fromEntries(SOURCE_FIELDS.map((field) => [field, Object.prototype.hasOwnProperty.call(source, field) ? source[field] : null]));
}
function deriveDoNotContact(source = {}) {
  const text = [source.accountStatus, source.dedupeState, source.outboundBlockReason].map(compactText).join(" ");
  return /do not contact|do not cold contact|cold outreach prohibited/.test(text);
}

export function defaultOperationalStage(source = {}) {
  const branch = source.primaryBranch;
  if (branch === "01 ACTIVE / WON" || branch === "02 EXISTING RELATIONSHIP / DO NOT PROSPECT") return "active";
  if (branch === "03 CONTACTED / WAITING" || branch === "04 ACKNOWLEDGED / CASE OPEN") return "waiting";
  if (branch === "05 DRAFT ONLY / MANAGER REVIEW") return "ready_to_contact";
  if (branch === "06 ROUTING FAILED / BLOCKED" || branch === "10 BACKUP / DIVERSIFICATION / HOLD") return "closed_hold";
  if (branch === "07 QUALIFIED / SOLAR + INVERTER" || branch === "08 QUALIFIED / COMPLEMENTARY + DROPSHIP") return "qualification_integration";
  return "research";
}

export function supplierOutreachBlock(record = {}) {
  const source = record.source && typeof record.source === "object" ? record.source : record;
  if (booleanValue(source.outboundBlocked)) return stringValue(source.outboundBlockReason, 1200) || "Outbound blocked by source record";
  if (record.doNotContact || deriveDoNotContact(source)) return "Do not contact";
  const branch = source.primaryBranch || record.treeState || "";
  const branchReason = {
    "01 ACTIVE / WON": "Active supplier / won — use relationship workflow",
    "02 EXISTING RELATIONSHIP / DO NOT PROSPECT": "Existing relationship — cold outreach prohibited",
    "03 CONTACTED / WAITING": "Already contacted — waiting",
    "04 ACKNOWLEDGED / CASE OPEN": "Acknowledged / case open — wait for routing",
    "05 DRAFT ONLY / MANAGER REVIEW": "Existing draft requires review — do not duplicate",
    "06 ROUTING FAILED / BLOCKED": "Routing failed — verify a working contact route",
  }[branch];
  if (branchReason) return branchReason;
  const dedupe = compactText(source.dedupeState || record.dedupeState);
  if (/existing active supplier|existing relationship|existing company|already sent|waiting|draft only|routing failed|do not contact/.test(dedupe)) {
    return stringValue(source.outboundBlockReason, 1200) || `Outbound blocked by dedupe state: ${source.dedupeState || record.dedupeState}`;
  }
  const communication = compactText(source.communicationStatus || record.communicationState);
  if (/waiting|draft|bounced/.test(communication)) return `Outbound blocked by communication state: ${source.communicationStatus || record.communicationState}`;
  const account = compactText(source.accountStatus || record.accountStatus);
  if (/active supplier|existing relationship|awaiting reply|draft exists|contact route failed|do not cold contact/.test(account)) {
    return `Outbound blocked by account state: ${source.accountStatus || record.accountStatus}`;
  }
  if (record.duplicateOfId) return "Possible duplicate — review before outreach";
  return "";
}

function validateSourceRecord(record, index) {
  const errors = [];
  if (!record || typeof record !== "object" || Array.isArray(record)) return [`Record ${index + 1} must be an object`];
  for (const field of SOURCE_FIELDS) if (!Object.prototype.hasOwnProperty.call(record, field)) errors.push(`${record.supplierLeadId || `Record ${index + 1}`}: missing ${field}`);
  if (!/^SUP-\d{3}$/.test(String(record.supplierLeadId || ""))) errors.push(`${record.supplierLeadId || `Record ${index + 1}`}: invalid supplierLeadId`);
  if (!stringValue(record.companyName, 300)) errors.push(`${record.supplierLeadId || `Record ${index + 1}`}: companyName is required`);
  if (!TREE_STATE_SET.has(record.primaryBranch)) errors.push(`${record.supplierLeadId || `Record ${index + 1}`}: invalid primaryBranch`);
  if (typeof record.outboundBlocked !== "boolean") errors.push(`${record.supplierLeadId || `Record ${index + 1}`}: outboundBlocked must be boolean`);
  return errors;
}

function sameCountMap(actual, expected) {
  return Object.keys(expected).every((key) => Number(actual[key] || 0) === Number(expected[key])) && Object.keys(actual).every((key) => Object.prototype.hasOwnProperty.call(expected, key));
}

export function validateSupplierDataset(payload) {
  const errors = [];
  const invalidRecords = [];
  const leads = Array.isArray(payload?.leads) ? payload.leads : [];
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) errors.push("Dataset must be a JSON object");
  if (payload?.schemaVersion !== SUPPLIER_DATASET_IDENTITY.schemaVersion) errors.push(`schemaVersion must be ${SUPPLIER_DATASET_IDENTITY.schemaVersion}`);
  if (payload?.dataset !== SUPPLIER_DATASET_IDENTITY.dataset) errors.push(`dataset must be ${SUPPLIER_DATASET_IDENTITY.dataset}`);
  if (Number(payload?.recordCount) !== SUPPLIER_DATASET_IDENTITY.recordCount) errors.push(`recordCount must be ${SUPPLIER_DATASET_IDENTITY.recordCount}`);
  if (leads.length !== SUPPLIER_DATASET_IDENTITY.recordCount) errors.push(`leads must contain exactly ${SUPPLIER_DATASET_IDENTITY.recordCount} records`);

  const ids = new Set();
  const treeCounts = Object.fromEntries(SUPPLIER_TREE_STATES.map((state) => [state, 0]));
  let blockedCount = 0;
  leads.forEach((record, index) => {
    const recordErrors = validateSourceRecord(record, index);
    if (recordErrors.length) invalidRecords.push({ index, supplierLeadId: record?.supplierLeadId || "", errors: recordErrors });
    const id = String(record?.supplierLeadId || "");
    if (id) {
      if (ids.has(id)) invalidRecords.push({ index, supplierLeadId: id, errors: [`${id}: duplicate supplierLeadId`] });
      ids.add(id);
    }
    if (TREE_STATE_SET.has(record?.primaryBranch)) treeCounts[record.primaryBranch] += 1;
    if (record?.outboundBlocked === true) blockedCount += 1;
  });

  if (!sameCountMap(treeCounts, EXPECTED_TREE_COUNTS)) errors.push("Computed tree totals do not match the protected 56-record snapshot");
  if (!sameCountMap(payload?.treeCounts || {}, EXPECTED_TREE_COUNTS)) errors.push("treeCounts metadata does not match the protected snapshot");
  if (blockedCount !== 25) errors.push(`Expected 25 outbound-blocked records; found ${blockedCount}`);

  const byId = new Map(leads.map((record) => [record?.supplierLeadId, record]));
  const sok = byId.get("SUP-001");
  if (!sok || sok.companyName !== "SOK Energy" || sok.primaryBranch !== "01 ACTIVE / WON" || sok.outboundBlocked !== true) errors.push("SUP-001 SOK Energy control record does not map as active/blocked relationship management");
  const rr = byId.get("SUP-054");
  if (!rr || rr.companyName !== "R&R Solar" || rr.primaryBranch !== "02 EXISTING RELATIONSHIP / DO NOT PROSPECT" || rr.outboundBlocked !== true) errors.push("SUP-054 R&R Solar control record does not map as existing relationship / blocked");
  const soligent = byId.get("SUP-008");
  if (!soligent || soligent.companyName !== "Soligent" || soligent.primaryBranch !== "06 ROUTING FAILED / BLOCKED" || soligent.communicationStatus !== "BOUNCED" || soligent.outboundBlocked !== true) errors.push("SUP-008 Soligent control record must remain routing-failed / bounced / blocked");

  const uniqueInvalid = new Map();
  for (const issue of invalidRecords) {
    const key = `${issue.index}:${issue.supplierLeadId}`;
    if (!uniqueInvalid.has(key)) uniqueInvalid.set(key, { ...issue, errors: [] });
    uniqueInvalid.get(key).errors.push(...issue.errors);
  }
  const invalid = [...uniqueInvalid.values()];
  return {
    valid: errors.length === 0 && invalid.length === 0,
    fieldCount: SOURCE_FIELDS.length,
    validRecords: Math.max(0, leads.length - invalid.length),
    invalidRecords: invalid.length,
    invalid,
    errors,
    treeCounts,
    blockedCount,
    cleanCount: Math.max(0, leads.length - blockedCount),
  };
}

async function datasetDigest(payload) {
  const bytes = new TextEncoder().encode(canonicalStringify(payload));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function emptySourceRecord(id, body = {}) {
  const record = Object.fromEntries(SOURCE_FIELDS.map((field) => [field, null]));
  record.supplierLeadId = id;
  record.companyName = stringValue(body.companyName || body.company, 300);
  record.leadType = "supplier_commercial";
  record.priority = sourceText(body.priority, 120) || "";
  record.primaryBranch = TREE_STATE_SET.has(body.primaryBranch) ? body.primaryBranch : "09 RESEARCH / CHANNEL VERIFY";
  record.strategicLane = sourceText(body.strategicLane, 1200) || "";
  record.pipelineStage = sourceText(body.pipelineStage, 600) || "RESEARCHING / CLEAN NEW LEAD";
  record.communicationStatus = sourceText(body.communicationStatus, 300) || "NOT CONTACTED";
  record.accountStatus = sourceText(body.accountStatus, 600) || "PROSPECT";
  record.dedupeState = sourceText(body.dedupeState, 600) || "CLEAN NEW LEAD";
  record.outboundBlocked = Boolean(body.outboundBlocked);
  record.outboundBlockReason = sourceText(body.outboundBlockReason, 1200);
  record.owner = sourceText(body.owner, 300);
  record.nextAction = sourceText(body.nextAction, 3000);
  record.nextActionDueAt = sourceText(body.nextActionDueAt || body.nextActionDue, 120);
  record.website = sourceText(body.website, 700);
  record.snapshotDate = new Date().toISOString().slice(0, 10);
  return record;
}

function mergeSourceRecord(existing = {}, incoming = {}) {
  const merged = { ...sourceFieldMap(existing) };
  for (const field of SOURCE_FIELDS) if (Object.prototype.hasOwnProperty.call(incoming, field)) merged[field] = incoming[field];
  if (!merged.leadType) merged.leadType = "supplier_commercial";
  return merged;
}

function legacySourceFromRow(row) {
  const details = parseJsonObject(row?.details_json);
  const contact = parseJsonObject(row?.contact_json);
  const source = Object.fromEntries(SOURCE_FIELDS.map((field) => [field, null]));
  source.supplierLeadId = row?.id || "";
  source.companyName = row?.company || "";
  source.leadType = "supplier_commercial";
  source.priority = row?.priority || "";
  source.primaryBranch = TREE_STATE_SET.has(row?.tree_state) ? row.tree_state : "09 RESEARCH / CHANNEL VERIFY";
  source.strategicLane = row?.strategic_lane || "";
  source.pipelineStage = row?.pipeline_stage || "";
  source.communicationStatus = row?.communication_state || "";
  source.accountStatus = row?.account_status || "";
  source.dedupeState = row?.dedupe_state || "";
  source.outboundBlocked = Boolean(row?.outbound_blocked);
  source.outboundBlockReason = row?.outbound_block_reason || "";
  source.owner = row?.owner || "";
  source.lastContactAt = row?.last_contact_at || null;
  source.nextAction = row?.next_action || "";
  source.nextActionDueAt = row?.next_action_due || null;
  source.bestOpportunity = row?.opportunity_summary || "";
  source.productsGap = details?.desiredProducts || "";
  source.mapStatus = details?.mapPolicy || "";
  source.marginStatus = details?.marginStatus || "";
  source.dealerWholesaleStatus = details?.dealerWholesaleStatus || "";
  source.dropshipSummary = details?.dropshipSummary || "";
  source.dropshipAuthorization = details?.dropshipAuthorization || "";
  source.directCustomerFulfillment = details?.directCustomerFulfillment || "";
  source.blindNeutralShipping = details?.blindNeutralShipping || "";
  source.inventoryTrackingFeed = details?.inventoryTrackingFeed || details?.inventoryFeed || "";
  source.documentationStatus = details?.documentationStatus || details?.documentsStatus || "";
  source.hawaiiAlaskaStatus = details?.hawaiiAlaskaStatus || "";
  source.hawaiiFulfillmentGap = details?.hawaiiFulfillmentGap || "";
  source.alaskaFulfillmentGap = details?.alaskaFulfillmentGap || "";
  source.supplierReferralOpportunity = details?.supplierReferralOpportunity || "";
  source.thirdPartyLogisticsOpportunity = details?.thirdPartyLogisticsOpportunity || "";
  source.bestCommercialLane = row?.best_commercial_lane || "";
  source.commercialContact = contact?.name || "";
  source.contactEmail = contact?.email || "";
  source.contactPhone = contact?.phone || "";
  source.website = row?.website || "";
  source.externalEmailEvidence = row?.source_reference || "";
  source.notes = row?.internal_notes || "";
  source.managementSource = "";
  source.snapshotDate = "";
  return source;
}

function supplierRecord(row) {
  if (!row) return null;
  const sourceJson = parseSourceJson(row.source_json);
  const source = Object.keys(sourceJson).length ? sourceJson : legacySourceFromRow(row);
  const record = {
    id: source.supplierLeadId || row.id,
    company: source.companyName || row.company,
    website: source.website || row.website || "",
    domainKey: row.domain_key || domainKey(source.website),
    operationalStage: OPERATIONAL_STAGE_SET.has(row.operational_stage) ? row.operational_stage : defaultOperationalStage(source),
    treeState: source.primaryBranch,
    priority: source.priority,
    strategicLane: source.strategicLane,
    pipelineStage: source.pipelineStage,
    communicationState: source.communicationStatus,
    accountStatus: source.accountStatus,
    dedupeState: source.dedupeState,
    owner: source.owner,
    lastContactAt: source.lastContactAt,
    nextAction: source.nextAction,
    nextActionDue: source.nextActionDueAt,
    opportunitySummary: source.bestOpportunity,
    bestCommercialLane: source.bestCommercialLane,
    duplicateOfId: row.duplicate_of_id || "",
    doNotContact: Boolean(row.do_not_contact) || deriveDoNotContact(source),
    source,
    version: Number(row.version) || 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
  };
  record.outreachBlockReason = supplierOutreachBlock(record);
  record.outreachAllowed = !record.outreachBlockReason;
  return record;
}

async function ensureColumn(db, table, column, definition) {
  const info = await db.prepare(`PRAGMA table_info(${table})`).all();
  const columns = new Set((info.results || []).map((row) => row.name));
  if (!columns.has(column)) await db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
}

async function ensureSupplierLeadSchema(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS supplier_leads (
    id TEXT PRIMARY KEY, company TEXT NOT NULL, website TEXT NOT NULL DEFAULT '', domain_key TEXT NOT NULL DEFAULT '',
    operational_stage TEXT NOT NULL DEFAULT 'research', priority TEXT NOT NULL DEFAULT '', tree_state TEXT NOT NULL DEFAULT '09 RESEARCH / CHANNEL VERIFY',
    strategic_lane TEXT NOT NULL DEFAULT '', pipeline_stage TEXT NOT NULL DEFAULT '', communication_state TEXT NOT NULL DEFAULT '', account_status TEXT NOT NULL DEFAULT '',
    dedupe_state TEXT NOT NULL DEFAULT '', outbound_blocked INTEGER NOT NULL DEFAULT 0, outbound_block_reason TEXT NOT NULL DEFAULT '', owner TEXT NOT NULL DEFAULT '',
    last_contact_at TEXT NOT NULL DEFAULT '', next_action TEXT NOT NULL DEFAULT '', next_action_due TEXT NOT NULL DEFAULT '', opportunity_summary TEXT NOT NULL DEFAULT '',
    best_commercial_lane TEXT NOT NULL DEFAULT '', duplicate_of_id TEXT NOT NULL DEFAULT '', do_not_contact INTEGER NOT NULL DEFAULT 0, source_reference TEXT NOT NULL DEFAULT '',
    contact_json TEXT NOT NULL DEFAULT '{}', details_json TEXT NOT NULL DEFAULT '{}', source_json TEXT NOT NULL DEFAULT '{}', internal_notes TEXT NOT NULL DEFAULT '',
    version INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT ''
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS supplier_lead_activity (
    id TEXT PRIMARY KEY, supplier_lead_id TEXT NOT NULL, action TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', details_json TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL, created_by TEXT NOT NULL DEFAULT ''
  )`).run();
  await ensureColumn(db, "supplier_leads", "operational_stage", "TEXT NOT NULL DEFAULT 'research'");
  await ensureColumn(db, "supplier_leads", "dedupe_state", "TEXT NOT NULL DEFAULT ''");
  await ensureColumn(db, "supplier_leads", "outbound_blocked", "INTEGER NOT NULL DEFAULT 0");
  await ensureColumn(db, "supplier_leads", "outbound_block_reason", "TEXT NOT NULL DEFAULT ''");
  await ensureColumn(db, "supplier_leads", "source_json", "TEXT NOT NULL DEFAULT '{}'");
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_supplier_leads_stage ON supplier_leads(operational_stage, next_action_due)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_supplier_leads_tree ON supplier_leads(tree_state, next_action_due)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_supplier_leads_domain ON supplier_leads(domain_key)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_supplier_activity_lead ON supplier_lead_activity(supplier_lead_id, created_at DESC)").run();
}

async function readBody(request) {
  const parsed = await readLimitedJson(request, MAX_BODY_BYTES);
  if (parsed.error === "too_large") return { response: jsonResponse({ error: "Request is too large" }, 413) };
  if (parsed.error || !parsed.value || typeof parsed.value !== "object" || Array.isArray(parsed.value)) return { response: jsonResponse({ error: "Valid JSON is required" }, 400) };
  return { body: parsed.value };
}

async function addActivity(db, leadId, action, note, details, email) {
  await db.prepare("INSERT INTO supplier_lead_activity (id,supplier_lead_id,action,note,details_json,created_at,created_by) VALUES (?,?,?,?,?,?,?)")
    .bind(`sla_${crypto.randomUUID()}`, leadId, stringValue(action, 80), stringValue(note, 3000), JSON.stringify(details || {}), new Date().toISOString(), email).run();
}

async function findDuplicate(db, source, excludeId = "") {
  const normalizedDomain = domainKey(source.website);
  const normalizedCompany = normalizeCompany(source.companyName);
  const rows = await db.prepare("SELECT id,company,domain_key,tree_state FROM supplier_leads WHERE id<>? ORDER BY updated_at DESC LIMIT 1000").bind(excludeId).all();
  const duplicate = (rows.results || []).find((row) => (normalizedDomain && row.domain_key === normalizedDomain) || (normalizedCompany && normalizeCompany(row.company) === normalizedCompany));
  return duplicate ? { id: duplicate.id, company: duplicate.company, treeState: duplicate.tree_state } : null;
}

async function allRows(db) {
  const result = await db.prepare("SELECT * FROM supplier_leads ORDER BY updated_at DESC LIMIT 1000").all();
  return result.results || [];
}

function actionCounts(leads) {
  return {
    ready_to_contact: leads.filter((lead) => lead.operationalStage === "ready_to_contact" && lead.outreachAllowed).length,
    waiting: leads.filter((lead) => lead.operationalStage === "waiting").length,
    needs_qualification: leads.filter((lead) => lead.operationalStage === "research" || lead.operationalStage === "qualification_integration").length,
    active: leads.filter((lead) => lead.operationalStage === "active").length,
    blocked_hold: leads.filter((lead) => !lead.outreachAllowed || lead.operationalStage === "closed_hold").length,
  };
}

async function snapshot(db) {
  const rows = await allRows(db);
  const stageOrder = new Map(SUPPLIER_OPERATIONAL_STAGES.map((stage, index) => [stage, index]));
  const leads = rows.map(supplierRecord).sort((a, b) => {
    const stageDelta = (stageOrder.get(a.operationalStage) ?? 99) - (stageOrder.get(b.operationalStage) ?? 99);
    if (stageDelta) return stageDelta;
    const dueA = String(a.nextActionDue || "9999-99-99"), dueB = String(b.nextActionDue || "9999-99-99");
    return dueA.localeCompare(dueB) || String(a.company).localeCompare(String(b.company));
  });
  const treeCounts = Object.fromEntries(SUPPLIER_TREE_STATES.map((state) => [state, leads.filter((lead) => lead.treeState === state).length]));
  return { leads, treeCounts, actionCounts: actionCounts(leads), total: leads.length };
}

async function nextSupplierLeadId(db) {
  const rows = await db.prepare("SELECT id FROM supplier_leads WHERE id LIKE 'SUP-%' ORDER BY id DESC LIMIT 1").all();
  const current = String(rows.results?.[0]?.id || "SUP-000");
  const number = Math.max(0, Number.parseInt(current.slice(4), 10) || 0) + 1;
  if (number > 999) throw new Error("Supplier lead ID capacity exceeded");
  return `SUP-${String(number).padStart(3, "0")}`;
}

function rowValues(source, operationalStage, duplicateOfId = "", existing = {}) {
  const effectiveBlock = supplierOutreachBlock({ source, duplicateOfId, doNotContact: deriveDoNotContact(source) });
  const details = {
    productsGap: source.productsGap,
    mapStatus: source.mapStatus,
    marginStatus: source.marginStatus,
    dealerWholesaleStatus: source.dealerWholesaleStatus,
    dropshipSummary: source.dropshipSummary,
    dropshipAuthorization: source.dropshipAuthorization,
    directCustomerFulfillment: source.directCustomerFulfillment,
    blindNeutralShipping: source.blindNeutralShipping,
    inventoryTrackingFeed: source.inventoryTrackingFeed,
    documentationStatus: source.documentationStatus,
    hawaiiAlaskaStatus: source.hawaiiAlaskaStatus,
    hawaiiFulfillmentGap: source.hawaiiFulfillmentGap,
    alaskaFulfillmentGap: source.alaskaFulfillmentGap,
    supplierReferralOpportunity: source.supplierReferralOpportunity,
    thirdPartyLogisticsOpportunity: source.thirdPartyLogisticsOpportunity,
  };
  const contact = { name: source.commercialContact || "", email: source.contactEmail || "", phone: source.contactPhone || "" };
  return {
    company: stringValue(source.companyName, 300), website: stringValue(source.website, 700), domain: domainKey(source.website),
    operationalStage: OPERATIONAL_STAGE_SET.has(operationalStage) ? operationalStage : defaultOperationalStage(source),
    priority: sourceText(source.priority, 120) || "", treeState: source.primaryBranch, strategicLane: sourceText(source.strategicLane, 1200) || "",
    pipelineStage: sourceText(source.pipelineStage, 600) || "", communicationState: sourceText(source.communicationStatus, 300) || "",
    accountStatus: sourceText(source.accountStatus, 600) || "", dedupeState: sourceText(source.dedupeState, 600) || "",
    outboundBlocked: effectiveBlock ? 1 : 0, outboundBlockReason: effectiveBlock || "", owner: sourceText(source.owner, 300) || "",
    lastContactAt: sourceText(source.lastContactAt, 120) || "", nextAction: sourceText(source.nextAction, 3000) || "",
    nextActionDue: sourceText(source.nextActionDueAt, 120) || "", opportunitySummary: sourceText(source.bestOpportunity, 3000) || "",
    bestCommercialLane: sourceText(source.bestCommercialLane, 1200) || "", duplicateOfId: duplicateOfId || existing.duplicate_of_id || "",
    doNotContact: deriveDoNotContact(source) ? 1 : 0, sourceReference: sourceText(source.externalEmailEvidence, 3000) || "",
    contactJson: JSON.stringify(contact), detailsJson: JSON.stringify(details), sourceJson: JSON.stringify(source), internalNotes: sourceText(source.notes, 6000) || "",
  };
}

async function insertLead(db, source, operationalStage, duplicateOfId, email) {
  const now = new Date().toISOString();
  const values = rowValues(source, operationalStage, duplicateOfId);
  await db.prepare(`INSERT INTO supplier_leads
    (id,company,website,domain_key,operational_stage,priority,tree_state,strategic_lane,pipeline_stage,communication_state,account_status,dedupe_state,outbound_blocked,outbound_block_reason,owner,last_contact_at,next_action,next_action_due,opportunity_summary,best_commercial_lane,duplicate_of_id,do_not_contact,source_reference,contact_json,details_json,source_json,internal_notes,version,created_at,updated_at,updated_by)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?,?,?)`).bind(
      source.supplierLeadId, values.company, values.website, values.domain, values.operationalStage, values.priority, values.treeState, values.strategicLane,
      values.pipelineStage, values.communicationState, values.accountStatus, values.dedupeState, values.outboundBlocked, values.outboundBlockReason, values.owner,
      values.lastContactAt, values.nextAction, values.nextActionDue, values.opportunitySummary, values.bestCommercialLane, values.duplicateOfId, values.doNotContact,
      values.sourceReference, values.contactJson, values.detailsJson, values.sourceJson, values.internalNotes, now, now, email,
    ).run();
}

async function updateStoredLead(db, existing, source, operationalStage, duplicateOfId, email) {
  const values = rowValues(source, operationalStage, duplicateOfId, existing);
  const now = new Date().toISOString();
  await db.prepare(`UPDATE supplier_leads SET company=?,website=?,domain_key=?,operational_stage=?,priority=?,tree_state=?,strategic_lane=?,pipeline_stage=?,communication_state=?,account_status=?,dedupe_state=?,outbound_blocked=?,outbound_block_reason=?,owner=?,last_contact_at=?,next_action=?,next_action_due=?,opportunity_summary=?,best_commercial_lane=?,duplicate_of_id=?,do_not_contact=?,source_reference=?,contact_json=?,details_json=?,source_json=?,internal_notes=?,version=version+1,updated_at=?,updated_by=? WHERE id=?`).bind(
    values.company, values.website, values.domain, values.operationalStage, values.priority, values.treeState, values.strategicLane, values.pipelineStage,
    values.communicationState, values.accountStatus, values.dedupeState, values.outboundBlocked, values.outboundBlockReason, values.owner, values.lastContactAt,
    values.nextAction, values.nextActionDue, values.opportunitySummary, values.bestCommercialLane, values.duplicateOfId, values.doNotContact, values.sourceReference,
    values.contactJson, values.detailsJson, values.sourceJson, values.internalNotes, now, email, source.supplierLeadId,
  ).run();
}

async function createLead(db, body, email) {
  const requestedSource = body.source && typeof body.source === "object" && !Array.isArray(body.source) ? body.source : body;
  const id = /^SUP-\d{3}$/.test(String(requestedSource.supplierLeadId || "")) ? String(requestedSource.supplierLeadId) : await nextSupplierLeadId(db);
  const source = mergeSourceRecord(emptySourceRecord(id, requestedSource), requestedSource);
  source.supplierLeadId = id;
  const validation = validateSourceRecord(source, 0);
  if (validation.length) return jsonResponse({ error: validation[0], validation }, 400);
  const existing = await db.prepare("SELECT id FROM supplier_leads WHERE id=? LIMIT 1").bind(id).first();
  if (existing) return jsonResponse({ error: "Supplier Lead ID already exists" }, 409);
  const duplicate = await findDuplicate(db, source);
  await insertLead(db, source, OPERATIONAL_STAGE_SET.has(body.operationalStage) ? body.operationalStage : defaultOperationalStage(source), duplicate?.id || "", email);
  await addActivity(db, id, "created", duplicate ? `Created with possible duplicate: ${duplicate.company}` : "Supplier lead created", { duplicate }, email);
  const row = await db.prepare("SELECT * FROM supplier_leads WHERE id=? LIMIT 1").bind(id).first();
  return jsonResponse({ ok: true, lead: supplierRecord(row), duplicate }, 201);
}

async function updateLead(db, id, body, existingRecord, existingRow, email) {
  const incoming = body.source && typeof body.source === "object" && !Array.isArray(body.source) ? body.source : body;
  const source = mergeSourceRecord(existingRecord.source, incoming);
  source.supplierLeadId = id;
  const validation = validateSourceRecord(source, 0);
  if (validation.length) return jsonResponse({ error: validation[0], validation }, 400);
  const version = Number(body.version || existingRecord.version);
  if (version !== existingRecord.version) return jsonResponse({ error: "Supplier lead changed elsewhere. Refresh and try again." }, 409);
  const duplicate = await findDuplicate(db, source, id);
  const stage = OPERATIONAL_STAGE_SET.has(body.operationalStage) ? body.operationalStage : existingRecord.operationalStage;
  const before = canonicalStringify(existingRecord.source);
  const after = canonicalStringify(source);
  const changed = before !== after || stage !== existingRecord.operationalStage || (duplicate?.id || "") !== (existingRecord.duplicateOfId || "");
  if (!changed) return jsonResponse({ ok: true, lead: existingRecord, unchanged: true });
  await updateStoredLead(db, existingRow, source, stage, duplicate?.id || "", email);
  await addActivity(db, id, "updated", stringValue(body.activityNote, 3000) || "Supplier lead updated", { duplicate }, email);
  const row = await db.prepare("SELECT * FROM supplier_leads WHERE id=? LIMIT 1").bind(id).first();
  return jsonResponse({ ok: true, lead: supplierRecord(row), duplicate });
}

async function compareImport(db, payload) {
  const validation = validateSupplierDataset(payload);
  const result = { ...validation, created: 0, updated: 0, unchanged: 0 };
  if (!validation.valid) return result;
  const existingRows = await allRows(db);
  const byId = new Map(existingRows.map((row) => [row.id, row]));
  for (const source of payload.leads) {
    const row = byId.get(source.supplierLeadId);
    if (!row) result.created += 1;
    else if (canonicalStringify(parseSourceJson(row.source_json)) === canonicalStringify(source)) result.unchanged += 1;
    else result.updated += 1;
  }
  return result;
}

async function applyImport(db, payload, previewDigest, email) {
  const comparison = await compareImport(db, payload);
  if (!comparison.valid) return { status: 400, body: comparison };
  const digest = await datasetDigest(payload);
  if (!previewDigest || previewDigest !== digest) return { status: 409, body: { error: "Dataset changed after validation. Preview and validate the same JSON again." } };
  const existingRows = await allRows(db);
  const byId = new Map(existingRows.map((row) => [row.id, row]));
  let created = 0, updated = 0, unchanged = 0;
  for (const source of payload.leads) {
    const existing = byId.get(source.supplierLeadId);
    if (existing && canonicalStringify(parseSourceJson(existing.source_json)) === canonicalStringify(source)) { unchanged += 1; continue; }
    const stage = existing && OPERATIONAL_STAGE_SET.has(existing.operational_stage) ? existing.operational_stage : defaultOperationalStage(source);
    if (existing) {
      await updateStoredLead(db, existing, source, stage, existing.duplicate_of_id || "", email);
      updated += 1;
      await addActivity(db, source.supplierLeadId, "import_updated", "Protected supplier snapshot updated", { dataset: payload.dataset, snapshotDate: payload.snapshotDate, digest }, email);
    } else {
      await insertLead(db, source, stage, "", email);
      created += 1;
      await addActivity(db, source.supplierLeadId, "import_created", "Protected supplier snapshot imported", { dataset: payload.dataset, snapshotDate: payload.snapshotDate, digest }, email);
    }
  }
  return { status: 200, body: { ok: true, valid: true, created, updated, unchanged, blocked: comparison.blockedCount, invalid: 0, digest } };
}

async function exportDataset(db) {
  const rows = await allRows(db);
  const leads = rows.map((row) => parseSourceJson(row.source_json)).filter((source) => /^SUP-\d{3}$/.test(String(source.supplierLeadId || "")));
  leads.sort((a, b) => String(a.supplierLeadId).localeCompare(String(b.supplierLeadId)));
  const treeCounts = Object.fromEntries(SUPPLIER_TREE_STATES.map((state) => [state, leads.filter((lead) => lead.primaryBranch === state).length]));
  const snapshotDate = leads.map((lead) => String(lead.snapshotDate || "")).filter(Boolean).sort().at(-1) || "";
  return { schemaVersion: SUPPLIER_DATASET_IDENTITY.schemaVersion, dataset: SUPPLIER_DATASET_IDENTITY.dataset, snapshotDate, recordCount: leads.length, treeCounts, leads };
}

export async function handleAdminSupplierLeads(request, env, pathname) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function") return jsonResponse({ error: "Supplier lead storage is not configured" }, 503);
  const db = env.LEADS_DB;
  try { await ensureSupplierLeadSchema(db); }
  catch (error) { console.error(JSON.stringify({ event: "supplier_leads_schema_error", message: String(error?.message || error) })); return jsonResponse({ error: "Supplier lead storage is unavailable" }, 503); }

  const suffix = pathname.slice(ADMIN_SUPPLIER_LEADS_PATH.length).replace(/^\/+/, "");
  const [rawId, subresource] = suffix.split("/");
  const id = stringValue(decodeURIComponent(rawId || ""), 120);

  if (request.method === "GET" && !id) return jsonResponse({ ok: true, ...(await snapshot(db)) });
  if (request.method === "GET" && id === "export") return jsonResponse({ ok: true, ...(await exportDataset(db)) });

  if (request.method === "POST" && id === "import") {
    if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
    const parsed = await readBody(request);
    if (parsed.response) return parsed.response;
    const action = stringValue(parsed.body.action, 40).toLowerCase();
    const payload = parsed.body.dataset;
    if (action === "preview") {
      const comparison = await compareImport(db, payload);
      return jsonResponse({ ok: comparison.valid, step: "preview", ...comparison }, comparison.valid ? 200 : 400);
    }
    if (action === "validate") {
      const comparison = await compareImport(db, payload);
      const digest = comparison.valid ? await datasetDigest(payload) : "";
      return jsonResponse({ ok: comparison.valid, step: "validate", ...comparison, digest }, comparison.valid ? 200 : 400);
    }
    if (action === "apply") {
      const applied = await applyImport(db, payload, stringValue(parsed.body.previewDigest, 128), auth.session.email);
      return jsonResponse(applied.body, applied.status);
    }
    return jsonResponse({ error: "Unsupported import action" }, 400);
  }

  if (request.method === "GET" && id) {
    const row = await db.prepare("SELECT * FROM supplier_leads WHERE id=? LIMIT 1").bind(id).first();
    if (!row) return jsonResponse({ error: "Supplier lead not found" }, 404);
    const activity = await db.prepare("SELECT id,action,note,details_json,created_at,created_by FROM supplier_lead_activity WHERE supplier_lead_id=? ORDER BY created_at DESC LIMIT 100").bind(id).all();
    return jsonResponse({ ok: true, lead: supplierRecord(row), activity: (activity.results || []).map((item) => ({ id: item.id, action: item.action, note: item.note, details: parseJsonObject(item.details_json), createdAt: item.created_at, createdBy: item.created_by })) });
  }

  if (request.method !== "POST" || subresource !== "action") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const parsed = await readBody(request);
  if (parsed.response) return parsed.response;
  const body = parsed.body;
  const action = stringValue(body.action, 80).toLowerCase();
  if (id === "new" && action === "create") return createLead(db, body, auth.session.email);
  const row = await db.prepare("SELECT * FROM supplier_leads WHERE id=? LIMIT 1").bind(id).first();
  if (!row) return jsonResponse({ error: "Supplier lead not found" }, 404);
  const existing = supplierRecord(row);
  if (action === "update") return updateLead(db, id, body, existing, row, auth.session.email);
  if (action === "add_activity") {
    const note = stringValue(body.note, 3000);
    if (!note) return jsonResponse({ error: "Activity note is required" }, 400);
    await addActivity(db, id, stringValue(body.activityType, 80) || "note", note, {}, auth.session.email);
    return jsonResponse({ ok: true });
  }
  if (action === "outreach_check") {
    const reason = supplierOutreachBlock(existing);
    return reason ? jsonResponse({ ok: false, blocked: true, reason }, 409) : jsonResponse({ ok: true, blocked: false });
  }
  if (action === "send_outreach" || action === "new_outreach") {
    const reason = supplierOutreachBlock(existing);
    if (reason) return jsonResponse({ error: reason, blocked: true }, 409);
    return jsonResponse({ error: "Supplier outreach sending is not implemented in this workspace" }, 400);
  }
  return jsonResponse({ error: "Unsupported supplier lead action" }, 400);
}
