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

    let storeAnalytics = {
      sessions: 0, rvShopSessions: 0,
      ebayClicks: 0, ebayClickSessions: 0,
      fourthwallClicks: 0, fourthwallClickSessions: 0,
      collectorClicks: 0, collectorClickSessions: 0,
      productClicks: 0, categorySelections: 0, searchUses: 0,
      ebayCtr: null, recentEvents: []
    };
    try {
      const storeMetricRow = await env.MARKETPLACE_DB.prepare(`SELECT
        COUNT(DISTINCT CASE WHEN event_type='store_open' THEN session_hash END) AS store_sessions,
        COUNT(DISTINCT CASE WHEN event_type='store_section_view' AND event_value='rv_shop' THEN session_hash END) AS rv_shop_sessions,
        SUM(CASE WHEN event_type='store_destination_click' AND event_value='ebay' THEN 1 ELSE 0 END) AS ebay_clicks,
        COUNT(DISTINCT CASE WHEN event_type='store_destination_click' AND event_value='ebay' THEN session_hash END) AS ebay_click_sessions,
        SUM(CASE WHEN event_type='store_destination_click' AND event_value='fourthwall' THEN 1 ELSE 0 END) AS fourthwall_clicks,
        COUNT(DISTINCT CASE WHEN event_type='store_destination_click' AND event_value='fourthwall' THEN session_hash END) AS fourthwall_click_sessions,
        SUM(CASE WHEN event_type='store_destination_click' AND event_value='collector' THEN 1 ELSE 0 END) AS collector_clicks,
        COUNT(DISTINCT CASE WHEN event_type='store_destination_click' AND event_value='collector' THEN session_hash END) AS collector_click_sessions,
        SUM(CASE WHEN event_type='store_product_click' THEN 1 ELSE 0 END) AS product_clicks,
        SUM(CASE WHEN event_type='store_category_select' THEN 1 ELSE 0 END) AS category_selections,
        SUM(CASE WHEN event_type='store_search_used' THEN 1 ELSE 0 END) AS search_uses
        FROM eus_site_events
        WHERE created_at>=? AND created_at<=?`).bind(window.start, window.end).first();
      const storeSessions = Math.max(0, Number(storeMetricRow?.store_sessions) || 0);
      const rvShopSessions = Math.max(0, Number(storeMetricRow?.rv_shop_sessions) || 0);
      const ebayClickSessions = Math.max(0, Number(storeMetricRow?.ebay_click_sessions) || 0);
      const storeEventRows = await env.MARKETPLACE_DB.prepare(`SELECT
        substr(session_hash,1,10) AS visitor_tag,
        event_type, event_value, page, details_json, created_at
        FROM eus_site_events
        WHERE created_at>=? AND created_at<=?
          AND event_type IN ('store_open','store_section_view','store_category_select','store_search_used','store_sort_changed','store_destination_click','store_product_click')
        ORDER BY created_at DESC LIMIT 80`).bind(window.start, window.end).all();
      storeAnalytics = {
        sessions: storeSessions,
        rvShopSessions,
        ebayClicks: Math.max(0, Number(storeMetricRow?.ebay_clicks) || 0),
        ebayClickSessions,
        fourthwallClicks: Math.max(0, Number(storeMetricRow?.fourthwall_clicks) || 0),
        fourthwallClickSessions: Math.max(0, Number(storeMetricRow?.fourthwall_click_sessions) || 0),
        collectorClicks: Math.max(0, Number(storeMetricRow?.collector_clicks) || 0),
        collectorClickSessions: Math.max(0, Number(storeMetricRow?.collector_click_sessions) || 0),
        productClicks: Math.max(0, Number(storeMetricRow?.product_clicks) || 0),
        categorySelections: Math.max(0, Number(storeMetricRow?.category_selections) || 0),
        searchUses: Math.max(0, Number(storeMetricRow?.search_uses) || 0),
        ebayCtr: rvShopSessions > 0 ? Math.round((ebayClickSessions / rvShopSessions) * 1000) / 10 : null,
        recentEvents: (storeEventRows.results || []).map((row) => {
          const details = parseJsonObject(row.details_json);
          return {
            visitorTag: cleanString(row.visitor_tag, 12) || "anonymous",
            eventType: cleanString(row.event_type, 60),
            eventValue: cleanString(row.event_value, 120),
            page: analyticsPath(row.page || "/store"),
            destination: cleanString(details.destination, 40),
            section: cleanString(details.section, 60),
            category: cleanString(details.category, 60),
            product: cleanString(details.product, 120),
            referrerHost: cleanString(details.referrerHost, 120),
            utmSource: cleanString(details.utmSource, 80),
            utmMedium: cleanString(details.utmMedium, 80),
            utmCampaign: cleanString(details.utmCampaign, 120),
            createdAt: cleanString(row.created_at, 80),
          };
        })
      };
    } catch (error) {
      console.error(JSON.stringify({ event: "admin_store_analytics_error", message: error instanceof Error ? error.message : String(error) }));
    }

    const payload = {
      ok: true, available: true, source: "D1 eus_site_events", range: window, selectedMarket: marketKey,
      collection: { firstEventAt: cleanString(collectionRow?.first_event_at, 80) || null, marketGeographyAt: cleanString(collectionRow?.market_geography_at, 80) || null, historicalGeographyBackfill: false },
      overall, selected, markets: allMarkets, selectedBreakdown, projectDataAvailable, store: storeAnalytics,
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

export {
  handleAdminMarketAnalytics
};
