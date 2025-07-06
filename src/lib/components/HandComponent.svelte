<script lang="ts">
  import SuitSymbol from "./SuitSymbol.svelte";

  const props = $props<{ cards: string; label: string }>();

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

<div class="deal-containerw-28 rounded-lg border-2 border-blue-300 bg-white shadow m-2">
  {#if props.label}
    <div class="hand-label bg-blue-100 rounded-t-lg text-center font-bold text-sm mb-2 px-2 py-1">
      {props.label}
    </div>
  {/if}
  <div class="suit-row text-black">
    <SuitSymbol value="s" />
    <span>{spades()}</span>
  </div>
  <div class="suit-row text-red-600">
    <SuitSymbol value="h" />
    <span>{hearts()}</span>
  </div>
  <div class="suit-row text-red-600">
    <SuitSymbol value="d" />
    <span>{diamonds()}</span>
  </div>
  <div class="suit-row text-black">
    <SuitSymbol value="c" />
    <span>{clubs()}</span>
  </div>
</div>

<style>
  .hand-label {
    /* already styled above */
  }

  .suit-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;       /* small gap between symbol and cards */
    font-family: monospace;
    font-size: 0.875rem; /* text-sm */
    letter-spacing: 0.1em; /* spacing between cards */
    padding: 0 0.5rem ;
  }
</style>