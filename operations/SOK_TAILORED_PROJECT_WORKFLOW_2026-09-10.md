# Elevation UpScales — SOK Tailored Project Workflow

**Project:** SOK Supplier / Commerce / Hawaii Logistics / Warranty  
**Owner:** Casey Young  
**Project Operations Manager:** SOK Project Operations Manager  
**Project Specialist:** SOK RECON OS — reconciliation / supplier-domain evidence / economics development  
**Parent Routing:** Operating System Project Manager + Company Operations Manager  
**Status:** ACTIVE  
**Project Source:** `vendor-project-sources/SOK_PROJECT_SOURCE.md`  
**Controlling Project Record:** `SOK_RECON_OS_PROJECT.md`

## Project outcome

Operate SOK as Elevation's primary authorized battery supplier with repeatable commerce, MAP/order control, Hawaii freight/storage development, and supplier-authorized warranty fulfillment while building commercial economics from verified evidence rather than assumptions.

## Verified starting state

- SOK is the active primary authorized battery supplier.
- Generic prospecting/requalification is closed.
- Supported preorder/backorder is authorized for temporarily out-of-stock SOK products, subject to supplier payment/reservation mechanics.
- Supplier stock is reserved only after payment confirmation.
- SOK supports Elevation taking an active warranty role for Elevation customers, with SOK retaining warranty authorization.
- Supplier replenishment of approved warranty-used replacement stock into later Elevation orders is supported in principle; consignment is not verified.
- Product media/specification material has been received through existing sources.
- The consolidated Hawaii warranty operating-input request has already been sent and is waiting on SOK. Do not duplicate it.
- Logistics Plus pricing/operating terms are separately waiting after Elevation supplied conservative planning inputs.
- H2O/Pasha backup-route pricing needs exact verified SOK packed shipment profiles for additional models; do not estimate missing cargo data.

## Unified project team

### Project Operations Manager

The SOK Project Operations Manager owns the SOK worktree and may directly execute routine, already-authorized SOK project work, including:

- routine project source intake/organization;
- ordinary SOK project correspondence already authorized by the worktree;
- commerce/order follow-through using verified SOK terms;
- warehouse/freight-provider coordination using verified SOK product/shipment facts;
- public-safe project-state/receipt maintenance;
- catalog/media coordination;
- routine warranty-case operating coordination after supplier authorization;
- moving to another unblocked SOK sub-item while one SOK dependency waits.

The manager does not create permanent commercial terms, reserve commitments or guaranteed service promises without the required evidence/owner gate.

### Project Specialist — SOK RECON OS

SOK RECON OS owns specialist depth:

- supplier-term reconciliation;
- SKU/product/MAP/channel fact verification;
- exact shipment-profile and logistics-evidence reconciliation;
- warranty-rule and replenishment evidence;
- EXACT / ESTIMATE / UNKNOWN classification;
- Hawaii storage/freight/warranty cost modeling;
- identification of remaining material unknowns;
- owner-review commercial-structure preparation.

The specialist returns execution-ready findings to the Project Operations Manager rather than taking over company-wide operations.

### Shared workers

Catalog, Fulfillment, Logistics, Developer, Communications and Warranty Fulfillment workers enter SOK only through a bounded SOK handoff and return to their normal lane afterward.

## Tailored operating sequence

### 1 — GIT / PROJECT SOURCE / SOK WORKTREE PICKUP

Resolve current `main`; read the SOK rows on `CURRENT_WORK_BOARD.md`, `vendor-project-sources/SOK_PROJECT_SOURCE.md`, this workflow, `SOK_RECON_OS_PROJECT.md`, and only the supplier/logistics evidence needed for the action.

Identify the last verified SOK action and next executable SOK action. If a prior worker/chat/branch was interrupted, resume only the unfinished action from durable state.

Do not recreate completed supplier requests, onboarding, or prior qualification.

### 2 — COMMERCE / MAP / PRODUCT CONTROL

