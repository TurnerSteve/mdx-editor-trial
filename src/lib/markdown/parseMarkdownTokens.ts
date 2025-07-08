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
		const rawParams = paramStr;
		const params = parseParams(paramStr);

		// Only handle known component types
		if (!['hand', 'deal', 'bids'].includes(typeStr)) {
			blocks.push({
				kind: 'component',
				type: typeStr,
				id: params.id || `auto-id-${i}`,
				label: params.label || '',
				line: i + 1,
				rawParams,
				isValid: false,
				errors: ['Unknown component type.']
			} as ParsedComponent);
			continue;
		}
		const type = typeStr as keyof typeof componentValidators;
		const validator = componentValidators[type];
		const validation = validator(params);

		const id = params.id || `auto-id-${i}`;
		const label = params.label || '';

		// If it fails the basic validation, emit immediately
		if (!validation.isValid) {
			// ✂️ CHANGED: even on invalid syntax, emit the full component block with its props
			if (type === 'hand') {
				blocks.push({
					kind: 'component',
					type: 'hand',
					id,
					label,
					line: i + 1,
					rawParams,
					isValid: false,
					errors: validation.errors,
					cards: params.cards // pass the raw cards string/array
				} as ParsedBlock);
			} else if (type === 'deal') {
				// build the hands object (N/E/S/W) even if invalid
				const hands: Record<'N' | 'E' | 'S' | 'W', string> = { N: '', E: '', S: '', W: '' };
				for (const d of ['N', 'E', 'S', 'W'] as const) {
					if (params[d]) hands[d] = params[d] as string;
				}
				blocks.push({
					kind: 'component',
					type: 'deal',
					id,
					label,
					line: i + 1,
					rawParams,
					isValid: false,
					errors: validation.errors,
					hands // pass the raw hands mapping
				} as ParsedBlock);
			} else if (type === 'bids') {
				blocks.push({
					kind: 'component',
					type: 'bids',
					id,
					label,
					line: i + 1,
					rawParams,
					isValid: false,
					errors: validation.errors,
					seq: params.seq // pass the raw seq array
				} as ParsedBlock);
			}
			continue; // now skip the “valid” branch below
		}

		// Now push the fully-typed block for each component
		if (type === 'hand') {
			// cards can be string or array
			const raw = params.cards;
			const cards = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw : '';
			blocks.push({
				kind: 'component',
				type,
				id,
				label,
				line: i + 1,
				isValid: true,
				errors: validation.errors.map((e) => (typeof e === 'string' ? e : e.message)),
				cards
			} as ParsedComponent);
		} else if (type === 'deal') {
			// Each direction N/E/S/W must be string; ignore others
			const hands: Record<'N' | 'E' | 'S' | 'W', string> = { N: '', E: '', S: '', W: '' };
			for (const dir of ['N', 'E', 'S', 'W'] as const) {
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
				errors: validation.errors.map((e) => (typeof e === 'string' ? e : e.message)),
				hands
			} as ParsedComponent);
		} else if (type === 'bids') {
			const raw = params.seq;
			const seq =
				typeof raw === 'string'
					? raw.trim().split(/\s+/)
					: Array.isArray(raw)
						? raw.map((x) => String(x))
						: [];
			blocks.push({
				kind: 'component',
				type,
				id,
				label,
				line: i + 1,
				isValid: true,
				errors: validation.errors.map((e) => (typeof e === 'string' ? e : e.message)),
				seq
			} as ParsedComponent);
		}
	}

	return blocks;
}
