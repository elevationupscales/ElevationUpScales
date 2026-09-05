# Website Analytics Event Map — 2026-09-05

Central transport: `window.EUSIntent.track()` → `/api/site-event`. Transport dedupes identical event + value + route within 900ms. No contact values, notes, supplier cost, margin, raw inventory, freight routing or other private operations fields are sent by the storefront events below.

## Customer-safe storefront events

| Event | Meaning | Customer-safe value/context |
|---|---|---|
| `page_view` | route viewed | route supplied by transport |
| `homepage_sok_open` | homepage SOK catalog/product interaction | catalog or SOK SKU |
| `homepage_logistics_capability_view` | homepage logistics capability block rendered | `home` only |
| `homepage_logistics_route` | shopper chooses SOK, Hawaii or lithium from capability block | route key + destination path |
| `homepage_product_buy_open` | homepage featured product buy action | product/SKU/id + destination path |
| `homepage_product_detail_open` | homepage featured product detail action | product/SKU/id + destination path |
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
| `hawaii_options_open` | Hawaii review path opened | SKU + customer-safe stage |
| `commercial_review_route` | commercial route opened/triggered | SKU + customer-safe reason/quantity band |
| `add_to_cart` | supported commerce add action | product/SKU/id when present |
| `checkout_start` | checkout entry | `checkout` |
| `start_project_open` | Start a Project entry | existing route/source context |
| `solar_builder_entry` | Solar Builder entry | existing builder context |
| `solar_builder_sok_cta` | SK48 recommendation CTA | SK48V100N + action |
| `marketplace_open` | Marketplace route entry | existing route context |
| `store_open` | Store entry | existing store context |

## Storefront analytics privacy contract

The Worker accepts only allowlisted event names and sanitizes event details before storage. The post-consolidation storefront additions may retain only customer-safe routing/discovery context such as `source`, `sourceControl`, `stage`, `intent`, `mediaIndex`, `relatedSku`, `destination`, and numeric search-character count. Raw SOK search text is deliberately not stored.

The storefront analytics path must never accept or retain customer email, phone, free-form notes, supplier cost, margin, raw supplier inventory, private freight routing, payment data or other private operations fields. These fields are excluded by `sanitizeSiteEventDetails()` and are enforced by `deployment/qa/web-com-analytics-static.mjs`.

The D1 site-event store remains the detailed first-party funnel record. The separate Analytics Engine aggregate allowlist stays intentionally narrow; this storefront work does not broaden aggregate analytics by default.
