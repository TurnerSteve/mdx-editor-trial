<!-- UnknownCommand.svelte -->
<script lang="ts">
  const props = $props<{ type: string }>();
</script>

<span class="text-red-600 font-mono cursor-help" title="Unrecognized command">
  Unknown command: <strong>{props.type}</strong>
</span>