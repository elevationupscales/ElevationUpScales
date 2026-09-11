# Elevation UpScales — Renogy Tailored Project Workflow

**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Owner:** Casey Young  
**Project Operations Manager:** Renogy Branch Operations Manager  
**Project Specialist:** Renogy Project Specialist — verification / reconciliation / source intelligence  
**Human Ecommerce Oversight:** Peter Torres  
**Status:** ACTIVE  
**Project Source:** `vendor-project-sources/RENOGY_PROJECT_SOURCE.md`  
**Controlling SOP:** `RENOGY_VENDOR_MASTER_SOP.md`

## Project outcome

Turn the approved Renogy dealer relationship into a repeatable direct-site commerce lane using verified Renogy source data, MAP/channel controls, supplier fulfillment, and first-order proof without exposing private dealer information or inventing missing product facts.

## Verified starting state

- Elevation UpScales is an approved Renogy Dealer Partner.
- Partner Portal access exists.
- Direct website sales are the verified authorized channel; third-party marketplace sales are not authorized under the current supplier information.
- Direct-to-customer dropshipping is supported.
- Renogy previously stated free shipping within the 48 contiguous U.S. states and no minimum opening order.
- A consolidated post-approval request for MAP/catalog/media/inventory/fulfillment/warranty integration inputs has already been sent. Do not duplicate it while active.
- Renogy has already been added as a first-class source/supplier/filter in the existing Admin Catalog structure; this is preparation, not product-level approval.

## Unified project team

### Project Operations Manager

The Renogy Branch Operations Manager owns the Renogy worktree and may directly execute routine, already-authorized Renogy work including:

- Partner Portal/source intake;
- organizing and classifying Renogy files/data;
- routine supplier/account verification;
- routine authorized Renogy correspondence in the existing thread;
- public-safe Renogy project-state updates;
- direct-site catalog preparation using verified facts;
- receipts and next-action control.

The manager routes specialist verification or shared Catalog/Developer/Fulfillment work only when that bounded handoff improves accuracy, safety, capability or speed.

### Project Specialist

The Renogy Project Specialist owns project-specific depth:

- MAP/source validation;
- exact SKU/model reconciliation;
- catalog/feed interpretation;
- media/spec/manual verification;
- inventory/sellability-source verification;
- fulfillment/warranty/returns fact reconciliation;
- EXACT / ESTIMATE / UNKNOWN classification when useful;
- change-impact findings returned to the Project Operations Manager.

### Shared workers

Catalog, Developer, Fulfillment, Communications or other shared workers enter Renogy only through a bounded Renogy handoff and return to their owning lane afterward.

## Tailored operating sequence

### 1 — GIT / PROJECT SOURCE / WORKTREE PICKUP

Resolve current `main`; read the Renogy row on `CURRENT_WORK_BOARD.md`, `vendor-project-sources/RENOGY_PROJECT_SOURCE.md`, this workflow, `RENOGY_VENDOR_MASTER_SOP.md`, and only the current Renogy source/correspondence needed for the action.

Identify the last verified Renogy action and next executable Renogy action. If a prior worker/chat/branch was interrupted, resume only the unfinished action rather than rebuilding completed dealer/onboarding work.

### 2 — PORTAL + SOURCE INTAKE

Use the Partner Portal and supplier-provided package first.

Recover or receive:

- MAP policy / price-control source;
- SKU/product catalog data;
- inventory/availability source;
- approved media/spec/manuals;
- dropship ordering/tracking process;
- warranty/RMA/returns process;
- account/integration contacts.

Do not ask Renogy to repeat information already present in its portal/package.

Update the Renogy Project Source when a material onboarding/readiness fact changes.

### 3 — SOURCE NORMALIZATION

For each candidate SKU establish:

**EXACT SKU/MODEL → VERIFIED PRODUCT FACTS → MAP/PRICE CONTROL → SELLABILITY SOURCE → APPROVED MEDIA → FULFILLMENT STATE → DIRECT-SITE CHANNEL**

Keep protected dealer cost/private inventory evidence outside public Git.

### 4 — LAUNCH-WAVE SELECTION

Prioritize complementary system products:

- solar panels/kits;
- MPPT controllers;
- DC-DC charging;
- inverter/chargers;
- monitoring/power management;
- wiring/protection/BOS;
- RV/mobile/off-grid system components.

Renogy batteries may be evaluated only where a defined product/capacity/commercial/logistics gap exists; SOK remains the primary battery relationship.

### 5 — BUILD / STAGE

Use the existing Elevation catalog/store systems.

The Project Operations Manager may prepare records directly from verified sources. Route code/integration work to the shared Developer only when code change is actually required.

No Renogy SKU leaves draft/staging without the minimum verified publication set.

### 6 — MAP / CHANNEL / SELLABILITY QA

Before publication verify:

