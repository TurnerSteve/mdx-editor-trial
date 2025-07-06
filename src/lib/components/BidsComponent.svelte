<script lang="ts">
  import { parseBidSequence } from "$lib/markdown/validators/parseBidSequence";

  const props = $props<{
    seq: string;  // A string of legal bids in a sequence that has been validated
    label?: string;
  }>();

  const bids = $derived(() => parseBidSequence(props.seq));

    const suitSymbols: Record<string, string> = {
    S: '♠',
    H: '♥',
    D: '♦',
    C: '♣'
  };

  const isRedSuit = (suit?: string) => suit === 'H' || suit === 'D';
  
</script>

<div class="inline-block rounded-xl border-2 border-blue-300 bg-white font-mono text-sm shadow-sm">
  {#if props.label}
    <div class="w-full rounded-t-xl bg-blue-100 px-4 py-2 text-center font-semibold text-gray-700">
      {props.label}
    </div>
  {/if}

  <div class="bids-grid">
    {#each bids() as bid}
      <div
        class="bid"
        class:red-suit={isRedSuit(bid.suit)}
        class:blue-bid={bid.raw === 'X' || bid.raw === 'XX'}
        class:green-pass={bid.raw === 'P'}
      >
        {#if bid.level && bid.suit}
          <span>{bid.level}{suitSymbols[bid.suit]}</span>
        {:else}
          <span>{bid.raw}</span>
        {/if}
      </div>
    {/each}
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
    margin: 0.15rem;
    border: 1px solid #d1d5db; /* Tailwind's blue-300: hex = #93c5fd */
    border-radius: 0.5rem;
    text-align: center;
  }


  .red-suit {
    color: #dc2626; /* red-600 */
  }

  .blue-bid {
    color: #1e40af; /* blue-900 */
  }

  .green-pass {
    color: #16a34a; /* green-600 */
  }
  /* Make suit symbols slightly bigger */
  .suit {
    font-weight: 900;
    font-size: 1.1em;
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