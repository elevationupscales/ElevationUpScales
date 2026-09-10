# Elevation UpScales — Command Center Ecommerce Workflow Plan

**Status: ACTIVE / CONTROLLING DEVELOPMENT PLAN**

**Effective: 2026-09-08**

**Owner: Casey Young**

## Purpose

Turn the current collection of working Admin tools into one clear ecommerce operating system.

The finished Command Center should let the owner answer three questions quickly:

1. What needs attention today?
2. Which record owns the work?
3. What is the next safe action?

This plan controls Command Center organization and implementation order. Existing product, order, customer, supplier, payment, SOK, lithium, freight, MAP, authentication, and data-protection rules remain controlling.

This document authorizes development and Release Candidate preparation. It does not authorize a production deployment.

## Current-state finding

The current system contains useful working foundations, but they were added in layers and do not yet behave like one application.

Verified on current `main` at the start of this plan:

- 14 Admin HTML entry files;
- 31 Admin JavaScript files;
- 24 Admin CSS files;
- two active navigation concepts: the global Command Center rail and the nested Leads workspace navigation;
- the Leads page loads 13 stylesheets and 11 scripts and can expose up to 11 workspace views;
- the Overview reads 10 different Admin endpoints on each full refresh;
- retired Marketplace language and compatibility surfaces still appear in some owner-facing code paths;
- Commerce Logistics can stage review candidates, but the queue does not yet provide a complete resolve/map/approve workflow;
- several daily logistics edits still use browser prompts instead of structured forms;
- 49 native prompt, confirm, or alert calls remain across Admin scripts, mixing routine edits with destructive confirmations;
- secondary managers are exposed as separate destinations even when they belong to Products, Channels, Leads, or Logistics.

The backend separation and safety controls are valuable. The main problem is presentation, workflow ownership, and incomplete handoff between screens.

## Operating principles

1. **One shell.** Every active Admin screen uses the same navigation, session behavior, page header, status treatment, and mobile menu.
2. **One owner per record or field.** A screen may display information from another domain, but it does not become a competing writer.
3. **Action before analytics.** Daily exceptions and next actions appear before charts, historical metrics, or technical detail.
4. **Progressive detail.** Routine work stays short. Advanced SOK, lithium, freight, sync, and audit fields open only when required.
5. **Complete the handoff.** Intake records must move into a review decision; paid orders must move through fulfillment; leads must move to a dated next action or a closed state.
6. **Preserve protected controls.** Simpler screens do not weaken server-side validation, authorization, MAP, supplier, payment, or freight gates.
7. **GitHub continuity.** Every work branch is created from current `main`, pushed to GitHub early, kept current through focused commits, and handed off with an exact SHA and QA receipt.

## Final primary menu

The permanent owner menu is reduced to six primary areas.

| Primary area | Owner purpose | Contained views |
| --- | --- | --- |
| **Today** | One prioritized operating queue | Needs attention, recent activity, quick actions, compact business pulse |
| **Orders** | Complete paid-order fulfillment | Needs order, supplier ordered, tracking needed, holds/refunds, completed |
| **Products** | Control what Elevation sells | Catalog, inventory/sourcing, channels, imports, pricing/promotions |
| **Leads** | Manage demand and relationships | Customer Leads, Supplier Growth, Solar, Work With Us, Portal-ready |
| **Logistics** | Move specialized shipments safely | Shipping queue, lithium/hazmat review, freight quote, batches, advanced records |
| **System** | Verify connections and health | Connections, sync history, QA/health, read-only analytics |

Analytics remains available as decision support inside Today and System. It does not compete with daily operating work in the primary menu.

Secondary tools retain compatible URLs during migration. The menu presents them as tabs or actions under their owning primary area.

## One daily workflow

### Start on Today

Today shows only records that require an owner decision or action:

- paid order needs supplier action;
- supplier order needs tracking;
- order is on hold or needs refund review;
- customer lead is new, unassigned, overdue, or missing a next action;
- supplier lead is ready for contact, waiting beyond its date, or needs qualification;
- product needs mapping, source verification, margin/MAP review, or publication approval;
- source/channel observation is stale, failed, or unmapped;
- lithium/freight record is missing an exact-SKU, document, route, quote, inventory, or customer-confirmation gate.

