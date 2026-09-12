# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-11  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Last source-state reconciliation baseline:** `18b8d752278faf2d73e8d309a66d855b1a0ffe54`  
**Last control-surface S.O.P. sync:** 2026-09-11 / `MASTER_SOP_V1_0.md` + `MASTER_OS_GLOSSARY_V1_0.md` / pre-sync main `d57d8dd2a83dabd2e487cb65679dced811dd38db`

> The reconciliation baseline records the newest business/project source state reviewed by this board. A later commit that only updates this board or other control documentation does not make the marker stale by itself. Reconcile again when a material project/vendor/customer/release state changes.

## Purpose

This file is the single public-safe global work board for unresolved Elevation UpScales operating work.

It exists so that:

**ONE CURRENT STATE EXISTS FOR EACH WORK ITEM**

and

**NEW WORK NEVER CAUSES EXISTING OPEN WORK TO DISAPPEAR.**

A priority change does not close a work item. A new project does not erase an older unfinished obligation. WAITING and HOLD items remain visible until their trigger occurs or they are explicitly closed.

This board is a **management routing and current-state control surface**. It does not supersede the controlling Operating System S.O.P. or Master OS Glossary.

## Authority

Use this order:

1. Casey / Owner's newest explicit direction.
2. `MASTER_SOP_V1_0.md` and `MASTER_OS_GLOSSARY_V1_0.md` for Operating System authority, terminology, control rules and system behavior.
3. This `CURRENT_WORK_BOARD.md` for reconciled global current priority, ownership and work-item state.
4. The applicable controlling Project/Lane S.O.P., Project Source, tailored workflow and Project Worktree for lane-specific rules and execution state.
5. Current application / Git / platform / correspondence evidence for actual technical or operational state.
6. Dated records and historical handoffs as evidence only.

`SUPPLIER_LEADS_LIVE_MAP.md` remains the canonical supplier-domain relationship/status map. It does not replace this global work board.

Dated follow-up files such as `ACTIVE_FOLLOWUPS_2026-09-08.md` are correspondence/action evidence and duplicate-send protection records. Their older priority labels do not override this board.

Manager/worker control records define lane authority and execution behavior. Any copied rolling priority text in those records defers to the controlling Master S.O.P./Glossary, this board for current routing/state, and newer Casey direction.

**THIS BOARD ROUTES WORK; IT DOES NOT ASSIGN EVERY ROW TO EVERY MANAGER.** Dedicated project managers act only on rows assigned to their project/manager or on a bounded handoff explicitly routed into their project. Cross-project reassignment belongs to the Operating System Project Manager / Company Operations Manager.

Owner direct execution semantics for `RUN`, `RUN WORKFLOW`, `CONTINUE WORKFLOW`, and equivalent commands are controlled by the Master S.O.P./Glossary together with applicable current owner-command and project-continuity controls.

## Operating loop

Management:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Execution:

**PICK UP LAST VERIFIED WORKTREE → VERIFY → EXECUTE → DOCUMENT MATERIAL DELTA → CLOSE / WAIT / HOLD → CONTINUE NEXT IN-PROJECT ITEM**

Worker failure does not automatically block the project. Preserve the work item and route only the unfinished action.

Blocked sub-items move to the back of their project queue with blocker/trigger preserved; finishable work continues.

## Dedicated Vendor Project Source Index

Every current dedicated vendor project has one public-safe Project Source containing the reusable Elevation onboarding facts, protected-document availability, supplier/account readiness, current gaps, activation proof and real gates required to build/operate the supplier as an active Elevation vendor.

| Vendor Project | Project Operations Manager | Project Specialist | Project Source | Tailored Workflow | Current High-Level State |
|---|---|---|---|---|---|
| SOK Supplier / Commerce / Hawaii Logistics / Warranty | SOK Project Operations Manager | SOK RECON OS | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md) | [SOK Tailored Workflow](./SOK_TAILORED_PROJECT_WORKFLOW_2026-09-10.md) | ACTIVE PRIMARY SUPPLIER / Lower-48 CONTROLLED / official media source verified / Hawaii profile-extraction technical-access blocker + warranty-logistics economics PROVING |
| VEVOR Supplier / Catalog / Shopify / Fulfillment | VEVOR Project Operations Manager | VEVOR Reconciliation & Price-Control Specialist | [VEVOR Project Source](./vendor-project-sources/VEVOR_PROJECT_SOURCE.md) | [VEVOR Tailored Workflow](./VEVOR_TAILORED_PROJECT_WORKFLOW_2026-09-10.md) | ACTIVE / A-tier catalog live / 17-SKU B-tier queue prepared / public Shopify checkout verified / first-order proof open |
| Renogy Dealer / Catalog / Commerce Integration | Renogy Branch Operations Manager | Renogy Project Specialist | [Renogy Project Source](./vendor-project-sources/RENOGY_PROJECT_SOURCE.md) | [Renogy Tailored Workflow](./RENOGY_TAILORED_PROJECT_WORKFLOW_2026-09-10.md) | APPROVED DEALER / portal active / Batches 01–02 accepted / Batch 03 current evidence / SALES-FIRST CATALOG ACTIVATION ACTIVE / zero live Renogy Shopify products at recon |
| Kingboss B2B Supplier Onboarding / Catalog / Commerce | Kingboss Project Operations Manager | Kingboss Project Specialist | [Kingboss Project Source](./vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md) | [Kingboss Tailored Workflow](./KINGBOSS_TAILORED_PROJECT_WORKFLOW_2026-09-10.md) | B2B APPROVED / supplier response + compliance intake received / project reconciliation active |

