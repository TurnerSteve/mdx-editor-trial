<script lang="ts">
  import InsertHandDialog from '$lib/components/InsertHandDialog.svelte'; // Or relative path if not in lib

  let dialogOpen = $state(false);
  let text = $state('');
  let textarea: HTMLTextAreaElement;

  // Insert at cursor in textarea
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

  // Render markup preview
  function renderMarkup(markup: string): string {
    return markup.replace(/\{\{hand:([^}]*)\}\}/g, (m, hand) => {
      const suits = hand.trim().split(/\s+/).map((s: string) =>
        `<span style="display:inline-block;width:60px">${s}</span>`
      );
      return `<div class="inline-block border p-1 bg-gray-50 rounded mt-2">${suits.join(' ')}</div>`;
    });
  }

  // Handle insertHand event
  function handleInsertHand(e: CustomEvent<string>) {
    insertAtCursor(e.detail);
    dialogOpen = false;
  }
</script>

<div class="flex gap-6">
  <div class="flex-1 flex flex-col">
    <textarea
      bind:this={textarea}
      bind:value={text}
      class="w-full h-40 p-2 border rounded font-mono"
      placeholder="Type here..."
    ></textarea>

    <button
      onclick={() => dialogOpen = true}
      class="mt-2 px-4 py-1 rounded bg-blue-500 text-white"
    >
      Insert Hand
    </button>
  </div>
  <div class="flex-1 bg-white border rounded p-4 overflow-auto">
    <h3 class="text-lg font-semibold mb-2">Preview</h3>
    <div>{@html renderMarkup(text)}</div>
  </div>
</div>

<InsertHandDialog
  open={dialogOpen}
  onClose={() => dialogOpen = false}
  on:insertHand={handleInsertHand}
/>