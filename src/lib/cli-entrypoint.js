import { pathToFileURL } from 'url';

export function isDirectRun(importMetaUrl, argv = process.argv) {
  const entryPath = argv?.[1];
  return typeof entryPath === 'string' && importMetaUrl === pathToFileURL(entryPath).href;
}
