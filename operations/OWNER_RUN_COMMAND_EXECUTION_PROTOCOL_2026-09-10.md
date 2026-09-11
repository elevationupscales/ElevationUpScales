# Elevation UpScales — Owner RUN Command Execution Protocol

**Status:** ACTIVE / CONTROLLING EXTENSION  
**Effective:** 2026-09-10; direct-deployment rule updated 2026-09-11  
**Owner:** Casey Young  
**Parent SOP:** `operations/MANAGEMENT_OPERATING_SOP.md`  
**Applies To:** Operating System Project Manager, Company Operations, routed managers/workers when acting on an Owner `RUN` command

## Purpose

Define exactly what happens when Casey issues the command **RUN** so work continues instead of being paused by unnecessary management friction.

This protocol is an execution-control extension to the shared Management Operating SOP. It does not create a second work board, project hierarchy or manager.

**RUN AUTHORIZES EXECUTION INSIDE THE RECIPIENT'S ASSIGNED PROJECT/LANE. IT IS NOT A COMPANY-WIDE TASK BROADCAST UNLESS CASEY EXPLICITLY MAKES IT COMPANY-WIDE.**

## Scope resolution before execution

Before applying RUN, identify who Casey addressed and therefore which project/lane owns the command.

### Dedicated project / supplier manager

If RUN is issued inside or directly to a named project/manager such as Renogy, SOK, VEVOR or Kingboss:

- the command applies to that named project/lane only;
- the manager resumes that project's last open executable worktree;
- the manager may route only workers assigned to that project or workers explicitly handed into that project for a bounded subtask;
- the manager may not pull work from another project simply because its own project is waiting;
- out-of-lane work is returned to the Operating System Project Manager / Company Operations Manager as **ROUTE REQUIRED**;
- if the project has no executable work, record WAITING/HOLD and return capacity upward for reassignment.

### Operating System Project Manager / Company Operations Manager

If RUN is directed to the Operating System Project Manager or Company Operations Manager, those managers may continue cross-project routing under their existing authority and the canonical work board.

### Company-wide scope

Treat a command as company-wide only when Casey explicitly says company-wide/all projects/all managers or when the Operating System Project Manager issues an authorized cross-project routing instruction.

Reading a company SOP, vendor SOP, work board row or RUN receipt is **not** itself an assignment.

## Owner command rule

When Casey says **RUN**, execute immediately using:

**RESOLVE RECIPIENT PROJECT → GIT FIRST → RESUME THAT PROJECT'S LAST OPEN WORKTREE → COMPLETE AS FAR AS POSSIBLE → RECORD IN GIT → EXECUTE NEW OWNER COMMAND INSIDE THAT SCOPE → COMPLETE AS FAR AS POSSIBLE → RECORD IN GIT → RELEASE APPROVED RUNTIME REPAIRS WHEN THAT RELEASE LANE IS IN SCOPE → VERIFY LIVE → RETURN TO THAT PROJECT'S PRIOR WORKTREE IF STILL OPEN**

For the Operating System Project Manager / Company Operations Manager, the final continuation may move to the next properly owned work item on `CURRENT_WORK_BOARD.md`.

For a dedicated project manager, the final continuation remains inside that project unless a higher manager explicitly reroutes the worker.

Do not stop to ask whether Casey wants the work executed. `RUN` is the authorization to execute the current safe worktree within existing owner/SOP/project boundaries.

## Owner RUN direct-deployment rule

Casey's **RUN** is also the production-deployment authorization **when all of the following are true**:

1. the command is being handled by the Operating System Project Manager, Company Operations Manager, Developer/Release lane, or another lane explicitly routed production-release authority;
2. the website/runtime repair is already owner-approved or is a bounded repair within an already approved worktree;
3. the repair has been merged to the reviewed current `main`;
4. required repository QA/security checks are clean;
5. production is stale, a release-ready row is open, or live verification proves drift from the approved current source;
6. no true safety, payment, legal/compliance, supplier/channel, MAP, lithium/DG, credential, or binding-commercial gate requires a separate owner decision.

When those conditions are satisfied, **do not ask Casey for a second `DEPLOY` message**. Complete the worktree through production.

Preferred direct release path when GitHub connector/ref access is available:

