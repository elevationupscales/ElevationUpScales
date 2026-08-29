from pathlib import Path


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if old not in text:
        raise SystemExit(f"Missing patch anchor: {label}")
    return text.replace(old, new, 1)


# -----------------------------------------------------------------------------
# Catalog / supplier-cost truth
# -----------------------------------------------------------------------------
catalog_path = Path("site/catalog-admin-runtime.js")
catalog = catalog_path.read_text(encoding="utf-8")

cost_block = '''
const KNOWN_DOBA_COST_REFERENCE = new Map([
  ["D0102HQ4KJV-861319",10392],
  ["D010277TCB2-470279",2872],
  ["D01027HXHHA-472564",15789],
  ["D0102HRMZW6-224407",11759],
  ["D0102HGWKXG-682100",4712],
  ["D0102H2V6BY-183069",5192],
  ["D01027HX25W-351940",2312],
  ["D01027HHGCG-645458",5439],
  ["D0102HHVH7A-285520",3519],
  ["D0102HGKRVV-521042",6152],
  ["D0102HPBE86-428316",15992],
]);

async function backfillKnownDobaCosts(db) {
  const actor = "system-cost-reconcile";
  const createdAt = new Date().toISOString();
  for (const [sku,costCents] of KNOWN_DOBA_COST_REFERENCE) {
    const row = await db.prepare("SELECT id,sku,cost_cents,quantity_on_hand,quantity_reserved FROM eus_inventory_items WHERE sku=? COLLATE NOCASE LIMIT 1").bind(sku).first();
    if (!row || Number(row.cost_cents || 0) > 0) continue;
    const result = await db.prepare("UPDATE eus_inventory_items SET cost_cents=?,version=version+1,updated_at=?,updated_by=? WHERE id=? AND (cost_cents IS NULL OR cost_cents<=0)")
      .bind(costCents,createdAt,actor,row.id).run();
    if (!result?.meta?.changes) continue;
    const details = JSON.stringify({ changed:["costCents"], source:"2026-08-28 Doba supplier snapshot", note:"Last-known supplier cost backfill; recheck before supplier purchase" });
    await db.prepare("INSERT INTO eus_catalog_events (id,inventory_item_id,sku,action,details_json,admin_email,created_at) VALUES (?,?,?,?,?,?,?)")
      .bind(`cat_evt_${crypto.randomUUID()}`,row.id,sku,"supplier_cost_backfilled",details,actor,createdAt).run().catch(()=>{});
    await db.prepare("INSERT INTO eus_inventory_events (id,item_id,sku,action,quantity_before,quantity_after,reserved_before,reserved_after,details_json,admin_email,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
      .bind(`inv_evt_${crypto.randomUUID()}`,row.id,sku,"supplier_cost_backfilled",Number(row.quantity_on_hand||0),Number(row.quantity_on_hand||0),Number(row.quantity_reserved||0),Number(row.quantity_reserved||0),details,actor,createdAt).run().catch(()=>{});
  }
}
'''.strip()

catalog = replace_once(
    catalog,
    '];\n\nfunction baseStatus(publishStatus)',
    '];\n\n' + cost_block + '\n\nfunction baseStatus(publishStatus)',
    'catalog cost reference insertion',
)

catalog = replace_once(
    catalog,
    'async function seedKnown(db) {\n  const key = "catalog-manager-v1-known-mappings";',
    'async function seedKnown(db) {\n  await backfillKnownDobaCosts(db);\n  const key = "catalog-manager-v1-known-mappings";',
    'catalog backfill invocation',
)

upsert_old = '''async function upsert(db, raw, sourceHint, adminEmail, action = "upsert") {
  const item = normalizeRecord(raw, sourceHint);
  if (!item.sku) throw new Error("SKU is required");
  if (!item.title) throw new Error(`Product title is required for ${item.sku}`);
  let existing = item.id ? await getById(db,item.id) : null;
  if (!existing) existing = await getBySku(db,item.sku);'''
