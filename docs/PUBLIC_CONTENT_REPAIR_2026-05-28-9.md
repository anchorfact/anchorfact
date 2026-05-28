# AnchorFact Public Content Repair - 2026-05-28 Batch 9

## Summary

This repair pass addressed the next 12 `repair_sources` articles from the refreshed public content audit after `fix: repair ninth public evidence sample`.

Scope remained limited to sampled public evidence. No full verifier run was performed locally, and generated `dist/` output is excluded from the commit. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only.

Post-repair local build and audit counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1527
- Source verification rate in snapshot: 53.7%
- Manual-reviewed verification entries: 139

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `sports/chess-strategy` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `history/mongol-empire` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `history/ottoman-empire` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `science/cell-structure` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `science/continental-drift` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `science/quantum-mechanics` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `business/negotiation-skills` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `computer-science/graph-bfs-dfs` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/neural-architecture-search` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/neural-rendering` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/neurosymbolic-ai` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |
| `ai/nlp-advanced-techniques` | Replaced weak sampled evidence with three source-mapped public claims and targeted manual-review verification metadata. | Keep public |

## Audit Result

`npm run audit-public-sample` passed after the local build and refreshed the next risk-weighted sample. The repaired Batch 9 entries no longer appear in the next `repair_sources` set; the audit now reports 12 remaining `repair_sources` entries for the next pass.
