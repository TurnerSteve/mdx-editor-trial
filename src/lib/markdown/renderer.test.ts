// src/lib/markdown/renderer.test.ts
import { describe, it, expect } from 'vitest';
import { parseMarkdownTokens, validateMarkdownFromBlocks } from './renderer';

describe('validateMarkdownFromBlocks', () => {
	it('accepts valid component tokens', () => {
		const markdown = `{{suit:♠}} {{deal}} {{hand:AKQ}} {{bids:1♣ 1♦}}`;
		const blocks = parseMarkdownTokens(markdown);
		const issues = validateMarkdownFromBlocks(blocks);
		expect(issues).toHaveLength(0);
	});

	it('warns on missing type', () => {
		const blocks = parseMarkdownTokens('{{:valueOnly}}');
		const issues = validateMarkdownFromBlocks(blocks);
		expect(issues).toHaveLength(1);
		expect(issues[0].message).toMatch(/missing type/i);
		expect(issues[0].token).toBe('{{:valueOnly}}');
	});

	it('warns on missing value', () => {
		const blocks = parseMarkdownTokens('{{suit:}}');
		const issues = validateMarkdownFromBlocks(blocks);
		expect(issues).toHaveLength(1);
		expect(issues[0].message).toMatch(/missing value/i);
		expect(issues[0].token).toBe('{{suit:}}');
	});

	it('allows empty value for "deal"', () => {
		const blocks = parseMarkdownTokens('{{deal:}}');
		const issues = validateMarkdownFromBlocks(blocks);
		expect(issues).toHaveLength(0);
	});

	it('warns on unknown component type', () => {
		const blocks = parseMarkdownTokens('{{foo:bar}}');
		const issues = validateMarkdownFromBlocks(blocks);
		expect(issues).toHaveLength(1);
		expect(issues[0].message).toMatch(/unknown component type/i);
		expect(issues[0].token).toBe('{{foo:bar}}');
	});

	it('warns on extra colons', () => {
		const blocks = parseMarkdownTokens('{{suit::heart}}');
		const issues = validateMarkdownFromBlocks(blocks);
		expect(issues).toHaveLength(1);
		expect(issues[0].message).toMatch(/too many colons/i);
		expect(issues[0].token).toBe('{{suit::heart}}');
	});
});