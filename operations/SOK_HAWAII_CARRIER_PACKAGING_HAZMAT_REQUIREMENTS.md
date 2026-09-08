# SOK Hawaii Carrier Packaging / HazMat Requirements

**Status:** DEPLOYMENT INPUT / PROTECTED LOGISTICS BOUNDARY  
**Branch:** `plan/sok-order-first-growth-workflow-0908`  
**Use:** Deployment and Logistics workflow design only

## Control rule

Elevation has verified carrier-specific lithium acceptance requirements for qualified Hawaii freight routes. The public repository must preserve the **workflow structure and required data fields**, but must not expose the exact carrier network, route-specific thresholds, quote references, receiving/handoff network, or carrier-issued operational playbook.

For each real order:

**EXACT SKU + QUANTITY + QUALIFIED INTERNAL ROUTE PROFILE → CURRENT CARRIER REQUIREMENTS → SOK PREPARATION PACKAGE → SOK CONFIRMATION → BOOKING**

Carrier acceptance remains controlling. Current route requirements must be revalidated before shipment.

Do not expose private carrier identities tied to Elevation routing, rates, quote totals, booking references, receiving partners, handoff instructions, commercial terms, customer PII, or protected correspondence in public Git.

---

## Deployment data model — booking readiness

The protected Logistics workflow must be able to represent, without exposing the underlying carrier playbook publicly:

- carrier checklist current / verified;
- exact Safety Data Sheet (SDS) ready;
- UN38.3 / 38.3 test report ready;
- UN identification number;
- watt-hour rating per battery;
- battery weight;
- total number of batteries;
- batteries per cargo transport unit where applicable;
- battery use/product type;
- reason for shipment where required;
- state-of-charge confirmation against the selected route profile;
- shipper certification / responsible-party information where required;
- booking/BOL linkage status;
- shipment details match accepted carrier profile.

The Logistics workflow should have a **Booking Documents Ready** gate that cannot pass until the exact-order packet is complete.

---

## Packaging readiness fields

The selected route profile may require some or all of the following. The application must support these as structured Yes / No / Needs Review fields without publishing route-specific rules:

- strong outer packaging confirmed;
- required inner packaging confirmed;
- separation from conductive materials confirmed;
- short-circuit protection confirmed;
- protection against damage or shifting confirmed;
- accidental activation protection confirmed where applicable;
- batteries secured against inadvertent movement;
- terminal/load-bearing protection confirmed;
- blocking/bracing confirmed where applicable;
- ocean/forklift handling readiness confirmed where applicable.

The exact standard for each field belongs to the protected route profile, not public source code or customer-facing text.

---

## Evidence readiness

The selected route may require shipment evidence such as:

- packaging photos;
- blocking/bracing photos;
- completed carrier checklist;
- supporting model documentation.

The system should preserve only protected evidence references/statuses such as:

- packaging evidence received;
- securement evidence received;
- evidence reviewed;
- accepted / correction required.

Do not store commercially protected shipment images, carrier documents, or customer-sensitive evidence in a public repository.

---

## Battery condition gate

The shipment workflow must represent:

- new / undamaged / non-defective / non-recalled confirmed;
- condition unknown → HOLD / REVIEW;
- damaged / defective / recalled → STOP / ESCALATE;
- used/end-of-life handling separately qualified rather than assumed supported.

---

## Product identification readiness

Products used in a qualified lithium shipment should have structured readiness for:

- exact manufacturer/model;
- voltage;
- amp-hour rating;
- watt-hour rating;
- visible Wh marking status;
- SDS availability;
- UN38.3 availability;
- applicable UN identification;
- route-specific review status.

Where a carrier requires a capacity or other acceptance threshold, the threshold value belongs in the protected route profile and must not be hard-coded into public documentation.

---

## Additional-carrier-review gate

Some battery capacities, configurations, quantities, conditions, or container profiles require additional carrier review before booking.

The Logistics workflow therefore needs:

**NORMAL ROUTE REVIEW**  
**ADDITIONAL CARRIER REVIEW REQUIRED**  
**WRITTEN ACCEPTANCE RECEIVED**  
**REJECTED / ALTERNATE ROUTE REQUIRED**

Do not expose the carrier-specific threshold or rule in public Git.

---

## Required Command Center / Logistics states

The Hawaii first-order workflow should expose at minimum:

**Order Requirements**  
→ **Internal Route Qualified**  
→ **Carrier Checklist Current**  
→ **SDS Ready**  
→ **UN38.3 Ready**  
→ **UN / Wh / Battery Data Ready**  
→ **SOC Verified Against Route Profile**  
→ **Condition Gate Passed**  
→ **Packaging Requirements Ready**  
→ **Short-Circuit Protection Confirmed**  
→ **Inner / Outer Packaging Confirmed as Applicable**  
→ **Securement / Blocking-Bracing Confirmed as Applicable**  
→ **Packaging Evidence Ready if Required**  
→ **Additional Carrier Review Complete if Required**  
→ **SOK Prep Package Sent**  
→ **SOK Confirmed**  
→ **Booking Documents Ready**  
→ **Freight Accepted / Handoff Ready**  
→ **Hawaii Receiving**  
→ **Customer Release / Delivery Complete**

Any failed safety/acceptance condition must move the order to **HOLD / ESCALATE**, not silently continue.

---

## Information-separation rule

### Safe for deployment code / public Git

- generic workflow states;
- generic readiness field names;
- requirement that a route-specific carrier checklist exists;
- requirement that exact carrier acceptance controls fulfillment;
- requirement for SDS / UN38.3 / product identification readiness;
- generic packaging, condition, evidence, and escalation states.

### Protected Elevation logistics information — keep outside public Git

- carrier identities tied to Elevation's working routes;
- exact route-specific SOC or capacity thresholds;
- carrier checklists and non-public carrier documents;
- quote numbers and booking references;
- freight rates / accessorial structures;
- origin terminal and handoff instructions;
- Hawaii receiving/storage partner identities and terms;
- alternate/backup carrier identities;
- exact carrier-specific labels/marks instructions;
- route-by-route timing, sailing, consolidation, or acceptance intelligence;
- internal selection logic showing why one route is chosen over another;
- customer shipment details and PII.

### Supplier disclosure boundary

SOK receives only the order-specific preparation requirements it needs to perform at origin, plus any exact carrier paperwork/instructions required for that shipment. Elevation does not need to disclose the broader carrier network, alternate routes, commercial rate structure, receiving network, or route-selection logic.

---

## Deployment acceptance rule

Release B — Hawaii Order-First Foundation is not operationally complete unless Logistics can represent the required packaging/HazMat readiness states while keeping the underlying carrier network and route-specific commercial intelligence protected outside public Git and customer-facing interfaces.
