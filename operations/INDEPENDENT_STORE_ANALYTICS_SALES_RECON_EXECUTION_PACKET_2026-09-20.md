# ELEVATION UPSCALES — INDEPENDENT STORE ANALYTICS & SALES RECON EXECUTION PACKET

**Date:** 2026-09-20  
**Role:** Recon / Independent Store Analytics & Sales Strategy  
**Status:** READY FOR MPM / STORE OPS EXECUTION  
**Authority:** Advisory routing only. No production mutation performed by Recon.

## EXECUTIVE FINDING

The current P0 direction is correct, but the Core 12 should not be treated as twelve equal hero products.

The stronger execution model is:

**4 ENTRY PRODUCTS → 2 SOK ANCHORS → 2 ELEVATION SOLUTIONS → 1 SUNGOLD HERO → HAWAII SPECIALTY → COMMERCIAL ASSISTED PATH**

The business should behave like a specialist power retailer and system integrator, not a broad dropship catalog.

## FRESH FUNNEL BASELINE

Latest Shopify analytics:

- 7-day sessions: 567
- sessions with cart additions: 12
- sessions reaching checkout: 12
- completed checkouts: 0
- 7-day conversion rate: 0.0%
- direct sessions: 484
- social sessions: 42
- search sessions: 39
- desktop sessions: 511
- mobile sessions: 53
- social 30-day: Facebook 48 sessions / 2 carts / 1 checkout / 0 purchases
- 30-day store total: 619 sessions / 18 carts / 20 checkout reaches / 0 purchases

Interpretation:
- aggregate traffic is materially contaminated by likely internal/QA activity because direct + desktop dominate;
- search produced 0 carts and 0 checkout reaches in the latest 7-day window;
- social produced 1 cart and 0 checkout reaches in the latest 7-day window;
- the strongest proven defect is therefore upstream conversion: product relevance, merchandising, trust and purchase clarity;
- zero purchases alone does not yet prove payment-stack failure.

## PROVEN STOREFRONT DEFECT

Current `site/home-commerce.js` still renders up to six trusted rows from broad lithium and RV featured feeds.

The homepage is therefore not intentionally rendering the approved selling lineup.

**DEFECT:** catalog/feed ordering can determine homepage merchandise.

**REQUIRED FIX:** homepage merchandise must be explicitly curated to the approved sales pyramid.

Do not solve this with another broad redesign.

## EXECUTION SALES PYRAMID

### ENTRY PRODUCTS — PROMOTE FIRST

1. **Renogy 10W Solar Battery Trickle Charger Maintainer**
   - Price: $39.99
   - SKU: RSP10TC-G1-US
   - Role: lowest-friction conversion product

2. **VEVOR 35A RV Power Converter & Battery Charger**
   - Price: $71.90
   - SKU: FCZLQTMS35AQQ3XBI001V1
   - Role: affordable RV/mobile-power entry

3. **Renogy 100W N-Type Bifacial Solar Panel**
   - Price: $99.99
   - SKU: RSP100DCT-G1-US
   - Role: entry solar / search-social product

4. **Renogy Battery Shunt 300**
   - Price: $120.99
   - SKU: RSHST-B02P300-G1-US
   - Role: monitoring / cross-sell / technical trust product

### SOK ANCHORS

5. **SOK SK12V100PC — 12V 100Ah Bluetooth LiFePO4**
   - Price: $319
   - SKU: SK12V100PC
   - Role: primary battery anchor

6. **SOK 12V 100Ah + 20A SOK Charger Kit**
   - Price: $408
   - SKU: SOK-KIT-SK12V100PC-SK12V20A
   - Role: first-step complete battery solution

### ELEVATION SOLUTIONS

7. **Elevation Basic Off-Grid Heat Kit**
   - Price: $599.99
   - SKU: EUS-HEAT-BASIC-VEVOR8K-SOK100-20A
   - Role: proof that Elevation sells solved use cases, not random bundles

