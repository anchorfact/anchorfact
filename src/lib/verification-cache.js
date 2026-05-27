export function isCacheableVerificationResult(result) {
  if (!result || result.error) return false;

  if (
    result.sources_total > 0 &&
    result.sources_unreachable >= result.sources_total &&
    result.sources_verified === 0
  ) {
    return false;
  }

  return true;
}
