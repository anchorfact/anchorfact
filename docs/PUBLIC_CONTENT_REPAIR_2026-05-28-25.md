# Public Content Repair - 2026-05-28 Pass 25

## Scope

Repaired the latest sampled public evidence targets from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`:

- `ai/ai-for-iot`
- `ai/ai-for-legal`
- `ai/ai-for-manufacturing`
- `science/human-anatomy`
- `science/statistics-fundamentals`
- `science/thermodynamics-fundamentals`
- `self-improvement/cognitive-biases-handbook`
- `self-improvement/goal-setting`
- `sports/football-tactics`
- `sports/sports-biomechanics`

## Changes

- Replaced future, duplicated, generic, or drift-prone evidence with three source-specific primary sources per article.
- Reduced each article to three source-mapped atomic facts with `medium` fact confidence to avoid claim caps.
- Cleared generic dispute statements and secondary-source drift for this bounded public sample.
- Updated targeted manual-review metadata in `verification-report.json` without running local `verify-full`.
- Lightly rewrote affected article summaries where old body text contained unsupported numbers, future-source references, or mojibake.

## Verification Metadata

- Manual-review metadata note: "Twenty-fifth targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
- Local `verify-full` was not run.
- `dist/` is regenerated only for local build and audit checks and must not be committed.
