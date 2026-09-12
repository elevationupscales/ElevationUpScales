# ELEVATION UPSCALES — OWNER DIRECTIVE: COMMERCIAL RETAIL STORE STANDARD

**Date:** 2026-09-12  
**Owner:** Casey Young  
**State:** ACTIVE / P0 RECOVERY TARGET STANDARD  
**Parent Control:** `MANAGEMENT_CODING_REPAIR_PLAN_2026-09-12.md` + `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`

## OWNER DIRECTION

ElevationUpScales.com is a **commercial online retail store**.

Before normal website feature development resumes, the website coding/deployment lane must be fine-tuned around a clean retail operating model that customers can understand and trust.

The recovery target is not another redesign and not another catalog system.

**ONE UNIVERSAL CATALOG → ORGANIZED FOR CUSTOMERS BY BRAND/VENDOR + PRODUCT CATEGORY → ONE TRUSTED PRODUCT RECORD → ONE INTENDED PURCHASE PATH → ONE FULFILLMENT OWNER.**

The immediate priority is:

**FIX TRUST → RESTORE STRUCTURE → CLEAN CUSTOMER-FACING TEXT → SIMPLIFY SHOPPING → PROVE CHECKOUT → HARDEN RELEASE CONTROL → THEN RESUME NORMAL WEBSITE WORK.**

## 1. UNIVERSAL CATALOG IS THE STRUCTURE

The Universal Catalog is the canonical customer-product structure for the Elevation website.

Do not build separate duplicate catalogs for Renogy, SOK, VEVOR, Kingboss, Apparel or later approved vendors merely to organize the storefront.

Each sellable product should resolve to one canonical retail record containing, at minimum:

- exact product identity;
- customer-facing brand;
- internal supplier/vendor owner;
- exact SKU;
- customer-safe title;
- customer-safe description;
- approved media;
- public price / purchase-options state;
- publish state;
- availability/orderability;
- checkout eligibility and destination;
- fulfillment owner/path;
- shipping/destination restrictions;
- trusted product-detail route.

Vendor-specific source files and vendor Projects remain authoritative for vendor facts. The Universal Catalog consumes those facts; it does not invent a second vendor truth.

## 2. CUSTOMER ORGANIZATION

The live retail catalog should make products easy to browse by two primary customer dimensions:

### A. Shop by Brand

Customer-facing examples include:

- Renogy
- SOK
- VEVOR
- Kingboss
- Elevation Apparel
- other approved customer-facing brands as added later

A brand/vendor storefront is a **filtered view of the same Universal Catalog**, not another database or duplicate product record.

### B. Shop by Department / Product Type

Examples include:

- Lithium Batteries
- Solar & Charging
- RV & Mobile Power
- Backup Power
- Outdoor & Off-Grid
- Monitoring & Controls
- Cables & Accessories
- Apparel & Gear

A product can appear in both its brand view and its department view while remaining one underlying product record.

## 3. INTERNAL SUPPLIER ≠ CUSTOMER-FACING BRAND

Internal fulfillment/source relationships must not automatically become customer navigation labels.

Examples:

- Doba may remain an internal supplier/source/fulfillment field; customers do not need a generic `Shop Doba` retail section merely because Doba supplies an item.
- Fourthwall may remain an internal POD/provider/fulfillment field while the customer-facing brand is **Elevation Apparel**.
- Shopify is a commerce platform/purchase path, not a customer-facing product brand.

Where a supplier is also the actual customer-facing brand, such as Renogy, SOK, VEVOR or Kingboss, that brand may be used for customer organization after exact authorization/source truth is verified.

## 4. RETAIL LANGUAGE STANDARD

Every public page must read like a professional commercial retail store.

Customer copy should answer normal retail questions:

- What is this?
- Who makes it?
- What does it do?
- What does it cost?
- Is it available?
- How do I buy it?
- How/when does it ship?
- What happens if special freight or backorder handling is required?

Do not expose internal implementation language to customers.

