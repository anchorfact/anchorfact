# AnchorFact Public Content Repair - 2026-05-28 Batch 11

## Summary

This repair pass addressed the next 12 `repair_sources` articles from the refreshed public content audit after `fix: repair eleventh public evidence sample`.

Scope remained limited to sampled public evidence. No full verifier run was performed locally, and generated `dist/` output is excluded from the commit. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only.

Post-repair local build and audit counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1543
- Source verification rate in snapshot: 56.0%
- Manual-reviewed verification entries: 161

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `computer-science/redis` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `science/solar-system` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/ai-digital-twins-healthcare` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/ai-for-online-advertising` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/bayesian-deep-learning` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `computer-science/ci-cd-pipeline` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `computer-science/consul-hashicorp` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `computer-science/deno` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/speech-recognition` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/synthetic-data-training` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `arts/coffee-culture` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `arts/political-philosophy` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |

## Audit Result

`npm run audit-public-sample` passed after the local build and refreshed the next risk-weighted sample. The repaired Batch 11 entries no longer appear in the next `repair_sources` set; the audit now reports 12 remaining `repair_sources` entries for a future pass.
