// src/lib/types.ts
export type ParsedBlock = TextBlock | ComponentBlock;

export type TextBlock = {
	kind: 'text';
	content: string;
	key: string;
	line?: number;
};

export type ComponentBlock = {
	kind: 'component';
	type: string;
	value?: string;
	key: string;
	line?: number;
};

export type ComponentBlockProps = {
	value?: string;
};