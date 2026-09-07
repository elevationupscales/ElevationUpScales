# Elevation UpScales — Normal Coding Workflow

Effective: 2026-09-06

This workflow replaces the old web-based management/orchestration style for normal website editing.

## Source of truth
- `main` is the current website source.
- Hard recovery branch: `hardbaseline/2026-09-06-production`.
- Hard baseline commit: `cfc2f8cbe4d89ef40a46fb95d075ee579075a78d`.
- `site/` is the deployable website.
- Old management prompts, handoffs, dated preview workflows, receipts, runbooks, and historical coordination files are reference material only. They do not block current work unless the owner explicitly calls one back into scope.

## Normal edit flow
1. Start from current `main`.
2. Create one focused work branch for the requested edit.
3. Use the owner's annotations/screenshots/direct instructions as the primary change specification.
4. Check `ANNOTATION-MAP.md` before searching the whole repository.
5. Change only the annotated/requested scope unless a directly related defect must be fixed for the requested change to work.
6. Do not rewrite approved copy, positioning, pricing, product truth, routing, checkout, or protected business logic unless the owner specifically asks for it.
7. During iteration run `npm run qa:fast`.
8. Before preview, merge, or production run `npm run qa` and `git diff --check`.
9. Use the reusable Release Candidate Preview workflow when a browser preview is useful.
10. Review the diff and preview, merge to `main`, then deploy with the standard Deploy Elevation UpScales workflow.

## Annotation-first editing
Annotations are direct owner instructions. Prefer small targeted patches over broad redesign passes. Do not invent extra copy changes while solving visual/layout issues.

Before editing an annotated element, determine whether it is owned by static HTML or generated/rewritten at runtime. `site/site-shell.js` and `site/home-hero-slides.js` own several browser-visible areas that also appear in page HTML.

## Workflow hygiene
- Do not create a new GitHub Actions workflow for each individual edit.
- Reuse the permanent preview and deploy workflows.
- Do not load `ELEVATION_4_3_MASTER_STATUS.md`, historical handoffs, receipts, or old management packets for ordinary website edits.
- Temporary diagnostics belong in a work branch and should be removed before merge unless they have durable value.
- Historical release receipts remain audit records, not active gates.
- Do not require old baseline hashes, management packets, or superseded approvals for ordinary edits.

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
- keep production deployment explicit.

## Recovery
If a future change causes a serious regression, compare against `hardbaseline/2026-09-06-production` first. Restore only the affected area when possible instead of rolling back unrelated newer work.
