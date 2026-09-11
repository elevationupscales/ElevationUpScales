# Elevation UpScales — Master Worker Registry V1.0

**Version:** 1.0  
**Status:** CONTROLLING REGISTRY STANDARD / LIVE TABLE INITIALIZED

## Purpose

Maintain one lightweight index of who exists, where they belong, current worker state, active Worktree and last meaningful timestamp.

Detailed task state remains inside Project Worktrees.

## Mandatory fields

| Worker | Parent Project | Reporting Manager | Lane | Status | Current Worktree | Last Timestamp |
|---|---|---|---|---|---|---|
| MPM / Operating System Project Manager | Operating System | Casey | Master Management | ACTIVE | Master OS coordination | 2026-09-11 |
| Company Project Manager | Company Project Management | MPM | Project Coordination | ACTIVE | Cross-Project coordination | 2026-09-11 |
| Company Operations Manager | Company Operations | MPM | Operations | ACTIVE | Company Operations execution | 2026-09-11 |
| MASTER RECON OS | Operating System | MPM | OS Integrity / RECON | STANDBY | None assigned in this baseline | 2026-09-11 |
| MASTER DEVELOPER / Deployment Developer | Operating System / Technical Lane | MPM / authorized management | Development / Deployment | STANDBY | None assigned in this baseline | 2026-09-11 |
| Shipping & Logistics Partner Worker | Shipping & Logistics Project | Company Operations Manager | Shipping / Logistics Partners | STANDBY | Shared Shipping & Logistics Worktree | 2026-09-11 |

## Canonical statuses

- `ACTIVE`
- `STANDBY`
- `OPEN TASK / STANDBY`
- `PLACEMENT REQUIRED`
- `CLOSED / RETIRED`

## Registration rule

New workers self-register after completing startup orientation. Self-registration does not enlarge authority.

## Automatic stop-state rule

A qualifying timeout, repeated safe-retry failure, crash, catastrophic stop or unresolved external result automatically changes the worker to `OPEN TASK / STANDBY` while the Project Worktree preserves:

**task → worker → timestamp → completed work → stop reason → last verified state → UNKNOWN actions → retries → resume requirement → next trigger/owner → owner action required yes/no**
