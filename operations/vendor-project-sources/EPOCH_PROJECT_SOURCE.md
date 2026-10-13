# Elevation UpScales — Epoch Project Source

**Status:** ACTIVE / BASELINE STAGING  
**Project:** Epoch Supplier / Commerce / Catalog / Hawaii Freight Qualification  
**Owner:** Casey Young  
**Peter Lane:** Director of Operations & Commerce  
**Effective baseline:** 2026-10-13  
**Current Maturity:** **DEALER RELATIONSHIP ACTIVE; CORE SHOPIFY BASELINE STAGED; FULFILLMENT + HAWAII FREIGHT QUALIFICATION IN PROGRESS**

## Purpose

Provide one recoverable, public-safe source for building Epoch Batteries into Elevation UpScales using the same operating pattern proven with SOK: establish the core vendor/catalog truth first, build exact product pages from verified manufacturer facts, keep fulfillment truth separate from Shopify display quantity, and derive Hawaii freight offers only after exact-model dangerous-goods, packaging, carrier and landed-route qualification.

This source does not replace private supplier correspondence, dealer pricing, portal credentials, tax records, freight quotes or compliance packets.

## Current supplier/account state

| Onboarding field | Current state | Control / note |
|---|---|---|
| Supplier relationship | **ACTIVE DEALER / WHOLESALE RELATIONSHIP** | Supplier correspondence confirms the dealer relationship and dealer-portal path. Do not re-prospect Epoch as a new vendor. |
| Dealer portal | **ACCOUNT PATH EXISTS / ACCESS ROUTING OWNER-MANAGED** | Supplier previously sent a login path to the account contact. Do not place credentials or recovery details in Git. |
| Catalog direction | **ACTIVE — CONTIGUOUS-U.S. CATALOG BUILD** | Current direction is to establish the Epoch core catalog for the contiguous U.S. before scaling special-route offers. |
| Shopify vendor baseline | **STAGED / UNPUBLISHED** | Smart collection `Epoch Batteries` / handle `epoch-batteries`, vendor rule `Epoch Batteries`, price-descending sort. |
| Pilot product | **STAGED DRAFT** | `1250A-ES` — Epoch 12V 50Ah Essential Series LiFePO4 Marine Battery — Bluetooth. |
| Pilot product media | **MISSING / HOLD** | No verified exact-product images are attached yet. Do not use substitute or generated product imagery. |
| Pilot product fulfillment | **VERIFYING** | Shopify quantity is not supplier-stock proof. Current listing remains DRAFT pending fulfillment verification and approved exact media. |
| Pricing / MAP | **CONTROLLED / CURRENT SOURCE REQUIRED** | Preserve the current Epoch dealer/MAP source. Do not infer discount permission or future MAP from another vendor. |
| Hawaii | **QUALIFICATION ACTIVE / NOT SELLABLE YET** | Carrier, DG documentation, packaging, exact route and landed economics must be qualified before a Hawaii offer is created or published. |
| Puerto Rico | **RESEARCH / QUALIFICATION PATH ONLY** | Do not inherit Hawaii freight, tax, carrier or warranty assumptions. |
| Compliance | **MODEL-SPECIFIC INPUTS REQUESTED** | SDS/MSDS, UN38.3, DOT/PHMSA/ocean classification, UN number, Wh, packed profile, state of charge and labeling/securement data are required for regulated-route qualification. |
| Warranty / returns | **MANUFACTURER TERMS APPLY; STORE WORKFLOW NOT YET MATURE** | Preserve manufacturer warranty facts on exact product pages; do not invent Elevation-specific RMA promises until the operating path is verified. |

## Shopify baseline — current state

### Vendor collection

- Title: `Epoch Batteries`
- Handle: `epoch-batteries`
- Type: automated/smart vendor collection
- Rule: `VENDOR EQUALS Epoch Batteries`
- Sort: `PRICE_DESC`, matching the primary SOK vendor collection pattern
- Publication state: **UNPUBLISHED / STAGED**
- Current product count: 1 DRAFT product
- Image state: no collection image until verified Epoch media is available

Customer-facing collection copy is structured around:

- marine / trolling-motor auxiliary power;
- RV / camper deep-cycle systems;
- portable solar / field power;
- later higher-capacity models as exact products are qualified;
- explicit notice that Hawaii and Puerto Rico freight are separate qualification lanes and not yet offered.

### Pilot product — `1250A-ES`

Current Shopify product:

- Title: `Epoch 12V 50Ah Essential Series LiFePO4 Marine Battery — Bluetooth`
- Vendor: `Epoch Batteries`
- Type: `LiFePO4 Deep Cycle Batteries`
- Status: **DRAFT**
- Exact SKU: `1250A-ES`
- Current image state: **0 verified exact-product images attached**
- Current internal controls include: Epoch pilot, Hawaii not qualified, fulfillment verification hold and current MAP control.

Verified product-page fact set currently includes:

- 12.8V nominal / 50Ah / 640Wh;
- Bluetooth monitoring through the Epoch Pro application;
- 50A maximum continuous discharge and 170A peak for up to 3 seconds;
- 50A maximum continuous charge rate and 25A recommended charge rate;
- BCI Group 22NF footprint;
- 14.3 lb / 6.5 kg;
- IP54 dust/splash resistance;
- 4,000+ manufacturer-rated cycles;
- 11-year manufacturer warranty subject to Epoch registration and terms;
- not an engine-cranking battery;
- no internal heating; charging blocked below 32°F / 0°C by the BMS;
- DC-to-DC charger guidance for alternator charging;
- Hawaii / Puerto Rico freight excluded from the current listing until separately qualified.

