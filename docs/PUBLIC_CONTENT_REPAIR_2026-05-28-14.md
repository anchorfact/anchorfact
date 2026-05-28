# AnchorFact Public Content Repair - 2026-05-28 Batch 14

## Summary

This repair pass addressed the next 12 `repair_sources` articles from the refreshed public content audit after `fix: repair fourteenth public evidence sample`.

Scope remained limited to sampled public evidence. No local `verify-full` run was performed, and generated `dist/` output is excluded from the commit. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only.

Post-repair local build and audit counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1567
- Source verification rate in snapshot: 59.5%
- Manual-reviewed verification entries: 211

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `self-improvement/critical-thinking` | Replaced future and duplicate book entries with SEP, Kahneman/Tversky, and Kahneman evidence. | Keep public |
| `ai/model-evaluation-metrics` | Replaced fabricated 2025 surveys with scikit-learn metric and cross-validation documentation. | Keep public |
| `computer-science/binary-search-tree` | Replaced generic ACM and future survey entries with NIST and Princeton algorithm references. | Keep public |
| `computer-science/ansible` | Replaced homepage/future/unrelated sources with Ansible getting-started, playbook, and inventory docs. | Keep public |
| `computer-science/gitops` | Replaced generic homepage and future sources with OpenGitOps principles and Argo CD documentation. | Keep public |
| `computer-science/pair-programming` | Replaced generic ACM and future evidence with Agile Alliance and DOI-backed pair-programming papers. | Keep public |
| `self-improvement/decision-making` | Replaced future book and unrelated arXiv entries with Kahneman/Tversky decision evidence. | Keep public |
| `computer-science/api-gateway` | Replaced homepage/future/unrelated sources with Microsoft and AWS API Gateway documentation. | Keep public |
| `history/roman-empire` | Replaced broad Gibbon-only and future sources with Britannica Roman Empire, Augustus, and Pax Romana references. | Keep public |
| `science/astronomy-and-cosmology` | Added NASA Big Bang evidence and remapped Planck/EHT claims to direct DOI sources. | Keep public |
| `science/black-holes` | Replaced future source entries with NASA black-hole image material and LIGO/Virgo DOI evidence. | Keep public |
| `science/chemical-bonding` | Replaced future source entries with IUPAC Gold Book, OpenStax, and Nobel Prize archive sources. | Keep public |

## Audit Result

`npm run audit-public-sample` passed after the local build and refreshed the next risk-weighted sample. The repaired Batch 14 entries no longer appear in the next `repair_sources` set; the audit now reports 11 new `repair_sources` entries for a future pass.
