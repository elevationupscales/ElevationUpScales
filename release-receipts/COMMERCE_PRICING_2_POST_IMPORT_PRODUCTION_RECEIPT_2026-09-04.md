# Commerce Pricing 2.0 Post-Import Production Receipt — 2026-09-04

## Release
- Status: PRODUCTION PASS / ACCEPTED
- Previous accepted application SHA: `31d2bb33d5dabd94ac007ff8ebcdc3b98a3dbfcf`
- Previous main receipt SHA: `b73b166e5887e86abb6044ccbdeb4e9c293cbe65`
- Pricing 2.0 verified application source: `0516dc269073aae645caa6ac7e22b0fd356abdeb`
- Import execution candidate: `9d5a2fec1ef214ea289c6fef3869abe12914da6b`
- Integration SHA before final boundary hardening: `d6938c518c3c2deff55365f052f258019ede2f8a`
- Deployed application SHA: `3c525a28df066a1394f0e5c07404fc4a0e820626`
- Immutable Cloudflare Pages deployment: https://d5c39b70.elevationupscales.pages.dev
- Canonical: https://elevationupscales.com
- Successful post-import verification run: `33826626759`
- Final production workflow run: `33836200479`

## Pricing Import State
- 31 intended retail-price writes
- 31 actual writes
- 0 unintended writes
- 0 other Catalog-field or publication changes
- 31/31 protected-floor PASS
- Representative SKU `D01027HH7BV-136`: $176.00 retail / $132.00 after LABORDAY25

## Protected Controls
- Lower 48 lithium shipping: $27.99 per battery
- Hawaii lithium customer freight: $99.00 per battery
- Alaska: freight review required
- LABORDAY25: 25% eligible merchandise only; freight/shipping not discounted
- Hawaii review-required orders remain blocked before PayPal

## Public / Internal Boundary
- Public Catalog uses derived customer-facing availability, not raw supplier stock counts.
- Customer scripts do not receive raw supplier/source routing fields.
- Internal pricing/supplier runtimes remain inaccessible by direct public request.
- Internal-data exposure verification: PASS
- KINGBOSS upstream Supplier attribution was not injected into current source snapshots.

## Rollback
- Pre-promotion main baseline: `baseline-2026-09-04-pre-commerce-pricing-2-app-promotion`
- Previous accepted app rollback: `baseline-2026-09-03-elevation-45-final-copy-production`

## Source archive
- Import execution archive SHA-256: `25b1b38a949b8a5568f68b14fc98b9caab6adc3b7dbe13beeb32d221f572d928`
