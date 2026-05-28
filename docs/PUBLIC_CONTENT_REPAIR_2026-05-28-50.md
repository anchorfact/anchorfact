# Public Content Repair - 2026-05-28 Pass 50

## Scope

Targeted the next five remaining full-audit public evidence debt rows:

- `history/renaissance-science`
- `history/silk-road`
- `science/evolution-of-language`
- `arts/existentialism`
- `arts/philosophy-of-mind`

## Changes

- Converted five capped single-source primers to `low` editorial confidence.
- Set all exported atomic facts in scope to `low` confidence so public claims are no longer capped.
- Removed truncated claims, mojibake, unsupported specialist examples, broad movement-wide claims, and unrelated secondary-source clutter.
- Replaced the Philosophy of Mind source with the more directly relevant Stanford Encyclopedia of Philosophy mind reference.
- Updated only the targeted `verification-report.json` entries with pass 50 manual-review metadata.

## Verification

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

Full public audit recommendations after this pass:

- `keep_public`: 551
- `repair_sources`: 4
- `downgrade_confidence`: 0
- `move_to_draft`: 0

Local `verify-full` was not run. `dist/` was generated locally for audit recomputation and is not part of the intended commit.
