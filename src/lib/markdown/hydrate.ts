// src/lib/markdown/hydrate.ts
import { mount } from 'svelte';

import SuitSymbol from '$lib/components/SuitSymbol.svelte';
import DealComponent from '$lib/components/DealComponent.svelte';
import HandComponent from '$lib/components/HandComponent.svelte';
import BidsComponent from '$lib/components/BidsComponent.svelte';

// Loosely type component class constructors to accept any props
// Use `any` for component constructors to bypass the typing headaches here

import type { SvelteComponent } from 'svelte';
const components: Record<string, typeof SvelteComponent> = {
  suit: SuitSymbol as unknown as typeof SvelteComponent,
  deal: DealComponent as unknown as typeof SvelteComponent,
  hand: HandComponent as unknown as typeof SvelteComponent,
  bids: BidsComponent as unknown as typeof SvelteComponent,
};

export function hydrateCustomTags(container: HTMLElement) {
  if (!container) return;

  console.log('[hydrate] container HTML:', container.innerHTML);

  const elements = container.querySelectorAll<HTMLElement>('[data-component]');
  const mounted = new Set<string>();

  elements.forEach((el) => {
    const id = el.getAttribute('data-id');
    if (id && mounted.has(id)) return;

    const type = el.getAttribute('data-component');
    if (!type) return;

    // Collect all data-* attributes except data-component
    const props: Record<string, string> = {};
    for (const attr of el.attributes) {
      if (attr.name.startsWith('data-') && attr.name !== 'data-component') {
        // convert data-label to label, data-value to value etc.
        const propName = attr.name.slice(5);
        props[propName] = attr.value;
      }
    }

    console.log('[hydrate] Mounting', type, 'with props', props);

    const Component = components[type];
    if (Component) {
      el.textContent = ''; // Clear existing content before mounting
      mount(Component, {
        target: el,
        props
      });
      if (id) mounted.add(id);
    } else {
      el.textContent = `Unknown command: ${type}`;
    }
  });
}