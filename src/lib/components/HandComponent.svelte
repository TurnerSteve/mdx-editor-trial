<!-- File: src/lib/components/HandComponent.svelte -->
<script lang="ts">
  import { validateHand, type HandError } from '$lib/markdown/validators/validateHand';

  // Receive raw cards prop (string or array) and optional label
  const props = $props<{ cards?: string | string[]; label?: string }>();
  const { cards: rawCards, label } = props;

  // Map suit letters to symbols
  const suitSymbols: Record<string, string> = {
    S: '♠',
    H: '♥',
    D: '♦',
    C: '♣'
  };

  /**
   * Derive the raw suit strings (Spades, Hearts, Diamonds, Clubs) from the input.
   * If fewer than 4 segments are provided, pad with empty strings.
   */
  const suitStrings = $derived(() => {
    const s = Array.isArray(rawCards) ? rawCards.join('') : String(rawCards ?? '');
    const segments = s.split('.');
    while (segments.length < 4) segments.push('');
    return segments.slice(0, 4);
  });

  // Run validation on the raw string
  const result = $derived(() => validateHand({ hand: rawCards }));
  const errors = $derived(() => result().errors);
  const errorMap = $derived(
    () => new Map<number, string>(errors().map(e => [e.index, e.message]))
  );

  // Local UI state to toggle visibility of error list
  let showErrors = $state(false);
</script>

<div class="hand-component inline-block rounded-xl border p-1 bg-white font-mono text-sm shadow-sm">
  {#if label}
    <!-- Label inside the bordered component -->
    <div class="label-row">{label}</div>
  {/if}

  <div class="hand-grid">
    <!-- Suit rows: symbol in first column, cards string in second column -->
    {#each ['S','H','D','C'] as suit, i}
      <div class="suit-symbol">{suitSymbols[suit]}</div>
      <div class="suit-cards">{suitStrings()[i]}</div>
    {/each}
  </div>

  {#if !result().isValid}
    <div class="hand-footer text-center mt-4">
      <button onclick={() => (showErrors = !showErrors)} class="error-toggle">
        {showErrors ? 'Hide' : 'Show'} errors ({errors().length})
      </button>
      {#if showErrors}
        <ul class="error-list mt-2 text-left inline-block">
          {#each errors() as { index, card, message }}
            <li>Card {index + 1}: {card} — {message}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>

<style>

  .hand-component {
    .label-row {
    grid-column: 1 / -1;
    background: lightgray;
    font-weight: 600;
    text-align: center;
    padding: 0rem;
    border-bottom: 1px solid #e5e7eb;
  }
  }

  /* Container grid: 2 columns (symbol, cards), 4 suit rows */
  .hand-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0rem 0.25rem;
  }

  /* Label row spans both columns */
  .label-row {
    grid-column: 1 / -1;
    background: lightgray;
    font-weight: 600;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .suit-symbol {
    font-size: 1.25rem;
    text-align: center;
  }

  .hand-footer {
    margin-top: 1rem;
  }

  .error-toggle {
    background: none;
    border: none;
    color: #007acc;
    cursor: pointer;
    text-decoration: underline;
  }

  .error-list {
    color: #b91c1c;
    padding-left: 1rem;
  }
</style>