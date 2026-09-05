(()=>{
  "use strict";

  const grid=document.querySelector("[data-sok-grid]");
  const status=document.querySelector("[data-sok-status]");
  const search=document.querySelector("[data-sok-search]");
  if(!grid)return;

  const money=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const normalize=(value)=>String(value??"").trim().toLowerCase();
  const track=(type,value,details={})=>window.EUSIntent?.track?.(type,value,{source:"sok-batteries",...details});

  let products=[];
  let filter="all";
  let query="";
  let searchTimer=0;

  const has=(product,value)=>(product.bestFor||[]).some((item)=>normalize(item).includes(value));

  function matchesFilter(product){
    const voltage=normalize(product.voltage);
    const category=normalize(product.category);
    const type=normalize(product.productType);
    if(filter==="all")return true;
    if(filter==="12v")return voltage.startsWith("12");
    if(filter==="24v")return voltage.startsWith("24");
    if(filter==="48v")return voltage.startsWith("48")||voltage.startsWith("51");
    if(filter==="rack")return category.includes("rack")||has(product,"rack");
    if(filter==="rv")return has(product,"rv")||has(product,"van");
    if(filter==="marine")return has(product,"marine");
    if(filter==="solar")return has(product,"solar")||has(product,"off-grid");
    if(filter==="backup")return has(product,"backup");
    if(filter==="chargers")return type==="charger";
    if(filter==="monitoring")return category.includes("monitoring")||type==="monitor"||type==="bms";
    if(filter==="accessories")return category.includes("accessories")||["cable","communication-cable","rack-accessory","cabinet"].includes(type);
    return true;
  }

  function matchesSearch(product){
    if(!query)return true;
    const haystack=[
      product.title,
      product.sku,
      product.category,
      product.voltage,
      product.capacity,
      product.energy,
      product.description,
      ...(product.bestFor||[]),
      ...(product.features||[]),
    ].map(normalize).join(" ");
    return query.split(/\s+/).filter(Boolean).every((term)=>haystack.includes(term));
  }

  function facts(product){
    return [product.voltage,product.capacity,product.energy].filter(Boolean).slice(0,3);
  }

  function useCases(product){
    return (product.bestFor||[]).slice(0,3);
  }

  function card(product){
    const detail=product.detailUrl||`/sok/${encodeURIComponent(product.slug)}/`;
    const primary=product.publicPurchaseMode==="COMMERCIAL_ONLY"?product.commercialUrl:(product.purchaseUrl||product.purchaseOptionsUrl);
    const primaryLabel=product.publicPurchaseMode==="COMMERCIAL_ONLY"?"Request Commercial Pricing":(product.commerceCta||"See Purchase Options");
    const price=Number(product.priceCents)>0?money.format(Number(product.priceCents)/100):"See Purchase Options";
    const hawaii=product.batteryRelevant?`<a data-sok-action="hawaii" href="${esc(product.hawaiiUrl)}">Hawaii Availability</a>`:"";
    const literature=(product.downloads||[]).slice(0,1).map((item)=>`<a href="${esc(item.url)}">${esc(item.label)}</a>`).join("");
    const badges=useCases(product).map((item)=>`<span>${esc(item)}</span>`).join("");

    return `<article class="sok-card sok-card--full" data-sok-sku="${esc(product.sku)}">
      <a class="sok-card__media" data-sok-action="view-product" href="${esc(detail)}"><img src="${esc(product.primaryImage)}" alt="${esc(product.title)}" loading="lazy" decoding="async"></a>
      <div class="sok-card__body">
        <p class="eyebrow">${esc(product.category)} · ${esc(product.sku)}</p>
        <h3><a data-sok-action="view-product" href="${esc(detail)}">${esc(product.title)}</a></h3>
        <div class="sok-card__facts">${facts(product).map((item)=>`<span>${esc(item)}</span>`).join("")}</div>
        ${badges?`<div class="sok-card__usecases" aria-label="Common uses">${badges}</div>`:""}
        <p class="sok-card__price${Number(product.priceCents)>0?"":" sok-card__price--options"}">${esc(price)}</p>
        <p>${esc(product.description||"")}</p>
        <div class="sok-card__actions"><a class="button button-primary" data-sok-action="purchase-options" href="${esc(primary)}">${esc(primaryLabel)}</a><a class="button button-outline" data-sok-action="view-product" href="${esc(detail)}">View Product</a></div>
        <div class="sok-card__links"><a data-sok-action="product" href="/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=product">Ask About Product</a><a data-sok-action="commercial" href="${esc(product.commercialUrl)}">Commercial / Volume</a>${hawaii}${literature}</div>
      </div>
    </article>`;
  }

  function render(){
    const rows=products.filter((product)=>matchesFilter(product)&&matchesSearch(product));
    grid.innerHTML=rows.map(card).join("");
    if(status){
      const filterLabel=filter==="all"?"all products":`${filter} products`;
      status.textContent=query?`${rows.length} matches for “${query}” in ${filterLabel}`:`${rows.length} of ${products.length} SOK products`;
    }
    if(!rows.length)grid.innerHTML='<div class="sok-empty-state"><strong>No SOK products match that search.</strong><p>Try a voltage such as 12V or 48V, an application such as RV or solar, or clear the filters.</p></div>';
  }

  function setFilter(next,source="filter"){
    filter=next||"all";
    document.querySelectorAll("[data-sok-filter]").forEach((button)=>button.classList.toggle("is-active",button.dataset.sokFilter===filter));
    track("sok_catalog_filter",filter,{sourceControl:source});
    render();
    document.querySelector("#sok-products")?.scrollIntoView?.({behavior:"smooth",block:"start"});
  }

  document.querySelectorAll("[data-sok-filter]").forEach((button)=>button.addEventListener("click",()=>setFilter(button.dataset.sokFilter||"all","filter-button")));
  document.querySelectorAll("[data-sok-jump]").forEach((button)=>button.addEventListener("click",()=>setFilter(button.dataset.sokJump||"all","use-case-card")));

  search?.addEventListener("input",()=>{
    query=normalize(search.value).slice(0,80);
    clearTimeout(searchTimer);
    searchTimer=setTimeout(()=>{
      if(query.length>=2||!query)track("sok_catalog_search",query?"query":"cleared",{characters:query.length});
    },450);
    render();
  });

  grid.addEventListener("click",(event)=>{
    const link=event.target.closest("a[data-sok-action]");
    if(!link)return;
    const sku=link.closest("[data-sok-sku]")?.dataset.sokSku||"";
    const action=link.dataset.sokAction;
    if(action==="view-product")track("sok_product_open",sku,{stage:"collection"});
    else if(action==="commercial")track("commercial_review_route",sku,{stage:"collection"});
    else if(action==="hawaii")track("hawaii_options_open",sku,{stage:"collection"});
    else track("purchase_options_open",sku,{stage:"collection",intent:action});
  });

  track("sok_catalog_view","sok-batteries");
  fetch("/api/sok/catalog",{credentials:"same-origin",headers:{Accept:"application/json"},cache:"no-store"})
    .then((response)=>{if(!response.ok)throw new Error("Unable to load current SOK catalog");return response.json();})
    .then((data)=>{
      products=(Array.isArray(data.products)?data.products:[]).filter((product)=>String(product.catalogStatus||"PUBLISHED").toUpperCase()==="PUBLISHED");
      render();
    })
    .catch((error)=>{
      if(status)status.textContent=error.message;
      grid.innerHTML='<p>Current SOK purchase options could not be loaded. Please try again or email casey@elevationupscales.com.</p>';
    });
})();
