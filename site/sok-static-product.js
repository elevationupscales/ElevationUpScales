(()=>{"use strict";
const sku=String(document.body.dataset.sokSku||"").trim().toUpperCase();
if(!sku)return;
if(!document.querySelector('link[data-sok-shopability-style]')){const link=document.createElement("link");link.rel="stylesheet";link.href="/sok-shopability.css?v=4.9.0";link.dataset.sokShopabilityStyle="true";document.head.append(link);}
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const track=(type,details={})=>window.EUSIntent?.track?.(type,sku,{source:"sok-product-page",sku,...details});
const filterFor=p=>{
  const voltage=String(p?.voltage||"").toLowerCase(),type=String(p?.productType||"").toLowerCase(),category=String(p?.category||"").toLowerCase();
  if(type==="charger")return"chargers";
  if(type==="monitor"||type==="bms"||category.includes("monitoring"))return"monitoring";
  if(["cable","communication-cable","rack-accessory","cabinet"].includes(type)||category.includes("accessor"))return"accessories";
  if(voltage.startsWith("12"))return"12v";
  if(voltage.startsWith("24"))return"24v";
  if(voltage.startsWith("48")||voltage.startsWith("51"))return"48v";
  return"all";
};
const productLink=p=>p?.detailUrl||`/sok/${encodeURIComponent(String(p?.slug||""))}/`;
const purchaseLink=p=>p?.publicPurchaseMode==="COMMERCIAL_ONLY"?(p?.commercialUrl||`/sok-order.html?sku=${encodeURIComponent(p?.sku||"")}&intent=commercial`):(p?.purchaseUrl||p?.purchaseOptionsUrl||`/sok-order.html?sku=${encodeURIComponent(p?.sku||"")}&intent=purchase_options`);
const money=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
function scoreRelated(current,candidate){
  if(!candidate||candidate.sku===current.sku)return-999;
  let score=0;
  if(String(candidate.voltage||"")===String(current.voltage||""))score+=5;
  if(String(candidate.productType||"")===String(current.productType||""))score+=4;
  if(String(candidate.category||"")===String(current.category||""))score+=3;
  const currentUses=new Set((current.bestFor||[]).map(x=>String(x).toLowerCase()));
  score+=(candidate.bestFor||[]).filter(x=>currentUses.has(String(x).toLowerCase())).length;
  const currentType=String(current.productType||"");
  const candidateType=String(candidate.productType||"");
  if(currentType==="battery"&&["charger","monitor","bms","rack-accessory","cable","communication-cable","cabinet"].includes(candidateType))score+=2;
  if(currentType!=="battery"&&candidateType==="battery")score+=2;
  return score;
}
function relatedCard(p){
  const facts=[p.voltage,p.capacity,p.energy].filter(Boolean).slice(0,2).map(v=>`<span>${esc(v)}</span>`).join("");
  const price=Number(p.priceCents)>0?money.format(Number(p.priceCents)/100):"See Purchase Options";
  return `<article class="sok-related-card"><a class="sok-related-card__image" data-sok-page-action="related" href="${esc(productLink(p))}"><img src="${esc(p.primaryImage)}" alt="${esc(p.title)}" loading="lazy" decoding="async"></a><div class="sok-related-card__body"><p class="eyebrow">${esc(p.category||"SOK")}</p><h3><a data-sok-page-action="related" href="${esc(productLink(p))}">${esc(p.title)}</a></h3><div class="sok-related-card__facts">${facts}</div><p class="sok-related-card__price">${esc(price)}</p><div class="sok-related-card__actions"><a class="button button-outline" data-sok-page-action="related" href="${esc(productLink(p))}">View Product</a><a class="sok-related-card__purchase" data-sok-page-action="related-purchase" href="${esc(purchaseLink(p))}">${p.publicPurchaseMode==="COMMERCIAL_ONLY"?"Commercial Pricing":"Purchase Options"} →</a></div></div></article>`;
}
async function enhanceShopability(){
  try{
    const response=await fetch("/api/sok/catalog",{credentials:"same-origin",headers:{Accept:"application/json"},cache:"no-store"});
    if(!response.ok)throw new Error("catalog");
    const data=await response.json();
    const products=(Array.isArray(data.products)?data.products:[]).filter(p=>String(p.catalogStatus||"PUBLISHED").toUpperCase()==="PUBLISHED");
    const current=products.find(p=>String(p.sku||"").toUpperCase()===sku);
    if(!current)return;
    const main=document.querySelector("main#product")||document.querySelector("main");
    const content=document.querySelector(".sok-product-content .container");
    if(!main||!content||document.querySelector("[data-sok-shopability]"))return;

    const currentFilter=filterFor(current);
    const nav=document.createElement("nav");
    nav.className="sok-product-nav";
    nav.dataset.sokShopability="true";
    nav.setAttribute("aria-label","SOK shopping navigation");
    nav.innerHTML=`<div class="container sok-product-nav__inner"><a href="/sok-batteries">SOK Catalog</a><span aria-hidden="true">/</span><a href="/sok-batteries?filter=${encodeURIComponent(currentFilter)}#sok-products">${esc(current.category||"Browse products")}</a><span aria-hidden="true">/</span><strong>${esc(sku)}</strong><a class="sok-product-nav__all" href="/sok-batteries#sok-products">Browse all SOK →</a></div>`;
    main.insertBefore(nav,main.firstElementChild?.nextSibling||main.firstChild);

    const categoryRail=document.createElement("section");
    categoryRail.className="sok-product-section sok-product-section--wide sok-category-rail";
    categoryRail.innerHTML=`<p class="eyebrow">KEEP SHOPPING</p><h2>Browse the SOK lineup.</h2><p>Compare batteries and supporting hardware without losing your place in the catalog.</p><div class="sok-category-links"><a href="/sok-batteries?filter=12v#sok-products">12V Batteries</a><a href="/sok-batteries?filter=24v#sok-products">24V Batteries</a><a href="/sok-batteries?filter=48v#sok-products">48V / Rack</a><a href="/sok-batteries?filter=chargers#sok-products">Chargers</a><a href="/sok-batteries?filter=monitoring#sok-products">Monitoring</a><a href="/sok-batteries?filter=accessories#sok-products">Accessories</a></div>`;
    content.prepend(categoryRail);

    const related=products.map(p=>({p,score:scoreRelated(current,p)})).filter(x=>x.score>-999).sort((a,b)=>b.score-a.score||String(a.p.title||"").localeCompare(String(b.p.title||""))).slice(0,4).map(x=>x.p);
    if(related.length){
      const section=document.createElement("section");
      section.className="sok-product-section sok-product-section--wide sok-related-section";
      section.innerHTML=`<div class="sok-related-head"><div><p class="eyebrow">RELATED SOK PRODUCTS</p><h2>Compare the next pieces in the system.</h2><p>These are separate SOK products selected by voltage, category and common application. Verify final system compatibility before ordering.</p></div><a href="/sok-batteries?filter=${encodeURIComponent(currentFilter)}#sok-products">See more ${esc(current.category||"SOK products")} →</a></div><div class="sok-related-grid">${related.map(relatedCard).join("")}</div>`;
      content.append(section);
    }
    track("sok_shopability_loaded",{category:current.category||"",relatedCount:related.length});
  }catch(_){}
}
track("sok_product_view");
document.addEventListener("click",e=>{
  const a=e.target.closest("[data-sok-page-action]");
  if(!a)return;
  const action=a.dataset.sokPageAction;
  if(action==="media")track("sok_media_view",{mediaIndex:a.dataset.sokMediaIndex||""});
  else if(action==="hawaii")track("hawaii_options_open",{stage:"product-page"});
  else if(action==="commercial")track("commercial_review_route",{stage:"product-page"});
  else if(action==="related")track("sok_related_product_open",{href:a.getAttribute("href")||""});
  else if(action==="related-purchase")track("purchase_options_open",{stage:"related-product",href:a.getAttribute("href")||""});
  else track("purchase_options_open",{stage:"product-page",intent:action});
});
enhanceShopability();
})();