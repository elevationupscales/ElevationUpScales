const SHOP_ORIGIN = "https://elevationupscales-shop.fourthwall.com";
const PUBLIC_ORIGIN = "https://elevationupscales.com";
const MAX_PAGES = 10;
const MAX_PAGE_BYTES = 2_000_000;
const STORE_BUILD = "3.0.3";
const OPERATIONS_BUILD = "3.11.23-solar-intake-polish";

const SOLAR_NOTIFY_PATH = "/api/solar-build-notify";
const SOLAR_NOTIFY_MAX_BYTES = 56_000;
const DEFAULT_SOLAR_EMAIL_TO = "casey@elevationupscales.com";


const NOTIFICATION_ARCHITECTURE_VERSION = "gmail-ready-v1";
const NOTIFICATION_PROVIDER_GMAIL_ENABLED = false;
const NOTIFICATION_TYPES = Object.freeze({
  admin_solar_activity: { templateId: "admin_solar_activity_v1", sourceSystem: "solar", delivery: "current" },
  admin_marketplace_submission_attempt: { templateId: "admin_marketplace_submission_attempt_v1", sourceSystem: "marketplace", delivery: "current" },
  admin_marketplace_submission_issue: { templateId: "admin_marketplace_submission_issue_v1", sourceSystem: "marketplace", delivery: "current" },
  admin_new_marketplace_submission: { templateId: "admin_new_marketplace_submission_v1", sourceSystem: "marketplace", delivery: "current" },
  admin_marketplace_buyer_interest: { templateId: "admin_marketplace_buyer_interest_v1", sourceSystem: "marketplace", delivery: "current" },
  marketplace_submission_received: { templateId: "marketplace_submission_received_v1", sourceSystem: "marketplace", delivery: "future" },
  marketplace_listing_approved: { templateId: "marketplace_listing_approved_v1", sourceSystem: "marketplace", delivery: "future" },
  marketplace_listing_needs_information: { templateId: "marketplace_listing_needs_information_v1", sourceSystem: "marketplace", delivery: "future" },
  marketplace_listing_rejected: { templateId: "marketplace_listing_rejected_v1", sourceSystem: "marketplace", delivery: "future" },
  marketplace_followup: { templateId: "marketplace_followup_v1", sourceSystem: "marketplace", delivery: "future" },
  project_request_received: { templateId: "project_request_received_v1", sourceSystem: "projects", delivery: "future" },
  outside_area_review_received: { templateId: "outside_area_review_received_v1", sourceSystem: "projects", delivery: "future" },
  work_with_us_received: { templateId: "work_with_us_received_v1", sourceSystem: "work_with_us", delivery: "future" },
  admin_new_project_request: { templateId: "admin_new_project_request_v1", sourceSystem: "projects", delivery: "current" },
  admin_new_work_with_us_request: { templateId: "admin_new_work_with_us_request_v1", sourceSystem: "work_with_us", delivery: "current" },
  admin_notification_failure: { templateId: "admin_notification_failure_v1", sourceSystem: "internal", delivery: "future" },
});

const API_SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
};

const HTML_SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https://cloudflareinsights.com https://elevationupscales-shop.fourthwall.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests",
};

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...API_SECURITY_HEADERS,
      ...extraHeaders,
    },
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function jsonForInlineScript(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function cleanString(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanList(value, maxItems = 40, maxItemLength = 220) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map((item) => cleanString(item, maxItemLength)).filter(Boolean);
}

function sanitizeBuild(raw = {}) {
  return {
    package: cleanString(raw.package, 140),
    ecosystem: cleanString(raw.ecosystem, 140),
    classification: cleanString(raw.classification, 140),
    complexity: cleanString(raw.complexity, 140),
    panel: cleanString(raw.panel, 300),
    battery: cleanString(raw.battery, 300),
    inverter: cleanString(raw.inverter, 300),
    controller: cleanString(raw.controller, 300),
    alternator: cleanString(raw.alternator, 300),
    shore: cleanString(raw.shore, 300),
    monitoring: cleanString(raw.monitoring, 300),
    wiring: cleanString(raw.wiring, 300),
    loads: cleanList(raw.loads),
    services: cleanList(raw.services),
    alerts: cleanList(raw.alerts),
    estimatedDailySolar: cleanString(raw.estimatedDailySolar, 120),
    usableBatteryReserve: cleanString(raw.usableBatteryReserve, 120),
    estimatedDailyUsage: cleanString(raw.estimatedDailyUsage, 120),
    estimatedEnergyBalance: cleanString(raw.estimatedEnergyBalance, 120),
    powerUseContext: cleanString(raw.powerUseContext, 180),
    notes: cleanString(raw.notes, 2_500),
  };
}

function sanitizeContact(raw = {}) {
  return {
    name: cleanString(raw.name, 120),
    firstName: cleanString(raw.firstName, 80),
    phone: cleanString(raw.phone, 80),
    email: cleanString(raw.email, 180).toLowerCase(),
    location: cleanString(raw.location, 180),
    rv: cleanString(raw.rv, 260),
    preferred: cleanString(raw.preferred, 80),
    timing: cleanString(raw.timing, 120),
    installLocation: cleanString(raw.installLocation, 180),
    available: cleanString(raw.available, 80),
    details: cleanString(raw.details, 2_500),
    consent: Boolean(raw.consent),
  };
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function configuredEmail(value) {
  const raw = cleanString(value, 240).trim();
  if (!raw) return "";
  if (isValidEmail(raw)) return raw.toLowerCase();
  const match = raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match && isValidEmail(match[0]) ? match[0].toLowerCase() : "";
}

function isValidPhone(value) {
  const text = String(value || "").trim();
  const digits = text.replace(/\D/g, "");
  return /^[0-9+().\-\s]{7,30}$/.test(text) && digits.length >= 7 && digits.length <= 15;
}

function hasBasicContact(contact) {
  return Boolean(contact.name && contact.consent && (isValidPhone(contact.phone) || isValidEmail(contact.email)));
}

function hasEarlySolarContact(contact) {
  return Boolean(contact?.consent && (isValidPhone(contact?.phone) || isValidEmail(contact?.email)));
}

function sanitizeSolarMilestone(raw = {}) {
  const hasProgress = raw.progressPercent !== null && raw.progressPercent !== undefined && raw.progressPercent !== "";
  const progress = hasProgress ? Number(raw.progressPercent) : NaN;
  return {
    kind: cleanString(raw.kind, 80),
    currentStep: cleanString(raw.currentStep, 100),
    progressPercent: Number.isFinite(progress) ? Math.max(0, Math.min(100, Math.round(progress))) : null,
    powerSnapshotViewed: Boolean(raw.powerSnapshotViewed),
    summaryViewed: Boolean(raw.summaryViewed),
    reviewOpened: Boolean(raw.reviewOpened),
    notesSaved: Boolean(raw.notesSaved),
  };
}

function eventHeading(eventType) {
  return {
    builder_started: "ELEVATION UPSCALES — SOLAR BUILDER LEAD STARTED",
    review_opened: "ELEVATION UPSCALES — SOLAR BUILDER REVIEW OPENED",
    lead_submitted: "ELEVATION UPSCALES — COMPLETE SOLAR BUILDER LEAD",
  }[eventType] || "ELEVATION UPSCALES — SOLAR BUILDER UPDATE";
}

function buildEmailText({ eventType, reference, build, contact, page, createdAt }) {
  const lines = [
    eventHeading(eventType),
    `Reference: ${reference}`,
    `Created: ${createdAt}`,
    `Page: ${page}`,
    "",
    "CUSTOMER",
    `Name: ${contact.name || "Not specified"}`,
    `Phone: ${contact.phone || "Not specified"}`,
    `Email: ${contact.email || "Not specified"}`,
    `Preferred contact: ${contact.preferred || "Not specified"}`,
  ];

  if (eventType === "builder_started") {
    lines.push("Status: Contact captured before the system builder was unlocked.", "");
  } else if (eventType === "review_opened") {
    lines.push("Status: Customer reached Review My System. Detailed final intake may still be incomplete.", "");
  } else {
    lines.push(
      `Location: ${contact.location}`,
      `RV: ${contact.rv}`,
      `Project timing: ${contact.timing}`,
      `Installation location: ${contact.installLocation}`,
      `Available for inspection: ${contact.available}`,
      `Existing equipment/issues: ${contact.details}`,
      "",
    );
  }

  lines.push(
    "PRELIMINARY SYSTEM",
    `Starting package: ${build.package}`,
    `Equipment ecosystem: ${build.ecosystem || "Not classified"}`,
    `Classification: ${build.classification}`,
    `Complexity: ${build.complexity}`,
    `Panels: ${build.panel}`,
    `Battery bank: ${build.battery}`,
    `Inverter: ${build.inverter}`,
    `Solar controller: ${build.controller}`,
    `Alternator charging: ${build.alternator}`,
    `Shore power: ${build.shore}`,
    `Monitoring: ${build.monitoring}`,
    `Wiring/protection: ${build.wiring}`,
    `Loads: ${build.loads.join(", ") || "Not specified"}`,
    `Additional services: ${build.services.join(", ") || "None selected"}`,
    `Customer goals/notes: ${build.notes || "Not specified"}`,
    "",
    "REVIEW FLAGS",
    ...(build.alerts.length ? build.alerts.map((alert) => `- ${alert}`) : ["- None generated"]),
    "",
    "Final design, compatibility, installation scope, product availability, labor, and pricing require professional review.",
  );

  return lines.join("\n");
}

async function rateLimitSolarNotification(request, eventType, env) {
  const clientKey = await securityClientKey(request, env, `solar-${eventType}-burst`);
  const cache = caches.default;
  const ttlByEvent = { builder_started: 30, builder_progress: 5, review_opened: 300, lead_submitted: 30 };
  const ttl = ttlByEvent[eventType] || 30;
  const key = new Request(`https://rate-limit.invalid/solar/${eventType}/${clientKey}`, { method: "GET" });
  if (await cache.match(key)) return { allowed: false, retryAfter: ttl };
  await cache.put(key, new Response("1", { headers: { "Cache-Control": `max-age=${ttl}` } }));

  const hourlyLimits = { builder_started: 6, builder_progress: 60, review_opened: 12, lead_submitted: 6 };
  const dailyLimits = { builder_started: 20, builder_progress: 240, review_opened: 30, lead_submitted: 15 };
  const hourly = await durableRateLimit(env.LEADS_DB, request, env, `solar-${eventType}-hour`, hourlyLimits[eventType] || 12, 60 * 60);
  if (!hourly.allowed) return hourly;
  return durableRateLimit(env.LEADS_DB, request, env, `solar-${eventType}-day`, dailyLimits[eventType] || 30, 24 * 60 * 60);
}

function leadStatus(eventType) {
  return {
    builder_started: "builder_started",
    builder_progress: "builder_active",
    review_opened: "review_opened",
    lead_submitted: "lead_completed",
  }[eventType] || "builder_active";
}


const SOLAR_LEAD_STAGES = new Set(["potential", "new", "review", "contact", "qualified", "estimate_inspection", "won", "lost"]);
const SOLAR_LEAD_PRIORITIES = new Set(["low", "normal", "high", "urgent"]);
const SOLAR_CALL_STATUSES = new Set(["call_needed", "called", "no_answer", "left_voicemail", "spoke", "appointment_scheduled"]);

function parseJsonObject(value) {
  try { const parsed = JSON.parse(value || "{}"); return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}; }
  catch (_) { return {}; }
}

function leadClassificationFromEvent(eventType) {
  return eventType === "lead_submitted" ? "submitted" : "potential";
}

function leadIntentFromEvent(eventType) {
  return eventType === "review_opened" ? "high_intent" : "standard";
}

function leadStageLabel(value) {
  return ({
    potential: "Potential Lead", new: "New Lead", review: "Review", contact: "Contact", qualified: "Qualified", estimate_inspection: "Estimate / Inspection",
    contacting: "Contacting", estimate_inspection_scheduled: "Estimate / Inspection Scheduled", field_review_complete: "Field Review Complete",
    estimate_in_progress: "Estimate In Progress", estimate_sent: "Estimate Sent", follow_up: "Follow Up", won: "Won", lost: "Lost", closed: "Closed"
  })[value] || value || "New Lead";
}

function isActionableSolarLead(row) {
  const contact = parseJsonObject(row?.contact_json);
  const phone = cleanString(row?.phone || contact.phone, 80);
  const email = cleanString(row?.email || contact.email, 180).toLowerCase();
  return Boolean(isValidPhone(phone) || isValidEmail(email));
}

function solarLeadRecord(row) {
  const contact = parseJsonObject(row?.contact_json);
  const build = parseJsonObject(row?.build_json);
  const classification = cleanString(row?.lead_classification, 30) || (row?.last_event === "lead_submitted" || row?.status === "lead_completed" ? "submitted" : "potential");
  const intent = cleanString(row?.intent_level, 40) || (row?.last_event === "review_opened" ? "high_intent" : "standard");
  const projectDetails = parseJsonObject(row?.project_details_json);
  const projectRecord = projectControlRecord(projectDetails);
  const assignment = projectDetails?.controlCenterAssignment && typeof projectDetails.controlCenterAssignment === "object" && !Array.isArray(projectDetails.controlCenterAssignment) ? projectDetails.controlCenterAssignment : {};
  const pipelineStatus = projectPipelineStatus(row?.project_opportunity_status);
  const pipelineNextAction = projectPipelineNextAction(row?.project_next_action, row?.project_service_area);
  const legacyPriority = cleanString(row?.priority, 30).toLowerCase();
  const priority = projectRecord.priority || (PROJECT_RECORD_PRIORITIES.has(legacyPriority) && legacyPriority ? legacyPriority : "normal");
  const closed = ["won", "lost", "closed"].includes(pipelineStatus);
  return {
    reference: cleanString(row?.reference, 80),
    classification,
    classificationLabel: classification === "submitted" ? "Submitted Lead" : "Potential Lead",
    intentLevel: intent,
    highIntent: intent === "high_intent",
    leadStage: pipelineStatus,
    leadStageLabel: leadStageLabel(pipelineStatus),
    priority,
    assignedTo: cleanString(assignment.assignedRepresentative || row?.assigned_to, 120),
    nextActionType: pipelineNextAction,
    nextActionDueAt: cleanString(row?.next_action_due_at, 80),
    lastContactAt: cleanString(row?.last_contact_at, 80),
    lastContactMethod: cleanString(row?.last_contact_method, 40),
    callStatus: cleanString(row?.call_status, 60),
    customerResponseStatus: cleanString(row?.customer_response_status, 60),
    followUpRequired: !closed && pipelineNextAction !== "No Action",
    operationsNotes: projectRecord.internalNotes || cleanString(row?.operations_notes, 5000),
    lostReason: cleanString(row?.lost_reason, 1000),
    wonValue: row?.won_value == null ? null : Number(row.won_value),
    customerEmailStatus: cleanString(row?.customer_email_status, 60) || "not_recorded",
    customerEmailLastAt: cleanString(row?.customer_email_last_at, 80),
    customerEmailMessageId: cleanString(row?.customer_email_message_id, 240),
    submittedAt: cleanString(row?.submitted_at, 80),
    customer: {
      name: cleanString(row?.full_name || contact.name, 120),
      firstName: cleanString(row?.first_name || contact.firstName, 80),
      phone: cleanString(row?.phone || contact.phone, 80),
      email: cleanString(row?.email || contact.email, 180).toLowerCase(),
      preferred: cleanString(row?.preferred_contact || contact.preferred, 80),
      location: cleanString(contact.location, 180) || [cleanString(row?.project_city,120), cleanString(row?.project_state,10), cleanString(row?.project_zip,20)].filter(Boolean).join(" "),
      rv: cleanString(contact.rv, 260),
      timing: cleanString(contact.timing, 120),
      installLocation: cleanString(contact.installLocation, 180),
      available: cleanString(contact.available, 80),
      details: cleanString(contact.details, 2500),
    },
    city: cleanString(row?.project_city, 120),
    state: cleanString(row?.project_state, 10),
    zip: cleanString(row?.project_zip, 20),
    serviceArea: cleanString(row?.project_service_area, 80) || "manual_review",
    build,
    sourcePage: cleanString(row?.page, 500),
    customerActivity: cleanString(row?.last_event, 60),
    sourceStatus: cleanString(row?.status, 60),
    notificationEmailStatus: cleanString(row?.email_status, 60),
    notificationEmailMessageId: cleanString(row?.email_message_id, 240),
    createdAt: cleanString(row?.created_at, 80),
    updatedAt: cleanString(row?.updated_at, 80),
    actionable: isActionableSolarLead(row),
    pipelineAuthoritative: true,
  };
}

async function recordSolarLeadActivity(env, reference, action, details = {}, adminEmail = "system", dedupeSeconds = 0) {
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function") return false;
  try {
    if (dedupeSeconds > 0) {
      const cutoff = new Date(Date.now() - dedupeSeconds * 1000).toISOString();
      const prior = await env.LEADS_DB.prepare("SELECT id FROM solar_lead_activity WHERE reference=? AND action=? AND created_at>=? LIMIT 1").bind(cleanString(reference,80), cleanString(action,80), cutoff).first();
      if (prior) return true;
    }
    await env.LEADS_DB.prepare(`INSERT INTO solar_lead_activity (id, reference, action, details_json, admin_email, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`)
      .bind(crypto.randomUUID(), cleanString(reference, 80), cleanString(action, 80), JSON.stringify(details || {}), cleanString(adminEmail, 180), new Date().toISOString()).run();
    return true;
  } catch (error) {
    console.error(JSON.stringify({ event: "solar_lead_activity_error", reference, action, message: error instanceof Error ? error.message : String(error) }));
    return false;
  }
}

async function updateSolarLeadOperationalClassification(env, reference, eventType) {
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function") return false;
  const now = new Date().toISOString();
  try {
    if (eventType === "lead_submitted") {
      await env.LEADS_DB.prepare(`UPDATE solar_leads SET
        lead_classification='submitted',
        intent_level='submitted',
        submitted_at=COALESCE(NULLIF(submitted_at,''), ?)
        WHERE reference=?`).bind(now, reference).run();
    } else {
      await env.LEADS_DB.prepare(`UPDATE solar_leads SET
        lead_classification=CASE WHEN lead_classification='submitted' THEN 'submitted' ELSE 'potential' END,
        intent_level=CASE WHEN ?='review_opened' THEN 'high_intent' WHEN intent_level IS NULL OR intent_level='' THEN 'standard' ELSE intent_level END
        WHERE reference=?`).bind(eventType, reference).run();
    }
    const activityAction = eventType === "lead_submitted" ? "lead_submitted" : `customer_${eventType}`;
    await recordSolarLeadActivity(env, reference, activityAction, { eventType }, "system", 15);
    return true;
  } catch (error) {
    // Additive v3.3.7 schema may not be installed yet. Solar intake storage must remain functional.
    console.error(JSON.stringify({ event: "solar_lead_operations_classification_degraded", reference, eventType, message: error instanceof Error ? error.message : String(error) }));
    return false;
  }
}

async function saveLead(env, { eventType, reference, build, contact, page, createdAt, emailStatus = "pending", emailMessageId = "" }) {
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function") return { stored: false };
  try {
    const now = new Date().toISOString();
    await env.LEADS_DB.prepare(`INSERT INTO solar_leads (
      reference, status, first_name, full_name, phone, email, preferred_contact, consent,
      contact_json, build_json, page, created_at, updated_at, last_event, email_status, email_message_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(reference) DO UPDATE SET
      status=excluded.status,
      first_name=COALESCE(NULLIF(excluded.first_name,''), solar_leads.first_name),
      full_name=COALESCE(NULLIF(excluded.full_name,''), solar_leads.full_name),
      phone=COALESCE(NULLIF(excluded.phone,''), solar_leads.phone),
      email=COALESCE(NULLIF(excluded.email,''), solar_leads.email),
      preferred_contact=COALESCE(NULLIF(excluded.preferred_contact,''), solar_leads.preferred_contact),
      consent=MAX(solar_leads.consent, excluded.consent),
      contact_json=excluded.contact_json,
      build_json=excluded.build_json,
      page=excluded.page,
      updated_at=excluded.updated_at,
      last_event=excluded.last_event,
      email_status=excluded.email_status,
      email_message_id=COALESCE(NULLIF(excluded.email_message_id,''), solar_leads.email_message_id)`,
    ).bind(
      reference,
      leadStatus(eventType),
      contact.firstName || contact.name.split(/\s+/)[0] || "",
      contact.name,
      contact.phone,
      contact.email,
      contact.preferred,
      contact.consent ? 1 : 0,
      JSON.stringify(contact),
      JSON.stringify(build),
      page,
      createdAt || now,
      now,
      eventType,
      emailStatus,
      emailMessageId,
    ).run();
    await updateSolarLeadOperationalClassification(env, reference, eventType);
    return { stored: true };
  } catch (error) {
    console.error(JSON.stringify({ event: "solar_lead_storage_error", reference, message: error instanceof Error ? error.message : String(error) }));
    return { stored: false };
  }
}

function safeSolarProjectContext(value){
  const raw=value&&typeof value==="object"&&!Array.isArray(value)?value:{};
  const city=cleanString(raw.city,120),zip=normalizeProjectZip(raw.zip),state=normalizeProjectState(raw.state),source=cleanString(raw.source,80);
  if(!city||!zip||!state)return{valid:false,city:"",zip:"",state:"",serviceArea:"manual_review",source};
  const area=classifyProjectServiceArea({city,zip,state});
  return{valid:true,city,zip,state,serviceArea:area.serviceArea,source};
}

function solarBuilderStage(eventType) {
  if (eventType === "lead_submitted") return { status: "completed_submitted", label: "Solar Builder Lead — Completed / Submitted" };
  if (eventType === "review_opened") return { status: "in_progress", label: "Solar Builder Lead — Review Opened" };
  return { status: "in_progress", label: "Solar Builder Lead — In Progress" };
}

function solarBuilderComponents(build = {}) {
  return {
    panel: cleanString(build.panel, 300), battery: cleanString(build.battery, 300), inverter: cleanString(build.inverter, 300),
    controller: cleanString(build.controller, 300), alternator: cleanString(build.alternator, 300), shore: cleanString(build.shore, 300),
    monitoring: cleanString(build.monitoring, 300), wiring: cleanString(build.wiring, 300),
  };
}

async function solarProjectOpportunityRow(env, reference) {
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function") return null;
  return env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
}

function solarContactFromOpportunity(row) {
  const name = cleanString(row?.customer_name, 120);
  return sanitizeContact({
    name,
    firstName: name.split(/\s+/)[0] || "",
    phone: cleanString(row?.phone, 80),
    email: cleanString(row?.email, 180),
    preferred: cleanString(row?.preferred_contact, 80),
    consent: Boolean(row?.consent),
    location: [cleanString(row?.city,120), cleanString(row?.state,10), cleanString(row?.zip,20)].filter(Boolean).join(" "),
  });
}

async function solarProjectDetails(env, reference, incoming = {}) {
  const existing = await mergeProjectIntakeDetails(env, reference, {});
  const previousBuilder = existing?.solarBuilder && typeof existing.solarBuilder === "object" && !Array.isArray(existing.solarBuilder) ? existing.solarBuilder : {};
  const nextBuilder = incoming?.solarBuilder && typeof incoming.solarBuilder === "object" && !Array.isArray(incoming.solarBuilder) ? incoming.solarBuilder : {};
  return { ...existing, ...incoming, solarBuilder: { ...previousBuilder, ...nextBuilder } };
}

async function syncSolarProjectOpportunity(env,{eventType,reference,build,contact,journeyId="",projectContext=null,milestone={},page=""}){
  if(!env.LEADS_DB||typeof env.LEADS_DB.prepare!=="function")return{stored:false,reason:"database_unavailable"};
  const existing=await solarProjectOpportunityRow(env,reference);
  if(eventType!=="builder_started"&&!existing)return{stored:false,reason:"missing_reference"};
  const now=new Date().toISOString(),context=safeSolarProjectContext(projectContext),priorDetails=parseJsonObject(existing?.details_json),priorBuilder=priorDetails?.solarBuilder&&typeof priorDetails.solarBuilder==="object"&&!Array.isArray(priorDetails.solarBuilder)?priorDetails.solarBuilder:{};
  let stage=solarBuilderStage(eventType);
  if(eventType==="builder_progress"&&priorBuilder.reviewOpenedAt)stage={status:"in_progress",label:"Solar Builder Lead — Review Opened"};
  const priorServiceArea=cleanString(existing?.service_area,80)||"manual_review";
  const serviceArea=context.valid?context.serviceArea:priorServiceArea;
  const city=context.valid?context.city:cleanString(existing?.city,120),zip=context.valid?context.zip:cleanString(existing?.zip,20),state=context.valid?context.state:cleanString(existing?.state,10);
  const category=cleanString(build?.package,180)||cleanString(existing?.project_category,180)||"Solar";
  const finalSummary=cleanString(build?.notes,2500);
  const summary=eventType==="lead_submitted"?(finalSummary&&finalSummary!=="Not specified"?finalSummary:cleanString(build?.classification,240)||category):`${stage.label}${category?` • ${category}`:""}`;
  const builderDetails={stage:stage.status,stageLabel:stage.label,buildReference:reference,buildVersion:OPERATIONS_BUILD,lastEvent:eventType,lastMilestone:cleanString(milestone?.kind,80),lastActivityAt:now,entrySource:context.source||cleanString(priorBuilder.entrySource,80)||"direct",package:category,classification:cleanString(build?.classification,180),components:solarBuilderComponents(build)};
  const milestoneStep=cleanString(milestone?.currentStep,100);
  if(milestoneStep)builderDetails.currentStep=milestoneStep;
  if(Number.isFinite(milestone?.progressPercent))builderDetails.progressPercent=Math.max(0,Math.min(100,Math.round(milestone.progressPercent)));
  if(finalSummary&&finalSummary!=="Not specified")builderDetails.notes=finalSummary;
  if(eventType==="builder_started"){builderDetails.contactCapturedAt=now;builderDetails.leadCreatedAt=now;builderDetails.buildStartedAt=now;}
  if(milestone?.powerSnapshotViewed)builderDetails.powerSnapshotViewedAt=now;
  if(milestone?.summaryViewed)builderDetails.summaryViewedAt=now;
  if(eventType==="review_opened"||milestone?.reviewOpened)builderDetails.reviewOpenedAt=now;
  if(milestone?.notesSaved&&finalSummary&&finalSummary!=="Not specified")builderDetails.notesSavedAt=now;
  if(eventType==="lead_submitted"){builderDetails.completedAt=now;builderDetails.submittedAt=now;builderDetails.progressPercent=100;}
  const cleanJourney=cleanString(journeyId,120),cleanPage=cleanString(page,500);
  const incomingDetails={solarTechnicalReference:reference,technicalExtension:"solar_leads",intakeIntent:"Solar / Off-Grid",solarBuilder:builderDetails};
  if(cleanJourney){if(priorDetails?.journeyId)incomingDetails.lastJourneyId=cleanJourney;else incomingDetails.journeyId=cleanJourney;}
  if(cleanPage){incomingDetails.sourcePage=cleanString(priorDetails?.sourcePage,500)||cleanPage;incomingDetails.lastPage=cleanPage;}
  if(context.valid)incomingDetails.guidedProjectLocation={city:context.city,zip:context.zip,state:context.state};
  const details=await solarProjectDetails(env,reference,incomingDetails);
  try{
    if(eventType==="builder_started"){
      await env.LEADS_DB.prepare(`INSERT INTO project_opportunities (reference,project_family,customer_name,phone,email,preferred_contact,consent,city,zip,state,service_area,intake_status,opportunity_status,project_category,summary,source,next_action,details_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(reference) DO UPDATE SET phone=COALESCE(NULLIF(excluded.phone,''),project_opportunities.phone),email=COALESCE(NULLIF(excluded.email,''),project_opportunities.email),consent=MAX(project_opportunities.consent,excluded.consent),intake_status=CASE WHEN project_opportunities.intake_status='submitted' THEN project_opportunities.intake_status ELSE 'contact_captured' END,opportunity_status=CASE WHEN project_opportunities.opportunity_status IS NULL OR project_opportunities.opportunity_status='' THEN 'new' ELSE project_opportunities.opportunity_status END,project_category=CASE WHEN project_opportunities.intake_status='submitted' THEN project_opportunities.project_category ELSE excluded.project_category END,summary=CASE WHEN project_opportunities.intake_status='submitted' THEN project_opportunities.summary ELSE excluded.summary END,source=CASE WHEN project_opportunities.source IS NULL OR project_opportunities.source='' THEN excluded.source ELSE project_opportunities.source END,next_action=CASE WHEN project_opportunities.intake_status='submitted' THEN project_opportunities.next_action WHEN project_opportunities.next_action IS NULL OR project_opportunities.next_action='' OR project_opportunities.next_action='Follow Up' THEN 'Follow Up' ELSE project_opportunities.next_action END,details_json=excluded.details_json,updated_at=excluded.updated_at`).bind(reference,"solar","",cleanString(contact?.phone,80),cleanString(contact?.email,180).toLowerCase(),"",contact?.consent?1:0,city,zip,state,serviceArea,"contact_captured","new",category,summary,"Solar Builder","Follow Up",JSON.stringify(details),now,now).run();
      return{stored:true,created:!existing,stage:stage.status};
    }
    if(eventType==="lead_submitted"){
      const fallbackLocation=cleanString(contact?.location,120),finalCity=context.valid?context.city:(cleanString(existing?.city,120)||fallbackLocation),finalZip=context.valid?context.zip:cleanString(existing?.zip,20),finalState=context.valid?context.state:cleanString(existing?.state,10),finalServiceArea=context.valid?context.serviceArea:(cleanString(existing?.service_area,80)||"manual_review"),defaultNextAction=(finalServiceArea==="manual_review"||finalServiceArea==="outside_standard_area")?"Verify Service Area":"Call Customer";
      await env.LEADS_DB.prepare(`UPDATE project_opportunities SET customer_name=?,phone=?,email=?,preferred_contact=?,consent=?,city=?,zip=?,state=?,service_area=?,intake_status='submitted',opportunity_status=CASE WHEN opportunity_status IS NULL OR opportunity_status='' OR opportunity_status IN ('potential','submitted','outside_area_review') THEN 'new' ELSE opportunity_status END,project_category=?,summary=?,source='Solar Builder',next_action=CASE WHEN next_action IS NULL OR next_action='' OR next_action='Follow Up' OR next_action IN ('Review Potential Project','Review Submitted Project','Outside Area Review') THEN ? ELSE next_action END,details_json=?,updated_at=? WHERE reference=?`).bind(cleanString(contact?.name,120),cleanString(contact?.phone,80),cleanString(contact?.email,180).toLowerCase(),cleanString(contact?.preferred,80),contact?.consent?1:0,finalCity,finalZip,finalState,finalServiceArea,category,summary,defaultNextAction,JSON.stringify(details),now,reference).run();
      return{stored:true,created:false,stage:stage.status};
    }
    await env.LEADS_DB.prepare(`UPDATE project_opportunities SET project_category=?,summary=?,details_json=?,updated_at=? WHERE reference=?`).bind(category,summary,JSON.stringify(details),now,reference).run();
    return{stored:true,created:false,stage:stage.status};
  }catch(error){console.error(JSON.stringify({event:"solar_project_pipeline_sync_error",eventType,reference,message:error instanceof Error?error.message:String(error)}));return{stored:false,reason:"storage_error"};}
}

function solarOwnerNotificationSpec({reference,eventType,contact,build,stageLabel}) {
  const key=eventType==="builder_started"?"lead_created":eventType==="review_opened"?"solar_review_opened":"solar_completed";
  const label=eventType==="builder_started"?"New Solar Builder Lead":eventType==="review_opened"?"Solar Builder Review Opened":"Solar Builder Completed";
  const text=[`${label} was stored successfully in Command Center.`,"",`Reference: ${reference}`,`Customer: ${cleanString(contact?.name,120)||"Not provided yet"}`,`Phone: ${cleanString(contact?.phone,80)||"Not provided"}`,`Email: ${cleanString(contact?.email,180)||"Not provided"}`,`Location: ${cleanString(contact?.location,180)||"Not provided"}`,`Stage: ${cleanString(stageLabel,160)}`,`Package: ${cleanString(build?.package,180)||"Not selected"}`,`Classification: ${cleanString(build?.classification,180)||"Not classified"}`,`Next Action: ${eventType==="lead_submitted"?"Review Lead":"Follow Up"}`,"Source: Solar Builder","","Lead storage is authoritative. This alert is informational only."].join("\n");
  return{recordFamily:"project",reference,key,lane:"Solar Builder",notificationType:"admin_solar_activity",subject:`${label} — ${reference}`,text,replyTo:cleanString(contact?.email,180)};
}


function notificationDefinition(notificationType) {
  const type = cleanString(notificationType, 100);
  return NOTIFICATION_TYPES[type] ? { type, ...NOTIFICATION_TYPES[type] } : null;
}

function notificationTransportState(env) {
  if (env.EMAIL && typeof env.EMAIL.send === "function") return { available: true, provider: "cloudflare_binding" };
  if (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_EMAIL_API_TOKEN) return { available: true, provider: "cloudflare_rest" };
  return { available: false, provider: "none" };
}

function sanitizedNotificationFailure(error) {
  const message = cleanString(error instanceof Error ? error.message : String(error), 240).toLowerCase();
  if (/sender|recipient|email.*configured|invalid.*email/.test(message)) return { code: "configuration_error", reason: "Notification sender or recipient configuration is invalid." };
  if (/no email service|not configured|provider.*unavailable/.test(message)) return { code: "provider_unavailable", reason: "Notification delivery provider is unavailable." };
  if (/429|rate|limit|quota/.test(message)) return { code: "provider_limited", reason: "Notification provider temporarily limited the request." };
  if (/401|403|auth|token|credential/.test(message)) return { code: "provider_auth", reason: "Notification provider authentication requires attention." };
  return { code: "provider_error", reason: "Notification provider returned an error." };
}

async function sendNotification(env, notification = {}) {
  const definition = notificationDefinition(notification.type);
  if (!definition) throw new Error("Unsupported notification type.");
  if (definition.delivery !== "current") throw new Error("Notification type is prepared but not activated for delivery.");

  const recipientEmail = configuredEmail(notification.recipientEmail);
  const recipientName = cleanString(notification.recipientName, 120);
  const fromEmail = configuredEmail(notification.fromEmail);
  const fromName = cleanString(notification.fromName, 120) || "Elevation UpScales";
  const replyTo = cleanString(notification.replyTo, 180).toLowerCase();
  const subject = cleanString(notification.subject, 300);
  const text = cleanString(notification.text, 20_000);
  if (!isValidEmail(fromEmail) || !isValidEmail(recipientEmail)) { const error = new Error("Notification sender or recipient is not configured."); error.code = "configuration_error"; throw error; }
  if (!subject || !text) { const error = new Error("Notification subject and body are required."); error.code = "template_error"; throw error; }

  // Gmail intentionally remains dormant in this architecture-preparation build.
  // No Gmail OAuth values are read, no Gmail endpoint is contacted, and current
  // approved Cloudflare transport remains the only active provider.
  if (NOTIFICATION_PROVIDER_GMAIL_ENABLED) throw new Error("Gmail provider cannot be enabled in this preparation build.");

  const html = `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#111"><h2>${escapeHtml(subject)}</h2><pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#f4f4f4;padding:16px;border-radius:8px">${escapeHtml(text)}</pre></div>`;
  const transport = notificationTransportState(env);
  if (!transport.available) { const error = new Error("Notification delivery provider is unavailable."); error.code = "provider_unavailable"; throw error; }

  try {
    if (transport.provider === "cloudflare_binding") {
      const result = await env.EMAIL.send({
        from: { email: fromEmail, name: fromName },
        to: { email: recipientEmail, name: recipientName || recipientEmail },
        subject,
        text,
        html,
        ...(replyTo && isValidEmail(replyTo) ? { replyTo } : {}),
      });
      const providerMessageId = cleanString(result?.messageId, 240);
      return { status: "sent", provider: "cloudflare_binding", providerMessageId, messageId: providerMessageId, templateId: definition.templateId, notificationType: definition.type };
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(env.CLOUDFLARE_ACCOUNT_ID)}/email/sending/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: fromEmail, to: recipientEmail, subject, text, html, ...(replyTo && isValidEmail(replyTo) ? { reply_to: replyTo } : {}) }),
    });
    const body = await response.json().catch(async () => ({ detail: (await response.text()).slice(0, 800) }));
    if (!response.ok || body?.success === false) throw new Error(`Cloudflare Email Service returned ${response.status}`);
    const providerMessageId = cleanString(body?.result?.delivered?.[0] || body?.result?.queued?.[0], 240);
    return { status: "sent", provider: "cloudflare_rest", providerMessageId, messageId: providerMessageId, templateId: definition.templateId, notificationType: definition.type };
  } catch (error) {
    const failure = sanitizedNotificationFailure(error);
    const wrapped = new Error(failure.reason);
    wrapped.code = failure.code;
    throw wrapped;
  }
}

async function sendSolarEmail(env, message) {
  return sendNotification(env, {
    type: "admin_solar_activity",
    recipientEmail: cleanString(env.SOLAR_EMAIL_TO || DEFAULT_SOLAR_EMAIL_TO, 180),
    recipientName: "Casey",
    fromEmail: cleanString(env.SOLAR_EMAIL_FROM, 180),
    fromName: "Elevation UpScales Solar Builder",
    subject: message.subject,
    text: message.text,
    replyTo: message.replyTo,
  });
}

