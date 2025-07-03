<!-- $lib/components/DealComponent.svelte -->
<script lang="ts">
  import type { Hand } from '$lib/types';
	import HandComponent from './HandComponent.svelte';

  const { value } = $props<{ value: string }>();

  function parseDeal(dealStr: string): Record<'N' | 'E' | 'S' | 'W', Hand> {
    const emptyHand: Hand = { spades: '', hearts: '', diamonds: '', clubs: '' };

    const hands = {
      N: { ...emptyHand },
      E: { ...emptyHand },
      S: { ...emptyHand },
      W: { ...emptyHand }
    } satisfies Record<'N' | 'E' | 'S' | 'W', Hand>;

    const parts = dealStr.trim().split(/\s+/);
    for (const part of parts) {
      const [dir, cards] = part.split(':');
      if (!dir || !cards || !(dir in hands)) continue;

      const [spades = '', hearts = '', diamonds = '', clubs = ''] = cards.split('.');
      hands[dir as 'N' | 'E' | 'S' | 'W'] = { spades, hearts, diamonds, clubs };
    }

    return hands;
  }

  const hands = parseDeal(value);
</script>

<div
	class="relative mx-auto min-h-[26rem] max-w-xl rounded-2xl border border-gray-300 bg-white p-4"
>
	<!-- North -->
	<div class="absolute top-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
		<HandComponent
			label="North"
			value={`${hands.N.spades}.${hands.N.hearts}.${hands.N.diamonds}.${hands.N.clubs}`}
		/>
	</div>

	<!-- South -->
	<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
		<HandComponent
			label="South"
			value={`${hands.S.spades}.${hands.S.hearts}.${hands.S.diamonds}.${hands.S.clubs}`}
		/>
	</div>

	<!-- West -->
	<div class="absolute top-1/2 left-4 flex -translate-y-1/2 flex-col items-center">
		<HandComponent
			label="West"
			value={`${hands.W.spades}.${hands.W.hearts}.${hands.W.diamonds}.${hands.W.clubs}`}
		/>
	</div>

	<!-- East -->
	<div class="absolute top-1/2 right-4 flex -translate-y-1/2 flex-col items-center">
		<HandComponent
			label="East"
			value={`${hands.E.spades}.${hands.E.hearts}.${hands.E.diamonds}.${hands.E.clubs}`}
		/>
	</div>

	<!-- Center box with spacing -->
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<div class="h-[7rem] w-[7rem]"></div>
	</div>
</div>
