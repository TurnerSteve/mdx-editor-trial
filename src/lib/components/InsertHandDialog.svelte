<script lang="ts">

  // Svelte 5 runes mode — use $props for component props
  const props = $props<{ open: boolean; onClose: () => void }>();
 

  // Local state for the four suits
  let S = $state('');
  let H = $state('');
  let D = $state('');
  let C = $state('');

  function accept() {
    const markup = `{{hand: S:${S} H:${H} D:${D} C:${C}}}`;
    // Custom event: let parent know to insert markup
    dispatchEvent (new CustomEvent ('insertHand', {detail:markup} ));  
    props.onClose();
  }
  
  export type $$Events = {
    insertHand: CustomEvent<string>
  };

</script>

{#if props.open}
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="mb-4 text-xl font-semibold">Insert Hand</h2>
      <div class="space-y-2">
        <label>S: <input bind:value={S} class="w-full p-1 border rounded" /></label>
        <label>H: <input bind:value={H} class="w-full p-1 border rounded" /></label>
        <label>D: <input bind:value={D} class="w-full p-1 border rounded" /></label>
        <label>C: <input bind:value={C} class="w-full p-1 border rounded" /></label>
      </div>
      <div class="mt-4 text-right space-x-2">
        <button type="button" onclick={props.onClose} class="px-3 py-1 rounded border">Cancel</button>
        <button type="button" onclick={accept} class="px-4 py-1 rounded bg-blue-500 text-white">Accept</button>
      </div>
    </div>
  </div>
{/if}