# Public Content Repair - 2026-05-30 Batch 68

## Scope
This batch deliberately avoided adding another engineering surface. It repaired three AI-first draft entries from the automatic repair queue:
- `ai/ai-team-collaboration`
- `ai/ai-writing-assistants`
- `ai/test-time-compute-scaling`

## Changes
- Rewrote each article as a compact, source-mapped evidence card.
- Removed arXiv search-page sources, product-adoption claims, unsupported productivity numbers, future-dated generalizations, and broad claims that were not tied to a specific source.
- Set article and fact confidence to `medium`.
- Updated only the three targeted `verification-report.json` entries with manual-review metadata.
- Updated live-count baselines and current documentation metrics to the rebuilt corpus size.

## Verification Notes
- Local rebuilt counts: 610 public / 390 draft / 1875 claims.
- Draft automatic repair candidates reduced from 175 to 172.
- Full public audit: 610 `keep_public`, 0 `repair_sources`, 0 `downgrade_confidence`, 0 `move_to_draft`.
- Public source coverage: 610 full, 0 partial, 0 zero.
- Public atomic facts mapped to sources: 1875/1875.
- Local `verify-full` was not run.
- `dist/` remains generated output and is not committed.

## Source URLs
- https://www.microsoft.com/en-us/research/?p=1144428
- https://aclanthology.org/2023.acl-long.906/
- https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00578/116993/Abstractive-Meeting-Summarization-A-Survey
- https://aclanthology.org/2020.bea-1.16/
- https://doi.org/10.1145/3491102.3502030
- https://doi.org/10.1126/science.adh2586
- https://openai.com/index/learning-to-reason-with-llms/
- https://arxiv.org/abs/2408.03314
- https://arxiv.org/abs/2305.10601
