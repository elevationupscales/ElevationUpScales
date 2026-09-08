# SOK Supplier Stock Workflow

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-08**

## Goal

Maintain current supplier stock for the full approved SOK catalog without creating a second product catalog, exposing supplier quantities, or allowing a stock observation to bypass MAP, checkout, PO, lithium, or freight controls.

## One owner per decision

| Decision | Owner | Rule |
|---|---|---|
| Exact product identity | SOK full-line catalog | The 20 approved exact SKUs are the only accepted stock roster. |
| Supplier quantity and verification date | Protected SOK operations record | Updated only through the authenticated SOK stock workflow. |
| Public price / MAP | Existing SOK pricing controls | A stock update never writes price or MAP. |
| Public availability / purchase mode | Existing SOK availability controls | A stock update never publishes, enables checkout, or changes the customer CTA. |
| Lower-48 order release | Existing order and PO safeguards | Stock is an input to validation, not permission to order. |
| Hawaii / Alaska eligibility | Shipping & Logistics | Exact-SKU documents, carrier, economics, quantity, and destination gates remain independent. |

## Owner workflow

1. Open **Inventory → SOK Supplier Stock**.
2. Download the current 20-SKU CSV template or paste rows using:
   `sku,supplier_inventory,last_supplier_verified`.
3. Enter only stock that was actually observed from the supplier. Use a whole-number quantity and `YYYY-MM-DD` verification date.
4. Select **Preview Stock Update**.
5. Correct unknown SKUs, duplicates, invalid quantities, or missing dates.
6. Review the exact rows and select **Apply Verified Stock** once.
7. Use the resulting state:
   - **Supplier stock verified** — observed within seven days and quantity is above zero.
   - **Supplier out of stock** — observed within seven days and quantity is zero.
   - **Recheck required** — the last observation is older than seven days.
   - **Needs verification** — quantity or verification date is missing.
8. Make any customer-facing availability, backorder, checkout, or freight decision separately under the existing protected controls.

## Safety boundaries

- Newly recognized SOK catalog SKUs start with unknown stock and no shipping eligibility.
- CSV preview performs no writes.
- Apply writes only `supplier_inventory` and `last_supplier_verified` to the protected SOK operations record and adds an audit event.
- No supplier stock value is committed to this public repository or returned through a public API.
- No stock update changes retail price, MAP, product publication, customer availability, checkout eligibility, PO state, or Hawaii/Alaska freight eligibility.
- Existing verified records are preserved; roster seeding uses insert-if-missing behavior.

## Order handoff

Verified stock supports the existing order sequence only:

**Customer commitment → Elevation validation → Elevation PO → SOK processing → shipment → tracking → customer**

If stock is missing, stale, or zero, recheck the supplier before an order or PO advances. Never present stale supplier stock as guaranteed customer inventory.
