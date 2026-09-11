# Elevation UpScales — Unified RUN Workflow SOP

**Status:** ACTIVE / CONTROLLING EXTENSION  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**Parent:** `operations/OWNER_RUN_COMMAND_EXECUTION_PROTOCOL_2026-09-10.md`  
**GitHub Action:** `.github/workflows/unified-run-command.yml`

## Purpose

Provide one standard GitHub **RUN** action for partner projects, vendor projects, project managers, lane managers, developers and routed workers that are operating on an assigned Git branch.

The goal is:

**ONE OWNER RUN SEMANTIC → ONE BRANCH VALIDATION ACTION → ROLE-SCOPED RECEIPT → NORMAL PR/RELEASE FLOW**

This workflow reduces duplicate manager-specific Actions and stale branch procedures. It does not create a new management hierarchy, work board, supplier authority or deployment path.

**RUN IS AN EXECUTION/QA MECHANISM, NOT A COMPANY-WIDE TASK BROADCAST.**

## Authority order

Every Unified RUN uses the existing authority order:

1. Casey / Owner's newest explicit direction.
2. `operations/CURRENT_WORK_BOARD.md`.
3. `operations/OWNER_RUN_COMMAND_EXECUTION_PROTOCOL_2026-09-10.md`.
4. The applicable partner/project/lane control file under `operations/`.
5. `operations/MANAGEMENT_OPERATING_SOP.md` and applicable confidentiality/data rules.
6. Current Git/application/platform evidence.

A manager or partner-specific role entered into the Action does **not** expand that role's authority.

## Project-lane containment

The `partner_project`, `tasked_role`, `task_scope`, assigned branch and `control_file` identify the **authorized project boundary** for that run.

Unless Casey or the Operating System Project Manager explicitly routes a task as company-wide:

- a project/vendor SOP applies only to its named project/lane;
- reading or referencing an SOP does **not** assign its work to every manager or worker;
- a project manager keeps assigned workers inside that project lane;
- a worker may execute only the work item routed to that worker/project;
- shared specialists such as Catalog, Developer, Fulfillment or Communications enter another project only through an explicit routed handoff and return to their owning lane when that handoff is complete;
- a project manager must not claim a row on `CURRENT_WORK_BOARD.md` that is owned by another project merely because the manager's own lane is waiting;
- an out-of-lane finding is returned as **NEW FINDING / ROUTE REQUIRED** to the Operating System Project Manager or Company Operations Manager rather than being executed by the discovering project.

For dedicated supplier managers, **continue the next unblocked action means the next unblocked action inside that supplier project**. Cross-project reassignment belongs to the Operating System Project Manager / Company Operations Manager.

A company-wide assignment requires explicit owner/OS-PM scope. The default scope of a named partner/project RUN is **PROJECT-ONLY**.

## When to use the Unified RUN Action

Use **RUN — Unified Partner / Manager Worktree** when an Owner-authorized partner/project/manager lane has branch-based work that needs a common execution/QA receipt before normal review or handoff.

Typical lanes include:

- SOK;
- Renogy;
- VEVOR;
- Kingboss;
- other approved vendor/partner projects;
- Ecommerce & Vendor Operations;
- Company Operations;
- Catalog/Commerce development;
- bounded Developer tasks;
- release-candidate preparation before the separate production release workflow.

Do not create a separate partner-specific RUN workflow unless a real technical requirement cannot be represented by this shared control.

## Required inputs

The Action requires:

- `work_ref` — assigned branch name only; `main` is prohibited;
- `partner_project` — public-safe partner, vendor, project or lane label and the default scope boundary for the run;
- `tasked_role` — public-safe manager/worker role assigned to that project/lane;
- `task_scope` — one-line public-safe bounded scope for the receipt;
- `control_file` — applicable `operations/*.md` control record for that project/lane;
- `run_profile` — `auto`, `operations`, `development`, or `release_candidate`;
- `run_confirmation` — exact value `RUN`.

Never put credentials, customer PII, private vendor pricing, tax records, banking data, private freight rates, tokens, login artifacts or protected commercial data into any input or receipt.

## Git-first rule

The Action itself enforces the current RUN protocol:

**CURRENT MAIN → ASSIGNED BRANCH → CURRENT CONTROL FILE → BRANCH CONTAINS CURRENT MAIN → QA → RECEIPT**

The branch must contain the current `main` before the run may pass. If `main` advanced, reconcile the assigned branch first and rerun.