8. **Elevation Dual-Battery 12V Solar + Heat Kit**
   - Price: $1,249.99
   - SKU: EUS-HEAT-12V-2XSOK100-2XRNG100-ADV30-VEVOR8K
   - Role: larger complete RV/off-grid solution

### COMPLETE-SYSTEM HERO

9. **SunGoldPower SGR-8K10E**
   - Price: $5,499
   - SKU: SGR-8K10E
   - Product record: SunGoldPower Off-Grid Solar System Kits
   - Role: complete-system hero / high-ticket credibility anchor

Supporting upsell:
- **SGM-8K20 — $8,880**
- Treat as capacity upgrade, not a competing homepage hero.

### SPECIALTY MARKET

10. **SOK SK12V100PC — Hilo, HI 96721 Freight Purchase**
    - Price: $573.70
    - SKU: SK12V100PC-HI-SHP-1-SEP26
    - Role: Hawaii logistics capability / dedicated destination path

### SUPPORTING / DEEPER FUNNEL

- SOK 12V 206Ah heated + 40A charger — $878
- Renogy portable solar / suitcase path
- other SOK multipacks
- larger rack storage
- additional Elevation packages

These remain valid catalog products but do not consume primary homepage attention until buyer evidence justifies it.

## HOMEPAGE EXECUTION ORDER

Preserve theme/shell.

### SECTION 1 — CUSTOMER INTENT

Present three paths:

- **Shop Power & Equipment**
- **Complete Systems**
- **Project & Commercial Systems**

### SECTION 2 — START HERE

Render only:
- Renogy 10W
- VEVOR 35A converter
- Renogy 100W bifacial
- Renogy Shunt 300

### SECTION 3 — SOK BATTERY POWER

Render:
- SK12V100PC
- SK12V100PC + charger

Use a single path to the broader SOK collection.

### SECTION 4 — ELEVATION SOLUTIONS

Render:
- Basic Off-Grid Heat Kit
- Dual-Battery Solar + Heat Kit

Customer message:
**Matched equipment for a defined use case.**

### SECTION 5 — COMPLETE OFF-GRID SYSTEM

Hero:
- SunGold SGR-8K10E — $5,499

Supporting option:
- SGM-8K20 — $8,880

Do not present this section like ordinary impulse ecommerce. Include assistance/system-fit CTA.

### SECTION 6 — TRUST

Visible, concrete trust points:
- authorized relationships where verified;
- exact-SKU / matched-system support;
- supplier-backed fulfillment;
- destination-aware shipping;
- warranty/support coordination;
- help matching equipment before purchase.

### SECTION 7 — HAWAII

One dedicated capability section:
**Lithium batteries to Hawaii**

Do not dump 3/6/9/12-pack freight packages into the normal general-shop path.

### SECTION 8 — PROJECT / COMMERCIAL

Use project-review / contact path for high-value configured systems.

## THREE BUYING LANES

### SHOP POWER & EQUIPMENT

Visible categories:
- Batteries
- Solar
- Charging
- Monitoring
- RV Electrical
- Portable Power
- Accessories

### COMPLETE SYSTEMS

Visible categories:
- Elevation Solutions
- SunGold Complete Systems
- Battery + Solar Systems
- Backup / Off-Grid Systems

### PROJECT & COMMERCIAL SYSTEMS

Visible use cases:
- Whole-home
- Commercial
- Contractor
- Large storage
- Large solar
- System review

Do not expose the full backend collection sprawl as customer navigation.

## TRUST STANDARD — REQUIRED ON CORE PDPs

Every promoted PDP must answer:

1. **Authorization / relationship**
2. **Fulfillment source/path**
3. **Exactly what is included**
4. **Availability and shipping treatment**
5. **Elevation support / warranty coordination**
6. **Why buy through Elevation**

Do not invent authorization or shipment promises.

