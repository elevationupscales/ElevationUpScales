#!/usr/bin/env python3
import json, os, urllib.request, urllib.error

BASE=os.environ['BASE'].rstrip('/')
TOKEN=os.environ.get('EUS_ONE_RUN_NONCE','')
MODE=os.environ.get('MODE','qualify')
OUT='/tmp/kingboss-live.json'
IDS=set('''cat-5ad42092-f1f9-4777-ad3c-54ece4f89d74 cat-0e47924f-dbbb-4a17-8ed0-b1f337aeb87c cat-efc4e7d9-aa7e-4319-9b9d-a20c1a1521cd cat-d051e21d-5101-45db-98db-9d048f797613 cat-87fc0fec-edc2-464c-99c3-6e0edc9067d3 cat-4549fb51-f0f4-448e-86d2-19e9e6675ad8 cat-ced9cfa3-0343-4f26-90d5-d8054af3c446 cat-e91de8a6-3e69-45b3-b749-605befbdb268 cat-8c48e9e1-69f0-47a7-8a8f-85787637613e cat-14a69c9b-5bfd-4474-b88b-b87c63ac3638 cat-d134ecdf-403c-4027-8212-0c5fbad26c1f cat-f2d15722-2248-4155-acce-5e6354cc2641 cat-ea02ed7c-1be4-49b9-b7c5-956e2b2be272 cat-7aa76941-d68e-4a5a-a637-62200fec3b2d cat-87407e02-20e3-4cd3-a1e9-8538add18a37 cat-a049195e-a035-4b75-a5ca-8b342273f952 cat-b7fe4f9e-b922-42af-9d2d-4921ac8600f1 cat-f6c09a59-b485-47b3-b3e4-9863d007622f cat-09479302-7993-4e32-a22c-918833298e4a cat-24d978f3-8853-4582-bcac-4ae0bbdf8ab4 cat-d133f01f-229f-4d3e-93e1-ad826bbf7537 cat-0bc1b4e8-a0ef-4327-a74f-ea815dbd89dc cat-c124cb4f-b336-48e9-a252-00f420a7087d cat-3c50a359-e302-404d-9aee-75ad2b6e0cdd cat-f65d742c-0502-4f3a-b8be-98c014723871 cat-5f1f5ac7-7482-480a-9383-df90d8a64c11 cat-2f78da39-1d71-4c8b-80ab-9d747820551a cat-aa4ebfeb-ec3b-4d27-b629-64fb0f9ec56b cat-916e5182-89b2-4e89-af07-01a95d81a6c7 cat-0c0b0387-62de-42e8-bf94-dbbc15f49d0c cat-c81224a6-566d-4b56-838c-3047062d8b01 cat-91ee487c-ce5b-4fd8-9ca7-4fb00528f113 cat-1b9fa5a8-810f-49ff-b75f-ced91037e641 cat-926afe97-9468-48bf-9af7-850518b752c6 cat-be6f2f23-1727-43b6-86ba-ffafe03c2484 cat-edb05fb0-92b7-448b-bd90-817a8ddc03a2 cat-3eb7c11f-9b4c-4952-8a21-de0e0d34754c cat-336cf814-be3f-49fd-b574-0d0a39ac7312 cat-5104ec49-cf2f-4d6c-beb4-52a0b6f0186c cat-ba15b95a-ab9c-49ba-be75-fc1b325f451e cat-66afeb4e-432a-4a25-8fb8-2edb10cb1c22 cat-6fc1f5b7-41c3-44d9-a378-1075bd9f2eab cat-01e78438-5fb8-4e0d-aaab-ffbe86f5cf77'''.split())

def call(path,method='GET',data=None,auth=False,raw=False):
    headers={'Accept':'application/json','User-Agent':'Mozilla/5.0 ElevationUpScales-LiveShop','Origin':BASE}
    if auth: headers['X-EUS-One-Run']=TOKEN
    body=None
    if data is not None:
        headers['Content-Type']='application/json'; body=json.dumps(data).encode()
    req=urllib.request.Request(BASE+path,data=body,headers=headers,method=method)
    try:
        with urllib.request.urlopen(req,timeout=90) as resp:
            payload=resp.read()
            if raw: return resp.status,payload
            return resp.status,json.loads(payload.decode() or '{}')
    except urllib.error.HTTPError as e:
        payload=e.read()
        if raw: return e.code,payload
        try: obj=json.loads(payload.decode() or '{}')
        except: obj={'error':payload.decode(errors='replace')[:500]}
        return e.code,obj

def shipping(state='CO',postal='80203'):
    return {'fullName':'Elevation Verification','address1':'200 E Colfax Ave','city':'Denver','state':state,'postalCode':postal,'countryCode':'US'}

def quote(pid,state='CO',postal='80203'):
    return call('/api/store-checkout/quote','POST',{'source':'rv','id':pid,'quantity':1,'shipping':shipping(state,postal)})

def save(product):
    return call('/api/admin/catalog','POST',{'product':product,'sourceType':product.get('sourceType','doba')},True)

