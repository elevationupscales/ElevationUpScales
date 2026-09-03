import { chromium } from 'playwright';
import fs from 'node:fs';

const base=(process.env.BASE||'https://elevationupscales.com').replace(/\/$/,'');
const auditPath=process.env.COST_AUDIT||'/tmp/cost-audit/lithium-pricing-audit-sanitized.json';
const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));
const costRows=Array.isArray(audit.products)?audit.products:[];
if(costRows.length!==38) throw new Error(`authoritative cost rows ${costRows.length}`);
const costById=new Map(costRows.map(x=>[String(x.id),x]));
const browser=await chromium.launch({headless:true});
const out={base};
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
async function overflow(page){return page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth));}
async function decode(page,src){return page.evaluate(async s=>await new Promise(resolve=>{const i=new Image();i.onload=()=>resolve({ok:true,w:i.naturalWidth,h:i.naturalHeight});i.onerror=()=>resolve({ok:false,w:0,h:0});i.src=s;}),src);}
async function fetchJson(url,opts={},attempts=6){let last;for(let i=0;i<attempts;i++){try{const r=await fetch(url,opts);const text=await r.text();if(!r.ok) throw new Error(`${r.status} ${text.slice(0,240)}`);return JSON.parse(text);}catch(e){last=e;await sleep(1200);} }throw last;}

