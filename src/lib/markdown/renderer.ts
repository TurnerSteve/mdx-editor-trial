// $lib/markdown/renderer.ts
import type { ParsedBlock } from '../types';

import SuitSymbol from '$lib/components/SuitSymbol.svelte';
import DealComponent from '$lib/components/DealComponent.svelte';
import HandComponent from '$lib/components/HandComponent.svelte';
import BidsComponent from '$lib/components/BidsComponent.svelte';

import UnknownCommand from '$lib/components/UnknownCommand.svelte';

type ComponentConstructor =
	| typeof SuitSymbol
	| typeof DealComponent
	| typeof HandComponent
	| typeof BidsComponent;

const components: Record<string, ComponentConstructor> = {
	suit: SuitSymbol,
	deal: DealComponent,
	hand: HandComponent,
	bids: BidsComponent
};

export function parseMarkdownTokens(mdText: string): ParsedBlock[] {
	const blocks: ParsedBlock[] = [];
	let key = 0;

	const lines = mdText.split('\n');

	for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
		const line = lines[lineNumber];

		// Match only well-formed {{...}} with at least one non-} character
		const matches = [...line.matchAll(/\{\{([^}]+?)\}\}/g)];
		let lastIndex = 0;

		for (const match of matches) {
			// Text before the match
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

			// Check for malformed content (missing colon)
			if (!raw.includes(':')) {
				blocks.push({
					kind: 'text',
					content: match[0],
					key: `text-${key++}`,
					line: lineNumber
				});
				lastIndex = (match.index ?? 0) + match[0].length;
				continue;
			}

			const [typeRaw, ...rest] = raw.split(':');
			const type = typeRaw.trim().toLowerCase();
			const value = rest.join(':').trim();

			blocks.push({
				kind: 'component',
				type,
				value,
				key: `component-${key++}`,
				line: lineNumber,
				raw
			});

			lastIndex = (match.index ?? 0) + match[0].length;
		}

		// Remaining text after last match
		const after = line.slice(lastIndex);
		if (after) {
			blocks.push({
				kind: 'text',
				content: after,
				key: `text-${key++}`,
				line: lineNumber
			});
		}

		// If no matches and the line was empty, still record it
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

export function getComponent(type: string) {
	const component = components[type as keyof typeof components];
	if (!component && import.meta.env.DEV) {
		console.warn(`[Renderer] Unknown component type: "${type}"`);
	}
	return component ?? UnknownCommand;
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
			const token = `{{${block.type}:${block.value ?? ''}}}`;

			// Case: missing type
			if (!block.type) {
				issues.push({
					message: 'Malformed token: missing type',
					line: block.line,
					token
				});
				continue;
			}

			// Case: missing value
			if (!block.value && !allowEmptyValue.has(block.type)) {
				issues.push({
					message: 'Malformed token: missing value',
					line: block.line,
					token
				});
				continue;
			}

			// Case: malformed structure like multiple colons
			if ((block.raw.match(/:/g)?.length ?? 0) > 1) {
				issues.push({
					message: 'Malformed token: too many colons',
					line: block.line,
					token
				});
				continue;
			}

			// Case: unknown component
			if (!(block.type in components)) {
				issues.push({
					message: `Unknown component type: "${block.type}"`,
					line: block.line,
					token
				});
			}
		}
	}

	return issues;
}