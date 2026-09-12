from pathlib import Path

path = Path("operations/CURRENT_WORK_BOARD.md")
text = path.read_text()
lines = text.splitlines()

replacement = "| Checkout-gate cleanup — authorized preorder/backorder and unnecessary internal gates | Commerce / Developer lane | IN_PROGRESS — SHARED SOURCE-ROUTING DEFECT LIVE-CLOSED / SUPPLIER-SPECIFIC RESIDUALS ONLY | P2 RESIDUAL | The shared universal-store Buy Now source-routing defect is CLOSED: PR #133 merged at `97bd22023b0ae02ec5dbc11d6b5cb45ce6f6a7da`, PR QA run #89 passed, production run #40 passed, and public SOK Buy Now routes through supported `source=lithium`. SOK delayed-order logic already uses supplier-specific authorization; no blanket zero-stock bypass is authorized. Remaining residuals are narrower: verify Doba current/zero/stale stock-state presentation against the authoritative checkout source-state gate, and test any exact Renogy delayed-order SKU only when that SKU is activation-ready. | Do not rewrite shared checkout logic. Verify the Doba public catalog/universal-store data path produces the correct Buy Now / Confirm Availability / Out of Stock state while checkout retains exact source-stock, SKU, shipping and destination checks. When an exact Renogy SKU with verified delayed-order authority is activated, test that SKU independently. Keep unsupported unavailable products blocked. | Shared source routing remains live-accepted; Doba current/zero/stale presentation is reconciled to authoritative checkout behavior; any activated exact-SKU Renogy delayed-order path passes regression/production proof without a vendor-wide bypass | `UNIVERSAL_CHECKOUT_SOURCE_ROUTING_LIVE_RECEIPT_2026-09-11.md`; `MANAGEMENT_OPERATING_SOP.md`; `SOK_ECOMMERCE_SHIPPING_SOP.md`; `RENOGY_VENDOR_MASTER_SOP.md`; accepted Renogy mapping batches; `PROJECT_WORKTREE_CONTINUITY_AND_GATE_MATURITY_STANDARD_2026-09-10.md`; issue #65 residual checkout architecture |"

found = False
for i, line in enumerate(lines):
    if line.startswith("| Checkout-gate cleanup — authorized preorder/backorder and unnecessary internal gates |"):
        lines[i] = replacement
        found = True
    if line.startswith("**Last source-state reconciliation baseline:**"):
        lines[i] = "**Last source-state reconciliation baseline:** `6bc1acf36d43508fcb3933a58cb0f93909316642`"

if not found:
    raise SystemExit("checkout-gate row not found")

path.write_text("\n".join(lines) + "\n")
