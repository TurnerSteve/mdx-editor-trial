// src/lib/markdown/validators/validateDeal.ts
import type { ValidationResult } from './types';

export function validateDeal(
  params: Record<string, unknown>             // ⬅️ broadened
): ValidationResult<string> {
  void String(params.deal ?? '');
  // … your existing logic …
  const errors: string[] = [];

  return {
    isValid: errors.length === 0,
    errors
  };
}