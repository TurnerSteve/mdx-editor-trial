// tailwind.config.ts
import { Config } from 'tailwindcss';

const config : Config = {
  content: ['./src/**/*.{html,js,svelte,ts}'], // include all Svelte files
  theme: {
    extend: {}
  },
  plugins: []
};

export default config;