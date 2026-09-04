# SOK 4.6 — FINAL COMMERCIALIZATION LIVE DEPLOYMENT DIRECTIVE

**Date:** 2026-09-04  
**Authority:** Elevation UpScales Management / Business Plan Management  
**Status:** APPROVED TO IMPLEMENT — FINAL PRODUCTION PROMOTION GATE REQUIRED

## Starting point

Continue from:

`work/sok-4-6-catalog-commercialization-2026-09-04`

Current approved branch head at review:

`7d81d247e1b74e93c720a19b92508deed430d84a`

Accepted production parent:

`3697f1d84e7c3f2e8f304a1472a8ea06ea67ee31`

Do not restart from older SOK, media, pricing, pre-purchase or catalog branches.

## Production truth to preserve

The following are accepted and must remain intact:

- SOK 4.6 runtime and catalog foundation
- `SK12V100PC` and `SK48V100N` existing public SOK records
- SOK pre-purchase and backorder states
- SOK local product media and local spec-sheet assets
- `AUTHORIZED SOK ENERGY DEALER` treatment
- current SOK MAP protections
- Pricing 2.0 protected-floor behavior
- PayPal/payment gates
- Hawaii standard-order operational maximum of 3 batteries
- quantity 4+ commercial review requirement
- carrier-acceptance and economics gates
- supplier/internal-data privacy boundary
- current promotion protections
- existing Doba / Kingboss products
- Marketplace and field-service intake architecture

Do not reopen completed SOK media/runtime work unless a regression is discovered.

## Superseded instruction

Any older instruction saying Elevation must not publicly use `Authorized SOK Energy Dealer` unless authorization is later received is superseded.

Authorization has been established and the treatment is already accepted in production.

**Preserve the Authorized SOK Energy Dealer claim.**

## Commercialization objective

Finish and release the customer-facing commercialization layer:

**`/sok-batteries` → Purchase Options → finished SOK product pages → merchandising → Hawaii routing → commercial inquiry → Solar Builder integration → analytics → MAP release validation**

Controlling customer sequence:

**CATALOG FIRST → PURCHASE OPTIONS SECOND → DIRECT CHECKOUT SKU-BY-SKU**

The storefront must feel commercially complete even when a SKU still requires assisted purchase or freight review.

---

# BUILD ORDER

## 1. `/sok-batteries` landing page

Create the dedicated customer-facing SOK collection route:

`/sok-batteries`

Keep it under the existing **Power / Lithium Batteries** information architecture.

Do **not** add SOK as a new global-navigation top-level item.

The page must:

- keep Elevation branding primary;
- show `Authorized SOK Energy Dealer`;
- surface `SK12V100PC` and `SK48V100N`;
- use official local media only;
- link official local spec sheets;
- use verified specifications;
- derive availability and CTA from current runtime state;
- expose commercial inquiry and Hawaii availability paths;
- remain ready for future SOK catalog expansion without a separate SOK database.

## 2. Finish Purchase Options

`PURCHASE_OPTIONS` must be a real assisted-buying flow, not a dead-end CTA.

Provide customer-safe actions:

- **Email Us About This Product**
- **Request Commercial Pricing**
- **Check Hawaii Availability**

Carry automatically where available:

- product name
- exact SOK SKU
- product URL
- quantity
- destination state / ZIP
- intended use
- residential / commercial context

Never expose:

- supplier cost
- supplier inventory count
- source URL
- internal warehouse routing
- internal carrier calculations
- Elevation margin
- internal PO state

## 3. Inquiry destination control

The public inquiry destination is the only unresolved Management input identified at this review.

**Do not invent or hardcode an email address.**

Implement the destination as a configurable environment / Admin-backed value using the safest existing configuration pattern available in the application.

Required behavior:

- build and test the inquiry UX now;
- keep the actual external-send destination configurable;
- if destination is missing in preview/test, show a controlled non-send state to Admin/QA rather than silently discarding inquiries;
- do not publish a broken `mailto:` link, blank form action or placeholder address;
- final production promotion requires a valid Management-confirmed destination unless an already-approved internal inquiry receiver is discovered and documented as authoritative.

