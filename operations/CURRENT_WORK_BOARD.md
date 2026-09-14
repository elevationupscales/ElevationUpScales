# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-14  
**Owner:** Casey Young  
**State Owner:** **MPM 7 — Company Oversight**  
**MPM 7 control:** `MPM7_COMPANY_OVERSIGHT_TAKEOVER_2026-09-14.md`  
**Web V2 development Worktree:** `WEB_V2_CURRENT_WORKTREE.md`  
**eBay incident correction:** `COM2_EBAY_FALSE_COMPLETION_CORRECTION_2026-09-14.md`  
**Shopify operations Worktree:** `SHOPIFY_STORE_OPERATIONS_CURRENT_WORKTREE.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CONTINUE**

MPM 7 is the active company-oversight instance. MPM 6 and earlier MPM iterations are historical/reference and must not issue competing live control.

Waiting on an authenticated, external, or owner gate in one lane does not stop executable clean work in another lane.

---

# CURRENT COMPANY POSTURE

**Aggregate state: OPERATIONAL.**

Do not describe the company as offline because one communications, seller-proof, storefront-proof, SKU-specific, or Web V2 release gate is open.

Current management posture:

**P0 PROTECT COMMUNICATIONS + CLOSE LIVE EBAY CUSTOMER/SELLER RISK → P1 FINALIZE WEB V2 VENDOR-CATALOG RELEASE PATH + SHOPIFY EVIDENCE → VENDOR CATALOG READINESS / PROFITABILITY → P2 SCALE.**

---

# TODAY'S CONTROLLED WORKFLOW — 2026-09-14

Today is a **finish-and-verify day**, not a website architecture restart.

1. **P0 — eBay:** authenticated Seller Hub verification for remaining live customer/seller risk, including order `20-15123-05140` and the corrected seller-row/listing state. Order `10-15134-90489` is customer-refund closed; do not reopen that refund as unfinished work.
2. **P0 — owner communications:** verify direct inbound call, SMS and voicemail after the Google Voice/carrier correction. No closure without live proof.
3. **P1 — Web V2:** advance the already rebuilt vendor-catalog storefront from accepted source truth to a fresh immutable release candidate. Do not restart visual architecture and do not patch Legacy Marketplace/Create Listing routes in isolation.
4. **P1 — Web V2 final review/cutover preparation:** run exact candidate QA, verify catalog routes/media/data truth, then route the exact candidate to owner review. Production promotion remains separately gated.
5. **P1 — Shopify:** close `/pages/part-request` exact active-theme/version/public-visibility proof while preserving green payment state.
6. **P1 — vendor catalog readiness:** advance verified catalog inputs only — Renogy next-five controlled evidence; VEVOR corrected PRO economics/tax truth; Doba destination/economics checks; SunGoldPower and Phocos owner-ready application preparation.
7. **P1 — profitability/cross-channel verification:** continue after the customer/release gates above are moving or externally blocked.

**Marketplace / Create-a-Listing transition rule:** the current Legacy redirects are not a standalone repair target. The website is being replaced by Web V2 specifically to house and merchandise vendor catalogs more cleanly. Final route ownership belongs to Web V2 release finalization.

---

# CURRENT COMPANY PRIORITIES

| Priority | Work Item | Owner | Current State | Next Action |
|---|---|---|---|---|
| **P0** | Owner communications / residual Google Voice forwarding | MPM 7 / Communications Recovery | **OPEN — AUTHENTICATED LIVE VERIFICATION REQUIRED** | Verify direct inbound call, SMS and voicemail after carrier/Google correction. Do not blind-loop retries or claim closure without live proof. |
| **P0** | eBay live customer + seller-state verification | eBay Store Operations under Peter / Company Operations | **OPEN — AUTHENTICATED VERIFICATION ONLY** | Verify order `20-15123-05140` in Seller Hub for shipment/tracking vs recovery action, then verify seller identity + live listing/price state. No repeat price/quantity/end mutation unless a live mismatch is proven. |
| **P1** | Web V2 vendor-catalog storefront finalization / release path | Web V2 specialist lane under MPM 7 | **REBUILT / OWNER-ACCEPTED VISUAL-CATALOG BASELINE / FRESH FINAL CANDIDATE REQUIRED** | Preserve PR #194 (`b5e37244ca98d3fcd306424da4557d5e9c4a6675`) as accepted visual/catalog closeout. Workflow run #8 successfully created an immutable candidate from older SHA `4bc2d0874db74133be3a76aee8d6db33504b6bfa`; because PR #194 landed afterward, do not promote that candidate. Re-resolve current main, create a fresh immutable candidate through `web-v2-release.yml`, run release QA, verify catalog routes/media/data truth, then obtain owner acceptance before production promotion. |
| **P1** | Shopify `/pages/part-request` active-theme/version/visibility proof | Shopify Store Operations under Peter | **ROUTE PASSED / VERSION-VISIBILITY PROOF PENDING** | Verify exact active-theme/version/public visibility; close only from direct proof. Preserve green payment state. |
| **P1** | Vendor catalog readiness / commerce truth | Vendor Projects + Shopify Store Operations + Web V2 | **ACTIVE / CONTROLLED** | Feed Web V2 and current commerce surfaces only verified vendor truth. Renogy next-five remain individually gated; VEVOR economics must use current PRO terms; Doba route/destination economics must be verified per affected order/SKU; prepare SunGoldPower and Phocos applications for owner review without inventing attestations. |
| **P1** | Shopify conversion / trust / profitability | Shopify Store Operations + Shipping & Logistics + Vendor Projects | **ACTIVE** | Improve product/media/shipping/policy/buy-box truth without guessing supplier or legal/commercial facts. Coordinate catalog truth with Web V2 rather than duplicating storefront architecture work. |
| **P1** | Renogy Shopify controlled launch | Renogy Project + Shopify Store Operations | **1 LIVE / NEXT FIVE CONTROLLED DRAFTS** | Preserve accepted 10W maintainer at $39.99. Advance next-five drafts only after exact media, price, stock/orderability, shipping and warranty truth clears per SKU. |
| **P1** | Existing-channel profitability + price source-of-truth | Company Operations + channel workers + Vendor Projects | **ACTIVE** | Improve existing channels before expansion; protect contribution margin; no broad paid acquisition. |
| **P1** | GitHub branch protection | Owner/admin-capable GitHub surface | **OWNER / ADMIN ACTION REQUIRED** | Enable protection when an authorized admin-capable surface is available. Current connector read confirms `main` is not protected; do not misreport unsupported admin access as completion. |
| **P1** | Cross-channel live verification | Company Operations + owning channel workers | **ACTIVE / BOUNDED** | Verify only materially open live states; no duplicate audits of already accepted work. |
| **P2** | Dormant / lower-priority streams | Owning managers | **HOLD / PARALLEL ONLY WHEN NON-CONFLICTING** | Resume only when higher-priority revenue/customer work is clean or the lane can move independently without distraction. |

---

# WEB V2 — VERIFIED DEVELOPMENT / RELEASE STATE

## Accepted rebuild

PR #194 merged the owner-accepted Web V2 visual/catalog closeout at `b5e37244ca98d3fcd306424da4557d5e9c4a6675`.

The merge restored the accepted homepage presentation, localized approved SOK/hero/freight/RV/brand media, held unverifiable remote product media in place, retained the catalog presentation, preserved commerce/release safety, and passed Web V2 plus canonical PR QA including a 390px technical check.

**The rebuild itself is accepted. Do not restart visual architecture without a fresh defect or owner direction. The remaining website work is release finalization, catalog truth, route verification and cutover preparation.**

Passing the 390px technical QA does not reopen mobile as a separate owner design/rebuild scope.

## Immutable candidate status

Web V2 Production-Parity Release workflow run #8 completed the **candidate** job successfully for SHA `4bc2d0874db74133be3a76aee8d6db33504b6bfa`:

- immutable-candidate request validated;
- exact-current-main check passed for that run;
- release QA passed;
- exact candidate uploaded **without deployment**;
- Cloudflare version-to-SHA mapping verified;
- candidate receipt/summary completed;
- `promote`, `production-smoke`, `rollback`, and `bootstrap-smoke` jobs were skipped.

PR #194 merged afterward. Therefore the run-#8 candidate is now **SUPERSEDED / DO NOT PROMOTE**. The next release action is a fresh candidate from current accepted V2 truth, not production promotion of the older candidate.

The Web V2 specialist worktree remains authoritative for detailed phase sequencing, but newer merged receipts and this Board defeat stale pointers that would route DEV backward to already accepted visual work.

---

# CURRENT RECON DELTAS

## eBay

`COM2_EBAY_FALSE_COMPLETION_CORRECTION_2026-09-14.md` still controls the broad listing incident: authenticated seller-side verification is required before any repeat mutation.

Order `10-15134-90489` is customer-refund **CLOSED** from eBay confirmation: $49.98 refunded and order total $0.00. This does not close the broader listing-control incident.

Order `20-15123-05140` remains an authenticated Seller Hub verification target because the latest reconciled evidence showed it overdue for shipment and no later tracking/cancellation/refund proof was found in the email recon.

## Vendor / catalog truth

- **VEVOR:** no extra 3% discount remains; current calculations must use the verified PRO discount structure. Vendor states a 7% tax fee applies without resale certification. Do not carry stale economics into pricing or Web V2 catalog truth.
- **Doba:** SKU `D01027H21KW` has destination eligibility restrictions; verify customer destination and current economics before fulfillment.
- **SunGoldPower:** dealer relationship is receptive and an installer/dealer application is available. Management may prefill known facts; owner reviews/signs attestations and any license/tax claims.
- **Phocos:** New Client Application received. Management may prepare it and an initial product-family shortlist, but sensitive/company-attestation fields remain owner-verified facts and must not be invented.
- **Renogy:** the 10W maintainer remains accepted live at **$39.99**; the next five remain controlled drafts with individual media/price/stock/shipping/warranty gates.

---

# CHANNEL / OPERATIONS STATE

| Lane | Owner | State |
|---|---|---|
| Shopify | Shopify Store Operations / Peter / Company Ops | **ACTIVE — PAYMENT GREEN / EVIDENCE + CONVERSION + PROFITABILITY TUNING** |
| eBay | eBay Store Operations / Peter / Company Ops | **P0 OPEN — CUSTOMER + SELLER AUTHENTICATED VERIFICATION** |
| Web V2 | Web V2 specialist lane under MPM 7 | **ACTIVE — REBUILT + ACCEPTED VISUAL/CATALOG BASELINE; FRESH IMMUTABLE CANDIDATE + FINAL CUTOVER GATES REMAIN** |
| TikTok | TikTok execution under Peter | **ACTIVE UNDER RESTRICTION — NO APPEAL REPLAY / NO UNAUTHORIZED PAID SPEND; COUNSEL PRICING OUTREACH WAITING** |
| Fourthwall / Apparel | Apparel operations under Peter | **ACTIVE SEPARATE CHANNEL** |
| SOK | SOK Project Operations Manager / SOK RECON OS | **ACTIVE PRIMARY SUPPLIER** |
| VEVOR | VEVOR Project Operations Manager / Specialist | **ACTIVE SUPPLIER / CONTROLLED PUBLICATION / CURRENT PRO ECONOMICS REQUIRED** |
| Renogy | Renogy Branch Operations Manager / Specialist | **ACTIVE — 1 SHOPIFY SKU LIVE / NEXT FIVE CONTROLLED** |
| Kingboss | Kingboss Project Operations Manager / Specialist | **ACTIVE STAGE-1 PROVING** |
| SunGoldPower | Vendor intake under Company Operations / Peter | **APPLICATION RECEIVED — OWNER-READY PREP AUTHORIZED** |
| Phocos | Vendor intake under Company Operations / Peter | **APPLICATION RECEIVED — OWNER-READY PREP + SKU SHORTLIST REQUIRED** |
| Shipping & Logistics | Company Operations / Shipping & Logistics Partner Worker | **ACTIVE — ROUTE TRUTH AUTHORITY** |

---

# HARD HOLDS / REPLAY GUARDS

- External/new-channel expansion — **HOLD; current channels first** unless Casey explicitly changes direction. Existing vendor-catalog integration into Web V2 is not new-channel expansion.
- Paid advertising / prepaid media — **HOLD until Casey explicitly reopens**.
- Broad Ops V2/admin/dashboard rebuild — **HOLD behind revenue path**.
- Legacy homepage mutation — **NO TOUCH absent an exact fresh defect authorization**.
- Current Legacy Marketplace / Create-a-Listing redirects — **TRANSITIONAL; DO NOT PATCH IN ISOLATION WHILE WEB V2 FINAL ROUTE OWNERSHIP IS BEING COMPLETED**.
- `production-deploy` remains **LEGACY ONLY** until separately accepted Web V2 cutover control says otherwise.
- Web V2 candidate `4bc2d0874db74133be3a76aee8d6db33504b6bfa` — **SUCCESSFUL HISTORICAL CANDIDATE / SUPERSEDED BY PR #194 / DO NOT PROMOTE**.
- `repair/live-site-audit-20260912` / `5fc55c806c1d7e138a9819a234e85ec932a056cb` — **ABANDONED / DO NOT DEPLOY / DO NOT MERGE**.
- workflow `34728792703` — **FAILED / DO NOT REPLAY AS RELEASE PATH**.
- stale candidate `84af23ec814baa73718e33ec052044ce4706534d` — **RETIRED / DO NOT DEPLOY**.
- Shopify Payments incomplete/setup blocker — **CLOSED / STALE** unless fresh live evidence proves otherwise.
- Do not repeat the corrected eBay mutation without authenticated mismatch proof.
- Do not publish all Renogy drafts because one SKU launched successfully.
- Do not infer supplier, shipping, tax, lithium, warranty, MAP, policy or landed-cost truth.
- Preserve any work item explicitly time-gated **not before 2026-09-21** unless Casey changes that gate.

---

# UPDATE DISCIPLINE

1. The closest active Worktree owns specialist phase sequencing.
2. Global Board/Registry follow newer accepted worktree/Git receipts; they do not route workers backward when stale.
3. Company priority remains P0 continuity/loss prevention → P1 Web V2/vendor-catalog completion + conversion/profitability/truth → P2 scale → P3 internal enhancement.
4. One bounded task = one primary execution owner.
5. Hold only the affected SKU/order/route when truth is missing.
6. Vendor Projects own supplier truth; storefront workers do not infer it.
7. Live execution is complete only when the required action-capable surface provides the required proof.
8. A Git decision/receipt is not a substitute for a live marketplace or communications verification when live proof is the actual gate.
9. A successful Web V2 candidate upload is not production deployment. Exact accepted source → fresh immutable candidate → QA → owner acceptance → promotion remains the cutover sequence.
10. MPM 7 owns company oversight; MPM 6 and earlier instances are historical/reference.
11. MASTER RECON remains triggered integrity support, not a standing duplicate manager.
12. **HOLD ONLY THE BLOCKED ITEM → KEEP THE COMPANY MOVING.**

## Current next-unblocked route

Voice and eBay remain P0 but are authenticated-evidence gated. Unless newer Git truth supersedes this board, MPM 7 routes the next unblocked internal work to:

**WEB V2 FRESH IMMUTABLE CANDIDATE + VENDOR-CATALOG ROUTE/TRUTH VERIFICATION → SHOPIFY `/pages/part-request` VERSION/VISIBILITY PROOF → VENDOR CATALOG READINESS (RENOGY / VEVOR / DOBA / SUNGOLDPOWER / PHOCOS) → PROFITABILITY / CHANNEL VERIFICATION.**
