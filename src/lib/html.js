export function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeTurtle(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

export function compileHtml(frontmatter, body, quality, confidence, jsonLd) {
  const noIndex = quality.isDraft ? '  <meta name="robots" content="noindex, nofollow">\n' : '';
  const reasons = quality.qualityReasons.length
    ? `<p><strong>Quality notes:</strong> ${quality.qualityReasons.map(escapeHtml).join(', ')}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
${noIndex}  <title>${escapeHtml(frontmatter.title)} - AnchorFact</title>
  <meta name="anchorfact:status" content="${quality.status}">
  <meta name="anchorfact:confidence" content="${confidence.level} (${confidence.score})">
  <meta name="anchorfact:generation" content="${frontmatter.generation_method || 'ai_structured'}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <article>
    <h1>${escapeHtml(frontmatter.title)}</h1>
    <p><strong>Status:</strong> ${quality.status} &middot; <strong>Confidence:</strong> ${confidence.level} (${confidence.score}) &middot; <strong>Basis:</strong> ${confidence.inputs.based_on}</p>
    ${reasons}
    <pre style="white-space:pre-wrap">${escapeHtml(body)}</pre>
  </article>
</body>
</html>`;
}
