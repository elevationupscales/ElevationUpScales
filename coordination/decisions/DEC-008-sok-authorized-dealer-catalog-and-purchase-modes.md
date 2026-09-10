# DEC-008 - SOK Authorized Dealer Branding, Catalog Visibility, and Purchase Modes

**Date:** 2026-09-04  
**Owner / Authority:** Elevation UpScales Management  
**Status:** ACCEPTED

## Decision

SOK Energy is Elevation UpScales' primary authorized battery partner. Public SOK catalog visibility is independent from checkout readiness.

A SOK SKU may be publicly presented before automated ordering is complete, provided the product is accurately represented and its public purchase mode reflects the real operational state.

The controlling rollout is:

**CATALOG FIRST -> PURCHASE OPTIONS SECOND -> FULL CHECKOUT LAST**

## Brand authorization evidence

SOK Sales Manager Kam wrote in Gmail message `1a06cf3a7db66ea2`:

> "Feel free to use our brand logo on your website and please follow the MAP as listed on the price sheet when uploading our product to your website."

This establishes written authorization for SOK logo use on Elevation's website, with MAP compliance as an explicit condition.

The exact sentence names website use. It should be retained as marketplace-supporting evidence, but it must not be expanded into a claim of an unrestricted trademark license for every third-party marketplace. If TikTok Shop, eBay, Shopify, or another platform requires marketplace-specific authorization, obtain a short SOK authorization letter for that use.

## Public positioning

Approved relationship language:

**Elevation UpScales, Inc. - Authorized SOK Energy Dealer**

SOK must be presented as the manufacturer/brand. Elevation remains the dealer, seller, commercial coordinator, and logistics operator.

Do not imply that Elevation manufactures SOK batteries or that SOK is Elevation's dangerous-goods carrier.

## Brand placement hierarchy

SOK should strengthen Elevation's battery credibility without replacing Elevation's primary company identity.

### Homepage

Keep the Elevation hero as the primary brand statement. Add SOK as a proof/partner element around the lithium shopping route, not as the dominant homepage brand.

Recommended treatment:

- compact SOK logo + `Authorized SOK Energy Dealer`
- located near the lithium route or immediately before/within the current-products lithium section
- link into the SOK/lithium catalog rather than to an external supplier storefront

### Lithium Battery Shop

This is the strongest permanent SOK brand placement.

Add:

- SOK logo
- `Authorized SOK Energy Dealer`
- SOK-focused category/filter support
- 12V / 24V / 48V / Cabinets & Accessories organization as useful
- SOK product cards mixed into the same Elevation Master Catalog

Do not create a separate SOK database or duplicate catalog.

### Hawaii Lithium

Keep the current controlled-launch logic. Add visible SOK branding near the existing authorized-dealer statement.

The SOK logo must not weaken or hide:

- Hawaii quantity 1-3 controlled launch
- quantity 4+ commercial freight review
- carrier/economics gates
- freight review state

### Product pages

Every SOK product page should feel complete even when checkout is not yet enabled.

Use verified:

- SOK logo / manufacturer identity
- exact model and SKU
- official product imagery that Elevation is authorized to use
- voltage / Ah / Wh or kWh
- dimensions / weight where verified
- use cases
- compatibility details
- approved warranty language
- official literature/downloads
- Hawaii status
- commercial-order path
- current purchase CTA

Do not fabricate missing specifications or infer one SKU's specs from another.

### Solar Builder

Qualified SOK products may be incorporated as actual battery choices as the builder evolves from education into product/system configuration.

### Footer / unrelated service pages

Do not place a large global SOK logo across unrelated Home Services, Marketplace, or field-service experiences. SOK is a strategic battery relationship, not the umbrella brand for the entire company.

## Public purchase modes

Every SOK SKU must have one `public_purchase_mode` independent from catalog visibility and independent from inventory/availability mode.

Allowed values:

- `CATALOG_ONLY`
- `CONTACT_TO_ORDER`
- `PURCHASE_OPTIONS`
- `DIRECT_CHECKOUT`
- `UNAVAILABLE`

Derived customer behavior:

| Admin mode | Customer CTA |
|---|---|
| `CATALOG_ONLY` | View Product |
| `CONTACT_TO_ORDER` | Email Us to Order |
| `PURCHASE_OPTIONS` | See Purchase Options |
| `DIRECT_CHECKOUT` | Add to Cart / Buy Now |
| `UNAVAILABLE` | Currently Unavailable |

For the transition period, `PURCHASE_OPTIONS` is the preferred default for cataloged SOK products that are commercially available but not yet fully connected to Elevation's automated purchasing/checkout workflow.

## Purchase-options panel

`PURCHASE_OPTIONS` should open a simple customer-safe panel such as:

**Purchase Options**  
This SOK product is available through Elevation UpScales. Ordering options may depend on quantity and destination.

Actions:

- Email Us About This Product
- Request Commercial Pricing
- Check Hawaii Availability

The inquiry should automatically carry customer-safe context:

- product name
- SOK SKU
- requested quantity
- destination
- intended use, optional
- product URL

Do not expose supplier cost, raw supplier inventory, source URLs, internal warehouse routing, carrier calculations, or Elevation margin.

## Availability mode remains separate

Public purchase mode and inventory/fulfillment state are separate controls.

Examples:

- `PURCHASE_OPTIONS` + `AVAILABLE`
- `PURCHASE_OPTIONS` + `PREPURCHASE`
- `CONTACT_TO_ORDER` + `BACKORDER`
- `DIRECT_CHECKOUT` + `AVAILABLE`

Do not fake `IN STOCK` status to enable pre-purchase/backorder.

## Pre-purchase / backorder

