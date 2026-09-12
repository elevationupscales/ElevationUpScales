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
**Supplier Source / Alias Recon:** `../RENOGY_SUPPLIER_SOURCE_INTAKE_AND_SKU_ALIAS_RECON_2026-09-11.md`  
**Shopify Live Draft Verification:** `../RENOGY_SHOPIFY_DRAFT_LIVE_VERIFICATION_2026-09-11.md`  
**Lower-48 Catalog / Hazmat Recon:** `../RENOGY_LOWER48_CATALOG_HAZMAT_SHOPIFY_RECON_2026-09-11.md`  
**Universal Catalog Acceptance:** `../UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`  
**Current Maturity:** **STAGE 1 — PROVING** for sales-led catalog integration, exact-SKU activation and first paid order

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
| Partner Portal | **VERIFIED / ACTIVE / AUTHENTICATED SESSION AVAILABLE** | Renogy Partner Portal access exists for the company account. Credentials stay protected. Current authenticated browser access is available for read-only SKU/orderability verification; do not expose credentials or account-private data. |
| Dealer pricing | **AVAILABLE / PROTECTED** | Supplied through Partner Portal; never expose dealer cost publicly. |
| Sales channel | **VERIFIED — ELEVATION DIRECT WEBSITE** | Renogy stated third-party ecommerce/marketplaces are not permitted under current dealer terms. |
| Dropship | **VERIFIED / SUPPORTED** | Direct-to-customer dropshipping is supported. |
| Lower-48 shipping | **VERIFIED SUPPLIER GUIDANCE** | Renogy stated free shipping within 48 contiguous states; do not infer Hawaii/Alaska/special freight. |
| Opening order / MOQ | **VERIFIED — NO MINIMUM OPENING ORDER** | No speculative opening inventory gate. |
| Product catalog/SKU source | **VERIFIED CURRENT SUPPLIER WORKBOOK RECEIVED / PUBLIC PROSPECT UNIVERSE ALSO RECONCILED** | Renogy supplied a current product/item workbook with item number, description, public price-reference fields and UPC where available. Public Lower-48 recon also established a 188-product prospect universe for later expansion. Neither source is blanket publication authority. |
| MAP / price-control source | **PROTECTED / MUST BE VERIFIED PER SKU BEFORE ACTIVATION** | Renogy supplied current public-price-reference guidance; protected dealer/MAP controls remain private and controlling where applicable. Public retail reference does not replace protected MAP verification. |
| Inventory / availability source | **VERIFIED SOURCE PATH / EXACT SKU CHECK REQUIRED** | Partner Portal is the current dealer inventory/orderability source; exact quantity may also be confirmed with Renogy. Shopify zero on-hand inventory is not supplier inventory and is not backorder authorization. |
| Preorder/backorder | **VERIFIED AS SKU-SPECIFIC, NOT BLANKET** | Exact public paid-backorder examples include `RSP100DCT-US` and `RBM500-US`. `backorder_allowed=true` only when the exact SKU is explicitly preorder/backorder supported by current Renogy evidence/order path. Generic zero stock is not enough. |
| Approved media/spec/manuals | **VERIFIED APPROVED SOURCE RECEIVED / PER-SKU ATTACHMENT OPEN** | Renogy supplied the main Marketing Toolkit plus current product/spec source guidance. Product-by-product media selection and exact identity attachment remain activation tasks. |
| Fulfillment/tracking instructions | **CORE DROPSHIP FLOW VERIFIED / FIRST-ORDER PROOF OPEN** | Customer order → exact SKU/price/sellability verification → Renogy order → customer recipient data → Renogy shipment → tracking through primary account/Partner Portal → Elevation customer update. Ordinary lead-time guidance is planning guidance, not a guarantee. |
| Warranty/RMA | **CORE PROGRAM LOCKED / SKU-SPECIFIC MAPPING ACTIVE** | Batches 01–02 contain accepted exact-SKU warranty evidence. Claims route through Renogy Technical Support/Warranty authorization. Exact warranty duration/terms must be mapped to the exact SKU; Elevation supports the claim but does not self-authorize Renogy remedies. |
| Returns | **VERIFIED CORE RULE / DEALER PROCESS STILL DISTINCT** | Renogy stated a 30-day return baseline; dealer/Elevation customer handling must not simply copy Renogy direct-retail promises where account/product exceptions apply. |
| Tax/resale treatment | **AVAILABLE / ACCOUNT REVIEW CONTROL** | Reseller certificate may be uploaded through Partner Portal; treatment follows Renogy review/approval. |
| Commercial/project pricing | **AVAILABLE BY APPROVAL** | May be submitted based on volume/project requirements; not required for ordinary ecommerce. |
| Account/catalog contacts | **VERIFIED — SALES SUPPORT PRIMARY** | Use the current Sales Support / Partner Portal route. Do not duplicate already-answered source requests. |
| Live Elevation Shopify Renogy catalog | **FIVE PRODUCTS STAGED AS DRAFT / ZERO ACTIVE** | Live Shopify verification found exactly five Renogy DRAFT products and zero accidental activations. Preserve these records; do not recreate them. |
| First-order proof | **NOT YET COMPLETE** | Required for Stage 2 repeatable active vendor commerce. |

## Existing technical preparation

