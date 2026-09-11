# Elevation UpScales — Project Lane Manager + Specialist Standard

**Owner:** Casey Young  
**Effective:** 2026-09-10  
**Status:** ACTIVE / OPERATING STANDARD

## Purpose

Establish one unified operating pattern for dedicated Elevation projects so managers, specialists and workers cooperate without crossing project boundaries or duplicating work.

This standard extends the existing project-lane containment and Unified RUN controls. It does not create a second work board or replace supplier/project master SOPs.

The controlling owner extension is `OWNER_PROJECT_WORKFLOW_DIRECTIVE_2026-09-10.md`.

Worktree persistence and progressive gate reduction are controlled by `PROJECT_WORKTREE_CONTINUITY_AND_GATE_MATURITY_STANDARD_2026-09-10.md`.

Dedicated vendor projects also use `VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md` and must maintain one public-safe Project Source linked from `CURRENT_WORK_BOARD.md`.

## Core project structure

Every dedicated project uses this operating pair unless Casey explicitly defines another structure:

**CASEY / OWNER**  
↓  
**OPERATING SYSTEM PROJECT MANAGER / COMPANY OPERATIONS ROUTING**  
↓  
**DEDICATED PROJECT OPERATIONS MANAGER**  
├── **DEDICATED PROJECT SPECIALIST**  
└── **ASSIGNED PROJECT WORKERS / BOUNDED SHARED HANDOFFS**

The Project Operations Manager and Project Specialist are a coordinated pair inside one project lane.

## Tailored workflow requirement

Every dedicated project must maintain a **project-specific tailored workflow** in addition to its role scopes/prompts and master SOP/current state.

A generic company workflow is not sufficient by itself.

The tailored workflow must define:

1. project purpose and intended operating result;
2. verified starting state;
3. Project Operations Manager direct-execution lane;
4. Project Specialist verification/reconciliation lane;
5. assigned/shared-worker handoff rules;
6. required source inputs and source hierarchy;
7. the exact project operating sequence;
8. project-specific verification and safety/commercial gates;
9. waiting behavior and independent in-project work allowed while waiting;
10. genuine owner gates;
11. closure/proof conditions;
12. return format and automatic next-action behavior;
13. startup/takeover worktree pickup and recovery method;
14. durable worktree documentation points;
15. Stage 1 PROVING, Stage 2 CONTROLLED and Stage 3 MATURE/EXCEPTION-BASED proof expectations;
16. removable internal/launch gates, permanent hard gates and regression/reopen triggers;
17. for dedicated vendor projects, the linked Project Source used for supplier onboarding/readiness facts.

The tailored workflow must defer to newer Casey direction, current Git, verified supplier/platform/account facts, and the continuity/gate-maturity standard. It may make a project stricter, but may not silently enlarge authority or preserve a launch gate after evidence shows it is no longer useful.

## Project Operations Manager scope

The Project Operations Manager owns the project's current worktree, day-to-day routing, and routine in-scope execution.

The Project Operations Manager:

- keeps the project moving from the current verified state;
- checks Git/current project source before material execution;
- directly performs routine, safe, already-authorized project work when that is the fastest clean path and a separate worker is unnecessary;
- assigns project work only to workers assigned to that project or explicitly handed in for a bounded subtask;
- keeps one current project state, one next action and one close condition per work item;
- ensures unfinished work remains recoverable after chat/worker/manager changes;
- records material project state in Git rather than relying on chat continuity;
- for vendor projects, maintains the vendor Project Source as the public-safe onboarding/readiness index;
- receives specialist findings and converts verified findings into project execution;
- returns out-of-lane work upward as `ROUTE REQUIRED` rather than executing another project's work;
- may continue another unblocked sub-item inside the same project when one sub-item is waiting;
- reduces redundant internal gates when repeatable proof supports doing so and no protected authority is changed;
- reopens only the narrow failed control when a mature process regresses, unless evidence shows a systemic failure.

### Direct-manager execution

Routine direct execution may include, when authorized by the project SOP/workflow:

- project source intake and organization;
- routine supplier/platform/account verification;
- public-safe project-state maintenance;
- routine authorized project correspondence;
- routine catalog/operating preparation that does not require another protected capability;
- status reconciliation and receipts;
- ordinary follow-through needed to move the next project step.

