// File: src/lib/utils/normaliseSequence.ts

/**
 * Normalize an input value into a string array.
 * - If given an array, each element is coerced to string.
 * - If given a string, splits on whitespace into items.
 * - Otherwise returns an empty array.
 *
 * @param rawSeq - The raw sequence input (string[], string, or any)
 * @returns A true string[] sequence
 */
export function normalizeSequence(rawSeq: unknown): string[] {
  if (Array.isArray(rawSeq)) {
    return rawSeq.map((x) => String(x).trim());
  }
  if (typeof rawSeq === 'string') {
    return rawSeq
      .trim()
      .split(/\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  return [];
}