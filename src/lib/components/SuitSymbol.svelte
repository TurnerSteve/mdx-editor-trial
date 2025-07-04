
<!-- SuitSymbol.svelte -->
<script lang="ts">
  const props = $props<{ value: 's' | 'h' | 'd' | 'c' }>();

  const suitMap = {
    s: { symbol: '♠', colorClass: 'text-black', name: 'Spades' },
    h: { symbol: '♥', colorClass: 'text-red-600', name: 'Hearts' },
    d: { symbol: '♦', colorClass: 'text-red-600', name: 'Diamonds' },
    c: { symbol: '♣', colorClass: 'text-black', name: 'Clubs' }
  } as const;

  type SuitKey = keyof typeof suitMap;

  const suit = $derived(() => {
    const key = props.value as SuitKey;
    return suitMap[key] ?? { symbol: '?', colorClass: '', name: 'Unknown' };
  });
</script>