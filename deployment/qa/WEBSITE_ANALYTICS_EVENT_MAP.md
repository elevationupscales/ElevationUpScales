# Website Analytics Event Map — 2026-09-06

Central transport: `window.EUSIntent.track()` → `/api/site-event`. Transport dedupes identical event + value + route within 900ms. No contact values, notes, supplier cost, margin, raw inventory, freight routing or other private operations fields are sent by the storefront events below.

## Customer-safe storefront events

| Event | Meaning | Customer-safe value/context |
|---|---|---|
| `page_view` | route viewed | route supplied by transport |
| `homepage_sok_open` | homepage SOK catalog/product interaction | catalog or SOK SKU |
| `homepage_logistics_capability_view` | current homepage logistics capability block is present | `home` + static/dynamic source control only |
| `homepage_logistics_route` | shopper chooses a destination/logistics route from the homepage | route key such as Hawaii or Alaska; dynamic fallback also carries destination path |
| `homepage_product_buy_open` | homepage featured product buy action | product/SKU/id + destination path |
| `homepage_product_detail_open` | homepage product/category detail action | product/SKU/id + destination path where available |
| `sok_catalog_view` | SOK collection loaded | `sok-batteries` |
| `sok_catalog_filter` | SOK filter changed | filter key |
| `sok_catalog_search` | shopper used or cleared SOK search | value is only `query` or `cleared`; context stores character count only; raw search text is not stored |
| `sok_product_open` | SOK product opened from collection | SKU |
| `sok_product_view` | SOK detail viewed | SKU |
| `sok_related_product_open` | related SOK item opened from product page | current SKU + related SKU only |
| `sok_media_view` | approved product media opened | SKU + media index only |
| `purchase_options_open` | assisted purchase path opened | SKU + customer-safe stage/intent |
| `purchase_inquiry_start` | first interaction with short inquiry | SKU + intent only |
| `purchase_inquiry_submit` | short inquiry stored successfully | SKU + intent/quantity band only |
| `hawaii_options_open` | Hawaii SOK Purchase Options path opened | SKU + customer-safe stage |
| `commercial_review_route` | commercial route opened/triggered | SKU or homepage source + customer-safe reason/quantity band |
| `add_to_cart` | supported commerce add action | product/SKU/id when present |
| `checkout_start` | checkout entry | `checkout` |
| `start_project_open` | Start a Project entry | route/source control only; redesigned homepage header and hero use this event instead of misclassifying project CTAs as product-detail opens |
| `solar_builder_entry` | Solar Builder entry | existing builder context |
| `solar_builder_sok_cta` | SK48 recommendation CTA | SK48V100N + action |
| `marketplace_open` | Marketplace route entry | existing route context |
| `store_open` | Store entry | existing store context |

## 2026-09-06 redesign reconciliation

The reference homepage made the logistics block static in `site/index.html`. The previous `home-commerce.js` implementation returned early when it detected that static block, which also skipped `homepage_logistics_capability_view`. The closeout fixes that defect: the existing static block now records the capability view while the older dynamic-injection path remains only as a fallback.

Homepage SOK product links now explicitly identify their exact public SOK SKU for `homepage_sok_open`. Homepage Start a Project CTAs use `start_project_open`. Hawaii and Alaska destination entry points are exposed as customer-safe routing choices; this does not create shipping eligibility or expose private freight logic.

## Storefront analytics privacy contract

The Worker accepts only allowlisted event names and sanitizes event details before storage. The post-consolidation storefront additions may retain only customer-safe routing/discovery context such as `source`, `sourceControl`, `stage`, `intent`, `mediaIndex`, `relatedSku`, `destination`, and numeric search-character count. Raw SOK search text is deliberately not stored.

The storefront analytics path must never accept or retain customer email, phone, free-form notes, supplier cost, margin, raw supplier inventory, private freight routing, payment data or other private operations fields. These fields are excluded by `sanitizeSiteEventDetails()` and are enforced by `deployment/qa/web-com-analytics-static.mjs`.

The D1 site-event store remains the detailed first-party funnel record. The separate Analytics Engine aggregate allowlist stays intentionally narrow; this storefront work does not broaden aggregate analytics by default.
