<script lang="ts">
	import { onMount } from 'svelte';
	import { parseMarkdownText } from '$lib/markdown/parser';
	import Renderer from '$lib/components/Renderer.svelte';
	import type { ParsedBlock } from '$lib/types';

	let markdown = `# Welcome!

This is a test of custom commands:

- Suit: {{suit:heart}}
- Deal: {{deal:N:AKQJ.543.AKQ.42 E:T987.2.76.T9876 W:643.9876.JT98.KQ S:52.AKQJT.5432.3}}
- Hand: {{hand:AKQJ}}
- Bids: {{bids:1♣ 1♦ 2♠ 3NT}}

End of test.
`;

	let blocks: ParsedBlock[] = [];

	function updateBlocks() {
		blocks = parseMarkdownText(markdown);
	}

	onMount(() => {
		updateBlocks();
	});
</script>

<div class="flex flex-col md:flex-row gap-4 p-4">
	<textarea
		bind:value={markdown}
		on:input={updateBlocks}
		class="w-full md:w-1/2 h-96 border rounded p-2 font-mono"
	></textarea>

	<div class="w-full md:w-1/2 border rounded p-4 bg-white overflow-auto">
		<Renderer {blocks} />
	</div>
</div>