upsert_new = '''async function upsert(db, raw, sourceHint, adminEmail, action = "upsert") {
  const item = normalizeRecord(raw, sourceHint);
  if (!item.sku) throw new Error("SKU is required");
  if (!item.title) throw new Error(`Product title is required for ${item.sku}`);
  let existing = item.id ? await getById(db,item.id) : null;
  if (!existing) existing = await getBySku(db,item.sku);
  if (existing && raw.supplierCostCents === undefined && raw.costCents === undefined) item.supplierCostCents = Number(existing.cost_cents || 0);
  if (item.sourceType === "doba" && item.publishStatus === "published" && Number(item.supplierCostCents || 0) <= 0) {
    item.publishStatus = "hold";
    item.reviewState = [item.reviewState, "COST MISSING"].filter(Boolean).join(" · ");
    item.internalNotes = [item.internalNotes, "Doba product cannot publish with a missing/zero supplier cost."].filter(Boolean).join("\n");
  }'''
catalog = replace_once(catalog, upsert_old, upsert_new, 'catalog Doba zero-cost guard')

catalog_path.write_text(catalog, encoding="utf-8")


# -----------------------------------------------------------------------------
# Inventory direct-edit guard + clearer physical-cost label
# -----------------------------------------------------------------------------
worker_path = Path("site/worker-core.js")
worker = worker_path.read_text(encoding="utf-8")

create_anchor = '''      notes: inventoryString(body.notes, 4000),
    };
    try {'''
create_replacement = '''      notes: inventoryString(body.notes, 4000),
    };
    if (item.supplier.toLowerCase() === "doba" && item.status === "active" && item.costCents <= 0) {
      return jsonResponse({ error: "Active Doba items require a non-zero supplier cost. Save the supplier cost or place the item on hold/paused." }, 409);
    }
    try {'''
worker = replace_once(worker, create_anchor, create_replacement, 'inventory create cost guard')

patch_anchor = '''    if (!next.sku || !next.name) return jsonResponse({ error: "SKU and product name are required" }, 400);
    const changed = [];'''
patch_replacement = '''    if (!next.sku || !next.name) return jsonResponse({ error: "SKU and product name are required" }, 400);
    if (next.supplier.toLowerCase() === "doba" && next.status === "active" && next.costCents <= 0) {
      return jsonResponse({ error: "Active Doba items require a non-zero supplier cost. Save the supplier cost or place the item on hold/paused." }, 409);
    }
    const changed = [];'''
worker = replace_once(worker, patch_anchor, patch_replacement, 'inventory patch cost guard')
worker_path.write_text(worker, encoding="utf-8")

inventory_html_path = Path("site/admin-inventory.html")
inventory_html = inventory_html_path.read_text(encoding="utf-8")
inventory_html = replace_once(
    inventory_html,
    '<article><span>Inventory Cost</span><strong id="inventory-stat-value">—</strong><small>Available units × unit cost</small></article>',
    '<article><span>Physical Inventory Cost</span><strong id="inventory-stat-value">—</strong><small>Tracked available units × unit cost</small></article>',
    'inventory physical cost label',
)
inventory_html_path.write_text(inventory_html, encoding="utf-8")


# -----------------------------------------------------------------------------
# Hawaii logistics/economics hardening
# -----------------------------------------------------------------------------
hawaii_path = Path("site/hawaii-lithium-runtime.js")
hawaii = hawaii_path.read_text(encoding="utf-8")

route_anchor = '  if(!record.supplier_sku)blockers.push("Exact supplier SKU / variant is required");\n  if(record.hold)blockers.push("Product is on HOLD");'
route_replacement = '''  if(!record.supplier_sku)blockers.push("Exact supplier SKU / variant is required");
  const supplierCost = nullableInt(raw.supplierProductCostCents ?? record.supplier_price_cents);
  if(supplierCost===null||supplierCost<=0)blockers.push("Supplier product cost must be greater than $0 before route approval");
  const freightQuote = nullableInt(raw.quoteAmountCents);
  const oceanFreight = nullableInt(raw.oceanHawaiiFreightCents);
  if((freightQuote===null||freightQuote<=0)&&(oceanFreight===null||oceanFreight<=0))blockers.push("A non-zero Hawaii freight quote or ocean freight cost is required");
  if(record.hold)blockers.push("Product is on HOLD");'''
hawaii = replace_once(hawaii, route_anchor, route_replacement, 'Hawaii route cost/freight approval gate')

upsert_anchor = '''  const blockers=routeApprovalBlockers(record,{...raw,destination},eligibility);if(blockers.length)return json({error:"Route approval blocked",blockers},409);
  const costKeys=["supplierProductCostCents","supplierDomesticShippingCents","dgHazmatChargeCents","packagingSurchargeCents","mainlandInlandFreightCents","consolidationHandlingCents","oceanHawaiiFreightCents","terminalAccessorialCents","destinationHandlingCents","lastMileCents","paymentProcessingCents","otherDirectFulfillmentCents","otherShippingCents"];
  const costs=costKeys.map(k=>nullableInt(raw[k]));'''
