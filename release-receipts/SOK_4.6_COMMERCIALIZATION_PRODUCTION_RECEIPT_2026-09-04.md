# SOK 4.6 COMMERCIALIZATION — PRODUCTION ACCEPTED

Date: 2026-09-04 (Management release authorization; deployment completed 2026-09-05 UTC)

## Release identity

- Validated application SHA: `ef4f20c71efa045e6a7bcbc1d94c5ba9f6bc7beb`
- Final clean release SHA: `6ce552aa023c9832d2bfd8fd9c93d6029ebc5c36`
- Production SHA: `6ce552aa023c9832d2bfd8fd9c93d6029ebc5c36`
- Rollback baseline: `baseline-2026-09-04-sok-4-6-commercialization-production`

## Release Candidate

- Workflow: `Release Candidate Gate`
- Run: `33934023933` (run #9)
- Preview: `https://446a13c6.elevationupscales.pages.dev`
- Lineage: PASS
- Current-architecture regression gate: PASS
- SOK commercialization static gate: PASS
- Full site JavaScript syntax: PASS
- Cloudflare file/credential gate: PASS
- General preview smoke: PASS
- SOK commercialization preview smoke: PASS

The delta from validated application `ef4f20c7...` to final clean release `6ce552aa...` contains release-control/test cleanup only; no `site/` application behavior changes.

## Production

- Workflow: `One-time SOK 4.6 Commercialization Production`
- Run: `33934150926` (run #1)
- Immutable deployment: `https://d678cc0f.elevationupscales.pages.dev`
- Canonical: `https://elevationupscales.com`
- Exact production-source enforcement: PASS
- Pre-deploy SOK static gate: PASS
- Pre-deploy JavaScript syntax: PASS
- Immutable production smoke: PASS
- Canonical production smoke: PASS on first propagation attempt

## Commercialization controls

- SOK MAP floors: PASS — SK12V100PC at/above $319; SK48V100N at/above $1,199
- Promotion/MAP protection: PASS — SOK promotion and coupon eligibility disabled under `sok-map`
- Hawaii operational quantity gate: PASS — 1–3 supported; 4+ routes to freight/commercial review
- Purchase Options: PASS
- Pre-purchase/backorder protections: PASS — SK48V100N remains pre-purchase; SK12V100PC remains available
- Commercial/Hawaii inquiry routing: PASS
- Supplier-data exposure: PASS — protected supplier/economics fields absent from public SOK catalog
- Private runtime exposure: PASS — protected runtimes return 404; SOK admin endpoint remains authentication-protected
- Local SOK media/spec sheets: PASS
- Solar Builder SK48 integration: PASS
- Protected Lower-48 storefront regressions: PASS

## Acceptance

**SOK 4.6 COMMERCIALIZATION — PRODUCTION ACCEPTED**
