# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Last reconciled against `main`:** `6242ec230833c5931c8c877e412f35179dd79def`

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
3. The applicable controlling `/operations/` SOP or project record for lane-specific rules.
4. Current application / Git / platform evidence for actual technical or operational state.
5. Dated records and historical handoffs as evidence only.

`SUPPLIER_LEADS_LIVE_MAP.md` remains the canonical supplier-domain relationship/status map. It does not replace this global work board.

Dated follow-up files such as `ACTIVE_FOLLOWUPS_2026-09-08.md` are correspondence/action evidence and duplicate-send protection records. Their older priority labels do not override this board.

Manager/worker control records define lane authority and execution behavior. Any copied rolling priority text in those records defers to this board and newer Casey direction.

**THIS BOARD ROUTES WORK; IT DOES NOT ASSIGN EVERY ROW TO EVERY MANAGER.** Dedicated project managers act only on rows assigned to their project/manager or on a bounded handoff explicitly routed into their project. Cross-project reassignment belongs to the Operating System Project Manager / Company Operations Manager.

Owner direct execution semantics for `RUN`, `RUN WORKFLOW`, `CONTINUE WORKFLOW`, and equivalent commands are controlled by `OWNER_RUN_COMMAND_EXECUTION_PROTOCOL_2026-09-10.md`.

## Operating loop

Management:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Execution:

**VERIFY → EXECUTE → RECORD → ROUTE → CLOSE / WAIT → CONTINUE NEXT**

Worker failure does not automatically block the project. Preserve the work item and route only the unfinished action.

## Owner-directed execution window — through midnight 2026-09-10 MDT

Tonight's focus is intentionally narrowed to move faster:

1. **VEVOR catalog / first-order activation** — A-tier product publication is complete; customer storefront acceptance is blocked only by Shopify Online Store password protection requiring authenticated Shopify Admin access. Do not restart onboarding or rebuild the 19 products.
2. **New complementary vendor activation** — continue the existing vetted qualified lanes; newly sent suppliers move to WAITING rather than generating another management loop; generic battery duplication remains secondary to SOK.
3. **Renogy approved-dealer integration** — dealer approval is complete; the **Renogy Branch Operations Manager and assigned Renogy workers** continue source/MAP/media intake, direct-site catalog preparation and Renogy-scoped safe coding under `RENOGY_VENDOR_MASTER_SOP.md` without restarting application work. Other managers/workers do not duplicate this Renogy task unless explicitly handed in for a bounded subtask.
4. **Homepage/lithium deployment completion** — PR #94 is merged into current `main`; finish the exact-SHA preview → production release path and verify canonical production.
5. **TikTok and routine eBay work move to tomorrow.** A new real paid-customer, payment, delivery, or marketplace exception may still interrupt.
6. External WAITING lanes do not block independently assigned work in their own project lanes.

Efficiency rule for this window:

**COMPLETED SETUP IS NOT A GATE. PENDING ENRICHMENT IS NOT A GATE. BLOCK ONLY THE EXACT UNSAFE OR UNVERIFIED LANE.**

---

# ACTIVE

