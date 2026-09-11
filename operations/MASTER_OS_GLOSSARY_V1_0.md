# ELEVATION UPSCALES — MASTER OS GLOSSARY V1.0

**Version:** 1.0  
**Effective:** 2026-09-11  
**Status:** CONTROLLING VOCABULARY

Each major term preserves a **Short Definition**, **OS Function**, and where needed an **Authority Boundary**.

## S.O.P.
**Short Definition:** Standard Operating Procedure; durable rules for how work behaves.  
**OS Function:** Governs repeatable conduct, authority, routing, gates and execution behavior.  
**Boundary:** A subordinate S.O.P. cannot override the MASTER S.O.P.

## Scope
**Short Definition:** The mission and boundary of assigned work.  
**OS Function:** Defines what the worker/project is responsible for and where authority stops.

## Workflow
**Short Definition:** The ordered tasks/stages that should happen.  
**OS Function:** Describes the intended processing sequence.

## Worktree
**Short Definition:** The actual live path/state of processing.  
**OS Function:** Preserves what is happening now: dependencies, blockers, completed steps, owner, last verified state and next action.

## Prompt
**Short Definition:** Instruction that activates/directs a worker.  
**OS Function:** Places the worker into an existing Project/Scope and points it to controlling sources.  
**Boundary:** A Prompt does not outrank the MASTER S.O.P. or create new authority by wording alone.

## Workboard
**Short Definition:** Management control surface.  
**OS Function:** Tracks meaningful priority, ownership, state, gates and routing at the appropriate management level.

## Master Workboard
**Short Definition:** High-level company operating board.  
**OS Function:** Gives Hybrid Management one current cross-Project view without duplicating detailed Project task trees.

## CURRENT_WORKTREE
**Short Definition:** Current Project execution register.  
**OS Function:** Holds detailed live Project work, task owner, status, last action, blocker/open reason and next action.

## Worker Registry
**Short Definition:** Central directory of active OS workers.  
**OS Function:** Shows who exists, where they belong, current state, current Worktree and last timestamp without duplicating Project task details.

## ACTIVE / IN PROGRESS
**Short Definition:** Work is currently being executed.  
**OS Function:** Identifies the named primary worker presently processing the task.

## QUEUED
**Short Definition:** Valid work exists but is not activated.  
**OS Function:** Preserves future work without pretending it is being executed.

## OPEN TASK
**Short Definition:** Assigned work is unfinished.  
**OS Function:** Preserves unfinished work, stop reason, last verified state and resume path so it cannot disappear.

## CLOSED
**Short Definition:** Current assigned worker work reached its completion/return point.  
**OS Function:** Closes the worker assignment without implying the entire Project is finished.

## STANDBY
**Short Definition:** Worker has no currently executable assigned Worktree.  
**OS Function:** Keeps available capacity registered while waiting for `RUN` or another authorized assignment.

## OPEN TASK / STANDBY
**Short Definition:** Worker is stopped but unfinished work remains.  
**OS Function:** Makes failure/timeout/crash state immediately visible in the Worker Registry while Project Worktree retains the task.

## PLACEMENT REQUIRED
**Short Definition:** Worker/directive cannot be safely fitted into known structure.  
**OS Function:** Routes ambiguity upward instead of creating a new Project/hierarchy without authority.

## ROUTE REQUIRED
**Short Definition:** Valid work exists outside the current worker's authority.  
**OS Function:** Preserves the finding and sends ownership to the correct manager/lane.

## LEAD
**Short Definition:** Possible relationship not yet in defined finalization.  
**OS Function:** Tracks research/outreach/qualification without falsely representing an operating relationship.

## PENDING PARTNER
**Short Definition:** Relationship is actively being finalized and has a known close condition.  
**OS Function:** Keeps near-complete commercial relationships visible with their exact remaining requirement.

## PARTNER
**Short Definition:** Established/approved operating relationship.  
**OS Function:** Moves the relationship into durable operational management.

## Specialist
**Short Definition:** Domain expert/advisory/execution worker.  
**OS Function:** Provides focused expertise and bounded execution.  
**Boundary:** Not a Project Manager by default; cannot independently reprioritize/take over the Project.

