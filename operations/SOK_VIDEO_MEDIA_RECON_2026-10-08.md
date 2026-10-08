# SOK Video and Media Recon — 2026-10-08 — MPM / OS3

**Mode:** Read-only supplier-source discovery; no Shopify, eBay, Git deployment or Media API mutation. **Owner quality target:** 12 distinct, exact-model licensed photos wherever possible **plus one accurate approved video** on each SOK eBay standalone listing where safe/available.

## A. Authoritative supplier-delivered source

- Supplier email: SOK sales manager, 2026-09-29, Gmail message `1a0ebc9088fde1bf`, subject `Re:First Hawaii Order — Approved Forwarders Tender Instructions / 3 × SK12V100PC`.
- SOK **Product Videos RAR**: https://drive.google.com/file/d/1XuLtfExgoA9Viqm5KyvqrrCIXKA4F2I9/view?usp=sharing
- Google Drive metadata: `SOK Battery Product Videos.rar`, 574,003,731 bytes (~574MB decimal), `application/x-rar`, created 2026-09-29. Accessible to owner through Drive.
- SOK **Product Images ZIP**: https://drive.google.com/file/d/1_IUGscvqpefBDORUg2eYEnp9DsGBh1-e/view?usp=sharing ; 929,532,388 bytes. Supplied 2026-09-10 by SOK, Gmail `1a08a8b48cd57e8b`.
- **Important limitation:** Drive connector file download limit is 268,435,456 bytes (256 MiB). Therefore neither supplier archive's internal filenames nor unique-file counts were inspected here. Download directly through owner's browser to local `F:\OS3\SOKMedia\` and run bounded local OS3 archive/file manifest; never infer the presence of particular model videos from archive title alone.
- **Channel-rights caution:** Supplier delivery in response to Elevation dealer media request is meaningful provenance, but SOK's response did **not** explicitly enumerate whether every video may be reused on eBay/TikTok or edited/re-encoded. The Sep 9 request asked for channel-specific terms; preserve the channel-rights review gate before eBay video uploads. Do not rip unauthorized third-party YouTube reviews.

## B. Live connected Shopify exhaustive SOK video recon

Shopify Admin `files(query:"media_type:VIDEO")` paginated through all **73** video files (the count is across the entire multi-brand store, not 73 SOK videos). Shopify GraphQL `product.media` queried for **all nine** SOK standalone product IDs. All entries below reported video status **READY** in Files and are read-only assets. Source catalog URLs are permanent Shopify CDN links, never public eBay media IDs.

| SKU | Shopify attached video | Extra matching Shopify Files video | Recon status |
|---|---|---|---|
| `SK12V100PC` | None | None exact-name | `SOURCE_ARCHIVE_RECON_REQUIRED` |
| `SK12V206PH` | None | None exact-name | `SOURCE_ARCHIVE_RECON_REQUIRED`; not same as SK12V206H |
| `SK12V314PH` | 76s exact-model product animation `70432578240881` | 29.71s Bluetooth pairing `70432507560305`; 58s parallel setup `70432573358449` | **3 exact-model source candidates**, 1 attached |
| `SK24V100` | None | None exact-name | `SOURCE_ARCHIVE_RECON_REQUIRED` |
| `SK24V150PH` | 89s 24V150 parallel wiring animation `70432527450481` | None extra exact-name | **1 exact-model source candidate**, attached; edit/approval review due runtime |
| `SK48V100N` | 50s English product animation `70432559989105`; 59s 5 kWh Bluetooth app demonstration `70432531120497` | None extra exact-name | **2 associated candidates**, both product-attached |
| `SK12V100H` | None | None exact-name | `SOURCE_ARCHIVE_RECON_REQUIRED` |
| `SK12V206H` | None | None exact-name | `SOURCE_ARCHIVE_RECON_REQUIRED`; do not use SK12V206PH marine case footage |
| `SK12V280H` | None | 55s model-named clip `70432560152945` | **1 exact-model candidate**, not attached |

**Two generic SOK-family feature video candidates**, not safe to assign to a battery SKU without actual-frame/product-version verification:
- `APP功能展示.mp4` (app function demonstration), 24.75s, Shopify `gid://shopify/Video/70432501924209`, https://cdn.shopify.com/videos/c/o/v/ecc06b7a11d44e129d302f88285f72f2.mp4
- `加热原理.mp4` (heating principle), 23.08s, Shopify `gid://shopify/Video/70432541049201`, https://cdn.shopify.com/videos/c/o/v/838cadc322b74b2bb1d9c76e21bb3263.mp4

### Individual exact-model source references

