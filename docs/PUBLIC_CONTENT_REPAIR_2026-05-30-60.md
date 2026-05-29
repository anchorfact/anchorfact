# Public Content Repair Batch 60 - 2026-05-30

## Scope

This batch deliberately stayed small after the strict-review queue calibration:
three low-risk draft candidates from the ordinary repair queue were promoted.

- `arts/film-history`
- `arts/impressionism`
- `geography/arctic-and-antarctic`

No strict-review topics were included.

## Repair Notes

- Rewrote each entry as a compact, source-mapped public evidence pack.
- Kept article and atomic fact confidence at `medium`.
- Removed broad or stale book-page references and replaced them with stable
  encyclopedia, museum, institutional, or official-reference sources.
- Fixed mojibake in `geography/arctic-and-antarctic`.
- Updated only the targeted `verification-report.json` article entries with
  bounded manual-review metadata; local `verify-full` was not run.
- Updated smoke and production-integrity count baselines to the new compiled
  production target.

## Measurement

- Local rebuilt counts: 591 public / 409 draft / 1814 claims.
- Full public audit: 591 `keep_public`, 0 `repair_sources`,
  0 `downgrade_confidence`, 0 `move_to_draft`.
- Public source coverage: 591 full, 0 partial, 0 zero.
- Mapped public claims: 1814/1814.
- Draft repair candidates: 191 ordinary, 17 strict-review.
- Project readiness: 94/100 (`strong`), next focus
  `prioritize_draft_repair_queue`.

## Direction Check

The batch confirms that the ordinary repair queue can safely promote small,
low-risk public entries without adding public audit debt. The next step should
continue to be measurement-led: either repair another small ordinary batch or
pause content growth to improve the query benchmark if coverage gains are not
visible.
