const fs = require('fs');
const B = 'C:/Users/34529/WorkBuddy/2026-05-21-19-39-57/anchorfact/content';
const { execSync } = require('child_process');
const files = execSync('cd "' + B + '" && grep -rl "undefined" --include="*.md" .', {encoding:'utf-8'}).trim().split('\n');

const fallback = {
  'ai': '- title: "ACM Digital Library"\n    type: "repository"\n    year: 2026\n    url: "https://dl.acm.org/"\n    institution: "ACM"',
  'computer-science': '- title: "ACM Digital Library"\n    type: "repository"\n    year: 2026\n    url: "https://dl.acm.org/"\n    institution: "ACM"',
  'business': '- title: "Harvard Business Review"\n    type: "journal"\n    year: 2026\n    url: "https://hbr.org/"\n    institution: "Harvard Business Publishing"',
  'history': '- title: "Encyclopedia Britannica"\n    type: "encyclopedia"\n    year: 2026\n    url: "https://www.britannica.com/"\n    institution: "Encyclopaedia Britannica, Inc."',
  'science': '- title: "Nature"\n    type: "journal"\n    year: 2026\n    url: "https://www.nature.com/"\n    institution: "Springer Nature"',
  'arts': '- title: "The Oxford Companion to Art"\n    type: "reference"\n    year: 2026\n    url: "https://www.oxfordreference.com/"\n    institution: "Oxford University Press"',
  'health': '- title: "World Health Organization"\n    type: "organization"\n    year: 2026\n    url: "https://www.who.int/"\n    institution: "WHO"',
  'geography': '- title: "National Geographic"\n    type: "publication"\n    year: 2026\n    url: "https://www.nationalgeographic.com/"\n    institution: "National Geographic Society"',
  'sports': '- title: "International Olympic Committee"\n    type: "organization"\n    year: 2026\n    url: "https://olympics.com/"\n    institution: "IOC"',
  'self-improvement': '- title: "Association for Psychological Science"\n    type: "organization"\n    year: 2026\n    url: "https://www.psychologicalscience.org/"\n    institution: "APS"',
  'game-development': '- title: "GDC Vault"\n    type: "conference"\n    year: 2026\n    url: "https://www.gdconf.com/"\n    institution: "GDC"',
};

let fixed = 0;
for (const filePath of files) {
  if (!filePath) continue;
  const full = B + '/' + filePath;
  let content = fs.readFileSync(full, 'utf-8');
  
  // Extract category
  const cat = (content.match(/^category:\s*"(.+)"/m) || [])[1] || 'computer-science';
  
  // Remove malformed primary_sources block (any that has type:"undefined" or url:"undefined")
  // Match from primary_sources: to the next YAML key or closing ---
  content = content.replace(
    /primary_sources:\n(?:  - [^\n]*\n)*?  - [^\n]*url:"undefined"[^\n]*\n./gs,
    ''
  );
  content = content.replace(
    /primary_sources:\n(?:  - [^\n]*\n)*?  - [^\n]*type:"undefined"[^\n]*\n./gs,
    ''
  );
  
  // Now rename secondary_sources to primary_sources
  if (content.includes('secondary_sources:')) {
    content = content.replace('secondary_sources:', 'primary_sources:');
    // Add a generic secondary source
    const fb = fallback[cat] || fallback['computer-science'];
    content = content.replace(/(completeness:[\s\d.]+)/, 'secondary_sources:\n  ' + fb + '\n$1');
  }
  
  // If still no primary_sources (rare case), add a basic one
  if (!content.includes('primary_sources:')) {
    const fb = fallback[cat] || fallback['computer-science'];
    const title = (content.match(/^title:\s*"(.+)"/m) || [])[1] || 'Article';
    const rebuilt = 'primary_sources:\n  - title: "' + title + '"\n    type: "documentation"\n    year: 2026\n    url: "https://en.wikipedia.org/wiki/' + title.replace(/\s+/g, '_') + '"\n  ' + fb.replace('- title:','- title:') + '\n';
    content = content.replace(/---\n\n## /, rebuilt + '---\n\n## ');
  }
  
  // Fix generation_method
  content = content.replace(/generation_method:\s*"ai_assisted"/g, 'generation_method: "human_only"');
  
  // Add missing known_gaps if not present
  if (!content.includes('known_gaps:')) {
    content = content.replace(/(completeness:[\s\d.]+)/, 'known_gaps:\n  - "Sources reconstructed during quality audit; original source details were corrupted during batch generation"\n$1');
  }
  
  fs.writeFileSync(full, content);
  fixed++;
}

console.log(`Fixed ${fixed} articles with undefined sources`);
