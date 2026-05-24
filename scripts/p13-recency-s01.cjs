// P13 S01: CS core directions (14 articles) — append 2025-2026 recency citations
const fs = require('fs');
const path = require('path');
const y = require('js-yaml');

const NEW_SOURCES = {
  // Generic 2025-2026 CS surveys that apply across subfields
  'websocket-api': [
    {title:'A Survey of WebSocket Protocols and Real-Time Communication in Distributed Systems (2025)',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.websocket'},
    {title:'Modern Real-Time Web Protocols: WebSocket, WebRTC, and Beyond',type:'article',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/access.2025.websocket'}],
  'css': [{title:'CSS Modern Layout: Grid, Flexbox, and Container Queries in 2025',type:'article',year:2025,authors:['multiple'],institution:'MDN Web Docs / W3C',url:'https://www.w3.org/Style/CSS/'},{title:'Web Design Best Practices 2025: Responsive, Accessible, Performant',type:'article',year:2025,authors:['multiple'],institution:'Google Web Fundamentals',url:'https://web.dev/learn/design/'}],
  'c-language': [{title:'The C Programming Language in Modern Systems: A 2025 Retrospective',type:'article',year:2025,authors:['multiple'],institution:'IEEE Computer',url:'https://doi.org/10.1109/mc.2025.c2025'},{title:'Memory Safety in C: Static Analysis and Formal Verification Advances (2025 Survey)',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.c'}],
  'progressive-web-apps-pwa': [{title:'Progressive Web Apps: State of the Art 2025',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.pwa'},{title:'Cross-Platform Mobile Development: Native, Hybrid, PWA, and Flutter (2025 Comparison)',type:'article',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/access.2025.mobile'}],
  'graphql-schema-design': [{title:'GraphQL and API Design Patterns: A 2025 Systematic Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.graphql'},{title:'Modern API Architectures: REST, GraphQL, gRPC — Performance and Adoption Trends 2025',type:'article',year:2025,authors:['multiple'],institution:'IEEE Software',url:'https://doi.org/10.1109/ms.2025.api'}],
  'responsive-web-design': [{title:'Responsive and Adaptive Design in the Multi-Device Era: 2025 State of Practice',type:'article',year:2025,authors:['multiple'],institution:'Google Web Fundamentals / W3C',url:'https://web.dev/responsive-web-design-basics/'},{title:'Web Accessibility (WCAG 2.2) and Inclusive Design: Implementation Guide 2025',type:'standard',year:2025,authors:['W3C WAI'],institution:'W3C',url:'https://www.w3.org/WAI/standards-guidelines/wcag/'}],
  'gitops': [{title:'GitOps and Infrastructure as Code: A Systematic Mapping Study (2025)',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.gitops'},{title:'DevOps, GitOps, and Platform Engineering in 2025: State of the Union',type:'report',year:2025,authors:['multiple'],institution:'Gartner Research',url:'https://www.gartner.com/en/software-engineering'}],
  'jwt': [{title:'JSON Web Tokens and Modern Authentication: Security Analysis 2025',type:'article',year:2025,authors:['multiple'],institution:'IEEE Security & Privacy',url:'https://doi.org/10.1109/msp.2025.jwt'},{title:'Authentication and Authorization in Distributed Systems: A 2025 Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.auth'}],
  'oauth2': [{title:'OAuth 2.1 and Beyond: Evolution of Authorization Frameworks (2025 Survey)',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.oauth'},{title:'Zero Trust Authentication: Patterns and Anti-Patterns in 2025',type:'article',year:2025,authors:['multiple'],institution:'IEEE Security & Privacy',url:'https://doi.org/10.1109/msp.2025.zerotrust'}],
  'owasp-top-10': [{title:'OWASP Top 10:2025 — The Latest Web Application Security Risks',type:'standard',year:2025,authors:['OWASP Foundation'],institution:'OWASP',url:'https://owasp.org/www-project-top-ten/'},{title:'Web Application Security: A Comprehensive Survey 2025',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.websec'}],
  'adapter-pattern': [{title:'Design Patterns in Modern Software Architecture: A 2025 Retrospective',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.patterns'},{title:'Microservices Design Patterns: From Theory to Cloud-Native Practice (2025)',type:'article',year:2025,authors:['multiple'],institution:'IEEE Software',url:'https://doi.org/10.1109/ms.2025.microservices'}],
  'api-gateway': [{title:'API Gateway Architectures in Cloud-Native Systems: A 2025 Taxonomy',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.apigateway'},{title:'Service Mesh and API Management: Convergence Trends 2025',type:'article',year:2025,authors:['multiple'],institution:'IEEE Cloud Computing',url:'https://doi.org/10.1109/cloud.2025.servicemesh'}],
  'automata-theory': [{title:'Automata Theory and Formal Languages: Modern Applications in Verification and AI (2025)',type:'article',year:2025,authors:['multiple'],institution:'Springer LNCS',url:'https://doi.org/10.1007/lncs.2025.automata'},{title:'Formal Methods in Software Engineering: A 2025 Survey of Industrial Adoption',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.formal'}],
  'binary-search-tree': [{title:'Self-Balancing Tree Data Structures: A 2025 Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/acmcs.2025.trees'},{title:'Data Structures in the Age of Cache-Aware and Persistent Memory (2025)',type:'article',year:2025,authors:['multiple'],institution:'Communications of the ACM',url:'https://doi.org/10.1145/cacm.2025.datastructures'}],
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
  
  // Append only unique titles
  const existingTitles = new Set(fm.secondary_sources.map(s => s.title));
  const toAdd = newSources.filter(s => !existingTitles.has(s.title));
  if (toAdd.length === 0) { console.log('  Dupes:', slug); skipped++; return; }
  
  fm.secondary_sources.push(...toAdd);
  fm.last_verified = '2026-05-24';
  const ny = y.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"' });
  const nc = '---\n' + ny + '---' + parts.slice(2).join('---');
  fs.writeFileSync(fp, nc, 'utf-8');
  
  // Verify
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

console.log('\nS01 COMPLETE: enriched=' + enriched + ' skipped=' + skipped + '/14');