Prospects/qualified suppliers remain in `SUPPLIER_LEADS_LIVE_MAP.md` until a dedicated vendor project/manager exists. Promotion to a dedicated vendor project requires a Project Source under `VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md`; do not create dozens of project files for cold/outbound leads.

## Shared catalog acceptance lane

Cross-vendor technical/store completion is owned by:

`UNIVERSAL_CATALOG_LIVE_INTEGRATION_PROJECT.md`

Definition of Done:

`UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`

Public search evidence:

`STORE_SEARCH_DISCOVERABILITY_RECON_2026-09-10.md`

This shared developer lane does not take over supplier commercial management and does not authorize design/copy changes.

## Worktree persistence rule

Unfinished project work remains on this board or in its owning project worktree until its close condition is proven or Casey explicitly supersedes it.

A chat ending, worker/session failure, manager change, new priority, branch/PR change, new owner command, or one waiting sub-item does **not** close the older worktree.

At takeover/RUN/resume:

**CURRENT MAIN → MASTER S.O.P./GLOSSARY → PROJECT SOURCE WHEN VENDOR → PROJECT SOP/TAILORED WORKFLOW → LAST VERIFIED ACTION → NEXT EXECUTABLE ACTION → RESUME → DOCUMENT MATERIAL DELTA → CONTINUE SAME PROJECT**

## Prior owner-directed execution window — RETIRED AS CONTROLLING PRIORITY

The owner-directed window that ran **through midnight 2026-09-10 MDT** is now historical context only and must not control September 11 sequencing.

Its valid work items remain preserved in the ACTIVE / WAITING / HOLD sections below until individually reconciled, completed, superseded or reprioritized. Legacy labels such as `TONIGHT`, `TOMORROW`, or `AFTER RELEASE` inside preserved rows are evidence of the prior window and are **non-controlling** until the next priority-specific board reconciliation.

The durable execution rule from that window remains valid where it does not conflict with Master S.O.P. V1.0:

**COMPLETED SETUP IS NOT A GATE. PENDING ENRICHMENT IS NOT A GATE. BLOCK ONLY THE EXACT UNSAFE OR UNVERIFIED LANE.**

---

# ACTIVE

