# Elevation UpScales — eBay Source Economics RECON

**Status:** ACTIVE EVIDENCE / SELLER HUB EXECUTION STILL GATED  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Execution Owner:** eBay Store Operations Worker  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Related Worktree:** `EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md`

## Purpose

Convert current eBay demand/recovery evidence into exact source/economics decisions without guessing Seller Hub state or performing unauthorized source switches.

Working screen from the eBay Store Operations SOP:

- **~30% pre-fee gross margin = minimum working screen**
- **35%+ preferred**
- Final keep/list decision also requires positive contribution after eBay fees, promotions, shipping and other variable costs.

This receipt uses:

- current eBay sale/order emails;
- Doba order/shipment emails;
- Casey's Sep. 6 `Inventory DOBA` source exports dated Sep. 7;
- current public Doba product/index evidence where useful for availability only.

Historical Doba export prices are evidence of the Sep. 7 source state, not a substitute for live authenticated Doba pricing at the moment of a new order.

---

## P0 recovery economics

### 1. Weed wacker — order `10-15134-90489`

**eBay sale:** $49.98  
**Doba source candidate:** `D0102X316EA` — Cordless Electric Weed Wacker / Dizzo  
**Sep. 7 Doba export:**

- Dropshipping price: **$62.59**
- Inventory: **406**
- Estimated shipping: **$0.00**
- Processing: **3 business days**

**Economics:**

- Pre-fee dollar contribution at listed Doba dropship cost: **-$12.61**
- Pre-fee gross margin: **-25.2%**
- Maximum landed source cost to meet 30% screen at $49.98 sale: **$34.99**
- Maximum landed source cost for 35% preferred: **$32.49**
- Pre-fee sale price required to produce 30% margin at $62.59 source cost: **~$89.41**

**Provisional classification:** `END / DROP` at the known source/price combination unless a separately authorized, product-identical source is proven profitable and reliable.

**Recovery action:** buyer already requested cancellation and apology has been sent. Seller Hub must first prove whether shipment occurred. If still unshipped, approve cancellation/refund under the owner recovery directive. Do not place a new $62.59 supplier order to rescue a $49.98 sale.

---

### 2. VEVOR rechargeable spotlight — order `20-15123-05140`

**eBay sale:** $34.98  
**Doba source:** `D010277TCB2` — VEVOR Rechargeable Spotlight Flashlight, 200,000 Lumens  
**Sep. 7 Doba export:**

- MSRP: **$39.49**
- MAP: **$35.90**
- Dropshipping price: **$41.65**
- Inventory: **756**
- Estimated shipping: **$0.00**
- Pickup price with prepaid shipping label: **$33.53**
- Prohibited marketplace field: **Amazon; Temu; Walmart** — eBay is not named in this export field
- Processing: **3 business days**

Current public Doba indexing also shows this product in stock with a 3-business-day processing estimate and prepaid-label support.

**Economics / control:**

- eBay sale was **$0.92 below the Sep. 7 Doba MAP**.
- Dropship path: $34.98 sale - $41.65 source = **-$6.67**, or **-19.1% pre-fee margin**.
- Pickup/prepaid-label path: $34.98 - $33.53 = **$1.45**, only **4.1% pre-fee margin** before eBay fees.
- Maximum landed source cost for 30% screen at $34.98 sale: **$24.49**.
- Maximum landed source cost for 35% preferred: **$22.74**.
- At the $33.53 pickup cost, pre-fee sale price required for 30% screen is **~$47.90**; 35% is **~$51.58**.

**Provisional classification:** `END + REBUILD` or `KEEP + REPRICE` only after exact marketplace/MAP/source verification. Current known sale price/source combination is not commercially acceptable.

**Recovery action:** no supplier confirmation has been found. If Seller Hub shows the order still unshipped and no already-paid supplier shipment exists, cancel/refund and communicate truthfully rather than initiating an uneconomic late fulfillment.

---

### 3. Folding bed / camping cot — Doba SKU `D0102X33W6W`

This SKU is tied to the eBay folding-bed listing through prior eBay/Doba records and has repeated sales history.

**Sep. 7 Doba export:**

- Dropshipping price: **$62.59**
- Inventory: **385**
- Shipping method: UPS
- Estimated shipping: **$0.00**
- Pickup price with prepaid shipping label: **$45.80**
- Processing: **2 business days**

#### Late order `25-15104-41137`

**eBay sale:** $50.66  
**No supplier confirmation found in current Gmail recon.**

- Dropship path at $62.59: **-$11.93**, or **-23.5% pre-fee margin**.
- Pickup/prepaid-label path at $45.80: **$4.86**, or only **9.6% pre-fee margin**.
- Maximum landed source cost for 30% screen: **$35.46**.
- Maximum landed source cost for 35% preferred: **$32.93**.

**Recovery action:** if Seller Hub confirms this order is still unshipped and no supplier shipment already exists, the current Doba economics do not support a new rescue fulfillment. Cancel/refund + apologize under the recovery directive.

#### Shipped order `12-15143-03510`

**eBay sale:** $55.66  
**Doba order:** `26091017391956`  
**Final supplier-shipped total:** **$44.46**  
**State:** **SHIPPED / DO NOT CANCEL**

- Pre-fee dollar spread: **$11.20**
- Pre-fee gross margin: **20.1%**
- Still below the 30% operating screen before eBay fees.
- At $44.46 actual landed cost, pre-fee sale price required for 30% margin is **~$63.51**; 35% is **~$68.40**.

