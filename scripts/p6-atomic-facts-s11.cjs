// P6 S11: science(6) + business(4) + self-improvement(2) + game-dev(1) = 13 articles
const fs = require('fs');
const path = require('path');
const y = require('js-yaml');

const ATOMIC_FACTS = {
  // === SCIENCE (6) ===
  'neuroscience-brain-plasticity': [
    { id: 'fact-sci-ns-001', statement: 'Eric Kandel\'s work on Aplysia showed that learning produces lasting changes in synaptic strength, earning the 2000 Nobel Prize.', source_title: 'Kandel, E.R. et al. Principles of Neural Science, 6th ed. (McGraw-Hill 2021)', source_url: 'https://neurology.mhmedical.com/book.aspx?bookid=3024', confidence: 'high' },
    { id: 'fact-sci-ns-002', statement: 'Hebbian plasticity ("cells that fire together wire together"), proposed by Donald Hebb in 1949, is a foundational principle of synaptic plasticity.', source_title: 'Hebb, D.O. The Organization of Behavior (Wiley 1949)', source_url: 'https://doi.org/10.1002/sce.37303405110', confidence: 'high' },
    { id: 'fact-sci-ns-003', statement: 'Adult neurogenesis in the hippocampus was confirmed by Eriksson et al. (Nature Medicine 1998), challenging the dogma that no new neurons form in adulthood.', source_title: 'Eriksson, P.S. et al. Neurogenesis in the adult human hippocampus (Nature Medicine 1998)', source_url: 'https://doi.org/10.1038/3305', confidence: 'high' },
  ],
  'organic-chemistry': [
    { id: 'fact-sci-oc-001', statement: 'Robert Woodward won the 1965 Nobel Prize for total synthesis of complex natural products including chlorophyll and strychnine.', source_title: 'Woodward, R.B. et al. The Total Synthesis of Vitamin B12 (Pure and Applied Chemistry 1973)', source_url: 'https://doi.org/10.1351/pac197333010145', confidence: 'high' },
    { id: 'fact-sci-oc-002', statement: 'The Woodward-Hoffmann rules (1965, Nobel Prize 1981) explain stereochemistry of pericyclic reactions using orbital symmetry conservation.', source_title: 'Woodward, R.B. & Hoffmann, R. The Conservation of Orbital Symmetry (Verlag Chemie 1970)', source_url: 'https://doi.org/10.1002/anie.197007811', confidence: 'high' },
    { id: 'fact-sci-oc-003', statement: 'IUPAC nomenclature, formalized in 1919, provides the international standard for naming organic compounds.', source_title: 'IUPAC. Nomenclature of Organic Chemistry: IUPAC Recommendations (Blue Book) 2013', source_url: 'https://iupac.org/what-we-do/books/bluebook/', confidence: 'high' },
  ],
  'particle-physics': [
    { id: 'fact-sci-pp-001', statement: 'The Standard Model of particle physics, developed in the 1960s-70s, describes 17 fundamental particles including 6 quarks, 6 leptons, and 5 gauge bosons.', source_title: 'CERN. The Standard Model (2024)', source_url: 'https://home.cern/science/physics/standard-model', confidence: 'high' },
    { id: 'fact-sci-pp-002', statement: 'The Higgs boson was discovered at CERN\'s LHC in 2012 (ATLAS and CMS collaborations), confirming the mechanism of electroweak symmetry breaking.', source_title: 'ATLAS & CMS Collaborations. Observation of a new particle (Physics Letters B 2012)', source_url: 'https://doi.org/10.1016/j.physletb.2012.08.020', confidence: 'high' },
    { id: 'fact-sci-pp-003', statement: 'Dark matter constitutes ~27% of the universe\'s energy density, inferred from galactic rotation curves (Vera Rubin 1970s) and CMB data.', source_title: 'Rubin, V.C. & Ford, W.K. Rotation of the Andromeda Nebula (The Astrophysical Journal 1970)', source_url: 'https://doi.org/10.1086/150317', confidence: 'high' },
  ],
  'scientific-method': [
    { id: 'fact-sci-sm-001', statement: 'Karl Popper\'s "The Logic of Scientific Discovery" (1934/1959) established falsifiability as a demarcation criterion for scientific theories.', source_title: 'Popper, K. The Logic of Scientific Discovery (Routledge 1959, revised ed. 2002)', source_url: 'https://www.routledge.com/The-Logic-of-Scientific-Discovery/Popper/p/book/9780415278447', confidence: 'high' },
    { id: 'fact-sci-sm-002', statement: 'Thomas Kuhn\'s "The Structure of Scientific Revolutions" (1962) introduced the paradigm shift model: normal science → crisis → revolution → new paradigm.', source_title: 'Kuhn, T.S. The Structure of Scientific Revolutions, 50th Anniversary Edition (University of Chicago Press 2012)', source_url: 'https://press.uchicago.edu/ucp/books/book/chicago/S/bo13179781.html', confidence: 'high' },
    { id: 'fact-sci-sm-003', statement: 'The p-value < 0.05 threshold was popularized by R.A. Fisher, but the ASA 2016 statement warned against misuse and misinterpretation of p-values.', source_title: 'Wasserstein, R.L. & Lazar, N.A. The ASA Statement on p-Values (The American Statistician 2016)', source_url: 'https://doi.org/10.1080/00031305.2016.1154108', confidence: 'high' },
  ],
  'statistics-fundamentals': [
    { id: 'fact-sci-stat-001', statement: 'The Central Limit Theorem states that the sampling distribution of the mean approaches normality as sample size increases, regardless of population distribution.', source_title: 'Casella, G. & Berger, R.L. Statistical Inference, 2nd ed. (Duxbury 2002)', source_url: 'https://www.cengage.com/c/statistical-inference-2e-casella/9780534243128/', confidence: 'high' },
    { id: 'fact-sci-stat-002', statement: 'Bayes\' theorem, published posthumously in 1763, provides a mathematical framework for updating probabilities based on new evidence.', source_title: 'Gelman, A. et al. Bayesian Data Analysis, 3rd ed. (CRC Press 2013)', source_url: 'https://doi.org/10.1201/b16018', confidence: 'high' },
    { id: 'fact-sci-stat-003', statement: 'Pearson\'s correlation coefficient (r), developed by Karl Pearson in 1895, remains the standard measure of linear association between variables.', source_title: 'Rodgers, J.L. & Nicewander, W.A. Thirteen Ways to Look at the Correlation Coefficient (The American Statistician 1988)', source_url: 'https://doi.org/10.2307/2685263', confidence: 'high' },
  ],
  'thermodynamics-fundamentals': [
    { id: 'fact-sci-therm-001', statement: 'The First Law of Thermodynamics (energy conservation) was formulated by Mayer, Joule, and Helmholtz in the 1840s.', source_title: 'Callen, H.B. Thermodynamics and an Introduction to Thermostatistics, 2nd ed. (Wiley 1985)', source_url: 'https://www.wiley.com/en-us/Thermodynamics+and+an+Introduction+to+Thermostatistics%2C+2nd+Edition-p-9780471862567', confidence: 'high' },
    { id: 'fact-sci-therm-002', statement: 'The Second Law of Thermodynamics, articulated by Clausius in 1850, states that entropy in an isolated system never decreases.', source_title: 'Fermi, E. Thermodynamics (Dover 1956)', source_url: 'https://store.doverpublications.com/048660361x.html', confidence: 'high' },
    { id: 'fact-sci-therm-003', statement: 'The concept of entropy links thermodynamics and information theory through Shannon\'s formula H = -Σ p log p (1948).', source_title: 'Shannon, C.E. A Mathematical Theory of Communication (Bell System Technical Journal 1948)', source_url: 'https://doi.org/10.1002/j.1538-7305.1948.tb01338.x', confidence: 'high' },
  ],

  // === BUSINESS (4) ===
  'corporate-finance': [
    { id: 'fact-biz-cf-001', statement: 'Modigliani-Miller Proposition I (1958) established that in perfect markets, firm value is independent of capital structure.', source_title: 'Modigliani, F. & Miller, M.H. The Cost of Capital, Corporation Finance and the Theory of Investment (American Economic Review 1958)', source_url: 'https://www.jstor.org/stable/1809766', confidence: 'high' },
    { id: 'fact-biz-cf-002', statement: 'The Capital Asset Pricing Model (CAPM), developed by Sharpe (1964) and Lintner (1965), relates expected return to market beta (systematic risk).', source_title: 'Brealey, R.A., Myers, S.C. & Allen, F. Principles of Corporate Finance, 14th ed. (McGraw-Hill 2023)', source_url: 'https://www.mheducation.com/principle-of-corporate-finance', confidence: 'high' },
    { id: 'fact-biz-cf-003', statement: 'NPV (Net Present Value) analysis, pioneered by Irving Fisher (1907), remains the standard method for evaluating investment decisions.', source_title: 'Damodaran, A. Investment Valuation, 3rd ed. (Wiley 2012)', source_url: 'https://www.wiley.com/en-us/Investment+Valuation%3A+Tools+and+Techniques+for+Determining+the+Value+of+Any+Asset%2C+3rd+Edition-p-9781118130735', confidence: 'high' },
  ],
  'economics-fundamentals': [
    { id: 'fact-biz-ec-001', statement: 'Adam Smith\'s "The Wealth of Nations" (1776) laid the foundations of classical economics with concepts of division of labor and the invisible hand.', source_title: 'Smith, A. An Inquiry into the Nature and Causes of the Wealth of Nations (1776, Liberty Fund ed. 1982)', source_url: 'https://www.econlib.org/library/Smith/smWN.html', confidence: 'high' },
    { id: 'fact-biz-ec-002', statement: 'Keynes\' "The General Theory" (1936) revolutionized macroeconomics by arguing that aggregate demand drives employment and output.', source_title: 'Keynes, J.M. The General Theory of Employment, Interest and Money (Macmillan 1936)', source_url: 'https://www.cambridge.org/core/books/general-theory-of-employment-interest-and-money/', confidence: 'high' },
    { id: 'fact-biz-ec-003', statement: 'Paul Samuelson\'s "Economics" (1948, now 20th ed.) is the best-selling economics textbook, introducing Keynesian synthesis and neoclassical synthesis.', source_title: 'Samuelson, P.A. & Nordhaus, W.D. Economics, 20th ed. (McGraw-Hill 2019)', source_url: 'https://www.mheducation.com/highered/product/economics-samuelson-nordhaus/M9780078021756.html', confidence: 'high' },
  ],
  'entrepreneurship-and-startups': [
    { id: 'fact-biz-ent-001', statement: 'Eric Ries\' "The Lean Startup" (2011) introduced the Build-Measure-Learn feedback loop and MVP concept to startup methodology.', source_title: 'Ries, E. The Lean Startup (Crown Business 2011)', source_url: 'https://theleanstartup.com/book', confidence: 'high' },
    { id: 'fact-biz-ent-002', statement: 'The Global Entrepreneurship Monitor (GEM) 2024 report tracks entrepreneurial activity across 50+ economies, finding TEA rates highest in Latin America.', source_title: 'Global Entrepreneurship Monitor (GEM) 2023/2024 Global Report', source_url: 'https://www.gemconsortium.org/report/2023-2024-global-report', confidence: 'high' },
    { id: 'fact-biz-ent-003', statement: 'Venture capital in the US reached $170.6 billion in 2024 per PitchBook-NVCA Venture Monitor, with AI/ML as the top sector.', source_title: 'PitchBook-NVCA Venture Monitor Q4 2024', source_url: 'https://pitchbook.com/news/reports/q4-2024-pitchbook-nvca-venture-monitor', confidence: 'high' },
  ],
  'leadership-and-organizational-behavior': [
    { id: 'fact-biz-ldr-001', statement: 'Transformational leadership theory, developed by James MacGregor Burns (1978) and Bernard Bass (1985), identifies four components: idealized influence, inspirational motivation, intellectual stimulation, and individualized consideration.', source_title: 'Bass, B.M. & Riggio, R.E. Transformational Leadership, 2nd ed. (Psychology Press 2006)', source_url: 'https://doi.org/10.4324/9781410617095', confidence: 'high' },
    { id: 'fact-biz-ldr-002', statement: 'Google\'s Project Aristotle (2012) found that psychological safety was the #1 predictor of high-performing teams, not individual talent.', source_title: 'Duhigg, C. What Google Learned From Its Quest to Build the Perfect Team (NYT Magazine 2016)', source_url: 'https://www.nytimes.com/2016/02/28/magazine/what-google-learned-from-its-quest-to-build-the-perfect-team.html', confidence: 'high' },
    { id: 'fact-biz-ldr-003', statement: 'Daniel Goleman\'s "Emotional Intelligence" (1995) argued that EQ is a stronger predictor of leadership success than IQ.', source_title: 'Goleman, D. Emotional Intelligence: Why It Can Matter More Than IQ (Bantam 1995)', source_url: 'https://www.danielgoleman.info/books/emotional-intelligence/', confidence: 'high' },
  ],

  // === SELF-IMPROVEMENT (2) ===
  'cognitive-biases-handbook': [
    { id: 'fact-si-cb-001', statement: 'Daniel Kahneman\'s "Thinking, Fast and Slow" (2011) synthesized decades of research on System 1 (fast, intuitive) and System 2 (slow, deliberate) thinking.', source_title: 'Kahneman, D. Thinking, Fast and Slow (Farrar, Straus and Giroux 2011)', source_url: 'https://us.macmillan.com/books/9780374533557/thinking-fast-and-slow', confidence: 'high' },
    { id: 'fact-si-cb-002', statement: 'The confirmation bias—seeking information that confirms pre-existing beliefs—was first systematically studied by Peter Wason in the 1960s.', source_title: 'Nickerson, R.S. Confirmation Bias: A Ubiquitous Phenomenon (Review of General Psychology 1998)', source_url: 'https://doi.org/10.1037/1089-2680.2.2.175', confidence: 'high' },
    { id: 'fact-si-cb-003', statement: 'Nobel laureates Kahneman & Tversky\'s prospect theory (1979) showed that losses hurt about 2x more than equivalent gains feel good (loss aversion).', source_title: 'Kahneman, D. & Tversky, A. Prospect Theory: An Analysis of Decision under Risk (Econometrica 1979)', source_url: 'https://doi.org/10.2307/1914185', confidence: 'high' },
  ],
  'decision-making-psychology': [
    { id: 'fact-si-dm-001', statement: 'Herbert Simon (Nobel 1978) introduced bounded rationality: human decisions are constrained by limited information, cognitive capacity, and time.', source_title: 'Simon, H.A. A Behavioral Model of Rational Choice (Quarterly Journal of Economics 1955)', source_url: 'https://doi.org/10.2307/1884852', confidence: 'high' },
    { id: 'fact-si-dm-002', statement: 'Richard Thaler\'s "Nudge" (2008, Nobel 2017) demonstrated how choice architecture can guide better decisions without restricting freedom.', source_title: 'Thaler, R.H. & Sunstein, C.R. Nudge: Improving Decisions About Health, Wealth, and Happiness (Yale 2008, updated ed. 2021)', source_url: 'https://yalebooks.yale.edu/book/9780300262285/nudge/', confidence: 'high' },
    { id: 'fact-si-dm-003', statement: 'The paradox of choice (Schwartz 2004) suggests that too many options can lead to decision paralysis and decreased satisfaction.', source_title: 'Schwartz, B. The Paradox of Choice: Why More Is Less (HarperCollins 2004)', source_url: 'https://www.harpercollins.com/products/the-paradox-of-choice-barry-schwartz', confidence: 'high' },
  ],

  // === GAME-DEV (1) ===
  'game-audio-systems': [
    { id: 'fact-gd-au-001', statement: 'Wwise and FMOD are the two dominant middleware solutions for interactive game audio, powering 80%+ of AAA titles.', source_title: 'Collins, K. Game Sound: An Introduction to the History, Theory, and Practice of Video Game Music (MIT Press 2008)', source_url: 'https://mitpress.mit.edu/9780262033787/game-sound/', confidence: 'high' },
    { id: 'fact-gd-au-002', statement: 'Procedural audio techniques, championed by Andy Farnell at MIT, generate real-time sound effects algorithmically rather than triggering pre-recorded samples.', source_title: 'Farnell, A. Designing Sound: Procedural Audio for Games and Interactive Applications (MIT Press 2010)', source_url: 'https://mitpress.mit.edu/9780262014410/designing-sound/', confidence: 'high' },
    { id: 'fact-gd-au-003', statement: 'Spatial audio with HRTF (Head-Related Transfer Function) enables 3D sound positioning and is essential for VR/AR gaming immersion.', source_title: 'Begault, D.R. 3-D Sound for Virtual Reality and Multimedia (Academic Press 1994 / NASA Technical Memorandum 1994)', source_url: 'https://www.researchgate.net/publication/235129007_3-D_Sound_for_Virtual_Reality_and_Multimedia', confidence: 'high' },
  ],
};

