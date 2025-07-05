<script lang="ts">
  import MarkdownRenderer from '$lib/markdown/MarkdownRenderer.svelte';
  import demoMd from '$lib/tests/demoDealBids.md?raw';

  let markdownText = $state(demoMd);
</script>

<div class="flex h-screen gap-6 p-6 bg-gray-50">
  <!-- Markdown Editor (left) -->
  <textarea
    bind:value={markdownText}
    rows="10"
    class="w-1/2 resize-none rounded-xl border-2 border-gray-300 bg-white p-4 font-mono shadow-sm focus:border-green-600 focus:ring-4 focus:ring-green-400 focus:outline-none"
  ></textarea>

  <!-- Markdown Preview (right) -->
  <div class="w-1/2 rounded-xl border-2 border-gray-300 bg-white p-6 shadow-sm overflow-auto prose max-w-none">
    <MarkdownRenderer {markdownText} />
  </div>
</div>




