# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **ACTIVE — CANONICAL VENDOR CATALOG / COMMERCE PHASE**  
**Reports To:** OS 1.1 Project Manager / MPM  
**Current owner workflow:** `WEB_V2_COMMERCIAL_RETAIL_REBUILD_AND_RELEASE_WORKFLOW_2026-09-12.md`  
**Visual control:** `WEB_V2_VISUAL_SYSTEM_SOP_V1_0.md`  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference  
**Accepted commercial-retail reset baseline:** `9442ffc679b00b8c9b87ff4c6fbb0664b5728881`  
**Current verified build baseline:** `main = e2c9e3494bd932c2cde8b0d24e807cbb94706009`  
**Homepage merge receipt:** `6940c32b5c1863d4b60be85427ccff3060e5d396`  
**Retail-navigation merge receipt:** `e2c9e3494bd932c2cde8b0d24e807cbb94706009`  
**Git freshness rule:** re-resolve then-current `main` before every bounded task; later control-only descendants do not change the owner build order by themselves.  
**Execution-loop guard:** `OS_1_1_EXECUTION_HANDOFF_SOP.md` §2A / §6 — one startup resolve, branch/build immediately, second resolve only before merge unless real drift appears.

## 1. Mission

Rebuild ElevationUpScales.com into the smallest complete commercial retail system that can sell authorized vendor products and explain Elevation's lithium/off-grid/freight/Hawaii specialty.

The website must do this in order:

**EXPLAIN → SHOP → PRODUCT → CART → PAYPAL → ORDER → FULFILL.**

Do not turn Web V2 into another architecture demo, internal OS surface, generic services website or feature collection.

## 2. Homepage rule

The owner-locked homepage reconstruction phase is **COMPLETE / MERGED**.

Preserve the approved hero, freight/logistics presentation, brand feel, visual hierarchy and mobile experience already merged through `6940c32b5c1863d4b60be85427ccff3060e5d396`. Do not reopen a visual redesign while the active catalog phase is executable.

Primary CTA: **Shop**.  
Secondary CTA: **Start a Project**.

## 3. Public minimum

Foreground routes only:

- `/`
- `/store`
- `/shop/<vendor>`
- `/product/<id-or-slug>`
- `/cart`
- `/checkout`
- `/shipping-logistics-services`
- `/hawaii-lithium-batteries`
- `/start-a-project`
- `/privacy`
- `/terms`

Retail-navigation cleanup is **COMPLETE / MERGED** on current `main`. Preserve Shop / approved vendor views / Freight & Hawaii / Start a Project as the foreground sequence. Keep compatibility routes and migration boundaries only where intentionally preserved by the merged implementation.

## 4. Catalog rule — ACTIVE PHASE

One canonical Elevation product catalog. Vendor pages are filtered views of the same product truth.

Vendor Project sources own exact supplier truth. Web V2/Commerce V2 consume only approved:

- product identity / SKU;
- title/specs/images;
- sell price and MAP/floor state;
- stock/orderability;
- shipping/freight disposition;
- warranty/returns owner;
- fulfillment source;
- channel authorization.

**Fail-closed catalog rule:** if any commercial fact required to safely sell an item is not verified by the owning supplier Project/source, do not infer it. Keep that SKU non-orderable or explicitly gated until the missing truth is resolved.

Do not:

- infer price, MAP, cost or margin;
- infer stock or backorder eligibility;
- infer shipping/freight eligibility or cost;
- infer warranty/returns responsibility;
- infer fulfillment source;
- infer channel authorization;
- publish duplicate vendor-storefront truth outside the canonical catalog.

A SKU may be represented for discovery only when its presentation is truthful and its orderability state clearly remains closed. Publication does not create permission to sell.

## 5. Checkout authority

Elevation direct site owns its own transaction:

**PRODUCT → CART → SERVER REVALIDATION → CHECKOUT REVIEW → PAYPAL ORDERS v2 → DURABLE ELEVATION ORDER → GUARDED CAPTURE/RECONCILIATION → FULFILLMENT ROUTE.**

