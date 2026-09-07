# Elevation UpScales — Active Operations Control

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-07**

This directory is the active repository-based source of truth for current Elevation UpScales ecommerce, supplier-fulfillment, shipping, logistics, and management operating rules that are safe to store in this public repository.

## Source-of-truth rule

For current operational work:

1. Casey / Owner's newest explicit instruction controls.
2. Current files under `/operations/` control the active operating procedure and management state.
3. Current application source under `main` controls website behavior.
4. **GitHub is the only active management/work source.**
5. **Do not use Gmail management drafts, Gmail management feeds, or Gmail management records for active work, task intake, status, decision-making, workflow control, or management reconciliation.** Gmail is historical/archive evidence only.
6. Historical files under `/coordination/` are evidence / rollback / prior-decision records unless a current `/operations/` document explicitly incorporates them.

Do not reconstruct current policy from Gmail drafts, Gmail management feeds, prior chat summaries, or historical coordination files when a current `/operations/` document exists.

Email may still be used when the work itself requires reading or sending an actual external business email, but email content does not become active management direction unless the resulting verified fact or owner decision is reconciled into GitHub `/operations/` control.

## Current controlling SOP

- [`SOK_ECOMMERCE_SHIPPING_SOP.md`](./SOK_ECOMMERCE_SHIPPING_SOP.md) — SOK battery, Lithium Store, RV/Outdoor Store, Lower-48 ecommerce, Hawaii/Alaska specialized shipping, paid-order recovery, prepurchase, and freight-agreement operating rules.
- [`LOGISTICS_PRICING_MODEL.md`](./LOGISTICS_PRICING_MODEL.md) — controlling specialized-logistics pricing architecture separating Elevation product-sale / supplier-referral sales from standalone third-party logistics facilitation, including shipment-size tiers, quote construction, route confidentiality, and protected-rate-card boundaries.
- [`shopify-manager/SHOPIFY_MANAGER.md`](./shopify-manager/SHOPIFY_MANAGER.md) — dedicated Shopify / Shopify POS / Doba / SOK ecommerce management lane for Peter Torres and the Shopify Manager.

## Public-repository protection

This repository is public. Do **not** commit confidential supplier or customer information here, including:

- dealer / wholesale costs
- raw supplier inventory counts
- private supplier correspondence
- payment credentials or private payment terms
- private carrier quotes
- non-public hazmat/compliance packets
- customer personal information
- private commercial terms

The active repository SOP may reference the existence or status of protected evidence without reproducing it.

## Worker rule

Before changing SOK, lithium, RV/outdoor ecommerce, shipping-option, Hawaii/Alaska, purchase-agreement, fulfillment, specialized-logistics pricing, or management behavior:

1. read this file;
2. read the applicable `/operations/` SOP or manager file;
3. read the logistics pricing model when pricing or quoting is involved;
4. inspect current application source when website behavior is involved;
5. preserve protected pricing/MAP, payment, safety, customer-data and compliance boundaries;
6. do not use Gmail-era management records as an active source;
7. reconcile any new verified operational fact or owner direction into the appropriate GitHub operations record when it materially changes current work.

Operational complexity should remain behind the customer experience wherever possible.
