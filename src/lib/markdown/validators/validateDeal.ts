// File: src/lib/markdown/validators/validateDeal.ts
import type { ValidationResult } from './types';

/**
 * Error shape for deal-level validation (across four hands).
 */
export type DealError = {
  hand: 'N' | 'E' | 'S' | 'W';  // which hand
  index: number;                // position of offending card in that hand
  card: string;                 // card code (e.g. 'AS', '9H')
  message: string;              // error message
};

/**
 * Validate a deal composed of up to 4 hands (N, E, S, W), checking total count and duplicates.
 * @param params Partial mapping from directions to hand strings/arrays
 * @returns ValidationResult<DealError>
 */
export function validateDeal(
  params: Record<string, unknown>
): ValidationResult<DealError> {
  // Pull N/E/S/W directly
  const raw = params as Partial<Record<'N'|'E'|'S'|'W', unknown>>;
  const errors: DealError[] = [];

  const suitLetters = ['S','H','D','C'] as const;

  // Helper to turn a raw hand into ["AK", "QJ", …] + suit letter
  function extractCards(rawHand: unknown): string[] {
    let s = '';
    if (typeof rawHand === 'string') s = rawHand;
    else if (Array.isArray(rawHand)) s = rawHand.join(' ');
    const segments = s.split('.');
    const cards: string[] = [];
    segments.forEach((seg, i) => {
      const tokens = Array.from(seg.matchAll(/(10|[AKQJT2-9x])/g)).map(m => m[1]);
      tokens.forEach(tok => cards.push(tok + suitLetters[i]));
    });
    return cards;
  }

  // Collect cards
  const allCards: string[] = [];
  const perHand: Record<string, string[]> = {};
  for (const dir of ['N','E','S','W'] as const) {
    const arr = extractCards(raw[dir]);
    perHand[dir] = arr;
    allCards.push(...arr);
  }

  // Rule: ≤ 52 cards total
  if (allCards.length > 52) {
    errors.push({ hand: 'N', index: -1, card: '', message: 'Deal must not exceed 52 cards.' });
  }

  // Rule: no duplicates (except wildcards 'x')
  const seen = new Set<string>();
  for (const dir of ['N','E','S','W'] as const) {
    perHand[dir].forEach((card, idx) => {
      const rank = card.slice(0, -1);
      if (rank.toLowerCase() === 'x') return;
      if (seen.has(card)) {
        errors.push({ hand: dir, index: idx, card, message: 'Duplicate card in deal.' });
      } else {
        seen.add(card);
      }
    });
  }

  return { isValid: errors.length === 0, errors };
}