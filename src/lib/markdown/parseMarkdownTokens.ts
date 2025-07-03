import type { ParsedBlock } from '../types';

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
        blocks.push({ kind: 'text', content: before, key: `text-${key++}`, line: lineNumber });
      }

      const raw = match[1].trim();

      // Match type:value at start (greedy until first space or end)
      const typeValueMatch = raw.match(/^([^\s]+)(?:\s+(.*))?$/);
      if (!typeValueMatch) {
        // fallback, treat whole as type, no value
        blocks.push({
          kind: 'component',
          type: raw.toLowerCase(),
          value: '',
          key: `component-${key++}`,
          line: lineNumber,
        });
        lastIndex = (match.index ?? 0) + match[0].length;
        continue;
      }

      const typeAndValue = typeValueMatch[1]; // like "hand:AKQJ.543.AKQ.42"
      const paramStr = typeValueMatch[2]; // like "label=North"

      // Split type and value on first colon:
      const colonIndex = typeAndValue.indexOf(':');
      let type = '';
      let value = '';
      if (colonIndex >= 0) {
        type = typeAndValue.slice(0, colonIndex).toLowerCase();
        value = typeAndValue.slice(colonIndex + 1);
      } else {
        type = typeAndValue.toLowerCase();
        value = '';
      }

      // Parse key=value parameters if paramStr exists
      const params: Record<string, string> = {};
      if (paramStr) {
        const parts = paramStr.trim().split(/\s+/);
        for (const part of parts) {
          const [k, v] = part.split('=');
          if (k && v) params[k] = v;
        }
      }

      blocks.push({
        kind: 'component',
        type,
        value,
        key: `component-${key++}`,
        line: lineNumber,
        ...params,
      });

      console.log(`[parse Tokens]: type=${type}, value="${value}", params=${JSON.stringify(params)}`);
      
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