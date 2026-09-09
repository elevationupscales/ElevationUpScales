# Elevation UpScales — Vendor Onboarding and Catalog Merge SOP

**Status: ACTIVE / CONTROLLING**  
**Version: 2.1**  
**Effective: 2026-09-09**  
**Owner: Casey Young**  
**Scope: manufacturers, distributors, wholesalers, authorized dealers, dropship suppliers, strategic product vendors, and supplier relationships being merged into Elevation ecommerce / operations**

## Purpose

Create one repeatable onboarding standard without making every vendor complete a SOK-sized qualification package before Elevation can do business with them.

SOK remains the benchmark for a deeply integrated strategic supplier, but **SOK-level depth is not the minimum requirement for every vendor**.

Core rule:

**COLLECT ONLY WHAT IS NEEDED FOR THE SALES / FULFILLMENT LANE BEING ACTIVATED, THEN ENRICH THE VENDOR PROFILE AS THE RELATIONSHIP GROWS.**

Vendor-facing simplicity matters. Elevation should absorb the internal complexity instead of making the vendor learn our SOP.

Use this normal progression:

**COMMERCIAL APPROVAL → MINIMUM VENDOR PROFILE → SKU / MEDIA / PRICE / STOCK SOURCE → NORMAL FULFILLMENT → CODE / CATALOG MERGE → FIRST ORDER → ENRICH PROFILE → REPEAT**

Specialized freight remains a separate overlay:

**EXACT SKU → PACKED PROFILE → CARRIER-REQUIRED DOCUMENTS → ROUTE ACCEPTANCE → EXACT FREIGHT PRICE → CUSTOMER OPTION**

A missing Hawaii / DG / pallet / project-pricing item blocks only the lane that requires it. It does **not** automatically block the vendor or the normal Lower-48 store.

---

## 1. Proportional onboarding tiers

Assign the lightest tier that safely supports the intended relationship. A vendor may move upward later.

### Tier 1 — STANDARD / PORTAL-LED VENDOR

Use when Elevation mainly needs normal ecommerce products from a vendor that already provides an adequate dealer portal, catalog, feed or normal fulfillment program.

Typical examples:

- normal Lower-48 ecommerce;
- vendor-managed dropship program;
- straightforward wholesale ordering;
- catalog/feed supplier;
- products without specialized freight requirements.

Minimum onboarding should normally establish:

- Elevation's approved relationship / channel;
- exact SKU or manufacturer model identity;
- approved product / media source;
- price / MAP source;
- inventory or sellability source;
- normal order / fulfillment method;
- return / warranty source.

If a vendor portal already contains these answers, **portal access is the answer**. Do not make the vendor restate information Elevation can reliably read from the approved portal.

### Tier 2 — STRATEGIC DIRECT VENDOR

Use when the relationship is expected to support repeat B2B, project supply, direct manufacturer purchasing, richer catalog integration, stocking, larger orders or recurring replenishment.

Add as applicable:

- account manager / order contact;
- project / volume pricing path;
- opening order / MOQ / quantity tiers;
- inventory refresh cadence or feed;
- approved media library;
- dropship / direct-to-customer rules;
- freight-forwarder delivery eligibility;
- packing-slip / blind-ship treatment;
- cancellation / change process;
- stronger warranty / RMA workflow;
- case / pallet information when commercially useful;
- referral / market-development opportunity where appropriate.

### Tier 3 — COMPLEX / SPECIALIZED SUPPLY

Use only where the lane actually requires deeper control, such as:

- Hawaii / Alaska lithium freight;
- dangerous goods;
- pallet / container movements;
- local warehousing / stocking;
- downstream reseller programs;
- introduced-account protection;
- large commercial / project orders;
- supplier + logistics + local-node structures.

Add the exact shipment, compliance, warehouse, pallet, route, receiving and commercial controls required by the specific program.

**SOK is primarily the Tier 3 benchmark. Kingboss may be Tier 2 for normal store integration while individual Hawaii battery SKUs enter Tier 3 qualification separately.**

---

## 2. Vendor-facing communication standard

Do not send vendors our entire internal checklist unless their role genuinely requires it.

Prefer one concise request built around what is missing for the next business step.

Operating rules:

- ask once for a current dealer / wholesale catalog, portal or source package when that can answer many questions at once;
- accept portal access, a dealer dashboard, approved website source, API/feed, shared folder or current price/media package instead of asking the vendor to manually restate the same data;
- do not repeat questions already answered in the vendor's application, portal, price sheet, policy, prior email or dealer documentation;
- group related questions into one onboarding response where practical;
- distinguish **required now** from **useful later**;
- explain the business reason when asking for unusual information;
- do not make specialized Hawaii freight documents appear to be a prerequisite for ordinary Lower-48 sales when they are not;
- do not require a vendor to understand Elevation's internal product states, code gates or data model.

Internal team owns the translation:

**VENDOR SOURCE → ELEVATION NORMALIZED PROFILE → WEBSITE / ADMIN / OPERATIONS**

---

## 3. Minimum vendor profile

Before Elevation treats a newly approved vendor as ready for normal integration, capture only the applicable minimum:

