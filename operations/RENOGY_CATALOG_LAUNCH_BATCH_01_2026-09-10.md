# Elevation UpScales — Renogy Catalog Launch Batch 01

**Date:** 2026-09-10  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Owner:** Casey Young  
**Project Manager:** Renogy Branch Operations Manager  
**Specialist:** Renogy Project Specialist  
**Status:** ACTIVE / PUBLICATION-READINESS BATCH  
**Parent Scope:** `RENOGY_SALES_FIRST_CATALOG_SCOPE_2026-09-10.md`

## Purpose

Convert accepted Renogy source work into the first customer-facing Elevation catalog wave.

This batch is intentionally small. The goal is not to duplicate Renogy's entire catalog. The goal is to get a trusted, useful, sales-capable Renogy assortment live quickly while exact protected publication gates are cleared SKU by SKU.

## Launch candidates

| Priority | SKU / family | Merchandising role | Accepted evidence already available | Remaining publication gates |
|---|---|---|---|---|
| 1 | `RSP100DCT-US` — 100W N-Type Bifacial Solar Panel | Hero solar / RV-off-grid entry | Exact SKU; exact public backorder state; exact 10-year product warranty + 25-year output guarantee | current MAP/price control; Partner Portal dealer orderability; approved media/source package |
| 2 | `RNG-CTRL-RVR40` — Rover Li 40A MPPT Controller | Hero controller / system-builder product | Exact SKU; exact 3-year material/workmanship warranty; strong current official review footprint | current MAP; dealer sellability/availability; approved media; final customer price |
| 3 | `RBM500-US` — 500A Battery Monitor With Shunt | Trust-building accessory / SOK-compatible cross-sell | Exact SKU; exact public backorder state; official Best Seller merchandising; broad battery compatibility | current MAP/customer price; Partner Portal orderability; approved media; exact `-US` warranty identity before publishing warranty duration |
| 4 | Current 30A/50A DC-DC Charger with MPPT family | RV/van dual-charging feature | Current Renogy Hot/Best Seller demand signal; DC-DC family already prioritized in project | exact current storefront SKU(s); exact warranty; MAP; dealer sellability; approved media |
| 5 | P2 12V Pure Sine Wave Inverter family — 1000W/2000W/3000W | High-AOV off-grid/RV power | Current Renogy Hot merchandising and substantial review history; 1000W storefront SKU already partially mapped | exact 2000W/3000W SKU mapping; suffix warranty resolution; MAP; dealer sellability; approved media |
| 6 | ShadowFlux 120W/200W N-Type Anti-Shading Solar Panel | New-tech featured panel | Current Renogy Best Seller merchandising / strong product differentiation | exact SKU mapping; warranty; MAP; dealer sellability; approved media |

## Shopify staging receipt — 2026-09-11

Owner `RUN` advanced the sales-first worktree from zero Renogy Shopify records to a real staged launch set.

A smart Shopify collection named **Renogy** now exists and automatically includes products where `vendor=Renogy`.

Current staged records:

| Shopify product GID | SKU | Product | State | Staging price source | Remaining activation gates |
|---|---|---|---|---|---|
| `gid://shopify/Product/16001198981489` | `RSP100DCT-US` | Renogy 100W N-Type Bifacial Solar Panel | DRAFT | current public Renogy reference `$99.99` at staging time | dealer/MAP recheck; Partner Portal orderability; approved media |
| `gid://shopify/Product/16001199473009` | `RNG-CTRL-RVR40` | Renogy Rover Li 40A MPPT Solar Charge Controller | DRAFT | current Renogy public promotional reference `$152.44` at staging time | dealer/MAP recheck; current sellability; approved media; price refresh before activation |
| `gid://shopify/Product/16001199112561` | `RBM500-US` | Renogy 500A Battery Monitor with Shunt | DRAFT | current public Renogy reference `$87.99` at staging time | dealer/MAP recheck; Partner Portal orderability; approved media; exact `-US` warranty bridge before publishing duration |
| `gid://shopify/Product/16001199276401` | `RNG-INVT-2000-12V-P2-US` | Renogy 2000W 12V Pure Sine Wave Inverter | DRAFT | current public Renogy reference `$285.99` at staging time | dealer/MAP recheck; Partner Portal orderability; approved media |
| `gid://shopify/Product/16001199735153` | `RBC2125DS-21W-US` | Renogy 50A IP67 DC-DC Battery Charger with MPPT | DRAFT | current public Renogy reference `$299.99` at staging time | exact warranty mapping; dealer/MAP recheck; Partner Portal orderability; approved media |

