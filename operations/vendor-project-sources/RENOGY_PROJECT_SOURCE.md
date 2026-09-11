# Elevation UpScales — Renogy Project Source

**Status:** ACTIVE / PUBLIC-SAFE PROJECT SOURCE  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Owner:** Casey Young  
**Project Operations Manager:** Renogy Branch Operations Manager  
**Project Specialist:** Renogy Project Specialist — verification / reconciliation / source intelligence  
**Human Ecommerce Oversight:** Peter Torres  
**Tailored Workflow:** `../RENOGY_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`  
**Master SOP:** `../RENOGY_VENDOR_MASTER_SOP.md`  
**Lower-48 Backorder/Warranty Program:** `../RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md`  
**Accepted mapping evidence:** `../RENOGY_LOWER48_WARRANTY_AVAILABILITY_MAP_BATCH_01_2026-09-10.md`; `../RENOGY_LOWER48_WARRANTY_AVAILABILITY_MAP_BATCH_02_2026-09-10.md`  
**Sales-First Scope:** `../RENOGY_SALES_FIRST_CATALOG_SCOPE_2026-09-10.md`  
**Current Launch Batch:** `../RENOGY_CATALOG_LAUNCH_BATCH_01_2026-09-10.md`  
**Universal Catalog Acceptance:** `../UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`  
**Current Maturity:** **STAGE 1 — PROVING** for sales-led catalog integration, continuing exact-SKU mapping and first paid order

## Purpose

Provide one recoverable source for turning the approved Renogy Dealer Partner relationship into repeatable Elevation direct-site vendor commerce **with live products and sales**, without restarting completed dealer onboarding or exposing protected dealer information.

## Reusable Elevation onboarding data

- **Legal company:** Elevation UpScales, Inc.
- **Entity:** Colorado profit corporation.
- **Owner / President:** Casey Young.
- **Owner/vendor account contact:** `casey@elevationupscales.com`.
- **Website / intended approved commerce channel:** `https://elevationupscales.com`.
- **Business model:** lithium battery supply, solar/off-grid power, logistics/market access; RV & Outdoor supporting division.
- **Preferred vendor model:** order-driven / dropship / controlled fulfillment first; no speculative opening inventory unless separately justified/approved.
- **Protected onboarding packet available:** Colorado formation record, IRS EIN confirmation, signed/current W-9, Colorado sales-tax/resale documentation, current company address/contact record, and supplier-specific forms.
- **Protected payment/account evidence:** maintained outside public Git.

Do not expose EIN, tax-license numbers, dealer pricing, raw inventory, portal credentials, tax documents, private correspondence, signatures, bank/card details or private addresses in this file.

## Verified supplier/account state

| Onboarding field | Current state | Control / note |
|---|---|---|
| Supplier relationship | **VERIFIED / APPROVED DEALER PARTNER** | Application, owner review, W-9 correction, supplier review and approval are complete. |
| Partner Portal | **VERIFIED / ACTIVE** | Renogy created Partner Portal access for `casey@elevationupscales.com`; credentials stay protected. |
| Dealer pricing | **AVAILABLE / PROTECTED** | Supplied through Partner Portal; never expose dealer cost publicly. |
| Sales channel | **VERIFIED — ELEVATION DIRECT WEBSITE** | Renogy stated third-party ecommerce/marketplaces are not permitted under current dealer terms. |
| Dropship | **VERIFIED / SUPPORTED** | Direct-to-customer dropshipping is supported. |
| Lower-48 shipping | **VERIFIED SUPPLIER GUIDANCE** | Renogy stated free shipping within 48 contiguous states; do not infer Hawaii/Alaska/special freight. |
| Opening order / MOQ | **VERIFIED — NO MINIMUM OPENING ORDER** | No speculative opening inventory gate. |
| Product catalog/SKU source | **PARTIAL / SOURCE INTAKE OPEN** | Portal/package and requested structured source data remain the current intake lane. |
| MAP / price-control source | **PARTIAL / MUST BE VERIFIED PER SKU** | Consolidated post-approval request is already sent; use portal/source package first and do not duplicate outreach. |
| Inventory / availability source | **PARTIAL / SKU-LEVEL CONTROL DEFINED / BATCHES 01–02 ACCEPTED** | Public Renogy evidence confirms in-stock, preorder, backorder and ordinary unavailable states can coexist. Partner Portal/current supplier source controls actual dealer-order acceptance. |
| Preorder/backorder | **VERIFIED AS SKU-SPECIFIC, NOT BLANKET** | Exact public paid-backorder examples now include `RSP100DCT-US` and `RBM500-US`. `backorder_allowed=true` only when the exact SKU is explicitly preorder/backorder supported by current Renogy evidence/order path. Generic zero stock is not enough. |
| Approved media/spec/manuals | **PARTIAL / SOURCE INTAKE OPEN** | Use Renogy portal/package/current approved sources before requesting duplicate material. |
| Fulfillment/tracking instructions | **PARTIAL / DROPSHIP VERIFIED, DETAIL INTAKE OPEN** | Exact order/tracking handoff still needs first-order operating proof. |
| Warranty/RMA | **CORE PROGRAM LOCKED / SKU-SPECIFIC MAPPING ACTIVE** | Batches 01–02 contain accepted exact-SKU warranty evidence. Claims route through Renogy Technical Support/Warranty authorization. Exact warranty duration/terms must be mapped to the exact SKU; Elevation supports the claim but does not self-authorize Renogy remedies. |
| Returns | **VERIFIED CORE RULE / DEALER PROCESS STILL DISTINCT** | Renogy stated a 30-day return baseline; dealer/Elevation customer handling must not simply copy Renogy direct-retail promises where account/product exceptions apply. |
| Tax/resale treatment | **AVAILABLE / ACCOUNT REVIEW CONTROL** | Reseller certificate may be uploaded through Partner Portal; treatment follows Renogy review/approval. |
| Commercial/project pricing | **AVAILABLE BY APPROVAL** | May be submitted based on volume/project requirements; not required for ordinary ecommerce. |
| Account/catalog contacts | **PARTIAL / REQUESTED** | Use Partner Portal/current thread; do not duplicate request if active. |
| Live Elevation Shopify Renogy catalog | **ZERO PRODUCTS AT SALES-FIRST RECON** | Connected Elevation Shopify search returned no Renogy products, accepted Renogy SKUs or Renogy collection. This is the current sales activation gap. |
| First-order proof | **NOT YET COMPLETE** | Required for Stage 2 repeatable active vendor commerce. |

