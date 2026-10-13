# Elevation UpScales — Epoch Project Source

**Status:** ACTIVE / CORE LOWER-48 BASELINE LIVE  
**Project:** Epoch Supplier / Commerce / Catalog / Hawaii-Puerto Rico Freight Qualification  
**Owner:** Casey Young  
**Peter Lane:** Director of Operations & Commerce  
**Effective baseline:** 2026-10-13  
**Current Maturity:** **DEALER RELATIONSHIP ACTIVE; 1250A-ES LOWER-48 PRODUCT ACTIVE; SUPPLIER FOLLOW-UP + HAWAII/PR QUALIFICATION IN PROGRESS**

## Purpose

Provide one recoverable, public-safe source for building Epoch Batteries into Elevation UpScales using the same operating pattern proven with SOK: establish the verified core product/catalog first, keep supplier physical-stock truth separate from Shopify commerce state, and derive Hawaii / Puerto Rico offers only after exact-model dangerous-goods, packaging, carrier and landed-route qualification.

This source does not replace private supplier correspondence, dealer pricing, portal credentials, tax records, freight quotes or compliance packets.

## Current supplier/account state

| Field | Current state | Control / note |
|---|---|---|
| Supplier relationship | **ACTIVE DEALER / WHOLESALE RELATIONSHIP** | Supplier correspondence confirms the dealer relationship and dealer-portal path. Do not re-prospect Epoch as a new vendor. |
| Dealer portal | **ACCOUNT PATH EXISTS / ACCESS ROUTING OWNER-MANAGED** | Keep credentials and recovery data out of Git. |
| Catalog direction | **ACTIVE — CONTIGUOUS-U.S. CATALOG BUILD** | `1250A-ES` is the first completed product baseline. Additional exact models follow verified Epoch evidence. |
| Shopify vendor collection | **STAGED** | Smart collection `Epoch Batteries` / handle `epoch-batteries`; supplier-provided official Epoch logo is attached as collection media. |
| Pilot product | **ACTIVE — LOWER 48** | `1250A-ES` — Epoch 12V 50Ah Essential Series LiFePO4 Marine Battery — Bluetooth. |
| Pilot product media | **COMPLETE** | Three exact-model supplier photographs attached. |
| Pilot product price | **$299.00** | Existing price preserved; no duplicate product created. |
| Pilot product inventory | **SUPPLIER-FULFILLED / TRACKING DISABLED** | Do not infer physical supplier stock from Shopify quantity. |
| Lower-48 shipping | **ACTIVE OWNER-VERIFIED BASELINE** | Profile `Epoch Batteries — Lower 48 $18 Shipping`; method `Epoch Standard — Lower 48`; $18; contiguous U.S. + DC only. |
| Supplier follow-up | **OPEN / NON-BLOCKING TO CURRENT LISTING** | Confirm exact-SKU current orderability and any dealer dropship fee with Nick; maintain MAP/fulfillment compliance. |
| Checkout verification | **OPEN / NON-BLOCKING TO CURRENT LISTING** | Confirm an actual buyer checkout presents the intended $18 rate. No paid test order required by this record. |
| Hawaii | **QUALIFICATION ACTIVE / NOT SELLABLE FROM LOWER-48 OFFER** | Exact model/package route qualification required. |
| Puerto Rico | **QUALIFICATION / RESEARCH ONLY** | Do not inherit Hawaii carrier, freight, tax or warranty assumptions. |
| Compliance | **MODEL-SPECIFIC INPUTS REQUESTED** | SDS/MSDS, UN38.3, DOT/PHMSA/ocean classification, UN number, Wh, packed profile, state of charge and labeling/securement data remain required for regulated-route qualification. |

## Shopify baseline — `1250A-ES`

Current verified Shopify state:

- Product GID: `gid://shopify/Product/16068335075697`
- Title: `Epoch 12V 50Ah Essential Series LiFePO4 Marine Battery — Bluetooth`
- Vendor: `Epoch Batteries`
- Type: `LiFePO4 Deep Cycle Batteries`
- Status: **ACTIVE**
- SKU: `1250A-ES`
- Selling price: **$299.00**
- Exact product media: **3 supplier images attached**
- Owner-verified `availableForSale`: **true**
- Variant inventory tracking: **disabled**
- Lower-48 shipping profile: `Epoch Batteries — Lower 48 $18 Shipping`
- Lower-48 method: `Epoch Standard — Lower 48`
- Shipping charge: **$18.00**
- Geographic scope: contiguous U.S. + DC only
- Merchandise + standard shipping: **$317 before applicable tax**

