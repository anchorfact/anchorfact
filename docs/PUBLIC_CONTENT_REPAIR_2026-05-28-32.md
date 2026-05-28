# Public Content Repair - 2026-05-28 Pass 32

## Scope

Repaired or downgraded the latest sampled public evidence targets from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`:

- `ai/brain-computer-interface-ai`
- `ai/causal-inference-ai`
- `ai/causal-representation-learning`
- `self-improvement/stress-management`
- `sports/basketball-rules`
- `ai/ai-for-logistics`
- `ai/ai-for-social-media`
- `ai/ai-for-weather-forecasting`
- `ai/computational-neuroscience`
- `ai/decentralized-ai`

## Changes

- Replaced broad, generic, duplicated, or drift-prone evidence with three precise primary sources per article.
- Reduced each article to three source-mapped atomic facts with `medium` fact confidence.
- Downgraded high-confidence sampled articles to `medium` where evidence did not support high-confidence publication.
- Cleared generic dispute statements and secondary-source clutter for this bounded public sample.
- Updated targeted manual-review metadata in `verification-report.json` without running local `verify-full`.

## Verification Metadata

- Manual-review metadata note: "Thirty-second targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
- Local `verify-full` was not run.
- `dist/` is regenerated only for local build and audit checks and must not be committed.
