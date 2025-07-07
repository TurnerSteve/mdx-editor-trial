// src/lib/markdown/validators/validateHand.ts
import type { ValidationResult } from './types';

export function validateHand(
  params: Record<string, unknown>             // ⬅️ broadened from Record<string,string>
): ValidationResult<string> {
  // ⬅️ pull out the raw string and coerce
  void String(params.hand ?? '');

  // … your existing parsing/validation logic on rawHand …
  const errors: string[] = [];
  // if (invalid) errors.push('some message');

  return {
    isValid: errors.length === 0,
    errors
  };
}