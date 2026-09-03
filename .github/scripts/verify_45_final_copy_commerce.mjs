import { chromium } from 'playwright';
import fs from 'node:fs';

const base=(process.env.BASE||'').replace(/\/$/,'');
if(!base) throw new Error('BASE required');
const audit=JSON.parse(fs.readFileSync(process.env.COST_AUDIT||'/tmp/cost-audit/lithium-pricing-audit-sanitized.json','utf8'));
const costRows=Array.isArray(audit.products)?audit.products:[];
if(costRows.length!==38) throw new Error(`authoritative cost rows ${costRows.length}`);
const costById=new Map(costRows.map(x=>[String(x.id),x]));
const browser=await chromium.launch({headless:true});
const out={base};
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
async function fetchJson(url,opts={},attempts=6){let last;for(let i=0;i<attempts;i++){try{const r=await fetch(url,opts);const text=await r.text();if(!r.ok)throw new Error(`${r.status} ${text.slice(0,240)}`);return JSON.parse(text);}catch(e){last=e;await sleep(1200);}}throw last;}
async function overflow(page){return page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth));}
async function decode(page,src){return page.evaluate(async s=>await new Promise(resolve=>{const i=new Image();i.onload=()=>resolve({ok:true,w:i.naturalWidth,h:i.naturalHeight});i.onerror=()=>resolve({ok:false,w:0,h:0});i.src=s;}),src);}

