(() => {
  "use strict";
  const actions = document.querySelector(".admin-header-actions");
  if (!actions || actions.querySelector('[href="/admin-store-orders.html"]')) return;
  const inventory = actions.querySelector('[href="/admin-inventory.html"]');
  const link = document.createElement("a");
  link.className = "button button-outline";
  link.href = "/admin-store-orders.html";
  link.textContent = "Orders";
  if (inventory) inventory.insertAdjacentElement("afterend", link);
  else actions.prepend(link);
})();
