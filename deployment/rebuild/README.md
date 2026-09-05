# Website Rebuild — Script Ownership

The rebuild is now committed source. Scripts under this directory are classified as follows.

## Canonical active verification

- `verify-complete-rebuild.py` — authoritative source-layout invariant check. This is included in `npm run qa`.

## Completed migration utilities

These were used to produce the final committed Worker layout and are retained for provenance/recovery only. They are **not** run by the final validation workflow:

- `integrate-worker-shared-foundation.py`
- `extract-worker-routes.py`
- `finish-worker-imports.py`

They are intentionally idempotent against the completed source but are not the normal maintenance path.

## Retired one-shot entrypoints

The historical mutation behavior has been removed. These names remain only as compatibility entrypoints and now run the final verifier:

- `split-worker-core.py`
- `finalize-cleanup.py`

Do not restore their old one-shot generation behavior.

## Canonical commands

```bash
npm run rebuild:verify
npm test
npm run check
npm run qa
npm run qa:preview -- https://<preview>.elevationupscales.pages.dev
```

## CI behavior

`.github/workflows/website-rebuild-complete-code.yml` validates the committed branch exactly as stored, deploys an isolated preview, runs the full preview regression, and verifies the working tree stayed immutable.

It does **not** generate code, auto-commit source, push `main`, or deploy production.

## Production safety

Accepted production remains unchanged until an explicit controlled production promotion is authorized and accepted.
