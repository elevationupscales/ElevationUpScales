(() => {
  "use strict";

  const ENDPOINT = "/api/admin/market-analytics";
  const RANGE_KEY = "eus-market-pulse-range-v1";
  const ranges = new Set(["today", "7d", "30d"]);
  let currentRange = safeGet(RANGE_KEY) || "7d";
  if (!ranges.has(currentRange)) currentRange = "7d";
  let lastPayload = null;
  let inFlight = null;
  let lastLoadedAt = 0;

  const $ = (id) => document.getElementById(id);
  const currentAdminView = () => document.querySelector(".eus-admin-workspace-frame")?.dataset.view || "overview";
  const needsMarketPulse = (view = currentAdminView()) => ["overview", "analytics", "display_all"].includes(view);
  const number = (value) => new Intl.NumberFormat("en-US").format(Math.max(0, Number(value) || 0));
  const percent = (value) => value === null || value === undefined || !Number.isFinite(Number(value)) ? "—" : `${Number(value).toFixed(1).replace(/\.0$/, "")}%`;
  const familyLabel = (value) => ({ home: "Home", rv: "RV", solar: "Solar" })[value] || "—";

  function safeGet(key) { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function safeSet(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  function formatDate(value) {
    const time = Date.parse(value || "");
    if (!Number.isFinite(time)) return "";
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(time));
  }

  function ensureOverviewPulse() {
    const block = $("eus-overview-market-quick");
    if (!block) return null;
    if (!block.querySelector("[data-market-pulse-toolbar]")) {
      const head = block.querySelector(".admin-section-head");
      head?.insertAdjacentHTML("beforeend", `
        <div class="eus-market-pulse-toolbar" data-market-pulse-toolbar>
          <span>Website Traffic</span>
          <div role="group" aria-label="Market analytics time range">
            <button type="button" data-pulse-range="today">Today</button>
            <button type="button" data-pulse-range="7d">7 Days</button>
            <button type="button" data-pulse-range="30d">30 Days</button>
          </div>
        </div>`);
      block.insertAdjacentHTML("beforeend", `
        <section class="eus-market-pulse-summary" data-market-pulse-summary aria-label="Lead and conversion pulse">
          <header><div><p class="eyebrow">Conversion</p><h3>Website → Lead</h3></div><strong data-pulse-range-label>7 Days</strong></header>
          <div class="eus-market-pulse-summary__metrics">
            <article><span>Sessions</span><strong data-overall="websiteSessions">—</strong></article>
            <article><span>Page Views</span><strong data-overall="pageViews">—</strong></article>
            <article><span>Start a Project Opens</span><strong data-overall="startProjectOpens">—</strong></article>
            <article><span>Submitted Leads</span><strong data-overall="submittedProjectLeads">—</strong></article>
            <article><span>Visitor → Lead</span><strong data-overall="visitorLeadConversion">—</strong></article>
            <article><span>Top Visitor Market</span><strong data-overall="topMarket">—</strong></article>
            <article><span>Top Project Interest</span><strong data-overall="topProjectFamily">—</strong></article>
          </div>
          <div class="eus-analytics-visuals" aria-label="Analytics charts">
            <section class="eus-analytics-chart">
              <header><div><span>Traffic → Stored Lead</span><small>Separate counts; Start a Project is raw activity, not a unique-session stage.</small></div></header>
              <div class="eus-analytics-bars" data-pulse-funnel><p>Loading lead-path activity…</p></div>
            </section>
            <section class="eus-analytics-chart">
              <header><div><span>Visitor Geography</span><small>Approximate network location, separate from the Lead's assigned service market.</small></div></header>
              <div class="eus-analytics-bars" data-pulse-markets><p>Loading visitor markets…</p></div>
            </section>
          </div>
          <div class="eus-market-pulse-lower">
            <div><span>Top Pages Clicked / Viewed</span><ol data-pulse-top-pages><li>Loading page activity…</li></ol></div>
            <div><span>Where Visitors and Leads Are</span><div class="eus-market-pulse-drilldown" data-pulse-drilldown></div></div>
          </div>
          <p class="eus-market-pulse-collection" data-pulse-collection></p>
          <p class="eus-market-pulse-privacy" data-pulse-privacy></p>
          <p class="eus-market-pulse-status" data-pulse-status aria-live="polite"></p>
        </section>`);
      block.addEventListener("click", handleRangeClick);
    }
    syncRangeButtons(block);
    return block;
  }

  function ensureProjectPulse() {
    const block = $("opp-market-quick");
    if (!block) return null;
    block.querySelector("[data-project-pulse-heading]")?.remove();
    block.querySelectorAll("[data-project-pulse-mini]").forEach((node) => node.remove());
    block.querySelector("[data-project-pulse-unknown]")?.remove();
    return null;
  }

  function syncRangeButtons(root = document) {
    root.querySelectorAll("[data-pulse-range]").forEach((button) => {
      const active = button.dataset.pulseRange === currentRange;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function handleRangeClick(event) {
    const button = event.target.closest("[data-pulse-range]");
    if (!button) return;
    event.stopPropagation();
    const range = button.dataset.pulseRange;
    if (!ranges.has(range) || range === currentRange) return;
    currentRange = range;
    safeSet(RANGE_KEY, currentRange);
    syncRangeButtons(document);
    load(true);
  }

  function setMini(root, selector, metric = {}) {
    const mini = root?.querySelector(selector);
    if (!mini) return;
    const sessions = mini.querySelector('[data-pulse-field="websiteSessions"]');
    const leads = mini.querySelector('[data-pulse-field="submittedProjectLeads"]');
    const conversion = mini.querySelector('[data-pulse-field="visitorLeadConversion"]');
    if (sessions) sessions.textContent = number(metric.websiteSessions);
    if (leads) leads.textContent = number(metric.submittedProjectLeads);
    if (conversion) conversion.textContent = percent(metric.visitorLeadConversion);
  }

  function setProjectMini(root, key, metric = {}) {
    const mini = root?.querySelector(`[data-project-pulse-mini="${key}"]`);
    if (!mini) return;
    const sessions = mini.querySelector('[data-project-pulse="sessions"]');
    const leads = mini.querySelector('[data-project-pulse="leads"]');
    const conversion = mini.querySelector('[data-project-pulse="conversion"]');
    if (sessions) sessions.textContent = number(metric.websiteSessions);
    if (leads) leads.textContent = number(metric.submittedProjectLeads);
    if (conversion) conversion.textContent = percent(metric.visitorLeadConversion);
  }

  function barWidth(value, maximum) {
    const numeric = Math.max(0, Number(value) || 0);
    const max = Math.max(0, Number(maximum) || 0);
    if (!numeric || !max) return 0;
    return Math.max(4, Math.min(100, Math.round((numeric / max) * 1000) / 10));
  }

  function renderBarRows(root, rows, emptyMessage) {
    if (!root) return;
    const max = Math.max(0, ...rows.map((row) => Math.max(0, Number(row.value) || 0)));
    root.innerHTML = max ? rows.map((row) => {
      const value = Math.max(0, Number(row.value) || 0);
      const width = barWidth(value, max);
      return `<article class="eus-analytics-bar-row">
        <div><strong>${escapeHtml(row.label)}</strong><span>${escapeHtml(row.note || "")}</span><b>${number(value)}</b></div>
        <span class="eus-analytics-bar-track" aria-hidden="true"><i style="width:${width}%"></i></span>
      </article>`;
    }).join("") : `<p>${escapeHtml(emptyMessage)}</p>`;
  }

  function render(payload) {
    lastPayload = payload;
    const overview = ensureOverviewPulse();
    const projects = ensureProjectPulse();
    const markets = payload?.markets || {};
    const rangeLabel = payload?.range?.label || ({ today: "Today", "7d": "7 Days", "30d": "30 Days" })[currentRange] || "7 Days";

    if (overview) {
      ["treasure_valley", "southern_colorado", "other"].forEach((key) => setMini(overview, `[data-pulse-mini="${key}"]`, markets[key] || {}));
      overview.querySelectorAll("[data-pulse-range-label]").forEach((el) => { el.textContent = rangeLabel; });
      const overall = payload?.overall || {};
      const setOverall = (key, value) => { const el = overview.querySelector(`[data-overall="${key}"]`); if (el) el.textContent = value; };
      setOverall("websiteSessions", number(overall.websiteSessions));
      setOverall("pageViews", number(overall.pageViews));
      setOverall("startProjectOpens", number(overall.startProjectOpens));
      setOverall("submittedProjectLeads", number(overall.submittedProjectLeads));
      setOverall("visitorLeadConversion", percent(overall.visitorLeadConversion));
      setOverall("topMarket", overall.topMarket?.label || "—");
      setOverall("topProjectFamily", familyLabel(overall.topProjectFamily?.family));

      renderBarRows(overview.querySelector("[data-pulse-funnel]"), [
        { label: "Website Sessions", note: "Unique visitor sessions", value: overall.websiteSessions },
        { label: "Start a Project Opens", note: "Raw page/action opens", value: overall.startProjectOpens },
        { label: "Submitted Leads", note: "Confirmed stored Lead records", value: overall.submittedProjectLeads },
      ], "No lead-path activity in this window.");

      const visitorRows = [
        markets.treasure_valley,
        markets.southern_colorado,
        markets.denver_metro,
        markets.outside_service_area,
        markets.unknown,
      ].filter(Boolean).map((row) => ({
        label: row.label,
        note: `${number(row.submittedProjectLeads)} stored lead${Number(row.submittedProjectLeads) === 1 ? "" : "s"}`,
        value: row.websiteSessions,
      }));
      renderBarRows(overview.querySelector("[data-pulse-markets]"), visitorRows, "No visitor-geography data in this window.");

      const topPages = overview.querySelector("[data-pulse-top-pages]");
      if (topPages) {
        const pages = Array.isArray(overall.topPages) ? overall.topPages : [];
        const maxPageViews = Math.max(0, ...pages.map((row) => Math.max(0, Number(row.views) || 0)));
        topPages.innerHTML = pages.length ? pages.map((row) => `<li><div><code>${escapeHtml(row.page)}</code><strong>${number(row.views)}</strong></div><span aria-hidden="true"><i style="width:${barWidth(row.views, maxPageViews)}%"></i></span></li>`).join("") : "<li>No page-view data in this window.</li>";
      }
      const drill = overview.querySelector("[data-pulse-drilldown]");
      if (drill) {
        const rows = [markets.denver_metro, markets.outside_service_area, markets.unknown].filter(Boolean);
        drill.innerHTML = rows.map((row) => `<article><strong>${escapeHtml(row.label)}</strong><span>${number(row.websiteSessions)} sessions</span><span>${number(row.submittedProjectLeads)} leads</span><span>${percent(row.visitorLeadConversion)} conversion</span>${row.key !== "unknown" ? `<span>${number(row.activeProjects)} active Projects</span>` : ""}</article>`).join("") || "<p>No market data in this window.</p>";
      }
      const collection = overview.querySelector("[data-pulse-collection]");
      if (collection) {
        if (payload?.collection?.marketGeographyAt) collection.textContent = `Market-level collection began ${formatDate(payload.collection.marketGeographyAt)}. Historical visitor geography is not backfilled.`;
        else collection.textContent = "Market-level geography collection begins when this build receives its first event. Historical visitor geography is not backfilled.";
      }
      const privacy = overview.querySelector("[data-pulse-privacy]");
      if (privacy && payload?.privacyNote) privacy.textContent = payload.privacyNote;
      const status = overview.querySelector("[data-pulse-status]");
      if (status) status.textContent = payload?.available === false ? "Analytics data is temporarily unavailable; Project operations remain available." : "D1 Market Pulse loaded. Cloudflare Web Analytics remains the independent traffic/performance layer.";
    }

    if (projects) {
      ["treasure_valley", "southern_colorado", "other"].forEach((key) => setProjectMini(projects, key, markets[key] || {}));
      const range = projects.querySelector("[data-project-pulse-range]");
      if (range) range.textContent = rangeLabel;
      const unknown = projects.querySelector("[data-project-pulse-unknown]");
      if (unknown) {
        const row = markets.unknown || {};
        const sessions = unknown.querySelector('[data-unknown="sessions"]');
        const leads = unknown.querySelector('[data-unknown="leads"]');
        const conversion = unknown.querySelector('[data-unknown="conversion"]');
        if (sessions) sessions.textContent = number(row.websiteSessions);
        if (leads) leads.textContent = number(row.submittedProjectLeads);
        if (conversion) conversion.textContent = percent(row.visitorLeadConversion);
      }
    }
  }

  function renderFailure(message) {
    const overview = ensureOverviewPulse();
    ensureProjectPulse();
    const status = overview?.querySelector("[data-pulse-status]");
    if (status) status.textContent = message || "Market Pulse is temporarily unavailable. Project operations remain available.";
  }

  async function load(force = false) {
    if (!needsMarketPulse()) return;
    if (!document.body.classList.contains("eus-admin-authenticated") && $("admin-dashboard")?.hidden) return;
    const now = Date.now();
    if (!force && lastPayload && now - lastLoadedAt < 25_000) { render(lastPayload); return; }
    if (inFlight) return inFlight;
    ensureOverviewPulse();
    ensureProjectPulse();
    inFlight = (async () => {
      try {
        const response = await fetch(`${ENDPOINT}?range=${encodeURIComponent(currentRange)}&market=all`, { credentials: "same-origin", headers: { Accept: "application/json" }, cache: "no-store" });
        const body = await response.json().catch(() => ({}));
        if (response.status === 401 || response.status === 403) throw new Error("Admin session required for Market Pulse.");
        if (!response.ok) throw new Error(body.error || "Market Pulse request failed.");
        lastLoadedAt = Date.now();
        render(body);
      } catch (error) {
        renderFailure(error instanceof Error ? error.message : "Market Pulse is temporarily unavailable.");
      } finally {
        inFlight = null;
      }
    })();
    return inFlight;
  }

  document.addEventListener("eus-admin-authenticated", () => { if (needsMarketPulse()) queueMicrotask(() => load(true)); });
  document.addEventListener("eus-admin-live-refresh", () => { if (needsMarketPulse()) load(false); });
  document.addEventListener("eus-admin-view-change", (event) => {
    if (!needsMarketPulse(event.detail?.view)) return;
    queueMicrotask(() => { ensureOverviewPulse(); ensureProjectPulse(); if (lastPayload) render(lastPayload); load(false); });
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest('[data-admin-view="overview"],[data-admin-view="analytics"],[data-admin-view="display_all"]')) queueMicrotask(() => { ensureOverviewPulse(); ensureProjectPulse(); if (lastPayload) render(lastPayload); else load(); });
  });

  queueMicrotask(() => { if (needsMarketPulse()) { ensureOverviewPulse(); ensureProjectPulse(); } syncRangeButtons(document); });
})();
