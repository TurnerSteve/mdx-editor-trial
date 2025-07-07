<script lang="ts">
  // Runes mode: receive props via $props, derive state with $state and $derived
  import { normalizeSequence } from '$lib/utils/normalizeSequence';
  import { validateBidsSequence, type BidError } from '$lib/markdown/validators/validateBids';

  // Receive raw sequence (string[] or whitespace-delimited string)
  let { seq: rawSeq } = $props<{ seq: string[] | string }>();

  // Always work with a true string[]
  const normalizedSeq = $derived(() => normalizeSequence(rawSeq));

  // Validate bids
  const result = $derived(() => validateBidsSequence(normalizedSeq()));
  const errors = $derived(() => result().errors);
  const errorMap = $derived(() => new Map<number, string>(errors().map((e) => [e.index, e.message])));

  // UI state
  let showErrors = $state(false);

  // Helpers for rendering
  const suitSymbols: Record<string, string> = { C: '♣', D: '♦', H: '♥', S: '♠' };
  const bidRegex = /^([1-7])(C|D|H|S|NT)$/;
</script>

<div class="bids-component inline-block rounded-xl border-2 border-blue-300 bg-white font-mono text-sm shadow-sm">
  <div class="bids-grid">
    {#each normalizedSeq() as bid, i}
      <div class="bid-container">
        {#if errorMap().has(i)}
          <!-- Highlight invalid bids -->
          <span class="bid invalid" title={errorMap().get(i)}>
            {bid}
          </span>
        {:else}
          {@const match = bidRegex.exec(bid)}
          {#if match}
            <!-- Contract bids: level + suit symbol -->
            <span class="bid contract">
              <span class="level">{match[1]}</span>
              <span class="suit {match[2] === 'H' || match[2] === 'D' ? 'red-suit' : ''}">{suitSymbols[match[2]]}</span>
            </span>
          {:else if bid === 'P'}
            <!-- Pass -->
            <span class="bid pass green-pass">P</span>
          {:else if bid === 'X'}
            <!-- Double -->
            <span class="bid dbl blue-bid">X</span>
          {:else if bid === 'XX'}
            <!-- Redouble -->
            <span class="bid rdbl">XX</span>
          {:else}
            <!-- Fallback raw text -->
            <span class="bid">{bid}</span>
          {/if}
        {/if}
      </div>
    {/each}
  </div>

  {#if !result().isLegal}
    <div class="bids-footer">
      <button onclick={() => (showErrors = !showErrors)} class="error-toggle">
        {showErrors ? 'Hide' : 'Show'} errors ({errors().length})
      </button>
      {#if showErrors}
        <ul class="error-list">
          {#each errors() as { index, bid, message }}
            <li>Position {index + 1} (“{bid}”): {message}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>

<style>
  .bids-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(2rem, 1fr));
    gap: 0.25rem;
  }

  .bid-container {
    position: relative;
    width: 2rem; /* ⬅️ change: fixed width for uniform boxes */
    height: 1.5rem; /* ⬅️ change: fixed height for uniform boxes */
    display: flex; /* ⬅️ center content */
    align-items: center;
    justify-content: center;
    margin: 0.25rem;
  }

  .bid {
    width: 100%; /* ⬅️ fill container */
    height: 100%;
    display: flex; /* ⬅️ center inner text/symbol */
    align-items: center;
    justify-content: center;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    text-align: center;
  }

  .contract {
    display: flex;
    gap: 0.1rem;
    justify-content: center;
    align-items: center;
  }

  .level {
    font-weight: 600;
  }

  .suit {
    font-size: 1.1em;
  }

  .red-suit {
    color: #dc2626;
  }

  .blue-bid, .dbl, .rdbl {
    color: #1e40af;
    font: bold;
  }

  .green-pass {
    color: #16a34a;
  }

  .bid.invalid {
    text-decoration: underline wavy red;
    cursor: help;
  }

  .bids-footer {
    grid-column: 1 / -1; /* span all 4 columns */
    margin-top: 0.5rem;
    text-align: center;
  }

  .error-toggle {
    background: none;
    border: none;
    color: #007acc;
    cursor: pointer;
    text-decoration: underline;
    margin-bottom: 0.25rem;
  }

  .error-list {
    padding-left: 1rem;
    color: red;
  }
</style>
