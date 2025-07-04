<script lang="ts">
	import HandComponent from "./HandComponent.svelte";

  const props = $props<{ hands: Partial<Record<'N' | 'E' | 'S' | 'W', string>>; label: string }>();
</script>

<div class="deal-component">
  {#if props.label}
    <div class="label">{props.label}</div>
  {/if}
  <div class="hands">
    {#each ['N', 'E', 'S', 'W'] as dir}
      {#if props.hands[dir]}
        <div>{dir}:
          <HandComponent cards={props.hands[dir]} label={dir} />
        </div>
      {/if}
    {/each}
  </div>
</div>
