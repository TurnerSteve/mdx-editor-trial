// src/lib/markdown/parseMarkdownTokens.ts
import type { ParsedBlock, ParsedComponent } from '$lib/types';
import { parseParams } from './parseParams';
import { componentValidators } from './validators';

export function parseMarkdownTokens(markdownText: string): ParsedBlock[] {
  const lines = markdownText.split('\n');
  const blocks: ParsedBlock[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^\{\{(\w+):(.+)\}\}$/);
    if (!m) {
      blocks.push({
        kind: 'text',
        content: line,
        line: i + 1,
        key: `text-${i}`
      });
      continue;
    }

    const typeStr = m[1];
    const paramStr = m[2].trim();
    const params = parseParams(paramStr);

    // Only handle known component types
    if (!['hand','deal','bids'].includes(typeStr)) {
      blocks.push({
        kind: 'component',
        type: typeStr,
        id: params.id || `auto-id-${i}`,
        label: params.label || '',
        line: i + 1,
        isValid: false,
        errors: ['Unknown component type.']
      } as ParsedComponent);
      continue;
    }
    const type = typeStr as keyof typeof componentValidators;
    const validator = componentValidators[type];
    const validation = validator(params);

    const id    = params.id    || `auto-id-${i}`;
    const label = params.label || '';

    // If it fails the basic validation, emit immediately
    if (!validation.isValid) {
      blocks.push({
        kind: 'component',
        type,
        id,
        label,
        line: i + 1,
        isValid: false,
        errors: validation.errors.map(e => typeof e === 'string' ? e : e.message)
      } as ParsedComponent);
      continue;
    }

    // Now push the fully-typed block for each component
    if (type === 'hand') {
      // cards can be string or array
      const raw = params.cards;
      const cards = typeof raw === 'string'
        ? raw
        : Array.isArray(raw)
          ? raw
          : '';
      blocks.push({
        kind: 'component',
        type,
        id,
        label,
        line: i + 1,
        isValid: true,
        errors: validation.errors.map(e => typeof e === 'string' ? e : e.message),
        cards
      } as ParsedComponent);
    } else if (type === 'deal') {
      // Each direction N/E/S/W must be string; ignore others
      const hands: Record<'N'|'E'|'S'|'W', string> = { N: '', E: '', S: '', W: '' };
      for (const dir of ['N','E','S','W'] as const) {
        const val = params[dir];
        hands[dir] = typeof val === 'string' ? val : '';
      }
      blocks.push({
        kind: 'component',
        type,
        id,
        label,
        line: i + 1,
        isValid: true,
        errors: validation.errors.map(e => typeof e === 'string' ? e : e.message),
        hands
      } as ParsedComponent);
    } else if (type === 'bids') {
      const raw = params.seq;
      const seq = typeof raw === 'string'
        ? raw.trim().split(/\s+/)
        : Array.isArray(raw)
          ? raw.map(x => String(x))
          : [];
      blocks.push({
        kind: 'component',
        type,
        id,
        label,
        line: i + 1,
        isValid: true,
        errors: validation.errors.map(e => typeof e === 'string' ? e : e.message),
        seq
      } as ParsedComponent);
    }
  }

  return blocks;
}