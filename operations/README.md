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
- [`SOK_STOCK_WORKFLOW.md`](./SOK_STOCK_WORKFLOW.md) — protected exact-SKU supplier stock verification for the complete SOK catalog, including preview/apply controls and the separation between stock observations and public commerce decisions.
- [`LOGISTICS_PRICING_MODEL.md`](./LOGISTICS_PRICING_MODEL.md) — controlling specialized-logistics pricing architecture separating Elevation product-sale / supplier-referral sales from standalone third-party logistics facilitation, including shipment-size tiers, quote construction, route confidentiality, and protected-rate-card boundaries.
- [`SUPPLIER_LOGISTICS_GROWTH.md`](./SUPPLIER_LOGISTICS_GROWTH.md) — supplier/commercial lead model covering dealer/wholesale, dropship, product sourcing, Hawaii/Alaska fulfillment, supplier referrals, and third-party logistics opportunity qualification.
- [`SUPPLIER_LEADS_LIVE_MAP.md`](./SUPPLIER_LEADS_LIVE_MAP.md) — current public-safe 56-record supplier/commercial lead tree, priorities, contacted/waiting state, draft-only controls, solar/inverter targets, dropship targets, Hawaii/Alaska opportunity lanes, and next-account direction.
- [`DROPSHIP_VENDOR_OUTREACH_STANDARD.md`](./DROPSHIP_VENDOR_OUTREACH_STANDARD.md) — controlling first-outreach tone/structure for dropshipping vendors based on the 2026-09-07 Renogy dealer/ecommerce email, with the current Elevation signature standard.
- [`COMMAND_CENTER_SUPPLIER_LEADS_DEPLOYMENT.md`](./COMMAND_CENTER_SUPPLIER_LEADS_DEPLOYMENT.md) — public-safe deployment contract for adding Supplier / Commercial Leads to the existing Command Center Leads area while preserving the existing customer/Solar leads subsystem and protected-data boundaries.
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

Before changing SOK, lithium, RV/outdoor ecommerce, shipping-option, Hawaii/Alaska, purchase-agreement, fulfillment, specialized-logistics pricing, supplier/commercial lead behavior, or management behavior:

1. read this file;
2. read the applicable `/operations/` SOP, growth model, live lead map, outreach standard, deployment contract, or manager file;
3. read the logistics pricing model when pricing or quoting is involved;
4. inspect current application source when website or Command Center behavior is involved;
5. preserve protected pricing/MAP, payment, safety, customer-data, supplier-data and compliance boundaries;
6. do not use Gmail-era management records as an active source;
7. reconcile any new verified operational fact or owner direction into the appropriate GitHub operations record when it materially changes current work.

Operational complexity should remain behind the customer experience wherever possible.
