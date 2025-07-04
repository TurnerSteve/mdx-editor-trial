<script lang="ts">
  import type { ParsedBlock } from '$lib/types';
  import { parseMarkdownTokens } from '$lib/markdown/parseMarkdownTokens';
  import HandComponent from '$lib/components/HandComponent.svelte';
  import DealComponent from '$lib/components/DealComponent.svelte';
  import BidsComponent from '$lib/components/BidsComponent.svelte';
  import UnknownCommand from '$lib/components/UnknownCommand.svelte';

  const props = $props<{ markdownText: string }>();

  const componentsMap = {
    hand: HandComponent,
    deal: DealComponent,
    bids: BidsComponent,
  } as const;

  type ComponentType = keyof typeof componentsMap;

  // Use intersection type for render logic
  type RenderBlock = ParsedBlock & {
    key: string;
    Comp?: typeof HandComponent | typeof DealComponent | typeof BidsComponent | typeof UnknownCommand;
  };

  const blocks = $derived(() => parseMarkdownTokens(props.markdownText ?? ''));

  const renderedBlocks = $derived(() =>
    blocks().map((block, index): RenderBlock => {
      const key = `block-${block.kind}-${block.line}-${index}`;
      const Comp =
        block.kind === 'component' && block.type && componentsMap[block.type as ComponentType]
          ? componentsMap[block.type as ComponentType]
          : UnknownCommand;

      return {
        ...block,
        key,
        Comp,
      };
    })
  );
</script>

<div class="markdown-renderer">
  {#each renderedBlocks() as block (block.key)}
    {#if block.kind === 'text'}
      <p>{@html block.content}</p>

    {:else if block.Comp === HandComponent}
      <HandComponent cards={block.cards ?? ''} label={block.label ?? ''} />

    {:else if block.Comp === DealComponent}
      <DealComponent hands={block.hands ?? {}} label={block.label ?? ''} />

    {:else if block.Comp === BidsComponent}
      <BidsComponent seq={block.seq ?? ''} label={block.label ?? ''} />

    {:else}
      <UnknownCommand type={block.type ?? 'unknown'} />
    {/if}
  {/each}
</div>