This is a **final activation gate**, not a reason to stop implementation.

## 4. Product pages

Finish the two initial SOK product experiences.

### `SK12V100PC`

Position as the initial 12V consumer / RV / off-grid product.

### `SK48V100N`

Position as the primary 48V rack-storage / Solar Builder / Hawaii-commercial anchor.

Each page must present, when verified:

- exact model / SKU
- official local imagery
- product description
- voltage
- capacity Ah
- Wh / kWh
- dimensions / weight where customer-relevant and source-verified
- supported applications
- compatibility only where verified
- local official literature
- approved warranty wording only
- availability state
- public purchase mode
- Hawaii status
- commercial-order path

Do not use `Coming Soon` merely because direct checkout is incomplete.

## 5. Lithium-store merchandising

Keep the existing Lithium Battery Shop architecture.

Add SOK discovery and filtering without redesigning the store.

Useful customer lanes may include:

- 12V Lithium
- 24V / Higher Voltage
- 48V / Rack Storage
- Solar / Off-Grid Storage
- RV / Mobile Power
- SOK Energy
- Cabinets & Accessories only when actual products are ready

Do not activate cabinets as unrestricted purchasable products in this release.

## 6. Homepage merchandising

Do not replace the Elevation homepage hero.

Add restrained SOK merchandising in the existing lithium/current-products area.

Recommended treatment:

**Featured Battery Systems**  
**SOK LiFePO4 Batteries**  
For RV, solar, backup and off-grid power.

Feature `SK12V100PC` and `SK48V100N` first.

An approved cabinet/rack image may be used as system context, but cabinets themselves remain deferred from first-release commerce.

## 7. Hawaii product-aware routing

Preserve current Hawaii operational controls.

For SOK:

### Quantity 1–3

Use the authorized qualification path only when exact SKU/configuration has the necessary readiness.

### Quantity 4+

Always return:

**COMMERCIAL QUANTITY — FREIGHT REVIEW REQUIRED**

and route to commercial review.

For SOK Hawaii SKUs that are not yet fully carrier/economics qualified:

- keep the product visible;
- show **FREIGHT REVIEW REQUIRED** or **REQUEST HAWAII PURCHASE OPTIONS**;
- do not present direct Hawaii checkout;
- do not imply freight is included.

### Required copy correction

Remove any legacy SOK Hawaii wording that implies **Included Freight** unless that exact SKU/configuration has a separately approved all-in price.

Hawaii freight is not automatically included merely because the SOK product is cataloged.

## 8. Commercial inquiry remains permanent

Commercial inquiry must remain available even after a SKU becomes direct-checkout eligible.

This is required for:

- multi-battery orders
- quantity 4+
- retailer / contractor buyers
- recurring supply
- mixed loads
- future rack/cabinet systems
- Hawaii commercial opportunities

Do not force commercial buyers into ordinary consumer checkout.

## 9. Solar Builder

Do not rewrite the Solar Builder.

Add SOK deliberately:

- `SK12V100PC` for appropriate 12V / RV / small off-grid contexts;
- `SK48V100N` as the primary SOK 48V rack-storage anchor where compatible.

Capacity examples for `SK48V100N` may use exact arithmetic from 5.12kWh per unit:

- 1 = 5.12kWh
- 2 = 10.24kWh
- 3 = 15.36kWh
- 4 = 20.48kWh

Do not make unsupported electrical compatibility claims.

## 10. Analytics

Instrument only commercially meaningful SOK events using the existing analytics architecture.

At minimum capture:

- SOK landing page view
- SOK product detail view
- purchase-options opened
- commercial inquiry started/submitted
- Hawaii purchase-options started/submitted
- direct checkout initiated where applicable
- Solar Builder SOK recommendation selected where practical

Do not add low-value click telemetry.

## 11. MAP hard release gate

