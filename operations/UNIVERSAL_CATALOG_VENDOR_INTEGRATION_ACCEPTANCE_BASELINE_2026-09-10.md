# Elevation UpScales — Universal Catalog Vendor Integration Acceptance Baseline

**Date:** 2026-09-10  
**Owner:** Casey Young  
**Lane:** Developer / Catalog Integration  
**Status:** ACTIVE / DEFINITION OF DONE  
**Scope:** SOK, VEVOR, Renogy, Kingboss and each future vendor promoted to an active dedicated Elevation vendor project

## Purpose

Define when vendor catalog integration is actually complete enough to call the Elevation store operational across active vendors.

This baseline does **not** authorize visual redesign, new marketing copy, theme changes, brand changes, product-claim expansion, or rewriting approved customer-facing content.

The developer lane may make only the minimum technical/data changes required to satisfy the acceptance criteria below unless Casey separately authorizes design/copy work.

## Operating objective

**APPROVED VENDOR → PROJECT SOURCE → VERIFIED CATALOG SOURCE → NORMALIZED UNIVERSAL CATALOG → CUSTOMER-READY PRODUCT STATE → STORE SEARCH/FILTER → PRODUCT DETAIL → CART/CHECKOUT OR CORRECT ASSISTED PATH → ORDER/FULFILLMENT RECEIPT → SEARCH DISCOVERABILITY → REPEATABLE REFRESH**

A vendor is not complete merely because a supplier relationship exists, a spreadsheet was imported, products exist in Shopify, or one page renders.

## Universal catalog source-of-truth rule

The Elevation universal catalog remains the normalized product/customer-commerce layer.

Each vendor feeds that shared system. Do not create a separate incompatible catalog architecture for each supplier.

Preserve supplier-specific facts such as:

- exact supplier SKU/model;
- source/vendor;
- channel authorization;
- MAP/price controls;
- supplier availability / preorder / backorder state;
- fulfillment mode;
- destination restrictions;
- warranty/returns references;
- supplier media/source provenance.

The universal catalog determines the common customer/store behavior while supplier-specific controls remain authoritative for the affected product.

## Per-vendor integration Definition of Done

For an active vendor project, mark **LIVE CATALOG INTEGRATION SATISFIED** only when all applicable sections below are proven.

### A — Vendor authority and source

- relationship/account state is verified;
- authorized sales channel is known;
- Project Source exists and is linked from `CURRENT_WORK_BOARD.md`;
- current product/SKU source is available or a verified bounded launch subset is established;
- price/MAP control path is known for published products;
- current sellability/availability source or exact delayed-order authorization is known;
- approved media/spec/manual source is known for published products;
- warranty/returns/fulfillment path is known sufficiently for truthful customer operation.

### B — Universal catalog normalization

Each launched product has, where applicable:

- canonical Elevation product ID;
- supplier/vendor identity;
- exact supplier SKU/model;
- title and customer-facing product identity;
- category/department/use-case tags;
- public price state;
- supplier cost kept protected where applicable;
- MAP/price-control state;
- availability state;
- preorder/backorder authorization state;
- fulfillment source/mode;
- destination/shipping controls;
- warranty/reference state;
- approved media;
- source-refresh provenance.

No product is considered integrated when the customer-facing record is only a disconnected Shopify listing with no recoverable supplier/source identity.

### C — Customer-facing store functionality

For the vendor's launched products, verify the existing store design/function supports:

- universal store discovery;
- search by useful customer terms and exact model where applicable;
- category/department filtering;
- vendor/source-specific discovery where an approved vendor route exists;
- product detail page;
- correct price or assisted-purchase state;
- truthful availability/backorder language;
- add-to-cart/checkout for products authorized for direct purchase;
- correct assisted purchase / freight / destination review for products that cannot use normal checkout;
- mobile and desktop functional rendering;
- no dead product links or orphaned launch records.

Do not create design changes merely to pass this baseline. Repair functional defects using the approved visual/copy baseline unless Casey authorizes otherwise.

### D — Checkout and order control

For direct-buy products:

- customer total is known before payment;
- checkout does not fail due solely to an internal management state;
- supplier-specific unavailable/backorder rules are respected;
- real destination/payment/compliance/channel restrictions remain enforced;
- order captures exact product/SKU/vendor/source;
- order can enter the Operating System fulfillment flow;
- supplier purchase/acceptance/tracking/customer completion can be recorded.

For assisted/freight products:

- the exact product and customer destination remain attached to the request;
- assisted routing does not create a duplicate catalog product;
- no payment or shipping promise is made before the required route/price is established.

### E — Vendor refresh and continuity

A live vendor must have a recoverable refresh path for the facts that can change:

- price/MAP;
- supplier sellability/availability;
- product lifecycle/discontinued state;
- approved media/spec updates;
- warranty/returns changes;
- fulfillment/contact changes.

The vendor is not considered mature if every refresh requires rebuilding onboarding from scratch.

### F — First-order proof

