from pathlib import Path

p = Path("site/store-checkout-server.js")
text = p.read_text(encoding="utf-8")

create_old = '''  const { response, body } = await paypalRequest(env, "/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  if (!response.ok || !body?.id) return json({ error: "PayPal could not create the order" }, 502);'''
create_new = '''  let response, body;
  try {
    ({ response, body } = await paypalRequest(env, "/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify(requestBody),
    }));
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_create_error", message: clean(error?.message, 240) }));
    return json({ error: "PayPal checkout is temporarily unavailable" }, 502);
  }
  if (!response.ok || !body?.id) return json({ error: "PayPal could not create the order" }, 502);'''
if text.count(create_old) != 1:
    raise SystemExit(f"create PayPal anchor count={text.count(create_old)}")
text = text.replace(create_old, create_new, 1)

capture_old = '''  const { response, body } = await paypalRequest(env, `/v2/checkout/orders/${encodeURIComponent(id)}/capture`, {
    method: "POST",
    body: "{}",
  });

  if (!response.ok) {'''
capture_new = '''  let response, body;
  try {
    ({ response, body } = await paypalRequest(env, `/v2/checkout/orders/${encodeURIComponent(id)}/capture`, {
      method: "POST",
      body: "{}",
    }));
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_capture_error", message: clean(error?.message, 240) }));
    return json({ error: "PayPal could not capture the payment" }, 502);
  }

  if (!response.ok) {'''
if text.count(capture_old) != 1:
    raise SystemExit(f"capture PayPal anchor count={text.count(capture_old)}")
text = text.replace(capture_old, capture_new, 1)

p.write_text(text, encoding="utf-8")
