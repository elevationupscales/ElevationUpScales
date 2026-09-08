(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const clean = (value) => String(value ?? "").trim();
  let snapshot = null, preview = null;

  async function api(path, options = {}) {
    const response = await fetch(path, { credentials:"same-origin", headers:{"Accept":"application/json", ...(options.body ? {"Content-Type":"application/json"} : {})}, ...options });
    const data = await response.json().catch(() => ({}));
    if (!response.ok && response.status !== 207) { const error = new Error(data.error || `Request failed (${response.status})`); error.status = response.status; error.data = data; throw error; }
    return data;
  }

  function qty(value) { return value === null || value === undefined ? "Unverified" : String(value); }
  function beforeAfter(value, date) { return `${qty(value)}${date ? ` · ${date}` : " · Unverified date"}`; }
  function pill(product) {
    const key = product?.freshness?.key || "UNVERIFIED";
    const cls = key === "CURRENT" ? "is-good" : key === "CURRENT_ZERO" || key === "STALE" ? "is-warn" : "is-alert";
    return `<span class="eus-pill ${cls}">${esc(product?.freshness?.label || "Unverified")}</span>`;
  }

  function renderSnapshot() {
    const products = snapshot?.products || [], counts = snapshot?.counts || {};
    $("stock-count-total").textContent = counts.total ?? products.length;
    $("stock-count-current").textContent = Number(counts.CURRENT || 0) + Number(counts.CURRENT_ZERO || 0);
    $("stock-count-stale").textContent = counts.STALE || 0;
    $("stock-count-unverified").textContent = counts.UNVERIFIED || 0;
    const term = clean($("stock-search").value).toLowerCase(), filter = $("stock-filter").value;
    const shown = products.filter((p) => (!term || `${p.sku} ${p.model} ${p.name}`.toLowerCase().includes(term)) && (filter === "all" || p.freshness?.key === filter));
    $("stock-body").innerHTML = shown.length ? shown.map((p) => `<tr><td><strong>${esc(p.sku)}</strong><br><span class="admin-muted">${esc(p.model || p.name || "")}</span></td><td>${p.supplierQuantity === null ? "<strong>Unverified</strong>" : esc(p.supplierQuantity)}</td><td>${esc(p.verificationDate || "Unverified")}</td><td>${pill(p)}</td><td>${esc(p.freshness?.nextAction || "Verify supplier quantity")}</td></tr>`).join("") : '<tr><td colspan="5">No SOK products match this view.</td></tr>';
  }

  async function load() {
    try {
      snapshot = await api("/api/admin/sok-stock");
      $("sok-stock-login").hidden = true; $("sok-stock-dashboard").hidden = false; renderSnapshot();
    } catch (error) {
      if (error.status === 401) { $("sok-stock-login").hidden = false; $("sok-stock-dashboard").hidden = true; return; }
      $("sok-stock-login-status").textContent = error.message;
    }
  }

  async function login(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await api("/api/admin/login", { method:"POST", body:JSON.stringify({ email:form.get("email"), password:form.get("password") }) });
      $("sok-stock-login-status").textContent = "Signed in."; event.currentTarget.reset(); await load();
    } catch (error) { $("sok-stock-login-status").textContent = error.message; }
  }

  async function selectedText() {
    const file = $("stock-file").files?.[0];
    if (file) return file.text();
    return $("stock-paste").value;
  }

  function renderPreview(data) {
    preview = data;
    $("stock-preview-panel").hidden = false;
    $("stock-receipt-panel").hidden = true;
    const s = data.summary || {};
    $("stock-preview-summary").textContent = `${s.rows || 0} rows · ${s.ready || 0} changes · ${s.unchanged || 0} unchanged · ${s.errors || 0} errors. Preview only; no inventory writes.`;
    $("stock-preview-body").innerHTML = (data.rows || []).map((row) => `<tr><td><span class="eus-pill ${row.state === "READY" ? "is-good" : row.state === "ERROR" ? "is-alert" : ""}">${esc(row.state)}</span></td><td><code>${esc(row.sku || `Line ${row.line}`)}</code></td><td>${esc(beforeAfter(row.before?.supplierQuantity, row.before?.verifiedDate))}</td><td>${esc(beforeAfter(row.after?.supplierQuantity, row.after?.verifiedDate))}</td><td>${row.errors?.length ? `<ul class="stock-errors">${row.errors.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>` : "Ready"}</td></tr>`).join("");
    $("stock-confirm").checked = false;
    $("stock-apply").disabled = true;
    $("stock-intake-status").textContent = data.canApply ? "Preview ready for confirmation." : "Correct row errors and preview again.";
    $("stock-preview-panel").scrollIntoView({behavior:"smooth", block:"start"});
  }

  async function runPreview() {
    $("stock-intake-status").textContent = "Validating preview…";
    try {
      const text = await selectedText();
      if (!clean(text)) throw new Error("Upload or paste a CSV first.");
      renderPreview(await api("/api/admin/sok-stock/preview", { method:"POST", body:JSON.stringify({ text }) }));
    } catch (error) { preview = null; $("stock-preview-panel").hidden = true; $("stock-intake-status").textContent = error.message; }
  }

  function renderReceipt(receipt) {
    $("stock-receipt-panel").hidden = false;
    $("stock-receipt-title").textContent = receipt.duplicate ? "Previously applied receipt" : `Stock apply · ${receipt.status || "Complete"}`;
    $("stock-receipt-summary").textContent = `${receipt.applied?.length || 0} applied · ${receipt.unchanged?.length || 0} unchanged · ${receipt.rejected?.length || 0} rejected${receipt.duplicate ? " · duplicate apply prevented" : ""}.`;
    $("stock-receipt").textContent = JSON.stringify(receipt, null, 2);
    $("stock-receipt-panel").scrollIntoView({behavior:"smooth", block:"start"});
  }

  async function apply() {
    if (!preview?.canApply || !$("stock-confirm").checked) return;
    $("stock-apply").disabled = true;
    $("stock-intake-status").textContent = "Revalidating and applying reviewed stock fields…";
    try {
      const result = await api("/api/admin/sok-stock/apply", { method:"POST", body:JSON.stringify({ confirm:true, previewId:preview.previewId, rows:preview.rows.map((row) => ({ line:row.line, sku:row.sku, supplierQuantity:row.supplierQuantity, verifiedDate:row.verifiedDate })) }) });
      snapshot = result.snapshot; renderSnapshot(); renderReceipt(result.receipt || {}); $("stock-intake-status").textContent = "Receipt recorded.";
    } catch (error) {
      $("stock-intake-status").textContent = error.data?.code === "STALE_PREVIEW" ? "Preview became stale. Refresh and preview again." : error.message;
      if (error.data?.rows) renderPreview({ ...preview, canApply:false, rows:error.data.rows, summary:{...preview.summary, errors:error.data.rows.filter((r)=>r.errors?.length).length} });
    }
  }

  function clearIntake() {
    $("stock-file").value = ""; $("stock-paste").value = ""; preview = null; $("stock-preview-panel").hidden = true; $("stock-receipt-panel").hidden = true; $("stock-intake-status").textContent = "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("sok-stock-login-form").addEventListener("submit", login);
    $("stock-search").addEventListener("input", renderSnapshot);
    $("stock-filter").addEventListener("change", renderSnapshot);
    $("stock-refresh").addEventListener("click", load);
    $("stock-preview").addEventListener("click", runPreview);
    $("stock-clear").addEventListener("click", clearIntake);
    $("stock-confirm").addEventListener("change", () => { $("stock-apply").disabled = !preview?.canApply || !$("stock-confirm").checked; });
    $("stock-apply").addEventListener("click", apply);
    load();
  });
})();