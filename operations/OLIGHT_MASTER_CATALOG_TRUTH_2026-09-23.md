# Elevation UpScales — Olight Master Catalog Truth — 2026-09-23

**Status:** ACTIVE / PUBLIC-SAFE SKU CONTROL  
**Owner:** Casey Young  
**Execution owner:** Company Operations + Ecommerce & Vendor Operations  
**Supplier source:** `vendor-project-sources/OLIGHT_PROJECT_SOURCE.md`  
**Live verification:** Shopify 2026-09-24 + current retained Olight dealer sources

## Purpose

Public-safe current truth for the Olight launch set.

Protected dealer costs, discount tiers, private dealer inventory, private correspondence and private dealer-media access remain outside public Git.

Shopify inventory quantities are not treated as supplier physical inventory.

## Current Shopify Olight set

Live Shopify verification on 2026-09-24 found:

- **13 total Olight product records**
- **10 ACTIVE**
- **3 DRAFT**

| Product | Shopify SKU / variant identity | Public price | Shopify state | Supplier/source state | Current disposition |
|---|---|---:|---|---|---|
| Oclip 2 Pro | Elevation variants: `OCLIP2PRO-BLK-STD`, `OCLIP2PRO-ORG-STD` | $49.99 | **ACTIVE** | Direct dealer hot-selling source verifies Oclip 2 Pro Black/Orange standard. Olight's current public retail site also offers additional Pro/Premium configurations, but those are not treated as Elevation dealer-sale authority without direct dealer commercial verification. | **KEEP LIVE — BLACK + ORANGE STANDARD ONLY**; unsupported Tidal Blue/Premium variants and media were removed from this listing. |
| Oclip 2 Ultra Premium | Elevation variants: `OCLIP2ULTRAPREM-BLK`, `OCLIP2ULTRAPREM-OLG`, `OCLIP2ULTRAPREM-AOR` | $94.99 | **ACTIVE** | Direct Olight hot-selling source verifies Ultra Premium, 580 lumens, 130 m beam, 1,000mAh Mobile Charging Dock and Black/Olive Green/Amber Orange family. Current official Olight product page confirms the Premium product and manufacturer media. | **LIVE / VERIFIED** — official media, SEO, Online Store publication, supplier-managed availability and Olight Standard Shipping profile verified. |
| ArkPro Ultra Class 3R | `ARKPROULTRAOBKCW`, `ARKPROULTRA3RCWOLG` | $129.99 | **ACTIVE** | Exact current supplier identities verified | **KEEP LIVE** |
| Warrior Ultra | `WARRIORULTRAOLG`, `WARRIORULTRANB`, `WARRIORULTRASG` | $139.99 | **ACTIVE** | Exact three source variants verified | **KEEP LIVE** |
| Warrior X 4 | `WARRIORX4MTBK` | $129.99 | **ACTIVE** | Matte Black exact source variant verified; adjacent FDE/Camo/Glacial variants are not current substitutes | **KEEP LIVE / DO NOT AUTO-ADD ADJACENT COLORS** |
| Javelot Turbo 2 | `JAVELOTTURBO2BK`, `JAVELOTTURBO2KITBK`, `JAVELOTTURBO2KITDC` | $209.99–$264.99 | **ACTIVE** | Exact current source variants verified | **KEEP LIVE** |
| Marauder 3 | Shopify color variants Black / Midnight Blue / Orange | $369.99 | **ACTIVE** | Current Olight hot-selling source verifies the Marauder 3 color family | **KEEP LIVE** — Shopify variant SKUs are Elevation-side identities |
| OSIGHT R | Shopify SKU `OSIGHTR`; dealer product identity verified separately | $279.99 | **ACTIVE** | Exact product/spec/price verified in current hot-selling source | **KEEP LIVE** |
| Sphere | `SPHERE` | $19.99 | **ACTIVE** | Exact current supplier product verified | **LIVE / VERIFIED — preserve current product** |
| Odin S | `ODINSMMTBK` | $149.99 | **DRAFT** | Exact Matte Black M-LOK source variant verified; same-name Pic variant in dealer source is unavailable and must not be confused with M-LOK | **ADVANCE M-LOK ONLY AFTER MEDIA + PURCHASEABILITY PASS** |
| PL X GL | supplier item `0.0002.0234` | $149.99 | **DRAFT** | Exact hot-selling source identity verified | **ADVANCE AFTER MEDIA + PURCHASEABILITY PASS** |
| OSIGHT SE | `OSIGHTSE` | $199.99 | **DRAFT** | Exact source product verified | **ADVANCE AFTER MEDIA + PURCHASEABILITY PASS** |
| Baton 4 Black | `BATON4BK` | $54.99 | **ACTIVE** | Last retained dealer-source snapshot marked exact Black SKU unavailable; live Shopify is now ACTIVE as of 2026-09-24. Source-state mismatch remains open for management reconciliation. | **PRESERVE LIVE / DO NOT RECREATE OR REPRICE** — do not silently substitute another color; reconcile current supplier availability before relying on the dated snapshot for fulfillment. |

