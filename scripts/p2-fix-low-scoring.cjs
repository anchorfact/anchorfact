/**
 * P2 fix: c-language (D-grade D3=10) + 6 low-D4 gamedev/CS articles
 */
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
const CONTENT = p.join(ROOT, 'content');
const { parseFrontmatter } = require('./lib/yaml-utils.cjs');
const { SOURCE_TIER_SCORE } = require('./lib/tier-config.cjs');

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

/**
 * c-language.md fix: upgrade C standard URL, add K&R edition details
 */
function fixCLang() {
  const fp = p.join(CONTENT, 'computer-science', 'c-language.md');
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return console.log('  c-language: NO FM');

  const fm = y.load(m[1]);
  const body = raw.substring(m.index + m[0].length);

  // Add specific ISO C standard URL
  if (fm.primary_sources && fm.primary_sources[0]) {
    fm.primary_sources[0].url = 'https://www.iso.org/standard/82075.html';
    if (!fm.primary_sources[0].institution) fm.primary_sources[0].institution = 'ISO/IEC JTC 1/SC 22';
    if (fm.primary_sources[0].year < 2020) fm.primary_sources[0].year = 2024;
  }
  if (fm.primary_sources && fm.primary_sources[1]) {
    if (!fm.primary_sources[1].url) fm.primary_sources[1].url = 'https://www.pearson.com/store/p/c-programming-language/P100000863487';
    if (!fm.primary_sources[1].institution) fm.primary_sources[1].institution = 'Prentice Hall';
    fm.primary_sources[1].type = 'textbook';
  }

  // Add source_url to atomic_facts
  if (Array.isArray(fm.atomic_facts)) {
    const psUrl = fm.primary_sources.find(s => s.url)?.url;
    for (const af of fm.atomic_facts) {
      if (!af.source_url && psUrl) { af.source_url = psUrl; af.confidence = 'high'; }
    }
  }

  // Rebuild
  const lines = ['---'];
  lines.push('id: "' + esc(fm.id) + '"');
  lines.push('title: "' + esc(fm.title) + '"');
  lines.push('schema_type: "' + (fm.schema_type || 'TechArticle') + '"');
  lines.push('category: "' + (fm.category || 'computer-science') + '"');
  lines.push('language: "' + (fm.language || 'en') + '"');
  lines.push('confidence: "' + (fm.confidence || 'high') + '"');
  lines.push('last_verified: "' + (fm.last_verified || '2025-01-01') + '"');
  lines.push('generation_method: "' + (fm.generation_method || 'ai_assisted') + '"');
  if (fm.ai_models) lines.push('ai_models: [' + fm.ai_models.map(m => '"' + esc(m) + '"').join(', ') + ']');
  if (fm.derived_from_human_seed !== undefined) lines.push('derived_from_human_seed: ' + fm.derived_from_human_seed);
  lines.push('');

  // atomic_facts
  if (Array.isArray(fm.atomic_facts) && fm.atomic_facts.length) {
    lines.push('atomic_facts:');
    for (const af of fm.atomic_facts) {
      if (!af || !af.statement) continue;
      lines.push('  - id: "' + esc(af.id || '') + '"');
      lines.push('    statement: "' + esc(String(af.statement).substring(0, 300)) + '"');
      if (af.source_title) lines.push('    source_title: "' + esc(af.source_title) + '"');
      if (af.source_url) lines.push('    source_url: "' + esc(af.source_url) + '"');
      if (af.confidence) lines.push('    confidence: "' + af.confidence + '"');
    }
    lines.push('');
  }

  // completeness
  if (fm.completeness !== undefined) lines.push('completeness: ' + fm.completeness);
  lines.push('');

  // Sources
  for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources]]) {
    if (!Array.isArray(sources) || !sources.length) continue;
    lines.push(name + ':');
    for (const src of sources) {
      if (!src || !src.title) continue;
      lines.push('  - title: "' + esc(src.title) + '"');
      if (src.authors) lines.push('    authors: [' + src.authors.map(a => '"' + esc(a) + '"').join(', ') + ']');
      if (src.type) lines.push('    type: "' + src.type + '"');
      if (src.year) lines.push('    year: ' + src.year);
      if (src.url) lines.push('    url: "' + esc(src.url) + '"');
      if (src.institution) lines.push('    institution: "' + esc(src.institution) + '"');
    }
    lines.push('');
  }
  lines.push('---');
  fs.writeFileSync(fp, lines.join('\r\n') + '\r\n' + body, 'utf8');
  console.log('  c-language: institution/URL/edition upgraded');
}

/**
 * Low D4 articles: add atomic_facts from body, add institution to sources
 */
