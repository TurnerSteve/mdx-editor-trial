<script lang="ts">
	// Runes mode: receive props via $props, derive state with $state and $derived
	import { normalizeSequence } from '$lib/utils/normalizeSequence';
	import { validateBidsSequence, type BidError } from '$lib/markdown/validators/validateBids';

	// Receive raw sequence (string[] or whitespace-delimited string)
	let { seq: rawSeq, label: label } = $props<{ seq: string[] | string; label?: string }>();

	// Always work with a true string[]
	const normalizedSeq = $derived(() => normalizeSequence(rawSeq));

	// Validate bids
	const result = $derived(() => validateBidsSequence(normalizedSeq()));
	const errors = $derived(() => result().errors);
	const errorMap = $derived(
		() => new Map<number, string>(errors().map((e) => [e.index, e.message]))
	);

	// UI state
	let showErrors = $state(false);

	// Helpers for rendering
	const suitSymbols: Record<string, string> = { C: '♣', D: '♦', H: '♥', S: '♠' };
	const bidRegex = /^([1-7])(C|D|H|S|NT)$/;
</script>

<div
	class="bids-component inline-block rounded-xl border-2 border-blue-300 bg-white font-mono text-sm shadow-sm"
>
	<div class="label-row">{label}</div>
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
						<span class="bid" title={errorMap().get(i)} class:red-suit={/[HD]$/.test(bid)}>
							<!-- 🔢 Number part -->
							<span class="number">{bid.slice(0, -1)}</span>
							<!-- ♠ Suit symbol part -->
							<span class="symbol">{suitSymbols[bid.slice(-1)]}</span>
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
	.bids-component {
		display: inline-block;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--bg-component);
		box-shadow: var(--shadow-light);
		color: var(--color-text);
	}

	.label-row {
		background: var(--bg-header);
		padding: var(--spacing-sm);
		text-align: center;
		font-weight: 600;
		border-bottom: 1px solid var(--color-border);
	}

	.bids-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(3ch, 1fr));
		gap: calc(var(--spacing-xs) / 2);
		padding: var(--spacing-sm);
		justify-items: center;
	}

	.bid {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 5ch; /* uniform width */
		height: 2em; /* uniform height */
		padding: var(--spacing-xs);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		text-align: center;
		cursor: default;
	}

	/* ▶️ Color hearts & diamonds red */
	.red-suit .number,
	.red-suit .symbol {
		color: var(--color-error);
	}
	.error-toggle {
		margin-top: var(--spacing-md);
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
