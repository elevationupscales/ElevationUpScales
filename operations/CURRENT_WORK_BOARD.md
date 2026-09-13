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

- preserve/reconstruct the current approved homepage design rather than inventing a new concept;
- preserve the approved hero and recent freight/logistics presentation;
- make Shop the primary revenue CTA;
- keep Start a Project as a secondary path;
- eliminate internal OS/developer language and non-revenue feature clutter from the public experience.

Direct-site payment authority:

**ElevationUpScales.com direct orders = Elevation-owned checkout + PayPal Orders v2 + durable Elevation order.**

Do not silently route direct-site customers into Shopify checkout. Shopify, eBay and TikTok remain separate channel surfaces.

---

# CURRENT WEBSITE / DEV STATE

| Work Item | Owner | Current State | Next Action |
|---|---|---|---|
| **Web V2 Development** | OS 1.1 Project Manager / MPM → Web V2 workers | **P0 ACTIVE — COMMERCIAL RETAIL REBUILD / REVENUE FIRST.** Commercial-retail release reset accepted at `9442ffc679b00b8c9b87ff4c6fbb0664b5728881`; every worker must still re-resolve current `main` before execution. | Follow `WEB_V2_CURRENT_WORKTREE.md`: homepage reconstruction → retail navigation → canonical vendor catalog → product detail → cart → PayPal/order → freight/Hawaii gates → production-parity release. |
| Web V2 — WEB DEVELOPER | Web V2 Development | **ACTIVE / NEXT — HOMEPAGE RECONSTRUCTION** | Reconstruct the owner-approved current homepage look and retail/logistics message. No new visual concept and no skip-ahead to release. |
| Web V2 — COMMERCE DEVELOPER | Web V2 Development | **QUEUED / AUTHORIZED AFTER HOMEPAGE BASELINE** | Build canonical vendor catalog, vendor views, product detail, cart, PayPal Orders v2, durable order and fulfillment handoff. |
| Web V2 — RELEASE ENGINEER | Web V2 Development | **READY / ACTIVE SUPPORT — PRODUCTION-PARITY RELEASE** | Release-system reset is complete and QA-passed. Support a bounded build only when it reaches a true release gate; `workers.dev` preview is diagnostic only. |
| MASTER RECON OS | MPM | **STANDBY / TRIGGERED INTEGRITY** | Wake for state/lineage conflict, worker drift, exact-candidate validation, release-integrity checks, or owner-directed RECON. No standing website execution. |
| Legacy direct-site checkout / PayPal | MASTER DEV under MPM | **CLOSED / PRODUCTION ACCEPTED** at `894b15cb12bf75a6a8e81b916e2a9bc2de858f88` | Preserve as Legacy fallback/reference while Web V2 is built. VERIFY-FIX only on fresh Legacy defect. |
| Aborted Legacy live-site audit round | MPM / MASTER DEV | **OWNER ROLLED BACK / QUARANTINED** — `repair/live-site-audit-20260912` at `5fc55c806c1d7e138a9819a234e85ec932a056cb` | DO NOT DEPLOY / DO NOT MERGE / DO NOT REPLAY. |

Web V2 release invariant:

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION LIVE → VERIFY → RECEIPT.**

Preview URLs are diagnostic only.

Bootstrap release before V2 owns the root domain:

**CANDIDATE → SMOKE-ONLY CUSTOM DOMAIN WITH PRODUCTION BINDINGS → EXACT RUNTIME VERSION PROOF → OWNER ACCEPTANCE → SAME WORKER/VERSION ROOT-DOMAIN CUTOVER → LIVE VERIFY.**

Steady-state release after V2 owns production:

**CANDIDATE → ACCEPTED VERSION 100% + CANDIDATE 0% → REAL PRODUCTION URL + VERSION OVERRIDE → EXACT RUNTIME VERSION PROOF → PROMOTE SAME VERSION TO 100% → LIVE VERIFY.**

---

