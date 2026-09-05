import { ensureSokAvailabilitySchema, handleSokAvailabilityPublicApi, publicSokCatalogProducts } from "./sok-availability-runtime.js";
import { SOK_FULL_LINE_PUBLIC, SOK_FULL_LINE_BY_SKU, SOK_FULL_LINE_BY_SLUG } from "./sok-full-line-data.js";

const JSON_HEADERS=Object.freeze({"Cache-Control":"no-store","Content-Type":"application/json; charset=utf-8","X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","Referrer-Policy":"no-referrer"});
const PUBLIC_EMAIL="casey@elevationupscales.com";
const clean=(v,max=1000)=>String(v??"").trim().slice(0,max);
const upper=(v,max=120)=>clean(v,max).toUpperCase();
const integer=(v,f=1)=>{const n=Number.parseInt(String(v??""),10);return Number.isInteger(n)?n:f;};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:JSON_HEADERS});
const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const validEmail=(v)=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean(v,180));
const validPhone=(v)=>clean(v,60).replace(/\D/g,"").length>=7;
const sameOrigin=(request)=>{const origin=clean(request.headers.get("Origin"),500);if(!origin)return false;try{return origin===new URL(request.url).origin;}catch(_){return false;}};
const now=()=>new Date().toISOString();
async function addColumn(db,sql){try{await db.prepare(sql).run();}catch(error){if(!/duplicate column name/i.test(String(error?.message||error)))throw error;}}

export async function publicSokFullCatalog(env){
  const anchors=await publicSokCatalogProducts(env);
  const dynamic=new Map(anchors.map(p=>[upper(p.sku),p]));
  return SOK_FULL_LINE_PUBLIC.map(base=>{
    const live=dynamic.get(upper(base.sku));
    if(!live)return base;
    return Object.freeze({...base,...live,detailUrl:base.detailUrl,category:base.category,productType:base.productType,bestFor:base.bestFor,features:base.features,specs:base.specs,primaryImage:base.primaryImage,images:base.images,downloads:base.downloads,publicPurchaseMode:live.publicPurchaseMode||base.publicPurchaseMode,purchaseOptionsUrl:live.purchaseOptionsUrl||base.purchaseOptionsUrl,commercialUrl:base.commercialUrl,hawaiiUrl:base.hawaiiUrl});
  });
}

async function createFullLineReservation(request,env){
  if(request.method!=="POST")return json({error:"Method not allowed"},405);
  if(!sameOrigin(request))return json({error:"Cross-origin request denied"},403);
  const raw=await request.json().catch(()=>({}));
  const sku=upper(raw.sku);const product=SOK_FULL_LINE_BY_SKU[sku];
  if(!product)return json({error:"SOK product not found"},404);
  const intents=new Set(["purchase_options","product","commercial","hawaii"]);
  let inquiryIntent=clean(raw.intent,40).toLowerCase();if(!intents.has(inquiryIntent))inquiryIntent="purchase_options";
  const name=clean(raw.name,120),email=clean(raw.email,180).toLowerCase(),phone=clean(raw.phone,60),destination=upper(raw.destinationState,2),quantity=Math.max(1,Math.min(1000,integer(raw.quantity,1)));
  const company=clean(raw.company,180),postalCode=clean(raw.postalCode,24),intendedUse=clean(raw.intendedUse,400),demandType=clean(raw.demandType,40).toLowerCase()==="recurring"?"recurring":"one_time";
  const island=clean(raw.hawaiiIsland,80),siteType=clean(raw.siteType,40),productUrl=clean(raw.productUrl,1000),notes=clean(raw.notes,2000);
  if(!name||(!validEmail(email)&&!validPhone(phone)))return json({error:"Name and a valid email or phone are required"},400);
  if(product.publicPurchaseMode==="COMMERCIAL_ONLY")inquiryIntent="commercial";
  if(inquiryIntent==="hawaii"&&!product.batteryRelevant)return json({error:"Hawaii battery review is not applicable to this product"},400);
  const commercial=inquiryIntent==="commercial"||(destination==="HI"&&quantity>3)||product.publicPurchaseMode==="COMMERCIAL_ONLY";
  const db=await ensureSokAvailabilitySchema(env);
  await addColumn(db,"ALTER TABLE eus_sok_customer_reservations ADD COLUMN hawaii_island TEXT NOT NULL DEFAULT ''");
  await addColumn(db,"ALTER TABLE eus_sok_customer_reservations ADD COLUMN site_type TEXT NOT NULL DEFAULT ''");
  let availabilityMode="purchase_options";
  if(sku==="SK12V100PC"||sku==="SK48V100N"){try{const row=await db.prepare("SELECT availability_mode FROM eus_sok_product_ops WHERE upper(sku)=? LIMIT 1").bind(sku).first();availabilityMode=clean(row?.availability_mode,30)||availabilityMode;}catch(_){}}
  const id=`SOK-RES-${crypto.randomUUID()}`,stamp=now();
  const context=[notes,productUrl?`Product URL: ${productUrl}`:"",`Public product: ${product.id}`].filter(Boolean).join("; ");
  await db.prepare("INSERT INTO eus_sok_customer_reservations (id,sku,quantity,availability_mode,destination_state,customer_name,customer_email,customer_phone,customer_notes,status,commercial_quantity,created_at,updated_at,inquiry_intent,company,postal_code,intended_use,demand_type,hawaii_island,site_type) VALUES (?,?,?,?,?,?,?,?,?,'RECEIVED',?,?,?,?,?,?,?,?,?,?,?)").bind(id,sku,quantity,availabilityMode,destination,name,email,phone,context,commercial?1:0,stamp,stamp,inquiryIntent,company,postalCode,intendedUse,demandType,island,siteType).run();
  try{await db.prepare("INSERT INTO eus_sok_events (id,entity_type,entity_id,action,details_json,actor,created_at) VALUES (?,?,?,?,?,?,?)").bind(`SOK-EVT-${crypto.randomUUID()}`,"customer_reservation",id,"received",JSON.stringify({sku,quantity,destination,inquiryIntent,demandType,commercialQuantity:commercial,hawaiiIsland:island,siteType}),"public-reservation",stamp).run();}catch(_){}
  const status=commercial?"COMMERCIAL INQUIRY RECEIVED":inquiryIntent==="hawaii"?"HAWAII PURCHASE REQUEST RECEIVED":inquiryIntent==="product"?"PRODUCT INQUIRY RECEIVED":"PURCHASE REQUEST RECEIVED";
  const nextStep=commercial?"Elevation will review the requested configuration and contact you with the appropriate commercial path.":inquiryIntent==="hawaii"?"Elevation will confirm the product-specific Hawaii freight path before payment is required.":"Elevation will confirm sourcing, timing and the appropriate purchase path before the order advances.";
  return json({ok:true,reservationId:id,sku,quantity,status,paymentCollected:false,nextStep},201);
}

