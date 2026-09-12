# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Current routing control:** `MPM5_STREAMLINED_EXECUTION_MODE_2026-09-12.md`  
**Current commerce tuning control:** `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`  
**Current checkout recovery control:** `MPM5_OWNER_PAYMENT_DRIFT_RECOVERY_WORKFLOW_2026-09-12.md`  
**Current RECON correction:** `OS_RECON_OWNER_PAYMENT_DRIFT_CORRECTION_2026-09-12.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

Management loop:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Execution loop:

**VERIFY → FIX IF POSSIBLE → COMPLETE IF CLEAN → HOLD ONLY THE BLOCKED ITEM → MOVE ON**

Current streamlined recovery routing:

**STOP DRIFT → FREEZE PRODUCTION → RECONCILE FACTS → MPM DEFINES ONE FLOW → RECON VALIDATES → DEV BUILDS ONE DELTA → SAME-SHA RELEASE → CLOSE.**

Current commerce sequencing:

**PAYMENT-ARCHITECTURE RECOVERY FIRST → CURRENT STORE STABILITY → VENDOR/CHANNEL INTAKE AUDIT → RESUME LISTING/TUNING ONLY AFTER RELEASE.**

## Hard controls preserved

- Protected top homepage remains **NO TOUCH** unless Casey explicitly authorizes the exact change.
- **NEW ITEM LISTINGS ARE PAUSED while the owner payment-architecture recovery is active.** Preserve current sellable inventory; do not expand catalogs during checkout stabilization.
- No paid ads / boosts / PPC / sponsored marketplace traffic / prepaid retargeting until capital recovery is verified and Casey explicitly reopens paid acquisition.
- **No new-channel expansion campaign is foreground work while `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md` is active.** Meta, Google & YouTube, Amazon, Walmart and other not-yet-installed channels remain backlog/evidence only.
- Shopify Payments is now verified **Accepting payments / Receiving payouts**. Older `Complete setup` pointers are stale and may not route current work.
- PayPal Wallet inside the current U.S. Shopify checkout is part of the Shopify Payments lane; it must not be represented as a direct-PayPal-payout bypass.
- The independent Elevation PayPal Orders v2 code remains technical evidence, but it does not decide the replacement architecture by itself.
- Stale PayPal-only branch `recon/elevation-paypal-only-separation-20260912` / candidate `84af23ec814baa73718e33ec052044ce4706534d` is **DO NOT DEPLOY / HISTORICAL DRIFT EVIDENCE**.
- Preserve current production while MPM defines the replacement flow and RECON validates it. No branch movement merely to make pointers match.
- Microsoft Copilot is an already-installed Shopify surface, but existing exposure does not create VEVOR marketplace/channel authorization; held VEVOR staging exposure remains gated for VEVOR/MPM classification.
- TikTok failed appeal is terminal under the current platform state; do not replay/resubmit it unless TikTok provides a genuinely new remedy or Casey explicitly reopens a new platform-supported path.
- No blind production deploy, wholesale `main` deploy, force update or stale-branch deployment.
- SOK out-of-stock/unavailable products may use the established pre-purchase/backorder rule where allowed.
- Hawaii lithium/warranty/logistics controls remain separate and may not be bypassed by generic channel actions.

## DEV / RECON disposition

**MASTER RECON OS: ACTIVE — OWNER PAYMENT-ARCHITECTURE DRIFT CORRECTION / POINTER INTEGRITY / RELEASE HOLD.**

**MASTER DEVELOPER: STANDBY — DO NOT BUILD OR DEPLOY UNTIL MPM RECORDS THE REPLACEMENT FLOW AND RECON PASSES IT.**

The former `MPM5_ELEVATION_CART_CHECKOUT_P0_REPAIR_2026-09-12.md` remains evidence of prior defects, but it is not current deployment authority while architecture recovery is active.

A DEV handoff after the recovery gate requires:

1. exact approved checkout/payment architecture;
2. exact URL/path/component;
3. exact SKU/order when applicable;
4. reproduction steps;
5. expected result;
6. actual result;
7. customer/revenue impact;
8. owning lane;
9. confirmation that platform/configuration repair was attempted or ruled out;
10. MPM acceptance + MASTER RECON PASS on the exact bounded replacement packet.

---

# FOREGROUND P0

| Work Item | Owner | Current State | Next Action | DEV Role | Close Condition |
|---|---|---|---|---|---|
| Owner payment-architecture drift recovery / Elevation checkout | **MPM5 + MASTER RECON OS** | **P0 ACTIVE — RECON HOLD / STALE DEPLOYMENT BLOCKED / MPM REPLACEMENT FLOW PENDING.** Current production remains `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`; recovery remains `4da62160a5d9250a1d977a42052644798fac0b40`; stale `84af23ec...` candidate is DO NOT DEPLOY. | MPM records one replacement flow covering checkout owner, processors, payout/settlement owner, order system, cart/product truth, fulfillment, refunds/cancellations, fallback, lane boundaries and rollback. MASTER RECON validates that flow and returns PASS or one bounded correction list. | **STANDBY.** Wake only after MPM replacement flow + RECON PASS. Then build one bounded delta from exact approved lineage. | Active controls agree; replacement flow recorded; RECON PASS; one bounded candidate built; exact-SHA QA/release/live verify passes; new accepted baseline recorded. |
| Owner communications / residual Google Voice forwarding | **MPM / Communications Recovery** | **P0 CRITICAL — ACCOUNT RECOVERED / VOICE DELETED / RESIDUAL FORWARDING REMAINS** | Carrier removes conditional + unconditional Voice forwarding; Google clears any stale Voice-side linked/device state; test direct inbound call + SMS. | None unless a separate company-owned web/contact defect is proven. | Direct carrier call PASS + direct SMS PASS + no residual Voice routing + Casey confirms normal business communications. |
| eBay customer/cash recovery + profitability contraction | **eBay Store Operations under Peter / Company Operations** | **P0 PARALLEL — CUSTOMER OBLIGATIONS + CASH RELEASE + LOSS PREVENTION** | Resolve open shipment/cancellation/refund obligations first; clear held-cash blockers; then maintain only exact-source positive-contribution listings. **No new listings while current-store recovery hold is active.** No Promoted Listings while ad lock is active. | None for Seller Hub/platform operations. | Customer obligations resolved; cash blockers isolated/cleared; repeat-loss configurations removed; profitable core is executable. |

---

# EXISTING SHOP TUNING / PARALLEL REVENUE — PRESERVE, DO NOT EXPAND

| Lane | Owner | State | Next |
|---|---|---|---|
| Shopify Online Store + payment readiness | Shopify Store Operations + Owner | **PRESERVE — SHOPIFY PAYMENTS ACCEPTING PAYMENTS / RECEIVING PAYOUTS / 53 PUBLIC / 50 VEVOR STAGING HOLD** | Preserve current working Shopify configuration. Do not represent Shopify PayPal Wallet as a direct-PayPal payout bypass. Keep 50 VEVOR staging products hidden. **No new listings.** |
| Direct-site first profitable sale | MPM / Company Operations + commerce/vendor lanes | **HOLD UNTIL PAYMENT-ARCHITECTURE RECOVERY CLOSES** | Do not manufacture an order. After recovery acceptance, first real order proves payment → durable order → source → fulfillment → realized contribution. |
| Shopify-installed surfaces — Shop / Microsoft Copilot / Agentic | Shopify Store Operations + owning vendor/MPM where channel permission is implicated | **TUNING / COPILOT VEVOR PERMISSION GATE OPEN / NO EXPANSION** | Do not broaden publication. VEVOR/MPM must later classify Copilot channel authorization and allowed SKU set. |
| VEVOR | VEVOR Project Operations Manager / Specialist | ACTIVE EXISTING CATALOG — 19 A-tier live / 17 qualified B-tier ACTIVE / 3 promotion-cleared / 50-SKU Shopify staging cohort held / COPILOT PERMISSION DECISION OPEN | **Pause new item activation/listing.** Preserve current sellable set and staging hold. Vendor-channel/intake audit resumes after checkout recovery. |
| Renogy | Renogy Branch Operations Manager / Specialist | ACTIVE EXISTING CATALOG — 2 ACTIVE / 4 DRAFT | **Pause new activation/listing.** Preserve 2 ACTIVE / 4 DRAFT. Vendor-channel/intake audit resumes after checkout recovery. |
| Apparel / Fourthwall | Apparel Vendor Operations Manager | ACTIVE — EXISTING 29-PRODUCT FOURTHWALL TUNING | Existing-shop cleanup may continue without new products: payout setup → promo/markdown safety → copy cleanup → economics → hero set → exact TikTok sync only. |
| TikTok Shop / Affiliate Growth | TikTok execution + TikTok Affiliate Growth Manager under Peter | **ACTIVE UNDER RESTRICTION / APPEAL TERMINAL-FAILED / TUNE CURRENT SHOP ONLY** | Do not replay appeal. Fix current OOS/account/catalog/economics issues only. **No new product listings or paid spend.** |

---

# STRATEGIC / SUPPORT WORK — PRESERVED, NOT FOREGROUND

| Work Item | Owner | State / Rule |
|---|---|---|
| Post-stabilization vendor-shop + channel-catalog architecture | MPM / Ecommerce + Shopify Store Operations | **PLANNED / HOLD — OWNER DIRECTION CAPTURED.** Do not build before current payment-architecture recovery and vendor/channel intake are clean. |
| New-channel expansion — Meta / Google & YouTube / Amazon / Walmart / additional marketplaces | MPM / Ecommerce | **HOLD — CURRENT STORE FIRST.** Research may remain backlog/evidence only. |
| Existing vendor-channel + intake process audit | MPM / Company Operations + vendor managers | **QUEUED IMMEDIATELY AFTER PAYMENT-ARCHITECTURE RECOVERY** | Audit current SOK, VEVOR, Renogy, Kingboss and other active intake/channel paths: vendor identity → authorization → exact SKU → source → stock → MAP/floor → landed cost → shipping → warranty/returns → channel eligibility → publication → checkout → fulfillment → realized margin. No new listings during the audit. |
| SOK Supplier / Commerce / Warranty | SOK Project Operations Manager / SOK RECON OS | ACTIVE primary supplier. Lower-48 commerce continues. Hawaii warranty/logistics economics remain proving. No duplicate generic supplier qualification or catalog expansion during current listing pause. |
| Kingboss Stage-1 proving | Kingboss Project Operations Manager / Specialist | ACTIVE. Continue source/catalog/SKU/MAP/channel/warranty/compliance reconciliation that does not create new public listings. No speculative 100-unit commitment without owner approval. |
| Universal catalog vendor acceptance | Catalog + vendor managers | **PAUSED FOR NEW PUBLICATION / SOURCE MAINTENANCE ONLY.** Existing source truth may be maintained; do not publish new items until current-store hold is released. |
| Homepage-connected commerce / protected-top boundary | MPM | HOLD / DEFERRED. Protected top remains hard no-touch. |
| ElevationUpScales.com residual routing/content items | MPM | PRESERVED / VERIFY-ONLY outside active recovery. |
| Universal store / normalized retail architecture residual | MPM | PRESERVED BACKLOG. Issue #65 remains control/evidence. |
| Exact Renogy delayed-order checkout test | Commerce / QA | TEST-ONLY after payment architecture is accepted; do not patch independently. |
| Shopify/SOK paid-order OS bridge | Company Operations / Commerce | VERIFY ON FIRST REAL ORDER after recovery. Do not manufacture an order. |
| Master Catalog authenticated Admin preview | Catalog / Admin QA | QUEUED acceptance evidence only; no DEV capacity unless defect proven. |
| H2O Logistics Hawaii / Pasha backup route | Company Operations / Logistics + SOK | IN PROGRESS with existing source file/access blocker. Recover existing workbook; do not ask SOK to resend supplied facts. |
| Warranty Fulfillment shared service | Operating System / warranty execution | IN PROGRESS through real supplier cases; must not block commerce. |
| SOK approved product-media integration | SOK Project / Catalog | SOURCE MAINTENANCE ONLY during listing pause. Use verified official source; do not turn asset mapping into new publication. |
| Complementary vendor activation / SolarStock queue | Peter / Vendor Onboarding | P3 / WAIT OR EVIDENCE ONLY. Existing conversations may continue; no new storefront publication. |
| Lithium Buyer Network prospecting | Leads / Prospecting | P3 PARALLEL; must not displace P0/P1 and does not authorize paid acquisition. |
| Internal `sales@` tracking reliability | Operating System / Communications | P3 END-OF-FLOW. Fix after higher-priority communications and commerce work. |

---

# WAITING

| Work Item | State | Trigger / Action |
|---|---|---|
| SolarStock USA quote / direct-job-site qualification | WAITING — REQUEST SENT | Supplier response → reconcile quote, availability, lead time, freight/direct-ship terms. No duplicate send/chase and no new publication during listing pause. |
| Logistics Plus Hawaii storage / fulfillment qualification | WAITING — DG / OPERATING REVIEW | Provider terms → reconcile handling, storage, release/fulfillment, delivery/minimums. |
| R&R Solar Hawaii proof-support relationship | WAITING | Partner response → reconcile existing thread. No duplicate outreach. |
| Refunded folding-bed buyer — bank credit visibility | WAITING — CUSTOMER EXCEPTION ONLY | Recheck only on new complaint or payment-system evidence. |

---

# OWNER / HARD HOLD

| Work Item | State | Reopen Gate |
|---|---|---|
| New item listings / catalog expansion | **HOLD — PAYMENT-ARCHITECTURE RECOVERY FIRST** | MPM replacement flow + RECON PASS + bounded DEV candidate + production/live verification close the incident; then MPM/Casey releases listing work after vendor-channel/intake sequencing is confirmed. |
| Vendor storefront + channel-catalog architecture | **PLANNED HOLD** | Payment-architecture recovery closes and current vendor-channel/intake audit establishes clean product/source/channel truth. |
| New-channel expansion | **HOLD — CURRENT STORE FIRST** | Existing current shops reach clean product/publication/purchase/fulfillment/profitability baselines and MPM/Casey explicitly reopens expansion. |
| Paid advertising / prepaid media | **HOLD — OWNER CAPITAL-RECOVERY RULE** | Verified capital-recovery hole reaches zero **and** Casey explicitly reopens paid acquisition. |
| SOK Hawaii permanent warranty economics / reserve/service compensation | HOLD — OWNER GATE | Provider quotes + excluded-cost reconciliation + proof actuals + owner approval. |
| SOK compliance reference PR #70 | HOLD | Fresh reconciliation/rebase if still useful; do not auto-merge stale lineage. |
| Peter public profile / portrait | HOLD | Reactivate only when communications/publication lane becomes current. |

---

# CLOSED / DO NOT RECREATE

- Protected top homepage approved experience — closed/no-touch absent exact owner authorization or genuine defect.
- Shopify storefront password gate — closed.
- Shopify Payments onboarding `Complete setup` blocker — **closed / stale**; current authenticated state is accepting payments / receiving payouts.
- Shopify 50-product hidden cohort generic-publication blocker — closed as **VEVOR intentional staging hold / do not bulk publish**.
- Representative Shopify Online Store guest checkout defect assumption — closed; preserve working paths.
- Owner PayPal-only lane-separation deployment candidate `84af23ec...` — **RETIRED / DO NOT DEPLOY / HISTORICAL DRIFT EVIDENCE**.
- TikTok seller-verification/high-risk-shop appeal — **FAILED / CANNOT APPEAL AGAIN**; do not recreate or resubmit from stale `SUBMITTED / WAITING` pointers.
- VEVOR PRO registration, feed acquisition, Colorado tax-exemption submission, A-tier launch and current qualified B-tier publication — completed; do not restart.
- VEVOR generic fulfillment inquiry and current-window 10-SKU fresh check — completed; do not rerun without refresh trigger.
- Renogy dealer onboarding/W-9/portal setup — completed; do not restart.
- SOK generic supplier qualification, official image-source request and Hawaii warranty-input request/intake — completed; do not duplicate.
- SolarStock bounded outbound request — completed as send; now waiting.
- R&R duplicate response gate, Logistics Plus outbound request, ten complementary vendor introductions, DMX/Magnum/Dimensions initial outreach — completed as send; preserve current waiting/prospect states.
- Legacy GitHub control issues #26, #30 and #33–#36 — closed/superseded.
- eBay unknown-device alert — closed after human confirmation.

## Update discipline

1. Update the owning row/state; do not create a second global truth record.
2. New factual evidence corrects stale facts but does not silently override management authority.
3. A terminal current Worktree defeats stale active pointers.
4. Company Operations consumes owning-lane truth; it does not repeat completed current-window checks.
5. Block only the exact blocked item; unrelated executable work continues.
6. **Payment-architecture recovery outranks new product publication.**
7. An ACTIVE Shopify product is not automatically publicly purchasable; publication/channel state must be verified against intended staging/release controls.
8. Shopify Payments is currently accepting payments / receiving payouts; older `Complete setup` pointers are stale.
9. Shopify PayPal Wallet is in the Shopify Payments lane and is not a direct-payout bypass.
10. Existing Microsoft Copilot exposure does not establish third-party VEVOR channel authorization; route held-cohort permission to the owning VEVOR/MPM lane.
11. A TikTok appeal marked failed/cannot appeal again defeats older submitted/waiting pointers; do not replay it.
12. An auto-enrolled affiliate product is not automatically profit-approved.
13. DEV remains standby until MPM replacement architecture is recorded and RECON passes the exact bounded packet.
14. MASTER RECON is active for this drift correction, then returns to triggered integrity-gate mode after the new baseline is accepted.
15. MPM closes or downgrades stale recovery rows as evidence matures instead of keeping every historical P0 active forever.
16. **Do not create new-channel work or new item listings while the current-store recovery hold is active.**
17. COM2 provides acceptance/current-state evidence only; it must not create a parallel payment-architecture implementation.

## Last-resort fallback

No replacement payment architecture is assumed in advance. MPM must explicitly define the accepted checkout/payment/payout/order/fulfillment/refund/fallback model; RECON validates it; DEV then implements only the bounded accepted delta. Any future architecture must preserve sales continuity, use hosted/tokenized payment components, never store raw card/CVV, and prove payment confirmation → durable order → source/fulfillment → refund/exception/security acceptance before cutover.