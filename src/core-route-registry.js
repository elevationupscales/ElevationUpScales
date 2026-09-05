/**
 * Exact current worker-core route ownership registry.
 *
 * Source baseline:
 * 176dbd96cac420b1e52e4fb19ab2483a6caeb46b
 *
 * This is documentation-as-code for decomposition. It does not deploy or
 * replace the production Worker.
 */
export const CORE_ROUTE_REGISTRY = Object.freeze([
  { match: "exact", path: "/api/solar-build-notify", domain: "solar", handler: "handleSolarNotification", access: "public-write" },
  { match: "exact", path: "/api/health", domain: "system", handler: "handleHealth", access: "public" },
  { match: "exact", path: "/api/marketplace/health", domain: "marketplace", handler: "handleMarketplaceHealth", access: "public" },
  { match: "exact", path: "/api/marketplace/event", domain: "analytics", handler: "handleMarketplaceEvent", access: "public-write" },
  { match: "exact", path: "/api/site-event", domain: "analytics", handler: "handleSiteEvent", access: "public-write" },
  { match: "exact", path: "/api/site/event", domain: "analytics", handler: "handleSiteEvent", access: "compatibility-write" },

  { match: "exact", path: "/api/project/classify", domain: "leads", handler: "handleProjectClassify", access: "public" },
  { match: "exact", path: "/api/project/capture-contact", domain: "leads", handler: "handleProjectCapture", access: "public-write" },
  { match: "exact", path: "/api/project/contact-request", domain: "leads", handler: "handleProjectContactRequest", access: "public-write" },
  { match: "exact", path: "/api/project/follow-up-request", domain: "leads", handler: "handleProjectFollowUpRequest", access: "public-write" },
  { match: "exact", path: "/api/project/handyman-photos", domain: "leads", handler: "handleProjectHandymanPhotos", access: "public-write" },
  { match: "exact", path: "/api/project/submit", domain: "leads", handler: "handleProjectSubmit", access: "public-write" },
  { match: "exact", path: "/api/work-with-us/submit", domain: "opportunities", handler: "handleWorkWithUsSubmit", access: "public-write" },

  { match: "exact", path: "/api/marketplace/submit", domain: "marketplace", handler: "handleMarketplaceSubmit", access: "public-write" },
  { match: "exact", path: "/api/marketplace/listings", domain: "marketplace", handler: "handleMarketplacePublicListings", access: "public" },
  { match: "prefix", path: "/api/marketplace/image/", domain: "marketplace", handler: "handleMarketplaceImage", access: "public-mixed" },
  { match: "prefix", path: "/api/marketplace/contact/", domain: "marketplace", handler: "handleMarketplaceContact", access: "public-write" },
  { match: "prefix", path: "/marketplace/listing/", domain: "marketplace", handler: "handleMarketplaceShare", access: "public-page" },
  { match: "exact", path: "/api/marketplace/report-issue", domain: "marketplace", handler: "handleMarketplaceIssueReport", access: "public-write" },

  { match: "exact", path: "/api/admin/login", domain: "admin-auth", handler: "handleAdminLogin", access: "public-write" },
  { match: "exact", path: "/api/admin/logout", domain: "admin-auth", handler: "handleAdminLogout", access: "admin" },
  { match: "exact", path: "/api/admin/session", domain: "admin-auth", handler: "handleAdminSession", access: "admin" },
  { match: "exact", path: "/api/admin/import-legacy", domain: "compatibility", handler: "handleRetiredLegacyMarketplaceImport", access: "retired" },
  { match: "exact", path: "/api/admin/operations", domain: "admin-overview", handler: "handleAdminOperations", access: "admin" },
  { match: "exact", path: "/api/admin/market-analytics", domain: "analytics-reporting", handler: "handleAdminMarketAnalytics", access: "admin" },
  { match: "exact", path: "/api/admin/opportunities", domain: "leads", handler: "handleAdminOpportunities", access: "admin-mixed" },
  { match: "exact", path: "/api/admin/solar-qa-token", domain: "solar", handler: "handleAdminSolarQaToken", access: "admin-write" },

  { match: "exact", path: "/api/store-inventory", domain: "inventory", handler: "handlePublicInventory", access: "public" },
  { match: "prefix-or-exact", path: "/api/admin/inventory", domain: "inventory", handler: "handleAdminInventory", access: "admin-mixed" },

  { match: "exact", path: "/api/solar/qa/validate", domain: "solar", handler: "handleSolarQaValidate", access: "public-write" },
  { match: "prefix-or-exact", path: "/api/admin/leads", domain: "leads", handler: "handleAdminLeads", access: "admin-mixed" },
  { match: "prefix-or-exact", path: "/api/admin/marketplace-followups", domain: "marketplace", handler: "handleAdminMarketplaceFollowups", access: "admin-mixed" },
  { match: "exact", path: "/api/marketplace/qa/validate", domain: "marketplace", handler: "handleMarketplaceQaValidate", access: "public-write" },
  { match: "exact", path: "/api/admin/qa-token", domain: "system", handler: "handleAdminQaToken", access: "admin-write" },
  { match: "exact", path: "/api/admin/marketplace-issues", domain: "marketplace", handler: "handleAdminMarketplaceIssues", access: "admin" },
  { match: "prefix-or-exact", path: "/api/admin/listings", domain: "marketplace", handler: "handleAdminListings", access: "admin-mixed" },

  { match: "exact", path: "/api/store-products", domain: "store-legacy", handler: "getCatalog", access: "public" },
]);

export const CORE_DOMAINS = Object.freeze(
  [...new Set(CORE_ROUTE_REGISTRY.map((route) => route.domain))],
);

export function matchCoreRoute(pathname) {
  for (const route of CORE_ROUTE_REGISTRY) {
    if (route.match === "exact" && pathname === route.path) return route;
    if (route.match === "prefix" && pathname.startsWith(route.path)) return route;
    if (
      route.match === "prefix-or-exact" &&
      (pathname === route.path || pathname.startsWith(`${route.path}/`))
    ) {
      return route;
    }
  }
  return null;
}
