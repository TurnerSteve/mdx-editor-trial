<script lang="ts">
  import type { ParsedBlock } from '$lib/types';
  import { parseMarkdownTokens } from '$lib/markdown/parseMarkdownTokens';

  import HandComponent from '$lib/components/HandComponent.svelte';
  import DealComponent from '$lib/components/DealComponent.svelte';
  import BidsComponent from '$lib/components/BidsComponent.svelte';
  import UnknownCommand from '$lib/components/UnknownCommand.svelte';

  // ✅ Get props the Runes way
  const props = $props<{ markdownText: string }>();

  // ✅ Component mapping
  const componentsMap = {
    hand: HandComponent,
    deal: DealComponent,
    bids: BidsComponent
  } satisfies Record<string, typeof HandComponent>;

  // ✅ Reactive derived parsing
  const blocks = $derived(() => parseMarkdownTokens(props.markdownText));
</script>

<!-- ✅ Render blocks -->
<div class="markdown-renderer">
  {#each blocks() as block (block.key)}
    {#if block.kind === 'text'}
      <p>{@html block.content}</p>
    {:else if block.kind === 'component'}
      {#if componentsMap[block.type]}
        <svelte:component this={componentsMap[block.type]} {...block} />
      {:else}
        <UnknownCommand type={block.type} />
      {/if}
    {/if}
  {/each}
</div>