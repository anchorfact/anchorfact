# AnchorFact Public Content Repair - 2026-05-28 Batch 4

## Summary

This repair pass addressed the next 16 `repair_sources` articles from the refreshed public content audit after `fix: repair fourth public evidence sample`.

Scope was intentionally limited to the sampled public articles. No site-wide quality rule was tightened, no generated `dist/` output was committed, and no full verifier run was performed locally. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only, because public eligibility is based on `primary_sources` coverage.

Post-repair local build counts:

- Public articles: 554
- Draft articles: 446
- Public claims: 1546
- Source verification rate in snapshot: 47.2%

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `history/great-wall-of-china` | Removed fake 2025 book/DOI sources and generic dispute text; aligned claims to Britannica and UNESCO. | Keep public |
| `history/greek-philosophy` | Removed unsupported 2025 companion-book sources; aligned Socrates, Plato, and Aristotle claims to Stanford Encyclopedia of Philosophy entries. | Keep public |
| `science/photosynthesis` | Removed unrelated React documentation and fake 2025 review DOI; aligned light-reaction and Calvin-cycle claims to OpenStax Biology. | Keep public |
| `arts/audio-engineering` | Removed generic art-history sources and platform-specific loudness claims; aligned loudness facts to AES, ITU-R BS.1770, and EBU R 128. | Keep public |
| `arts/renaissance-art` | Removed unsupported 2025 art-book references; aligned Renaissance art, linear perspective, and chiaroscuro claims to Met, Smarthistory, and NGA sources. | Keep public |
| `business/management-styles` | Replaced broad management-style taxonomy with source-backed McGregor, Edmondson, and Google re:Work claims; lowered confidence to medium. | Keep public |
| `history/civil-rights-movement` | Removed broken sentence fragments and single-book overreach; aligned claims to King Institute and National Archives sources. | Keep public |
| `science/genetics-and-heredity` | Split bundled genetics claims into Mendelian inheritance, Human Genome Project, and CRISPR-Cas9 facts backed by NHGRI/MedlinePlus. | Keep public |
| `ai/ai-ethics-and-bias` | Replaced unofficial AI Act reference and lowered confidence; aligned claims to Gender Shades, ACM fairness survey, and European Commission AI Act source. | Keep public |
| `ai/ai-for-science` | Removed overstatement around AlphaFold and Nobel framing; aligned claims to AlphaFold, GNoME, and GraphCast sources. | Keep public |
| `ai/ai-for-visualization` | Removed speculative 2025-2026 LLM visualization claims; aligned facts to Data2Vis, Draco, and NL4DV. | Keep public |
| `ai/ai-governance-and-policy` | Replaced unofficial/future legal sources with European Commission, NIST AI RMF, and GOV.UK Bletchley Declaration sources. | Keep public |
| `geography/asian-geography` | Repaired broken area claim and replaced broad atlas evidence with Britannica Asia/Himalayas sources. | Keep public |
| `geography/economic-systems` | Replaced compressed textbook-backed claims with Britannica definitions of economic systems, mixed economy, and Keynesian economics. | Keep public |
| `geography/mount-everest` | Removed memoir-backed route/death/traffic claims; aligned height, location, and first ascent to Britannica and NASA. Also synchronized a duplicate historical verification-report entry for this file. | Keep public |
| `geography/north-america-geography` | Replaced one-textbook evidence with Britannica, EPA Great Lakes, and NPS Death Valley sources; added explicit note on the debated 1913 heat record. | Keep public |

## Audit Result

The regenerated audit report still contains 16 `repair_sources` recommendations, but they are a new risk-weighted sample:

- `keep_public`: 4
- `repair_sources`: 16
- `downgrade_confidence`: 0
- `move_to_draft`: 0

Those remaining `repair_sources` should be handled in a separate repair pass rather than mixed into this release.
