const base = String(process.argv[2] || "").replace(/\/+$/, "");
if (!base) throw new Error("Preview base URL is required");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
  console.log(`PASS: ${message}`);
};
const jsonFetch = async (path, options = {}) => {
  const response = await fetch(`${base}${path}`, {
    redirect: "follow",
    ...options,
    headers: { Accept: "application/json", ...(options.headers || {}) },
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
};
const textFetch = async (path) => {
  const response = await fetch(`${base}${path}`, { redirect: "follow" });
  const text = await response.text();
  return { response, text };
};
const post = (path, body) => jsonFetch(path, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

for (const route of [
  "/sok-batteries",
  "/sok/sk12v100pc/",
  "/sok/sk48v100n/",
  "/sok/sk12v100h/",
  "/sok/sktc30-smart-battery-monitor/",
  "/checkout/",
]) {
  const { response } = await textFetch(route);
  assert(response.status === 200, `${route} returns 200`);
}

for (const asset of ["/sok-static-product.js", "/sok-batteries.js", "/sok-shopability.css"]) {
  const { response, text } = await textFetch(asset);
  assert(response.status === 200 && text.length > 500, `${asset} is deployed`);
}
const staticProduct = (await textFetch("/sok-static-product.js")).text;
const collectionJs = (await textFetch("/sok-batteries.js")).text;
assert(staticProduct.includes("sok-related-grid"), "product-page related shopping rail is deployed");
assert(staticProduct.includes("sok-category-links"), "product-page category navigation is deployed");
assert(collectionJs.includes("URLSearchParams(location.search)"), "collection deep-link filters are deployed");
assert(collectionJs.includes("sok-card__media-strip"), "collection approved-media strip is deployed");

const config = await jsonFetch("/api/store-checkout/config");
assert(config.response.status === 200 && config.body.ok === true, "checkout config API is healthy");
console.log("PAYPAL_PREVIEW_STATE=" + JSON.stringify({
  environment: config.body.environment || "",
  credentialsConfigured: Boolean(config.body.credentialsConfigured),
  configured: Boolean(config.body.configured),
  checkoutEnabled: Boolean(config.body.checkoutEnabled),
  liveCheckoutApproved: Boolean(config.body.liveCheckoutApproved),
  promotionActive: Boolean(config.body.promotion?.active),
  promotionCode: config.body.promotion?.couponCode || "",
  promotionPercent: Number(config.body.promotion?.couponPercent || 0),
}));
assert(config.body.environment === "sandbox", "candidate preview PayPal environment is sandbox");
assert(config.body.credentialsConfigured === true, "PayPal sandbox credentials are configured");
assert(config.body.configured === true && config.body.checkoutEnabled === true, "sandbox checkout is enabled");
assert(typeof config.body.clientId === "string" && config.body.clientId.length > 10, "PayPal client ID is available to checkout");
assert(config.body.promotion?.active === true, "Labor Day promotion is active in preview");
assert(config.body.promotion?.couponCode === "LABORDAY25", "Labor Day coupon code is LABORDAY25");
assert(config.body.promotion?.couponPercent === 25, "Labor Day coupon is 25 percent");

const sokCatalog = await jsonFetch("/api/sok/catalog");
assert(sokCatalog.response.status === 200 && Array.isArray(sokCatalog.body.products), "SOK public catalog API is healthy");
const bySku = Object.fromEntries(sokCatalog.body.products.map((p) => [p.sku, p]));
assert(bySku.SK12V100PC?.priceCents === 31900, "SK12V100PC MAP remains $319");
assert(bySku.SK48V100N?.priceCents === 119900, "SK48V100N MAP remains $1,199");
const publicRaw = JSON.stringify(sokCatalog.body).toLowerCase();
for (const token of ["suppliercost","supplierinventory","sourcewarehouse","dropshipcost","landedcost","margincents","primary_carrier","carrier_state","economics_state"]) {
  assert(!publicRaw.includes(token), `public SOK API does not expose ${token}`);
}

const coloradoShipping = {
  fullName: "Elevation QA",
  address1: "100 Test Ave",
  city: "Denver",
  state: "CO",
  postalCode: "80202",
  countryCode: "US",
};
const sk12Base = { source: "lithium", id: "sok-sk12v100pc", quantity: 1, shipping: coloradoShipping };
const sk12Quote = await post("/api/store-checkout/quote", sk12Base);
assert(sk12Quote.response.status === 200 && sk12Quote.body.ok === true, "SK12 Lower-48 quote resolves");
assert(sk12Quote.body.unitPriceCents === 31900, "SK12 checkout uses MAP price");
assert(sk12Quote.body.promotion?.couponEligible === false, "SOK MAP item is excluded from Labor Day coupon");
assert(Number(sk12Quote.body.shippingCents) === 2799, "Lower-48 battery shipping remains $27.99 per battery");

const sokCoupon = await post("/api/store-checkout/quote", { ...sk12Base, couponCode: "LABORDAY25" });
assert(sokCoupon.response.status === 409, "LABORDAY25 is rejected for MAP-protected SOK item");

const invalidQty = await post("/api/store-checkout/quote", { ...sk12Base, quantity: 11 });
assert(invalidQty.response.status === 400, "checkout rejects quantity above 10");

const hawaii4 = await post("/api/store-checkout/quote", {
  source: "lithium",
  id: "sok-sk12v100pc",
  quantity: 4,
  shipping: { ...coloradoShipping, state: "HI", city: "Honolulu", postalCode: "96813" },
});
assert(hawaii4.response.status === 409, "SOK Hawaii quantity 4+ is blocked from direct checkout");
assert(hawaii4.body.commercialQuoteRequired === true || /freight|commercial/i.test(String(hawaii4.body.error || "")), "Hawaii 4+ routes to freight/commercial review");

const checkoutClient = (await textFetch("/store-checkout.js")).text;
assert(checkoutClient.includes("/api/store-checkout/orders"), "checkout client is wired to PayPal order creation endpoint");
assert(checkoutClient.includes("/capture"), "checkout client is wired to PayPal capture endpoint");

console.log("Labor Day SOK shopability preview + PayPal configuration/quote gate PASS");
console.log("TRANSACTION GATE: sandbox buyer approval + successful capture must be completed separately before production promotion.");
