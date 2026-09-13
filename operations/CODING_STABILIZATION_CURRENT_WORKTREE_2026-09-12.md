# ELEVATION UPSCALES — CODING STABILIZATION CURRENT WORKTREE

**Date:** 2026-09-12  
**State:** **ACTIVE — BOUNDED DIRECT-SITE CHECKOUT REPAIR / BUILD HOLD RELEASED**  
**Reports To:** MPM  
**Execution Owner:** MASTER DEVELOPER  
**Integrity Validator:** MASTER RECON OS — PARALLEL / RELEASE EVIDENCE, NOT PRE-BUILD STOP-WORK  
**Owner Override:** `OWNER_DIRECTIVE_RELEASE_PAYMENT_REPAIR_GATES_2026-09-12.md`  
**Architecture:** `MPM5_PAYMENT_ARCHITECTURE_REPLACEMENT_FLOW_2026-09-12.md`

## Immediate disposition

The catastrophic-failure containment gates served their purpose while architecture truth was uncertain. The source issue and lane boundaries are now isolated enough to proceed.

**MASTER DEVELOPER IS ACTIVE.**

The prior generic sequence:

**STOP DRIFT → FREEZE PRODUCTION → RECON PASS → DEV**

is superseded for this bounded repair by:

**APPROVED PRODUCTION PARENT → BOUNDED BUILD → TEST → NON-CHARGING SMOKE → SAME-SHA DEPLOY → LIVE VERIFY → RECEIPT.**

MASTER RECON remains active as an integrity validator and may stop an exact candidate only for a newly discovered material candidate-specific safety defect. It may not recreate the retired generic pre-build hold merely because the prior incident existed.

## Fixed architecture boundaries

### Elevation direct site

Elevation owns its direct cart and checkout. The direct transaction path uses the approved Elevation payment/order architecture and must remain separate from Shopify-native checkout/order authority.

The repair must ensure:

- canonical server-side product/SKU/variant/price/shipping validation;
- durable local order intent before final payment state;
- idempotent transaction requests/retries;
- amount/currency/order/status reconciliation;
- durable transaction evidence;
- clean failure/retry UX without cross-routing the customer into Shopify;
- improved pre-payment product review and a clear path back to full product details.

### Shopify

Shopify is **PRESERVE** for this repair. Do not alter working Shopify payment configuration or rebuild Shopify checkout as part of the Elevation direct-site fix.

## Current production lineage

Last reconciled anchors before this owner override:

- `production-deploy` = `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`;
- `recovery/coding-stabilization-20260912` = `4da62160a5d9250a1d977a42052644798fac0b40`;
- stale candidate `84af23ec814baa73718e33ec052044ce4706534d` = **DO NOT DEPLOY**.

Before build/deploy, resolve current refs again and use the exact approved production lineage. Do not wholesale-deploy `main`.

## Active MASTER DEVELOPER packet

Build only the direct-site transaction delta required to:

1. restore one coherent cart → checkout → payment → local-order → fulfillment path;
2. validate exact product identity and price server-side;
3. prevent duplicate order/payment execution on retry;
4. improve checkout product information before payment;
5. provide a clear `Review full product details` return route;
6. preserve clear payment-method presentation without cross-surface fallback;
7. persist enough order/payment evidence for operations and customer support;
8. leave Shopify-native commerce, protected homepage top and catalog publication untouched.

## Required release checks

Before production release:

- automated/unit/integration checks for the touched transaction path;
- non-charging cart/checkout smoke with at least one representative existing product;
- exact product/variant/price displayed correctly;
- full-product-detail return path works;
- failure/retry does not create a second order or switch transaction authority;
- server rejects tampered/unknown product or amount inputs;
- secrets are not present in Git/client payloads;
- no protected-homepage-top regression;
- no Shopify-native checkout regression caused by the direct-site delta.

Only the exact candidate that passes these checks may be released.

## Controls preserved

- stale `84af23ec...` remains DO NOT DEPLOY;
- no broad `main` deployment;
- no secret/credential commit;
- no raw-card handling addition;
- no protected-homepage-top changes;
- no new item listings/catalog expansion as part of this repair;
- no paid-acquisition change;
- no live customer charge required for QA;
- unrelated work is not frozen.

## Control phrase

**FAULT SOURCED → BUILD HOLD RELEASED → DEV ACTIVE → BUILD → TEST → SMOKE → SAME-SHA DEPLOY → VERIFY → CLOSE.**