## Price / economics control

Current public Olight prices in the launch set align to the supplier-provided advertised-price/MSRP source at the 2026-09-23 reconciliation.

Protected dealer economics are intentionally not reproduced here.

Before any discount, bundle, first-month promotion or value-add offer:

**PUBLIC SELL PRICE / PROMO → EXACT CURRENT OLIGHT PRICE CONTROL → PROTECTED DEALER COST → SHIPPING/HANDLING → PAYMENT/CHANNEL FEES → REQUIRED POSITIVE CONTRIBUTION**

Olight's suggestion to consider launch offers is an opportunity, not automatic authority to discount below current supplier price controls.

## Availability control

The dealer price sheet is a supplier snapshot, not a real-time quantitative feed.

Rules:

- do not expose dealer inventory counts in public Git;
- do not present Shopify quantity as Olight warehouse stock;
- exact supplier-unavailable variants stay held;
- source-verified variants may proceed through the normal publication/purchaseability checks;
- one unavailable color/SKU does not block other verified Olight products.

## Fulfillment control

Current Olight relationship supports supplier fulfillment from the U.S. warehouse directly to customer addresses.

Operational model:

**CUSTOMER ORDER → EXACT PRODUCT/SKU VERIFY → CURRENT SUPPLIER ACCEPTANCE → SUPPLIER ORDER / DEALER PROCESS → CUSTOMER ADDRESS FULFILLMENT → TRACKING → CUSTOMER UPDATE → RECEIPT**

Weekly order consolidation may be used operationally when appropriate, but customer promises must reflect the actual order timing and shipping path.

## Special-destination control

Do not extrapolate ordinary U.S. dealer fulfillment into blanket Hawaii, Alaska, international or dangerous-goods approval.

Rechargeable/lithium products require exact product, battery configuration, packed weight/dimensions and carrier/route qualification before a special-destination promise.

## Media control

Olight has provided authorized dealer product/marketing material access.

Rules:

- use manufacturer-approved media;
- do not commit private dealer-library URLs to public Git;
- avoid generic/AI product substitution where exact authorized product media exists;
- keep customer-facing titles/copy free of internal workflow terminology.

## Next revenue sequence

1. Preserve and measure the **10 ACTIVE** Olight products; do not recreate them during this launch-closeout pass.
2. Peter Torres is assigned the three remaining Shopify drafts as a bounded media/listing-production queue:
   - **Odin S M-LOK** — `ODINSMMTBK`
   - **PL X GL** — `0.0002.0234`
   - **OSIGHT SE** — `OSIGHTSE`
3. Peter uses only Olight-authorized exact-product media/materials already supplied to Elevation and leaves each product **DRAFT** after media/copy completion.
4. Peter may complete media, ordering, alt text, and source-grounded customer copy; he may not change price, SKU, vendor, shipping profile, inventory policy, publication/channel state, or product status under this assignment.
5. Management reviews each completed draft through exact source, price/MAP, shipping/fulfillment, publication and storefront-purchaseability gates before activation.
6. Baton 4 Black is live in Shopify but has a dated supplier-availability mismatch; preserve the live listing and reconcile the source state before treating the old snapshot as current fulfillment truth.
7. After the three-draft queue is complete, issue a separate Wave 2 listing assignment from the current dealer catalog rather than bulk-building without review.
8. Qualify any launch promotion against current price controls and protected contribution economics before creation.

## Control statement

**EXACT OLIGHT PRODUCT → CURRENT SOURCE → PRICE CONTROL → MEDIA → FULFILLMENT → PURCHASEABILITY → SELL. HOLD ONLY THE EXACT BLOCKED SKU.**
