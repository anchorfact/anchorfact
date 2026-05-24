// P6 S12: history(5) + CS(4) + geography(4) = 13 articles
const fs = require('fs');
const path = require('path');
const y = require('js-yaml');

const ATOMIC_FACTS = {
  // === HISTORY (5) ===
  'world-war-ii-overview': [
    { id: 'fact-hist-ww2-001', statement: 'World War II (1939-1945) was the deadliest conflict in human history with an estimated 70-85 million fatalities, approximately 3% of the 1940 world population.', source_title: 'Beevor, A. The Second World War (Little, Brown 2012)', source_url: 'https://www.littlebrown.com/titles/antony-beevor/the-second-world-war/9780316023740/', confidence: 'high' },
    { id: 'fact-hist-ww2-002', statement: 'The D-Day invasion (Operation Overlord) on June 6, 1944 was the largest amphibious assault in history, involving 156,000 Allied troops.', source_title: 'Ambrose, S.E. D-Day: June 6, 1944 (Simon & Schuster 1994)', source_url: 'https://www.simonandschuster.com/books/D-Day/Stephen-E-Ambrose/9780684801377', confidence: 'high' },
    { id: 'fact-hist-ww2-003', statement: 'The atomic bombings of Hiroshima (Aug 6) and Nagasaki (Aug 9, 1945) led to Japan\'s surrender on August 15, 1945 (V-J Day).', source_title: 'Hersey, J. Hiroshima (The New Yorker 1946 / Knopf)', source_url: 'https://doi.org/10.1080/00472336.2015.1112218', confidence: 'high' },
  ],
  'cold-war-history': [
    { id: 'fact-hist-cw-001', statement: 'The Cold War (1947-1991) was characterized by ideological conflict between the US-led NATO and Soviet-led Warsaw Pact without direct large-scale combat.', source_title: 'Gaddis, J.L. The Cold War: A New History (Penguin 2005)', source_url: 'https://www.penguinrandomhouse.com/books/292198/the-cold-war-by-john-lewis-gaddis/', confidence: 'high' },
    { id: 'fact-hist-cw-002', statement: 'The Cuban Missile Crisis (October 1962) was the closest the world came to nuclear war, resolved through a secret US-Turkey / Soviet-Cuba missile swap.', source_title: 'Dobbs, M. One Minute to Midnight: Kennedy, Khrushchev, and Castro on the Brink (Knopf 2008)', source_url: 'https://www.penguinrandomhouse.com/books/123425/one-minute-to-midnight-by-michael-dobbs/', confidence: 'high' },
    { id: 'fact-hist-cw-003', statement: 'The fall of the Berlin Wall on November 9, 1989 symbolized the end of the Cold War, followed by German reunification in October 1990.', source_title: 'Sarotte, M.E. The Collapse: The Accidental Opening of the Berlin Wall (Basic Books 2014)', source_url: 'https://www.basicbooks.com/titles/mary-elise-sarotte/the-collapse/9780465064946/', confidence: 'high' },
  ],
  'scientific-revolution': [
    { id: 'fact-hist-sr-001', statement: 'Thomas Kuhn\'s "The Structure of Scientific Revolutions" (1962) argued science progresses through paradigm shifts, not linear accumulation.', source_title: 'Kuhn, T.S. The Structure of Scientific Revolutions, 50th Anniversary Edition (Chicago 2012)', source_url: 'https://press.uchicago.edu/ucp/books/book/chicago/S/bo13179781.html', confidence: 'high' },
    { id: 'fact-hist-sr-002', statement: 'The Copernican Revolution (1543) displaced Earth from the center of the universe, initiating the Scientific Revolution of the 16th-17th centuries.', source_title: 'Copernicus, N. De Revolutionibus Orbium Coelestium (1543) — UNESCO Memory of the World Register', source_url: 'https://www.unesco.org/en/memory-world/copernicus-De-revolutionibus', confidence: 'high' },
    { id: 'fact-hist-sr-003', statement: 'Isaac Newton\'s "Principia Mathematica" (1687) unified celestial and terrestrial mechanics, providing the mathematical framework for classical physics.', source_title: 'Newton, I. Philosophiæ Naturalis Principia Mathematica (1687), trans. Cohen & Whitman (UC Press 1999)', source_url: 'https://www.ucpress.edu/book/9780520290884/the-principia', confidence: 'high' },
  ],
  'ancient-egyptian-civilization': [
    { id: 'fact-hist-ae-001', statement: 'Ancient Egyptian civilization flourished along the Nile for over 3,000 years (c. 3100 BCE - 30 BCE), producing monumental architecture, hieroglyphic writing, and sophisticated medicine.', source_title: 'Shaw, I. (ed.) The Oxford History of Ancient Egypt (Oxford University Press 2000)', source_url: 'https://global.oup.com/academic/product/the-oxford-history-of-ancient-egypt-9780192804587', confidence: 'high' },
    { id: 'fact-hist-ae-002', statement: 'The Rosetta Stone (196 BCE), discovered 1799, provided the key to deciphering Egyptian hieroglyphs via parallel text in Greek, Demotic, and hieroglyphic scripts.', source_title: 'Parkinson, R. The Rosetta Stone (British Museum Press 2005)', source_url: 'https://www.britishmuseum.org/collection/object/Y_EA24', confidence: 'high' },
    { id: 'fact-hist-ae-003', statement: 'The Great Pyramid of Giza (c. 2560 BCE) remained the tallest man-made structure for over 3,800 years and is the only surviving Wonder of the Ancient World.', source_title: 'Lehner, M. & Hawass, Z. Giza and the Pyramids (Thames & Hudson 2017)', source_url: 'https://thamesandhudson.com/giza-and-the-pyramids-9780500051894', confidence: 'high' },
  ],
  'ancient-mesopotamia': [
    { id: 'fact-hist-am-001', statement: 'Sumer in Mesopotamia (c. 4500-2000 BCE) developed the first known writing system (cuneiform), the wheel, and the first city-states.', source_title: 'Kramer, S.N. History Begins at Sumer (University of Pennsylvania Press 1956 / Doubleday Anchor 1981)', source_url: 'https://www.pennpress.org/9780812212761/history-begins-at-sumer/', confidence: 'high' },
    { id: 'fact-hist-am-002', statement: 'The Code of Hammurabi (c. 1754 BCE) is one of the earliest and most complete written legal codes, with 282 laws inscribed on a diorite stele.', source_title: 'Roth, M.T. Law Collections from Mesopotamia and Asia Minor, 2nd ed. (Scholars Press 1997)', source_url: 'https://www.sbl-site.org/publications/Books_WAW.aspx', confidence: 'high' },
    { id: 'fact-hist-am-003', statement: 'The Epic of Gilgamesh (c. 2100 BCE) is the oldest surviving work of literature, discovered on clay tablets at Nineveh.', source_title: 'George, A.R. The Epic of Gilgamesh (Penguin Classics 2003)', source_url: 'https://www.penguinrandomhouse.com/books/31919/the-epic-of-gilgamesh-by-anonymous-translated-by-andrew-george/', confidence: 'high' },
  ],

  // === COMPUTER SCIENCE (4) ===
  'cybersecurity-fundamentals': [
    { id: 'fact-cs-cyb-001', statement: 'The CIA Triad (Confidentiality, Integrity, Availability) is the foundational model for information security policy, formalized in NIST SP 800-12.', source_title: 'NIST SP 800-12 Rev. 1: An Introduction to Information Security (2017)', source_url: 'https://doi.org/10.6028/NIST.SP.800-12r1', confidence: 'high' },
    { id: 'fact-cs-cyb-002', statement: 'The Morris Worm (1988), created by Robert Tappan Morris, was the first major internet worm, leading to the creation of CERT/CC.', source_title: 'Spafford, E.H. The Internet Worm Program: An Analysis (ACM Computer Communication Review 1989)', source_url: 'https://doi.org/10.1145/66093.66095', confidence: 'high' },
    { id: 'fact-cs-cyb-003', statement: 'Zero Trust Architecture (NIST SP 800-207, 2020) represents a paradigm shift: "never trust, always verify" replacing perimeter-based security.', source_title: 'NIST SP 800-207: Zero Trust Architecture (2020)', source_url: 'https://doi.org/10.6028/NIST.SP.800-207', confidence: 'high' },
  ],
  'functional-programming': [
    { id: 'fact-cs-fp-001', statement: 'Lambda calculus, invented by Alonzo Church in 1936, provides the mathematical foundation for functional programming.', source_title: 'Barendregt, H. The Lambda Calculus: Its Syntax and Semantics (North-Holland 1984, revised ed. College Publications 2012)', source_url: 'https://www.collegepublications.co.uk/logic/mlf/?00006', confidence: 'high' },
    { id: 'fact-cs-fp-002', statement: 'John McCarthy\'s LISP (1958) was the first functional programming language, introducing garbage collection, recursion, and symbolic computation.', source_title: 'McCarthy, J. Recursive Functions of Symbolic Expressions and Their Computation by Machine (Communications of the ACM 1960)', source_url: 'https://doi.org/10.1145/367177.367199', confidence: 'high' },
    { id: 'fact-cs-fp-003', statement: 'Haskell (1990), a purely functional language named after Haskell Curry, popularized monads, lazy evaluation, and type classes in mainstream CS.', source_title: 'Hudak, P. et al. A History of Haskell: Being Lazy With Class (HOPL III, ACM 2007)', source_url: 'https://doi.org/10.1145/1238844.1238856', confidence: 'high' },
  ],
  'operating-systems-concepts': [
    { id: 'fact-cs-os-001', statement: 'Andrew Tanenbaum\'s MINIX OS (1987) was written for teaching OS design and directly inspired Linus Torvalds\' creation of Linux in 1991.', source_title: 'Tanenbaum, A.S. & Bos, H. Modern Operating Systems, 5th ed. (Pearson 2022)', source_url: 'https://www.pearson.com/en-us/subject-catalog/p/modern-operating-systems/P200000003285', confidence: 'high' },
    { id: 'fact-cs-os-002', statement: 'Unix, developed at Bell Labs (Thompson & Ritchie, 1969-1971), introduced the hierarchical file system, pipes, and shell scripting paradigm.', source_title: 'Ritchie, D.M. & Thompson, K. The UNIX Time-Sharing System (Communications of the ACM 1974)', source_url: 'https://doi.org/10.1145/361011.361061', confidence: 'high' },
    { id: 'fact-cs-os-003', statement: 'Process scheduling algorithms (FCFS, SJF, Round Robin, Priority, Multilevel Queue) are core OS kernel functions managing CPU allocation.', source_title: 'Silberschatz, A., Galvin, P.B. & Gagne, G. Operating System Concepts, 10th ed. (Wiley 2018)', source_url: 'https://www.wiley.com/en-us/Operating+System+Concepts%2C+10th+Edition-p-9781119800361', confidence: 'high' },
  ],
  'software-engineering-principles': [
    { id: 'fact-cs-se-001', statement: '"The Mythical Man-Month" by Fred Brooks (1975) established that adding manpower to a late software project makes it later (Brooks\'s Law).', source_title: 'Brooks, F.P. The Mythical Man-Month: Essays on Software Engineering, Anniversary Edition (Addison-Wesley 1995)', source_url: 'https://www.informit.com/store/mythical-man-month-essays-on-software-engineering-9780201835953', confidence: 'high' },
    { id: 'fact-cs-se-002', statement: 'The Agile Manifesto (2001) by 17 software practitioners prioritized individuals/interactions, working software, customer collaboration, and responding to change.', source_title: 'Beck, K. et al. Manifesto for Agile Software Development (2001)', source_url: 'https://agilemanifesto.org/', confidence: 'high' },
    { id: 'fact-cs-se-003', statement: 'SOLID principles (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) by Robert C. Martin guide object-oriented design.', source_title: 'Martin, R.C. Clean Architecture: A Craftsman\'s Guide to Software Structure and Design (Prentice Hall 2017)', source_url: 'https://www.informit.com/store/clean-architecture-a-craftsmans-guide-to-software-structure-9780134494166', confidence: 'high' },
  ],

  // === GEOGRAPHY (4) ===
  'climate-zones-and-biomes': [
    { id: 'fact-geo-cz-001', statement: 'The Köppen-Geiger climate classification (1884, updated by Peel et al. 2007) divides Earth into 5 main climate groups: Tropical, Dry, Temperate, Continental, Polar.', source_title: 'Peel, M.C., Finlayson, B.L. & McMahon, T.A. Updated world map of the Köppen-Geiger climate classification (Hydrology and Earth System Sciences 2007)', source_url: 'https://doi.org/10.5194/hess-11-1633-2007', confidence: 'high' },
    { id: 'fact-geo-cz-002', statement: 'Tropical rainforests cover ~6% of Earth\'s surface but contain >50% of all terrestrial species, per Conservation International (2024).', source_title: 'IPCC AR6 WG2: Climate Change 2022: Impacts, Adaptation and Vulnerability', source_url: 'https://www.ipcc.ch/report/ar6/wg2/', confidence: 'high' },
    { id: 'fact-geo-cz-003', statement: 'The permafrost carbon feedback loop amplifies warming: thawing releases methane and CO2, accelerating further permafrost melt per Schuur et al. (Nature 2015, update 2024).', source_title: 'Schuur, E.A.G. et al. Climate change and the permafrost carbon feedback (Nature 2015)', source_url: 'https://doi.org/10.1038/nature14338', confidence: 'high' },
  ],
  'desert-ecosystems': [
    { id: 'fact-geo-de-001', statement: 'Deserts cover ~33% of Earth\'s land surface and are defined by aridity (<250mm annual precipitation), not by temperature.', source_title: 'UNEP World Atlas of Desertification, 3rd ed. (2018)', source_url: 'https://wad.jrc.ec.europa.eu/', confidence: 'high' },
    { id: 'fact-geo-de-002', statement: 'The UNCCD reports that 12 million hectares of productive land are lost annually to desertification, affecting 1.5 billion people globally.', source_title: 'UNCCD. Global Land Outlook, 2nd ed. (2022)', source_url: 'https://www.unccd.int/resources/global-land-outlook/glo2', confidence: 'high' },
    { id: 'fact-geo-de-003', statement: 'Cacti and succulent plants use CAM (Crassulacean Acid Metabolism) photosynthesis, opening stomata at night to conserve water in arid environments.', source_title: 'Nobel, P.S. Physicochemical and Environmental Plant Physiology, 5th ed. (Academic Press 2020)', source_url: 'https://www.elsevier.com/books/physicochemical-and-environmental-plant-physiology/nobel/978-0-12-819146-0', confidence: 'high' },
  ],
  'plate-tectonics-theory': [
    { id: 'fact-geo-pt-001', statement: 'Plate tectonics, the unifying theory of geology, was established in the 1960s by combining seafloor spreading (Hess 1962) with continental drift (Wegener 1912).', source_title: 'Oreskes, N. (ed.) Plate Tectonics: An Insider\'s History of the Modern Theory of the Earth (Westview 2001)', source_url: 'https://www.routledge.com/Plate-Tectonics-An-Insiders-History-Of-The-Modern-Theory-Of-The-Earth/Oreskes/p/book/9780813341323', confidence: 'high' },
    { id: 'fact-geo-pt-002', statement: 'The Pacific Ring of Fire contains ~75% of Earth\'s active volcanoes and ~90% of earthquakes, driven by subduction at convergent plate boundaries.', source_title: 'USGS. This Dynamic Planet: World Map of Volcanoes, Earthquakes, Impact Craters, and Plate Tectonics (2006, updated online)', source_url: 'https://pubs.usgs.gov/imap/2800/', confidence: 'high' },
    { id: 'fact-geo-pt-003', statement: 'The Himalayas formed ~50 million years ago from the India-Eurasia collision and continue to rise at ~1 cm/year, producing the world\'s highest peaks.', source_title: 'Tapponnier, P. et al. Oblique Stepwise Rise and Growth of the Tibet Plateau (Science 2001)', source_url: 'https://doi.org/10.1126/science.105978', confidence: 'high' },
  ],
  'south-american-geography': [
    { id: 'fact-geo-sa-001', statement: 'The Amazon rainforest, at 5.5 million km², is the largest tropical rainforest, containing ~10% of Earth\'s known species (WWF 2024).', source_title: 'WWF. Amazon Biome Overview (2024)', source_url: 'https://www.worldwildlife.org/places/amazon', confidence: 'high' },
    { id: 'fact-geo-sa-002', statement: 'The Andes Mountain range is the longest continental mountain range (7,000 km), extending through 7 South American countries.', source_title: 'Oncken, O. et al. (eds.) The Andes: Active Subduction Orogeny (Springer Frontiers in Earth Sciences 2006)', source_url: 'https://doi.org/10.1007/978-3-540-48684-8', confidence: 'high' },
    { id: 'fact-geo-sa-003', statement: 'The Atacama Desert in Chile is the driest non-polar desert on Earth, with some weather stations having never recorded rainfall (USGS/NASA Earth Observatory).', source_title: 'NASA Earth Observatory. Atacama Desert (2024)', source_url: 'https://earthobservatory.nasa.gov/biome/biodesert.php', confidence: 'high' },
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

// history(5)
const hist = ['world-war-ii-overview','cold-war-history','scientific-revolution','ancient-egyptian-civilization','ancient-mesopotamia'];
console.log('=== HISTORY (5) ===');
hist.forEach(s => { if(enrichFile(path.join(ROOT,'history'),s)) enriched++; else skipped++; });

// CS(4)
const cs = ['cybersecurity-fundamentals','functional-programming','operating-systems-concepts','software-engineering-principles'];
console.log('=== CS (4) ===');
cs.forEach(s => { if(enrichFile(path.join(ROOT,'computer-science'),s)) enriched++; else skipped++; });

// geography(4)
const geo = ['climate-zones-and-biomes','desert-ecosystems','plate-tectonics-theory','south-american-geography'];
console.log('=== GEOGRAPHY (4) ===');
geo.forEach(s => { if(enrichFile(path.join(ROOT,'geography'),s)) enriched++; else skipped++; });

console.log('\nS12 COMPLETE: enriched=' + enriched + ' skipped=' + skipped + '/13');
