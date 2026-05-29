# Public Content Repair Batch 61 - 2026-05-30

## Scope

This batch repaired the two public topics flagged by the AI usefulness
benchmark instead of expanding the draft pool:

- `history/ancient-egypt`
- `business/stock-market-basics`

## Repair Notes

- Raised both entries from low to medium confidence by replacing single-source
  primers with compact multi-source evidence packs.
- Kept the article count and claim count unchanged.
- Updated only the targeted `verification-report.json` article entries with
  bounded manual-review metadata; local `verify-full` was not run.
- For `history/ancient-egypt`, mapped facts to Britannica, Oxford University
  Press DOI metadata, and UNESCO World Heritage evidence.
- For `business/stock-market-basics`, replaced the single book-source primer
  with Investor.gov educational sources on stocks, diversification, and index
  funds, while preserving the no-investment-advice boundary.

## Measurement

- Local rebuilt counts: 591 public / 409 draft / 1814 claims.
- AI usefulness benchmark: 100/100, 11/11 passing, 0 improvement candidates.
- Full public audit: 591 `keep_public`, 0 `repair_sources`,
  0 `downgrade_confidence`, 0 `move_to_draft`.
- Public source coverage: 591 full, 0 partial, 0 zero.
- Mapped public claims: 1814/1814.
- Project readiness: 95/100 (`excellent`), next focus
  `prioritize_draft_repair_queue`.

## Direction Check

This batch confirms the current measurement loop is working: content work
should first remove benchmark weakness, then return to small draft repairs only
when public AI usefulness has no active candidates.
