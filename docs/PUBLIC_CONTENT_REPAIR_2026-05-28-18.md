# Public Content Repair - 2026-05-28-18

## Summary

Continued the sampled public evidence repair after `fix: repair eighteenth public evidence sample`.
This pass repaired 8 sampled `repair_sources` entries and 2 sampled `downgrade_confidence`
entries from `PUBLIC_CONTENT_AUDIT_2026-05-27.md` without running local `verify-full` and
without staging generated `dist/` output.

The repair narrowed each target to three source-mapped public facts, removed generic homepage
sources, removed generic dispute statements, removed future or fabricated citations, and lowered
overconfident sampled entries to `medium`.

## Repaired Articles

| Slug | Main source set |
|---|---|
| `ai/anomaly-detection` | Chandola anomaly survey, Isolation Forest DOI, ACM deep anomaly detection review |
| `ai/model-merging-and-ensembling` | Model Soups, TIES-Merging, Deep Ensembles |
| `game-development/procedural-generation` | Springer PCG textbook, Perlin image synthesizer DOI, Wave Function Collapse |
| `computer-science/cap-theorem` | Brewer PODC keynote DOI, Gilbert-Lynch CAP proof DOI, Brewer 2012 clarification |
| `computer-science/technical-debt` | Cunningham WyCash report, IEEE Software technical debt article, JSS systematic mapping study |
| `computer-science/websocket` | RFC 6455, MDN WebSocket API, MDN WebSocket client guide |
| `ai/mcp` | Anthropic MCP announcement, MCP introduction, MCP architecture documentation |
| `business/a-b-testing` | Kohavi web experiments paper, Cambridge online experiments book, Microsoft experimentation paper |
| `ai/attention-vs-self-attention` | Bahdanau attention, Attention Is All You Need, Efficient Transformers survey |
| `business/dropshipping-model` | Shopify dropshipping guide, Amazon dropshipping policy, FTC mail/internet order guidance |

## Verification Notes

- Targeted hygiene check for the 10 repaired sampled articles: `sources=3/3`, `facts=3/3`,
  `weak=0`, `broken=0`, `flags=none` for every article.
- `verification-report.json` was updated only for these targeted entries, with manual-review
  metadata noting that local `verify-full` was not run.
- The verification summary is now `62.1%` overall verification rate with `252` manual-reviewed
  articles.
- The refreshed audit snapshot is `555 public / 445 draft / 1568 claims`.
- The refreshed sample moved the repaired entries and downgrade candidates out of the current
  queue. The next audit queue contains 10 `repair_sources` entries:
  `ai/3d-human-modeling`, `ai/ai-content-moderation-platforms`, `ai/ai-digital-forensics`,
  `business/private-label-products`, `game-development/game-ui-ux-design`,
  `history/indian-independence-movement`, `history/ming-dynasty`, `history/tang-dynasty`,
  `science/mars-exploration`, and `self-improvement/emotional-intelligence`.

## Local Checks

- `npm.cmd test`
- `npm.cmd run quality`
- `npm.cmd run build`
- `npm.cmd run audit-public-sample`
- `npm.cmd audit`

All checks passed. `npm audit` reported `found 0 vulnerabilities`.