The current Shopify quantity display must not be treated as proof of Epoch physical stock.

Verified product-page facts include:

- 12.8V nominal / 50Ah / 640Wh;
- Bluetooth monitoring through the Epoch Pro application;
- 50A maximum continuous discharge and 170A peak for up to 3 seconds;
- 50A maximum continuous charge rate and 25A recommended charge rate;
- BCI Group 22NF footprint;
- 14.3 lb / 6.5 kg bare product weight;
- IP54 dust/splash resistance;
- 4,000+ manufacturer-rated cycles;
- 11-year manufacturer warranty subject to Epoch registration and terms;
- not an engine-cranking battery;
- no internal heating; BMS blocks charging below 32°F / 0°C;
- DC-to-DC charger guidance for alternator charging;
- Hawaii, Alaska and Puerto Rico are outside the active Lower-48 shipping offer.

## Remaining Lower-48 operational verification

These items remain open but do **not** revert the active product to DRAFT or represent current listing blockers:

1. Confirm exact-SKU current supplier orderability with Nick.
2. Confirm whether an Epoch dealer dropship fee applies to this exact fulfillment path.
3. Verify a real buyer checkout presents the expected `$18` Lower-48 shipping method/rate.
4. Continue to follow current Epoch MAP and fulfillment requirements.
5. No paid test order or supplier shipment has been placed as part of the baseline verification.

## Catalog architecture — SOK pattern adapted for Epoch

Use this order:

**EPOCH VENDOR SOURCE → EXACT CORE MODEL → VERIFIED PRODUCT PAGE → CONTIGUOUS-U.S. FULFILLMENT PATH → LIVE CORE CATALOG → SPECIAL-ROUTE QUALIFICATION → ROUTE-SPECIFIC PACKAGES / COLLECTIONS**

Controls:

1. Exact core model remains the technical source for specifications and approved media.
2. Route-specific records are created later only when freight/package/checkout/destination requirements materially differ.
3. Hawaii / Puerto Rico packages must derive from verified core products and may not drift on specifications, warranty, media identity or SKU family.
4. Do not create speculative 1/3/6/12-pack Epoch route records until Epoch confirms what can actually be fulfilled and the route economics are qualified.
5. Lower-48 commerce remains independent from Hawaii / Puerto Rico proof work.
6. Keep Shopify commerce quantity separate from supplier physical-stock truth.

## Proposed five-model Hawaii / Puerto Rico freight pilot

`1250A-ES` is the first core model and remains the preferred pilot starting point. The other four models are not canonical until supported by current Epoch recommendation/catalog evidence.

For each selected pilot model, qualify:

**EXACT MODEL → SDS/MSDS → UN38.3 → UN/DOT/OCEAN CLASSIFICATION → WH + SHIPPING SOC → EXACT CARTON / PALLET PROFILE → LABELING / SECUREMENT → SUPPLIER WAREHOUSE + FORWARDER HANDOFF → CARRIER ACCEPTANCE → LANDED ECONOMICS → CUSTOMER OFFER**

Requested inputs include:

- carton and pallet dimensions;
- gross weights;
- required labels and securement;
- palletization options / minimums;
- packaging-compliance photographs / shipper-document support;
- warehouse origin(s);
- supplier ability to deliver to Elevation's California forwarder;
- bulk-order commercial inputs, kept outside public Git.

## Special-route boundary

Do not publish, promise, quote or sell Epoch Hawaii / Puerto Rico freight until the exact model/package has:

- correct compliance documents;
- carrier/forwarder acceptance;
- verified supplier-origin / forwarder handoff;
- packed dimensions/weights and labeling;
- defined destination/service level;
- current supplier orderability;
- approved landed economics;
- Shopify shipping/fulfillment mapping that matches the actual route.

## Peter-lane priority

Casey's newest 2026-10-13 direction places the active SOK Hawaii P1-P3 Shopify queue ahead of further Epoch expansion. Epoch remains the **next lithium catalog focus** once that SOK queue is organized and progressing.

Olight expansion remains paused unless reactivated by newer owner direction.

## Close condition

The `1250A-ES` Lower-48 listing baseline is complete and active. The open Lower-48 checks are operational verification items, not a reason to undo the listing.

The Epoch Hawaii / Puerto Rico lane becomes ready only after exact-model DG, packaging, supplier handoff, carrier acceptance and landed-route economics are independently proven.
