# Legacy Scripts

This directory contains one-off content generation, enrichment, and migration scripts
from earlier AnchorFact build phases.

These scripts are kept for historical reference only. They are not part of the
production Cloudflare Pages build, CI quality gate, MCP interface, or content audit
workflow.

Use the supported scripts from the repository root instead:

- `npm run audit-public-sample`
- `npm run monitor`
- `npm run quality`
- `npm run build`
- `npm run pages:build`

Do not run legacy scripts against `content/` without first reviewing the diff and
creating a separate cleanup branch.
