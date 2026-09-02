(() => {
  "use strict";
  const form = document.querySelector("[data-hawaii-request-form]");
  if (!form) return;
  const status = document.querySelector("[data-hawaii-request-status]");
  const submit = form.querySelector("button[type='submit']");
  const params = new URLSearchParams(location.search);
  const requestedProduct = String(params.get("product") || "").trim();
  const requestedQty = Math.max(1, Math.min(100, Number.parseInt(params.get("qty") || "1", 10) || 1));
  if (requestedProduct) form.querySelector("[name='productInterest']").value = requestedProduct;
  if (requestedQty) form.querySelector("[name='quantity']").value = String(requestedQty);
  const message = (text, state="") => { if (!status) return; status.textContent = text || ""; status.dataset.state = state; };
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.consent = form.querySelector("[name='consent']")?.checked === true;
    data.quantity = Number(data.quantity || 1);
    submit.disabled = true; message("Saving your Hawaii freight request…");
    try {
      const response = await fetch("/api/hawaii-lithium/requests", { method:"POST", credentials:"same-origin", headers:{"Content-Type":"application/json","Accept":"application/json"}, body:JSON.stringify(data) });
      const body = await response.json().catch(()=>({}));
      if (!response.ok) throw new Error(body.error || "Request could not be saved.");
      form.reset(); message(`Request received. Reference ${body.requestId}. No payment was collected. Elevation will review the exact battery, consolidation, documentation, packaging and freight path before shipment is confirmed.`,"success");
    } catch (error) { message(error.message || "Request could not be saved.","error"); }
    finally { submit.disabled = false; }
  });
})();
