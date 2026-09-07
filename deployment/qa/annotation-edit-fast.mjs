import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "site");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function relative(file) {
  return path.relative(repoRoot, file).replaceAll(path.sep, "/");
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? match[1] : "";
}

function localAssetPath(htmlFile, rawReference) {
  const clean = String(rawReference || "").split(/[?#]/, 1)[0];
  if (!clean || /^(?:[a-z]+:|\/\/|#|data:)/i.test(clean)) return null;
  if (clean.startsWith("/")) return path.join(siteRoot, clean.slice(1));
  return path.resolve(path.dirname(htmlFile), clean);
}

if (!fs.existsSync(siteRoot)) {
  console.error("annotation-fast: site/ directory is missing");
  process.exit(1);
}

const files = walk(siteRoot);
const jsFiles = files.filter((file) => file.endsWith(".js"));
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const errors = [];
const warnings = [];
const mutationHotspots = [];

for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    errors.push(`${relative(file)}: JavaScript syntax check failed\n${(result.stderr || result.stdout || "").trim()}`);
  }

  const source = fs.readFileSync(file, "utf8");
  const mutationCount = [
    /\.innerHTML\s*=/g,
    /\.outerHTML\s*=/g,
    /\.textContent\s*=/g,
    /insertAdjacent(?:HTML|Element)\s*\(/g,
    /replaceChildren\s*\(/g,
  ].reduce((count, pattern) => count + (source.match(pattern)?.length || 0), 0);
  if (mutationCount) mutationHotspots.push([relative(file), mutationCount]);
}

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  const ids = new Map();
  for (const match of source.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)) {
    ids.set(match[1], (ids.get(match[1]) || 0) + 1);
  }
  for (const [id, count] of ids) {
    if (count > 1) warnings.push(`${relative(file)}: duplicate id=\"${id}\" appears ${count} times`);
  }

  const h1Count = source.match(/<h1\b/gi)?.length || 0;
  if (h1Count > 1) warnings.push(`${relative(file)}: contains ${h1Count} <h1> elements; verify heading ownership before editing`);

  const references = [];
  for (const match of source.matchAll(/<script\b[^>]*>/gi)) {
    const src = attr(match[0], "src");
    if (!src) continue;
    references.push(["script", src]);
    const isLocal = !/^(?:[a-z]+:|\/\/)/i.test(src);
    const isDeferred = /\b(?:defer|async)\b/i.test(match[0]) || /\btype\s*=\s*["']module["']/i.test(match[0]);
    if (isLocal && !isDeferred) warnings.push(`${relative(file)}: local script ${src} is parser-blocking`);
  }
  for (const match of source.matchAll(/<link\b[^>]*>/gi)) {
    if (!/\brel\s*=\s*["'][^"']*stylesheet/i.test(match[0])) continue;
    const href = attr(match[0], "href");
    if (href) references.push(["stylesheet", href]);
  }

  const seen = new Set();
  for (const [kind, ref] of references) {
    const key = `${kind}:${ref}`;
    if (seen.has(key)) warnings.push(`${relative(file)}: duplicate ${kind} reference ${ref}`);
    seen.add(key);

    const resolved = localAssetPath(file, ref);
    if (resolved && !fs.existsSync(resolved)) {
      errors.push(`${relative(file)}: missing local ${kind} file ${ref}`);
    }
  }
}

mutationHotspots.sort((a, b) => b[1] - a[1]);

console.log(`annotation-fast: checked ${jsFiles.length} JavaScript files and ${htmlFiles.length} HTML files`);
if (mutationHotspots.length) {
  console.log("annotation-fast: highest runtime DOM-mutation ownership (check these before annotation edits):");
  for (const [file, count] of mutationHotspots.slice(0, 12)) console.log(`  ${String(count).padStart(3)}  ${file}`);
}
if (warnings.length) {
  console.log(`annotation-fast: ${warnings.length} warning(s)`);
  for (const warning of warnings.slice(0, 40)) console.log(`  WARN ${warning}`);
  if (warnings.length > 40) console.log(`  ... ${warnings.length - 40} more warning(s)`);
}
if (errors.length) {
  console.error(`annotation-fast: ${errors.length} error(s)`);
  for (const error of errors) console.error(`  ERROR ${error}`);
  process.exit(1);
}

console.log("annotation-fast: PASS");
