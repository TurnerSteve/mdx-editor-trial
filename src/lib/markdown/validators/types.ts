// src/lib/markdown/validators/types.ts

/**
 * A generic validation result: 
 *  - `T` is the shape of each error (string for simple validators, 
 *    a richer object for bids, hands, deals, etc.)
 */
export interface ValidationResult<T = string> {
  isValid: boolean;   // true if no errors
  errors: T[];        // array of errors of type T
}

/**
 * A validator function takes a map of named parameters (e.g. `{ bids: string[] }`)
 * and returns a ValidationResult whose `errors` array elements are of type `T`.
 */
export type ValidatorFn<T = string> = (
  params: Record<string, unknown>
) => ValidationResult<T>;
