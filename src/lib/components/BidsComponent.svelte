<!-- $lib/components/BidsComponent.svelte -->
<script lang="ts">
  export let value: string = '';
</script>

<span class="text-sm italic text-gray-600">
  <strong class="text-black font-semibold">Bids:</strong> {value || 'No bids'}
</span>