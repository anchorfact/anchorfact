# Public Content Repair - 2026-05-28 Pass 51

## Scope

Targeted the final four remaining full-audit public evidence debt rows:

- `arts/philosophy-of-science`
- `arts/poetry-fundamentals`
- `arts/shakespeare-s-works`
- `science/scientific-revolution`

## Changes

- Converted the final capped single-source primers to `low` editorial confidence.
- Set all exported atomic facts in scope to `low` confidence so public claims are no longer capped.
- Removed truncated claims, mojibake, unsupported performance/statistical claims, generic dispute statements, and unrelated secondary-source clutter.
- Replaced the Shakespeare source with the more directly relevant Oxford Shakespeare reference edition page.
- Updated only the targeted `verification-report.json` entries with pass 51 manual-review metadata.

## Verification

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

Full public audit recommendations after this pass:

- `keep_public`: 555
- `repair_sources`: 0
- `downgrade_confidence`: 0
- `move_to_draft`: 0

Local `verify-full` was not run. `dist/` was generated locally for audit recomputation and is not part of the intended commit.
