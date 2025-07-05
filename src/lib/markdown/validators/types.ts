// src/lib/markdown/validators/types.ts
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export type ValidatorFn = (params: Record<string, string>) => ValidationResult;