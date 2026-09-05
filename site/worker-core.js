import {
  SOLAR_NOTIFY_PATH,
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
} from "./worker/core-context.js";
import { handleAdminLogin, handleAdminLogout, handleAdminSession } from "./worker/domains/admin-auth.js";
import { handleAdminOperations } from "./worker/domains/admin-overview.js";
import { handleMarketplaceEvent, handleSiteEvent } from "./worker/domains/analytics.js";
import { handleAdminMarketAnalytics } from "./worker/domains/analytics-reporting.js";
import { handleRetiredLegacyMarketplaceImport, handleStoreProductsCompatibility } from "./worker/domains/compatibility.js";
import { handleAdminInventory, handlePublicInventory } from "./worker/domains/inventory.js";
import { handleAdminLeads, handleAdminOpportunities, handleProjectCapture, handleProjectClassify, handleProjectContactRequest, handleProjectFollowUpRequest, handleProjectHandymanPhotos, handleProjectSubmit } from "./worker/domains/leads.js";
import { handleAdminListings, handleAdminMarketplaceFollowups, handleAdminMarketplaceIssues, handleMarketplaceContact, handleMarketplaceHealth, handleMarketplaceImage, handleMarketplaceIssueReport, handleMarketplacePublicListings, handleMarketplaceQaValidate, handleMarketplaceShare, handleMarketplaceSubmit } from "./worker/domains/marketplace.js";
import { handleWorkWithUsSubmit } from "./worker/domains/opportunities.js";
import { handleAdminSolarQaToken, handleSolarNotification, handleSolarQaValidate } from "./worker/domains/solar.js";
import { handleAdminQaToken, handleHealth } from "./worker/domains/system.js";


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
    if (url.pathname === PUBLIC_INVENTORY_PATH) return handlePublicInventory(request, env);
    if (url.pathname === ADMIN_INVENTORY_PATH || url.pathname.startsWith(`${ADMIN_INVENTORY_PATH}/`)) return handleAdminInventory(request, env, url.pathname);
    if (url.pathname === SOLAR_QA_VALIDATE_PATH) return handleSolarQaValidate(request, env);
    if (url.pathname === ADMIN_LEADS_PATH || url.pathname.startsWith(`${ADMIN_LEADS_PATH}/`)) return handleAdminLeads(request, env, url.pathname);
    if (url.pathname === ADMIN_MARKETPLACE_FOLLOWUPS_PATH || url.pathname.startsWith(`${ADMIN_MARKETPLACE_FOLLOWUPS_PATH}/`)) return handleAdminMarketplaceFollowups(request, env, url.pathname);
    if (url.pathname === MARKETPLACE_QA_VALIDATE_PATH) return handleMarketplaceQaValidate(request, env);
    if (url.pathname === ADMIN_QA_TOKEN_PATH) return handleAdminQaToken(request, env);
    if (url.pathname === ADMIN_MARKETPLACE_ISSUES_PATH) return handleAdminMarketplaceIssues(request, env);
    if (url.pathname === ADMIN_LISTINGS_PATH || url.pathname.startsWith(`${ADMIN_LISTINGS_PATH}/`)) return handleAdminListings(request, env, url.pathname);

    if (url.pathname === "/api/store-products") return handleStoreProductsCompatibility(request);

    return env.ASSETS.fetch(request);
  },
};
