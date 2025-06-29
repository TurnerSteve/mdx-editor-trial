
<!-- $lib/components/SuitSymbol.svelte -->
<script lang="ts" >
  import type { ComponentBlockProps } from '$lib/types';
  const { value }: ComponentBlockProps = $props();

  const symbols = {
    heart: '♥',
    diamond: '♦',
    club: '♣',
    spade: '♠',
  };

  const lowerValue = value?.toLowerCase() as keyof typeof symbols | undefined;
  const symbol = lowerValue && symbols[lowerValue] ? symbols[lowerValue] : '?';
  const colorClass = ['heart', 'diamond'].includes(lowerValue ?? '')
    ? 'text-red-500'
    : 'text-black';
</script>

<span class={`text-base ${colorClass}`} aria-label={`Suit symbol: ${symbol}`}>
  {symbol}
</span>