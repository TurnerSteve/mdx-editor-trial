<!-- $lib/components/UnknownCommand.svelte -->

<script lang="ts">
  const { type }: { type: string } = $props();
</script>

<span
  class="font-mono text-red-600 cursor-help"
  title="This command is not recognized by the renderer"
  role="alert"
  aria-live="assertive"
>
  Unknown command: <strong>{type}</strong>
</span>
 