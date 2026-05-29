#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';
import { pathToFileURL } from 'url';

const ROOT_TEMP_FILES = [
  '.quality-baseline.json',
  'gql.json',
  'stale-sources.json',
  'topics.txt'
];

const SKIP_DIRS = new Set([
  '.git',
  'archive',
  'dist',
  'node_modules'
]);

const TEXT_EXTENSIONS = new Set([
  '.cjs',
  '.js',
  '.json',
  '.md',
  '.pem',
  '.py',
  '.toml',
  '.txt',
  '.yaml',
  '.yml'
]);

const MOJIBAKE_PATTERNS = [
  /\uFFFD/,
  new RegExp([
    '\\u9225',
    '\\u9239',
    '\\u9241',
    '\\u8133',
    '\\u63B3',
    '\\u9C81',
    '\\u864F'
  ].join('|')),
  new RegExp([
    '\\u5BF0\\u5445',
    '\\u5A13\\u544A\\u57BF',
    '\\u93BB\\u6114\\u6C46',
    '\\u9477',
    '\\u93C2\\u56E9\\u73F7'
  ].join('|'))
];

const STALE_METRIC_PATTERNS = [
  /591 public/i,
  /591 public entries/i,
  /Public eligible articles\s*\|\s*591/i,
  /Public articles\s*\|\s*591/i,
  /EXPECTED_PUBLIC_ARTICLES=591/i,
  /588 public/i,
  /588 public entries/i,
  /Public eligible articles\s*\|\s*588/i,
  /Public articles\s*\|\s*588/i,
  /EXPECTED_PUBLIC_ARTICLES=588/i,
  /583 public/i,
  /583 public entries/i,
  /Public eligible articles\s*\|\s*583/i,
  /Public articles\s*\|\s*583/i,
  /EXPECTED_PUBLIC_ARTICLES=583/i,
  /578 public/i,
  /578 public entries/i,
  /Public eligible articles\s*\|\s*578/i,
  /Public articles\s*\|\s*578/i,
  /EXPECTED_PUBLIC_ARTICLES=578/i,
  /573 public/i,
  /573 public entries/i,
  /Public eligible articles\s*\|\s*573/i,
  /Public articles\s*\|\s*573/i,
  /EXPECTED_PUBLIC_ARTICLES=573/i,
  /568 public/i,
  /568 public entries/i,
  /Public eligible articles\s*\|\s*568/i,
  /Public articles\s*\|\s*568/i,
  /EXPECTED_PUBLIC_ARTICLES=568/i,
  /554 public/i,
  /554 public entries/i,
  /Public eligible articles\s*\|\s*554/i,
  /Public articles\s*\|\s*554/i,
  /EXPECTED_PUBLIC_ARTICLES=554/i,
  /555 public/i,
  /555 public entries/i,
  /Public eligible articles\s*\|\s*555/i,
  /Public articles\s*\|\s*555/i,
  /EXPECTED_PUBLIC_ARTICLES=555/i,
  /558 public/i,
  /558 public entries/i,
  /Public eligible articles\s*\|\s*558/i,
  /Public articles\s*\|\s*558/i,
  /EXPECTED_PUBLIC_ARTICLES=558/i,
  /563 public/i,
  /563 public entries/i,
  /Public eligible articles\s*\|\s*563/i,
  /Public articles\s*\|\s*563/i,
  /EXPECTED_PUBLIC_ARTICLES=563/i,
  /409 draft/i,
  /Draft articles\s*\|\s*409/i,
  /EXPECTED_DRAFT_ARTICLES=409/i,
  /417 draft/i,
  /Draft articles\s*\|\s*417/i,
  /EXPECTED_DRAFT_ARTICLES=417/i,
  /422 draft/i,
  /Draft articles\s*\|\s*422/i,
  /EXPECTED_DRAFT_ARTICLES=422/i,
  /427 draft/i,
  /Draft articles\s*\|\s*427/i,
  /EXPECTED_DRAFT_ARTICLES=427/i,
  /432 draft/i,
  /Draft articles\s*\|\s*432/i,
  /EXPECTED_DRAFT_ARTICLES=432/i,
  /446 draft/i,
  /Draft articles\s*\|\s*446/i,
  /EXPECTED_DRAFT_ARTICLES=446/i,
  /445 draft/i,
  /Draft articles\s*\|\s*445/i,
  /EXPECTED_DRAFT_ARTICLES=445/i,
  /442 draft/i,
  /Draft articles\s*\|\s*442/i,
  /EXPECTED_DRAFT_ARTICLES=442/i,
  /437 draft/i,
  /Draft articles\s*\|\s*437/i,
  /EXPECTED_DRAFT_ARTICLES=437/i,
  /412 draft/i,
  /Draft articles\s*\|\s*412/i,
  /EXPECTED_DRAFT_ARTICLES=412/i,
  /1814 public claims/i,
  /1814 published claims/i,
  /1814 claims from production smoke/i,
  /Public claims\s*\|\s*1814/i,
  /EXPECTED_CLAIMS=1814/i,
  /1804 public claims/i,
  /1804 published claims/i,
  /1804 claims from production smoke/i,
  /Public claims\s*\|\s*1804/i,
  /EXPECTED_CLAIMS=1804/i,
  /1784 public claims/i,
  /1784 published claims/i,
  /1784 claims from production smoke/i,
  /Public claims\s*\|\s*1784/i,
  /EXPECTED_CLAIMS=1784/i,
  /1764 public claims/i,
  /1764 published claims/i,
  /1764 claims from production smoke/i,
  /Public claims\s*\|\s*1764/i,
  /EXPECTED_CLAIMS=1764/i,
  /1747 public claims/i,
  /1747 published claims/i,
  /1747 claims from production smoke/i,
  /Public claims\s*\|\s*1747/i,
  /EXPECTED_CLAIMS=1747/i,
  /1715 public claims/i,
  /Public claims\s*\|\s*1715/i,
  /EXPECTED_CLAIMS=1715/i,
  /1603 public claims/i,
  /Public claims\s*\|\s*1603/i,
  /EXPECTED_CLAIMS=1603/i,
  /1683 public claims/i,
  /Public claims\s*\|\s*1683/i,
  /EXPECTED_CLAIMS=1683/i,
  /1685 public claims/i,
  /1685 published claims/i,
  /1685 claims from production smoke/i,
  /Public claims\s*\|\s*1685/i,
  /EXPECTED_CLAIMS=1685/i,
  /1695 public claims/i,
  /1695 published claims/i,
  /1695 claims from production smoke/i,
  /Public claims\s*\|\s*1695/i,
  /EXPECTED_CLAIMS=1695/i,
  /1714 public claims/i,
  /1714 published claims/i,
  /1714 claims from production smoke/i,
  /Public claims\s*\|\s*1714/i,
  /EXPECTED_CLAIMS=1714/i,
  /1731 public claims/i,
  /1731 published claims/i,
  /1731 claims from production smoke/i,
  /Public claims\s*\|\s*1731/i,
  /EXPECTED_CLAIMS=1731/i,
  /1543 public claims/i,
  /1543 published claims/i,
  /1543 claims from production smoke/i,
  /Published claims surface\s*\|\s*1543/i,
  /876 articles/i,
  /total_articles["\s:]+805/i
];

const SECRET_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bcf[a-z]{2}_[A-Za-z0-9_-]{20,}\b/,
  /\bCLOUDFLARE_API_TOKEN\s*=\s*['"][^'"]+['"]/i,
  /\bANCHORFACT_PROVENANCE_PRIVATE_KEY_(?:PEM|BASE64)\s*=\s*(?!<secret(?: PEM value)?>)(?!<base64 private key>)[^\s#'"]{20,}/i
];

const NODE_CORE_MODULES = new Set([
  'assert',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'crypto',
  'dgram',
  'diagnostics_channel',
  'dns',
  'domain',
  'events',
  'fs',
  'http',
  'http2',
  'https',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'timers',
  'tls',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'worker_threads',
  'zlib'
]);

function extensionOf(path) {
  const match = path.match(/(\.[^.\\\/]+)$/);
  return match ? match[1].toLowerCase() : '';
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    if (dir === 'scripts' && entry === 'legacy') continue;

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else if (TEXT_EXTENSIONS.has(extensionOf(entry))) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizePath(path) {
  return path.replace(/\\/g, '/');
}

function importSpecifiers(text) {
  const specs = [];
  const importPattern = /^\s*import\s+(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/mg;
  const exportPattern = /^\s*export\s+[^'"]+\s+from\s+['"]([^'"]+)['"]/mg;
  for (const pattern of [importPattern, exportPattern]) {
    let match = pattern.exec(text);
    while (match) {
      specs.push(match[1]);
      match = pattern.exec(text);
    }
  }
  return specs;
}

function isNodeCoreSpecifier(specifier) {
  const bare = String(specifier || '').replace(/^node:/, '');
  return NODE_CORE_MODULES.has(bare);
}

function resolveRelativeImport(rootDir, fromFile, specifier) {
  const base = resolve(dirname(fromFile), specifier);
  const candidates = [
    base,
    `${base}.js`,
    join(base, 'index.js')
  ];
  return candidates.find(candidate => existsSync(candidate) && statSync(candidate).isFile()) || null;
}

function functionEntrypoints(rootDir, functionsDir = 'functions') {
  const baseDir = resolve(rootDir, functionsDir);
  if (!existsSync(baseDir)) return [];
  const files = [];
  function walkFunctions(dir) {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walkFunctions(fullPath);
      } else if (extensionOf(entry) === '.js') {
        files.push(fullPath);
      }
    }
  }
  walkFunctions(baseDir);
  return files;
}

export function collectFunctionEdgeImportFailures({ rootDir = '.', functionsDir = 'functions' } = {}) {
  const root = resolve(rootDir);
  const failures = [];
  const seen = new Set();

  function visit(file, chain) {
    const normalizedFile = normalizePath(resolve(file));
    if (seen.has(normalizedFile)) return;
    seen.add(normalizedFile);

    const text = readFileSync(file, 'utf8');
    for (const specifier of importSpecifiers(text)) {
      if (isNodeCoreSpecifier(specifier)) {
        const chainText = [...chain, normalizePath(relative(root, file))].join(' -> ');
        failures.push(`${chainText} imports Node-only module "${specifier}", which is not safe for Cloudflare Pages Functions.`);
        continue;
      }
      if (!specifier.startsWith('.')) continue;

      const resolvedImport = resolveRelativeImport(root, file, specifier);
      if (!resolvedImport) {
        failures.push(`${normalizePath(relative(root, file))} imports missing module "${specifier}".`);
        continue;
      }
      visit(resolvedImport, [...chain, normalizePath(relative(root, file))]);
    }
  }

  for (const entrypoint of functionEntrypoints(root, functionsDir)) {
    visit(entrypoint, []);
  }

  return failures;
}

function trackedFiles() {
  return execFileSync('git', ['ls-files'], { encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean)
    .map(path => path.replace(/\\/g, '/'));
}

function checkRootTempFiles(failures) {
  for (const file of ROOT_TEMP_FILES) {
    if (existsSync(file)) {
      failures.push(`${file} should not live at the repository root; use archive/snapshots/ for historical copies.`);
    }
  }
}

function checkTrackedGeneratedFiles(failures) {
  for (const file of trackedFiles()) {
    if (
      file.startsWith('dist/')
      || file.startsWith('node_modules/')
      || file.includes('__pycache__/')
      || file.endsWith('.pyc')
      || file.endsWith('.pyo')
      || file.endsWith('.backup')
      || file.startsWith('%SystemDrive%/')
    ) {
      failures.push(`${file} should not be tracked.`);
    }
  }
}

function checkTextFiles(failures) {
  for (const file of walk('.')) {
    const relativePath = relative('.', file).replace(/\\/g, '/');
    if (relativePath === 'verification-report.json') continue;
    if (/^docs\/PUBLIC_CONTENT_REPAIR_/.test(relativePath)) continue;

    const text = readFileSync(file, 'utf8');
    failures.push(...textHygieneFailures(relativePath, text));
  }
}

export function textHygieneFailures(relativePath, text) {
  const failures = [];
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(text)) {
      failures.push(`${relativePath} appears to contain a private key, API token, or signing secret.`);
      break;
    }
  }

  for (const pattern of MOJIBAKE_PATTERNS) {
    if (pattern.test(text)) {
      failures.push(`${relativePath} appears to contain mojibake or replacement characters.`);
      break;
    }
  }

  const shouldCheckMetrics = (
    relativePath === 'mcp.json'
    || relativePath === 'README.md'
    || relativePath === 'DESIGN.md'
    || relativePath === 'PROMOTION.md'
    || relativePath === 'SECURITY.md'
    || relativePath.startsWith('docs/')
    || relativePath.startsWith('.github/')
  );

  if (shouldCheckMetrics) {
    for (const pattern of STALE_METRIC_PATTERNS) {
      if (pattern.test(text)) {
        failures.push(`${relativePath} contains stale launch metrics or old MCP counts.`);
        break;
      }
    }
  }

  return failures;
}

