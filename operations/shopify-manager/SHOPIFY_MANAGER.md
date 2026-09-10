# Elevation UpScales — Shopify Operations Worker

**Status: ACTIVE / WORKER-SPECIFIC**  
**Effective: 2026-09-07**  
**Last reconciled: 2026-09-09**  
**Work ID: ECOM-SHOPIFY-0905-01**  
**Owner: Casey Young**  
**Human Ecommerce Manager: Peter Torres**  
**AI Role: Shopify Operations Worker**

## Purpose

Dedicated execution record for the Shopify / Shopify POS / Doba / SOK ecommerce lane under Company Operations. Peter Torres remains the Human Ecommerce Manager. The Shopify Operations Worker executes routed ecommerce work and returns lane state / evidence to Company Operations; it is not an independent management source or owner of overall company operational state.

## Active management-source rule

GitHub `/operations/` is the active management/work source. Gmail management feeds are historical/archive only. External business email may supply verified operational facts that are reconciled here.

## Git access — Shopify Operations Worker only

- READ `/operations/README.md` and relevant current `/operations/` references.
- EDIT only `/operations/shopify-manager/SHOPIFY_MANAGER.md` for normal routed Shopify Operations Worker updates.
- DO NOT edit code, workflows, deployment files, global SOPs, pricing models, historical coordination files, or other manager files without a separate owner-authorized work item.

## Public repository protection

Never place dealer/wholesale cost, raw supplier inventory, private supplier correspondence, customer personal data, payment credentials/terms, private freight quotes, non-public compliance packets, private commercial terms, or internal margin details in this public repository.

## Shopify lane mission

Operate a dropship-first Shopify catalog supporting Elevation's RV, outdoor, off-grid, lithium and marketplace business while preserving MAP, supplier, fulfillment and management boundaries.

## SOK supplier / brand-use verification — 2026-09-08

Verified supplier facts support the current Shopify SOK program:

- SOK is working with Elevation through its dealer-partnership / dropship workflow.
- Dealer orders may currently be submitted by email using PDF purchase orders while the dealer portal is under construction.
- Standard dropship pricing/service covers eligible continental-U.S. residential and commercial addresses; Hawaii and Alaska are excluded from that standard Shopify offer.
- Dealer/wholesale cost is not displayed to customers.
- SOK supplies tracking after shipment and handles product-quality return/RMA replacement/refund workflow.
- SOK authorized Elevation to use the SOK brand logo and authorized use of official SOK website images, descriptions, videos, specs and manuals for listings.
- SOK requires resale pricing to follow its current website/MAP and does not authorize additional coupons or discounts on MAP-controlled products.

Shopify product records now carry internal `Brand-Media-Authorized`, `MAP-Controlled`, `MAP-Verified`, `No-Discount`, and audit-verification tags. Each SOK product also carries internal `elevation.brand_authorization` and `elevation.authorization_verified_on` metafields.

Do not publicly claim a broader formal certification such as `Authorized Dealer` unless SOK supplies that exact designation in writing. The current internal record states the narrower verified facts: dealer/dropship relationship plus brand/media-use authorization and MAP control.

## SOK full listing audit and Online Store publication — 2026-09-08

Owner directed a SKU-by-SKU verification, strict MAP check, removal of promotional carryover, brand-authorization recording and publication when verified.

### Result

- **9 / 9 SOK products passed current MAP verification.**
- **9 / 9 SOK products are ACTIVE.**
- **9 / 9 are confirmed in Shopify's Online Store publication record.**
- **0 active Shopify discounts were present at final audit.**
- **0 compare-at prices remain on the SOK variants.**
- **0 selling plans are attached to the SOK products.**
- **Each SOK product has exactly one READY product image.**
- No `Buy More & Save`, quantity-discount banner, compare-at-sale presentation, or other SOK-site promotional treatment was carried into Elevation Shopify.
- No supplier inventory was invented. Products without verified Shopify sellable availability remain unavailable rather than being forced oversellable.

### Verified active catalog / current MAP

