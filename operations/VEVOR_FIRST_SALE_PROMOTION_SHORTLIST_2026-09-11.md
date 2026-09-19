# Elevation UpScales — VEVOR First-Sale Promotion Shortlist

**Status:** ACTIVE / FRESH SELLABILITY PASS COMPLETE / 3 VIABLE SKUS AWAIT EXACT PRO ECONOMICS  
**Original shortlist date:** 2026-09-11  
**Last reconciled:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Project:** VEVOR Supplier / Catalog / Shopify / Fulfillment  
**Parent:** `vendor-project-sources/VEVOR_PROJECT_SOURCE.md`  
**Profitability Gate:** `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`  
**Fresh-check receipt:** `VEVOR_FIRST_SALE_FRESH_CHECK_2026-09-12.md`  
**Global Priority:** first verified **profitable** Elevation direct-site order

## Purpose

Maintain the bounded VEVOR first-sale candidate queue after current exact-SKU public sellability and public-price/MAP verification.

This file does not authorize discounts, paid ads, inventory purchases, channel expansion or promotion of an item whose economics are not cleared.

## Current result — 2026-09-12

The original 10-SKU low-friction shortlist was fresh-checked against the current public VEVOR product pages.

### Viable now — continue to protected economics

| Priority | Product | Exact VEVOR SKU | Shopify / public price | Feed MAP | Current VEVOR sellability | Current disposition |
|---|---|---|---:|---:|---|---|
| 1 | VEVOR Camper Levelers — 2-Pack, Up to 4 in | `XXKLJT124INCLJF0QV0` | $33.90 | $33.90 | **IN STOCK — Buy Now + Add to Cart shown** | **HOLD — ECONOMICS UNKNOWN** |
| 2 | VEVOR 5000 lb A-Frame Trailer Jack — 15 in Travel | `AXLSTCQJDSYKAZ99C001V0` | $47.90 | $47.90 | **IN STOCK — Buy Now + Add to Cart shown** | **HOLD — ECONOMICS UNKNOWN** |
| 3 | VEVOR 12V 25-ft Electric Drain Auger — Auto Feed | `D25FT14IN20AHOGLOV1` | $59.90 | $59.90 | **IN STOCK — Buy Now + Add to Cart shown** | **HOLD — ECONOMICS UNKNOWN** |

For all three, the current public VEVOR selling price equals the feed MAP reference at this check. Exact current PRO net cost and normal supplier shipping treatment remain required before positive order contribution can be proven.

### Current sellability holds — do not actively promote

| Product | Exact VEVOR SKU | Public price | Feed MAP | Current state |
|---|---|---:|---:|---|
| VEVOR 50A RV Power Outlet Box — NEMA 14-50R | `DGNRV50A1450RJD0NV0` | $34.90 | $34.90 | **OUT OF STOCK — HOLD EXACT SKU** |
| VEVOR RV Slide-Out Support Jacks — 5000 lb Each, 2-Pack | `RVHCWDQ2J500GHGAFV0` | $49.90 | $49.90 | **OUT OF STOCK — HOLD EXACT SKU** |
| VEVOR 2.6-Gal Wet/Dry Vac — 2.5 HP | `SYGSZK10L110VIU03V1` | $50.90 | $50.90 | **OUT OF STOCK — HOLD EXACT SKU** |
| VEVOR 1HP Submersible Utility Pump — 4000 GPH | `QSSZBSL10HP08XUGUV1` | $54.90 | $54.90 | **OUT OF STOCK — HOLD EXACT SKU** |
| VEVOR 60W Foldable Solar Panel — 24% N-Type | `BXZDTYNB160W36PFJ001Y3` | $55.90 | $55.90 | **OUT OF STOCK — HOLD EXACT SKU** |
| VEVOR 12V RV Water Pump — 5 GPM / 70 PSI | `DDGMSBCGK12VVRA9W001V9` | $61.90 | $61.90 | **OUT OF STOCK — HOLD EXACT SKU** |
| VEVOR 100W Monocrystalline Solar Panel — Off-Grid / RV | `GDSTYNB1100W5GVA8001V1` | $63.90 | $63.90 | **OUT OF STOCK — HOLD EXACT SKU** |

The seven unavailable SKUs should not consume protected-economics or promotion capacity until a later source-refresh shows a valid order path.

## Protected economics source state

Shopify previously returned `InventoryItem.unitCost = null` for all 10 original candidates. That remains insufficient to clear contribution.

Supplier correspondence confirms the PRO membership model provides a 2–15% discount depending on purchase amount plus an extra 3% growth-incubation discount until PRO Level 2 ($25,000). This establishes the commercial framework but does not prove an exact SKU-specific net checkout cost.

On 2026-09-12, Elevation sent a focused request in the existing VEVOR supplier thread for the three currently sellable SKUs asking for:

1. current PRO net unit price after applicable membership/growth-incubation discount;
2. confirmation that the extra 3% growth-incubation discount currently applies; and
3. normal continental-U.S. dropship shipping treatment / any additional supplier shipping charge.

Protected net prices, margins and private account terms must stay outside public Git. When the reply arrives, record only the resulting public-safe promotion disposition.

## Promotion control

Before any VEVOR first-sale candidate is actively promoted:

**EXACT SKU → LIVE VEVOR SELLABILITY → CURRENT VEVOR SELLING PRICE / MAP FLOOR → CURRENT PRO NET COST → SUPPLIER SHIPPING / FULFILLMENT COST → APPLICABLE CHECKOUT / PLATFORM FEES → POSITIVE ORDER CONTRIBUTION → WORKING SHOPIFY BUY PATH → PROMOTE**

Use the company-wide Direct-Site Profitability Gate states:

- `PROMOTE`
- `HOLD — ECONOMICS UNKNOWN`
- `HOLD — NEGATIVE CONTRIBUTION`
- `OWNER REVIEW — STRATEGIC EXCEPTION`

A sellability failure is an upstream VEVOR SKU hold; do not perform promotion economics for an unavailable SKU.

## Do not repeat

Do not:

- rerun generic VEVOR onboarding;
- rebuild the A-tier or B-tier catalog;
- reopen the storefront-password task;
- recheck all 10 candidates again during the same source window;
- promote the seven currently unavailable SKUs;
- assume the PRO discount percentage proves the exact current net supplier cost;
- invent free supplier shipping;
- create a discount that violates MAP or makes contribution non-positive;
- use paid acquisition before economics are separately approved and acquisition cost is included.

## Next action

**WAIT ONLY ON EXACT PRO ECONOMICS FOR THE 3 CURRENTLY SELLABLE SKUS → CALCULATE PROTECTED ORDER CONTRIBUTION → ASSIGN PROMOTE / HOLD → ROUTE FIRST CLEAN PROMOTE ITEM(S) TO FREE/OWNED TRAFFIC → FIRST REAL VEVOR ORDER → REVERIFY → FULFILL → RECORD ACTUALS.**

The seven unavailable candidates return to the back of the source-refresh queue and do not block the three viable items.

**Control phrase:**

**SELLABILITY FIRST → ECONOMICS ONLY ON ORDERABLE SKUS → POSITIVE CONTRIBUTION → PROMOTE → PROFITABLE DIRECT-SITE ORDER → RECORD ACTUALS → SCALE.**