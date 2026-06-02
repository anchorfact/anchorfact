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
  /696 public/i,
  /696 public entries/i,
  /Public eligible articles\s*\|\s*696/i,
  /Public articles\s*\|\s*696/i,
  /EXPECTED_PUBLIC_ARTICLES=696/i,
  /310 draft/i,
  /Draft articles\s*\|\s*310/i,
  /EXPECTED_DRAFT_ARTICLES=310/i,
  /2224 claims/i,
  /2224 public claims/i,
  /2224 published claims/i,
  /2224 claims from production smoke/i,
  /Public claims\s*\|\s*2224/i,
  /EXPECTED_CLAIMS=2224/i,
  /690 public/i,
  /690 public entries/i,
  /Public eligible articles\s*\|\s*690/i,
  /Public articles\s*\|\s*690/i,
  /EXPECTED_PUBLIC_ARTICLES=690/i,
  /2205 claims/i,
  /2205 public claims/i,
  /2205 published claims/i,
  /2205 claims from production smoke/i,
  /Public claims\s*\|\s*2205/i,
  /EXPECTED_CLAIMS=2205/i,
  /688 public/i,
  /688 public entries/i,
  /Public eligible articles\s*\|\s*688/i,
  /Public articles\s*\|\s*688/i,
  /EXPECTED_PUBLIC_ARTICLES=688/i,
  /312 draft/i,
  /Draft articles\s*\|\s*312/i,
  /EXPECTED_DRAFT_ARTICLES=312/i,
  /2201 claims/i,
  /2201 public claims/i,
  /2201 published claims/i,
  /2201 claims from production smoke/i,
  /Public claims\s*\|\s*2201/i,
  /EXPECTED_CLAIMS=2201/i,
  /683 public/i,
  /683 public entries/i,
  /Public eligible articles\s*\|\s*683/i,
  /Public articles\s*\|\s*683/i,
  /EXPECTED_PUBLIC_ARTICLES=683/i,
  /317 draft/i,
  /Draft articles\s*\|\s*317/i,
  /EXPECTED_DRAFT_ARTICLES=317/i,
  /2176 claims/i,
  /2176 public claims/i,
  /2176 published claims/i,
  /2176 claims from production smoke/i,
  /Public claims\s*\|\s*2176/i,
  /EXPECTED_CLAIMS=2176/i,
  /\b678 public\b/i,
  /678 public entries/i,
  /Public eligible articles\s*\|\s*678/i,
  /Public articles\s*\|\s*678/i,
  /EXPECTED_PUBLIC_ARTICLES=678/i,
  /322 draft/i,
  /Draft articles\s*\|\s*322/i,
  /EXPECTED_DRAFT_ARTICLES=322/i,
  /2152 claims/i,
  /2152 public claims/i,
  /2152 published claims/i,
  /2152 claims from production smoke/i,
  /Public claims\s*\|\s*2152/i,
  /EXPECTED_CLAIMS=2152/i,
  /673 public/i,
  /673 public entries/i,
  /Public eligible articles\s*\|\s*673/i,
  /Public articles\s*\|\s*673/i,
  /EXPECTED_PUBLIC_ARTICLES=673/i,
  /327 draft/i,
  /Draft articles\s*\|\s*327/i,
  /EXPECTED_DRAFT_ARTICLES=327/i,
  /2127 claims/i,
  /2127 public claims/i,
  /2127 published claims/i,
  /2127 claims from production smoke/i,
  /Public claims\s*\|\s*2127/i,
  /EXPECTED_CLAIMS=2127/i,
  /668 public/i,
  /668 public entries/i,
  /Public eligible articles\s*\|\s*668/i,
  /Public articles\s*\|\s*668/i,
  /EXPECTED_PUBLIC_ARTICLES=668/i,
  /332 draft/i,
  /Draft articles\s*\|\s*332/i,
  /EXPECTED_DRAFT_ARTICLES=332/i,
  /2102 claims/i,
  /2102 public claims/i,
  /2102 published claims/i,
  /2102 claims from production smoke/i,
  /Public claims\s*\|\s*2102/i,
  /EXPECTED_CLAIMS=2102/i,
  /663 public/i,
  /663 public entries/i,
  /Public eligible articles\s*\|\s*663/i,
  /Public articles\s*\|\s*663/i,
  /EXPECTED_PUBLIC_ARTICLES=663/i,
  /337 draft/i,
  /Draft articles\s*\|\s*337/i,
  /EXPECTED_DRAFT_ARTICLES=337/i,
  /2077 claims/i,
  /2077 public claims/i,
  /2077 published claims/i,
  /2077 claims from production smoke/i,
  /Public claims\s*\|\s*2077/i,
  /EXPECTED_CLAIMS=2077/i,
  /658 public/i,
  /658 public entries/i,
  /Public eligible articles\s*\|\s*658/i,
  /Public articles\s*\|\s*658/i,
  /EXPECTED_PUBLIC_ARTICLES=658/i,
  /342 draft/i,
  /Draft articles\s*\|\s*342/i,
  /EXPECTED_DRAFT_ARTICLES=342/i,
  /2052 claims/i,
  /2052 public claims/i,
  /2052 published claims/i,
  /2052 claims from production smoke/i,
  /Public claims\s*\|\s*2052/i,
  /EXPECTED_CLAIMS=2052/i,
  /653 public/i,
  /653 public entries/i,
  /Public eligible articles\s*\|\s*653/i,
  /Public articles\s*\|\s*653/i,
  /EXPECTED_PUBLIC_ARTICLES=653/i,
  /347 draft/i,
  /Draft articles\s*\|\s*347/i,
  /EXPECTED_DRAFT_ARTICLES=347/i,
  /2027 claims/i,
  /2027 public claims/i,
  /2027 published claims/i,
  /2027 claims from production smoke/i,
  /Public claims\s*\|\s*2027/i,
  /EXPECTED_CLAIMS=2027/i,
  /\b648 public\b/i,
  /648 public entries/i,
  /Public eligible articles\s*\|\s*648/i,
  /Public articles\s*\|\s*648/i,
  /EXPECTED_PUBLIC_ARTICLES=648/i,
  /352 draft/i,
  /Draft articles\s*\|\s*352/i,
  /EXPECTED_DRAFT_ARTICLES=352/i,
  /2001 claims/i,
  /2001 public claims/i,
  /2001 published claims/i,
  /2001 claims from production smoke/i,
  /Public claims\s*\|\s*2001/i,
  /EXPECTED_CLAIMS=2001/i,
  /643 public/i,
  /643 public entries/i,
  /Public eligible articles\s*\|\s*643/i,
  /Public articles\s*\|\s*643/i,
  /EXPECTED_PUBLIC_ARTICLES=643/i,
  /357 draft/i,
  /Draft articles\s*\|\s*357/i,
  /EXPECTED_DRAFT_ARTICLES=357/i,
  /1984 claims/i,
  /1984 public claims/i,
  /1984 published claims/i,
  /1984 claims from production smoke/i,
  /Public claims\s*\|\s*1984/i,
  /EXPECTED_CLAIMS=1984/i,
  /638 public/i,
  /638 public entries/i,
  /Public eligible articles\s*\|\s*638/i,
  /Public articles\s*\|\s*638/i,
  /EXPECTED_PUBLIC_ARTICLES=638/i,
  /362 draft/i,
  /Draft articles\s*\|\s*362/i,
  /EXPECTED_DRAFT_ARTICLES=362/i,
  /1966 claims/i,
  /Public claims\s*\|\s*1966/i,
  /EXPECTED_CLAIMS=1966/i,
  /633 public/i,
  /633 public entries/i,
  /Public eligible articles\s*\|\s*633/i,
  /Public articles\s*\|\s*633/i,
  /EXPECTED_PUBLIC_ARTICLES=633/i,
  /367 draft/i,
  /Draft articles\s*\|\s*367/i,
  /EXPECTED_DRAFT_ARTICLES=367/i,
  /1948 claims/i,
  /Public claims\s*\|\s*1948/i,
  /EXPECTED_CLAIMS=1948/i,
  /630 public/i,
  /630 public entries/i,
  /Public eligible articles\s*\|\s*630/i,
  /Public articles\s*\|\s*630/i,
  /EXPECTED_PUBLIC_ARTICLES=630/i,
  /629 public/i,
  /629 public entries/i,
  /Public eligible articles\s*\|\s*629/i,
  /Public articles\s*\|\s*629/i,
  /EXPECTED_PUBLIC_ARTICLES=629/i,
  /628 public/i,
  /628 public entries/i,
  /Public eligible articles\s*\|\s*628/i,
  /Public articles\s*\|\s*628/i,
  /EXPECTED_PUBLIC_ARTICLES=628/i,
  /607 public/i,
  /607 public entries/i,
  /Public eligible articles\s*\|\s*607/i,
  /Public articles\s*\|\s*607/i,
  /EXPECTED_PUBLIC_ARTICLES=607/i,
  /602 public/i,
  /602 public entries/i,
  /Public eligible articles\s*\|\s*602/i,
  /Public articles\s*\|\s*602/i,
  /EXPECTED_PUBLIC_ARTICLES=602/i,
  /599 public/i,
  /599 public entries/i,
  /Public eligible articles\s*\|\s*599/i,
  /Public articles\s*\|\s*599/i,
  /EXPECTED_PUBLIC_ARTICLES=599/i,
  /596 public/i,
  /596 public entries/i,
  /Public eligible articles\s*\|\s*596/i,
  /Public articles\s*\|\s*596/i,
  /EXPECTED_PUBLIC_ARTICLES=596/i,
  /593 public/i,
  /593 public entries/i,
  /Public eligible articles\s*\|\s*593/i,
  /Public articles\s*\|\s*593/i,
  /EXPECTED_PUBLIC_ARTICLES=593/i,
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
  /610 public/i,
  /610 public entries/i,
  /Public eligible articles\s*\|\s*610/i,
  /Public articles\s*\|\s*610/i,
  /EXPECTED_PUBLIC_ARTICLES=610/i,
  /613 public/i,
  /613 public entries/i,
  /Public eligible articles\s*\|\s*613/i,
  /Public articles\s*\|\s*613/i,
  /EXPECTED_PUBLIC_ARTICLES=613/i,
  /616 public/i,
  /616 public entries/i,
  /Public eligible articles\s*\|\s*616/i,
  /Public articles\s*\|\s*616/i,
  /EXPECTED_PUBLIC_ARTICLES=616/i,
  /622 public/i,
  /622 public entries/i,
  /Public eligible articles\s*\|\s*622/i,
  /Public articles\s*\|\s*622/i,
  /EXPECTED_PUBLIC_ARTICLES=622/i,
  /625 public/i,
  /625 public entries/i,
  /Public eligible articles\s*\|\s*625/i,
  /Public articles\s*\|\s*625/i,
  /EXPECTED_PUBLIC_ARTICLES=625/i,
  /619 public/i,
  /619 public entries/i,
  /Public eligible articles\s*\|\s*619/i,
  /Public articles\s*\|\s*619/i,
  /EXPECTED_PUBLIC_ARTICLES=619/i,
  /370 draft/i,
  /Draft articles\s*\|\s*370/i,
  /EXPECTED_DRAFT_ARTICLES=370/i,
  /372 draft/i,
  /Draft articles\s*\|\s*372/i,
  /EXPECTED_DRAFT_ARTICLES=372/i,
  /371 draft/i,
  /Draft articles\s*\|\s*371/i,
  /EXPECTED_DRAFT_ARTICLES=371/i,
  /398 draft/i,
  /Draft articles\s*\|\s*398/i,
  /EXPECTED_DRAFT_ARTICLES=398/i,
  /401 draft/i,
  /Draft articles\s*\|\s*401/i,
  /EXPECTED_DRAFT_ARTICLES=401/i,
  /404 draft/i,
  /Draft articles\s*\|\s*404/i,
  /EXPECTED_DRAFT_ARTICLES=404/i,
  /407 draft/i,
  /Draft articles\s*\|\s*407/i,
  /EXPECTED_DRAFT_ARTICLES=407/i,
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
  /393 draft/i,
  /Draft articles\s*\|\s*393/i,
  /EXPECTED_DRAFT_ARTICLES=393/i,
  /390 draft/i,
  /Draft articles\s*\|\s*390/i,
  /EXPECTED_DRAFT_ARTICLES=390/i,
  /387 draft/i,
  /Draft articles\s*\|\s*387/i,
  /EXPECTED_DRAFT_ARTICLES=387/i,
  /384 draft/i,
  /Draft articles\s*\|\s*384/i,
  /EXPECTED_DRAFT_ARTICLES=384/i,
  /378 draft/i,
  /Draft articles\s*\|\s*378/i,
  /EXPECTED_DRAFT_ARTICLES=378/i,
  /375 draft/i,
  /Draft articles\s*\|\s*375/i,
  /EXPECTED_DRAFT_ARTICLES=375/i,
  /381 draft/i,
  /Draft articles\s*\|\s*381/i,
  /EXPECTED_DRAFT_ARTICLES=381/i,
  /1933 public claims/i,
  /1933 published claims/i,
  /1933 claims from production smoke/i,
  /Public claims\s*\|\s*1933/i,
  /EXPECTED_CLAIMS=1933/i,
  /1866 public claims/i,
  /1866 published claims/i,
  /1866 claims from production smoke/i,
  /Public claims\s*\|\s*1866/i,
  /EXPECTED_CLAIMS=1866/i,
  /1850 public claims/i,
  /1850 published claims/i,
  /1850 claims from production smoke/i,
  /Public claims\s*\|\s*1850/i,
  /EXPECTED_CLAIMS=1850/i,
  /1830 public claims/i,
  /1830 published claims/i,
  /1830 claims from production smoke/i,
  /Public claims\s*\|\s*1830/i,
  /EXPECTED_CLAIMS=1830/i,
  /1820 public claims/i,
  /1820 published claims/i,
  /1820 claims from production smoke/i,
  /Public claims\s*\|\s*1820/i,
  /EXPECTED_CLAIMS=1820/i,
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
  /1841 public claims/i,
  /1841 published claims/i,
  /1841 claims from production smoke/i,
  /Public claims\s*\|\s*1841/i,
  /EXPECTED_CLAIMS=1841/i,
  /1840 public claims/i,
  /1840 published claims/i,
  /1840 claims from production smoke/i,
  /Public claims\s*\|\s*1840/i,
  /EXPECTED_CLAIMS=1840/i,
  /1875 public claims/i,
  /1875 published claims/i,
  /1875 claims from production smoke/i,
  /Public claims\s*\|\s*1875/i,
  /EXPECTED_CLAIMS=1875/i,
  /1884 public claims/i,
  /1884 published claims/i,
  /1884 claims from production smoke/i,
  /Public claims\s*\|\s*1884/i,
  /EXPECTED_CLAIMS=1884/i,
  /1893 public claims/i,
  /1893 published claims/i,
  /1893 claims from production smoke/i,
  /Public claims\s*\|\s*1893/i,
  /EXPECTED_CLAIMS=1893/i,
  /1902 public claims/i,
  /1902 published claims/i,
  /1902 claims from production smoke/i,
  /Public claims\s*\|\s*1902/i,
  /EXPECTED_CLAIMS=1902/i,
  /1911 public claims/i,
  /1911 published claims/i,
  /1911 claims from production smoke/i,
  /Public claims\s*\|\s*1911/i,
  /EXPECTED_CLAIMS=1911/i,
  /1920 public claims/i,
  /1920 published claims/i,
  /1920 claims from production smoke/i,
  /Public claims\s*\|\s*1920/i,
  /EXPECTED_CLAIMS=1920/i,
  /1929 public claims/i,
  /1929 published claims/i,
  /1929 claims from production smoke/i,
  /Public claims\s*\|\s*1929/i,
  /EXPECTED_CLAIMS=1929/i,
  /1931 public claims/i,
  /1931 published claims/i,
  /1931 claims from production smoke/i,
  /Public claims\s*\|\s*1931/i,
  /EXPECTED_CLAIMS=1931/i,
  /1543 public claims/i,
  /1543 published claims/i,
  /1543 claims from production smoke/i,
  /Published claims surface\s*\|\s*1543/i,
  /\bserver provides four tools\b/i,
  /\bMCP server provides four tools\b/i,
  /\bacross 14 representative queries\b/i,
  /\b14 representative queries\b/i,
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
    || (relativePath.startsWith('docs/') && !relativePath.startsWith('docs/PUBLIC_CONTENT_REPAIR_'))
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

