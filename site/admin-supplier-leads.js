(() => {
  "use strict";
  const API = "/api/admin/supplier-leads";
  const $ = (id) => document.getElementById(id);
  const labels = {
    active_won: "Active / Won", existing_relationship: "Existing Relationship / Do Not Prospect", contacted_waiting: "Contacted / Waiting",
    acknowledged_case_open: "Acknowledged / Case Open", draft_manager_review: "Draft Only / Manager Review", routing_failed_blocked: "Routing Failed / Blocked",
    qualified_solar_inverter: "Qualified / Solar + Inverter", qualified_complementary_dropship: "Qualified / Complementary + Dropship",
    research_channel_verify: "Research / Channel Verify", backup_diversification_hold: "Backup / Diversification / Hold",
  };
  const lanes = { product_sale: "Elevation Product Sale", referral_sale: "Referral → Elevation Sale", third_party_logistics: "Third-Party Logistics", dropship: "Dropship", wholesale: "Wholesale", research: "Research" };
  let leads = [];

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const checked = (value) => value ? " checked" : "";
  const optionList = (values, selected) => Object.entries(values).map(([value, label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${escapeHtml(label)}</option>`).join("");

  async function api(url, options = {}) {
    const response = await fetch(url, { credentials: "same-origin", cache: "no-store", ...options, headers: { Accept: "application/json", ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) } });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);
    return body;
  }
  function error(message = "") { const el = $("supplier-lead-error"); if (!el) return; el.textContent = message; el.hidden = !message; }

  function renderKpis(counts = {}) {
    const root = $("supplier-lead-kpis");
    if (!root) return;
    root.innerHTML = Object.entries(labels).map(([state, label]) => `<button type="button" data-supplier-state="${state}"><span>${escapeHtml(label)}</span><strong>${Number(counts[state]) || 0}</strong></button>`).join("");
    root.querySelectorAll("[data-supplier-state]").forEach((button) => button.addEventListener("click", () => { $("supplier-lead-state-filter").value = button.dataset.supplierState; renderTable(); }));
  }
  function capabilityText(lead) {
    const d = lead.details || {};
    return [[d.dropship, "Dropship"], [d.hawaiiGap, "HI gap"], [d.alaskaGap, "AK gap"], [d.referralAvailable, "Referral"], [d.thirdPartyLogistics, "3PL"]].filter(([yes]) => yes).map(([, label]) => label).join(" · ") || "Verify";
  }
  function filteredLeads() {
    const query = String($("supplier-lead-search")?.value || "").trim().toLowerCase();
    const state = $("supplier-lead-state-filter")?.value || "all";
    const opportunity = $("supplier-lead-opportunity-filter")?.value || "all";
    return leads.filter((lead) => {
      if (state !== "all" && lead.treeState !== state) return false;
      if (opportunity !== "all" && !lead.details?.[opportunity]) return false;
      if (!query) return true;
      return [lead.company, lead.website, lead.strategicLane, lead.opportunitySummary, lead.nextAction, lead.details?.desiredProducts].join(" ").toLowerCase().includes(query);
    });
  }
  function renderTable() {
    const body = $("supplier-lead-table-body");
    if (!body) return;
    const rows = filteredLeads();
    body.innerHTML = rows.length ? rows.map((lead) => `<tr>
      <td><strong>${escapeHtml(lead.company)}</strong><small>${escapeHtml(lead.website || lead.domainKey || "No domain")}</small></td>
      <td>${escapeHtml(lanes[lead.strategicLane] || lead.strategicLane)}</td><td>${escapeHtml(labels[lead.treeState] || lead.treeState)}</td>
      <td>${escapeHtml(capabilityText(lead))}</td><td>${escapeHtml(lead.nextAction || "Set next action")}</td><td>${escapeHtml(lead.nextActionDue || "—")}</td>
      <td><span class="supplier-outreach ${lead.outreachAllowed ? "is-clear" : "is-blocked"}">${escapeHtml(lead.outreachAllowed ? "Clear after review" : lead.outreachBlockReason)}</span></td>
      <td><button type="button" data-open-supplier="${escapeHtml(lead.id)}">Open</button></td></tr>`).join("") : `<tr><td colspan="8" class="admin-empty-cell">No supplier leads match this view.</td></tr>`;
    $("supplier-lead-summary").textContent = `${rows.length} of ${leads.length} supplier leads shown`;
    body.querySelectorAll("[data-open-supplier]").forEach((button) => button.addEventListener("click", () => openEditor(button.dataset.openSupplier)));
  }
  async function load() {
    try {
      error();
      const payload = await api(API);
      leads = Array.isArray(payload.leads) ? payload.leads : [];
      renderKpis(payload.counts);
      renderTable();
    } catch (err) { if (!/login required/i.test(err.message)) error(err.message); }
  }
  function field(name, label, value = "", type = "text") { return `<label>${label}<input name="${name}" type="${type}" value="${escapeHtml(value)}"></label>`; }
  function checkbox(name, label, value) { return `<label class="supplier-checkbox"><input name="${name}" type="checkbox"${checked(value)}> ${label}</label>`; }
  function openEditor(id = "") {
    const lead = leads.find((item) => item.id === id) || { details: {}, contact: {}, priority: "normal", treeState: "research_channel_verify", strategicLane: "research", pipelineStage: "research", accountStatus: "unknown", version: 1 };
    const d = lead.details || {}, c = lead.contact || {}, isNew = !lead.id;
    const panel = $("supplier-lead-editor");
    panel.hidden = false;
    panel.innerHTML = `<form id="supplier-lead-form"><header><div><p class="eyebrow">${isNew ? "New Relationship" : "Protected Supplier Record"}</p><h3>${escapeHtml(isNew ? "Add Supplier Lead" : lead.company)}</h3></div><button type="button" data-close-supplier aria-label="Close">×</button></header>
      <input type="hidden" name="id" value="${escapeHtml(lead.id || "")}"><input type="hidden" name="version" value="${lead.version || 1}">
      <div class="supplier-form-grid">${field("company", "Supplier / Company *", lead.company)}${field("website", "Website / Domain", lead.website)}
      <label>Tree State<select name="treeState">${optionList(labels, lead.treeState)}</select></label><label>Commercial Lane<select name="strategicLane">${optionList(lanes, lead.strategicLane)}</select></label>
      <label>Priority<select name="priority">${optionList({ low:"Low", normal:"Normal", high:"High", urgent:"Urgent" }, lead.priority)}</select></label>
      <label>Pipeline<select name="pipelineStage">${optionList({ research:"Research", draft:"Draft", ready:"Ready", contacted:"Contacted", responded:"Responded", qualified:"Qualified", negotiating:"Negotiating", active:"Active", won:"Won", hold:"Hold", closed:"Closed" }, lead.pipelineStage)}</select></label>
      ${field("owner", "Owner", lead.owner)}${field("nextActionDue", "Next Action Due", lead.nextActionDue, "date")}</div>
      <label>Next Action<input name="nextAction" value="${escapeHtml(lead.nextAction || "")}"></label><label>Opportunity Summary<textarea name="opportunitySummary" rows="3">${escapeHtml(lead.opportunitySummary || "")}</textarea></label>
      <div class="supplier-capabilities">${checkbox("dropship", "Dropship", d.dropship)}${checkbox("dealerWholesale", "Dealer / wholesale", d.dealerWholesale)}${checkbox("ecommerceResale", "Ecommerce resale", d.ecommerceResale)}${checkbox("hawaiiGap", "Hawaii gap", d.hawaiiGap)}${checkbox("alaskaGap", "Alaska gap", d.alaskaGap)}${checkbox("referralAvailable", "Referral", d.referralAvailable)}${checkbox("thirdPartyLogistics", "3PL", d.thirdPartyLogistics)}${checkbox("westCoastAdvantage", "West Coast advantage", d.westCoastAdvantage)}</div>
      <details><summary>Protected contact and commercial details</summary><div class="supplier-form-grid">${field("name", "Contact Name", c.name)}${field("title", "Title", c.title)}${field("email", "Email", c.email, "email")}${field("phone", "Phone", c.phone)}${field("communicationState", "Communication State", lead.communicationState)}<label>Account<select name="accountStatus">${optionList({ unknown:"Unknown", needed:"Needed", applied:"Applied", open:"Open", active:"Active", declined:"Declined", do_not_contact:"Do Not Contact" }, lead.accountStatus)}</select></label></div>
      ${field("desiredProducts", "Desired Products", d.desiredProducts)}${field("mapPolicy", "MAP Status", d.mapPolicy)}${field("marginStatus", "Margin Status", d.marginStatus)}${field("inventoryFeed", "Inventory Feed", d.inventoryFeed)}${field("trackingFeed", "Tracking Feed", d.trackingFeed)}${field("sourceReference", "Protected Source Reference", lead.sourceReference)}
      <label>Internal Notes<textarea name="internalNotes" rows="5">${escapeHtml(lead.internalNotes || "")}</textarea></label>${checkbox("doNotContact", "Do not contact", lead.doNotContact)}</details>
      ${lead.outreachBlockReason ? `<p class="supplier-block-note"><strong>Outreach blocked:</strong> ${escapeHtml(lead.outreachBlockReason)}</p>` : ""}
      <footer><button class="button button-primary" type="submit">${isNew ? "Create Supplier Lead" : "Save Changes"}</button><button class="button button-outline" type="button" data-close-supplier>Cancel</button><span id="supplier-editor-status" aria-live="polite"></span></footer></form>`;
    panel.querySelectorAll("[data-close-supplier]").forEach((button) => button.addEventListener("click", () => { panel.hidden = true; }));
    $("supplier-lead-form").addEventListener("submit", saveLead);
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  async function saveLead(event) {
    event.preventDefault();
    const form = event.currentTarget, status = $("supplier-editor-status");
    const data = Object.fromEntries(new FormData(form).entries());
    ["dropship", "dealerWholesale", "ecommerceResale", "hawaiiGap", "alaskaGap", "referralAvailable", "thirdPartyLogistics", "westCoastAdvantage", "doNotContact"].forEach((key) => { data[key] = form.elements[key]?.checked || false; });
    data.version = Number(data.version) || 1;
    data.action = data.id ? "update" : "create";
    status.textContent = "Saving…";
    try {
      await api(`${API}/${encodeURIComponent(data.id || "new")}/action`, { method: "POST", body: JSON.stringify(data) });
      status.textContent = "Saved"; $("supplier-lead-editor").hidden = true; await load();
    } catch (err) { status.textContent = err.message; }
  }

  const stateSelect = $("supplier-lead-state-filter");
  if (!stateSelect) return;
  stateSelect.insertAdjacentHTML("beforeend", optionList(labels, ""));
  ["supplier-lead-search", "supplier-lead-state-filter", "supplier-lead-opportunity-filter"].forEach((id) => $(id)?.addEventListener(id.endsWith("search") ? "input" : "change", renderTable));
  $("supplier-lead-add")?.addEventListener("click", () => openEditor());
  $("supplier-lead-refresh")?.addEventListener("click", load);
  document.addEventListener("eus-admin-authenticated", load);
  window.addEventListener("hashchange", () => { if (location.hash === "#supplier-leads") load(); });
  if (document.body.classList.contains("eus-admin-authenticated")) load();
})();
