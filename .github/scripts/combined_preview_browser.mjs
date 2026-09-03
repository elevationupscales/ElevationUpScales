import { chromium } from 'playwright';

const base=(process.env.BASE||'').replace(/\/$/,'');
if(!base) throw new Error('BASE required');
const results={};

async function imageDecode(page,path){
  return page.evaluate(async (src)=>await new Promise((resolve)=>{const i=new Image();i.onload=()=>resolve({ok:true,w:i.naturalWidth,h:i.naturalHeight});i.onerror=()=>resolve({ok:false,w:0,h:0});i.src=src;}),path);
}

async function pageMetrics(browser,path,viewport){
  const page=await browser.newPage({viewport});
  let requests=0,api=0,statusBatch=0,statusSingle=0;
  page.on('request',(req)=>{requests++;const u=req.url();if(u.includes('/api/')) api++;if(u.includes('/api/hawaii-lithium/statuses')) statusBatch++;if(/\/api\/hawaii-lithium\/status(?:\?|$)/.test(u)) statusSingle++;});
  const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:60000});
  if(!response||!response.ok()) throw new Error(`${path} HTTP ${response?.status()}`);
  await page.waitForTimeout(2200);
  const dom=await page.locator('*').count();
  const overflow=await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth));
  await page.close();
  return {requests,api,dom,overflow,statusBatch,statusSingle};
}

