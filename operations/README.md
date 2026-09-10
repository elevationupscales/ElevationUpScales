# Elevation UpScales — Active Operations Control

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-07**  
**Management SOP reconciled: 2026-09-10**

This directory is the active repository-based source of truth for current Elevation UpScales ecommerce, supplier-fulfillment, shipping, logistics, management operating rules, and public-safe work state.

## Source-of-truth rule

For current operational work:

1. Casey / Owner's newest explicit instruction controls.
2. `CURRENT_WORK_BOARD.md` controls reconciled global current priority and unresolved work-item state.
3. The applicable current `/operations/` SOP, project record, or domain record controls lane-specific operating rules and durable facts.
4. Current application source under `main` controls actual website/runtime behavior.
5. **GitHub is the active management/work source.**
6. Gmail management drafts/feeds/recovery snapshots are not active management control. Ordinary Gmail remains available for actual business correspondence and factual evidence when the work requires it; material current state is reconciled back into Git.
7. Historical `/coordination/` files are evidence / rollback / prior-decision records unless a current `/operations/` record explicitly incorporates them.

Do not reconstruct current policy from stale drafts, chat summaries, or historical coordination records when current Git state is available and consistent.

## Operating Framework

**CASEY → OPERATING SYSTEM PROJECT MANAGER → PROJECT / MANAGER → ROUTED WORKER / SPECIALIST**

- The **Operating System Project Manager** owns reconciled overall project state, cross-project routing, verification, and closure.
- The **Company Operations Manager** owns company-operational execution and routes work items to appropriate managers/workers/specialists.
- The **Operating System Reconciliation / Integrity Specialist** supports state reconstruction, conflict cleanup, worktree continuity, and reconciliation when directed; it does not replace the Project Manager or independently own operational execution.
- Workers and specialists execute routed work and return state/evidence. They do not independently own master project state or create competing management sources of truth.
- `/operations/` is the active policy and public-safe evidence/state library; the OS Project Manager maintains the reconciled global state through `CURRENT_WORK_BOARD.md`.

## State-authority boundaries

Use one owner for each type of state:

- [`CURRENT_WORK_BOARD.md`](./CURRENT_WORK_BOARD.md) — **canonical global current worktree and priority**. Material unresolved work remains visible here until closed or explicitly superseded.
- [`SUPPLIER_LEADS_LIVE_MAP.md`](./SUPPLIER_LEADS_LIVE_MAP.md) — **canonical supplier-domain relationship/status map**. It does not replace the global work board.
- Dated follow-up records such as `ACTIVE_FOLLOWUPS_2026-09-08.md` — **historical / correspondence-action evidence** used for WAITING triggers, duplicate-send protection, and reconstruction. Older priority labels do not override the work board.
- Manager/worker control records such as `PETER_PROJECT_STARTER_V2_2026-09-10.md` — lane structure and execution behavior, not a second global priority system.
- Command Center development plans — control only their specific development scope.
- Current `main`, branches, PRs, Actions, platforms, and verified correspondence provide execution evidence; they do not create a second management worktree.

**PRIORITY CHANGE ≠ PROJECT CLOSURE.**  
**NEW PROJECT ≠ OLD PROJECT DISAPPEARS.**  
**WAITING ≠ CLOSED.**  
**HOLD ≠ FORGOTTEN.**

## Current controlling SOP / control library