The workflow must be launched from the workflow definition on `main` so a stale branch cannot provide its own older control logic.

Git validation does not change project ownership. A branch passing Unified RUN does not authorize workers from other projects to work that branch/task.

## Profiles

### `auto`

Use by default.

The workflow resolves the branch diff against current `main`:

- operations/docs-only changes → `operations`;
- runtime, deployment, workflow, test, package or other code changes → `development`.

### `operations`

For public-safe SOP, work-board, handoff and documentation-only work.

Required checks include:

- current-main ancestry;
- control-file existence;
- diff integrity;
- Unified RUN policy regression;
- repository secret scan.

### `development`

For application, workflow, test, deployment-support or runtime-affecting branch work.

Includes all operations checks plus canonical `npm run qa`.

### `release_candidate`

For an already authorized branch being prepared for merge/release review.

Includes development QA plus release-policy regression and artifact-size controls.

**Release-candidate does not deploy.**

## What the Action is allowed to do

The Unified RUN Action may:

- read current `main` and the assigned branch;
- verify the branch contains current `main`;
- read current `/operations/` controls;
- run repository QA and security checks;
- write a commit status on the branch SHA;
- create a public-safe run summary and downloadable receipt artifact.

## What the Action must never do

It must not:

- broadcast one project task to other managers/workers;
- reassign a worker from another project;
- turn a project SOP into a company-wide task;
- commit to the assigned branch;
- commit to `main`;
- merge a PR;
- deploy Cloudflare Pages or Workers;
- invoke production release automatically;
- change supplier/channel authorization;
- change customer/payment/order state;
- override MAP, pricing, freight, lithium/DG or compliance controls;
- treat the role input as standing authority beyond the assigned scope.

Production remains controlled by the existing exact-SHA release workflow after merge:

**CURRENT REVIEWED MAIN → EXACT-SHA PREVIEW → SAME-SHA PRODUCTION → CANONICAL SMOKE → RECEIPT**

## Manager / partner operating pattern

For any branch-based lane:

**OWNER RUN → RESOLVE RECIPIENT PROJECT → RE-RESOLVE MAIN → READ CURRENT WORK BOARD + THAT PROJECT'S LANE SOP → RESUME/CREATE ASSIGNED BRANCH → EXECUTE BOUNDED TASK → RUN UNIFIED ACTION → FIX ONLY PROVEN FAILURES → PR/REVIEW IF AUTHORIZED → RECORD RESULT → CONTINUE INSIDE THE SAME PROJECT**

A waiting supplier response does not block other **already assigned work inside that same project**. It also does not authorize that project manager to take work from another project. If the project has no executable work, mark the applicable item WAITING/HOLD and return capacity/routing to the Operating System Project Manager or Company Operations Manager.

Do not repeatedly run a branch merely because its external dependency is still waiting.

## PASS / FAIL meaning

### PASS

PASS means the assigned branch is reconciled to the current main used by the run, required controls exist, applicable QA passed, and a receipt was generated.

PASS does **not** mean:

- the PR is approved;
- the branch is merged;
- production is deployed;
- supplier onboarding is complete;
- a live paid-order proof occurred;
- the task became company-wide;
- other managers/workers were reassigned to the project.

Those remain separate factual/routing gates.

### FAIL

FAIL means the exact branch/run gate failed. Correct only the proven failure, then rerun.

Common legitimate failures:

- branch does not contain current `main`;
- invalid/missing control record;
- secret scan failure;
- canonical QA failure;
- diff integrity failure;
- current `main` changed during the run.

Do not translate one branch failure into a company-wide stop.

## Receipt

Every controlled run records:

- result;
- partner/project;
- tasked role;
- public-safe task scope;
- controlling operations file;
- branch;
- branch SHA;
- current main SHA;
- resolved QA profile;
- changed-file count/list;
- explicit non-deployment boundary.

The commit status context is:

`elevation/unified-run`

## Standing rule

When Casey directs **RUN**, **RUN WORKFLOW**, **CONTINUE WORKFLOW**, or equivalent execution language for a partner/project/manager branch, use this Action for the branch validation/QA stage unless the lane is not Git-based or a more specific already-approved technical gate is required.

Interpret the RUN inside the project/manager context where Casey issued it unless Casey explicitly addresses the Operating System Project Manager / Company Operations Manager for cross-project or company-wide routing.

Do not build duplicate workflows for SOK, Renogy, VEVOR, Kingboss or future partner managers when this shared Action can safely represent the work.
