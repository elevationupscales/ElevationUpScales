# ELEVATION UPSCALES — OS 1.1 EXECUTION / HANDOFF SOP

**Version:** 1.1.1  
**Parent:** `operations/MASTER_SOP_V1_1.md`  
**Owner:** Casey Young  
**Status:** ACCEPTED — EXECUTION LOOP GUARD ACTIVE

## Purpose

Define how OS 1.1 starts, resumes, hands off and recovers work without duplicate execution or dependence on chat memory.

## 1. GIT FIRST

Git-aware managers and workers begin with:

**RE-RESOLVE CURRENT `main` → READ RELEVANT ACCEPTED CONTROL FILES → COMPARE TO CURRENT LANE STATE → EXECUTE OR RECONCILE.**

Do not assume a previously known SHA is still current.

## 2. Worker startup

Default first-entry startup sequence:

**IDENTIFY PROJECT/LANE → IDENTIFY REPORTING MANAGER → READ MASTER SOP → READ MASTER WORK BOARD → READ PROJECT SCOPE → READ PROJECT WORK BOARD/CURRENT_WORKTREE → READ CURRENT DIRECTIVE/GATE → CONFIRM ONE EXECUTION OWNER → RUN OR STANDBY.**

Workers fit into the existing OS before creating new structure.

This full startup sequence is for first entry, material reassignment or genuine state conflict. It is **not** a loop that must be replayed before every repository write or after every interrupted response.

### 2A. Authorized development fast path

Once a development worker has an accepted lane, active Worktree and bounded authorized task, use:

**RE-RESOLVE `main` ONCE → READ ACTIVE WORKTREE + EXACT TASK CONTROL → CREATE/RECOVER BOUNDED BRANCH → IMPLEMENT → QA → RE-RESOLVE `main` ONCE BEFORE MERGE → RECONCILE IF NEEDED → MERGE → UPDATE WORKTREE → REPORT.**

Rules:

- create or recover the bounded work branch immediately after startup state is validated;
- do not keep reading management files before the first mutation when the Worktree/task is already unambiguous;
- do not reread the Master SOP, Worker Registry, global Work Board and unchanged lane controls repeatedly during one bounded task;
- normal bounded development uses at most two `main` resolutions: startup and pre-merge;
- perform an extra resolution/read only when a real race, source conflict, authority change or control-plane drift is detected;
- source-specific truth checks required by the task remain mandatory and are not removed by this fast path;
- QA and merge safety are preserved; this section removes redundant control ceremony, not technical verification.

**FIRST EXECUTION RULE:** after the active task is verified, the next repository action should be branch creation/recovery or implementation—not another broad RECON pass.

## 3. RUN

`RUN` means:

**VERIFY → FIX IF POSSIBLE → COMPLETE IF CLEAN → HOLD ONLY BLOCKED ITEM → MOVE ON.**

Continue inside the authorized Scope until:

- the Scope is complete;
- no executable action remains;
- an owner gate is reached;
- a required compliance/safety escalation is reached;
- the lane is legitimately waiting on an external trigger.

`RUN` never expands authority by itself.

For an already-authorized bounded development task, `RUN` invokes the development fast path in §2A rather than restarting full worker onboarding.

## 4. Execution routing

Operational workers operate their own platforms and lanes. Technical development, RECON and management are not automatic duplicate executors.

Use the current streamlined routing principle:

**OPERATORS OPERATE → RECON ON CONFLICT/GATE → DEV ON PROVEN CODE DEFECT → MANAGEMENT SEQUENCES → CLOSE WHAT IS DONE.**

A lane routes DEV only when a bounded technical defect remains after operator/platform repair and the current manager accepts the routing.

## 5. Handoff packet

A handoff must preserve enough state for immediate recovery. Minimum fields:

- Project / lane;
- reporting manager;
- Scope objective;
- current state;
- primary execution owner;
- last verified action;
- current blocker/gate, if any;
- next executable action;
- verification required;
- terminal/closure condition;
- relevant Git paths, issue/PR/order/SKU identifiers where applicable;
- latest receipt/evidence pointer.

Do not make the next worker reconstruct current state from a long transcript.

## 6. Interruption and reassignment

When work is interrupted or reassigned:

**SAFE-SAVE → RECORD LAST VERIFIED STATE → PRESERVE OPEN WORK → IDENTIFY NEW OWNER OR STANDBY STATE → UPDATE CURRENT POINTER → CONTINUE.**

An interruption does not erase unfinished work and **an execution-window/context cutoff is not an owner gate**.

### Interrupted-run continuation

If an authorized development run ends before completion:

- if a bounded branch/commit exists, recover it and continue from the last verified repository state;
- if no mutation occurred, re-resolve current `main`, confirm the active Worktree/task has not materially changed, then create the bounded branch and begin implementation immediately;
- do not replay full onboarding/recon unless the current state actually conflicts with the saved task;
- do not spend the next run reconstructing a completion receipt for work that has not happened;
- prioritize durable repository progress: **BRANCH/COMMIT → QA → MERGE → RECEIPT**.

A replacement worker must not inherit temporary elevated authority merely because the prior worker had it.

## 7. Unknown external result

If an external action times out, crashes or returns an uncertain result:

- stop repeating the action;
- mark outcome `UNKNOWN` until verified;
- verify external state before retrying;
- preserve the task as OPEN if unfinished;
- do not blindly repeat financial, customer-facing, deployment or submission actions.

A local execution/context cutoff before any external mutation is not an `UNKNOWN` external result; resume under §6.

## 8. Waiting state

Waiting work must name its resume trigger.

Examples:

- supplier response;
- customer response;
- carrier correction;
- owner approval;
- release/QA result;
- inventory/price refresh;
- scheduled follow-up date.

A waiting item does not reserve the whole lane if independent work remains executable.

## 9. Bounded escalation

Escalate only the decision or defect that exceeds the worker's authority.

Examples:

- owner gate → Owner / MPM;
- cross-project priority conflict → Operating System Project Manager;
- control-plane drift → OS 1.1 Integration / RECON path;
- platform/operator issue → owning operations worker;
- proven code defect → MASTER DEVELOPER through current manager;
- release lineage/integrity conflict → MASTER RECON.

Do not escalate routine executable work merely to obtain confirmation.

An interrupted execution window is not escalation-worthy by itself.

## 10. Receipt discipline

Create or update a durable receipt when an action materially changes business or control state, including:

- production deployment;
- customer financial obligation resolution;
- supplier/channel authorization change;
- accepted manager/owner gate change;
- terminal incident result;
- material external submission;
- release acceptance.

Routine micro-actions can remain in the owning Worktree or platform history.

**A receipt is an output of completed work, never a prerequisite to beginning work.** Do not reserve execution capacity for a completion receipt before implementation, QA and merge exist. If an execution run is constrained, durable code/commit/QA progress takes priority over prose reporting.

## 11. Closure and standby

When the assigned Scope is complete:

1. verify the closure condition;
2. update the owning Worktree/Work Board;
3. roll material state upward when required;
4. retire stale active pointers;
5. preserve the receipt/evidence;
6. mark the worker `STANDBY` or route the next authorized Scope.

## Control statement

**RECOVER FROM GITHUB, NOT CHAT. RESOLVE ONCE → BRANCH → BUILD → QA → RESOLVE BEFORE MERGE → MERGE → REPORT. EXECUTE ONE OWNER AT A TIME. HAND OFF VERIFIED STATE, NOT A STORY.**
