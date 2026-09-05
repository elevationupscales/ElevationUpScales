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
7. If the work includes visual design, branding, merchandising, gallery work, presentation changes, or an owner-approved visual reference, explicitly extract the visual acceptance requirements before implementation.

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
- use preview/staging when required by the controlling handoff;
- distinguish functional completion from visual-scope completion;
- never use successful text-presence, route, syntax, unit, or static checks as proof that a requested visual redesign/merchandising scope has been fulfilled.

## 3. Visual Scope / Reference Fidelity Protocol

This section is mandatory when the task includes language such as **visual upgrade, redesign, presentation, merchandising, branding, gallery, premium, showcase, match this look, visual reference**, or similar owner-directed presentation work.

### Before implementation

Record:

- the controlling visual reference(s), if any;
- required visual hierarchy;
- exact approved logo/identity/brand assets;
- required product/media emphasis;
- spacing/readability direction;
- icon/use-case communication requirements where applicable;
- primary and secondary CTA hierarchy;
- exact pages/sections in scope;
- explicit non-scope.

If an owner-approved reference image exists, label it:

`VISUAL REFERENCE — CONTROLLING`

It is an acceptance artifact, not merely inspiration.

### During implementation

Workers must not reduce a visual-merchandising requirement to copy changes, extra cards, generic gradients, or interface controls unless that is actually what the brief requests.

Prefer proving the requested visual hierarchy directly:

- product prominence;
- image depth;
- approved media use;
- readable spacing;
- restrained CTA hierarchy;
- brand fidelity;
- mobile preservation of the same hierarchy.

Do not invent a new logo, approximation, partner mark, color system, or presentation identity to fill a missing asset.

### Before completion

Report acceptance dimensions separately:

- FUNCTIONAL: PASS / FAIL / NOT VERIFIED
- TECHNICAL: PASS / FAIL / NOT VERIFIED
- SECURITY / COMMERCE: PASS / FAIL / NOT VERIFIED
- VISUAL SCOPE: PASS / FAIL / NOT VERIFIED
- OWNER VISUAL ACCEPTANCE: PASS / HOLD / NOT REQUIRED

For visual work, provide desktop and mobile screenshots or equivalent reviewable visual evidence when practical.

When the owner supplied or specifically approved the visual reference, owner/management review is required before calling that visual scope complete.

A task is not overall PASS when any required acceptance dimension is FAIL or NOT VERIFIED.

See `/coordination/decisions/DEC-009-visual-scope-acceptance-gate.md`.

## 4. Worker-to-Worker Handoff Format

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
- visual acceptance requirements when applicable
- production authorization state
- expected receipt

Use `/coordination/handoffs/HANDOFF_TEMPLATE.md` for new detailed handoffs.

## 5. Finish / Receipt Protocol

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
- visual evidence and visual acceptance result when applicable
- known anomalies
- deferred items
- rollback reference
- production state
- next action

Use `/coordination/receipts/RECEIPT_TEMPLATE.md`.

## 6. Master Status Update

After a meaningful handoff, deployment, acceptance, hold, rollback, strategic decision, or material acceptance failure, update the relevant workstream in `/ELEVATION_4_3_MASTER_STATUS.md`.

The Master Status should stay concise. Detailed evidence belongs in receipts and detailed instructions belong in handoffs.

## 7. Decision Logging

A durable business or architecture decision that future workers must not accidentally reverse should be captured under `/coordination/decisions/`.

Examples:

- Marketplace and Store are separate systems.
- Catalog Manager is the commerce product source of truth.
- Portal is separate from the public Website/Admin deployment.
- Production promotion requires management approval for a gated release.
- Visual acceptance is separate from technical/functional acceptance when visual scope is explicitly requested.

Use `/coordination/decisions/DECISION_TEMPLATE.md`.

## 8. Stop Rule

When the authorized task passes **all required acceptance dimensions**:

1. produce the receipt;
2. update status;
3. clean temporary release-only automation if authorized;
4. stop.

Do not continue into adjacent parked work because time or context remains.

For owner-directed visual work, do not stop at "tests passed" if the visual acceptance gate remains unverified.
