# Elevation UpScales — Renogy Vendor Master SOP

**Status: ACTIVE / CONTROLLING RENOGY PROJECT LANE**  
**Version: 1.2**  
**Effective: 2026-09-10**  
**Last reconciled: 2026-09-10**  
**Owner: Casey Young**  
**Human Ecommerce Manager: Peter Torres**  
**Project Manager:** Renogy Branch Operations Manager  
**Scope:** **RENOGY PROJECT ONLY — NOT COMPANY-WIDE**  
**Parent:** `MANAGEMENT_OPERATING_SOP.md`, `OWNER_RUN_COMMAND_EXECUTION_PROTOCOL_2026-09-10.md`, and `VENDOR_ONBOARDING_AND_CATALOG_MERGE_SOP.md`

## Purpose

Establish one controlled operating source for the approved Renogy dealer relationship, catalog, MAP/channel, ecommerce and fulfillment lane without creating a duplicate company priority system or restarting completed dealer-application work.

Renogy is already beyond prospecting and application review. The operating objective is:

**APPROVED → PORTAL → SOURCE INTAKE → NORMALIZE → BUILD → MAP / CHANNEL QA → PUBLISH → FIRST ORDER PROOF → SCALE**

This SOP is public-safe. Protected dealer pricing, portal credentials, tax documents, private supplier correspondence, raw inventory counts, payment information and other confidential commercial evidence stay outside the public repository.

**THIS SOP CONTROLS RENOGY WORK. READING IT DOES NOT ASSIGN RENOGY WORK TO OTHER COMPANY MANAGERS OR WORKERS.**

## 1. Authority and role fit

Use the existing company authority chain:

**CASEY → OPERATING SYSTEM PROJECT MANAGER → COMPANY OPERATIONS → PETER TORRES / ECOMMERCE & VENDOR OPERATIONS → RENOGY BRANCH OPERATIONS MANAGER → ASSIGNED RENOGY WORKERS**

- Casey's newest explicit direction controls.
- `CURRENT_WORK_BOARD.md` controls global priority and unresolved state but does not reassign workers across projects.
- Company Operations owns cross-project company-operational routing.
- Peter Torres remains the Human Ecommerce & Vendor Operations Manager for vendor execution/oversight.
- The **Renogy Branch Operations Manager** owns day-to-day coordination of the Renogy project worktree and keeps assigned Renogy workers inside the Renogy lane.
- This file is the single Renogy-specific master SOP. Do not create parallel Renogy SOPs, manager boards or duplicate qualification projects.
- Workers execute routed Renogy actions and return evidence/state. They do not self-approve policy changes outside their assigned lane.

## 1A. Renogy project-lane containment

The Renogy project is a dedicated project lane, not a company-wide task.

The Renogy Branch Operations Manager must:

1. keep Renogy-assigned workers focused on Renogy work;
2. route each Renogy worker only a bounded Renogy work item;
3. prevent duplicate Renogy workers from all performing the same task unless deliberate parallel sub-work was explicitly assigned;
4. use one worker/result as the controlling execution path for each work item whenever possible;
5. return out-of-scope findings to the Operating System Project Manager / Company Operations Manager as **ROUTE REQUIRED** rather than executing them;
6. release shared specialists back to their owning lane after the specific Renogy handoff is complete;
7. mark Renogy work WAITING/HOLD when its real dependency is external rather than filling idle Renogy capacity with unrelated company work.

### Assigned Renogy work includes

- Partner Portal/source intake;
- Renogy product/SKU normalization;
- Renogy MAP and price-control verification;
- Renogy direct-site channel controls;
- Renogy approved media/spec/manual intake;
- Renogy fulfillment/order-path definition;
- Renogy warranty/RMA and returns process;
- Renogy catalog/staging implementation;
- Renogy first-order proof and subsequent supplier-specific operating evidence.

### Not Renogy work unless explicitly handed in

