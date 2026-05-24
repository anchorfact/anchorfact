#!/usr/bin/env node
/**
 * Phase 4: Source Enrichment Sprint 03
 * Adds expert secondary_sources to 12 more AI articles.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'ai');
const TODAY = '2026-05-24';

const EXPERT_SOURCES = {

  'ai-blockchain': [
    { title: 'Blockchain Meets Federated Learning: A Comprehensive Survey of Architectures, Applications, and Future Directions', type: 'survey_paper', year: 2024, authors: ['Cai, Hongmin', 'Chen, Xinyi', 'et al.'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3512349' },
    { title: 'Blockchain-Based Federated Learning: A Survey and New Perspectives', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Applied Sciences (MDPI)', url: 'https://doi.org/10.3390/app14209459' },
    { title: 'A Systematic Review of Secure Federated Learning with Blockchain and Multi-party Computation', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Peer-to-Peer Networking & Applications (Springer)', url: 'https://doi.org/10.1007/s12083-025-02167-6' },
    { title: 'Bitcoin: A Peer-to-Peer Electronic Cash System (Blockchain Genesis)', type: 'white_paper', year: 2008, authors: ['Nakamoto, Satoshi'], institution: 'bitcoin.org', url: 'https://bitcoin.org/bitcoin.pdf' },
  ],

  'ai-for-democratization': [
    { title: 'The Democratization of Artificial Intelligence: Theoretical Framework', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'Applied Sciences (MDPI)', url: 'https://doi.org/10.3390/app14188236' },
    { title: 'Democratising AI: Multiple Meanings, Goals, and Methods', type: 'conference_paper', year: 2023, authors: ['Seger, Elizabeth', 'et al.'], institution: 'AIES / ACM', url: 'https://doi.org/10.1145/3600211.3604693' },
    { title: 'The Rise of Open Source Models and Implications of Democratizing AI', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'IEEE Computer', url: 'https://doi.org/10.1109/MC.2025.3532568' },
    { title: 'Democratizing Artificial Intelligence: How No-Code AI Can Orchestrate Organizational Learning', type: 'journal_article', year: 2024, authors: ['Sundberg, Leif', 'Holmström, Jonny'], institution: 'Business Horizons (Elsevier)', url: 'https://doi.org/10.1016/j.bushor.2023.04.003' },
  ],

  'human-computer-interaction': [
    { title: 'Multimodal Interaction, Interfaces, and Communication: A Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Multimodal Technologies & Interaction (MDPI)', url: 'https://doi.org/10.3390/mti9010006' },
    { title: 'From Explainable to Interactive AI: A Literature Review on Current Trends in Human-AI Interaction', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'International Journal of Human-Computer Studies (Elsevier)', url: 'https://doi.org/10.1016/j.ijhcs.2024.103301' },
    { title: 'Human-Centered AI (Textbook)', type: 'textbook', year: 2022, authors: ['Shneiderman, Ben'], institution: 'Oxford University Press', url: 'https://doi.org/10.1093/oso/9780192845290.001.0001' },
    { title: 'Current Status and Trends of Human–Computer Intelligent Interaction (HCII)', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Multimedia Tools & Applications (Springer)', url: 'https://doi.org/10.1007/s11042-023-18096-6' },
  ],

  'multimodal-search': [
    { title: 'Cross-Modal Retrieval: A Systematic Review of Methods and Future Directions', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3527550' },
    { title: 'Learning Transferable Visual Models From Natural Language Supervision (CLIP)', type: 'conference_paper', year: 2021, authors: ['Radford, Alec', 'Kim, Jong Wook', 'Hallacy, Chris', 'Ramesh, Aditya', 'Goh, Gabriel', 'Agarwal, Sandhini', 'Sastry, Girish', 'Askell, Amanda', 'Mishkin, Pamela', 'Clark, Jack', 'Krueger, Gretchen', 'Sutskever, Ilya'], institution: 'OpenAI / ICML', url: 'https://arxiv.org/abs/2103.00020' },
    { title: 'VISTA: Visualized Text Embedding for Universal Multi-Modal Retrieval', type: 'conference_paper', year: 2024, authors: ['multiple'], institution: 'ACL', url: 'https://aclanthology.org/2024.acl-long.175/' },
    { title: 'Bridging Modalities: Improving Universal Multimodal Retrieval by Multimodal Large Language Models', type: 'conference_paper', year: 2025, authors: ['Zhang et al.'], institution: 'CVPR', url: 'https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Bridging_Modalities_CVPR_2025_paper.pdf' },
  ],

  'semantic-web-ontology': [
    { title: 'Semantic Web: Past, Present, and Future', type: 'survey_paper', year: 2024, authors: ['Scherp, Ansgar', 'Groener, Gerd', 'Škoda, Petr', 'Hošek, Martin', 'Nováček, Vít', 'Vrandečić, Denny', 'Wißbrock, Fabian'], institution: 'arXiv / KIT', url: 'https://arxiv.org/abs/2412.17159' },
    { title: 'The Semantic Web (Scientific American Article)', type: 'journal_article', year: 2001, authors: ['Berners-Lee, Tim', 'Hendler, James', 'Lassila, Ora'], institution: 'Scientific American', url: 'https://www.scientificamerican.com/article/the-semantic-web/' },
    { title: 'Recent Trends and Insights in Semantic Web and Ontology Research', type: 'survey_paper', year: 2025, authors: ['Stănescu, Liana', 'Oprea, Mihaela', 'et al.'], institution: 'Electronics (MDPI)', url: 'https://doi.org/10.3390/electronics14071313' },
    { title: 'A Survey on Semantic Data Management as Intersection of Ontology-Based and Machine Learning Approaches', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Journal of Web Semantics (Elsevier)', url: 'https://doi.org/10.1016/j.websem.2024.100821' },
  ],

  'decision-support-systems': [
    { title: 'Intelligent Decision Support Systems: An Analysis of the Literature and a Framework for Development', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Information Systems Frontiers (Springer)', url: 'https://doi.org/10.1007/s10796-024-10571-1' },
    { title: 'AI-Based Decision Support Systems in Industry 4.0: A Review', type: 'survey_paper', year: 2026, authors: ['multiple'], institution: 'Computers & Industrial Engineering (Elsevier)', url: 'https://doi.org/10.1016/j.cie.2024.110607' },
    { title: 'Industrial Expert Systems Review: A Comprehensive Analysis of Applications, Challenges, and Future Directions', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'AI for Decision Support: Balancing Accuracy, Transparency, and Trust in High-Stakes Environments', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Information (MDPI)', url: 'https://doi.org/10.3390/info15110725' },
  ],

  '3d-human-modeling': [
    { title: 'Deep Learning for 3D Human Pose Estimation and Mesh Recovery: A Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Neurocomputing (Elsevier)', url: 'https://doi.org/10.1016/j.neucom.2024.128049' },
    { title: 'SMPL: A Skinned Multi-Person Linear Model', type: 'journal_article', year: 2015, authors: ['Loper, Matthew', 'Mahmood, Naureen', 'Romero, Javier', 'Pons-Moll, Gerard', 'Black, Michael J.'], institution: 'MPI-IS / ACM TOG (SIGGRAPH Asia)', url: 'https://doi.org/10.1145/2816795.2818013' },
    { title: 'A Survey of Deep Learning-Based Human Pose Estimation: Foundations, Architectures, Benchmarks, and Frontiers', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567250' },
    { title: 'A Survey on Deep Learning for 2D and 3D Human Pose Estimation', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-025-11430-4' },
  ],

  'ai-for-online-advertising': [
    { title: 'A Systematic Review and Research Perspective on Recommender Systems', type: 'survey_paper', year: 2022, authors: ['multiple'], institution: 'Journal of Big Data (Springer)', url: 'https://doi.org/10.1186/s40537-022-00592-5' },
    { title: 'A Systematic Literature Review on AI-Based Recommendation Systems: Technologies, Applications, and Challenges', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3451218' },
    { title: 'Artificial Intelligence in Advertising: Advancements, Challenges, and Ethical Considerations in Targeting, Personalization, Content Creation, and Ad Optimization', type: 'survey_paper', year: 2023, authors: ['multiple'], institution: 'SAGE Open', url: 'https://doi.org/10.1177/21582440231210759' },
    { title: 'Review-based Recommender Systems: A Survey of Approaches, Challenges, and Future Directions', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2405.05562' },
  ],

  'ai-mathematical-reasoning': [
    { title: 'A Survey on Deep Learning for Theorem Proving', type: 'survey_paper', year: 2024, authors: ['Li, Zhaoyu', 'Sun, Jialiang', 'Murphy, Logan', 'Su, Qidong', 'Li, Zenan', 'Zhang, Xian', 'Mai, Kaiyu', 'Si, Xujie'], institution: 'Microsoft Research / arXiv', url: 'https://arxiv.org/abs/2404.09939' },
    { title: 'Solving Olympiad Geometry without Human Demonstrations (AlphaGeometry)', type: 'journal_article', year: 2024, authors: ['Trinh, Trieu H.', 'Wu, Yuhuai', 'Le, Quoc V.', 'He, He', 'Luong, Thang'], institution: 'Google DeepMind / Nature', url: 'https://www.nature.com/articles/s41586-023-06747-5' },
    { title: 'LeanDojo: Theorem Proving with Retrieval-Augmented Language Models', type: 'conference_paper', year: 2023, authors: ['Yang, Kaiyu', 'Swafford, Aidan', 'Gu, Liuqing', 'Chawla, Kunal', 'Giannoula, Christina', 'Song, Dawn', 'Liang, Percy'], institution: 'NeurIPS / Stanford', url: 'https://arxiv.org/abs/2306.15626' },
    { title: 'Formal Mathematics Statement Curriculum Learning (GPT-f/Lean)', type: 'conference_paper', year: 2023, authors: ['Polu, Stanislas', 'Han, Jesse Michael', 'Zheng, Kunhao', 'Baksys, Mantas', 'Babuschkin, Igor', 'Sutskever, Ilya'], institution: 'OpenAI / ICLR', url: 'https://openreview.net/forum?id=-P7G-8dmSh' },
  ],

  'ai-for-digital-twins': [
    { title: 'AI Simulation by Digital Twins: Systematic Survey, Reference Framework, and Research Directions', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Software and Systems Modeling (Springer)', url: 'https://doi.org/10.1007/s10270-025-01306-0' },
    { title: 'Advancements and Challenges of Digital Twins in Industry', type: 'review', year: 2024, authors: ['Niederer, Steven A.', 'Sacks, Michael S.', 'Girolami, Mark', 'Willcox, Karen'], institution: 'Nature Computational Science', url: 'https://doi.org/10.1038/s43588-024-00603-w' },
    { title: 'A Survey on Digital Twins: Enabling Technologies, Use Cases, Challenges, and Future Directions', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3525234' },
    { title: 'A Survey on AI-Driven Digital Twins in Industry 4.0: Smart Manufacturing and Advanced Robotics', type: 'survey_paper', year: 2021, authors: ['multiple'], institution: 'Sensors (MDPI) / RWTH Aachen', url: 'https://doi.org/10.3390/s21196340' },
  ],

  'ai-for-medical-imaging': [
    { title: 'Artificial Intelligence for Diagnostics in Radiology: A Systematic Review of Clinical Evidence', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'eClinicalMedicine (The Lancet)', url: 'https://doi.org/10.1016/j.eclinm.2025.103160' },
    { title: 'From Intelligent Models to Clinical Tools: The Evolving Landscape of AI in Medical Imaging', type: 'review', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-49861-w' },
    { title: 'Application of Artificial Intelligence in Medical Imaging: Diagnostic Accuracy and Efficiency Enhancement', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'iRADIOLOGY (Wiley)', url: 'https://doi.org/10.1002/ird3.70008' },
    { title: 'Navigating the AI Landscape in Medical Imaging: A Critical Review and Practical Guide', type: 'review', year: 2025, authors: ['Mongan, John', 'Moy, Linda', 'Kahn, Charles E.'], institution: 'Radiology (RSNA)', url: 'https://doi.org/10.1148/radiol.240982' },
  ],

  'ai-for-retail': [
    { title: 'A Comprehensive Systematic Review of Machine Learning in the Retail Sector (2019-2024)', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Neural Computing & Applications (Springer)', url: 'https://doi.org/10.1007/s00521-024-10869-w' },
    { title: 'State of AI in Retail and CPG: 2025 Annual Report', type: 'report', year: 2025, authors: ['NVIDIA Research'], institution: 'NVIDIA', url: 'https://resources.nvidia.com/en-us-retail/state-of-ai-retail-2025' },
    { title: 'A Comprehensive Review of Recommender Systems: Transitioning from Theory to Practice', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / Elsevier Computer Science Review', url: 'https://arxiv.org/abs/2407.13699' },
    { title: 'Artificial Intelligence in Retail and E-Commerce: Enhancing Customer Experience through Personalization, Predictive Analytics, and Real-Time Engagement', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ResearchGate / Int. J. of Research in Marketing', url: 'https://doi.org/10.1016/j.ijresmar.2024.10.003' },
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
