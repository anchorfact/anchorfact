# Public Content Repair - 2026-05-28 Pass 26

## Scope

Repaired the latest sampled public evidence targets from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`:

- `ai/ai-for-medical-imaging`
- `ai/ai-for-network-security`
- `ai/ai-for-oil-gas-exploration`
- `ai/ai-smart-contract-audit`
- `ai/cognitive-architectures`
- `ai/convolutional-neural-networks-cnn`
- `ai/data-centric-ai`
- `ai/human-computer-interaction`
- `ai/semantic-web-ontology`
- `ai/transfer-learning`

## Changes

- Replaced weak or overbroad evidence with three source-specific primary sources per article.
- Reduced each article to three source-mapped atomic facts with `medium` fact confidence.
- Cleared generic dispute statements, future-source drift, duplicate sources, and secondary-source clutter for this bounded public sample.
- Rewrote affected summaries where old text contained unsupported claims, future-source references, or mojibake.
- Updated targeted manual-review metadata in `verification-report.json` without running local `verify-full`.

## Verification Metadata

- Manual-review metadata note: "Twenty-sixth targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
- Local `verify-full` was not run.
- `dist/` is regenerated only for local build and audit checks and must not be committed.
