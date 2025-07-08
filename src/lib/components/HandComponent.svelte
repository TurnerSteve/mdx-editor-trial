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
    {#each ['S','H','D','C'] as suit, i}
      <!-- ⬅️ apply red-suit class for hearts & diamonds -->
      <div class="suit-row" class:red-suit={suit === 'H' || suit === 'D'}>
        <span class="symbol">{suitSymbols[suit]}</span>
        <span class="cards">{suitStrings()[i]}</span>
      </div>
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
    display: inline-block;
    border: 2px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--bg-component);
    box-shadow: var(--shadow-light);
    color: var(--color-text);
    padding: 0;
  }

  .label-row {
    grid-column: 1 / -1;
    font-weight: 600;
    height: 2rem;
    background: var(--bg-header);
    text-align: center;
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 2px solid var(--color-border);
  }

  .hand-grid {
    display: block;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1rem 1rem 1rem 1rem;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm);
    align-items: center;
  }

  .suit-symbol {
    font-size: 1.25rem;
  }

  /* ⬅️ New styling: color hearts & diamonds red */
  .red-suit .symbol,
  .red-suit .cards {
    color: #dc2626;
  }

  .hand-footer {
    margin-top: var(--spacing-lg);
    text-align: center;
  }

  .error-toggle {
    background: none;
    border: none;
    color: var(--color-accent);
    cursor: pointer;
    text-decoration: underline;
  }

  .error-list {
    color: var(--color-error);
    padding-left: var(--spacing-sm);
  }
</style>