Every Today row must show:

- record type;
- short identity;
- status;
- owner;
- blocker or reason;
- next action;
- due/age signal;
- one **Open** action that lands on the owning record.

Today is a read model over the existing systems. It must not create another operations database.

### Order path

`Paid → Needs Supplier Order → Supplier Ordered → Tracking Needed → Shipped → Completed`

Exception states remain visible:

`Hold / Issue`, `Refund Needed`, `Refunded`, and `Cancelled`.

The order record displays sales channel, supplier or fulfillment provider, source SKU, Elevation SKU, destination, payment reference, shipping lane, tracking, customer communication state, and one dated next action. Supplier/provider identity and sales channel remain separate.

### Payment path — PayPal Pay Later

Where Elevation uses PayPal Checkout, the payment experience must include **PayPal Pay Later** when PayPal reports the merchant, buyer, market, and transaction eligible.

Pay Later is additive to the normal checkout path. It must not replace ordinary PayPal or other valid payment methods, and Pay Later ineligibility or unavailability must not block checkout.

The Pay Later implementation must:

- use the active PayPal SDK's supported Pay Later button and/or messaging capability rather than a separate financing form;
- rely on PayPal eligibility checks before displaying an eligible Pay Later funding option;
- preserve sandbox/live separation and the explicit live-checkout gate;
- preserve protected product pricing, server-side coupon validation, SOK MAP/purchase-mode/readiness rules, and Hawaii/Alaska routing controls;
- send a successful Pay Later-funded purchase through the same canonical order, payment, ingestion, and fulfillment flow as another PayPal payment;
- avoid collecting or storing PayPal consumer-underwriting data in the Elevation Operating System;
- continue to present another valid payment method when Pay Later is unavailable.

Operations and customer-facing copy must not promise financing approval, specific financing terms, or universal availability. PayPal controls buyer eligibility and the offer it presents.

**Implementation state:** OWNER APPROVED / REQUIRED. If the current checkout does not expose Pay Later under PayPal eligibility, Dev may reopen only for this bounded payment feature. This does not reopen unrelated commerce development.

**Acceptance:** authorized preview verifies Pay Later presentation when PayPal reports eligibility, verifies fallback checkout when it does not, and confirms no protected pricing, geography, purchase-mode, or payment-environment gate is weakened. A genuine eligible transaction may provide live proof; do not fabricate financing eligibility or approval merely to mark the feature complete.

### Product path

`Supplier or Channel Intake → Preview → Staged Review → Catalog Match → Source/Inventory Check → Channel Authorization → Ready → Publish or Hold`

Doba remains the primary inventory source for TikTok Shop and eBay where that source relationship is active. CJ Dropshipping remains a separate supplier. Shopify, eBay, and TikTok remain sales channels. Printful and SpreadConnect remain fulfillment providers. Fourthwall remains a hybrid storefront/provider.

CSV fallback and URL intake remain available for every supported lane. A staged candidate must have a visible action to map to a Catalog product, create a protected draft, hold with a reason, or dismiss as duplicate/history.

### Lead path

The Leads area uses one shared visual pattern while preserving separate data domains.

| Lead view | Purpose | Primary progression |
| --- | --- | --- |
| **Customer Leads** | Home, RV, project, and general customer demand | New → Contact → Qualified → Estimate/Portal → Won/Lost |
| **Supplier Growth** | Vendor, dealer, dropship, referral, and logistics relationships | Research → Ready to Contact → Waiting → Qualification/Integration → Active → Closed/Hold |
| **Solar** | Solar Builder/customer system demand | New → Review → Contact → System/Project decision → Won/Lost |
| **Work With Us** | Affiliate, marketing, technician, and growth inquiries | New → Review → Contact → Qualified → Active/Closed |

The existing ten Supplier Growth tree branches remain source classifications and filters. They do not become ten competing daily workflows.

Each lead view must provide:

- one compact count strip;
- search plus no more than three primary filters;
- a readable row/card with owner, status, next action, and due date;
- a structured detail drawer;
- save, record contact, schedule next action, and close/hold actions;
- a clear outbound block reason when dedupe or relationship state prevents cold outreach;
- activity history for material changes.

