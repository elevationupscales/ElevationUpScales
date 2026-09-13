import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertFullSha,
  assertDeploymentRecord,
  assertVersionRecord,
  draftReceipt,
  parseUploadOutput,
  releaseTag
} from './release-policy.mjs';

const SHA = '0123456789abcdef0123456789abcdef01234567';
const VERSION = '12345678-1234-4abc-8def-1234567890ab';
const URL = 'https://12345678-elevation-web-v2.elevationupscales.workers.dev/';

test('requires a full immutable Git SHA', () => {
  assert.equal(assertFullSha(SHA), SHA);
  assert.throws(() => assertFullSha('main'));
});

test('derives a stable SHA tag', () => {
  assert.equal(releaseTag(SHA), 'git-0123456789ab');
});

test('parses immutable Worker version identity from Wrangler upload output', () => {
  assert.deepEqual(
    parseUploadOutput(`Version ID: ${VERSION}\nPreview URL: ${URL}`, SHA),
    { versionId: VERSION, previewUrl: URL }
  );
});

test('binds Cloudflare version evidence back to the exact Git SHA', () => {
  assert.doesNotThrow(() => assertVersionRecord({ id: VERSION, message: `git_sha=${SHA}` }, SHA, VERSION));
  assert.throws(() => assertVersionRecord({ id: VERSION, message: 'other' }, SHA, VERSION));
});

test('requires the promoted Version ID at 100 percent', () => {
  assert.doesNotThrow(() => assertDeploymentRecord({ versions: [{ id: VERSION, percentage: 100 }] }, VERSION));
  assert.throws(() => assertDeploymentRecord({ versions: [{ id: 'other', percentage: 100 }] }, VERSION));
});

test('draft receipt records candidate but not production state', () => {
  const receipt = draftReceipt({ sha: SHA, versionId: VERSION, previewUrl: URL });
  assert.equal(receipt.git_sha, SHA);
  assert.equal(receipt.cloudflare_version_id, VERSION);
  assert.equal(receipt.production_version_id, null);
  assert.equal(receipt.opera_acceptance, 'PENDING');
});
