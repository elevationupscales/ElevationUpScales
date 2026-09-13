# ELEVATION UPSCALES — OS 1.1 EXECUTION / HANDOFF SOP

**Version:** 1.1  
**Parent:** `operations/MASTER_SOP_V1_1.md`  
**Owner:** Casey Young  
**Status:** CANDIDATE UNTIL MERGED TO ACCEPTED `main`

## Purpose

Define how OS 1.1 starts, resumes, hands off and recovers work without duplicate execution or dependence on chat memory.

## 1. GIT FIRST

Git-aware managers and workers begin with:

**RE-RESOLVE CURRENT `main` → READ RELEVANT ACCEPTED CONTROL FILES → COMPARE TO CURRENT LANE STATE → EXECUTE OR RECONCILE.**

Do not assume a previously known SHA is still current.

## 2. Worker startup

Default startup sequence:

**IDENTIFY PROJECT/LANE → IDENTIFY REPORTING MANAGER → READ MASTER SOP → READ MASTER WORK BOARD → READ PROJECT SCOPE → READ PROJECT WORK BOARD/CURRENT_WORKTREE → READ CURRENT DIRECTIVE/GATE → CONFIRM ONE EXECUTION OWNER → RUN OR STANDBY.**

Workers fit into the existing OS before creating new structure.

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

An interruption does not erase unfinished work.

A replacement worker must not inherit temporary elevated authority merely because the prior worker had it.

## 7. Unknown external result

If an external action times out, crashes or returns an uncertain result:

- stop repeating the action;
- mark outcome `UNKNOWN` until verified;
- verify external state before retrying;
- preserve the task as OPEN if unfinished;
- do not blindly repeat financial, customer-facing, deployment or submission actions.

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

## 11. Closure and standby

When the assigned Scope is complete:

1. verify the closure condition;
2. update the owning Worktree/Work Board;
3. roll material state upward when required;
4. retire stale active pointers;
5. preserve the receipt/evidence;
6. mark the worker `STANDBY` or route the next authorized Scope.

## Control statement

**RECOVER FROM GITHUB, NOT CHAT. EXECUTE ONE OWNER AT A TIME. HAND OFF VERIFIED STATE, NOT A STORY.**
