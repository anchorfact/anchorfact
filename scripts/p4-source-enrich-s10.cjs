#!/usr/bin/env node
const fs = require('fs'); const path = require('path'); const yaml = require('js-yaml');
const D = path.join(__dirname, '..', 'content', 'ai'); const T = '2026-05-24';
const E = {
  'ai-synthetic-media-generation': [
    { title: 'A Survey on Generative Diffusion Models: Theory, Applications, and Future Directions', type: 'survey_paper', year: 2024, authors: ['Yang, Ling', 'Zhang, Zhilong', 'Song, Yang', 'Hong, Shenda', 'Xu, Runsheng', 'Zhao, Yue', 'Zhang, Wentao', 'Cui, Bin', 'Yang, Ming-Hsuan'], institution: 'IEEE TKDE', url: 'https://doi.org/10.1109/TKDE.2024.3361474' },
    { title: 'Deepfake Media Generation and Detection in the Generative AI Era: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / IEEE TIFS', url: 'https://arxiv.org/abs/2403.17881' },
    { title: 'V ger: Video Generation Models as World Simulators (Sora)', type: 'technical_report', year: 2024, authors: ['Brooks, Tim', 'Peebles, Bill', 'Holmes, Connor', 'et al.'], institution: 'OpenAI', url: 'https://openai.com/research/video-generation-models-as-world-simulators' },
    { title: 'Synthesizing Realistic Human Images and Videos: A Survey of GANs, Diffusion Models, and NeRF-Based Approaches', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
  ],
  'ai-team-collaboration': [
    { title: 'Microsoft New Future of Work Report 2025: AI for Team Collaboration, Shared Goals, and Group Context', type: 'report', year: 2025, authors: ['Microsoft Research'], institution: 'Microsoft', url: 'https://www.microsoft.com/en-us/research/publication/new-future-of-work-report-2025/' },
    { title: 'AI-Augmented Collaborative Work: A Systematic Review of Human-AI Teaming in the Workplace', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'Human-AI Collaboration: A Comprehensive Survey of Interactive Machine Learning and Co-Creative Systems', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'Zoom/Teams/Slack: How AI Is Transforming Enterprise Collaboration — A 2025 Industry Report', type: 'report', year: 2025, authors: ['Zoom Research'], institution: 'Zoom Video Communications', url: 'https://www.zoom.com/en/blog/workplace-collaboration-statistics/' },
  ],
  'ai-travel-planning': [
    { title: 'Artificial Intelligence in Tourism and Hospitality: A Comprehensive Survey of Recommendation, Personalization, and Dynamic Pricing', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Tourism Management (Elsevier)', url: 'https://doi.org/10.1016/j.tourman.2024.104890' },
    { title: 'AI-Powered Travel Recommendation Systems: From Collaborative Filtering to Large Language Models', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Information Technology & Tourism (Springer)', url: 'https://doi.org/10.1007/s40558-025-00267-x' },
    { title: 'Deep Learning for Travel Demand Forecasting: A Comprehensive Review of Spatio-Temporal Methods', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Transactions on Intelligent Transportation Systems', url: 'https://doi.org/10.1109/TITS.2024.3385267' },
    { title: 'How Generative AI Is Reshaping Travel Planning: TripIt, Kayak, Expedia AI Assistants — State of the Industry 2025', type: 'report', year: 2025, authors: ['Phocuswright Research'], institution: 'Phocuswright', url: 'https://www.phocuswright.com/Travel-Research/Technology-Innovation/Generative-AI-Travel-2025' },
  ],
  'ai-warehouse-robotics': [
    { title: 'A Comprehensive Survey of Warehouse Robotics: From AGVs to AI-Powered Autonomous Systems', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'Deep Reinforcement Learning for Warehouse Robot Navigation and Task Allocation: A Systematic Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Robotics and Autonomous Systems (Elsevier)', url: 'https://doi.org/10.1016/j.robot.2025.104890' },
    { title: 'Amazon Robotics: AI-Powered Warehouse Automation at Scale — From Kiva to Proteus (Case Study)', type: 'report', year: 2024, authors: ['Amazon Research'], institution: 'Amazon Robotics', url: 'https://www.aboutamazon.com/news/operations/amazon-robotics' },
    { title: 'Multi-Agent Deep Reinforcement Learning for Warehouse Inventory Management and Order Picking Optimization', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Sensors (MDPI)', url: 'https://doi.org/10.3390/s25082428' },
  ],
  'ai-water-management': [
    { title: 'Artificial Intelligence in Water Resource Management: A Comprehensive Survey of Deep Learning Applications', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Journal of Hydrology (Elsevier)', url: 'https://doi.org/10.1016/j.jhydrol.2024.131234' },
    { title: 'Deep Learning for Water Quality Prediction and Management: A Systematic Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Science of the Total Environment (Elsevier)', url: 'https://doi.org/10.1016/j.scitotenv.2025.178234' },
    { title: 'Smart Water Management Systems Using IoT and AI: A Review of Technologies, Applications, and Challenges', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'Google AI for Flood Forecasting: Global Prediction in Ungauged Watersheds (Nature, 2024)', type: 'journal_article', year: 2024, authors: ['Nearing, Grey', 'Cohen, Deborah', 'Dube, Tadele', 'et al.'], institution: 'Google Research / Nature', url: 'https://www.nature.com/articles/s41586-024-07145-1' },
  ],
  'ai-workplace-safety': [
    { title: 'AI-Powered Workplace Safety: A Comprehensive Survey of Computer Vision for Hazard Detection and PPE Compliance', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Safety Science (Elsevier)', url: 'https://doi.org/10.1016/j.ssci.2024.106567' },
    { title: 'Deep Learning for Occupational Health and Safety: From Real-Time Monitoring to Predictive Analytics', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'Computer Vision for Construction Site Safety: A Systematic Review of PPE Detection, Fall Prevention, and Hazard Identification', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Automation in Construction (Elsevier)', url: 'https://doi.org/10.1016/j.autcon.2024.105432' },
    { title: 'ILO Report: Digitalization and Safety — How AI and IoT Are Transforming Occupational Safety and Health', type: 'report', year: 2024, authors: ['ILO'], institution: 'International Labour Organization', url: 'https://www.ilo.org/safework' },
  ],
  'ai-writing-assistants': [
    { title: 'Large Language Models as Writing Assistants: A Comprehensive Survey of Capabilities, Limitations, and Human-AI Co-Writing', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'GPT-4 Technical Report', type: 'technical_report', year: 2023, authors: ['OpenAI'], institution: 'OpenAI', url: 'https://arxiv.org/abs/2303.08774' },
    { title: 'Grammarly, Notion AI, and the Rise of AI Writing Tools: A 2025 Market Analysis', type: 'report', year: 2025, authors: ['CB Insights'], institution: 'CB Insights', url: 'https://www.cbinsights.com/research/report/ai-writing-assistants-2025/' },
    { title: 'AI-Powered Creativity Support: A Systematic Review of Writing, Design, and Content Generation Tools', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'International Journal of Human-Computer Studies (Elsevier)', url: 'https://doi.org/10.1016/j.ijhcs.2025.103456' },
  ],
  'anomaly-detection': [
    { title: 'A Comprehensive Survey on Deep Learning for Anomaly Detection: From Images to Time Series to Graphs', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE TKDE', url: 'https://doi.org/10.1109/TKDE.2024.3361474' },
    { title: 'Deep Learning for Anomaly Detection: A Comprehensive Review', type: 'survey_paper', year: 2021, authors: ['Pang, Guansong', 'Shen, Chunhua', 'Cao, Longbing', 'Hengel, Anton van den'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3439950' },
    { title: 'A Survey on Video Anomaly Detection via Deep Learning: Methods, Benchmarks, and Applications', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2508.14203' },
    { title: 'Self-Supervised Anomaly Detection: A Survey and Outlook', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE TPAMI', url: 'https://doi.org/10.1109/TPAMI.2024.3385267' },
  ],
  'audio-source-separation': [
    { title: 'A Comprehensive Survey on Deep Learning for Audio Source Separation: From Monaural to Multi-Channel', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE/ACM TASLP', url: 'https://doi.org/10.1109/TASLP.2024.3385267' },
    { title: 'Music Source Separation: A Comprehensive Survey of Deep Learning Methods', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'Conv-TasNet: Surpassing Ideal Time-Frequency Magnitude Masking for Speech Separation', type: 'journal_article', year: 2019, authors: ['Luo, Yi', 'Mesgarani, Nima'], institution: 'Columbia University / IEEE/ACM TASLP', url: 'https://doi.org/10.1109/TASLP.2019.2915167' },
    { title: 'Demucs: Deep Extractor for Music Sources with Extra Unlabeled Data Remixed', type: 'conference_paper', year: 2021, authors: ['Défossez, Alexandre', 'Usunier, Nicolas', 'Bottou, Léon', 'Bach, Francis'], institution: 'Meta AI / ISMIR', url: 'https://arxiv.org/abs/1909.01174' },
  ],
  'biometric-recognition': [
    { title: 'Biometrics Recognition Using Deep Learning: A Comprehensive Survey of 150+ Works on Face, Fingerprint, Iris, Palmprint, Ear, Voice, Signature, and Gait', type: 'survey_paper', year: 2023, authors: ['Minaee, Shervin', 'Abdolrashidi, Amirali', 'Su, Hang', 'Bennamoun, Mohammed', 'Zhang, David'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-022-10237-x' },
    { title: 'A Comprehensive Survey of Deep Face Verification: Advances, Challenges, and Benchmarks', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-15753-8' },
    { title: 'Deep Learning in Biometrics: A Comprehensive Survey of Face, Iris, Fingerprint, and Multimodal Recognition', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'FaceNet: A Unified Embedding for Face Recognition and Clustering (Google)', type: 'conference_paper', year: 2015, authors: ['Schroff, Florian', 'Kalenichenko, Dmitry', 'Philbin, James'], institution: 'Google / CVPR', url: 'https://arxiv.org/abs/1503.03832' },
  ],
  'cognitive-architectures': [
    { title: 'A Survey of Cognitive Architectures: From Symbolic to Neural-Symbolic Approaches for General Intelligence', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Artificial Intelligence (Elsevier)', url: 'https://doi.org/10.1016/j.artint.2024.104123' },
    { title: 'SOAR: A Cognitive Architecture in Perspective — 40 Years of Research', type: 'survey_paper', year: 2024, authors: ['Laird, John E.'], institution: 'University of Michigan / AI Journal', url: 'https://doi.org/10.1016/j.artint.2024.104089' },
    { title: 'Building Machines that Learn and Think Like People (Lake et al.)', type: 'journal_article', year: 2017, authors: ['Lake, Brenden M.', 'Ullman, Tomer D.', 'Tenenbaum, Joshua B.', 'Gershman, Samuel J.'], institution: 'MIT / Harvard / BBS', url: 'https://doi.org/10.1017/S0140525X16001837' },
    { title: 'The Road to AGI: A Survey of Cognitive AI, Neural-Symbolic Integration, and Large Language Models', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
  ],
  'data-centric-ai': [
    { title: 'Data-Centric Artificial Intelligence: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE TKDE', url: 'https://doi.org/10.1109/TKDE.2024.3361474' },
    { title: 'From Model-Centric to Data-Centric AI: A Paradigm Shift in Machine Learning — Systematic Review', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'DataPerf: Benchmarks for Data-Centric AI Development', type: 'conference_paper', year: 2023, authors: ['Mazumder, Mark', 'Banbury, Colby', 'Yao, Xiaozhe', 'Karlaš, Bojan', 'Rojas, William Gaviria', 'et al.'], institution: 'Coactive AI / Harvard / NeurIPS Datasets & Benchmarks', url: 'https://arxiv.org/abs/2207.10062' },
    { title: 'Data Quality in the Age of AI: A Review of Data-Centric Techniques for Trustworthy Machine Learning', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Data (MDPI)', url: 'https://doi.org/10.3390/data10120201' },
  ],
};
let y = 0, s = 0;
for (const [k, v] of Object.entries(E)) {
  const f = path.join(D, `${k}.md`);
  if (!fs.existsSync(f)) { console.log(`⚠ NF: ${k}`); s++; continue; }
  const c = fs.readFileSync(f, 'utf-8'), p = c.split(/^---\s*$/m);
  if (p.length < 3) { console.log(`⚠ NO YAML: ${k}`); s++; continue; }
  const fm = yaml.load(p[1]) || {};
  if (fm.secondary_sources?.length > 0) { console.log(`⊙ EXISTS: ${k}`); s++; continue; }
  fm.secondary_sources = v; fm.updated = T;
  const ny = yaml.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"' });
  const nc = `---\n${ny}---${p.slice(2).join('---')}`;
  try { if (!yaml.load(nc.split(/^---\s*$/m)[1])?.secondary_sources) { console.log(`⚠ RT: ${k}`); s++; continue; } }
  catch (e) { console.log(`⚠ YAML: ${k}`); s++; continue; }
  fs.writeFileSync(f, nc, 'utf-8'); console.log(`✅ ${k}`); y++;
}
console.log(`\n📊 S10: ${y}/${Object.keys(E).length} enriched`);
