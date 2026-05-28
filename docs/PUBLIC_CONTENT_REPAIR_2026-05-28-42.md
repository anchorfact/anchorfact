# Public Content Repair - 2026-05-28 Pass 42

## Scope

Repaired the latest sampled public evidence targets from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`, including both `repair_sources` and `downgrade_confidence` recommendations:

- `science/theory-of-relativity`
- `self-improvement/public-speaking`
- `sports/basketball-fundamentals`
- `computer-science/broadcast-channel-api`
- `computer-science/css-flexbox`
- `computer-science/ethereum`
- `ai/ai-for-materials-science`
- `ai/ai-for-speech-emotion-recognition`
- `ai/audio-source-separation`

## Changes

- Replaced broad, generic, duplicated, or drift-prone evidence with three precise primary sources per article.
- Reduced each article to three source-mapped atomic facts with `medium` fact confidence.
- Cleared generic dispute statements and secondary-source clutter for this bounded public sample.
- Lowered high-confidence sampled articles with partial coverage to `medium` while repairing their source mapping.
- Updated targeted manual-review metadata in `verification-report.json` without running local `verify-full`.

## Verification Metadata

- Manual-review metadata note: "Forty-second targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
- Local `verify-full` was not run.
- `dist/` is regenerated only for local build and audit checks and must not be committed.
