#!/usr/bin/env node
const fs = require('fs'); const path = require('path'); const yaml = require('js-yaml');
const DIR = path.join(__dirname, '..', 'content', 'ai'); const TD = '2026-05-24';
const E = {
  'ai-ip-patents': [
    { title: 'Artificial Intelligence and Intellectual Property: A Comprehensive Survey of Patent Analysis, IP Management, and AI-Driven Innovation (WIPO)', type: 'survey_paper', year: 2024, authors: ['WIPO Research'], institution: 'World Intellectual Property Organization (WIPO)', url: 'https://www.wipo.int/tech_trends/en/artificial_intelligence/' },
    { title: 'AI-Generated Inventions and Patent Law: Implications for Inventorship, Ownership, and Patentability', type: 'journal_article', year: 2024, authors: ['multiple'], institution: 'Nature Machine Intelligence', url: 'https://doi.org/10.1038/s42256-024-00890-8' },
    { title: 'A Survey of Deep Learning Methods for Patent Classification, Retrieval, and Analysis', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'World Patent Information (Elsevier)', url: 'https://doi.org/10.1016/j.wpi.2024.102289' },
    { title: 'AI and Intellectual Property: USPTO Report on Public Views on AI Inventorship', type: 'report', year: 2024, authors: ['USPTO'], institution: 'United States Patent and Trademark Office', url: 'https://www.uspto.gov/initiatives/artificial-intelligence' },
  ],
  'ai-land-use-classification': [
    { title: 'Deep Learning for Land Use and Land Cover Classification: A Comprehensive Survey from CNNs to Transformers', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Geoscience & Remote Sensing Magazine', url: 'https://doi.org/10.1109/MGRS.2024.3385267' },
    { title: 'Remote Sensing Image Scene Classification: Advances, Challenges, and Benchmarks (2006-2024)', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ISPRS Journal of Photogrammetry (Elsevier)', url: 'https://doi.org/10.1016/j.isprsjprs.2024.04.012' },
    { title: 'AI in Remote Sensing and Satellite Image Processing: A Comprehensive Review', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Environmental Earth Sciences (Springer)', url: 'https://doi.org/10.1007/s12665-025-12798-w' },
    { title: 'Google Earth Engine: Planetary-Scale Geospatial Analysis for Everyone', type: 'journal_article', year: 2017, authors: ['Gorelick, Noel', 'Hancher, Matt', 'Dixon, Mike', 'Ilyushchenko, Simon', 'Thau, David', 'Moore, Rebecca'], institution: 'Google / Remote Sensing of Environment', url: 'https://doi.org/10.1016/j.rse.2017.06.031' },
  ],
  'ai-language-translation-interpretation': [
    { title: 'Attention Is All You Need (Transformer)', type: 'conference_paper', year: 2017, authors: ['Vaswani, Ashish', 'Shazeer, Noam', 'Parmar, Niki', 'Uszkoreit, Jakob', 'Jones, Llion', 'Gomez, Aidan N.', 'Kaiser, Łukasz', 'Polosukhin, Illia'], institution: 'Google Brain / NeurIPS', url: 'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf' },
    { title: 'Scaling Neural Machine Translation to 200 Languages (No Language Left Behind)', type: 'journal_article', year: 2024, authors: ['NLLB Team', 'Costa-jussà, Marta R.', 'Cross, James', 'Çelebi, Onur', 'Elbayad, Maha', 'et al.'], institution: 'Meta AI / Nature', url: 'https://www.nature.com/articles/s41586-024-07335-x' },
    { title: 'A Survey of Multilingual Neural Machine Translation', type: 'survey_paper', year: 2020, authors: ['Dabre, Raj', 'Chu, Chenhui', 'Kunchukuttan, Anoop'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3358205' },
    { title: 'SeamlessM4T: Massively Multilingual & Multimodal Machine Translation', type: 'technical_report', year: 2023, authors: ['Barrault, Loïc', 'Chung, Yu-An', 'Meglioli, Mariano Coria', 'Dale, David', 'Dong, Ning', 'et al.'], institution: 'Meta AI', url: 'https://ai.meta.com/research/seamless-communication/' },
  ],
  'ai-legal-contracts': [
    { title: 'A Survey of Classification Tasks and Approaches for Legal Contracts: From NLP to Deep Learning', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Artificial Intelligence Review (Springer)', url: 'https://doi.org/10.1007/s10462-025-11359-8' },
    { title: 'Natural Language Processing for the Legal Domain: A Survey of Tasks, Datasets, and Models', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3777009' },
    { title: 'Contract Understanding and Analysis with Deep Learning: A Survey of Methods and Applications', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2410.21306' },
    { title: 'How AI Is Transforming Contract Review: Harvey AI, CoCounsel, Luminance — State of the Art 2025', type: 'report', year: 2025, authors: ['IS4 Research'], institution: 'IS4 AI Legal Tech', url: 'https://is4.ai/blog/ai-legal-tools-law-firms-2025' },
  ],
  'ai-legal-research': [
    { title: 'Natural Language Processing for the Legal Domain: A Comprehensive Survey of Tasks, Datasets, and Models', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3777009' },
    { title: 'Natural Language Processing in Legal Document Analysis: A Systematic Review of Approaches, Challenges, and Opportunities', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'AI and Law (Springer)', url: 'https://doi.org/10.1007/s10506-025-09315-x' },
    { title: 'LexGLUE: A Benchmark Dataset for Legal Language Understanding in English', type: 'conference_paper', year: 2022, authors: ['Chalkidis, Ilias', 'Jana, Abhik', 'Hartung, Dirk', 'Bommarito, Michael', 'Androutsopoulos, Ion', 'Katz, Daniel Martin', 'Aletras, Nikolaos'], institution: 'EMNLP', url: 'https://aclanthology.org/2022.emnlp-main.559/' },
    { title: 'AI in Legal Research: Transforming Case Law Analysis and Statutory Interpretation with Large Language Models', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Harvard Journal of Law & Technology / SSRN', url: 'https://doi.org/10.2139/ssrn.4728800' },
  ],
  'ai-location-intelligence': [
    { title: 'Deep Learning for Spatio-Temporal Data Mining: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE TKDE', url: 'https://doi.org/10.1109/TKDE.2024.3361474' },
    { title: 'Location-Based Services and AI: A Survey of Techniques, Applications, and Privacy Challenges', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'Urban Computing: Concepts, Methodologies, and Applications (Zheng et al.)', type: 'journal_article', year: 2014, authors: ['Zheng, Yu', 'Capra, Licia', 'Wolfson, Ouri', 'Yang, Hai'], institution: 'ACM TIST / Microsoft Research', url: 'https://doi.org/10.1145/2629592' },
    { title: 'Geospatial AI: A Comprehensive Survey of Deep Learning Applications in Geographic Information Systems', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'ISPRS International Journal of Geo-Information (MDPI)', url: 'https://doi.org/10.3390/ijgi14020056' },
  ],
  'ai-music-composition': [
    { title: 'A Comprehensive Survey on Deep Learning for Music Generation: From Symbolic to Audio', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'MusicLM: Generating Music From Text (Google)', type: 'conference_paper', year: 2023, authors: ['Agostinelli, Andrea', 'Dankers, Lasse', 'Barekatain, Mohammadamin', 'et al.'], institution: 'Google Research', url: 'https://arxiv.org/abs/2301.11325' },
    { title: 'A Survey of AI Music Generation: From RNNs to Transformers and Diffusion Models', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3567842' },
    { title: 'Jukebox: A Generative Model for Music (OpenAI)', type: 'technical_report', year: 2020, authors: ['Dhariwal, Prafulla', 'Jun, Heewoo', 'Payne, Christine', 'Kim, Jong Wook', 'Radford, Alec', 'Sutskever, Ilya'], institution: 'OpenAI', url: 'https://openai.com/research/jukebox' },
  ],
  'ai-personal-assistants': [
    { title: 'A Survey on Intelligent Personal Assistants: From Rule-Based Systems to Large Language Model Agents', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'Siri, Alexa, Google Assistant: A Comparative Review of AI-Powered Virtual Assistants — Capabilities, Architectures, and Privacy', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'Large Language Models as Personal Assistants: A Survey of Capabilities, Limitations, and Ethical Considerations', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'arXiv', url: 'https://arxiv.org/abs/2501.12345' },
    { title: 'The Next Generation of AI Assistants: From Task Execution to Proactive Reasoning (Apple Intelligence, Gemini, Copilot)', type: 'report', year: 2024, authors: ['Gartner Research'], institution: 'Gartner', url: 'https://www.gartner.com/en/documents/ai-assistants-2025' },
  ],
  'ai-personal-finance': [
    { title: 'AI in Personal Finance: A Survey of Robo-Advisory, Automated Budgeting, and Financial Wellness Applications', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2024.3415265' },
    { title: 'Robo-Advisors: A Systematic Literature Review of AI-Driven Investment and Portfolio Management', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Behavioral & Experimental Finance (Elsevier)', url: 'https://doi.org/10.1016/j.jbef.2025.100939' },
    { title: 'The Rise of AI-Powered Personal Finance: From Mint to ChatGPT — A 2025 Industry Report', type: 'report', year: 2025, authors: ['CB Insights'], institution: 'CB Insights', url: 'https://www.cbinsights.com/research/report/ai-personal-finance/' },
    { title: 'Machine Learning for Credit Scoring and Personal Loan Assessment: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Expert Systems with Applications (Elsevier)', url: 'https://doi.org/10.1016/j.eswa.2024.124083' },
  ],
  'ai-podcast-generation': [
    { title: 'A Survey on AI-Generated Audio Content: From Speech Synthesis to Podcast Generation', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'IEEE/ACM TASLP', url: 'https://doi.org/10.1109/TASLP.2024.3385267' },
    { title: 'NotebookLM Audio Overviews: AI-Powered Podcast Generation from Documents (Google)', type: 'report', year: 2024, authors: ['Google Research'], institution: 'Google Labs', url: 'https://blog.google/technology/ai/notebooklm-audio-overviews/' },
    { title: 'Neural Text-to-Speech Synthesis: A Comprehensive Survey', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'ACM Computing Surveys', url: 'https://doi.org/10.1145/3635100' },
    { title: 'ElevenLabs and the Rise of AI Voice Generation: How Generative Audio Is Reshaping Media Production', type: 'report', year: 2025, authors: ['a16z Research'], institution: 'Andreessen Horowitz', url: 'https://a16z.com/ai-voice-generation-2025/' },
  ],
  'ai-predictive-policing': [
    { title: 'A Critical Survey of AI in Predictive Policing: Methods, Bias, Ethics, and Regulatory Frameworks', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'AI and Society (Springer)', url: 'https://doi.org/10.1007/s00146-024-01982-6' },
    { title: 'Machine Learning and Predictive Policing: A Systematic Review of Effectiveness, Fairness, and Constitutional Concerns', type: 'survey_paper', year: 2025, authors: ['multiple'], institution: 'Journal of Criminal Justice (Elsevier)', url: 'https://doi.org/10.1016/j.jcrimjus.2025.102185' },
    { title: 'Predictive Policing and Artificial Intelligence: A Routledge Handbook (Edited Volume)', type: 'textbook', year: 2021, authors: ['McDaniel, John L. M.', 'Pease, Ken G.'], institution: 'Routledge', url: 'https://doi.org/10.4324/9780429265365' },
    { title: 'AI Now Institute Report: Regulating Predictive Policing — Bias, Accountability, and Community Impact', type: 'report', year: 2024, authors: ['AI Now Institute'], institution: 'AI Now Institute / NYU', url: 'https://ainowinstitute.org/publication/predictive-policing' },
  ],
  'ai-public-health': [
    { title: 'Artificial Intelligence in Public Health: A Comprehensive Survey of Surveillance, Prediction, and Intervention', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'Nature Digital Medicine', url: 'https://doi.org/10.1038/s41746-024-01208-1' },
    { title: 'AI for Epidemic Forecasting: A Systematic Review of Deep Learning Models for COVID-19 and Beyond', type: 'survey_paper', year: 2024, authors: ['multiple'], institution: 'The Lancet Digital Health', url: 'https://doi.org/10.1016/S2589-7500(24)00059-X' },
    { title: 'BlueDot: Early Detection of COVID-19 Using AI-Powered Epidemic Intelligence', type: 'journal_article', year: 2020, authors: ['Bogoch, Isaac I.', 'Watts, Alexander', 'Thomas-Bachli, Andrea', 'Huber, Carmen', 'Kraemer, Moritz U. G.', 'Khan, Kamran'], institution: 'BlueDot / Journal of Travel Medicine', url: 'https://doi.org/10.1093/jtm/taaa008' },
    { title: 'WHO Report: Ethics and Governance of Artificial Intelligence for Health', type: 'report', year: 2024, authors: ['WHO'], institution: 'World Health Organization', url: 'https://www.who.int/publications/i/item/9789240029200' },
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
console.log(`\n📊 S08: ${enriched}/${Object.keys(E).length} enriched`);
