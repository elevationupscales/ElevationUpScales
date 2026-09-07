(() => {
  "use strict";

  // Marketplace Follow-Up is retired from active operations. Keep a tiny
  // compatibility surface so legacy Command Center refresh hooks remain safe
  // while the historical Marketplace records stay preserved in storage.
  window.EUSMarketplaceFollowups = Object.freeze({
    retired: true,
    refresh: async () => ({ ok: true, retired: true, followups: [] }),
  });
})();
