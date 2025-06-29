<!-- $lib/components/Renderer.svelte -->
<script lang="ts">
  import type { ParsedBlock } from '$lib/types';

  import SuitSymbol from '$lib/components/SuitSymbol.svelte';
  import DealComponent from '$lib/components/DealComponent.svelte';
  import HandComponent from '$lib/components/HandComponent.svelte';
  import BidsComponent from '$lib/components/BidsComponent.svelte';
  import UnknownCommand from '$lib/components/UnknownCommand.svelte';

  export let blocks: ParsedBlock[];

  type ComponentConstructor =
    | typeof SuitSymbol
    | typeof DealComponent
    | typeof HandComponent
    | typeof BidsComponent;

  const componentMap: Record<string, ComponentConstructor> = {
    suit: SuitSymbol,
    deal: DealComponent,
    hand: HandComponent,
    bids: BidsComponent
  };
</script>

<div>
  {#each blocks as block (block.key)}
    <div class="mb-1" data-line={block.line}>
      <div class="pr-2 text-xs text-gray-400">
        Line {block.line !== undefined ? block.line + 1 : '-'}
      </div>

      {#if block.kind === 'text'}
        <div>{block.content}</div>
      {:else}
        {#key block.key}
          {#if componentMap[block.type]}
            {@const Component = componentMap[block.type]}
            <Component value={block.value ?? ''} />
          {:else}
            <UnknownCommand type={block.type} />
          {/if}
        {/key}
      {/if}
    </div>
  {/each}
</div>