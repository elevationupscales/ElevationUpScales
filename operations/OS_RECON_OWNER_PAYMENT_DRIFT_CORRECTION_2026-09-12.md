# ELEVATION UPSCALES — OS RECON OWNER PAYMENT DRIFT CORRECTION

**Date:** 2026-09-12  
**Owner:** Casey Young  
**Role:** MASTER RECON OS  
**Status:** ACTIVE / CONTROLLING RECON CORRECTION UNTIL MPM REPLACEMENT FLOW IS RECORDED  
**Trigger:** management-state drift + payment-architecture source conflict

## OWNER CORRECTION

The prior owner assumption that selecting or preserving PayPal inside Shopify could bypass Shopify Payments / Shopify payout handling was incorrect for the current U.S. Shopify configuration.

Current verified platform distinction:

- in the United States, PayPal presented inside Shopify checkout is **PayPal Wallet through Shopify Payments**;
- PayPal Wallet transactions in that Shopify lane settle through **Shopify Payments**;
- therefore **PAYPAL INSIDE SHOPIFY IS NOT A DIRECT-PAYPAL-PAYOUT BYPASS**;
- an independent Elevation-owned PayPal Orders v2 checkout outside Shopify is a technically different architecture and must not be conflated with Shopify PayPal Wallet.

This correction does **not** choose the final replacement checkout architecture. MPM is building the replacement flow and owns sequencing/acceptance of that architecture.

## DRIFTED CONTROL RETIRED

`OWNER_DIRECTIVE_ELEVATION_PAYPAL_SHOPIFY_LANE_SEPARATION_2026-09-12.md` is superseded as an active deployment instruction.

The following instruction from that file is specifically retired:

**RECON FINISHES THE PAYPAL-ONLY DEPLOYMENT.**

It must not be replayed.

## RELEASE HOLD

Exact stale candidate now placed on **DO NOT DEPLOY / HISTORICAL CANDIDATE HOLD**:

- branch: `recon/elevation-paypal-only-separation-20260912`
- candidate: `84af23ec814baa73718e33ec052044ce4706534d`
- base/current production at time of correction: `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`

MASTER RECON must not move `84af23ec...` to `production-deploy`.

Do not delete or force-move the branch merely to hide the history. Preserve it as evidence of the drift until MPM closes or replaces it.

## CURRENT LINEAGE HOLD

At RECON start:

- `main` = `9c77e7b42b3c969eb20670c74a0b9305e664dacb`;
- `production-deploy` = `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`;
- `recovery/coding-stabilization-20260912` = `4da62160a5d9250a1d977a42052644798fac0b40`.

No production/recovery ref movement is authorized by this correction.

`dfb0dc...` is current production evidence, not automatic authority for the next architecture. Any replacement, rollback, or forward deployment requires the exact MPM-approved candidate and normal release verification.

## SHOPIFY CURRENT FACT

The newer Shopify owning-lane receipt supersedes the older `Complete setup` state and reports authenticated Shopify Admin as:

- **Shopify Payments — Accepting payments**;
- **Receiving payouts**;
- standard card checkout present;
- PayPal present;
- first real Shopify order still open at the time of the receipt.

That Shopify receipt does not prove a direct PayPal payout path. In the U.S. Shopify lane, PayPal Wallet is part of Shopify Payments.

## WORK ROUTING NOW

1. **MPM** — finish and record the replacement payment/checkout flow.
2. **MASTER RECON** — hold stale deployment, reconcile active pointers, verify lineage, and prevent replay.
3. **MASTER DEVELOPER** — no stale candidate deployment; act only on the bounded MPM-approved replacement defect/candidate.
4. **Shopify Store Operations** — preserve currently working Shopify checkout/payment configuration unless MPM explicitly changes the lane; do not represent PayPal Wallet as bypassing Shopify Payments.
5. **COM2** — acceptance/current-state evidence only; no parallel payment-architecture rewrite.

## REPLAY GUARDS

Do not replay any of the following as current truth:

- `PayPal inside Shopify bypasses Shopify Payments`;
- `PayPal inside Shopify pays Elevation directly to a separate PayPal payout instead of Shopify Payments`;
- `84af23ec... is cleared for production`;
- `MASTER RECON must finish the PayPal-only lane-separation deployment`;
- `the owner lane-separation directive remains controlling`.

Also do not overcorrect to the opposite false statement that independent direct PayPal checkout is impossible. A non-Shopify PayPal Orders v2 architecture is distinct; MPM decides whether it belongs in the replacement flow.

## CONTROL PHRASE

**SHOPIFY PAYPAL WALLET = SHOPIFY PAYMENTS LANE → NO FALSE PAYOUT BYPASS → HOLD STALE PAYPAL-ONLY CANDIDATE → MPM DEFINES REPLACEMENT FLOW → RECON SYNCS CONTROL PLANE.**
