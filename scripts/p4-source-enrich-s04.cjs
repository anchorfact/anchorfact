#!/usr/bin/env node
/**
 * Phase 4: Source Enrichment Sprint 04
 * Adds expert secondary_sources to 12 more AI articles.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'ai');
const TODAY = '2026-05-24';

const EXPERT_SOURCES = {

  'ai-air-quality': [
    { title: 'A Systematic Survey of Air Quality Prediction Based on Deep Learning', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Alexandria Engineering Journal (Elsevier)', url: 'https://doi.org/10.1016/j.aej.2024.03.095' },
    { title: 'Deep Learning for Air Pollutant Forecasting: Opportunities, Challenges, and Future Perspectives', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Frontiers of Environmental Science & Engineering (Springer)', url: 'https://doi.org/10.1007/s11783-025-2092-6' },
    { title: 'Air Quality Prediction Using Machine Learning: A Systematic Literature Review', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3486521' },
    { title: 'Time-Series Data-Driven PM2.5 Forecasting: From Classical Methods to Deep Learning — A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Atmosphere (MDPI)', url: 'https://doi.org/10.3390/atmos16030292' },
  ],

  'ai-beauty-fashion': [
    { title: 'Computer Vision for Fashion: A Systematic Review of Design Applications (2017-2025)', type: 'survey_paper', year: 2025, authors: ['Kachbal, Yassine', 'Abdellaoui, Mehdi', 'et al.'], institution: 'Information (MDPI)', url: 'https://doi.org/10.3390/info17010011' },
    { title: 'Exploring AI in Fashion: A Review of Aesthetics, Personalization, and Recommendation', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Multimedia Systems (Springer)', url: 'https://doi.org/10.1007/s00530-026-02232-x' },
    { title: 'Fashion Meets Computer Vision: A Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635113' },
    { title: 'Generative AI in Fashion: Overview (ACM TIST)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM Transactions on Intelligent Systems and Technology', url: 'https://doi.org/10.1145/3706125' },
  ],

  'ai-code-translation': [
    { title: 'A Systematic Literature Review on Neural Code Translation', type: 'survey_paper', year: 2025, authors: ['Chen, Xingyu', 'Xue, Yinxing', 'et al.'], institution: 'arXiv (57 primary studies, 2020-2025)', url: 'https://arxiv.org/abs/2505.07425' },
    { title: 'Generative AI for Code Translation: A Systematic Mapping Study', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Engineering Proceedings (MDPI)', url: 'https://doi.org/10.3390/engproc2025112033' },
    { title: 'Verified Code Transpilation with LLMs', type: 'conference_paper', year: 2024, authors: ['multiple'], institution: 'NeurIPS', url: 'https://papers.nips.cc/paper_files/paper/2024/hash/48bb60a0c0aebb4142bf314bd1a5c6a0-Abstract-Conference.html' },
    { title: 'Scaling Neural Machine Translation to 200 Languages', type: 'journal_article', year: 2024, authors: ['NLLB Team', 'Costa-jussà, Marta R.', 'Cross, James', 'Çelebi, Onur', 'Elbayad, Maha', 'et al.'], institution: 'Meta AI / Nature', url: 'https://www.nature.com/articles/s41586-024-07335-x' },
  ],

  'ai-digital-forensics': [
    { title: 'A Comprehensive Analysis of the Role of Artificial Intelligence in Aligning with Digital Forensics', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Forensic Science International: Digital Investigation', url: 'https://doi.org/10.1016/j.fsidi.2024.301725' },
    { title: 'A Survey on the Development of Machine Learning and Artificial Intelligence in Digital Forensics', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Springer LNNS (Advances in Intelligent Systems)', url: 'https://doi.org/10.1007/978-3-032-05832-4_16' },
    { title: 'The Role of Artificial Intelligence in Forensic Science: Transforming Crime Scene Investigation', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'International Journal of Multidisciplinary Research & Analysis', url: 'https://doi.org/10.47191/ijmra/v7-i10-52' },
    { title: 'AI as a Decision Support Tool in Forensic Image Analysis', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Journal of Forensic Sciences (Wiley)', url: 'https://doi.org/10.1111/1556-4029.70035' },
  ],

  'ai-drug-repurposing': [
    { title: 'Applications of Artificial Intelligence in Drug Repurposing', type: 'survey_paper', year: 2025, authors: ['Wan, Zhaoman', 'Sun, Xinran', 'Li, Yi', 'Chu, Tianyao', 'Hao, Xueyu', 'et al.'], institution: 'Advanced Science (Wiley)', url: 'https://doi.org/10.1002/advs.202411325' },
    { title: 'Deep Learning Large-Scale Drug Discovery and Repurposing', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'Nature Computational Science', url: 'https://doi.org/10.1038/s43588-024-00679-4' },
    { title: 'AI-Driven Drug Repurposing: Applications and Opportunities', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Medicines (MDPI)', url: 'https://doi.org/10.3390/medicines12040028' },
    { title: 'Combining Deep Learning Models for Improved Drug Repurposing: A Comparative Study', type: 'conference_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access / ISIVC', url: 'https://doi.org/10.1109/ISIVC61350.2024.10544998' },
  ],

  'ai-election-integrity': [
    { title: 'AI Threats to Politics, Elections, and Democracy: A Blockchain-Based Deepfake Detection Perspective', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Blockchains (MDPI)', url: 'https://doi.org/10.3390/blockchains2040020' },
    { title: 'AI-Enabled Influence Operations: Safeguarding Future Elections (CETaS)', type: 'report', year: 2024, authors: ['CETaS Research Team'], institution: 'Alan Turing Institute / CETaS', url: 'https://cetas.turing.ac.uk/publications/ai-enabled-influence-operations-safeguarding-future-elections' },
    { title: 'AI-Generated Misinformation in the Election Year: Challenges and Responses', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'Frontiers in Political Science', url: 'https://doi.org/10.3389/fpos.2024.1451601' },
    { title: 'The Impact of Disinformation Generated by AI on Democracy: US Presidential Elections 2016-2024', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Review of Economics and Political Science (Emerald)', url: 'https://doi.org/10.1108/REPS-12-2024-0104' },
  ],

  'ai-for-algorithmic-trading': [
    { title: 'Deep Learning for Algorithmic Trading: A Systematic Review of Methodologies and Applications', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Array (ScienceDirect)', url: 'https://doi.org/10.1016/j.array.2025.100392' },
    { title: 'A Review of Reinforcement Learning in Financial Applications', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2411.12746' },
    { title: 'Algorithmic Trading in Financial Markets: A Systematic Review (PRISMA)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'A Survey of Deep Reinforcement Learning in Financial Markets', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Atlantis Press / ICIBIS', url: 'https://doi.org/10.2991/978-94-6463-144-4_15' },
  ],

  'ai-for-augmented-reality': [
    { title: 'Computer Vision in Augmented, Virtual, Mixed and Extended Reality: A Bibliometric Analysis', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Computers & Graphics (Elsevier)', url: 'https://doi.org/10.1016/j.cag.2024.104102' },
    { title: 'Deep Learning-Based Object Tracking for Augmented Reality: A Comprehensive Survey (2018-2025)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of AR Applications (Brilliance Pub)', url: 'https://www.brilliance-pub.com/JARA/article/view/289' },
    { title: 'Deep Learning-Based Object Pose Estimation: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2405.07801' },
    { title: 'ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual-Inertial and Multi-Map SLAM', type: 'journal_article', year: 2021, authors: ['Campos, Carlos', 'Elvira, Richard', 'Rodríguez, Juan J. Gómez', 'Montiel, José M. M.', 'Tardós, Juan D.'], institution: 'IEEE Transactions on Robotics / University of Zaragoza', url: 'https://doi.org/10.1109/TRO.2021.3075644' },
  ],

  'ai-for-construction': [
    { title: 'Artificial Intelligence and Smart Vision for Building and Construction 4.0: A Comprehensive Review', type: 'survey_paper', year: 2022, authors: ['multiple'], institution: 'Automation in Construction (Elsevier)', url: 'https://doi.org/10.1016/j.autcon.2022.104440' },
    { title: 'A Decade of Artificial Intelligence in the Construction Industry: A Scientometric Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Archives of Computational Methods in Engineering (Springer)', url: 'https://doi.org/10.1007/s11831-026-10583-x' },
    { title: 'Artificial Intelligence in Infrastructure Construction: A Critical Review', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Frontiers of Engineering Management (Springer)', url: 'https://doi.org/10.1007/s42524-024-3128-5' },
    { title: 'Generative Artificial Intelligence for Construction: Use Cases, Opportunities, and Challenges', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Building Engineering (Elsevier)', url: 'https://doi.org/10.1016/j.jobe.2025.112039' },
  ],

  'ai-content-creation': [
    { title: 'Generative AI in Depth: A Survey of Recent Advances, Model Variants, and Real-World Applications', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Big Data (Springer)', url: 'https://doi.org/10.1186/s40537-025-01247-x' },
    { title: 'Advancements in Generative AI: A Comprehensive Review of GANs, GPT, Diffusion Models, and Image Generation', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3396089' },
    { title: 'Video Generation Models as World Simulators (Sora Technical Report)', type: 'technical_report', year: 2024, authors: ['OpenAI'], institution: 'OpenAI', url: 'https://openai.com/research/video-generation-models-as-world-simulators' },
    { title: 'Creators\' Toolkit Report: 86% of Global Creators Using AI', type: 'report', year: 2025, authors: ['Adobe Research'], institution: 'Adobe MAX', url: 'https://news.adobe.com/news/2025/10/adobe-max-2025-creators-survey' },
  ],

  'ai-customer-service': [
    { title: 'A Contemporary Review on Chatbots, AI-Powered Virtual Conversational Agents, and LLMs for Customer Service', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Computer Science Review (Elsevier)', url: 'https://doi.org/10.1016/j.cosrev.2024.100632' },
    { title: 'Gartner Survey: 85% of Customer Service Leaders Will Explore GenAI in 2025', type: 'report', year: 2024, authors: ['Gartner Research'], institution: 'Gartner', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-12-09-gartner-survey-reveals-85-percent-of-customer-service-leaders-will-explore-or-pilot-customer-facing-conversational-genai-in-2025' },
    { title: 'Optimizing Chatbots to Improve Customer Experience: A Data-Driven Approach', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Applied Sciences (MDPI)', url: 'https://doi.org/10.3390/app15179439' },
    { title: 'Conversational AI and Customer Engagement: A Systematic Literature Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'International Journal of Scientific & Management Research', url: 'https://doi.org/10.5281/zenodo.10010567' },
  ],

  'ai-drone-autonomy': [
    { title: 'Vision-Based Learning for Drones: A Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / Frontiers in Robotics and AI', url: 'https://arxiv.org/abs/2312.05019' },
    { title: 'Reinforcement Learning-Based Drone Simulators: Survey, Opportunities, and Challenges', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-024-10933-w' },
    { title: 'A Comprehensive Survey of Deep Reinforcement Learning in UAV Communications and Networking', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Sustainable Computing: Informatics & Systems (Elsevier)', url: 'https://doi.org/10.1016/j.suscom.2025.100995' },
    { title: 'A Survey of Deep Learning Techniques and Computer Vision in Robotic and Drone Applications', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ResearchGate / IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3382567' },
  ],
};

// ─── Main Logic ──────────────────────────────────────────────
let enriched = 0;
let skipped = 0;

for (const [slug, sources] of Object.entries(EXPERT_SOURCES)) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ NOT FOUND: ${filePath}`);
    skipped++;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const parts = content.split(/^---\s*$/m);

  if (parts.length < 3) {
    console.log(`⚠ NO YAML FOUND: ${slug}`);
    skipped++;
    continue;
  }

  const fm = yaml.load(parts[1]) || {};

  if (fm.secondary_sources && fm.secondary_sources.length > 0) {
    console.log(`⊙ ALREADY EXISTS: ${slug} (${fm.secondary_sources.length} sources)`);
    skipped++;
    continue;
  }

  fm.secondary_sources = sources;
  fm.updated = TODAY;

  const newYaml = yaml.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"' });
  const newContent = `---\n${newYaml}---${parts.slice(2).join('---')}`;

  try {
    const reParsed = yaml.load(newContent.split(/^---\s*$/m)[1]);
    if (!reParsed || !reParsed.secondary_sources || reParsed.secondary_sources.length !== sources.length) {
      console.log(`⚠ ROUND-TRIP FAILED: ${slug}`);
      skipped++;
      continue;
    }
  } catch (e) {
    console.log(`⚠ YAML VALIDATION FAILED: ${slug} — ${e.message}`);
    skipped++;
    continue;
  }

  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ ENRICHED: ${slug} (+${sources.length} secondary_sources)`);
  enriched++;
}

console.log(`\n📊 Done: ${enriched} enriched, ${skipped} skipped, ${Object.keys(EXPERT_SOURCES).length} total`);
