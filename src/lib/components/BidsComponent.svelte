<!-- $lib/components/BidsComponent.svelte -->
<script lang="ts">
  const { value = 'No bids provided' }: { value?: string } = $props();
</script>

<span
  class="italic text-gray-600"
  role="region"
  aria-label="Bids information"
>
  <strong class="font-semibold text-black">Bids:</strong> {value || 'No bids provided'}
</span>
