# Public Content Repair - 2026-05-28-15

## Summary

Continued the sampled public evidence repair after `fix: repair fifteenth public evidence sample`.
This pass repaired 11 sampled `repair_sources` entries from `PUBLIC_CONTENT_AUDIT_2026-05-27.md`
without running local `verify-full` and without staging generated `dist/` output.

The repair style stayed conservative: each article now keeps a compact public claim set, removes weak
or generic evidence, and maps every atomic fact to a matching primary source.

## Repaired Articles

| Slug | Main source set |
|---|---|
| `computer-science/graphql-schema-design` | GraphQL Learn schema/queries and GraphQL October 2021 specification |
| `computer-science/css` | W3C CSS Snapshot 2024 and MDN CSS references |
| `computer-science/dart-language` | Dart overview, language, and sound null safety documentation |
| `computer-science/dijkstra-s-algorithm` | Dijkstra 1959 DOI, NIST DADS, Princeton Algorithms |
| `game-development/shader-programming` | Khronos GLSL, Microsoft HLSL, W3C WGSL |
| `arts/digital-art-history` | ICA Cybernetic Serendipity archive, Christies Beeple result, MIT Press new media art |
| `arts/photography-fundamentals` | Britannica photography technology, Nikon exposure basics, MoMA Robert Frank |
| `science/coral-reefs` | NOAA coral species, UNESCO Great Barrier Reef, GCRMN 2020 report |
| `science/geological-time` | International Chronostratigraphic Chart, USGS geologic time, Patterson Earth-age DOI |
| `science/newton-s-laws-of-motion` | Newton Principia and NASA Glenn first/second law explainers |
| `science/ocean-life` | NOAA ocean water, coral species, and hydrothermal vent explainers |

## Verification Notes

- Targeted hygiene check for the 11 repaired articles: `sources=3/3`, `facts=3/3`, `weak=0`,
  `broken=0`, `flags=none` for every article.
- `verification-report.json` was updated only for these targeted article entries, with manual-review
  metadata noting that local `verify-full` was not run.
- The refreshed audit snapshot is now `555 public / 445 draft / 1577 claims`.
- The refreshed sample moved these repaired articles out of the current repair queue. The next audit
  queue contains 11 `repair_sources` entries:
  `science/particle-physics`, `sports/sports-exercise-physiology`, `sports/sports-nutrition`,
  `ai/ai-agent-frameworks`, `game-development/accessibility-guide`,
  `game-development/animation-state-machines`, `game-development/audio-design-guide`,
  `game-development/game-localization`, `game-development/input-systems-accessibility`,
  `game-development/performance-optimization`, and `game-development/story-architecture-code`.

## Local Checks

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

All checks passed. `npm audit` reported `found 0 vulnerabilities`.
