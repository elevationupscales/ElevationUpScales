import json, math, sys
from pathlib import Path

def load(path):
    with open(path,encoding='utf-8') as f:return json.load(f)

audit=load('/tmp/cost-audit/lithium-pricing-audit-sanitized.json')
catalog=load('/tmp/catalog.json')
featured=load('/tmp/featured.json')
rows=audit.get('products') or []
products=catalog.get('products') or []
assert len(rows)==38, f'authoritative audit count {len(rows)}'
assert audit.get('summary',{}).get('missingCost')==0, audit.get('summary')
assert audit.get('summary',{}).get('costSourceMismatch')==0, audit.get('summary')
assert len(products)==38, f'public Lithium count {len(products)}'
by_id={str(p.get('id')):p for p in products}
by_sku={str(p.get('sku','')).lower():p for p in products}
fail=[]
for row in rows:
    p=by_id.get(str(row.get('id'))) or by_sku.get(str(row.get('sku','')).lower())
    if not p:
        fail.append((row.get('sku'),'missing-public-product'));continue
    cost=int(row.get('authoritativeCostCents') or 0)
    price=int(p.get('priceCents') or 0)
    floor=math.ceil(cost*1.60)
    promo_floor=math.ceil(cost*1.20)
    while floor-round(floor*.25)<promo_floor: floor+=1
    promo=price-round(price*.25)
    if price<floor or promo<promo_floor:
        fail.append((row.get('sku'),cost,price,floor,promo,promo_floor))
if fail: raise SystemExit(f'Lithium protected-floor failures: {fail[:8]}')
fl=featured.get('lithium') or featured.get('lithiumProducts') or []
fr=featured.get('rv') or featured.get('rvProducts') or []
if not fl and isinstance(featured.get('products'),dict):
    fl=featured['products'].get('lithium') or []
    fr=featured['products'].get('rv') or []
assert len(fl)==4 and len(fr)==4, f'featured counts {len(fl)}+{len(fr)}'
battery=next((p for p in products if '100ah' in str(p.get('title','')).replace(' ','').lower()),None)
if not battery:
    battery=next((p for p in products if any(x in str(p.get('title','')).lower() for x in ['lifepo4','lithium battery'])),None)
assert battery, 'no battery selected'
Path('/tmp/battery.json').write_text(json.dumps(battery))
print(json.dumps({'lithiumCount':len(products),'featuredLithium':len(fl),'featuredRv':len(fr),'protectedPricingPass':len(rows),'batteryId':battery.get('id'),'batteryTitle':battery.get('title')},indent=2))
