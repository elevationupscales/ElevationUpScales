# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Current routing control:** `MPM5_STREAMLINED_EXECUTION_MODE_2026-09-12.md`  
**Current commerce tuning control:** `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`  
**Current checkout repair control:** `MPM5_ELEVATION_CART_CHECKOUT_P0_REPAIR_2026-09-12.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

Management loop:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Execution loop:

**VERIFY → FIX IF POSSIBLE → COMPLETE IF CLEAN → HOLD ONLY THE BLOCKED ITEM → MOVE ON**

Current streamlined routing:

**OPERATORS OPERATE → RECON ONLY ON CONFLICT/GATE → DEV ONLY ON PROVEN CODE DEFECT → MPM SEQUENCES → CLOSE WHAT IS DONE.**

Current commerce sequencing:

**CURRENT STORE FIRST → REAL CART → CANONICAL PRODUCT REVIEW → HARDEN PAYPAL CAPTURE → VERIFY PAYMENT CONFIG → QA → CLOSE → THEN RESUME VENDOR/CHANNEL TUNING.**

## Hard controls preserved

- Protected top homepage remains **NO TOUCH** unless Casey explicitly authorizes the exact change.
- **NEW ITEM LISTINGS ARE PAUSED while the Elevation cart/checkout P0 is active.** Preserve current sellable inventory; do not expand catalogs during checkout stabilization.
- No paid ads / boosts / PPC / sponsored marketplace traffic / prepaid retargeting until capital recovery is verified and Casey explicitly reopens paid acquisition.
- **No new-channel expansion campaign is foreground work while `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md` is active.** Meta, Google & YouTube, Amazon, Walmart and other not-yet-installed channels remain backlog/evidence only.
- Checkout/payment function repairs remain P0 when a real defect is proven; profitability scoring may not block a functional purchase path.
- Shopify Payments account/setup work is Shopify Store Operations + owner/platform configuration first; incomplete setup is not a DEV wake-up condition by itself.
- Preserve the accepted Shopify guest checkout and existing Elevation PayPal path while the main-site cart/checkout is hardened.
- Microsoft Copilot is an already-installed Shopify surface, but existing exposure does not create VEVOR marketplace/channel authorization; held VEVOR staging exposure remains gated for VEVOR/MPM classification.
- TikTok failed appeal is terminal under the current platform state; do not replay/resubmit it unless TikTok provides a genuinely new remedy or Casey explicitly reopens a new platform-supported path.
- No blind production deploy, wholesale `main` deploy, force update or stale-branch deployment.
- SOK out-of-stock/unavailable products may use the established pre-purchase/backorder rule where allowed.
- Hawaii lithium/warranty/logistics controls remain separate and may not be bypassed by generic channel actions.

## DEV disposition

**MASTER DEVELOPER: ACTIVE ONLY ON THE BOUNDED ELEVATION CART / SECURE CHECKOUT P0. STANDBY / VERIFY-FIX FOR ALL OTHER LANES.**

The qualifying defect packet is `MPM5_ELEVATION_CART_CHECKOUT_P0_REPAIR_2026-09-12.md`.

Outside that packet, DEV is not a standing destination for commerce, catalog or operations problems. The owning lane must first exhaust platform/configuration/operator repair.

A DEV handoff requires a bounded defect packet with:

1. exact URL/path/component;
2. exact SKU/order when applicable;
3. reproduction steps;
4. expected result;
5. actual result;
6. customer/revenue impact;
7. current owning lane;
8. confirmation that platform/configuration repair was attempted or ruled out.

MASTER RECON is likewise **triggered**, not continuous: source conflict, release gate, production-lineage ambiguity or management-state drift.

---

# FOREGROUND P0

| Work Item | Owner | Current State | Next Action | DEV Role | Close Condition |
|---|---|---|---|---|---|
| Elevation main-site cart + secure checkout + PayPal order integrity | **MPM5 → MASTER DEVELOPER; COM2 acceptance support** | **P0 ACTIVE — BOUNDED CODE DEFECT CONFIRMED**. Current `main` has single-item direct checkout, not a real cart. Checkout product review is too thin. PayPal capture can be attempted before proving a matching local order/state and does not sufficiently validate captured amount/currency against local intent before paid-state update. | Execute `MPM5_ELEVATION_CART_CHECKOUT_P0_REPAIR_2026-09-12.md`: real cart; canonical cart revalidation; rich item review + full-details return path; harden capture/idempotency/order reconciliation; verify authenticated PayPal production configuration; preview QA without live payment. | **ACTIVE — exact bounded repair only.** No catalog expansion, homepage-top change or unrelated redesign. | Cart passes mobile/desktop; checkout product review is complete; PayPal/order integrity tests pass; payment config verified or isolated owner gate; COM2/MPM acceptance passes; production smoke clean without live payment. |
| Owner communications / residual Google Voice forwarding | **MPM / Communications Recovery** | **P0 CRITICAL — ACCOUNT RECOVERED / VOICE DELETED / RESIDUAL FORWARDING REMAINS** | Carrier removes conditional + unconditional Voice forwarding; Google clears any stale Voice-side linked/device state; test direct inbound call + SMS. | None unless a separate company-owned web/contact defect is proven. | Direct carrier call PASS + direct SMS PASS + no residual Voice routing + Casey confirms normal business communications. |
| eBay customer/cash recovery + profitability contraction | **eBay Store Operations under Peter / Company Operations** | **P0 PARALLEL — CUSTOMER OBLIGATIONS + CASH RELEASE + LOSS PREVENTION** | Resolve open shipment/cancellation/refund obligations first; clear held-cash blockers; then maintain only exact-source positive-contribution listings. **No new listings while current-store checkout stabilization is active.** No Promoted Listings while ad lock is active. | None for Seller Hub/platform operations. | Customer obligations resolved; cash blockers isolated/cleared; repeat-loss configurations removed; profitable core is executable. |

---

# EXISTING SHOP TUNING / PARALLEL REVENUE — DO NOT WAIT FOR DEV

| Lane | Owner | State | Next |
|---|---|---|---|
| Shopify Online Store + payment readiness | Shopify Store Operations + Owner | **PRESERVE / VERIFY — ONLINE STORE PURCHASE QA PASS / PAYPAL PASS / 53 PUBLIC / 50 VEVOR STAGING HOLD / SHOPIFY PAYMENTS ACCOUNT COMPLETION OPEN** | Preserve the passing Online Store guest checkout and current public catalog. Complete/reverify Shopify Payments owner/platform setup when available. Keep 50 VEVOR staging products hidden. **No new listings.** | 
| Direct-site first profitable sale | MPM / Company Operations + Shopify/vendor lanes | **SUPERSEDED BY MAIN-SITE CART/CHECKOUT P0 UNTIL REPAIR CLOSES** | Do not manufacture an order. After P0 acceptance, first real order proves payment → durable order → source → fulfillment → realized contribution. |
| Shopify-installed surfaces — Shop / Microsoft Copilot / Agentic | Shopify Store Operations + owning vendor/MPM where channel permission is implicated | **TUNING / COPILOT VEVOR PERMISSION GATE OPEN / NO EXPANSION** | Shop remains configuration/eligibility hold. Microsoft Copilot currently exposes all 103 ACTIVE products, including held VEVOR staging records. Do not broaden publication. VEVOR/MPM must later classify Copilot channel authorization and allowed SKU set. |
| VEVOR | VEVOR Project Operations Manager / Specialist | ACTIVE EXISTING CATALOG — 19 A-tier live / 17 qualified B-tier ACTIVE / 3 promotion-cleared / 50-SKU Shopify staging cohort held / COPILOT PERMISSION DECISION OPEN | **Pause new item activation/listing.** Preserve current sellable set and 50-product staging hold. Current-store/channel/intake audit resumes after checkout P0. Real order still triggers exact source/cost/MAP/shipping recheck. |
| Renogy | Renogy Branch Operations Manager / Specialist | ACTIVE EXISTING CATALOG — 2 ACTIVE / 4 DRAFT | **Pause new activation/listing.** Preserve 2 ACTIVE / 4 DRAFT. Current vendor-channel/intake audit resumes after checkout P0. Real order still triggers exact dealer orderability/backorder/cost/shipping recheck. |
| Apparel / Fourthwall | Apparel Vendor Operations Manager | ACTIVE — EXISTING 29-PRODUCT FOURTHWALL TUNING | Existing-shop cleanup may continue without new products: payout setup → promo/markdown safety → copy cleanup → economics → hero set → exact TikTok sync only. New provider/store/product expansion remains hold/backlog. |
| TikTok Shop / Affiliate Growth | TikTok execution + TikTok Affiliate Growth Manager under Peter | **ACTIVE UNDER RESTRICTION / APPEAL TERMINAL-FAILED / TUNE CURRENT SHOP ONLY** | Do not replay appeal. Fix current OOS/account/catalog/economics issues only. **No new product listings or paid spend.** Preserve clean fulfillment/returns/support state and track held funds separately. |

---

# STRATEGIC / SUPPORT WORK — PRESERVED, NOT FOREGROUND

| Work Item | Owner | State / Rule |
|---|---|---|
| Post-stabilization vendor-shop + channel-catalog architecture | MPM / Ecommerce + Shopify Store Operations | **PLANNED / HOLD — OWNER DIRECTION CAPTURED.** After the current Elevation shop/cart/checkout and existing vendor/channel intake are clean, evaluate one Shopify commerce engine with a curated **Elevation Picks** flagship catalog, vendor-specific storefront experiences (VEVOR, Renogy, SOK, Kingboss as approved), and channel-specific catalog subsets feeding one checkout/order/fulfillment truth. Do not build before hold is explicitly released. |
| New-channel expansion — Meta / Google & YouTube / Amazon / Walmart / additional marketplaces | MPM / Ecommerce | **HOLD — CURRENT STORE FIRST.** Research may remain as backlog/evidence, but no installation/configuration campaign begins until current store/cart/checkout and existing shop/vendor-channel baselines are clean and MPM/Owner reopens expansion. |
| Existing vendor-channel + intake process audit | MPM / Company Operations + vendor managers | **QUEUED IMMEDIATELY AFTER CART/CHECKOUT P0** | Audit current SOK, VEVOR, Renogy, Kingboss and other active intake/channel paths: vendor identity → authorization → exact SKU → source → stock → MAP/floor → landed cost → shipping → warranty/returns → channel eligibility → publication → checkout → fulfillment → realized margin. No new listings during the audit. |
| SOK Supplier / Commerce / Warranty | SOK Project Operations Manager / SOK RECON OS | ACTIVE primary supplier. Lower-48 commerce continues. Hawaii warranty/logistics economics remain proving. No duplicate generic supplier qualification or catalog expansion during current listing pause. |
| Kingboss Stage-1 proving | Kingboss Project Operations Manager / Specialist | ACTIVE. Continue source/catalog/SKU/MAP/channel/warranty/compliance reconciliation that does not create new public listings. No speculative 100-unit commitment without owner approval. |
| Universal catalog vendor acceptance | Catalog + vendor managers | **PAUSED FOR NEW PUBLICATION / SOURCE MAINTENANCE ONLY.** Existing source truth may be maintained; do not publish new items until current-store hold is released. |
| Homepage-connected commerce / protected-top boundary | MPM | HOLD / DEFERRED. Protected top remains hard no-touch. No separate DEV worktree. |
| ElevationUpScales.com residual routing/content items | MPM | PRESERVED / VERIFY-ONLY outside the active cart/checkout packet. Do not create another independent developer worktree. |
| Universal store / normalized retail architecture residual | MPM | PRESERVED BACKLOG. Issue #65 is trigger/control evidence; the current cart/checkout packet is the bounded DEV wake condition. |
| Exact Renogy delayed-order checkout test | Commerce / QA | TEST-ONLY. If it exposes a defect, return bounded evidence to MPM; do not patch independently. |
| Shopify/SOK paid-order OS bridge | Company Operations / Commerce | VERIFY ON FIRST REAL ORDER after checkout repair. Do not manufacture an order. |
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
| New item listings / catalog expansion | **HOLD — CURRENT ELEVATION STORE/CHECKOUT FIRST** | Main-site cart/checkout P0 closes, then MPM/Casey releases listing work after current vendor-channel/intake audit sequencing is confirmed. |
| Vendor storefront + channel-catalog architecture | **PLANNED HOLD** | Current Elevation cart/checkout closes and current vendor-channel/intake audit establishes clean product/source/channel truth; then MPM/Casey authorizes build phase. |
| New-channel expansion | **HOLD — CURRENT STORE FIRST** | Existing current shops reach clean product/publication/purchase/fulfillment/profitability baselines and MPM/Casey explicitly reopens expansion. |
| Paid advertising / prepaid media | **HOLD — OWNER CAPITAL-RECOVERY RULE** | Verified capital-recovery hole reaches zero **and** Casey explicitly reopens paid acquisition. |
| SOK Hawaii permanent warranty economics / reserve/service compensation | HOLD — OWNER GATE | Provider quotes + excluded-cost reconciliation + proof actuals + owner approval. |
| SOK compliance reference PR #70 | HOLD | Fresh reconciliation/rebase if still useful; do not auto-merge stale lineage. |
| Peter public profile / portrait | HOLD | Reactivate only when communications/publication lane becomes current. |

---

# CLOSED / DO NOT RECREATE

- Protected top homepage approved experience — closed/no-touch absent exact owner authorization or genuine defect.
- Custom Elevation PayPal **origin/quote blocker** — closed; server-side canonical quote/order creation path exists. **Do not confuse this with the active PayPal capture-integrity/cart P0.**
- Shopify storefront password gate — closed.
- Shopify 50-product hidden cohort generic-publication blocker — closed as **VEVOR intentional staging hold / do not bulk publish**.
- Representative Shopify Online Store guest checkout defect assumption — closed by `SHOPIFY_EXISTING_SURFACE_QA_RETURN_2026-09-12.md`; preserve working paths.
- TikTok seller-verification/high-risk-shop appeal — **FAILED / CANNOT APPEAL AGAIN**; do not recreate or resubmit from stale `SUBMITTED / WAITING` pointers. Operate cleanly under restriction and use only automatic re-evaluation or a genuinely new authentic TikTok remedy.
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
6. **Current-store checkout stabilization outranks new product publication.**
7. An ACTIVE Shopify product is not automatically publicly purchasable; publication/channel state must be verified against intended staging/release controls.
8. Shopify checkout UI visibility does not prove Shopify Payments account onboarding/payout/compliance readiness while account completion remains open.
9. Existing Microsoft Copilot exposure does not establish third-party VEVOR channel authorization; route held-cohort permission to the owning VEVOR/MPM lane.
10. A TikTok appeal marked failed/cannot appeal again defeats older submitted/waiting pointers; do not replay it.
11. An auto-enrolled affiliate product is not automatically profit-approved.
12. A DEV request without a bounded reproducible defect packet is rejected back to the owning operator lane.
13. MASTER RECON is called only for conflict/gate/integrity work, not as a duplicate executor.
14. MPM closes or downgrades stale recovery rows as evidence matures instead of keeping every historical P0 active forever.
15. **Do not create new-channel work or new item listings while the current-store hold is active.**
16. COM2 provides live acceptance/current-state evidence for this checkout P0; it must not create a duplicate checkout implementation while DEV owns the code repair.

## Last-resort fallback

A replacement payment architecture remains **DEFERRED / FALLBACK ONLY**. The current Elevation PayPal path is to be hardened, not casually replaced. Any future replacement must preserve sales continuity, use hosted/tokenized payment components, never store raw card/CVV, and prove payment confirmation → durable order → source/fulfillment → refund/exception/security acceptance before cutover.