Supplier, customer, Solar, lithium-customer, and Work With Us records remain separate in storage and APIs. Grouping their interfaces does not merge their data models.

### Logistics path

`Order or Request → Transaction Lane → Product/SKU Qualification → Packaging/Documents → Route/Provider → Quote → Customer Confirmation → Book/Batch → Track → Final Reconciliation`

Transaction lanes remain distinct:

- Lane A: Elevation direct product sale;
- Lane B: supplier referral that becomes an Elevation sale;
- Lane C: third-party logistics facilitation.

The default screen presents a short work queue. Detailed lithium records, compatibility checks, rate inputs, and batch allocation remain available in structured forms. Routine editing must not require a chain of browser prompts.

## Data and write ownership

| Business object | Authoritative owner | Other screens may do |
| --- | --- | --- |
| Customer order/payment/fulfillment | Store Orders | Display status and deep-link to the order |
| Product identity, retail state, publish authority | Catalog | Display readiness and request review |
| Supplier stock/cost observations | Inventory/source workflow | Display freshness and blockers |
| External listing observation/mapping | Channels & Sync | Display health; never silently publish unknown products |
| Customer/project lead | Customer Leads API | Display summary in Today/Solar/Portal views |
| Supplier relationship | Supplier Leads API | Display commercial/logistics flags elsewhere |
| Lithium/freight qualification and batch | Shipping & Logistics | Display blockers in Orders/Today |
| System/sync run history | System/Sync | Display compact health elsewhere |

## Development releases

### Release 1 — Shell and navigation foundation

- create one canonical Admin shell component;
- replace the nested `admin-workspace.js` navigation with contextual tabs inside Leads;
- standardize page title, back path, status, loading, error, empty, and mobile states;
- keep compatible routes while routing users through the six-area menu;
- remove retired Marketplace entries from active owner navigation and Overview language;
- make authentication/session handling consistent across all active pages.

**Acceptance:** one menu appears everywhere; no page displays a second competing sidebar; every existing active workflow remains reachable.

### Release 2 — Today action queue

- replace broad dashboard density with a normalized exception queue;
- add direct record links and stable filters by work type and urgency;
- keep business pulse compact and read-only;
- load secondary metrics after the primary action queue so one unavailable module does not block the whole page.

**Acceptance:** the owner can identify the next order, lead, product, or logistics action from the first screen and reach it within two interactions.

### Release 3 — Leads redesign

- build Customer Leads, Supplier Growth, Solar, Work With Us, and Portal-ready as contextual views under Leads;
- use a common component pattern for counts, filters, rows, detail, activity, and next action;
- preserve separate endpoints, schemas, stages, dedupe rules, and activity records;
- move legacy Marketplace follow-up/listing code out of the active Leads load path;
- load only the script and stylesheet required for the selected view;
- replace the current 11-view/full-console model with the five approved lead views;
- preserve the protected 56-record Supplier Growth import and stable `SUP-###` IDs.

**Acceptance:** opening Leads does not load retired Marketplace managers or duplicate Overview/System views; supplier and customer records cannot be confused or cross-written.

### Release 4 — Products workspace completion

- make Catalog the visible product master;
- place Inventory & Sourcing, Channels, Imports, and Pricing/Promotions in contextual tabs/actions;
- complete Commerce Logistics candidate resolution: map, draft, hold, duplicate/history, and audit result;
- retain preview-first validation, idempotency, one-writer ownership, and CSV fallback;
- show source freshness, channel authorization, fulfillment provider, and the single current blocker on each product.

**Acceptance:** every staged CSV/URL record can reach a final review disposition without copying data between disconnected managers.

### Release 5 — Orders and fulfillment completion

- normalize channel, supplier, and provider display across order sources;
- add explicit next action, due date, customer-update state, and exception reason;
- support authenticated incremental order ingestion beginning with Doba-managed TikTok/eBay flows;
- preserve manual entry/CSV fallback and idempotent external order keys;
- add connectors one at a time only after the manual workflow is complete and testable;
- when PayPal Checkout is used, expose PayPal Pay Later where PayPal reports eligibility while preserving ordinary payment fallback and all protected checkout gates.

Connector order:

