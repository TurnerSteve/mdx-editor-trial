<!-- $lib/components/HandComponent.svelte -->
<script lang="ts">
	import SuitSymbol from './SuitSymbol.svelte';
	const { value, label } = $props() as { value: string; label?: string };

	// Parse hand string, e.g. "AKQJ.543.AKQ.42"
	const suits = (value ?? '').split('.');
	while (suits.length < 4) suits.push('');

	const [spades, hearts, diamonds, clubs] = suits;
</script>

<div class="w-28 rounded-md border bg-gray-50 shadow text-left">
	{#if label}
		<div class="bg-gray-200 text-sm font-semibold px-2 py-1 rounded-t-md">
			{label}
		</div>
	{/if}
	<div class="flex flex-col gap-1 text-lg font-mono p-2">
		<div class="flex items-center gap-1">
			<SuitSymbol value="s" />
			<span>{spades}</span>
		</div>
		<div class="flex items-center gap-1 text-red-500">
			<SuitSymbol value="h" />
			<span>{hearts}</span>
		</div>
		<div class="flex items-center gap-1 text-red-500">
			<SuitSymbol value="d" />
			<span>{diamonds}</span>
		</div>
		<div class="flex items-center gap-1">
			<SuitSymbol value="c" />
			<span>{clubs}</span>
		</div>
	</div>
</div>