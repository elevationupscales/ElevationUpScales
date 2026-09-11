# Elevation UpScales — Owner RUN Command Execution Protocol

**Status:** ACTIVE / CONTROLLING EXTENSION  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**Parent SOP:** `operations/MANAGEMENT_OPERATING_SOP.md`  
**Applies To:** Operating System Project Manager, Company Operations, routed managers/workers when acting on an Owner `RUN` command

## Purpose

Define exactly what happens when Casey issues the command **RUN** so work continues instead of being paused by unnecessary management friction.

This protocol is an execution-control extension to the shared Management Operating SOP. It does not create a second work board, project hierarchy or manager.

## Owner command rule

When Casey says **RUN**, execute immediately using:

**GIT FIRST → RESUME LAST OPEN WORKTREE → COMPLETE AS FAR AS POSSIBLE → RECORD IN GIT → EXECUTE NEW OWNER COMMAND → COMPLETE AS FAR AS POSSIBLE → RECORD IN GIT → RETURN TO PRIOR WORKTREE IF STILL OPEN → CONTINUE CURRENT WORK BOARD**

Do not stop to ask whether Casey wants the work executed. `RUN` is the authorization to execute the current safe worktree within existing owner/SOP boundaries.

## Required sequence

### 1. Git first

Before acting:

1. resolve current `main`;
2. read `operations/CURRENT_WORK_BOARD.md` and the applicable controlling lane/SOP files;
3. identify the last active worktree and its current state;
4. verify whether that worktree is COMPLETE, WAITING/HOLD, OWNER GATE, or still executable.

Do not rely on chat memory when Git contains a newer controlling state.

### 2. Resume the last worktree first

If the prior worktree is still executable, continue it before opening a new parallel management loop.

Use:

**VERIFY → EXECUTE → RECORD → CONTINUE**

Advance the prior worktree until one of these is true:

- completed;
- waiting on a real external dependency;
- blocked by a true safety/compliance/payment/channel/authorization issue;
- owner approval is genuinely required;
- no further action is possible with currently available tools/access.

Do not create artificial pauses for reports, handoffs, packet-building or enrichment that is not required for the next safe action.

### 3. Record material progress in Git

When the active state materially changes, reconcile the public-safe result into the existing controlling `/operations/` record.

Use existing owners before creating files:

**REUSE → UPDATE → RECONCILE → CREATE ONLY IF NECESSARY**

Before every Git write, re-resolve current `main` and avoid overwriting newer work.

### 4. Execute the new Owner command

After the prior worktree is controlled, execute Casey's new command immediately and as completely as possible.

Do not merely prepare instructions when the available tools can safely perform the action.

Do not convert an Owner `RUN` command into a recommendation-only response unless the requested action truly cannot be performed with the available access/tools or crosses a genuine owner-only/legal/safety boundary.

### 5. Complete the new command as far as possible

Continue through all safe dependent steps that are naturally part of the command.

Examples:

- supplier approval → reconcile supplier state → request required source data → establish/update vendor master SOP → route catalog/code work;
- customer order → verify payment/order → supplier fulfillment → tracking → customer update → operating receipt;
- approved code → QA → preview/release path → verification/receipt;
- vendor source file → verify → normalize → route catalog implementation → record current state.

Do not stop after the first sub-step if the next safe step is clear and available.

### 6. Return to the prior worktree

When the new command is complete, waiting, held, or otherwise controlled:

- return to the prior worktree if it remains executable and unresolved;
- otherwise continue the highest-priority executable row on `CURRENT_WORK_BOARD.md`.

A new command interrupts the worktree; it does not silently erase it.

## Git and release behavior

Normal Owner-directed work does **not** require freezing Git simply because a release is planned.

Use exact-SHA release discipline only during the actual bounded release sequence that depends on an unchanged SHA:

**RESOLVE CURRENT MAIN → START PREVIEW FOR THAT SHA → SAME-SHA PRODUCTION → VERIFY → RECORD RECEIPT**

Do not impose an indefinite Git freeze while Casey is actively directing other company work. If new Owner-directed commits are made before preview starts, the release target simply becomes the newer reviewed current `main` SHA.

If a preview for an exact SHA is already actively running or has passed and production must use the same SHA, avoid unrelated commits only for that active preview→production window unless Casey explicitly directs otherwise.

## Unified GitHub RUN action

For branch-based partner, vendor, project-manager, manager or developer work, use the shared:

`RUN — Unified Partner / Manager Worktree`

Workflow:

`.github/workflows/unified-run-command.yml`

Controlling SOP:

`operations/UNIFIED_RUN_WORKFLOW_SOP_2026-09-10.md`

The shared Action standardizes current-main reconciliation, role/scope labeling, applicable `/operations/` control selection, QA depth and a public-safe receipt.

It does **not** grant a manager wider authority, write to the branch, merge a PR, or deploy production.

Use the common Action instead of creating separate SOK, Renogy, VEVOR, Kingboss or manager-specific RUN workflows unless a real technical requirement cannot be represented by the shared control.

Production deployment remains separate and exact-SHA controlled after reviewed merge.

## Gate discipline

`RUN` does not remove real safety controls. It removes unnecessary workflow hesitation.

Keep real gates for:

- customer money/payment integrity;
- legal/compliance obligations;
- supplier/channel authorization;
- MAP/pricing policy;
- lithium/DG/freight safety;
- binding commercial commitments requiring Casey;
- production release checks;
- protected credentials/data.

Do not treat these as general blockers:

- completed setup;
- optional enrichment;
- external waiting on another independent lane;
- internal report formatting;
- absence of a first order;
- historical handoff cleanup;
- a worker/tool limitation when another route can safely continue.

**BLOCK THE EXACT UNSAFE OR UNVERIFIED LANE — NOT THE WHOLE PROJECT.**

## Return format after RUN

Keep the owner update concise:

**COMPLETED:** actions actually finished.  
**RECORDED:** Git/source-of-truth updates and receipts.  
**WAITING / HELD:** real blockers only.  
**CONTINUING:** prior worktree or next board item now being resumed.  
**NEEDS CASEY:** only genuine owner decisions.

## Standing interpretation

Unless Casey explicitly changes this rule, future messages consisting of **RUN**, **RUN WORKFLOW**, **CONTINUE WORKFLOW**, or equivalent direct execution language should be interpreted under this protocol.

The Operating System Project Manager should not self-invent a pause that Casey did not authorize.
