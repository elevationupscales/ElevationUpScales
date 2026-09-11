# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Last reconciled against `main`:** `a0bac7a856117abf2414e9918195c215336b77a6`

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

## Operating loop

Management:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Execution:

**VERIFY → EXECUTE → RECORD → ROUTE → CLOSE / WAIT → CONTINUE NEXT**

Worker failure does not automatically block the project. Preserve the work item and route only the unfinished action.

---

# ACTIVE

| Work Item | Owner / Execution Lane | State | Priority | Blocker / Trigger | Next Action | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| VEVOR direct-site dropship onboarding | Peter Torres / Ecommerce & Vendor Operations | IN_PROGRESS | P1-A | Human account / portal work remains | Continue existing VEVOR PRO/account/feed/direct-site product activation work | Account/catalog path verified and first live order proves operating flow | `SUPPLIER_LEADS_LIVE_MAP.md`; `PETER_PROJECT_STARTER_V2_2026-09-10.md` |
| TikTok Shop second appeal / withdrawal-restoration | Peter Torres / Ecommerce & Vendor Operations | READY | P1-B | Begins after current executable VEVOR block unless a live paid-customer problem interrupts | Continue existing second appeal/restoration work; do not restart the case | Verified terminal platform result recorded | `PETER_PROJECT_STARTER_V2_2026-09-10.md` |
| eBay shipped folding-bed order | Company Operations / Order & Fulfillment | VERIFYING | P1 customer fulfillment | Supplier shipment exists; marketplace/tracking state still requires verification | Verify marketplace tracking/order propagation and continue delivery monitoring | Delivery/customer obligation verified closed | Current Doba/eBay fulfillment evidence 2026-09-10 |
| Checkout-gate cleanup — authorized preorder/backorder and unnecessary internal gates | Commerce / Developer lane | READY | P2 HIGH | No live outage; confirmed logic/state conflict exists | Correct authorized preorder/backorder handling so generic zero-stock does not override a supported paid-order path; review HOLD/shipping-quote gates only where they unnecessarily block known customer price and viable fulfillment | Regression proves authorized backorder/preorder stays purchasable while required safety/channel/payment gates remain intact | `MANAGEMENT_OPERATING_SOP.md`; `SOK_ECOMMERCE_SHIPPING_SOP.md` |
| Shopify/SOK paid-order Operating System bridge | Commerce / Developer + Company Operations | VERIFYING | P2 | Implementation merged; live purchase-to-OS proof remains | Prove live purchase → payment → order ingestion → SKU/source/fulfillment verification → production receipt | Full first-order acceptance chain completed | Current merged application state; store-integration control |
| Master Catalog authenticated Admin preview | Catalog / Developer lane | VERIFYING | P2 | Authenticated preview/acceptance evidence remains open | Complete existing authenticated preview; do not rebuild migration foundation | Authenticated preview and required acceptance evidence complete | `DAILY_CLOSEOUT_2026-09-09_THROUGH_MIDNIGHT_MDT.md` |
| SOK Supplier, Commerce & Warranty Project | SOK RECON OS | IN_PROGRESS | P2 STRATEGIC | Current Hawaii warranty operating-input sub-item is waiting on SOK; other SOK work may continue | Do not resend the supplier request. Advance other unblocked SOK work; when SOK replies, extract EXACT / ESTIMATE / UNKNOWN inputs, combine with verified Hawaii storage/freight inputs, and build the evidence-based cost/value model | Repeatable SOK commerce/warranty operating state established and open sub-lanes reach defined state | `SOK_RECON_OS_PROJECT.md`; `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md` |
| Warranty Fulfillment shared service | Operating System / routed warranty execution | IN_PROGRESS | P2 STRATEGIC | Shared workflow defined but not yet proven as standardized multi-vendor service | Prove shared lifecycle through supplier-specific programs without overriding supplier authority | Workflow proven and ready for launched repeatable service | `WARRANTY_FULFILLMENT_SERVICE_WORKFLOW.md` |
| SOK approved product-media integration | SOK / Catalog lane | READY | P2 | Product-image source received | Map approved media to exact SOK SKUs and preserve channel-use boundaries | Received media reconciled into catalog/media lane | `SUPPLIER_LEADS_LIVE_MAP.md` |
| eBay / Doba listing profitability and availability cleanup | Peter / Ecommerce & Vendor Operations | READY | P2 | VEVOR and TikTok outrank routine eBay cleanup | Reconcile active eBay listings against current Doba availability/economics; preserve useful sales history; do not blanket-remove channel | Loss-making/unfulfillable listings corrected and useful demand-test listings remain controlled | `EBAY_CHANNEL_RECON_2026-09-09.md`; current owner direction |
| Homepage lithium hero / approved retail branding repair — PR #94 | Developer lane | IN_PROGRESS | P2 | PR review/QA/release flow remains open | Complete bounded PR flow without changing commerce logic | Approved merge and required release/production verification complete | GitHub PR #94 |
| Lithium Buyer Network prospecting | Leads / Prospecting lane | IN_PROGRESS | P3 PARALLEL | Must not interfere with customer/order or active supplier activation | Continue Hawaii → Southern California → Colorado prospecting under existing lane | Target batch reaches defined qualification/contact state | `LITHIUM_BUYER_NETWORK_PROSPECTING_2026-09-10.md` |
| Internal email tracking / `sales@` alias reliability | Operating System / Communications | READY | P3 END-OF-FLOW | `sales@elevationupscales.com` does not reliably route to the regular inbox and can generate delivery-failure notices when used only for internal tracking | At end of the current higher-priority flow, verify the actual mailbox/alias behavior and replace unreliable CC-based tracking with a dependable internal tracking method that does not create false failure notices | Internal tracking remains visible without bounce/failure noise or dependence on a non-delivering alias | Owner direction 2026-09-10 |

