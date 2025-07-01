<script lang="ts">
  import HandComponent from './HandComponent.svelte';
  import type { Hand } from '$lib/types';

  const { hands } = $props() as { hands: Record<'N' | 'E' | 'S' | 'W', Hand> };

  // Typed directions array
  const directions: ('N' | 'E' | 'S' | 'W')[] = ['N', 'E', 'S', 'W'];

  function dirLabel(dir: 'N' | 'E' | 'S' | 'W'): string {
    switch (dir) {
      case 'N': return 'North';
      case 'E': return 'East';
      case 'S': return 'South';
      case 'W': return 'West';
    }
  }
</script>

<div class="deal-component grid grid-cols-2 gap-6 max-w-md mx-auto">
  {#each directions as dir}
    <div class="flex flex-col items-center">
      <div class="font-bold mb-1">{dirLabel(dir)}</div>
      <HandComponent
        value={`${hands[dir].spades}.${hands[dir].hearts}.${hands[dir].diamonds}.${hands[dir].clubs}`}
      />
    </div>
  {/each}
</div>