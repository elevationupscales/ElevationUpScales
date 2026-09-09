(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  async function api(path = "/api/admin/email-operations", options = {}) {
    const headers = { Accept: "application/json", ...(options.headers || {}) };
    if (options.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
    const response = await fetch(path, { credentials: "same-origin", cache: "no-store", ...options, headers });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body.error || `Request failed (${response.status})`);
      error.status = response.status;
      error.delivery = body.delivery || null;
      throw error;
    }
    return body;
  }

  function pill(value) {
    const text = String(value || "unknown");
    const cls = /configured|automatic|sent/i.test(text) ? "is-good" : /failed|not_configured/i.test(text) ? "is-alert" : "is-warn";
    return `<span class="eus-pill ${cls}">${esc(text.replaceAll("_", " "))}</span>`;
  }

  function render(data) {
    const roles = data.roles || {};
    $("email-metrics").innerHTML = [
      ["Provider", data.provider === "configured" ? "Configured" : "Not Configured"],
      ["Actual sender", data.from || "Not configured"],
      ["Role lanes", Object.keys(roles).length],
      ["Automatic workflows", (data.workflows || []).filter((row) => row.mode.includes("automatic")).length],
    ].map(([label, value]) => `<article class="eus-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong></article>`).join("");

    const use = {
      owner: "Strategic / Work With Us",
      sales: "Leads / Solar",
      orders: "Orders / payment review",
      logistics: "Shipping / fulfillment",
      support: "General support",
    };
    $("email-role-table").innerHTML = Object.entries(roles).map(([role, address]) => `<tr><td><strong>${esc(role.replaceAll("_", " "))}</strong></td><td><code>${esc(address)}</code></td><td>${esc(use[role] || "Role routing")}</td></tr>`).join("");

    $("email-workflow-table").innerHTML = (data.workflows || []).map((row) => `<tr><td><strong>${esc(row.label)}</strong></td><td>${pill(row.mode)}</td><td>${esc(row.role)}</td><td>${esc(row.trigger)}</td></tr>`).join("");

    const future = data.futureCapabilities || {};
    $("email-future").innerHTML = `<strong>Gmail expansion boundary:</strong> Draft creation, inbox categorization, and CRM thread sync remain disabled until the production Google OAuth project has the required Gmail read/draft scopes. Current sending workflows do not pretend those permissions exist.`;
    $("email-status").textContent = `Email provider: ${data.provider}. Actual sender: ${data.from || "not configured"}. Role routing is active for customer replies.`;
  }

  async function load() {
    try {
      const data = await api();
      $("email-auth").hidden = true;
      $("email-dashboard").hidden = false;
      render(data);
    } catch (error) {
      if (error.status === 401) {
        $("email-auth").hidden = false;
        $("email-dashboard").hidden = true;
        return;
      }
      $("email-dashboard").hidden = false;
      $("email-status").textContent = error.message || "Email Operations unavailable.";
    }
  }

  async function send(payload, successMessage) {
    $("email-status").textContent = "Sending email…";
    try {
      const result = await api("/api/admin/email-operations/send", { method: "POST", body: JSON.stringify(payload) });
      const messageId = result.delivery?.messageId ? ` Message ID: ${result.delivery.messageId}` : "";
      $("email-status").textContent = `${successMessage}${messageId}`;
      return result;
    } catch (error) {
      $("email-status").textContent = error.message || "Email send failed.";
      throw error;
    }
  }

  $("email-customer-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await send({
        action: "customer_message",
        role: $("email-role").value,
        recipientEmail: $("email-recipient").value.trim(),
        recipientName: $("email-recipient-name").value.trim(),
        reference: $("email-reference").value.trim(),
        subject: $("email-subject").value.trim(),
        message: $("email-message").value.trim(),
      }, "Customer email sent.");
    } catch (_) {}
  });

  $("email-order-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await send({
        action: "order_message",
        reference: $("email-order-reference").value.trim(),
        template: $("email-order-template").value,
      }, "Order email sent.");
    } catch (_) {}
  });

  $("email-alert-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await send({
        action: "internal_alert",
        role: $("email-alert-role").value,
        reference: $("email-alert-reference").value.trim(),
        subject: $("email-alert-subject").value.trim(),
        message: $("email-alert-message").value.trim(),
      }, "Internal role alert sent.");
    } catch (_) {}
  });

  $("email-refresh")?.addEventListener("click", load);
  load();
})();
