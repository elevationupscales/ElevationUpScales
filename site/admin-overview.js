(() => {
  "use strict";
  const $=(id)=>document.getElementById(id);
  const auth=$("eus-admin-auth"),overview=$("eus-admin-overview"),form=$("eus-admin-login-form"),loginStatus=$("eus-admin-login-status"),refresh=$("eus-admin-refresh"),logout=$("eus-admin-logout"),status=$("eus-overview-status");
  const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const D=()=>window.EUSAdminData;
  function metric(label,value,note=""){return `<article class="eus-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong>${note?`<small>${esc(note)}</small>`:""}</article>`;}
  function action(label,count,note,url,kind=""){return `<a class="eus-action-card ${kind}" href="${url}"><span>${esc(label)}</span><strong>${esc(count)}</strong><small>${esc(note)}</small></a>`;}
  function orderLabel(value){return({fulfillment_pending:"Needs Order",supplier_ordered:"Supplier Ordered",shipped:"Shipped",completed:"Completed",hold_issue:"Hold / Issue",refund_needed:"Refund Needed",refunded:"Refunded",cancelled:"Cancelled"})[value]||value||"Pending";}
  function activeProject(p){return !["lost","closed"].includes(String(p.pipelineStatus||p.status||"").toLowerCase());}
  function showAuth(message=""){auth.hidden=false;overview.hidden=true;loginStatus.textContent=message;}
  function showOverview(){auth.hidden=true;overview.hidden=false;}
  async function session(){try{const r=await D().api("/api/admin/session");return Boolean(r?.authenticated||r?.ok||r?.admin);}catch(e){return false;}}
  function recentOrders(orders=[]){
    const rows=[...orders].sort((a,b)=>String(b.paidAt||b.createdAt||"").localeCompare(String(a.paidAt||a.createdAt||""))).slice(0,8);
    $("eus-recent-orders").innerHTML=rows.length?rows.map(o=>`<tr><td><a href="/admin-store-orders"><strong>${esc(o.id)}</strong></a><br><small>${esc(o.paidAt||o.createdAt||"")}</small></td><td>${esc(o.shipping?.fullName||o.customer?.email||"—")}</td><td>${esc(o.source==="rv"?"RV & Outdoor":o.source==="apparel"?"Apparel":o.source||"Store")}</td><td>${D().money(o.totalCents)}</td><td><span class="eus-pill ${["hold_issue","refund_needed"].includes(o.fulfillmentStatus)?"is-alert":["fulfillment_pending","supplier_ordered"].includes(o.fulfillmentStatus)?"is-warn":""}">${esc(orderLabel(o.fulfillmentStatus))}</span></td></tr>`).join(""):'<tr><td colspan="5" class="eus-empty">No stored orders yet.</td></tr>';
  }
  function render(snapshot){
    const orders=snapshot.orders.ok?(snapshot.orders.data.orders||[]):[];
    const orderState=D().orderActions(orders);
    const catalog=snapshot.catalog.ok?snapshot.catalog.data:{};
    const catalogState=D().catalogActions(catalog);
    const syncState=snapshot.sync.ok?(snapshot.sync.data||{}):{};
    const syncCounts=syncState.counts||{};
    const projects=snapshot.opportunities.ok?(snapshot.opportunities.data.projects||[]):[];
    const leadState=D().leadActions(projects);
    const revenue=D().computeRevenue(orders);
    const ops=snapshot.operations.ok?(snapshot.operations.data||{}):{};
    const signals=ops.signals||{};
    const lithium=snapshot.lithium.ok?(snapshot.lithium.data||{}):{};
    const hawaiiRequests=Array.isArray(lithium.requests)?lithium.requests:[];
    const hawaiiRecords=Array.isArray(lithium.records)?lithium.records:[];
    const hawaiiBatches=Array.isArray(lithium.batches)?lithium.batches:[];
    const hawaiiBatchMetrics=Array.isArray(lithium.metrics?.batchMetrics)?lithium.metrics.batchMetrics:[];
    const reservations=snapshot.lithium.ok?hawaiiRequests.filter(r=>!["CLOSED","CANCELLED"].includes(String(r.state||"").toUpperCase())).length:null;
    const supplierRechecks=snapshot.lithium.ok?hawaiiRecords.filter(r=>r.inventoryRecheckRequired||["UNKNOWN","RECHECK REQUIRED","SUPPLIER ERROR"].includes(String(r.supplierStockState||"").toUpperCase())).length:null;
    const blockedBatchLines=hawaiiBatchMetrics.reduce((n,m)=>n+(Number(m.blockedOrders)||0),0);
    const shippingBlocked=snapshot.lithium.ok?hawaiiRecords.filter(r=>r.hold||String(r.reviewState||"").toUpperCase()!=="INTERNAL REQUIREMENTS SATISFIED").length+blockedBatchLines:null;
    const confirmations=snapshot.lithium.ok?hawaiiBatchMetrics.reduce((n,m)=>n+(Number(m.pendingCustomerConfirmations)||0),0):null;
    const batches=snapshot.lithium.ok?hawaiiBatches.filter(b=>!["COMPLETE","CANCELLED"].includes(String(b.status||"").toUpperCase())).length:null;

    const actions=[
      action("Purchase from supplier",snapshot.orders.ok?orderState.supplier:"N/A","Paid orders still needing supplier fulfillment.","/admin-store-orders","is-warning"),
      action("Tracking needed",snapshot.orders.ok?orderState.tracking:"N/A","Supplier ordered but tracking has not been recorded.","/admin-store-orders","is-warning"),
      action("Shipping / order issues",snapshot.orders.ok?(orderState.hold+orderState.refund):"N/A","Holds, fulfillment problems and refund-required orders.","/admin-store-orders","is-urgent"),
      action("New leads",snapshot.opportunities.ok?leadState.new:"N/A","Active project leads still in NEW status.","/admin-listings#leads",""),
      action("Unassigned leads",snapshot.opportunities.ok?leadState.unassigned:"N/A","Active leads with no assigned representative.","/admin-listings#leads",leadState.unassigned?"is-warning":""),
      action("Leads missing next action",snapshot.opportunities.ok?leadState.noNext:"N/A","Active records parked without a meaningful next step.","/admin-listings#leads",leadState.noNext?"is-warning":""),
      action("Products ready to publish",snapshot.sync.ok?syncCounts.ready:"N/A","Products that pass current server-side listing readiness gates.","/admin-catalog",syncCounts.ready?"is-warning":""),
      action("Doba CSV Sync",snapshot.doba?.ok?(doba.runs?.[0]?.status|| (doba.latestSuccessfulImport?"Fresh":"Upload Needed")):"N/A","Upload supplier snapshot, preview changes, then approve reconciliation.","/admin-channels#doba-csv-sync",snapshot.doba?.ok&&!doba.latestSuccessfulImport?"is-warning":""),
      action("Products needing review",snapshot.sync.ok?syncCounts.review:(snapshot.catalog.ok?catalogState.review:"N/A"),"Actionable product identity, cost, stock, shipping, margin, HOLD, or mapping blockers.","/admin-catalog",syncCounts.review?"is-warning":""),
      action("Listings out of sync",snapshot.sync.ok?syncCounts.outOfSync:"N/A","Channel/source relationships needing review, recheck, or configuration.","/admin-channels",syncCounts.outOfSync?"is-warning":""),
      action("Sync errors / stale",snapshot.sync.ok?((syncCounts.syncError||0)+(syncCounts.stale||0)):"N/A","Automation errors and supplier/source observations needing a fresh check.","/admin-system",(syncCounts.syncError||syncCounts.stale)?"is-urgent":""),
      action("Hawaii reservations",reservations===null?"N/A":reservations,"Open reservation records needing operating awareness.","/admin-lithium-shipping",reservations?"is-warning":""),
      action("Supplier rechecks",supplierRechecks===null?"N/A":supplierRechecks,"Lithium products whose supplier availability needs a fresh check.","/admin-lithium-shipping",supplierRechecks?"is-warning":""),
      action("Shipping blockers",shippingBlocked===null?"N/A":shippingBlocked,"Product or batch shipping controls that are not ready.","/admin-lithium-shipping",shippingBlocked?"is-urgent":""),
      action("Customer confirmations",confirmations===null?"N/A":confirmations,"Hawaii batch lines waiting on current customer approval.","/admin-lithium-shipping",confirmations?"is-warning":""),
      action("Open Hawaii batches",batches===null?"N/A":batches,"Active planning, quote, review, booking, or transit batches.","/admin-lithium-shipping","")
    ];
    $("eus-action-board").innerHTML=actions.join("");

    const leadWon=projects.filter(p=>String(p.pipelineStatus||p.status||"").toLowerCase()==="won").length;
    const activeLeads=projects.filter(activeProject).length;
    const metrics=[
      metric("Store Revenue",snapshot.orders.ok?D().money(revenue.revenue):"N/A","Stored non-refunded orders"),
      metric("Store Orders",snapshot.orders.ok?String(revenue.orders):"N/A","Paid / active stored orders"),
      metric("Average Order",snapshot.orders.ok?D().money(revenue.aov):"N/A","Stored order average"),
      metric("Gross Contribution*",snapshot.orders.ok?D().money(revenue.grossContribution):"N/A","Revenue minus stored supplier cost"),
      metric("Active Leads",snapshot.opportunities.ok?String(activeLeads):"N/A","Excludes lost / closed"),
      metric("Won Leads",snapshot.opportunities.ok?String(leadWon):"N/A","Current stored project records")
    ];
    $("eus-overview-metrics").innerHTML=metrics.join("");
    $("eus-lead-health").innerHTML=[
      metric("New",snapshot.opportunities.ok?String(leadState.new):"N/A","Needs initial action"),
      metric("Follow-Up",snapshot.opportunities.ok?String(leadState.followup):"N/A","Pipeline follow-up stage"),
      metric("Unassigned",snapshot.opportunities.ok?String(leadState.unassigned):"N/A","No representative"),
      metric("No Next Action",snapshot.opportunities.ok?String(leadState.noNext):"N/A","Needs operating decision"),
      metric("Tracked Follow-Ups Due",snapshot.operations.ok?String(Number(signals.followUpsDue)||0):"N/A","Existing first-party signal"),
      metric("Submitted Leads",snapshot.operations.ok?String(Number(signals.submittedLeads)||0):"N/A","Confirmed stored submissions")
    ].join("");
    recentOrders(orders);
    const unavailable=Object.values(snapshot).filter(x=>!x.ok).map(x=>x.name);
    status.textContent=unavailable.length?`Loaded with unavailable modules: ${unavailable.join(", ")}. Unknown values are shown as N/A.`:`Updated ${new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit",second:"2-digit"})}.`;
  }
  async function load(){
    status.textContent="Loading current operations…";
    try{const snapshot=await D().loadAll();if(Object.values(snapshot).some(x=>x.status===401)){showAuth("Admin session required.");return;}showOverview();render(snapshot);}catch(error){status.textContent=error.message||"Command Center could not load.";}
  }
  form?.addEventListener("submit",async(event)=>{event.preventDefault();loginStatus.textContent="Signing in…";const fd=new FormData(form);try{await D().api("/api/admin/login",{method:"POST",body:JSON.stringify({email:fd.get("email"),password:fd.get("password")})});form.reset();loginStatus.textContent="";showOverview();await load();}catch(error){loginStatus.textContent=error.message||"Sign in failed.";}});
  logout?.addEventListener("click",async()=>{try{await D().api("/api/admin/logout",{method:"POST"});}catch(_){}showAuth("Signed out.");});
  refresh?.addEventListener("click",load);
  (async()=>{if(await session()){showOverview();load();}else showAuth();})();
})();
