import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const fail = (message) => { throw new Error(message); };

const packageJson = JSON.parse(read('apps/web-v2/package.json'));
if (packageJson.devDependencies?.wrangler !== '4.129.0') fail('Wrangler must be pinned exactly to 4.129.0.');

const wranglerText = read('apps/web-v2/wrangler.jsonc');
const wrangler = JSON.parse(wranglerText.replace(/^\s*\/\/.*$/gm, ''));
if (wrangler.name !== 'elevation-web-v2') fail('Unexpected Worker name.');
if (wrangler.main !== 'src/index.js') fail('Unexpected Web V2 entrypoint.');
if (wrangler.preview_urls !== true) fail('Preview URLs may remain enabled for diagnostics.');
if (wrangler.workers_dev !== true) fail('workers.dev must remain available during isolated migration.');
if (wrangler.version_metadata?.binding !== 'CF_VERSION_METADATA') fail('Version metadata binding is required for exact smoke proof.');

const forbiddenWranglerKeys = [
  'routes', 'route', 'custom_domains', 'd1_databases', 'kv_namespaces',
  'r2_buckets', 'vars', 'services', 'durable_objects', 'queues', 'workflows'
];
for (const key of forbiddenWranglerKeys) {
  if (Object.prototype.hasOwnProperty.call(wrangler, key)) fail(`Route/data binding must be introduced through an explicit later gate, not the release foundation: ${key}`);
}

const release = read('.github/workflows/web-v2-release.yml');
for (const required of [
  'versions upload',
  'versions deploy',
  'production-smoke',
  'bootstrap-smoke',
  'rollback',
  'Cloudflare-Workers-Version-Overrides',
  'expected_sha',
  'version_id',
  'baseline_version_id',
  'CLOUDFLARE_API_TOKEN',
  'CLOUDFLARE_ACCOUNT_ID'
]) {
  if (!release.includes(required)) fail(`Release workflow missing required production-parity contract: ${required}`);
}
for (const forbidden of ['pages deploy', 'production-deploy', 'wrangler deploy ']) {
  if (release.includes(forbidden)) fail(`Release workflow contains forbidden legacy/deploy path: ${forbidden}`);
}

const index = read('apps/web-v2/src/index.js');
if (!index.includes("url.pathname === '/__version'")) fail('Runtime version proof endpoint is required.');
if (!index.includes('CF_VERSION_METADATA')) fail('Runtime must consume Cloudflare version metadata.');

const schema = JSON.parse(read('deployment/v2/release-receipt.schema.json'));
for (const field of ['git_sha', 'cloudflare_version_id', 'production_parity_smoke', 'production_deployment_id', 'production_version_id']) {
  if (!schema.required?.includes(field)) fail(`Receipt schema missing required field: ${field}`);
}

if (process.argv.includes('--release')) {
  if (!fs.existsSync(path.join(root, 'apps/web-v2/package-lock.json'))) fail('Release requires committed package-lock.json.');
  if (!fs.existsSync(path.join(root, 'apps/web-v2/src/index.js'))) fail('Release requires the Web V2 source entrypoint.');
}

console.log('WEB_V2_PRODUCTION_PARITY_RELEASE_FOUNDATION_PASS');