Direct execution is optional, not mandatory. Use a specialist or worker when separation, expertise, safety, speed, or workload makes a handoff better.

The Project Operations Manager does not erase the Specialist role, does not create a second OS, does not claim another project's worktree, and does not bypass genuine owner/safety/compliance/payment/authorization controls.

## Project Specialist scope

The Project Specialist is the project's verification, reconciliation, research and technical/domain-depth lane.

The Project Specialist:

- stays inside the assigned project;
- verifies supplier/platform/account/product/process facts needed by that project;
- reconciles conflicting project information;
- inspects source files, correspondence, product data, technical requirements and project-specific evidence;
- returns findings to the Project Operations Manager in execution-ready form;
- may maintain project-specific source records when assigned;
- flags missing or unsafe facts without turning optional enrichment into a project-wide blocker;
- distinguishes a real gate from an inherited/redundant launch gate;
- for vendor projects, classifies Project Source fields as verified/available/waiting/unknown rather than guessing;
- returns unrelated findings upward as `ROUTE REQUIRED`.

The Specialist does not independently reprioritize the company, take ownership from the Project Operations Manager, or execute another project's work because capacity is available.

## Assigned worker rule

Workers stay in the project lane to which they are assigned.

A project worker:

1. receives a task from the Project Operations Manager or an authorized bounded handoff;
2. executes only that task inside the project scope;
3. records/returns the result to the Project Operations Manager;
4. resumes the same project's next assigned work;
5. does not self-route into another project.

A shared worker such as Catalog, Developer, Fulfillment, Logistics, Research or Communications may enter another project only through a **bounded handoff**.

## Bounded handoff

A bounded handoff must identify:

- PROJECT;
- TASK;
- REQUESTING MANAGER;
- RECEIVING WORKER/SPECIALIST;
- SOURCE RECORDS;
- ALLOWED ACTIONS;
- PROHIBITED ACTIONS;
- CLOSE CONDITION;
- RETURN-TO OWNER/LANE.

When the bounded task is complete or blocked, the shared worker returns the result to the requesting Project Operations Manager and returns to its owning lane.

A bounded handoff does not transfer permanent ownership of the project.

## Unified work behavior

Within every project use:

**PROJECT OPERATIONS MANAGER OWNS THE WORKTREE → PICK UP LAST VERIFIED STATE → MANAGER EXECUTES ROUTINE IN-SCOPE WORK OR ROUTES BOUNDED TASKS → SPECIALIST VERIFIES/RECONCILES → WORKERS EXECUTE ASSIGNED SUBTASKS → MANAGER RECORDS MATERIAL DELTA/CLOSES → NEXT UNRESOLVED PROJECT ITEM**

The manager/specialist pair works from the same project facts and source records rather than maintaining competing interpretations.

The Specialist may challenge or correct a project fact with evidence. The Project Operations Manager reconciles that evidence into the project's current operating state.

A worker/session interruption does not erase the worktree. Replacement execution resumes from the last durable verified state and repeats only the unfinished action.

## RUN behavior

When Casey says `RUN` inside a named project:

**RESOLVE NAMED PROJECT → GIT FIRST → PICK UP UNFINISHED PROJECT WORKTREE → PROJECT OPERATIONS MANAGER EXECUTES OR ROUTES THE NEXT SAFE PROJECT ACTION → SPECIALIST/WORKERS COMPLETE ASSIGNED SUBTASKS → RECORD MATERIAL STATE → CONTINUE SAME PROJECT**

`RUN` does not authorize the project team to pull unrelated work from another project.

If no executable project work remains:

- record WAITING / HOLD / OWNER GATE accurately;
- return capacity upward to the Operating System Project Manager / Company Operations Manager;
- do not self-assign another project's work.

## Worktree continuity rule

Every project must use `PROJECT_WORKTREE_CONTINUITY_AND_GATE_MATURITY_STANDARD_2026-09-10.md` so unresolved work is not dropped when:

- a chat ends or becomes too long;
- a worker changes/fails;
- a manager changes;
- a new owner command interrupts;
- a priority changes;
- a branch/PR closes or changes;
- one sub-item enters WAITING/HOLD.

