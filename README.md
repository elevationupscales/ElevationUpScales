# Elevation UpScales

Current source repository for the Elevation UpScales Cloudflare Pages website and connected website runtime.

## Current source
- Active source of truth: `main`
- Deployable website: `site/`
- Hard recovery branch: `hardbaseline/2026-09-06-production`
- Hard recovery commit: `cfc2f8cbe4d89ef40a46fb95d075ee579075a78d`

Older release numbers, ZIP checksums, management packets, handoffs, and historical coordination records are retained only for reference. They are not the starting point for normal website edits.

## Start coding
Read:
1. `AGENTS.md`
2. `CODING-WORKFLOW.md`
3. `ANNOTATION-MAP.md` when working from screenshots or annotations

For normal website edits, do not reconstruct the old Elevation 4.3 management control plane.

## Annotation edit cycle
1. Branch from current `main`.
2. Use the owner's annotation/direct instruction as the scope.
3. Locate the browser-visible source with `ANNOTATION-MAP.md`.
4. Make the smallest targeted change.
5. Run `npm run qa:fast` while iterating.
6. Run `npm run qa` before preview, merge, or deployment.
7. Use the reusable Release Candidate Preview workflow when browser verification is useful.
8. Merge the approved change to `main`.
9. Deploy `main` with the standard Deploy Elevation UpScales workflow.

## Deploy safely
Deployments are manual GitHub Actions runs. Changing repository files does not by itself authorize a production deployment.

Use **Deploy Elevation UpScales** and choose preview before production for meaningful visual, routing, commerce, or runtime changes.

## Required GitHub configuration
Repository secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Repository variable:
- `CLOUDFLARE_PAGES_PROJECT=elevationupscales`

Never commit Cloudflare tokens, `.env`, `.dev.vars`, private keys, database exports, customer records, or payment credentials.
