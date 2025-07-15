<!-- src/routes/dialogTest/+page.svelte -->
<script lang="ts">
	import MarkdownRenderer from '$lib/markdown/MarkdownRenderer.svelte';
	import InsertHandDialog from '$lib/components/InsertHandDialog.svelte';
	// import InsertBidsDialog from '$lib/components/InsertBidsDialog.svelte'; // when you have it
	// import InsertDealDialog from '$lib/components/InsertDealDialog.svelte'; // when you have it

	let text = $state('');
	let textarea: HTMLTextAreaElement;

	let handDialogOpen = $state(false);
	// let bidsDialogOpen = $state(false);
	// let dealDialogOpen = $state(false);

	function insertAtCursor(insertText: string) {
		if (!textarea) return;
		console.log('Inserting at cursor', insertText)
		const start = textarea.selectionStart ?? 0;
		const end = textarea.selectionEnd ?? 0;
		const before = text.slice(0, start);
		const after = text.slice(end);
		text = before + insertText + after;
		$: setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(start + insertText.length, start + insertText.length);
		});
	}

	function handleInsertHand(e: CustomEvent<string>) {
		insertAtCursor(e.detail);
		handDialogOpen = false;
	}
	// Similar for bids, deal
</script>

<div class="flex flex-col gap-6 md:flex-row">
	<div class="flex flex-1 flex-col">
		<!-- INSERT DIALOG BUTTONS ABOVE THE TEXTAREA -->
		<div class="flex gap-2 mb-2">
			<button
				onclick={() => handDialogOpen = true}
				class="rounded bg-blue-500 px-4 py-1 text-white"
			>
				Insert Hand
			</button>
			<!--
			<button
				onclick={() => bidsDialogOpen = true}
				class="rounded bg-green-500 px-4 py-1 text-white"
			>
				Insert Bids
			</button>
			<button
				onclick={() => dealDialogOpen = true}
				class="rounded bg-orange-500 px-4 py-1 text-white"
			>
				Insert Deal
			</button>
			-->
		</div>
		<label for="editor-textarea" class="mb-1 font-semibold">Markdown Window - Edit or insert Hand, Deal or Bidding for assist.</label>
		<textarea
			id="editor-textarea"
			bind:this={textarea}
			bind:value={text}
			class="h-48 w-full rounded border p-2 font-mono"
			placeholder="Type here or use Insert Hand, Deal or Bids for syntax assistance"
		></textarea>
	</div>
	<div class="flex-1 overflow-auto rounded border bg-white p-4">
		<h3 class="mb-2 text-lg font-semibold">Markdown Preview</h3>
		<!-- Use your original MarkdownRenderer exactly as before: -->
		<MarkdownRenderer markdownText={text} />
	</div>
</div>

<!-- Hand dialog -->
<InsertHandDialog
	open={handDialogOpen}
	onClose={() => (handDialogOpen = false)}
	onAccept={value => insertAtCursor(value)}
/>
<!--
<InsertBidsDialog
	open={bidsDialogOpen}
	onClose={() => (bidsDialogOpen = false)}
	on:insertBids={handleInsertBids}
/>
<InsertDealDialog
	open={dealDialogOpen}
	onClose={() => (dealDialogOpen = false)}
	on:insertDeal={handleInsertDeal}
/>
-->