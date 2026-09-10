# ELEVATION UPSCALES, INC.
## SOP-STORE-INT-001 — NEW STORE INTEGRATION FINALIZATION

**Owner:** Casey Young  
**Applies To:** Shopify, eBay, TikTok Shop, future marketplaces, direct stores, and other customer-payment sales channels  
**Stage:** Final Integration → Production → Verification → Closure

## 1. PURPOSE
A new store or sales-channel integration is **not complete simply because the connection works, products are listed, or code is deployed.**

Every new store integration must finish the full operational loop:

**PRODUCT → CUSTOMER PURCHASE → PAYMENT → CHANNEL ORDER → ELEVATION OPERATING SYSTEM → FULFILLMENT WORKFLOW**

This is the required finalization standard.

## 2. WHEN THIS SOP APPLIES
Use this SOP after the primary store/channel build and catalog integration are substantially complete.

It governs the final steps before the integration may be declared operational.

Examples include Shopify, eBay, TikTok Shop, future marketplace integrations, direct ecommerce platforms, new checkout/payment providers, and supplier-backed storefronts that create customer orders.

## 3. FINALIZATION WORKFLOW
Every integration follows:

**VERIFY CONNECTION → VERIFY CATALOG → VERIFY PURCHASE PATH → VERIFY PAYMENT → VERIFY ORDER INGESTION → VERIFY OPERATING SYSTEM → VERIFY FULFILLMENT → LIVE TRANSACTION → PRODUCTION RECEIPT → CLOSE**

Do not skip directly from deployment to CLOSED.

## 4. CATALOG VERIFICATION
Before live testing, confirm:
- products map to the correct Elevation catalog records;
- Elevation SKU is preserved;
- supplier SKU is preserved where applicable;
- supplier/source identity is correct;
- pricing is intentional;
- product availability state is intentional;
- shipping geography is supported;
- unsupported lanes are blocked without unnecessarily blocking the entire product.

Approved availability states may include:
- AVAILABLE
- MANUAL CONFIRMATION
- PREORDER / BACKORDER
- UNAVAILABLE
- DISCONTINUED / RETIRED

Out-of-stock status alone must not automatically eliminate an approved preorder/backorder purchase path.

## 5. PURCHASE-PATH VERIFICATION
Confirm that the customer can reach the correct commercial action. Depending on the product, that may be:
- BUY NOW / CHECKOUT
- PREORDER / BACKORDER
- PURCHASE OPTIONS
- COMMERCIAL REVIEW
- SPECIAL FREIGHT / HAWAII REVIEW

Company rule:

**BLOCK THE UNSAFE OR UNVERIFIED LANE — NOT THE ENTIRE PRODUCT OR CUSTOMER FLOW.**

## 6. PAYMENT VERIFICATION
The integration must prove that the intended payment mechanism works in production.

Verify:
- correct product;
- correct price;
- correct quantity;
- correct shipping;
- correct taxes/discounts where applicable;
- payment completion;
- correct currency;
- platform records order as paid.

A catalog listing without a functioning payment path does not satisfy this SOP.

## 7. ORDER INGESTION
Every paid order must enter the Elevation UpScales Operating System.

The sales platform must not become a disconnected order silo.

The Operating System order must preserve enough source information to identify:
- sales channel;
- external order ID;
- Elevation order reference;
- product;
- Elevation SKU;
- supplier;
- supplier SKU;
- quantity;
- customer;
- shipping destination;
- payment status;
- total paid;
- fulfillment status.

Multi-item orders must preserve individual line items accurately.

## 8. OPERATING SYSTEM VERIFICATION
Operations must be able to manage the order from the Elevation Operating System.

At minimum, the order must support:

**PAID → FULFILLMENT PENDING → SUPPLIER ORDERED → SUPPLIER RELEASED → SHIPPED → COMPLETED**

and appropriate exception states such as:

**HOLD / ISSUE → REFUND NEEDED → REFUNDED → CANCELLED**

Operations should not need to discover a paid order manually by checking every external store.

## 9. DUPLICATE / FAILURE PROTECTION
Order ingestion must be idempotent.

Repeated webhook/API notifications must not create duplicate Elevation orders.

Each integration must also have a reasonable reconciliation mechanism so Operations can identify a paid platform order that failed to enter the Operating System.

Do not rely on only one external event delivery with no recovery path.

## 10. LIVE TRANSACTION GATE
Before final closure, perform one legitimate live transaction through the completed customer path.

Required proof:

**LIVE PRODUCT → LIVE CHECKOUT → PAYMENT SUCCESS → CHANNEL ORDER CREATED → ORDER INGESTED → ELEVATION OS RECORD CREATED → SKU/SOURCE VERIFIED → FULFILLMENT ACTIONABLE**

A test webhook or manually inserted database row may be used during development but **does not satisfy final production closure by itself.**

Where a platform prohibits or makes owner self-purchase inappropriate, use another legitimate platform-approved live transaction method.

## 11. PRODUCTION DEPLOYMENT STANDARD
Development follows:

**CURRENT ACCEPTED BASELINE → WORK BRANCH → CANDIDATE → TESTS → ISOLATED PREVIEW → APPROVAL WHEN REQUIRED → PRODUCTION → LIVE VERIFICATION → PRODUCTION RECEIPT → NEW ACCEPTED BASELINE**

Do not deploy stale code.

The SHA/version tested and approved for production must be traceable.

## 12. REQUIRED FINAL RECEIPT
Every completed store integration returns one final receipt containing:
- store/channel integrated;
- starting baseline;
- branch/PR where applicable;
- production SHA/version;
- deployment result;
- catalog reconciliation result;
- checkout result;
- payment result;
- external order reference;
- Elevation OS order reference;
- SKU/source verification;
- fulfillment verification;
- duplicate protection verification;
- production smoke result;
- remaining exceptions.

## 13. HARD CLOSURE RULE
A new store integration remains **OPEN** until all of the following are true:
- customer-facing purchase path works;
- payment succeeds;
- external store records the transaction;
- paid order enters the Elevation Operating System;
- product/SKU/source mapping is correct;
- order is actionable for fulfillment;
- production smoke passes;
- final receipt is returned.

Only then may the status become:

**DEPLOYED / LIVE PURCHASE VERIFIED / OS INGESTION VERIFIED / CLOSED**

## 14. MANAGEMENT RULE
Do not create a new operating system or separate order-management structure for each store.

New stores connect into the existing Elevation UpScales architecture:

**MANY SALES CHANNELS → ONE MASTER CATALOG → ONE OPERATING SYSTEM → CONTROLLED SUPPLIER/FULFILLMENT LANES**

That is the standard integration model going forward.
