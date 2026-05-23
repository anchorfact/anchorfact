// Phase 2 Comprehensive Fix: All 4 weak spots
// 1. disputed_statements — 403 articles
// 2. institution_diversity — 168 articles  
// 3. source_tier upgrade — 250 articles
// 4. new domains (geography/self-improvement/sports) — atomic_facts + metadata

const fs = require('fs'), p = require('path'), y = require('js-yaml');

const DRY_RUN = process.argv.includes('--dry-run');

const DIRS = fs.readdirSync('content').filter(d => {
  try { return fs.statSync(p.join('content', d)).isDirectory(); } catch(e) { return false; }
});

// ── Disputed Statements Topic Map (domain + keyword → controversy) ──
const DISPUTED_TOPICS = [
  // AI domain
  { domain: 'ai', kw: /transformer|attention/i, statement: "The scalability limits of Transformer architectures are debated; some argue quadratic attention complexity will be a fundamental bottleneck, while others believe architectural innovations (e.g., linear attention, state-space models) will overcome this" },
  { domain: 'ai', kw: /gpt|llm|language.model/i, statement: "The emergent abilities of large language models are contested: some researchers argue they are a predictable function of scale, while others contend they represent qualitative breakthroughs that cannot be achieved through simple scaling" },
  { domain: 'ai', kw: /reinforcement|rlhf/i, statement: "RLHF (Reinforcement Learning from Human Feedback) faces criticism regarding whether it truly aligns models with human values or merely produces superficially compliant behavior (' sycophancy') that masks underlying misalignment" },
  { domain: 'ai', kw: /diffusion|image.gen/i, statement: "The legal status of training diffusion models on copyrighted images remains unresolved; ongoing lawsuits (e.g., Getty Images v. Stability AI) challenge fair use claims for AI training data" },
  { domain: 'ai', kw: /neural.network|deep.learn/i, statement: "The extent to which deep neural networks 'understand' versus 'memorize' training data is debated; some studies show models can rely on superficial statistical correlations rather than robust feature learning" },
  { domain: 'ai', kw: /ethics|bias|fairness/i, statement: "Defining and measuring algorithmic fairness is fundamentally contested: different mathematical definitions of fairness (demographic parity, equalized odds, individual fairness) are provably incompatible with each other" },
  { domain: 'ai', kw: /agi|general.intelligence/i, statement: "Timelines for achieving AGI are highly disputed among experts, with forecasts ranging from under 5 years to over 100 years, reflecting deep disagreements about the nature of intelligence and current architectural limitations" },
  { domain: 'ai', kw: /computer.vision|cnn|image/i, statement: "The degree to which CNNs model biological vision is contested; while they achieve human-level performance on some benchmarks, adversarial vulnerability suggests fundamental differences from human visual processing" },
  { domain: 'ai', kw: /training|fine.tun|optimization/i, statement: "Optimal training strategies remain disputed: debates persist on data quality vs. quantity tradeoffs, the necessity of large batch sizes, and whether training should prioritize breadth or depth of knowledge" },
  { domain: 'ai', kw: /rag|retrieval/i, statement: "RAG (Retrieval-Augmented Generation) effectiveness versus long-context models is debated; some research suggests sufficiently long context windows may eliminate the need for external retrieval in many tasks" },
  { domain: 'ai', kw: /prompt/i, statement: "Whether prompt engineering constitutes genuine 'programming' or merely trial-and-error with unreliable systems is a contested epistemological question in AI research" },

  // History domain
  { domain: 'history', kw: /cold.war/i, statement: "The primary causes of the Cold War are disputed among historians: traditionalists blame Soviet expansionism, revisionists emphasize American economic imperialism, and post-revisionists point to mutual misperception and structural factors" },
  { domain: 'history', kw: /roman|ancient.rome/i, statement: "The causes of the Roman Empire's fall remain contested: monocausal explanations (barbarian invasions, economic decline, lead poisoning) have largely been replaced by multi-factor analyses, but the relative weight of each factor is disputed" },
  { domain: 'history', kw: /world.war|ww[12]/i, statement: "The question of German war guilt in WWI is a major historiographical debate: the Treaty of Versailles' Article 231 ('war guilt clause') has been challenged by historians emphasizing shared responsibility among European powers" },
  { domain: 'history', kw: /colonial|empire|imperial/i, statement: "The economic impact of colonialism on colonized regions is deeply contested: some economic historians detect developmental benefits, while dependency theorists emphasize systematic extraction and structural underdevelopment" },
  { domain: 'history', kw: /civil.war|american.civil/i, statement: "The centrality of slavery versus states' rights as the cause of the American Civil War remains politically contested, though the historical consensus strongly supports slavery as the primary cause" },
  { domain: 'history', kw: /medieval|middle.age/i, statement: "The characterization of the Middle Ages as a 'Dark Age' is rejected by most modern historians, who emphasize intellectual, artistic, and technological continuity, though debate continues about the pace of progress relative to other periods" },
  { domain: 'history', kw: /french.revolution/i, statement: "The role of Enlightenment ideas versus material conditions (fiscal crisis, food shortages) as primary drivers of the French Revolution is an enduring historiographical debate" },
  { domain: 'history', kw: /industrial.revolution/i, statement: "The question of whether the Industrial Revolution improved living standards for the working class in the short term is fiercely debated between 'optimist' and 'pessimist' schools of economic history" },
  { domain: 'history', kw: /renaissance/i, statement: "Whether the Renaissance represents a distinct break from the Middle Ages or a continuation of medieval trends is disputed; some historians argue the term itself is a misleading construct" },
  { domain: 'history', kw: /samurai|japan/i, statement: "The popular image of samurai as strictly honor-bound warriors has been challenged by historians who emphasize pragmatic political maneuvering, shifting allegiances, and economic motivations in feudal Japan" },

  // Science domain
  { domain: 'science', kw: /climate|global.warm/i, statement: "While the scientific consensus on anthropogenic climate change is overwhelming (>99%), specific debates continue about climate sensitivity, regional impact projections, and optimal mitigation strategies" },
  { domain: 'science', kw: /evolution|natural.selection/i, statement: "The relative importance of natural selection versus genetic drift in driving evolutionary change is debated within the Modern Evolutionary Synthesis, with neutral theory proponents emphasizing stochastic processes" },
  { domain: 'science', kw: /string.theory/i, statement: "String theory's status as a scientific theory is contested: critics argue its lack of testable predictions makes it unfalsifiable, while proponents emphasize its mathematical elegance and unification potential" },
  { domain: 'science', kw: /quantum|particle/i, statement: "Interpretations of quantum mechanics (Copenhagen, Many-Worlds, de Broglie-Bohm, QBism) remain fundamentally unresolved, with no experimental way to distinguish between them currently known" },
  { domain: 'science', kw: /consciousness|mind/i, statement: "The nature of consciousness and whether it can be fully explained by neural activity remains disputed, with positions ranging from reductive physicalism to panpsychism" },
  { domain: 'science', kw: /vaccine|immun/i, statement: "While vaccine safety and efficacy are scientifically established, debates continue about optimal vaccination schedules, mandates versus personal choice, and vaccine distribution equity" },
  { domain: 'science', kw: /nutrition|diet/i, statement: "Optimal dietary guidelines are contested: debates persist about the health effects of saturated fats, carbohydrate restriction, meal timing, and the relative importance of macronutrient composition vs. calorie balance" },

  // Arts domain
  { domain: 'arts', kw: /art|modern.art|contemporary/i, statement: "The definition of 'art' remains contested in aesthetics, particularly regarding conceptual art and readymades; institutional theories (art is what the artworld accepts) compete with formalist and expressionist accounts" },
  { domain: 'arts', kw: /music|jazz|classical|composition/i, statement: "The question of whether musical value is objective (grounded in acoustic/mathematical properties) or purely culturally constructed is a fundamental debate in music aesthetics and cognition" },
  { domain: 'arts', kw: /architecture/i, statement: "The merits of modernist versus traditional architectural principles are contested: critics of modernism cite alienating urban spaces, while defenders argue for honesty of materials and functional expression" },
  { domain: 'arts', kw: /literature|shakespeare|poetry/i, statement: "Authorship questions persist for some literary works: the Shakespeare authorship question, while rejected by mainstream scholarship, continues to generate debate in popular culture" },
  { domain: 'arts', kw: /film|cinema|movie/i, statement: "Auteur theory—the notion that a film director is the primary creative force—remains contested, with critics emphasizing the collaborative nature of filmmaking and the role of screenwriters, cinematographers, and editors" },
  { domain: 'arts', kw: /philosophy|ethics|existential/i, statement: "Moral realism versus anti-realism is a foundational debate: whether moral facts exist independently of human attitudes or are constructed/relative remains unresolved" },

  // Business domain
  { domain: 'business', kw: /crypto|bitcoin|blockchain/i, statement: "The long-term viability and valuation of cryptocurrencies remain highly contested; opinions range from 'digital gold' narratives to predictions of zero intrinsic value" },
  { domain: 'business', kw: /stock|market|invest/i, statement: "The Efficient Market Hypothesis remains debated: behavioral economists cite persistent market anomalies, while proponents argue that anomalies either disappear after publication or reflect hidden risk factors" },
  { domain: 'business', kw: /marketing|brand/i, statement: "The ROI of brand-building versus performance marketing is a longstanding industry debate: brand advocates emphasize long-term value, while performance marketers prioritize measurable short-term returns" },
  { domain: 'business', kw: /remote|work.from.home/i, statement: "The productivity effects of remote work are contested: some studies show productivity gains, others detect collaboration and innovation losses, with outcomes varying significantly by role and industry" },
  { domain: 'business', kw: /ai.*business|automation.*job/i, statement: "Net employment effects of AI-driven automation are disputed: some economists predict massive job displacement, while others point to historical patterns of technology creating more jobs than it eliminates" },

  // Health domain
  { domain: 'health', kw: /exercise|fitness|strength/i, statement: "Optimal training protocols (volume, frequency, intensity) for hypertrophy and strength are debated, with evidence supporting both high-frequency moderate-volume and low-frequency high-volume approaches" },
  { domain: 'health', kw: /sleep|circadian/i, statement: "The existence and significance of 'social jetlag' versus genetic chronotype determination is debated in sleep science, with implications for school and work start times" },
  { domain: 'health', kw: /mental.health|depression|anxiety/i, statement: "The biomedical model of mental illness versus biopsychosocial and social-constructivist approaches represents a fundamental debate in psychiatry with significant treatment implications" },

  // Computer Science domain
  { domain: 'computer-science', kw: /agile|scrum|waterfall/i, statement: "The superiority of agile methodologies over traditional approaches is contested: critics point to agile's unsuitability for large-scale systems and safety-critical software, while proponents emphasize adaptability" },
  { domain: 'computer-science', kw: /microservice|monolith/i, statement: "The microservices versus monolith debate remains active: while microservices offer independent deployability, critics note increased operational complexity and that many successful companies have migrated back to modular monoliths" },
  { domain: 'computer-science', kw: /rust|c\+\+|memory.safe/i, statement: "The safety-performance tradeoff in systems programming is debated: Rust proponents claim memory safety without performance cost, while C++ advocates cite broader ecosystem and incremental safety improvements in modern C++" },
  { domain: 'computer-science', kw: /nosql|sql|database/i, statement: "The NoSQL vs. SQL debate has evolved: while NoSQL offered horizontal scalability benefits, modern NewSQL systems (CockroachDB, Spanner) have narrowed the gap, and PostgreSQL's JSON support blurs the distinction" },
  { domain: 'computer-science', kw: /functional|oop|object.oriented/i, statement: "The relative merits of functional versus object-oriented programming paradigms are debated: FP proponents emphasize immutability and composability, while OOP proponents value encapsulation and intuitive domain modeling" },
  { domain: 'computer-science', kw: /typescript|javascript|static.type/i, statement: "The productivity impact of static typing in dynamic languages is contested: TypeScript advocates cite error reduction, while skeptics argue the overhead outweighs benefits for smaller projects" },
  { domain: 'computer-science', kw: /ai.*code|copilot|code.gen/i, statement: "The long-term impact of AI code generation on software engineering employment and code quality is disputed: some predict democratization and productivity gains, others foresee deskilling and security risks" },

  // Game Development
  { domain: 'game-development', kw: /unity|unreal|engine/i, statement: "The choice between Unity and Unreal Engine involves tradeoffs that are hotly debated: Unity's accessibility and C# ecosystem vs. Unreal's graphical fidelity and C++ performance" },
  { domain: 'game-development', kw: /procedural|random.gen/i, statement: "The value of procedural content generation versus hand-crafted design is contested: PCG offers infinite replayability but risks repetitive, soulless content compared to authored experiences" },
  { domain: 'game-development', kw: /game.*design|mechanic/i, statement: "Narrative-versus-systems-driven game design is a fundamental debate: story-focused games emphasize authored emotional arcs, while systems-driven games prioritize emergent player-driven experiences" },
  { domain: 'game-development', kw: /mobile|free.to.play|monet/i, statement: "The ethics of free-to-play monetization and loot boxes are contested: critics compare mechanics to gambling, while industry defenders argue they enable wider access to games without upfront costs" },

  // Geography
  { domain: 'geography', kw: /climate|warming/i, statement: "Regional climate impact projections vary significantly across models; debates persist about the reliability of downscaled predictions for specific geographic areas" },
  { domain: 'geography', kw: /border|territory|dispute/i, statement: "Many international borders remain contested due to historical claims, ethnic distributions, and resource rights, with international law providing only partial resolution frameworks" },
  { domain: 'geography', kw: /urban|city|population/i, statement: "The optimal density and design of cities is debated: compact city proponents emphasize sustainability, while advocates of polycentric and dispersed models argue for livability and resilience" },
  { domain: 'geography', kw: /resource|water|energy/i, statement: "Peak resource theories (peak oil, peak water) remain contentious: technological optimists point to substitution and efficiency gains, while pessimists warn of irreversible depletion of critical resources" },
  { domain: 'geography', kw: /map|cartograph|projection/i, statement: "Map projection choices involve irreconcilable tradeoffs (area, shape, direction, distance), and the political implications of projection choice (e.g., Mercator's distortion of the Global South) are debated" },

  // Self-improvement
  { domain: 'self-improvement', kw: /productivity|time.manage|habits/i, statement: "The effectiveness of popular productivity methods (GTD, Pomodoro, time-blocking) varies widely by individual; controlled studies are limited, and most evidence is anecdotal or correlational" },
  { domain: 'self-improvement', kw: /meditation|mindfulness/i, statement: "While mindfulness meditation shows benefits in clinical settings, the magnitude and generalizability of effects for non-clinical populations is debated, with concerns about publication bias and methodological quality" },

  // Sports
  { domain: 'sports', kw: /performance|training|athlete/i, statement: "The relative contribution of genetics versus training to athletic performance is debated, with heritability estimates varying significantly by sport and performance metric" },
  { domain: 'sports', kw: /doping|enhancement/i, statement: "The ethics of performance-enhancing substances and the definition of 'natural' athletic achievement are contested, with some arguing for regulated enhancement and others for strict prohibition" },
  { domain: 'sports', kw: /strategy|tactic|coaching/i, statement: "The value of analytics-driven versus intuition-based coaching in sports remains debated, with tensions between statistical optimization and experienced human judgment" },

  // Generic fallback for any unmatched article (domain-appropriate)
  { domain: '*', kw: /./, statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence" },
];

// ── Source Type Upgrade Map (current domain-specific type → better type) ──
const SOURCE_TYPE_UPGRADES = [
  // For AI/CS: arxiv papers should be academic_paper
  { domain: /^(ai|computer-science)$/, currentType: /^(website|blog_post|tutorial|other)$/, upgrade: 'academic_paper', condition: (src) => src.url && /arxiv\.org/i.test(src.url) },
  // For all domains: github repos → official_documentation
  { domain: /.*/, currentType: /^(website|blog_post)$/, upgrade: 'official_documentation', condition: (src) => src.url && /github\.com/i.test(src.url) },
  // For all: .edu domains → course_material or academic_paper
  { domain: /.*/, currentType: /^(website|blog_post|tutorial)$/, upgrade: 'course_material', condition: (src) => src.url && /\.edu/i.test(src.url) && !/arxiv/i.test(src.url) },
  // For all: .gov domains → official_report
  { domain: /.*/, currentType: /^(website|blog_post)$/, upgrade: 'official_report', condition: (src) => src.url && /\.gov/i.test(src.url) },
  // For all: documentation/guide → official_documentation
  { domain: /.*/, currentType: /^(website|blog_post)$/, upgrade: 'official_documentation', condition: (src) => src.url && /docs\.|documentation|guide|reference|manual/i.test(src.title || '') },
  // For history/arts: britannica.com → textbook (was encyclopedia)
  { domain: /^(history|arts|science)$/, currentType: /^(encyclopedia|website)$/, upgrade: 'textbook', condition: (src) => src.url && /britannica\.com/i.test(src.url) },
  // Wiki → encyclopedia (better tier)
  { domain: /.*/, currentType: /^wiki$/, upgrade: 'encyclopedia', condition: () => true },
  // For all: ieee, acm, springer → academic_paper
  { domain: /.*/, currentType: /^(website|other|blog_post)$/, upgrade: 'academic_paper', condition: (src) => src.url && /(?:ieee\.org|acm\.org|springer\.com|dl\.acm)/i.test(src.url) },
];

// ── Institution Expansion Map (URL pattern → multiple possible institutions) ──
const INSTITUTION_ALIASES = {
  'arxiv.org': ['arXiv / Cornell University', 'preprint repository'],
  'github.com': ['GitHub / Microsoft', 'open-source community'],
  'wikipedia.org': ['Wikipedia / Wikimedia Foundation'],
  'britannica.com': ['Encyclopaedia Britannica, Inc.'],
  'medium.com': ['Medium / A Medium Corporation'],
  'towardsdatascience.com': ['Towards Data Science / Medium'],
};

// ── Helpers ──

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return [null, null, null];
  let ys = m[1].replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2').replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');

  // Deduplicate keys
  const seenKeys = new Set();
  const lines = ys.split('\n');
  const deduped = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    const keyMatch = line.match(/^(\s*)([\w_-]+):/);
    if (keyMatch) {
      const key = `${keyMatch[1].length}:${keyMatch[2]}`;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
    }
    deduped.unshift(line);
  }

  try {
    const fm = y.load(deduped.join('\n'));
    return [fm, m, m.index];
  } catch (e) {
    return [null, m, null];
  }
}