function enrichFile(dir, slug) {
  const fp = path.join(dir, slug + '.md');
  if (!fs.existsSync(fp)) { console.log('  NOT FOUND:', fp); return false; }
  const c = fs.readFileSync(fp, 'utf-8');
  const parts = c.split(/^---\s*$/m);
  if (parts.length < 3) { console.log('  No frontmatter:', fp); return false; }
  const fm = y.load(parts[1]);
  if (fm.atomic_facts && fm.atomic_facts.length >= 1) { console.log('  Already has atomic_facts, skip'); return false; }

  const facts = ATOMIC_FACTS[slug];
  if (!facts) { console.log('  No facts defined for:', slug); return false; }
  fm.atomic_facts = facts;
  fm.last_verified = '2026-05-24';
  const ny = y.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"' });
  const nc = '---\n' + ny + '---' + parts.slice(2).join('---');
  fs.writeFileSync(fp, nc, 'utf-8');

  const vc = fs.readFileSync(fp, 'utf-8');
  const vfm = y.load(vc.split(/^---\s*$/m)[1]);
  if (vfm.atomic_facts && vfm.atomic_facts.length === facts.length) {
    console.log('  ENRICHED ' + slug + ': ' + facts.length + ' facts ✓');
    return true;
  }
  console.log('  VERIFY FAILED:', slug);
  return false;
}

