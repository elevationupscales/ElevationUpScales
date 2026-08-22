(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const dashboard = $("admin-dashboard");
  if (!dashboard) return;

  const STORAGE_VIEW = "eus-admin-workspace-view-v2";
  const STORAGE_PRESENTATION = "eus-admin-workspace-presentation-v1";
  const STORAGE_NAV = "eus-admin-workspace-nav-v1";

  const viewLabels = {
    projects: "Leads",
    solar: "Solar Activity",
    marketplace: "Listings",
    followup: "Marketplace Follow-Up",
    work: "Work With Us",
    overview: "Daily Overview",
    analytics: "Analytics",
    system: "System / QA",
    table: "All Records",
    display_all: "Full Console",
  };
  const navGroups = [
    { label: "Work", views: ["projects", "solar", "marketplace", "followup", "work"] },
    { label: "Insights", views: ["overview", "analytics"] },
    { label: "Administration", views: ["system", "table", "display_all"] },
  ];
  const viewShortLabels = { projects:"LD", solar:"SO", marketplace:"MK", followup:"FU", work:"WW", overview:"OV", analytics:"AN", system:"QA", table:"AR", display_all:"FC" };
  const viewHashes = { projects:"leads", solar:"solar", marketplace:"marketplace", followup:"marketplace-follow-up", work:"work-with-us", overview:"overview", analytics:"analytics", system:"system", table:"all-records", display_all:"full-console" };
  const hashViews = Object.fromEntries(Object.entries(viewHashes).map(([view, hash]) => [hash, view]));
  const navCountSources = { projects:"opp-count-projects", solar:"signal-action-required", marketplace:"summary-pending", followup:"followup-metric-needed", system:"summary-issues" };

  const topChildren = [...dashboard.children];
  const statusStrip = $("eus-overview-status-strip");
  const priority = topChildren.find((el) => el.classList.contains("admin-priority-bar"));
  const summary = topChildren.find((el) => el.classList.contains("admin-summary-grid"));
  const command = topChildren.find((el) => el.classList.contains("admin-command-actions"));
  const ownerSignals = topChildren.find((el) => el.classList.contains("admin-owner-signals"));
  const opportunity = $("opportunity-workspace");
  const solarLeads = topChildren.find((el) => el.classList.contains("admin-leads-workspace"));
  const solarInsights = topChildren.find((el) => el.classList.contains("admin-lead-insights"));
  const followup = $("marketplace-followup-registry");
  const marketplace = topChildren.find((el) => el.classList.contains("admin-workspace"));
  const system = topChildren.find((el) => el.classList.contains("admin-two-column") && !el.classList.contains("admin-lower"));
  const lower = topChildren.find((el) => el.classList.contains("admin-two-column") && el.classList.contains("admin-lower"));

  const frame = document.createElement("div");
  frame.className = "eus-admin-workspace-frame";
  frame.innerHTML = `
    <aside class="eus-admin-workspace-nav" aria-label="Control Center views">
      <div class="eus-admin-workspace-nav__head">
        <div><span>CONTROL CENTER</span><strong>Workspace</strong></div>
        <button type="button" id="eus-admin-nav-toggle" aria-label="Collapse workspace navigation" title="Collapse navigation">‹</button>
      </div>
      <nav id="eus-admin-view-nav">
        ${navGroups.map((group) => `<section class="eus-admin-nav-group" aria-label="${group.label}"><strong>${group.label}</strong>${group.views.map((key) => `<button type="button" data-admin-view="${key}" data-short="${viewShortLabels[key]}"><span>${viewLabels[key]}</span>${navCountSources[key] ? `<small data-admin-nav-count="${navCountSources[key]}" hidden></small>` : ""}</button>`).join("")}</section>`).join("")}
      </nav>
      <div class="eus-admin-workspace-nav__note">
        <strong>One record system.</strong>
        <span>Views organize existing records only.</span>
      </div>
    </aside>
    <div class="eus-admin-workspace-main">
      <header class="eus-admin-view-head">
        <div><span class="eyebrow">Authenticated Workspace</span><h2 id="eus-admin-view-title">Overview</h2></div>
        <p id="eus-admin-view-description">What needs attention and where the business stands.</p>
      </header>
      <div id="eus-admin-view-controls" class="eus-admin-view-controls" hidden></div>
      <div id="eus-admin-view-content"></div>
    </div>`;
  dashboard.appendChild(frame);

  const content = $("eus-admin-view-content");
  const controls = $("eus-admin-view-controls");
  const title = $("eus-admin-view-title");
  const description = $("eus-admin-view-description");
  const nav = $("eus-admin-view-nav");
  const navToggle = $("eus-admin-nav-toggle");

  const allSections = [statusStrip, priority, command, summary, ownerSignals, opportunity, solarLeads, solarInsights, marketplace, followup, system, lower].filter(Boolean);
  allSections.forEach((el) => content.appendChild(el));
  const displayAllSections = [statusStrip, command, summary, ownerSignals, opportunity, solarLeads, solarInsights, marketplace, followup, system, lower].filter(Boolean);

  const viewSections = {
    overview: [statusStrip, command],
    projects: [opportunity],
    analytics: [ownerSignals],
    solar: [solarLeads, solarInsights],
    marketplace: [priority, summary, marketplace],
    work: [opportunity],
    followup: [followup],
    table: [opportunity],
    system: [system, lower],
    display_all: displayAllSections,
  };

  const viewDescriptions = {
    overview: "Daily operating view: what needs attention, active leads, conversion pulse and contact actions.",
    projects: "The working Lead queue for Home, RV, Solar and Outside Area project opportunities.",
    analytics: "Read-only owner analytics: website demand, conversion, customer intent and Marketplace activity without becoming another work queue.",
    solar: "Solar-specific Builder activity, intent and follow-up support; submitted project opportunities remain in the main Leads queue.",
    marketplace: "Marketplace listing operations remain separate from Leads / Opportunities.",
    work: "Affiliate, Marketing, Technician and Growth opportunities remain separate from customer Leads.",
    followup: "Marketplace customer follow-up using the existing protected manual Gmail workflow.",
    table: "Dense Lead and Work With Us operating view over the same records.",
    system: "Submission reliability, system health, recent management activity and controlled QA.",
    display_all: "All existing Control Center sections in one continuous management view.",
  };

  const initialHashView = hashViews[String(location.hash || "").replace(/^#/, "")];
  let currentView = initialHashView || safeStorageGet(STORAGE_VIEW) || "projects";
  if (!viewLabels[currentView]) currentView = "projects";
  let currentPresentation = safeStorageGet(STORAGE_PRESENTATION) || "table";
  if (!new Set(["card", "table"]).has(currentPresentation)) currentPresentation = "table";
  const PAGE_SIZE = 10;
  let currentPage = 1;
  let latestProjects = [];
  let processingRows = false;
  let rowApplyQueued = false;
  let opportunityObserver = null;
  let quickLeadFilter = "all";

  function safeStorageGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }

  function setSelect(id, value) {
    const el = $(id);
    if (!el || el.value === value) return;
    el.value = value;
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function ensurePrimaryStatusControl() {
    const tools = opportunity?.querySelector(".admin-section-head .admin-table-tools");
    if (!tools) return null;
    let label = tools.querySelector("[data-eus-primary-status]");
    if (!label) {
      label = document.createElement("label");
      label.dataset.eusPrimaryStatus = "1";
      label.innerHTML = `Status<select id="eus-opp-status"><option value="all">All statuses</option></select>`;
      tools.appendChild(label);
      label.querySelector("select")?.addEventListener("change", () => {
        quickLeadFilter = "all";
        syncLeadQuickFilters();
        currentPage = 1;
        queueOpportunityApply();
      });
    }
    return label;
  }

  function configureOpportunityScope(view) {
    if (!opportunity) return;
    const familyFilter = $("opp-family-filter");
    const projectFilter = $("opp-project-filter");
    const marketFilter = $("opp-market-filter");
    const repFilter = $("opp-rep-filter");
    const portalFilter = $("opp-portal-filter");
    const wwuFilter = $("opp-wwu-filter");
    const searchFilter = $("opp-search");
    const quickMarkets = $("opp-market-quick");
    const primaryStatus = ensurePrimaryStatusControl();
    const tools = opportunity.querySelector(".admin-section-head .admin-table-tools");

    if (view === "projects") {
      setSelect("opp-family-filter", "projects");
      if (familyFilter) familyFilter.closest("label").hidden = true;
      if (projectFilter) projectFilter.closest("label").hidden = true;
      if (marketFilter) marketFilter.closest("label").hidden = false;
      if (repFilter) repFilter.closest("label").hidden = false;
      if (portalFilter) portalFilter.closest("label").hidden = true;
      if (wwuFilter) wwuFilter.closest("label").hidden = true;
      if (searchFilter) searchFilter.closest("label").hidden = false;
      if (primaryStatus) primaryStatus.hidden = false;
      if (quickMarkets) quickMarkets.hidden = true;

      // Locked primary filter order: Search | Status | Market | Assigned Rep.
      [searchFilter?.closest("label"), primaryStatus, marketFilter?.closest("label"), repFilter?.closest("label")]
        .filter(Boolean)
        .forEach((label) => tools?.appendChild(label));
    } else if (view === "work") {
      setSelect("opp-family-filter", "work");
      if (familyFilter) familyFilter.closest("label").hidden = true;
      if (projectFilter) projectFilter.closest("label").hidden = true;
      if (marketFilter) marketFilter.closest("label").hidden = true;
      if (repFilter) repFilter.closest("label").hidden = true;
      if (portalFilter) portalFilter.closest("label").hidden = true;
      if (wwuFilter) wwuFilter.closest("label").hidden = false;
      if (searchFilter) searchFilter.closest("label").hidden = false;
      if (primaryStatus) primaryStatus.hidden = false;
      if (quickMarkets) quickMarkets.hidden = true;
    } else if (view === "table" || view === "display_all") {
      setSelect("opp-family-filter", "all");
      if (familyFilter) familyFilter.closest("label").hidden = false;
      if (projectFilter) projectFilter.closest("label").hidden = false;
      if (marketFilter) marketFilter.closest("label").hidden = false;
      if (repFilter) repFilter.closest("label").hidden = false;
      if (portalFilter) portalFilter.closest("label").hidden = false;
      if (wwuFilter) wwuFilter.closest("label").hidden = false;
      if (searchFilter) searchFilter.closest("label").hidden = false;
      if (primaryStatus) primaryStatus.hidden = false;
      if (quickMarkets) quickMarkets.hidden = view !== "display_all";
    } else if (primaryStatus) {
      primaryStatus.hidden = true;
    }

    const heading = opportunity.querySelector(".admin-section-head h2");
    const eyebrow = opportunity.querySelector(".admin-section-head .eyebrow");
    const blurb = opportunity.querySelector(".admin-section-head .admin-muted");
    if (view === "projects") {
      if (eyebrow) eyebrow.textContent = "Leads";
      if (heading) heading.textContent = "Lead Queue";
      if (blurb) blurb.textContent = "One working queue for Home, RV, Solar and Outside Area project leads. Next Action is the operating priority.";
    } else if (view === "work") {
      if (eyebrow) eyebrow.textContent = "Work With Us";
      if (heading) heading.textContent = "Growth Opportunities";
      if (blurb) blurb.textContent = "Affiliate, Marketing, Technician and Growth / Investment records remain outside the customer Leads queue.";
    } else if (view === "display_all") {
      if (eyebrow) eyebrow.textContent = "Leads & Work With Us";
      if (heading) heading.textContent = "Leads / Opportunities";
      if (blurb) blurb.textContent = "Lead and Work With Us records stay operationally separate while remaining visible in the full-company view.";
    } else {
      if (eyebrow) eyebrow.textContent = "Operating Table";
      if (heading) heading.textContent = "Leads & Work With Us";
      if (blurb) blurb.textContent = "Dense cross-family view. Organization controls do not mutate record state.";
    }
  }

  function buildOpportunityControls() {
    controls.innerHTML = `
      ${currentView === "projects" ? `<div class="eus-lead-quick-filters" role="group" aria-label="Lead queue shortcuts">
        <span>Lead Queue</span>
        <button type="button" data-lead-quick="all">All Leads</button>
        <button type="button" data-lead-quick="new">New</button>
        <button type="button" data-lead-quick="follow_up">Follow-Up</button>
        <button type="button" data-lead-quick="handoff">Won → Portal</button>
      </div>` : ""}
      <details class="eus-more-filters">
        <summary>More Filters</summary>
        <div class="eus-more-filters__grid">
          <label>Project Family
            <select id="eus-opp-project-filter">
              <option value="all">All Project Families</option>
              <option value="home">Home</option>
              <option value="rv">RV</option>
              <option value="solar">Solar</option>
            </select>
          </label>
          <label>Next Action
            <select id="eus-opp-next"><option value="all">All next actions</option></select>
          </label>
          <label>Portal
            <select id="eus-opp-portal-filter">
              <option value="all">All Portal States</option>
              <option value="handoff_ready">Qualified / Won — NOT IN PORTAL</option>
              <option value="not_in_portal">NOT IN PORTAL</option>
              <option value="in_portal">IN PORTAL</option>
            </select>
          </label>
          <label>Work With Us
            <select id="eus-opp-wwu-filter">
              <option value="all">All Work With Us</option>
              <option value="affiliate">Affiliate</option>
              <option value="marketing">Marketing</option>
              <option value="technician">Technician</option>
              <option value="investment">Growth / Investment</option>
            </select>
          </label>
          <label>Sort
            <select id="eus-opp-sort">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="next">Next Action</option>
              <option value="market">Market</option>
              <option value="rep">Assigned Rep</option>
              <option value="status">Status</option>
            </select>
          </label>
          <label>Group By
            <select id="eus-opp-group">
              <option value="none">None</option>
              <option value="status">Status</option>
              <option value="market">Market</option>
              <option value="rep">Assigned Rep</option>
              <option value="family">Family</option>
              <option value="next">Next Action</option>
            </select>
          </label>
          <div class="eus-admin-presentation" role="group" aria-label="Lead presentation">
            <button type="button" data-presentation="card">Card</button>
            <button type="button" data-presentation="table">Table</button>
          </div>
          <button type="button" id="eus-opp-clear" class="eus-admin-clear">Clear Filters</button>
        </div>
      </details>`;
    controls.hidden = false;
    syncLeadQuickFilters();

    controls.querySelectorAll("[data-lead-quick]").forEach((button) => button.addEventListener("click", () => {
      quickLeadFilter = button.dataset.leadQuick || "all";
      const status = $("eus-opp-status");
      if (status) status.value = "all";
      setSelect("opp-portal-filter", "all");
      currentPage = 1;
      syncLeadQuickFilters();
      queueOpportunityApply();
    }));

    const projectMirror = $("eus-opp-project-filter");
    const portalMirror = $("eus-opp-portal-filter");
    const wwuMirror = $("eus-opp-wwu-filter");
    if (projectMirror) projectMirror.value = $("opp-project-filter")?.value || "all";
    if (portalMirror) portalMirror.value = $("opp-portal-filter")?.value || "all";
    if (wwuMirror) wwuMirror.value = $("opp-wwu-filter")?.value || "all";

    projectMirror?.addEventListener("change", () => {
      currentPage = 1;
      setSelect("opp-project-filter", projectMirror.value);
    });
    portalMirror?.addEventListener("change", () => {
      currentPage = 1;
      setSelect("opp-portal-filter", portalMirror.value);
    });
    wwuMirror?.addEventListener("change", () => {
      currentPage = 1;
      if (currentView === "projects" && wwuMirror.value !== "all") {
        const value = wwuMirror.value;
        setView("work");
        queueMicrotask(() => setSelect("opp-wwu-filter", value));
      } else {
        setSelect("opp-wwu-filter", wwuMirror.value);
      }
    });

    ["eus-opp-next", "eus-opp-sort", "eus-opp-group"].forEach((id) => {
      $(id)?.addEventListener("change", () => {
        currentPage = 1;
        queueOpportunityApply();
      });
    });

    controls.querySelectorAll("[data-presentation]").forEach((button) => button.addEventListener("click", () => {
      currentPresentation = button.dataset.presentation;
      safeStorageSet(STORAGE_PRESENTATION, currentPresentation);
      currentPage = 1;
      queueOpportunityApply();
    }));

    $("eus-opp-clear")?.addEventListener("click", () => {
      const status = $("eus-opp-status");
      const next = $("eus-opp-next");
      const sort = $("eus-opp-sort");
      const group = $("eus-opp-group");
      if (status) status.value = "all";
      if (next) next.value = "all";
      if (sort) sort.value = "newest";
      if (group) group.value = "none";
      if (projectMirror) projectMirror.value = "all";
      if (portalMirror) portalMirror.value = "all";
      if (wwuMirror) wwuMirror.value = "all";
      setSelect("opp-project-filter", "all");
      setSelect("opp-market-filter", "all");
      setSelect("opp-rep-filter", "all");
      setSelect("opp-portal-filter", "all");
      setSelect("opp-wwu-filter", "all");
      const search = $("opp-search");
      if (search) {
        search.value = "";
        search.dispatchEvent(new Event("input", { bubbles: true }));
      }
      quickLeadFilter = "all";
      syncLeadQuickFilters();
      currentPage = 1;
      queueOpportunityApply();
    });
  }

  function syncLeadQuickFilters() {
    controls.querySelectorAll("[data-lead-quick]").forEach((button) => {
      const active = button.dataset.leadQuick === quickLeadFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function destroyOpportunityControls() {
    controls.hidden = true;
    controls.innerHTML = "";
    opportunity?.classList.remove("eus-card-presentation");
    $("eus-opportunity-cards")?.remove();
    $("eus-lead-pagination")?.remove();
    const table = opportunity?.querySelector(".admin-table-scroll");
    if (table) table.hidden = false;
  }

  function setView(view, options = {}) {
    if (!viewLabels[view]) view = "overview";
    currentView = view;
    currentPage = 1;
    safeStorageSet(STORAGE_VIEW, view);
    frame.dataset.view = view;
    if (!options.skipHash) {
      const nextHash = viewHashes[view] || "leads";
      if (location.hash !== `#${nextHash}`) history.replaceState(history.state, "", `${location.pathname}${location.search}#${nextHash}`);
    }

    allSections.forEach((el) => { el.hidden = true; });
    (viewSections[view] || []).filter(Boolean).forEach((el) => { el.hidden = false; });

    nav?.querySelectorAll("[data-admin-view]").forEach((button) => {
      const active = button.dataset.adminView === view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    });

    title.textContent = viewLabels[view];
    description.textContent = viewDescriptions[view] || "";

    if (["projects", "work", "table"].includes(view)) {
      configureOpportunityScope(view);
      buildOpportunityControls();
      queueOpportunityApply();
    } else if (view === "display_all") {
      configureOpportunityScope(view);
      destroyOpportunityControls();
    } else {
      destroyOpportunityControls();
    }
    syncOverviewMarketControls(view);
    syncOverviewExtras(view);

    if (!options.skipRefresh && !dashboard.hidden) {
      document.dispatchEvent(new CustomEvent("eus-admin-view-change", { detail: { view } }));
    }

    if (!options.skipScroll && !dashboard.hidden) {
      frame.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function ensureOverviewMarketControls() {
    let block = $("eus-overview-market-quick");
    if (block || !ownerSignals) return block;
    block = document.createElement("section");
    block.id = "eus-overview-market-quick";
    block.className = "opp-market-quick eus-overview-market-quick";
    block.setAttribute("aria-label", "Owner Lead market quick filters");
    block.innerHTML = `<div class="admin-section-head"><div><p class="eyebrow">Operating Pulse</p><h2>Lead / Conversion Pulse</h2><p class="admin-muted">Compact demand signal plus active Lead markets. Visitor geography remains separate from submitted Project Market.</p></div></div><div class="opp-market-quick__primary" role="group" aria-label="Primary Lead markets"><button type="button" data-overview-market="treasure_valley"><span>Boise / Treasure Valley</span><strong data-overview-count="treasure_valley">—</strong></button><button type="button" data-overview-market="southern_colorado"><span>Colorado Springs / Peyton</span><strong data-overview-count="southern_colorado">—</strong></button><button type="button" data-overview-market="other"><span>Other Service Areas</span><strong data-overview-count="other">—</strong></button></div><div class="opp-market-quick__secondary" data-overview-other><button type="button" data-overview-market="denver_metro">Denver Metro</button><button type="button" data-overview-market="outside_standard_area">Outside Service Area</button><button type="button" data-overview-market="manual_review">Location Needs Verification</button></div>`;
    ownerSignals.insertAdjacentElement("beforebegin", block);
    block.addEventListener("click", (event) => {
      const button = event.target.closest("[data-overview-market]");
      if (!button) return;
      const value = button.dataset.overviewMarket;
      setView("projects");
      queueMicrotask(() => window.EUSOpportunityCenter?.applyQuickMarket?.(value));
    });
    return block;
  }

  function updateOverviewMarketCounts(counts = {}) {
    const block = ensureOverviewMarketControls();
    if (!block) return;
    ["treasure_valley","southern_colorado","other"].forEach((key) => { const el = block.querySelector(`[data-overview-count="${key}"]`); if (el) el.textContent = Number(counts[key]) || 0; });
  }

  function syncOverviewMarketControls(view) {
    const block = ensureOverviewMarketControls();
    if (!block) return;
    block.hidden = !["overview", "analytics", "display_all"].includes(view);
    const eyebrow = block.querySelector(".admin-section-head .eyebrow");
    const heading = block.querySelector(".admin-section-head h2");
    const blurb = block.querySelector(".admin-section-head .admin-muted");
    if (view === "analytics") {
      if (eyebrow) eyebrow.textContent = "Website & Lead Analytics";
      if (heading) heading.textContent = "Traffic → Submitted Lead";
      if (blurb) blurb.textContent = "Read-only conversion and market context. Visitor geography stays separate from submitted Project Market.";
    } else {
      if (eyebrow) eyebrow.textContent = "Operating Pulse";
      if (heading) heading.textContent = "Lead / Conversion Pulse";
      if (blurb) blurb.textContent = "Compact demand signal plus active Lead markets. Visitor geography remains separate from submitted Project Market.";
    }
    updateOverviewMarketCounts(window.EUSOpportunityCenter?.activeMarketCounts?.() || {});
  }

  function leadStatus(record) {
    return String(record?.pipelineStatus || record?.status || "new").trim().toLowerCase();
  }

  function friendly(value) {
    return String(value || "—").replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function ensureActiveLeadPreview() {
    let block = $("eus-overview-lead-preview");
    if (block || !command) return block;
    block = document.createElement("section");
    block.id = "eus-overview-lead-preview";
    block.className = "eus-overview-lead-preview";
    block.innerHTML = `
      <header>
        <div><p class="eyebrow">Active Leads</p><h2>Working Queue Preview</h2></div>
        <button type="button" data-view-all-leads>View All Leads</button>
      </header>
      <div class="eus-lead-preview-table">
        <div class="eus-lead-preview-head"><span>Customer</span><span>Family</span><span>Market</span><span>Rep</span><span>Next Action</span><span>Status</span><span>Portal</span></div>
        <div data-lead-preview-rows><p class="admin-muted">Loading active Leads…</p></div>
      </div>`;
    command.insertAdjacentElement("afterend", block);
    block.querySelector("[data-view-all-leads]")?.addEventListener("click", () => setView("projects"));
    return block;
  }

  function renderActiveLeadPreview(projects = latestProjects) {
    latestProjects = Array.isArray(projects) ? projects : [];
    const block = ensureActiveLeadPreview();
    const host = block?.querySelector("[data-lead-preview-rows]");
    if (!host) return;

    const active = latestProjects
      .filter((record) => {
        const status = leadStatus(record);
        if (status === "lost" || status === "closed") return false;
        if (status === "won" && record.portalStatus === "in_portal") return false;
        return true;
      })
      .sort((a, b) => {
        const handoff = Number(Boolean(b.portalHandoffReady)) - Number(Boolean(a.portalHandoffReady));
        if (handoff) return handoff;
        const fresh = Number(leadStatus(b) === "new") - Number(leadStatus(a) === "new");
        if (fresh) return fresh;
        return Date.parse(b.createdAt || 0) - Date.parse(a.createdAt || 0);
      })
      .slice(0, 6);

    host.innerHTML = active.length ? active.map((record) => `
      <button type="button" class="eus-lead-preview-row" data-project-edit="${escapeAttr(record.reference || "")}">
        <span><strong>${escapeHtml(record.name || "Unnamed Lead")}</strong><small>${escapeHtml(record.reference || "")}</small></span>
        <span>${escapeHtml(friendly(record.family || "Project"))}</span>
        <span>${escapeHtml(friendly(record.market || record.serviceArea || "—"))}</span>
        <span>${escapeHtml(record.assignedRepresentative || "Unassigned")}</span>
        <span class="is-next">${escapeHtml(record.pipelineNextAction || record.nextAction || "Review Lead")}</span>
        <span class="is-status">${escapeHtml(friendly(leadStatus(record)))}</span>
        <span>${escapeHtml(record.portalStatus === "in_portal" ? "IN PORTAL" : "NOT IN PORTAL")}</span>
      </button>`).join("") : '<p class="admin-muted">No active Leads require attention.</p>';

    const newCount = latestProjects.filter((record) => leadStatus(record) === "new").length;
    const handoffCount = latestProjects.filter((record) => Boolean(record.portalHandoffReady) || (leadStatus(record) === "won" && record.portalStatus !== "in_portal")).length;
    if ($("overview-new-leads")) $("overview-new-leads").textContent = newCount;
    if ($("overview-won-not-portal")) $("overview-won-not-portal").textContent = handoffCount;
  }

  function ensureOverviewContactActions() {
    let block = $("eus-overview-contact-actions");
    if (block || !command) return block;
    block = document.createElement("section");
    block.id = "eus-overview-contact-actions";
    block.className = "eus-overview-contact-actions";
    block.innerHTML = `
      <header><div><p class="eyebrow">Contact Actions</p><h2>Customer Contact Activity</h2></div><small>Text / Call / Email are app or link activations, not confirmed conversations.</small></header>
      <div>
        <article><span>Text Actions</span><strong data-contact-copy="signal-contact-texts">—</strong></article>
        <article><span>Call Actions</span><strong data-contact-copy="signal-contact-calls">—</strong></article>
        <article><span>Email Actions</span><strong data-contact-copy="signal-contact-emails">—</strong></article>
        <article class="is-confirmed"><span>Submitted Leads</span><strong data-contact-copy="signal-submitted-leads">—</strong><small>Confirmed stored requests</small></article>
      </div>`;
    const preview = ensureActiveLeadPreview();
    preview?.insertAdjacentElement("afterend", block);
    return block;
  }

  function syncOverviewContactActions() {
    const block = ensureOverviewContactActions();
    block?.querySelectorAll("[data-contact-copy]").forEach((target) => {
      const source = $(target.dataset.contactCopy);
      target.textContent = source?.textContent || "0";
    });
  }

  function syncOverviewExtras(view) {
    const preview = ensureActiveLeadPreview();
    const contact = ensureOverviewContactActions();
    const visible = view === "overview" || view === "display_all";
    if (preview) preview.hidden = !visible;
    if (contact) contact.hidden = !visible;
    if (visible) {
      renderActiveLeadPreview(latestProjects);
      syncOverviewContactActions();
    }
  }

  document.addEventListener("eus-opportunities-loaded", (event) => {
    latestProjects = Array.isArray(event.detail?.projects) ? event.detail.projects : [];
    renderActiveLeadPreview(latestProjects);
  });
  document.addEventListener("eus-project-record-updated", (event) => {
    const record = event.detail?.project;
    if (!record?.reference) return;
    const index = latestProjects.findIndex((item) => item.reference === record.reference);
    if (index >= 0) latestProjects[index] = record;
    else latestProjects.unshift(record);
    renderActiveLeadPreview(latestProjects);
  });
  document.addEventListener("eus-opportunity-market-counts", (event) => updateOverviewMarketCounts(event.detail || {}));
  document.addEventListener("eus-admin-live-refresh", syncOverviewContactActions);
  $("overview-status-system-link")?.addEventListener("click", () => setView("system"));

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function rowMeta(row) {
    const cells = [...row.children];
    if (cells.length < 8 || row.classList.contains("eus-group-row")) return null;
    const isProject = Boolean(row.dataset.projectReference);
    const family = isProject ? "LEAD" : "WORK WITH US";
    const customer = cleanText(cells[0]?.textContent);
    const type = cleanText(cells[1]?.textContent);
    const marketSelect = cells[2]?.querySelector("select");
    const market = cleanText(marketSelect?.selectedOptions?.[0]?.textContent || cells[2]?.textContent);
    const repInput = cells[3]?.querySelector("input");
    const rep = cleanText(repInput?.value || cells[3]?.textContent) || "Unassigned";
    const nextSelect = cells[4]?.querySelector("select");
    const statusSelect = cells[5]?.querySelector("select");
    const next = cleanText(nextSelect?.selectedOptions?.[0]?.textContent || cells[4]?.textContent?.replace(/Save$/, ""));
    const status = cleanText(statusSelect?.selectedOptions?.[0]?.textContent || cells[5]?.textContent);
    const portal = cleanText(cells[6]?.textContent) || "—";
    const submitted = cleanText(row.dataset.submitted || "");
    const reference = cleanText(row.dataset.projectReference || row.dataset.wwuReference || "");
    const time = Date.parse(submitted);
    return { row, family, customer, type, market, rep, status, next, portal, submitted, reference, time: Number.isFinite(time) ? time : 0 };
  }

  function repopulateSelect(select, values, label) {
    if (!select) return;
    const selected = select.value;
    const sorted = [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
    select.innerHTML = `<option value="all">All ${label}</option>${sorted.map((v) => `<option value="${escapeAttr(v)}">${escapeHtml(v)}</option>`).join("")}`;
    if (["all", ...sorted].includes(selected)) select.value = selected;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function escapeAttr(value) { return escapeHtml(value); }

  function queueOpportunityApply() {
    if (rowApplyQueued) return;
    rowApplyQueued = true;
    requestAnimationFrame(() => {
      rowApplyQueued = false;
      applyOpportunityPresentation();
    });
  }

  function renderPagination(total) {
    let pager = $("eus-lead-pagination");
    if (currentView !== "projects") {
      pager?.remove();
      return;
    }
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);
    if (!pager) {
      pager = document.createElement("nav");
      pager.id = "eus-lead-pagination";
      pager.className = "eus-lead-pagination";
      pager.setAttribute("aria-label", "Lead pages");
      $("opp-table-summary")?.insertAdjacentElement("afterend", pager);
    }
    pager.innerHTML = `
      <button type="button" data-page-prev${currentPage <= 1 ? " disabled" : ""}>Previous</button>
      <span>Page <strong>${currentPage}</strong> of <strong>${totalPages}</strong></span>
      <button type="button" data-page-next${currentPage >= totalPages ? " disabled" : ""}>Next</button>`;
    pager.querySelector("[data-page-prev]")?.addEventListener("click", () => {
      if (currentPage <= 1) return;
      currentPage -= 1;
      queueOpportunityApply();
    });
    pager.querySelector("[data-page-next]")?.addEventListener("click", () => {
      if (currentPage >= totalPages) return;
      currentPage += 1;
      queueOpportunityApply();
    });
  }

  function applyOpportunityPresentation() {
    if (processingRows || !opportunity || !["projects", "work", "table"].includes(currentView)) return;
    const body = $("opp-table-body");
    if (!body) return;

    processingRows = true;
    opportunityObserver?.disconnect();
    try {
      body.querySelectorAll(".eus-group-row").forEach((row) => row.remove());
      const metas = [...body.children].map(rowMeta).filter(Boolean);

      repopulateSelect($("eus-opp-status"), metas.map((m) => m.status), "statuses");
      repopulateSelect($("eus-opp-next"), metas.map((m) => m.next), "next actions");

      const statusFilter = $("eus-opp-status")?.value || "all";
      const nextFilter = $("eus-opp-next")?.value || "all";
      const sort = $("eus-opp-sort")?.value || "newest";
      const group = $("eus-opp-group")?.value || "none";

      metas.forEach((meta) => {
        const quickVisible = quickLeadFilter === "all"
          || (quickLeadFilter === "new" && meta.status === "New")
          || (quickLeadFilter === "follow_up" && meta.status === "Follow Up")
          || (quickLeadFilter === "handoff" && meta.status === "Won" && /NOT IN PORTAL/i.test(meta.portal));
        meta.visible = quickVisible && (statusFilter === "all" || meta.status === statusFilter) && (nextFilter === "all" || meta.next === nextFilter);
      });

      const compareText = (field) => (a, b) => a[field].localeCompare(b[field]) || b.time - a.time;
      const sorter = {
        newest: (a, b) => b.time - a.time,
        oldest: (a, b) => a.time - b.time,
        next: compareText("next"),
        market: compareText("market"),
        rep: compareText("rep"),
        status: compareText("status"),
      }[sort] || ((a, b) => b.time - a.time);
      metas.sort(sorter).forEach((meta) => body.appendChild(meta.row));

      const visible = metas.filter((meta) => meta.visible);
      let pageItems = visible;
      if (currentView === "projects") {
        const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
        currentPage = Math.min(Math.max(1, currentPage), totalPages);
        const start = (currentPage - 1) * PAGE_SIZE;
        pageItems = visible.slice(start, start + PAGE_SIZE);
      }
      const pageRows = new Set(pageItems.map((meta) => meta.row));
      metas.forEach((meta) => { meta.row.hidden = !pageRows.has(meta.row); });

      if (group !== "none") {
        let previous = null;
        pageItems.forEach((meta) => {
          const key = ({ status: meta.status, market: meta.market, rep: meta.rep, family: meta.family, next: meta.next })[group] || "Other";
          if (key !== previous) {
            const tr = document.createElement("tr");
            tr.className = "eus-group-row";
            tr.innerHTML = `<td colspan="8"><span>${escapeHtml(key || "Other")}</span></td>`;
            body.insertBefore(tr, meta.row);
            previous = key;
          }
        });
      }

      const existingSummary = $("opp-table-summary");
      if (existingSummary) {
        if (currentView === "projects") {
          const first = visible.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
          const last = visible.length ? Math.min(currentPage * PAGE_SIZE, visible.length) : 0;
          existingSummary.textContent = `${first}–${last} of ${visible.length} Lead${visible.length === 1 ? "" : "s"} · 10 per page`;
        } else {
          existingSummary.textContent = `${visible.length} record${visible.length === 1 ? "" : "s"} shown · view controls do not change record state`;
        }
      }

      renderPagination(visible.length);
      renderCards(pageItems);
      controls.querySelectorAll("[data-presentation]").forEach((button) => button.classList.toggle("is-active", button.dataset.presentation === currentPresentation));
    } finally {
      processingRows = false;
      const observedBody = $("opp-table-body");
      if (observedBody && opportunityObserver) opportunityObserver.observe(observedBody, { childList: true, subtree: true });
    }
  }

  function renderCards(metas) {
    const scroll = opportunity.querySelector(".admin-table-scroll");
    let cards = $("eus-opportunity-cards");
    if (!cards) {
      cards = document.createElement("div");
      cards.id = "eus-opportunity-cards";
      cards.className = "eus-opportunity-cards";
      scroll.insertAdjacentElement("afterend", cards);
    }

    if (currentPresentation !== "card") {
      scroll.hidden = false;
      cards.hidden = true;
      opportunity.classList.remove("eus-card-presentation");
      return;
    }

    scroll.hidden = true;
    cards.hidden = false;
    opportunity.classList.add("eus-card-presentation");
    cards.innerHTML = metas.length ? metas.map((meta) => `
      <article class="eus-opportunity-card">
        <header><span>${escapeHtml(meta.family)}</span><code>${escapeHtml(meta.reference)}</code></header>
        <h3>${escapeHtml(meta.customer || "Unnamed lead")}</h3>
        <p class="eus-opportunity-card__type">${escapeHtml(meta.type)}</p>
        <dl>
          <div><dt>Market</dt><dd>${escapeHtml(meta.market)}</dd></div>
          <div><dt>Assigned Rep</dt><dd>${escapeHtml(meta.rep)}</dd></div>
          <div class="is-next"><dt>Next Action</dt><dd>${escapeHtml(meta.next)}</dd></div>
          <div><dt>Status</dt><dd>${escapeHtml(meta.status)}</dd></div>
          <div><dt>Portal</dt><dd>${escapeHtml(meta.portal)}</dd></div>
        </dl>
        ${meta.family.includes("WORK WITH US") ? '<button type="button" data-edit-in-table>Use Table to Edit</button>' : `<button type="button" data-project-edit="${escapeAttr(meta.reference)}">Open Lead</button>`}
      </article>`).join("") : '<p class="admin-empty-cell">No opportunities match these controls.</p>';
    cards.querySelectorAll("[data-edit-in-table]").forEach((button) => button.addEventListener("click", () => {
      currentPresentation = "table";
      safeStorageSet(STORAGE_PRESENTATION, currentPresentation);
      queueOpportunityApply();
    }));
  }

  nav?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-admin-view]");
    if (!button) return;
    setView(button.dataset.adminView);
  });

  function syncNavCounts() {
    nav?.querySelectorAll("[data-admin-nav-count]").forEach((node) => {
      const source = $(node.dataset.adminNavCount);
      const value = Number.parseInt(String(source?.textContent || "").replace(/[^0-9-]/g, ""), 10);
      node.hidden = !Number.isFinite(value) || value <= 0;
      node.textContent = Number.isFinite(value) && value > 99 ? "99+" : String(Math.max(0, value || 0));
    });
  }

  navToggle?.addEventListener("click", () => {
    frame.classList.toggle("is-nav-collapsed");
    const collapsed = frame.classList.contains("is-nav-collapsed");
    navToggle.textContent = collapsed ? "›" : "‹";
    navToggle.setAttribute("aria-label", collapsed ? "Expand workspace navigation" : "Collapse workspace navigation");
    navToggle.title = collapsed ? "Expand navigation" : "Collapse navigation";
    safeStorageSet(STORAGE_NAV, collapsed ? "collapsed" : "expanded");
  });

  if (safeStorageGet(STORAGE_NAV) === "collapsed") {
    frame.classList.add("is-nav-collapsed");
    if (navToggle) { navToggle.textContent = "›"; navToggle.setAttribute("aria-label", "Expand workspace navigation"); navToggle.title = "Expand navigation"; }
  }

  ["opp-project-filter", "opp-market-filter", "opp-rep-filter", "opp-portal-filter", "opp-wwu-filter"].forEach((id) => {
    $(id)?.addEventListener("change", () => { currentPage = 1; });
  });
  $("opp-search")?.addEventListener("input", () => { currentPage = 1; });

  const body = $("opp-table-body");
  if (body) {
    opportunityObserver = new MutationObserver(() => {
      if (!processingRows) queueOpportunityApply();
    });
    opportunityObserver.observe(body, { childList: true, subtree: true });
  }

  new MutationObserver(() => {
    document.body.classList.toggle("eus-admin-authenticated", !dashboard.hidden);
  }).observe(dashboard, { attributes: true, attributeFilter: ["hidden"] });

  document.addEventListener("eus-admin-authenticated", () => {
    document.body.classList.add("eus-admin-authenticated");
    setView(currentView, { skipScroll: true, skipRefresh: true });
    syncNavCounts();
  });
  document.addEventListener("eus-admin-live-refresh", () => { queueOpportunityApply(); syncNavCounts(); });
  document.addEventListener("eus-opportunities-loaded", syncNavCounts);
  window.addEventListener("hashchange", () => {
    const view = hashViews[String(location.hash || "").replace(/^#/, "")];
    if (view && view !== currentView) setView(view, { skipHash: true });
  });

  setView(currentView, { skipScroll: true, skipRefresh: true });
})();
