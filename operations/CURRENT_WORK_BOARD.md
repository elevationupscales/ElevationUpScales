# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Legacy coding stabilization Worktree:** `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`  
**Web V2 development Worktree:** `WEB_V2_CURRENT_WORKTREE.md`  
**Web V2 owner workflow:** `WEB_V2_COMMERCIAL_RETAIL_REBUILD_AND_RELEASE_WORKFLOW_2026-09-12.md`  
**Commerce tuning control:** `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

Management loop:

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Website inspection remains read-only by default. Website mutation is authorized only through the current Web V2 build/release lane or a separately authorized bounded Legacy repair.

---

# OWNER WEBSITE TARGET — CURRENT

ElevationUpScales.com is being rebuilt as a **commercial online retailer for authorized vendor products** with Elevation's lithium/off-grid/RV/freight/Hawaii specialty as the public positioning.

The website's revenue path is:

**HOMEPAGE → VENDOR/PRODUCT DISCOVERY → PRODUCT → CART → PAYPAL → ELEVATION ORDER → SUPPLIER/FREIGHT FULFILLMENT.**

Owner visual direction:

- preserve the approved homepage design already merged in Web V2;
- preserve the approved hero and freight/logistics presentation;
- keep Shop as the primary revenue CTA;
- keep Start a Project as a secondary path;
- keep internal OS/developer language and non-revenue feature clutter out of the public experience.

Direct-site payment authority:

**ElevationUpScales.com direct orders = Elevation-owned checkout + PayPal Orders v2 + durable Elevation order.**

Do not silently route direct-site customers into Shopify checkout. Shopify, eBay and TikTok remain separate channel surfaces.

---

# CURRENT WEBSITE / DEV STATE

Current verified `main` entering the active catalog phase:

`e2c9e3494bd932c2cde8b0d24e807cbb94706009`

Verified phase receipts:

- Homepage reconstruction merged: `6940c32b5c1863d4b60be85427ccff3060e5d396`.
- Retail-navigation focus merged into current `main`: `e2c9e3494bd932c2cde8b0d24e807cbb94706009`.
- Release-system reset remains complete / merged / QA pass; it does not move ahead of the commercial build.

| Work Item | Owner | Current State | Next Action |
|---|---|---|---|
| **Web V2 Development** | OS 1.1 Project Manager / MPM → Web V2 workers | **P0 ACTIVE — CANONICAL VENDOR CATALOG / COMMERCE PHASE.** Homepage and retail navigation are merged. | Follow `WEB_V2_CURRENT_WORKTREE.md`: canonical vendor catalog → product detail → cart → PayPal/order → fulfillment/freight/Hawaii gates → production-parity release. |
| Web V2 — WEB DEVELOPER | Web V2 Development | **STANDBY / SUPPORT — HOMEPAGE + RETAIL NAV MERGED** | Preserve merged public shell; support exact bounded UI needs surfaced by Commerce. Do not reopen homepage redesign or a competing nav branch. |
| Web V2 — COMMERCE DEVELOPER | Web V2 Development | **ACTIVE / CURRENT — CANONICAL VENDOR CATALOG** | Build one canonical catalog from authoritative Vendor Project truth. Unverified commercial fields stay non-orderable rather than inferred. |
| Web V2 — RELEASE ENGINEER | Web V2 Development | **READY / ACTIVE SUPPORT — PRODUCTION-PARITY RELEASE** | Support only when the bounded commercial build reaches a true release gate. Preview remains diagnostic only. |
| MASTER RECON OS | MPM | **STANDBY / TRIGGERED INTEGRITY** | Wake for state/lineage conflict, supplier-truth conflict affecting catalog control, worker drift, exact-candidate validation, release-integrity checks or owner-directed RECON. |
| Legacy direct-site checkout / PayPal | MASTER DEV under MPM | **CLOSED / PRODUCTION ACCEPTED** at `894b15cb12bf75a6a8e81b916e2a9bc2de858f88` | Preserve as Legacy fallback/reference while Web V2 is built. VERIFY-FIX only on fresh Legacy defect. |
| Aborted Legacy live-site audit round | MPM / MASTER DEV | **OWNER ROLLED BACK / QUARANTINED** — `repair/live-site-audit-20260912` at `5fc55c806c1d7e138a9819a234e85ec932a056cb` | DO NOT DEPLOY / DO NOT MERGE / DO NOT REPLAY. |

---

# CANONICAL CATALOG CONTROL — ACTIVE

One canonical Elevation catalog owns Web V2 product truth. Vendor pages are filtered views, not independent storefront truth.

Vendor Projects own exact supplier facts. Commerce may consume only verified:

- supplier/vendor identity;
- SKU/product identity;
- approved title/spec/media;
- sell price and MAP/floor state;
- stock/orderability/backorder state;
- shipping/freight disposition;
- warranty/returns owner;
- fulfillment source;
- channel authorization.

**FAIL-CLOSED RULE:** missing or conflicting commercial truth does not get inferred. The affected SKU remains non-orderable or explicitly gated until its owning Vendor Project resolves the fact.

Do not stop the full catalog because one SKU is unresolved. Hold only the affected SKU/state, continue clean verified products, and route the missing fact back to its owning Vendor Project.

Publication/discovery does not itself authorize purchase.

---

# WEB V2 BUILD SEQUENCE

| Sequence | State | Routing |
|---|---|---|
| Homepage exact reconstruction | **COMPLETE / MERGED** | Receipt `6940c32b5c1863d4b60be85427ccff3060e5d396`. Preserve; do not redesign. |
| Retail navigation cleanup | **COMPLETE / MERGED** | Current `main = e2c9e3494bd932c2cde8b0d24e807cbb94706009`. Preserve Shop / approved vendor views / Freight & Hawaii / Start a Project. |
| Canonical vendor catalog | **P0 ACTIVE / CURRENT** | Commerce Developer. Use owning Vendor Project truth; one canonical catalog, vendor-filtered views; unknown commercial truth fails closed. |
| Product detail | **NEXT AFTER CATALOG FOUNDATION** | Commercial retail product page driven by the same canonical truth. |
| Cart | **QUEUED** | Durable editable cart + server-side SKU/price/orderability revalidation. |
| PayPal checkout + Elevation order | **QUEUED / AUTHORIZED** | PayPal Orders v2 + idempotency + durable order + capture/reconciliation. |
| Supplier/freight fulfillment handoff | **QUEUED** | Persist fulfillment source and route the order to the owning supplier/logistics lane. |
| Freight/Hawaii lithium gate | **QUEUED** | Known shipping may sell; unresolved freight/unapproved lithium route fails closed before final charge. |
| Production-parity release system | **COMPLETE / MERGED / QA PASS** | Release foundation/application QA passed in run `34738843664`; use only at the first true release gate. |
| Same-version production acceptance | **WAIT FOR BUILT SITE + OWNER RELEASE** | No rebuild/re-upload. Cut over/promote exact smoke-tested version only after commercial build release readiness. |
| First real direct-site order | **FINAL REVENUE PROOF** | Payment → durable order → supplier/freight → fulfillment → realized margin. |

---

# FOREGROUND OPERATIONS

| Work Item | Owner | Current State | Next Action |
|---|---|---|---|
| Owner communications / residual Google Voice forwarding | MPM / Communications Recovery | **P0 CRITICAL — ACCOUNT RECOVERED / VOICE DELETED / RESIDUAL FORWARDING REMAINS** | Carrier/Google clear residual forwarding/state; verify direct inbound call + SMS. |
| eBay customer/cash recovery + profitability contraction | eBay Store Operations under Peter / Company Operations | **P0 PARALLEL — CUSTOMER OBLIGATIONS + CASH RELEASE + LOSS PREVENTION** | Resolve shipment/cancellation/refund obligations and held-cash blockers; preserve positive-contribution core. |
| Existing-shop tuning | MPM / Company Operations / owning channel workers | **ACTIVE — TUNE BEFORE EXPANDING** | Fix current channel product truth, purchase, fulfillment and realized-margin issues. |
| Vendor source truth | Vendor Project managers/specialists | **ACTIVE / SUPPORTING WEB V2 CATALOG** | Maintain exact authorization/SKU/stock/MAP/cost/shipping/warranty/fulfillment truth; resolve only their own supplier gaps. |

---

# EXISTING SHOP / CHANNEL STATE

| Lane | Owner | Current State | Next |
|---|---|---|---|
| Shopify Online Store | Shopify Store Operations + Owner | **PRESERVE — SEPARATE CHANNEL** | Preserve working Shopify checkout/payment configuration and current intentional staging. Do not make Shopify the Web V2 direct-site payment owner. |
| Elevation direct site — Legacy runtime | MPM / MASTER DEV | **PRODUCTION ACCEPTED / FALLBACK / VERIFY-ONLY** | Preserve during Web V2 build/cutover. |
| Web V2 | OS 1.1 Project Manager / Web V2 Development | **ACTIVE CANONICAL CATALOG BUILD** | Execute catalog phase under current Worktree, then product detail. |
| VEVOR | VEVOR Project Operations Manager / Specialist | **ACTIVE SUPPLIER/CATALOG SOURCE** | Supply exact approved product/source/shipping/economics truth. Do not infer missing fields in Web V2. External channel expansion remains separately controlled. |
| Renogy | Renogy Branch Operations Manager / Specialist | **ACTIVE SUPPLIER/CATALOG SOURCE** | Supply exact dealer/orderability/backorder/cost/shipping/warranty truth. Do not infer missing fields in Web V2. |
| SOK | SOK Project Operations Manager / SOK RECON OS | **ACTIVE PRIMARY SUPPLIER** | Supply exact product/orderability/warranty truth; preserve Hawaii controls. |
| Kingboss | Kingboss Project Operations Manager / Specialist | **ACTIVE STAGE-1 PROVING / CATALOG SOURCE WHEN APPROVED** | Continue exact SKU/MAP/channel/warranty/compliance reconciliation before orderability/publication. |
| Apparel / Fourthwall | Apparel Vendor Operations Manager | **ACTIVE SEPARATE APPAREL CHANNEL** | Preserve native fulfillment/economics; not a blocker to lithium/off-grid retail launch. |
| TikTok Shop / Affiliate Growth | TikTok execution + TikTok Affiliate Growth Manager under Peter | **ACTIVE UNDER RESTRICTION / APPEAL TERMINAL-FAILED** | No appeal replay; current-shop tuning only. |

---

# OWNER / HARD HOLDS

| Work Item | State | Reopen Gate |
|---|---|---|
| **Web V2 authorized vendor catalog build** | **ACTIVE / NOT HELD** | Exact supplier/project truth must exist before a SKU becomes orderable. Unknown commercial facts fail closed per SKU. |
| External marketplace / new-channel catalog expansion | **HOLD — CURRENT CHANNELS FIRST** | Casey/MPM explicitly reopens after current channel profitability/stability. |
| New-channel expansion — Meta / Google & YouTube / Amazon / Walmart / additional marketplaces | **HOLD** | Existing channels stable/profitable + owner reopen. |
| Paid advertising / prepaid media | **HOLD — OWNER CAPITAL-RECOVERY RULE** | Verified capital-recovery hole reaches zero and Casey explicitly reopens paid acquisition. |
| Legacy homepage mutation | **NO TOUCH** | Fresh Legacy defect + exact authorization. Web V2 is the authorized rebuild lane. |
| Broad Ops V2/admin/dashboard rebuild | **HOLD BEHIND REVENUE PATH** | Web V2 retail purchase path is functional and accepted first. |

---

# NOT FOREGROUND / DO NOT DELAY REVENUE BUILD

- marketplace/list-a-vehicle systems;
- collector features;
- large CMS/admin platform;
- speculative AI/agentic commerce;
- unrelated home-service expansion;
- broad analytics redesign;
- new social/channel expansion;
- another homepage redesign;
- generic re-onboarding of already authorized vendors.

---

# CLOSED / DO NOT RECREATE

- Web V2 homepage reconstruction — COMPLETE / MERGED at `6940c32b5c1863d4b60be85427ccff3060e5d396`.
- Web V2 retail-navigation phase — COMPLETE / MERGED into `e2c9e3494bd932c2cde8b0d24e807cbb94706009`.
- Legacy direct-site checkout / PayPal bounded repair — CLOSED / PRODUCTION ACCEPTED at `894b15cb12bf75a6a8e81b916e2a9bc2de858f88`.
- Web V2 production-parity release-system reset — COMPLETE / MERGED / QA PASS; do not rebuild the architecture or restore workers.dev acceptance.
- Aborted Legacy audit branch `repair/live-site-audit-20260912` / `5fc55c806c1d7e138a9819a234e85ec932a056cb` — OWNER ROLLED BACK / DO NOT DEPLOY / DO NOT MERGE.
- Audit workflow run `34728792703` — FAILED / DO NOT RERUN AS RELEASE PATH.
- Stale candidate `84af23ec814baa73718e33ec052044ce4706534d` — RETIRED / DO NOT DEPLOY.
- Shopify Payments `Complete setup` blocker — closed/stale; authenticated state accepts payments/receives payouts.
- TikTok verification appeal replay — terminal failed / do not recreate.
- Generic vendor re-onboarding for already authorized suppliers — do not restart.

## Update discipline

1. `WEB_V2_CURRENT_WORKTREE.md` owns Web V2 phase sequencing.
2. Homepage and retail-navigation phases are complete; do not route workers backward without a fresh exact defect or owner change.
3. Canonical catalog is the active phase; Vendor Projects own supplier truth and Web V2 does not invent missing commercial data.
4. Hold only the affected SKU/state when facts are missing; continue verified catalog work.
5. Catalog publication is authorized only from exact approved vendor/source truth; this does not reopen external marketplace expansion.
6. Preview URLs are diagnostic only; production-parity smoke is the release acceptance path.
7. One Web V2 Worktree, one primary worker per bounded task, no duplicate development branches for the same objective.
8. Legacy production stays separately protected as rollback/fallback until Web V2 cutover is accepted.
9. Shopify remains a separate channel, not a fallback checkout for Elevation direct-site transactions.
10. No secrets in Git; no accepted candidate rebuild before promotion/cutover.
11. Block only the exact blocked item and continue the next executable revenue-critical task.
12. **HOMEPAGE COMPLETE → RETAIL NAV COMPLETE → CANONICAL CATALOG ACTIVE → PRODUCT → CART → CHECKOUT → RELEASE ONLY AT A TRUE GATE.**
13. MASTER RECON returns to triggered integrity after correcting drift; it does not remain a standing executor.

## Current control phrase

**HOMEPAGE MERGED → RETAIL NAV MERGED → CANONICAL CATALOG ACTIVE → VERIFIED PRODUCTS SELL → UNKNOWN TRUTH FAILS CLOSED → PRODUCT → CART → PAYPAL → ORDER → FULFILL → RELEASE AT TRUE GATE.**