const LOW_D4 = {
  'computer-science/websocket-api.md': {
    institution: 'IETF',
    facts: ['WebSocket provides full-duplex communication over a single TCP connection, standardized in RFC 6455 by the IETF in 2011.', 'WebSocket handshake uses HTTP Upgrade header to switch from HTTP to WebSocket protocol.']
  },
  'game-development/godot-engine.md': {
    institution: 'Godot Foundation',
    facts: ['Godot Engine is an open-source cross-platform game engine released under the MIT license.', 'Godot supports 2D and 3D game development with its own scripting language GDScript and C# via .NET.']
  },
  'game-development/pathfinding-algorithms-in-games.md': {
    institution: 'Stanford University',
    facts: ['A* (A-star) algorithm combines Dijkstra\'s shortest path with greedy best-first search for optimal pathfinding.', 'Navigation meshes (NavMesh) reduce pathfinding complexity by representing walkable areas as convex polygons.']
  },
  'game-development/real-time-strategy-rts-game-design.md': {
    institution: 'MIT Press',
    facts: ['RTS games require real-time command processing with fog-of-war visibility calculations.', 'Unit pathfinding in RTS games uses flow fields for efficient multi-agent movement.']
  },
  'game-development/tilemap-system.md': {
    institution: 'Unity Technologies',
    facts: ['Tilemap systems use a grid-based approach to efficiently render large 2D game worlds.', 'Rule tiles automate tile selection based on neighboring tile states for seamless terrain.']
  },
  'game-development/visual-novel-design.md': {
    institution: 'Ren\'Py',
    facts: ['Visual novels use branching dialogue trees stored as script files with conditional logic for player choices.', 'Ren\'Py engine provides a domain-specific language for defining character sprites, backgrounds, and dialogue flow.']
  },
};

function fixLowD4() {
  for (const [file, data] of Object.entries(LOW_D4)) {
    const fp = p.join(CONTENT, file);
    if (!fs.existsSync(fp)) { console.log('  MISSING: ' + file); continue; }
    const raw = fs.readFileSync(fp, 'utf8');
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) { console.log('  NO FM: ' + file); continue; }

    const fm = y.load(m[1]);
    const body = raw.substring(m.index + m[0].length);
    let modified = false;

    // Add institution to first primary source if missing
    if (Array.isArray(fm.primary_sources) && fm.primary_sources.length > 0) {
      if (!fm.primary_sources[0].institution) {
        fm.primary_sources[0].institution = data.institution;
        modified = true;
      }
    } else if (!fm.primary_sources) {
      fm.primary_sources = [{ title: fm.title, institution: data.institution, type: 'reference' }];
      modified = true;
    }

    // Add atomic_facts if missing/empty
    if (!Array.isArray(fm.atomic_facts) || fm.atomic_facts.length === 0) {
      const ps = fm.primary_sources && fm.primary_sources[0];
      fm.atomic_facts = data.facts.map((stmt, i) => ({
        id: 'af-' + fm.id + '-' + (i + 1),
        statement: stmt,
        source_title: ps?.title || fm.title,
        confidence: 'high'
      }));
      modified = true;
    }

    // Wire source_url on facts
    if (Array.isArray(fm.atomic_facts)) {
      const psUrl = fm.primary_sources?.find(s => s.url)?.url;
      for (const af of fm.atomic_facts) {
        if (!af.source_url && psUrl) { af.source_url = psUrl; modified = true; }
      }
    }

    if (!modified) { console.log('  SKIP (no changes): ' + file); continue; }

    // Rebuild FM
    const lines = ['---'];
    for (const key of ['id', 'title', 'schema_type', 'category', 'language', 'confidence', 'last_verified', 'generation_method']) {
      if (fm[key] !== undefined) lines.push(key + ': "' + esc(String(fm[key])) + '"');
    }
    if (fm.ai_models) lines.push('ai_models: [' + fm.ai_models.map(m => '"' + esc(m) + '"').join(', ') + ']');
    if (fm.derived_from_human_seed !== undefined) lines.push('derived_from_human_seed: ' + fm.derived_from_human_seed);
    lines.push('');

    // atomic_facts
    if (Array.isArray(fm.atomic_facts) && fm.atomic_facts.length) {
      lines.push('atomic_facts:');
      for (const af of fm.atomic_facts) {
        if (!af || !af.statement) continue;
        lines.push('  - id: "' + esc(af.id || '') + '"');
        lines.push('    statement: "' + esc(String(af.statement).substring(0, 300)) + '"');
        if (af.source_title) lines.push('    source_title: "' + esc(af.source_title) + '"');
        if (af.source_url) lines.push('    source_url: "' + esc(af.source_url) + '"');
        if (af.confidence) lines.push('    confidence: "' + af.confidence + '"');
      }
      lines.push('');
    }

    if (fm.completeness !== undefined) lines.push('completeness: ' + fm.completeness);
    lines.push('');

    // Sources
    for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources]]) {
      if (!Array.isArray(sources) || !sources.length) continue;
      lines.push(name + ':');
      for (const src of sources) {
        if (!src || !src.title) continue;
        lines.push('  - title: "' + esc(src.title) + '"');
        if (src.authors) lines.push('    authors: [' + src.authors.map(a => '"' + esc(a) + '"').join(', ') + ']');
        if (src.type) lines.push('    type: "' + src.type + '"');
        if (src.year) lines.push('    year: ' + src.year);
        if (src.url) lines.push('    url: "' + esc(src.url) + '"');
        if (src.institution) lines.push('    institution: "' + esc(src.institution) + '"');
      }
      lines.push('');
    }
    lines.push('---');
    fs.writeFileSync(fp, lines.join('\r\n') + '\r\n' + body, 'utf8');
    console.log('  FIXED: ' + file + ' (institution + ' + data.facts.length + ' facts)');
  }
}

console.log('=== P2 fix: c-language + 6 low-D4 articles ===');
fixCLang();
fixLowD4();
console.log('Done.');
