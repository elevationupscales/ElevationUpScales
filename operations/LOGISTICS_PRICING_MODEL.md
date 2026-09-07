# Elevation UpScales — Logistics Pricing Model

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-07**  
**Owner: Casey Young**  
**Scope: Hawaii / Alaska / specialized freight / lithium logistics / third-party freight coordination**

## Purpose

Define how Elevation UpScales prices specialized shipping and logistics work without confusing product-sale margin with standalone logistics-service margin.

Core rule:

**ELEVATION PRODUCT SALE PRICING AND THIRD-PARTY LOGISTICS FACILITATION PRICING MUST NOT USE THE SAME RATE STRUCTURE.**

Elevation may earn margin from the product, from logistics work, or from both, but the customer-facing price must remain commercially reasonable, disclosed, and appropriate to the service actually being provided.

This document controls the pricing architecture. Exact internal fee percentages, minimums, carrier buy-rates, supplier costs, negotiated partner pricing, and private commercial terms must remain in the protected internal rate card and must not be committed to this public repository.

---

## 1. Pricing lanes

### Lane A — Elevation direct product sale

Elevation sells the product to the customer and also coordinates specialized shipping.

Examples:

- Elevation website order
- Shopify order
- eBay order
- Meta order
- TikTok Shop order
- direct Elevation invoice
- Elevation-owned Hawaii inventory sale

Commercial logic:

- product margin already exists in the transaction;
- freight and accessorial charges are recovered separately;
- Elevation may add a reasonable disclosed shipping / handling / coordination charge;
- the logistics charge should generally be lower than a standalone third-party facilitation fee because Elevation is already earning product margin;
- do not stack a large logistics percentage on top of a normal product sale merely because freight is specialized.

Customer-facing structure:

**PRODUCT PRICE**  
**+ FREIGHT / HAZMAT / TERMINAL / STORAGE / FINAL-MILE COSTS**  
**+ ELEVATION SHIPPING / HANDLING / COORDINATION CHARGE**  
**= LANDED ELEVATION PRICE**

For SOK products, preserve MAP and other current authorized pricing rules.

---

### Lane B — SOK or supplier referral that becomes an Elevation sale

A supplier sends Elevation a Hawaii / Alaska customer or dealer inquiry, but Elevation sells and invoices the product.

Examples:

- SOK refers a Hawaii consumer to Elevation
- SOK refers a Hawaii dealer to Elevation
- supplier referral converts to an Elevation commercial order
- customer buys from Elevation-owned or Elevation-procured inventory

Commercial rule:

**TREAT THIS AS AN ELEVATION PRODUCT SALE, NOT A THIRD-PARTY FREIGHT JOB.**

The referral source does not change the pricing lane if Elevation owns the customer transaction and sells the product.

Use the same general pricing architecture as Lane A:

**PRODUCT MARGIN + REASONABLE SPECIALIZED-SHIPPING RECOVERY**

Do not charge the customer as if Elevation were an outside freight broker when Elevation is already the seller of record for the product transaction.

---

### Lane C — Third-party logistics facilitation

Another party owns or sells the product and Elevation is engaged specifically to engineer, coordinate, manage, or facilitate the specialized shipment.

Examples:

- supplier has already sold the battery and asks Elevation to move it to Hawaii
- outside dealer owns the customer transaction and asks Elevation to coordinate freight
- commercial customer already owns the goods and needs Elevation to manage mainland-to-Hawaii movement
- Elevation coordinates origin preparation, carrier routing, Hawaii receiving, final-mile delivery, or shipment exception management without earning product margin

Commercial logic:

- Elevation does not have product margin to compensate for the logistics work;
- the transaction must include a dedicated Elevation logistics / coordination / management fee;
- the service fee must account for labor, overhead, transaction risk, document handling, shipment design, exception management, communication, and operational responsibility;
- Lane C pricing must be materially distinct from Lane A / Lane B pricing.

Customer-facing structure:

**THIRD-PARTY TRANSPORTATION / ACCESSORIAL COSTS**  
**+ ELEVATION LOGISTICS COORDINATION / MANAGEMENT FEE**  
**= ELEVATION LOGISTICS PRICE**

