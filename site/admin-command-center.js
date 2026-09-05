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