| Work Item | Owner / Execution Lane | State | Priority | Blocker / Trigger | Next Action | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| VEVOR direct-site catalog / first-order activation | Peter Torres / Ecommerce & Vendor Operations | IN_PROGRESS — CATALOG LIVE / STOREFRONT PASSWORD GATE | P1-A TONIGHT | **A-TIER CATALOG GATE COMPLETE. EXACT CURRENT GATE:** Shopify Online Store password protection is enabled; public collection/product requests redirect to `/password` / **Opening soon**. All 19 VEVOR Direct variants remain ACTIVE/published and `availableForSale=true`. Connected Admin API has no supported write route for this setting and the available browser profile has no authenticated Shopify Admin credentials. | Using authenticated Shopify owner/admin access, disable storefront password protection; then immediately re-run unauthenticated `VEVOR Direct` collection/product/cart/checkout acceptance. On the first real order reverify exact SKU + current supplier sellability + price/MAP, place through VEVOR, capture acceptance/tracking/customer completion, then continue B-tier expansion. | Public storefront/checkout acceptance passes and first clean live order proves operating flow | `VEVOR_VENDOR_MASTER_SOP.md`; `VEVOR_SHOPIFY_LAUNCH_RECEIPT_2026-09-10.md`; `SUPPLIER_LEADS_LIVE_MAP.md` |
| Complementary vendor activation — existing qualified queue | Peter Torres / Vendor Onboarding + Company Operations | IN_PROGRESS — 10 NEW OUTBOUNDS SENT / REMAINING QUEUE OPEN | P1-B TONIGHT | Ten complementary solar/inverter/RV/BOS suppliers have now been advanced to SENT / WAITING in the current activation sweep. DMX Power / Magnum Energy / Dimensions was separately verified as already sent on 2026-09-08, so it is not a fresh-send target. | Continue with remaining clean qualified routes: BayWa r.e. and Winegard are current form/application routes; Micro-Air/KISAE/Solarflexion/Airxcel remain route-verification/application work. Verify route + dedupe before every send. Do not prioritize generic battery duplication without a defined SOK gap. | Each worked supplier reaches SENT / APPLICATION SUBMITTED / WAITING / BLOCKED with exact reason and supplier map updated for durable state | `SUPPLIER_LEADS_LIVE_MAP.md`; current supplier correspondence |
| Renogy approved-dealer data / catalog / commerce integration | **Renogy Branch Operations Manager / assigned Renogy workers**; Peter Torres oversight; shared Catalog/Developer/Fulfillment only by explicit bounded handoff | IN_PROGRESS — APPROVED / PORTAL ACTIVE / SOURCE INTAKE OPEN | P1-C OWNER DIRECTED | Dealer approval is complete and Partner Portal access exists. Integration request for MAP, catalog/product data, inventory/availability source, approved media, dropship/tracking instructions, warranty/RMA process and account/catalog contacts has been sent. Missing optional enrichment is not a general blocker. | Keep the work inside the Renogy project: use existing Partner Portal/source materials first; receive or locate MAP/catalog/media/inventory sources; normalize into the existing catalog model; route bounded Renogy implementation to assigned/shared specialists only as needed; publish only exact SKUs with current MAP/source/sellability/media/fulfillment evidence; prove first paid order when it occurs | Renogy direct-site source/update path established, verified catalog launched, first real paid order completes supplier purchase through customer delivery, and refresh/returns routes are repeatable | `RENOGY_VENDOR_MASTER_SOP.md`; `SUPPLIER_LEADS_LIVE_MAP.md`; current Renogy correspondence |
| Homepage lithium hero / approved retail branding release | Developer / Release lane | RELEASE READY | P1 PARALLEL TONIGHT | **NO MERGE GATE REMAINS.** PR #94 merged at `3ee835f0d31e7f69922972358e68b1e22cdf1fdf`. No exact-SHA release run has executed yet; live production still shows the prior hero. Current main has advanced through owner-directed Operations commits, so the release must resolve and use the then-current reviewed `main` SHA. | Dispatch `Worker Exact-SHA Release` for the current approved `main` SHA to **preview**; require preview PASS; then dispatch the same SHA to **production** with required confirmation and smoke `elevationupscales.com` | Same-SHA preview PASS; production deployment PASS; canonical live site shows approved homepage/lithium presentation; release receipt recorded | GitHub PR #94; `.github/workflows/worker-release-deploy.yml`; current `main` |
| Checkout-gate cleanup — authorized preorder/backorder and unnecessary internal gates | Commerce / Developer lane | READY | P2 AFTER RELEASE | No live outage; confirmed logic/state conflict exists | After tonight's bounded release, correct only confirmed gate logic so supported paid-order paths are not blocked by generic zero-stock/HOLD state; preserve real safety/channel/payment controls | Regression proves authorized supported purchase paths remain purchasable while real controls remain intact | `MANAGEMENT_OPERATING_SOP.md`; `SOK_ECOMMERCE_SHIPPING_SOP.md` |
| Shopify/SOK paid-order Operating System bridge | Commerce / Developer + Company Operations | VERIFYING | P2 | Implementation merged; only live purchase-to-OS proof remains | Prove live purchase → payment → order ingestion → SKU/source/fulfillment verification → production receipt when a real order exists; do not manufacture a management gate around the absence of an order | Full first-order acceptance chain completed | Current merged application state; store-integration control |
| Master Catalog authenticated Admin preview | Catalog / Developer lane | VERIFYING | P2 | Authenticated acceptance evidence remains; underlying migration foundation is not to be rebuilt | Complete only the remaining authenticated preview/acceptance evidence when routed; do not treat it as a blocker to unrelated vendor/deployment work | Authenticated preview and required acceptance evidence complete | `DAILY_CLOSEOUT_2026-09-09_THROUGH_MIDNIGHT_MDT.md` |
| SOK Supplier, Commerce & Warranty Project | SOK RECON OS | IN_PROGRESS | P2 STRATEGIC | Current Hawaii warranty operating-input sub-item is waiting on SOK; other SOK work may continue independently | Do not resend the supplier request. Advance independent SOK work, including verified warehouse/freight input development; when SOK replies, extract EXACT / ESTIMATE / UNKNOWN inputs and combine them with verified Hawaii storage/freight inputs | Repeatable SOK commerce/warranty operating state established and open sub-lanes reach defined state | `SOK_RECON_OS_PROJECT.md`; `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md` |
| H2O Logistics Hawaii / Pasha backup route | Company Operations / Logistics | ACTION REQUIRED — EXACT SOK PROFILES | P2 STRATEGIC | H2O confirmed that containers move under H2O's account and H2O will handle coordination and paperwork directly with Pasha; Elevation and SOK do **not** need to submit anything directly to Pasha. H2O now needs only exact manufacturer-packed dimensions, weights, and shipment configurations for the additional SOK models to price them. | Use the existing SOK manufacturer shipment-profile source already supplied by Kam; extract only verified packed dimensions/weights/configurations and reply in the existing H2O thread. Do not estimate missing cargo data and do not reopen SOK merely to repeat information already supplied. Returned H2O rates become freight-economics inputs. | Exact priority SOK profiles are priced and H2O/Pasha acceptance/booking requirements are defined for the intended configurations | `SOK_HAWAII_FREIGHT_PRICING_PORTFOLIO_STATE_2026-09-10.md`; current H2O/SOK correspondence |
| Warranty Fulfillment shared service | Operating System / routed warranty execution | IN_PROGRESS | P2 STRATEGIC | Shared workflow is defined; proof matures through supplier-specific execution rather than more pre-launch paperwork | Prove shared lifecycle through real supplier-specific programs without overriding supplier authority; do not block current commerce while waiting for a perfect standardized service | Workflow proven and ready for launched repeatable service | `WARRANTY_FULFILLMENT_SERVICE_WORKFLOW.md` |
| SOK approved product-media integration | SOK / Catalog lane | READY | P2 | Product-image source received; no additional supplier-request gate | Map approved media to exact SOK SKUs and preserve channel-use boundaries when catalog lane is routed | Received media reconciled into catalog/media lane | `SUPPLIER_LEADS_LIVE_MAP.md` |
| Lithium Buyer Network prospecting | Leads / Prospecting lane | IN_PROGRESS | P3 PARALLEL | Must not interfere with tonight's vendor activation or release | Continue only in parallel capacity under the existing Hawaii → Southern California → Colorado lane | Target batch reaches defined qualification/contact state | `LITHIUM_BUYER_NETWORK_PROSPECTING_2026-09-10.md` |
| Internal email tracking / `sales@` alias reliability | Operating System / Communications | READY | P3 END-OF-FLOW | `sales@elevationupscales.com` does not reliably route to the regular inbox and can generate delivery-failure notices when used only for internal tracking | At end of the current higher-priority flow, verify actual mailbox/alias behavior and replace unreliable CC-based tracking with a dependable internal tracking method that does not create false failure notices; do not use `sales@` reflexively for internal CC tracking meanwhile | Internal tracking remains visible without bounce/failure noise or dependence on a non-delivering alias | Owner direction 2026-09-10 |

