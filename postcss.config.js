// postcss.config.js
import tailwindPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('postcss').ProcessOptions} */
export default {
  plugins: [
    tailwindPlugin(),
    autoprefixer()
  ]
};