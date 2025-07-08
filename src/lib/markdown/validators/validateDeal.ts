// File: src/lib/markdown/validators/validateDeal.ts
import type { ValidationResult } from './types';

export type DealError = {
  hand: string;    // 'N','E','S','W' or 'ALL'
  index: number;   // position in flattened cards array
  card: string;    // offending card code
  message: string; // error description
};

/**
 * Validate a bridge deal composed of up to 4 hands (N,E,S,W). Allows partial deals.
 * Ensures no duplicate cards across hands and max 52 cards.
 */
export function validateDeal(
  hands: Partial<Record<'N'|'E'|'S'|'W', string>>
): ValidationResult<DealError> {
  const errors: DealError[] = [];

  // Track seen card codes across all hands
  const seen = new Map<string, { hand: string; index: number }>();
  const suitOrder = ['S','H','D','C'] as const;
  const allCards: string[] = [];

  // Flatten each hand and detect duplicates
  for (const hand of ['N','E','S','W'] as const) {
    const raw = hands[hand] ?? '';
    const segments = raw.split('.');
    // pad to 4 segments (voids allowed)
    while (segments.length < 4) segments.push('');

    // Process each suit segment
    for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
      const seg = segments[suitIndex];
      const tokens = Array.from(seg.matchAll(/(10|[AKQJT2-9x])/g)).map(m => m[1]);

      for (let j = 0; j < tokens.length; j++) {
        const token = tokens[j];
        const flatIndex = allCards.length;

        if (token === 'x') {
          // wildcard, no suit context
          allCards.push(token);
          continue;
        }

        // build full code e.g. 'AS', '10D'
        const cardCode = token + suitOrder[suitIndex];

        // duplicate across hands?
        if (seen.has(cardCode)) {
          const first = seen.get(cardCode)!;
          errors.push({
            hand,
            index: flatIndex,
            card: cardCode,
            message: `Duplicate card across deal (also in ${first.hand}).`
          });
        } else {
          seen.set(cardCode, { hand, index: flatIndex });
        }

        allCards.push(cardCode);
      }
    }
  }

  // Rule: total cards <= 52
  if (allCards.length > 52) {
    errors.push({
      hand: 'ALL',
      index: -1,
      card: '',
      message: 'Deal contains more than 52 cards.'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}