- SOK warranty, SOK logistics or SOK product tasks;
- VEVOR onboarding/catalog/order tasks;
- Kingboss onboarding;
- eBay or TikTok general operations;
- company-wide Shopify administration;
- unrelated Hawaii logistics/provider work;
- generic catalog/developer backlog;
- company-wide management/SOP cleanup;
- another project's customer/order/fulfillment task.

A shared Catalog/Developer/Fulfillment/Communications worker may enter the Renogy project only through an explicit bounded handoff. The Renogy manager owns the Renogy requirement and acceptance result; the shared worker does not become a permanent Renogy worker and the Renogy manager does not gain control of that worker's unrelated queue.

### RUN interpretation for Renogy

When Casey says **RUN** inside the Renogy project/manager context:

**RUN = CONTINUE THE RENOGY WORKTREE.**

It does not mean:

- run the highest global board item;
- have every company manager perform the Renogy task;
- have Renogy workers perform other projects while Renogy waits;
- convert this SOP into a company-wide assignment.

If Renogy has no executable work, return:

**RENOGY: WAITING / NO EXECUTABLE PROJECT WORK → RETURNED FOR OS/COMPANY OPERATIONS ROUTING**

## 2. Current verified supplier state

- Elevation UpScales, Inc. is an approved **Renogy Dealer Partner**.
- Renogy created a Partner Portal account for `casey@elevationupscales.com`.
- Dealer pricing is provided through the Renogy Partner Portal and is protected commercial information.
- Renogy products may be sold through Elevation's own website.
- Renogy stated its products are not permitted to be sold on third-party ecommerce platforms or marketplaces.
- Renogy supports direct-to-customer dropshipping.
- Renogy stated shipping is free within the 48 contiguous U.S. states.
- Renogy stated there is no minimum opening order requirement.
- Renogy stated inventory/catalog data and marketing assets can be provided after dealer approval.
- Renogy warranty claims route through its Warranty Team; covered defective products may receive replacement or refund.
- Renogy stated customer-related returns have a 30-day return policy. If Renogy supplies the return label, the label cost may be deducted from the refund. Elevation may arrange return shipment using another carrier when appropriate.
- Commercial/project pricing may be submitted for approval depending on volume and project requirements.
- Reseller certificates may be uploaded through the Partner Portal; tax treatment follows Renogy's review/approval.

Do not infer Hawaii, Alaska, marketplace, dangerous-goods, battery-freight or other special-route authorization from ordinary dealer approval.

## 3. Immediate source-intake lane

The current external request has already been sent. Do **not** send a duplicate request while that request is active.

Requested integration essentials:

1. current MAP policy;
2. current MAP/product-price file or update mechanism;
3. structured SKU/product catalog feed;
4. supplier inventory/availability source;
5. approved product images and marketing media;
6. logo/brand-use guidance;
7. manuals/spec sheets;
8. dropship ordering instructions;
9. tracking and fulfillment handoff process;
10. warranty/RMA contact/process;
11. assigned account manager and catalog/integration contact;
12. CSV/XLS/API/image-library source if available.

Vendor-facing simplicity applies: if Renogy's Partner Portal or dealer package already contains the needed source, use it rather than asking Renogy to repeat the same facts manually.

## 4. Catalog normalization standard

Create one normalized Renogy source record per sellable SKU using the existing Elevation catalog owner rather than a new product master.

Minimum public-safe/internal fields should include:

- supplier = Renogy;
- manufacturer SKU/model;
- product title;
- category;
- core technical specifications needed for correct merchandising;
- compatibility/use-case notes where verified;
- MAP or applicable advertising-price control;
- customer selling price;
- supplier availability state;
- preorder/backorder state;
- backorder eligibility source;
- expected availability/restock date when Renogy provides one;
- fulfillment method;
- shipping treatment;
- approved media reference;
- exact-SKU warranty term/reference;
- performance warranty reference where applicable;
- warranty/RMA source;
- returns reference;
- source pointer;
- last-verified timestamp;
- approved channel = ElevationUpScales.com / direct website.

Protected dealer cost remains outside public Git and customer-visible fields.