Staging controls applied:

- all five records are `DRAFT`, not public/active;
- supplier inventory is not represented as Elevation on-hand inventory;
- vendor is normalized as `Renogy` so the smart collection remains recoverable;
- exact SKUs are preserved;
- listing copy uses bounded verified product facts and preserves unresolved warranty/source holds;
- transient public promotional prices are tagged for refresh/recheck rather than treated as permanent MAP;
- no product was activated merely because a draft record exists;
- no broader storefront design or approved-site-copy change was made.

This completes the first safe **BUILD/STAGE** action for the Tier A sales-first lane. It does not satisfy the per-SKU activation gates.

## Cross-sell depth candidates

Add after or alongside the six priority lanes where gates clear cleanly:

- `RNG-CTRL-RVR20`
- `RNG-CTRL-RVR30`
- `RNG-CTRL-RVR60`
- `RNG-CTRL-RVR100`
- `RMS-LFPS`
- `RMS-DCDC`
- additional N-Type rigid/bifacial panel variants
- clean BOS/wiring/protection products

## Customer-ready listing template

Each publication candidate should be built to this structure before activation:

### Product identity

- customer-friendly Elevation title;
- Renogy brand;
- exact manufacturer SKU/model;
- product type/category;
- intended use: RV / van / off-grid / backup / monitoring / charging as applicable.

### Customer problem + benefit

Lead with the use case rather than a raw supplier title. Explain what the product enables and where it fits in a system.

### Verified feature block

Use only current verified manufacturer facts. Keep technical details readable and relevant.

### Compatibility

State voltage/system/battery/application compatibility from verified Renogy material. Do not infer compatibility from adjacent families.

### Availability

Use one of:

- In Stock
- Preorder
- Backorder
- Confirm Availability
- Unavailable

Never translate generic zero stock into paid backorder without exact authorization.

### Fulfillment

State only verified Lower-48 fulfillment facts. Avoid unsupported exact ETA promises.

### Warranty / support

Publish exact warranty duration only when exact SKU/source identity is resolved. Elevation supports the customer and routes manufacturer warranty/RMA through Renogy's process; do not claim independent remedy authority.

### In the box

Use verified Renogy package contents where available.

### Pair with

Every listing should contain 2–4 useful system relationships where verified, such as:

- panel → Rover controller → SOK battery → battery monitor;
- alternator/solar charging → DC-DC charger → SOK battery → monitor;
- SOK battery → Renogy inverter → monitoring / protection;
- solar panel → controller → cables/protection.

## Shopify staging rule

A product may be built as a non-public draft/staging record before every activation gate clears, provided:

- the exact SKU is known;
- no invented MAP, inventory, warranty or media is presented as verified;
- it is clearly tagged/controlled as not publication-ready;
- activation requires the final per-SKU publication checklist.

Do not make a product ACTIVE merely because a draft record exists.

## Publication checklist

For each product:

- [ ] exact SKU/model verified
- [ ] current customer price / MAP control verified
- [ ] Partner Portal sellability/orderability verified
- [ ] exact backorder/preorder authorization if delayed
- [ ] approved Renogy media available
- [ ] verified specs/compatibility
- [ ] direct-site channel control confirmed
- [ ] Lower-48 fulfillment path verified
- [ ] exact warranty language verified or omitted if still held
- [x] listing title/copy/SEO/category staging started for first launch wave
- [ ] cross-sell relationships assigned
- [ ] Shopify public presentation checked after activation

## Feature order on the Elevation storefront

Default first-wave merchandising order:

1. **N-Type / advanced solar panel**
2. **MPPT solar charge controller**
3. **DC-DC charging**
4. **Pure sine wave inverter**
5. **Battery monitor / system monitoring**
6. **supporting monitoring screens / BOS**

This creates a coherent customer story rather than a random supplier grid.

## Success metrics

After publication, monitor:

- product views;
- add-to-cart rate;
- checkout starts;
- completed sales;
- gross contribution;
- customer questions;
- fulfillment reliability;
- backorder cancellation/friction;
- warranty/returns friction;
- cross-sell attachment.

Use those signals to determine Batch 02 merchandising priorities.

## Immediate next action

**RECHECK TIER A MAP / DEALER SELLABILITY / APPROVED MEDIA → ATTACH VERIFIED MEDIA → FINAL PRICE/AVAILABILITY QA → ACTIVATE EACH CLEAN SKU INDIVIDUALLY → UNIVERSAL-CATALOG PUBLIC QA → FIRST REAL ORDER PROOF**

Do not recreate the five staged Shopify records. Continue from them.