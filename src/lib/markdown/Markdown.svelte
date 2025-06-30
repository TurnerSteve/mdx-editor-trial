<script lang="ts">
	import { md } from './markdownParser';
	import { hydrateCustomTags } from './hydrate';
	import { onMount } from 'svelte';

	let containerEl: HTMLElement;

	const state = $state({
		markdown: `---
		# Hello world\n\nThis is a suit: {{suit: heart}}\n\nAnd a deal:\n{{deal:N:AKQJ.543.AKQ.42 E:T987.2.76.T9876 W:643.9876.JT98.KQ S:52.AKQJT.5432.3}}`,
		renderedHtml: ''
	});

	$effect(() => {
		// console.log('Effect is running');
		const html = md.render(state.markdown);
		// console.log('RENDERED HTML:', html);
		state.renderedHtml = html;
	});

	onMount(() => {
		hydrateCustomTags(containerEl);
	});
</script>

<textarea
	bind:value={state.markdown}
	rows="10"
	class="w-full rounded border border-gray-300 p-3 font-mono"
></textarea>

<div bind:this={containerEl} class="prose mt-4 max-w-none">
	{@html state.renderedHtml}
</div>
