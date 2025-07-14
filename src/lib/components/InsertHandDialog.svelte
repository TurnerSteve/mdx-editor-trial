<script lang="ts">
	const props = $props<{ 
		open: boolean; 
		onClose: () => void 
		onAccept: (value: string) => void;
	}>();

	let S = $state('');
	let H = $state('');
	let D = $state('');
	let C = $state('');

	export type $$Events = {
		insertHand: CustomEvent<string>;
	};

	function accept() {
		const markup = `{{hand: S:${S} H:${H} D:${D} C:${C}}}`;
		props.onAccept(markup);
		props.onClose();
	}
</script>

// src/lib/components/InsertHandDialog.svelte

{#if props.open}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
		<div class="w-96 rounded bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-semibold">Insert Hand</h2>
			<div class="space-y-2">
				<div>
					<label for="input-S">S:</label>
					<input id="input-S" bind:value={S} class="w-full rounded border p-1" />
				</div>
				<div>
					<label for="input-H">H:</label>
					<input id="input-H" bind:value={H} class="w-full rounded border p-1" />
				</div>
				<div>
					<label for="input-D">D:</label>
					<input id="input-D" bind:value={D} class="w-full rounded border p-1" />
				</div>
				<div>
					<label for="input-C">C:</label>
					<input id="input-C" bind:value={C} class="w-full rounded border p-1" />
				</div>
			</div>
			<div class="mt-4 space-x-2 text-right">
				<button type="button" onclick={props.onClose} class="rounded border px-3 py-1"
					>Cancel</button
				>
				<button type="button" onclick={accept} class="rounded bg-blue-500 px-4 py-1 text-white"
					>Accept</button
				>
			</div>
		</div>
	</div>
{/if}