**Catalog classification:** demand is proven, so do not destroy the listing history blindly. Current direction is `KEEP + REPRICE` **only if** current source cost/market price can support positive contribution; otherwise `END + REBUILD` with a better authorized source. The current ~$50–56 selling band should not be scaled with this Doba cost structure.

---

### 4. Back-seat organizer — order `02-15170-43443`

**eBay sale:** $24.33  
**Exact Doba public source:** `D01027H21KW` — AL AUTO, Universal Tactical Vehicle Back Seat Organizer with 3 Detachable Pouches  
**Current public Doba evidence:**

- Ships from United States
- In stock on current Doba category index
- Processing: **2 business days estimated / 0.5 business days average** on product page
- Prepaid-label support shown on category index
- Exact current price/inventory count require authenticated Doba access

The Sep. 7 inventory exports available in the current company mailbox did not expose a usable row for this exact item, so no source-cost claim is made.

**Economic gate at current eBay sale price:**

- Maximum landed source cost for 30% screen: **$17.03**
- Maximum landed source cost for 35% preferred: **$15.81**

**Provisional classification:** `HOLD / VERIFY SOURCE COST` — demand is proven and a current source is found, but fulfillment is not authorized until exact Doba cost + shipping + eBay variable costs show positive contribution.

**Recovery action:** verify exact Doba account price immediately when authenticated source access is available. Do not blindly place the supplier order merely because the public product is in stock. If the source cost fails the profit gate, route the customer exception before the Sep. 16 handling deadline rather than repeating the late-order pattern.

---

## P1 demand item — VEVOR boot / shoe dryer

**eBay listing:** `168633017846`  
**Historical eBay sales found:** at least two sales at **$10.89** each.  
**Doba evidence:**

- One corresponding Doba confirmation reached **$13.59**, then **$14.00 shipped** for eBay store order `19-15086-26754`.
- Another Doba shoe-dryer shipment record reached **$9.46**, but its store-order mapping is different and must not be substituted for the $14 fulfillment without exact order reconciliation.
- Public eBay indexing later showed the listing around **$17.89** with **2 watchers**.

Using the known $14.00 shipped fulfillment as the conservative historical cost:

- $10.89 sale was **negative before eBay fees**.
- $17.89 public listing price would create only **~21.7% pre-fee gross margin** against $14 cost.
- A $14 landed cost requires at least **$20.00** selling price to reach the 30% pre-fee screen and **~$21.54** for 35%, before eBay fees.

**Provisional classification:** `KEEP + REPRICE / REBUILD IN PLACE` if current live source + watchers/history remain useful and final contribution can be made positive. Do **not** delete blindly because the listing has sales/watchers, but do not scale it at the old low pricing.

---

## Current listing disposition map

| Product | Demand Signal | Current Source/Economics Result | Provisional Disposition |
|---|---|---|---|
| Weed wacker | Sold; customer recovery failure | Source cost exceeds sale by $12.61 before fees | `END / DROP` unless a new authorized profitable source exists |
| VEVOR spotlight | Sold | Sale below MAP; dropship negative; pickup path only 4.1% pre-fee | `END + REBUILD` / `KEEP + REPRICE` only with corrected source/economics |
| Folding bed / cot | Repeated sales | Demand strong but recent source economics only ~9.6–20.1% pre-fee or negative depending path | Preserve history; `KEEP + REPRICE` if viable, else `END + REBUILD` |
| Back-seat organizer | Fresh sale; listing appears live | Exact source found/in stock, but price remains authenticated-only | `HOLD / VERIFY COST`; act before Sep. 16 |
| VEVOR boot dryer | Repeat sales + watchers | Historical $10.89 sale lost money; current ~$17.89 remains below 30% screen at $14 historical shipped cost | Preserve history; `KEEP + REPRICE / REBUILD IN PLACE` if source supports |

## Seller Hub action queue once authenticated

1. Weed wacker `10-15134-90489` — prove shipped vs unshipped; if unshipped, approve requested cancellation/refund. Do not duplicate apology.
2. Folding bed `25-15104-41137` — prove shipped vs unshipped; if unshipped/no supplier order, cancel/refund + apologize rather than place uneconomic rescue order.
3. Flashlight `20-15123-05140` — prove current state; if unshipped/no supplier order, cancel/refund + buyer update; then correct/end listing economics and MAP conflict.
4. Shipped cot `12-15143-03510` — verify FedEx tracking is visible; **do not cancel**.
5. Organizer `02-15170-43443` — verify order state and exact source cost before supplier purchase; control live listing if economics fail.
6. Active catalog — use Seller Hub views/watchers/sales to finalize the provisional dispositions above and sweep remaining listings record-by-record.

## Control conclusion

The primary failure pattern is now evidenced:

**LOW EBAY PRICE + UNVERIFIED SOURCE COST + LATE FULFILLMENT CHECK = CUSTOMER DAMAGE + NEGATIVE/THIN CONTRIBUTION.**

The corrected operating loop remains:

**SALE / LISTING → EXACT SKU → AUTHORIZED SOURCE → LIVE COST + AVAILABILITY → PROFIT GATE → SUPPLIER ACCEPTANCE → TRACKING → ACTUAL CONTRIBUTION → SCALE / REPRICE / CUT.**

No Seller Hub cancellation, refund, tracking edit, message, price change or listing end action is claimed by this receipt. Those remain gated on authenticated Seller Hub evidence.