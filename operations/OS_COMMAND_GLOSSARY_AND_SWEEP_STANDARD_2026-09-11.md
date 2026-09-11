# Elevation UpScales — OS Command Glossary & Sweep Standard

**Owner:** Casey Young  
**Effective:** 2026-09-11  
**Status:** ACTIVE / V1.0-ALIGNED SUBORDINATE STANDARD

**Controlling authority:** `MASTER_SOP_V1_0.md` + `MASTER_OS_GLOSSARY_V1_0.md`. This file remains the detailed command/SWEEP implementation standard beneath those controls.

## Purpose

Standardize short Operating System commands so every manager, specialist, RECON worker and project worker interprets the same command the same way.

Each command is defined by both a **Short Definition** and an **OS Function**.

---

## ANALYZE

**Short Definition:** Understand something.

**OS Function:** Examine information, explain what it means, identify patterns, risks, options, causes or implications. `ANALYZE` is interpretive by default and does not authorize changes unless another instruction does.

**Control phrase:** **ANALYZE = THINK ABOUT IT.**

---

## AUDIT

**Short Definition:** Check something against an expected standard.

**OS Function:** Inspect the named Scope and identify what is correct, missing, broken, inconsistent, stale or noncompliant. Produce evidence-backed findings.

**Default authority:** Report-only unless the command explicitly adds correction authority, such as `AUDIT + FIX`.

**Control phrase:** **AUDIT = TEST IT.**

---

## SCOUT

**Short Definition:** Reconnaissance — discover the current situation.

**OS Function:** Gather the current facts needed before the OS decides what is true or what should happen next. Inspect applicable Git state, Workboards, Worktrees, Project records, timestamps, active workers, files, correspondence or live platform state as authorized.

**Default authority:** Discovery only; no correction by default.

**Control phrase:** **SCOUT = FIND WHAT IS THERE.**

---

## SYNC

**Short Definition:** Reconciliation — align records to verified reality.

**OS Function:** Compare known/current evidence, resolve stale or conflicting records, and bring the applicable OS state into alignment with the verified truth. Correct objective state within established authority. If direct correction is unavailable or unsafe, leave a timestamped RECON NOTE in the affected Worker/Project Workflow or Worktree.

**Control phrase:** **SYNC = MAKE THE OS AGREE WITH REALITY.**

---

## RECON

**Short Definition:** Complete reconnaissance + reconciliation cycle.

**OS Function:** Discover the current state, compare sources, determine verified truth, reconcile objective state where authorized, annotate/reroute what cannot be corrected, and record the material delta.

Standard sequence:

**SCOUT → COMPARE → SYNC → RECORD**

A normal `RECON` should:

1. discover current state;
2. compare authoritative sources and timestamps;
3. identify stale, duplicate, conflicting, missing or incorrectly recorded state;
4. determine verified truth under the applicable source hierarchy;
5. correct objective state when safe and authorized;
6. leave a timestamped RECON NOTE when correction cannot be made directly;
7. report what changed, what remains OPEN and what requires another lane.

**RECON is stronger than AUDIT.** An Audit may end with findings. RECON should leave the controlled state aligned where possible and routed where not possible.

---

## SWEEP

**Short Definition:** Perform a full operating pass across the named Scope.

**OS Function:** Traverse the entire assigned Project, Lane, Worktree, Git area, website/code Scope, vendor system or other named operating area and perform the applicable discovery, checking, analysis and reconciliation functions until the pass is complete.

Standard sequence:

**SCOUT → AUDIT → ANALYZE WHERE NEEDED → SYNC OBJECTIVE STATE → LEAVE RECON NOTES FOR UNCORRECTABLE ITEMS → RECORD DELTA → CONTINUE THROUGH ENTIRE SCOPE**

A SWEEP must not stop after the first issue unless a genuine safety/authority gate prevents continuing the entire assigned Scope.

A SWEEP does not silently:

- expand Scope;
- redesign the OS;
- take ownership from another worker;
- create unnecessary files;
- bypass genuine owner/legal/compliance/payment/channel gates.

**Control phrase:** **SWEEP = COMPLETE THE FULL CONTROLLED PASS.**

---

## Command relationship

- `SCOUT` = discover.
- `AUDIT` = check/test.
- `ANALYZE` = understand.
- `SYNC` = reconcile/correct state.
- `RECON` = targeted discovery + reconciliation cycle.
- `SWEEP` = run the applicable control cycle across the entire stated Scope.

The individual terms may be used for precise calls to RECON/repository/project workers. `SWEEP` means the broader combined pass.

## Scope naming

Commands should name their boundary whenever practical:

- `SCOUT VEVOR`
- `AUDIT SHIPPING & LOGISTICS`
- `ANALYZE WARRANTY CONFLICT`
- `SYNC CURRENT_WORKTREE`
- `RECON RENOGY`
- `RECON GIT`
- `SWEEP WEBSITE — CODE ONLY`
- `SWEEP PROJECT`

The named boundary controls the work. A command does not authorize unrelated project takeover.

## RECON NOTE standard

When RECON/SYNC cannot make a required correction remotely, record the finding in the nearest controlling execution record.

Routing:

- worker-specific issue → Worker Worktree/Workflow;
- project-wide or multi-worker issue → Project Workflow / CURRENT_WORKTREE;
- cross-project/system issue → management coordination / Master Workboard path.

Minimum RECON NOTE:

**RECON FINDING → CURRENT INCORRECT/STALE STATE → VERIFIED CORRECT STATE → SOURCE/EVIDENCE → REQUIRED CORRECTION → AFFECTED WORKER/MANAGER → TIMESTAMP**

The responsible worker/manager should encounter and resolve that note on the next applicable `RUN`.

## Git protection function of RECON

RECON exists in part to keep Git from becoming overloaded, duplicated, stale, or incorrectly updated by managers/workers.

RECON protects durable operating truth; it does not become the owner of every task it inspects.

**CORRECT WHEN SAFE AND AUTHORIZED → ANNOTATE AND ROUTE WHEN DIRECT CORRECTION IS NOT AVAILABLE.**
