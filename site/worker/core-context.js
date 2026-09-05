import {
  API_SECURITY_HEADERS,
  HTML_SECURITY_HEADERS,
  jsonResponse,
} from "./shared/response.js";
import { escapeHtml, jsonForInlineScript } from "./shared/html.js";
import {
  cleanList,
  cleanString,
  configuredEmail,
  hasBasicContact,
  hasEarlySolarContact,
  isValidEmail,
  isValidPhone,
} from "./shared/validation.js";
import {
  sanitizeBuild,
  sanitizeContact,
  sanitizeSolarMilestone,
} from "./shared/solar-sanitizers.js";

const SHOP_ORIGIN = "https://elevationupscales-shop.fourthwall.com";
const PUBLIC_ORIGIN = "https://elevationupscales.com";
const MAX_PAGES = 10;
const MAX_PAGE_BYTES = 2_000_000;
const STORE_BUILD = "3.0.3";
const OPERATIONS_BUILD = "3.11.30-store-navigation-repair";

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
const ADMIN_INVENTORY_PATH = "/api/admin/inventory";
const PUBLIC_INVENTORY_PATH = "/api/store-inventory";
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
  "store_open", "store_section_view", "store_category_select", "store_search_used", "store_sort_changed", "store_destination_click", "store_product_click",
  "work_with_us_open", "opportunity_type_selected", "opportunity_form_started", "opportunity_submitted",
  "homepage_sok_open", "sok_catalog_view", "sok_catalog_filter", "sok_product_view", "sok_media_view", "purchase_options_open", "purchase_inquiry_start", "purchase_inquiry_submit", "hawaii_options_open", "commercial_review_route", "add_to_cart", "checkout_start", "solar_builder_sok_cta"
]);
const SITE_INTENT_SERVER_ONLY_EVENT_TYPES = new Set(["lead_submitted","opportunity_submitted","solar_contact_captured","solar_lead_created","solar_build_started","solar_review_opened","solar_completed_submitted"]);
const SITE_INTENT_CLIENT_EVENT_TYPES = new Set([...SITE_INTENT_EVENT_TYPES].filter((type) => !SITE_INTENT_SERVER_ONLY_EVENT_TYPES.has(type)));
const SITE_ANALYTICS_APPROVED_EVENTS = new Set([
  "session_start", "page_view", "start_project_open", "project_family_selected", "project_submit",
  "solar_builder_open", "work_with_us_open", "marketplace_open", "listing_interest",
  "store_open", "store_destination_click"
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
  const allowedStrings = new Set(["package", "classification", "projectType", "intakeIntent", "serviceArea", "source", "status", "journeyReference", "contactMethod", "visitorMarket", "cta_id", "source_page", "contact_method", "build", "buildReference", "builderStage", "builderStep", "milestone", "destination", "section", "category", "product", "referrerHost", "utmSource", "utmMedium", "utmCampaign"]);
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

const INVENTORY_STATUSES = new Set(["active", "paused", "archived"]);
const INVENTORY_FULFILLMENT_MODES = new Set(["tracked", "supplier_managed", "dropship", "pod"]);
const INVENTORY_MAX_BODY_BYTES = 24 * 1024;

function inventoryInteger(value, fallback = 0, max = 1_000_000_000) {
  if (value === undefined || value === null || value === "") return fallback;
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(0, Math.min(max, Math.round(number)));
}

function inventoryMoneyCents(value, fallback = 0) {
  return inventoryInteger(value, fallback, 100_000_000_000);
}

function inventoryString(value, max = 180) {
  return cleanString(value, max);
}

function inventoryUrl(value) {
  const raw = inventoryString(value, 700);
  if (!raw) return "";
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : "";
  } catch (_) {
    return "";
  }
}

function inventoryChannels(value) {
  const raw = Array.isArray(value) ? value : String(value || "").split(",");
  const channels = [...new Set(raw.map((item) => inventoryString(item, 50).toLowerCase()).filter(Boolean))].slice(0, 12);
  return JSON.stringify(channels);
}

function inventoryChannelsFromRow(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed.map((item) => inventoryString(item, 50)).filter(Boolean) : [];
  } catch (_) {
    return [];
  }
}

