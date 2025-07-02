import { parseHand } from "./parseHand";

import type { Direction } from "$lib/types";

export interface ParsedHand {
  direction?: Direction;
  cards: string;
  suits: string[];
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