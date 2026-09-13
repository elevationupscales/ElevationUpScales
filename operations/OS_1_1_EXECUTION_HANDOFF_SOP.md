# ELEVATION UPSCALES — OS 1.1 EXECUTION / HANDOFF SOP

**Version:** 1.1  
**Parent:** `operations/MASTER_SOP_V1_1.md`  
**Owner:** Casey Young  
**Status:** ACTIVE WHEN PRESENT ON ACCEPTED `main`

## Purpose

Define how OS 1.1 starts, resumes, hands off and recovers work without duplicate execution or dependence on chat memory.

## GIT FIRST

Git-aware managers and workers begin with:

**RE-RESOLVE CURRENT `main` → READ ACCEPTED CONTROL FILES → COMPARE TO CURRENT LANE STATE → EXECUTE OR RECONCILE.**

Never assume an earlier SHA is still current.

## Worker startup

**IDENTIFY PROJECT/LANE → IDENTIFY REPORTING MANAGER → READ MASTER SOP → READ MASTER WORK BOARD → READ PROJECT SCOPE → READ PROJECT WORK BOARD/CURRENT_WORKTREE → READ CURRENT DIRECTIVE/GATE → CONFIRM ONE EXECUTION OWNER → RUN OR STANDBY.**

Workers fit into the existing OS before creating new structure.

## RUN

`RUN` means:

**VERIFY → FIX IF POSSIBLE → COMPLETE IF CLEAN → HOLD ONLY BLOCKED ITEM → MOVE ON.**

Continue inside authorized Scope until the Scope completes, no executable action remains, an owner gate is reached, a required escalation is reached, or the lane is legitimately waiting on an external trigger.

`RUN` never expands authority.

## Routing

Operational workers operate their own platforms and lanes. DEV, RECON and management are not automatic duplicate executors.

**OPERATORS OPERATE → RECON ON CONFLICT/GATE → DEV ON PROVEN CODE DEFECT → MANAGEMENT SEQUENCES → CLOSE WHAT IS DONE.**

Route DEV only after operator/platform repair is exhausted, the remaining defect is bounded and reproducible, impact is identified, and the current manager accepts the routing.

## Handoff packet

A durable handoff preserves:

- Project / lane;
- reporting manager;
- Scope objective;
- current state;
- primary execution owner;
- last verified action;
- blocker/gate if any;
- next executable action;
- verification required;
- terminal/closure condition;
- relevant Git, issue, PR, order or SKU identifiers where applicable;
- latest receipt/evidence pointer.

The next worker should not need a long transcript to recover current state.

## Interruption and reassignment

**SAFE-SAVE → RECORD LAST VERIFIED STATE → PRESERVE OPEN WORK → IDENTIFY NEW OWNER OR STANDBY → UPDATE CURRENT POINTER → CONTINUE.**

An interruption does not erase unfinished work. A replacement worker does not inherit temporary elevated authority merely because the prior worker had it.

## Unknown external result

If an external action times out, crashes or returns uncertain status:

- stop repeating it;
- mark result `UNKNOWN` until verified;
- verify external state before retrying;
- preserve unfinished work as OPEN;
- do not blindly repeat financial, customer-facing, deployment or submission actions.

## Waiting state

Waiting work must name its resume trigger, such as supplier/customer response, carrier correction, owner approval, release result, inventory/price refresh or scheduled follow-up.

Waiting does not reserve the whole lane when independent work remains executable.

## Bounded escalation

Escalate only what exceeds worker authority:

- owner gate → Owner / MPM;
- cross-project priority conflict → Operating System Project Manager;
- control-plane drift → OS 1.1 Integration / RECON path;
- platform/operator issue → owning operations worker;
- proven code defect → MASTER DEVELOPER through current manager;
- release lineage/integrity conflict → MASTER RECON.

Do not escalate routine executable work merely for confirmation.

## Receipt discipline

Create or update durable evidence when an action materially changes business or control state, including production deployment, customer financial resolution, supplier/channel authorization, accepted gate change, terminal incident result, material external submission or release acceptance.

Routine micro-actions may remain in the owning Worktree/platform history.

## Closure and standby

When Scope completes: verify closure, update owning Worktree/Work Board, roll material state upward when needed, retire stale active pointers, preserve evidence, then mark the worker `STANDBY` or route the next authorized Scope.

## Control statement

**RECOVER FROM GITHUB, NOT CHAT. EXECUTE ONE OWNER AT A TIME. HAND OFF VERIFIED STATE, NOT A STORY.**
