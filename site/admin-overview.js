(() => {
"use strict";
const $=id=>document.getElementById(id);
const auth=$("eus-admin-auth"),overview=$("eus-admin-overview"),form=$("eus-admin-login-form"),loginStatus=$("eus-admin-login-status"),refresh=$("eus-admin-refresh"),logout=$("eus-admin-logout"),status=$("eus-overview-status");
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const D=()=>window.EUSAdminData;
const n=v=>Number.isFinite(Number(v))?Number(v):0;
const up=(v,f="UNKNOWN")=>String(v||f).replaceAll("_"," ").toUpperCase();
const metric=(label,value,note="")=>`<article class="eus-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong>${note?`<small>${esc(note)}</small>`:""}</article>`;
const situation=(label,value,note,url,kind="")=>`<a class="eus-ops-situation-card ${kind}" href="${url}"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></a>`;
const action=(label,count,note,url,kind="")=>`<a class="eus-action-card ${kind}" href="${url}"><span>${esc(label)}</span><strong>${esc(count)}</strong><small>${esc(note)}</small></a>`;
const program=(label,value,note,url,kind="")=>`<a class="eus-ops-program-card ${kind}" href="${url}"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></a>`;
const orderLabel=v=>({fulfillment_pending:"Needs Order",supplier_ordered:"Supplier Ordered",shipped:"Shipped",completed:"Completed",hold_issue:"Hold / Issue",refund_needed:"Refund Needed",refunded:"Refunded",cancelled:"Cancelled"})[v]||v||"Pending";
function showAuth(message=""){auth.hidden=false;overview.hidden=true;loginStatus.textContent=message;}
function showOverview(){auth.hidden=true;overview.hidden=false;}
async function session(){try{const r=await D().api("/api/admin/session");return Boolean(r?.authenticated||r?.ok||r?.admin);}catch{return false;}}
function recentOrders(orders=[]){
  const rows=[...orders].sort((a,b)=>String(b.paidAt||b.createdAt||"").localeCompare(String(a.paidAt||a.createdAt||""))).slice(0,6);
  $("eus-recent-orders").innerHTML=rows.length?rows.map(o=>`<tr><td><a href="/admin-store-orders"><strong>${esc(o.id)}</strong></a><br><small>${esc(o.paidAt||o.createdAt||"")}</small></td><td>${esc(o.shipping?.fullName||o.customer?.email||"—")}</td><td>${esc(o.source==="rv"?"RV & Outdoor":o.source==="apparel"?"Apparel":o.source||"Store")}</td><td>${D().money(o.totalCents)}</td><td><span class="eus-pill ${["hold_issue","refund_needed"].includes(o.fulfillmentStatus)?"is-alert":["fulfillment_pending","supplier_ordered"].includes(o.fulfillmentStatus)?"is-warn":""}">${esc(orderLabel(o.fulfillmentStatus))}</span></td></tr>`).join(""):'<tr><td colspan="5" class="eus-empty">No stored orders yet.</td></tr>';
}
function render(snapshot){
  const orders=snapshot.orders.ok?(snapshot.orders.data.orders||[]):[],orderState=D().orderActions(orders),revenue=D().computeRevenue(orders);
  const catalog=snapshot.catalog.ok?snapshot.catalog.data:{},catalogState=D().catalogActions(catalog);
  const inventory=snapshot.inventory.ok?(snapshot.inventory.data||{}):{},inventoryStats=inventory.stats||{};
  const sync=snapshot.sync.ok?(snapshot.sync.data||{}):{},syncCounts=sync.counts||{};
  const projects=snapshot.opportunities.ok?(snapshot.opportunities.data.projects||[]):[],leadState=D().leadActions(projects);
  const ops=snapshot.operations.ok?(snapshot.operations.data||{}):{},signals=ops.signals||{},health=ops.health||{},market=ops.summary||{};
  const doba=snapshot.doba?.ok?(snapshot.doba.data||{}):{},promotion=snapshot.promotion?.ok?(snapshot.promotion.data||{}):{};
  const lithium=snapshot.lithium.ok?(snapshot.lithium.data||{}):{},requests=Array.isArray(lithium.requests)?lithium.requests:[],records=Array.isArray(lithium.records)?lithium.records:[],batchesRaw=Array.isArray(lithium.batches)?lithium.batches:[],batchMetrics=Array.isArray(lithium.metrics?.batchMetrics)?lithium.metrics.batchMetrics:[];
  const reservations=snapshot.lithium.ok?requests.filter(r=>!["CLOSED","CANCELLED"].includes(up(r.state))).length:null;
  const supplierRechecks=snapshot.lithium.ok?records.filter(r=>r.inventoryRecheckRequired||["UNKNOWN","RECHECK REQUIRED","SUPPLIER ERROR"].includes(up(r.supplierStockState))).length:null;
  const blockedLines=batchMetrics.reduce((sum,m)=>sum+n(m.blockedOrders),0);
  const shippingBlocked=snapshot.lithium.ok?records.filter(r=>r.hold||up(r.reviewState)!=="INTERNAL REQUIREMENTS SATISFIED").length+blockedLines:null;
  const confirmations=snapshot.lithium.ok?batchMetrics.reduce((sum,m)=>sum+n(m.pendingCustomerConfirmations),0):null;
  const openBatches=snapshot.lithium.ok?batchesRaw.filter(b=>!["COMPLETE","CANCELLED"].includes(up(b.status))).length:null;
  const syncIssues=snapshot.sync.ok?n(syncCounts.outOfSync)+n(syncCounts.syncError)+n(syncCounts.stale):null;
  const live=snapshot.operations.ok?n(market.published):null,pending=snapshot.operations.ok?n(market.pending):null,marketIssues=snapshot.operations.ok?n(market.unresolvedIssues):null;
  const inPortal=snapshot.opportunities.ok?projects.filter(p=>p.portalStatus==="in_portal").length:null;
  const handoffReady=snapshot.opportunities.ok?projects.filter(p=>Boolean(p.portalHandoffReady)).length:null;
  const wonNotPortal=snapshot.opportunities.ok?projects.filter(p=>String(p.pipelineStatus||p.status||"").toLowerCase()==="won"&&p.portalStatus!=="in_portal").length:null;
  const website=snapshot.operations.ok?(health.publicHealth==="ok"?"ONLINE":up(health.publicHealth||health.status)):"N/A";
  const promo=snapshot.promotion?.ok?(promotion.active?"ACTIVE":"OFF"):"N/A";

  $("eus-situation-grid").innerHTML=[
    situation("Orders",snapshot.orders.ok?String(orderState.open):"N/A",snapshot.orders.ok?`${orderState.supplier} need supplier · ${orderState.tracking} need tracking`:"Orders API unavailable","/admin-store-orders",orderState.hold+orderState.refund?"is-urgent":orderState.supplier+orderState.tracking?"is-warning":""),
    situation("Revenue",snapshot.orders.ok?D().money(revenue.revenue):"N/A",snapshot.orders.ok?`${revenue.orders} stored non-refunded orders`:"Stored order value unavailable","/admin-analytics"),
    situation("Leads",snapshot.opportunities.ok?String(leadState.active):"N/A",snapshot.opportunities.ok?`${leadState.new} new · ${leadState.unassigned} unassigned`:"Opportunities API unavailable","/admin-listings#leads",leadState.unassigned+leadState.noNext?"is-warning":""),
    situation("Catalog",snapshot.catalog.ok?`${catalogState.published}/${catalogState.total}`:"N/A",snapshot.catalog.ok?`${catalogState.review} need review · ${catalogState.drafts} drafts`:"Catalog API unavailable","/admin-catalog",catalogState.review?"is-warning":""),
    situation("Channels",syncIssues===null?"N/A":syncIssues?`${syncIssues} REVIEW`:"CLEAR",snapshot.sync.ok?`${n(syncCounts.ready)} ready · ${n(syncCounts.outOfSync)} out of sync`:"Sync API unavailable","/admin-channels",syncIssues===0?"is-good":syncIssues?"is-warning":""),
    situation("Shipping / Hawaii",shippingBlocked===null?"N/A":shippingBlocked?`${shippingBlocked} BLOCKED`:"CLEAR",reservations===null?"Lithium shipping API unavailable":`${reservations} reservations · ${openBatches} open batches`,`/admin-lithium-shipping`,shippingBlocked===0?"is-good":shippingBlocked?"is-warning":""),
    situation("Marketplace",live===null?"N/A":`${live} LIVE`,pending===null?"Operations summary unavailable":`${pending} review · ${marketIssues} issues`,`/admin-listings#marketplace`,marketIssues?"is-warning":""),
    situation("Website",website,snapshot.operations.ok?`Lead Core ${up(health.leadCore)} · Build ${health.build||"unknown"}`:"Health signal unavailable","/admin-system",health.publicHealth==="ok"?"is-good":snapshot.operations.ok?"is-warning":""),
    situation("Promotion",promo,snapshot.promotion?.ok?(promotion.active?`${promotion.couponCode||"Promotion"} · ${n(promotion.couponPercent)}%`:`${promotion.couponCode||"Promotion"} disabled`):"Promotion API unavailable","/admin-promotion",promotion.active?"is-warning":"")
  ].join("");

  const priorities=[
    ["Order holds / refunds",snapshot.orders.ok?orderState.hold+orderState.refund:null,"Orders blocked by fulfillment issues or refund-required state.","/admin-store-orders","is-urgent",100],
    ["Shipping blockers",shippingBlocked,"Lithium product or Hawaii batch controls not ready.","/admin-lithium-shipping","is-urgent",95],
    ["Sync errors / stale",snapshot.sync.ok?n(syncCounts.syncError)+n(syncCounts.stale):null,"Automation errors or stale supplier/source observations.","/admin-channels","is-urgent",90],
    ["Purchase from supplier",snapshot.orders.ok?orderState.supplier:null,"Paid orders still needing supplier fulfillment.","/admin-store-orders","is-warning",80],
    ["Tracking needed",snapshot.orders.ok?orderState.tracking:null,"Supplier ordered; tracking not recorded.","/admin-store-orders","is-warning",75],
    ["Unassigned leads",snapshot.opportunities.ok?leadState.unassigned:null,"Active leads with no assigned representative.","/admin-listings#leads","is-warning",70],
    ["Leads missing next action",snapshot.opportunities.ok?leadState.noNext:null,"Active lead records without a meaningful next step.","/admin-listings#leads","is-warning",68],
    ["Products needing review",snapshot.sync.ok?n(syncCounts.review):(snapshot.catalog.ok?catalogState.review:null),"Product identity, cost, stock, shipping, margin, HOLD or mapping review.","/admin-catalog","is-warning",60],
    ["Listings out of sync",snapshot.sync.ok?n(syncCounts.outOfSync):null,"Channel/source relationships needing review.","/admin-channels","is-warning",58],
    ["Supplier rechecks",supplierRechecks,"Lithium supplier availability needs a fresh check.","/admin-lithium-shipping","is-warning",55],
    ["Customer confirmations",confirmations,"Hawaii batch lines waiting on customer approval.","/admin-lithium-shipping","is-warning",50],
    ["Portal handoffs ready",handoffReady,"Qualified project records ready for Technician Portal handoff.","/admin-listings#leads","",45],
    ["Doba CSV snapshot",snapshot.doba?.ok&&!doba.latestSuccessfulImport?1:0,doba.latestSuccessfulImport?"A successful supplier import is recorded.":"No successful supplier snapshot import is recorded.","/admin-channels#doba-csv-sync","is-warning",40]
  ].map(([label,count,note,url,kind,weight])=>({label,count,note,url,kind,weight}));
  const actionable=priorities.filter(x=>x.count!==null&&n(x.count)>0).sort((a,b)=>b.weight-a.weight),total=actionable.reduce((sum,x)=>sum+n(x.count),0);
  $("eus-priority-summary").innerHTML=actionable.length?`<strong>${esc(total)}</strong><span>${esc(actionable.length)} active exception type${actionable.length===1?"":"s"} across loaded operating records.</span>`:`<strong>0</strong><span>No active exceptions were found in the loaded priority rules.</span>`;
  $("eus-action-board").innerHTML=actionable.length?actionable.slice(0,8).map(x=>action(x.label,x.count,x.note,x.url,x.kind)).join(""):`<div class="eus-ops-clear"><strong>No immediate operating exceptions</strong><span>Use the Action section below for normal work.</span></div>`;

  const solarCreated=snapshot.operations.ok?n(signals.solarLeadCreated):null,solarComplete=snapshot.operations.ok?n(signals.solarCompletedSubmitted):null;
  $("eus-program-status").innerHTML=[
    program("Marketplace",live===null?"N/A":`${live} live`,pending===null?"No Marketplace summary":`${pending} awaiting review · ${marketIssues} unresolved issues`,`/admin-listings#marketplace`,marketIssues?"is-warning":""),
    program("Solar",solarCreated===null?"N/A":`${solarCreated} leads`,solarComplete===null?"Solar signal unavailable":`${solarComplete} completed/submitted builds`,`/admin-listings#solar`),
    program("Technician Portal",inPortal===null?"N/A":`${inPortal} in portal`,handoffReady===null?"Opportunity data unavailable":`${handoffReady} handoff ready · ${wonNotPortal} won not in portal`,`/admin-listings#leads`,handoffReady?"is-warning":""),
    program("Lead Core",snapshot.operations.ok?(health.leadCore==="ok"?"HEALTHY":up(health.leadCore)):"N/A",snapshot.operations.ok?`Backend ${up(health.backend)} · Notifications ${up(health.notifications)}`:"Operations health unavailable","/admin-system",health.leadCore==="ok"?"is-good":"is-warning")
  ].join("");

  $("eus-overview-metrics").innerHTML=[
    metric("Store Revenue",snapshot.orders.ok?D().money(revenue.revenue):"N/A","Stored non-refunded orders"),
    metric("Gross Contribution*",snapshot.orders.ok?D().money(revenue.grossContribution):"N/A","Revenue minus stored supplier cost"),
    metric("Average Order",snapshot.orders.ok?D().money(revenue.aov):"N/A","Stored order average"),
    metric("Inventory Value",snapshot.inventory.ok?D().money(inventoryStats.inventoryValueCents):"N/A","Tracked inventory value"),
    metric("Low Stock",snapshot.inventory.ok?String(n(inventoryStats.lowStock)):"N/A","Tracked inventory items"),
    metric("Submitted Leads",snapshot.operations.ok?String(n(signals.submittedLeads)):"N/A","Confirmed stored submissions")
  ].join("");
  $("eus-lead-health").innerHTML=[
    metric("Active",snapshot.opportunities.ok?String(leadState.active):"N/A","Excludes lost / closed"),
    metric("New",snapshot.opportunities.ok?String(leadState.new):"N/A","Needs initial action"),
    metric("Follow-Up",snapshot.opportunities.ok?String(leadState.followup):"N/A","Pipeline follow-up stage"),
    metric("Unassigned",snapshot.opportunities.ok?String(leadState.unassigned):"N/A","No representative"),
    metric("No Next Action",snapshot.opportunities.ok?String(leadState.noNext):"N/A","Needs operating decision"),
    metric("Follow-Ups Due",snapshot.operations.ok?String(n(signals.followUpsDue)):"N/A","Existing first-party signal")
  ].join("");
  recentOrders(orders);
  const unavailable=Object.values(snapshot).filter(x=>!x.ok).map(x=>x.name);
  status.textContent=unavailable.length?`Loaded with unavailable modules: ${unavailable.join(", ")}. Unknown values are shown as N/A.`:`Updated ${new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit",second:"2-digit"})}.`;
  $("eus-ops-data-note").textContent="Data sources: Store Orders, Catalog, Inventory, Opportunities, Operations/health, Analytics, Lithium Shipping, Sync, Doba CSV Sync and Promotion APIs. Technician Portal handoff state is available from Opportunities; a separate live Technician Portal uptime API is not exposed to this dashboard.";
}
async function load(){status.textContent="Loading current operations…";try{const snapshot=await D().loadAll();if(Object.values(snapshot).some(x=>x.status===401)){showAuth("Admin session required.");return;}showOverview();render(snapshot);}catch(error){status.textContent=error.message||"Operations Interface could not load.";}}
form?.addEventListener("submit",async event=>{event.preventDefault();loginStatus.textContent="Signing in…";const fd=new FormData(form);try{await D().api("/api/admin/login",{method:"POST",body:JSON.stringify({email:fd.get("email"),password:fd.get("password")})});form.reset();loginStatus.textContent="";showOverview();await load();}catch(error){loginStatus.textContent=error.message||"Sign in failed.";}});
logout?.addEventListener("click",async()=>{try{await D().api("/api/admin/logout",{method:"POST"});}catch{}showAuth("Signed out.");});
refresh?.addEventListener("click",load);
(async()=>{if(await session()){showOverview();load();}else showAuth();})();
})();
