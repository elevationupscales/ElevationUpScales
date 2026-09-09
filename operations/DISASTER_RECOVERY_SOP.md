# Elevation UpScales — Disaster Recovery & Work Continuity SOP

**Status: ACTIVE WHEN MERGED**  
**Owner: Casey Young**  
**Primary source of truth: GitHub**

## Purpose

This SOP defines how Elevation recovers management and deployment state after a worker/session crash, interrupted deployment, accidental deletion, or temporary loss of GitHub access without turning Gmail back into a second management system.

The design principle is:

**GIT RUNS THE BUSINESS. GMAIL CAN HELP RECOVER THE LAST KNOWN STATE.**

Gmail recovery material is cold backup/archive material only. It does not compete with Git, it does not control normal work, and it must not become a parallel task queue.

## Normal operating mode

When GitHub is available and internally consistent:

1. use Casey's newest explicit instruction;
2. use current `/operations/` files for management state;
3. use current `main` and the active work branch for source/code state;
4. use GitHub Actions receipts for release state;
5. use Gmail only for actual external business correspondence;
6. do **not** read Gmail recovery snapshots, old management drafts, management feeds, or recovery emails to determine current work.

A verified fact received through ordinary business email becomes management state only after its public-safe result is reconciled into Git `/operations/`.

## Recovery mode — when it is allowed

Recovery mode may be entered only when one of these conditions is true:

- GitHub is temporarily unavailable;
- a required repository branch/commit/state cannot be resolved normally;
- a worker/session terminated mid-change and the active Git checkpoint is unclear;
- a release stopped or lost its interactive worker before the final production state was reported;
- current Git state appears damaged or materially inconsistent and the latest known-good state must be reconstructed.

Do not enter recovery mode merely because a worker wants more context.

## Required Git checkpoint discipline

### During ordinary work

Make meaningful work recoverable through commits on the focused work branch. Do not leave a large multi-step change dependent only on chat memory or an uncommitted worker filesystem.

A worker handoff or checkpoint should identify at minimum:

- repository;
- base `main` SHA used to start the work;
- branch name;
- current branch HEAD SHA;
- changed scope/files;
- completed QA;
- current blocker, if any;
- exact next action;
- merge/deployment state.

### Before production release

Normal production release uses the Worker Exact-SHA gate. The recovery-critical identity is the **full approved `main` SHA**.

After same-SHA preview passes and before production is dispatched, the release state is:

`PREVIEW VERIFIED / PRODUCTION NOT YET CONFIRMED`

After production finishes and canonical smoke passes, the release state is:

`PRODUCTION VERIFIED / ACCEPTED SHA`

Never infer that production completed merely because a worker disappeared after starting the workflow.

## Gmail disaster-recovery snapshot

Gmail may hold a compact recovery snapshot at major continuity points. This is the only management-state backup role Gmail should serve.

Recommended subject format:

`[ELEVATION DR] <STATE> | <YYYY-MM-DD> | <short SHA>`

Recommended Gmail label:

`Elevation/Disaster-Recovery`

The recovery snapshot should contain only public-safe operational metadata:

- repository name;
- exact `main` SHA at checkpoint time;
- active work branch and branch HEAD, if work is in progress;
- release state;
- preview/production workflow run reference when available;
- last verified canonical production SHA;
- concise changed scope;
- current blockers;
- exact next action;
- rollback/recovery reference;
- pointer to the controlling Git operations file(s).

Do **not** place the following in a recovery email:

- credentials, tokens or secrets;
- customer PII;
- dealer/wholesale costs;
- private supplier rate sheets or freight quotes;
- raw supplier correspondence;
- non-public compliance packets;
- protected payment information.

## When a Gmail recovery snapshot is useful

Keep snapshots sparse. A snapshot is justified at these control points:

1. **Accepted production baseline** — after an exact-SHA production release and canonical verification.
2. **Pre-production checkpoint** — after same-SHA preview has passed and immediately before an important production release when losing the worker/session would make release state difficult to reconstruct.
3. **Long-running work checkpoint** — only when substantial branch work is committed but cannot yet be completed and a continuity copy materially reduces recovery risk.
4. **Emergency recovery closeout** — after Git state has been restored from an incident.

Do not email a recovery snapshot after every minor edit, status change, supplier reply, or ordinary management action.

Failure to create or send a Gmail recovery snapshot is a backup degradation, not a reason to disable checkout, stop ordinary ecommerce, or bypass/abort an otherwise valid Git release. Git remains primary.

## Recovering an interrupted worker

When a worker/session disappears mid-change:

1. resolve current `main`;
2. inspect the named work branch and its HEAD;
3. inspect branch commits/diff and existing QA evidence;
4. continue only from committed Git state;
5. use a Gmail recovery snapshot only if Git does not clearly identify the last intended checkpoint or Git access is unavailable;
6. never replay an unverified email instruction over newer Git state;
7. after recovery, reconcile the resulting current state back into Git.

If uncommitted local work was lost and no committed checkpoint exists, treat it as lost work and recreate it from the newest owner instruction/current source rather than guessing from stale management email.

## Recovering an interrupted deployment

If a worker/session disappears after preview or production dispatch:

1. do not immediately rerun the deployment;
2. inspect the existing Worker Exact-SHA workflow run/receipt for the approved SHA;
3. determine whether the run failed before deploy, deployed preview, deployed production, or completed canonical smoke;
4. if production is not proven successful, keep the release state unverified until the workflow result/canonical site establishes the truth;
5. if a retry is required, use the same approved SHA only while it is still the reviewed current `main`; otherwise review the new `main` SHA and restart preview;
6. record the successful production SHA after canonical verification.

A Gmail recovery snapshot can identify which SHA and state to inspect, but it cannot override the GitHub Actions result.

## Temporary loss of GitHub access

If GitHub cannot be reached:

- stop source mutations that would create competing truth;
- keep the live customer website and checkout operating unless a separate actual production defect requires intervention;
- use the latest Gmail DR snapshot only to identify the last known branch/SHA/release state and open obligations;
- preserve any already-available local repository clone/worktree without rewriting history;
- continue external customer/supplier communication only when necessary and clearly record facts that must later be reconciled;
- when GitHub returns, re-resolve `main`, compare it with the recovery snapshot, reconcile any legitimate offline facts, and return to normal mode.

Gmail is not a complete replacement for the repository. For true provider-loss resilience, maintain a local Git clone or separate repository backup in addition to the Gmail recovery index. Do not rely on one email attachment as the only copy of the codebase.

## Recovery hierarchy

Use this order when reconstructing state:

1. current Git repository and branch/commit history;
2. GitHub Actions workflow/production receipts;
3. current local committed clone/worktree, when available;
4. latest Gmail disaster-recovery snapshot;
5. historical coordination evidence only when still required to reconstruct a missing fact.

As soon as Git is healthy again, Git becomes authoritative immediately.

## Supersession and cleanup

Recovery snapshots do not need to be deleted when superseded. They may remain as cold audit/recovery records.

However:

- never update a normal management process by editing an old Gmail recovery email/draft;
- never maintain duplicate live statuses in Gmail;
- never use Gmail drafts as rolling handoffs;
- never require workers to inspect Gmail DR material during normal takeover;
- mark or label obsolete recovery copies as superseded if needed for clarity.

## Recovery success criteria

An incident is closed when:

- current `main` and the relevant work branch are resolved;
- production status is known rather than assumed;
- the latest verified successful production SHA is known;
- any recovered management facts are reconciled into `/operations/`;
- no duplicate deployment or duplicate external action was created during recovery;
- normal Git-first operating mode has resumed.