Do not expose carrier buy-rates, partner identities, private negotiated rates, or internal markup mechanics in the customer quote.

---

## 2. Shipment-size pricing tiers

Each lane may use different internal fee treatment for:

### Tier 1 — Small shipment

Typical examples:

- one battery
- two to three batteries
- small loose-carton movement
- low-volume will-call or freight-to-door shipment

Pricing must recover the high per-order administrative burden that exists even when freight spend is relatively small.

Do not rely only on a percentage of carrier cost if that would fail to cover Elevation labor and overhead.

### Tier 2 — Pallet / commercial LTL-LCL shipment

Typical examples:

- mixed-SKU pallet
- stocking order
- dealer replenishment
- multi-battery commercial movement

A lower percentage may be appropriate than on small shipments because the transportation base grows faster than the administrative workload.

Use a protected minimum service charge so larger jobs still cover Elevation's operational responsibility.

### Tier 3 — Large commercial / containerized movement

Typical examples:

- multiple pallets
- consolidated stocking loads
- containerized freight
- high-value commercial replenishment

Quote individually.

Pricing should reflect actual scope, including:

- shipment engineering
- carrier / forwarder coordination
- DG / hazmat preparation coordination
- origin handling
- palletization / securement oversight where applicable
- receiving / storage coordination
- final-mile / outer-island coordination
- transaction value and operational risk
- communication and exception management

Do not automatically scale a small-shipment percentage to container-size freight.

---

## 3. Protected internal rate card

Exact numerical rates belong in a protected internal rate card, not this public repository.

The protected rate card may include:

- percentage service fees by lane and shipment tier
- minimum Elevation coordination charges
- maximum or negotiated fee caps where appropriate
- carrier buy-rates
- partner receiving / storage rates
- Hawaii final-mile rates
- California preparation costs
- hazmat / DG preparation costs
- insurance / declared-value treatment
- payment-processing overhead
- contingency or exception allowances
- approved commercial-discount authority

Public code, public SOPs, supplier emails, and customer-facing pages must not reveal this private rate-card structure unless Casey explicitly approves disclosure.

---

## 4. Quote-building formula

Before issuing a specialized-shipping quote, build an internal shipment profile.

Minimum inputs:

- exact product / SKU
- quantity
- carton dimensions
- gross packed weight
- pallet configuration when applicable
- destination island / ZIP
- terminal pickup vs delivery
- residential vs commercial delivery when applicable
- required DG / hazmat handling
- origin preparation requirements
- receiving / storage requirements
- final-mile requirements
- carrier / forwarder accessorials
- insurance or declared-value requirements when relevant
- payment-processing effect when relevant
- Elevation pricing lane
- shipment-size tier

Then calculate:

**DOCUMENTED THIRD-PARTY COSTS**  
**+ ELEVATION-APPLICABLE SERVICE / HANDLING CHARGE**  
**+ APPROVED CONTINGENCY / ACCESSORIAL ALLOWANCE WHEN NEEDED**  
**= CUSTOMER QUOTE**

Do not guess a flat Hawaii shipping price across unrelated SKUs or quantities.

---

## 5. Market-fairness rule

Elevation's logistics pricing must do two things simultaneously:

1. cover real overhead and create profit for the logistics capability Elevation has built;
2. remain competitive enough that the logistics charge does not destroy the underlying product or referral opportunity.

Before finalizing a rate, evaluate:

- product gross margin
- total landed price
- shipment complexity
- customer alternative options
- local Hawaii availability
- transaction size
- operational time required
- exception risk
- whether Elevation is also earning product margin
- whether the service is product fulfillment or standalone freight facilitation

Do not use one universal markup percentage for every order.

---

## 6. SOK referral protection

When SOK or another supplier refers Hawaii demand to Elevation and Elevation becomes the seller:

- Elevation owns the customer transaction;
- Elevation prepares the product / landed-cost quote;
- Elevation chooses and manages the qualified logistics path;
- Elevation may invoice the customer directly;
- supplier MAP / authorized dealer obligations remain in force;
- carrier identities, negotiated partner names, private carrier quotes, and internal margin calculations remain protected.

