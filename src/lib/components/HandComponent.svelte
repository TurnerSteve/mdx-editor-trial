<!-- $lib/components/HandComponent.svelte -->
<script lang="ts" >
  import type { ComponentBlockProps } from '$lib/types';

  const { value }: ComponentBlockProps = $props();
</script>

<div class="font-mono my-2" role="region" aria-label="Hand data">
  <strong class="font-semibold">Hand:</strong> {value}
</div>


