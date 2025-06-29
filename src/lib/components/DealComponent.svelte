<!-- $lib/components/DealComponent.svelte -->
<script lang="ts" >
  import type { ComponentBlockProps } from '$lib/types';

	const { value }: ComponentBlockProps = $props();
</script>

<div class="bg-blue-50 p-4 rounded-md font-mono whitespace-pre-wrap" role="region" aria-label="Deal data">
  <strong class="font-semibold">Deal Data:</strong>
  <pre>{value}</pre>
</div>
