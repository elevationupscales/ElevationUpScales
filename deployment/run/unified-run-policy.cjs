const path = require('node:path');

const PROFILES = new Set(['auto', 'operations', 'development', 'release_candidate']);
const BRANCH_RE = /^[A-Za-z0-9][A-Za-z0-9._\/-]{0,199}$/;
const LABEL_RE = /^[A-Za-z0-9][A-Za-z0-9 ._/:()&+-]{0,119}$/;
const SCOPE_RE = /^[^\r\n]{1,240}$/;
const CONTROL_RE = /^operations\/[A-Za-z0-9][A-Za-z0-9._\/-]*\.md$/;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateBranch(ref) {
  assert(typeof ref === 'string' && BRANCH_RE.test(ref), 'work_ref must be a branch name using safe Git ref characters');
  assert(ref !== 'main' && ref !== 'refs/heads/main', 'Unified RUN operates on a work branch, never directly on main');
  assert(!ref.includes('..') && !ref.includes('//') && !ref.includes('@{') && !ref.endsWith('/'), 'work_ref contains a disallowed Git ref sequence');
  return ref;
}

function validateLabel(value, name) {
  assert(typeof value === 'string' && LABEL_RE.test(value), `${name} must be a short public-safe label`);
  return value.trim();
}

function validateScope(value) {
  assert(typeof value === 'string' && SCOPE_RE.test(value), 'task_scope must be one public-safe line up to 240 characters');
  return value.trim();
}

function validateControlFile(value) {
  assert(typeof value === 'string' && CONTROL_RE.test(value), 'control_file must be a Markdown file under operations/');
  const normalized = path.posix.normalize(value);
  assert(normalized === value && !normalized.includes('../'), 'control_file may not escape operations/');
  return value;
}

function validateInputs(input) {
  assert(input && typeof input === 'object', 'inputs are required');
  const profile = input.runProfile || 'auto';
  assert(PROFILES.has(profile), `run_profile must be one of: ${[...PROFILES].join(', ')}`);
  assert(input.runConfirmation === 'RUN', 'run_confirmation must be exactly RUN');
  return {
    workRef: validateBranch(input.workRef),
    partnerProject: validateLabel(input.partnerProject, 'partner_project'),
    taskedRole: validateLabel(input.taskedRole, 'tasked_role'),
    taskScope: validateScope(input.taskScope),
    controlFile: validateControlFile(input.controlFile),
    runProfile: profile,
  };
}

function inferProfile(files = []) {
  const meaningful = files.filter(Boolean);
  if (!meaningful.length) return 'operations';
  const operationsOnly = meaningful.every((file) =>
    file.startsWith('operations/') ||
    file.startsWith('docs/') ||
    file === 'README.md' ||
    file.endsWith('.md')
  );
  return operationsOnly ? 'operations' : 'development';
}

function resolveProfile(requested, files = []) {
  assert(PROFILES.has(requested), 'invalid requested profile');
  return requested === 'auto' ? inferProfile(files) : requested;
}

module.exports = {
  PROFILES,
  validateInputs,
  inferProfile,
  resolveProfile,
};
