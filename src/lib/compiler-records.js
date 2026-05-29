import { classifySourceTier } from './confidence.js';
import { factEvidenceMapsToSources, isBrokenAtomicFact } from './content-hygiene.js';
import { escapeTurtle } from './html.js';

export function extractTldr(body) {
  const tldrSection = body.match(/## TL;DR\s*\n+([^\n]+(?:\n[^\n#]+)*)/);
  if (tldrSection) return tldrSection[1].trim().split('\n')[0];
  return body.trim().split('\n')[0]?.replace(/^#+\s*/, '') || '';
}

export function compileJsonLd(frontmatter, body, quality, confidence, verificationData, verificationTimestamp = null) {
  const sources = frontmatter.primary_sources || [];
  const verification = {
    confidence_formula_version: confidence.formula_version,
    confidence_inputs: confidence.inputs,
    confidence_level: confidence.level,
    confidence_score: confidence.score,
    confidence_basis: confidence.inputs.based_on,
    sources_total: sources.length,
    sources_verified: verificationData?.sources_verified ?? null,
    sources_unreachable: verificationData?.sources_unreachable ?? null,
    verification_timestamp: verificationData ? verificationTimestamp : null,
    verification_note: verificationData ? 'actual source verification executed' : 'estimated; verification report not available',
    sources_tier: sources.map(source => classifySourceTier(source)),
    sources_has_doi: sources.some(source => source.doi),
    sources_has_url: sources.some(source => source.url),
    article_has_disputed: !!(frontmatter.disputed_statements && frontmatter.disputed_statements.length > 0),
    article_has_known_gaps: !!(frontmatter.known_gaps && frontmatter.known_gaps.length > 0)
  };

  return {
    '@context': 'https://schema.org',
    '@type': frontmatter.schema_type || 'Article',
    '@id': `https://anchorfact.org/kb/${quality.canonicalSlug}`,
    url: quality.canonicalUrl,
    headline: frontmatter.title,
    description: extractTldr(body),
    dateCreated: frontmatter.created_date || new Date().toISOString(),
    dateModified: frontmatter.updated || new Date().toISOString(),
    author: { '@type': 'Organization', name: 'AnchorFact' },
    publisher: { '@type': 'Organization', name: 'AnchorFact', url: 'https://anchorfact.org' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    'anchorfact:status': quality.status,
    'anchorfact:confidence': confidence.level,
    'anchorfact:confidenceScore': confidence.score,
    'anchorfact:generationMethod': frontmatter.generation_method || 'ai_structured',
    'anchorfact:qualityReasons': quality.qualityReasons,
    'anchorfact:verification': verification,
    citation: sources.map(source => ({
      '@type': 'CreativeWork',
      name: source.title,
      author: source.authors?.join(', '),
      sameAs: source.url || (source.doi ? `https://doi.org/${source.doi}` : undefined),
      'anchorfact:sourceTier': classifySourceTier(source),
      'anchorfact:sourceType': source.type || null,
      'anchorfact:year': source.year || null
    }))
  };
}

export function compileAtomicFacts(frontmatter, quality) {
  return (frontmatter.atomic_facts || []).map((fact, index) => {
    const id = fact.id || `${quality.canonicalSlug.replace(/\//g, '-')}-fact-${index + 1}`;
    const factQualityReasons = [];
    if (isBrokenAtomicFact(fact)) factQualityReasons.push('broken_atomic_fact');
    const evidenceMatch = factEvidenceMapsToSources(fact, frontmatter) ? 'mapped' : 'weak';
    const factJson = {
      '@context': 'https://schema.org',
      '@type': 'Claim',
      '@id': `https://anchorfact.org/fact/${id}`,
      text: fact.statement,
      'anchorfact:article': quality.canonicalUrl,
      'anchorfact:status': quality.status,
      'anchorfact:confidence': fact.confidence || null,
      'anchorfact:sourceRef': fact.source_ref || null,
      'anchorfact:sourceTitle': fact.source_title || null,
      'anchorfact:sourceExcerpt': fact.source_excerpt || null,
      'anchorfact:verificationMethod': fact.verification_method || null,
      'anchorfact:evidenceMatch': evidenceMatch,
      'anchorfact:qualityReasons': factQualityReasons
    };

    if (fact.source_doi) {
      factJson.citation = { '@type': 'CreativeWork', sameAs: `https://doi.org/${fact.source_doi}` };
    } else if (fact.source_url) {
      factJson.citation = { '@type': 'CreativeWork', sameAs: fact.source_url };
    }

    return factJson;
  });
}

export function compilePlainText(frontmatter, body, quality, confidence) {
  const basis = confidence.inputs.based_on === 'verified_sources' ? '(verified)' : '(estimated)';
  return `# ${frontmatter.title}
Status: ${quality.status}
Confidence: ${confidence.level} (${confidence.score}) ${basis}
Last verified: ${frontmatter.last_verified || 'N/A'}
Generation: ${frontmatter.generation_method || 'ai_structured'}

${body}
`;
}

export function compileTurtle(frontmatter, quality, confidence) {
  const lines = [
    '@prefix schema: <https://schema.org/> .',
    '@prefix af: <https://anchorfact.org/ns#> .',
    '',
    `<https://anchorfact.org/kb/${quality.canonicalSlug}>`,
    `  a schema:${frontmatter.schema_type || 'Article'} ;`,
    `  schema:headline "${escapeTurtle(frontmatter.title)}" ;`,
    `  schema:url <${quality.canonicalUrl}> ;`,
    `  af:status "${quality.status}" ;`,
    `  af:confidence "${confidence.level}" ;`,
    `  af:confidenceScore "${confidence.score}" ;`,
    `  af:confidenceBasis "${confidence.inputs.based_on || 'estimated'}" ;`,
    `  af:generationMethod "${frontmatter.generation_method || 'ai_structured'}" .`
  ];

  for (const source of frontmatter.primary_sources || []) {
    const sourceUrl = source.url || (source.doi ? `https://doi.org/${source.doi}` : null);
    if (!sourceUrl) continue;
    lines.push('');
    lines.push(`<https://anchorfact.org/kb/${quality.canonicalSlug}>`);
    lines.push(`  schema:citation <${sourceUrl}> ;`);
    lines.push(`  af:sourceTier "${classifySourceTier(source)}" .`);
  }

  return lines.join('\n');
}
