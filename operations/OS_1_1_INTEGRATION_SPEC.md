# ELEVATION UPSCALES — OS 1.1 INTEGRATION SPEC

**Base:** OS 1.0  
**Release:** 1.1  
**Purpose:** integrate current-state, scope, workboard, and worktree behavior without reopening completed OS 1.0 architecture.

## 1. PRESERVED 1.0 CONTROLS

OS 1.1 inherits `MASTER_SOP_V1_0.md`, `MASTER_OS_GLOSSARY_V1_0.md`, `MASTER_WORKER_REGISTRY_V1_0.md`, and the current `CURRENT_WORK_BOARD.md` unless a later accepted file explicitly supersedes a specific rule.

Preserve owner authority, manager chain, evidence-vs-authority separation, terminal-work protection, bounded incident routing, GitHub source-of-truth rules, and the rule that an external blocker does not stop unrelated executable work.

## 2. FOUR OPERATING LAYERS

1. **Policy** — durable rules and authority.
2. **Live State** — what is true now. Company index: `CURRENT_WORK_BOARD.md`.
3. **Scope / Worktree** — bounded work authority and ordered execution.
4. **Evidence** — factual support; evidence does not create management authority by itself.

Operating shorthand:

- **Scope = what may be worked.**
- **Worktree = what should be worked next.**
- **Work Board = what is currently true.**

## 3. STATE PRECEDENCE

When records conflict, resolve in this order:

1. explicit current owner direction;
2. current accepted master policy;
3. current Live State;
4. current authorized Scope;
5. current Worktree/task pointer;
6. verified evidence;
7. historical or superseded instructions.

A stale pointer may not reopen work already marked complete, accepted, sold, cancelled, closed, or superseded.

## 4. PROJECT SCOPES AND WORKBOARDS

Project/workstream Scopes are allowed. Project-level Work Boards are also allowed when parallel execution justifies them.

A project Scope must name its objective, manager, in-scope and out-of-scope work, dependencies, current state, worktree, verification gates, closure condition, and handoff destination.

A project Work Board must inherit its Scope, report through the recognized manager, use the same state vocabulary as the master board, and roll terminal results back to the master board. It is an execution view, not a competing company source of truth.

## 5. EXECUTION LOOP

`RUN` means continue inside the worker's authorized lane using:

**VERIFY → FIX IF POSSIBLE → COMPLETE IF CLEAN → HOLD ONLY BLOCKED ITEM → MOVE ON**

Stop only when no executable item remains, an owner gate is reached, a required escalation is reached, or the Scope is complete.

## 6. INTEGRATION WORKER

OS 1.1 adds the Operating System 1.1 Integration Worker as a specialist under the Operating System Project Manager.

The worker reconciles 1.0 policy with current Live State, normalizes Scope/Worktree/Work Board relationships, detects stale and duplicate pointers, protects terminal states, prepares migration artifacts, and records release verification.

The worker does not replace the Operating System Project Manager, Company Operations Manager, or execution specialists.

## 7. MIGRATION RULE

Migration is additive and non-destructive:

**RE-RESOLVE MAIN → READ 1.0 CONTROL → READ LIVE STATE → CONFIRM OWNER → RECONCILE DUPLICATES → NORMALIZE SCOPE/WORKTREE → VERIFY → RECORD**

Historical files remain history/evidence unless current authority promotes them.

## 8. RELEASE CONTROL

OS changes follow:

**current main → integration branch → candidate → verification → PR/authorization → merge → post-merge verification → accepted baseline**

Do not call an unmerged branch production or accepted.
