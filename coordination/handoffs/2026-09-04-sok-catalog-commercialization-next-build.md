# SOK 4.6 — Catalog Commercialization Next-Build Directive

**Date:** 2026-09-04  
**Owner / Authority:** Elevation UpScales Management  
**Status:** ACTIVE  
**Starting branch:** `work/sok-4-6-catalog-commercialization-2026-09-04`

## Accepted production parent

Current production receipt commit:

`3697f1d84e7c3f2e8f304a1472a8ea06ea67ee31`

Accepted application SHA from the SOK media production receipt:

`ca371e1ec2b4ccd587e872fd4cba571bbb4dd8ad`

Accepted baseline:

`baseline-2026-09-04-sok-4-6-media-production`

Do not restart from the earlier SOK integration or pre-purchase branches. Continue from the accepted media-production descendant.

## Reconciled audit finding

The latest public-site audit correctly identifies the remaining commercial objective, but parts of that audit describe the site before the SOK media deployment completed.

Already completed in accepted production:

- SK12V100PC and SK48V100N exist as SOK public catalog records.
- Per-SKU availability states exist.
- Per-SKU `public_purchase_mode` exists with:
  - `CATALOG_ONLY`
  - `CONTACT_TO_ORDER`
  - `PURCHASE_OPTIONS`
  - `DIRECT_CHECKOUT`
  - `UNAVAILABLE`
- SOK products carry MAP-based merchandise pricing in the public runtime.
- Pre-purchase and backorder support exists.
- SOK product media is stored locally; production does not hotlink SOK media.
- Official SOK spec sheets for SK12V100PC and SK48V100N are stored locally.
- The Lithium storefront contains a co-branded **AUTHORIZED SOK ENERGY DEALER** feature.
- Existing Hawaii quantity, carrier, economics, payment, promotion and supplier-data boundaries remain protected.

Therefore, do **not** rebuild these capabilities.

## Management objective

Move the current SOK work from **integration foundation** into **commercial presentation and assisted purchasing**.

Controlling sequence:

**CATALOG FIRST → PURCHASE OPTIONS SECOND → FULL CHECKOUT LAST**

The public lithium experience should feel like an active SOK-powered catalog even when a SKU still requires assisted purchase or Hawaii freight review.

## Build Priority 1 — Dedicated SOK Catalog Landing Experience

Create a customer-facing SOK collection/landing route, preferably:

`/sok-batteries`

Purpose:

- establish a strong SOK discovery surface inside Elevation branding;
- show Elevation as an **Authorized SOK Energy Dealer**;
- surface the currently qualified SOK products without pretending every model is direct-checkout ready;
- provide a natural future home for additional 12V, 24V, 48V, cabinet and storage products.

Initial content should include:

- Elevation branding first;
- SOK authorized-dealer proof treatment;
- SK12V100PC;
- SK48V100N;
- official local product media;
- official local spec-sheet downloads;
- verified voltage / capacity / energy values;
- customer-safe use/application summaries;
- current availability state;
- current purchase CTA derived from `public_purchase_mode`;
- Hawaii availability / freight-review path;
- commercial-pricing path.

Do not create a separate SOK database. Use the existing Master Catalog / SOK public runtime.

## Build Priority 2 — Complete Assisted-Purchase UX

For `PURCHASE_OPTIONS`, the customer must not land on a dead end.

The product page / SOK landing page should expose a clear **Purchase Options** panel with actions such as:

- **Email Us About This Product**
- **Request Commercial Pricing**
- **Check Hawaii Availability**

Carry customer-safe product context automatically:

- exact product name;
- SOK SKU;
- product URL;
- requested quantity;
- destination state / ZIP when entered;
- intended use, optional;
- residential / commercial, optional.

Do not expose:

- supplier cost;
- supplier inventory count;
- source URL;
- internal warehouse routing;
- margin;
- carrier calculations;
- internal PO state.

## Build Priority 3 — Product Pages Must Feel Finished

A SOK SKU that is not direct-checkout ready must still look like a complete commercial product.

Each SOK product detail should present, when verified:

- SOK manufacturer identity;
- exact model/SKU;
- official imagery;
- product description;
- voltage / Ah / Wh or kWh;
- dimensions / packed weight where appropriate;
- supported applications;
- compatibility information;
- official literature/downloads;
- warranty wording only when approved;
- availability state;
- purchase mode;
- Hawaii status;
- commercial-order path.

Do not use `Coming Soon` simply because automated checkout is incomplete. Use the actual purchase mode.

## Build Priority 4 — Lithium Store Merchandising

The Lithium Battery Shop should become the main discovery hub for SOK products.

Preserve the current Elevation lithium taxonomy and add useful SOK organization without redesigning the store.

Support useful categories/filters such as:

- 12V Lithium
- 24V / Higher Voltage
- 48V / Rack Storage
- Cabinets & Accessories
- RV / Mobile Power
- Solar / Off-Grid Storage
- SOK Energy

Do not place SOK in primary global navigation yet unless later justified by actual catalog depth and sales behavior.

