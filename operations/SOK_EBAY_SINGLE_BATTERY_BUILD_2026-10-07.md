# SOK eBay Single-Battery Build — Owner Directive — 2026-10-07

**Control:** OS1 / MPM. **Execution and live readback:** OS3. **Priority:** P0.

## New owner direction
Build the complete SOK single-battery eBay catalog first. Run the supplier warehouse stock reconciliation as a **separate internal task after the full listing-build pass**. Retain the existing **one-unit eBay offer quantity (1)** convention; do not turn Shopify reported stock into an eBay quantity feed. Preserve owner-accepted live listings and their accepted prices.

A displayed offer quantity of 1 is a deliberate marketplace quantity convention, **not evidence of a physical unit**. Do not claim real-time supplier inventory or change shipping promises based on this convention. Publication, presale handling and delivery commitments remain subject to actual fulfillability, marketplace policy and exact owner execution gates.

## Exact standalone battery scope
Live Shopify vendor `SOK Battery`, product type `LiFePO4 Battery`, nine standalone products, 2026-10-07. Source Shopify product IDs below. Shopify price is reference evidence, **not an automatic eBay price instruction or verified MAP**.

| Order | Manufacturer model | Shopify product ID | Shopify reference price | Current eBay lane |
|---|---|---|---:|---|
| 1 | SK12V100PC | 15995497906545 | $319 | Existing accepted single eBay listing 168697125231; preserve accepted eBay price, qty1; Shopify currently reports zero stock, internal audit later |
| 2 | SK12V206PH | 15997525197169 | $750 | Existing accepted single eBay listing 168698654921; preserve accepted eBay price, qty1 |
| 3 | SK12V314PH | 15997525492081 | $1099 | Current exact single packet; owner confirms saleable stock, Chino location verified; Shopify `Pre-Order` tag needs reconciliation |
| 4 | SK24V100 | 15997525262705 | $751 | **SHOPIFY ONLY (owner decision 2026-10-07):** pre-purchase flow remains; no new eBay listing while SOK stock date is unconfirmed. Nine-image OS3 packet retained but not authorized to publish. Legacy eBay single 168697309881 ($751 + $25 on Sep 17) requires separate read-only reconciliation before any future eBay action |
| 5 | SK24V150PH | 15997525623153 | $1149 | **NEXT:** OS3 draft single-battery packet staged; SOK current 24V catalog labels in stock but Chino fulfillment not independently confirmed. Prior eBay 168697425029 is SK24V150PH **+ SK24V10A charger kit** (Sep 18 $1349.99 + $25), not single; preserve kit. Legacy standalone collision + OS3 preflight required |
| 6 | SK48V100N | 15995497972081 | $1199 | Prepare new/existing standalone rack-battery reconcile |
| 7 | SK12V100H | 15997524935025 | $369 | Prepare new/existing single reconcile |
| 8 | SK12V206H | 15997525164401 | $749 | Prepare new/existing single reconcile; not the same as SK12V206PH |
| 9 | SK12V280H | 15997525393777 | $999 | Prepare new/existing single reconcile |

A charger/battery kit, multipack (3/6/12), rack-system bundle, Hawaii freight package, and an upcoming/unqualified model are **not** another standalone manufacturer battery model. Handle packs/system expansion as a later phase; do not replace or mutate accepted packs while building singles.

## Per-model preparation control
1. Reuse existing OS3 Shopify source lookup and eBay reads; resolve exact product/variant, hash, genuine manufacturer model and approved exact-media gallery. **Target at least 12 distinct model-accurate, rights-approved images when available.** Six remains a fallback only when an exact-model media search cannot produce 12 safe choices. Search the Shopify Files library by manufacturer SKU, not just the Shopify product's attached gallery, and inspect manufacturer/dealer assets. Never pad with duplicates, wrong battery versions, 3/4/6-packs, unrelated bundles, or unlicensed retailer imagery. Record source IDs/URLs and require a visual model/duplicate review for newly added assets.
2. Read existing eBay singles, seller SKU, inventory item/offers and legacy listing collision; prefer improving the exact existing listing over publishing a duplicate. Do not confuse known SK12V314PH presale 3-pack with a single.
3. Use actual SOK Chino eBay key `SOK_CHINO_91710` for Lower-48 singles; read live payment/fulfillment/return policies. Do not transfer a Hawaii delivery promise or profile to Lower-48.
4. Prepare exact title (maximum 80 characters), description, manufacturer/item specifics, category, rights-approved images, price/MAP, supplier shipping terms, and eBay SKU. Maintain an eBay offer quantity **of 1** on any new approved single-battery listing; existing accepted item pricing and listing state are not overwritten.
5. For SK12V314PH retain owner's explicit current stock clearance; treat the Shopify Pre-Order tag as metadata requiring reconciliation, not a newer supplier out-of-stock finding. Other models' availability remains **unverified until the later internal audit**.
6. Each model gets a **read-only packet and preview** first; a clean packet can be brought for an exact create approval, followed by a separate publish approval. Do not run the `LIST APPROVED EBAY ITEM` combined create/publish shortcut under this blanket build instruction.
7. Read back every approved execution: listing ID, seller SKU, exact model/variant, price, quantity, condition, category/aspects, images, merchant location, return/payment/fulfillment policies and publish status.

