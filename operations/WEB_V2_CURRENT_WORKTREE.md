# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **ACTIVE — RETAIL COMPLETION / UNIVERSAL VENDOR CATALOG / FIRST BUYABLE LISTINGS**  
**Reports To:** OS 1.1 Project Manager / Master Project Manager  
**Controlling workflow:** `WEB_V2_RETAIL_COMPLETION_UNIVERSAL_VENDOR_CATALOG_WORKFLOW_2026-09-16.md`  
**Accepted homepage baseline:** `2ee4c8ba2b41eec940f0280e523e827c1efea8d4`  
**Active branch:** `work/web-v2-universal-vendor-catalog-retail-2026-09-16`

---

# 1. CURRENT OWNER DIRECTION

The homepage recovery/edit loop is closed.

The next Web V2 objective is:

**ONE UNIVERSAL CATALOG → ORGANIZED BY VENDOR → LIVE BUYABLE LISTINGS → SIMPLE CART/CHECKOUT → PAYPAL → DURABLE ORDER → FULFILLMENT.**

The old website listings that were built from eBay, Doba, Legacy marketplace/channel records or similar imports are not product authority for the Web V2 catalog.

Do not spend time preserving or reconciling them merely because they already render.

Build current direct-site listings from current approved vendor SKU sources.

Vendor routes are filtered views of one universal catalog, not separate product systems.

---

# 2. CONTROLLED BASELINE

Current accepted homepage baseline:

`2ee4c8ba2b41eec940f0280e523e827c1efea8d4`

Homepage styling is the visual master for the remaining customer journey.

Do not reopen broad homepage design unless Casey explicitly identifies a specific defect.

Historical recovery states, old visual branches and prior candidate loops are reference only.

---

# 3. ACTIVE PHASE

## PHASE 1 — CUSTOMER RETAIL CLEANUP + UNIVERSAL CATALOG RESET

Immediate work:

1. remove developer/control language from Store, Vendor, Product, Cart and Checkout customer views;
2. extend the accepted homepage visual system into those pages;
3. stop using old eBay/Doba/marketplace listing records as Web V2 catalog authority;
4. preserve one normalized universal product catalog organized by vendor;
5. prepare the first current vendor SKUs for actual purchase;
6. simplify Hawaii customer handling to normal checkout when the exact supplier route is ready, otherwise one `Email us about this item` path;
7. simplify checkout so only real transaction blockers stop payment.

---

# 4. UNIVERSAL CATALOG MODEL

Source direction:

**APPROVED VENDOR → CURRENT VENDOR SKU SOURCE → NORMALIZED ELEVATION PRODUCT → `/store` + `/shop/<vendor>` + `/product/<id>` → ONE CART / CHECKOUT.**

Initial vendor lanes:

- SOK
- Renogy
- VEVOR
- Kingboss
- future owner-approved vendors

Old channel listing IDs may survive only as compatibility redirects where useful.

They do not control price, availability, orderability, media, shipping or product identity.

---

# 5. LIVE-SALE PRIORITY

Do not wait for the whole catalog.

Clear products individually.

Preferred sequencing:

1. SOK anchor battery products;
2. Renogy solar / charging / inverter / monitoring products and exact Hawaii-capable routes;
3. selected VEVOR direct products;
4. Kingboss only when exact current source truth clears.

One incomplete SKU must not block another verified SKU.

---

# 6. CUSTOMER CHECKOUT RULE

Target flow:

**CART → ADDRESS → SHIPPING/TAX → PAYPAL → CONFIRMATION.**

Do not expose product-truth/revalidation/orderability/source-snapshot/architecture language to customers.

Manual fulfillment is acceptable.

Incomplete internal automation is not, by itself, a valid reason to stop a transaction.

Keep only real SKU/destination/legal/price/payment blockers.

---

# 7. HAWAII CUSTOMER RULE

Do not expose the internal Hawaii freight system.

For an exact SKU:

- verified supplier-direct / ready Hawaii route → normal checkout;
- special freight/manual route → `Hawaii shipping available — email us about this item.`

Renogy Hawaii-capable products should not be forced through the old freight workflow when the exact supplier route is verified.

---

# 8. PAYMENT / ORDER

Preserve:

**Elevation Checkout → PayPal Orders v2 → Elevation durable order → Elevation fulfillment.**

Finish the smallest authoritative shipping/tax calculation required for the first live cohort.

Use the dedicated V2 commerce data boundary (`ELEVATION_COMMERCE_DB`) rather than expanding legacy marketplace coupling.

First real-money Web V2 transaction remains an owner gate.

---

# 9. EXECUTION LOOP

**RESOLVE CURRENT MAIN ONCE → WORK FROM ACTIVE BRANCH → CUSTOMER COPY/STYLE CLEANUP → UNIVERSAL VENDOR CATALOG → FIRST LIVE SKU → CART/CHECKOUT → PAYPAL/ORDER → QA → OWNER REAL-SALE GATE → SCALE.**

Do not restart historical visual recovery.

Do not rebuild separate vendor storefront architectures.

Do not preserve old marketplace records as product truth.

---

# 10. CURRENT CONTROL PHRASE

**MAKE IT LOOK LIKE A STORE. MAKE IT ACT LIKE A STORE. BUILD ONE UNIVERSAL CATALOG FROM CURRENT VENDOR SKUS, ORGANIZED BY VENDOR. DO NOT PRESERVE OLD EBAY/DOBA LISTINGS AS PRODUCT AUTHORITY. IF WE CAN SELL IT, LET THE CUSTOMER BUY IT. KEEP INTERNAL COMPLEXITY INTERNAL. HAWAII IS NORMAL CHECKOUT WHEN THE SUPPLIER SHIPS THERE; OTHERWISE ONE EMAIL-US PATH. PROVE THE FIRST LIVE SALE, THEN SCALE THE CATALOG.**
