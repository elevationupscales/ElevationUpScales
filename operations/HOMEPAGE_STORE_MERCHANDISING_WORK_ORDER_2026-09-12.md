# ELEVATION UPSCALES — HOMEPAGE STORE MERCHANDISING WORK ORDER

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**State:** ACTIVE / BOUNDED DEVELOPER ROUTE  
**Parent:** `COMMERCIAL_REVENUE_ACCELERATION_DIRECTIVE_2026-09-12.md` + `COMPANY_OPS_COMMERCIAL_SWEEP_WORKTREE_2026-09-12.md`  
**Execution Lane:** MASTER DEVELOPER  
**Management:** PM4 / Company Operations  

## Owner boundary — hard lock

The homepage hero is **NO TOUCH, PERIOD**.

This work order does **not** authorize any change to:

- homepage hero layout;
- homepage hero images;
- homepage hero text/copy;
- homepage hero buttons/CTA text or destination;
- homepage hero SOK products;
- hero scripts/slides;
- homepage typography, colors, spacing, or visual design;
- existing printed/customer-facing copy anywhere on the homepage.

Do not edit `site/index.html` or `site/home-commerce.js` for this work order. Treat current live hero/runtime output as frozen.

## Authorized surface

Homepage **store merchandising outside the hero** is authorized using the existing `Shop the Store` product-card system only.

Current architecture already supports this safely:

`homepage existing store section → home-commerce.js → GET /api/store/featured → existing cards`

The current endpoint returns the first six eligible catalog records after catalog ordering. Because the public catalog is ordered by recent catalog update time, homepage merchandising can drift toward recently edited products rather than commercially cleared products.

This work order exists to correct **selection**, not presentation.

## Technical scope

Preferred implementation target:

- `site/_worker.js`
- specifically the `/api/store/featured` selection logic only.

Avoid changes to HTML/CSS/homepage scripts unless a proven technical necessity is escalated first.

## Merchandising control

The homepage store rail must not automatically treat "recently updated" as "best product to promote."

Use an explicit, deterministic featured-product control compatible with current commercial-sweep ownership.

Recommended bounded pattern:

1. preserve the existing API response shape (`{ lithium: [...], rv: [...] }`);
2. preserve existing card count limit and UI rendering;
3. make product selection deterministic from an explicit approved featured list / priority control rather than catalog update time;
4. never infer promotion approval from product title, vendor name, catalog recency, or gross selling price alone;
5. if an approved featured candidate is no longer safely public/orderable, omit only that product and continue with the next approved clean candidate;
6. do not introduce a new customer-facing label, badge, banner, copy block, design component, or hero element.

A small public-safe config/allowlist is acceptable if it contains only non-confidential product identifiers/order and no protected supplier economics.

## Company Operations product gate

A non-SOK product may enter the homepage featured list only after its owning lane returns `PROMOTE` under the commercial sweep with material facts resolved:

- exact source/SKU;
- current availability/orderability;
- current customer price/MAP;
- current source cost kept in protected source when confidential;
- shipping/freight treatment;
- applicable payment/channel costs;
- positive expected contribution;
- low/controlled working-capital requirement;
- reliable fulfillment path;
- exact working checkout/product path.

`VERIFY`, `REPRICE`, `HOLD`, `RETIRE`, unknown current cost, unresolved shipping, or unresolved fulfillment = **not eligible for concentrated homepage placement**.

## SOK carve-out

SOK remains protected under `OWNER_DIRECTIVE_SOK_PROTECTION_2026-09-12.md`.

Current SOK homepage presentation and SOK hero are not to be changed by this work order.

Existing SOK featured/store products may remain if already safely public under the SOK Project. Do not use this task to reprice, deactivate, rebuild, or contract SOK.

## Current live `/api/store/featured` snapshot reviewed during RUN

### Lithium rail

- `sok-sk12v100pc` — KEEP / protected existing SOK lane.
- `sok-sk48v100n` — KEEP / protected existing SOK lane.
- `cat-01e78438-5fb8-4e0d-aaab-ffbe86f5cf77` — VERIFY / do not newly prioritize until Doba/current economics pass.
- `cat-ba15b95a-ab9c-49ba-be75-fc1b325f451e` — VERIFY / do not newly prioritize until Doba/current economics pass.
- `cat-5104ec49-cf2f-4d6c-beb4-52a0b6f0186c` — VERIFY / do not newly prioritize until Doba/current economics pass.
- `cat-336cf814-be3f-49fd-b574-0d0a39ac7312` — VERIFY / do not newly prioritize until Doba/current economics pass.

### RV / Outdoor rail

Current live cards include:

- `EUS-CAT-B9BEAF9D` — rechargeable spotlight;
- `EUS-CAT-3533989E` — 8L tankless water heater;
- `EUS-CAT-BBFED4E7` — walk-in greenhouse;
- `EUS-CAT-0E4EE8F0` — 12V electric scissor jack / impact wrench;
- `EUS-CAT-AAF23901` — 12V water diaphragm pump;
- `EUS-CAT-E0829C05` — 5.3-gallon metal fuel can.

These are **VERIFY pending current protected source cost / stock / shipping / fee / contribution return** from the owning VEVOR/Doba lane. Catalog presence alone is not homepage PROMOTE approval.

Do not delete them from the catalog. Homepage prominence and catalog availability are separate decisions.

## First approved replacement pool

Company Operations will feed product IDs into the explicit featured control as vendor/apparel lanes return `PROMOTE`.

Priority return order:

1. VEVOR — first 1–5 current positive-contribution, low-cash candidates;
2. Renogy — `RBM500-US`, then `RSP100DCT-US` independently when activated and cleared;
3. Doba — gap-fill only on current account-level economics pass;
4. Kingboss — only after differentiated SKU/commercial/compliance/fulfillment gates pass.

Apparel remains in its existing appropriate store/collection surfaces unless the current homepage store section is explicitly expanded by a newer owner instruction. This work order does not add a new homepage apparel section.

## Acceptance tests

Developer return must prove:

1. homepage hero DOM/source/runtime behavior unchanged from task baseline;
2. no homepage customer-facing copy changed;
3. no CSS/design files changed;
4. `/api/store/featured` keeps the same response contract;
5. featured selection is deterministic and management-controlled rather than recency-controlled;
6. unsafe/missing approved item fails closed without breaking the homepage store section;
7. product detail and Buy Now routes still resolve correctly;
8. mobile/desktop existing card layout remains unchanged;
9. canonical QA passes;
10. isolated preview confirms hero byte/visual behavior unchanged and only intended store-card population changes.

## Deployment gate

Normal coding workflow applies:

**CURRENT MAIN → FOCUSED BRANCH → QA → ISOLATED PREVIEW → VERIFY HERO UNCHANGED + STORE SELECTION ONLY → PM/OWNER RELEASE GATE AS REQUIRED → PRODUCTION → LIVE SMOKE.**

Do not deploy a homepage change that alters the hero, design, or printed copy under this authorization.

## Control phrase

**HERO NO TOUCH → DESIGN NO TOUCH → COPY NO TOUCH → EXISTING STORE CARDS ONLY → PROMOTE-CLEARED PRODUCTS CONTROL THE RAIL → CATALOG RECENCY DOES NOT.**
