// src/lib/markdown/parseParams.ts
import type { ParsedComponent } from '$lib/types';

export function parseParams(raw: string, line = 0): ParsedComponent {
	const parts = raw.trim().split(/\s+/);
	const [typeAndMaybeId, ...rest] = parts;

	const [type, id] = typeAndMaybeId.split(':');

	const params: Record<string, string> = {};
	let currentKey = '';
	let currentValue: string[] = [];

	for (const token of rest) {
		if (token.includes(':')) {
			if (currentKey) {
				params[currentKey] = currentValue.join(' ');
			}
			const [key, ...valueParts] = token.split(':');
			currentKey = key;
			currentValue = [valueParts.join(':')];
		} else {
			currentValue.push(token);
		}
	}
	if (currentKey) {
		params[currentKey] = currentValue.join(' ');
	}

	return {
		kind: 'component',
		type,
		...(id ? { id } : {}),
		...params,
		line
	};
}