# Elevation UpScales — Shared Management Operating SOP

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-09**  
**Owner: Casey Young**

## Purpose

This is the shared operating standard for Elevation UpScales management workers and manager-specific workstreams. It keeps management execution fast, source-controlled, commercially focused, and separated from protected customer, supplier, payment, freight and compliance data.

## Management source of truth

Use this order of authority:

1. Casey / Owner's newest explicit instruction.
2. Current controlling files under `/operations/`.
3. Current application source under `main` for actual website/runtime behavior.
4. Historical coordination files only when a current task specifically requires historical evidence.

GitHub `/operations/` is the active management/work source. Gmail management drafts, feeds and records are retired as a control system. Ordinary Gmail remains the business-correspondence layer when a task requires reading or sending actual external email. Any Gmail copies of management/release state are cold emergency-recovery evidence only and may be consulted only under `DISASTER_RECOVERY_SOP.md` when Git state is unavailable, unclear after an interruption, or materially inconsistent.

When a verified external fact materially changes an active workstream, reconcile the public-safe result into the appropriate `/operations/` file instead of leaving current management state trapped in email or chat.

## Commercial operating strategy

Elevation remains centered on:

**OFF-GRID POWER • SUPPLY • LOGISTICS • MARKET ACCESS**

Commercial execution should increasingly follow:

**UNDERSTAND THE POWER NEED → SUPPLY THE COMPLETE PURCHASE → SOLVE THE DELIVERY PROBLEM → CREATE A REPEAT CUSTOMER**

Current commercial priority:

**REPEAT B2B SUPPLY → COMPLETE CUSTOMER PURCHASES → BATTERY / COMPONENT RETAIL → SPECIALIZED LOGISTICS → PAID PLANNING → HANDS-ON SERVICES**

Sales and fulfillment model:

**MANUFACTURER / SUPPLIER → ELEVATION PRODUCT KNOWLEDGE → INSTALLER OR CUSTOMER NEED → COMPLETE PRODUCT PURCHASE → LOGISTICS / DELIVERY → SUPPORT → REORDER**

Logistics architecture remains:

**MANUFACTURER → PRODUCT → PRE-SHIP → ORIGIN HANDOFF → FREIGHT ROUTE → DESTINATION RECEIVING/STORAGE → FINAL MILE → CUSTOMER → ACTUALS → REPEAT**

Preserve the operating principle:

**DON'T STOCK FIRST. CONTROL THE DEAL FIRST.**

Test real orders and repeat demand before committing meaningful inventory.

## Growth priorities

### Repeat B2B supply

Installer and RV-shop supply accounts are a primary growth lane. Target repeat customers such as independent RV technicians, conversion shops and off-grid installers. Quote real job requirements and establish installation, technical-support and warranty responsibility before making broad promises.

### Complete customer purchases

SOK remains the anchor battery relationship. Supplier development should prioritize complementary charging, monitoring, controllers, protection equipment, cabling/accessories and other verified balance-of-system products around the battery sale rather than adding unnecessary competing battery brands.

Curated RV, off-grid, cabin and backup-power configurations may be developed, but exact compatibility must be verified before presenting anything as a complete kit.

Preserve SOK MAP and promotion controls. Do not use bundles, gifts, automatic discounts or other mechanisms to bypass MAP restrictions.

### Specialized logistics

Hawaii remains a strategic logistics differentiator. The preferred early model is an Elevation product sale with Elevation coordinating specialized fulfillment.

Keep the separate third-party logistics model distinct: another seller may retain the product sale and engage Elevation for a separately scoped logistics service.

Alaska remains part of the harder-to-serve-market strategy as that lane develops.

Do not broaden specialized-delivery promises from planning assumptions. Prove the route with real qualified orders and actuals first.

### Paid planning

Paid system planning may be offered as a defined service supporting product sales:

**requirements / load review → component selection → purchasing plan**

Keep installation, engineered design and regulated work within appropriate professional and licensing boundaries.

