// Dialog.svelte
<script lang="ts">
  const props = $props<{ open: boolean; onClose: () => void; onAccept: () => void }>();

  function handleAccept() {
    props.onAccept(); // Call the parent's handler directly
    props.onClose();
  }
</script>

{#if props.open}
  <div>
    <p>Dialog component</p>
    <button type="button" onclick={handleAccept}>Accept</button>
    <button type="button" onclick={props.onClose}>Cancel</button>
  </div>
{/if}