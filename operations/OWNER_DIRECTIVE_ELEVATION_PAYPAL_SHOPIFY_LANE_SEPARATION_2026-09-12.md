# ELEVATION UPSCALES — OWNER DIRECTIVE: PAYPAL / SHOPIFY LANE SEPARATION

**Owner:** Casey Young  
**Date:** 2026-09-12  
**Status:** **SUPERSEDED / HISTORICAL DRIFT EVIDENCE / DO NOT EXECUTE**  
**Superseded by:** `OS_RECON_OWNER_PAYMENT_DRIFT_CORRECTION_2026-09-12.md` and the next MPM-recorded replacement payment flow

## RECON CORRECTION

This file was created from an owner misunderstanding about PayPal inside the current U.S. Shopify payment lane.

The controlling correction is:

- PayPal presented inside the U.S. Shopify checkout is **PayPal Wallet through Shopify Payments**;
- that Shopify PayPal Wallet path is **not** a direct-PayPal-payout bypass of Shopify Payments;
- an independent Elevation-owned PayPal Orders v2 checkout outside Shopify is a separate technical architecture and must not be conflated with Shopify PayPal Wallet;
- MPM is building the replacement flow and owns the next architecture/sequencing decision.

## DEPLOYMENT STOP

The prior instruction for MASTER RECON to finish the PayPal-only lane-separation deployment is **RETIRED**.

Do **not** deploy:

- branch `recon/elevation-paypal-only-separation-20260912`;
- candidate `84af23ec814baa73718e33ec052044ce4706534d`.

Preserve that branch/candidate as historical evidence until MPM closes or replaces it. Do not delete it merely to hide the drift.

Current production at the time of correction was:

`dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`

This supersession does not authorize a rollback, forward deployment, or production ref movement. Wait for the exact MPM-approved replacement candidate and normal release verification.

## HISTORICAL PURPOSE

The original directive attempted to separate an Elevation-owned PayPal checkout from Shopify and instructed RECON to deploy a one-file checkout candidate. That instruction is retained here only as historical context; it has no current execution authority.

## CURRENT CONTROL PHRASE

**DO NOT REPLAY PAYPAL-ONLY DEPLOYMENT → SHOPIFY PAYPAL WALLET IS A SHOPIFY PAYMENTS LANE → MPM DEFINES THE REPLACEMENT FLOW → RECON SYNCS CONTROL.**
