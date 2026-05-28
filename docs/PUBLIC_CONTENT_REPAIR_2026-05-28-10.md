# AnchorFact Public Content Repair - 2026-05-28 Batch 10

## Summary

This repair pass addressed the next 12 `repair_sources` articles from the refreshed public content audit after `fix: repair tenth public evidence sample`.

Scope remained limited to sampled public evidence. No full verifier run was performed locally, and generated `dist/` output is excluded from the commit. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only.

Post-repair local build and audit counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1535
- Source verification rate in snapshot: 55.0%
- Manual-reviewed verification entries: 151

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `computer-science/infrastructure-as-code-iac` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `computer-science/linked-list` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `history/colonialism` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/ai-blockchain` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/ai-for-smart-homes` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/ai-in-education` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/mechanistic-interpretability` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `computer-science/docker` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/object-detection` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/open-source-ai-movement` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/representation-learning` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/self-supervised-learning` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |

## Audit Result

`npm run audit-public-sample` passed after the local build and refreshed the next risk-weighted sample. The repaired Batch 10 entries no longer appear in the next `repair_sources` set; the audit now reports 12 remaining `repair_sources` entries for the next pass.
