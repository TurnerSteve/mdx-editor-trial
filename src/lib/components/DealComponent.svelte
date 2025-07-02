<!-- $lib/components/DealComponent.svelte -->
<script lang="ts">
  import DealView from './DealView.svelte';
  import type { Hand } from '$lib/types';

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

<DealView hands = {hands} />
