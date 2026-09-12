from pathlib import Path

catalog_path = Path('site/catalog-admin-runtime.js')
catalog = catalog_path.read_text()

old_catalog_tail = '''    internalNotes: clean(row.notes,4000), quantityOnHand: int(row.quantity_on_hand,0), quantityReserved: int(row.quantity_reserved,0), reorderPoint: int(row.reorder_point,0), version: int(row.version,1),
    createdBy: clean(row.created_by,180), updatedBy: clean(row.catalog_updated_by || row.updated_by,180), createdAt: clean(row.catalog_created_at || row.created_at,80), updatedAt: clean(row.catalog_updated_at || row.updated_at,80)
  };'''
new_catalog_tail = '''    internalNotes: clean(row.notes,4000), quantityOnHand: int(row.quantity_on_hand,0), quantityReserved: int(row.quantity_reserved,0), reorderPoint: int(row.reorder_point,0), version: int(row.version,1),
    dobaSourceStock: row.doba_source_stock === null || row.doba_source_stock === undefined ? null : int(row.doba_source_stock,0),
    dobaSourceState: clean(row.doba_source_state,80), dobaSourceObservedAt: clean(row.doba_source_observed_at,80),
    createdBy: clean(row.created_by,180), updatedBy: clean(row.catalog_updated_by || row.updated_by,180), createdAt: clean(row.catalog_created_at || row.created_at,80), updatedAt: clean(row.catalog_updated_at || row.updated_at,80)
  };'''
if catalog.count(old_catalog_tail) != 1:
    raise SystemExit(f'catalogRow tail match count {catalog.count(old_catalog_tail)}')
catalog = catalog.replace(old_catalog_tail, new_catalog_tail, 1)

old_query = '''  const query = `SELECT i.*,m.source_type,m.description,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.images_json,m.ebay_item_id,m.fourthwall_product_id,m.store_section,m.publish_status,m.review_state,m.created_by,m.updated_by AS catalog_updated_by,m.created_at AS catalog_created_at,m.updated_at AS catalog_updated_at FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id ${where} ORDER BY m.updated_at DESC LIMIT 200`;
  const result = allowedSection ? await db.prepare(query).bind(allowedSection).all() : await db.prepare(query).all();'''
new_query = '''  const selectBase = `SELECT i.*,m.source_type,m.description,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.images_json,m.ebay_item_id,m.fourthwall_product_id,m.store_section,m.publish_status,m.review_state,m.created_by,m.updated_by AS catalog_updated_by,m.created_at AS catalog_created_at,m.updated_at AS catalog_updated_at`;
  const fallbackQuery = `${selectBase} FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id ${where} ORDER BY m.updated_at DESC LIMIT 200`;
  const sourceAwareQuery = `${selectBase},s.supplier_stock AS doba_source_stock,s.source_state AS doba_source_state,s.last_observed_at AS doba_source_observed_at FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id LEFT JOIN eus_doba_source_state s ON lower(s.item_no)=lower(i.supplier_product_id) AND lower(s.supplier_sku)=lower(m.supplier_sku) ${where} ORDER BY m.updated_at DESC LIMIT 200`;
  let result;
  try { result = allowedSection ? await db.prepare(sourceAwareQuery).bind(allowedSection).all() : await db.prepare(sourceAwareQuery).all(); }
  catch (error) {
    if (!/no such table[^a-z0-9]*eus_doba_source_state/i.test(String(error?.message || error))) throw error;
    result = allowedSection ? await db.prepare(fallbackQuery).bind(allowedSection).all() : await db.prepare(fallbackQuery).all();
  }'''
if catalog.count(old_query) != 1:
    raise SystemExit(f'public query match count {catalog.count(old_query)}')
catalog = catalog.replace(old_query, new_query, 1)

old_map = '''  const products = (result.results || []).map(catalogRow).map((p) => {
    const priced = pricingForProduct(p, promotionConfig);
    return {
      id: p.id, sku: p.sku, title: p.title, description: p.description, category: p.category,
      priceCents: priced.priceCents,
      availabilityStatus: (p.supplierStock === null || p.supplierStock === undefined || String(p.supplierStock).trim() === "") ? "check" : (Number(p.supplierStock) > 0 ? "available" : "unavailable"),'''
new_map = '''  const products = (result.results || []).map(catalogRow).map((p) => {
    const priced = pricingForProduct(p, promotionConfig);
    const source = clean(p.sourceType,40).toLowerCase();
    const dobaSourceState = clean(p.dobaSourceState,80).toUpperCase();
    const dobaSourceCurrent = source === "doba" && dobaSourceState === "CURRENT";
    const dobaAvailability = source === "doba"
      ? (!dobaSourceCurrent || p.dobaSourceStock === null ? "check" : (Number(p.dobaSourceStock) > 0 ? "available" : "unavailable"))
      : "";
    const availabilityStatus = dobaAvailability || ((p.supplierStock === null || p.supplierStock === undefined || String(p.supplierStock).trim() === "") ? "check" : (Number(p.supplierStock) > 0 ? "available" : "unavailable"));
    return {
      id: p.id, sku: p.sku, title: p.title, description: p.description, category: p.category,
      priceCents: priced.priceCents,
      availabilityStatus,'''
