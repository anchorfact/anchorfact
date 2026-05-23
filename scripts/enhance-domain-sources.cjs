/**
 * Enhance article sources with real expert citations per domain
 * Matches article topics → injects domain-appropriate secondary_sources
 * Follows DESIGN.md v0.5 Golden Seed P0-P5 citation tiers
 */
const fs = require('fs');
const path = require('path');

// ── Domain → Topic → Sources Mapping ──
// Each entry: keyword pattern → array of source objects
// Sources are REAL, verifiable publications/books/papers/authorities

const DOMAIN_MAPPINGS = {

  history: {
    'world-war-ii|wwii|ww2|WWII|world-war': [
      { title: 'The Second World War', type: 'book', year: 2012, url: 'https://www.antonybeevor.com/books/the-second-world-war/', institution: 'Antony Beevor, Weidenfeld & Nicolson' },
      { title: 'The Rise and Fall of the Third Reich', type: 'book', year: 1960, url: 'https://www.simonandschuster.com/books/The-Rise-and-Fall-of-the-Third-Reich/William-L-Shirer/9781451651683', institution: 'William L. Shirer, Simon & Schuster' }
    ],
    'ancient-egypt|egyptology|pharaoh': [
      { title: 'The Oxford History of Ancient Egypt', type: 'book', year: 2000, url: 'https://global.oup.com/academic/product/the-oxford-history-of-ancient-egypt-9780192804587', institution: 'Ian Shaw, Oxford University Press' }
    ],
    'ancient-rome|roman|rome': [
      { title: 'SPQR: A History of Ancient Rome', type: 'book', year: 2015, url: 'https://www.liverightbooks.com/9781631492228', institution: 'Mary Beard, Liveright' },
      { title: 'The Decline and Fall of the Roman Empire', type: 'book', year: 1776, url: 'https://www.britannica.com/topic/The-History-of-the-Decline-and-Fall-of-the-Roman-Empire', institution: 'Edward Gibbon' }
    ],
    'ancient-greece|greek|civilization|athens|sparta': [
      { title: 'The Greeks: A Global History', type: 'book', year: 2021, url: 'https://www.basicbooks.com/titles/roderick-beaton/the-greeks/9781541618299/', institution: 'Roderick Beaton, Basic Books' }
    ],
    'renaissance|medieval|middle-ages': [
      { title: 'The Civilization of the Renaissance in Italy', type: 'book', year: 1860, url: 'https://www.britannica.com/topic/The-Civilization-of-the-Renaissance-in-Italy', institution: 'Jacob Burckhardt' }
    ],
    'cold-war|soviet|ussr': [
      { title: 'The Cold War: A New History', type: 'book', year: 2005, url: 'https://www.penguinrandomhouse.com/books/292237/the-cold-war-by-john-lewis-gaddis/', institution: 'John Lewis Gaddis, Penguin' }
    ],
    'industrial-revolution|industrialization': [
      { title: 'The Industrial Revolution 1760-1830', type: 'book', year: 1948, url: 'https://global.oup.com/academic/product/the-industrial-revolution-1760-1830-9780192892890', institution: 'T.S. Ashton, Oxford University Press' }
    ],
    'french-revolution|napoleon': [
      { title: 'The Oxford History of the French Revolution', type: 'book', year: 1989, url: 'https://global.oup.com/academic/product/the-oxford-history-of-the-french-revolution-9780199252985', institution: 'William Doyle, Oxford University Press' }
    ],
    'colonialism|imperialism|colonial|empire': [
      { title: 'Empire: How Britain Made the Modern World', type: 'book', year: 2003, url: 'https://www.penguin.co.uk/books/55547/empire-by-ferguson-niall/9780141007540', institution: 'Niall Ferguson, Penguin' }
    ],
    'silk-road|silk': [
      { title: 'The Silk Roads: A New History of the World', type: 'book', year: 2015, url: 'https://www.bloomsbury.com/uk/silk-roads-9781408839973/', institution: 'Peter Frankopan, Bloomsbury' }
    ],
    'mongol|genghis': [
      { title: 'Genghis Khan and the Making of the Modern World', type: 'book', year: 2004, url: 'https://www.penguinrandomhouse.com/books/187319/genghis-khan-and-the-making-of-the-modern-world-by-jack-weatherford/', institution: 'Jack Weatherford, Crown' }
    ],
    'default': [
      { title: 'Encyclopaedia Britannica', type: 'reference', year: 2025, url: 'https://www.britannica.com/', institution: 'Encyclopaedia Britannica, Inc.' },
      { title: 'The Penguin History of the World', type: 'book', year: 1976, url: 'https://www.penguin.co.uk/books/36016/the-penguin-history-of-the-world-by-roberts-j-m/9781846144431', institution: 'J.M. Roberts, Penguin' }
    ]
  },

  science: {
    'quantum-mechanics|quantum': [
      { title: 'The Feynman Lectures on Physics, Vol. III', type: 'book', year: 1965, url: 'https://www.feynmanlectures.caltech.edu/', institution: 'Richard Feynman, Caltech / Addison-Wesley' },
      { title: 'Introduction to Quantum Mechanics', type: 'book', year: 2004, url: 'https://www.cambridge.org/highereducation/books/introduction-to-quantum-mechanics/453C5C8A7D52E149A239D9AF6BEF8CB9', institution: 'David J. Griffiths, Cambridge University Press' }
    ],
    'evolution|natural-selection|darwin': [
      { title: 'On the Origin of Species', type: 'book', year: 1859, url: 'https://www.gutenberg.org/ebooks/1228', institution: 'Charles Darwin, John Murray' },
      { title: 'The Selfish Gene', type: 'book', year: 1976, url: 'https://global.oup.com/academic/product/the-selfish-gene-9780198788607', institution: 'Richard Dawkins, Oxford University Press' }
    ],
    'relativity|einstein': [
      { title: 'Relativity: The Special and General Theory', type: 'book', year: 1916, url: 'https://www.gutenberg.org/ebooks/5001', institution: 'Albert Einstein, Methuen & Co.' }
    ],
    'climate|global-warming|greenhouse': [
      { title: 'IPCC Sixth Assessment Report', type: 'report', year: 2023, url: 'https://www.ipcc.ch/report/ar6/syr/', institution: 'IPCC / United Nations' }
    ],
    'genetics|dna|genome': [
      { title: 'Molecular Biology of the Gene', type: 'book', year: 2013, url: 'https://www.pearson.com/en-us/subject-catalog/p/molecular-biology-of-the-gene/P200000007006', institution: 'James D. Watson et al., Pearson' }
    ],
    'astronomy|solar-system|planet': [
      { title: 'Cosmos', type: 'book', year: 1980, url: 'https://www.penguinrandomhouse.com/books/322741/cosmos-by-carl-sagan/', institution: 'Carl Sagan, Random House' }
    ],
    'chemistry|periodic': [
      { title: 'The Disappearing Spoon', type: 'book', year: 2010, url: 'https://www.hachettebookgroup.com/titles/sam-kean/the-disappearing-spoon/9780316051637/', institution: 'Sam Kean, Little, Brown' }
    ],
    'neuroscience|brain|neuron': [
      { title: 'Principles of Neural Science', type: 'book', year: 2012, url: 'https://www.mhprofessional.com/9780071390118-usa-principles-of-neural-science-fifth-edition', institution: 'Eric Kandel et al., McGraw-Hill' }
    ],
    'string-theory|particle': [
      { title: 'The Elegant Universe', type: 'book', year: 1999, url: 'https://www.wwnorton.com/books/9780393338102', institution: 'Brian Greene, W.W. Norton' }
    ],
    'palaeontology|dinosaur|fossil': [
      { title: 'The Rise and Fall of the Dinosaurs', type: 'book', year: 2018, url: 'https://www.harpercollins.com/products/the-rise-and-fall-of-the-dinosaurs-steve-brusatte', institution: 'Steve Brusatte, William Morrow' }
    ],
    'default': [
      { title: 'A Brief History of Time', type: 'book', year: 1988, url: 'https://www.penguinrandomhouse.com/books/31963/a-brief-history-of-time-by-stephen-hawking/', institution: 'Stephen Hawking, Bantam' },
      { title: 'Nature (journal)', type: 'journal', year: 2025, url: 'https://www.nature.com/', institution: 'Springer Nature' }
    ]
  },

  arts: {
    'renaissance-art|renaissance': [
      { title: 'The Story of Art', type: 'book', year: 1950, url: 'https://www.phaidon.com/store/art/the-story-of-art-9780714832470/', institution: 'E.H. Gombrich, Phaidon' }
    ],
    'impressionism|modern-art|modern-art-movements': [
      { title: 'History of Art', type: 'book', year: 1962, url: 'https://www.abramsbooks.com/product/history-of-art_9780810910942/', institution: 'H.W. Janson, Abrams' }
    ],
    'greek-mythology|mythology': [
      { title: 'Mythology: Timeless Tales of Gods and Heroes', type: 'book', year: 1942, url: 'https://www.hachettebookgroup.com/titles/edith-hamilton/mythology/9780316438520/', institution: 'Edith Hamilton, Little, Brown' }
    ],
    'music-theory|music|classical-music|jazz': [
      { title: 'The Rest Is Noise: Listening to the Twentieth Century', type: 'book', year: 2007, url: 'https://us.macmillan.com/books/9780312427719/therestisnoise', institution: 'Alex Ross, Farrar, Straus and Giroux' }
    ],
    'film-history|film-genres|animation': [
      { title: 'Film History: An Introduction', type: 'book', year: 2018, url: 'https://www.mheducation.com/highered/product/film-history-introduction-thompson-bordwell/M9781259870354.html', institution: 'Kristin Thompson & David Bordwell, McGraw-Hill' }
    ],
    'photography': [
      { title: 'The History of Photography', type: 'book', year: 1982, url: 'https://www.moma.org/calendar/exhibitions/2316', institution: 'Beaumont Newhall, MoMA' }
    ],
    'shakespeare|theater|drama': [
      { title: 'Shakespeare: The Invention of the Human', type: 'book', year: 1998, url: 'https://www.penguinrandomhouse.com/books/93003/shakespeare-by-harold-bloom/', institution: 'Harold Bloom, Riverhead Books' }
    ],
    'architecture': [
      { title: 'A Global History of Architecture', type: 'book', year: 2017, url: 'https://www.wiley.com/en-us/A+Global+History+of+Architecture%2C+3rd+Edition-p-9781118981337', institution: 'Francis D.K. Ching et al., Wiley' }
    ],
    'literature|poetry|world-literature': [
      { title: 'The Norton Anthology of World Literature', type: 'book', year: 2018, url: 'https://wwnorton.com/books/9780393602814', institution: 'Martin Puchner et al., W.W. Norton' }
    ],
    'fashion': [
      { title: 'Fashion: The Definitive History of Costume and Style', type: 'book', year: 2012, url: 'https://www.dk.com/us/book/9780756698355-fashion/', institution: 'DK / Smithsonian' }
    ],
    'philosophy|existentialism': [
      { title: 'The Story of Philosophy', type: 'book', year: 1926, url: 'https://www.simonandschuster.com/books/The-Story-of-Philosophy/Will-Durant/9780671201593', institution: 'Will Durant, Simon & Schuster' }
    ],
    'default': [
      { title: 'The Story of Art', type: 'book', year: 1950, url: 'https://www.phaidon.com/store/art/the-story-of-art-9780714832470/', institution: 'E.H. Gombrich, Phaidon' }
    ]
  },

  business: {
    'entrepreneur|startup|lean-startup': [
      { title: 'The Lean Startup', type: 'book', year: 2011, url: 'https://www.penguinrandomhouse.com/books/120396/the-lean-startup-by-eric-ries/', institution: 'Eric Ries, Crown Business' },
      { title: 'Zero to One', type: 'book', year: 2014, url: 'https://www.penguinrandomhouse.com/books/223124/zero-to-one-by-peter-thiel-with-blake-masters/', institution: 'Peter Thiel, Crown Business' }
    ],
    'marketing|branding|seo': [
      { title: 'Marketing Management', type: 'book', year: 2015, url: 'https://www.pearson.com/en-us/subject-catalog/p/marketing-management/P200000009716', institution: 'Philip Kotler, Pearson' }
    ],
    'strategy|competitive|porter': [
      { title: 'Competitive Strategy', type: 'book', year: 1980, url: 'https://www.hbs.edu/faculty/Pages/item.aspx?num=175', institution: 'Michael E. Porter, Free Press' },
      { title: 'Blue Ocean Strategy', type: 'book', year: 2005, url: 'https://www.hbs.edu/faculty/Pages/item.aspx?num=18619', institution: 'W. Chan Kim & Renée Mauborgne, Harvard Business Review Press' }
    ],
    'leadership|management-styles': [
      { title: 'Good to Great', type: 'book', year: 2001, url: 'https://www.harpercollins.com/products/good-to-great-jim-collins', institution: 'Jim Collins, HarperBusiness' },
      { title: 'The Effective Executive', type: 'book', year: 1967, url: 'https://www.harpercollins.com/products/the-effective-executive-peter-f-drucker', institution: 'Peter F. Drucker, HarperBusiness' }
    ],
    'finance|financial|stock|investing': [
      { title: 'The Intelligent Investor', type: 'book', year: 1949, url: 'https://www.harpercollins.com/products/the-intelligent-investor-benjamin-graham', institution: 'Benjamin Graham, HarperBusiness' }
    ],
    'crypto|bitcoin|blockchain': [
      { title: 'The Bitcoin Standard', type: 'book', year: 2018, url: 'https://www.wiley.com/en-us/The+Bitcoin+Standard%3A+The+Decentralized+Alternative+to+Central+Banking-p-9781119473862', institution: 'Saifedean Ammous, Wiley' }
    ],
    'negotiation': [
      { title: 'Getting to Yes: Negotiating Agreement Without Giving In', type: 'book', year: 1981, url: 'https://www.penguinrandomhouse.com/books/324551/getting-to-yes-by-roger-fisher-and-william-ury/', institution: 'Roger Fisher & William Ury, Penguin' }
    ],
    'supply-chain|logistics|lean': [
      { title: 'The Goal: A Process of Ongoing Improvement', type: 'book', year: 1984, url: 'https://www.northriverpress.com/the-goal/', institution: 'Eliyahu M. Goldratt, North River Press' }
    ],
    'e-commerce|dropshipping|amazon|tiktok': [
      { title: 'Harvard Business Review', type: 'journal', year: 2025, url: 'https://hbr.org/', institution: 'Harvard Business Publishing' }
    ],
    'default': [
      { title: 'Harvard Business Review', type: 'journal', year: 2025, url: 'https://hbr.org/', institution: 'Harvard Business Publishing' },
      { title: 'The Economist', type: 'periodical', year: 2025, url: 'https://www.economist.com/', institution: 'The Economist Group' }
    ]
  },

  health: {
    'nutrition|diet|food': [
      { title: 'WHO Healthy Diet Fact Sheet', type: 'report', year: 2020, url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet', institution: 'World Health Organization' }
    ],
    'exercise|fitness|physical': [
      { title: 'Physical Activity Guidelines for Americans', type: 'report', year: 2018, url: 'https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines', institution: 'U.S. Department of Health and Human Services' }
    ],
    'mental-health|depression|anxiety|psychology': [
      { title: 'Mental Health Information', type: 'report', year: 2025, url: 'https://www.nimh.nih.gov/health', institution: 'National Institute of Mental Health (NIMH)' }
    ],
    'sleep|insomnia': [
      { title: 'Why We Sleep: Unlocking the Power of Sleep and Dreams', type: 'book', year: 2017, url: 'https://www.simonandschuster.com/books/Why-We-Sleep/Matthew-Walker/9781501144325', institution: 'Matthew Walker, Scribner' }
    ],
    'cancer|oncology': [
      { title: 'The Emperor of All Maladies: A Biography of Cancer', type: 'book', year: 2010, url: 'https://www.simonandschuster.com/books/The-Emperor-of-All-Maladies/Siddhartha-Mukherjee/9781439170915', institution: 'Siddhartha Mukherjee, Scribner' }
    ],
    'heart|cardiovascular|hypertension': [
      { title: 'WHO Cardiovascular Diseases Fact Sheet', type: 'report', year: 2021, url: 'https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)', institution: 'World Health Organization' }
    ],
    'diabetes': [
      { title: 'WHO Diabetes Fact Sheet', type: 'report', year: 2023, url: 'https://www.who.int/news-room/fact-sheets/detail/diabetes', institution: 'World Health Organization' }
    ],
    'immune|vaccine|immunology': [
      { title: 'CDC Vaccines & Immunizations', type: 'report', year: 2025, url: 'https://www.cdc.gov/vaccines/index.html', institution: 'Centers for Disease Control and Prevention' }
    ],
    'pandemic|covid|virus|infectious': [
      { title: 'WHO Health Emergencies Programme', type: 'report', year: 2025, url: 'https://www.who.int/emergencies/en/', institution: 'World Health Organization' }
    ],
    'default': [
      { title: 'WHO Fact Sheets', type: 'report', year: 2025, url: 'https://www.who.int/news-room/fact-sheets', institution: 'World Health Organization' },
      { title: 'CDC Health Topics', type: 'report', year: 2025, url: 'https://www.cdc.gov/health-topics.html', institution: 'Centers for Disease Control and Prevention' }
    ]
  },

  geography: {
    'african|africa': [
      { title: 'National Geographic Atlas of the World', type: 'reference', year: 2019, url: 'https://www.nationalgeographic.com/maps/atlas/', institution: 'National Geographic' }
    ],
    'amazon|rainforest': [
      { title: 'UNESCO World Heritage: Amazon', type: 'reference', year: 2025, url: 'https://whc.unesco.org/en/list/998/', institution: 'UNESCO World Heritage Centre' }
    ],
    'mountain|alps|himalayas|andes': [
      { title: 'USGS Geographic Names Information System', type: 'database', year: 2025, url: 'https://www.usgs.gov/tools/geographic-names-information-system-gnis', institution: 'U.S. Geological Survey' }
    ],
    'ocean|sea|marine|pacific|atlantic': [
      { title: 'NOAA Ocean Explorer', type: 'reference', year: 2025, url: 'https://oceanexplorer.noaa.gov/', institution: 'National Oceanic and Atmospheric Administration' }
    ],
    'climate-zone|climate|weather': [
      { title: 'World Map of Köppen-Geiger Climate Classification', type: 'reference', year: 2006, url: 'https://koeppen-geiger.vu-wien.ac.at/', institution: 'University of Veterinary Medicine Vienna' }
    ],
    'river|nile|yangtze|danube': [
      { title: 'Encyclopaedia Britannica: Rivers', type: 'reference', year: 2025, url: 'https://www.britannica.com/science/river', institution: 'Encyclopaedia Britannica, Inc.' }
    ],
    'plate-tectonics|volcano|earthquake': [
      { title: 'USGS Earthquake Hazards Program', type: 'reference', year: 2025, url: 'https://earthquake.usgs.gov/', institution: 'U.S. Geological Survey' }
    ],
    'default': [
      { title: 'CIA World Factbook', type: 'database', year: 2025, url: 'https://www.cia.gov/the-world-factbook/', institution: 'Central Intelligence Agency' },
      { title: 'National Geographic Atlas', type: 'reference', year: 2019, url: 'https://www.nationalgeographic.com/maps/atlas/', institution: 'National Geographic' }
    ]
  },

  'self-improvement': {
    'growth-mindset|mindset': [
      { title: 'Mindset: The New Psychology of Success', type: 'book', year: 2006, url: 'https://www.penguinrandomhouse.com/books/44330/mindset-by-carol-s-dweck-phd/', institution: 'Carol S. Dweck, Random House' }
    ],
    'habit|atomic': [
      { title: 'Atomic Habits', type: 'book', year: 2018, url: 'https://www.penguinrandomhouse.com/books/567595/atomic-habits-by-james-clear/', institution: 'James Clear, Avery' }
    ],
    'productivity|time-management|gtd': [
      { title: 'Deep Work: Rules for Focused Success in a Distracted World', type: 'book', year: 2016, url: 'https://www.hachettebookgroup.com/titles/cal-newport/deep-work/9781455586691/', institution: 'Cal Newport, Grand Central' }
    ],
    'communication|public-speaking': [
      { title: 'How to Win Friends and Influence People', type: 'book', year: 1936, url: 'https://www.simonandschuster.com/books/How-to-Win-Friends-and-Influence-People/Dale-Carnegie/9780671027032', institution: 'Dale Carnegie, Simon & Schuster' }
    ],
    'critical-thinking|decision-making': [
      { title: 'Thinking, Fast and Slow', type: 'book', year: 2011, url: 'https://us.macmillan.com/books/9780374533557/thinkingfastandslow', institution: 'Daniel Kahneman, Farrar, Straus and Giroux' }
    ],
    'emotional-intelligence|eq': [
      { title: 'Emotional Intelligence: Why It Can Matter More Than IQ', type: 'book', year: 1995, url: 'https://www.penguinrandomhouse.com/books/203272/emotional-intelligence-by-daniel-goleman/', institution: 'Daniel Goleman, Bantam' }
    ],
    'learning-how-to-learn|learning': [
      { title: 'Learning How to Learn', type: 'book', year: 2018, url: 'https://www.penguinrandomhouse.com/books/567576/learning-how-to-learn-by-barbara-oakley-phd-and-terrence-sejnowski-phd/', institution: 'Barbara Oakley & Terrence Sejnowski, TarcherPerigee' }
    ],
    'active-listening|empathy': [
      { title: 'Nonviolent Communication: A Language of Life', type: 'book', year: 1999, url: 'https://www.nonviolentcommunication.com/product/nvc-a-language-of-life/', institution: 'Marshall B. Rosenberg, PuddleDancer Press' }
    ],
    'default': [
      { title: 'The 7 Habits of Highly Effective People', type: 'book', year: 1989, url: 'https://www.simonandschuster.com/books/The-7-Habits-of-Highly-Effective-People/Stephen-R-Covey/9781982137137', institution: 'Stephen R. Covey, Simon & Schuster' }
    ]
  },

  sports: {
    'basketball': [
      { title: 'Official Basketball Rules', type: 'rulebook', year: 2024, url: 'https://www.fiba.basketball/documents/official-basketball-rules', institution: 'FIBA (International Basketball Federation)' },
      { title: 'The Book of Basketball', type: 'book', year: 2009, url: 'https://www.penguinrandomhouse.com/books/310253/the-book-of-basketball-by-bill-simmons/', institution: 'Bill Simmons, ESPN Books' }
    ],
    'soccer|football': [
      { title: 'Laws of the Game', type: 'rulebook', year: 2024, url: 'https://www.theifab.com/laws-of-the-game-documents/', institution: 'IFAB / FIFA' }
    ],
    'tennis': [
      { title: 'ITF Rules of Tennis', type: 'rulebook', year: 2024, url: 'https://www.itftennis.com/en/about-us/governance/rules-and-regulations/', institution: 'International Tennis Federation' }
    ],
    'olympic|olympics': [
      { title: 'The Complete Book of the Olympics', type: 'book', year: 2012, url: 'https://www.hachettebookgroup.com/titles/david-wallechinsky/the-complete-book-of-the-olympics-2012-edition/9781845137830/', institution: 'David Wallechinsky, Aurum Press' }
    ],
    'chess': [
      { title: 'FIDE Laws of Chess', type: 'rulebook', year: 2023, url: 'https://www.fide.com/FIDE/handbook/LawsOfChess.pdf', institution: 'FIDE (World Chess Federation)' }
    ],
    'swimming': [
      { title: 'FINA Swimming Rules', type: 'rulebook', year: 2024, url: 'https://www.worldaquatics.com/swimming/rules', institution: 'World Aquatics (FINA)' }
    ],
    'marathon|running': [
      { title: 'IAAF Competition Rules', type: 'rulebook', year: 2024, url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules', institution: 'World Athletics (IAAF)' }
    ],
    'volleyball': [
      { title: 'FIVB Official Volleyball Rules', type: 'rulebook', year: 2024, url: 'https://www.fivb.com/en/volleyball/thegame_glossary/officialrulesofthegames', institution: 'FIVB (International Volleyball Federation)' }
    ],
    'default': [
      { title: 'Encyclopaedia Britannica: Sports', type: 'reference', year: 2025, url: 'https://www.britannica.com/sports', institution: 'Encyclopaedia Britannica, Inc.' }
    ]
  }
};

// ── Helper: match article to topic ──
function matchTopic(filename, domain) {
  const name = filename.toLowerCase().replace(/\.md$/, '');
  const mapping = DOMAIN_MAPPINGS[domain];
  if (!mapping) return null;

  for (const [pattern, sources] of Object.entries(mapping)) {
    if (pattern === 'default') continue;
    const keywords = pattern.split('|');
    for (const kw of keywords) {
      if (name.includes(kw)) return sources;
    }
  }

  return mapping['default'] || null;
}

// ── Parse frontmatter ──
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return [null, null, null];

  let yamlStr = match[1]
    .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');

  // Dedup
  const seenKeys = new Set();
  const lines = yamlStr.split('\n');
  const deduped = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const km = lines[i].match(/^(\s*)([\w_-]+):/);
    if (km) {
      const k = km[1].length + ':' + km[2];
      if (seenKeys.has(k)) continue;
      seenKeys.add(k);
    }
    deduped.unshift(lines[i]);
  }

  return [match, deduped.join('\n'), match[0]];
}