| Model / role | Shopify Video GID | Length | Source URL |
|---|---|---:|---|
| SK12V314PH — Bluetooth pairing | `gid://shopify/Video/70432507560305` | 29.71s | https://cdn.shopify.com/videos/c/o/v/af40ae70e00843e4b3854668e6e85fec.mp4 |
| SK12V314PH — parallel configuration | `gid://shopify/Video/70432573358449` | 58s | https://cdn.shopify.com/videos/c/o/v/6d12c49fab2145209ccea19bebc53479.mp4 |
| SK12V314PH — product animation | `gid://shopify/Video/70432578240881` | 76s | https://cdn.shopify.com/videos/c/o/v/bcfdeacba36a4952ac013c8a3e93985b.mp4 |
| SK24V150PH — parallel wiring animation | `gid://shopify/Video/70432527450481` | 89s | https://cdn.shopify.com/videos/c/o/v/93070344c1de4a48b5b798b416604f40.mp4 |
| SK48V100N — English rack battery animation | `gid://shopify/Video/70432559989105` | 50s | https://cdn.shopify.com/videos/c/o/v/a215a298329f40819e45cf40a67c3b9d.mp4 |
| SK48V100N — 5kWh Bluetooth app demo | `gid://shopify/Video/70432531120497` | 59s | https://cdn.shopify.com/videos/c/o/v/b476084be5c348528e6d015d4049a4d8.mp4 |
| SK12V280H — model-named clip | `gid://shopify/Video/70432560152945` | 55s | https://cdn.shopify.com/videos/c/o/v/faba80b7111443bda072f5f832291b4d.mp4 |

Video titles and Shopify product attachment give **source association**, not proof of visual exactness, audio language, copyright music clearance, aspect, codec or file size. Visual/model review remains required.

## C. External manufacturer review (REFERENCE ONLY, not auto-copy permission)

- Manufacturer SK12V100H product page has a video review/gallery section: https://us.sokbattery.com/product-page/sk12v100h-12v-100ah-self-heating-lifepo4-battery . Review may be third-party; **do not download/reupload unless SOK and underlying creator authorize reuse**.
- Manufacturer SK12V206PH marine SKU product page has a video review/gallery: https://us.sokbattery.com/product-page/sk12v206ph-marine-grade-lifepo4-battery . This is NOT the metal-case SK12V206H.
- SOK public FAQ links how-to/repair videos, some from independent creators: https://www.us.sokbattery.com/faq . These are reference sources, not automatically license-cleared marketplace media.

## D. eBay limitations / action boundaries

eBay allows **one listing video**; MP4/MOV, 150MB maximum, maximum upload resolution 1080p; MP4 video codec should be H.264/AVC. Recommended <= 60 seconds, although a longer asset is not automatically disqualified if under the size limit. Direct YouTube video links are not supported. Videos require eBay moderation and may take 48 hours or up to seven business days. Listings with variations do not support video. [eBay seller video guidance](https://www.ebay.com/help/listings/creating-managing-listings/adding-video-listing?id=5272).

eBay policy cautions against copying manufacturer/third-party website media without authorization. **Do not treat manufacturer-hosted third-party reviews as cleared assets**. [eBay images/videos policy](https://www.ebay.com/help/policies/listing-policies/images-videos-text-policy?id=4240).

**OS3 execution gate:** Existing SOK eBay listings are legacy seller item IDs; before Media API upload/association or Trading `ReviseFixedPriceItem`, prove exact item ID, seller ownership, variant status, eBay API representation, licensing, file size/codec and approved-only media set. Zero live eBay mutations under this recon.

## E. Next worker read-only actions

1. Download the full supplier video RAR on owner's Windows F: drive (owner-run browser step; cannot be completed by current connector due size). Use verified vendor link, do NOT place supplier archive into Git.
2. Create archive manifest: exact archived pathname, raw filename and original model naming, uncompressed size and extension; once extracted verify source hash SHA-256, codec, dimensions, duration, language, visible model/terminals/case and commercial channel permission.
3. Cross-match archive to nine SKU inventory; prioritize missing SK12V206H and SK12V100H, then SK12V100PC, SK12V206PH, SK24V100, and unassociated extra variants.
4. Derive one SAFE eBay video proposal per SKU (or `NO_VERIFIED_VIDEO`); avoid assigning generic heater/Bluetooth clips to particular models without confirmation.
5. Submit one consolidated proposal as an addendum to OS3 [issue #44](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/44) and maintain source records in the internal POS; do not modify eBay listings without exact owner authorization.

**Additional security:** Neither supplier ZIP/RAR nor private Shopify media should be copied into a public Git repository; catalog only pointers and harmless metadata. Do not disclose internal supplier communications in customer-facing listings.
