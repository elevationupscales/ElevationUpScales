# Elevation UpScales — Project Worktree Continuity + Gate Maturity Standard

**Owner:** Casey Young  
**Effective:** 2026-09-10  
**Status:** ACTIVE / OPERATING STANDARD  
**Parent:** `PROJECT_LANE_MANAGER_SPECIALIST_STANDARD_2026-09-10.md`, `OWNER_PROJECT_WORKFLOW_DIRECTIVE_2026-09-10.md`

## Purpose

Ensure project work is continuously picked back up, material state is documented, unfinished work does not disappear when chats/workers/commands change, and only necessary gates remain as a project becomes proven and operationally comfortable.

This standard does not create a second work board, manager hierarchy, approval system, or project structure.

Use:

**PRESERVE WORKTREE → RESUME FROM VERIFIED STATE → EXECUTE → DOCUMENT MATERIAL DELTA → VERIFY → REDUCE PROVEN-UNNECESSARY GATES → CONTINUE**

## Core continuity rule

**UNFINISHED WORK PERSISTS UNTIL COMPLETE, EXPLICITLY SUPERSEDED, OR MOVED TO A REAL WAITING/HOLD/OWNER GATE.**

A chat ending, worker changing, manager changing, new owner command arriving, new priority appearing, branch changing, or one sub-item waiting does not close the prior worktree.

The project must always be recoverable from Git/public-safe project state plus protected source evidence where applicable.

## Project pickup sequence

At project startup, takeover, `RUN`, worker recovery, or return from WAITING/HOLD:

1. resolve current `main`;
2. identify the exact project and its Project Operations Manager / Project Specialist;
3. read `CURRENT_WORK_BOARD.md` for global routing context without claiming another project's work;
4. read the project Project Source, master SOP/current-state record and tailored workflow;
5. inspect the project's latest material receipts, open branches/PRs/issues, pending bounded handoffs, and verified external triggers when relevant;
6. identify every unresolved project item in `READY`, `IN_PROGRESS`, `VERIFYING`, triggered `WAITING`, or triggered `HOLD` state;
7. identify the **last completed action** and **next executable action** for the highest-priority in-project item;
8. resume from that exact point rather than recreating setup or starting a parallel interpretation;
9. continue other safe in-project work when one sub-item is legitimately waiting;
10. return capacity upward only when no executable work remains inside the project.

Do not rebuild the entire project merely because a previous chat or worker is unavailable.

## Minimum durable worktree record

Every material unresolved project work item must be recoverable with these fields in the owning project state or canonical work board as appropriate:

- Work Item / Intended Outcome;
- Current State;
- Current Owner / Execution Lane;
- Last Verified Action;
- Next Action;
- Waiting On / Blocker / Trigger when applicable;
- Required Evidence or source reference;
- Close Condition;
- Last Material Reconciliation.

Do not create duplicate records solely to add these fields. Update the existing owning record.

## Documentation discipline

Document **material state changes**, not every keystroke.

A material project delta includes:

- a work item starts, completes, fails, waits, unblocks, or changes owner;
- supplier/platform authorization changes;
- customer/payment/order state materially changes;
- a branch/PR/production proof materially changes project state;
- a pricing/MAP/channel/compliance rule is verified or changed;
- a required source package arrives or becomes unusable;
- a real gate is added, satisfied, narrowed, removed, or reinstated;
- a bounded handoff begins or returns with a result that changes state;
- a project reaches a new proof/maturity level.

Routine activity that does not change state may remain in ordinary execution evidence instead of creating management noise.

Public Git records stay public-safe. Protected supplier costs, raw inventory, customer PII, private correspondence, credentials, tax data, private freight/storage quotes and confidential commercial terms remain outside public Git; the project record may reference their verified existence/status.

## Interruption and return rule

A new Casey command may interrupt current project work but does not erase it.

When the interruption is controlled:

**RECORD INTERRUPTED WORKTREE → EXECUTE NEW IN-SCOPE OWNER DIRECTION → RECORD RESULT → RETURN TO PRIOR OPEN IN-PROJECT WORKTREE**

If Casey explicitly changes priority, the older work item remains visible in READY / WAITING / HOLD / VERIFYING until its close condition is actually satisfied or Casey explicitly supersedes it.

## Worker/session failure rule

**A LOST WORKER IS NOT LOST WORK.**

When a worker/session fails or becomes unavailable:

1. preserve the existing project/work item;
2. read the latest durable state and evidence;
3. identify only the unfinished action;
4. route that exact action to the replacement worker/manager;
5. do not restart completed steps;
6. record the replacement result back into the same worktree.

## Gate maturity model

Projects should become easier to operate as verified proof accumulates.

The goal is not to remove safety controls. The goal is to remove repetitive internal gates that no longer add meaningful protection.

### Stage 1 — PROVING

Use when a project/supplier/process is new, materially changed, or not yet proven end-to-end.

Behavior:

- verify required source facts before consequential execution;
- require first-path proofs and explicit acceptance evidence;
- document material assumptions and unknowns;
- use narrower manual checks while facts are being established;
- do not let optional enrichment become a blanket blocker.

Typical examples:

