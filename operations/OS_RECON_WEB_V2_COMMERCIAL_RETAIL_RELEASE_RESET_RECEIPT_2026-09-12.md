# OS RECON — WEB V2 COMMERCIAL RETAIL + RELEASE RESET RECEIPT

**Date:** 2026-09-12  
**Owner:** Casey Young  
**Source main:** `7a55652a1a59226b40023050ad1aef04ab6e1577`  
**Branch:** `work/web-v2-commercial-retail-release-reset-2026-09-12`  
**QA run:** `34738843664` — **PASS**

## RECON finding

The prior Web V2 sequence had drifted from the owner revenue target in two material ways:

1. Commerce V2/vendor catalog work was held behind an immutable `workers.dev` preview gate.
2. The preview environment did not prove the production-zone settings/routing parity required for acceptance.

The public foundation was also broader than the owner's immediate commercial objective: preserve the approved homepage look, explain lithium/off-grid/freight/Hawaii capability, merchandise authorized vendor products, cart them, take Elevation PayPal payment, persist the order and route fulfillment.

## Correction applied

- Created `WEB_V2_COMMERCIAL_RETAIL_REBUILD_AND_RELEASE_WORKFLOW_2026-09-12.md` as the controlling Web V2 commercial target.
- Replaced `WEB_V2_CURRENT_WORKTREE.md` with revenue-first sequencing.
- Synchronized `CURRENT_WORK_BOARD.md` so Web V2 vendor catalog + Commerce work are authorized rather than held.
- Replaced preview acceptance with production-parity smoke acceptance.
- Added Cloudflare Worker version metadata and `GET /__version` exact-runtime proof.
- Rebuilt `.github/workflows/web-v2-release.yml` with `candidate`, `bootstrap-smoke`, `production-smoke`, `promote`, and `rollback` modes.
- Added zero-percent candidate smoke on the real production zone through Cloudflare Worker version override for steady-state releases.
- Added automatic restoration of the accepted baseline when production smoke fails.
- Kept Legacy production and `production-deploy` separate and unchanged.

## Verification

Web V2 QA run `34738843664` passed completely on branch head `cafa7a535ee46820089239e5a6b7693cbfe9b2e3` before this receipt was added:

- release foundation validation — PASS;
- release policy tests — PASS;
- secret scan / repository safety — PASS;
- Web V2 application tests — PASS.

An earlier QA run correctly exposed a false-positive in the deployment assertion; RECON repaired it so 100% traffic must belong to the exact asserted Version ID, not merely another baseline version in the same deployment.

## Production state

No Cloudflare candidate, smoke deployment, root-domain cutover, or production promotion was performed by this RECON reset.

Legacy production remains the rollback/fallback runtime until a future Web V2 commercial candidate is built and owner-authorized through the new production-parity release flow.

## Next work

**WEB DEVELOPER:** reconstruct the approved current homepage look exactly enough for owner visual acceptance.  
**COMMERCE DEVELOPER:** then build canonical vendor catalog → product detail → cart → PayPal Orders v2 → durable Elevation order → fulfillment.  
**RELEASE ENGINEER:** support the production-parity release system and smoke target when the commercial build is ready.

## Disposition

**PASS — CONTROL / WORKTREE / RELEASE SYSTEM READY FOR MAIN.**

**KEEP THE HOMEPAGE → SELL THE PARTNERS → CART → PAYPAL → ORDER → FULFILL → FREIGHT / HAWAII CONTROL → PRODUCTION-PARITY SMOKE → SAME VERSION LIVE → MAKE MONEY.**