| Work Item | Owner / Execution Lane | State | Priority | Blocker / Trigger | Next Action | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| Shopify first-sale acceleration + PayPal cart integration | **Operating System Project Manager / Company Operations**; MASTER DEVELOPER + Shopify/Ecommerce execution; vendor managers supply verified SKU facts | ACTIVE — NATIVE SHOPIFY CHECKOUT LIVE / PAYPAL CART BIG IDEA OPEN | **P0 OWNER DIRECTED / #1 COMPANY PRIORITY** | Shopify password gate is CLOSED. Native Shopify QA reached payment-entry checkout on `VEVOR 50A RV Power Outlet Box — NEMA 14-50R` at `$34.90` with no checkout blocker; cards + Shop Pay were observed. PayPal was not observed on that native checkout. The separate custom Elevation checkout remains a parallel repair lane; it must not disable the working native Shopify path. | Keep native Shopify checkout live. RECON/rank the first 5–10 low-friction, margin-safe, supplier-verified products; reverify live SKU/price/MAP/sellability/fulfillment before promotion; evaluate the PayPal business cart/developer flow currently open with Owner; implement PayPal cart in isolation or as a compatible bridge; prove durable order capture; then push free/owned traffic only to proven buy paths. Revenue may flow through the working Shopify payment methods while PayPal integration is completed. | Repeatable direct-site cart/checkout/order-routing path is proven **and** first verified Elevation website PayPal order is received and routed to fulfillment, closing the current startup-revenue phase | `PAYPAL_CART_INTEGRATION_REVENUE_DIRECTIVE_2026-09-11.md`; `STARTUP_REVENUE_PHASE_NONBLOCKING_ORDER_STANDARD_2026-09-11.md`; Shopify live QA 2026-09-11 |
| VEVOR direct-site catalog / first-order activation | **VEVOR Project Operations Manager**; Peter Torres oversight; VEVOR Specialist + bounded Shopify/shared workers | IN_PROGRESS — A-TIER CATALOG LIVE / B-TIER PREPARED / PUBLIC SHOPIFY CHECKOUT VERIFIED / FIRST ORDER OPEN | P1-A | **NO STOREFRONT PASSWORD GATE REMAINS.** Owner lifted Shopify password protection and native Shopify checkout was verified publicly on a VEVOR product. All existing VEVOR Direct catalog work remains subject to live per-SKU price/MAP, supplier sellability and fulfillment verification before promotion/order placement. A read-only VEVOR portal inspection reached only signed-out state, so account-specific details remain partially unverified; that is a parallel evidence task, not a feed/catalog/onboarding rollback. Focused blind-shipping/tracking/RMA/support follow-up is waiting on VEVOR and is also **not a general commerce blocker**. | Keep public Shopify checkout open; run fast-revenue per-SKU verification on the highest-conversion VEVOR launch candidates; promote only clean products. On first real order reverify exact SKU + live sellability + price/MAP, place through VEVOR, capture supplier acceptance/tracking/customer completion and actual exceptions. Continue PayPal cart work through the P0 row without breaking native Shopify. Expand B-tier only after fresh per-SKU checks are satisfied. | First clean live order proves operating flow and the repeatable VEVOR fulfillment path can move to CONTROLLED | [VEVOR Project Source](./vendor-project-sources/VEVOR_PROJECT_SOURCE.md); `VEVOR_VENDOR_MASTER_SOP.md`; `VEVOR_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`; `VEVOR_B_TIER_PREPARATION_2026-09-10.md`; `VEVOR_FULFILLMENT_QUALIFICATION_2026-09-10.md`; `VEVOR_DIRECT_FEED_PREP_2026-09-10.md` |
| Complementary vendor activation — existing qualified queue | Peter Torres / Vendor Onboarding + Company Operations | IN_PROGRESS — SOLARSTOCK SENT/WAITING + REMAINING QUEUE OPEN | P1-B TONIGHT | SolarStock USA is qualified for project-driven module supply and the bounded quote/capability request has already been sent in the existing supplier thread. **Do not resend or chase while pending.** No inventory purchase, stocking commitment or customer-facing availability has been authorized. Other complementary supplier lanes continue independently. | WAIT on SolarStock. When it replies, reconcile exact quote, warehouse, freight, job-site/direct-ship, blind-shipping and receiving capability privately. Meanwhile continue only remaining clean qualified routes with dedupe before every send. Treat SolarStock as project-driven sourcing and do not create a dedicated SolarStock project unless volume/complexity later justifies promotion. | SolarStock quote/delivery lane reaches VERIFIED / REJECTED / defined owner commitment gate as appropriate and the remaining supplier queue reaches durable SENT / APPLICATION SUBMITTED / WAITING / BLOCKED states without duplicate outreach | `SOLARSTOCK_USA_QUALIFICATION_DELTA_2026-09-10.md`; `SUPPLIER_LEADS_LIVE_MAP.md`; current supplier correspondence; `VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md` |
| Renogy sales-first catalog / live commerce activation | **Renogy Branch Operations Manager / assigned Renogy workers**; Peter Torres oversight; bounded Catalog/Developer/Fulfillment handoffs | IN_PROGRESS — APPROVED / SOURCE MAPPING ACTIVE / SALES-FIRST LAUNCH WAVE DEFINED / ZERO LIVE RENOGY PRODUCTS AT RECON | P1-C OWNER DIRECTED | Batches 01–02 are accepted. Batch 03 adds current public evidence for larger inverters, REGO, Renogy ONE and N-Type panels and follows the owner blockage-deferral rule. Exact MAP/customer price, Partner Portal orderability and approved-media facts still gate activation SKU by SKU. `RIV4835CSH1S` remains a narrow warranty-conflict hold. Missing one exact fact must not stop safe work on another Renogy launch product. | Use `RENOGY_SALES_FIRST_CATALOG_SCOPE_2026-09-10.md` and `RENOGY_CATALOG_LAUNCH_BATCH_01_2026-09-10.md`. Clear Tier A activation facts, build/stage customer-ready listings, activate each clean SKU, continue Tier B exact-SKU recon in parallel, feed live products into the universal catalog acceptance lane, then prove the first real order. | Trusted Renogy launch catalog is live in the universal catalog; representative products pass search/filter/product/cart/checkout acceptance; first real paid Renogy order completes supplier purchase through delivery; refresh/warranty/returns routes become repeatable | [Renogy Project Source](./vendor-project-sources/RENOGY_PROJECT_SOURCE.md); `RENOGY_SALES_FIRST_CATALOG_SCOPE_2026-09-10.md`; `RENOGY_CATALOG_LAUNCH_BATCH_01_2026-09-10.md`; `RENOGY_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`; `RENOGY_WORKFLOW_COMPLETION_GATE_2026-09-10.md` |
| Universal catalog live vendor integration acceptance | Operating System / Developer + Catalog Integration; vendor managers supply verified source facts | IN_PROGRESS — BASELINE ESTABLISHED / CROSS-VENDOR ACCEPTANCE OPEN | P1-D PARALLEL | SOK is the strongest current public catalog/search reference; VEVOR has live Shopify products and native checkout proof; Renogy had zero Shopify products at sales-first recon; Kingboss supplier intake has advanced and requires project reconciliation. Public web search proves the Elevation store and SOK routes are discoverable, but distinct public Renogy/VEVOR/Kingboss catalog discoverability is not yet proven as complete. | Apply `UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`: reconcile each active vendor source → normalized universal catalog → existing store search/filter → exact product page → direct checkout or correct assisted/freight path → order/source capture → source refresh → mobile/desktop smoke → public discoverability. Do not redesign or rewrite approved site copy. | Every current active dedicated vendor participates in the intended universal catalog path; representative vendor products pass full store functionality; no shared defect blocks valid customer purchase; vendor/source refresh is recoverable; intended public vendor/product routes are discoverable; completion evidence packet recorded | `UNIVERSAL_CATALOG_LIVE_INTEGRATION_PROJECT.md`; `UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`; `STORE_SEARCH_DISCOVERABILITY_RECON_2026-09-10.md`; vendor Project Sources |
| Homepage lithium hero / approved retail branding release | Developer / Release lane | RELEASE READY | P1 PARALLEL TONIGHT | **NO MERGE GATE REMAINS.** PR #94 merged at `3ee835f0d31e7f69922972358e68b1e22cdf1fdf`. No exact-SHA release run has executed yet; live production still shows the prior hero. Current main has advanced through owner-directed Operations commits, so the release must resolve and use the then-current reviewed `main` SHA. | Dispatch `Worker Exact-SHA Release` for the current approved `main` SHA to **preview**; require preview PASS; then dispatch the same SHA to **production** with required confirmation and smoke `elevationupscales.com`. | Same-SHA preview PASS; production deployment PASS; canonical live site shows approved homepage/lithium presentation; release receipt recorded | GitHub PR #94; `.github/workflows/worker-release-deploy.yml`; current `main` |
| Checkout-gate cleanup — authorized preorder/backorder and unnecessary internal gates | Commerce / Developer lane | READY | P2 AFTER RELEASE | No live outage; confirmed generic zero-stock/HOLD ordering conflict exists in universal-store eligibility. Supplier-specific authorization must control delayed-order behavior: SOK supports its verified backorder mode; Renogy has exact-SKU delayed-order examples while unsupported unavailable Renogy SKUs remain blocked; VEVOR has no verified blanket preorder/backorder path. | Correct only confirmed gate ordering so supported paid-order paths are not blocked by generic zero-stock/internal HOLD state while supplier-specific authorization still prevents unsupported delayed orders. Preserve safety/channel/payment/destination controls. Do not let this custom-checkout cleanup disable working native Shopify checkout. | Regression proves authorized SOK and exact-SKU Renogy delayed-purchase paths remain purchasable when valid, unsupported unavailable products remain blocked, and real controls remain intact | `MANAGEMENT_OPERATING_SOP.md`; `SOK_ECOMMERCE_SHIPPING_SOP.md`; `RENOGY_VENDOR_MASTER_SOP.md`; accepted Renogy mapping batches; `PROJECT_WORKTREE_CONTINUITY_AND_GATE_MATURITY_STANDARD_2026-09-10.md`; issue #65 residual checkout architecture |
| Shopify/SOK paid-order Operating System bridge | Commerce / Developer + Company Operations | VERIFYING | P2 | Implementation merged; only live purchase-to-OS proof remains | Prove live purchase → payment → order ingestion → SKU/source/fulfillment verification → production receipt when a real order exists; do not manufacture a management gate around the absence of an order. | Full first-order acceptance chain completed | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); current merged application state; store-integration control |
| Universal store / normalized retail architecture residual | Commerce / Catalog / Developer lane | IN_PROGRESS — LEGACY SPEC PRESERVED / CURRENT EXECUTION DECOMPOSED | P2 AFTER CURRENT P1 RELEASE | Issue #65 still contains valid unfinished architecture/QA requirements, but it is not a second priority board. Its SOK, Doba, checkout, universal-store, legacy-URL and retail QA requirements are executed through current board rows/project lanes rather than a single company-wide release train. | Continue the smallest current residuals after release: checkout-gate cleanup, Doba availability/legacy cleanup, normalized catalog/admin acceptance and universal-store/legacy-route QA. Reconcile completion back to issue #65 instead of rebuilding already-merged implementation. | Issue #65 Definition of Done is either proven by current implementation/QA or narrowed to explicit remaining residuals with no duplicate controlling worktree | GitHub issue #65; current application; `CURRENT_WORK_BOARD.md`; `UNIVERSAL_CATALOG_LIVE_INTEGRATION_PROJECT.md` |
| Master Catalog authenticated Admin preview | Catalog / Developer lane | VERIFYING | P2 | Authenticated acceptance evidence remains; underlying migration foundation is not to be rebuilt | Complete only the remaining authenticated preview/acceptance evidence when routed; do not treat it as a blocker to unrelated vendor/deployment work. | Authenticated preview and required acceptance evidence complete | `DAILY_CLOSEOUT_2026-09-09_THROUGH_MIDNIGHT_MDT.md`; GitHub issue #24 retained pending exact acceptance reconciliation |
| SOK Supplier, Commerce & Warranty Project | **SOK Project Operations Manager** / SOK RECON OS specialist / bounded SOK workers | IN_PROGRESS — LOWER-48 CONTROLLED / HAWAII MEDIA-ECONOMICS PROVING / H2O SOURCE ACCESS BLOCKER | P2 STRATEGIC | Hawaii warranty operating-input request remains WAITING on SOK, but that does not stop independent SOK work. Official product-image source has already been supplied. For H2O/Pasha additional-model pricing, SOK already supplied the required manufacturer workbook; the exact legacy `.xls` remains attached in existing correspondence but is not readable/downloadable through the current Gmail connector, and it is not presently preserved in the accessible SOK Drive/catalog structure. This is **TECHNICAL ACCESS / EXISTING SOURCE FILE**, not missing supplier cooperation. A starter Hawaii landed-cost model exists privately, but routes are not production-proven until current quotes/excluded costs/first-shipment actuals are reconciled. | Do not resend supplier requests. Continue normal SOK commerce and the next highest-value verified Lower-48/catalog worktree. Recover/map only verified media assets available from the existing official source. Recover the legacy workbook only through an authorized source path. Process Logistics Plus terms and SOK warranty response when they arrive. | Repeatable SOK commerce/warranty operating state established; media/profile gaps resolved without duplicate supplier outreach; Hawaii economics advance from verified quotes and first-shipment actuals rather than assumptions | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_RECON_OS_PROJECT.md`; `SOK_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`; `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md` |
| H2O Logistics Hawaii / Pasha backup route | Company Operations / Logistics + SOK Project | IN_PROGRESS — TECHNICAL ACCESS / EXISTING SOURCE FILE | P2 STRATEGIC | H2O confirmed it is the Pasha-facing account/coordination party. SOK already supplied the additional-model packed-profile workbook. The workbook remains in existing SOK correspondence, but the current Gmail connector does not expose the legacy `.xls` as readable/downloadable and the exact workbook is not presently preserved in accessible SOK Drive folders/current catalog. Exact proof-model profiles already verified must not be generalized to other SKUs. | Recover the existing workbook through an authorized attachment/export or human-download path; preserve it in the private SOK evidence structure; extract only exact verified model rows and route them to H2O/Pasha. Do not estimate missing cargo data, copy one model's profile to another, or ask SOK to repeat already-supplied information. | Exact priority SOK profiles are recovered and priced, and H2O/Pasha acceptance/booking requirements are defined for the intended configurations | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_RECON_OS_PROJECT.md`; `SOK_HAWAII_FREIGHT_PRICING_PORTFOLIO_STATE_2026-09-10.md`; current H2O/SOK correspondence |
| Warranty Fulfillment shared service | Operating System / routed warranty execution | IN_PROGRESS | P2 STRATEGIC | Shared workflow is defined; proof matures through supplier-specific execution rather than more pre-launch paperwork | Prove shared lifecycle through real supplier-specific programs without overriding supplier authority; do not block current commerce while waiting for a perfect standardized service. | Workflow proven and ready for launched repeatable service | `WARRANTY_FULFILLMENT_SERVICE_WORKFLOW.md` |
| SOK approved product-media integration | SOK Project / bounded Catalog lane | IN_PROGRESS — OFFICIAL SOURCE VERIFIED / LARGE-PACKAGE INTAKE PARTIAL | P2 | SOK already supplied the official product-image source. Current connected tooling cannot ingest the entire large package in one path; that does not justify a duplicate supplier request. | Preserve the official source; recover/map only assets actually accessible and verify exact-SKU identity/channel-use before catalog use. Use another supported extraction/intake path for the remaining package if needed. | Approved media recovered and mapped to exact SOK SKUs with no duplicate supplier request caused solely by connector limitations | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SUPPLIER_LEADS_LIVE_MAP.md` |
| Lithium Buyer Network prospecting | Leads / Prospecting lane | IN_PROGRESS | P3 PARALLEL | Must not interfere with current vendor activation or first-sale work | Continue only in parallel capacity under the existing Hawaii → Southern California → Colorado lane. | Target batch reaches defined qualification/contact state | `LITHIUM_BUYER_NETWORK_PROSPECTING_2026-09-10.md` |
| Internal email tracking / `sales@` alias reliability | Operating System / Communications | READY | P3 END-OF-FLOW | `sales@elevationupscales.com` does not reliably route to the regular inbox and can generate delivery-failure notices when used only for internal tracking | At end of the current higher-priority flow, verify actual mailbox/alias behavior and replace unreliable CC-based tracking with a dependable internal tracking method that does not create false failure notices; do not use `sales@` reflexively for internal CC tracking meanwhile. | Internal tracking remains visible without bounce/failure noise or dependence on a non-delivering alias | Owner direction 2026-09-10 |

---

# WAITING

| Work Item | Owner / Execution Lane | State | Priority | Waiting On / Trigger | Action After Trigger | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| Kingboss B2B onboarding | **Kingboss Project Operations Manager / Kingboss Project Specialist** | INTAKE RECEIVED / RECONCILE | Supplier external → ACTIVE INPUT | Supplier response with MOQ clarification + UN/MSDS compliance package has arrived | Reconcile the new supplier response and compliance documents into Project Source/master SOP, classify MOQ/commercial implications, then continue exact product/source/compliance/fulfillment onboarding without restarting generic qualification. | Defined commercial lane activated or rejected | [Kingboss Project Source](./vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md); `KINGBOSS_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`; current Kingboss correspondence |
| SolarStock USA quote / direct-job-site qualification | Company Operations / Vendor Onboarding | WAITING — QUOTE REQUEST SENT | P1-B | SolarStock response to the existing quote/capability request | Reconcile formal quote, current warehouse/pallet availability, lead time, pallet dimensions/weight, warranty/PAN files, direct-job-site capability, blind/neutral paperwork, freight quote method and receiving requirements. Do not create a duplicate thread or chase while the request is pending. | Quote/delivery capability is verified, rejected, or moved to a genuine owner purchase/commitment gate | `SOLARSTOCK_USA_QUALIFICATION_DELTA_2026-09-10.md`; current SolarStock correspondence |
| VEVOR fulfillment / returns detail confirmation | **VEVOR Project Operations Manager / VEVOR Specialist** | WAITING — NONBLOCKING | P2 | Supplier reply to focused request covering blind shipping/packing slips, exact tracking handoff, PRO-account RMA/return-label procedure and customer-support ownership | Reconcile reply into Project Source/master SOP. If a real paid order arrives first, use the already-verified direct order path and live tracking while avoiding unsupported blind-shipping/returns promises. | Details are supplier-confirmed or first-order evidence establishes the repeatable handling path | `VEVOR_FULFILLMENT_QUALIFICATION_2026-09-10.md`; [VEVOR Project Source](./vendor-project-sources/VEVOR_PROJECT_SOURCE.md) |
| SOK Hawaii warranty operating-input request | SOK Project Operations Manager / SOK RECON OS / Company Operations correspondence | RESPONSE RECEIVED / RECONCILE | P2 | Kam/SOK response has arrived; old `WAITING ON SOK RESPONSE` state is stale | Read the full thread; classify each requested input as EXACT / ESTIMATE / UNKNOWN; combine usable inputs with verified Hawaii warehouse/freight/storage data; model true incremental and dedicated costs; return to SOK only if a missing fact materially blocks the model. | Supplier operating inputs sufficiently resolved to support owner-review commercial structure or remaining material unknowns explicitly identified | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md`; `SOK_RECON_OS_PROJECT.md` |
| Logistics Plus Hawaii storage / fulfillment qualification | Company Operations / Logistics + SOK Project | WAITING — DG / OPERATING REVIEW | P2 STRATEGIC | Logistics Plus has SOK documents under DG/operations review | When pricing/operating terms return, extract receiving/DG handling, storage, outbound release/fulfillment, will-call, local delivery, Neighbor Island, minimum/account charges, and current-vs-third-party warehouse differences; use verified numbers in the SOK Hawaii economics model and escalate only genuine commitment gates. | Provider returns usable pricing/operating conditions and the option is accepted for proof, rejected, or moved to a defined owner commitment gate | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_RECON_OS_PROJECT.md`; current Logistics Plus correspondence; GitHub issue #67 |
| R&R Solar Hawaii low-voltage / proof-support relationship | Logistics / B2B lane | WAITING | P2 | Partner response to existing thread | Reconcile response into proof/partner role; do not duplicate outreach. | Partner role and proof path activated or rejected | Current relationship; dated follow-up evidence |
| Refunded folding-bed buyer — bank credit visibility | Company Operations / Order & Fulfillment | WAITING | Customer exception only | Customer/payment-system recheck or new exception | Respond only if refund remains unresolved or customer reports a new problem. | Refund visibly completed and customer obligation closes | Verified customer correspondence 2026-09-10 |

---

# HOLD / SCHEDULED / OWNER GATE

| Work Item | Owner | State | Priority | Gate / Trigger | Next | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| TikTok Shop second appeal / withdrawal-restoration | Peter Torres / Ecommerce & Vendor Operations | HOLD — LOWER-PRIORITY PARALLEL | STARTUP REVENUE PHASE | Current owner standard places marketplace/customer issues below direct Elevation website revenue unless a material safety/security/legal/financial/account-suspension exception appears | Continue in parallel capacity without displacing P0 direct-site revenue work; do not restart it. | Verified terminal platform result recorded | `PETER_PROJECT_STARTER_V2_2026-09-10.md`; `STARTUP_REVENUE_PHASE_NONBLOCKING_ORDER_STANDARD_2026-09-11.md` |
| eBay shipped folding-bed order monitoring | Company Operations / Order & Fulfillment | HOLD — LOWER-PRIORITY PARALLEL | STARTUP REVENUE PHASE / exception interrupt | Marketplace/customer work is below direct-site revenue unless a material exception appears | Verify marketplace tracking/order propagation and delivery state in parallel; escalate only material new exception. | Delivery/customer obligation verified closed | Current Doba/eBay fulfillment evidence; `STARTUP_REVENUE_PHASE_NONBLOCKING_ORDER_STANDARD_2026-09-11.md` |
| eBay / Doba listing profitability and availability cleanup | Peter / Ecommerce & Vendor Operations | HOLD — LOWER-PRIORITY PARALLEL | STARTUP REVENUE PHASE | Current owner standard prioritizes first direct Elevation website revenue | Reconcile active eBay listings against Doba availability/economics in parallel; preserve useful sales history; do not blanket-remove channel. | Loss-making/unfulfillable listings corrected and useful demand-test listings remain controlled | `EBAY_CHANNEL_RECON_2026-09-09.md`; `STARTUP_REVENUE_PHASE_NONBLOCKING_ORDER_STANDARD_2026-09-11.md` |
| SOK Hawaii permanent warranty economics / reserve-stock / service compensation | SOK Project Operations Manager / SOK RECON OS | HOLD — TRUE OWNER GATE / STARTER MODEL EXISTS | P2 | A protected starter landed-cost model now exists, but permanent warranty reserve/service economics still require current supplier volume/support inputs, Logistics Plus/H2O validated quotes, excluded-cost reconciliation and first Hawaii proof actuals. Material commitments remain owner-gated. | Continue internal evidence model only. Add verified provider/supplier inputs and first-proof actuals as they arrive; do not present preliminary economics as permanent pricing/commitment. | Commercial proposal is evidence-based, reconciled to actual shipment/provider costs, and owner-approved before commitment | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md` |
| SOK compliance reference PR #70 | SOK / Documentation lane | HOLD | P3 | Draft PR remains deliberately non-controlling and is based on stale lineage; it must be reconciled/rebased against then-current `main` before any merge | Preserve only while the readable compliance references remain useful to issue #67/SOK documentation. Do not auto-merge. | Merged cleanly after fresh reconciliation/QA or explicitly closed as unnecessary | GitHub PR #70 |
| Peter public profile / portrait follow-through | Peter / Communications | HOLD | P3 | Publication/portrait work is intentionally lower priority | Continue only when profile/publication lane is reactivated. | Intended public profile/portrait work accepted or explicitly retired | Current Peter correspondence; Sept. 9 closeout carryover |

