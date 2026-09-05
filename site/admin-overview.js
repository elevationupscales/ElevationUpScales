/* Elevation UpScales Operations Interface 2.0
 * Phase 2A: rendering/auth only.
 * Business-state calculations live in EUSAdminData.buildOverviewModel().
 */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const auth = $("eus-admin-auth");
  const overview = $("eus-admin-overview");
  const form = $("eus-admin-login-form");
  const loginStatus = $("eus-admin-login-status");
  const refresh = $("eus-admin-refresh");
  const logout = $("eus-admin-logout");
  const status = $("eus-overview-status");

  const D = () => window.EUSAdminData;
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );

  const metric = (label, value, note = "") =>
    `<article class="eus-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong>${note ? `<small>${esc(note)}</small>` : ""}</article>`;

  const situation = ({ label, value, note, href, kind = "", money = false }) =>
    `<a class="eus-ops-situation-card ${kind}" href="${href}"><span>${esc(label)}</span><strong>${esc(money && value !== null ? D().money(value) : value)}</strong><small>${esc(note)}</small></a>`;

  const action = ({ label, count, note, href, kind = "" }) =>
    `<a class="eus-action-card ${kind}" href="${href}"><span>${esc(label)}</span><strong>${esc(count)}</strong><small>${esc(note)}</small></a>`;

  const program = ({ label, value, note, href, kind = "" }) =>
    `<a class="eus-ops-program-card ${kind}" href="${href}"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></a>`;

  const orderLabel = (value) =>
    ({
      fulfillment_pending: "Needs Order",
      supplier_ordered: "Supplier Ordered",
      shipped: "Shipped",
      completed: "Completed",
      hold_issue: "Hold / Issue",
      refund_needed: "Refund Needed",
      refunded: "Refunded",
      cancelled: "Cancelled",
    })[value] ||
    value ||
    "Pending";

  function showAuth(message = "") {
    auth.hidden = false;
    overview.hidden = true;
    loginStatus.textContent = message;
  }

  function showOverview() {
    auth.hidden = true;
    overview.hidden = false;
  }

  async function session() {
    try {
      const response = await D().api("/api/admin/session");
      return Boolean(
        response?.authenticated ||
        response?.ok ||
        response?.admin,
      );
    } catch {
      return false;
    }
  }

  function renderRecentOrders(orders = []) {
    const rows = [...orders]
      .sort((a, b) =>
        String(b.paidAt || b.createdAt || "").localeCompare(
          String(a.paidAt || a.createdAt || ""),
        ),
      )
      .slice(0, 6);

    $("eus-recent-orders").innerHTML = rows.length
      ? rows
          .map(
            (order) =>
              `<tr><td><a href="/admin-store-orders"><strong>${esc(order.id)}</strong></a><br><small>${esc(order.paidAt || order.createdAt || "")}</small></td><td>${esc(order.shipping?.fullName || order.customer?.email || "—")}</td><td>${esc(order.source === "rv" ? "RV & Outdoor" : order.source === "apparel" ? "Apparel" : order.source || "Store")}</td><td>${D().money(order.totalCents)}</td><td><span class="eus-pill ${["hold_issue", "refund_needed"].includes(order.fulfillmentStatus) ? "is-alert" : ["fulfillment_pending", "supplier_ordered"].includes(order.fulfillmentStatus) ? "is-warn" : ""}">${esc(orderLabel(order.fulfillmentStatus))}</span></td></tr>`,
          )
          .join("")
      : '<tr><td colspan="5" class="eus-empty">No stored orders yet.</td></tr>';
  }

  function render(snapshot) {
    const model = D().buildOverviewModel(snapshot);

    $("eus-situation-grid").innerHTML = model.situation
      .map(situation)
      .join("");

    $("eus-priority-summary").innerHTML = model.actionableTypes
      ? `<strong>${esc(model.actionableCount)}</strong><span>${esc(model.actionableTypes)} active exception type${model.actionableTypes === 1 ? "" : "s"} across loaded operating records.</span>`
      : "<strong>0</strong><span>No active exceptions were found in the loaded priority rules.</span>";

    $("eus-action-board").innerHTML = model.actionable.length
      ? model.actionable.map(action).join("")
      : '<div class="eus-ops-clear"><strong>No immediate operating exceptions</strong><span>Use the Action section below for normal work.</span></div>';

    $("eus-program-status").innerHTML = model.programs
      .map(program)
      .join("");

    $("eus-overview-metrics").innerHTML = [
      metric(
        "Store Revenue",
        model.metrics.storeRevenueCents === null
          ? "N/A"
          : D().money(model.metrics.storeRevenueCents),
        "Stored non-refunded orders",
      ),
      metric(
        "Gross Contribution*",
        model.metrics.grossContributionCents === null
          ? "N/A"
          : D().money(model.metrics.grossContributionCents),
        "Revenue minus stored supplier cost",
      ),
      metric(
        "Average Order",
        model.metrics.averageOrderCents === null
          ? "N/A"
          : D().money(model.metrics.averageOrderCents),
        "Stored order average",
      ),
      metric(
        "Inventory Value",
        model.metrics.inventoryValueCents === null
          ? "N/A"
          : D().money(model.metrics.inventoryValueCents),
        "Tracked inventory value",
      ),
      metric(
        "Low Stock",
        model.metrics.lowStock === null
          ? "N/A"
          : String(model.metrics.lowStock),
        "Tracked inventory items",
      ),
      metric(
        "Submitted Leads",
        model.metrics.submittedLeads === null
          ? "N/A"
          : String(model.metrics.submittedLeads),
        "Confirmed stored submissions",
      ),
    ].join("");

    $("eus-lead-health").innerHTML = [
      metric(
        "Active",
        model.leadHealth.active === null
          ? "N/A"
          : String(model.leadHealth.active),
        "Excludes lost / closed",
      ),
      metric(
        "New",
        model.leadHealth.new === null
          ? "N/A"
          : String(model.leadHealth.new),
        "Needs initial action",
      ),
      metric(
        "Follow-Up",
        model.leadHealth.followup === null
          ? "N/A"
          : String(model.leadHealth.followup),
        "Pipeline follow-up stage",
      ),
      metric(
        "Unassigned",
        model.leadHealth.unassigned === null
          ? "N/A"
          : String(model.leadHealth.unassigned),
        "No representative",
      ),
      metric(
        "No Next Action",
        model.leadHealth.noNext === null
          ? "N/A"
          : String(model.leadHealth.noNext),
        "Needs operating decision",
      ),
      metric(
        "Follow-Ups Due",
        model.leadHealth.followUpsDue === null
          ? "N/A"
          : String(model.leadHealth.followUpsDue),
        "Existing first-party signal",
      ),
    ].join("");

    renderRecentOrders(model.orders);

    status.textContent = model.unavailable.length
      ? `Loaded with unavailable modules: ${model.unavailable.join(", ")}. Unknown values are shown as N/A.`
      : `Updated ${new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })}.`;

    $("eus-ops-data-note").textContent =
      "Data sources: Store Orders, Catalog, Inventory, Opportunities, Operations/health, Analytics, Lithium Shipping, Sync, Doba CSV Sync and Promotion APIs. Technician Portal handoff state is available from Opportunities; a separate live Technician Portal uptime API is not exposed to this dashboard.";
  }

  async function load() {
    status.textContent = "Loading current operations…";
    try {
      const snapshot = await D().loadAll();
      if (Object.values(snapshot).some((entry) => entry.status === 401)) {
        showAuth("Admin session required.");
        return;
      }
      showOverview();
      render(snapshot);
    } catch (error) {
      status.textContent =
        error.message || "Operations Interface could not load.";
    }
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginStatus.textContent = "Signing in…";
    const data = new FormData(form);

    try {
      await D().api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      });
      form.reset();
      loginStatus.textContent = "";
      showOverview();
      await load();
    } catch (error) {
      loginStatus.textContent =
        error.message || "Sign in failed.";
    }
  });

  logout?.addEventListener("click", async () => {
    try {
      await D().api("/api/admin/logout", { method: "POST" });
    } catch {}
    showAuth("Signed out.");
  });

  refresh?.addEventListener("click", load);

  (async () => {
    if (await session()) {
      showOverview();
      load();
    } else {
      showAuth();
    }
  })();
})();
