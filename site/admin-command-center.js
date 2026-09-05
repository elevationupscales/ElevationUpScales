/* Elevation UpScales consolidated Admin Command Center
 * Drop-in replacement preserving window.EUSAdminData and current endpoint contracts.
 * Uses one canonical admin-command-center.css; pass1 CSS is folded into it.
 */
(() => {
  "use strict";
  if (window.EUSAdminCommandCenterLoaded) return;
  window.EUSAdminCommandCenterLoaded = true;

  const ENDPOINTS = Object.freeze({
    orders: "/api/admin/store-orders",
    catalog: "/api/admin/catalog",
    inventory: "/api/admin/inventory",
    opportunities: "/api/admin/opportunities",
    operations: "/api/admin/operations",
    analytics: "/api/admin/market-analytics",
    lithium: "/api/admin/lithium-shipping",
    sync: "/api/admin/sync",
    doba: "/api/admin/doba-csv-sync",
    promotion: "/api/admin/promotion",
  });

  const NAV = Object.freeze([
    ["Situation & Priority", [
      ["Owner Overview", "/admin", "overview"],
      ["Orders & Fulfillment", "/admin-store-orders", "orders"],
      ["Leads", "/admin-listings#leads", "leads"],
    ]],
    ["Commerce", [
      ["Catalog & Products", "/admin-catalog", "products"],
      ["Inventory", "/admin-inventory", "inventory"],
      ["Channels & Sync", "/admin-channels", "channels"],
      ["Promotions", "/admin-promotion", "promotions"],
    ]],
    ["Logistics & Programs", [
      ["Shipping & Hawaii", "/admin-lithium-shipping", "shipping"],
      ["Marketplace", "/admin-listings#marketplace", "marketplace"],
      ["Solar", "/admin-listings#solar", "solar"],
      ["Portal Handoffs", "/admin-listings#leads", "portal"],
    ]],
    ["Performance & System", [
      ["Analytics", "/admin-analytics", "analytics"],
      ["Website / QA", "/admin-system", "system"],
    ]],
  ]);

  const text = (value) => String(value ?? "").trim();
  const money = (cents) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format((Number(cents) || 0) / 100);

  async function api(url, options = {}) {
    const headers = { Accept: "application/json", ...(options.headers || {}) };
    if (
      options.body &&
      !(options.body instanceof FormData) &&
      !headers["Content-Type"]
    ) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      credentials: "same-origin",
      cache: "no-store",
      ...options,
      headers,
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(body.error || `Request failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return body;
  }

  function currentKey() {
    const path =
      location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
    const hash = location.hash.replace(/^#/, "");

    if (path === "/admin") return "overview";
    if (path.includes("admin-store-orders")) return "orders";
    if (path.includes("admin-lithium-shipping")) return "shipping";
    if (path.includes("admin-catalog")) return "products";
    if (path.includes("admin-inventory")) return "inventory";
    if (path.includes("admin-channels")) return "channels";
    if (path.includes("admin-promotion")) return "promotions";
    if (path.includes("admin-analytics")) return "analytics";
    if (path.includes("admin-system")) return "system";
    if (path.includes("admin-listings")) {
      if (hash === "marketplace" || hash === "marketplace-follow-up") return "marketplace";
      if (hash === "solar") return "solar";
      if (hash === "system") return "system";
      return "leads";
    }
    return "";
  }

  function ensureCss() {
    if (document.querySelector('link[data-eus-command-center-css]')) return;
    const existing = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .find((link) => (link.getAttribute("href") || "").includes("/admin-command-center.css"));
    if (existing) {
      existing.dataset.eusCommandCenterCss = "1";
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/admin-command-center.css?v=5.0.0";
    link.dataset.eusCommandCenterCss = "1";
    document.head.append(link);
  }

  function installShell() {
    if (document.querySelector(".eus-admin-app")) return;

    ensureCss();
    document.body.classList.add("eus-admin-shell-active");

    const main =
      document.querySelector("main.admin-shell") ||
      document.querySelector("main.eus-admin-page") ||
      document.querySelector("main");
    if (!main) return;

    const app = document.createElement("div");
    app.className = "eus-admin-app";

    const rail = document.createElement("aside");
    rail.className = "eus-admin-rail";
    rail.setAttribute("aria-label", "Elevation Admin navigation");

    const active = currentKey();
    rail.innerHTML = `
      <a class="eus-admin-rail__brand" href="/admin">
        <img src="/assets/logo-mark.webp" alt="">
        <span>
          <strong>Elevation Operations</strong>
          <small>Situation · Priority · Action</small>
        </span>
      </a>
      ${NAV.map(([group, items]) => `
        <section class="eus-admin-nav-group">
          <strong>${group}</strong>
          ${items.map(([name, url, key]) => `
            <a href="${url}"${key === active ? ' class="is-active" aria-current="page"' : ""}>${name}</a>
          `).join("")}
        </section>
      `).join("")}
      <div class="eus-admin-rail__foot">
        Elevation UpScales, Inc.<br>
        <a href="/">Open public website</a>
      </div>`;

    const mobile = document.createElement("div");
    mobile.className = "eus-admin-mobile-bar";
    mobile.innerHTML =
      '<button type="button" data-eus-admin-menu aria-label="Open admin navigation">☰</button>' +
      "<strong>Elevation Operations</strong>" +
      '<a class="eus-admin-button" href="/admin">Overview</a>';

    const holder = document.createElement("div");
    holder.className = "eus-admin-main";

    main.parentNode.insertBefore(app, main);
    app.append(rail, holder);
    holder.append(mobile, main);

    mobile.querySelector("[data-eus-admin-menu]")?.addEventListener("click", () => {
      app.classList.toggle("is-nav-open");
    });

    rail.addEventListener("click", (event) => {
      if (event.target.closest("a") && innerWidth <= 820) {
        app.classList.remove("is-nav-open");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") app.classList.remove("is-nav-open");
    });
  }

  async function settle(name, endpoint) {
    try {
      return { name, ok: true, data: await api(endpoint) };
    } catch (error) {
      return {
        name,
        ok: false,
        status: error.status || 0,
        error: error.message,
      };
    }
  }

  async function loadAll() {
    const results = await Promise.all(
      Object.entries(ENDPOINTS).map(([name, endpoint]) => settle(name, endpoint)),
    );
    return Object.fromEntries(results.map((result) => [result.name, result]));
  }

  const getOrders = () => api(ENDPOINTS.orders);
  const getCatalog = () => api(ENDPOINTS.catalog);
  const getInventory = () => api(ENDPOINTS.inventory);
  const getOpportunities = () => api(ENDPOINTS.opportunities);
  const getOperations = () => api(ENDPOINTS.operations);
  const getAnalytics = () => api(ENDPOINTS.analytics);
  const getLithium = () => api(ENDPOINTS.lithium);
  const getSync = () => api(ENDPOINTS.sync);
  const getDoba = () => api(ENDPOINTS.doba);
  const getPromotion = () => api(ENDPOINTS.promotion);

  function orderActions(orders = []) {
    const list = Array.isArray(orders) ? orders : [];
    return {
      supplier: list.filter((order) => order.fulfillmentStatus === "fulfillment_pending").length,
      tracking: list.filter(
        (order) =>
          order.fulfillmentStatus === "supplier_ordered" &&
          !text(order.trackingNumber),
      ).length,
      hold: list.filter((order) => order.fulfillmentStatus === "hold_issue").length,
      refund: list.filter((order) => order.fulfillmentStatus === "refund_needed").length,
      shipped: list.filter((order) => order.fulfillmentStatus === "shipped").length,
      open: list.filter(
        (order) => !["completed", "refunded", "cancelled"].includes(order.fulfillmentStatus),
      ).length,
    };
  }

  function leadActions(projects = []) {
    const active = (Array.isArray(projects) ? projects : []).filter(
      (project) =>
        !["lost", "closed"].includes(
          text(project.pipelineStatus || project.status).toLowerCase(),
        ),
    );
    return {
      new: active.filter(
        (project) =>
          text(project.pipelineStatus || project.status).toLowerCase() === "new",
      ).length,
      unassigned: active.filter((project) => !text(project.assignedRepresentative)).length,
      noNext: active.filter((project) => {
        const next = text(project.pipelineNextAction || project.nextAction);
        return !next || /no action/i.test(next);
      }).length,
      followup: active.filter(
        (project) =>
          text(project.pipelineStatus || project.status).toLowerCase() === "follow_up",
      ).length,
      active: active.length,
    };
  }

  function catalogActions(data = {}) {
    const products = Array.isArray(data.products) ? data.products : [];
    return {
      total: products.length,
      published: products.filter((product) => product.publishStatus === "published").length,
      review: products.filter(
        (product) =>
          product.publishStatus === "hold" ||
          Boolean(product.reviewState),
      ).length,
      drafts: products.filter((product) => product.publishStatus === "draft").length,
      noPrice: products.filter((product) => !(Number(product.priceCents) > 0)).length,
      noImage: products.filter(
        (product) =>
          !text(product.primaryImage) &&
          !(Array.isArray(product.images) && product.images.length),
      ).length,
    };
  }

  function computeRevenue(orders = []) {
    const paid = (Array.isArray(orders) ? orders : []).filter(
      (order) =>
        !["cancelled", "refunded"].includes(order.fulfillmentStatus) &&
        text(order.paymentStatus).toLowerCase() !== "refunded",
    );
    const revenue = paid.reduce(
      (sum, order) => sum + (Number(order.totalCents) || 0),
      0,
    );
    const supplierCost = paid.reduce(
      (sum, order) =>
        sum +
        (Number(order.supplierCostCents) || 0) *
          (Number(order.quantity) || 1),
      0,
    );
    return {
      orders: paid.length,
      revenue,
      supplierCost,
      grossContribution: revenue - supplierCost,
      aov: paid.length ? Math.round(revenue / paid.length) : 0,
    };
  }

  function valueOrNA(value, formatter = (item) => String(item)) {
    return value === null || value === undefined || Number.isNaN(value)
      ? "N/A"
      : formatter(value);
  }

  async function enhanceOrders() {
    if (
      !document.body.classList.contains("admin-store-orders-page") ||
      document.querySelector(".eus-order-actions")
    ) return;

    const dashboard = document.querySelector("#orders-dashboard");
    if (!dashboard) return;

    try {
      const data = await getOrders();
      const actions = orderActions(data.orders);
      const board = document.createElement("section");
      board.className = "eus-order-actions";
      board.setAttribute("aria-label", "Fulfillment pending actions");

      const items = [
        ["Purchase from supplier", actions.supplier, "fulfillment_pending", "is-warn"],
        ["Tracking needed", actions.tracking, "supplier_ordered", "is-warn"],
        ["Hold / Issue", actions.hold, "hold_issue", "is-alert"],
        ["Refund required", actions.refund, "refund_needed", "is-alert"],
        ["Shipped / monitor", actions.shipped, "shipped", ""],
      ];

      board.innerHTML = items.map(([label, count, status, className]) =>
        `<button class="eus-order-action ${className}" type="button" data-order-quick="${status}" data-tracking-only="${label === "Tracking needed" ? "1" : "0"}"><strong>${count}</strong><span>${label}</span></button>`
      ).join("");

      dashboard.insertBefore(board, dashboard.firstChild);

      board.addEventListener("click", (event) => {
        const button = event.target.closest("[data-order-quick]");
        if (!button) return;

        const select = document.querySelector("#orders-status-filter");
        if (select) {
          select.value = button.dataset.orderQuick;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
        document.querySelector("#orders-workspace")?.scrollIntoView?.({
          behavior: "smooth",
        });
      });
    } catch (_) {
      // Existing page remains usable if enhancement data is unavailable.
    }
  }


  function numberValue(value) {
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  }

  function upperState(value, fallback = "UNKNOWN") {
    return String(value || fallback).replaceAll("_", " ").toUpperCase();
  }

  function buildOverviewModel(snapshot = {}) {
    const dataIfOk = (key, fallback = {}) =>
      snapshot?.[key]?.ok ? snapshot[key].data ?? fallback : fallback;

    const orders = snapshot.orders?.ok
      ? dataIfOk("orders").orders || []
      : [];
    const orderState = orderActions(orders);
    const revenue = computeRevenue(orders);

    const catalog = dataIfOk("catalog");
    const catalogState = catalogActions(catalog);

    const inventory = dataIfOk("inventory");
    const inventoryStats = inventory.stats || {};

    const sync = dataIfOk("sync");
    const syncCounts = sync.counts || {};

    const projects = snapshot.opportunities?.ok
      ? dataIfOk("opportunities").projects || []
      : [];
    const leadState = leadActions(projects);

    const operations = dataIfOk("operations");
    const signals = operations.signals || {};
    const health = operations.health || {};
    const market = operations.summary || {};

    const doba = dataIfOk("doba");
    const promotion = dataIfOk("promotion");

    const lithium = snapshot.lithium?.ok ? dataIfOk("lithium") : {};
    const requests = Array.isArray(lithium.requests) ? lithium.requests : [];
    const records = Array.isArray(lithium.records) ? lithium.records : [];
    const batches = Array.isArray(lithium.batches) ? lithium.batches : [];
    const batchMetrics = Array.isArray(lithium.metrics?.batchMetrics)
      ? lithium.metrics.batchMetrics
      : [];

    const shipping = {
      reservations: snapshot.lithium?.ok
        ? requests.filter(
            (request) =>
              !["CLOSED", "CANCELLED"].includes(upperState(request.state)),
          ).length
        : null,
      supplierRechecks: snapshot.lithium?.ok
        ? records.filter(
            (record) =>
              record.inventoryRecheckRequired ||
              ["UNKNOWN", "RECHECK REQUIRED", "SUPPLIER ERROR"].includes(
                upperState(record.supplierStockState),
              ),
          ).length
        : null,
      blocked: null,
      confirmations: null,
      openBatches: null,
    };

    if (snapshot.lithium?.ok) {
      const blockedLines = batchMetrics.reduce(
        (sum, metric) => sum + numberValue(metric.blockedOrders),
        0,
      );
      shipping.blocked =
        records.filter(
          (record) =>
            record.hold ||
            upperState(record.reviewState) !==
              "INTERNAL REQUIREMENTS SATISFIED",
        ).length + blockedLines;
      shipping.confirmations = batchMetrics.reduce(
        (sum, metric) =>
          sum + numberValue(metric.pendingCustomerConfirmations),
        0,
      );
      shipping.openBatches = batches.filter(
        (batch) =>
          !["COMPLETE", "CANCELLED"].includes(upperState(batch.status)),
      ).length;
    }

    const syncIssues = snapshot.sync?.ok
      ? numberValue(syncCounts.outOfSync) +
        numberValue(syncCounts.syncError) +
        numberValue(syncCounts.stale)
      : null;

    const live = snapshot.operations?.ok ? numberValue(market.published) : null;
    const pending = snapshot.operations?.ok ? numberValue(market.pending) : null;
    const marketIssues = snapshot.operations?.ok
      ? numberValue(market.unresolvedIssues)
      : null;

    const inPortal = snapshot.opportunities?.ok
      ? projects.filter((project) => project.portalStatus === "in_portal").length
      : null;
    const handoffReady = snapshot.opportunities?.ok
      ? projects.filter((project) => Boolean(project.portalHandoffReady)).length
      : null;
    const wonNotPortal = snapshot.opportunities?.ok
      ? projects.filter(
          (project) =>
            text(project.pipelineStatus || project.status).toLowerCase() ===
              "won" &&
            project.portalStatus !== "in_portal",
        ).length
      : null;

    const website = snapshot.operations?.ok
      ? health.publicHealth === "ok"
        ? "ONLINE"
        : upperState(health.publicHealth || health.status)
      : "N/A";

    const promo = snapshot.promotion?.ok
      ? promotion.active
        ? "ACTIVE"
        : "OFF"
      : "N/A";

    const situation = [
      {
        label: "Orders",
        value: snapshot.orders?.ok ? String(orderState.open) : "N/A",
        note: snapshot.orders?.ok
          ? `${orderState.supplier} need supplier · ${orderState.tracking} need tracking`
          : "Orders API unavailable",
        href: "/admin-store-orders",
        kind:
          orderState.hold + orderState.refund
            ? "is-urgent"
            : orderState.supplier + orderState.tracking
              ? "is-warning"
              : "",
      },
      {
        label: "Revenue",
        value: snapshot.orders?.ok ? revenue.revenue : null,
        money: true,
        note: snapshot.orders?.ok
          ? `${revenue.orders} stored non-refunded orders`
          : "Stored order value unavailable",
        href: "/admin-analytics",
        kind: "",
      },
      {
        label: "Leads",
        value: snapshot.opportunities?.ok ? String(leadState.active) : "N/A",
        note: snapshot.opportunities?.ok
          ? `${leadState.new} new · ${leadState.unassigned} unassigned`
          : "Opportunities API unavailable",
        href: "/admin-listings#leads",
        kind: leadState.unassigned + leadState.noNext ? "is-warning" : "",
      },
      {
        label: "Catalog",
        value: snapshot.catalog?.ok
          ? `${catalogState.published}/${catalogState.total}`
          : "N/A",
        note: snapshot.catalog?.ok
          ? `${catalogState.review} need review · ${catalogState.drafts} drafts`
          : "Catalog API unavailable",
        href: "/admin-catalog",
        kind: catalogState.review ? "is-warning" : "",
      },
      {
        label: "Channels",
        value:
          syncIssues === null
            ? "N/A"
            : syncIssues
              ? `${syncIssues} REVIEW`
              : "CLEAR",
        note: snapshot.sync?.ok
          ? `${numberValue(syncCounts.ready)} ready · ${numberValue(syncCounts.outOfSync)} out of sync`
          : "Sync API unavailable",
        href: "/admin-channels",
        kind:
          syncIssues === 0
            ? "is-good"
            : syncIssues
              ? "is-warning"
              : "",
      },
      {
        label: "Shipping / Hawaii",
        value:
          shipping.blocked === null
            ? "N/A"
            : shipping.blocked
              ? `${shipping.blocked} BLOCKED`
              : "CLEAR",
        note:
          shipping.reservations === null
            ? "Lithium shipping API unavailable"
            : `${shipping.reservations} reservations · ${shipping.openBatches} open batches`,
        href: "/admin-lithium-shipping",
        kind:
          shipping.blocked === 0
            ? "is-good"
            : shipping.blocked
              ? "is-warning"
              : "",
      },
      {
        label: "Marketplace",
        value: live === null ? "N/A" : `${live} LIVE`,
        note:
          pending === null
            ? "Operations summary unavailable"
            : `${pending} review · ${marketIssues} issues`,
        href: "/admin-listings#marketplace",
        kind: marketIssues ? "is-warning" : "",
      },
      {
        label: "Website",
        value: website,
        note: snapshot.operations?.ok
          ? `Lead Core ${upperState(health.leadCore)} · Build ${health.build || "unknown"}`
          : "Health signal unavailable",
        href: "/admin-system",
        kind:
          health.publicHealth === "ok"
            ? "is-good"
            : snapshot.operations?.ok
              ? "is-warning"
              : "",
      },
      {
        label: "Promotion",
        value: promo,
        note: snapshot.promotion?.ok
          ? promotion.active
            ? `${promotion.couponCode || "Promotion"} · ${numberValue(promotion.couponPercent)}%`
            : `${promotion.couponCode || "Promotion"} disabled`
          : "Promotion API unavailable",
        href: "/admin-promotion",
        kind: promotion.active ? "is-warning" : "",
      },
    ];

    const priorities = [
      ["Order holds / refunds", snapshot.orders?.ok ? orderState.hold + orderState.refund : null, "Orders blocked by fulfillment issues or refund-required state.", "/admin-store-orders", "is-urgent", 100],
      ["Shipping blockers", shipping.blocked, "Lithium product or Hawaii batch controls not ready.", "/admin-lithium-shipping", "is-urgent", 95],
      ["Sync errors / stale", snapshot.sync?.ok ? numberValue(syncCounts.syncError) + numberValue(syncCounts.stale) : null, "Automation errors or stale supplier/source observations.", "/admin-channels", "is-urgent", 90],
      ["Purchase from supplier", snapshot.orders?.ok ? orderState.supplier : null, "Paid orders still needing supplier fulfillment.", "/admin-store-orders", "is-warning", 80],
      ["Tracking needed", snapshot.orders?.ok ? orderState.tracking : null, "Supplier ordered; tracking not recorded.", "/admin-store-orders", "is-warning", 75],
      ["Unassigned leads", snapshot.opportunities?.ok ? leadState.unassigned : null, "Active leads with no assigned representative.", "/admin-listings#leads", "is-warning", 70],
      ["Leads missing next action", snapshot.opportunities?.ok ? leadState.noNext : null, "Active lead records without a meaningful next step.", "/admin-listings#leads", "is-warning", 68],
      ["Products needing review", snapshot.sync?.ok ? numberValue(syncCounts.review) : snapshot.catalog?.ok ? catalogState.review : null, "Product identity, cost, stock, shipping, margin, HOLD or mapping review.", "/admin-catalog", "is-warning", 60],
      ["Listings out of sync", snapshot.sync?.ok ? numberValue(syncCounts.outOfSync) : null, "Channel/source relationships needing review.", "/admin-channels", "is-warning", 58],
      ["Supplier rechecks", shipping.supplierRechecks, "Lithium supplier availability needs a fresh check.", "/admin-lithium-shipping", "is-warning", 55],
      ["Customer confirmations", shipping.confirmations, "Hawaii batch lines waiting on customer approval.", "/admin-lithium-shipping", "is-warning", 50],
      ["Portal handoffs ready", handoffReady, "Qualified project records ready for Technician Portal handoff.", "/admin-listings#leads", "", 45],
      ["Doba CSV snapshot", snapshot.doba?.ok && !doba.latestSuccessfulImport ? 1 : 0, doba.latestSuccessfulImport ? "A successful supplier import is recorded." : "No successful supplier snapshot import is recorded.", "/admin-channels#doba-csv-sync", "is-warning", 40],
    ].map(([label, count, note, href, kind, weight]) => ({
      label,
      count,
      note,
      href,
      kind,
      weight,
    }));

    const actionable = priorities
      .filter(
        (item) =>
          item.count !== null &&
          numberValue(item.count) > 0,
      )
      .sort((a, b) => b.weight - a.weight);

    const programs = [
      {
        label: "Marketplace",
        value: live === null ? "N/A" : `${live} live`,
        note:
          pending === null
            ? "No Marketplace summary"
            : `${pending} awaiting review · ${marketIssues} unresolved issues`,
        href: "/admin-listings#marketplace",
        kind: marketIssues ? "is-warning" : "",
      },
      {
        label: "Solar",
        value: snapshot.operations?.ok
          ? `${numberValue(signals.solarLeadCreated)} leads`
          : "N/A",
        note: snapshot.operations?.ok
          ? `${numberValue(signals.solarCompletedSubmitted)} completed/submitted builds`
          : "Solar signal unavailable",
        href: "/admin-listings#solar",
        kind: "",
      },
      {
        label: "Technician Portal",
        value: inPortal === null ? "N/A" : `${inPortal} in portal`,
        note:
          handoffReady === null
            ? "Opportunity data unavailable"
            : `${handoffReady} handoff ready · ${wonNotPortal} won not in portal`,
        href: "/admin-listings#leads",
        kind: handoffReady ? "is-warning" : "",
      },
      {
        label: "Lead Core",
        value: snapshot.operations?.ok
          ? health.leadCore === "ok"
            ? "HEALTHY"
            : upperState(health.leadCore)
          : "N/A",
        note: snapshot.operations?.ok
          ? `Backend ${upperState(health.backend)} · Notifications ${upperState(health.notifications)}`
          : "Operations health unavailable",
        href: "/admin-system",
        kind: health.leadCore === "ok" ? "is-good" : "is-warning",
      },
    ];

    return Object.freeze({
      orders,
      orderState,
      revenue,
      catalogState,
      inventoryStats,
      leadState,
      shipping,
      situation,
      priorities,
      actionable: actionable.slice(0, 8),
      actionableCount: actionable.reduce(
        (sum, item) => sum + numberValue(item.count),
        0,
      ),
      actionableTypes: actionable.length,
      programs,
      metrics: {
        storeRevenueCents: snapshot.orders?.ok ? revenue.revenue : null,
        grossContributionCents: snapshot.orders?.ok
          ? revenue.grossContribution
          : null,
        averageOrderCents: snapshot.orders?.ok ? revenue.aov : null,
        inventoryValueCents: snapshot.inventory?.ok
          ? numberValue(inventoryStats.inventoryValueCents)
          : null,
        lowStock: snapshot.inventory?.ok
          ? numberValue(inventoryStats.lowStock)
          : null,
        submittedLeads: snapshot.operations?.ok
          ? numberValue(signals.submittedLeads)
          : null,
      },
      leadHealth: {
        active: snapshot.opportunities?.ok ? leadState.active : null,
        new: snapshot.opportunities?.ok ? leadState.new : null,
        followup: snapshot.opportunities?.ok ? leadState.followup : null,
        unassigned: snapshot.opportunities?.ok ? leadState.unassigned : null,
        noNext: snapshot.opportunities?.ok ? leadState.noNext : null,
        followUpsDue: snapshot.operations?.ok
          ? numberValue(signals.followUpsDue)
          : null,
      },
      unavailable: Object.values(snapshot)
        .filter((entry) => !entry?.ok)
        .map((entry) => entry.name)
        .filter(Boolean),
    });
  }

  window.EUSAdminData = Object.freeze({
    api,
    loadAll,
    getOrders,
    getCatalog,
    getInventory,
    getOpportunities,
    getOperations,
    getAnalytics,
    getLithium,
    getSync,
    getDoba,
    getPromotion,
    orderActions,
    leadActions,
    catalogActions,
    computeRevenue,
    money,
    valueOrNA,
    text,
    numberValue,
    upperState,
    buildOverviewModel,
  });

  const boot = () => {
    installShell();
    enhanceOrders();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
