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
| 4 | SK24V100 | 15997525262705 | $751 | Prepare new/existing single reconcile, avoid kit and pack collisions |
| 5 | SK24V150PH | 15997525623153 | $1149 | Prepare new/existing single reconcile; preserve exact variant/color identity |
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
