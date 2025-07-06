export type ComponentType = 'hand' | 'deal' | 'bids';

export interface ParsedComponentBase {
  kind: 'component';
  id: string;
  type: ComponentType | string;
  label: string;
  line: number;
  isValid?: boolean;
  errors?: string[];
}

export interface HandComponentParams extends ParsedComponentBase {
  type: 'hand';
  cards: string;
}

export interface DealComponentParams extends ParsedComponentBase {
  type: 'deal';
  hands: Partial<Record<'N' | 'E' | 'S' | 'W', string>>;
}

export interface BidsComponentParams extends ParsedComponentBase {
  type: 'bids';
  seq: string;
}

export type ParsedComponent = HandComponentParams | DealComponentParams | BidsComponentParams ;

export interface TextBlock {
  kind: 'text';
  content: string;
  line: number;
  key: string;
}

export type ParsedBlock = TextBlock | ParsedComponent;