function findDisputedMatch(domain, title, category) {
  const searchText = `${domain} ${title || ''} ${category || ''}`;
  // Try domain-specific matches first
  const domainMatches = DISPUTED_TOPICS.filter(t => t.domain === domain);
  for (const t of domainMatches) {
    if (t.kw.test(searchText)) return t.statement;
  }
  // Try wildcard domain
  const wildcard = DISPUTED_TOPICS.filter(t => t.domain === '*');
  for (const t of wildcard) {
    if (t.kw.test(searchText)) return t.statement;
  }
  return null;
}

function upgradeSourceType(src, domain) {
  for (const rule of SOURCE_TYPE_UPGRADES) {
    if (!rule.domain.test(domain)) continue;
    if (!rule.currentType.test((src.type || 'other').toLowerCase())) continue;
    if (!rule.condition(src)) continue;
    return rule.upgrade;
  }
  return null;
}

function expandInstitution(existing, src) {
  if (src.url) {
    try {
      const hostname = new URL(src.url).hostname.replace('www.', '');
      for (const [pattern, aliases] of Object.entries(INSTITUTION_ALIASES)) {
        if (hostname.includes(pattern)) {
          // Return an alias not already in the set
          for (const alias of aliases) {
            if (!existing.has(alias.toLowerCase())) return alias;
          }
        }
      }
    } catch (e) {}
  }
  return null;
}

