# CORE 12 MERCHANDISING + PURCHASEABILITY RECON RECEIPT — 2026-09-20

**Owner:** Casey Young  
**Role:** OS RECON / verification and routing  
**Canonical P0:** CORE 12 → HOMEPAGE HIERARCHY → THREE BUYING LANES → TRUST PASS → 12-SKU CHECKOUT SMOKE → MARKET

## RECON RESULT

The Core 12 product truth exists. The primary conversion defect is merchandising selection and customer-path structure, not lack of product inventory breadth.

### CORE 12 — EXACT LIVE TARGETS

| # | Role | Exact Shopify target | Price | State |
|---|---|---|---:|---|
| 1 | Battery anchor | SOK SK12V100PC — SKU `SK12V100PC` | $319.00 | PASS — ACTIVE / published / availableForSale |
| 2 | Battery + charging | SOK 100Ah + 20A charger — `SOK-KIT-SK12V100PC-SK12V20A` | $408.00 | PASS |
| 3 | Heated battery tier | SOK 206Ah + 40A charger — `SOK-KIT-SK12V206H-SK12V40A` | $878.00 | PASS — pre-order/backorder timing language retained |
| 4 | Entry price | Renogy 10W maintainer — `RSP10TC-G1-US` | $39.99 | PASS |
| 5 | Monitoring entry | Renogy Battery Shunt 300 — `RSHST-B02P300-G1-US` | $120.99 | PASS |
| 6 | Portable solar | Renogy 100W suitcase + Voyager — `RNG-KIT-STCS100DC-VOY20-G1-US` | $229.99 | PASS — public backorder/pre-purchase path |
| 7 | RV power entry | VEVOR 35A RV converter — `FCZLQTMS35AQQ3XBI001V1` | $71.90 | PASS |
| 8 | Elevation entry system | Elevation Basic Off-Grid Heat Kit — `EUS-HEAT-BASIC-VEVOR8K-SOK100-20A` | $599.99 | PASS |
| 9 | Elevation complete system | Elevation Dual-Battery 12V Solar + Heat Kit — `EUS-HEAT-12V-2XSOK100-2XRNG100-ADV30-VEVOR8K` | $1,249.99 | PASS |
| 10 | SunGold hero | SunGold `SGR-8K10E` 8kW / 10.24kWh variant | $5,499.00 | PASS — ACTIVE product / published / availableForSale |
| 11 | SunGold premium | SunGold `SGM-8K20` 8kW / 20.48kWh variant | $8,880.00 | PASS — ACTIVE product / published / availableForSale |
| 12 | Specialty market | SOK SK12V100PC Hilo HI 96721 freight purchase — `SK12V100PC-HI-SHP-1-SEP26` | $573.70 | PASS — ACTIVE / published / route-specific customer notice |

SunGold variants share one product handle:
`sungoldpower-off-grid-solar-system-kits-6-5kw-8kw-10-24-20-48kwh-lifepo4-120-240v`.

## HOMEPAGE DEFECT — PROVEN

Current `site/home-commerce.js` fetches `/api/store/featured`.

Current `site/_worker.js` builds that endpoint by:
- taking `getPublicCatalog(...,"lithium").slice(0,6)`;
- taking `getPublicCatalog(...,"rv").slice(0,6)`.

This means the homepage is driven by catalog row order rather than the owner-approved Core 12 selling strategy.

**DEFECT:** homepage product hierarchy is not intentionally mapped to the Core 12.

Required merchandising order:
1. SOK SK12V100PC
2. Renogy portable solar / entry solar
3. Elevation system/bundle
4. SunGold SGR-8K10E hero complete system
5. Hawaii capability as specialty path

Do not promote large multipacks/freight packages ahead of general customer entry products.

## THREE BUYING LANES — DEFECT / ROUTE

Current Shop navigation exposes:
- Shop All Products
- Complete Power Systems
- SOK Battery
- Renogy
- SunGoldPower

This is cleaner than the older catalog, but it does not implement the owner-approved customer decision structure.

Required visible lanes:

### SHOP EQUIPMENT
- batteries
- solar
- chargers/monitoring
- RV power / VEVOR
- low-price entry products

### COMPLETE SYSTEMS
- Elevation kits
- SunGold complete solar systems
- SOK rack/system packages where appropriate

### COMMERCIAL / LARGE PROJECTS
- high-value storage
- larger solar arrays
- contractor/system-review path
- assisted/contact purchase where appropriate

Backend collections may remain for feeds/SEO. This is a customer-navigation simplification, not destructive collection cleanup.

## TRUST PASS

Strong existing trust evidence is already present in product copy:
- SOK core products identify Elevation as authorized dealer or supplier-fulfilled;
- Renogy core products explain exact-SKU support, destination-aware shipping and supplier recheck;
- VEVOR core product explains direct dropship fulfillment and supplier recheck;
- SunGold system identifies Elevation as an authorized SunGoldPower dealer and enumerates included components;
- Hawaii specialty purchase identifies exact destination/freight allowance and customer approval rule for freight overruns.

**DEFECT:** the trust information is not normalized into one consistent customer-visible block across the Core 12.

Required standard block on each Core 12 PDP/card where practical:
1. authorization / brand relationship;
2. fulfillment owner/path;
3. exact included components;
4. normal shipping or special-destination treatment;
5. Elevation support / fit help.

Do not invent shipping promises or warranty terms.

## PURCHASEABILITY PRE-SMOKE

Live Shopify Admin verification:
- all Core 12 target products are ACTIVE;
- all target products have non-null Online Store `publishedAt`;
- all 12 selling positions currently report `availableForSale=true`;
- SOK, Renogy, VEVOR and Elevation target variants use CONTINUE at zero displayed inventory;
- SunGold SGR-8K10E and SGM-8K20 currently report availableForSale=true while inventory policy is DENY and inventory quantity is 0. Treat this as a verification flag for browser checkout smoke; do not change inventory policy merely to force a result.

## REQUIRED 12-SKU BROWSER SMOKE

For each Core 12 target:
**HOME/COLLECTION SURFACE → PDP → CORRECT VARIANT → PRICE → AVAILABILITY → ADD TO CART/BUY → CHECKOUT LOAD**

Do not place a real order.

Additional checks:
- correct SunGold variant is preselected/clearly selectable;
- backorder/pre-purchase language survives cart/checkout for affected products;
- Hawaii item stays route-specific and does not leak into general Lower-48 merchandising;
- no unexpected shipping/payment gate appears before payment selection.

## ROUTING

**Commerce / Storefront worker**
- implement intentional Core 12 homepage selection;
- implement the three buying lanes;
- promote SGR-8K10E as the complete-system hero;
- preserve current theme/shell;
- do not redesign the site;
- do not create new products/bundles.

**Shopify Store Operations**
- normalize trust/purchase copy only where exact product truth is incomplete;
- perform/verify live cart + checkout smoke for the Core 12;
- specifically verify SunGold zero-quantity/DENY variants remain buyable as intended;
- return exact failed SKU/path only.

**OS RECON**
- verify resulting homepage order, lane structure, trust fields and the 12 checkout receipts;
- compare Core-12 funnel after release.

## STATE

**CORE 12 PRODUCT TRUTH: PASS**  
**HOMEPAGE HIERARCHY: FAIL — CATALOG-ORDER DRIVEN**  
**THREE BUYING LANES: FAIL — NOT IMPLEMENTED**  
**TRUST CONTENT: MOSTLY PRESENT / NORMALIZATION REQUIRED**  
**ADMIN PURCHASEABILITY: PASS FOR 12 POSITIONS**  
**BROWSER CHECKOUT SMOKE: REQUIRED**  
**MARKETING SCALE: HOLD UNTIL SMOKE PASS**

**OWNER DECISION REQUIRED: NO — scope is already approved.**

**NEXT:** Commerce/Storefront executes the bounded merchandising packet; Shopify Ops runs the 12-path checkout smoke; Recon verifies receipts.