## Ecommerce and fulfillment boundaries

- Catalog remains the product master.
- Supplier stock is separate from Elevation physical On Hand.
- Order/payment acceptance and shipment release are separate controls.
- Stock verification alone does not authorize shipment, supplier ordering, channel publication, freight release or customer-facing purchase-mode changes.
- Preserve preorder/backorder paths where already supported.
- Preserve MAP, quantity review, Hawaii/Alaska, lithium, payment, freight and fulfillment controls.
- Never invent supplier inventory, replenishment dates, freight terms or compatibility claims.
- No management worker may silently change checkout, pricing, public availability, payment, supplier ownership, auth/session behavior, bindings, secrets or production data outside an explicitly authorized scope.

## Management efficiency rules

### Keep context small

Read only the current controlling files needed for the assigned scope. Do not reconstruct the old management system, old release packets, historical handoffs or retired Gmail management feeds unless the task specifically requires declared recovery or historical investigation.

### Execute the requested worktree

Do not repeatedly restart broad audits after a focused task is already understood. Inspect the owning files, make the smallest safe change, run the appropriate tests and continue the active worktree.

### Reuse before building

Reuse existing routes, storage, auth, parsing, receipts, UI shells and deployment workflows before creating new systems. New software should be built only when it materially improves selling, quoting, fulfillment, product discovery, repeat purchasing or the reliability of those workflows.

### One owner per data responsibility

Do not create duplicate product masters, duplicate lead systems, duplicate logistics records or competing rolling handoffs. Extend the existing owner when possible.

### Proportional controls — do not turn the SOP into friction

Controls must be proportional to the lane being activated.

**BLOCK THE UNSAFE OR UNVERIFIED LANE, NOT THE ENTIRE VENDOR / PRODUCT WHEN ANOTHER LANE IS ALREADY SAFE.**

Examples:

- missing Hawaii DG documents block Hawaii freight pricing, not a verified Lower-48 sale;
- an unverified marketplace permission blocks that marketplace, not the approved Elevation website;
- missing pallet data blocks pallet quoting, not ordinary parcel fulfillment;
- incomplete lifestyle media blocks merchandising enrichment, not code work when approved product facts and sellable media already exist.

Vendor-facing simplicity is a management responsibility. Do not make a supplier complete Elevation's internal checklist if the same facts are already available through the supplier's approved portal, dealer package, feed, policy, price sheet or prior response.

Prefer:

**VENDOR PORTAL / PACKAGE → ELEVATION NORMALIZATION → WEBSITE / ADMIN / OPERATIONS**

over:

**VENDOR → REPEAT EVERY FACT MANUALLY → MULTIPLE INTERNAL COPIES**

Use the lightest onboarding tier that safely supports the intended business. Escalate to deeper SOK-style qualification only when repeat B2B, project supply, stocking, reseller structures, Hawaii/DG freight or other complex operations actually require it.

Do not build a custom Elevation supplier portal just because the framework can support one. Use vendor portals and the current Elevation Admin/catalog infrastructure first. Build additional supplier-platform software only when vendor count, update frequency, order volume or manager workload clearly justifies it.

### Minimum safe progress beats perfect paperwork

Management should distinguish:

- **required now to sell safely**;
- **required later for a planned lane**;
- **useful enrichment**.

Get enough verified information to activate the safe lane, then learn from real orders and enrich the profile. Do not delay revenue-generating work merely to complete fields that have no current operational use.

### Test proportionally

- During focused code iteration, run the narrowest relevant behavior tests and fast QA.
- Before preview, merge or production deployment, run the full release QA and `git diff --check`.
- Documentation-only edits do not require repeating unrelated full code QA unless they affect a release candidate being handed off at the same time.
- Use synthetic or isolated test data for protected commerce workflows; do not mutate live supplier counts merely to test an interface.

### Reuse permanent deployment workflows

