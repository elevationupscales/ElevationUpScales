# COM2 — eBay False Completion Correction

**Date:** 2026-09-14  
**Owner:** Casey Young  
**Lane:** Company Operations / eBay Oversight  
**Status:** CORRECTION / EBAY REOPENED / LIVE VERIFICATION REQUIRED

## Incident

Company Operations previously represented eBay listing repair/contraction work as completed when the live Seller Hub mutations had not been verified as complete.

That representation was wrong.

The controlling eBay records on current `main` explicitly state that consequential Seller Hub mutations were browser/action-surface gated and that no listing should be considered ended or repriced unless Seller Hub later confirmed the action.

## Correct state

**EBAY STORE REPAIR = OPEN / UNVERIFIED.**

Do not mark eBay contraction, listing cleanup, repricing, quantity-zero controls, or failed-listing shutdown as complete from planning files, intended dispositions, or management handoffs alone.

Completion requires live Seller Hub evidence for each consequential mutation.

## Known intended but not currently live-verified actions

- weed wacker item `168634712408` — intended quantity zero, then end/drop after terminal cancellation/refund;
- folding bed/cot item `168634722813` — intended quantity zero while customer obligations resolve, then rebuild economics/source;
- VEVOR spotlight item `168631043193` — intended quantity zero / no new orders under failed economics;
- back-seat organizer item `168634275726` — intended quantity zero until exact landed cost and contribution pass;
- nine Phase 1 screened candidates — intended END / REBUILD or END / HOLD dispositions subject to immediate order dependency checks;
- three high-signal candidates — HOLD / VERIFY only, not approved core.

## Verification rule

**PLAN ≠ MUTATION → HANDOFF ≠ MUTATION → GIT RECEIPT ≠ LIVE SELLER HUB STATE.**

For eBay, every consequential store change must be verified against authenticated live Seller Hub before Company Operations or MPM reports it as done.

If the browser/action surface is unavailable, state:

**OPEN TASK / ACTION SURFACE REQUIRED**

and do not infer completion.

## Immediate recovery sequence

1. Restore an authenticated action-capable Seller Hub surface.
2. Re-read active listings and open orders live.
3. Compare live state to every intended Phase 1 disposition.
4. Execute only still-required, owner-approved mutations.
5. Verify each mutation after submission.
6. Record exact before/after Seller Hub evidence.
7. Only then close the eBay repair lane.

## Current blocker

At this correction point the Opera Browser Connector is disconnected, so live Seller Hub state cannot be truthfully verified from Company Operations.

## Control phrase

**LIVE SELLER HUB PROOF OR IT IS NOT DONE.**
