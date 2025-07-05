// src/lib/markdown/validators/index.ts
import type { ValidatorFn } from './types';

import { validateHand } from './validateHand';
import { validateDeal } from './validateDeal';
import { validateBids } from './validateBids';

export const componentValidators: Record<string, ValidatorFn> = {
  hand: validateHand,
  deal: validateDeal,
  bids: validateBids,
};

export type { ValidatorFn, ValidationResult } from './types';
