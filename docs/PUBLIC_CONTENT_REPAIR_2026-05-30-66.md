# Public Content Repair - 2026-05-30 Batch 66

## Scope
This batch repaired three stable protocol drafts selected for AI-agent technical-reference usefulness and standard-source support:
- `computer-science/smtp-protocol`
- `computer-science/ssh-protocol`
- `computer-science/mqtt-protocol`

The batch deliberately stayed on standards-backed protocol basics rather than adding trend-driven application topics.

## Changes
- Rewrote `content/computer-science/smtp-protocol.md` around RFC 5321 and RFC 6409.
- Rewrote `content/computer-science/ssh-protocol.md` around RFC 4251, RFC 4253, and RFC 4254.
- Rewrote `content/computer-science/mqtt-protocol.md` around OASIS MQTT 5.0 and MQTT 3.1.1.
- Removed generic ACM-homepage evidence, placeholder dispute text, and corrupted generated prose.
- Updated only the three targeted `verification-report.json` entries with manual-review metadata.

## Verification Notes
- Local rebuilt counts: 602 public / 398 draft / 1850 claims.
- Full public audit: 602 `keep_public`, 0 `repair_sources`, 0 `downgrade_confidence`, 0 `move_to_draft`.
- Public source coverage: 602 full, 0 partial, 0 zero.
- Public atomic facts mapped to sources: 1850/1850.
- Draft automatic repair candidates reduced from 183 to 180.
- AI benchmark: 100/100 overall, 14/14 cases passed, 0 improvement candidates.
- Local `verify-full` was not run.
- `dist/` remains generated output and is not committed.

## Source URLs
- https://www.rfc-editor.org/rfc/rfc5321.html
- https://www.rfc-editor.org/rfc/rfc6409.html
- https://www.rfc-editor.org/rfc/rfc4251.html
- https://www.rfc-editor.org/rfc/rfc4253.html
- https://www.rfc-editor.org/rfc/rfc4254.html
- https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
