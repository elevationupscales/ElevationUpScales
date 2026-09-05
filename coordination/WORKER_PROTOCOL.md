# Elevation 4.3 — Worker Coordination Protocol

This protocol applies to coding, deployment, audit, admin, store, Marketplace, Solar Builder, Portal, business-plan, and operations workers participating in Elevation 4.3.

Read `/coordination/MANAGEMENT_README.md` first. It contains the controlling Overseer Directive and website-worker reporting rules.

## 1. Before Starting

Every worker must:

1. Read `/coordination/MANAGEMENT_README.md`.
2. Read `/ELEVATION_4_3_MASTER_STATUS.md`.
3. Confirm the current repository `main` SHA when code is involved.
4. Identify the controlling management feed/handoff for the workstream.
5. Read every manager feed that owns truth the task depends on.
6. Confirm whether production promotion is authorized, held, or outside scope.
7. Confirm parked work that must not be started.
8. Reuse existing systems and sources of truth instead of creating parallel databases/workflows.
9. If the work includes visual design, branding, merchandising, gallery work, presentation changes, or an owner-approved visual reference, explicitly extract the visual acceptance requirements before implementation.

If current production, the Master Status, Management, and an older handoff disagree, stop and resolve the conflict against the newest accepted owner/management decision before coding.

## 2. Management Feed Synchronization — Mandatory

A worker's chat is not the sole source of truth.

Every worker must keep the controlling Management feed synchronized with material work state.

### Check-in

Before substantive work, record or confirm:

- WORK ID
- role/worker
- baseline/main
- current branch/candidate
- exact claimed scope
- protected/non-scope
- dependent manager feeds checked
- blockers/dependencies
- deployment custody
- production authorization
- exact next action

### Material milestone updates

Update Management when any of the following materially changes:

- candidate SHA or branch head
- exact files/systems in scope
- scope or acceptance criteria
- blocker/dependency
- manager direction
- test PASS/FAIL/NOT VERIFIED
- preview URL
- commerce/PayPal state
- visual acceptance state
- deployment custody
- production authorization

Do not let work stack invisibly on a branch and explain it only at the end.

### Check-out / handoff

Before stopping, handing off, or running out of context/credits, record:

- last completed step
- exact branch/candidate/SHA
- writes performed
- verified state
- NOT VERIFIED state
- tests/evidence
- preview/production state
- blocker
- exact next action
- deployment custody
- rollback/accepted baseline
- manager feeds requiring follow-up

A handoff that exists only in chat is incomplete when Management is available.

### Website worker hard rule

Any worker touching website code, storefront UX, checkout, navigation, product pages, customer-facing assets, or deployment workflows must complete **CHECK-IN → IN-PROGRESS REPORTING → CHECK-OUT** in Management.

Before touching shared website code, check active WORK IDs and claimed scopes. If another worker owns the same route/file/runtime/release scope, stop and reconcile overlap before editing.

Use `/coordination/prompts/WEBSITE_WORKER_SYNC_PROMPT.md`.

## 3. While Working

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
- never use successful text-presence, route, syntax, unit, or static checks as proof that a requested visual redesign/merchandising scope has been fulfilled;
- keep Management synchronized so parallel workers do not operate on stale state.

## 4. Visual Scope / Reference Fidelity Protocol

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

## 5. Worker-to-Worker Handoff Format

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
- confirmation that the controlling Management feed was updated

Use `/coordination/handoffs/HANDOFF_TEMPLATE.md` and `/coordination/prompts/WORKER_HANDOFF_CHECKOUT_PROMPT.md`.

## 6. Finish / Receipt Protocol

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
- Management feed updated: YES / NO

Use `/coordination/receipts/RECEIPT_TEMPLATE.md`.

## 7. Master Status Update

After a meaningful handoff, deployment, acceptance, hold, rollback, strategic decision, material acceptance failure, or major scope/custody change, update the relevant workstream in `/ELEVATION_4_3_MASTER_STATUS.md` and keep Gmail Management synchronized.

The Master Status should stay concise. Detailed evidence belongs in receipts and detailed instructions belong in handoffs/Management feeds.

## 8. Decision Logging

A durable business or architecture decision that future workers must not accidentally reverse should be captured under `/coordination/decisions/`.

Examples:

- Marketplace and Store are separate systems.
- Catalog Manager is the commerce product source of truth.
- Portal is separate from the public Website/Admin deployment.
- Production promotion requires management approval for a gated release.
- Visual acceptance is separate from technical/functional acceptance when visual scope is explicitly requested.
- Website workers must synchronize material work state with Management so parallel work does not stack over itself.

Use `/coordination/decisions/DECISION_TEMPLATE.md`.

## 9. Stop Rule

When the authorized task passes **all required acceptance dimensions**:

1. update the controlling Management feed;
2. produce the receipt;
3. update status;
4. clean temporary release-only automation if authorized;
5. stop.

Do not continue into adjacent parked work because time or context remains.

For owner-directed visual work, do not stop at "tests passed" if the visual acceptance gate remains unverified.

For website work, do not stop with Management stale.
