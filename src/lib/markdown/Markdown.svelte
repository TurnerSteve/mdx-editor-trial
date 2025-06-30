<script lang="ts">
	import { md } from './markdownParser';
	import { hydrateCustomTags } from './hydrate';
	import { onMount } from 'svelte';
	import demoMd from '$lib/tests/Test0.svx?raw'

	let containerEl: HTMLElement;

	const state = $state({
		markdown: demoMd,
		renderedHtml: ''
	});

	$effect(() => {
		console.log('Effect is running');
		const html = md.render(state.markdown);
		console.log('RENDERED HTML:', html);
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
	<pre class="mt-2 overflow-auto bg-gray-100 p-2 text-xs">
</pre>
	{@html state.renderedHtml}
</div>
