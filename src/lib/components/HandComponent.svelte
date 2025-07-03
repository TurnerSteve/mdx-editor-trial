<script  lang="ts">
  import SuitSymbol from './SuitSymbol.svelte';

  const props = $props<{ value: string; label?: string }>();

  // Declare reactive state variables
  let spades = $state('');
  let hearts = $state('');
  let diamonds = $state('');
  let clubs = $state('');

  function parseValue(val: string) {
    const suits = val.split('.');
    while (suits.length < 4) suits.push('');
    spades = suits[0];
    hearts = suits[1];
    diamonds = suits[2];
    clubs = suits[3];
  }

  parseValue(props.value);

  // If props.value can change, add an update function or watch prop changes here
  export function updateValue(newValue: string) {
    parseValue(newValue);
  }
</script>

<div class="w-32 rounded-md border bg-gray50 shadow text-left">
  {#if props.label}
    <div class="bg-gray-200 text-sm font-semibold px-2 py-1 rounded-t-md">
      {props.label}
    </div>
  {/if}
  <div class="flex flex-col gap-1 text-lg font-mono p-2">
    <div class="flex items-center gap-1">
      <SuitSymbol value="s" />
      <span>{spades}</span>
    </div>
    <div class="flex items-center gap-1 text-red-500">
      <SuitSymbol value="h" />
      <span>{hearts}</span>
    </div>
    <div class="flex items-center gap-1 text-red-500">
      <SuitSymbol value="d" />
      <span>{diamonds}</span>
    </div>
    <div class="flex items-center gap-1">
      <SuitSymbol value="c" />
      <span>{clubs}</span>
    </div>
  </div>
</div>