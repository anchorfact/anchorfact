# Public Content Repair - 2026-05-28 Pass 28

## Scope

Repaired the latest sampled public evidence targets from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`:

- `ai/ai-for-software-testing`
- `ai/ai-for-space-exploration`
- `ai/ai-for-transportation`
- `computer-science/r-language`
- `computer-science/scala-language`
- `computer-science/vite`
- `computer-science/websocket-api`
- `computer-science/xmlhttprequest`
- `science/history-of-mathematics`
- `science/human-memory`

## Changes

- Replaced future, generic, duplicated, or drift-prone evidence with three precise primary sources per article.
- Reduced each article to three source-mapped atomic facts with `medium` fact confidence.
- Cleared generic dispute statements and secondary-source clutter for this bounded public sample.
- Rewrote affected summaries where old text contained unsupported metrics, truncated facts, or mojibake.
- Updated targeted manual-review metadata in `verification-report.json` without running local `verify-full`.

## Verification Metadata

- Manual-review metadata note: "Twenty-eighth targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
- Local `verify-full` was not run.
- `dist/` is regenerated only for local build and audit checks and must not be committed.
