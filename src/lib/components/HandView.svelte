<script lang="ts">
  const { hand } = $props(); // hand is a string like "AKQJ.543.AKQ.42"

  // Split into suits
  const suits = hand.split('.');

  // Suit order for display and symbols
  const suitOrder = ['s', 'h', 'd', 'c'];
  const suitNames = { s: 'Spades', h: 'Hearts', d: 'Diamonds', c: 'Clubs' };

  import SuitSymbol from '$lib/components/SuitSymbol.svelte';
</script>

<div class="hand-view flex flex-col gap-1 font-mono text-sm">
  {#each suitOrder as suit, i}
    <div class="suit-line flex items-center gap-1">
      <SuitSymbol value={suit} />
      <span>{suits[i]}</span>
    </div>
  {/each}
</div>

<style>
  .hand-view {
    /* optional styling */
  }
</style>