## Existing technical preparation

- Renogy is already a first-class source/supplier/filter in the existing Elevation Admin Catalog model.
- Renogy Vendor Master SOP v1.2 contains locked Lower-48 preorder/backorder controls.
- The Lower-48 specialist program defines normalized availability and warranty fields for exact-SKU mapping.
- **Batch 01 is ACCEPTED** for its first exact-SKU panel/controller evidence, including exact public backorder support for `RSP100DCT-US` and exact 3-year warranty mapping for the identified Rover Li controller SKUs.
- **Batch 02 is ACCEPTED** for DC-DC charger, inverter/inverter-charger and monitoring evidence. It adds `RBM500-US` as a second exact public paid-backorder example.
- Batch 02 establishes a true narrow warranty-source conflict for `RIV4835CSH1S`: the current product page and current master warranty table disagree. Customer-facing warranty duration for that SKU remains `WARRANTY_CONFLICT_HOLD` until the authoritative current Renogy source is reconciled.
- Several storefront `-US` variants remain exact-suffix holds where the warranty table uses an unsuffixed SKU. Do not silently collapse identities.
- Accepted mapping evidence does **not** auto-approve a product, auto-enable checkout, fabricate MAP/inventory/media, or make every unavailable SKU backorderable.
- No third-party marketplace permission was added.

## Sales-first launch direction

The project is no longer allowed to stop at research/mapping while no Renogy products are live.

Current launch priorities are defined in `RENOGY_SALES_FIRST_CATALOG_SCOPE_2026-09-10.md` and `RENOGY_CATALOG_LAUNCH_BATCH_01_2026-09-10.md`.

Initial merchandising focus:

1. `RSP100DCT-US` — 100W N-Type bifacial panel;
2. `RNG-CTRL-RVR40` — Rover Li 40A MPPT controller;
3. `RBM500-US` — 500A battery monitor;
4. current 30A/50A DC-DC charger with MPPT family;
5. P2 12V pure-sine inverter family;
6. ShadowFlux N-Type anti-shading panel family;
7. supporting monitoring/BOS products after the feature products.

Renogy batteries remain secondary to SOK unless a defined product/capacity/commercial/logistics gap exists.

## Lower-48 availability / checkout rule

Use the exact current Renogy SKU state:

- `IN_STOCK`
- `PREORDER_AUTHORIZED`
- `BACKORDER_AUTHORIZED`
- `OUT_OF_STOCK_NOT_ORDERABLE`
- `UNKNOWN_HOLD`

Paid checkout for a delayed Renogy item may remain available only where the exact SKU has verified current preorder/backorder support and the customer presentation accurately reflects the delayed state without an unsupported ETA.

**Generic out-of-stock / zero stock does not create Renogy backorder authority.**

Accepted public examples `RSP100DCT-US` and `RBM500-US` demonstrate that Renogy intentionally uses a paid backordered state on selected exact variants; they do not authorize that state for adjacent SKUs.

Alaska, Hawaii, territories, international and special dangerous-goods routes remain outside this Lower-48 program until separately qualified.

## Warranty operating rule

Renogy warranty is exact-SKU controlled, not category-wide.

