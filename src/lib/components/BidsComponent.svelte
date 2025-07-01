<script lang="ts">
  import { parseBids } from '$lib/components/shared/parseBids';
  import SuitSymbol from './SuitSymbol.svelte';

  const { value } = $props();
  const bids = parseBids(value ?? '');

  const suitMap = {
    C: { symbol: '♣', color: 'text-black' },
    D: { symbol: '♦', color: 'text-red-500' },
    H: { symbol: '♥', color: 'text-red-500' },
    S: { symbol: '♠', color: 'text-black' },
    NT: { symbol: 'NT', color: 'text-black' }
  };

  const rows = [];
  for (let i = 0; i < bids.length; i += 4) {
    rows.push(bids.slice(i, i + 4));
  }

  function formatBid(bid: string) {
    if (!bid) return '';
    const match = bid.match(/^(\d+)?(NT|[CDHS])?$/i);
    if (!match) return bid;

    const [_, number, suit] = match;
    if (suit) {
      const key = suit.toUpperCase();
      const { symbol, color } = suitMap[key] ?? { symbol: suit, color: 'text-black' };
      return number ? `${number} <span class="${color}">${symbol}</span>` : `<span class="${color}">${symbol}</span>`;
    }

    return bid;
  }
</script>

<div class="border rounded-lg bg-gray-50 m-4 ml-6  w-80 overflow-hidden">
  <table class="table-fixed w-80">
    <thead class="bg-gray-500 text-white rounded-t-lg">
      <tr>
        <th class="w-20 text-left p-2 rounded-tl-lg" style="min-width: 4ch;">West</th>
        <th class="w-20 text-left p-2" style="min-width: 4ch;">North</th>
        <th class="w-20 text-left p-2" style="min-width: 4ch;">East</th>
        <th class="w-20 text-left p-2 rounded-tr-lg" style="min-width: 4ch;">South</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr class="even:bg-white odd:bg-gray-100">
          {#each row as bid}
            <td class="w-10 text-left p-2 align-middle" style="min-width: 4ch;">
              {@html formatBid(bid)}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>