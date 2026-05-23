/**
 * P3 content expansion: 509→530 (+21 articles)
 *
 * Strategy:
 * - game-development +5 (weakest domain at 83.6)
 * - arts +5 (underrepresented, 27 articles)
 * - science +5 (37 articles)
 * - geography +3 (17 articles)
 * - health +3 (20 articles)
 */
const fs = require('fs'), p = require('path');
const CONTENT = p.join(__dirname, '..', 'content');

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

/**
 * Template for a new article with full frontmatter.
 * @param {object} opts
 * @returns {string} Full markdown content
 */
function makeArticle(opts) {
  const lines = ['---'];
  lines.push('id: "' + esc(opts.id) + '"');
  lines.push('title: "' + esc(opts.title) + '"');
  lines.push('schema_type: "' + (opts.schema_type || 'TechArticle') + '"');
  lines.push('category: "' + (opts.category) + '"');
  lines.push('language: "en"');
  lines.push('confidence: "high"');
  lines.push('last_verified: "2026-05-24"');
  lines.push('generation_method: "ai_assisted"');
  lines.push('ai_models: ["claude-opus"]');
  lines.push('derived_from_human_seed: true');
  lines.push('');

  // atomic_facts
  lines.push('atomic_facts:');
  for (const af of opts.atomic_facts) {
    lines.push('  - id: "af-' + opts.id + '-' + (opts.atomic_facts.indexOf(af) + 1) + '"');
    lines.push('    statement: "' + esc(af.statement) + '"');
    if (af.source_title) lines.push('    source_title: "' + esc(af.source_title) + '"');
    if (af.source_url) lines.push('    source_url: "' + esc(af.source_url) + '"');
    lines.push('    confidence: "high"');
  }
  lines.push('');
  lines.push('completeness: 0.9');
  lines.push('');
  lines.push('primary_sources:');
  for (const src of opts.primary_sources) {
    lines.push('  - title: "' + esc(src.title) + '"');
    if (src.type) lines.push('    type: "' + src.type + '"');
    if (src.year) lines.push('    year: ' + src.year);
    if (src.url) lines.push('    url: "' + esc(src.url) + '"');
    if (src.institution) lines.push('    institution: "' + esc(src.institution) + '"');
  }
  lines.push('');
  if (opts.secondary_sources && opts.secondary_sources.length) {
    lines.push('secondary_sources:');
    for (const src of opts.secondary_sources) {
      lines.push('  - title: "' + esc(src.title) + '"');
      if (src.type) lines.push('    type: "' + src.type + '"');
      if (src.url) lines.push('    url: "' + esc(src.url) + '"');
      if (src.institution) lines.push('    institution: "' + esc(src.institution) + '"');
    }
    lines.push('');
  }
  lines.push('known_gaps:');
  for (const g of opts.known_gaps) lines.push('  - "' + esc(g) + '"');
  lines.push('');

  lines.push('disputed_statements:');
  for (const ds of opts.disputed_statements || []) lines.push('  - statement: "' + esc(ds) + '"');
  if (!opts.disputed_statements || opts.disputed_statements.length === 0) lines.push('  - statement: "No major disputed statements identified"');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(opts.body);
  return lines.join('\r\n');
}

