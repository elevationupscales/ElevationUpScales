# Elevation UpScales — Active Operations Control

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-07**

This directory is the active repository-based source of truth for current Elevation UpScales ecommerce, supplier-fulfillment, shipping, and logistics operating rules that are safe to store in this public repository.

## Source-of-truth rule

For current operational work:

1. Casey / Owner's newest explicit instruction controls.
2. Current files under `/operations/` control the active operating procedure.
3. Current application source under `main` controls website behavior.
4. Gmail management records are **backup / historical reference only** and must not be treated as the active management control plane.
5. Historical files under `/coordination/` are evidence / rollback / prior-decision records unless a current `/operations/` document explicitly incorporates them.

Do not reconstruct current policy from old Gmail drafts, old management feeds, prior chat summaries, or historical coordination files when a current operations file exists.

## Current controlling SOP

- [`SOK_ECOMMERCE_SHIPPING_SOP.md`](./SOK_ECOMMERCE_SHIPPING_SOP.md) — SOK battery, Lithium Store, RV/Outdoor Store, Lower-48 ecommerce, Hawaii/Alaska specialized shipping, paid-order recovery, prepurchase, and freight-agreement operating rules.

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

The active repository SOP may reference the existence of protected supplier evidence without reproducing it.

## Worker rule

Before changing SOK, lithium, RV/outdoor ecommerce, shipping-option, Hawaii/Alaska, purchase-agreement, or fulfillment behavior:

1. read this file;
2. read the applicable operations SOP;
3. inspect current application source;
4. preserve protected pricing/MAP, payment, safety, customer-data and compliance boundaries;
5. do not revive a conflicting Gmail-era rule unless Casey explicitly directs it.

Operational complexity should remain behind the customer experience wherever possible.
