import {
  jsonResponse,
  cleanString,
  MARKETPLACE_ANALYTICS_HOURLY_LIMIT,
  MARKETPLACE_ANALYTICS_MAX_BYTES,
  SITE_INTENT_CLIENT_EVENT_TYPES,
  SITE_INTENT_MAX_BYTES,
  sameOriginRequest,
  durableRateLimit,
  getMarketplaceRow,
  recordSiteEvent,
  recordMarketplaceEvent,
  notifyMarketplaceBuyerIntent,
  readLimitedJson,
} from "../core-context.js";


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
  if (eventType === "store_destination_click" && !["ebay", "fourthwall", "collector"].includes(value)) return jsonResponse({ error: "Invalid Store destination" }, 400);
  if (eventType === "store_product_click" && !["ebay", "fourthwall", "collector", "shopping_list"].includes(value)) return jsonResponse({ error: "Invalid Store product destination" }, 400);
  if (eventType === "store_section_view" && !["rv_shop", "brand_catalog"].includes(value)) return jsonResponse({ error: "Invalid Store section" }, 400);
  if (eventType === "service_area_classified" && !["treasure_valley","southern_colorado","denver_metro","outside_standard_area","manual_review"].includes(value)) return jsonResponse({ error: "Invalid service area" }, 400);
  if (eventType === "out_of_area_path_selected" && !["project_review","work_with_us"].includes(value)) return jsonResponse({ error: "Invalid out-of-area path" }, 400);
  if (eventType === "opportunity_type_selected" && !["affiliate","marketing","technician","investment"].includes(value)) return jsonResponse({ error: "Invalid opportunity type" }, 400);
  const row = await recordSiteEvent(env, body, { request });
  return jsonResponse({ ok: true, stored: Boolean(row.stored), migrationRequired: row.reason === "migration_required" }, 202);
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

export {
  handleMarketplaceEvent,
  handleSiteEvent
};
