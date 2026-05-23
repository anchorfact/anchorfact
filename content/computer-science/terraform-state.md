---
id: "kb-2026-00315"


title: "Terraform State"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Terraform State Documentation"
    type: "documentation"


    year: 2026
    url: "https://developer.hashicorp.com/terraform/language/state"

    institution: "HashiCorp"
    note: "State file (terraform.tfstate): remote backends, locking, state drift detection, sensitive data handling"


secondary_sources:
  - title: "Terraform: Up & Running (3rd Edition)"
    authors: ["Brikman, Yevgeniy"]
    type: "book"


    year: 2022
    url: "https://www.oreilly.com/library/view/terraform-up/9781098116736/"

    institution: "O'Reilly"
    note: "Production Terraform patterns: state management strategies, team collaboration, CI/CD integration"


completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
ai_citations:
---

## TL;DR

Terraform state (`terraform.tfstate`) is a JSON file mapping real-world resources to Terraform configuration. It is the source of truth for Terraform's understanding of infrastructure. Remote state (S3 + DynamoDB locking) is essential for team collaboration.

## Core Explanation

State locking: DynamoDB prevents concurrent modifications. `terraform import` adds existing resources to state without recreating them. `terraform state mv` moves resources between states. `terraform state rm` removes from state without destroying. State drift detection: `terraform refresh` updates state to match reality. Never edit state manually — use Terraform commands.

## Further Reading

- [Terraform State Documentation](https://developer.hashicorp.com/terraform/language/state)
