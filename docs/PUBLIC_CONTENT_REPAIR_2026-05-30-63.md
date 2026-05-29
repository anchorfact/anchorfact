# Public Content Repair - 2026-05-30 Batch 63

## Scope

This batch repaired three draft computer-science fundamentals selected for AI-agent usefulness and source stability:

- `computer-science/dns-domain-name-system`
- `computer-science/json`
- `computer-science/http-protocol`

The intent was not broad expansion. The batch promoted only high-frequency protocol/data-format topics that can be grounded in stable IETF or Ecma standards.

## Changes

- Rewrote `content/computer-science/dns-domain-name-system.md` around RFC 1034, RFC 1035, and RFC 4033.
- Rewrote `content/computer-science/json.md` around RFC 8259 and ECMA-404.
- Rewrote `content/computer-science/http-protocol.md` around RFC 9110, RFC 9112, RFC 9113, and RFC 9114.
- Removed adoption percentages, market-style claims, mojibake, broken atomic facts, and unrelated disputed statements.
- Updated only the three targeted `verification-report.json` entries with manual-review metadata.

## Verification Notes

- Local rebuilt counts: 596 public / 404 draft / 1830 claims.
- Full public audit: 596 `keep_public`, 0 `repair_sources`, 0 `downgrade_confidence`, 0 `move_to_draft`.
- AI usefulness benchmark: 100/100, 11/11 cases, 0 improvement candidates.
- Public source coverage: 596 full, 0 partial, 0 zero.
- Mapped public claims: 1830/1830.
- Draft automatic repair candidates reduced from 189 to 186.
- Local `verify-full` was not run.
- `dist/` remains generated output and is not committed.

## Source URLs

- https://www.ietf.org/rfc/rfc1034.txt
- https://www.ietf.org/rfc/rfc1035.txt
- https://www.ietf.org/rfc/rfc4033.txt
- https://www.ietf.org/rfc/rfc8259.txt
- https://ecma-international.org/publications-and-standards/standards/ecma-404/
- https://www.ietf.org/rfc/rfc9110.html
- https://www.ietf.org/rfc/rfc9112.html
- https://www.ietf.org/rfc/rfc9113.html
- https://www.ietf.org/rfc/rfc9114.html
