# Public Content Repair - 2026-05-30 Batch 65

## Scope

This batch converted the previous web/API repair into an explicit measurement gate instead of adding a new content surface.

- Added representative AI benchmark queries for `computer-science/rest-api`, `computer-science/http-status-codes`, and `computer-science/quic-protocol`.
- Repaired the only benchmark regression surfaced by that wider gate: `computer-science/http-status-codes` had a single-source evidence pack.

## Changes

- Added three technical-reference cases to the query benchmark catalog and synchronized eval contract tests.
- Added the IANA HTTP Status Code Registry as a second authoritative source for `content/computer-science/http-status-codes.md`.
- Added one source-mapped fact for the IANA registry and updated only the targeted `verification-report.json` entry.
- Updated the site module quality audit to describe the benchmark as 14 representative queries.

## Verification Notes

- Local rebuilt counts: 599 public / 401 draft / 1841 claims.
- AI benchmark before HTTP status source-depth repair: 99.64/100, 14/14 cases, 1 improvement candidate.
- AI benchmark after repair: 100/100, 14/14 cases, 0 improvement candidates.
- Local `verify-full` was not run.
- `dist/` remains generated output and is not committed.

## Source URLs

- https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
