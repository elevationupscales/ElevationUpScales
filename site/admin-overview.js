(() => {
  "use strict";
  const $=(id)=>document.getElementById(id);
  const auth=$("eus-admin-auth"),overview=$("eus-admin-overview"),form=$("eus-admin-login-form"),loginStatus=$("eus-admin-login-status"),refresh=$("eus-admin-refresh"),logout=$("eus-admin-logout"),status=$("eus-overview-status");
  const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const D=()=>window.EUSAdminData;
  const num=(v)=>Number.isFinite(Number(v))?Number(v):0;
  const upper=(v,fallback="UNKNOWN")=>String(v||fallback).replaceAll("_"," ").toUpperCase();
  function metric(label,value,note=""){return `<article class="eus-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong>${note?`<small>${esc(note)}</small>`:""}</article>`;}
  function situation(label,value,note,url,kind=""){return `<a class="eus-ops-situation-card ${kind}" href="${url}"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></a>`;}
  function action(label,count,note,url,kind=""){return `<a class="eus-action-card ${kind}" href="${url}"><span>${esc(label)}</span><strong>${esc(count)}</strong><small>${esc(note)}</small></a>`;}
  function program(label,value,note,url,kind=""){return `<a class="eus-ops-program-card ${kind}" href="${url}"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></a>`;}
  function orderLabel(value){return({fulfillment_pending:"Needs Order",supplier_ordered:"Supplier Ordered",shipped:"Shipped",completed:"Completed",hold_issue:"Hold / Issue",refund_needed:"Refund Needed",refunded:"Refunded",cancelled:"Cancelled"})[value]||value||"Pending";}
  function activeProject(p){return !["lost","closed"].includes(String(p.pipelineStatus||p.status||"").toLowerCase());}
  function showAuth(message=""){auth.hidden=false;overview.hidden=true;loginStatus.textContent=message;}
  function showOverview(){auth.hidden=true;overview.hidden=false;}
  async function session(){try{const r=await D().api("/api/admin/session");return Boolean(r?.authenticated||r?.ok||r?.admin);}catch(e){return false;}}

  function recentOrders(orders=[]){
    const rows=[...orders].sort((a,b)=>String(b.paidAt||b.createdAt||"").localeCompare(String(a.paidAt||a.createdAt||""))).slice(0,6);
    $("eus-recent-orders").innerHTML=rows.length?rows.map(o=>`<tr><td><a href="/admin-store-orders"><strong>${esc(o.id)}</strong></a><br><small>${esc(o.paidAt||o.createdAt||"")}</small></td><td>${esc(o.shipping?.fullName||o.customer?.email||"—")}</td><td>${esc(o.source==="rv"?"RV & Outdoor":o.source==="apparel"?"Apparel":o.source||"Store")}</td><td>${D().money(o.totalCents)}</td><td><span class="eus-pill ${["hold_issue","refund_needed"].includes(o.fulfillmentStatus)?"is-alert":["fulfillment_pending","supplier_ordered"].includes(o.fulfillmentStatus)?"is-warn":""}">${esc(orderLabel(o.fulfillmentStatus))}</span></td></tr>`).join(""):'<tr><td colspan="5" class="eus-empty">No stored orders yet.</td></tr>';
  }

  function render(snapshot){
    const orders=snapshot.orders.ok?(snapshot.orders.data.orders||[]):[];
    const orderState=D().orderActions(orders);
    const catalog=snapshot.catalog.ok?snapshot.catalog.data:{};
    const catalogState=D().catalogActions(catalog);
    const inventory=snapshot.inventory.ok?(snapshot.inventory.data||{}):{};
    const inventoryStats=inventory.stats||{};
    const syncState=snapshot.sync.ok?(snapshot.sync.data||{}):{};
    const syncCounts=syncState.counts||{};
    const projects=snapshot.opportunities.ok?(snapshot.opportunities.data.projects||[]):[];
    const leadState=D().leadActions(projects);
    const revenue=D().computeRevenue(orders);
    const ops=snapshot.operations.ok?(snapshot.operations.data||{}):{};
    const signals=ops.signals||{};
    const health=ops.health||{};
    const marketplace=ops.summary||{};
    const doba=snapshot.doba?.ok?(snapshot.doba.data||{}):{};
    const promotion=snapshot.promotion?.ok?(snapshot.promotion.data||{}):{};
    const lithium=snapshot.lithium.ok?(snapshot.lithium.data||{}):{};
    const hawaiiRequests=Array.isArray(lithium.requests)?lithium.requests:[];
    const hawaiiRecords=Array.isArray(lithium.records)?lithium.records:[];
    const hawaiiBatches=Array.isArray(lithium.batches)?lithium.batches:[];
    const hawaiiBatchMetrics=Array.isArray(lithium.metrics?.batchMetrics)?lithium.metrics.batchMetrics:[];
    const reservations=snapshot.lithium.ok?hawaiiRequests.filter(r=>!["CLOSED","CANCELLED"].includes(String(r.state||"").toUpperCase())).length:null;
    const supplierRechecks=snapshot.lithium.ok?hawaiiRecords.filter(r=>r.inventoryRecheckRequired||["UNKNOWN","RECHECK REQUIRED","SUPPLIER ERROR"].includes(String(r.supplierStockState||"").toUpperCase())).length:null;
    const blockedBatchLines=hawaiiBatchMetrics.reduce((n,m)=>n+num(m.blockedOrders),0);
    const shippingBlocked=snapshot.lithium.ok?hawaiiRecords.filter(r=>r.hold||String(r.reviewState||"").toUpperCase()!=="INTERNAL REQUIREMENTS SATISFIED").length+blockedBatchLines:null;
    const confirmations=snapshot.lithium.ok?hawaiiBatchMetrics.reduce((n,m)=>n+num(m.pendingCustomerConfirmations),0):null;
    const batches=snapshot.lithium.ok?hawaiiBatches.filter(b=>!["COMPLETE","CANCELLED"].includes(String(b.status||"").toUpperCase())).length:null;
    const syncIssues=snapshot.sync.ok?num(syncCounts.outOfSync)+num(syncCounts.syncError)+num(syncCounts.stale):null;
    const marketplaceLive=snapshot.operations.ok?num(marketplace.published):null;
    const marketplacePending=snapshot.operations.ok?num(marketplace.pending):null;
    const marketplaceIssues=snapshot.operations.ok?num(marketplace.unresolvedIssues):null;
    const inPortal=snapshot.opportunities.ok?projects.filter(p=>p.portalStatus==="in_portal").length:null;
    const handoffReady=snapshot.opportunities.ok?projects.filter(p=>Boolean(p.portalHandoffReady)).length:null;
    const wonNotPortal=snapshot.opportunities.ok?projects.filter(p=>String(p.pipelineStatus||p.status||"").toLowerCase()==="won"&&p.portalStatus!=="in_portal").length:null;

    const siteValue=snapshot.operations.ok?(health.publicHealth==="ok"?"ONLINE":upper(health.publicHealth||health.status)):"N/A";
    const siteKind=snapshot.operations.ok&&health.publicHealth==="ok"?"is-good":snapshot.operations.ok?"is-warning":"";
    const promoValue=snapshot.promotion?.ok?(promotion.active?"ACTIVE":"OFF"):"N/A";
    const promoNote=snapshot.promotion?.ok?(promotion.active?`${promotion.couponCode||"Promotion"} · ${num(promotion.couponPercent)}%`:`${promotion.couponCode||"Promotion"} disabled`):"Promotion API unavailable";
    const channelValue=syncIssues===null?"N/A":syncIssues?`${syncIssues} REVIEW`:"CLEAR";
    const channelKind=syncIssues===null?"":syncIssues?"is-warning":"is-good";
    const shipValue=shippingBlocked===null?"N/A":shippingBlocked?`${shippingBlocked} BLOCKED`:"CLEAR";
    const shipKind=shippingBlocked===null?"":shippingBlocked?"is-warning":"is-good";

    $("eus-situation-grid").innerHTML=[
      situation("Orders",snapshot.orders.ok?String(orderState.open):"N/A",snapshot.orders.ok?`${orderState.supplier} need supplier · ${orderState.tracking} need tracking`:"Orders API unavailable","/admin-store-orders",orderState.hold+orderState.refund?"is-urgent":orderState.supplier+orderState.tracking?"is-warning":""),
      situation("Revenue",snapshot.orders.ok?D().money(revenue.revenue):"N/A",snapshot.orders.ok?`${revenue.orders} stored non-refunded orders`:"No stored order value available","/admin-analytics"),
      situation("Leads",snapshot.opportunities.ok?String(leadState.active):"N/A",snapshot.opportunities.ok?`${leadState.new} new · ${leadState.unassigned} unassigned`:"Opportunities API unavailable","/admin-listings#leads",leadState.unassigned+leadState.noNext?"is-warning":""),
      situation("Catalog",snapshot.catalog.ok?`${catalogState.published}/${catalogState.total}`:"N/A",snapshot.catalog.ok?`${catalogState.review} need review · ${catalogState.drafts} drafts`:"Catalog API unavailable","/admin-catalog",catalogState.review?"is-warning":""),
      situation("Channels",channelValue,snapshot.sync.ok?`${num(syncCounts.ready)} ready · ${num(syncCounts.outOfSync)} out of sync`:"Sync API unavailable","/admin-channels",channelKind),
      situation("Shipping / Hawaii",shipValue,reservations===null?"Lithium shipping API unavailable":`${reservations} reservations · ${batches} open batches`,`/admin-lithium-shipping`,shipKind),
      situation("Marketplace",marketplaceLive===null?"N/A":`${marketplaceLive} LIVE`,marketplacePending===null?"Operations data unavailable":`${marketplacePending} review · ${marketplaceIssues} issues`,`/admin-listings#marketplace`,marketplaceIssues?"is-warning":""),
      situation("Website",siteValue,snapshot.operations.ok?`Lead Core ${upper(health.leadCore,"unknown")} · Build ${health.build||"unknown"}`:"Operations health unavailable","/admin-system",siteKind),
      situation("Promotion",promoValue,promoNote,"/admin-promotion",promotion.active?"is-warning":"")
    ].join("");

    const priorityEntries=[
      {label:"Order holds / refunds",count:snapshot.orders.ok?orderState.hold+orderState.refund:null,note:"Orders blocked by fulfillment issues or refund-required state.",url:"/admin-store-orders",kind:"is-urgent",weight:100},
      {label:"Shipping blockers",count:shippingBlocked,note:"Lithium product or Hawaii batch controls not ready.",url:"/admin-lithium-shipping",kind:"is-urgent",weight:95},
      {label:"Sync errors / stale",count:snapshot.sync.ok?num(syncCounts.syncError)+num(syncCounts.stale):null,note:"Automation errors or stale supplier/source observations.",url:"/admin-channels",kind:"is-urgent",weight:90},
      {label:"Purchase from supplier",count:snapshot.orders.ok?orderState.supplier:null,note:"Paid orders still needing supplier fulfillment.",url:"/admin-store-orders",kind:"is-warning",weight:80},
      {label:"Tracking needed",count:snapshot.orders.ok?orderState.tracking:null,note:"Supplier ordered; tracking not recorded.",url:"/admin-store-orders",kind:"is-warning",weight:75},
      {label:"Unassigned leads",count:snapshot.opportunities.ok?leadState.unassigned:null,note:"Active leads with no assigned representative.",url:"/admin-listings#leads",kind:"is-warning",weight:70},
      {label:"Leads missing next action",count:snapshot.opportunities.ok?leadState.noNext:null,note:"Active lead records without a meaningful next step.",url:"/admin-listings#leads",kind:"is-warning",weight:68},
      {label:"Products needing review",count:snapshot.sync.ok?num(syncCounts.review):(snapshot.catalog.ok?catalogState.review:null),note:"Product identity, cost, stock, shipping, margin, HOLD or mapping review.",url:"/admin-catalog",kind:"is-warning",weight:60},
      {label:"Listings out of sync",count:snapshot.sync.ok?num(syncCounts.outOfSync):null,note:"Channel/source relationships needing review.",url:"/admin-channels",kind:"is-warning",weight:58},
      {label:"Supplier rechecks",count:supplierRechecks,note:"Lithium supplier availability needs a fresh check.",url:"/admin-lithium-shipping",kind:"is-warning",weight:55},
      {label:"Customer confirmations",count:confirmations,note:"Hawaii batch lines waiting on customer approval.",url:"/admin-lithium-shipping",kind:"is-warning",weight:50},
      {label:"Portal handoffs ready",count:handoffReady,note:"Qualified project records ready for Technician Portal handoff.",url:"/admin-listings#leads",kind:"",weight:45},
      {label:"Doba CSV snapshot",count:snapshot.doba?.ok&&!doba.latestSuccessfulImport?1:0,note:snapshot.doba?.ok?(doba.latestSuccessfulImport?"A successful supplier import is recorded.":"No successful supplier snapshot import is recorded."):"Doba sync module unavailable.",url:"/admin-channels#doba-csv-sync",kind:"is-warning",weight:40}
    ];
    const actionable=priorityEntries.filter(x=>x.count!==null&&num(x.count)>0).sort((a,b)=>b.weight-a.weight);
    const totalSignals=actionable.reduce((sum,x)=>sum+num(x.count),0);
    $("eus-priority-summary").innerHTML=actionable.length?`<strong>${esc(totalSignals)}</strong><span>${esc(actionable.length)} active exception type${actionable.length===1?"":"s"} across loaded operating records.</span>`:`<strong>0</strong><span>No active exceptions were found in the loaded priority rules.</span>`;
    $("eus-action-board").innerHTML=actionable.length?actionable.slice(0,8).map(x=>action(x.label,x.count,x.note,x.url,x.kind)).join(""):`<div class="eus-ops-clear"><strong>No immediate operating exceptions</strong><span>Use the Action section below for normal work.</span></div>`;

    const solarCreated=snapshot.operations.ok?num(signals.solarLeadCreated):null;
    const solarComplete=snapshot.operations.ok?num(signals.solarCompletedSubmitted):null;
    const leadCoreValue=snapshot.operations.ok?(health.leadCore==="ok"?"HEALTHY":upper(health.leadCore)):"N/A";
    $("eus-program-status").innerHTML=[
      program("Marketplace",marketplaceLive===null?"N/A":`${marketplaceLive} live`,marketplacePending===null?"No Marketplace summary":`${marketplacePending} awaiting review · ${marketplaceIssues} unresolved issues`,`/admin-listings#marketplace`,marketplaceIssues?"is-warning":""),
      program("Solar",solarCreated===null?"N/A":`${solarCreated} leads`,solarComplete===null?"Solar signal unavailable":`${solarComplete} completed/submitted builds`,`/admin-listings#solar"),
      program("Technician Portal",inPortal===null?"N/A":`${inPortal} in portal`,handoffReady===null?"Opportunity data unavailable":`${handoffReady} handoff ready · ${wonNotPortal} won not in portal`,`/admin-listings#leads",handoffReady?"is-warning":""),
      program("Lead Core",leadCoreValue,snapshot.operations.ok?`Backend ${upper(health.backend)} · Notifications ${upper(health.notifications)}`:"Operations health unavailable","/admin-system",health.leadCore==="ok"?"is-good":"is-warning")
    ].join("");

    const inventoryLow=snapshot.inventory.ok?num(inventoryStats.lowStock):null;
    const metrics=[
      metric("Store Revenue",snapshot.orders.ok?D().money(revenue.revenue):"N/A","Stored non-refunded orders"),
      metric("Gross Contribution*",snapshot.orders.ok?D().money(revenue.grossContribution):"N/A","Revenue minus stored supplier cost"),
      metric("Average Order",snapshot.orders.ok?D().money(revenue.aov):"N/A","Stored order average"),
      metric("Inventory Value",snapshot.inventory.ok?D().money(inventoryStats.inventoryValueCents):"N/A","Tracked inventory value"),
      metric("Low Stock",inventoryLow===null?"N/A":String(inventoryLow),"Tracked inventory items"),
      metric("Submitted Leads",snapshot.operations.ok?String(num(signals.submittedLeads)):"N/A","Confirmed stored submissions")
    ];
    $("eus-overview-metrics").innerHTML=metrics.join("");
    $("eus-lead-health").innerHTML=[
      metric("Active",snapshot.opportunities.ok?String(leadState.active):"N/A","Excludes lost / closed"),
      metric("New",snapshot.opportunities.ok?String(leadState.new):"N/A","Needs initial action"),
      metric("Follow-Up",snapshot.opportunities.ok?String(leadState.followup):"N/A","Pipeline follow-up stage"),
      metric("Unassigned",snapshot.opportunities.ok?String(leadState.unassigned):"N/A","No representative"),
      metric("No Next Action",snapshot.opportunities.ok?String(leadState.noNext):"N/A","Needs operating decision"),
      metric("Follow-Ups Due",snapshot.operations.ok?String(num(signals.followUpsDue)):"N/A","Existing first-party signal")
    ].join("");
    recentOrders(orders);

    const unavailable=Object.values(snapshot).filter(x=>!x.ok).map(x=>x.name);
    status.textContent=unavailable.length?`Loaded with unavailable modules: ${unavailable.join(", ")}. Unknown values are shown as N/A.`:`Updated ${new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit",second:"2-digit"})}.`;
    const note=$("eus-ops-data-note");
    if(note)note.textContent="Data sources: Store Orders, Catalog, Inventory, Opportunities, Operations/health, Analytics, Lithium Shipping, Sync, Doba CSV Sync and Promotion APIs. Technician Portal handoff state is available from Opportunities; a separate live Technician Portal uptime API is not exposed to this dashboard.";
  }

  async function load(){
    status.textContent="Loading current operations…";
    try{
      const snapshot=await D().loadAll();
      if(Object.values(snapshot).some(x=>x.status===401)){showAuth("Admin session required.");return;}
      showOverview();render(snapshot);
    }catch(error){status.textContent=error.message||"Operations Interface could not load.";}
  }
  form?.addEventListener("submit",async(event)=>{event.preventDefault();loginStatus.textContent="Signing in…";const fd=new FormData(form);try{await D().api("/api/admin/login",{method:"POST",body:JSON.stringify({email:fd.get("email"),password:fd.get("password")})});form.reset();loginStatus.textContent="";showOverview();await load();}catch(error){loginStatus.textContent=error.message||"Sign in failed.";}});
  logout?.addEventListener("click",async()=>{try{await D().api("/api/admin/logout",{method:"POST"});}catch(_){}showAuth("Signed out.");});
  refresh?.addEventListener("click",load);
  (async()=>{if(await session()){showOverview();load();}else showAuth();})();
})();
