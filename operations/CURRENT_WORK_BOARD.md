# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Last source-state reconciliation baseline:** `96975b35bc5bbc25ceddb205e4dad4cda9da2759`

> The reconciliation baseline records the newest business/project source state reviewed by this board. A later commit that only updates this board or other control documentation does not make the marker stale by itself. Reconcile again when a material project/vendor/customer/release state changes.

## Purpose

This file is the single public-safe global work board for unresolved Elevation UpScales operating work.

It exists so that:

**ONE CURRENT STATE EXISTS FOR EACH WORK ITEM**

and

**NEW WORK NEVER CAUSES EXISTING OPEN WORK TO DISAPPEAR.**

A priority change does not close a work item. A new project does not erase an older unfinished obligation. WAITING and HOLD items remain visible until their trigger occurs or they are explicitly closed.

## Authority

Use this order:

1. Casey / Owner's newest explicit direction.
2. This `CURRENT_WORK_BOARD.md` for reconciled global current priority and work-item state.
3. The applicable controlling `/operations/` SOP, Project Source, project record or tailored workflow for lane-specific rules.
4. Current application / Git / platform evidence for actual technical or operational state.
5. Dated records and historical handoffs as evidence only.

`SUPPLIER_LEADS_LIVE_MAP.md` remains the canonical supplier-domain relationship/status map. It does not replace this global work board.

Dated follow-up files such as `ACTIVE_FOLLOWUPS_2026-09-08.md` are correspondence/action evidence and duplicate-send protection records. Their older priority labels do not override this board.

Manager/worker control records define lane authority and execution behavior. Any copied rolling priority text in those records defers to this board and newer Casey direction.

**THIS BOARD ROUTES WORK; IT DOES NOT ASSIGN EVERY ROW TO EVERY MANAGER.** Dedicated project managers act only on rows assigned to their project/manager or on a bounded handoff explicitly routed into their project. Cross-project reassignment belongs to the Operating System Project Manager / Company Operations Manager.

Owner direct execution semantics for `RUN`, `RUN WORKFLOW`, `CONTINUE WORKFLOW`, and equivalent commands are controlled by `OWNER_RUN_COMMAND_EXECUTION_PROTOCOL_2026-09-10.md` and the project continuity controls.

## Operating loop

Management:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Execution:

**PICK UP LAST VERIFIED WORKTREE → VERIFY → EXECUTE → DOCUMENT MATERIAL DELTA → CLOSE / WAIT / HOLD → CONTINUE NEXT IN-PROJECT ITEM**

Worker failure does not automatically block the project. Preserve the work item and route only the unfinished action.

## Dedicated Vendor Project Source Index

Every current dedicated vendor project has one public-safe Project Source containing the reusable Elevation onboarding facts, protected-document availability, supplier/account readiness, current gaps, activation proof and real gates required to build/operate the supplier as an active Elevation vendor.

| Vendor Project | Project Operations Manager | Project Specialist | Project Source | Tailored Workflow | Current High-Level State |
|---|---|---|---|---|---|
| SOK Supplier / Commerce / Hawaii Logistics / Warranty | SOK Project Operations Manager | SOK RECON OS | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md) | [SOK Tailored Workflow](./SOK_TAILORED_PROJECT_WORKFLOW_2026-09-10.md) | ACTIVE PRIMARY SUPPLIER / Lower-48 CONTROLLED / official media source verified / Hawaii profile-extraction + warranty-logistics economics PROVING |
| VEVOR Supplier / Catalog / Shopify / Fulfillment | VEVOR Project Operations Manager | VEVOR Reconciliation & Price-Control Specialist | [VEVOR Project Source](./vendor-project-sources/VEVOR_PROJECT_SOURCE.md) | [VEVOR Tailored Workflow](./VEVOR_TAILORED_PROJECT_WORKFLOW_2026-09-10.md) | ACTIVE / A-tier catalog live / 17-SKU B-tier queue prepared / storefront + first-order proof open |
| Renogy Dealer / Catalog / Commerce Integration | Renogy Branch Operations Manager | Renogy Project Specialist | [Renogy Project Source](./vendor-project-sources/RENOGY_PROJECT_SOURCE.md) | [Renogy Tailored Workflow](./RENOGY_TAILORED_PROJECT_WORKFLOW_2026-09-10.md) | APPROVED DEALER / portal active / Lower-48 SKU-specific backorder+warranty controls locked / catalog + first-order proof open |
| Kingboss B2B Supplier Onboarding / Catalog / Commerce | Kingboss Project Operations Manager | Kingboss Project Specialist | [Kingboss Project Source](./vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md) | [Kingboss Tailored Workflow](./KINGBOSS_TAILORED_PROJECT_WORKFLOW_2026-09-10.md) | B2B APPROVED / waiting on onboarding package |

