# ELEVATION UPSCALES — MASTER OS GLOSSARY V1.0

**Version:** 1.0  
**Effective:** 2026-09-11  
**Reconciled:** 2026-09-12  
**Status:** CONTROLLING VOCABULARY / AUTHORITY-PROPAGATION AMENDMENT ALIGNED

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
**Boundary:** Must be reconciled when verified owning-lane facts materially change management routing; higher placement does not authorize known-stale facts.

## Master Workboard
**Short Definition:** High-level company operating board.  
**OS Function:** Gives Hybrid Management one current cross-Project view without duplicating detailed Project task trees.  
**Boundary:** Owns reconciled cross-Project routing state, not every underlying factual detail.

## Management Truth
**Short Definition:** Current authorized priority, ownership, routing, gates and cross-Project control state.  
**OS Function:** Tells the OS what should execute, in what order, under whose authority.  
**Boundary:** Management truth must consume verified material facts; it cannot preserve a fact known to be stale simply because management outranks the fact source.

## Objective / Factual Truth
**Short Definition:** Verified real-world, platform, source, order, technical or owning-lane fact.  
**OS Function:** Describes what is actually true within the fact source's proven scope.  
**Boundary:** Factual freshness corrects stale facts but does not itself grant management priority or cross-Project authority.

## Authority Propagation
**Short Definition:** Controlled movement from verified fact to authorized management routing and back down to execution.  
**OS Function:** `VERIFIED FACT → OWNING LANE → MANAGEMENT RECONCILES → MANAGEMENT ROUTES → AUTHORIZED WORKER EXECUTES → RESULT VERIFIED → CONTROL SURFACES UPDATED`.  
**Boundary:** **NEW FACT ≠ NEW AUTHORITY.**

## Control-Plane Drift
**Short Definition:** Two or more controlling/routing surfaces disagree on material execution state.  
**OS Function:** Flags mismatches in active phase, execution owner, terminal/open state, priority gate or accepted release/production pointer before conflicting work is routed.  
**Response:** `STOP ONLY CONFLICTING ROUTING → VERIFY OBJECTIVE STATE → SYNC POINTER SET → PRESERVE UNRELATED WORK → CONTINUE`.

## Incident / Stabilization / Freeze Control
**Short Definition:** Temporary management control that subordinates lower-priority work to an active recovery/emergency sequence.  
**OS Function:** Prevents ordinary backlog or feature work from competing with a verified P0/recovery lane.  
**Boundary:** Preserves deferred work; does not silently delete it or permanently rewrite the MASTER S.O.P. unless separately amended.

## CURRENT_WORKTREE
**Short Definition:** Current Project execution register.  
**OS Function:** Holds detailed live Project work, task owner, status, last action, blocker/open reason and next action.  
**Boundary:** Newer verified facts in a Worktree can defeat stale factual pointers, but the Worktree does not become cross-Project management authority.

## Terminal Worktree
**Short Definition:** Current Worktree state that has reached a verified terminal execution condition such as `CLOSED`, `EXECUTION CLOSED` or `SUBMITTED / WAITING`.  
**OS Function:** Prevents stale Board/Registry/prompt/receipt pointers from replaying work already completed or moved to external wait.  
**Boundary:** Reopens only from a valid trigger or higher-authority explicit direction.

## Worker Registry
**Short Definition:** Central directory of active OS workers.  
**OS Function:** Shows who exists, where they belong, current state, current Worktree and last timestamp without duplicating Project task details.  
**Boundary:** Registry state is an index/pointer, not a grant of authority and not a substitute for management priority or the owning Worktree.

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
**Boundary:** Not a Project Manager by default; cannot independently reprioritize/take over the Project. Newer data, broader tool access or a newer receipt does not elevate the role into management authority.

## MASTER RECON OS
**Short Definition:** OS-wide reconciliation/integrity worker.  
**OS Function:** Protects Operating System truth, drift control and recoverability.  
**Boundary:** Not another manager; may correct objective stale pointers within authorized RECON but does not invent new business priority/policy.

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
**Boundary:** Does not own Master management priority/state. Newer `main` code is not production authority merely because it is newer.

## GIT FIRST
**Short Definition:** Lightweight freshness check before Git-aware RUN.  
**OS Function:** Ensures workers resume from current Master Git/Project state rather than stale instructions; conflicting management/Worktree/release pointers trigger SYNC/RECON before conflicting execution.

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
**Short Definition:** Make the OS agree with verified reality and current valid authority.  
**OS Function:** Reconcile objective state, correcting within authority or leaving a RECON NOTE when direct correction is unavailable.  
**Boundary:** SYNC corrects state; it does not invent policy or cross-Project priority.

## RECON
**Short Definition:** Targeted discovery + reconciliation cycle.  
**OS Function:** `SCOUT → COMPARE → SYNC → RECORD`.

## SWEEP
**Short Definition:** Complete the full controlled pass.  
**OS Function:** `SCOUT → AUDIT → ANALYZE where needed → SYNC objective state → RECON NOTE uncorrectable items → RECORD DELTA → continue through entire named Scope`.

## RUN
**Short Definition:** Initiate/resume authorized work.  
**OS Function:** Starts from current management/Project state and last verified Worktree, then continues until completion, wait/gate, or no executable work.  
**Boundary:** Does not increase authority; a stale RUN pointer cannot bypass a newer valid freeze, terminal Worktree or owner gate.

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
