# SOK Order-First Growth Workflow Plan

**Status:** PLAN / EXECUTION PREP  
**Branch:** `plan/sok-order-first-growth-workflow-0908`  
**Parent baseline:** `b123875a83c219680ab681c3b1983bb7e1e9b53f`

## Management direction

Elevation does **not** have capital available to pre-buy a full Hawaii stock position. Do not make inventory ownership a prerequisite for launch.

The operating model is:

**COMPLETE DROPSHIP STORE FIRST → TAKE REAL ORDERS → CONTROL FULFILLMENT → QUALIFY HAWAII FREIGHT ON EXACT ORDERS → USE WORKING CAPITAL / CREDIT ONLY AS AN ACCELERATOR → STOCK ONLY AFTER REPEAT DEMAND IS PROVEN.**

This follows the company rule:

**DON'T STOCK FIRST. CONTROL THE DEAL FIRST.**

## Immediate priority order

1. Finish the SOK dropshipping storefront and order-management workflow for normal mainland orders.
2. Make every paid SOK website sale land cleanly in Command Center → Orders with the supplier handoff information needed to create and track the supplier order.
3. Finish the first-order Hawaii preparation workflow without purchasing speculative stock.
4. Use one real Hawaii order as the first execution case.
5. Only after repeat demand exists, evaluate a small working-capital or commerce-credit facility for buffer inventory.

## What SOK needs from Elevation for the first Hawaii order

For the first shipment, Elevation must provide SOK with an **order-specific preparation package**, not a generic lithium checklist.

The package must resolve:

- exact SOK model/SKU;
- exact quantity;
- destination island / ZIP;
- customer pickup vs delivery preference;
- selected qualified freight route;
- carton vs pallet configuration;
- preferred pallet configuration;
- route-specific packaging requirements;
- short-circuit protection requirements;
- securement requirements;
- marks and labels required by the accepting carrier;
- shipment documentation required by the accepting carrier;
- model-specific SDS / UN38.3 support documents;
- origin handoff instructions;
- Hawaii receiving / pickup / delivery instructions.

SOK then confirms which steps its Chino warehouse can perform and prepares the shipment to the accepted route requirements.

## Capital rule

Do not block launch on a credit line.

Current operating assumption is supplier prepayment. Therefore:

- normal dropship orders should be built around customer payment → supplier PO/payment → shipment → tracking;
- Hawaii orders should remain review-gated until landed cost and route are confirmed;
- no speculative Hawaii stock purchase is required for the foundational website or operational workflow;
- customer funds must never be treated as available until payment is actually captured and usable;
- any future business credit / commerce account is an optional working-capital accelerator, not the foundation of the system.

Do not publish private supplier payment terms, dealer pricing, carrier buy rates, or customer information in GitHub.

## Phase 1 — Complete mainland SOK dropshipping

### Goal

Make the website capable of selling SOK products without Elevation holding inventory.

### Required workflow

**Customer order**  
→ exact catalog SKU and MAP-safe price  
→ live checkout  
→ payment captured  
→ Command Center / Orders record created  
→ supplier fulfillment packet ready  
→ PO submitted through the current supplier channel  
→ supplier payment completed  
→ supplier confirms shipment  
→ tracking recorded in Command Center  
→ customer receives tracking  
→ completed / exception workflow.

### Minimum system requirements

- SOK products use exact catalog identity.
- MAP guard remains authoritative.
- Product availability has a freshness state; stale inventory must not present as guaranteed stock.
- Paid SOK orders surface in Orders as fulfillment work, not Leads.
- Orders show enough structured supplier data to prepare the PO without re-reading emails.
- Manual supplier submission remains acceptable until the supplier dealer portal is available.
- Tracking and supplier order reference can be written back to the order.
- Returns/warranty remain operational exceptions, not a separate large system.

### Verified supplier workflow requirements from correspondence

The build should explicitly support the current manual SOK operating process so the owner does not need to reopen supplier email during each order.

#### Supplier-order packet

The current supplier workflow accepts a manual PO. The order record should therefore be able to generate or expose a supplier-order packet containing at minimum:

- consignee/customer name;
- customer contact phone;
- shipping address;
- exact SOK model;
- quantity;
- internal Elevation order reference;
- supplier-order status;
- supplier tracking/reference when returned.

Do not expose dealer cost or private supplier terms in customer-facing views or public Git.

#### Supplier fulfillment states

The operating sequence should distinguish these states rather than collapsing them into one generic “processing” state:

**Paid → Prepare Supplier Order → PO Submitted → Supplier Invoice/Release Pending → Supplier Released → Tracking Received → Shipped → Complete**

