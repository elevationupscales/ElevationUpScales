# Elevation UpScales — Company Operations Commercial Sweep Worktree

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**State:** ACTIVE / PHASE 1 COMPANY-WIDE SWEEP / RECONCILED TO CURRENT LANE TRUTH  
**Reports To:** Operating System Project Manager / PM4  
**Execution Owner:** Company Operations Manager / COM 2  
**Parent Controls:** `COMMERCIAL_REVENUE_ACCELERATION_DIRECTIVE_2026-09-12.md`, `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`, `CURRENT_WORK_BOARD.md`, current vendor Project Sources/Worktrees  
**OS RECON baseline:** `main@c2aee08412834ba4203a915eaa40d91616f2c80b`

## OS RECON correction — COM 2 drift boundary

COM 2 is a **consolidation, routing and exception-clearing lane**. It is not a competing source of truth for vendor Projects, channel workers, specialist Worktrees or PM4.

During the Sep. 12 commercial sweep, specialist lanes advanced faster than this worktree snapshot. That created stale-pointer risk. The controlling rule is now explicit:

**CURRENT MAIN → CURRENT WORK BOARD → OWNING PROJECT SOURCE / CURRENT WORKTREE → LAST VERIFIED LANE ACTION → COM 2 CONSOLIDATES / ROUTES ONLY.**

COM 2 must not:

- rerun a completed current-window vendor fresh check;
- recreate closed onboarding, fulfillment, catalog or verification work;
- overwrite a specialist lane's newer `PROMOTE / HOLD / WAIT / TERMINAL` state with an older sweep instruction;
- treat a broad sweep target as authorization to make platform/customer/vendor mutations owned by another lane;
- reactivate the TikTok seller-verification appeal from Affiliate Growth, settlement monitoring or cash-recovery work;
- duplicate eBay customer/order actions already controlled by the eBay specialist;
- create a second apparel/provider source of truth;
- use the commercial sweep to alter the protected SOK lane;
- use commerce work to alter the protected top homepage experience without Casey's exact approval.

When COM 2 encounters a newer owning-lane state, **the newer lane state wins** and COM 2 updates its consolidation view instead of sending the worker backward.

## Purpose

Convert the approved commercial revenue-acceleration directive into one bounded Company Operations sweep covering storefront, vendor, inventory/SKU, apparel, payment, fulfillment, working-capital and developer revenue-blocker state.

This is not a new Project, manager, catalog or source-of-truth system. Vendor managers retain vendor source/economics authority; channel workers retain channel execution authority; PM4 retains management sequencing and final hero-set approval.

## Owner / management controls preserved

1. **SOK is protected.** Current live SOK battery listings and current SOK Project work are not repriced, rebuilt, contracted, deactivated or restarted by this sweep.
2. eBay remains in its dedicated customer/cash recovery and profitable-core lane.
3. TikTok seller-verification appeal remains terminal/submitted/waiting and is not replayed.
4. No broad paid advertising during initial sweep/hero proof.
5. No speculative inventory commitment or new recurring software spend merely to increase catalog breadth.
6. One blocked SKU does not block another clean SKU or vendor.
7. Realized contribution is final scale truth.
8. **Store/catalog/product/shopability/commerce-navigation work may move, but the protected top homepage experience is hard no-touch.** Any shared API/catalog/backend change that would alter protected-top rendered/runtime output is also a protected-top change and must be held for Casey.

## Commercial objective

**AUDIT CURRENT TRUTH → IDENTIFY BEST MONEY-MAKERS → CONCENTRATE TRAFFIC → TAKE PAYMENT → FULFILL CLEANLY → RECORD REALIZED CONTRIBUTION → SCALE WINNERS.**

The company does not currently have a product-access problem. The operating problem is concentration of qualified traffic onto economically cleared offers with clean fulfillment and low working-capital exposure.

`AUDIT` does not mean repeat work that the owning lane has already completed for the current source window. COM 2 consumes verified lane returns and only requests the still-missing material facts.

## Required return schema — every promoted candidate

Every lane returns the following fields for each candidate intended for concentrated traffic:

| Field | Required state |
|---|---|
| Vendor / provider | exact source owner |
| Exact SKU / model / variant | exact identity |
| Brand | customer-facing brand |
| Channel | exact selling surface |
| Status | ACTIVE / DRAFT / STAGED / BACKORDER / HOLD |
| Customer price | current actual price |
| Source cost | protected/current fact or `UNKNOWN / VERIFY` |
| Shipping/freight | current treatment/cost |
| Channel/payment cost | current applicable cost |
| Expected contribution | dollars after known variable costs |
| Expected margin | percentage where useful |
| Cash-before-payout requirement | dollar exposure / customer-funded / POD |
| Availability/orderability | current source authority |
| Fulfillment mode | dropship / POD / warehouse / freight / manual |
| Fulfillment confidence | HIGH / MEDIUM / LOW |
| Warranty/returns path | PROVEN / PARTIAL / UNKNOWN |
| Media readiness | exact approved assets ready? |
| Demand evidence | order / cart / watcher / search / social / none |
| Checkout path | exact working purchase path |
| Promotion classification | PROMOTE / VERIFY / REPRICE / HOLD / RETIRE |
| Realized contribution | actual after order; blank until proof |

Unknown material facts remain `UNKNOWN / VERIFY`; they are not converted into assumed economics.

## Revenue Readiness Score

For PM4 comparison after material economics are known:

- expected contribution dollars — 25
- verified demand / sale probability — 20
- fulfillment reliability — 15
- low working-capital requirement — 15
- checkout/payment simplicity — 10
- brand/perceived-value advantage — 10
- warranty/assets/customer-confidence readiness — 5

**80–100:** PROMOTE NOW  
**65–79:** VERIFY / REPRICE  
**Below 65:** HOLD from concentrated traffic unless PM4 documents a strategic override.

The score is a ranking tool, not a substitute for exact contribution economics.

# Phase 1 lane sweep — reconciled current state

## SOK — protected reference revenue lane

**State:** PROTECTED / CONTINUE CURRENT PROJECT WORK

Company Operations action:

- do not mutate current live SOK battery listings under this sweep;
- accept and route real SOK orders through the existing approved workflow;
- observe realized contribution and fulfillment result;
- preserve current owned/free-traffic test and exact existing Project controls;
- return only material real-order or source-change exceptions to PM4/SOK Project.

SOK is a working supplier/trust reference, not a target for cross-vendor rebuild.

## Renogy — incremental name-brand activation lane

**State:** 5 Shopify drafts preserved / no accidental activation / exact-SKU activation QA active

Current first candidates:

1. `RBM500-US` — 500A Battery Monitor with Shunt
2. `RSP100DCT-US` — 100W N-Type Bifacial Solar Panel

Required remaining return:

- dealer-authoritative orderability/backorder state;
- exact applicable checkout/payment fee treatment;
- private final expected contribution;
- exact/current approved media binding;
- PROMOTE or exact HOLD for each candidate independently.

COM 2 does not restart dealer onboarding or the five-draft foundation.

Goal:

**CLEAR 1–2 CLEAN RENOGY SKUS → ACTIVATE INDIVIDUALLY → OWNED TRAFFIC → FIRST REAL POSITIVE-CONTRIBUTION ORDER.**

## VEVOR — current three-SKU economics gate

**State:** 19 A-tier live / 17 of 17 qualified B-tier ACTIVE / public checkout verified / current-window 10-SKU fresh check COMPLETE.

Current owning-lane return:

- **3 / 10 exact shortlist SKUs are currently orderable**;
- **7 / 10 are currently out of stock** and remain at the back of the source-refresh queue;
- the current three-SKU economics queue is:
  - `XXKLJT124INCLJF0QV0` — Camper Levelers;
  - `AXLSTCQJDSYKAZ99C001V0` — A-Frame Trailer Jack;
  - `D25FT14IN20AHOGLOV1` — 25-ft Electric Drain Auger;
- all three remain `HOLD — ECONOMICS UNKNOWN` pending exact current PRO net unit price + normal continental-U.S. dropship shipping treatment;
- a focused supplier request for those exact economics has already been sent.

COM 2 control:

- **do not rerun the completed 10-SKU public fresh check during this source window**;
- do not request another generic VEVOR qualification/fulfillment pass;
- do not rebuild A-tier/B-tier publication;
- consume the three-SKU protected-economics return when it arrives;
- route only a clean `PROMOTE` result into concentrated traffic.

Goal:

