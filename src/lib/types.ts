// src/lib/types.ts
// Common base for all components
// src/lib/types.ts

export type ComponentType = 'hand' | 'deal' | 'bids';

export interface ParsedComponentBase {
  kind: 'component';
  id: string;
  type: ComponentType;
  label: string;
  line: number;
}

export interface HandComponentParams extends ParsedComponentBase {
  type: 'hand';
  cards: string; // e.g. "T987.6.5432.AKQJ"
}

export interface DealComponentParams extends ParsedComponentBase {
  type: 'deal';
  hands: Partial<Record<'N' | 'E' | 'S' | 'W', string>>;
}

export interface BidsComponentParams extends ParsedComponentBase {
  type: 'bids';
  seq: string; // bids sequence as string
}

export type ParsedComponent = HandComponentParams | DealComponentParams | BidsComponentParams;

export interface TextBlock {
  kind: 'text';
  content: string;
  line: number;
  key: string;
}

export type ParsedBlock = TextBlock | ParsedComponent;