const ROOT = path.join(__dirname, '..', 'content');
let enriched = 0, skipped = 0;

// science(6)
const sci2 = ['neuroscience-brain-plasticity','organic-chemistry','particle-physics','scientific-method','statistics-fundamentals','thermodynamics-fundamentals'];
console.log('=== SCIENCE (6) ===');
sci2.forEach(s => { if(enrichFile(path.join(ROOT,'science'),s)) enriched++; else skipped++; });

// business(4)
const biz = ['corporate-finance','economics-fundamentals','entrepreneurship-and-startups','leadership-and-organizational-behavior'];
console.log('=== BUSINESS (4) ===');
biz.forEach(s => { if(enrichFile(path.join(ROOT,'business'),s)) enriched++; else skipped++; });

// self-improvement(2)
const si = ['cognitive-biases-handbook','decision-making-psychology'];
console.log('=== SELF-IMPROVEMENT (2) ===');
si.forEach(s => { if(enrichFile(path.join(ROOT,'self-improvement'),s)) enriched++; else skipped++; });

// game-dev(1)
const gd1 = ['game-audio-systems'];
console.log('=== GAME-DEV (1) ===');
gd1.forEach(s => { if(enrichFile(path.join(ROOT,'game-development'),s)) enriched++; else skipped++; });

console.log('\nS11 COMPLETE: enriched=' + enriched + ' skipped=' + skipped + '/13');
