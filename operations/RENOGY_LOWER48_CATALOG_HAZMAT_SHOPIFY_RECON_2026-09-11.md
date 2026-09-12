# Elevation UpScales — Renogy Lower-48 Catalog / Lithium Hazmat / Shopify Recon

**Status:** ACTIVE / PUBLIC-SAFE EXECUTION RECEIPT  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Lane:** Renogy Branch Operations Manager  
**Parent SOP:** `RENOGY_VENDOR_MASTER_SOP.md`

## Owner direction executed

Build the Renogy prospect item list and product count, begin the lithium hazmat profile, continue the Lower-48 catalog even if the authenticated Partner Portal source is unavailable, strictly preserve Renogy MAP, and recon Shopify for the safest integration path.

## Source/access state

The authenticated Renogy Partner Portal was not available to the active browser session for catalog extraction without a login. No password was created, reset, or changed and no account-security action was taken.

Per owner direction, work did **not** stop. Public Renogy US catalog sources were used as the fallback discovery source. Dealer-specific protected pricing/MAP values remain outside public Git and remain a mandatory verification gate before publication.

## Public US catalog census

Read-only census of the Renogy US `All Products` collection returned:

- **188 product cards total**
- **6 collection pages**
- page 1: 30
- page 2: 30
- page 3: 30
- page 4: 32
- page 5: 50
- page 6: 16

This 188 count is the current **public Lower-48 prospect universe**, not an assertion that all 188 are dealer-sellable, MAP-cleared, in stock, or approved for immediate Elevation publication.

### Catalog state model

Every discovered Renogy prospect must move through:

**DISCOVERED → EXACT SKU VERIFIED → DEALER SELLABILITY VERIFIED → MAP VERIFIED → MEDIA/FACTS VERIFIED → FULFILLMENT VERIFIED → LOWER-48 READY → SHOPIFY DRAFT → QA → ACTIVE**

A public product card alone is insufficient for ACTIVE publication.

## Lithium census / hazmat intake universe

The public Renogy US lithium-batteries collection showed:

- **20 unique visible lithium battery product cards** in the collection grid
- sidebar filter total: **22**
- sidebar in-stock count: **20**
- sidebar out-of-stock count: **2**

The 20-vs-22 discrepancy is preserved as an unresolved source difference. Do not invent two missing SKUs or force the grid count to match the sidebar.

### Visible lithium prospect list

1. Mini Size 12V 300Ah LiFePO4 Battery w/ Low-Temperature Protection
2. 12V 300Ah Deep Cycle Lithium Iron Phosphate Battery w/Self-Heating — Core Series
3. Mini Size 12.8V 100Ah Lithium Iron Phosphate Battery
4. Pro S1 12V 120Ah / 240Ah LiFePO4 Battery
5. 12V 200Ah Smart LiFePO4 Battery w/ Bluetooth & Self-Heating — Pro Series
6. Mini Size 12V 200Ah LiFePO4 Battery w/ Low-Temperature Protection
7. Mini Size 12V 100Ah DuoHeat Tech Lithium Iron Phosphate Battery
8. 12V 100Ah Trolling Motor Lithium Iron Phosphate Battery with Bluetooth
9. 12V 100Ah Smart Lithium Iron Phosphate Battery w/Bluetooth & Self-heating Function — Pro Series
10. 12V 200Ah Lithium Iron Phosphate Battery w/ Bluetooth
11. 12V 104Ah Super Slim Lithium Iron Phosphate Battery — REGO Series
12. 48V 50Ah Smart Lithium Iron Phosphate Battery w/Self-heating
13. Golf Cart 48V 105Ah Lithium Iron Phosphate Battery
14. 12V 50Ah Deep Cycle Lithium Iron Phosphate Battery
15. Mini Size 12V 20Ah Trolling Motor Lithium Iron Phosphate Battery
16. 12.8V 100Ah Lithium Iron Phosphate Battery
17. Pre-Sale 12V 200Ah LiFePO4 Battery w/ Low-Temperature Protection
18. 12V 300Ah LiFePO4 Battery w/ Low-Temperature Protection
19. 12V 100Ah/200Ah Smart LiFePO4 Battery w/ Bluetooth & Self-Heating — Pro Series
20. 12V 104Ah Super Slim Lithium Iron Phosphate Battery with Self-Heating — REGO Series

## Lithium hazmat profile — required fields

Build one exact-SKU transport profile for every Renogy lithium battery before specialized freight, Hawaii/Alaska qualification, or any carrier representation that depends on dangerous-goods classification.

Required profile fields:

- exact Renogy SKU/model
- product title / series
- chemistry as written by Renogy
- nominal voltage
- rated Ah
- rated Wh from manufacturer source; calculated Wh may be stored separately and must be labeled calculated
- battery-only vs packed-with-equipment / contained-in-equipment state
- manufacturer packed dimensions
- manufacturer packed gross weight
- SDS/MSDS source
- UN38.3 test-summary/source
- applicable transport certificate/document references supplied by Renogy
- packaging/terminal-protection notes where supplied
- supplier shipping restrictions
- Lower-48 fulfillment treatment
- carrier/service constraints where verified
- last verified date/source

