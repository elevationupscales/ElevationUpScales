(() => {
  "use strict";

  const root=document.querySelector("[data-home-commerce]");
  if(!root)return;

  const lithiumHost=root.querySelector("[data-home-products='lithium']");
  const rvHost=root.querySelector("[data-home-products='rv']");
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const money=(cents)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format((Number(cents)||0)/100);
  const track=(type,value,details={})=>window.EUSIntent?.track?.(type,value,{source:"homepage-commerce",...details});

  function installLogisticsStyles(){
    if(document.querySelector('link[href*="home-logistics-capability.css"]'))return;
    const link=document.createElement("link");
    link.rel="stylesheet";
    link.href="/home-logistics-capability.css?v=4.9.0";
    document.head.append(link);
  }

  function installLogisticsCapability(){
    const sokSection=document.querySelector("[data-home-sok]");
    if(!sokSection||document.querySelector("[data-home-logistics-capability]"))return;
    const section=document.createElement("section");
    section.className="home-logistics-capability";
    section.dataset.homeLogisticsCapability="true";
    section.setAttribute("aria-labelledby","home-logistics-capability-title");
    section.innerHTML=`<div class="container"><div class="home-logistics-capability__grid"><div class="home-logistics-capability__copy"><p class="hc-eyebrow">OFF-GRID POWER • SUPPLY • LOGISTICS • MARKET ACCESS</p><h2 id="home-logistics-capability-title">Power supply beyond simple ecommerce.</h2><p class="home-logistics-capability__lead">Elevation helps customers and partners find the right power product, understand the purchase path and coordinate the next step when normal parcel shipping or one-click checkout is not enough—especially for lithium batteries, Hawaii and larger commercial demand.</p><div class="home-logistics-capability__path" aria-label="Elevation customer path"><span><small>01</small><strong>Choose the power solution</strong></span><span><small>02</small><strong>Confirm quantity &amp; destination</strong></span><span><small>03</small><strong>Elevation builds the route</strong></span><span><small>04</small><strong>Purchase or assisted fulfillment</strong></span></div><div class="home-logistics-capability__answers"><article><h3>WHAT WE DO</h3><p>Batteries, solar/off-grid supply, logistics coordination and practical market access.</p></article><article><h3>WHO WE HELP</h3><p>RV owners, off-grid customers, installers, commercial buyers and harder-to-serve destinations.</p></article><article><h3>THE PROBLEM</h3><p>Some products are easy to find but difficult to source, move or fulfill through normal ecommerce.</p></article><article><h3>THE NEXT STEP</h3><p>Find the product first, then buy directly or use the short product-aware purchase path.</p></article></div><div class="home-logistics-capability__actions"><a class="button button-primary" data-home-logistics-action="sok" href="/sok-batteries">Explore SOK Battery Systems</a><a class="button button-outline" data-home-logistics-action="hawaii" href="/hawaii-lithium-batteries">Hawaii Power &amp; Logistics</a><a class="button button-outline" data-home-logistics-action="lithium" href="/lithium-batteries">Shop Lithium Batteries</a></div></div><div class="home-logistics-capability__media"><img src="/assets/elevation-lithium-social-card.webp" alt="Elevation UpScales lithium, off-grid power and logistics" loading="lazy" decoding="async"><div class="home-logistics-capability__badge"><small>AUTHORIZED SOK ENERGY DEALER</small><strong>12V mobile power to 48V storage.</strong><span>Product discovery, purchase options and Hawaii/commercial support through Elevation.</span></div></div></div></div>`;
    sokSection.insertAdjacentElement("beforebegin",section);
    section.addEventListener("click",(event)=>{
      const link=event.target.closest("[data-home-logistics-action]");
      if(!link)return;
      track("homepage_logistics_route",link.dataset.homeLogisticsAction||"unknown",{destination:link.getAttribute("href")||""});
    });
    track("homepage_logistics_capability_view","home");
  }

  function card(item){
    const title=String(item.title||"Elevation product");
    const image=String(item.image||"/assets/logo.webp");
    const spec=String(item.spec||item.status||"");
    const detail=String(item.detailUrl||item.buyUrl||"#");
    const buy=String(item.buyUrl||item.detailUrl||"#");
    const id=String(item.sku||item.id||title).slice(0,120);
    return `<article class="home-product-card" data-home-product-id="${esc(id)}"><a class="home-product-card__image" data-home-product-action="detail" href="${esc(detail)}"><img src="${esc(image)}" alt="${esc(title)}" width="480" height="360" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a><div class="home-product-card__body"><h3><a data-home-product-action="detail" href="${esc(detail)}">${esc(title)}</a></h3>${spec?`<p>${esc(spec)}</p>`:""}<strong>${money(item.priceCents)}</strong><div class="home-product-card__actions"><a class="button button-primary" data-home-product-action="buy" href="${esc(buy)}">Buy Now</a>${item.detailUrl?`<a class="button button-outline" data-home-product-action="detail" href="${esc(detail)}">View Details</a>`:""}</div></div></article>`;
  }

  function render(host,rows){
    if(!host)return;
    if(!Array.isArray(rows)||!rows.length){
      host.innerHTML='<p class="home-commerce-empty">Current products are temporarily unavailable. Shop the full store for current availability.</p>';
      return;
    }
    host.innerHTML=rows.slice(0,4).map(card).join("");
  }

  root.addEventListener("click",(event)=>{
    const link=event.target.closest("[data-home-product-action]");
    if(!link)return;
    const cardElement=link.closest("[data-home-product-id]");
    const id=cardElement?.dataset.homeProductId||"product";
    const action=link.dataset.homeProductAction||"detail";
    track(action==="buy"?"homepage_product_buy_open":"homepage_product_detail_open",id,{destination:link.getAttribute("href")||""});
  });

  async function load(){
    try{
      const response=await fetch("/api/store/featured",{headers:{Accept:"application/json"},cache:"default"});
      const data=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(data.error||"Featured products unavailable");
      render(lithiumHost,data.lithium);
      render(rvHost,data.rv);
      root.dataset.loaded="true";
    }catch(_){
      render(lithiumHost,[]);
      render(rvHost,[]);
    }
  }

  installLogisticsStyles();
  installLogisticsCapability();

  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver((entries)=>{
      if(entries.some((entry)=>entry.isIntersecting)){
        observer.disconnect();
        load();
      }
    },{rootMargin:"500px 0px"});
    observer.observe(root);
  }else load();
})();