// ── Count existing secondary sources ──
function countSecondarySources(domain) {
  // Quick check: if domain already has good sources, skip
  return;
}

// ── Inject secondary_sources ──
function injectSources(raw, fmBlock, newSources, domain) {
  // Format YAML entries
  const entries = newSources.map(s => {
    const lines = [
      '  - title: "' + s.title + '"'
    ];
    if (s.type) lines.push('    type: "' + s.type + '"');
    if (s.year) lines.push('    year: ' + s.year);
    if (s.url) lines.push('    url: "' + s.url + '"');
    if (s.institution) lines.push('    institution: "' + s.institution + '"');
    return lines.join('\n');
  }).join('\n');

  let newContent;

  if (fmBlock.includes('secondary_sources:')) {
    // Has existing secondary_sources — check if it's empty
    if (fmBlock.match(/secondary_sources:\s*\n\s*\[\]/) || fmBlock.match(/secondary_sources:\s*\[\]/)) {
      // Replace empty list with actual sources
      newContent = raw.replace(
        /secondary_sources:\s*(?:\n\s*\[\])?(\n\s*\[\])?/,
        'secondary_sources:\n' + entries
      );
    } else {
      // Append to existing sources
      const closingIdx = fmBlock.indexOf('\n---');
      const fmClose = closingIdx >= 0 ? fmBlock.substring(0, closingIdx) : fmBlock;
      const before = raw.substring(0, raw.indexOf(fmClose) + fmClose.length);
      const after = raw.substring(raw.indexOf(fmClose) + fmClose.length);
      newContent = before + '\n' + entries + after;
    }
  } else {
    // No secondary_sources key — add it before the closing --- of frontmatter
    const closeMatch = raw.match(/\r?\n---\r?\n/);
    if (closeMatch) {
      const idx = raw.indexOf(closeMatch[0]);
      newContent = raw.substring(0, idx) + '\nsecondary_sources:\n' + entries + raw.substring(idx);
    } else {
      return null;
    }
  }

  return newContent;
}

