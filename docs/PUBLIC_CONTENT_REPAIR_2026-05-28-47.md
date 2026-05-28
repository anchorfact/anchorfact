# Public Content Repair - 2026-05-28 Pass 47

## Scope

Targeted the first five remaining full-audit public evidence debt rows after source-tier calibration:

- `ai/ai-for-chemistry`
- `ai/ai-mathematical-reasoning`
- `ai/knowledge-graph-reasoning`
- `arts/music-theory-basics`
- `business/stock-market-basics`

## Changes

- Lowered the three high-confidence AI articles to `medium` and narrowed claims to source-mapped statements.
- Reduced the two single-book primer articles to `low` confidence and set their atomic facts to `low`, removing capped public claims.
- Removed mojibake, unsupported statistics, future/current-state overclaims, generic dispute statements, and unrelated secondary-source clutter.
- Corrected the Knowledge Graph Reasoning ScienceDirect DOI to `10.1016/j.engappai.2025.111625`.
- Updated only the targeted `verification-report.json` entries with manual-review metadata for this bounded pass.

## Verification

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

Full public audit recommendations after this pass:

- `keep_public`: 536
- `repair_sources`: 19
- `downgrade_confidence`: 0
- `move_to_draft`: 0

Local `verify-full` was not run. `dist/` was generated locally for audit recomputation and is not part of the intended commit.