## Completion and follow-on audit
- Complete/record the nine-model build coverage and existing-vs-new duplicate reconciliation first.
- After build, separately reconcile supplier stock/ETA per manufacturer SKU for **internal availability lists**, sourced from current SOK warehouse/weekly-stock evidence; distinguish supplier in-stock, backorder-allowed, coming soon and unavailable.
- Do not present internal stock statuses as verified until obtained. If any live offer's shipping promise cannot be met, place that exact listing into a review/hold path rather than implicitly treating quantity 1 as stock.
- Next expansion after nine singles: approved 3/6/12-packs, system components and Hawaii-specific packages, each with separate freight/profile gates.

**Nonmutating board directive only. No eBay/Shopify inventory, policy, price, product or listing write is authorized by this file.**

## Read-only cross-SKU listing census (October 8)

Additional exact-model public eBay / Gmail historical evidence, **all legacy seller SKUs to preserve**:

| Model | Evidence | Handling |
|---|---|---|
| `SK24V150PH` | [single item 168697309882](https://www.ebay.com/itm/168697309882), exact single $1,149 + $25 shipping, three gallery images at live read; battery + charger kit is 168697425029 | **Block** OS3 proposal `EBAYLIST-2C667EBB64-944W95F9`; enhance/review legacy single, no new offer |
| `SK48V100N` | [single rack battery 168698654916](https://www.ebay.com/itm/168698654916), same seller/model, price requires live read; charger kit 168700814177 | Inspect/upgrade legacy single, no duplicate |
| `SK12V206H` | [single item 168698654908](https://www.ebay.com/itm/168698654908), same seller/model, historical current page shows $789 + $25 shipping | Inspect/upgrade legacy single, no duplicate |
| `SK12V100H` | historical September 17 eBay listing confirmation [single item 168697309880](https://www.ebay.com/itm/168697309880), $369 + $25 shipping at listing; also newer 168699452846 advertised $549.99 + $25 (exact contents unverified) | Reconcile legacy exact single and kit, do not duplicate |

OS3 CLI new-listing preflight with `legacyListingDiscovery=NOT_AVAILABLE_WITH_CURRENT_V0_1_READS` must **never** be treated as global duplicate clearance. Build a read-only legacy listing audit/upgrader path before any more SOK new-listing creates; once safe, batch gallery/fulfillment reviews and bring owner a consolidated execution package. Do not revise live listings without exact owner approval; no creates/revisions happened in this recon.

## SK24V150PH duplicate found after OS3 proposal (October 8)

- Local OS3 read-only proposal `EBAYLIST-2C667EBB64-944W95F9`, seller SKU `SK24V150PH-SINGLE-L48-OCT26`, passed exact-new-SKU checks (`inventoryItemExists=false`, `existingOfferIds=[]`, location/policies enabled, validation errors zero), status `AWAITING_EBAY_LISTING_CREATE_APPROVAL`. **Do not approve, create, or publish.** Its preflight explicitly returned `legacyListingDiscovery=NOT_AVAILABLE_WITH_CURRENT_V0_1_READS` and cannot detect legacy listings under different seller SKUs.
- Read-only public eBay listing discovery found an existing Elevation single [item **168697309882**](https://www.ebay.com/itm/168697309882), exact model/MPN `SK24V150PH` and title `SOK SK24V150PH 24V 150Ah LiFePO4 Victron CAN Heated Bluetooth IP67`, advertised at **$1,149 plus $25 shipping**, three gallery images. This is **not** the 24V charger kit (item 168697425029).
- Preserve existing live single and kit. **No new SKU duplicate**. Follow-up task: evaluate existing listing's gallery/title/price/shipping/stock and stage revision through a separately approved legacy listing revision capability; current OS3 legacy mutation path disabled. Use six existing approved Shopify media. Do not silently revise the existing listing or change price.
- MPM process correction: use public/legacy duplicate search **before** generating exact new listing proposal, and stop when an accepted single already exists. Owner requests fewer handoffs; do not ask for redundant creation approvals after a duplicate is found.

## Owner operating update — 2026-10-07 (SK24V100 → SK24V150PH)

- **SK24V100**: restock/ship date remains unconfirmed; owner directed **Shopify pre-purchase only**. Do not create or publish a new eBay single while this gate is unresolved. Approved nine-image packet remains on OS3 main from PR #38 but is **staged only**. Historical eBay single 168697309881 and charger kit 168697478742 need independent live status/reconciliation; do not change without specific owner instruction.
- **SK24V150PH**: standalone battery packet merged to OS3 main in [PR #39](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/39), merge SHA `a2705d6c4095755784c0f9eefdb80e845c7f045f`; six exact-model product gallery images; proposed $1,149 delivered; SKU `SK24V150PH-SINGLE-L48-OCT26`; quantity convention 1; Chino Lower 48 profile. SOK catalog showed In Stock at last review but physical supplier dispatch ability remains unconfirmed. The historical [eBay item 168697425029](https://www.ebay.com/itm/168697425029) is battery + 24V charger, **not a standalone single**. Avoid kit collision. No new eBay publication receipt verified yet.
- **Reduce owner handoffs:** combine read-only preflight into one CLI invocation and consolidate results for MPM; invoke an existing single-owner-command create/publish flow only if the owner authorizes that exact listing and the supplier/duplicate gates have passed, never automatically. Preserve audit events and stop on any partial-create failure rather than retrying create.
