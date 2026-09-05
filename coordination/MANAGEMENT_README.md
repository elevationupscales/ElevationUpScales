# Elevation UpScales — Management README / Overseer Directive

**Status:** CONTROLLING MANAGEMENT COORDINATION STANDARD

This README exists to prevent workers from stacking work over one another, losing the accepted baseline, forgetting who owns deployment, or working from stale chat context.

## The Overseer Rule

**NO WORKER MAY TREAT ITS CHAT AS THE ONLY SOURCE OF TRUTH.**

Before substantive work, every worker must reconcile itself against the current Management system. While working, it must report material state changes back into Management. Before stopping, handing off, or running out of context/credits, it must leave Management in a state where another worker can continue without Casey manually carrying the handoff.

The management loop is:

**READ → RECONCILE → CLAIM → WORK → REPORT → VERIFY → HANDOFF/CLOSE**

## Required Management Sources

Before working, read the relevant current records in this order:

1. Owner/Casey's newest explicit direction.
2. `EUS MANAGEMENT DIRECTORY — ChatGPT Workers & Gmail Workflow (LIVE)`.
3. The active controlling management feed for the workstream.
4. The newest accepted production receipt/baseline when code or deployment is involved.
5. Relevant manager-specific standards/feeds (Website, Operations, Supplier, Freight, Advertising, Finance/Legal, etc.).
6. Current work-item handoff/candidate receipt.

If records conflict, do not guess. Reconcile against the newest accepted owner/management direction and update the controlling feed.

## Website Worker Hard Rule

**Any worker touching the website, repository, storefront, checkout, navigation, product pages, customer-facing assets, or deployment workflow MUST report its work in Management.**

A website worker must perform all three management stages:

### 1. CHECK-IN — before edits

Report:

- WORK ID
- worker/role
- current baseline/main SHA
- branch/candidate if one exists
- exact claimed scope
- excluded/protected scope
- relevant manager feeds checked
- current blocker/dependency
- deployment custody state
- production authorization state
- exact next action

Do not begin overlapping edits until the work claim is reconciled.

### 2. IN-PROGRESS REPORTING — after material milestones

Update Management when any of these changes:

- candidate SHA
- branch/head
- files/systems materially changed
- scope changes
- new blocker
- dependency resolved
- tests pass/fail
- preview created
- visual acceptance changes
- PayPal/commerce status changes
- deployment custody changes
- production authorization changes
- another worker/manager supplies new controlling direction

A worker must not accumulate a large unreported branch and only explain it at the end.

### 3. CHECK-OUT — before stopping/handoff

Record:

- last completed step
- exact candidate/branch/SHA
- what is verified
- what is NOT VERIFIED
- writes already performed
- tests and evidence
- preview/production state
- blocker
- exact next action
- deployment custody
- accepted rollback/baseline
- manager feeds that need follow-up

Then stop. The replacement worker must be able to continue from Management without Casey relaying the handoff.

## Cross-Manager Reconciliation Rule

Workers must not read only the manager feed that assigned them.

Before implementation, ask: **Which other managers own truth that this work depends on?**

Examples:

- Website visual/product work → Website + Operations + Supplier/Partnership + Brand/Advertising where applicable.
- Checkout/payment work → Website + Operations + Finance/commerce controls + Deployment.
- Hawaii lithium work → Website + Operations + Email/Freight + Supplier/Partnership.
- Campaign landing work → Advertising + Website + Supplier/Partnership + Operations.
- Pricing/MAP → Supplier/Partnership + Operations; website workers consume approved public-safe truth only.

Workers may consume manager truth, but may not silently redefine another manager's lane.

## Anti-Stacking Rule

Before changing shared code or a shared business workflow:

1. identify existing active WORK IDs;
2. identify current claimed files/systems;
3. identify current candidate(s);
4. identify deployment custody;
5. stop if scopes overlap;
6. assign one primary owner or split the work into non-overlapping scopes;
7. reconcile before continuing.

Only one controlling candidate/handoff may exist for one production release scope.

## Deployment Rule

Deployment custody is explicit, never implied.

A branch, preview, old greenlight, successful test, or previous deployment does not grant production authority.

Website workers must report deployment state in every meaningful handoff:

- NONE
- RESERVED
- PREVIEW CUSTODY
- PRODUCTION CUSTODY
- CLOSED

If the feed does not explicitly show current production authority for the named work item/candidate, production deployment is not authorized.

## Acceptance Rule

For visual/brand/merchandising work, functional tests are not enough. Report separately:

- FUNCTIONAL
- TECHNICAL
- SECURITY / COMMERCE
- VISUAL SCOPE
- OWNER VISUAL ACCEPTANCE

For all work, `NOT VERIFIED` is never `PASS`.

## Required Prompt Library

Use the templates under `/coordination/prompts/`:

- `WORKER_START_CHECKIN_PROMPT.md`
- `WEBSITE_WORKER_SYNC_PROMPT.md`
- `WORKER_HANDOFF_CHECKOUT_PROMPT.md`
- `MANAGER_RECONCILIATION_PROMPT.md`
- `DEPLOYMENT_CUSTODY_PROMPT.md`

These prompts are designed to be copy/pasted into workers when a worker forgets the coordination rules.

## Management Outcome

The system succeeds when:

- Casey does not manually carry routine handoffs;
- workers know the accepted baseline before editing;
- managers' directions remain synchronized;
- parallel work is non-overlapping;
- the current candidate is always identifiable;
- deployment custody is always explicit;
- another worker can resume without reconstructing history;
- no worker calls a task complete while Management still shows stale or conflicting state.

**READ MANAGEMENT FIRST. REPORT WORK WHILE WORKING. UPDATE MANAGEMENT BEFORE STOPPING.**
