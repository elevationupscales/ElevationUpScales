from pathlib import Path
import sys
repo=Path(sys.argv[1]).resolve()
p=repo/"site/lithium-shop.js"
text=p.read_text()
old='''  async function loadCatalog() {
    const response = await fetch("/api/store/catalog?section=lithium-batteries", { headers: { Accept: "application/json" }, cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !Array.isArray(data.products)) throw new Error("Catalog unavailable");
    state.products = publicProducts(data.products);
    return data.products;
  }'''
new='''  async function loadCatalog() {
    const response = await fetch("/api/store/catalog?section=lithium-batteries", { headers: { Accept: "application/json" }, cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !Array.isArray(data.products)) throw new Error("Catalog unavailable");
    let products = data.products;
    if (hawaiiMode) {
      const eligibilityResponse = await fetch("/api/hawaii-lithium/eligible-products", { headers: { Accept: "application/json" }, cache: "no-store" });
      const eligibility = await eligibilityResponse.json().catch(() => ({}));
      const allowedIds = new Set(Array.isArray(eligibility.items) ? eligibility.items.map((item) => String(item.catalogProductId || "").trim()).filter(Boolean) : []);
      const allowedSkus = new Set(Array.isArray(eligibility.items) ? eligibility.items.map((item) => String(item.sku || "").trim().toUpperCase()).filter(Boolean) : []);
      products = eligibilityResponse.ok ? products.filter((product) => allowedIds.has(String(product.id || "").trim()) || allowedSkus.has(String(product.sku || "").trim().toUpperCase())) : [];
    }
    state.products = publicProducts(products);
    return products;
  }'''
if old not in text: raise SystemExit("lithium-shop loadCatalog anchor missing")
p.write_text(text.replace(old,new,1))

# Customer-safe status wording: Hawaii is a freight-intake state, not a blanket delivery promise.
p=repo/"site/hawaii-lithium-batteries.html"
h=p.read_text().replace('<strong>Shipping Available</strong><p>Buy Now is available for the exact battery under the current Hawaii route.</p>','<strong>Available for Hawaii Freight Review</strong><p>The exact battery can enter the current Hawaii freight-intake path. Final freight and payment state remain server-confirmed.</p>')
p.write_text(h)
print("Hawaii eligible-list client routing applied")
