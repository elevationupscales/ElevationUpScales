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
if (wrangler.preview_urls !== true) fail('Version preview URLs must be explicitly enabled.');
if (wrangler.workers_dev !== true) fail('workers.dev must remain enabled during isolated V2 migration.');

const forbiddenWranglerKeys = [
  'routes', 'route', 'custom_domains', 'd1_databases', 'kv_namespaces',
  'r2_buckets', 'vars', 'services', 'durable_objects', 'queues', 'workflows'
];
for (const key of forbiddenWranglerKeys) {
  if (Object.prototype.hasOwnProperty.call(wrangler, key)) fail(`Forbidden Step 3 Wrangler key: ${key}`);
}

const release = read('.github/workflows/web-v2-release.yml');
for (const required of ['versions upload', 'versions deploy', 'expected_sha', 'version_id', 'CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID']) {
  if (!release.includes(required)) fail(`Release workflow missing required contract: ${required}`);
}
for (const forbidden of ['pages deploy', 'production-deploy', 'wrangler deploy ']) {
  if (release.includes(forbidden)) fail(`Release workflow contains forbidden legacy/deploy path: ${forbidden}`);
}

const schema = JSON.parse(read('deployment/v2/release-receipt.schema.json'));
for (const field of ['git_sha', 'cloudflare_version_id', 'production_deployment_id', 'production_version_id']) {
  if (!schema.required?.includes(field)) fail(`Receipt schema missing required field: ${field}`);
}

if (process.argv.includes('--release')) {
  if (!fs.existsSync(path.join(root, 'apps/web-v2/package-lock.json'))) fail('Release requires committed package-lock.json.');
  if (!fs.existsSync(path.join(root, 'apps/web-v2/src/index.js'))) fail('Release requires the Step 4 Web V2 source entrypoint.');
}

console.log('WEB_V2_RELEASE_FOUNDATION_PASS');