Do **not** infer or publish a UN number, packing instruction, exception, aircraft eligibility, hazmat fee, DG class treatment, or special-route authorization from marketing copy. Use current manufacturer/carrier documentation.

### Hazmat current state

**PROFILE BUILD STARTED / DOCUMENT COLLECTION INCOMPLETE.**

Public Renogy product/search material confirms that Renogy publishes or references MSDS/SDS and UN38.3 documentation for at least some lithium products, and Renogy maintains a public manuals/download center. Exact document-to-SKU reconciliation remains required.

Lower-48 catalog work does not wait for completion of Hawaii/Alaska/specialized-freight hazmat qualification. Block only the exact transport representation that lacks documentation.

## MAP — hard publication gate

Renogy MAP is controlling.

For every Shopify Renogy SKU:

1. exact manufacturer SKU/model must be known;
2. current dealer MAP/current written price-control source must be verified from the authorized dealer source;
3. customer price must be at or above applicable MAP;
4. no coupon, automatic discount, bundle, gift, compare-at manipulation, or other mechanism may be used to evade MAP;
5. if MAP is unavailable or ambiguous, keep only that SKU in DRAFT/HOLD and continue other verified products;
6. live storefront price must be rechecked after activation or material pricing changes.

**Public Renogy retail pricing is a discovery/reference signal only and does not replace dealer MAP verification.**

## Shopify recon

Connected Shopify store: Elevation UpScales (USD / US / MDT).

Current Renogy search returned **0 existing Renogy products** in Shopify, so there is no Renogy duplicate catalog to reconcile before import.

Existing relevant collection structure includes:

- `Off-Grid & Lithium` — existing energy/lithium collection
- `VEVOR Direct` — supplier-specific collection pattern already exists
- `Outdoor & Camping`

### Recommended integration architecture

Do not create a second product master.

Use Shopify products as the sales-channel representation of the existing Elevation catalog model, with:

- vendor = `Renogy`
- exact manufacturer SKU on every variant
- supplier tag = `Renogy-Direct`
- direct-site-only channel control
- supplier inventory kept separate from Elevation physical On Hand
- MAP verification marker/source held in protected operations data; only public-safe status goes to Git
- exact warranty/RMA source reference
- Lower-48 fulfillment status
- lithium/hazmat profile state for battery SKUs
- `Off-Grid & Lithium` membership for appropriate energy products
- optional smart supplier collection `Renogy Direct` only when there are verified draft/active Renogy products to populate it

### Import / activation sequence

**Wave 0 — data foundation**

Normalize the 188 public prospects into the catalog intake model without publishing them.

**Wave 1 — non-lithium, easiest-to-verify products**

Prioritize solar panels, MPPT controllers, DC-DC chargers, inverter/inverter-chargers, monitoring, wiring/protection/BOS and RV/off-grid components with exact SKU + MAP + media + dealer sellability confirmed.

**Wave 2 — kits/solutions**

Verify exact included components, variant structure and fulfillment before publishing bundled systems.

**Wave 3 — lithium batteries**

Create Shopify DRAFT records only after exact SKU, MAP, sellability, approved media, normal Lower-48 fulfillment state, warranty source and initial lithium transport-document state are reconciled. Specialized freight qualification is a separate transport lane and does not automatically block normal verified Lower-48 supplier fulfillment.

## Shopify publication rule

A Renogy product may become ACTIVE only when:

**EXACT SKU + DEALER SELLABILITY + CURRENT MAP + APPROVED FACTS + APPROVED MEDIA + LOWER-48 FULFILLMENT + DIRECT-SITE CHANNEL**

For lithium, additionally require an exact-SKU warranty source and a hazmat-document status field; absence of specialized-route qualification blocks only those specialized routes unless Renogy's normal verified Lower-48 fulfillment itself requires additional unresolved transport evidence.

## Current work state

**COMPLETED**

- public Renogy US All Products census: 188 cards / 6 pages
- lithium collection census: 20 unique visible product cards; source sidebar states 22 total, 20 in stock, 2 out of stock
- initial lithium prospect list established
- lithium hazmat profile schema established
- Shopify Renogy duplicate check completed: 0 Renogy products found
- Shopify existing energy collection structure reconciled
- Lower-48 integration architecture established
- MAP preserved as hard publication gate

**WAITING / HELD — exact lanes only**

- authenticated Partner Portal dealer catalog/MAP source access for protected current dealer data
- exact Renogy SKU-level SDS/MSDS + UN38.3/test-summary reconciliation for each lithium model
- exact inventory/backorder state from dealer source

**CONTINUING**

- normalize public Lower-48 prospects into exact SKU candidates
- prioritize first publishable non-lithium wave
- reconcile exact MAP and dealer sellability as protected dealer sources become available
- build exact-SKU lithium transport records without blocking independent Lower-48 catalog work

## Protection

This public repository record contains no dealer cost, MAP values, portal credentials, private correspondence, raw dealer inventory, tax identifiers, payment data, customer PII, or private carrier quotes.
