(() => {
  "use strict";
  if (window.EUSCommerceLogisticsLoaded) return;
  window.EUSCommerceLogisticsLoaded = true;
  const $ = (id) => document.getElementById(id);
  const state = { snapshot: null, preview: null, payload: null };
  const clean = (value) => String(value ?? "").trim();
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
  const money = (cents) => cents === null || cents === undefined ? "—" : new Intl.NumberFormat("en-US", { style:"currency", currency:"USD" }).format(Number(cents || 0) / 100);
  const date = (value) => value ? new Date(value).toLocaleString() : "—";
  const platform = () => state.snapshot?.platforms?.find((item) => item.id === $("commerce-platform")?.value) || null;

  async function api(options = {}) {
    const response = await fetch("/api/admin/commerce-intake", {
      credentials: "same-origin",
      cache: "no-store",
      headers: { Accept: "application/json", ...(options.body ? { "Content-Type":"application/json" } : {}) },
      ...options,
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body.error || `Commerce intake failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return body;
  }

  function roleClass(item) {
    return item.id === "doba" ? "is-primary" : `is-${item.role}`;
  }

  function renderPlatforms() {
    const rows = state.snapshot?.platforms || [];
    $("commerce-platform-grid").innerHTML = rows.map((item) => `
      <article class="commerce-platform-card ${roleClass(item)}">
        <div class="commerce-platform-card__top"><h3>${esc(item.name)}</h3>${item.id === "doba" ? '<span class="eus-pill is-good">PRIMARY</span>' : ""}</div>
        <span class="commerce-role">${esc(item.roleLabel)}</span>
        <p>${esc(item.priority)}</p>
        <small>${esc(item.operatingMode)}</small>
        <div class="commerce-platform-actions">
          ${item.csvManagedElsewhere ? `<a class="eus-admin-button" href="${esc(item.csvRoute)}">Open CSV Sync</a>` : `<button class="eus-admin-button" type="button" data-commerce-platform="${esc(item.id)}" data-commerce-mode="csv">CSV Intake</button>`}
          <button class="eus-admin-button" type="button" data-commerce-platform="${esc(item.id)}" data-commerce-mode="url">URL Intake</button>
        </div>
      </article>`).join("");
  }

  function renderSelect() {
    const select = $("commerce-platform");
    const current = select.value;
    select.innerHTML = (state.snapshot?.platforms || []).map((item) => `<option value="${esc(item.id)}">${esc(item.name)} — ${esc(item.roleLabel)}</option>`).join("");
    if ([...select.options].some((option) => option.value === current)) select.value = current;
  }

  function inputHelp() {
    const item = platform();
    if (!item) return;
    const mode = $("commerce-input-mode").value;
    document.querySelectorAll(".commerce-file-field").forEach((field) => { field.hidden = mode !== "csv"; });
    document.querySelectorAll(".commerce-url-field").forEach((field) => { field.hidden = mode !== "url"; });
    $("commerce-doba-route").hidden = !(item.id === "doba" && mode === "csv");
    $("commerce-intake-help").innerHTML = `<strong>${esc(item.name)} · ${esc(item.roleLabel)}</strong><br>${esc(item.operatingMode)}. Download the Elevation intake template or use common export headers; the preview maps recognized columns into one normalized review record.`;
    $("commerce-stage").disabled = true;
    state.preview = null;
    state.payload = null;
  }

  function renderCandidates() {
    const rows = state.snapshot?.candidates || [];
    $("commerce-candidates").innerHTML = rows.length ? rows.map((row) => {
      const item = state.snapshot.platforms.find((candidate) => candidate.id === row.platform);
      return `<tr>
        <td><strong>${esc(item?.name || row.platform)}</strong></td>
        <td><strong>${esc(row.title)}</strong><br><code>${esc(row.sku || row.externalId)}</code></td>
        <td>${esc(row.metadata?.roleLabel || item?.roleLabel || "Review")}</td>
        <td>${esc(row.metadata?.inputMode || "—")}</td>
        <td><span class="eus-pill is-warn">${esc(row.classification)}</span><br><small>${esc(row.blocker)}</small></td>
        <td>${esc(date(row.updatedAt))}</td>
        <td>${row.productUrl ? `<a class="eus-admin-button commerce-link" href="${esc(row.productUrl)}" target="_blank" rel="noopener">Source</a>` : "—"}</td>
      </tr>`;
    }).join("") : '<tr><td colspan="7">No CSV or URL intake has been staged yet.</td></tr>';
  }

  function metric(label, value, note = "") {
    return `<article class="eus-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong>${note ? `<small>${esc(note)}</small>` : ""}</article>`;
  }

  function renderPreview(preview) {
    state.preview = preview;
    $("commerce-preview-panel").hidden = false;
    $("commerce-preview-title").textContent = `${preview.platform?.name || "Commerce"} ${preview.inputMode || ""} intake`;
    $("commerce-preview-message").textContent = preview.message || "Preview ready.";
    $("commerce-preview-metrics").innerHTML = [
      metric("Rows", preview.rows?.length || 0),
      metric("Valid", preview.validCount || 0),
      metric("Needs Review", preview.reviewCount || 0),
      metric("Errors", preview.errorCount || 0),
    ].join("");
    $("commerce-preview-table").innerHTML = preview.rows?.length ? preview.rows.map((row) => `<tr>
      <td>${row.rowIndex}</td>
      <td><strong>${esc(row.title)}</strong><br><code>${esc(row.sku || "—")}</code></td>
      <td>${esc(row.externalId || "—")}</td>
      <td class="commerce-money">Price ${money(row.priceCents)}<br><small>Cost ${money(row.costCents)}</small></td>
      <td>${row.quantity ?? "—"}</td>
      <td>${esc(row.fulfillmentProvider || "—")}<br><small>${esc(row.salesChannel || row.destinationSupport || "")}</small></td>
      <td>${row.warnings?.length ? `<ul class="commerce-warning-list">${row.warnings.map((warning) => `<li>${esc(warning)}</li>`).join("")}</ul>` : '<span class="eus-pill is-warn">MAPPING REVIEW</span>'}</td>
    </tr>`).join("") : `<tr><td colspan="7">${preview.redirect ? `Use the dedicated workflow: <a href="${esc(preview.redirect)}">Open Doba CSV Sync</a>` : "No rows available."}</td></tr>`;
    $("commerce-stage").disabled = !preview.validCount || Boolean(preview.redirect);
  }

  async function load() {
    try {
      state.snapshot = await api();
      $("commerce-logistics-auth").hidden = true;
      $("commerce-logistics-dashboard").hidden = false;
      renderSelect();
      renderPlatforms();
      renderCandidates();
      inputHelp();
      $("commerce-logistics-status").textContent = `${state.snapshot.platforms.length} platform lanes loaded · ${state.snapshot.candidates.length} staged review record${state.snapshot.candidates.length === 1 ? "" : "s"}.`;
    } catch (error) {
      if (error.status === 401) {
        $("commerce-logistics-auth").hidden = false;
        $("commerce-logistics-dashboard").hidden = true;
        return;
      }
      $("commerce-logistics-status").textContent = error.message || "Commerce logistics could not load.";
    }
  }

  async function buildPayload(action) {
    const item = platform();
    const inputMode = $("commerce-input-mode").value;
    const payload = { action, platform: item?.id, inputMode };
    if (inputMode === "csv") {
      const file = $("commerce-csv-file").files?.[0];
      if (!file) throw new Error("Choose a CSV file first");
      if (!/\.csv$/i.test(file.name)) throw new Error("Choose a .csv file");
      payload.fileName = file.name;
      payload.csvText = await file.text();
    } else {
      payload.productUrl = $("commerce-product-url").value;
      payload.sku = $("commerce-url-sku").value;
      payload.externalId = $("commerce-url-sku").value;
      payload.title = $("commerce-url-title").value;
    }
    return payload;
  }

  async function preview() {
    $("commerce-logistics-status").textContent = "Building intake preview…";
    $("commerce-preview").disabled = true;
    try {
      state.payload = await buildPayload("preview");
      const result = await api({ method:"POST", body:JSON.stringify(state.payload) });
      renderPreview(result);
      $("commerce-logistics-status").textContent = result.message;
      $("commerce-preview-panel").scrollIntoView({ behavior:"smooth", block:"start" });
    } catch (error) {
      $("commerce-logistics-status").textContent = error.message || "Preview failed.";
    } finally {
      $("commerce-preview").disabled = false;
    }
  }

  async function stage() {
    if (!state.payload || !state.preview?.validCount) return;
    if (!confirm("Stage these records for mapping and review? This will not publish products, change supplier truth, change inventory, or activate a platform sync.")) return;
    $("commerce-stage").disabled = true;
    $("commerce-logistics-status").textContent = "Staging review records…";
    try {
      const result = await api({ method:"POST", body:JSON.stringify({ ...state.payload, action:"apply" }) });
      state.snapshot = result.snapshot || await api();
      renderCandidates();
      $("commerce-logistics-status").textContent = `${result.staged || 0} review record${result.staged === 1 ? "" : "s"} staged. No product was published or synchronized.`;
      state.preview = null;
      state.payload = null;
    } catch (error) {
      $("commerce-logistics-status").textContent = error.message || "Intake could not be staged.";
      $("commerce-stage").disabled = false;
    }
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  }

  function downloadTemplate() {
    const item = platform();
    if (!item) return;
    const headers = item.templateHeaders || [];
    const sample = [
      `${item.id}-external-id`, `${item.id}-sku`, `${item.name} product title`, `https://example.com/product`, "", "", "", "draft", "", item.role.includes("provider") ? item.name : "", item.role === "sales_channel" ? item.name : "", "Lower 48 / review", "Review before catalog mapping",
    ];
    const content = `${headers.map(csvCell).join(",")}\n${sample.map(csvCell).join(",")}\n`;
    const blob = new Blob([content], { type:"text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `elevation-${item.id}-intake-template.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1_000);
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-commerce-platform]");
    if (!button) return;
    $("commerce-platform").value = button.dataset.commercePlatform;
    $("commerce-input-mode").value = button.dataset.commerceMode;
    inputHelp();
    $("commerce-intake").scrollIntoView({ behavior:"smooth", block:"start" });
  });
  $("commerce-platform")?.addEventListener("change", inputHelp);
  $("commerce-input-mode")?.addEventListener("change", inputHelp);
  $("commerce-preview")?.addEventListener("click", preview);
  $("commerce-stage")?.addEventListener("click", stage);
  $("commerce-download-template")?.addEventListener("click", downloadTemplate);
  $("commerce-logistics-refresh")?.addEventListener("click", load);
  load();
})();
