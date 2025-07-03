<script lang="ts">
  import SuitSymbol from './SuitSymbol.svelte';

  const props = $props<{ value: string; label?: string }>();

  const suits = $derived(() => {
    const parts = (props.value ?? '').split('.');
    while (parts.length < 4) parts.push('');
    return parts;
  });

  const spades = $derived(() => suits()[0]);
  const hearts = $derived(() => suits()[1]);
  const diamonds = $derived(() => suits()[2]);
  const clubs = $derived(() => suits()[3]);
</script>

<div class="w-32 rounded-md border bg-gray-50 shadow text-left">
  {#if props.label}
    <div class="bg-gray-200 text-sm font-semibold px-2 py-1 rounded-t-md">
      {props.label}
    </div>
  {/if}
  <div class="flex flex-col gap-1 text-lg font-mono p-2">
    <div class="flex items-center gap-1">
      <SuitSymbol value="s" />
      <span>{spades()}</span>
    </div>
    <div class="flex items-center gap-1 text-red-500">
      <SuitSymbol value="h" />
      <span>{hearts()}</span>
    </div>
    <div class="flex items-center gap-1 text-red-500">
      <SuitSymbol value="d" />
      <span>{diamonds()}</span>
    </div>
    <div class="flex items-center gap-1">
      <SuitSymbol value="c" />
      <span>{clubs()}</span>
    </div>
  </div>
</div>