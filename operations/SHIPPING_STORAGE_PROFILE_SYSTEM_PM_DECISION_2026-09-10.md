# Elevation UpScales — Shipping & Storage Profile System PM Decision Handoff

**Status:** READY FOR OPERATING SYSTEM PROJECT MANAGER DECISION  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**Prepared by:** Company Operations

## Owner direction

The Operating System Project Manager is taking over direction for building complete profiles for Elevation shipping, freight, receiving, storage, fulfillment, and related logistics options.

Company Operations has completed the current evidence reconciliation and prepared a protected decision packet containing the commercial details. This public-safe record preserves the architecture and decision points only.

## Decision requested

Approve or modify a two-layer provider-profile system:

1. **Protected internal commercial registry** — exact rates, quote references, contacts, addresses, private terms, accessorials, quote validity, insurance/payment conditions, and correspondence evidence.
2. **Public-safe `/operations/` state layer** — provider ID, capabilities, geography, readiness state, constraints, gates, and next action only.

Raw carrier rates, private quote material, protected commercial contacts/terms, customer information, and sensitive operating intelligence must not be placed in this public repository.

## Recommended canonical provider profile

Each provider record should normalize:

- provider/legal name and internal provider ID;
- role: carrier / forwarder / warehouse / receiving node / final-mile / fulfillment / hybrid;
- geography and route/service modes;
- origin/destination terminal or warehouse references;
- lithium / UN3480 capability and exact-SKU acceptance state;
- SDS/MSDS and UN38.3 requirements;
- BOL / shipper / offeror requirements;
- packaging, palletization, securement, weight, and quantity controls;
- rate basis and quote validity state;
- storage, receiving, pick/release, fulfillment, will-call, delivery, and outer-island/remote capability;
- returns/damaged-battery handling;
- account/setup/payment readiness;
- evidence references;
- current status, next action, owner gate, and last verified date.

Exact numerical rates and private contact details belong only in the protected registry.

## Recommended normalized rate row

Bind every rate to the exact shipment context rather than only the provider name:

**SKU → QUANTITY → PACKED WEIGHT/CUBE → ORIGIN → DESTINATION → SERVICE MODE → FREIGHT COMPONENTS → ACCESSORIALS → STORAGE/DELIVERY COMPONENTS → TOTAL PROVIDER COST → QUOTE DATE/EXPIRY → ACCEPTANCE STATE**

Do not compare provider totals until service scope is normalized.

## Recommended status ladders

### Freight / carrier

`PROSPECT → CONTACTED → REVIEWING → CAPABILITY VERIFIED → PRICED → EXACT-SKU ACCEPTED → BOOKABLE → PRODUCTION-PROVEN`

### Storage / receiving / fulfillment

`PROSPECT → INTERESTED → SITE REVIEW → PRODUCT ACCEPTED → RATES VERIFIED → AGREEMENT/ACCOUNT READY → RECEIVING READY → PRODUCTION-PROVEN`

## Current provider set requiring canonical profiles

Recommended IDs and current public-safe classifications:

- `HI-FRT-AFF` — Approved Freight Forwarders — primary developed Hawaii lithium freight route / priced baseline.
- `HI-FRT-H2O` — H2O Logistics — alternate California-to-Hawaii freight lane with developed comparison pricing; exact-SOK qualification still required.
- `AK-FRT-SPAN` — Span Alaska Transportation — developed Auburn-to-Anchorage ocean/LTL option with weight-band pricing; exact-model document acceptance still open.
- `HI-WHS-CBS` — Continental Battery Systems — strong Hawaii receiving/storage/customer-release candidate with preliminary rate structure; final rates and exact-product acceptance still needed.
- `HI-WHS-LP` — Logistics Plus Hawaii — warehousing/fulfillment candidate under operational review; SOK safety documents supplied; pricing/site acceptance pending.
- `HI-HYB-RR` — R&R Solar Supply — potential low-voltage inventory storage, fulfillment, walk-in retail, and reseller node; commercial terms/rates pending.
- `HI-CAR-MATSON` — Matson — restricted direct-ocean review lane; exact shipment eligibility remains unresolved and no usable pricing portfolio is established.
- `HI-FRT-DHX` — DHX — freight/warehousing prospect with inquiry open; substantive qualification still pending.
- `MULTI-FRT-LYNDEN` — Lynden — Hawaii/Alaska logistics prospect; substantive qualification still pending.

Other Hawaii local businesses remain prospects until they return substantive receiving/storage/fulfillment capability.

## Recommended first build order

1. Approved Freight Forwarders
2. Continental Battery Systems
3. H2O Logistics
4. Span Alaska Transportation
5. Logistics Plus Hawaii
6. R&R Solar Supply
7. Matson
8. DHX
9. Lynden

This order starts with lanes where current evidence already supports meaningful profile completion, then fills alternatives and redundancy.

## Existing operating facts the PM should preserve

- Approved Freight Forwarders is the current most-developed Hawaii priced route, but is not exclusive.
- SOK starter pricing exists for the two most-developed starter models; the broader SOK freight portfolio is not complete.
- H2O comparison pricing was developed around another exact battery profile and must not be misrepresented as SOK-specific pricing without requalification.
- Span Alaska has developed ocean/LTL weight-band pricing but requires exact-model MSDS/document review; remote-air service must remain a separate lane.
- Continental has expressed a potentially strong Hawaii storage/receiving/fulfillment structure and preliminary economics, but current final rates/acceptance still need confirmation.
- Logistics Plus believes the program may be supportable but lithium storage may require additional facility measures; no long-term/minimum-volume commitment is authorized.
- R&R is interested in low-voltage consumer inventory handling and fulfillment but its existing higher-voltage supplier relationships must not be disrupted.
- Matson restrictions mean that route must remain exact-shipment-review driven rather than assumed available.

## PM decisions needed

1. Approve or modify the two-layer architecture.
2. Approve the canonical profile schema and provider IDs.
3. Decide the owning protected system for exact rates, contacts, quote documents, and commercial terms.
4. Approve or reorder the provider build sequence.
5. Decide whether shipping, storage, receiving, fulfillment, and final-mile remain composable sub-profiles under one provider record or separate linked records.
6. Set the minimum evidence needed to promote a provider from PRICED to EXACT-SKU ACCEPTED and from BOOKABLE/RECEIVING READY to PRODUCTION-PROVEN.
7. Decide which gaps justify new provider outreach versus remaining parked until a real shipment requires the lane.

## Owner gates preserved

- no exclusive carrier/warehouse commitment without explicit owner approval;
- no long-term or minimum-volume commitment without explicit owner approval;
- no booking, payment, or shipment release merely because a provider is priced;
- external provider emails remain draft-first unless Casey explicitly overrides;
- raw rates/private terms remain outside public Git;
- website/runtime Git remains separately owner-gated.

## Recommended execution after PM decision

**APPROVE ARCHITECTURE → BUILD CANONICAL PROVIDER PROFILES FROM EXISTING EVIDENCE → MARK VERIFIED/UNKNOWN/STALE FIELDS → CREATE ONE GAP LIST PER PROVIDER → REQUEST ONLY MISSING DECISION-CRITICAL DATA → LINK RATES TO EXACT SKU/QUANTITY/ROUTE → RECORD LIVE-SHIPMENT ACTUALS → PROMOTE PROVEN ROUTES**

Success state: Operations can answer for any order **what is shipping, how many, origin, destination, accepted route, storage/receiving node, current verified cost basis, responsible contact, required documents, and next execution step** without reconstructing old email history.