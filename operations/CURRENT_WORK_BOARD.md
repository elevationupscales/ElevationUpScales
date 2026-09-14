# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-14  
**Owner:** Casey Young  
**State Owner:** **MPM 7 — Company Oversight**  
**MPM 7 control:** `MPM7_COMPANY_OVERSIGHT_TAKEOVER_2026-09-14.md`  
**Web V2 development Worktree:** `WEB_V2_CURRENT_WORKTREE.md`  
**Web V2 DEV OS recovery workflow:** `WEB_V2_DEV_OS_RECOVERY_WORKFLOW_2026-09-14.md`  
**eBay incident correction:** `COM2_EBAY_FALSE_COMPLETION_CORRECTION_2026-09-14.md`  
**Shopify operations Worktree:** `SHOPIFY_STORE_OPERATIONS_CURRENT_WORKTREE.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CONTINUE**

MPM 7 is the active company-oversight instance. MPM 6 and earlier MPM iterations are historical/reference and must not issue competing live control.

Waiting on an authenticated, external, owner, or release gate in one lane does not stop executable clean work in another lane.

---

# CURRENT COMPANY POSTURE

**Aggregate state: OPERATIONAL.**

Do not describe the company as offline because one communications, seller-proof, storefront-proof, SKU-specific, or Web V2 release gate is open.

Current management posture:

**P0 PROTECT COMMUNICATIONS + CLOSE LIVE EBAY CUSTOMER/SELLER RISK → P1 RECOVER OWNER-REVIEWED WEB V2 STATE → OWNER QA → FORWARD-PORT / CUTOVER → SECTION-SCOPED MEDIA REPAIR + SHOPIFY/VENDOR CATALOG TRUTH → PROFITABILITY → P2 SCALE.**

---

# TODAY'S CONTROLLED WORKFLOW — 2026-09-14

1. **P0 — eBay:** authenticated Seller Hub verification for remaining live customer/seller risk, including order `20-15123-05140` and corrected seller-row/listing state. Order `10-15134-90489` is customer-refund closed; do not reopen that refund as unfinished work.
2. **P0 — owner communications:** verify direct inbound call, SMS and voicemail after Google Voice/carrier correction. No closure without live proof.
3. **P1 — Web V2 Phase A recovery:** recover from owner-reviewed QA state `e0db19829ec3c36b4caaa503f5b9f7bcde38d868`, with visual implementation `a2c0de22b7c18320603b196f0b3f6401fe4e7b40`; reproduce the successful owner QA set; fix only homepage hero, store hero, and genuinely broken icons; return receipt; **STOP FOR CASEY**.
4. **P1 — Web V2 Phase B forward-port:** only after Casey approves Phase A, re-resolve current main and port only the approved visual delta forward while preserving current safe catalog/cart/checkout/order/release architecture.
5. **P1 — Web V2 cutover:** after Phase B merges, create one exact immutable current-main candidate → verify Git SHA / Cloudflare Version ID → `/__version` → production-parity smoke → promote the same tested Version ID → live verify.
6. **P1 — Web V2 media completion after cutover:** images/icons are repaired one section or tightly coupled media group at a time. No more sitewide image/icon closeout passes.
7. **P1 — Shopify:** close `/pages/part-request` exact active-theme/version/public-visibility proof while preserving green payment state.
8. **P1 — vendor catalog readiness:** advance verified catalog inputs only — Renogy next-five controlled evidence; VEVOR current PRO economics/tax truth; Doba destination/economics checks; SunGoldPower and Phocos owner-ready application preparation.
9. **P1 — profitability/cross-channel verification:** continue after the customer/release gates above are moving or externally blocked.

**Marketplace / Create-a-Listing transition rule:** current Legacy redirects remain transitional. Do not patch them as isolated Legacy defects while Web V2 takes final storefront/vendor-catalog route ownership.

---

# CURRENT COMPANY PRIORITIES

| Priority | Work Item | Owner | Current State | Next Action |
|---|---|---|---|---|
| **P0** | Owner communications / residual Google Voice forwarding | MPM 7 / Communications Recovery | **OPEN — AUTHENTICATED LIVE VERIFICATION REQUIRED** | Verify direct inbound call, SMS and voicemail after carrier/Google correction. Do not blind-loop retries or claim closure without live proof. |
| **P0** | eBay live customer + seller-state verification | eBay Store Operations under Peter / Company Operations | **OPEN — AUTHENTICATED VERIFICATION ONLY** | Verify order `20-15123-05140` in Seller Hub for shipment/tracking vs recovery action, then verify seller identity + live listing/price state. No repeat price/quantity/end mutation unless a live mismatch is proven. |
| **P1** | Web V2 owner-reviewed recovery | Web V2 DEV OS under MPM 7 | **PHASE A ACTIVE / OWNER-REVIEWED STATE LOCKED** | Start from `e0db198...`; verify parent `a2c0de22...`; verify QA run `34799915010`; reproduce four accepted screenshots; fix only homepage hero, store hero and genuinely broken icons; return receipt; stop for Casey. |
| **P1** | Web V2 forward-port + cutover | Web V2 DEV OS / Release Engineer | **BLOCKED ON PHASE A OWNER APPROVAL** | After approval only: current main → approved visual delta only → preserve commerce/catalog/release → QA → merge → exact candidate → smoke → same-version promotion → live verify. |
| **P1** | Web V2 section-scoped image/icon completion | Web V2 specialist lane | **QUEUED AFTER BASELINE CUTOVER** | One named section/media group per bounded branch/PR. Preserve approved layout/copy/CTAs/navigation/dimensions; change only required assets/mappings/minimum render rules. |
| **P1** | Shopify `/pages/part-request` active-theme/version/visibility proof | Shopify Store Operations under Peter | **ROUTE PASSED / VERSION-VISIBILITY PROOF PENDING** | Verify exact active-theme/version/public visibility; close only from direct proof. Preserve green payment state. |
| **P1** | Vendor catalog readiness / commerce truth | Vendor Projects + Shopify Store Operations + Web V2 | **ACTIVE / CONTROLLED** | Feed Web V2/current commerce surfaces only verified vendor truth. Renogy next-five remain individually gated; VEVOR uses current PRO economics; Doba route/destination economics verified per affected order/SKU; prepare SunGoldPower and Phocos applications for owner review without inventing attestations. |
| **P1** | Shopify conversion / trust / profitability | Shopify Store Operations + Shipping & Logistics + Vendor Projects | **ACTIVE** | Improve product/media/shipping/policy/buy-box truth without guessing supplier or legal/commercial facts. Coordinate catalog truth with Web V2 rather than duplicating architecture work. |
| **P1** | Renogy Shopify controlled launch | Renogy Project + Shopify Store Operations | **1 LIVE / NEXT FIVE CONTROLLED DRAFTS** | Preserve accepted 10W maintainer at $39.99. Advance next-five drafts only after exact media, price, stock/orderability, shipping and warranty truth clears per SKU. |
| **P1** | Existing-channel profitability + price source-of-truth | Company Operations + channel workers + Vendor Projects | **ACTIVE** | Improve existing channels before expansion; protect contribution margin; no broad paid acquisition. |
| **P1** | GitHub branch protection | Owner/admin-capable GitHub surface | **OWNER / ADMIN ACTION REQUIRED** | Enable protection when an authorized admin-capable surface is available. Do not misreport unsupported admin access as completion. |
| **P1** | Cross-channel live verification | Company Operations + owning channel workers | **ACTIVE / BOUNDED** | Verify only materially open live states; no duplicate audits of accepted work. |
| **P2** | Dormant / lower-priority streams | Owning managers | **HOLD / PARALLEL ONLY WHEN NON-CONFLICTING** | Resume only when higher-priority revenue/customer work is clean or the lane can move independently without distraction. |

---

# WEB V2 — VERIFIED RECOVERY / RELEASE STATE

## Final owner-reviewed recovery authority

- **Review / QA state:** `e0db19829ec3c36b4caaa503f5b9f7bcde38d868` — `QA: recapture after asset-render correction`.
- **Visual implementation:** `a2c0de22b7c18320603b196f0b3f6401fe4e7b40` — `Web V2: fix final visual asset rendering`.
- `e0db198...` is a direct child of `a2c0de22...` and changes only the one-time visual QA workflow.
- **QA run:** `34799915010` — SUCCESS.
- **QA artifact:** `web-v2-final-visual-qa`.
- Owner-review viewports: `/` and `/store`, each at `1536×960` and `390×844`, full-page.

This supersedes the prior board assumption that `e9cbaacc...` was the final recovery target.

## Drift boundary

`f532741933d842213716b8d1bee1a3fecd8e6442` is six commits ahead of `e0db198...` and belongs to the later semantic icon/image repair expansion.

**Do not continue that later sequence as the primary recovery path.**

## Owner-authorized Phase A scope

Only:

- homepage hero imagery/use;
- store hero imagery/use;
- genuinely missing/broken icons;
- narrow tests and screenshot tooling required to prove those items.

Not authorized:

- catalog redesign;
- shell restructure;
- new store architecture;
- new card system;
- copy rewrite;
- broad semantic-icon system;
- sitewide spacing/type retuning;
- cart/checkout/order/payment redesign.

## Historical references — not controlling recovery target

- `e9cbaacc49443637e2241be7948ea93a3848557f` — earlier accepted homepage/hero checkpoint;
- `d81844556a62b27e3040e94a8ca7eae6ccb7fcd9` — earlier SOK image repair;
- `6dff0a7e65f3967d60040977c3c2693e430e56b4` / Cloudflare `e60f4bd0-285b-4b08-9b55-1db013be383e` — historical immutable candidate;
- PR #194 — later media closeout; evidence/assets only, not visual authority;
- `4bc2d0874db74133be3a76aee8d6db33504b6bfa` / Cloudflare `41bbca73-fb38-4f0f-87b3-a24b3f1801d0` — visually rejected / do not promote.

## Release invariant

The historical recovery branch is for reconstruction and owner review only.

After Casey approves it, DEV must forward-port only the approved visual delta onto exact current `main`, preserving safe functional work. Release then uses the normal exact-current-main immutable candidate / smoke / same-version promotion pipeline.

No historical SHA is promoted directly as a shortcut.

---

# CURRENT RECON DELTAS

## eBay

`COM2_EBAY_FALSE_COMPLETION_CORRECTION_2026-09-14.md` still controls the broad listing incident: authenticated seller-side verification is required before any repeat mutation.

Order `10-15134-90489` is customer-refund **CLOSED** from eBay confirmation: $49.98 refunded and order total $0.00. This does not close the broader listing-control incident.

Order `20-15123-05140` remains an authenticated Seller Hub verification target because the latest reconciled evidence showed it overdue for shipment and no later tracking/cancellation/refund proof was found in the email recon.

## Vendor / catalog truth

- **VEVOR:** no extra 3% discount remains; current calculations must use verified PRO discount structure. Vendor states a 7% tax fee applies without resale certification. Do not carry stale economics into pricing or Web V2 catalog truth.
- **Doba:** SKU `D01027H21KW` has destination eligibility restrictions; verify customer destination and current economics before fulfillment.
- **SunGoldPower:** dealer relationship is receptive and an installer/dealer application is available. Management may prefill known facts; owner reviews/signs attestations and license/tax claims.
- **Phocos:** New Client Application received. Management may prepare it and an initial product-family shortlist, but sensitive/company-attestation fields remain owner-verified and must not be invented.
- **Renogy:** the 10W maintainer remains accepted live at **$39.99**; the next five remain controlled drafts with individual media/price/stock/shipping/warranty gates.

---

# CHANNEL / OPERATIONS STATE

| Lane | Owner | State |
|---|---|---|
| Shopify | Shopify Store Operations / Peter / Company Ops | **ACTIVE — PAYMENT GREEN / EVIDENCE + CONVERSION + PROFITABILITY TUNING** |
| eBay | eBay Store Operations / Peter / Company Ops | **P0 OPEN — CUSTOMER + SELLER AUTHENTICATED VERIFICATION** |
| Web V2 | Web V2 DEV OS under MPM 7 | **ACTIVE — `e0db198...` OWNER REVIEW STATE / `a2c0de22...` VISUAL BASELINE / PHASE A RECOVERY** |
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
- Current Legacy Marketplace / Create-a-Listing redirects — **TRANSITIONAL; DO NOT PATCH IN ISOLATION WHILE WEB V2 FINAL ROUTE OWNERSHIP IS COMPLETED**.
- `production-deploy` remains **LEGACY ONLY** until accepted Web V2 cutover control says otherwise.
- `e0db198...` — **OWNER-REVIEWED RECOVERY STATE / HISTORICAL RECOVERY BRANCH SOURCE; DO NOT WHOLESALE MERGE BACKWARD OVER CURRENT MAIN**.
- `a2c0de22...` — **VISUAL CODE BASELINE BENEATH OWNER QA STATE**.
- six commits after `e0db198...` through `f532741...` — **DRIFT SEQUENCE / DO NOT REPLAY WHOLESALE**.
- `e9cbaacc...` — **EARLIER ACCEPTED CHECKPOINT / NOT FINAL RECOVERY AUTHORITY**.
- `d818445...` — **EARLIER IMAGE REPAIR / NOT FINAL RECOVERY AUTHORITY**.
- `4bc2d087...` / Cloudflare `41bbca73-fb38-4f0f-87b3-a24b3f1801d0` — **VISUALLY REJECTED / DO NOT PROMOTE / DO NOT REPLAY**.
- `6dff0a7e...` / Cloudflare `e60f4bd0-285b-4b08-9b55-1db013be383e` — **HISTORICAL CANDIDATE / NOT CONTROLLING PROMOTION TARGET**.
- PR #194 — **MAY SUPPLY ISOLATED ASSET EVIDENCE ONLY; NOT VISUAL AUTHORITY**.
- Do not combine remaining image/icon fixes into another sitewide visual-rebuild PR after cutover.
- `repair/live-site-audit-20260912` / `5fc55c806c1d7e138a9819a234e85ec932a056cb` — **ABANDONED / DO NOT DEPLOY / DO NOT MERGE**.
- workflow `34728792703` — **FAILED / DO NOT REPLAY AS RELEASE PATH**.
- stale candidate `84af23ec814baa73718e33ec052044ce4706534d` — **RETIRED / DO NOT DEPLOY**.
- Shopify Payments incomplete/setup blocker — **CLOSED / STALE** unless fresh live evidence proves otherwise.
- Do not repeat corrected eBay mutation without authenticated mismatch proof.
- Do not publish all Renogy drafts because one SKU launched successfully.
- Do not infer supplier, shipping, tax, lithium, warranty, MAP, policy or landed-cost truth.
- Preserve any work item explicitly time-gated **not before 2026-09-21** unless Casey changes that gate.

---

# UPDATE DISCIPLINE

1. The closest active Worktree owns specialist phase sequencing.
2. Global Board/Registry follow newer accepted worktree/Git receipts; they do not route workers backward when stale.
3. Company priority remains P0 continuity/loss prevention → P1 Web V2 approved-recovery/cutover + vendor/catalog conversion/profitability/truth → P2 scale → P3 internal enhancement.
4. One bounded task = one primary execution owner.
5. Hold only the affected SKU/order/route/image slot when truth is missing.
6. Vendor Projects own supplier truth; storefront workers do not infer it.
7. Live execution is complete only when the required action-capable surface provides required proof.
8. A Git decision/receipt is not a substitute for live marketplace, communications or production-runtime verification when live proof is the gate.
9. Web V2 recovery authority is `e0db198...` review state + `a2c0de22...` visual code. Recover historical appearance first; after owner approval, forward-port only approved visual delta to current main.
10. After cutover, image/icon work is section-scoped. A whole immutable Worker artifact may be released technically, but code/visual delta stays bounded to the named section.
11. MPM 7 owns company oversight; earlier MPM instances are historical/reference.
12. MASTER RECON remains triggered integrity support, not a standing duplicate manager.
13. **HOLD ONLY THE BLOCKED ITEM → KEEP THE COMPANY MOVING.**

## Current next-unblocked route

Voice and eBay remain P0 but are authenticated-evidence gated. Unless newer Git truth supersedes this board, MPM 7 routes the next unblocked internal work to:

**WEB V2 PHASE A: `e0db198...` + `a2c0de22...` → REPRODUCE OWNER QA → FIX ONLY HOME HERO / STORE HERO / ACTUALLY BROKEN ICONS → OWNER REVIEW → PHASE B CURRENT-MAIN FORWARD-PORT → QA / MERGE → EXACT CANDIDATE → SMOKE → SAME-VERSION CUTOVER → SECTION-SCOPED MEDIA PASSES → SHOPIFY `/pages/part-request` PROOF → VENDOR CATALOG READINESS → PROFITABILITY / CHANNEL VERIFICATION.**