1. Doba → TikTok Shop/eBay observation and order matching;
2. Shopify order ingestion;
3. CJ Dropshipping supplier orders;
4. Fourthwall;
5. Printful and SpreadConnect;
6. additional providers through the same adapter contract.

**Acceptance:** imported orders do not duplicate existing orders, never change prices or inventory without the authoritative workflow, always retain their source/channel/provider identities, and PayPal-backed checkout does not omit an eligible Pay Later option or block fallback payment when Pay Later is unavailable.

### Release 6 — Shipping and logistics simplification

- make the default Logistics page a short actionable queue;
- replace routine prompt-driven editing with accessible forms and controlled choices;
- expose exact-SKU, documents, packaging, route, quote, inventory, confirmation, batch, and reconciliation as progressive steps;
- apply Lane A/B/C pricing presentation without exposing protected rate-card data;
- keep SOK quantity, MAP, availability, Hawaii/Alaska, paid-order recovery, and freight gates intact.

**Acceptance:** routine shipment work is understandable without reading technical database fields, and no shipment can bypass the existing server-side no-go rules.

### Release 7 — System cleanup and retirement

- consolidate connection state, sync history, QA health, and read-only analytics under System;
- remove duplicate loaders, retired Marketplace runtime calls, unused styles, compatibility UI, and superseded navigation code after route verification;
- keep historical data and recovery pointers intact;
- add focused QA gates for menu ownership, route reachability, lazy module loading, deep links, and protected data boundaries.

**Acceptance:** active Admin routes have one owner, retired code is absent from normal runtime, and the full QA suite passes from a clean checkout.

## Build order and branch discipline

Each release follows this sequence:

1. fetch and resolve current GitHub `main`;
2. review newer Admin/operations commits;
3. create a focused branch from current `main`;
4. push the branch to GitHub before substantial work;
5. implement only that release scope;
6. run targeted QA during development;
7. run full `npm run qa` and `git diff --check`;
8. review the complete diff and create one Release Candidate commit;
9. push the exact candidate SHA to GitHub;
10. hand the candidate to Deployment Management;
11. stop before merge or production deployment.

Do not carry an old release branch forward after `main` has advanced. Reconcile onto current `main` before preparing the candidate.

## Required QA coverage

Keep the existing full QA suite and add tests only where they protect the new structure:

- one canonical six-area menu on every active Admin page;
- no nested competing navigation inside Leads;
- active route and deep-link reachability;
- login/session and 401 behavior;
- Today queue partial-failure behavior;
- record deep links open the correct owner/detail;
- Supplier Growth import counts, fields, block rules, and idempotency;
- customer/Solar/Supplier domain separation;
- staged product intake disposition and audit history;
- order ingestion idempotency and source/channel/provider separation;
- PayPal Pay Later eligibility/rendering and fallback payment behavior where PayPal Checkout is active;
- lithium/SOK/freight server gates;
- no private supplier, carrier, customer, or rate-card data in public source;
- keyboard, focus, mobile overflow, loading, error, and empty states.

## Completion standard

The Command Center is complete when:

- one global menu and one visual system cover all active Admin work;
- the owner starts with a short, truthful action queue;
- daily work reaches the owning record within two interactions;
- every active order, lead, product review, and logistics record has a visible status, blocker, owner, and next action where applicable;
- Leads uses five clear views with separate data domains;
- product intake reaches a real review disposition;
- order sources and connectors use idempotent ingestion with manual fallback;
- PayPal-backed checkout exposes Pay Later when PayPal reports eligibility and preserves a valid fallback payment path when it does not;
- routine logistics uses structured forms while protected controls remain enforced;
- retired Marketplace and duplicate workspace layers no longer load in normal operations;
- current QA passes from a clean GitHub checkout;
- every Release Candidate is available on GitHub with an exact commit SHA before deployment review.

## Deferred until the operating core is complete

- broad analytics redesign;
- speculative dashboards or extra KPI layers;
- automatic outreach or email sending;
- bulk automatic product publication;
- simultaneous rollout of multiple unverified connectors;
- destructive removal of historical D1/R2 data;
- database redesign solely for presentation cleanup.

The priority is a dependable owner workflow: **see the work, open the record, take the next action, and know what remains.**
