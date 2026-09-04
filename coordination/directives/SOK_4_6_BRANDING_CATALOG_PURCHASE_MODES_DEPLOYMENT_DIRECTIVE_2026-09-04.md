# MANAGEMENT DIRECTION — SOK 4.6 BRANDING + CATALOG PURCHASE MODES

**Elevation UpScales, Inc.**  
**Date:** 2026-09-04

## PURPOSE

Continue SOK 4.6 integration by adding approved SOK branding and separating **catalog visibility** from **checkout readiness**.

The implementation must let Elevation publicly present SOK products before every SKU is fully connected to automated ordering, while preserving all existing commerce, Hawaii, hazmat, freight, MAP, and payment gates.

## CONTROLLING ARCHITECTURE

Use:

**CATALOG FIRST → PURCHASE OPTIONS SECOND → FULL CHECKOUT LAST**

A SOK SKU may be publicly cataloged before direct checkout is enabled.

Catalog status and checkout readiness are separate concepts.

### Public Purchase Mode

Add or extend one per-SKU field:

`public_purchase_mode`

Allowed values:

- `CATALOG_ONLY`
- `CONTACT_TO_ORDER`
- `PURCHASE_OPTIONS`
- `DIRECT_CHECKOUT`
- `UNAVAILABLE`

Customer CTA behavior:

| Internal Mode | Customer CTA |
| --- | --- |
| `CATALOG_ONLY` | View Product |
| `CONTACT_TO_ORDER` | Email Us to Order |
| `PURCHASE_OPTIONS` | See Purchase Options |
| `DIRECT_CHECKOUT` | Add to Cart / Buy Now |
| `UNAVAILABLE` | Currently Unavailable |

During transition, `PURCHASE_OPTIONS` should be the default for most operationally sellable SOK products that are not yet fully checkout-connected.

Do not duplicate products solely to create different CTA behavior. Derive CTA from the per-SKU state.

## PURCHASE OPTIONS PANEL

For `PURCHASE_OPTIONS`, show a clean customer-facing panel:

**Purchase Options**

This SOK product is available through Elevation UpScales. Purchase and shipping options depend on the exact configuration, quantity and destination.

Actions may include:

- **Email Us About This Product**
- **Request Commercial Pricing**
- **Check Hawaii Availability**

Where practical, prefill or submit:

- public SKU
- product name
- quantity
- shipping destination
- intended use
- product URL

Do not expose supplier cost, supplier inventory counts, supplier URLs, internal routing, freight-margin calculations, or other protected data.

## HAWAII PURCHASE BRANCH

Hawaii remains a separate operational branch.

A cataloged SOK product must remain visible even if direct Hawaii checkout is not yet available.

For Hawaii, the public CTA may derive to:

- **Check Hawaii Availability**
- **Request Hawaii Purchase Options**
- **Freight Review Required**

as appropriate to the exact SKU state.

Preserve:

`HAWAII_OPERATIONAL_MAX_QTY = 3`

Hawaii quantity `4+` must continue to route to:

**COMMERCIAL QUANTITY — FREIGHT REVIEW REQUIRED**

and must not enter normal payment flow.

Catalog visibility does not override Hawaii eligibility, hazmat readiness, carrier acceptance, economics approval, or quantity controls.

## COMMERCIAL QUANTITY PATH

Keep **Request Commercial Pricing** available for SOK products even after direct checkout becomes available.

Commercial quantities, rack systems, cabinets, mixed loads, pallet profiles, and repeat supply should continue to have a controlled quote path where Elevation can validate freight, availability, quantity, and margin before commitment.

## SOK BRAND AUTHORIZATION — VERIFIED SOURCE

Written authorization is on file from Kam, Sales Manager at SOK Energy, email message ID:

`1a06cf3a7db66ea2`

Kam wrote:

> “Feel free to use our brand logo on your website and please follow the MAP as listed on the price sheet when uploading our product to your website.”

