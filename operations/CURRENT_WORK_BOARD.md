# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Current incident control:** `MPM5_OWNER_ROLLBACK_LIVE_SITE_AUDIT_INCIDENT_2026-09-12.md` — Legacy production repair only  
**Legacy coding stabilization Worktree:** `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`  
**Web V2 development Worktree:** `WEB_V2_CURRENT_WORKTREE.md`  
**Commerce tuning control:** `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

Management loop:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Website inspection rule:

**SCAN / AUDIT / INSPECT / CHECK = READ-ONLY → EVIDENCE → REPORT → STOP.**

A website mutation requires a separately authorized build/repair/deploy action. Web V2 and Legacy production are separate development/runtime lanes and may not be collapsed for convenience.

---

# CURRENT WEBSITE / DEV STATE

| Work Item | Owner | Current State | Next Action |
|---|---|---|---|
| **Web V2 Development** | OS 1.1 Project Manager / MPM → one primary specialist worker | **ACTIVE / PERMANENT LANE — STEP 4 MERGED.** Accepted Step 4 application baseline = `04ef81368732d95c81e8f439f14524df385a9f1e`. Release foundation, visual SOP and first application shell are merged. Current `main` must be re-resolved before each new task because later control-only commits may advance it without changing the accepted application baseline. | **NEXT / OWNER-GATED:** exact-version Cloudflare candidate. Re-resolve `main`, use Release Engineer as the primary worker, preserve exact-version identity, and stop before promotion unless separately authorized. |
| Web V2 — WEB DEVELOPER | Web V2 Development | **STANDBY — STEP 4 COMPLETE / MERGED** | No new UI/application branch until a new bounded build packet is authorized. |
| Web V2 — RELEASE ENGINEER | Web V2 Development | **QUEUED / NEXT OWNER-GATED ACTION** | Cloudflare exact-version candidate is next. No Cloudflare mutation or production promotion from this management-sync task. |
| Web V2 — COMMERCE DEVELOPER | Web V2 Development | **STANDBY / WAIT** | Commerce V2 integration remains waiting; do not jump forward. |
| Legacy direct-site checkout / PayPal P0 | MASTER DEV under MPM | **CLOSED / PRODUCTION ACCEPTED** at `894b15cb12bf75a6a8e81b916e2a9bc2de858f88` | VERIFY-FIX ONLY if a fresh reproducible Legacy defect is proven and repair is authorized. Do not reopen from stale audit evidence. |
| Aborted Legacy live-site audit round | MPM / MASTER DEV | **OWNER ROLLED BACK / QUARANTINED** — `repair/live-site-audit-20260912` at `5fc55c806c1d7e138a9819a234e85ec932a056cb` | **DO NOT DEPLOY / DO NOT MERGE / DO NOT RERUN QA.** Retain as incident evidence only. |
| MASTER DEVELOPER | MPM | **STANDBY / LEGACY VERIFY-FIX ONLY** | Legacy production repair only. Do not route Web V2 development through this stale Legacy repair lane. |
| MASTER RECON OS | MPM | **STANDBY / TRIGGERED INTEGRITY** | Use only for state/lineage conflicts, owner-directed RECON, or exact-candidate validation when routed. |

Web V2 control relationship:

**CASEY → OS 1.1 PROJECT MANAGER / MPM → WEB V2 DEVELOPMENT**

Web V2 development loop:

**VERIFY CURRENT MAIN → ONE BOUNDED TASK → ONE PRIMARY WORKER → BRANCH → QA → REVIEW → MERGE → UPDATE WORKTREE → NEXT.**

Web V2 release invariant:

**ONE GIT SHA → ONE CLOUDFLARE VERSION ID → ONE TESTED VERSIONED PREVIEW → THAT SAME VERSION ID IN PRODUCTION.**

`production-deploy` remains **LEGACY ONLY** and does not represent Web V2 runtime state.

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
| Elevation direct site — Legacy runtime | MPM / MASTER DEV | **PRODUCTION ACCEPTED / VERIFY-ONLY** | Preserve Legacy Safe Prod while Web V2 is built beside it. Fresh scans are read-only unless Legacy repair is separately authorized. |
| Web V2 | OS 1.1 Project Manager / Web V2 Development | **ACTIVE DEVELOPMENT / NOT PRODUCTION** | Continue only through `WEB_V2_CURRENT_WORKTREE.md`. Next is exact-version candidate after explicit Cloudflare gate; no Legacy route/domain replacement yet. |
| VEVOR | VEVOR Project Operations Manager / Specialist | **ACTIVE EXISTING CATALOG / PUBLICATION HOLD** | Preserve current sellable set and staging hold; real order triggers exact source/cost/MAP/shipping recheck. |
| Renogy | Renogy Branch Operations Manager / Specialist | **ACTIVE EXISTING CATALOG / PUBLICATION HOLD — 2 ACTIVE / 4 DRAFT** | Preserve current state; real order triggers exact dealer/orderability/backorder/cost/shipping recheck. |
| SOK | SOK Project Operations Manager / SOK RECON OS | **ACTIVE PRIMARY SUPPLIER** | Lower-48 controlled commerce + Hawaii warranty/logistics proving continue; do not restart generic qualification. |
| Kingboss | Kingboss Project Operations Manager / Specialist | **ACTIVE STAGE-1 PROVING** | Continue source/catalog/SKU/MAP/channel/warranty/compliance reconciliation; no speculative commitment. |
| Apparel / Fourthwall | Apparel Vendor Operations Manager | **ACTIVE — EXISTING 29-PRODUCT FOURTHWALL TUNING** | Payout/promo/copy/economics cleanup; preserve native fulfillment. |
| TikTok Shop / Affiliate Growth | TikTok execution + TikTok Affiliate Growth Manager under Peter | **ACTIVE UNDER RESTRICTION / APPEAL TERMINAL-FAILED** | No appeal replay. Fix current OOS/account/catalog/economics only; preserve clean fulfillment/support. |

---

# WEB V2 CURRENT SEQUENCE

| Milestone | State | Routing |
|---|---|---|
| Release foundation | **COMPLETE / MERGED** | Preserve exact-version release machinery. |
| Visual/customer-experience SOP | **COMPLETE / MERGED** | `WEB_V2_VISUAL_SYSTEM_SOP_V1_0.md` controls substantial visual work. |
| Step 4 application shell | **COMPLETE / MERGED** | Accepted application baseline = `04ef81368732d95c81e8f439f14524df385a9f1e`; future work re-resolves current `main`. |
| Cloudflare exact-version candidate | **NEXT / OWNER-GATED** | Release Engineer primary. No rebuild after candidate acceptance; no promotion without explicit owner authorization. |
| Commerce V2 integration | **WAIT** | Commerce Developer standby. |
| Ops V2 | **WAIT** | Do not start yet. |
| Legacy retirement | **NOT AUTHORIZED** | Legacy production remains protected. |

---

# OWNER / HARD HOLDS

| Work Item | State | Reopen Gate |
|---|---|---|
| New item listings / catalog expansion | **HOLD** | Casey/MPM explicitly releases after current store/vendor-channel truth is clean. |
| Vendor storefront + channel-catalog architecture | **PLANNED HOLD** | Existing-shop and vendor-channel intake baselines must be clean first. |
| New-channel expansion — Meta / Google & YouTube / Amazon / Walmart / additional marketplaces | **HOLD — CURRENT STORE FIRST** | Existing shops reach clean product/publication/purchase/fulfillment/profitability baselines and Casey/MPM explicitly reopen expansion. |
| Paid advertising / prepaid media | **HOLD — OWNER CAPITAL-RECOVERY RULE** | Verified capital-recovery hole reaches zero **and** Casey explicitly reopens paid acquisition. |
| Protected Legacy homepage top | **NO TOUCH** | Exact owner authorization or a fresh, reproducible genuine defect. Web V2 visual work follows its separately approved visual SOP and lane Worktree. |

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
2. `SCAN`, `AUDIT`, `INSPECT`, and `CHECK` are read-only by default; evidence does not itself authorize mutation.
3. `DESIGN` is architecture/documentation only; `BUILD` is isolated implementation; `RUN` resumes the authorized Worktree; `DEPLOY` acts only on an approved candidate/version; `STOP` stops mutation.
4. Do not create a new QA/deployment workflow for a one-off Legacy defect unless Casey explicitly authorizes a permanent new control.
5. Closed Legacy production work remains closed until a fresh reproducible defect exists and repair execution is authorized.
6. Web V2 uses one current Worktree and one primary worker per bounded task; no duplicate branches for the same objective.
7. No Web V2 production deployment occurs from a development task unless explicitly authorized.
8. Web V2 never uses `production-deploy` as a runtime promotion pointer.
9. No secrets are committed to Git; no accepted candidate is rebuilt before promotion.
10. Block only the exact blocked item; unrelated executable work continues.
11. Shopify remains its own commerce/payment lane.
12. New listings, channel expansion and paid acquisition remain separate management controls.
13. Commerce integration must preserve **one surface = one checkout owner = one payment/order authority**.

## Current control phrase

**LEGACY PRODUCTION PRESERVED → WEB V2 ACTIVE / SEPARATE → ONE CURRENT WORKTREE → ONE PRIMARY WORKER → VERIFY → BUILD → QA → MERGE → VERSION → PREVIEW → PROMOTE → NEXT.**