**3 VIABLE SKUS → EXACT PRO ECONOMICS → PROMOTE/HOLD → ONE CLEAN HERO → FIRST PROFITABLE VEVOR ORDER.**

## Kingboss — differentiated proving lane

**State:** supplier relationship active/proving; exact commercial gaps remain.

Required return:

- exact launch SKU/model identity;
- protected price/MAP/channel facts;
- model-specific compliance applicability;
- warranty/RMA path;
- reserved-stock/dropship or other cash-light fulfillment path;
- expected contribution;
- 1–3 differentiated launch candidates only.

No speculative 100-unit purchase is authorized by this sweep.

## Doba / other approved sources — gap-fill only

**State:** complementary source; current authenticated account evidence required before promotion.

Required return:

- exact SKU;
- current cost;
- current stock;
- destination/shipping eligibility;
- channel eligibility;
- expected contribution after actual channel fees;
- supplier-prepayment requirement;
- fulfillment reliability.

Do not restart broad speculative Doba catalog work.

## Fourthwall — cash-light apparel / proven native fulfillment lane

**State:** 29 products / native fulfillment proven / payout setup remains open / Mountain Patch Baseball Cap has already entered the first bounded owned-traffic test.

Current owning-lane facts:

- Fourthwall is a proven made-to-order/no-inventory-prebuy fulfillment path;
- Mountain Patch Baseball Cap is the first direct-store `PROMOTE TEST` candidate through Fourthwall native checkout;
- a Facebook owned-traffic post for that exact product has already been scheduled by PM4;
- the direct-store test remains valid;
- **the same cap is currently `HOLD RATE / REPRICE OR REROUTE` for TikTok Affiliate** because direct Fourthwall profit does not prove safe TikTok affiliate contribution;
- Signature Collection Emblem Tee has proven fulfillment but current economics do not safely support broad TikTok affiliate commission at the current cost structure;
- Women's Crop Tee and Essential Hoodie remain reprice/reroute candidates before concentrated promotion;
- payout readiness remains open.

COM 2 control:

- do not schedule a duplicate Mountain Patch direct-store traffic test;
- do not interpret a direct Fourthwall `PROMOTE TEST` as TikTok Affiliate approval;
- do not move Fourthwall products into custom PayPal fulfillment until automatic Fourthwall order creation is actually proven;
- consume the 29-product audit/provider-economics return from Apparel Vendor Operations;
- use realized order profit as final truth.

Goal:

**NO INVENTORY CASH → NATIVE FOURTHWALL ORDER → FOURTHWALL FULFILLS → POSITIVE REALIZED PROFIT.**

## Shopify + Spreadconnect apparel — owned brand lane

**State:** Shopify active/public; **Spreadconnect is currently DISCONNECTED from Shopify.** Live Shopify inspection found no installed Spreadconnect app and no Spreadconnect fulfillment-service location.

Current gate:

**SPREADCONNECT INSTALL/AUTH LINK → VERIFY NORTH AMERICA ACCOUNT + FULFILLMENT SERVICE → EXACT SKU/COST/SHIPPING → COMPARE WITH FOURTHWALL → 3–5 LAUNCH-READY HEROES.**

Current comparison core is already established as a bounded 6–10 SKU Elevation Gear matrix. Public/consumer catalog price is not accepted as supplier business cost.

COM 2 control:

- do not describe Spreadconnect as connected;
- do not request product publication before install/auth + exact account economics;
- do not create duplicate apparel SKUs merely to satisfy the sweep;
- one fulfillment owner per SKU;
- Shopify owns brand/checkout/customer relationship for Shopify-native apparel; Fourthwall remains native fulfillment owner for its existing Fourthwall products unless deliberately rerouted after economics proof.

## Shopify storefront — conversion surface

**Verified management baseline:** very low qualified traffic with working checkout; checkout rebuild is not P0.

Company Operations / Shopify execution:

- preserve working checkout;
- keep exact source identity on every SKU;
- classify hero candidates by source/economics;
- route traffic only to cleared purchase paths;
- track `session → product → cart → checkout → payment` by hero/source;
- route each real paid order immediately to its owning fulfillment lane;
- feed realized contribution back to PM4 ranking.

## eBay — dedicated recovery lane

**State:** authenticated Seller Hub live reads recovered after retry; four Awaiting Shipment rows remain; weed-wacker cancellation is still processing; consequential mutation clicks remain the narrow tooling gate.

