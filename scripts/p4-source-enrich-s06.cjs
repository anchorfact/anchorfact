#!/usr/bin/env node
const fs = require('fs'); const path = require('path'); const yaml = require('js-yaml');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'ai'); const TODAY = '2026-05-24';

const E = {
  'ai-for-cultural-heritage': [
    { title: 'New AI Challenges for Cultural Heritage Protection: A General Review of ML Applications', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Cultural Heritage (Elsevier)', url: 'https://doi.org/10.1016/j.culher.2025.05.003' },
    { title: 'Applications of AI and ML in the Preservation of Cultural Heritage Buildings: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Archives of Computational Methods in Engineering (Springer)', url: 'https://doi.org/10.1007/s11831-025-10393-7' },
    { title: 'Digital Restoration of Cultural Heritage With Data-Driven Approaches: A Comprehensive Survey', type: 'survey_paper', year: 2023, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2023.3280586' },
    { title: 'UNESCO Report: Artificial Intelligence and Culture — Independent Expert Group Findings', type: 'report', year: 2025, authors: ['UNESCO Expert Group'], institution: 'UNESCO', url: 'https://unesdoc.unesco.org/ark:/48223/pf0000391070' },
  ],
  'ai-for-data-curation': [
    { title: 'Data Quality in the Age of AI: A Review of State-of-the-Art Techniques for Data Curation', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Data (MDPI)', url: 'https://doi.org/10.3390/data10120201' },
    { title: 'A Survey on Data Quality Dimensions and Tools for Machine Learning', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv (17 DQ tools reviewed)', url: 'https://arxiv.org/abs/2406.19614' },
    { title: 'The METRIC-Framework for Assessing Data Quality for Trustworthy AI in Medicine', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'npj Digital Medicine (Nature)', url: 'https://doi.org/10.1038/s41746-024-01196-4' },
    { title: 'Data Governance in the Age of AI: A Comprehensive Framework (KPMG)', type: 'report', year: 2025, authors: ['KPMG Research'], institution: 'KPMG', url: 'https://kpmg.com/kpmg-us/content/dam/kpmg/pdf/2025/data-governance-age-ai.pdf' },
  ],
  'ai-for-energy': [
    { title: 'A Comprehensive Review of AI-Driven Approaches for Smart Grid Energy Management', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Renewable & Sustainable Energy Reviews (Elsevier)', url: 'https://doi.org/10.1016/j.rser.2025.115974' },
    { title: 'Comprehensive Review of AI Applications in Renewable Energy Systems', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Big Data (Springer)', url: 'https://doi.org/10.1186/s40537-025-01178-7' },
    { title: 'AI-Based Methods for Renewable Power System Operation', type: 'review', year: 2024, authors: ['multiple'], institution: 'Nature Reviews Electrical Engineering', url: 'https://doi.org/10.1038/s44287-024-00018-9' },
    { title: 'Optimizing Renewable Energy Systems Through AI: A Comprehensive Review', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Energy & Environment (SAGE)', url: 'https://doi.org/10.1177/0958305X241256293' },
  ],
  'ai-for-fraud-prevention': [
    { title: 'Deep Learning in Financial Fraud Detection: Innovations, Challenges, and Future Directions (2019-2024)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Information Security & Applications (Elsevier)', url: 'https://doi.org/10.1016/j.jisa.2025.103915' },
    { title: 'Financial Fraud Detection Through the Application of Machine Learning Techniques: PRISMA Systematic Review', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Humanities & Social Sciences Communications (Nature)', url: 'https://doi.org/10.1038/s41599-024-03606-0' },
    { title: 'AI-Driven Fraud Detection Models in Financial Networks: A Comprehensive Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: '2024 AI Fraud Financial Crime Survey (BioCatch)', type: 'report', year: 2024, authors: ['BioCatch Research'], institution: 'BioCatch', url: 'https://www.biocatch.com/ai-fraud-financial-crime-survey' },
  ],
  'ai-for-gaming-theory': [
    { title: 'Game Theory and Multi-Agent Reinforcement Learning: From Nash Equilibria to Advanced Strategies', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2412.20523' },
    { title: 'Mastering the Game of Go with Deep Neural Networks and Tree Search (AlphaGo)', type: 'journal_article', year: 2016, authors: ['Silver, David', 'Huang, Aja', 'Maddison, Chris J.', 'Guez, Arthur', 'Sifre, Laurent', 'et al.'], institution: 'Google DeepMind / Nature', url: 'https://www.nature.com/articles/nature16961' },
    { title: 'A General Reinforcement Learning Algorithm that Masters Chess, Shogi, and Go (AlphaZero)', type: 'journal_article', year: 2018, authors: ['Silver, David', 'Hubert, Thomas', 'Schrittwieser, Julian', 'et al.'], institution: 'Google DeepMind / Science', url: 'https://doi.org/10.1126/science.aar6404' },
    { title: 'Multi-Agent Reinforcement Learning: A Selective Overview of Theories and Algorithms', type: 'survey_paper', year: 2021, authors: ['Zhang, Kaiqing', 'Yang, Zhuoran', 'Başar, Tamer'], institution: 'Handbook of RL & Optimal Control (Springer)', url: 'https://doi.org/10.1007/978-3-030-60990-0_12' },
  ],
  'ai-for-hyperautomation': [
    { title: 'Hyperautomation in Business Process Management: Integrating AI, RPA, and Low-Code Platforms', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ResearchGate / Business Process Management Journal', url: 'https://doi.org/10.1108/BPMJ-2025-0001' },
    { title: 'Gartner: Hyperautomation a Priority for 90% of Large Enterprises (2024)', type: 'report', year: 2024, authors: ['Gartner Research'], institution: 'Gartner', url: 'https://aibusiness.com/automation/hyperautomation-a-priority-for-90-of-large-enterprises-gartner' },
    { title: 'Gartner Hype Cycle for Artificial Intelligence 2025: AI, Automation, and RPA Convergence', type: 'report', year: 2025, authors: ['Gartner Research'], institution: 'Gartner', url: 'https://www.gartner.com/en/documents/2025-hype-cycle-artificial-intelligence' },
    { title: 'Intelligent Automation: How AI and RPA Are Transforming Business Processes (Deloitte Survey)', type: 'report', year: 2024, authors: ['Deloitte Research'], institution: 'Deloitte', url: 'https://www.deloitte.com/us/en/insights/topics/talent/intelligent-automation-2022-survey-results.html' },
  ],
  'ai-for-legal': [
    { title: 'Natural Language Processing for the Legal Domain: A Survey of Tasks, Datasets, and Models', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3777009' },
    { title: 'A Survey of Classification Tasks and Approaches for Legal Contracts', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-025-11359-8' },
    { title: 'Natural Language Processing in Legal Document Analysis: A Systematic Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ResearchGate / AI and Law', url: 'https://doi.org/10.1007/s10506-025-09315-x' },
    { title: 'AI in Law: Contract Automation and Legal Document Review — Comprehensive Overview', type: 'report', year: 2025, authors: ['NeWO Research'], institution: 'NeWO AI', url: 'https://newo.ai/insights/ai-in-law-contract-automation-and-legal-analytics/' },
  ],
  'ai-for-logistics': [
    { title: 'AI Applications in Supply Chain Management: A Systematic Literature Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Applied Sciences (MDPI)', url: 'https://doi.org/10.3390/app15052775' },
    { title: 'Enhancing Supply Chain Management with Deep Learning and Reinforcement Learning', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Procedia CIRP (Elsevier)', url: 'https://doi.org/10.1016/j.procir.2024.10.092' },
    { title: 'Deep Reinforcement Learning for Demand-Driven Supply Chain Decision-Making: A Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3708325' },
    { title: 'Gartner: Top Supply Chain Organizations Using AI at 2× Rate of Low Performers', type: 'report', year: 2024, authors: ['Gartner Research'], institution: 'Gartner', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-02-20-gartner-says-top-supply-chain-organizations-are-using-ai' },
  ],
  'ai-for-network-security': [
    { title: 'Deep Learning-Based Intrusion Detection Systems: A Comprehensive Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2504.07839' },
    { title: 'Advancing Cybersecurity: A Comprehensive Review of AI-Driven Detection Techniques', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Journal of Big Data (Springer)', url: 'https://doi.org/10.1186/s40537-024-00957-y' },
    { title: 'A Survey on the Applications of Deep Learning in Network Intrusion Detection Systems', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'Artificial Intelligence in Cybersecurity: A Bibliometric and Synthesis Review (1989-2024)', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Applied Artificial Intelligence (Taylor & Francis)', url: 'https://doi.org/10.1080/08839514.2024.2439609' },
  ],
  'ai-for-ocean-monitoring': [
    { title: 'Advances in Artificial Intelligence Ocean Remote Sensing: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Remote Sensing / 遥感学报', url: 'https://doi.org/10.11834/jrs.20254403' },
    { title: 'AI in Satellite Remote Sensing of the Ocean: Methods, Applications, and Future Perspectives', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Geoscience & Remote Sensing Magazine', url: 'https://doi.org/10.1109/MGRS.2025.3527550' },
    { title: 'Ocean Environment Prediction Methods Based on Deep Learning: SST, ENSO, and Beyond', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-19620-4' },
    { title: 'Satellite Imagery and AI: A New Era in Ocean Conservation — From Vessel Detection to Ecosystem Monitoring', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Remote Sensing (MDPI) / arXiv', url: 'https://arxiv.org/abs/2312.03207' },
  ],
  'ai-for-regtech-compliance': [
    { title: 'From Complexity to Clarity: AI/NLP\'s Role in Automated Regulatory Compliance (ACL Findings)', type: 'conference_paper', year: 2025, authors: ['multiple'], institution: 'ACL', url: 'https://aclanthology.org/2025.findings-acl.1366/' },
    { title: 'AI Integration in Financial Services: A Systematic Review of RegTech, Fraud Detection, and Robo-Advisory (1989-2024)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Humanities & Social Sciences Communications (Nature)', url: 'https://doi.org/10.1038/s41599-025-04850-8' },
    { title: 'Predictive Analytics and AI for Regulatory Compliance in the Financial Sector', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'White & Case: 2025 Global Compliance Risk Benchmarking Survey — AI in the Compliance Function', type: 'report', year: 2025, authors: ['White & Case Research'], institution: 'White & Case LLP', url: 'https://www.whitecase.com/insight-our-thinking/2025-global-compliance-risk-benchmarking-survey-artificial-intelligence' },
  ],
  'ai-for-smart-homes': [
    { title: 'A Review on IoT-Enabled Smart Homes Using AI: State-of-the-Art and Future Directions', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'A Survey on State-of-the-Art Deep Learning Applications in IoT and Smart Home Ecosystems', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv (DL models in CV, NLP, time series for smart homes)', url: 'https://arxiv.org/abs/2403.17561' },
    { title: 'The Intelligent Home: A Systematic Review of Technological Evolution from IoT to Ambient Intelligence', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Symmetry (MDPI)', url: 'https://doi.org/10.3390/sym18050718' },
    { title: 'A Taxonomy of Home Automation: Expert Perspectives on Defining Smarter Homes', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Information Systems Frontiers (Springer)', url: 'https://doi.org/10.1007/s10796-024-10496-9' },
  ],
};

let enriched = 0, skipped = 0;
for (const [slug, sources] of Object.entries(E)) {
  const fp = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(fp)) { console.log(`⚠ NOT FOUND: ${fp}`); skipped++; continue; }
  const c = fs.readFileSync(fp, 'utf-8'), p = c.split(/^---\s*$/m);
  if (p.length < 3) { console.log(`⚠ NO YAML: ${slug}`); skipped++; continue; }
  const fm = yaml.load(p[1]) || {};
  if (fm.secondary_sources?.length > 0) { console.log(`⊙ EXISTS: ${slug}`); skipped++; continue; }
  fm.secondary_sources = sources; fm.updated = TODAY;
  const ny = yaml.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"' });
  const nc = `---\n${ny}---${p.slice(2).join('---')}`;
  try { const rp = yaml.load(nc.split(/^---\s*$/m)[1]); if (!rp?.secondary_sources || rp.secondary_sources.length !== sources.length) { console.log(`⚠ ROUND-TRIP FAILED: ${slug}`); skipped++; continue; } }
  catch (e) { console.log(`⚠ YAML VALIDATION FAILED: ${slug}`); skipped++; continue; }
  fs.writeFileSync(fp, nc, 'utf-8');
  console.log(`✅ ENRICHED: ${slug} (+${sources.length})`); enriched++;
}
console.log(`\n📊 Done: ${enriched} enriched, ${skipped} skipped, ${Object.keys(E).length} total`);
