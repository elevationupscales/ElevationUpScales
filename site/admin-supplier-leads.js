(() => {
  "use strict";

  const API = "/api/admin/supplier-leads";
  const $ = (id) => document.getElementById(id);
  const TREE_STATES = [
    "01 ACTIVE / WON",
    "02 EXISTING RELATIONSHIP / DO NOT PROSPECT",
    "03 CONTACTED / WAITING",
    "04 ACKNOWLEDGED / CASE OPEN",
    "05 DRAFT ONLY / MANAGER REVIEW",
    "06 ROUTING FAILED / BLOCKED",
    "07 QUALIFIED / SOLAR + INVERTER",
    "08 QUALIFIED / COMPLEMENTARY + DROPSHIP",
    "09 RESEARCH / CHANNEL VERIFY",
    "10 BACKUP / DIVERSIFICATION / HOLD",
  ];
  const OPERATIONAL_STAGES = {
    research: "Research",
    ready_to_contact: "Ready to Contact",
    waiting: "Waiting",
    qualification_integration: "Qualification / Integration",
    active: "Active",
    closed_hold: "Closed / Hold",
  };
  const ACTION_COUNTERS = {
    ready_to_contact: "Ready to Contact",
    waiting: "Waiting",
    needs_qualification: "Needs Qualification",
    active: "Active",
    blocked_hold: "Blocked / Hold",
  };
  const SOURCE_FIELDS = [
    "supplierLeadId", "companyName", "leadType", "priority", "primaryBranch", "strategicLane", "pipelineStage",
    "communicationStatus", "accountStatus", "dedupeState", "outboundBlocked", "outboundBlockReason", "owner",
    "lastContactAt", "nextAction", "nextActionDueAt", "bestOpportunity", "productsGap", "mapStatus", "marginStatus",
    "dealerWholesaleStatus", "dropshipSummary", "dropshipAuthorization", "directCustomerFulfillment", "blindNeutralShipping",
    "inventoryTrackingFeed", "documentationStatus", "hawaiiAlaskaStatus", "hawaiiFulfillmentGap", "alaskaFulfillmentGap",
    "supplierReferralOpportunity", "thirdPartyLogisticsOpportunity", "bestCommercialLane", "commercialContact", "contactEmail",
    "contactPhone", "website", "externalEmailEvidence", "notes", "managementSource", "snapshotDate",
  ];

  let leads = [];
  let activeCounterFilter = "";
  let pendingDataset = null;
  let validatedDigest = "";

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const text = (value) => String(value ?? "").trim();
  const lower = (value) => text(value).toLowerCase();
  const dateOnly = (value) => text(value).slice(0, 10);
  const optionList = (values, selected) => Object.entries(values).map(([value, label]) => `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(label)}</option>`).join("");
  const treeOptions = (selected) => TREE_STATES.map((value) => `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(value)}</option>`).join("");
  const source = (lead) => lead?.source && typeof lead.source === "object" ? lead.source : {};
  const meaningful = (value) => {
    const normalized = lower(value);
    return Boolean(normalized) && !["unknown", "unconfirmed", "not verified", "to verify", "n/a", "none", "not primary"].includes(normalized);
  };

  async function api(url, options = {}) {
    const response = await fetch(url, {
      credentials: "same-origin",
      cache: "no-store",
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const err = new Error(body.error || body.errors?.[0] || `Request failed (${response.status})`);
      err.payload = body;
      throw err;
    }
    return body;
  }

  function showError(message = "") {
    const el = $("supplier-lead-error");
    if (!el) return;
    el.textContent = message;
    el.hidden = !message;
  }

  function configureStaticUi() {
    const stageSelect = $("supplier-lead-state-filter");
    if (stageSelect) {
      const label = stageSelect.closest("label");
      if (label?.firstChild) label.firstChild.textContent = "Operational Stage";
      stageSelect.innerHTML = `<option value="all">All stages</option>${optionList(OPERATIONAL_STAGES, "")}`;
    }
    const opportunity = $("supplier-lead-opportunity-filter");
    if (opportunity) {
      opportunity.innerHTML = [
        ["all", "All opportunities"],
        ["dropship", "Dropship"],
        ["solar_power", "Solar / Inverters / BOS"],
        ["rv_offgrid", "RV / Mobile / Off-grid"],
        ["hawaii_alaska", "Hawaii / Alaska"],
        ["referral", "Supplier Referral"],
        ["third_party_logistics", "3PL / Logistics"],
        ["regional_distribution", "Regional Distribution"],
      ].map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
    }
    const filters = document.querySelector("#supplier-leads-workspace .supplier-lead-filters");
    if (filters && !$("supplier-lead-tree-filter")) {
      filters.insertAdjacentHTML("beforeend", `<details class="supplier-advanced-filter"><summary>Source branch filter</summary><label>Original Tree Branch<select id="supplier-lead-tree-filter"><option value="all">All source branches</option>${treeOptions("")}</select></label></details>`);
      $("supplier-lead-tree-filter")?.addEventListener("change", () => { activeCounterFilter = ""; renderTable(); });
    }
    const headings = document.querySelectorAll("#supplier-leads-workspace .supplier-lead-table thead th");
    const labels = ["Supplier", "Category / Opportunity", "Dropship Status", "Stage", "Next Action", "Due", "Outreach", "Open"];
    headings.forEach((heading, index) => { if (labels[index]) heading.textContent = labels[index]; });
  }

  function renderKpis(counts = {}) {
    const root = $("supplier-lead-kpis");
    if (!root) return;
    root.innerHTML = Object.entries(ACTION_COUNTERS).map(([key, label]) => `<button type="button" data-supplier-counter="${key}" class="${activeCounterFilter === key ? "is-active" : ""}"><span>${escapeHtml(label)}</span><strong>${Number(counts[key]) || 0}</strong></button>`).join("");
    root.querySelectorAll("[data-supplier-counter]").forEach((button) => button.addEventListener("click", () => {
      activeCounterFilter = activeCounterFilter === button.dataset.supplierCounter ? "" : button.dataset.supplierCounter;
      renderKpis(currentActionCounts());
      renderTable();
    }));
  }

  function currentActionCounts() {
    return {
      ready_to_contact: leads.filter((lead) => lead.operationalStage === "ready_to_contact" && lead.outreachAllowed).length,
      waiting: leads.filter((lead) => lead.operationalStage === "waiting").length,
      needs_qualification: leads.filter((lead) => ["research", "qualification_integration"].includes(lead.operationalStage)).length,
      active: leads.filter((lead) => lead.operationalStage === "active").length,
      blocked_hold: leads.filter((lead) => !lead.outreachAllowed || lead.operationalStage === "closed_hold").length,
    };
  }

  function matchesOpportunity(lead, filter) {
    if (filter === "all") return true;
    const s = source(lead);
    const searchable = [s.strategicLane, s.bestOpportunity, s.productsGap, s.bestCommercialLane].map(lower).join(" ");
    if (filter === "dropship") return /dropship/.test(searchable) || meaningful(s.dropshipSummary) || meaningful(s.dropshipAuthorization);
    if (filter === "solar_power") return /solar|panel|inverter|mppt|controller|balance.of.system|\bbos\b/.test(searchable);
    if (filter === "rv_offgrid") return /\brv\b|off.grid|mobile power|appliance|dc electrical|converter|charger/.test(searchable);
    if (filter === "hawaii_alaska") return /hawaii|alaska|hi\/ak|west coast/.test(searchable) || meaningful(s.hawaiiFulfillmentGap) || meaningful(s.alaskaFulfillmentGap);
    if (filter === "referral") return meaningful(s.supplierReferralOpportunity);
    if (filter === "third_party_logistics") return meaningful(s.thirdPartyLogisticsOpportunity);
    if (filter === "regional_distribution") return /distribution|california|colorado|west coast|regional/.test(searchable);
    return true;
  }

  function matchesCounter(lead) {
    if (!activeCounterFilter) return true;
    if (activeCounterFilter === "ready_to_contact") return lead.operationalStage === "ready_to_contact" && lead.outreachAllowed;
    if (activeCounterFilter === "waiting") return lead.operationalStage === "waiting";
    if (activeCounterFilter === "needs_qualification") return ["research", "qualification_integration"].includes(lead.operationalStage);
    if (activeCounterFilter === "active") return lead.operationalStage === "active";
    if (activeCounterFilter === "blocked_hold") return !lead.outreachAllowed || lead.operationalStage === "closed_hold";
    return true;
  }

  function filteredLeads() {
    const query = lower($("supplier-lead-search")?.value);
    const stage = $("supplier-lead-state-filter")?.value || "all";
    const tree = $("supplier-lead-tree-filter")?.value || "all";
    const opportunity = $("supplier-lead-opportunity-filter")?.value || "all";
    return leads.filter((lead) => {
      const s = source(lead);
      if (!matchesCounter(lead)) return false;
      if (stage !== "all" && lead.operationalStage !== stage) return false;
      if (tree !== "all" && s.primaryBranch !== tree) return false;
      if (!matchesOpportunity(lead, opportunity)) return false;
      if (!query) return true;
      return [s.companyName, s.strategicLane, s.bestOpportunity, s.productsGap, s.nextAction, s.website, s.priority].map(lower).join(" ").includes(query);
    });
  }

  function renderTable() {
    const body = $("supplier-lead-table-body");
    if (!body) return;
    const rows = filteredLeads();
    body.innerHTML = rows.length ? rows.map((lead) => {
      const s = source(lead);
      const category = s.bestOpportunity || s.strategicLane || s.productsGap || "Review opportunity";
      const dropship = s.dropshipAuthorization || s.dropshipSummary || "Unknown";
      return `<tr>
        <td><strong>${escapeHtml(s.companyName || lead.company)}</strong><small>${escapeHtml(s.priority || "")}${s.priority && s.primaryBranch ? " · " : ""}${escapeHtml(s.primaryBranch || "")}</small></td>
        <td>${escapeHtml(category)}</td>
        <td>${escapeHtml(dropship)}</td>
        <td>${escapeHtml(OPERATIONAL_STAGES[lead.operationalStage] || lead.operationalStage)}</td>
        <td>${escapeHtml(s.nextAction || "Set next action")}</td>
        <td>${escapeHtml(dateOnly(s.nextActionDueAt) || "—")}</td>
        <td><span class="supplier-outreach ${lead.outreachAllowed ? "is-clear" : "is-blocked"}">${escapeHtml(lead.outreachAllowed ? "Clear" : `Blocked: ${lead.outreachBlockReason}`)}</span></td>
        <td><button type="button" data-open-supplier="${escapeHtml(lead.id)}">Open</button></td>
      </tr>`;
    }).join("") : `<tr><td colspan="8" class="admin-empty-cell">No supplier leads match this view.</td></tr>`;
    if ($("supplier-lead-summary")) $("supplier-lead-summary").textContent = `${rows.length} of ${leads.length} supplier leads shown`;
    body.querySelectorAll("[data-open-supplier]").forEach((button) => button.addEventListener("click", () => openEditor(button.dataset.openSupplier)));
  }

  async function load() {
    try {
      showError();
      const payload = await api(API);
      leads = Array.isArray(payload.leads) ? payload.leads : [];
      renderKpis(payload.actionCounts || currentActionCounts());
      renderTable();
    } catch (err) {
      if (!/login required/i.test(err.message)) showError(err.message);
    }
  }

  function inputField(name, label, value = "", type = "text", attrs = "") {
    return `<label>${escapeHtml(label)}<input name="${escapeHtml(name)}" type="${escapeHtml(type)}" value="${escapeHtml(value ?? "")}" ${attrs}></label>`;
  }
  function textareaField(name, label, value = "", rows = 3) {
    return `<label>${escapeHtml(label)}<textarea name="${escapeHtml(name)}" rows="${rows}">${escapeHtml(value ?? "")}</textarea></label>`;
  }
  function checkboxField(name, label, value) {
    return `<label class="supplier-checkbox"><input name="${escapeHtml(name)}" type="checkbox"${value ? " checked" : ""}> ${escapeHtml(label)}</label>`;
  }
  function sourceSelect(name, label, values) {
    return `<label>${escapeHtml(label)}<select name="${escapeHtml(name)}">${values}</select></label>`;
  }
  function hasLogisticsData(s) {
    return [s.hawaiiAlaskaStatus, s.hawaiiFulfillmentGap, s.alaskaFulfillmentGap, s.supplierReferralOpportunity, s.thirdPartyLogisticsOpportunity].some(meaningful);
  }

  function openEditor(id = "") {
    const lead = leads.find((item) => item.id === id) || { source: {}, operationalStage: "research", version: 1, outreachAllowed: true };
    const s = { ...Object.fromEntries(SOURCE_FIELDS.map((field) => [field, null])), ...source(lead) };
    const isNew = !lead.id;
    if (isNew) {
      s.leadType = "supplier_commercial";
      s.primaryBranch = "09 RESEARCH / CHANNEL VERIFY";
      s.pipelineStage = "RESEARCHING / CLEAN NEW LEAD";
      s.communicationStatus = "NOT CONTACTED";
      s.accountStatus = "PROSPECT";
      s.dedupeState = "CLEAN NEW LEAD";
      s.outboundBlocked = false;
    }
    const panel = $("supplier-lead-editor");
    panel.hidden = false;
    const logisticsSection = (hasLogisticsData(s) || isNew) ? `<details class="supplier-advanced-section"><summary>Logistics opportunities</summary><div class="supplier-form-grid">
      ${inputField("hawaiiAlaskaStatus", "Hawaii / Alaska Status", s.hawaiiAlaskaStatus)}
      ${inputField("hawaiiFulfillmentGap", "Hawaii Fulfillment Gap", s.hawaiiFulfillmentGap)}
      ${inputField("alaskaFulfillmentGap", "Alaska Fulfillment Gap", s.alaskaFulfillmentGap)}
      ${inputField("supplierReferralOpportunity", "Supplier Referral Opportunity", s.supplierReferralOpportunity)}
      ${inputField("thirdPartyLogisticsOpportunity", "3PL Logistics Opportunity", s.thirdPartyLogisticsOpportunity)}
    </div></details>` : "";

    panel.innerHTML = `<form id="supplier-lead-form">
      <header><div><p class="eyebrow">${isNew ? "New Supplier Growth Record" : "Protected Supplier Record"}</p><h3>${escapeHtml(isNew ? "Add Supplier" : s.companyName)}</h3></div><button type="button" data-close-supplier aria-label="Close">×</button></header>
      <input type="hidden" name="recordId" value="${escapeHtml(lead.id || "")}">
      <input type="hidden" name="version" value="${Number(lead.version) || 1}">
      <input type="hidden" name="leadType" value="supplier_commercial">
      <div class="supplier-form-grid supplier-primary-fields">
        ${inputField("supplierLeadId", "Supplier Lead ID", s.supplierLeadId || "Assigned on save", "text", "readonly")}
        ${inputField("companyName", "Supplier / Company *", s.companyName)}
        ${sourceSelect("operationalStage", "Operational Stage", optionList(OPERATIONAL_STAGES, lead.operationalStage || "research"))}
        ${inputField("nextActionDueAt", "Next Action Due", dateOnly(s.nextActionDueAt), "date")}
      </div>
      ${textareaField("nextAction", "Next Action", s.nextAction, 2)}
      ${lead.outreachBlockReason ? `<p class="supplier-block-note"><strong>Outreach blocked:</strong> ${escapeHtml(lead.outreachBlockReason)}</p>` : `<p class="supplier-clear-note">No dedupe/outreach block is currently active. This workspace does not send email.</p>`}

      <details class="supplier-advanced-section"><summary>Source classification & controls</summary><div class="supplier-form-grid">
        ${inputField("priority", "Original Priority", s.priority)}
        ${sourceSelect("primaryBranch", "Original Tree Branch", treeOptions(s.primaryBranch))}
        ${inputField("strategicLane", "Strategic Lane", s.strategicLane)}
        ${inputField("pipelineStage", "Original Pipeline Stage", s.pipelineStage)}
        ${inputField("communicationStatus", "Communication State", s.communicationStatus)}
        ${inputField("accountStatus", "Account State", s.accountStatus)}
        ${inputField("dedupeState", "Dedupe State", s.dedupeState)}
        ${inputField("owner", "Owner", s.owner)}
        ${inputField("lastContactAt", "Last Contact", s.lastContactAt || "")}
      </div>${checkboxField("outboundBlocked", "Source record marks outbound blocked", Boolean(s.outboundBlocked))}${textareaField("outboundBlockReason", "Outbound Block Reason", s.outboundBlockReason, 2)}</details>

      <details class="supplier-advanced-section"><summary>Commercial, dropship & compliance</summary><div class="supplier-form-grid">
        ${inputField("bestOpportunity", "Best Opportunity", s.bestOpportunity)}
        ${inputField("productsGap", "Products / Category Gap", s.productsGap)}
        ${inputField("bestCommercialLane", "Best Commercial Lane", s.bestCommercialLane)}
        ${inputField("dealerWholesaleStatus", "Dealer / Wholesale Status", s.dealerWholesaleStatus)}
        ${inputField("dropshipSummary", "Dropship Summary", s.dropshipSummary)}
        ${inputField("dropshipAuthorization", "Dropship Authorization", s.dropshipAuthorization)}
        ${inputField("directCustomerFulfillment", "Direct Customer Fulfillment", s.directCustomerFulfillment)}
        ${inputField("blindNeutralShipping", "Blind / Neutral Shipping", s.blindNeutralShipping)}
        ${inputField("inventoryTrackingFeed", "Inventory / Tracking Feed", s.inventoryTrackingFeed)}
        ${inputField("documentationStatus", "Documentation Status", s.documentationStatus)}
        ${inputField("mapStatus", "MAP Status", s.mapStatus)}
        ${inputField("marginStatus", "Margin Status", s.marginStatus)}
      </div></details>

      ${logisticsSection}

      <details class="supplier-advanced-section"><summary>Protected contact, evidence & notes</summary><div class="supplier-form-grid">
        ${inputField("commercialContact", "Commercial Contact", s.commercialContact)}
        ${inputField("contactEmail", "Email", s.contactEmail, "email")}
        ${inputField("contactPhone", "Phone", s.contactPhone)}
        ${inputField("website", "Website", s.website)}
        ${inputField("snapshotDate", "Snapshot Date", dateOnly(s.snapshotDate), "date")}
        ${inputField("managementSource", "Management Source", s.managementSource)}
      </div>${textareaField("externalEmailEvidence", "Protected External Email Evidence", s.externalEmailEvidence, 2)}${textareaField("notes", "Protected Internal Notes", s.notes, 4)}</details>

      <footer><button class="button button-primary" type="submit">${isNew ? "Create Supplier" : "Save Changes"}</button><button class="button button-outline" type="button" data-close-supplier>Cancel</button><span id="supplier-editor-status" aria-live="polite"></span></footer>
    </form>`;
    panel.querySelectorAll("[data-close-supplier]").forEach((button) => button.addEventListener("click", () => { panel.hidden = true; }));
    $("supplier-lead-form")?.addEventListener("submit", saveLead);
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function saveLead(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("supplier-editor-status");
    const data = new FormData(form);
    const sourceRecord = {};
    SOURCE_FIELDS.forEach((field) => {
      if (field === "outboundBlocked") sourceRecord[field] = Boolean(form.elements[field]?.checked);
      else if (field === "supplierLeadId" && String(data.get(field) || "").startsWith("Assigned")) sourceRecord[field] = "";
      else sourceRecord[field] = data.get(field) === null ? null : String(data.get(field) || "").trim() || null;
    });
    sourceRecord.leadType = "supplier_commercial";
    const recordId = String(data.get("recordId") || "");
    const payload = {
      action: recordId ? "update" : "create",
      version: Number(data.get("version")) || 1,
      operationalStage: String(data.get("operationalStage") || "research"),
      source: sourceRecord,
    };
    status.textContent = "Saving…";
    try {
      await api(`${API}/${encodeURIComponent(recordId || "new")}/action`, { method: "POST", body: JSON.stringify(payload) });
      status.textContent = "Saved";
      $("supplier-lead-editor").hidden = true;
      await load();
    } catch (err) {
      status.textContent = err.message;
    }
  }

  function installImportControls() {
    const actions = document.querySelector("#supplier-leads-workspace .supplier-lead-actions");
    if (!actions || $("supplier-import-file")) return;
    actions.insertAdjacentHTML("beforeend", `<div class="supplier-import-controls" aria-label="Protected supplier JSON import">
      <input id="supplier-import-file" type="file" accept="application/json,.json" hidden>
      <label for="supplier-import-file" class="button button-outline">Select JSON</label>
      <button id="supplier-import-preview" type="button" disabled>Preview</button>
      <button id="supplier-import-validate" type="button" disabled>Validate</button>
      <button id="supplier-import-apply" type="button" disabled>Apply</button>
    </div><p class="supplier-import-status" id="supplier-import-status" aria-live="polite">Select the protected supplier JSON file. Nothing is imported until Apply.</p>`);
    $("supplier-import-file")?.addEventListener("change", selectImportFile);
    $("supplier-import-preview")?.addEventListener("click", previewImport);
    $("supplier-import-validate")?.addEventListener("click", validateImport);
    $("supplier-import-apply")?.addEventListener("click", applyImport);
  }

  function importStatus(message, isError = false) {
    const el = $("supplier-import-status");
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("is-error", isError);
  }

  async function selectImportFile(event) {
    pendingDataset = null;
    validatedDigest = "";
    $("supplier-import-preview").disabled = true;
    $("supplier-import-validate").disabled = true;
    $("supplier-import-apply").disabled = true;
    const file = event.target.files?.[0];
    if (!file) { importStatus("Select the protected supplier JSON file. Nothing is imported until Apply."); return; }
    try {
      pendingDataset = JSON.parse(await file.text());
      $("supplier-import-preview").disabled = false;
      importStatus(`${file.name} selected. Next: Preview.`);
    } catch (_) {
      importStatus("The selected file is not valid JSON.", true);
    }
  }

  function countSummary(payload) {
    return `created ${Number(payload.created) || 0}, updated ${Number(payload.updated) || 0}, unchanged ${Number(payload.unchanged) || 0}, blocked ${Number(payload.blockedCount ?? payload.blocked) || 0}, invalid ${Number(payload.invalidRecords ?? payload.invalid) || 0}`;
  }

  async function previewImport() {
    if (!pendingDataset) return;
    validatedDigest = "";
    $("supplier-import-apply").disabled = true;
    importStatus("Previewing protected dataset…");
    try {
      const payload = await api(`${API}/import`, { method: "POST", body: JSON.stringify({ action: "preview", dataset: pendingDataset }) });
      $("supplier-import-validate").disabled = false;
      importStatus(`Preview: ${payload.validRecords}/56 records valid; ${payload.fieldCount}/41 fields; ${countSummary(payload)}. Next: Validate.`);
    } catch (err) {
      $("supplier-import-validate").disabled = true;
      importStatus(err.payload?.errors?.join(" · ") || err.message, true);
    }
  }

  async function validateImport() {
    if (!pendingDataset) return;
    importStatus("Validating all supplier records…");
    try {
      const payload = await api(`${API}/import`, { method: "POST", body: JSON.stringify({ action: "validate", dataset: pendingDataset }) });
      validatedDigest = payload.digest || "";
      $("supplier-import-apply").disabled = !validatedDigest;
      importStatus(`Validated: ${payload.validRecords}/56 records, ${payload.fieldCount}/41 fields, ${payload.blockedCount} blocked and ${payload.cleanCount} clean. ${countSummary(payload)}. Next: Apply.`);
    } catch (err) {
      validatedDigest = "";
      $("supplier-import-apply").disabled = true;
      importStatus(err.payload?.errors?.join(" · ") || err.message, true);
    }
  }

  async function applyImport() {
    if (!pendingDataset || !validatedDigest) return;
    if (!window.confirm("Apply the validated protected supplier dataset? This does not send outreach.")) return;
    importStatus("Applying validated supplier records…");
    try {
      const payload = await api(`${API}/import`, { method: "POST", body: JSON.stringify({ action: "apply", dataset: pendingDataset, previewDigest: validatedDigest }) });
      importStatus(`Applied: ${countSummary(payload)}. No outreach was sent.`);
      pendingDataset = null;
      validatedDigest = "";
      $("supplier-import-file").value = "";
      $("supplier-import-preview").disabled = true;
      $("supplier-import-validate").disabled = true;
      $("supplier-import-apply").disabled = true;
      await load();
    } catch (err) {
      importStatus(err.message, true);
    }
  }

  const stateSelect = $("supplier-lead-state-filter");
  if (!stateSelect) return;
  configureStaticUi();
  installImportControls();
  ["supplier-lead-search", "supplier-lead-state-filter", "supplier-lead-opportunity-filter"].forEach((id) => $(id)?.addEventListener(id.endsWith("search") ? "input" : "change", () => { activeCounterFilter = ""; renderKpis(currentActionCounts()); renderTable(); }));
  $("supplier-lead-add")?.addEventListener("click", () => openEditor());
  $("supplier-lead-refresh")?.addEventListener("click", load);
  document.addEventListener("eus-admin-authenticated", load);
  window.addEventListener("hashchange", () => { if (location.hash === "#supplier-leads") load(); });
  if (document.body.classList.contains("eus-admin-authenticated")) load();
})();