# WEB V2 BUILD SEQUENCE

| Sequence | State | Routing |
|---|---|---|
| Homepage exact reconstruction | **P0 ACTIVE / NEXT** | Web Developer. Preserve approved hero/freight/brand look; retail-first copy. |
| Retail navigation cleanup | **QUEUED** | Shop / Vendors / Freight & Hawaii / Start a Project. Remove public feature clutter. |
| Canonical vendor catalog | **QUEUED / AUTHORIZED** | Commerce Developer. Use owning vendor Project truth; one canonical catalog, vendor-filtered views. |
| Product detail | **QUEUED** | Commercial retail product page with exact SKU/spec/image/shipping/warranty state. |
| Cart | **QUEUED** | Durable editable cart + server-side SKU/price/orderability revalidation. |
| PayPal checkout + Elevation order | **QUEUED / AUTHORIZED** | PayPal Orders v2 + idempotency + durable order + capture/reconciliation. |
| Supplier/freight fulfillment handoff | **QUEUED** | Persist fulfillment source and route the order to the owning supplier/logistics lane. |
| Freight/Hawaii lithium gate | **QUEUED** | Known shipping may sell; unresolved freight/unapproved lithium route fails closed before final charge. |
| Production-parity release system | **COMPLETE / MERGED / QA PASS** | Release foundation and application QA passed in run `34738843664`; exact Version ID + runtime `/__version` proof is ready for the first true release gate. |
| Same-version production acceptance | **WAIT FOR BUILT SITE + OWNER RELEASE** | No rebuild/re-upload. Cut over/promote exact smoke-tested version only after the bounded site build reaches release readiness. |
| First real direct-site order | **FINAL REVENUE PROOF** | Payment → durable order → supplier/freight → fulfillment → realized margin. |

---

# FOREGROUND OPERATIONS

| Work Item | Owner | Current State | Next Action |
|---|---|---|---|
| Owner communications / residual Google Voice forwarding | MPM / Communications Recovery | **P0 CRITICAL — ACCOUNT RECOVERED / VOICE DELETED / RESIDUAL FORWARDING REMAINS** | Carrier/Google clear residual forwarding/state; verify direct inbound call + SMS. |
| eBay customer/cash recovery + profitability contraction | eBay Store Operations under Peter / Company Operations | **P0 PARALLEL — CUSTOMER OBLIGATIONS + CASH RELEASE + LOSS PREVENTION** | Resolve shipment/cancellation/refund obligations and held-cash blockers; preserve positive-contribution core. |
| Existing-shop tuning | MPM / Company Operations / owning channel workers | **ACTIVE — TUNE BEFORE EXPANDING** | Fix current channel product truth, purchase, fulfillment and realized-margin issues. |
| Vendor source truth | Vendor Project managers/specialists | **ACTIVE / SUPPORTING WEB V2** | Maintain exact authorization/SKU/stock/MAP/cost/shipping/warranty/fulfillment truth for Web V2 catalog consumption. |

---

# EXISTING SHOP / CHANNEL STATE

