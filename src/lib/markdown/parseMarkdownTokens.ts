
// src/lib/markdown/parseMarkdownTokens.ts
import type { ParsedBlock, ParsedComponent } from '$lib/types';

interface RawComponentData {
  id: string;
  type: string;
  label: string;
  [key: string]: string;
}

function parseParams(paramStr: string): RawComponentData {
  // Parses param string like "id:foo label:MyHand cards:T987.6.5432.AKQJ"
  const result: RawComponentData = { id: '', type: '', label: '' };
  const parts = paramStr.trim().split(/\s+/);
  for (const part of parts) {
    const [key, ...rest] = part.split(':');
    if (!key) continue;
    const value = rest.join(':'); // join in case ':' in value
    if (key === 'id' || key === 'label' || key === 'cards' || key === 'seq' || key === 'type') {
      result[key] = value;
    } else if (['N', 'E', 'S', 'W'].includes(key)) {
      // For deal hands
      result[key] = value;
    }
  }
  return result;
}

export function parseMarkdownTokens(markdownText: string): ParsedBlock[] {
  const lines = markdownText.split('\n');
  const blocks: ParsedBlock[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const componentMatch = line.match(/^\{\{(\w+):(.+)\}\}$/);
    if (componentMatch) {
      const type = componentMatch[1];
      const paramStr = componentMatch[2].trim();

      // parse parameters
      const params = parseParams(paramStr);
      const id = params.id || `auto-id-${i}`;
      const label = params.label || '';

      // Build strongly typed component based on type
      let component: ParsedComponent | null = null;

      if (type === 'hand') {
        if (!params.cards) {
          console.warn(`hand component missing cards at line ${i + 1}`);
          continue;
        }
        component = {
          kind: 'component',
          id,
          type: 'hand',
          label,
          line: i + 1,
          cards: params.cards
        };
      } else if (type === 'deal') {
        // Collect hands N/E/S/W cards
        const hands: Partial<Record<'N' | 'E' | 'S' | 'W', string>> = {};
        for (const dir of ['N', 'E', 'S', 'W'] as const) {
          if (params[dir]) hands[dir] = params[dir];
        }
        component = {
          kind: 'component',
          id,
          type: 'deal',
          label,
          line: i + 1,
          hands
        };
      } else if (type === 'bids') {
        if (!params.seq) {
          console.warn(`bids component missing seq at line ${i + 1}`);
          continue;
        }
        component = {
          kind: 'component',
          id,
          type: 'bids',
          label,
          line: i + 1,
          seq: params.seq
        };
      } else {
        // Unknown component type — skip or handle as needed
        continue;
      }

      if (component) blocks.push(component);
    } else {
      // Plain text block
      blocks.push({
        kind: 'text',
        content: line,
        line: i + 1,
        key: `text-${i}`
      });
    }
  }
  return blocks;
}
