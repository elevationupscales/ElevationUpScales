# Elevation UpScales — Project Lane Manager + Specialist Standard

**Owner:** Casey Young  
**Effective:** 2026-09-10  
**Status:** ACTIVE / OPERATING STANDARD

## Purpose

Establish one unified operating pattern for dedicated Elevation projects so managers, specialists and workers cooperate without crossing project boundaries or duplicating work.

This standard extends the existing project-lane containment and Unified RUN controls. It does not create a second work board or replace supplier/project master SOPs.

## Core project structure

Every dedicated project uses this operating pair unless Casey explicitly defines another structure:

**CASEY / OWNER**  
↓  
**OPERATING SYSTEM PROJECT MANAGER / COMPANY OPERATIONS ROUTING**  
↓  
**DEDICATED PROJECT MANAGER**  
├── **DEDICATED PROJECT SPECIALIST**  
└── **ASSIGNED PROJECT WORKERS**

The Project Manager and Project Specialist are a coordinated pair inside one project lane.

## Project Manager scope

The Project Manager owns the project's current worktree and day-to-day routing.

The Project Manager:

- keeps the project moving from the current verified state;
- checks Git/current project source before material execution;
- assigns project work only to workers assigned to that project or explicitly handed in for a bounded subtask;
- keeps one current project state, one next action and one close condition per work item;
- records material project state in Git;
- receives specialist findings and converts verified findings into project execution;
- returns out-of-lane work upward as `ROUTE REQUIRED` rather than executing another project's work;
- may continue another unblocked sub-item inside the same project when one sub-item is waiting.

The Project Manager does not become the specialist, does not create a second OS, and does not claim another project's worktree.

## Project Specialist scope

The Project Specialist is the project's verification, reconciliation, research and technical/domain-depth lane.

The Project Specialist:

- stays inside the assigned project;
- verifies supplier/platform/account/product/process facts needed by that project;
- reconciles conflicting project information;
- inspects source files, correspondence, product data, technical requirements and project-specific evidence;
- returns findings to the Project Manager in execution-ready form;
- may maintain project-specific source records when assigned;
- flags missing or unsafe facts without turning optional enrichment into a project-wide blocker;
- returns unrelated findings upward as `ROUTE REQUIRED`.

The Specialist does not independently reprioritize the company, take ownership from the Project Manager, or execute another project's work because capacity is available.

## Assigned worker rule

Workers stay in the project lane to which they are assigned.

A project worker:

1. receives a task from the Project Manager or an authorized bounded handoff;
2. executes only that task inside the project scope;
3. records/returns the result to the Project Manager;
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

When the bounded task is complete or blocked, the shared worker returns the result to the requesting Project Manager and returns to its owning lane.

A bounded handoff does not transfer permanent ownership of the project.

## Unified work behavior

Within every project use:

**PROJECT MANAGER ROUTES → SPECIALIST VERIFIES/RECONCILES → WORKER EXECUTES → PROJECT MANAGER RECORDS/CLOSES → NEXT PROJECT ITEM**

The pair should work from the same project facts and source records rather than maintaining competing interpretations.

The Specialist may challenge or correct a project fact with evidence. The Project Manager reconciles that evidence into the project's current operating state.

## RUN behavior

When Casey says `RUN` inside a named project:

**RESOLVE NAMED PROJECT → GIT FIRST → PROJECT MANAGER RESUMES PROJECT WORKTREE → SPECIALIST/WORKERS EXECUTE ASSIGNED SUBTASKS → RECORD MATERIAL STATE → CONTINUE SAME PROJECT**

`RUN` does not authorize the project team to pull unrelated work from another project.

If no executable project work remains:

- record WAITING / HOLD / OWNER GATE accurately;
- return capacity upward to the Operating System Project Manager / Company Operations Manager;
- do not self-assign another project's work.

## Scope + Prompt requirement

Every dedicated Project Manager and Project Specialist should have both:

1. a **ROLE SCOPE** — permanent authority, ownership, boundaries, reporting line and project lane;
2. a **MASTER PROMPT** — startup sequence, Git-first behavior, RUN behavior, work loop and return format.

A prompt may not silently enlarge the authority defined by the role scope.

Recommended role package:

- `00_START_HERE.md`
- `01_ROLE_SCOPE.md`
- `02_MASTER_PROMPT.md`
- `03_RUN_COMMAND.md`
- `04_HANDOFF_AND_RETURN.md`
- `05_BOUNDARIES_AND_ESCALATION.md`
- project master SOP / current project state files

## Cross-project routing

Only these lanes may intentionally route work across projects unless Casey directly authorizes otherwise:

- Casey / Owner;
- Operating System Project Manager;
- Company Operations Manager within its existing authority.

Dedicated Project Managers, Specialists and Workers remain project-contained.

## Source hierarchy

For a dedicated project:

1. Casey's newest explicit direction;
2. current GitHub `main`;
3. `operations/CURRENT_WORK_BOARD.md` for global routing context;
4. this project-lane standard;
5. the dedicated project master SOP/current state;
6. verified live supplier/platform/account facts;
7. current Project Manager/Specialist returns;
8. historical records.

The global work board provides context; it is not a broadcast assignment list.

## Efficiency controls

- Completed setup is not a gate.
- Pending enrichment is not a gate.
- Waiting on one sub-item does not stop other safe work inside the same project.
- Waiting in one project does not authorize workers to jump into another project.
- Block the exact unsafe/unverified lane, not the whole project.
- Reuse/update/reconcile before creating new project structure.

## Control phrase

**ONE PROJECT → ONE MANAGER → ONE SPECIALIST → ASSIGNED WORKERS → ONE CURRENT STATE → BOUNDED HANDOFFS ONLY → RETURN TO PROJECT LANE.**
