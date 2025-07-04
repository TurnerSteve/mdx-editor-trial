<script lang="ts">
	import { md }  from './markdownIt'
	import { hydrateCustomTags } from './hydrate';
	import demoMd from '$lib/tests/Test0.svx?raw';
	import { onMount, tick } from 'svelte';

	let containerEl: HTMLElement;

	const state = $state({
		markdown: demoMd,
		renderedHtml: ''
	});

	let previousHtml = '';

	$effect(() => {
		const html = md.render(state.markdown);

		if (html !== previousHtml) {
			state.renderedHtml = html;
			previousHtml = html;

			queueMicrotask(() => {
				hydrateCustomTags(containerEl);
			});
		}
	});

	onMount(async () => {
		await tick(); // wait for DOM to update
		hydrateCustomTags(containerEl);
	});
</script>

<div class="flex h-screen gap-6 bg-gray-50 p-6">
	<!-- Markdown input -->
	<textarea
		bind:value={state.markdown}
		rows="10"
		class="
      h-full w-1/2
      resize-none
      rounded-xl
      border-2 border-gray-300
      bg-white
      p-4 font-mono shadow-sm transition
      focus:border-green-600
      focus:ring-4
      focus:ring-green-400
      focus:outline-none
    "
	></textarea>

	<!-- Preview -->
	<div
		bind:this={containerEl}
		class="
      prose h-full
      w-1/2
      max-w-none overflow-auto
      rounded-xl
      border-2 border-gray-300
      bg-white
      p-6
      shadow-sm
    "
	>
		{@html state.renderedHtml}
	</div>
</div>
