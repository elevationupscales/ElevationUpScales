# Elevation UpScales — VEVOR Catalog SOP
Date: 2026-09-10

## Source / Recon
- Supplier source: `vevor-533.xlsx` / official VEVOR feed URL recorded in `09_SOURCE_MASTER_NOTE.txt`.
- Lightweight full-feed CSV and curated assets are generated for worker use; the supplier source remains controlling.
- Feed contains an explicit `MAP (Minimum Advertised Price)` field.
- Feed inventory and price are snapshots, not customer promises.

## Current VEVOR Controls
1. VEVOR is an active direct-site supplier relationship; do not restart prospect/onboarding qualification.
2. Direct VEVOR is authorized for Elevation's direct website lane. Other marketplaces require separate authorization.
3. Keep direct VEVOR and Doba-sourced VEVOR records/source identity separate.
4. Before material publication/repricing/order: verify exact SKU/source, live VEVOR sellability, current VEVOR public selling price, feed MAP and authorized channel.
5. Use the higher applicable price floor between VEVOR's current selling price and supplier MAP control.
6. Supplier inventory is not Elevation physical On Hand unless Elevation actually owns/controls it.
7. Normal order flow: CUSTOMER ORDER → ELEVATION CHECKOUT → LIVE SKU/PRICE/SELLABILITY RECHECK → VEVOR ORDER → SUPPLIER ACCEPTANCE → PRO ACCOUNT TRACKING → CUSTOMER COMPLETION → RECORD ACTUALS.
8. Do not assume paid preorder/backorder rights for unavailable VEVOR SKUs. Pause only that SKU unless an authorized alternate path exists.
9. Planning delivery guidance is not a guaranteed customer promise.
10. Original/full supplier feed remains source of truth; curated working files do not replace it.
11. Refresh supplier price/stock data periodically; stale feed values cannot become permanent price/inventory truth.
12. Current tax status: submission complete; final supplier review pending. Restricted tax/account data stays outside public Git.

## Fulfillment Controls — Supplier Answered
- **Packaging:** VEVOR branding remains on product packaging. Do not market as fully blind/unbranded shipping.
- **Price paperwork:** supplier states invoices/pricing details are not included in the customer package.
- **Tracking:** retrieve through Elevation's VEVOR PRO account; capture actual posting timing on first real order.
- **Returns / defects / warranty:** use VEVOR's current return-policy/support process; exact return-label/cost behavior is case-specific and should be recorded when it first occurs.
- **Customer support:** customer contacts Elevation first; Elevation coordinates supplier-side support with VEVOR.

## Launch / Expansion Structure
- A-tier: 19 direct products launched/active in Shopify Admin.
- B-tier: 17 Strong Expansion SKUs prepared with no Shopify SKU collisions at preparation time; publication remains held until Stage-1 allows expansion and each SKU receives fresh verification.
- Supporting/C-tier remains secondary.

## Current Stage-1 Gate
The active public storefront blocker is Shopify Online Store password protection, not VEVOR onboarding. Use authorized Shopify Admin access to clear it, then run unauthenticated collection/product/cart/checkout acceptance before first paid-order proof.