try{
  const home=await browser.newPage({viewport:{width:1440,height:1000}});
  let r=await home.goto(base+'/',{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`home HTTP ${r?.status()}`);
  const commerce=home.locator('[data-home-commerce]');
  await commerce.waitFor({state:'attached',timeout:15000});
  await commerce.scrollIntoViewIfNeeded();
  await home.waitForFunction(()=>document.querySelectorAll('[data-home-products="lithium"] article').length===4&&document.querySelectorAll('[data-home-products="rv"] article').length===4,{timeout:20000});
  const featuredLithium=await home.locator('[data-home-products="lithium"] article').count();
  const featuredRv=await home.locator('[data-home-products="rv"] article').count();
  if(featuredLithium!==4||featuredRv!==4) throw new Error(`homepage featured ${featuredLithium}+${featuredRv}`);
  const option2=await decode(home,'/assets/homepage-option-2-lithium-solar.webp');
  const option3=await decode(home,'/assets/homepage-option-3-home-rv-lifestyle.webp');
  if(!option2.ok||option2.w!==960||option2.h!==540) throw new Error(`option2 ${JSON.stringify(option2)}`);
  if(!option3.ok||option3.w!==960||option3.h!==540) throw new Error(`option3 ${JSON.stringify(option3)}`);
  const homeOverflow=await overflow(home); if(homeOverflow>2) throw new Error(`home overflow ${homeOverflow}`);
  out.home={featuredLithium,featuredRv,option2,option3,overflow:homeOverflow,lazyHydration:'scroll-verified'};
  await home.close();

  const catalog=await fetchJson(base+'/api/store/catalog?section=lithium-batteries');
  const products=(catalog.products||[]).filter(p=>Number(p.priceCents)>0);
  if(products.length!==38) throw new Error(`canonical Lithium count ${products.length}`);
  out.catalog={lithium:products.length};

  const lithium=await browser.newPage({viewport:{width:1440,height:1000}});
  r=await lithium.goto(base+'/lithium-batteries',{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`Lithium HTTP ${r?.status()}`);
  await lithium.waitForSelector('.lithium-card',{timeout:30000});
  await lithium.waitForTimeout(1200);
  const lithiumCards=await lithium.locator('.lithium-card').count();
  if(lithiumCards!==38) throw new Error(`Lithium cards ${lithiumCards}`);
  const lithiumOverflow=await overflow(lithium); if(lithiumOverflow>2) throw new Error(`Lithium overflow ${lithiumOverflow}`);
  out.lithium={cards:lithiumCards,overflow:lithiumOverflow};
  await lithium.close();

  const hi=await browser.newPage({viewport:{width:1440,height:1000}});
  let req=0,api=0,batch=0,single=0,fullCatalog=0,imageRequests=0;
  hi.on('request',q=>{req++;const u=q.url();if(q.resourceType()==='image')imageRequests++;if(u.includes('/api/'))api++;if(u.includes('/api/hawaii-lithium/statuses'))batch++;if(/\/api\/hawaii-lithium\/status(?:\?|$)/.test(u))single++;if(u.includes('/api/store/catalog'))fullCatalog++;});
  r=await hi.goto(base+'/hawaii-lithium-batteries',{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`Hawaii HTTP ${r?.status()}`);
  await hi.waitForSelector('.lithium-card',{timeout:30000});
  await hi.waitForTimeout(2600);
  const cards=await hi.locator('.lithium-card').count();
  const nonBattery=await hi.locator('.lithium-card[data-hawaii-battery-units="0"]').count();
  const initialRequests=req,initialApi=api,initialImageRequests=imageRequests;
  if(cards!==31) throw new Error(`Hawaii battery cards ${cards}`);
  if(nonBattery!==0) throw new Error(`Hawaii non-battery cards ${nonBattery}`);
  if(single!==0||batch>1) throw new Error(`Hawaii status calls single=${single} batch=${batch}`);
  if(fullCatalog!==0) throw new Error(`Hawaii browser full Catalog fetch ${fullCatalog}`);
  if(initialRequests>32) throw new Error(`Hawaii initial requests ${initialRequests}`);
  if(initialApi>6) throw new Error(`Hawaii initial API ${initialApi}`);
  const hiOverflow=await overflow(hi); if(hiOverflow>2) throw new Error(`Hawaii overflow ${hiOverflow}`);
  const firstPickup=(await hi.locator('.lithium-card').first().locator('[data-hawaii-pickup-price]').innerText()).trim();
  if(!/^\$\d/.test(firstPickup)) throw new Error(`Hawaii pickup display ${firstPickup}`);
  const deferredBefore=await hi.locator('img[data-lithium-deferred-image][data-src]').count();
  if(deferredBefore<20) throw new Error(`deferred images ${deferredBefore}`);
  await hi.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await hi.waitForTimeout(1800);
  const loadedAfterScroll=await hi.locator('.lithium-card img').evaluateAll(imgs=>imgs.filter(i=>i.naturalWidth>2&&!(i.src||'').startsWith('data:image/gif')).length);
  if(loadedAfterScroll<31) throw new Error(`Hawaii images after scroll ${loadedAfterScroll}`);
  out.hawaii={cards,nonBattery,batchStatusCalls:batch,singleStatusCalls:single,fullCatalogFetches:fullCatalog,initialRequests,initialApi,initialImageRequests,finalRequests:req,firstPickup,overflow:hiOverflow,deferredBefore,loadedAfterScroll};
  await hi.close();

  let floorFailures=[];
  let couponFailures=[];
  for(const p of products){
    const cost=costById.get(String(p.id));
    if(!cost) throw new Error(`missing authoritative cost row ${p.id}`);
    const payload={source:'lithium',id:p.id,name:p.title||p.name||'Lithium item',quantity:1,couponCode:'LABORDAY25',shipping:{state:'CO'}};
    const q=await fetchJson(base+'/api/store-checkout/quote',{method:'POST',headers:{'Content-Type':'application/json','Origin':base},body:JSON.stringify(payload)});
    if(Number(q.merchandiseCents)<Number(cost.requiredPromoFloorCents||0)) floorFailures.push({id:p.id,sku:p.sku,merchandise:q.merchandiseCents,floor:cost.requiredPromoFloorCents});
    if(Number(cost.authoritativeCostCents||0)>0 && Number(q.couponPercent||0)!==25) couponFailures.push({id:p.id,couponPercent:q.couponPercent});
  }
  if(floorFailures.length) throw new Error(`promotion floor failures ${JSON.stringify(floorFailures.slice(0,5))}`);
  if(couponFailures.length) throw new Error(`coupon failures ${JSON.stringify(couponFailures.slice(0,5))}`);
  out.promotion={productsAudited:38,protectedFloorFailures:0,couponFailures:0};

  const knownId='cat-01e78438-5fb8-4e0d-aaab-ffbe86f5cf77';
  const battery=products.find(p=>String(p.id)===knownId)||products.find(p=>/100\s*ah/i.test(String(p.title||'')))||products.find(p=>/lifepo4|lithium/i.test(String(p.title||'')));
  if(!battery) throw new Error('known battery missing');
  const coPayload={source:'lithium',id:battery.id,name:battery.title||'Lithium Battery',quantity:1,couponCode:'LABORDAY25',shipping:{state:'CO'}};
  const hiPayload={...coPayload,shipping:{state:'HI'}};
  const qco=await fetchJson(base+'/api/store-checkout/quote',{method:'POST',headers:{'Content-Type':'application/json','Origin':base},body:JSON.stringify(coPayload)});
  const qhi=await fetchJson(base+'/api/store-checkout/quote',{method:'POST',headers:{'Content-Type':'application/json','Origin':base},body:JSON.stringify(hiPayload)});
  if(Number(qco.shippingCents)!==2799) throw new Error(`Lower48 shipping ${qco.shippingCents}`);
  if(Number(qhi.hawaii?.customerFreightPerBatteryCents)!==9900) throw new Error(`Hawaii freight ${qhi.hawaii?.customerFreightPerBatteryCents}`);
  if(qhi.promotion?.shippingDiscounted!==false) throw new Error('freight discount flag not false');
  if(Number(qhi.hawaii?.pickupPriceCents)!==Number(qhi.merchandiseCents)+Number(qhi.hawaii?.pickupFreightCents)) throw new Error('Hawaii pickup price math');
  if(qhi.hawaii?.customerState!=='review_required') throw new Error(`expected review_required, got ${qhi.hawaii?.customerState}`);
  if(qhi.hawaii?.paymentAllowed!==false) throw new Error('review-required Hawaii quote allowed payment');
  if(Number(qhi.shippingCents)!==0) throw new Error(`review-required payable shipping should be 0, got ${qhi.shippingCents}`);
  out.shipping={knownProduct:battery.id,lower48ShippingCents:qco.shippingCents,hawaiiFreightPerBatteryCents:qhi.hawaii?.customerFreightPerBatteryCents,hawaiiPickupPriceCents:qhi.hawaii?.pickupPriceCents,freightDiscounted:qhi.promotion?.shippingDiscounted,hawaiiState:qhi.hawaii?.customerState,paymentAllowed:qhi.hawaii?.paymentAllowed};

  const detail=await browser.newPage({viewport:{width:1280,height:900}});
  r=await detail.goto(base+`/product?id=${encodeURIComponent(battery.id)}&store=lithium`,{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`product detail HTTP ${r?.status()}`);
  await detail.waitForTimeout(1200);
  const detailText=(await detail.locator('body').innerText()).slice(0,12000);
  if(!/Lithium|Battery/i.test(detailText)) throw new Error('product detail content missing');
  out.productDetail={status:r.status(),productId:battery.id};
  await detail.close();

  const checkout=await browser.newPage({viewport:{width:1280,height:900}});
  r=await checkout.goto(base+`/checkout/?source=lithium&id=${encodeURIComponent(battery.id)}&name=${encodeURIComponent(battery.title||'Lithium Battery')}&state=HI`,{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`checkout HTTP ${r?.status()}`);
  await checkout.waitForSelector('#checkout-hawaii-freight:not([hidden])',{timeout:15000});
  await checkout.waitForFunction(()=>/Freight Review Required/i.test(document.querySelector('#checkout-hawaii-state')?.textContent||''),{timeout:20000});
  const checkoutState=(await checkout.locator('#checkout-hawaii-state').innerText()).trim();
  const pickupPrice=(await checkout.locator('#checkout-hawaii-pickup-price').innerText()).trim();
  const paypalHidden=await checkout.locator('#checkout-paypal').evaluate(el=>el.hidden);
  const reserveHidden=await checkout.locator('#checkout-hawaii-reserve').evaluate(el=>el.hidden);
  if(!paypalHidden||reserveHidden) throw new Error(`PayPal gate state=${checkoutState} paypalHidden=${paypalHidden} reserveHidden=${reserveHidden}`);
  for(const el of await checkout.locator('.eus-checkout-address-field').all()) if(!(await el.evaluate(e=>e.hidden))) throw new Error('Hawaii residential address field visible');
  out.checkout={state:checkoutState,pickupPrice,paypalHidden,reserveHidden};
  await checkout.close();

  for(const [name,path] of [['mobileHome','/'],['mobileHawaii','/hawaii-lithium-batteries']]){
    const p=await browser.newPage({viewport:{width:390,height:844}});let sr=0,sb=0;
    p.on('request',q=>{const u=q.url();if(/\/api\/hawaii-lithium\/status(?:\?|$)/.test(u))sr++;if(u.includes('/api/hawaii-lithium/statuses'))sb++;});
    r=await p.goto(base+path,{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`${name} HTTP ${r?.status()}`);await p.waitForTimeout(2200);const ov=await overflow(p);if(ov>2)throw new Error(`${name} overflow ${ov}`);if(sr||sb>1)throw new Error(`${name} status storm single=${sr} batch=${sb}`);out[name]={overflow:ov,singleStatusCalls:sr,batchStatusCalls:sb};await p.close();
  }

  for(const [name,path,needle] of [['terms','/terms','Honolulu'],['privacy','/privacy','payment'],['admin','/admin','Admin']]){
    const p=await browser.newPage({viewport:{width:1280,height:800}});r=await p.goto(base+path,{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`${name} HTTP ${r?.status()}`);const text=(await p.locator('body').innerText()).toLowerCase();if(!text.includes(String(needle).toLowerCase()))throw new Error(`${name} content marker missing`);out[name]={status:r.status()};await p.close();
  }

  console.log(JSON.stringify(out,null,2));
} finally {await browser.close();}
