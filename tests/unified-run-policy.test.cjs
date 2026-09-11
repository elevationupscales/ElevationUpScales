const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const policy = require('../deployment/run/unified-run-policy.cjs');

const GOOD = {
  workRef: 'work/renogy-catalog',
  partnerProject: 'Renogy',
  taskedRole: 'Catalog Manager',
  taskScope: 'Normalize verified Renogy catalog source data',
  controlFile: 'operations/RENOGY_VENDOR_MASTER_SOP.md',
  runProfile: 'auto',
  runConfirmation: 'RUN',
};

test('accepts a public-safe partner branch RUN request', () => {
  const result = policy.validateInputs(GOOD);
  assert.equal(result.workRef, GOOD.workRef);
  assert.equal(result.partnerProject, GOOD.partnerProject);
});

test('rejects direct-main, traversal, and non-RUN execution', () => {
  assert.throws(() => policy.validateInputs({ ...GOOD, workRef: 'main' }), /never directly on main/);
  assert.throws(() => policy.validateInputs({ ...GOOD, controlFile: 'operations/../private.md' }), /may not escape|must be a Markdown/);
  assert.throws(() => policy.validateInputs({ ...GOOD, runConfirmation: 'YES' }), /exactly RUN/);
});

test('rejects multiline receipt labels', () => {
  assert.throws(() => policy.validateInputs({ ...GOOD, taskScope: 'safe\nsecond line' }), /one public-safe line/);
});

test('auto profile keeps operations/docs light and sends runtime changes to development QA', () => {
  assert.equal(policy.resolveProfile('auto', ['operations/CURRENT_WORK_BOARD.md']), 'operations');
  assert.equal(policy.resolveProfile('auto', ['docs/example.md', 'README.md']), 'operations');
  assert.equal(policy.resolveProfile('auto', ['site/store.js']), 'development');
  assert.equal(policy.resolveProfile('auto', ['.github/workflows/example.yml']), 'development');
  assert.equal(policy.resolveProfile('release_candidate', ['operations/example.md']), 'release_candidate');
});

test('unified RUN workflow preserves the non-deployment boundary and required controls', () => {
  const workflow = fs.readFileSync(path.join(__dirname, '../.github/workflows/unified-run-command.yml'), 'utf8');
  for (const required of [
    'RUN — Unified Partner / Manager Worktree',
    'work_ref:',
    'partner_project:',
    'tasked_role:',
    'task_scope:',
    'control_file:',
    'run_profile:',
    'run_confirmation:',
    'operations/CURRENT_WORK_BOARD.md',
    'operations/OWNER_RUN_COMMAND_EXECUTION_PROTOCOL_2026-09-10.md',
    'git merge-base --is-ancestor origin/main HEAD',
    'git diff --check origin/main...HEAD',
    'npm run qa:secrets',
    'npm run qa',
    'elevation/unified-run',
  ]) assert.ok(workflow.includes(required), `missing workflow control: ${required}`);

  assert.ok(!workflow.includes('wrangler-action'), 'Unified RUN must not deploy through Wrangler');
  assert.ok(!workflow.includes('pages deploy'), 'Unified RUN must not deploy Pages');
  assert.ok(!workflow.includes('production_confirmation'), 'Unified RUN must not become a production release workflow');
});