The implementation does not need to automate supplier payment or ordering yet; it needs to make the next manual action obvious.

#### Processing expectations

The current supplier process supports:

- manual PO submission while the dealer portal is still under construction;
- no fixed daily order cutoff;
- shipment typically on the next business day after supplier release/payment confirmation;
- tracking normally returned the same day the order ships.

Command Center should therefore surface exceptions such as:

- PO not submitted after payment;
- supplier release still pending;
- expected tracking not received after shipment/release;
- customer tracking not yet surfaced.

#### Inventory freshness

Until a live dealer portal/feed exists, supplier inventory is currently provided through periodic spreadsheet updates.

Products should therefore track:

- last inventory confirmation date/time;
- source of the inventory confirmation;
- freshness state such as Current / Aging / Stale;
- whether checkout may continue, requires review, or must pause when stock confirmation becomes stale.

Do not store raw supplier inventory counts in public Git.

#### Customer-visible shipment behavior

Current supplier correspondence confirms:

- dealer/wholesale pricing should not be exposed to the end customer;
- normal continental-U.S. fulfillment is distinct from Hawaii/Alaska specialized shipping;
- the supplier brand may appear on the shipping label.

The customer experience should not promise anonymous/unbranded shipment. It should instead avoid exposing wholesale pricing and should accurately represent that supplier-branded fulfillment may occur.

#### Cancellation/change handling

Orders need an explicit pre-shipment change/cancellation exception path. The system should surface a manual action to contact the supplier before shipment rather than treating a change request as automatically approved.

#### Warranty / quality-return handling

For supplier-confirmed product-quality issues, the workflow should support:

**Issue reported → supplier review → return label/pickup arranged → replacement or refund → order exception closed**

Customer-support notes should preserve the supplier case/reference and outcome without exposing private supplier correspondence publicly.

#### Product/media source

Until a packaged dealer media feed exists, approved product media/specification sourcing may rely on current supplier website assets and supplier-provided manuals/specifications, subject to the existing authorization/MAP controls.

## Phase 2 — Build the Hawaii order-first lane

### Goal

Accept and qualify Hawaii demand without requiring Elevation to own a warehouse inventory position first.

### Customer flow

**Hawaii product interest**  
→ exact model + quantity + ZIP/island  
→ pickup/delivery preference  
→ freight review  
→ exact route selected  
→ landed price confirmed  
→ customer reconfirmation  
→ payment authorization/capture only when approved  
→ SOK PO/payment  
→ route-specific warehouse prep package sent to SOK  
→ SOK confirmation  
→ freight booking / handoff  
→ Honolulu receiving  
→ pickup / local delivery / outer-island routing  
→ completion.

### Verified Hawaii receiving / warehouse requirements from correspondence

The Hawaii Logistics workspace should preserve enough structured information to qualify receiving/storage providers without reopening email threads.

For a warehouse/receiving review, the protected shipment profile should be able to represent:

- manufacturer;
- exact model;
- voltage;
- watt-hours;
- dimensions;
- weight;
- SDS;
- UN38.3 test summary;
- confirmation that batteries are new, undamaged, non-defective, and properly packaged/labeled;
- expected initial unit/pallet volume;
- expected recurring monthly volume when known;
- pallet dimensions, weight, and units per pallet;
- expected storage duration;
- maximum expected inventory;
- estimated customer-order frequency;
- typical order size;
- destination/delivery areas;
- will-call pickup need;
- local delivery need;
- neighbor/outer-island delivery need;
- returns/damaged-battery process;
- requested program start date;
- expected program duration.

These fields are not all required from the customer at checkout. They belong to the internal Logistics qualification profile and should be populated progressively as the program becomes real.

### Receiving capability states

The Logistics lane should distinguish between:

- receiving provider under review;
- receiving approved for new lithium;
- storage approved;
- customer will-call approved;
- local delivery approved;
- outer-island forwarding approved;
- used-lithium prohibited / unsupported;
- rate/contract pending;
- inactive / rejected.

Do not publish receiving partner names, rates, private warehouse terms, or private correspondence in public Git.

### First-order destination completion

The Hawaii workflow should not stop at “arrived Honolulu.” It must complete through one of the supported terminal states:

- customer will-call released;
- local delivery complete;
- outer-island movement complete;
- exception / return / damage resolution complete.

The build should preserve proof/status of receiving handoff and final customer release.

### No-go rules

Do not:

- promise Hawaii freight on an unqualified SKU;
- accept unrestricted payment while the route is still under review;
- publish a generic carrier-independent DG checklist as final requirements;
- buy speculative Hawaii stock solely to make the website appear complete;
- describe SOK referrals as an active guaranteed pipeline before the first operating case proves the model.

