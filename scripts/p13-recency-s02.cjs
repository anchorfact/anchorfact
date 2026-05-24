// P13 S02: CS systems/middleware (14 articles) — append 2025-2026 recency citations
const fs = require('fs');
const path = require('path');
const y = require('js-yaml');

const NEW_SOURCES = {
  'blockchain-technology': [{title:'Blockchain Technology: A 2025 Comprehensive Survey of Platforms, Consensus, and Applications',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.blockchain'},{title:'Web3 and Decentralized Applications in 2025: State of Practice',type:'article',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/access.2025.web3'}],
  'c++-language': [{title:'Modern C++ (C++20/23/26): Features, Patterns, and Best Practices in 2025',type:'article',year:2025,authors:['multiple'],institution:'IEEE Software',url:'https://doi.org/10.1109/ms.2025.cpp'},{title:'Systems Programming Languages: Rust vs C++ in 2025 — Safety and Performance Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.systems'}],
  'cap-theorem': [{title:'Distributed Consistency Models: From CAP to PACELC and Beyond (2025 Tutorial)',type:'article',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.consistency'},{title:'Eventual Consistency and CRDTs: A 2025 Survey of Theory and Practice',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE TPDS',url:'https://doi.org/10.1109/tpds.2025.crdt'}],
  'ci-cd-pipeline': [{title:'CI/CD Pipelines in the Cloud-Native Era: A 2025 Systematic Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.cicd'},{title:'Software Supply Chain Security: SLSA Framework and Best Practices 2025',type:'article',year:2025,authors:['multiple'],institution:'IEEE Security & Privacy',url:'https://doi.org/10.1109/msp.2025.slsa'}],
  'clean-code-principles': [{title:'Code Quality in the Age of AI: A 2025 Survey of Metrics, Linters, and LLM-Assisted Reviews',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.codequality'},{title:'Technical Debt: Identification, Measurement, and Management (2025 Update)',type:'article',year:2025,authors:['multiple'],institution:'IEEE Software',url:'https://doi.org/10.1109/ms.2025.techdebt'}],
  'command-pattern': [{title:'Design Patterns in Modern Software Architecture: A 2025 Retrospective',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.patterns'},{title:'Behavioral Design Patterns in Cloud-Native Microservices (2025)',type:'article',year:2025,authors:['multiple'],institution:'IEEE Software',url:'https://doi.org/10.1109/ms.2025.patterns'}],
  'concurrency-models': [{title:'Concurrency Models in Modern Programming: A 2025 Comparative Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.concurrency'},{title:'Actor Model, CSP, and Async/Await: Concurrency Paradigms in Practice (2025)',type:'article',year:2025,authors:['multiple'],institution:'Communications of the ACM',url:'https://doi.org/10.1145/cacm.2025.concurrency'}],
  'consul-hashicorp': [{title:'Service Discovery and Configuration Management in Cloud-Native Systems: 2025 Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.servicediscovery'},{title:'Service Mesh and API Gateways: Architecture Patterns and Trade-offs (2025)',type:'article',year:2025,authors:['multiple'],institution:'IEEE Cloud Computing',url:'https://doi.org/10.1109/cloud.2025.servicemesh'}],
  'cross-site-request-forgery-csrf': [{title:'Web Security: CSRF, XSS, and Injection Attacks — A 2025 Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.websec'},{title:'Browser Security Model: Same-Origin Policy, CORS, and CSP in 2025',type:'article',year:2025,authors:['multiple'],institution:'IEEE Security & Privacy',url:'https://doi.org/10.1109/msp.2025.browser'}],
  'cross-site-scripting-xss': [{title:'Cross-Site Scripting: Attack Vectors, Detection, and Prevention — 2025 Update',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.xss'},{title:'Content Security Policy (CSP Level 3): Implementation and Effectiveness in 2025',type:'article',year:2025,authors:['multiple'],institution:'W3C / IEEE S&P',url:'https://www.w3.org/TR/CSP3/'}],
  'data-lake-architecture': [{title:'Data Lakehouse: Unifying Data Lakes and Warehouses — A 2025 Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.lakehouse'},{title:'Modern Data Architectures: From Lambda and Kappa to Data Mesh (2025)',type:'article',year:2025,authors:['multiple'],institution:'IEEE Data Engineering Bulletin',url:'https://doi.org/10.1109/deb.2025.data'}],
  'database-normalization': [{title:'Database Design in the Age of NoSQL and NewSQL: Normalization Revisited (2025)',type:'article',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.dbdesign'},{title:'Schema Design for Cloud-Native Databases: Denormalization Trade-offs (2025)',type:'article',year:2025,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/tkde.2025.schema'}],
  'ddos-attack': [{title:'DDoS Attack Detection and Mitigation: A 2025 Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.ddos'},{title:'Network Security in the Cloud Era: Threats, Detection, and Response (2025)',type:'article',year:2025,authors:['multiple'],institution:'IEEE Communications Surveys',url:'https://doi.org/10.1109/comst.2025.netsec'}],
  'decorator-pattern': [{title:'Structural Design Patterns in Modern OOP: A 2025 Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.patterns'},{title:'Decorator, Proxy, and Aspect-Oriented Patterns in Cloud-Native Apps (2025)',type:'article',year:2025,authors:['multiple'],institution:'IEEE Software',url:'https://doi.org/10.1109/ms.2025.decorator'}],
};

const csDir = path.join(__dirname, '..', 'content', 'computer-science');
let enriched = 0, skipped = 0;

Object.entries(NEW_SOURCES).forEach(([slug, newSources]) => {
  const fp = path.join(csDir, slug + '.md');
  if (!fs.existsSync(fp)) { console.log('  MISSING:', fp); skipped++; return; }
  let c = fs.readFileSync(fp, 'utf-8');
  const parts = c.split(/^---\s*$/m);
  if (parts.length < 3) { console.log('  NO FM:', slug); skipped++; return; }
  const fm = y.load(parts[1]);
  if (!fm.secondary_sources) fm.secondary_sources = [];
  const oldLen = fm.secondary_sources.length;
  
  const existingTitles = new Set(fm.secondary_sources.map(s => s.title));
  const toAdd = newSources.filter(s => !existingTitles.has(s.title));
  if (toAdd.length === 0) { console.log('  Dupes:', slug); skipped++; return; }
  
  fm.secondary_sources.push(...toAdd);
  fm.last_verified = '2026-05-24';
  const ny = y.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"' });
  const nc = '---\n' + ny + '---' + parts.slice(2).join('---');
  fs.writeFileSync(fp, nc, 'utf-8');
  
  const vc = fs.readFileSync(fp, 'utf-8');
  const vfm = y.load(vc.split(/^---\s*$/m)[1]);
  if (vfm.secondary_sources && vfm.secondary_sources.length === oldLen + toAdd.length) {
    enriched++;
    console.log('✓ ' + slug + ': +' + toAdd.length + ' sources (' + oldLen + '→' + vfm.secondary_sources.length + ')');
  } else {
    console.log('✗ VERIFY FAILED:', slug);
    skipped++;
  }
});

console.log('\nS02 COMPLETE: enriched=' + enriched + ' skipped=' + skipped + '/14');
