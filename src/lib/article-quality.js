import { basename, dirname, extname, relative } from 'path';
import {
  collectContentHygieneFlags,
  hasPlaceholderText,
  publicFatalHygieneReasons
} from './content-hygiene.js';

function addUnique(target, value) {
  if (!target.includes(value)) target.push(value);
}

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
  return hasPlaceholderText(body, frontmatter);
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
  const hygieneFlags = collectContentHygieneFlags({ frontmatter, body });

  if (frontmatter.status === 'draft') {
    addUnique(qualityReasons, 'explicit_draft');
    addUnique(fatalReasons, 'explicit_draft');
  }

  if (frontmatter._yaml_error) {
    addUnique(qualityReasons, 'yaml_field_damage');
    addUnique(fatalReasons, 'yaml_field_damage');
  }

  if (hasPlaceholderContent(body, frontmatter)) {
    addUnique(qualityReasons, 'placeholder_content');
    addUnique(fatalReasons, 'placeholder_content');
  }

  for (const reason of ['encoding_mojibake', 'broken_atomic_fact', 'generic_source_homepage', 'claim_evidence_weak']) {
    if (hygieneFlags.includes(reason)) addUnique(qualityReasons, reason);
  }

  for (const reason of publicFatalHygieneReasons(frontmatter, body)) {
    const normalizedReason = reason === 'placeholder_text' ? 'placeholder_content' : reason;
    addUnique(qualityReasons, normalizedReason);
    addUnique(fatalReasons, normalizedReason);
  }

  if (sources.length === 0) {
    addUnique(qualityReasons, 'missing_primary_sources');
    addUnique(fatalReasons, 'missing_primary_sources');
  }

  if (!verificationData) {
    addUnique(qualityReasons, 'estimated_confidence');
    addUnique(fatalReasons, 'estimated_confidence');
  }

  if (verificationData && coverage.total !== sources.length) {
    addUnique(qualityReasons, 'verification_count_mismatch');
    addUnique(fatalReasons, 'verification_count_mismatch');
  }

  if (verificationData && coverage.total > 0 && coverage.verified === 0) {
    addUnique(qualityReasons, 'no_verified_sources');
    addUnique(fatalReasons, 'no_verified_sources');
  }

  if (verificationData && coverage.total > 0 && coverage.verified < coverage.total) {
    addUnique(qualityReasons, 'partial_source_verification');
  }

  if (verificationData && coverage.total > 0 && coverage.verified > 0 && coverage.ratio < 0.5) {
    addUnique(qualityReasons, 'low_verified_coverage');
  }

  if (confidence?.inputs?.based_on !== 'verified_sources') {
    addUnique(qualityReasons, 'estimated_confidence');
    addUnique(fatalReasons, 'estimated_confidence');
  }

  if (confidence?.inputs?.based_on === 'estimated' && confidence.level === 'high') {
    addUnique(qualityReasons, 'estimated_high_confidence');
    addUnique(fatalReasons, 'estimated_high_confidence');
  }

  if (confidence?.inputs?.high_confidence_evidence_gap) {
    addUnique(qualityReasons, 'high_confidence_evidence_gap');
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