**RE-RESOLVE CURRENT MAIN → VERIFY REVIEWED/QA-CLEAN SHA → FAST-FORWARD `production-deploy` TO THAT EXACT MAIN SHA → EXISTING PRODUCTION WORKFLOW RUNS CANONICAL QA + SECRET SCAN + CLOUDFLARE DEPLOY + LIVE SMOKE → VERIFY APPROVED LIVE PRESENTATION/FUNCTION → RECORD RECEIPT**

The `production-deploy` ref must only move by normal fast-forward to the current reviewed `main` SHA. Do not force the ref and do not point it to an unmerged feature branch.

If the direct ref route is unavailable but authenticated Actions dispatch is available, the existing exact-SHA release workflow may be used. `RUN` still supplies the owner authorization; do not manufacture a second owner-confirmation gate solely because the technical dispatch surface asks for release inputs.

A named supplier/project manager does **not** gain blanket production authority from this rule. If that manager's bounded work creates a shared-site runtime repair, the manager records/routs **RELEASE REQUIRED** upward; the OS/Company Operations/Developer release lane completes the production step under the same owner RUN worktree.

Do not deploy for documentation-only or management-state changes that do not affect production runtime and do not correspond to proven production drift.

## Required sequence

### 1. Git first

Before acting:

1. resolve current `main`;
2. identify the recipient project/lane;
3. read `operations/CURRENT_WORK_BOARD.md` for global context and only the applicable controlling project/lane/SOP files for execution;
4. identify that project's last active worktree and its current state;
5. verify whether that worktree is COMPLETE, WAITING/HOLD, OWNER GATE, or still executable.

Do not rely on chat memory when Git contains a newer controlling state.

A dedicated project manager uses the global work board for context and routing visibility; the manager does not claim rows owned by other projects.

### 2. Resume the assigned project worktree first

If the recipient project's prior worktree is still executable, continue it before opening a new parallel management loop.

Use:

**VERIFY → EXECUTE → RECORD → CONTINUE INSIDE ASSIGNED PROJECT**

Advance the assigned worktree until one of these is true:

- completed;
- waiting on a real external dependency;
- blocked by a true safety/compliance/payment/channel/authorization issue;
- owner approval is genuinely required;
- no further action is possible with currently available tools/access.

Do not create artificial pauses for reports, handoffs, packet-building or enrichment that is not required for the next safe action.

If the project reaches WAITING/HOLD, the project manager does not automatically move into another project. Cross-project reassignment is performed by the Operating System Project Manager / Company Operations Manager.

### 3. Record material progress in Git

When the active state materially changes, reconcile the public-safe result into the existing controlling `/operations/` record.

Use existing owners before creating files:

**REUSE → UPDATE → RECONCILE → CREATE ONLY IF NECESSARY**

Before every Git write, re-resolve current `main` and avoid overwriting newer work.

### 4. Execute the new Owner command

After the assigned prior worktree is controlled, execute Casey's new command immediately and as completely as possible **within the recipient project's scope**.

Do not merely prepare instructions when the available tools can safely perform the action.

Do not convert an Owner `RUN` command into a recommendation-only response unless the requested action truly cannot be performed with the available access/tools or crosses a genuine owner-only/legal/safety boundary.

If the new command explicitly changes project ownership or is explicitly company-wide, follow that newer owner scope.

### 5. Complete the new command as far as possible

Continue through all safe dependent steps that are naturally part of the assigned project command.

Examples:

- supplier approval → reconcile that supplier state → request required source data → establish/update that vendor master SOP → route that supplier's catalog/code work;
- customer order → verify payment/order → supplier fulfillment → tracking → customer update → operating receipt;
- approved website/runtime repair → QA → merge/current-main reconciliation → direct production release under this protocol → live verification/receipt;
- vendor source file → verify → normalize → route that vendor's catalog implementation → record current state.

Do not stop after the first sub-step if the next safe step is clear and available.

Do not use these examples to expand a supplier manager into unrelated supplier/customer/development projects.

### 6. Release approved runtime repairs before declaring the worktree complete

When the assigned scope includes the OS/Company Operations/Developer release lane and a merged approved runtime repair is ahead of production, the RUN worktree is **not complete at merge**.

Perform the direct-deployment rule above, then verify the canonical production domain. A successful Git merge or PR close is not a production receipt.

If release fails, record the exact technical failure and keep the release row OPEN. Fix only the proven failure and retry when safe; do not rewrite already-approved website design/copy merely because production is stale.

### 7. Return to the assigned prior worktree

When the new command is complete, waiting, held, or otherwise controlled:

