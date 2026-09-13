# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **ACTIVE — ORDER + FULFILLMENT ROUTING / COMMERCE PHASE**  
**Reports To:** OS 1.1 Project Manager / MPM  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference  
**Canonical catalog + product-detail merge receipt:** `72694ae9ba5b9952c0460b9f90b380cffde4ff23`  
**Cart merge receipt:** `13b4411fc265a1f7b149ad9207059221fa53db32`  
**Checkout merge receipt:** `f5d3ac7cc4b37e8211a3bb460a8507380b75803d`  
**Checkout implementation branch:** `work/web-v2-checkout-2026-09-13` — **MERGED / CLOSED**

## 1. Mission

Build the smallest complete direct-commerce path:

**EXPLAIN → SHOP → PRODUCT → CART → CHECKOUT → PAYMENT / ORDER → FULFILLMENT.**

Homepage, retail navigation, canonical catalog, product detail, cart and checkout review are complete and merged.

## 2. Canonical authority

Canonical product truth remains authoritative. Missing or `UNVERIFIED` commercial facts keep only the affected product/order non-orderable. Do not reopen unchanged vendor sources merely to eliminate a hold.

## 3. Checkout — COMPLETE / MERGED

Merged controls:

- checkout re-resolves cart product IDs and quantities server-side;
- canonical identity, orderability and merchandise subtotal replace client state;
- destination state/ZIP is reviewed server-side;
- only explicitly verified Lower-48 dispositions pass the current destination gate;
- Hawaii, Alaska, ambiguous freight and unverified routes fail closed;
- shipping, tax and final amount due are not invented;
- checkout is non-indexable;
- no payment capture or durable order was fabricated in the checkout phase.

## 4. Worker routing

| Worker | State | Task |
|---|---|---|
| WEB DEVELOPER | **STANDBY / SUPPORT** | Preserve merged customer-facing commerce path. |
| COMMERCE DEVELOPER | **ACTIVE / CURRENT — ORDER + FULFILLMENT ROUTING** | Build the bounded payment/order/fulfillment handoff from server-validated checkout state. |
| RELEASE ENGINEER | **READY / SUPPORT** | Act only at a true release gate. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Wake only for real state, policy, lineage or release conflicts. |

## 5. Build sequence

1. Homepage — **COMPLETE / MERGED**.
2. Retail navigation — **COMPLETE / MERGED**.
3. Canonical vendor catalog — **COMPLETE / MERGED**.
4. Product detail — **COMPLETE / MERGED**.
5. Cart — **COMPLETE / MERGED**.
6. Checkout review — **COMPLETE / MERGED**.
7. Order + fulfillment routing — **P0 ACTIVE / CURRENT**.
8. Hawaii/freight controls — **QUEUED / REQUIRED WHERE APPLICABLE**.
9. Production-parity smoke — **TRUE RELEASE GATE ONLY**.
10. Same-version cutover/promotion — **OWNER ACCEPTANCE REQUIRED**.
11. First real order — **FINAL REVENUE PROOF**.

## 6. Next implementation loop — ORDER + FULFILLMENT ROUTING

Required controls:

- begin from server-validated checkout state, never browser totals;
- revalidate canonical product truth again before any payment/order mutation;
- do not charge when destination/shipping disposition is unresolved;
- preserve direct-site transaction ownership and no Shopify checkout fallback;
- payment provider state must map to a durable Elevation order without duplicate capture;
- fulfillment routing must preserve exact supplier/SKU identity;
- unresolved Hawaii/Alaska/freight routes remain held;
- do not reopen unchanged vendor sources unless product truth changed or a concrete contradiction exists.

Normal loop:

**RESOLVE `main` ONCE → READ THIS WORKTREE → ONE BOUNDED ORDER BRANCH → CONSUME MERGED CHECKOUT + CANONICAL CATALOG → BUILD ORDER/FULFILLMENT HANDOFF → QA → RECONCILE → MERGE → UPDATE WORKTREE → CONTINUE.**

## 7. Release invariant

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED/CUT OVER → LIVE VERIFY.**

Do not create a release candidate merely because checkout completed.

## 8. RUN

`RUN` now means:

**RESOLVE MAIN ONCE → READ THIS WORKTREE → BOUNDED ORDER BRANCH → SERVER REVALIDATION → PAYMENT / DURABLE ORDER / FULFILLMENT ROUTING → QA → RECONCILE → MERGE → UPDATE WORKTREE → CONTINUE.**

## Control phrase

**CATALOG MERGED → PRODUCT DETAIL MERGED → CART MERGED → CHECKOUT MERGED → ORDER + FULFILLMENT ACTIVE. CLIENT STATE IS NOT AUTHORITY; UNKNOWN TRUTH FAILS CLOSED.**
