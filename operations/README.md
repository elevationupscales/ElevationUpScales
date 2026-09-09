# Elevation UpScales — Active Operations Control

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-07**  
**Management SOP reconciled: 2026-09-09**

This directory is the active repository-based source of truth for current Elevation UpScales ecommerce, supplier-fulfillment, shipping, logistics, and management operating rules that are safe to store in this public repository.

## Source-of-truth rule

For current operational work:

1. Casey / Owner's newest explicit instruction controls.
2. Current files under `/operations/` control the active operating procedure and management state.
3. Current application source under `main` controls website behavior.
4. **GitHub is the only active management/work source.**
5. **Do not use Gmail management drafts, Gmail management feeds, recovery snapshots, or old Gmail management records for active work, task intake, status, decision-making, workflow control, or management reconciliation.** Gmail recovery snapshots are cold emergency evidence only and are read only under `DISASTER_RECOVERY_SOP.md`. Ordinary Gmail remains available for actual external business correspondence.
6. Historical files under `/coordination/` are evidence / rollback / prior-decision records unless a current `/operations/` document explicitly incorporates them.

Do not reconstruct current policy from Gmail drafts, Gmail recovery snapshots, prior chat summaries, or historical coordination files when current Git state is available and consistent.

Email may still be used when the work itself requires reading or sending an actual external business email, but email content does not become active management direction unless the resulting verified fact or owner decision is reconciled into GitHub `/operations/` control.

## Current controlling SOP

- [`MANAGEMENT_OPERATING_SOP.md`](./MANAGEMENT_OPERATING_SOP.md) — shared management execution standard covering source-of-truth order, business priority, manager separation, efficient worktree execution, proportional QA, reuse-first development, public-data protection and common metrics.
- [`DISASTER_RECOVERY_SOP.md`](./DISASTER_RECOVERY_SOP.md) — recovery-only procedure for worker/session failure, interrupted exact-SHA releases, temporary GitHub loss, Git checkpoint discipline and Gmail cold recovery snapshots.
- [`MAIN_INBOX_MANAGER_SOP.md`](./MAIN_INBOX_MANAGER_SOP.md) — controlling actual-business-inbox standard covering customer-first prioritization, active supplier and freight correspondence, recipient safety, sending authority, thread preservation, streamlined vendor questions, protected commercial information, and public-safe management synchronization.
- [`SOK_ECOMMERCE_SHIPPING_SOP.md`](./SOK_ECOMMERCE_SHIPPING_SOP.md) — SOK battery, Lithium Store, RV/Outdoor Store, Lower-48 ecommerce, Hawaii/Alaska specialized shipping, paid-order recovery, prepurchase, and freight-agreement operating rules.
- [`LOGISTICS_PRICING_MODEL.md`](./LOGISTICS_PRICING_MODEL.md) — controlling specialized-logistics pricing architecture separating Elevation product-sale / supplier-referral sales from standalone third-party logistics facilitation, including shipment-size tiers, quote construction, route confidentiality, and protected-rate-card boundaries.
- [`SUPPLIER_LOGISTICS_GROWTH.md`](./SUPPLIER_LOGISTICS_GROWTH.md) — supplier/commercial lead model covering dealer/wholesale, dropship, product sourcing, Hawaii/Alaska fulfillment, supplier referrals, and third-party logistics opportunity qualification.
- [`SUPPLIER_LEADS_LIVE_MAP.md`](./SUPPLIER_LEADS_LIVE_MAP.md) — current public-safe supplier/commercial lead tree, priorities, contacted/waiting state, draft-only controls, solar/inverter targets, dropship targets, Hawaii/Alaska opportunity lanes, and next-account direction.
- [`DROPSHIP_VENDOR_OUTREACH_STANDARD.md`](./DROPSHIP_VENDOR_OUTREACH_STANDARD.md) — controlling first-outreach tone/structure for dropshipping vendors based on the current Elevation vendor standard.
- [`VENDOR_ONBOARDING_AND_CATALOG_MERGE_SOP.md`](./VENDOR_ONBOARDING_AND_CATALOG_MERGE_SOP.md) — controlling post-approval vendor onboarding standard covering vendor-master data, SKU/model merge packets, channel/MAP rules, supplier-inventory freshness, order/fulfillment workflows, warranty/media/compliance gates, catalog readiness, first-order proof and revalidation.
- [`COMMAND_CENTER_SUPPLIER_LEADS_DEPLOYMENT.md`](./COMMAND_CENTER_SUPPLIER_LEADS_DEPLOYMENT.md) — public-safe deployment contract for adding Supplier / Commercial Leads to the existing Command Center Leads area while preserving the existing customer/Solar leads subsystem and protected-data boundaries.
- [`COMMAND_CENTER_ECOMMERCE_WORKFLOW_PLAN.md`](./COMMAND_CENTER_ECOMMERCE_WORKFLOW_PLAN.md) — controlling development plan for consolidating the Admin into one six-area ecommerce operating system, redesigning the Leads family, completing intake/order/logistics workflows, and retiring duplicate presentation layers without weakening protected backend controls.
- [`shopify-manager/SHOPIFY_MANAGER.md`](./shopify-manager/SHOPIFY_MANAGER.md) — dedicated Shopify / Shopify POS / Doba / SOK ecommerce management lane for Peter Torres and the Shopify Manager.

## Public-repository protection

This repository is currently public. A future plan to make it private does **not** change the protection standard until repository visibility has actually changed and a new policy is explicitly adopted.

Do **not** commit confidential supplier or customer information here, including:

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

Before changing SOK, lithium, RV/outdoor ecommerce, shipping-option, Hawaii/Alaska, purchase-agreement, fulfillment, specialized-logistics pricing, supplier/commercial lead behavior, inbox correspondence behavior, or management behavior:

1. read this file;
2. read `MANAGEMENT_OPERATING_SOP.md` for shared management execution and efficiency rules;
3. read `MAIN_INBOX_MANAGER_SOP.md` when handling the actual business inbox or external business correspondence;
4. read `DISASTER_RECOVERY_SOP.md` only when recovery mode is actually triggered or when changing continuity/release-recovery behavior;
5. read only the applicable `/operations/` SOP, growth model, live lead map, outreach standard, deployment contract, or manager file needed for the assigned scope;
6. read the logistics pricing model when pricing or quoting is involved;
7. inspect current application source when website or Command Center behavior is involved;
8. preserve protected pricing/MAP, payment, safety, customer-data, supplier-data and compliance boundaries;
9. do not use Gmail-era management records or Gmail recovery snapshots as an active source;
10. reconcile any new verified operational fact or owner direction into the appropriate GitHub operations record when it materially changes current work;
11. reuse existing storage, routes, auth, parsing, receipts, UI shells and permanent deployment workflows before building replacements;
12. use proportional QA during iteration, then full release QA before preview, merge or production deployment.

Operational complexity should remain behind the customer experience wherever possible. New software should be built only when it materially improves selling, quoting, fulfillment, product discovery, repeat purchasing, or the reliability of those workflows.
