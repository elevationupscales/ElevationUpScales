# Elevation UpScales — Owner Project Workflow Directive

**Owner:** Casey Young  
**Effective:** 2026-09-10  
**Status:** ACTIVE / OWNER DIRECTION  
**Applies to:** Dedicated Elevation project lanes

## Verbatim owner direction

> “These workers need to work in a unified manner staying in each assigned project lane each project has a project manager and specialist so far”

> “Each project needs a tailored work flow as well the project operations manager can take on”

> “Save my entire request this one and last read, then run that all”

> “Update workflows with this next flow ensure work trees get picked up and not left behind and work is being documented and only necessary gates applied once we reach a point where we’re comfortable”

> “Ensure every vendor and project manager has an accessible project source file in the work board with all elevation upscales onboarding data required to build them into an active elevation vendor”

> “Also ensure * finish all interrupted work trees : run”

## Controlling interpretation

This directive extends the existing project-lane containment standard. It does not reopen completed project setup and does not create a second global work board.

Every dedicated project must have its own **tailored operating workflow** built from the verified facts, supplier/platform rules, project outcomes, real gates, and current state of that project.

Every tailored workflow must also preserve unfinished work across workers/chats/interruptions, document material progress durably, and progressively reduce redundant internal gates after repeatable proof makes the project comfortable enough for controlled/exceptions-based operation.

Every dedicated vendor project must also maintain one accessible public-safe **Project Source** linked from `CURRENT_WORK_BOARD.md` and conforming to `VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md`.

The required project structure is:

**CASEY / OWNER**  
↓  
**OS PROJECT MANAGER / COMPANY OPERATIONS ROUTING**  
↓  
**DEDICATED PROJECT OPERATIONS MANAGER**  
├── **DEDICATED PROJECT SPECIALIST**  
└── **ASSIGNED PROJECT WORKERS / BOUNDED SHARED HANDOFFS**

The controlling continuity/maturity extension is:

`PROJECT_WORKTREE_CONTINUITY_AND_GATE_MATURITY_STANDARD_2026-09-10.md`

The controlling vendor-source extension is:

`VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md`

## Project Operations Manager execution authority

A dedicated Project Operations Manager is not limited to routing work. Inside the manager's assigned project lane, the manager may directly perform routine, already-authorized, safe execution when that is the fastest clean path and a separate worker is unnecessary.

Direct manager execution may include, when already authorized by the project SOP/workflow:

- source intake and organization;
- routine supplier/platform/account verification;
- public-safe project record maintenance;
- routine project correspondence when already authorized;
- routine catalog/operating preparation that does not require a different protected specialist capability;
- status reconciliation and receipts;
- ordinary in-scope follow-through needed to advance the next project step.

The Project Operations Manager must still use the Project Specialist for dedicated verification/reconciliation/domain-depth work when specialist review materially improves accuracy, independence, safety, or speed. The manager may not use direct execution to erase the specialist role or bypass a real control.

The Project Operations Manager may not:

- jump into another project without authorized cross-project routing;
- make owner-level commercial/legal commitments;
- invent supplier/platform facts, MAP, inventory, authorization, pricing, compliance, shipment dimensions, or customer state;
- bypass a required bounded specialist/developer/fulfillment handoff merely for convenience;
- treat the global work board as a personal company-wide task list.

## Tailored workflow requirement

Each dedicated project workflow must define at minimum:

1. project purpose and intended operating result;
2. current verified starting state;
3. Project Operations Manager responsibilities and direct-execution lane;
4. Project Specialist responsibilities;
5. assigned/shared worker handoff rules;
6. required source inputs and source-of-truth hierarchy;
7. exact project operating sequence;
8. project-specific verification gates;
9. waiting behavior and independent work allowed while waiting;
10. owner gates;
11. close/proof conditions;
12. project return format and next-action behavior;
13. project startup/takeover worktree pickup sequence;
14. durable worktree documentation requirements;
15. Stage 1 PROVING, Stage 2 CONTROLLED and Stage 3 MATURE/EXCEPTION-BASED operating expectations;
16. permanent hard gates, removable internal/launch gates and regression/reopen triggers;
17. for a dedicated vendor project, the Project Source record and onboarding-readiness fields required to build the supplier into an active repeatable Elevation vendor.

Generic company SOP language does not replace the tailored project workflow.

## Worktree continuity direction

Project work must not disappear when:

- a chat ends;
- a worker or manager changes;
- a worker fails;
- a new owner command interrupts;
- priorities move;
- a branch/PR changes;
- one project sub-item enters WAITING/HOLD.

The Project Operations Manager is responsible for picking the project back up from its last durable verified state.

Use:

**RESOLVE CURRENT PROJECT STATE → IDENTIFY LAST VERIFIED ACTION → IDENTIFY NEXT ACTION → RESUME UNFINISHED WORK → DOCUMENT MATERIAL DELTA → CONTINUE**

