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

**P0 PROTECT COMMUNICATIONS + CLOSE LIVE EBAY CUSTOMER/SELLER RISK → P1 RESTORE + CUT OVER OWNER-APPROVED WEB V2 BASELINE → SECTION-SCOPED MEDIA REPAIR + SHOPIFY/VENDOR CATALOG TRUTH → PROFITABILITY → P2 SCALE.**

---

# TODAY'S CONTROLLED WORKFLOW — 2026-09-14

Today remains a **finish-and-verify day**, but Web V2 sequencing is corrected to the actual owner-approved baseline.

1. **P0 — eBay:** authenticated Seller Hub verification for remaining live customer/seller risk, including order `20-15123-05140` and the corrected seller-row/listing state. Order `10-15134-90489` is customer-refund closed; do not reopen that refund as unfinished work.
2. **P0 — owner communications:** verify direct inbound call, SMS and voicemail after the Google Voice/carrier correction. No closure without live proof.
3. **P1 — Web V2 baseline restoration:** current `main` remains the code base. Restore the customer-facing visual contract from owner-accepted SHA `e9cbaacc49443637e2241be7948ea93a3848557f` without resetting or discarding later safe catalog/cart/checkout/order/release work.
4. **P1 — Web V2 cutover:** after the bounded restoration merges and QA passes, create one exact immutable current-main candidate → verify visual equivalence/runtime identity → production-parity smoke → promote the same tested Version ID → live verify.
5. **P1 — Web V2 media completion after cutover:** images/icons are repaired **one section or tightly coupled image group at a time**. No more whole-site visual closeout/rebuild passes.
6. **P1 — Shopify:** close `/pages/part-request` exact active-theme/version/public-visibility proof while preserving green payment state.
7. **P1 — vendor catalog readiness:** advance verified catalog inputs only — Renogy next-five controlled evidence; VEVOR current PRO economics/tax truth; Doba destination/economics checks; SunGoldPower and Phocos owner-ready application preparation.
8. **P1 — profitability/cross-channel verification:** continue after the customer/release gates above are moving or externally blocked.

**Marketplace / Create-a-Listing transition rule:** the current Legacy redirects remain transitional. Do not patch them as isolated Legacy defects while Web V2 takes final storefront/vendor-catalog route ownership.

---

# CURRENT COMPANY PRIORITIES

| Priority | Work Item | Owner | Current State | Next Action |
|---|---|---|---|---|
| **P0** | Owner communications / residual Google Voice forwarding | MPM 7 / Communications Recovery | **OPEN — AUTHENTICATED LIVE VERIFICATION REQUIRED** | Verify direct inbound call, SMS and voicemail after carrier/Google correction. Do not blind-loop retries or claim closure without live proof. |
| **P0** | eBay live customer + seller-state verification | eBay Store Operations under Peter / Company Operations | **OPEN — AUTHENTICATED VERIFICATION ONLY** | Verify order `20-15123-05140` in Seller Hub for shipment/tracking vs recovery action, then verify seller identity + live listing/price state. No repeat price/quantity/end mutation unless a live mismatch is proven. |
| **P1** | Web V2 approved-baseline restoration + cutover | Web V2 specialist lane under MPM 7 | **OWNER-APPROVED VISUAL BASELINE IDENTIFIED / RESTORATION TO CURRENT MAIN REQUIRED** | `e9cbaacc49443637e2241be7948ea93a3848557f` is the latest owner-accepted visual baseline. Restore only that visual contract onto current main while preserving later safe nonvisual/catalog/commerce work. QA → merge → exact current-main candidate → verify → production-parity smoke → same-version promotion → live verify. |
| **P1** | Web V2 section-scoped image/icon completion | Web V2 specialist lane | **QUEUED AFTER BASELINE CUTOVER** | One section/image group per bounded branch/PR. Change only its assets/mappings/minimum render rules; preserve approved layout/copy/CTAs/navigation/section dimensions. Whole Worker versions may still be required technically, but visual/code scope stays section-bounded. |
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

## Owner-approved visual source

The authoritative `WEB_V2_CURRENT_WORKTREE.md` identifies:

- latest owner-accepted visual baseline: `e9cbaacc49443637e2241be7948ea93a3848557f`;
- prior accepted checkpoint: `cbb9e59707ee07dcb6c84d566156ff36d658924d`;
- later candidate `4bc2d0874db74133be3a76aee8d6db33504b6bfa` / Cloudflare `41bbca73-fb38-4f0f-87b3-a24b3f1801d0`: **OWNER VISUAL FAIL / HOLD / DO NOT PROMOTE**.

`e9cbaacc...` preserves the approved homepage copy, CTAs, routes, commerce behavior and production-matched sizing/positioning while fixing the bounded hero-image rendering defect. This is the presentation Casey approved before the later broad imaging/icon closeout work.

### Correction to prior board wording

