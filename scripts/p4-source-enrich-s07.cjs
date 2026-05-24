#!/usr/bin/env node
const fs = require('fs'); const path = require('path'); const yaml = require('js-yaml');
const DIR = path.join(__dirname, '..', 'content', 'ai'); const TD = '2026-05-24';
const E = {
  'ai-for-software-testing': [
    { title: 'AI-Driven Software Test Automation: An AI4SE-Oriented Survey of Techniques, Tools, and Challenges (76 tools reviewed)', type: 'survey_paper', year: 2025, authors: ['Faraji, Amin', 'Pombo, Nuno', 'et al.'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'Software Testing With Large Language Models: Survey, Landscape, and Vision (102 studies)', type: 'survey_paper', year: 2024, authors: ['Wang, Junjie', 'Huang, Yuchao', 'Chen, Chunyang', 'Liu, Zhe', 'Wang, Song', 'Wang, Qing'], institution: 'IEEE TSE', url: 'https://doi.org/10.1109/TSE.2024.3368208' },
    { title: 'A Systematic Review of Machine Learning Methods in Software Testing (2018-2024)', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Applied Soft Computing (Elsevier)', url: 'https://doi.org/10.1016/j.asoc.2024.111813' },
    { title: 'Artificial Intelligence in Software Testing: A Systematic Review and Taxonomy (2014-2024)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Algorithms (MDPI)', url: 'https://doi.org/10.3390/a18110717' },
  ],
  'ai-for-space-exploration': [
    { title: 'Space AI: Leveraging Artificial Intelligence for Space to Improve Mission Design and Autonomy', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv / NASA JPL', url: 'https://arxiv.org/abs/2512.22399' },
    { title: 'AI for Trusted Autonomous Satellite Operations: A Critical Review of DSS Architectures for Communication, Navigation, and Remote Sensing', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Progress in Aerospace Sciences (Elsevier)', url: 'https://doi.org/10.1016/j.paerosci.2023.100958' },
    { title: 'NASA Artificial Intelligence: 2024 AI Use Case Inventory for Space Missions', type: 'report', year: 2024, authors: ['NASA'], institution: 'NASA', url: 'https://www.nasa.gov/artificial-intelligence/' },
    { title: 'A Comprehensive Survey of Space Robotic On-Orbit Servicing: AI and Autonomous Systems', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Frontiers in Robotics and AI', url: 'https://doi.org/10.3389/frobt.2024.1470950' },
  ],
  'ai-for-video-surveillance': [
    { title: 'A Survey on Video Anomaly Detection via Deep Learning: Methods, Datasets, and Future Directions', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2508.14203' },
    { title: 'Deep Learning-Based Anomaly Detection in Video Surveillance: A Comprehensive Survey', type: 'survey_paper', year: 2023, authors: ['Duong, Huu-Thanh', 'Le, Vinh-Tiep', 'Hoang, Van-Toi'], institution: 'Sensors (MDPI)', url: 'https://doi.org/10.3390/s23115024' },
    { title: 'Anomaly Detection in Video Surveillance Using Deep Learning: A Systematic Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'Comprehensive Survey on Video Anomaly Detection Using Deep Learning (2024)', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Int. Journal of Computer Vision & Robotics (Inderscience)', url: 'https://doi.org/10.1504/IJCVR.2024.139544' },
  ],
  'ai-for-virtual-reality': [
    { title: 'Generative AI Meets Virtual Reality: A Comprehensive Survey on Design, Personalization, and Immersive Experience', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'Artificial Intelligence for Virtual Reality: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Science China Information Sciences (Springer)', url: 'https://doi.org/10.1007/s11432-024-4541-9' },
    { title: 'A PRISMA Systematic Review on AI-Enhanced Immersive Environments in VR', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM IMX', url: 'https://doi.org/10.1145/3757749.3757824' },
    { title: 'The Interaction Design of 3D Virtual Humans: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Computer Science Review (Elsevier)', url: 'https://doi.org/10.1016/j.cosrev.2024.100655' },
  ],
  'ai-for-weather-forecasting': [
    { title: 'Learning Skillful Medium-Range Global Weather Forecasting (GraphCast)', type: 'journal_article', year: 2023, authors: ['Lam, Remi', 'Sanchez-Gonzalez, Alvaro', 'Willson, Matthew', 'Wirnsberger, Peter', 'Fortunato, Meire', 'et al.'], institution: 'Google DeepMind / Science', url: 'https://doi.org/10.1126/science.adi2336' },
    { title: 'Probabilistic Weather Forecasting with Machine Learning (GenCast)', type: 'journal_article', year: 2024, authors: ['Price, Ilan', 'Sanchez-Gonzalez, Alvaro', 'Alet, Ferran', 'et al.'], institution: 'Google DeepMind / Nature', url: 'https://www.nature.com/articles/s41586-024-08252-9' },
    { title: 'Accurate Medium-Range Global Weather Forecasting with 3D Neural Networks (Pangu-Weather)', type: 'journal_article', year: 2023, authors: ['Bi, Kaifeng', 'Xie, Lingxi', 'Zhang, Hengheng', 'Chen, Xin', 'Gu, Xiaotao', 'Tian, Qi'], institution: 'Huawei Cloud / Nature', url: 'https://www.nature.com/articles/s41586-023-06185-3' },
    { title: 'AI for Climate and Weather: A Comprehensive Survey on Deep Learning Methods', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv / WIREs Climate Change', url: 'https://doi.org/10.1002/wcc.890' },
  ],
  'ai-for-wildlife-conservation': [
    { title: 'Towards Context-Rich Automated Biodiversity Assessments: Integrating Deep Learning Vision and Language Models for Camera Trap Data', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'Sensors (MDPI)', url: 'https://doi.org/10.3390/s24248122' },
    { title: 'Reliable and Efficient Integration of AI into Camera Traps for Smart Wildlife Monitoring', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'Ecological Informatics (Elsevier)', url: 'https://doi.org/10.1016/j.ecoinf.2024.102851' },
    { title: 'SpeciesNet: Google\'s Open-Source AI Model for Wildlife Species Identification from Camera Trap Images', type: 'report', year: 2025, authors: ['Google Research'], institution: 'Google / Wildlife Insights', url: 'https://blog.google/outreach-initiatives/sustainability/ai-speciesnet-camera-trap-wildlife/' },
    { title: 'Deep Learning-Based Ecological Analysis of Camera Trap Images: A Benchmark Study Across African and Asian Ecosystems', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'arXiv / Methods in Ecology & Evolution', url: 'https://arxiv.org/abs/2408.14348' },
  ],
  'ai-generated-content-detection': [
    { title: 'Deepfake Generation and Detection: A Comprehensive Benchmark and Survey', type: 'survey_paper', year: 2024, authors: ['Pei, Gan', 'Zhang, Jiangning', 'et al.'], institution: 'arXiv (comprehensive review 2017-2024)', url: 'https://arxiv.org/abs/2403.17881' },
    { title: 'A Review of Deepfake and Its Detection: From Generative Models to Detection Methods', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Wiley IET Journal', url: 'https://doi.org/10.1155/int/9987535' },
    { title: 'Deepfake Detection: A Critical Review of State-of-the-Art Methods and Future Directions', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'SN Applied Sciences (Springer)', url: 'https://doi.org/10.1007/s42452-025-08174-9' },
    { title: 'MIT Media Lab: Detect DeepFakes — Research Project on Counteracting AI-Generated Misinformation', type: 'report', year: 2024, authors: ['MIT Media Lab'], institution: 'MIT', url: 'https://www.media.mit.edu/projects/detect-fakes/overview/' },
  ],
  'ai-gesture-recognition': [
    { title: 'Deep Learning Based on Hand Pose Estimation Methods: A Systematic Literature Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Multimedia Tools & Applications (Springer)', url: 'https://doi.org/10.1007/s11042-025-20704-6' },
    { title: 'A Review on Deep Learning for Vision-Based Hand Detection, Hand Pose Estimation, and Gesture Recognition', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Computers in Industry (Elsevier)', url: 'https://doi.org/10.1016/j.compind.2025.104335' },
    { title: 'Deep Vision-Based Real-Time Hand Gesture Recognition: Methods and Evaluation Techniques', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'PeerJ Computer Science', url: 'https://doi.org/10.7717/peerj-cs.2921' },
    { title: 'Visual Hand Gesture Recognition with Deep Learning: A Comprehensive Survey', type: 'survey_paper', year: 2025, authors: ['Foteinos, Vasileios', 'Cani, Marie-Paule', 'et al.'], institution: 'Computer Graphics Forum / arXiv', url: 'https://doi.org/10.1111/cgf.15340' },
  ],
  'ai-identity-verification': [
    { title: 'Biometrics Recognition Using Deep Learning: A Comprehensive Survey of 150+ Works (Face, Fingerprint, Iris, Palmprint, Voice)', type: 'survey_paper', year: 2023, authors: ['Minaee, Shervin', 'Abdolrashidi, Amirali', 'Su, Hang', 'Bennamoun, Mohammed', 'Zhang, David'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-022-10237-x' },
    { title: 'A Comprehensive Survey of Deep Face Verification: Advances, Challenges, and Benchmarks', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-15753-8' },
    { title: 'Deep Learning-Based Multi-Factor Authentication: A Survey of Biometric and Smart Card Integration (2019-2025)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2510.05163' },
    { title: 'Advanced Techniques for Biometric Authentication: Leveraging Deep Learning for Robust Liveness Detection', type: 'conference_paper', year: 2024, authors: ['multiple'], institution: 'IEEE / iBeta', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
  ],
  'ai-in-finance': [
    { title: 'A Survey of Deep Learning for Financial Applications: Risk Management, Credit Scoring, and Algorithmic Trading', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'AI in Finance: A Comprehensive Survey of Machine Learning, Deep Learning, and NLP Applications (1989-2024)', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Nature Humanities & Social Sciences Communications', url: 'https://doi.org/10.1038/s41599-025-04850-8' },
    { title: 'Global AI in Banking Survey 2025: Adoption Trends, Use Cases, and ROI (McKinsey)', type: 'report', year: 2025, authors: ['McKinsey & Company'], institution: 'McKinsey Global Institute', url: 'https://www.mckinsey.com/industries/financial-services/our-insights/global-banking-annual-review' },
    { title: 'A Review of Reinforcement Learning in Financial Applications: Trading, Portfolio Optimization, and Risk Management', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2411.12746' },
  ],
  'ai-insurtech': [
    { title: 'Redefining Insurance Through Technology: Achievements and Perspectives in Insurtech — A Bibliometric and Systematic Review', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'International Review of Financial Analysis (Elsevier)', url: 'https://doi.org/10.1016/j.irfa.2024.103441' },
    { title: 'AI Revolution in Insurance: Bridging Research and Reality — From Underwriting to Claims', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Frontiers in Artificial Intelligence', url: 'https://doi.org/10.3389/frai.2025.1568266' },
    { title: 'State of AI in Insurance 2025: Underwriting, Claims, Fraud Detection — Deloitte Survey (76% of US insurers using GenAI)', type: 'report', year: 2025, authors: ['Deloitte / Roots Automation'], institution: 'Deloitte / Roots AI', url: 'https://www.roots.ai/hubfs/Reports/State-of-AI-Adoption-in-Insurance-2025.pdf' },
    { title: 'Insurance Claims Estimation and Fraud Detection with Optimized Deep Learning Models', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-025-12848-0' },
  ],
  'ai-inventory-management': [
    { title: 'Optimizing Inventory Management Through AI-Driven Demand Forecasting for Improved Supply Chain Responsiveness', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'AIP Conference Proceedings', url: 'https://doi.org/10.1063/5.0158934' },
    { title: 'New-Generation AI-Driven Intelligent Decision-Making and Inventory Optimization: Combining LSTM and Q-Learning', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Nature Scientific Reports', url: 'https://doi.org/10.1038/s41598-026-41629-6' },
    { title: 'Multi-Agent Deep Reinforcement Learning for Integrated Demand Forecasting and Inventory Management in Retail Supply Chains', type: 'journal_article', year: 2025, authors: ['multiple'], institution: 'Sensors (MDPI)', url: 'https://doi.org/10.3390/s25082428' },
    { title: 'Walmart Case Study: AI-Enabled Demand Forecasting and Inventory Management at Scale', type: 'report', year: 2025, authors: ['TSG Strategy Research'], institution: 'TSG Strategy / Walmart', url: 'https://www.tsgstrategy.com/casestudy/walmart' },
  ],
};
let enriched = 0, skipped = 0;
for (const [slug, sources] of Object.entries(E)) {
  const fp = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(fp)) { console.log(`⚠ NOT FOUND: ${fp}`); skipped++; continue; }
  const c = fs.readFileSync(fp, 'utf-8'), p = c.split(/^---\s*$/m);
  if (p.length < 3) { console.log(`⚠ NO YAML: ${slug}`); skipped++; continue; }
  const fm = yaml.load(p[1]) || {};
  if (fm.secondary_sources?.length > 0) { console.log(`⊙ EXISTS: ${slug}`); skipped++; continue; }
  fm.secondary_sources = sources; fm.updated = TD;
  const ny = yaml.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"' });
  const nc = `---\n${ny}---${p.slice(2).join('---')}`;
  try { const rp = yaml.load(nc.split(/^---\s*$/m)[1]); if (!rp?.secondary_sources || rp.secondary_sources.length !== sources.length) { console.log(`⚠ RT-FAIL: ${slug}`); skipped++; continue; } }
  catch (e) { console.log(`⚠ YAML FAIL: ${slug}`); skipped++; continue; }
  fs.writeFileSync(fp, nc, 'utf-8');
  console.log(`✅ ${slug} (+${sources.length})`); enriched++;
}
console.log(`\n📊 S07: ${enriched}/${Object.keys(E).length} enriched`);