function ownerLeadNotificationConfig(env) {
  return {
    recipientEmail: cleanString(env.OWNER_LEAD_EMAIL_TO || env.MARKETPLACE_EMAIL_TO || DEFAULT_SOLAR_EMAIL_TO, 180),
    recipientName: "Casey",
    fromEmail: cleanString(env.OWNER_LEAD_EMAIL_FROM || env.MARKETPLACE_EMAIL_FROM || env.SOLAR_EMAIL_FROM, 180),
    fromName: "Elevation UpScales Lead Intake",
  };
}
function ownerNotificationMap(details) {
  const value = details?.ownerNotifications;
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
async function readOwnerNotificationState(env, recordFamily, reference, key) {
  try {
    const row = recordFamily === "work_with_us"
      ? await env.LEADS_DB.prepare("SELECT details_json FROM work_with_us_opportunities WHERE reference=? LIMIT 1").bind(reference).first()
      : await env.LEADS_DB.prepare("SELECT details_json FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
    let details = {}; try { details = JSON.parse(row?.details_json || "{}"); } catch (_) {}
    const current = ownerNotificationMap(details)[key];
    return current && typeof current === "object" && !Array.isArray(current) ? current : null;
  } catch (_) { return null; }
}
async function writeOwnerNotificationState(env, recordFamily, reference, key, state) {
  const row = recordFamily === "work_with_us"
    ? await env.LEADS_DB.prepare("SELECT details_json FROM work_with_us_opportunities WHERE reference=? LIMIT 1").bind(reference).first()
    : await env.LEADS_DB.prepare("SELECT details_json FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
  let details = {}; try { details = JSON.parse(row?.details_json || "{}"); } catch (_) {}
  if (!details || typeof details !== "object" || Array.isArray(details)) details = {};
  const notifications = ownerNotificationMap(details);
  details.ownerNotifications = { ...notifications, [key]: { ...(notifications[key] || {}), ...state } };
  if (recordFamily === "work_with_us") await env.LEADS_DB.prepare("UPDATE work_with_us_opportunities SET details_json=? WHERE reference=?").bind(JSON.stringify(details), reference).run();
  else await env.LEADS_DB.prepare("UPDATE project_opportunities SET details_json=? WHERE reference=?").bind(JSON.stringify(details), reference).run();
}
function ownerNotificationSummary(details) {
  const entries = Object.entries(ownerNotificationMap(details)).map(([key, value]) => ({ key, ...(value || {}) }));
  entries.sort((a,b)=>String(b.completedAt||b.attemptedAt||b.scheduledAt||"").localeCompare(String(a.completedAt||a.attemptedAt||a.scheduledAt||"")));
  const latest = entries[0];
  if (!latest) return {status:"not_recorded",key:"",provider:"",attemptedAt:"",completedAt:"",failureCode:"",failureReason:""};
  return {status:cleanString(latest.status,40)||"unknown",key:cleanString(latest.key,80),provider:cleanString(latest.provider,80),attemptedAt:cleanString(latest.attemptedAt||latest.scheduledAt,80),completedAt:cleanString(latest.completedAt,80),failureCode:cleanString(latest.failureCode,80),failureReason:cleanString(latest.failureReason,240)};
}
async function deliverOwnerLeadNotification(env, spec) {
  const attemptedAt = new Date().toISOString(), config = ownerLeadNotificationConfig(env);
  try {
    const sent = await sendNotification(env,{type:spec.notificationType,...config,subject:spec.subject,text:spec.text,replyTo:spec.replyTo});
    const state={status:"sent",attemptedAt,completedAt:new Date().toISOString(),provider:cleanString(sent.provider,80),messageId:cleanString(sent.messageId||sent.providerMessageId,240),notificationType:cleanString(sent.notificationType,100)};
    await writeOwnerNotificationState(env,spec.recordFamily,spec.reference,spec.key,state).catch(error=>console.error(JSON.stringify({event:"owner_lead_notification_state_error",reference:spec.reference,status:"sent",message:error instanceof Error?error.message:String(error)})));
    return state;
  } catch (error) {
    const failure=sanitizedNotificationFailure(error),transport=notificationTransportState(env);
    const state={status:failure.code==="provider_unavailable"?"unavailable":"failed",attemptedAt,completedAt:new Date().toISOString(),provider:transport.provider,failureCode:cleanString(error?.code||failure.code,80),failureReason:failure.reason,notificationType:spec.notificationType};
    await writeOwnerNotificationState(env,spec.recordFamily,spec.reference,spec.key,state).catch(stateError=>console.error(JSON.stringify({event:"owner_lead_notification_state_error",reference:spec.reference,status:state.status,message:stateError instanceof Error?stateError.message:String(stateError)})));
    console.error(JSON.stringify({event:"owner_lead_notification_error",reference:spec.reference,lane:spec.lane,status:state.status,code:state.failureCode,message:state.failureReason}));
    return state;
  }
}
async function scheduleOwnerLeadNotification(env, ctx, spec) {
  const existing = await readOwnerNotificationState(env,spec.recordFamily,spec.reference,spec.key);
  if (existing && ["scheduled","sent"].includes(cleanString(existing.status,40))) return {status:"deduped",key:spec.key};
  const scheduledAt=new Date().toISOString();
  await writeOwnerNotificationState(env,spec.recordFamily,spec.reference,spec.key,{status:"scheduled",scheduledAt,notificationType:spec.notificationType,lane:spec.lane}).catch(error=>console.error(JSON.stringify({event:"owner_lead_notification_schedule_state_error",reference:spec.reference,message:error instanceof Error?error.message:String(error)})));
  const task=deliverOwnerLeadNotification(env,spec);
  if(ctx&&typeof ctx.waitUntil==="function"){ctx.waitUntil(task);return{status:"scheduled",key:spec.key};}
  const result=await task;return{status:result.status,key:spec.key};
}
function projectOwnerNotificationSpec({reference,projectType,intakeIntent,contact,category,summary,city="",zip="",state="",serviceArea="",nextAction="",source=""}) {
  const handyman=intakeIntent==="Small Repair / Handyman",family=projectType==="rv"?"RV":projectType==="solar"?"Solar":"Home",lane=handyman?"Handyman":`${family} Project`;
  const location=[city,state,zip].filter(Boolean).join(" ").trim()||"Not fully captured";
  const text=[`A ${lane} Lead was stored successfully in Command Center.`,"",`Reference: ${reference}`,`Customer: ${cleanString(contact?.name,120)||"Not provided"}`,`Phone: ${cleanString(contact?.phone,80)||"Not provided"}`,`Email: ${cleanString(contact?.email,180)||"Not provided"}`,`Preferred contact: ${cleanString(contact?.preferredContact,80)||"Not specified"}`,`Project family: ${family}`,`Intake: ${cleanString(intakeIntent,160)||"Project"}`,`Category: ${cleanString(category,180)||"Not specified"}`,`Location: ${location}`,`Market: ${cleanString(serviceArea,80)||"manual_review"}`,`Next Action: ${cleanString(nextAction,120)||"Review Lead"}`,`Source: ${cleanString(source,120)||"start-a-project"}`,"",`Summary: ${cleanString(summary,2500)||"No summary provided."}`,"","Lead storage is authoritative. This alert is informational only."].join("\n");
  return{recordFamily:"project",reference,key:"lead_created",lane,notificationType:"admin_new_project_request",subject:`New ${lane} Lead — ${reference}`,text,replyTo:cleanString(contact?.email,180)};
}
function workWithUsOwnerNotificationSpec({reference,type,contact,location,message,source}) {
  const typeLabel=cleanString(type,40).replaceAll("_"," ")||"opportunity";
  const text=["A Work With Us Lead was stored successfully.","",`Reference: ${reference}`,`Type: ${typeLabel}`,`Name: ${cleanString(contact?.name,120)||"Not provided"}`,`Email: ${cleanString(contact?.email,180)||"Not provided"}`,`Phone: ${cleanString(contact?.phone,80)||"Not provided"}`,`Preferred contact: ${cleanString(contact?.preferredContact,80)||"Not specified"}`,`Location: ${cleanString(location,180)||"Not provided"}`,`Source: ${cleanString(source,120)||"work-with-us"}`,"",`Message: ${cleanString(message,2500)}`,"","Lead storage is authoritative. This alert is informational only."].join("\n");
  return{recordFamily:"work_with_us",reference,key:"lead_created",lane:"Work With Us",notificationType:"admin_new_work_with_us_request",subject:`New Work With Us Lead — ${typeLabel.toUpperCase()} — ${reference}`,text,replyTo:cleanString(contact?.email,180)};
}

async function recordSolarFunnelStage(env,{eventType,eventValue,sessionId,reference,page,build,stage},request){
  if(!validAnalyticsSessionId(sessionId))return{stored:false,reason:"invalid_session"};
  return recordSiteEvent(env,{eventType,eventValue,sessionId,reference,page,details:{package:cleanString(build?.package,120),classification:cleanString(build?.classification,120),source:"Solar Builder",buildReference:reference,builderStage:stage,build:OPERATIONS_BUILD}},{serverConfirmed:true,request});
}

async function handleSolarNotification(request, env, ctx) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > SOLAR_NOTIFY_MAX_BYTES) return jsonResponse({ error: "Payload too large" }, 413);
  let raw; try { const bodyText=await request.text(); if(bodyText.length>SOLAR_NOTIFY_MAX_BYTES)return jsonResponse({error:"Payload too large"},413); raw=JSON.parse(bodyText); } catch(_){ return jsonResponse({error:"Invalid JSON"},400); }
  if(cleanString(raw.website,120))return jsonResponse({ok:true,ignored:true});
  const allowedEvents=new Set(["builder_started","builder_progress","review_opened","lead_submitted"]),eventType=cleanString(raw.eventType,40);
  if(!allowedEvents.has(eventType))return jsonResponse({error:"Invalid event type"},400);
  const reference=cleanString(raw.reference,80),page=cleanString(raw.page,500),createdAt=cleanString(raw.createdAt,80)||new Date().toISOString(),build=sanitizeBuild(raw.build),incomingContact=sanitizeContact(raw.contact||{}),milestone=sanitizeSolarMilestone(raw.milestone),analyticsSessionId=cleanString(raw.sessionId,100),journeyId=cleanString(raw?.journeyId,120),projectContext=raw?.projectContext;
  if(!reference||!build.package||!build.panel||!build.battery)return jsonResponse({error:"Incomplete build payload"},400);
  const existingOpportunity=await solarProjectOpportunityRow(env,reference);
  if(eventType==="builder_started"&&!hasEarlySolarContact(incomingContact))return jsonResponse({error:"A valid phone number or email and contact permission are required"},400);
  if(eventType!=="builder_started"&&!existingOpportunity)return jsonResponse({error:"Solar Lead reference was not found. Restart the Builder save step before continuing.",reference,stored:false},409);
  if(existingOpportunity&&cleanString(existingOpportunity.intake_status,40)==="submitted"&&eventType!=="lead_submitted")return jsonResponse({error:"This Solar Lead has already been submitted. Start a new build to make another request.",reference,stored:true,completed:true},409);
  if(eventType==="lead_submitted"&&(!incomingContact.name||!isValidPhone(incomingContact.phone)||!isValidEmail(incomingContact.email)||!incomingContact.consent))return jsonResponse({error:"Complete contact information and consent are required"},400);
  const effectiveContact=(eventType!=="builder_started"&&eventType!=="lead_submitted"&&!hasEarlySolarContact(incomingContact))?solarContactFromOpportunity(existingOpportunity):incomingContact;
  const solarAllowance=await rateLimitSolarNotification(request,eventType,env);
  if(!solarAllowance.allowed){if(solarAllowance.retryAfter<=300){const existing=existingOpportunity||await solarProjectOpportunityRow(env,reference);return jsonResponse({ok:true,duplicate:true,reference,stored:Boolean(existing),emailDelivered:false,ownerNotification:{status:"deduped"}});}return jsonResponse({error:"Too many Solar Builder requests from this connection. Please try again later."},429,{"Retry-After":String(solarAllowance.retryAfter||60)});}
  const initialStore=await saveLead(env,{eventType,reference,build,contact:effectiveContact,page,createdAt,emailStatus:eventType==="builder_progress"?"not_requested":"scheduled"});
  if(!initialStore.stored)return jsonResponse({error:"Solar technical progress could not be stored.",reference,stored:false},503);
  const opportunityStore=await syncSolarProjectOpportunity(env,{eventType,reference,build,contact:effectiveContact,journeyId,projectContext,milestone,page});
  if(!opportunityStore.stored)return jsonResponse({error:opportunityStore.reason==="missing_reference"?"Solar Lead reference was not found.":"Solar Lead could not be stored in Leads Center.",reference,stored:false},opportunityStore.reason==="missing_reference"?409:503);
  if(validAnalyticsSessionId(analyticsSessionId)){
    const funnelDetails={sessionId:analyticsSessionId,reference,page,build,stage:opportunityStore.stage};
    if(eventType==="builder_started"){await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_contact_captured",eventValue:"contact_captured"},request).catch(()=>{});await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_lead_created",eventValue:"lead_created"},request).catch(()=>{});await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_build_started",eventValue:"build_started"},request).catch(()=>{});}
    else if(eventType==="review_opened")await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_review_opened",eventValue:"review_opened"},request).catch(()=>{});
    else if(eventType==="lead_submitted"){await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_completed_submitted",eventValue:"completed_submitted"},request).catch(()=>{});await recordSiteEvent(env,{eventType:"lead_submitted",eventValue:cleanString(raw?.build?.package,120).toLowerCase(),sessionId:analyticsSessionId,reference,page,details:{package:cleanString(raw?.build?.package,120),classification:build.classification,source:"Solar Builder",build:OPERATIONS_BUILD}},{serverConfirmed:true,request}).catch(error=>console.error(JSON.stringify({event:"solar_lead_intent_tracking_error",reference,message:error instanceof Error?error.message:String(error)})));}
  }
  if(eventType==="builder_progress")return jsonResponse({ok:true,reference,stored:true,emailDelivered:false,ownerNotification:{status:"not_requested"},stage:opportunityStore.stage});
  const spec=solarOwnerNotificationSpec({reference,eventType,contact:effectiveContact,build,stageLabel:solarBuilderStage(eventType).label}),ownerNotification=await scheduleOwnerLeadNotification(env,ctx,spec);
  return jsonResponse({ok:true,reference,stored:true,emailDelivered:ownerNotification.status==="sent",notificationQueued:["scheduled","sent","deduped"].includes(ownerNotification.status),ownerNotification,stage:opportunityStore.stage},eventType==="builder_started"?201:200);
}


function extractProducts(data) {
  if (Array.isArray(data)) return data;
  const candidates = [
    data?.products,
    data?.results,
    data?.items,
    data?.collection?.products,
    data?.data?.products,
    data?.data?.results,
  ];
  return candidates.find(Array.isArray) || [];
}

async function fetchCatalogPage(pageNumber) {
  const suffix = pageNumber === 1 ? "/collections/all.json" : `/collections/all/${pageNumber}.json`;
  const response = await fetch(`${SHOP_ORIGIN}${suffix}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Elevation-UpScales-Storefront/1.0",
    },
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    if (response.status === 404 && pageNumber > 1) return [];
    throw new Error(`Fourthwall catalog request failed with ${response.status}`);
  }

  const contentLength = Number(response.headers.get("content-length") || 0);
  if (contentLength > MAX_PAGE_BYTES) throw new Error("Fourthwall catalog page exceeded the size limit");
  if (!response.body) throw new Error("Fourthwall catalog returned an empty body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = value instanceof Uint8Array ? value : new Uint8Array(value);
      total += chunk.byteLength;
      if (total > MAX_PAGE_BYTES) {
        await reader.cancel("catalog response limit exceeded").catch(() => {});
        throw new Error("Fourthwall catalog page exceeded the size limit");
      }
      text += decoder.decode(chunk, { stream: true });
    }
    text += decoder.decode();
  } finally {
    try { reader.releaseLock(); } catch (_) {}
  }
  return extractProducts(JSON.parse(text));
}

async function getCatalog(request) {
  const cache = caches.default;
  const cacheUrl = new URL("/api/store-products", request.url);
  cacheUrl.searchParams.set("build", STORE_BUILD);
  const cacheKey = new Request(cacheUrl, { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const products = [];
  const seen = new Set();

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const pageProducts = await fetchCatalogPage(page);
    if (!pageProducts.length) break;

    let added = 0;
    for (const product of pageProducts) {
      const key = String(product?.id || product?.slug || product?.handle || product?.name || product?.title || "").trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      products.push(product);
      added += 1;
    }

    if (added === 0) break;
  }

  const response = Response.json(
    { products, count: products.length, source: "fourthwall", syncedAt: new Date().toISOString() },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
        ...API_SECURITY_HEADERS,
        "X-EUS-Store-Build": STORE_BUILD,
      },
    },
  );

  await cache.put(cacheKey, response.clone());
  return response;
}

const MARKETPLACE_SUBMIT_PATH = "/api/marketplace/submit";
const MARKETPLACE_PUBLIC_PATH = "/api/marketplace/listings";
const MARKETPLACE_IMAGE_PREFIX = "/api/marketplace/image/";
const MARKETPLACE_CONTACT_PREFIX = "/api/marketplace/contact/";
const MARKETPLACE_SHARE_PREFIX = "/marketplace/listing/";
const MARKETPLACE_EVENT_PATH = "/api/marketplace/event";
const SITE_EVENT_PATH = "/api/site-event";
const LEGACY_SITE_EVENT_PATH = "/api/site/event";
const MARKETPLACE_HEALTH_PATH = "/api/marketplace/health";
const HEALTH_PATH = "/api/health";
const ADMIN_LOGIN_PATH = "/api/admin/login";
const ADMIN_LOGOUT_PATH = "/api/admin/logout";
const ADMIN_SESSION_PATH = "/api/admin/session";
const ADMIN_LISTINGS_PATH = "/api/admin/listings";
const ADMIN_MARKETPLACE_ISSUES_PATH = "/api/admin/marketplace-issues";
const ADMIN_OPERATIONS_PATH = "/api/admin/operations";
const ADMIN_LEADS_PATH = "/api/admin/leads";
const ADMIN_MARKETPLACE_FOLLOWUPS_PATH = "/api/admin/marketplace-followups";
const ADMIN_QA_TOKEN_PATH = "/api/admin/qa-token";
const MARKETPLACE_QA_VALIDATE_PATH = "/api/marketplace/qa-validate";
const MARKETPLACE_REPORT_ISSUE_PATH = "/api/marketplace/report-issue";
const ADMIN_IMPORT_LEGACY_PATH = "/api/admin/import-legacy";
const PROJECT_CLASSIFY_PATH = "/api/project/classify";
const PROJECT_SUBMIT_PATH = "/api/project/submit";
const PROJECT_CAPTURE_PATH = "/api/project/capture-contact";
const PROJECT_CONTACT_REQUEST_PATH = "/api/project/contact-request";
const PROJECT_FOLLOWUP_REQUEST_PATH = "/api/project/follow-up-request";
const PROJECT_HANDYMAN_PHOTOS_PATH = "/api/project/handyman-photos";
const WORK_WITH_US_SUBMIT_PATH = "/api/work-with-us/submit";
const ADMIN_OPPORTUNITIES_PATH = "/api/admin/opportunities";
const ADMIN_MARKET_ANALYTICS_PATH = "/api/admin/market-analytics";
const ADMIN_SOLAR_QA_TOKEN_PATH = "/api/admin/solar-qa-token";
const SOLAR_QA_VALIDATE_PATH = "/api/solar/qa-validate";
const DEFAULT_ADMIN_EMAIL = "elevationupscales@gmail.com";
const DEFAULT_MARKETPLACE_EMAIL_TO = "casey@elevationupscales.com";
const MARKETPLACE_MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MARKETPLACE_MAX_TOTAL_BYTES = 46 * 1024 * 1024;
const MARKETPLACE_MAX_ADMIN_PHOTOS = 12;
const MARKETPLACE_ALLOWED_CATEGORIES = new Set(["rv", "motorcycle", "bicycle", "boat", "vehicle", "gear"]);
const MARKETPLACE_US_STATE_CODES = new Set(["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"]);
const MARKETPLACE_ADMIN_STATUSES = new Set(["pending_review", "published", "changes_requested", "rejected", "sold", "unpublished"]);
const ADMIN_LOGIN_MAX_ATTEMPTS = 8;
const ADMIN_LOGIN_MAX_BYTES = 4 * 1024;
const SECURITY_LIMIT_CLEANUP_GRACE_SECONDS = 24 * 60 * 60;
const ADMIN_LOGIN_WINDOW_SECONDS = 15 * 60;
const MARKETPLACE_CONTACT_THROTTLE_SECONDS = 5;
const MARKETPLACE_CONTACT_HOURLY_LIMIT = 10;
const MARKETPLACE_CONTACT_DAILY_LIMIT = 25;
const MARKETPLACE_SUBMIT_HOURLY_LIMIT = 4;
const MARKETPLACE_SUBMIT_DAILY_LIMIT = 12;
const ADMIN_SINGLE_PHOTO_MAX_TOTAL_BYTES = MARKETPLACE_MAX_IMAGE_BYTES + 1024 * 1024;
const MARKETPLACE_ANALYTICS_EVENT_TYPES = new Set([
  "marketplace_view", "category_select", "search_used", "favorite_add", "favorite_remove",
  "share_listing", "listing_open", "contact_reveal", "contact_call", "contact_text",
  "seller_funnel_start", "seller_form_view", "seller_submit_start", "seller_submission", "seller_submission_failed"
]);
const MARKETPLACE_ANALYTICS_HOURLY_LIMIT = 180;
const MARKETPLACE_ANALYTICS_MAX_BYTES = 8_000;
const SITE_INTENT_EVENT_TYPES = new Set([
  "session_start", "page_view", "marketplace_open",
  "contact_click", "start_project_open", "project_state_selected", "intake_intent_selected", "emergency_call_clicked", "project_type_selected", "service_area_classified", "intake_started", "contact_captured",
  "solar_builder_opened", "solar_builder_entry", "package_selected", "power_snapshot_viewed", "build_summary_viewed", "review_opened",
  "solar_contact_captured", "solar_lead_created", "solar_build_started", "solar_review_opened", "solar_completed_submitted",
  "submit_attempt", "lead_submitted", "out_of_area_path_selected", "outside_area_review_selected", "outside_area_to_work_with_us",
  "work_with_us_open", "opportunity_type_selected", "opportunity_form_started", "opportunity_submitted"
]);
const SITE_INTENT_SERVER_ONLY_EVENT_TYPES = new Set(["lead_submitted","opportunity_submitted","solar_contact_captured","solar_lead_created","solar_build_started","solar_review_opened","solar_completed_submitted"]);
const SITE_INTENT_CLIENT_EVENT_TYPES = new Set([...SITE_INTENT_EVENT_TYPES].filter((type) => !SITE_INTENT_SERVER_ONLY_EVENT_TYPES.has(type)));
const SITE_ANALYTICS_APPROVED_EVENTS = new Set([
  "session_start", "page_view", "start_project_open", "project_family_selected", "project_submit",
  "solar_builder_open", "work_with_us_open", "marketplace_open", "listing_interest"
]);
const SITE_ANALYTICS_EVENT_ALIASES = Object.freeze({
  project_type_selected: "project_family_selected",
  lead_submitted: "project_submit",
  solar_builder_entry: "solar_builder_open",
});
const SITE_INTENT_MAX_BYTES = 8_000;
const FOLLOWUP_STATUSES = new Set(["needs_follow_up", "email_prepared", "opened_gmail", "marked_sent", "complete"]);
const FOLLOWUP_DEFAULT_SUBJECT = "Quick follow-up on your {{listing_type}} Marketplace submission";
const FOLLOWUP_DEFAULT_BODY = `Hi {{first_name}},

Thanks for submitting your {{listing_type}} listing to Elevation UpScales Marketplace. I wanted to follow up on {{listing_title}} ({{listing_reference}}) and make sure the posting information is still current.

If anything has changed — price, availability, photos, description, or other details — reply to this email and let me know.

Thanks,
Casey
Elevation UpScales
208-813-4998`;

function sameOriginRequest(request) {
  const origin = request.headers.get("Origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) return false;
    } catch (_) {
      return false;
    }
  }
  const fetchSite = request.headers.get("Sec-Fetch-Site");
  return !fetchSite || ["same-origin", "same-site", "none"].includes(fetchSite);
}

function marketplaceCookie(request, name) {
  const raw = request.headers.get("Cookie") || "";
  for (const part of raw.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return "";
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function stringToBase64Url(value) {
  return bytesToBase64Url(new TextEncoder().encode(value));
}

function base64UrlToString(value) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(normalized);
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

async function hmacSignature(secret, payload) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bytesToBase64Url(new Uint8Array(signature));
}

function timingSafeEqualStrings(a, b) {
  const encoder = new TextEncoder();
  const left = encoder.encode(String(a ?? ""));
  const right = encoder.encode(String(b ?? ""));
  const lengthsMatch = left.byteLength === right.byteLength;
  return lengthsMatch
    ? crypto.subtle.timingSafeEqual(left, right)
    : !crypto.subtle.timingSafeEqual(left, left);
}

async function createAdminSession(env, email) {
  const secret = cleanString(env.ADMIN_SESSION_SECRET, 500);
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  const payload = stringToBase64Url(JSON.stringify({ email, exp: Date.now() + 8 * 60 * 60 * 1000 }));
  const signature = await hmacSignature(secret, payload);
  return `${payload}.${signature}`;
}

async function readAdminSession(request, env) {
  const adminEmail = cleanString(env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL, 180).toLowerCase();
  // 3.0.3: Do not trust identity headers by themselves. The signed HttpOnly
  // admin cookie remains the only Worker-level authentication mechanism.
  const token = marketplaceCookie(request, "eus_admin_session");
  const secret = cleanString(env.ADMIN_SESSION_SECRET, 500);
  if (!token || !secret) return null;
  const segments = token.split(".");
  if (segments.length !== 2) return null;
  const [payload, signature] = segments;
  const expected = await hmacSignature(secret, payload);
  if (!timingSafeEqualStrings(signature, expected)) return null;
  try {
    const data = JSON.parse(base64UrlToString(payload));
    if (!data?.email || Number(data.exp) < Date.now() || String(data.email).toLowerCase() !== adminEmail) return null;
    return { email: String(data.email).toLowerCase(), method: "password" };
  } catch (_) {
    return null;
  }
}

async function requireAdmin(request, env) {
  const session = await readAdminSession(request, env);
  if (!session) return { response: jsonResponse({ error: "Admin login required" }, 401) };
  return { session };
}

async function securityClientKey(request, env, scope) {
  const ip = cleanString(request.headers.get("CF-Connecting-IP"), 120);
  const userAgent = cleanString(request.headers.get("User-Agent"), 180);
  const identity = ip || `unknown:${userAgent || "client"}`;
  const material = `${scope}:${identity}`;
  const secret = cleanString(env.SECURITY_HASH_SECRET || env.ADMIN_SESSION_SECRET, 500);
  if (secret) {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(material));
    return bytesToBase64Url(new Uint8Array(digest)).slice(0, 43);
  }
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material));
  return bytesToBase64Url(new Uint8Array(digest)).slice(0, 43);
}

async function cleanupExpiredSecurityLimits(db) {
  if (!db || typeof db.prepare !== "function") return;
  const cutoff = Math.floor(Date.now() / 1000) - SECURITY_LIMIT_CLEANUP_GRACE_SECONDS;
  await db.prepare("DELETE FROM eus_security_limits WHERE reset_at < ?").bind(cutoff).run();
}

async function durableRateLimit(db, request, env, scope, maxHits, windowSeconds) {
  if (!db || typeof db.prepare !== "function") return { allowed: true, remaining: maxHits, degraded: true };
  const clientKey = await securityClientKey(request, env, scope);
  const limitKey = `${scope}:${clientKey}`;
  const now = Math.floor(Date.now() / 1000);
  const resetAt = now + windowSeconds;
  try {
    await db.prepare(`INSERT INTO eus_security_limits (limit_key, hit_count, reset_at, updated_at)
      VALUES (?, 1, ?, ?)
      ON CONFLICT(limit_key) DO UPDATE SET
        hit_count=CASE WHEN eus_security_limits.reset_at <= ? THEN 1 ELSE eus_security_limits.hit_count + 1 END,
        reset_at=CASE WHEN eus_security_limits.reset_at <= ? THEN excluded.reset_at ELSE eus_security_limits.reset_at END,
        updated_at=excluded.updated_at`)
      .bind(limitKey, resetAt, new Date().toISOString(), now, now).run();
    const row = await db.prepare("SELECT hit_count, reset_at FROM eus_security_limits WHERE limit_key=?").bind(limitKey).first();
    const count = Number(row?.hit_count) || 0;
    const currentReset = Number(row?.reset_at) || resetAt;
    return { allowed: count <= maxHits, remaining: Math.max(0, maxHits - count), retryAfter: Math.max(1, currentReset - now) };
  } catch (error) {
    console.error(JSON.stringify({ event: "durable_rate_limit_degraded", scope, message: error instanceof Error ? error.message : String(error) }));
    return { allowed: true, remaining: maxHits, degraded: true };
  }
}

async function marketplaceRateLimit(request, env) {
  const clientKey = await securityClientKey(request, env, "marketplace-submit-burst");
  const cache = caches.default;
  const key = new Request(`https://rate-limit.invalid/marketplace/${clientKey}`);
  if (await cache.match(key)) return { allowed: false, retryAfter: 20 };
  await cache.put(key, new Response("1", { headers: { "Cache-Control": "max-age=20" } }));
  const hourly = await durableRateLimit(env.MARKETPLACE_DB, request, env, "marketplace-submit-hour", MARKETPLACE_SUBMIT_HOURLY_LIMIT, 60 * 60);
  if (!hourly.allowed) return hourly;
  return durableRateLimit(env.MARKETPLACE_DB, request, env, "marketplace-submit-day", MARKETPLACE_SUBMIT_DAILY_LIMIT, 24 * 60 * 60);
}

async function clearDurableRateLimit(db, request, env, scope) {
  if (!db || typeof db.prepare !== "function") return;
  const clientKey = await securityClientKey(request, env, scope);
  await db.prepare("DELETE FROM eus_security_limits WHERE limit_key=?").bind(`${scope}:${clientKey}`).run().catch(() => {});
}

async function adminLoginAttempt(request, env) {
  // Fast edge-cache limiter plus a D1-backed limiter so attempts cannot simply
  // rotate across Cloudflare data centers to reset the counter.
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`admin-login:${ip}`));
  const hash = bytesToBase64Url(new Uint8Array(digest)).slice(0, 32);
  const cache = caches.default;
  const key = new Request(`https://rate-limit.invalid/admin-login/${hash}`);
  let count = 0;
  const existing = await cache.match(key);
  if (existing) {
    const data = await existing.json().catch(() => ({}));
    count = Number.parseInt(data.count, 10) || 0;
  }
  if (count >= ADMIN_LOGIN_MAX_ATTEMPTS) return { allowed: false, cache, key, retryAfter: ADMIN_LOGIN_WINDOW_SECONDS };

  const durable = await durableRateLimit(env.MARKETPLACE_DB, request, env, "admin-login-global", ADMIN_LOGIN_MAX_ATTEMPTS, ADMIN_LOGIN_WINDOW_SECONDS);
  if (!durable.allowed) return { allowed: false, cache, key, retryAfter: durable.retryAfter || ADMIN_LOGIN_WINDOW_SECONDS };

  await cache.put(key, new Response(JSON.stringify({ count: count + 1 }), {
    headers: { "Content-Type": "application/json", "Cache-Control": `max-age=${ADMIN_LOGIN_WINDOW_SECONDS}` },
  }));
  return { allowed: true, cache, key, durableScope: "admin-login-global" };
}