Do not recreate completed setup merely because the prior execution session is unavailable.

When a new Owner command interrupts an unfinished in-project worktree:

**PRESERVE PRIOR WORKTREE → EXECUTE NEW OWNER DIRECTION → RECORD RESULT → RETURN TO PRIOR OPEN WORKTREE**

unless Casey explicitly supersedes or retires the older item.

## Documentation direction

Work must be documented enough that another authorized manager/worker can resume without reconstructing the entire project from chats.

Document material state changes in the existing owning project/SOP/work-board record.

Material means changes such as:

- started/completed/waiting/blocked/verified work;
- changed owner or execution lane;
- supplier/platform/customer/order/commercial state changes;
- real gate changes;
- source package arrival;
- bounded handoff result;
- project proof/maturity changes.

Do not create unnecessary management noise for routine micro-actions that do not change project state.

Protected commercial/customer/supplier information remains outside public Git; public records may reference verified status without exposing protected details.

## Vendor Project Source direction

Every dedicated vendor project/Project Operations Manager must have an accessible Project Source linked from the canonical work board.

The Project Source must contain or reference the public-safe Elevation onboarding data required to operate vendor onboarding, including:

- legal entity/company identity;
- owner and website;
- protected formation/EIN/W-9/resale/tax-document availability;
- preferred order-driven/dropship operating model;
- channel model;
- current supplier/account status;
- exact catalog/SKU source status;
- MAP/pricing/channel state;
- inventory/sellability source;
- fulfillment/order/tracking path;
- tax/resale treatment;
- warranty/returns/RMA route;
- media/spec/compliance source status;
- protected payment/account setup status;
- missing vendor inputs;
- activation/first-order proof status;
- current maturity stage and next action.

Protected identifiers and private commercial evidence remain outside public Git.

A prospect that has not yet become a dedicated vendor project may remain only in the supplier map. Once a dedicated project/manager exists, a Project Source is mandatory.

The Project Source checklist is not a blanket gate. Missing information blocks only the action that actually requires it.

## Gate maturity direction

The system should become easier to operate as real proof accumulates.

Use:

**PROVING → CONTROLLED → MATURE / EXCEPTION-BASED**

### PROVING

For new/materially changed paths, require the first necessary verification and end-to-end proofs.

### CONTROLLED

After repeatable successful proof, routine already-authorized work should execute without repeating launch/setup approvals. Verification becomes focused on the changed/risky element.

### MATURE / EXCEPTION-BASED

When the project is comfortable and repeatable, normal in-scope work proceeds by default and management attention shifts to exceptions, thresholds, changed facts, failures and material deltas.

Maturity does **not** remove genuine controls.

Permanent hard gates continue for customer money/payment integrity, legal/compliance, supplier/channel authority, MAP/binding pricing rules, lithium/DG/freight safety, binding commercial commitments/major financial exposure, genuinely destructive actions, required exact-SHA release controls, and unsupported external claims.

Once an internal launch/review gate no longer materially protects the business, remove or narrow it rather than carrying it forever.

If a mature process fails:

**REOPEN THE NARROW FAILED CONTROL — DO NOT REOPEN THE WHOLE PROJECT WITHOUT EVIDENCE.**

## Unified behavior

**PROJECT MANAGER OWNS THE WORKTREE → PICK UP LAST VERIFIED STATE → READ PROJECT SOURCE WHEN VENDOR → MANAGER EXECUTES ROUTINE IN-SCOPE WORK OR ROUTES BOUNDED TASKS → SPECIALIST VERIFIES/RECONCILES → WORKERS EXECUTE ASSIGNED SUBTASKS → MANAGER DOCUMENTS MATERIAL DELTA/CLOSES → CONTINUE NEXT UNRESOLVED PROJECT ITEM**

If one project sub-item is waiting, continue another safe sub-item inside the same project. If no project work is executable, record WAITING/HOLD/OWNER GATE and return capacity upward. Do not self-assign another project's work.

## RUN

Inside a named dedicated project:

**RESOLVE PROJECT → GIT FIRST → PICK UP UNFINISHED PROJECT WORKTREE → READ PROJECT SOURCE WHEN VENDOR → PROJECT OPERATIONS MANAGER EXECUTES OR ROUTES THE NEXT SAFE PROJECT ACTION → SPECIALIST/WORKERS COMPLETE BOUNDED SUBTASKS → RECORD MATERIAL STATE → CONTINUE SAME PROJECT**

Do not wait for repeated `next` commands when the next safe in-project action is clear and already authorized.

This directive is owner authorization to implement the tailored-workflow, worktree-continuity, documentation, vendor-source and gate-maturity architecture across current dedicated projects using verified current Git state, and to finish interrupted control-plane worktrees rather than abandoning them for new parallel structures.