---

# WAITING

| Work Item | Owner / Execution Lane | State | Priority | Waiting On / Trigger | Action After Trigger | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| Kingboss B2B onboarding | Vendor Onboarding | WAITING | Supplier external | Supplier onboarding/package data | Continue exact product/source/compliance/fulfillment onboarding when data arrives; do not restart generic qualification | Defined commercial lane activated or rejected | `SUPPLIER_LEADS_LIVE_MAP.md` |
| SOK Hawaii warranty operating-input request | SOK RECON OS / Company Operations correspondence | WAITING | P2 | SOK response to the consolidated request already sent in the existing supplier thread | Read the full thread; classify each requested input as EXACT / ESTIMATE / UNKNOWN; combine usable inputs with verified Hawaii warehouse/freight/storage data; model true incremental and dedicated costs; return to SOK only if a missing fact materially blocks the model | Supplier operating inputs sufficiently resolved to support owner-review commercial structure or remaining material unknowns explicitly identified | `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md`; `SOK_RECON_OS_PROJECT.md` |
| Logistics Plus Hawaii storage / fulfillment qualification | Company Operations / Logistics + SOK RECON OS | WAITING — PRICING / OPERATING TERMS | P2 STRATEGIC | Conservative planning estimates and verified SOK pallet profiles were sent in the existing Cara thread; no long-term/minimum commitment was made | When pricing returns, extract receiving/DG handling, storage, outbound release/fulfillment, will-call, local delivery, Neighbor Island, minimum/account charges, and current-vs-third-party warehouse differences; use verified numbers in the SOK Hawaii economics model and escalate only genuine commitment gates | Provider returns usable pricing/operating conditions and the option is accepted for proof, rejected, or moved to a defined owner commitment gate | `SOK_RECON_OS_PROJECT.md`; current Logistics Plus correspondence; GitHub issue #67 |
| R&R Solar Hawaii low-voltage / proof-support relationship | Logistics / B2B lane | WAITING | P2 | Partner response to existing thread | Reconcile response into proof/partner role; do not duplicate outreach | Partner role and proof path activated or rejected | Current relationship; dated follow-up evidence |
| Refunded folding-bed buyer — bank credit visibility | Company Operations / Order & Fulfillment | WAITING | Customer exception only | Customer/payment-system recheck or new exception | Respond only if refund remains unresolved or customer reports a new problem | Refund visibly completed and customer obligation closes | Verified customer correspondence 2026-09-10 |