upsert_replacement = '''  const effectiveSupplierCost=nullableInt(raw.supplierProductCostCents)??nullableInt(record.supplier_price_cents);
  const blockers=routeApprovalBlockers(record,{...raw,supplierProductCostCents:effectiveSupplierCost,destination},eligibility);if(blockers.length)return json({error:"Route approval blocked",blockers},409);
  const costKeys=["supplierProductCostCents","supplierDomesticShippingCents","dgHazmatChargeCents","packagingSurchargeCents","mainlandInlandFreightCents","consolidationHandlingCents","oceanHawaiiFreightCents","terminalAccessorialCents","destinationHandlingCents","lastMileCents","paymentProcessingCents","otherDirectFulfillmentCents","otherShippingCents"];
  const costs=costKeys.map(k=>k==="supplierProductCostCents"?effectiveSupplierCost:nullableInt(raw[k]));'''
hawaii = replace_once(hawaii, upsert_anchor, upsert_replacement, 'Hawaii effective supplier cost')

hawaii = replace_once(
    hawaii,
    'clean(raw.verifiedBy,180),nullableInt(raw.supplierProductCostCents),nullableInt(raw.supplierDomesticShippingCents)',
    'clean(raw.verifiedBy,180),effectiveSupplierCost,nullableInt(raw.supplierDomesticShippingCents)',
    'Hawaii destination persisted supplier cost',
)

batch_dest_anchor = '''if(!dest||dest.eligibility_state!=="APPROVED")blockers.push(prefix+"supported route is not approved");else{if(dest.carrier_acceptance_state!=="PASS")blockers.push(prefix+"provider compatibility is not accepted");if(dest.route_documents_status!=="VERIFIED")blockers.push(prefix+"route documents are incomplete");if(quoteExpired(dest.quote_expiration))blockers.push(prefix+"route quote is expired");if(dest.total_landed_cost_cents===null||dest.retail_price_cents===null)blockers.push(prefix+"route economics are incomplete");}'''
batch_dest_replacement = '''if(!dest||dest.eligibility_state!=="APPROVED")blockers.push(prefix+"supported route is not approved");else{if(dest.carrier_acceptance_state!=="PASS")blockers.push(prefix+"provider compatibility is not accepted");if(dest.route_documents_status!=="VERIFIED")blockers.push(prefix+"route documents are incomplete");if(quoteExpired(dest.quote_expiration))blockers.push(prefix+"route quote is expired");if(Number(dest.supplier_product_cost_cents||0)<=0||Number(dest.total_landed_cost_cents||0)<=0||dest.retail_price_cents===null)blockers.push(prefix+"route economics are incomplete or supplier cost is missing");}'''
hawaii = replace_once(hawaii, batch_dest_anchor, batch_dest_replacement, 'Hawaii batch route cost gate')

batch_sr_anchor = '''if(!sr){blockers.push(prefix+"exact shipping SKU record is missing");continue;}if(!sr.catalog_product_id||!sr.supplier_sku)blockers.push(prefix+"exact Catalog/supplier identity is incomplete");if(sr.hold)blockers.push(prefix+"product is on HOLD");'''
batch_sr_replacement = '''if(!sr){blockers.push(prefix+"exact shipping SKU record is missing");continue;}if(!sr.catalog_product_id||!sr.supplier_sku)blockers.push(prefix+"exact Catalog/supplier identity is incomplete");const catalogProduct=await getCatalogProduct(db,sr.catalog_product_id,o.sku);if(!catalogProduct||Number(catalogProduct.cost_cents||0)<=0)blockers.push(prefix+"catalog supplier cost is missing or zero");if(sr.hold)blockers.push(prefix+"product is on HOLD");'''
hawaii = replace_once(hawaii, batch_sr_anchor, batch_sr_replacement, 'Hawaii batch catalog cost gate')