Use the source hierarchy established in `RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md` and preserve the current claim flow:

**CUSTOMER CLAIM → ELEVATION CAPTURES ORDER/SKU/SYMPTOM → RENOGY TECHNICAL/WARRANTY CASE → DIAGNOSTICS → RENOGY DETERMINATION → RMA IF REQUIRED → AUTHORIZED REMEDY → CUSTOMER UPDATE → RECEIPT/CLOSE**

Customer-facing warranty promises must not exceed the current warranty applicable to the exact SKU. Elevation may support and document the claim; final authorization/remedy remains with Renogy.

A source conflict blocks only the affected warranty statement/SKU action. The `RIV4835CSH1S` warranty conflict does not block unrelated verified Renogy products or continued catalog work.

## Required publication/readiness inputs

For each candidate Renogy SKU establish:

**EXACT SKU/MODEL → VERIFIED PRODUCT FACTS → CURRENT MAP/PRICE CONTROL → CURRENT AVAILABILITY / PREORDER-BACKORDER STATE → APPROVED MEDIA → LOWER-48 FULFILLMENT/SHIPPING STATE → EXACT WARRANTY REFERENCE OR OMIT HELD TERM → DIRECT-SITE CHANNEL → RETURNS/RMA REFERENCE**

Use the Partner Portal and supplier package before requesting duplicate information.

Only the missing fact needed for the affected SKU/action is a gate.

## Work that continues while a protected fact waits

A missing MAP/media/portal/warranty fact for one SKU does not put the Renogy project into blanket WAITING.

Continue:

- next prioritized exact-SKU mapping;
- launch candidate research;
- customer-ready listing drafting using verified facts;
- category/tag/SEO staging;
- compatibility/comparison structure;
- cross-sell/system mapping;
- approved-media classification;
- clearly non-public Shopify draft preparation where safe;
- universal-catalog field mapping and integration QA;
- public-search/discoverability preparation without unauthorized design/copy changes;
- another SKU whose publication set can be cleared independently.

## Remaining activation work

1. Clear current MAP/customer price, dealer sellability and approved-media gates for Tier A launch candidates.
2. Build/stage Tier A customer-ready listings while those exact activation facts are verified.
3. Continue Tier B exact-SKU mapping: current DC-DC MPPT family, larger P2 inverters, ShadowFlux/N-Type panels and supporting monitoring/BOS.
4. Normalize clean launch SKUs into the universal catalog.
5. Activate each product individually when its minimum safe publication set clears; do not wait for the whole Renogy catalog.
6. Verify universal store search/filter/product/cart/checkout behavior under `UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`.
7. Verify intended public Renogy catalog/product discoverability as live routes become available.
8. Complete the first real paid order through Renogy purchase → acceptance → tracking → delivery.
9. Use product views, cart/checkout activity, sales, contribution and support friction to prioritize later catalog waves.
10. Record source-refresh, warranty and returns operation so the lane becomes repeatable.

## Real gates

Keep:

- exact SKU identity;
- current MAP/price-control verification for activation;
- direct-site channel authorization;
- supplier sellability/orderability or exact-SKU preorder/backorder authorization;
- approved media/source identity for public use;
- exact warranty term/source before publishing a duration or remedy promise;
- narrow source conflicts such as the current `RIV4835CSH1S` warranty conflict;
- customer payment/order integrity;
- special Hawaii/Alaska/DG route verification when applicable;
- binding commercial/financial commitments requiring owner approval.

Do not reopen dealer application, W-9, approval, portal creation or opening-order qualification as routine gates. Do not block one verified SKU because another Renogy SKU is unavailable, has an exact-suffix hold, or has unresolved warranty enrichment.

## No unauthorized design/copy changes

Renogy catalog integration does not authorize independent storefront redesign or rewriting already-approved site marketing copy.

Use the existing Elevation universal-catalog/store presentation. Product listing copy may be prepared from verified source facts under the sales-first scope, but broader design/brand/page-copy changes require separate authorization.

## Next action

**CLEAR TIER A ACTIVATION FACTS → BUILD/STAGE CUSTOMER-READY TIER A LISTINGS → ACTIVATE EACH CLEAN SKU → CONTINUE TIER B RECON IN PARALLEL → UNIVERSAL-CATALOG QA → FIRST REAL ORDER PROOF → EXPAND FROM SALES DATA**

Batches 01–02 are complete evidence. Do not recreate them without contradictory current supplier evidence.

## Close condition for active repeatable vendor onboarding

Renogy reaches repeatable active vendor commerce when the verified source/update path is established, a compliant direct-site catalog is live inside the universal catalog with exact-SKU availability/warranty controls, one real paid order completes Renogy purchase through customer delivery, search/store/order behavior passes the universal acceptance baseline, and source refresh / returns / warranty routes are repeatable.