Supplier inventory is separate from Elevation physical On Hand. Never represent Renogy supplier inventory as Elevation-owned inventory unless Elevation actually owns/controls the stock.

## 5. MAP and price control

Before first publication and before a material customer-price change:

1. confirm exact Renogy SKU/model identity;
2. verify the applicable current MAP requirement or other written advertising-price control;
3. verify current product sellability/source;
4. set the customer price at or above the applicable control using protected economics outside public Git;
5. record the public-safe verification date/source pointer;
6. verify the live storefront price after publication/change.

If MAP cannot be verified reliably, hold only that SKU/price action and continue other verified Renogy work.

Do not use coupons, bundles, gifts, compare-at pricing, automatic discounts or other mechanics to bypass Renogy pricing policy.

## 6. Channel control

Current verified channel rule:

**RENOGY DIRECT DEALER INVENTORY → ELEVATIONUPSCALES.COM ONLY**

Do not publish direct Renogy dealer inventory to Amazon, Walmart, eBay, TikTok Shop or other third-party marketplaces unless Renogy later provides written authorization for the specific channel.

A marketplace restriction blocks that marketplace only; it does not block an otherwise verified Elevation direct-site sale.

## 7. Initial catalog focus

Prioritize Renogy products that complement Elevation's existing battery and off-grid-power strategy:

- solar panels and kits;
- MPPT controllers;
- DC-DC charging;
- inverter/chargers;
- monitoring and power-management products;
- wiring, protection and balance-of-system accessories;
- RV/mobile/off-grid system components.

Renogy battery products may be evaluated, but generic battery duplication does not displace SOK's primary battery role without a defined product, capacity, commercial, availability or logistics gap.

## 8. Build and coding workflow

Coding/catalog preparation may begin before every optional enrichment asset arrives.

Safe pre-source work includes:

- Renogy supplier/source identity;
- normalized product schema mapping;
- direct-site-only channel enforcement;
- MAP-control field/validation hooks;
- supplier-vs-On-Hand inventory separation;
- preorder/backorder state mapping;
- exact-SKU warranty and RMA field mapping;
- media-slot mapping;
- warranty/returns source field;
- last-verified markers;
- first-order fulfillment receipt structure;
- Renogy collection/category structure using existing store/catalog systems.

Do **not** fabricate unverified MAP, dealer cost, stock, preorder/backorder authority, SKU specifications, product images, shipping beyond the verified Lower-48 statement, special-route fulfillment or marketplace authorization.

A Renogy SKU may leave draft/staging only when the minimum safe publication set is verified:

**EXACT SKU/MODEL + APPROVED PRODUCT FACTS + CURRENT MAP/PRICE CONTROL + CURRENT SELLABILITY + APPROVED MEDIA + NORMAL FULFILLMENT STATE OR VERIFIED PREORDER/BACKORDER STATE + APPROVED DIRECT-SITE CHANNEL**

Missing nonessential enrichment blocks only that enrichment, not code work or another fully verified Renogy SKU.

## 9. Normal order / fulfillment flow

Use:

**CUSTOMER ORDER → ELEVATION CHECKOUT → EXACT SKU REVERIFY → MAP/PRICE CHECK → RENOGY AVAILABILITY → PARTNER PORTAL PURCHASE → SUPPLIER ACCEPTANCE → TRACKING → CUSTOMER UPDATE → DELIVERY → ACTUALS**

Before supplier placement, verify:

- exact Renogy SKU/model;
- current supplier availability or verified preorder/backorder state;
- current customer-price/MAP compliance;
- correct tax treatment at checkout;
- verified shipping treatment for the destination;
- normal order path in the Renogy Partner Portal.

Renogy's stated free dropship shipping applies to the 48 contiguous U.S. states under the verified current dealer information. Treat destinations outside that scope separately until qualified.

Do not manufacture a management gate around the absence of a first order. Keep the first-order proof item open and continue other safe **Renogy** catalog work.

## 9A. Preorder / backorder control — LOCKED

