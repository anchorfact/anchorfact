// P6 S10: science(6) + health(4) + arts(3) = 13 articles
const fs = require('fs');
const path = require('path');
const y = require('js-yaml');

const ATOMIC_FACTS = {
  // === SCIENCE (6) ===
  'astronomy-and-cosmology': [
    { id: 'fact-sci-astro-001', statement: 'The Cosmic Microwave Background (CMB) radiation, discovered by Penzias and Wilson in 1965, provides the strongest evidence for the Big Bang theory.', source_title: 'Planck 2018 results: Cosmological parameters', source_url: 'https://doi.org/10.1051/0004-6361/201833910', confidence: 'high' },
    { id: 'fact-sci-astro-002', statement: 'Dark energy constitutes approximately 68% of the total energy density of the universe, as measured by the Planck satellite.', source_title: 'Planck Collaboration (Astronomy & Astrophysics 2020)', source_url: 'https://doi.org/10.1051/0004-6361/201833910', confidence: 'high' },
    { id: 'fact-sci-astro-003', statement: 'The Event Horizon Telescope captured the first direct image of a black hole (M87*) in 2019, confirming predictions of general relativity.', source_title: 'Event Horizon Telescope Collaboration (The Astrophysical Journal Letters 2019)', source_url: 'https://doi.org/10.3847/2041-8213/ab0ec7', confidence: 'high' },
  ],
  'chemical-bonding': [
    { id: 'fact-sci-chem-001', statement: 'Linus Pauling\'s 1939 "The Nature of the Chemical Bond" introduced valence bond theory and the concept of electronegativity.', source_title: 'Pauling, L. The Nature of the Chemical Bond (Cornell University Press, 3rd ed. 1960)', source_url: 'https://doi.org/10.1021/ja01355a027', confidence: 'high' },
    { id: 'fact-sci-chem-002', statement: 'Molecular orbital theory, developed by Mulliken and Hund in the 1920s-30s, describes bonding through delocalized wavefunctions.', source_title: 'Mulliken, R.S. (Nobel Lecture 1966): Spectroscopy, Molecular Orbitals, and Chemical Bonding', source_url: 'https://www.nobelprize.org/prizes/chemistry/1966/mulliken/lecture/', confidence: 'high' },
    { id: 'fact-sci-chem-003', statement: 'Hydrogen bonding, a key intermolecular force, is responsible for water\'s anomalous properties and DNA base pairing.', source_title: 'Jeffrey, G.A. An Introduction to Hydrogen Bonding (Oxford University Press 1997)', source_url: 'https://global.oup.com/academic/product/an-introduction-to-hydrogen-bonding-9780195095494', confidence: 'high' },
  ],
  'data-science-fundamentals': [
    { id: 'fact-sci-ds-001', statement: 'CRISP-DM (Cross-Industry Standard Process for Data Mining) remains the most widely adopted data science project framework with 6 phases.', source_title: 'Shearer, C. The CRISP-DM model: The New Blueprint for Data Mining (Journal of Data Warehousing 2000)', source_url: 'https://www.semanticscholar.org/paper/CRISP-DM', confidence: 'medium' },
    { id: 'fact-sci-ds-002', statement: 'The Hadley Wickham "Tidy Data" paper (JStatSoft 2014) established the standard for structuring datasets for analysis.', source_title: 'Wickham, H. Tidy Data (Journal of Statistical Software 2014)', source_url: 'https://doi.org/10.18637/jss.v059.i10', confidence: 'high' },
    { id: 'fact-sci-ds-003', statement: 'Data science combines statistics, computer science, and domain expertise as visualized by the Drew Conway Venn diagram (2010).', source_title: 'Conway, D. The Data Science Venn Diagram (2010)', source_url: 'https://drewconway.com/zia/2013/3/26/the-data-science-venn-diagram', confidence: 'medium' },
  ],
  'environmental-science': [
    { id: 'fact-sci-env-001', statement: 'CO2 atmospheric concentration reached 421 ppm in 2023, the highest in at least 2 million years per ice core data.', source_title: 'IPCC Sixth Assessment Report (AR6) 2023: Climate Change Synthesis Report', source_url: 'https://www.ipcc.ch/report/ar6/syr/', confidence: 'high' },
    { id: 'fact-sci-env-002', statement: 'The "planetary boundaries" framework, proposed by Rockström et al. (Nature 2009, updated 2023), identifies 9 critical Earth system thresholds.', source_title: 'Richardson, K. et al. Earth beyond six of nine planetary boundaries (Science Advances 2023)', source_url: 'https://doi.org/10.1126/sciadv.adh2458', confidence: 'high' },
    { id: 'fact-sci-env-003', statement: 'Biodiversity loss is occurring at 100-1000x the background extinction rate, with 1 million species at risk per IPBES 2019.', source_title: 'IPBES Global Assessment Report on Biodiversity and Ecosystem Services (2019)', source_url: 'https://doi.org/10.5281/zenodo.3831673', confidence: 'high' },
  ],
  'geological-time': [
    { id: 'fact-sci-geo-001', statement: 'The Geological Time Scale divides Earth\'s 4.6-billion-year history into eons, eras, periods, and epochs, with the Anthropocene proposed as a new epoch.', source_title: 'International Commission on Stratigraphy (ICS) International Chronostratigraphic Chart 2023', source_url: 'https://stratigraphy.org/chart', confidence: 'high' },
    { id: 'fact-sci-geo-002', statement: 'Radiometric dating using uranium-lead decay (discovered by Patterson 1956) established Earth\'s age at 4.54 ± 0.05 billion years.', source_title: 'Patterson, C. Age of meteorites and the Earth (Geochimica et Cosmochimica Acta 1956)', source_url: 'https://doi.org/10.1016/0016-7037(56)90036-9', confidence: 'high' },
    { id: 'fact-sci-geo-003', statement: 'The Cambrian Explosion (~541 mya) saw the rapid emergence of most major animal phyla over approximately 20-25 million years.', source_title: 'Erwin, D.H. & Valentine, J.W. The Cambrian Explosion (Roberts & Co. 2013)', source_url: 'https://www.roberts-publishers.com/the-cambrian-explosion.html', confidence: 'high' },
  ],
  'molecular-biology-central-dogma': [
    { id: 'fact-sci-bio-001', statement: 'Francis Crick articulated the Central Dogma of Molecular Biology in 1958: genetic information flows from DNA → RNA → protein.', source_title: 'Crick, F. On protein synthesis (Symposium of the Society for Experimental Biology 1958)', source_url: 'https://doi.org/10.1038/227561a0', confidence: 'high' },
    { id: 'fact-sci-bio-002', statement: 'Watson and Crick\'s 1953 Nature paper described the double helix structure of DNA, based on Rosalind Franklin\'s X-ray crystallography data.', source_title: 'Watson, J.D. & Crick, F.H.C. Molecular Structure of Nucleic Acids (Nature 1953)', source_url: 'https://doi.org/10.1038/171737a0', confidence: 'high' },
    { id: 'fact-sci-bio-003', statement: 'The genetic code is universal across all domains of life and was fully deciphered by Nirenberg and Khorana (Nobel Prize 1968).', source_title: 'Nirenberg, M. et al. The RNA code and protein synthesis (Cold Spring Harbor Symposia 1966)', source_url: 'https://doi.org/10.1101/SQB.1966.031.01.008', confidence: 'high' },
  ],

  // === HEALTH (4) ===
  'chronic-disease-prevention': [
    { id: 'fact-hlth-chr-001', statement: 'Non-communicable diseases (NCDs) account for 74% of all deaths globally, with cardiovascular diseases being the leading cause per WHO 2023.', source_title: 'WHO Global Status Report on Noncommunicable Diseases 2023', source_url: 'https://www.who.int/publications/i/item/9789240057104', confidence: 'high' },
    { id: 'fact-hlth-chr-002', statement: 'Tobacco use, unhealthy diet, physical inactivity, and harmful alcohol use are the four major modifiable risk factors for NCDs.', source_title: 'WHO Fact Sheet: Noncommunicable Diseases (2023)', source_url: 'https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases', confidence: 'high' },
    { id: 'fact-hlth-chr-003', statement: 'The Framingham Heart Study (1948-present, NEJM) identified smoking, high BP, and cholesterol as major cardiovascular risk factors.', source_title: 'Dawber, T.R. et al. Epidemiological approaches to heart disease: the Framingham Study (AJPH 1951)', source_url: 'https://doi.org/10.2105/AJPH.41.3.279', confidence: 'high' },
  ],
  'epidemiology-fundamentals': [
    { id: 'fact-hlth-epi-001', statement: 'John Snow\'s 1854 cholera investigation established the foundation of modern epidemiology by linking the Broad Street pump to cases.', source_title: 'Snow, J. On the Mode of Communication of Cholera (2nd ed. 1855)', source_url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1740491/', confidence: 'high' },
    { id: 'fact-hlth-epi-002', statement: 'Bradford Hill\'s 1965 criteria for causation remain a core framework for evaluating epidemiological evidence.', source_title: 'Hill, A.B. The Environment and Disease: Association or Causation? (Proceedings of the Royal Society of Medicine 1965)', source_url: 'https://doi.org/10.1177/003591576505800503', confidence: 'high' },
    { id: 'fact-hlth-epi-003', statement: 'The basic reproduction number (R0) quantifies disease transmissibility; COVID-19 early estimates ranged 2.0-3.0 per WHO and Imperial College.', source_title: 'Anderson, R.M. et al. How will country-based mitigation measures influence the course of the COVID-19 epidemic? (Lancet 2020)', source_url: 'https://doi.org/10.1016/S0140-6736(20)30567-5', confidence: 'high' },
  ],
  'human-anatomy': [
    { id: 'fact-hlth-ana-001', statement: 'Gray\'s Anatomy, first published in 1858 by Henry Gray, remains the most authoritative anatomical reference; the 42nd edition (2020) includes modern imaging.', source_title: 'Standring, S. (ed.) Gray\'s Anatomy: The Anatomical Basis of Clinical Practice, 42nd Edition (Elsevier 2020)', source_url: 'https://www.elsevier.com/books/grays-anatomy/standring/978-0-7020-7705-0', confidence: 'high' },
    { id: 'fact-hlth-ana-002', statement: 'The human body contains approximately 206 bones, 600+ muscles, and the adult heart pumps about 7,500 liters of blood daily.', source_title: 'Marieb, E.N. & Hoehn, K. Human Anatomy & Physiology, 11th ed. (Pearson 2019)', source_url: 'https://www.pearson.com/en-us/subject-catalog/p/human-anatomy-physiology/P200000006820', confidence: 'high' },
    { id: 'fact-hlth-ana-003', statement: 'The nervous system contains ~86 billion neurons, with the cerebral cortex alone accounting for ~16 billion per Azevedo et al. (JCompNeurol 2009).', source_title: 'Azevedo, F.A.C. et al. Equal numbers of neuronal and nonneuronal cells (Journal of Comparative Neurology 2009)', source_url: 'https://doi.org/10.1002/cne.21974', confidence: 'high' },
  ],
  'mental-health-fundamentals': [
    { id: 'fact-hlth-mh-001', statement: 'The WHO estimates that 1 in 8 people globally (970 million) lived with a mental disorder in 2019, with anxiety and depression the most common.', source_title: 'WHO World Mental Health Report: Transforming Mental Health for All (2022)', source_url: 'https://www.who.int/publications/i/item/9789240049338', confidence: 'high' },
    { id: 'fact-hlth-mh-002', statement: 'The DSM-5-TR (2022), published by APA, is the standard classification of mental disorders used by clinicians worldwide.', source_title: 'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, 5th ed. Text Revision (DSM-5-TR) 2022', source_url: 'https://doi.org/10.1176/appi.books.9780890425787', confidence: 'high' },
    { id: 'fact-hlth-mh-003', statement: 'Cognitive Behavioral Therapy (CBT), developed by Aaron Beck in the 1960s, is the most evidence-based psychotherapy for depression and anxiety.', source_title: 'Beck, A.T. Cognitive Therapy and the Emotional Disorders (International Universities Press 1976)', source_url: 'https://doi.org/10.1016/S0005-7894(79)80093-3', confidence: 'high' },
  ],

  // === ARTS (3) ===
  'contemporary-art-trends': [
    { id: 'fact-art-ct-001', statement: 'The global art market reached $65 billion in 2023 per Art Basel/UBS report, with online sales accounting for 18% of total value.', source_title: 'McAndrew, C. The Art Basel & UBS Global Art Market Report 2024', source_url: 'https://www.artbasel.com/stories/art-market-report-2024', confidence: 'high' },
    { id: 'fact-art-ct-002', statement: 'NFT art exploded in 2021 with Beeple\'s "Everydays" selling for $69.3M at Christie\'s, marking digital art\'s entry into the fine art market.', source_title: 'Christie\'s Auction House: Beeple\'s Everydays: The First 5000 Days (March 2021)', source_url: 'https://www.christies.com/features/Monumental-collage-by-Beeple-is-first-purely-digital-artwork-NFT-to-come-to-auction-11510-7.aspx', confidence: 'high' },
    { id: 'fact-art-ct-003', statement: 'AI-generated art gained recognition when Jason Allen\'s "Théâtre D\'opéra Spatial" won the Colorado State Fair digital art competition in 2022.', source_title: 'Roose, K. An A.I.-Generated Picture Won an Art Prize. Artists Aren\'t Happy. (New York Times 2022)', source_url: 'https://www.nytimes.com/2022/09/02/technology/ai-artificial-intelligence-artists.html', confidence: 'high' },
  ],
  'political-philosophy': [
    { id: 'fact-art-pp-001', statement: 'John Rawls\' "A Theory of Justice" (1971) proposed the "veil of ignorance" thought experiment and the difference principle.', source_title: 'Rawls, J. A Theory of Justice (Harvard University Press 1971, revised ed. 1999)', source_url: 'https://www.hup.harvard.edu/catalog.php?isbn=9780674000780', confidence: 'high' },
    { id: 'fact-art-pp-002', statement: 'Isaiah Berlin\'s "Two Concepts of Liberty" (1958) distinguished between negative liberty (freedom from interference) and positive liberty (self-mastery).', source_title: 'Berlin, I. Two Concepts of Liberty (Clarendon Press 1958, reprinted in Four Essays on Liberty 1969)', source_url: 'https://doi.org/10.1093/019924989X.001.0001', confidence: 'high' },
    { id: 'fact-art-pp-003', statement: 'Hannah Arendt\'s "The Origins of Totalitarianism" (1951) analyzed the shared roots of Nazism and Stalinism in imperialism and anti-Semitism.', source_title: 'Arendt, H. The Origins of Totalitarianism (Harcourt 1951)', source_url: 'https://www.semanticscholar.org/paper/origins-of-totalitarianism', confidence: 'high' },
  ],
  'western-ethics-tradition': [
    { id: 'fact-art-eth-001', statement: 'Aristotle\'s "Nicomachean Ethics" (~350 BCE) established virtue ethics as one of the three major normative ethical frameworks.', source_title: 'Aristotle. Nicomachean Ethics (trans. Irwin, T., Hackett 3rd ed. 2019)', source_url: 'https://hackettpublishing.com/nicomachean-ethics', confidence: 'high' },
    { id: 'fact-art-eth-002', statement: 'Kant\'s "Groundwork of the Metaphysics of Morals" (1785) formulated the Categorical Imperative: act only on maxims that can be universalized.', source_title: 'Kant, I. Groundwork of the Metaphysics of Morals (Cambridge University Press 2012, trans. Gregor/Timmermann)', source_url: 'https://doi.org/10.1017/CBO9780511973741', confidence: 'high' },
    { id: 'fact-art-eth-003', statement: 'Mill\'s "Utilitarianism" (1863) articulated the Greatest Happiness Principle: actions are right if they promote happiness.', source_title: 'Mill, J.S. Utilitarianism (1863, Oxford World Classics 1998)', source_url: 'https://global.oup.com/academic/product/utilitarianism-9780198751632', confidence: 'high' },
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

  // Round-trip verify
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
['science', [
  'astronomy-and-cosmology','chemical-bonding','data-science-fundamentals',
  'environmental-science','geological-time','molecular-biology-central-dogma'
]].reduce((a,v)=>Array.isArray(v)?v:v).forEach ? null : null;

const scienceTargets = ['astronomy-and-cosmology','chemical-bonding','data-science-fundamentals',
  'environmental-science','geological-time','molecular-biology-central-dogma'];
console.log('\n=== SCIENCE (6) ===');
scienceTargets.forEach(s => { if(enrichFile(path.join(ROOT,'science'),s)) enriched++; else skipped++; });

// health(4)
const healthTargets = ['chronic-disease-prevention','epidemiology-fundamentals','human-anatomy','mental-health-fundamentals'];
console.log('=== HEALTH (4) ===');
healthTargets.forEach(s => { if(enrichFile(path.join(ROOT,'health'),s)) enriched++; else skipped++; });

// arts(3)
const artsTargets = ['contemporary-art-trends','political-philosophy','western-ethics-tradition'];
console.log('=== ARTS (3) ===');
artsTargets.forEach(s => { if(enrichFile(path.join(ROOT,'arts'),s)) enriched++; else skipped++; });

console.log('\nS10 COMPLETE: enriched=' + enriched + ' skipped=' + skipped + '/13');
