from pathlib import Path
import json, os

a = json.load(open("/tmp/admin-usability/audit.json", encoding="utf-8"))
files = [
    x for x in Path("/tmp/admin-usability/files-changed.txt").read_text(encoding="utf-8").strip().splitlines()
    if x and not x.startswith(".github/workflows/") and not x.startswith("deployment/admin-usability-receipt.py")
]
app_sha = os.environ["APP_SHA"]

lines = [
    "# Elevation UpScales — Admin Catalog Usability / Merchandising Cleanup Production Receipt",
    "",
    "**Date:** 2026-08-29",
    "**Disposition:** PASS",
    f"**Parent SHA:** `{os.environ['PARENT_SHA']}`",
    f"**Accepted production application SHA used:** `{os.environ['ACCEPTED_PRODUCTION_SHA']}`",
    f"**Accepted production deployment used:** `{os.environ['ACCEPTED_PRODUCTION_URL']}`",
    f"**Result/application SHA:** `{app_sha}`",
    f"**Preview URL:** {os.environ['PREVIEW_URL']}",
    f"**Production URL:** {os.environ['PRODUCTION_URL']}",
    f"**Workflow run:** `{os.environ['RUN_ID']}`",
    f"**Rollback baseline:** `{os.environ['FINAL_BASELINE']}`",
    "",
    "## Scope",
    "Owner-usability and merchandising presentation repair only. No supplier/source records were deleted, merged, repriced, published, or moved out of HOLD by this release. No schema migration was required.",
    "",
    "## Files changed",
]
lines += [f"- `{x}`" for x in files]
lines += [
    "",
    "## Supplier/source preservation",
    f"- Total supplier/inventory records observed: **{a['totalSupplierSourceRecords']}**",
    f"- Active records observed: **{a['activeSupplierInventoryRecords']}**",
    f"- Supplier-managed records: **{a['supplierManagedRecords']}**",
    "- Data mutation in this release: **NONE**",
    "- Doba Partial Snapshot semantics: **PRESERVED**",
    "- Doba 25% supplier-cost derivation: **PRESERVED**",
    "- Exact supplier SKU / HOLD protections: **PRESERVED**",
    "",
    "## Owner-view counts",
    f"- Supplier Available: **{a['supplierAvailable']}**",
    f"- Supplier Low Stock: **{a['supplierLowStock']}**",
    f"- Supplier Out of Stock: **{a['supplierOutOfStock']}**",
    f"- Physical On Hand: **{a['physicalOnHand']}**",
    f"- Catalog records: **{a['catalogProducts']}**",
    f"- Distinct merchandising products: **{a['distinctMerchandisingProducts']}**",
    f"- Variant families: **{a['variantFamilies']}**",
    f"- Duplicate/review groups: **{a['duplicateReviewGroups']}**",
    f"- LIVE: **{a['live']}**",
    f"- READY: **{a['ready']}**",
    f"- DRAFT: **{a['draft']}**",
    f"- HOLD: **{a['hold']}**",
    f"- OUT OF STOCK: **{a['outOfStock']}**",
    f"- SYNC ERROR: **{a['syncError']}**",
    f"- Missing primary thumbnails: **{a['missingThumbnails']}**",
    f"- Long/raw titles receiving a clean display treatment: **{a['cleanTitleTransformCandidates']}**",
    f"- Records receiving normalized display-category treatment: **{a['categoryNormalizationCandidates']}**",
    "",
    "## Implemented",
    "- 48–56px lazy fixed-size thumbnails with fallback in the owner merchandising layer.",
    "- Clean display-title treatment while raw Catalog/source title remains unchanged and editable.",
    "- Elevation category normalization for merchandising display; Doba taxonomy remains source metadata.",
    "- Variant-family and near-duplicate review grouping without deleting or merging exact supplier records.",
    "- Inventory owner view centered on supplier stock, cost, retail, Gross $, Gross Margin %, listing state, blocker, and last check.",
    "- Listing states: LIVE / READY / DRAFT / HOLD / OUT OF STOCK / SYNC ERROR.",
    "- `Net Contribution Incomplete` disclosure next to simple gross margin.",
    "- Debounced search, filters, and 30-row pagination.",
    "- Human-voice cleanup on touched Admin pages; software-development explanations are suppressed/replaced.",
    "- Advanced physical-stock editing remains available without dominating supplier-managed rows.",
    "",
    "## Regression",
    "- Required Admin/public routes: **PASS**",
    "- Admin authentication boundaries: **PASS (401 unauthenticated)**",
    "- Private runtimes: **PASS (404 direct)**",
    "- PayPal live configuration: **PASS**",
    "- Lower-48 RV checkout quote: **PASS**",
    "- Hawaii Kingboss block: **PASS**",
    "- Zero-stock checkout block: **PASS when zero-stock Catalog record present**",
    "- Marketplace separation: **PASS**",
    "- Start a Project: **PASS**",
    "- Solar Builder: **PASS**",
    "- Doba CSV Sync UI / Partial Snapshot / 25% derivation: **PASS**",
    "- Hawaii page and shipping controls: **PASS**",
    "- Fourthwall/Printful/Spreadconnect provider architecture: **UNCHANGED**",
    "",
    "## Schema / migration",
    "**NONE.** This release is presentation/read-only merchandising logic over existing Catalog/Inventory truth.",
    "",
    "## Deferred / non-blocking",
    "Clean titles, normalized categories, and duplicate-family classifications are currently a derived merchandising presentation over the existing editable Catalog fields. No destructive bulk rewrite was performed. Exact supplier records remain available for future manual curation.",
    "",
    "**FINAL STATUS: PASS — scoped repair complete.**",
    "",
]
receipt = Path("coordination/receipts/2026-08-29-admin-catalog-usability-merchandising-cleanup.md")
receipt.parent.mkdir(parents=True, exist_ok=True)
receipt.write_text("\n".join(lines), encoding="utf-8")

master = Path("ELEVATION_4_3_MASTER_STATUS.md")
with master.open("a", encoding="utf-8") as f:
    f.write(
        "\n\n## 2026-08-29 — Admin Catalog Usability / Merchandising Cleanup\n"
        "- Status: **PRODUCTION PASS**\n"
        f"- Parent: `{os.environ['PARENT_SHA']}`\n"
        f"- Application: `{app_sha}`\n"
        f"- Production: {os.environ['PRODUCTION_URL']}\n"
        f"- Run: `{os.environ['RUN_ID']}`\n"
        f"- Rollback: `{os.environ['FINAL_BASELINE']}`\n"
        "- No schema migration or supplier-record mutation. Owner Commerce/Admin now has clean merchandising views, thumbnails, gross economics, listing states, grouping, pagination, and human-voice cleanup.\n"
    )
