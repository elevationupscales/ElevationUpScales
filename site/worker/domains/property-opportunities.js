import {
  jsonResponse,
  cleanString,
  escapeHtml,
  requireAdmin,
  sameOriginRequest,
  readLimitedJson,
  classifyProjectServiceArea,
  normalizeProjectState,
  normalizeProjectZip,
} from "../core-context.js";
import {
  PROPERTY_SOURCE_TYPES,
  protectedTargetingFields,
  normalizePropertyOpportunityInput,
  scorePropertyOpportunity,
  propertyOpportunityConcept,
} from "../shared/property-opportunity-core.js";

const PROPERTY_QUALIFICATION_STATUSES = new Set(["qualified","review","watch","archived"]);
const PROPERTY_OUTREACH_STATUSES = new Set(["not_sent","approved","sent","paused"]);
const PROPERTY_SLUG_RE = /^op-[a-f0-9]{32}$/;
const PROPERTY_QR_RE = /^qr-[a-f0-9]{24}$/;
let propertySchemaPromise = null;

function coordinate(value, min, max) {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? Math.round(number * 1e6) / 1e6 : null;
}

function safeSourceUrl(value) {
  const raw = cleanString(value, 500);
  if (!raw) return "";
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : "";
  } catch (_) {
    return "";
  }
}

function propertyOpportunityId() {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `PO-${day}-${crypto.randomUUID().split("-")[0].toUpperCase()}`;
}

function securePropertySlug() {
  return `op-${crypto.randomUUID().replaceAll("-", "")}`;
}