Renogy preorder/backorder is **SKU-specific**, not a blanket permission for all unavailable products.

Use the following controlling states for Renogy supplier availability:

- **IN_STOCK** — current verified Renogy source supports ordinary purchase/fulfillment.
- **PREORDER** — the exact SKU is explicitly offered by Renogy for preorder.
- **BACKORDER** — the exact SKU is explicitly offered/accepted by Renogy for backorder, including a supplier-provided expected availability date when available.
- **OUT_OF_STOCK_NOT_ORDERABLE** — unavailable and no verified Renogy source supports a paid future order.
- **UNKNOWN_HOLD** — current sellability/backorder state cannot be verified reliably.

### Backorder authorization rule

**AN UNAVAILABLE RENOGY SKU IS NOT AUTOMATICALLY BACKORDERABLE.**

Set `backorder_allowed = true` only when the exact SKU is supported by one of these current Renogy sources:

1. Renogy explicitly labels the exact SKU as **Pre-order** or **Back Order**;
2. the Renogy Partner Portal/order path explicitly accepts the exact unavailable SKU for future fulfillment; or
3. current written Renogy dealer/account guidance explicitly authorizes backorder/preorder for that exact SKU or defined product set.

A generic out-of-stock state, historic restock pattern, estimated supplier availability, public product existence, or another Renogy SKU's preorder/backorder status is not enough.

### Checkout behavior

- **IN_STOCK:** normal paid checkout may remain enabled when all other controls pass.
- **PREORDER / BACKORDER:** paid checkout may remain enabled only when the exact SKU has verified Renogy future-order support and the customer presentation clearly communicates the delayed/preorder state without promising an unsupported delivery date.
- **OUT_OF_STOCK_NOT_ORDERABLE / UNKNOWN_HOLD:** do not accept a paid order for that SKU through the Renogy fulfillment path until the state is resolved.

A later Partner Portal rule may broaden or narrow backorder eligibility. Current Partner Portal/written supplier evidence controls supplier-order execution. Protected dealer evidence stays outside public Git; this SOP records only the public-safe rule.

## 10. Warranty and returns — LOWER 48 PROGRAM CONTROL

Renogy warranty is **exact-SKU driven**. Do not apply one generic Renogy warranty period across the catalog or infer a warranty solely from product category.

The Lower-48 Renogy catalog must maintain, where applicable:

- exact manufacturer SKU/model;
- applicable written limited-warranty term;
- prorated/non-prorated treatment where stated;
- separate performance warranty where applicable;
- original-purchaser/registration/order-proof requirements where stated;
- diagnostic/technical-assessment requirements;
- RMA/return-authorization requirements;
- warranty exclusions/material limitations needed for correct customer handling;
- current Renogy warranty source/version;
- last-verified date.

The current Renogy warranty source contains materially different warranty terms across and within product families. Therefore:

**NO RENOGY SKU MAY RECEIVE A CUSTOMER-FACING WARRANTY TERM FROM CATEGORY ASSUMPTION, MEMORY, OR ANOTHER SKU.**

### Warranty claim operating flow

Use:

**CUSTOMER CLAIM → ELEVATION ORDER / EXACT SKU VERIFY → WARRANTY SOURCE VERIFY → REQUIRED EVIDENCE → RENOGY TECHNICAL ASSESSMENT → RENOGY WARRANTY DETERMINATION → RMA / AUTHORIZATION WHEN REQUIRED → AUTHORIZED REPAIR / REPLACEMENT / REFUND PATH → CUSTOMER UPDATE → RECEIPT / CLOSE**

Operational rules:

- route Renogy warranty claims through Renogy's Warranty Team/current authorized support route;
- preserve supplier diagnostic, troubleshooting, evidence and authorization requirements;
- capture the exact SKU and applicable warranty source before representing coverage;
- do not promise replacement, refund, repair, shipping reimbursement or a specific resolution before Renogy's current process supports it;
- replacement equipment does not automatically create a new full warranty term unless Renogy's written terms expressly provide one;
- Elevation customer-facing promises must never exceed current written Renogy warranty terms;
- preserve all material exclusions and installation/use limitations that affect claim eligibility;
- use the current controlling Renogy warranty document/source when terms conflict with older pages or prior assumptions.

