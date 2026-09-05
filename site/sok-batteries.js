(()=>{"use strict";
const grid=document.querySelector("[data-sok-grid]"),status=document.querySelector("[data-sok-status]");
if(!grid)return;
if(!document.querySelector('link[data-sok-shopability-style]')){const link=document.createElement("link");link.rel="stylesheet";link.href="/sok-shopability.css?v=4.9.0";link.dataset.sokShopabilityStyle="true";document.head.append(link);}
const money=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const allowedFilters=new Set(["all","12v","24v","48v","rack","rv","marine","solar","backup","chargers","monitoring","accessories"]);
const requestedFilter=String(new URLSearchParams(location.search).get("filter")||"all").toLowerCase();
let products=[],filter=allowedFilters.has(requestedFilter)?requestedFilter:"all";
const track=(type,value,details={})=>window.EUSIntent?.track?.(type,value,{source:"sok-batteries",...details});
const has=(p,v)=>(p.bestFor||[]).some(x=>String(x).toLowerCase().includes(v));
function matches(p){
  const v=String(p.voltage||"").toLowerCase(),cat=String(p.category||"").toLowerCase(),type=String(p.productType||"").toLowerCase();
  if(filter==="all")return true;
  if(filter==="12v")return v.startsWith("12");
  if(filter==="24v")return v.startsWith("24");
  if(filter==="48v")return v.startsWith("48")||v.startsWith("51");
  if(filter==="rack")return cat.includes("rack")||has(p,"rack");
  if(filter==="rv")return has(p,"rv")||has(p,"van");
  if(filter==="marine")return has(p,"marine");
  if(filter==="solar")return has(p,"solar")||has(p,"off-grid");
  if(filter==="backup")return has(p,"backup");
  if(filter==="chargers")return type==="charger";
  if(filter==="monitoring")return cat.includes("monitoring")||type==="monitor"||type==="bms";
  if(filter==="accessories")return cat.includes("accessories")||["cable","communication-cable","rack-accessory","cabinet"].includes(type);
  return true;
}
function facts(p){return[p.voltage,p.capacity,p.energy].filter(Boolean).slice(0,3)}
function mediaStrip(p){
  const images=[p.primaryImage,...(Array.isArray(p.images)?p.images:[])].filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3);
  if(images.length<2)return"";
  return `<div class="sok-card__media-strip" aria-label="Additional approved product media">${images.map((src,i)=>`<span class="${i===0?"is-primary":""}"><img src="${esc(src)}" alt="" loading="lazy" decoding="async"></span>`).join("")}</div>`;
}
function bestFor(p){
  const uses=(p.bestFor||[]).slice(0,3);
  if(!uses.length)return"";
  return `<div class="sok-card__uses" aria-label="Best for">${uses.map(x=>`<span>${esc(x)}</span>`).join("")}</div>`;
}
function card(p){
  const detail=p.detailUrl||`/sok/${encodeURIComponent(p.slug)}/`;
  const primary=p.publicPurchaseMode==="COMMERCIAL_ONLY"?p.commercialUrl:(p.purchaseUrl||p.purchaseOptionsUrl);
  const primaryLabel=p.publicPurchaseMode==="COMMERCIAL_ONLY"?"Request Commercial Pricing":(p.commerceCta||"See Purchase Options");
  const price=Number(p.priceCents)>0?money.format(Number(p.priceCents)/100):"See Purchase Options";
  const hawaii=p.batteryRelevant?`<a data-sok-action="hawaii" href="${esc(p.hawaiiUrl)}">Hawaii Freight Review</a>`:"";
  return `<article class="sok-card sok-card--full" data-sok-sku="${esc(p.sku)}"><a class="sok-card__media" data-sok-action="product" href="${esc(detail)}"><img src="${esc(p.primaryImage)}" alt="${esc(p.title)}" loading="lazy" decoding="async"></a>${mediaStrip(p)}<div class="sok-card__body"><p class="eyebrow">${esc(p.category)} · ${esc(p.sku)}</p><h3><a data-sok-action="product" href="${esc(detail)}">${esc(p.title)}</a></h3><div class="sok-card__facts">${facts(p).map(x=>`<span>${esc(x)}</span>`).join("")}</div>${bestFor(p)}<p class="sok-card__price${Number(p.priceCents)>0?"":" sok-card__price--options"}">${esc(price)}</p><p>${esc(p.description||"")}</p><div class="sok-card__actions"><a class="button button-primary" data-sok-action="purchase-options" href="${esc(primary)}">${esc(primaryLabel)}</a><a class="button button-outline" data-sok-action="product" href="${esc(detail)}">View Product</a></div><div class="sok-card__links"><a data-sok-action="product-inquiry" href="/sok-order.html?sku=${encodeURIComponent(p.sku)}&intent=product">Email / Ask About Product</a><a data-sok-action="commercial" href="${esc(p.commercialUrl)}">Commercial Pricing</a>${hawaii}${(p.downloads||[]).map(d=>`<a href="${esc(d.url)}">${esc(d.label)}</a>`).join("")}</div></div></article>`;
}
function syncFilterUi(){
  document.querySelectorAll("[data-sok-filter]").forEach(btn=>btn.classList.toggle("is-active",(btn.dataset.sokFilter||"all")===filter));
}
function render(){
  const rows=products.filter(matches);
  grid.innerHTML=rows.map(card).join("");
  status.textContent=`${rows.length} of ${products.length} SOK products`;
  if(!rows.length)grid.innerHTML="<p>No products match this filter.</p>";
  syncFilterUi();
}
document.querySelectorAll("[data-sok-filter]").forEach(btn=>btn.addEventListener("click",()=>{
  filter=allowedFilters.has(btn.dataset.sokFilter)?btn.dataset.sokFilter:"all";
  const url=new URL(location.href);
  if(filter==="all")url.searchParams.delete("filter");else url.searchParams.set("filter",filter);
  history.replaceState(null,"",`${url.pathname}${url.search}${location.hash||"#sok-products"}`);
  track("sok_catalog_filter",filter);
  render();
}));
grid.addEventListener("click",e=>{
  const a=e.target.closest("a[data-sok-action]");
  if(!a)return;
  const sku=a.closest("[data-sok-sku]")?.dataset.sokSku||"",action=a.dataset.sokAction;
  const event=action==="commercial"?"commercial_review_route":action==="hawaii"?"hawaii_options_open":action==="product"?"sok_product_open":action==="product-inquiry"?"sok_product_inquiry_open":"purchase_options_open";
  track(event,sku,{stage:"collection"});
});
syncFilterUi();
track("sok_catalog_view","sok-batteries",{initialFilter:filter});
fetch("/api/sok/catalog",{credentials:"same-origin",headers:{Accept:"application/json"},cache:"no-store"}).then(r=>{
  if(!r.ok)throw new Error("Unable to load current SOK catalog");
  return r.json();
}).then(d=>{
  products=(Array.isArray(d.products)?d.products:[]).filter(p=>String(p.catalogStatus||"PUBLISHED").toUpperCase()==="PUBLISHED");
  render();
}).catch(err=>{
  status.textContent=err.message;
  grid.innerHTML='<p>Current SOK purchase options could not be loaded. Please try again or email casey@elevationupscales.com.</p>';
});
})();