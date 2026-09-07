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
  "active_won",
  "existing_relationship",
  "contacted_waiting",
  "acknowledged_case_open",
  "draft_manager_review",
  "routing_failed_blocked",
  "qualified_solar_inverter",
  "qualified_complementary_dropship",
  "research_channel_verify",
  "backup_diversification_hold",
]);

const TREE_STATE_SET = new Set(SUPPLIER_TREE_STATES);
const PRIORITIES = new Set(["low", "normal", "high", "urgent"]);
const LANES = new Set(["product_sale", "referral_sale", "third_party_logistics", "dropship", "wholesale", "research"]);
const PIPELINE_STAGES = new Set(["research", "draft", "ready", "contacted", "responded", "qualified", "negotiating", "active", "won", "hold", "closed"]);
const ACCOUNT_STATES = new Set(["unknown", "needed", "applied", "open", "active", "declined", "do_not_contact"]);
const BLOCKED_TREE_STATES = new Set(["active_won", "existing_relationship", "contacted_waiting", "draft_manager_review", "routing_failed_blocked"]);
const MAX_BODY_BYTES = 96 * 1024;

function stringValue(value, max = 240) { return cleanString(value, max); }
function booleanValue(value) { return value === true || value === 1 || value === "1" || value === "true"; }
function enumValue(value, allowed, fallback) { const normalized = stringValue(value, 80).toLowerCase(); return allowed.has(normalized) ? normalized : fallback; }
function isoValue(value) {
  const raw = stringValue(value, 80);
  if (!raw) return "";
  const parsed = new Date(raw);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : "";
}
function dateValue(value) { const raw = stringValue(value, 20); return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : ""; }
function domainKey(value) {
  const raw = stringValue(value, 500).toLowerCase();
  if (!raw) return "";
  try { return new URL(raw.includes("://") ? raw : `https://${raw}`).hostname.replace(/^www\./, ""); }
  catch (_) { return raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0]; }
}

export function supplierOutreachBlock(record = {}) {
  if (record.doNotContact || record.accountStatus === "do_not_contact") return "Do not contact";
  if (BLOCKED_TREE_STATES.has(record.treeState)) return ({
    active_won: "Active supplier / won",
    existing_relationship: "Existing relationship — verify context",
    contacted_waiting: "Already contacted — waiting",
    draft_manager_review: "Draft requires manager review",
    routing_failed_blocked: "Routing failed / blocked",
  })[record.treeState];
  if (record.duplicateOfId) return "Possible duplicate — review before outreach";
  return "";
}

function detailsFromBody(body, existing = {}) {
  const current = existing.details || {};
  const next = body.details && typeof body.details === "object" && !Array.isArray(body.details) ? body.details : {};
  const pickText = (key, max = 1200) => body[key] === undefined && next[key] === undefined ? stringValue(current[key], max) : stringValue(body[key] ?? next[key], max);
  const pickBool = (key) => body[key] === undefined && next[key] === undefined ? Boolean(current[key]) : booleanValue(body[key] ?? next[key]);
  return {
    desiredProducts: pickText("desiredProducts", 2000), mapPolicy: pickText("mapPolicy", 1000), marginStatus: pickText("marginStatus", 1000),
    dealerWholesale: pickBool("dealerWholesale"), ecommerceResale: pickBool("ecommerceResale"), dropship: pickBool("dropship"), directToConsumer: pickBool("directToConsumer"), blindShipping: pickBool("blindShipping"),
    inventoryFeed: pickText("inventoryFeed", 700), trackingFeed: pickText("trackingFeed", 700), documentsStatus: pickText("documentsStatus", 1200),
    hawaiiGap: pickBool("hawaiiGap"), alaskaGap: pickBool("alaskaGap"), referralAvailable: pickBool("referralAvailable"), thirdPartyLogistics: pickBool("thirdPartyLogistics"), westCoastAdvantage: pickBool("westCoastAdvantage"),
  };
}

function contactFromBody(body, existing = {}) {
  const current = existing.contact || {};
  const next = body.contact && typeof body.contact === "object" && !Array.isArray(body.contact) ? body.contact : {};
  const pick = (key, max = 300) => body[key] === undefined && next[key] === undefined ? stringValue(current[key], max) : stringValue(body[key] ?? next[key], max);
  return { name: pick("name"), title: pick("title"), email: pick("email").toLowerCase(), phone: pick("phone", 100), preferredChannel: pick("preferredChannel", 80) };
}

