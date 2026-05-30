const jsonCachesByAssets = new WeakMap();

function cacheForAssets(assets) {
  if (!assets || typeof assets.fetch !== 'function') {
    throw new Error('Cloudflare ASSETS binding is unavailable.');
  }
  let cache = jsonCachesByAssets.get(assets);
  if (!cache) {
    cache = new Map();
    jsonCachesByAssets.set(assets, cache);
  }
  return cache;
}

export async function loadJsonAsset(context, path) {
  const cache = cacheForAssets(context?.env?.ASSETS);
  if (cache.has(path)) return cache.get(path);

  const url = new URL(path, context.request.url);
  const response = await context.env.ASSETS.fetch(url);
  if (!response.ok) {
    throw new Error(`${path} fetch failed with HTTP ${response.status}`);
  }
  const payload = await response.json();
  cache.set(path, payload);
  return payload;
}
