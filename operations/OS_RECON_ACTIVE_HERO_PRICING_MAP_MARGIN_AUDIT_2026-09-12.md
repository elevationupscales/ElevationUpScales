# Elevation UpScales — OS RECON Active Hero Pricing / MAP / Margin Audit

**Status:** VERIFIED / PUBLIC-SAFE CONTROL RECEIPT  
**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Role:** MASTER RECON OS  
**Baseline:** `8899cbaed95b9f0f62572a3ad820aaf3c6aa4c1b`

## Scope

Current actively promoted direct-site hero set only:

- three released VEVOR first-sale SKUs;
- two active Renogy Shopify sprint SKUs.

Protected supplier costs, dealer prices and private margin percentages are intentionally omitted from public Git.

## Shopify cost-data finding

Live Shopify Admin read showed `InventoryItem.unitCost = null` for all five audited SKUs.

Therefore Shopify's stored product-cost field is **not** a reliable margin source for these supplier-fed products. Supplier-authoritative economics remain controlling until a deliberate private cost-sync process is established.

## VEVOR pricing / MAP state

| SKU | Shopify price | Current public/feed MAP floor | MAP disposition | Margin control |
|---|---:|---:|---|---|
| `XXKLJT124INCLJF0QV0` | $39.90 | $33.90 | **PASS** | protected conservative screen passed; exact current supplier economics rechecked at paid order |
| `AXLSTCQJDSYKAZ99C001V0` | $54.90 | $47.90 | **PASS** | protected conservative screen passed; exact current supplier economics rechecked at paid order |
| `D25FT14IN20AHOGLOV1` | $66.90 | $59.90 | **PASS** | protected conservative screen passed; exact current supplier economics rechecked at paid order |

Controls:

- do not lower below the higher current VEVOR public selling price / feed-MAP floor;
- no new discounting or paid acquisition while exact live PRO cost/tax/shipping is unavailable;
- current free/owned promotion release remains valid;
- first paid order triggers live exact supplier economics and executable-order-path verification.

## Renogy advertised-pricing state

Current direct supplier guidance states that public advertised pricing must use the current Renogy retail website as the controlling public-facing reference and must not exceed the price currently listed there.

Live verification found:

| SKU | Shopify price | Current Renogy retail price | Pricing-policy disposition | Margin class |
|---|---:|---:|---|---|
| `RNG-CTRL-ADV30-LI-US` | $82.99 | $82.99 | **PASS** | **STRONG / ORDER-FIRST HERO** |
| `RBM500-US` | $87.99 | $87.99 | **PASS** | **POSITIVE BUT THINNER / FREE-OWNED TEST** |

The attached supplier workbook explicitly identifies its `Price` field as dealer price and also supplies MSRP. Protected dealer economics were used privately to classify the two live products. Exact dealer cost and derived private margin are not reproduced here.

Controls:

- current Shopify prices match current Renogy retail exactly;
- do not raise either product above the current Renogy retail reference;
- do not assume discounts/affiliate commissions are safe merely because direct gross margin is positive;
- the Adventurer 30A remains the stronger current Renogy hero;
- RBM500 remains appropriate for bounded free/owned testing but should not be treated as a high-margin paid-acquisition or broad-affiliate SKU without a fresh full contribution screen;
- recheck current Renogy retail price and protected dealer economics before material price/promotion changes and at order fulfillment.

## Cross-lane decision

**MAP / CURRENT PUBLIC PRICE CONTROL: PASS ON ALL FIVE AUDITED ACTIVE HERO SKUS.**

No corrective customer-price mutation is required now.

Current promotion hierarchy from the margin/pricing audit:

1. Renogy Adventurer 30A — strongest verified current direct-site economics;
2. VEVOR three-SKU set — bounded free/owned traffic only until exact order-time supplier economics are known;
3. Renogy RBM500 — positive but thinner; free/owned test only unless a newer contribution screen clears broader acquisition spend.

## Replay guard

Do not use blank Shopify `unitCost` as evidence that cost is zero. Do not expose protected supplier economics in public Git. Do not duplicate the VEVOR or Renogy traffic actions already in flight merely because this audit exists.

**CONTROL:** `CURRENT SELL PRICE → CURRENT VENDOR PRICE/MAP RULE → PROTECTED SOURCE ECONOMICS → CONTRIBUTION CLASS → TRAFFIC LEVEL → REAL ORDER → LIVE RECHECK → ACTUAL PROFIT.`
