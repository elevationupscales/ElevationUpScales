# Deployment Brief — SOK Hawaii Packaging / HazMat Workflow

**Date:** 2026-09-08  
**Branch:** `plan/sok-order-first-growth-workflow-0908`  
**Status:** DEPLOYMENT INPUT / PROTECTED LOGISTICS BOUNDARY

## Deployment manager — required read

The Hawaii order-first build has verified route-specific carrier requirements behind the operating model.

Required source files:

- `operations/SOK_HAWAII_CARRIER_PACKAGING_HAZMAT_REQUIREMENTS.md`
- `operations/SOK_ORDER_FIRST_GROWTH_WORKFLOW_PLAN.md`
- `operations/SOK_ECOMMERCE_SHIPPING_SOP.md` — controlling asset-protection/disclosure boundary on `main`

The deployment manager may implement and use the internal operational detail needed to execute shipments. The system must **not automatically leak that internal detail into invoices, receipts, customer emails, storefront responses, exports, PDFs, or ordinary customer-visible order views**.

## Material build additions

Release B — Hawaii Order-First Foundation must represent these protected readiness gates:

- internal route qualified;
- carrier checklist current;
- exact SDS ready;
- UN38.3 / 38.3 report ready;
- UN number / Wh / battery data ready;
- state of charge verified against selected route profile;
- battery condition accepted;
- outer packaging confirmed;
- inner packaging confirmed where required;
- short-circuit protection confirmed;
- conductive-material separation confirmed where required;
- securement / blocking / bracing confirmed where required;
- packaging evidence ready where required;
- additional-carrier review complete where required;
- SOK preparation package sent;
- SOK warehouse confirmation received;
- booking documents ready;
- freight accepted / handoff ready.

## Internal data may be available to authorized deployment/admin

The protected operational layer may know or reference, when needed:

- exact carrier / forwarder;
- route identity and route-specific requirements;
- booking and quote references;
- origin / terminal / handoff information;
- receiving / storage / final-mile provider identity;
- carrier checklists and exact acceptance values;
- carrier-specific marks / labels / documents;
- route timing / scheduling / consolidation information;
- private freight rates and accessorials;
- alternate routes and internal route-selection logic.

These fields are operational assets. Access to them does not mean they are safe for downstream customer outputs.

## Invoice / receipt / customer-output redaction boundary

Invoice, receipt, payment-request, customer PDF, customer email and customer-visible order serializers must use an **allowlist**, not a dump of the internal logistics object.

Customer-facing financial documents may normally include:

- Elevation order / invoice number;
- customer-required billing/shipping data;
- product description / SKU as appropriate;
- quantity;
- retail product price;
- customer-facing freight / shipping amount;
- separately disclosed Elevation shipping / handling / logistics coordination fee when applicable;
- taxes / authorized fees;
- amount paid / balance due;
- customer-appropriate tracking or release information when required.

They must exclude by default:

- internal carrier / forwarder identity;
- alternate / backup route identity;
- raw carrier buy rate;
- carrier quote / booking reference;
- internal freight markup / margin;
- protected terminal / handoff address;
- receiving / storage partner identity unless the customer specifically needs that location to receive or collect the shipment;
- private final-mile partner identity unless operationally required for the customer's delivery;
- carrier-specific HazMat checklist details;
- exact carrier acceptance thresholds;
- internal dangerous-goods preparation steps;
- supplier cost / dealer cost;
- supplier private payment terms;
- internal supplier PO/payment notes;
- route-selection logic;
- protected carrier / supplier correspondence;
- internal operational notes.

If a receiving location or provider must be revealed for customer pickup, expose only the minimum pickup/release information required for that order — not the broader relationship, rate structure or network context.

## Protected route-profile principle

Exact carrier-specific acceptance values and documents are intentionally omitted from this public deployment brief.

The system should support protected route profiles capable of holding or referencing current requirements without publishing them in source code. Examples include:

- route-specific state-of-charge acceptance;
- capacity/configuration review thresholds;
- packaging details;
- evidence/photo requirements;
- booking-document requirements;
- container/load limits;
- carrier-specific marks or labels;
- current written-approval requirements.

Carrier acceptance remains controlling and must be revalidated before a real shipment.

## Supplier information boundary

SOK should receive only the preparation information needed to execute the specific shipment at origin:

- exact SKU / quantity required to execute the order;
- manufacturer-document requests needed for the exact SKU;
- battery condition requirements;
- state-of-charge requirement when applicable;
- physical packaging/securement requirements SOK is being asked to perform;
- required origin-side marks/labels or paperwork for that shipment;
- required preparation evidence/photos when applicable;
- the exact handoff/booking instruction only when SOK must physically tender the shipment there.

Do not disclose the broader Elevation carrier network, alternate routes, quote comparisons, rate structure, receiving network, route-selection logic, or other internal logistics intelligence unless a specific operational need requires it.

## Privacy / commercial-asset boundary

Do not place in public Git, deployment UI visible to unauthorized users, customer-facing pages, invoice outputs, or routine supplier outreach:

- carrier identities tied to Elevation's working route network when commercially sensitive;
- private carrier checklists/documents;
- exact carrier-specific thresholds that reveal the working route playbook;
- freight rates or accessorial structures;
- quote / booking references;
- origin terminal or detailed handoff routing;
- Hawaii receiving/storage partner identities and private terms;
- backup carrier identities;
- internal route-comparison or carrier-selection logic;
- customer PII outside the required transaction context.

## Implementation rule

Use separate internal and external representations.

**INTERNAL LOGISTICS RECORD** may contain protected execution detail.  
**CUSTOMER OUTPUT MODEL** must contain only explicitly approved customer-facing fields.

Do not create invoices, PDFs, emails or receipts by serializing the internal shipment record directly.

## Deployment interpretation

The application should make the owner's next action obvious without revealing protected logistics intelligence.

**Do not hard-code one carrier's rules globally. Do not expose the carrier playbook merely to make the workflow self-contained.**

Release B should instead know that an exact order is:

**ROUTE QUALIFIED → REQUIREMENTS CURRENT → SOK PREP READY → SOK CONFIRMED → BOOKING READY → FREIGHT ACCEPTED**

with detailed requirements stored/referenced only inside the protected operational boundary.
