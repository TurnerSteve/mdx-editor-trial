// src/lib/bridge/parseBids.ts
export type ParsedBid = string;

export function parseBids(input: string): ParsedBid[] {
  return input
    .split(/\s+/)
    .filter(Boolean);
}