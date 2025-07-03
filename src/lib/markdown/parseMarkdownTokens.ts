import type { ParsedBlock, KnownComponentType } from '$lib/types';

const knownTypes = new Set<KnownComponentType>(['hand', 'deal', 'bids']);

export function parseMarkdownTokens(mdText: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  let key = 0;

  const lines = mdText.split('\n');

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber];
    const matches = [...line.matchAll(/\{\{(.*?)\}\}/g)];
    let lastIndex = 0;

    for (const match of matches) {
      const before = line.slice(lastIndex, match.index);
      if (before) {
        blocks.push({
          kind: 'text',
          content: before,
          key: `text-${key++}`,
          line: lineNumber
        });
      }

      const raw = match[1].trim();

      // Split on first colon to get type and rest
      const colonIndex = raw.indexOf(':');
      let type: string;
      let restStr = '';
      if (colonIndex >= 0) {
        type = raw.slice(0, colonIndex).toLowerCase();
        restStr = raw.slice(colonIndex + 1).trim();
      } else {
        type = raw.toLowerCase();
      }

      // If not a known type, treat entire tag as text
      if (!knownTypes.has(type as KnownComponentType)) {
        blocks.push({
          kind: 'text',
          content: match[0],
          key: `text-${key++}`,
          line: lineNumber,
        });
        lastIndex = (match.index ?? 0) + match[0].length;
        continue;
      }

      // Split restStr on ';' or ',' or whitespace for params
      // Here we'll support 'key:value' or 'key=value' pairs, or just positional value as first token

      const params: Record<string, string> = {};
      let value = '';
      if (restStr) {
        const parts = restStr.split(/[,;]\s*|\s+/).filter(Boolean);
        if (parts.length > 0) {
          value = parts[0];
          for (let i = 1; i < parts.length; i++) {
            const [k, v] = parts[i].split(/[:=]/);
            if (k && v) params[k.trim()] = v.trim();
          }
        }
      }

      blocks.push({
        kind: 'component',
        type: type as KnownComponentType,
        value,
        key: `component-${key++}`,
        line: lineNumber,
        label: params.label,
        ...params,
      });

      lastIndex = (match.index ?? 0) + match[0].length;
    }

    const after = line.slice(lastIndex);
    if (after) {
      blocks.push({ kind: 'text', content: after, key: `text-${key++}`, line: lineNumber });
    }

    if (matches.length === 0 && !line.trim()) {
      blocks.push({ kind: 'text', content: '', key: `text-${key++}`, line: lineNumber });
    }
  }

  return blocks;
}