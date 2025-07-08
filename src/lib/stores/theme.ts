// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
export const theme = writable<'light' | 'dark'>('light');
theme.subscribe(val => {
  document.documentElement.setAttribute('data-theme', val);
});