function secureQrId() {
  return `qr-${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
}

async function ensurePropertyOpportunitySchema(db) {
  if (!db || typeof db.prepare !== "function") throw new Error("LEADS_DB is not configured");
  if (!propertySchemaPromise) {
    propertySchemaPromise = (async () => {
      await db.prepare(`CREATE TABLE IF NOT EXISTS property_opportunities (
        opportunity_id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        property_address TEXT NOT NULL DEFAULT '',
        city TEXT NOT NULL DEFAULT '',
        state TEXT NOT NULL DEFAULT '',
        postal_code TEXT NOT NULL DEFAULT '',
        latitude REAL,
        longitude REAL,
        property_source TEXT NOT NULL DEFAULT 'manual',
        source_record_id TEXT NOT NULL DEFAULT '',
        source_date TEXT NOT NULL DEFAULT '',
        property_type TEXT NOT NULL DEFAULT '',
        estimated_roof_area REAL,
        estimated_ground_area REAL,
        solar_visible INTEGER NOT NULL DEFAULT 0,
        existing_solar_detected INTEGER,
        rural_or_offgrid_signal INTEGER,
        backup_power_applicability INTEGER,
        solar_opportunity_score INTEGER NOT NULL DEFAULT 0,
        lithium_opportunity_score INTEGER NOT NULL DEFAULT 0,
        combined_opportunity_score INTEGER NOT NULL DEFAULT 0,
        opportunity_type TEXT NOT NULL DEFAULT 'Solar + Storage',
        estimated_solar_kw_low REAL,
        estimated_solar_kw_high REAL,
        estimated_storage_kwh_low REAL,
        estimated_storage_kwh_high REAL,
        service_region TEXT NOT NULL DEFAULT '',
        serviceability_status TEXT NOT NULL DEFAULT '',
        qualification_status TEXT NOT NULL DEFAULT 'review',
        qualification_reason TEXT NOT NULL DEFAULT '',
        score_reason_codes_json TEXT NOT NULL DEFAULT '[]',
        source_evidence_json TEXT NOT NULL DEFAULT '{}',
        score_confidence TEXT NOT NULL DEFAULT 'LOW',
        concept_status TEXT NOT NULL DEFAULT 'text_concept_ready',
        concept_image_url TEXT NOT NULL DEFAULT '',
        concept_generated_at TEXT NOT NULL DEFAULT '',
        personalized_page_slug TEXT NOT NULL UNIQUE,
        qr_code_id TEXT NOT NULL UNIQUE,
        campaign TEXT NOT NULL DEFAULT 'property-intelligence-pilot',
        outreach_status TEXT NOT NULL DEFAULT 'not_sent',
        outreach_type TEXT NOT NULL DEFAULT '',
        outreach_sent_at TEXT NOT NULL DEFAULT '',
        outreach_opt_out INTEGER NOT NULL DEFAULT 0,
        first_visit_at TEXT NOT NULL DEFAULT '',
        last_visit_at TEXT NOT NULL DEFAULT '',
        page_visit_count INTEGER NOT NULL DEFAULT 0,
        qr_scan_count INTEGER NOT NULL DEFAULT 0,
        start_project_opened INTEGER NOT NULL DEFAULT 0,
        lead_submitted INTEGER NOT NULL DEFAULT 0,
        converted_lead_id TEXT NOT NULL DEFAULT '',
        assigned_rep TEXT NOT NULL DEFAULT '',
        next_action TEXT NOT NULL DEFAULT 'Review Property Opportunity',
        notes TEXT NOT NULL DEFAULT ''
      )`).run();
      await db.prepare("CREATE INDEX IF NOT EXISTS idx_property_opportunities_created ON property_opportunities(created_at DESC)").run();
      await db.prepare("CREATE INDEX IF NOT EXISTS idx_property_opportunities_score ON property_opportunities(combined_opportunity_score DESC,created_at DESC)").run();
      await db.prepare("CREATE INDEX IF NOT EXISTS idx_property_opportunities_region ON property_opportunities(service_region,qualification_status)").run();
      await db.prepare("CREATE INDEX IF NOT EXISTS idx_property_opportunities_lead ON property_opportunities(converted_lead_id)").run();
      return true;
    })().catch((error) => {
      propertySchemaPromise = null;
      throw error;
    });
  }
  return propertySchemaPromise;
}

function parseJson(value, fallback) {
  try {
    const parsed = JSON.parse(value || "");
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch (_) {
    return fallback;
  }
}

function propertyOpportunityRecord(row, origin = "") {
  const reasons = parseJson(row?.score_reason_codes_json, []);
  const evidence = parseJson(row?.source_evidence_json, {});
  const slug = cleanString(row?.personalized_page_slug, 80);
  const qr = cleanString(row?.qr_code_id, 80);
  const base = String(origin || "").replace(/\/$/, "");
  return {
    opportunityId: row?.opportunity_id || "",
    createdAt: row?.created_at || "",
    updatedAt: row?.updated_at || "",
    propertyAddress: row?.property_address || "",
    city: row?.city || "",
    state: row?.state || "",
    postalCode: row?.postal_code || "",
    latitude: row?.latitude ?? null,
    longitude: row?.longitude ?? null,
    propertySource: row?.property_source || "",
    sourceRecordId: row?.source_record_id || "",
    sourceDate: row?.source_date || "",
    propertyType: row?.property_type || "",
    estimatedRoofArea: row?.estimated_roof_area ?? null,
    estimatedGroundArea: row?.estimated_ground_area ?? null,
    existingSolarDetected: row?.existing_solar_detected === null || row?.existing_solar_detected === undefined ? null : Boolean(row.existing_solar_detected),
    ruralOrOffgridSignal: row?.rural_or_offgrid_signal === null || row?.rural_or_offgrid_signal === undefined ? null : Boolean(row.rural_or_offgrid_signal),
    backupPowerApplicability: row?.backup_power_applicability === null || row?.backup_power_applicability === undefined ? null : Boolean(row.backup_power_applicability),
    solarOpportunityScore: Number(row?.solar_opportunity_score) || 0,
    lithiumOpportunityScore: Number(row?.lithium_opportunity_score) || 0,
    combinedOpportunityScore: Number(row?.combined_opportunity_score) || 0,
    opportunityType: row?.opportunity_type || "",
    estimatedSolarKwLow: row?.estimated_solar_kw_low ?? null,
    estimatedSolarKwHigh: row?.estimated_solar_kw_high ?? null,
    estimatedStorageKwhLow: row?.estimated_storage_kwh_low ?? null,
    estimatedStorageKwhHigh: row?.estimated_storage_kwh_high ?? null,
    serviceRegion: row?.service_region || "",
    serviceabilityStatus: row?.serviceability_status || "",
    qualificationStatus: row?.qualification_status || "",
    qualificationReason: row?.qualification_reason || "",
    reasonCodes: Array.isArray(reasons) ? reasons : [],
    sourceEvidence: evidence,
    scoreConfidence: row?.score_confidence || "LOW",
    conceptStatus: row?.concept_status || "",
    conceptImageUrl: row?.concept_image_url || "",
    conceptGeneratedAt: row?.concept_generated_at || "",
    personalizedPageSlug: slug,
    qrCodeId: qr,
    campaign: row?.campaign || "",
    outreachStatus: row?.outreach_status || "",
    outreachType: row?.outreach_type || "",
    outreachSentAt: row?.outreach_sent_at || "",
    outreachOptOut: Boolean(row?.outreach_opt_out),
    firstVisitAt: row?.first_visit_at || "",
    lastVisitAt: row?.last_visit_at || "",
    pageVisitCount: Number(row?.page_visit_count) || 0,
    qrScanCount: Number(row?.qr_scan_count) || 0,
    startProjectOpened: Number(row?.start_project_opened) || 0,
    leadSubmitted: Boolean(row?.lead_submitted),
    convertedLeadId: row?.converted_lead_id || "",
    assignedRep: row?.assigned_rep || "",
    nextAction: row?.next_action || "",
    notes: row?.notes || "",
    publicPageUrl: base && slug ? `${base}/project-opportunity/${encodeURIComponent(slug)}` : "",
    qrTrackingUrl: base && qr ? `${base}/property-opportunity/qr/${encodeURIComponent(qr)}` : "",
    startProjectUrl: base && slug ? `${base}/property-opportunity/start/${encodeURIComponent(slug)}` : "",
  };
}

async function propertyOpportunitySummary(db) {
  const base = await db.prepare(`SELECT
    COUNT(*) AS discovered,
    SUM(CASE WHEN qualification_status='qualified' THEN 1 ELSE 0 END) AS qualified,
    SUM(CASE WHEN concept_status<>'not_generated' THEN 1 ELSE 0 END) AS concepts_generated,
    SUM(CASE WHEN outreach_status='sent' THEN 1 ELSE 0 END) AS outreach_sent,
    SUM(CASE WHEN first_visit_at<>'' THEN 1 ELSE 0 END) AS visited,
    SUM(CASE WHEN start_project_opened>0 THEN 1 ELSE 0 END) AS engaged,
    SUM(CASE WHEN converted_lead_id<>'' THEN 1 ELSE 0 END) AS leads,
    SUM(CASE WHEN lead_submitted=1 THEN 1 ELSE 0 END) AS submitted_leads
    FROM property_opportunities`).first();
  let estimates = 0;
  let projects = 0;
  try {
    const linked = await db.prepare(`SELECT
      SUM(CASE WHEN p.opportunity_status IN ('estimate_inspection_scheduled','field_review_complete','estimate_in_progress','estimate_sent') THEN 1 ELSE 0 END) AS estimates,
      SUM(CASE WHEN p.opportunity_status='won' THEN 1 ELSE 0 END) AS projects
      FROM property_opportunities po
      LEFT JOIN project_opportunities p ON p.reference=po.converted_lead_id
      WHERE po.converted_lead_id<>''`).first();
    estimates = Number(linked?.estimates) || 0;
    projects = Number(linked?.projects) || 0;
  } catch (_) {}
  return {
    discovered: Number(base?.discovered) || 0,
    qualified: Number(base?.qualified) || 0,
    conceptsGenerated: Number(base?.concepts_generated) || 0,
    outreachSent: Number(base?.outreach_sent) || 0,
    visited: Number(base?.visited) || 0,
    engaged: Number(base?.engaged) || 0,
    leads: Number(base?.leads) || 0,
    submittedLeads: Number(base?.submitted_leads) || 0,
    estimates,
    projects,
    pipelineValue: null,
  };
}

async function handleAdminPropertyOpportunities(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function") return jsonResponse({ error: "LEADS_DB is not configured" }, 503);
  await ensurePropertyOpportunitySchema(env.LEADS_DB);
  const origin = new URL(request.url).origin;

  if (request.method === "GET" || request.method === "HEAD") {
    const rows = await env.LEADS_DB.prepare("SELECT * FROM property_opportunities ORDER BY combined_opportunity_score DESC,created_at DESC LIMIT 300").all();
    const payload = {
      ok: true,
      mode: "manual-pilot",
      outboundAutomation: false,
      scoreModel: "deterministic-explainable-v1",
      summary: await propertyOpportunitySummary(env.LEADS_DB),
      opportunities: (rows.results || []).map((row) => propertyOpportunityRecord(row, origin)),
    };
    return request.method === "HEAD"
      ? new Response(null, { status: 200, headers: { "Cache-Control": "no-store" } })
      : jsonResponse(payload, 200);
  }

  if (request.method === "POST") {
    if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
    const parsed = await readLimitedJson(request, 32_000);
    if (parsed.error) return jsonResponse({ error: "Invalid Property Opportunity input" }, parsed.error === "too_large" ? 413 : 400);
    const body = parsed.value || {};
    const blockedFields = protectedTargetingFields(body);
    if (blockedFields.length) return jsonResponse({ error: "Sensitive or protected targeting fields are not accepted", blockedFields }, 400);
    const requestedSource = cleanString(body.sourceType || body.propertySource, 60).toLowerCase();
    if (requestedSource && !PROPERTY_SOURCE_TYPES.has(requestedSource)) return jsonResponse({ error: "Property source must be manual, synthetic_test, public_record, licensed, or partner_authorized" }, 400);

    const input = normalizePropertyOpportunityInput(body);
    const state = normalizeProjectState(input.state);
    const postalCode = normalizeProjectZip(input.postalCode);
    if (!input.propertyAddress || !input.city || !state || !postalCode) return jsonResponse({ error: "Property address, city, state and ZIP are required" }, 400);
    const latitude = coordinate(body.latitude, -90, 90);
    const longitude = coordinate(body.longitude, -180, 180);
    if ((body.latitude !== "" && body.latitude !== null && body.latitude !== undefined && latitude === null) ||
        (body.longitude !== "" && body.longitude !== null && body.longitude !== undefined && longitude === null)) {
      return jsonResponse({ error: "Invalid property coordinates" }, 400);
    }
    const sourceUrl = safeSourceUrl(input.sourceUrl);
    if (input.sourceUrl && !sourceUrl) return jsonResponse({ error: "Source URL must be HTTPS" }, 400);

    const service = classifyProjectServiceArea({ city: input.city, zip: postalCode, state });
    const normalized = { ...input, state, postalCode, latitude, longitude };
    const score = scorePropertyOpportunity(normalized, service);
    const concept = propertyOpportunityConcept(score);
    const now = new Date().toISOString();
    const opportunityId = propertyOpportunityId();
    const slug = securePropertySlug();
    const qrCodeId = secureQrId();
    const evidence = {
      sourceType: normalized.sourceType,
      sourceRecordId: normalized.sourceRecordId,
      sourceDate: normalized.sourceDate,
      sourceUrl,
      sourceSummary: normalized.sourceSummary,
      observedSignals: {
        propertyType: normalized.propertyType,
        estimatedRoofArea: normalized.estimatedRoofArea,
        estimatedGroundArea: normalized.estimatedGroundArea,
        solarExposure: normalized.solarExposure,
        roofOrientation: normalized.roofOrientation,
        shadeLevel: normalized.shadeLevel,
        existingSolarDetected: normalized.existingSolarDetected,
        ruralOrOffgridSignal: normalized.ruralOrOffgridSignal,
        backupPowerApplicability: normalized.backupPowerApplicability,
      },
    };

    await env.LEADS_DB.prepare(`INSERT INTO property_opportunities (
      opportunity_id,created_at,updated_at,property_address,city,state,postal_code,latitude,longitude,
      property_source,source_record_id,source_date,property_type,estimated_roof_area,estimated_ground_area,
      solar_visible,existing_solar_detected,rural_or_offgrid_signal,backup_power_applicability,
      solar_opportunity_score,lithium_opportunity_score,combined_opportunity_score,opportunity_type,
      estimated_solar_kw_low,estimated_solar_kw_high,estimated_storage_kwh_low,estimated_storage_kwh_high,
      service_region,serviceability_status,qualification_status,qualification_reason,
      score_reason_codes_json,source_evidence_json,score_confidence,concept_status,concept_image_url,concept_generated_at,
      personalized_page_slug,qr_code_id,campaign,outreach_status,outreach_type,outreach_sent_at,outreach_opt_out,
      first_visit_at,last_visit_at,page_visit_count,qr_scan_count,start_project_opened,lead_submitted,converted_lead_id,
      assigned_rep,next_action,notes
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(
        opportunityId,now,now,input.propertyAddress,input.city,state,postalCode,latitude,longitude,
        input.sourceType,input.sourceRecordId,input.sourceDate,input.propertyType,input.estimatedRoofArea,input.estimatedGroundArea,
        input.solarExposure === "high" ? 1 : 0,
        input.existingSolarDetected === null ? null : (input.existingSolarDetected ? 1 : 0),
        input.ruralOrOffgridSignal === null ? null : (input.ruralOrOffgridSignal ? 1 : 0),
        input.backupPowerApplicability === null ? null : (input.backupPowerApplicability ? 1 : 0),
        score.solarScore,score.lithiumScore,score.combinedScore,score.subtype,
        score.estimatedSolarKwLow,score.estimatedSolarKwHigh,score.estimatedStorageKwhLow,score.estimatedStorageKwhHigh,
        service.serviceArea,score.serviceabilityStatus,score.qualificationStatus,score.qualificationReason,
        JSON.stringify(score.reasons),JSON.stringify(evidence),score.scoreConfidence,"text_concept_ready","",now,
        slug,qrCodeId,input.campaign,"not_sent","","",0,
        "","",0,0,0,0,"",
        "","Review Property Opportunity",input.notes
      ).run();
    const row = await env.LEADS_DB.prepare("SELECT * FROM property_opportunities WHERE opportunity_id=? LIMIT 1").bind(opportunityId).first();
    return jsonResponse({ ok: true, created: true, concept, opportunity: propertyOpportunityRecord(row, origin) }, 201);
  }

  if (request.method === "PATCH") {
    if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
    const parsed = await readLimitedJson(request, 16_000);
    if (parsed.error) return jsonResponse({ error: "Invalid Property Opportunity update" }, 400);
    const body = parsed.value || {};
    const blockedFields = protectedTargetingFields(body);
    if (blockedFields.length) return jsonResponse({ error: "Sensitive or protected targeting fields are not accepted", blockedFields }, 400);
    const opportunityId = cleanString(body.opportunityId, 80);
    if (!opportunityId) return jsonResponse({ error: "Property Opportunity ID is required" }, 400);
    const current = await env.LEADS_DB.prepare("SELECT * FROM property_opportunities WHERE opportunity_id=? LIMIT 1").bind(opportunityId).first();
    if (!current) return jsonResponse({ error: "Property Opportunity not found" }, 404);

    const qualificationStatus = cleanString(body.qualificationStatus, 40).toLowerCase() || current.qualification_status;
    const outreachStatus = cleanString(body.outreachStatus, 40).toLowerCase() || current.outreach_status;
    const outreachOptOut = body.outreachOptOut === undefined ? Boolean(current.outreach_opt_out) : Boolean(body.outreachOptOut);
    if (!PROPERTY_QUALIFICATION_STATUSES.has(qualificationStatus)) return jsonResponse({ error: "Invalid qualification status" }, 400);
    if (!PROPERTY_OUTREACH_STATUSES.has(outreachStatus)) return jsonResponse({ error: "Invalid outreach status" }, 400);
    if (outreachOptOut && (outreachStatus === "approved" || outreachStatus === "sent")) return jsonResponse({ error: "Outreach is blocked because this record is opted out" }, 409);
    const assignedRep = cleanString(body.assignedRep, 120);
    const nextAction = cleanString(body.nextAction, 180) || current.next_action;
    const notes = cleanString(body.notes, 5000);
    const outreachType = cleanString(body.outreachType, 80);
    const now = new Date().toISOString();
    const outreachSentAt = outreachStatus === "sent" ? (current.outreach_sent_at || now) : current.outreach_sent_at;
    await env.LEADS_DB.prepare(`UPDATE property_opportunities
      SET qualification_status=?,outreach_status=?,outreach_type=?,outreach_sent_at=?,outreach_opt_out=?,assigned_rep=?,next_action=?,notes=?,updated_at=?
      WHERE opportunity_id=?`)
      .bind(qualificationStatus,outreachStatus,outreachType,outreachSentAt,outreachOptOut?1:0,assignedRep,nextAction,notes,now,opportunityId).run();
    const row = await env.LEADS_DB.prepare("SELECT * FROM property_opportunities WHERE opportunity_id=? LIMIT 1").bind(opportunityId).first();
    return jsonResponse({ ok: true, updated: true, outreachSentBySystem: false, opportunity: propertyOpportunityRecord(row, origin) }, 200);
  }

  return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD, POST, PATCH" });
}

