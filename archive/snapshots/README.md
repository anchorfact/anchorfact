# Archived Snapshots

This directory stores historical reports, ad hoc queries, and one-time input files
that should not live at the repository root.

Current production builds use:

- `verification-report.json` at the repository root, maintained by the
  `Verification Snapshot` GitHub Actions workflow.
- `dist/`, generated during local or Cloudflare Pages builds and ignored by Git.

Files in this directory are not consumed by CI, Cloudflare Pages, or the MCP/API
surface.
