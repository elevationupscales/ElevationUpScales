import * as core from "../core-context.js";
import { handleHealth } from "./system.js";

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

export {
  handleAdminOperations
};
