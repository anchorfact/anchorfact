# Public Content Repair - 2026-05-28-17

## Summary

Continued the sampled public evidence repair after `fix: repair seventeenth public evidence sample`.
This pass repaired 11 sampled `repair_sources` entries from `PUBLIC_CONTENT_AUDIT_2026-05-27.md`
without running local `verify-full` and without staging generated `dist/` output.

Each repaired article was narrowed to three source-mapped public facts, with generic homepage,
future-dated, duplicate, broken encoded, and claim-evidence drift patterns removed.

## Repaired Articles

| Slug | Main source set |
|---|---|
| `ai/ai-agents` | LangChain agents docs, Model Context Protocol docs, Claude Code docs |
| `ai/ai-coding-assistants` | Microsoft Research Copilot productivity study, SWE-bench, Claude Code docs |
| `ai/ai-in-gaming` | AlphaStar Nature paper, Google DeepMind SIMA, NVIDIA ACE for Games |
| `ai/ai-regulation-landscape` | EU AI Act EUR-Lex, White House AI Bill of Rights, China CAC interim generative AI measures |
| `game-development/core-mechanics` | MDA paper, Game Programming Patterns Game Loop, Game Programming Patterns State |
| `game-development/game-art-pipeline` | Unity model import docs, glTF 2.0 specification, OpenUSD introduction |
| `game-development/game-mathematics` | Unity Vector3, Unity Quaternion, Unity Matrix4x4 |
| `game-development/narrative-design` | ink narrative scripting, Yarn Spinner first steps, Twine basic concepts |
| `game-development/physics-systems` | Unity built-in 3D physics, Unity Rigidbody, Box2D documentation |
| `game-development/monetization-strategy` | Apple In-App Purchase, Google Play billing, FTC dark patterns report |
| `business/entrepreneurship-and-startups` | Lean Startup methodology, Strategyzer Business Model Canvas, GEM 2024/2025 Global Report |

## Verification Notes

- Targeted hygiene check for the 11 repaired articles: `sources=3/3`, `facts=3/3`,
  `weak=0`, `broken=0`, `flags=none` for every article.
- `verification-report.json` was updated only for these targeted article entries, with manual-review
  metadata noting that local `verify-full` was not run.
- The verification summary is now `61.5%` overall verification rate with `242` manual-reviewed
  articles.
- The refreshed audit snapshot is `555 public / 445 draft / 1570 claims`.
- The repaired entries no longer appear in the refreshed repair queue. The next audit queue contains
  8 `repair_sources` entries:
  `ai/anomaly-detection`, `ai/model-merging-and-ensembling`,
  `game-development/procedural-generation`, `computer-science/websocket`, `ai/mcp`,
  `business/a-b-testing`, `ai/attention-vs-self-attention`, and
  `business/dropshipping-model`.
- The refreshed audit also flags 2 high-confidence downgrade candidates:
  `computer-science/cap-theorem` and `computer-science/technical-debt`.

## Local Checks

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

All checks passed. `npm audit` reported `found 0 vulnerabilities`.