function checkAiAdoptionScorecardWorkflow(failures) {
  const path = '.github/workflows/ai-adoption-scorecard.yml';
  if (!existsSync(path)) {
    failures.push(`${path} is required for AI adoption measurement.`);
    return;
  }

  const text = readFileSync(path, 'utf8');
  const requiredPatterns = [
    [/name:\s*AI Adoption Scorecard/, 'workflow name should be AI Adoption Scorecard'],
    [/workflow_dispatch:/, 'workflow should support manual dispatch'],
    [/cron:\s*'47 1 \* \* \*'/, 'workflow should run daily at the expected cron schedule'],
    [/permissions:\s*\r?\n\s+contents:\s+read/, 'workflow should use read-only contents permission'],
    [/CLOUDFLARE_API_TOKEN:\s*\$\{\{\s*secrets\.CLOUDFLARE_API_TOKEN\s*\}\}/, 'workflow should read Cloudflare token from GitHub Secrets'],
    [/npm run usage:adoption/, 'workflow should run the AI adoption scorecard script'],
    [/--lookback-minutes 1430/, 'workflow should retain a near-24-hour adoption scorecard window'],
    [/--lookback-minutes 120/, 'workflow should use a short reliability alert window'],
    [/--fail-on-reliability-break/, 'workflow should fail only on route reliability breakage'],
    [/actions\/upload-artifact@v4/, 'workflow should upload the adoption scorecard artifact']
  ];

  for (const [pattern, message] of requiredPatterns) {
    if (!pattern.test(text)) failures.push(`${path}: ${message}.`);
  }

  const forbiddenPatterns = [
    [/contents:\s+write/, 'must not request contents write permission'],
    [/verify-full/, 'must not run verify-full'],
    [/\bcf[a-z]{2}_[A-Za-z0-9_-]{20,}\b/, 'must not embed a Cloudflare API token'],
    [/\bgithub_pat_[A-Za-z0-9_]{20,}\b/, 'must not embed a GitHub personal access token'],
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
  checkAiAdoptionScorecardWorkflow(failures);
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
