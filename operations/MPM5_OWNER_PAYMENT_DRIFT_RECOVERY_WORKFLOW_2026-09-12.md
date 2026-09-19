# ELEVATION UPSCALES — MPM5 OWNER PAYMENT DRIFT RECOVERY WORKFLOW

**Date:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Integrity / release owner during recovery:** MASTER RECON OS  
**Status:** ACTIVE / STREAMLINED OWNER-DRIFT RECOVERY

## Purpose

Unwind the payment-architecture drift created during the 2026-09-12 checkout work without replaying stale instructions, moving production blindly, or choosing a replacement architecture before MPM records it.

This workflow is a recovery/control workflow. It does **not** itself decide whether the future Elevation purchase path will be Shopify-native, independent PayPal Orders v2, or another approved structure.

## Verified correction

- In the current U.S. Shopify lane, PayPal shown inside Shopify checkout is PayPal Wallet through Shopify Payments.
- That Shopify PayPal Wallet path is not a direct-PayPal-payout bypass of Shopify Payments.
- An independent PayPal Orders v2 checkout outside Shopify is a different architecture and must not be conflated with Shopify PayPal Wallet.
- Shopify Payments is currently accepting payments / receiving payouts in the Shopify lane.

## Current branch / release truth

- `production-deploy` = `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`
- `recovery/coding-stabilization-20260912` = `4da62160a5d9250a1d977a42052644798fac0b40`
- stale PayPal-only candidate branch = `recon/elevation-paypal-only-separation-20260912`
- stale candidate SHA = `84af23ec814baa73718e33ec052044ce4706534d`
- stale candidate state = **DO NOT DEPLOY / HISTORICAL DRIFT EVIDENCE**

No branch movement is authorized merely to make these pointers match.

## Streamlined recovery sequence

**1. FREEZE**

- Stop new payment-architecture edits, new listing work, catalog expansion and checkout-channel experiments.
- Preserve current production until a replacement flow is defined and proven.
- Do not deploy `84af23ec...`.

**2. RECONCILE FACTS**

MASTER RECON verifies and records only objective current state:

- production SHA and live behavior;
- recovery SHA;
- Shopify payment-method/payout state;
- Elevation custom checkout behavior;
- active checkout/order APIs and durable order record path;
- which prior directives are superseded;
- any open code defect versus configuration/architecture question.

**3. RETIRE DRIFTED ROUTING**

- `OWNER_DIRECTIVE_ELEVATION_PAYPAL_SHOPIFY_LANE_SEPARATION_2026-09-12.md` remains historical / superseded.
- The instruction to finish the PayPal-only deployment may not be replayed.
- Any workboard, Worktree, Issue #65 or worker-registry pointer that still routes to the stale candidate must be corrected.

**4. MPM DEFINES REPLACEMENT FLOW**

Before DEV resumes, MPM records one replacement architecture with explicit answers for:

1. customer checkout owner;
2. payment processor(s);
3. payout destination / settlement owner;
4. order system of record;
5. product/cart source of truth;
6. fulfillment handoff;
7. refund / cancellation owner;
8. failure / fallback behavior;
9. marketplace versus direct-site lane boundaries;
10. migration / rollback rule.

No worker may infer missing answers.

**5. RECON VALIDATES THE MPM FLOW**

MASTER RECON checks the replacement flow for:

- payment/payout contradictions;
- duplicate order authority;
- cross-lane coupling;
- stale branch or production assumptions;
- security / secret handling conflicts;
- replay of superseded directives;
- conflict with current Shopify/vendor/channel operating truth.

Return either **PASS** or one bounded correction list.

**6. DEV BUILDS ONLY THE APPROVED DELTA**

After MPM architecture + RECON PASS:

- DEV receives one bounded defect/build packet;
- build from the exact approved production lineage;
- no broad `main` merge;
- no unrelated homepage/catalog redesign;
- preserve protected homepage top;
- no live payment during QA.

**7. RELEASE**

**EXACT CANDIDATE → QA/SMOKE → RECON EXACT-SHA PASS → PRODUCTION → LIVE VERIFY → RECEIPT → CLOSE DRIFT INCIDENT.**

If the candidate fails, fix forward on the same bounded lane or return to the last proven production anchor.

## Role routing

- **MPM5:** architecture, sequencing, workboard truth, acceptance.
- **MASTER RECON OS:** drift repair, pointer integrity, lineage, exact-SHA release verification.
- **MASTER DEVELOPER:** standby until MPM replacement flow + RECON pass create a bounded build packet.
- **Shopify Store Operations:** preserve working Shopify configuration and report Shopify facts only.
- **COM2:** acceptance/current-state evidence only; no parallel architecture rewrite.
- **Vendor/channel workers:** hold new publication; maintain existing customer obligations only.

## Close condition

This recovery workflow closes when:

- stale PayPal-only deployment is impossible to replay from active controls;
- MPM replacement flow is recorded;
- all active worktree/workboard/Issue #65 pointers agree;
- RECON passes the exact replacement candidate;
- production and live verification pass;
- a durable receipt establishes the new accepted baseline.

## Control phrase

**STOP DRIFT → FREEZE PRODUCTION → RECONCILE FACTS → MPM DEFINES ONE FLOW → RECON VALIDATES → DEV BUILDS ONE DELTA → SAME-SHA RELEASE → CLOSE.**
