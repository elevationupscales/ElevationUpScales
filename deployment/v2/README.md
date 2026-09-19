# Elevation Web V2 Release Foundation

## Current release invariant

One immutable Git SHA maps to one Cloudflare Worker Version ID.

Acceptance no longer depends on a `workers.dev` preview because preview URLs do not prove production-zone routing, security, binding or domain parity.

Preview URLs remain diagnostic only.

Release truth is:

`Git SHA + Cloudflare Version ID + Cloudflare Deployment ID`

The accepted path is:

`QA → versions upload → production-parity smoke of exact Version ID → same Version ID promote/cutover → live verify`

No rebuild or re-upload is allowed after candidate acceptance.

## Production-parity smoke

### Bootstrap before Web V2 owns the root domain

Use a Web V2 custom-domain smoke target that is not the customer production root and is configured with the production Worker bindings/settings.

1. Upload one exact candidate version.
2. Deploy that Version ID to the Web V2 Worker on the smoke-only custom domain.
3. Verify `/__version` reports the exact candidate Version ID.
4. Smoke required routes without submitting a live customer charge.
5. Owner accepts the smoke.
6. Cut the root domain to that already-tested Worker/version under separate owner authorization.
7. Verify the live root domain.

### Steady state after Web V2 owns production

Cloudflare Workers supports version overrides for exact-version smoke testing on the real production zone.

1. Upload the candidate Version ID.
2. Create a split deployment with accepted version at 100% and candidate at 0%.
3. Send smoke requests to the real production URL with:

`Cloudflare-Workers-Version-Overrides: elevation-web-v2="<candidate-version-id>"`

4. Verify `/__version` returns the candidate Version ID.
5. Smoke the required routes.
6. Promote the same candidate Version ID to 100% only after acceptance.
7. Roll back to the last accepted Version ID on failure.

## Release authority

- GitHub Actions owns QA and release orchestration.
- Wrangler is pinned by `apps/web-v2/package-lock.json`.
- Cloudflare Git auto-deploy is not authoritative for Web V2.
- Candidate creation uses `wrangler versions upload`.
- Smoke/promotion uses `wrangler versions deploy` against already-created Version IDs.
- `production-deploy` remains Legacy-only and never represents V2 runtime truth.

## Runtime version proof

`apps/web-v2/wrangler.jsonc` exposes Cloudflare version metadata as `CF_VERSION_METADATA`.

`GET /__version` returns the runtime Version ID/tag/timestamp. Release smoke must confirm that this ID equals the requested candidate before treating any route result as evidence.

## Secret boundary

Workflow credential names only:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Application/runtime secrets stay Cloudflare-managed. No secret values belong in Git.

## Data rollback boundary

Worker version rollback only restores Worker code/version state. D1/R2/KV or other persistent-data migrations require separate forward/backward compatibility and rollback controls before they are introduced.
