import json, re

inv=json.load(open('/tmp/admin-usability/inventory.json'))
cat=json.load(open('/tmp/admin-usability/catalog.json'))
doba=json.load(open('/tmp/admin-usability/doba-csv-sync.json'))
sync=json.load(open('/tmp/admin-usability/sync.json'))
items=inv.get('items') or []
products=cat.get('products') or []
allowed=['Lithium Batteries','Solar & Off-Grid','RV Essentials & Water','Camping & Shelter','Automotive, ATV & Towing','Tools & Workshop','Outdoor Lighting & Power','Travel & Organization','Apparel','Other / Review']

def txt(v): return str(v or '').strip()
def clean_title(v):
    s=re.sub(r'\s+',' ',txt(v))
    if len(s)<=92:return s
    if re.search(r'lifepo4|lithium iron phosphate|lithium battery',s,re.I):
        vm=re.search(r'\b(12(?:\.8)?|24|25\.6|36|48|51\.2)\s*V\b',s,re.I)
        am=re.search(r'\b(\d{2,4}(?:\.\d+)?)\s*Ah\b',s,re.I)
        bm=re.search(r'\b(\d{2,4})\s*A\s*BMS\b',s,re.I)
        if vm and am:
            chem='LiFePO4' if re.search('lifepo4',s,re.I) else ('Lithium Iron Phosphate' if re.search('lithium iron phosphate',s,re.I) else 'Lithium')
            return f"{vm.group(0).replace(' ','')} {am.group(0).replace(' ','')} {chem} Battery"+(f" — {bm.group(1)}A BMS" if bm else '')
    first=re.split(r'\s*[|;]\s*|\s+-\s+|\s*,\s*(?=[A-Z])',s)[0]
    if 35<=len(first)<=100:return first
    return s[:88].rsplit(' ',1)[0].rstrip(',-–—: ')+'…'
def catnorm(p):
    section=txt(p.get('storeSection')).lower(); hay=' '.join(map(txt,[p.get('category'),p.get('title'),p.get('description')])).lower()
    if section=='apparel':return 'Apparel'
    if section=='lithium-batteries':return 'Lithium Batteries'
    tests=[('Apparel',r'\b(apparel|shirt|hoodie|hat|tee|sweatshirt)\b'),('Lithium Batteries',r'\b(lifepo4|lithium battery|battery bank)\b'),('Solar & Off-Grid',r'\b(solar|mppt|charge controller|photovoltaic|off[- ]?grid|inverter)\b'),('RV Essentials & Water',r'\b(rv|water heater|water pump|fresh water|holding tank|toilet|tire pressure)\b'),('Camping & Shelter',r'\b(camping|camp|tent|gazebo|shelter|canopy|sleeping)\b'),('Automotive, ATV & Towing',r'\b(atv|automotive|vehicle|trailer|towing|tow|hitch|truck|car )\b'),('Tools & Workshop',r'\b(tool|socket|plasma cutter|recovery tank|workshop|wrench|drill|fuse)\b'),('Outdoor Lighting & Power',r'\b(light|lantern|flashlight|power bank|portable power station|generator)\b'),('Travel & Organization',r'\b(organizer|travel|laptop desk|storage bag|seat gap|cup holder)\b')]
    for label,pat in tests:
        if re.search(pat,hay):return label
    return txt(p.get('category')) if txt(p.get('category')) in allowed else 'Other / Review'
def family(p):
    t=clean_title(p.get('title')).lower()
    t=re.sub(r'\b(black|white|blue|green|red|gray|grey|orange|yellow|pink|silver)\b','',t)
    return catnorm(p)+'|'+re.sub(r'\s+',' ',t).strip()

buckets={}
for p in products:buckets.setdefault(family(p),[]).append(p)
variant=sum(1 for v in buckets.values() if len(v)>1 and len({txt(x.get('supplierSku') or x.get('sku')) for x in v})>1)
duplicate=sum(1 for v in buckets.values() if len(v)>1 and len({txt(x.get('primaryImage')) for x in v if txt(x.get('primaryImage'))})<=1)
sc=sync.get('counts') or {}
publish=[txt(p.get('publishStatus')).lower() for p in products]
supplier=[i for i in items if txt(i.get('fulfillmentMode'))!='tracked']
active=[i for i in items if txt(i.get('status'))=='active']
bysku={txt(p.get('sku')).lower():p for p in products}
mapped_all=[bysku.get(txt(i.get('sku')).lower()) for i in supplier]
mapped_all=[p for p in mapped_all if p]
stocks=[p.get('supplierStock') for p in mapped_all if p.get('supplierStock') is not None]
result={
 'totalSupplierSourceRecords':len(items),'activeSupplierInventoryRecords':len(active),'supplierManagedRecords':len(supplier),
 'supplierAvailable':sum(1 for x in stocks if int(x)>10),'supplierLowStock':sum(1 for x in stocks if 0<int(x)<=10),'supplierOutOfStock':sum(1 for x in stocks if int(x)==0),
 'physicalOnHand':sum(int(i.get('quantityOnHand') or 0) for i in active if txt(i.get('fulfillmentMode'))=='tracked'),
 'catalogProducts':len(products),'distinctMerchandisingProducts':len(buckets),'variantFamilies':variant,'duplicateReviewGroups':duplicate,
 'live':int(sc.get('live') or publish.count('published')),'ready':int(sc.get('ready') or 0),'draft':int(sc.get('draft') or publish.count('draft')),'hold':int(sc.get('hold') or publish.count('hold')),
 'outOfStock':sum(1 for p in products if p.get('supplierStock') is not None and int(p.get('supplierStock') or 0)==0),'syncError':int(sc.get('syncError') or 0),
 'missingThumbnails':sum(1 for p in products if not txt(p.get('primaryImage'))),'cleanTitleTransformCandidates':sum(1 for p in products if clean_title(p.get('title'))!=txt(p.get('title'))),
 'categoryNormalizationCandidates':sum(1 for p in products if catnorm(p)!=txt(p.get('category'))),
 'dobaSourceRows':doba.get('sourceCount') or doba.get('sourceRows') or doba.get('sourceRecordCount') or (doba.get('summary') or {}).get('sourceCount'),
 'zeroStockCatalogId':next((p.get('id') for p in products if p.get('supplierStock') is not None and int(p.get('supplierStock') or 0)==0),None),
 'catalogCounts':cat.get('counts') or {},'syncCounts':sc,
}
json.dump(result,open('/tmp/admin-usability/audit.json','w'),indent=2)
print(json.dumps(result,indent=2))
