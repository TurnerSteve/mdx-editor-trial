// File: src/lib/markdown/validators/validateHand.ts
import type { ValidationResult } from './types';

/**
 * Represents a validation error for a specific card in the hand.
 */
export type HandError = {
  index: number;    // position of the invalid card in the flattened hand array (0-based)
  card: string;     // the offending card token with suit (e.g. 'AS', '10D')
  message: string;  // description of why it's invalid
};

/**
 * Validate a bridge hand string using suit segments S.H.D.C order with pips and wildcards.
 * @param params Record with key 'hand' containing a string or string[] to normalize
 * @returns ValidationResult<HandError>
 */
export function validateHand(params: Record<string, unknown>): ValidationResult<HandError> {
  const rawVal = params.hand;
  const raw = Array.isArray(rawVal) ? rawVal.join('') : String(rawVal ?? '');
  const errors: HandError[] = [];

  // Split into the 4 suits: S, H, D, C
  const segments = raw.split('.');
  if (segments.length > 4) {
    errors.push({
      index: -1,
      card: raw,
      message: "Hand must have exactly 3 '.' separators (4 suits)."
    });
    return { isValid: false, errors };
  }

  // Flatten all card tokens and track positions
  const flat: string[] = [];
  segments.forEach((seg) => {
    const tokens = Array.from(seg.matchAll(/(10|[AKQJT2-9x])/g)).map(m => m[1]);
    flat.push(...tokens);
  });

  // Rule: up to 13 cards
  if (flat.length > 13) {
    errors.push({ index: -1, card: raw, message: 'Hand must not exceed 13 cards.' });
  }

  // Rule: no duplicate cards (except wildcard 'x'), considering suit context
  const suitLetters = ['S', 'H', 'D', 'C'] as const;
  const seenCards = new Set<string>();

  segments.forEach((seg, suitIndex) => {
    const tokens = Array.from(seg.matchAll(/(10|[AKQJT2-9x])/g)).map(m => m[1]);
    tokens.forEach((token, idx) => {
      if (token.toLowerCase() === 'x') return;

      // Build a full card code, e.g. '3S', 'KD'
      const cardCode = token + suitLetters[suitIndex];

      if (seenCards.has(cardCode)) {
        // Compute the flat index for the error (0-based)
        const priorCount = segments
          .slice(0, suitIndex)
          .reduce((sum, s) => sum + (s.match(/(10|[AKQJT2-9x])/g)?.length || 0), 0);
        const flatIndex = priorCount + idx;

        errors.push({
          index: flatIndex,
          card: cardCode,
          message: 'Duplicate card.'
        });
      } else {
        seenCards.add(cardCode);
      }
    });
  });

  // Rule: allowed symbols only
  flat.forEach((card, i) => {
    if (!/^(A|K|Q|J|T|[2-9]|x)$/.test(card)) {
      errors.push({ index: i, card, message: 'Invalid symbol in hand.' });
    }
  });

  // Rule: descending order A>K>Q>J>T>9>...>2>x; allow multiple wildcards 'x' in a row
  const rankOrder: Record<string, number> = {
    A: 14, K: 13, Q: 12, J: 11, T: 10,
    '9': 9, '8': 8, '7': 7, '6': 6,
    '5': 5, '4': 4, '3': 3, '2': 2, x: 1
  };
  let cursor = 0;
  segments.forEach((seg) => {
    const tokens = Array.from(seg.matchAll(/(10|[AKQJT2-9x])/g)).map(m => m[1]);
    for (let j = 0; j < tokens.length - 1; j++) {
      const curr = tokens[j];
      const next = tokens[j + 1];
      // Skip ordering check if either is wildcard 'x'
      if (curr === 'x' || next === 'x') continue;
      if (rankOrder[curr] <= rankOrder[next]) {
        errors.push({
          index: cursor + j + 1,
          card: next,
          message: 'Card out of order.'
        });
        break;
      }
    }
    cursor += tokens.length;
  });

  return { isValid: errors.length === 0, errors };
}