Pre-purchase and backorder remain authorized customer availability states when Management has approved order acceptance.

They do not bypass:

- exact-SKU qualification
- Hawaii eligibility
- hazmat readiness
- carrier acceptance
- economics approval
- Hawaii operational quantity control
- payment gates

For Hawaii, quantity `4+` remains **COMMERCIAL QUANTITY - FREIGHT REVIEW REQUIRED** regardless of purchase mode or availability mode.

## Lower-48 warranty handling framework

SOK has confirmed that Elevation may actively support SOK customer warranty cases rather than acting only as a pass-through seller. For Lower-48 operations, warranty support is a post-sale service lane and must not be used to disable otherwise valid checkout, payment, preorder, or backorder flows.

### Customer intake and validation

Elevation should capture, at minimum:

- customer/order identity
- exact SOK model and SKU
- serial number when applicable
- purchase date and sales channel
- reported issue and relevant photos/video or diagnostic evidence
- shipping destination
- whether the issue presents a safety concern

Do not promise a replacement, refund, warranty determination, or supplier reimbursement before the case is validated against the applicable SOK warranty/return basis.

### Standard Lower-48 path

For a normal SOK quality issue on an Elevation-sold unit:

1. Elevation receives and documents the customer case.
2. Elevation verifies the order, exact SKU, issue evidence, and applicable warranty/return basis.
3. Elevation routes the claim to SOK when supplier authorization or disposition is required.
4. SOK may arrange the return label and determine replacement or refund handling under its applicable process.
5. Elevation records the disposition and keeps the customer informed through completion.

### Elevation-held replacement stock option

SOK Sales Manager Kam has also approved an efficiency path in which Elevation may send a replacement part or battery from Elevation-held warehouse stock and SOK replenishes the replacement into a future Elevation order.

This is an authorized operating option, not a requirement to pre-stock inventory.

Before using this option on a case, Elevation must record:

- case/order reference
- exact outgoing replacement SKU/model
- serial number where applicable
- quantity
- customer destination
- supplier authorization/reference when required
- replenishment owed by SOK
- later replenishment receipt/reconciliation

Do not create standing warranty inventory, make speculative stock purchases, prepay supplier inventory, or create a recurring purchase commitment solely because this replacement option exists. Those actions remain subject to ordinary commercial authority and economics review.

### Safety and lane isolation

If a warranty case suggests swelling, thermal damage, fire exposure, damaged terminals, leaking, severe impact, or another battery-safety condition, isolate that case for appropriate safety handling and supplier escalation. Do not disable unrelated SOK products or the general customer purchase flow because one warranty case is under review.

**BLOCK THE UNSAFE OR UNVERIFIED LANE — NOT THE ENTIRE PRODUCT OR CUSTOMER FLOW.**

### Hawaii boundary

This Lower-48 framework does **not** establish a standing Hawaii warranty fulfillment program.

Hawaii warranty routing, replacement consolidation, freight reimbursement, dangerous-goods tender, and replenishment mechanics remain a separate controlled lane because SOK does not directly ship ordinary dealer orders to Hawaii under the current operating model. Do not automatically extend Lower-48 replacement procedures to Hawaii.

### Public-safe warranty language

Customer-facing pages may state only verified, supportable warranty information and that Elevation assists customers with warranty cases for SOK products sold by Elevation. Internal replenishment mechanics, supplier credits, dealer costs, warehouse strategy, and future-order reconciliation remain private operations data.

## Commercial quantities

Keep `Request Commercial Pricing` available even after direct checkout exists. Multi-battery racks, cabinets, recurring supply, mixed pallets, and other commercial configurations should route into controlled quote/review rather than being forced through ordinary checkout.

## SOK website inspiration - use, do not clone

SOK's public site demonstrates useful customer patterns that Elevation may adapt within Elevation branding:

- category browsing by 12V, 24V, 48V, chargers/accessories
- distinct `Pre-Order` / `In Stock` states
- product-level downloads/spec sheets
- application language for RV, solar, off-grid, marine, and storage
- rack/cabinet accessory relationships

Do not clone SOK page layouts, copy unsupported marketing claims, or hotlink supplier assets without confirming the intended asset use.

## MAP control

SOK branding and catalog expansion are conditioned on SOK MAP compliance.

Do not publish discounts or promotions that make a SOK product violate current MAP guidance.

Shipping, Hawaii freight, commercial quotes, taxes, and other transaction components must remain distinct from merchandise MAP handling as applicable.

## Implementation sequence

1. Preserve current accepted SOK pre-purchase/backorder branch behavior.
2. Add the per-SKU `public_purchase_mode` control.
3. Derive storefront CTA from that field.
4. Build purchase-options/contact panel with SKU/product context.
5. Add SOK authorized-dealer branding to the Lithium and Hawaii Lithium experiences.
6. Add restrained SOK proof placement to the homepage lithium area.
7. Expand catalog visibility SKU-by-SKU without forcing direct checkout.
8. Preserve internal/public supplier-data boundaries.
9. Operate Lower-48 warranty intake using the verified SOK claim and replacement-stock framework above without blocking checkout.
10. Test Hawaii, Lower-48, catalog-only, purchase-options, direct-checkout, pre-purchase, and backorder combinations.
11. Stop only at final production promotion or a genuinely new policy decision.

## Acceptance standard

The integration is successful when Elevation can publicly present a broad, professional SOK catalog while each SKU independently advances from discovery to assisted purchase to direct checkout without duplicate products, dead-end pages, false availability, MAP violations, weakened Hawaii controls, or warranty operations unnecessarily blocking valid sales.

**Controlling rule:**

**CATALOG FIRST -> PURCHASE OPTIONS SECOND -> FULL CHECKOUT LAST**
