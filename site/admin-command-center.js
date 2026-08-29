(() => {
  "use strict";
  if (window.EUSAdminCommandCenterLoaded) return;
  window.EUSAdminCommandCenterLoaded = true;

  const text = (value) => String(value ?? "").trim();
  const money = (cents) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format((Number(cents)||0)/100);
  const safeNum = (value) => Number.isFinite(Number(value)) ? Number(value) : null;
  const api = async (url, options={}) => {
    const headers={Accept:"application/json",...(options.headers||{})};
    if(options.body && !(options.body instanceof FormData) && !headers["Content-Type"]) headers["Content-Type"]="application/json";
    const response=await fetch(url,{credentials:"same-origin",cache:"no-store",...options,headers});
    const body=await response.json().catch(()=>({}));
    if(!response.ok){const error=new Error(body.error||`Request failed (${response.status})`);error.status=response.status;throw error;}
    return body;
  };

  const NAV=[
    ["Daily Operations",[
      ["Overview","/admin","overview"],
      ["Orders & Fulfillment","/admin-store-orders","orders"],
      ["Leads","/admin-listings#leads","leads"]
    ]],
    ["Commerce",[
      ["Products / Import Center","/admin-catalog","products"],
      ["Inventory","/admin-inventory","inventory"],
      ["Channels / Stores","/admin-channels","channels"]
    ]],
    ["Shipping",[
      ["Shipping & Logistics","/admin-lithium-shipping","shipping"]
    ]],
    ["Marketplace",[
      ["Marketplace Operations","/admin-listings#marketplace","marketplace"]
    ]],
    ["Insights & System",[
      ["Analytics","/admin-analytics","analytics"],
      ["System / QA","/admin-listings#system","system"]
    ]]
  ];
  function currentKey(){
    const p=location.pathname.replace(/\.html$/,"").replace(/\/$/,"")||"/";
    const h=location.hash.replace(/^#/,"");
    if(p==="/admin")return"overview";
    if(p.includes("admin-store-orders"))return"orders";
    if(p.includes("admin-lithium-shipping"))return"shipping";
    if(p.includes("admin-catalog"))return"products";
    if(p.includes("admin-inventory"))return"inventory";
    if(p.includes("admin-channels"))return"channels";
    if(p.includes("admin-analytics"))return"analytics";
    if(p.includes("admin-listings")){if(h==="marketplace"||h==="marketplace-follow-up")return"marketplace";if(h==="system")return"system";return"leads";}
    return"";
  }
  function ensureCss(){
    if(!document.querySelector('link[data-eus-command-center-css]')){
      const link=document.createElement("link");link.rel="stylesheet";link.href="/admin-command-center.css?v=4.3.5";link.dataset.eusCommandCenterCss="1";document.head.append(link);
    }
    if(!document.querySelector('link[data-eus-command-center-pass1-css]')){
      const pass=document.createElement("link");pass.rel="stylesheet";pass.href="/admin-command-center-pass1.css?v=4.3.5";pass.dataset.eusCommandCenterPass1Css="1";document.head.append(pass);
    }
  }
  function installShell(){
    if(document.querySelector(".eus-admin-app"))return;
    ensureCss();document.body.classList.add("eus-admin-shell-active");
    const main=document.querySelector("main.admin-shell")||document.querySelector("main.eus-admin-page")||document.querySelector("main");
    if(!main)return;
    const app=document.createElement("div");app.className="eus-admin-app";
    const rail=document.createElement("aside");rail.className="eus-admin-rail";rail.setAttribute("aria-label","Elevation Admin navigation");
    const active=currentKey();
    rail.innerHTML=`<a class="eus-admin-rail__brand" href="/admin"><img src="/assets/logo-mark.webp" alt=""><span><strong>Elevation Admin</strong><small>Operations · Commerce · Leads</small></span></a>${NAV.map(([label,items])=>`<section class="eus-admin-nav-group"><strong>${label}</strong>${items.map(([name,url,key])=>`<a href="${url}"${key===active?' class="is-active" aria-current="page"':''}>${name}</a>`).join("")}</section>`).join("")}<div class="eus-admin-rail__foot">Elevation UpScales, Inc.<br><a href="/">Open public website</a></div>`;
    const mobile=document.createElement("div");mobile.className="eus-admin-mobile-bar";mobile.innerHTML='<button type="button" data-eus-admin-menu aria-label="Open admin navigation">☰</button><strong>Elevation Admin</strong><a class="eus-admin-button" href="/admin">Overview</a>';
    const holder=document.createElement("div");holder.className="eus-admin-main";
    main.parentNode.insertBefore(app,main);app.append(rail,holder);holder.append(mobile,main);
    mobile.querySelector("[data-eus-admin-menu]")?.addEventListener("click",()=>app.classList.toggle("is-nav-open"));
    rail.addEventListener("click",(event)=>{if(event.target.closest("a")&&innerWidth<=820)app.classList.remove("is-nav-open");});
    document.addEventListener("keydown",(event)=>{if(event.key==="Escape")app.classList.remove("is-nav-open");});
  }

  const getOrders=()=>api("/api/admin/store-orders");
  const getCatalog=()=>api("/api/admin/catalog");
  const getInventory=()=>api("/api/admin/inventory");
  const getOpportunities=()=>api("/api/admin/opportunities");
  const getOperations=()=>api("/api/admin/operations");
  const getAnalytics=()=>api("/api/admin/market-analytics");
  const getLithium=()=>api("/api/admin/lithium-shipping");
  async function settle(name,fn){try{return{name,ok:true,data:await fn()};}catch(error){return{name,ok:false,status:error.status||0,error:error.message};}}
  async function loadAll(){
    const results=await Promise.all([
      settle("orders",getOrders),settle("catalog",getCatalog),settle("inventory",getInventory),settle("opportunities",getOpportunities),settle("operations",getOperations),settle("analytics",getAnalytics),settle("lithium",getLithium)
    ]);
    return Object.fromEntries(results.map((r)=>[r.name,r]));
  }
  function orderActions(orders=[]){
    const list=Array.isArray(orders)?orders:[];
    return{
      supplier:list.filter(o=>o.fulfillmentStatus==="fulfillment_pending").length,
      tracking:list.filter(o=>o.fulfillmentStatus==="supplier_ordered"&&!text(o.trackingNumber)).length,
      hold:list.filter(o=>o.fulfillmentStatus==="hold_issue").length,
      refund:list.filter(o=>o.fulfillmentStatus==="refund_needed").length,
      shipped:list.filter(o=>o.fulfillmentStatus==="shipped").length,
      open:list.filter(o=>!["completed","refunded","cancelled"].includes(o.fulfillmentStatus)).length
    };
  }
  function leadActions(projects=[]){
    const active=(Array.isArray(projects)?projects:[]).filter(p=>!["lost","closed"].includes(text(p.pipelineStatus||p.status).toLowerCase()));
    return{
      new:active.filter(p=>text(p.pipelineStatus||p.status).toLowerCase()==="new").length,
      unassigned:active.filter(p=>!text(p.assignedRepresentative)).length,
      noNext:active.filter(p=>!text(p.pipelineNextAction||p.nextAction)||/no action/i.test(text(p.pipelineNextAction||p.nextAction))).length,
      followup:active.filter(p=>text(p.pipelineStatus||p.status).toLowerCase()==="follow_up").length,
      active:active.length
    };
  }
  function catalogActions(data={}){
    const products=Array.isArray(data.products)?data.products:[];
    return{
      total:products.length,
      published:products.filter(p=>p.publishStatus==="published").length,
      review:products.filter(p=>p.publishStatus==="hold"||p.shippingStatus!=="verified"||Boolean(p.reviewState)).length,
      drafts:products.filter(p=>p.publishStatus==="draft").length,
      noPrice:products.filter(p=>!(Number(p.priceCents)>0)).length,
      noImage:products.filter(p=>!text(p.primaryImage)&&!(Array.isArray(p.images)&&p.images.length)).length
    };
  }
  function computeRevenue(orders=[]){
    const paid=(Array.isArray(orders)?orders:[]).filter(o=>!["cancelled","refunded"].includes(o.fulfillmentStatus)&&text(o.paymentStatus).toLowerCase()!=="refunded");
    const revenue=paid.reduce((sum,o)=>sum+(Number(o.totalCents)||0),0);
    const supplierCost=paid.reduce((sum,o)=>sum+(Number(o.supplierCostCents)||0)*(Number(o.quantity)||1),0);
    return{orders:paid.length,revenue,supplierCost,grossContribution:revenue-supplierCost,aov:paid.length?Math.round(revenue/paid.length):0};
  }
  function valueOrNA(value,formatter=(v)=>String(v)){return value===null||value===undefined||Number.isNaN(value)?"N/A":formatter(value);}

  async function enhanceOrders(){
    if(!document.body.classList.contains("admin-store-orders-page")||document.querySelector(".eus-order-actions"))return;
    const dashboard=document.querySelector("#orders-dashboard");if(!dashboard)return;
    try{
      const data=await getOrders();const actions=orderActions(data.orders);
      const board=document.createElement("section");board.className="eus-order-actions";board.setAttribute("aria-label","Fulfillment pending actions");
      const items=[
        ["Purchase from supplier",actions.supplier,"fulfillment_pending","is-warn"],
        ["Tracking needed",actions.tracking,"supplier_ordered","is-warn"],
        ["Hold / Issue",actions.hold,"hold_issue","is-alert"],
        ["Refund required",actions.refund,"refund_needed","is-alert"],
        ["Shipped / monitor",actions.shipped,"shipped",""]
      ];
      board.innerHTML=items.map(([label,count,status,cls])=>`<button class="eus-order-action ${cls}" type="button" data-order-quick="${status}" data-tracking-only="${label==='Tracking needed'?'1':'0'}"><strong>${count}</strong><span>${label}</span></button>`).join("");
      dashboard.insertBefore(board,dashboard.firstChild);
      board.addEventListener("click",event=>{const btn=event.target.closest("[data-order-quick]");if(!btn)return;const select=document.querySelector("#orders-status-filter");if(select){select.value=btn.dataset.orderQuick;select.dispatchEvent(new Event("change",{bubbles:true}));}document.querySelector("#orders-workspace")?.scrollIntoView?.({behavior:"smooth"});});
    }catch(_){ }
  }

  window.EUSAdminData={api,loadAll,getOrders,getCatalog,getInventory,getOpportunities,getOperations,getAnalytics,getLithium,orderActions,leadActions,catalogActions,computeRevenue,money,valueOrNA,text};
  const boot=()=>{installShell();enhanceOrders();};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