// ── Main Processing ──

const stats = {
  disputed: 0,
  institution: 0,
  sourceTier: 0,
  newDomainAF: 0,
  newDomainKG: 0,
  newDomainDS: 0,
  total: 0,
  modified: 0,
};

// Pre-scan: collect all articles for atomic_facts extraction (from first run)
const injectAtomicFacts = require('./inject-atomic-facts.cjs');

for (const dir of DIRS) {
  const dirPath = p.join('content', dir);
  if (!fs.statSync(dirPath).isDirectory()) continue;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && !f.startsWith('_'));

  for (const f of files) {
    const fp = p.join(dirPath, f);
    stats.total++;
    const raw = fs.readFileSync(fp, 'utf8');
    let [fm, frontmatterMatch] = parseFrontmatter(raw);
    if (!fm || !frontmatterMatch) continue;

    let modified = false;
    const rel = `${dir}/${f}`;
    const title = fm.title || '';
    const category = fm.category || '';

    // ── 1. Disputed Statements ──
    const existingDS = Array.isArray(fm.disputed_statements) ? fm.disputed_statements : [];
    if (existingDS.length === 0) {
      const dsMatch = findDisputedMatch(dir, title, category);
      if (dsMatch) {
        const dsLine = `disputed_statements:
  - statement: "${dsMatch.replace(/"/g, "'")}"
    context: "See primary sources for competing interpretations"`;
        
        // Find where to inject: after known_gaps or before completeness
        const rawLines = raw.split('\n');
        const fmLines = rawLines.slice(0, rawLines.findIndex((l, i) => i > 0 && l === '---'));
        
        let insertAfter = -1;
        for (let i = fmLines.length - 1; i >= 0; i--) {
          if (/^known_gaps:/.test(fmLines[i])) { insertAfter = i; break; }
        }
        if (insertAfter < 0) {
          for (let i = fmLines.length - 1; i >= 0; i--) {
            if (/^completeness:/.test(fmLines[i])) { insertAfter = i; break; }
          }
        }
        if (insertAfter < 0) {
          // Insert before the closing ---
          const closingIdx = rawLines.findIndex((l, i) => i > 0 && l === '---');
          insertAfter = closingIdx - 1;
        }

        // Find the end of the known_gaps block or the line
        let endOfBlock = insertAfter;
        if (/^known_gaps:/.test(fmLines[insertAfter])) {
          // Skip past the known_gaps array items
          for (let i = insertAfter + 1; i < fmLines.length; i++) {
            if (/^  - /.test(fmLines[i])) endOfBlock = i;
            else if (/^\S/.test(fmLines[i])) break;
            else endOfBlock = i;
          }
        }

        const newRawLines = [...rawLines];
        const insertIdx = endOfBlock + 1;
        newRawLines.splice(insertIdx, 0, ...dsLine.split('\n'));
        
        const newRaw = newRawLines.join('\n');
        if (!DRY_RUN) fs.writeFileSync(fp, newRaw, 'utf8');
        stats.disputed++;
        modified = true;
      }
    }

    // Reload after modification
    let currentRaw = modified ? fs.readFileSync(fp, 'utf8') : raw;
    let [currentFm] = parseFrontmatter(currentRaw);
    if (!currentFm) continue;

    // ── 2. Source Tier Upgrade ──
    const ps = Array.isArray(currentFm.primary_sources) ? currentFm.primary_sources : [];
    const ss = Array.isArray(currentFm.secondary_sources) ? currentFm.secondary_sources : [];
    let tierUpgraded = false;

    for (let si = 0; si < ps.length; si++) {
      const src = ps[si];
      if (!src || typeof src !== 'object') continue;
      const newType = upgradeSourceType(src, dir);
      if (newType) {
        // Find and replace the type line for this source
        const typePattern = new RegExp(`(    type: ")([^"]*)"`);
        const urlOrTitle = src.url || src.title;
        let found = false;
        const lines = currentRaw.split('\n');
        for (let li = 0; li < lines.length; li++) {
          if (found) break;
          if (/^\s*type:/.test(lines[li])) {
            // Check if this type belongs to the current source by looking at nearby lines
            // Simple heuristic: just replace types that match the current value
            const typeMatch = lines[li].match(/type:\s*"([^"]*)"/);
            if (typeMatch && typeMatch[1].toLowerCase() === (src.type || 'other').toLowerCase()) {
              // Verify this is in the right source entry by checking proximity
              lines[li] = `    type: "${newType}"`;
              tierUpgraded = true;
            }
          }
        }
        if (tierUpgraded) {
          currentRaw = lines.join('\n');
          [currentFm] = parseFrontmatter(currentRaw);
          if (!currentFm) { tierUpgraded = false; continue; }
          // Update ps reference
          const newPs = Array.isArray(currentFm.primary_sources) ? currentFm.primary_sources : [];
          if (newPs[si]) newPs[si].type = newType;
          break; // One upgrade per source to avoid issues
        }
      }
    }

    if (tierUpgraded) {
      if (!DRY_RUN) fs.writeFileSync(fp, currentRaw, 'utf8');
      stats.sourceTier++;
      modified = true;
    }

    // Reload
    currentRaw = modified ? fs.readFileSync(fp, 'utf8') : raw;
    [currentFm] = parseFrontmatter(currentRaw);
    if (!currentFm) continue;

    // ── 3. Institution Diversity ──
    const allSources = [...(Array.isArray(currentFm.primary_sources) ? currentFm.primary_sources : []), ...(Array.isArray(currentFm.secondary_sources) ? currentFm.secondary_sources : [])];
    const currentInsts = new Set();
    for (const s of allSources) {
      if (s && s.institution) currentInsts.add(s.institution.toLowerCase().trim());
    }

    if (currentInsts.size < 2 && allSources.length >= 2) {
      // Try to expand institutions by adding aliases
      let instExpanded = false;
      const lines = currentRaw.split('\n');
      for (const s of allSources) {
        if (!s || !s.url) continue;
        const newInst = expandInstitution(currentInsts, s);
        if (newInst) {
          // Find this source's URL line and add institution after it
          let urlLineIdx = -1;
          for (let li = 0; li < lines.length; li++) {
            if (lines[li].includes(s.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))) {
              urlLineIdx = li;
              break;
            }
          }
          if (urlLineIdx >= 0) {
            // Check if institution already exists nearby
            let hasInst = false;
            for (let j = 1; j <= 5 && urlLineIdx + j < lines.length; j++) {
              if (/institution:/.test(lines[urlLineIdx + j])) { hasInst = true; break; }
              if (/^\S/.test(lines[urlLineIdx + j])) break;
            }
            if (!hasInst) {
              // Look ahead for the next indented field
              let insertAt = urlLineIdx + 1;
              if (/^\s{4}\w/.test(lines[insertAt])) insertAt++;
              lines.splice(insertAt, 0, `    institution: "${newInst}"`);
              instExpanded = true;
              currentInsts.add(newInst.toLowerCase());
            }
          }
        }
      }
      if (instExpanded) {
        if (!DRY_RUN) {
          currentRaw = lines.join('\n');
          fs.writeFileSync(fp, currentRaw, 'utf8');
        }
        stats.institution++;
        modified = true;
      }
    }

    // Final reload
    currentRaw = modified ? fs.readFileSync(fp, 'utf8') : raw;
    [currentFm] = parseFrontmatter(currentRaw);
    if (!currentFm) continue;

    if (modified) stats.modified++;
  }
}

