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

## Owner-requested existing listing improvement package — October 7/8

Owner: "yes improve listing". Read-only live eBay check, source Shopify catalog and authorized SOK media performed for three existing singles. [OS3 PR #40](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/40) was **merged as staging-only data** at `ab49f8284fd6effc8c24ba5b8a7396e8df5f6c04`. Exact revision packet at `runtime/ebay-listing-revisions/sok-exact-existing-singles-20261007.json` on OS3 main.

- SK24V150PH [168697309882](https://www.ebay.com/itm/168697309882): upgrade from 3 existing gallery images to 6 source-approved; preserve $1,149 + $25 freight and existing listing ID/SKU. Do not confuse with 168697425029 battery+charger kit.
- SK12V206H [168698654908](https://www.ebay.com/itm/168698654908): upgrade 2 → 5 approved photos, preserve $789 + $25 freight and exact non-PH model.
- SK12V100H [168697309880](https://www.ebay.com/itm/168697309880): upgrade 3 → 6 approved photos, preserve $369 + $25 freight. Preserve separate monitor kit 168699452846.
- SK48V100N [168698654916](https://www.ebay.com/itm/168698654916) was ended by seller on Sep 27; no automatic relist. SK24V100 Shopify-only.

**Pending actual execution:** OS3 v0.1 has no legacy listing revise API/write adapter and seller-authenticated TinyFish browser profile has no sign-in record. **No eBay listing content has changed yet.** Next action is one seller authentication or bounded OS3 legacy revise implementation, then item-ID-bound read-before-write and postwrite readback. Avoid asking user to run 5 separate approval commands.

## Customer-facing eBay copy standard — Shopify retail-ready is authoritative (October 7 owner instruction)

**Owner:** "listing descriptions need to be modeled off of shopify listings. most shopify items have recived a retail ready pass and do not have any operations slip inside descriptions."

**MANDATORY FOR NEXT SOK LISTING REVISION OR CREATE:** Resolve the exact matching Shopify product/model first; use its **current retail-ready `descriptionHtml` verbatim by default** for the eBay product description. Preserve the buyer-friendly layout, spec lists, real use-case language and original exact-model claims. No copywriting from operating SOP text, no artificial shipping/stock/internal process paragraphs. Do not promise supplier fulfillment, warehouse location, freight service, shipping estimates, owner approval, policy status, manual order handling, or live inventory based on internal evidence. Keep supplier logistics, shipping profiles, MAP verification, Chino warehouse routing, compliance notes, internal approvals and stock/ETA checks in OS3/MPM audit records and platform structured settings, **not** in customer-facing HTML. Minimal eBay-specific adaptation is allowed only when required by eBay display/policy, and must preserve retail copy meaning.

OS3 [PR #41](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/41) merged `67e9cac58a505cded3b3d8e87c6e4da8170e493e`. Readback confirmed **three existing-item revision packets** (SK24V150PH item 168697309882; SK12V206H item 168698654908; SK12V100H item 168697309880), and **three unexecuted JSON seed files** have descriptions equal to their current Shopify source with no identified operations-text slip. Images and planned prices unaffected. OS3 docs: `docs/ebay-retail-ready-shopify-copy-standard.md`.

**Execution:** These are prepared data/document corrections only. The legacy eBay listings have **not been revised live**; OS3 needs an authorized seller-owned existing-listing revise method or authenticated seller session. Do not treat Git merger as eBay publication. SK24V100 remains Shopify-only; SK24V150PH new-listing proposal is blocked by the existing single.

## MPM continuation checkpoint — 2026-10-08 / existing eBay singles

**Disposition:** Data-only media/description improvements for legacy eBay items are staged; not yet executed on eBay. Following the owner-approved Hawaii freight-index read acceptance, return first to these exact eBay legacy single improvements. Do not restart discovery or create duplicative offers.

**OS3 bounded engineering assignment:** [issue #44](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/44), a P0 read-only identification and draft-only legacy revision workstream.

| Exact eBay listing | SOK SKU | Staged gallery | Next owner-gated task |
|---|---|---:|---|
| 168697309882 | SK24V150PH | 6 | Prove seller-owned active listing and revise method, then exact-ID gallery/Shopify-copy-only revision proposal; protect $1,149 + $25 shipping |
| 168698654908 | SK12V206H | 5 | Same; protect $789 + $25 shipping |
| 168697309880 | SK12V100H | 6 | Same; protect $369 + $25 shipping |

Sources already merged into OS3 main: `runtime/ebay-listing-revisions/sok-exact-existing-singles-20261007.json`, `runtime/ebay-listing-revisions/SOK_EXISTING_SINGLES_EXECUTION_PLAN_20261007.md`, and `docs/ebay-retail-ready-shopify-copy-standard.md`.

**OS3 permission boundary:** Trading API `GetItem` can read exact legacy item IDs with seller OAuth where allowed; Inventory API edits apply only to Inventory-managed objects. eBay Trading API `ReviseFixedPriceItem` cannot revise listings created under the new Inventory model. The worker must prove management model and exact seller ownership before any revision design; conflicting EPS/vendor picture modes must fail closed. Issue #44 requests READ/RECON and DRAFT-PR only; no owner approval for live modify, migrate, relist, publish, or change price/quantity/policies has been issued.

**Existing holds unchanged:** `SK24V100` Shopify-only pending dispatch date, `SK48V100N` item 168698654916 seller-ended, duplicate SK24V150PH new-offer proposal `EBAYLIST-2C667EBB64-944W95F9` blocked, distinct kits and multipacks untouched.

**Hawaii subsequent step:** After singles complete, derive Hawaii offer preflight from the separate source-backed local OS3 rate index at `F:\OS3\HawaiiFreight` (39 records, receipt `OS3-20261008053840-EDSUK`; quote validity and 5 historical model-review flags tracked). OS3 private master PR #43 remains draft/unmerged pending exact owner authorization; no private carrier-cost publication.
