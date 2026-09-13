# ELEVATION UPSCALES — OS 1.1 SCOPE / WORKTREE / WORK BOARD SOP

**Version:** 1.1  
**Parent:** `operations/MASTER_SOP_V1_1.md`  
**Owner:** Casey Young  
**Status:** ACTIVE WHEN PRESENT ON ACCEPTED `main`

## Purpose

Standardize how Projects and lanes define authorized work, ordered next actions, and current state.

**SCOPE = WHAT MAY BE WORKED**  
**WORKTREE = WHAT SHOULD BE WORKED NEXT**  
**WORK BOARD = WHAT IS CURRENTLY TRUE**

## Scope standard

A Scope is bounded work authority and must identify objective, reporting manager, in-scope work, out-of-scope work, dependencies, current state, Worktree, verification gates, closure condition, and handoff destination.

Adjacent findings do not expand Scope. Record and route them.

## Worktree standard

A Worktree is the ordered executable path inside Scope. Each material item should identify task, primary execution owner, state, last verified action, blocker if any, next action, verification, and close condition.

Keep active Worktrees focused on current meaningful actions. Completed history belongs in receipts/history rather than the active queue.

## Work Board standard

A Work Board is a current-state view, not a task dump. `operations/CURRENT_WORK_BOARD.md` is the canonical company Live State index.

Project Work Boards are allowed when parallel execution justifies them. They must inherit parent Scope, name the reporting manager, use compatible state terms, identify one primary owner per item, remain subordinate to the master Work Board, and roll material terminal results upward.

## State vocabulary

Preferred base states:

`ACTIVE`, `QUEUED`, `WAITING`, `HOLD`, `BLOCKED`, `STANDBY`, `OPEN TASK`, `COMPLETE`, `ACCEPTED`, `CLOSED`, `CANCELLED`, `SUPERSEDED`, `FAILED / TERMINAL`.

Precise qualifiers are allowed when their base meaning remains clear.

## One task = one primary owner

Every active material task has one primary execution owner. Assistants may verify, supply evidence, or receive handoff without becoming co-owners.

If duplicate owners exist:

**PAUSE CONFLICTING ROUTING → CONFIRM CURRENT SCOPE → SELECT ONE OWNER → RETIRE DUPLICATE POINTER → CONTINUE.**

## Worktree ordering

Order by current priority and executable dependency, not age alone:

1. execute the highest current unblocked action;
2. hold only blocked sub-items;
3. continue independent work;
4. return when the resume trigger is satisfied;
5. close completed items promptly.

## When a project Work Board is justified

Use one when multiple workers execute in parallel, several material workstreams share a manager, handoffs make one Worktree ambiguous, meaningful active/waiting/hold lanes must remain visible together, or recovery from session loss would otherwise be unreliable.

A simple single-worker lane may use Scope + CURRENT_WORKTREE without another board.

## Required control relationship

**MASTER POLICY → MASTER WORK BOARD → PROJECT SCOPE → PROJECT WORK BOARD WHEN NEEDED → CURRENT WORKTREE → WORKER EXECUTION → RECEIPT / EVIDENCE → STATE UPDATE.**

A lower layer can supply newer facts but cannot silently supersede higher authority.

## Update discipline

- Worktree: next-action changes.
- Project Work Board: material project-state changes.
- Master Work Board: company-level state, priority, owner, gate, or terminal outcome changes.
- Receipt/evidence: durable proof.

Avoid repeating the same status across unnecessary files.

## Closure

Close only after the close condition and required verification are satisfied. Then mark terminal state, retire stale active pointers, roll material state upward when required, preserve evidence, and move to the next unblocked item.

## Recovery

A replacement worker should recover from accepted master policy → `CURRENT_WORK_BOARD.md` → Project Scope → Project Work Board when present → CURRENT_WORKTREE → latest relevant evidence.

Chat memory is supporting context, not the recoverable control surface.

## Control statement

**SCOPE BOUNDS AUTHORITY. WORKTREE ORDERS EXECUTION. WORK BOARD STATES REALITY. KEEP THEM DISTINCT, CURRENT, AND RECOVERABLE.**
