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

async function handlePublicInventory(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  if (!env.MARKETPLACE_DB || typeof env.MARKETPLACE_DB.prepare !== "function") return jsonResponse({ items: [], count: 0, storageConfigured: false, build: OPERATIONS_BUILD }, 200, { "Cache-Control": "public, max-age=3, s-maxage=3" });
  try {
    const result = await env.MARKETPLACE_DB.prepare(`SELECT * FROM eus_inventory_items
      WHERE status='active'
        AND lower(COALESCE(supplier,'')) <> 'fourthwall'
        AND fulfillment_mode <> 'pod'
      ORDER BY updated_at DESC, name COLLATE NOCASE ASC
      LIMIT 500`).all();
    const items = (result.results || []).map(publicInventoryRecord).filter(Boolean);
    const response = jsonResponse({ items, count: items.length, storageConfigured: true, syncedAt: new Date().toISOString(), build: OPERATIONS_BUILD }, 200, { "Cache-Control": "public, max-age=3, s-maxage=3" });
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  } catch (error) {
    const message = String(error?.message || error || "");
    if (/no such table/i.test(message)) return jsonResponse({ items: [], count: 0, storageConfigured: true, inventoryReady: false, build: OPERATIONS_BUILD }, 200, { "Cache-Control": "public, max-age=3, s-maxage=3" });
    console.error(JSON.stringify({ event: "public_inventory_error", message: cleanString(message, 240) }));
    return jsonResponse({ error: "Store inventory is temporarily unavailable", items: [], count: 0 }, 503);
  }
}

