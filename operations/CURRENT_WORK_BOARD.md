# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Current incident control:** `MPM5_OWNER_ROLLBACK_LIVE_SITE_AUDIT_INCIDENT_2026-09-12.md`  
**Current coding Worktree:** `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`  
**Commerce tuning control:** `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

Management loop:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Website inspection rule after the owner rollback:

**SCAN / AUDIT / INSPECT = READ-ONLY → EVIDENCE → REPORT → STOP.**

Website mutation requires a separate, clearly authorized repair action.

---

# CURRENT WEBSITE / DEV STATE

| Work Item | Owner | Current State | Next Action |
|---|---|---|---|
| Elevation direct-site checkout / PayPal P0 | MASTER DEV under MPM | **CLOSED / PRODUCTION ACCEPTED** at `894b15cb12bf75a6a8e81b916e2a9bc2de858f88` | VERIFY-FIX ONLY if a fresh reproducible defect is proven and repair is authorized. Do not reopen from stale audit evidence. |
| Aborted live-site audit round | MPM / MASTER DEV | **OWNER ROLLED BACK / QUARANTINED** — `repair/live-site-audit-20260912` at `5fc55c806c1d7e138a9819a234e85ec932a056cb` | **DO NOT DEPLOY / DO NOT MERGE / DO NOT RERUN QA.** Retain as incident evidence only. |
| MASTER DEVELOPER | MPM | **STANDBY / VERIFY-FIX ONLY** | Wake only for one fresh bounded defect with mutation clearly authorized. |
| MASTER RECON OS | MPM | **STANDBY / TRIGGERED INTEGRITY** | Use only for state/lineage conflicts, owner-directed RECON, or exact-candidate validation after a future authorized repair. |

The abandoned audit branch is five commits ahead of the accepted production parent and touched checkout code, package/test wiring, a new test and a new audit-specific workflow. Its workflow run `34728792703` failed canonical QA. None of that branch reached production.

---

# FOREGROUND OPERATIONS

| Work Item | Owner | Current State | Next Action |
|---|---|---|---|
| Owner communications / residual Google Voice forwarding | MPM / Communications Recovery | **P0 CRITICAL — ACCOUNT RECOVERED / VOICE DELETED / RESIDUAL FORWARDING REMAINS** | Carrier/Google clear residual forwarding/state; verify direct inbound call + SMS. |
| eBay customer/cash recovery + profitability contraction | eBay Store Operations under Peter / Company Operations | **P0 PARALLEL — CUSTOMER OBLIGATIONS + CASH RELEASE + LOSS PREVENTION** | Resolve shipment/cancellation/refund obligations and held-cash blockers; preserve only source-safe positive-contribution core. |
| Existing-shop tuning | MPM / Company Operations / owning channel workers | **ACTIVE — TUNE BEFORE EXPANDING** | Fix current product truth, publication, purchase, fulfillment and realized-margin issues before adding reach. |
| Vendor-channel + intake audit | MPM / Company Operations + vendor managers | **ACTIVE / CONTROLLED** | Vendor identity → authorization → exact SKU → source → stock → MAP/floor → landed cost → shipping → warranty/returns → channel eligibility → publication → checkout → fulfillment → realized margin. |

---

# EXISTING SHOP / CHANNEL STATE — PRESERVE, DO NOT EXPAND

| Lane | Owner | Current State | Next |
|---|---|---|---|
| Shopify Online Store | Shopify Store Operations + Owner | **PRESERVE — SHOPIFY PAYMENTS ACCEPTING PAYMENTS / RECEIVING PAYOUTS / 53 PUBLIC / 50 VEVOR STAGING HOLD** | Preserve working Shopify checkout/payment configuration. Keep intentional staging hidden. No cross-lane payment experiments. |
| Elevation direct site | MPM / MASTER DEV | **PRODUCTION ACCEPTED / VERIFY-ONLY** | No active code repair. Fresh scans are read-only unless repair is separately authorized. |
| VEVOR | VEVOR Project Operations Manager / Specialist | **ACTIVE EXISTING CATALOG / PUBLICATION HOLD** | Preserve current sellable set and staging hold; real order triggers exact source/cost/MAP/shipping recheck. |
| Renogy | Renogy Branch Operations Manager / Specialist | **ACTIVE EXISTING CATALOG / PUBLICATION HOLD — 2 ACTIVE / 4 DRAFT** | Preserve current state; real order triggers exact dealer/orderability/backorder/cost/shipping recheck. |
| SOK | SOK Project Operations Manager / SOK RECON OS | **ACTIVE PRIMARY SUPPLIER** | Lower-48 controlled commerce + Hawaii warranty/logistics proving continue; do not restart generic qualification. |
| Kingboss | Kingboss Project Operations Manager / Specialist | **ACTIVE STAGE-1 PROVING** | Continue source/catalog/SKU/MAP/channel/warranty/compliance reconciliation; no speculative commitment. |
| Apparel / Fourthwall | Apparel Vendor Operations Manager | **ACTIVE — EXISTING 29-PRODUCT FOURTHWALL TUNING** | Payout/promo/copy/economics cleanup; preserve native fulfillment. |
| TikTok Shop / Affiliate Growth | TikTok execution + TikTok Affiliate Growth Manager under Peter | **ACTIVE UNDER RESTRICTION / APPEAL TERMINAL-FAILED** | No appeal replay. Fix current OOS/account/catalog/economics only; preserve clean fulfillment/support. |

---

# OWNER / HARD HOLDS

| Work Item | State | Reopen Gate |
|---|---|---|
| New item listings / catalog expansion | **HOLD** | Casey/MPM explicitly releases after current store/vendor-channel truth is clean. |
| Vendor storefront + channel-catalog architecture | **PLANNED HOLD** | Existing-shop and vendor-channel intake baselines must be clean first. |
| New-channel expansion — Meta / Google & YouTube / Amazon / Walmart / additional marketplaces | **HOLD — CURRENT STORE FIRST** | Existing shops reach clean product/publication/purchase/fulfillment/profitability baselines and Casey/MPM explicitly reopen expansion. |
| Paid advertising / prepaid media | **HOLD — OWNER CAPITAL-RECOVERY RULE** | Verified capital-recovery hole reaches zero **and** Casey explicitly reopens paid acquisition. |
| Protected homepage top | **NO TOUCH** | Exact owner authorization or a fresh, reproducible genuine defect. |

---

# WAITING / PRESERVED

- SolarStock USA quote / direct-job-site qualification — waiting on supplier response.
- Logistics Plus Hawaii storage / fulfillment qualification — waiting on provider terms.
- R&R Solar Hawaii proof-support relationship — waiting on partner response.
- H2O Logistics Hawaii / Pasha backup route — existing source/access blocker remains.
- Warranty Fulfillment shared service — continue through real supplier cases; must not block commerce.
- Lithium Buyer Network prospecting — P3 parallel; must not displace P0/P1 and does not authorize paid acquisition.
- Internal `sales@` tracking reliability — P3 end-of-flow.

---

# CLOSED / DO NOT RECREATE

- Direct-site checkout / PayPal bounded repair — **CLOSED / PRODUCTION ACCEPTED** at `894b15cb12bf75a6a8e81b916e2a9bc2de858f88`.
- Aborted audit repair branch `repair/live-site-audit-20260912` / `5fc55c806c1d7e138a9819a234e85ec932a056cb` — **OWNER ROLLED BACK / DO NOT DEPLOY / DO NOT MERGE**.
- Audit workflow run `34728792703` — **FAILED / DO NOT RERUN AS RELEASE PATH**.
- Owner-created stale candidate `84af23ec814baa73718e33ec052044ce4706534d` — **RETIRED / DO NOT DEPLOY**.
- Shopify Payments onboarding `Complete setup` blocker — closed/stale; authenticated state is Accepting payments / Receiving payouts.
- Shopify 50-product generic-publication blocker — closed as VEVOR intentional staging hold / do not bulk publish.
- TikTok high-risk-shop appeal — failed / cannot appeal again; do not replay.
- VEVOR PRO registration/feed/tax-exemption/A-tier/current qualified B-tier onboarding — completed; do not restart.
- Renogy dealer onboarding/W-9/portal setup — completed; do not restart.
- SOK generic supplier qualification/media/Hawaii warranty-input intake — completed; do not duplicate.

## Update discipline

1. Newer owner/MPM/owning-lane state supersedes stale board text.
2. `SCAN`, `AUDIT`, `INSPECT`, `CHECK`, and `REVIEW` are read-only by default.
3. A scan finding does not itself authorize a repair branch or code mutation.
4. Do not create a new QA/deployment workflow for a one-off defect unless Casey explicitly authorizes a permanent new control.
5. Closed production work remains closed until a fresh reproducible defect exists and repair execution is authorized.
6. Block only the exact blocked item; unrelated executable work continues.
7. Shopify remains its own commerce/payment lane.
8. New listings, channel expansion and paid acquisition remain separate management controls.
9. Only a fresh authorized repair may wake MASTER DEV from standby.
10. One repair = one bounded candidate using existing QA wherever possible.

## Current control phrase

**OWNER ROLLBACK ACCEPTED → PRODUCTION PRESERVED → DEV STANDBY → SCAN READ-ONLY → REPORT FIRST → ONE BOUNDED REPAIR ONLY WHEN AUTHORIZED.**
