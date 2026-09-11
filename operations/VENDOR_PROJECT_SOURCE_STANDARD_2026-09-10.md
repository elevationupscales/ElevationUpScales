# Elevation UpScales — Vendor Project Source Standard

**Owner:** Casey Young  
**Effective:** 2026-09-10  
**Status:** ACTIVE / OPERATING STANDARD

## Purpose

Require one accessible, public-safe **Project Source** record for every dedicated Elevation vendor project so the Project Operations Manager, Project Specialist and authorized bounded workers can build and operate the vendor without reconstructing onboarding from chats, email history or unrelated files.

The Project Source is the vendor project's onboarding/control index. It is not a second work board, supplier contract, credential store or private commercial database.

## Promotion rule

A supplier may remain a prospect/lead in `SUPPLIER_LEADS_LIVE_MAP.md` without a dedicated Project Source.

Once Elevation creates or recognizes a dedicated vendor project / dedicated vendor Project Operations Manager, the project must have a Project Source file linked from `CURRENT_WORK_BOARD.md`.

Use:

**QUALIFIED / APPROVED SUPPLIER → DEDICATED VENDOR PROJECT → PROJECT SOURCE → TAILORED WORKFLOW → VERIFIED CATALOG / COMMERCE / FULFILLMENT → FIRST REAL ORDER PROOF → ACTIVE REPEATABLE VENDOR**

Do not create Project Source files for every cold prospect merely to satisfy paperwork.

## Required Project Source content

Every dedicated vendor Project Source must contain enough public-safe information to answer:

1. Who is the vendor and what is the intended Elevation relationship?
2. Who owns the project and who is the project specialist?
3. What Elevation company onboarding data is reusable for the vendor?
4. Which protected Elevation documents/identifiers exist and where should an authorized operator retrieve them?
5. What supplier approval/account state is verified?
6. What products/SKUs/source data are available?
7. What MAP/pricing/channel rules are verified?
8. What inventory/sellability source exists?
9. What fulfillment/order/tracking model is verified?
10. What tax/resale treatment is known or still needs confirmation?
11. What warranty/returns/RMA process is known?
12. What approved media/specification/compliance inputs exist?
13. What exact gaps remain before safe publication/ordering?
14. What first-order proof is required before the lane is considered repeatable?
15. What maturity stage is the project currently in?
16. What current next action, close condition and real gates apply?

## Reusable Elevation onboarding data

Each vendor Project Source should carry or reference the following reusable Elevation company facts:

### Public-safe company identity

- **Legal company name:** Elevation UpScales, Inc.
- **Entity:** Colorado profit corporation.
- **Owner / President:** Casey Young.
- **Primary website:** `https://elevationupscales.com`.
- **Primary operating model:** lithium battery supply, solar/off-grid power, logistics/market access, with RV & Outdoor as a supporting division.
- **Preferred supplier model:** order-driven / dropship / controlled fulfillment first; speculative inventory only when economics and owner approval support it.
- **Primary customer commerce channel:** Elevation's own website unless the supplier separately authorizes additional channels.
- **Operational principle:** supplier stock is not represented as Elevation physical On Hand unless Elevation actually owns/controls that inventory.

### Protected company onboarding evidence

The Project Source must mark the status/existence of these records without exposing protected identifiers in public Git:

- Colorado formation / Articles of Incorporation;
- IRS EIN confirmation;
- signed/current W-9;
- Colorado sales-tax / resale documentation;
- current company mailing/registered-address record;
- approved business phone/contact record;
- applicable tax-exemption/resale certificate package;
- owner-signed vendor application or supplier-specific forms when applicable;
- banking/payment/card details when a supplier requires them.

**Never put EIN numbers, tax-license numbers, bank/card data, private addresses, credentials, private application fields, signatures or private supplier forms in the public repository.**

An authorized operator retrieves protected onboarding evidence from the current approved private company record/source used by Company Operations. If a protected field cannot be verified, classify it UNKNOWN rather than guessing.

## Required supplier onboarding fields

The Project Source must classify each as **VERIFIED / AVAILABLE / WAITING / UNKNOWN / NOT APPLICABLE**:

- supplier relationship/account status;
- legal/vendor program name;
- account/portal access state;
- supplier contact route;
- exact product catalog / SKU source;
- supplier cost/pricing source (protected evidence only);
- MAP / advertised-price rules;
- authorized sales channels;
- inventory / availability source;
- ship-from / warehouse source;
- dropship / order placement process;
- payment method/terms setup status;
- shipping / tracking process;
- backorder/preorder rules;
- returns process;
- warranty/RMA process;
- approved product media/spec/manual source;
- required compliance/SDS/UN38.3 or other regulated-product documents where applicable;
- tax/resale/exemption treatment;
- customer-support / account / catalog contacts;
- source refresh/update method;
- first-order proof status.

## Activation definition

A dedicated vendor project is **ACTIVE RELATIONSHIP** when supplier approval exists, but it is not **REPEATABLE ACTIVE VENDOR COMMERCE** until the project has enough verified evidence to safely perform the intended channel/order flow.

Normal activation proof should establish, as applicable:

**ACCOUNT / AUTHORIZATION → EXACT SKU SOURCE → PRICE/MAP → CHANNEL → SELLABILITY → FULFILLMENT → MEDIA/FACTS → CUSTOMER CHECKOUT → SUPPLIER ORDER → TRACKING → DELIVERY → RETURNS/WARRANTY ROUTE**

A missing optional enrichment item must not block the whole vendor when safe commerce is otherwise supported.

## Project Source update discipline

Update the existing Project Source when a material onboarding/vendor fact changes.

Do not create versioned duplicate source files for routine changes.

Record public-safe state such as:

- source received;
- portal active;
- MAP verified;
- channel authorized;
- tax treatment pending;
- first order proven;
- warranty route verified;
- source refresh established.

Keep private pricing, inventory counts, correspondence and credentials in their protected evidence source.

## Work-board requirement

`CURRENT_WORK_BOARD.md` must contain a **Dedicated Vendor Project Source Index** linking each current dedicated vendor project to:

- Project Operations Manager;
- Project Specialist;
- Project Source file;
- Tailored Project Workflow;
- current high-level project state.

The Work Board routes/discovers the source; the Project Source holds onboarding readiness; the tailored workflow controls execution; the supplier map controls supplier-domain relationship state.

## Gate discipline

The Project Source checklist is a readiness/control tool, not an automatic blanket gate.

Block only the exact action that lacks a fact required for that action.

Examples:

- unknown marketplace authorization blocks that marketplace, not the verified direct-site channel;
- unavailable SKU blocks that SKU unless a verified preorder/backorder path exists;
- missing Hawaii DG route blocks that Hawaii shipment, not Lower-48 sales;
- pending tax optimization does not automatically block a transaction when customer price, supplier orderability and lawful tax treatment remain executable;
- optional media enrichment does not block an otherwise compliant exact-SKU order path.

## Control phrase

**ONE DEDICATED VENDOR PROJECT → ONE PROJECT SOURCE → ONE TAILORED WORKFLOW → VERIFIED ONBOARDING FACTS → ONLY REAL GATES → FIRST-ORDER PROOF → REPEATABLE ACTIVE VENDOR.**
