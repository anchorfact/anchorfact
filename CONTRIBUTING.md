# Contributing to AnchorFact

AnchorFact optimizes for trustworthy, source-backed claims. Keep changes small, reviewable, and easy to audit.

## Content Changes

- Do not bulk-promote draft content.
- Public articles must have verified sources, non-placeholder body text, and source-mapped atomic facts.
- Atomic facts need precise evidence through `source_ref`, `source_url`, or `source_doi`.
- If a source is weak or only partially supports a fact, lower the fact confidence instead of stretching the evidence.
- Update only targeted `verification-report.json` entries during manual repair work. Do not run a local full verification sweep unless maintainers request it.

## Engineering Changes

- Prefer small PRs with a clear test surface.
- Keep generated `dist/` output out of commits.
- Preserve public output contracts for `/manifest.json`, `/claims.json`, `/provenance.json`, article JSON-LD, and `llms.txt`.
- Add tests for new behavior before or alongside the implementation.

## Local Checks

Run these before committing routine changes:

```bash
npm test
npm run quality
npm run build
npm run audit-public-sample
npm run audit-public-full
npm audit
```

Do not run `npm run verify-full` as part of routine local development. The full verification snapshot is handled by the scheduled GitHub Actions workflow.