This gives direct written authorization to use the **SOK brand logo on Elevation's website**, with MAP compliance attached to SOK product publication.

A permanent record has been created at:

`coordination/records/SOK_BRAND_AUTHORIZATION_RECORD_2026-09-04.md`

Do not expand the exact email wording into an unrestricted trademark or creative-asset license for every external marketplace. If TikTok, eBay, Shopify, Amazon, or another channel requests marketplace-specific brand authorization, use the record as supporting evidence and obtain a broader letter from SOK when required.

## WEBSITE BRANDING AUDIT — APPROVED PLACEMENTS

The current site already has a strong Elevation identity. SOK branding should reinforce the lithium division without replacing the Elevation brand.

### 1. Homepage hero — use a restrained SOK proof element

Current homepage hero leads with:

**OFF-GRID POWER • SUPPLY • LOGISTICS**

and routes customers to Lithium Batteries, Solar & Off-Grid, Hawaii Power & Logistics, RV & Outdoor, Start a Project, and Services.

Do not replace the main Elevation hero with a SOK-branded hero.

Instead, add a compact trust/proof treatment near the Lithium route or immediately below the primary routes, such as:

**AUTHORIZED SOK ENERGY DEALER**

with the approved SOK logo and a customer-safe link to the lithium storefront.

This preserves Elevation as the retailer while immediately communicating the manufacturer relationship.

### 2. Homepage product area — feature SOK as the lithium anchor

The existing **CURRENT PRODUCTS / Lithium Batteries** block is a strong location for SOK-branded product cards.

Use qualified SOK product imagery, names, specs, availability mode, and MAP-compliant price.

Prioritize:

- `SK12V100PC`
- `SK48V100N`
- later `SK48V392` when officially available and publication-ready

Cards must remain governed by `public_purchase_mode`.

### 3. Lithium Battery Shop hero — strongest brand placement

The lithium storefront is the best permanent place for SOK branding.

Add a clean dealer strip or hero badge:

**Elevation UpScales, Inc. — Authorized SOK Energy Dealer**

with the approved SOK logo.

Recommended secondary copy:

**Official SOK battery products for RV, solar, off-grid and energy-storage applications.**

Do not make the page look like SOK itself is operating the site. Elevation remains the seller/account relationship.

### 4. Lithium storefront categories

Use the structure inspired by SOK's own public categories because it maps naturally to customer intent:

- 12V Batteries
- 24V Batteries
- 48V Batteries
- Chargers & Accessories
- Rack / Cabinet Systems

Do not blindly copy SOK site text or layout. Use Elevation's existing storefront styling and Catalog architecture.

### 5. Hawaii Lithium hero

The current Hawaii page already states:

**AUTHORIZED SOK ENERGY DEALER**

Retain and visually strengthen this with the approved SOK logo near the dealer badge.

Do not replace the controlled-launch language or Hawaii qualification messaging.

The SOK mark should communicate supply credibility, while Elevation's Hawaii freight process remains the operational focus.

### 6. Product detail pages

Every SOK product page should support:

- SOK logo / manufacturer identification
- exact SKU/model
- official product imagery where use rights are established
- voltage / Ah / kWh
- intended applications
- exact specifications
- approved warranty wording
- official documentation/downloads where appropriate
- availability state
- Hawaii status
- purchase-mode CTA
- commercial-pricing path

Do not present SOK branding on unrelated third-party batteries.

### 7. Solar Builder

SOK is a natural battery-system option inside the Solar Builder, but do not make it a generic SOK advertisement.

When system sizing recommends a compatible battery class, qualified SOK SKUs may be presented as purchasable/reviewable system components with exact compatibility and purchase state.

### 8. Footer / site-wide badge

Do not add a large SOK logo to the global footer at this stage. That would overstate SOK's role across unrelated Home, RV, Marketplace and service sections.

If a site-wide trust signal is later desired, use a small **Authorized SOK Energy Dealer** reference only in battery/off-grid contexts.

## SOK WEBSITE REFERENCE AUDIT

