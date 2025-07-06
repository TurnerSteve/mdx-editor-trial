export interface Bid {
  raw: string;
  type: 'skip' | 'pass' | 'contract' | 'dbl' | 'rdbl' | 'invalid';
  level?: number;
  suit?: 'C' | 'D' | 'H' | 'S' | 'NT';
}

export function parseBidSequence(seq: string): Bid[] {
  const tokens = seq.trim().split(/\s+/);

  return tokens.map((token) => {
    const raw = token.toUpperCase();

    if (raw === '-') {
      return { raw, type: 'skip' };
    }

    if (raw === 'P') {
      return { raw, type: 'pass' };
    }

    if (raw === 'X') {
      return { raw, type: 'dbl' };
    }

    if (raw === 'XX') {
      return { raw, type: 'rdbl' };
    }

    const match = raw.match(/^([1-7])(C|D|H|S|NT)$/);
    if (match) {
      const level = parseInt(match[1]);
      const suit = match[2] as Bid['suit'];
      return { raw, type: 'contract', level, suit };
    }

    return { raw, type: 'invalid' };
  });
}