## Phase 3 — First real Hawaii execution case

Choose the first case based on the smallest combination of:

- manageable unit count;
- known SOK documentation;
- route with confirmed acceptance requirements;
- simple Honolulu pickup or known final-delivery path;
- enough gross contribution to absorb execution friction.

The first shipment is a learning shipment. The objective is to produce a reusable operating profile and proof of execution, not maximize volume.

## Phase 4 — Scale only from proven demand

After successful orders:

1. Measure actual order frequency, margin, payment timing, supplier turnaround and freight reliability.
2. Identify the two or three SOK SKUs generating repeat demand.
3. Evaluate a small working-capital / commerce-credit facility sized only to proven turnover.
4. Use credit for short-duration replenishment or a small Hawaii buffer, not broad speculative inventory.
5. Increase pallet size only when sell-through and logistics reliability justify it.

## Command Center implementation target

The next deployable operating slice should be small.

### Orders

Add/confirm a SOK fulfillment state that makes the owner sequence obvious:

**Paid → Prepare Supplier Order → PO Submitted → Supplier Paid/Released → Tracking Received → Shipped → Complete**

Keep the existing order table as source of truth. Do not create a second order database.

Orders should also support the operational exceptions verified above:

- pre-shipment change/cancellation request;
- supplier release pending;
- tracking overdue;
- supplier quality-return / warranty case;
- replacement pending;
- refund pending.

### Products

Add/confirm:

- SOK supplier identity;
- MAP-safe retail state;
- inventory freshness / last-confirmed state;
- mainland dropship eligibility;
- Hawaii review-required / eligible state;
- documentation-readiness state for lithium models.

### Logistics

Replace technical clutter with one first-order Hawaii checklist:

**Order Requirements → Route Qualified → SOK Prep Requirements Ready → SOK Confirmed → Freight Ready → Hawaii Receiving → Complete**

Technical DG/carrier details remain behind the operating status and are shown only when needed.

The Logistics record should also support:

- origin handoff status;
- receiving-provider qualification status;
- storage status when used;
- will-call / local-delivery / outer-island method;
- final customer release status;
- damaged/return exception status.

### Today

Surface only actionable exceptions:

- paid SOK order needing supplier PO;
- SOK order awaiting supplier payment/release;
- tracking overdue;
- Hawaii order awaiting route qualification;
- Hawaii order ready for SOK preparation package;
- SOK warehouse confirmation overdue;
- Hawaii receiving approval/rate still pending on an active order;
- final customer release/delivery overdue.

## Deployment sequence

### Release A — SOK Dropship Completion

Finish Orders + Products workflow for normal mainland SOK dropshipping. This is the highest-priority revenue release.

### Release B — Hawaii Order-First Foundation

Add the simplified Hawaii execution statuses and order-specific preparation package workflow. No speculative inventory purchase.

### Release C — Growth Automation

Only after A and B are proven live: inventory-feed improvements, supplier portal integration when available, referral intake, and optional working-capital inventory planning.

## Acceptance gates

Release A is ready only when:

- live checkout remains healthy;
- captured SOK orders enter Command Center Orders;
- exact supplier SKU/model is preserved;
- owner can prepare the supplier order from the order record;
- the order record contains the supplier-required consignee/contact/address/model/quantity fields;
- tracking can be recorded and surfaced;
- supplier fulfillment exceptions can be surfaced without reopening Gmail;
- inventory freshness is visible;
- MAP protections remain intact;
- no customer/supplier private data is added to public Git.

Release B is ready only when:

- Hawaii cannot bypass review gates;
- the first-order checklist is tied to exact SKU, quantity and route;
- SOK preparation requirements can be generated/read without exposing private carrier rates;
- receiving qualification can capture the required battery/volume/storage/delivery information;
- payment is not collected when shipment remains unqualified;
- the workflow clearly ends in Hawaii pickup/delivery completion.

## Immediate execution queue

1. Treat mainland SOK dropshipping completion as the current development priority.
2. Audit the deployed Orders workflow against the SOK supplier-order steps above.
3. Audit all currently sellable SOK catalog items for exact identity, MAP state, availability freshness and checkout readiness.
4. Build the smallest missing SOK order-management controls only.
5. Build the Hawaii first-order checklist/status flow immediately after the dropship release candidate is clean.
6. Add the verified receiving-qualification fields to the protected Logistics workflow, not to customer checkout.
7. Use the next real Hawaii inquiry/order to complete the exact preparation package for Kam/SOK.
8. Do not wait for warehouse inventory financing before shipping these foundational system improvements.
