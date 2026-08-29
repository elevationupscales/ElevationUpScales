# DEC-004 — Retire Lithium Shipping Matrix as Primary Owner UI

**Date:** 2026-08-28  
**Status:** ACCEPTED

## Decision
The standalone `Lithium Shipping Matrix` is no longer the preferred owner-facing Admin model.

Preserve all Hawaii Lithium Phase 2 backend protections, records, gates, economics, reservations, batches, and audit history. Reframe the owner workflow around the existing business systems:

- Catalog = what the product is
- Inventory = whether Elevation can source it and what it costs
- Store Orders = what the customer bought and what must be fulfilled
- Shipping & Logistics = how the product/order moves
- Mission Control = what needs attention now

The existing `/admin-lithium-shipping` route may remain for compatibility but should present a simplified **Shipping & Logistics** workflow rather than a giant matrix-first interface.

## Rationale
The Phase 2 backend controls are useful and must remain. The problem is duplicated/overly technical presentation. The owner should not need to understand compliance/database architecture to operate Elevation.

## Non-negotiable
UI simplification must not weaken exact-SKU, supplier-cost, inventory-recheck, documentation, HOLD, route/provider, quote, customer-reconfirmation, batch-compatibility, or READY TO COMMIT/BOOKED server-side gates.

## Controlling implementation handoff
`coordination/handoffs/2026-08-28-admin-portal-pass2-shipping-logistics-simplification.md`
