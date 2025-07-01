// src/routes/test-components/+page.svelte
<script lang="ts">
  import SuitSymbol from '$lib/components/SuitSymbol.svelte';
  import DealComponent from '$lib/components/DealComponent.svelte';
  import HandComponent from '$lib/components/HandComponent.svelte';
  import BidsComponent from '$lib/components/BidsComponent.svelte';
</script>

<div class="flex flex-col gap-6 p-8">
  <section class="p-4 border rounded shadow">
    <h2 class="text-xl font-bold mb-2">SuitSymbol</h2>
    <div class="flex gap-4">
      <SuitSymbol value="heart" />
      <SuitSymbol value="diamond" />
      <SuitSymbol value="club" />
      <SuitSymbol value="spade" />
      <SuitSymbol value="h" />
      <SuitSymbol value="d" />
      <SuitSymbol value="c" />
      <SuitSymbol value="s" />
    </div>
  </section>

  <section class="p-4 border rounded shadow">
    <h2 class="text-xl font-bold mb-2">HandComponent</h2>
    <HandComponent value="AKQJ.T987.5432.6" />
  </section>

  <section class="p-4 border rounded shadow">
    <h2 class="text-xl font-bold mb-2">DealComponent</h2>
    <DealComponent value="N:AKQJ.543.AKQ.42 E:T987.2.76.T9876 W:643.9876.JT98.KQ S:52.AKQJT.5432.3" />
  </section>

  <section class="p-4 border rounded shadow">
    <h2 class="text-xl font-bold mb-2">BidsComponent</h2>
    <BidsComponent value="1C 1D 2S 3NT" />
  </section>
</div>