# Elevation UpScales — New Worker Startup & Registration Protocol

**Owner:** Casey Young  
**Effective:** 2026-09-11  
**Status:** ACTIVE / V1.0-ALIGNED SUBORDINATE STANDARD

**Controlling authority:** `MASTER_SOP_V1_0.md` + `MASTER_OS_GLOSSARY_V1_0.md`. This protocol implements the worker startup/registration rules beneath those controls.

## Purpose

Ensure every newly created worker fits into the existing Elevation Operating System before executing work or creating structure.

## Default creation rule

**PROJECT FIRST → WORKER SECOND**

The Project defines the worker's home. The Worker Prompt defines the worker's bounded role inside that home.

A worker created inside an existing Project must not invent a new Project, management hierarchy, S.O.P., Workboard, or competing Worktree because its Prompt is broad.

## Mandatory startup sequence

When a new worker first starts work:

**RECEIVE DIRECTIVE → IDENTIFY PROJECT → IDENTIFY REPORTING MANAGER → READ MASTER S.O.P. / MASTER OS GLOSSARY → READ PROJECT/LANE S.O.P. → READ PROJECT WORKBOARD + CURRENT_WORKTREE → INSPECT ACTIVE WORKERS → DEFINE ROLE FROM DIRECTIVE → REGISTER SELF → VERIFY ASSIGNED WORK → EXECUTE OR STANDBY**

## Streamline Mode inheritance

When Casey or management activates `STREAMLINE` / `STREAMLINE MODE`, workers do not create a second workflow system.

They inherit:

- `STREAMLINE_MODE_MASTER_WORKFLOW_2026-09-11.md` for the short execution loop;
- `MANAGEMENT_COMMUNICATION_AND_FILE_RECOVERY_WORKFLOW_2026-09-11.md` for management-channel and source-recovery behavior;
- `REVENUE_ENGINE_COORDINATION_WORKFLOW_2026-09-11.md` when the worker touches commerce/revenue;
- `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md` when a direct-site product/order/promotion decision depends on economics;
- the worker's existing Project Source / Lane S.O.P. / CURRENT_WORKTREE for lane-specific authority.

Streamline Mode means:

**USE EXISTING STRUCTURE → HOLD ONLY THE BLOCKED ITEM → REMOVE AVOIDABLE FRICTION → KEEP AUTHORIZED WORK MOVING.**

It does not enlarge worker authority or erase protected gates.

## Required startup registration

The worker must establish:

- Worker Name / Function;
- Parent Project;
- Reporting Manager;
- Scope derived from the directive;
- Assigned Lane / Worktree;
- Allowed Actions;
- Prohibited / out-of-lane actions;
- Handoff and return path;
- Current assigned task, if any;
- Startup timestamp;
- Worker State: `ACTIVE`, `STANDBY`, `OPEN TASK / STANDBY`, or `PLACEMENT REQUIRED`.

## Worker states

### ACTIVE

The worker has an authorized executable Worktree and is currently processing it.

### STANDBY

The worker has completed startup/registration but has no current executable assignment. It waits for `RUN`, an assigned Worktree, or a new authorized directive.

### OPEN TASK / STANDBY

The worker has unfinished assigned work, but execution is stopped because of a timeout, crash, unresolved external result, exhausted safe retries, inaccessible dependency, missing required source file, or another verified stop condition. The Project Worktree must preserve the unfinished task, last verified state, stop reason, next trigger, and any `UNKNOWN` external result. STANDBY never erases the OPEN TASK.

### PLACEMENT REQUIRED

The directive cannot be safely fitted into the existing Project/Lane/S.O.P. structure.

The worker must return:

**PLACEMENT REQUIRED → DIRECTIVE → EXISTING PROJECTS/LANES CHECKED → CONFLICT/UNKNOWN → RETURN TO PARENT MANAGER**

The worker does not solve placement by creating its own hierarchy.

## File availability incident rule

A missing, expired, inaccessible, corrupt or wrong-version source file is an Operating System incident, not a reason to guess or silently substitute another source.

Worker flow:

**DETECT FILE/SOURCE PROBLEM → RECORD EXACT FILE/SOURCE + TASK IMPACT → REPORT TO MANAGER → ROUTE RECOVERY TO PROJECT RECON / MASTER RECON / COMPANY OPERATIONS AS APPROPRIATE → PRESERVE AFFECTED TASK OPEN → CONTINUE UNRELATED CLEAN WORK → RESUME AFTER VERIFIED RECOVERY**

Use:

- `FILE_AVAILABILITY_INCIDENT_STANDARD_2026-09-11.md`
- `MANAGEMENT_COMMUNICATION_AND_FILE_RECOVERY_WORKFLOW_2026-09-11.md`

The worker must not ask Casey to re-upload a file before authorized existing recovery paths have been checked when the Operating System can perform that recovery itself.

## Management communication rule

Current internal manager instructions, priorities, handoffs and operating state are controlled through Git / Master Workboard / Master Management Coordination / Project Worktrees.

Gmail is not the current management-command source of truth.

The active company Gmail may still be used for external correspondence and for recovering original supplier/customer/logistics attachments and factual evidence under `GMAIL_EMAIL_NETWORK_SOP_V1_0.md`.

## Automatic stop-state persistence

For a qualifying timeout, repeated safe-retry failure, crash, catastrophic stop, inaccessible dependency, source-file incident that blocks the exact task, or unresolved external action/result:

**SAFE-SAVE → RECORD LAST VERIFIED STATE → PRESERVE OPEN TASK → MARK UNKNOWN RESULTS WHERE APPLICABLE → SET WORKER `OPEN TASK / STANDBY` WHEN NO OTHER ASSIGNED WORK IS EXECUTABLE → ROUTE/WAIT FOR TRIGGER**

If other assigned work is still executable, hold only the blocked item and continue rather than putting the entire worker/project on standby.

Do not silently convert unfinished work to ordinary STANDBY.

## Standard OS Context Header

Every new worker prompt must begin with a compact header using canonical OS terms:

- **OS ROLE**
- **PARENT PROJECT**
- **REPORTS TO**
- **SCOPE**
- **WORKTREE**
- **CONTROLLING S.O.P./GLOSSARY REFERENCES**
- **STARTUP**
- **AUTHORITY BOUNDARY / DO NOT**
- **RETURN PATH**

Prompt-size management is mandatory. Include the short definitions needed for the worker to orient quickly, then point to the MASTER OS GLOSSARY and controlling S.O.P.s for the full OS Function definitions instead of copying large S.O.P.s into every prompt.

## OS vocabulary rule

Prompts, Workflows, Worktrees, handoffs, and management notes must use established OS terminology consistently. Do not rename established terms casually or reduce them to generic synonyms that change their function.

Every major term/lane should preserve:

1. **Short Definition** — what it is;
2. **OS Function** — what it does for the Operating System;
3. **Authority Boundary** where needed — what it must not take over.

## Startup control phrase

**FIT INTO THE EXISTING OS BEFORE CREATING NEW STRUCTURE → HOLD ONLY THE BLOCKED ITEM → KEEP AUTHORIZED WORK MOVING.**