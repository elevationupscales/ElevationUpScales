(() => {"use strict";
const $=id=>document.getElementById(id);
const currentAdminView=()=>document.querySelector(".eus-admin-workspace-frame")?.dataset.view||"overview";
const needsOpportunityData=(view=currentAdminView())=>["overview","projects","work","table","display_all"].includes(view);
if(!$("opportunity-workspace"))return;
let projects=[],work=[],quickMarket="all";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const marketLabels={treasure_valley:"Boise / Treasure Valley",southern_colorado:"Colorado Springs / Peyton",denver_metro:"Denver Metro",outside_standard_area:"Outside Service Area",manual_review:"Location Needs Verification"};
const statusLabels={potential:"Potential",submitted:"Submitted",outside_area_review:"Outside Area Review",new:"New",contacting:"Contacting",estimate_inspection_scheduled:"Estimate / Inspection Scheduled",field_review_complete:"Field Review Complete",estimate_in_progress:"Estimate In Progress",estimate_sent:"Estimate Sent",follow_up:"Follow Up",won:"Won",lost:"Lost",closed:"Closed",reviewing:"Reviewing",contacted:"Contacted",good_fit:"Good Fit",not_a_fit:"Not a Fit",complete:"Complete"};
const projectLabels={home:"Home",rv:"RV",solar:"Solar"};
const workLabels={affiliate:"Create With Elevation",marketing:"Marketing & Content",technician:"Technician",investment:"Growth / Investment"};
const nextLabels={"Review Potential Project":"Review Project","Review Submitted Project":"Review Project","Review Work With Us Opportunity":"Review Submission"};
const wwuStatuses=[["new","New"],["reviewing","Reviewing"],["contacted","Contacted"],["good_fit","Good Fit"],["not_a_fit","Not a Fit"],["complete","Complete"]];
const wwuActions=["Review Submission","Call","Email","Request More Information","Schedule Conversation","Follow Up","No Action / Complete"];
const projectStatuses=[["new","NEW"],["contacting","CONTACTING"],["estimate_inspection_scheduled","ESTIMATE / INSPECTION SCHEDULED"],["field_review_complete","FIELD REVIEW COMPLETE"],["estimate_in_progress","ESTIMATE IN PROGRESS"],["estimate_sent","ESTIMATE SENT"],["follow_up","FOLLOW UP"],["won","WON"],["lost","LOST"],["closed","CLOSED"]];
const projectActions=["Call Customer","Text Customer","Email Customer","Schedule Estimate","Complete Inspection","Submit Field Notes","Build Estimate","Send Estimate","Follow Up","Assign Technician","Verify Service Area","No Action"];
const projectMarkets=[["southern_colorado","Colorado Springs / Peyton"],["treasure_valley","Boise / Treasure Valley"],["denver_metro","Denver Metro"],["outside_standard_area","Outside Service Area"],["manual_review","Location Needs Verification"]];
const options=(items,current)=>items.map(x=>{const value=Array.isArray(x)?x[0]:x,label=Array.isArray(x)?x[1]:x;return `<option value="${esc(value)}"${value===current?" selected":""}>${esc(label)}</option>`}).join("");
const family=()=>$("opp-family-filter")?.value||"all",projectType=()=>$("opp-project-filter")?.value||"all",marketFilter=()=>$("opp-market-filter")?.value||"all",repFilter=()=>$("opp-rep-filter")?.value||"all",portalFilter=()=>$("opp-portal-filter")?.value||"all",wwu=()=>$("opp-wwu-filter")?.value||"all",q=()=>$("opp-search")?.value.trim().toLowerCase()||"";
function refreshRepFilter(){const select=$("opp-rep-filter");if(!select)return;const selected=select.value||"all",reps=[...new Set(projects.map(x=>(x.assignedRepresentative||"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b));select.innerHTML='<option value="all">All Representatives</option><option value="__unassigned__">Unassigned</option>'+reps.map(rep=>`<option value="${esc(rep)}">${esc(rep)}</option>`).join("");if(["all","__unassigned__",...reps].includes(selected))select.value=selected;}
function rows(){
  const merged=[...projects.map(x=>({...x,_family:"projects"})),...work.map(x=>({...x,_family:"work"}))];
  return merged.filter(r=>{
    if(family()!=="all"&&r._family!==family())return false;
    if(r._family==="projects"&&projectType()!=="all"&&r.family!==projectType())return false;
    if(r._family==="projects"){
      if(quickMarket==="other"&&!new Set(["denver_metro","outside_standard_area","manual_review"]).has(r.market))return false;
      if(quickMarket!=="all"&&quickMarket!=="other"&&r.market!==quickMarket)return false;
      if(quickMarket==="all"&&marketFilter()!=="all"&&r.market!==marketFilter())return false;
      const pf=portalFilter();
      if(pf==="handoff_ready"&&!r.portalHandoffReady)return false;
      if(pf==="not_in_portal"&&r.portalStatus!=="not_in_portal")return false;
      if(pf==="in_portal"&&r.portalStatus!=="in_portal")return false;
    }
    if(r._family==="projects"&&repFilter()!=="all"){
      const rep=(r.assignedRepresentative||"").trim();
      if(repFilter()==="__unassigned__"?Boolean(rep):rep!==repFilter())return false;
    }
    if(r._family==="work"&&wwu()!=="all"&&r.type!==wwu())return false;
    const s=[r.reference,r.name,r.email,r.phone,r.city,r.location,r.family,r.type,r.market,r.serviceArea,r.assignedRepresentative,r.category,r.portalProjectId,r.details?.solarBuilder?.stageLabel,r.details?.solarBuilder?.currentStep].join(" ").toLowerCase();
    return !q()||s.includes(q());
  });
}
function activeMarketCounts(){
  const otherMarkets=new Set(["denver_metro","outside_standard_area","manual_review"]),counts={treasure_valley:0,southern_colorado:0,other:0};
  projects.forEach(r=>{const status=String(r.pipelineStatus||r.status||"").trim().toLowerCase();if(status==="lost"||status==="closed")return;if(r.market==="treasure_valley")counts.treasure_valley++;else if(r.market==="southern_colorado")counts.southern_colorado++;else if(otherMarkets.has(r.market))counts.other++;});
  return counts;
}
function updateQuickMarketControls(){
  const counts=activeMarketCounts();
  if($("opp-quick-count-treasure"))$("opp-quick-count-treasure").textContent=counts.treasure_valley;
  if($("opp-quick-count-southern"))$("opp-quick-count-southern").textContent=counts.southern_colorado;
  if($("opp-quick-count-other"))$("opp-quick-count-other").textContent=counts.other;
  document.querySelectorAll("[data-market-quick]").forEach(button=>{const value=button.dataset.marketQuick,isOtherChild=["denver_metro","outside_standard_area","manual_review"].includes(quickMarket)&&value==="other";button.classList.toggle("is-active",value===quickMarket||isOtherChild);});
  const secondary=$("opp-market-quick-other"),otherButton=document.querySelector('[data-market-quick="other"]');
  const open=quickMarket==="other"||["denver_metro","outside_standard_area","manual_review"].includes(quickMarket);
  if(secondary)secondary.hidden=!open;if(otherButton)otherButton.setAttribute("aria-expanded",open?"true":"false");
  document.dispatchEvent(new CustomEvent("eus-opportunity-market-counts",{detail:{...counts,quickMarket}}));
}
function setQuickMarket(value){
  quickMarket=quickMarket===value?"all":(value||"all");
  const select=$("opp-market-filter");if(select&&select.value!=="all")select.value="all";
  updateQuickMarketControls();render();
}
function portalLabel(r){return r.portalStatus==="in_portal"?"IN PORTAL":"NOT ADDED";}
function ownerAlertLabel(value){const status=String(value?.status||"not_recorded");if(status==="sent")return"Owner alert: sent";if(status==="scheduled")return"Owner alert: scheduled";if(status==="deduped")return"Owner alert: already queued";if(status==="unavailable")return"Owner alert: unavailable";if(status==="failed")return`Owner alert: failed${value?.failureCode?` (${value.failureCode})`:""}`;return"Owner alert: not recorded";}
function render(){
  const body=$("opp-table-body"),list=rows();
  $("opp-count-projects").textContent=projects.length;
  $("opp-count-outside").textContent=projects.filter(x=>x.market==="outside_standard_area"&&(x.pipelineStatus||x.status)!=="closed").length;
  $("opp-count-work").textContent=work.filter(x=>x.status!=="complete").length;
  updateQuickMarketControls();
  $("opp-table-summary").textContent=`${list.length} of ${projects.length+work.length} records shown`;
  if($("opportunity-workspace")?.hidden)return;
  body.innerHTML=list.length?list.map(r=>{
    const status=statusLabels[r.status]||String(r.status||"—").replaceAll("_"," ");
    const next=nextLabels[r.nextAction]||r.nextAction||"—";
    if(r._family==="projects"){
      const pipelineStatus=r.pipelineStatus||"new",pipelineNext=r.pipelineNextAction||"Call Customer",market=r.market||r.serviceArea||"manual_review",rep=r.assignedRepresentative||"",portal=portalLabel(r),portalRef=r.portalProjectId?`<small>${esc(r.portalProjectId)}</small>`:"";
      const solarStage=r.family==="solar"?String(r.details?.solarBuilder?.stageLabel||""):"";return `<tr data-project-reference="${esc(r.reference)}" data-submitted="${esc(r.createdAt||"")}"><td><strong>${esc(r.name||(r.family==="solar"?"Solar Builder Lead":"Unnamed Lead"))}</strong><div class="admin-muted">${esc(r.email||r.phone||"")}</div><div class="admin-muted">${esc(ownerAlertLabel(r.ownerNotification))}</div></td><td><strong>${esc(projectLabels[r.family]||r.family||"Project")}</strong><div class="admin-muted">${esc(r.category||"")}</div>${solarStage?`<div class="admin-muted">${esc(solarStage)}</div>`:""}</td><td class="opp-area"><select class="opp-inline-select" data-project-market>${options(projectMarkets,market)}</select></td><td><input class="opp-inline-input" data-project-rep type="text" maxlength="120" value="${esc(rep)}" placeholder="Unassigned" aria-label="Assigned Representative"></td><td class="opp-next"><select class="opp-inline-select" data-project-next>${options(projectActions,pipelineNext)}</select><button class="opp-save" type="button" data-project-save>Save</button></td><td class="opp-status"><select class="opp-inline-select" data-project-status>${options(projectStatuses,pipelineStatus)}</select></td><td><span class="opp-portal-badge ${r.portalStatus==="in_portal"?"is-in":"is-out"}">${esc(portal)}</span>${portalRef}</td><td><button class="opp-record-button" type="button" data-project-edit="${esc(r.reference)}">Open</button></td></tr>`;
    }
    return `<tr data-wwu-reference="${esc(r.reference)}" data-submitted="${esc(r.createdAt||"")}"><td><strong>${esc(r.name)}</strong><div class="admin-muted">${esc(r.email||"")}</div><div class="admin-muted">${esc(ownerAlertLabel(r.ownerNotification))}</div></td><td><strong>${esc(workLabels[r.type]||r.type||"Opportunity")}</strong></td><td>—</td><td>—</td><td class="opp-next"><select class="opp-inline-select" data-wwu-next>${options(wwuActions,next)}</select><button class="opp-save" type="button" data-wwu-save>Save</button></td><td class="opp-status"><select class="opp-inline-select" data-wwu-status>${options(wwuStatuses,r.status)}</select></td><td>—</td><td><code>${esc(r.reference)}</code></td></tr>`;
  }).join(""):'<tr><td colspan="8" class="admin-empty-cell">No leads / opportunities match these filters.</td></tr>';
}
function replaceProject(record){const i=projects.findIndex(x=>x.reference===record?.reference);if(i>=0)projects[i]=record;else if(record)projects.unshift(record);refreshRepFilter();render();document.dispatchEvent(new CustomEvent("eus-project-record-updated",{detail:{project:record}}));}
function removeProject(reference){projects=projects.filter(x=>x.reference!==reference);refreshRepFilter();render();document.dispatchEvent(new CustomEvent("eus-project-record-deleted",{detail:{reference}}));}
async function load(force=false){
  if(!force&&!needsOpportunityData())return true;
  const err=$("opp-error");
  try{
    const res=await fetch("/api/admin/opportunities",{credentials:"same-origin",headers:{Accept:"application/json"}});
    if(res.status===401)return;
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error||"Leads / Opportunities unavailable");
    projects=data.projects||[];work=data.workWithUs||[];refreshRepFilter();err.hidden=true;render();document.dispatchEvent(new CustomEvent("eus-opportunities-loaded",{detail:{projects,work}}));
  }catch(e){err.hidden=false;err.textContent=e.message;}
}
$("opp-table-body")?.addEventListener("click",async e=>{
  const projectButton=e.target.closest("[data-project-save]");
  const workButton=e.target.closest("[data-wwu-save]");
  const button=projectButton||workButton;if(!button)return;
  const row=projectButton?button.closest("[data-project-reference]"):button.closest("[data-wwu-reference]");if(!row)return;
  button.disabled=true;const original=button.textContent;button.textContent="Saving…";
  try{
    const isProject=Boolean(projectButton),reference=isProject?row.dataset.projectReference:row.dataset.wwuReference;
    const body=isProject?{reference,status:row.querySelector("[data-project-status]").value,nextAction:row.querySelector("[data-project-next]").value,market:row.querySelector("[data-project-market]").value,assignedRepresentative:row.querySelector("[data-project-rep]").value.trim()}:{reference,status:row.querySelector("[data-wwu-status]").value,nextAction:row.querySelector("[data-wwu-next]").value};
    const res=await fetch("/api/admin/opportunities",{method:"PATCH",credentials:"same-origin",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(body)});
    const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.error||"Could not update opportunity");
    if(isProject)replaceProject(data.opportunity);else{const i=work.findIndex(x=>x.reference===data.opportunity.reference);if(i>=0)work[i]=data.opportunity;render();}
    const updated=document.querySelector(`[data-${isProject?"project":"wwu"}-reference="${CSS.escape(reference)}"] [data-${isProject?"project":"wwu"}-save]`);if(updated){updated.textContent="Saved";setTimeout(()=>{updated.textContent=original;updated.disabled=false;},900);}
  }catch(err){alert(err.message);button.textContent=original;button.disabled=false;}
});
["opp-family-filter","opp-project-filter","opp-rep-filter","opp-portal-filter","opp-wwu-filter","opp-search"].forEach(id=>$(id)?.addEventListener(id==="opp-search"?"input":"change",render));
$("opp-market-filter")?.addEventListener("change",()=>{quickMarket="all";updateQuickMarketControls();render();});
document.querySelectorAll("[data-market-quick]").forEach(button=>button.addEventListener("click",()=>setQuickMarket(button.dataset.marketQuick)));
window.EUSOpportunityCenter={
  applyQuickMarket:(value)=>{quickMarket=value||"all";const select=$("opp-market-filter");if(select)select.value="all";updateQuickMarketControls();render();},
  activeMarketCounts:()=>activeMarketCounts(),
  getProject:(reference)=>projects.find(x=>x.reference===reference)||null,
  replaceProject,
  removeProject,
  refresh:()=>load(true),
};

$("admin-solar-qa")?.addEventListener("click",async()=>{
  const status=$("admin-qa-status");
  try{
    const res=await fetch("/api/admin/solar-qa-token",{method:"POST",credentials:"same-origin",headers:{Accept:"application/json"}});
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error||"Could not create Solar QA session");
    window.open(`/solar-project?qa=1&qaToken=${encodeURIComponent(data.token)}`,"_blank","noopener");
    status.textContent="Solar Builder QA opened in TEST — DO NOT PUBLISH mode.";
  }catch(e){status.textContent=e.message;}
});
})();
