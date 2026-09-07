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

## Manager Git access directive

Managers and manager-linked ChatGPT workspaces may use GitHub to stay synchronized with current Elevation operating information, subject to the following restricted access boundary:

- The designated manager control file is `/operations/README.md`.
- Managers may **read** the designated manager control file at start/resume and whenever current operating direction may have changed.
- Managers may **edit only `/operations/README.md`** for management-control updates, cross-manager status notes, source-of-truth pointers, or owner-directed management directives.
- Manager access does **not** authorize edits to application code, workflows, deployment files, SOPs, pricing models, historical coordination records, or any other repository file.
- Managers may read other `/operations/` documents that `/operations/README.md` identifies as controlling references when needed to understand current policy, but those documents remain read-only to manager chats unless Casey explicitly grants a separate named write scope.
- Any repository write outside `/operations/README.md` requires a separate owner-authorized work item and the appropriate worker/deployment lane.
- This restriction applies even when the connected GitHub account technically has broader repository permissions.
- Public-repository protection rules remain controlling: never place supplier costs, raw inventory, private correspondence, customer data, credentials, private carrier quotes, non-public compliance packets, or private commercial terms in the manager file.

Manager operating sequence:

**READ `/operations/README.md` → FOLLOW ITS CURRENT CONTROL POINTERS → RECONCILE OWNER DIRECTION → UPDATE `/operations/README.md` ONLY WHEN MANAGEMENT STATE MATERIALLY CHANGES → LEAVE ALL OTHER REPOSITORY WRITES TO THE AUTHORIZED WORKER LANE.**

## Current controlling SOP

- [`SOK_ECOMMERCE_SHIPPING_SOP.md`](./SOK_ECOMMERCE_SHIPPING_SOP.md) — SOK battery, Lithium Store, RV/Outdoor Store, Lower-48 ecommerce, Hawaii/Alaska specialized shipping, paid-order recovery, prepurchase, and freight-agreement operating rules.
- [`LOGISTICS_PRICING_MODEL.md`](./LOGISTICS_PRICING_MODEL.md) — controlling specialized-logistics pricing architecture separating Elevation product-sale / supplier-referral sales from standalone third-party logistics facilitation, including shipment-size tiers, quote construction, route confidentiality, and protected-rate-card boundaries.

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

Before changing SOK, lithium, RV/outdoor ecommerce, shipping-option, Hawaii/Alaska, purchase-agreement, fulfillment, or specialized-logistics pricing behavior:

1. read this file;
2. read the applicable operations SOP;
3. read the logistics pricing model when pricing or quoting is involved;
4. inspect current application source;
5. preserve protected pricing/MAP, payment, safety, customer-data and compliance boundaries;
6. do not revive a conflicting Gmail-era rule unless Casey explicitly directs it.

Operational complexity should remain behind the customer experience wherever possible.
