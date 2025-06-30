// tailwind.config.ts

import typography from '@tailwindcss/typography';

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'], // include all Svelte files
  theme: {
    extend: {}
  },
  plugins: [typography]
};

export default config;