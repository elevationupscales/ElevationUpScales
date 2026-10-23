# OS3 Supplier Data + Canada-First Commerce Policy

**Date:** 2026-10-04  
**Status:** OWNER-DIRECTED / INTERNAL OPERATING POLICY  
**Scope:** OS3 internal pricing, product qualification, catalog control, and online-store POS decision support.

## Core direction

OS3 must not assume every supplier needs or exposes a live commerce API. Supplier pricing, inventory, freight, eligibility, and SKU evidence may come from verified internal records when no suitable commerce API is available.

Every supplier fact used by OS3 must retain source provenance and freshness.

Required fields:
- supplier
- supplier SKU / exact variant SKU
- source type
- source date / verified-at date
- cost / dealer price
- availability state
- market eligibility
- fulfillment method
- freight or shipping evidence
- restrictions / MAP / territory notes
- verification status

Manual evidence must never be labeled live.

## Supplier data model

### CJdropshipping

Primary source:
- CJ API through Elevation CJ Bridge / OS3 CJ specialist.

Use for:
- discovery
- exact SKU / VID resolution
- stock-by-VID
- factory-vs-CJ inventory classification
- freight
- route qualification
- product economics

Inventory states:
- CJ WAREHOUSE STOCK
- FACTORY STOCK
- BOTH
- NO RELIABLE STOCK

Factory stock is sellable when route and fulfillment checks pass, but must not be represented as immediate CJ warehouse stock.

### VEVOR

No verified public commerce API is available for Elevation's dealer workflow.

OS3 source of truth:
- verified internal SKU records
- supplier/dealer correspondence
- live listings already approved by Elevation
- VEVOR dealer/wholesale portal checks performed manually
- order history and supplier-order evidence

Operating model:
- maintain a smaller curated VEVOR catalog rather than broad uncontrolled ingestion
- prioritize live listings and SKUs VEVOR has directly supplied or Elevation has already validated
- record dealer cost and availability from the portal with a verified-at timestamp
- stale manual price/availability must trigger RECHECK, not silent reuse
- do not infer inventory from an old listing or prior order

### Renogy

Renogy's public developer platform is device/cloud oriented and is not treated as a verified dealer-commerce API for Elevation.

OS3 source of truth for commerce:
- verified internal Renogy records
- dealer correspondence
- dealer portal pricing/availability
- approved product/SKU records
- existing U.S./Canada qualification evidence

Do not treat device API data as dealer price, stock, or order-fulfillment evidence.

## Canada-first international strategy

Canada is the next international **sales-focus market**, not a new market launch.

Current rule:
- do not add a twelfth Shopify market yet
- improve conversion inside existing active markets first
- Canada receives first international qualification priority for general merchandise

For a general-merchandise candidate to become a preferred international listing:
1. U.S. route/economics must pass.
2. Canada route/economics must pass.
3. Inventory source must be verified.
4. Delivered-cost strategy must be explicit.
5. Delivery expectations must be supportable by current evidence.
6. Margin must pass the internal floor.
7. Other active markets are secondary expansion lanes.

Do not override supplier restrictions:
- SOK retains controlled freight / specialty fulfillment logic.
- Olight retains territory and dealer restrictions.
- Renogy uses only confirmed U.S./Canada eligible products.
- VEVOR eligibility is controlled by current portal/internal evidence.

## Internal pricing / POS rule

OS3 online-store pricing decisions should combine:
- verified source cost
- current freight
- payment-fee assumption
- market-specific costs
- target contribution
- competitor context when needed
- supplier restrictions
- inventory-source quality

A manually sourced dealer price may be used when it is clearly timestamped and marked MANUAL-VERIFIED.

No stale or unverified supplier price should silently drive automated repricing or publication.

## Catalog strategy

VEVOR:
- smaller, controlled catalog
- live/current SKUs first
- portal refresh for price and availability

Renogy:
- qualified U.S./Canada SKUs first
- use internal/dealer records until a commerce API is formally verified

CJ:
- API-driven discovery and routing
- inventory and freight verification before publish

## Authority

Owner direction supersedes older generic expansion assumptions.

This policy is intended to be consumed by OS3 pricing, product-recon, catalog, and store-POS workflows.
