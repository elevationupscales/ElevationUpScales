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
  ensureLink("/admin-rv-checkout-map.html", "RV Mapping", orders);
})();
