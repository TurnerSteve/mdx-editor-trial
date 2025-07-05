// src/lib/markdown/validators/validateBids.ts
// import type { ValidationResult } from './types';

// export function validateBids(params: Record<string, string>): ValidationResult {
//   if (!params.seq) {
//     return { isValid: false, errors: ['Missing "seq" field.'] };
//   }
//   return { isValid: true, errors: [] };
// }


import type { ValidationResult } from './types';

const BID_REGEX = /^(?:[1-7](?:C|D|H|S|NT)|P|X|XX|-)$/;

export function validateBids(params: Record<string, string>): ValidationResult {
  const seq = params.seq;
  if (!seq) {
    return { isValid: false, errors: ['Missing "seq" field.'] };
  }

  const bids = seq.trim().split(/\s+/);
  const errors: string[] = [];

  // Rule: all tokens must match allowed patterns
  bids.forEach((bid, i) => {
    if (!BID_REGEX.test(bid)) {
      errors.push(`Invalid bid "${bid}" at position ${i + 1}`);
    }
  });

  // Rule: max 3 skips
  const skipCount = bids.filter((bid) => bid === '-').length;
  if (skipCount > 3) {
    errors.push(`Too many skips (found ${skipCount}, max 3 allowed)`);
  }

  // Rule: max 3 passes in a row
  for (let i = 0; i <= bids.length - 3; i++) {
    if (bids[i] === 'P' && bids[i + 1] === 'P' && bids[i + 2] === 'P') {
      errors.push(`Three consecutive passes starting at position ${i + 1}`);
    }
  }

  // Contract progression rules
  let lastLevel = 0;
  let lastSuit = '';
  let lastContractIndex = -1;

  for (let i = 0; i < bids.length; i++) {
    const bid = bids[i];

    if (/^[1-7](C|D|H|S|NT)$/.test(bid)) {
      const level = parseInt(bid[0]);
      const suit = bid.slice(1);

      if (level < lastLevel || (level === lastLevel && suitOrder(suit) <= suitOrder(lastSuit))) {
        errors.push(`Bid "${bid}" at position ${i + 1} is not strictly increasing`);
      }

      lastLevel = level;
      lastSuit = suit;
      lastContractIndex = i;
    }

    if (bid === 'X') {
      if (lastContractIndex !== i - 1) {
        errors.push(`Double at position ${i + 1} must follow a contract bid`);
      }
    }

    if (bid === 'XX') {
      if (bids[i - 1] !== 'X') {
        errors.push(`Redouble at position ${i + 1} must follow a double`);
      }
    }

    if (bid === 'P') {
      if (i === 0 || !isPlayable(bids[i - 1])) {
        errors.push(`Pass at position ${i + 1} must follow a contract, double, or redouble`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function suitOrder(suit: string): number {
  return { C: 1, D: 2, H: 3, S: 4, NT: 5 }[suit] ?? 0;
}

function isPlayable(bid: string): boolean {
  return /^[1-7](C|D|H|S|NT)$/.test(bid) || bid === 'X' || bid === 'XX';
}