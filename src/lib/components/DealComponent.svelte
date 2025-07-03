<script lang="ts">
	import HandComponent from './HandComponent.svelte';

	const props = $props<{ value: string; label?: string }>();

	type Hand = { spades: string; hearts: string; diamonds: string; clubs: string };
	type Deal = Record<'N' | 'E' | 'S' | 'W', Hand>;

	const hands = $derived((): Deal => {
		const empty: Hand = { spades: '', hearts: '', diamonds: '', clubs: '' };
		const result: Deal = { N: { ...empty }, E: { ...empty }, S: { ...empty }, W: { ...empty } };

		const parts = (props.value ?? '').trim().split(/\s+/);
		for (const part of parts) {
			const [dirRaw, cards] = part.split(':');
			const dir = dirRaw as keyof Deal;
			if (!dir || !cards || !(dir in result)) continue;

			const [spades = '', hearts = '', diamonds = '', clubs = ''] = cards.split('.');
			result[dir] = { spades, hearts, diamonds, clubs };
		}
		return result;
	});
</script>

<div
	class="relative mx-auto min-h-[26rem] max-w-xl rounded-2xl border border-gray-300 bg-white p-4"
>
	{#if props.label}
		<div class="mb-2 font-semibold">{props.label}</div>
	{/if}

	<!-- North -->
	<div class="absolute top-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
		<HandComponent
			label="North"
			value={`${hands().N.spades}.${hands().N.hearts}.${hands().N.diamonds}.${hands().N.clubs}`}
		/>
	</div>

	<!-- South -->
	<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
		<HandComponent
			label="South"
			value={`${hands().S.spades}.${hands().S.hearts}.${hands().S.diamonds}.${hands().S.clubs}`}
		/>
	</div>

	<!-- West -->
	<div class="absolute top-1/2 left-4 flex -translate-y-1/2 flex-col items-center">
		<HandComponent
			label="West"
			value={`${hands().W.spades}.${hands().W.hearts}.${hands().W.diamonds}.${hands().W.clubs}`}
		/>
	</div>

	<!-- East -->
	<div class="absolute top-1/2 right-4 flex -translate-y-1/2 flex-col items-center">
		<HandComponent
			label="East"
			value={`${hands().E.spades}.${hands().E.hearts}.${hands().E.diamonds}.${hands().E.clubs}`}
		/>
	</div>

	<!-- Center -->
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<div class="h-[7rem] w-[7rem]"></div>
	</div>
</div>