## PURCHASEABILITY SMOKE SET

Smoke these representative paths before marketing scale:

1. Renogy 10W
2. VEVOR 35A converter
3. Renogy 100W bifacial
4. Renogy Shunt 300
5. SOK SK12V100PC
6. SOK 100Ah + charger
7. Elevation Basic Heat Kit
8. Elevation Dual-Battery Solar + Heat Kit
9. SunGold SGR-8K10E
10. SunGold SGM-8K20
11. Hawaii SOK single battery
12. Project / Commercial assisted-sale path

Ordinary ecommerce smoke:
**PDP → cart → address → shipping → payment method selection**

High-ticket assisted-sale smoke:
**PDP → complete system information → system-fit assistance / intended CTA → successful lead/contact or approved checkout path**

Do not place a real order during smoke.

## MARKETING GATE

Marketing scale remains HOLD until:
- homepage curation is intentional;
- trust standard is installed on promoted PDPs;
- representative purchase paths pass smoke;
- analytics can distinguish promoted product paths.

After PASS, first four campaigns:

1. Renogy low-ticket entry offer
2. SOK SK12V100PC
3. Elevation off-grid heat solution
4. SunGold SGR-8K10E complete-system campaign

Every campaign must land on the exact relevant PDP or purpose-built collection.

Do not send product-specific ads to the generic homepage.

## SUCCESS MEASUREMENT

Primary:

**CAMPAIGN / ENTRY → PRODUCT VIEW → ADD TO CART → CHECKOUT → PAID ORDER**

Secondary:
- product-specific conversion rate;
- source-specific cart rate;
- source-specific checkout rate;
- assisted-system leads;
- average order value;
- repeat customer behavior.

Do not use total catalog count or raw direct sessions as success metrics.

## ROUTING

### COMMERCE / STOREFRONT
- replace feed-driven homepage product rendering with explicit curated lineup;
- expose the three buying lanes;
- preserve current theme/shell;
- no broad redesign.

### SHOPIFY STORE OPERATIONS
- verify exact live purchaseability of the smoke set;
- normalize trust data/copy on promoted PDPs;
- verify SunGold system purchase behavior;
- preserve valid inventory/shipping controls unless a proven defect exists.

### WEB V2 DEVELOPMENT
- only repair code defects required to implement curated merchandising or customer-path consistency;
- branch/build/test;
- stop at READY TO DEPLOY;
- production remains owner gated.

### RECON / QA
- verify execution receipt;
- independently smoke representative customer paths;
- compare funnel movement after release;
- do not duplicate store mutation.

### MPM
- keep this P0 above broad sourcing/catalog expansion;
- route one execution owner per defect;
- do not allow secondary vendor/catalog work to displace conversion execution.

## CURRENT RECON VERDICT

- **P0 STRATEGY:** KEEP
- **TWELVE EQUAL HERO PRODUCTS:** CHANGE
- **CURATED SALES PYRAMID:** ADD
- **FEED-DRIVEN HOMEPAGE:** REMOVE
- **VISIBLE ENTRY PRICE LADDER:** ADD
- **SUNGOLD 8K10 HERO:** ADD / TEST PURCHASE PATH
- **SOK AS BATTERY ANCHOR:** KEEP
- **HAWAII AS SPECIALTY DIFFERENTIATOR:** KEEP / MOVE DEEPER THAN MAIN GENERAL SHOP
- **BROAD CATALOG EXPANSION:** HOLD
- **MARKETING SCALE:** HOLD UNTIL SMOKE PASS
- **PAYMENT-STACK REBUILD:** HOLD ABSENT PROVEN DEFECT

## CONTROL PHRASE

**SELL A SMALL NUMBER OF CLEAR SOLUTIONS REPEATEDLY. LET THE LARGE CATALOG SUPPORT THE SALE — DO NOT MAKE THE CUSTOMER SHOP THE ORGANIZATION CHART.**
