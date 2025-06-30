
<!-- $lib/components/SuitSymbol.svelte -->
<script lang="ts">
  const { value } = $props();

  const symbols = {
    heart: '♥',
    diamond: '♦',
    club: '♣',
    spade: '♠',
  };

  const lower = value.toLowerCase();
  const symbol = symbols[lower as keyof typeof symbols] ?? '?';
  const color = ['heart', 'diamond'].includes(lower) ? 'text-red-500' : 'text-black';
</script>

<span class={`text-lg ${color}`}>{symbol}</span>
