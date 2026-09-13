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
**Homepage merge receipt:** `6940c32b5c1863d4b60be85427ccff3060e5d396`  
**Retail-navigation merge receipt:** `e2c9e3494bd932c2cde8b0d24e807cbb94706009`  
**Git freshness rule:** resolve current `main` once at bounded-task startup and once immediately before merge unless a real race/conflict appears.  
**Execution-loop guard:** `OS_1_1_EXECUTION_HANDOFF_SOP.md` §2A / §6.

## 1. Mission

Build the smallest complete commercial retail system that can sell authorized vendor products and explain Elevation's lithium/off-grid/freight/Hawaii specialty.

**EXPLAIN → SHOP → PRODUCT → CART → PAYPAL → ORDER → FULFILL.**

Homepage reconstruction and retail-navigation cleanup are complete. Preserve the approved visual baseline. Primary CTA remains **Shop**; secondary CTA remains **Start a Project**.

## 2. Public minimum

Foreground routes:

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

Do not reopen visual redesign, marketplace, collector, broad CMS/admin, speculative AI commerce, new social-channel work, or unrelated service expansion while the revenue path is executable.

## 3. Canonical catalog rule — ACTIVE

One canonical Elevation product catalog. Vendor pages are filtered views of the same product truth.

Owning Vendor Project/source truth remains authoritative for:

- product identity / SKU;
- title/specs/images;
- sell price and MAP/floor state;
- stock/orderability;
- shipping/freight disposition;
- warranty/returns owner;
- fulfillment source;
- channel authorization.

**FAIL CLOSED:** if a required commercial fact is not proven by the owning vendor source, do not infer it. Mark that field `UNVERIFIED` and keep the affected SKU non-orderable or explicitly gated.

Unknown truth holds only the affected field/SKU/vendor. It does **not** block verified products or restart discovery.

## 4. Vendor-source consumption guard — ACTIVE

This section controls the current vendor-file loop.

Vendor truth must remain authoritative, but vendor-file discovery is **finite**.

### Source boundary

For each bounded catalog task:

1. **CREATE OR RECOVER THE BOUNDED IMPLEMENTATION BRANCH FIRST.**
2. Identify the owning Vendor Project/source pointer(s) needed for the current vendor/SKU set.
3. Read each selected source state once and extract the commercial fields it actually proves.
4. Materialize that result into the branch's catalog map/implementation state.
5. If a required fact is absent, ambiguous, stale, or unsupported, record it as `UNVERIFIED` / non-orderable and continue.
6. Do not recursively search for substitute evidence merely to turn an unknown field into a sellable assumption.
7. Do not reopen an unchanged vendor file during the same bounded task.
8. Re-read a vendor source only when its Git SHA/content state changed, the owning Vendor Project explicitly supplied a new pointer, or a concrete contradiction was discovered.

### Stop conditions

Source reading for a vendor/SKU is complete when either:

- the needed field is proven and recorded; or
- the bounded authoritative source set does not prove it, so the field is `UNVERIFIED` and fails closed.

**ABSENT TRUTH IS A DATA STATE, NOT A SEARCH COMMAND.**

Do not attempt to prove every vendor and every SKU before implementation begins. Build the verified subset first. A vendor with unresolved source truth may remain gated while other clean vendors/SKUs advance.

Do not create a new vendor-management/indexing system merely to satisfy this phase. If a single source manifest is not already authoritative, use the owning Vendor Project's current pointers and apply this bounded-read rule.

## 5. Checkout authority

Elevation direct site owns its transaction:

**PRODUCT → CART → SERVER REVALIDATION → CHECKOUT REVIEW → PAYPAL ORDERS v2 → DURABLE ELEVATION ORDER → GUARDED CAPTURE/RECONCILIATION → FULFILLMENT ROUTE.**

No silent Shopify fallback. Shopify/eBay/TikTok remain separate channel/payment/order surfaces. No raw card/CVV handling or storage.

