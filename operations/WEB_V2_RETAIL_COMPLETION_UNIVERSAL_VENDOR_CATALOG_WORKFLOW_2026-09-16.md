# ELEVATION UPSCALES — WEB V2 RETAIL COMPLETION / UNIVERSAL VENDOR CATALOG WORKFLOW

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Repository:** `elevationupscales/ElevationUpScales`  
**System:** Elevation OS 1.1  
**Status:** **OWNER APPROVED — ACTIVE**  
**Approved:** 2026-09-16  
**Accepted homepage baseline:** `2ee4c8ba2b41eec940f0280e523e827c1efea8d4`

---

# 1. PRIMARY OBJECTIVE

**BUILD LIVE BUYABLE LISTINGS FIRST.**

The next Web V2 phase is not another homepage redesign and not preservation of old marketplace-era listings.

The commercial target is:

**ONE UNIVERSAL CATALOG → ORGANIZED BY VENDOR → CUSTOMER-READY PRODUCT PAGES → SIMPLE CART → SIMPLE CHECKOUT → PAYPAL → DURABLE ORDER → FULFILLMENT.**

Revenue-producing work outranks optional catalog enrichment, internal dashboards, and architecture polish that does not directly unblock a sale.

---

# 2. OWNER CATALOG DECISION — DO NOT PRESERVE OLD WEBSITE LISTINGS AS SOURCE TRUTH

The previous website accumulated product listings that originated from eBay, Doba, legacy marketplace imports, or other channel-specific records.

Those records are **not** the target catalog source for Web V2.

Do not spend development time trying to preserve, reconcile, migrate, or rescue old customer listings merely because they currently render.

Instead:

**APPROVED VENDOR → CURRENT VENDOR SKU SOURCE → UNIVERSAL ELEVATION CATALOG RECORD → VENDOR-ORGANIZED CUSTOMER VIEW.**

Rules:

- product identity comes from the current approved vendor/source SKU, not an old eBay listing ID or old Doba listing record;
- vendor storefronts are filtered views of the same universal catalog, not separate catalog architectures;
- one product should not exist as separate incompatible eBay/Doba/Shopify/Web V2 records inside the direct-site catalog;
- old listing URLs may redirect to the best current product/catalog destination where useful, but old marketplace listing records do not control product truth;
- source provenance remains recoverable internally;
- protected supplier costs, dealer prices, private inventory, and private correspondence never become public catalog content;
- supplier/project sources remain authoritative for exact SKU, channel, availability, fulfillment, warranty and shipping facts.

The universal catalog should be organized primarily by:

1. **Vendor**
2. Product category / use case
3. Exact SKU / model
4. Customer search terms

Initial vendor lanes:

- SOK
- Renogy
- VEVOR
- Kingboss
- future owner-approved vendors

---

# 3. HOMEPAGE CONTROL

The accepted homepage remains visually locked at the owner-approved baseline unless Casey explicitly reopens a specific homepage defect.

Use its visual language as the retail design master for:

- Store
- Vendor catalog pages
- Product pages
- Cart
- Checkout
- Confirmation

Do not reopen the prior homepage recovery loop.

---

# 4. CUSTOMER-COPY FIREWALL

Internal development, sourcing, architecture, management and verification vocabulary must not leak into customer-facing pages.

Remove customer-visible terms such as:

- source snapshot
- product truth
- canonical state
- verification hold
- supplier sellability
- MAP / floor
- authorized channel
- orderability
- revalidation
- authoritative totals
- fulfillment identity
- internal enum values
- Web V2 / Commerce V2 / phase / architecture status

Keep the logic internally.

Customer-safe states should be ordinary retail language such as:

- In Stock
- Available to Order
- Backorder Available
- Currently Unavailable
- Shipping calculated at checkout
- Contact us about this item

`/healthz`, internal logs, Git, receipts and Ops surfaces may retain implementation status.

---

# 5. PRODUCT ORDERABILITY — MINIMUM TRANSACTION-CRITICAL GATES

Do not let optional admin metadata block a valid sale.

A direct-buy product should require only transaction-critical truth:

- exact vendor / SKU identity;
- correct product identity;
- current customer sell price;
- channel authorization for Elevation direct website;
- supplier availability or exact preorder/backorder authority;
- destination fulfillment capability;
- fulfillment source.

Other useful facts such as richer specs, warranty detail, internal supplier labels, optional media enrichment and internal provenance may improve the listing but must not automatically kill checkout unless their absence creates a real legal, safety, pricing, identity or fulfillment risk.

**ONE MISSING FACT HOLDS ONE AFFECTED SKU/CLAIM — NOT THE ENTIRE STORE.**

---

# 6. LIVE LISTING BUILD SEQUENCE

Do not import the entire vendor universe before proving sales.

Start with the strongest clean SKU cohort.

Preferred order:

1. SOK — anchor battery supplier;
2. Renogy — direct-site solar / charging / inverter / monitoring and Hawaii-capable products where exact route is verified;
3. VEVOR — selected verified direct products;
4. Kingboss — only after exact current vendor truth clears.

For each SKU:

**CURRENT VENDOR SKU → PRODUCT ID → APPROVED MEDIA → CUSTOMER PRICE → AVAILABILITY → SHIPPING/DROPSHIP ROUTE → PRODUCT PAGE → ADD TO CART → CHECKOUT.**

Do not recreate a legacy eBay or Doba listing first and then convert it.

---

# 7. HAWAII — SIMPLE CUSTOMER EXPERIENCE

The internal Hawaii freight/logistics system may remain complex.