## MASTER RECON OS
**Short Definition:** OS-wide reconciliation/integrity worker.  
**OS Function:** Protects Operating System truth, drift control and recoverability.  
**Boundary:** Not another manager and does not casually rewrite Hybrid Management control state.

## Project RECON Worker
**Short Definition:** Reconciliation worker bound to one Project.  
**OS Function:** Protects that Project's records/state.  
**Boundary:** Out-of-Project work becomes `ROUTE REQUIRED`.

## Standby RECON Worker
**Short Definition:** Available reconciliation capacity without an active Worktree.  
**OS Function:** Can be activated by `RUN`/authorized routing.  
**Boundary:** No self-assignment.

## MASTER DEVELOPER / Deployment Developer
**Short Definition:** Shared technical build/deployment worker.  
**OS Function:** Executes code, build/config, deployment and technical receipts according to approved operating truth.  
**Boundary:** Does not own Master management priority/state.

## GIT FIRST
**Short Definition:** Lightweight freshness check before Git-aware RUN.  
**OS Function:** Ensures workers resume from current Master Git/Project state rather than stale instructions.

## ANALYZE
**Short Definition:** Understand it.  
**OS Function:** Interpret information, patterns, risks, causes, options or implications. No changes by default.

## AUDIT
**Short Definition:** Test/check it.  
**OS Function:** Compare a Scope against expected standard and report what is correct/missing/broken/stale/noncompliant. Report-only by default.

## SCOUT
**Short Definition:** Find what is there.  
**OS Function:** Discover current facts/state before deciding or correcting. No correction by default.

## SYNC
**Short Definition:** Make the OS agree with reality.  
**OS Function:** Reconcile verified objective state, correcting within authority or leaving a RECON NOTE when direct correction is unavailable.

## RECON
**Short Definition:** Targeted discovery + reconciliation cycle.  
**OS Function:** `SCOUT → COMPARE → SYNC → RECORD`.

## SWEEP
**Short Definition:** Complete the full controlled pass.  
**OS Function:** `SCOUT → AUDIT → ANALYZE where needed → SYNC objective state → RECON NOTE uncorrectable items → RECORD DELTA → continue through entire named Scope`.

## RUN
**Short Definition:** Initiate/resume authorized work.  
**OS Function:** Starts from current Project state and last verified Worktree, then continues until completion, wait/gate, or no executable work.  
**Boundary:** Does not increase authority.

## STREAMLINE
**Short Definition:** Remove friction from normal authorized work.  
**OS Function:** Simplifies routing and keeps executable work moving.  
**Boundary:** Does not grant GOD MODE.

## GOD MODE
**Short Definition:** Owner-authorized highest-autonomy execution state.  
**OS Function:** Coordinates available OS capabilities to complete the approved Scope until complete/stopped.  
**Boundary:** Must be owner-authorized; does not survive crash/rollover; protected gates remain protected unless owner-cleared.

## RECON NOTE
**Short Definition:** Durable unresolved reconciliation finding.  
**OS Function:** Makes a required correction visible in the nearest controlling Worktree/management path when RECON cannot directly correct it.

## ORDINARY EMAIL
**Short Definition:** Email that does not materially change OS state.  
**OS Function:** Keeps normal correspondence from overloading the management control plane.

## OS UPDATE REQUIRED
**Short Definition:** Incoming email materially changes operating state.  
**OS Function:** Converts verified email intelligence into routed durable OS state.

## SYSTEM SENSITIVE
**Short Definition:** Communication with meaningful system/security/foundational technical risk.  
**OS Function:** Adds a higher owner-review gate before execution.

## BUSINESS SENSITIVE
**Short Definition:** Communication that could materially create/change company obligations or commitments.  
**OS Function:** Adds a higher owner-review gate before execution.

## Email Commerce Update
**Short Definition:** Bridge from important inbound email to durable Project state.  
**OS Function:** Ensures material email changes are verified, routed, incorporated and closed instead of remaining trapped in Gmail.
