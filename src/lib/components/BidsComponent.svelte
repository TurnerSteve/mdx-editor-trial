<!-- src/lib/components/BidsComponent.svelte -->
<script lang="ts">
	const { value } = $props() ;
	import { parseBids } from "./shared/parseBids";

	const bids = parseBids(value ?? '');
</script>

<div class="flex gap-2 flex-wrap text-sm">
	{#each bids as bid}
		<span class="rounded border px-2 py-1 bg-gray-100 dark:bg-gray-800">
			{bid}
		</span>
	{/each}
</div>