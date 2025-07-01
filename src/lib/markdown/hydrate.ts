// src/lib/markdown/hydrate.ts
import { mount } from 'svelte';

import SuitSymbol from '$lib/components/SuitSymbol.svelte';
import DealComponent from '$lib/components/DealComponent.svelte';
import HandComponent from '$lib/components/HandComponent.svelte';
import BidsComponent from '$lib/components/BidsComponent.svelte';

// Suppress the 'unexpected any' lint warning because Svelte 5 components don't have a stable class/type signature yet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<string, any> = {
	suit: SuitSymbol,
	deal: DealComponent,
	hand: HandComponent,
	bids: BidsComponent
};

export function hydrateCustomTags(container: HTMLElement) {
	if (!container) return;


	// console.log('[hydrate] container HTML:', container.innerHTML);

	const elements = container.querySelectorAll<HTMLElement>('[data-component]');

  // console.log('[hydrate] Found', elements.length, 'custom elements');
  const mounted = new Set<string>();

	elements.forEach((el) => {
    const id = el.getAttribute('data-id');
    if (id && mounted.has(id)) return;

		const type = el.getAttribute('data-component');
		if (!type) return;

		const value = el.getAttribute('data-value') ?? '';

    console.log('[hydrate]Hydrating:', {type, value, id} );

		const Component = components[type];
		if (Component) {
      el.textContent = ''; // Clear existing text content before mounting
			mount(Component, {
				target: el,
				props: { value }
			});
      if (id) mounted.add(id);
		} else {
			// Fallback for unknown components
			el.textContent = `Unknown command: ${type}`;
		}
	});
}
