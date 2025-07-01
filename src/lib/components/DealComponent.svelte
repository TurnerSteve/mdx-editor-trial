<script lang="ts">
  import DealView from './DealView.svelte';
  import type { Hand } from '$lib/types';

  const { value } = $props() as { value: string };

  function parseDeal(dealStr: string): Record<'N' | 'E' | 'S' | 'W', Hand> {
    const emptyHand: Hand = { spades: '', hearts: '', diamonds: '', clubs: '' };
    const hands: Record<'N' | 'E' | 'S' | 'W', Hand> = {
      N: { ...emptyHand },
      E: { ...emptyHand },
      S: { ...emptyHand },
      W: { ...emptyHand }
    };

    const parts = dealStr.trim().split(/\s+/);

    parts.forEach(part => {
      const [dir, cards] = part.split(':');
      if (!dir || !cards) return;
      if (!(dir in hands)) return;

      const suits = cards.split('.');
      hands[dir as keyof typeof hands] = {
        spades: suits[0] ?? '',
        hearts: suits[1] ?? '',
        diamonds: suits[2] ?? '',
        clubs: suits[3] ?? ''
      };
    });

    return hands;
  }

  const hands = parseDeal(value);
</script>

<DealView {hands} />