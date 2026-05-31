export function positiveInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  const workerCount = Math.min(items.length, Math.max(1, concurrency));
  let nextIndex = 0;

  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index], index);
    }
  }));

  return results;
}
