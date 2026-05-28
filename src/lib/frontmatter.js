import { load } from 'js-yaml';

export function splitFrontmatter(mdContent) {
  const lines = mdContent.split('\n');
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: mdContent };

  const endIndex = lines.slice(1).findIndex(line => line.trim() === '---');
  if (endIndex === -1) return { frontmatter: {}, body: mdContent };

  const yamlBlock = lines.slice(1, endIndex + 1).join('\n');
  const body = lines.slice(endIndex + 2).join('\n');

  try {
    return { frontmatter: load(yamlBlock) || {}, body };
  } catch (error) {
    console.warn(`YAML parse error: ${error.message}`);
    return { frontmatter: { _yaml_error: true }, body: mdContent };
  }
}
