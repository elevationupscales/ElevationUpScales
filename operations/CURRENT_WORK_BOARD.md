# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Current routing control:** `MPM5_STREAMLINED_EXECUTION_MODE_2026-09-12.md`  
**Current payment architecture:** `MPM5_PAYMENT_ARCHITECTURE_REPLACEMENT_FLOW_2026-09-12.md`  
**Current owner override:** `OWNER_DIRECTIVE_RELEASE_PAYMENT_REPAIR_GATES_2026-09-12.md`  
**Current RECON architecture PASS:** `OS_RECON_PAYMENT_ARCHITECTURE_VALIDATION_PASS_2026-09-12.md`  
**Current coding Worktree:** `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`  
**Commerce tuning control:** `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

Management loop:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Current bounded checkout execution loop:

**APPROVED PRODUCTION PARENT → BOUNDED BUILD → AUTOMATED TESTS → NON-CHARGING SMOKE → SAME-SHA DEPLOY → LIVE VERIFY → RECEIPT.**

## Hard controls preserved

- Protected top homepage remains **NO TOUCH** unless Casey explicitly authorizes the exact change or a genuine defect is proven.
- **New item listings / catalog expansion remain paused during the bounded checkout repair.**
- No paid ads / boosts / PPC / sponsored marketplace traffic / prepaid retargeting until the capital-recovery gate is satisfied and Casey explicitly reopens paid acquisition.
- No new-channel expansion campaign while current-store stabilization and existing-shop tuning remain active.
- Shopify Payments is verified **Accepting payments / Receiving payouts**; older `Complete setup` pointers are stale.
- PayPal Wallet inside the current U.S. Shopify checkout belongs to the Shopify Payments lane; it is not a direct-PayPal-payout bypass.
- ElevationUpScales.com direct-site checkout is a separate Elevation transaction lane using PayPal Orders v2 and a durable Elevation local order record.
- **No cross-route Shopify fallback is allowed for an Elevation direct-site transaction.**
- Stale candidate `84af23ec814baa73718e33ec052044ce4706534d` remains **DO NOT DEPLOY / HISTORICAL DRIFT EVIDENCE**.
- No blind production deploy, wholesale `main` deploy, force update or stale-branch deployment.
- Only the exact candidate SHA that passed the required tests/smoke may deploy.
- No secret/PayPal credential commit and no raw-card/CVV handling.
- No live customer charge is required for QA.
- SOK/Hawaii/warranty/logistics controls remain separate and may not be bypassed by generic commerce work.
- TikTok failed appeal remains terminal unless TikTok provides a genuinely new remedy or Casey explicitly reopens a platform-supported path.

## DEV / RECON disposition

**MASTER DEVELOPER: ACTIVE — BOUNDED DIRECT-SITE CHECKOUT REPAIR.**

**MASTER RECON OS: ACTIVE — INTEGRITY / LINEAGE / CANDIDATE / RELEASE-EVIDENCE VALIDATION IN PARALLEL.**

The former generic pre-build RECON hold is retired for this bounded repair. RECON may stop an exact candidate only for a newly discovered material candidate-specific safety/integrity defect.

Architecture validation is complete:

**`MPM5_PAYMENT_ARCHITECTURE_REPLACEMENT_FLOW_2026-09-12.md` = RECON PASS FOR BUILD AUTHORITY.**

Candidate-specific release validation remains open until DEV returns an exact built/tested candidate.

---

# FOREGROUND P0

| Work Item | Owner | Current State | Next Action | DEV Role | Close Condition |
|---|---|---|---|---|---|
| Elevation direct-site cart / checkout / PayPal repair | **MASTER DEVELOPER under MPM5; MASTER RECON parallel integrity** | **P0 ACTIVE — BUILD HOLD RELEASED / ARCHITECTURE PASS / FRESH BOUNDED CANDIDATE REQUIRED.** Production anchor remains `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`; recovery reference remains `4da62160a5d9250a1d977a42052644798fac0b40`; stale `84af23ec...` remains DO NOT DEPLOY. | Build from the exact approved production lineage. Direct path only: cart → canonical revalidation → checkout review → PayPal Orders v2 → durable local order → guarded capture/reconciliation → fulfillment routing. Run automated tests + non-charging smoke. Return exact candidate SHA to RECON. | **ACTIVE — bounded repair only.** | Candidate remains bounded; tests pass; smoke passes; RECON exact-SHA integrity passes; same tested SHA deploys; live non-charging verify passes; durable production receipt/new baseline recorded. |
| Owner communications / residual Google Voice forwarding | **MPM / Communications Recovery** | **P0 CRITICAL — ACCOUNT RECOVERED / VOICE DELETED / RESIDUAL FORWARDING REMAINS** | Carrier/Google clear residual forwarding/state; verify direct inbound call + SMS. | None unless a separate company-owned web/contact defect is proven. | Direct call PASS + direct SMS PASS + no residual Voice routing + Casey confirms normal business communications. |
| eBay customer/cash recovery + profitability contraction | **eBay Store Operations under Peter / Company Operations** | **P0 PARALLEL — CUSTOMER OBLIGATIONS + CASH RELEASE + LOSS PREVENTION** | Resolve shipment/cancellation/refund obligations and held-cash blockers; preserve only source-safe positive-contribution core. No new listings during current repair; no Promoted Listings while ad lock is active. | None for Seller Hub/platform operations. | Customer obligations resolved; cash blockers cleared/isolated; repeat-loss configurations removed; profitable core executable. |

---

# EXISTING SHOP / CHANNEL STATE — PRESERVE, DO NOT EXPAND

| Lane | Owner | Current State | Next |
|---|---|---|---|
| Shopify Online Store | Shopify Store Operations + Owner | **PRESERVE — SHOPIFY PAYMENTS ACCEPTING PAYMENTS / RECEIVING PAYOUTS / 53 PUBLIC / 50 VEVOR STAGING HOLD** | Preserve working Shopify checkout/payment configuration. Keep 50 VEVOR staging products hidden. No payment architecture experiments and no new listings. |
| Direct-site first profitable sale | MPM / Company Operations + commerce/vendor lanes | **HOLD UNTIL BOUNDED REPAIR IS LIVE-VERIFIED** | Do not manufacture an order. After repair close, first real order proves payment → durable order → source → fulfillment → realized contribution. |
| Shopify installed surfaces — Shop / Microsoft Copilot / Agentic | Shopify Store Operations + owning vendor/MPM | **PRESERVE / COPILOT VEVOR PERMISSION GATE OPEN / NO EXPANSION** | Do not broaden publication. VEVOR/MPM later classifies channel authorization and allowed SKU set. |
| VEVOR | VEVOR Project Operations Manager / Specialist | **ACTIVE EXISTING CATALOG / PUBLICATION HOLD** — 19 A-tier live / 17 qualified B-tier ACTIVE / 3 promotion-cleared / 50-SKU staging cohort held | Preserve current sellable set and staging hold. No new activation during checkout repair. Real order still triggers exact source/cost/MAP/shipping recheck. |
| Renogy | Renogy Branch Operations Manager / Specialist | **ACTIVE EXISTING CATALOG / PUBLICATION HOLD — 2 ACTIVE / 4 DRAFT** | Preserve current 2/4 state; no new activation during checkout repair. Real order triggers exact dealer/orderability/backorder/cost/shipping recheck. |
| SOK | SOK Project Operations Manager / SOK RECON OS | **ACTIVE PRIMARY SUPPLIER** | Lower-48 controlled commerce + Hawaii warranty/logistics proving continue; no duplicate qualification or generic publication expansion. |
| Kingboss | Kingboss Project Operations Manager / Specialist | **ACTIVE STAGE-1 PROVING** | Continue source/catalog/SKU/MAP/channel/warranty/compliance reconciliation only; no new public listings or speculative 100-unit commitment. |
| Apparel / Fourthwall | Apparel Vendor Operations Manager | **ACTIVE — EXISTING 29-PRODUCT FOURTHWALL TUNING** | Payout setup → promo/markdown safety → copy/economics cleanup → hero set → exact TikTok sync only. No new provider/store/product expansion. |
| TikTok Shop / Affiliate Growth | TikTok execution + TikTok Affiliate Growth Manager under Peter | **ACTIVE UNDER RESTRICTION / APPEAL TERMINAL-FAILED / CURRENT-SHOP TUNING ONLY** | No appeal replay. Fix exact current OOS/account/catalog/economics issues only; no new product listings or paid spend. Preserve clean fulfillment/returns/support state and track held funds. |

---

# STRATEGIC / SUPPORT WORK — PRESERVED, NOT FOREGROUND

| Work Item | Owner | State / Rule |
|---|---|---|
| Existing vendor-channel + intake process audit | MPM / Company Operations + vendor managers | **QUEUED AFTER BOUNDED CHECKOUT REPAIR** — audit vendor identity → authorization → exact SKU → source → stock → MAP/floor → landed cost → shipping → warranty/returns → channel eligibility → publication → checkout → fulfillment → realized margin. |
| Post-stabilization vendor-shop + channel-catalog architecture | MPM / Ecommerce + Shopify Store Operations | **PLANNED HOLD** — do not build before checkout repair closes and vendor/channel intake is clean. |
| New-channel expansion — Meta / Google & YouTube / Amazon / Walmart / additional marketplaces | MPM / Ecommerce | **HOLD — CURRENT STORE FIRST.** Research may remain backlog/evidence only. |
| Universal catalog vendor acceptance | Catalog + vendor managers | **SOURCE MAINTENANCE ONLY / NEW PUBLICATION PAUSED.** |
| Homepage-connected commerce / protected-top boundary | MPM | **HOLD / NO TOUCH.** |
| ElevationUpScales.com residual routing/content items | MPM | **PRESERVED / VERIFY-ONLY outside bounded repair.** |
| Universal store / normalized retail architecture residual | MPM | **PRESERVED BACKLOG.** Issue #65 remains checkout-repair control/evidence. |
| Exact Renogy delayed-order checkout test | Commerce / QA | **TEST-ONLY after repair acceptance.** Any defect returns bounded evidence; do not patch independently. |
| Shopify/SOK paid-order OS bridge | Company Operations / Commerce | **VERIFY ON FIRST REAL ORDER after repair.** Do not manufacture an order. |
| Master Catalog authenticated Admin preview | Catalog / Admin QA | **QUEUED acceptance evidence only.** |
| H2O Logistics Hawaii / Pasha backup route | Company Operations / Logistics + SOK | **IN PROGRESS** with existing source-file/access blocker. Recover existing workbook; do not ask SOK to resend supplied facts. |
| Warranty Fulfillment shared service | Operating System / warranty execution | **IN PROGRESS through real supplier cases; must not block commerce.** |
| SOK approved product-media integration | SOK Project / Catalog | **SOURCE MAINTENANCE ONLY during listing pause.** |
| Complementary vendor activation / SolarStock queue | Peter / Vendor Onboarding | **P3 / WAIT OR EVIDENCE ONLY.** Existing conversations may continue; no new storefront publication. |
| Lithium Buyer Network prospecting | Leads / Prospecting | **P3 PARALLEL**; must not displace P0/P1 and does not authorize paid acquisition. |
| Internal `sales@` tracking reliability | Operating System / Communications | **P3 END-OF-FLOW.** |

---

# WAITING

| Work Item | State | Trigger / Action |
|---|---|---|
| SolarStock USA quote / direct-job-site qualification | WAITING — REQUEST SENT | Supplier response → reconcile quote, availability, lead time, freight/direct-ship terms. No duplicate chase and no new publication during listing pause. |
| Logistics Plus Hawaii storage / fulfillment qualification | WAITING — DG / OPERATING REVIEW | Provider terms → reconcile handling, storage, release/fulfillment, delivery/minimums. |
| R&R Solar Hawaii proof-support relationship | WAITING | Partner response → reconcile existing thread; no duplicate outreach. |
| Refunded folding-bed buyer — bank credit visibility | WAITING — CUSTOMER EXCEPTION ONLY | Recheck only on new complaint or payment-system evidence. |

---

# OWNER / HARD HOLD

| Work Item | State | Reopen Gate |
|---|---|---|
| New item listings / catalog expansion | **HOLD — BOUNDED CHECKOUT REPAIR FIRST** | Exact candidate passes tests/smoke + RECON integrity + same-SHA production/live verification; then MPM/Casey releases listing work after vendor-channel/intake sequencing. |
| Vendor storefront + channel-catalog architecture | **PLANNED HOLD** | Checkout repair closes + vendor-channel/intake audit establishes clean product/source/channel truth. |
| New-channel expansion | **HOLD — CURRENT STORE FIRST** | Existing shops reach clean product/publication/purchase/fulfillment/profitability baselines and MPM/Casey explicitly reopen expansion. |
| Paid advertising / prepaid media | **HOLD — OWNER CAPITAL-RECOVERY RULE** | Verified capital-recovery hole reaches zero **and** Casey explicitly reopens paid acquisition. |
| SOK Hawaii permanent warranty economics / reserve/service compensation | **HOLD — OWNER GATE** | Provider quotes + excluded-cost reconciliation + proof actuals + owner approval. |
| SOK compliance reference PR #70 | HOLD | Fresh reconciliation/rebase if still useful; do not auto-merge stale lineage. |
| Peter public profile / portrait | HOLD | Reactivate only when communications/publication lane becomes current. |

---

# CLOSED / DO NOT RECREATE

- Protected top homepage approved experience — closed/no-touch absent exact owner authorization or genuine defect.
- Shopify storefront password gate — closed.
- Shopify Payments onboarding `Complete setup` blocker — **closed/stale**; authenticated current state is Accepting payments / Receiving payouts.
- Shopify 50-product hidden cohort generic-publication blocker — closed as **VEVOR intentional staging hold / do not bulk publish**.
- Representative Shopify Online Store guest-checkout defect assumption — closed; preserve working paths.
- Owner-created PayPal-only deployment candidate `84af23ec...` — **RETIRED / DO NOT DEPLOY / HISTORICAL DRIFT EVIDENCE**.
- Generic pre-build RECON hold — **retired for the current bounded checkout repair by owner override**.
- Replacement payment architecture definition — **completed by MPM / RECON architecture PASS issued**.
- TikTok high-risk-shop appeal — **FAILED / CANNOT APPEAL AGAIN**; do not replay from stale submitted/waiting pointers.
- VEVOR PRO registration/feed/tax-exemption/A-tier/current qualified B-tier work — completed; do not restart.
- Renogy dealer onboarding/W-9/portal setup — completed; do not restart.
- SOK generic supplier qualification/media/Hawaii warranty-input intake — completed; do not duplicate.
- SolarStock bounded outbound request — completed as send; now waiting.
- Legacy GitHub control issues #26, #30 and #33–#36 — closed/superseded.
- eBay unknown-device alert — closed after human confirmation.

## Update discipline

1. Newer owner/MPM/owning-lane state supersedes stale board text; adopt it without sending the lane backward.
2. A terminal/superseded/DO NOT DEPLOY state defeats older execution pointers.
3. Company Operations consumes owning-lane truth; it does not repeat completed current-window checks.
4. Block only the exact blocked item; unrelated executable work continues.
5. DEV is currently active only on the bounded direct-site transaction repair.
6. MASTER RECON validates scope, lineage, candidate evidence and release identity in parallel; it does not recreate the retired generic pre-build hold.
7. Shopify remains preserve-only for payment configuration during this repair.
8. New listings/new-channel work/paid acquisition remain separate holds and are not authorized by the checkout repair.
9. An ACTIVE Shopify product is not automatically publicly purchasable; intended staging/publication controls still apply.
10. Existing Microsoft Copilot exposure does not establish VEVOR third-party channel authorization.
11. A TikTok appeal marked failed/cannot appeal again defeats older submitted/waiting pointers; do not replay it.
12. An auto-enrolled affiliate product is not automatically profit-approved.
13. Only the exact candidate SHA that passed tests and non-charging smoke may deploy.

## Current control phrase

**ARCHITECTURE PASS → DEV ACTIVE → BOUNDED BUILD → TEST → NON-CHARGING SMOKE → RECON EXACT-CANDIDATE INTEGRITY → SAME-SHA DEPLOY → LIVE VERIFY → RECEIPT → CLOSE.**