# Elevation V2 Release Foundation

## Controlling Web V2 SOP

The owner-controlled Web V2 visual, customer-experience, brand, asset, and vendor-merchandising standard is:

`deployment/v2/WEB-V2-SOP.md`

The SOP does not replace this release foundation. Visual requirements remain subordinate to the accepted Web / Commerce / Ops architecture boundary and exact-version release controls.

## Release invariant

One immutable Git SHA maps to one Cloudflare Worker Version ID. Opera accepts the immutable version-specific preview URL, and production promotes that already-created Version ID without rebuilding or re-uploading source.

Runtime truth is recorded as:

`Git SHA + Cloudflare Version ID + Cloudflare Deployment ID`

Git branch names are source-control pointers only. `production-deploy` is Legacy-only and is never used as V2 runtime truth.

## Release authority

- GitHub Actions owns QA and release orchestration.
- Wrangler is pinned in `apps/web-v2/package.json` and locked by `apps/web-v2/package-lock.json`.
- Cloudflare Git auto-deploy is not authoritative for V2.
- Candidate creation uses `wrangler versions upload`.
- Promotion uses `wrangler versions deploy` against the previously accepted Version ID.
- Promotion never rebuilds or re-uploads application source.

## Secret boundary

Workflow credential names only:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

No values belong in Git. Future application/runtime secrets remain Cloudflare-managed and are not introduced by this foundation.

## Step 3 boundary

This directory contains release machinery only. The Web V2 application entrypoint is intentionally introduced in Step 4. No routes, custom domains, D1/R2/KV bindings, runtime variables, or application secrets are defined here.
