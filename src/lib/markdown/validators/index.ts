// File: src/lib/markdown/validators/index.ts

import type { ValidatorFn, ValidationResult } from './types';
import { validateHand } from './validateHand';
import { validateDeal } from './validateDeal';
import { validateBidsSequence } from './validateBids';
import type { BidError } from './validateBids';

/**
 * Adapter: wraps validateBidsSequence to match the ValidatorFn<BidError> signature.
 */
const validateBids: ValidatorFn<BidError> = (
  params
): ValidationResult<BidError> => {
  // Coerce params.bids to string array
  const raw = params.bids;
  const seq: string[] = Array.isArray(raw) ? raw.map((x) => String(x)) : [];

  // Run the core validator
  const { isLegal, errors } = validateBidsSequence(seq);

  return {
    isValid: isLegal,
    errors
  };
};

/**
 * Map of all component validators keyed by name.
 */
export const componentValidators: {
  hand: ValidatorFn<string>;
  deal: ValidatorFn<string>;
  bids: ValidatorFn<BidError>;
} = {
  hand: validateHand,
  deal: validateDeal,
  bids: validateBids
};

export type { ValidatorFn, ValidationResult } from './types';