For each direct-commerce vendor, complete at least one real clean order proof when customer demand provides it:

**CUSTOMER ORDER → PAYMENT → EXACT SKU/SOURCE REVERIFY → SUPPLIER PURCHASE → SUPPLIER ACCEPTANCE → TRACKING → DELIVERY / CUSTOMER COMPLETION → RECEIPT**

Absence of an order does not block safe catalog publication, but the vendor remains Stage 1 / PROVING until the first-order proof exists.

### G — Search and external discoverability

For public vendor/catalog/product routes that are intended to be discoverable:

- canonical public route returns successfully without authentication/password gating;
- route is reachable by normal internal navigation where appropriate;
- page exposes a stable title/product identity from existing approved content/data;
- indexing is not intentionally blocked unless there is a real business reason;
- vendor/product route can be discovered in a public web-search recon after crawl/index time;
- where Google Search Console / Merchant Center access exists, use those tools as the authoritative Google verification path.

Public web search evidence is useful but does not replace Search Console/Merchant Center ownership verification.

## Company-wide Universal Catalog Completion Baseline

The current store may be called **UNIVERSAL CATALOG LIVE INTEGRATION SATISFIED** only when:

1. every vendor currently designated as an active dedicated Elevation vendor is represented in the universal catalog according to its authorized lane;
2. no active vendor requires a second incompatible product/checkout system;
3. current launch-ready vendor products can be found through the existing store search/filter/navigation structure;
4. direct-buy products complete cart/checkout/order-source capture correctly;
5. assisted/freight products route correctly without pretending normal parcel checkout applies;
6. vendor-specific MAP/channel/availability/backorder/warranty controls remain attached to the exact product;
7. source refresh is recoverable per vendor;
8. customer-facing vendor/catalog/product routes intended for indexing are public and discoverable;
9. the catalog/admin system can identify vendor/source and current readiness without manual reconstruction;
10. current active vendor Project Sources and the Work Board agree with live store state;
11. functional mobile/desktop smoke checks pass across representative products from every active vendor;
12. no unresolved defect prevents normal valid customer purchase across the universal store as a whole.

## Current active-vendor acceptance matrix

### SOK

Current posture: active primary supplier with public catalog/product visibility already proven.

Remaining acceptance work is limited to the unfinished exact catalog/admin/checkout/source-refresh residuals already represented on the Work Board; Hawaii/special-route work does not block valid Lower-48 catalog operation.

### VEVOR

Current posture: Shopify/catalog launch materially advanced with direct products published in the connected store.

Remaining acceptance includes public storefront accessibility, universal-store representation, clean first-order proof and repeatable supplier refresh/fulfillment handling.

### Renogy

Current posture: approved dealer / zero Renogy Shopify products at the time of the sales-first recon / Batches 01–02 source evidence accepted.

Renogy is **not complete** until a trusted launch wave is built into the universal catalog, activated product by product as exact MAP/media/sellability gates clear, and normal store/order behavior is proven.

Use `RENOGY_SALES_FIRST_CATALOG_SCOPE_2026-09-10.md` and `RENOGY_CATALOG_LAUNCH_BATCH_01_2026-09-10.md`.

### Kingboss

Current posture: B2B approved / onboarding data still waiting.

Kingboss is not catalog-complete until verified supplier product/source/compliance/fulfillment information exists and an authorized launch set passes this baseline. Existing placeholder/navigation visibility is not proof of a complete live catalog.

## Developer lane

The Developer/Catalog Integration lane owns the technical acceptance layer, not supplier commercial management.

Developer responsibilities:

- preserve current accepted website design/copy unless explicitly authorized;
- map approved vendor product data into the existing universal catalog architecture;
- repair functional catalog/store integration defects;
- preserve supplier/source identity through cart/order flows;
- implement only the minimum code/data changes necessary for the accepted vendor rules;
- provide preview/QA/production evidence under the existing release process;
- report exact residuals rather than reopening vendor onboarding.

Supplier/project managers remain responsible for supplier facts, MAP/channel rules, approved media, product selection and commercial readiness.

## Completion evidence packet

When claiming the universal catalog integration is complete, return one evidence packet containing:

- current accepted `main` SHA;
- active vendor list;
- Project Source links;
- representative live product URLs/IDs for each vendor;
- universal store search/filter evidence;
- cart/checkout evidence for direct-buy representative products;
- assisted-route evidence for one applicable special/freight product;
- source/vendor/order capture evidence;
- mobile/desktop smoke results;
- first-order proof receipts available to date;
- refresh-source paths;
- public-search/index evidence and Search Console/Merchant Center evidence if connected;
- explicit unresolved exceptions.

Do not mark the company-wide integration complete while an exception materially prevents a current active vendor from participating in the intended universal catalog path.

## Regression rule

After completion, one vendor/product failure reopens only the affected integration control unless evidence shows a shared universal-store failure.

Do not reset every vendor to onboarding because one source/feed/SKU fails.
