(() => {
  "use strict";
  if (window.EUSDobaCsvSyncLoaded) return;
  window.EUSDobaCsvSyncLoaded = true;
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const money = (cents) => cents === null || cents === undefined ? "—" : new Intl.NumberFormat("en-US", {style:"currency",currency:"USD"}).format(Number(cents || 0) / 100);
  const clean = (value) => String(value ?? "").trim();
  let state = { summary: null, preview: null, fileText: "", fileName: "" };
  async function api(options = {}) {
    const response = await fetch("/api/admin/doba-csv-sync", {credentials:"same-origin",cache:"no-store",headers:{Accept:"application/json",...(options.body?{"Content-Type":"application/json"}:{})},...options});
    const body = await response.json().catch(() => ({}));
    if (!response.ok) { const error = new Error(body.error || `Doba CSV Sync failed (${response.status})`); error.status = response.status; throw error; }
    return body;
  }
  const badge = (value) => { const label = clean(value) || "UNKNOWN"; const cls = /APPLIED|FRESH|EXACT MATCH|UPDATE/i.test(label) ? "is-good" : /ERROR|ZERO STOCK|HOLD|SKU CHANGED/i.test(label) ? "is-alert" : /REVIEW|LOW STOCK|PREVIEW|STALE|UPLOAD NEEDED/i.test(label) ? "is-warn" : ""; return `<span class="eus-pill ${cls}">${esc(label)}</span>`; };
  function statusLabel(summary) {
    const runs = summary?.runs || [], latest = runs[0], successful = summary?.latestSuccessfulImport;
    if (latest && /ERROR/.test(latest.status)) return "Error";
    if (latest && latest.status === "PREVIEW") return "Import Review";
    if (!successful) return "Upload Needed";
    if ((summary?.source?.stale || 0) > 0) return "Stale";
    return "Fresh";
  }
  function age(value) { if (!value) return "never"; const ms = Date.now() - new Date(value).getTime(); if (!Number.isFinite(ms) || ms < 0) return "—"; const min = Math.floor(ms / 60000); if (min < 60) return `${min}m ago`; const hr = Math.floor(min / 60); if (hr < 48) return `${hr}h ago`; return `${Math.floor(hr/24)}d ago`; }
  function renderSummary() {
    const s = state.summary || {}, latest = s.latestSuccessfulImport, runs = s.runs || [];
    const status = statusLabel(s);
    $("doba-sync-state").innerHTML = badge(status);
    $("doba-last-upload").textContent = runs[0]?.previewedAt ? new Date(runs[0].previewedAt).toLocaleString() : "No upload yet";
    $("doba-last-import").textContent = latest?.appliedAt ? `${new Date(latest.appliedAt).toLocaleString()} · ${age(latest.appliedAt)}` : "No successful import yet";
    $("doba-source-count").textContent = String(s.source?.total ?? 0);
    $("doba-source-stale").textContent = String(s.source?.stale ?? 0);
    const select = $("doba-profile"); const current = select.value;
    select.innerHTML = (s.profiles || []).map(p => `<option value="${esc(p.id)}" data-markup="${esc(p.markup_percent)}" data-scope="${esc(p.default_scope)}">${esc(p.name)}</option>`).join("");
    if ([...select.options].some(o => o.value === current)) select.value = current;
    const chosen = select.selectedOptions[0]; if (chosen && !$("doba-markup").dataset.touched) $("doba-markup").value = chosen.dataset.markup || "25";
    renderRuns();
  }
  function renderRuns() {
    const rows = state.summary?.runs || [];
    $("doba-runs").innerHTML = rows.length ? rows.slice(0,10).map(r => `<tr><td><strong>${esc(r.fileName)}</strong><br><small>${esc((r.fileFingerprint || "").slice(0,12))}…</small></td><td>${badge(r.status)}</td><td>${esc(r.scope)}</td><td>${esc(r.profileName)}<br><small>${esc(r.markupPercent)}% markup</small></td><td>${r.rowCount}</td><td>${r.itemMatchCount}</td><td>${r.newCount}</td><td>${r.reviewCount}</td><td>${r.errorSummary ? esc(r.errorSummary) : "—"}</td><td>${r.id ? `<button type="button" class="eus-admin-button" data-doba-run="${esc(r.id)}">Open</button>` : "—"}</td></tr>`).join("") : '<tr><td colspan="10" class="eus-empty">No Doba CSV runs recorded yet.</td></tr>';
  }
  function metric(label, value, note = "") { return `<article class="eus-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong>${note?`<small>${esc(note)}</small>`:""}</article>`; }
  function renderPreview(detail) {
    state.preview = detail;
    const r = detail?.run || {}, rows = detail?.rows || [];
    $("doba-preview-panel").hidden = false;
    $("doba-preview-metrics").innerHTML = [
      metric("Source Rows", r.rowCount ?? "—"),
      metric("Existing Item Matches", r.itemMatchCount ?? "—"),
      metric("Exact SKU Updates", r.exactSkuCount ?? "—"),
      metric("New Candidates", r.newCount ?? "—"),
      metric("Review Items", r.reviewCount ?? "—"),
      metric("Holds / Unavailable", r.holdCount ?? "—"),
      metric("Zero Stock", r.zeroStockCount ?? "—"),
      metric("Low Stock", r.lowStockCount ?? "—"),
      metric("Cost Check", `${r.costReferencePassCount ?? 0}/${r.costReferenceCount ?? 0}`, "within 2¢ tolerance")
    ].join("");
    $("doba-preview-meta").textContent = `${r.fileName || "CSV"} · ${r.scope || "partial"} snapshot · ${r.profileName || "profile"} · fingerprint ${(r.fileFingerprint || "").slice(0,16)}…`;
    const baselinePass = r.rowCount === 32 && r.itemMatchCount === 10 && r.newCount === 22 && r.zeroStockCount === 3 && r.lowStockCount === 3 && r.costReferenceCount === 10 && r.costReferencePassCount === 10;
    $("doba-sample-baseline").hidden = !(r.rowCount === 32 || /25/i.test(r.fileName || ""));
    $("doba-sample-baseline").className = baselinePass ? "eus-callout" : "eus-error";
    $("doba-sample-baseline").innerHTML = baselinePass ? '<strong>32-row audit baseline: PASS.</strong> 10 existing Item No. matches, 22 new candidates, 3 zero-stock, 3 low-stock, and 10/10 cost derivations match stored cost.' : '<strong>32-row audit baseline differs.</strong> Do not Apply until the difference is investigated.';
    $("doba-apply").disabled = r.status !== "PREVIEW" || !rows.length;
    $("doba-apply").dataset.runId = r.id || "";
    $("doba-preview-table").innerHTML = rows.length ? rows.map(row => `<tr><td>${row.rowIndex}</td><td><strong>${esc(row.itemNo)}</strong><br><code>${esc(row.supplierSku)}</code></td><td>${esc(row.title)}</td><td>${row.inventoryQty ?? "—"}</td><td>${esc(row.shipTo || "—")}</td><td>${money(row.exportPriceCents)}<br><small>base ${money(row.derivedCostCents)}</small></td><td>${row.catalogSku ? `<code>${esc(row.catalogSku)}</code>` : "—"}</td><td>${badge(row.classification)}</td><td>${esc(row.blocker || (row.changes || []).join("; ") || "—")}</td></tr>`).join("") : '<tr><td colspan="9" class="eus-empty">No preview rows.</td></tr>';
  }
  async function load() {
    try { state.summary = await api(); renderSummary(); $("doba-sync-status").textContent = "Doba CSV Sync ready."; }
    catch (error) { if (error.status === 401) { $("doba-sync-status").textContent = "Admin login required for Doba CSV Sync."; return; } $("doba-sync-status").textContent = error.message; }
  }
  async function preview() {
    const file = $("doba-file").files?.[0]; if (!file) { $("doba-sync-status").textContent = "Choose a Doba CSV file first."; return; }
    if (!/\.csv$/i.test(file.name)) { $("doba-sync-status").textContent = "Doba CSV Sync accepts .csv files."; return; }
    const text = await file.text(); state.fileText = text; state.fileName = file.name;
    $("doba-sync-status").textContent = `Validating ${file.name} and building Preview Diff…`;
    $("doba-preview").disabled = true;
    try {
      const detail = await api({method:"POST",body:JSON.stringify({action:"preview",fileName:file.name,csvText:text,profileId:$("doba-profile").value,markupPercent:Number($("doba-markup").value),scope:$("doba-scope").value})});
      if (detail.alreadyApplied) { renderPreview(detail.run); $("doba-sync-status").textContent = "This exact file/profile/scope fingerprint was already applied. No duplicate mutation was performed."; }
      else { renderPreview(detail); $("doba-sync-status").textContent = "Preview Diff ready. No Catalog or Inventory product fields have been mutated yet."; }
      state.summary = await api(); renderSummary();
    } catch (error) { $("doba-sync-status").textContent = error.message || "Preview failed."; }
    finally { $("doba-preview").disabled = false; }
  }
  async function apply() {
    const runId = $("doba-apply").dataset.runId; if (!runId) return;
    const r = state.preview?.run || {};
    const warning = r.scope === "full" ? "FULL SNAPSHOT will mark missing existing Doba source records STALE for review. It will not delete them." : "PARTIAL SNAPSHOT updates only rows present in this file; missing Doba products remain untouched.";
    if (!confirm(`Apply this Doba CSV Sync now?\n\n${warning}\n\nNew items stay Draft/Review. SKU mismatches do not substitute. Existing HOLD items remain HOLD.`)) return;
    $("doba-apply").disabled = true; $("doba-sync-status").textContent = "Applying approved Doba CSV reconciliation…";
    try { const result = await api({method:"POST",body:JSON.stringify({action:"apply",runId})}); renderPreview(result); state.summary = await api(); renderSummary(); $("doba-sync-status").textContent = `Doba CSV Sync ${result.run?.status || "completed"}. Catalog/Inventory reconciliation receipt recorded.`; }
    catch (error) { $("doba-sync-status").textContent = error.message || "Apply failed."; $("doba-apply").disabled = false; }
  }
  async function openRun(runId) { try { const detail = await api({method:"GET"}); const selected = detail.runs?.find(r => r.id === runId); if (!selected) return; const response = await fetch(`/api/admin/doba-csv-sync?runId=${encodeURIComponent(runId)}`, {credentials:"same-origin",cache:"no-store",headers:{Accept:"application/json"}}); const body = await response.json(); if (!response.ok) throw new Error(body.error || "Could not load run"); renderPreview(body); $("doba-preview-panel").scrollIntoView({behavior:"smooth",block:"start"}); } catch (error) { $("doba-sync-status").textContent = error.message; } }
  $("doba-preview")?.addEventListener("click", preview);
  $("doba-apply")?.addEventListener("click", apply);
  $("doba-profile")?.addEventListener("change", () => { const option = $("doba-profile").selectedOptions[0]; if (option) { $("doba-markup").value = option.dataset.markup || "25"; $("doba-markup").dataset.touched = ""; if (option.dataset.scope) $("doba-scope").value = option.dataset.scope; } });
  $("doba-markup")?.addEventListener("input", () => { $("doba-markup").dataset.touched = "1"; });
  document.addEventListener("click", (event) => { const button = event.target.closest("[data-doba-run]"); if (button) openRun(button.dataset.dobaRun); });
  load();
})();
