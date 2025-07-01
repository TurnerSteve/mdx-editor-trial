<script lang="ts">
  import SuitSymbol from './SuitSymbol.svelte';

  // Props destructured with runes mode
  const { value }  = $props() ;

  // Example: "AKQJ.543.AKQ.42"
  // Split into suits order: Spades, Hearts, Diamonds, Clubs
  const suits = value.split('.');

  // Defensive: if suits length is not 4, fill with empty strings
  while (suits.length < 4) suits.push('');

  const [spades, hearts, diamonds, clubs] = suits;
</script>

<div class="hand-component flex flex-col gap-1 text-lg font-mono">
  <div class="suit-row flex items-center gap-1">
    <SuitSymbol value="s" />
    <span>{spades}</span>
  </div>
  <div class="suit-row flex items-center gap-1 text-red-500">
    <SuitSymbol value="h" />
    <span>{hearts}</span>
  </div>
  <div class="suit-row flex items-center gap-1 text-red-500">
    <SuitSymbol value={"d" as string} />
    <span>{diamonds}</span>
  </div>
  <div class="suit-row flex items-center gap-1">
    <SuitSymbol value="c" />
    <span>{clubs}</span>
  </div>
</div>