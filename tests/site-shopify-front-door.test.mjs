import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { redirectLegacyStoreLanding } from "../site/legacy-storefront-redirect.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DESTINATION = "https://shop.elevationupscales.com/";

// Owner-approved November Storm Preparation add-on is the ONLY exception to the
// originally frozen homepage HTML. Verify the rest reconstructs byte-for-byte
// from the accepted baseline and all shared visual files remain unchanged.
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

const BLOB_SHA = (content) => createHash("sha1")
  .update("blob " + content.length + "\0")
  .update(content)
  .digest("hex");

const HOMEPAGE_ADDITION = {
  stylesheet: '<link rel="stylesheet" href="/storm-preparation.css?v=1">\n',
  navigation: '<a class="eus-nav-link" href="#storm-preparation">Storm Prep</a>\n',
  start: '<!-- Elevation November Storm Preparation: begin -->\n',
  end: '<!-- Elevation November Storm Preparation: end -->\n\n',
};

test("November Storm Preparation is the only change to the frozen homepage", () => {
  const path = "site/index.html";
  const html = readFileSync(resolve(ROOT, path), "utf8");
  for (const [label, marker] of Object.entries(HOMEPAGE_ADDITION)) {
    assert.equal(html.split(marker).length, 2, label + " marker must occur exactly once");
  }
  const start = html.indexOf(HOMEPAGE_ADDITION.start);
  const end = html.indexOf(HOMEPAGE_ADDITION.end, start);
  assert.ok(end > start, "storm section boundaries missing");
  const inserted = html.slice(start, end + HOMEPAGE_ADDITION.end.length);
  assert.match(inserted, /<section[^>]+id="storm-preparation"/);
  const restored = html
    .replace(HOMEPAGE_ADDITION.stylesheet, "")
    .replace(HOMEPAGE_ADDITION.navigation, "")
    .replace(inserted, "");
  assert.equal(
    BLOB_SHA(Buffer.from(restored, "utf8")),
    FROZEN_VISUAL_BLOBS[path],
    "existing homepage markup changed beyond the isolated November storefront"
  );
  for (const [asset, sha] of Object.entries(FROZEN_VISUAL_BLOBS)) {
    if (asset === path) continue;
    assert.equal(BLOB_SHA(readFileSync(resolve(ROOT, asset))), sha,
      asset + " changed despite the owner visual freeze");
  }
});

test("storm-preparation shopping goes only to Shopify; Hawaii guidance stays on site", () => {
  const html = readFileSync(resolve(ROOT, "site/index.html"), "utf8");
  const section = html.split(HOMEPAGE_ADDITION.start)[1].split(HOMEPAGE_ADDITION.end)[0];
  const urls = [...section.matchAll(/href="([^"]+)"/g)].map(x => x[1]);
  assert.equal(urls.length, 6, "expected three specialties and three guidance links");
  for (const collection of [
    "diesel-heaters-accessories",
    "hurricane-starlink-backup-power",
    "olight",
  ]) {
    assert.ok(urls.includes(`https://shop.elevationupscales.com/collections/${collection}`),
      "missing verified Shopify specialty collection: " + collection);
  }
  for (const guide of ["build-my-emergency-solar-kit", "build-a-heater-kit"]) {
    assert.ok(urls.includes(`https://shop.elevationupscales.com/pages/${guide}`),
      "missing verified Shopify guidance page: " + guide);
  }
  assert.ok(urls.includes("/hawaii-lithium-batteries"), "Hawaii guidance missing");
  assert.ok(urls.every(x => x.startsWith("https://shop.elevationupscales.com/") ||
    x === "/hawaii-lithium-batteries"), "no independent checkout or custom lead routes");
  assert.doesNotMatch(section, /purchase now|guaranteed runtime|guaranteed shipping/i);
  assert.ok(readFileSync(resolve(ROOT, "site/storm-preparation.css"), "utf8")
    .includes("#storm-preparation"), "missing section-scoped responsive CSS");
});

test("store landing redirect is integrated into the Cloudflare Worker before legacy fallback", () => {
  const content = readFileSync(resolve(ROOT, "site/_worker.js"), "utf8");
  const entry = content.indexOf("const legacyLanding = redirectLegacyStoreLanding(request);");
  const fallback = content.indexOf("coreWorker.fetch(request,env,ctx)");
  assert.ok(entry > -1, "missing explicit Worker redirect");
  assert.ok(fallback > entry, "legacy backend is reached before redirect check");
});
