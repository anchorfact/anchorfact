# Public Content Repair - 2026-05-30 Batch 76

## Scope

- `ai/ai-gesture-recognition`

## Changes

- Replaced broad gesture-recognition draft claims with two source-mapped facts:
  MediaPipe Hands for on-device RGB hand tracking and HaMeR for monocular 3D
  hand mesh recovery.
- Removed unsupported production claims about sign-language accuracy,
  safety-critical gesture control, automotive use, and generic touchless
  interfaces.
- Kept article and atomic fact confidence at `medium`.
- Updated the targeted `verification-report.json` entry with manual-review
  metadata for the two arXiv sources.
- Updated production count baselines to `630 public / 370 draft / 1933 claims`.

## Sources

- https://arxiv.org/abs/2006.10214
- https://arxiv.org/abs/2312.05251

## Verification

- Local rebuilt counts: 630 public / 370 draft / 1933 claims.
- Full public audit: 630 `keep_public`, 0 actionable recommendations.
- Draft repair queue after this repair: 150 automatic candidates, 19 strict
  review candidates.
- Local `verify-full` was not run.
- Generated `dist/` output was not committed.
