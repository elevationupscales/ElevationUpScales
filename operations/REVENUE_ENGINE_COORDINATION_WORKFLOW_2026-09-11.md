# Elevation UpScales — Revenue Engine Coordination Workflow

**Owner:** Casey Young  
**Effective:** 2026-09-11  
**Status:** ACTIVE / STREAMLINE REVENUE CONTROL  
**Primary Objective:** Produce repeatable profitable cash flow through direct-site and eBay commerce without allowing fulfillment/source mistakes to consume working capital.

## 1. Revenue engines

Elevation currently operates two parallel revenue engines:

### Engine A — Direct Site / Shopify / PayPal
Primary path for approved direct-commerce vendors and universal catalog products.

### Engine B — eBay
Marketplace revenue path requiring customer recovery, listing economics cleanup and source-by-product control.

Neither engine should block the other unless the issue is company-wide security, payment integrity, legal, fraud, account-suspension or another material systemic risk.

## 2. Core commercial rule

**REVENUE IS NOT SUCCESS IF THE ORDER LOSES MONEY.**

For every candidate product:

**CUSTOMER PRICE + CUSTOMER-PAID SHIPPING  
− SUPPLIER / LANDED PRODUCT COST  
− SHIPPING / FREIGHT PAID BY ELEVATION  
− PAYMENT / PLATFORM FEES  
− PROMOTION / DISCOUNT COST  
− VARIABLE FULFILLMENT / PACKAGING COST  
− OTHER ORDER-SPECIFIC VARIABLE COSTS  
= EXPECTED CONTRIBUTION**

Expected contribution must be positive before normal promotion or source purchase. Strategic loss-leading requires Casey's explicit approval.

Use `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`.

## 3. Engine A — Direct Site workflow

**VENDOR SOURCE → EXACT SKU → AUTHORIZED CHANNEL → CURRENT SELLABILITY → PRICE/MAP → PROTECTED SUPPLIER COST → SHIPPING/FEES → POSITIVE CONTRIBUTION → SHOPIFY PRODUCT → WORKING BUY PATH → FREE/OWNED TRAFFIC → ORDER → SOURCE RECHECK → SUPPLIER PURCHASE → TRACKING → DELIVERY → ACTUAL CONTRIBUTION → SCALE/REPRICE/CUT**

### Current execution roles

- Shopify Store Operations Worker: store execution, publication state, merchandising, analytics, order detection/routing.
- Vendor Project Managers: exact source, MAP, cost, sellability, warranty, fulfillment and channel facts.
- MASTER DEVELOPER: technical checkout/backend defects and deployment only.
- Marketing/Social: traffic after a product is `PROMOTE` qualified.
- Company Operations: fulfillment exceptions and cross-lane operational routing.

### Direct-site current focus

- VEVOR: 17/17 B-tier active; now profit-qualify and promote only clean SKUs.
- Renogy: five drafts; activate clean SKUs individually after exact identity/orderability/media/price checks.
- SOK: primary battery supplier; continue controlled Lower-48 sales/backorder logic and real-order proof.
- Kingboss: supplier facts advanced; map exact products, pricing/channel/economics before normal activation.

## 4. Engine B — eBay workflow

First recover customer obligations, then rebuild the catalog.

**SELLER HUB ORDER TRUTH → SHIP / CANCEL / REFUND / APOLOGIZE → SOURCE ECONOMICS → ACTIVE LISTING METRICS → KEEP / REPRICE / REBUILD / END → NEW PROFITABLE LISTING MIX → ORDER → SOURCE RECHECK → FULFILL → ACTUAL CONTRIBUTION**

### eBay customer recovery precedence

For any current order:

1. Verify current Seller Hub state.
2. Do not cancel an already-shipped order.
3. Do not place a new supplier order at a known economic loss merely to hide an operational mistake.
4. If late/unfulfilled and no executable source remains, cancel/refund accurately and apologize through eBay.
5. Preserve customer obligations created before profitability rules were tightened; do not use margin as an excuse to ignore a paid order.

### eBay listing decision states

- `KEEP + REPRICE`
- `KEEP + REBUILD`
- `END + REBUILD LATER`
- `END / DROP`
- `HOLD — SOURCE UNKNOWN`
- `HOLD — ECONOMICS UNKNOWN`
- `HOLD — CHANNEL NOT AUTHORIZED`

### eBay source hierarchy

Doba remains an authorized connected supplier/source where it is the best profitable reliable option.

Do not treat Doba as blanket catalog authority.

For each listing:

**DEMAND → CHANNEL PERMISSION → EXACT SOURCE → LANDED COST → RELIABILITY → CONTRIBUTION → LISTING DECISION**

Direct vendor relationships may replace Doba only where the vendor permits eBay and the source economics/fulfillment are better.

## 5. Demand and traffic rule

Do not push traffic before economics are known.

After a product passes `PROMOTE`:

1. Prefer free/owned traffic first.
2. Use direct product links to a proven buy path.
3. Measure session/view → cart/watch → checkout/order → actual contribution.
4. Paid acquisition is separate and must include acquisition cost in profitability.

## 6. Universal catalog rule

The universal catalog is a revenue surface, not a product-count goal.

A vendor/product becomes useful only when:

**SOURCE VERIFIED → PRODUCT NORMALIZED → CUSTOMER CAN FIND IT → CUSTOMER CAN BUY IT THROUGH THE CORRECT PATH → ORDER SOURCE IS PRESERVED → FULFILLMENT IS EXECUTABLE → PROFIT IS POSITIVE.**

Do not publish ambiguous source, unsupported backorder, unauthorized marketplace, or economically unknown products merely to increase catalog size.

## 7. Working-capital protection

Use customer demand/orders to control purchasing wherever supplier terms allow.

Avoid speculative inventory unless:

- economics are known;
- demand or strategic purpose justifies it;
- storage/freight is controlled;
- cash exposure is acceptable;
- owner approval is obtained when required.

Kingboss 100-unit wholesale/reserved-stock paths are owner-level working-capital decisions, not worker defaults.

## 8. Daily revenue loop

Each RUN should answer:

1. Any new paid orders?
2. Any late/customer-risk orders?
3. Which products are already `PROMOTE` qualified?
4. Which products have demand but poor economics and need repricing/rebuild?
5. Which vendor/source fact is blocking the highest-value candidate?
6. Which free traffic action can be executed now?
7. What actual profit/loss did completed orders produce?

Then execute the highest-value clean action.

## 9. Metrics

Track separately by channel and product/source:

- sessions/views;
- watchers/cart additions;
- checkouts;
- orders;
- gross revenue;
- landed/source cost;
- platform/payment fees;
- refunds/cancellations;
- shipping/freight cost;
- actual contribution dollars;
- contribution rate;
- fulfillment delay/exception rate;
- return/support friction.

Do not scale a product from gross-sales data alone.

## 10. Escalation

Route to Casey only for:

- strategic loss-leader approval;
- material inventory/wholesale purchase commitment;
- contract/credit/financing/payment-term commitment;
- material refund/credit exception beyond lane authority;
- paid advertising spend when not already authorized;
- source/channel/legal ambiguity that cannot be resolved from current vendor evidence;
- company-wide platform/payment risk.

## Control phrase

**MAKE MONEY → KEEP MONEY → FULFILL CLEANLY → MEASURE ACTUAL PROFIT → SCALE WINNERS → CUT LOSERS.**