---

# CLOSED / PROTECTED FROM RECREATION

- Shopify storefront password gate — CLOSED by Owner on 2026-09-11; public native Shopify checkout was subsequently verified. Do not recreate the password-removal task.
- eBay weed-wacker order 10-15134-90489 cancellation/refund — CLOSED per Owner direction after refund action; reopen only if a new customer, marketplace, payment, or supplier exception arrives.
- VEVOR generic qualification / PRO-registration gate — COMPLETE; VEVOR is now in catalog/first-order activation. Do not restart onboarding qualification.
- VEVOR product-feed acquisition gate — COMPLETE; supplier feed received and working derivatives created.
- VEVOR Colorado tax-exemption submission gate — COMPLETE as a submission task; final review is pending but is not a general commerce blocker under VEVOR's stated pending-review treatment.
- VEVOR A-tier Shopify catalog launch — COMPLETE; 19 VEVOR Direct products plus the `VEVOR Direct` collection are ACTIVE/published with source separation, verified customer prices, one hero image per product, and supplier inventory not represented as Elevation On Hand. First-order proof remains active separately.
- VEVOR B-tier queue preparation — COMPLETE; 17 collision-free candidate SKUs are prepared. Do not recreate the queue; publication remains per-SKU gated by fresh price/MAP, sellability, media/source and fulfillment checks plus the current Stage-1 storefront acceptance path.
- VEVOR fulfillment-detail follow-up send — COMPLETE as an outbound task; live sub-item is WAITING on supplier confirmation and does not block the verified normal direct order path.
- SolarStock USA bounded quote/capability request — COMPLETE as an outbound task; current sub-item is WAITING on SolarStock. Do not recreate the draft, resend, or chase while pending.
- Homepage/lithium PR #94 merge gate — COMPLETE at `3ee835f0d31e7f69922972358e68b1e22cdf1fdf`; only exact-SHA release/verification remains.
- Renogy application preparation, owner review, W-9 correction, supplier review and dealer approval — COMPLETE; Renogy is now an ACTIVE approved dealer relationship under `RENOGY_VENDOR_MASTER_SOP.md`. Do not recreate the application/onboarding gate.
- Renogy integration-source request — COMPLETE as an outbound task; current lane is source intake/catalog implementation and response handling, not duplicate outreach.
- Renogy Lower-48 preorder/backorder and warranty-control initialization — COMPLETE as project policy setup under Renogy Vendor Master SOP v1.2; current work is exact-SKU mapping, catalog launch and first-order proof, not re-researching the existence of generic backorder/warranty rules.
- Renogy Lower-48 Warranty & Availability Map Batch 01 — COMPLETE / ACCEPTED as the first exact-SKU evidence batch. Preserve its exact SKU distinctions; later batches extend mapping and do not reopen Batch 01 research without contradictory current evidence.
- Renogy Lower-48 Warranty & Availability Map Batch 02 — COMPLETE / ACCEPTED. Preserve its exact SKU distinctions, the second exact public backorder example `RBM500-US`, and the `RIV4835CSH1S` warranty-conflict HOLD; later work extends mapping rather than reopening Batch 02 without contradictory current evidence.
- SOK generic supplier prospecting/qualification — COMPLETE; SOK is an active primary authorized supplier.
- SOK request for official product-image source — COMPLETE; SOK supplied the source. Remaining large-package intake is a tooling/extraction task, not a reason to re-contact the supplier for the same media.
- SOK Hawaii warranty operating-input request drafting/owner-review/send gate — COMPLETE as a send task; current sub-item is RESPONSE RECEIVED / RECONCILE.
- R&R duplicate unsent-response gate — SUPERSEDED by later sent correspondence; current lane is WAITING on partner.
- Logistics Plus document/safety-material transmission and pricing-input response — COMPLETE as outbound tasks; current lane is WAITING on provider pricing/operating terms.
- Ten complementary vendor introductions/application sends from the current activation sweep — COMPLETE as outbound tasks; each resulting supplier lane is now CONTACTED / WAITING in `SUPPLIER_LEADS_LIVE_MAP.md`.
- DMX Power / Magnum Energy / Dimensions initial dealer/ecommerce outreach — COMPLETE as a send task from 2026-09-08; supplier is CONTACTED / WAITING and must not be recreated as a draft.
- Legacy GitHub control issues #26, #30 and #33–#36 — CLOSED / SUPERSEDED. Their historical scope/evidence remains available, but current residual work is represented by this board, issue #65 where applicable, current project sources and the exact-SHA release workflow. Do not reopen them merely because old text says P0/controlling.
- eBay unknown-device alert from September 10 — CLOSED after human confirmation that sign-in was authorized.
- Worker Exact-SHA release workflow implementation — COMPLETE and merged; future releases use the permanent workflow rather than rebuilding it.
- September 9 supplier-state consolidation and Operating System role reconciliation — COMPLETE; preserve closeout as historical evidence.

