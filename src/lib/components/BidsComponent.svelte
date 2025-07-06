<script lang="ts">
  import { parseBidSequence } from "$lib/markdown/validators/parseBidSequence";

  const props = $props<{
    seq: string;  // A string of legal bids in a sequence that has been validated
    label?: string;
  }>();

  const bids = $derived(() => parseBidSequence(props.seq));
  
</script>

<div class="inline-block rounded-xl border-2 border-blue-300 bg-white font-mono text-sm shadow-sm">
  {#if props.label}
    <div class="w-full rounded-t-xl bg-blue-100 px-4 py-2 text-center font-semibold text-gray-700">
      {props.label}
    </div>
  {/if}

  <div class="p-4">
    <div class="bids-grid">
      {#each bids() as bid}
        <div class="bid">{bid.raw}</div>
      {/each}
    </div>
  </div>
</div>

<style>
  .bids-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(2rem, auto));
    gap: 0.2rem;
    justify-content: start;
  }

  .bid {
    padding: 0.rem 0.5rem;
    border: 1px solid #93c5fd; /* Tailwind's blue-300: hex = #93c5fd */
    border-radius: 0.25rem;
    text-align: center;
  }
</style>








<!-- <style>
  .bid {
    margin-right: 0.25rem;
    padding: 0.1rem 0.4rem;
    border-radius: 0.25rem;
    background-color: #f0f0f0;
    font-family: monospace;
  }
  .contract { background-color: #def; }
  .pass     { background-color: #ffd; }
  .double   { background-color: #fdd; }
  .redouble { background-color: #fbb; }
  .invalid  { background-color: #f88; color: white; }
</style> -->