async function validMarketplaceImageSignature(file) {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (file.type === "image/jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (file.type === "image/png") return bytes.length >= 8 && [0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a].every((value, index) => bytes[index] === value);
  if (file.type === "image/webp") return bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return false;
}

async function prepareMarketplaceImage(file, env) {
  if (env.IMAGES && typeof env.IMAGES.input === "function") {
    try {
      const response = (await env.IMAGES.input(file.stream())
        .transform({ fit: "scale-down", width: 2400, height: 2400, metadata: "none" })
        .output({ format: "image/webp", quality: 85, anim: false })).response();
      if (!response.ok || !response.body) throw new Error(`Cloudflare Images returned ${response.status}`);
      return { body: response.body, contentType: "image/webp", extension: "webp", normalized: true };
    } catch (error) {
      console.error(JSON.stringify({ event: "marketplace_image_normalization_error", message: error instanceof Error ? error.message : String(error) }));
      throw new Error("The listing photo could not be safely processed. Please try another image.");
    }
  }
  return { body: file.stream(), contentType: file.type, extension: marketplaceImageExtension(file.type), normalized: false };
}

async function marketplaceSchemaStatus(db) {
  if (!db || typeof db.prepare !== "function") return { ready: false, needed: true, reason: "database_unavailable" };
  const existing = await db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='marketplace_listings'").first();
  const sql = String(existing?.sql || "");
  if (!sql) return { ready: false, needed: true, reason: "marketplace_table_missing" };
  const legacyCategoryConstraint = /CHECK\s*\(\s*category\s+IN/i.test(sql) && !/['"]gear['"]/i.test(sql);
  return { ready: !legacyCategoryConstraint, needed: legacyCategoryConstraint, reason: legacyCategoryConstraint ? "legacy_category_constraint" : "" };
}

function normalizeMarketplaceCategory(value) {
  const normalized = cleanString(value, 40).toLowerCase();
  return MARKETPLACE_ALLOWED_CATEGORIES.has(normalized) ? normalized : "";
}

function marketplaceField(form, name, max = 500) {
  return cleanString(form.get(name), max);
}

async function parseLimitedMultipartFormData(request, maxBytes, label = "Upload") {
  const contentType = String(request.headers.get("Content-Type") || "");
  const normalizedType = contentType.toLowerCase();
  if (!normalizedType.startsWith("multipart/form-data;") || !normalizedType.includes("boundary=")) {
    return { response: jsonResponse({ error: `${label} must use multipart form data` }, 415) };
  }

  const rawLength = request.headers.get("Content-Length");
  if (rawLength) {
    const contentLength = Number(rawLength);
    if (!Number.isFinite(contentLength) || contentLength < 0) return { response: jsonResponse({ error: "Invalid request size" }, 400) };
    if (contentLength > maxBytes) return { response: jsonResponse({ error: `${label} is too large` }, 413) };
    try {
      return { form: await request.formData() };
    } catch (_) {
      return { response: jsonResponse({ error: `Invalid ${label.toLowerCase()}` }, 400) };
    }
  }

  // Some HTTP/2 and mobile clients can omit Content-Length. Bound those streams
  // before multipart parsing so an attacker cannot force unbounded buffering.
  const fallbackMaxBytes = maxBytes;
  if (!request.body) return { response: jsonResponse({ error: `Invalid ${label.toLowerCase()}` }, 400) };
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = value instanceof Uint8Array ? value : new Uint8Array(value);
      total += chunk.byteLength;
      if (total > fallbackMaxBytes) {
        await reader.cancel("request body limit exceeded").catch(() => {});
        return { response: jsonResponse({ error: `${label} is too large for a request without a declared size. Please retry from the website.` }, 413) };
      }
      chunks.push(chunk);
    }
  } catch (_) {
    return { response: jsonResponse({ error: `Invalid ${label.toLowerCase()}` }, 400) };
  } finally {
    try { reader.releaseLock(); } catch (_) {}
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    const replay = new Request(request.url, { method: request.method, headers: { "Content-Type": contentType }, body: bytes });
    return { form: await replay.formData() };
  } catch (_) {
    return { response: jsonResponse({ error: `Invalid ${label.toLowerCase()}` }, 400) };
  }
}

function marketplacePhotoSlots(category) {
  return {
    rv: ["photoFront", "photoRear", "photoInterior1", "photoInterior2"],
    motorcycle: ["photo1", "photo2", "photo3", "photo4"],
    bicycle: ["photo1", "photo2", "photo3", "photo4"],
    boat: ["photo1", "photo2", "photo3", "photo4"],
    vehicle: ["photo1", "photo2", "photo3", "photo4"],
    gear: ["photo1", "photo2", "photo3", "photo4"],
  }[category] || [];
}

function marketplaceMinimumPhotos(category) {
  return category === "bicycle" || category === "gear" ? 2 : 4;
}

function marketplaceCategoryFields(category, form) {
  if (category === "rv") return { sleeps: marketplaceField(form, "sleeps", 40), rvType: marketplaceField(form, "rvType", 100) };
  if (category === "motorcycle") return { engineSize: marketplaceField(form, "engineSize", 120), vehicleType: marketplaceField(form, "vehicleType", 100) };
  if (category === "bicycle") return {
    frameSize: marketplaceField(form, "frameSize", 120),
    wheelSize: marketplaceField(form, "wheelSize", 120),
    electricAssist: marketplaceField(form, "electricAssist", 120),
    batteryDetails: marketplaceField(form, "batteryDetails", 500),
    vehicleType: marketplaceField(form, "vehicleType", 100),
  };
  if (category === "boat") return {
    length: marketplaceField(form, "length", 80),
    engine: marketplaceField(form, "engine", 160),
    engineHours: marketplaceField(form, "engineHours", 80),
    trailer: marketplaceField(form, "trailer", 80),
    vehicleType: marketplaceField(form, "vehicleType", 100),
  };
  if (category === "vehicle") return {
    drivetrain: marketplaceField(form, "drivetrain", 100),
    transmission: marketplaceField(form, "transmission", 100),
    fuelType: marketplaceField(form, "fuelType", 100),
    vehicleType: marketplaceField(form, "vehicleType", 100),
  };
  if (category === "gear") return {
    gearType: marketplaceField(form, "gearType", 100),
    conditionRating: marketplaceField(form, "conditionRating", 100),
  };
  return {};
}

function marketplaceItemType(category, form) {
  if (category === "rv") return marketplaceField(form, "rvType", 100);
  if (category === "gear") return marketplaceField(form, "gearType", 100);
  return marketplaceField(form, "vehicleType", 100);
}

function marketplaceListingTitleParts(category, year, make, model) {
  return category === "gear"
    ? [make, model].filter((value) => value !== null && value !== undefined && String(value).trim())
    : [year, make, model].filter((value) => value !== null && value !== undefined && String(value).trim());
}

function marketplaceListingTitle(category, year, make, model) {
  return marketplaceListingTitleParts(category, year, make, model).join(" ").trim() || "Marketplace Listing";
}

function marketplaceReference() {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `EUS-MKT-${stamp}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

function marketplaceImageExtension(type) {
  return { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[type] || "jpg";
}

async function sendMarketplaceEmail(env, { subject, text, replyTo = "", notificationType = "admin_new_marketplace_submission" }) {
  return sendNotification(env, {
    type: notificationType,
    recipientEmail: cleanString(env.MARKETPLACE_EMAIL_TO || DEFAULT_MARKETPLACE_EMAIL_TO, 180),
    recipientName: "Elevation UpScales Admin",
    fromEmail: cleanString(env.MARKETPLACE_EMAIL_FROM || env.SOLAR_EMAIL_FROM, 180),
    fromName: "Elevation UpScales Marketplace",
    subject,
    text,
    replyTo,
  });
}

function marketplaceSubmissionText(record) {
  return [
    "ELEVATION UPSCALES — NEW MARKETPLACE POST",
    `Reference: ${record.reference}`,
    `Category: ${record.category}`,
    `Submitted: ${record.createdAt}`,
    "",
    `Seller: ${record.sellerName}`,
    `Email: ${record.sellerEmail}`,
    `Phone: ${record.sellerPhone}`,
    `Location: ${record.location}`,
    "",
    `Listing: ${marketplaceListingTitle(record.category, record.year, record.make, record.model)}`,
    `Price: ${record.price}`,
    `Type: ${record.itemType || "Not provided"}`,
    `Title: ${record.titleStatus || "Not provided"}`,
    `Mileage: ${record.mileage || "Not provided"}`,
    `Highlights: ${record.highlights}`,
    `Condition/disclosure: ${record.conditionDisclosure}`,
    "",
    "Status: Pending admin review.",
    "Open /admin-listings to review, edit, approve, or reject this post.",
  ].join("\n");
}


function marketplaceSubmissionIssueReference() {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `EUS-ISSUE-${stamp}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

async function recordMarketplaceSubmissionIssue(env, issue = {}) {
  const createdAt = new Date().toISOString();
  const issueId = crypto.randomUUID();
  const safe = {
    issueId,
    reference: cleanString(issue.reference, 80) || marketplaceSubmissionIssueReference(),
    category: normalizeMarketplaceCategory(issue.category) || "unknown",
    stage: cleanString(issue.stage, 60) || "unknown",
    code: cleanString(issue.code, 100) || "submission_failed",
    httpStatus: Number.isInteger(issue.httpStatus) ? issue.httpStatus : 500,
    backendStatus: cleanString(issue.backendStatus, 40) || "failed",
    uploadStatus: cleanString(issue.uploadStatus, 40) || "unknown",
    r2Status: cleanString(issue.r2Status, 40) || "unknown",
    d1Status: cleanString(issue.d1Status, 40) || "unknown",
    page: cleanString(issue.page, 180),
    note: cleanString(issue.note, 800),
    contact: cleanString(issue.contact, 180),
    userAgent: cleanString(issue.userAgent, 280),
    clientRequestId: cleanString(issue.clientRequestId, 100),
    photoCount: Number.isInteger(issue.photoCount) ? issue.photoCount : Number.parseInt(issue.photoCount, 10) || 0,
    retryCount: Number.isInteger(issue.retryCount) ? issue.retryCount : Number.parseInt(issue.retryCount, 10) || 0,
    build: cleanString(issue.build, 100) || OPERATIONS_BUILD,
    createdAt,
  };
  let stored = false;
  if (env.MARKETPLACE_DB && typeof env.MARKETPLACE_DB.prepare === "function") {
    try {
      await env.MARKETPLACE_DB.prepare(`INSERT INTO marketplace_admin_log
        (listing_id, action, admin_email, details, created_at) VALUES (?, 'submission_failure', 'system', ?, ?)`)
        .bind(`submission-issue:${issueId}`, JSON.stringify(safe), createdAt).run();
      stored = true;
    } catch (error) {
      console.error(JSON.stringify({ event: "marketplace_submission_issue_log_error", stage: safe.stage, code: safe.code, message: error instanceof Error ? error.message : String(error) }));
    }
  }
  let emailDelivered = false;
  try {
    await sendMarketplaceEmail(env, {
      notificationType: "admin_marketplace_submission_issue",
      subject: safe.code.startsWith("user_report:") ? `Marketplace Issue Report — ${safe.reference}` : `URGENT: Marketplace Submission FAILED — ${safe.reference}`,
      text: [
        safe.code.startsWith("user_report:") ? "Elevation UpScales Marketplace user issue report" : "Elevation UpScales Marketplace submission failure",
        "", `Issue / request: ${safe.reference}`, `Category: ${safe.category}`, `Stage: ${safe.stage}`,
        `Code: ${safe.code}`, `HTTP status: ${safe.httpStatus}`, `Backend: ${safe.backendStatus}`,
        `Upload: ${safe.uploadStatus}`, `R2: ${safe.r2Status}`, `D1: ${safe.d1Status}`,
        `Page: ${safe.page || "Not provided"}`, `Time: ${safe.createdAt}`,
        ...(safe.note ? ["", `Seller report: ${safe.note}`] : []),
        ...(safe.contact ? [`Optional contact: ${safe.contact}`] : []),
        ...(safe.userAgent ? [`Browser/device: ${safe.userAgent}`] : []),
        ...(safe.clientRequestId ? [`Client request: ${safe.clientRequestId}`] : []),
        `Photo count: ${safe.photoCount}`,
        `Retry count: ${safe.retryCount}`,
        `Build: ${safe.build}`,
      ].join("\n"),
    });
    emailDelivered = true;
  } catch (error) {
    console.error(JSON.stringify({ event: "marketplace_submission_issue_email_error", stage: safe.stage, code: safe.code, message: error instanceof Error ? error.message : String(error) }));
  }
  return { ...safe, stored, emailDelivered };
}

function marketplaceSubmissionIssueRecord(row) {
  let details = {};
  try { details = JSON.parse(row?.details || "{}"); } catch (_) {}
  return {
    id: String(row?.id ?? ""),
    issueId: cleanString(details.issueId, 100),
    reference: cleanString(details.reference, 80),
    category: normalizeMarketplaceCategory(details.category) || "unknown",
    stage: cleanString(details.stage, 80) || "unknown",
    code: cleanString(details.code, 100) || "submission_failed",
    httpStatus: Number.isInteger(details.httpStatus) ? details.httpStatus : Number.parseInt(details.httpStatus, 10) || 0,
    backendStatus: cleanString(details.backendStatus, 40) || "unknown",
    uploadStatus: cleanString(details.uploadStatus, 40) || "unknown",
    r2Status: cleanString(details.r2Status, 40) || "unknown",
    d1Status: cleanString(details.d1Status, 40) || "unknown",
    page: cleanString(details.page, 180),
    note: cleanString(details.note, 800),
    contact: cleanString(details.contact, 180),
    userAgent: cleanString(details.userAgent, 280),
    clientRequestId: cleanString(details.clientRequestId, 100),
    photoCount: Number.parseInt(details.photoCount, 10) || 0,
    retryCount: Number.parseInt(details.retryCount, 10) || 0,
    build: cleanString(details.build, 100),
    createdAt: cleanString(row?.created_at || details.createdAt, 80),
  };
}

async function handleMarketplaceIssueReport(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const parsed = await readLimitedJson(request, 16 * 1024);
  if (parsed.error) return jsonResponse({ error: parsed.error === "too_large" ? "Issue report is too large" : "Invalid issue report" }, parsed.error === "too_large" ? 413 : 400);
  const body = parsed.value && typeof parsed.value === "object" ? parsed.value : {};
  const issueType = cleanString(body.type, 60) || "other";
  const page = cleanString(body.page, 180) || "unknown";
  const stage = cleanString(body.stage, 60) || "user_report";
  const note = cleanString(body.note, 800);
  const contact = cleanString(body.contact, 180);
  const userAgent = cleanString(body.userAgent || request.headers.get("User-Agent"), 280);
  const requestedRef = cleanString(body.requestRef, 80);
  const clientRequestId = cleanString(body.clientRequestId, 100);
  const build = cleanString(body.build || request.headers.get("X-EUS-Build"), 100) || OPERATIONS_BUILD;
  const retryCount = Number.parseInt(body.retryCount, 10) || 0;
  if (!note) return jsonResponse({ error: "Please describe what went wrong" }, 400);
  const issue = await recordMarketplaceSubmissionIssue(env, {
    reference: requestedRef || undefined, category: cleanString(body.category, 60) || "unknown",
    stage: `user_report:${stage}`, code: `user_report:${issueType}`, httpStatus: 0,
    backendStatus: "reported", uploadStatus: "unknown", r2Status: "unknown",
    d1Status: env.MARKETPLACE_DB ? "available" : "unconfigured", page, note, contact, userAgent, clientRequestId, retryCount, build,
  });
  if (!issue.stored && !issue.emailDelivered) return jsonResponse({ error: "Issue reporting is temporarily unavailable. Please contact Elevation UpScales directly." }, 503);
  return jsonResponse({ ok: true, reference: issue.reference, stored: issue.stored, emailDelivered: issue.emailDelivered }, 202);
}

async function createMarketplaceQaToken(env) {
  const secret = cleanString(env.ADMIN_SESSION_SECRET, 500);
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  const expiresAt = Date.now() + 30 * 60 * 1000;
  const payload = stringToBase64Url(JSON.stringify({ purpose: "marketplace-qa", exp: expiresAt, nonce: crypto.randomUUID() }));
  const signature = await hmacSignature(secret, payload);
  return { token: `${payload}.${signature}`, expiresAt: new Date(expiresAt).toISOString() };
}

async function verifyMarketplaceQaToken(token, env) {
  const value = cleanString(token, 1600);
  const secret = cleanString(env.ADMIN_SESSION_SECRET, 500);
  if (!value || !secret) return false;
  const [payload, signature, extra] = value.split(".");
  if (!payload || !signature || extra) return false;
  const expected = await hmacSignature(secret, payload);
  if (!timingSafeEqualStrings(signature, expected)) return false;
  try {
    const parsed = JSON.parse(base64UrlToString(payload));
    return parsed?.purpose === "marketplace-qa" && Number(parsed.exp) > Date.now();
  } catch (_) { return false; }
}

async function handleAdminQaToken(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  return jsonResponse({ ok: true, ...(await createMarketplaceQaToken(env)) });
}

async function handleMarketplaceQaValidate(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  let body;
  try { body = await request.json(); } catch (_) { return jsonResponse({ valid: false, error: "Invalid QA validation request" }, 400); }
  const token = cleanString(body?.qaToken, 1600);
  const category = normalizeMarketplaceCategory(body?.category);
  const valid = Boolean(category && await verifyMarketplaceQaToken(token, env));
  if (!valid) return jsonResponse({ valid: false, error: "This Admin QA link is invalid or expired. Open a new TEST form from Marketplace Operations." }, 403);
  return jsonResponse({
    valid: true,
    category,
    testEmail: cleanString(env.MARKETPLACE_EMAIL_TO || DEFAULT_MARKETPLACE_EMAIL_TO, 180),
    testPhone: "208-813-4998",
    build: OPERATIONS_BUILD,
  });
}

function marketplaceQaTestFromRow(row) {
  try { return JSON.parse(row?.category_fields_json || "{}")?.qaTest === true; }
  catch (_) { return false; }
}


async function solarLeadOperationsSchemaStatus(db) {
  const required = ["lead_classification", "intent_level", "submitted_at", "lead_stage", "priority", "assigned_to", "next_action_type", "next_action_due_at", "last_contact_at", "last_contact_method", "call_status", "customer_response_status", "follow_up_required", "operations_notes", "lost_reason", "won_value", "customer_email_status", "customer_email_last_at", "customer_email_message_id"];
  if (!db || typeof db.prepare !== "function") return { ready: false, leadsTableReady: false, columnsReady: false, activityReady: false, missing: ["LEADS_DB"] };
  let info;
  try { info = await db.prepare("PRAGMA table_info(solar_leads)").all(); }
  catch (_) { return { ready: false, leadsTableReady: false, columnsReady: false, activityReady: false, missing: required.slice() }; }
  const rows = info.results || [];
  const leadsTableReady = rows.length > 0;
  const names = new Set(rows.map((row) => String(row.name || "")));
  const missing = required.filter((name) => !names.has(name));
  const columnsReady = leadsTableReady && missing.length === 0;
  let activityReady = true;
  try { await db.prepare("SELECT 1 FROM solar_lead_activity LIMIT 1").first(); }
  catch (_) { activityReady = false; }
  return { ready: leadsTableReady && columnsReady && activityReady, leadsTableReady, columnsReady, activityReady, missing };
}

function leadActionDueState(lead, nowMs = Date.now()) {
  if (!lead?.nextActionDueAt || ["won", "lost", "closed"].includes(lead.leadStage)) return "none";
  const due = new Date(lead.nextActionDueAt).getTime();
  if (!Number.isFinite(due)) return "none";
  if (due < nowMs) return "overdue";
  if (due < nowMs + 24 * 60 * 60 * 1000) return "due_24h";
  return "upcoming";
}

function leadSummaryAndPipeline(leads) {
  const now = Date.now();
  const summary = { newSubmitted: 0, potential: 0, followUpsDue: 0, overdue: 0, qualified: 0, estimateInspection: 0, won: 0, callsDue: 0, actionable: 0 };
  const pipeline = { new: 0, contacting: 0, estimate_inspection_scheduled: 0, field_review_complete: 0, estimate_in_progress: 0, estimate_sent: 0, follow_up: 0, won: 0, lost: 0, closed: 0 };
  for (const lead of leads) {
    if (lead.actionable) summary.actionable += 1;
    if (lead.classification === "submitted" && lead.leadStage === "new") summary.newSubmitted += 1;
    if (lead.classification === "potential" && lead.actionable) summary.potential += 1;
    if (lead.leadStage === "field_review_complete") summary.qualified += 1;
    if (lead.leadStage === "estimate_inspection_scheduled") summary.estimateInspection += 1;
    if (lead.leadStage === "won") summary.won += 1;
    if (pipeline[lead.leadStage] != null) pipeline[lead.leadStage] += 1;
    const dueState = leadActionDueState(lead, now);
    if (lead.followUpRequired && ["overdue", "due_24h"].includes(dueState)) summary.followUpsDue += 1;
    if (dueState === "overdue") summary.overdue += 1;
    if (lead.followUpRequired && /call/i.test(lead.nextActionType || "") && ["overdue", "due_24h"].includes(dueState)) summary.callsDue += 1;
  }
  return { summary, pipeline };
}

function solarTrendDays(days = 14) {
  const out = [];
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(now.getTime() - i * 86400000);
    out.push({ date: d.toISOString().slice(0, 10), newLeads: 0, contacted: 0, qualified: 0, won: 0 });
  }
  return out;
}

async function solarLeadTrend(db, days = 14) {
  const trend = solarTrendDays(days);
  const byDate = new Map(trend.map((row) => [row.date, row]));
  const cutoff = `${trend[0].date}T00:00:00.000Z`;
  const submitted = await db.prepare(`SELECT substr(submitted_at,1,10) AS day, COUNT(*) AS count
    FROM solar_leads WHERE lead_classification='submitted' AND submitted_at>=? GROUP BY substr(submitted_at,1,10)`).bind(cutoff).all();
  for (const row of submitted.results || []) if (byDate.has(row.day)) byDate.get(row.day).newLeads = Number(row.count) || 0;
  const activity = await db.prepare(`SELECT substr(created_at,1,10) AS day, action, details_json FROM solar_lead_activity
    WHERE created_at>=? AND (action IN ('stage_contact','stage_qualified','stage_contacting','stage_field_review_complete','stage_won') OR action='lead_saved')`).bind(cutoff).all();
  for (const row of activity.results || []) {
    const target = byDate.get(row.day); if (!target) continue;
    let actionName = row.action;
    if (actionName === 'lead_saved') {
      const details = parseJsonObject(row.details_json);
      if (details.previousStage === details.stage) continue;
      actionName = `stage_${cleanString(details.stage, 40)}`;
    }
    if (actionName === 'stage_contact' || actionName === 'stage_contacting') target.contacted += 1;
    if (actionName === 'stage_qualified' || actionName === 'stage_field_review_complete') target.qualified += 1;
    if (actionName === 'stage_won') target.won += 1;
  }
  return trend;
}

function validLeadDue(value) {
  const text = cleanString(value, 80);
  if (!text) return "";
  const time = new Date(text).getTime();
  return Number.isFinite(time) ? new Date(time).toISOString() : "";
}

function isClosedSolarLeadStage(stage) {
  return stage === "won" || stage === "lost";
}

async function getSolarLeadRow(db, reference) {
  return db.prepare(`SELECT s.*,
    p.opportunity_status AS project_opportunity_status,
    p.next_action AS project_next_action,
    p.service_area AS project_service_area,
    p.city AS project_city,
    p.state AS project_state,
    p.zip AS project_zip,
    p.details_json AS project_details_json
    FROM solar_leads s
    JOIN project_opportunities p ON p.reference=s.reference AND lower(p.project_family)='solar'
    WHERE s.reference=? LIMIT 1`).bind(reference).first();
}

async function updateSolarPrimaryOperations(env, reference, updates = {}, adminEmail = "") {
  const row = await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? AND lower(project_family)='solar' LIMIT 1").bind(reference).first();
  if (!row) return { ok: false, error: "Primary Solar Lead not found" };
  let details = parseJsonObject(row.details_json);
  const hasPriority = Object.prototype.hasOwnProperty.call(updates, "priority");
  const hasNotes = Object.prototype.hasOwnProperty.call(updates, "notes");
  if (hasPriority || hasNotes) {
    const prior = projectControlRecord(details);
    details.controlCenterRecord = {
      ...prior,
      priority: hasPriority ? cleanString(updates.priority, 30).toLowerCase() : prior.priority,
      internalNotes: hasNotes ? cleanString(updates.notes, 5000) : prior.internalNotes,
      updatedAt: new Date().toISOString(),
      updatedBy: cleanString(adminEmail, 180),
    };
  }
  const currentStatus = projectPipelineStatus(row.opportunity_status);
  const currentNextAction = projectPipelineNextAction(row.next_action, row.service_area);
  const status = Object.prototype.hasOwnProperty.call(updates, "status") ? cleanString(updates.status, 60).toLowerCase() : currentStatus;
  const nextAction = Object.prototype.hasOwnProperty.call(updates, "nextAction") ? cleanString(updates.nextAction, 120) : currentNextAction;
  if (!PROJECT_PIPELINE_STATUSES.has(status)) return { ok: false, error: "Invalid Project status" };
  if (!PROJECT_PIPELINE_NEXT_ACTIONS.has(nextAction)) return { ok: false, error: "Invalid Project next action" };
  await env.LEADS_DB.prepare("UPDATE project_opportunities SET opportunity_status=?,next_action=?,details_json=?,updated_at=? WHERE reference=?")
    .bind(status, nextAction, JSON.stringify(details), new Date().toISOString(), reference).run();
  return { ok: true, status, nextAction, details };
}

async function handleAdminLeads(request, env, pathname) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function") return jsonResponse({ error: "Solar leads database is not configured" }, 503);

  let schema;
  try { schema = await solarLeadOperationsSchemaStatus(env.LEADS_DB); }
  catch (error) { return jsonResponse({ error: "Unable to inspect Solar lead schema", detail: cleanString(error?.message, 300) }, 503); }
  if (!schema.ready) return jsonResponse({ error: "v3.3.7 Solar lead operations migration is required", migrationRequired: true, schema }, 503);

  const suffix = pathname.slice(ADMIN_LEADS_PATH.length).replace(/^\/+/, "");
  const parts = suffix ? suffix.split("/").map((part) => decodeURIComponent(part)) : [];
  const reference = cleanString(parts[0], 80);
  const subresource = cleanString(parts[1], 40);

  if (!reference) {
    if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
    const rows = await env.LEADS_DB.prepare(`SELECT s.*,
      p.opportunity_status AS project_opportunity_status,
      p.next_action AS project_next_action,
      p.service_area AS project_service_area,
      p.city AS project_city,
      p.state AS project_state,
      p.zip AS project_zip,
      p.details_json AS project_details_json
      FROM solar_leads s
      JOIN project_opportunities p ON p.reference=s.reference AND lower(p.project_family)='solar'
      ORDER BY s.updated_at DESC LIMIT 300`).all();
    const leads = (rows.results || []).map(solarLeadRecord);
    const { summary, pipeline } = leadSummaryAndPipeline(leads);
    const trend = await solarLeadTrend(env.LEADS_DB, 14).catch(() => solarTrendDays(14));
    const recent = await env.LEADS_DB.prepare("SELECT reference, action, details_json, admin_email, created_at FROM solar_lead_activity ORDER BY created_at DESC LIMIT 60").all();
    const recentActivity = (recent.results || []).map((row) => ({ reference: cleanString(row.reference,80), action: cleanString(row.action,80), details: parseJsonObject(row.details_json), adminEmail: cleanString(row.admin_email,180), createdAt: cleanString(row.created_at,80) }));
    const response = jsonResponse({ ok: true, leads, summary, pipeline, trend, recentActivity, schema });
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }

  if (!subresource && (request.method === "GET" || request.method === "HEAD")) {
    const row = await getSolarLeadRow(env.LEADS_DB, reference);
    if (!row) return jsonResponse({ error: "Lead not found" }, 404);
    const activity = await env.LEADS_DB.prepare("SELECT id, action, details_json, admin_email, created_at FROM solar_lead_activity WHERE reference=? ORDER BY created_at DESC LIMIT 100").bind(reference).all();
    const response = jsonResponse({ ok: true, lead: solarLeadRecord(row), activity: (activity.results || []).map((item) => ({ id: item.id, action: item.action, details: parseJsonObject(item.details_json), adminEmail: item.admin_email, createdAt: item.created_at })) });
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }

  if (subresource !== "action" || request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD, POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  let body; try { body = await request.json(); } catch (_) { return jsonResponse({ error: "Invalid lead action" }, 400); }
  const action = cleanString(body.action, 60);
  const existing = await getSolarLeadRow(env.LEADS_DB, reference);
  if (!existing) return jsonResponse({ error: "Lead not found" }, 404);
  const now = new Date().toISOString();
  let activityAction = action, activityDetails = {};

  const currentProjectStatus = projectPipelineStatus(existing.project_opportunity_status);
  const currentProjectNextAction = projectPipelineNextAction(existing.project_next_action, existing.project_service_area);

  if (action === "save_lead") {
    const stage = cleanString(body.stage, 60).toLowerCase();
    const priority = cleanString(body.priority, 30).toLowerCase();
    const notes = cleanString(body.notes, 5000);
    if (!PROJECT_PIPELINE_STATUSES.has(stage)) return jsonResponse({ error: "Invalid Project status" }, 400);
    if (!PROJECT_RECORD_PRIORITIES.has(priority)) return jsonResponse({ error: "Invalid priority" }, 400);
    const closed = ["won", "lost", "closed"].includes(stage);
    const type = closed ? "No Action" : cleanString(body.nextActionType, 120);
    if (!PROJECT_PIPELINE_NEXT_ACTIONS.has(type)) return jsonResponse({ error: "Invalid Project next action" }, 400);
    const due = closed ? "" : validLeadDue(body.nextActionDueAt);
    const primary = await updateSolarPrimaryOperations(env, reference, { status: stage, nextAction: type, priority, notes }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    await env.LEADS_DB.prepare("UPDATE solar_leads SET next_action_due_at=?,updated_at=? WHERE reference=?").bind(due || null, now, reference).run();
    const stageChanged = stage !== currentProjectStatus;
    activityAction = stageChanged ? `stage_${stage}` : "lead_saved";
    activityDetails = { previousStatus: currentProjectStatus, status: stage, priority, nextActionType: type, nextActionDueAt: due, hasNotes: Boolean(notes), closed };
  } else if (action === "set_stage") {
    const stage = cleanString(body.stage, 60).toLowerCase();
    if (!PROJECT_PIPELINE_STATUSES.has(stage)) return jsonResponse({ error: "Invalid Project status" }, 400);
    const closed = ["won", "lost", "closed"].includes(stage);
    const primary = await updateSolarPrimaryOperations(env, reference, { status: stage, nextAction: closed ? "No Action" : currentProjectNextAction }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    activityAction = `stage_${stage}`; activityDetails = { previousStatus: currentProjectStatus, status: stage };
  } else if (action === "set_next_action") {
    if (["won", "lost", "closed"].includes(currentProjectStatus)) return jsonResponse({ error: "Closed leads cannot receive follow-up actions. Reopen the lead first." }, 409);
    const type = cleanString(body.nextActionType, 120), due = validLeadDue(body.nextActionDueAt);
    if (!PROJECT_PIPELINE_NEXT_ACTIONS.has(type) || type === "No Action") return jsonResponse({ error: "Invalid Project next action" }, 400);
    const primary = await updateSolarPrimaryOperations(env, reference, { nextAction: type }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    await env.LEADS_DB.prepare("UPDATE solar_leads SET next_action_due_at=?,updated_at=? WHERE reference=?").bind(due || null, now, reference).run();
    activityAction = "next_action_set"; activityDetails = { type, due };
  } else if (action === "record_call") {
    if (["won", "lost", "closed"].includes(currentProjectStatus)) return jsonResponse({ error: "Closed leads cannot receive follow-up actions. Reopen the lead first." }, 409);
    const result = cleanString(body.callStatus, 60), due = validLeadDue(body.nextActionDueAt);
    if (!SOLAR_CALL_STATUSES.has(result)) return jsonResponse({ error: "Invalid call result" }, 400);
    const primary = await updateSolarPrimaryOperations(env, reference, { nextAction: "Follow Up" }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    await env.LEADS_DB.prepare(`UPDATE solar_leads SET call_status=?, last_contact_at=?, last_contact_method='phone', next_action_due_at=?, updated_at=? WHERE reference=?`)
      .bind(result, now, due || existing.next_action_due_at || null, now, reference).run();
    activityAction = "call_recorded"; activityDetails = { result, nextActionType: "Follow Up", due };
  } else if (action === "record_email") {
    if (["won", "lost", "closed"].includes(currentProjectStatus)) return jsonResponse({ error: "Closed leads cannot receive follow-up actions. Reopen the lead first." }, 409);
    const state = cleanString(body.emailStatus, 60) || "sent", messageId = cleanString(body.messageId, 240), due = validLeadDue(body.nextActionDueAt);
    if (!new Set(["sent", "failed", "drafted"]).has(state)) return jsonResponse({ error: "Invalid customer email state" }, 400);
    if (state === "sent") {
      const primary = await updateSolarPrimaryOperations(env, reference, { nextAction: "Follow Up" }, auth.session.email);
      if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    }
    await env.LEADS_DB.prepare(`UPDATE solar_leads SET customer_email_status=?, customer_email_last_at=?, customer_email_message_id=?, last_contact_at=CASE WHEN ?='sent' THEN ? ELSE last_contact_at END, last_contact_method=CASE WHEN ?='sent' THEN 'email' ELSE last_contact_method END, next_action_due_at=CASE WHEN ?='sent' THEN ? ELSE next_action_due_at END, updated_at=? WHERE reference=?`)
      .bind(state, now, messageId, state, now, state, state, due || null, now, reference).run();
    activityAction = "customer_email_recorded"; activityDetails = { state, messageId, followUpDue: due };
  } else if (action === "mark_reply_received") {
    if (["won", "lost", "closed"].includes(currentProjectStatus)) return jsonResponse({ error: "Closed leads cannot receive follow-up actions. Reopen the lead first." }, 409);
    const primary = await updateSolarPrimaryOperations(env, reference, { nextAction: "Follow Up" }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    await env.LEADS_DB.prepare("UPDATE solar_leads SET customer_response_status='reply_received', last_contact_at=?, last_contact_method='email', updated_at=? WHERE reference=?").bind(now, now, reference).run();
    activityAction = "reply_received"; activityDetails = { method: "email", nextActionType: "Follow Up" };
  } else if (action === "save_notes") {
    const notes = cleanString(body.notes, 5000);
    const primary = await updateSolarPrimaryOperations(env, reference, { notes }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    activityAction = "notes_updated"; activityDetails = { hasNotes: Boolean(notes) };
  } else if (action === "set_priority") {
    const priority = cleanString(body.priority, 30).toLowerCase();
    if (!PROJECT_RECORD_PRIORITIES.has(priority)) return jsonResponse({ error: "Invalid priority" }, 400);
    const primary = await updateSolarPrimaryOperations(env, reference, { priority }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    activityAction = "priority_updated"; activityDetails = { priority };
  } else if (action === "close_lost") {
    const reason = cleanString(body.reason, 1000);
    const primary = await updateSolarPrimaryOperations(env, reference, { status: "lost", nextAction: "No Action" }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    await env.LEADS_DB.prepare("UPDATE solar_leads SET lost_reason=?, won_value=NULL, next_action_due_at=NULL, updated_at=? WHERE reference=?").bind(reason, now, reference).run();
    activityAction = "stage_lost"; activityDetails = { previousStatus: currentProjectStatus, status: "lost", reason };
  } else if (action === "close_won") {
    const amount = Number(body.wonValue); const safeAmount = Number.isFinite(amount) && amount >= 0 ? amount : null;
    const primary = await updateSolarPrimaryOperations(env, reference, { status: "won", nextAction: "No Action" }, auth.session.email);
    if (!primary.ok) return jsonResponse({ error: primary.error }, 409);
    await env.LEADS_DB.prepare("UPDATE solar_leads SET won_value=?, lost_reason='', next_action_due_at=NULL, updated_at=? WHERE reference=?").bind(safeAmount, now, reference).run();
    activityAction = "stage_won"; activityDetails = { previousStatus: currentProjectStatus, status: "won", wonValue: safeAmount };
  } else {
    return jsonResponse({ error: "Unsupported lead action" }, 400);
  }

  await recordSolarLeadActivity(env, reference, activityAction, activityDetails, auth.session.email);
  const updated = await getSolarLeadRow(env.LEADS_DB, reference);
  return jsonResponse({ ok: true, lead: solarLeadRecord(updated) });
}

function normalizeMarketplaceContactEmail(value) {
  const email = cleanString(value, 180).toLowerCase();
  return isValidEmail(email) ? email : "";
}

function marketplaceFollowupTitle(row) {
  return marketplaceListingTitle(row.category, row.year, row.make, row.model);
}

function marketplaceFollowupPosting(row) {
  return {
    id: cleanString(row.id, 80),
    reference: cleanString(row.reference, 80),
    category: normalizeMarketplaceCategory(row.category),
    listingType: ({ rv:"RV", vehicle:"Vehicle", motorcycle:"Motorcycle", boat:"Boat", bicycle:"Bicycle", gear:"Used Gear" })[normalizeMarketplaceCategory(row.category)] || cleanString(row.category, 60),
    title: marketplaceFollowupTitle(row),
    description: cleanString(row.highlights || row.condition_disclosure, 500),
    status: cleanString(row.status, 40),
    submittedAt: cleanString(row.created_at, 80),
    updatedAt: cleanString(row.updated_at, 80),
  };
}

async function marketplaceFollowupSchemaStatus(db) {
  if (!db || typeof db.prepare !== "function") return { ready:false, missing:["MARKETPLACE_DB"] };
  const required = ["marketplace_followup_contacts", "marketplace_followup_history", "marketplace_followup_template", "eus_site_events"];
  const missing=[];
  for (const table of required) {
    try { await db.prepare(`SELECT 1 FROM ${table} LIMIT 1`).first(); }
    catch (_) { missing.push(table); }
  }
  return { ready: missing.length === 0, missing };
}

async function ensureMarketplaceFollowupContact(env, email, source = {}) {
  const normalizedEmail = normalizeMarketplaceContactEmail(email);
  if (!normalizedEmail) return "";
  const now = new Date().toISOString();
  await env.MARKETPLACE_DB.prepare(`INSERT INTO marketplace_followup_contacts
    (normalized_email, display_name, phone, followup_status, last_contact_at, operations_notes, created_at, updated_at)
    VALUES (?, ?, ?, 'needs_follow_up', NULL, '', ?, ?)
    ON CONFLICT(normalized_email) DO UPDATE SET
      display_name=COALESCE(NULLIF(excluded.display_name,''), marketplace_followup_contacts.display_name),
      phone=COALESCE(NULLIF(excluded.phone,''), marketplace_followup_contacts.phone),
      updated_at=excluded.updated_at`)
    .bind(normalizedEmail, cleanString(source.name,120), cleanString(source.phone,80), now, now).run();
  return normalizedEmail;
}

async function marketplaceFollowupTemplate(env) {
  const row = await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_followup_template WHERE id='default' LIMIT 1").first();
  if (row) return { subject: row.subject || FOLLOWUP_DEFAULT_SUBJECT, body: row.body || FOLLOWUP_DEFAULT_BODY, version: Number(row.version)||1, updatedAt: row.updated_at || "", updatedBy: row.updated_by || "" };
  const now = new Date().toISOString();
  await env.MARKETPLACE_DB.prepare("INSERT INTO marketplace_followup_template (id, subject, body, version, updated_at, updated_by) VALUES ('default', ?, ?, 1, ?, 'system')")
    .bind(FOLLOWUP_DEFAULT_SUBJECT, FOLLOWUP_DEFAULT_BODY, now).run();
  return { subject: FOLLOWUP_DEFAULT_SUBJECT, body: FOLLOWUP_DEFAULT_BODY, version:1, updatedAt:now, updatedBy:"system" };
}

async function marketplaceFollowupRegistry(env) {
  const listingsResult = await env.MARKETPLACE_DB.prepare(`SELECT id,reference,category,status,seller_name,seller_email,seller_phone,year,make,model,highlights,condition_disclosure,created_at,updated_at
    FROM marketplace_listings WHERE TRIM(COALESCE(seller_email,''))<>'' ORDER BY created_at DESC`).all();
  const stateResult = await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_followup_contacts").all();
  const stateMap = new Map((stateResult.results||[]).map((row)=>[normalizeMarketplaceContactEmail(row.normalized_email),row]));
  const grouped = new Map();
  for (const row of listingsResult.results || []) {
    const email = normalizeMarketplaceContactEmail(row.seller_email);
    if (!email) continue;
    if (!grouped.has(email)) grouped.set(email, { normalizedEmail:email, customerName:cleanString(row.seller_name,120), email, phone:cleanString(row.seller_phone,80), postings:[] });
    const customer=grouped.get(email);
    if (!customer.customerName && row.seller_name) customer.customerName=cleanString(row.seller_name,120);
    if (!customer.phone && row.seller_phone) customer.phone=cleanString(row.seller_phone,80);
    customer.postings.push(marketplaceFollowupPosting(row));
  }
  const contacts=[];
  for (const customer of grouped.values()) {
    const state=stateMap.get(customer.normalizedEmail)||{};
    const status=FOLLOWUP_STATUSES.has(state.followup_status)?state.followup_status:"needs_follow_up";
    contacts.push({
      ...customer,
      customerName: cleanString(state.display_name || customer.customerName,120),
      phone: cleanString(state.phone || customer.phone,80),
      followupStatus: status,
      lastContactAt: cleanString(state.last_contact_at,80),
      operationsNotes: cleanString(state.operations_notes,5000),
      updatedAt: cleanString(state.updated_at,80),
      emailDeliveryStatus: status === "marked_sent" || status === "complete" ? "Manual send marked — unverified" : status === "opened_gmail" ? "Opened in Gmail — send unverified" : "Not sent / unverified",
    });
  }
  contacts.sort((a,b)=>String(b.postings?.[0]?.submittedAt||"").localeCompare(String(a.postings?.[0]?.submittedAt||"")));
  return contacts;
}

async function recordMarketplaceFollowupHistory(env, normalizedEmail, action, listing, auth, payload = {}) {
  await env.MARKETPLACE_DB.prepare(`INSERT INTO marketplace_followup_history
    (id, normalized_email, listing_id, listing_reference, action, subject, message_body, template_version, admin_email, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), normalizedEmail, cleanString(listing?.id,80), cleanString(listing?.reference,80), cleanString(action,60), cleanString(payload.subject,500), cleanString(payload.body,8000), Math.max(0, Number(payload.templateVersion)||0), cleanString(auth?.session?.email,180), new Date().toISOString()).run();
}

function marketplaceFollowupLeadPhone(value) {
  const digits = cleanString(value, 80).replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

async function marketplaceFollowupDuplicateLead(env, listing, email, phone) {
  const rows = await env.LEADS_DB.prepare("SELECT * FROM project_opportunities ORDER BY created_at DESC LIMIT 500").all();
  const listingReference = cleanString(listing?.reference, 80);
  const targetEmail = normalizeMarketplaceContactEmail(email);
  const targetPhone = marketplaceFollowupLeadPhone(phone);
  let emailMatch = null, phoneMatch = null;
  for (const row of rows.results || []) {
    let details = {};
    try { details = JSON.parse(row.details_json || "{}"); } catch (_) {}
    const bridge = details?.marketplaceFollowup && typeof details.marketplaceFollowup === "object" && !Array.isArray(details.marketplaceFollowup) ? details.marketplaceFollowup : {};
    if (listingReference && cleanString(bridge.listingReference, 80) === listingReference) return { row, reason: "listing_reference" };
    if (!emailMatch && targetEmail && normalizeMarketplaceContactEmail(row.email) === targetEmail) emailMatch = row;
    if (!phoneMatch && targetPhone && marketplaceFollowupLeadPhone(row.phone) === targetPhone) phoneMatch = row;
  }
  if (emailMatch) return { row: emailMatch, reason: "email" };
  if (phoneMatch) return { row: phoneMatch, reason: "phone" };
  return null;
}

async function copyMarketplaceFollowupToLead(env, listing, email, projectFamily, auth) {
  if (!env.LEADS_DB || typeof env.LEADS_DB.prepare !== "function") return { error: "Lead storage is not configured", status: 503 };
  const family = cleanString(projectFamily, 20).toLowerCase();
  if (!PROJECT_TYPES.has(family)) return { error: "Choose a valid Lead family before copying", status: 400 };
  const customerName = cleanString(listing?.seller_name, 120);
  const customerEmail = normalizeMarketplaceContactEmail(listing?.seller_email || email);
  const customerPhone = cleanString(listing?.seller_phone, 80);
  if (!customerName || (!customerEmail && !customerPhone)) return { error: "Marketplace customer contact information is incomplete", status: 400 };
  const duplicate = await marketplaceFollowupDuplicateLead(env, listing, customerEmail, customerPhone);
  if (duplicate?.row) return { ok: true, duplicate: true, duplicateReason: duplicate.reason, opportunity: projectAdminRecord(duplicate.row) };

  const now = new Date().toISOString();
  const reference = projectReference(family.toUpperCase());
  const category = normalizeMarketplaceCategory(listing?.category);
  const listingType = ({ rv:"RV", vehicle:"Vehicle", motorcycle:"Motorcycle", boat:"Boat", bicycle:"Bicycle", gear:"Used Gear" })[category] || cleanString(listing?.category, 60) || "Marketplace";
  const listingTitle = marketplaceFollowupTitle(listing);
  const listingReference = cleanString(listing?.reference, 80);
  const listingLocation = cleanString(listing?.location, 180);
  const description = cleanString(listing?.highlights || listing?.condition_disclosure, 1200);
  const summary = cleanString([`Marketplace Follow-Up — ${listingType}: ${listingTitle}`, listingReference ? `Listing ${listingReference}` : "", description].filter(Boolean).join(" · "), 2500);
  let followupNotes = "";
  try {
    const state = await env.MARKETPLACE_DB.prepare("SELECT operations_notes FROM marketplace_followup_contacts WHERE normalized_email=? LIMIT 1").bind(customerEmail).first();
    followupNotes = cleanString(state?.operations_notes, 5000);
  } catch (_) {}
  const adminEmail = cleanString(auth?.session?.email, 180);
  const details = {
    marketplaceFollowup: {
      listingId: cleanString(listing?.id, 80), listingReference, listingCategory: category, listingType, listingTitle,
      listingStatus: cleanString(listing?.status, 40), listingLocation, submittedAt: cleanString(listing?.created_at, 80),
      customerEmail, customerPhone, copiedAt: now, copiedBy: adminEmail
    },
    controlCenterRecord: { priority: "", timingUrgency: "", internalNotes: followupNotes, updatedAt: now, updatedBy: adminEmail }
  };
  await env.LEADS_DB.prepare(`INSERT INTO project_opportunities
    (reference,project_family,customer_name,phone,email,preferred_contact,consent,city,zip,state,service_area,intake_status,opportunity_status,project_category,summary,source,next_action,details_json,created_at,updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(reference,family,customerName,customerPhone,customerEmail,customerEmail?"Email":customerPhone?"Phone":"",0,"","","","manual_review","submitted","new",`Marketplace — ${listingType}`,summary,"Marketplace Follow-Up","Verify Service Area",JSON.stringify(details),now,now).run();
  const row = await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
  return { ok: true, duplicate: false, opportunity: projectAdminRecord(row) };
}

async function handleAdminMarketplaceFollowups(request, env, pathname) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.MARKETPLACE_DB) return jsonResponse({ error:"Marketplace database is not configured" },503);
  const schema = await marketplaceFollowupSchemaStatus(env.MARKETPLACE_DB);
  if (!schema.ready) return jsonResponse({ error:"Marketplace Follow-Up Registry migration is required", migrationRequired:true, missing:schema.missing },503);
  const suffix=pathname.slice(ADMIN_MARKETPLACE_FOLLOWUPS_PATH.length).replace(/^\/+/,"");
  if (request.method === "GET" && (!suffix || suffix === "registry")) {
    const contacts=await marketplaceFollowupRegistry(env);
    const template=await marketplaceFollowupTemplate(env);
    const metrics={ contacts:contacts.length, needsFollowUp:contacts.filter(c=>c.followupStatus!=="complete").length, emailPrepared:contacts.filter(c=>c.followupStatus==="email_prepared").length, openedGmail:contacts.filter(c=>c.followupStatus==="opened_gmail").length, markedSent:contacts.filter(c=>c.followupStatus==="marked_sent").length, complete:contacts.filter(c=>c.followupStatus==="complete").length };
    return jsonResponse({ ok:true, contacts, metrics, template });
  }
  if (request.method === "GET" && suffix === "history") {
    const url=new URL(request.url); const email=normalizeMarketplaceContactEmail(url.searchParams.get("email"));
    if (!email) return jsonResponse({error:"Valid customer email required"},400);
    const rows=await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_followup_history WHERE normalized_email=? ORDER BY created_at DESC LIMIT 100").bind(email).all();
    return jsonResponse({ok:true,history:(rows.results||[]).map(r=>({action:r.action,listingId:r.listing_id,listingReference:r.listing_reference,subject:r.subject,body:r.message_body,templateVersion:Number(r.template_version)||0,adminEmail:r.admin_email,createdAt:r.created_at}))});
  }
  if (!sameOriginRequest(request)) return jsonResponse({error:"Cross-origin request denied"},403);
  if (request.method !== "POST") return jsonResponse({error:"Method not allowed"},405,{Allow:"GET, POST"});
  let body; try { body=await request.json(); } catch (_) { return jsonResponse({error:"Invalid follow-up action"},400); }
  if (suffix === "template") {
    const action=cleanString(body.action,40);
    if (action === "reset") {
      const current=await marketplaceFollowupTemplate(env); const version=(Number(current.version)||1)+1; const now=new Date().toISOString();
      await env.MARKETPLACE_DB.prepare("UPDATE marketplace_followup_template SET subject=?, body=?, version=?, updated_at=?, updated_by=? WHERE id='default'").bind(FOLLOWUP_DEFAULT_SUBJECT,FOLLOWUP_DEFAULT_BODY,version,now,auth.session.email).run();
      return jsonResponse({ok:true,template:{subject:FOLLOWUP_DEFAULT_SUBJECT,body:FOLLOWUP_DEFAULT_BODY,version,updatedAt:now,updatedBy:auth.session.email}});
    }
    if (action !== "save") return jsonResponse({error:"Invalid template action"},400);
    const subject=cleanString(body.subject,500), messageBody=cleanString(body.body,8000);
    if (!subject || !messageBody) return jsonResponse({error:"Subject and body are required"},400);
    const allowedTokens=new Set(["first_name","listing_type","listing_title","listing_reference"]);
    const tokenPattern=/{{\s*([^{}\s]+)\s*}}/g; let match;
    while ((match=tokenPattern.exec(`${subject}\n${messageBody}`))) if (!allowedTokens.has(match[1])) return jsonResponse({error:`Unsupported merge field: {{${match[1]}}}`},400);
    const current=await marketplaceFollowupTemplate(env); const version=(Number(current.version)||1)+1; const now=new Date().toISOString();
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_followup_template SET subject=?, body=?, version=?, updated_at=?, updated_by=? WHERE id='default'").bind(subject,messageBody,version,now,auth.session.email).run();
    return jsonResponse({ok:true,template:{subject,body:messageBody,version,updatedAt:now,updatedBy:auth.session.email}});
  }
  if (suffix !== "action") return jsonResponse({error:"Unknown follow-up route"},404);
  const email=normalizeMarketplaceContactEmail(body.email); if (!email) return jsonResponse({error:"Valid customer email required"},400);
  const listing=body.listingId ? await getMarketplaceRow(env,cleanString(body.listingId,80)) : null;
  if (listing && normalizeMarketplaceContactEmail(listing.seller_email)!==email) return jsonResponse({error:"Posting does not belong to this customer"},400);
  const action=cleanString(body.action,40), now=new Date().toISOString();
  if (action === "copy_to_leads") {
    if (!listing) return jsonResponse({error:"Choose a Marketplace posting to copy"},400);
    const result = await copyMarketplaceFollowupToLead(env,listing,email,body.projectFamily,auth);
    if (result.error) return jsonResponse({error:result.error},result.status||400);
    return jsonResponse(result,200);
  }
  const customerSource=listing?{name:listing.seller_name,phone:listing.seller_phone}:{}; await ensureMarketplaceFollowupContact(env,email,customerSource);
  let status="";
  if (action === "prepare_email") status="email_prepared";
  else if (action === "opened_gmail") status="opened_gmail";
  else if (action === "mark_sent") status="marked_sent";
  else if (action === "mark_complete") status="complete";
  else if (action === "return_followup") status="needs_follow_up";
  else if (action === "save_notes") status="";
  else return jsonResponse({error:"Unsupported follow-up action"},400);
  const notes=cleanString(body.notes,5000);
  if (action === "save_notes") {
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_followup_contacts SET operations_notes=?, updated_at=? WHERE normalized_email=?").bind(notes,now,email).run();
  } else {
    const lastContact = action === "mark_sent" ? now : null;
    await env.MARKETPLACE_DB.prepare(`UPDATE marketplace_followup_contacts SET followup_status=?, last_contact_at=CASE WHEN ? IS NOT NULL THEN ? ELSE last_contact_at END, operations_notes=CASE WHEN ?<>'' THEN ? ELSE operations_notes END, updated_at=? WHERE normalized_email=?`)
      .bind(status,lastContact,lastContact,notes,notes,now,email).run();
    await recordMarketplaceFollowupHistory(env,email,action,listing,auth,{subject:cleanString(body.subject,500),body:cleanString(body.messageBody,8000),templateVersion:Number(body.templateVersion)||0});
  }
  const contacts=await marketplaceFollowupRegistry(env); const contact=contacts.find(c=>c.normalizedEmail===email)||null;
  return jsonResponse({ok:true,contact});
}

async function handleAdminOperations(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });

  let d1 = env.MARKETPLACE_DB ? "configured" : "unconfigured";
  let r2 = env.LISTING_IMAGES ? "configured" : "unconfigured";
  let leadsDb = env.LEADS_DB ? "configured" : "unconfigured";
  let leadTableRetrieval = "unknown";
  let leadAdminRetrieval = "unknown";
  let leadSchemaReady = "unknown";
  let leadActivityReady = "unknown";
  let leadSchemaMissing = [];
  let counts = {}, recent24h = 0, lastSuccess = null, lastFailure = null, recentActions = [];
  let unresolvedIssues = 0, failedUploads = 0;
  let totalListingViews = 0, listingViews24h = 0;
  let marketplaceSellerContactsByListing = {};
  let marketplaceListingInterestsByListing = {};
  let businessSignals = { contactAttempts:0, followUpActions:0, callActions:0, textActions:0, emailActions:0, submittedLeads:0, contactActionSources:[], analyticsCollection:"unavailable", sellerContactAttempts:0, buyerContactRate:0, listingInterests:0, builderEntries:0, powerSnapshotViews:0, reviewOpens:0, submittedSolarLeads:0, builderLeadConversion:0, homeProjectInterest:0, rvProjectInterest:0, solarProjectInterest:0, submissionFailures:0, highIntentLeads:0, actionRequired:0, followUpsDue:0 };

  if (env.MARKETPLACE_DB) {
    try {
      await env.MARKETPLACE_DB.prepare("SELECT 1 AS ok").first();
      d1 = "ok";
      const countResult = await env.MARKETPLACE_DB.prepare("SELECT status, COUNT(*) AS count FROM marketplace_listings GROUP BY status").all();
      counts = Object.fromEntries((countResult.results || []).map((row) => [String(row.status), Number(row.count) || 0]));
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const recent = await env.MARKETPLACE_DB.prepare("SELECT COUNT(*) AS count FROM marketplace_listings WHERE created_at>=?").bind(cutoff).first();
      recent24h = Number(recent?.count) || 0;
      try {
        const attempts = await env.MARKETPLACE_DB.prepare("SELECT COUNT(*) AS count FROM marketplace_events WHERE event_type='seller_submit_start' AND created_at>=?").bind(cutoff).first();
        counts.submit_attempts_24h = Number(attempts?.count) || 0;
      } catch (_) { counts.submit_attempts_24h = 0; }
      try {
        const viewTotals = await env.MARKETPLACE_DB.prepare(`SELECT
          COUNT(*) AS total_views,
          SUM(CASE WHEN first_seen>=? THEN 1 ELSE 0 END) AS views_24h
          FROM (
            SELECT e.listing_id, e.session_hash, MIN(e.created_at) AS first_seen
            FROM marketplace_events e
            INNER JOIN marketplace_listings l ON l.id=e.listing_id
            WHERE e.event_type='listing_open' AND e.listing_id IS NOT NULL AND e.listing_id<>''
            GROUP BY e.listing_id, e.session_hash
          )`).bind(cutoff).first();
        totalListingViews = Number(viewTotals?.total_views) || 0;
        listingViews24h = Number(viewTotals?.views_24h) || 0;
      } catch (error) {
        console.error(JSON.stringify({ event: "admin_listing_view_totals_error", message: error instanceof Error ? error.message : String(error) }));
        totalListingViews = 0;
        listingViews24h = 0;
      }
      try {
        const sellerMetricRows = await env.MARKETPLACE_DB.prepare(`SELECT listing_id,
          SUM(had_contact) AS seller_contact_attempts,
          SUM(had_view) AS listing_view_sessions
          FROM (
            SELECT listing_id, session_hash,
              MAX(CASE WHEN event_type IN ('contact_call','contact_text') THEN 1 ELSE 0 END) AS had_contact,
              MAX(CASE WHEN event_type='listing_open' THEN 1 ELSE 0 END) AS had_view
            FROM marketplace_events
            WHERE listing_id IS NOT NULL AND listing_id<>''
              AND session_hash IS NOT NULL AND session_hash<>''
              AND event_type IN ('listing_open','contact_call','contact_text')
            GROUP BY listing_id, session_hash
          )
          GROUP BY listing_id`).all();
        marketplaceSellerContactsByListing = Object.fromEntries((sellerMetricRows.results || []).map((row) => {
          const contacts = Math.max(0, Number(row.seller_contact_attempts) || 0);
          const views = Math.max(0, Number(row.listing_view_sessions) || 0);
          return [String(row.listing_id || ''), { sellerContactAttempts: contacts, buyerContactRate: views > 0 ? Math.round((contacts / views) * 1000) / 10 : 0 }];
        }).filter(([listingId]) => listingId));
      } catch (error) {
        console.error(JSON.stringify({ event: "admin_seller_contact_metrics_error", message: error instanceof Error ? error.message : String(error) }));
        marketplaceSellerContactsByListing = {};
      }
      try {
        const interestRows = await env.MARKETPLACE_DB.prepare(`SELECT listing_id,
          COUNT(*) AS interest_count,
          MAX(last_interest) AS most_recent_interest
          FROM (
            SELECT listing_id, session_hash, MAX(created_at) AS last_interest
            FROM marketplace_events
            WHERE event_type='contact_reveal'
              AND listing_id IS NOT NULL AND listing_id<>''
              AND session_hash IS NOT NULL AND session_hash<>''
            GROUP BY listing_id, session_hash
          )
          GROUP BY listing_id`).all();
        marketplaceListingInterestsByListing = Object.fromEntries((interestRows.results || []).map((row) => [String(row.listing_id || ''), {
          listingInterests: Math.max(0, Number(row.interest_count) || 0),
          mostRecentInterest: cleanString(row.most_recent_interest, 80),
        }]).filter(([listingId]) => listingId));
      } catch (error) {
        console.error(JSON.stringify({ event: "admin_listing_interest_metrics_error", message: error instanceof Error ? error.message : String(error) }));
        marketplaceListingInterestsByListing = {};
      }
      try {
        const signalRow = await env.MARKETPLACE_DB.prepare(`SELECT
          SUM(CASE WHEN event_type='contact_click' AND event_value IN ('call','text','email') THEN 1 ELSE 0 END) AS contact_attempts,
          SUM(CASE WHEN event_type='contact_click' AND event_value='follow_up_request' THEN 1 ELSE 0 END) AS follow_up_actions,
          SUM(CASE WHEN event_type='contact_click' AND event_value='call' THEN 1 ELSE 0 END) AS call_actions,
          SUM(CASE WHEN event_type='contact_click' AND event_value='text' THEN 1 ELSE 0 END) AS text_actions,
          SUM(CASE WHEN event_type='contact_click' AND event_value='email' THEN 1 ELSE 0 END) AS email_actions,
          COUNT(DISTINCT CASE WHEN event_type='solar_builder_entry' THEN session_hash END) AS builder_entries,
          COUNT(DISTINCT CASE WHEN event_type='solar_builder_opened' THEN session_hash END) AS solar_builder_opened,
          COUNT(DISTINCT CASE WHEN event_type='solar_contact_captured' THEN id END) AS solar_contact_captured,
          COUNT(DISTINCT CASE WHEN event_type='solar_lead_created' THEN id END) AS solar_lead_created,
          COUNT(DISTINCT CASE WHEN event_type='solar_build_started' THEN id END) AS solar_build_started,
          COUNT(DISTINCT CASE WHEN event_type='solar_review_opened' THEN id END) AS solar_review_opened,
          COUNT(DISTINCT CASE WHEN event_type='solar_completed_submitted' THEN id END) AS solar_completed_submitted,
          COUNT(DISTINCT CASE WHEN event_type='power_snapshot_viewed' THEN session_hash END) AS snapshot_views,
          COUNT(DISTINCT CASE WHEN event_type='review_opened' THEN session_hash END) AS review_opens,
          COUNT(DISTINCT CASE WHEN event_type='lead_submitted' AND page LIKE '%/solar-project%' THEN id END) AS tracked_solar_leads,
          COUNT(DISTINCT CASE WHEN event_type='project_type_selected' AND event_value='home' THEN session_hash END) AS home_interest,
          COUNT(DISTINCT CASE WHEN event_type='project_type_selected' AND event_value='rv' THEN session_hash END) AS rv_interest,
          COUNT(DISTINCT CASE WHEN event_type='project_type_selected' AND event_value='solar' THEN session_hash END) AS solar_interest
          FROM eus_site_events`).first();
        businessSignals.contactAttempts=Number(signalRow?.contact_attempts)||0;
        businessSignals.followUpActions=Number(signalRow?.follow_up_actions)||0;
        businessSignals.callActions=Number(signalRow?.call_actions)||0;
        businessSignals.textActions=Number(signalRow?.text_actions)||0;
        businessSignals.emailActions=Number(signalRow?.email_actions)||0;
        businessSignals.analyticsCollection="ok";
        try {
          const sourceRows = await env.MARKETPLACE_DB.prepare(`SELECT
              event_value AS method,
              page,
              COALESCE(NULLIF(json_extract(details_json, '$.cta_id'), ''), 'legacy/unattributed') AS cta_id,
              COALESCE(NULLIF(json_extract(details_json, '$.build'), ''), '') AS event_build,
              COUNT(*) AS count,
              COUNT(DISTINCT session_hash) AS unique_sessions
            FROM eus_site_events
            WHERE event_type='contact_click' AND event_value IN ('call','text','email')
            GROUP BY event_value, page, cta_id, event_build
            ORDER BY count DESC, page ASC, cta_id ASC
            LIMIT 18`).all();
          businessSignals.contactActionSources=(sourceRows.results||[]).map((row)=>({
            method:cleanString(row.method,20),
            page:analyticsPath(row.page||"/"),
            ctaId:cleanString(row.cta_id,120)||"legacy/unattributed",
            build:cleanString(row.event_build,100),
            count:Math.max(0,Number(row.count)||0),
            uniqueSessions:Math.max(0,Number(row.unique_sessions)||0)
          }));
        } catch (error) { console.error(JSON.stringify({event:"admin_contact_action_sources_error",message:error instanceof Error?error.message:String(error)})); }
        businessSignals.builderEntries=Number(signalRow?.builder_entries)||0;
        businessSignals.solarBuilderOpened=Number(signalRow?.solar_builder_opened)||0;
        businessSignals.solarContactCaptured=Number(signalRow?.solar_contact_captured)||0;
        businessSignals.solarLeadCreated=Number(signalRow?.solar_lead_created)||0;
        businessSignals.solarBuildStarted=Number(signalRow?.solar_build_started)||0;
        businessSignals.solarReviewOpened=Number(signalRow?.solar_review_opened)||0;
        businessSignals.solarCompletedSubmitted=Number(signalRow?.solar_completed_submitted)||0;
        businessSignals.powerSnapshotViews=Number(signalRow?.snapshot_views)||0;
        businessSignals.reviewOpens=Number(signalRow?.review_opens)||0;
        const trackedLeads=Number(signalRow?.tracked_solar_leads)||0;
        businessSignals.builderLeadConversion=businessSignals.builderEntries>0?Math.round((trackedLeads/businessSignals.builderEntries)*1000)/10:0;
        businessSignals.homeProjectInterest=Number(signalRow?.home_interest)||0;
        businessSignals.rvProjectInterest=Number(signalRow?.rv_interest)||0;
        businessSignals.solarProjectInterest=Number(signalRow?.solar_interest)||0;
        const sellerIntent = await env.MARKETPLACE_DB.prepare(`SELECT
          COALESCE(SUM(had_contact),0) AS seller_contact_attempts,
          COALESCE(SUM(had_view),0) AS listing_view_sessions,
          COALESCE(SUM(CASE WHEN had_contact=1 AND had_view=1 THEN 1 ELSE 0 END),0) AS contacted_view_sessions
          FROM (
            SELECT listing_id, session_hash,
              MAX(CASE WHEN event_type IN ('contact_call','contact_text') THEN 1 ELSE 0 END) AS had_contact,
              MAX(CASE WHEN event_type='listing_open' THEN 1 ELSE 0 END) AS had_view
            FROM marketplace_events
            WHERE listing_id IS NOT NULL AND listing_id<>''
              AND session_hash IS NOT NULL AND session_hash<>''
              AND event_type IN ('listing_open','contact_call','contact_text')
            GROUP BY listing_id, session_hash
          )`).first();
        businessSignals.sellerContactAttempts=Math.max(0,Number(sellerIntent?.seller_contact_attempts)||0);
        const sellerViews=Math.max(0,Number(sellerIntent?.listing_view_sessions)||0);
        const contactedViews=Math.max(0,Number(sellerIntent?.contacted_view_sessions)||0);
        businessSignals.buyerContactRate=sellerViews>0?Math.round((contactedViews/sellerViews)*1000)/10:0;
        const interestSignal = await env.MARKETPLACE_DB.prepare(`SELECT COUNT(*) AS count FROM (
          SELECT listing_id, session_hash FROM marketplace_events
          WHERE event_type='contact_reveal' AND listing_id IS NOT NULL AND listing_id<>'' AND session_hash IS NOT NULL AND session_hash<>''
          GROUP BY listing_id, session_hash
        )`).first();
        businessSignals.listingInterests=Math.max(0,Number(interestSignal?.count)||0);
        const failureSignal=await env.MARKETPLACE_DB.prepare("SELECT COUNT(*) AS count FROM marketplace_admin_log WHERE action='submission_failure'").first();
        businessSignals.submissionFailures=Number(failureSignal?.count)||0;
      } catch (error) {
        console.error(JSON.stringify({event:"admin_business_signal_error",message:error instanceof Error?error.message:String(error)}));
      }
      const successRow = await env.MARKETPLACE_DB.prepare("SELECT id, reference, category, created_at FROM marketplace_listings ORDER BY created_at DESC LIMIT 1").first();
      if (successRow) lastSuccess = { id: successRow.id, reference: successRow.reference, category: successRow.category, createdAt: successRow.created_at };

      const failureRows = await env.MARKETPLACE_DB.prepare("SELECT id, listing_id, details, created_at FROM marketplace_admin_log WHERE action='submission_failure' ORDER BY created_at DESC LIMIT 100").all();
      const resolutionRows = await env.MARKETPLACE_DB.prepare("SELECT listing_id FROM marketplace_admin_log WHERE action='submission_issue_resolved' ORDER BY created_at DESC LIMIT 200").all();
      const resolved = new Set((resolutionRows.results || []).map((row) => String(row.listing_id || "")));
      const parsedIssues = (failureRows.results || []).map(marketplaceSubmissionIssueRecord);
      const open = parsedIssues.filter((issue) => !resolved.has(`submission-issue:${issue.issueId}`));
      unresolvedIssues = open.length;
      failedUploads = open.filter((issue) => issue.stage === "image_storage" || issue.r2Status === "failed" || issue.uploadStatus === "failed").length;
      lastFailure = parsedIssues[0] || null;

      const activity = await env.MARKETPLACE_DB.prepare(`SELECT l.action, l.admin_email, l.details, l.created_at, l.listing_id, m.reference
        FROM marketplace_admin_log l LEFT JOIN marketplace_listings m ON m.id=l.listing_id
        WHERE l.action IN ('approve','reject','request_changes','unpublish','mark_sold','restore_pending','edit','delete')
        ORDER BY l.created_at DESC LIMIT 16`).all();
      const labels = { approve: "Approved", reject: "Rejected", request_changes: "Changes requested", unpublish: "Unpublished", mark_sold: "Marked sold", restore_pending: "Returned to pending", edit: "Edited", delete: "Deleted" };
      recentActions = (activity.results || []).map((row) => ({ action: row.action, actionLabel: labels[row.action] || row.action, listingId: row.listing_id, reference: row.reference || "", details: row.details || "", createdAt: row.created_at }));
    } catch (error) {
      d1 = "error";
      console.error(JSON.stringify({ event: "admin_operations_d1_error", message: error instanceof Error ? error.message : String(error) }));
    }
  }
  if (env.LISTING_IMAGES) {
    try {
      if (typeof env.LISTING_IMAGES.list === "function") await env.LISTING_IMAGES.list({ limit: 1 });
      r2 = "ok";
    } catch (error) {
      r2 = "error";
      console.error(JSON.stringify({ event: "admin_operations_r2_error", message: error instanceof Error ? error.message : String(error) }));
    }
  }
  if (env.LEADS_DB) {
    try {
      await env.LEADS_DB.prepare("SELECT 1 AS ok").first();
      leadsDb = "ok";
      await env.LEADS_DB.prepare("SELECT reference FROM solar_leads ORDER BY updated_at DESC LIMIT 1").first();
      leadTableRetrieval = "ok";
      try {
        const submittedLeadSignal = await env.LEADS_DB.prepare("SELECT COUNT(*) AS count FROM project_opportunities WHERE intake_status='submitted'").first();
        businessSignals.submittedLeads=Math.max(0,Number(submittedLeadSignal?.count)||0);
      } catch (error) { console.error(JSON.stringify({event:"admin_submitted_leads_signal_error",message:error instanceof Error?error.message:String(error)})); }
      const leadSchema = await solarLeadOperationsSchemaStatus(env.LEADS_DB);
      leadSchemaReady = leadSchema.columnsReady ? "ok" : "migration_required";
      leadActivityReady = leadSchema.activityReady ? "ok" : "migration_required";
      leadSchemaMissing = leadSchema.missing || [];
      leadAdminRetrieval = leadSchema.ready ? "ok" : "migration_required";
      if (leadSchema.ready) {
        try {
          const leadSignal = await env.LEADS_DB.prepare(`SELECT
            SUM(CASE WHEN s.lead_classification='submitted' THEN 1 ELSE 0 END) AS submitted_total,
            SUM(CASE WHEN s.lead_classification='potential' AND s.intent_level='high_intent' THEN 1 ELSE 0 END) AS high_intent,
            SUM(CASE WHEN p.opportunity_status NOT IN ('won','lost','closed') AND p.next_action IS NOT NULL AND p.next_action<>'' AND p.next_action<>'No Action' THEN 1 ELSE 0 END) AS action_required,
            SUM(CASE WHEN p.opportunity_status NOT IN ('won','lost','closed') AND p.next_action IS NOT NULL AND p.next_action<>'' AND p.next_action<>'No Action' AND s.next_action_due_at IS NOT NULL AND s.next_action_due_at<>'' AND s.next_action_due_at<=? THEN 1 ELSE 0 END) AS followups_due
            FROM solar_leads s
            JOIN project_opportunities p ON p.reference=s.reference AND lower(p.project_family)='solar'`).bind(new Date(Date.now()+24*60*60*1000).toISOString()).first();
          businessSignals.submittedSolarLeads=Number(leadSignal?.submitted_total)||0;
          businessSignals.highIntentLeads=Number(leadSignal?.high_intent)||0;
          businessSignals.actionRequired=Number(leadSignal?.action_required)||0;
          businessSignals.followUpsDue=Number(leadSignal?.followups_due)||0;
        } catch (error) { console.error(JSON.stringify({event:"admin_lead_signal_error",message:error instanceof Error?error.message:String(error)})); }
      }
    } catch (error) {
      leadsDb = "error";
      leadTableRetrieval = "error";
      leadAdminRetrieval = "error";
      leadSchemaReady = "error";
      leadActivityReady = "error";
      console.error(JSON.stringify({ event: "admin_operations_leads_d1_error", message: error instanceof Error ? error.message : String(error) }));
    }
  }
  let publicHealth = "unknown";
  let publicHealthServices = {};
  try {
    const healthResponse = await handleHealth(new Request(new URL(HEALTH_PATH, request.url), { method: "GET" }), env);
    const healthPayload = await healthResponse.json().catch(() => ({}));
    publicHealth = cleanString(healthPayload.status, 30) || (healthResponse.ok ? "ok" : "degraded");
    publicHealthServices = healthPayload.services || {};
  } catch (_) {
    publicHealth = "error";
  }

  const emailTransport = Boolean((env.EMAIL && typeof env.EMAIL.send === "function") || (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_EMAIL_API_TOKEN));
  const marketplaceNotifications = Boolean(isValidEmail(cleanString(env.MARKETPLACE_EMAIL_TO || DEFAULT_MARKETPLACE_EMAIL_TO, 180)) && isValidEmail(cleanString(env.MARKETPLACE_EMAIL_FROM || env.SOLAR_EMAIL_FROM, 180)) && emailTransport) ? "configured" : "unconfigured";
  const solarNotifications = Boolean(isValidEmail(cleanString(env.SOLAR_EMAIL_TO || DEFAULT_SOLAR_EMAIL_TO, 180)) && isValidEmail(cleanString(env.SOLAR_EMAIL_FROM, 180)) && emailTransport) ? "configured" : "unconfigured";
  const notifications = marketplaceNotifications === "configured" && solarNotifications === "configured" ? "configured" : "attention";
  const backend = d1 === "ok" && r2 === "ok" ? "ok" : "degraded";
  const leadCore = leadsDb === "ok" && leadTableRetrieval === "ok" && leadSchemaReady === "ok" && leadActivityReady === "ok" && leadAdminRetrieval === "ok" ? "ok" : "degraded";
  const coreOperational = backend === "ok" && leadCore === "ok";
  const health = {
    status: coreOperational ? (notifications === "configured" && publicHealth === "ok" ? "ok" : "operational") : "degraded",
    reason: leadCore !== "ok" && (leadSchemaReady === "migration_required" || leadActivityReady === "migration_required")
      ? "v3.3.7 lead migration is required; legacy Solar storage may still be available."
      : (coreOperational && notifications !== "configured" ? "Notifications require attention; lead storage is healthy." : ""),
    publicHealth, publicHealthServices, backend, d1, r2, leadsDb, leadTableRetrieval, leadAdminRetrieval, leadSchemaReady, leadActivityReady, leadSchemaMissing, leadCore,
    notifications, marketplaceNotifications, solarNotifications, build: OPERATIONS_BUILD,
  };
  const summary = { pending: Number(counts.pending_review) || 0, published: Number(counts.published) || 0, unresolvedIssues, failedUploads, recent24h, totalListingViews, listingViews24h };
  const response = jsonResponse({ ok: true, summary, health, signals: businessSignals, marketplaceSellerContactsByListing, marketplaceListingInterestsByListing, lastSuccess, lastFailure, recentActions });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleAdminMarketplaceIssues(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.MARKETPLACE_DB) return jsonResponse({ error: "Marketplace database is not configured" }, 503);

  if (request.method === "POST") {
    if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
    let body;
    try { body = await request.json(); } catch (_) { return jsonResponse({ error: "Invalid issue action" }, 400); }
    const action = cleanString(body.action, 40), issueId = cleanString(body.issueId, 100), reference = cleanString(body.reference, 80);
    const resolution = cleanString(body.resolution, 500) || "Resolved by Admin";
    if (action !== "resolve" || !issueId) return jsonResponse({ error: "Invalid issue action" }, 400);
    const now = new Date().toISOString();
    await env.MARKETPLACE_DB.prepare("INSERT INTO marketplace_admin_log (listing_id, action, admin_email, details, created_at) VALUES (?, 'submission_issue_resolved', ?, ?, ?)")
      .bind(`submission-issue:${issueId}`, auth.session.email, JSON.stringify({ issueId, reference, resolution, resolvedAt: now }), now).run();
    return jsonResponse({ ok: true, issueId, reference, resolvedAt: now });
  }

  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD, POST" });
  const result = await env.MARKETPLACE_DB.prepare("SELECT id, listing_id, details, created_at FROM marketplace_admin_log WHERE action='submission_failure' ORDER BY created_at DESC LIMIT 100").all();
  const resolutionResult = await env.MARKETPLACE_DB.prepare("SELECT listing_id, admin_email, details, created_at FROM marketplace_admin_log WHERE action='submission_issue_resolved' ORDER BY created_at DESC LIMIT 200").all();
  const resolutions = new Map();
  for (const row of resolutionResult.results || []) {
    const key = cleanString(row.listing_id, 160);
    if (!key || resolutions.has(key)) continue;
    let detail = {}; try { detail = JSON.parse(row.details || "{}"); } catch (_) {}
    resolutions.set(key, { resolvedAt: cleanString(row.created_at || detail.resolvedAt, 80), resolution: cleanString(detail.resolution, 500), resolvedBy: cleanString(row.admin_email, 180) });
  }
  let issues = (result.results || []).map((row) => {
    const issue = marketplaceSubmissionIssueRecord(row);
    const resolution = resolutions.get(`submission-issue:${issue.issueId}`) || null;
    return { ...issue, resolved: Boolean(resolution), ...(resolution || {}) };
  });
  const url = new URL(request.url);
  const state = cleanString(url.searchParams.get("state") || "unresolved", 20);
  if (state === "resolved") issues = issues.filter((issue) => issue.resolved);
  else if (state !== "all") issues = issues.filter((issue) => !issue.resolved);

  let signals24h = { failed: 0, succeeded: 0 };
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const funnel = await env.MARKETPLACE_DB.prepare("SELECT SUM(CASE WHEN event_type='seller_submission_failed' THEN 1 ELSE 0 END) AS failed, SUM(CASE WHEN event_type='seller_submission' THEN 1 ELSE 0 END) AS succeeded FROM marketplace_events WHERE created_at>=?").bind(cutoff).first();
    signals24h = { failed: Number(funnel?.failed) || 0, succeeded: Number(funnel?.succeeded) || 0 };
  } catch (_) {}
  const response = jsonResponse({ issues, count: issues.length, limit: 100, state, signals24h });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleMarketplaceHealth(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  let d1 = env.MARKETPLACE_DB ? "configured" : "unconfigured";
  let r2 = env.LISTING_IMAGES ? "configured" : "unconfigured";
  let pendingWorkflow = "unknown";
  let publicListingWorkflow = "unknown";
  if (env.MARKETPLACE_DB) {
    try {
      await env.MARKETPLACE_DB.prepare("SELECT 1 AS ok").first();
      d1 = "ok";
      await env.MARKETPLACE_DB.prepare("SELECT id FROM marketplace_listings WHERE status='pending_review' LIMIT 1").first();
      pendingWorkflow = "ok";
      await env.MARKETPLACE_DB.prepare("SELECT id FROM marketplace_listings WHERE status IN ('published','sold') LIMIT 1").first();
      publicListingWorkflow = "ok";
    } catch (error) {
      d1 = "error"; pendingWorkflow = "error"; publicListingWorkflow = "error";
      console.error(JSON.stringify({ event: "marketplace_health_d1_error", message: error instanceof Error ? error.message : String(error) }));
    }
  }
  if (env.LISTING_IMAGES) {
    try { if (typeof env.LISTING_IMAGES.list === "function") await env.LISTING_IMAGES.list({ limit: 1 }); r2 = "ok"; }
    catch (error) { r2 = "error"; console.error(JSON.stringify({ event: "marketplace_health_r2_error", message: error instanceof Error ? error.message : String(error) })); }
  }
  const notifications = Boolean(
    isValidEmail(cleanString(env.MARKETPLACE_EMAIL_TO || DEFAULT_MARKETPLACE_EMAIL_TO, 180)) &&
    isValidEmail(cleanString(env.MARKETPLACE_EMAIL_FROM || env.SOLAR_EMAIL_FROM, 180)) &&
    ((env.EMAIL && typeof env.EMAIL.send === "function") || (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_EMAIL_API_TOKEN))
  ) ? "configured" : "unconfigured";
  const status = d1 === "ok" && r2 === "ok" && pendingWorkflow === "ok" && publicListingWorkflow === "ok" ? "ok" : "degraded";
  const payload = {
    status, build: OPERATIONS_BUILD, checkedAt: new Date().toISOString(),
    services: {
      marketplaceFrontend: env.ASSETS ? "configured" : "unconfigured",
      listingSubmissionEndpoint: "reachable",
      marketplaceDatabase: d1,
      marketplaceImages: r2,
      pendingListingWorkflow: pendingWorkflow,
      publicListingWorkflow,
      notifications,
    },
    note: "This health response verifies Marketplace infrastructure and read paths without exposing secrets or creating test records.",
  };
  const response = jsonResponse(payload, status === "ok" ? 200 : 503, { "Cache-Control": "no-store", "X-EUS-Operations-Build": OPERATIONS_BUILD, "X-Robots-Tag": "noindex, nofollow, noarchive" });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleMarketplaceSubmit(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const page = new URL(request.url).pathname;
  const userAgent = cleanString(request.headers.get("User-Agent"), 280);
  const clientRequestId = cleanString(request.headers.get("X-EUS-Request"), 100) || marketplaceSubmissionIssueReference();
  const retryCount = Math.max(0, Math.min(20, Number.parseInt(request.headers.get("X-EUS-Retry") || "0", 10) || 0));
  const requestBuild = cleanString(request.headers.get("X-EUS-Build"), 100) || OPERATIONS_BUILD;
  const analyticsSessionId = cleanString(request.headers.get("X-EUS-Session"), 100);

  if (!env.MARKETPLACE_DB || !env.LISTING_IMAGES) {
    const issue = await recordMarketplaceSubmissionIssue(env, { reference: clientRequestId, stage: "configuration", code: "storage_not_configured", httpStatus: 503, backendStatus: "unavailable", uploadStatus: "not_started", r2Status: env.LISTING_IMAGES ? "configured" : "unconfigured", d1Status: env.MARKETPLACE_DB ? "configured" : "unconfigured", page, userAgent, clientRequestId, retryCount, build: requestBuild });
    return jsonResponse({ error: "Marketplace storage is not configured", code: "storage_not_configured", reference: issue.reference }, 503);
  }

  const rateLimit = await marketplaceRateLimit(request, env);
  if (!rateLimit.allowed) {
    const issue = await recordMarketplaceSubmissionIssue(env, { reference: clientRequestId, stage: "rate_limit", code: "submission_rate_limited", httpStatus: 429, backendStatus: "rejected", uploadStatus: "not_started", r2Status: "not_started", d1Status: "not_started", page, userAgent, clientRequestId, retryCount, build: requestBuild });
    return jsonResponse({ error: "Too many listing submissions from this connection. Please try again later.", code: "submission_rate_limited", reference: issue.reference }, 429, { "Retry-After": String(rateLimit.retryAfter || 20) });
  }

  const parsedSubmission = await parseLimitedMultipartFormData(request, MARKETPLACE_MAX_TOTAL_BYTES, "Submission");
  if (parsedSubmission.response) {
    const issue = await recordMarketplaceSubmissionIssue(env, { reference: clientRequestId, stage: "request_parse", code: "submission_body_invalid_or_too_large", httpStatus: parsedSubmission.response.status || 400, backendStatus: "rejected", uploadStatus: "not_started", r2Status: "not_started", d1Status: "not_started", page, userAgent, clientRequestId, retryCount, build: requestBuild });
    return jsonResponse({ error: parsedSubmission.response.status === 413 ? "The full submission is too large. Please use fewer or smaller photos." : "The listing request could not be read. Please try again.", code: "submission_body_invalid_or_too_large", reference: issue.reference }, parsedSubmission.response.status || 400);
  }

  const form = parsedSubmission.form;
  if (marketplaceField(form, "website", 120)) return jsonResponse({ ok: true, ignored: true });
  const category = normalizeMarketplaceCategory(form.get("category"));
  const sellerName = marketplaceField(form, "sellerName", 120);
  const sellerEmail = marketplaceField(form, "sellerEmail", 180).toLowerCase();
  const sellerPhone = marketplaceField(form, "sellerPhone", 80);
  const city = marketplaceField(form, "city", 120);
  const state = marketplaceField(form, "state", 2).toUpperCase();
  const legacyLocation = marketplaceField(form, "location", 180);
  const location = city && MARKETPLACE_US_STATE_CODES.has(state) ? `${city}, ${state}` : legacyLocation;
  const locationValid = Boolean(city && MARKETPLACE_US_STATE_CODES.has(state));
  const year = Number.parseInt(marketplaceField(form, "year", 4), 10);
  const make = marketplaceField(form, "make", 120);
  const model = marketplaceField(form, "model", 160);
  const price = marketplaceField(form, "price", 80);
  const mileage = marketplaceField(form, "mileage", 80);
  const titleStatus = marketplaceField(form, "titleStatus", 120);
  const itemType = marketplaceItemType(category, form);
  const highlights = marketplaceField(form, "highlights", 2500);
  const conditionDisclosure = marketplaceField(form, "condition", 2500);
  const consent = marketplaceField(form, "submissionConsent", 20);
  const qaToken = marketplaceField(form, "qaToken", 1600);
  const reference = marketplaceReference();
  const submitStartedAt = new Date().toISOString();
  const submittedPhotoCount = marketplacePhotoSlots(category).filter((slot) => { const file=form.get(slot); return file instanceof File && file.size; }).length;
  const context = { reference, category, page, userAgent, clientRequestId, photoCount: submittedPhotoCount, retryCount, build: requestBuild };

  if (validAnalyticsSessionId(analyticsSessionId)) {
    await recordMarketplaceEvent(env, { eventId: crypto.randomUUID(), sessionId: analyticsSessionId, eventType: "seller_submit_start", category, page }).catch((error) => console.error(JSON.stringify({ event: "marketplace_submit_start_analytics_error", reference, message: error instanceof Error ? error.message : String(error) })));
  }
  sendMarketplaceEmail(env, {
    notificationType: "admin_marketplace_submission_attempt",
    subject: `Marketplace Submit Attempt — ${category ? category.toUpperCase() : "UNKNOWN"} — ${reference}`,
    text: ["Elevation UpScales Marketplace submit attempt", "", `Request: ${reference}`, `Client request: ${clientRequestId}`, `Category: ${category || "unknown"}`, `Route: ${page}`, `Photo count: ${submittedPhotoCount}`, `Retry count: ${retryCount}`, `Build: ${requestBuild}`, `Time: ${submitStartedAt}`, "", "This is an ATTEMPT alert, not proof of successful storage."].join("\n"),
  }).catch((error) => console.error(JSON.stringify({ event: "marketplace_submission_attempt_email_error", reference, message: error instanceof Error ? error.message : String(error) })));

  const qaTest = qaToken ? await verifyMarketplaceQaToken(qaToken, env) : false;
  if (qaToken && !qaTest) {
    await recordMarketplaceSubmissionIssue(env, { ...context, stage: "validation", code: "qa_token_invalid_or_expired", httpStatus: 400, backendStatus: "blocked", uploadStatus: "not_started", r2Status: "not_started", d1Status: "not_started" });
    return jsonResponse({ error: "This Admin QA session expired. Open a new TEST form from Marketplace Operations.", code: "qa_token_invalid_or_expired", reference }, 400);
  }

  const bicycle = category === "bicycle"; const gear = category === "gear"; const flexibleYear = bicycle || gear;
  const yearValid = flexibleYear ? (!Number.isFinite(year) || (year >= 1900 && year <= new Date().getFullYear()+1)) : (Number.isFinite(year) && year >= 1900 && year <= new Date().getFullYear()+1);
  const makeValid = gear ? true : Boolean(make); const titleStatusValid = bicycle || gear ? true : Boolean(titleStatus);
  if (!category || !sellerName || !isValidEmail(sellerEmail) || !isValidPhone(sellerPhone) || !locationValid || !location || !yearValid || !makeValid || !model || !price || !titleStatusValid || !itemType || !highlights || !conditionDisclosure || consent !== "yes") {
    await recordMarketplaceSubmissionIssue(env, { ...context, stage: "validation", code: "required_fields_invalid", httpStatus: 400, backendStatus: "rejected", uploadStatus: "not_started", r2Status: "not_started", d1Status: "not_started" });
    if (validAnalyticsSessionId(analyticsSessionId)) await recordMarketplaceEvent(env,{eventId:crypto.randomUUID(),sessionId:analyticsSessionId,eventType:"seller_submission_failed",category,page}).catch(()=>{});
    return jsonResponse({ error: "Please complete all required listing and contact fields", code: "required_fields_invalid", reference }, 400);
  }

  const photos=[];
  for (const slot of marketplacePhotoSlots(category)) {
    const file=form.get(slot); if(!(file instanceof File)||!file.size) continue;
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"image_validation",code:"unsupported_image_type",httpStatus:400,backendStatus:"rejected",uploadStatus:"failed",r2Status:"not_started",d1Status:"not_started"}); return jsonResponse({error:"Photos must be JPEG, PNG, or WebP",code:"unsupported_image_type",reference},400); }
    if(file.size>MARKETPLACE_MAX_IMAGE_BYTES) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"image_validation",code:"image_too_large",httpStatus:413,backendStatus:"rejected",uploadStatus:"failed",r2Status:"not_started",d1Status:"not_started"}); return jsonResponse({error:"Each photo must be smaller than 10 MB",code:"image_too_large",reference},413); }
    if(!(await validMarketplaceImageSignature(file))) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"image_validation",code:"invalid_image_signature",httpStatus:400,backendStatus:"rejected",uploadStatus:"failed",r2Status:"not_started",d1Status:"not_started"}); return jsonResponse({error:"One or more files are not valid listing photos",code:"invalid_image_signature",reference},400); }
    photos.push({slot,file});
  }
  if(photos.length<marketplaceMinimumPhotos(category)) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"validation",code:"insufficient_photos",httpStatus:400,backendStatus:"rejected",uploadStatus:"failed",r2Status:"not_started",d1Status:"not_started"}); if(validAnalyticsSessionId(analyticsSessionId)) await recordMarketplaceEvent(env,{eventId:crypto.randomUUID(),sessionId:analyticsSessionId,eventType:"seller_submission_failed",category,page}).catch(()=>{}); return jsonResponse({error:category==="bicycle"||category==="gear"?"Please add at least two listing photos":"All four listing photos are required",code:"insufficient_photos",reference},400); }

  if(gear) {
    const schema=await env.MARKETPLACE_DB.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='marketplace_listings'").first(); const schemaSql=String(schema?.sql||"");
    if(/CHECK\s*\(\s*category\s+IN/i.test(schemaSql)&&!/[\'\"]gear[\'\"]/i.test(schemaSql)) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"schema",code:"category_schema_upgrade_required",httpStatus:503,backendStatus:"blocked",uploadStatus:"not_started",r2Status:"not_started",d1Status:"blocked"}); return jsonResponse({error:"Used Gear is temporarily unavailable until the administrator completes the marketplace schema upgrade.",code:"category_schema_upgrade_required",reference},503); }
  }

  const storedYear=Number.isFinite(year)?year:null; const id=crypto.randomUUID(); const createdAt=submitStartedAt; const categoryFields=marketplaceCategoryFields(category,form); if(qaTest) categoryFields.qaTest=true; const photoKeys=[]; let submissionStorageStage="image_storage";
  try {
    for(let index=0;index<photos.length;index+=1){const {slot,file}=photos[index]; const prepared=await prepareMarketplaceImage(file,env); const key=`marketplace/${id}/${index+1}-${slot}.${prepared.extension}`; await env.LISTING_IMAGES.put(key,prepared.body,{httpMetadata:{contentType:prepared.contentType,cacheControl:"public, max-age=31536000, immutable"},customMetadata:{listingId:id,slot,normalized:prepared.normalized?"true":"false"}}); photoKeys.push(key);}
    submissionStorageStage="database_save";
    await env.MARKETPLACE_DB.prepare(`INSERT INTO marketplace_listings (
      id, reference, category, status, seller_name, seller_email, seller_phone, location,
      year, make, model, price, mileage, title_status, item_type, category_fields_json,
      highlights, condition_disclosure, photo_keys_json, featured_photo, created_at, updated_at, notification_status
    ) VALUES (?, ?, ?, 'pending_review', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, 'pending')`).bind(id,reference,category,sellerName,sellerEmail,sellerPhone,location,storedYear,make,model,price,mileage,titleStatus,itemType,JSON.stringify(categoryFields),highlights,conditionDisclosure,JSON.stringify(photoKeys),createdAt,createdAt).run();
  } catch(error) {
    await Promise.all(photoKeys.map((key)=>env.LISTING_IMAGES.delete(key).catch(()=>{})));
    const issueCode=submissionStorageStage==="database_save"?"database_save_failed":"image_storage_failed";
    await recordMarketplaceSubmissionIssue(env,{...context,stage:submissionStorageStage,code:issueCode,httpStatus:500,backendStatus:"failed",uploadStatus:submissionStorageStage==="database_save"?"completed":"failed",r2Status:submissionStorageStage==="database_save"?"ok":"failed",d1Status:submissionStorageStage==="database_save"?"failed":"not_started"});
    if(validAnalyticsSessionId(analyticsSessionId)) await recordMarketplaceEvent(env,{eventId:crypto.randomUUID(),sessionId:analyticsSessionId,eventType:"seller_submission_failed",category,page}).catch(()=>{});
    console.error(JSON.stringify({event:"marketplace_submission_storage_error",reference,stage:submissionStorageStage,code:issueCode,clientRequestId,retryCount,build:requestBuild,message:error instanceof Error?error.message:String(error)}));
    return jsonResponse({error:"The listing could not be saved. Please try again.",code:issueCode,reference},500);
  }

  const record={id,reference,category,sellerName,sellerEmail,sellerPhone,location,year:storedYear,make,model,price,mileage,titleStatus,itemType,highlights,conditionDisclosure,createdAt};
  if(validAnalyticsSessionId(analyticsSessionId)) await recordMarketplaceEvent(env,{eventId:crypto.randomUUID(),sessionId:analyticsSessionId,eventType:"seller_submission",listingId:id,category,page}).catch((error)=>console.error(JSON.stringify({event:"marketplace_submission_analytics_error",reference,message:error instanceof Error?error.message:String(error)})));
  let emailDelivered=false;
  try { await sendMarketplaceEmail(env,{notificationType:"admin_new_marketplace_submission",subject:`Marketplace Submission SUCCESS — ${reference} — ${category.toUpperCase()}${qaTest?" — TEST DO NOT PUBLISH":""}`,text:marketplaceSubmissionText(record),replyTo:sellerEmail}); emailDelivered=true; await env.MARKETPLACE_DB.prepare("UPDATE marketplace_listings SET notification_status='sent', updated_at=? WHERE id=?").bind(new Date().toISOString(),id).run(); }
  catch(error){console.error(JSON.stringify({event:"marketplace_submission_email_error",reference,message:error instanceof Error?error.message:String(error)})); await env.MARKETPLACE_DB.prepare("UPDATE marketplace_listings SET notification_status='failed', updated_at=? WHERE id=?").bind(new Date().toISOString(),id).run();}
  return jsonResponse({ok:true,id,reference,status:"pending_review",emailDelivered,qaTest,build:OPERATIONS_BUILD},201);
}

function marketplacePublicRecord(row) {
  const categoryFields = JSON.parse(row.category_fields_json || "{}");
  const photoKeys = JSON.parse(row.photo_keys_json || "[]");
  return {
    id: row.id,
    reference: row.reference,
    category: row.category,
    status: row.status,
    location: row.location,
    year: row.year,
    make: row.make,
    model: row.model,
    price: row.price,
    mileage: row.mileage || "",
    titleStatus: row.title_status || "",
    itemType: row.item_type || "",
    categoryFields,
    highlights: row.highlights,
    conditionDisclosure: row.condition_disclosure,
    images: photoKeys.map((_, index) => `${MARKETPLACE_IMAGE_PREFIX}${encodeURIComponent(row.id)}/${index}?v=${encodeURIComponent(row.updated_at || row.created_at || "1")}`),
    featuredPhoto: Number(row.featured_photo) || 0,
    publishedAt: row.published_at,
    soldAt: row.sold_at,
    views: Math.max(0, Number(row.view_count ?? row.views ?? 0) || 0),
  };
}

async function handleMarketplacePublicListings(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  if (!env.MARKETPLACE_DB) return jsonResponse({ listings: [], count: 0, storageConfigured: false });
  const url = new URL(request.url);
  const requestedId = cleanString(url.searchParams.get("id") || "", 80);
  if (requestedId) {
    const row = await getMarketplaceRowWithViews(env, requestedId);
    if (!row || !["published", "sold"].includes(row.status)) return jsonResponse({ error: "Listing not found" }, 404, { "Cache-Control": "no-store" });
    const response = jsonResponse({ listing: marketplacePublicRecord(row), storageConfigured: true }, 200, { "Cache-Control": "no-store" });
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }
  let rows = [];
  try {
    const result = await env.MARKETPLACE_DB.prepare(`SELECT l.*, COALESCE(v.view_count, 0) AS view_count
      FROM marketplace_listings l
      LEFT JOIN (
        SELECT listing_id, COUNT(DISTINCT session_hash) AS view_count
        FROM marketplace_events
        WHERE event_type='listing_open' AND listing_id IS NOT NULL AND listing_id<>''
        GROUP BY listing_id
      ) v ON v.listing_id=l.id
      WHERE l.status IN ('published','sold')
      ORDER BY CASE l.status WHEN 'published' THEN 0 ELSE 1 END, l.published_at DESC, l.created_at DESC`).all();
    rows = result.results || [];
  } catch (error) {
    console.error(JSON.stringify({ event: "marketplace_view_count_public_fallback", message: error instanceof Error ? error.message : String(error) }));
    const result = await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_listings WHERE status IN ('published','sold') ORDER BY CASE status WHEN 'published' THEN 0 ELSE 1 END, published_at DESC, created_at DESC").all();
    rows = (result.results || []).map((row) => ({ ...row, view_count: 0 }));
  }
  const listings = rows.map(marketplacePublicRecord);
  const response = jsonResponse({ listings, count: listings.length, storageConfigured: true }, 200, { "Cache-Control": "public, max-age=10, s-maxage=10" });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function getMarketplaceRow(env, id) {
  if (!env.MARKETPLACE_DB) return null;
  return env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_listings WHERE id=?").bind(id).first();
}

async function getMarketplaceRowWithViews(env, id) {
  if (!env.MARKETPLACE_DB) return null;
  try {
    return await env.MARKETPLACE_DB.prepare(`SELECT l.*, COALESCE(v.view_count, 0) AS view_count
      FROM marketplace_listings l
      LEFT JOIN (
        SELECT listing_id, COUNT(DISTINCT session_hash) AS view_count
        FROM marketplace_events
        WHERE event_type='listing_open' AND listing_id IS NOT NULL AND listing_id<>''
        GROUP BY listing_id
      ) v ON v.listing_id=l.id
      WHERE l.id=?`).bind(id).first();
  } catch (error) {
    console.error(JSON.stringify({ event: "marketplace_view_count_listing_fallback", listingId: id, message: error instanceof Error ? error.message : String(error) }));
    const row = await getMarketplaceRow(env, id);
    return row ? { ...row, view_count: 0 } : null;
  }
}

function sanitizeSiteEventDetails(raw = {}) {
  const allowedStrings = new Set(["package", "classification", "projectType", "intakeIntent", "serviceArea", "source", "status", "journeyReference", "contactMethod", "visitorMarket", "cta_id", "source_page", "contact_method", "build", "buildReference", "builderStage", "builderStep", "milestone"]);
  const allowedNumbers = new Set(["arrayWatts", "batteryKwh", "inverterWatts", "dailySolarKwh", "estimatedUsageKwh"]);
  const output = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return output;
  for (const [key, value] of Object.entries(raw)) {
    if (allowedStrings.has(key)) output[key] = cleanString(value, 120);
    else if (allowedNumbers.has(key)) {
      const n = Number(value);
      if (Number.isFinite(n)) output[key] = Math.round(n * 100) / 100;
    }
  }
  return output;
}

async function recordSiteEvent(env, payload, { serverConfirmed = false, request = null } = {}) {
  if (!env.MARKETPLACE_DB || typeof env.MARKETPLACE_DB.prepare !== "function") return { stored: false, reason: "database_unavailable" };
  const eventType = cleanString(payload?.eventType, 60);
  if (!SITE_INTENT_EVENT_TYPES.has(eventType)) return { stored: false, reason: "invalid_event" };
  if (SITE_INTENT_SERVER_ONLY_EVENT_TYPES.has(eventType) && !serverConfirmed) return { stored: false, reason: "server_only" };
  const sessionHash = await analyticsSessionHash(payload?.sessionId, env);
  if (!sessionHash) return { stored: false, reason: "invalid_session" };
  const eventValue = cleanString(payload?.eventValue, 120).toLowerCase().replace(/[^a-z0-9 _./-]/g, "");
  const page = analyticsPath(payload?.page || "/");
  const visitorMarket = visitorMarketBucket(request);
  const details = { ...sanitizeSiteEventDetails(payload?.details), visitorMarket };
  const createdAt = new Date().toISOString();
  const confirmedReference = cleanString(payload?.reference, 80);
  const confirmedPrefix = eventType === "opportunity_submitted" ? "opportunity" : (/^EUS-(HOME|RV|SOLAR)-/.test(confirmedReference) ? "project-lead" : "solar-lead");
  const solarFunnelConfirmed = serverConfirmed && confirmedReference && /^solar_(contact_captured|lead_created|build_started|review_opened|completed_submitted)$/.test(eventType);
  const id = serverConfirmed && confirmedReference
    ? (solarFunnelConfirmed ? `${confirmedPrefix}:${confirmedReference}:${eventType}` : `${confirmedPrefix}:${confirmedReference}`)
    : (validAnalyticsSessionId(payload?.eventId) ? cleanString(payload.eventId, 100) : crypto.randomUUID());
  try {
    await env.MARKETPLACE_DB.prepare(`INSERT INTO eus_site_events (id, session_hash, event_type, event_value, page, details_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, sessionHash, eventType, eventValue || null, page, JSON.stringify(details), createdAt).run();
    recordSiteAnalyticsPoint(env, { sessionHash, eventType, eventValue, page, reference: confirmedReference, source: cleanString(details.source, 80), visitorMarket }, request);
    return { stored: true, id, eventType, eventValue, visitorMarket, createdAt };
  } catch (error) {
    const message = String(error?.message || error || "");
    if (/UNIQUE|PRIMARY KEY/i.test(message)) return { stored: false, duplicate: true, id, eventType };
    if (/no such table/i.test(message)) return { stored: false, reason: "migration_required" };
    throw error;
  }
}

async function handleSiteEvent(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  if (!env.MARKETPLACE_DB) return jsonResponse({ error: "Intent storage is unavailable" }, 503);
  const allowance = await durableRateLimit(env.MARKETPLACE_DB, request, env, "site-intent-hour", MARKETPLACE_ANALYTICS_HOURLY_LIMIT, 60 * 60);
  if (!allowance.allowed) return jsonResponse({ error: "Intent tracking rate limit reached" }, 429, { "Retry-After": String(allowance.retryAfter || 60) });
  const parsed = await readLimitedJson(request, SITE_INTENT_MAX_BYTES);
  if (parsed.error === "too_large") return jsonResponse({ error: "Intent event is too large" }, 413);
  if (parsed.error) return jsonResponse({ error: "Invalid intent event" }, 400);
  const body = parsed.value || {};
  const eventType = cleanString(body.eventType, 60);
  if (!SITE_INTENT_CLIENT_EVENT_TYPES.has(eventType)) return jsonResponse({ error: "Invalid intent event" }, 400);
  const value = cleanString(body.eventValue, 120).toLowerCase();
  if (eventType === "project_state_selected" && !["colorado", "idaho", "another_state"].includes(value)) return jsonResponse({ error: "Invalid project state selection" }, 400);
  if (eventType === "intake_intent_selected" && !["emergency_repair", "small_repair_handyman", "restoration_remodel_larger_project", "rv", "solar_off_grid"].includes(value)) return jsonResponse({ error: "Invalid intake intent" }, 400);
  if (eventType === "emergency_call_clicked" && !["unselected", "home", "rv"].includes(value)) return jsonResponse({ error: "Invalid emergency call context" }, 400);
  if (eventType === "project_type_selected" && !["home", "rv", "solar"].includes(value)) return jsonResponse({ error: "Invalid project type" }, 400);
  if (eventType === "package_selected" && !["standard", "gold", "platinum", "custom"].includes(value)) return jsonResponse({ error: "Invalid Solar package" }, 400);
  if (eventType === "contact_click" && !["call", "text", "email", "follow_up_request"].includes(value)) return jsonResponse({ error: "Invalid contact method" }, 400);
  if (eventType === "service_area_classified" && !["treasure_valley","southern_colorado","denver_metro","outside_standard_area","manual_review"].includes(value)) return jsonResponse({ error: "Invalid service area" }, 400);
  if (eventType === "out_of_area_path_selected" && !["project_review","work_with_us"].includes(value)) return jsonResponse({ error: "Invalid out-of-area path" }, 400);
  if (eventType === "opportunity_type_selected" && !["affiliate","marketing","technician","investment"].includes(value)) return jsonResponse({ error: "Invalid opportunity type" }, 400);
  const row = await recordSiteEvent(env, body, { request });
  return jsonResponse({ ok: true, stored: Boolean(row.stored), migrationRequired: row.reason === "migration_required" }, 202);
}

function validAnalyticsSessionId(value) {
  return /^[A-Za-z0-9_-]{16,100}$/.test(String(value || ""));
}

async function analyticsSessionHash(value, env) {
  const session = cleanString(value, 100);
  if (!validAnalyticsSessionId(session)) return "";
  const secret = cleanString(env.ANALYTICS_HASH_SECRET || env.SECURITY_HASH_SECRET || env.ADMIN_SESSION_SECRET, 500);
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`analytics:${session}`));
  return bytesToBase64Url(new Uint8Array(digest)).slice(0, 43);
}

function analyticsPath(value) {
  const path = cleanString(value, 180);
  if (!path.startsWith("/") || path.startsWith("/api/") || path.startsWith("/admin")) return "/marketplace";
  return path;
}

function analyticsHost(value) {
  const host = cleanString(value, 160).toLowerCase();
  return /^[a-z0-9.-]+$/.test(host) ? host : "";
}

function analyticsCampaign(value) {
  return cleanString(value, 120).replace(/[^A-Za-z0-9 _.-]/g, "");
}

function visitorMarketBucket(request) {
  const cf = request?.cf || {};
  const city = cleanString(cf.city, 120).toLowerCase();
  const region = cleanString(cf.regionCode || cf.region, 40).toUpperCase();
  if (!city && !region) return "unknown";
  const treasureValley = new Set(["boise", "meridian", "nampa", "caldwell", "eagle", "kuna", "star", "garden city", "middleton"]);
  const southernColorado = new Set(["colorado springs", "peyton", "falcon", "fountain", "monument", "manitou springs", "security-widefield"]);
  const denverMetro = new Set(["denver", "aurora", "lakewood", "arvada", "westminster", "centennial", "englewood", "littleton", "thornton", "broomfield", "commerce city", "wheat ridge", "golden"]);
  if (region === "ID" && treasureValley.has(city)) return "treasure_valley";
  if (region === "CO" && southernColorado.has(city)) return "southern_colorado";
  if (region === "CO" && denverMetro.has(city)) return "denver_metro";
  return "outside_service_area";
}

function recordSiteAnalyticsPoint(env, event, request) {
  const binding = env.SITE_ANALYTICS;
  if (!binding || typeof binding.writeDataPoint !== "function" || !event) return false;
  const canonicalType = SITE_ANALYTICS_EVENT_ALIASES[event.eventType] || event.eventType;
  if (!SITE_ANALYTICS_APPROVED_EVENTS.has(canonicalType)) return false;
  const market = cleanString(event.visitorMarket || visitorMarketBucket(request), 60) || "unknown";
  try {
    binding.writeDataPoint({
      indexes: [event.sessionHash || "anonymous-session"],
      blobs: [
        canonicalType,
        analyticsPath(event.page || "/"),
        market,
        cleanString(event.eventValue, 120),
        cleanString(event.listingId, 80),
        normalizeMarketplaceCategory(event.category),
        cleanString(event.reference, 80),
        cleanString(event.source, 80),
        OPERATIONS_BUILD,
      ],
      doubles: [1],
    });
    return true;
  } catch (error) {
    console.error(JSON.stringify({ event: "site_analytics_engine_write_error", type: canonicalType, message: error instanceof Error ? error.message : String(error) }));
    return false;
  }
}

function recordMarketplaceAnalyticsPoint(env, event) {
  if (!env.ANALYTICS || typeof env.ANALYTICS.writeDataPoint !== "function" || !event) return false;
  try {
    env.ANALYTICS.writeDataPoint({
      indexes: [event.sessionHash],
      blobs: [
        event.eventType || "",
        event.listingId || "",
        event.category || "",
        event.page || "/marketplace",
        event.referrerHost || "",
        event.utmSource || "",
        event.utmCampaign || "",
        OPERATIONS_BUILD,
      ],
      doubles: [1],
    });
    return true;
  } catch (error) {
    console.error(JSON.stringify({ event: "analytics_engine_write_error", type: event.eventType || "unknown", message: error instanceof Error ? error.message : String(error) }));
    return false;
  }
}

async function recordMarketplaceEvent(env, payload) {
  if (!env.MARKETPLACE_DB) return { stored: false, reason: "database_unavailable" };
  const sessionHash = await analyticsSessionHash(payload.sessionId, env);
  if (!sessionHash) return { stored: false, reason: "invalid_session" };
  const eventType = cleanString(payload.eventType, 60);
  if (!MARKETPLACE_ANALYTICS_EVENT_TYPES.has(eventType)) return { stored: false, reason: "invalid_event" };
  const id = validAnalyticsSessionId(payload.eventId) ? cleanString(payload.eventId, 100) : crypto.randomUUID();
  const listingId = cleanString(payload.listingId, 80);
  const category = normalizeMarketplaceCategory(payload.category);
  const page = analyticsPath(payload.page || "/marketplace");
  const referrerHost = analyticsHost(payload.referrerHost);
  const utmSource = analyticsCampaign(payload.utmSource);
  const utmCampaign = analyticsCampaign(payload.utmCampaign);
  const createdAt = new Date().toISOString();
  try {
    await env.MARKETPLACE_DB.prepare(`INSERT INTO marketplace_events (
      id, session_hash, event_type, listing_id, category, page, referrer_host, utm_source, utm_campaign, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(
      id, sessionHash, eventType, listingId || null, category || null, page,
      referrerHost || null, utmSource || null, utmCampaign || null, createdAt,
    ).run();
    const analyticsEngineStored = recordMarketplaceAnalyticsPoint(env, {
      sessionHash, eventType, listingId, category, page, referrerHost, utmSource, utmCampaign,
    });
    return { stored: true, analyticsEngineStored, id, eventType, sessionHash, createdAt };
  } catch (error) {
    const message = String(error?.message || error || "");
    if (/UNIQUE|PRIMARY KEY/i.test(message)) return { stored: false, duplicate: true, id, eventType, sessionHash };
    throw error;
  }
}

async function notifyMarketplaceBuyerIntent(env, eventRow, listing) {
  if (!eventRow?.stored || !listing || !["contact_call", "contact_text"].includes(eventRow.eventType)) return;
  const revealCutoff = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  const reveal = await env.MARKETPLACE_DB.prepare(`SELECT id FROM marketplace_events
    WHERE session_hash=? AND listing_id=? AND event_type='contact_reveal' AND created_at>=?
    LIMIT 1`).bind(eventRow.sessionHash, listing.id, revealCutoff).first();
  if (!reveal) {
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_events SET notification_status='unverified' WHERE id=?").bind(eventRow.id).run();
    return;
  }
  const cutoff = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
  const prior = await env.MARKETPLACE_DB.prepare(`SELECT id FROM marketplace_events
    WHERE session_hash=? AND listing_id=? AND event_type=? AND notification_status='sent' AND created_at>=? AND id<>?
    LIMIT 1`).bind(eventRow.sessionHash, listing.id, eventRow.eventType, cutoff, eventRow.id).first();
  if (prior) {
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_events SET notification_status='deduped' WHERE id=?").bind(eventRow.id).run();
    return;
  }
  const action = eventRow.eventType === "contact_call" ? "Call Seller clicked" : "Text Seller clicked";
  const title = marketplaceListingTitle(listing.category, listing.year, listing.make, listing.model);
  const text = [
    "Elevation UpScales Marketplace buyer-interest alert",
    "",
    `Action: ${action}`,
    `Listing: ${title}`,
    `Reference: ${listing.reference || listing.id}`,
    `Category: ${listing.category}`,
    `Location: ${listing.location || "Not provided"}`,
    `Time: ${eventRow.createdAt}`,
    "",
    "This alert records a customer action on the public Marketplace. It does not confirm that a call, text, or sale was completed.",
  ].join("\n");
  try {
    const result = await sendMarketplaceEmail(env, { notificationType: "admin_marketplace_buyer_interest", subject: `Marketplace buyer interest — ${action} — ${title}`, text });
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_events SET notification_status='sent', notification_message_id=? WHERE id=?")
      .bind(result.messageId || "", eventRow.id).run();
  } catch (error) {
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_events SET notification_status='failed' WHERE id=?").bind(eventRow.id).run().catch(() => {});
    console.error(JSON.stringify({ event: "marketplace_buyer_intent_email_error", listingId: listing.id, action: eventRow.eventType, message: error instanceof Error ? error.message : String(error) }));
  }
}

async function readLimitedJson(request, maxBytes) {
  const rawLength = request.headers.get("Content-Length");
  if (rawLength && Number(rawLength) > maxBytes) return { error: "too_large" };
  if (!request.body) return { error: "invalid" };
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = value instanceof Uint8Array ? value : new Uint8Array(value);
      total += chunk.byteLength;
      if (total > maxBytes) {
        await reader.cancel("analytics body limit exceeded").catch(() => {});
        return { error: "too_large" };
      }
      chunks.push(chunk);
    }
  } finally {
    try { reader.releaseLock(); } catch (_) {}
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return { value: JSON.parse(new TextDecoder().decode(bytes)) }; }
  catch (_) { return { error: "invalid" }; }
}

async function handleMarketplaceEvent(request, env, ctx) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  if (!env.MARKETPLACE_DB) return jsonResponse({ error: "Analytics storage is unavailable" }, 503);
  const length = Number(request.headers.get("Content-Length") || 0);
  if (length > MARKETPLACE_ANALYTICS_MAX_BYTES) return jsonResponse({ error: "Analytics event is too large" }, 413);
  const allowance = await durableRateLimit(env.MARKETPLACE_DB, request, env, "marketplace-analytics-hour", MARKETPLACE_ANALYTICS_HOURLY_LIMIT, 60 * 60);
  if (!allowance.allowed) return jsonResponse({ error: "Analytics rate limit reached" }, 429, { "Retry-After": String(allowance.retryAfter || 60) });
  const parsed = await readLimitedJson(request, MARKETPLACE_ANALYTICS_MAX_BYTES);
  if (parsed.error === "too_large") return jsonResponse({ error: "Analytics event is too large" }, 413);
  if (parsed.error) return jsonResponse({ error: "Invalid analytics event" }, 400);
  const body = parsed.value || {};
  const requestedType = cleanString(body.eventType, 60);
  if (["contact_reveal", "seller_submission"].includes(requestedType)) return jsonResponse({ error: "Server-only analytics event" }, 400);
  const listingBoundTypes = new Set(["favorite_add", "favorite_remove", "share_listing", "listing_open", "contact_call", "contact_text"]);
  if (listingBoundTypes.has(requestedType)) {
    const listingId = cleanString(body.listingId, 80);
    if (!listingId) return jsonResponse({ error: "Listing is required for this event" }, 400);
    const listing = await getMarketplaceRow(env, listingId);
    const allowedStatus = ["contact_call", "contact_text"].includes(requestedType) ? listing?.status === "published" : ["published", "sold"].includes(listing?.status);
    if (!listing || !allowedStatus) return jsonResponse({ error: "Listing is unavailable" }, 404);
    body.category = listing.category;
  }
  const eventRow = await recordMarketplaceEvent(env, body);
  if (!eventRow.stored) return jsonResponse({ ok: true, stored: false, duplicate: Boolean(eventRow.duplicate) }, 202);
  if (["contact_call", "contact_text"].includes(eventRow.eventType) && body.listingId) {
    const listing = await getMarketplaceRow(env, cleanString(body.listingId, 80));
    if (listing && listing.status === "published") ctx?.waitUntil?.(notifyMarketplaceBuyerIntent(env, eventRow, listing));
  }
  return jsonResponse({ ok: true, stored: true }, 202);
}

async function handleHealth(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  let marketplaceDb = "unconfigured";
  if (env.MARKETPLACE_DB) {
    try {
      await env.MARKETPLACE_DB.prepare("SELECT 1 AS ok").first();
      marketplaceDb = "ok";
    } catch (_) {
      marketplaceDb = "error";
    }
  }
  const marketplaceEmailConfigured = Boolean(
    isValidEmail(cleanString(env.MARKETPLACE_EMAIL_TO || DEFAULT_MARKETPLACE_EMAIL_TO, 180)) &&
    isValidEmail(cleanString(env.MARKETPLACE_EMAIL_FROM || env.SOLAR_EMAIL_FROM, 180)) &&
    ((env.EMAIL && typeof env.EMAIL.send === "function") || (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_EMAIL_API_TOKEN))
  );
  const solarEmailConfigured = Boolean(
    isValidEmail(cleanString(env.SOLAR_EMAIL_TO || DEFAULT_SOLAR_EMAIL_TO, 180)) &&
    isValidEmail(cleanString(env.SOLAR_EMAIL_FROM, 180)) &&
    ((env.EMAIL && typeof env.EMAIL.send === "function") || (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_EMAIL_API_TOKEN))
  );
  let leadsDb = "unconfigured";
  if (env.LEADS_DB) {
    try {
      await env.LEADS_DB.prepare("SELECT 1 AS ok").first();
      leadsDb = "ok";
    } catch (_) {
      leadsDb = "error";
    }
  }
  let siteAnalyticsD1 = "unconfigured";
  if (env.MARKETPLACE_DB) {
    try {
      await env.MARKETPLACE_DB.prepare("SELECT 1 AS ok FROM eus_site_events LIMIT 1").first();
      siteAnalyticsD1 = "ok";
    } catch (_) {
      siteAnalyticsD1 = "error";
    }
  }
  const siteAnalyticsEngine = env.SITE_ANALYTICS && typeof env.SITE_ANALYTICS.writeDataPoint === "function" ? "configured" : "disabled_deferred";
  const legacyAnalyticsEngine = env.ANALYTICS && typeof env.ANALYTICS.writeDataPoint === "function" ? "configured" : "unconfigured";
  const healthy = marketplaceDb === "ok" && leadsDb === "ok" && siteAnalyticsD1 === "ok" && Boolean(env.ASSETS) && Boolean(env.LISTING_IMAGES) && marketplaceEmailConfigured && solarEmailConfigured;
  const payload = {
    status: healthy ? "ok" : "degraded",
    build: OPERATIONS_BUILD,
    checkedAt: new Date().toISOString(),
    services: {
      siteAssets: env.ASSETS ? "configured" : "unconfigured",
      marketplaceDatabase: marketplaceDb,
      leadsDatabase: leadsDb,
      marketplaceImages: env.LISTING_IMAGES ? "configured" : "unconfigured",
      siteAnalyticsD1,
      siteAnalyticsEngine,
      legacyAnalyticsEngine,
      marketplaceNotifications: marketplaceEmailConfigured ? "configured" : "unconfigured",
      solarNotifications: solarEmailConfigured ? "configured" : "unconfigured",
    },
    note: "D1 eus_site_events is the active first-party analytics store. Analytics Engine is intentionally deferred; notification status confirms configuration only, not inbox delivery.",
  };
  const response = jsonResponse(payload, healthy ? 200 : 503, {
    "X-EUS-Operations-Build": OPERATIONS_BUILD,
    "X-EUS-Monitoring": "health",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleMarketplaceImage(request, env, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  const parts = pathname.slice(MARKETPLACE_IMAGE_PREFIX.length).split("/");
  const id = cleanString(decodeURIComponent(parts[0] || ""), 80);
  const index = Number.parseInt(parts[1] || "0", 10);
  if (!id || !Number.isInteger(index) || index < 0 || index > 20 || !env.LISTING_IMAGES) return new Response("Not found", { status: 404 });
  const row = await getMarketplaceRow(env, id);
  if (!row) return new Response("Not found", { status: 404 });
  if (!["published", "sold"].includes(row.status)) {
    const auth = await requireAdmin(request, env);
    if (auth.response) return auth.response;
  }
  const keys = JSON.parse(row.photo_keys_json || "[]");
  const key = keys[index];
  if (!key) return new Response("Not found", { status: 404 });
  const object = await env.LISTING_IMAGES.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("Cache-Control", ["published", "sold"].includes(row.status) ? "public, max-age=86400" : "private, no-store");
  return request.method === "HEAD" ? new Response(null, { headers }) : new Response(object.body, { headers });
}

async function marketplaceContactAllowed(request, env) {
  const clientKey = await securityClientKey(request, env, "marketplace-contact-burst");
  const cache = caches.default;
  const key = new Request(`https://rate-limit.invalid/marketplace-contact/${clientKey}`, { method: "GET" });
  if (await cache.match(key)) return { allowed: false, retryAfter: MARKETPLACE_CONTACT_THROTTLE_SECONDS };
  await cache.put(key, new Response("1", { headers: { "Cache-Control": `max-age=${MARKETPLACE_CONTACT_THROTTLE_SECONDS}` } }));
  const hourly = await durableRateLimit(env.MARKETPLACE_DB, request, env, "marketplace-contact-hour", MARKETPLACE_CONTACT_HOURLY_LIMIT, 60 * 60);
  if (!hourly.allowed) return hourly;
  return durableRateLimit(env.MARKETPLACE_DB, request, env, "marketplace-contact-day", MARKETPLACE_CONTACT_DAILY_LIMIT, 24 * 60 * 60);
}

async function handleMarketplaceContact(request, env, pathname) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const intent = cleanString(request.headers.get("X-EUS-Contact-Intent"), 40);
  if (intent !== "reveal") return jsonResponse({ error: "Contact reveal intent is required" }, 400);
  if (!env.MARKETPLACE_DB) return jsonResponse({ error: "Contact information is unavailable" }, 503);
  const allowance = await marketplaceContactAllowed(request, env);
  if (!allowance.allowed) {
    return jsonResponse({ error: "Seller contact reveal limit reached. Please try again later." }, 429, { "Retry-After": String(allowance.retryAfter || MARKETPLACE_CONTACT_THROTTLE_SECONDS) });
  }
  const id = cleanString(decodeURIComponent(pathname.slice(MARKETPLACE_CONTACT_PREFIX.length)), 80);
  const row = await getMarketplaceRow(env, id);
  if (!row || row.status !== "published") return jsonResponse({ error: "Contact information is unavailable" }, 404);
  const sessionId = cleanString(request.headers.get("X-EUS-Session"), 100);
  if (validAnalyticsSessionId(sessionId)) {
    const sessionHash = await analyticsSessionHash(sessionId, env);
    let priorInterest = null;
    if (sessionHash) {
      priorInterest = await env.MARKETPLACE_DB.prepare(`SELECT id FROM marketplace_events
        WHERE session_hash=? AND listing_id=? AND event_type='contact_reveal' LIMIT 1`).bind(sessionHash, id).first().catch(() => null);
    }
    await recordMarketplaceEvent(env, { eventId: crypto.randomUUID(), sessionId, eventType: "contact_reveal", listingId: id, category: row.category, page: `/marketplace/listing/${id}` }).catch((error) => {
      console.error(JSON.stringify({ event: "marketplace_contact_analytics_error", listingId: id, message: error instanceof Error ? error.message : String(error) }));
    });
    if (sessionHash && !priorInterest) {
      recordSiteAnalyticsPoint(env, { sessionHash, eventType: "listing_interest", eventValue: row.category, listingId: id, category: row.category, page: `/marketplace/listing/${id}`, reference: row.reference || id, source: "marketplace_show_contact" }, request);
    }
  }
  return jsonResponse({ name: row.seller_name.split(/\s+/)[0] || "Seller", phone: row.seller_phone }, 200, { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" });
}

function marketplaceSharePage(request, row) {
  const origin = PUBLIC_ORIGIN;
  const id = String(row.id || "");
  const title = marketplaceListingTitle(row.category, row.year, row.make, row.model) || "Elevation UpScales Marketplace Listing";
  const listingLocation = cleanString(row.location, 180);
  const price = cleanString(row.price, 120);
  const highlights = cleanString(row.highlights, 1200);
  const condition = cleanString(row.condition_disclosure, 1800);
  const description = [price, listingLocation, highlights].filter(Boolean).join(" · ").slice(0, 300);
  const keys = JSON.parse(row.photo_keys_json || "[]");
  const featured = Math.min(Math.max(Number(row.featured_photo) || 0, 0), Math.max(keys.length - 1, 0));
  const version = encodeURIComponent(row.updated_at || row.created_at || "1");
  const images = keys.map((_, index) => `${origin}${MARKETPLACE_IMAGE_PREFIX}${encodeURIComponent(id)}/${index}?v=${version}`);
  const imageUrl = images[featured] || `${origin}/assets/marketplace/marketplace-premium-hero-desktop.webp`;
  const pageUrl = `${origin}${MARKETPLACE_SHARE_PREFIX}${encodeURIComponent(id)}`;
  const statusLabel = row.status === "sold" ? "Sold" : "Available";
  const viewCount = Math.max(0, Number(row.view_count || 0) || 0);
  const viewCountLabel = new Intl.NumberFormat("en-US").format(viewCount);
  const categoryLabel = row.category === "gear" ? "Used Gear / Solar · Beta" : "Elevation UpScales Marketplace";
  const buyerNotice = row.category === "gear"
    ? "Experimental Used Gear / Solar category. Every post is reviewed before publication. Seller-provided information; buyers should independently inspect and verify the item before purchase."
    : "Seller-provided information. Buyers should independently inspect and verify any listing before purchase.";
  let categoryFields = {};
  try { categoryFields = JSON.parse(row.category_fields_json || "{}"); } catch (_) {}
  const details = row.category === "gear"
    ? [
        ["Type", row.item_type || "Used Gear / Solar"],
        ["Condition", categoryFields.conditionRating || "Not provided"],
        ["Brand / Maker", row.make || "Not provided"],
      ]
    : [
        ["Title", row.title_status || "Not provided"],
        ["Type", row.item_type || "Not provided"],
        ["Mileage / Usage", row.mileage || "Not provided"],
        ...Object.entries(categoryFields || {}).filter(([, value]) => value).slice(0, 4).map(([key, value]) => [key.replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase()), value]),
      ];
  const thumbs = images.map((src, index) => `<button class="thumb${index === featured ? " is-active" : ""}" type="button" data-gallery-index="${index}" aria-label="View photo ${index + 1} of ${images.length}"><img src="${escapeHtml(src)}" alt="${escapeHtml(title)} photo ${index + 1}" loading="lazy"></button>`).join("");
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Elevation UpScales Marketplace</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${escapeHtml(pageUrl)}"><meta property="og:type" content="website"><meta property="og:site_name" content="Elevation UpScales Marketplace"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${escapeHtml(pageUrl)}"><meta property="og:image" content="${escapeHtml(imageUrl)}"><meta property="og:image:alt" content="${escapeHtml(title)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${escapeHtml(imageUrl)}"><style>:root{color-scheme:dark;--gold:#d7a326;--gold2:#f0bf42;--line:rgba(215,163,38,.45)}*{box-sizing:border-box}body{margin:0;background:#050505;color:#fff;font:16px/1.5 Arial,sans-serif}button,a{font:inherit}.top{position:sticky;top:0;z-index:20;background:rgba(5,5,5,.94);backdrop-filter:blur(12px);border-bottom:1px solid #242424}.topin{width:min(1180px,calc(100% - 28px));margin:auto;height:64px;display:flex;align-items:center;justify-content:space-between;gap:14px}.brand{color:#fff;text-decoration:none;font-weight:900;letter-spacing:.08em}.brand span{color:var(--gold2)}.back{color:#ddd;text-decoration:none;font-weight:800}.wrap{width:min(1180px,calc(100% - 28px));margin:24px auto 60px}.grid{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(320px,.75fr);gap:26px}.gallery,.info{background:linear-gradient(145deg,#101010,#080808);border:1px solid var(--line);border-radius:14px;overflow:hidden}.stage{position:relative;width:100%;border:0;padding:0;background:#090909;aspect-ratio:16/10;display:grid;place-items:center;cursor:zoom-in}.stage img{width:100%;height:100%;object-fit:contain;display:block}.counter{position:absolute;right:12px;bottom:12px;background:rgba(0,0,0,.78);padding:6px 10px;border-radius:999px;font-size:.78rem;font-weight:900}.thumbs{display:flex;gap:8px;padding:10px;overflow-x:auto}.thumb{border:1px solid #383838;background:#0a0a0a;padding:0;border-radius:7px;overflow:hidden;min-width:92px;width:92px;height:68px;cursor:pointer}.thumb.is-active{border:2px solid var(--gold2)}.thumb img{width:100%;height:100%;object-fit:cover;display:block}.info{padding:24px;height:max-content;position:sticky;top:88px}.eyebrow{color:var(--gold2);font-size:.7rem;letter-spacing:.13em;font-weight:900;text-transform:uppercase}.title{font-size:clamp(1.65rem,3vw,2.5rem);line-height:1.05;margin:.5rem 0}.price{font-size:1.65rem;color:var(--gold2);font-weight:900}.meta{color:#bbb;margin:.35rem 0 1rem}.status{display:inline-block;border:1px solid var(--gold);color:var(--gold2);border-radius:4px;padding:4px 9px;font-size:.7rem;text-transform:uppercase;font-weight:900;letter-spacing:.08em}.views{display:inline-flex;align-items:center;gap:5px;margin-left:9px;color:#aaa;font-size:.78rem;font-weight:800;white-space:nowrap}.actions{display:flex;gap:8px;margin:18px 0}.actions button,.contact{border:1px solid var(--gold);background:#0a0a0a;color:#fff;padding:11px 14px;border-radius:6px;font-weight:900;cursor:pointer}.actions button:hover,.actions button.is-liked{background:var(--gold);color:#050505}.contact{width:100%;background:var(--gold);color:#050505}.contact-result{margin-top:10px;display:flex;gap:8px;flex-wrap:wrap}.contact-result a{color:#fff;border:1px solid #555;padding:8px 10px;border-radius:5px}.copy h2{font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;margin:22px 0 5px}.copy p{margin:0;color:#ccc;white-space:pre-wrap}.specs{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#272727;margin-top:20px;border:1px solid #272727}.specs div{background:#0a0a0a;padding:11px}.specs dt{font-size:.65rem;color:#888;text-transform:uppercase}.specs dd{margin:2px 0 0;color:#eee}.fine{font-size:.74rem;color:#777;margin-top:18px}.lightbox[hidden]{display:none}.lightbox{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.97);display:grid;grid-template-columns:70px 1fr 70px;align-items:center}.lightbox-main{max-width:100%;max-height:92vh;margin:auto;display:block}.lb-close{position:absolute;right:18px;top:18px;width:44px;height:44px;border-radius:50%;border:1px solid #666;background:#111;color:#fff;font-size:1.5rem}.lb-nav{height:70px;border:0;background:transparent;color:#fff;font-size:2.5rem}.lb-count{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);background:#111;padding:6px 11px;border-radius:999px}.sold{color:var(--gold2);font-weight:900;margin-top:14px}@media(max-width:820px){.wrap{margin-top:14px}.grid{grid-template-columns:1fr;gap:14px}.info{position:static;padding:18px}.stage{aspect-ratio:4/3}.thumb{min-width:78px;width:78px;height:58px}.lightbox{grid-template-columns:46px 1fr 46px}.lb-nav{font-size:2rem}.topin{height:58px}.title{font-size:1.6rem}}</style></head><body><header class="top"><div class="topin"><a class="brand" href="/">ELEVATION <span>UPSCALES</span></a><a class="back" href="/marketplace">← Marketplace</a></div></header><main class="wrap"><div class="grid"><section class="gallery" aria-label="Listing photos"><button class="stage" type="button" data-open-gallery aria-label="Open full-screen photo gallery"><img data-main-image src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}"><span class="counter" data-photo-counter>${images.length ? featured + 1 : 0} / ${images.length}</span></button><div class="thumbs">${thumbs || '<span style="padding:10px;color:#888">No additional photos</span>'}</div></section><aside class="info"><span class="eyebrow">${escapeHtml(categoryLabel)}</span><h1 class="title">${escapeHtml(title)}</h1><div class="price">${escapeHtml(price)}</div><p class="meta">${escapeHtml(listingLocation)}</p><span class="status">${escapeHtml(statusLabel)}</span><span class="views" data-listing-views aria-label="${escapeHtml(viewCountLabel)} views">👁 ${escapeHtml(viewCountLabel)} views</span><div class="actions"><button type="button" data-like-listing>♡ Like</button><button type="button" data-share-listing>↗ Share</button></div><div class="copy"><h2>Highlights</h2><p>${escapeHtml(highlights)}</p><h2>Condition &amp; disclosure</h2><p>${escapeHtml(condition)}</p></div><dl class="specs">${details.map(([k,v])=>`<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join("")}</dl>${row.status === "sold" ? '<div class="sold">SOLD</div>' : '<button class="contact" type="button" data-listing-contact aria-expanded="false">Show Contact Info</button><div class="contact-result" data-contact-result hidden></div>'}<p class="fine">${escapeHtml(buyerNotice)}</p></aside></div></main><div class="lightbox" data-lightbox hidden role="dialog" aria-modal="true" aria-label="Listing photo gallery"><button class="lb-close" type="button" data-lightbox-close aria-label="Close photo gallery">×</button><button class="lb-nav" type="button" data-lightbox-prev aria-label="Previous photo">‹</button><img class="lightbox-main" data-lightbox-image alt="${escapeHtml(title)}"><button class="lb-nav" type="button" data-lightbox-next aria-label="Next photo">›</button><span class="lb-count" data-lightbox-count></span></div><script src="/site-shell.js?v=3.4.0"></script><script src="/marketplace-analytics.js?v=3.2.0"></script><script>(()=>{const images=${jsonForInlineScript(images)};let index=${featured};const main=document.querySelector('[data-main-image]'),counter=document.querySelector('[data-photo-counter]'),thumbs=[...document.querySelectorAll('[data-gallery-index]')],lightbox=document.querySelector('[data-lightbox]'),lbImage=document.querySelector('[data-lightbox-image]'),lbCount=document.querySelector('[data-lightbox-count]'),id=${jsonForInlineScript(id)};window.EUSAnalytics?.track('listing_open',{listingId:id,category:${jsonForInlineScript(row.category)}});setTimeout(async()=>{try{const r=await fetch('/api/marketplace/listings?id='+encodeURIComponent(id),{headers:{Accept:'application/json'},cache:'no-store'});const d=await r.json();const v=Math.max(0,Number(d?.listing?.views)||0);const n=document.querySelector('[data-listing-views]');if(r.ok&&n){const label=v.toLocaleString('en-US')+' views';n.textContent='👁 '+label;n.setAttribute('aria-label',label)}}catch(_){}} ,650);const favoriteKey='elevation-upscales-marketplace-favorites:v1';let liked=new Set;try{liked=new Set(JSON.parse(localStorage.getItem(favoriteKey)||'[]'))}catch(_){}const likeBtn=document.querySelector('[data-like-listing]');const syncLike=()=>{const on=liked.has(id);likeBtn.textContent=on?'♥ Liked':'♡ Like';likeBtn.classList.toggle('is-liked',on);likeBtn.setAttribute('aria-pressed',String(on))};syncLike();likeBtn.addEventListener('click',()=>{const wasLiked=liked.has(id);wasLiked?liked.delete(id):liked.add(id);try{localStorage.setItem(favoriteKey,JSON.stringify([...liked]))}catch(_){}syncLike();window.EUSAnalytics?.track(wasLiked?'favorite_remove':'favorite_add',{listingId:id,category:${jsonForInlineScript(row.category)}})});const setIndex=(next)=>{if(!images.length)return;index=(next+images.length)%images.length;main.src=images[index];counter.textContent=(index+1)+' / '+images.length;thumbs.forEach((b,i)=>b.classList.toggle('is-active',i===index));if(!lightbox.hidden){lbImage.src=images[index];lbCount.textContent=(index+1)+' / '+images.length}};thumbs.forEach((b)=>b.addEventListener('click',()=>setIndex(Number(b.dataset.galleryIndex))));const galleryOpener=document.querySelector('[data-open-gallery]');const lbFocusable=()=>[...lightbox.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')].filter(el=>!el.hidden);const open=()=>{if(!images.length)return;lightbox.hidden=false;document.body.style.overflow='hidden';lbImage.src=images[index];lbCount.textContent=(index+1)+' / '+images.length;document.querySelector('[data-lightbox-close]').focus()};const close=()=>{lightbox.hidden=true;document.body.style.overflow='';galleryOpener?.focus()};galleryOpener.addEventListener('click',open);document.querySelector('[data-lightbox-close]').addEventListener('click',close);document.querySelector('[data-lightbox-prev]').addEventListener('click',()=>setIndex(index-1));document.querySelector('[data-lightbox-next]').addEventListener('click',()=>setIndex(index+1));let touchX=null;lightbox.addEventListener('touchstart',(e)=>{touchX=e.touches[0]?.clientX??null},{passive:true});lightbox.addEventListener('touchend',(e)=>{if(touchX===null)return;const dx=(e.changedTouches[0]?.clientX??touchX)-touchX;if(Math.abs(dx)>45)setIndex(index+(dx<0?1:-1));touchX=null},{passive:true});window.addEventListener('keydown',(e)=>{if(lightbox.hidden)return;if(e.key==='Escape'){e.preventDefault();close();return}if(e.key==='ArrowLeft'){e.preventDefault();setIndex(index-1);return}if(e.key==='ArrowRight'){e.preventDefault();setIndex(index+1);return}if(e.key==='Tab'){const items=lbFocusable();if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});document.querySelector('[data-share-listing]').addEventListener('click',async()=>{window.EUSAnalytics?.track('share_listing',{listingId:id,category:${jsonForInlineScript(row.category)}});const data={title:${jsonForInlineScript(title)},text:${jsonForInlineScript([title,price,listingLocation].filter(Boolean).join(' — '))},url:${jsonForInlineScript(pageUrl)}};try{if(navigator.share)await navigator.share(data);else if(navigator.clipboard){await navigator.clipboard.writeText(data.url);const b=document.querySelector('[data-share-listing]');b.textContent='✓ Link Copied';setTimeout(()=>b.textContent='↗ Share',1600)}else prompt('Copy this listing link:',data.url)}catch(e){if(e?.name!=='AbortError')console.warn(e)}});const contact=document.querySelector('[data-listing-contact]'),result=document.querySelector('[data-contact-result]');contact?.addEventListener('click',async()=>{if(contact.getAttribute('aria-expanded')==='true'){result.hidden=true;result.replaceChildren();contact.setAttribute('aria-expanded','false');contact.textContent='Show Contact Info';return}contact.disabled=true;contact.textContent='Loading Contact…';try{const r=await fetch('/api/marketplace/contact/${encodeURIComponent(id)}',{method:'POST',credentials:'same-origin',headers:{Accept:'application/json','X-EUS-Contact-Intent':'reveal','X-EUS-Session':window.EUSAnalytics?.sessionId?.()||''}});const d=await r.json();if(!r.ok)throw new Error(d.error||'Contact unavailable');const digits=String(d.phone||'').replace(/\\D/g,'');result.replaceChildren();const label=document.createElement('strong');label.textContent=String(d.name||'Seller')+':';const call=document.createElement('a');call.href='tel:'+digits;call.textContent='Call '+String(d.phone||'');const text=document.createElement('a');text.href='sms:'+digits;text.textContent='Text Seller';result.dataset.eusContactListing=id;result.dataset.eusContactCategory=${jsonForInlineScript(row.category)};result.append(label,call,text);result.hidden=false;contact.setAttribute('aria-expanded','true');contact.textContent='Hide Contact Info'}catch(e){result.hidden=false;result.textContent=e.message||'Contact unavailable';contact.textContent='Try Contact Again'}finally{contact.disabled=false}})})();</script></body></html>`;
  return new Response(body, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=60, s-maxage=300", ...HTML_SECURITY_HEADERS, "Link": `<${pageUrl}>; rel=\"canonical\"` } });
}

async function handleMarketplaceShare(request, env, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD", "Cache-Control": "no-store", ...HTML_SECURITY_HEADERS } });
  const id = cleanString(decodeURIComponent(pathname.slice(MARKETPLACE_SHARE_PREFIX.length).split("/")[0] || ""), 80);
  if (!id) return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store", ...HTML_SECURITY_HEADERS } });
  const row = await getMarketplaceRowWithViews(env, id);
  if (!row || !["published", "sold"].includes(row.status)) return new Response("Listing not found", { status: 404, headers: { "Cache-Control": "no-store", ...HTML_SECURITY_HEADERS } });
  const response = marketplaceSharePage(request, row);
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleAdminLogin(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const adminEmail = cleanString(env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL, 180).toLowerCase();
  const adminPassword = String(env.ADMIN_PASSWORD || "");
  if (!adminPassword || !env.ADMIN_SESSION_SECRET) return jsonResponse({ error: "Admin login has not been configured" }, 503);
  const loginAttempt = await adminLoginAttempt(request, env);
  if (!loginAttempt.allowed) return jsonResponse({ error: "Too many login attempts. Please wait 15 minutes and try again." }, 429, { "Retry-After": String(loginAttempt.retryAfter || ADMIN_LOGIN_WINDOW_SECONDS) });
  const parsed = await readLimitedJson(request, ADMIN_LOGIN_MAX_BYTES);
  if (parsed.error === "too_large") return jsonResponse({ error: "Login request is too large" }, 413);
  if (parsed.error) return jsonResponse({ error: "Invalid login request" }, 400);
  const body = parsed.value || {};
  const email = cleanString(body.email, 180).toLowerCase();
  const password = String(body.password || "");
  if (email !== adminEmail || !timingSafeEqualStrings(password, adminPassword)) return jsonResponse({ error: "Incorrect email or password" }, 401);
  if (typeof loginAttempt.cache.delete === "function") await loginAttempt.cache.delete(loginAttempt.key);
  if (loginAttempt.durableScope) await clearDurableRateLimit(env.MARKETPLACE_DB, request, env, loginAttempt.durableScope).catch(() => {});
  await Promise.allSettled([
    cleanupExpiredSecurityLimits(env.MARKETPLACE_DB),
    cleanupExpiredSecurityLimits(env.LEADS_DB),
  ]);
  const token = await createAdminSession(env, adminEmail);
  return jsonResponse({ ok: true, email: adminEmail }, 200, {
    "Set-Cookie": `eus_admin_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`,
  });
}

async function handleAdminLogout(request) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  return jsonResponse({ ok: true }, 200, { "Set-Cookie": "eus_admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0" });
}

async function handleAdminSession(request, env) {
  if (request.method !== "GET") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET" });
  const session = await readAdminSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401);
  let schemaMigration = { migrated: false, needed: false, manual: true };
  if (env.MARKETPLACE_DB) {
    try {
      const status = await marketplaceSchemaStatus(env.MARKETPLACE_DB);
      schemaMigration = { migrated: false, needed: status.needed, manual: true, reason: status.reason || "" };
    } catch (error) {
      console.error(JSON.stringify({ event: "marketplace_schema_status_error", message: error instanceof Error ? error.message : String(error) }));
      schemaMigration = { migrated: false, needed: true, manual: true, blocked: true, reason: "schema_check_failed" };
    }
  }
  return jsonResponse({ authenticated: true, ...session, schemaMigration });
}

function marketplaceAdminRecord(row) {
  const publicRecord = marketplacePublicRecord(row);
  return {
    ...publicRecord,
    qaTest: marketplaceQaTestFromRow(row),
    seller: { name: row.seller_name, email: row.seller_email, phone: row.seller_phone },
    moderationNotes: row.moderation_notes || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    notificationStatus: row.notification_status || "",
  };
}

async function adminLog(env, listingId, action, adminEmail, details = "") {
  await env.MARKETPLACE_DB.prepare("INSERT INTO marketplace_admin_log (listing_id, action, admin_email, details, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(listingId, action, adminEmail, cleanString(details, 2000), new Date().toISOString()).run();
}


function marketplacePhotoKeys(row) {
  try {
    const keys = JSON.parse(row?.photo_keys_json || "[]");
    return Array.isArray(keys) ? keys.filter((key) => typeof key === "string" && key) : [];
  } catch (_) {
    return [];
  }
}

async function validateMarketplaceAdminPhoto(file) {
  if (!(file instanceof File) || !file.size) return "Choose a photo to upload";
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return "Photos must be JPEG, PNG, or WebP";
  if (file.size > MARKETPLACE_MAX_IMAGE_BYTES) return "Each photo must be smaller than 10 MB";
  if (!(await validMarketplaceImageSignature(file))) return "The selected file is not a valid listing photo";
  return "";
}

function adjustedFeaturedAfterDelete(featured, deletedIndex, remainingCount) {
  if (remainingCount <= 0) return 0;
  if (featured === deletedIndex) return Math.min(deletedIndex, remainingCount - 1);
  if (featured > deletedIndex) return featured - 1;
  return Math.min(featured, remainingCount - 1);
}

async function updateMarketplacePhotoRecord(env, id, keys, featuredPhoto) {
  const now = new Date().toISOString();
  await env.MARKETPLACE_DB.prepare("UPDATE marketplace_listings SET photo_keys_json=?, featured_photo=?, updated_at=? WHERE id=?")
    .bind(JSON.stringify(keys), featuredPhoto, now, id).run();
  return getMarketplaceRowWithViews(env, id);
}

async function handleAdminListings(request, env, pathname) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.MARKETPLACE_DB) return jsonResponse({ error: "Marketplace database is not configured" }, 503);

  const suffix = pathname.slice(ADMIN_LISTINGS_PATH.length).replace(/^\//, "");
  const parts = suffix ? suffix.split("/") : [];
  const id = cleanString(parts[0], 80);
  const actionSegment = parts[1] || "";

  if (request.method === "GET" && !id) {
    const url = new URL(request.url);
    const status = cleanString(url.searchParams.get("status") || "pending_review", 40);
    const queryStatus = status === "all" ? "" : (MARKETPLACE_ADMIN_STATUSES.has(status) ? status : "pending_review");
    let rows = [];
    try {
      const base = `SELECT l.*, COALESCE(v.view_count, 0) AS view_count
        FROM marketplace_listings l
        LEFT JOIN (
          SELECT listing_id, COUNT(DISTINCT session_hash) AS view_count
          FROM marketplace_events
          WHERE event_type='listing_open' AND listing_id IS NOT NULL AND listing_id<>''
          GROUP BY listing_id
        ) v ON v.listing_id=l.id`;
      const result = queryStatus
        ? await env.MARKETPLACE_DB.prepare(`${base} WHERE l.status=? ORDER BY l.created_at DESC`).bind(queryStatus).all()
        : await env.MARKETPLACE_DB.prepare(`${base} ORDER BY l.created_at DESC`).all();
      rows = result.results || [];
    } catch (error) {
      console.error(JSON.stringify({ event: "admin_listing_view_count_fallback", message: error instanceof Error ? error.message : String(error) }));
      const result = queryStatus
        ? await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_listings WHERE status=? ORDER BY created_at DESC").bind(queryStatus).all()
        : await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_listings ORDER BY created_at DESC").all();
      rows = (result.results || []).map((row) => ({ ...row, view_count: 0 }));
    }
    return jsonResponse({ listings: rows.map(marketplaceAdminRecord), count: rows.length });
  }

  if (request.method === "GET" && id) {
    const row = await getMarketplaceRowWithViews(env, id);
    return row ? jsonResponse({ listing: marketplaceAdminRecord(row) }) : jsonResponse({ error: "Listing not found" }, 404);
  }

  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const row = id ? await getMarketplaceRow(env, id) : null;
  if (!row) return jsonResponse({ error: "Listing not found" }, 404);

  if (actionSegment === "photos") {
    if (!env.LISTING_IMAGES) return jsonResponse({ error: "Listing image storage is not configured" }, 503);
    const keys = marketplacePhotoKeys(row);
    const indexSegment = parts[2];
    const photoIndex = indexSegment === undefined ? -1 : Number.parseInt(indexSegment, 10);

    if (request.method === "POST" && indexSegment === undefined) {
      const parsedUpload = await parseLimitedMultipartFormData(request, MARKETPLACE_MAX_TOTAL_BYTES, "Photo upload");
      if (parsedUpload.response) return parsedUpload.response;
      const form = parsedUpload.form;
      const files = form.getAll("photos").filter((file) => file instanceof File && file.size);
      if (!files.length) return jsonResponse({ error: "Choose at least one photo" }, 400);
      if (keys.length + files.length > MARKETPLACE_MAX_ADMIN_PHOTOS) return jsonResponse({ error: `A listing can have up to ${MARKETPLACE_MAX_ADMIN_PHOTOS} photos` }, 400);
      for (const file of files) {
        const error = await validateMarketplaceAdminPhoto(file);
        if (error) return jsonResponse({ error }, error.includes("10 MB") ? 413 : 400);
      }

      const uploaded = [];
      try {
        for (const file of files) {
          const prepared = await prepareMarketplaceImage(file, env);
          const key = `marketplace/${id}/admin-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${prepared.extension}`;
          await env.LISTING_IMAGES.put(key, prepared.body, {
            httpMetadata: { contentType: prepared.contentType, cacheControl: "public, max-age=31536000, immutable" },
            customMetadata: { listingId: id, slot: "admin-upload", normalized: prepared.normalized ? "true" : "false" },
          });
          uploaded.push(key);
        }
        const updatedRow = await updateMarketplacePhotoRecord(env, id, [...keys, ...uploaded], Math.min(Number(row.featured_photo) || 0, keys.length + uploaded.length - 1));
        await adminLog(env, id, "photos_added", auth.session.email, `${uploaded.length} photo(s) added`);
        return jsonResponse({ ok: true, listing: marketplaceAdminRecord(updatedRow) });
      } catch (error) {
        await Promise.all(uploaded.map((key) => env.LISTING_IMAGES.delete(key).catch(() => {})));
        return jsonResponse({ error: "The photos could not be added" }, 500);
      }
    }

    if (request.method === "PUT" && Number.isInteger(photoIndex) && photoIndex >= 0 && photoIndex < keys.length) {
      const parsedUpload = await parseLimitedMultipartFormData(request, ADMIN_SINGLE_PHOTO_MAX_TOTAL_BYTES, "Replacement photo");
      if (parsedUpload.response) return parsedUpload.response;
      const form = parsedUpload.form;
      const file = form.get("photo");
      const validationError = await validateMarketplaceAdminPhoto(file);
      if (validationError) return jsonResponse({ error: validationError }, validationError.includes("10 MB") ? 413 : 400);
      let replacementKey = "";
      try {
        const prepared = await prepareMarketplaceImage(file, env);
        replacementKey = `marketplace/${id}/admin-replacement-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${prepared.extension}`;
        await env.LISTING_IMAGES.put(replacementKey, prepared.body, {
          httpMetadata: { contentType: prepared.contentType, cacheControl: "public, max-age=31536000, immutable" },
          customMetadata: { listingId: id, slot: `replacement-${photoIndex + 1}`, normalized: prepared.normalized ? "true" : "false" },
        });
        const oldKey = keys[photoIndex];
        const nextKeys = [...keys];
        nextKeys[photoIndex] = replacementKey;
        const updatedRow = await updateMarketplacePhotoRecord(env, id, nextKeys, Math.min(Number(row.featured_photo) || 0, nextKeys.length - 1));
        await env.LISTING_IMAGES.delete(oldKey).catch(() => {});
        await adminLog(env, id, "photo_replaced", auth.session.email, `Photo ${photoIndex + 1} replaced`);
        return jsonResponse({ ok: true, listing: marketplaceAdminRecord(updatedRow) });
      } catch (error) {
        await env.LISTING_IMAGES.delete(replacementKey).catch(() => {});
        return jsonResponse({ error: "The photo could not be replaced" }, 500);
      }
    }

    if (request.method === "PATCH" && indexSegment === undefined) {
      let body;
      try { body = await request.json(); } catch (_) { return jsonResponse({ error: "Invalid photo action" }, 400); }
      const action = cleanString(body.action, 40);
      const index = Number.parseInt(body.index, 10);
      if (!Number.isInteger(index) || index < 0 || index >= keys.length) return jsonResponse({ error: "Photo not found" }, 404);
      let nextKeys = [...keys];
      let featured = Math.min(Number(row.featured_photo) || 0, Math.max(0, nextKeys.length - 1));
      let logDetails = "";
      if (action === "cover") {
        featured = index;
        logDetails = `Photo ${index + 1} set as cover`;
      } else if (action === "move") {
        const direction = body.direction === "left" ? -1 : body.direction === "right" ? 1 : 0;
        const target = index + direction;
        if (!direction || target < 0 || target >= nextKeys.length) return jsonResponse({ error: "Photo cannot move in that direction" }, 400);
        [nextKeys[index], nextKeys[target]] = [nextKeys[target], nextKeys[index]];
        if (featured === index) featured = target;
        else if (featured === target) featured = index;
        logDetails = `Photo ${index + 1} moved ${body.direction}`;
      } else {
        return jsonResponse({ error: "Invalid photo action" }, 400);
      }
      const updatedRow = await updateMarketplacePhotoRecord(env, id, nextKeys, featured);
      await adminLog(env, id, action === "cover" ? "cover_photo_changed" : "photo_reordered", auth.session.email, logDetails);
      return jsonResponse({ ok: true, listing: marketplaceAdminRecord(updatedRow) });
    }

    if (request.method === "DELETE" && Number.isInteger(photoIndex) && photoIndex >= 0 && photoIndex < keys.length) {
      if (keys.length <= 1) return jsonResponse({ error: "A listing must keep at least one photo" }, 400);
      const removedKey = keys[photoIndex];
      const nextKeys = keys.filter((_, index) => index !== photoIndex);
      const featured = adjustedFeaturedAfterDelete(Number(row.featured_photo) || 0, photoIndex, nextKeys.length);
      const updatedRow = await updateMarketplacePhotoRecord(env, id, nextKeys, featured);
      await env.LISTING_IMAGES.delete(removedKey).catch(() => {});
      await adminLog(env, id, "photo_deleted", auth.session.email, `Photo ${photoIndex + 1} deleted`);
      return jsonResponse({ ok: true, listing: marketplaceAdminRecord(updatedRow) });
    }

    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (request.method === "PATCH" && id && !actionSegment) {
    let body;
    try { body = await request.json(); } catch (_) { return jsonResponse({ error: "Invalid update" }, 400); }
    const editedYear = Number.parseInt(body.year ?? row.year, 10);
    const fields = {
      location: cleanString(body.location ?? row.location, 180),
      year: Number.isFinite(editedYear) ? editedYear : null,
      make: cleanString(body.make ?? row.make, 120),
      model: cleanString(body.model ?? row.model, 160),
      price: cleanString(body.price ?? row.price, 80),
      mileage: cleanString(body.mileage ?? row.mileage, 80),
      titleStatus: cleanString(body.titleStatus ?? row.title_status, 120),
      itemType: cleanString(body.itemType ?? row.item_type, 100),
      highlights: cleanString(body.highlights ?? row.highlights, 2500),
      conditionDisclosure: cleanString(body.conditionDisclosure ?? row.condition_disclosure, 2500),
      moderationNotes: cleanString(body.moderationNotes ?? row.moderation_notes, 2500),
      featuredPhoto: Math.max(0, Math.min(Math.max(0, marketplacePhotoKeys(row).length - 1), Number.parseInt(body.featuredPhoto ?? row.featured_photo, 10) || 0)),
    };
    const adminYearRequired = !["bicycle", "gear"].includes(row.category);
    const adminMakeRequired = row.category !== "gear";
    if (!fields.location || (adminYearRequired && !fields.year) || (adminMakeRequired && !fields.make) || !fields.model || !fields.price || !fields.itemType || !fields.highlights || !fields.conditionDisclosure) return jsonResponse({ error: "Required listing fields cannot be blank" }, 400);
    const now = new Date().toISOString();
    await env.MARKETPLACE_DB.prepare(`UPDATE marketplace_listings SET location=?, year=?, make=?, model=?, price=?, mileage=?, title_status=?, item_type=?, highlights=?, condition_disclosure=?, moderation_notes=?, featured_photo=?, updated_at=? WHERE id=?`).bind(
      fields.location, fields.year, fields.make, fields.model, fields.price, fields.mileage, fields.titleStatus, fields.itemType,
      fields.highlights, fields.conditionDisclosure, fields.moderationNotes, fields.featuredPhoto, now, id,
    ).run();
    await adminLog(env, id, "edit", auth.session.email, fields.moderationNotes);
    return jsonResponse({ ok: true, listing: marketplaceAdminRecord(await getMarketplaceRowWithViews(env, id)) });
  }

  if (request.method === "POST" && id && actionSegment === "action") {
    let body;
    try { body = await request.json(); } catch (_) { body = {}; }
    const action = cleanString(body.action, 40);
    const notes = cleanString(body.notes, 2500);
    const qaTest = marketplaceQaTestFromRow(row);
    if (action === "approve" && qaTest && body.confirmTestPublish !== true) {
      return jsonResponse({ error: "TEST — DO NOT PUBLISH requires explicit Admin publish confirmation" }, 409);
    }
    const now = new Date().toISOString();
    const statusMap = { approve: "published", reject: "rejected", request_changes: "changes_requested", mark_sold: "sold", unpublish: "unpublished", restore_pending: "pending_review" };
    const nextStatus = statusMap[action];
    if (!nextStatus) return jsonResponse({ error: "Invalid admin action" }, 400);
    const publishedAt = action === "approve" ? (row.published_at || now) : row.published_at;
    const soldAt = action === "mark_sold" ? now : (action === "restore_pending" ? null : row.sold_at);
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_listings SET status=?, moderation_notes=?, updated_at=?, published_at=?, sold_at=? WHERE id=?")
      .bind(nextStatus, notes || row.moderation_notes || "", now, publishedAt, soldAt, id).run();
    await adminLog(env, id, action, auth.session.email, notes);
    return jsonResponse({ ok: true, listing: marketplaceAdminRecord(await getMarketplaceRowWithViews(env, id)) });
  }

  if (request.method === "DELETE" && id) {
    const keys = marketplacePhotoKeys(row);
    const deletedAt = new Date().toISOString();
    await env.MARKETPLACE_DB.batch([
      env.MARKETPLACE_DB.prepare("INSERT INTO marketplace_admin_log (listing_id, action, admin_email, details, created_at) VALUES (?, ?, ?, ?, ?)")
        .bind(id, "delete", auth.session.email, cleanString(row.reference, 2000), deletedAt),
      env.MARKETPLACE_DB.prepare("DELETE FROM marketplace_listings WHERE id=?").bind(id),
    ]);
    const cleanup = await Promise.allSettled(keys.map((key) => env.LISTING_IMAGES?.delete(key)));
    const cleanupFailures = cleanup.filter((result) => result.status === "rejected").length;
    return jsonResponse({ ok: true, imageCleanupPending: cleanupFailures > 0, imageCleanupFailures: cleanupFailures });
  }

  return jsonResponse({ error: "Method not allowed" }, 405);
}



// v3.4.0 — Dedicated Start a Project + Regional Routing + Work With Us
const PROJECT_TYPES = new Set(["home","rv","solar"]);
const PROJECT_INTAKE_INTENTS = Object.freeze({
  "emergency repair": { label: "Emergency Repair", families: new Set(["home","rv"]) },
  "small repair / handyman": { label: "Small Repair / Handyman", families: new Set(["home"]) },
  "restoration / remodel / larger project": { label: "Restoration / Remodel / Larger Project", families: new Set(["home"]) },
  "rv": { label: "RV", families: new Set(["rv"]) },
  "solar / off-grid": { label: "Solar / Off-Grid", families: new Set(["solar"]) },
});
const HANDYMAN_SERVICE_CATALOG = Object.freeze({
  fence_post_gate: { label: "Fence Post / Gate Repair", startingPrice: 349, priceLabel: "from $349" },
  cracked_tile_grout: { label: "Cracked Tile / Grout Repair", startingPrice: 329, priceLabel: "from $329" },
  drywall_patch: { label: "Drywall Patch / Repair", startingPrice: 249, priceLabel: "from $249" },
  paint_touch_up: { label: "Paint Touch-Up", startingPrice: 229, priceLabel: "from $229" },
  trim_baseboard: { label: "Trim / Baseboard Repair", startingPrice: 249, priceLabel: "from $249" },
  door_hardware: { label: "Door / Hardware Adjustment", startingPrice: 199, priceLabel: "from $199" },
  faucet_minor_plumbing: { label: "Faucet / Minor Plumbing Repair", startingPrice: 249, priceLabel: "from $249" },
  fixture_installation: { label: "Fixture / Small Installation", startingPrice: 229, priceLabel: "from $229" },
  mounting_shelving: { label: "Mounting / Shelving", startingPrice: 229, priceLabel: "from $229" },
  general_multiple: { label: "General Handyman / Multiple Small Items", startingPrice: 299, priceLabel: "2-hour service from $299" },
});
const HANDYMAN_MAX_PHOTOS = 3;
const HANDYMAN_MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const HANDYMAN_MAX_UPLOAD_BYTES = HANDYMAN_MAX_PHOTO_BYTES * HANDYMAN_MAX_PHOTOS + 1024 * 1024;

function cleanHandymanDetails(raw = {}) {
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const handyman = source.handyman && typeof source.handyman === "object" && !Array.isArray(source.handyman) ? source.handyman : {};
  const requested = Array.isArray(handyman.requestedServices) ? handyman.requestedServices : [];
  const seen = new Set();
  const requestedServices = [];
  for (const item of requested) {
    const key = cleanString(item?.key ?? item, 80).toLowerCase();
    if (!key || seen.has(key) || !HANDYMAN_SERVICE_CATALOG[key]) continue;
    seen.add(key);
    const def = HANDYMAN_SERVICE_CATALOG[key];
    requestedServices.push({ key, label: def.label, startingPrice: def.startingPrice, priceLabel: def.priceLabel });
    if (requestedServices.length >= 10) break;
  }
  const quantity = Math.max(1, Math.min(50, Number.parseInt(handyman.quantity, 10) || 1));
  const timing = cleanString(handyman.timing, 120) || "Flexible / planning";
  const briefDetails = cleanString(handyman.briefDetails, 1200);
  const pricingClass = requestedServices.length > 1 ? "bundle_review" : (requestedServices[0]?.key === "general_multiple" ? "two_hour_block" : (requestedServices.length ? "starting_price" : "unselected"));
  const existingPhotoKeys = Array.isArray(handyman.photoKeys) ? handyman.photoKeys.map((v) => cleanString(v, 500)).filter((v) => v.startsWith("lead-intake/")).slice(0, HANDYMAN_MAX_PHOTOS) : [];
  return {
    ...publicProjectDetails(source),
    handyman: {
      requestedServices,
      quantity,
      timing,
      briefDetails,
      pricingClass,
      pricingGuidance: { baseServiceVisit: 189, additionalLaborHourly: 129, twoHourBlock: 299, halfDayBlock: 549, materialsMarkupPercent: 25, urgentPremiumPercent: 25, extendedMarketTravelRange: "49-99" },
      ...(existingPhotoKeys.length ? { photoKeys: existingPhotoKeys } : {}),
    },
  };
}

function handymanSummary(details) {
  const h = details?.handyman || {};
  const labels = Array.isArray(h.requestedServices) ? h.requestedServices.map((item) => cleanString(item?.label, 120)).filter(Boolean) : [];
  return cleanString(h.briefDetails, 1200) || `Requested Handyman service: ${labels.join(", ")}. Quantity / count: ${Math.max(1, Number.parseInt(h.quantity, 10) || 1)}.`;
}

function canonicalProjectIntakeIntent(value, projectType) {
  const key = cleanString(value, 120).toLowerCase();
  const definition = PROJECT_INTAKE_INTENTS[key];
  return definition && definition.families.has(projectType) ? definition.label : "";
}
const SERVICE_AREAS = new Set(["treasure_valley","southern_colorado","denver_metro","outside_standard_area","manual_review"]);
const WWU_TYPES = new Set(["affiliate","marketing","technician","investment"]);
const WWU_STATUSES = new Set(["new","reviewing","contacted","good_fit","not_a_fit","complete"]);
const WWU_NEXT_ACTIONS = new Set(["Review Submission","Call","Email","Request More Information","Schedule Conversation","Follow Up","No Action / Complete"]);
const PROJECT_PIPELINE_STATUSES = new Set(["new","contacting","estimate_inspection_scheduled","field_review_complete","estimate_in_progress","estimate_sent","follow_up","won","lost","closed"]);
const PROJECT_PIPELINE_NEXT_ACTIONS = new Set(["Call Customer","Text Customer","Email Customer","Schedule Estimate","Complete Inspection","Submit Field Notes","Build Estimate","Send Estimate","Follow Up","Assign Technician","Verify Service Area","No Action"]);
const PROJECT_MARKETS = new Set(["southern_colorado","treasure_valley","denver_metro","outside_standard_area","manual_review"]);
const PROJECT_RECORD_PRIORITIES = new Set(["","normal","high","urgent"]);
const PROJECT_PORTAL_STATUSES = new Set(["not_in_portal","in_portal"]);
const PROJECT_CONVERSATION_CHANNELS = new Set(["phone","email","text","in_person","other"]);
function projectControlRecord(details){const value=details?.controlCenterRecord&&typeof details.controlCenterRecord==="object"&&!Array.isArray(details.controlCenterRecord)?details.controlCenterRecord:{};return{priority:PROJECT_RECORD_PRIORITIES.has(cleanString(value.priority,30).toLowerCase())?cleanString(value.priority,30).toLowerCase():"",timingUrgency:cleanString(value.timingUrgency,500),internalNotes:cleanString(value.internalNotes,5000),updatedAt:cleanString(value.updatedAt,80),updatedBy:cleanString(value.updatedBy,180)}}
function projectPortalRecord(details){const value=details?.portalBridge&&typeof details.portalBridge==="object"&&!Array.isArray(details.portalBridge)?details.portalBridge:{},status=cleanString(value.status,40).toLowerCase();return{status:PROJECT_PORTAL_STATUSES.has(status)?status:"not_in_portal",projectId:cleanString(value.projectId,120),markedAt:cleanString(value.markedAt,80),markedBy:cleanString(value.markedBy,180),updatedAt:cleanString(value.updatedAt,80),updatedBy:cleanString(value.updatedBy,180)}}
function projectConversationTimestamp(value,fallback=""){const raw=cleanString(value,80);if(!raw)return fallback;const time=new Date(raw);return Number.isFinite(time.getTime())?time.toISOString():fallback}
function projectConversations(details){const values=Array.isArray(details?.controlCenterConversations)?details.controlCenterConversations:[];return values.slice(-100).map((value)=>{const channel=cleanString(value?.channel,30).toLowerCase();return{id:cleanString(value?.id,120),channel:PROJECT_CONVERSATION_CHANNELS.has(channel)?channel:"other",note:cleanString(value?.note,5000),occurredAt:projectConversationTimestamp(value?.occurredAt),createdAt:projectConversationTimestamp(value?.createdAt),createdBy:cleanString(value?.createdBy,180)}}).filter((value)=>value.note&&value.occurredAt)}
function publicProjectDetails(value){const input=value&&typeof value==="object"&&!Array.isArray(value)?value:{},copy={...input};delete copy.controlCenterAssignment;delete copy.controlCenterRecord;delete copy.portalBridge;delete copy.controlCenterConversations;delete copy.manualEntry;return copy}
async function mergeProjectIntakeDetails(env,reference,incoming){const safeIncoming=publicProjectDetails(incoming);try{const row=await env.LEADS_DB.prepare("SELECT details_json FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();let existing={};try{existing=JSON.parse(row?.details_json||"{}")}catch(_){}if(!existing||typeof existing!=="object"||Array.isArray(existing))existing={};const merged={...publicProjectDetails(existing),...safeIncoming};if(existing.handyman&&typeof existing.handyman==="object"&&!Array.isArray(existing.handyman)&&safeIncoming.handyman&&typeof safeIncoming.handyman==="object"&&!Array.isArray(safeIncoming.handyman)){merged.handyman={...existing.handyman,...safeIncoming.handyman};if(Array.isArray(existing.handyman.photoKeys)&&!Array.isArray(safeIncoming.handyman.photoKeys))merged.handyman.photoKeys=existing.handyman.photoKeys}for(const key of ["controlCenterAssignment","controlCenterRecord","portalBridge","manualEntry"]){if(existing[key]&&typeof existing[key]==="object"&&!Array.isArray(existing[key]))merged[key]=existing[key]}if(Array.isArray(existing.controlCenterConversations))merged.controlCenterConversations=existing.controlCenterConversations;return merged}catch(_){return safeIncoming}}
function projectPipelineStatus(value){const status=cleanString(value,60).toLowerCase();if(PROJECT_PIPELINE_STATUSES.has(status))return status;if(status==="complete")return"closed";return"new"}
function projectPipelineNextAction(value,serviceArea=""){const action=cleanString(value,120);if(PROJECT_PIPELINE_NEXT_ACTIONS.has(action))return action;if(serviceArea==="outside_standard_area"||serviceArea==="manual_review"||action==="Outside Area Review")return"Verify Service Area";return"Call Customer"}
const TREASURE_VALLEY_CITIES = new Set(["boise","meridian","nampa","caldwell","eagle","kuna","star","garden city","middleton"]);
const SOUTHERN_COLORADO_CITIES = new Set(["colorado springs","falcon","peyton","fountain","monument","manitou springs","security","widefield","pueblo","woodland park"]);
const DENVER_METRO_CITIES = new Set(["denver","aurora","lakewood","littleton","arvada","westminster","thornton","centennial","englewood","golden","commerce city","parker","castle rock","broomfield"]);
const TREASURE_VALLEY_ZIPS = new Set(["83605","83607","83616","83634","83642","83644","83646","83651","83669","83676","83680","83686","83687","83702","83703","83704","83705","83706","83709","83712","83713","83714","83716"]);
const SOUTHERN_COLORADO_ZIPS = new Set(["80808","80817","80829","80831","80832","80840","80841","80902","80903","80904","80905","80906","80907","80908","80909","80910","80911","80912","80913","80914","80915","80916","80917","80918","80919","80920","80921","80922","80923","80924","80925","80926","80927","80928","80929","80930","80931","80938","80939","80951","81001","81003","81004","81005","81006","81007","81008","80863"]);
const DENVER_METRO_ZIPS = new Set(["80002","80003","80004","80005","80007","80010","80011","80012","80013","80014","80015","80016","80017","80018","80019","80020","80021","80022","80023","80027","80030","80031","80033","80104","80108","80109","80110","80111","80112","80113","80120","80121","80122","80123","80124","80125","80126","80127","80128","80129","80130","80134","80138","80202","80203","80204","80205","80206","80207","80209","80210","80211","80212","80214","80215","80216","80218","80219","80220","80221","80222","80223","80224","80226","80227","80228","80229","80230","80231","80232","80233","80234","80235","80236","80237","80238","80239","80241","80246","80247","80249"]);
function normalizeLocationToken(value){return cleanString(value,120).toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim()}
function normalizeProjectState(value){const v=cleanString(value,20).toUpperCase().replace(/[^A-Z]/g,"").slice(0,2);return MARKETPLACE_US_STATE_CODES.has(v)?v:""}
function normalizeProjectZip(value){const m=cleanString(value,20).match(/\d{5}/);return m?m[0]:""}
function rawServiceAreaFromZip(zip){if(TREASURE_VALLEY_ZIPS.has(zip))return"treasure_valley";if(SOUTHERN_COLORADO_ZIPS.has(zip))return"southern_colorado";if(DENVER_METRO_ZIPS.has(zip))return"denver_metro";return""}
function serviceAreaFromZip(zip,state){const market=rawServiceAreaFromZip(zip);if(market==="treasure_valley"&&state==="ID")return market;if((market==="southern_colorado"||market==="denver_metro")&&state==="CO")return market;return""}
function serviceAreaFromCity(city,state){const c=normalizeLocationToken(city);if(state==="ID"&&TREASURE_VALLEY_CITIES.has(c))return"treasure_valley";if(state==="CO"&&SOUTHERN_COLORADO_CITIES.has(c))return"southern_colorado";if(state==="CO"&&DENVER_METRO_CITIES.has(c))return"denver_metro";return""}
function classifyProjectServiceArea({city,zip,state}){const stateCode=normalizeProjectState(state),postal=normalizeProjectZip(zip),rawZipMarket=rawServiceAreaFromZip(postal),byZip=serviceAreaFromZip(postal,stateCode),byCity=serviceAreaFromCity(city,stateCode);if(rawZipMarket&&!byZip)return{serviceArea:"manual_review",reason:"ZIP and state do not agree on an Elevation service market. Elevation will verify the location."};if(byZip&&byCity&&byZip!==byCity)return{serviceArea:"manual_review",reason:"City and ZIP point to different Elevation service markets. Elevation will verify the location."};if(byZip||byCity)return{serviceArea:byZip||byCity,reason:"Location matched an Elevation standard service market."};if(stateCode==="ID"||stateCode==="CO")return{serviceArea:"manual_review",reason:"This location is in a state we serve, but it did not match a standard market with enough confidence."};if(stateCode)return{serviceArea:"outside_standard_area",reason:"This project is outside Elevation's current standard service markets and will require project review."};return{serviceArea:"manual_review",reason:"Elevation will verify this location before assigning a service market."}}
function projectReference(prefix){const d=new Date().toISOString().slice(0,10).replaceAll("-","");return `EUS-${prefix}-${d}-${crypto.randomUUID().split("-")[0].toUpperCase()}`}
function safeContactPayload(raw={}){const name=cleanString(raw.name,120),phone=cleanString(raw.phone,80),email=cleanString(raw.email,180).toLowerCase(),consent=Boolean(raw.consent);return{name,phone,email,preferredContact:cleanString(raw.preferredContact,80),consent,valid:Boolean(name&&consent&&(isValidPhone(phone)||isValidEmail(email)))}}
async function handleProjectClassify(request){if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);const parsed=await readLimitedJson(request,8_000);if(parsed.error)return jsonResponse({error:"Invalid location request"},400);const city=cleanString(parsed.value?.city,120),zip=normalizeProjectZip(parsed.value?.zip),state=normalizeProjectState(parsed.value?.state);if(!city||!zip||!state)return jsonResponse({error:"City, ZIP and state are required"},400);return jsonResponse({ok:true,...classifyProjectServiceArea({city,zip,state})},200)}
async function handleProjectCapture(request,env,ctx){
  if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});
  if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);
  if(!env.LEADS_DB)return jsonResponse({error:"Project opportunity storage is not configured"},503);
  const allowance=await durableRateLimit(env.LEADS_DB,request,env,"project-contact-hour",12,60*60);
  if(!allowance.allowed)return jsonResponse({error:"Too many project-contact attempts. Please try again later."},429,{"Retry-After":String(allowance.retryAfter||60)});
  const parsed=await readLimitedJson(request,24_000);
  if(parsed.error)return jsonResponse({error:"Invalid project contact"},400);
  const b=parsed.value||{},projectType=cleanString(b.projectType,20).toLowerCase();
  if(!PROJECT_TYPES.has(projectType))return jsonResponse({error:"Invalid project type"},400);
  const intakeIntent=canonicalProjectIntakeIntent(b.intakeIntent,projectType);
  if(!intakeIntent)return jsonResponse({error:"Invalid Project intake intent"},400);
  const city=cleanString(b.city,120),zip=normalizeProjectZip(b.zip),state=normalizeProjectState(b.state),contact=safeContactPayload(b),source=cleanString(b.source,120)||"start-a-project",journeyId=cleanString(b.journeyId,120);
  const rawDetails=(b.details&&typeof b.details==="object"&&!Array.isArray(b.details))?b.details:{};
  const handymanDetails=intakeIntent==="Small Repair / Handyman"?cleanHandymanDetails(rawDetails):null;
  const category=intakeIntent==="Small Repair / Handyman"?"Small Repairs & Handyman":cleanString(b.category,180);
  const summary=intakeIntent==="Small Repair / Handyman"?handymanSummary(handymanDetails):cleanString(b.summary,2500);
  if(intakeIntent==="Small Repair / Handyman"&&!handymanDetails.handyman.requestedServices.length)return jsonResponse({error:"Select at least one Handyman service"},400);
  if(!city||!zip||!state||!contact.valid||!category||!summary)return jsonResponse({error:"Complete the project basics and provide usable contact information first"},400);
  const area=classifyProjectServiceArea({city,zip,state}),requested=cleanString(b.reference,80),reference=/^EUS-(HOME|RV|SOLAR)-\d{8}-[A-F0-9]{8}$/.test(requested)?requested:projectReference(projectType.toUpperCase()),now=new Date().toISOString(),status=area.serviceArea==="outside_standard_area"?"outside_area_review":"potential",nextAction=area.serviceArea==="outside_standard_area"?"Outside Area Review":"Review Potential Project",incomingDetails={...(handymanDetails||rawDetails),journeyId,intakeIntent},details=await mergeProjectIntakeDetails(env,reference,incomingDetails);
  try{
    await env.LEADS_DB.prepare(`INSERT INTO project_opportunities (reference,project_family,customer_name,phone,email,preferred_contact,consent,city,zip,state,service_area,intake_status,opportunity_status,project_category,summary,source,next_action,details_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(reference) DO UPDATE SET customer_name=excluded.customer_name,phone=excluded.phone,email=excluded.email,preferred_contact=excluded.preferred_contact,consent=excluded.consent,city=excluded.city,zip=excluded.zip,state=excluded.state,service_area=excluded.service_area,intake_status=CASE WHEN project_opportunities.intake_status='submitted' THEN project_opportunities.intake_status ELSE 'contact_captured' END,opportunity_status=CASE WHEN project_opportunities.opportunity_status IS NULL OR project_opportunities.opportunity_status='' OR project_opportunities.opportunity_status IN ('potential','submitted','outside_area_review','new') THEN excluded.opportunity_status ELSE project_opportunities.opportunity_status END,project_category=excluded.project_category,summary=excluded.summary,source=excluded.source,next_action=CASE WHEN project_opportunities.next_action IS NULL OR project_opportunities.next_action='' OR project_opportunities.next_action IN ('Review Potential Project','Review Submitted Project','Outside Area Review') THEN excluded.next_action ELSE project_opportunities.next_action END,details_json=excluded.details_json,updated_at=excluded.updated_at`).bind(reference,projectType,contact.name,contact.phone,contact.email,contact.preferredContact,1,city,zip,state,area.serviceArea,"contact_captured",status,category,summary,source,nextAction,JSON.stringify(details),now,now).run();
  }catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Project opportunity migration is required",migrationRequired:true},503);throw error}
  const ownerNotification=await scheduleOwnerLeadNotification(env,ctx,projectOwnerNotificationSpec({reference,projectType,intakeIntent,contact,category,summary,city,zip,state,serviceArea:area.serviceArea,nextAction,source}));
  return jsonResponse({ok:true,stored:true,reference,projectType,intakeIntent,serviceArea:area.serviceArea,opportunityStatus:status,ownerNotification},201);
}

async function handleProjectContactRequest(request,env,ctx){
  if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});
  if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);
  if(!env.LEADS_DB)return jsonResponse({error:"Lead storage is not configured"},503);
  const allowance=await durableRateLimit(env.LEADS_DB,request,env,"project-contact-request-hour",12,60*60);
  if(!allowance.allowed)return jsonResponse({error:"Too many contact requests. Please try again later."},429,{"Retry-After":String(allowance.retryAfter||60)});
  const parsed=await readLimitedJson(request,24_000);
  if(parsed.error)return jsonResponse({error:"Invalid contact request"},400);
  const b=parsed.value||{},projectType=cleanString(b.projectType,20).toLowerCase();
  if(projectType!=="home")return jsonResponse({error:"Invalid Handyman lead family"},400);
  const intakeIntent=canonicalProjectIntakeIntent(b.intakeIntent,projectType);
  if(intakeIntent!=="Small Repair / Handyman")return jsonResponse({error:"Invalid Handyman intake intent"},400);
  const email=cleanString(b.email,180).toLowerCase(),name=cleanString(b.name,120),state=normalizeProjectState(b.state),city=cleanString(b.city,120),zip=normalizeProjectZip(b.zip),journeyId=cleanString(b.journeyId,120),sessionId=cleanString(b.sessionId,100);
  if(!isValidEmail(email)||!Boolean(b.consent)||!state)return jsonResponse({error:"Valid email, project state and contact permission are required"},400);
  const cleanedDetails=cleanHandymanDetails((b.details&&typeof b.details==="object"&&!Array.isArray(b.details))?b.details:{});
  if(!cleanedDetails.handyman.requestedServices.length)return jsonResponse({error:"Select at least one Handyman service"},400);
  const area=(city&&zip)?classifyProjectServiceArea({city,zip,state}):((state==="CO"||state==="ID")?{serviceArea:"manual_review",reason:"City and ZIP are still needed for final market classification."}:{serviceArea:"outside_standard_area",reason:"Outside standard service state."});
  const requested=cleanString(b.reference,80),reference=/^EUS-HOME-\d{8}-[A-F0-9]{8}$/.test(requested)?requested:projectReference("HOME"),now=new Date().toISOString();
  const incomingDetails={...cleanedDetails,journeyId,intakeIntent,contactRequestedAt:now,leadSource:"Start a Project — Contact Me"},details=await mergeProjectIntakeDetails(env,reference,incomingDetails),summary=handymanSummary(details);
  await env.LEADS_DB.prepare(`INSERT INTO project_opportunities (reference,project_family,customer_name,phone,email,preferred_contact,consent,city,zip,state,service_area,intake_status,opportunity_status,project_category,summary,source,next_action,details_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(reference) DO UPDATE SET customer_name=excluded.customer_name,email=excluded.email,preferred_contact='Email',consent=1,city=CASE WHEN excluded.city<>'' THEN excluded.city ELSE project_opportunities.city END,zip=CASE WHEN excluded.zip<>'' THEN excluded.zip ELSE project_opportunities.zip END,state=excluded.state,service_area=excluded.service_area,intake_status=CASE WHEN project_opportunities.intake_status='submitted' THEN project_opportunities.intake_status ELSE 'Incomplete / Contact Requested' END,opportunity_status=CASE WHEN project_opportunities.opportunity_status IS NULL OR project_opportunities.opportunity_status='' OR project_opportunities.opportunity_status IN ('potential','submitted','outside_area_review','new') THEN 'new' ELSE project_opportunities.opportunity_status END,project_category=excluded.project_category,summary=excluded.summary,source=excluded.source,next_action=CASE WHEN project_opportunities.next_action IS NULL OR project_opportunities.next_action='' OR project_opportunities.next_action IN ('Review Potential Project','Review Submitted Project','Outside Area Review','Email Customer') THEN 'Email Customer' ELSE project_opportunities.next_action END,details_json=excluded.details_json,updated_at=excluded.updated_at`)
    .bind(reference,"home",name,"",email,"Email",1,city,zip,state,area.serviceArea,"Incomplete / Contact Requested","new","Small Repairs & Handyman",summary,"Start a Project — Contact Me","Email Customer",JSON.stringify(details),now,now).run();
  const ownerNotification=await scheduleOwnerLeadNotification(env,ctx,projectOwnerNotificationSpec({reference,projectType:"home",intakeIntent,contact:{name,phone:"",email,preferredContact:"Email"},category:"Small Repairs & Handyman",summary,city,zip,state,serviceArea:area.serviceArea,nextAction:"Email Customer",source:"Start a Project — Contact Me"}));
  if(env.MARKETPLACE_DB&&sessionId){
    await recordSiteEvent(env,{eventType:"lead_submitted",eventValue:"home",sessionId,reference,page:"/start-a-project",details:{projectType:"home",intakeIntent,serviceArea:area.serviceArea,source:"Start a Project — Contact Me",status:"new",journeyReference:journeyId}},{serverConfirmed:true,request}).catch(()=>{});
  }
  return jsonResponse({ok:true,stored:true,reference,projectType:"home",intakeIntent,serviceArea:area.serviceArea,opportunityStatus:"new",nextAction:"Email Customer",intakeStatus:"Incomplete / Contact Requested",ownerNotification},201);
}


async function handleProjectFollowUpRequest(request,env,ctx){
  if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});
  if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);
  if(!env.LEADS_DB)return jsonResponse({error:"Lead storage is not configured"},503);
  const allowance=await durableRateLimit(env.LEADS_DB,request,env,"project-follow-up-request-hour",12,60*60);
  if(!allowance.allowed)return jsonResponse({error:"Too many follow-up requests. Please try again later."},429,{"Retry-After":String(allowance.retryAfter||60)});
  const parsed=await readLimitedJson(request,24_000);
  if(parsed.error)return jsonResponse({error:parsed.error==="too_large"?"Follow-up request is too large":"Invalid follow-up request"},parsed.error==="too_large"?413:400);
  const b=parsed.value||{},projectType=cleanString(b.projectType,20).toLowerCase();
  if(cleanString(b.website,120))return jsonResponse({ok:true,ignored:true,stored:false},200);
  if(!PROJECT_TYPES.has(projectType))return jsonResponse({error:"Choose Home, RV, or Solar so we can route your request correctly"},400);
  const contact=safeContactPayload(b),preferred=contact.preferredContact,helpWith=cleanString(b.helpWith,180),note=cleanString(b.note,1500);
  if(!contact.valid||!helpWith)return jsonResponse({error:"Name, contact permission, a phone number or email, and what you need help with are required"},400);
  if(contact.email&&!isValidEmail(contact.email))return jsonResponse({error:"Enter a valid email address or leave the email field blank"},400);
  if(contact.phone&&!isValidPhone(contact.phone))return jsonResponse({error:"Enter a usable phone number or leave the phone field blank"},400);
  if(preferred==="Email"&&!isValidEmail(contact.email))return jsonResponse({error:"Enter a valid email address or choose phone/text as your preferred contact method"},400);
  if((preferred==="Phone call"||preferred==="Text message")&&!isValidPhone(contact.phone))return jsonResponse({error:"Enter a usable phone number or choose email as your preferred contact method"},400);
  if(!["Phone call","Text message","Email"].includes(preferred))return jsonResponse({error:"Choose a valid preferred contact method"},400);
  const sourcePageRaw=cleanString(b.sourcePage,180),sourcePage=sourcePageRaw.startsWith("/")?sourcePageRaw:"/",journeyId=cleanString(b.journeyId,120),sessionId=cleanString(b.sessionId,100),now=new Date().toISOString();
  const nextAction=preferred==="Email"?"Email Customer":preferred==="Text message"?"Text Customer":"Call Customer";
  const reference=projectReference(projectType.toUpperCase());
  const familyLabel=projectType==="rv"?"RV":projectType==="solar"?"Solar / Off-Grid":"Home";
  const summary=note||`${familyLabel} customer requested follow-up: ${helpWith}.`;
  const source=cleanString(`Have Elevation Follow Up — ${sourcePage}`,120);
  const details={followUpRequest:{helpWith,note,preferredContact:preferred,sourcePage,sourceAction:"Have Elevation Follow Up",journeyId,requestedAt:now}};
  try{
    await env.LEADS_DB.prepare(`INSERT INTO project_opportunities (reference,project_family,customer_name,phone,email,preferred_contact,consent,city,zip,state,service_area,intake_status,opportunity_status,project_category,summary,source,next_action,details_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(reference,projectType,contact.name,contact.phone,contact.email,preferred,1,"","","","manual_review","contact_captured","new",helpWith,summary,source,nextAction,JSON.stringify(details),now,now).run();
  }catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Project opportunity migration is required",migrationRequired:true},503);throw error}
  const ownerNotification=await scheduleOwnerLeadNotification(env,ctx,projectOwnerNotificationSpec({reference,projectType,intakeIntent:"Have Elevation Follow Up",contact,category:helpWith,summary,serviceArea:"manual_review",nextAction,source}));
  if(env.MARKETPLACE_DB&&validAnalyticsSessionId(sessionId)){
    await recordSiteEvent(env,{eventType:"lead_submitted",eventValue:projectType,sessionId,reference,page:sourcePage,details:{projectType,serviceArea:"manual_review",source:"Have Elevation Follow Up",action:"have_elevation_follow_up",method:preferred,journeyReference:journeyId}},{serverConfirmed:true,request}).catch(()=>{});
  }
  return jsonResponse({ok:true,stored:true,reference,projectType,opportunityStatus:"new",nextAction,serviceArea:"manual_review",ownerNotification},201);
}

async function handleProjectHandymanPhotos(request,env){
  if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});
  if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);
  if(!env.LEADS_DB)return jsonResponse({error:"Lead storage is not configured"},503);
  if(!env.LISTING_IMAGES)return jsonResponse({error:"Optional intake photo storage is not configured"},503);
  const allowance=await durableRateLimit(env.LEADS_DB,request,env,"handyman-photo-hour",12,60*60);
  if(!allowance.allowed)return jsonResponse({error:"Too many photo uploads. Please try again later."},429,{"Retry-After":String(allowance.retryAfter||60)});
  const parsed=await parseLimitedMultipartFormData(request,HANDYMAN_MAX_UPLOAD_BYTES,"Handyman photos");
  if(parsed.response)return parsed.response;
  const form=parsed.form,reference=cleanString(form.get("reference"),80);
  if(!/^EUS-HOME-\d{8}-[A-F0-9]{8}$/.test(reference))return jsonResponse({error:"Invalid Lead reference"},400);
  const row=await env.LEADS_DB.prepare("SELECT project_family,details_json FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
  if(!row||cleanString(row.project_family,20).toLowerCase()!=="home")return jsonResponse({error:"Lead not found"},404);
  let details={};try{details=JSON.parse(row.details_json||"{}")}catch(_){}
  if(cleanString(details?.intakeIntent,120)!=="Small Repair / Handyman")return jsonResponse({error:"Photos are only available for the Handyman intake lane"},400);
  const files=form.getAll("photos").filter((file)=>file instanceof File&&file.size);
  if(!files.length)return jsonResponse({ok:true,uploaded:0,reference},200);
  if(files.length>HANDYMAN_MAX_PHOTOS)return jsonResponse({error:`Add no more than ${HANDYMAN_MAX_PHOTOS} optional photos`},400);
  const existingKeys=Array.isArray(details?.handyman?.photoKeys)?details.handyman.photoKeys.filter((key)=>cleanString(key,500).startsWith("lead-intake/")).slice(0,HANDYMAN_MAX_PHOTOS):[];
  if(existingKeys.length+files.length>HANDYMAN_MAX_PHOTOS)return jsonResponse({error:`This Lead can keep up to ${HANDYMAN_MAX_PHOTOS} intake photos`},400);
  for(const file of files){
    if(file.size>HANDYMAN_MAX_PHOTO_BYTES)return jsonResponse({error:"Each optional photo must be smaller than 8 MB"},413);
    if(!(await validMarketplaceImageSignature(file)))return jsonResponse({error:"One or more selected files are not valid JPG, PNG, or WebP images"},400);
  }
  const uploaded=[];
  try{
    for(let i=0;i<files.length;i+=1){
      const file=files[i];
      const prepared=await prepareMarketplaceImage(file,env);
      const key=`lead-intake/${reference}/${crypto.randomUUID()}.${prepared.extension}`;
      await env.LISTING_IMAGES.put(key,prepared.body,{httpMetadata:{contentType:prepared.contentType,cacheControl:"private, max-age=0, no-store"},customMetadata:{leadReference:reference,lane:"handyman",normalized:prepared.normalized?"true":"false"}});
      uploaded.push(key);
    }
    const nextDetails={...details,handyman:{...(details.handyman||{}),photoKeys:[...existingKeys,...uploaded]}};
    await env.LEADS_DB.prepare("UPDATE project_opportunities SET details_json=?,updated_at=? WHERE reference=?").bind(JSON.stringify(nextDetails),new Date().toISOString(),reference).run();
    return jsonResponse({ok:true,uploaded:uploaded.length,reference,totalPhotos:existingKeys.length+uploaded.length},201);
  }catch(error){
    await Promise.all(uploaded.map((key)=>env.LISTING_IMAGES.delete(key).catch(()=>{})));
    return jsonResponse({error:"The Lead is saved, but the optional photos could not be stored"},500);
  }
}

async function handleProjectSubmit(request,env,ctx){
  if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});
  if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);
  if(!env.LEADS_DB)return jsonResponse({error:"Project opportunity storage is not configured"},503);
  const allowance=await durableRateLimit(env.LEADS_DB,request,env,"project-submit-hour",8,60*60);
  if(!allowance.allowed)return jsonResponse({error:"Too many project submissions. Please try again later."},429,{"Retry-After":String(allowance.retryAfter||60)});
  const parsed=await readLimitedJson(request,24_000);
  if(parsed.error)return jsonResponse({error:parsed.error==="too_large"?"Project submission is too large":"Invalid project submission"},parsed.error==="too_large"?413:400);
  const b=parsed.value||{},projectType=cleanString(b.projectType,20).toLowerCase();
  if(!PROJECT_TYPES.has(projectType))return jsonResponse({error:"Invalid project type"},400);
  const intakeIntent=canonicalProjectIntakeIntent(b.intakeIntent,projectType);
  if(!intakeIntent)return jsonResponse({error:"Invalid Project intake intent"},400);
  const city=cleanString(b.city,120),zip=normalizeProjectZip(b.zip),state=normalizeProjectState(b.state),contact=safeContactPayload(b),source=cleanString(b.source,120)||"start-a-project",journeyId=cleanString(b.journeyId,120),sessionId=cleanString(b.sessionId,100);
  const rawDetails=(b.details&&typeof b.details==="object"&&!Array.isArray(b.details))?b.details:{};
  const handymanDetails=intakeIntent==="Small Repair / Handyman"?cleanHandymanDetails(rawDetails):null;
  const category=intakeIntent==="Small Repair / Handyman"?"Small Repairs & Handyman":cleanString(b.category,180);
  const summary=intakeIntent==="Small Repair / Handyman"?handymanSummary(handymanDetails):cleanString(b.summary,2500);
  if(intakeIntent==="Small Repair / Handyman"&&!handymanDetails.handyman.requestedServices.length)return jsonResponse({error:"Select at least one Handyman service"},400);
  if(!city||!zip||!state||!contact.valid||!category||!summary)return jsonResponse({error:"Required project information or usable contact information is missing"},400);
  const area=classifyProjectServiceArea({city,zip,state});
  const requested=cleanString(b.reference,80),reference=/^EUS-(HOME|RV|SOLAR)-\d{8}-[A-F0-9]{8}$/.test(requested)?requested:projectReference(projectType.toUpperCase()),now=new Date().toISOString(),opportunityStatus="new",nextAction=(area.serviceArea==="outside_standard_area"||area.serviceArea==="manual_review")?"Verify Service Area":"Call Customer",incomingDetails={...(handymanDetails||rawDetails),journeyId,intakeIntent},details=await mergeProjectIntakeDetails(env,reference,incomingDetails);
  try{
    await env.LEADS_DB.prepare(`INSERT INTO project_opportunities (reference,project_family,customer_name,phone,email,preferred_contact,consent,city,zip,state,service_area,intake_status,opportunity_status,project_category,summary,source,next_action,details_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(reference) DO UPDATE SET customer_name=excluded.customer_name,phone=excluded.phone,email=excluded.email,preferred_contact=excluded.preferred_contact,consent=excluded.consent,city=excluded.city,zip=excluded.zip,state=excluded.state,service_area=excluded.service_area,intake_status='submitted',opportunity_status=CASE WHEN project_opportunities.opportunity_status IS NULL OR project_opportunities.opportunity_status='' OR project_opportunities.opportunity_status IN ('potential','submitted','outside_area_review','new') THEN excluded.opportunity_status ELSE project_opportunities.opportunity_status END,project_category=excluded.project_category,summary=excluded.summary,source=excluded.source,next_action=CASE WHEN project_opportunities.next_action IS NULL OR project_opportunities.next_action='' OR project_opportunities.next_action IN ('Review Potential Project','Review Submitted Project','Outside Area Review') THEN excluded.next_action ELSE project_opportunities.next_action END,details_json=excluded.details_json,updated_at=excluded.updated_at`).bind(reference,projectType,contact.name,contact.phone,contact.email,contact.preferredContact,contact.consent?1:0,city,zip,state,area.serviceArea,"submitted",opportunityStatus,category,summary,source,nextAction,JSON.stringify(details),now,now).run();
  }catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Project opportunity migration is required",migrationRequired:true},503);throw error}
  const ownerNotification=await scheduleOwnerLeadNotification(env,ctx,projectOwnerNotificationSpec({reference,projectType,intakeIntent,contact,category,summary,city,zip,state,serviceArea:area.serviceArea,nextAction,source}));
  if(env.MARKETPLACE_DB&&sessionId){
    await recordSiteEvent(env,{eventType:"lead_submitted",eventValue:projectType,sessionId,reference,page:"/start-a-project",details:{projectType,intakeIntent,serviceArea:area.serviceArea,source,status:opportunityStatus,journeyReference:journeyId}},{serverConfirmed:true,request}).catch(()=>{});
  }
  return jsonResponse({ok:true,stored:true,reference,projectType,intakeIntent,serviceArea:area.serviceArea,opportunityStatus,ownerNotification},201);
}
function cleanWwuDetails(type,raw={}){const obj=raw&&typeof raw==="object"&&!Array.isArray(raw)?raw:{};const allowed={affiliate:["socialHandle","primaryPlatform","audienceRange","contentCategory"],marketing:["areaOfInterest","experience","portfolioLink"],technician:["trades","yearsExperience","capabilities","certifications","availability","toolsVehicle"],investment:["company","interestType"]}[type]||[];return Object.fromEntries(allowed.map(k=>[k,cleanString(obj[k],k==="experience"||k==="trades"?500:300)]))}
async function handleWorkWithUsSubmit(request,env,ctx){if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);if(!env.LEADS_DB)return jsonResponse({error:"Opportunity storage is not configured"},503);const allowance=await durableRateLimit(env.LEADS_DB,request,env,"wwu-submit-hour",8,60*60);if(!allowance.allowed)return jsonResponse({error:"Too many submissions. Please try again later."},429,{"Retry-After":String(allowance.retryAfter||60)});const parsed=await readLimitedJson(request,24_000);if(parsed.error)return jsonResponse({error:"Invalid Work With Us submission"},400);const b=parsed.value||{},type=cleanString(b.opportunityType,30).toLowerCase(),contact=safeContactPayload({...b,consent:b.consent});if(!WWU_TYPES.has(type)||!contact.name||!isValidEmail(contact.email)||!contact.consent)return jsonResponse({error:"Name, valid email and contact permission are required"},400);if(type==="technician"&&!isValidPhone(contact.phone))return jsonResponse({error:"Technician opportunities require a usable phone number"},400);const reference=projectReference(`WWU-${type.toUpperCase()}`),now=new Date().toISOString(),message=cleanString(b.message,2500);if(!message)return jsonResponse({error:"Please include a short message"},400);const location=cleanString(b.location,180),source=cleanString(b.source,120)||"work-with-us",details=cleanWwuDetails(type,b.details);try{await env.LEADS_DB.prepare(`INSERT INTO work_with_us_opportunities (reference,opportunity_type,name,email,phone,location,preferred_contact,message,details_json,status,next_action,source,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(reference,type,contact.name,contact.email,contact.phone,location,contact.preferredContact,message,JSON.stringify(details),"new","Review Submission",source,now,now).run()}catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Work With Us migration is required",migrationRequired:true},503);throw error}const ownerNotification=await scheduleOwnerLeadNotification(env,ctx,workWithUsOwnerNotificationSpec({reference,type,contact,location,message,source}));if(env.MARKETPLACE_DB&&cleanString(b.sessionId,100)){await recordSiteEvent(env,{eventType:"opportunity_submitted",eventValue:type,sessionId:cleanString(b.sessionId,100),reference,page:"/work-with-us",details:{source,status:"new"}},{serverConfirmed:true,request}).catch(()=>{})}return jsonResponse({ok:true,stored:true,reference,opportunityType:type,status:"new",ownerNotification},201)}

const ADMIN_MARKET_ANALYTICS_RANGES = new Set(["today", "7d", "30d"]);
const ADMIN_MARKET_ANALYTICS_MARKETS = new Set(["all", "treasure_valley", "southern_colorado", "other", "denver_metro", "outside_service_area", "unknown"]);
const VISITOR_MARKET_KEYS = ["treasure_valley", "southern_colorado", "denver_metro", "outside_service_area", "unknown"];

function analyticsTimezoneOffsetMs(date, timeZone = "America/Denver") {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone, hour12: false, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day), Number(values.hour), Number(values.minute), Number(values.second));
  return asUtc - date.getTime();
}

function analyticsStartOfTodayIso(now = new Date()) {
  const timeZone = "America/Denver";
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  const utcGuess = new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day), 0, 0, 0));
  const offset = analyticsTimezoneOffsetMs(utcGuess, timeZone);
  return new Date(utcGuess.getTime() - offset).toISOString();
}

