<script lang="ts">
	import type { ParsedBlock } from '$lib/types';

	import SuitSymbol from '$lib/components/SuitSymbol.svelte';
	import DealComponent from '$lib/components/DealComponent.svelte';
	import HandComponent from '$lib/components/HandComponent.svelte';
	import BidsComponent from '$lib/components/BidsComponent.svelte';
	import UnknownCommand from '$lib/components/UnknownCommand.svelte';

	export let blocks: ParsedBlock[];

	const componentMap = {
		suit: SuitSymbol,
		deal: DealComponent,
		hand: HandComponent,
		bids: BidsComponent
	} as const;
</script>

<div>
	{#each blocks as block (block.key)}
		<div class="mb-1">
			{#if block.kind === 'text'}
				<div>{block.content}</div>
			{:else}
				{@const Component = componentMap[block.type as keyof typeof componentMap] ?? UnknownCommand}
				<Component value={block.value ?? ''} />
			{/if}
		</div>
	{/each}
</div>