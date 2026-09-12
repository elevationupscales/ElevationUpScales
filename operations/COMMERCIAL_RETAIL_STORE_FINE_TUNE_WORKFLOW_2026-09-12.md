# ELEVATION UPSCALES — COMMERCIAL RETAIL STORE FINE-TUNE WORKFLOW

**Date:** 2026-09-12  
**State:** ACTIVE / P0 RECOVERY TARGET / PHASE B DEPENDENCY  
**Owner:** Casey Young  
**Parent Project:** Operating System / Website Coding Stabilization  
**Management Owner:** PM4 / MPM  
**Execution Owner:** MASTER DEVELOPER  
**Integrity Gate:** MASTER RECON OS  
**Commercial Continuity:** Company Operations Manager / COM 2  
**Controlling Owner Standard:** `OWNER_DIRECTIVE_COMMERCIAL_RETAIL_STORE_STANDARD_2026-09-12.md`  
**Parent Recovery Worktree:** `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`

> This file is a subordinate scoped workflow and execution-board view inside the existing coding-stabilization Worktree. It does **not** create another Project, manager, Master Workboard or independent developer lane. `CURRENT_WORK_BOARD.md` remains the canonical global board.

## 1. Mission

Fine-tune ElevationUpScales.com into a clean, understandable, trustworthy commercial online retail store **before normal website feature development resumes**.

The work is not a redesign.

The work is not broad catalog expansion.

The work is structural retail cleanup:

**TRUST → STRUCTURE → PRODUCT TRUTH → CUSTOMER COPY → SHOPABILITY → CHECKOUT → FULFILLMENT ROUTING → RELEASE PROOF.**

## 2. Scope

### IN SCOPE

- Universal Catalog as the canonical website retail structure;
- exact product identity / SKU / customer brand / supplier ownership mapping;
- customer-facing Shop by Brand organization;
- customer-facing department/category organization;
- product search/filter/browse behavior;
- product-detail route integrity;
- customer-safe product titles/descriptions;
- price / purchase-options presentation;
- availability/orderability presentation;
- approved media provenance;
- checkout destination and eligibility;
- fulfillment-owner routing;
- shipping/destination exception presentation;
- server/API-side fail-closed public eligibility controls;
- legacy/duplicate commerce route retirement/mapping;
- retail navigation/shopability cleanup;
- public-copy firewall;
- protected homepage-top regression protection;
- deterministic preview/deploy/cache/receipt controls required to prove the retail system.

### OUT OF SCOPE / HOLD

- visual redesign for its own sake;
- changing the protected top homepage experience;
- reworking protected live SOK listings/pricing;
- speculative new website features;
- creating separate vendor catalog databases;
- broad supplier onboarding;
- paid acquisition;
- vendor/business-policy changes to solve code defects;
- mass-importing products merely to increase catalog count;
- replacing working payment paths without a verified defect.

## 3. Canonical retail architecture

### Product truth

One sellable product should exist as one canonical retail record.

Minimum contract:

`PRODUCT ID → CUSTOMER BRAND → INTERNAL SUPPLIER/VENDOR → SKU → PUBLIC TITLE → PUBLIC DESCRIPTION → APPROVED MEDIA → PRICE/PURCHASE STATE → PUBLISH STATE → AVAILABILITY → CHECKOUT ELIGIBILITY → CHECKOUT TARGET → FULFILLMENT OWNER → SHIPPING/DESTINATION LIMITS → TRUSTED DETAIL ROUTE`

### Customer organization

A customer should be able to reach the same product through multiple **views** without creating duplicate records:

**ALL PRODUCTS**

**SHOP BY BRAND**
- Renogy
- SOK
- VEVOR
- Kingboss
- Elevation Apparel
- later approved customer-facing brands

**SHOP BY DEPARTMENT**
- Lithium Batteries
- Solar & Charging
- RV & Mobile Power
- Backup Power
- Outdoor & Off-Grid
- Monitoring & Controls
- Cables & Accessories
- Apparel & Gear

**SEARCH**

Brand and department are filters/views over the Universal Catalog, not separate product systems.

## 4. Brand vs supplier rule

Customer-facing brand and internal fulfillment/source owner are separate fields.

Examples:

| Product relationship | Customer-facing organization | Internal control |
|---|---|---|
| Renogy dealer item | Renogy | Renogy dealer/source + exact fulfillment path |
| SOK battery | SOK | SOK supplier/project truth |
| VEVOR product | VEVOR | VEVOR PRO/source/fulfillment truth |
| Kingboss item | Kingboss | Kingboss supplier/source truth |
| Elevation POD apparel | Elevation Apparel | Fourthwall / Printful / Spreadconnect or exact POD owner |
| Doba-sourced branded item | Actual customer brand where verified | Doba remains supplier/source/fulfillment field |

Do not expose `Doba`, `Fourthwall`, Shopify, internal worker lanes or other infrastructure as primary customer navigation merely because they are operational dependencies.

## 5. Customer-copy standard

Every public sentence must pass this question:

**Would a normal customer expect to read this on a professional retail website?**

Customer copy should describe:

