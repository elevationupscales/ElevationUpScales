# Elevation UpScales — SOK Hawaii Freight Pricing Portfolio State

**Status:** ACTIVE / PROJECT-MANAGER REPORT  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**Parent controls:** `operations/MANAGEMENT_OPERATING_SOP.md`, `operations/LOGISTICS_PRICING_MODEL.md`, `operations/SOK_HAWAII_FIRST_ORDER_READINESS.md`

## Executive state

Elevation already has a usable starter Hawaii freight-pricing matrix for the two currently most-developed SOK qualification models, covering the approved 1-unit / 3-unit starter structure and both terminal/will-call and local-delivery use cases.

This does **not** equal a full SOK-catalog pricing portfolio.

The broader SOK catalog still requires shipment-profile completion and/or returned forwarder pricing for additional exact SKUs before those models can be treated as priced Hawaii routes.

## Current forwarder classification

Approved Freight Forwarders should be treated operationally as:

**PRIMARY DEVELOPED HAWAII LITHIUM FREIGHT ROUTE / CURRENT PRICED BASELINE**

This classification means it is presently the most-developed and most-usable Hawaii pricing lane in Elevation's current logistics network.

It does **not** mean:

- exclusive carrier;
- sole approved forwarder;
- blanket DG acceptance for every SOK SKU;
- standing authorization to book or release freight;
- pricing validity for unrelated weights, quantities, islands, delivery modes, or larger loads.

Alternative routes, including other forwarders/carriers under qualification, remain useful for redundancy, acceptance comparison, outer-island coverage, and commercial leverage.

## H2O Logistics / Pasha backup route — ACTIVE QUALIFICATION

H2O Logistics has now clarified the operating boundary for its Pasha-linked Hawaii route:

- container movement would operate under **H2O's account**;
- H2O will coordinate the carrier paperwork and operating handoff directly with Pasha;
- Elevation and SOK do **not** need to submit separate paperwork directly to Pasha for this H2O-controlled route;
- H2O's remaining pricing input is the exact manufacturer-packed dimensions, weights, and shipment configurations for the additional SOK models Elevation wants quoted;
- materially different dimensions, weights, quantities, palletization, or shipment configurations require configuration-specific pricing rather than extrapolation.

SOK has already supplied Elevation a manufacturer spreadsheet specifically covering battery and pallet dimensions. Operations should use that existing supplier source before asking SOK to repeat information.

**Control:** H2O/Pasha remains a backup/redundancy qualification lane, not a replacement for the current primary developed route and not an exclusive-carrier commitment.

## Portfolio status

### Starter SOK pricing — COMPLETE FOR CURRENT QUALIFIED MODELS

Current starter pricing coverage exists for:

- `SK12V100PC`
- `SK48V100N`

For each of those models, the current internal portfolio includes the starter 1-unit and 3-unit structures and the developed Honolulu terminal/will-call and Oahu delivery variants.

Exact carrier buy-rates, quote references, and protected commercial terms remain outside public Git under the protected internal rate-card rule.

### Broader SOK pricing portfolio — IN PROGRESS

The remaining catalog cannot be called complete until exact packed shipment profiles and corresponding route pricing are available and current for the intended use case.

Priority expansion models currently include:

- `SK12V100H`
- `SK12V206H`
- `SK12V206PH`
- `SK24V100`
- `SK12V280H`
- `SK12V314PH`
- `SK24V150PH`

Do not estimate packed dimensions, gross weight, palletization, DG handling, or freight pricing when verified manufacturer/forwarder data is available or still pending.

The authoritative existing manufacturer source for this expansion step is the SOK-supplied battery/pallet-dimensions workbook retained in the supplier correspondence. If a tool cannot read that legacy spreadsheet format directly, treat extraction as the blocked sub-step rather than reopening supplier qualification or inventing values.

## Pricing interpretation

The current starter matrix demonstrates that multi-unit shipments can materially improve per-unit landed freight economics where the forwarder rate remains relatively flat across a small quantity increase.

Use that only as an internal commercial planning signal. Do not generalize one model/route result to the broader catalog without exact SKU, weight, cube, DG, destination, and service-level verification.

## First-proof priority

The current first-proof case remains:

**1 × SK12V100PC → qualified California handoff → accepted Hawaii route → controlled receiving/release → actual-cost reconciliation**

Pricing is sufficiently developed to support landed-cost modeling for this first proof, but the shipment still requires written exact-SKU transportation acceptance and route-specific execution requirements before release.

**PRICED ≠ ACCEPTED ≠ BOOKED ≠ RELEASE AUTHORIZED**

## Recommended operations sequence

1. Preserve the current Approved Freight Forwarders starter matrix as the protected baseline.
2. Build the internal landed-cost model around the current SK12V100PC proof case first.
3. Keep the 3-unit structure as the immediate comparison case for contribution/per-unit freight analysis.
4. Extract exact shipping profiles for the remaining SOK models from the existing manufacturer source already provided by SOK.
5. Send H2O only the verified missing exact-model data needed to complete its backup-route pricing; do not request duplicate supplier information and do not estimate cargo profiles.
6. Keep H2O responsible for Pasha coordination/paperwork under H2O's account for the H2O-controlled route.
7. Continue qualifying alternate forwarders for acceptance, resilience, route breadth, and price comparison without displacing the current primary developed route.
8. After first shipment actuals are available, reconcile quoted vs actual freight, accessorials, timing, receiving, and exception cost before treating any route as production-proven.

## Project-manager disposition

**Approved Freight Forwarders:** PRIMARY DEVELOPED HAWAII LITHIUM ROUTE / PRICED BASELINE  
**H2O / Pasha:** BACKUP ROUTE / ACTIVE QUALIFICATION — H2O OWNS PASHA COORDINATION  
**Starter SOK pricing portfolio:** COMPLETE FOR SK12V100PC + SK48V100N  
**Broader SOK pricing portfolio:** IN PROGRESS  
**First-proof landed-cost model:** WORKABLE NOW  
**Exact-SKU DG/carrier acceptance:** STILL REQUIRED  
**Exclusive-carrier commitment:** NO  
**Duplicate supplier/profile request:** DO NOT SEND  
**Next highest-value action:** extract the remaining verified SOK packed shipment profiles already supplied by the manufacturer, send those profiles to H2O for configuration-specific backup-route pricing, and keep the first-proof actual-cost reconciliation as the production evidence gate.
