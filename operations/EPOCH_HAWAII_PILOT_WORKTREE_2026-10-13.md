# Elevation UpScales — Epoch Hawaii / Puerto Rico Five-Model Pilot Worktree

**Status:** ACTIVE / QUALIFICATION PREP  
**Effective:** 2026-10-13  
**Owner:** Casey Young  
**Commerce lane:** Peter Torres — Director of Operations & Commerce  
**Parent source:** `vendor-project-sources/EPOCH_PROJECT_SOURCE.md`

## Objective

Build the next special-route lithium program from the verified Epoch core catalog rather than creating route-specific product records first.

Sequence:

**CORE PRODUCT TRUTH → DG / PACKED PROFILE → SUPPLIER HANDOFF → CARRIER ACCEPTANCE → LANDED ECONOMICS → ROUTE-SPECIFIC SHOPIFY OFFER → FIRST PROOF ORDER**

No Hawaii / Puerto Rico product, pack, shipping promise or public launch is authorized by this worktree alone.

## Current priority relationship

Casey's newest 2026-10-13 direction places the SOK Hawaii P1-P3 Shopify build ahead of further Epoch expansion until that SOK queue is organized and progressing.

Epoch remains the next lithium catalog focus. Olight expansion remains paused unless explicitly reactivated.

## Pilot-model matrix

| Slot | Exact model | Core Shopify state | Product Wh / weight | Core media | DG docs | Packed profile | Supplier handoff | Carrier acceptance | Hawaii / PR offer |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `1250A-ES` — 12V 50Ah Essential Series | **ACTIVE Lower-48** | 640Wh / 14.3 lb bare weight | **3 exact supplier images COMPLETE** | **PENDING** | **PENDING** | **PENDING** | **PENDING** | **NOT CREATED** |
| 2 | **TBD — Epoch recommendation required** | — | — | — | — | — | — | — | — |
| 3 | **TBD — Epoch recommendation required** | — | — | — | — | — | — | — | — |
| 4 | **TBD — Epoch recommendation required** | — | — | — | — | — | — | — | — |
| 5 | **TBD — Epoch recommendation required** | — | — | — | — | — | — | — | — |

`14.3 lb` is the verified bare product weight for `1250A-ES`, not shipping gross weight. Do not use it as carton, pallet or carrier-rated weight.

## `1250A-ES` core commerce baseline — complete

Current Lower-48 Shopify state:

- Product GID: `gid://shopify/Product/16068335075697`
- Status: **ACTIVE**
- SKU: `1250A-ES`
- Selling price: `$299.00`
- Three exact-model supplier product photographs attached
- Owner-verified `availableForSale: true`
- Supplier-fulfilled variant inventory tracking disabled
- Shipping profile: `Epoch Batteries — Lower 48 $18 Shipping`
- Method: `Epoch Standard — Lower 48`
- Shipping: `$18.00`
- Scope: contiguous U.S. + DC only
- Merchandise + shipping: `$317` before tax

This active Lower-48 state does not prove supplier physical stock and does not qualify Hawaii / Puerto Rico freight.

## Lower-48 follow-up — not a listing blocker

Track separately:

- confirm exact-SKU current supplier orderability with Nick;
- confirm any dealer dropship fee;
- verify an actual buyer checkout presents the intended `$18` rate;
- maintain current Epoch MAP / fulfillment requirements.

No paid test order or supplier shipment has been placed.

## Qualification fields — exact model/package

For every special-route pilot slot, capture and verify:

### Product identity

- manufacturer model / SKU;
- exact voltage / Ah / Wh;
- product dimensions and bare battery weight;
- current manufacturer revision;
- current mainland orderability / supplier stock evidence;
- current MAP / public-price rule;
- warranty terms and destination limitations.

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
- master-carton configuration if applicable;
- pallet dimensions and gross weight;
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
- island / Puerto Rico endpoint and service level;
- handling / DG documentation requirements;
- quote validity / exclusions;
- proof the selected pack configuration is accepted as presented.

Keep protected quotes, dealer costs and private commercial terms outside public Git.

## `1250A-ES` unresolved special-route facts

The Lower-48 listing is live, but the following remain unresolved for Hawaii / Puerto Rico:

- exact SDS/MSDS and UN38.3 packet for the current revision;
- exact UN / DOT / ocean classification record;
- shipping state of charge;
- carton dimensions and gross packed weight;
- pallet configuration / securement / labels;
- supplier warehouse origin and California-forwarder handoff;
- carrier acceptance and route quote;
- landed economics;
- actual pack sizes Epoch can support repeatably.

## Shopify architecture

Do not clone the active Lower-48 product into speculative Hawaii / Puerto Rico records.

When a route is qualified:

1. Preserve the core Epoch model as the technical catalog source.
2. Create a route-specific product/package only when the actual sellable offer needs its own freight profile, quantity/pack structure, checkout handling or destination rules.
3. Reuse only verified exact-product media and specifications from the core model.
4. Add route-specific customer copy for freight method, destination/service level, delivery/pickup expectation and any pack restriction.
5. Keep supplier stock evidence separate from Shopify commerce quantity.
6. Re-check price/MAP and route economics immediately before publication.

## Supplier response wake condition

Wake slots 2–5 and the special-route freight model when Epoch returns any of:

- recommended top-selling / promising RV, marine, solar or off-grid models;
- compliance packets;
- packed shipment profiles;
- warehouse / forwarder-delivery confirmation;
- bulk or pallet configuration guidance.

Do not send a duplicate request while the current supplier request is awaiting response.

## Next unblocked actions

1. Keep the active `1250A-ES` Lower-48 listing intact while tracking supplier-orderability / dropship-fee / checkout checks separately.
2. Complete the current SOK Hawaii P1-P3 queue under Casey's latest priority.
3. Ingest Epoch's next supplier response once received; populate slots 2–5 only from verified recommendations/evidence.
4. Qualify packed/DG data before requesting or accepting any special-route carrier pricing.
5. After one exact Epoch model clears supplier + carrier + economics for a route, build the first Hawaii / Puerto Rico offer from that verified core model and run a controlled proof-order path.
