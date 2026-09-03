(() => {
  "use strict";
  const root=document.querySelector("[data-home-commerce]");
  if(!root)return;
  const lithiumHost=root.querySelector("[data-home-products='lithium']");
  const rvHost=root.querySelector("[data-home-products='rv']");
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const money=(cents)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format((Number(cents)||0)/100);
  function card(item){const title=String(item.title||"Elevation product"),image=String(item.image||"/assets/logo.webp"),spec=String(item.spec||item.status||"");return `<article class="home-product-card"><a class="home-product-card__image" href="${esc(item.detailUrl||item.buyUrl||'#')}"><img src="${esc(image)}" alt="${esc(title)}" width="480" height="360" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a><div class="home-product-card__body"><h3><a href="${esc(item.detailUrl||item.buyUrl||'#')}">${esc(title)}</a></h3>${spec?`<p>${esc(spec)}</p>`:""}<strong>${money(item.priceCents)}</strong><div class="home-product-card__actions"><a class="button button-primary" href="${esc(item.buyUrl||item.detailUrl||'#')}">Buy Now</a>${item.detailUrl?`<a class="button button-outline" href="${esc(item.detailUrl)}">View Details</a>`:""}</div></div></article>`;}
  function render(host,rows){if(!host)return;if(!Array.isArray(rows)||!rows.length){host.innerHTML='<p class="home-commerce-empty">Current products are temporarily unavailable. Shop the full store for current availability.</p>';return;}host.innerHTML=rows.slice(0,4).map(card).join("");}
  async function load(){try{const response=await fetch("/api/store/featured",{headers:{Accept:"application/json"},cache:"default"});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||"Featured products unavailable");render(lithiumHost,data.lithium);render(rvHost,data.rv);root.dataset.loaded="true";}catch(_){render(lithiumHost,[]);render(rvHost,[]);}}
  if("IntersectionObserver" in window){const observer=new IntersectionObserver((entries)=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();load();}},{rootMargin:"500px 0px"});observer.observe(root);}else load();
})();
