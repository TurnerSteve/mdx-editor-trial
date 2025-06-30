<!-- $lib/components/DealComponent.svelte -->
<script lang="ts">
  export let value: string = '';
</script>

<div class="bg-blue-50 p-2 rounded font-mono text-sm whitespace-pre-wrap">
  <strong>Deal:</strong>
  <pre>{value}</pre>
</div>