async function propertyOpportunityBySlug(env, slug) {
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function" || !PROPERTY_SLUG_RE.test(slug || "")) return null;
  await ensurePropertyOpportunitySchema(env.LEADS_DB);
  return env.LEADS_DB.prepare("SELECT * FROM property_opportunities WHERE personalized_page_slug=? LIMIT 1").bind(slug).first();
}

async function resolvePropertyOpportunityAttribution(env, rawSlug) {
  const slug = cleanString(rawSlug, 80).toLowerCase();
  const row = await propertyOpportunityBySlug(env, slug);
  if (!row) return null;
  return {
    opportunityId: row.opportunity_id,
    slug,
    subtype: row.opportunity_type,
    campaign: row.campaign,
    propertySource: row.property_source,
    scoreConfidence: row.score_confidence,
    solarScore: Number(row.solar_opportunity_score) || 0,
    lithiumScore: Number(row.lithium_opportunity_score) || 0,
    combinedScore: Number(row.combined_opportunity_score) || 0,
    conceptViewed: Boolean(row.first_visit_at),
    qrScanCount: Number(row.qr_scan_count) || 0,
    convertedLeadId: row.converted_lead_id || "",
  };
}

async function linkPropertyOpportunityLead(env, opportunityId, reference, submitted = false) {
  if (!env.LEADS_DB || !opportunityId || !reference) return;
  await ensurePropertyOpportunitySchema(env.LEADS_DB);
  const now = new Date().toISOString();
  await env.LEADS_DB.prepare(`UPDATE property_opportunities SET
    converted_lead_id=CASE WHEN converted_lead_id='' THEN ? ELSE converted_lead_id END,
    lead_submitted=CASE WHEN ?=1 THEN 1 ELSE lead_submitted END,
    next_action=?,
    updated_at=?
    WHERE opportunity_id=?`).bind(reference,submitted ? 1 : 0,submitted?"Lead Submitted — Work Lead":"Lead Contact Captured — Work Lead",now,opportunityId).run();
}