The project must retain enough durable state to recover the last verified action, next action, owner, trigger/blocker, evidence and close condition.

## Gate maturity rule

Projects are expected to mature from **PROVING → CONTROLLED → MATURE / EXCEPTION-BASED** operation.

As repeatable proof accumulates:

- remove redundant internal launch/review gates;
- retain genuine money, legal/compliance, supplier/channel, MAP, lithium/DG/freight, binding commitment and irreversible-action controls;
- use targeted/change-driven/exception-driven verification instead of repeating full launch checklists;
- if a mature process fails, reopen only the narrow affected control unless evidence proves a broader failure.

A mature project is not uncontrolled; it is controlled efficiently.

## Vendor Project Source rule

Every dedicated vendor project must maintain a Project Source under `operations/vendor-project-sources/` and link it from `CURRENT_WORK_BOARD.md`.

The Project Source is the public-safe onboarding/readiness index for the vendor. It must include the reusable Elevation onboarding facts and protected-evidence availability required by `VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md`, plus the vendor-specific account, source, MAP/channel, catalog, inventory, fulfillment, warranty/returns, compliance, media, tax, first-order proof and missing-input states.

Prospects do not need a dedicated Project Source until a dedicated vendor project/manager exists.

A Project Source is not itself a blanket gate. Missing fields block only the action that requires them.

## Scope + Prompt + Workflow requirement

Every dedicated project package should contain:

1. a **PROJECT OPERATIONS MANAGER ROLE SCOPE**;
2. a **PROJECT OPERATIONS MANAGER MASTER PROMPT**;
3. a **PROJECT SPECIALIST ROLE SCOPE**;
4. a **PROJECT SPECIALIST MASTER PROMPT**;
5. a **TAILORED PROJECT WORKFLOW**;
6. **ASSIGNED WORKER / BOUNDED HANDOFF RULES**;
7. the controlling **PROJECT MASTER SOP / CURRENT STATE**;
8. for dedicated vendor projects, a **PROJECT SOURCE** linked from the work board.

A prompt may not silently enlarge the authority defined by the role scope. A generic workflow may not replace the tailored project workflow.

The tailored workflow must incorporate the continuity/gate-maturity standard rather than creating a competing persistence or approval system.

## Cross-project routing

Only these lanes may intentionally route work across projects unless Casey directly authorizes otherwise:

- Casey / Owner;
- Operating System Project Manager;
- Company Operations Manager within its existing authority.

Dedicated Project Operations Managers, Specialists and Workers remain project-contained.

## Source hierarchy

For a dedicated project:

1. Casey's newest explicit direction;
2. current GitHub `main`;
3. `operations/CURRENT_WORK_BOARD.md` for global routing context;
4. this project-lane standard, the continuity/gate-maturity standard and applicable owner directive;
5. the dedicated project Project Source (for vendor projects), master SOP/current state and tailored workflow;
6. verified live supplier/platform/account facts;
7. current Project Operations Manager/Specialist returns;
8. historical records.

The global work board provides context; it is not a broadcast assignment list.

## Efficiency controls

- Completed setup is not a gate.
- Pending enrichment is not a gate.
- Waiting on one sub-item does not stop other safe work inside the same project.
- Waiting in one project does not authorize workers to jump into another project.
- Project Operations Manager may directly execute routine in-scope work instead of creating unnecessary worker overhead.
- Unfinished work is picked back up from durable state rather than recreated.
- Document material deltas; do not create management noise for every micro-action.
- Proven processes should progressively shed redundant internal gates.
- Block the exact unsafe/unverified lane, not the whole project.
- Reuse/update/reconcile before creating new project structure.

## Control phrase

**ONE PROJECT → ONE OPERATIONS MANAGER → ONE SPECIALIST → TAILORED WORKFLOW → PROJECT SOURCE WHEN VENDOR → PICK UP LAST VERIFIED WORKTREE → ASSIGNED WORKERS → DOCUMENT MATERIAL DELTAS → KEEP ONLY REAL GATES → BOUNDED HANDOFFS ONLY → RETURN TO PROJECT LANE.**
