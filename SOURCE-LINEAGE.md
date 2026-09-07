# Source lineage

## Current authority
- Active website source: current `main`
- Deployable tree: `site/`
- Hard recovery branch: `hardbaseline/2026-09-06-production`
- Hard recovery commit: `cfc2f8cbe4d89ef40a46fb95d075ee579075a78d`

The hard recovery branch preserves the accepted September 6 production state before the coding-workflow cleanup. Normal edits should start from current `main`, not from an older version number, ZIP package, handoff, or recovery packet.

## Normal change lineage
Each new website change should:
1. branch from current `main`;
2. stay focused on the requested edit;
3. use fast QA during iteration;
4. use full QA before preview/merge/deployment;
5. merge back to `main` after review.

Historical release markers and corrective packages remain available in Git history and the hard baseline when forensic recovery is needed. They are not active prerequisites for ordinary annotation-driven editing.
