
<!-- $lib/components/SuitSymbol.svelte -->
<script lang="ts">

 const { value }  = $props() ;

  const symbols = {
    h: '♥',
    heart: '♥',
    d: '♦',
    diamond: '♦',
    c: '♣',
    club: '♣',
    s: '♠',
    spade: '♠'
  };

  const lower = value.toLowerCase();
  const symbol = symbols[lower as keyof typeof symbols] ?? '?';
  const color = ['h', 'heart', 'd', 'diamond'].includes(lower) ? 'text-red-500' : 'text-black';
</script>

<span class={`text-lg ${color}`} aria-label={value}>{symbol}</span>