function publicReasonList(row) {
  const reasons = parseJson(row?.score_reason_codes_json, []);
  return (Array.isArray(reasons) ? reasons : [])
    .filter((reason) => Number(reason?.points) > 0 && cleanString(reason?.label, 240))
    .slice(0, 5)
    .map((reason) => cleanString(reason.label, 240));
}

function propertyOpportunityHtml(row) {
  const reasons = publicReasonList(row);
  const solarLow = row.estimated_solar_kw_low;
  const solarHigh = row.estimated_solar_kw_high;
  const storageLow = row.estimated_storage_kwh_low;
  const storageHigh = row.estimated_storage_kwh_high;
  const slug = cleanString(row.personalized_page_slug, 80);
  const startHref = `/property-opportunity/start/${encodeURIComponent(slug)}`;
  const location = [row.property_address,row.city,row.state,row.postal_code].filter(Boolean).join(", ");
  const solarRange = solarLow === null || solarLow === undefined ? "Site measurement needed" : `${solarLow}–${solarHigh} kW planning range`;
  const storageRange = `${storageLow}–${storageHigh} kWh planning range`;
  const reasonMarkup = reasons.length ? reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("") : "<li>Additional site facts are needed before a stronger opportunity recommendation.</li>";
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#06141d">
<title>Property Power Opportunity | Elevation UpScales</title>
<style>
:root{color-scheme:dark;--bg:#041019;--panel:#0a1d28;--line:#244452;--cyan:#64dff5;--muted:#aec0c8}
*{box-sizing:border-box}body{margin:0;background:linear-gradient(145deg,#02090e,#071923 55%,#031017);color:#f5fbfd;font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
main{width:min(1080px,calc(100% - 32px));margin:auto;padding:54px 0 72px}.brand{font-weight:900;letter-spacing:.12em;color:var(--cyan);text-transform:uppercase}.hero{padding:44px;border:1px solid var(--line);background:rgba(7,25,35,.94);box-shadow:0 30px 90px #0008}.kicker{color:var(--cyan);font-weight:900;letter-spacing:.13em;text-transform:uppercase;font-size:.78rem}h1{font-size:clamp(2.3rem,7vw,5.2rem);line-height:.94;margin:.25em 0}.location{color:var(--muted);font-size:1.08rem}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:24px 0}.card{padding:22px;border:1px solid var(--line);background:#071722}.card span{display:block;color:var(--muted);font-size:.78rem;text-transform:uppercase;letter-spacing:.08em}.card strong{display:block;margin-top:6px;font-size:1.25rem}.reasons{padding:24px;border-left:3px solid var(--cyan);background:#071722}.reasons li+li{margin-top:8px}.notice{margin-top:20px;padding:18px;border:1px solid #3d4d55;color:#c7d5da;background:#071218}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.btn{display:inline-flex;min-height:52px;align-items:center;justify-content:center;padding:0 22px;border-radius:5px;text-decoration:none;font-weight:900;text-transform:uppercase}.primary{background:var(--cyan);color:#001219}.secondary{border:1px solid var(--line);color:#fff}
footer{margin-top:30px;color:#8fa5af;font-size:.8rem}@media(max-width:680px){main{padding-top:24px}.hero{padding:26px 20px}.grid{grid-template-columns:1fr}.btn{width:100%}}
</style></head><body><main>
<div class="brand">Elevation UpScales, Inc.</div>
<section class="hero">
<p class="kicker">Property Intelligence · Planning Preview</p>
<h1>${escapeHtml(row.opportunity_type || "Power Opportunity")}</h1>
<p class="location">${escapeHtml(location)}</p>
<div class="grid">
<div class="card"><span>Solar concept</span><strong>${escapeHtml(solarRange)}</strong></div>
<div class="card"><span>Storage concept</span><strong>${escapeHtml(storageRange)}</strong></div>
</div>
<section class="reasons"><p class="kicker">Why this property was selected for review</p><ul>${reasonMarkup}</ul></section>
<p class="notice">This is a preliminary planning concept based on limited property/source signals. It is not an engineering design, quote, guarantee, permit determination, financing offer, or installation commitment. A real project requires customer input, site verification, and final system design.</p>
<div class="actions"><a class="btn primary" href="${startHref}">Start a Project</a><a class="btn secondary" href="tel:+12088134998">Call Elevation</a></div>
</section>
<footer>Elevation UpScales, Inc. · Property Intelligence pilot · This private-link page is excluded from search indexing.</footer>
</main></body></html>`;
}

async function handlePropertyOpportunityPublic(request, env, slug) {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  const row = await propertyOpportunityBySlug(env, cleanString(slug, 80).toLowerCase());
  if (!row) return new Response("Property opportunity not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  if (request.method === "GET") {
    const now = new Date().toISOString();
    await env.LEADS_DB.prepare(`UPDATE property_opportunities SET
      first_visit_at=CASE WHEN first_visit_at='' THEN ? ELSE first_visit_at END,
      last_visit_at=?,page_visit_count=page_visit_count+1,next_action=CASE WHEN next_action='Review Property Opportunity' THEN 'Review Page Engagement' ELSE next_action END,updated_at=?
      WHERE opportunity_id=?`).bind(now,now,now,row.opportunity_id).run();
  }
  return new Response(request.method === "HEAD" ? null : propertyOpportunityHtml(row), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function handlePropertyOpportunityQr(request, env, qrCodeId) {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  const qr = cleanString(qrCodeId, 80).toLowerCase();
  if (!PROPERTY_QR_RE.test(qr) || !env.LEADS_DB) return new Response("Not Found", { status: 404 });
  await ensurePropertyOpportunitySchema(env.LEADS_DB);
  const row = await env.LEADS_DB.prepare("SELECT opportunity_id,personalized_page_slug FROM property_opportunities WHERE qr_code_id=? LIMIT 1").bind(qr).first();
  if (!row) return new Response("Not Found", { status: 404 });
  if (request.method === "GET") {
    const now = new Date().toISOString();
    await env.LEADS_DB.prepare("UPDATE property_opportunities SET qr_scan_count=qr_scan_count+1,next_action=CASE WHEN next_action IN ('Review Property Opportunity','Review Page Engagement') THEN 'Review QR Engagement' ELSE next_action END,updated_at=? WHERE opportunity_id=?").bind(now,row.opportunity_id).run();
  }
  return new Response(null, { status: 302, headers: { Location: `/project-opportunity/${encodeURIComponent(row.personalized_page_slug)}?via=qr`, "Cache-Control": "no-store" } });
}

async function handlePropertyOpportunityStart(request, env, slug) {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  const normalizedSlug = cleanString(slug, 80).toLowerCase();
  const row = await propertyOpportunityBySlug(env, normalizedSlug);
  if (!row) return new Response("Not Found", { status: 404 });
  if (request.method === "GET") {
    const now = new Date().toISOString();
    await env.LEADS_DB.prepare("UPDATE property_opportunities SET start_project_opened=start_project_opened+1,next_action='Follow Up on Start Project Activity',updated_at=? WHERE opportunity_id=?").bind(now,row.opportunity_id).run();
  }
  const params = new URLSearchParams({
    source: "property-intelligence",
    propertyOpportunity: normalizedSlug,
    campaign: cleanString(row.campaign, 120) || "property-intelligence-pilot",
  });
  return new Response(null, { status: 302, headers: { Location: `/start-a-project?${params.toString()}`, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}

export {
  ensurePropertyOpportunitySchema,
  propertyOpportunityRecord,
  handleAdminPropertyOpportunities,
  handlePropertyOpportunityPublic,
  handlePropertyOpportunityQr,
  handlePropertyOpportunityStart,
  resolvePropertyOpportunityAttribution,
  linkPropertyOpportunityLead,
};