- exact SKU/model;
- current MAP/advertising-price rule;
- current sellability/source;
- approved media/product facts;
- normal fulfillment state;
- ElevationUpScales.com as the authorized channel.

If one item cannot be verified, hold only that SKU/action.

### 7 — DIRECT-SITE PUBLICATION

Publish only verified Renogy SKUs to the direct website. Verify live public price, product identity, presentation and purchase path after publication.

No marketplace publication without later written supplier authorization.

### 8 — FIRST REAL ORDER PROOF

Use:

**CUSTOMER ORDER → EXACT SKU REVERIFY → MAP/PRICE CHECK → RENOGY AVAILABILITY → PARTNER PORTAL PURCHASE → SUPPLIER ACCEPTANCE → TRACKING → CUSTOMER UPDATE → DELIVERY → ACTUALS / RECEIPT**

The absence of a first order is not a blocker to additional safe Renogy catalog work.

### 9 — WARRANTY / RETURNS PROOF

Route warranty claims through Renogy's Warranty Team and preserve supplier authorization requirements. Customer-facing promises must not exceed current written Renogy terms.

### 10 — REFRESH / SCALE

After proof:

- establish repeatable MAP/data/media/inventory refresh;
- expand verified catalog waves;
- improve system-builder/collection fit;
- retain only products that fit real Elevation demand and operating economics.

## Worktree continuity + documentation

Material Renogy state must be recoverable from the Work Board + Renogy Project Source + this workflow/master SOP.

Document material changes such as:

- portal/account/source status;
- MAP/channel changes;
- product-source/media/inventory source arrival;
- launch-wave completion;
- first-order proof;
- warranty/returns exception;
- gate or maturity changes.

Do not create management records for routine source inspection that does not change state.

After COMPLETE / WAITING / VERIFYING / HOLD, automatically select the next safe unresolved Renogy item. If none exists, return capacity upward rather than taking another project.

## Gate maturity

### Stage 1 — PROVING — CURRENT

Renogy is approved, but source integration/catalog/first-order proof remains in PROVING.

Keep first-path verification for exact SKU, MAP, source/sellability, approved media, direct-site channel and first supplier order.

### Stage 2 — CONTROLLED

After a verified source/update path, compliant catalog and clean first order:

- do not recreate dealer application/W-9/approval/portal setup;
- routine Renogy direct-site catalog/order work uses targeted current SKU/MAP/sellability checks;
- source refresh and exceptions drive additional review.

### Stage 3 — MATURE / EXCEPTION-BASED

After repeatable clean source refresh/orders/returns handling, normal already-authorized Renogy work proceeds by default; management attention focuses on changed MAP/channel/source facts and material fulfillment/warranty exceptions.

If one SKU/source/order fails, reopen only that affected control unless evidence proves a broader Renogy process failure.

## Waiting behavior

While waiting on Renogy's source package/reply, the project may continue:

- schema/catalog preparation that uses no invented product facts;
- project source organization;
- existing Portal/source inspection;
- direct-site control preparation;
- first-order receipt/process preparation;
- other verified Renogy-only tasks.

External waiting does not authorize work in another project.

## Real gates

Block only the affected lane for:

- unverified MAP/price control;
- uncertain exact SKU/model;
- unverified current sellability;
- unapproved media/product facts;
- unsupported destination/shipping path;
- marketplace publication;
- payment/customer obligation;
- supplier authorization/compliance issue.

Do not preserve completed dealer application, W-9 correction, supplier approval, portal creation or no-MOQ verification as recurring gates.

## Owner gates

Return to Casey for:

- material inventory/bulk commitments;
- unusual financing/credit obligations;
- exclusivity/contracts;
- material channel expansion;
- intentional supplier-policy exceptions;
- material Hawaii/Alaska/DG liability commitments;
- other binding commercial/legal commitments.

## Close / proof condition

Renogy reaches repeatable operating state when:

1. source/MAP/media/inventory refresh path is established;
2. verified products are live on ElevationUpScales.com;
3. one real paid order completes supplier purchase through delivery;
4. warranty/returns path is operationally known;
5. refresh and expansion can continue without recreating onboarding.

## RUN

**RENOGY GIT CHECK → READ RENOGY PROJECT SOURCE → PICK UP UNFINISHED RENOGY WORKTREE → PROJECT MANAGER EXECUTES ROUTINE SAFE WORK OR ROUTES BOUNDED RENOGY TASK → SPECIALIST VERIFIES → DOCUMENT MATERIAL DELTA → CONTINUE NEXT RENOGY ITEM**

## Return

**RENOGY COMPLETED:**  
**RENOGY CURRENT:**  
**RENOGY WAITING/BLOCKED:**  
**RENOGY MATURITY / GATE CHANGE:**  
**RENOGY OWNER GATE:**  
**RENOGY NEXT:**  
**ROUTE REQUIRED:**
