# Elevation UpScales — Renogy Supplier Source Intake & SKU Alias Recon

**Status:** ACTIVE / PUBLIC-SAFE RECON RECEIPT  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Manager:** Renogy Branch Operations Manager  
**Specialist:** Renogy Project Specialist  
**Parent:** `vendor-project-sources/RENOGY_PROJECT_SOURCE.md`  
**Related recon:** `RENOGY_LOWER48_CATALOG_HAZMAT_SHOPIFY_RECON_2026-09-11.md`

## Purpose

Reconcile the newest supplier-issued Renogy source package with the already-staged Shopify launch wave without exposing protected dealer pricing, credentials, account data, or private inventory details.

This receipt does not restart dealer onboarding, does not invalidate the 188-product public Lower-48 census/hazmat recon, and does not activate any Shopify product by itself.

## New authoritative supplier inputs

Renogy Sales Support supplied and Elevation received:

- current product/item workbook with item number, description, MSRP/public reference fields and UPC where available;
- Renogy main Marketing Toolkit with approved partner marketing/brand resources;
- confirmation that current product specifications may be sourced from the Partner Portal or Renogy retail site;
- current inventory/availability source: Partner Portal, with exact quantity available from Renogy on request;
- direct-to-customer dropship instructions;
- tracking flow through the primary account contact and Partner Portal;
- standard lead-time guidance for in-stock, paid orders;
- packing-slip/branding guidance for dropship orders;
- warranty, returns and RMA routing;
- Sales Support as the primary account contact;
- direct-site channel restriction remains controlling; no third-party marketplace permission was added.

Protected dealer cost, credentials and private account data remain outside public Git.

## Source-state correction

The earlier public recon at `da47c5096afc2e7f87f1273b9888ea8a601a5876` remains valid for its public catalog census, lithium/hazmat intake model and publication controls, but two observations are now superseded by newer evidence:

1. **Shopify is no longer at zero Renogy records.** Five Renogy products are staged as DRAFT and a Renogy smart collection exists.
2. **Supplier source intake is no longer absent.** Renogy supplied a structured current item workbook plus approved marketing toolkit and operational integration answers.

These corrections do not make all five staged products publication-ready.

## Five-product staged-wave alias reconciliation

| Public / staged Elevation SKU | Current supplier item mapping | Recon classification | Current action |
|---|---|---|---|
| `RSP100DCT-US` | `RSP100DCT-G1-US` | **UNIQUE PUBLIC-ALIAS → SUPPLIER-ITEM MAP** | Continue activation QA; retain public alias while supplier order-source code remains linked internally. |
| `RBM500-US` | `RBM500-G3-US` | **UNIQUE PUBLIC-ALIAS → SUPPLIER-ITEM MAP** | Continue activation QA; warranty duration may remain omitted until exact warranty identity is clean. |
| `RBC2125DS-21W-US` | `RBC2125DS-21W-G3-US` | **UNIQUE PUBLIC-ALIAS → SUPPLIER-ITEM MAP / ORDERABILITY HOLD** | Keep DRAFT until current dealer orderability / delayed-order authority is verified. |
| `RNG-INVT-2000-12V-P2-US` | current supplier workbook contains both `...-G2-US` and `...-G3-US` generation-coded items | **AMBIGUOUS SUPPLIER ORDER-SOURCE MAP** | Keep DRAFT until Partner Portal/current order source identifies the intended current generation. |
| `RNG-CTRL-RVR40` | current supplier workbook exposes a Bluetooth generation-coded Rover 40A item rather than a clean match to the staged non-Bluetooth public identity | **VARIANT IDENTITY HOLD** | Do not silently convert the staged non-Bluetooth listing to the Bluetooth item. Reconcile exact current variant first. |

## Price / MAP control

Renogy supplied a current public-price-reference rule through Sales Support. Customer-facing pricing must be refreshed against the current Renogy public retail reference before activation, while any protected dealer/MAP controls remain private and controlling where applicable.

No protected dealer pricing is stored in this receipt.

## Media control

The Renogy Marketing Toolkit is now a **VERIFIED APPROVED MEDIA / BRAND SOURCE** for partner use. It confirms partner use of approved product/lifestyle visuals and brand resources.

This closes the general “no approved media source” gap, but does **not** prove that the correct exact product image has already been attached to every staged Shopify record. Product-by-product media selection/attachment remains an activation task.

## Fulfillment / support control

Renogy confirmed the operating path for normal direct-site dropship orders:

**CUSTOMER ORDER → ELEVATION VERIFIES EXACT SKU / CURRENT SELLABILITY / PRICE CONTROL → ORDER THROUGH RENOGY → CUSTOMER NAME + PHONE USED AS RECIPIENT DATA → RENOGY SHIPS → TRACKING TO PRIMARY ACCOUNT / PORTAL → ELEVATION UPDATES CUSTOMER**

The supplier provided ordinary lead-time guidance for in-stock paid orders; it is planning guidance, not an unconditional customer delivery guarantee.

Warranty/RMA routes through Renogy's U.S. warranty/technical process, with Sales Support available to route cases. Returns remain subject to Renogy's current dealer/account process and required evidence.

## Activation state by staged SKU

- `RSP100DCT-US` — **ADVANCED / ACTIVATION QA CONTINUES**
- `RBM500-US` — **ADVANCED / ACTIVATION QA CONTINUES**
- `RBC2125DS-21W-US` — **HOLD ONLY CURRENT ORDERABILITY / DELAYED-ORDER AUTHORITY**
- `RNG-INVT-2000-12V-P2-US` — **HOLD ONLY SUPPLIER GENERATION / ORDER-SOURCE IDENTITY**
- `RNG-CTRL-RVR40` — **HOLD ONLY EXACT VARIANT IDENTITY**

No product is activated by this receipt.

## Universal-catalog effect

Renogy has moved from **SOURCE INTAKE OPEN / ZERO SHOPIFY PRODUCTS** to:

**SUPPLIER SOURCE PACKAGE RECEIVED → FIVE SHOPIFY DRAFTS EXIST → PUBLIC-ALIAS / SUPPLIER-ITEM RECON ACTIVE → HOLD ONLY AMBIGUOUS VARIANTS → ATTACH APPROVED MEDIA → ACTIVATE CLEAN SKUS → UNIVERSAL-CATALOG QA → FIRST REAL ORDER PROOF**

The 188-product public prospect universe remains useful for later expansion, but it is not a mass-publication authorization.

## Next action

1. preserve the five existing Shopify DRAFT records; do not recreate them;
2. resolve exact controller variant and inverter generation/order-source identity;
3. verify current dealer orderability for the DC-DC staged item;
4. attach exact approved Renogy media to clean staged products;
5. refresh final public price/reference and availability state immediately before activation;
6. activate clean SKUs individually rather than waiting for the entire Renogy catalog;
7. run universal store search/filter/product/cart/checkout QA on each activated representative product;
8. capture first real Renogy order proof and supplier fulfillment receipt.

## Protection

Do not publish protected dealer cost, raw dealer inventory, portal credentials, tax/resale data or private account information. Do not infer generation/variant equivalence merely because public product names are similar.

**Control phrase:**

**SOURCE PACKAGE RECEIVED → MAP PUBLIC ALIAS TO SUPPLIER ITEM → HOLD ONLY AMBIGUOUS VARIANTS → ATTACH APPROVED MEDIA → ACTIVATE CLEAN SKUS → UNIVERSAL QA.**
