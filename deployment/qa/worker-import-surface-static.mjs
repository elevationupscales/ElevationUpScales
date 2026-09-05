import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const workerCorePath = path.join(root, "site", "worker-core.js");
const domainsDir = path.join(root, "site", "worker", "domains");

const workerCore = fs.readFileSync(workerCorePath, "utf8");
const domainFiles = fs
  .readdirSync(domainsDir)
  .filter((name) => name.endsWith(".js"))
  .sort();

const runtimeFiles = [
  ["site/worker-core.js", workerCore],
  ...domainFiles.map((name) => [
    `site/worker/domains/${name}`,
    fs.readFileSync(path.join(domainsDir, name), "utf8"),
  ]),
];

for (const [name, source] of runtimeFiles) {
  assert.equal(
    source.includes("import * as core"),
    false,
    `${name} must use explicit named core dependencies`,
  );
  assert.equal(
    source.includes("} = core;"),
    false,
    `${name} must not carry the legacy whole-context destructure`,
  );
}

assert.equal(
  /(?:async\s+)?function\s+handle[A-Z]/.test(workerCore),
  false,
  "worker-core.js must remain a router, not a business-handler owner",
);
assert.equal(workerCore.includes("getCatalog"), false, "catalog compatibility belongs to compatibility domain");
assert.equal(workerCore.includes("API_SECURITY_HEADERS"), false, "router must not own API response construction");
assert.equal(workerCore.includes("STORE_BUILD"), false, "router must not own store compatibility response metadata");
assert.ok(
  workerCore.includes("handleStoreProductsCompatibility"),
  "router must delegate /api/store-products compatibility handling",
);

const compatibility = fs.readFileSync(
  path.join(domainsDir, "compatibility.js"),
  "utf8",
);
assert.ok(
  compatibility.includes("async function handleStoreProductsCompatibility"),
  "compatibility domain must own /api/store-products",
);
assert.ok(
  compatibility.includes("handleRetiredLegacyMarketplaceImport"),
  "compatibility domain must retain retired marketplace import behavior",
);

const namedImportCounts = [];
for (const [name, source] of runtimeFiles) {
  const match = source.match(/import\s*\{([\s\S]*?)\}\s*from\s*["'](?:\.\.\/)?(?:\.\/worker\/)?core-context\.js["'];/);
  if (!match) continue;
  const names = match[1]
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  namedImportCounts.push([name, names.length]);
  assert.ok(names.length < 120, `${name} still carries an implausibly broad core dependency surface (${names.length})`);
}

const workerCount = namedImportCounts.find(([name]) => name === "site/worker-core.js")?.[1] ?? 0;
assert.ok(workerCount <= 40, `worker-core.js should depend only on route constants (${workerCount} core imports found)`);

console.log("worker-import-surface-static.mjs: PASS");
for (const [name, count] of namedImportCounts) {
  console.log(`  ${name}: ${count} named core dependencies`);
}
