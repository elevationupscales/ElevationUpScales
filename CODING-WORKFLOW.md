# Elevation UpScales — Normal Coding Workflow

Effective: 2026-09-09

This workflow replaces the old web-based management/orchestration style for normal website editing.

## Source of truth
- `main` is the current website source.
- Hard recovery branch: `hardbaseline/2026-09-06-production`.
- Hard baseline commit: `cfc2f8cbe4d89ef40a46fb95d075ee579075a78d`.
- `site/` is the deployable website.
- Old management prompts, handoffs, dated preview workflows, receipts, runbooks, and historical coordination files are reference material only. They do not block current work unless the owner explicitly calls one back into scope.
- The hard baseline is a last-resort regression reference, not the normal production rollback target. Prefer the latest verified successful production SHA and its release receipt when recovering newer work.

## Normal edit flow
1. Start from current `main`.
2. Create one focused work branch for the requested edit.
3. Use the owner's annotations/screenshots/direct instructions as the primary change specification.
4. Check `ANNOTATION-MAP.md` before searching the whole repository.
5. Change only the annotated/requested scope unless a directly related defect must be fixed for the requested change to work.
6. Do not rewrite approved copy, positioning, pricing, product truth, routing, checkout, or protected business logic unless the owner specifically asks for it.
7. During iteration run `npm run qa:fast`.
8. Before preview, merge, or production run `npm run qa` and `git diff --check`.
9. Use the reusable Release Candidate Preview workflow when a browser preview is useful before merge.
10. Review the diff and any requested preview, then merge the approved work to `main`.
11. Re-resolve the full current `main` SHA after merge. That exact SHA becomes the release candidate.
12. Release with **Worker Exact-SHA Release** only: run `preview` for that SHA, verify the successful receipt, then run `production` for the same SHA with the required confirmation.
13. Verify the canonical production smoke result and treat that successful exact SHA as the latest known-good production point.

## Annotation-first editing
Annotations are direct owner instructions. Prefer small targeted patches over broad redesign passes. Do not invent extra copy changes while solving visual/layout issues.

Before editing an annotated element, determine whether it is owned by static HTML or generated/rewritten at runtime. `site/site-shell.js` and `site/home-hero-slides.js` own several browser-visible areas that also appear in page HTML.

## Workflow hygiene
- Do not create a new GitHub Actions workflow for each individual edit.
- Reuse the permanent preview and exact-SHA release workflows.
- Do not load `ELEVATION_4_3_MASTER_STATUS.md`, historical handoffs, receipts, or old management packets for ordinary website edits.
- Temporary diagnostics belong in a work branch and should be removed before merge unless they have durable value.
- Historical release receipts remain audit records, not active gates.
- Do not require old baseline hashes, management packets, or superseded approvals for ordinary edits.
- Gmail is not a coding-management source. Operational state and recovery pointers belong in Git; Gmail may hold emergency recovery snapshots only under the disaster-recovery procedure.

## QA levels
### Fast iteration QA
`npm run qa:fast`

This checks JavaScript syntax, missing local JS/CSS references, duplicate source references, duplicate IDs/headings as warnings, parser-blocking local scripts, and reports the files with the most runtime DOM mutation. It is intended for quick annotation edit loops.

### Full release QA
`npm run qa`

Run the full suite before preview/merge/deployment. The fast QA is included at the start of the full suite.

## Safety rules that remain active
These are permanent safeguards, not management blockers:
- never commit credentials or secret files;
- keep deployable files within Cloudflare Pages limits;
- preserve the hard baseline recovery pointer;
- use a preview for changes with meaningful visual, routing, commerce, or runtime risk;
- keep production deployment explicit;
- never substitute a legacy push deployment for the exact-SHA production gate during normal releases.

## Recovery
If a future change causes a serious regression:
1. identify the exact SHA currently deployed and the latest verified successful production SHA;
2. compare only the affected area first and preserve unrelated newer work;
3. use the latest verified successful production SHA as the normal recovery reference;
4. use `hardbaseline/2026-09-06-production` only as a deeper last-resort reference when the newer accepted lineage cannot recover the defect;
5. after recovery, run the normal exact-SHA preview → production gate again and record the successful production SHA.

If a worker or session stops mid-change, resume from the current Git branch and committed checkpoint. If it stops mid-release, inspect the existing workflow run/receipt before rerunning anything; never assume production completed and never deploy a different SHA to finish an interrupted exact-SHA release.

## Worker exact-SHA release (#68)

Use **Worker Exact-SHA Release** (`worker-release-deploy.yml`) from `main`:

**APPROVED SHA → RUN PREVIEW → VERIFY PASS RECEIPT → RUN PRODUCTION SAME SHA → VERIFY CANONICAL PASS → POST ONE CLOSEOUT RECEIPT**

- Preview inputs: `expected_sha=<approved full current main SHA>`, `target=preview`.
- Wait for that run to finish successfully. Actions writes `elevation/worker-preview` on that SHA only after QA, secrets/artifact checks and exact deployment smoke pass.
- Production inputs: the same `expected_sha`, `target=production`, `production_confirmation=DEPLOY`. Actions verifies the latest preview status and its successful same-SHA workflow run, then checks exact deployment and canonical-domain smoke.
- If `main` advances, review/approve its new SHA and preview again. Both stages check `main` initially and immediately before deployment; deployed bytes always come from the supplied SHA. A concurrent `main` update after the final check cannot change the checked-out deployment bytes.
- Use the Actions summary as the receipt; do not reread passing logs or rerun unchanged deterministic tests manually. On failure read only the failed step. Post one START, one DONE, and one BLOCKED comment only if management action is required.
- Existing `production-deploy` push deployment is a legacy recovery path, not a substitute for this same-SHA gate. It does not establish worker preview evidence and must not be used for normal production releases.
- Both targets reuse the existing production environment for credentials/approvals; preview deploys only to `worker-exact-preview`. The shared production concurrency group serializes release runs with legacy production runs.
- Keep protected information out of Git.
