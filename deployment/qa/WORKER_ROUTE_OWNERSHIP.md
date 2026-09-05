# Website Rebuild — Worker Route Ownership

## Status

`CODE-COMPLETION OWNERSHIP MAP`

Production baseline: `995ddef117be2ba5b26e154ea43409271fc938a9`

The current clean-baseline branch routes all 37 documented Worker contracts through explicit domain handlers. `site/worker-core.js` is a dispatcher only; it no longer owns business handler implementations or imports the legacy shared context for route constants.

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
| `/api/store-products` | exact | compatibility | `handleStoreProductsCompatibility` | public |

## Runtime layout

- `site/worker-core.js` — thin dispatcher/static-fallback entry point; no business handler implementations.
- `site/worker/routes.js` — canonical Worker route constants used directly by the dispatcher and re-used by the shared context.
- `site/worker/core-context.js` — shared compatibility/data/infrastructure context only; shared security/response/HTML/validation/Solar sanitizers are imported rather than duplicated.
- `site/worker/shared/response.js` — API/HTML response security headers and JSON/HTML response helpers.
- `site/worker/shared/html.js` — HTML and inline-JSON escaping.
- `site/worker/shared/validation.js` — common string/list/contact validation.
- `site/worker/shared/solar-sanitizers.js` — Solar-specific sanitization built on common validation.
- `site/worker/domains/*.js` — current route handler implementations grouped by domain.
- `/api/store-products` remains an explicit compatibility route owned by `compatibility.js` and backed by the same catalog source.

## Dependency controls

- Domain modules use explicit named dependencies; the legacy `import * as core` + whole-context destructure is prohibited by `deployment/qa/worker-import-surface-static.mjs`.
- Shared-foundation tests execute the deployed `site/worker/shared/*` modules; duplicate `src/shared/*` preparation implementations are prohibited by the canonical static gate.
- `handleAdminOperations` (admin-overview) → `handleHealth` (system) remains the one documented cross-domain handler dependency.
- Cross-domain module graph cycle check: PASS.

## Runtime protection

`/worker/*`, `/worker-core.js`, and other protected runtime sources remain intercepted/non-public. Preview regression requires the expected 404 contracts.
