(() => {
  "use strict";
  const actions = document.querySelector(".admin-header-actions");
  if (!actions) return;
  const inventory = actions.querySelector('[href="/admin-inventory.html"]');

  const ensureLink = (href, label, after) => {
    const existing = actions.querySelector(`[href="${href}"]`);
    if (existing) return existing;
    const link = document.createElement("a");
    link.className = "button button-outline";
    link.href = href;
    link.textContent = label;
    if (after?.parentNode === actions) after.insertAdjacentElement("afterend", link);
    else if (inventory) inventory.insertAdjacentElement("afterend", link);
    else actions.prepend(link);
    return link;
  };

  const catalog = ensureLink("/admin-catalog", "Catalog", inventory);
  const orders = ensureLink("/admin-store-orders.html", "Orders", catalog);
  const lithium = ensureLink("/admin-lithium-shipping.html", "Lithium Shipping", orders);
  ensureLink("/admin-rv-checkout-map.html", "RV Mapping", lithium);

  const ensureHawaiiSummary = () => {
    const dashboard = document.getElementById("admin-dashboard");
    const anchor = dashboard?.querySelector(".admin-command-actions");
    if (!dashboard || !anchor || document.getElementById("hawaii-action-summary")) return null;
    const section = document.createElement("section");
    section.id = "hawaii-action-summary";
    section.className = "admin-command-actions";
    section.setAttribute("aria-label", "Hawaii Lithium actions");
    section.innerHTML = `
      <article><span>Hawaii Follow-Up Due</span><strong data-hi-metric="followupDue">—</strong><small>7+ day reservations</small></article>
      <article class="is-urgent"><span>Management / Reconfirm</span><strong data-hi-metric="attention">—</strong><small>14+ / 30+ day actions</small></article>
      <article><span>Inventory Recheck</span><strong data-hi-metric="inventoryRecheckDue">—</strong><small>Supplier confirmation needed</small></article>
      <article><span>Route / Docs Blockers</span><strong data-hi-metric="routeBlockers">—</strong><small>Shipping controls incomplete</small></article>
      <article><span>Batch-Ready Demand</span><strong data-hi-metric="batchReadyDemand">—</strong><small>Confirmed compatible lines</small></article>
      <article class="summary-alert"><span>Blocked Reservations</span><strong data-hi-metric="blockedReservations">—</strong><small>Open Lithium Shipping Matrix</small></article>`;
    section.style.cursor = "pointer";
    section.title = "Open Lithium Shipping Matrix";
    section.addEventListener("click", () => { window.location.href = "/admin-lithium-shipping.html"; });
    anchor.insertAdjacentElement("afterend", section);
    return section;
  };

  const loadHawaiiSummary = async () => {
    const section = ensureHawaiiSummary();
    if (!section) return;
    try {
      const response = await fetch("/api/admin/lithium-shipping", { credentials: "same-origin", cache: "no-store", headers: { Accept: "application/json" } });
      if (response.status === 401) { section.hidden = true; return; }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const m = data.metrics || {};
      const values = {
        followupDue: Number(m.followupDue || 0),
        attention: Number(m.managementFlag || 0) + Number(m.reconfirmRequired || 0),
        inventoryRecheckDue: Number(m.inventoryRecheckDue || 0),
        routeBlockers: Number(m.routeBlockers || 0),
        batchReadyDemand: Number(m.batchReadyDemand || 0),
        blockedReservations: Number(m.blockedReservations || 0),
      };
      for (const [key, value] of Object.entries(values)) {
        const el = section.querySelector(`[data-hi-metric="${key}"]`);
        if (el) el.textContent = String(value);
      }
      section.hidden = false;
    } catch (_) {
      section.hidden = true;
    }
  };

  loadHawaiiSummary();
  window.setTimeout(loadHawaiiSummary, 1200);
  window.setInterval(loadHawaiiSummary, 45000);
})();