1. **Premium 12V 100Ah Bluetooth LiFePO4 Battery — SK12V100PC** — **$319**
2. **Premium 12V 100Ah Heated LiFePO4 Battery — SK12V100H** — **$369**
3. **Premium 12V 206Ah Heated LiFePO4 Battery — SK12V206H** — **$749**
4. **Premium Marine Grade 12V 206Ah Heated LiFePO4 Battery — SK12V206PH** — **$750**
5. **Premium 12V 280Ah Heated LiFePO4 Battery — SK12V280H** — **$999**
6. **Premium 12V 314Ah Heated LiFePO4 Battery with Victron CAN — SK12V314PH** — **$1,099** — supplier currently presents this model as pre-order with an expected ship timing around September 20, 2026; Shopify copy must preserve that availability warning until supplier status changes.
7. **Premium 24V 100Ah LiFePO4 Battery — SK24V100** — **$751**
8. **Premium 24V 150Ah Heated LiFePO4 Battery with Victron CAN — SK24V150PH** — **$1,149**
9. **Premium 51.2V 100Ah 5.12kWh Rack LiFePO4 Battery — SK48V100N** — **$1,199**

### Listing corrections made during verification

- **SK12V100PC:** customer title and copy aligned to the current SOK page: 12V 100Ah, Bluetooth, clear sealed enclosure, serviceable design, current published electrical/size/warranty data. The unverified `Group 24` title wording was removed.
- **SK12V100H:** Bluetooth, built-in heater, smart BMS, serviceable design, discharge information, weight and warranty aligned to current SOK product information.
- **SK12V206H:** Bluetooth, built-in heater, smart BMS, serviceable design, discharge information, weight and warranty aligned to current SOK product information.
- **SK12V206PH:** title now identifies the current SOK marine-grade model; sealed enclosure, heater, BMS, series/parallel support, discharge information, weight and warranty aligned to current SOK product information.
- **SK12V280H:** unsupported `aluminum case` wording was removed; Bluetooth, heater, BMS, serviceability, discharge information, weight and warranty were aligned to current SOK product information.
- **SK12V314PH:** Victron CAN, Bluetooth 5.1, self-heating, IP67, fire-suppression feature, discharge information and weight were aligned to current SOK information; current supplier pre-order / expected-ship warning was added.
- **SK24V100:** unsupported Bluetooth wording/tag was removed; serviceable design, smart BMS, discharge information, weight and warranty were aligned to the current SOK page.
- **SK24V150PH:** Victron CAN, Bluetooth 5.1, self-heating, IP67, fire-suppression feature, discharge information and weight were aligned to current SOK information.
- **SK48V100N:** copy was tightened to current official facts: 51.2V nominal / 100Ah / 5.12kWh, smart BMS, 100W heater, pre-charge circuit, RS485/CANBus, rack mounting, warranty and stated cycle-life conditions. Earlier unverified Bluetooth-OTA/app-protocol claims were removed.

### Title standard

Customer-facing SOK titles use:

**Premium → voltage/capacity → key verified feature/form factor → exact SOK model number**

Do not lead customer-facing titles with `SOK`; preserve `SOK Battery` as vendor/brand and keep the exact model number for traceability.

## SOK MAP / promotion controls going forward

- Recheck current SOK public retail/MAP before any future price change, campaign or new listing.
- Never advertise below current SOK MAP without written SOK authorization.
- Do not apply automatic discounts, compare-at sale treatments, coupons, free gifts, quantity discounts or promotional mechanisms to MAP-controlled SOK products without written approval.
- Do not copy SOK-site `Buy More & Save` or other promotional banners into Elevation Shopify unless separately approved in writing for Elevation.
- Default SOK product media presentation is clean product imagery; avoid promotional graphics unless specifically approved.
- Keep Lower-48 standard dealer dropship and Hawaii/Alaska specialized logistics separate.
- Do not fabricate supplier inventory or force overselling when current sellable availability is not verified.
- Reconcile supplier availability updates as they arrive.
- Do not expose supplier cost or protected commercial terms.

## Peter workflow

Peter may use the Shopify Operations Worker for catalog review, product edits, collections, inventory/status checks, Doba candidate review, publication-readiness review, Shopify/POS operating support and recurring MAP/content audits.

The Shopify Operations Worker performs only routed execution. Material lane state, blockers, and evidence return to Company Operations and Peter as the Human Ecommerce Manager rather than becoming a separate management source.

## NOW

- Monitor the nine published SOK Online Store listings for presentation, checkout behavior, availability, MAP integrity and supplier availability changes.
- Keep SOK promotions/discounting locked down.
- Update SK12V314PH availability copy when SOK changes it from pre-order/release status.
- Continue verification on Peter's non-lithium Doba practice drafts separately.

## Protected scope

Do not from this worker lane:

- edit production website code;
- deploy website changes;
- alter global repository management files;
- alter another manager's file;
- change live payment configuration without an authorized work item;
- publish unsupported shipping promises;
- expose protected supplier/customer information;
- commit company funds without Casey's approval.

END SHOPIFY OPERATIONS WORKER FILE