async function ensureInventorySchema(db) {
  if (!db || typeof db.prepare !== "function") throw new Error("Inventory database is not configured");
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_inventory_items (
    id TEXT PRIMARY KEY,
    sku TEXT NOT NULL COLLATE NOCASE UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    supplier TEXT NOT NULL DEFAULT 'other',
    fulfillment_mode TEXT NOT NULL DEFAULT 'tracked',
    supplier_product_id TEXT NOT NULL DEFAULT '',
    source_url TEXT NOT NULL DEFAULT '',
    sales_channels_json TEXT NOT NULL DEFAULT '[]',
    cost_cents INTEGER NOT NULL DEFAULT 0,
    price_cents INTEGER NOT NULL DEFAULT 0,
    quantity_on_hand INTEGER NOT NULL DEFAULT 0,
    quantity_reserved INTEGER NOT NULL DEFAULT 0,
    reorder_point INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    notes TEXT NOT NULL DEFAULT '',
    version INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL DEFAULT ''
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_inventory_events (
    id TEXT PRIMARY KEY,
    item_id TEXT NOT NULL,
    sku TEXT NOT NULL DEFAULT '',
    action TEXT NOT NULL,
    quantity_before INTEGER NOT NULL DEFAULT 0,
    quantity_after INTEGER NOT NULL DEFAULT 0,
    reserved_before INTEGER NOT NULL DEFAULT 0,
    reserved_after INTEGER NOT NULL DEFAULT 0,
    details_json TEXT NOT NULL DEFAULT '{}',
    admin_email TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_eus_inventory_items_updated ON eus_inventory_items(updated_at DESC)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_eus_inventory_events_item ON eus_inventory_events(item_id, created_at DESC)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_eus_inventory_events_created ON eus_inventory_events(created_at DESC)").run();
}

function inventoryRow(row) {
  if (!row) return null;
  const onHand = inventoryInteger(row.quantity_on_hand, 0);
  const reserved = inventoryInteger(row.quantity_reserved, 0);
  const available = Math.max(0, onHand - reserved);
  const mode = INVENTORY_FULFILLMENT_MODES.has(String(row.fulfillment_mode || "")) ? row.fulfillment_mode : "tracked";
  const reorderPoint = inventoryInteger(row.reorder_point, 0);
  return {
    id: inventoryString(row.id, 100),
    sku: inventoryString(row.sku, 80),
    name: inventoryString(row.name, 180),
    category: inventoryString(row.category, 100),
    supplier: inventoryString(row.supplier, 100),
    fulfillmentMode: mode,
    supplierProductId: inventoryString(row.supplier_product_id, 180),
    sourceUrl: inventoryString(row.source_url, 700),
    salesChannels: inventoryChannelsFromRow(row.sales_channels_json),
    costCents: inventoryMoneyCents(row.cost_cents, 0),
    priceCents: inventoryMoneyCents(row.price_cents, 0),
    quantityOnHand: onHand,
    quantityReserved: reserved,
    quantityAvailable: available,
    reorderPoint,
    lowStock: mode === "tracked" && String(row.status) === "active" && available <= reorderPoint,
    status: INVENTORY_STATUSES.has(String(row.status || "")) ? row.status : "active",
    notes: inventoryString(row.notes, 4000),
    version: inventoryInteger(row.version, 1, 2_000_000_000),
    createdAt: inventoryString(row.created_at, 80),
    updatedAt: inventoryString(row.updated_at, 80),
    updatedBy: inventoryString(row.updated_by, 180),
  };
}

function inventoryEventRow(row) {
  let details = {};
  try { details = JSON.parse(row?.details_json || "{}"); } catch (_) {}
  return {
    id: inventoryString(row?.id, 100),
    itemId: inventoryString(row?.item_id, 100),
    sku: inventoryString(row?.sku, 80),
    action: inventoryString(row?.action, 80),
    quantityBefore: inventoryInteger(row?.quantity_before, 0),
    quantityAfter: inventoryInteger(row?.quantity_after, 0),
    reservedBefore: inventoryInteger(row?.reserved_before, 0),
    reservedAfter: inventoryInteger(row?.reserved_after, 0),
    details,
    adminEmail: inventoryString(row?.admin_email, 180),
    createdAt: inventoryString(row?.created_at, 80),
  };
}

async function inventoryLog(db, { itemId, sku, action, quantityBefore = 0, quantityAfter = 0, reservedBefore = 0, reservedAfter = 0, details = {}, adminEmail = "" }) {
  const id = `inv_evt_${crypto.randomUUID()}`;
  const createdAt = new Date().toISOString();
  await db.prepare(`INSERT INTO eus_inventory_events
    (id,item_id,sku,action,quantity_before,quantity_after,reserved_before,reserved_after,details_json,admin_email,created_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`).bind(
      id, inventoryString(itemId, 100), inventoryString(sku, 80), inventoryString(action, 80),
      inventoryInteger(quantityBefore), inventoryInteger(quantityAfter), inventoryInteger(reservedBefore), inventoryInteger(reservedAfter),
      JSON.stringify(details || {}), inventoryString(adminEmail, 180), createdAt,
    ).run();
  return createdAt;
}

async function inventorySnapshot(db) {
  const [itemsResult, eventsResult, revisionRow] = await Promise.all([
    db.prepare("SELECT * FROM eus_inventory_items ORDER BY CASE status WHEN 'active' THEN 0 WHEN 'paused' THEN 1 ELSE 2 END, updated_at DESC, name COLLATE NOCASE ASC LIMIT 2000").all(),
    db.prepare("SELECT * FROM eus_inventory_events ORDER BY created_at DESC LIMIT 60").all(),
    db.prepare("SELECT COUNT(*) AS count, MAX(updated_at) AS updated_at, COALESCE(SUM(version),0) AS version_sum FROM eus_inventory_items").first(),
  ]);
  const items = (itemsResult?.results || []).map(inventoryRow);
  const active = items.filter((item) => item.status === "active");
  const tracked = active.filter((item) => item.fulfillmentMode === "tracked");
  const stats = {
    activeSkus: active.length,
    trackedSkus: tracked.length,
    onHand: tracked.reduce((sum, item) => sum + item.quantityOnHand, 0),
    reserved: tracked.reduce((sum, item) => sum + item.quantityReserved, 0),
    available: tracked.reduce((sum, item) => sum + item.quantityAvailable, 0),
    lowStock: tracked.filter((item) => item.lowStock).length,
    inventoryValueCents: tracked.reduce((sum, item) => sum + (item.quantityAvailable * item.costCents), 0),
  };
  return {
    items,
    stats,
    recentEvents: (eventsResult?.results || []).map(inventoryEventRow),
    revision: `${inventoryString(revisionRow?.updated_at, 80) || "empty"}:${Number(revisionRow?.count || 0)}:${Number(revisionRow?.version_sum || 0)}`,
    syncedAt: new Date().toISOString(),
    build: OPERATIONS_BUILD,
  };
}

async function inventoryReadBody(request) {
  const parsed = await readLimitedJson(request, INVENTORY_MAX_BODY_BYTES);
  if (parsed.error === "too_large") return { response: jsonResponse({ error: "Inventory request is too large" }, 413) };
  if (parsed.error) return { response: jsonResponse({ error: "Invalid inventory request" }, 400) };
  return { body: parsed.value || {} };
}


function publicInventoryRecord(row) {
  const item = inventoryRow(row);
  if (!item) return null;
  const channels = item.salesChannels || [];
  const tracked = item.fulfillmentMode === "tracked";
  const available = tracked ? item.quantityAvailable : null;
  const fallback = new URL("https://www.ebay.com/sch/i.html");
  fallback.searchParams.set("_ssn", "elevationupscalesshop");
  fallback.searchParams.set("_nkw", item.name);
  let buyUrl = fallback.toString();
  if (item.sourceUrl) {
    try {
      const source = new URL(item.sourceUrl);
      const host = source.hostname.toLowerCase();
      if (host === "ebay.com" || host === "www.ebay.com" || host === "elevationupscales.com" || host.endsWith(".elevationupscales.com")) buyUrl = source.toString();
    } catch (_) {}
  }
  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    category: item.category || "RV & Outdoor",
    priceCents: item.priceCents,
    fulfillmentMode: item.fulfillmentMode,
    quantityAvailable: available,
    availability: tracked ? (available > 0 ? "In Stock" : "Out of Stock") : "Available from supplier",
    salesChannels: channels,
    buyUrl,
    updatedAt: item.updatedAt,
  };
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
function cleanWwuDetails(type,raw={}){const obj=raw&&typeof raw==="object"&&!Array.isArray(raw)?raw:{};const allowed={affiliate:["socialHandle","primaryPlatform","audienceRange","contentCategory"],marketing:["areaOfInterest","experience","portfolioLink"],technician:["trades","yearsExperience","capabilities","certifications","availability","toolsVehicle"],investment:["company","interestType"]}[type]||[];return Object.fromEntries(allowed.map(k=>[k,cleanString(obj[k],k==="experience"||k==="trades"?500:300)]))}
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
async function createSolarQaToken(env){const secret=cleanString(env.ADMIN_SESSION_SECRET,500);if(!secret)throw new Error("ADMIN_SESSION_SECRET is not configured.");const expiresAt=Date.now()+30*60*1000;const payload=stringToBase64Url(JSON.stringify({purpose:"solar-qa",exp:expiresAt,nonce:crypto.randomUUID()}));const signature=await hmacSignature(secret,payload);return{token:`${payload}.${signature}`,expiresAt:new Date(expiresAt).toISOString()}}
async function verifySolarQaToken(token,env){const value=cleanString(token,1600),secret=cleanString(env.ADMIN_SESSION_SECRET,500);if(!value||!secret)return false;const [payload,signature,extra]=value.split(".");if(!payload||!signature||extra)return false;const expected=await hmacSignature(secret,payload);if(!timingSafeEqualStrings(signature,expected))return false;try{const p=JSON.parse(base64UrlToString(payload));return p?.purpose==="solar-qa"&&Number(p.exp)>Date.now()}catch(_){return false}}

export {
  SHOP_ORIGIN,
  PUBLIC_ORIGIN,
  MAX_PAGES,
  MAX_PAGE_BYTES,
  STORE_BUILD,
  OPERATIONS_BUILD,
  SOLAR_NOTIFY_PATH,
  SOLAR_NOTIFY_MAX_BYTES,
  DEFAULT_SOLAR_EMAIL_TO,
  NOTIFICATION_ARCHITECTURE_VERSION,
  NOTIFICATION_PROVIDER_GMAIL_ENABLED,
  NOTIFICATION_TYPES,
  API_SECURITY_HEADERS,
  HTML_SECURITY_HEADERS,
  jsonResponse,
  escapeHtml,
  jsonForInlineScript,
  cleanString,
  cleanList,
  sanitizeBuild,
  sanitizeContact,
  isValidEmail,
  configuredEmail,
  isValidPhone,
  hasBasicContact,
  hasEarlySolarContact,
  sanitizeSolarMilestone,
  eventHeading,
  buildEmailText,
  rateLimitSolarNotification,
  leadStatus,
  SOLAR_LEAD_STAGES,
  SOLAR_LEAD_PRIORITIES,
  SOLAR_CALL_STATUSES,
  parseJsonObject,
  leadClassificationFromEvent,
  leadIntentFromEvent,
  leadStageLabel,
  isActionableSolarLead,
  solarLeadRecord,
  recordSolarLeadActivity,
  updateSolarLeadOperationalClassification,
  saveLead,
  safeSolarProjectContext,
  solarBuilderStage,
  solarBuilderComponents,
  solarProjectOpportunityRow,
  solarContactFromOpportunity,
  solarProjectDetails,
  syncSolarProjectOpportunity,
  solarOwnerNotificationSpec,
  notificationDefinition,
  notificationTransportState,
  sanitizedNotificationFailure,
  sendNotification,
  sendSolarEmail,
  ownerLeadNotificationConfig,
  ownerNotificationMap,
  readOwnerNotificationState,
  writeOwnerNotificationState,
  ownerNotificationSummary,
  deliverOwnerLeadNotification,
  scheduleOwnerLeadNotification,
  projectOwnerNotificationSpec,
  workWithUsOwnerNotificationSpec,
  recordSolarFunnelStage,
  extractProducts,
  fetchCatalogPage,
  getCatalog,
  MARKETPLACE_SUBMIT_PATH,
  MARKETPLACE_PUBLIC_PATH,
  MARKETPLACE_IMAGE_PREFIX,
  MARKETPLACE_CONTACT_PREFIX,
  MARKETPLACE_SHARE_PREFIX,
  MARKETPLACE_EVENT_PATH,
  SITE_EVENT_PATH,
  LEGACY_SITE_EVENT_PATH,
  MARKETPLACE_HEALTH_PATH,
  HEALTH_PATH,
  ADMIN_LOGIN_PATH,
  ADMIN_LOGOUT_PATH,
  ADMIN_SESSION_PATH,
  ADMIN_LISTINGS_PATH,
  ADMIN_MARKETPLACE_ISSUES_PATH,
  ADMIN_OPERATIONS_PATH,
  ADMIN_LEADS_PATH,
  ADMIN_MARKETPLACE_FOLLOWUPS_PATH,
  ADMIN_QA_TOKEN_PATH,
  MARKETPLACE_QA_VALIDATE_PATH,
  MARKETPLACE_REPORT_ISSUE_PATH,
  ADMIN_IMPORT_LEGACY_PATH,
  PROJECT_CLASSIFY_PATH,
  PROJECT_SUBMIT_PATH,
  PROJECT_CAPTURE_PATH,
  PROJECT_CONTACT_REQUEST_PATH,
  PROJECT_FOLLOWUP_REQUEST_PATH,
  PROJECT_HANDYMAN_PHOTOS_PATH,
  WORK_WITH_US_SUBMIT_PATH,
  ADMIN_OPPORTUNITIES_PATH,
  ADMIN_MARKET_ANALYTICS_PATH,
  ADMIN_SOLAR_QA_TOKEN_PATH,
  ADMIN_INVENTORY_PATH,
  PUBLIC_INVENTORY_PATH,
  SOLAR_QA_VALIDATE_PATH,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_MARKETPLACE_EMAIL_TO,
  MARKETPLACE_MAX_IMAGE_BYTES,
  MARKETPLACE_MAX_TOTAL_BYTES,
  MARKETPLACE_MAX_ADMIN_PHOTOS,
  MARKETPLACE_ALLOWED_CATEGORIES,
  MARKETPLACE_US_STATE_CODES,
  MARKETPLACE_ADMIN_STATUSES,
  ADMIN_LOGIN_MAX_ATTEMPTS,
  ADMIN_LOGIN_MAX_BYTES,
  SECURITY_LIMIT_CLEANUP_GRACE_SECONDS,
  ADMIN_LOGIN_WINDOW_SECONDS,
  MARKETPLACE_CONTACT_THROTTLE_SECONDS,
  MARKETPLACE_CONTACT_HOURLY_LIMIT,
  MARKETPLACE_CONTACT_DAILY_LIMIT,
  MARKETPLACE_SUBMIT_HOURLY_LIMIT,
  MARKETPLACE_SUBMIT_DAILY_LIMIT,
  ADMIN_SINGLE_PHOTO_MAX_TOTAL_BYTES,
  MARKETPLACE_ANALYTICS_EVENT_TYPES,
  MARKETPLACE_ANALYTICS_HOURLY_LIMIT,
  MARKETPLACE_ANALYTICS_MAX_BYTES,
  SITE_INTENT_EVENT_TYPES,
  SITE_INTENT_SERVER_ONLY_EVENT_TYPES,
  SITE_INTENT_CLIENT_EVENT_TYPES,
  SITE_ANALYTICS_APPROVED_EVENTS,
  SITE_ANALYTICS_EVENT_ALIASES,
  SITE_INTENT_MAX_BYTES,
  FOLLOWUP_STATUSES,
  FOLLOWUP_DEFAULT_SUBJECT,
  FOLLOWUP_DEFAULT_BODY,
  sameOriginRequest,
  marketplaceCookie,
  bytesToBase64Url,
  stringToBase64Url,
  base64UrlToString,
  hmacSignature,
  timingSafeEqualStrings,
  createAdminSession,
  readAdminSession,
  requireAdmin,
  securityClientKey,
  cleanupExpiredSecurityLimits,
  durableRateLimit,
  marketplaceRateLimit,
  clearDurableRateLimit,
  adminLoginAttempt,
  validMarketplaceImageSignature,
  prepareMarketplaceImage,
  marketplaceSchemaStatus,
  normalizeMarketplaceCategory,
  marketplaceField,
  parseLimitedMultipartFormData,
  marketplacePhotoSlots,
  marketplaceMinimumPhotos,
  marketplaceCategoryFields,
  marketplaceItemType,
  marketplaceListingTitleParts,
  marketplaceListingTitle,
  marketplaceReference,
  marketplaceImageExtension,
  sendMarketplaceEmail,
  marketplaceSubmissionText,
  marketplaceSubmissionIssueReference,
  recordMarketplaceSubmissionIssue,
  marketplaceSubmissionIssueRecord,
  createMarketplaceQaToken,
  verifyMarketplaceQaToken,
  marketplaceQaTestFromRow,
  solarLeadOperationsSchemaStatus,
  leadActionDueState,
  leadSummaryAndPipeline,
  solarTrendDays,
  solarLeadTrend,
  validLeadDue,
  isClosedSolarLeadStage,
  getSolarLeadRow,
  updateSolarPrimaryOperations,
  normalizeMarketplaceContactEmail,
  marketplaceFollowupTitle,
  marketplaceFollowupPosting,
  marketplaceFollowupSchemaStatus,
  ensureMarketplaceFollowupContact,
  marketplaceFollowupTemplate,
  marketplaceFollowupRegistry,
  recordMarketplaceFollowupHistory,
  marketplaceFollowupLeadPhone,
  marketplaceFollowupDuplicateLead,
  copyMarketplaceFollowupToLead,
  marketplacePublicRecord,
  getMarketplaceRow,
  getMarketplaceRowWithViews,
  sanitizeSiteEventDetails,
  recordSiteEvent,
  validAnalyticsSessionId,
  analyticsSessionHash,
  analyticsPath,
  analyticsHost,
  analyticsCampaign,
  visitorMarketBucket,
  recordSiteAnalyticsPoint,
  recordMarketplaceAnalyticsPoint,
  recordMarketplaceEvent,
  notifyMarketplaceBuyerIntent,
  readLimitedJson,
  marketplaceContactAllowed,
  marketplaceSharePage,
  INVENTORY_STATUSES,
  INVENTORY_FULFILLMENT_MODES,
  INVENTORY_MAX_BODY_BYTES,
  inventoryInteger,
  inventoryMoneyCents,
  inventoryString,
  inventoryUrl,
  inventoryChannels,
  inventoryChannelsFromRow,
  ensureInventorySchema,
  inventoryRow,
  inventoryEventRow,
  inventoryLog,
  inventorySnapshot,
  inventoryReadBody,
  publicInventoryRecord,
  marketplaceAdminRecord,
  adminLog,
  marketplacePhotoKeys,
  validateMarketplaceAdminPhoto,
  adjustedFeaturedAfterDelete,
  updateMarketplacePhotoRecord,
  PROJECT_TYPES,
  PROJECT_INTAKE_INTENTS,
  HANDYMAN_SERVICE_CATALOG,
  HANDYMAN_MAX_PHOTOS,
  HANDYMAN_MAX_PHOTO_BYTES,
  HANDYMAN_MAX_UPLOAD_BYTES,
  cleanHandymanDetails,
  handymanSummary,
  canonicalProjectIntakeIntent,
  SERVICE_AREAS,
  WWU_TYPES,
  WWU_STATUSES,
  WWU_NEXT_ACTIONS,
  PROJECT_PIPELINE_STATUSES,
  PROJECT_PIPELINE_NEXT_ACTIONS,
  PROJECT_MARKETS,
  PROJECT_RECORD_PRIORITIES,
  PROJECT_PORTAL_STATUSES,
  PROJECT_CONVERSATION_CHANNELS,
  projectControlRecord,
  projectPortalRecord,
  projectConversationTimestamp,
  projectConversations,
  publicProjectDetails,
  mergeProjectIntakeDetails,
  projectPipelineStatus,
  projectPipelineNextAction,
  TREASURE_VALLEY_CITIES,
  SOUTHERN_COLORADO_CITIES,
  DENVER_METRO_CITIES,
  TREASURE_VALLEY_ZIPS,
  SOUTHERN_COLORADO_ZIPS,
  DENVER_METRO_ZIPS,
  normalizeLocationToken,
  normalizeProjectState,
  normalizeProjectZip,
  rawServiceAreaFromZip,
  serviceAreaFromZip,
  serviceAreaFromCity,
  classifyProjectServiceArea,
  projectReference,
  safeContactPayload,
  cleanWwuDetails,
  ADMIN_MARKET_ANALYTICS_RANGES,
  ADMIN_MARKET_ANALYTICS_MARKETS,
  VISITOR_MARKET_KEYS,
  analyticsTimezoneOffsetMs,
  analyticsStartOfTodayIso,
  marketAnalyticsRange,
  marketAnalyticsKeys,
  marketAnalyticsLabel,
  emptyMarketAnalyticsMetric,
  projectMarketAnalyticsKey,
  addMetric,
  projectAdminRecord,
  wwuAdminRecord,
  DELETE_LEAD_CONFIRMATION,
  projectLeadDeleteBlock,
  createSolarQaToken,
  verifySolarQaToken
};