if MODE=='qualify':
    status,snap=call('/api/admin/catalog',auth=True)
    assert status==200,(status,snap)
    batch=[p for p in snap.get('products',[]) if p.get('id') in IDS]
    assert len(batch)==43,len(batch)
    _,before=call('/api/store/catalog?section=lithium-batteries')
    result={'reviewed':43,'inStock':0,'zeroStock':0,'prePublicCount':before.get('count',len(before.get('products',[]))),'published':[],'holds':[],'errors':[]}
    for p in batch:
        stock=int(p.get('supplierStock') or 0); cost=int(p.get('supplierCostCents') or 0)
        if stock<=0:
            result['zeroStock']+=1
            result['holds'].append({'id':p['id'],'sku':p.get('sku'),'title':p.get('title'),'blocker':'SUPPLIER OUT OF STOCK'})
            continue
        result['inStock']+=1
        blockers=[]
        if cost<=0: blockers.append('supplier cost missing')
        if not str(p.get('primaryImage') or '').startswith('http'): blockers.append('primary image missing')
        if len(str(p.get('description') or '').strip())<20: blockers.append('description incomplete')
        if not p.get('supplierSku'): blockers.append('supplier SKU missing')
        if blockers:
            q=dict(p); q.update({'publishStatus':'hold','shippingStatus':'quote_required','reviewState':'KINGBOSS: '+', '.join(blockers).upper()}); save(q)
            result['holds'].append({'id':p['id'],'sku':p.get('sku'),'title':p.get('title'),'blocker':'; '.join(blockers)})
            continue
        price=int(p.get('priceCents') or 0) or round(cost*1.25)
        q=dict(p); q.update({'priceCents':price,'storeSection':'lithium-batteries','shippingStatus':'verified','publishStatus':'published','reviewState':'KINGBOSS: LOWER 48 QUALIFIED — ALASKA/HAWAII EXCLUDED'})
        s,b=save(q)
        if s!=200:
            result['errors'].append({'id':p['id'],'error':b}); continue
        s2,b2=quote(p['id'])
        if s2!=200 or int(b2.get('unitPriceCents') or 0)<=0:
            q.update({'publishStatus':'hold','shippingStatus':'quote_required','reviewState':'KINGBOSS: LOWER-48 CHECKOUT BLOCKER — '+str(b2.get('error') or 'quote failed')[:250]}); save(q)
            result['holds'].append({'id':p['id'],'sku':p.get('sku'),'title':p.get('title'),'blocker':str(b2.get('error') or f'quote HTTP {s2}')[:250]})
        else:
            result['published'].append({'id':p['id'],'sku':p.get('sku'),'title':p.get('title'),'priceCents':price,'stock':stock,'image':p.get('primaryImage'),'quote':b2})
    _,after=call('/api/store/catalog?section=lithium-batteries')
    pubids={p.get('id') for p in after.get('products',[])}
    assert all(p['id'] in pubids for p in result['published'])
    result['publicCount']=after.get('count',len(after.get('products',[])))
    result['kingbossPublicCount']=sum(1 for p in after.get('products',[]) if p.get('id') in IDS)
    result['priceQualified']=len(result['published']); result['shippingQualified']=len(result['published'])
    assert result['kingbossPublicCount']==len(result['published'])
    assert result['kingbossPublicCount']>0,'No Kingboss products passed lower-48 qualification'
    json.dump(result,open(OUT,'w'),indent=2)
    print(json.dumps({k:v for k,v in result.items() if k not in ('published','holds')},indent=2))

elif MODE=='verify':
    r=json.load(open(OUT))
    for path in ['/lithium-batteries','/rv-store','/hawaii-lithium-batteries','/checkout/','/admin','/admin-catalog','/admin-inventory','/admin-lithium-shipping','/admin-store-orders','/start-a-project','/solar-project','/marketplace']:
        s,_=call(path,raw=True); assert s==200,(path,s)
    s,cat=call('/api/store/catalog?section=lithium-batteries'); assert s==200
    ids={p['id'] for p in r['published']}; live=[p for p in cat.get('products',[]) if p.get('id') in ids]
    assert len(live)==len(r['published']) and live
    assert all(int(p.get('priceCents') or 0)>0 and int(p.get('supplierStock') or 0)>0 and p.get('primaryImage') for p in live)
    reps=live[:3] if len(live)>=3 else live; tests=[]
    for p in reps:
        img=urllib.request.Request(p['primaryImage'],headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(img,timeout=45) as im: assert 200<=im.status<400
        qs,qb=quote(p['id']); assert qs==200,(p['id'],qs,qb)
        for state,postal in [('AK','99501'),('HI','96813')]:
            bs,bb=quote(p['id'],state,postal); assert bs==409,(p['id'],state,bs,bb)
        tests.append(p['title'])
    p=reps[0]
    order={'source':'rv','id':p['id'],'quantity':1,'customer':{'email':'casey@elevationupscales.com','phone':'208-813-4998'},'shipping':shipping()}
    os_,ob=call('/api/store-checkout/orders','POST',order); assert os_ in (200,201) and ob.get('paypalOrderId'),(os_,ob)
    if r['holds']:
        hp=r['holds'][0]; hs,hb=quote(hp['id']); assert hs==409,(hs,hb)
    ps,phtml=call('/lithium-batteries',raw=True); assert ps==200 and b'lithium-shop.js?v=4.3.4' in phtml
    js,body=call('/lithium-shop.js?v=4.3.4',raw=True); assert js==200 and b'/api/store/catalog?section=lithium-batteries' in body
    r.update({'representativeTests':tests,'paypalBoundary':'PASS','lower48Checkout':'PASS','akBlock':'PASS','hawaiiBlock':'PASS','holdBlock':'PASS','productionUrl':BASE,'publicCountAfter':cat.get('count',len(cat.get('products',[]))),'kingbossPublicAfter':len(live)})
    json.dump(r,open(OUT,'w'),indent=2)
    print(json.dumps({'kingbossPublicAfter':len(live),'representativeTests':tests,'paypalBoundary':'PASS'},indent=2))
else:
    raise SystemExit('unknown MODE')
