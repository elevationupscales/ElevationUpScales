import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { redirectLegacyStoreLanding } from "../site/legacy-storefront-redirect.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DESTINATION = "https://shop.elevationupscales.com/";

// Exact accepted homepage source blobs before the restructuring branch.
// During this migration, any visual home/shared-shell change requires a
// separately authorized PR, not an accidental change in a backend refactor.
const FROZEN_VISUAL_BLOBS = {
  "site/index.html": "4eb8113c9f6f5ca5713ce39ce20f57944076ce6c",
  "site/site-shell.js": "e82a08745022078d27c2b6579d1d12ddb8a24fe5",
  "site/retail-first.css": "2a1f5f4fa19bc6a03300656b7ffd6e2aef38f3e1",
  "site/clean-commerce-v1.css": "f6b15feee9d0b4cf152f8541c282bb39f67b98e9",
  "site/styles.css": "e2e9d5dd6ba1e7f673946ddd4d115cd935ad3547",
  "site/site-shell.css": "71c906de56a2f17419e3d3db4742e667ae67d862",
};

const request = (path, method = "GET", base = "https://elevationupscales.com") =>
  new Request(base + path, { method });

test("bare legacy store landing moves to Shopify with a reversible, uncached redirect", () => {
  for (const path of ["/store", "/store/", "/store.html"]) {
    const response = redirectLegacyStoreLanding(request(path));
    assert.equal(response?.status, 302, path);
    assert.equal(response.headers.get("Location"), DESTINATION, path);
    assert.equal(response.headers.get("Cache-Control"), "no-store", path);
  }
  assert.equal(
    redirectLegacyStoreLanding(request("/store", "HEAD"))?.status,
    302
  );
});

test("preview deployment resolves the same store redirect before production release", () => {
  const response = redirectLegacyStoreLanding(
    request("/store", "GET", "https://test-branch.elevationupscales.pages.dev")
  );
  assert.equal(response?.headers.get("Location"), DESTINATION);
});

test("retains department, campaign and deep-link legacy routes pending exact migration", () => {
  for (const path of [
    "/store?department=lithium-batteries",
    "/store?department=rv-outdoor",
    "/store?q=solar",
    "/store?utm_source=legacy",
    "/store.html?department=solar-charging",
  ]) {
    assert.equal(redirectLegacyStoreLanding(request(path)), null, path);
  }
});

test("never intercepts company homepage, Hawaii freight, checkout, admin, or APIs", () => {
  for (const path of [
    "/", "/index.html", "/what-we-do", "/hawaii-lithium-batteries",
    "/sok-order", "/sok-order.html", "/api/sok/reservations",
    "/api/store-products", "/checkout", "/checkout/", "/custom-order",
    "/admin", "/rv-store", "/product", "/storefront",
  ]) {
    assert.equal(redirectLegacyStoreLanding(request(path)), null, path);
  }
  for (const method of ["POST", "PUT", "DELETE"]) {
    assert.equal(redirectLegacyStoreLanding(request("/store", method)), null, method);
  }
});

test("homepage and shared visual assets match owner-frozen Git blobs byte for byte", () => {
  for (const [path, expected] of Object.entries(FROZEN_VISUAL_BLOBS)) {
    const content = readFileSync(resolve(ROOT, path));
    const actual = createHash("sha1")
      .update("blob " + content.length + "\0")
      .update(content)
      .digest("hex");
    assert.equal(actual, expected, path + " changed despite the owner visual freeze");
  }
});

test("store landing redirect is integrated into the Cloudflare Worker before legacy fallback", () => {
  const content = readFileSync(resolve(ROOT, "site/_worker.js"), "utf8");
  const entry = content.indexOf("const legacyLanding = redirectLegacyStoreLanding(request);");
  const fallback = content.indexOf("coreWorker.fetch(request,env,ctx)");
  assert.ok(entry > -1, "missing explicit Worker redirect");
  assert.ok(fallback > entry, "legacy backend is reached before redirect check");
});