function marketAnalyticsRange(range, now = new Date()) {
  if (range === "today") return { range, start: analyticsStartOfTodayIso(now), end: now.toISOString(), label: "Today" };
  const days = range === "30d" ? 30 : 7;
  return { range, start: new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString(), end: now.toISOString(), label: days === 30 ? "30 Days" : "7 Days" };
}

function marketAnalyticsKeys(market) {
  if (market === "all") return [...VISITOR_MARKET_KEYS];
  if (market === "other") return ["denver_metro", "outside_service_area", "unknown"];
  return [market];
}

function marketAnalyticsLabel(market) {
  return ({
    treasure_valley: "Boise / Treasure Valley",
    southern_colorado: "Colorado Springs / Peyton",
    denver_metro: "Denver Metro",
    outside_service_area: "Outside Service Area",
    unknown: "Unknown / Unclassified",
    other: "Other Service Areas",
    all: "All Markets",
  })[market] || market;
}

function emptyMarketAnalyticsMetric(key) {
  return { key, label: marketAnalyticsLabel(key), websiteSessions: 0, pageViews: 0, startProjectOpens: 0, submittedProjectLeads: 0, visitorLeadConversion: null, activeProjects: 0, unassignedProjects: 0 };
}

function projectMarketAnalyticsKey(projectMarket) {
  if (projectMarket === "outside_standard_area") return "outside_service_area";
  if (projectMarket === "manual_review") return "manual_review";
  if (["treasure_valley", "southern_colorado", "denver_metro"].includes(projectMarket)) return projectMarket;
  return "manual_review";
}