## Build Priority 5 — Homepage Merchandising

Do not replace the Elevation homepage hero.

Add restrained SOK merchandising to the existing lithium/current-products area:

**Featured Battery Systems**  
**SOK LiFePO4 Batteries**  
For RV, solar, backup and off-grid power.

Initial featured products may include:

- SK12V100PC;
- SK48V100N;
- one approved rack/cabinet system image as a commercial-storage proof element.

Keep Elevation as the primary company brand.

## Build Priority 6 — Solar Builder SOK Introduction

Do not globally remove Renogy or rewrite stable Solar Builder architecture.

Introduce SOK intentionally by system type:

### 12V / RV / small off-grid

Allow qualified SOK 12V battery options where they fit the design.

### 48V / larger storage

Introduce SK48V100N as a preferred/available rack-storage platform when the builder reaches a compatible system configuration.

Useful customer-facing capacity examples may be derived from the exact 5.12kWh unit:

- 1 battery = 5.12kWh
- 2 batteries = 10.24kWh
- 3 batteries = 15.36kWh
- 4 batteries = 20.48kWh

Do not claim electrical/system compatibility beyond verified configuration rules.

## Build Priority 7 — Hawaii Product-Aware Routing

Keep the catalog visible even where Hawaii is not yet direct-checkout ready.

For Hawaii:

- exact SKU remains visible;
- exact purchase mode remains visible;
- customer can request Hawaii purchase/freight options;
- 1–3 batteries remain inside the controlled qualification path;
- quantity 4+ remains **COMMERCIAL QUANTITY — FREIGHT REVIEW REQUIRED**;
- carrier acceptance and economics approval remain authoritative;
- pre-purchase/backorder cannot bypass Hawaii payment gates.

For a not-yet-proven SOK Hawaii SKU, prefer:

**REQUEST HAWAII PURCHASE OPTIONS**

or

**FREIGHT REVIEW REQUIRED**

rather than hiding the product.

## Build Priority 8 — Commercial Product-Supply Inquiry

Create or extend a short product-supply commercial path distinct from Start a Project.

Fields should include:

- name;
- company, optional;
- email / phone;
- exact SKU;
- quantity;
- destination;
- one-time or recurring purchase;
- intended application;
- desired timing;
- notes.

This path is for multi-battery, cabinet, mixed-pallet, retailer, contractor and recurring-supply opportunities.

Do not expose dealer cost, wholesale sheets or internal freight margin.

## MAP release gate

SOK branding and catalog publication remain conditioned on SOK MAP compliance.

Add/retain an acceptance check that proves for each published SOK SKU:

**public merchandise price >= current applicable SOK MAP**

and that no coupon, campaign or promotion lowers SOK merchandise below MAP.

Current known MAP references for the two active models:

- SK12V100PC — $319 MAP
- SK48V100N — $1,199 MAP

Use the current authoritative SOK price sheet / Management record if MAP changes.

Shipping, tax, Hawaii freight and separately quoted commercial freight must remain distinct from merchandise MAP handling.

## Preserve all protected boundaries

Do not change unless a new Management directive explicitly authorizes it:

- current PayPal/payment gates;
- Hawaii operational max of 3 batteries for standard orders;
- quantity 4+ commercial review;
- carrier-acceptance gates;
- economics-approval gates;
- supplier/internal-data privacy;
- Catalog architecture;
- Pricing 2.0 protected-floor logic;
- promotion exclusions / SOK MAP protection;
- Marketplace architecture;
- normal field-service intake architecture.

## Acceptance tests

At minimum prove:

1. `/sok-batteries` loads normally and uses Elevation branding.
2. SK12V100PC is visible with official local media and exact model/spec context.
3. SK48V100N is visible with official local media and exact model/spec context.
4. Both products expose official local literature links.
5. Purchase CTA is derived from each SKU's current `public_purchase_mode`.
6. `PURCHASE_OPTIONS` gives a usable assisted-purchase path.
7. Product inquiry carries SKU/product context without exposing internal supplier data.
8. Commercial-pricing path accepts multi-unit inquiries without normal checkout.
9. Hawaii routes remain protected for 1–3 and 4+ quantities.
10. Pre-purchase/backorder do not bypass carrier/economics/payment gates.
11. SOK merchandise price passes MAP floor validation.
12. LABORDAY25 or other promotions cannot discount SOK below MAP.
13. Lower-48 behavior outside SOK is unchanged.
14. Existing Doba/Kingboss products are not removed merely to feature SOK.
15. No SOK production media is hotlinked.
16. No MSDS/UN38.3/compliance packet is exposed publicly unless separately approved.
17. Existing supplier/internal public-data boundary remains PASS.
18. Mobile product cards, purchase panels and landing page remain usable without layout overflow.

## Release control

Continue normal implementation, testing and preview work without asking for routine approval.

Stop only before final production promotion or if the work reveals a genuinely new pricing, legal, warranty, freight or policy decision.

The immediate commercial objective is:

**Turn the lithium section from a supplier-program announcement into an active SOK-powered catalog while keeping fulfillment flexible behind each product.**
