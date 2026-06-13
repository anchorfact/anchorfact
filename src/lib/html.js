export function escapeTurtle(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

export function compileJsonLdAlias(jsonLd) {
  return JSON.stringify(jsonLd, null, 2);
}