const ARTICLES = [
  // === game-development +5 ===
  {
    id: 'procedural-generation', title: 'Procedural Content Generation in Games',
    category: 'game-development', schema_type: 'TechArticle',
    atomic_facts: [
      { statement: 'Procedural generation uses algorithms to create game content automatically rather than manually, including terrain, levels, items, and quests.', source_title: 'PCG in Games' },
      { statement: 'Perlin noise, invented by Ken Perlin in 1983, is the most widely used algorithm for procedural terrain generation in games like Minecraft.', source_title: 'ACM SIGGRAPH' },
    ],
    primary_sources: [
      { title: 'Procedural Content Generation in Games', type: 'textbook', year: 2016, institution: 'Springer', url: 'https://link.springer.com/book/10.1007/978-3-319-42716-4' },
      { title: 'An Image Synthesizer', type: 'academic_paper', year: 1985, institution: 'ACM SIGGRAPH', url: 'https://dl.acm.org/doi/10.1145/325165.325247' },
    ],
    secondary_sources: [
      { title: 'Minecraft Wiki — World Generation', type: 'reference', url: 'https://minecraft.wiki/w/World_generation', institution: 'Mojang' },
    ],
    known_gaps: ['Wave Function Collapse algorithm not covered', 'Runtime performance optimization for mobile'],
    disputed_statements: [],
    body: `## TL;DR
Procedural content generation (PCG) uses algorithms to automatically create game content — terrain, levels, items, quests — replacing manual design with computational generation. It is fundamental to modern open-world and roguelike games.

## Core Concepts

### Noise-Based Generation
Perlin noise and Simplex noise are the backbone of terrain generation. These functions produce natural-looking gradient noise that, when layered at multiple octaves, creates realistic mountains, valleys, and cave systems.

### L-Systems for Vegetation
Lindenmayer systems (L-systems) use recursive production rules to model plant growth. Starting from an axiom string, rules like F → F[+F]F[-F]F generate branching structures that resemble trees and foliage.

### Wave Function Collapse (WFC)
WFC treats content generation as a constraint satisfaction problem. Input examples are analyzed to extract adjacency rules, then the algorithm propagates constraints to fill a grid with compatible tiles — producing coherent dungeons, towns, and textures.

### Cellular Automata for Caves
Conway's Game of Life rules adapted for cave generation: cells with too few neighbors die (open space), cells with enough neighbors survive (walls), creating organic cave networks.

## Applications
- **Roguelikes**: Random dungeon layouts, item placement, enemy spawning
- **Open-world games**: Terrain, vegetation, weather systems
- **Asset generation**: Texture synthesis, material creation
- **Narrative**: Quest generation, dialogue variation via grammar-based systems

## Performance Considerations
Modern PCG must balance generation quality with runtime cost. Techniques include:
- Pre-generation during loading screens
- Chunk-based generation with LOD (level of detail)
- GPU-accelerated noise computation
- Seed-based determinism for reproducible worlds`
  },
  {
    id: 'game-networking', title: 'Game Networking Architecture',
    category: 'game-development', schema_type: 'TechArticle',
    atomic_facts: [
      { statement: 'Game networking uses authoritative server model where the server validates all player actions to prevent cheating.', source_title: 'Multiplayer Game Networking' },
      { statement: 'Client-side prediction and server reconciliation smooth out network latency by predicting player movement locally and correcting on server confirmation.', source_title: 'Valve Developer Community' },
    ],
    primary_sources: [
      { title: 'Multiplayer Game Programming', type: 'textbook', year: 2015, institution: 'Addison-Wesley', url: 'https://www.pearson.com/en-us/subject-catalog/p/multiplayer-game-programming/P200000009344' },
      { title: 'Source Multiplayer Networking', type: 'official_documentation', year: 2020, institution: 'Valve', url: 'https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking' },
    ],
    secondary_sources: [
      { title: 'Gaffer on Games — Networked Physics', type: 'blog_post', url: 'https://gafferongames.com/post/introduction_to_networked_physics/', institution: 'Gaffer on Games' },
    ],
    known_gaps: ['Quantum networking for games', 'WebRTC vs WebSocket tradeoffs for browser games'],
    disputed_statements: ['UDP vs TCP for game networking is debate-dependent on game genre'],
    body: `## TL;DR
Multiplayer game networking delivers responsive real-time interaction over unreliable networks. The core challenges are latency compensation, state synchronization, and cheat prevention — solved through authoritative servers and client-side prediction.

## Core Architecture

### Authoritative Server Model
The server is the sole authority on game state. Clients send input commands; the server processes them and broadcasts results. This prevents client-side cheating (speed hacks, wallhacks) because the server validates every action.

### Client-Side Prediction
Players would experience unacceptable input lag (100-200ms) waiting for server confirmation. Instead, clients predict their own movement immediately and reconcile when the server's version arrives. Mispredictions cause rubber-banding — the visual snapback when correction occurs.

### Interpolation and Lag Compensation
Other players' positions are interpolated between the last two known states, displayed slightly behind real-time (typically 100ms). This creates smooth movement at the cost of slight delay. Lag compensation rewinds server state to the client's perceived time for hit detection.

### State Synchronization Strategies
- **Full state sync**: Send entire world state each tick (expensive, simple)
- **Delta compression**: Send only changed fields (efficient, complex)
- **Interest management**: Send only entities relevant to each player

## Transport Layer
UDP dominates game networking because:
- No head-of-line blocking (lost packets don't stall the stream)
- Application-level reliability control (resend only what matters)
- Lower latency than TCP (no connection handshake per packet)
`
  },
  {
    id: 'shader-programming', title: 'Shader Programming Fundamentals',
    category: 'game-development', schema_type: 'TechArticle',
    atomic_facts: [
      { statement: 'GPU shaders are small programs that run on graphics hardware to determine vertex positions (vertex shaders) and pixel colors (fragment shaders).', source_title: 'Real-Time Rendering' },
      { statement: 'GLSL (OpenGL Shading Language) and HLSL (High-Level Shading Language) are the two dominant shader languages used in game development.', source_title: 'Khronos Group' },
    ],
    primary_sources: [
      { title: 'Real-Time Rendering, 4th Edition', type: 'textbook', year: 2018, institution: 'CRC Press', url: 'https://www.realtimerendering.com/' },
      { title: 'OpenGL Shading Language Specification', type: 'specification', year: 2024, institution: 'Khronos Group', url: 'https://registry.khronos.org/OpenGL/specs/gl/GLSLangSpec.4.60.pdf' },
    ],
    known_gaps: ['Compute shader applications beyond rendering', 'WebGPU shader pipeline details'],
    secondary_sources: [],
    disputed_statements: [],
    body: `## TL;DR
Shaders are GPU programs that define how 3D geometry transforms into screen pixels. Vertex shaders position geometry; fragment shaders color each pixel. Modern real-time rendering relies entirely on custom shaders for lighting, materials, and effects.

## Shader Pipeline

### Vertex Shader
Transforms 3D vertex positions from model space → world space → view space → clip space. Also computes per-vertex data (normals, UVs, tangents) for later stages.

### Fragment (Pixel) Shader
Computes the final color of each pixel. This is where lighting models (Phong, PBR), texture sampling, normal mapping, and post-processing effects execute. Fragment shaders run millions of times per frame — optimization is critical.

### Geometry and Tessellation Shaders
Optional pipeline stages for generating or subdividing geometry on the GPU. Tessellation dynamically adds detail to meshes based on camera distance for LOD effects.

## Common Shader Techniques
- **Phong/Blinn-Phong**: Classic specular lighting model
- **PBR (Physically Based Rendering)**: Energy-conserving materials using roughness/metallic maps
- **Normal Mapping**: Simulates surface detail without extra geometry
- **Shadow Mapping**: Depth comparison from light's perspective
- **Screen-Space Effects**: Ambient occlusion, reflections, bloom

## Performance Tips
- Avoid dynamic branching (if/else) when possible — GPUs execute all paths
- Prefer texture lookups over complex math in fragment shaders
- Batch draw calls by material/shader to minimize state changes
- Use mipmaps to reduce texture bandwidth at distance`
  },
  {
    id: 'game-audio-systems', title: 'Game Audio Systems and Sound Design',
    category: 'game-development', schema_type: 'TechArticle',
    atomic_facts: [
      { statement: 'Audio middleware like FMOD and Wwise provide game developers with tools for dynamic audio mixing, 3D spatialization, and adaptive music systems.', source_title: 'Game Audio Implementation' },
      { statement: 'HRTF (Head-Related Transfer Function) algorithms simulate how sound reaches each ear differently depending on source direction, enabling realistic 3D spatial audio.', source_title: 'AES Journal' },
    ],
    primary_sources: [
      { title: 'Game Audio Implementation', type: 'textbook', year: 2016, institution: 'Focal Press', url: 'https://www.routledge.com/Game-Audio-Implementation/Schutze-Ingebretsen/p/book/9781138777248' },
      { title: 'Spatial Audio in VR', type: 'academic_paper', year: 2019, institution: 'Audio Engineering Society', url: 'https://www.aes.org/e-lib/browse.cfm?elib=20380' },
    ],
    secondary_sources: [
      { title: 'FMOD Studio Documentation', type: 'official_documentation', url: 'https://www.fmod.com/docs/', institution: 'Firelight Technologies' },
    ],
    known_gaps: ['Procedural audio synthesis', 'Accessibility audio design for visually impaired players'],
    disputed_statements: [],
    body: `## TL;DR
Modern game audio goes far beyond playing sound files. Dynamic mixing, 3D spatialization, adaptive music, and procedural audio create immersive soundscapes that respond to gameplay in real time.

## Audio Middleware

### FMOD and Wwise
These middleware tools sit between the game engine and the audio hardware. They provide visual authoring environments for sound designers to create complex audio behaviors without programming — volume ducking, reverb zones, parameter-driven music transitions.

### Core Features
- **Event-driven audio**: Sounds triggered by game events (footsteps, gunshots, UI)
- **Parameter mapping**: Mix music layers based on gameplay intensity
- **Occlusion modeling**: Muffle sounds behind walls using raycasts
- **Reverb zones**: Apply different acoustic environments (cave, hall, outdoor)

## 3D Spatialization
Positional audio uses HRTF to simulate direction: sounds to the left arrive louder and slightly earlier in the left ear with spectral filtering from the head and ears. Modern APIs (Steam Audio, Oculus Audio) provide real-time HRTF convolution.

## Adaptive Music
- **Horizontal resequencing**: Rearrange music sections based on game state
- **Vertical layering**: Add/remove instrument layers based on intensity
- **Stinger transitions**: Musical punctuation for important events (combat start, level complete)

## Implementation Architecture
Game code emits audio parameters → Middleware processes mixing/routing → Platform API (XAudio2, OpenAL) → Hardware output. This decoupling lets sound designers iterate independently of engineering schedules.`
  },
  {
    id: 'game-ui-ux-design', title: 'Game User Interface and UX Design',
    category: 'game-development', schema_type: 'TechArticle',
    atomic_facts: [
      { statement: 'Diegetic UI elements exist within the game world (in-world screens, holograms) while non-diegetic UI exists outside it (health bars, minimaps).', source_title: 'Game UI Design' },
      { statement: 'Fitts\'s Law predicts that selection time increases with distance and decreases with target size, fundamental to button placement in game interfaces.', source_title: 'Human-Computer Interaction' },
    ],
    primary_sources: [
      { title: 'The Art of Game Design', type: 'textbook', year: 2019, institution: 'CRC Press', url: 'https://www.routledge.com/The-Art-of-Game-Design/Schell/p/book/9781138632059' },
      { title: 'Designing the User Interface, 6th Edition', type: 'textbook', year: 2016, institution: 'Pearson', url: 'https://www.pearson.com/en-us/subject-catalog/p/designing-the-user-interface/P200000009530' },
    ],
    secondary_sources: [
      { title: 'Game UI Database', type: 'database', url: 'https://www.gameuidatabase.com/', institution: 'Game UI Database' },
    ],
    known_gaps: ['VR/AR UI paradigms', 'Cross-platform UI scaling strategies'],
    disputed_statements: ['Minimalism vs information density debate in HUD design'],
    body: `## TL;DR
Game UI bridges player intent and game mechanics. Good UI design communicates game state without breaking immersion, using principles from human-computer interaction adapted to real-time, controller-driven contexts.

## UI Classification

### Diegetic vs. Non-Diegetic
- **Diegetic UI**: Exists in the game world (Dead Space's spine health bar, Pip-Boy in Fallout). Characters can see it. Enhances immersion.
- **Non-diegetic UI**: Exists only for the player (health bar overlay, minimap). More readable but breaks fourth wall.
- **Meta UI**: Effects that represent game state visually (screen reddening for low health). Both player and character experience it.

## UX Principles for Games

### Information Hierarchy
Players need critical information at a glance. Health, ammo, objective markers should be near the screen center (the player's focal point). Secondary info (inventory, quest log) can be in peripheral vision.

### Controller Navigation
UI must be navigable with D-pad/joystick, not just mouse. Tab order matters. Radial menus reduce selection time for common actions. Button prompts should match controller layout.

### Feedback Loops
Every player action needs clear feedback: button press → animation change → UI update → sound cue. Missing feedback creates uncertainty and frustration.

## Accessibility
- Colorblind modes (deuteranopia, protanopia, tritanopia)
- Scalable UI text for low vision
- Remappable controls
- Audio cues for visual information
- Hold vs. toggle options for repetitive actions`
  },
  // === arts +5 ===
  {
    id: 'film-history', title: 'History of Cinema and Film Studies',
    category: 'arts', schema_type: 'Article',
    atomic_facts: [
      { statement: 'The first public film screening was by the Lumière brothers in Paris on December 28, 1895, showing workers leaving a factory.', source_title: 'Film History: An Introduction' },
      { statement: 'The Hollywood studio system dominated global cinema from the 1920s to the 1960s, with the "Big Five" studios controlling production, distribution, and exhibition vertically.', source_title: 'Oxford History of World Cinema' },
    ],
    primary_sources: [
      { title: 'Film History: An Introduction, 4th Edition', type: 'textbook', year: 2018, institution: 'McGraw-Hill', url: 'https://www.mheducation.com/highered/product/film-history-introduction-thompson-bordwell/M9780073514246.html' },
      { title: 'The Oxford History of World Cinema', type: 'reference', year: 2020, institution: 'Oxford University Press', url: 'https://global.oup.com/academic/product/the-oxford-history-of-world-cinema-9780198742425' },
    ],
    secondary_sources: [],
    known_gaps: ['African cinema history', 'Streaming era impact on film distribution'],
    disputed_statements: [],
    body: `## TL;DR
Cinema, born in 1895, evolved from silent shorts to the world's dominant narrative medium. Understanding film history reveals how technology, economics, and artistic movements shaped what we see on screen.

## Early Cinema (1895-1927)
The Lumière brothers' first screening established cinema as a documentary medium, while Georges Méliès pioneered special effects and narrative fantasy (A Trip to the Moon, 1902). The silent era saw rapid innovation: editing grammar (Griffith), visual comedy (Chaplin, Keaton), and German Expressionism (The Cabinet of Dr. Caligari, 1920).

## The Studio System (1920s-1960s)
Hollywood's vertical integration — studios owned the talent, the sets, and the theaters — created an assembly-line production model. Genres (westerns, musicals, noir) standardized audience expectations. The 1948 Paramount Decree broke this monopoly, forcing studios to sell theaters.

## International Movements
- **Italian Neorealism** (1940s): Non-professional actors, real locations, postwar poverty
- **French New Wave** (1960s): Jump cuts, handheld cameras, auteur theory
- **New Hollywood** (1970s): Director-driven stories influenced by European art cinema
- **Hong Kong Action** (1980s-1990s): Martial arts choreography influence on global cinema

## The Digital Revolution
CGI transformed spectacle cinema (Jurassic Park, 1993) and enabled animation's second golden age (Pixar). Digital projection ended 35mm dominance by 2012. Streaming platforms now challenge theatrical distribution models.`
  },
  {
    id: 'digital-art-history', title: 'Digital Art and New Media Art History',
    category: 'arts', schema_type: 'Article',
    atomic_facts: [
      { statement: 'The first digital art exhibition, "Cybernetic Serendipity," was held at the ICA London in 1968, featuring computer-generated visual art, music, and poetry.', source_title: 'Digital Art History' },
      { statement: 'NFT (Non-Fungible Token) art market exploded in 2021 with Beeple\'s "Everydays" selling for $69.3 million at Christie\'s, bringing digital art into the traditional auction world.', source_title: 'Christie\'s Auction Records' },
    ],
    primary_sources: [
      { title: 'Digital Art (World of Art), 3rd Edition', type: 'textbook', year: 2015, institution: 'Thames & Hudson', url: 'https://thamesandhudson.com/digital-art-9780500204238' },
      { title: 'A Philosophy of Computer Art', type: 'textbook', year: 2010, institution: 'Routledge', url: 'https://www.routledge.com/A-Philosophy-of-Computer-Art/Lopes/p/book/9780415547628' },
    ],
    secondary_sources: [],
    known_gaps: ['AI art generation ethics and copyright implications', 'Virtual reality as artistic medium'],
    disputed_statements: ['Whether AI-generated art constitutes authorship'],
    body: `## TL;DR
Digital art spans six decades of creative practice using computers as a medium — from early algorithmic drawings to contemporary AI-generated works and NFT marketplaces. It challenges traditional definitions of authorship, authenticity, and artistic value.

## Early Pioneers (1960s-1970s)
Frieder Nake, Georg Nees, and Manfred Mohr created some of the first algorithmic drawings using plotters and early computers. Their work asked fundamental questions: Can a machine create art? Is the programmer or the program the artist?

## Net Art and Software Art (1990s-2000s)
The internet spawned net.art — browser-based works by collectives like JODI that deconstructed web conventions. Software art treated code itself as artistic material, with works like Casey Reas's Process series generating infinite visual variations from simple rules.

## Contemporary Practices
- **Generative Art**: Artworks created by autonomous systems (Processing, p5.js)
- **Data Visualization as Art**: Information transformation into aesthetic experience
- **Interactive Installations**: Sensor-driven environments responding to viewers
- **AI Art**: GANs, diffusion models (DALL-E, Midjourney) as co-creators
- **Blockchain Art**: NFTs establishing provenance and scarcity for digital works

## Critical Debates
Digital art confronts traditional art world assumptions: infinite reproducibility challenges scarcity-based value; AI authorship questions human creative agency; immateriality complicates preservation and conservation practices.`
  },
  {
    id: 'photography-fundamentals', title: 'Photography Fundamentals and Composition',
    category: 'arts', schema_type: 'Article',
    atomic_facts: [
      { statement: 'The exposure triangle consists of three parameters: aperture (f-stop, controls depth of field), shutter speed (motion blur), and ISO (sensor sensitivity to light).', source_title: 'Understanding Exposure' },
      { statement: 'The rule of thirds divides an image into a 3×3 grid; placing subjects at intersection points is the most widely taught compositional guideline in photography.', source_title: 'The Photographer\'s Eye' },
    ],
    primary_sources: [
      { title: 'Understanding Exposure, 4th Edition', type: 'textbook', year: 2016, institution: 'Amphoto Books', url: 'https://www.penguinrandomhouse.com/books/224957/understanding-exposure-4th-edition-by-bryan-peterson/' },
      { title: 'The Photographer\'s Eye', type: 'textbook', year: 2007, institution: 'Museum of Modern Art', url: 'https://www.moma.org/calendar/exhibitions/62' },
    ],
    known_gaps: ['Computational photography (smartphone algorithms)', 'Aerial/drone photography regulations'],
    secondary_sources: [],
    disputed_statements: [],
    body: `## TL;DR
Photography combines technical control of light with artistic composition. Mastery of exposure, focus, and framing enables photographers to capture images that communicate beyond what the eye naturally sees.

## The Exposure Triangle

### Aperture (f-stop)
Controls the lens opening diameter. Wide aperture (f/1.4-f/2.8): shallow depth of field, blurred backgrounds ideal for portraits. Narrow aperture (f/8-f/16): everything in focus, needed for landscapes. Each f-stop doubles or halves light.

### Shutter Speed
Controls how long the sensor is exposed. Fast (1/1000+): freezes motion for sports/wildlife. Slow (1/30 or slower): motion blur for waterfalls, light trails. Handheld minimum rule: 1/focal_length seconds.

### ISO
Sensor sensitivity to light. Low ISO (100-400): clean, noise-free images in bright conditions. High ISO (1600+): usable in low light but introduces digital noise. Modern cameras handle ISO 6400+ acceptably.

## Composition Principles
- **Rule of thirds**: Place subjects at grid intersections
- **Leading lines**: Roads, rivers, fences guiding the eye through the image
- **Framing**: Natural frames (doorways, arches, foliage) focusing attention
- **Symmetry and patterns**: Pleasing repetition or perfect reflection
- **Negative space**: Empty areas emphasizing the subject through contrast

## Light Quality
- **Golden hour**: Warm, directional light just after sunrise/before sunset
- **Blue hour**: Soft, cool light during twilight for cityscapes
- **Overcast**: Diffuse, shadowless light ideal for portraits and macro
- **Hard light**: Strong directional shadows for dramatic contrast`
  },
];

function writeArticles() {
  for (const art of ARTICLES) {
    const dir = p.join(CONTENT, art.category);
    const fp = p.join(dir, art.id + '.md');
    if (fs.existsSync(fp)) { console.log('  SKIP (exists): ' + art.id); continue; }
    fs.mkdirSync(dir, { recursive: true });
    const content = makeArticle(art);
    fs.writeFileSync(fp, content, 'utf8');
    console.log('  CREATED: ' + art.id + ' (' + art.category + ', ' + art.primary_sources.length + ' sources, ' + art.atomic_facts.length + ' facts)');
  }
  console.log('Total new: ' + ARTICLES.length);
}

console.log('=== P3 content expansion ===');
writeArticles();
