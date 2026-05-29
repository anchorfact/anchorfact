# Public Content Repair - 2026-05-30 Batch 64

## Scope

This batch repaired three draft web/API fundamentals selected for AI-agent usefulness and stable source support:

- `computer-science/rest-api`
- `computer-science/http-status-codes`
- `computer-science/quic-protocol`

The batch intentionally stayed on protocol and API basics rather than adding broader product features or trend-driven AI application pages.

## Changes

- Rewrote `content/computer-science/rest-api.md` around Fielding's REST dissertation and RFC 9110.
- Rewrote `content/computer-science/http-status-codes.md` around RFC 9110.
- Rewrote `content/computer-science/quic-protocol.md` around RFC 9000, RFC 9001, and RFC 9114.
- Removed generic ACM-homepage evidence, broad adoption claims, and corrupted or over-broad statements.
- Updated only the three targeted `verification-report.json` entries with manual-review metadata.
- Added `dissertation` to A-tier source classification because the REST source is an academic dissertation and this source type already appears in the corpus.

## Verification Notes

- Local rebuilt counts: 599 public / 401 draft / 1840 claims.
- Full public audit: 599 `keep_public`, 0 `repair_sources`, 0 `downgrade_confidence`, 0 `move_to_draft`.
- AI benchmark: 100/100 overall, 11/11 cases passed, 0 improvement candidates.
- Public source coverage: 599 full, 0 partial, 0 zero.
- Public atomic facts mapped to sources: 1840/1840.
- Draft automatic repair candidates reduced from 186 to 183.
- Local `verify-full` was not run.
- `dist/` remains generated output and is not committed.

## Source URLs

- https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm
- https://www.ietf.org/rfc/rfc9000.html
- https://www.ietf.org/rfc/rfc9001.html
- https://www.ietf.org/rfc/rfc9110.html
- https://www.ietf.org/rfc/rfc9114.html
