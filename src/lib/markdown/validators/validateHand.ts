// src/lib/markdown/validators/validateHand.ts
import type { ValidationResult } from './types';

export function validateHand(params: Record<string, string>): ValidationResult {
  if (!params.cards) {
    return { isValid: false, errors: ['Missing "cards" field.'] };
  }
  return { isValid: true, errors: [] };
}