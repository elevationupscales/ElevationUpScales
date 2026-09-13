# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **ACTIVE — CHECKOUT / COMMERCE PHASE**  
**Reports To:** OS 1.1 Project Manager / MPM  
**Current owner workflow:** `WEB_V2_COMMERCIAL_RETAIL_REBUILD_AND_RELEASE_WORKFLOW_2026-09-12.md`  
**Visual control:** `WEB_V2_VISUAL_SYSTEM_SOP_V1_0.md`  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference  
**Accepted commercial-retail reset baseline:** `9442ffc679b00b8c9b87ff4c6fbb0664b5728881`  
**Homepage merge receipt:** `6940c32b5c1863d4b60be85427ccff3060e5d396`  
**Retail-navigation merge receipt:** `e2c9e3494bd932c2cde8b0d24e807cbb94706009`  
**Canonical catalog + product-detail merge receipt:** `72694ae9ba5b9952c0460b9f90b380cffde4ff23`  
**Cart merge receipt:** `13b4411fc265a1f7b149ad9207059221fa53db32`  
**Catalog implementation branch:** `work/web-v2-canonical-catalog-2026-09-13` — **MERGED / CLOSED**  
**Cart implementation branch:** `work/web-v2-cart-2026-09-13` — **MERGED / CLOSED**

## 1. Mission

Build the smallest complete commercial retail system:

**EXPLAIN → SHOP → PRODUCT → CART → CHECKOUT → ORDER → FULFILL.**

Homepage, retail navigation, canonical catalog, product detail and cart are complete. Preserve the approved visual baseline and merged commerce controls.

## 2. Canonical product authority

One canonical Elevation product catalog drives product truth across vendor pages, product detail and cart.

If a required commercial fact is absent or `UNVERIFIED`, the affected product remains non-orderable. Do not infer missing product truth and do not reopen unchanged vendor sources merely to eliminate a hold.

## 3. Cart — COMPLETE / MERGED

The merged cart is a convenience layer over canonical product identity, not a source of commercial authority.

Controls now merged:

- browser state stores product IDs and quantities only;
- `/api/cart/resolve` resolves saved lines against the canonical catalog;
- unknown, malformed, over-limit and non-orderable lines fail closed;
- client-supplied titles or prices are ignored;
- displayed cart pricing is rebuilt from canonical product truth;
- product detail exposes **Add to Cart** only when canonical `orderable === true`;
- current held catalog products therefore remain non-purchasable;
- no alternate checkout fallback was added in the cart phase.

## 4. Worker routing

| Worker | State | Task |
|---|---|---|
| WEB DEVELOPER | **STANDBY / SUPPORT** | Preserve merged homepage, navigation, catalog, product detail and cart presentation. |
| COMMERCE DEVELOPER | **ACTIVE / CURRENT — CHECKOUT** | Build the bounded direct-site checkout phase from merged cart and canonical product truth. |
| RELEASE ENGINEER | **READY / SUPPORT** | Act only at a true release gate; preserve exact SHA/version identity and rollback. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Wake only for a real state/lineage conflict, commerce-policy conflict, release integrity issue, or owner-directed RECON. |

## 5. Build sequence

1. Homepage reconstruction — **COMPLETE / MERGED**.
2. Retail navigation — **COMPLETE / MERGED**.
3. Canonical vendor catalog — **COMPLETE / MERGED**.
4. Product detail — **COMPLETE / MERGED**.
5. Cart — **COMPLETE / MERGED**.
6. Checkout — **P0 ACTIVE / CURRENT**.
7. Order + fulfillment routing — **QUEUED**.
8. Hawaii/freight controls — **QUEUED / REQUIRED WHERE APPLICABLE**.
9. Production-parity smoke — **TRUE RELEASE GATE ONLY**.
10. Same-version cutover/promotion — **OWNER ACCEPTANCE REQUIRED**.
11. First real order — **FINAL REVENUE PROOF**.

## 6. Next implementation loop — CHECKOUT

Checkout must consume requested product IDs/quantities from the merged cart and re-resolve the current canonical product state before allowing an order to advance.

Required controls:

- server-side canonical product resolution;
- non-orderable or changed products fail closed;
- current authoritative totals are recalculated from canonical truth;
- exact shipping/destination eligibility is required before the order advances;
- unknown Hawaii/Alaska/freight disposition holds only the affected order/line;
- browser cart state is never authoritative checkout state;
- preserve the merged storefront and cart;
- do not reopen unchanged vendor source files unless product truth changed or a concrete contradiction is found.

Normal checkout loop:

**RESOLVE `main` ONCE → READ THIS WORKTREE → CREATE/RECOVER ONE BOUNDED CHECKOUT BRANCH → CONSUME MERGED CART + CANONICAL CATALOG → BUILD CHECKOUT → QA → RECONCILE CURRENT BASE → MERGE → UPDATE WORKTREE → CONTINUE.**

## 7. Release invariant

The production-parity release system remains unchanged.

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED/CUT OVER → LIVE VERIFY.**

Do not create a release candidate merely because cart completed.

## 8. RUN

`RUN` now means:

**RESOLVE MAIN ONCE → READ THIS WORKTREE → BOUNDED CHECKOUT BRANCH → CANONICAL SERVER REVALIDATION → BUILD CHECKOUT → QA → RECONCILE → MERGE → UPDATE WORKTREE → CONTINUE.**

## Control phrase

**CATALOG MERGED → PRODUCT DETAIL MERGED → CART MERGED → CHECKOUT ACTIVE. CLIENT STATE IS NOT AUTHORITY; UNKNOWN TRUTH FAILS CLOSED.**