No takeover.

Company Operations monitors:

- customer obligations;
- payout release;
- supplier fulfillment exceptions;
- known loss exposure;
- free working-capital effect.

The eBay Store Operations Specialist remains the consequential platform-mutation owner.

COM 2 must not:

- resubmit the weed-wacker cancellation;
- issue a duplicate refund;
- infer fulfillment of one folding-bed/cot transaction from another;
- execute the approved listing contractions outside the dedicated action-capable eBay lane.

## TikTok Affiliate Growth — organic acquisition lane

**State:** Affiliate Growth is ACTIVE and separate from the terminal seller-verification appeal. Authenticated Seller Center Affiliate access is live. TikTok currently reports eligible Shop products are auto-added to Open Collaboration by default, creating a margin-exposure risk even when Elevation has not deliberately launched a SKU campaign.

No seller-verification replay.

Current control:

- `AUTO-ENROLLED` does **not** mean `PROFIT-APPROVED`;
- audit current live Open Collaboration commission settings through the owning TikTok Affiliate lane when the exact settings surface is available;
- do not intentionally broaden creator traffic to margin-unknown products;
- exact all-in SKU contribution and safe commission ceiling are required before deliberately increasing rates/traffic;
- Mountain Patch Baseball Cap remains `PROMOTE TEST` for direct Fourthwall owned traffic but `HOLD RATE / REPRICE OR REROUTE` for TikTok Affiliate;
- Mountain Patch Trucker Cap economics remain next comparison priority;
- Signature Tee, Women's Crop Tee and Essential Hoodie remain `OFF / HOLD` from concentrated affiliate promotion until rerouted/repriced;
- historical 20% commission is a performance-tier reference, not a blanket default;
- live Seller Center remains final fee/configuration check before consequential setting changes;
- paid/flat-fee creator deals remain HOLD until organic affiliate profitability is proven.

Execution target:

- maintain warm creator pipeline;
- use only product feeds with safe SKU-specific commission ceilings for deliberate scaling;
- prioritize accepted/showcased/sampled/posted/converting creators;
- prepare Apparel/Lifestyle and Camping/Outdoor separation for authentic platform restriction lift;
- track `creator → showcase → content → clicks → order → commission → realized contribution`.

## Developer — commerce/revenue-blocker lane under protected-top boundary

Normal commerce work is authorized for:

- catalog/product/item records;
- collections/store/category/product navigation;
- exact product routes and links;
- Buy Now / checkout / payment routing;
- shopability and purchase-path repairs;
- availability/source/fulfillment bindings;
- store search/filter/browse behavior;
- approved commerce APIs/integrations;
- Shopify, Fourthwall and other approved store surfaces.

Protected top homepage experience remains no-touch, including direct changes and indirect shared-dependency changes that alter its rendered/runtime output.

Required check:

**COMMERCE CHANGE → CHECK PROTECTED TOP DEPENDENCY → VERIFY TOP OUTPUT UNCHANGED → EXECUTE.**

If protected-top output would change:

**HOLD ONLY THAT MUTATION → ROUTE EXACT DELTA TO CASEY → CONTINUE UNRELATED COMMERCE WORK.**

Do not treat the earlier broad non-hero homepage merchandising interpretation as blanket authorization. Read `OWNER_DIRECTIVE_HOMEPAGE_LOCK_2026-09-12.md` and the current synced homepage work order.

No redesign, cosmetic experimentation, protected-top copy/image/CTA/product-binding change, broad refactor or new admin system is implied by the commercial sweep.

# Dynamic hero core

PM4 approves the final company hero set from sweep returns.

Working target: approximately **8–12 concentrated hero products**, not a fixed quota and not a catalog deletion target.

A clean high-performing product may displace a weaker category representative. Profit/demand/cash/fulfillment evidence controls ranking.

Products outside the hero core may remain safely available/searchable under their current source controls.

# Parallel execution order — current

