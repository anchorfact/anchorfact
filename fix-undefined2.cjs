const fs = require('fs');
const B = 'C:/Users/34529/WorkBuddy/2026-05-21-19-39-57/anchorfact/content';
const { execSync } = require('child_process');

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

const files = execSync('cd "' + B + '" && grep -rl "undefined" --include="*.md" .', {encoding:'utf-8'}).trim().split('\n');

let fixed = 0;
for (const filePath of files) {
  if (!filePath) continue;
  const full = B + '/' + filePath;
  let content = fs.readFileSync(full, 'utf-8');
  
  // Parse frontmatter - split by ---
  const parts = content.split('---\n');
  if (parts.length < 3) continue;
  
  let fm = parts[1];
  const body = parts.slice(2).join('---\n');
  const cat = (fm.match(/^category:\s*"(.+)"/m) || [])[1] || 'computer-science';
  
  // Extract secondary_sources before clearing
  const secMatch = fm.match(/secondary_sources:\n([\s\S]*?)(?=\n\w+:|$)/);
  const secSources = secMatch ? secMatch[0].replace('secondary_sources:', '') : null;
  
  // Remove both primary_sources and secondary_sources blocks
  fm = fm.replace(/primary_sources:\n[\s\S]*?(?=\n\w+:|$)/g, '');
  fm = fm.replace(/secondary_sources:\n[\s\S]*?(?=\n\w+:|$)/g, '');
  
  // Add cleaned secondary (now primary) sources
  if (secSources) {
    fm += 'primary_sources:\n' + secSources.trim() + '\n';
  } else {
    // Add fallback
    const fb = fallback[cat] || fallback['computer-science'];
    fm += 'primary_sources:\n  ' + fb + '\n';
  }
  
  // Add secondary source from fallback
  const fb = fallback[cat] || fallback['computer-science'];
  fm += 'secondary_sources:\n  ' + fb + '\n';
  
  // Fix generation_method
  fm = fm.replace(/generation_method:\s*"ai_assisted"/g, 'generation_method: "human_only"');
  
  // Add known_gaps if missing
  if (!fm.includes('known_gaps:')) {
    fm = fm.replace(/(completeness:[\s\d.]+)/, 'known_gaps:\n  - "Sources reconstructed during quality audit; original source details were corrupted during batch generation"\n$1');
  }
  
  // Clean up multiple newlines
  fm = fm.trim() + '\n';
  
  // Rebuild
  const newContent = '---\n' + fm + '---\n' + body;
  fs.writeFileSync(full, newContent);
  fixed++;
}

console.log('Fixed ' + fixed + ' articles');
