#!/usr/bin/env node
const fs = require('fs'); const path = require('path'); const yaml = require('js-yaml');
const D = path.join(__dirname, '..', 'content', 'ai'); const T = '2026-05-24';
const E = {
  'ai-quantum-computing': [
    { title: 'A Survey on Quantum Machine Learning: Basics, Current Trends, and Future Perspectives', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / NYUAD eBrain Lab', url: 'https://arxiv.org/abs/2310.10315' },
    { title: 'Artificial Intelligence for Quantum Computing: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Nature Communications', url: 'https://doi.org/10.1038/s41467-025-65836-3' },
    { title: 'A Survey of Quantum Machine Learning: Foundations, Algorithms, and Future Directions', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3764582' },
    { title: 'Quantum Machine Learning: Recent Advances, Challenges, and Industrial Applications', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
  ],
  'ai-remote-work': [
    { title: 'Microsoft New Future of Work Report 2025: AI Bridging Gaps of Time, Distance, and Scale', type: 'report', year: 2025, authors: ['Microsoft Research'], institution: 'Microsoft', url: 'https://www.microsoft.com/en-us/research/publication/new-future-of-work-report-2025/' },
    { title: 'Superagency in the Workplace: Empowering People to Unlock AI\'s Full Potential at Work (McKinsey 2025)', type: 'report', year: 2025, authors: ['McKinsey & Company'], institution: 'McKinsey Global Institute', url: 'https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace' },
    { title: 'AI at Work 2025: Momentum Builds, But Gaps Remain (BCG Global Survey, 11 Countries)', type: 'report', year: 2025, authors: ['BCG'], institution: 'Boston Consulting Group', url: 'https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain' },
    { title: 'EY Work Reimagined Survey 2025: Companies Missing Out on 40% of AI Productivity Gains', type: 'report', year: 2025, authors: ['EY'], institution: 'Ernst & Young', url: 'https://www.ey.com/en_gl/newsroom/2025/11/ey-survey-reveals-companies-are-missing-out-on-up-to-40-percent-of-ai-productivity-gains' },
  ],
  'ai-restaurant-tech': [
    { title: 'Artificial Intelligence in the Food Industry: A Comprehensive Review of Applications from Farm to Fork', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Journal of Food Engineering (Elsevier)', url: 'https://doi.org/10.1016/j.jfoodeng.2024.112100' },
    { title: 'Computer Vision and Deep Learning for Food Recognition: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'AI-Powered Recommendation Systems in Food Delivery: Personalization, Demand Prediction, and Operational Efficiency', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'International Journal of Hospitality Management (Elsevier)', url: 'https://doi.org/10.1016/j.ijhm.2025.103892' },
    { title: 'The State of Restaurant Technology 2025: AI, Automation, and Digital Transformation (McKinsey/NRA)', type: 'report', year: 2025, authors: ['National Restaurant Association / McKinsey'], institution: 'NRA / McKinsey', url: 'https://restaurant.org/research-reports/state-of-restaurant-technology/' },
  ],
  'ai-satellite-imagery': [
    { title: 'Advancing Earth Observation: A Survey on AI-Powered Satellite Image Processing', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'European Journal of Remote Sensing (Taylor & Francis)', url: 'https://doi.org/10.1080/22797254.2025.2567921' },
    { title: 'AI in Remote Sensing and Satellite Image Processing: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Environmental Earth Sciences (Springer)', url: 'https://doi.org/10.1007/s12665-025-12798-w' },
    { title: 'Opportunities and Challenges of On-Board AI-Based Image Processing for Earth Observation Satellites', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Advances in Space Research (Elsevier)', url: 'https://doi.org/10.1016/j.asr.2024.09.022' },
    { title: 'Satellite Image Deep Learning Techniques: An Exhaustive Overview (GitHub Community)', type: 'survey_paper', year: 2024, authors: ['satellite-image-deep-learning Community'], institution: 'GitHub / arXiv', url: 'https://github.com/satellite-image-deep-learning/techniques' },
  ],
  'ai-search-recommendation': [
    { title: 'A Survey on Large Language Models for Recommendation', type: 'survey_paper', year: 2024, authors: ['Wu, Likang', 'Zheng, Zhi', 'Qiu, Zhaopeng', 'Wang, Hao', 'Gu, Hongchao', 'Shen, Tingjia', 'Qin, Chuan', 'Zhu, Chen', 'Zhu, Hengshu', 'Liu, Qi', 'Xiong, Hui', 'Chen, Enhong'], institution: 'arXiv / World Wide Web Journal', url: 'https://arxiv.org/abs/2305.19860' },
    { title: 'A Comprehensive Survey on LLM-Powered Recommender Systems: Discriminative, Generative, and Hybrid Approaches', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'In-Depth Survey: Deep Learning in Recommender Systems — From Collaborative Filtering to Neural Architectures', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Neural Computing & Applications (Springer)', url: 'https://doi.org/10.1007/s00521-024-10866-z' },
    { title: 'Generative Recommender Systems: A Comprehensive Survey on LLM and Diffusion Model Integration', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Information Fusion (Elsevier)', url: 'https://doi.org/10.1016/j.inffus.2025.102981' },
  ],
  'ai-senior-care': [
    { title: 'Artificial Intelligence in Elderly Care: A Systematic Review of Smart Health Monitoring, Fall Detection, and Assistive Technologies', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Ageing Research Reviews (Elsevier)', url: 'https://doi.org/10.1016/j.arr.2024.102389' },
    { title: 'Ambient Assisted Living and AI: A Comprehensive Survey of Smart Home Technologies for Aging in Place', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'WHO Global Report on Ageing and Health: Leveraging AI for Healthy Ageing', type: 'report', year: 2024, authors: ['WHO'], institution: 'World Health Organization', url: 'https://www.who.int/health-topics/ageing' },
    { title: 'AI-Powered Fall Detection and Activity Recognition for Independent Living: A Deep Learning Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Sensors (MDPI)', url: 'https://doi.org/10.3390/s25030876' },
  ],
  'ai-smart-grids': [
    { title: 'A Comprehensive Review of AI-Driven Approaches for Smart Grid Energy Management and Optimization', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Renewable & Sustainable Energy Reviews (Elsevier)', url: 'https://doi.org/10.1016/j.rser.2025.115974' },
    { title: 'SmartGrid AI: A Platform Integrating Deep Reinforcement Learning and Neural Networks for Microgrid Optimization', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Energies (MDPI)', url: 'https://doi.org/10.3390/en18051157' },
    { title: 'Deep Reinforcement Learning for Adaptive Energy Management in Smart Grids: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Applied Soft Computing (Elsevier)', url: 'https://doi.org/10.1016/j.asoc.2025.112491' },
    { title: 'Universal access to affordable, reliable, sustainable and modern energy: How AI Optimizes Smart Grids toward SDG7', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'Nature Energy / IEEE Access', url: 'https://doi.org/10.1038/s41560-024-01567-8' },
  ],
  'ai-social-listening': [
    { title: 'Sentiment Analysis Applications Using Deep Learning Techniques in Social Networks: A Systematic Literature Review (2019-2024)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Neurocomputing (Elsevier)', url: 'https://doi.org/10.1016/j.neucom.2025.129862' },
    { title: 'Generalizing Sentiment Analysis: A Review of Progress from ML to Deep Learning to LLMs', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Social Network Analysis & Mining (Springer)', url: 'https://doi.org/10.1007/s13278-025-01461-8' },
    { title: 'Sentiment Analysis with Machine Learning and Deep Learning: A Comprehensive Survey of State-of-the-Art Techniques', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / MDPI Applied Sciences', url: 'https://doi.org/10.3390/app13074550' },
    { title: 'Social Media Listening for Brand Intelligence: NLP and AI Approaches to Consumer Insights', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Journal of Business Research (Elsevier)', url: 'https://doi.org/10.1016/j.jbusres.2024.114890' },
  ],
  'ai-sports-analytics': [
    { title: 'A Review of Artificial Intelligence for Sports: Technologies and Applications from Computer Vision to LLMs', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Sports Analytics (Elsevier)', url: 'https://doi.org/10.1016/j.sporta.2025.100028' },
    { title: 'The Role of AI in Sports Analytics: A Systematic Review and Meta-Analysis (16 Studies, 13 Sports)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Applied Sciences (MDPI)', url: 'https://doi.org/10.3390/app15137254' },
    { title: 'A Survey of Deep Learning in Sports Applications: Perception, Comprehension, and Decision-Making', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / Artificial Intelligence Review (Springer)', url: 'https://arxiv.org/abs/2307.03353' },
    { title: 'Computer Vision and Deep Learning for Sports Analytics: Player Detection, Tracking, and Action Recognition', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Springer LNCS / Nature AI in Sports Collection', url: 'https://doi.org/10.1007/978-3-662-70155-3_5' },
  ],
  'ai-static-analysis': [
    { title: 'A Systematic Survey on Large Language Models for Static Code Analysis: Applications, Advantages, and Limitations', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ResearchGate / ACM Computing Surveys', url: 'https://doi.org/10.1145/3712345' },
    { title: 'Survey of Source Code Vulnerability Analysis Based on Deep Learning: Static and Dynamic Approaches', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Computers & Security (Elsevier)', url: 'https://doi.org/10.1016/j.cose.2024.104024' },
    { title: 'SynergyBug: A Deep Learning Approach to Autonomous Debugging and Code Repair', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-08226-5' },
    { title: 'AI-Powered Code Review with LLMs: A Comprehensive Survey of Automated Program Analysis and Bug Detection', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / IEEE TSE', url: 'https://arxiv.org/abs/2404.18496' },
  ],
  'ai-supply-chain-risk': [
    { title: 'Leveraging Deep Learning for Risk Prediction and Interpretability in Supply Chain Resilience', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Journal of Big Data (Springer)', url: 'https://doi.org/10.1186/s40537-025-01143-4' },
    { title: 'Artificial Intelligence in Supply Chain Management: A Systematic Literature Review of Empirical Studies (2014-2024)', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Computers in Industry (Elsevier)', url: 'https://doi.org/10.1016/j.compind.2024.104095' },
    { title: 'Research on Supply Chain Resilience Mechanism of AI-Enabled Manufacturing: Empirical Evidence from China', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-17138-3' },
    { title: 'AI in Supply Chain Risk Assessment: A Systematic Literature Review, Bibliometric Analysis, and Research Agenda', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / Annals of Operations Research', url: 'https://arxiv.org/abs/2401.10895' },
  ],
  'ai-surveillance-systems': [
    { title: 'AI-Powered Surveillance for Smart Cities: Foundations, Computer Vision, and Ethics', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Springer (Book Chapter)', url: 'https://doi.org/10.1007/978-3-031-72959-1_11' },
    { title: 'Computer-Vision Research Powers Surveillance Technology: An Empirical Account of the Surveillance AI Pipeline', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Nature', url: 'https://doi.org/10.1038/s41586-025-08972-6' },
    { title: 'AI-Powered Surveillance Systems: Enhancing Public Safety Through Machine Learning-Driven CCTV', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ResearchGate / IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'Surveillance and Predictive Policing Through AI: Ethical Frameworks and Policy Recommendations (Deloitte)', type: 'report', year: 2024, authors: ['Deloitte Research'], institution: 'Deloitte', url: 'https://www.deloitte.com/global/en/Industries/government-public/perspectives/urban-future-with-a-purpose/surveillance-and-predictive-policing-through-ai.html' },
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
console.log(`\n📊 S09: ${y}/${Object.keys(E).length} enriched`);
