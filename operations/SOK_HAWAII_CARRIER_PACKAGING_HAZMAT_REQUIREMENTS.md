# SOK Hawaii Carrier Packaging / HazMat Requirements

**Status:** VERIFIED CARRIER REQUIREMENTS / DEPLOYMENT INPUT  
**Branch:** `plan/sok-order-first-growth-workflow-0908`  
**Use:** Deployment and Logistics workflow design only  
**Source basis:** Carrier correspondence and carrier-issued lithium shipment checklist/quote stipulations supplied to Elevation UpScales in September 2026.

## Control rule

These requirements are **carrier-specific acceptance requirements** for a qualified Hawaii lithium route and must not be treated as a universal lithium-shipping checklist for every provider.

For each real order:

**EXACT SKU + QUANTITY + ROUTE → CURRENT CARRIER REQUIREMENTS → SOK PREPARATION PACKAGE → SOK CONFIRMATION → BOOKING**

Carrier acceptance remains controlling. Reconfirm the current checklist/booking requirements before shipment because carrier policies can change.

Do not expose private carrier rates, quote totals, private commercial terms, customer PII, or protected correspondence in public Git.

---

## Verified booking package requirements

The accepting freight route requires the following to be ready at booking/review:

- completed lithium battery shipment checklist;
- current Safety Data Sheet (SDS) for the exact model;
- UN38.3 / 38.3 test report availability confirmed;
- UN identification number;
- watt-hour rating per battery;
- battery weight;
- total number of batteries;
- batteries per container / cargo transport unit where applicable;
- battery use/product type;
- reason for shipment;
- state of charge per battery;
- shipper certification / responsible party information;
- bill of lading / booking reference linkage where required.

The Logistics workflow should have a **Booking Documents Ready** gate that cannot pass until the exact-order packet is complete.

---

## Verified state-of-charge gate

For the Pasha Hawaii container-services checklist supplied through the freight forwarder:

- lithium battery state of charge must be **at least 20% and no more than 50%**;
- batteries outside that range are subject to rejection at the terminal.

The deployment should therefore support an order-specific field/state:

**SOC CONFIRMED 20–50% → PASS**  
**SOC UNKNOWN / OUTSIDE RANGE → HOLD / ESCALATE**

Do not hard-code this range as a universal rule for unrelated carriers; bind it to the qualified route/carrier profile.

---

## Verified packaging requirements

The carrier checklist requires:

- batteries contained in **strong outer packaging**;
- cells/batteries placed in **non-metallic inner packaging that completely encloses them**;
- batteries separated from contact with other equipment, devices, or electrically conductive materials such as metal;
- packaging that prevents **short circuits**;
- packaging that prevents damage caused by shifting or placement within the package;
- packaging that prevents accidental activation of equipment where applicable;
- batteries secured so they cannot move inadvertently during transport;
- battery terminals protected so they do not support the weight of superimposed/stacked elements;
- packages blocked and braced to prevent shifting inside the cargo transport unit/container;
- freight configured so it is safe for ocean transport and forklift handling where the route requires forkliftable freight.

The SOK preparation package should make each of these a Yes/No/Needs-Review item rather than relying on free-form notes.

---

## Verified evidence requirements

The carrier checklist specifically calls for:

- photos of the packaging; and
- photos of blocking/bracing;

attached to the shipment checklist.

The Logistics workflow should support protected evidence/status fields for:

- packaging photos received;
- blocking/bracing photos received;
- evidence reviewed;
- evidence accepted / needs correction.

Do not store customer-sensitive or commercially protected images in a public repository.

---

## Battery condition / prohibition gates

The supplied Pasha Hawaii checklist states that the route does **not** accept unsealed damaged, defective, or recalled lithium batteries under the normal container-service program.

The shipment record therefore needs a condition gate:

