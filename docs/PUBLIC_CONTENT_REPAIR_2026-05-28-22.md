# Public Content Repair - 2026-05-28 Pass 22

## Scope

This pass repaired the latest 10 sampled `repair_sources` entries from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`: `ai/ai-for-climate-science`, `ai/ai-for-complex-networks`, `ai/ai-for-cultural-heritage`, `business/networking-skills`, `business/risk-management`, `computer-science/content-delivery-network-cdn`, `computer-science/graphql`, `computer-science/tauri`, `computer-science/webpack`, and `geography/european-union`.

Scope remained limited to sampled public evidence. No local `verify-full` run was performed, and generated `dist/` output is excluded from the commit. The bounded `verification-report.json` update records targeted manual review for these entries only.

## Repair Summary

| Article | Evidence repair | Public action |
|---|---|---|
| `ai/ai-for-climate-science` | Replaced weak/future evidence with GraphCast, FourCastNet, and NeuralGCM sources. | Keep public at medium confidence |
| `ai/ai-for-complex-networks` | Replaced weak evidence with GCN, GAT, and NetworkX algorithm sources. | Keep public at medium confidence |
| `ai/ai-for-cultural-heritage` | Replaced drifting evidence with Ithaca, Vesuvius Challenge/NEH, and Art Camera sources. | Keep public at medium confidence |
| `business/networking-skills` | Replaced generic evidence with weak ties, leadership networking, and LinkedIn Help sources. | Keep public at medium confidence |
| `business/risk-management` | Replaced generic evidence with ISO 31000, COSO ERM, and NIST RMF sources. | Keep public at medium confidence |
| `computer-science/content-delivery-network-cdn` | Replaced weak evidence with Cloudflare CDN, RFC 9111, and MDN Cache-Control sources. | Keep public at medium confidence |
| `computer-science/graphql` | Replaced weak evidence with GraphQL spec, query docs, and GraphQL-over-HTTP draft sources. | Keep public at medium confidence |
| `computer-science/tauri` | Replaced weak evidence with Tauri architecture, process model, and security docs. | Keep public at medium confidence |
| `computer-science/webpack` | Replaced weak evidence with webpack concepts, loaders, and plugins docs. | Keep public at medium confidence |
| `geography/european-union` | Replaced weak evidence with official EU country, values, and euro sources. | Keep public at medium confidence |

## Verification Notes

- Each repaired article now has 3 primary sources and 3 atomic facts.
- Each atomic fact maps by `source_title` and `source_url` to one of the article's `primary_sources`.
- Generic homepage sources, duplicated source entries, generic dispute statements, and future/fabricated bibliography entries were removed from the sampled set.
- Manual-review metadata note: "Twenty-second targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