### Account

- legal / operating vendor name;
- brand(s);
- Elevation relationship type;
- approved sales channel(s);
- price / MAP source;
- primary ordering path or portal;
- normal supported shipping region;
- return / warranty source.

### Product

For each activated SKU/model:

- supplier SKU and/or manufacturer model;
- product title / family;
- verified core specifications;
- approved product-content/media source;
- customer-safe price rule;
- current inventory / sellability source;
- normal fulfillment state.

Everything else is **progressive enrichment** unless the actual lane needs it now.

---

## 4. Manufacturer media packet — HIGH PRIORITY, NOT AN ARTIFICIAL BLOCKER

Manufacturer-approved media remains important because it prevents development from wasting time guessing product presentation or scraping unsupported assets.

Request the best available source for:

- hero product images;
- alternate/detail images;
- diagrams / feature graphics;
- lifestyle images when available;
- videos when available;
- approved descriptions / feature copy;
- specifications / spec sheets;
- manuals / installation guides;
- warranty material;
- brand / logo assets;
- SKU/model-to-media mapping when needed.

Preferred source order:

1. dealer media portal / download;
2. manufacturer shared folder or feed;
3. manufacturer-provided package;
4. manufacturer website explicitly authorized for dealer reuse;
5. Elevation-created original media based on verified product facts.

### Code-start rule

Do **not** wait for a perfect media library when the first products already have enough approved material to build safely.

A SKU may begin code work when development has:

**EXACT SKU/MODEL + VERIFIED CORE FACTS + AT LEAST ONE APPROVED SELLABLE IMAGE + PRICE/MAP SOURCE + STOCK/SELLABILITY SOURCE + NORMAL FULFILLMENT STATE**

Additional lifestyle media, videos, diagrams and richer merchandising can be added later.

Use **MEDIA PENDING** for enrichment rather than blocking an otherwise valid product.

Never scrape unsupported assets, remove watermarks or invent product claims.

---

## 5. Inventory truth — keep it simple

Supplier inventory must never be represented as Elevation physical **On Hand**.

Use:

**SOURCE → VERIFIED TIME / SOURCE VERSION → CUSTOMER SELLABILITY → RECHECK WHEN STALE**

Acceptable authoritative sources include:

- API;
- dealer portal;
- supplier feed / CSV / spreadsheet;
- account-manager inventory sheet;
- supplier website when confirmed as authoritative;
- manual confirmation;
- PO allocation / reservation.

Elevation does **not** need a raw unit count from every vendor before catalog work can start. If the approved portal reliably reports in-stock / out-of-stock / preorder status, that may be enough for normal ecommerce.

Customer-safe states:

- **AVAILABLE**
- **MANUAL CONFIRMATION**
- **PREORDER / FUTURE**
- **UNAVAILABLE**
- **DISCONTINUED / RETIRED**

When the source becomes stale or uncertain, downgrade to **MANUAL CONFIRMATION** rather than blocking the whole vendor.

Raw supplier counts remain protected.

---

## 6. Channel / pricing rules

Before publishing a SKU on a channel, know the rule for that channel.

Capture as applicable:

- own-website authorization;
- marketplace authorization / restrictions;
- MAP / UMAP / advertised-price rule;
- MSRP / retail reference;
- coupon / promotion restrictions;
- geographic restrictions;
- downstream reseller restrictions where relevant.

**Block the unverified channel, not the entire product.**

Example: a Renogy SKU may be eligible for ElevationUpScales.com while third-party marketplaces remain prohibited.

Dealer / wholesale costs and private commercial terms remain protected.

---

## 7. Normal order / fulfillment readiness

Before enabling normal checkout for a SKU, establish enough of the supplier workflow to fulfill the order reliably.

Minimum as applicable:

- order / PO / portal method;
- required customer / consignee fields;
- payment / acceptance step;
- normal processing expectation;
- tracking return path;
- supported shipping region;
- dropship authorization if used;
- return / warranty / RMA source.

Useful later, but not always a Day-1 blocker:

- blind-ship / packing-slip branding;
- detailed cancellation window;
- address-change procedure;
- case / pallet profile;
- dedicated warehouse contact;
- advanced project-price procedure.

Operating rule:

**CUSTOMER ORDER → ELEVATION VALIDATES → SUPPLIER ORDER → ACCEPTANCE / PAYMENT → RELEASE → TRACKING → DELIVERY → ACTUALS**

First understand the manual process. Automate only after it is proven useful.

---

## 8. Catalog / code activation states

### CODE READY

Enough information exists to begin implementation safely:

- approved vendor/channel relationship;
- exact SKU/model;
- verified core product facts;
- approved hero media/source;
- price/MAP source;
- stock/sellability source;
- normal fulfillment state.

### LIVE — NORMAL FULFILLMENT

Code Ready plus:

- current customer-safe availability;
- valid customer price;
- supported destination/region;
- order method;
- return/warranty path.

### LIVE — MANUAL CONFIRMATION

Use when the product can be marketed but stock, project pricing or fulfillment must be reconfirmed before payment/order acceptance.

