<script lang="ts">
  import SuitSymbol from "./SuitSymbol.svelte";

  const props = $props<{ cards: string; label: string }>();
  const hasCards = $derived(() => !!props.cards?.trim());

  // Split cards into suits, ensure 4 suits always
  let suits = $derived(() => {
    const parts = (props.cards ?? '').split('.');
    while (parts.length < 4) parts.push('');
    return parts;
  });

  let spades = $derived(() => suits()[0]);
  let hearts = $derived(() => suits()[1]);
  let diamonds = $derived(() => suits()[2]);
  let clubs = $derived(() => suits()[3]);
</script>
<div class="w-32">
<div class="display: inline-block mr-1 mt-1 w-28 rounded-lg border-2 border-green-300 bg-white shadow mb-2">
  {#if props.label}
    <div class="hand-label bg-green-100 rounded-t-lg text-center font-bold">
      {props.label}
    </div>
  {/if}

  {#if hasCards()}
    <div class="suit-row text-black">
      <SuitSymbol value="s" />
      <div>{spades()}</div>
    </div>
    <div class="suit-row text-red-600">
      <SuitSymbol value="h" />
      <div>{hearts()}</div>
    </div>
    <div class="suit-row text-red-600">
      <SuitSymbol value="d" />
      <div>{diamonds()}</div>
    </div>
    <div class="suit-row text-black">
      <SuitSymbol value="c" />
      <div>{clubs()}</div>
    </div>
  {:else}
    <div class="text-red-600 px-2 pb-2 text-sm font-medium">
      ⚠️ No cards provided or malformed hand
    </div>
  {/if}
</div>
</div>

<style>
  .hand-label {
    padding: 0.5;
  }
  .suit-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-family: monospace;
    font-size: 0.875rem;
    letter-spacing: 0.1em;
    padding: 0 0.5rem;
  }

</style>