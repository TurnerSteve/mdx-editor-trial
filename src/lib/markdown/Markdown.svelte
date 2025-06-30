<script lang="ts">
	import { md } from './markdownParser';
	import { hydrateCustomTags } from './hydrate';
	import { onMount } from 'svelte';
	import demoMd from '$lib/tests/Test4.svx?raw';

	let containerEl: HTMLElement;

	const state = $state({
		markdown: demoMd,
		renderedHtml: ''
	});

	$effect(() => {
		const html = md.render(state.markdown);
		state.renderedHtml = html;
		console.log(state.renderedHtml);
	});

	onMount(() => {
		hydrateCustomTags(containerEl);
	});
</script>


<div class="flex h-screen gap-6 p-6 bg-gray-50">
  <!-- Markdown input -->
  <textarea
    bind:value={state.markdown}
    rows="10"
    class="
      w-1/2 h-full
      p-4
      font-mono
      border-2 border-gray-300
      rounded-xl
      focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-600
      transition
      resize-none
      bg-white
      shadow-sm
    "
  ></textarea>

  <!-- Preview -->
  <div
    bind:this={containerEl}
    class="
      w-1/2 h-full
      p-6
      prose max-w-none
      bg-white
      border-2 border-gray-300
      rounded-xl
      shadow-sm
      overflow-auto
    "
  >
    {@html state.renderedHtml}
  </div>
</div>