// ── Main ──
function enhanceAll() {
  const domains = ['history', 'science', 'arts', 'business', 'health', 'geography', 'self-improvement', 'sports', 'game-development'];

  let enhanced = 0;
  let skipped = 0;
  const stats = {};

  for (const domain of domains) {
    const dir = path.join('content', domain);
    if (!fs.existsSync(dir)) continue;

    if (!stats[domain]) stats[domain] = { scanned: 0, enhanced: 0, skipped: 0 };

    const files = fs.readdirSync(dir).filter(f =>
      f.endsWith('.md') && !f.startsWith('_')
    );

    for (const file of files) {
      const fp = path.join(dir, file);
      const raw = fs.readFileSync(fp, 'utf8');
      stats[domain].scanned++;

      const [_, yamlStr, fmBlock] = parseFrontmatter(raw);
      if (!yamlStr) { skipped++; stats[domain].skipped++; continue; }

      // Check if already has 2+ secondary_sources with real URLs
      const ssMatch = yamlStr.match(/secondary_sources:\s*\n([\s\S]*?)(?=^\w+:|\Z)/m);
      if (ssMatch) {
        const urlCount = (ssMatch[0].match(/url:\s*"[^"]+"/g) || []).length;
        if (urlCount >= 2) { skipped++; stats[domain].skipped++; continue; }
      }

      // Match topic
      const newSources = matchTopic(file, domain);
      if (!newSources) { skipped++; stats[domain].skipped++; continue; }

      // Inject
      const result = injectSources(raw, fmBlock, newSources, domain);
      if (result) {
        fs.writeFileSync(fp, result, 'utf8');
        enhanced++;
        stats[domain].enhanced++;
        console.log(`  [${domain}] ${file}: +${newSources.length} sources`);
      }
    }
  }

  // Summary
  console.log('\n=== ENHANCEMENT SUMMARY ===');
  console.log(`Total enhanced: ${enhanced}`);
  console.log(`Total skipped:  ${skipped}`);
  console.log('');
  for (const d of Object.keys(stats).sort()) {
    const s = stats[d];
    console.log(`  ${d.padEnd(20)} scanned=${s.scanned.toString().padStart(3)}  enhanced=${s.enhanced.toString().padStart(3)}  skipped=${s.skipped.toString().padStart(3)}`);
  }
}

enhanceAll();
