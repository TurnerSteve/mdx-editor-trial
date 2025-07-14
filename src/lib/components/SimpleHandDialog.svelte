<script lang="ts">
  const props = $props<{ open: boolean; onClose: () => void }>();
  export type $$Events = {
    insertHand: CustomEvent<string>;
  };
  function accept() {
    const markup = 'test event';
    console.log('Dialog emitting:', markup);
    props.onAccept(markup); 
    props.onClose();
  }
</script>
{#if props.open}
  <button onclick={accept}>Accept</button>
{/if}