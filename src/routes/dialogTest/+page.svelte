<script lang="ts">
	import MarkdownRenderer from '$lib/markdown/MarkdownRenderer.svelte';
	import InsertHandDialog from '$lib/components/InsertHandDialog.svelte';

    // const props = $props<{ text: string }>();

	let text = $state('');

	let textarea: HTMLTextAreaElement;
	let dialogOpen = $state(false);

	function insertAtCursor(insertText: string) {
		if (!textarea) return;
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
		dialogOpen = false;
	}
</script>

<div class="flex flex-col gap-6 md:flex-row">
	<div class="flex flex-1 flex-col">
		<label for="editor-textarea" class="mb-1 font-semibold">Editor</label>
		<textarea
			id="editor-textarea"
			bind:this={textarea}
			bind:value={text}
			class="h-48 w-full rounded border p-2 font-mono"
			placeholder="Type here or use Insert Hand..."
		></textarea>

		<button
			onclick={() => (dialogOpen = true)}
			class="mt-2 rounded bg-blue-500 px-4 py-1 text-white"
		>
			Insert Hand
		</button>
	</div>
	<div class="flex-1 overflow-auto rounded border bg-white p-4">
		<h3 class="mb-2 text-lg font-semibold">Markdown Preview</h3>
		<MarkdownRenderer markdownText = {text} />
	</div>
</div>

<InsertHandDialog
	open={dialogOpen}
	onClose={() => (dialogOpen = false)}
	on:insertHand={handleInsertHand}
/>
