import { relative, dirname, basename, extname } from 'path';

const PLACEHOLDER_PATTERNS = [
  /待后续补充/,
  /待补充/,
  /内容初稿/,
  /detailed analysis is still being completed/i,
  /\[(?:详细分析|待后续补充|todo|placeholder)[^\]]*\]/i,
  /\bTODO\b/i
];

export function normalizePath(path) {
  return (path || '').replace(/\\/g, '/');
}

export function slugifySegment(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\+/g, '-plus-')
    .replace(/#/g, '-sharp-')
    .replace(/&/g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function slugifyPath(value) {
  return normalizePath(value)
    .split('/')
    .map(slugifySegment)
    .filter(Boolean)
    .join('/');
}

export function canonicalSlugFor(frontmatter, filePath, contentDir) {
  if (frontmatter?.slug) return slugifyPath(frontmatter.slug);

  const normalizedFile = normalizePath(filePath);
  const normalizedContent = normalizePath(contentDir || dirname(filePath));
  const rel = normalizePath(relative(normalizedContent, normalizedFile));
  const withoutExt = rel && !rel.startsWith('..')
    ? rel.slice(0, -extname(rel).length)
    : basename(filePath, extname(filePath));

  return slugifyPath(withoutExt);
}

export function hasPlaceholderContent(body, frontmatter = {}) {
  const knownGaps = Array.isArray(frontmatter.known_gaps)
    ? frontmatter.known_gaps.join('\n')
    : '';
  const text = `${body || ''}\n${knownGaps}`;
  return PLACEHOLDER_PATTERNS.some(pattern => pattern.test(text));
}

export function verifiedSourceCoverage(verificationData) {
  const total = verificationData?.sources_total || 0;
  const verified = verificationData?.sources_verified || 0;
  return {
    total,
    verified,
    ratio: total > 0 ? verified / total : 0
  };
}

export function evaluateArticleQuality({
  frontmatter = {},
  body = '',
  filePath,
  contentDir,
  verificationData = null,
  confidence = null
}) {
  const sources = frontmatter.primary_sources || [];
  const canonicalSlug = canonicalSlugFor(frontmatter, filePath, contentDir);
  const coverage = verifiedSourceCoverage(verificationData);
  const qualityReasons = [];
  const fatalReasons = [];

  if (frontmatter.status === 'draft') {
    qualityReasons.push('explicit_draft');
    fatalReasons.push('explicit_draft');
  }

  if (hasPlaceholderContent(body, frontmatter)) {
    qualityReasons.push('placeholder_content');
    fatalReasons.push('placeholder_content');
  }

  if (sources.length === 0) {
    qualityReasons.push('missing_primary_sources');
    fatalReasons.push('missing_primary_sources');
  }

  if (!verificationData) {
    qualityReasons.push('estimated_confidence');
    fatalReasons.push('estimated_confidence');
  }

  if (verificationData && coverage.total !== sources.length) {
    qualityReasons.push('verification_count_mismatch');
    fatalReasons.push('verification_count_mismatch');
  }

  if (verificationData && coverage.total > 0 && coverage.verified === 0) {
    qualityReasons.push('no_verified_sources');
    fatalReasons.push('no_verified_sources');
  }

  if (verificationData && coverage.total > 0 && coverage.verified < coverage.total) {
    qualityReasons.push('partial_source_verification');
  }

  if (verificationData && coverage.total > 0 && coverage.verified > 0 && coverage.ratio < 0.5) {
    qualityReasons.push('low_verified_coverage');
  }

  if (confidence?.inputs?.based_on !== 'verified_sources') {
    if (!qualityReasons.includes('estimated_confidence')) {
      qualityReasons.push('estimated_confidence');
    }
    if (!fatalReasons.includes('estimated_confidence')) {
      fatalReasons.push('estimated_confidence');
    }
  }

  if (confidence?.inputs?.based_on === 'estimated' && confidence.level === 'high') {
    qualityReasons.push('estimated_high_confidence');
    fatalReasons.push('estimated_high_confidence');
  }

  const publicEligible = fatalReasons.length === 0;
  const isDraft = !publicEligible;

  return {
    canonicalSlug,
    canonicalUrl: `https://anchorfact.org/${canonicalSlug}/`,
    status: publicEligible ? 'public' : 'draft',
    isDraft,
    publicEligible,
    qualityReasons,
    fatalReasons,
    verifiedSourceCoverage: coverage
  };
}

export function findDuplicateCanonicalSlugs(records) {
  const seen = new Map();
  const duplicates = new Map();

  for (const record of records) {
    const slug = record.canonicalSlug || record.quality?.canonicalSlug;
    if (!slug) continue;
    const existing = seen.get(slug);
    if (existing) {
      duplicates.set(slug, [existing, record]);
    } else {
      seen.set(slug, record);
    }
  }

  return [...duplicates.entries()].map(([slug, entries]) => ({ slug, entries }));
}
