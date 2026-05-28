# Public Content Repair - 2026-05-28 Pass 49

## Scope

Targeted the next five remaining full-audit public evidence debt rows:

- `arts/jazz-music`
- `business/marketing-mix-4ps`
- `business/personal-finance`
- `computer-science/microservices-architecture`
- `history/french-revolution`

## Changes

- Converted five capped single-source primers to `low` editorial confidence.
- Set all exported atomic facts in scope to `low` confidence so public claims are no longer capped.
- Removed mojibake, duplicate/truncated facts, unsupported statistics, generic dispute statements, and unrelated secondary-source clutter.
- Replaced the Marketing Mix source with a precise OpenStax 4Ps section and refreshed the French Revolution source URL to the current Penguin Random House page.
- Updated only the targeted `verification-report.json` entries with pass 49 manual-review metadata.

## Verification

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

Full public audit recommendations after this pass:

- `keep_public`: 546
- `repair_sources`: 9
- `downgrade_confidence`: 0
- `move_to_draft`: 0

Local `verify-full` was not run. `dist/` was generated locally for audit recomputation and is not part of the intended commit.
