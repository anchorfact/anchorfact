# Public Content Repair - 2026-05-28 Pass 24

## Scope

This pass repaired the latest 10 sampled `repair_sources` entries from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`: `ai/ai-for-drug-discovery`, `ai/ai-for-energy`, `ai/ai-for-fraud-detection`, `geography/south-american-geography`, `health/epidemiology-fundamentals`, `health/nutrition-science`, `health/sleep-science-and-circadian-rhythms`, `history/cold-war-history`, `history/scientific-revolution`, `science/galaxies-and-the-universe`.

Scope remained limited to sampled public evidence. No local `verify-full` run was performed, and generated `dist/` output is excluded from the commit. The bounded `verification-report.json` update records targeted manual review for these entries only.

## Repair Summary

| Article | Evidence repair | Public action |
|---|---|---|
| `ai/ai-for-drug-discovery` | Replaced future assessment evidence with AlphaFold 3, DiffDock, and REINVENT sources. | Keep public at medium confidence |
| `ai/ai-for-energy` | Replaced future efficiency claims with IEA, NREL, and DeepMind energy-optimization evidence. | Keep public at medium confidence |
| `ai/ai-for-fraud-detection` | Replaced future fraud-model claims with systematic review and graph-fraud research sources. | Keep public at medium confidence |
| `geography/south-american-geography` | Replaced fabricated regional book entries with Britannica, WWF, and Andes evidence. | Keep public at medium confidence |
| `health/epidemiology-fundamentals` | Replaced broad textbook sources with CDC definition, Snow, and Bradford Hill evidence. | Keep public at medium confidence |
| `health/nutrition-science` | Replaced textbook drift with WHO dietary guidance, PREDIMED, and EAT-Lancet evidence. | Keep public at medium confidence |
| `health/sleep-science-and-circadian-rhythms` | Replaced book-only evidence with Nobel, sleep-duration consensus, and glymphatic-clearance sources. | Keep public at medium confidence |
| `history/cold-war-history` | Replaced fabricated future Cold War books with Britannica Cold War, Cuban Missile Crisis, and Berlin Wall evidence. | Keep public at medium confidence |
| `history/scientific-revolution` | Replaced duplicate/future bibliography entries with Britannica Scientific Revolution, Copernican, and Newton sources. | Keep public at medium confidence |
| `science/galaxies-and-the-universe` | Replaced Cosmos-only evidence with NASA galaxy, Milky Way, and Andromeda collision sources. | Keep public at medium confidence |

## Verification Notes

- Each repaired article now has 3 primary sources and 3 atomic facts.
- Each atomic fact maps by `source_title` and `source_url` to one of the article's `primary_sources`.
- Generic homepage sources, unrelated secondary sources, generic dispute statements, duplicate facts, and future/fabricated bibliography entries were removed from the sampled set.
- Manual-review metadata note: "Twenty-fourth targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
