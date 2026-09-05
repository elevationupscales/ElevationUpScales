(()=>{
  "use strict";

  const sku=String(document.body.dataset.sokSku||"").trim().toUpperCase();
  if(!sku)return;

  const track=(type,details={})=>window.EUSIntent?.track?.(type,sku,{source:"sok-product-page",sku,...details});
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function installPresentationStyles(){
    if(document.querySelector('link[href*="sok-storefront-v2.css"]'))return;
    const link=document.createElement("link");
    link.rel="stylesheet";
    link.href="/sok-storefront-v2.css?v=4.9.0";
    document.head.append(link);
  }

  function installBreadcrumbs(){
    const main=document.querySelector("main#product");
    const hero=document.querySelector(".sok-product-hero");
    const title=document.querySelector(".sok-product-hero h1")?.textContent?.trim()||sku;
    if(!main||!hero||document.querySelector("[data-sok-breadcrumbs]"))return;
    const nav=document.createElement("nav");
    nav.className="sok-breadcrumbs container";
    nav.dataset.sokBreadcrumbs="true";
    nav.setAttribute("aria-label","Breadcrumb");
    nav.innerHTML=`<a href="/">Home</a><span aria-hidden="true">/</span><a href="/sok-batteries">SOK Battery Systems</a><span aria-hidden="true">/</span><span aria-current="page">${esc(title)}</span>`;
    main.insertBefore(nav,hero);
  }

  function installCapabilityStrip(){
    const heroGrid=document.querySelector(".sok-product-hero__grid");
    if(!heroGrid||document.querySelector("[data-sok-capability-strip]"))return;
    const strip=document.createElement("div");
    strip.className="sok-capability-strip sok-capability-strip--product";
    strip.dataset.sokCapabilityStrip="true";
    strip.innerHTML=`<span><strong>POWER SOLUTIONS</strong><small>Model-specific SOK products</small></span><span aria-hidden="true">→</span><span><strong>SUPPLY ACCESS</strong><small>Purchase options by product</small></span><span aria-hidden="true">→</span><span><strong>LOGISTICS</strong><small>Destination-aware coordination</small></span><span aria-hidden="true">→</span><span><strong>HAWAII / COMMERCIAL</strong><small>Review when the route needs more</small></span>`;
    heroGrid.insertAdjacentElement("afterend",strip);
  }

  function tierActions(){
    const actions=document.querySelector(".sok-product-actions");
    if(!actions||actions.dataset.sokTiered==="true")return;
    actions.dataset.sokTiered="true";

    const links=[...actions.querySelectorAll("a[href]")];
    const seen=new Set();
    const unique=links.filter((link)=>{
      const key=`${link.getAttribute("href")}|${link.textContent.trim()}`;
      if(seen.has(key))return false;
      seen.add(key);
      return true;
    });

    const primary=unique.find((link)=>link.classList.contains("button-primary"))||unique[0];
    const hawaii=unique.find((link)=>link.dataset.sokPageAction==="hawaii");
    const secondary=unique.filter((link)=>link!==primary&&link!==hawaii);

    const mainRow=document.createElement("div");
    mainRow.className="sok-product-actions__primary";
    if(primary)mainRow.append(primary);
    if(hawaii)mainRow.append(hawaii);

    const details=document.createElement("details");
    details.className="sok-product-actions__more";
    const summary=document.createElement("summary");
    summary.textContent="Other order paths";
    details.append(summary);
    const more=document.createElement("div");
    more.className="sok-product-actions__more-links";
    secondary.forEach((link)=>more.append(link));
    details.append(more);

    actions.replaceChildren(mainRow);
    if(secondary.length)actions.append(details);

    const publicEmail=document.querySelector(".sok-public-email");
    if(publicEmail)publicEmail.textContent="Questions and assisted orders go directly to Elevation UpScales.";
  }

  function renderRelated(products){
    const current=products.find((product)=>String(product.sku||"").toUpperCase()===sku);
    if(!current)return;
    const score=(product)=>{
      let points=0;
      if(product.category===current.category)points+=4;
      if(product.voltage&&current.voltage&&product.voltage===current.voltage)points+=3;
      const useCases=new Set((current.bestFor||[]).map((item)=>String(item).toLowerCase()));
      points+=(product.bestFor||[]).filter((item)=>useCases.has(String(item).toLowerCase())).length;
      return points;
    };
    const related=products
      .filter((product)=>String(product.sku||"").toUpperCase()!==sku)
      .map((product)=>({product,score:score(product)}))
      .filter((entry)=>entry.score>0)
      .sort((a,b)=>b.score-a.score)
      .slice(0,3)
      .map((entry)=>entry.product);
    if(!related.length)return;

    const content=document.querySelector(".sok-product-content > .container");
    if(!content||document.querySelector("[data-sok-related]"))return;
    const section=document.createElement("section");
    section.className="sok-related-products";
    section.dataset.sokRelated="true";
    section.innerHTML=`<div class="sok-related-products__head"><div><p class="eyebrow">KEEP COMPARING</p><h2>Related SOK products.</h2></div><a href="/sok-batteries">View full SOK catalog</a></div><div class="sok-related-products__grid">${related.map((product)=>`<a class="sok-related-card" data-sok-related-sku="${esc(product.sku)}" href="${esc(product.detailUrl||`/sok/${product.slug}/`)}"><img src="${esc(product.primaryImage)}" alt="${esc(product.title)}" loading="lazy" decoding="async"><span><small>${esc(product.category||"SOK Energy")}</small><strong>${esc(product.title)}</strong>${product.voltage||product.capacity?`<em>${esc([product.voltage,product.capacity,product.energy].filter(Boolean).join(" · "))}</em>`:""}</span></a>`).join("")}</div>`;
    content.append(section);
    section.addEventListener("click",(event)=>{
      const link=event.target.closest("[data-sok-related-sku]");
      if(link)track("sok_related_product_open",{relatedSku:link.dataset.sokRelatedSku||""});
    });
  }

  installPresentationStyles();
  track("sok_product_view");
  installBreadcrumbs();
  installCapabilityStrip();
  tierActions();

  document.addEventListener("click",(event)=>{
    const link=event.target.closest("[data-sok-page-action]");
    if(!link)return;
    const action=link.dataset.sokPageAction;
    if(action==="media")track("sok_media_view",{mediaIndex:link.dataset.sokMediaIndex||""});
    else if(action==="hawaii")track("hawaii_options_open",{stage:"product-page"});
    else if(action==="commercial")track("commercial_review_route",{stage:"product-page"});
    else track("purchase_options_open",{stage:"product-page",intent:action});
  });

  fetch("/api/sok/catalog",{credentials:"same-origin",headers:{Accept:"application/json"},cache:"no-store"})
    .then((response)=>response.ok?response.json():Promise.reject(new Error("catalog unavailable")))
    .then((data)=>renderRelated(Array.isArray(data.products)?data.products:[]))
    .catch(()=>{});
})();
