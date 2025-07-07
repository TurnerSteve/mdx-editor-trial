// File: src/lib/validators/validateBids.ts

/**
 * Represents a validation error for a specific bid in the sequence.
 */
export type BidError = {
  index: number;    // ⬅️ position of the invalid bid in the sequence
  bid: string;      // ⬅️ the offending bid string
  message: string;  // ⬅️ description of why it's invalid
};

/**
 * Outcome of validating an entire bidding sequence.
 */
export interface BidsValidationResult {
  isLegal: boolean;     // ⬅️ true if no errors were found
  errors: BidError[];   // ⬅️ list of validation errors
}

/**
 * Validate a sequence of bridge bids for legality according to standard rules.
 * @param seq Array of bid strings (e.g. ['1S','P','2H','X','P','XX'])
 * @returns Structured result with any errors and a boolean flag.
 */
export function validateBidsSequence(seq: string[]): BidsValidationResult {
  const errors: BidError[] = [];
  let consecutivePasses = 0;
  let auctionClosed = false;
  let lastContractLevel: number | null = null;
  let lastContractSuitOrder: number | null = null;

  // Suit ordering for contract bids
  const suitOrder: Record<string, number> = { C: 1, D: 2, H: 3, S: 4, NT: 5 };

  seq.forEach((bid, i) => {
    if (auctionClosed) {
      // ⬅️ change: no bids allowed after 3 consecutive passes
      errors.push({ index: i, bid, message: 'No bids allowed after auction closed.' });
      return;
    }

    if (bid === 'P') {
      // ⬅️ preserved: handle passes and detect auction close
      consecutivePasses++;
      if (consecutivePasses === 3) auctionClosed = true;
      return;
    }

    // ⬅️ reset pass counter on any non-pass
    consecutivePasses = 0;

    if (bid === 'X') {
      // ⬅️ change: double only valid after at least one contract bid
      if (lastContractLevel === null) {
        errors.push({ index: i, bid, message: 'Double only valid after a contract bid.' });
      }
      return;
    }

    if (bid === 'XX') {
      // ⬅️ change: redouble only valid immediately after a double
      if (seq[i - 1] !== 'X') {
        errors.push({ index: i, bid, message: 'Redouble only valid immediately after a double.' });
      }
      return;
    }

    // ⬅️ handle actual contract bids (level + suit)
    const match = /^([1-7])(C|D|H|S|NT)$/.exec(bid);
    if (!match) {
      errors.push({ index: i, bid, message: 'Invalid contract format.' });
      return;
    }

    const level = +match[1];
    const suit = match[2];
    const order = suitOrder[suit];

    if (lastContractLevel === null) {
      // ⬅️ first contract sets baseline
      lastContractLevel = level;
      lastContractSuitOrder = order;
    } else {
      // ⬅️ ensure strictly increasing in level or suit
      if (
        level < lastContractLevel ||
        (level === lastContractLevel && order <= (lastContractSuitOrder ?? 0))
      ) {
        errors.push({ index: i, bid, message: 'Bids must increase in level or suit.' });
      } else {
        lastContractLevel = level;
        lastContractSuitOrder = order;
      }
    }
  });

  return {
    isLegal: errors.length === 0,  // ⬅️ overall legality flag
    errors                       // ⬅️ structured list of any errors
  };
}