- new / undamaged / non-defective / non-recalled confirmed;
- damaged/defective/recalled → **STOP / ESCALATE**;
- used/end-of-life battery handling must not be assumed supported by this normal route.

This aligns with the Hawaii receiving-side rule already established that used-lithium acceptance must be separately qualified.

---

## Wh marking / identification requirements

The supplied checklist requires watt-hours as a core acceptance field.

Operationally:

- record exact voltage and amp-hour rating;
- record or calculate watt-hours where necessary using **V × Ah = Wh**;
- confirm whether Wh is visibly marked on the battery;
- if not visible, maintain supporting SDS / test-report evidence for the exact model.

The deployment should preserve this as structured product/document-readiness data, not as customer-entered information.

---

## High-capacity / additional-review gate

The supplied Pasha Hawaii checklist states:

- lithium-ion batteries **above 5 kWh per battery** require additional review and written approval from the carrier battery team before booking approval.

The Logistics workflow should therefore include:

**≤ 5 kWh route profile → normal route review**  
**> 5 kWh per battery → ADDITIONAL CARRIER REVIEW REQUIRED**

This is especially important for higher-capacity 48V/commercial SOK products and future large-format batteries.

Do not infer acceptance merely because a lower-capacity SOK model has already been quoted.

---

## Container weight / load rules captured from carrier checklist

The supplied checklist includes route-level gross battery shipment limits for certain UN-number configurations by container size. These are **carrier/container qualification limits**, not storefront rules.

The system should therefore support:

- container/load-limit profile;
- total battery shipment weight;
- route limit check;
- pass / carrier review / reject state.

Do not publish or hard-code a generic public promise that any quantity will be accepted.

---

## Freight-forwarder quote stipulations that affect the build

SOK-specific freight quotes supplied by the forwarder repeat these operational requirements:

- shipment is treated as **hazardous goods**;
- SDS and lithium battery shipment checklist must be submitted at booking;
- short-circuit protection is mandatory;
- strong outer packaging is mandatory;
- batteries must be secured against inadvertent movement;
- terminals must not bear the weight of superimposed elements;
- freight details used for booking must match the actual shipment;
- quote/booking reference should be carried onto the bill of lading when required;
- freight must be safe for ocean transport and forklift handling;
- special handling such as repackaging, crating, strapping, or special equipment may be required if the shipment arrives outside the accepted configuration;
- hazmat compatibility and container-utilization rules can affect sailing acceptance/timing.

The deployment manager should treat these as **operational workflow gates**, not pricing logic.

---

## Required Command Center / Logistics states

The Hawaii first-order workflow should expose at minimum:

**Order Requirements**  
→ **Carrier Route Selected**  
→ **Carrier Checklist Current**  
→ **SDS Ready**  
→ **UN38.3 Ready**  
→ **UN / Wh / Battery Data Ready**  
→ **SOC Confirmed**  
→ **Condition Gate Passed**  
→ **Packaging Requirements Ready**  
→ **Short-Circuit Protection Confirmed**  
→ **Inner / Outer Packaging Confirmed**  
→ **Securement / Blocking-Bracing Confirmed**  
→ **Packaging Evidence Ready**  
→ **Additional Carrier Review Complete if Required**  
→ **SOK Prep Package Sent**  
→ **SOK Confirmed**  
→ **Booking Documents Ready**  
→ **Freight Accepted / Handoff Ready**  
→ **Hawaii Receiving**  
→ **Customer Release / Delivery Complete**

Any failed safety/acceptance condition should move the order to **HOLD / ESCALATE**, not silently continue.

---

## Deployment acceptance rule

Release B — Hawaii Order-First Foundation is not operationally complete unless the Logistics workflow can represent these verified carrier-specific states without requiring the owner to reopen old email attachments.

The UI does **not** need to expose every technical detail on the primary screen. It does need to retain the underlying structured status and make the next required action obvious.

Private carrier pricing and commercial records remain outside public Git and outside customer-facing interfaces.
