# ELEVATION UPSCALES — SOK MASTER CATALOG TRUTH

**Status:** ACTIVE / PUBLIC-SAFE SKU CONTROL  
**Effective:** 2026-09-17  
**Owner:** Casey Young  
**Execution Owner:** Company Operations + SOK Vendor Project  
**Supplier Source:** `vendor-project-sources/SOK_PROJECT_SOURCE.md`  
**Commerce SOP:** `SOK_ECOMMERCE_SHIPPING_SOP.md`

---

# PURPOSE

This file is the public-safe SKU truth layer for SOK commerce. It does **not** contain protected dealer costs, raw supplier inventory quantities, private correspondence, payment data, freight/storage quotes, or private compliance packets.

Protected economics remain in the private operating layer. Public Git records only the operational state needed to route commerce safely.

Control sequence:

**EXACT SKU → CURRENT MAP/PRICE RULE → SUPPLIER SELLABILITY → AUTHORIZED ORDER MODE → SHIPPING PATH → MEDIA/SPECS → CUSTOMER PURCHASEABILITY → FULFILLMENT**

---

# CURRENT SUPPLIER CONTROL

- Supplier relationship: **ACTIVE / VERIFIED PRIMARY AUTHORIZED BATTERY SUPPLIER**.
- Direct Elevation commerce: **VERIFIED**.
- Other marketplace channels: **REQUIRE CURRENT CHANNEL-SPECIFIC SUPPLIER RULE; DO NOT INFER AUTHORITY**.
- Lower-48 commerce: **ACTIVE / CONTROLLED**.
- Backorder/preorder: **AUTHORIZED WHEN CURRENT SUPPLIER TERMS APPLY**.
- Inventory: **SUPPLIER-CONTROLLED; Shopify quantity zero is not supplier On Hand truth**.
- Current stock/price package baseline: **2026-09-09 supplier package**.
- Stock refresh: **PENDING — weekly update requested from Kam on 2026-09-17**.
- Official product media source: **VERIFIED**, but exact-SKU media mapping remains required before a new listing is called complete.
- Warranty: **SUPPLIER SUPPORT VERIFIED; SOK RETAINS WARRANTY AUTHORIZATION**.
- Returns/RMA: **PARTIAL / WARRANTY-SPECIFIC PROCESS CONTROLS APPLY**.

---

# VERIFIED SHOPIFY SOK SET

| Exact SKU | Product | Public Price / MAP | Shopify State | Supplier Availability State | Direct Elevation Commerce | eBay State | Disposition |
|---|---|---:|---|---|---|---|---|
| `SK12V100PC` | 12V 100Ah Bluetooth LiFePO4 | $319 | ACTIVE | **REFRESH PENDING** | PASS | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP LIVE; use supplier availability/order mode for fulfillment truth |
| `SK48V100N` | 51.2V 100Ah / 5.12kWh Rack Battery | $1,199 | ACTIVE | **REFRESH PENDING** | PASS | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP LIVE; exact supplier allocation required at order time |
| `SK12V100H` | 12V 100Ah Heated LiFePO4 | $369 | ACTIVE | **REFRESH PENDING** | PASS | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP LIVE; verify current stock/backorder path at order time |
| `SK12V206H` | 12V 206Ah Heated LiFePO4 | $749 | ACTIVE | **REFRESH PENDING** | PASS | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP LIVE; supplier availability controls fulfillment |
| `SK12V206PH` | Marine 12V 206Ah Heated LiFePO4 | $750 | ACTIVE | **REFRESH PENDING** | PASS | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP LIVE; supplier availability controls fulfillment |
| `SK24V100` | 24V 100Ah LiFePO4 | $751 | ACTIVE | **REFRESH PENDING** | PASS | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP LIVE; supplier availability controls fulfillment |
| `SK12V280H` | 12V 280Ah Heated LiFePO4 | $999 | ACTIVE | **REFRESH PENDING** | PASS | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP LIVE; supplier availability controls fulfillment |
| `SK12V314PH` | 12V 314Ah Heated Victron CAN LiFePO4 | $1,099 | ACTIVE / PREORDER PATH | **REFRESH PENDING** | PASS WHEN CURRENT PREORDER TERMS APPLY | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP PURCHASE PATH ONLY UNDER CURRENT SUPPLIER PREORDER TERMS |
| `SK24V150PH` | 24V 150Ah Heated Victron CAN LiFePO4 | $1,149 | ACTIVE | **REFRESH PENDING** | PASS | **HOLD — CHANNEL AUTHORITY RECONCILIATION** | KEEP LIVE; supplier availability controls fulfillment |

---

# PRICING / ECONOMICS CONTROL

The active nine-product Shopify set was reconciled against the 2026-09-09 supplier price/MAP package and the public selling prices matched the current supplier MAP baseline at that check.

Protected dealer cost and raw margin numbers are intentionally omitted from public Git.

For every channel, economics must be evaluated privately as:

**SELL PRICE − PROTECTED UNIT COST − SUPPLIER/ROUTE SHIPPING − CHANNEL FEES − PAYMENT FEES − REQUIRED PACKAGING/HANDLING = EXPECTED CONTRIBUTION**

Do not call merchandise spread alone profit or net contribution.

For eBay specifically, do not finish the economics or publish a listing until channel authority is reconciled. Marketplace fees and marketplace-specific shipping/DG handling remain separate from the direct-site model.

---

# STOCK / ORDERABILITY CONTROL

The 2026-09-09 package remains the temporary supplier baseline while the requested weekly stock refresh is pending.

Until the refreshed supplier response arrives:

- do not invent or expose supplier quantity counts;
- do not convert Shopify quantity zero into an out-of-stock claim;
- verify supplier sellability/allocation before making consequential fulfillment promises;
- use authorized backorder/preorder only when current supplier terms support the exact SKU;
- do not let one unavailable SKU block the rest of the verified SOK catalog.

When the next Kam update arrives, perform a **delta-only reconciliation** against this file: price/MAP, sellability, stock/order mode, and any SKU-status changes.

---

# CHANNEL CONTROL

## Direct Elevation / Shopify

**PASS — VERIFIED CHANNEL** for the controlled SOK set, subject to exact-SKU supplier sellability/order mode and normal purchaseability checks.

## eBay

**HOLD — AUTHORITY RECONCILIATION REQUIRED.**

The canonical company board previously described the SOK eBay lane as authorized while the dedicated marketplace workflow retained a documentary-authority gate. Until current evidence resolves that conflict, do not publish additional SOK eBay listings based solely on direct-site authorization.

This eBay hold does **not** block direct Shopify SOK revenue work.

---

# UPDATE RULE

Update this public-safe truth layer only from verified supplier/channel evidence. Keep protected economics and raw inventory in the private operating layer.

A product becomes revenue-ready for a specific channel only when:

**IDENTITY PASS + CURRENT PRICE/MAP PASS + CHANNEL AUTHORITY PASS + SUPPLIER SELLABILITY/ORDER MODE PASS + SHIPPING PASS + MEDIA/SPECS PASS + CUSTOMER PURCHASEABILITY PASS.**

One blocked SKU or marketplace does not block another clean revenue lane.
