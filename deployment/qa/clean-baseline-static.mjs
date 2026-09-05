import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();

function run(label, command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status ?? "unknown"}`);
  }
}

function walk(directory) {
  const output = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...walk(full));
    else output.push(full);
  }
  return output;
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function text(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function allTextFiles(directory, extensions) {
  const full = path.join(root, directory);
  if (!fs.existsSync(full)) return [];
  return walk(full).filter((file) => extensions.has(path.extname(file).toLowerCase()));
}

const requiredChecks = [
  ["Phase 2A Admin parity", "deployment/qa/phase2a-admin-static.mjs"],
  ["Worker import surface", "deployment/qa/worker-import-surface-static.mjs"],
  ["SOK commercialization", "deployment/qa/sok-commercialization-static.mjs"],
  ["SOK full line", "deployment/qa/sok-full-line-static.mjs"],
  ["Website integrity", "deployment/qa/website-integrity-static.mjs"],
];

for (const [label, script] of requiredChecks) {
  assert.ok(fs.existsSync(path.join(root, script)), `${script} is required`);
  run(label, process.execPath, [script]);
}

const syntaxRoots = ["site", "src", "tests", "deployment/qa"];
const syntaxFiles = syntaxRoots.flatMap((directory) =>
  allTextFiles(directory, new Set([".js", ".mjs"])),
);
for (const file of syntaxFiles) {
  run(`syntax ${relative(file)}`, process.execPath, ["--check", file]);
}

run(
  "Worker entry import",
  process.execPath,
  [
    "--input-type=module",
    "-e",
    "import('./site/worker-core.js').then((m)=>{if(!m.default||typeof m.default.fetch!=='function')process.exit(1)})",
  ],
);

assert.equal(
  fs.existsSync(path.join(root, "site/admin-command-center-pass1.css")),
  false,
  "retired Admin Pass 1 stylesheet must stay retired",
);

for (const file of allTextFiles("site", new Set([".html", ".js", ".json"]))) {
  const source = fs.readFileSync(file, "utf8");
  assert.equal(
    source.includes("admin-command-center-pass1.css"),
    false,
    `${relative(file)} still references retired Admin Pass 1 CSS`,
  );
}

const adminCss = text("site/admin-command-center.css");
assert.ok(
  adminCss.includes("accepted Pass 1 cascade folded into canonical file"),
  "canonical Admin CSS must retain the accepted Pass 1 cascade",
);

const frontWorker = text("site/_worker.js");
assert.ok(
  frontWorker.includes('url.pathname.startsWith("/worker/")'),
  "front Worker must protect decomposed runtime modules",
);
const routes = text("site/_routes.json");
assert.ok(routes.includes('"/worker/*"'), "_routes.json must intercept /worker/*");

const customerRuntimeFiles = allTextFiles("site", new Set([".html", ".js"]));
const bad719 = /(?:tel|sms):\+?1?719/i;
for (const file of customerRuntimeFiles) {
  const source = fs.readFileSync(file, "utf8");
  assert.equal(bad719.test(source), false, `${relative(file)} contains an active Elevation 719 call/SMS route`);
}

const home = text("site/index.html");
assert.ok(home.includes("Start a Project"), "homepage primary Start a Project path must remain present");
assert.ok(home.includes("+1-208-813-4998"), "homepage must retain the 208 contact number");
assert.equal(text("site/sitemap.xml").includes("/project-guides"), false, "/project-guides must not be reintroduced");

const siteText = customerRuntimeFiles
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
assert.ok(siteText.includes("Authorized SOK Energy Dealer"), "approved SOK dealer wording must remain present");

const protectedSources = [
  "site/store-checkout-server.js",
  "site/promotion-runtime.js",
  "site/shipping-rules-runtime.js",
  "site/hawaii-lithium-runtime.js",
  "site/sok-operations-runtime.js",
  "site/sok-availability-runtime.js",
];
for (const file of protectedSources) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} must remain present`);
}

for (const file of walk(path.join(root, "site"))) {
  if (!fs.statSync(file).isFile()) continue;
  assert.ok(fs.statSync(file).size <= 25 * 1024 * 1024, `${relative(file)} exceeds 25 MB`);
}

const blockedSecret = /(cfat_[A-Za-z0-9_-]+|github_pat_[A-Za-z0-9_]+|ghp_[A-Za-z0-9]+|sk_live_[A-Za-z0-9]+|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/;
for (const directory of ["site", "src"]) {
  for (const file of allTextFiles(directory, new Set([".html", ".js", ".mjs", ".json", ".css", ".md", ".txt"]))) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal(blockedSecret.test(source), false, `${relative(file)} contains a credential-like value`);
  }
}

assert.ok(fs.existsSync(path.join(root, "deployment/qa/WORKER_ROUTE_OWNERSHIP.md")), "Worker route ownership receipt is required");
assert.ok(fs.existsSync(path.join(root, "deployment/qa/CLOUDFLARE_BINDING_NAME_INVENTORY.md")), "binding-name inventory is required");
assert.ok(fs.existsSync(path.join(root, "deployment/qa/LEGACY_COMPATIBILITY_AUDIT.md")), "legacy compatibility audit is required");

console.log(`clean-baseline-static.mjs: PASS (${syntaxFiles.length} JavaScript files syntax-checked)`);
