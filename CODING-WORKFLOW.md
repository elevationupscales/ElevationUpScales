# Elevation UpScales — Normal Coding Workflow

Effective: 2026-09-06

This workflow replaces the old web-based management/orchestration style for normal website editing.

## Source of truth
- `main` is the current website source.
- Hard recovery branch: `hardbaseline/2026-09-06-production`.
- Hard baseline commit: `cfc2f8cbe4d89ef40a46fb95d075ee579075a78d`.
- Old management prompts, handoffs, dated preview workflows, and historical coordination files are reference material only. They do not block current work unless the owner explicitly calls one back into scope.

## Normal edit flow
1. Start from current `main`.
2. Create one focused work branch for the requested edit.
3. Use the owner's annotations/screenshots/direct instructions as the primary change specification.
4. Change only the annotated/requested scope unless a directly related defect must be fixed for the requested change to work.
5. Do not rewrite approved copy, positioning, pricing, product truth, routing, checkout, or protected business logic unless the owner specifically asks for it.
6. Run `npm run qa` and `git diff --check`.
7. Use the Release Candidate Preview workflow when a browser preview is useful.
8. Review the diff and preview.
9. Merge to `main` only after the requested change is correct.
10. Deploy `main` with the standard Deploy Elevation UpScales workflow.

## Annotation-first editing
Annotations are treated as direct owner instructions. Prefer small targeted patches over broad redesign passes. Do not invent extra copy changes while solving visual/layout issues.

## Workflow hygiene
- Do not create a new GitHub Actions workflow for each individual edit.
- Reuse the permanent preview and deploy workflows.
- Temporary diagnostics belong in a work branch and should be removed before merge unless they have durable value.
- Historical release receipts remain audit records, not active gates.
- Do not require old baseline hashes, management packets, or superseded approvals for ordinary edits.

## Safety rules that remain active
These are not blockers; they are permanent safeguards:
- never commit credentials or secret files;
- keep deployable files within Cloudflare Pages limits;
- run committed-source QA before preview/deploy;
- preserve the hard baseline recovery pointer;
- use a preview for changes with meaningful visual, routing, commerce, or runtime risk;
- keep production deployment explicit.

## Recovery
If a future change causes a serious regression, compare against `hardbaseline/2026-09-06-production` first. Restore only the affected area when possible instead of rolling back unrelated newer work.