No silent Shopify fallback. Shopify/eBay/TikTok remain separate channel/order/payment surfaces.

No raw card/CVV handling or storage.

## 6. Shipping / Hawaii control

Payment may proceed only when the exact item/destination has a valid shipping disposition.

Allowed states include parcel/known rate, supplier-controlled shipping, approved freight, approved Hawaii lithium route, or manual review/quote. Unknown freight or unapproved lithium routing fails closed before final charge.

The canonical catalog must preserve shipping/Hawaii uncertainty as a gate; it must never convert unknown shipping truth into a purchasable assumption.

## 7. Release system

The production-parity release-system reset is **COMPLETE / MERGED / QA PASS**. QA run `34738843664` passed the release foundation and Web V2 application tests.

Version preview is **diagnostic only** and is no longer the acceptance gate.

Release invariant:

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED / CUT OVER → LIVE VERIFY.**

Runtime truth:

**GIT SHA + CLOUDFLARE VERSION ID + DEPLOYMENT ID.**

### Bootstrap

Before V2 owns the root domain:

**CANDIDATE → SMOKE-ONLY CUSTOM DOMAIN WITH PRODUCTION BINDINGS → RUNTIME VERSION PROOF → OWNER ACCEPTANCE → ROOT-DOMAIN CUTOVER TO SAME WORKER/VERSION → LIVE VERIFY.**

### Steady state

After V2 owns production:

**CANDIDATE → ACCEPTED VERSION 100% + CANDIDATE 0% → REAL PRODUCTION URL + `Cloudflare-Workers-Version-Overrides` → RUNTIME VERSION PROOF → OWNER ACCEPTANCE → CANDIDATE 100% → LIVE VERIFY.**

Rollback restores the last accepted Version ID. No rebuild or re-upload after candidate acceptance.

Do not create a candidate or smoke deployment merely because the release machinery is ready. Release begins only when the bounded site build reaches its true release gate.

## 8. Current worker routing

| Worker | State | Task |
|---|---|---|
| WEB DEVELOPER | **STANDBY / SUPPORT — HOMEPAGE + RETAIL NAV MERGED** | Preserve the merged public shell. Support exact bounded UI needs surfaced by the active Commerce phase; do not reopen homepage redesign or create a competing foreground-navigation branch. |
| COMMERCE DEVELOPER | **ACTIVE / CURRENT — CANONICAL VENDOR CATALOG** | Build one canonical catalog from authoritative supplier Project truth; vendor pages are filtered views. Unverified price, stock, shipping, warranty, fulfillment or channel state stays non-orderable rather than inferred. |
| RELEASE ENGINEER | **READY / ACTIVE SUPPORT — PRODUCTION-PARITY RELEASE** | Release system is already built and QA-passed. Preserve exact SHA/version identity and rollback; act only when the bounded commercial build reaches a true release gate. Do not recreate preview-gated architecture. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Wake for state/lineage conflict, worker drift, supplier-truth conflict affecting catalog control, exact-candidate validation, release-integrity checks, or owner-directed RECON. |

## 9. Build sequence

1. **Homepage reconstruction — COMPLETE / MERGED** at `6940c32b5c1863d4b60be85427ccff3060e5d396`.
2. **Retail navigation — COMPLETE / MERGED** on current `main = e2c9e3494bd932c2cde8b0d24e807cbb94706009`.
3. **Canonical vendor catalog — P0 ACTIVE / CURRENT** — approved supplier truth only; one canonical catalog, vendor-filtered views; unknown commercial truth fails closed.
4. **Product detail — NEXT AFTER CATALOG FOUNDATION** — normal commercial retail presentation from the same canonical truth.
5. **Cart — QUEUED** — durable, editable, server-revalidated.
6. **Checkout + PayPal — QUEUED / AUTHORIZED** — PayPal Orders v2 + durable Elevation order + idempotency.
7. **Fulfillment routing — QUEUED** — supplier/freight source recorded and operable.
8. **Hawaii/freight gates — QUEUED** — fail closed where route/cost approval is missing.
9. **Production-parity smoke — TRUE RELEASE GATE ONLY** — exact candidate/runtime version proof.
10. **Same-version cutover/promotion — OWNER ACCEPTANCE REQUIRED** — live verify + receipt.
11. **First real order — FINAL REVENUE PROOF** — prove payment → order → source → fulfillment → realized margin.

