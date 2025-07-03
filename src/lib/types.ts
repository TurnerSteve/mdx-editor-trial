// src/lib/types.ts
export type Suit = 'S' | 'H' | 'D' | 'C';
export type Direction = 'N' | 'E' | 'S' | 'W';

export interface ParsedHand {
  direction?: Direction;
  cards: string;
  suits: string[];
}
export type ParsedBid = string;
export type ParsedBlock = TextBlock | ComponentBlock;

export type TextBlock = {
	kind: 'text';
	content: string;
	key: string;
	line?: number;
};

export type ComponentBlock = {
	kind: 'component';
	type: string;
	value: string;
	key: string;
	line: number;
	[key: string]: unknown; // optional wildcard if supporting multiple arbitrary props
};

export type ComponentBlockProps = {
	value?: string;
};

export type Hand = {
  spades: string;   // e.g. "AKQJ"
  hearts: string;   // e.g. "T987"
  diamonds: string; // e.g. "5432"
  clubs: string;    // e.g. "42"
};

export type DealString = string;  // raw string representation of the deal, e.g. "N:AKQJ..."

