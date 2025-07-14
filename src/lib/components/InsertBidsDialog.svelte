// src/lib/components/InsertHandDialog.svelte


<script lang="ts">
	const props = $props<{ open: boolean; onClose: () => void }>();

	let S = $state('');
	let H = $state('');
	let D = $state('');
	let C = $state('');

	export type $$Events = {
		insertHand: CustomEvent<string>;
	};

	function accept() {
		const markup = `{{hand: S:${S} H:${H} D:${D} C:${C}}}`;
		dispatchEvent(new CustomEvent('insertHand', { detail: markup }));
		props.onClose();
	}
</script>

{#if props.open}
	<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
		<div class="bg-white p-6 rounded shadow-lg w-96">
			<h2 class="mb-4 text-xl font-semibold">Insert Hand</h2>
			<div class="space-y-2">
				<div>
					<label for="input-S">S:</label>
					<input id="input-S" bind:value={S} class="w-full p-1 border rounded" />
				</div>
				<div>
					<label for="input-H">H:</label>
					<input id="input-H" bind:value={H} class="w-full p-1 border rounded" />
				</div>
				<div>
					<label for="input-D">D:</label>
					<input id="input-D" bind:value={D} class="w-full p-1 border rounded" />
				</div>
				<div>
					<label for="input-C">C:</label>
					<input id="input-C" bind:value={C} class="w-full p-1 border rounded" />
				</div>
			</div>
			<div class="mt-4 text-right space-x-2">
				<button type="button" onclick={props.onClose} class="px-3 py-1 rounded border">Cancel</button>
				<button type="button" onclick={accept} class="px-4 py-1 rounded bg-blue-500 text-white">Accept</button>
			</div>
		</div>
	</div>
{/if}