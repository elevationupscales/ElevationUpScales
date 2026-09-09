const CONTEXT = 'elevation/worker-preview';
const WORKFLOW = '.github/workflows/worker-release-deploy.yml';

function validate({ sha, main, head, ref, target, confirmation }) {
  if (!/^[a-f0-9]{40}$/.test(sha || '')) throw new Error('expected_sha must be a full lowercase commit SHA');
  if (ref !== 'refs/heads/main') throw new Error('Dispatch this workflow from main');
  if (!['preview', 'production'].includes(target)) throw new Error('Invalid target');
  if (target === 'production' && confirmation !== 'DEPLOY') throw new Error('Production requires exact DEPLOY confirmation');
  if (main !== sha || head !== sha) throw new Error('Main changed or checkout differs. Refresh/review the new main SHA before retrying.');
}

async function requirePreview(github, repo, sha, serverUrl) {
  // Newest status for this context wins; never fall back to an older green run.
  let status;
  for await (const page of github.paginate.iterator(github.rest.repos.listCommitStatusesForRef, { ...repo, ref: sha, per_page: 100 })) {
    status = page.data.find(item => item.context === CONTEXT);
    if (status) break;
  }
  if (!status || status.state !== 'success') throw new Error('Same-SHA worker preview PASS is required');
  const prefix = `${serverUrl}/${repo.owner}/${repo.repo}/actions/runs/`;
  const runId = (status.target_url || '').startsWith(prefix) ? status.target_url.slice(prefix.length) : '';
  if (!/^\d+$/.test(runId)) throw new Error('Invalid preview run receipt');
  const { data: run } = await github.rest.actions.getWorkflowRun({ ...repo, run_id: Number(runId) });
  if (run.path !== WORKFLOW || run.event !== 'workflow_dispatch' || run.head_sha !== sha ||
      run.head_branch !== 'main' || run.status !== 'completed' || run.conclusion !== 'success') {
    throw new Error('Preview receipt does not identify a successful exact-SHA worker run');
  }
  return status.target_url;
}
module.exports = { CONTEXT, validate, requirePreview };
