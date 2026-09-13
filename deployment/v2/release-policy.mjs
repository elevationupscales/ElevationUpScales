import fs from 'node:fs';

export const WORKER_NAME = 'elevation-web-v2';
export const WRANGLER_VERSION = '4.129.0';
export const FULL_SHA_RE = /^[a-f0-9]{40}$/;
export const UUID_RE = /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i;
export const PREVIEW_URL_RE = /https:\/\/[^\s\"'<>]+\.workers\.dev\/?/i;

export function assertFullSha(value) {
  if (!FULL_SHA_RE.test(String(value || ''))) {
    throw new Error('Expected an exact full 40-character lowercase Git SHA.');
  }
  return value;
}

export function releaseTag(sha) {
  assertFullSha(sha);
  return `git-${sha.slice(0, 12)}`;
}

export function parseUploadOutput(text, sha) {
  assertFullSha(sha);
  const body = String(text || '');
  const version = body.match(UUID_RE)?.[0];
  const previewUrl = body.match(PREVIEW_URL_RE)?.[0] || null;
  if (!version) throw new Error('Wrangler upload output did not expose a Cloudflare Version ID.');
  if (previewUrl && !previewUrl.includes(`-${WORKER_NAME}.`)) {
    throw new Error(`Preview URL is not for ${WORKER_NAME}.`);
  }
  return { versionId: version, previewUrl };
}

function deepContains(value, needle) {
  if (typeof value === 'string') return value.includes(needle);
  if (Array.isArray(value)) return value.some((item) => deepContains(item, needle));
  if (value && typeof value === 'object') return Object.values(value).some((item) => deepContains(item, needle));
  return false;
}

function objectVersionId(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  for (const key of ['id', 'version_id', 'versionId']) {
    if (typeof value[key] === 'string') return value[key];
  }
  return null;
}

function objectPercentage(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  for (const key of ['percentage', 'percent']) {
    if (typeof value[key] === 'number') return value[key];
    if (typeof value[key] === 'string' && value[key].trim() !== '') {
      const parsed = Number.parseFloat(value[key]);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

function containsVersionAtPercentage(value, versionId, percentage) {
  if (Array.isArray(value)) {
    return value.some((item) => containsVersionAtPercentage(item, versionId, percentage));
  }
  if (!value || typeof value !== 'object') return false;

  if (objectVersionId(value) === versionId && objectPercentage(value) === percentage) {
    return true;
  }

  return Object.values(value).some((item) => containsVersionAtPercentage(item, versionId, percentage));
}

export function assertVersionRecord(value, sha, versionId) {
  assertFullSha(sha);
  if (!deepContains(value, versionId)) throw new Error('Cloudflare version record does not contain the expected Version ID.');
  if (!deepContains(value, sha) && !deepContains(value, releaseTag(sha))) {
    throw new Error('Cloudflare version record is not linked to the expected Git SHA/tag.');
  }
}

export function assertDeploymentContainsVersion(value, versionId) {
  if (!deepContains(value, versionId)) throw new Error(`Deployment record does not contain Version ID ${versionId}.`);
}

export function assertDeploymentRecord(value, versionId) {
  assertDeploymentContainsVersion(value, versionId);
  if (!containsVersionAtPercentage(value, versionId, 100)) {
    throw new Error(`Deployment record does not show Version ID ${versionId} at 100% traffic.`);
  }
}

export function draftReceipt({ sha, versionId, previewUrl }) {
  assertFullSha(sha);
  return {
    component: 'web-v2',
    git_sha: sha,
    cloudflare_version_id: versionId,
    preview_diagnostic_url: previewUrl,
    qa_result: 'PASS',
    production_parity_smoke: 'PENDING',
    owner_approval: 'PENDING',
    production_deployment_id: null,
    production_version_id: null,
    live_smoke: 'PENDING',
    created_at: new Date().toISOString()
  };
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  try {
    if (command === 'validate-sha') {
      assertFullSha(arg('--sha'));
    } else if (command === 'parse-upload') {
      const sha = arg('--sha');
      const input = fs.readFileSync(arg('--input'), 'utf8');
      const parsed = parseUploadOutput(input, sha);
      fs.writeFileSync(arg('--receipt'), JSON.stringify(draftReceipt({ sha, ...parsed }), null, 2) + '\n');
      process.stdout.write(`version_id=${parsed.versionId}\npreview_url=${parsed.previewUrl || ''}\n`);
    } else if (command === 'assert-version') {
      const body = JSON.parse(fs.readFileSync(arg('--input'), 'utf8'));
      assertVersionRecord(body, arg('--sha'), arg('--version-id'));
    } else if (command === 'assert-deployment') {
      const body = JSON.parse(fs.readFileSync(arg('--input'), 'utf8'));
      assertDeploymentRecord(body, arg('--version-id'));
    } else if (command === 'assert-deployment-contains') {
      const body = JSON.parse(fs.readFileSync(arg('--input'), 'utf8'));
      assertDeploymentContainsVersion(body, arg('--version-id'));
    } else {
      throw new Error(`Unknown release-policy command: ${command || '(missing)'}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
