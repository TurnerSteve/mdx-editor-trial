// tailwind.config.ts
import { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config : Config = {
  content: ['./src/**/*.{html,js,svelte,ts}'], // include all Svelte files
  theme: {
    extend: {}
  },
  plugins: [typography]
};

export default config;