Do not create one-off deployment workflows or bypass permanent release gates. For normal website production, use the repository's Worker Exact-SHA Release preview → same-SHA production gate after approved work reaches current `main`. Legacy push deployment remains recovery-only unless Casey explicitly authorizes a different path.

### Keep management updates actionable

Management status should answer:

- What changed?
- What is blocked?
- Who owns the next action?
- What is the next action?
- What requires Casey's approval?

Avoid duplicating old narrative when a current state and next action are sufficient.

## Evening Briefing cadence

Use an **Evening Briefing** as the normal management recap for Casey and Peter when material work has occurred.

The briefing is a reporting layer, not a management source of truth. It must summarize the current GitHub `/operations/` state and verified current application/deployment state; it must not recreate the retired Gmail management-feed system.

Cadence:

- **Preferred:** one concise Evening Briefing on active workdays when material changes occurred.
- **Minimum standard:** at least one Evening Briefing per week whenever the company has active management, supplier, ecommerce, logistics or deployment work.
- If no material change occurred, do not manufacture activity; a short no-material-change note is sufficient when a scheduled briefing is still expected.

The Evening Briefing should normally cover only material items from the current period:

- website / Admin / ecommerce features completed or deployed;
- checkout, payment, order-notification or customer-experience changes;
- supplier / vendor approvals and onboarding progress;
- catalog, inventory-source, MAP/channel, media-packet and fulfillment-readiness progress;
- SOK and complementary-vendor developments;
- Hawaii / Alaska freight, receiving and logistics progress;
- important customer, B2B or partnership opportunities;
- major QA / deployment results;
- blockers, risks and decisions requiring Casey or Peter;
- the next highest-value actions.

Keep the briefing concise and managerial. Do not paste raw commits, long diffs, private correspondence, dealer costs, raw supplier inventory, private freight rates, customer PII, credentials or protected commercial terms.

When an Evening Briefing is emailed, it is ordinary management correspondence only. The authoritative work state remains GitHub `/operations/` and current `main`; an Evening Briefing is not a disaster-recovery snapshot unless it is separately created under the recovery SOP.

Recommended structure:

**EVENING BRIEFING — [DATE]**

**Today / This Period** — material completed work and decisions.  
**Website / Ecommerce** — deployed features and customer-flow changes.  
**Vendors / Supply** — approvals, onboarding, catalog/media/inventory readiness.  
**Logistics** — Hawaii/Alaska/freight/receiving progress.  
**Commercial** — B2B, partnerships and meaningful demand signals.  
**Open / Next** — blockers, approvals and next priority actions.

## Management separation

Keep these lanes separate unless an explicit task requires a controlled handoff:

- customer leads;
- Supplier Growth / commercial supplier relationships;
- Shopify / ecommerce catalog operations;
- SOK battery availability and fulfillment;
- lithium/Hawaii specialized logistics;
- Solar Builder / system-planning leads;
- Portal / technician operations;
- website/deployment work.

A shared company strategy does not make their private data or write paths interchangeable.

## Metrics

Management decisions should increasingly use:

- contribution after fulfillment costs;
- average order value;
- complementary products attached per battery sale;
- repeat-account revenue;
- reorder frequency;
- owner/manager time per order;
- freight variance;
- delivery performance;
- return and warranty burden.

## Repository visibility and protected data

This repository is currently public. A future plan to make it private does **not** relax the present protection standard.

Until repository visibility has actually changed and a new protection policy is explicitly adopted, never commit:

- dealer or wholesale costs;
- raw supplier inventory counts;
- private supplier correspondence;
- customer personal information;
- private freight quotes or rate cards;
- payment credentials or private payment terms;
- non-public compliance packets;
- credentials, secrets or tokens;
- private commercial terms.

Use public-safe status, identifiers and operating rules only.

## Manager-specific files

Manager-specific SOPs may add narrower rules for their own lane, but they may not override this shared SOP or another manager's ownership without Casey's newer explicit direction.

If a conflict exists, apply the authority order at the top of this document and update the affected current operations file so the conflict does not persist.
