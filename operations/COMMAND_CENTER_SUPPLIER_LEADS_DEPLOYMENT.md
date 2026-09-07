# Elevation UpScales — Command Center Supplier Leads Deployment Contract

**Status: ACTIVE / DEPLOYMENT CONTRACT**  
**Effective: 2026-09-07**  
**Owner: Casey Young**

## Purpose

Extend the existing Command Center **Leads** area with a protected **Supplier / Commercial Leads** workspace for supplier sourcing, wholesale/dealer development, dropshipping, Hawaii/Alaska fulfillment opportunities, supplier referrals, and specialized logistics growth.

This is an extension of the existing Command Center Leads function, not a replacement for the current customer/Solar lead system.

## Active management source

This implementation is governed by current files under `/operations/`, especially:

- `README.md`
- `SUPPLIER_LOGISTICS_GROWTH.md`
- `LOGISTICS_PRICING_MODEL.md`
- `SOK_ECOMMERCE_SHIPPING_SOP.md`

Do not use Gmail management drafts, management feeds, or historical coordination files as active deployment direction.

## Existing code to preserve

The repository already contains a customer/Solar lead system and shared Command Center shell, including:

- `site/admin-command-center.js`
- `site/admin-listings.html`
- `site/admin-leads.js`
- `site/admin-leads.css`
- `site/worker/domains/leads.js`
- existing opportunities/follow-up components

Preserve the current customer/Solar lead API, schema, stages, and behavior.

**Do not store supplier-commercial records in the existing `solar_leads` model and do not force supplier-account stages into customer-project enums.**

## Required Supplier Leads domain

Add a separate protected supplier-commercial model, preferably exposed under an admin-only endpoint family such as:

- `GET /api/admin/supplier-leads`
- `GET /api/admin/supplier-leads/:supplierLeadId`
- `POST /api/admin/supplier-leads/:supplierLeadId/action`

An admin-only import endpoint may be added when needed to seed a protected dataset. Do not hardcode supplier records into public JavaScript or static source files.

Recommended storage separation:

- `supplier_leads`
- `supplier_lead_activity`

Activity history should be append-only and record material state changes, responsible admin identity, and timestamp.

## Leads-area navigation

Inside the existing Leads area, provide distinct views for:

1. **Customer Leads** — current customer/Solar behavior remains unchanged.
2. **Supplier / Commercial Leads** — new supplier-account workspace.

The shared Command Center navigation should continue to expose this work under **Leads** rather than creating a disconnected admin application.

## Supplier lead tree states

The Supplier / Commercial Leads workspace must support these primary tree branches:

1. Active / Won
2. Existing Relationship / Do Not Prospect
3. Contacted / Waiting
4. Acknowledged / Case Open
5. Draft Only / Manager Review
6. Routing Failed / Blocked
7. Qualified / Solar + Inverter
8. Qualified / Complementary + Dropship
9. Research / Channel Verify
10. Backup / Diversification / Hold

These are supplier-commercial states and must not be substituted with the existing Solar customer-project pipeline stages.

## Required qualification dimensions

Track these independently:

- supplier/company identity
- priority
- strategic lane
- pipeline stage
- communication status
- account status
- dedupe state
- owner
- last contact
- next action and due date
- best commercial opportunity
- desired products / catalog gap
- MAP status
- margin qualification status
- dealer / wholesale status
- ecommerce resale authorization
- dropship authorization
- direct-to-customer fulfillment
- blind / neutral shipping
- inventory / tracking feed
- product documentation status
- Hawaii fulfillment status / gap
- Alaska fulfillment status / gap
- supplier-referral opportunity
- third-party logistics opportunity
- best commercial lane
- protected contact information
- website / source reference
- protected internal notes

**Dealer or wholesale approval must never automatically imply dropship approval, marketplace authorization, or Hawaii/Alaska support.**

## Dedupe and outbound guard

Dedupe is a hard operational control.

New-cold-outreach actions must be disabled when a supplier record is any of the following:

- active supplier
- existing relationship
- existing company / different branch without branch-specific context
- already sent / waiting
- draft only
- routing failed
- do not contact

The UI should show the block reason prominently.

Clean-new leads may progress through research and manager-review stages before outbound. After a supplier is contacted or replies, active correspondence and follow-up belong to the Email/Freight management lane.

## KPI and filter requirements

At minimum show KPI counts for:

- Active Authorized Partners
- Existing Relationships / Do Not Prospect
- Contacted / Waiting
- Acknowledged / Case Open
- Draft Only / Manager Review
- Routing Failed / Blocked
- Qualified Solar / Inverter
- Qualified Complementary / Dropship
- Research / Channel Verify
- Backup / Diversification / Hold

Provide filters for commercial opportunity dimensions including:

- solar panels
- inverters / power electronics
- dropship verified
- dropship verification needed
- Hawaii fulfillment gap
- Alaska fulfillment gap
- supplier referral opportunity
- third-party logistics opportunity
- regional / West Coast sourcing advantage where recorded

## Hawaii / Alaska logistics model

The UI must distinguish the commercial lane rather than treating all specialized freight as one transaction type.

Supported opportunity models include:

1. Elevation sells the product and coordinates specialized fulfillment.
2. A supplier refers demand and Elevation becomes the product seller/invoice issuer.
3. Another party owns the product transaction and Elevation performs standalone logistics coordination.

Do not infer route acceptance from a generic capability flag. Actual shipment feasibility remains SKU-, quantity-, origin-, destination-, carrier-, and compliance-specific under the current operations SOPs.

## Public repository / protected data boundary

This repository is public. The implementation may contain schema, UI, status definitions, validation logic, and workflow code.

Do **not** commit or hardcode:

- dealer / wholesale costs
- private margins
- private supplier inventory counts
- raw supplier correspondence
- private carrier quotes
- protected rate cards
- private payment terms
- protected carrier / forwarder / receiving-partner identities
- non-public hazardous-material or compliance packets
- customer personal information
- confidential supplier contacts or commercial evidence when it is not intended for public disclosure

Protected supplier records must live in the authenticated runtime/database layer.

## Import contract

Deployment may receive an internal supplier-lead snapshot generated from the Leads Pipeline manager. Map it into the protected supplier-commercial data model using stable supplier lead IDs.

The import dataset, private email evidence, and detailed operational notes must **not** be committed into the public repository.

## Acceptance criteria

Deployment is complete when:

- the existing customer/Solar Leads system still functions without regression;
- Supplier / Commercial Leads is accessible inside the existing Leads area;
- supplier records use a separate protected model/API;
- all required supplier qualification dimensions can be displayed and updated;
- the supplier tree and KPI counts are derived from stored records;
- dedupe states can block invalid new outreach;
- supplier/account, dropship, Hawaii/Alaska, referral, and 3PL dimensions remain independent;
- private supplier and logistics information does not leak into public source or unauthenticated responses;
- current `/operations/` rules remain controlling.