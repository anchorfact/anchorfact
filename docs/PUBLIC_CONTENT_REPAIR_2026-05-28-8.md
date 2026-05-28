# AnchorFact Public Content Repair - 2026-05-28 Batch 8

## Summary

This repair pass addressed the next 14 `repair_sources` articles from the refreshed public content audit after `fix: repair eighth public evidence sample`.

Scope remained limited to sampled public evidence. No full verifier run was performed locally, and generated `dist/` output is excluded from the commit. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only.

Post-repair local build and audit counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1520
- Source verification rate in snapshot: 52.3%
- Manual-reviewed verification entries: 127

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `sports/swimming-training` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `history/american-revolution` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `health/yoga-practice` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `history/world-war-ii` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `self-improvement/focus-techniques` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `science/big-bang-theory` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `science/data-science-fundamentals` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `self-improvement/communication-skills` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `ai/latent-diffusion-models` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `ai/lora` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `ai/loss-functions` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `ai/multi-modal-learning` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `self-improvement/productivity-systems` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |
| `sports/marathon-running` | Replaced weak or overly broad public evidence with three source-mapped claims and updated targeted manual-review verification metadata. | Keep public |

## Audit Result

`npm run audit-public-sample` passed after the local build and refreshed the next risk-weighted sample. The repaired Batch 8 entries no longer appear in the next `repair_sources` set; the audit now reports 12 remaining `repair_sources` entries for the next pass.
