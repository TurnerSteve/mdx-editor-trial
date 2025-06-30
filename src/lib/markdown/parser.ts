// src/lib/markdown/parser.ts
import type { ParsedBlock } from '../types';

export function parseMarkdownText(mdText: string): ParsedBlock[] {
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
			const parts = raw.split(':');
			const type = parts[0]?.trim().toLowerCase();
			const value = parts.slice(1).join(':').trim();

			blocks.push({
				kind: 'component',
				type,
				value,
				key: `component-${key++}`,
				line: lineNumber
			});

			lastIndex = (match.index ?? 0) + match[0].length;
		}

		const after = line.slice(lastIndex);
		if (after) {
			blocks.push({
				kind: 'text',
				content: after,
				key: `text-${key++}`,
				line: lineNumber
			});
		}

		if (matches.length === 0 && !line.trim()) {
			blocks.push({
				kind: 'text',
				content: '',
				key: `text-${key++}`,
				line: lineNumber
			});
		}
	}

	return blocks;
}