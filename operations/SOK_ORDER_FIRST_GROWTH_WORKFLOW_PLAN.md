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

### Today

Surface only actionable exceptions:

- paid SOK order needing supplier PO;
- SOK order awaiting supplier payment/release;
- tracking overdue;
- Hawaii order awaiting route qualification;
- Hawaii order ready for SOK preparation package;
- SOK warehouse confirmation overdue.

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
- tracking can be recorded and surfaced;
- MAP protections remain intact;
- no customer/supplier private data is added to public Git.

Release B is ready only when:

- Hawaii cannot bypass review gates;
- the first-order checklist is tied to exact SKU, quantity and route;
- SOK preparation requirements can be generated/read without exposing private carrier rates;
- payment is not collected when shipment remains unqualified;
- the workflow clearly ends in Hawaii pickup/delivery completion.

## Immediate execution queue

1. Treat mainland SOK dropshipping completion as the current development priority.
2. Audit the deployed Orders workflow against the SOK supplier-order steps above.
3. Audit all currently sellable SOK catalog items for exact identity, MAP state, availability freshness and checkout readiness.
4. Build the smallest missing SOK order-management controls only.
5. Build the Hawaii first-order checklist/status flow immediately after the dropship release candidate is clean.
6. Use the next real Hawaii inquiry/order to complete the exact preparation package for Kam/SOK.
7. Do not wait for warehouse inventory financing before shipping these foundational system improvements.
