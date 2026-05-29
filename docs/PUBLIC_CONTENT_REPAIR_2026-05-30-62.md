# Public Content Repair Batch 62 - 2026-05-30

## Scope

This batch promoted two low-risk computer-science draft entries from the
existing repair queue:

- `computer-science/jwt`
- `computer-science/oauth2`

## Selection Rationale

The public surface and AI usefulness benchmark were already green, so the
highest-leverage next step was a small draft repair batch. These two entries
were selected because they support AI-agent API integration work and can be
anchored directly to stable IETF RFC sources instead of broad vendor or
market claims.

## Repair Notes

- Replaced stale, unreachable, and over-broad source metadata with direct RFC
  text URLs.
- Removed unsupported claims about adoption and provider behavior.
- Kept both entries at medium confidence and limited the facts to protocol
  definitions, PKCE, and security best-current-practice boundaries.
- Updated only the targeted `verification-report.json` entries with
  manual-review metadata; local `verify-full` was not run.

## Measurement

- Local rebuilt counts: 593 public / 407 draft / 1820 claims.
- Full public audit: 593 `keep_public`, 0 `repair_sources`,
  0 `downgrade_confidence`, 0 `move_to_draft`.
- AI usefulness benchmark: 100/100, 11/11 passing, 0 improvement candidates.
- Public source coverage: 593 full, 0 partial, 0 zero.
- Mapped public claims: 1820/1820.
- Draft repair candidates remaining: 189.

## Direction Check

This batch keeps the project on the measurement-led path: improve the draft
asset pool only where sources are stable, direct, and machine-actionable.
