<script lang="ts">
	import HandView from './HandComponent.svelte';

	const props = $props<{
		hands: Partial<Record<'N' | 'E' | 'S' | 'W', string>>;
		label?: string;
	}>();

	const directionLabels = {
		N: 'North',
		E: 'East',
		S: 'South',
		W: 'West'
	};
</script>

<div class="deal-grid rounded-xl border-2 border-green-300 bg-white p-4 font-mono text-sm shadow-sm">
	{#if props.label}
		<div
			class="col-span-3 mb-2 rounded-t-md bg-gray-100 py-1 text-center font-semibold text-gray-700"
		>
			{props.label}
		</div>
	{/if}

	<!-- North -->
	<div class="col-start-2 row-start-1 flex flex-col items-center">
		{#if props.hands.N}

			<HandView cards={props.hands.N} label={directionLabels.N} />
		{/if}
	</div>

	<!-- West -->
	<div class="col-start-1 row-start-2 flex flex-col items-end ml-2">
		{#if props.hands.W}
			<HandView cards={props.hands.W} label={directionLabels.W} />
		{/if}
	</div>

	<!-- East -->
	<div class="col-start-3 row-start-2 flex flex-col items-start">
		{#if props.hands.E}

			<HandView cards={props.hands.E} label={directionLabels.E} />
		{/if}
	</div>

	<!-- South -->
	<div class="col-start-2 row-start-3 flex flex-col items-center">
		{#if props.hands.S}
			<HandView cards={props.hands.S} label={directionLabels.S} />
		{/if}
	</div>
</div>

<style>
	.deal-grid {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: auto auto auto;
		gap: 0rem;
		width: max-content;
		margin: 0rem;
    padding: 0rem
	}
</style>
