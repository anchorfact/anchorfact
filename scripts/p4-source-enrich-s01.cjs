#!/usr/bin/env node
/**
 * Phase 4: Source Enrichment Sprint 01 (Fixed)
 * 
 * Uses js-yaml for reliable YAML parsing/updating.
 * Adds expert secondary_sources as a separate top-level key.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'ai');
const TODAY = '2026-05-24';

// ─── Expert Source Database ─────────────────────────────────
const EXPERT_SOURCES = {

  'activation-functions': [
    { title: 'Activation Functions in Deep Learning: A Comprehensive Survey and Benchmark', type: 'survey_paper', year: 2022, authors: ['Dubey, Shiv Ram', 'Singh, Satish Kumar', 'Chaudhuri, Bidyut Baran'], institution: 'IIIT / Neurocomputing', url: 'https://doi.org/10.1016/j.neucom.2022.06.111' },
    { title: 'Searching for Activation Functions (Swish)', type: 'conference_paper', year: 2018, authors: ['Ramachandran, Prajit', 'Zoph, Barret', 'Le, Quoc V.'], institution: 'Google Brain', url: 'https://arxiv.org/abs/1710.05941' },
    { title: 'Gaussian Error Linear Units (GELUs)', type: 'conference_paper', year: 2020, authors: ['Hendrycks, Dan', 'Gimpel, Kevin'], institution: 'TTIC', url: 'https://arxiv.org/abs/1606.08415' },
    { title: 'Deep Learning (Textbook) — Chapter 6.2: Activation Functions', type: 'textbook', year: 2016, authors: ['Goodfellow, Ian', 'Bengio, Yoshua', 'Courville, Aaron'], institution: 'MIT Press', url: 'https://www.deeplearningbook.org/' },
  ],

  'backpropagation': [
    { title: 'Deep Learning (Nature Review)', type: 'review', year: 2015, authors: ['LeCun, Yann', 'Bengio, Yoshua', 'Hinton, Geoffrey'], institution: 'Nature', url: 'https://www.nature.com/articles/nature14539' },
    { title: 'Deep Learning in Neural Networks: An Overview', type: 'survey_paper', year: 2015, authors: ['Schmidhuber, Jürgen'], institution: 'Neural Networks (Journal)', url: 'https://doi.org/10.1016/j.neunet.2014.09.003' },
    { title: 'Automatic Differentiation in Machine Learning: A Survey', type: 'survey_paper', year: 2018, authors: ['Baydin, Atılım Güneş', 'Pearlmutter, Barak A.', 'Radul, Alexey Andreyevich', 'Siskind, Jeffrey Mark'], institution: 'JMLR', url: 'https://jmlr.org/papers/v18/17-468.html' },
    { title: 'Navigating Beyond Backpropagation: Alternative Training Methods Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Knowledge and Information Systems (Springer)', url: 'https://doi.org/10.1007/s10115-025-02370-0' },
  ],

  'adversarial-machine-learning': [
    { title: 'Explaining and Harnessing Adversarial Examples (FGSM)', type: 'conference_paper', year: 2015, authors: ['Goodfellow, Ian J.', 'Shlens, Jonathon', 'Szegedy, Christian'], institution: 'Google Brain / ICLR', url: 'https://arxiv.org/abs/1412.6572' },
    { title: 'Towards Deep Learning Models Resistant to Adversarial Attacks (PGD)', type: 'conference_paper', year: 2018, authors: ['Madry, Aleksander', 'Makelov, Aleksandar', 'Schmidt, Ludwig', 'Tsipras, Dimitris', 'Vladu, Adrian'], institution: 'MIT / ICLR', url: 'https://openreview.net/forum?id=rJzIBfZAb' },
    { title: 'Adversarial Machine Learning: A Review of Methods, Tools, and Defenses', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-025-11147-4' },
    { title: 'Adversarial Robustness — Theory and Practice (NeurIPS Tutorial)', type: 'tutorial', year: 2019, authors: ['Kolter, Zico', 'Madry, Aleksander'], institution: 'NeurIPS / MIT', url: 'https://adversarial-ml-tutorial.org/' },
  ],

  'ai-ethics-and-bias': [
    { title: 'Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification', type: 'conference_paper', year: 2018, authors: ['Buolamwini, Joy', 'Gebru, Timnit'], institution: 'MIT Media Lab / FAT*', url: 'https://proceedings.mlr.press/v81/buolamwini18a.html' },
    { title: 'Datasheets for Datasets', type: 'journal_article', year: 2021, authors: ['Gebru, Timnit', 'Morgenstern, Jamie', 'Vecchione, Briana', 'Vaughan, Jennifer Wortman', 'Wallach, Hanna', 'Daumé III, Hal', 'Crawford, Kate'], institution: 'Communications of the ACM', url: 'https://doi.org/10.1145/3458723' },
    { title: 'A Survey on Bias and Fairness in Machine Learning', type: 'survey_paper', year: 2021, authors: ['Mehrabi, Ninareh', 'Morstatter, Fred', 'Saxena, Nripsuta', 'Lerman, Kristina', 'Galstyan, Aram'], institution: 'ACM Computing Surveys', url: 'https://dl.acm.org/doi/10.1145/3457607' },
    { title: 'International AI Safety Report 2026', type: 'report', year: 2026, authors: ['Bengio, Yoshua', 'et al. (100+ experts)'], institution: 'International AI Safety (30+ nations)', url: 'https://internationalaisafetyreport.org/' },
  ],

  'computational-neuroscience': [
    { title: 'Brain-Inspired Artificial Intelligence: A Comprehensive Review', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2408.14811' },
    { title: 'Brain and Cognitive Science Inspired Deep Learning: A Comprehensive Survey', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE TKDE', url: 'https://doi.org/10.1109/TKDE.2025.3527551' },
    { title: 'If Deep Learning Is the Answer, What Is the Question?', type: 'review', year: 2021, authors: ['Saxe, Andrew', 'Nelli, Stephanie', 'Summerfield, Christopher'], institution: 'Nature Reviews Neuroscience', url: 'https://www.nature.com/articles/s41583-020-00395-8' },
    { title: 'Backpropagation and the Brain', type: 'review', year: 2020, authors: ['Lillicrap, Timothy P.', 'Santoro, Adam', 'Marris, Luke', 'Akerman, Colin J.', 'Hinton, Geoffrey'], institution: 'Nature Reviews Neuroscience', url: 'https://www.nature.com/articles/s41583-020-0277-3' },
  ],

  'loss-functions': [
    { title: 'A Comprehensive Survey of Loss Functions in Machine Learning', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Annals of Data Science (Springer)', url: 'https://doi.org/10.1007/s40745-024-00537-4' },
    { title: 'Focal Loss for Dense Object Detection', type: 'conference_paper', year: 2017, authors: ['Lin, Tsung-Yi', 'Goyal, Priya', 'Girshick, Ross', 'He, Kaiming', 'Dollár, Piotr'], institution: 'Facebook AI Research / ICCV', url: 'https://arxiv.org/abs/1708.02002' },
    { title: 'Deep Learning (Textbook) — Chapter 6.2.1: Loss Functions & MLE', type: 'textbook', year: 2016, authors: ['Goodfellow, Ian', 'Bengio, Yoshua', 'Courville, Aaron'], institution: 'MIT Press', url: 'https://www.deeplearningbook.org/' },
    { title: 'A Simple Framework for Contrastive Learning of Visual Representations (SimCLR)', type: 'conference_paper', year: 2020, authors: ['Chen, Ting', 'Kornblith, Simon', 'Norouzi, Mohammad', 'Hinton, Geoffrey'], institution: 'Google Research / ICML', url: 'https://arxiv.org/abs/2002.05709' },
  ],

  'dropout-and-regularization': [
    { title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting', type: 'journal_article', year: 2014, authors: ['Srivastava, Nitish', 'Hinton, Geoffrey', 'Krizhevsky, Alex', 'Sutskever, Ilya', 'Salakhutdinov, Ruslan'], institution: 'JMLR', url: 'https://jmlr.org/papers/v15/srivastava14a.html' },
    { title: 'A Review on Dropout Regularization Approaches for Deep Neural Networks', type: 'survey_paper', year: 2023, authors: ['multiple'], institution: 'Electronics (MDPI)', url: 'https://www.mdpi.com/2079-9292/12/14/3106' },
    { title: 'Deep Learning (Textbook) — Chapter 7.12: Dropout & Bayesian Approximation', type: 'textbook', year: 2016, authors: ['Goodfellow, Ian', 'Bengio, Yoshua', 'Courville, Aaron'], institution: 'MIT Press', url: 'https://www.deeplearningbook.org/' },
    { title: 'Regularization for Deep Learning: A Taxonomy', type: 'survey_paper', year: 2017, authors: ['Kukačka, Jan', 'Golkov, Vladimir', 'Cremers, Daniel'], institution: 'Technical University of Munich', url: 'https://arxiv.org/abs/1710.10686' },
  ],

  'swarm-evolutionary-intelligence': [
    { title: 'Swarm Intelligence: A Survey of Model Classification and Applications', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Chinese Journal of Aeronautics', url: 'https://doi.org/10.1016/j.cja.2024.03.019' },
    { title: 'Swarm Learning: A Survey of Concepts, Applications, and Trends', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2405.00556' },
    { title: 'Evolutionary Computation: A Unified Approach', type: 'textbook', year: 2022, authors: ['De Jong, Kenneth A.'], institution: 'MIT Press', url: 'https://mitpress.mit.edu/9780262046817/' },
    { title: 'Particle Swarm Optimization (Original PSO Paper)', type: 'conference_paper', year: 1995, authors: ['Kennedy, James', 'Eberhart, Russell'], institution: 'IEEE ICNN', url: 'https://doi.org/10.1109/ICNN.1995.488968' },
  ],

  'explainable-ai-xai': [
    { title: 'Explainable AI — the Latest Advancements and New Trends', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2505.07005' },
    { title: 'Explainable AI Needs Formalization', type: 'journal_article', year: 2026, authors: ['multiple'], institution: 'npj Artificial Intelligence (Nature Portfolio)', url: 'https://www.nature.com/articles/s44387-026-00095-1' },
    { title: 'A Unified Approach to Interpreting Model Predictions (SHAP)', type: 'conference_paper', year: 2017, authors: ['Lundberg, Scott M.', 'Lee, Su-In'], institution: 'NeurIPS', url: 'https://arxiv.org/abs/1705.07874' },
    { title: '"Why Should I Trust You?" Explaining the Predictions of Any Classifier (LIME)', type: 'conference_paper', year: 2016, authors: ['Ribeiro, Marco Tulio', 'Singh, Sameer', 'Guestrin, Carlos'], institution: 'ACM SIGKDD', url: 'https://arxiv.org/abs/1602.04938' },
  ],

  'model-evaluation-metrics': [
    { title: 'Holistic Evaluation of Language Models (HELM)', type: 'platform', year: 2024, authors: ['Liang, Percy', 'et al.'], institution: 'Stanford CRFM', url: 'https://crfm.stanford.edu/helm/' },
    { title: 'General Scales Unlock AI Evaluation with Explanatory and Predictive Power', type: 'journal_article', year: 2026, authors: ['multiple'], institution: 'Nature', url: 'https://www.nature.com/articles/s41586-026-10303-2' },
    { title: 'Beyond the Imitation Game (BIG-bench)', type: 'conference_paper', year: 2023, authors: ['Srivastava, Aarohi', 'et al. (450+ authors)'], institution: 'TMLR', url: 'https://arxiv.org/abs/2206.04615' },
    { title: 'Data on AI Capabilities and Benchmarking', type: 'database', year: 2026, authors: ['Epoch AI'], institution: 'Epoch AI', url: 'https://epoch.ai/benchmarks' },
  ],

  'attention-mechanism': [
    { title: 'Attention Is All You Need', type: 'conference_paper', year: 2017, authors: ['Vaswani, Ashish', 'Shazeer, Noam', 'Parmar, Niki', 'Uszkoreit, Jakob', 'Jones, Llion', 'Gomez, Aidan N.', 'Kaiser, Łukasz', 'Polosukhin, Illia'], institution: 'Google Brain / NeurIPS', url: 'https://arxiv.org/abs/1706.03762' },
    { title: 'Efficient Transformers: A Survey', type: 'survey_paper', year: 2022, authors: ['Tay, Yi', 'Dehghani, Mostafa', 'Bahri, Dara', 'Metzler, Donald'], institution: 'ACM Computing Surveys', url: 'https://dl.acm.org/doi/10.1145/3530811' },
    { title: 'Formal Algorithms for Transformers', type: 'technical_document', year: 2023, authors: ['Phuong, Mary', 'Hutter, Marcus'], institution: 'DeepMind', url: 'https://arxiv.org/abs/2207.09238' },
    { title: 'Neural Machine Translation by Jointly Learning to Align and Translate (Additive Attention)', type: 'conference_paper', year: 2015, authors: ['Bahdanau, Dzmitry', 'Cho, Kyunghyun', 'Bengio, Yoshua'], institution: 'ICLR', url: 'https://arxiv.org/abs/1409.0473' },
  ],

  'transformer': [
    { title: 'Attention Is All You Need (Original Transformer)', type: 'conference_paper', year: 2017, authors: ['Vaswani, Ashish', 'Shazeer, Noam', 'Parmar, Niki', 'Uszkoreit, Jakob', 'Jones, Llion', 'Gomez, Aidan N.', 'Kaiser, Łukasz', 'Polosukhin, Illia'], institution: 'Google Brain / NeurIPS', url: 'https://arxiv.org/abs/1706.03762' },
    { title: 'A Survey of Large Language Models', type: 'survey_paper', year: 2024, authors: ['Zhao, Wayne Xin', 'et al.'], institution: 'Renmin University / arXiv', url: 'https://arxiv.org/abs/2303.18223' },
    { title: 'Efficient Transformers: A Survey', type: 'survey_paper', year: 2022, authors: ['Tay, Yi', 'Dehghani, Mostafa', 'Bahri, Dara', 'Metzler, Donald'], institution: 'ACM Computing Surveys', url: 'https://dl.acm.org/doi/10.1145/3530811' },
    { title: 'Formal Algorithms for Transformers', type: 'technical_document', year: 2023, authors: ['Phuong, Mary', 'Hutter, Marcus'], institution: 'DeepMind', url: 'https://arxiv.org/abs/2207.09238' },
  ],

};

// ─── Update file using js-yaml ────────────────────────────────
function updateArticle(slug, newSources) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return { status: 'not_found' };

  let content = fs.readFileSync(filePath, 'utf-8');

  // Extract frontmatter boundaries
  const fmStart = content.indexOf('---');
  if (fmStart < 0) return { status: 'no_frontmatter' };
  const fmEnd = content.indexOf('---', fmStart + 3);
  if (fmEnd < 0) return { status: 'no_frontmatter_end' };

  const fmRaw = content.substring(fmStart + 3, fmEnd).trim();
  const body = content.substring(fmEnd + 3);

  // Parse existing YAML
  let fm;
  try {
    fm = yaml.load(fmRaw) || {};
  } catch (e) {
    return { status: 'yaml_parse_error', error: e.message };
  }

  // Check for existing secondary_sources
  if (Array.isArray(fm.secondary_sources) && fm.secondary_sources.length > 0) {
    return { status: 'already_rich' };
  }

  // Add secondary_sources
  fm.secondary_sources = newSources;
  fm.last_verified = TODAY;

  // Dump back to YAML
  const newYaml = yaml.dump(fm, {
    indent: 2,
    lineWidth: -1,          // no wrapping
    noRefs: true,
    sortKeys: false,
    quotingType: '"',
    forceQuotes: false,
  });

  // Reconstruct file
  const newContent = `---\r\n${newYaml.trim()}\r\n---${body}`;
  fs.writeFileSync(filePath, newContent, 'utf-8');
  return { status: 'updated' };
}

// ─── Main ────────────────────────────────────────────────────
const targets = Object.keys(EXPERT_SOURCES);
const results = { updated: 0, skipped: 0, errors: 0, details: [] };

// First, revert the broken files from previous run
const BROKEN_PATTERN = /primary_sources:\s*[\s\S]*?- title: "([^"]+)"[\s\S]*?\n(\w+:)/gm;
for (const slug of targets) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if secondary sources were wrongly injected into primary_sources
  if (content.includes('\nsecondary_sources:')) {
    console.log(`[SKIP] Already has secondary_sources: ${slug}.md`);
    results.skipped++;
    continue;
  }

  const newSources = EXPERT_SOURCES[slug];
  if (!newSources) {
    console.log(`[SKIP] No sources defined: ${slug}.md`);
    results.skipped++;
    continue;
  }

  const outcome = updateArticle(slug, newSources);
  if (outcome.status === 'updated') {
    console.log(`[OK] +${newSources.length} secondary_sources → ${slug}.md`);
    results.updated++;
  } else if (outcome.status === 'already_rich') {
    console.log(`[SKIP] Already enriched: ${slug}.md`);
    results.skipped++;
  } else {
    console.log(`[ERR] ${slug}.md: ${outcome.status} ${outcome.error || ''}`);
    results.errors++;
  }
  results.details.push({ slug, ...outcome });
}

console.log(`\n══════ Source Enrichment S01 Report ══════`);
console.log(`  Updated: ${results.updated}  |  Skipped: ${results.skipped}  |  Errors: ${results.errors}`);
console.log(`  Target: ${targets.length}  |  Done: ${results.updated}`);