### SPECIALIZED SHIPPING PENDING

Normal store may remain live, but Hawaii / Alaska / DG / freight pricing is not yet qualified.

### SPECIALIZED SHIPPING READY

The exact SKU has the route-specific shipment facts, required transport documents, carrier/forwarder acceptance and current quote basis needed for the customer option.

### PROVEN

At least one real order completed and actuals have been recorded.

---

## 9. Specialized freight / lithium — separate overlay

Transport documents and dangerous-goods qualification primarily apply when Elevation is building a specialized route beyond the supplier's normal shipping service, especially Hawaii lithium freight.

For the exact SKUs being qualified, obtain only what the freight partner actually requires, which may include:

- manufacturer model linkage;
- packed carton dimensions / gross weight;
- chemistry / voltage / capacity / watt-hours;
- SDS / MSDS;
- UN38.3 test summary;
- applicable UN / shipping description;
- state of charge where required;
- terminal / package protection facts;
- marks / labels;
- pallet information where applicable;
- shipper/declaration responsibility;
- origin preparation capability;
- packaging / securement photos where required.

Apply `SHIPPING_SUPPLIER_QUALIFICATION_STANDARD.md` to the actual freight route.

Supplier-facing explanation:

**Normal U.S. store integration can proceed under the vendor's normal approved fulfillment. For Hawaii freight options, our freight partners need the exact battery profile and carrier-required transport documents so we can obtain exact acceptance and pricing.**

Do not request a broad DG package for products or lanes that do not need one.

---

## 10. Development / portal handoff — pointer based

Development should not receive a giant duplicated vendor dossier.

Provide a compact normalized merge packet with pointers to authoritative sources:

**VENDOR + RELATIONSHIP + SKU/MODEL + CHANNEL + MEDIA SOURCE + PRICE/MAP SOURCE + INVENTORY SOURCE + NORMAL FULFILLMENT STATE + WARRANTY SOURCE + SPECIALIZED SHIPPING STATE**

The packet may point to a vendor portal, approved feed, media library, internal protected record or manufacturer source instead of copying every field into multiple systems.

Development should be able to answer:

- what exact product is this?
- may we sell it here?
- where do approved product facts/media come from?
- what price rule applies?
- is it currently sellable or manual-confirmation?
- how is it normally fulfilled?
- what is the warranty/return source?
- is specialized shipping READY, PENDING or NOT APPLICABLE?

### Portal philosophy

Do not build a custom Elevation vendor portal merely because the SOP can describe one.

For now, prefer:

**VENDOR'S EXISTING PORTAL / FEED → ELEVATION INTERNAL NORMALIZATION → CURRENT ADMIN / CATALOG SYSTEM**

Build additional supplier-portal software only when vendor count, update frequency, order volume or manual workload clearly justifies it.

The SOP is intentionally capable of supporting a larger future supplier platform, but current onboarding should remain lightweight.

---

## 11. First-order proof and progressive enrichment

Do not treat configuration as proof.

After a strategically important vendor goes live, use the first real order to validate what actually matters:

- stock signal accuracy;
- order method;
- payment / acceptance timing;
- processing / tracking timing;
- packing / branding outcome where relevant;
- delivery result;
- warranty / exception path if encountered.

Then enrich the vendor profile based on actual operating value.

**MINIMUM SAFE PROFILE → SELL / TEST → ACTUALS → ENRICH → AUTOMATE ONLY WHEN WORTH IT**

---

## 12. Revalidation

Revalidate only the affected fields when something changes:

- price / MAP;
- channel permission;
- inventory source;
- model / SKU;
- warehouse / shipping region;
- fulfillment workflow;
- warranty / return policy;
- MOQ / quantity structure;
- media rights/source;
- specialized route or compliance requirement.

Do not force a full vendor re-onboarding because one field changed.

---

## 13. Public / private boundary

This repository is public.

Do not commit:

- dealer / wholesale costs;
- raw supplier inventory counts;
- private price sheets;
- private payment terms;
- supplier credentials;
- private customer data;
- private supplier correspondence;
- non-public compliance packets;
- private freight rates / route intelligence;
- private commercial contract terms.

Public SOPs may document fields, states and workflows. Protected systems hold the actual private values and evidence.

---

## 14. Vendor completion rule

A vendor is not required to reach Tier 3 before being useful.

Call the vendor operational for the lane that is actually proven:

- **LIVE — NORMAL STORE** when normal ecommerce requirements are satisfied;
- **LIVE — MANUAL CONFIRMATION** when manual verification is intentionally part of the process;
- **LIVE — SPECIALIZED SHIPPING** only for exact SKUs/routes that have been separately qualified;
- **PROVEN** after real-order actuals validate the workflow.

## Operating principle

**MAKE IT EASY FOR THE VENDOR → USE THEIR PORTAL / SOURCE → CAPTURE ONLY WHAT WE NEED → START SELLING WHEN THE LANE IS SAFE → QUALIFY HARDER LANES IN PARALLEL → LEARN FROM REAL ORDERS → ADD COMPLEXITY ONLY WHEN IT PAYS.**