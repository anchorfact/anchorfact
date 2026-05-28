# Public Content Repair - 2026-05-28 Pass 21

## Scope

This pass repaired the latest sampled public evidence entries from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`: `ai/ai-for-agriculture`, `ai/ai-for-augmented-reality`, `ai/ai-for-chip-design`, `computer-science/django`, `computer-science/markdown`, `science/endangered-species`, `ai/generative-ai-overview`, `business/amazon-fba-fulfillment-by-amazon`, and `business/digital-marketing-fundamentals`. It also handled the sampled `downgrade_confidence` entry `computer-science/amazon-web-services-aws` by lowering confidence and repairing drifted sources.

Scope remained limited to sampled public evidence. No local `verify-full` run was performed, and generated `dist/` output is excluded from the commit. The bounded `verification-report.json` update records targeted manual review for these entries only.

## Repair Summary

| Article | Evidence repair | Public action |
|---|---|---|
| `ai/ai-for-agriculture` | Replaced future and overbroad evidence with PlantVillage, image-based disease detection, and See & Spray sources. | Keep public at medium confidence |
| `ai/ai-for-augmented-reality` | Replaced generic platform sources with Apple Vision Pro, ARCore Depth API, and ORB-SLAM3 evidence. | Keep public at medium confidence |
| `ai/ai-for-chip-design` | Replaced weak or drifting evidence with graph placement, DREAMPlace, and cuLitho sources. | Keep public at medium confidence |
| `computer-science/amazon-web-services-aws` | Lowered confidence and replaced generic docs/fabricated sources with AWS definition, Regions/AZs, and Well-Architected evidence. | Downgrade to medium confidence |
| `computer-science/django` | Replaced generic docs and future comparisons with Django overview, ORM, and template documentation. | Keep public at medium confidence |
| `computer-science/markdown` | Replaced weak claims with Daring Fireball, CommonMark, and GitHub Flavored Markdown evidence. | Keep public at medium confidence |
| `science/endangered-species` | Replaced broad and duplicated Red List claims with IUCN categories, IPBES assessment, and bald eagle recovery evidence. | Keep public at medium confidence |
| `ai/generative-ai-overview` | Reconciled primary sources with GAN, DDPM, and GPT-3 atomic facts. | Keep public at medium confidence |
| `business/amazon-fba-fulfillment-by-amazon` | Replaced generic homepage evidence with Amazon FBA and pricing documentation. | Keep public at medium confidence |
| `business/digital-marketing-fundamentals` | Replaced generic homepage evidence with Google SEO, Ads, and GA4 documentation. | Keep public at medium confidence |

## Verification Notes

- Each repaired article now has 3 primary sources and 3 atomic facts.
- Each atomic fact maps by `source_title` and `source_url` to one of the article's `primary_sources`.
- Generic homepage sources, duplicated source entries, generic dispute statements, and future/fabricated bibliography entries were removed from the sampled set.
- Manual-review metadata note: "Twenty-first targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