- [`CURRENT_WORK_BOARD.md`](./CURRENT_WORK_BOARD.md) — canonical global work board.
- [`MANAGEMENT_OPERATING_SOP.md`](./MANAGEMENT_OPERATING_SOP.md) — universal management execution standard, commercial strategy, proportional controls, reuse-first development, public-data protection, and common metrics.
- [`CROSS_GPT_COMMUNICATION_AND_APPROVAL_SOP_2026-09-10.md`](./CROSS_GPT_COMMUNICATION_AND_APPROVAL_SOP_2026-09-10.md) — Company Operations ↔ Peter execution synchronization and Git/development approval boundaries; global current priority comes from the work board.
- [`INTERNAL_WORKER_CONFIDENTIALITY_IP_AND_FILE_USE_POLICY.md`](./INTERNAL_WORKER_CONFIDENTIALITY_IP_AND_FILE_USE_POLICY.md) — controlling Company Materials/confidentiality/IP/file-use policy.
- [`DISASTER_RECOVERY_SOP.md`](./DISASTER_RECOVERY_SOP.md) — recovery-only procedure for worker/session failure, interrupted exact-SHA releases, temporary GitHub loss, checkpoint discipline, and cold recovery evidence.
- [`MAIN_INBOX_MANAGER_SOP.md`](./MAIN_INBOX_MANAGER_SOP.md) — Main Inbox Worker / Email Coordination Specialist execution standard.
- [`INBOX_OPERATIONS_ROUTING_SOP.md`](./INBOX_OPERATIONS_ROUTING_SOP.md) — Company Operations decision/routing/escalation logic for material inbox findings.
- [`SOK_ECOMMERCE_SHIPPING_SOP.md`](./SOK_ECOMMERCE_SHIPPING_SOP.md) — SOK battery/ecommerce/Lower-48/Hawaii/Alaska/paid-order/prepurchase/shipping rules.
- [`SOK_RECON_OS_PROJECT.md`](./SOK_RECON_OS_PROJECT.md) — dedicated SOK Supplier, Commerce & Warranty Project / SOK RECON OS scope.
- [`SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md`](./SOK_HAWAII_WARRANTY_NEGOTIATION_DIRECTIVE_2026-09-10.md) — current supplier-specific Hawaii warranty negotiation posture and owner gates.
- [`WARRANTY_FULFILLMENT_SERVICE_WORKFLOW.md`](./WARRANTY_FULFILLMENT_SERVICE_WORKFLOW.md) — shared company Warranty Fulfillment lifecycle; supplier-specific economics remain in supplier projects.
- [`LOGISTICS_PRICING_MODEL.md`](./LOGISTICS_PRICING_MODEL.md) — specialized-logistics pricing architecture and protected-rate boundaries.
- [`SUPPLIER_LOGISTICS_GROWTH.md`](./SUPPLIER_LOGISTICS_GROWTH.md) — supplier/commercial opportunity model.
- [`SUPPLIER_LEADS_LIVE_MAP.md`](./SUPPLIER_LEADS_LIVE_MAP.md) — supplier/commercial relationship and lead state; global priority remains in `CURRENT_WORK_BOARD.md`.
- [`DROPSHIP_VENDOR_OUTREACH_STANDARD.md`](./DROPSHIP_VENDOR_OUTREACH_STANDARD.md) — dropship first-outreach standard.
- [`VENDOR_ONBOARDING_AND_CATALOG_MERGE_SOP.md`](./VENDOR_ONBOARDING_AND_CATALOG_MERGE_SOP.md) — proportional post-approval vendor onboarding/catalog merge standard.
- [`COMMAND_CENTER_SUPPLIER_LEADS_DEPLOYMENT.md`](./COMMAND_CENTER_SUPPLIER_LEADS_DEPLOYMENT.md) — Supplier/Commercial Leads deployment contract for its specific development scope.
- [`COMMAND_CENTER_ECOMMERCE_WORKFLOW_PLAN.md`](./COMMAND_CENTER_ECOMMERCE_WORKFLOW_PLAN.md) — Admin/ecommerce development plan for its specific scope.
- [`PETER_PROJECT_STARTER_V2_2026-09-10.md`](./PETER_PROJECT_STARTER_V2_2026-09-10.md) — Peter's simplified Ecommerce & Vendor Operations execution control; work order comes from `CURRENT_WORK_BOARD.md`.
- [`shopify-manager/SHOPIFY_MANAGER.md`](./shopify-manager/SHOPIFY_MANAGER.md) — Shopify / Shopify POS / Doba / SOK ecommerce worker lane under Company Operations.

## Public-repository protection

This repository is public. Do not commit confidential supplier/customer information, including dealer/wholesale costs, raw supplier inventory counts, private correspondence, payment credentials/private terms, private carrier quotes, non-public compliance packets, customer PII, or private commercial terms.

The active repository may reference the existence/status of protected evidence without reproducing it.

## Worker rule

Before changing SOK, ecommerce, shipping, warranty fulfillment, specialized logistics, supplier/commercial lead behavior, inbox behavior, or management behavior:

1. read this file;
2. read `CURRENT_WORK_BOARD.md` when current priority, owner, blocker/trigger, or closure state matters;
3. read `MANAGEMENT_OPERATING_SOP.md` for shared execution/efficiency rules;
4. read the narrow lane/project SOP required for the assigned work;
5. inspect current application source when runtime behavior is involved;
6. preserve protected pricing/MAP, payment, safety, customer, supplier, freight and compliance boundaries;
7. reconcile new material facts into the owning lane record and update `CURRENT_WORK_BOARD.md` when current work state changes;
8. reuse existing storage, routes, auth, parsing, receipts, UI shells and permanent deployment workflows before building replacements;
9. use proportional QA during iteration and the required release QA before preview/merge/production when applicable.

Operational complexity should remain behind the customer experience wherever possible. Build new software only when it materially improves selling, quoting, fulfillment, product discovery, repeat purchasing, or workflow reliability.