### Customer returns

- use Renogy's current 30-day return policy as the supplier reference unless a more specific current written product/order rule controls;
- if Renogy's return label is used, account for the stated label-cost deduction from refund;
- another carrier may be used when operationally appropriate and supported;
- do not represent a normal return as a warranty approval or a warranty claim as an automatically approved return;
- customer-facing promises must not exceed current written supplier terms.

### Warranty catalog build priority

For the Lower-48 catalog, build warranty coverage in exact-SKU batches alongside sellability/availability verification:

**EXACT SKU → CURRENT AVAILABILITY/BACKORDER STATE → CURRENT WARRANTY TERM → PERFORMANCE WARRANTY IF APPLICABLE → RMA/WARRANTY SOURCE → LAST VERIFIED**

An unverified warranty term blocks only the warranty representation/affected SKU publication requirement; it does not authorize guessing and does not block unrelated verified Renogy SKU work.

## 11. Change control

Use the smallest safe revision.

When a verified Renogy fact changes:

1. identify the exact affected rule/SKU/channel;
2. preserve protected source evidence outside public Git;
3. update only the Renogy procedure/workstream that changed;
4. update the supplier map and current work board when the global state materially changes;
5. route implementation to the responsible **Renogy-assigned worker or explicit shared-specialist handoff**;
6. verify implementation;
7. continue the next unblocked **Renogy** action.

Do not rebuild this SOP for routine file arrivals. Update this master only when a material Renogy operating rule changes.

## 12. Owner gates

Routine source intake, catalog normalization, direct-site product activation, compliant MAP execution, verified SKU-specific preorder/backorder execution, ordinary warranty administration, and ordinary Renogy fulfillment are Operations work inside the Renogy project.

Return to Casey for genuine owner commitments including:

- material inventory/bulk-purchase commitments;
- unusual financing or credit obligations;
- exclusivity or contracts;
- material channel expansion;
- intentional exceptions to established Renogy MAP/channel/backorder rules;
- customer compensation or warranty promises beyond current written Renogy support;
- Hawaii/Alaska or dangerous-goods commitments that create material liability/cost;
- other material legal/commercial commitments.

## 13. Public-repository protection

This repository is public. Never commit:

- Renogy dealer/wholesale cost;
- Partner Portal credentials or verification codes;
- signed tax documents or private tax identifiers;
- private supplier correspondence;
- raw supplier inventory counts;
- private payment terms;
- customer PII;
- credentials, secrets or tokens.

Use public-safe status, rules and source references only.

## 14. Current execution state

**APPROVED / ACTIVE DEALER → DATA, COMMERCE, BACKORDER & WARRANTY INTEGRATION IN PROGRESS**

Current Renogy next actions:

1. use Partner Portal access without exposing credentials;
2. receive/locate MAP, catalog, inventory and approved-media sources;
3. normalize source data into the existing catalog model;
4. map Lower-48 exact SKUs to current availability/preorder/backorder state;
5. map Lower-48 exact SKUs to current written warranty/RMA terms;
6. start direct-site Renogy catalog implementation for verified SKUs;
7. prove the first real paid Renogy order end-to-end;
8. prove the first real Renogy warranty/RMA case when one occurs;
9. expand only from verified sell-through and operating evidence.

## 15. Manager return rule

The Renogy Branch Operations Manager returns one concise project state:

**RENOGY COMPLETED:** Renogy work actually finished.  
**RENOGY WAITING/BLOCKED:** exact Renogy dependency only.  
**RENOGY NEXT:** next executable Renogy action, or `NONE — RETURN CAPACITY FOR ROUTING`.  
**OUT-OF-LANE FINDING:** route upward; do not execute.  
**NEEDS CASEY:** genuine owner decision only.
