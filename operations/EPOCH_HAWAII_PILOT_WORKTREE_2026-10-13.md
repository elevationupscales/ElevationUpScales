# Elevation UpScales — Epoch Hawaii Five-Model Pilot Worktree

**Status:** ACTIVE / QUALIFICATION PREP  
**Effective:** 2026-10-13  
**Owner:** Casey Young  
**Commerce lane:** Peter Torres — Director of Operations & Commerce  
**Parent source:** `vendor-project-sources/EPOCH_PROJECT_SOURCE.md`

## Objective

Build the next Hawaii lithium program from the verified Epoch core catalog rather than creating route-specific product records first.

Sequence:

**CORE PRODUCT TRUTH → DG / PACKED PROFILE → SUPPLIER HANDOFF → CARRIER ACCEPTANCE → LANDED ECONOMICS → ROUTE-SPECIFIC SHOPIFY OFFER → FIRST PROOF ORDER**

No Hawaii product, pack, shipping promise or public launch is authorized by this worktree alone.

## Pilot-model matrix

| Slot | Exact model | Core Shopify state | Product Wh / weight | DG docs | Packed profile | Supplier handoff | Carrier acceptance | Hawaii offer |
|---|---|---|---|---|---|---|---|---|
| 1 | `1250A-ES` — 12V 50Ah Essential Series | DRAFT baseline complete | 640Wh / 14.3 lb product weight | **PENDING** | **PENDING** | **PENDING** | **PENDING** | **NOT CREATED** |
| 2 | **TBD — Epoch recommendation required** | — | — | — | — | — | — | — |
| 3 | **TBD — Epoch recommendation required** | — | — | — | — | — | — | — |
| 4 | **TBD — Epoch recommendation required** | — | — | — | — | — | — | — |
| 5 | **TBD — Epoch recommendation required** | — | — | — | — | — | — | — |

`14.3 lb` is the verified product weight for `1250A-ES`, not a shipping gross weight. Do not use it as carton, pallet or carrier-rated weight.

## Qualification fields — exact model/package

For every pilot slot, capture and verify:

### Product identity

- manufacturer model / SKU;
- exact voltage / Ah / Wh;
- product dimensions and bare battery weight;
- current manufacturer revision;
- current mainland orderability / supplier stock evidence;
- current MAP / public-price rule;
- warranty terms and any destination limitation.

### Dangerous goods / compliance

- SDS/MSDS;
- UN38.3 test summary;
- exact UN number;
- DOT/PHMSA classification;
- ocean-freight classification;
- shipping state of charge requirement;
- required marks / labels / documentation;
- any quantity or packaging restriction affecting the selected pack size.

### Packed shipment profile

- single-unit carton dimensions;
- single-unit gross packed weight;
- batteries per master carton if applicable;
- pallet dimensions;
- pallet gross weight;
- units per pallet;
- securement / blocking / bracing requirements;
- palletization minimum / MOQ if any;
- supplier packaging-compliance photographs;
- shipper declaration / paperwork support.

### Supplier-origin handoff

- Epoch warehouse origin for the exact model;
- whether Epoch can ship / deliver to Elevation's California forwarder;
- pickup versus delivered handoff terms;
- order cutoffs / batching constraints if applicable;
- model/package-specific availability at time of quote/order.

### Carrier / forwarder qualification

- exact forwarder / carrier lane;
- acceptance of the exact lithium classification and package;
- terminal / delivery endpoint;
- handling / DG documentation requirements;
- quote validity / exclusions;
- proof that the selected pack configuration is accepted as presented.

Keep protected quotes, dealer costs and private commercial terms outside public Git.

## `1250A-ES` current baseline

Verified core product facts already staged in Shopify:

- 12.8V nominal;
- 50Ah;
- 640Wh nominal energy;
- Bluetooth monitoring;
- 50A maximum continuous discharge;
- 170A peak up to 3 seconds;
- 50A maximum continuous charge rate;
- 25A recommended charge rate;
- BCI Group 22NF footprint;
- 14.3 lb / 6.5 kg bare product weight;
- IP54;
- manufacturer-rated 4,000+ cycles;
- 11-year manufacturer warranty subject to registration and terms;
- not an engine-cranking battery;
- no internal heating; BMS blocks charging below 32°F / 0°C.

Current unresolved Hawaii facts for `1250A-ES`:

- exact SDS/MSDS and UN38.3 packet for the current revision;
- exact UN / DOT / ocean classification record;
- shipping state of charge;
- carton dimensions and gross packed weight;
- pallet configuration / securement / label requirements;
- supplier warehouse origin and California-forwarder handoff;
- carrier acceptance and route quote;
- landed economics;
- actual Hawaii pack sizes that Epoch can support repeatably.

## Shopify architecture

Do not begin by cloning the core draft into speculative Hawaii products.

When a route is qualified:

1. Preserve the core Epoch model as the technical catalog source.
2. Create a route-specific Hawaii product/package only when the actual sellable offer needs its own freight profile, quantity/pack structure, checkout handling or destination rules.
3. Reuse only verified exact-product media and specifications from the core model.
4. Add Hawaii-specific customer copy for freight method, destination/service level, delivery/pickup expectation and any pack restriction.
5. Keep supplier stock evidence separate from Shopify commerce quantity.
6. Re-check product price/MAP and route economics immediately before publication.

## Current blockers / wake conditions

### Supplier response wake condition

Wake the pilot-model selection when Epoch returns any of the following:

- recommended top-selling / promising models for the requested RV, marine, solar and off-grid pilot;
- compliance packets;
- packed shipment profiles;
- warehouse / forwarder-delivery confirmation;
- bulk or pallet configuration guidance.

Do not send a duplicate request while the current supplier request is still awaiting response.

### Media wake condition

`1250A-ES` product-page publication remains held until exact official product imagery is available. Vendor-page collection media may use the supplier-provided Epoch logo, but the logo is not a substitute for product photography on the PDP.

## Next unblocked actions

1. Keep `1250A-ES` DRAFT while exact product media and fulfillment are unresolved.
2. Ingest Epoch's next supplier response once received; populate slots 2–5 only from verified recommendations/evidence.
3. Attach official exact-product media to the core PDP before publication.
4. Qualify packed/DG data before requesting carrier pricing for any Epoch Hawaii package.
5. After one exact model clears supplier + carrier + economics, build the first Hawaii offer from that verified core model and run a controlled proof-order path.
