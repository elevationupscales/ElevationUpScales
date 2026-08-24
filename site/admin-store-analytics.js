(() => {
  "use strict";

  const ENDPOINT = "/api/admin/market-analytics";
  const RANGE_KEY = "eus-market-pulse-range-v1";
  let lastLoadedAt = 0;
  let inFlight = null;

  const $ = (id) => document.getElementById(id);
  const num = (value) => new Intl.NumberFormat("en-US").format(Math.max(0, Number(value) || 0));
  const pct = (value) => Number.isFinite(Number(value)) ? `${Number(value).toFixed(1).replace(/\.0$/, "")}%` : "—";
  const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" }[c]));
  const currentRange = () => {
    try {
      const value = localStorage.getItem(RANGE_KEY) || "7d";
      return new Set(["today", "7d", "30d"]).has(value) ? value : "7d";
    } catch (_) { return "7d"; }
  };
  const currentView = () => document.querySelector(".eus-admin-workspace-frame")?.dataset.view || "overview";
  const relevantView = () => ["overview", "analytics", "display_all"].includes(currentView());

  function ensureSection() {
    const groups = document.querySelector(".admin-owner-signals .admin-signal-groups");
    if (!groups) return null;
    let section = $("admin-store-analytics");
    if (section) return section;
    section = document.createElement("section");
    section.id = "admin-store-analytics";
    section.className = "admin-signal-group admin-store-analytics";
    section.setAttribute("aria-labelledby", "admin-store-analytics-heading");
    section.innerHTML = `
      <header><p class="eyebrow">Store Analytics</p><h3 id="admin-store-analytics-heading">Homepage → Store → Checkout</h3><small>First-party, anonymous tracking for storefront discovery and outbound handoffs. Homepage and Other Ways CTA clicks stay separate from eBay/Fourthwall checkout destinations.</small></header>
      <div class="admin-signal-group__grid admin-store-metrics">
        <article class="is-primary"><span>Store Sessions</span><strong data-store-metric="sessions">—</strong><small>Unique Store visitors</small></article>
        <article><span>RV Shop Views</span><strong data-store-metric="rvShopSessions">—</strong><small>Unique visitors who reached the RV section</small></article>
        <article class="is-primary"><span>Homepage Shop CTA</span><strong data-store-metric="homeShopClicks">—</strong><small>Recent tracked storefront choices from Home</small></article>
        <article><span>Other Ways Shop CTA</span><strong data-store-metric="otherWaysShopClicks">—</strong><small>Recent tracked storefront choices from Other Ways</small></article>
        <article class="is-primary"><span>eBay Clicks</span><strong data-store-metric="ebayClicks">—</strong><small>Outbound RV Shop handoffs</small></article>
        <article><span>Fourthwall Clicks</span><strong data-store-metric="fourthwallClicks">—</strong><small>Brand product handoffs</small></article>
        <article><span>RV → eBay CTR</span><strong data-store-metric="ebayCtr">—</strong><small>Unique eBay visitors ÷ RV Shop viewers</small></article>
        <article><span>Product Clicks</span><strong data-store-metric="productClicks">—</strong><small>Tracked product-level outbound actions</small></article>
      </div>
      <div class="admin-store-destinations">
        <span>Where Store visitors are going</span>
        <div data-store-destinations><p>Waiting for Store activity…</p></div>
      </div>
      <div class="admin-store-journeys">
        <div><span>Recent visitor journeys</span><small>Visitor labels are anonymous session tags, not names or identities.</small></div>
        <div data-store-journeys><p>Waiting for Store activity…</p></div>
      </div>
      <p class="admin-store-status" data-store-status aria-live="polite"></p>`;
    const contactGroup = groups.querySelector(".admin-contact-actions");
    if (contactGroup) groups.insertBefore(section, contactGroup);
    else groups.appendChild(section);
    return section;
  }

  const actionLabel = (event) => {
    const value = String(event.eventValue || "");
    const product = event.product ? ` · ${event.product}` : "";
    switch (event.eventType) {
      case "store_open": return "Opened Store";
      case "store_section_view": {
        if (event.page === "/") return value === "rv_shop" ? "Homepage → RV & Outdoor Store" : "Homepage → Apparel Store";
        if (event.page === "/other-ways-we-can-help") return value === "rv_shop" ? "Other Ways → RV & Outdoor Store" : "Other Ways → Apparel Store";
        return value === "rv_shop" ? "Viewed RV Shop" : "Viewed Brand Catalog";
      }
      case "store_category_select": return `Filtered ${value || "catalog"}`;
      case "store_search_used": return value === "[redacted]" ? "Used Store search" : `Searched “${value}”`;
      case "store_sort_changed": return `Changed sort to ${value}`;
      case "store_destination_click": return `Went to ${value === "ebay" ? "eBay RV Shop" : value === "fourthwall" ? "Fourthwall" : "Collector Series"}`;
      case "store_product_click": return `Product click${product} → ${value === "ebay" ? "eBay" : value === "fourthwall" ? "Fourthwall" : value}`;
      default: return event.eventType || "Store activity";
    }
  };

  function renderJourneys(root, events) {
    const rows = Array.isArray(events) ? events : [];
    if (!rows.length) { root.innerHTML = "<p>No Store journey events in this range yet.</p>"; return; }
    const grouped = new Map();
    rows.forEach((event) => {
      const key = event.visitorTag || "anonymous";
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(event);
    });
    const journeys = [...grouped.entries()].slice(0, 8);
    root.innerHTML = journeys.map(([visitor, items]) => {
      const ordered = [...items].sort((a,b) => Date.parse(a.createdAt || 0) - Date.parse(b.createdAt || 0)).slice(-8);
      const source = ordered.find((item) => item.utmSource || item.referrerHost);
      const sourceLabel = source?.utmSource ? `UTM: ${source.utmSource}` : (source?.referrerHost ? `from ${source.referrerHost}` : "direct / unknown source");
      const last = ordered[ordered.length - 1];
      const time = last?.createdAt ? new Date(last.createdAt).toLocaleString([], { month:"short", day:"numeric", hour:"numeric", minute:"2-digit" }) : "";
      return `<article><header><strong>Visitor ${esc(visitor)}</strong><span>${esc(sourceLabel)}${time ? ` · ${esc(time)}` : ""}</span></header><div>${ordered.map((item) => `<span>${esc(actionLabel(item))}</span>`).join("<i aria-hidden=\"true\">→</i>")}</div></article>`;
    }).join("");
  }

  function render(payload) {
    const section = ensureSection();
    if (!section) return;
    const store = payload?.store || {};
    const events = Array.isArray(store.recentEvents) ? store.recentEvents : [];
    const homeShopClicks = events.filter((event) => event.eventType === "store_section_view" && event.page === "/" && ["brand_catalog", "rv_shop"].includes(event.eventValue)).length;
    const otherWaysShopClicks = events.filter((event) => event.eventType === "store_section_view" && event.page === "/other-ways-we-can-help" && ["brand_catalog", "rv_shop"].includes(event.eventValue)).length;
    const set = (key, value) => { const el = section.querySelector(`[data-store-metric="${key}"]`); if (el) el.textContent = value; };
    set("sessions", num(store.sessions));
    set("rvShopSessions", num(store.rvShopSessions));
    set("homeShopClicks", num(homeShopClicks));
    set("otherWaysShopClicks", num(otherWaysShopClicks));
    set("ebayClicks", num(store.ebayClicks));
    set("fourthwallClicks", num(store.fourthwallClicks));
    set("ebayCtr", pct(store.ebayCtr));
    set("productClicks", num(store.productClicks));

    const destinations = section.querySelector("[data-store-destinations]");
    if (destinations) {
      const rows = [
        ["eBay RV Shop", store.ebayClicks, store.ebayClickSessions],
        ["Fourthwall", store.fourthwallClicks, store.fourthwallClickSessions],
        ["Collector Series", store.collectorClicks, store.collectorClickSessions],
      ];
      destinations.innerHTML = rows.map(([label, clicks, sessions]) => `<span><b>${esc(label)}</b><strong>${num(clicks)} clicks</strong><small>${num(sessions)} unique visitors</small></span>`).join("");
    }
    const journeys = section.querySelector("[data-store-journeys]");
    if (journeys) renderJourneys(journeys, events);
    const status = section.querySelector("[data-store-status]");
    if (status) status.textContent = `Store analytics · ${payload?.range?.label || currentRange()} · D1 first-party events. Homepage/Other Ways CTA counters use the recent Store journey event window; eBay/Fourthwall totals use the full selected analytics range.`;
  }

  async function load(force = false) {
    ensureSection();
    if (!relevantView()) return;
    if ($("admin-dashboard")?.hidden) return;
    if (!force && Date.now() - lastLoadedAt < 25000) return;
    if (inFlight) return inFlight;
    inFlight = (async () => {
      try {
        const response = await fetch(`${ENDPOINT}?range=${encodeURIComponent(currentRange())}&market=all`, { credentials:"same-origin", headers:{ Accept:"application/json" }, cache:"no-store" });
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(body.error || "Store analytics request failed.");
        lastLoadedAt = Date.now();
        render(body);
      } catch (error) {
        const section = ensureSection();
        const status = section?.querySelector("[data-store-status]");
        if (status) status.textContent = error instanceof Error ? error.message : "Store analytics are temporarily unavailable.";
      } finally { inFlight = null; }
    })();
    return inFlight;
  }

  document.addEventListener("eus-admin-authenticated", () => queueMicrotask(() => load(true)));
  document.addEventListener("eus-admin-view-change", () => queueMicrotask(() => load(false)));
  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-pulse-range]")) return;
    setTimeout(() => load(true), 80);
  }, true);
  ensureSection();
})();