function supplierRecord(row) {
  if (!row) return null;
  const details = parseJsonObject(row.details_json);
  const contact = parseJsonObject(row.contact_json);
  const record = {
    id: row.id, company: row.company, website: row.website, domainKey: row.domain_key, priority: row.priority,
    treeState: row.tree_state, strategicLane: row.strategic_lane, pipelineStage: row.pipeline_stage,
    communicationState: row.communication_state, accountStatus: row.account_status, owner: row.owner,
    lastContactAt: row.last_contact_at, nextAction: row.next_action, nextActionDue: row.next_action_due,
    opportunitySummary: row.opportunity_summary, bestCommercialLane: row.best_commercial_lane,
    duplicateOfId: row.duplicate_of_id, doNotContact: Boolean(row.do_not_contact), sourceReference: row.source_reference,
    internalNotes: row.internal_notes, details, contact, version: Number(row.version) || 1,
    createdAt: row.created_at, updatedAt: row.updated_at, updatedBy: row.updated_by,
  };
  record.outreachBlockReason = supplierOutreachBlock(record);
  record.outreachAllowed = !record.outreachBlockReason;
  return record;
}

async function ensureSupplierLeadSchema(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS supplier_leads (
    id TEXT PRIMARY KEY, company TEXT NOT NULL, website TEXT NOT NULL DEFAULT '', domain_key TEXT NOT NULL DEFAULT '',
    priority TEXT NOT NULL DEFAULT 'normal', tree_state TEXT NOT NULL DEFAULT 'research_channel_verify', strategic_lane TEXT NOT NULL DEFAULT 'research', pipeline_stage TEXT NOT NULL DEFAULT 'research',
    communication_state TEXT NOT NULL DEFAULT '', account_status TEXT NOT NULL DEFAULT 'unknown', owner TEXT NOT NULL DEFAULT '', last_contact_at TEXT NOT NULL DEFAULT '',
    next_action TEXT NOT NULL DEFAULT '', next_action_due TEXT NOT NULL DEFAULT '', opportunity_summary TEXT NOT NULL DEFAULT '', best_commercial_lane TEXT NOT NULL DEFAULT '',
    duplicate_of_id TEXT NOT NULL DEFAULT '', do_not_contact INTEGER NOT NULL DEFAULT 0, source_reference TEXT NOT NULL DEFAULT '',
    contact_json TEXT NOT NULL DEFAULT '{}', details_json TEXT NOT NULL DEFAULT '{}', internal_notes TEXT NOT NULL DEFAULT '',
    version INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT ''
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS supplier_lead_activity (
    id TEXT PRIMARY KEY, supplier_lead_id TEXT NOT NULL, action TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', details_json TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL, created_by TEXT NOT NULL DEFAULT ''
  )`).run();
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

async function findDuplicate(db, domain, excludeId = "") {
  if (!domain) return null;
  const row = await db.prepare("SELECT id,company,tree_state FROM supplier_leads WHERE domain_key=? AND id<>? ORDER BY updated_at DESC LIMIT 1").bind(domain, excludeId).first();
  return row ? { id: row.id, company: row.company, treeState: row.tree_state } : null;
}

async function snapshot(db) {
  const result = await db.prepare("SELECT * FROM supplier_leads ORDER BY CASE priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END, CASE WHEN next_action_due='' THEN 1 ELSE 0 END, next_action_due ASC, updated_at DESC LIMIT 1000").all();
  const leads = (result.results || []).map(supplierRecord);
  const counts = Object.fromEntries(SUPPLIER_TREE_STATES.map((state) => [state, leads.filter((lead) => lead.treeState === state).length]));
  return { leads, counts, total: leads.length };
}

async function createLead(db, body, email) {
  const company = stringValue(body.company, 220);
  if (!company) return jsonResponse({ error: "Supplier / company is required" }, 400);
  const website = stringValue(body.website, 700);
  const normalizedDomain = domainKey(body.domainKey || website);
  const duplicate = await findDuplicate(db, normalizedDomain);
  const now = new Date().toISOString();
  const id = `sup_${crypto.randomUUID()}`;
  const details = detailsFromBody(body);
  const contact = contactFromBody(body);
  const duplicateId = stringValue(body.duplicateOfId, 120) || duplicate?.id || "";
  await db.prepare(`INSERT INTO supplier_leads
    (id,company,website,domain_key,priority,tree_state,strategic_lane,pipeline_stage,communication_state,account_status,owner,last_contact_at,next_action,next_action_due,opportunity_summary,best_commercial_lane,duplicate_of_id,do_not_contact,source_reference,contact_json,details_json,internal_notes,version,created_at,updated_at,updated_by)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?,?,?)`).bind(
      id, company, website, normalizedDomain, enumValue(body.priority, PRIORITIES, "normal"), enumValue(body.treeState, TREE_STATE_SET, "research_channel_verify"),
      enumValue(body.strategicLane, LANES, "research"), enumValue(body.pipelineStage, PIPELINE_STAGES, "research"), stringValue(body.communicationState, 300), enumValue(body.accountStatus, ACCOUNT_STATES, "unknown"),
      stringValue(body.owner, 180), isoValue(body.lastContactAt), stringValue(body.nextAction, 600), dateValue(body.nextActionDue), stringValue(body.opportunitySummary, 2400), stringValue(body.bestCommercialLane, 1000),
      duplicateId, booleanValue(body.doNotContact) ? 1 : 0, stringValue(body.sourceReference, 1200), JSON.stringify(contact), JSON.stringify(details), stringValue(body.internalNotes, 6000), now, now, email,
    ).run();
  await addActivity(db, id, "created", duplicate ? `Created with possible duplicate: ${duplicate.company}` : "Supplier lead created", { duplicate }, email);
  const row = await db.prepare("SELECT * FROM supplier_leads WHERE id=? LIMIT 1").bind(id).first();
  return jsonResponse({ ok: true, lead: supplierRecord(row), duplicate }, 201);
}

async function updateLead(db, id, body, existing, email) {
  const company = body.company === undefined ? existing.company : stringValue(body.company, 220);
  if (!company) return jsonResponse({ error: "Supplier / company is required" }, 400);
  const website = body.website === undefined ? existing.website : stringValue(body.website, 700);
  const normalizedDomain = domainKey(body.domainKey === undefined ? (website || existing.domainKey) : body.domainKey);
  const duplicate = await findDuplicate(db, normalizedDomain, id);
  const details = detailsFromBody(body, existing);
  const contact = contactFromBody(body, existing);
  const version = Number(body.version || existing.version);
  if (version !== existing.version) return jsonResponse({ error: "Supplier lead changed elsewhere. Refresh and try again." }, 409);
  const now = new Date().toISOString();
  const result = await db.prepare(`UPDATE supplier_leads SET company=?,website=?,domain_key=?,priority=?,tree_state=?,strategic_lane=?,pipeline_stage=?,communication_state=?,account_status=?,owner=?,last_contact_at=?,next_action=?,next_action_due=?,opportunity_summary=?,best_commercial_lane=?,duplicate_of_id=?,do_not_contact=?,source_reference=?,contact_json=?,details_json=?,internal_notes=?,version=version+1,updated_at=?,updated_by=? WHERE id=? AND version=?`).bind(
    company, website, normalizedDomain,
    body.priority === undefined ? existing.priority : enumValue(body.priority, PRIORITIES, existing.priority),
    body.treeState === undefined ? existing.treeState : enumValue(body.treeState, TREE_STATE_SET, existing.treeState),
    body.strategicLane === undefined ? existing.strategicLane : enumValue(body.strategicLane, LANES, existing.strategicLane),
    body.pipelineStage === undefined ? existing.pipelineStage : enumValue(body.pipelineStage, PIPELINE_STAGES, existing.pipelineStage),
    body.communicationState === undefined ? existing.communicationState : stringValue(body.communicationState, 300),
    body.accountStatus === undefined ? existing.accountStatus : enumValue(body.accountStatus, ACCOUNT_STATES, existing.accountStatus),
    body.owner === undefined ? existing.owner : stringValue(body.owner, 180),
    body.lastContactAt === undefined ? existing.lastContactAt : isoValue(body.lastContactAt),
    body.nextAction === undefined ? existing.nextAction : stringValue(body.nextAction, 600),
    body.nextActionDue === undefined ? existing.nextActionDue : dateValue(body.nextActionDue),
    body.opportunitySummary === undefined ? existing.opportunitySummary : stringValue(body.opportunitySummary, 2400),
    body.bestCommercialLane === undefined ? existing.bestCommercialLane : stringValue(body.bestCommercialLane, 1000),
    body.duplicateOfId === undefined ? (existing.duplicateOfId || duplicate?.id || "") : stringValue(body.duplicateOfId, 120),
    body.doNotContact === undefined ? (existing.doNotContact ? 1 : 0) : (booleanValue(body.doNotContact) ? 1 : 0),
    body.sourceReference === undefined ? existing.sourceReference : stringValue(body.sourceReference, 1200),
    JSON.stringify(contact), JSON.stringify(details), body.internalNotes === undefined ? existing.internalNotes : stringValue(body.internalNotes, 6000), now, email, id, existing.version,
  ).run();
  if (!result?.meta?.changes) return jsonResponse({ error: "Supplier lead changed elsewhere. Refresh and try again." }, 409);
  await addActivity(db, id, "updated", stringValue(body.activityNote, 3000) || "Supplier lead updated", { duplicate }, email);
  const row = await db.prepare("SELECT * FROM supplier_leads WHERE id=? LIMIT 1").bind(id).first();
  return jsonResponse({ ok: true, lead: supplierRecord(row), duplicate });
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
  if (action === "update") return updateLead(db, id, body, existing, auth.session.email);
  if (action === "add_activity") {
    const note = stringValue(body.note, 3000);
    if (!note) return jsonResponse({ error: "Activity note is required" }, 400);
    await addActivity(db, id, stringValue(body.activityType, 80) || "note", note, {}, auth.session.email);
    return jsonResponse({ ok: true });
  }
  return jsonResponse({ error: "Unsupported supplier lead action" }, 400);
}