const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  let homepageRequests=0;
  page.on('request',()=>homepageRequests++);
  let r=await page.goto(base+'/',{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`homepage HTTP ${r?.status()}`);
  await page.waitForTimeout(1800);
  const img2=await imageDecode(page,'/assets/homepage-option-2-lithium-solar.webp');
  const img3=await imageDecode(page,'/assets/homepage-option-3-home-rv-lifestyle.webp');
  if(!img2.ok||img2.w!==960||img2.h!==540) throw new Error(`Option 2 decode failed ${JSON.stringify(img2)}`);
  if(!img3.ok||img3.w!==960||img3.h!==540) throw new Error(`Option 3 decode failed ${JSON.stringify(img3)}`);
  const featuredLithium=await page.locator('[data-home-products="lithium"] article').count();
  const featuredRv=await page.locator('[data-home-products="rv"] article').count();
  if(featuredLithium!==4||featuredRv!==4) throw new Error(`homepage featured mismatch ${featuredLithium}+${featuredRv}`);
  const homeOverflow=await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth));
  if(homeOverflow>2) throw new Error(`homepage desktop overflow ${homeOverflow}`);
  results.homepage={requests:homepageRequests,featuredLithium,featuredRv,option2:img2,option3:img3,overflow:homeOverflow};
  await page.close();

  const hi=await browser.newPage({viewport:{width:1440,height:1000}});
  let hiReq=0,hiApi=0,batch=0,single=0;
  hi.on('request',(req)=>{hiReq++;const u=req.url();if(u.includes('/api/'))hiApi++;if(u.includes('/api/hawaii-lithium/statuses'))batch++;if(/\/api\/hawaii-lithium\/status(?:\?|$)/.test(u))single++;});
  r=await hi.goto(base+'/hawaii-lithium-batteries',{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`Hawaii HTTP ${r?.status()}`);
  await hi.waitForSelector('.lithium-card',{timeout:30000});
  await hi.waitForTimeout(2600);
  const cards=await hi.locator('.lithium-card').count();
  if(cards<30) throw new Error(`Hawaii card count ${cards}`);
  if(single!==0) throw new Error(`per-card Hawaii status storm detected ${single}`);
  if(batch>1) throw new Error(`Hawaii batch status calls ${batch}`);
  const batteryCard=hi.locator('.lithium-card[data-hawaii-battery-units]:not([data-hawaii-battery-units="0"])').first();
  if(await batteryCard.count()===0) throw new Error('No Hawaii actual-battery card found');
  const pickup=await batteryCard.locator('[data-hawaii-pickup-price]').innerText();
  if(!/\$\d/.test(pickup)) throw new Error(`Hawaii pickup price missing: ${pickup}`);
  const badge=(await batteryCard.locator('[data-hawaii-status]').innerText()).trim();
  const action=batteryCard.locator('[data-hawaii-action]');
  const actionText=(await action.innerText()).trim();
  const actionHref=await action.getAttribute('href');
  if(/Shipping Available/i.test(badge)) { if(!/Buy Now/i.test(actionText)||!String(actionHref).includes('/checkout/')) throw new Error(`available Hawaii action wrong ${actionText} ${actionHref}`); }
  else { if(String(actionHref).includes('/checkout/')) throw new Error(`review/unavailable Hawaii action reaches checkout ${actionHref}`); }
  const hiOverflow=await hi.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth));
  if(hiOverflow>2) throw new Error(`Hawaii desktop overflow ${hiOverflow}`);
  results.hawaii={requests:hiReq,api:hiApi,cards,batchStatusCalls:batch,singleStatusCalls:single,pickup,badge,actionText,overflow:hiOverflow};
  await hi.close();

  const catalog=await fetch(base+'/api/store/catalog?section=lithium-batteries').then(x=>x.json());
  const products=(catalog.products||[]).filter(p=>Number(p.priceCents)>0);
  const battery=products.find(p=>/100\s*ah/i.test(String(p.title||'')))||products.find(p=>/lifepo4|lithium/i.test(String(p.title||'')));
  if(!battery) throw new Error('No Lithium checkout product found');
  const checkout=await browser.newPage({viewport:{width:1280,height:900}});
  r=await checkout.goto(base+`/checkout/?source=lithium&id=${encodeURIComponent(battery.id)}&name=${encodeURIComponent(battery.title||'Lithium Battery')}&state=HI`,{waitUntil:'domcontentloaded',timeout:60000});
  if(!r?.ok()) throw new Error(`checkout HTTP ${r?.status()}`);
  await checkout.waitForSelector('#checkout-hawaii-freight:not([hidden])',{timeout:10000});
  const addresses=checkout.locator('.eus-checkout-address-field');
  for(let i=0;i<await addresses.count();i++){if(!(await addresses.nth(i).evaluate(el=>el.hidden))) throw new Error('Hawaii address field visible');}
  await checkout.waitForFunction(()=>{const t=document.querySelector('#checkout-hawaii-state')?.textContent||'';return /Shipping Available|Freight Review Required|Currently Unavailable/i.test(t);},{timeout:15000});
  const checkoutState=(await checkout.locator('#checkout-hawaii-state').innerText()).trim();
  const checkoutPickup=(await checkout.locator('#checkout-hawaii-pickup-price').innerText()).trim();
  if(!/\$\d/.test(checkoutPickup)) throw new Error(`checkout pickup price missing ${checkoutPickup}`);
  const paypalHidden=await checkout.locator('#checkout-paypal').evaluate(el=>el.hidden);
  const reserveHidden=await checkout.locator('#checkout-hawaii-reserve').evaluate(el=>el.hidden);
  if(/Freight Review Required|Currently Unavailable/i.test(checkoutState)&&(!paypalHidden||reserveHidden)) throw new Error(`payment gating wrong ${checkoutState} paypalHidden=${paypalHidden} reserveHidden=${reserveHidden}`);
  results.checkout={productId:battery.id,state:checkoutState,pickupPrice:checkoutPickup,paypalHidden,reserveHidden};
  await checkout.close();

  const mobileHome=await pageMetrics(browser,'/',{width:390,height:844});
  const mobileHi=await pageMetrics(browser,'/hawaii-lithium-batteries',{width:390,height:844});
  if(mobileHome.overflow>2||mobileHi.overflow>2) throw new Error(`mobile overflow home=${mobileHome.overflow} hi=${mobileHi.overflow}`);
  if(mobileHi.statusSingle!==0||mobileHi.statusBatch>1) throw new Error(`mobile Hawaii request regression ${JSON.stringify(mobileHi)}`);
  results.mobile={home:mobileHome,hawaii:mobileHi};

  if(results.hawaii.requests>32) throw new Error(`Hawaii request regression ${results.hawaii.requests}`);
  if(results.hawaii.api>6) throw new Error(`Hawaii API regression ${results.hawaii.api}`);
  console.log(JSON.stringify(results,null,2));
} finally {
  await browser.close();
}
