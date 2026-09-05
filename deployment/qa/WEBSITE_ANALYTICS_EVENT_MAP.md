# Website Analytics Event Map — 2026-09-05

Central transport: `window.EUSIntent.track()` → `/api/site-event`. Transport dedupes identical event + value + route within 900ms. No contact values, notes, supplier cost, margin, raw inventory, freight routing or other private operations fields are sent by the SOK events below.

| Event | Meaning | Customer-safe value/context |
|---|---|---|
| `page_view` | route viewed | route supplied by transport |
| `homepage_sok_open` | homepage SOK catalog/product interaction | catalog or SOK SKU |
| `sok_catalog_view` | SOK collection loaded | `sok-batteries` |
| `sok_catalog_filter` | SOK filter changed | filter key |
| `sok_product_view` | SOK detail viewed | SKU |
| `sok_media_view` | approved product media opened | SKU + media index only |
| `purchase_options_open` | assisted purchase path opened | SKU |
| `purchase_inquiry_start` | first interaction with short inquiry | SKU + intent only |
| `purchase_inquiry_submit` | short inquiry stored successfully | SKU + intent/quantity band only |
| `hawaii_options_open` | Hawaii review path opened | SKU |
| `commercial_review_route` | commercial route opened/triggered | SKU + reason/quantity band |
| `add_to_cart` | supported commerce add action | product/SKU/id when present |
| `checkout_start` | checkout entry | checkout |
| `start_project_open` | Start a Project entry | existing route/source context |
| `solar_builder_entry` | Solar Builder entry | existing builder context |
| `solar_builder_sok_cta` | SK48 recommendation CTA | SK48V100N + action |
| `marketplace_open` | Marketplace route entry | existing route context |
| `store_open` | Store entry | existing store context |
