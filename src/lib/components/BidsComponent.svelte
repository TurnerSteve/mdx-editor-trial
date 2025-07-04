<script lang="ts">
  const props = $props<{ seq: string; label: string }>();

  // Use derived for reactive bids array
  let bids = $derived(() => (props.seq ?? '').trim().split(/\s+/).filter(Boolean));

  console.log('[Bid Sequence]', props.seq)
</script>

<div class="bids-component">
  {#if props.label}
    [Label]
    <div class="label">{props.label}</div>
    [END]
  {/if}
  <div class="bids-list">
    [LIST]]
    {#each bids() as bid}
       
    <span class="bid">[Bid]{bid}</span>
    {/each}
    [END LIST]
  </div>
</div>