The customer experience must be simple.

There are only two customer-facing states:

## A — NORMAL HAWAII CHECKOUT

If the exact vendor/SKU has a verified supplier-direct or otherwise ready Hawaii shipping path, allow ordinary checkout.

Renogy products verified to ship to Hawaii should use normal checkout rather than being forced into the old Hawaii freight workflow.

## B — ASSISTED HAWAII ROUTE

If the exact product requires special freight, lithium routing, quote review, consolidation or manual coordination, do not expose freight matrices, reservations, batches, terminals or internal routing logic.

Show one simple path:

**Hawaii shipping available — email us about this item.**

The email/request should carry the product, SKU, quantity and Hawaii intent where possible.

No Hawaii-wide checkout blocker merely because the destination is Hawaii.

---

# 8. SIMPLE CHECKOUT RULE

Customer checkout target:

**CART → SHIPPING ADDRESS → SHIPPING/TAX → PAYPAL → CONFIRMATION**

Do not expose internal checkout readiness, product revalidation, sales-authority or fulfillment-control language.

Customer checkout should stop only for a real transaction blocker such as:

- selected SKU genuinely unavailable;
- destination cannot be fulfilled;
- legal / DG / carrier restriction applies to that exact route;
- final price cannot safely be determined;
- payment fails;
- exact product identity is not trustworthy enough to sell.

Not valid checkout-wide blockers:

- optional internal metadata;
- another SKU being incomplete;
- unfinished automation;
- manual fulfillment;
- Hawaii merely being Hawaii;
- an internal operations workflow still being complex.

**MANUAL FULFILLMENT IS ACCEPTABLE. LOST SALES CAUSED ONLY BY INTERNAL AUTOMATION GAPS ARE NOT.**

---

# 9. SHIPPING / TAX

Complete the smallest authoritative server-side total calculation needed for the live cohort.

Use the simplest verified mechanism available per product/vendor:

- supplier-provided shipping;
- verified flat shipping;
- destination table;
- verified free shipping;
- verified supplier-direct Hawaii rate/path;
- assisted email route for products that require custom freight.

Do not invent shipping, tax, ETA, Hawaii eligibility or freight rates.

---

# 10. PAYPAL + DURABLE ORDER

Preserve the direct-site authority boundary:

**Elevation Checkout → PayPal Orders v2 → Elevation local order → Elevation fulfillment.**

Connect required runtime bindings/secrets in Cloudflare only; never commit secret values to Git.

Test sequence:

**SANDBOX CREATE → PAYPAL APPROVAL → CAPTURE → LOCAL ORDER → CONFIRMATION → FULFILLMENT READY.**

First real-money transaction remains an owner gate.

---

# 11. COMMERCE DATA BOUNDARY

Use the approved dedicated Web V2 commerce database boundary (`ELEVATION_COMMERCE_DB`) rather than expanding old marketplace-era data coupling.

Legacy `MARKETPLACE_DB` remains migration/reference data where necessary; it should not become the permanent Web V2 universal-catalog/order architecture.

---

# 12. EXECUTION PHASES

## PHASE 1 — CUSTOMER RETAIL CLEANUP

- remove developer/control language from Store / Vendor / Product / Cart / Checkout;
- extend accepted homepage styling into the retail path;
- preserve commerce safety underneath;
- do not redesign homepage.

## PHASE 2 — UNIVERSAL VENDOR CATALOG RESET

- stop treating old eBay/Doba website records as catalog authority;
- define one normalized product schema;
- organize products by vendor;
- make `/shop/<vendor>` a filtered view of the universal catalog;
- build new records from current vendor SKU sources;
- keep old aliases only as redirects where useful.

## PHASE 3 — FIRST BUYABLE SKUS

- clear the first 2–3 strongest SKUs individually;
- build customer-ready product pages;
- enable Add to Cart only for direct-buy-ready products;
- use assisted email only for exact products/routes that truly require it.

## PHASE 4 — CHECKOUT COMPLETION

- resolve shipping/tax/final total;
- remove artificial checkout blockers;
- connect durable order storage;
- connect PayPal sandbox.

## PHASE 5 — SALE PROOF

- full sandbox order;
- owner-approved real purchase;
- payment capture;
- order receipt;
- fulfillment handoff;
- customer confirmation.

## PHASE 6 — SCALE

After first sale proof, import/activate additional vendor SKUs in verified batches using the same universal catalog and checkout path.

---

# 13. ACCEPTANCE

The next milestone is not "catalog architecture complete."

The milestone is:

**AT LEAST ONE CURRENT VENDOR SKU IS VISUALLY CUSTOMER-READY, ADDABLE TO CART, CHECKOUT-READY, PAYPAL-PAYABLE, DURABLY RECORDED, AND FULFILLABLE.**

Then add the next SKU.

---

# 14. CONTROL PHRASE

**MAKE IT LOOK LIKE A STORE. MAKE IT ACT LIKE A STORE. BUILD ONE UNIVERSAL CATALOG FROM CURRENT VENDOR SKUS, ORGANIZED BY VENDOR. DO NOT PRESERVE OLD EBAY/DOBA LISTINGS AS PRODUCT AUTHORITY. IF WE CAN SELL IT, LET THE CUSTOMER BUY IT. KEEP INTERNAL COMPLEXITY INTERNAL. HAWAII IS NORMAL CHECKOUT WHEN THE SUPPLIER SHIPS THERE; OTHERWISE ONE EMAIL-US PATH. PROVE THE FIRST LIVE SALE, THEN SCALE THE CATALOG.**
