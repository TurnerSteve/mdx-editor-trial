import type { ParsedBlock } from '$lib/types';
import { parseParams } from './parseParams';
import { componentValidators } from './validators';

export function parseMarkdownTokens(markdownText: string): ParsedBlock[] {
  const lines = markdownText.split('\n');
  const blocks: ParsedBlock[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const componentMatch = line.match(/^\{\{(\w+):(.+)\}\}$/);

    if (componentMatch) {
      const type = componentMatch[1];
      const paramStr = componentMatch[2].trim();
      const params = parseParams(paramStr);

      const validator = componentValidators[type];
      const validation = validator?.(params) ?? { isValid: false, errors: ['Unknown component type.'] };

      const id = params.id || `auto-id-${i}`;
      const label = params.label || '';

      if (!validation.isValid) {
        blocks.push({
          kind: 'component',
          type,
          id,
          label,
          line: i + 1,
          isValid: false,
          errors: validation.errors,
        } as ParsedBlock);
        continue;
      }

      if (type === 'hand') {
        blocks.push({
          kind: 'component',
          type: 'hand',
          id,
          label,
          line: i + 1,
          isValid: true,
          cards: params.cards,
        });
      } else if (type === 'deal') {
        const hands: Record<string, string> = {};
        for (const dir of ['N', 'E', 'S', 'W']) {
          if (params[dir]) hands[dir] = params[dir];
        }
        blocks.push({
          kind: 'component',
          type: 'deal',
          id,
          label,
          line: i + 1,
          isValid: true,
          hands,
        });
      } else if (type === 'bids') {
        blocks.push({
          kind: 'component',
          type: 'bids',
          id,
          label,
          line: i + 1,
          isValid: true,
          seq: params.seq,
        });
      }
    } else {
      blocks.push({
        kind: 'text',
        content: line,
        line: i + 1,
        key: `text-${i}`,
      });
    }
  }

  return blocks;
}