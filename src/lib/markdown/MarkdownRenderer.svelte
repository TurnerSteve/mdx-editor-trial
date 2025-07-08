<script lang="ts">
	import type {
		BidsComponentParams,
		DealComponentParams,
		HandComponentParams,
		ParsedBlock,
		ParsedComponent
	} from '$lib/types';
	import { parseMarkdownTokens } from '$lib/markdown/parseMarkdownTokens';
	import HandComponent from '$lib/components/HandComponent.svelte';
	import DealComponent from '$lib/components/DealComponent.svelte';
	import BidsComponent from '$lib/components/BidsComponent.svelte';
	import UnknownCommand from '$lib/components/UnknownCommand.svelte';
	import MarkdownIt from 'markdown-it';
	import { parseBidSequence } from '$lib/markdown/validators/parseBidSequence';
	import { validateDeal } from './validators/validateDeal';

	const props = $props<{ markdownText: string }>();

	const md = new MarkdownIt({
		html: false,
		breaks: true,
		linkify: true
	});

	const componentsMap = {
		hand: HandComponent,
		deal: DealComponent,
		bids: BidsComponent
	} as const;

	type ComponentType = keyof typeof componentsMap;

	type RenderBlock = ParsedBlock & {
		key: string;
		Comp?:
			| typeof HandComponent
			| typeof DealComponent
			| typeof BidsComponent
			| typeof UnknownCommand;
		isValid?: boolean;
		errors?: string[];
		parsedBids?: ReturnType<typeof parseBidSequence>; // 👈 added
	};

	const blocks = $derived(() => parseMarkdownTokens(props.markdownText ?? ''));

	const renderedBlocks = $derived(() =>
		blocks().map((block, index): RenderBlock => {
			// if (block.kind === 'component' && block.type === 'bids') {
			// 	console.log('Parsed Bids Block:', block);
			// }
			let dynamicPart = '';
			if (block.kind === 'component') {
				// HAND
				if (block.type === 'hand') {
					const handBlock = block as HandComponentParams;
					dynamicPart = String(handBlock.cards);
				}
				// DEAL
				else if (block.type === 'deal') {
					const dealBlock = block as DealComponentParams;
				}
				// BIDS
				else if (block.type === 'bids') {
					const bidsBlock = block as BidsComponentParams;
					dynamicPart = (bidsBlock.seq || []).join(',');
				}
			}

			// Build a base key from block kind, position, and raw props
			const parts = [
				'block', 
				block.kind, 
				block.line, 
				index,  
				(block as ParsedComponent).rawParams, 
				(block as ParsedComponent).isvalid ? 'valid' : 'invalid',
				((block as ParsedComponent).errors ?? []).join('|')
			];

			// if (block.kind === 'component' && block.type === 'deal') {
			// 	// ✂️ CHANGED: run live validation here instead of using parse-time flags
			// 	const dealBlock = block as DealComponentParams;
			// 	const liveResult = validateDeal(dealBlock.hands ?? {});
			// 	parts.push(liveResult.isValid ? 'valid' : 'invalid');
			// 	parts.push(`errs${liveResult.errors.length}`);
			// }

			const key = parts.join('-');

			const Comp =
				block.kind === 'component' && block.type && componentsMap[block.type as ComponentType]
					? componentsMap[block.type as ComponentType]
					: UnknownCommand;

			return {
				...block,
				key,
				Comp
			};
		})
	);

	// Type guard for component blocks
	function isComponentBlock(block: ParsedBlock): block is ParsedComponent {
		return block.kind === 'component';
	}
</script>

<div class="markdown-renderer">
	{#each renderedBlocks() as block(block.key) }
		{#if block.kind === 'text'}
			<p>{@html md.render(block.content)}</p>
		{:else if isComponentBlock(block) && block.type === 'hand'}
			<div spellcheck="false">
				<HandComponent cards={block.cards ?? ''} label={block.label ?? ''} />
			</div>
			{#if !block.isValid}
				<ul class="validation-errors mt-1 mb-2 text-sm text-red-600">
					{#each block.errors ?? [] as err}
						<li>{err}</li>
					{/each}
				</ul>
			{/if}
		{:else if isComponentBlock(block) && block.type === 'deal'}
			<div spellcheck="false">
				<DealComponent
					N={block.hands?.N || ''}
					E={block.hands?.E || ''}
					S={block.hands?.S || ''}
					W={block.hands?.W || ''}
					label={block.label || ''}
				/>
			</div>
		{:else if isComponentBlock(block) && block.type === 'bids'}
			<!-- {@html console.log('Rendering BidsComponent with:', block.seq)} -->
			<BidsComponent seq={block.seq ?? []} label={block.label ?? ''} />
			{#if !block.isValid}
				<ul class="validation-errors mt-1 mb-2 text-sm text-red-600">
					{#each block.errors ?? [] as err}
						<li>{err}</li>
					{/each}
				</ul>
			{/if}
		{:else if isComponentBlock(block)}
			<UnknownCommand type={(block as ParsedComponent).type ?? 'unknown'} />
		{/if}
	{/each}
</div>

<style>
	.validation-errors {
		padding-left: 1rem;
	}
	/* Ensure component wrappers sit inline and align to top */
	.markdown-renderer > div {
		display: inline-block;
		vertical-align: top;
	}

	.validation-errors {
		color: #b91c1c;
		padding-left: 1rem;
	}
</style>
