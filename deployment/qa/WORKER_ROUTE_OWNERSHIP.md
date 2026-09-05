# Website Rebuild — Worker Route Ownership

Generated from registry SHA-256 `21deae98cfd2d0758e24e0ea25bc01cf345c89df74cf77a7f317a1b30d7c1872`.

| Route | Match | Domain | Handler | Access |
|---|---|---|---|---|
| `/api/solar-build-notify` | exact | solar | `handleSolarNotification` | public-write |
| `/api/health` | exact | system | `handleHealth` | public |
| `/api/marketplace/health` | exact | marketplace | `handleMarketplaceHealth` | public |
| `/api/marketplace/event` | exact | analytics | `handleMarketplaceEvent` | public-write |
| `/api/site-event` | exact | analytics | `handleSiteEvent` | public-write |
| `/api/site/event` | exact | analytics | `handleSiteEvent` | compatibility-write |
| `/api/project/classify` | exact | leads | `handleProjectClassify` | public |
| `/api/project/capture-contact` | exact | leads | `handleProjectCapture` | public-write |
| `/api/project/contact-request` | exact | leads | `handleProjectContactRequest` | public-write |
| `/api/project/follow-up-request` | exact | leads | `handleProjectFollowUpRequest` | public-write |
| `/api/project/handyman-photos` | exact | leads | `handleProjectHandymanPhotos` | public-write |
| `/api/project/submit` | exact | leads | `handleProjectSubmit` | public-write |
| `/api/work-with-us/submit` | exact | opportunities | `handleWorkWithUsSubmit` | public-write |
| `/api/marketplace/submit` | exact | marketplace | `handleMarketplaceSubmit` | public-write |
| `/api/marketplace/listings` | exact | marketplace | `handleMarketplacePublicListings` | public |
| `/api/marketplace/image/` | prefix | marketplace | `handleMarketplaceImage` | public-mixed |
| `/api/marketplace/contact/` | prefix | marketplace | `handleMarketplaceContact` | public-write |
| `/marketplace/listing/` | prefix | marketplace | `handleMarketplaceShare` | public-page |
| `/api/marketplace/report-issue` | exact | marketplace | `handleMarketplaceIssueReport` | public-write |
| `/api/admin/login` | exact | admin-auth | `handleAdminLogin` | public-write |
| `/api/admin/logout` | exact | admin-auth | `handleAdminLogout` | admin |
| `/api/admin/session` | exact | admin-auth | `handleAdminSession` | admin |
| `/api/admin/import-legacy` | exact | compatibility | `handleRetiredLegacyMarketplaceImport` | retired |
| `/api/admin/operations` | exact | admin-overview | `handleAdminOperations` | admin |
| `/api/admin/market-analytics` | exact | analytics-reporting | `handleAdminMarketAnalytics` | admin |
| `/api/admin/opportunities` | exact | leads | `handleAdminOpportunities` | admin-mixed |
| `/api/admin/solar-qa-token` | exact | solar | `handleAdminSolarQaToken` | admin-write |
| `/api/store-inventory` | exact | inventory | `handlePublicInventory` | public |
| `/api/admin/inventory` | prefix-or-exact | inventory | `handleAdminInventory` | admin-mixed |
| `/api/solar/qa/validate` | exact | solar | `handleSolarQaValidate` | public-write |
| `/api/admin/leads` | prefix-or-exact | leads | `handleAdminLeads` | admin-mixed |
| `/api/admin/marketplace-followups` | prefix-or-exact | marketplace | `handleAdminMarketplaceFollowups` | admin-mixed |
| `/api/marketplace/qa/validate` | exact | marketplace | `handleMarketplaceQaValidate` | public-write |
| `/api/admin/qa-token` | exact | system | `handleAdminQaToken` | admin-write |
| `/api/admin/marketplace-issues` | exact | marketplace | `handleAdminMarketplaceIssues` | admin |
| `/api/admin/listings` | prefix-or-exact | marketplace | `handleAdminListings` | admin-mixed |
| `/api/store-products` | exact | store-legacy | `getCatalog` | public |

## Runtime layout

- `site/worker-core.js` — thin compatibility/router entry point; no moved business handler implementations.
- `site/worker/core-context.js` — shared legacy-compatible helper/data context.
- `site/worker/domains/*.js` — current route handler implementations grouped by domain.
- `/api/store-products` remains an explicit compatibility route backed by shared catalog logic.

## Cross-domain handler dependencies

- `handleAdminOperations` (admin-overview) → `handleHealth` (system)

Cross-domain module graph cycle check: PASS
