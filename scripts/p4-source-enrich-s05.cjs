#!/usr/bin/env node
/**
 * Phase 4: Source Enrichment Sprint 05
 * Adds expert secondary_sources to 12 more AI articles.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'ai');
const TODAY = '2026-05-24';

const EXPERT_SOURCES = {

  'ai-call-center': [
    { title: 'A Contemporary Review on Chatbots, AI-Powered Virtual Conversational Agents, and LLMs: Applications in Contact Centers', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Computer Science Review (Elsevier)', url: 'https://doi.org/10.1016/j.cosrev.2024.100632' },
    { title: 'DMG Consulting: Contact Center AI Goals and Investment Priorities for 2024', type: 'report', year: 2024, authors: ['Fluss, Donna'], institution: 'DMG Consulting / CRMXchange', url: 'https://www.crmxchange.com/uploadedFiles/Columns/CRM_Columns/images/DMG_2024_Goals_Survey_Report.pdf' },
    { title: 'Azure AI Services for Call Center Overview: Speech-to-Text, Sentiment, Summarization', type: 'technical_report', year: 2024, authors: ['Microsoft'], institution: 'Microsoft Azure AI', url: 'https://docs.azure.cn/en-us/ai-services/speech-service/call-center-overview' },
    { title: 'Statista: AI Use at Contact Centers Worldwide 2024 — Voice Authentication, Process Automation, Analytics', type: 'report', year: 2024, authors: ['Statista Research'], institution: 'Statista', url: 'https://www.statista.com/topics/12642/ai-use-at-contact-centers/' },
  ],

  'ai-content-moderation-platforms': [
    { title: 'A Comprehensive Review on Automatic Hate Speech Detection in the Era of Large Language Models', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Social Network Analysis & Mining (Springer)', url: 'https://doi.org/10.1007/s13278-024-01361-3' },
    { title: 'Hate Speech Detection Using Large Language Models: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3532568' },
    { title: 'Recent Advances in Online Hate Speech Moderation: Multimodality and the Role of Large Models', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'EMNLP Findings / arXiv', url: 'https://arxiv.org/abs/2401.16727' },
    { title: 'Multimodal Large Language Models Can Make Context-Sensitive Hate Speech Detection More Accurate', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Nature Human Behaviour', url: 'https://doi.org/10.1038/s41562-025-02360-w' },
  ],

  'ai-customer-analytics': [
    { title: 'AI and Consumer Behavior: From Predictive to Generative AI — A Comprehensive Analysis', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Journal of Business Research (Elsevier)', url: 'https://doi.org/10.1016/j.jbusres.2024.114624' },
    { title: 'Machine-Learning Models for Customer-Behavior Analytics: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'WSP Publishing / Computational Intelligence', url: 'https://doi.org/10.47297/taposatWSP2633-456905.20250606' },
    { title: 'AI-Driven Customer Segmentation: A Systematic Literature Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'GAP Interdisciplinarities', url: 'https://doi.org/10.5281/zenodo.12665387' },
    { title: 'Customer Profiling, Segmentation, and Sales Prediction Using AI in CRM', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Neural Computing & Applications (Springer)', url: 'https://doi.org/10.1007/s00521-023-09339-6' },
  ],

  'ai-digital-marketing': [
    { title: 'Artificial Intelligence in Digital Marketing: Insights from a Comprehensive Bibliometric Review', type: 'survey_paper', year: 2023, authors: ['multiple'], institution: 'Information (MDPI)', url: 'https://doi.org/10.3390/info14120664' },
    { title: 'Targeted and Personalized Online Advertising in the Age of AI: A Literature Review and Research Agenda', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Journal of Advertising Research (ResearchGate)', url: 'https://doi.org/10.2501/JAR-2024-032' },
    { title: 'Martech for 2025: AI Use Cases, Stack Foundations, and Market Structure (108-page Report)', type: 'report', year: 2024, authors: ['Brinker, Scott', 'et al.'], institution: 'Chief Marketing Technologist / Martech', url: 'https://chiefmartec.com/2024/12/martech-for-2025/' },
    { title: 'Personalization Done Right (BCG Survey: 80%+ Consumers Expect Personalized Experiences)', type: 'journal_article', year: 2024, authors: ['Abraham, Mark', 'Edelman, David C.', 'et al.'], institution: 'Harvard Business Review', url: 'https://hbr.org/2024/11/personalization-done-right' },
  ],

  'ai-digital-twins-healthcare': [
    { title: 'Digital Twins in Healthcare: A Review of AI-Powered Practical Applications in Personalized Medicine', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Big Data (Springer)', url: 'https://doi.org/10.1186/s40537-025-01280-w' },
    { title: 'Concepts and Applications of Digital Twins in Healthcare and Medicine', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Patterns (Cell Press / Elsevier)', url: 'https://doi.org/10.1016/j.patter.2024.101040' },
    { title: 'Medical Digital Twins: Enabling Precision Medicine — A Health Policy Perspective', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'The Lancet Digital Health', url: 'https://doi.org/10.1016/S2589-7500(25)00028-7' },
    { title: 'A Comprehensive Review of Digital Twin in Healthcare: Personalized Medicine and Patient-Specific Simulation', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Digital Health (SAGE)', url: 'https://doi.org/10.1177/20552076241304078' },
  ],

  'ai-disaster-prediction': [
    { title: 'Deep Artificial Intelligence Applications for Natural Disaster Management: A Methodological Review', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Ecological Indicators (Elsevier)', url: 'https://doi.org/10.1016/j.ecolind.2024.112067' },
    { title: 'Global Prediction of Extreme Floods in Ungauged Watersheds (Google AI)', type: 'journal_article', year: 2024, authors: ['Nearing, Grey', 'Cohen, Deborah', 'Dube, Tadele', 'et al.'], institution: 'Google Research / Nature', url: 'https://www.nature.com/articles/s41586-024-07145-1' },
    { title: 'Machine Learning in Disaster Management: Recent Developments and Future Directions', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Machine Learning & Knowledge Extraction (MDPI)', url: 'https://doi.org/10.3390/make4020020' },
    { title: 'AI-Driven Disaster Prediction and Early Warning Systems: A Systematic Literature Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'International Journal of Research Publication', url: 'https://doi.org/10.5281/zenodo.13825419' },
  ],

  'ai-document-digitization': [
    { title: 'Handwritten Text Recognition: A Comprehensive Survey of Deep Learning Approaches', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv (40+ primary studies)', url: 'https://arxiv.org/abs/2502.08417' },
    { title: 'Handwritten Recognition Techniques: A Comprehensive Methodological Review (2014-2024)', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Symmetry (MDPI)', url: 'https://doi.org/10.3390/sym16060681' },
    { title: 'Enhancement of Handwritten Text Recognition Using AI-Based Hybrid CNN-RNN with CTC Decoding', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'MethodsX (Elsevier)', url: 'https://doi.org/10.1016/j.mex.2024.102690' },
    { title: 'Improving Document Digitization with Machine Learning: A Comprehensive Review of OCR, NLP, and Computer Vision', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'International Journal of Science & Advanced Technology', url: 'https://doi.org/10.5281/zenodo.10886567' },
  ],

  'ai-document-understanding': [
    { title: 'Deep Learning based Visually Rich Document Content Understanding: A Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv (comprehensive survey of LayoutLM, DocFormer, etc.)', url: 'https://arxiv.org/abs/2408.01287' },
    { title: 'LayoutLM: Pre-training of Text and Layout for Document Image Understanding (Microsoft)', type: 'conference_paper', year: 2020, authors: ['Xu, Yiheng', 'Li, Minghao', 'Cui, Lei', 'Huang, Shaohan', 'Wei, Furu', 'Zhou, Ming'], institution: 'Microsoft Research / KDD', url: 'https://arxiv.org/abs/1912.13318' },
    { title: 'Deep Learning Based Key Information Extraction from Business Documents: A Systematic Literature Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3749369' },
    { title: 'DocLLM: A Layout-Aware Generative Language Model for Multimodal Document Understanding', type: 'conference_paper', year: 2024, authors: ['Wang, Dongsheng', 'Raman, Natraj', 'Sibue, Mathieu', 'Ma, Zhiqiang', 'Babkin, Petr', 'Kaur, Simerjot', 'Pei, Yulong', 'Nourbakhsh, Armineh', 'Liu, Xiaomo'], institution: 'JPMorgan Chase AI Research / ACL', url: 'https://aclanthology.org/2024.acl-long.463/' },
  ],

  'ai-electronic-health-records': [
    { title: 'A Comprehensive Survey of Electronic Health Record Data Modeling Using AI and Deep Learning', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv / JAMIA', url: 'https://arxiv.org/abs/2507.12774' },
    { title: 'Advances in Natural Language Processing for Healthcare: A Systematic Review of NLP Applications in EHR', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Computer Science Review (Elsevier)', url: 'https://doi.org/10.1016/j.cosrev.2025.100678' },
    { title: 'Evaluation of Electronic Health Record-Integrated Artificial Intelligence for Clinical Decision Support', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'npj Health Systems (Nature)', url: 'https://doi.org/10.1038/s44401-025-00064-x' },
    { title: 'A Review of Deep Learning Models and Online Healthcare Databases for EHR Analysis', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-024-10876-2' },
  ],

  'ai-employee-experience': [
    { title: 'Examining the Impact of Artificial Intelligence on Employee Performance and Experience: A Bibliometric Analysis', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'International Journal of Information Management (Elsevier)', url: 'https://doi.org/10.1016/j.ijinfomgt.2024.102817' },
    { title: 'Gartner Survey: 38% of HR Leaders Piloting or Implementing Generative AI (2024)', type: 'report', year: 2024, authors: ['Gartner Research'], institution: 'Gartner', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-02-27-gartner-finds-38-percent-hr-leaders-piloting-generative-ai' },
    { title: 'Generative AI and the Future of HR: A Comprehensive Analysis', type: 'report', year: 2023, authors: ['Bersin, Josh', 'Deloitte / McKinsey'], institution: 'McKinsey & Company', url: 'https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/generative-ai-and-the-future-of-hr' },
    { title: '2024 Talent Trends: AI in HR — SHRM Survey Findings on Learning, Development, Recruitment', type: 'report', year: 2024, authors: ['SHRM Research'], institution: 'Society for Human Resource Management (SHRM)', url: 'https://shrm-res.cloudinary.com/image/upload/AI/2024-Talent-Trends-Survey_Artificial-Intelligence-Findings.pdf' },
  ],

  'ai-fleet-management': [
    { title: 'AI-Driven Optimization of Vehicle Routing Problems in Supply Chain: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Flexible Services & Manufacturing Journal (Springer)', url: 'https://doi.org/10.1007/s10696-025-09653-2' },
    { title: 'Deep Reinforcement Learning for Solving the Vehicle Routing Problem: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Transactions on Intelligent Transportation Systems', url: 'https://doi.org/10.1109/TITS.2024.3385267' },
    { title: 'Real-Time Route Optimization in Logistics: A Deep Learning Framework Integrating Forecasting and Reinforcement Learning', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'World Journal of Advanced Research & Reviews', url: 'https://doi.org/10.30574/wjarr.2025.26.2.1524' },
    { title: 'Multi-Objective Optimization for Dynamic Logistics Using Hierarchical Deep Reinforcement Learning', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-18309-y' },
  ],

  'ai-for-crisis-hotlines': [
    { title: 'Real-Time Assistance in Suicide Prevention Helplines Using a Deep Learning-Based Approach', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'International Journal of Medical Informatics (Elsevier)', url: 'https://doi.org/10.1016/j.ijmedinf.2024.105635' },
    { title: 'Predicting Imminent Suicide Risk in a Crisis Hotline Using Machine Learning on Chat Data', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-28704-0' },
    { title: 'Decoding the Cry for Help: AI\'s Emerging Role in Suicide Risk Detection — Chatbots, NLP, LLMs', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'AI and Ethics (Springer)', url: 'https://doi.org/10.1007/s43681-025-00758-w' },
    { title: 'Deep Learning and Large Language Models for Audio and Text Analysis of Crisis Hotline Conversations', type: 'conference_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / IEEE EMBC', url: 'https://arxiv.org/abs/2409.06164' },
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