SOK's current public website emphasizes:

- LiFePO4 battery systems for marine, RV, solar and industrial/off-grid applications
- product category navigation by 12V / 24V / 48V / chargers and accessories
- product discovery before technical detail
- system compatibility such as Victron communication on supported products
- customer recommendations / quote paths
- dealer and OEM partnerships
- product literature/downloads

Elevation may use these concepts as information-architecture inspiration, but should retain Elevation's own design language and customer flow.

Do not copy SOK's website wholesale.

Do not automatically download/reuse SOK homepage hero photography merely because logo use is authorized. The verified email expressly authorizes **brand logo use on Elevation's website**. Product imagery or broader creative assets should be used where supplied to Elevation for dealer/product marketing, otherwise keep the right-to-use source documented.

## PRODUCT DISCOVERY VS CHECKOUT

A product page must look complete even when direct checkout is not ready.

A cataloged SOK product should still show:

- approved manufacturer imagery
- complete public specifications
- intended applications
- documentation where appropriate
- warranty information when approved
- Hawaii status
- commercial-order option
- correct purchase CTA

Do not use unfinished/developer wording such as “integration incomplete.”

Preferred transition copy:

**Purchase Options**

Online purchase and shipping options for this configuration depend on quantity and destination.

**See Purchase Options**

For larger quantities, Hawaii delivery, rack systems, or commercial supply, contact Elevation for current pricing and freight options.

## PRE-PURCHASE / BACKORDER RELATIONSHIP

The already-authorized availability modes — available, pre-purchase, backorder and unavailable — are separate from `public_purchase_mode`.

Example:

A SKU can be:

`availability_mode = prepurchase`

and

`public_purchase_mode = PURCHASE_OPTIONS`

The first describes supply timing. The second controls how the customer may transact.

Neither may bypass Hawaii, carrier, economics, MAP, or payment gates.

## MAP CONTROL

SOK's written brand permission expressly includes a MAP condition.

Before publication or price changes:

- verify current SOK MAP source
- prevent coupons/promotions from taking SOK below applicable MAP
- do not apply legacy merchandise promotions to SOK if doing so violates MAP
- retain an auditable source/date for MAP

## ACCEPTANCE TESTS

Deployment must prove:

1. SOK logo appears only in approved battery/off-grid contexts.
2. Elevation remains the primary site/store identity.
3. Authorized dealer wording is accurate and not manufacturer-impersonating.
4. `public_purchase_mode` controls CTA per SKU.
5. Catalog visibility does not require direct checkout readiness.
6. `PURCHASE_OPTIONS` opens a usable purchase-options flow.
7. Product inquiries carry public SKU/product context without supplier-internal data.
8. Hawaii CTA changes appropriately without removing catalog visibility.
9. Hawaii qty `4+` remains blocked from normal payment.
10. Pre-purchase/backorder does not bypass purchase-mode or Hawaii gates.
11. SOK pricing remains MAP compliant.
12. Raw supplier cost, stock count, routing and wholesale terms remain private.
13. SOK logo is not applied to unrelated products.
14. Lower-48 existing commerce remains functional.
15. Existing Pricing 2.0, PayPal, freight, promotion and Catalog protections remain intact.
16. Homepage, Lithium, Hawaii Lithium, Solar Builder, Store, RV Store, Checkout and Admin smoke tests pass.

## DEPLOYMENT AUTHORITY

Continue implementation, testing and Release Candidate preparation without routine approval stops.

Do not deploy to production until the final Management production gate.

## CONTROLLING PRINCIPLES

**ELEVATION IS THE RETAILER. SOK IS THE PRIMARY AUTHORIZED BATTERY PARTNER.**

**CATALOG FIRST → PURCHASE OPTIONS SECOND → FULL CHECKOUT LAST.**

**DO NOT LET CATALOG VISIBILITY BYPASS OPERATIONAL READINESS.**

**EXECUTE → PROVE → REPEAT → SCALE.**
