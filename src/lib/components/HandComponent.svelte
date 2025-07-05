<script lang="ts">
import { SuitSymbol } from '$lib/components';
  const props = $props<{ cards: string; label: string }>();

  // Create a derived store for suits array, splitting cards string
  let suits = $derived(() => {
    const parts = (props.cards ?? '').split('.');
    while (parts.length < 4) parts.push('');
    return parts;
  });

  // Each suit derived individually from suits
  let spades = $derived(() => suits()[0]);
  let hearts = $derived(() => suits()[1]);
  let diamonds = $derived(() => suits()[2]);
  let clubs = $derived(() => suits()[3]);
</script>



<div class="w-40 rounded-lg border bg-white shadow p-2">
  {#if props.label}
    <div class="text-sm font-bold text-center mb-1">{props.label}</div>
  {/if}
  <div class="flex items-center gap-1 text-sm">
    <SuitSymbol value="s" /> <span class="font-mono">{suits()[0]}</span>
  </div>
  <div class="flex items-center gap-1 text-sm text-red-600">
    <SuitSymbol value="h" /> <span class="font-mono">{suits()[1]}</span>
  </div>
  <div class="flex items-center gap-1 text-sm text-red-600">
    <SuitSymbol value="d" /> <span class="font-mono">{suits()[2]}</span>
  </div>
  <div class="flex items-center gap-1 text-sm">
    <SuitSymbol value="c" /> <span class="font-mono">{suits()[3]}</span>
  </div>
</div>