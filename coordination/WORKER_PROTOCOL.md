# Elevation 4.3 — Worker Coordination Protocol

This protocol applies to coding, deployment, audit, admin, store, Marketplace, Solar Builder, Portal, business-plan, and operations workers participating in Elevation 4.3.

## 1. Before Starting

Every worker must:

1. Read `/ELEVATION_4_3_MASTER_STATUS.md`.
2. Confirm the current repository `main` SHA.
3. Identify the controlling handoff for the workstream.
4. Confirm whether production promotion is authorized, held, or outside scope.
5. Confirm parked work that must not be started.
6. Reuse existing systems and sources of truth instead of creating parallel databases/workflows.

If current production, the Master Status, and an older handoff disagree, stop and resolve the conflict against the newest accepted owner/management decision before coding.

## 2. While Working

Workers must:

- keep the change scoped to the approved objective;
- preserve working production behavior unless the change explicitly replaces it;
- avoid unrelated cleanup;
- use existing IDs/data relationships;
- preserve customer/company data through safe migrations;
- distinguish internal workflow states from customer-facing language;
- record material blockers rather than bypassing them;
- use preview/staging when required by the controlling handoff.

## 3. Worker-to-Worker Handoff Format

A handoff must identify:

- workstream
- status
- authoritative parent SHA
- controlling decision/handoff
- objective
- exact scope
- explicit non-scope / parked work
- dependencies
- acceptance tests
- production authorization state
- expected receipt

Use `/coordination/handoffs/HANDOFF_TEMPLATE.md` for new detailed handoffs.

## 4. Finish / Receipt Protocol

A worker does not close a task by saying “done.”

Return evidence:

- parent SHA
- resulting SHA
- branch / PR if used
- files changed
- schema changes
- preview/deployment URL
- workflow/run ID
- test results
- negative/regression tests
- known anomalies
- deferred items
- rollback reference
- production state
- next action

Use `/coordination/receipts/RECEIPT_TEMPLATE.md`.

## 5. Master Status Update

After a meaningful handoff, deployment, acceptance, hold, rollback, or strategic decision, update the relevant workstream in `/ELEVATION_4_3_MASTER_STATUS.md`.

The Master Status should stay concise. Detailed evidence belongs in receipts and detailed instructions belong in handoffs.

## 6. Decision Logging

A durable business or architecture decision that future workers must not accidentally reverse should be captured under `/coordination/decisions/`.

Examples:

- Marketplace and Store are separate systems.
- Catalog Manager is the commerce product source of truth.
- Portal is separate from the public Website/Admin deployment.
- Production promotion requires management approval for a gated release.

Use `/coordination/decisions/DECISION_TEMPLATE.md`.

## 7. Stop Rule

When the authorized task passes its acceptance tests:

1. produce the receipt;
2. update status;
3. clean temporary release-only automation if authorized;
4. stop.

Do not continue into adjacent parked work because time or context remains.
