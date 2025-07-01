<!-- src/routes/bids-test.svelte -->
<script lang="ts">
  import BidsComponent from '$lib/components/BidsComponent.svelte';

  const bidSequence = '- - 1D X XX P 1NT P 2C P 2D P P P';
</script>

<h2 class="text-xl font-bold mb-4">BidsComponent Test</h2>
<BidsComponent value={bidSequence} />