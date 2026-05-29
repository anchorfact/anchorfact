#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

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
  /573 public/i,
  /573 public entries/i,
  /Public eligible articles\s*\|\s*573/i,
  /EXPECTED_PUBLIC_ARTICLES=573/i,
  /554 public/i,
  /554 public entries/i,
  /Public eligible articles\s*\|\s*554/i,
  /Public articles\s*\|\s*554/i,
  /EXPECTED_PUBLIC_ARTICLES=554/i,
  /427 draft/i,
  /Draft articles\s*\|\s*427/i,
  /EXPECTED_DRAFT_ARTICLES=427/i,
  /446 draft/i,
  /Draft articles\s*\|\s*446/i,
  /EXPECTED_DRAFT_ARTICLES=446/i,
  /1715 public claims/i,
  /Public claims\s*\|\s*1715/i,
  /EXPECTED_CLAIMS=1715/i,
  /1603 public claims/i,
  /Public claims\s*\|\s*1603/i,
  /EXPECTED_CLAIMS=1603/i,
  /1683 public claims/i,
  /Public claims\s*\|\s*1683/i,
  /EXPECTED_CLAIMS=1683/i,
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
    if (!shouldCheckMetrics) continue;

    for (const pattern of STALE_METRIC_PATTERNS) {
      if (pattern.test(text)) {
        failures.push(`${relativePath} contains stale launch metrics or old MCP counts.`);
        break;
      }
    }
  }
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

const failures = [];
checkRootTempFiles(failures);
checkTrackedGeneratedFiles(failures);
checkTextFiles(failures);
checkProductionIntegrityWorkflow(failures);

if (failures.length > 0) {
  console.error('Repository hygiene check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Repository hygiene check passed');
