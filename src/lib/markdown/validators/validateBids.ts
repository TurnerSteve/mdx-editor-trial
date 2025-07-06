// src/lib/markdown/validators/validateBids.ts
import type { ValidationResult } from './types';

type Bid = {
  level?: number;           // 1-7 for contract bids, undefined for P, X, XX, or dash
  suit?: string;            // C, D, H, S, NT for contract bids, undefined otherwise
  raw: string;              // original bid string
};

const SUIT_ORDER = ['C', 'D', 'H', 'S', 'NT'];

function parseBid(raw: string): Bid | null {
  raw = raw.toUpperCase();
  if (raw === 'P' || raw === 'PASS') return { raw };
  if (raw === 'X') return { raw };
  if (raw === 'XX') return { raw };
  if (raw === '-') return { raw };

  // Match contract bids like 1C, 3NT etc.
  const match = raw.match(/^([1-7])(C|D|H|S|NT)$/);
  if (!match) return null;

  return {
    level: parseInt(match[1], 10),
    suit: match[2],
    raw
  };
}

export function validateBids(params: Record<string, string>): ValidationResult {
  const seqRaw = params.seq ?? '';
  if (!seqRaw.trim()) {
    return { isValid: false, errors: ['Missing "seq" field or empty sequence.'] };
  }

  const tokens = seqRaw.trim().split(/\s+/);
  const bids: Bid[] = [];

  // Parse all bids
  for (const t of tokens) {
    const bid = parseBid(t);
    if (!bid) return { isValid: false, errors: [`Invalid bid token: "${t}"`] };
    bids.push(bid);
  }

  const errors: string[] = [];

  // Rule 1: Up to 3 dashes only at start
  let dashCount = 0;
  for (const bid of bids) {
    if (bid.raw === '-') dashCount++;
    else break;
  }
  if (dashCount > 3) errors.push('No more than 3 dashes allowed at the start.');

  // Validate sequence rules
  let consecutivePasses = 0;
  let auctionEnded = false;

  // Track last contract bid level and suit for ordering
  let lastLevel = 0;
  let lastSuitIndex = -1;

  // Track last bid index of contract bid for double checks
  let lastContractBidIndex = -1;
  // Track last double index
  let lastDoubleIndex = -1;

  for (let i = 0; i < bids.length; i++) {
    if (auctionEnded) {
      errors.push(`No bids allowed after three consecutive passes at position ${i + 1}.`);
      break;
    }

    const bid = bids[i];
    const r = bid.raw;

    if (r === 'P') {
      consecutivePasses++;
      if (consecutivePasses === 3) {
        auctionEnded = true;
      }
      continue;
    } else {
      consecutivePasses = 0;
    }

    if (r === '-') {
      // Dashes allowed only at start, already checked dashCount, ignore here
      continue;
    }

    if (r === 'X') {
      // Rule 5: double allowed only immediately after a contract bid or 1-2 passes after contract bid
      if (
        lastContractBidIndex === -1 ||
        i - lastContractBidIndex > 3
      ) {
        errors.push(`Double (X) at position ${i + 1} must follow a contract bid or up to 2 passes after it.`);
      }
      lastDoubleIndex = i;
      continue;
    }

    if (r === 'XX') {
      // Rule 6: redouble allowed only after a double or up to 2 passes after double
      if (
        lastDoubleIndex === -1 ||
        i - lastDoubleIndex > 3
      ) {
        errors.push(`Redouble (XX) at position ${i + 1} must follow a double or up to 2 passes after it.`);
      }
      continue;
    }

    // Now must be a contract bid, check ordering and increment
    if (bid.level === undefined || !bid.suit) {
      errors.push(`Invalid contract bid at position ${i + 1}: "${r}".`);
      continue;
    }

    if (bid.level < lastLevel) {
      errors.push(`Contract bid level must not decrease at position ${i + 1}.`);
    } else if (bid.level === lastLevel) {
      // same level: suit must be higher than last suit
      if (lastSuitIndex >= 0 && SUIT_ORDER.indexOf(bid.suit) <= lastSuitIndex) {
        errors.push(`Suit must increase within same level at position ${i + 1}.`);
      }
    } else {
      // level increased, reset lastSuitIndex
      lastSuitIndex = -1;
    }

    lastLevel = bid.level;
    lastSuitIndex = SUIT_ORDER.indexOf(bid.suit);
    lastContractBidIndex = i;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}