async function handleAdminInventory(request, env, pathname) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.MARKETPLACE_DB || typeof env.MARKETPLACE_DB.prepare !== "function") return jsonResponse({ error: "Inventory storage is not configured" }, 503);
  const db = env.MARKETPLACE_DB;
  try { await ensureInventorySchema(db); }
  catch (error) {
    console.error(JSON.stringify({ event: "inventory_schema_error", message: error instanceof Error ? error.message : String(error) }));
    return jsonResponse({ error: "Inventory storage is unavailable" }, 503);
  }

  const suffix = pathname.slice(ADMIN_INVENTORY_PATH.length).replace(/^\/+/, "");
  const itemId = inventoryString(decodeURIComponent(suffix.split("/")[0] || ""), 100);

  if (request.method === "GET") return jsonResponse(await inventorySnapshot(db));
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);

  if (request.method === "POST" && !itemId) {
    const parsed = await inventoryReadBody(request);
    if (parsed.response) return parsed.response;
    const body = parsed.body;
    const sku = inventoryString(body.sku, 80).toUpperCase();
    const name = inventoryString(body.name, 180);
    if (!sku || !name) return jsonResponse({ error: "SKU and product name are required" }, 400);
    const fulfillmentMode = INVENTORY_FULFILLMENT_MODES.has(body.fulfillmentMode) ? body.fulfillmentMode : "tracked";
    const status = INVENTORY_STATUSES.has(body.status) ? body.status : "active";
    const now = new Date().toISOString();
    const id = `inv_${crypto.randomUUID()}`;
    const item = {
      id, sku, name,
      category: inventoryString(body.category, 100),
      supplier: inventoryString(body.supplier, 100) || "other",
      fulfillmentMode,
      supplierProductId: inventoryString(body.supplierProductId, 180),
      sourceUrl: inventoryUrl(body.sourceUrl),
      salesChannelsJson: inventoryChannels(body.salesChannels),
      costCents: inventoryMoneyCents(body.costCents, 0),
      priceCents: inventoryMoneyCents(body.priceCents, 0),
      quantityOnHand: fulfillmentMode === "tracked" ? inventoryInteger(body.quantityOnHand, 0) : 0,
      quantityReserved: fulfillmentMode === "tracked" ? inventoryInteger(body.quantityReserved, 0) : 0,
      reorderPoint: fulfillmentMode === "tracked" ? inventoryInteger(body.reorderPoint, 0) : 0,
      status,
      notes: inventoryString(body.notes, 4000),
    };
    if (item.supplier.toLowerCase() === "doba" && item.status === "active" && item.costCents <= 0) {
      return jsonResponse({ error: "Active Doba items require a non-zero supplier cost. Save the supplier cost or place the item on hold/paused." }, 409);
    }
    try {
      await db.prepare(`INSERT INTO eus_inventory_items
        (id,sku,name,category,supplier,fulfillment_mode,supplier_product_id,source_url,sales_channels_json,cost_cents,price_cents,quantity_on_hand,quantity_reserved,reorder_point,status,notes,version,created_at,updated_at,updated_by)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?,?,?)`).bind(
          item.id,item.sku,item.name,item.category,item.supplier,item.fulfillmentMode,item.supplierProductId,item.sourceUrl,item.salesChannelsJson,item.costCents,item.priceCents,item.quantityOnHand,item.quantityReserved,item.reorderPoint,item.status,item.notes,now,now,auth.session.email,
        ).run();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (/unique|constraint/i.test(message)) return jsonResponse({ error: `SKU ${sku} already exists` }, 409);
      console.error(JSON.stringify({ event: "inventory_create_error", message }));
      return jsonResponse({ error: "Inventory item could not be created" }, 500);
    }
    await inventoryLog(db, { itemId: id, sku, action: "created", quantityAfter: item.quantityOnHand, reservedAfter: item.quantityReserved, details: { name: item.name, supplier: item.supplier, fulfillmentMode: item.fulfillmentMode }, adminEmail: auth.session.email }).catch(() => {});
    const row = await db.prepare("SELECT * FROM eus_inventory_items WHERE id=? LIMIT 1").bind(id).first();
    return jsonResponse({ ok: true, item: inventoryRow(row), ...(await inventorySnapshot(db)) }, 201);
  }

  if (!itemId) return jsonResponse({ error: "Inventory item id is required" }, 400);
  const existingRow = await db.prepare("SELECT * FROM eus_inventory_items WHERE id=? LIMIT 1").bind(itemId).first();
  if (!existingRow) return jsonResponse({ error: "Inventory item not found" }, 404);
  const existing = inventoryRow(existingRow);

  if (request.method === "DELETE") {
    if (existing.status === "archived") return jsonResponse({ ok: true, item: existing, ...(await inventorySnapshot(db)) });
    const now = new Date().toISOString();
    const result = await db.prepare("UPDATE eus_inventory_items SET status='archived', version=version+1, updated_at=?, updated_by=? WHERE id=? AND version=?")
      .bind(now, auth.session.email, itemId, existing.version).run();
    if (!result?.meta?.changes) return jsonResponse({ error: "Inventory item changed elsewhere. Refresh and try again." }, 409);
    await inventoryLog(db, { itemId, sku: existing.sku, action: "archived", quantityBefore: existing.quantityOnHand, quantityAfter: existing.quantityOnHand, reservedBefore: existing.quantityReserved, reservedAfter: existing.quantityReserved, adminEmail: auth.session.email }).catch(() => {});
    const row = await db.prepare("SELECT * FROM eus_inventory_items WHERE id=? LIMIT 1").bind(itemId).first();
    return jsonResponse({ ok: true, item: inventoryRow(row), ...(await inventorySnapshot(db)) });
  }

  if (request.method === "PATCH") {
    const parsed = await inventoryReadBody(request);
    if (parsed.response) return parsed.response;
    const body = parsed.body;
    const requestedVersion = inventoryInteger(body.version, existing.version, 2_000_000_000);
    if (requestedVersion !== existing.version) return jsonResponse({ error: "Inventory item changed elsewhere. Refresh and try again." }, 409);
    const nextMode = body.fulfillmentMode === undefined ? existing.fulfillmentMode : (INVENTORY_FULFILLMENT_MODES.has(body.fulfillmentMode) ? body.fulfillmentMode : existing.fulfillmentMode);
    const nextStatus = body.status === undefined ? existing.status : (INVENTORY_STATUSES.has(body.status) ? body.status : existing.status);
    const next = {
      sku: body.sku === undefined ? existing.sku : inventoryString(body.sku, 80).toUpperCase(),
      name: body.name === undefined ? existing.name : inventoryString(body.name, 180),
      category: body.category === undefined ? existing.category : inventoryString(body.category, 100),
      supplier: body.supplier === undefined ? existing.supplier : (inventoryString(body.supplier, 100) || "other"),
      fulfillmentMode: nextMode,
      supplierProductId: body.supplierProductId === undefined ? existing.supplierProductId : inventoryString(body.supplierProductId, 180),
      sourceUrl: body.sourceUrl === undefined ? existing.sourceUrl : inventoryUrl(body.sourceUrl),
      salesChannelsJson: body.salesChannels === undefined ? JSON.stringify(existing.salesChannels) : inventoryChannels(body.salesChannels),
      costCents: body.costCents === undefined ? existing.costCents : inventoryMoneyCents(body.costCents, existing.costCents),
      priceCents: body.priceCents === undefined ? existing.priceCents : inventoryMoneyCents(body.priceCents, existing.priceCents),
      quantityOnHand: nextMode === "tracked" ? (body.quantityOnHand === undefined ? existing.quantityOnHand : inventoryInteger(body.quantityOnHand, existing.quantityOnHand)) : 0,
      quantityReserved: nextMode === "tracked" ? (body.quantityReserved === undefined ? existing.quantityReserved : inventoryInteger(body.quantityReserved, existing.quantityReserved)) : 0,
      reorderPoint: nextMode === "tracked" ? (body.reorderPoint === undefined ? existing.reorderPoint : inventoryInteger(body.reorderPoint, existing.reorderPoint)) : 0,
      status: nextStatus,
      notes: body.notes === undefined ? existing.notes : inventoryString(body.notes, 4000),
    };
    if (!next.sku || !next.name) return jsonResponse({ error: "SKU and product name are required" }, 400);
    if (next.supplier.toLowerCase() === "doba" && next.status === "active" && next.costCents <= 0) {
      return jsonResponse({ error: "Active Doba items require a non-zero supplier cost. Save the supplier cost or place the item on hold/paused." }, 409);
    }
    const changed = [];
    const compare = {
      sku: existing.sku, name: existing.name, category: existing.category, supplier: existing.supplier,
      fulfillmentMode: existing.fulfillmentMode, supplierProductId: existing.supplierProductId, sourceUrl: existing.sourceUrl,
      salesChannelsJson: JSON.stringify(existing.salesChannels), costCents: existing.costCents, priceCents: existing.priceCents,
      quantityOnHand: existing.quantityOnHand, quantityReserved: existing.quantityReserved, reorderPoint: existing.reorderPoint,
      status: existing.status, notes: existing.notes,
    };
    for (const key of Object.keys(next)) if (String(next[key] ?? "") !== String(compare[key] ?? "")) changed.push(key);
    if (!changed.length) return jsonResponse({ ok: true, item: existing, ...(await inventorySnapshot(db)) });
    const now = new Date().toISOString();
    try {
      const result = await db.prepare(`UPDATE eus_inventory_items SET
        sku=?,name=?,category=?,supplier=?,fulfillment_mode=?,supplier_product_id=?,source_url=?,sales_channels_json=?,cost_cents=?,price_cents=?,quantity_on_hand=?,quantity_reserved=?,reorder_point=?,status=?,notes=?,version=version+1,updated_at=?,updated_by=?
        WHERE id=? AND version=?`).bind(
          next.sku,next.name,next.category,next.supplier,next.fulfillmentMode,next.supplierProductId,next.sourceUrl,next.salesChannelsJson,next.costCents,next.priceCents,next.quantityOnHand,next.quantityReserved,next.reorderPoint,next.status,next.notes,now,auth.session.email,itemId,existing.version,
        ).run();
      if (!result?.meta?.changes) return jsonResponse({ error: "Inventory item changed elsewhere. Refresh and try again." }, 409);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (/unique|constraint/i.test(message)) return jsonResponse({ error: `SKU ${next.sku} already exists` }, 409);
      console.error(JSON.stringify({ event: "inventory_update_error", itemId, message }));
      return jsonResponse({ error: "Inventory item could not be updated" }, 500);
    }
    await inventoryLog(db, {
      itemId, sku: next.sku, action: changed.some((key) => ["quantityOnHand", "quantityReserved"].includes(key)) ? "stock_updated" : "updated",
      quantityBefore: existing.quantityOnHand, quantityAfter: next.quantityOnHand, reservedBefore: existing.quantityReserved, reservedAfter: next.quantityReserved,
      details: { changed }, adminEmail: auth.session.email,
    }).catch(() => {});
    const row = await db.prepare("SELECT * FROM eus_inventory_items WHERE id=? LIMIT 1").bind(itemId).first();
    return jsonResponse({ ok: true, item: inventoryRow(row), ...(await inventorySnapshot(db)) });
  }

  return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, POST, PATCH, DELETE" });
}

export {
  handleAdminInventory,
  handlePublicInventory
};
