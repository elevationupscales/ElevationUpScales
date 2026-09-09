const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { CONTEXT, validate, requirePreview } = require('../deployment/release/worker-release.cjs');
const sha = 'a'.repeat(40);
const input = { sha, main:sha, head:sha, ref:'refs/heads/main', target:'preview', confirmation:'' };
const repo = { owner:'example', repo:'site' };
const url = 'https://github.com/example/site/actions/runs/123';
function github(statuses, overrides = {}) {
  return {
    paginate: { async *iterator() { yield { data:statuses }; } },
    rest: {
      repos: { listCommitStatusesForRef() {} },
      actions: { async getWorkflowRun() { return { data:{
        path:'.github/workflows/worker-release-deploy.yml', event:'workflow_dispatch',
        head_sha:sha, head_branch:'main', status:'completed', conclusion:'success', ...overrides
      } }; } }
    }
  };
}
const pass = { context:CONTEXT, state:'success', target_url:url };
test('rejects malformed, stale, mismatched and non-main inputs', () => {
  for (const change of [{sha:'main'}, {main:'b'.repeat(40)}, {head:'b'.repeat(40)}, {ref:'refs/heads/feature'}, {target:'other'}]) {
    assert.throws(() => validate({...input,...change}));
  }
  assert.doesNotThrow(() => validate(input));
});
test('production requires exact confirmation', () => {
  for (const confirmation of ['', 'deploy', 'DEPLOY ']) assert.throws(() => validate({...input,target:'production',confirmation}));
  assert.doesNotThrow(() => validate({...input,target:'production',confirmation:'DEPLOY'}));
});
test('missing or newest non-green preview is rejected', async () => {
  for (const statuses of [[], [{...pass,state:'pending'},pass], [{...pass,state:'failure'},pass]]) {
    await assert.rejects(requirePreview(github(statuses),repo,sha,'https://github.com'));
  }
});
test('only a completed successful same-SHA worker run proves preview', async () => {
  for (const bad of [{head_sha:'b'.repeat(40)}, {path:'other.yml'}, {event:'push'}, {head_branch:'other'}, {status:'in_progress'}, {conclusion:'failure'}]) {
    await assert.rejects(requirePreview(github([pass],bad),repo,sha,'https://github.com'));
  }
  await assert.rejects(requirePreview(github([{...pass,target_url:'https://example.invalid/123'}]),repo,sha,'https://github.com'));
  assert.equal(await requirePreview(github([pass]),repo,sha,'https://github.com'),url);
});
test('workflow enforces QA, exact URL smoke, canonical smoke and pinned deployment', () => {
  const workflow = fs.readFileSync('.github/workflows/worker-release-deploy.yml','utf8');
  for (const required of ['npm run qa\n','npm run qa:secrets','-size +25M','-le 20000',
    'npm run qa:preview -- "$DEPLOYMENT_URL"','npm run qa:preview -- https://elevationupscales.com',
    'ref: ${{ inputs.expected_sha }}','--commit-hash=${{ inputs.expected_sha }}',
    'requirePreview(github','group: elevation-pages-production','state: \'pending\'',
    "process.env.RESULT === 'success' ? 'success' : 'failure'"]) assert.ok(workflow.includes(required), required);
  assert.ok(workflow.indexOf('Recheck main immediately before deploy') < workflow.indexOf('id: deploy'));
  assert.ok(workflow.indexOf('Smoke exact deployment URL') < workflow.indexOf('Record preview result'));
});
