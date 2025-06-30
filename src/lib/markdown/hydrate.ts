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

  const elements = container.querySelectorAll<HTMLElement>('[data-custom-tag]');
  elements.forEach(el => {
    const type = el.getAttribute('data-custom-tag');
    if (!type) return;

    const value = el.textContent ?? '';
    el.textContent = '';

    const Component = components[type];
    if (Component) {
      mount(Component, {
        target: el,
        props: { value }
      });
    } else {
      // Fallback for unknown components
      el.textContent = `Unknown command: ${type}`;
    }
  });
}