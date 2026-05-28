# Public Content Repair - 2026-05-28 Pass 48

## Scope

Targeted the next five remaining full-audit public evidence debt rows:

- `history/ancient-egypt`
- `history/leonardo-da-vinci`
- `history/reformation`
- `history/viking-age`
- `arts/architecture-history`

## Changes

- Converted five single-book public primers to `low` editorial confidence.
- Set all exported atomic facts in scope to `low` confidence so public claims are no longer capped.
- Removed mojibake, truncated claims, unsupported precision, and broad claims that needed narrower source mapping.
- Updated targeted source URLs where a more stable publisher or academic page was available.
- Updated only the targeted `verification-report.json` entries with pass 48 manual-review metadata.

## Verification

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

Full public audit recommendations after this pass:

- `keep_public`: 541
- `repair_sources`: 14
- `downgrade_confidence`: 0
- `move_to_draft`: 0

Local `verify-full` was not run. `dist/` was generated locally for audit recomputation and is not part of the intended commit.