---

# WAITING

| Work Item | Owner / Execution Lane | State | Priority | Waiting On / Trigger | Action After Trigger | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| Renogy Partner Program | Peter / Vendor Onboarding | WAITING | P1 supplier / parked | Renogy approval, decline, or material information request | Reconcile response immediately and activate only approved lane | Account approved/declined and resulting operating/channel state recorded | `SUPPLIER_LEADS_LIVE_MAP.md` |
| Kingboss B2B onboarding | Vendor Onboarding | WAITING | P2 | Supplier onboarding/package data | Continue exact product/source/compliance/fulfillment onboarding when data arrives | Defined commercial lane activated or rejected | `SUPPLIER_LEADS_LIVE_MAP.md` |
| SOK Hawaii warranty operating-input request | SOK RECON OS / Company Operations correspondence | WAITING | P2 | SOK response to the consolidated request already sent in the existing supplier thread | Read the full thread; classify each requested input as EXACT / ESTIMATE / UNKNOWN; combine usable inputs with verified Hawaii warehouse/freight/storage data; model true incremental and dedicated costs; return to SOK only if a missing fact materially blocks the model | Supplier operating inputs are sufficiently resolved to support the owner-review commercial structure or remaining material unknowns are explicitly identified | `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md`; `SOK_RECON_OS_PROJECT.md` |
| Logistics Plus Hawaii storage / fulfillment qualification | Logistics lane | WAITING | P2 | Provider reply to the sent follow-up on investment, long-term-agreement/minimum options, scalable Hawaii warehouse support, pricing, and recommended storage path | Reconcile quote/safety/site response without unauthorized long-term commitment; use verified provider inputs in the SOK Hawaii economics model | Storage option accepted for proof, rejected, or moved to defined owner gate | Current correspondence; dated follow-up evidence |
| R&R Solar Hawaii low-voltage / proof-support relationship | Logistics / B2B lane | WAITING | P2 | Partner response to existing thread | Reconcile response into proof/partner role; do not duplicate outreach | Partner role and proof path activated or rejected | Current relationship; dated follow-up evidence |
| Refunded folding-bed buyer — bank credit visibility | Company Operations / Order & Fulfillment | WAITING | P1 customer money | Customer/payment-system recheck or new exception | Respond only if refund remains unresolved or customer reports a new problem | Refund visibly completed and customer obligation closes | Verified customer correspondence 2026-09-10 |

---

# HOLD / OWNER GATE

| Work Item | Owner | State | Priority | Gate / Trigger | Next | Close Condition | Source Record |
|---|---|---|---|---|---|---|---|
| SOK Hawaii permanent warranty economics / reserve-stock / service compensation | SOK RECON OS | HOLD | P2 | Requires real supplier volume/support inputs and verified storage/freight economics; material commitments remain owner-gated | Model internally after verified inputs; do not promise economics from guesses | Commercial proposal evidence-based and owner-approved before commitment | `SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md` |
| SOK compliance reference PR #70 | SOK / Documentation lane | HOLD | P3 | Draft PR must be reconciled/rebased against then-current `main` before any merge | Preserve; act only if documentation remains useful and clean rebase/QA is authorized | Merged cleanly or explicitly closed as no longer needed | GitHub PR #70 |
| Peter public profile / portrait follow-through | Peter / Communications | HOLD | P3 | Background questionnaire returned; remaining publication/portrait work depends on current website priority and approved media | Continue only when profile/publication lane is reactivated | Intended public profile/portrait work accepted or explicitly retired | Current Peter correspondence; Sept. 9 closeout carryover |

---

# CLOSED / PROTECTED FROM RECREATION

- eBay weed-wacker order 10-15134-90489 cancellation/refund — CLOSED per Owner direction after refund action; reopen only if a new customer, marketplace, payment, or supplier exception arrives.
- Renogy application preparation, owner review, submission, and requested W-9 correction — COMPLETE; current lane is external review.
- SOK generic supplier prospecting/qualification — COMPLETE; SOK is an active primary authorized supplier.
- SOK product-image request — COMPLETE as an outreach/request task; downstream media mapping remains active separately.
- SOK Hawaii warranty operating-input request drafting/owner-review/send gate — COMPLETE as a send task; the live sub-item is now WAITING on SOK response.
- R&R duplicate unsent-response gate — SUPERSEDED by later sent correspondence; current lane is WAITING on partner.
- Logistics Plus earlier unsent document/reply gate — SUPERSEDED by later response/document transmission; current lane is WAITING on provider review/pricing.
- eBay unknown-device alert from September 10 — CLOSED after human confirmation that sign-in was authorized.
- Worker Exact-SHA release workflow implementation — COMPLETE and merged; future releases use permanent workflow rather than rebuilding it.
- September 9 supplier-state consolidation and Operating System role reconciliation — COMPLETE; preserve closeout as historical evidence.

## Update discipline

When a material event occurs:

1. Verify the event against the applicable source.
2. Update this row instead of creating a second global status record.
3. Update the lane-specific source only when durable facts or policy changed.
4. Move WAITING/HOLD items only when their trigger occurs or Casey changes priority.
5. Move a row to CLOSED only when its closure condition is satisfied or Casey explicitly supersedes it.
6. Preserve historical dated records; do not rewrite history to imitate current state.

**PRIORITY CHANGE ≠ PROJECT CLOSURE.**  
**NEW PROJECT ≠ OLD PROJECT DISAPPEARS.**  
**WAITING ≠ CLOSED.**  
**HOLD ≠ FORGOTTEN.**