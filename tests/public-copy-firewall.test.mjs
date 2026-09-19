import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");

function publicHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...publicHtmlFiles(full));
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    if (/^admin[-_.]/i.test(entry.name) || full.includes(`${path.sep}admin${path.sep}`)) continue;
    out.push(full);
  }
  return out;
}

const rendererFiles = [
  "site/universal-store.js",
  "site/home-commerce.js",
  "site/site-shell.js",
  "site/product.js",
  "site/store.js",
].map((file) => path.join(repoRoot, file)).filter(fs.existsSync);

const files = [...publicHtmlFiles(siteRoot), ...rendererFiles];

const prohibited = [
  /\brevenue[- ]first\b/i,
  /\bworktree\b/i,
  /\bsource[- ]of[- ]truth\b/i,
  /\bretail state\b/i,
  /\bauthoritative controls?\b/i,
  /\btrust[- ]review\b/i,
  /\blisting(?:s)? withheld\b/i,
  /\bcontrolled review path\b/i,
  /\bdirect checkout state\b/i,
  /\bsupplier[- ]backed catalog facts\b/i,
  /\bpayment controls remain authoritative\b/i,
  /\bsource state\b/i,
  /\bactivation state\b/i,
  /\breconciliation state\b/i,
  /\bproduction lineage\b/i,
];

test("customer-facing site copy does not expose internal OS/developer language", () => {
  const violations = [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const pattern of prohibited) {
      if (pattern.test(content)) violations.push(`${path.relative(repoRoot, file)}: ${pattern}`);
    }
  }
  assert.deepEqual(violations, [], `Internal implementation language leaked into public copy:\n${violations.join("\n")}`);
});
