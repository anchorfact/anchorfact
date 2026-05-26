---
id: ai-drug-repurposing
title: 'AI for Drug Repurposing: Identifying New Uses for Existing Drugs Through Machine Learning'
schema_type: article
category: ai
language: en
confidence: high
last_verified: '2026-05-26'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-ai-drug-repurposing-1
    statement: >-
      AI drug repurposing (2020-2026): ML models (knowledge graph embeddings, matrix factorization, deep learning) predict novel drug-disease associations by integrating multi-modal data: drug
      molecular structure, protein targets, gene expression signatures, clinical side effects, and electronic health records. During COVID-19, AI repurposing identified baricitinib (rheumatoid
      arthritis drug) as a COVID-19 treatment, later validated in ACTT-2 trial and granted FDA EUA.
    source_title: BenevolentAI (2020) -- baricitinib COVID repurposing / Recursion Pharmaceuticals / Healx / TwoXAR / Atomwise drug repurposing
    source_url: https://arxiv.org/search/?query=drug+repurposing+machine+learning+knowledge+graph
    confidence: high
  - id: af-ai-drug-repurposing-2
    statement: >-
      Knowledge graph-based drug repurposing (2023-2026): platforms like Healx, BenevolentAI, and IBM Watson for Drug Discovery construct biomedical knowledge graphs (10M+ nodes: drugs, targets,
      diseases, genes, pathways) and use graph neural networks or knowledge graph embeddings (TransE, RotatE, ComplEx) to predict novel links. Healx (2025) advanced an AI-discovered repurposed drug
      for Fragile X syndrome to Phase 2a clinical trials.
    source_title: Healx (2024-2025) -- AI drug repurposing / BenevolentAI knowledge graph / IBM Watson / BioSNAP / Hetionet biomedical KG
    source_url: https://arxiv.org/search/?query=AI+drug+repositioning+clinical+trial
    confidence: high
primary_sources:
  - id: ps-ai-drug-repurposing-1
    title: 'Machine Learning for Drug Repurposing: Knowledge Graph Approaches, Transcriptomic Signatures, and Clinical Validation (2024-2025 Survey)'
    type: academic_paper
    year: 2025
    institution: Nature Reviews Drug Discovery / Briefings in Bioinformatics / arXiv
    url: https://arxiv.org/search/?query=drug+repurposing+machine+learning+knowledge+graph
  - id: ps-ai-drug-repurposing-2
    title: 'AI-Driven Drug Repositioning: From Computational Predictions to Clinical Trials (BenevolentAI, Healx case studies)'
    type: academic_paper
    year: 2025
    institution: The Lancet Digital Health / Nature Medicine / arXiv
    url: https://arxiv.org/search/?query=AI+drug+repositioning+clinical+trial
  - title: An in silico drug repurposing pipeline to identify drugs with the potential to inhibit SARS-CoV-2 replication
    authors:
      - Méabh MacMahon
      - Woochang Hwang
      - Soorin Yim
      - Eoghan MacMahon
      - Alexandre Abraham
      - Justin Barton
      - Mukunthan Tharmakulasingam
      - Paul Bilokon
      - Vasanthi Priyadarshini Gaddi
      - Namshik Han
    year: 2021
    doi: 10.1016/j.imu.2023.101387
    url: https://arxiv.org/abs/2107.02905v2
    type: academic_paper
    institution: arXiv
known_gaps:
  - Prospective clinical validation of AI-repurposed drugs (retrospective vs prospective gap)
  - Regulatory approval pathways for AI-discovered drug repurposing indications
disputed_statements: []
secondary_sources:
  - title: Applications of Artificial Intelligence in Drug Repurposing
    type: survey_paper
    year: 2025
    authors:
      - Wan, Zhaoman
      - Sun, Xinran
      - Li, Yi
      - Chu, Tianyao
      - Hao, Xueyu
      - et al.
    institution: Advanced Science (Wiley)
    url: https://doi.org/10.1002/advs.202411325
  - title: Deep Learning Large-Scale Drug Discovery and Repurposing
    type: journal_article
    year: 2024
    authors:
      - multiple
    institution: Nature Computational Science
    url: https://doi.org/10.1038/s43588-024-00679-4
  - title: 'AI-Driven Drug Repurposing: Applications and Opportunities'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Medicines (MDPI)
    url: https://doi.org/10.3390/medicines12040028
  - title: 'Combining Deep Learning Models for Improved Drug Repurposing: A Comparative Study'
    type: conference_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE Access / ISIVC
    url: https://doi.org/10.1109/ISIVC61350.2024.10544998
updated: '2026-05-24'
---


## TL;DR
AI drug repurposing finds new uses for existing drugs -- identifying that a rheumatoid arthritis drug could treat COVID-19, or that an old antidepressant might work for a rare disease. Knowledge graphs and transcriptomic ML slash drug discovery timelines from 10+ years to months.

## Core Explanation
Drug repurposing: find new indications for approved drugs. Advantages over de novo discovery: known safety profile (already passed Phase I), existing manufacturing, faster regulatory path (505(b)(2)). AI approaches: (1) Knowledge graph embedding -- biomedical KG (drug-protein-disease-gene) -> predict missing links; (2) Transcriptomic signature matching -- drug-induced gene expression changes (LINCS L1000) vs disease expression signatures. If drug reverses disease signature, it may treat the disease; (3) Molecular docking + ML -- screen drug library against new protein targets.

## Detailed Analysis
COVID-19 repurposing: BenevolentAI KG (Jan 2020) identified baricitinib as potential COVID treatment based on predicted AAK1 inhibition (viral entry mechanism). ACTT-2 trial (Sept 2020) showed baricitinib + remdesivir reduced recovery time by 1 day. FDA EUA Nov 2020. Healx (Cambridge, 2014-2025): AI platform HealNet predicts drug-disease matches from KG of 1M+ biomedical concepts. Drug for Fragile X syndrome (HLX-1502) predicted by AI in 18 months vs typical 5-10 years, now in Phase 2a. Recursion Pharmaceuticals: computer vision on cellular microscopy images. Screen approved drugs for effects on disease-relevant cellular phenotypes. Hetionet (2017): openly published biomedical KG enabling algorithmic repurposing. Key challenge: AI predictions are retrospective (predicting known drug-disease pairs) -- prospective validation requires clinical trials. Few AI-repurposed drugs have completed Phase 3 yet.

## Related Articles

- [Adversarial Machine Learning: Attacks, Defenses, and Robustness Engineering](../adversarial-machine-learning.md)
- [AI Democratization: Open-Source Models, Low-Code AI, and Accessible Machine Learning](../ai-for-democratization.md)
- [Anomaly Detection in Machine Learning](../anomaly-detection.md)
