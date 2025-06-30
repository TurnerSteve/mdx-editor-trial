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
			const [typeRaw, ...rest] = raw.split(':');
			const type = typeRaw.trim().toLowerCase();
			const value = rest.join(':').trim();

			blocks.push({ kind: 'component', type, value, key: `component-${key++}`, line: lineNumber });

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

export type MarkdownIssue = {
	message: string;
	line?: number;
	token: string;
};

const allowEmptyValue = new Set(['deal', 'hand']);

export function validateMarkdownFromBlocks(blocks: ParsedBlock[]): MarkdownIssue[] {
	const issues: MarkdownIssue[] = [];

	for (const block of blocks) {
		if (block.kind === 'component') {
			if (!block.type) {
				issues.push({ message: 'Malformed token: missing type', line: block.line, token: `{{${block.type ?? ''}:${block.value ?? ''}}}` });
				continue;
			}

			if (!block.value && !allowEmptyValue.has(block.type)) {
				issues.push({ message: 'Malformed token: missing value', line: block.line, token: `{{${block.type}:${block.value ?? ''}}}` });
				continue;
			}
		}
	}

	return issues;
}