from pathlib import Path

js=Path('site/store-checkout.js')
s=js.read_text(encoding='utf-8')
old='''    try {\n      if (source === "lithium" && destinationHint === "HI") document.querySelector("#checkout-state").value = "HI";\n      await requestQuote();'''
new='''    try {\n      if (source === "lithium" && destinationHint === "HI") {\n        document.querySelector("#checkout-state").value = "HI";\n        if (hawaiiPanel) hawaiiPanel.hidden = false;\n        if (hawaiiStateEl) hawaiiStateEl.textContent = "Checking Hawaii Shipping";\n        if (hawaiiMath) hawaiiMath.textContent = "Checking this exact battery's current Hawaii freight eligibility…";\n        if (hawaiiReserve) hawaiiReserve.hidden = true;\n        if (contactShippingLabel) { contactShippingLabel.hidden = false; contactShippingLabel.textContent = "Contact & pickup"; }\n        if (shippingFields) shippingFields.hidden = false;\n        addressFields.forEach((field) => { field.hidden = true; });\n        paypalEl.hidden = true;\n      }\n      await requestQuote();'''
if old not in s: raise RuntimeError('checkout init marker missing')
s=s.replace(old,new,1)
js.write_text(s,encoding='utf-8')

html=Path('site/checkout/index.html')
h=html.read_text(encoding='utf-8')
h=h.replace('/store-checkout.js?v=4.5.1','/store-checkout.js?v=4.5.2')
html.write_text(h,encoding='utf-8')
print('Hawaii checkout now exposes the pickup context immediately while authoritative eligibility loads')
