#!/usr/bin/env node
/**
 * Phase 4: Source Enrichment Sprint 02
 * 
 * Adds expert secondary_sources to 12 AI articles.
 * Pattern: js-yaml parsing, inject secondary_sources, validate YAML round-trip.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'ai');
const TODAY = '2026-05-24';

// ─── Expert Source Database ─────────────────────────────────
const EXPERT_SOURCES = {

  'text-classification': [
    { title: 'A Survey of Text Classification With Transformers: How Wide? How Large? How Long? How Accurate? How Different?', type: 'survey_paper', year: 2024, authors: ['Chovanec, Marek', 'Fields, Eric', 'et al.'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2023.3347856' },
    { title: 'A Survey on Text Classification Algorithms: From Traditional to Deep Learning', type: 'survey_paper', year: 2022, authors: ['multiple'], institution: 'Information (MDPI)', url: 'https://doi.org/10.3390/info13020083' },
    { title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding', type: 'conference_paper', year: 2019, authors: ['Devlin, Jacob', 'Chang, Ming-Wei', 'Lee, Kenton', 'Toutanova, Kristina'], institution: 'Google AI / NAACL', url: 'https://arxiv.org/abs/1810.04805' },
    { title: 'Trends in Natural Language Processing for Text Classification: A Comprehensive Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ResearchGate / SN Computer Science', url: 'https://doi.org/10.1007/s42979-025-03474-8' },
  ],

  'machine-translation': [
    { title: 'Attention Is All You Need (Transformer)', type: 'conference_paper', year: 2017, authors: ['Vaswani, Ashish', 'Shazeer, Noam', 'Parmar, Niki', 'Uszkoreit, Jakob', 'Jones, Llion', 'Gomez, Aidan N.', 'Kaiser, Łukasz', 'Polosukhin, Illia'], institution: 'Google Brain / NeurIPS', url: 'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf' },
    { title: 'Neural Machine Translation by Jointly Learning to Align and Translate (Attention Mechanism)', type: 'conference_paper', year: 2015, authors: ['Bahdanau, Dzmitry', 'Cho, Kyunghyun', 'Bengio, Yoshua'], institution: 'ICLR', url: 'https://arxiv.org/abs/1409.0473' },
    { title: 'Google\'s Neural Machine Translation System: Bridging the Gap between Human and Machine Translation', type: 'technical_report', year: 2016, authors: ['Wu, Yonghui', 'Schuster, Mike', 'Chen, Zhifeng', 'Le, Quoc V.', 'et al.'], institution: 'Google', url: 'https://arxiv.org/abs/1609.08144' },
    { title: 'Neural Machine Translation: A Review of Methods, Advances, and Challenges', type: 'survey_paper', year: 2020, authors: ['Stahlberg, Felix'], institution: 'Journal of AI Research', url: 'https://doi.org/10.1613/jair.1.12007' },
  ],

  'video-understanding': [
    { title: 'CNNs, RNNs and Transformers in Human Action Recognition: A Survey and A Hybrid Proposal', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-025-11388-3' },
    { title: 'Action Recognition: A Comprehensive Survey of Tasks, Methods, and Applications', type: 'survey_paper', year: 2026, authors: ['multiple'], institution: 'Array (ScienceDirect)', url: 'https://doi.org/10.1016/j.array.2025.100386' },
    { title: 'From CNNs to Transformers in Multimodal Human Activity Recognition: A Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3664815' },
    { title: 'Understanding Video Transformers: A Review on Architecture, Tasks, and Applications', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Intelligence & Computing (SPJ)', url: 'https://doi.org/10.34133/icomputing.0143' },
  ],

  'speech-recognition': [
    { title: 'Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)', type: 'technical_report', year: 2022, authors: ['Radford, Alec', 'Kim, Jong Wook', 'Xu, Tao', 'Brockman, Greg', 'McLeavey, Christine', 'Sutskever, Ilya'], institution: 'OpenAI', url: 'https://arxiv.org/abs/2212.04356' },
    { title: 'End-to-End Speech Recognition: A Survey', type: 'survey_paper', year: 2023, authors: ['Prabhavalkar, Rohit', 'Hori, Takaaki', 'Sainath, Tara N.', 'Schlüter, Ralf', 'Watanabe, Shinji'], institution: 'IEEE/ACM TASLP', url: 'https://doi.org/10.1109/TASLP.2023.3328283' },
    { title: 'Automatic Speech Recognition in the Modern Era: A Comprehensive Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv / ScienceDirect', url: 'https://arxiv.org/abs/2510.12827' },
    { title: 'Deep Neural Networks for Acoustic Modeling in Speech Recognition', type: 'journal_article', year: 2012, authors: ['Hinton, Geoffrey', 'Deng, Li', 'Yu, Dong', 'Dahl, George', 'Mohamed, Abdel-rahman', 'Jaitly, Navdeep', 'Senior, Andrew', 'Vanhoucke, Vincent', 'Nguyen, Patrick', 'Sainath, Tara', 'Kingsbury, Brian'], institution: 'IEEE Signal Processing Magazine / Microsoft Research', url: 'https://doi.org/10.1109/MSP.2012.2205597' },
  ],

  'generative-ai-overview': [
    { title: 'Generative AI in Depth: A Survey of Recent Advances, Model Variants, and Real-World Applications', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Big Data (Springer)', url: 'https://doi.org/10.1186/s40537-025-01247-x' },
    { title: 'A Survey on Generative Diffusion Models', type: 'survey_paper', year: 2024, authors: ['Yang, Ling', 'Zhang, Zhilong', 'Song, Yang', 'Hong, Shenda', 'Xu, Runsheng', 'Zhao, Yue', 'Zhang, Wentao', 'Cui, Bin', 'Yang, Ming-Hsuan'], institution: 'IEEE TKDE', url: 'https://doi.org/10.1109/TKDE.2024.3361474' },
    { title: 'Generative Adversarial Networks (GANs)', type: 'conference_paper', year: 2014, authors: ['Goodfellow, Ian', 'Pouget-Abadie, Jean', 'Mirza, Mehdi', 'Xu, Bing', 'Warde-Farley, David', 'Ozair, Sherjil', 'Courville, Aaron', 'Bengio, Yoshua'], institution: 'NeurIPS / University of Montreal', url: 'https://papers.nips.cc/paper/2014/hash/5ca3e9b122f61f8f06494c97b1afccf3-Abstract.html' },
    { title: 'Auto-Encoding Variational Bayes (VAE)', type: 'conference_paper', year: 2014, authors: ['Kingma, Diederik P.', 'Welling, Max'], institution: 'ICLR / University of Amsterdam', url: 'https://arxiv.org/abs/1312.6114' },
  ],

  'deep-reinforcement-learning-algorithms': [
    { title: 'Human-Level Control Through Deep Reinforcement Learning (DQN)', type: 'journal_article', year: 2015, authors: ['Mnih, Volodymyr', 'Kavukcuoglu, Koray', 'Silver, David', 'et al.'], institution: 'Nature / DeepMind', url: 'https://www.nature.com/articles/nature14236' },
    { title: 'Deep Reinforcement Learning: A Survey', type: 'survey_paper', year: 2022, authors: ['Li, Yuxi'], institution: 'IEEE Transactions on Neural Networks and Learning Systems', url: 'https://doi.org/10.1109/TNNLS.2021.3071272' },
    { title: 'Proximal Policy Optimization Algorithms (PPO)', type: 'conference_paper', year: 2017, authors: ['Schulman, John', 'Wolski, Filip', 'Dhariwal, Prafulla', 'Radford, Alec', 'Klimov, Oleg'], institution: 'OpenAI', url: 'https://arxiv.org/abs/1707.06347' },
    { title: 'Soft Actor-Critic: Off-Policy Maximum Entropy Deep RL with a Stochastic Actor (SAC)', type: 'conference_paper', year: 2018, authors: ['Haarnoja, Tuomas', 'Zhou, Aurick', 'Abbeel, Pieter', 'Levine, Sergey'], institution: 'UC Berkeley / ICML', url: 'https://arxiv.org/abs/1801.01290' },
  ],

  'edge-ai-and-tinyml': [
    { title: 'Empowering Edge Intelligence: A Comprehensive Survey on On-Device AI Models', type: 'survey_paper', year: 2025, authors: ['Wang, Zhiqing', 'Tang, Zhiqing', 'et al.'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3724420' },
    { title: 'Tiny Machine Learning and On-Device Inference: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Sensors (MDPI)', url: 'https://doi.org/10.3390/s25103191' },
    { title: 'Tiny Machine Learning (TinyML): Research Trends and the Future', type: 'survey_paper', year: 2026, authors: ['multiple'], institution: 'Array (ScienceDirect)', url: 'https://doi.org/10.1016/j.array.2025.100392' },
    { title: 'MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications', type: 'conference_paper', year: 2017, authors: ['Howard, Andrew G.', 'Zhu, Menglong', 'Chen, Bo', 'Kalenichenko, Dmitry', 'Wang, Weijun', 'Weyand, Tobias', 'Andreetto, Marco', 'Adam, Hartwig'], institution: 'Google', url: 'https://arxiv.org/abs/1704.04861' },
  ],

  'few-shot-learning': [
    { title: 'Meta-learning Approaches for Few-Shot Learning: A Survey of Recent Advances', type: 'survey_paper', year: 2024, authors: ['Gharoun, Hassan', 'Momenifar, Fereshteh', 'Chen, Fang', 'Gandomi, Amir H.'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3659943' },
    { title: 'Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks (MAML)', type: 'conference_paper', year: 2017, authors: ['Finn, Chelsea', 'Abbeel, Pieter', 'Levine, Sergey'], institution: 'UC Berkeley / ICML', url: 'https://arxiv.org/abs/1703.03400' },
    { title: 'Prototypical Networks for Few-shot Learning', type: 'conference_paper', year: 2017, authors: ['Snell, Jake', 'Swersky, Kevin', 'Zemel, Richard S.'], institution: 'University of Toronto / NeurIPS', url: 'https://arxiv.org/abs/1703.05175' },
    { title: 'Matching Networks for One Shot Learning', type: 'conference_paper', year: 2016, authors: ['Vinyals, Oriol', 'Blundell, Charles', 'Lillicrap, Timothy', 'Kavukcuoglu, Koray', 'Wierstra, Daan'], institution: 'Google DeepMind / NeurIPS', url: 'https://arxiv.org/abs/1606.04080' },
  ],

  'neural-rendering': [
    { title: 'NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis', type: 'conference_paper', year: 2020, authors: ['Mildenhall, Ben', 'Srinivasan, Pratul P.', 'Tancik, Matthew', 'Barron, Jonathan T.', 'Ramamoorthi, Ravi', 'Ng, Ren'], institution: 'Google Research / UC Berkeley / ECCV', url: 'https://arxiv.org/abs/2003.08934' },
    { title: 'NeRF: Neural Radiance Field in 3D Vision — A Comprehensive Review', type: 'survey_paper', year: 2022, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2210.00379' },
    { title: 'NeRF-based Multi-View Synthesis Techniques: A Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3406987' },
    { title: 'A Survey of 3D Reconstruction: From Multi-View Geometry to NeRF and 3D Gaussian Splatting', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Sensors (MDPI)', url: 'https://doi.org/10.3390/s25185748' },
  ],

  'neural-style-transfer': [
    { title: 'A Neural Algorithm of Artistic Style (Seminal Paper)', type: 'conference_paper', year: 2016, authors: ['Gatys, Leon A.', 'Ecker, Alexander S.', 'Bethge, Matthias'], institution: 'University of Tübingen / CVPR', url: 'https://arxiv.org/abs/1508.06576' },
    { title: 'Style Transfer: A Decade Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2506.19278' },
    { title: 'Style Transfer Review: Traditional Machine Learning to Deep Learning Approaches', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Information (MDPI)', url: 'https://doi.org/10.3390/info16020157' },
    { title: 'Perceptual Losses for Real-Time Style Transfer and Super-Resolution', type: 'conference_paper', year: 2016, authors: ['Johnson, Justin', 'Alahi, Alexandre', 'Fei-Fei, Li'], institution: 'Stanford / ECCV', url: 'https://arxiv.org/abs/1603.08155' },
  ],

  'bayesian-deep-learning': [
    { title: 'Dropout as a Bayesian Approximation: Representing Model Uncertainty in Deep Learning', type: 'conference_paper', year: 2016, authors: ['Gal, Yarin', 'Ghahramani, Zoubin'], institution: 'University of Cambridge / ICML', url: 'https://arxiv.org/abs/1506.02142' },
    { title: 'A Survey on Uncertainty Estimation in Deep Learning Classification Systems from a Bayesian Perspective', type: 'survey_paper', year: 2021, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3477140' },
    { title: 'A Survey of Uncertainty in Deep Neural Networks', type: 'survey_paper', year: 2023, authors: ['Gawlikowski, Jakob', 'Tassi, Cedrique Rovile Njieutcheu', 'Ali, Mohsin', 'Lee, Jongseok', 'Humm, Matthias', 'Feng, Di', 'Kruspe, Anna', 'Triebel, Rudolph', 'Jung, Peter', 'Roscher, Ribana', 'Shahzad, Muhammad', 'Yang, Wen', 'Bamler, Richard', 'Zhu, Xiao Xiang'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-023-10562-9' },
    { title: 'Weight Uncertainty in Neural Networks (Bayes by Backprop)', type: 'conference_paper', year: 2015, authors: ['Blundell, Charles', 'Cornebise, Julien', 'Kavukcuoglu, Koray', 'Wierstra, Daan'], institution: 'Google DeepMind / ICML', url: 'https://arxiv.org/abs/1505.05424' },
  ],

  'causal-inference-ai': [
    { title: 'Causality: Models, Reasoning, and Inference (Textbook)', type: 'textbook', year: 2009, authors: ['Pearl, Judea'], institution: 'Cambridge University Press', url: 'https://doi.org/10.1017/CBO9780511803161' },
    { title: 'Causal Inference Meets Deep Learning: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'PMC / Research', url: 'https://www.nature.com/articles/s41598-024-65873-y' },
    { title: 'A Survey of Deep Causal Models and Their Industrial Applications', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-024-10886-0' },
    { title: 'Toward Causal Representation Learning (Schölkopf et al.)', type: 'journal_article', year: 2021, authors: ['Schölkopf, Bernhard', 'Locatello, Francesco', 'Bauer, Stefan', 'Ke, Nan Rosemary', 'Kalchbrenner, Nal', 'Goyal, Anirudh', 'Bengio, Yoshua'], institution: 'Proc. IEEE / MPI-IS / Mila', url: 'https://doi.org/10.1109/JPROC.2021.3058954' },
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

  // Parse frontmatter
  const fm = yaml.load(parts[1]) || {};

  // Skip if already has secondary_sources
  if (fm.secondary_sources && fm.secondary_sources.length > 0) {
    console.log(`⊙ ALREADY EXISTS: ${slug} (${fm.secondary_sources.length} sources)`);
    skipped++;
    continue;
  }

  // Add secondary_sources
  fm.secondary_sources = sources;
  fm.updated = TODAY;

  // Dump back
  const newYaml = yaml.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"' });
  const newContent = `---\n${newYaml}---${parts.slice(2).join('---')}`;

  // Validate round-trip
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
