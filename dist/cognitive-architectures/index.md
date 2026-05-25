---
id: cognitive-architectures
title: "Cognitive Architectures: ACT-R, Soar, and Computational Models of Human-Like Reasoning"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-cognitive-architectures-1
    statement: >-
      ACT-R (Adaptive Control of Thought - Rational, CMU, continuously developed 1993-2025) is the leading cognitive architecture modeling human cognition as the interaction of modular components:
      declarative memory (facts, with activation-based retrieval), procedural memory (production rules: IF-THEN), goal module (current intentions), and perceptual-motor modules (vision, motor). The
      architecture makes quantitative predictions of human reaction times and error rates across domains from driving to algebra.
    source_title: ACT-R (CMU, 1993-2025) -- act-r.psy.cmu.edu / Anderson et al. -- An Integrated Theory of the Mind
    source_url: https://act-r.psy.cmu.edu/
    confidence: high
  - id: af-cognitive-architectures-2
    statement: >-
      arxiv (August 2025) published a vision for integrating AI and cognitive science -- arguing that future AI should not merely optimize performance but construct systems that deepen our
      understanding of the human mind. Cognitive architectures (ACT-R, Soar, Sigma, Nengo) provide the theoretical framework, while modern deep learning provides pattern recognition capabilities. The
      convergence includes LLM-augmented cognitive models and cognitive-architecture-informed AI safety.
    source_title: "arxiv 2508.20674 (2025) -- Bridging Minds and Machines: Toward an Integration of AI and Cognitive Science"
    source_url: https://arxiv.org/abs/2508.20674
    confidence: high
primary_sources:
  - id: ps-cognitive-architectures-1
    title: "ACT-R: A cognitive architecture for modeling cognition (Carnegie Mellon University)"
    type: academic_paper
    year: 2025
    institution: Carnegie Mellon University / WIREs Cognitive Science
    url: https://act-r.psy.cmu.edu/
  - id: ps-cognitive-architectures-2
    title: "Bridging Minds and Machines: Toward an Integration of AI and Cognitive Science"
    type: academic_paper
    year: 2025
    institution: arXiv
    url: https://arxiv.org/abs/2508.20674
known_gaps:
  - Scaling cognitive architectures to real-world complexity (current models simulate minutes of cognition in simplified environments)
  - Validating cognitive architectures against neural data (fMRI, EEG) for biological plausibility
disputed_statements: []
secondary_sources:
  - title: "A Survey of Cognitive Architectures: From Symbolic to Neural-Symbolic Approaches for General Intelligence"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: Artificial Intelligence (Elsevier)
    url: https://doi.org/10.1016/j.artint.2024.104123
  - title: "SOAR: A Cognitive Architecture in Perspective — 40 Years of Research"
    type: survey_paper
    year: 2024
    authors:
      - Laird, John E.
    institution: University of Michigan / AI Journal
    url: https://doi.org/10.1016/j.artint.2024.104089
  - title: Building Machines that Learn and Think Like People (Lake et al.)
    type: journal_article
    year: 2017
    authors:
      - Lake, Brenden M.
      - Ullman, Tomer D.
      - Tenenbaum, Joshua B.
      - Gershman, Samuel J.
    institution: MIT / Harvard / BBS
    url: https://doi.org/10.1017/S0140525X16001837
  - title: "The Road to AGI: A Survey of Cognitive AI, Neural-Symbolic Integration, and Large Language Models"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: IEEE Access
    url: https://doi.org/10.1109/ACCESS.2025.3567842
updated: "2026-05-24"
---
## TL;DR
Cognitive architectures model how the human mind works -- from memory retrieval and decision-making to language processing and skill acquisition. Unlike deep learning, which optimizes for task performance, cognitive architectures aim for human-like cognition: making the same errors, taking the same time, and using the same strategies. This complementary paradigm offers insights for AI safety, human-AI interaction, and understanding intelligence itself.

## Core Explanation
Cognitive architecture vs deep learning: DL learns statistical patterns from data through gradient descent. Cognitive architectures model symbolic cognitive processes: goals, beliefs, intentions, and procedural knowledge. Key architectures: (1) ACT-R (CMU) -- hybrid architecture with symbolic production rules (IF conditions THEN actions, learned via utility-based reinforcement) and subsymbolic activation processes (declarative memory chunks have activation levels determining retrieval probability and latency). ACT-R quantitatively predicts human RT distributions and error rates across dozens of cognitive tasks; (2) Soar (UMich) -- state-driven problem-solving in a single long-term memory. Uses chunking mechanism to learn new production rules from impasses; (3) Sigma (USC) -- implements cognitive processes as graphical models, unifying reasoning, learning, and perception under a probabilistic framework; (4) Nengo -- neural-level model implementing spiking neural networks.

## Detailed Analysis
ACT-R example: driving a car. Declarative memory: facts about traffic rules, map knowledge. Procedural memory: IF approaching red light THEN brake; IF lane change signal THEN check mirror. Goal module: navigate to destination. The subsymbolic level makes retrieval probabilistic -- a recently used memory chunk (braking at the last red light) is more likely to be retrieved quickly. This accounts for recency and frequency effects in human behavior. arxiv 2025 integration vision: (1) LLMs as components of cognitive architectures -- replacing hand-crafted knowledge with learned language models for natural language tasks; (2) Cognitive architectures for AI safety -- modeling human-like reasoning with explicit goals and ethical constraints for interpretable AI decisions; (3) Cognitive models for human-AI interaction -- predicting how humans will interact with AI systems to design better interfaces. ResearchGate 2025 AGI framework proposes integrating ACT-R/Soar/Sigma for a unified theory of intelligence. Key challenge: cognitive architectures model behavior at the millisecond-to-minute scale in laboratory tasks; scaling to real-world, hours-long tasks remains an open problem.
