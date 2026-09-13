# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **ACTIVE — CART / COMMERCE PHASE**  
**Reports To:** OS 1.1 Project Manager / MPM  
**Current owner workflow:** `WEB_V2_COMMERCIAL_RETAIL_REBUILD_AND_RELEASE_WORKFLOW_2026-09-12.md`  
**Visual control:** `WEB_V2_VISUAL_SYSTEM_SOP_V1_0.md`  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference  
**Accepted commercial-retail reset baseline:** `9442ffc679b00b8c9b87ff4c6fbb0664b5728881`  
**Homepage merge receipt:** `6940c32b5c1863d4b60be85427ccff3060e5d396`  
**Retail-navigation merge receipt:** `e2c9e3494bd932c2cde8b0d24e807cbb94706009`  
**Canonical catalog + product-detail merge receipt:** `72694ae9ba5b9952c0460b9f90b380cffde4ff23`  
**Catalog implementation branch:** `work/web-v2-canonical-catalog-2026-09-13` — **MERGED / CATALOG + PRODUCT DETAIL CLOSED**  
**Execution-loop guard:** `OS_1_1_EXECUTION_HANDOFF_SOP.md` §2A / §6.

## 1. Mission

Build the smallest complete commercial retail system that can sell authorized vendor products and explain Elevation's lithium/off-grid/freight/Hawaii specialty.

**EXPLAIN → SHOP → PRODUCT → CART → PAYPAL → ORDER → FULFILL.**

Homepage reconstruction, retail-navigation cleanup, canonical catalog foundation, vendor filtering and product-detail foundation are complete. Preserve the approved visual baseline. Primary CTA remains **Shop**; secondary CTA remains **Start a Project**.

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

## 3. Canonical catalog rule — MERGED / CONTROLLED

One canonical Elevation product catalog now exists in Web V2. Vendor pages derive from that canonical product truth; product detail resolves the same records.

Owning Vendor Project/source truth remains authoritative for:

- product identity / SKU;
- title/specs/images;
- sell price and MAP/floor state;
- stock/orderability;
- shipping/freight disposition;
- warranty/returns owner;
- fulfillment source;
- channel authorization.

**FAIL CLOSED:** if a required commercial fact is not proven by the owning vendor source, do not infer it. The canonical catalog records that field as `UNVERIFIED` and keeps the affected SKU non-orderable.

`orderable` is derived from required commercial truth; it is not an authored override. Vendor views and product-detail pages do not create sales authority independently.

### Current bounded source holds

The merged catalog intentionally contains the verified subset plus explicit holds:

- **SOK:** selected source proves the supplier relationship/control lane but not an exact public SKU publication record for this snapshot; no SOK SKU was invented and no SOK checkout was enabled.
- **Renogy `RSP100DCT-US`:** hold approved media, current sell price, current MAP/floor and current supplier sellability. Exact backorder authority is preserved.
- **Renogy `RBM500-US`:** hold approved media, current sell price, current MAP/floor and current supplier sellability. Exact backorder authority is preserved.
- **Renogy `RBC2125DS-21W-US`:** hold approved media, current sell price, current MAP/floor, current supplier sellability and delayed-order authority.
- **VEVOR `XXKLJT124INCLJF0QV0`:** source sell price is preserved; hold approved specs, approved media, exact current floor amount and exact delayed-order authority. Supplier sellability/price/MAP still requires live revalidation before purchase.
- **VEVOR `AXLSTCQJDSYKAZ99C001V0`:** source sell price is preserved; hold approved specs, approved media, exact current floor amount and exact delayed-order authority. Supplier sellability/price/MAP still requires live revalidation before purchase.
- **VEVOR `D25FT14IN20AHOGLOV1`:** source sell price is preserved; hold approved specs, approved media, exact current floor amount and exact delayed-order authority. Supplier sellability/price/MAP still requires live revalidation before purchase.
- **Kingboss `D01027HH7BV` / Model 133:** exact linkage and 12V 100Ah identity are preserved; hold approved media, sell price, MAP/floor, delayed-order state, exact shipping disposition, warranty/returns ownership, selected fulfillment source and exact channel authorization.

These holds belong to their owning Vendor Projects. Do not reopen unchanged vendor files merely to try to eliminate an `UNVERIFIED` state.

## 4. Vendor-source consumption guard — CONTROLLED

Vendor truth remains authoritative, but vendor-file discovery is finite.

For a future bounded catalog refresh:

1. identify the owning Vendor Project/source pointer needed for the affected vendor/SKU;
2. read each changed/selected source state once;
3. map only the commercial fields the source actually proves;
4. absent/ambiguous/stale facts remain `UNVERIFIED` / non-orderable;
5. do not recursively search for substitute evidence to manufacture sellability;
6. do not reopen an unchanged vendor file during the same bounded task;
7. reread only when its Git SHA/content changed, the owning Vendor Project supplied a new pointer, or a concrete contradiction was discovered.

**ABSENT TRUTH IS A DATA STATE, NOT A SEARCH COMMAND.**

## 5. Checkout authority

Elevation direct site owns its transaction:

**PRODUCT → CART → SERVER REVALIDATION → CHECKOUT REVIEW → PAYPAL ORDERS v2 → DURABLE ELEVATION ORDER → GUARDED CAPTURE/RECONCILIATION → FULFILLMENT ROUTE.**

No silent Shopify fallback. Shopify/eBay/TikTok remain separate channel/payment/order surfaces. No raw card/CVV handling or storage.

Payment may proceed only when the exact item/destination has a valid shipping disposition. Unknown freight or unapproved Hawaii lithium routing fails closed before final charge.

## 6. Worker routing

| Worker | State | Task |
|---|---|---|
| WEB DEVELOPER | **STANDBY / SUPPORT** | Preserve merged homepage + retail navigation + catalog/product-detail presentation; support bounded Commerce UI needs only. |
| COMMERCE DEVELOPER | **ACTIVE / CURRENT — CART** | Build cart from canonical product IDs only. Non-orderable/`UNVERIFIED` products cannot become purchasable through client state. Preserve later server revalidation. |
| RELEASE ENGINEER | **READY / SUPPORT** | Act only at a true release gate; preserve exact SHA/version identity and rollback. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Wake only for actual state/lineage conflict, catalog-policy conflict, exact-candidate validation, release integrity, or owner-directed RECON. |

## 7. Build sequence

1. Homepage reconstruction — **COMPLETE / MERGED**.
2. Retail navigation — **COMPLETE / MERGED**.
3. Canonical vendor catalog — **COMPLETE / MERGED**.
4. Product detail — **COMPLETE / MERGED**.
5. Cart — **P0 ACTIVE / CURRENT**.
6. Checkout + PayPal — **QUEUED / AUTHORIZED**.
7. Fulfillment routing — **QUEUED**.
8. Hawaii/freight gates — **QUEUED**.
9. Production-parity smoke — **TRUE RELEASE GATE ONLY**.
10. Same-version cutover/promotion — **OWNER ACCEPTANCE REQUIRED**.
11. First real order — **FINAL REVENUE PROOF**.

## 8. Next implementation loop — CART

Cart is a customer convenience layer over canonical product identity; it is not commerce authority.

Required controls:

- cart line identity resolves by canonical product ID/SKU;
- held/non-orderable products cannot be added as purchasable lines;
- client-side quantity/price state is never authoritative;
- cart display may use canonical snapshot data, but final sellability, price, shipping/freight, destination eligibility and delayed-order authority are revalidated server-side before checkout/payment;
- no Shopify checkout fallback;
- do not connect PayPal in the cart phase merely because the later checkout architecture is authorized;
- preserve homepage, retail navigation, vendor views and product detail.

Normal cart loop:

**RESOLVE `main` ONCE → READ THIS WORKTREE → CREATE/RECOVER ONE BOUNDED CART BRANCH → CONSUME THE MERGED CANONICAL CATALOG → BUILD CART → QA → RECONCILE CURRENT BASE → MERGE → UPDATE WORKTREE → CONTINUE.**

Do not reread unchanged vendor source files for cart implementation. The merged catalog is the cart's product input; vendor sources wake only for a changed product truth or a concrete contradiction.

## 9. Release invariant

The production-parity release system is already complete/merged/QA-passed.

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED/CUT OVER → LIVE VERIFY.**

Do not create a candidate merely because release machinery is ready. Cart is not a release gate.

## 10. RUN

`RUN` now means:

**RESOLVE MAIN ONCE → READ THIS WORKTREE → BOUNDED CART BRANCH → CANONICAL PRODUCT IDS ONLY → HELD PRODUCTS FAIL CLOSED → BUILD CART → QA → RECONCILE → MERGE → UPDATE WORKTREE → CONTINUE.**

Do not restart catalog/vendor-source discovery unless a product truth actually changed.

## Control phrase

**CATALOG MERGED → PRODUCT DETAIL MERGED → CART ACTIVE. CLIENT STATE IS NOT AUTHORITY; UNKNOWN TRUTH FAILS CLOSED.**
