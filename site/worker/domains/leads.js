import * as core from "../core-context.js";

const {
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
} = core;

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

export {
  handleAdminLeads,
  handleAdminOpportunities,
  handleProjectCapture,
  handleProjectClassify,
  handleProjectContactRequest,
  handleProjectFollowUpRequest,
  handleProjectHandymanPhotos,
  handleProjectSubmit
};
