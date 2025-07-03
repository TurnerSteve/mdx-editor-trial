import { mount } from 'svelte';

import SuitSymbol from '$lib/components/SuitSymbol.svelte';
import DealComponent from '$lib/components/DealComponent.svelte';
import HandComponent from '$lib/components/HandComponent.svelte';
import BidsComponent from '$lib/components/BidsComponent.svelte';

import type { SvelteComponent } from 'svelte';

/**
 * Map component types to Svelte components.
 * To add new components:
 * - Import your component here
 * - Add to this map with the matching `type` key
 * - Ensure your component accepts `label` and `value` (or `data`) as props
 */
const components: Record<string, typeof SvelteComponent> = {
  suit: SuitSymbol as unknown as typeof SvelteComponent,
  deal: DealComponent as unknown as typeof SvelteComponent,
  hand: HandComponent as unknown as typeof SvelteComponent,
  bids: BidsComponent as unknown as typeof SvelteComponent,
};

/**
 * Hydrates all custom tags within a container element by
 * mounting the appropriate Svelte component.
 * 
 * Looks for elements with `[data-component]` attribute,
 * reads their data attributes (label, value, etc.),
 * and mounts the Svelte component.
 */
export function hydrateCustomTags(container: HTMLElement) {
  if (!container) return;

  const elements = container.querySelectorAll<HTMLElement>('[data-component]');
  const mounted = new Set<string>();

  elements.forEach((el) => {
    const id = el.getAttribute('data-id');
    if (id && mounted.has(id)) return;

    const type = el.getAttribute('data-component');
    if (!type) return;

    // Extract props from all data- attributes except data-component
    const props: Record<string, string> = {};
    for (const attr of el.attributes) {
      if (attr.name.startsWith('data-') && attr.name !== 'data-component') {
        const propName = attr.name.slice(5); // Remove "data-" prefix
        props[propName] = attr.value;
      }
    }

    const Component = components[type];
    if (Component) {
      // Clear existing content before mounting
      el.textContent = '';
      mount(Component, {
        target: el,
        props,
      });
      if (id) mounted.add(id);
    } else {
      el.textContent = `Unknown command: ${type}`;
    }
  });
}