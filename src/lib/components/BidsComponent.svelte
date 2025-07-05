<script lang="ts">
    import type { Bid } from '$lib/markdown/validators/parseBidSequence';

  const props = $props<{ label?: string; bids: Bid[] }>();

  // Use derived for reactive bids array
  let bids = $derived(() => (props.seq ?? '').trim().split(/\s+/).filter(Boolean));

  console.log('[Bid Sequence]', props.seq)
</script>

<!-- Render bids however you like -->
<div>
  {#if props.label}
    <h3>{props.label}</h3>
  {/if}
  <div class="bids">
    {#each props.bids as bid}
      <span class={`bid ${bid.type}`}>{bid.raw}</span>
    {/each}
  </div>
</div>

<style>
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
</style>