Prospects/qualified suppliers remain in `SUPPLIER_LEADS_LIVE_MAP.md` until a dedicated vendor project/manager exists. Promotion to a dedicated vendor project requires a Project Source under `VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md`; do not create dozens of project files for cold/outbound leads.

## Worktree persistence rule

Unfinished project work remains on this board or in its owning project worktree until its close condition is proven or Casey explicitly supersedes it.

A chat ending, worker/session failure, manager change, new priority, branch/PR change, new owner command, or one waiting sub-item does **not** close the older worktree.

At takeover/RUN/resume:

**CURRENT MAIN → PROJECT SOURCE WHEN VENDOR → PROJECT SOP/TAILORED WORKFLOW → LAST VERIFIED ACTION → NEXT EXECUTABLE ACTION → RESUME → DOCUMENT MATERIAL DELTA → CONTINUE SAME PROJECT**

## Owner-directed execution window — through midnight 2026-09-10 MDT

Tonight's focus is intentionally narrowed to move faster:

1. **VEVOR catalog / first-order activation** — A-tier publication is complete, the 17-SKU B-tier expansion queue is already prepared with zero current Shopify SKU collisions, and fulfillment/returns detail follow-up has been sent. The only current customer-facing activation gate remains Shopify Online Store password protection requiring authenticated Shopify Admin access. Do not rebuild the 19 products or recreate B-tier preparation.
2. **New complementary vendor activation** — continue the existing vetted qualified lanes; newly sent suppliers move to WAITING rather than generating another management loop; generic battery duplication remains secondary to SOK.
3. **Renogy approved-dealer integration** — dealer approval and Partner Portal access are complete. The Renogy project has now locked a Lower-48 SKU-specific preorder/backorder and warranty/RMA operating model. Continue exact-SKU availability/warranty mapping, MAP/media/source intake, direct-site catalog preparation and first-order proof; do not treat generic zero stock as blanket backorder authority.
4. **Homepage/lithium deployment completion** — PR #94 is merged into current `main`; finish the exact-SHA preview → production release path and verify canonical production.
5. **TikTok and routine eBay work move to tomorrow.** A new real paid-customer, payment, delivery, or marketplace exception may still interrupt.
6. External WAITING lanes do not block independently assigned work in their own project lanes.

Efficiency rule for this window:

**COMPLETED SETUP IS NOT A GATE. PENDING ENRICHMENT IS NOT A GATE. BLOCK ONLY THE EXACT UNSAFE OR UNVERIFIED LANE.**

---

# ACTIVE

