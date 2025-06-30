<!-- $lib/components/UnknownCommand.svelte -->

<script lang="ts">
  export let type: string = '';
</script>

<span class="text-red-600 font-mono cursor-help" title="Unrecognized command">
  Unknown: <strong>{type}</strong>
</span>
 