- Renogy is already a first-class source/supplier/filter in the existing Elevation Admin Catalog model.
- Renogy Vendor Master SOP v1.2 contains locked Lower-48 preorder/backorder controls.
- The Lower-48 specialist program defines normalized availability and warranty fields for exact-SKU mapping.
- **Batch 01 is ACCEPTED** for its first exact-SKU panel/controller evidence, including exact public backorder support for `RSP100DCT-US` and exact 3-year warranty mapping for the identified Rover Li controller SKUs.
- **Batch 02 is ACCEPTED** for DC-DC charger, inverter/inverter-charger and monitoring evidence. It adds `RBM500-US` as a second exact public paid-backorder example.
- Batch 02 establishes a true narrow warranty-source conflict for `RIV4835CSH1S`: the current product page and current master warranty table disagree. Customer-facing warranty duration for that SKU remains `WARRANTY_CONFLICT_HOLD` until the authoritative current Renogy source is reconciled.
- Several storefront `-US` variants remain exact-suffix holds where the warranty table uses an unsuffixed SKU. Do not silently collapse identities.
- Renogy Sales Support supplied a current item workbook, Marketing Toolkit and operating answers for availability, dropship, tracking, warranty/returns and support routing.
- Public Lower-48 recon established a **188-product prospect universe** and a lithium/hazmat intake schema. This is expansion evidence, not blanket sellability/MAP approval.
- Five Shopify Renogy records already exist as DRAFT and are live-verified as contained. Do not recreate them.
- Current staged-wave supplier-item reconciliation:
  - `RSP100DCT-US` → `RSP100DCT-G1-US` — unique public-alias to supplier-item mapping; activation QA may continue.
  - `RBM500-US` → `RBM500-G3-US` — unique public-alias to supplier-item mapping; activation QA may continue with bounded warranty language.
  - `RBC2125DS-21W-US` → `RBC2125DS-21W-G3-US` — identity mapping established; hold only current dealer orderability/delayed-order authority.
  - `RNG-INVT-2000-12V-P2-US` — supplier workbook contains multiple generation-coded candidates; hold only exact current generation/order-source identity.
  - `RNG-CTRL-RVR40` — current supplier workbook exposes a Bluetooth generation-coded Rover 40A item rather than a clean match to the staged non-Bluetooth identity; hold only exact current variant identity.
- Accepted mapping evidence does **not** auto-approve a product, auto-enable checkout, fabricate MAP/inventory/media, or make every unavailable SKU backorderable.
- No third-party marketplace permission was added.

## Sales-first launch direction

The project is no longer allowed to stop at research/mapping while no Renogy products are active.

Current launch priorities are defined in `RENOGY_SALES_FIRST_CATALOG_SCOPE_2026-09-10.md` and `RENOGY_CATALOG_LAUNCH_BATCH_01_2026-09-10.md`.

Initial merchandising focus:

1. `RSP100DCT-US` — 100W N-Type bifacial panel;
2. `RBM500-US` — 500A battery monitor;
3. `RBC2125DS-21W-US` — 50A IP67 DC-DC charger with MPPT once current orderability is verified;
4. current Rover 40A controller variant after exact current identity is resolved;
5. current P2 2000W inverter generation after exact supplier order-source identity is resolved;
6. ShadowFlux / N-Type panels and supporting monitoring/BOS for later waves.

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

- exact-SKU public-alias → supplier-item mapping;
- launch candidate research;
- customer-ready listing drafting using verified facts;
- category/tag/SEO staging;
- compatibility/comparison structure;
- cross-sell/system mapping;
- approved-media classification and product-by-product attachment;
- clearly non-public Shopify draft preparation where safe;
- universal-catalog field mapping and integration QA;
- public-search/discoverability preparation without unauthorized design/copy changes;
- another SKU whose publication set can be cleared independently;
- lithium transport-document reconciliation in parallel without blocking clean non-lithium Lower-48 products.

## Remaining activation work

1. Preserve the five existing Shopify DRAFT records; do not recreate them.
2. Advance `RSP100DCT-US` and `RBM500-US` through final exact-media / current-price / current-sellability activation QA independently.
3. Use the authenticated Partner Portal read-only path to resolve:
   - `RBC2125DS-21W-US` current dealer orderability / delayed-order authority;
   - `RNG-INVT-2000-12V-P2-US` exact current generation/order-source identity;
   - `RNG-CTRL-RVR40` exact current variant identity.
4. Attach exact approved Renogy media to each clean staged listing.
5. Recheck current customer-facing price/MAP control and exact availability immediately before activation.
6. Activate each clean product individually; do not wait for all five or the whole Renogy catalog.
7. Continue Tier B exact-SKU mapping from the 188-product prospect universe: current DC-DC/MPPT family, larger P2 inverters, ShadowFlux/N-Type panels and supporting monitoring/BOS.
8. Normalize clean launch SKUs into the universal catalog and verify search/filter/product/cart/checkout behavior under `UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`.
9. Verify intended public Renogy catalog/product discoverability as live routes become available.
10. Complete the first real paid order through Renogy purchase → acceptance → tracking → delivery.
11. Use product views, cart/checkout activity, sales, contribution and support friction to prioritize later catalog waves.
12. Record source-refresh, warranty and returns operation so the lane becomes repeatable.

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

**AUTHENTICATED PORTAL CHECK FOR THREE EXACT HOLDS → FINAL QA TWO CLEANER DRAFTS → ATTACH EXACT APPROVED MEDIA → REFRESH PRICE/AVAILABILITY → ACTIVATE EACH CLEAN SKU → UNIVERSAL-CATALOG QA → FIRST REAL ORDER PROOF → EXPAND FROM SALES DATA**

Batches 01–02 are complete evidence. The supplier workbook/toolkit, alias recon and live Shopify draft verification are newer accepted state. Do not recreate completed source intake or five staged Shopify records without contradictory current supplier evidence.

## Close condition for active repeatable vendor onboarding

Renogy reaches repeatable active vendor commerce when the verified source/update path is established, a compliant direct-site catalog is live inside the universal catalog with exact-SKU availability/warranty controls, one real paid order completes Renogy purchase through customer delivery, search/store/order behavior passes the universal acceptance baseline, and source refresh / returns / warranty routes are repeatable.
