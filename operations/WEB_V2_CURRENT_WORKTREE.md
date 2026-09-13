# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **ACTIVE — HAWAII / FREIGHT + PAYMENT READINESS / COMMERCE PHASE**  
**Reports To:** OS 1.1 Project Manager / MPM  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference  
**Canonical catalog + product-detail merge receipt:** `72694ae9ba5b9952c0460b9f90b380cffde4ff23`  
**Cart merge receipt:** `13b4411fc265a1f7b149ad9207059221fa53db32`  
**Checkout merge receipt:** `f5d3ac7cc4b37e8211a3bb460a8507380b75803d`  
**Order + fulfillment handoff merge receipt:** `cd8e21ef4a89c261a4580b683da54be8a896787a`  
**Order implementation branch:** `work/web-v2-order-2026-09-13` — **MERGED / CLOSED**

## 1. Mission

Build the smallest complete direct-commerce path:

**EXPLAIN → SHOP → PRODUCT → CART → CHECKOUT → PAYMENT / ORDER → FULFILLMENT.**

Homepage, retail navigation, canonical catalog, product detail, cart, checkout review, durable-order orchestration and fulfillment routing are merged. Payment activation remains fail-closed until every authoritative total and runtime binding is proven.

## 2. Canonical authority

Canonical product truth remains authoritative. Missing or `UNVERIFIED` commercial facts keep only the affected product/order non-orderable. Client/browser totals never create sales authority. Do not reopen unchanged vendor sources merely to eliminate a hold.

## 3. Order + fulfillment handoff — MERGED / ACTIVATION HELD

Merged controls:

- final order preparation revalidates canonical product, orderability and destination state again;
- checkout collects the customer contact and full U.S. shipping record required for a durable order;
- exact vendor, Elevation SKU, supplier SKU and fulfillment source are preserved per line;
- local order storage is created before provider-order creation when `MARKETPLACE_DB` is available;
- PayPal Orders v2 create/capture use deterministic request IDs and an explicit idempotency key;
- live PayPal remains locked unless `STORE_LIVE_CHECKOUT_ENABLED=true` in addition to live credentials;
- capture reloads the durable order, revalidates canonical truth and compares stored authoritative totals before capture;
- an already-captured order returns idempotently rather than calling the provider again;
- order and capture APIs are same-origin POST only;
- no raw card/CVV handling and no Shopify checkout fallback were introduced.

### Activation holds — CONTROLLED

The merged runtime intentionally does **not** create a PayPal order under current production truth because:

- Web V2 has no committed, verified `MARKETPLACE_DB` D1 binding identity;
- authoritative shipping amount is not yet available for the general direct-order path;
- authoritative sales-tax amount/disposition is not yet approved/configured for the Web V2 order total;
- therefore final `amountDue` remains unverified;
- the current merged canonical catalog still has no orderable SKU.

**DO NOT invent a D1 database ID, shipping amount, tax amount, orderability state or live-payment readiness to clear these holds.**

## 4. Worker routing

| Worker | State | Task |
|---|---|---|
| WEB DEVELOPER | **STANDBY / SUPPORT** | Preserve the merged customer-facing commerce path. |
| COMMERCE DEVELOPER | **ACTIVE / CURRENT — HAWAII / FREIGHT + PAYMENT READINESS** | Connect authoritative shipping/freight and final-charge readiness to the merged order handoff without weakening fail-closed controls. |
| RELEASE ENGINEER | **READY / SUPPORT** | Supply/verify exact runtime bindings and perform sandbox/release work only at a true gate; do not invent binding IDs. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Wake only for real state, policy, lineage, charge-authority or release conflicts. |

## 5. Build sequence

1. Homepage — **COMPLETE / MERGED**.
2. Retail navigation — **COMPLETE / MERGED**.
3. Canonical vendor catalog — **COMPLETE / MERGED**.
4. Product detail — **COMPLETE / MERGED**.
5. Cart — **COMPLETE / MERGED**.
6. Checkout review — **COMPLETE / MERGED**.
7. Order + fulfillment handoff — **COMPLETE / MERGED; PAYMENT ACTIVATION HELD**.
8. Hawaii/freight + authoritative charge readiness — **P0 ACTIVE / CURRENT**.
9. PayPal sandbox + durable-order proof — **QUEUED / GATED BY STEP 8 + RUNTIME BINDING**.
10. Production-parity smoke — **TRUE RELEASE GATE ONLY**.
11. Same-version cutover/promotion — **OWNER ACCEPTANCE REQUIRED**.
12. First real order — **FINAL REVENUE PROOF**.

## 6. Next implementation loop — HAWAII / FREIGHT + PAYMENT READINESS

Required controls:

- consume the merged order handoff and canonical product identity; do not rebuild checkout/order architecture;
- connect only authoritative shipping/freight amounts to the final order total;
- Hawaii, Alaska, freight and quote-required routes remain held until the exact product/destination route is verified;
- add/consume explicit sales-tax authority before `amountDue` can become payment-ready;
- verify the exact existing `MARKETPLACE_DB` binding identity through the proper runtime/release source before activation; never guess a D1 ID;
- preserve durable-order-before-provider creation and idempotent capture;
- preserve exact supplier/SKU/fulfillment identity;
- no Shopify checkout fallback and no raw card data;
- do not reopen unchanged vendor sources unless product truth changed or a concrete contradiction exists.

Normal loop:

**RESOLVE `main` ONCE → READ THIS WORKTREE → ONE BOUNDED FREIGHT/PAYMENT-READINESS BRANCH → CONSUME MERGED ORDER HANDOFF → AUTHORITATIVE SHIPPING/FREIGHT + TAX/TOTAL GATES → QA → RECONCILE → MERGE → UPDATE WORKTREE → CONTINUE.**

## 7. Release invariant

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED/CUT OVER → LIVE VERIFY.**

Do not create a release candidate merely because the order handoff merged. Sandbox/payment activation requires the charge and runtime-binding gates above.

## 8. RUN

`RUN` now means:

**RESOLVE MAIN ONCE → READ THIS WORKTREE → BOUNDED FREIGHT/PAYMENT-READINESS BRANCH → PRESERVE CANONICAL ORDER HANDOFF → VERIFY AUTHORITATIVE SHIPPING/FREIGHT + TAX/TOTAL + RUNTIME BINDING GATES → QA → RECONCILE → MERGE → UPDATE WORKTREE → CONTINUE.**

## Control phrase

**CATALOG MERGED → PRODUCT DETAIL MERGED → CART MERGED → CHECKOUT MERGED → ORDER/FULFILLMENT HANDOFF MERGED → FREIGHT + PAYMENT READINESS ACTIVE. CLIENT STATE IS NOT AUTHORITY; UNKNOWN TRUTH FAILS CLOSED.**