## 10. Holds

Do not delay the active catalog sequence for:

- Ops V2 dashboards;
- broad CMS/admin rebuild;
- marketplace/list-a-vehicle systems;
- collector features;
- new social/channel expansion;
- speculative AI commerce;
- unrelated home-service expansion;
- another visual redesign;
- generic supplier re-onboarding where an owning Vendor Project already exists.

## 11. Execution-loop guard — ACTIVE

For the currently authorized canonical-catalog task, do **not** replay full OS onboarding or broad RECON after the active Worktree is verified.

Normal implementation loop:

**RE-RESOLVE CURRENT `main` ONCE → READ THIS WORKTREE + EXACT CATALOG SOURCE/TASK FILES → CREATE OR RECOVER THE BOUNDED CATALOG BRANCH → IMPLEMENT → QA → RE-RESOLVE `main` ONCE BEFORE MERGE → RECONCILE CONCURRENT CHANGES → MERGE → UPDATE THIS WORKTREE → REPORT.**

Hard guards:

- branch creation/recovery is the first durable repository action after startup verification;
- do not reread unchanged Master SOP / Registry / global Board / release architecture before beginning catalog implementation;
- do not run MASTER RECON again unless a real state conflict, supplier-truth conflict, lineage race or release-integrity issue appears;
- do not prepare a completion receipt before implementation and QA exist;
- an execution-window/context cutoff is **not** a blocker or owner gate;
- if a prior attempt ended with no branch or commit, the next run checks current `main` + this Worktree once, then creates the branch and builds;
- if a branch/commit already exists, recover it instead of restarting discovery;
- supplier truth verification remains required, but missing supplier facts hold only the affected SKU and do not restart management discovery;
- normal bounded work uses no more than two `main` resolutions unless a genuine race is detected.

Priority under constrained execution:

**DURABLE PROGRESS FIRST: BRANCH/COMMIT → QA → MERGE → WORKTREE UPDATE → RECEIPT.**

## 12. RUN

`RUN` means:

**RE-RESOLVE MAIN ONCE → READ THIS WORKTREE + EXACT TASK SOURCES → CREATE/RECOVER BOUNDED BRANCH → EXECUTE THE ACTIVE CANONICAL CATALOG TASK → USE ONLY AUTHORITATIVE SUPPLIER TRUTH → FAIL CLOSED ON UNKNOWN COMMERCIAL FIELDS → QA → RE-RESOLVE MAIN BEFORE MERGE → MERGE → UPDATE WORKTREE → CONTINUE TO PRODUCT DETAIL WHEN CLEAN.**

Do not stop the whole catalog because one SKU or vendor has missing truth. Hold only the affected SKU/state, continue clean verified products, and route the missing fact back to its owning Vendor Project.

Do not skip from catalog work to release merely because the release machinery is ready.

Do not return an execution-window/context-limit status as the completion result when executable repository work remains. Preserve any durable progress and resume through the same bounded branch.

## Control phrase

**RESOLVE ONCE → BRANCH → BUILD → QA → RESOLVE BEFORE MERGE → MERGE → REPORT. HOMEPAGE MERGED → RETAIL NAV MERGED → CANONICAL CATALOG ACTIVE → VERIFIED PRODUCTS SELL → UNKNOWN TRUTH FAILS CLOSED → PRODUCT → CART → PAYPAL → ORDER → FULFILL → RELEASE AT TRUE GATE.**
