# Elevation UpScales — Olight Project Source

**Status:** ACTIVE / PUBLIC-SAFE PROJECT SOURCE  
**Effective:** 2026-09-24  
**Project:** Olight Authorized Dealer / Catalog / Commerce Integration  
**Owner:** Casey Young  
**Execution ownership:** Company Operations + Ecommerce & Vendor Operations  
**Human ecommerce oversight:** Peter Torres  
**Current maturity:** STAGE 1 — PROVING / LIVE LAUNCH

## Purpose

Provide one recoverable public-safe source for the approved Olight dealer relationship, current Shopify launch state, supplier-fulfilled order path, exact-product controls, approved media use, and the next revenue work.

This file does not expose protected dealer pricing, raw dealer inventory, private correspondence, private media-library access, credentials, customer data, or other private commercial terms.

## Current supplier/account state

| Control | Current state | Public-safe operating note |
|---|---|---|
| Dealer relationship | **VERIFIED / APPROVED AUTHORIZED DEALER** | Olight directly approved Elevation into its dealer program. |
| Direct Elevation ecommerce | **VERIFIED / ACTIVE** | Olight products are currently being launched through the Elevation Shopify store. |
| Supplier fulfillment / dropship | **VERIFIED / SUPPORTED** | Olight supports direct-to-customer U.S.-warehouse fulfillment for dealer orders. Exact order details and current supplier acceptance remain order-specific. |
| Opening/repeat commercial terms | **VERIFIED / PROTECTED** | Current requirements exist in private supplier correspondence and are intentionally excluded from public Git. |
| Dealer economics | **VERIFIED / PROTECTED** | Current dealer pricing/tier structure exists in the private supplier layer. Public Git records readiness/disposition, not cost. |
| Advertised price control | **VERIFIED / EXACT PRODUCT CONTROL** | Current dealer source establishes advertised-price/MSRP controls. Store pricing must be checked against the exact current supplier source before publication/change. |
| Product catalog source | **VERIFIED** | Current dealer price sheet and hot-selling selection received from Olight. |
| Supplier availability source | **VERIFIED / SNAPSHOT-BASED** | Dealer source includes product availability state. Do not expose raw supplier counts or treat a dated sheet as a real-time feed. |
| Approved media | **VERIFIED / HIGH-LEVEL DEALER ACCESS** | Olight provided dealer-authorized product/marketing materials. Private source links stay outside public Git. |
| Warranty/support | **VERIFIED PROGRAM / EXACT CUSTOMER HANDLING STILL PRODUCT-SPECIFIC** | Olight provided dealer warranty support. Customer-facing claims must stay within current Olight terms for the exact product. |
| Lithium / special destination shipping | **EXACT-SKU CONTROL** | Rechargeable products require exact product/route qualification for Hawaii, Alaska, air, or other special handling. No blanket route promise. |
| First paid Olight fulfillment proof | **OPEN** | Live catalog exists; first completed Olight customer fulfillment remains a maturity gate. |

## Source hierarchy

Use current evidence in this order:

1. Casey's newest explicit direction.
2. Current accepted Elevation OS / Work Board.
3. Current direct Olight correspondence and dealer source documents.
4. Current live Shopify product state.
5. Public Olight product/support sources where they do not conflict with direct dealer evidence.
6. Historical recon files.

Historical `OLIGHT_PARTNERSHIP_RECON_2026-09-17.md` is useful relationship history but its pre-approval / unknown-dropship state is superseded by later verified supplier evidence.

## Current launch assortment

Current Shopify verification on 2026-09-24 finds **13 Olight product records: 10 ACTIVE and 3 DRAFT**. The remaining DRAFT queue is **Odin S M-LOK**, **PL X GL**, and **OSIGHT SE**. Sphere and Baton 4 are currently ACTIVE in Shopify.

The Oclip family remains separated correctly: Oclip 2 Pro Black/Orange standard is its own $49.99 listing, and Oclip 2 Ultra Premium is a separate $94.99 live listing with the Mobile Charging Dock.

**Baton 4 source-state note:** Shopify currently shows Baton 4 Black ACTIVE, while the last dealer-source snapshot recorded the exact Black SKU as unavailable. Preserve the live product without recreating or repricing it, but treat the supplier-source mismatch as a management reconciliation item before relying on that dated availability snapshot for fulfillment.

The exact operational truth is maintained in:

`../OLIGHT_MASTER_CATALOG_TRUTH_2026-09-23.md`

## Launch rules

For each Olight product:

**EXACT PRODUCT / VARIANT → CURRENT SUPPLIER SOURCE → ADVERTISED PRICE CONTROL → CURRENT SOURCE AVAILABILITY → APPROVED MEDIA → SUPPLIER FULFILLMENT PATH → SHOPIFY PUBLICATION → CUSTOMER PURCHASEABILITY → FIRST ORDER PROOF**

Do not:

- use Shopify inventory quantity as supplier physical stock;
- expose a fake exact stock count to customers;
- silently replace an unavailable exact color/SKU with an adjacent variant;
- expose protected dealer economics in public Git;
- reuse a sold-out/discontinued supplier SKU simply because a Shopify draft exists;
- promise Hawaii/Alaska shipment from ordinary Lower-48 fulfillment evidence;
- create a second Olight project/catalog when the current one already exists.

## Customer-facing media rule

Use Olight-authorized product/lifestyle media for Olight merchandising.

The private dealer media-library location must not be committed to public Git.

Customer-facing product, collection and brochure material should be product-led and brand-appropriate; internal control/gate language stays out of customer copy.

## Current next work

1. Preserve the **10 currently ACTIVE** Olight products; do not recreate them during the draft-production pass.
2. Peter Torres is authorized for a bounded Shopify listing-production assignment on the three existing DRAFT products, in this order:
   - **Odin S M-LOK** — Shopify SKU `ODINSMMTBK`
   - **PL X GL** — supplier/product identity `0.0002.0234`
   - **OSIGHT SE** — Shopify SKU `OSIGHTSE`
3. Peter may use the Olight-authorized media package already downloaded to his local working environment to:
   - match exact product media to the exact existing Shopify draft;
   - upload/select official hero and supporting product/lifestyle media;
   - improve media order and alt text;
   - verify customer-facing description/spec copy against the supplied Olight materials;
   - remove the `Dealer Media Pending` tag only after that product's media pass is actually complete.
4. Peter must leave all three products **DRAFT** for management review. This assignment does **not** authorize price, SKU, vendor, shipping profile, inventory-policy, publication/channel, or product-status changes.
5. Management final gate for each draft remains:
   **EXACT PRODUCT/SKU → CURRENT OLIGHT SOURCE → PRICE/MAP → MEDIA → SHIPPING/FULFILLMENT → PUBLICATION → STOREFRONT PURCHASEABILITY.**
6. After the three-draft launch queue is completed and reviewed, management may issue a separate Wave 2 assignment from the current dealer catalog. Do not bulk-create unreviewed Olight products.
7. Preserve Baton 4 live state while management reconciles the dated supplier-availability mismatch; do not silently substitute colors or duplicate the listing.
8. Capture the first real Olight paid-order fulfillment as the next maturity proof.

## Control statement

**CURRENT SUPPLIER TRUTH + CURRENT SHOPIFY STATE → ONE OLIGHT CATALOG → PROTECTED ECONOMICS STAY PRIVATE → VERIFY BEFORE PUBLISHING OR PROMISING.**