export async function handleSokFullLinePublicApi(request,env,pathname){
  try{
    if(pathname==="/api/sok/catalog"&&request.method==="GET")return json({products:await publicSokFullCatalog(env)});
    if(pathname==="/api/sok/reservations")return createFullLineReservation(request,env);
    return json({error:"Not found"},404);
  }catch(error){console.error(JSON.stringify({event:"sok_full_line_public_error",message:clean(error?.message,240)}));return json({error:"SOK request failed"},500);}
}

function priceMarkup(product){return Number(product.priceCents)>0?`<p class="sok-product-price">$${(Number(product.priceCents)/100).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2})}</p>`:`<p class="sok-product-price sok-product-price--options">See Purchase Options</p>`;}
function actionsMarkup(product){
  const po=`/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=purchase_options`;
  const commercial=`/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=commercial`;
  const inquiry=`/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=product`;
  const primary=product.publicPurchaseMode==="COMMERCIAL_ONLY"?`<a class="button button-primary" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>`:`<a class="button button-primary" data-sok-page-action="purchase-options" href="${po}">See Purchase Options</a>`;
  const hawaii=product.batteryRelevant?`<a class="button button-outline" data-sok-page-action="hawaii" href="/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=hawaii&state=HI">Check Hawaii Availability</a>`:"";
  return `<div class="sok-product-actions">${primary}<a class="button button-outline" data-sok-page-action="email" href="${inquiry}">Email Us About This Product</a><a class="button button-outline" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>${hawaii}</div><p class="sok-public-email">Public inquiry destination: ${PUBLIC_EMAIL}</p>`;
}
function renderFacts(product){const facts=[product.voltage,product.capacity,product.energy,product.category].filter(Boolean);return facts.map(v=>`<span>${esc(v)}</span>`).join("");}
function renderList(values){return (values||[]).map(v=>`<li>${esc(v)}</li>`).join("");}
function renderSpecs(specs){return Object.entries(specs||{}).map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");}
function renderDownloads(product){if(!(product.downloads||[]).length)return`<p>Customer-facing literature will be attached here when an approved public file is available.</p>`;return product.downloads.map(d=>`<a class="sok-literature-link" href="${esc(d.url)}">${esc(d.label)}</a>`).join("");}
function renderGallery(product){const images=(product.images||[product.primaryImage]).filter(Boolean);if(images.length<2)return"";return `<section class="sok-product-section sok-product-section--wide"><p class="eyebrow">PRODUCT MEDIA</p><h2>Approved SOK product imagery.</h2><div class="sok-product-gallery">${images.map((src,i)=>`<a class="sok-gallery-item" data-sok-page-action="media" data-sok-media-index="${i+1}" href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(product.title)}${i?" system example":""}" loading="lazy" decoding="async"><span>${i===0?"Product view":"System / rack example — components shown may be sold separately"}</span></a>`).join("")}</div></section>`;}

export async function handleSokFullLinePage(request,env,pathname){
  if(request.method!=="GET"&&request.method!=="HEAD")return new Response("Method not allowed",{status:405});
  const match=pathname.match(/^\/sok\/([^/]+)\/?$/i);if(!match)return null;
  const product=SOK_FULL_LINE_BY_SLUG[decodeURIComponent(match[1]).toLowerCase()];if(!product)return new Response("Not found",{status:404,headers:{"Content-Type":"text/plain; charset=utf-8"}});
  const live=(await publicSokFullCatalog(env)).find(p=>upper(p.sku)===upper(product.sku))||product;
  const canonical=`https://elevationupscales.com${product.detailUrl}`;
  const meta=`${product.title} from Elevation UpScales, an Authorized SOK Energy Dealer. View product details, purchase options, commercial pricing${product.batteryRelevant?" and Hawaii availability":""}.`;
  const structured={"@context":"https://schema.org","@type":"Product",name:product.title,sku:product.sku,brand:{"@type":"Brand",name:"SOK Energy"},description:product.description,image:`https://elevationupscales.com${product.primaryImage}`,url:canonical};
  const hawaii=product.batteryRelevant?`<section class="sok-product-section"><p class="eyebrow">HAWAII</p><h2>Freight Review Required</h2><p>Hawaii battery requests remain commercially actionable. Submit the model, quantity and destination; Elevation selects and prices the appropriate logistics path. Standard requests are 1–3 batteries. Quantity 4+ routes to commercial review.</p></section>`:"";
  const cabinetNote=product.productType==="cabinet"?`<p class="sok-product-caution"><strong>Cabinet configuration:</strong> This listing is for the cabinet/hardware configuration described here. Batteries are not included unless an Elevation offer explicitly states that they are included.</p>`:"";
  const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#050505"><title>${esc(product.title)} | Elevation UpScales</title><meta name="description" content="${esc(meta)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="product"><meta property="og:title" content="${esc(product.title)}"><meta property="og:description" content="${esc(meta)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://elevationupscales.com${esc(product.primaryImage)}"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="stylesheet" href="/styles.css?v=3.0.3"><link rel="stylesheet" href="/site-shell.css?v=3.11.30"><link rel="stylesheet" href="/sok-commercialization.css?v=4.8.0"><script defer src="/site-shell.js?v=4.8.0"></script><script defer src="/sok-static-product.js?v=4.8.0"></script><script type="application/ld+json">${JSON.stringify(structured).replace(/</g,"\\u003c")}</script></head><body class="store-page sok-product-page" data-sok-sku="${esc(product.sku)}"><a class="skip-link" href="#product">Skip to product</a><header class="eus-header"><div class="container eus-header__inner"><a class="eus-brand" href="/" aria-label="Elevation UpScales home"><img src="/assets/logo-mark.webp" width="128" height="80" alt="Elevation UpScales"><span class="eus-wordmark"><strong>ELEVATION</strong><span class="eus-wordmark__sub">UPSCALES</span><small class="eus-wordmark__tagline">Elevate the Experience</small></span></a><a class="button button-outline" href="/sok-batteries">Full SOK Catalog</a></div></header><main id="product"><section class="sok-product-hero"><div class="container sok-product-hero__grid"><figure><img src="${esc(product.primaryImage)}" alt="${esc(product.title)}" loading="eager" decoding="async"></figure><div><p class="eyebrow">AUTHORIZED SOK ENERGY DEALER · ${esc(product.sku)}</p><h1>${esc(product.title)}</h1><div class="sok-product-facts">${renderFacts(product)}</div>${priceMarkup(live)}<p>${esc(product.description)}</p>${cabinetNote}${actionsMarkup(live)}</div></div></section><section class="sok-product-content"><div class="container sok-product-content__grid"><section class="sok-product-section"><p class="eyebrow">BEST FOR</p><h2>Where this product fits.</h2><ul>${renderList(product.bestFor)}</ul></section><section class="sok-product-section"><p class="eyebrow">KEY FEATURES</p><h2>Model-specific highlights.</h2><ul>${renderList(product.features)}</ul></section><section class="sok-product-section sok-product-section--wide"><p class="eyebrow">SPECIFICATIONS</p><h2>Useful product details.</h2><dl class="sok-product-specs">${renderSpecs(product.specs)}</dl></section>${renderGallery(product)}<section class="sok-product-section"><p class="eyebrow">LITERATURE</p><h2>Product documents.</h2>${renderDownloads(product)}</section><section class="sok-product-section"><p class="eyebrow">COMMERCIAL ORDERS</p><h2>Volume, installers and recurring supply.</h2><p>Commercial pricing remains available whether or not consumer checkout is enabled.</p><a class="button button-outline" data-sok-page-action="commercial" href="/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=commercial">Request Commercial Pricing</a></section>${hawaii}</div></section></main><footer class="site-footer"><div class="container"><p>Elevation UpScales, Inc. · Authorized SOK Energy Dealer · <a href="/sok-batteries">SOK Catalog</a></p></div></footer></body></html>`;
  if(request.method==="HEAD")return new Response(null,{status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=300"}});
  return new Response(html,{status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=300","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin"}});
}

export const __sokFullLineTest={PUBLIC_EMAIL,SOK_FULL_LINE_PUBLIC,SOK_FULL_LINE_BY_SKU,SOK_FULL_LINE_BY_SLUG};
