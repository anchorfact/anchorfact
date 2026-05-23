---
id: "ai-satellite-imagery"
title: "AI for Satellite Imagery: Object Detection, Change Detection, and Global Monitoring"
schema_type: "article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-4.5-sonnet"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"
completeness: 0.85
atomic_facts:
  - id: "af-ai-satellite-imagery-1"
    statement: "AI satellite imagery analysis (2023-2026): deep learning object detection (YOLO, DETR) identifies ships, aircraft, buildings, vehicles, and infrastructure from sub-meter resolution satellite imagery (Maxar 30cm, Planet 3m, Airbus 30cm). National geospatial agencies (NGA, NRO) deploy AI for automated intelligence analysis. Commercial platforms (Orbital Insight, Descartes Labs, SpaceKnow) serve enterprise customers with AI-derived geospatial intelligence."
    source_title: "Maxar / Planet / Airbus satellite imagery + AI / Orbital Insight / Descartes Labs / SpaceKnow geospatial AI"
    source_url: "https://arxiv.org/search/?query=satellite+object+detection+foundation+model"
    confidence: "high"
  - id: "af-ai-satellite-imagery-2"
    statement: "Foundation models for satellite imagery: NASA+IBM Prithvi (2023-2025) and Clay Foundation Model (2024) pretrain ViT-based architectures on global satellite data, enabling few-shot fine-tuning for applications including: military infrastructure monitoring, agricultural yield forecasting, deforestation tracking, and humanitarian crisis mapping. These models reduce the labeled data requirement from thousands of examples to 100-500, democratizing satellite AI."
    source_title: "NASA+IBM Prithvi geospatial FM (2023-2025) / Clay Foundation Model (2024) / SatMAE / Scale-MAE / GeoFMBench"
    source_url: "https://arxiv.org/search/?query=geospatial+foundation+model+satellite"
    confidence: "high"
primary_sources:
  - id: "ps-ai-satellite-imagery-1"
    title: "Deep Learning for Satellite Imagery Analysis: Object Detection, Change Detection, and Foundation Models (2024-2025 Comprehensive Survey)"
    type: "academic_paper"
    year: 2025
    institution: "IEEE TGRS / Remote Sensing of Environment / arXiv"
    url: "https://arxiv.org/search/?query=satellite+object+detection+foundation+model"
  - id: "ps-ai-satellite-imagery-2"
    title: "Geospatial Foundation Models: Prithvi, Clay, and the Future of Few-Shot Earth Observation AI"
    type: "academic_paper"
    year: 2025
    institution: "Nature Machine Intelligence / arXiv"
    url: "https://arxiv.org/search/?query=geospatial+foundation+model+satellite"
known_gaps:
  - "Fusion of satellite imagery with ground sensor data for multi-modal monitoring"
  - "Real-time satellite alerting for time-critical events (disasters, conflicts)"
disputed_statements: []
---

## TL;DR
AI sees the planet from space -- counting ships at sea, detecting new construction, monitoring crop health, and mapping humanitarian crises. From NASA's open-source Prithvi model to commercial geospatial intelligence platforms, foundation models are democratizing satellite AI.

## Core Explanation
Satellite AI: (1) Object detection -- identify objects (ships, aircraft, vehicles, buildings). Challenge: objects are tiny (ships are 10-20 pixels at 10m resolution). Rotated bounding boxes for oriented objects; (2) Change detection -- compare images at T1 and T2, detect what changed (new construction, deforestation, disaster damage). Siamese networks, change transformers; (3) Segmentation -- classify each pixel (land cover, crop type, building footprint); (4) Foundation models -- pretrained on global satellite archives (Sentinel, Landsat, Planet). Prithvi (NASA+IBM): ViT with masked autoencoding on HLS data. Fine-tuned with 100-500 labeled examples. Clay Foundation Model (2024): open-source, community-developed geospatial foundation model.

## Detailed Analysis
Ship detection: xView and DOTA datasets -- annotated satellite images with 60+ object classes. YOLO/DETR adapted for tiny object detection via multi-scale feature pyramids. Maxar (30cm) enables vehicle-level detection. Orbital Insight: AI tracks oil storage tank levels (floating roof height from SAR), retail parking lot fullness, and construction activity from satellite time series. Descartes Labs: AI crop yield forecasting from satellite vegetation indices. MapWithAI (Meta): AI-extracted roads added to OpenStreetMap. Key challenge: cloud cover -- 67% of Earth is cloud-covered at any time. SAR (Sentinel-1) penetrates clouds, but SAR+optical fusion AI is still developing. Temporal resolution: revisit time (1-16 days) limits real-time monitoring.
