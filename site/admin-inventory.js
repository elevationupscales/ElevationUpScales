(() => {
  const $ = (id) => document.getElementById(id);
  const POLL_MS = 15000;
  const loginPanel = $('inventory-login-panel');
  const loginForm = $('inventory-login-form');
  const loginStatus = $('inventory-login-status');
  const dashboard = $('inventory-dashboard');
  const addButton = $('inventory-add');
  const refreshButton = $('inventory-refresh');
  const logoutButton = $('inventory-logout');
  const liveBox = $('inventory-live');
  const liveLabel = $('inventory-live-label');
  const lastSync = $('inventory-last-sync');
  const syncMessage = $('inventory-sync-message');
  const editor = $('inventory-editor');
  const itemForm = $('inventory-item-form');
  const editorTitle = $('inventory-editor-title');
  const editorEyebrow = $('inventory-editor-eyebrow');
  const editorClose = $('inventory-editor-close');
  const cancelButton = $('inventory-cancel');
  const archiveButton = $('inventory-archive');
  const formStatus = $('inventory-form-status');
  const modeField = $('inventory-mode');
  const tableBody = $('inventory-table-body');
  const tableSummary = $('inventory-table-summary');
  const search = $('inventory-search');
  const supplierFilter = $('inventory-filter-supplier');
  const stateFilter = $('inventory-filter-state');
  const activityList = $('inventory-activity-list');
  const channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel('eus-inventory-v1') : null;

  let data = { items: [], stats: {}, recentEvents: [], revision: '', syncedAt: '' };
  let pollTimer = null;
  let requestInFlight = false;
  let formDirty = false;

  const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[c]));
  const money = (cents) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((Number(cents) || 0) / 100);
  const date = (value) => { if (!value) return '—'; const d = new Date(value); return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString(); };
  const shortDate = (value) => { if (!value) return '—'; const d = new Date(value); return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); };
  const toCents = (value) => Math.max(0, Math.round((Number(value) || 0) * 100));
  const fromCents = (value) => ((Number(value) || 0) / 100).toFixed(2);
  const intValue = (id) => Math.max(0, Math.round(Number($(id).value) || 0));
  const supplierName = (value) => ({ doba: 'Doba', fourthwall: 'Fourthwall', printful: 'Printful', spreadconnect: 'Spreadconnect', 'self-stock': 'Self Stock', other: 'Other' }[value] || value || 'Other');
  const modeName = (value) => ({ tracked: 'Tracked Stock', supplier_managed: 'Supplier Managed', dropship: 'Dropship', pod: 'Print on Demand' }[value] || value || 'Unknown');

  async function api(url, options = {}) {
    const headers = { Accept: 'application/json', ...(options.headers || {}) };
    if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
    const response = await fetch(url, { credentials: 'same-origin', cache: 'no-store', ...options, headers });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body.error || `Request failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return body;
  }

  function setLive(state, message) {
    if (!liveBox) return;
    liveBox.dataset.state = state || 'live';
    liveLabel.textContent = state === 'error' ? 'Sync issue' : state === 'syncing' ? 'Syncing' : 'Live';
    if (message) lastSync.textContent = message;
  }

  function showLogin(message = '') {
    clearPoll();
    loginPanel.hidden = false;
    dashboard.hidden = true;
    addButton.hidden = true;
    refreshButton.hidden = true;
    logoutButton.hidden = true;
    liveBox.hidden = true;
    loginStatus.textContent = message;
  }

  function showDashboard() {
    loginPanel.hidden = true;
    dashboard.hidden = false;
    addButton.hidden = false;
    refreshButton.hidden = false;
    logoutButton.hidden = false;
    liveBox.hidden = false;
  }

  function clearPoll() {
    if (pollTimer) clearTimeout(pollTimer);
    pollTimer = null;
  }

  function schedulePoll() {
    clearPoll();
    if (dashboard.hidden || document.hidden) return;
    pollTimer = setTimeout(async () => {
      await refresh({ background: true });
      schedulePoll();
    }, POLL_MS);
  }

  function applySnapshot(snapshot, { background = false } = {}) {
    const previousRevision = data.revision;
    data = {
      items: Array.isArray(snapshot.items) ? snapshot.items : [],
      stats: snapshot.stats || {},
      recentEvents: Array.isArray(snapshot.recentEvents) ? snapshot.recentEvents : [],
      revision: snapshot.revision || '',
      syncedAt: snapshot.syncedAt || new Date().toISOString(),
    };
    renderStats();
    if (!background || data.revision !== previousRevision) {
      renderTable();
      renderActivity();
    }
    setLive('live', `Synced ${new Date(data.syncedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`);
    syncMessage.textContent = '';
    syncMessage.dataset.state = '';
  }

  async function refresh({ background = false } = {}) {
    if (requestInFlight) return;
    requestInFlight = true;
    if (!background) setLive('syncing', 'Checking server…');
    try {
      const snapshot = await api('/api/admin/inventory');
      applySnapshot(snapshot, { background });
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        showLogin('Your Admin session has expired. Sign in again.');
        return;
      }
      setLive('error', 'Last server check failed');
      syncMessage.textContent = error.message || 'Inventory sync failed.';
      syncMessage.dataset.state = 'error';
    } finally {
      requestInFlight = false;
    }
  }

  function renderStats() {
    const stats = data.stats || {};
    $('inventory-stat-skus').textContent = Number(stats.activeSkus || 0).toLocaleString();
    $('inventory-stat-onhand').textContent = Number(stats.onHand || 0).toLocaleString();
    $('inventory-stat-reserved').textContent = Number(stats.reserved || 0).toLocaleString();
    $('inventory-stat-available').textContent = Number(stats.available || 0).toLocaleString();
    $('inventory-stat-low').textContent = Number(stats.lowStock || 0).toLocaleString();
    $('inventory-stat-value').textContent = money(stats.inventoryValueCents || 0);
  }

  function filteredItems() {
    const q = search.value.trim().toLowerCase();
    const supplier = supplierFilter.value;
    const state = stateFilter.value;
    return data.items.filter((item) => {
      if (supplier !== 'all' && item.supplier !== supplier) return false;
      if (state === 'low' && !item.lowStock) return false;
      if (['active', 'paused', 'archived'].includes(state) && item.status !== state) return false;
      if (!q) return true;
      return [item.sku, item.name, item.category, item.supplier, item.supplierProductId, ...(item.salesChannels || [])].join(' ').toLowerCase().includes(q);
    });
  }

  function stockCell(item) {
    if (item.fulfillmentMode !== 'tracked') return '<span class="inventory-supplier-managed">Supplier managed</span>';
    return `<div class="inventory-qty-controls"><button type="button" data-stock="-1" aria-label="Decrease ${esc(item.name)} stock by one">−</button><strong>${Number(item.quantityOnHand || 0).toLocaleString()}</strong><button type="button" data-stock="1" aria-label="Increase ${esc(item.name)} stock by one">+</button></div>`;
  }

  function stockState(item) {
    if (item.status === 'archived') return '<span class="inventory-pill muted">Archived</span>';
    if (item.status === 'paused') return '<span class="inventory-pill muted">Paused</span>';
    if (item.fulfillmentMode !== 'tracked') return '<span class="inventory-pill muted">Supplier</span>';
    if (item.lowStock) return '<span class="inventory-pill low">Low Stock</span>';
    return '<span class="inventory-pill good">In Stock</span>';
  }

  function renderTable() {
    const items = filteredItems();
    tableSummary.textContent = `Showing ${items.length} of ${data.items.length} inventory item${data.items.length === 1 ? '' : 's'}.`;
    if (!items.length) {
      tableBody.innerHTML = '<tr><td colspan="11" class="admin-empty-cell"><strong>No inventory matches these filters.</strong><br><span>Use + Add Item to begin or change the filters above.</span></td></tr>';
      return;
    }
    tableBody.innerHTML = items.map((item) => {
      const rowClass = item.status === 'archived' ? 'inventory-status-archived' : item.status === 'paused' ? 'inventory-status-paused' : '';
      const available = item.fulfillmentMode === 'tracked' ? Number(item.quantityAvailable || 0).toLocaleString() : '—';
      const reserved = item.fulfillmentMode === 'tracked' ? Number(item.quantityReserved || 0).toLocaleString() : '—';
      return `<tr data-item-id="${esc(item.id)}" class="${rowClass}">
        <td><div class="inventory-product"><strong>${esc(item.name)}</strong><code>${esc(item.sku)}</code><small>${esc(item.category || 'Uncategorized')}</small></div></td>
        <td>${esc(supplierName(item.supplier))}</td>
        <td><span class="inventory-pill">${esc(modeName(item.fulfillmentMode))}</span></td>
        <td>${money(item.costCents)}</td><td>${money(item.priceCents)}</td>
        <td>${stockCell(item)}</td><td>${reserved}</td><td><strong>${available}</strong></td>
        <td>${stockState(item)}</td><td>${esc(shortDate(item.updatedAt))}</td>
        <td><div class="inventory-row-actions"><button class="primary" type="button" data-action="edit">Edit</button>${item.sourceUrl ? `<button type="button" data-action="source">Source</button>` : ''}</div></td>
      </tr>`;
    }).join('');
  }

  function renderActivity() {
    if (!data.recentEvents.length) {
      activityList.innerHTML = '<p class="admin-muted">No inventory changes yet.</p>';
      return;
    }
    activityList.innerHTML = data.recentEvents.slice(0, 30).map((event) => {
      const qtyChanged = event.quantityBefore !== event.quantityAfter || event.reservedBefore !== event.reservedAfter;
      const qty = qtyChanged ? `${event.quantityBefore} → ${event.quantityAfter} on hand${event.reservedBefore !== event.reservedAfter ? ` · reserved ${event.reservedBefore} → ${event.reservedAfter}` : ''}` : (event.details?.changed ? event.details.changed.join(', ') : 'Record updated');
      return `<div class="inventory-activity-row"><span>${esc(date(event.createdAt))}</span><strong>${esc(event.sku || event.itemId)}</strong><span>${esc(String(event.action || 'updated').replaceAll('_', ' '))}</span><small class="inventory-activity-change">${esc(qty)}${event.adminEmail ? ` · ${esc(event.adminEmail)}` : ''}</small></div>`;
    }).join('');
  }

  function syncStockFields() {
    const tracked = modeField.value === 'tracked';
    document.querySelectorAll('.inventory-stock-field').forEach((label) => {
      label.classList.toggle('inventory-stock-disabled', !tracked);
      const input = label.querySelector('input');
      input.disabled = !tracked;
    });
  }

  function resetForm() {
    itemForm.reset();
    $('inventory-item-id').value = '';
    $('inventory-item-version').value = '1';
    $('inventory-supplier').value = 'doba';
    $('inventory-mode').value = 'tracked';
    $('inventory-status').value = 'active';
    $('inventory-onhand').value = '0';
    $('inventory-reserved').value = '0';
    $('inventory-reorder').value = '0';
    editorTitle.textContent = 'Add Item';
    editorEyebrow.textContent = 'Inventory Item';
    archiveButton.hidden = true;
    formStatus.textContent = '';
    formStatus.dataset.state = '';
    formDirty = false;
    syncStockFields();
  }

  function openNew() {
    resetForm();
    editor.hidden = false;
    $('inventory-sku').focus();
    editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openEdit(item) {
    resetForm();
    $('inventory-item-id').value = item.id;
    $('inventory-item-version').value = String(item.version || 1);
    $('inventory-sku').value = item.sku || '';
    $('inventory-name').value = item.name || '';
    $('inventory-category').value = item.category || '';
    $('inventory-supplier').value = ['doba', 'fourthwall', 'printful', 'spreadconnect', 'self-stock', 'other'].includes(item.supplier) ? item.supplier : 'other';
    $('inventory-mode').value = item.fulfillmentMode || 'tracked';
    $('inventory-status').value = item.status || 'active';
    $('inventory-supplier-id').value = item.supplierProductId || '';
    $('inventory-channels').value = (item.salesChannels || []).join(', ');
    $('inventory-cost').value = fromCents(item.costCents);
    $('inventory-price').value = fromCents(item.priceCents);
    $('inventory-onhand').value = String(item.quantityOnHand || 0);
    $('inventory-reserved').value = String(item.quantityReserved || 0);
    $('inventory-reorder').value = String(item.reorderPoint || 0);
    $('inventory-url').value = item.sourceUrl || '';
    $('inventory-notes').value = item.notes || '';
    editorTitle.textContent = item.name || 'Edit Item';
    editorEyebrow.textContent = `Edit · ${item.sku}`;
    archiveButton.hidden = item.status === 'archived';
    editor.hidden = false;
    formDirty = false;
    syncStockFields();
    editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeEditor(force = false) {
    if (!force && formDirty && !confirm('Discard unsaved inventory changes?')) return;
    editor.hidden = true;
    resetForm();
  }

  function payload() {
    return {
      version: Number($('inventory-item-version').value || 1),
      sku: $('inventory-sku').value.trim(),
      name: $('inventory-name').value.trim(),
      category: $('inventory-category').value.trim(),
      supplier: $('inventory-supplier').value,
      fulfillmentMode: $('inventory-mode').value,
      supplierProductId: $('inventory-supplier-id').value.trim(),
      salesChannels: $('inventory-channels').value.split(',').map((value) => value.trim()).filter(Boolean),
      costCents: toCents($('inventory-cost').value),
      priceCents: toCents($('inventory-price').value),
      quantityOnHand: intValue('inventory-onhand'),
      quantityReserved: intValue('inventory-reserved'),
      reorderPoint: intValue('inventory-reorder'),
      status: $('inventory-status').value,
      sourceUrl: $('inventory-url').value.trim(),
      notes: $('inventory-notes').value.trim(),
    };
  }

  async function mutate(url, options) {
    const result = await api(url, options);
    applySnapshot(result);
    channel?.postMessage({ type: 'inventory-mutated', revision: result.revision || '' });
    return result;
  }

  async function adjustStock(item, delta, button) {
    if (item.fulfillmentMode !== 'tracked' || item.status === 'archived') return;
    const next = Math.max(0, Number(item.quantityOnHand || 0) + delta);
    button.disabled = true;
    try {
      await mutate(`/api/admin/inventory/${encodeURIComponent(item.id)}`, { method: 'PATCH', body: JSON.stringify({ version: item.version, quantityOnHand: next }) });
    } catch (error) {
      syncMessage.textContent = error.message;
      syncMessage.dataset.state = 'error';
      if (error.status === 409) await refresh();
    } finally {
      button.disabled = false;
    }
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = loginForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    loginStatus.textContent = 'Signing in…';
    try {
      const fd = new FormData(loginForm);
      await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }) });
      loginForm.reset();
      showDashboard();
      await refresh();
      schedulePoll();
    } catch (error) {
      loginStatus.textContent = error.message;
    } finally {
      submit.disabled = false;
    }
  });

  logoutButton.addEventListener('click', async () => {
    logoutButton.disabled = true;
    try { await api('/api/admin/logout', { method: 'POST', body: '{}' }); } catch (_) {}
    showLogin('Signed out.');
    logoutButton.disabled = false;
  });

  addButton.addEventListener('click', openNew);
  editorClose.addEventListener('click', () => closeEditor());
  cancelButton.addEventListener('click', () => closeEditor());
  refreshButton.addEventListener('click', async () => { refreshButton.disabled = true; try { await refresh(); } finally { refreshButton.disabled = false; schedulePoll(); } });
  modeField.addEventListener('change', syncStockFields);
  itemForm.addEventListener('input', () => { formDirty = true; });
  itemForm.addEventListener('change', () => { formDirty = true; });

  itemForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = $('inventory-item-id').value;
    const save = $('inventory-save');
    save.disabled = true;
    formStatus.textContent = id ? 'Saving changes…' : 'Adding item…';
    formStatus.dataset.state = '';
    try {
      const body = payload();
      const result = await mutate(id ? `/api/admin/inventory/${encodeURIComponent(id)}` : '/api/admin/inventory', { method: id ? 'PATCH' : 'POST', body: JSON.stringify(body) });
      formDirty = false;
      if (result.item) openEdit(result.item);
      formStatus.textContent = 'Saved.';
      formStatus.dataset.state = 'success';
    } catch (error) {
      formStatus.textContent = error.message;
      formStatus.dataset.state = 'error';
      if (error.status === 409) await refresh();
    } finally {
      save.disabled = false;
    }
  });

  archiveButton.addEventListener('click', async () => {
    const id = $('inventory-item-id').value;
    if (!id || !confirm('Archive this inventory item? Its history will be preserved.')) return;
    archiveButton.disabled = true;
    try {
      await mutate(`/api/admin/inventory/${encodeURIComponent(id)}`, { method: 'DELETE', body: '{}' });
      closeEditor(true);
    } catch (error) {
      formStatus.textContent = error.message;
      formStatus.dataset.state = 'error';
    } finally {
      archiveButton.disabled = false;
    }
  });

  tableBody.addEventListener('click', async (event) => {
    const row = event.target.closest('[data-item-id]');
    if (!row) return;
    const item = data.items.find((candidate) => candidate.id === row.dataset.itemId);
    if (!item) return;
    const stockButton = event.target.closest('[data-stock]');
    if (stockButton) {
      await adjustStock(item, Number(stockButton.dataset.stock || 0), stockButton);
      return;
    }
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'edit') openEdit(item);
    if (action === 'source' && item.sourceUrl) window.open(item.sourceUrl, '_blank', 'noopener');
  });

  [search, supplierFilter, stateFilter].forEach((control) => control.addEventListener(control === search ? 'input' : 'change', renderTable));
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearPoll(); else if (!dashboard.hidden) refresh({ background: true }).finally(schedulePoll); });
  channel?.addEventListener('message', (event) => { if (event.data?.type === 'inventory-mutated' && !dashboard.hidden) refresh({ background: true }); });
  window.addEventListener('beforeunload', () => { clearPoll(); channel?.close(); });

  api('/api/admin/session').then(async () => {
    showDashboard();
    await refresh();
    schedulePoll();
  }).catch((error) => showLogin(error?.status === 401 || error?.status === 403 ? '' : 'Unable to verify the Admin session. Refresh and try again.'));
})();
