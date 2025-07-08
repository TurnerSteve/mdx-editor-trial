<!-- File: src/lib/components/DealComponent.svelte -->
<script lang="ts">
	import HandComponent from '$lib/components/HandComponent.svelte';
	import { validateDeal, type DealError } from '$lib/markdown/validators/validateDeal';

	// Destructure incoming props
	const props = $props<{ N?: string; E?: string; S?: string; W?: string; label?: string }>();

	// ▶️ Compute validation result whenever any hand prop changes
	const result = $derived(() =>
		validateDeal({
			N: props.N,
			E: props.E,
			S: props.S,
			W: props.W
		})
	);
	$effect(() => {
		console.log('Deal props changed:', props.N, props.E, props.S, props.W, result());
	});
	// Prepare deal validation
	const errors = $derived(() => result().errors);
	let showErrors = $state(false);
</script>

<div class="deal-component">
	{#if props.label}
		<div class="deal-label">{props.label}</div>
	{/if}

	<div class="compass-grid">
		<div class="deal-row north"><HandComponent cards={props.N} label="N" /></div>
		<div class="deal-row west"><HandComponent cards={props.W} label="W" /></div>
		<div class="deal-row east"><HandComponent cards={props.E} label="E" /></div>
		<div class="deal-row south"><HandComponent cards={props.S} label="S" /></div>
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
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--bg-component);
		box-shadow: var(--shadow-light);
		overflow: hidden;
		color: var(--color-text);
	}

	.deal-label {
		background: var(--bg-header);
		padding: var(--spacing-sm);
		text-align: center;
		font-weight: 600;
		border-bottom: 1px solid var(--color-border);
	}

	.compass-grid {
		display: grid;
		/* 3x3 layout: gutters, positions, with a center cell */
		grid-template-areas:
			'. north .'
			'west center east'
			'. south .';
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: auto auto auto;
		gap: var(--spacing-xs);
		padding: var(--spacing-xs);
		justify-items: center;
		align-items: center;
	}
	.compass-grid .north {
		grid-area: north;
	}
	.compass-grid .west {
		grid-area: west;
	}

	.compass-grid .east {
		grid-area: east;
	}
	.compass-grid .south {
		grid-area: south;
	}

	/* Force each hand to consistent width */
	.compass-grid :global(.hand-component) {
		width: 6rem;
	}

	:global(.hand-component) {
		width: 6rem;
	}

	.deal-footer {
		background: var(--bg-footer);
		padding: var(--spacing-sm);
		text-align: center;
		border-top: 1px solid var(--color-border);
	}

	.error-toggle {
		background: none;
		border: none;
		color: var(--color-accent);
		cursor: pointer;
		text-decoration: underline;
		font-size: var(--spacing-md);
	}

	.error-list {
		color: var(--color-error);
		margin-top: var(--spacing-xs);
		padding-left: var(--spacing-sm);
		text-align: left;
		font-size: var(--spacing-md);
	}
</style>
