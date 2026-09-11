# VEVOR ALL-PRODUCT LIGHT FEED — BUILD NOTE

`06_VEVOR_All_Products_Light.csv` is the worker-searchable derived catalog. It is intentionally generated inside GitHub instead of being transferred through chat tooling.

## UPSTREAM SOURCE

VEVOR-supplied product feed:

`https://ads-feed.s3.us-west-2.amazonaws.com/ads/business/533/vevor-533.xlsx`

The upstream workbook remains the supplier source of truth. The light feed contains only these operational columns:

- SKU
- Product title
- Product link
- Availability
- Inventory quantity
- Product weight(KG)
- Brand
- Product type
- after coupon price
- MAP (Minimum Advertised Price)

The GitHub workflow `.github/workflows/vevor-worker-assets.yml` downloads the upstream workbook, selects those fields, writes `06_VEVOR_All_Products_Light.csv`, and rebuilds the public-safe VEVOR worker ZIP.

**Control:** feed stock and price are snapshots. Reverify live price, stock, and VEVOR price floor before publishing or supplier purchase.