- product;
- benefit/use;
- price;
- availability;
- purchase action;
- shipping/fulfillment expectation;
- warranty/returns/support where relevant.

Internal process language stays internal.

### Public-copy reject examples

- source-of-truth;
- worktree;
- lane;
- revenue-first;
- activation state;
- reconciliation;
- trust-review;
- quarantine;
- retail state;
- authoritative controls;
- source-state;
- workflow state;
- implementation notes;
- QA/deployment explanations;
- coding/debug terminology.

A trust or eligibility rule should normally result in a customer state such as:

- `Available`
- `Backorder Available`
- `Out of Stock`
- `Contact Us for Availability`
- `Shipping Quote Required`

—not a description of the internal rule that produced it.

## 6. Fine-tune workflow

### STAGE 0 — HOLD THE LINE

**State:** ACTIVE NOW

- feature freeze remains active;
- accepted production remains pinned under coding stabilization;
- Phase B delta ledger continues;
- no new public architecture is coded until Phase B passes RECON + PM4 acceptance;
- customer/order emergency repairs remain authorized through recovery controls.

**Close:** Phase B ledger accepted.

### STAGE 1 — RETAIL CONTRACT MAP

**State:** QUEUED / PHASE C TARGET

Inventory every public product source/consumer and map it to the canonical Universal Catalog contract.

At minimum classify:

- Universal Catalog storage/runtime;
- public catalog API(s);
- SOK catalog adapter;
- VEVOR records;
- Renogy/Shopify intentional external/native purchase path;
- Kingboss records;
- Apparel provider links;
- product detail consumers;
- featured/home product consumers;
- checkout consumers;
- legacy generic catalog/API routes.

Each becomes one of:

- `CANONICAL`
- `AUTHORIZED ADAPTER`
- `VENDOR-SPECIFIC EXCEPTION`
- `LEGACY / RETIRE`

**Close:** one documented public product contract and no ambiguous product-truth owner.

### STAGE 2 — BRAND + DEPARTMENT NORMALIZATION

**State:** QUEUED

For every active product family, verify:

- customer-facing brand;
- internal supplier/vendor owner;
- department/category;
- exact SKU;
- fulfillment owner.

Build customer-visible brand navigation from those fields.

Do not create duplicate product records to create brand pages.

**Close:** representative SOK, Renogy, VEVOR, Kingboss and Elevation Apparel products resolve correctly through brand and department views from one product truth.

### STAGE 3 — TRUST + SELLABILITY AT SOURCE/API BOUNDARY

**State:** QUEUED

Fail closed before public response where technically appropriate for:

- unresolved identity;
- unpublished/held state;
- unusable title;
- disallowed media;
- invalid/missing required price;
- unknown customer brand/vendor mismatch;
- unsafe checkout target;
- unresolved fulfillment owner;
- exact destination restriction that prevents direct sale.

Client-side guards remain defense in depth only.

**Close:** known bad records cannot reach normal customer discovery solely because browser JavaScript later hides them.

### STAGE 4 — CUSTOMER COPY SWEEP

**State:** QUEUED

Sweep prioritized public retail surfaces:

1. `/store`
2. brand/vendor filtered views
3. product detail pages
4. checkout/purchase-options surfaces
5. shipping/logistics customer pages
6. lower homepage commerce sections only where authorized
7. customer-facing status/error/empty states

Replace internal/AI/OS/developer language with concise normal retail language.

Do not alter protected homepage-top output.

**Close:** public-copy firewall passes and manual spot-check finds no implementation-language contamination on priority shopping paths.

### STAGE 5 — SHOPABILITY + NAVIGATION

**State:** QUEUED

Customer navigation target:

**STORE → SHOP BY BRAND / SHOP BY DEPARTMENT / SEARCH → PRODUCT → BUY / PURCHASE OPTIONS → CHECKOUT.**

Verify:

- brand filters;
- department filters;
- search;
- sorting;
- detail links;
- Add/Buy/Purchase Options actions;
- mobile usability;
- desktop usability;
- unavailable/backorder/freight states;
- no dead or circular route.

**Close:** representative customer can shop without knowing Elevation's internal supplier/platform architecture.

### STAGE 6 — CHECKOUT + FULFILLMENT PROOF

**State:** QUEUED

For representative products from each active customer-facing brand/path, verify without submitting unauthorized payment:

- price/purchase state;
- cart or direct purchase route;
- checkout target;
- order-source attribution;
- fulfillment owner;
- special shipping behavior;
- backorder/purchase-options behavior where applicable.

Protect working SOK and payment behavior from unrelated refactors.

**Close:** intended purchase path is explicit and repeatable for each active brand/path.

### STAGE 7 — RELEASE / CACHE / RECEIPT PROOF

**State:** QUEUED

Require:

- exact recovery source SHA;
- canonical QA pass;
- public-copy firewall pass;
- protected-top regression pass;
- retail-contract tests;
- route/checkout smoke;
- preview from exact intended candidate;
- critical asset-version/cache check;
- controlled production;
- canonical-domain verification;
- deployment receipt;
- accepted production baseline update.

**Close:** exact source can reproducibly generate the accepted live retail store.

## 7. Scoped execution board

