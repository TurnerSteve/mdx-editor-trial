// src/lib/types.ts

// Supported component types
export type ComponentType = 'hand' | 'deal' | 'bids';



////////////////////////////////////////////////////////////////////////
// Base interface for any parsed component block
////////////////////////////////////////////////////////////////////////
export interface ParsedComponentBase {
  [prop: string]: unknown;
  kind: 'component';
  id: string;
  type: ComponentType;          // ← now restricted to our known components
  label: string;
  line: number;
  rawParams: string;
  isValid?: boolean;
  errors?: string[];
}

////////////////////////////////////////////////////////////////////////
// Hand component params
////////////////////////////////////////////////////////////////////////
export interface HandComponentParams extends ParsedComponentBase {
  type: 'hand';  
  /** 
   * Raw cards as a string or array of strings.
   * Was previously only `string`; now supports `string[]` as well.
   */
  cards: string | string[];
}

////////////////////////////////////////////////////////////////////////
// Deal component params
////////////////////////////////////////////////////////////////////////
export interface DealComponentParams extends ParsedComponentBase {
  type: 'deal';
  /**
   * Mapping of directions to raw hand strings.
   * Explicitly Partial so you can omit missing hands.
   */
  hands: Partial<Record<'N' | 'E' | 'S' | 'W', string>>;
}

////////////////////////////////////////////////////////////////////////
// Bids component params
////////////////////////////////////////////////////////////////////////
export interface BidsComponentParams extends ParsedComponentBase {
  type: 'bids';
  /**
   * Sequence of bids as an array of strings.
   * Changed from `string` to `string[]` to match our normalized format.
   */
  seq: string[];
}

////////////////////////////////////////////////////////////////////////
// Union of all component blocks
////////////////////////////////////////////////////////////////////////
export type ParsedComponent =
  | HandComponentParams
  | DealComponentParams
  | BidsComponentParams;

////////////////////////////////////////////////////////////////////////
// Plain-text block
////////////////////////////////////////////////////////////////////////
export interface TextBlock {
  kind: 'text';
  content: string;
  line: number;
  key: string;
}

////////////////////////////////////////////////////////////////////////
// Any parsed block
////////////////////////////////////////////////////////////////////////
export type ParsedBlock = TextBlock | ParsedComponent;