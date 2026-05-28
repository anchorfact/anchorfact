# AnchorFact Public Content Repair - 2026-05-28 Batch 13

## Summary

This repair pass addressed the next 12 `repair_sources` articles from the
refreshed public content audit after `fix: repair thirteenth public evidence
sample`.

Scope remained limited to sampled public evidence. No local `verify-full` run
was performed, and generated `dist/` output is excluded from the commit. The
bounded `verification-report.json` update records targeted manual review for the
repaired primary sources only.

Post-repair local build and audit counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1559
- Source verification rate in snapshot: 58.0%
- Manual-reviewed verification entries: 184

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `computer-science/typescript` | Replaced survey/future/empty sources with TypeScript docs and the Microsoft repository. | Keep public |
| `history/hundred-years-war` | Replaced generic dispute and future sources with Britannica war, Agincourt, and Joan of Arc references. | Keep public |
| `history/inca-empire` | Replaced mismatched evidence with Britannica and UNESCO sources for the Inca, Qhapaq Nan, and Machu Picchu. | Keep public |
| `history/rise-of-islam` | Replaced generic dispute, empty sources, and future books with Britannica Islam, Hijrah, and caliphate references. | Keep public |
| `history/space-race` | Replaced future and generic evidence with NASA sources for Sputnik, Yuri Gagarin, and Apollo 11. | Keep public |
| `history/ancient-rome` | Replaced broad future editions with Britannica sources for Ancient Rome, Augustus, and Pax Romana. | Keep public |
| `science/earthquakes` | Replaced future seismology sources with USGS earthquake causes, magnitude types, and largest-recorded-earthquake references. | Keep public |
| `self-improvement/active-listening` | Removed future books, empty URLs, and unrelated AI papers; mapped claims to Rogers/Farson, CDC, and NIDA sources. | Keep public |
| `health/chronic-disease-prevention` | Replaced source-title drift with WHO and CDC chronic disease prevention sources. | Keep public |
| `health/mental-health-fundamentals` | Added direct NIMH psychotherapy evidence and remapped WHO/APA claims. | Keep public |
| `health/vaccine-development` | Remapped vaccine claims to WHO smallpox vaccination, Nature mRNA vaccine review, and Lancet survival-impact evidence. | Keep public |
| `history/ancient-egyptian-civilization` | Replaced future book entries with Britannica, British Museum, and UNESCO evidence. | Keep public |

## Audit Result

`npm run audit-public-sample` passed after the local build and refreshed the
next risk-weighted sample. The repaired Batch 13 entries no longer appear in the
next `repair_sources` set; the audit now reports 12 new `repair_sources` entries
for a future pass.
