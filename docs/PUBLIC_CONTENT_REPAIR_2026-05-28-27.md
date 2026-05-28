# Public Content Repair - 2026-05-28 Pass 27

## Scope

Repaired the latest sampled public evidence targets from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`:

- `ai/ai-for-recruiting`
- `ai/ai-for-retail`
- `ai/ai-for-signal-processing`
- `business/tiktok-shop-marketing`
- `computer-science/cross-origin-resource-sharing-cors`
- `computer-science/electron`
- `computer-science/fullscreen-api`
- `computer-science/html5-semantic-elements`
- `computer-science/notifications-api`
- `computer-science/package-managers-npm-yarn-pnpm`

## Changes

- Replaced generic homepages, duplicated facts, future-source drift, and broad secondary sources with three precise primary sources per article.
- Reduced each article to three source-mapped atomic facts with `medium` fact confidence.
- Cleared generic dispute statements and source clutter for this bounded public sample.
- Rewrote affected summaries where old text included unsupported metrics, stale claims, or mojibake.
- Updated targeted manual-review metadata in `verification-report.json` without running local `verify-full`.

## Verification Metadata

- Manual-review metadata note: "Twenty-seventh targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
- Local `verify-full` was not run.
- `dist/` is regenerated only for local build and audit checks and must not be committed.