function addMetric(target, source) {
  target.websiteSessions += Number(source.websiteSessions) || 0;
  target.pageViews += Number(source.pageViews) || 0;
  target.startProjectOpens += Number(source.startProjectOpens) || 0;
  target.submittedProjectLeads += Number(source.submittedProjectLeads) || 0;
  target.activeProjects += Number(source.activeProjects) || 0;
  target.unassignedProjects += Number(source.unassignedProjects) || 0;
  target.visitorLeadConversion = target.websiteSessions > 0 ? Math.round((target.submittedProjectLeads / target.websiteSessions) * 1000) / 10 : null;
  return target;
}

async function handleAdminMarketAnalytics(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  const url = new URL(request.url);
  const rangeKey = cleanString(url.searchParams.get("range") || "7d", 10).toLowerCase();
  const marketKey = cleanString(url.searchParams.get("market") || "all", 40).toLowerCase();
  if (!ADMIN_MARKET_ANALYTICS_RANGES.has(rangeKey)) return jsonResponse({ error: "Invalid analytics range" }, 400);
  if (!ADMIN_MARKET_ANALYTICS_MARKETS.has(marketKey)) return jsonResponse({ error: "Invalid analytics market" }, 400);

  const window = marketAnalyticsRange(rangeKey);
  const marketMetrics = Object.fromEntries(VISITOR_MARKET_KEYS.map((key) => [key, emptyMarketAnalyticsMetric(key)]));
  marketMetrics.manual_review = { ...emptyMarketAnalyticsMetric("manual_review"), label: "Location Needs Verification" };
  let projectDataAvailable = false;

  if (env.LEADS_DB && typeof env.LEADS_DB.prepare === "function") {
    try {
      const projectRows = await env.LEADS_DB.prepare("SELECT reference, service_area, opportunity_status, next_action, details_json FROM project_opportunities").all();
      for (const row of projectRows.results || []) {
        const normalizedStatus = projectPipelineStatus(cleanString(row.opportunity_status, 60).toLowerCase());
        if (normalizedStatus === "lost" || normalizedStatus === "closed") continue;
        let details = {};
        try { details = JSON.parse(row.details_json || "{}"); } catch (_) {}
        const assignment = details?.controlCenterAssignment && typeof details.controlCenterAssignment === "object" && !Array.isArray(details.controlCenterAssignment) ? details.controlCenterAssignment : {};
        const assignedMarket = cleanString(assignment.market, 60);
        const market = PROJECT_MARKETS.has(assignedMarket) ? assignedMarket : (PROJECT_MARKETS.has(cleanString(row.service_area, 60)) ? cleanString(row.service_area, 60) : "manual_review");
        const key = projectMarketAnalyticsKey(market);
        if (!marketMetrics[key]) marketMetrics[key] = emptyMarketAnalyticsMetric(key);
        marketMetrics[key].activeProjects += 1;
        if (!cleanString(assignment.assignedRepresentative, 120)) marketMetrics[key].unassignedProjects += 1;
      }
      projectDataAvailable = true;
    } catch (error) {
      console.error(JSON.stringify({ event: "admin_market_analytics_project_count_error", message: error instanceof Error ? error.message : String(error) }));
    }
  }

  if (!env.MARKETPLACE_DB || typeof env.MARKETPLACE_DB.prepare !== "function") {
    const other = emptyMarketAnalyticsMetric("other");
    ["denver_metro", "outside_service_area", "unknown"].forEach((key) => addMetric(other, marketMetrics[key]));
    addMetric(other, marketMetrics.manual_review);
    return jsonResponse({
      ok: false, available: false, source: "D1 eus_site_events", range: window, selectedMarket: marketKey,
      reason: "analytics_store_unavailable", projectDataAvailable,
      markets: { ...marketMetrics, other },
      privacyNote: "Visitor geography is approximate and based on network location. Project Market is determined separately from the submitted service address.",
      build: OPERATIONS_BUILD,
    }, 200, { "Cache-Control": "private, max-age=30" });
  }

  try {
    const visitorExpr = "COALESCE(NULLIF(json_extract(details_json, '$.visitorMarket'), ''), 'unknown')";
    const rows = await env.MARKETPLACE_DB.prepare(`SELECT ${visitorExpr} AS visitor_market,
      COUNT(DISTINCT session_hash) AS website_sessions,
      SUM(CASE WHEN event_type='page_view' THEN 1 ELSE 0 END) AS page_views,
      SUM(CASE WHEN event_type='start_project_open' THEN 1 ELSE 0 END) AS start_project_opens,
      SUM(CASE WHEN event_type IN ('lead_submitted','project_submit') THEN 1 ELSE 0 END) AS submitted_project_leads
      FROM eus_site_events
      WHERE created_at>=? AND created_at<=?
        AND ${visitorExpr} IN ('treasure_valley','southern_colorado','denver_metro','outside_service_area','unknown')
      GROUP BY visitor_market`).bind(window.start, window.end).all();

    for (const row of rows.results || []) {
      const key = cleanString(row.visitor_market, 60);
      if (!marketMetrics[key]) continue;
      marketMetrics[key].websiteSessions = Math.max(0, Number(row.website_sessions) || 0);
      marketMetrics[key].pageViews = Math.max(0, Number(row.page_views) || 0);
      marketMetrics[key].startProjectOpens = Math.max(0, Number(row.start_project_opens) || 0);
      marketMetrics[key].submittedProjectLeads = Math.max(0, Number(row.submitted_project_leads) || 0);
      marketMetrics[key].visitorLeadConversion = marketMetrics[key].websiteSessions > 0 ? Math.round((marketMetrics[key].submittedProjectLeads / marketMetrics[key].websiteSessions) * 1000) / 10 : null;
    }

    const overallRow = await env.MARKETPLACE_DB.prepare(`SELECT
      COUNT(DISTINCT session_hash) AS website_sessions,
      SUM(CASE WHEN event_type='page_view' THEN 1 ELSE 0 END) AS page_views,
      SUM(CASE WHEN event_type='start_project_open' THEN 1 ELSE 0 END) AS start_project_opens,
      SUM(CASE WHEN event_type IN ('lead_submitted','project_submit') THEN 1 ELSE 0 END) AS submitted_project_leads
      FROM eus_site_events WHERE created_at>=? AND created_at<=?`).bind(window.start, window.end).first();

    const collectionRow = await env.MARKETPLACE_DB.prepare(`SELECT MIN(created_at) AS first_event_at,
      MIN(CASE WHEN json_extract(details_json, '$.visitorMarket') IS NOT NULL AND json_extract(details_json, '$.visitorMarket')<>'' THEN created_at END) AS market_geography_at
      FROM eus_site_events`).first();

    const topPagesRows = await env.MARKETPLACE_DB.prepare(`SELECT page, COUNT(*) AS views FROM eus_site_events
      WHERE created_at>=? AND created_at<=? AND event_type='page_view'
      GROUP BY page ORDER BY views DESC, page ASC LIMIT 5`).bind(window.start, window.end).all();

    let topFamilyRows = await env.MARKETPLACE_DB.prepare(`SELECT event_value AS family, COUNT(*) AS total FROM eus_site_events
      WHERE created_at>=? AND created_at<=? AND event_type IN ('lead_submitted','project_submit') AND event_value IN ('home','rv','solar')
      GROUP BY event_value ORDER BY total DESC, family ASC LIMIT 3`).bind(window.start, window.end).all();
    let topFamilySource = "submitted_project_leads";
    if (!(topFamilyRows.results || []).length) {
      topFamilyRows = await env.MARKETPLACE_DB.prepare(`SELECT event_value AS family, COUNT(DISTINCT session_hash) AS total FROM eus_site_events
        WHERE created_at>=? AND created_at<=? AND event_type IN ('project_type_selected','project_family_selected') AND event_value IN ('home','rv','solar')
        GROUP BY event_value ORDER BY total DESC, family ASC LIMIT 3`).bind(window.start, window.end).all();
      topFamilySource = "project_family_selected";
    }

    const other = emptyMarketAnalyticsMetric("other");
    ["denver_metro", "outside_service_area", "unknown"].forEach((key) => addMetric(other, marketMetrics[key]));
    other.activeProjects += marketMetrics.manual_review.activeProjects;
    other.unassignedProjects += marketMetrics.manual_review.unassignedProjects;

    const overallSessions = Math.max(0, Number(overallRow?.website_sessions) || 0);
    const overallLeads = Math.max(0, Number(overallRow?.submitted_project_leads) || 0);
    const marketBySessions = [marketMetrics.treasure_valley, marketMetrics.southern_colorado, other].sort((a, b) => b.websiteSessions - a.websiteSessions)[0];
    const overall = {
      websiteSessions: overallSessions,
      pageViews: Math.max(0, Number(overallRow?.page_views) || 0),
      startProjectOpens: Math.max(0, Number(overallRow?.start_project_opens) || 0),
      submittedProjectLeads: overallLeads,
      visitorLeadConversion: overallSessions > 0 ? Math.round((overallLeads / overallSessions) * 1000) / 10 : null,
      topMarket: marketBySessions && marketBySessions.websiteSessions > 0 ? { key: marketBySessions.key, label: marketBySessions.label, websiteSessions: marketBySessions.websiteSessions } : null,
      topProjectFamily: (topFamilyRows.results || [])[0] ? { family: cleanString(topFamilyRows.results[0].family, 20), count: Math.max(0, Number(topFamilyRows.results[0].total) || 0), source: topFamilySource } : null,
      topPages: (topPagesRows.results || []).map((row) => ({ page: analyticsPath(row.page || "/"), views: Math.max(0, Number(row.views) || 0) })),
    };

    const allMarkets = { ...marketMetrics, other };
    const selectedKeys = marketAnalyticsKeys(marketKey);
    const selected = marketKey === "all" ? overall : (marketKey === "other" ? other : allMarkets[marketKey]);
    const selectedBreakdown = Object.fromEntries(selectedKeys.filter((key) => allMarkets[key]).map((key) => [key, allMarkets[key]]));

    const payload = {
      ok: true, available: true, source: "D1 eus_site_events", range: window, selectedMarket: marketKey,
      collection: { firstEventAt: cleanString(collectionRow?.first_event_at, 80) || null, marketGeographyAt: cleanString(collectionRow?.market_geography_at, 80) || null, historicalGeographyBackfill: false },
      overall, selected, markets: allMarkets, selectedBreakdown, projectDataAvailable,
      analyticsEngine: "disabled_deferred", webAnalytics: "independent_cloudflare_layer",
      privacyNote: "Visitor geography is approximate and based on network location. Project Market is determined separately from the submitted service address.",
      build: OPERATIONS_BUILD,
    };
    return request.method === "HEAD" ? new Response(null, { status: 200, headers: { "Cache-Control": "private, max-age=30" } }) : jsonResponse(payload, 200, { "Cache-Control": "private, max-age=30" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(JSON.stringify({ event: "admin_market_analytics_error", message }));
    const other = emptyMarketAnalyticsMetric("other");
    ["denver_metro", "outside_service_area", "unknown"].forEach((key) => addMetric(other, marketMetrics[key]));
    other.activeProjects += marketMetrics.manual_review.activeProjects;
    other.unassignedProjects += marketMetrics.manual_review.unassignedProjects;
    return jsonResponse({
      ok: false, available: false, source: "D1 eus_site_events", range: window, selectedMarket: marketKey,
      reason: /no such table/i.test(message) ? "analytics_table_unavailable" : "analytics_query_failed",
      projectDataAvailable, markets: { ...marketMetrics, other },
      privacyNote: "Visitor geography is approximate and based on network location. Project Market is determined separately from the submitted service address.",
      build: OPERATIONS_BUILD,
    }, 200, { "Cache-Control": "private, max-age=30" });
  }
}

function projectAdminRecord(row){let details={};try{details=JSON.parse(row.details_json||"{}")}catch(_){}const storedStatus=cleanString(row.opportunity_status,60).toLowerCase(),storedNextAction=cleanString(row.next_action,120),pipelineStatus=projectPipelineStatus(storedStatus),pipelineNextAction=projectPipelineNextAction(storedNextAction,row.service_area),assignment=details?.controlCenterAssignment&&typeof details.controlCenterAssignment==="object"&&!Array.isArray(details.controlCenterAssignment)?details.controlCenterAssignment:{},serviceMarket=PROJECT_MARKETS.has(cleanString(row.service_area,60))?cleanString(row.service_area,60):"manual_review",assignedMarket=cleanString(assignment.market,60),market=PROJECT_MARKETS.has(assignedMarket)?assignedMarket:serviceMarket,assignedRepresentative=cleanString(assignment.assignedRepresentative,120),record=projectControlRecord(details),portal=projectPortalRecord(details),conversations=projectConversations(details),portalHandoffReady=pipelineStatus==="won"&&portal.status!=="in_portal";return{reference:row.reference,family:row.project_family,name:row.customer_name,phone:row.phone,email:row.email,preferredContact:row.preferred_contact,consent:Boolean(row.consent),city:row.city,zip:row.zip,state:row.state,serviceArea:row.service_area,market,marketSource:PROJECT_MARKETS.has(assignedMarket)?"management":"intake",assignedRepresentative,intakeStatus:row.intake_status,status:storedStatus,nextAction:storedNextAction,pipelineStatus,pipelineNextAction,legacyPipelineMapped:storedStatus!==pipelineStatus||storedNextAction!==pipelineNextAction,category:row.project_category,summary:row.summary,priority:record.priority,timingUrgency:record.timingUrgency,internalNotes:record.internalNotes,conversations,portalStatus:portal.status,portalProjectId:portal.projectId,portalMarkedAt:portal.markedAt,portalMarkedBy:portal.markedBy,portalUpdatedAt:portal.updatedAt,portalUpdatedBy:portal.updatedBy,portalHandoffReady,source:row.source,details,ownerNotification:ownerNotificationSummary(details),createdAt:row.created_at,updatedAt:row.updated_at}}
function wwuAdminRecord(row){let details={};try{details=JSON.parse(row.details_json||"{}")}catch(_){}return{reference:row.reference,type:row.opportunity_type,name:row.name,email:row.email,phone:row.phone,location:row.location,preferredContact:row.preferred_contact,message:row.message,details,ownerNotification:ownerNotificationSummary(details),status:row.status,nextAction:row.next_action,source:row.source,createdAt:row.created_at,updatedAt:row.updated_at}}
const DELETE_LEAD_CONFIRMATION="Are you sure you want to delete this lead?";
function projectLeadDeleteBlock(row){
  let details={};try{details=JSON.parse(row?.details_json||"{}")}catch(_){}
  if(!details||typeof details!=="object"||Array.isArray(details))details={};
  const portal=projectPortalRecord(details),status=projectPipelineStatus(cleanString(row?.opportunity_status,60).toLowerCase());
  if(status==="won")return "Converted / WON leads cannot be deleted.";
  if(portal.status==="in_portal"||portal.projectId||portal.markedAt||portal.markedBy)return "Portal-linked leads cannot be deleted.";
  return "";
}
async function handleAdminOpportunities(request,env){
  const auth=await requireAdmin(request,env);if(auth.response)return auth.response;
  if(!env.LEADS_DB)return jsonResponse({error:"LEADS_DB is not configured"},503);
  if(request.method==="POST"){
    if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);
    const parsed=await readLimitedJson(request,16_000);if(parsed.error)return jsonResponse({error:"Invalid manual Lead request"},400);
    const body=parsed.value||{},action=cleanString(body.action,60).toLowerCase();
    if(action!=="create_manual_lead")return jsonResponse({error:"Invalid manual Lead action"},400);
    const customerName=cleanString(body.customerName,180),phone=cleanString(body.phone,80),email=cleanString(body.email,180).toLowerCase(),projectFamily=cleanString(body.projectFamily,20).toLowerCase(),category=cleanString(body.category,180),market=cleanString(body.market,60),assignedRepresentative=cleanString(body.assignedRepresentative,120),priority=cleanString(body.priority,30).toLowerCase()||"normal",summary=cleanString(body.summary,2500),timingUrgency=cleanString(body.timingUrgency,500),internalNotes=cleanString(body.internalNotes,5000),city=cleanString(body.city,120),rawZip=cleanString(body.zip,20),zip=normalizeProjectZip(rawZip),rawState=cleanString(body.state,20),state=normalizeProjectState(rawState),preferredKey=cleanString(body.preferredContact,30).toLowerCase(),now=new Date().toISOString(),adminEmail=cleanString(auth.session?.email,180);
    if(!customerName)return jsonResponse({error:"Customer name is required"},400);
    if(phone&&!isValidPhone(phone))return jsonResponse({error:"Invalid Lead phone"},400);
    if(email&&!isValidEmail(email))return jsonResponse({error:"Invalid Lead email"},400);
    if(!phone&&!email)return jsonResponse({error:"Lead requires a phone or email"},400);
    if(!PROJECT_TYPES.has(projectFamily))return jsonResponse({error:"Invalid Project family"},400);
    if(!category)return jsonResponse({error:"Project category is required"},400);
    if(!PROJECT_MARKETS.has(market))return jsonResponse({error:"Invalid Project market"},400);
    if(!PROJECT_RECORD_PRIORITIES.has(priority))return jsonResponse({error:"Invalid Project priority"},400);
    if(rawZip&&!zip)return jsonResponse({error:"Invalid Lead ZIP"},400);
    if(rawState&&!state)return jsonResponse({error:"Invalid Lead state"},400);
    const preferredContact=preferredKey==="email"&&email?"Email":preferredKey==="text"&&phone?"Text":preferredKey==="phone"&&phone?"Phone":phone?"Phone":"Email";
    const nextAction=preferredContact==="Email"?"Email Customer":preferredContact==="Text"?"Text Customer":"Call Customer";
    const locationClassification=classifyProjectServiceArea({city,zip,state}),serviceArea=locationClassification.serviceArea;
    const reference=projectReference(projectFamily.toUpperCase()),conversationNote=cleanString(body.conversationNote,5000),conversationChannel=cleanString(body.conversationChannel,30).toLowerCase();
    if(conversationNote&&!PROJECT_CONVERSATION_CHANNELS.has(conversationChannel))return jsonResponse({error:"Invalid conversation channel"},400);
    const details={
      manualEntry:{createdAt:now,createdBy:adminEmail,consentCaptured:false,locationClassificationReason:locationClassification.reason},
      controlCenterAssignment:{market,assignedRepresentative,updatedAt:now,updatedBy:adminEmail},
      controlCenterRecord:{priority,timingUrgency,internalNotes,updatedAt:now,updatedBy:adminEmail},
      portalBridge:{status:"not_in_portal",projectId:"",markedAt:"",markedBy:"",updatedAt:now,updatedBy:adminEmail},
      controlCenterConversations:conversationNote?[{id:crypto.randomUUID(),channel:conversationChannel,note:conversationNote,occurredAt:now,createdAt:now,createdBy:adminEmail}]:[],
    };
    try{
      await env.LEADS_DB.prepare(`INSERT INTO project_opportunities (reference,project_family,customer_name,phone,email,preferred_contact,consent,city,zip,state,service_area,intake_status,opportunity_status,project_category,summary,source,next_action,details_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(reference,projectFamily,customerName,phone,email,preferredContact,0,city,zip,state,serviceArea,"manual_entry","new",category,summary||`${category} Lead entered in Mission Control.`,"Command Center — Manual Entry",nextAction,JSON.stringify(details),now,now).run();
      const row=await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
      return jsonResponse({ok:true,created:true,family:"projects",action:"create_manual_lead",opportunity:projectAdminRecord(row)},201);
    }catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Lead storage migration required",migrationRequired:true},503);throw error}
  }
  if(request.method==="DELETE"){
    if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);
    const parsed=await readLimitedJson(request,4_000);if(parsed.error)return jsonResponse({error:"Invalid Delete Lead request"},400);
    const body=parsed.value||{},reference=cleanString(body.reference,80),action=cleanString(body.action,60).toLowerCase(),confirmation=cleanString(body.confirmation,200);
    if(action!=="delete_lead"||confirmation!==DELETE_LEAD_CONFIRMATION)return jsonResponse({error:"Delete Lead confirmation is required"},400);
    if(!/^EUS-(HOME|RV|SOLAR)-\d{8}-[A-F0-9]{7,8}$/.test(reference))return jsonResponse({error:"Invalid Lead reference"},400);
    try{
      const current=await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
      if(!current)return jsonResponse({error:"Lead not found"},404);
      const blocked=projectLeadDeleteBlock(current);if(blocked)return jsonResponse({error:blocked,blocked:true},409);
      let details={};try{details=JSON.parse(current.details_json||"{}")}catch(_){}
      const photoKeys=Array.isArray(details?.handyman?.photoKeys)?details.handyman.photoKeys.map((key)=>cleanString(key,500)).filter((key)=>key.startsWith(`lead-intake/${reference}/`)).slice(0,HANDYMAN_MAX_PHOTOS):[];
      const isSolar=cleanString(current.project_family,20).toLowerCase()==="solar"||reference.startsWith("EUS-SOLAR-");
      let result,solarCleanup=isSolar?"pending":"not_applicable";
      if(isSolar){
        const deleteActivity=env.LEADS_DB.prepare("DELETE FROM solar_lead_activity WHERE reference=?").bind(reference);
        const deleteTechnical=env.LEADS_DB.prepare("DELETE FROM solar_leads WHERE reference=?").bind(reference);
        const deletePrimary=env.LEADS_DB.prepare("DELETE FROM project_opportunities WHERE reference=?").bind(reference);
        if(typeof env.LEADS_DB.batch==="function"){
          const results=await env.LEADS_DB.batch([deleteActivity,deleteTechnical,deletePrimary]);
          result=results?.[2];
        }else{
          await deleteActivity.run();
          await deleteTechnical.run();
          result=await deletePrimary.run();
        }
        solarCleanup="complete";
      }else{
        result=await env.LEADS_DB.prepare("DELETE FROM project_opportunities WHERE reference=?").bind(reference).run();
      }
      if(!Number(result?.meta?.changes||0))return jsonResponse({error:"Lead not found"},404);
      let photoCleanup=photoKeys.length?"pending":"not_applicable";
      if(photoKeys.length&&env.LISTING_IMAGES){
        try{await env.LISTING_IMAGES.delete(photoKeys);photoCleanup="complete"}catch(error){photoCleanup="failed";console.error(JSON.stringify({event:"delete_lead_photo_cleanup_error",reference,message:error instanceof Error?error.message:String(error)}))}
      }else if(photoKeys.length){photoCleanup="unconfigured"}
      return jsonResponse({ok:true,deleted:true,reference,photoCleanup,solarCleanup},200);
    }catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Lead storage migration required",migrationRequired:true},503);throw error}
  }
  if(request.method==="PATCH"){
    if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);
    const parsed=await readLimitedJson(request,8_000);if(parsed.error)return jsonResponse({error:"Invalid opportunity update"},400);
    const body=parsed.value||{},reference=cleanString(body.reference,80),status=cleanString(body.status,60).toLowerCase(),nextAction=cleanString(body.nextAction,120),now=new Date().toISOString();
    try{
      if(/^EUS-(HOME|RV|SOLAR)-\d{8}-[A-F0-9]{7,8}$/.test(reference)){
        const current=await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
        if(!current)return jsonResponse({error:"Project opportunity not found"},404);
        let details={};try{details=JSON.parse(current.details_json||"{}")}catch(_){}
        if(!details||typeof details!=="object"||Array.isArray(details))details={};
        const adminEmail=cleanString(auth.session?.email,180),action=cleanString(body.action,60).toLowerCase();
        if(action==="append_conversation"){
          const channel=cleanString(body.channel,30).toLowerCase(),note=cleanString(body.note,5000),rawOccurredAt=cleanString(body.occurredAt,80),occurredAt=projectConversationTimestamp(rawOccurredAt,now);
          if(!PROJECT_CONVERSATION_CHANNELS.has(channel))return jsonResponse({error:"Invalid conversation channel"},400);
          if(!note)return jsonResponse({error:"Conversation note is required"},400);
          if(rawOccurredAt&&!projectConversationTimestamp(rawOccurredAt))return jsonResponse({error:"Invalid conversation date"},400);
          const conversations=projectConversations(details);
          conversations.push({id:crypto.randomUUID(),channel,note,occurredAt,createdAt:now,createdBy:adminEmail});
          details.controlCenterConversations=conversations.slice(-100);
          const result=await env.LEADS_DB.prepare("UPDATE project_opportunities SET details_json=?,updated_at=? WHERE reference=?").bind(JSON.stringify(details),now,reference).run();
          if(!Number(result?.meta?.changes||0))return jsonResponse({error:"Project opportunity not found"},404);
          const row=await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
          return jsonResponse({ok:true,family:"projects",action:"append_conversation",opportunity:projectAdminRecord(row)},200);
        }
        if(action==="mark_in_portal"){
          const priorPortal=projectPortalRecord(details),projectId=cleanString(body.portalProjectId,120);
          details.portalBridge={...priorPortal,status:"in_portal",projectId:projectId||priorPortal.projectId,markedAt:priorPortal.markedAt||now,markedBy:priorPortal.markedBy||adminEmail,updatedAt:now,updatedBy:adminEmail};
          const result=await env.LEADS_DB.prepare("UPDATE project_opportunities SET details_json=?,updated_at=? WHERE reference=?").bind(JSON.stringify(details),now,reference).run();
          if(!Number(result?.meta?.changes||0))return jsonResponse({error:"Project opportunity not found"},404);
          const row=await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
          return jsonResponse({ok:true,family:"projects",action:"mark_in_portal",opportunity:projectAdminRecord(row)},200);
        }
        const market=cleanString(body.market,60),assignedRepresentative=cleanString(body.assignedRepresentative,120);
        if(!PROJECT_PIPELINE_STATUSES.has(status))return jsonResponse({error:"Invalid Project status"},400);
        if(!PROJECT_PIPELINE_NEXT_ACTIONS.has(nextAction))return jsonResponse({error:"Invalid Project next action"},400);
        if(!PROJECT_MARKETS.has(market))return jsonResponse({error:"Invalid Project market"},400);
        const priorAssignment=details.controlCenterAssignment&&typeof details.controlCenterAssignment==="object"&&!Array.isArray(details.controlCenterAssignment)?details.controlCenterAssignment:{};
        details.controlCenterAssignment={...priorAssignment,market,assignedRepresentative,updatedAt:now,updatedBy:adminEmail};
        if(action==="save_project_record"){
          const customerName=cleanString(body.customerName,180),phone=cleanString(body.phone,80),email=cleanString(body.email,180).toLowerCase(),projectFamily=cleanString(body.projectFamily,20).toLowerCase(),category=cleanString(body.category,180),summary=cleanString(body.summary,2500),priority=cleanString(body.priority,30).toLowerCase(),timingUrgency=cleanString(body.timingUrgency,500),internalNotes=cleanString(body.internalNotes,5000),portalStatus=cleanString(body.portalStatus,40).toLowerCase(),portalProjectId=cleanString(body.portalProjectId,120);
          const currentFamily=cleanString(current.project_family,20).toLowerCase(),allowNamelessSolar=currentFamily==="solar"&&projectFamily==="solar";
          if(!customerName&&!allowNamelessSolar)return jsonResponse({error:"Customer name is required"},400);
          if(phone&&!isValidPhone(phone))return jsonResponse({error:"Invalid Project phone"},400);
          if(email&&!isValidEmail(email))return jsonResponse({error:"Invalid Project email"},400);
          if(!phone&&!email)return jsonResponse({error:"Project requires a phone or email"},400);
          if(!PROJECT_TYPES.has(projectFamily))return jsonResponse({error:"Invalid Project family"},400);
          if(!category)return jsonResponse({error:"Project category is required"},400);
          if(!PROJECT_RECORD_PRIORITIES.has(priority))return jsonResponse({error:"Invalid Project priority"},400);
          if(!PROJECT_PORTAL_STATUSES.has(portalStatus))return jsonResponse({error:"Invalid Portal status"},400);
          const priorRecord=projectControlRecord(details),priorPortal=projectPortalRecord(details),enteringPortal=portalStatus==="in_portal"&&priorPortal.status!=="in_portal";
          details.controlCenterRecord={...priorRecord,priority,timingUrgency,internalNotes,updatedAt:now,updatedBy:adminEmail};
          details.portalBridge={...priorPortal,status:portalStatus,projectId:portalProjectId,markedAt:enteringPortal?(priorPortal.markedAt||now):priorPortal.markedAt,markedBy:enteringPortal?(priorPortal.markedBy||adminEmail):priorPortal.markedBy,updatedAt:now,updatedBy:adminEmail};
          const result=await env.LEADS_DB.prepare("UPDATE project_opportunities SET customer_name=?,phone=?,email=?,project_family=?,project_category=?,summary=?,opportunity_status=?,next_action=?,details_json=?,updated_at=? WHERE reference=?").bind(customerName,phone,email,projectFamily,category,summary,status,nextAction,JSON.stringify(details),now,reference).run();
          if(!Number(result?.meta?.changes||0))return jsonResponse({error:"Project opportunity not found"},404);
          const row=await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
          return jsonResponse({ok:true,family:"projects",action:"save_project_record",opportunity:projectAdminRecord(row)},200);
        }
        const result=await env.LEADS_DB.prepare("UPDATE project_opportunities SET opportunity_status=?,next_action=?,details_json=?,updated_at=? WHERE reference=?").bind(status,nextAction,JSON.stringify(details),now,reference).run();
        if(!Number(result?.meta?.changes||0))return jsonResponse({error:"Project opportunity not found"},404);
        const row=await env.LEADS_DB.prepare("SELECT * FROM project_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
        return jsonResponse({ok:true,family:"projects",opportunity:projectAdminRecord(row)},200);
      }
      if(/^EUS-WWU-(AFFILIATE|MARKETING|TECHNICIAN|INVESTMENT)-\d{8}-[A-F0-9]{8}$/.test(reference)){
        if(!WWU_STATUSES.has(status))return jsonResponse({error:"Invalid Work With Us status"},400);
        if(!WWU_NEXT_ACTIONS.has(nextAction))return jsonResponse({error:"Invalid Work With Us next action"},400);
        const result=await env.LEADS_DB.prepare("UPDATE work_with_us_opportunities SET status=?,next_action=?,updated_at=? WHERE reference=?").bind(status,nextAction,now,reference).run();
        if(!Number(result?.meta?.changes||0))return jsonResponse({error:"Work With Us opportunity not found"},404);
        const row=await env.LEADS_DB.prepare("SELECT * FROM work_with_us_opportunities WHERE reference=? LIMIT 1").bind(reference).first();
        return jsonResponse({ok:true,family:"work",opportunity:wwuAdminRecord(row)},200);
      }
      return jsonResponse({error:"Invalid opportunity reference"},400);
    }catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Opportunity migration required",migrationRequired:true},503);throw error}
  }
  if(request.method!=="GET"&&request.method!=="HEAD")return jsonResponse({error:"Method not allowed"},405,{Allow:"GET, HEAD, POST, PATCH, DELETE"});
  try{const [projects,work]=await Promise.all([env.LEADS_DB.prepare("SELECT * FROM project_opportunities ORDER BY created_at DESC LIMIT 300").all(),env.LEADS_DB.prepare("SELECT * FROM work_with_us_opportunities ORDER BY created_at DESC LIMIT 300").all()]);const payload={ok:true,projectPipeline:{statuses:[...PROJECT_PIPELINE_STATUSES],nextActions:[...PROJECT_PIPELINE_NEXT_ACTIONS],markets:[...PROJECT_MARKETS],legacyMigration:"on_save_only",assignmentStorage:"details_json",projectRecordStorage:"details_json",conversationStorage:"details_json",conversationChannels:[...PROJECT_CONVERSATION_CHANNELS],portalBridgeStorage:"details_json",portalStatuses:[...PROJECT_PORTAL_STATUSES]},projects:(projects.results||[]).map(projectAdminRecord),workWithUs:(work.results||[]).map(wwuAdminRecord)};return request.method==="HEAD"?new Response(null,{status:200,headers:{"Cache-Control":"no-store"}}):jsonResponse(payload,200)}catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Opportunity migration required",migrationRequired:true},503);throw error}
}
async function createSolarQaToken(env){const secret=cleanString(env.ADMIN_SESSION_SECRET,500);if(!secret)throw new Error("ADMIN_SESSION_SECRET is not configured.");const expiresAt=Date.now()+30*60*1000;const payload=stringToBase64Url(JSON.stringify({purpose:"solar-qa",exp:expiresAt,nonce:crypto.randomUUID()}));const signature=await hmacSignature(secret,payload);return{token:`${payload}.${signature}`,expiresAt:new Date(expiresAt).toISOString()}}
async function verifySolarQaToken(token,env){const value=cleanString(token,1600),secret=cleanString(env.ADMIN_SESSION_SECRET,500);if(!value||!secret)return false;const [payload,signature,extra]=value.split(".");if(!payload||!signature||extra)return false;const expected=await hmacSignature(secret,payload);if(!timingSafeEqualStrings(signature,expected))return false;try{const p=JSON.parse(base64UrlToString(payload));return p?.purpose==="solar-qa"&&Number(p.exp)>Date.now()}catch(_){return false}}
async function handleAdminSolarQaToken(request,env){const auth=await requireAdmin(request,env);if(auth.response)return auth.response;if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);return jsonResponse({ok:true,...await createSolarQaToken(env)})}
async function handleSolarQaValidate(request,env){if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);let body;try{body=await request.json()}catch(_){body={}};if(!await verifySolarQaToken(body.qaToken,env))return jsonResponse({valid:false,error:"Solar QA link is invalid or expired"},403);const suffix=crypto.randomUUID().split("-")[0].toUpperCase();return jsonResponse({valid:true,reference:`QA-SOLAR-${suffix}`,journeyId:`qa-journey-${suffix}`,contact:{name:"QA Solar Tester",firstName:"QA",phone:"2085550199",email:"qa-solar-test@example.invalid",preferred:"Email",consent:true,location:"TEST — DO NOT PUBLISH",rv:"TEST — DO NOT PUBLISH",timing:"QA",installLocation:"QA",available:"QA",details:"TEST — DO NOT PUBLISH"}},200)}

async function handleRetiredLegacyMarketplaceImport(request) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  return jsonResponse({ error: "Legacy marketplace import was retired in v3.2.1" }, 410);
}


export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === SOLAR_NOTIFY_PATH) {
      return handleSolarNotification(request, env, ctx);
    }

    if (url.pathname === HEALTH_PATH) return handleHealth(request, env);
    if (url.pathname === MARKETPLACE_HEALTH_PATH) return handleMarketplaceHealth(request, env);
    if (url.pathname === MARKETPLACE_EVENT_PATH) return handleMarketplaceEvent(request, env, ctx);
    if (url.pathname === SITE_EVENT_PATH || url.pathname === LEGACY_SITE_EVENT_PATH) return handleSiteEvent(request, env);
    if (url.pathname === PROJECT_CLASSIFY_PATH) return handleProjectClassify(request);
    if (url.pathname === PROJECT_CAPTURE_PATH) return handleProjectCapture(request, env, ctx);
    if (url.pathname === PROJECT_CONTACT_REQUEST_PATH) return handleProjectContactRequest(request, env, ctx);
    if (url.pathname === PROJECT_FOLLOWUP_REQUEST_PATH) return handleProjectFollowUpRequest(request, env, ctx);
    if (url.pathname === PROJECT_HANDYMAN_PHOTOS_PATH) return handleProjectHandymanPhotos(request, env);
    if (url.pathname === PROJECT_SUBMIT_PATH) return handleProjectSubmit(request, env, ctx);
    if (url.pathname === WORK_WITH_US_SUBMIT_PATH) return handleWorkWithUsSubmit(request, env, ctx);
    if (url.pathname === MARKETPLACE_SUBMIT_PATH) return handleMarketplaceSubmit(request, env);
    if (url.pathname === MARKETPLACE_PUBLIC_PATH) return handleMarketplacePublicListings(request, env);
    if (url.pathname.startsWith(MARKETPLACE_IMAGE_PREFIX)) return handleMarketplaceImage(request, env, url.pathname);
    if (url.pathname.startsWith(MARKETPLACE_CONTACT_PREFIX)) return handleMarketplaceContact(request, env, url.pathname);
    if (url.pathname.startsWith(MARKETPLACE_SHARE_PREFIX)) return handleMarketplaceShare(request, env, url.pathname);
    if (url.pathname === MARKETPLACE_REPORT_ISSUE_PATH) return handleMarketplaceIssueReport(request, env);
    if (url.pathname === ADMIN_LOGIN_PATH) return handleAdminLogin(request, env);
    if (url.pathname === ADMIN_LOGOUT_PATH) return handleAdminLogout(request, env);
    if (url.pathname === ADMIN_SESSION_PATH) return handleAdminSession(request, env);
    if (url.pathname === ADMIN_IMPORT_LEGACY_PATH) return handleRetiredLegacyMarketplaceImport(request);
    if (url.pathname === ADMIN_OPERATIONS_PATH) return handleAdminOperations(request, env);
    if (url.pathname === ADMIN_MARKET_ANALYTICS_PATH) return handleAdminMarketAnalytics(request, env);
    if (url.pathname === ADMIN_OPPORTUNITIES_PATH) return handleAdminOpportunities(request, env);
    if (url.pathname === ADMIN_SOLAR_QA_TOKEN_PATH) return handleAdminSolarQaToken(request, env);
    if (url.pathname === SOLAR_QA_VALIDATE_PATH) return handleSolarQaValidate(request, env);
    if (url.pathname === ADMIN_LEADS_PATH || url.pathname.startsWith(`${ADMIN_LEADS_PATH}/`)) return handleAdminLeads(request, env, url.pathname);
    if (url.pathname === ADMIN_MARKETPLACE_FOLLOWUPS_PATH || url.pathname.startsWith(`${ADMIN_MARKETPLACE_FOLLOWUPS_PATH}/`)) return handleAdminMarketplaceFollowups(request, env, url.pathname);
    if (url.pathname === MARKETPLACE_QA_VALIDATE_PATH) return handleMarketplaceQaValidate(request, env);
    if (url.pathname === ADMIN_QA_TOKEN_PATH) return handleAdminQaToken(request, env);
    if (url.pathname === ADMIN_MARKETPLACE_ISSUES_PATH) return handleAdminMarketplaceIssues(request, env);
    if (url.pathname === ADMIN_LISTINGS_PATH || url.pathname.startsWith(`${ADMIN_LISTINGS_PATH}/`)) return handleAdminListings(request, env, url.pathname);

    if (url.pathname === "/api/store-products") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
      }

      try {
        const response = await getCatalog(request);
        return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
      } catch (error) {
        console.error(JSON.stringify({ event: "store_catalog_error", message: error instanceof Error ? error.message : String(error) }));
        return Response.json(
          { error: "The live catalog is temporarily unavailable." },
          { status: 502, headers: { "Cache-Control": "no-store", ...API_SECURITY_HEADERS, "X-EUS-Store-Build": STORE_BUILD } },
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