try{
  const rawHome=await (await fetch(base+'/')).text();
  if(!rawHome.includes('Shop Current Products')) throw new Error('homepage final heading missing in source');
  if(!rawHome.includes('Featured products from our Lithium and RV & Outdoor stores.')) throw new Error('homepage final description missing in source');
  if(!rawHome.includes('Hawaii Lithium Batteries')) throw new Error('homepage Hawaii Lithium Batteries missing in source');
  const rawStart=await (await fetch(base+'/start-a-project')).text();
  for(const banned of ['underlying Project families','Intake Intent tells management','management review']) if(rawStart.toLowerCase().includes(banned.toLowerCase())) throw new Error(`Start-a-Project jargon remains: ${banned}`);

  const home=await browser.newPage({viewport:{width:1440,height:1000}});
  let r=await home.goto(base+'/',{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`home HTTP ${r?.status()}`);
  const body=(await home.locator('body').innerText());
  for(const text of ['Shop Current Products','Featured products from our Lithium and RV & Outdoor stores.','Hawaii Lithium Batteries']) if(!body.includes(text)) throw new Error(`homepage rendered text missing: ${text}`);
  const route=home.locator('.hc-route[style*="homepage-option-2-lithium-solar.webp"]').first();
  if(await route.count()!==1) throw new Error('approved Lithium/Solar homepage artwork route missing');
  const routeBox=await route.boundingBox();
  const bg=await route.evaluate(el=>getComputedStyle(el).backgroundImage);
  const option2=await decode(home,'/assets/homepage-option-2-lithium-solar.webp');
  if(!routeBox||routeBox.width<100||routeBox.height<80||!bg.includes('homepage-option-2-lithium-solar.webp')||!option2.ok||option2.w!==960||option2.h!==540) throw new Error(`option2 render ${JSON.stringify({routeBox,bg,option2})}`);
  const option3El=home.locator('img[src="/assets/homepage-option-3-home-rv-lifestyle.webp"]').first();
  if(await option3El.count()!==1) throw new Error('approved Home/RV homepage artwork missing');
  await option3El.scrollIntoViewIfNeeded();
  await home.waitForFunction(()=>{const i=document.querySelector('img[src="/assets/homepage-option-3-home-rv-lifestyle.webp"]');return !!i&&i.complete&&i.naturalWidth>0;},{timeout:15000});
  const option3=await option3El.evaluate(i=>({ok:i.complete&&i.naturalWidth>0,w:i.naturalWidth,h:i.naturalHeight,box:{w:i.getBoundingClientRect().width,h:i.getBoundingClientRect().height}}));
  if(!option3.ok||option3.w!==960||option3.h!==540||option3.box.w<100||option3.box.h<50) throw new Error(`option3 render ${JSON.stringify(option3)}`);
  const commerce=home.locator('[data-home-commerce]');await commerce.scrollIntoViewIfNeeded();
  await home.waitForFunction(()=>document.querySelectorAll('[data-home-products="lithium"] article').length===4&&document.querySelectorAll('[data-home-products="rv"] article').length===4,{timeout:20000});
  const homeOverflow=await overflow(home);if(homeOverflow>2)throw new Error(`home overflow ${homeOverflow}`);
  out.home={copy:true,hawaiiLabel:true,featuredLithium:4,featuredRv:4,option2,option3,overflow:homeOverflow};
  await home.close();

  const start=await browser.newPage({viewport:{width:1280,height:900}});
  r=await start.goto(base+'/start-a-project',{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`start project HTTP ${r?.status()}`);
  const startText=(await start.locator('body').innerText()).toLowerCase();
  for(const banned of ['underlying project families','intake intent','management review']) if(startText.includes(banned)) throw new Error(`rendered Start-a-Project jargon remains: ${banned}`);
  if(!startText.includes('pick the closest match')) throw new Error('clean Start-a-Project intent copy missing');
  out.startProject={status:r.status(),jargonFree:true};await start.close();

  const catalog=await fetchJson(base+'/api/store/catalog?section=lithium-batteries');
  const products=(catalog.products||[]).filter(p=>Number(p.priceCents)>0);
  if(products.length!==38) throw new Error(`Lithium catalog ${products.length}`);
  const knownId='cat-01e78438-5fb8-4e0d-aaab-ffbe86f5cf77';
  const battery=products.find(p=>String(p.id)===knownId)||products.find(p=>/100\s*ah/i.test(String(p.title||'')))||products[0];
  if(!battery)throw new Error('battery missing');

  const lithium=await browser.newPage({viewport:{width:1280,height:900}});
  r=await lithium.goto(base+'/lithium-batteries',{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`Lithium HTTP ${r?.status()}`);
  await lithium.waitForSelector('.lithium-card',{timeout:30000});
  const lithiumCards=await lithium.locator('.lithium-card').count();if(lithiumCards!==38)throw new Error(`Lithium cards ${lithiumCards}`);
  const hawaiiLink=lithium.locator('a[href="/hawaii-lithium-batteries"]').first();if(await hawaiiLink.count()!==1)throw new Error('Lithium → Hawaii public link missing');
  await hawaiiLink.click({force:true});await lithium.waitForURL(/\/hawaii-lithium-batteries/,{timeout:20000});
  await lithium.waitForSelector('.lithium-card',{timeout:30000});
  const hiCards=await lithium.locator('.lithium-card').count();if(hiCards!==31)throw new Error(`Hawaii cards after Lithium navigation ${hiCards}`);
  let target=lithium.locator(`.lithium-card[data-product-id="${battery.id}"]`).first();
  if(await target.count()!==1)target=lithium.locator('.lithium-card').first();
  const smokeId=await target.getAttribute('data-product-id');
  const checkoutUrl=await target.locator('[data-hawaii-action]').getAttribute('data-checkout-url');
  if(!smokeId||!checkoutUrl||!checkoutUrl.startsWith('/checkout/'))throw new Error(`Hawaii listing checkout URL missing: ${checkoutUrl}`);
  out.flow={lithiumCards,hawaiiCards:hiCards,smokeProduct:smokeId,checkoutUrl};
  await lithium.close();

  let floorFailures=[],couponFailures=[];
  for(const p of products){
    const cost=costById.get(String(p.id));if(!cost)throw new Error(`missing authoritative cost ${p.id}`);
    const payload={source:'lithium',id:p.id,name:p.title||p.name||'Lithium item',quantity:1,couponCode:'LABORDAY25',shipping:{state:'CO'}};
    const q=await fetchJson(base+'/api/store-checkout/quote',{method:'POST',headers:{'Content-Type':'application/json','Origin':base},body:JSON.stringify(payload)});
    if(Number(q.merchandiseCents)<Number(cost.requiredPromoFloorCents||0))floorFailures.push(p.id);
    if(Number(cost.authoritativeCostCents||0)>0&&Number(q.couponPercent||0)!==25)couponFailures.push(p.id);
  }
  if(floorFailures.length||couponFailures.length)throw new Error(`promotion audit floor=${floorFailures.length} coupon=${couponFailures.length}`);

  const smoke=products.find(p=>String(p.id)===String(out.flow.smokeProduct))||battery;
  const basePayload={source:'lithium',id:smoke.id,name:smoke.title||'Lithium Battery',quantity:1,couponCode:'LABORDAY25'};
  const qco=await fetchJson(base+'/api/store-checkout/quote',{method:'POST',headers:{'Content-Type':'application/json','Origin':base},body:JSON.stringify({...basePayload,shipping:{state:'CO'}})});
  const qhi=await fetchJson(base+'/api/store-checkout/quote',{method:'POST',headers:{'Content-Type':'application/json','Origin':base},body:JSON.stringify({...basePayload,shipping:{state:'HI'}})});
  if(Number(qco.shippingCents)!==2799)throw new Error(`Lower48 shipping ${qco.shippingCents}`);
  if(Number(qhi.hawaii?.customerFreightPerBatteryCents)!==9900)throw new Error(`Hawaii freight/battery ${qhi.hawaii?.customerFreightPerBatteryCents}`);
  if(qhi.promotion?.shippingDiscounted!==false)throw new Error('LABORDAY25 discounted freight');
  if(Number(qhi.discountCents||0)<=0||Number(qhi.couponPercent||0)!==25)throw new Error(`LABORDAY25 merchandise discount missing ${qhi.discountCents}/${qhi.couponPercent}`);
  if(Number(qhi.hawaii?.pickupPriceCents)!==Number(qhi.merchandiseCents)+Number(qhi.hawaii?.pickupFreightCents))throw new Error('Hawaii coupon/freight pickup math');
  if(qhi.hawaii?.customerState!=='review_required'||qhi.hawaii?.paymentAllowed!==false)throw new Error(`Hawaii gate ${qhi.hawaii?.customerState}/${qhi.hawaii?.paymentAllowed}`);
  if(Number(qhi.shippingCents)!==0)throw new Error(`review-required payable shipping ${qhi.shippingCents}`);
  out.promotion={productsAudited:38,floorFailures:0,couponFailures:0,couponPercent:qhi.couponPercent,discountCents:qhi.discountCents,freightDiscounted:qhi.promotion?.shippingDiscounted};
  out.shipping={lower48ShippingCents:qco.shippingCents,hawaiiFreightPerBatteryCents:qhi.hawaii?.customerFreightPerBatteryCents,pickupFreightCents:qhi.hawaii?.pickupFreightCents,pickupPriceCents:qhi.hawaii?.pickupPriceCents,merchandiseCents:qhi.merchandiseCents,state:qhi.hawaii?.customerState,paymentAllowed:qhi.hawaii?.paymentAllowed};

  const checkout=await browser.newPage({viewport:{width:1280,height:900}});
  r=await checkout.goto(base+out.flow.checkoutUrl,{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`Hawaii checkout HTTP ${r?.status()}`);
  await checkout.waitForSelector('#checkout-hawaii-freight:not([hidden])',{timeout:20000});
  await checkout.waitForFunction(()=>/Freight Review Required/i.test(document.querySelector('#checkout-hawaii-state')?.textContent||''),{timeout:20000});
  const paypalHidden=await checkout.locator('#checkout-paypal').evaluate(el=>el.hidden);
  const reserveHidden=await checkout.locator('#checkout-hawaii-reserve').evaluate(el=>el.hidden);
  if(!paypalHidden||reserveHidden)throw new Error(`PayPal gate paypalHidden=${paypalHidden} reserveHidden=${reserveHidden}`);
  out.checkout={state:(await checkout.locator('#checkout-hawaii-state').innerText()).trim(),paypalHidden,reserveHidden,pickupPrice:(await checkout.locator('#checkout-hawaii-pickup-price').innerText()).trim()};
  await checkout.close();

  const footerPaths=['/','/store','/rv-store','/lithium-batteries','/hawaii-lithium-batteries',`/product?id=${encodeURIComponent(smoke.id)}&store=lithium`,out.flow.checkoutUrl];
  const footerResults=[];
  for(const path of footerPaths){const p=await browser.newPage({viewport:{width:1100,height:800}});r=await p.goto(base+path,{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`footer page ${path} HTTP ${r?.status()}`);const link=p.locator('footer a[href="/terms"]').first();if(await link.count()!==1)throw new Error(`Terms footer link missing ${path}`);const href=await link.getAttribute('href');if(href!=='/terms')throw new Error(`Terms footer href ${path}: ${href}`);footerResults.push(path);await p.close();}
  r=await (await browser.newPage()).goto(base+'/terms',{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`Terms HTTP ${r?.status()}`);
  out.terms={status:r.status(),footerPaths:footerResults};

  for(const [name,path] of [['mobileHome','/'],['mobileHawaii','/hawaii-lithium-batteries']]){const p=await browser.newPage({viewport:{width:390,height:844}});r=await p.goto(base+path,{waitUntil:'domcontentloaded',timeout:60000});if(!r?.ok())throw new Error(`${name} HTTP ${r?.status()}`);await p.waitForTimeout(1800);const ov=await overflow(p);if(ov>2)throw new Error(`${name} overflow ${ov}`);out[name]={overflow:ov};await p.close();}

  console.log(JSON.stringify(out,null,2));
} finally {await browser.close();}
