(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const host = $("property-opportunities-workspace");
  if (!host) return;
  const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (ch) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;",'"':"&quot;" }[ch]));
  const friendly = (value) => String(value || "—").replaceAll("_"," ").replace(/\b\w/g, (c) => c.toUpperCase());
  const boolValue = (value) => value === "" ? null : value === "true";
  let opportunities = [];
  let summary = {};
  let selected = "";

  function status(message = "", error = false) {
    const node = $("property-opportunity-status");
    if (!node) return;
    node.textContent = message;
    node.style.color = error ? "#ff9e9e" : "";
  }

  async function api(init = {}) {
    const response = await fetch("/api/admin/property-opportunities", {
      credentials: "same-origin",
      headers: { "Content-Type":"application/json", Accept:"application/json", ...(init.headers || {}) },
      ...init,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Property Opportunity request failed");
    return data;
  }

  function renderSummary() {
    const map = [
      ["property-kpi-discovered","discovered"],["property-kpi-qualified","qualified"],["property-kpi-concepts","conceptsGenerated"],
      ["property-kpi-outreach","outreachSent"],["property-kpi-visited","visited"],["property-kpi-engaged","engaged"],
      ["property-kpi-leads","leads"],["property-kpi-estimates","estimates"],["property-kpi-projects","projects"]
    ];
    map.forEach(([id,key]) => { if ($(id)) $(id).textContent = Number(summary[key]) || 0; });
    if ($("property-kpi-pipeline")) $("property-kpi-pipeline").textContent = Number.isFinite(Number(summary.pipelineValue)) && summary.pipelineValue !== null ? `${Number(summary.pipelineValue).toLocaleString()}` : "—";
  }

  function filtered() {
    const query = ($("property-opportunity-search")?.value || "").trim().toLowerCase();
    const qualification = $("property-opportunity-filter")?.value || "all";
    const region = $("property-opportunity-region")?.value || "all";
    const type = $("property-opportunity-type")?.value || "all";
    const outreach = $("property-opportunity-outreach")?.value || "all";
    const engagement = $("property-opportunity-engagement")?.value || "all";
    const conversion = $("property-opportunity-conversion")?.value || "all";
    const rep = ($("property-opportunity-rep")?.value || "").trim().toLowerCase();
    const minSolar = Number($("property-opportunity-min-solar")?.value || 0);
    const minLithium = Number($("property-opportunity-min-lithium")?.value || 0);
    const minCombined = Number($("property-opportunity-min-combined")?.value || 0);
    const dateFrom = $("property-opportunity-date")?.value || "";
    return opportunities.filter((item) => {
      if (qualification !== "all" && item.qualificationStatus !== qualification) return false;
      if (region !== "all" && item.serviceRegion !== region) return false;
      if (type !== "all" && item.opportunityType !== type) return false;
      if (outreach !== "all" && item.outreachStatus !== outreach) return false;
      if (engagement === "visited" && !(Number(item.pageVisitCount) > 0)) return false;
      if (engagement === "unvisited" && Number(item.pageVisitCount) > 0) return false;
      if (engagement === "qr" && !(Number(item.qrScanCount) > 0)) return false;
      if (engagement === "start" && !(Number(item.startProjectOpened) > 0)) return false;
      if (conversion === "unlinked" && item.convertedLeadId) return false;
      if (conversion === "linked" && !item.convertedLeadId) return false;
      if (conversion === "submitted" && !item.leadSubmitted) return false;
      if (rep && !String(item.assignedRep || "").toLowerCase().includes(rep)) return false;
      if (Number(item.solarOpportunityScore) < minSolar || Number(item.lithiumOpportunityScore) < minLithium || Number(item.combinedOpportunityScore) < minCombined) return false;
      if (dateFrom && String(item.createdAt || "").slice(0,10) < dateFrom) return false;
      if (!query) return true;
      return [item.opportunityId,item.propertyAddress,item.city,item.state,item.postalCode,item.opportunityType,item.serviceRegion,item.assignedRep]
        .join(" ").toLowerCase().includes(query);
    });
  }

  function renderMap() {
    const group = $("property-opportunity-map-points");
    const label = $("property-opportunity-map-summary");
    if (!group || !label) return;
    const points = opportunities.filter((item) => {
      const lat = Number(item.latitude), lon = Number(item.longitude);
      return Number.isFinite(lat) && Number.isFinite(lon) && lat >= 37 && lat <= 41 && lon >= -109.1 && lon <= -102;
    });
    group.innerHTML = points.map((item) => {
      const x = 38 + ((Number(item.longitude) + 109.1) / 7.1) * 644;
      const y = 28 + ((41 - Number(item.latitude)) / 4) * 246;
      const cls = Number(item.startProjectOpened) > 0 ? "is-engaged" : item.qualificationStatus === "qualified" ? "is-qualified" : "";
      return `<circle tabindex="0" role="button" aria-label="${esc(item.propertyAddress)}" data-map-id="${esc(item.opportunityId)}" class="${cls}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6"><title>${esc(item.propertyAddress)} · ${esc(item.opportunityType)} · ${esc(item.combinedOpportunityScore)}</title></circle>`;
    }).join("");
    label.textContent = points.length ? `${points.length} Colorado opportunities plotted from explicit stored coordinates. Green = qualified; amber = Start Project opened.` : "No Colorado coordinate records are available yet. The pilot does not auto-geocode addresses.";
    group.querySelectorAll("[data-map-id]").forEach((point) => {
      const open = () => { selected = point.dataset.mapId || ""; renderDetail(); $("property-opportunity-detail")?.scrollIntoView({ behavior:"smooth", block:"nearest" }); };
      point.addEventListener("click", open);
      point.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
    });
  }

  function renderTable() {
    const body = $("property-opportunity-table-body");
    if (!body) return;
    const rows = filtered();
    body.innerHTML = rows.length ? rows.map((item) => `<tr data-property-opportunity="${esc(item.opportunityId)}">
      <td><strong>${esc(item.propertyAddress)}</strong><small>${esc([item.city,item.state,item.postalCode].filter(Boolean).join(", "))}</small></td>
      <td><strong>${esc(item.opportunityType)}</strong><small>${esc(item.scoreConfidence)} confidence</small></td>
      <td><span class="property-score">${esc(item.combinedOpportunityScore)}</span><small>S ${esc(item.solarOpportunityScore)} · L ${esc(item.lithiumOpportunityScore)}</small></td>
      <td><strong>${esc(friendly(item.serviceRegion))}</strong><small>${esc(friendly(item.serviceabilityStatus))}</small></td>
      <td><span class="property-status">${esc(friendly(item.qualificationStatus))}</span><small>${esc(item.nextAction || "Review")}</small><small>Outreach: ${esc(friendly(item.outreachStatus))} · Rep: ${esc(item.assignedRep || "Unassigned")}</small></td>
      <td><strong>${Number(item.pageVisitCount)||0} visits</strong><small>${Number(item.qrScanCount)||0} QR · ${Number(item.startProjectOpened)||0} Start Project</small></td>
      <td>${item.convertedLeadId ? `<strong>${esc(item.convertedLeadId)}</strong><small>${item.leadSubmitted ? "Submitted" : "Contact captured"}</small>` : "<span>—</span>"}</td>
      <td><button type="button" data-property-open>Open</button></td>
    </tr>`).join("") : '<tr><td colspan="8" class="property-opportunity-empty">No Property Opportunities match these filters.</td></tr>';
    body.querySelectorAll("[data-property-open]").forEach((button) => button.addEventListener("click", () => {
      const row = button.closest("[data-property-opportunity]");
      selected = row?.dataset.propertyOpportunity || "";
      renderDetail();
    }));
    if ($("property-opportunity-table-summary")) $("property-opportunity-table-summary").textContent = `${rows.length} of ${opportunities.length} property records · manual pilot · no automated outreach`;
  }

  function reasonList(item) {
    const reasons = Array.isArray(item.reasonCodes) ? item.reasonCodes : [];
    return reasons.slice(0,8).map((reason) => `<li><strong>${esc(reason.code)}</strong> — ${esc(reason.label)} <small>(${Number(reason.points)||0})</small></li>`).join("") || "<li>No reason codes stored.</li>";
  }

  function renderDetail() {
    const panel = $("property-opportunity-detail");
    if (!panel) return;
    const item = opportunities.find((entry) => entry.opportunityId === selected);
    if (!item) { panel.hidden = true; panel.innerHTML = ""; return; }
    panel.hidden = false;
    panel.innerHTML = `<div class="property-opportunity-detail-grid">
      <section><h3>${esc(item.propertyAddress)}</h3><p>${esc([item.city,item.state,item.postalCode].filter(Boolean).join(", "))}</p>
        <p><strong>${esc(item.opportunityType)}</strong> · score ${esc(item.combinedOpportunityScore)} · ${esc(item.scoreConfidence)} confidence</p>
        <div class="property-opportunity-links">
          <a href="${esc(item.publicPageUrl)}" target="_blank" rel="noopener">Open personalized page</a>
          <a href="${esc(item.qrTrackingUrl)}" target="_blank" rel="noopener">Open QR tracking URL</a>
          <a href="${esc(item.startProjectUrl)}" target="_blank" rel="noopener">Test Start Project handoff</a>
        </div>
        <p class="property-opportunity-note">QR route tracking is live in the pilot. A printable QR graphic is intentionally not auto-generated in Phase 1.</p>
      </section>
      <section><h4>Explainable score</h4><ul>${reasonList(item)}</ul><p><strong>Solar:</strong> ${item.estimatedSolarKwLow ?? "—"}–${item.estimatedSolarKwHigh ?? "—"} kW</p><p><strong>Storage:</strong> ${item.estimatedStorageKwhLow ?? "—"}–${item.estimatedStorageKwhHigh ?? "—"} kWh</p><p>${esc(item.qualificationReason)}</p></section>
      <section><h4>Management</h4>
        <label>Assigned Rep<input id="property-edit-rep" value="${esc(item.assignedRep)}"></label>
        <label>Next Action<input id="property-edit-next" value="${esc(item.nextAction)}"></label>
        <label>Qualification<select id="property-edit-qualification">${["qualified","review","watch","archived"].map((v) => `<option value="${v}" ${item.qualificationStatus===v?"selected":""}>${friendly(v)}</option>`).join("")}</select></label>
        <label>Outreach record<select id="property-edit-outreach">${["not_sent","approved","sent","paused"].map((v) => `<option value="${v}" ${item.outreachStatus===v?"selected":""}>${friendly(v)}</option>`).join("")}</select></label>
        <label>Outreach Type<input id="property-edit-outreach-type" value="${esc(item.outreachType)}" placeholder="mail / manual email / other"></label>
        <label>Notes<textarea id="property-edit-notes">${esc(item.notes)}</textarea></label>
        <button type="button" class="button button-primary" id="property-save">Save Management State</button>
        <p class="property-opportunity-note">Changing outreach status records a human action only. This screen sends nothing.</p>
      </section>
    </div>`;
    $("property-save")?.addEventListener("click", saveDetail);
  }

  async function saveDetail() {
    const item = opportunities.find((entry) => entry.opportunityId === selected);
    if (!item) return;
    try {
      status("Saving Property Opportunity…");
      const data = await api({
        method:"PATCH",
        body:JSON.stringify({
          opportunityId:item.opportunityId,
          assignedRep:$("property-edit-rep")?.value || "",
          nextAction:$("property-edit-next")?.value || "",
          qualificationStatus:$("property-edit-qualification")?.value || item.qualificationStatus,
          outreachStatus:$("property-edit-outreach")?.value || item.outreachStatus,
          outreachType:$("property-edit-outreach-type")?.value || "",
          notes:$("property-edit-notes")?.value || "",
        }),
      });
      opportunities = opportunities.map((entry) => entry.opportunityId === item.opportunityId ? data.opportunity : entry);
      renderTable(); renderDetail(); status("Saved. No outbound message was sent.");
    } catch (error) { status(error.message, true); }
  }

  async function load() {
    try {
      status("Loading Property Opportunities…");
      const data = await api();
      opportunities = Array.isArray(data.opportunities) ? data.opportunities : [];
      summary = data.summary || {};
      renderSummary(); renderTable(); renderMap(); renderDetail();
      status("Property Intelligence pilot ready · manual/test inputs only · outbound automation off");
    } catch (error) {
      if (/unauthorized|session/i.test(error.message)) return;
      status(error.message, true);
    }
  }

  ["property-opportunity-search","property-opportunity-rep","property-opportunity-min-solar","property-opportunity-min-lithium","property-opportunity-min-combined","property-opportunity-date"].forEach((id) => $(id)?.addEventListener("input", renderTable));
  ["property-opportunity-filter","property-opportunity-region","property-opportunity-type","property-opportunity-outreach","property-opportunity-engagement","property-opportunity-conversion"].forEach((id) => $(id)?.addEventListener("change", renderTable));
  $("property-opportunity-refresh")?.addEventListener("click", load);
  $("property-opportunity-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.existingSolarDetected = boolValue(payload.existingSolarDetected);
    payload.ruralOrOffgridSignal = boolValue(payload.ruralOrOffgridSignal);
    payload.backupPowerApplicability = boolValue(payload.backupPowerApplicability);
    try {
      status("Scoring and creating Property Opportunity…");
      const data = await api({ method:"POST", body:JSON.stringify(payload) });
      event.currentTarget.reset();
      selected = data.opportunity?.opportunityId || "";
      await load();
      renderDetail();
      status("Property Opportunity created. Review the score and personalized page before any outreach.");
    } catch (error) { status(error.message, true); }
  });

  document.addEventListener("eus-admin-authenticated", load);
  document.addEventListener("eus-admin-live-refresh", load);
  document.addEventListener("eus-admin-view-change", (event) => { if (event.detail?.view === "projects") load(); });
})();