Prohibited normal public-copy concepts include, unless the words have a legitimate ordinary retail meaning in context:

- worktree;
- lane;
- gate;
- source-of-truth;
- revenue-first;
- activation state;
- reconciliation state;
- quarantine;
- trust-review;
- retail state;
- authoritative controls;
- source-state;
- workflow state;
- developer/QA/release language;
- internal supplier-control explanations customers do not need.

Trust controls should operate **silently** behind the storefront. Customers should see a clean product or a clean unavailable/confirmation state—not an explanation of the internal control system.

## 5. COMMERCIAL RETAIL CUSTOMER PATH

The intended customer path is:

**LAND / SEARCH / BROWSE → BRAND OR DEPARTMENT → PRODUCT → PRICE + AVAILABILITY → DETAILS → ADD/BUY/PURCHASE OPTIONS → CHECKOUT → ORDER RECORD → FULFILLMENT → TRACKING → DELIVERY / SUPPORT.**

Special logistics must be introduced only when the exact product/destination requires it.

Normal Lower-48 retail shopping should stay simple.

## 6. TRUST STANDARD

Customer trust is a P0 requirement.

A product must not reach normal customer discovery if trust-critical data is unresolved.

Trust-critical public data includes:

- identity/SKU;
- customer-facing brand;
- safe title/description;
- approved image provenance;
- price/purchase state;
- publish state;
- availability/orderability;
- checkout target;
- fulfillment owner;
- destination restrictions.

Primary rejection should occur as close to the canonical catalog/API contract as practical. Browser-side filters may remain defense in depth but must not be the main protection against bad source records.

## 7. SHOPABILITY + NAVIGATION STANDARD

The storefront should favor familiar retail navigation over internal company structure.

Preferred customer hierarchy:

**Store → Shop by Brand / Shop by Department / Search → Product → Checkout.**

Vendor/brand views and department views should be generated from the same canonical Universal Catalog data.

Do not require customers to understand Elevation's internal supplier, worker, logistics, platform or Project architecture in order to shop.

## 8. PROTECTED BOUNDARIES

This directive does not unlock protected or settled work.

- The protected top homepage experience remains hard no-touch unless Casey explicitly authorizes the exact change.
- Existing live SOK battery listings/pricing/settled SOK operating work remain protected.
- Working payment/checkout paths are preserved from unrelated refactors.
- Current vendor Projects remain source owners for exact vendor facts.
- The coding-stabilization feature freeze remains active.
- Phase B must finish and pass RECON/PM4 acceptance before Phase C implementation is opened, except for independently authorized customer/order emergencies.

## 9. RECOVERY TARGET

Phases C–E of coding stabilization must converge on this standard:

**UNIVERSAL CATALOG = CANONICAL RETAIL STRUCTURE**  
**CUSTOMER BRAND/VENDOR = PRIMARY BROWSE ATTRIBUTE**  
**PRODUCT CATEGORY = SECONDARY BROWSE ATTRIBUTE**  
**SUPPLIER/FULFILLMENT OWNER = INTERNAL CONTROL FIELD**  
**VENDOR STOREFRONTS = FILTERED VIEWS, NOT DUPLICATE CATALOGS**  
**CUSTOMER COPY = NORMAL COMMERCIAL RETAIL LANGUAGE**  
**TRUST CONTROLS = SILENT + FAIL-CLOSED**  
**CHECKOUT = EXACT PRODUCT-SPECIFIC PURCHASE PATH**

## 10. REOPEN NORMAL DEVELOPMENT

Normal website feature velocity does not resume until the coding-stabilization close conditions are satisfied and Casey explicitly releases the freeze.

A polished-looking page is not enough. The retail operating system must be structurally clean, customer-safe and reproducible through the verified deployment process.

## CONTROL PHRASE

**ONE CATALOG → SHOP BY BRAND OR NEED → CLEAN PRODUCT TRUTH → SIMPLE PURCHASE → RELIABLE FULFILLMENT → TRUSTED CUSTOMER EXPERIENCE.**