- return to the recipient project's prior worktree if it remains executable and unresolved;
- if no work remains in that project, record its state and return routing control upward;
- only the Operating System Project Manager / Company Operations Manager should continue across independent project rows on `CURRENT_WORK_BOARD.md` unless Casey explicitly directs otherwise.

A new command interrupts the worktree; it does not silently erase it or transfer it to every manager.

## Git and release behavior

Normal Owner-directed work does **not** require freezing Git simply because a release is planned.

For ordinary approved repair catch-up under Owner RUN, use:

**RESOLVE CURRENT MAIN → VERIFY REVIEWED/QA-CLEAN SOURCE → DIRECT PRODUCTION TRIGGER (`production-deploy` FAST-FORWARD) → WORKFLOW QA/DEPLOY/SMOKE → LIVE DRIFT CHECK → RECORD RECEIPT**

The historical exact-SHA preview → same-SHA production workflow remains available for higher-risk releases, explicit preview requests, or cases where a preview is materially needed before production. It is no longer a mandatory second owner-authorization loop for routine approved repair drift catch-up when Casey has already issued RUN.

Do not impose an indefinite Git freeze while Casey is actively directing other company work. Re-resolve `main` immediately before moving `production-deploy`; the production trigger must point to the current reviewed `main` SHA.

If an explicit preview has already started for an exact SHA and the chosen release path requires that same SHA for production, avoid unrelated commits only for that active preview→production window unless Casey explicitly directs otherwise.

## Unified GitHub RUN action

For branch-based partner, vendor, project-manager, manager or developer work, use the shared:

`RUN — Unified Partner / Manager Worktree`

Workflow:

`.github/workflows/unified-run-command.yml`

Controlling SOP:

`operations/UNIFIED_RUN_WORKFLOW_SOP_2026-09-10.md`

The shared Action standardizes current-main reconciliation, role/scope labeling, applicable `/operations/` control selection, QA depth and a public-safe receipt.

The branch-validation Action itself does **not** grant a manager wider authority, broadcast a task to other projects, reassign workers, write to the branch, merge a PR, or deploy production.

For a website/runtime worktree, however, Owner RUN does **not** end when that branch Action passes. After authorized merge/current-main reconciliation, the OS/Company Operations/Developer release lane must continue through the direct-deployment rule when production drift or a release-ready repair exists.

Use the common Action instead of creating separate SOK, Renogy, VEVOR, Kingboss or manager-specific RUN workflows unless a real technical requirement cannot be represented by the shared control.

## Gate discipline

`RUN` does not remove real safety controls. It removes unnecessary workflow hesitation.

Keep real gates for:

- customer money/payment integrity;
- legal/compliance obligations;
- supplier/channel authorization;
- MAP/pricing policy;
- lithium/DG/freight safety;
- binding commercial commitments requiring Casey;
- production QA/security/live-smoke checks;
- protected credentials/data.

Do not treat these as general blockers:

- completed setup;
- optional enrichment;
- external waiting on another independent lane;
- internal report formatting;
- absence of a first order;
- historical handoff cleanup;
- a worker/tool limitation when another route **inside the same assigned project** can safely continue;
- a separate `DEPLOY` confirmation after Casey already issued RUN for an approved routine repair and the direct-deployment conditions are satisfied.

**BLOCK THE EXACT UNSAFE OR UNVERIFIED LANE — NOT THE WHOLE PROJECT.**

This principle does not authorize a dedicated project manager to leave the project and take another manager's task.

## Return format after RUN

Keep the owner update concise:

**COMPLETED:** actions actually finished, including production deployment when required by the RUN worktree.  
**RECORDED:** Git/source-of-truth updates and receipts.  
**LIVE VERIFIED:** production smoke/drift result when runtime work was released.  
**WAITING / HELD:** real blockers only.  
**CONTINUING:** next action inside the assigned project, or `RETURNED FOR ROUTING` when that project has no executable work.  
**NEEDS CASEY:** only genuine owner decisions.

## Standing interpretation

Unless Casey explicitly changes this rule, future messages consisting of **RUN**, **RUN WORKFLOW**, **CONTINUE WORKFLOW**, or equivalent direct execution language should be interpreted under this protocol.

When the active authorized worktree includes an already-approved merged website/runtime repair or proven production drift, **RUN means finish through production deployment and live verification**, not stop at merge or prepare deployment instructions.

The Operating System Project Manager should not self-invent a pause that Casey did not authorize.

A dedicated project manager should not self-invent cross-project authority that Casey did not authorize.
