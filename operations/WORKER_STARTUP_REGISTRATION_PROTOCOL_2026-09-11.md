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

**RECEIVE DIRECTIVE → IDENTIFY PROJECT → IDENTIFY REPORTING MANAGER → READ MASTER S.O.P. / MASTER OS GLOSSARY → READ PROJECT/LANE S.O.P. → READ PROJECT WORKBOARD + CURRENT WORKTREE → INSPECT ACTIVE WORKERS → DEFINE ROLE FROM DIRECTIVE → REGISTER SELF → VERIFY ASSIGNED WORK → EXECUTE OR STANDBY**

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

The worker has unfinished assigned work, but execution is stopped because of a timeout, crash, unresolved external result, exhausted safe retries, inaccessible dependency, or another verified stop condition. The Project Worktree must preserve the unfinished task, last verified state, stop reason, next trigger, and any `UNKNOWN` external result. STANDBY never erases the OPEN TASK.

### PLACEMENT REQUIRED

The directive cannot be safely fitted into the existing Project/Lane/S.O.P. structure.

The worker must return:

**PLACEMENT REQUIRED → DIRECTIVE → EXISTING PROJECTS/LANES CHECKED → CONFLICT/UNKNOWN → RETURN TO PARENT MANAGER**

The worker does not solve placement by creating its own hierarchy.

## Automatic stop-state persistence

For a qualifying timeout, repeated safe-retry failure, crash, catastrophic stop, inaccessible dependency, or unresolved external action/result:

**SAFE-SAVE → RECORD LAST VERIFIED STATE → PRESERVE OPEN TASK → MARK UNKNOWN RESULTS WHERE APPLICABLE → SET WORKER `OPEN TASK / STANDBY` → ROUTE/WAIT FOR TRIGGER**

Do not silently convert unfinished work to ordinary STANDBY.

## File Availability Incident rule

All workers must also follow `FILE_AVAILABILITY_INCIDENT_STANDARD_V1_0.md`.

If a required source file is missing, expired, detached, inaccessible, unreadable, corrupted or its controlling version cannot be proven, the worker must not continue from memory or assumption.

Required worker behavior:

**IDENTIFY EXACT SOURCE → PRESERVE AFFECTED TASK → RECORD `FILE SOURCE DEGRADED / UNAVAILABLE / VERSION UNCERTAIN` → NOTIFY REPORTING MANAGER → ROUTE TO MASTER RECON / COMPANY OPERATIONS FOR RECOVERY → CONTINUE UNRELATED SAFE WORK**

The worker may perform a lightweight recovery check in already-authorized Project/Git/connector sources, but may not endlessly retry or quietly replace the missing source with an unrelated file.

Casey is asked to re-upload or re-supply a file only after authorized Project/Git/connector/Library/source-of-origin recovery has failed, or when the source exists only in an owner-controlled location.

A worker startup or `RUN` that discovers an unavailable required file must treat the condition as an operating incident and report it through the normal management path. “File expired” is not an acceptable terminal state by itself.

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

**FIT INTO THE EXISTING OS BEFORE CREATING NEW STRUCTURE.**
