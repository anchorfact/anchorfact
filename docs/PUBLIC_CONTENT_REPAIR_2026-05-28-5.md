# AnchorFact Public Content Repair - 2026-05-28 Batch 5

## Summary

This repair pass addressed the next 16 `repair_sources` articles from the refreshed public content audit after `fix: restore climate zones verification entry`.

Scope was intentionally limited to the sampled public articles. No site-wide quality rule was tightened, no generated `dist/` output was committed, and no full verifier run was performed locally. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only, because public eligibility is based on `primary_sources` coverage.

Post-repair local build counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1540
- Source verification rate in snapshot: 48.4%
- Manual-reviewed verification entries: 82

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `arts/political-philosophy` | Removed future/fabricated source metadata and narrowed claims to Rawls, Berlin, and Arendt sources. | Keep public |
| `business/economics-fundamentals` | Replaced broad economics-history claims with supply, demand, and equilibrium facts from OpenStax and MIT OCW. | Keep public |
| `business/strategic-management-theory` | Removed generic and future book sources; aligned Porter, Barney RBV, and Blue Ocean Strategy claims to direct sources. | Keep public |
| `geography/desert-ecosystems` | Removed unrelated software-ecosystem sources and aligned aridity, land-degradation, and CAM-photosynthesis facts to NASA, UNCCD, and OpenStax. | Keep public |
| `history/ancient-mesopotamia` | Replaced weak book/future sources with British Museum, Louvre, and Britannica evidence for Mesopotamia, Hammurabi, and Gilgamesh. | Keep public |
| `history/world-war-ii-overview` | Removed unsupported future-edition metadata and narrowed claims to Britannica and Imperial War Museums timeline evidence. | Keep public |
| `science/astronomy-and-cosmology` | Replaced generic textbook/JWST coverage with Planck 2018 and Event Horizon Telescope DOI-backed claims. | Keep public |
| `science/environmental-science` | Replaced weak textbook/future sources with IPCC AR6, Richardson planetary-boundaries, and IPBES evidence. | Keep public |
| `ai/ai-in-healthcare` | Replaced mismatched AlphaFold/Topol evidence with CheXNet, Nature breast-screening, and FDA AI-enabled medical-device sources. | Keep public |
| `ai/ai-red-teaming-and-safety` | Replaced broad survey claims with Red Teaming LMs, Constitutional AI, and OWASP LLM Top 10 sources. | Keep public |
| `ai/ai-training-data-curation` | Aligned data-curation claims to DataPerf, Dolma, and METRIC framework evidence. | Keep public |
| `ai/ai-video-generation` | Removed commercial-frontier hype and aligned Sora, Veo, and Imagen Video claims to official and paper sources with medium claim confidence. | Keep public |
| `geography/ocean-currents` | Removed generic secondary homepages, duplicate body facts, and unsupported AMOC impact wording; aligned currents, gyres, and garbage-patch claims to NOAA sources. | Keep public |
| `geography/oceania-geography` | Removed generic dispute text and single-source bundled claims; aligned regional, language, and small-island climate-risk facts to Britannica, CIA, and IPCC sources. | Keep public |
| `geography/south-america-geography` | Removed generic dispute text, mojibake, and volatile city-rank claims; aligned continent, Andes, and Amazon Basin facts to Britannica sources. | Keep public |
| `history/enlightenment-era` | Replaced bundled Enlightenment claims with separate Britannica and Stanford Encyclopedia evidence for the movement, Montesquieu, and the Encyclopedie. | Keep public |

## Audit Result

After rebuilding and rerunning `npm run audit-public-sample`, the refreshed sample reports:

- `keep_public`: 4
- `repair_sources`: 16
- `downgrade_confidence`: 0
- `move_to_draft`: 0

The remaining `repair_sources` entries are a new risk-weighted sample and should be handled in a separate repair pass.
