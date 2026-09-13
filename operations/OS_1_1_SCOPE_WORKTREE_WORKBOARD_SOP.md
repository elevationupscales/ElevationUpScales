# ELEVATION UPSCALES — OS 1.1 SCOPE / WORKTREE / WORK BOARD SOP

**Version:** 1.1  
**Parent:** `operations/MASTER_SOP_V1_1.md`  
**Owner:** Casey Young  
**Status:** CANDIDATE UNTIL MERGED TO ACCEPTED `main`

## Purpose

Standardize how Projects and lanes define authorized work, ordered next actions, and current state.

Use this shorthand:

**SCOPE = WHAT MAY BE WORKED**  
**WORKTREE = WHAT SHOULD BE WORKED NEXT**  
**WORK BOARD = WHAT IS CURRENTLY TRUE**

## 1. Scope

A Scope is bounded work authority. It must identify:

- objective;
- owner / reporting manager;
- in-scope work;
- out-of-scope work;
- dependencies;
- current state;
- current Worktree;
- verification gates;
- closure condition;
- handoff destination.

A Scope does not become broader because a worker discovers adjacent work. Out-of-scope findings are recorded and routed.

## 2. Worktree

A Worktree is the ordered executable path inside an authorized Scope.

A healthy Worktree contains only meaningful current actions. Each item should state:

- task;
- primary execution owner;
- state;
- last verified action;
- blocker, if any;
- next executable action;
- verification required;
- close condition.

Historical steps and completed detail may remain in receipts/history, but they should not crowd the active next-action list.

## 3. Work Board

A Work Board is a current-state view, not a task dump.

The company-wide canonical Live State index is `operations/CURRENT_WORK_BOARD.md`.

Project-level Work Boards are permitted when parallel work justifies them. A project Work Board must:

- inherit its parent Scope;
- name its reporting manager;
- use the same state vocabulary as the master board;
- identify one primary owner per material item;
- remain subordinate to `CURRENT_WORK_BOARD.md` for company-wide truth;
- roll material terminal results upward.

## 4. State vocabulary

Use clear state terms. Preferred operational states include:

- `ACTIVE`
- `QUEUED`
- `WAITING`
- `HOLD`
- `BLOCKED`
- `STANDBY`
- `OPEN TASK`
- `COMPLETE`
- `ACCEPTED`
- `CLOSED`
- `CANCELLED`
- `SUPERSEDED`
- `FAILED / TERMINAL`

A lane may add precise qualifiers, but the base meaning must remain clear.

## 5. One task = one primary owner

Every active material task has one primary execution owner.

Other workers may assist, verify, provide evidence, or accept handoff. They do not become parallel execution owners unless management explicitly reassigns the task.

If duplicate owners exist:

**PAUSE CONFLICTING ROUTING → CONFIRM CURRENT SCOPE → SELECT ONE OWNER → RETIRE DUPLICATE POINTER → CONTINUE.**

## 6. Worktree ordering

Order work by current management priority and executable dependency, not by age alone.

Within a lane:

1. execute the highest current unblocked action;
2. hold only the blocked sub-item;
3. continue independent work;
4. return to the blocked item when its trigger is satisfied;
5. close completed items promptly.

Do not preserve obsolete next actions simply because they were once assigned.

## 7. Project Work Board threshold

Create or retain a project Work Board when at least one is true:

- multiple workers execute in parallel;
- several material workstreams share one manager;
- handoffs are frequent enough that a single Worktree becomes ambiguous;
- the Project has meaningful waiting/hold/active lanes that must remain visible together;
- recovery from chat/session loss would otherwise be unreliable.

For a simple single-worker lane, a bounded Scope plus CURRENT_WORKTREE may be sufficient.

## 8. Required relationship

The expected relationship is:

**MASTER POLICY → MASTER WORK BOARD → PROJECT SCOPE → PROJECT WORK BOARD (WHEN NEEDED) → CURRENT WORKTREE → WORKER EXECUTION → RECEIPT / EVIDENCE → STATE UPDATE.**

A lower layer may provide newer facts but may not silently supersede higher authority.

## 9. Updating state

When work changes materially:

- update the Worktree for next-action changes;
- update the project Work Board when the project-level current state changes;
- update `CURRENT_WORK_BOARD.md` only when the company-level state, priority, owner, gate or terminal outcome materially changes;
- record durable proof in the appropriate receipt/evidence artifact.

Avoid duplicate status prose across many files.

## 10. Closure

A task closes only when its close condition is satisfied and required verification is complete.

When a project-level item reaches terminal state:

1. mark it terminal in the project view;
2. remove or retire stale active pointers;
3. roll the material result to the master Work Board when company-level state changed;
4. preserve detailed evidence in history/receipt records;
5. move to the next unblocked item.

## 11. Recovery after interruption

A replacement worker should be able to recover by reading:

1. accepted master policy;
2. `CURRENT_WORK_BOARD.md`;
3. Project Scope;
4. Project Work Board, if present;
5. CURRENT_WORKTREE;
6. latest relevant receipt/evidence.

Chat memory is supporting context, not the recoverable control surface.

## Control statement

**SCOPE BOUNDS AUTHORITY. WORKTREE ORDERS EXECUTION. WORK BOARD STATES REALITY. KEEP THEM DISTINCT, CURRENT, AND RECOVERABLE.**
