import {
  OPERATIONS_BUILD,
  DEFAULT_SOLAR_EMAIL_TO,
  jsonResponse,
  cleanString,
  isValidEmail,
  HEALTH_PATH,
  requireAdmin,
  solarLeadOperationsSchemaStatus,
  analyticsPath,
} from "../core-context.js";
import { handleHealth } from "./system.js";

async function handleAdminOperations(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  }

  // Marketplace is retired from active operations. MARKETPLACE_DB remains the
  // historical/website-event store, but Marketplace listing tables are no
  // longer queried by the routine Command Center refresh path.
  let d1 = env.MARKETPLACE_DB ? "configured" : "unconfigured";
  const r2 = "retired";
  let leadsDb = env.LEADS_DB ? "configured" : "unconfigured";
  let leadTableRetrieval = "unknown";
  let leadAdminRetrieval = "unknown";
  let leadSchemaReady = "unknown";
  let leadActivityReady = "unknown";
  let leadSchemaMissing = [];

  const businessSignals = {
    contactAttempts: 0,
    followUpActions: 0,
    callActions: 0,
    textActions: 0,
    emailActions: 0,
    submittedLeads: 0,
    contactActionSources: [],
    analyticsCollection: "unavailable",
    sellerContactAttempts: 0,
    buyerContactRate: 0,
    listingInterests: 0,
    builderEntries: 0,
    powerSnapshotViews: 0,
    reviewOpens: 0,
    submittedSolarLeads: 0,
    builderLeadConversion: 0,
    homeProjectInterest: 0,
    rvProjectInterest: 0,
    solarProjectInterest: 0,
    submissionFailures: 0,
    highIntentLeads: 0,
    actionRequired: 0,
    followUpsDue: 0,
  };

  if (env.MARKETPLACE_DB) {
    try {
      await env.MARKETPLACE_DB.prepare("SELECT 1 AS ok").first();
      d1 = "ok";
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

        businessSignals.contactAttempts = Number(signalRow?.contact_attempts) || 0;
        businessSignals.followUpActions = Number(signalRow?.follow_up_actions) || 0;
        businessSignals.callActions = Number(signalRow?.call_actions) || 0;
        businessSignals.textActions = Number(signalRow?.text_actions) || 0;
        businessSignals.emailActions = Number(signalRow?.email_actions) || 0;
        businessSignals.analyticsCollection = "ok";
        businessSignals.builderEntries = Number(signalRow?.builder_entries) || 0;
        businessSignals.solarBuilderOpened = Number(signalRow?.solar_builder_opened) || 0;
        businessSignals.solarContactCaptured = Number(signalRow?.solar_contact_captured) || 0;
        businessSignals.solarLeadCreated = Number(signalRow?.solar_lead_created) || 0;
        businessSignals.solarBuildStarted = Number(signalRow?.solar_build_started) || 0;
        businessSignals.solarReviewOpened = Number(signalRow?.solar_review_opened) || 0;
        businessSignals.solarCompletedSubmitted = Number(signalRow?.solar_completed_submitted) || 0;
        businessSignals.powerSnapshotViews = Number(signalRow?.snapshot_views) || 0;
        businessSignals.reviewOpens = Number(signalRow?.review_opens) || 0;
        const trackedLeads = Number(signalRow?.tracked_solar_leads) || 0;
        businessSignals.builderLeadConversion = businessSignals.builderEntries > 0
          ? Math.round((trackedLeads / businessSignals.builderEntries) * 1000) / 10
          : 0;
        businessSignals.homeProjectInterest = Number(signalRow?.home_interest) || 0;
        businessSignals.rvProjectInterest = Number(signalRow?.rv_interest) || 0;
        businessSignals.solarProjectInterest = Number(signalRow?.solar_interest) || 0;
      } catch (error) {
        console.error(JSON.stringify({ event: "admin_business_signal_error", message: error instanceof Error ? error.message : String(error) }));
      }

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
        businessSignals.contactActionSources = (sourceRows.results || []).map((row) => ({
          method: cleanString(row.method, 20),
          page: analyticsPath(row.page || "/"),
          ctaId: cleanString(row.cta_id, 120) || "legacy/unattributed",
          build: cleanString(row.event_build, 100),
          count: Math.max(0, Number(row.count) || 0),
          uniqueSessions: Math.max(0, Number(row.unique_sessions) || 0),
        }));
      } catch (error) {
        console.error(JSON.stringify({ event: "admin_contact_action_sources_error", message: error instanceof Error ? error.message : String(error) }));
      }
    } catch (error) {
      d1 = "error";
      console.error(JSON.stringify({ event: "admin_operations_d1_error", message: error instanceof Error ? error.message : String(error) }));
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
        businessSignals.submittedLeads = Math.max(0, Number(submittedLeadSignal?.count) || 0);
      } catch (error) {
        console.error(JSON.stringify({ event: "admin_submitted_leads_signal_error", message: error instanceof Error ? error.message : String(error) }));
      }

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
            JOIN project_opportunities p ON p.reference=s.reference AND lower(p.project_family)='solar'`)
            .bind(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()).first();
          businessSignals.submittedSolarLeads = Number(leadSignal?.submitted_total) || 0;
          businessSignals.highIntentLeads = Number(leadSignal?.high_intent) || 0;
          businessSignals.actionRequired = Number(leadSignal?.action_required) || 0;
          businessSignals.followUpsDue = Number(leadSignal?.followups_due) || 0;
        } catch (error) {
          console.error(JSON.stringify({ event: "admin_lead_signal_error", message: error instanceof Error ? error.message : String(error) }));
        }
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
  const marketplaceNotifications = "retired";
  const solarNotifications = Boolean(
    isValidEmail(cleanString(env.SOLAR_EMAIL_TO || DEFAULT_SOLAR_EMAIL_TO, 180)) &&
    isValidEmail(cleanString(env.SOLAR_EMAIL_FROM, 180)) &&
    emailTransport
  ) ? "configured" : "unconfigured";
  const notifications = solarNotifications === "configured" ? "configured" : "attention";
  const backend = d1 === "ok" ? "ok" : "degraded";
  const leadCore = leadsDb === "ok" && leadTableRetrieval === "ok" && leadSchemaReady === "ok" && leadActivityReady === "ok" && leadAdminRetrieval === "ok" ? "ok" : "degraded";
  const coreOperational = backend === "ok" && leadCore === "ok";

  const health = {
    status: coreOperational ? (notifications === "configured" && publicHealth === "ok" ? "ok" : "operational") : "degraded",
    reason: leadCore !== "ok" && (leadSchemaReady === "migration_required" || leadActivityReady === "migration_required")
      ? "v3.3.7 lead migration is required; legacy Solar storage may still be available."
      : (coreOperational && notifications !== "configured" ? "Notifications require attention; lead storage is healthy." : ""),
    publicHealth,
    publicHealthServices,
    backend,
    d1,
    r2,
    leadsDb,
    leadTableRetrieval,
    leadAdminRetrieval,
    leadSchemaReady,
    leadActivityReady,
    leadSchemaMissing,
    leadCore,
    notifications,
    marketplaceNotifications,
    solarNotifications,
    marketplaceRetired: true,
    build: OPERATIONS_BUILD,
  };

  const summary = {
    pending: 0,
    published: 0,
    unresolvedIssues: 0,
    failedUploads: 0,
    recent24h: 0,
    totalListingViews: 0,
    listingViews24h: 0,
    marketplaceRetired: true,
  };

  const response = jsonResponse({
    ok: true,
    summary,
    health,
    signals: businessSignals,
    marketplaceSellerContactsByListing: {},
    marketplaceListingInterestsByListing: {},
    lastSuccess: null,
    lastFailure: null,
    recentActions: [],
    marketplaceRetired: true,
  });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

export { handleAdminOperations };