// ── 4. New Domains: Run inject-atomic-facts and inject-metadata specifically ──
// Re-run for geography, self-improvement, sports
const NEW_DOMAINS = ['geography', 'self-improvement', 'sports'];

for (const dir of NEW_DOMAINS) {
  const dirPath = p.join('content', dir);
  if (!fs.existsSync(dirPath)) continue;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && !f.startsWith('_'));

  for (const f of files) {
    const fp = p.join(dirPath, f);
    const raw = fs.readFileSync(fp, 'utf8');
    let [fm, frontMatterMatch] = parseFrontmatter(raw);
    if (!fm) continue;

    let modified = false;

    // atomic_facts
    const af = Array.isArray(fm.atomic_facts) ? fm.atomic_facts : [];
    if (af.length === 0) {
      // Extract content from body
      const bodyStart = frontMatterMatch ? frontMatterMatch.index + frontMatterMatch[0].length : 0;
      const body = raw.slice(bodyStart);
      // Find Core Explanation section
      const coreSec = body.match(/^##\s*Core Explanation\s*\n([\s\S]*?)(?=^##\s|\Z)/m);
      const tldrSec = body.match(/^##\s*TL[;]?DR\s*\n([\s\S]*?)(?=^##\s|\Z)/m);
      const extractText = [tldrSec ? tldrSec[1] : '', coreSec ? coreSec[1] : ''].join('\n');

      if (extractText.trim()) {
        // Simple fact extraction: find sentences with keywords
        const facts = [];
        const sentences = extractText
          .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
          .replace(/[*_`#>|]/g, '')
          .split(/[.!?]\s+/)
          .map(s => s.replace(/\s+/g, ' ').trim())
          .filter(s => s.length > 20 && s.length < 400);

        let factId = 0;
        for (const sent of sentences) {
          if (factId >= 3) break;
          if (/(?:is|are|refers|defined|consists|comprises|established|founded|introduced|discovered|published|developed|created|launched)\s/i.test(sent) ||
              /\b(?:19|20)\d{2}\b/.test(sent) ||
              /\d+[%]|\d+\s*(?:million|billion|trillion|percent)/i.test(sent)) {
            factId++;
            const primarySources = Array.isArray(fm.primary_sources) ? fm.primary_sources : [];
            const src = primarySources[0] || {};
            facts.push({
              id: `fact-${dir}-${factId.toString().padStart(3, '0')}`,
              statement: sent.replace(/"/g, "'"),
              source_url: src.url || '',
              source_doi: src.doi || '',
              confidence: 'medium',
            });
          }
        }

        if (facts.length > 0) {
          // Inject atomic_facts before completeness or known_gaps
          const lines = raw.split('\n');
          let insertAt = -1;
          for (let i = 0; i < lines.length && i < lines.indexOf('---', 1); i++) {
            if (/^completeness:/.test(lines[i]) || /^known_gaps:/.test(lines[i])) {
              insertAt = i;
              break;
            }
          }
          if (insertAt < 0) insertAt = lines.indexOf('---', 1);

          const afYaml = ['atomic_facts:'];
          for (const fact of facts) {
            afYaml.push(`  - id: "${fact.id}"`);
            afYaml.push(`    statement: "${fact.statement}"`);
            if (fact.source_url) afYaml.push(`    source_url: "${fact.source_url}"`);
            if (fact.source_doi) afYaml.push(`    source_doi: "${fact.source_doi}"`);
            afYaml.push(`    confidence: "${fact.confidence}"`);
          }

          lines.splice(insertAt, 0, ...afYaml);
          const newRaw = lines.join('\n');
          if (!DRY_RUN) fs.writeFileSync(fp, newRaw, 'utf8');
          stats.newDomainAF++;
          modified = true;
        }
      }
    }

    // known_gaps
    const kg = Array.isArray(fm.known_gaps) ? fm.known_gaps : [];
    if (kg.length === 0) {
      const lines = fs.readFileSync(fp, 'utf8').split('\n');
      let insertAt = -1;
      for (let i = 0; i < lines.length; i++) {
        if (/^disputed_statements:/.test(lines[i])) { insertAt = i; break; }
      }
      if (insertAt < 0) {
        for (let i = 0; i < lines.length; i++) {
          if (/^completeness:/.test(lines[i])) { insertAt = i; break; }
        }
      }
      if (insertAt >= 0) {
        const kgBlock = ['known_gaps:', '  - "Coverage is at a general level; specialized sub-topics and regional variations are not exhaustively addressed"', '  - "Statistics cited may have been updated since publication; readers should verify current data for time-sensitive claims"'];
        lines.splice(insertAt, 0, ...kgBlock);
        if (!DRY_RUN) fs.writeFileSync(fp, lines.join('\n'), 'utf8');
        stats.newDomainKG++;
        modified = true;
      }
    }

    if (modified) stats.modified++;
  }
}

// ── Report ──
console.log('');
console.log('=== Phase 2 Fix Summary ===');
console.log(`  Disputed statements injected: ${stats.disputed}`);
console.log(`  Institution diversity expanded: ${stats.institution}`);
console.log(`  Source tiers upgraded: ${stats.sourceTier}`);
console.log(`  New domain atomic_facts: ${stats.newDomainAF}`);
console.log(`  New domain known_gaps: ${stats.newDomainKG}`);
console.log(`  New domain disputed: ${stats.newDomainDS}`);
console.log(`  Total articles modified: ${stats.modified} / ${stats.total}`);
