<script lang="ts">
  type Suit = 's' | 'h' | 'd' | 'c';
  const props = $props<{ value: Suit }>();

  const suitMap = {
    s: { symbol: '♠', colorClass: 'text-black', name: 'Spades' },
    h: { symbol: '♥', colorClass: 'text-red-600', name: 'Hearts' },
    d: { symbol: '♦', colorClass: 'text-red-600', name: 'Diamonds' },
    c: { symbol: '♣', colorClass: 'text-black', name: 'Clubs' }
  } as const;

  const suit = $derived(() => {
    return suitMap[props.value as Suit] ?? { symbol: '?', colorClass: 'text-gray-400', name: 'Unknown' };
  });
</script>

<span class={`font-semibold ${suit().colorClass}`} title={suit().name}>
  {suit().symbol}
</span>