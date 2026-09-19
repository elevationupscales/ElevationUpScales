# ELEVATION UPSCALES — HOMEPAGE COMMERCE WORK ORDER

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**State:** HOLD / DEFERRED UNDER P0 CODING FREEZE / BUSINESS INTENT PRESERVED / PROTECTED TOP EXCLUDED  
**Parent:** `COMMERCIAL_REVENUE_ACCELERATION_DIRECTIVE_2026-09-12.md` + `COMPANY_OPS_COMMERCIAL_SWEEP_WORKTREE_2026-09-12.md` + `OWNER_DIRECTIVE_HOMEPAGE_LOCK_2026-09-12.md`  
**Current Technical Control:** `MANAGEMENT_CODING_REPAIR_PLAN_2026-09-12.md` + `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`  
**Execution Lane:** PM4 admission → P0 coding-stabilization Worktree → MASTER DEVELOPER only if admitted  
**Management:** PM4 / Company Operations

## Current control correction

This work order preserves valid commerce intent but is **not an independent current developer route** while the P0 coding/deployment stabilization freeze is active.

The earlier interpretation of this work order as broad permission to change homepage store merchandising is superseded by Casey's newer explicit clarification and the Master S.O.P. authority hierarchy.

The authorized business scope is **commerce functionality**. The carefully built top homepage experience is not part of this work order.

During the active P0 freeze:

- non-code commerce work may continue in its owning lane;
- an exact customer/order/revenue technical blocker may be returned to PM4;
- PM4 classifies the blocker under the P0 change-admission rule;
- MASTER DEVELOPER executes only if the change is admitted into `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`;
- feature/cosmetic/merchandising/nice-to-have code remains HOLD;
- this work order may not create a parallel developer Worktree or independently reactivate deferred website work.

**NEW FACT ≠ NEW AUTHORITY.** A valid commerce need does not independently override the active management recovery sequence.

## Preserved commerce scope after freeze / if admitted through P0

The following bounded commerce surfaces remain valid business scope when PM4 admits an exact recovery-relevant mutation or after Casey releases the feature freeze:

- catalog/product/item records;
- store/category/collection pages;
- commerce navigation and browse paths;
- exact product/store links and routes;
- shopability, Buy Now and checkout routing;
- source, availability and fulfillment bindings;
- store search/filter behavior;
- approved commerce APIs and integrations;
- backend/catalog logic needed for store operation when protected top output is unchanged.

Use existing Project/vendor source authority for product economics and promotion classification.

## Protected top homepage — excluded from this work order

No direct or indirect change is authorized to the protected top homepage experience, including:

- layout/structure;
- images/backgrounds;
- copy/headlines/printed wording;
- CTAs, CTA destinations or CTA behavior;
- typography/colors/spacing/styles;
- animations/slides/rotation/timing;
- product bindings, product ordering or selection;
- data bindings and top links;
- responsive visibility/placement;
- runtime behavior;
- shared API/data changes that alter what the protected top renders.

## `/api/store/featured` correction

The previous work order identified `/api/store/featured` as a preferred target. That is **not blanket authorization to change that endpoint**.

Before any admitted P0 mutation to `/api/store/featured`, `site/_worker.js`, catalog ordering, a shared data source or any related dependency:

1. identify every current consumer of the proposed change;
2. determine whether the protected top homepage consumes it directly or indirectly;
3. verify the proposed change leaves the protected top rendered/runtime output unchanged;
4. if protected top output would change, HOLD the exact mutation and route it to Casey for explicit approval;
5. continue unrelated non-code commerce work where authorized.

A technically backend-only change is still a protected-top mutation if its effect changes the protected top.

## Product promotion gate

Before concentrated traffic, a candidate still requires its owning lane to resolve material commercial facts:

**EXACT SOURCE/SKU → CURRENT ORDERABILITY → PRICE/MAP → SOURCE COST → SHIPPING/FREIGHT → PAYMENT/CHANNEL COST → POSITIVE EXPECTED CONTRIBUTION → CONTROLLED WORKING-CAPITAL EXPOSURE → RELIABLE FULFILLMENT → WORKING PURCHASE PATH.**

While the owner paid-acquisition lock is active, a cleared product may receive only traffic allowed by that separate owner control.

Use `PROMOTE — FREE/OWNED TRAFFIC ONLY / VERIFY / REPRICE / HOLD / RETIRE` as appropriate.

Do not infer `PROMOTE` from catalog presence, product title, supplier name, update recency or gross selling price.

## Approved revenue surfaces without touching protected top

Revenue acceleration may continue through authorized **non-code** operation of:

- product pages;
- Shopify store and collections;
- Universal Catalog/store routes;
- Elevation Gear/Apparel surfaces;
- Fourthwall native store/product checkout;
- vendor/category pages;
- TikTok/creator/social deep links;
- direct/email links;
- existing store navigation/search/browse surfaces;
- existing checkout/payment/fulfillment paths;
- other approved commerce channels.

A required website mutation to any surface above is not automatically authorized by this work order during the P0 freeze; route it through PM4/P0 recovery.

## SOK carve-out

SOK remains protected under `OWNER_DIRECTIVE_SOK_PROTECTION_2026-09-12.md`.

Do not use this work order to reprice, rebuild, deactivate, contract or restart protected SOK listings/current Project work.

## Acceptance tests for any admitted technical change

Any technical change admitted through the P0 recovery must prove:

1. protected top homepage rendered/runtime behavior unchanged;
2. protected top copy/images/CTA/layout/product selection unchanged;
3. no indirect shared-data/API effect changes protected top output;
4. the exact intended commerce path is improved or repaired;
5. source/product identity remains correct;
6. checkout/Buy Now routing remains correct;
7. mobile/desktop commerce behavior passes for the exact changed surface;
8. canonical QA passes;
9. the active recovery branch/preview/release controls are followed;
10. accepted production lineage remains traceable.

## Deployment rule during P0 recovery

The older generic sequence `CURRENT MAIN → FOCUSED CHANGE → ... → PRODUCTION` is **superseded during this incident**.

Current technical route:

**EXACT VERIFIED BLOCKER → PM4 CHANGE-ADMISSION → ACCEPTED RECOVERY LINEAGE → FOCUSED RECOVERY CHANGE → QA → ISOLATED PREVIEW → VERIFY PROTECTED TOP UNCHANGED → P0 RELEASE GATE → PRODUCTION → CANONICAL SMOKE → DURABLE RECEIPT.**

`main` remains evidence/work pool rather than deployment authority until the recovery plan deliberately converges it.

If protected top changes at all, do not release under this work order.

## Reopen condition

This work order may resume as an independent normal feature/commerce work order only after:

1. P0 recovery gates pass;
2. PM4 recommends freeze release;
3. Casey explicitly releases/modifies the feature freeze;
4. the canonical Work Board/Registry/Worktree are reconciled to the reopened state.

## Control phrase

**BUSINESS INTENT PRESERVED → NON-CODE COMMERCE CONTINUES → WEBSITE MUTATION ROUTES THROUGH PM4/P0 → PROTECTED TOP NO-TOUCH → NO PARALLEL DEVELOPER WORKTREE → NORMAL FEATURE WORK WAITS FOR FREEZE RELEASE.**
