// src/lib/markdown/validators/validateDeal.ts
import type { ValidationResult } from './types';

export function validateDeal(params: Record<string, string>): ValidationResult {
  const requiredDirs = ['N', 'E', 'S', 'W'];
  const missing = requiredDirs.filter(dir => !params[dir]);
  return missing.length
    ? { isValid: false, errors: [`Missing hands for: ${missing.join(', ')}`] }
    : { isValid: true, errors: [] };
}