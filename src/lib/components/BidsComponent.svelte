<!-- $lib/components/BidsComponent.svelte -->
<script lang="ts">
   const { value } = $props();
</script>

<span class="text-sm italic text-gray-600">
  <strong class="text-black font-semibold">Bids:</strong> {value || 'No bids'}
</span>