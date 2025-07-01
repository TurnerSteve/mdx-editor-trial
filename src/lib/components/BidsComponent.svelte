<script lang="ts">
  const { value } = $props();
  import { parseBids } from './shared/parseBids';

  const bids = parseBids(value ?? '');

  while (bids.length % 4 !== 0) {
    bids.push('');
  }

  const rows = [];
  for (let i = 0; i < bids.length; i += 4) {
    rows.push(bids.slice(i, i + 4));
  }
</script>

<div class="inline-block rounded-lg bg-gray-50 dark:bg-gray-900 p-4 shadow-sm">
  <table class="table-auto rounded-md w-[24ch] text-center text-sm font-mono">
    <thead>
      <tr class="bg-gray-100 dark:bg-gray-800">
        <th class="w-[6ch] p-1">W</th>
        <th class="w-[6ch] p-1">N</th>
        <th class="w-[6ch] p-1">E</th>
        <th class="w-[6ch] p-1">S</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each row as bid}
            <td class="p-1">{bid || ''}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>