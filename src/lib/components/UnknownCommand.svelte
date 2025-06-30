<!-- $lib/components/UnknownCommand.svelte -->

<script lang="ts">
   const { type } = $props();
</script>

<span class="text-red-600 font-mono cursor-help" title="Unrecognized command">
  Unknown: <strong>{type}</strong>
</span>
 