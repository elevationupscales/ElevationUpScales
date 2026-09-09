import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const MAX_TRACKED_FILE_BYTES = 25 * 1024 * 1024;

const FORBIDDEN_PATH_RULES = [
  { label: "environment file", test: (value) => /(^|\/)\.env(?:\.|$)/i.test(value) },
  { label: "Cloudflare local secret file", test: (value) => /(^|\/)\.dev\.vars(?:\.|$)/i.test(value) },
  { label: "private key file", test: (value) => /\.(?:pem|key|p12|pfx)$/i.test(value) },
  { label: "credential JSON file", test: (value) => /(^|\/)(?:credentials?|client_secret|oauth[_-]?credentials?)[^/]*\.json$/i.test(value) },
  { label: "ZIP archive", test: (value) => /\.zip$/i.test(value) },
];

const SECRET_RULES = [
  { label: "Cloudflare API token", pattern: /cfat_[A-Za-z0-9_-]{20,}/ },
  { label: "GitHub fine-grained token", pattern: /github_pat_[A-Za-z0-9_]{20,}/ },
  { label: "GitHub personal access token", pattern: /ghp_[A-Za-z0-9]{20,}/ },
  { label: "Stripe live secret key", pattern: /sk_live_[A-Za-z0-9]{16,}/ },
  { label: "private key material", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { label: "Google OAuth client secret", pattern: /GOCSPX-[A-Za-z0-9_-]{16,}/ },
  { label: "Google OAuth refresh token", pattern: /1\/\/[A-Za-z0-9._-]{20,}/ },
  { label: "literal GOOGLE_CLIENT_SECRET assignment", pattern: /GOOGLE_CLIENT_SECRET\s*[:=]\s*["'](?!\$|\{|<|REDACTED|PLACEHOLDER|example)[^"'\r\n]{16,}["']/i },
  { label: "literal GOOGLE_REFRESH_TOKEN assignment", pattern: /GOOGLE_REFRESH_TOKEN\s*[:=]\s*["'](?!\$|\{|<|REDACTED|PLACEHOLDER|example)[^"'\r\n]{20,}["']/i },
];

export function normalizeTrackedPath(value) {
  return String(value ?? "").replaceAll("\\", "/").replace(/^\.\//, "");
}

export function forbiddenTrackedPath(value) {
  const normalized = normalizeTrackedPath(value);
  const rule = FORBIDDEN_PATH_RULES.find((candidate) => candidate.test(normalized));
  return rule ? { blocked: true, label: rule.label } : { blocked: false, label: "" };
}

export function scanText(value) {
  const text = String(value ?? "");
  const hits = [];
  for (const rule of SECRET_RULES) {
    if (rule.pattern.test(text)) hits.push(rule.label);
  }
  return hits;
}

export function scanTrackedRepository(root = process.cwd()) {
  const listed = execFileSync("git", ["ls-files", "-z"], { cwd: root });
  const files = listed.toString("utf8").split("\0").filter(Boolean);
  const findings = [];

  for (const relative of files) {
    const normalized = normalizeTrackedPath(relative);
    const pathCheck = forbiddenTrackedPath(normalized);
    if (pathCheck.blocked) {
      findings.push({ path: normalized, rule: pathCheck.label });
      continue;
    }

    const absolute = path.join(root, relative);
    let stat;
    try {
      stat = fs.statSync(absolute);
    } catch (_) {
      continue;
    }
    if (!stat.isFile()) continue;
    if (stat.size > MAX_TRACKED_FILE_BYTES) {
      findings.push({ path: normalized, rule: "tracked file exceeds 25 MiB" });
      continue;
    }

    const bytes = fs.readFileSync(absolute);
    if (bytes.includes(0)) continue;
    const textHits = scanText(bytes.toString("utf8"));
    for (const rule of textHits) findings.push({ path: normalized, rule });
  }

  return { filesScanned: files.length, findings };
}

function main() {
  const result = scanTrackedRepository(process.cwd());
  if (result.findings.length) {
    console.error(`repository-secret-scan: BLOCKED (${result.findings.length} finding(s))`);
    for (const finding of result.findings) console.error(`  ${finding.path}: ${finding.rule}`);
    process.exit(1);
  }
  console.log(`repository-secret-scan: PASS (${result.filesScanned} tracked files checked)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