Do not provide a supplier with Elevation's raw carrier rate sheets merely because the supplier referred the customer.

Share only the operational preparation requirements needed for the supplier to tender the shipment correctly.

---

## 7. Third-party facilitation protection

When Elevation is hired only to facilitate logistics:

- issue an Elevation logistics quote, not the underlying carrier's private quote;
- state the service scope clearly;
- distinguish transportation cost from Elevation's disclosed service / coordination charge where commercially appropriate;
- preserve carrier and partner confidentiality;
- define whether the quote includes origin prep, hazmat coordination, terminal handling, receiving, storage, delivery, outer-island routing, insurance, or other services;
- require updated pricing when shipment facts materially change.

Elevation's value is not only buying freight. It includes building and operating the shipment path.

---

## 8. Route confidentiality

The logistics network itself is a commercial asset.

Externally disclose capabilities such as:

- mainland-to-Hawaii lithium freight
- terminal / will-call
- freight-to-door
- receiving
- storage
- customer release
- Oahu delivery
- outer-island routing
- alternate California preparation / handoff

Do not unnecessarily disclose:

- carrier names
- forwarder names
- Hawaii warehouse / receiving partner identities
- negotiated contact names
- private rate sheets
- underlying freight cost
- internal markup
- fallback-route identities

Operational partner names may be disclosed when actually required to execute a booked shipment, contract, BOL, tender, delivery appointment, or legal / compliance obligation.

---

## 9. Pricing and route separation

Do not confuse route qualification with pricing authorization.

A route may be:

- operationally qualified but not yet commercially approved;
- priced for one SKU / quantity but not another;
- valid for terminal pickup but not delivery;
- valid for small LCL shipments but not pallets or containers;
- valid for one destination island but not another.

Every customer quote must be based on the actual shipment profile and currently verified pricing inputs.

---

## 10. Large-load / container rule

Small-shipment and pallet requirements may share a core lithium / DG compliance foundation, but do not assume a small-shipment quote or preparation profile applies unchanged to a full pallet, multi-pallet, or container movement.

For larger loads, separately confirm:

- carrier acceptance
- total weight / cube
- pallet count
- securement
- container / consolidation requirements
- DG documentation
- marks / labels
- shipper declaration responsibilities when applicable
- origin receiving / cutoff
- destination receiving capability
- storage / release
- final-mile scope
- insurance / liability treatment
- current commercial pricing

Elevation may use established freight relationships to prepare and move these shipments, but each larger movement requires a shipment-specific commercial quote.

---

## 11. Invoice presentation

### Elevation product sale

Customer invoice may present:

- product
- specialized Hawaii / Alaska shipping and handling
- optional terminal / delivery service
- other clearly disclosed accessorials
- total landed amount

Do not expose supplier dealer cost or carrier buy-rate.

### Third-party logistics facilitation

Customer invoice may present:

- shipment / logistics service description
- origin and destination region
- shipment profile
- transportation / handling component where appropriate
- Elevation logistics coordination / management service
- optional receiving / storage / delivery components
- total service amount

The invoice should make clear that Elevation is charging for a managed logistics service, not merely forwarding another company's invoice.

---

## 12. Pricing-change authority

Casey's newest explicit pricing direction controls.

Workers may calculate, compare, model, and prepare quotes, but must not publish or externally commit a new fee schedule, supplier-facing rate card, customer-facing standard surcharge, or major pricing policy without owner approval.

Actual carrier / partner charges must be revalidated when stale, shipment facts change, or the provider states the quote is no longer valid.

---

## 13. Operating principle

**DIRECT PRODUCT SALE:** earn product margin + fair specialized-shipping recovery.  
**SUPPLIER REFERRAL THAT BECOMES ELEVATION SALE:** treat as an Elevation product sale.  
**THIRD-PARTY LOGISTICS JOB:** charge a dedicated logistics-service margin because Elevation is not earning product margin.  
**LARGE / CONTAINER LOAD:** quote individually.  
**ALL LANES:** protect private carrier rates, partner identities, supplier costs, and internal margin mechanics.

The purpose of the model is to make the Hawaii / Alaska logistics capability sustainable without pricing Elevation out of the market or giving away the operational network that creates the value.
