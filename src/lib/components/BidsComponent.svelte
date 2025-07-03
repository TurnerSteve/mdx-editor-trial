<script lang="ts">
  const props = $props<{ value: string; label?: string }>();

  const bids = $derived(() => {
    return (props.value ?? '').trim().split(/\s+/);
  });
</script>

<div class="border rounded p-3 bg-white shadow w-64">
  {#if props.label}
    <div class="font-semibold mb-2">{props.label}</div>
  {/if}

  <div class="font-mono text-lg flex flex-wrap gap-2">
    {#each bids() as bid}
      <span class="px-2 py-1 rounded bg-gray-200">{bid}</span>
    {/each}
  </div>
</div>