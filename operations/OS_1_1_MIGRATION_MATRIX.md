# ELEVATION UPSCALES — OS 1.1 MIGRATION MATRIX

**Purpose:** reconcile the accepted OS 1.0 operating system into the OS 1.1 state/scope model without reopening completed architecture.

| Area | 1.0 Source | 1.1 Treatment | State |
|---|---|---|---|
| Master authority | `MASTER_SOP_V1_0.md` | Preserve as non-regression foundation | PRESERVED |
| Glossary | `MASTER_OS_GLOSSARY_V1_0.md` | Preserve; extend only when new 1.1 terms require it | PRESERVED |
| Worker registry | `MASTER_WORKER_REGISTRY_V1_0.md` | Preserve; add Integration Worker through 1.1 addendum | EXTEND |
| Company live state | `CURRENT_WORK_BOARD.md` | Promote as master current-state index | PRESERVED / CLARIFIED |
| Project workboards | Existing manager/project files | Permit as execution views subordinate to master board | STANDARDIZED |
| Scopes | Existing project/workstream boundaries | Standardize objective, authority, dependencies, gates, closure | STANDARDIZED |
| Worktrees | Existing ordered task files | Standardize as next-action execution lists, not policy | STANDARDIZED |
| Evidence | Email, vendor docs, screenshots, tests, receipts | Preserve as factual evidence only unless authority records a state change | CLARIFIED |
| Terminal work | Existing completed/accepted/sold/cancelled records | Protect from stale reactivation | HARDENED |
| Incidents/freezes | 1.0 bounded-routing rules | Preserve; hold only affected lane | PRESERVED |
| `RUN` behavior | Existing execution loop | Normalize across workers: verify, fix, complete, hold blocker, continue | STANDARDIZED |
| GitHub recovery | Existing Git-first model | Reinforce: current accepted repo state over chat memory | HARDENED |

## ACTIVE INTEGRATION CHECKS

For each current manager/workstream:

1. Confirm one recognized reporting manager.
2. Confirm the current task/state from the master Work Board.
3. Check for stale handoffs or duplicate workers.
4. Confirm or create one bounded Scope where useful.
5. Confirm the Worktree contains only current executable work.
6. Preserve terminal items; do not reopen them from historical prompts.
7. Hold external blockers locally and continue unrelated work.
8. Record any state-changing result back to the master Work Board.

## MIGRATION COMPLETE WHEN

- every active lane can identify its policy, live state, scope, next action, and evidence;
- project workboards do not compete with the master Work Board;
- no stale pointer reopens terminal work;
- duplicate workers are routed back to the recognized manager;
- a new worker can recover the operating state from GitHub without relying on chat history.