This release must not rely only on policy text.

Before production promotion, prove for every publicly sellable SOK SKU:

**effective public merchandise price >= current applicable SOK MAP**

Current known MAP references:

- `SK12V100PC` — `$319`
- `SK48V100N` — `$1,199`

Also prove:

- LABORDAY25 does not drive SOK merchandise below MAP;
- other active promotions cannot drive SOK merchandise below MAP;
- freight, Hawaii shipping, taxes and separately quoted commercial freight remain distinct from merchandise MAP handling.

If current authoritative Management/SOK pricing records differ, use the newer authoritative MAP record and document the source in the release receipt.

---

# EXPLICITLY DEFERRED

Do not add these to the critical path for this release:

- cabinet direct checkout
- full-pallet public checkout
- Alaska automation
- supplier PO automation
- ERP expansion
- broad URL rewrites
- new global-nav SOK top-level item
- mass SOK catalog import without verified data
- major storefront redesign

---

# ACCEPTANCE / RELEASE TESTS

Before asking for final production promotion, provide evidence that:

1. `/sok-batteries` returns 200 and renders normally.
2. SOK remains nested under Power / Lithium Batteries rather than global top-level navigation.
3. `SK12V100PC` appears with exact model, official local media and local literature.
4. `SK48V100N` appears with exact model, official local media and local literature.
5. Authorized SOK Energy Dealer branding remains present.
6. Product CTA derives from `public_purchase_mode`.
7. `PURCHASE_OPTIONS` produces a usable assisted-buying panel.
8. Inquiry context includes SKU/product context and excludes supplier/internal fields.
9. Missing inquiry destination cannot produce a broken public send path.
10. Commercial inquiry remains available for direct-checkout SKUs.
11. Hawaii SOK 1–3 behavior remains gated by exact qualification.
12. Hawaii SOK 4+ cannot enter normal payment.
13. Legacy SOK Hawaii `Included Freight` implication is removed.
14. Backorder/pre-purchase cannot bypass Hawaii carrier/economics/payment gates.
15. SK12V100PC public merchandise price passes current MAP.
16. SK48V100N public merchandise price passes current MAP.
17. Active promotions cannot drive either SOK SKU below MAP.
18. Pricing 2.0 protected floors remain PASS.
19. PayPal behavior outside intended SOK changes remains unchanged.
20. Existing Doba/Kingboss products remain intact.
21. Supplier cost, raw supplier inventory and internal routing remain non-public.
22. No SOK production media is hotlinked.
23. No compliance/MSDS/UN38.3 source packet becomes publicly exposed unless separately approved.
24. Homepage hero remains Elevation-first.
25. Mobile SOK landing/product/purchase-options layouts do not overflow or break.
26. Existing Lithium, Hawaii Lithium, Checkout, Solar Builder, Store, Home, Terms, Privacy and Admin smoke tests pass.
27. Analytics events are present without duplicate/spam instrumentation.
28. No unrelated architecture migration or broad rewrite is included.

---

# FINAL PRODUCTION PROMOTION PACKAGE

When implementation is complete, stop and return Management one release package containing:

- starting SHA
- final candidate SHA
- compare/diff summary
- exact changed files
- routes added/changed
- configuration added/changed
- inquiry-destination state
- MAP validation results
- promotion/MAP test results
- Hawaii gate test results
- product-mode tests
- data-exposure audit
- performance/mobile smoke results
- full regression result
- rollback commit
- production deployment plan

State exactly one of:

**READY FOR PRODUCTION PROMOTION**

or

**NOT READY — BLOCKER:** `<exact blocker>`

Do not promote to production until Management approves the final promotion package.

## Management release decision

**IMPLEMENTATION: APPROVED**  
**PREVIEW / TESTING: APPROVED**  
**PRODUCTION PROMOTION: FINAL APPROVAL REQUIRED**

The immediate goal is to get SOK commercially live without reopening completed architecture or weakening any protected commerce, MAP, Hawaii, payment, pricing or supplier-data boundary.