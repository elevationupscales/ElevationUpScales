(() => {
  "use strict";

  const authPanel = document.querySelector("#orders-auth");
  const dashboard = document.querySelector("#orders-dashboard");
  const statusEl = document.querySelector("#orders-status");
  const body = document.querySelector("#orders-table-body");
  const detail = document.querySelector("#orders-detail");
  const sourceFilter = document.querySelector("#orders-source-filter");
  const statusFilter = document.querySelector("#orders-status-filter");
  const search = document.querySelector("#orders-search");
  const refresh = document.querySelector("#orders-refresh");
  const saveForm = document.querySelector("#order-fulfillment-form");
  const saveStatus = document.querySelector("#order-save-status");
  const copySummary = document.querySelector("#order-copy-summary");
  const state = { orders: [], selectedId: "" };

  const money = (cents) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(cents || 0) / 100);
  const text = (value) => String(value ?? "").trim();
  const statusLabel = (value) => ({
    pending: "Pending",
    paid: "Paid",
    fulfillment_pending: "Needs Fulfillment",
    supplier_ordered: "Supplier Ordered",
    shipped: "Shipped",
    completed: "Completed",
    refund_needed: "Refund Needed",
    refunded: "Refunded",
    cancelled: "Cancelled",
  })[value] || value || "Pending";
  const sourceLabel = (value) => value === "apparel" ? "Apparel" : value === "rv" ? "RV & Outdoor" : value || "Store";

  function orderSearchText(order) {
    return [order.id, order.productName, order.variantName, order.source, order.fulfillmentStatus, order.customer?.email, order.customer?.phone, order.shipping?.fullName, order.shipping?.city, order.shipping?.state, order.trackingNumber, order.supplierOrderId].map(text).join(" ").toLowerCase();
  }

  function filteredOrders() {
    const q = text(search?.value).toLowerCase();
    return state.orders.filter((order) => {
      if (sourceFilter?.value !== "all" && order.source !== sourceFilter.value) return false;
      if (statusFilter?.value !== "all" && order.fulfillmentStatus !== statusFilter.value) return false;
      return !q || orderSearchText(order).includes(q);
    });
  }

  function statusPill(order) {
    const span = document.createElement("span");
    span.className = "orders-pill";
    if (["fulfillment_pending", "refund_needed"].includes(order.fulfillmentStatus)) span.classList.add("is-attention");
    if (order.fulfillmentStatus === "shipped") span.classList.add("is-shipped");
    span.textContent = statusLabel(order.fulfillmentStatus);
    return span;
  }

  function renderCounts(counts = {}) {
    document.querySelector("#orders-count-paid").textContent = String(counts.paid || 0);
    document.querySelector("#orders-count-pending").textContent = String(counts.fulfillment_pending || 0);
    document.querySelector("#orders-count-supplier").textContent = String(counts.supplier_ordered || 0);
    document.querySelector("#orders-count-shipped").textContent = String(counts.shipped || 0);
    document.querySelector("#orders-count-completed").textContent = String(counts.completed || 0);
    document.querySelector("#orders-count-refund").textContent = String(counts.refund_needed || 0);
  }

  function renderTable() {
    const orders = filteredOrders();
    if (!orders.length) {
      body.innerHTML = '<tr><td colspan="6">No orders match the current filters.</td></tr>';
      return;
    }
    body.replaceChildren(...orders.map((order) => {
      const tr = document.createElement("tr");
      tr.dataset.orderId = order.id;
      const orderCell = document.createElement("td");
      orderCell.innerHTML = `<strong>${order.id}</strong><br><small>${order.paidAt || order.createdAt || ""}</small>`;
      const customerCell = document.createElement("td");
      customerCell.textContent = order.shipping?.fullName || order.customer?.email || "—";
      const sourceCell = document.createElement("td");
      sourceCell.className = "orders-source";
      sourceCell.textContent = sourceLabel(order.source);
      const totalCell = document.createElement("td");
      totalCell.className = "orders-money";
      totalCell.textContent = money(order.totalCents);
      const statusCell = document.createElement("td");
      statusCell.append(statusPill(order));
      const openCell = document.createElement("td");
      openCell.className = "orders-open";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button button-outline";
      button.textContent = "Open";
      button.addEventListener("click", () => selectOrder(order.id));
      openCell.append(button);
      tr.append(orderCell, customerCell, sourceCell, totalCell, statusCell, openCell);
      tr.addEventListener("dblclick", () => selectOrder(order.id));
      return tr;
    }));
  }

  function selectedOrder() {
    return state.orders.find((order) => order.id === state.selectedId) || null;
  }

  function addressLine(address = {}) {
    return [address.fullName, address.address1, address.address2, [address.city, address.state, address.postalCode].filter(Boolean).join(", "), address.countryCode].filter(Boolean).join("\n");
  }

  function fulfillmentSummary(order) {
    return [
      `Elevation UpScales Store Order ${order.id}`,
      `Source: ${sourceLabel(order.source)}`,
      `Product: ${order.productName}`,
      order.variantName ? `Variant: ${order.variantName}` : "",
      `Quantity: ${order.quantity}`,
      `Total paid: ${money(order.totalCents)}`,
      `Customer email: ${order.customer?.email || "—"}`,
      `Customer phone: ${order.customer?.phone || "—"}`,
      "Ship to:",
      addressLine(order.shipping),
      `Supplier data: ${JSON.stringify(order.supplier || {})}`,
      `Supplier order ID: ${order.supplierOrderId || "—"}`,
      `Carrier: ${order.carrier || "—"}`,
      `Tracking: ${order.trackingNumber || "—"}`,
      `Status: ${statusLabel(order.fulfillmentStatus)}`,
      order.fulfillmentNotes ? `Notes: ${order.fulfillmentNotes}` : "",
    ].filter(Boolean).join("\n");
  }

  function selectOrder(id) {
    state.selectedId = id;
    const order = selectedOrder();
    if (!order) { detail.hidden = true; return; }
    detail.hidden = false;
    document.querySelector("#order-detail-id").textContent = order.id;
    document.querySelector("#order-customer").textContent = order.shipping?.fullName || "—";
    document.querySelector("#order-contact").textContent = [order.customer?.email, order.customer?.phone].filter(Boolean).join(" · ") || "—";
    document.querySelector("#order-shipping").textContent = addressLine(order.shipping) || "—";
    document.querySelector("#order-product").textContent = order.productName || "—";
    document.querySelector("#order-variant").textContent = order.variantName || "—";
    document.querySelector("#order-quantity").textContent = `Quantity: ${order.quantity || 0}`;
    document.querySelector("#order-money").textContent = `Merchandise ${money(order.merchandiseCents)} · Shipping ${money(order.shippingCents)} · Total ${money(order.totalCents)}`;
    document.querySelector("#order-paypal").textContent = `PayPal order ${order.paypalOrderId || "—"} · Capture ${order.paypalCaptureId || "—"}`;
    document.querySelector("#order-supplier").textContent = JSON.stringify(order.supplier || {}, null, 2);
    document.querySelector("#order-fulfillment-status").value = order.fulfillmentStatus || "fulfillment_pending";
    document.querySelector("#order-supplier-id").value = order.supplierOrderId || "";
    document.querySelector("#order-carrier").value = order.carrier || "";
    document.querySelector("#order-tracking").value = order.trackingNumber || "";
    document.querySelector("#order-notes").value = order.fulfillmentNotes || "";
    saveStatus.textContent = "";
    detail.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  async function loadOrders() {
    statusEl.textContent = "Loading store orders…";
    try {
      const response = await fetch("/api/admin/store-orders", { credentials: "same-origin", cache: "no-store", headers: { Accept: "application/json" } });
      if (response.status === 401) {
        authPanel.hidden = false;
        dashboard.hidden = true;
        return;
      }
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Order API ${response.status}`);
      state.orders = Array.isArray(data.orders) ? data.orders : [];
      authPanel.hidden = true;
      dashboard.hidden = false;
      renderCounts(data.counts || {});
      renderTable();
      statusEl.textContent = `${state.orders.length} store order${state.orders.length === 1 ? "" : "s"} loaded.`;
      if (state.selectedId) selectOrder(state.selectedId);
    } catch (error) {
      statusEl.textContent = error?.message || "Store orders could not be loaded.";
    }
  }

  saveForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const order = selectedOrder();
    if (!order) return;
    saveStatus.textContent = "Saving…";
    const payload = {
      fulfillmentStatus: document.querySelector("#order-fulfillment-status").value,
      supplierOrderId: document.querySelector("#order-supplier-id").value,
      carrier: document.querySelector("#order-carrier").value,
      trackingNumber: document.querySelector("#order-tracking").value,
      fulfillmentNotes: document.querySelector("#order-notes").value,
    };
    try {
      const response = await fetch(`/api/admin/store-orders/${encodeURIComponent(order.id)}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Save failed ${response.status}`);
      const index = state.orders.findIndex((item) => item.id === order.id);
      if (index >= 0) state.orders[index] = data.order;
      saveStatus.textContent = "Saved.";
      renderTable();
      selectOrder(order.id);
    } catch (error) {
      saveStatus.textContent = error?.message || "Order could not be saved.";
    }
  });

  copySummary?.addEventListener("click", async () => {
    const order = selectedOrder();
    if (!order) return;
    try {
      await navigator.clipboard.writeText(fulfillmentSummary(order));
      copySummary.textContent = "Copied";
      setTimeout(() => { copySummary.textContent = "Copy Fulfillment Summary"; }, 1400);
    } catch (_) {}
  });

  for (const control of [sourceFilter, statusFilter, search]) control?.addEventListener(control === search ? "input" : "change", renderTable);
  refresh?.addEventListener("click", loadOrders);

  loadOrders();
})();
