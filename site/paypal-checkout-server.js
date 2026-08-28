const PAYPAL_SANDBOX_ORIGIN = "https://api-m.sandbox.paypal.com";
const PAYPAL_LIVE_ORIGIN = "https://api-m.paypal.com";
const DEFAULT_CURRENCY = "USD";
const MIN_AMOUNT_CENTS = 100;
const MAX_AMOUNT_CENTS = 1_000_000;
const JSON_HEADERS = Object.freeze({
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
});

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

function clean(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function sameOriginRequest(request) {
  const origin = clean(request.headers.get("Origin"), 500);
  if (!origin) return true;
  try { return origin === new URL(request.url).origin; }
  catch (_) { return false; }
}

function paypalMode(env) {
  return clean(env?.PAYPAL_ENV, 20).toLowerCase() === "live" ? "live" : "sandbox";
}

function paypalOrigin(env) {
  return paypalMode(env) === "live" ? PAYPAL_LIVE_ORIGIN : PAYPAL_SANDBOX_ORIGIN;
}

function configured(env) {
  return Boolean(clean(env?.PAYPAL_CLIENT_ID, 300) && clean(env?.PAYPAL_CLIENT_SECRET, 300));
}

function parseUsdAmount(value) {
  const text = clean(value, 40).replace(/[$,\s]/g, "");
  if (!/^\d+(?:\.\d{1,2})?$/.test(text)) return null;
  const [whole, fraction = ""] = text.split(".");
  const cents = Number(whole) * 100 + Number((fraction + "00").slice(0, 2));
  if (!Number.isSafeInteger(cents) || cents < MIN_AMOUNT_CENTS || cents > MAX_AMOUNT_CENTS) return null;
  return { cents, value: `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}` };
}

function validOrderId(value) {
  const id = clean(value, 80);
  return /^[A-Z0-9]{8,40}$/i.test(id) ? id : "";
}

async function paypalAccessToken(env) {
  if (!configured(env)) throw new Error("PayPal credentials are not configured");
  const clientId = clean(env.PAYPAL_CLIENT_ID, 300);
  const clientSecret = clean(env.PAYPAL_CLIENT_SECRET, 300);
  const basic = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch(`${paypalOrigin(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "Accept-Language": "en_US",
    },
    body: "grant_type=client_credentials",
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body?.access_token) {
    console.error(JSON.stringify({ event: "paypal_token_error", status: response.status, mode: paypalMode(env) }));
    throw new Error("Unable to authorize PayPal checkout");
  }
  return clean(body.access_token, 4000);
}

async function paypalRequest(env, path, options = {}) {
  const token = await paypalAccessToken(env);
  const response = await fetch(`${paypalOrigin(env)}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "PayPal-Request-Id": crypto.randomUUID(),
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

function publicConfig(env) {
  const clientId = clean(env?.PAYPAL_CLIENT_ID, 300);
  return {
    ok: true,
    configured: configured(env),
    environment: paypalMode(env),
    clientId: configured(env) ? clientId : "",
    currency: DEFAULT_CURRENCY,
    minAmount: "1.00",
    maxAmount: "10000.00",
  };
}

async function createOrder(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return json({ error: "Cross-origin request denied" }, 403);
  if (!configured(env)) return json({ error: "PayPal checkout is not configured" }, 503);

  const raw = await request.json().catch(() => ({}));
  const amount = parseUsdAmount(raw?.amount);
  if (!amount) return json({ error: "Enter an amount from $1.00 to $10,000.00" }, 400);

  const description = clean(raw?.description || "Elevation UpScales payment", 127) || "Elevation UpScales payment";
  const customerReference = clean(raw?.reference, 100);
  const requestBody = {
    intent: "CAPTURE",
    purchase_units: [{
      amount: { currency_code: DEFAULT_CURRENCY, value: amount.value },
      description,
      ...(customerReference ? { custom_id: customerReference } : {}),
    }],
    payment_source: {
      paypal: {
        experience_context: {
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
          brand_name: "Elevation UpScales, Inc.",
        },
      },
    },
  };

  try {
    const { response, body } = await paypalRequest(env, "/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    if (!response.ok || !body?.id) {
      console.error(JSON.stringify({ event: "paypal_create_order_error", status: response.status, mode: paypalMode(env), debugId: clean(response.headers.get("paypal-debug-id"), 120) }));
      return json({ error: "PayPal could not create the order" }, 502);
    }
    return json({
      ok: true,
      id: clean(body.id, 80),
      status: clean(body.status, 40),
      amount: amount.value,
      currency: DEFAULT_CURRENCY,
    });
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_create_order_exception", message: clean(error?.message, 240) }));
    return json({ error: "PayPal checkout is temporarily unavailable" }, 502);
  }
}

async function captureOrder(request, env, orderId) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return json({ error: "Cross-origin request denied" }, 403);
  if (!configured(env)) return json({ error: "PayPal checkout is not configured" }, 503);

  const id = validOrderId(orderId);
  if (!id) return json({ error: "Invalid PayPal order ID" }, 400);

  try {
    const { response, body } = await paypalRequest(env, `/v2/checkout/orders/${encodeURIComponent(id)}/capture`, {
      method: "POST",
      body: "{}",
    });
    if (!response.ok) {
      const issue = clean(body?.details?.[0]?.issue, 100);
      console.error(JSON.stringify({ event: "paypal_capture_order_error", status: response.status, issue, mode: paypalMode(env), debugId: clean(response.headers.get("paypal-debug-id"), 120) }));
      return json({ error: issue === "INSTRUMENT_DECLINED" ? "INSTRUMENT_DECLINED" : "PayPal could not capture the payment" }, response.status === 422 ? 422 : 502);
    }

    const capture = body?.purchase_units?.[0]?.payments?.captures?.[0] || {};
    return json({
      ok: true,
      id: clean(body?.id || id, 80),
      status: clean(body?.status, 40),
      captureId: clean(capture?.id, 80),
      captureStatus: clean(capture?.status, 40),
      amount: clean(capture?.amount?.value, 40),
      currency: clean(capture?.amount?.currency_code, 10) || DEFAULT_CURRENCY,
    });
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_capture_order_exception", message: clean(error?.message, 240) }));
    return json({ error: "PayPal checkout is temporarily unavailable" }, 502);
  }
}

export async function handlePayPalCheckoutApi(request, env, pathname) {
  const path = clean(pathname, 240);
  if (path === "/api/paypal/config") {
    if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
    const response = json(publicConfig(env));
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }
  if (path === "/api/paypal/orders") return createOrder(request, env);
  const capture = path.match(/^\/api\/paypal\/orders\/([A-Z0-9]{8,40})\/capture$/i);
  if (capture) return captureOrder(request, env, capture[1]);
  return json({ error: "PayPal endpoint not found" }, 404);
}
