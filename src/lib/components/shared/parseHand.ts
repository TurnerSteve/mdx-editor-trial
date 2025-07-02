// src/lib/components/shared/parseHand.ts

import type { ParsedHand, Direction } from "$lib/types";

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