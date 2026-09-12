# Elevation UpScales — eBay Source-Side Recovery Support

**Status:** ACTIVE SUPPORT / NON-CONSEQUENTIAL RECON  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Execution owner for Seller Hub actions:** eBay Store Operations Worker  
**PM3 role:** source-side reconciliation only; do not duplicate Seller Hub actions

## Purpose

Provide supplier/order-source facts to the dedicated eBay Store Operations Worker while authenticated Seller Hub execution remains gated.

## Exact-order source-side findings

Gmail was searched for the currently unresolved eBay order numbers and for recent Doba product/order correspondence.

### Doba-supported shipped order

- eBay store order `12-15143-03510`
- Doba order `26091017391956`
- Product family: heavy-duty folding/camping bed
- Doba email confirms SHIPPED
- Control: **DO NOT CANCEL**; Seller Hub only needs current tracking/state reconciliation.

### No supplier-order confirmation found in current Gmail evidence

No Doba confirmation/shipment email was found for these exact unresolved eBay orders:

- `25-15104-41137` — late folding bed
- `20-15123-05140` — VEVOR rechargeable flashlight
- `02-15170-43443` — back-seat organizer, sold for $24.33, ship-by Sep. 16

This does not prove the orders were never placed through another supplier/source. It means current Gmail evidence does **not** support assuming Doba fulfillment exists for them.

## Back-seat organizer exact listing recon

Current eBay correspondence pins the organizer sale to the same listing created on August 23, 2026:

- eBay item: `168634275726`
- Customer-facing price at listing creation: `$24.33`
- Sale order: `02-15170-43443`
- Sale price: `$24.33`
- Ship-by date: September 16, 2026
- Current Shopify connected-store search returns no exact `Universal Tactical Vehicle Back Seat Organizer` or `back seat organizer` product record.
- Current Gmail source recon returns no Doba organizer/order confirmation and no supplier acceptance/tracking record tied to the exact order.

Classification: **SOURCE UNRESOLVED / FULFILLMENT NOT PROVEN.**

The lack of a Shopify record does not prove the eBay listing is invalid; it proves the Shopify catalog cannot be used as source evidence for this order. The dedicated eBay worker must preserve the live order until Seller Hub/source truth is verified and must not assume Doba, Shopify, VEVOR, or another supplier merely from product-title similarity.

## Control

Until live Seller Hub and source records prove otherwise:

**NO SUPPLIER EMAIL = DO NOT ASSUME FULFILLMENT → VERIFY SELLER HUB + SOURCE → RESOLVE CUSTOMER TRUTHFULLY.**

Do not cancel any order merely because a Doba email is absent. Do not claim any order shipped merely because a similar product/order exists elsewhere.

## Back-seat organizer priority

The organizer order remains within its stated ship window and is the strongest current recovery opportunity.

Required sequence:

**EXACT LISTING/SKU → EBAY CHANNEL-PERMITTED SOURCE → CURRENT SOURCE COST → AVAILABILITY → SHIPPING COST → EBAY FEES / PROMOTION FEES → EXPECTED CONTRIBUTION → SUPPLIER ORDER/ACCEPTANCE → TRACKING.**

If positive contribution and executable fulfillment cannot be established before the handling commitment becomes unsafe, route the exact order as an exception instead of repeating the prior late-order pattern.

## Handoff

The eBay Store Operations Worker remains the only execution owner for:

- Seller Hub cancellation/refund decisions;
- in-platform buyer messages without an existing member-relay thread;
- tracking edits;
- listing edits/end/relist decisions;
- active listing views/watchers/sales audit.

PM3/Company Operations may continue sourcing, vendor-permission and economics support without touching those Seller Hub actions.
