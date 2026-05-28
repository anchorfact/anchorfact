# Public Content Repair - 2026-05-28 Pass 37

## Scope

Repaired the latest sampled public evidence targets from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`:

- `ai/vector-databases`
- `ai/video-understanding`
- `history/aztec-empire`
- `computer-science/c++-language`
- `ai/feature-engineering`
- `business/leadership-principles`
- `computer-science/aria-accessible-rich-internet-applications`
- `computer-science/elixir-language`
- `computer-science/grafana`
- `computer-science/intersection-observer-api`

## Changes

- Replaced broad, generic, duplicated, or drift-prone evidence with three precise primary sources per article.
- Reduced each article to three source-mapped atomic facts with `medium` fact confidence.
- Repaired `computer-science/c-plus-plus-language`, which had been sampled as `move_to_draft`, by replacing the failing summary and weak source set with stable C++ standard/reference evidence.
- Cleared generic dispute statements and secondary-source clutter for this bounded public sample.
- Updated targeted manual-review metadata in `verification-report.json` without running local `verify-full`.

## Verification Metadata

- Manual-review metadata note: "Thirty-seventh targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
- Local `verify-full` was not run.
- `dist/` is regenerated only for local build and audit checks and must not be committed.
