# Elevation UpScales — Git-First Drift Correction — 2026-09-23

**Owner:** Casey Young  
**Scope:** Current Operating System management worker / Peter onboarding work  
**State:** CORRECTED  
**Repository:** `elevationupscales/ElevationUpScales`

## Finding

The current management worker was observed relying too heavily on conversation context before re-resolving accepted Git control.

During verification, current `main` showed that the accepted operating baseline is not V1.0 alone. The repository contains:

- `operations/MASTER_SOP_V1_0.md` — non-regression foundation;
- `operations/MASTER_SOP_V1_1.md` — accepted additive integration control;
- `operations/OS_1_1_EXECUTION_HANDOFF_SOP.md` — accepted Git-first startup/RUN/handoff control;
- `operations/CURRENT_WORK_BOARD.md` — canonical current company state.

The drift caused newly created Peter onboarding files to reference V1.0 as if it were the full current parent control.

## Existing policy

No new Master SOP policy was required.

The accepted OS 1.1 execution control already requires:

**RE-RESOLVE CURRENT `main` → READ RELEVANT ACCEPTED CONTROL FILES → COMPARE TO CURRENT LANE STATE → EXECUTE OR RECONCILE.**

It also states:

**RECOVER FROM GITHUB, NOT CHAT.**

Therefore this incident is classified as **worker compliance drift**, not missing policy.

## Corrections applied

- Operations README now exposes the OS 1.1 composite master/execution control set.
- Peter Git collaboration workflow now reads V1.0 + V1.1 + OS 1.1 execution control.
- Peter Manager Index startup now reads the accepted OS 1.1 controls.
- ELEVATION OS 2.0 Peter package plan now includes the accepted V1.1 control set, not V1.0 alone.
- Git-first preflight remains a hard requirement before substantive Git-aware work.

## Current worker rule

For this management worker:

**OWNER MESSAGE → RE-RESOLVE CURRENT `main` WHEN THE REQUEST DEPENDS ON OS/PROJECT/REPO STATE → READ THE MINIMUM RELEVANT ACCEPTED CONTROL → ACT.**

Do not perform broad Git ceremony for generic conversation or unrelated tasks. Do not substitute chat memory for Git when current OS/project state materially affects the answer or action.

## Verification rule

A Git-aware substantive action should be able to state internally:

**GIT CHECK → CURRENT MAIN → CONTROLS READ → CURRENT LANE/WORKTREE → ACTION.**

If Git cannot be resolved, Git-dependent work stops rather than silently falling back to stale memory.

## Control statement

**THE FAILURE WAS COMPLIANCE DRIFT, NOT ABSENT POLICY. CURRENT GIT CONTROLS CURRENT STATE. RECOVER FROM GITHUB, NOT CHAT.**