| Work Item | Owner / Execution Lane | State | Priority | Blocker / Trigger | Next Action | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| VEVOR direct-site catalog / first-order activation | **VEVOR Project Operations Manager**; Peter Torres oversight; VEVOR Specialist + bounded Shopify/shared workers | IN_PROGRESS — A-TIER CATALOG LIVE / B-TIER PREPARED / STOREFRONT PASSWORD GATE | P1-A TONIGHT | **CURRENT CUSTOMER-FACING GATE:** Shopify Online Store password protection is enabled; public collection/product requests redirect to `/password` / **Opening soon**. All 19 VEVOR Direct variants remain ACTIVE/published and `availableForSale=true`. B-tier preparation is complete and is not another setup gate. Focused blind-shipping/tracking/RMA/support detail follow-up is waiting on VEVOR but is **not a general commerce blocker**. | Using authenticated Shopify owner/admin access, disable storefront password protection; immediately re-run unauthenticated VEVOR Direct collection/product/cart/checkout acceptance. On the first real order reverify exact SKU + live sellability + price/MAP, place through VEVOR, capture supplier acceptance/tracking/customer completion and actual exceptions. Expand B-tier only after the Stage-1 publication gate and fresh per-SKU checks are satisfied. | Public storefront/checkout acceptance passes and first clean live order proves operating flow; normal order lane can move to CONTROLLED | [VEVOR Project Source](./vendor-project-sources/VEVOR_PROJECT_SOURCE.md); `VEVOR_VENDOR_MASTER_SOP.md`; `VEVOR_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`; `VEVOR_B_TIER_PREPARATION_2026-09-10.md`; `VEVOR_FULFILLMENT_QUALIFICATION_2026-09-10.md` |
| Complementary vendor activation — existing qualified queue | Peter Torres / Vendor Onboarding + Company Operations | IN_PROGRESS — 10 NEW OUTBOUNDS SENT / REMAINING QUEUE OPEN | P1-B TONIGHT | Ten complementary solar/inverter/RV/BOS suppliers have now been advanced to SENT / WAITING in the current activation sweep. DMX Power / Magnum Energy / Dimensions was separately verified as already sent on 2026-09-08, so it is not a fresh-send target. | Continue with remaining clean qualified routes: BayWa r.e. and Winegard are current form/application routes; Micro-Air/KISAE/Solarflexion/Airxcel remain route-verification/application work. Verify route + dedupe before every send. Do not prioritize generic battery duplication without a defined SOK gap. Promote a supplier to a dedicated project only when justified; then create its Project Source. | Each worked supplier reaches SENT / APPLICATION SUBMITTED / WAITING / BLOCKED with exact reason and supplier map updated for durable state | `SUPPLIER_LEADS_LIVE_MAP.md`; current supplier correspondence; `VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md` |
| Renogy approved-dealer data / catalog / commerce integration | **Renogy Branch Operations Manager / assigned Renogy workers**; Peter Torres oversight; shared Catalog/Developer/Fulfillment only by explicit bounded handoff | IN_PROGRESS — APPROVED / PORTAL ACTIVE / LOWER-48 BACKORDER+WARRANTY CONTROL LOCKED / SKU MAPPING OPEN | P1-C OWNER DIRECTED | Dealer approval and Partner Portal access are complete. Renogy Vendor Master SOP v1.2 now locks SKU-specific preorder/backorder control and exact-SKU warranty/RMA handling. Generic unavailable/zero stock is **not** blanket backorder authority. MAP, structured catalog/media/inventory sources and first-order proof remain incomplete at project level; optional enrichment is not a blanket blocker. | Use current Partner Portal/source materials to batch-map exact launch SKUs: exact product → MAP/price control → availability state (`IN_STOCK`, authorized `PREORDER/BACKORDER`, non-orderable OOS, or hold) → approved media → Lower-48 fulfillment → exact warranty source/term. Publish only verified direct-site SKUs and prove the first paid order when it occurs. | Renogy direct-site source/update path established, verified catalog launched with exact-SKU availability/warranty controls, first real paid order completes supplier purchase through customer delivery, and refresh/returns/warranty routes are repeatable | [Renogy Project Source](./vendor-project-sources/RENOGY_PROJECT_SOURCE.md); `RENOGY_VENDOR_MASTER_SOP.md`; `RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md`; `RENOGY_TAILORED_PROJECT_WORKFLOW_2026-09-10.md` |
| Homepage lithium hero / approved retail branding release | Developer / Release lane | RELEASE READY | P1 PARALLEL TONIGHT | **NO MERGE GATE REMAINS.** PR #94 merged at `3ee835f0d31e7f69922972358e68b1e22cdf1fdf`. No exact-SHA release run has executed yet; live production still shows the prior hero. Current main has advanced through owner-directed Operations commits, so the release must resolve and use the then-current reviewed `main` SHA. | Dispatch `Worker Exact-SHA Release` for the current approved `main` SHA to **preview**; require preview PASS; then dispatch the same SHA to **production** with required confirmation and smoke `elevationupscales.com`. | Same-SHA preview PASS; production deployment PASS; canonical live site shows approved homepage/lithium presentation; release receipt recorded | GitHub PR #94; `.github/workflows/worker-release-deploy.yml`; current `main` |
| Checkout-gate cleanup — authorized preorder/backorder and unnecessary internal gates | Commerce / Developer lane | READY | P2 AFTER RELEASE | No live outage; confirmed generic zero-stock/HOLD ordering conflict exists in universal-store eligibility. Supplier-specific authorization must control delayed-order behavior: SOK supports its verified backorder mode; Renogy now has SKU-specific preorder/backorder states only; VEVOR has no verified blanket preorder/backorder path. | After tonight's bounded release, correct only confirmed gate ordering so supported paid-order paths are not blocked by generic zero-stock/internal HOLD state while supplier-specific authorization still prevents unsupported delayed orders. Preserve safety/channel/payment/destination controls. | Regression proves authorized SOK and exact-SKU Renogy delayed-purchase paths remain purchasable when valid, unsupported unavailable products remain blocked, and real controls remain intact | `MANAGEMENT_OPERATING_SOP.md`; `SOK_ECOMMERCE_SHIPPING_SOP.md`; `RENOGY_VENDOR_MASTER_SOP.md`; `PROJECT_WORKTREE_CONTINUITY_AND_GATE_MATURITY_STANDARD_2026-09-10.md`; issue #65 residual checkout architecture |
| Shopify/SOK paid-order Operating System bridge | Commerce / Developer + Company Operations | VERIFYING | P2 | Implementation merged; only live purchase-to-OS proof remains | Prove live purchase → payment → order ingestion → SKU/source/fulfillment verification → production receipt when a real order exists; do not manufacture a management gate around the absence of an order. | Full first-order acceptance chain completed | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); current merged application state; store-integration control |
| Universal store / normalized retail architecture residual | Commerce / Catalog / Developer lane | IN_PROGRESS — LEGACY SPEC PRESERVED / CURRENT EXECUTION DECOMPOSED | P2 AFTER CURRENT P1 RELEASE | Issue #65 still contains valid unfinished architecture/QA requirements, but it is not a second priority board. Its SOK, Doba, checkout, universal-store, legacy-URL and retail QA requirements are executed through current board rows/project lanes rather than a single company-wide release train. | Continue the smallest current residuals after release: checkout-gate cleanup, Doba availability/legacy cleanup, normalized catalog/admin acceptance and universal-store/legacy-route QA. Reconcile completion back to issue #65 instead of rebuilding already-merged implementation. | Issue #65 Definition of Done is either proven by current implementation/QA or narrowed to explicit remaining residuals with no duplicate controlling worktree | GitHub issue #65; current application; `CURRENT_WORK_BOARD.md` |
| Master Catalog authenticated Admin preview | Catalog / Developer lane | VERIFYING | P2 | Authenticated acceptance evidence remains; underlying migration foundation is not to be rebuilt | Complete only the remaining authenticated preview/acceptance evidence when routed; do not treat it as a blocker to unrelated vendor/deployment work. | Authenticated preview and required acceptance evidence complete | `DAILY_CLOSEOUT_2026-09-09_THROUGH_MIDNIGHT_MDT.md`; GitHub issue #24 retained pending exact acceptance reconciliation |
| SOK Supplier, Commerce & Warranty Project | **SOK Project Operations Manager** / SOK RECON OS specialist / bounded SOK workers | IN_PROGRESS — LOWER-48 CONTROLLED / HAWAII MEDIA-PROFILE-ECONOMICS PROVING | P2 STRATEGIC | Hawaii warranty operating-input request remains WAITING on SOK, but that does not stop independent SOK work. Official product-image source has already been supplied. The large media package exceeds the current connected-file transfer limit; this is a tooling/intake limitation, not a supplier gap. H2O/Pasha additional-model pricing is blocked only on exact profile extraction from the already-supplied legacy SOK workbook. A starter Hawaii landed-cost model exists privately, but routes are not production-proven until current quotes/excluded costs/first-shipment actuals are reconciled. | Do not resend supplier requests. Continue normal SOK commerce. Recover/map only verified media assets available from the existing official source. Extract exact additional-model packed profiles from the existing legacy workbook through a supported extraction path and send only verified data to H2O/Pasha. Process Logistics Plus terms when returned. Reconcile first Hawaii proof actuals against the protected starter economics before scale. Process SOK warranty response when received. | Repeatable SOK commerce/warranty operating state established; media/profile gaps are resolved without duplicate supplier outreach; Hawaii freight/storage/warranty economics advance from verified quotes and first-shipment actuals rather than assumptions | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_RECON_OS_PROJECT.md`; `SOK_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`; `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md` |
| H2O Logistics Hawaii / Pasha backup route | Company Operations / Logistics + SOK Project | IN_PROGRESS — PROFILE EXTRACTION REQUIRED | P2 STRATEGIC | H2O confirmed it is the Pasha-facing account/coordination party. SOK already supplied the broader shipment profiles in a legacy spreadsheet. The current blocker is extracting exact manufacturer-packed dimensions/weights/configurations from that existing file with supported tooling—not missing supplier cooperation. | Recover the exact priority-model profiles from the existing SOK legacy workbook through a supported extraction path; send only verified packed dimensions/weights/configurations to H2O for pricing. Do not estimate missing cargo data and do not ask SOK to repeat already-supplied information. Returned H2O rates become protected freight-economics inputs. | Exact priority SOK profiles are priced and H2O/Pasha acceptance/booking requirements are defined for the intended configurations | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_HAWAII_FREIGHT_PRICING_PORTFOLIO_STATE_2026-09-10.md`; current H2O/SOK correspondence |
| Warranty Fulfillment shared service | Operating System / routed warranty execution | IN_PROGRESS | P2 STRATEGIC | Shared workflow is defined; proof matures through supplier-specific execution rather than more pre-launch paperwork | Prove shared lifecycle through real supplier-specific programs without overriding supplier authority; do not block current commerce while waiting for a perfect standardized service. | Workflow proven and ready for launched repeatable service | `WARRANTY_FULFILLMENT_SERVICE_WORKFLOW.md` |
| SOK approved product-media integration | SOK Project / bounded Catalog lane | IN_PROGRESS — OFFICIAL SOURCE VERIFIED / LARGE-PACKAGE INTAKE PARTIAL | P2 | SOK already supplied the official product-image source. Current connected tooling cannot ingest the entire large package in one path; that does not justify a duplicate supplier request. | Preserve the official source; recover/map only assets actually accessible and verify exact-SKU identity/channel-use before catalog use. Use another supported extraction/intake path for the remaining package if needed. | Approved media recovered and mapped to exact SOK SKUs with no duplicate supplier request caused solely by connector limitations | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SUPPLIER_LEADS_LIVE_MAP.md` |
| Lithium Buyer Network prospecting | Leads / Prospecting lane | IN_PROGRESS | P3 PARALLEL | Must not interfere with tonight's vendor activation or release | Continue only in parallel capacity under the existing Hawaii → Southern California → Colorado lane. | Target batch reaches defined qualification/contact state | `LITHIUM_BUYER_NETWORK_PROSPECTING_2026-09-10.md` |
| Internal email tracking / `sales@` alias reliability | Operating System / Communications | READY | P3 END-OF-FLOW | `sales@elevationupscales.com` does not reliably route to the regular inbox and can generate delivery-failure notices when used only for internal tracking | At end of the current higher-priority flow, verify actual mailbox/alias behavior and replace unreliable CC-based tracking with a dependable internal tracking method that does not create false failure notices; do not use `sales@` reflexively for internal CC tracking meanwhile. | Internal tracking remains visible without bounce/failure noise or dependence on a non-delivering alias | Owner direction 2026-09-10 |

---

# WAITING

| Work Item | Owner / Execution Lane | State | Priority | Waiting On / Trigger | Action After Trigger | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| Kingboss B2B onboarding | **Kingboss Project Operations Manager / Kingboss Project Specialist** | WAITING | Supplier external | Supplier onboarding/package data | Continue exact product/source/compliance/fulfillment onboarding when data arrives; do not restart generic qualification. | Defined commercial lane activated or rejected | [Kingboss Project Source](./vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md); `KINGBOSS_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`; `SUPPLIER_LEADS_LIVE_MAP.md` |
| VEVOR fulfillment / returns detail confirmation | **VEVOR Project Operations Manager / VEVOR Specialist** | WAITING — NONBLOCKING | P2 | Supplier reply to focused request covering blind shipping/packing slips, exact tracking handoff, PRO-account RMA/return-label procedure and customer-support ownership | Reconcile reply into Project Source/master SOP. If a real paid order arrives first, use the already-verified direct order path and live tracking while avoiding unsupported blind-shipping/returns promises. | Details are supplier-confirmed or first-order evidence establishes the repeatable handling path | `VEVOR_FULFILLMENT_QUALIFICATION_2026-09-10.md`; [VEVOR Project Source](./vendor-project-sources/VEVOR_PROJECT_SOURCE.md) |
| SOK Hawaii warranty operating-input request | SOK Project Operations Manager / SOK RECON OS / Company Operations correspondence | WAITING | P2 | SOK response to the consolidated request already sent in the existing supplier thread | Read the full thread; classify each requested input as EXACT / ESTIMATE / UNKNOWN; combine usable inputs with verified Hawaii warehouse/freight/storage data; model true incremental and dedicated costs; return to SOK only if a missing fact materially blocks the model. | Supplier operating inputs sufficiently resolved to support owner-review commercial structure or remaining material unknowns explicitly identified | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md`; `SOK_RECON_OS_PROJECT.md` |
| Logistics Plus Hawaii storage / fulfillment qualification | Company Operations / Logistics + SOK Project | WAITING — PRICING / OPERATING TERMS | P2 STRATEGIC | Conservative planning estimates and verified SOK pallet profiles were sent in the existing Cara thread; no long-term/minimum commitment was made | When pricing returns, extract receiving/DG handling, storage, outbound release/fulfillment, will-call, local delivery, Neighbor Island, minimum/account charges, and current-vs-third-party warehouse differences; use verified numbers in the SOK Hawaii economics model and escalate only genuine commitment gates. | Provider returns usable pricing/operating conditions and the option is accepted for proof, rejected, or moved to a defined owner commitment gate | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_RECON_OS_PROJECT.md`; current Logistics Plus correspondence; GitHub issue #67 |
| R&R Solar Hawaii low-voltage / proof-support relationship | Logistics / B2B lane | WAITING | P2 | Partner response to existing thread | Reconcile response into proof/partner role; do not duplicate outreach. | Partner role and proof path activated or rejected | Current relationship; dated follow-up evidence |
| Refunded folding-bed buyer — bank credit visibility | Company Operations / Order & Fulfillment | WAITING | Customer exception only | Customer/payment-system recheck or new exception | Respond only if refund remains unresolved or customer reports a new problem. | Refund visibly completed and customer obligation closes | Verified customer correspondence 2026-09-10 |

---

# HOLD / SCHEDULED / OWNER GATE

| Work Item | Owner | State | Priority | Gate / Trigger | Next | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| TikTok Shop second appeal / withdrawal-restoration | Peter Torres / Ecommerce & Vendor Operations | HOLD — SCHEDULED TOMORROW | 2026-09-11 | Owner moved routine TikTok work to tomorrow to keep tonight focused on vendor activation + deployment | Resume existing second appeal/restoration case tomorrow; do not restart it. | Verified terminal platform result recorded | `PETER_PROJECT_STARTER_V2_2026-09-10.md`; Owner direction 2026-09-10 |
| eBay shipped folding-bed order monitoring | Company Operations / Order & Fulfillment | HOLD — SCHEDULED TOMORROW | 2026-09-11 / exception interrupt | Owner moved routine eBay work to tomorrow; a new live paid-customer, delivery, payment, or marketplace exception may interrupt | Tomorrow verify marketplace tracking/order propagation and delivery state; act tonight only on a material new exception. | Delivery/customer obligation verified closed | Current Doba/eBay fulfillment evidence; Owner direction 2026-09-10 |
| eBay / Doba listing profitability and availability cleanup | Peter / Ecommerce & Vendor Operations | HOLD — SCHEDULED TOMORROW | 2026-09-11 | Owner moved routine eBay work to tomorrow | Tomorrow reconcile active eBay listings against Doba availability/economics; preserve useful sales history; do not blanket-remove channel. | Loss-making/unfulfillable listings corrected and useful demand-test listings remain controlled | `EBAY_CHANNEL_RECON_2026-09-09.md`; Owner direction 2026-09-10 |
| SOK Hawaii permanent warranty economics / reserve-stock / service compensation | SOK Project Operations Manager / SOK RECON OS | HOLD — TRUE OWNER GATE / STARTER MODEL EXISTS | P2 | A protected starter landed-cost model now exists, but permanent warranty reserve/service economics still require current supplier volume/support inputs, Logistics Plus/H2O validated quotes, excluded-cost reconciliation and first Hawaii proof actuals. Material commitments remain owner-gated. | Continue internal evidence model only. Add verified provider/supplier inputs and first-proof actuals as they arrive; do not present preliminary economics as permanent pricing/commitment. | Commercial proposal is evidence-based, reconciled to actual shipment/provider costs, and owner-approved before commitment | [SOK Project Source](./vendor-project-sources/SOK_PROJECT_SOURCE.md); `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md` |
| SOK compliance reference PR #70 | SOK / Documentation lane | HOLD | P3 | Draft PR remains deliberately non-controlling and is based on stale lineage; it must be reconciled/rebased against then-current `main` before any merge | Preserve only while the readable compliance references remain useful to issue #67/SOK documentation. Do not auto-merge. | Merged cleanly after fresh reconciliation/QA or explicitly closed as unnecessary | GitHub PR #70 |
| Peter public profile / portrait follow-through | Peter / Communications | HOLD | P3 | Publication/portrait work is intentionally lower priority | Continue only when profile/publication lane is reactivated. | Intended public profile/portrait work accepted or explicitly retired | Current Peter correspondence; Sept. 9 closeout carryover |

---

# CLOSED / PROTECTED FROM RECREATION

- eBay weed-wacker order 10-15134-90489 cancellation/refund — CLOSED per Owner direction after refund action; reopen only if a new customer, marketplace, payment, or supplier exception arrives.
- VEVOR generic qualification / PRO-registration gate — COMPLETE; VEVOR is now in catalog/first-order activation. Do not restart onboarding qualification.
- VEVOR product-feed acquisition gate — COMPLETE; supplier feed received and working derivatives created.
- VEVOR Colorado tax-exemption submission gate — COMPLETE as a submission task; final review is pending but is not a general commerce blocker under VEVOR's stated pending-review treatment.
- VEVOR A-tier Shopify catalog launch — COMPLETE; 19 VEVOR Direct products plus the `VEVOR Direct` collection are ACTIVE/published with source separation, verified customer prices, one hero image per product, and supplier inventory not represented as Elevation On Hand. First-order proof remains active separately.
- VEVOR B-tier queue preparation — COMPLETE; 17 collision-free candidate SKUs are prepared. Do not recreate the queue; publication remains per-SKU gated by fresh price/MAP, sellability, media/source and fulfillment checks plus the current Stage-1 storefront acceptance path.
- VEVOR fulfillment-detail follow-up send — COMPLETE as an outbound task; live sub-item is WAITING on supplier confirmation and does not block the verified normal direct order path.
- Homepage/lithium PR #94 merge gate — COMPLETE at `3ee835f0d31e7f69922972358e68b1e22cdf1fdf`; only exact-SHA release/verification remains.
- Renogy application preparation, owner review, W-9 correction, supplier review and dealer approval — COMPLETE; Renogy is now an ACTIVE approved dealer relationship under `RENOGY_VENDOR_MASTER_SOP.md`. Do not recreate the application/onboarding gate.
- Renogy integration-source request — COMPLETE as an outbound task; current lane is source intake/catalog implementation and response handling, not duplicate outreach.
- Renogy Lower-48 preorder/backorder and warranty-control initialization — COMPLETE as project policy setup under Renogy Vendor Master SOP v1.2; current work is exact-SKU mapping, catalog launch and first-order proof, not re-researching the existence of generic backorder/warranty rules.
- SOK generic supplier prospecting/qualification — COMPLETE; SOK is an active primary authorized supplier.
- SOK request for official product-image source — COMPLETE; SOK supplied the source. Remaining large-package intake is a tooling/extraction task, not a reason to re-contact the supplier for the same media.
- SOK Hawaii warranty operating-input request drafting/owner-review/send gate — COMPLETE as a send task; live sub-item is WAITING on SOK response.
- R&R duplicate unsent-response gate — SUPERSEDED by later sent correspondence; current lane is WAITING on partner.
- Logistics Plus document/safety-material transmission and pricing-input response — COMPLETE as outbound tasks; current lane is WAITING on provider pricing/operating terms.
- Ten complementary vendor introductions/application sends from the current activation sweep — COMPLETE as outbound tasks; each resulting supplier lane is now CONTACTED / WAITING in `SUPPLIER_LEADS_LIVE_MAP.md`.
- DMX Power / Magnum Energy / Dimensions initial dealer/ecommerce outreach — COMPLETE as a send task from 2026-09-08; supplier is CONTACTED / WAITING and must not be recreated as a draft.
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