function checkFunctionEdgeImports(failures) {
  failures.push(...collectFunctionEdgeImportFailures());
}

function checkProductionIntegrityWorkflow(failures) {
  const path = '.github/workflows/production-integrity.yml';
  if (!existsSync(path)) {
    failures.push(`${path} is required for signed production monitoring.`);
    return;
  }

  const text = readFileSync(path, 'utf8');
  const requiredPatterns = [
    [/name:\s*Production Integrity/, 'workflow name should be Production Integrity'],
    [/workflow_dispatch:/, 'workflow should support manual dispatch'],
    [/cron:\s*'27 0 \* \* \*'/, 'workflow should run daily at the expected cron schedule'],
    [/permissions:\s*\r?\n\s+contents:\s+read/, 'workflow should use read-only contents permission'],
    [/npm run production:integrity/, 'workflow should run the production integrity script'],
    [/actions\/upload-artifact@v4/, 'workflow should upload the integrity report artifact']
  ];

  for (const [pattern, message] of requiredPatterns) {
    if (!pattern.test(text)) failures.push(`${path}: ${message}.`);
  }

  const forbiddenPatterns = [
    [/contents:\s+write/, 'must not request contents write permission'],
    [/verify-full/, 'must not run verify-full'],
    [/CLOUDFLARE_API_TOKEN/i, 'must not reference Cloudflare API tokens'],
    [/wrangler/i, 'must not deploy or mutate Cloudflare state']
  ];

  for (const [pattern, message] of forbiddenPatterns) {
    if (pattern.test(text)) failures.push(`${path}: ${message}.`);
  }
}

export function runRepoHygiene() {
  const failures = [];
  checkRootTempFiles(failures);
  checkTrackedGeneratedFiles(failures);
  checkTextFiles(failures);
  checkFunctionEdgeImports(failures);
  checkProductionIntegrityWorkflow(failures);
  return failures;
}

export function main() {
  const failures = runRepoHygiene();
  if (failures.length > 0) {
    console.error('Repository hygiene check failed:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log('Repository hygiene check passed');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
