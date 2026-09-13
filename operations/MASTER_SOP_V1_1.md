# ELEVATION UPSCALES — MASTER OPERATING SYSTEM SOP V1.1

**Version:** 1.1  
**Base:** `operations/MASTER_SOP_V1_0.md`  
**Owner:** Casey Young  
**Status:** ACTIVE WHEN PRESENT ON ACCEPTED `main`

## COMPOSITE CONTROL

OS 1.1 is an additive integration release built from OS 1.0.

`MASTER_SOP_V1_0.md` remains the non-regression foundation. This file and `OS_1_1_INTEGRATION_SPEC.md` add the 1.1 state/scope integration model. A 1.0 rule remains active unless a current accepted 1.1 file explicitly changes that exact rule.

## 1.1 CONTROL SET

Read together:

1. `operations/MASTER_SOP_V1_0.md`
2. `operations/MASTER_SOP_V1_1.md`
3. `operations/OS_1_1_INTEGRATION_SPEC.md`
4. `operations/CURRENT_WORK_BOARD.md`
5. `operations/MASTER_WORKER_REGISTRY_V1_0.md`
6. `operations/MASTER_WORKER_REGISTRY_V1_1_ADDENDUM.md`

The dedicated worker starts from `operations/OS_1_1_INTEGRATION_WORKER_START.md`.

## OPERATING MODEL

OS 1.1 separates four layers:

- **Policy** — durable rules and authority.
- **Live State** — what is true now; company index is `CURRENT_WORK_BOARD.md`.
- **Scope / Worktree** — what may be worked and what should be worked next.
- **Evidence** — factual support that does not independently create management authority.

Use:

**SCOPE = WHAT MAY BE WORKED**  
**WORKTREE = WHAT SHOULD BE WORKED NEXT**  
**WORK BOARD = WHAT IS CURRENTLY TRUE**

Project-level Work Boards are permitted as subordinate execution views. They do not replace the canonical company Work Board.

## STATE PRECEDENCE

When records conflict:

**CURRENT OWNER DIRECTION → ACCEPTED MASTER POLICY → LIVE STATE → AUTHORIZED SCOPE → CURRENT WORKTREE → VERIFIED EVIDENCE → HISTORICAL POINTERS**

Terminal state defeats stale execution pointers. Completed, accepted, closed, cancelled, sold, or superseded work requires new current authority before reactivation.

## RUN

`RUN` means:

**VERIFY → FIX IF POSSIBLE → COMPLETE IF CLEAN → HOLD ONLY BLOCKED ITEM → MOVE ON**

Continue inside the authorized lane until the Scope is complete, no executable task remains, or a true owner/escalation gate is reached.

## RELEASE RULE

A 1.1 candidate is not accepted merely because it exists on a branch. Accepted OS state requires merge to `main` and post-merge verification.

## CONTROL STATEMENT

**OS 1.0 IS THE FOUNDATION. OS 1.1 IS THE INTEGRATION LAYER. BUILD FORWARD; DO NOT RESTART COMPLETED ARCHITECTURE.**