This is a subordinate P0 execution view. It does not replace `CURRENT_WORK_BOARD.md` or the coding-stabilization Worktree.

| Work Item | Owner | State | Priority | Blocker / Gate | Next Action | Close Condition |
|---|---|---|---|---|---|---|
| Phase B production-vs-main ledger | MASTER DEVELOPER | **ACTIVE** | P0 | None; Dev executing | Finish durable classified ledger | RECON audit + PM4 acceptance |
| Retail target standard | Owner / PM4 | **CLOSED / LOCKED** | P0 | None | Preserve directive | Remains controlling through stabilization |
| Universal Catalog canonical contract | MASTER DEVELOPER after Phase B acceptance | **QUEUED** | P0 | Phase B acceptance | Map sources/consumers; select canonical + adapters + retire list | One product truth controls public discovery |
| Brand/vendor organization | MASTER DEVELOPER + vendor source owners | **QUEUED** | P0 | Canonical contract | Normalize brand vs supplier fields; build filtered brand views | SOK/Renogy/VEVOR/Kingboss/Apparel browse from one catalog |
| Department/category organization | MASTER DEVELOPER + commerce | **QUEUED** | P0 | Canonical contract | Normalize department taxonomy | Same product discoverable by brand + category without duplication |
| Server/API trust gate | MASTER DEVELOPER | **QUEUED** | P0 | Canonical contract | Move trust-critical rejection upstream | Bad records fail closed before public response |
| Public customer-copy sweep | MASTER DEVELOPER + bounded content QA | **QUEUED** | P0 | Phase B acceptance; protected-top lock | Sweep priority shopping surfaces | Retail language only; firewall PASS |
| Shopability/navigation fine-tune | MASTER DEVELOPER | **QUEUED** | P0 | Brand/category structure defined | Simplify customer browse/search/detail/buy path | Retail path usable desktop + mobile |
| Checkout/fulfillment route acceptance | MASTER DEVELOPER + owning vendor/channel lane | **QUEUED** | Product contract + exact source truth | Verify representative exact-SKU paths | Each active brand has trusted purchase/fulfillment proof |
| Legacy/duplicate route retirement | MASTER DEVELOPER | **QUEUED** | Contract inventory | Map/redirect/retire exact obsolete paths | No legacy bypass of canonical contract |
| Protected homepage-top guard | MASTER DEVELOPER + RECON | **ACTIVE CONTROL / NO-TOUCH** | Owner lock | Verify shared changes do not alter top output | Regression gate PASS every release |
| SOK live listing protection | SOK Project + RECON | **ACTIVE CONTROL / PROTECTED** | Owner rule | No generic rework | Existing approved SOK behavior preserved |
| Release/cache/receipt hardening | MASTER DEVELOPER | **QUEUED** | Recovery candidate | Prove exact-SHA preview → production → canonical | Repeatable accepted release receipt |
| Final retail-store acceptance | MASTER RECON → PM4 → Casey | **HOLD** | Stages 1–7 complete | Full drift/trust/shopability audit | RECON PASS + PM4 recommendation + Casey freeze release |

## 8. Fine-tune RUN command

Once the applicable phase is open:

**GIT FIRST → VERIFY ACCEPTED PRODUCTION → READ OWNER RETAIL STANDARD → READ CODING STABILIZATION WORKTREE → SELECT HIGHEST P0 RETAIL ITEM → VERIFY SOURCE OWNER → FIX SMALLEST AUTHORITATIVE LAYER → TEST CUSTOMER PATH → RECORD DELTA → CONTINUE.**

Do not:

- jump ahead of phase gates;
- mass-refactor because cleanup feels easier;
- create another catalog;
- duplicate product records for vendor pages;
- expose internal words to customers;
- patch presentation when the API/source contract is wrong;
- alter vendor facts without the vendor source owner;
- alter protected homepage top;
- rework protected SOK listings;
- deploy from unrelated `main` history.

## 9. Fine-tune acceptance checklist

Before normal website work resumes, verify all of the following:

- Universal Catalog is the canonical website retail product structure;
- customer-facing products have one trusted record each;
- customer-facing brand and internal supplier are separate where needed;
- brand pages are filtered views, not duplicate catalogs;
- department pages are filtered views, not duplicate catalogs;
- search/filter/detail routes use the canonical contract;
- trust-critical invalid products fail closed upstream;
- public copy sounds like a commercial retail store;
- no internal AI/OS/dev language is visible on priority shopping surfaces;
- product availability/purchase options are understandable;
- checkout targets are exact and safe;
- fulfillment owner is recoverable from every sellable item;
- desktop/mobile shopping paths pass;
- protected homepage top remains unchanged;
- SOK protected work remains intact;
- release path is exact-SHA, branch-aware, tested and receipted;
- MASTER RECON reports no P0 structural drift;
- Casey explicitly releases the feature freeze.

## CONTROL

**STRUCTURE FIRST → TRUST FIRST → CUSTOMER LANGUAGE → SIMPLE SHOPPING → EXACT CHECKOUT → PROVEN FULFILLMENT → VERIFIED RELEASE → THEN FEATURES.**