1. **Real orders / cash release first** — no sweep work may delay current customer obligations or releaseable cash.
2. **Renogy** — clear `RBM500-US`; clear `RSP100DCT-US` independently.
3. **VEVOR** — wait/process exact PRO economics for the already-defined three orderable SKUs; **do not rerun current-window fresh check**.
4. **Apparel** — continue Fourthwall audit/real direct traffic proof; Spreadconnect remains install/auth gated before exact Shopify-native economics.
5. **TikTok Affiliate** — audit auto-enrolled Open Collaboration exposure; preserve creator pipeline; do not deliberately broaden rates/traffic until SKU-specific safe ceiling clears.
6. **Kingboss** — exact differentiated cash-light launch candidates.
7. **Doba** — exact gap-fill candidates only.
8. **Shopify/Marketing** — direct owned traffic to each product as soon as that exact candidate reaches PROMOTE; do not wait for every lane to finish.
9. **Developer** — execute approved commerce work while checking every shared dependency against the protected top-homepage hard lock.

# Company-wide sweep output to PM4

Company Operations consolidates **current owning-lane returns** into one PM review packet with:

1. Executive revenue summary.
2. Master commercial SKU matrix.
3. Vendor leverage summary — SOK / Renogy / VEVOR / Kingboss / Doba.
4. Apparel summary — Fourthwall / Shopify / Spreadconnect.
5. Storefront conversion state.
6. Payment/working-capital/fulfillment state.
7. Revenue-critical developer blocker list.
8. Ranked proposed hero set.
9. Owned/affiliate traffic assignments.
10. Expected vs realized contribution scoreboard.

COM 2 may summarize/classify the returns, but it may not replace their Project Source/Current Worktree with a second detailed truth record.

No protected vendor cost/MAP/private commercial terms are to be written into public-safe Git when supplier confidentiality applies. Public-safe Git records may use state/classification while protected economics remain in their authorized source surface.

# Daily Company Operations loop

**GIT FIRST → CURRENT WORK BOARD → CURRENT OWNING WORKTREES → CHECK REAL ORDERS → CHECK CASH RELEASE → CONSUME NEW LANE RETURNS → CLEAR ONLY CROSS-LANE ECONOMIC/LOGISTICS BLOCKERS → ROUTE CLEAN PROMOTE CANDIDATES → RECORD REALIZED CONTRIBUTION → ESCALATE PM DECISION ONLY WHERE REQUIRED → CONTINUE.**

### Replay guard

Before assigning a lane task, COM 2 asks:

1. Did the owning Project/worker already complete this exact current-window step?
2. Is there a newer source, receipt or Current Worktree than this COM 2 snapshot?
3. Is the action owned by COM 2, or is COM 2 only supposed to monitor/consolidate it?
4. Is the blocker exact enough to route without recreating finished work?

If the answer shows a newer completed/terminal lane state:

**ADOPT NEWER STATE → UPDATE CONSOLIDATION → DO NOT RE-EXECUTE.**

Decision-driving fields:

- free operating cash;
- held/pending cash;
- orders requiring action;
- supplier cash exposure;
- hero candidates cleared;
- realized contribution today / trailing seven days;
- known loss/refund/fulfillment exposure;
- top three immediate revenue actions;
- exact technical blocker, if any.

# Phase 1 close condition

Phase 1 sweep is complete when:

- every active commercial lane has returned its current candidate/classification state;
- material hero candidates have exact source/payment/fulfillment/economic facts or an exact HOLD;
- Fourthwall 29-product audit is returned;
- Shopify/Spreadconnect apparel core has either exact verified provider economics or an exact install/auth/economics HOLD;
- PM4 can rank a company-wide hero set without inventing missing economics;
- clean products already reaching PROMOTE have begun receiving owned/affiliate traffic without waiting for slower lanes;
- COM 2 has no stale pointer that asks an owning lane to repeat a completed current-window action.

# First commercial proof milestone

**ONE REAL POSITIVE-CONTRIBUTION ORDER → CLEAN FULFILLMENT → CASH RETURNS → ACTUAL PROFIT RECORDED.**

Repeat until ordinary commerce activity can be funded from operating cash rather than new owner cash.

## Control phrase

**COM 2 CONSOLIDATES CURRENT TRUTH → IT DOES NOT CREATE COMPETING TRUTH → PROTECT SOK → NEVER REPLAY TERMINAL WORK → ROUTE ONLY THE MISSING FACT → PROTECTED TOP HOMEPAGE NO TOUCH → AUTO-ENROLLED DOES NOT MEAN PROFIT-APPROVED → REALIZED PROFIT DECIDES SCALE.**