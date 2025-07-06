<script lang="ts">
	import MarkdownRenderer from '$lib/markdown/MarkdownRenderer.svelte';
	import demoMd from '$lib/tests/demoDealBids.md?raw';

	// Runes reactive state for the markdown text input
	let markdownText = $state(demoMd);

	// No need for extra derived or effects here,
	// MarkdownRenderer internally parses and renders reactively
</script>

<div class="flex h-screen gap-6 bg-gray-50 p-6">
	<!-- Markdown Editor (left) -->
	<textarea
		spellcheck="false"
		bind:value={markdownText}
		rows="10"
		class="w-1/2 resize-none rounded-xl border-2 border-gray-300 bg-white p-4 font-mono shadow-sm focus:border-green-600 focus:ring-4 focus:ring-green-400 focus:outline-none"
	></textarea>

	<!-- Markdown Preview (right) -->
	<div
		class="prose w-1/2 max-w-none overflow-auto rounded-xl border-2 border-gray-300 bg-white p-6 shadow-sm"
	>
		<MarkdownRenderer {markdownText} />
	</div>
</div>
