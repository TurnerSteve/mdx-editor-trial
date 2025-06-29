<!-- $lib/markdown/Markdown.svelte -->
<script lang="ts">
	import { parseMarkdownTokens, validateMarkdownFromBlocks } from '$lib/markdown/renderer';
	import Renderer from '$lib/components/Renderer.svelte';

	const state = $state({
		markdown: `{{suit: heart}} {{deal}} {{unknown}} {{deal:}} {{:valueOnly}}`,
		parsedBlocks: [] as ReturnType<typeof parseMarkdownTokens>,
		issues: [] as ReturnType<typeof validateMarkdownFromBlocks>,
		charCount: 0
	});

	$effect(() => {
		const blocks = parseMarkdownTokens(state.markdown);
		state.parsedBlocks = blocks;
		state.issues = validateMarkdownFromBlocks(blocks); // New function we add below
		state.charCount = state.markdown.length;
	});
</script>

<!-- Full container -->
<div class="flex flex-col gap-2">
	<!-- Editor + Preview side-by-side -->
	<div
		class="flex flex-col gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-md md:flex-row"
	>
		<!-- Editor -->
		<textarea
			bind:value={state.markdown}
			rows="20"
			class="w-full resize-none rounded-lg border border-gray-300 p-3 font-mono text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-1/2"
			placeholder="Type markdown with &#123;&#123;suit: heart&#125;&#125; or other custom tags..."
		></textarea>
		<!--  Renderer  -->
		<Renderer blocks={state.parsedBlocks} />
	</div>

	<div class="pr-2 text-right text-sm text-gray-500">
		Character count: {state.charCount}
	</div>

	{#if state.issues.length}
		<div class="mt-2 border-l-4 border-yellow-400 bg-yellow-50 p-3 text-sm text-yellow-800">
			<strong>Warnings:</strong>
			<ul class="mt-1 list-disc pl-5">
				{#each state.issues as issue}
					<li>
						{issue.line !== undefined ? `Line ${issue.line + 1}: ` : ''}
						{issue.message} — <code>{issue.token}</code>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