Do not add an exact performance, compatibility, shipping, stock, warranty or installation claim unless supported by the current model-specific source.

## Catalog architecture — SOK pattern adapted for Epoch

Use this order:

**EPOCH VENDOR SOURCE → EXACT CORE MODEL → VERIFIED PRODUCT PAGE → CONTIGUOUS-U.S. FULFILLMENT PATH → LIVE CORE CATALOG → SPECIAL-ROUTE QUALIFICATION → ROUTE-SPECIFIC PACKAGES / COLLECTIONS**

Controls:

1. The exact core model is the technical source of truth for specifications and approved media.
2. Route-specific records may be created later only when the route changes the actual sellable package, freight profile, quantity/pack structure or customer purchase path.
3. A Hawaii package must derive from the verified core model; do not allow Hawaii and core records to drift on specifications, warranty, media identity or SKU family.
4. Do not create speculative 1/3/6/12-pack records until Epoch confirms what can actually be fulfilled and the economics/route are qualified.
5. Keep Lower-48/contiguous-U.S. commerce independent from Hawaii proof work; Hawaii cannot block a properly verified mainland product.
6. Keep Shopify commerce quantity separate from supplier physical stock truth.

## Five-model Hawaii freight pilot

Current supplier-facing direction is a five-model pilot chosen for likely RV, marine, solar and off-grid fit. `1250A-ES` is the preferred starting point because it establishes a sub-$300 Epoch entry product in Elevation's current battery assortment.

The remaining four pilot models are **not yet canonical**. Do not invent them from category assumptions. Use Epoch's current recommendation / catalog evidence before assigning the pilot set.

For each pilot model, qualify:

**EXACT MODEL → SDS/MSDS → UN38.3 → UN/DOT/OCEAN CLASSIFICATION → WH + SHIPPING SOC → EXACT CARTON / PALLET PROFILE → LABELING / SECUREMENT → SUPPLIER WAREHOUSE + FORWARDER HANDOFF → CARRIER ACCEPTANCE → LANDED ECONOMICS → CUSTOMER OFFER**

Requested shipment inputs include:

- carton and pallet dimensions;
- gross weights;
- required labels and securement;
- palletization options / minimums;
- packaging-compliance photographs / shipper-document support;
- warehouse origin(s);
- supplier ability to deliver to Elevation's California freight forwarder;
- bulk-order commercial inputs, kept outside public Git.

## Hawaii program boundary

Do not publish, promise, quote or sell Epoch Hawaii freight until all of the following are true for the exact model/package:

- correct compliance documents are on hand;
- carrier/forwarder accepts the exact packaged configuration;
- origin-to-forwarder handoff is verified;
- packed dimensions/weights and required labels are verified;
- destination/service level is defined;
- current supplier availability/orderability is verified;
- landed economics are modeled from current protected costs/quotes;
- Shopify shipping/fulfillment path matches the actual route;
- customer-facing copy does not imply mainland parcel service where Hawaii DG/ocean freight applies.

Hawaii freight qualification should create a repeatable route, not a one-off unsupported shipping promise.

## Real gates

Keep:

- exact model/SKU identity;
- current manufacturer specifications and media provenance;
- current MAP / pricing control;
- real supplier orderability / stock evidence;
- exact fulfillment origin and handoff;
- DG / lithium carrier safety and exact compliance documents;
- route-specific packed dimensions/weights;
- customer-money / checkout integrity;
- owner approval where a purchase commitment, freight absorption, reserve-stock buy, warehouse minimum, exclusivity or other binding commercial commitment is required.

Do not use:

- missing Hawaii qualification to block otherwise verified contiguous-U.S. commerce;
- Shopify inventory quantity as supplier-stock proof;
- a generic Epoch catalog page as evidence for model-specific shipping or compatibility;
- substitute product imagery;
- historical Olight priorities as a reason to defer the current Epoch baseline work.

## Peter lane priority

Olight commerce work is currently **PAUSED IN THE PETER LANE** while the Epoch baseline is established. This pause does not change Elevation's Olight supplier relationship or completed Olight catalog state.

Current Peter sequence:

1. Establish Epoch vendor-page baseline — **COMPLETE / STAGED**.
2. Establish `1250A-ES` product-page baseline — **COMPLETE / DRAFT, MEDIA + FULFILLMENT STILL OPEN**.
3. Obtain / ingest official Epoch exact-product media and current contiguous-U.S. fulfillment facts.
4. Select the next exact Epoch core models from current supplier/catalog evidence; no duplicate/speculative listings.
5. Build the contiguous-U.S. Epoch catalog from the same template.
6. Resolve the five-model Hawaii pilot set and exact DG/packed-profile evidence.
7. Build Epoch Hawaii purchase options only after route qualification proves the actual package and shipping path.

## Close condition

Epoch baseline is ready to move from staging to active commerce when the first exact product has verified official media, current MAP/price, real orderability/fulfillment and a purchase path that matches the customer destination. The Hawaii lane becomes ready only after the exact-model DG, packaging, carrier acceptance and landed-route economics are independently proven.