| Lane | Owner | Current State | Next |
|---|---|---|---|
| Shopify Online Store | Shopify Store Operations + Owner | **PRESERVE — SEPARATE CHANNEL** | Preserve working Shopify checkout/payment configuration and current intentional staging. Do not make Shopify the Web V2 direct-site payment owner. |
| Elevation direct site — Legacy runtime | MPM / MASTER DEV | **PRODUCTION ACCEPTED / FALLBACK / VERIFY-ONLY** | Preserve during Web V2 build/cutover. |
| Web V2 | OS 1.1 Project Manager / Web V2 Development | **ACTIVE COMMERCIAL RETAIL BUILD** | Build direct retail revenue path under current Worktree. |
| VEVOR | VEVOR Project Operations Manager / Specialist | **ACTIVE SUPPLIER/CATALOG SOURCE** | Supply exact approved product/source/shipping/economics truth to canonical Web V2 catalog. External channel expansion remains separately controlled. |
| Renogy | Renogy Branch Operations Manager / Specialist | **ACTIVE SUPPLIER/CATALOG SOURCE** | Supply exact dealer/orderability/backorder/cost/shipping/warranty truth to Web V2 catalog. |
| SOK | SOK Project Operations Manager / SOK RECON OS | **ACTIVE PRIMARY SUPPLIER** | Supply exact product/orderability/warranty truth; preserve Hawaii controls. |
| Kingboss | Kingboss Project Operations Manager / Specialist | **ACTIVE STAGE-1 PROVING / CATALOG SOURCE WHEN APPROVED** | Continue exact SKU/MAP/channel/warranty/compliance reconciliation before publication. |
| Apparel / Fourthwall | Apparel Vendor Operations Manager | **ACTIVE SEPARATE APPAREL CHANNEL** | Preserve native fulfillment/economics; not a blocker to lithium/off-grid retail launch. |
| TikTok Shop / Affiliate Growth | TikTok execution + TikTok Affiliate Growth Manager under Peter | **ACTIVE UNDER RESTRICTION / APPEAL TERMINAL-FAILED** | No appeal replay; current-shop tuning only. |

---

# OWNER / HARD HOLDS

| Work Item | State | Reopen Gate |
|---|---|---|
| **Web V2 authorized vendor catalog build** | **ACTIVE / NOT HELD** | Exact supplier/project truth must exist before each SKU is published. |
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
- another homepage redesign.

---

# CLOSED / DO NOT RECREATE

- Legacy direct-site checkout / PayPal bounded repair — CLOSED / PRODUCTION ACCEPTED at `894b15cb12bf75a6a8e81b916e2a9bc2de858f88`.
- Web V2 production-parity release-system reset — COMPLETE / MERGED / QA PASS; do not rebuild the architecture or restore workers.dev acceptance.
- Aborted Legacy audit branch `repair/live-site-audit-20260912` / `5fc55c806c1d7e138a9819a234e85ec932a056cb` — OWNER ROLLED BACK / DO NOT DEPLOY / DO NOT MERGE.
- Audit workflow run `34728792703` — FAILED / DO NOT RERUN AS RELEASE PATH.
- Stale candidate `84af23ec814baa73718e33ec052044ce4706534d` — RETIRED / DO NOT DEPLOY.
- Shopify Payments `Complete setup` blocker — closed/stale; authenticated state accepts payments/receives payouts.
- TikTok verification appeal replay — terminal failed / do not recreate.
- Generic vendor re-onboarding for already authorized suppliers — do not restart.

## Update discipline

1. Owner website target above supersedes older Web V2 sequencing that kept Commerce V2 waiting behind preview acceptance.
2. Web V2 catalog publication is authorized only from exact approved vendor/source truth; this does not reopen external marketplace expansion.
3. Preview URLs are diagnostic only; production-parity smoke is the release acceptance path.
4. One Web V2 Worktree, one primary worker per bounded task, no duplicate development branches for the same objective.
5. Legacy production stays separately protected as rollback/fallback until Web V2 cutover is accepted.
6. Shopify remains a separate channel, not a fallback checkout for Elevation direct-site transactions.
7. No secrets in Git; no accepted candidate rebuild before promotion/cutover.
8. Block only the exact blocked item and continue the next executable revenue-critical task.
9. **HOMEPAGE FIRST → COMMERCE SECOND → RELEASE ONLY AT A TRUE GATE.** Passing release-system QA does not authorize premature candidate creation or production smoke.
10. MASTER RECON returns to triggered integrity after correcting drift; it does not remain a standing executor.

## Current control phrase

**KEEP THE HOMEPAGE → SELL THE PARTNERS → CART → PAYPAL → ORDER → FULFILL → FREIGHT / HAWAII CONTROL → PRODUCTION-PARITY SMOKE → SAME VERSION LIVE → MAKE MONEY.**