Payment may proceed only when the exact item/destination has a valid shipping disposition. Unknown freight or unapproved Hawaii lithium routing fails closed before final charge.

## 6. Worker routing

| Worker | State | Task |
|---|---|---|
| WEB DEVELOPER | **STANDBY / SUPPORT** | Preserve merged homepage + retail navigation; support bounded Commerce UI needs only. |
| COMMERCE DEVELOPER | **ACTIVE / CURRENT — CANONICAL VENDOR CATALOG** | Create/recover branch, consume bounded vendor truth once, build verified catalog subset, gate unknown fields/SKUs. |
| RELEASE ENGINEER | **READY / SUPPORT** | Act only at a true release gate; preserve exact SHA/version identity and rollback. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Wake only for actual state/lineage conflict, catalog-policy conflict, exact-candidate validation, release integrity, or owner-directed RECON. |

## 7. Build sequence

1. Homepage reconstruction — **COMPLETE / MERGED**.
2. Retail navigation — **COMPLETE / MERGED**.
3. Canonical vendor catalog — **P0 ACTIVE / CURRENT**.
4. Product detail — **NEXT AFTER CATALOG FOUNDATION**.
5. Cart — **QUEUED**.
6. Checkout + PayPal — **QUEUED / AUTHORIZED**.
7. Fulfillment routing — **QUEUED**.
8. Hawaii/freight gates — **QUEUED**.
9. Production-parity smoke — **TRUE RELEASE GATE ONLY**.
10. Same-version cutover/promotion — **OWNER ACCEPTANCE REQUIRED**.
11. First real order — **FINAL REVENUE PROOF**.

## 8. Implementation loop — ACTIVE

Normal catalog loop:

**RE-RESOLVE `main` ONCE → READ THIS WORKTREE → CREATE/RECOVER BOUNDED BRANCH → SELECT BOUNDED VENDOR SOURCE SET → READ EACH SOURCE STATE ONCE → MAP VERIFIED TRUTH / MARK UNKNOWN CLOSED → BUILD VERIFIED SUBSET → QA → RE-RESOLVE `main` BEFORE MERGE → RECONCILE → MERGE → UPDATE WORKTREE → REPORT.**

Hard guards:

- branch creation/recovery precedes exhaustive vendor-file inspection;
- do not reread unchanged Master SOP / Registry / global Board / release architecture;
- do not repeatedly enumerate vendor directories/files after the bounded source set is chosen;
- do not reopen unchanged vendor files to search again for absent data;
- missing supplier facts hold only the affected SKU/vendor;
- no completion receipt before implementation/QA exists;
- an execution-window/context cutoff is not a blocker or owner gate;
- recover existing branch/commit progress instead of restarting discovery;
- normal bounded work uses at most two `main` resolutions unless a genuine race appears.

Priority:

**BRANCH → SOURCE ONCE → MAP TRUTH → BUILD → QA → MERGE → WORKTREE UPDATE → RECEIPT.**

## 9. Release invariant

The production-parity release system is already complete/merged/QA-passed.

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED/CUT OVER → LIVE VERIFY.**

Do not create a candidate merely because release machinery is ready.

## 10. RUN

`RUN` means:

**RESOLVE MAIN ONCE → READ THIS WORKTREE → CREATE/RECOVER CATALOG BRANCH → CONSUME BOUNDED VENDOR SOURCES ONCE → UNKNOWN = UNVERIFIED/NON-ORDERABLE → BUILD VERIFIED PRODUCTS → QA → RESOLVE MAIN BEFORE MERGE → MERGE → UPDATE WORKTREE → CONTINUE.**

Do not stop the catalog for one missing vendor fact. Do not recurse through vendor files trying to eliminate every unknown. Route missing facts to the owning Vendor Project while verified catalog work continues.

## Control phrase

**SOURCE ONCE → MAP VERIFIED TRUTH → UNKNOWN = CLOSED → BUILD VERIFIED SUBSET → QA → MERGE. VERIFIED PRODUCTS SELL; UNKNOWN TRUTH FAILS CLOSED.**
