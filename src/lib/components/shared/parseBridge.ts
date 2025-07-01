// src/lib/components/shared/parseBridge.ts

export type Suit = 'S' | 'H' | 'D' | 'C';
export type Direction = 'N' | 'E' | 'S' | 'W';

export interface ParsedHand {
  direction?: Direction;
  cards: string;
  suits: string[];
}

export function parseHand(input: string): ParsedHand {
  const trimmed = input.trim();
  const parts = trimmed.split(':');

  let direction: Direction | undefined;
  let cards = parts[0];

  if (parts.length === 2) {
    direction = parts[0] as Direction;
    cards = parts[1];
  }

  const suits = cards.split('.');

  return {
    direction,
    cards,
    suits
  };
}

export function parseDeal(input: string): Record<Direction, ParsedHand> {
  const hands = input.split(/\s+/);
  const result = {} as Record<Direction, ParsedHand>;

  for (const h of hands) {
    const [dir, rest] = h.split(':');
    if (!rest) continue;
    result[dir as Direction] = parseHand(`${dir}:${rest}`);
  }

  return result;
}