PR #194 is **not** the owner visual authority. It is a later image-closeout attempt that explicitly tried to restore the `e9cbaacc...` owner-accepted presentation while localizing/repairing media. Safe media improvements from PR #194 may be retained, but only inside the exact accepted slots and without changing composition or identity.

The earlier immutable candidate `6dff0a7e...` / Cloudflare `e60f4bd0-285b-4b08-9b55-1db013be383e` also predates the controlling `e9cbaacc...` baseline and is **not** the shortcut promotion target.

## Why historical `e9cbaacc...` cannot be directly promoted

The current `web-v2-release.yml` release invariant requires `expected_sha` to equal exact current `main` for candidate, smoke and promotion. Current main has advanced beyond the historical accepted SHA.

Therefore:

- **do not reset main to `e9cbaacc...`;**
- **do not weaken/bypass the release workflow;**
- **do not promote an older Cloudflare version as a shortcut.**

Instead, restore the `e9cbaacc...` visual contract on top of current main, preserving later safe commerce/catalog/release work, then create and promote one exact current-main immutable candidate.

## Post-cutover media operating rule

After the restored baseline is live, image/icon fixes are section-scoped. Each patch names one section/image group, changes only its relevant asset/mapping/crop/object-fit/minimum render code, runs targeted visual QA plus canonical QA, and produces a small receipt.

Cloudflare Worker deployment remains an immutable whole-version artifact by architecture. **“Section scoped” means the code/visual delta is bounded; it does not mean deploying partial Worker bytecode.**

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
| Web V2 | Web V2 specialist lane under MPM 7 | **ACTIVE — `e9cbaacc...` OWNER VISUAL BASELINE LOCKED; RESTORE ON CURRENT MAIN → CUTOVER → SECTION MEDIA PATCHES** |
| TikTok | TikTok execution under Peter | **ACTIVE UNDER RESTRICTION — NO APPEAL REPLAY / NO UNAUTHORIZED PAID SPEND; COUNSEL LANE OWNER-GATED** |
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
- `production-deploy` remains **LEGACY ONLY** until accepted Web V2 cutover control says otherwise.
- `e9cbaacc49443637e2241be7948ea93a3848557f` — **OWNER-ACCEPTED VISUAL AUTHORITY / REFERENCE; DO NOT WHOLESALE RESET REPOSITORY TO THIS SHA**.
- `4bc2d0874db74133be3a76aee8d6db33504b6bfa` / Cloudflare `41bbca73-fb38-4f0f-87b3-a24b3f1801d0` — **VISUALLY REJECTED / DO NOT PROMOTE / DO NOT REPLAY**.
- `6dff0a7e65f3967d60040977c3c2693e430e56b4` / Cloudflare `e60f4bd0-285b-4b08-9b55-1db013be383e` — **HISTORICAL EARLIER APPROVED CANDIDATE / NOT CONTROLLING PROMOTION TARGET**.
- PR #194 media assets — **MAY BE REUSED ONLY WHERE THEY FIT THE `e9cbaacc...` ACCEPTED SLOT WITHOUT VISUAL DRIFT**.
- Do not combine all remaining image/icon fixes into another sitewide visual-rebuild PR after baseline cutover.
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
3. Company priority remains P0 continuity/loss prevention → P1 Web V2 approved-baseline cutover + vendor/catalog conversion/profitability/truth → P2 scale → P3 internal enhancement.
4. One bounded task = one primary execution owner.
5. Hold only the affected SKU/order/route/image slot when truth is missing.
6. Vendor Projects own supplier truth; storefront workers do not infer it.
7. Live execution is complete only when the required action-capable surface provides the required proof.
8. A Git decision/receipt is not a substitute for live marketplace, communications or production-runtime verification when live proof is the actual gate.
9. Web V2 historical visual authority is `e9cbaacc...`, but release source must be exact current main. Restore the accepted visual contract forward; do not roll the repository backward.
10. After baseline cutover, image/icon work is section-scoped. A whole immutable Worker artifact may be released technically, but the code/visual delta must stay bounded to the named section.
11. MPM 7 owns company oversight; MPM 6 and earlier instances are historical/reference.
12. MASTER RECON remains triggered integrity support, not a standing duplicate manager.
13. **HOLD ONLY THE BLOCKED ITEM → KEEP THE COMPANY MOVING.**

## Current next-unblocked route

Voice and eBay remain P0 but are authenticated-evidence gated. Unless newer Git truth supersedes this board, MPM 7 routes the next unblocked internal work to:

**WEB V2 RESTORE `e9cbaacc...` VISUAL CONTRACT ON CURRENT MAIN → QA / MERGE → EXACT CANDIDATE → RESTORATION VERIFY → PRODUCTION-PARITY SMOKE → SAME-VERSION CUTOVER → SECTION-SCOPED IMAGE/ICON PASSES → SHOPIFY `/pages/part-request` PROOF → VENDOR CATALOG READINESS → PROFITABILITY / CHANNEL VERIFICATION.**
