// src/lib/markdown/validators/validateBids.ts
import type { ValidationResult } from './types';

export function validateBids(params: Record<string, string>): ValidationResult {
  if (!params.seq) {
    return { isValid: false, errors: ['Missing "seq" field.'] };
  }
  return { isValid: true, errors: [] };
}