## Update discipline

When a material event occurs:

1. Verify the event against the applicable source.
2. Update this row instead of creating a second global status record.
3. Update the Project Source when a dedicated vendor onboarding/readiness fact changes.
4. Update the lane-specific source only when durable facts or policy changed.
5. Move WAITING/HOLD items only when their trigger occurs or Casey changes priority.
6. Move a row to CLOSED only when its closure condition is satisfied or Casey explicitly supersedes it.
7. After any transition, look for the next executable unresolved item inside the same project and continue automatically when authorized.
8. Do not treat a historical issue/PR that says `CONTROLLING`, `P0`, or references an old exact SHA as current authority when its live residuals are already represented by this board and current project sources.
9. When a project hits a real blocker, preserve the blocker/trigger, move that sub-item to the back of the applicable queue, and continue every finishable in-project worktree before returning to deferred items.
10. Shared universal-catalog completion is measured by `UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`; do not declare all-vendor live integration complete merely because individual supplier listings exist.

---

## OWNER FALLBACK — IN-HOUSE CHECKOUT / PAYMENT ORCHESTRATION

If the PayPal / Shopify-hosted payment path remains blocked, unreliable, or requires an avoidable recurring platform cost that the Owner does not accept after bounded verification, route the commerce lane to **ELEVATION IN-HOUSE CART / ORDER ORCHESTRATION** instead of allowing the third-party integration to become a standing sales gate.

**In-house means Elevation owns:** cart state, checkout routing, server-side price and sellability validation, order state, receipts, gateway abstraction, fulfillment handoff, recovery records, and provider switching.

**In-house does not mean:** bypassing a lawful payment processor, card-network requirements, PCI/security obligations, fraud controls, taxes, supplier MAP/channel rules, or other binding payment/compliance controls. Actual movement of customer funds must still use an approved payment processor/gateway.

**Fallback trigger:** bounded PayPal/Shopify verification demonstrates persistent technical failure, unacceptable reliability, or Owner-rejected platform cost. Ordinary transaction-processing fees alone do not silently change vendor pricing rules or authorize unsafe payment handling.

**Fallback execution rule:** preserve any working Shopify/native checkout while the Elevation-owned cart/order layer is built; migrate product flows only after isolated payment, order-capture, receipt, fulfillment-routing, refund/error, and security acceptance passes.