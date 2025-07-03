<script lang="ts">
  const props = $props<{ value: 's' | 'h' | 'd' | 'c' }>();

  const suit = $derived(() => {
    const map = {
      s: { symbol: '♠', colorClass: 'text-black', name: 'Spades' },
      h: { symbol: '♥', colorClass: 'text-red-600', name: 'Hearts' },
      d: { symbol: '♦', colorClass: 'text-red-600', name: 'Diamonds' },
      c: { symbol: '♣', colorClass: 'text-black', name: 'Clubs' }
    } as const;

    // Assert that the key is valid
    return map[props.value as keyof typeof map];
  });
</script>

<span
  aria-label={suit().name}
  title={suit().name}
  class={`font-semibold ${suit().colorClass}`}
>
  {suit().symbol}
</span>