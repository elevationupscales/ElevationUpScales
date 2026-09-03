from pathlib import Path


def replace_once(text, old, new, label):
    if old not in text:
        raise SystemExit(f"{label} anchor missing")
    return text.replace(old, new, 1)

p=Path('site/doba-csv-sync-runtime.js')
s=p.read_text()
old='rowIndex:index+2,spuNo:cellBy(record,map,"SPU NO","SPU No.","SPU"),itemNo,supplierSku,title,brand:cellBy(record,map,"Brand","Brand Name"),category,sourceUrl:cellBy(record,map,"URL","Product URL"),'
new='rowIndex:index+2,spuNo:cellBy(record,map,"SPU NO","SPU No.","SPU"),itemNo,supplierSku,title,upstreamSupplier:cellBy(record,map,"Supplier","Supplier Name","Vendor"),brand:cellBy(record,map,"Brand","Brand Name"),category,sourceUrl:cellBy(record,map,"URL","Product URL"),'
s=replace_once(s,old,new,'parse supplier field')
old='spuNo:row.spuNo,itemNo:row.itemNo,supplierSku:row.supplierSku,productName:row.title,brand:row.brand,category:row.category,sourceUrl:row.sourceUrl,'
new='spuNo:row.spuNo,itemNo:row.itemNo,supplierSku:row.supplierSku,productName:row.title,upstreamSupplier:row.upstreamSupplier,brand:row.brand,category:row.category,sourceUrl:row.sourceUrl,'
s=replace_once(s,old,new,'compact supplier field')
p.write_text(s)

p=Path('site/commerce-pricing-runtime.js')
s=p.read_text()
old='function sourceView(row){if(!row)return null;return{itemNo:clean(row.item_no,180),supplierSku:clean(row.supplier_sku,180),state:clean(row.source_state,80)||"UNKNOWN",baseCostCents:row.base_cost_cents===null||row.base_cost_cents===undefined?null:int(row.base_cost_cents,0),exportPriceCents:row.export_price_cents===null||row.export_price_cents===undefined?null:int(row.export_price_cents,0),supplierStock:row.supplier_stock===null||row.supplier_stock===undefined?null:int(row.supplier_stock,0),shippingMethod:clean(row.shipping_method,180),estimatedShippingCents:row.estimated_shipping_cents===null||row.estimated_shipping_cents===undefined?null:int(row.estimated_shipping_cents,0),lastObservedAt:clean(row.last_observed_at,80)};}'
new='function sourceView(row){if(!row)return null;const source=safeJson(row.source_json,{});return{itemNo:clean(row.item_no,180),supplierSku:clean(row.supplier_sku,180),upstreamSupplier:clean(source.upstreamSupplier,180),brand:clean(source.brand,180),state:clean(row.source_state,80)||"UNKNOWN",baseCostCents:row.base_cost_cents===null||row.base_cost_cents===undefined?null:int(row.base_cost_cents,0),exportPriceCents:row.export_price_cents===null||row.export_price_cents===undefined?null:int(row.export_price_cents,0),supplierStock:row.supplier_stock===null||row.supplier_stock===undefined?null:int(row.supplier_stock,0),shippingMethod:clean(row.shipping_method,180),estimatedShippingCents:row.estimated_shipping_cents===null||row.estimated_shipping_cents===undefined?null:int(row.estimated_shipping_cents,0),lastObservedAt:clean(row.last_observed_at,80)};}'
s=replace_once(s,old,new,'source view')
old='SELECT item_no,supplier_sku,catalog_product_id,base_cost_cents,export_price_cents,supplier_stock,shipping_method,estimated_shipping_cents,source_state,last_observed_at FROM eus_doba_source_state ORDER BY last_observed_at DESC'
new='SELECT item_no,supplier_sku,catalog_product_id,base_cost_cents,export_price_cents,supplier_stock,shipping_method,estimated_shipping_cents,source_json,source_state,last_observed_at FROM eus_doba_source_state ORDER BY last_observed_at DESC'
s=replace_once(s,old,new,'source query')
p.write_text(s)

p=Path('site/admin-commerce-pricing.js')
s=p.read_text()
old='return `<tr><td><div class="pricing-product"><strong>${esc(p.title)}</strong><code>${esc(p.sku)}</code><small>${esc(p.storeSection||p.category||"")}</small></div></td><td><strong>${esc(supplier)}</strong><small>${esc(p.supplierProductId||"")}</small></td><td>${costCell(p)}</td>'
new='const upstream=text(src?.upstreamSupplier),brand=text(src?.brand);return `<tr><td><div class="pricing-product"><strong>${esc(p.title)}</strong><code>${esc(p.sku)}</code><small>${esc(p.storeSection||p.category||"")}</small></div></td><td><strong>${esc(supplier)}</strong>${upstream?`<small>Upstream: ${esc(upstream)}</small>`:""}${brand?`<small>Brand: ${esc(brand)}</small>`:""}<small>${esc(p.supplierProductId||"")}</small></td><td>${costCell(p)}</td>'
s=replace_once(s,old,new,'supplier display')
p.write_text(s)
