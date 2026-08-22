(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const marketOptions = [["southern_colorado","Colorado Springs / Peyton"],["treasure_valley","Boise / Treasure Valley"],["denver_metro","Denver Metro"],["outside_standard_area","Outside Service Area"],["manual_review","Location Needs Verification"]];
  const familyOptions = [["home","Home"],["rv","RV"],["solar","Solar"]];
  const statusOptions = [["new","NEW"],["contacting","CONTACTING"],["estimate_inspection_scheduled","ESTIMATE / INSPECTION SCHEDULED"],["field_review_complete","FIELD REVIEW COMPLETE"],["estimate_in_progress","ESTIMATE IN PROGRESS"],["estimate_sent","ESTIMATE SENT"],["follow_up","FOLLOW UP"],["won","WON"],["lost","LOST"],["closed","CLOSED"]];
  const nextOptions = ["Call Customer","Text Customer","Email Customer","Schedule Estimate","Complete Inspection","Submit Field Notes","Build Estimate","Send Estimate","Follow Up","Assign Technician","Verify Service Area","No Action"];
  const priorityOptions = [["","Not Set"],["normal","Normal"],["high","High"],["urgent","Urgent"]];
  const portalOptions = [["not_in_portal","NOT IN PORTAL"],["in_portal","IN PORTAL"]];
  const conversationOptions = [["phone","Phone Call"],["email","Email"],["text","Text Message"],["in_person","In Person"],["other","Other"]];
  let activeReference = "";
  let savedFormState = "";
  let portalExportLoad = null;

  function loadScriptOnce(src, key) {
    const existing = document.querySelector(`script[data-eus-runtime="${key}"]`);
    if (existing) {
      if (existing.dataset.loaded === "1") return Promise.resolve();
      if (existing.dataset.failed === "1") { existing.remove(); return loadScriptOnce(src, key); }
      return new Promise((resolve, reject) => {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", () => reject(new Error(`Unable to load ${key}.`)), { once: true });
      });
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.dataset.eusRuntime = key;
      script.addEventListener("load", () => { script.dataset.loaded = "1"; resolve(); }, { once: true });
      script.addEventListener("error", () => { script.dataset.failed = "1"; script.remove(); reject(new Error(`Unable to load ${key}.`)); }, { once: true });
      document.head.appendChild(script);
    });
  }

  async function ensurePortalExport() {
    if (globalThis.EUSPortalExport) return globalThis.EUSPortalExport;
    if (!portalExportLoad) {
      portalExportLoad = (async () => {
        await loadScriptOnce("/assets/vendor/jszip-3.10.1.min.js", "jszip");
        await loadScriptOnce("/admin-portal-export.js?v=3.11.10", "portal-export");
        if (!globalThis.EUSPortalExport) throw new Error("Portal export tools did not initialize.");
        return globalThis.EUSPortalExport;
      })().catch((error) => { portalExportLoad = null; throw error; });
    }
    return portalExportLoad;
  }

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const options = (items, current) => items.map((item) => { const value=Array.isArray(item)?item[0]:item,label=Array.isArray(item)?item[1]:item; return `<option value="${esc(value)}"${value===current?" selected":""}>${esc(label)}</option>`; }).join("");

  function ensureModal() {
    if ($("project-editor-modal")) return $("project-editor-modal");
    const modal = document.createElement("div");
    modal.id = "project-editor-modal";
    modal.className = "project-editor-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <button type="button" class="project-editor-modal__backdrop" data-project-editor-close aria-label="Close Project editor"></button>
      <section class="project-editor" role="dialog" aria-modal="true" aria-labelledby="project-editor-title">
        <header class="project-editor__header">
          <div><p class="eyebrow">Lead / Opportunity</p><h2 id="project-editor-title">Edit Lead</h2><p id="project-editor-reference" class="admin-muted"></p></div>
          <button type="button" class="project-editor__close" data-project-editor-close aria-label="Close Project editor">×</button>
        </header>
        <div class="project-editor__grid">
          <label>Customer Name<input id="project-edit-name" maxlength="180"></label>
          <label>Phone<input id="project-edit-phone" maxlength="80" inputmode="tel"></label>
          <label>Email<input id="project-edit-email" maxlength="180" type="email"></label>
          <label>Project Family<select id="project-edit-family"></select></label>
          <label>Project / Service Category<input id="project-edit-category" maxlength="180"></label>
          <label>Service Market<select id="project-edit-market"></select></label>
          <label>Assigned Representative<input id="project-edit-rep" maxlength="120" placeholder="Unassigned"></label>
          <label>Status<select id="project-edit-status"></select></label>
          <label>Next Action<select id="project-edit-next"></select></label>
          <label>Priority<select id="project-edit-priority"></select></label>
          <label class="project-editor__wide">Timing / Urgency<input id="project-edit-timing" maxlength="500" placeholder="Short operational timing note"></label>
          <label class="project-editor__wide">Short Lead Summary<textarea id="project-edit-summary" rows="4" maxlength="2500"></textarea></label>
          <label class="project-editor__wide">Internal Notes<textarea id="project-edit-notes" rows="5" maxlength="5000"></textarea></label>
        </div>
        <section class="project-editor__intake" aria-label="Original intake context">
          <div><span>Original Service Area</span><strong id="project-edit-service-area">—</strong></div>
          <div><span>Location</span><strong id="project-edit-location">—</strong></div>
          <p>Original intake location/service-area data is preserved. Management Market assignment is separate.</p>
        </section>
        <section class="project-editor__conversations" aria-labelledby="project-editor-conversations-heading">
          <header><div><p class="eyebrow">Customer History</p><h3 id="project-editor-conversations-heading">Conversation Timeline</h3></div><span id="project-edit-conversation-count">0 entries</span></header>
          <div class="project-editor__conversation-form">
            <label>Channel<select id="project-edit-conversation-channel"></select></label>
            <label>Date / Time<input id="project-edit-conversation-time" type="datetime-local"></label>
            <label class="project-editor__wide">Conversation Note<textarea id="project-edit-conversation-note" rows="3" maxlength="5000" placeholder="What was discussed, promised, or decided?"></textarea></label>
            <button type="button" id="project-edit-log-conversation" class="button button-outline">Log Conversation</button>
          </div>
          <div id="project-edit-conversation-list" class="project-editor__conversation-list"></div>
        </section>
        <section class="project-editor__portal" aria-labelledby="project-editor-portal-heading">
          <header><div><p class="eyebrow">Manual Portal Bridge</p><h3 id="project-editor-portal-heading">Portal Handoff</h3></div><span id="project-edit-portal-badge" class="project-editor__portal-badge">NOT ADDED</span></header>
          <div class="project-editor__portal-grid">
            <label>Portal Status<select id="project-edit-portal-status"></select></label>
            <label>Portal Project ID / Reference<input id="project-edit-portal-id" maxlength="120" placeholder="EU-P-1042"></label>
          </div>
          <p id="project-edit-portal-audit" class="admin-muted">Not marked in Portal.</p>
          <div class="project-editor__portal-actions"><button type="button" id="project-edit-download-portal" class="button project-editor__portal-download">DOWNLOAD FOR PORTAL</button><button type="button" id="project-edit-mark-portal" class="button button-outline">MARK IN PORTAL</button></div><p class="project-editor__portal-export-note admin-muted">Exports the last saved Lead record. Save any edits before downloading. Downloading does not mark the project IN PORTAL.</p>
        </section>
        <footer class="project-editor__actions">
          <p id="project-edit-status-text" class="admin-inline-status" aria-live="polite"></p>
          <div class="project-editor__footer-buttons"><button type="button" id="project-edit-delete" class="button project-editor__danger">Delete Lead</button><button type="button" data-project-editor-close>Cancel</button><button type="button" id="project-edit-save" class="button button-primary">Save Lead</button></div>
        </footer>
      </section>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-project-editor-close]").forEach((button) => button.addEventListener("click", close));
    $("project-edit-save")?.addEventListener("click", saveProject);
    $("project-edit-delete")?.addEventListener("click", deleteLead);
    $("project-edit-mark-portal")?.addEventListener("click", markInPortal);
    $("project-edit-download-portal")?.addEventListener("click", downloadForPortal);
    $("project-edit-log-conversation")?.addEventListener("click", logConversation);
    modal.querySelectorAll("input,select,textarea").forEach((field) => { field.addEventListener("input", updateExportState); field.addEventListener("change", updateExportState); });
    return modal;
  }

  function value(id) { return $(id)?.value?.trim?.() ?? $(id)?.value ?? ""; }
  function setValue(id, v) { const el=$(id); if(el) el.value=v??""; }
  function marketLabel(value){ return Object.fromEntries(marketOptions)[value] || value || "—"; }
  function portalLabel(value){ return value === "in_portal" ? "IN PORTAL" : "NOT ADDED"; }
  function localDateTimeValue(date=new Date()){ const offset=date.getTimezoneOffset(); return new Date(date.getTime()-offset*60_000).toISOString().slice(0,16); }
  function conversationLabel(value){ return Object.fromEntries(conversationOptions)[value] || "Other"; }
  function renderConversations(project){
    const conversations=Array.isArray(project.conversations)?[...project.conversations].sort((a,b)=>String(b.occurredAt||"").localeCompare(String(a.occurredAt||""))):[];
    const count=$("project-edit-conversation-count"); if(count) count.textContent=`${conversations.length} ${conversations.length===1?"entry":"entries"}`;
    const list=$("project-edit-conversation-list"); if(!list)return;
    list.innerHTML=conversations.length?conversations.map((entry)=>`<article><header><strong>${esc(conversationLabel(entry.channel))}</strong><time datetime="${esc(entry.occurredAt)}">${esc(new Date(entry.occurredAt).toLocaleString())}</time></header><p>${esc(entry.note)}</p><small>Logged${entry.createdBy?` by ${esc(entry.createdBy)}`:""}${entry.createdAt?` · ${esc(new Date(entry.createdAt).toLocaleString())}`:""}</small></article>`).join(""):`<p class="admin-muted">No conversations logged yet. Add the first call, email, text, or meeting above.</p>`;
  }
  function currentFormState(){ return JSON.stringify({name:value("project-edit-name"),phone:value("project-edit-phone"),email:value("project-edit-email"),family:value("project-edit-family"),category:value("project-edit-category"),market:value("project-edit-market"),rep:value("project-edit-rep"),status:value("project-edit-status"),next:value("project-edit-next"),priority:value("project-edit-priority"),timing:value("project-edit-timing"),summary:value("project-edit-summary"),notes:value("project-edit-notes"),portalStatus:value("project-edit-portal-status"),portalProjectId:value("project-edit-portal-id")}); }
  function updateExportState(){
    const button=$("project-edit-download-portal"); if(!button)return;
    const dirty=Boolean(savedFormState)&&currentFormState()!==savedFormState;
    const project=activeReference?window.EUSOpportunityCenter?.getProject?.(activeReference):null;
    const exporter=window.EUSPortalExport;
    const validation=project&&exporter?exporter.validate(project):project?[]:["Open a saved Lead first."];
    button.disabled=dirty||!project||Boolean(validation.length);
    button.title=dirty?"Save Lead before exporting.":!project?"Open a saved Lead first.":validation.length?validation.join(" "):exporter?"Download a Portal handoff ZIP from the last saved Lead record.":"Load the Portal export tools and download a handoff ZIP from the last saved Lead record.";
  }

  function populate(project) {
    activeReference = project.reference;
    $("project-editor-title").textContent = project.name ? `Edit ${project.name}` : "Edit Lead";
    $("project-editor-reference").textContent = project.reference;
    setValue("project-edit-name", project.name);
    setValue("project-edit-phone", project.phone);
    setValue("project-edit-email", project.email);
    $("project-edit-family").innerHTML = options(familyOptions, project.family || "home");
    setValue("project-edit-category", project.category);
    $("project-edit-market").innerHTML = options(marketOptions, project.market || project.serviceArea || "manual_review");
    setValue("project-edit-rep", project.assignedRepresentative);
    $("project-edit-status").innerHTML = options(statusOptions, project.pipelineStatus || "new");
    $("project-edit-next").innerHTML = options(nextOptions, project.pipelineNextAction || "Call Customer");
    $("project-edit-priority").innerHTML = options(priorityOptions, project.priority || "");
    setValue("project-edit-timing", project.timingUrgency);
    setValue("project-edit-summary", project.summary);
    setValue("project-edit-notes", project.internalNotes);
    $("project-edit-service-area").textContent = marketLabel(project.serviceArea);
    $("project-edit-location").textContent = [project.city, project.state, project.zip].filter(Boolean).join(", ") || "—";
    $("project-edit-portal-status").innerHTML = options(portalOptions, project.portalStatus || "not_in_portal");
    setValue("project-edit-portal-id", project.portalProjectId);
    const badge=$("project-edit-portal-badge"); badge.textContent=portalLabel(project.portalStatus); badge.classList.toggle("is-in", project.portalStatus === "in_portal");
    $("project-edit-portal-audit").textContent = project.portalMarkedAt ? `Marked ${new Date(project.portalMarkedAt).toLocaleString()}${project.portalMarkedBy?` by ${project.portalMarkedBy}`:""}.` : "Not marked in Portal.";
    $("project-edit-conversation-channel").innerHTML = options(conversationOptions, "phone");
    setValue("project-edit-conversation-time", localDateTimeValue());
    setValue("project-edit-conversation-note", "");
    renderConversations(project);
    $("project-edit-mark-portal").disabled = project.portalStatus === "in_portal";
    const deleteButton=$("project-edit-delete");
    const deleteBlocked=(project.pipelineStatus||project.status)==="won"||project.portalStatus==="in_portal"||Boolean(project.portalProjectId||project.portalMarkedAt||project.portalMarkedBy);
    if(deleteButton){deleteButton.disabled=deleteBlocked;deleteButton.title=deleteBlocked?"Converted or Portal-linked leads cannot be deleted.":"Permanently delete this unconverted Lead.";}
    $("project-edit-status-text").textContent = "";
    savedFormState=currentFormState();
    updateExportState();
  }

  function open(reference) {
    const project = window.EUSOpportunityCenter?.getProject?.(reference);
    if (!project) { window.EUSOpportunityCenter?.refresh?.(); return; }
    const modal=ensureModal(); populate(project); modal.hidden=false; document.body.classList.add("project-editor-open");
    setTimeout(() => $("project-edit-name")?.focus(), 0);
  }
  function close() { const modal=$("project-editor-modal"); if(modal) modal.hidden=true; document.body.classList.remove("project-editor-open"); activeReference=""; savedFormState=""; }

  async function request(body, pendingText) {
    const status=$("project-edit-status-text"); if(status) status.textContent=pendingText;
    const res=await fetch("/api/admin/opportunities",{method:"PATCH",credentials:"same-origin",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(body)});
    const data=await res.json().catch(()=>({})); if(!res.ok) throw new Error(data.error||"Lead update failed");
    window.EUSOpportunityCenter?.replaceProject?.(data.opportunity); populate(data.opportunity); return data.opportunity;
  }

  async function saveProject() {
    if(!activeReference)return;
    const button=$("project-edit-save"); button.disabled=true;
    try{
      await request({
        action:"save_project_record", reference:activeReference,
        customerName:value("project-edit-name"), phone:value("project-edit-phone"), email:value("project-edit-email"),
        projectFamily:value("project-edit-family"), category:value("project-edit-category"), market:value("project-edit-market"),
        assignedRepresentative:value("project-edit-rep"), status:value("project-edit-status"), nextAction:value("project-edit-next"),
        priority:value("project-edit-priority"), timingUrgency:value("project-edit-timing"), summary:value("project-edit-summary"),
        internalNotes:value("project-edit-notes"), portalStatus:value("project-edit-portal-status"), portalProjectId:value("project-edit-portal-id")
      },"Saving Project…");
      $("project-edit-status-text").textContent="Lead saved.";
    }catch(error){$("project-edit-status-text").textContent=error.message;}finally{button.disabled=false;}
  }

  async function deleteLead() {
    if(!activeReference)return;
    const project=window.EUSOpportunityCenter?.getProject?.(activeReference);
    if(!project)return;
    const blocked=(project.pipelineStatus||project.status)==="won"||project.portalStatus==="in_portal"||Boolean(project.portalProjectId||project.portalMarkedAt||project.portalMarkedBy);
    if(blocked){$("project-edit-status-text").textContent="Converted or Portal-linked leads cannot be deleted.";return;}
    const confirmation="Are you sure you want to delete this lead?";
    if(!window.confirm(confirmation))return;
    const button=$("project-edit-delete");button.disabled=true;
    try{
      const res=await fetch("/api/admin/opportunities",{method:"DELETE",credentials:"same-origin",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({action:"delete_lead",reference:activeReference,confirmation})});
      const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.error||"Lead deletion failed");
      const deletedReference=activeReference;
      window.EUSOpportunityCenter?.removeProject?.(deletedReference);
      close();
      window.alert(data.photoCleanup==="failed"?"Lead deleted. Intake photo cleanup needs follow-up.":"Lead deleted permanently.");
    }catch(error){$("project-edit-status-text").textContent=error.message;button.disabled=false;}
  }

  async function downloadForPortal() {
    if(!activeReference)return;
    const status=$("project-edit-status-text"),button=$("project-edit-download-portal");
    if(savedFormState&&currentFormState()!==savedFormState){if(status)status.textContent="Save Lead before downloading for Portal.";updateExportState();return;}
    const project=window.EUSOpportunityCenter?.getProject?.(activeReference);
    if(!project){if(status)status.textContent="Saved Lead record is unavailable. Refresh Leads and try again.";return;}
    button.disabled=true;
    try{
      if(status)status.textContent="Loading export tools…";
      const exporter=await ensurePortalExport();
      if(status)status.textContent="Preparing Portal handoff…";
      const result=await exporter.download(project,{exportedBy:"admin"});
      if(status)status.textContent=`Downloaded ${result.filename}. Portal Status was not changed.`;
    }catch(error){if(status)status.textContent=error?.message||"Portal handoff export failed.";}finally{updateExportState();}
  }

  async function markInPortal() {
    if(!activeReference)return;
    const button=$("project-edit-mark-portal"); button.disabled=true;
    try{
      await request({action:"mark_in_portal",reference:activeReference,portalProjectId:value("project-edit-portal-id")},"Marking Portal handoff…");
      $("project-edit-status-text").textContent="Project marked IN PORTAL.";
    }catch(error){$("project-edit-status-text").textContent=error.message;button.disabled=false;}
  }

  async function logConversation() {
    if(!activeReference)return;
    const note=value("project-edit-conversation-note"),button=$("project-edit-log-conversation");
    if(!note){$("project-edit-status-text").textContent="Add a conversation note first.";$("project-edit-conversation-note")?.focus();return;}
    button.disabled=true;
    try{
      const occurredAt=value("project-edit-conversation-time");
      await request({action:"append_conversation",reference:activeReference,channel:value("project-edit-conversation-channel"),note,occurredAt:occurredAt?new Date(occurredAt).toISOString():new Date().toISOString()},"Logging conversation…");
      $("project-edit-status-text").textContent="Conversation logged.";
    }catch(error){$("project-edit-status-text").textContent=error.message;}finally{button.disabled=false;}
  }

  document.addEventListener("click", (event) => { const button=event.target.closest("[data-project-edit]"); if(button) open(button.dataset.projectEdit); });
  document.addEventListener("keydown", (event) => { if(event.key === "Escape" && !$("project-editor-modal")?.hidden) close(); });
  document.addEventListener("eus-project-record-updated", (event) => { if(activeReference && event.detail?.project?.reference===activeReference) populate(event.detail.project); });
  document.addEventListener("eus-open-project-editor", (event) => { if(event.detail?.reference) open(event.detail.reference); });
  ensureModal();
})();
