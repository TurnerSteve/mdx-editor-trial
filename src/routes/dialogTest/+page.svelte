<script lang="ts">
  import Dialog from './Dialog.svelte';
  let text = $state('');
  let dialogOpen = $state(false);

  function handleDialogAccept() {
    text = 'Accepted from child dialog!';
    dialogOpen = false;
  }
</script>

<button type="button" onclick={() => dialogOpen = true}>Open Dialog</button>
<Dialog
  open={dialogOpen}
  onClose={() => dialogOpen = false}
  onAccept={handleDialogAccept} />
<textarea bind:value={text}></textarea>