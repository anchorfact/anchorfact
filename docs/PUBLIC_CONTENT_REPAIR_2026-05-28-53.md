# Public Content Repair 2026-05-28-53

## Scope

This batch promotes three high-demand AI core concept drafts that were causing weak query routing for common AI-agent questions:

- `ai/llms`
- `ai/diffusion-models`
- `ai/generative-adversarial-networks-gan`

## Rationale

Production probes showed that broad AI queries such as `large language models` and `GANs` were being routed to narrower adjacent articles because the canonical concept entries were still drafts. The repair keeps the batch intentionally small and content-focused rather than adding new engineering layers.

## Source Repair

- Rewrote each article as a compact, source-mapped concept entry.
- Removed live leaderboard, proprietary parameter-count, and product-ranking claims.
- Kept only stable facts mapped to specific arXiv source records.
- Updated only the targeted `verification-report.json` entries with manual-review metadata.

Manual-review metadata note: "Fifty-third targeted core AI coverage repair pass; local verify-full was not run for this bounded manual-review update."

## Verification Boundaries

- Local `verify-full` was not run.
- Generated `dist/` output is excluded from commit scope.
- Public eligibility remains based on source-mapped atomic facts and targeted verification metadata.
