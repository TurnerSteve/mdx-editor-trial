<script lang="ts">
  import SuitSymbol from './SuitSymbol.svelte';

  // Rename exported props object to avoid conflict with $props()
  export const componentProps = /** @type { { value: string } } */ ({});

  // Now destructure the props safely
  const { value } = $props();

  const suits = value.split('.');

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
    <SuitSymbol value="d" />
    <span>{diamonds}</span>
  </div>
  <div class="suit-row flex items-center gap-1">
    <SuitSymbol value="c" />
    <span>{clubs}</span>
  </div>
</div>