- first catalog/source integration;
- first paid order through a supplier path;
- first controlled warranty/replacement flow;
- first new logistics route;
- first production release of a materially new integration.

### Stage 2 — CONTROLLED

Use after the project has repeatable verified evidence and no material unresolved failure pattern.

Behavior:

- routine already-authorized work executes without repeated setup approval;
- manager may directly perform ordinary in-scope actions;
- known-good source/update paths are reused;
- validation becomes targeted to the changed or risky element;
- recurring internal review gates that merely repeat already-proven facts are removed;
- exceptions, changed supplier facts, stale data, or failed checks still reopen the affected verification step.

### Stage 3 — MATURE / EXCEPTION-BASED

Use when the process has sufficient repeated proof that routine flow is trusted.

Behavior:

- normal work proceeds by default;
- the project team picks up the next unresolved in-project work item automatically;
- routine approved transactions/workflows do not wait for management confirmation solely because they are routine;
- documentation focuses on material deltas, exceptions, receipts and trend changes;
- verification is event-driven, threshold-driven, change-driven or exception-driven instead of repeating the full launch checklist;
- workers/managers escalate only when a real gate or abnormal condition is hit.

MATURE does not mean uncontrolled. It means the project uses proven controls efficiently.

## Hard gates that do not disappear with maturity

Keep genuine gates for:

- customer money, payment integrity, refunds and fraud-sensitive actions;
- legal, tax, regulatory or contractual obligations;
- supplier/channel authorization;
- MAP / binding advertised-price rules where applicable;
- lithium/DG/freight safety and carrier acceptance;
- binding commercial commitments, financing, exclusivity, material minimums or material inventory investments requiring owner approval;
- destructive or irreversible actions where recovery is not reasonably available;
- exact-SHA preview/production controls where the release workflow requires them;
- unsupported factual claims to customers, suppliers, partners or public channels.

A hard gate should block only the affected lane whenever safe alternatives remain available.

## Gates that should normally disappear after proof

Once the underlying fact/process is repeatably verified, do not preserve a gate merely because it existed during launch.

Examples include:

- repeated approval to perform the same already-authorized routine task;
- manager review solely because a work item moved between known internal states;
- re-verifying completed supplier onboarding before every normal order;
- rebuilding an already-proven source/catalog path;
- requiring optional enrichment before safe commerce can continue;
- blocking checkout because an internal project or documentation task remains open when price, authorization and fulfillment are otherwise valid;
- requiring every routine worker return to become a new management handoff packet.

## Gate removal / downgrade rule

A Project Operations Manager may recommend or apply removal of an internal operational gate inside the project's existing authority when evidence shows the gate is redundant and no owner/safety/compliance/commercial boundary is being changed.

Record:

- gate being removed/narrowed;
- proof that made it redundant;
- remaining control;
- rollback/reopen trigger.

Owner approval remains required when removing the gate would change an owner-level commitment, legal/compliance obligation, supplier/channel restriction, MAP rule, financial exposure boundary, or other protected authority.

## Regression rule

If a mature flow fails:

**REOPEN THE NARROW FAILED CONTROL — NOT THE WHOLE PROJECT.**

Examples:

- one SKU loses source availability → hold/re-source that SKU, not the entire supplier;
- one carrier rejects one configuration → hold that route/configuration, not every shipment;
- one catalog feed becomes stale → re-verify affected feed/SKUs, not completed onboarding;
- one order fails fulfillment → resolve that order and inspect the relevant process, not disable all checkout without evidence;
- one release check fails → repair the exact release issue, not reopen unrelated business work.

After the issue is corrected and proof restored, return the lane to its prior maturity level unless evidence shows a broader systemic failure.

## Automatic continuation rule

Inside a dedicated project, after any COMPLETE / WAITING / HOLD / VERIFYING transition:

1. record the material state;
2. check for the next executable unresolved item **inside that same project**;
3. continue it automatically when within current authority and tools;
4. if none exists, return project capacity upward as `WAITING / NO EXECUTABLE PROJECT WORK` or `ROUTE REQUIRED`.

Do not wait for Casey to repeatedly say `next` for ordinary safe continuation inside an already-authorized project worktree.

## Project close rule

A project or work item closes only when:

- its defined close condition is satisfied with required evidence; or
- Casey explicitly supersedes/retires it.

Silence, inactivity, worker loss, priority changes, external waiting, chat length, branch age, or creation of newer work do not equal closure.

## Tailored workflow requirement

Every dedicated project's tailored workflow must incorporate:

- Project Source access;
- startup/pickup sequence;
- unresolved-work recovery method;
- durable worktree fields;
- documentation points;
- project-specific Stage 1 / Stage 2 / Stage 3 proof expectations;
- hard gates that remain permanent;
- removable launch/internal gates;
- regression/reopen triggers;
- automatic in-project continuation behavior;
- close conditions.

Do not mechanically copy the same gates into every supplier/project. Tailor them to actual supplier/platform/process risk.

## Control phrase

**PICK UP THE WORKTREE → USE THE LAST VERIFIED STATE → EXECUTE THE NEXT SAFE ACTION → DOCUMENT THE MATERIAL DELTA → KEEP ONLY REAL GATES → REOPEN ONLY THE FAILED LANE → CONTINUE UNTIL CLOSED.**
