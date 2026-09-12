from pathlib import Path


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one match for {old[:80]!r}, found {count}")
    p.write_text(text.replace(old, new, 1))


board = "operations/CURRENT_WORK_BOARD.md"
replace_once(
    board,
    "**Last source-state reconciliation baseline:** `ec65338dcfd0526f8d5c5d0269d2f0bb5566d9ce`",
    "**Last source-state reconciliation baseline:** `0ef359d224a79ce5214e58d9798a717497e4c3dd`",
)
replace_once(
    board,
    "IN_PROGRESS — SHARED SOURCE-ROUTING DEFECT LIVE-CLOSED / SUPPLIER-SPECIFIC RESIDUALS ONLY",
    "IN_PROGRESS — SHARED + DOBA GENERIC GATES LIVE-CLOSED / EXACT RENOGY ACTIVATION TEST ONLY",
)
replace_once(
    board,
    "Remaining residuals are narrower: verify Doba current/zero/stale stock-state presentation against the authoritative checkout source-state gate, and test any exact Renogy delayed-order SKU only when that SKU is activation-ready.",
    "The generic Doba availability-presentation residual is also production-closed: PR #136 merged at `fd47919ae5701fd5c2422bf31fc199c882948ebd`; exact-SHA preview run `34669555235` passed; production run #41 (`34669666345`) passed deployed-app and canonical-domain smoke. Unknown Doba supplier stock remains visible only for availability confirmation, verified positive stock is required for Doba direct checkout, and confirmed zero remains unavailable. The only checkout-gate residual in this row is an exact Renogy delayed-order SKU test when that SKU is activation-ready.",
)
replace_once(
    board,
    "Do not rewrite shared checkout logic. Verify the Doba public catalog/universal-store data path produces the correct Buy Now / Confirm Availability / Out of Stock state while checkout retains exact source-stock, SKU, shipping and destination checks. When an exact Renogy SKU with verified delayed-order authority is activated, test that SKU independently. Keep unsupported unavailable products blocked.",
    "Do not rewrite shared checkout or Doba availability logic. When an exact Renogy SKU with verified delayed-order authority becomes activation-ready, test that SKU independently through public product/cart/checkout regression and production proof. Keep unsupported unavailable products blocked.",
)
replace_once(
    board,
    "Shared source routing remains live-accepted; Doba current/zero/stale presentation is reconciled to authoritative checkout behavior; any activated exact-SKU Renogy delayed-order path passes regression/production proof without a vendor-wide bypass",
    "Shared source routing and Doba generic availability presentation remain live-accepted; any activated exact-SKU Renogy delayed-order path passes regression/production proof without a vendor-wide bypass",
)
replace_once(
    board,
    "`UNIVERSAL_CHECKOUT_SOURCE_ROUTING_LIVE_RECEIPT_2026-09-11.md`; `MANAGEMENT_OPERATING_SOP.md`;",
    "`UNIVERSAL_CHECKOUT_SOURCE_ROUTING_LIVE_RECEIPT_2026-09-11.md`; `DOBA_AVAILABILITY_PRESENTATION_LIVE_RECEIPT_2026-09-11.md`; `MANAGEMENT_OPERATING_SOP.md`;",
)
replace_once(
    board,
    "All existing VEVOR Direct catalog work remains subject to live per-SKU price/MAP, supplier sellability and fulfillment verification before promotion/order placement. A read-only VEVOR portal inspection reached only signed-out state,",
    "All existing VEVOR Direct catalog work remains subject to live per-SKU price/MAP, supplier sellability and fulfillment verification before promotion/order placement. The 10-item first-sale shortlist remains preliminary: a protected Shopify InventoryItem check found `unitCost` unset for all 10 exact shortlist SKUs, so Shopify alone cannot prove positive contribution and no shortlist promotion is authorized until a protected current supplier-cost/contribution source clears the SKU. A read-only VEVOR portal inspection reached only signed-out state,",
)
replace_once(
    board,
    "Keep public Shopify checkout open; run fast-revenue per-SKU verification on the highest-conversion VEVOR launch candidates; promote only clean products.",
    "Keep public Shopify checkout open; obtain protected current supplier cost/order economics for the existing 10-item shortlist, then run fresh per-SKU sellability + price/MAP + contribution verification and promote only clean positive-contribution products.",
)

vevor = "operations/VEVOR_FIRST_SALE_PROMOTION_SHORTLIST_2026-09-11.md"
insert = """## Protected Shopify cost-field check — 2026-09-11\n\nA live Shopify Admin GraphQL check was run against all 10 exact shortlist SKUs using the protected `InventoryItem.unitCost` field. All 10 returned `unitCost = null`.\n\nThis is not evidence that supplier cost is zero. It means Shopify does not currently contain the protected supplier unit cost needed to clear contribution for these candidates.\n\nTherefore:\n\n- Shopify price, active status, media and product identity remain useful launch evidence;\n- Shopify alone cannot clear the profitability gate for any of the 10 shortlist SKUs;\n- no shortlist SKU is authorized for promotion from this check alone;\n- the next valid trigger is a protected current supplier-cost / landed-order-cost source, followed by the existing full contribution calculation;\n- public Git must record only the resulting `PROMOTE / HOLD` state, not protected supplier costs.\n\n"""
replace_once(
    vevor,
    "## Merchandising ranking rule\n",
    insert + "## Merchandising ranking rule\n",
)
