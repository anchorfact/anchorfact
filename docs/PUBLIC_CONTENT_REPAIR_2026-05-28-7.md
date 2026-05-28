# AnchorFact Public Content Repair - 2026-05-28 Batch 7

## Summary

This repair pass addressed the next 16 `repair_sources` articles from the refreshed public content audit after `fix: repair seventh public evidence sample`.

Scope was intentionally limited to the sampled public articles. No site-wide quality rule was tightened, no generated `dist/` output was committed, and no full verifier run was performed locally. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only.

Post-repair local build and audit counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1524
- Source verification rate in snapshot: 50.9%
- Manual-reviewed verification entries: 113

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `arts/coffee-culture` | Removed future coffee-book metadata and an unrelated aesthetics dispute; aligned coffee, history, and caffeine claims to Britannica, ICO, and FDA sources. | Keep public |
| `arts/fashion-history` | Removed future fashion-book metadata and generic art dispute text; aligned fashion-industry, Dior, and Chanel claims to Britannica, V&A, and Met sources. | Keep public |
| `business/marketing-fundamentals` | Removed duplicate/future textbook entries and volatile ad-spend claims; aligned marketing, persuasion, and NPS claims to OpenStax, Cialdini, and HBR. | Keep public |
| `history/industrial-revolution` | Removed future/unsupported Industrial Revolution metadata and aligned overview, steam-power, and economic-history claims to stable sources. | Keep public |
| `history/mesopotamia` | Replaced weak/future Mesopotamia sources with Britannica, British Museum, and Louvre evidence for the region, cuneiform culture, and Hammurabi. | Keep public |
| `history/mughal-empire` | Removed future Mughal sources and unrelated colonialism dispute text; aligned dynasty, Akbar, and Taj Mahal claims to Britannica and UNESCO. | Keep public |
| `history/world-war-i` | Removed future WWI metadata and an unrelated Cold War dispute; aligned conflict overview, 1914 escalation, and armistice claims to Britannica and IWM. | Keep public |
| `science/organic-chemistry` | Removed future organic-chemistry survey metadata and aligned definition, Woodward, and nomenclature claims to Britannica, Nobel, and IUPAC. | Keep public |
| `ai/embodied-ai-and-robotics` | Added missing SayCan and Habitat sources so embodied-AI facts map directly to primary evidence. | Keep public |
| `ai/graph-neural-networks` | Added GAT and graph-representation-learning evidence so each GNN fact has a matching source. | Keep public |
| `ai/image-segmentation` | Added Mask R-CNN evidence and aligned segmentation facts to U-Net, SAM, and Mask R-CNN. | Keep public |
| `ai/knowledge-distillation` | Reduced sources to three direct distillation references and kept claims aligned to teacher-student transfer and DistilBERT. | Keep public |
| `history/samurai-history` | Removed future samurai sources and unrelated AI-safety dispute text; aligned samurai, bushido, and Musashi claims to Britannica. | Keep public |
| `science/evolution-by-natural-selection` | Removed duplicate broad facts and narrowed evolution claims to Darwin, Darwin-Wallace priority, and modern synthesis context. | Keep public |
| `science/newton-s-laws-of-motion` | Reduced duplicate everyday examples to source-backed claims from Principia and NASA educational references. | Keep public |
| `science/ocean-life` | Replaced single-source broad ocean-life claims with NOAA evidence for ocean water, coral reefs, and hydrothermal vents. | Keep public |

## Audit Result

`npm run audit-public-sample` passed after the local build and refreshed the next risk-weighted sample. The repaired Batch 7 source-hygiene targets no longer appear in the next `repair_sources` set; the audit now reports 14 remaining `repair_sources` entries for the next pass.