if catalog.count(old_map) != 1:
    raise SystemExit(f'public map match count {catalog.count(old_map)}')
catalog = catalog.replace(old_map, new_map, 1)

old_purchase = '''if(source==="doba" && clean(p.publishStatus,30).toLowerCase()==="published" && clean(p.shippingStatus,30).toLowerCase()==="verified" && Number(priced.priceCents)>0) return `/checkout/?source=${section}&id=${encodeURIComponent(p.id)}&name=${encodeURIComponent(p.title)}`;'''
new_purchase = '''if(source==="doba" && availabilityStatus==="available" && clean(p.publishStatus,30).toLowerCase()==="published" && clean(p.shippingStatus,30).toLowerCase()==="verified" && Number(priced.priceCents)>0) return `/checkout/?source=${section}&id=${encodeURIComponent(p.id)}&name=${encodeURIComponent(p.title)}`;'''
if catalog.count(old_purchase) != 1:
    raise SystemExit(f'purchase gate match count {catalog.count(old_purchase)}')
catalog = catalog.replace(old_purchase, new_purchase, 1)
catalog_path.write_text(catalog)

store_path = Path('site/universal-store.js')
store = store_path.read_text()
old_backorder = '''    if(/prepurchase|preorder|backorder/.test(mode))return{code:"hold",label:p.commerceLabel||"Confirm Availability",buy:eligible&&price>0};
    if(!price&&!p.sokProduct)return{code:"hold",label:"Confirm Availability",buy:false};'''
new_backorder = '''    if(/prepurchase|preorder|backorder/.test(mode))return{code:"hold",label:p.commerceLabel||"Confirm Availability",buy:eligible&&price>0};
    if(mode==="check")return{code:"hold",label:"Confirm Availability",buy:false};
    if(!price&&!p.sokProduct)return{code:"hold",label:"Confirm Availability",buy:false};'''
if store.count(old_backorder) != 1:
    raise SystemExit(f'universal check-state insertion match count {store.count(old_backorder)}')
store = store.replace(old_backorder, new_backorder, 1)
old_doba = '''    if(/doba/.test(supplier)){if(!has||!Number.isFinite(stock))return{code:"hold",label:"Confirm Availability",buy:false};if(shipping&&shipping!=="verified")return{code:"hold",label:shipping==="quote_required"?"Shipping Quote Required":"Confirm Availability",buy:false};return{code:"buy",label:"Supplier Stock Available",buy:price>0};}'''
new_doba = '''    if(/doba/.test(supplier)){if(mode!=="available")return{code:"hold",label:"Confirm Availability",buy:false};if(shipping&&shipping!=="verified")return{code:"hold",label:shipping==="quote_required"?"Shipping Quote Required":"Confirm Availability",buy:false};return{code:"buy",label:"Supplier Stock Available",buy:price>0};}'''
if store.count(old_doba) != 1:
    raise SystemExit(f'Doba sale gate match count {store.count(old_doba)}')
store = store.replace(old_doba, new_doba, 1)
store_path.write_text(store)

test_path = Path('tests/doba-public-availability.test.cjs')
test_path.write_text(r'''const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (path) => fs.readFileSync(path, 'utf8');

test('public Doba availability is projected from current source-state without exposing supplier economics', () => {
  const runtime = read('site/catalog-admin-runtime.js');
  assert.match(runtime, /LEFT JOIN eus_doba_source_state s ON/);
  assert.match(runtime, /doba_source_stock/);
  assert.match(runtime, /doba_source_state/);
  assert.match(runtime, /dobaSourceState === "CURRENT"/);
  assert.match(runtime, /availabilityStatus==="available"/);
  assert.doesNotMatch(runtime, /supplierCostCents:\s*p\.supplierCostCents/);
});

test('universal store holds unknown Doba state and buys only normalized available state', () => {
  const runtime = read('site/universal-store.js');
  assert.match(runtime, /if\(mode==="check"\)return\{code:"hold",label:"Confirm Availability",buy:false\}/);
  assert.match(runtime, /if\(\/doba\/\.test\(supplier\)\)\{if\(mode!=="available"\)/);
  assert.doesNotMatch(runtime, /if\(!has\|\|!Number\.isFinite\(stock\)\)return\{code:"hold"/);
});
''')