---

# HOLD / SCHEDULED / OWNER GATE

| Work Item | Owner | State | Priority | Gate / Trigger | Next | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| TikTok Shop second appeal / withdrawal-restoration | Peter Torres / Ecommerce & Vendor Operations | HOLD — SCHEDULED TOMORROW | 2026-09-11 | Owner moved routine TikTok work to tomorrow to keep tonight focused on vendor activation + deployment | Resume existing second appeal/restoration case tomorrow; do not restart it | Verified terminal platform result recorded | `PETER_PROJECT_STARTER_V2_2026-09-10.md`; Owner direction 2026-09-10 |
| eBay shipped folding-bed order monitoring | Company Operations / Order & Fulfillment | HOLD — SCHEDULED TOMORROW | 2026-09-11 / exception interrupt | Owner moved routine eBay work to tomorrow; a new live paid-customer, delivery, payment, or marketplace exception may interrupt | Tomorrow verify marketplace tracking/order propagation and delivery state; act tonight only on a material new exception | Delivery/customer obligation verified closed | Current Doba/eBay fulfillment evidence; Owner direction 2026-09-10 |
| eBay / Doba listing profitability and availability cleanup | Peter / Ecommerce & Vendor Operations | HOLD — SCHEDULED TOMORROW | 2026-09-11 | Owner moved routine eBay work to tomorrow | Tomorrow reconcile active eBay listings against Doba availability/economics; preserve useful sales history; do not blanket-remove channel | Loss-making/unfulfillable listings corrected and useful demand-test listings remain controlled | `EBAY_CHANNEL_RECON_2026-09-09.md`; Owner direction 2026-09-10 |
| SOK Hawaii permanent warranty economics / reserve-stock / service compensation | SOK RECON OS | HOLD — TRUE OWNER GATE | P2 | Requires real supplier volume/support inputs and verified storage/freight economics; material commitments remain owner-gated | Model internally after verified inputs; do not promise economics from guesses | Commercial proposal evidence-based and owner-approved before commitment | `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md` |
| SOK compliance reference PR #70 | SOK / Documentation lane | HOLD | P3 | Draft PR must be reconciled/rebased against then-current `main` before any merge | Preserve; act only if documentation remains useful and clean rebase/QA is authorized | Merged cleanly or explicitly closed as no longer needed | GitHub PR #70 |
| Peter public profile / portrait follow-through | Peter / Communications | HOLD | P3 | Publication/portrait work is intentionally lower priority | Continue only when profile/publication lane is reactivated | Intended public profile/portrait work accepted or explicitly retired | Current Peter correspondence; Sept. 9 closeout carryover |

