(()=>{
  "use strict";

  const path=(location.pathname||"/").replace(/\/+$/,"")||"/";
  if(path.startsWith("/admin")) return;

  document.documentElement.classList.add("eus-redesign-v1");
  document.body?.classList.add("eus-redesign-v1");

  const text=(selector,value)=>{
    const node=document.querySelector(selector);
    if(node) node.textContent=value;
    return node;
  };

  document.querySelectorAll(".eus-wordmark__tagline").forEach((node)=>{
    node.textContent="OFF-GRID POWER • SUPPLY • LOGISTICS";
  });

  function addCommerceRail(){
    const header=document.querySelector(".eus-header");
    if(!header||document.querySelector(".eus-commerce-rail")) return;
    const links=[
      ["Power","/lithium-batteries"],
      ["SOK Batteries","/sok-batteries"],
      ["Solar & Off-Grid","/solar-project"],
      ["Hawaii Logistics","/hawaii-lithium-batteries"],
      ["RV & Outdoor","/rv-store"],
      ["Apparel","/store"],
      ["Marketplace","/marketplace"]
    ];
    const nav=document.createElement("nav");
    nav.className="eus-commerce-rail";
    nav.setAttribute("aria-label","Power and shopping categories");
    const inner=document.createElement("div");
    inner.className="container eus-commerce-rail__inner";
    const label=document.createElement("span");
    label.className="eus-commerce-rail__label";
    label.textContent="POWER & SHOP";
    inner.append(label);
    links.forEach(([name,href])=>{
      const a=document.createElement("a");
      a.href=href;
      a.textContent=name;
      const clean=href.replace(/\?.*$/,"").replace(/\/+$/,"")||"/";
      if(path===clean||(clean!=="/"&&path.startsWith(clean+"/"))) a.setAttribute("aria-current","page");
      inner.append(a);
    });
    nav.append(inner);
    header.insertAdjacentElement("afterend",nav);
  }

  function upgradeHomepage(){
    if(!document.body.classList.contains("home-concept")) return;
    const hero=document.querySelector(".hc-hero");
    const copy=hero?.querySelector(".hc-hero-copy");
    const title=hero?.querySelector("h1");
    const intro=title?.nextElementSibling;
    const routes=hero?.querySelector(".hc-route-grid");
    if(!hero||!copy||!title) return;

    title.textContent="Power Beyond the Grid.";
    if(intro&&intro.tagName==="P") intro.textContent="Off-grid power, supply and logistics for RV, solar, backup power and harder-to-serve markets.";

    if(!copy.querySelector(".eus-partner-lockup")){
      const lockup=document.createElement("div");
      lockup.className="eus-partner-lockup";
      lockup.setAttribute("aria-label","Elevation UpScales is an Authorized SOK Energy Dealer");
      lockup.innerHTML="<span>Elevation UpScales</span><i aria-hidden=\"true\"></i><strong>Authorized SOK Energy Dealer</strong>";
      title.insertAdjacentElement("beforebegin",lockup);
    }

    if(!copy.querySelector(".eus-hero-actions")){
      const actions=document.createElement("div");
      actions.className="eus-hero-actions";
      actions.innerHTML='<a class="eus-hero-actions__primary" href="/lithium-batteries" data-eus-event="homepage_power_open" data-eus-value="lithium">Explore Power Solutions <span aria-hidden="true">→</span></a><a class="eus-hero-actions__secondary" href="/start-a-project" data-eus-event="start_project_open" data-eus-value="homepage-redesign">Start a Project</a>';
      (intro||title).insertAdjacentElement("afterend",actions);
    }

    if(routes&&!copy.querySelector(".eus-shop-label")){
      const label=document.createElement("p");
      label.className="eus-shop-label";
      label.textContent="SHOP BY SOLUTION";
      routes.insertAdjacentElement("beforebegin",label);
      routes.setAttribute("aria-label","Shop by solution");
    }

    if(!document.querySelector(".eus-value-strip")){
      const strip=document.createElement("section");
      strip.className="eus-value-strip";
      strip.setAttribute("aria-label","Elevation power and logistics capabilities");
      strip.innerHTML='<div class="container eus-value-strip__inner"><div class="eus-value-strip__item"><strong>Authorized SOK Dealer</strong><span>12V, 24V and 48V battery systems</span></div><div class="eus-value-strip__item"><strong>Hawaii Logistics</strong><span>Controlled lithium freight and destination review</span></div><div class="eus-value-strip__item"><strong>RV • Solar • Off-Grid</strong><span>Shop by application instead of supplier listing</span></div><div class="eus-value-strip__item"><strong>System & Project Support</strong><span>Products, Solar Builder and field services</span></div></div>';
      hero.insertAdjacentElement("afterend",strip);
    }
  }

  function improveLithiumCopy(){
    if(!document.body.classList.contains("lithium-page")) return;
    const info=document.querySelector(".hawaii-info");
    const paragraph=info?.querySelector("h2 + p");
    if(paragraph){
      paragraph.innerHTML='Lithium shipping to Hawaii is handled through qualified product and destination routes. Eligible orders are reviewed for current freight availability, terminal pickup or delivery options, and the exact battery quantity before commitment. SOK products remain <strong>Freight Review Required</strong> until the applicable route is qualified.';
    }
    if(info&&!info.querySelector(".eus-hawaii-badge")){
      const badge=document.createElement("span");
      badge.className="eus-hawaii-badge";
      badge.textContent="Hawaii Logistics Available";
      info.querySelector(".eyebrow")?.insertAdjacentElement("afterend",badge);
    }
  }

  function addStoreContext(){
    if(path==="/sok-batteries"){
      const hero=document.querySelector(".sok-hero");
      if(hero&&!hero.querySelector(".eus-hawaii-badge")){
        const badge=document.createElement("span");
        badge.className="eus-hawaii-badge";
        badge.textContent="Hawaii Logistics Available on Qualified Battery Routes";
        hero.querySelector(".sok-hero__copy,.container")?.append(badge);
      }
    }
  }

  addCommerceRail();
  upgradeHomepage();
  improveLithiumCopy();
  addStoreContext();
})();
