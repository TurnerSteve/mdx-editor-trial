<script lang="ts">
	import MarkdownRenderer from '$lib/markdown/MarkdownRenderer.svelte';

	// Import all test markdown files
	const files = import.meta.glob('$lib/tests/*.md', {
		query: '?raw',
		import: 'default'
	});

	// Runes state
	let selected = $state('bids1.md');
	let markdownText = $state('');

	// Derived list of available test files
	let filenames = $derived(() =>
		Object.keys(files)
			.map((path) => path.split('/').pop()!)
			.sort()
	);

	console.log('[Available files]', Object.keys(files));
	// Load the selected file content whenever it changes
	$effect(() => {
		const id = selected;
		const fullPath = Object.keys(files).find((path) => path.endsWith(`/${id}`));
		const loader = fullPath ? files[fullPath] : undefined;

		if (loader) {
			loader().then((mod) => {
				const text = mod as string;
				markdownText = text;
			});
		} 
	});
</script>

<select
	class="mb-4 rounded border border-gray-300 px-2 py-1"
	onchange={(e) => (selected = (e.target! as HTMLSelectElement).value)}
>
	{#each filenames() as name}
		<option value={name} selected={name === selected}>{name}</option>
	{/each}
</select>

<MarkdownRenderer {markdownText} />
