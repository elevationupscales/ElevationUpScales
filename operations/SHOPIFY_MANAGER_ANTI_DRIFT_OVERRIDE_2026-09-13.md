# ELEVATION UPSCALES — SHOPIFY MANAGER ANTI-DRIFT OVERRIDE

**Owner:** Casey Young  
**Date:** 2026-09-13  
**Lane:** Shopify Store Operations  
**Mode:** GIT FIRST → VERIFY LIVE SHOPIFY → RECONCILE → EXECUTE ONLY CURRENT APPROVED SHOPIFY PRIORITY → VERIFY → REPORT  
**Status:** ACTIVE / CONTROLLING OVERRIDE FOR VOLATILE SHOPIFY STATE

## 1. PURPOSE

This file prevents Shopify Store Operations from replaying stale catalog counts, reopening working payment configuration, bulk-publishing staging products, drifting into Web V2 architecture, or expanding into unrelated channel/vendor work.

It supersedes **volatile Shopify counts and current routing** in older Shopify receipts/worktrees where they conflict with the live state below. Historical receipts remain evidence of their time window and evergreen safety controls remain in force.

## 2. CURRENT LIVE SHOPIFY TRUTH — 2026-09-13

Fresh Shopify Admin GraphQL exact counts:

- **62 ACTIVE products** total;
- **32 ACTIVE + Online Store published**;
- **30 ACTIVE + Online Store unpublished**;
- published vendor split: **22 VEVOR + 9 SOK + 1 Renogy = 32**;
- unpublished active split: **30 VEVOR + 0 SOK + 0 Renogy = 30**.

The staging tag `VEVOR-Profit-50-2026-09-12` still identifies **50 products**, but the current status split is:

- **30 ACTIVE / unpublished**;
- **20 DRAFT**;
- **0 archived**;
- **0 unlisted**;
- **0 staging-tagged products published**.

Therefore the older statement **103 ACTIVE / 53 public / 50 ACTIVE hidden** is stale and must not route current work.

**Control:** the 50-product staging cohort remains a controlled staging set. **DO NOT BULK PUBLISH.** Product status/publication is not to be changed merely to make a payment button appear.

## 3. PAYMENT / PAYPAL STATE — GREEN / PRESERVE

Current verified store behavior:

- Shopify Payments remains the working Shopify payment lane;
- representative live SOK, VEVOR and Renogy purchase paths reached Shopify checkout;
- live product pages using the current Horizon product template include Shopify native accelerated checkout;
- current browser/session rendered an actual PayPal accelerated-checkout surface on representative buyable product pages;
- Shopify checkout exposes PayPal as a payment method and PayPal in Express Checkout;
- the 2026-09-13 SOK P0 recovery receipt records all nine intended SOK products through PDP → cart → checkout → card + PayPal reachability with no payment-config mutation required.

**Do not reopen or redesign payment architecture unless a fresh reproducible Shopify defect exists.**

### PayPal classification rule

A missing PayPal button is **not automatically a PayPal failure**.

Check in this order:

**PRODUCT → ONLINE STORE PUBLICATION → VARIANT BUYABILITY → PRODUCT PAGE → NATIVE SHOPIFY ACCELERATED CHECKOUT → PAYPAL AVAILABLE → CART → SHOPIFY CHECKOUT → PAYPAL AVAILABLE**

If the product is unpublished, unavailable, or otherwise not buyable, classify that exact upstream condition first. Do not mutate payments to compensate for a catalog/publication condition.

Shopify accelerated checkout is dynamic. The current session renders PayPal, but another eligible buyer/device can be offered a different accelerated wallet. Do not claim every buyer will always see a PayPal-branded PDP button unless that stronger owner requirement is separately implemented and verified.

## 4. CURRENT SHOPIFY EXECUTION PRIORITY

Use `operations/CURRENT_WORK_BOARD.md` as global priority control.

Current Shopify sequence is:

**PAYMENT GREEN → PRODUCT TRUST → IMAGE QUALITY → SHIPPING TRUTH → POLICIES → BUY-BOX CONFIDENCE → FIRST REAL ORDER**

### P0 — Product trust / image quality

Current approved Shopify execution priority is the live product-image / conversion-trust lane.

- fix weak/blurry/wrongly rendered exact-SKU imagery;
- distinguish source-resolution, mapping, CSS/upscaling, responsive sizing, compression and crop/aspect defects;
- use approved factual product media only;
- no wrong-SKU substitution;
- no AI-redrawn vendor product media;
- do not turn image repair into a catalog rebuild.

### P1 — Shipping / policies / buy-box confidence

- supplier-specific shipping truth comes from Shipping & Logistics + owning Vendor Project;
- do not guess shipping rates, ETA, Alaska/Hawaii eligibility, lithium restrictions, expedited service or freight routing;
- policy substance requiring owner/company approval stays held until approved;
- implement only verified near-CTA confidence improvements.

## 5. HARD LANE BOUNDARIES

Shopify Store Operations must **not** drift into:

- Web V2 architecture or Cloudflare release work;
- replacement payment architecture design;
- broad payment-provider changes while current Shopify payments work;
- vendor onboarding or supplier-source reconstruction;
- new sales-channel expansion;
- bulk publication of the VEVOR staging cohort;
- broad catalog rebuild/relisting;
- paid acquisition while the company paid-acquisition hold remains active;
- invented shipping, stock, fulfillment, legal or commercial truth.

Vendor truth gaps route to the owning Vendor Project. Shipping truth routes to Shipping & Logistics. Cross-lane control conflict routes to MPM 6 / MASTER RECON.

## 6. VOLATILE-DATA RULE

Shopify catalog counts, publication state, inventory/purchaseability and live storefront rendering are volatile facts.

**Before any action based on those facts, verify them live in Shopify. Do not replay yesterday's count or an older receipt as current truth.**

Git controls the workflow. Shopify controls current platform state. If they conflict:

**LIVE FACT → RECONCILE CONTROL POINTER → HOLD ONLY THE CONFLICTED MUTATION → CONTINUE OTHER CLEAN WORK.**

## 7. SHOPIFY MANAGER RUN

When Casey or MPM says `RUN`:

**GIT FIRST → CURRENT_WORK_BOARD → THIS ANTI-DRIFT OVERRIDE → LIVE SHOPIFY FACTS → IDENTIFY ONE CURRENT APPROVED SHOPIFY WORK ITEM → EXECUTE ONLY THAT ITEM → VERIFY PDP/CART/CHECKOUT IF PURCHASEABILITY IS TOUCHED → RECORD RECEIPT → CONTINUE NEXT UNBLOCKED SHOPIFY PRIORITY.**

Do not restart solved payment onboarding. Do not publish staging products as a shortcut. Do not create another management layer. Do not leave the Shopify lane to solve Web V2 or vendor-project work.

## 8. CURRENT HANDOFF

**SHOPIFY MANAGER CURRENT:** P0 product trust / image-quality and conversion confidence.  
**PAYPAL:** GREEN / preserve; reopen only on fresh reproduced defect.  
**STAGING:** 50 tagged = 30 ACTIVE hidden + 20 DRAFT; no bulk publish.  
**SOK:** 9 published / purchaseability receipt PASS.  
**NEXT AFTER P0:** supplier-backed shipping truth → approved policies → buy-box confidence → first real order.

**Control phrase:**

**VERIFY LIVE → FIX THE ACTUAL SHOPIFY DEFECT → PRESERVE WHAT WORKS → DO NOT EXPAND SCOPE.**