---

# CLOSED / PROTECTED FROM RECREATION

- eBay weed-wacker order 10-15134-90489 cancellation/refund — CLOSED per Owner direction after refund action; reopen only if a new customer, marketplace, payment, or supplier exception arrives.
- VEVOR generic qualification / PRO-registration gate — COMPLETE; VEVOR is now in catalog/first-order activation. Do not restart onboarding qualification.
- VEVOR product-feed acquisition gate — COMPLETE; supplier feed received and working derivatives created.
- VEVOR Colorado tax-exemption submission gate — COMPLETE as a submission task; final review is pending but is not a general commerce blocker under VEVOR's stated pending-review treatment.
- VEVOR A-tier Shopify catalog launch — COMPLETE; 19 VEVOR Direct products plus the `VEVOR Direct` collection are ACTIVE/published with source separation, verified customer prices, one hero image per product, and supplier inventory not represented as Elevation On Hand. First-order proof remains active separately.
- Homepage/lithium PR #94 merge gate — COMPLETE at `3ee835f0d31e7f69922972358e68b1e22cdf1fdf`; only exact-SHA release/verification remains.
- Renogy application preparation, owner review, W-9 correction, supplier review and dealer approval — COMPLETE; Renogy is now an ACTIVE approved dealer relationship under `RENOGY_VENDOR_MASTER_SOP.md`. Do not recreate the application/onboarding gate.
- Renogy integration-source request — COMPLETE as an outbound task; current lane is source intake/catalog implementation and response handling, not duplicate outreach.
- SOK generic supplier prospecting/qualification — COMPLETE; SOK is an active primary authorized supplier.
- SOK product-image request — COMPLETE as an outreach/request task; downstream media mapping remains active separately.
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
3. Update the lane-specific source only when durable facts or policy changed.
4. Move WAITING/HOLD items only when their trigger occurs or Casey changes priority.
5. Move a row to CLOSED only when its closure condition is satisfied or Casey explicitly supersedes it.
