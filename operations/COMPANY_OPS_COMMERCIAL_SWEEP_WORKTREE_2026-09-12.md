# Elevation UpScales — Company Operations / COM2 Current Worktree

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**State:** ACTIVE / STREAMLINED COMMERCIAL CONTINUITY  
**Reports To:** Operating System Project Manager / MPM5  
**Execution Owner:** Company Operations Manager / COM2  
**Controlling Management:** `CURRENT_WORK_BOARD.md` + `MPM5_STREAMLINED_EXECUTION_MODE_2026-09-12.md` + `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`  
**Last reconciliation baseline:** `main` @ `1f35077af20e3fb36fbb8e39036216f1d70b3644`

## Role boundary

COM2 is the commercial continuity, consolidation and cross-lane exception-clearing layer under MPM5.

COM2 does **not** recreate detailed vendor/channel truth. Current owning Worktrees and verified lane returns win on objective lane facts.

Control:

**CURRENT MAIN → CURRENT WORK BOARD → OWNING WORKTREE / VERIFIED RETURN → LIVE EVENT/EXCEPTION → COM2 CONSOLIDATES → MPM5 SEQUENCES → OWNING WORKER EXECUTES → COM2 VERIFIES.**

Do not:

- rerun current-window platform checks owned by Shopify/eBay/vendor workers;
- duplicate customer/vendor/platform mutations;
- create parallel developer work;
- restart terminal/waiting appeals or completed onboarding;
- alter the protected top homepage without Casey's exact authorization;
- expand into new sales channels while MPM5 existing-shop tuning is active;
- authorize paid acquisition while the owner capital-recovery rule remains active.

## Foreground Company Operations state

### 1. Real orders / customer obligations / cash release — FIRST

No current Shopify order is available for fulfillment routing in this RUN.

On any real paid order:

**PAYMENT → EXACT SKU/SOURCE → LIVE SELLABILITY/COST/SHIPPING RECHECK → OWNING FULFILLMENT LANE → TRACKING/DELIVERY → REALIZED CONTRIBUTION → MPM5 RETURN.**

Do not manufacture a test order.

### 2. Shopify existing-shop tuning — OWNING LANE = SHOPIFY STORE OPERATIONS

Newest owning-lane return:

`SHOPIFY_EXISTING_SHOP_TUNING_RETURN_2026-09-12.md`

The 50 ACTIVE records that are not published to the Online Store are **not a general publication outage**.

Owning-lane proof classified the complete 50-product cohort as:

**INTENTIONAL HOLD / VEVOR STAGING COHORT — DO NOT BULK PUBLISH.**

Current public Online Store catalog is the existing 53-product set. The owning Shopify lane continues tuning that public set and keeps staged VEVOR records hidden until owning VEVOR controls release exact SKUs.

Existing installed channel disposition from the Shopify return:

- Online Store = current primary public catalog;
- Shop = existing-surface configuration / eligibility hold;
- Microsoft Copilot = existing surface / preserve;
- POS = not a current ecommerce priority;
- new channel installation/expansion remains HOLD.

COM2 must not send Shopify backward into a bulk-publication exercise.

### 3. Shopify Payments — P0 PLATFORM / OWNER CONFIGURATION OPEN

Fresh authorized browser verification still shows:

**Shopify Payments → `Complete setup`.**

Therefore:

- native checkout UI may render card/Shop Pay controls, but Shopify Payments must not be treated as fully production-ready until account setup is completed and reverified;
- this is a Shopify account/configuration task, not a developer task;
- sensitive owner identity/banking/compliance fields remain owner/platform controlled and must not be copied into public Git;
- preserve the accepted PayPal path while Shopify Payments setup remains incomplete;
- after owner/admin completion, Shopify Store Operations re-verifies representative public product → cart → guest checkout → payment UI.

Current live funnel still reaches checkout without producing a completed Shopify order. Do not classify qualified traffic as the only blocker while Shopify Payments setup remains incomplete.

### 4. Real customer checkout report — P0 CUSTOMER RECOVERY

The customer who reported that checkout was not going through has not yet replied with the exact product after Casey asked which item they were attempting to buy.

State:

**WAITING ON CUSTOMER PRODUCT IDENTIFICATION — NO DUPLICATE OUTREACH.**

Trigger:

customer replies → identify exact product/path → retest repaired purchase path → return exact remaining error or recovery success.

### 5. eBay customer/cash recovery — P0 PARALLEL / OWNING LANE = EBAY STORE OPERATIONS

Use `EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md` as the transaction-level source of truth.

COM2 responsibility is limited to:

- customer-obligation visibility;
- held-cash release visibility;
- supplier/source exceptions spanning lanes;
- working-capital impact;
- escalation of exact cross-lane blockers.

Do not duplicate cancellation/refund/tracking/listing actions already owned by the eBay specialist.

### 6. Existing-shop revenue lanes — CONTINUE IN PARALLEL

Do not wait for Shopify Payments setup to stop all non-payment work.

Current owning lanes continue:

- **VEVOR:** existing promotion-cleared direct-store products and first-real-order proof; 50-product staging cohort remains hidden; no rerun of completed current-window freshness work.
- **Renogy:** preserve current active/draft state; continue exact-SKU activation independently.
- **Apparel/Fourthwall:** tune existing 29-product catalog, economics, payout readiness and hero classification; do not mass-migrate or create a new storefront.
- **TikTok Affiliate:** tune existing affiliate/catalog/commission exposure; seller-verification appeal remains separate/terminal-waiting.
- **SOK:** protected supplier/commerce lane continues under its own controls; no generic rework.
- **Kingboss:** Stage-1 exact proving continues; no speculative wholesale commitment.
- **Doba:** exact gap-fill only; no broad catalog restart.

### 7. New channels / paid acquisition — HOLD

MPM5 existing-shop tuning is controlling.

**TUNE CURRENT STORES → CLEAN CURRENT CATALOGS → PROVE PURCHASE PATHS → PROVE FULFILLMENT → PROVE PROFIT → THEN ADD REACH.**

No foreground installation/configuration campaign for Meta, Google/YouTube, Amazon, Walmart or other new channels.

Paid ads, boosts, PPC, Promoted Listings and prepaid media remain blocked until the capital-recovery hole is closed and Casey explicitly reopens paid acquisition.

### 8. Developer / RECON disposition

MASTER DEVELOPER is **CAUGHT UP / VERIFY-FIX ONLY**.

MASTER RECON is **TRIGGERED**, not a standing executor.

A developer wake-up requires a bounded defect packet:

- exact URL/path/component;
- exact SKU/order if applicable;
- reproduction steps;
- expected result;
- actual result;
- customer/revenue impact;
- owning lane;
- proof platform/configuration/operator repair was exhausted or ruled out.

Shopify Payments incomplete setup does **not** satisfy this gate because it is currently a platform/account configuration blocker.

## Current COM2 execution order

1. Real paid order / urgent customer obligation / releasable cash.
2. Shopify Payments activation result and post-activation checkout verification.
3. eBay customer/cash recovery return.
4. Customer checkout-recovery reply identifying exact attempted product.
5. New owning-lane `PROMOTE / HOLD / WAIT / TERMINAL` returns from VEVOR, Renogy, Apparel, TikTok, SOK, Kingboss or logistics.
6. Cross-lane fulfillment/economics exceptions only.
7. MPM5 decision only where sequencing/authority is genuinely required.

Removed from active COM2 blocker list:

- bulk classification/publication of the 50 hidden Shopify products — **RESOLVED AS INTENTIONAL VEVOR STAGING HOLD**.

## COM2 trigger set

COM2 re-runs materially on any of:

- real paid order;
- cash release/hold change;
- customer escalation/reply;
- Shopify Payments activation or failure;
- Shopify existing-surface configuration return;
- eBay customer/cash return;
- new owning-lane promotion/hold result;
- exact cross-lane source/fulfillment conflict;
- MPM5 directive.

## Return contract to MPM5

Return only current deltas:

- orders/customer obligations;
- cash/payment status;
- Shopify purchasability/payment status;
- eBay customer/cash status;
- vendor-lane changes that alter commercial sequencing;
- exact cross-lane blocker;
- exact owner/MPM decision required, if any;
- next executable trigger.

## Control phrase

**OPERATORS OPERATE → COM2 CONSOLIDATES → RECON ONLY ON CONFLICT/GATE → DEV ONLY ON PROVEN CODE DEFECT → MPM5 SEQUENCES → CLOSE WHAT IS DONE.**
