import { chromium } from 'playwright';

const base=(process.env.BASE||'').replace(/\/$/,'');
if(!base) throw new Error('BASE required');
const browser=await chromium.launch({headless:true});
const out={};

async function decode(page,src){return page.evaluate(async s=>await new Promise(resolve=>{const i=new Image();i.onload=()=>resolve({ok:true,w:i.naturalWidth,h:i.naturalHeight});i.onerror=()=>resolve({ok:false,w:0,h:0});i.src=s;}),src);}
async function overflow(page){return page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth));}

try {
  const home=await browser.newPage({viewport:{width:1440,height:1000}});
  let homeReq=0; home.on('request',()=>homeReq++);
  let r=await home.goto(base+'/',{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`home HTTP ${r?.status()}`);
  await home.waitForTimeout(1800);
  const img2=await decode(home,'/assets/homepage-option-2-lithium-solar.webp');
  const img3=await decode(home,'/assets/homepage-option-3-home-rv-lifestyle.webp');
  if(!img2.ok||img2.w!==960||img2.h!==540) throw new Error(`Option 2 decode ${JSON.stringify(img2)}`);
  if(!img3.ok||img3.w!==960||img3.h!==540) throw new Error(`Option 3 decode ${JSON.stringify(img3)}`);
  const fl=await home.locator('[data-home-products="lithium"] article').count();
  const fr=await home.locator('[data-home-products="rv"] article').count();
  if(fl!==4||fr!==4) throw new Error(`home featured ${fl}+${fr}`);
  const hov=await overflow(home); if(hov>2) throw new Error(`home overflow ${hov}`);
  out.home={requests:homeReq,featuredLithium:fl,featuredRv:fr,option2:img2,option3:img3,overflow:hov};
  await home.close();

  const hi=await browser.newPage({viewport:{width:1440,height:1000}});
  let req=0,api=0,batch=0,single=0,images=0;
  hi.on('request',q=>{req++;const u=q.url();if(q.resourceType()==='image')images++;if(u.includes('/api/'))api++;if(u.includes('/api/hawaii-lithium/statuses'))batch++;if(/\/api\/hawaii-lithium\/status(?:\?|$)/.test(u))single++;});
  r=await hi.goto(base+'/hawaii-lithium-batteries',{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`HI HTTP ${r?.status()}`);
  await hi.waitForSelector('.lithium-card',{timeout:30000});
  await hi.waitForTimeout(2600);
  const cards=await hi.locator('.lithium-card').count();
  const nonBattery=await hi.locator('.lithium-card[data-hawaii-battery-units="0"]').count();
  if(cards<25) throw new Error(`too few Hawaii battery cards ${cards}`);
  if(nonBattery!==0) throw new Error(`non-battery Hawaii cards ${nonBattery}`);
  if(single!==0||batch>1) throw new Error(`Hawaii status calls single=${single} batch=${batch}`);
  const first=hi.locator('.lithium-card').first();
  const pickup=(await first.locator('[data-hawaii-pickup-price]').innerText()).trim();
  if(!/\$\d/.test(pickup)) throw new Error(`pickup price ${pickup}`);
  const badge=(await first.locator('[data-hawaii-status]').innerText()).trim();
  const action=first.locator('[data-hawaii-action]');
  const actionText=(await action.innerText()).trim();
  const actionHref=await action.getAttribute('href');
  if(/Shipping Available/i.test(badge)){if(!/Buy Now/i.test(actionText)||!String(actionHref).includes('/checkout/'))throw new Error(`available action ${actionText} ${actionHref}`);}
  else if(String(actionHref).includes('/checkout/')) throw new Error(`review action reaches checkout ${actionHref}`);
  const hiov=await overflow(hi); if(hiov>2) throw new Error(`HI overflow ${hiov}`);
  if(req>32) throw new Error(`Hawaii request regression ${req}`);
  if(api>6) throw new Error(`Hawaii API regression ${api}`);
  const deferredBefore=await hi.locator('img[data-lithium-deferred-image][data-src]').count();
  if(deferredBefore<1) throw new Error('No deferred Hawaii images found');
  await hi.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await hi.waitForTimeout(1600);
  const loadedAfter=await hi.locator('.lithium-card img').evaluateAll(imgs=>imgs.filter(i=>i.naturalWidth>2&&!(i.src||'').startsWith('data:image/gif')).length);
  if(loadedAfter<8) throw new Error(`deferred images did not load on scroll ${loadedAfter}`);
  out.hawaii={requests:req,api,imageRequests:images,cards,nonBattery,batchStatusCalls:batch,singleStatusCalls:single,pickup,badge,actionText,overflow:hiov,deferredBefore,loadedAfterScroll:loadedAfter};
  await hi.close();

  const catalog=await fetch(base+'/api/store/catalog?section=lithium-batteries').then(r=>r.json());
  const products=(catalog.products||[]).filter(p=>Number(p.priceCents)>0);
  if(products.length!==38) throw new Error(`Lithium count ${products.length}`);
  const battery=products.find(p=>/100\s*ah/i.test(String(p.title||'')))||products.find(p=>/lifepo4|lithium/i.test(String(p.title||'')));
  if(!battery) throw new Error('No checkout battery');
  const coPayload={source:'lithium',id:battery.id,name:battery.title||'Lithium Battery',quantity:1,couponCode:'LABORDAY25',shipping:{state:'CO'}};
  const hiPayload={...coPayload,shipping:{state:'HI'}};
  const qco=await fetch(base+'/api/store-checkout/quote',{method:'POST',headers:{'Content-Type':'application/json','Origin':base},body:JSON.stringify(coPayload)}).then(r=>r.json());
  const qhi=await fetch(base+'/api/store-checkout/quote',{method:'POST',headers:{'Content-Type':'application/json','Origin':base},body:JSON.stringify(hiPayload)}).then(r=>r.json());
  if(Number(qco.shippingCents)!==2799) throw new Error(`Lower48 shipping ${qco.shippingCents}`);
  if(Number(qhi.hawaii?.customerFreightPerBatteryCents)!==9900) throw new Error(`HI freight ${qhi.hawaii?.customerFreightPerBatteryCents}`);
  if(qhi.promotion?.shippingDiscounted!==false) throw new Error('Freight discount flag wrong');
  if(Number(qhi.hawaii?.pickupPriceCents)!==Number(qhi.merchandiseCents)+Number(qhi.shippingCents)) throw new Error('HI pickup total mismatch');
  if(Number(qco.merchandiseCents)<Math.ceil(Number(battery.supplierCostCents||battery.costCents||0)*1.20) && Number(battery.supplierCostCents||battery.costCents||0)>0) throw new Error('promo floor failed known battery');

  const checkout=await browser.newPage({viewport:{width:1280,height:900}});
  r=await checkout.goto(base+`/checkout/?source=lithium&id=${encodeURIComponent(battery.id)}&name=${encodeURIComponent(battery.title||'Lithium Battery')}&state=HI`,{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`checkout HTTP ${r?.status()}`);
  await checkout.waitForSelector('#checkout-hawaii-freight:not([hidden])',{timeout:10000});
  await checkout.waitForFunction(()=>/Shipping Available|Freight Review Required|Currently Unavailable/i.test(document.querySelector('#checkout-hawaii-state')?.textContent||''),{timeout:15000});
  const cstate=(await checkout.locator('#checkout-hawaii-state').innerText()).trim();
  const cpick=(await checkout.locator('#checkout-hawaii-pickup-price').innerText()).trim();
  const paypalHidden=await checkout.locator('#checkout-paypal').evaluate(el=>el.hidden);
  const reserveHidden=await checkout.locator('#checkout-hawaii-reserve').evaluate(el=>el.hidden);
  for(const el of await checkout.locator('.eus-checkout-address-field').all()) if(!(await el.evaluate(e=>e.hidden))) throw new Error('HI address field visible');
  if(/Freight Review Required|Currently Unavailable/i.test(cstate)&&(!paypalHidden||reserveHidden)) throw new Error(`payment gate ${cstate}`);
  out.checkout={productId:battery.id,state:cstate,pickupPrice:cpick,paypalHidden,reserveHidden,lower48Shipping:qco.shippingCents,hawaiiFreight:qhi.hawaii?.customerFreightPerBatteryCents,freightDiscounted:qhi.promotion?.shippingDiscounted};
  await checkout.close();

  for(const [name,path] of [['mobileHome','/'],['mobileHawaii','/hawaii-lithium-batteries']]){
    const p=await browser.newPage({viewport:{width:390,height:844}});let sr=0,sb=0;
    p.on('request',q=>{const u=q.url();if(/\/api\/hawaii-lithium\/status(?:\?|$)/.test(u))sr++;if(u.includes('/api/hawaii-lithium/statuses'))sb++;});
    r=await p.goto(base+path,{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`${name} HTTP`);await p.waitForTimeout(2200);const ov=await overflow(p);if(ov>2)throw new Error(`${name} overflow ${ov}`);if(sr||sb>1)throw new Error(`${name} status storm`);out[name]={overflow:ov,singleStatusCalls:sr,batchStatusCalls:sb};await p.close();
  }
  console.log(JSON.stringify(out,null,2));
} finally { await browser.close(); }
