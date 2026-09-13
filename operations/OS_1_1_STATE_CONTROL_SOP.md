# ELEVATION UPSCALES — OS 1.1 STATE CONTROL SOP

**Version:** 1.1  
**Parent:** `operations/MASTER_SOP_V1_1.md`  
**Owner:** Casey Young  
**Status:** CANDIDATE UNTIL MERGED TO ACCEPTED `main`

## Purpose

Define how OS 1.1 determines current state, resolves conflicting records, protects terminal work, and propagates verified facts without inventing authority. This extends OS 1.0; it does not replace it.

## Four operating layers

1. **POLICY** — durable rules, authority, protected gates and control relationships.
2. **LIVE STATE** — what is currently true; company index is `CURRENT_WORK_BOARD.md`.
3. **SCOPE / WORKTREE** — what a lane may work and what it should execute next.
4. **EVIDENCE** — facts, receipts, platform records, tests, commits and observations supporting state.

**NEW FACT ≠ NEW AUTHORITY.**

## State precedence

When records conflict:

1. explicit current owner direction;
2. current accepted master policy;
3. current Live State;
4. current authorized Scope;
5. current Worktree/task pointer;
6. verified evidence;
7. historical or superseded records.

Freshness decides which factual observation is newer. Authority decides who may change priority, Scope, ownership or gates.

## Terminal-state protection

`COMPLETE`, `ACCEPTED`, `CLOSED`, `CANCELLED`, `SOLD`, `FAILED / TERMINAL`, `SUPERSEDED`, `DO NOT DEPLOY`, and any state explicitly defined as terminal remain terminal until current valid authority reopens them.

A stale prompt, Worktree row, startup file, directive or handoff may not silently reactivate terminal work.

**PRESERVE TERMINAL STATE → MARK STALE POINTER → SYNC OR RETIRE POINTER → CONTINUE CURRENT WORK.**

## One-state / one-owner rule

Each material work item has:

- one current company-level state;
- one primary active execution owner;
- one bounded Scope;
- one next executable action or one explicit blocker/trigger.

Assisting workers do not become co-owners by default. Duplicate routing is corrected, not preserved.

## Control-plane drift

Drift exists when control surfaces disagree about active phase, owner, terminal/open state, Scope, release authority, blocker or accepted production identity.

Response:

**STOP ONLY CONFLICTING ROUTING → VERIFY OBJECTIVE STATE → APPLY PRECEDENCE → SYNC POINTERS → PRESERVE UNRELATED WORK → CONTINUE.**

Do not freeze the company because one lane drifted.

## Factual correction propagation

**VERIFIED FACT → OWNING LANE INCORPORATES → MANAGER RECONCILES IMPACT → LIVE STATE UPDATED IF MATERIAL → AUTHORIZED EXECUTION CONTINUES.**

Workers may report and record facts inside their Scope. They may not turn a fact into self-granted cross-company priority. Managers must consume newer verified facts that materially change their lane.

## Waiting and blocked state

A blocked item remains visible with state, blocker, resume trigger, owner and next action after trigger.

**HOLD ONLY THE BLOCKED ITEM → CONTINUE NEXT UNBLOCKED ITEM.**

An outside-party wait does not stop unrelated executable work.

## Incident boundaries

An incident, freeze or stabilization directive applies only to its stated Scope unless current authority broadens it. Deferred work stays preserved and visible; it resumes only when its gate releases or higher authority reroutes it.

## State update discipline

Update the smallest sufficient control surface:

- project Work Board / CURRENT_WORKTREE for lane detail;
- `CURRENT_WORK_BOARD.md` for company-level state;
- manager/incident record for temporary routing control;
- release/production receipt for release identity;
- Worker Registry for placement/status pointers.

Do not copy every detail into every file.

## Reconciliation loop

**RE-RESOLVE MAIN → READ POLICY → READ LIVE STATE → IDENTIFY CONFLICT → VERIFY FACTS → APPLY PRECEDENCE → PROTECT TERMINAL STATE → CONFIRM ONE OWNER → SYNC MINIMUM REQUIRED POINTERS → RECORD → CONTINUE.**

## Control statement

**ONE CURRENT STATE. ONE EXECUTION OWNER. TERMINAL STATE DEFEATS STALE POINTERS. NEW FACTS CORRECT REALITY; THEY DO NOT INVENT AUTHORITY.**
