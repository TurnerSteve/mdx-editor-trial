<!-- File: src/lib/components/DealComponent.svelte -->
<script lang="ts">
  import HandComponent from '$lib/components/HandComponent.svelte';
  import { validateDeal, type DealError } from '$lib/markdown/validators/validateDeal';

  // Destructure incoming props
  const props = $props<{ N?: string; E?: string; S?: string; W?: string; label?: string }>();
  const { N, E, S, W, label } = props;

  // Prepare deal validation
  const result = $derived(() => validateDeal({ N, E, S, W }));
  const errors = $derived(() => result().errors);
  let showErrors = $state(false);
</script>

<div class="deal-component">
  {#if label}
    <div class="label-row">{label}</div>
  {/if}

  <div class="compass-grid">
    <div class="north"><HandComponent cards={N} label="N" /></div>
    <div class="west"><HandComponent cards={W} label="W" /></div>
    <div class="east"><HandComponent cards={E} label="E" /></div>
    <div class="south"><HandComponent cards={S} label="S" /></div>
  </div>

  {#if !result().isValid}
    <div class="deal-footer">
      <button onclick={() => (showErrors = !showErrors)} class="error-toggle">
        {showErrors ? 'Hide' : 'Show'} deal errors ({errors().length})
      </button>
      {#if showErrors}
        <ul class="error-list">
          {#each errors() as { hand, index, card, message }}
            <li>Hand {hand}, card {index + 1}: {card} — {message}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>

<style>
  .deal-component {
    display: inline-block;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    overflow: hidden;
  }
  .label-row {
    grid-column: 1 / -1;
    background: lightgray;
    font-weight: 600;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .compass-grid {
    display: grid;
    grid-template-areas:
      ". north ."
      "west . east"
      ". south .";
    grid-template-columns: 6rem 6rem 6rem;
    grid-template-rows: auto auto auto;
    /* Fix each row height to reduce overall height */
    grid-auto-rows: 4rem;
    gap: 0.25rem;
    padding: 0.25rem;
    justify-items: center;
    align-items: center;
  }
  .compass-grid .north { grid-area: north; }
  .compass-grid .south { grid-area: south; }
  .compass-grid .west  { grid-area: west; }
  .compass-grid .east  { grid-area: east; }

  /* Ensure each hand is the same size */
  .compass-grid :global(.hand-component) {
    width: 6rem;
  }

  .deal-footer {
    background: #f9fafb; /* gray-50 */
    padding: 0.5rem;
    text-align: center;
    border-top: 1px solid #e5e7eb;
  }

  .error-toggle {
    background: none;
    border: none;
    color: #007acc;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.875rem;
  }

  .error-list {
    color: #b91c1c;
    margin-top: 0.25rem;
    padding-left: 1rem;
    text-align: left;
    font-size: 0.875rem;
  }
</style>