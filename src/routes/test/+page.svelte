<script lang="ts">
	import HandComponent from '$lib/components/HandComponent.svelte';
	import DealComponent from '$lib/components/DealComponent.svelte';
	import BidsComponent from '$lib/components/BidsComponent.svelte';
</script>

<div class="p-4 space-y-6">
	<h1 class="text-2xl font-bold">Component Test View</h1>

	<section class="border rounded p-4 bg-gray-50">
		<h2 class="text-xl font-semibold mb-2">Hand</h2>
		<HandComponent value="AKQJ" />
	</section>

	<section class="border rounded p-4 bg-gray-50">
		<h2 class="text-xl font-semibold mb-2">Deal</h2>
		<DealComponent value="N:AKQJ.543.AKQ.42 E:T987.2.76.T9876 W:643.9876.JT98.KQ S:52.AKQJT.5432.3" />
	</section>

	<section class="border rounded p-4 bg-gray-50">
		<h2 class="text-xl font-semibold mb-2">Bids</h2>
		<BidsComponent value="1♣ 1♦ 2♠ 3NT" />
	</section>
</div>