For a customer-sale or catalog action verify:

**EXACT SOK SKU → CURRENT MAP/PRICE RULE → SUPPLIER SELLABILITY/ALLOCATION → AUTHORIZED ORDER MODE → SHIPPING DESTINATION PATH → CUSTOMER ORDER**

Supported preorder/backorder remains a valid SOK commerce mode when supplier terms allow it. Zero current stock is not itself a generic checkout blocker when the authorized preorder/backorder path applies.

Customer acceptance does not mean supplier stock is reserved; reservation follows SOK payment confirmation.

Update the SOK Project Source when a material onboarding/readiness fact changes.

### 3 — NORMAL ORDER PROOF

For paid SOK orders use:

**CUSTOMER ORDER → PAYMENT → EXACT SKU / ORDER MODE CHECK → SOK PLACEMENT → PAYMENT/ALLOCATION CONFIRMATION → SUPPLIER ACCEPTANCE → TRACKING → CUSTOMER COMPLETION → ACTUALS**

Do not create a false blocker from unrelated internal management status.

### 4 — HAWAII FREIGHT / STORAGE DEVELOPMENT

Advance verified provider work independently of the outstanding SOK warranty reply.

#### Logistics Plus

When pricing returns, extract protected internal operating costs for:

- receiving / DG handling;
- pallet-position storage;
- outbound release/fulfillment;
- will-call;
- Oahu delivery;
- Neighbor Island movement;
- minimum/account charges;
- current vs approved third-party warehouse structure.

Use the protected numbers in the SOK economics model; public Git records only status/decision.

#### H2O / Pasha

Use only manufacturer-verified packed dimensions, weights and shipment configurations. H2O handles Pasha coordination/paperwork. Never estimate cargo details merely to obtain a quote.

### 5 — WARRANTY AUTHORIZATION / CUSTOMER RESOLUTION

Use the shared Warranty Fulfillment lifecycle with SOK-specific authority:

**CUSTOMER CASE → EVIDENCE / TRIAGE → SOK AUTHORIZATION → APPROVED REPLACEMENT / PART ACTION → FAILED-UNIT CONTROL → REPLENISHMENT / RECONCILIATION → CUSTOMER CLOSEOUT → ACTUALS**

SOK decides warranty authorization. Elevation may release approved replacement stock only after the supplier authorization required by the applicable case.

### 6 — LOCAL WARRANTY STOCK / STORAGE MODEL

Track stock states distinctly:

**AVAILABLE → WARRANTY RESERVED → RELEASED / REPLENISHMENT DUE**

and separately:

**FAILED / QUARANTINE**

Failed/quarantine units are never available inventory.

Replenishment is verified in principle. Consignment is not verified and must not be claimed.

### 7 — OPERATING INPUT RECONCILIATION

When SOK replies to the existing consolidated request:

1. read the full existing thread;
2. extract each requested operating input;
3. classify as EXACT / ESTIMATE / UNKNOWN;
4. combine usable SOK inputs with verified warehouse/freight/storage inputs;
5. model true incremental and dedicated costs;
6. identify remaining material unknowns;
7. contact SOK again only if a missing fact materially prevents the model.

### 8 — COMMERCIAL MODEL / OWNER REVIEW

Use:

**CAPACITY ESTABLISHED → INPUTS RECEIVED → TRUE COST / VALUE MODELED → OPTIONS PREPARED → CASEY OWNER REVIEW → SUPPLIER COMMERCIAL COUNTERPROPOSAL / AGREEMENT**

Keep permanent commercial economics internal until sufficiently verified and owner-reviewed.

### 9 — PROOF / SCALE

Prove the repeatable SOK operating system through real commerce and real authorized warranty cases. Expand reserve/storage commitments only from evidence.

## Worktree continuity + documentation

Material SOK state must be recoverable from the Work Board + SOK Project Source + this workflow/project record.

Document material changes such as:

- supplier terms/MAP/channel/order-mode changes;
- product/media/compliance source changes;
- paid-order proof;
- Hawaii freight/storage provider terms/status;
- warranty authority/replenishment changes;
- owner-gated economics/commitment transitions;
- real gate/maturity changes.

Protected rates, supplier costs, raw inventory, correspondence and compliance packets remain outside public Git.

After COMPLETE / WAITING / VERIFYING / HOLD, automatically select the next safe unresolved SOK item. If none exists, return capacity upward rather than taking another project.

## Gate maturity

SOK maturity is lane-specific.

### Core supplier / Lower-48 commerce — CONTROLLED

The relationship, basic commerce rules, supported preorder/backorder model and supplier identity are already proven enough that generic qualification/onboarding must not recur.

Routine supported commerce uses targeted exact-SKU/MAP/order-mode/destination checks.

### Shopify live-order OS proof — PROVING

The technical bridge is merged; the first clean real purchase-to-OS/supplier/customer chain remains a proof step.

### Hawaii freight / warranty / storage — PROVING

Keep exact DG shipment data, provider acceptance, storage economics, supplier warranty authority and owner-gated commitments verified until the model is repeatable.

### Mature / exception-based target

After repeatable normal orders and proven warranty/logistics operation, routine SOK work proceeds by default; management focuses on changed MAP/source/allocation, carrier/DG exceptions, warranty exceptions and material commercial changes.

If one SKU, route, provider or warranty case fails, reopen only that affected control unless evidence proves a systemic SOK failure.

## Waiting behavior

While SOK waits externally, continue safe SOK-only work such as:

- Logistics Plus/H2O provider development;
- existing media/catalog integration;
- supported normal commerce/preorder execution;
- warranty-workflow preparation;
- exact shipment-profile reconciliation;
- protected cost-model structure;
- public-safe project-state cleanup.

Waiting on SOK does not authorize jumping to another project.

## Real gates

Block only the affected action for:

- missing exact SKU/MAP/order mode;
- unverified supplier allocation/reservation;
- warranty authorization not yet granted;
- missing exact DG/packed shipment data required for a freight quote;
- unsupported destination/shipping route;
- customer/payment obligation;
- material compliance/liability uncertainty.

Do not preserve generic supplier qualification, completed media requests, internal project status, or zero stock by itself as blanket gates where a verified SOK order mode remains available.

## Owner gates

Return to Casey for:

- first material Hawaii reserve purchase;
- warehouse contract/minimum/recurring storage commitment;
- material lithium/DG liability assumption;
- standing absorption of warranty freight;
- permanent service compensation/retainer terms;
- support model for non-Elevation purchasers when economics/authority are not established;
- guaranteed SLA/volume;
- exclusivity, financing or other binding commercial terms.

## Close / proof condition

The SOK project reaches repeatable mature operating state when Elevation can prove:

**SALE / ORDER → SUPPLIER ALLOCATION → FULFILLMENT → CUSTOMER CLOSEOUT**

and

**WARRANTY CASE → SOK AUTHORIZATION → LOCAL/REMOTE RESOLUTION → FAILED-UNIT CONTROL → REPLENISHMENT / REIMBURSEMENT → CUSTOMER CLOSEOUT → ACTUALS**

with Hawaii freight/storage and commercial responsibilities evidence-based rather than assumed.

## RUN

**SOK GIT CHECK → READ SOK PROJECT SOURCE → PICK UP UNFINISHED SOK WORKTREE → PROJECT MANAGER EXECUTES ROUTINE SAFE SOK WORK OR ROUTES BOUNDED TASK → SOK RECON OS VERIFIES/RECONCILES → DOCUMENT MATERIAL DELTA → CONTINUE NEXT SOK ITEM**

## Return

**SOK COMPLETED:**  
**SOK CURRENT:**  
**SOK WAITING/BLOCKED:**  
**SOK MATURITY / GATE CHANGE:**  
**SOK OWNER GATE:**  
**SOK NEXT:**  
**ROUTE REQUIRED:**