metrics_anchor = '''const rows=orders.filter(o=>o.batch_id===b.batch_id);let units=0,merchandise=0,supplier=0,weight=0,volume=0,blocked=0,pendingConfirm=0,allocated=0,ready=0;
    for(const o of rows){const q=Number(o.quantity||0);units+=q;merchandise+=Number(o.product_subtotal_cents||0);allocated+=Number(o.allocated_freight_cents||0);const p=productBySku.get(String(o.sku||"").toLowerCase());if(p)supplier+=Number(p.cost_cents||0)*q;'''
metrics_replacement = '''const rows=orders.filter(o=>o.batch_id===b.batch_id);let units=0,merchandise=0,supplier=0,weight=0,volume=0,blocked=0,pendingConfirm=0,allocated=0,ready=0,missingCost=0;
    for(const o of rows){const q=Number(o.quantity||0);units+=q;merchandise+=Number(o.product_subtotal_cents||0);allocated+=Number(o.allocated_freight_cents||0);const p=productBySku.get(String(o.sku||"").toLowerCase());if(p&&Number(p.cost_cents||0)>0)supplier+=Number(p.cost_cents||0)*q;else missingCost+=1;'''
hawaii = replace_once(hawaii, metrics_anchor, metrics_replacement, 'Hawaii batch metric missing cost tracking')

metrics_calc_anchor = '''const target=Number(b.target_units||0);const fill=target>0?Math.min(999,Math.round((units/target)*1000)/10):null;const freight=b.freight_accessorial_cost_cents??b.quote_amount_cents??allocated??0;const contribution=merchandise-supplier-Number(freight||0);
    return{batchId:b.batch_id,reservations:rows.length,units,batchReadyLines:ready,estimatedGrossWeightLb:Math.round(weight*100)/100,estimatedVolumeCuft:Math.round(volume*100)/100,customerMerchandiseValueCents:merchandise,currentFreightQuoteCents:b.quote_amount_cents,estimatedFreightPerOrderCents:rows.length?Math.round(Number(freight||0)/rows.length):null,estimatedLandedCostCents:supplier+Number(freight||0),estimatedGrossContributionCents:contribution,targetUnits:b.target_units,batchFillPercent:fill,remainingTargetUnits:target>0?Math.max(0,target-units):null,pendingCustomerConfirmations:pendingConfirm,blockedOrders:blocked};'''
metrics_calc_replacement = '''const target=Number(b.target_units||0);const fill=target>0?Math.min(999,Math.round((units/target)*1000)/10):null;const freight=b.freight_accessorial_cost_cents??b.quote_amount_cents??allocated??0;const costDataComplete=missingCost===0&&Number(freight||0)>0;const contribution=costDataComplete?merchandise-supplier-Number(freight||0):null;
    return{batchId:b.batch_id,reservations:rows.length,units,batchReadyLines:ready,costDataComplete,missingCostLines:missingCost,estimatedGrossWeightLb:Math.round(weight*100)/100,estimatedVolumeCuft:Math.round(volume*100)/100,customerMerchandiseValueCents:merchandise,currentFreightQuoteCents:b.quote_amount_cents,estimatedFreightPerOrderCents:rows.length&&Number(freight||0)>0?Math.round(Number(freight||0)/rows.length):null,estimatedLandedCostCents:costDataComplete?supplier+Number(freight||0):null,estimatedGrossContributionCents:contribution,targetUnits:b.target_units,batchFillPercent:fill,remainingTargetUnits:target>0?Math.max(0,target-units):null,pendingCustomerConfirmations:pendingConfirm,blockedOrders:blocked};'''
hawaii = replace_once(hawaii, metrics_calc_anchor, metrics_calc_replacement, 'Hawaii batch economics null-on-missing-cost')

hawaii_path.write_text(hawaii, encoding="utf-8")


# -----------------------------------------------------------------------------
# Static validation
# -----------------------------------------------------------------------------
checks = {
    catalog_path: ["KNOWN_DOBA_COST_REFERENCE", "backfillKnownDobaCosts", "COST MISSING"],
    worker_path: ["Active Doba items require a non-zero supplier cost"],
    inventory_html_path: ["Physical Inventory Cost", "Tracked available units × unit cost"],
    hawaii_path: ["Supplier product cost must be greater than $0 before route approval", "catalog supplier cost is missing or zero", "costDataComplete"],
}
for path, markers in checks.items():
    body = path.read_text(encoding="utf-8")
    for marker in markers:
        if marker not in body:
            raise SystemExit(f"Validation marker missing from {path}: {marker}")

print("Cost/logistics patch applied successfully")
