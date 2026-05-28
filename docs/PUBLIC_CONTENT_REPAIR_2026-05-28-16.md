# Public Content Repair - 2026-05-28-16

## Summary

Continued the sampled public evidence repair after `fix: repair sixteenth public evidence sample`.
This pass repaired 11 sampled `repair_sources` entries from `PUBLIC_CONTENT_AUDIT_2026-05-27.md`
without running local `verify-full` and without staging generated `dist/` output.

The repair narrowed each article to three source-mapped public facts, removed generic homepage and
generic dispute patterns, and replaced broken game-development mojibake entries with compact,
English, source-backed public articles.

## Repaired Articles

| Slug | Main source set |
|---|---|
| `science/particle-physics` | CERN Standard Model, ATLAS Higgs observation DOI, Particle Data Group review DOI |
| `sports/sports-exercise-physiology` | Physical Activity Guidelines for Americans, ACSM exercise prescription position stand, Cell exercise biology review |
| `sports/sports-nutrition` | ACSM nutrition and athletic performance, ISSN protein position stand, IOC supplement consensus |
| `ai/ai-agent-frameworks` | LangChain agents docs, Microsoft AutoGen AgentChat docs, CrewAI agents docs |
| `game-development/accessibility-guide` | Xbox Accessibility Guidelines, WCAG 2.2 keyboard guidance, Game Accessibility Guidelines remapping guidance |
| `game-development/animation-state-machines` | Unity Animator Controllers, Unreal State Machines, Game Programming Patterns State |
| `game-development/audio-design-guide` | Unity audio overview, Unity Audio Source, FMOD Studio concepts |
| `game-development/game-localization` | W3C localization/i18n guidance, Unity Localization package, Unicode UTS #35 |
| `game-development/input-systems-accessibility` | Xbox Accessibility Guideline 107, WCAG keyboard guidance, Game Accessibility Guidelines remapping guidance |
| `game-development/performance-optimization` | Unity Profiler, Unreal performance profiling, AMD GPUOpen RDNA performance guide |
| `game-development/story-architecture-code` | ink narrative scripting, Yarn Spinner scripting fundamentals, Yarn Spinner nodes and lines |

## Verification Notes

- Targeted hygiene check for the 11 repaired articles: `sources=3/3`, `facts=3/3`, `weak=0`,
  `broken=0`, `flags=none` for every article.
- `verification-report.json` was updated only for these targeted article entries, with manual-review
  metadata noting that local `verify-full` was not run.
- The verification summary is now `61.0%` overall verification rate with `231` manual-reviewed
  articles.
- The refreshed audit snapshot is now `555 public / 445 draft / 1570 claims`.
- The refreshed sample moved these repaired articles out of the current repair queue. The next audit
  queue contains 11 `repair_sources` entries:
  `ai/ai-agents`, `ai/ai-coding-assistants`, `ai/ai-in-gaming`,
  `ai/ai-regulation-landscape`, `game-development/core-mechanics`,
  `game-development/game-art-pipeline`, `game-development/game-mathematics`,
  `game-development/narrative-design`, `game-development/physics-systems`,
  `game-development/monetization-strategy`, and `business/entrepreneurship-and-startups`.

## Local Checks

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

All checks passed. `npm audit` reported `found 0 vulnerabilities`.
