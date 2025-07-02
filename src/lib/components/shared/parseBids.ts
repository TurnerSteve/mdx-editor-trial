// src/lib/bridge/parseBids.ts
import type { ParsedBid } from "$lib/types";

export function parseBids(input: string): ParsedBid[] {
  return input
    .split(/\s+/)
    .filter(Boolean);
}